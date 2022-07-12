<script lang="ts">
	import { onMount } from 'svelte';
	import { SignDoc } from '$codec/cosmos/tx/v1beta1/tx';
	import { Coin } from '$codec/cosmos/base/v1beta1/coin';
	import { newMsgTransfer, buildSignDocWithMsgTransfer } from '$lib/msg';
	import { storeChainID } from '$lib/store';
	import { defaultChainID } from '$lib/config';
	//import { Buffer } from 'buffer';

	let chainId = defaultChainID; // use writable stores with chainID, [https://svelte.dev/tutorial/writable-stores]
	storeChainID.subscribe((value) => {
		chainId = value;
		// updateAddress(chainId);
	});

	let signature = 'result';
	let sender = '';
	let receiver = 'cosmos1ca0zlqxjqv5gek5qxm602umtkmu88564hpyws4';
	let sourcePort = 'transfer';
	let sourceChannel = 'channel-0';

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
		sender = account.address;
	};

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
	const sign = () => {
		// check extension
		if (!Window.getOfflineSigner || !Window.keplr) {
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
			const res = await Window.keplr.signDirect(chainId, sender, signDoc, signOptions);
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
			<label for="inputSender" class="col-sm-3 col-form-label">Sender:</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="inputSender" value={sender} readonly />
			</div>
			<label for="inputReceiver" class="col-sm-3 col-form-label">Receiver:</label>
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
