import { writable } from 'svelte/store';
import { conf } from '$lib/config';
import type { ClientBundleAddress } from '$lib/cosmos/client';

type ClientBundleAddressOr = ClientBundleAddress | undefined;

// stores
export const storeChainID = writable(conf.keplr.chainIDs[0]);
export const storeClient = writable(undefined as ClientBundleAddressOr);
