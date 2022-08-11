/* eslint-disable */
import { messageTypeRegistry } from '../../../typeRegistry';
import { Height } from '../../../ibc/core/client/v1/client';
import { Any } from '../../../google/protobuf/any';
import Long from 'long';
import { Account } from '../auth/types';
import { Event } from '../../../tendermint/abci/types';
import _m0 from 'protobufjs/minimal.js';

export const protobufPackage = 'cross.core.tx';

export enum CommitProtocol {
	COMMIT_PROTOCOL_UNKNOWN = 0,
	COMMIT_PROTOCOL_SIMPLE = 1,
	COMMIT_PROTOCOL_TPC = 2,
	UNRECOGNIZED = -1
}

export function commitProtocolFromJSON(object: any): CommitProtocol {
	switch (object) {
		case 0:
		case 'COMMIT_PROTOCOL_UNKNOWN':
			return CommitProtocol.COMMIT_PROTOCOL_UNKNOWN;
		case 1:
		case 'COMMIT_PROTOCOL_SIMPLE':
			return CommitProtocol.COMMIT_PROTOCOL_SIMPLE;
		case 2:
		case 'COMMIT_PROTOCOL_TPC':
			return CommitProtocol.COMMIT_PROTOCOL_TPC;
		case -1:
		case 'UNRECOGNIZED':
		default:
			return CommitProtocol.UNRECOGNIZED;
	}
}

export function commitProtocolToJSON(object: CommitProtocol): string {
	switch (object) {
		case CommitProtocol.COMMIT_PROTOCOL_UNKNOWN:
			return 'COMMIT_PROTOCOL_UNKNOWN';
		case CommitProtocol.COMMIT_PROTOCOL_SIMPLE:
			return 'COMMIT_PROTOCOL_SIMPLE';
		case CommitProtocol.COMMIT_PROTOCOL_TPC:
			return 'COMMIT_PROTOCOL_TPC';
		case CommitProtocol.UNRECOGNIZED:
		default:
			return 'UNRECOGNIZED';
	}
}

