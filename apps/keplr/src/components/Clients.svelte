<script lang="ts">
	import { onMount } from 'svelte';
	// import type { OfflineSigner } from '@cosmjs/launchpad';
	// import type { OfflineDirectSigner } from '@cosmjs/proto-signing';
	import { updateAddress } from '$lib/address';
	import { defaultChainID, lcdSigningStargateClient } from '$lib/config';
	import { storeChainID } from '$lib/store';
	import { createCosmWasmClient, createStargateClient } from '$lib/cosmosClient';

	let address = '';
	let chainId = defaultChainID; // use writable stores with chainID, [https://svelte.dev/tutorial/writable-stores]

	let signerAddr = '';
	let sequence = '';

	// initialization
	onMount(async () => {
		storeChainID.subscribe((value) => {
			chainId = value;
			// update address
			updateAddress(chainId)
				.then((res) => {
					address = res.address;
					return res.offlineSigner;
				})
				.then((offlineSigner) => {
					return createSigningStargateClient(offlineSigner);
				});
		});
	});

	// const createSigningCosmosClient = async (offlineSigner: any) => {
	// 	//SigningCosmosClient: deprecated
	// 	const cosmClient = createCosmosClient(lcdSigningCosmosClient, address, offlineSigner);
	// 	console.dir(cosmClient);
	// 	signerAddr = cosmClient.signerAddress;
	// 	console.log(await cosmClient.getSequence(address));
	// 	console.log(await cosmClient.getAccount(address));
	// };

	const createSigningStargateClient = async (offlineSigner: any) => {
		// SigningStargateClient
		const stargateClient = await createStargateClient(lcdSigningStargateClient, offlineSigner);
		if (stargateClient) {
			console.dir(stargateClient);
		}
	};

	const createSigningCosmWasmClient = async (offlineSigner: any) => {
		// SigningCosmWasmClient
		const wasmClient = createCosmWasmClient(address, offlineSigner, chainId);
		console.dir(wasmClient);
	};
</script>

<div class="mx-3 mt-4">
	<h4>SigningStargateClient</h4>
	<div class="mx-3">
		<div class="row">
			<label for="inputLCD" class="col-sm-3 col-form-label">LCP:</label>
			<div class="col-sm-9">
				<input
					type="text"
					class="form-control"
					id="inputLCD"
					value={lcdSigningStargateClient}
					readonly
				/>
			</div>
			<label for="inputSignerAddr" class="col-sm-3 col-form-label">SignerAddress:</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="inputReceiver" value={signerAddr} readonly />
			</div>
			<label for="inputSeq" class="col-sm-3 col-form-label">getSequence():</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="inputSeq" value={sequence} />
			</div>
		</div>
	</div>
</div>
