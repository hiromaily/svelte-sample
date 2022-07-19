<script lang="ts">
	import { onMount } from 'svelte';
	// import type { OfflineSigner } from '@cosmjs/launchpad';
	// import type { OfflineDirectSigner } from '@cosmjs/proto-signing';
	import type { SigningStargateClient, StdFee } from '@cosmjs/stargate';
	import { updateAddress, getWallet } from '$lib/address';
	import {
		defaultChainID,
		defaultMnemonic,
		AliceAddress,
		lcdSigningStargateClient
	} from '$lib/config';
	import { storeChainID } from '$lib/store';
	import { createStargateClient } from '$lib/cosmos/client';

	let chainId = defaultChainID; // use writable stores with chainID, [https://svelte.dev/tutorial/writable-stores]
	let stargateClient: SigningStargateClient | undefined = undefined;

	// UI related
	let mnemonic = defaultMnemonic;
	let mnemonicAddr = '';
	let receiverAddr = AliceAddress; // created by alpha CLI (https://github.com/datachainlab/fabric-tendermint-cross-demo)
	let amount = '100';
	let denom = 'samoleans';
	let resSendToken = '';
	let receiverBalance = '';

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

	const clickMnemonic = async () => {
		if (mnemonic === '') {
			alert('Please input Mnemonic');
			return;
		}
		const wallet = await getWallet(mnemonic);
		const accounts = await wallet.getAccounts();
		//console.log('accounts:', accounts);
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
		// sendTokens(
		// 	senderAddress: string,
		//  recipientAddress: string,
		// 	amount: readonly Coin[],
		// 	fee: StdFee | "auto" | number,
		// 	memo?: string
		// ): Promise<DeliverTxResponse>;

		// Error: Gas price must be set in the client options when auto gas is used
		// => set `minimum-gas-prices` in app.toml
		const fee: StdFee = {
			amount: [],
			gas: '450000'
		};
		const res = await stargateClient.sendTokens(mnemonicAddr, receiverAddr, [amountDenom], fee);
		console.log(res);
		resSendToken = JSON.stringify(res, null, 2);

		// receiver balance
		const balance = await stargateClient.getBalance(receiverAddr, denom);
		receiverBalance = balance.amount;
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
				<label for="inputAmount" class="col-sm-3 col-form-label">Send Amount:</label>
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
					<input type="text" class="form-control input-group" placeholder="Denom" value={denom} />
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

		<div class="mt-4">
			<h5>Result of sendToken</h5>
			<div class="p-3 border bg-light text-muted"><pre>{resSendToken}</pre></div>
		</div>

		<div class="row mt-4">
			<div class="input-group">
				<label for="inputBalance" class="col-sm-3 col-form-label">Receiver Balance:</label>
				<div class="col-sm-4">
					<input
						type="text"
						class="form-control input-group"
						id="inputBalance"
						placeholder="Balance"
						value={receiverBalance}
						readonly
					/>
				</div>
				<div class="col-sm-1" />
				<div class="col-sm-4">
					<input
						type="text"
						class="form-control input-group"
						placeholder="Denom"
						value={denom}
						readonly
					/>
				</div>
			</div>
		</div>
	</div>
</div>
