import { upHandler } from './up-handler.js';
import { cdHandler } from './cd-handler.js';
import { lsHandler } from './ls-handler.js';

export const navigationHandlers = [
	upHandler,
	cdHandler,
	lsHandler,
];