<script lang="ts">
	import { conf } from '$lib/config';
	import { createClientByMnemonic } from '$lib/cosmos/client';
	import { storeClient } from '$lib/store';

	// create client
	(async () => {
		try {
			const client = await createClientByMnemonic(
				conf.users['admin'].nemonic,
				conf.client.lcd,
				conf.client.options
			);
			// update client
			storeClient.set(client);
		} catch (e) {
			console.error(`fail to call createClientByMnemonic(): ${e}`);
			return;
		}
	})();
</script>
