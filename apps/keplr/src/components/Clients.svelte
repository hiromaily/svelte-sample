<script lang="ts">
	import { onMount } from 'svelte';
	import { storeChainID } from '$lib/store';
	import { defaultChainID } from '$lib/config';
	import {
		createCosmosClient,
		createCosmWasmClient,
		createStargateClient
	} from '$lib/cosmosClient';
	// issue: https://github.com/sveltejs/svelte/issues/5373
	// http://newspatrak.com/javascript/how-do-i-load-an-external-js-library-in-svelte-sapper/
	//import { SigningCosmosClient } from '@cosmjs/launchpad';

	//let cosmJS: SigningCosmosClient | undefined = undefined;
	let address = '';
	let chainId = defaultChainID; // use writable stores with chainID, [https://svelte.dev/tutorial/writable-stores]

	storeChainID.subscribe((value) => {
		chainId = value;
		// updateAddress(chainId);
	});

	// initialization
	onMount(async () => {
		await updateAddress(chainId);
	});

	// updateAddress() must run after chainID updated
	const updateAddress = async (chainID: string) => {
		await Window.keplr.enable(chainID);
		const offlineSigner = Window.getOfflineSigner(chainID);
		const account = (await offlineSigner.getAccounts())[0];
		address = account.address;

		// SigningCosmosClient
		const cosmClient = createCosmosClient(address, offlineSigner);
		console.dir(cosmClient);

		// SigningCosmWasmClient
		const wasmClient = createCosmWasmClient(address, offlineSigner, chainId);
		console.dir(wasmClient);

		// SigningStargateClient
		const stargateClient = await createStargateClient(address, offlineSigner);
		console.dir(stargateClient);
	};
</script>

<div class="mx-3 mt-4">
	<h4>clients</h4>
</div>
