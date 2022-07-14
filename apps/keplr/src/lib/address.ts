// updateAddress() must run after chainID updated
export interface AddressSigner {
	address: string;
	offlineSigner: any; // FIXME: any
}

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

export { updateAddress };
