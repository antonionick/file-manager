import * as  os from 'node:os';
import { registerCommandLineHandler } from './command-line-handler.js';
import { getUserName } from './process-arguments-handler.js';

const fileMangerState = {
	userName: getUserName(),
	currentDirectory: os.homedir(),
};

registerCommandLineHandler(fileMangerState);