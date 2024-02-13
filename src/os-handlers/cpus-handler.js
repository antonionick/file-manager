import * as os from 'node:os';

const CPUS_HANDLER_COMMAND = 'os --cpus';

export const cpusHandler = async (command) => {
	if (command !== CPUS_HANDLER_COMMAND) {
		return { isAppropriateHandler: false };
	}

	try {
		const cpus = os
			.cpus()
			.map(cpu => ({
				model: cpu.model,
				clockRate: `${cpu.speed / 1000} GHz`
			}))

		console.table(cpus);

		return { isAppropriateHandler: true };
	} catch {
		return {
			isAppropriateHandler: true,
			isOperationFailed: true
		};
	}
};