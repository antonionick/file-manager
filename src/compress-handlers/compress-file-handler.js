import * as  os from 'node:os';
import * as  path from 'node:path';
import * as  fs from 'node:fs/promises';
import * as  stream from 'node:stream/promises';
import * as  zlib from 'node:zlib';

const COMPRESS_FILE_HANDLER_COMMAND_REGEX = /^compress\s+(\S+)\s+(\S+)/;

export const compressFileHandler = async (command, fileManagerState) => {
	if (!COMPRESS_FILE_HANDLER_COMMAND_REGEX.test(command)) {
		return { isAppropriateHandler: false };
	}

	const [, fileName, destinationPath] =
		command.match(COMPRESS_FILE_HANDLER_COMMAND_REGEX);

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

	const brotliCompress = zlib.createBrotliCompress();

	try {
		const fileHandler = await fs.open(filePath, 'r');
		const destFileHandler = await fs.open(pathToProcess, 'wx');

		const readStream = fileHandler.createReadStream();
		const writeStream = destFileHandler.createWriteStream();

		await stream.pipeline(readStream, brotliCompress, writeStream);

		await pipe(readStream, brotliCompress, writeStream);

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};