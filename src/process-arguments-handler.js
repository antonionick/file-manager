import * as process from 'node:process';

const USER_NAME_ARGUMENT_PARAMETER_NAME = '--username';
const USER_NAME_VALUE_REGEX = /--\w+=(\w+)/;

let processedUserName;

export const getUserName = () => {
	if (processedUserName) {
		return processedUserName;
	}

	const argParameter = getUserNameArgParameter();

	if (argParameter) {
		const [, userName] = argParameter.match(USER_NAME_VALUE_REGEX);
		processedUserName = userName;
	} else {
		processedUserName = 'Unknown';
	}

	return processedUserName;
}

const getUserNameArgParameter = () => process.argv
	.slice(2)
	.filter(value => value.startsWith(USER_NAME_ARGUMENT_PARAMETER_NAME))
	.at(0);