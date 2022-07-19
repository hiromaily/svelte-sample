import { Registry } from '@cosmjs/proto-signing';
import type { GeneratedType } from '@cosmjs/proto-signing';
import type { SigningStargateClientOptions, StdFee } from '@cosmjs/stargate';
import { MsgInitiateTx } from '$codec/cross/core/initiator/msgs';

// FIXME: define as json outside
export interface User {
	nemonic: string;
	address: string;
}

type Users = {
	[key: string]: User;
};

export interface Client {
	lcd: string;
	options: SigningStargateClientOptions;
}

export interface Config {
	chainID: string;
	client: Client;
	users: Users;
	fee: StdFee;
}

// registry for client
const registry = new Registry();
registry.register(`/${MsgInitiateTx.$type}`, MsgInitiateTx as GeneratedType);
registry.register(MsgInitiateTx.$type, MsgInitiateTx as GeneratedType);

export const conf: Config = {
	chainID: 'cosmoshub',
	client: {
		lcd: 'http://localhost:26657',
		options: { registry: registry }
	},
	users: {
		admin: {
			nemonic:
				'hello creek grace lyrics remember struggle clip prosper donate flip moment bird humor army apology mix salute become bonus make satisfy erase stone claw',
			address: 'cosmos1jpdsvx37tmh5ugrfgghq5y0c9r4720cmtxlcr8'
		},
		alice: {
			nemonic:
				'badge net govern soldier future dash eyebrow end decade fuel hedgehog atom proud enforce diamond leader shaft order miss impose noble symptom time casino',
			address: 'cosmos1cc6zlw8dywmea0q6gjh59d4vzhev35seqrqvjg'
		},
		bob: {
			nemonic:
				'abandon nurse dash intact wagon stuff faint tube scatter square lock drop input fantasy obscure twist estate enforce inherit grocery scale liquid curtain art',
			address: 'cosmos19hxerftq5ca5esvceuc7plc30xnl4k60z7hvkj'
		}
	},
	fee: {
		amount: [],
		gas: '450000'
	}
};

// https://docs.cosmos.network/master/core/grpc_rest.html
// https://docs.cosmos.network/master/core/grpc_rest.html#rest-server
// expected urls are
// - https://lcd-cosmoshub.keplr.app/rest
// - https://rpc.cosmos.network:26657
// - https://stargate.cosmos.network/
