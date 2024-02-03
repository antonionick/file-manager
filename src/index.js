import * as  os from 'node:os';
import { getUserName } from './process-arguments-handler.js';
import { registerCommandLineHandler } from './command-line-handler.js';
import { navigationHandlers } from './navigation-handlers/navigation-handlers.js';

const handlers = [
	...navigationHandlers,
];

const fileMangerState = {
	userName: getUserName(),
	currentDirectory: os.homedir(),
};

registerCommandLineHandler(handlers, fileMangerState);