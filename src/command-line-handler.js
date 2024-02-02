import * as readline from 'node:readline';
import * as  process from 'node:process';

export const registerCommandLineHandler = (fileMangerState) => {
	console.log(`Welcome to the File Manager, ${fileMangerState.userName}!`);

	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

	try {
		handleCommandLinesRequests(rl, fileMangerState)
	} catch (_) {
		handleCommandLinesRequests(rl, fileMangerState);
	}

	rl.on('close', () => console.log(`Thank you for using File Manager, ${fileMangerState.userName}, goodbye!`));
};

const handleCommandLinesRequests = async (rl, fileMangerState) => {
	logCurrentDirectory(fileMangerState);

	for await (let line of rl) {

		logCurrentDirectory(fileMangerState);
	}
};

const logCurrentDirectory = (fileMangerState) =>
	console.log(`You are currently in ${fileMangerState.currentDirectory}`);
