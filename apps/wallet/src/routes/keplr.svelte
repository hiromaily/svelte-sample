<script lang="ts">
	import Top from '$components/Top.svelte';
	import Keplr from '$components/Keplr.svelte';
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
	<!-- Top component -->
	<Top />
	<!-- Keplr component -->
	<Keplr />
</div>
