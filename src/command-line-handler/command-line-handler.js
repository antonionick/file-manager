import * as readline from 'node:readline';
import * as  process from 'node:process';
import { exitHandlerFabric } from './exit-handler.js';

export const registerCommandLineHandler = (sourceHandlers, fileManagerState) => {
	console.log(`Welcome to the File Manager, ${fileManagerState.userName}!`);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	const handlers = [
		exitHandlerFabric(rl),
		...sourceHandlers,
	];

	handleCommandLinesRequests(rl, handlers, fileManagerState)

	rl.on('close', () => console.log(`Thank you for using File Manager, ${fileManagerState.userName}, goodbye!`));
};

const handleCommandLinesRequests = async (rl, handlers, fileManagerState) => {
	logCurrentDirectory(fileManagerState);

	for await (let command of rl) {
		let handlerResult;

		for (let handler of handlers) {
			handlerResult = await handler(command.trim(), fileManagerState);

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

		logCurrentDirectory(fileManagerState);
	}
};

const logCurrentDirectory = (fileManagerState) =>
	console.log(`\nYou are currently in ${fileManagerState.currentDirectory}`);
