<script lang="ts">
	import { onMount } from 'svelte';
	import { Metamask, isMetamaskInstalled, openExtension } from '$lib/metamask/metamask';
	import { chainIDMap } from '$lib/metamask/chainid';
	import { storeMetamask, storeIsConnected, storeChainID } from '$lib/metamask/store';

	let meta: Metamask;
	// UI related
	let isInstalled = false;
	let isConnected = false;
	let chainID = 0;
	let networkName = '';
	let currentAddress = '';

	onMount(async () => {
		// subscribe
		storeChainID.subscribe((value) => {
			chainID = value;
			if (chainIDMap[chainID]) networkName = chainIDMap[chainID];
		});

		const provider = await isMetamaskInstalled();
		if (provider) {
			// From now on, this should always be true:
			// provider === window.ethereum
			console.log('provider is found');
			isInstalled = true;
			// create
			meta = new Metamask(provider);
			// register event
			meta.readyEvent();

			// update store
			storeMetamask.set(meta);

			// if already connected
			if (meta.isConnected()) await loadContents();
		} else {
			console.log('provider is not found');
		}
	});

	const loadContents = async () => {
		// address
		const addrs = await meta.getAddress();
		// Note: if not connected, address would be just []
		if (addrs && addrs.length != 0) {
			currentAddress = addrs[0];
			isConnected = true;
			storeIsConnected.set(isConnected);
		}

		// chainID (0x1)
		chainID = await meta.chainID().then((res) => {
			return parseInt(res, 16);
		});

		// update store
		storeChainID.set(chainID);
	};

	const clickInstallMetamask = () => {
		openExtension();
	};

	const clickConnectMetamask = async () => {
		const account = await meta.getAccount();
		console.log(`account: ${account}`);

		await loadContents();
	};
</script>

<div class="mx-3 mt-4 row">
	<div class="row">
		<label for="inputNetwork" class="col-sm-3 col-form-label">networkVersion:</label>
		<div class="col-sm-9">
			<input
				type="text"
				class="form-control"
				id="inputNetwork"
				value={chainID + ' : ' + networkName}
				readonly
			/>
		</div>
		<label for="inputAddress" class="col-sm-3 col-form-label">currentAddress:</label>
		<div class="col-sm-9">
			<input type="text" class="form-control" id="inputAddress" value={currentAddress} readonly />
		</div>

		<div class="col-sm-9">
			{#if isInstalled}
				<button
					on:click={clickConnectMetamask}
					type="button"
					class="btn btn-primary"
					name="connect"
					style="width: 170px;"
					disabled={isConnected || null}
				>
					Connect Metamask
				</button>
			{:else}
				<button
					on:click={clickInstallMetamask}
					type="button"
					class="btn btn-primary"
					name="install"
					style="width: 150px;"
					disabled={isInstalled || null}
				>
					Install Metamask
				</button>
			{/if}
		</div>
	</div>
</div>
