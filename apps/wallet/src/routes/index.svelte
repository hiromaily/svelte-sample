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

<svelte:head>
	<!-- CSS only -->
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
		crossorigin="anonymous"
	/>
</svelte:head>

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
