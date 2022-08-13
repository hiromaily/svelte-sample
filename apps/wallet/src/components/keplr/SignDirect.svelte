<script lang="ts">
	import { onMount } from 'svelte';
	import type { SignDoc } from '$codec/cosmos/tx/v1beta1/tx';
	import { Coin } from '$codec/cosmos/base/v1beta1/coin';
	import { updateKeplrAddress } from '$lib/keplr/address';
	import { conf } from '$lib/config';
	import { storeChainID } from '$lib/keplr/store';
	import { newMsgTransfer, buildSignDocWithMsgTransfer } from '$lib/cosmos/msg';
	//import { Buffer } from 'buffer';

	let chainId = conf.keplr.chainIDs[0]; // use writable stores with chainID, [https://svelte.dev/tutorial/writable-stores]

	// UI related
	let sender = '';
	let receiver = 'cosmos1ca0zlqxjqv5gek5qxm602umtkmu88564hpyws4'; // just dummy data
	let sourcePort = 'transfer';
	let sourceChannel = 'channel-0';
	let signature = 'result';

	// initialization
	onMount(async () => {
		//sender = await updateKeplrAddress(chainId);
		storeChainID.subscribe((value) => {
			chainId = value;
			// update address
			updateKeplrAddress(chainId)
				.then((res) => {
					sender = res.address;
				})
				.catch((e) => {
					console.error(`fail to call updateKeplrAddress(): ${e}`);
				});
		});
	});

	const createSignDoc = (sender: string): SignDoc => {
		const token: Coin = {
			$type: Coin.$type,
			denom: 'cosmosign',
			amount: '100'
		};

		const msgTransfer = newMsgTransfer(sourcePort, sourceChannel, token, sender, receiver);
		return buildSignDocWithMsgTransfer(msgTransfer, chainId);
	};

	// refer to https://github.com/chainapsis/keplr-example/blob/master/src/main.js
	const clickSign = () => {
		// check extension
		if (!window.getOfflineSigner || !window.keplr) {
			alert('Please install keplr extension');
			return;
		}
		// TODO: check input

		// call signDirect()
		// refer to https://github.com/citadeldao/citadel-frontend/blob/740f25e47024d03ecb35c5611a719c2fa0c5a341/src/models/Services/Keplr.js
		(async () => {
			console.log('signDirect()');

			const signDoc = createSignDoc(sender);
			const signOptions = {};
			const res = await window.keplr.signDirect(chainId, sender, signDoc, signOptions);
			console.dir(res); //debug
			// https://stackoverflow.com/questions/69051857/svelte-referenceerror-buffer-is-not-defined
			//signature = Buffer.from(res.signature.signature, 'base64').toString('hex');
			signature = res.signature.signature;
		})();
	};
</script>

<div class="mx-3 mt-4">
	<h4>signDirect<span style="padding-left: 20px;font-size:medium;">(sign on MsgTransfer)</span></h4>

	<div class="mx-3">
		<div class="row">
			<label for="inputSender" class="col-sm-3 col-form-label">Sender (Keplr address):</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="inputSender" value={sender} readonly />
			</div>
			<label for="inputReceiver" class="col-sm-3 col-form-label">Receiver (dummy):</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="inputReceiver" value={receiver} />
			</div>
			<label for="inputPort" class="col-sm-3 col-form-label">Source Port:</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="inputPort" value={sourcePort} />
			</div>
			<label for="inputChannel" class="col-sm-3 col-form-label">Source Channel:</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="inputChannel" value={sourceChannel} />
			</div>
			<div class="col-sm-9">
				<button
					on:click={clickSign}
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
