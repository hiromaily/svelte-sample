/* eslint-disable */
import { messageTypeRegistry } from '../../../typeRegistry';
import { CommitProtocol, commitProtocolFromJSON, commitProtocolToJSON } from '../tx/types';
import { Height } from '../../../ibc/core/client/v1/client';
import Long from 'long';
import { ContractTransaction } from './types';
import { Account } from '../auth/types';
import _m0 from 'protobufjs/minimal.js';

export const protobufPackage = 'cross.core.initiator';

export enum InitiateTxStatus {
	INITIATE_TX_STATUS_UNKNOWN = 0,
	INITIATE_TX_STATUS_PENDING = 1,
	INITIATE_TX_STATUS_VERIFIED = 2,
	UNRECOGNIZED = -1
}

export function initiateTxStatusFromJSON(object: any): InitiateTxStatus {
	switch (object) {
		case 0:
		case 'INITIATE_TX_STATUS_UNKNOWN':
			return InitiateTxStatus.INITIATE_TX_STATUS_UNKNOWN;
		case 1:
		case 'INITIATE_TX_STATUS_PENDING':
			return InitiateTxStatus.INITIATE_TX_STATUS_PENDING;
		case 2:
		case 'INITIATE_TX_STATUS_VERIFIED':
			return InitiateTxStatus.INITIATE_TX_STATUS_VERIFIED;
		case -1:
		case 'UNRECOGNIZED':
		default:
			return InitiateTxStatus.UNRECOGNIZED;
	}
}

export function initiateTxStatusToJSON(object: InitiateTxStatus): string {
	switch (object) {
		case InitiateTxStatus.INITIATE_TX_STATUS_UNKNOWN:
			return 'INITIATE_TX_STATUS_UNKNOWN';
		case InitiateTxStatus.INITIATE_TX_STATUS_PENDING:
			return 'INITIATE_TX_STATUS_PENDING';
		case InitiateTxStatus.INITIATE_TX_STATUS_VERIFIED:
			return 'INITIATE_TX_STATUS_VERIFIED';
		case InitiateTxStatus.UNRECOGNIZED:
		default:
			return 'UNRECOGNIZED';
	}
}

export interface MsgInitiateTx {
	$type: 'cross.core.initiator.MsgInitiateTx';
	chainId?: string;
	nonce?: Long;
	commitProtocol?: CommitProtocol;
	contractTransactions?: ContractTransaction[];
	signers?: Account[];
	/**
	 * Timeout height relative to the current block height.
	 * The timeout is disabled when set to 0.
	 */
	timeoutHeight?: Height;
	/**
	 * Timeout timestamp (in nanoseconds) relative to the current block timestamp.
	 * The timeout is disabled when set to 0.
	 */
	timeoutTimestamp?: Long;
}

/** MsgInitiateTxResponse defines the Msg/InitiateTx response type. */
export interface MsgInitiateTxResponse {
	$type: 'cross.core.initiator.MsgInitiateTxResponse';
	txID?: Uint8Array;
	status?: InitiateTxStatus;
}

function createBaseMsgInitiateTx(): MsgInitiateTx {
	return {
		$type: 'cross.core.initiator.MsgInitiateTx',
		chainId: '',
		nonce: Long.UZERO,
		commitProtocol: 0,
		contractTransactions: [],
		signers: [],
		timeoutHeight: undefined,
		timeoutTimestamp: Long.UZERO
	};
}

