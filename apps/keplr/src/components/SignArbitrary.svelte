<script lang="ts">
	import { onMount } from 'svelte';
	import { storeChainID } from '$lib/store';
	import { defaultChainID } from '$lib/config';

	// import { SigningCosmosClient } from '@cosmjs/launchpad';
	// import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
	// import { SigningStargateClient } from '@cosmjs/stargate';

	let chainId = defaultChainID; // use writable stores with chainID [https://svelte.dev/tutorial/writable-stores]
	storeChainID.subscribe((value) => {
		chainId = value;
	});

	let signature = 'result';
	let address = '';

	// initialization
	onMount(async () => {
		await updateAddress(chainId);
	});

	// updateAddress() must run after chainID updated
	const updateAddress = async (chainID: string) => {
		await Window.keplr.enable(chainID);
		const offlineSigner = Window.getOfflineSigner(chainID);
		const account = (await offlineSigner.getAccounts())[0];
		//console.log('account:', account);
		address = account.address;
	};

	// refer to https://github.com/chainapsis/keplr-example/blob/master/src/main.js
	const sign = () => {
		// check extension
		if (!Window.getOfflineSigner || !Window.keplr) {
			alert('Please install keplr extension');
			return;
		}
		// check message textarea
		const msg = document.getElementById('messageArbitrary').value;
		if (msg === '') {
			alert('Please input message');
			return;
		}
		console.log(`chainID: ${chainId}`);

		// call signArbitrary()
		(async () => {
			console.log('signArbitrary()');

			// refer to
			// https://github.com/johnletey/cosmos-signatures/blob/6d7ab6d8c9b3956e72aae5456632aa24c4aa1fdd/src/pages/index.tsx
			const res = await Window.keplr.signArbitrary(chainId, address, msg);
			signature = res.signature;
		})();
	};
</script>

<div class="mx-3 mt-4">
	<h4>signArbitrary</h4>
	<div class="mx-3">
		<div class="form-floating">
			<textarea type="input" class="form-control" id="messageArbitrary" placeholder="message" />
			<label for="message">message</label>
			<div class="mt-2">
				<button
					on:click={sign}
					type="button"
					class="btn btn-primary"
					name="send"
					style="width: 100px;"
				>
					Sign
				</button>
			</div>
		</div>
		<div class="mt-4">
			<h5>signature</h5>
			<div class="p-3 border bg-light text-muted">{signature}</div>
		</div>
	</div>
</div>

<style>
	textarea::placeholder {
		color: #aaa;
	}
</style>
