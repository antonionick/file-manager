import * as  os from 'node:os';
import * as  path from 'node:path';
import * as  fs from 'node:fs/promises';``

const COPY_HANDLER_COMMAND_REGEX = /^cp\s+(\S+)\s+(\S+)/;

export const copyHandler = async (command, fileManagerState) => {
	if (!COPY_HANDLER_COMMAND_REGEX.test(command)) {
		return { isAppropriateHandler: false };
	}

	const [, fileName, destinationPath] =
		command.match(COPY_HANDLER_COMMAND_REGEX);

	const filePath = path.join(fileManagerState.currentDirectory, fileName);
	const normalizedPath = path.normalize(destinationPath);

	const pathToProcess = path.isAbsolute(normalizedPath)
		? path.join(normalizedPath, fileName)
		: path.resolve(fileManagerState.currentDirectory, normalizedPath, fileName);

	const userHomeDirectory = os.homedir();

	if (!pathToProcess.startsWith(userHomeDirectory)) {
		return {
			isAppropriateHandler: true,
			isInvalidInput: true,
		};
	}

	try {
		const fileHandler = await fs.open(filePath, 'r');
		const destFileHandler = await fs.open(pathToProcess, 'wx');

		const readStream = fileHandler.createReadStream();
		const writeStream = destFileHandler.createWriteStream();

		const readStreamPromise = new Promise((resolve, reject) => {
			readStream.on('close', resolve);
			readStream.on('error', reject);
		});
		const writeStreamPromise = new Promise((resolve, reject) => {
			writeStream.on('close', resolve);
			writeStream.on('error', reject);
		});

		readStream.pipe(writeStream);

		await Promise.all([readStreamPromise, writeStreamPromise]);

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};