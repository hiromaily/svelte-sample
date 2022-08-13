<script lang="ts">
	import { onMount } from 'svelte';
	import { Metamask, isMetamaskInstalled, openExtension } from '$lib/metamask/metamask';

	let meta: Metamask;
	// UI related
	let isInstalled = false;

	onMount(async () => {
		const provider = await isMetamaskInstalled();
		if (provider) {
			// From now on, this should always be true:
			// provider === window.ethereum
			console.log('provider is found');
			// create
			meta = new Metamask(provider);
		} else {
			console.log('provider is not found');
		}
	});

	const clickInstallMetamask = () => {
		openExtension();
	};

	const clickConnectMetamask = async () => {
		const account = await meta.getAccount();
		console.log(`account: ${account}`);
		// (async () => {
		// 	// get account
		// 	const accounts = await window.ethereum?.request({ method: 'eth_requestAccounts' });
		// 	console.log(`account: ${accounts[0]}`);
		// })();
	};
</script>

<div class="mx-3 mt-4 row">
	<div class="mt-2">
		<button
			on:click={clickInstallMetamask}
			type="button"
			class="btn btn-primary"
			name="install"
			style="width: 150px;"
			disabled={isInstalled || null}
		>
			Install Metamask
		</button>
	</div>
	<div class="mt-2">
		<button
			on:click={clickConnectMetamask}
			type="button"
			class="btn btn-primary"
			name="connect"
			style="width: 170px;"
			disabled={!isInstalled || null}
		>
			Connect Metamask
		</button>
	</div>
</div>
