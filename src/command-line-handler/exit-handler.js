const EXIT_COMMAND_HANDLER = '.exit';

export const exitHandlerFabric = (rl) =>
	async (command) => {
		if (EXIT_COMMAND_HANDLER !== command) {
			return { isAppropriateHandler: false };
		}

		rl.close()

		return {
			isClosed: true,
			isAppropriateHandler: true,
		};
	};