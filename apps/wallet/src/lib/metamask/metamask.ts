import detectEthereumProvider from '@metamask/detect-provider';

class Metamask {
	private provider: any;

	constructor(provider: any) {
		this.provider = provider;
	}

	// TODO: send transaction
	// https://docs.metamask.io/guide/sending-transactions.html

	public async getAccount(): Promise<string> {
		const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
		return accounts[0];
	}

	public networkVersion(): number {
		return this.provider.networkVersion; // 1
	}

	public selectedAddress(): string | null {
		return this.provider.selectedAddress; // null
	}

	public readyEvent() {
		this.provider.on('accountsChanged', (accounts: any) => {
			// Time to reload your interface with accounts[0]!
			console.log(accounts[0]);
		});
	}
}

const isMetamaskInstalled = async (): Promise<unknown | undefined> => {
	// if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
	//   return true;
	// }
	return await detectEthereumProvider();
};

const openExtension = () => {
	const link =
		'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related';
	window.open(link);
};

export { Metamask, isMetamaskInstalled, openExtension };
