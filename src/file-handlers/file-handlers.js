import { catHandler } from './cat-handler.js';
import { addHandler } from './add-handler.js';
import { renameHandler } from './rename-handler.js';
import { copyHandler } from './copy-handler.js';

export const fileHandlers = [
	catHandler,
	addHandler,
	renameHandler,
	copyHandler,
];