import { SigningCosmosClient } from '@cosmjs/launchpad';
import { SigningStargateClient } from '@cosmjs/stargate';
import { BroadcastMode, SigningCosmWasmClient } from 'secretjs';

export const createCosmosClient = (address: string, offlineSigner: any): SigningCosmosClient => {
	const lcd = 'https://lcd-cosmoshub.keplr.app/rest';
	// client
	// refer to
	// - https://github.com/chainapsis/keplr-wallet/blob/master/docs/api/cosmjs.md#connecting-with-cosmjs
	// - https://www.npmjs.com/package/@cosmjs/launchpad?activeTab=readme
	return new SigningCosmosClient(lcd, address, offlineSigner);
};

export const createStargateClient = async (
	address: string,
	offlineSigner: any
): Promise<SigningStargateClient> => {
	// refer to https://github.com/cosmos/awesome/issues/17
	//const lcd = 'https://cosmoshub.validator.network/';
	//const lcd = 'https://rpc.cosmos.network:26657';
	//const lcd = 'https://stargate.cosmos.network/';
	const lcd = 'http://localhost:26657';

	// client
	// refer to
	// - https://github.com/cosmos/cosmjs/blob/main/packages/stargate/src/signingstargateclient.spec.ts
	// - https://github.com/gitshock-labs/terra-bridge-dex/blob/091fe2705c9ed39b47648df2ff283c34cbdcb8cb/src/services/keplrService.ts
	const stargateClient = await SigningStargateClient.connectWithSigner(lcd, offlineSigner);

	return stargateClient;
};

export const createCosmWasmClient = (
	address: string,
	offlineSigner: any,
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
		//@ts-ignore
		offlineSigner,
		window.getEnigmaUtils(chainId),
		null,
		BroadcastMode.Sync
	);
	return client;
};
