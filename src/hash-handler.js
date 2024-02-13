import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import * as stream from 'node:stream/promises';
const { createHash } = await import('node:crypto');

const HASH_HANDLER_COMMAND_REGEX = /^hash\s+(\S+)/;

export const hashHandler = async (command, fileManagerState) => {
	if (!HASH_HANDLER_COMMAND_REGEX.test(command)) {
		return { isAppropriateHandler: false };
	}

	const [, fileName] = command.match(HASH_HANDLER_COMMAND_REGEX);
	const filePath = path.join(fileManagerState.currentDirectory, fileName);

	const hash = createHash('sha256');

	try {
		const fileHandler = await fs.open(filePath);
		const fileReadStream = fileHandler.createReadStream();

		fileReadStream.pipe(hash).setEncoding('hex').pipe(process.stdout);

		await stream.finished(fileReadStream);

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};