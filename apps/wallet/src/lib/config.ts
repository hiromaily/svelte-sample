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
				'chat jazz tissue energy honey reason erase cart cup mad lazy inhale found party address ankle broken twelve cabbage imitate whale inflict reason ordinary',
			address: 'cosmos1z7jaakpgg4zutlmkguaxmykjwtfjwdgdutfghr'
		},
		alice: {
			nemonic:
				'badge net govern soldier future dash eyebrow end decade fuel hedgehog atom proud enforce diamond leader shaft order miss impose noble symptom time casino',
			address: 'cosmos1v03y42te0vzq2q268y5sn3z8v5grhe67x7w0dz'
		},
		bob: {
			nemonic:
				'abandon nurse dash intact wagon stuff faint tube scatter square lock drop input fantasy obscure twist estate enforce inherit grocery scale liquid curtain art',
			address: 'cosmos18vllfa5ug2a0j8487clxqjh55c0w8dmgfgwrtu'
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
