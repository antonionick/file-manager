import * as readline from 'node:readline';
import * as  process from 'node:process';
import { exitHandlerFabric } from './exit-handler.js';

export const registerCommandLineHandler = (sourceHandlers, fileMangerState) => {
	console.log(`Welcome to the File Manager, ${fileMangerState.userName}!`);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	const handlers = [
		exitHandlerFabric(rl),
		...sourceHandlers,
	];

	handleCommandLinesRequests(rl, handlers, fileMangerState)

	rl.on('close', () => console.log(`Thank you for using File Manager, ${fileMangerState.userName}, goodbye!`));
};

const handleCommandLinesRequests = async (rl, handlers, fileMangerState) => {
	logCurrentDirectory(fileMangerState);

	for await (let command of rl) {
		let handlerResult;

		for (let handler of handlers) {
			handlerResult = await handler(command.trim(), fileMangerState);

			if (handlerResult.isAppropriateHandler) {
				break;
			}
		}

		if (handlerResult.isClosed) {
			break;
		}

		if (
			!handlerResult.isAppropriateHandler
			|| handlerResult.isInvalidInput
		) {
			console.log('Invalid input');
		} else if (handlerResult.isOperationFailed) {
			console.log('Operation failed');
		}

		logCurrentDirectory(fileMangerState);
	}
};

const logCurrentDirectory = (fileMangerState) =>
	console.log(`You are currently in ${fileMangerState.currentDirectory}`);
