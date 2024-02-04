import * as os from 'node:os';

const HOMEDIR_HANDLER_COMMAND = 'os --homedir';

export const homedirHandler = async (command) => {
	if (command !== HOMEDIR_HANDLER_COMMAND) {
		return { isAppropriateHandler: false };
	}

	console.log(os.homedir());

	return { isAppropriateHandler: true };
};