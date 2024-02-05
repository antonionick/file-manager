import * as  os from 'node:os';
import * as  path from 'node:path';
import * as  fs from 'node:fs/promises';
import * as  stream from 'node:stream/promises';
import * as  zlib from 'node:zlib';

const DECOMPRESS_FILE_HANDLER_COMMAND_REGEX = /^decompress\s+(\S+)\s+(\S+)/;

export const decompressFileHandler = async (command, fileManagerState) => {
	if (!DECOMPRESS_FILE_HANDLER_COMMAND_REGEX.test(command)) {
		return { isAppropriateHandler: false };
	}

	const [, fileName, destinationPath] =
		command.match(DECOMPRESS_FILE_HANDLER_COMMAND_REGEX);

	const filePath = path.join(fileManagerState.currentDirectory, fileName);
	const normalizedPath = path.normalize(destinationPath);

	const pathToProcess = path.isAbsolute(normalizedPath)
		? normalizedPath
		: path.resolve(fileManagerState.currentDirectory, normalizedPath);

	const userHomeDirectory = os.homedir();

	if (!pathToProcess.startsWith(userHomeDirectory)) {
		return {
			isAppropriateHandler: true,
			isInvalidInput: true,
		};
	}

	const brotliDecompress = zlib.createBrotliDecompress();

	try {
		const fileHandler = await fs.open(filePath, 'r');
		const destFileHandler = await fs.open(pathToProcess, 'wx');

		const readStream = fileHandler.createReadStream();
		const writeStream = destFileHandler.createWriteStream();

		await stream.pipeline(readStream, brotliDecompress, writeStream);

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};