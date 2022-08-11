<script lang="ts">
	//import { Window as KeplrWindow } from '@keplr-wallet/types';
	import Keplr from '$components/Keplr.svelte';
	import { onMount } from 'svelte';

	// https://svelte.dev/tutorial/onmount
	// - onMount, which runs after the component is first rendered to the DOM
	// https://newbedev.com/referenceerror-document-is-not-defined-in-svelte-3
	onMount(() => {});
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

<div>
	<!-- Keplr component -->
	<Keplr />
</div>
