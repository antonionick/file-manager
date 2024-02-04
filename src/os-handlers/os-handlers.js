import { cpusHandler } from './cpus-handler.js';
import { eolHandler } from './eol-handler.js';

export const osHandlers = [
	eolHandler,
	cpusHandler,
];