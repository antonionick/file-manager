import * as  path from 'node:path';
import * as  stream from 'node:stream/promises';
import * as  fs from 'node:fs/promises';

const CAT_HANDLER_COMMAND_REGEX = /^cat\s+(\S+)/;

export const catHandler = async (command, fileManagerState) => {
	if (!CAT_HANDLER_COMMAND_REGEX.test(command)) {
		return { isAppropriateHandler: false };
	}

	const [, fileName] = command.match(CAT_HANDLER_COMMAND_REGEX);

	try {
		const filePath = path.join(fileManagerState.currentDirectory, fileName);
		const fileHandler = await fs.open(filePath, 'r');

		const readStream = fileHandler.createReadStream();

		readStream.pipe(process.stdout);

		await stream.finished(readStream);

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};