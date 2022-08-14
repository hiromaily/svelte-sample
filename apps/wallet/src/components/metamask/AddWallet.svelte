<script lang="ts">
	import { onMount } from 'svelte';
	import { chainIDMap } from '$lib/metamask/chainid';
	import type { Metamask } from '$lib/metamask/metamask';
	import { storeMetamask, storeChainID } from '$lib/metamask/store';

	let meta: Metamask;
	let chainID = 0; //FIXME: set default number

	onMount(async () => {
		// subscribe
		storeMetamask.subscribe((value) => {
			if (!value) return;
			meta = value;
		});
		storeChainID.subscribe((value) => {
			chainID = value;
			console.log(`chainID in addWallet subscribe: ${chainID}`);
		});

		// get current selected value
		// const chid = (document?.getElementById('chainid') as HTMLSelectElement).value;
		// if (chid) chainID = parseInt(chid, 10);
	});

	const chainIDChanged = (e: { target: HTMLSelectElement }) => {
		console.log(`chainID changed: ${e.target.value}`);
		chainID = parseInt(e.target.value, 10);
	};

	const clickAddNetwork = async () => {
		// add network or switch network
		if (!chainID) {
			alert(`chainID is invalid`);
			return;
		}
		console.log(`chainID: ${chainID}`);
		meta.addEthereumChain(chainID);
	};

	$: chainID_ = chainID.toString();
</script>

<div class="mx-3 mt-4 row">
	<label for="chainid" class="col-sm-3 col-form-label">ChainID:</label>
	<div class="col-sm-9">
		<select
			bind:value={chainID_}
			on:change={chainIDChanged}
			name="chainid"
			id="chainid"
			class="form-select"
			aria-label="ChainID"
		>
			{#each Object.entries(chainIDMap) as [key, value], index (key)}
				<option value={key}>{value}</option>
			{/each}
		</select>
	</div>

	<div class="col-sm-9">
		<button
			on:click={clickAddNetwork}
			type="button"
			class="btn btn-primary"
			name="addNetwork"
			style="width: 150px;"
		>
			Add Network
		</button>
	</div>
</div>
