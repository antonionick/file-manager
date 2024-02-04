import * as  path from 'node:path';
import * as  fs from 'node:fs/promises';

const CAT_HANDLER_COMMAND_REGEX = /^cat\s+(\S+)/;

export const catHandler = async (command, fileMangerState) => {
	if (!CAT_HANDLER_COMMAND_REGEX.test(command)) {
		return { isAppropriateHandler: false };
	}

	const [, fileName] = command.match(CAT_HANDLER_COMMAND_REGEX);

	try {
		const filePath = path.join(fileMangerState.currentDirectory, fileName);
		const fileHandler = await fs.open(filePath, 'r');

		await new Promise((resolve, reject) => {
			const readStream = fileHandler.createReadStream();

			readStream.pipe(process.stdout);

			readStream.on('close', () => resolve());
			readStream.on('error', () => reject());
		});

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};