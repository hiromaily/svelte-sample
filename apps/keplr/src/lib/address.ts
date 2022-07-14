import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
//import type { AccountData } from '@cosmjs/proto-signing';

export interface AddressSigner {
	address: string;
	offlineSigner: any; // FIXME: any
}

// updateAddress is called after chainID updated.
// based on keplr
const updateAddress = async (chainID: string): Promise<AddressSigner> => {
	await window.keplr!.enable(chainID);
	const offlineSigner = window.getOfflineSigner!(chainID);
	const account = (await offlineSigner.getAccounts())[0];
	//console.log('account:', account);
	return {
		address: account.address,
		offlineSigner: offlineSigner
	};
};

const getWallet = async (mnemonic: string): Promise<DirectSecp256k1HdWallet> => {
	return await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
	//return await wallet.getAccounts();
};

export { updateAddress, getWallet };
