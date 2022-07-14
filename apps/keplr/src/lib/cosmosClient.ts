import { SigningCosmosClient } from '@cosmjs/launchpad';
import type { OfflineSigner as OfflineAminoSigner } from '@cosmjs/launchpad';
import type { OfflineSigner } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import { BroadcastMode, SigningCosmWasmClient } from 'secretjs';
import type { OfflineSigner as KeplrOfflineSigner } from 'secretjs/types/wallet';

// deprecated
export const createCosmosClient = (
	lcd: string,
	address: string,
	offlineSigner: OfflineAminoSigner
): SigningCosmosClient => {
	// refer to
	// - https://github.com/chainapsis/keplr-wallet/blob/master/docs/api/cosmjs.md#connecting-with-cosmjs
	// - https://www.npmjs.com/package/@cosmjs/launchpad?activeTab=readme
	// issue:
	// - https://github.com/cosmos/cosmjs/issues/702
	// - https://github.com/cosmos/cosmjs/issues/940
	return new SigningCosmosClient(lcd, address, offlineSigner);
};

export const createStargateClient = async (
	lcd: string,
	offlineSigner: OfflineSigner
): Promise<SigningStargateClient | undefined> => {
	// refer to
	// - https://github.com/cosmos/cosmjs/blob/main/packages/stargate/src/signingstargateclient.spec.ts
	// - https://github.com/gitshock-labs/terra-bridge-dex/blob/091fe2705c9ed39b47648df2ff283c34cbdcb8cb/src/services/keplrService.ts
	try {
		const stargateClient = await SigningStargateClient.connectWithSigner(lcd, offlineSigner);
		return stargateClient;
	} catch (e) {
		console.log(e);
	}

	return undefined;
};

export const createCosmWasmClient = (
	address: string,
	offlineSigner: KeplrOfflineSigner,
	chainId: string
): SigningCosmWasmClient => {
	const lcd = 'https://lcd-secret.keplr.app/rest';
	// client
	// refer to
	// - https://docs.keplr.app/api/secretjs.html
	// - https://github.com/scrtlabs/QueryBalancePermitDemo/blob/d48a1c893eb042329f14518084b6d887ee2c0ea2/src/KeplrStuff.tsx
	const client = new SigningCosmWasmClient(
		lcd,
		address,
		offlineSigner,
		window.getEnigmaUtils!(chainId),
		undefined,
		BroadcastMode.Sync
	);
	return client;
};
