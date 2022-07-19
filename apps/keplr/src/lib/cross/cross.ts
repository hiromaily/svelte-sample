import snakecaseKeys from 'snakecase-keys';

import { Any } from '$codec/google/protobuf/any';
import { ContractTransaction } from '$codec/cross/core/initiator/types';
import { QuerySelfXCCRequest, QuerySelfXCCResponse } from '$codec/cross/core/initiator/query';
import { ReturnValue } from '$codec/cross/core/tx/types';
import type { Account } from '$codec/cross/core/auth/types';
import { ChannelInfo } from '$codec/cross/core/xcc/types';

import { query } from '$lib/cosmos/client';
import type { ClientBundle, AbciQueryResponse } from '$lib/cosmos/client';
import { decodeAnyFromJSON } from '$lib/any/any';
import { createAccount } from '$lib/cross/account';

const getXCC = async (
	client: ClientBundle,
	initiatorChannel: string | undefined
): Promise<Any | undefined> => {
	if (initiatorChannel) {
		const channelInfo = parseChannelInfo(initiatorChannel);
		if (channelInfo === undefined) {
			return undefined;
		}
		// to Any
		return Any.fromPartial({
			typeUrl: ChannelInfo.$type,
			value: ChannelInfo.encode(channelInfo).finish()
		});
	}
	// query self xcc
	return await querySelfXCC(client);
};

const parseChannelInfo = (initiatorChannel: string): ChannelInfo | undefined => {
	const parts = initiatorChannel.split(':');
	if (parts.length != 2) {
		console.error(`initiatorChannel: "${initiatorChannel}" is invalid`);
		return undefined;
	}
	const channelInfo: ChannelInfo = {
		$type: ChannelInfo.$type,
		port: parts[1],
		channel: parts[0]
	};
	return channelInfo;
};

const querySelfXCC = async (client: ClientBundle): Promise<Any | undefined> => {
	console.log('querySelfXCC()');
	const req: QuerySelfXCCRequest = {
		$type: QuerySelfXCCRequest.$type
	};
	const encodedReq = QuerySelfXCCRequest.encode(req).finish();
	// query
	const queryRes: AbciQueryResponse = await query(
		client,
		'/cross.core.initiator.Query/SelfXCC',
		encodedReq
	);
	if (queryRes.value === undefined) return undefined;

	const res: QuerySelfXCCResponse = QuerySelfXCCResponse.decode(queryRes.value);

	return res.xcc;
};

const createContractTx = (callInfo: string, account: Account, anyXCC: Any): ContractTransaction => {
	const contractTx: ContractTransaction = {
		$type: ContractTransaction.$type,
		crossChainChannel: anyXCC,
		signers: [account],
		callInfo: new TextEncoder().encode(callInfo),
		returnValue: {
			$type: ReturnValue.$type,
			value: new Uint8Array()
		},
		links: []
	};
	return contractTx;
};

const createContractTxJSON = (tx: ContractTransaction): string => {
	const decodedJSON = decodeAnyFromJSON(ContractTransaction.toJSON(tx)) as any;
	// returnValue must be replaced by null
	decodedJSON.returnValue = null;
	const jsonString = JSON.stringify(snakecaseKeys(decodedJSON, { exclude: ['@type'] }), null, 2);
	return jsonString;
};

const createContractTxForUI = async (
	client: ClientBundle,
	signer: string,
	callInfo: string,
	initiatorChannel: string | undefined
): Promise<ContractTransaction | undefined> => {
	// return QuerySelfXCCResponse xcc
	const xcc = await getXCC(client, initiatorChannel);
	if (!xcc) {
		console.log('xcc is undefined');
		return undefined;
	}
	// signer account
	const account = createAccount(signer);
	return createContractTx(callInfo, account, xcc);
};

export { querySelfXCC, createContractTx, createContractTxJSON, createContractTxForUI };
