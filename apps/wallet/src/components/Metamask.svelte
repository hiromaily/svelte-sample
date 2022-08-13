<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$components/metamask/Header.svelte';

	// https://svelte.dev/tutorial/onmount
	// - onMount, which runs after the component is first rendered to the DOM
	// https://newbedev.com/referenceerror-document-is-not-defined-in-svelte-3
	onMount(() => {
		if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
			console.log('MetaMask is installed!');
		} else {
			alert('Please install metamask extension');
		}
	});
</script>

<div class="mb-5">
	<h3 class="text-bg-primary p-3">Metamask Wallet</h3>
	<!-- Header component -->
	<Header />
</div>
