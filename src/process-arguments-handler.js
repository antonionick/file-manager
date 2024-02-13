import * as process from 'node:process';

const USER_NAME_ARGUMENT_PARAMETER_NAME = '--username';
const USER_NAME_VALUE_REGEX = /--\w+=(\w+)/;

export const getUserName = () => {
	const argParameter = getUserNameArgParameter();

	if (!argParameter) {
		return 'Unknown';
	}

	const [, userName] = argParameter.match(USER_NAME_VALUE_REGEX);
	return userName;
}

const getUserNameArgParameter = () => process.argv
	.slice(2)
	.filter(value => value.startsWith(USER_NAME_ARGUMENT_PARAMETER_NAME))
	.at(0);