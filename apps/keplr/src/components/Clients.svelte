<script lang="ts">
	import { onMount } from 'svelte';
	import { conf } from '$lib/config';
	import { createClientByMnemonic } from '$lib/cosmos/client';
	import type { ClientBundle } from '$lib/cosmos/client';
	import { storeClient } from '$lib/store';

	let client: ClientBundle | undefined;

	// UI related
	let mnemonic = conf.users['admin'].nemonic;
	let mnemonicAddr = '';
	let receiverAddr = conf.users['alice'].address; // created by alpha CLI (https://github.com/datachainlab/fabric-tendermint-cross-demo)
	let amount = '100';
	let denom = 'samoleans';
	let resSendToken = '';
	let receiverBalance = '';

	// initialization
	onMount(async () => {
		storeClient.subscribe((value) => {
			if (!value) return;
			client = value.clientBundle;
			mnemonicAddr = value.address;
			console.log('client is updated');
		});

		// storeChainID.subscribe((value) => {
		// 	chainId = value;
		// 	// update address
		// 	updateAddress(chainId)
		// 		.then((res) => {
		// 			//address = res.address;
		// 			return res.offlineSigner;
		// 		})
		// 		.then((offlineSigner) => {
		// 			return createSigningStargateClient(offlineSigner);
		// 		});
		// });
		//clickMnemonic();
	});

	// const createSigningStargateClient = async (offlineSigner: any) => {
	// 	// SigningStargateClient
	// 	stargateClient = await createStargateClient(lcdSigningStargateClient, offlineSigner);
	// 	if (stargateClient) {
	// 		console.dir(stargateClient);
	// 	}
	// };

	const clickMnemonic = async () => {
		if (mnemonic === '') {
			alert('Please input Mnemonic');
			return;
		}
		try {
			const ret = await createClientByMnemonic(mnemonic, conf.client.lcd, conf.client.options);
			client = ret.clientBundle;
			mnemonicAddr = ret.address;
			// update client
			storeClient.set(ret);
		} catch (e) {
			alert(e);
			return;
		}
	};

	const clickSendToken = async () => {
		if (!client || !client.stargate) {
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
		console.log(`senderAddr: ${mnemonicAddr}`);
		const res = await client.stargate.sendTokens(
			mnemonicAddr,
			receiverAddr,
			[amountDenom],
			conf.fee
		);
		console.log(res);
		resSendToken = JSON.stringify(res, null, 2);

		// receiver balance
		const balance = await client.stargate.getBalance(receiverAddr, denom);
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
					<input type="text" class="form-control" id="inputLCD" value={conf.client.lcd} readonly />
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