export const MsgInitiateTx = {
	$type: 'cross.core.initiator.MsgInitiateTx' as const,

	encode(message: MsgInitiateTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.chainId !== undefined && message.chainId !== '') {
			writer.uint32(10).string(message.chainId);
		}
		if (message.nonce !== undefined && !message.nonce.isZero()) {
			writer.uint32(16).uint64(message.nonce);
		}
		if (message.commitProtocol !== undefined && message.commitProtocol !== 0) {
			writer.uint32(24).int32(message.commitProtocol);
		}
		if (message.contractTransactions !== undefined && message.contractTransactions.length !== 0) {
			for (const v of message.contractTransactions) {
				ContractTransaction.encode(v!, writer.uint32(34).fork()).ldelim();
			}
		}
		if (message.signers !== undefined && message.signers.length !== 0) {
			for (const v of message.signers) {
				Account.encode(v!, writer.uint32(42).fork()).ldelim();
			}
		}
		if (message.timeoutHeight !== undefined) {
			Height.encode(message.timeoutHeight, writer.uint32(50).fork()).ldelim();
		}
		if (message.timeoutTimestamp !== undefined && !message.timeoutTimestamp.isZero()) {
			writer.uint32(56).uint64(message.timeoutTimestamp);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgInitiateTx {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseMsgInitiateTx();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.chainId = reader.string();
					break;
				case 2:
					message.nonce = reader.uint64() as Long;
					break;
				case 3:
					message.commitProtocol = reader.int32() as any;
					break;
				case 4:
					message.contractTransactions!.push(ContractTransaction.decode(reader, reader.uint32()));
					break;
				case 5:
					message.signers!.push(Account.decode(reader, reader.uint32()));
					break;
				case 6:
					message.timeoutHeight = Height.decode(reader, reader.uint32());
					break;
				case 7:
					message.timeoutTimestamp = reader.uint64() as Long;
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): MsgInitiateTx {
		return {
			$type: MsgInitiateTx.$type,
			chainId: isSet(object.chainId) ? String(object.chainId) : '',
			nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
			commitProtocol: isSet(object.commitProtocol)
				? commitProtocolFromJSON(object.commitProtocol)
				: 0,
			contractTransactions: Array.isArray(object?.contractTransactions)
				? object.contractTransactions.map((e: any) => ContractTransaction.fromJSON(e))
				: [],
			signers: Array.isArray(object?.signers)
				? object.signers.map((e: any) => Account.fromJSON(e))
				: [],
			timeoutHeight: isSet(object.timeoutHeight)
				? Height.fromJSON(object.timeoutHeight)
				: undefined,
			timeoutTimestamp: isSet(object.timeoutTimestamp)
				? Long.fromValue(object.timeoutTimestamp)
				: Long.UZERO
		};
	},

	toJSON(message: MsgInitiateTx): unknown {
		const obj: any = {};
		message.chainId !== undefined && (obj.chainId = message.chainId);
		message.nonce !== undefined && (obj.nonce = (message.nonce || Long.UZERO).toString());
		message.commitProtocol !== undefined &&
			(obj.commitProtocol = commitProtocolToJSON(message.commitProtocol));
		if (message.contractTransactions) {
			obj.contractTransactions = message.contractTransactions.map((e) =>
				e ? ContractTransaction.toJSON(e) : undefined
			);
		} else {
			obj.contractTransactions = [];
		}
		if (message.signers) {
			obj.signers = message.signers.map((e) => (e ? Account.toJSON(e) : undefined));
		} else {
			obj.signers = [];
		}
		message.timeoutHeight !== undefined &&
			(obj.timeoutHeight = message.timeoutHeight
				? Height.toJSON(message.timeoutHeight)
				: undefined);
		message.timeoutTimestamp !== undefined &&
			(obj.timeoutTimestamp = (message.timeoutTimestamp || Long.UZERO).toString());
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<MsgInitiateTx>, I>>(object: I): MsgInitiateTx {
		const message = createBaseMsgInitiateTx();
		message.chainId = object.chainId ?? '';
		message.nonce =
			object.nonce !== undefined && object.nonce !== null
				? Long.fromValue(object.nonce)
				: Long.UZERO;
		message.commitProtocol = object.commitProtocol ?? 0;
		message.contractTransactions =
			object.contractTransactions?.map((e) => ContractTransaction.fromPartial(e)) || [];
		message.signers = object.signers?.map((e) => Account.fromPartial(e)) || [];
		message.timeoutHeight =
			object.timeoutHeight !== undefined && object.timeoutHeight !== null
				? Height.fromPartial(object.timeoutHeight)
				: undefined;
		message.timeoutTimestamp =
			object.timeoutTimestamp !== undefined && object.timeoutTimestamp !== null
				? Long.fromValue(object.timeoutTimestamp)
				: Long.UZERO;
		return message;
	}
};

messageTypeRegistry.set(MsgInitiateTx.$type, MsgInitiateTx);

function createBaseMsgInitiateTxResponse(): MsgInitiateTxResponse {
	return {
		$type: 'cross.core.initiator.MsgInitiateTxResponse',
		txID: new Uint8Array(),
		status: 0
	};
}

export const MsgInitiateTxResponse = {
	$type: 'cross.core.initiator.MsgInitiateTxResponse' as const,

	encode(message: MsgInitiateTxResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.txID !== undefined && message.txID.length !== 0) {
			writer.uint32(10).bytes(message.txID);
		}
		if (message.status !== undefined && message.status !== 0) {
			writer.uint32(16).int32(message.status);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgInitiateTxResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseMsgInitiateTxResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.txID = reader.bytes();
					break;
				case 2:
					message.status = reader.int32() as any;
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): MsgInitiateTxResponse {
		return {
			$type: MsgInitiateTxResponse.$type,
			txID: isSet(object.txID) ? bytesFromBase64(object.txID) : new Uint8Array(),
			status: isSet(object.status) ? initiateTxStatusFromJSON(object.status) : 0
		};
	},

	toJSON(message: MsgInitiateTxResponse): unknown {
		const obj: any = {};
		message.txID !== undefined &&
			(obj.txID = base64FromBytes(message.txID !== undefined ? message.txID : new Uint8Array()));
		message.status !== undefined && (obj.status = initiateTxStatusToJSON(message.status));
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<MsgInitiateTxResponse>, I>>(
		object: I
	): MsgInitiateTxResponse {
		const message = createBaseMsgInitiateTxResponse();
		message.txID = object.txID ?? new Uint8Array();
		message.status = object.status ?? 0;
		return message;
	}
};

messageTypeRegistry.set(MsgInitiateTxResponse.$type, MsgInitiateTxResponse);

/** Msg defines the cross Msg service. */
export interface Msg {
	/** InitiateTx defines a rpc handler method for MsgInitiateTx. */
	InitiateTx(request: MsgInitiateTx): Promise<MsgInitiateTxResponse>;
}

export class MsgClientImpl implements Msg {
	private readonly rpc: Rpc;
	constructor(rpc: Rpc) {
		this.rpc = rpc;
		this.InitiateTx = this.InitiateTx.bind(this);
	}
	InitiateTx(request: MsgInitiateTx): Promise<MsgInitiateTxResponse> {
		const data = MsgInitiateTx.encode(request).finish();
		const promise = this.rpc.request('cross.core.initiator.Msg', 'InitiateTx', data);
		return promise.then((data) => MsgInitiateTxResponse.decode(new _m0.Reader(data)));
	}
}

interface Rpc {
	request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
	if (typeof globalThis !== 'undefined') return globalThis;
	if (typeof self !== 'undefined') return self;
	if (typeof window !== 'undefined') return window;
	if (typeof global !== 'undefined') return global;
	throw 'Unable to locate global object';
})();

const atob: (b64: string) => string =
	globalThis.atob || ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'));
function bytesFromBase64(b64: string): Uint8Array {
	const bin = atob(b64);
	const arr = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; ++i) {
		arr[i] = bin.charCodeAt(i);
	}
	return arr;
}

const btoa: (bin: string) => string =
	globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'));
function base64FromBytes(arr: Uint8Array): string {
	const bin: string[] = [];
	arr.forEach((byte) => {
		bin.push(String.fromCharCode(byte));
	});
	return btoa(bin.join(''));
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
	? T
	: T extends Long
	? string | number | Long
	: T extends Array<infer U>
	? Array<DeepPartial<U>>
	: T extends ReadonlyArray<infer U>
	? ReadonlyArray<DeepPartial<U>>
	: T extends {}
	? { [K in Exclude<keyof T, '$type'>]?: DeepPartial<T[K]> }
	: Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
	? P
	: P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
				Exclude<keyof I, KeysOfUnion<P> | '$type'>,
				never
			>;

if (_m0.util.Long !== Long) {
	_m0.util.Long = Long as any;
	_m0.configure();
}

function isSet(value: any): boolean {
	return value !== null && value !== undefined;
}
