<script lang="ts">
	import { onMount } from 'svelte';
	import type { SigningStargateClient, QueryClient } from '@cosmjs/stargate';
	import { getWallet } from '$lib/address';
	import { defaultMnemonic, AliceAddress, BobAddress, lcdSigningStargateClient } from '$lib/config';
	import { createClientBundle } from '$lib/cosmos/client';
	import type { ClientBundle } from '$lib/cosmos/client';

	let client: ClientBundle;
	// UI related
	let mnemonic = defaultMnemonic;
	let mnemonicAddr = '';
	let resContractTx = '';

	// initialization
	onMount(async () => {
		// create client
		const wallet = await getWallet(mnemonic);
		const accounts = await wallet.getAccounts();
		console.log('accounts:', accounts);
		if (accounts && accounts.length > 0) {
			// create client
			client = await createClientBundle(lcdSigningStargateClient, wallet);
			// mnemonic address
			mnemonicAddr = accounts[0].address;
		}
	});

	// read cosmos sample code
	// https://github.com/bitsongofficial/cassini/blob/cb17ab051938fe45f573b3c0ac565b855517e5b9/src/libraries/cosmos.ts
	// FIXME: Do I need to use https://github.com/terra-money/terra.js ??

	const clickCreateContractTx = async () => {
		const amout = 100;
		const callInfo = `{"method":"transfer","args":["${BobAddress}","${amout}"]}`;
		const signerAddr = AliceAddress;
		if (!client) {
			return;
		}

		// refer to https://github.com/search?q=broadcastTx+cosmjs&type=code
		//stargateClient.broadcastTx();

		// refer to https://github.com/search?q=abciQuery+cosmjs&type=code
		// const tmClient = await Tendermint34Client.connect(lcdSigningStargateClient);
		// tmClient.abciQuery()
	};
</script>

<div class="mx-3 mt-4">
	<h4>Create InitiateTx (Alice to Bob)</h4>
	<div class="mx-3">
		<div class="row">
			<div class="col-sm-12">
				<button
					on:click={clickCreateContractTx}
					type="button"
					class="btn btn-primary"
					name="send"
					style="width: 170px;"
				>
					Create ContractTx
				</button>
			</div>

			<div class="mt-4">
				<h5>Result of ContractTx</h5>
				<div class="p-3 border bg-light text-muted"><pre>{resContractTx}</pre></div>
			</div>
		</div>
	</div>
</div>
