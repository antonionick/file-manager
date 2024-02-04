import * as path from 'node:path';
import * as fs from 'node:fs/promises';

const ADD_HANDLER_COMMAND_REGEX = /^add\s+(\S+)/;

export const addHandler = async (command, fileManagerState) => {
	if (!ADD_HANDLER_COMMAND_REGEX.test(command)) {
		return { isAppropriateHandler: false };
	}

	const [, fileName] = command.match(ADD_HANDLER_COMMAND_REGEX);

	try {
		const filePath = path.join(fileManagerState.currentDirectory, fileName);

		const fileHandler = await fs.open(filePath, 'a');
		await fileHandler.close();

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};