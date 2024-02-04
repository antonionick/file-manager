import { compressFileHandler } from './compress-file-handler.js';
import { decompressFileHandler } from './decompress-file-handler.js';

export const compressHandlers = [
	compressFileHandler,
	decompressFileHandler,
];