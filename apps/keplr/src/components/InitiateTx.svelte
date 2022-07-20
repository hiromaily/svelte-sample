<script lang="ts">
	import { onMount } from 'svelte';
	import Long from 'long';
	import { storeClient } from '$lib/store';
	import { conf } from '$lib/config';
	import type { ClientBundle } from '$lib/cosmos/client';
	import { createContractTxForUI, createContractTxJSON } from '$lib/cross/cross';
	import type { ContractTransaction } from '$codec/cross/core/initiator/types';
	import { createAccount } from '$lib/cross/account';
	import { newMsgInitiateTx, msgInitiateTxtoEncodeObject } from '$lib/cross/initiateTx';
	//import { TxRaw, AuthInfo, TxBody } from '$codec/cosmos/tx/v1beta1/tx';
	//import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';

	let client: ClientBundle | undefined;
	let ctx: ContractTransaction | undefined = undefined;
	let ctx2: ContractTransaction | undefined = undefined;

	// UI related
	let senderAddr = '';
	let chainChannel = 'channel-0:cross';
	let chainId = 'ibc0';
	let resContractTx = '';
	let resContractTx2 = '';

	// initialization
	onMount(async () => {
		storeClient.subscribe((value) => {
			if (!value) return;
			client = value.clientBundle;
			senderAddr = value.address;
			console.log('client is updated');
		});
		// create client
		// const wallet = await getWallet(mnemonic);
		// const accounts = await wallet.getAccounts();

		// const registry = new Registry();
		// registry.register(`/${MsgInitiateTx.$type}`, MsgInitiateTx as GeneratedType);
		// registry.register(MsgInitiateTx.$type, MsgInitiateTx as GeneratedType);
		// const options = { registry: registry };

		// if (accounts && accounts.length == 0) {
		// 	alert('failed to create client');
		// 	return;
		// }
		// // create client
		// client = await createClientBundle(conf.client.lcd, wallet, options);
		// senderAddr = accounts[0].address;
	});

	// read cosmos sample code
	// https://github.com/bitsongofficial/cassini/blob/cb17ab051938fe45f573b3c0ac565b855517e5b9/src/libraries/cosmos.ts
	// FIXME: Do I need to use https://github.com/terra-money/terra.js ??

	const clickCreateContractTx = async () => {
		if (!client) {
			console.log('client is not ready');
			return;
		}

		// contract A
		const amout = 100;
		let callInfo = `{"method":"transfer","args":["${conf.users['bob'].address}","${amout}"]}`;
		ctx = await createContractTxForUI(client, conf.users['alice'].address, callInfo, undefined);
		if (ctx) {
			resContractTx = createContractTxJSON(ctx);
			console.log(resContractTx);
		}

		// contract B
		callInfo = `{"method":"transfer","args":["${conf.users['alice'].address}","${amout}"]}`;
		ctx2 = await createContractTxForUI(client, conf.users['bob'].address, callInfo, chainChannel);
		if (ctx2) {
			resContractTx2 = createContractTxJSON(ctx2);
			console.log('hogehoge:', resContractTx2);
		}
	};

	const clickSendInitiateTx = async () => {
		if (!client || !client.stargate) {
			console.log('client is not ready');
			return;
		}

		const lightHeight = Long.fromNumber(1000);
		let ctxs: Array<ContractTransaction> = [];
		if (ctx) ctxs.push(ctx);
		if (ctx2) ctxs.push(ctx2);

		// get signer by alice -> it may mean, wallet must be created from alice's nemonic
		const account = createAccount(conf.users['admin'].address);
		// create MsgInitiateTx
		const msg = newMsgInitiateTx(lightHeight, chainId, account, ctxs, undefined);
		const memo = '';

		console.log(`senderAddr: ${senderAddr}`);
		const res = await client.stargate.signAndBroadcast(
			senderAddr,
			[msgInitiateTxtoEncodeObject(msg)],
			conf.fee,
			memo
		);
		console.log('clickSendInitiateTx(7)');
		// export interface DeliverTxResponse {
		//   readonly height: number;
		//   /** Error code. The transaction suceeded iff code is 0. */
		//   readonly code: number;
		//   readonly transactionHash: string;
		//   readonly rawLog?: string;
		//   readonly data?: readonly MsgData[];
		//   readonly gasUsed: number;
		//   readonly gasWanted: number;
		// }
		console.log(res);
	};
</script>

<div class="mx-3 mt-4">
	<h4>Create InitiateTx (Alice to Bob)</h4>
	<div class="mx-3">
		<div class="row">
			<div class="input-group">
				<label for="inputReceiver" class="col-sm-3 col-form-label">Chain Channel:</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="inputReceiver" value={chainChannel} />
				</div>
			</div>

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
				<h5>Result of ContractTx1</h5>
				<div class="p-3 border bg-light text-muted"><pre>{resContractTx}</pre></div>
				<h5>Result of ContractTx2</h5>
				<div class="p-3 border bg-light text-muted"><pre>{resContractTx2}</pre></div>
			</div>

			<div class="col-sm-12">
				<button
					on:click={clickSendInitiateTx}
					type="button"
					class="btn btn-primary"
					name="send"
					style="width: 170px;"
				>
					Submit InitiateTx
				</button>
			</div>
		</div>
	</div>
</div>
