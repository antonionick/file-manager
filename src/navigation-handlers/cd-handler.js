import * as  os from 'node:os';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

const CD_HANDLER_COMMAND_REGEX = /(^cd)\s+(.+)/;

export const cdHandler = async (command, fileMangerState) => {
	const [, cdMatch, pathMatch] = command.match(CD_HANDLER_COMMAND_REGEX);

	if (!cdMatch) {
		return { isAppropriateHandler: false };
	}

	if (!pathMatch) {
		return {
			isAppropriateHandler: true,
			isInvalidInput: true,
		};
	}

	const normalizedPath = path.normalize(pathMatch);
	const pathToProcess = path.isAbsolute(normalizedPath)
		? normalizedPath
		: path.resolve(fileMangerState.currentDirectory, normalizedPath);

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

		fileMangerState.currentDirectory = pathToProcess;

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};