import { cpusHandler } from './cpus-handler.js';
import { eolHandler } from './eol-handler.js';
import { homedirHandler } from './homedir-handler.js';
import { usernameHandler } from './username-handler.js';

export const osHandlers = [
	eolHandler,
	cpusHandler,
	homedirHandler,
	usernameHandler,
];