import * as  os from 'node:os';
import { getUserName } from './process-arguments-handler.js';
import { registerCommandLineHandler } from './command-line-handler/command-line-handler.js';
import { fileHandlers } from './file-handlers/file-handlers.js';
import { navigationHandlers } from './navigation-handlers/navigation-handlers.js';
import { osHandlers } from './os-handlers/os-handlers.js';

const handlers = [
	...fileHandlers,
	...navigationHandlers,
	...osHandlers,
];

const fileManagerState = {
	userName: getUserName(),
	currentDirectory: os.homedir(),
};

registerCommandLineHandler(handlers, fileManagerState);