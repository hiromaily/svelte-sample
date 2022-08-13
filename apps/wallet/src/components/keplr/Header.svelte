<script lang="ts">
	import { conf } from '$lib/config';
	import { createClientByMnemonic } from '$lib/cosmos/client';
	import { storeClient } from '$lib/keplr/store';

	// create client
	(async () => {
		try {
			const client = await createClientByMnemonic(
				conf.keplr.users['admin'].nemonic,
				conf.keplr.client.lcd,
				conf.keplr.client.options
			);
			// update client
			storeClient.set(client);
		} catch (e) {
			console.error(`fail to call createClientByMnemonic(): ${e}`);
			return;
		}
	})();
</script>
