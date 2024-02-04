import * as  os from 'node:os';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

const CD_HANDLER_COMMAND_REGEX = /^cd\s+(\S+)/;

export const cdHandler = async (command, fileManagerState) => {
	if (!CD_HANDLER_COMMAND_REGEX.test(command)) {
		return { isAppropriateHandler: false };
	}

	const [, pathMatch] = command.match(CD_HANDLER_COMMAND_REGEX);
	const normalizedPath = path.normalize(pathMatch);

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

	try {
		const pathStat = await fs.stat(pathToProcess);

		if (!pathStat.isDirectory()) {
			return {
				isAppropriateHandler: true,
				isInvalidInput: true,
			};
		}

		fileManagerState.currentDirectory = pathToProcess;

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};