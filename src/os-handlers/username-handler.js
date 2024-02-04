import * as os from 'node:os';

const USERNAME_HANDLER_COMMAND = 'os --username';

export const usernameHandler = async (command) => {
	if (command !== USERNAME_HANDLER_COMMAND) {
		return { isAppropriateHandler: false };
	}

	const userInfo = os.userInfo();
	console.log(userInfo.username);

	return { isAppropriateHandler: true };
};