import * as path from 'node:path';
import * as fs from 'node:fs/promises';

const REMOVE_COMMAND_REGEX = /^rm\s+(\S+)/;

export const rmHandler = async (command, fileManagerState) => {
	if (!REMOVE_COMMAND_REGEX.test(command)) {
		return { isAppropriateHandler: false };
	}

	const [, fileName] = command.match(REMOVE_COMMAND_REGEX);
	const filePath = path.join(fileManagerState.currentDirectory, fileName);

	try {
		await fs.rm(filePath);

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};