import Long from 'long';
import type { EncodeObject } from '@cosmjs/proto-signing';

import type { Account } from '$codec/cross/core/auth/types';
import type { ContractTransaction } from '$codec/cross/core/initiator/types';
import { MsgInitiateTx } from '$codec/cross/core/initiator/msgs';
//import { MsgExtSignTx } from '$codec/cross/core/auth/msgs';
import { CommitProtocol } from '$codec/cross/core/tx/types';
import { Height } from '$codec/ibc/core/client/v1/client';
import { Any } from '$codec/google/protobuf/any';
import { TxBody, Tx, AuthInfo } from '$codec/cosmos/tx/v1beta1/tx';

//import { decodeHexString } from '$lib/hex/hex';

// newMsgInitiateTx is equivalent to `createInitiateTx()` of cli written by Golang
const newMsgInitiateTx = (
	lightHeight: Long,
	chainId: string,
	account: Account,
	txs: ContractTransaction[],
	nonce: number | undefined
): MsgInitiateTx => {
	const msgInitiateTx: MsgInitiateTx = {
		$type: MsgInitiateTx.$type,
		chainId: chainId,
		nonce: nonce ? Long.fromNumber(nonce) : Long.fromNumber(Date.now()),
		commitProtocol: CommitProtocol.COMMIT_PROTOCOL_SIMPLE,
		contractTransactions: txs,
		signers: [account],
		timeoutHeight: {
			$type: Height.$type,
			revisionNumber: Long.fromNumber(0),
			revisionHeight: lightHeight
		},
		timeoutTimestamp: Long.fromNumber(0)
	};
	return msgInitiateTx;
};

const msgInitiateTxtoEncodeObject = (msg: MsgInitiateTx): EncodeObject => {
	const encObj: EncodeObject = {
		typeUrl: msg.$type,
		value: {
			chainId: msg.chainId,
			nonce: msg.nonce,
			commitProtocol: msg.commitProtocol,
			contractTransactions: msg.contractTransactions,
			signers: msg.signers,
			timeoutHeight: msg.timeoutHeight,
			timeoutTimestamp: msg.timeoutTimestamp
		}
	};
	return encObj;
};

const buildTxWithMsg = (msgAny: Any): Tx => {
	// create TxBody with msg
	const txBody: TxBody = {
		$type: TxBody.$type,
		messages: [msgAny],
		memo: '',
		timeoutHeight: Long.fromNumber(0),
		extensionOptions: [],
		nonCriticalExtensionOptions: []
	};

	// create AuthInfo
	const authInfoJSON =
		'{"signerInfos":[],"fee":{"amount":[],"gasLimit":"0","payer":"","granter":""}}';
	const authInfo = AuthInfo.fromJSON(JSON.parse(authInfoJSON));

	// create signature
	const emptySig = new TextEncoder().encode('');

	// create Tx
	const tx: Tx = {
		body: txBody,
		authInfo: authInfo,
		signatures: [emptySig]
	} as Tx;
	return tx;
};

const buildTxWithMsgInitiate = (msg: MsgInitiateTx): Tx => {
	// convert msg to Any
	const msgAny = Any.fromPartial({
		typeUrl: MsgInitiateTx.$type,
		value: MsgInitiateTx.encode(msg).finish()
	});
	return buildTxWithMsg(msgAny);
};

// const newMsgSignTx = (txId: string, account: Account): MsgExtSignTx => {
//   const msgSignTx: MsgExtSignTx = {
//     $type: MsgExtSignTx.$type,
//     txID: decodeHexString(txId),
//     signers: [account],
//   };
//   return msgSignTx;
// };

// const buildTxWithMsgSign = (msg: MsgExtSignTx): Tx => {
//   // convert msg to Any
//   const msgAny = Any.fromPartial({
//     typeUrl: MsgExtSignTx.$type,
//     value: MsgExtSignTx.encode(msg).finish(),
//   });
//   return buildTxWithMsg(msgAny);
// };

export { newMsgInitiateTx, buildTxWithMsgInitiate, msgInitiateTxtoEncodeObject };
