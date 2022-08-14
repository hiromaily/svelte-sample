interface WatchAssetParams {
	type: 'ERC20'; // In the future, other standards will be supported
	options: {
		address: string; // The address of the token contract
		symbol: string; // A ticker symbol or shorthand, up to 11 characters
		decimals: number; // The number of token decimals
		image: string; // A string url of the token logo
	};
}

type AssetParam = {
	[key: string]: WatchAssetParams;
};

export const assetParamMap: AssetParam = {
	USDT: {
		type: 'ERC20',
		options: {
			address: '0x55d398326f99059ff775485246999027b3197955',
			symbol: 'USDT',
			decimals: 18,
			image: ''
		}
	}
};
