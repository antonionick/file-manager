import * as os from 'node:os';
import * as path from 'node:path';

const UP_HANDLE_COMMAND = 'up';

export const upHandler = async (command, fileMangerState) => {
	if (command !== UP_HANDLE_COMMAND) {
		return { isAppropriateHandler: false };
	}

	if (fileMangerState.currentDirectory !== os.homedir()) {
		const updatedCurrentDirectory =
			path.resolve(fileMangerState.currentDirectory, '../');

		fileMangerState.currentDirectory = updatedCurrentDirectory;
	}

	return { isAppropriateHandler: true };
};