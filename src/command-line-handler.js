import * as readline from 'node:readline';
import * as  process from 'node:process';

export const registerCommandLineHandler = (handlers, fileMangerState) => {
	console.log(`Welcome to the File Manager, ${fileMangerState.userName}!`);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	handleCommandLinesRequests(rl, handlers, fileMangerState)

	rl.on('close', () => console.log(`Thank you for using File Manager, ${fileMangerState.userName}, goodbye!`));
};

const handleCommandLinesRequests = async (rl, handlers, fileMangerState) => {
	logCurrentDirectory(fileMangerState);

	for await (let command of rl) {
		let isInvalidInput = false;
		let isOperationHandled = false;
		let isOperationFailed = false;

		for (let handler of handlers) {
			const handlerResult = await handler(command.trim(), fileMangerState);

			if (handlerResult.isAppropriateHandler) {
				isOperationHandled = true;
				isInvalidInput = handlerResult.isInvalidInput ?? false;
				isOperationFailed = handlerResult.isOperationFailed ?? false
				break;
			}
		}

		if (!isOperationHandled || isInvalidInput) {
			console.log('Invalid input');
		} else if (isOperationFailed) {
			console.log('Operation failed');
		}

		logCurrentDirectory(fileMangerState);
	}
};

const logCurrentDirectory = (fileMangerState) =>
	console.log(`You are currently in ${fileMangerState.currentDirectory}`);
