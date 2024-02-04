import * as  os from 'node:os';
import * as  path from 'node:path';
import * as  fs from 'node:fs/promises';
import * as  utils from 'node:util';
import * as  stream from 'node:stream';
import * as  zlib from 'node:zlib';

const DECOMPRESS_FILE_HANDLER_COMMAND_REGEX = /^decompress\s+(\S+)\s+(\S+)/;

const pipe = utils.promisify(stream.pipeline);

export const decompressFileHandler = async (command, fileManagerState) => {
	if (!DECOMPRESS_FILE_HANDLER_COMMAND_REGEX.test(command)) {
		return { isAppropriateHandler: false };
	}

	const [, fileName, destinationPath] =
		command.match(DECOMPRESS_FILE_HANDLER_COMMAND_REGEX);

	const filePath = path.join(fileManagerState.currentDirectory, fileName);
	const normalizedPath = path.normalize(destinationPath);

	const decompressedFileName = `${fileName}.decompressed`;

	const pathToProcess = path.isAbsolute(normalizedPath)
		? path.join(normalizedPath, decompressedFileName)
		: path.resolve(fileManagerState.currentDirectory, normalizedPath, decompressedFileName);

	const userHomeDirectory = os.homedir();

	if (!pathToProcess.startsWith(userHomeDirectory)) {
		return {
			isAppropriateHandler: true,
			isInvalidInput: true,
		};
	}

	const brotlisDecompress = zlib.createBrotliDecompress();

	try {
		const fileHandler = await fs.open(filePath, 'r');
		const destFileHandler = await fs.open(pathToProcess, 'wx');

		const readStream = fileHandler.createReadStream();
		const writeStream = destFileHandler.createWriteStream();

		await pipe(readStream, brotlisDecompress, writeStream);

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};