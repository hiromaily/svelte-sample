<script lang="ts">
	import { onMount } from 'svelte';
	// import type { OfflineSigner } from '@cosmjs/launchpad';
	// import type { OfflineDirectSigner } from '@cosmjs/proto-signing';
	import type { SigningStargateClient, StdFee } from '@cosmjs/stargate';
	import { updateAddress, getWallet } from '$lib/address';
	import { defaultChainID, defaultMnemonic, lcdSigningStargateClient } from '$lib/config';
	import { storeChainID } from '$lib/store';
	import { createStargateClient } from '$lib/cosmosClient';

	let chainId = defaultChainID; // use writable stores with chainID, [https://svelte.dev/tutorial/writable-stores]
	//let address = '';
	let stargateClient: SigningStargateClient | undefined = undefined;

	// UI related
	let mnemonic = defaultMnemonic;
	let mnemonicAddr = '';
	let receiverAddr = 'cosmos127f42r0k2980u8phytr7eg2r836dn6lgjcn7yg'; // created by alpha CLI (https://github.com/datachainlab/fabric-tendermint-cross-demo)
	let amount = '100';
	let denom = 'samoleans';

	// initialization
	onMount(async () => {
		storeChainID.subscribe((value) => {
			chainId = value;
			// update address
			updateAddress(chainId)
				.then((res) => {
					//address = res.address;
					return res.offlineSigner;
				})
				.then((offlineSigner) => {
					return createSigningStargateClient(offlineSigner);
				});
		});
	});

	const createSigningStargateClient = async (offlineSigner: any) => {
		// SigningStargateClient
		stargateClient = await createStargateClient(lcdSigningStargateClient, offlineSigner);
		if (stargateClient) {
			console.dir(stargateClient);
		}
	};

	// const createSigningCosmosClient = async (offlineSigner: any) => {
	// 	//SigningCosmosClient: deprecated
	// 	const cosmClient = createCosmosClient(lcdSigningCosmosClient, address, offlineSigner);
	// 	console.dir(cosmClient);
	// 	signerAddr = cosmClient.signerAddress;
	// 	console.log(await cosmClient.getSequence(address));
	// 	console.log(await cosmClient.getAccount(address));
	// };

	// const createSigningCosmWasmClient = async (offlineSigner: any) => {
	// 	// SigningCosmWasmClient
	// 	const wasmClient = createCosmWasmClient(address, offlineSigner, chainId);
	// 	console.dir(wasmClient);
	// };

	const clickMnemonic = async () => {
		const mnem = document.getElementById('inputMnemonic').value;
		if (mnem === '') {
			alert('Please input Mnemonic');
			return;
		}
		const wallet = await getWallet(mnem);
		const accounts = await wallet.getAccounts();
		console.log('accounts:', accounts);
		if (accounts && accounts.length > 0) {
			// create client
			stargateClient = await createStargateClient(lcdSigningStargateClient, wallet);
			// mnemonic address
			mnemonicAddr = accounts[0].address;
		}
	};

	const clickSendToken = async () => {
		if (!stargateClient) {
			alert('SigningStargateClient can not be created');
			return;
		}
		if (mnemonicAddr == '' || amount == '' || denom == '') {
			alert('validation error for your input');
			return;
		}
		const amountDenom = {
			denom: denom,
			amount: amount
		};
		// send token
		// sendTokens(
		// 	senderAddress: string,
		//  recipientAddress: string,
		// 	amount: readonly Coin[],
		// 	fee: StdFee | "auto" | number,
		// 	memo?: string
		// ): Promise<DeliverTxResponse>;

		// Error: Gas price must be set in the client options when auto gas is used
		// => set `minimum-gas-prices` in app.toml
		// Failed to retrieve account from signer
		const fee: StdFee = {
			amount: [],
			gas: '450000'
		};
		const res = await stargateClient.sendTokens(mnemonicAddr, receiverAddr, [amountDenom], fee);
		console.log(res);
	};
</script>

<div class="mx-3 mt-4">
	<h4>SigningStargateClient</h4>

	<div class="mx-3">
		<div class="row">
			<div class="input-group col-sm-9">
				<label for="inputMnemonic" class="col-sm-3 col-form-label">Mnemonic:</label>
				<input
					type="text"
					id="inputMnemonic"
					class="form-control"
					placeholder="mnemonic"
					aria-label="mnemonic"
					aria-describedby="basic-addon2"
					value={mnemonic}
				/>
				<div class="input-group-append">
					<button
						on:click={clickMnemonic}
						class="btn btn-outline-primary"
						type="button"
						style="width: 120px;">Get Address</button
					>
				</div>
			</div>

			<div class="input-group">
				<label for="inputAddr" class="col-sm-3 col-form-label">Mnemonic address:</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="inputAddr" value={mnemonicAddr} readonly />
				</div>
			</div>

			<div class="input-group">
				<label for="inputLCD" class="col-sm-3 col-form-label">StargateClient LCP:</label>
				<div class="col-sm-9">
					<input
						type="text"
						class="form-control"
						id="inputLCD"
						value={lcdSigningStargateClient}
						readonly
					/>
				</div>
			</div>

			<div class="input-group">
				<label for="inputReceiver" class="col-sm-3 col-form-label">Receiver address:</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="inputReceiver" value={receiverAddr} />
				</div>
			</div>

			<div class="input-group">
				<label for="inputAmount" class="col-sm-3 col-form-label">Amount:</label>
				<div class="col-sm-4">
					<input
						type="text"
						class="form-control input-group"
						id="inputAmount"
						placeholder="Amount"
						value={amount}
					/>
				</div>
				<div class="col-sm-1" />
				<div class="col-sm-4">
					<input
						type="text"
						class="form-control input-group"
						id="inputReceiver"
						placeholder="Denom"
						value={denom}
					/>
				</div>
			</div>

			<div class="col-sm-12">
				<button
					on:click={clickSendToken}
					type="button"
					class="btn btn-primary"
					name="send"
					style="width: 120px;"
				>
					Send Token
				</button>
			</div>
		</div>
	</div>
</div>
