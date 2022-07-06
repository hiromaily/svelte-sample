import * as Long from 'long';
import { Coin } from '$codec/cosmos/base/v1beta1/coin';
import { Height } from '$codec/ibc/core/client/v1/client';
import { MsgTransfer } from '$codec/ibc/applications/transfer/v1/tx';
import { Any } from '$codec/google/protobuf/any';
import { TxBody, AuthInfo, SignDoc } from '$codec/cosmos/tx/v1beta1/tx';

// sourcePort: string;
// sourceChannel: string;
// token?: Coin;
// sender: string;
// receiver: string;
// timeoutHeight?: Height;
// timeoutTimestamp: Long;
const newMsgTransfer = (
	sourcePort: string,
	sourceChannel: string,
	token: Coin | undefined,
	sender: string,
	receiver: string
): MsgTransfer => {
	const msgTransfer: MsgTransfer = {
		$type: MsgTransfer.$type,
		sourcePort: sourcePort,
		sourceChannel: sourceChannel,
		sender: sender,
		receiver: receiver,
		timeoutHeight: {
			$type: Height.$type,
			revisionNumber: Long.fromNumber(0),
			revisionHeight: Long.fromNumber(1000)
		},
		timeoutTimestamp: Long.fromNumber(0)
	};
	if (token) msgTransfer.token = token;

	return msgTransfer;
};

const buildSignDocWithMsg = (msgAny: Any, chainID: string): SignDoc => {
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

	// create SignDoc
	const signDoc: SignDoc = {
		$type: SignDoc.$type,
		bodyBytes: TxBody.encode(txBody).finish(),
		authInfoBytes: AuthInfo.encode(authInfo).finish(),
		chainId: chainID,
		accountNumber: Long.UZERO
	};
	return signDoc;
};

const buildSignDocWithMsgTransfer = (msg: MsgTransfer, chainID: string): SignDoc => {
	// convert msg to Any
	const msgAny = Any.fromPartial({
		typeUrl: MsgTransfer.$type,
		value: MsgTransfer.encode(msg).finish()
	});
	return buildSignDocWithMsg(msgAny, chainID);
};

export { newMsgTransfer, buildSignDocWithMsg, buildSignDocWithMsgTransfer };
