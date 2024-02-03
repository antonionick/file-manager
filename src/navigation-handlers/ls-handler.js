import *  as  fs from 'node:fs/promises';

const LS_HANDLE_COMMAND = 'ls';

export const lsHandler = async (command, fileMangerState) => {
	if (command !== LS_HANDLE_COMMAND) {
		return { isAppropriateHandler: false };
	}

	try {
		const dirInfo = await fs.readdir(
			fileMangerState.currentDirectory,
			{ withFileTypes: true },
		);

		const result = dirInfo
			.map(item => ({
				Name: item.name,
				Type: item.isDirectory() ? 'Directory' : 'File',
			}))
			.sort((item1, item2) => {
				if (item1.Type === item2.Type) {
					return item1.Type - item2.Type;
				}

				if (item1.Type === 'Directory' && item2.Type !== 'Directory') {
					return -1;
				}

				return 1;
			});

		console.table(result);

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};