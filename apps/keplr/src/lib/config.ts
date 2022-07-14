// chainID
export const defaultChainID = 'cosmoshub';

export const simdAddr = 'cosmos16cklmahud406gg6mx8wz3s2hf68e5997p4pdv6';

// SigningCosmosClient LCD: deprecated
// https://docs.cosmos.network/master/core/grpc_rest.html
// https://docs.cosmos.network/master/core/grpc_rest.html#rest-server
//export const lcdSigningCosmosClient = 'https://lcd-cosmoshub.keplr.app/rest'; // CORS policy error
export const lcdSigningCosmosClient = 'http://localhost:1317';
// => FIXME: Error: Unexpected response data format
// https://github.com/cosmos/cosmjs/issues/702
// https://github.com/cosmos/cosmjs/issues/940

// SigningStargateClient LCD
//export const lcdSigningStargateClient = 'https://rpc.cosmos.network:26657';
//export const lcdSigningStargateClient = 'https://stargate.cosmos.network/';
export const lcdSigningStargateClient = 'http://localhost:26657';

export const defaultMnemonic =
	'path tourist guilt wide flat sign sort same rather option uniform doll animal later thrive alert usual random hollow sell baby video young foster';
