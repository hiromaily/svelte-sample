// https://stackoverflow.com/questions/70529698/svelte-spa-router-invalid-component-object-error
// this doesn't work in server-side rendered SvelteKit projects
import Top from '$components/Top.svelte';
import Metamask from '$components/Metamask.svelte';
import Keplr from '$components/Keplr.svelte';

export const routes = {
	'/': Top,
	'/metamask': Metamask,
	'/keplr': Keplr
};
