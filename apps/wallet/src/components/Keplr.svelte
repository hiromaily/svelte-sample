<script lang="ts">
	//import { Window as KeplrWindow } from '@keplr-wallet/types';
	import Header from '$components/keplr/Header.svelte';
	import ChainID from '$components/keplr/ChainID.svelte';
	import SignArbitrary from '$components/keplr/SignArbitrary.svelte';
	import SignDirect from '$components/keplr/SignDirect.svelte';
	import Clients from '$components/keplr/Clients.svelte';
	import InitiateTx from '$components/keplr/InitiateTx.svelte';
	import { onMount } from 'svelte';

	// declare global {
	// 	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	// 	interface Window extends KeplrWindow {}
	// }

	// https://svelte.dev/tutorial/onmount
	// - onMount, which runs after the component is first rendered to the DOM
	// https://newbedev.com/referenceerror-document-is-not-defined-in-svelte-3
	onMount(() => {
		//document.addEventListener('DOMContentLoaded', init);
		if (!window.getOfflineSigner || !window.keplr) {
			alert('Please install keplr extension');
		} else {
			console.log('keplr extension is already installed');
		}
	});
</script>

<div class="mb-5">
	<h3 class="text-bg-primary p-3">Keplr Wallet</h3>
	<!-- Header component -->
	<Header />
	<!-- ChainID component -->
	<ChainID />
	<!-- SignArbitrary component -->
	<SignArbitrary />
	<!-- SignDirect component -->
	<SignDirect />
	<!-- Clients component -->
	<Clients />
	<!-- InitiateTx component -->
	<InitiateTx />
</div>
