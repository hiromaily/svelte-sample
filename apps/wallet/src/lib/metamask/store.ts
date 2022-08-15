import { writable } from 'svelte/store';
import type { Metamask } from '$lib/metamask/metamask';

type MetamaskOr = Metamask | undefined;

// stores
export const storeIsConnected = writable(false);
export const storeMetamask = writable(undefined as MetamaskOr);
export const storeChainID = writable(0);
