import * as os from 'node:os';
import * as path from 'node:path';

const UP_HANDLE_COMMAND = 'up';

export const upHandler = async (command, fileManagerState) => {
	if (command !== UP_HANDLE_COMMAND) {
		return { isAppropriateHandler: false };
	}

	if (fileManagerState.currentDirectory !== os.homedir()) {
		const updatedCurrentDirectory =
			path.resolve(fileManagerState.currentDirectory, '../');

		fileManagerState.currentDirectory = updatedCurrentDirectory;
	}

	return { isAppropriateHandler: true };
};