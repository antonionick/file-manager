import * as os from 'node:os';

const ARCHITECTURE_HANDLER_COMMAND = 'os --architecture';

export const architectureHandler = async (command) => {
	if (command !== ARCHITECTURE_HANDLER_COMMAND) {
		return { isAppropriateHandler: false };
	}

	console.log(os.arch());

	return { isAppropriateHandler: true };
};