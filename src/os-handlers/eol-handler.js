import * as os from 'node:os';

const EOL_HANDLER_COMMAND = 'os --EOL';

export const eolHandler = async (command) => {
	if (command !== EOL_HANDLER_COMMAND) {
		return { isAppropriateHandler: false };
	}

	console.log(JSON.stringify(os.EOL));

	return { isAppropriateHandler: true };
};