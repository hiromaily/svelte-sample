//import { Any } from '$codec/google/protobuf/any';
//import { fromHex, toBech32 } from '@cosmjs/encoding';
import { Account, AuthMode, AuthType } from '$codec/cross/core/auth/types';

// signerId would be bech32 address
const createAccount = (signerId: string): Account => {
	//toBech32("cosmos", fromHex(signerId));
	return {
		$type: Account.$type,
		id: new TextEncoder().encode(signerId),
		authType: {
			$type: AuthType.$type,
			mode: AuthMode.AUTH_MODE_LOCAL
		}
	};
};

export { createAccount };
