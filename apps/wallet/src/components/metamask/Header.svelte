<script lang="ts">
	import { onMount } from 'svelte';
	import detectEthereumProvider from '@metamask/detect-provider';

	// UI related
	let isInstalled = false;

	onMount(async () => {
		if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
			isInstalled = true;
		}
		const provider = await detectEthereumProvider();
		if (provider) {
			// From now on, this should always be true:
			// provider === window.ethereum
			console.log('provider is found');
		} else {
			console.log('provider is not found');
		}
	});

	const clickInstallMetamask = () => {
		const link =
			'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related';
		window.open(link);
	};

	const clickConnectMetamask = () => {
		(async () => {
			// get account
			const accounts = await window.ethereum?.request({ method: 'eth_requestAccounts' });
			console.log(`account: ${accounts[0]}`);
		})();
	};
	// TODO: send transaction
	// https://docs.metamask.io/guide/sending-transactions.html

	// Event
	if (isInstalled) {
		window.ethereum.on('accountsChanged', (accounts: any) => {
			// Time to reload your interface with accounts[0]!
			console.log(accounts[0]);
		});
	}
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
