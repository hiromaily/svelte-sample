import type { OfflineSigner } from '@cosmjs/proto-signing';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import type { AbciQueryParams } from '@cosmjs/tendermint-rpc/build/tendermint34/requests';
import { SigningStargateClient } from '@cosmjs/stargate';
import type { SigningStargateClientOptions } from '@cosmjs/stargate';
import { getWallet } from '$lib/keplr/address';
//import { BroadcastMode, SigningCosmWasmClient } from 'secretjs';
//import { SigningCosmosClient } from '@cosmjs/launchpad';
//import type { OfflineSigner as OfflineAminoSigner } from '@cosmjs/launchpad';
//import type { OfflineSigner as KeplrOfflineSigner } from 'secretjs/types/wallet';
//import type { Any } from '$codec/google/protobuf/any';

export interface ClientBundle {
	stargate: SigningStargateClient | undefined;
	tendermint: Tendermint34Client;
}

export interface AbciQueryResponse {
	key: Uint8Array;
	value: Uint8Array;
}

export interface ClientBundleAddress {
	clientBundle: ClientBundle;
	address: string;
}

const createClientBundle = async (
	lcd: string,
	offlineSigner: OfflineSigner,
	options?: SigningStargateClientOptions
): Promise<ClientBundle> => {
	const tendermint = await createTendermintClient(lcd);
	const stargate = await createStargateClient(lcd, offlineSigner, options);
	return {
		stargate: stargate,
		tendermint: tendermint
	};
};

// Note: this function could be error
const createTendermintClient = async (lcd: string): Promise<Tendermint34Client> => {
	return await Tendermint34Client.connect(lcd);
};

const createStargateClient = async (
	lcd: string,
	offlineSigner: OfflineSigner,
	options?: SigningStargateClientOptions
): Promise<SigningStargateClient | undefined> => {
	// refer to
	// - https://github.com/cosmos/cosmjs/blob/main/packages/stargate/src/signingstargateclient.spec.ts
	try {
		const stargateClient = await SigningStargateClient.connectWithSigner(
			lcd,
			offlineSigner,
			options
		);
		return stargateClient;
	} catch (e) {
		console.log(e);
	}

	return undefined;
};

const createClientByMnemonic = async (
	mnemonic: string,
	lcd: string,
	options?: SigningStargateClientOptions
): Promise<ClientBundleAddress> => {
	const wallet = await getWallet(mnemonic);
	const accounts = await wallet.getAccounts();
	if (accounts && accounts.length == 0) {
		return Promise.reject(new Error('failed to create client'));
	}
	// create client
	// Note: createClientBundle could be error
	const client = await createClientBundle(lcd, wallet, options);
	return {
		clientBundle: client,
		address: accounts[0].address
	};
};

// Deprecated
// const createCosmosClient = (
// 	lcd: string,
// 	address: string,
// 	offlineSigner: OfflineAminoSigner
// ): SigningCosmosClient => {
// 	// refer to
// 	// - https://github.com/chainapsis/keplr-wallet/blob/master/docs/api/cosmjs.md#connecting-with-cosmjs
// 	// - https://www.npmjs.com/package/@cosmjs/launchpad?activeTab=readme
// 	// issue:
// 	// - https://github.com/cosmos/cosmjs/issues/702
// 	// - https://github.com/cosmos/cosmjs/issues/940
// 	return new SigningCosmosClient(lcd, address, offlineSigner);
// };

// const createCosmWasmClient = (
// 	address: string,
// 	offlineSigner: KeplrOfflineSigner,
// 	chainId: string
// ): SigningCosmWasmClient => {
// 	const lcd = 'https://lcd-secret.keplr.app/rest';
// 	// client
// 	// refer to
// 	// - https://docs.keplr.app/api/secretjs.html
// 	// - https://github.com/scrtlabs/QueryBalancePermitDemo/blob/d48a1c893eb042329f14518084b6d887ee2c0ea2/src/KeplrStuff.tsx
// 	const client = new SigningCosmWasmClient(
// 		lcd,
// 		address,
// 		offlineSigner,
// 		window.getEnigmaUtils!(chainId),
// 		undefined,
// 		BroadcastMode.Sync
// 	);
// 	return client;
// };

const query = async (
	client: ClientBundle,
	method: string,
	req: Uint8Array
): Promise<AbciQueryResponse> => {
	// refer to https://github.com/search?q=abciQuery+cosmjs&type=code
	//params: requests.AbciQueryParams
	// export interface AbciQueryParams {
	//   readonly path: string;
	//   readonly data: Uint8Array;
	//   readonly height?: number;
	// }
	const params: AbciQueryParams = {
		path: method,
		data: req
	};
	const res = await client.tendermint.abciQuery(params);
	const resFormat: AbciQueryResponse = {
		key: res.key,
		value: res.value
	};
	return resFormat;
};

export { createClientBundle, createStargateClient, createClientByMnemonic, query };