export interface Tx {
	$type: 'cross.core.tx.Tx';
	id?: Uint8Array;
	commitProtocol?: CommitProtocol;
	contractTransactions?: ResolvedContractTransaction[];
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

export interface ResolvedContractTransaction {
	$type: 'cross.core.tx.ResolvedContractTransaction';
	crossChainChannel?: Any;
	signers?: Account[];
	callInfo?: Uint8Array;
	returnValue?: ReturnValue;
	callResults?: Any[];
}

export interface ReturnValue {
	$type: 'cross.core.tx.ReturnValue';
	value?: Uint8Array;
}

/** ConstantValueCallResult is a CallResult wraps a constant value */
export interface ConstantValueCallResult {
	$type: 'cross.core.tx.ConstantValueCallResult';
	crossChainChannel?: Any;
	k?: Uint8Array;
	v?: Uint8Array;
}

export interface ContractCallResult {
	$type: 'cross.core.tx.ContractCallResult';
	data?: Uint8Array;
	events?: Event[];
}

function createBaseTx(): Tx {
	return {
		$type: 'cross.core.tx.Tx',
		id: new Uint8Array(),
		commitProtocol: 0,
		contractTransactions: [],
		timeoutHeight: undefined,
		timeoutTimestamp: Long.UZERO
	};
}

export const Tx = {
	$type: 'cross.core.tx.Tx' as const,

	encode(message: Tx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.id !== undefined && message.id.length !== 0) {
			writer.uint32(10).bytes(message.id);
		}
		if (message.commitProtocol !== undefined && message.commitProtocol !== 0) {
			writer.uint32(16).int32(message.commitProtocol);
		}
		if (message.contractTransactions !== undefined && message.contractTransactions.length !== 0) {
			for (const v of message.contractTransactions) {
				ResolvedContractTransaction.encode(v!, writer.uint32(26).fork()).ldelim();
			}
		}
		if (message.timeoutHeight !== undefined) {
			Height.encode(message.timeoutHeight, writer.uint32(34).fork()).ldelim();
		}
		if (message.timeoutTimestamp !== undefined && !message.timeoutTimestamp.isZero()) {
			writer.uint32(40).uint64(message.timeoutTimestamp);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): Tx {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseTx();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.id = reader.bytes();
					break;
				case 2:
					message.commitProtocol = reader.int32() as any;
					break;
				case 3:
					message.contractTransactions!.push(
						ResolvedContractTransaction.decode(reader, reader.uint32())
					);
					break;
				case 4:
					message.timeoutHeight = Height.decode(reader, reader.uint32());
					break;
				case 5:
					message.timeoutTimestamp = reader.uint64() as Long;
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): Tx {
		return {
			$type: Tx.$type,
			id: isSet(object.id) ? bytesFromBase64(object.id) : new Uint8Array(),
			commitProtocol: isSet(object.commitProtocol)
				? commitProtocolFromJSON(object.commitProtocol)
				: 0,
			contractTransactions: Array.isArray(object?.contractTransactions)
				? object.contractTransactions.map((e: any) => ResolvedContractTransaction.fromJSON(e))
				: [],
			timeoutHeight: isSet(object.timeoutHeight)
				? Height.fromJSON(object.timeoutHeight)
				: undefined,
			timeoutTimestamp: isSet(object.timeoutTimestamp)
				? Long.fromValue(object.timeoutTimestamp)
				: Long.UZERO
		};
	},

	toJSON(message: Tx): unknown {
		const obj: any = {};
		message.id !== undefined &&
			(obj.id = base64FromBytes(message.id !== undefined ? message.id : new Uint8Array()));
		message.commitProtocol !== undefined &&
			(obj.commitProtocol = commitProtocolToJSON(message.commitProtocol));
		if (message.contractTransactions) {
			obj.contractTransactions = message.contractTransactions.map((e) =>
				e ? ResolvedContractTransaction.toJSON(e) : undefined
			);
		} else {
			obj.contractTransactions = [];
		}
		message.timeoutHeight !== undefined &&
			(obj.timeoutHeight = message.timeoutHeight
				? Height.toJSON(message.timeoutHeight)
				: undefined);
		message.timeoutTimestamp !== undefined &&
			(obj.timeoutTimestamp = (message.timeoutTimestamp || Long.UZERO).toString());
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<Tx>, I>>(object: I): Tx {
		const message = createBaseTx();
		message.id = object.id ?? new Uint8Array();
		message.commitProtocol = object.commitProtocol ?? 0;
		message.contractTransactions =
			object.contractTransactions?.map((e) => ResolvedContractTransaction.fromPartial(e)) || [];
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

messageTypeRegistry.set(Tx.$type, Tx);

function createBaseResolvedContractTransaction(): ResolvedContractTransaction {
	return {
		$type: 'cross.core.tx.ResolvedContractTransaction',
		crossChainChannel: undefined,
		signers: [],
		callInfo: new Uint8Array(),
		returnValue: undefined,
		callResults: []
	};
}

export const ResolvedContractTransaction = {
	$type: 'cross.core.tx.ResolvedContractTransaction' as const,

	encode(
		message: ResolvedContractTransaction,
		writer: _m0.Writer = _m0.Writer.create()
	): _m0.Writer {
		if (message.crossChainChannel !== undefined) {
			Any.encode(message.crossChainChannel, writer.uint32(10).fork()).ldelim();
		}
		if (message.signers !== undefined && message.signers.length !== 0) {
			for (const v of message.signers) {
				Account.encode(v!, writer.uint32(18).fork()).ldelim();
			}
		}
		if (message.callInfo !== undefined && message.callInfo.length !== 0) {
			writer.uint32(26).bytes(message.callInfo);
		}
		if (message.returnValue !== undefined) {
			ReturnValue.encode(message.returnValue, writer.uint32(34).fork()).ldelim();
		}
		if (message.callResults !== undefined && message.callResults.length !== 0) {
			for (const v of message.callResults) {
				Any.encode(v!, writer.uint32(42).fork()).ldelim();
			}
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ResolvedContractTransaction {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseResolvedContractTransaction();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.crossChainChannel = Any.decode(reader, reader.uint32());
					break;
				case 2:
					message.signers!.push(Account.decode(reader, reader.uint32()));
					break;
				case 3:
					message.callInfo = reader.bytes();
					break;
				case 4:
					message.returnValue = ReturnValue.decode(reader, reader.uint32());
					break;
				case 5:
					message.callResults!.push(Any.decode(reader, reader.uint32()));
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): ResolvedContractTransaction {
		return {
			$type: ResolvedContractTransaction.$type,
			crossChainChannel: isSet(object.crossChainChannel)
				? Any.fromJSON(object.crossChainChannel)
				: undefined,
			signers: Array.isArray(object?.signers)
				? object.signers.map((e: any) => Account.fromJSON(e))
				: [],
			callInfo: isSet(object.callInfo) ? bytesFromBase64(object.callInfo) : new Uint8Array(),
			returnValue: isSet(object.returnValue) ? ReturnValue.fromJSON(object.returnValue) : undefined,
			callResults: Array.isArray(object?.callResults)
				? object.callResults.map((e: any) => Any.fromJSON(e))
				: []
		};
	},

	toJSON(message: ResolvedContractTransaction): unknown {
		const obj: any = {};
		message.crossChainChannel !== undefined &&
			(obj.crossChainChannel = message.crossChainChannel
				? Any.toJSON(message.crossChainChannel)
				: undefined);
		if (message.signers) {
			obj.signers = message.signers.map((e) => (e ? Account.toJSON(e) : undefined));
		} else {
			obj.signers = [];
		}
		message.callInfo !== undefined &&
			(obj.callInfo = base64FromBytes(
				message.callInfo !== undefined ? message.callInfo : new Uint8Array()
			));
		message.returnValue !== undefined &&
			(obj.returnValue = message.returnValue ? ReturnValue.toJSON(message.returnValue) : undefined);
		if (message.callResults) {
			obj.callResults = message.callResults.map((e) => (e ? Any.toJSON(e) : undefined));
		} else {
			obj.callResults = [];
		}
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<ResolvedContractTransaction>, I>>(
		object: I
	): ResolvedContractTransaction {
		const message = createBaseResolvedContractTransaction();
		message.crossChainChannel =
			object.crossChainChannel !== undefined && object.crossChainChannel !== null
				? Any.fromPartial(object.crossChainChannel)
				: undefined;
		message.signers = object.signers?.map((e) => Account.fromPartial(e)) || [];
		message.callInfo = object.callInfo ?? new Uint8Array();
		message.returnValue =
			object.returnValue !== undefined && object.returnValue !== null
				? ReturnValue.fromPartial(object.returnValue)
				: undefined;
		message.callResults = object.callResults?.map((e) => Any.fromPartial(e)) || [];
		return message;
	}
};

messageTypeRegistry.set(ResolvedContractTransaction.$type, ResolvedContractTransaction);

function createBaseReturnValue(): ReturnValue {
	return { $type: 'cross.core.tx.ReturnValue', value: new Uint8Array() };
}

export const ReturnValue = {
	$type: 'cross.core.tx.ReturnValue' as const,

	encode(message: ReturnValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.value !== undefined && message.value.length !== 0) {
			writer.uint32(10).bytes(message.value);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ReturnValue {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseReturnValue();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.value = reader.bytes();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): ReturnValue {
		return {
			$type: ReturnValue.$type,
			value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array()
		};
	},

	toJSON(message: ReturnValue): unknown {
		const obj: any = {};
		message.value !== undefined &&
			(obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<ReturnValue>, I>>(object: I): ReturnValue {
		const message = createBaseReturnValue();
		message.value = object.value ?? new Uint8Array();
		return message;
	}
};

messageTypeRegistry.set(ReturnValue.$type, ReturnValue);

function createBaseConstantValueCallResult(): ConstantValueCallResult {
	return {
		$type: 'cross.core.tx.ConstantValueCallResult',
		crossChainChannel: undefined,
		k: new Uint8Array(),
		v: new Uint8Array()
	};
}

export const ConstantValueCallResult = {
	$type: 'cross.core.tx.ConstantValueCallResult' as const,

	encode(message: ConstantValueCallResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.crossChainChannel !== undefined) {
			Any.encode(message.crossChainChannel, writer.uint32(10).fork()).ldelim();
		}
		if (message.k !== undefined && message.k.length !== 0) {
			writer.uint32(18).bytes(message.k);
		}
		if (message.v !== undefined && message.v.length !== 0) {
			writer.uint32(26).bytes(message.v);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ConstantValueCallResult {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseConstantValueCallResult();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.crossChainChannel = Any.decode(reader, reader.uint32());
					break;
				case 2:
					message.k = reader.bytes();
					break;
				case 3:
					message.v = reader.bytes();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): ConstantValueCallResult {
		return {
			$type: ConstantValueCallResult.$type,
			crossChainChannel: isSet(object.crossChainChannel)
				? Any.fromJSON(object.crossChainChannel)
				: undefined,
			k: isSet(object.k) ? bytesFromBase64(object.k) : new Uint8Array(),
			v: isSet(object.v) ? bytesFromBase64(object.v) : new Uint8Array()
		};
	},

	toJSON(message: ConstantValueCallResult): unknown {
		const obj: any = {};
		message.crossChainChannel !== undefined &&
			(obj.crossChainChannel = message.crossChainChannel
				? Any.toJSON(message.crossChainChannel)
				: undefined);
		message.k !== undefined &&
			(obj.k = base64FromBytes(message.k !== undefined ? message.k : new Uint8Array()));
		message.v !== undefined &&
			(obj.v = base64FromBytes(message.v !== undefined ? message.v : new Uint8Array()));
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<ConstantValueCallResult>, I>>(
		object: I
	): ConstantValueCallResult {
		const message = createBaseConstantValueCallResult();
		message.crossChainChannel =
			object.crossChainChannel !== undefined && object.crossChainChannel !== null
				? Any.fromPartial(object.crossChainChannel)
				: undefined;
		message.k = object.k ?? new Uint8Array();
		message.v = object.v ?? new Uint8Array();
		return message;
	}
};

messageTypeRegistry.set(ConstantValueCallResult.$type, ConstantValueCallResult);

function createBaseContractCallResult(): ContractCallResult {
	return {
		$type: 'cross.core.tx.ContractCallResult',
		data: new Uint8Array(),
		events: []
	};
}

export const ContractCallResult = {
	$type: 'cross.core.tx.ContractCallResult' as const,

	encode(message: ContractCallResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.data !== undefined && message.data.length !== 0) {
			writer.uint32(10).bytes(message.data);
		}
		if (message.events !== undefined && message.events.length !== 0) {
			for (const v of message.events) {
				Event.encode(v!, writer.uint32(18).fork()).ldelim();
			}
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ContractCallResult {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseContractCallResult();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.data = reader.bytes();
					break;
				case 2:
					message.events!.push(Event.decode(reader, reader.uint32()));
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): ContractCallResult {
		return {
			$type: ContractCallResult.$type,
			data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
			events: Array.isArray(object?.events) ? object.events.map((e: any) => Event.fromJSON(e)) : []
		};
	},

	toJSON(message: ContractCallResult): unknown {
		const obj: any = {};
		message.data !== undefined &&
			(obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
		if (message.events) {
			obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
		} else {
			obj.events = [];
		}
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<ContractCallResult>, I>>(object: I): ContractCallResult {
		const message = createBaseContractCallResult();
		message.data = object.data ?? new Uint8Array();
		message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
		return message;
	}
};

messageTypeRegistry.set(ContractCallResult.$type, ContractCallResult);

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
