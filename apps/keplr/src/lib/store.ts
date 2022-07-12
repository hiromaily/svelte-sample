import { writable } from 'svelte/store';
import { defaultChainID } from '$lib/config';

// chainID
export const storeChainID = writable(defaultChainID);
