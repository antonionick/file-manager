import * as  path from 'node:path';
import * as  fs from 'node:fs/promises';

const RENAME_HANDLER_COMMAND_REGEX = /^rn\s+(\S+)\s+(\S+)/;

export const renameHandler = async (command, fileMangerState) => {
	if (!RENAME_HANDLER_COMMAND_REGEX.test(command)) {
		return { isAppropriateHandler: false };
	}

	const [, currentFileName, newFileName] =
		command.match(RENAME_HANDLER_COMMAND_REGEX);

	try {
		const currentFilePath =
			 path.join(fileMangerState.currentDirectory, currentFileName);
		const newFilePath =
			 path.join(fileMangerState.currentDirectory, newFileName);

		await fs.rename(currentFilePath, newFilePath);

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};