import { fromBech32 } from '@cosmjs/encoding';
import { Account, AuthMode, AuthType } from '$codec/cross/core/auth/types';

// signerId would be bech32 address
const createAccount = (signerId: string): Account => {
	const { prefix, data } = fromBech32(signerId);
	if (prefix != 'cosmos') {
		// TODO: handle error
		console.log('signerId is invalid');
	}

	// id should use same logic to https://github.com/cosmos/cosmos-sdk/blob/v0.43.0-beta1/types/address.go#L159
	return {
		$type: Account.$type,
		id: data,
		authType: {
			$type: AuthType.$type,
			mode: AuthMode.AUTH_MODE_LOCAL
		}
	};
};

export { createAccount };
