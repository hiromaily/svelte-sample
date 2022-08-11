import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

export interface AddressSigner {
	address: string;
	offlineSigner: any; // FIXME: any
}

// updateKeplrAddress is called after chainID updated.
// based on keplr
// Note: caller function must handle possible error
const updateKeplrAddress = async (chainID: string): Promise<AddressSigner> => {
	// this code could be error because window.keplr is undefined
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
};

export { updateKeplrAddress, getWallet };
