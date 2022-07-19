/* eslint-disable */
import { messageTypeRegistry } from '../../../typeRegistry';
import { Any } from '../../../google/protobuf/any';
import { ReturnValue } from '../tx/types';
import Long from 'long';
import { Account } from '../auth/types';
import _m0 from 'protobufjs/minimal.js';

export const protobufPackage = 'cross.core.initiator';

export interface ContractTransaction {
	$type: 'cross.core.initiator.ContractTransaction';
	crossChainChannel?: Any;
	signers?: Account[];
	callInfo?: Uint8Array;
	returnValue?: ReturnValue;
	links?: Link[];
}

export interface Link {
	$type: 'cross.core.initiator.Link';
	srcIndex?: number;
}

export interface GenesisState {
	$type: 'cross.core.initiator.GenesisState';
}

function createBaseContractTransaction(): ContractTransaction {
	return {
		$type: 'cross.core.initiator.ContractTransaction',
		crossChainChannel: undefined,
		signers: [],
		callInfo: new Uint8Array(),
		returnValue: undefined,
		links: []
	};
}

export const ContractTransaction = {
	$type: 'cross.core.initiator.ContractTransaction' as const,

	encode(message: ContractTransaction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
		if (message.links !== undefined && message.links.length !== 0) {
			for (const v of message.links) {
				Link.encode(v!, writer.uint32(42).fork()).ldelim();
			}
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ContractTransaction {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseContractTransaction();
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
					message.links!.push(Link.decode(reader, reader.uint32()));
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): ContractTransaction {
		return {
			$type: ContractTransaction.$type,
			crossChainChannel: isSet(object.crossChainChannel)
				? Any.fromJSON(object.crossChainChannel)
				: undefined,
			signers: Array.isArray(object?.signers)
				? object.signers.map((e: any) => Account.fromJSON(e))
				: [],
			callInfo: isSet(object.callInfo) ? bytesFromBase64(object.callInfo) : new Uint8Array(),
			returnValue: isSet(object.returnValue) ? ReturnValue.fromJSON(object.returnValue) : undefined,
			links: Array.isArray(object?.links) ? object.links.map((e: any) => Link.fromJSON(e)) : []
		};
	},

	toJSON(message: ContractTransaction): unknown {
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
		if (message.links) {
			obj.links = message.links.map((e) => (e ? Link.toJSON(e) : undefined));
		} else {
			obj.links = [];
		}
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<ContractTransaction>, I>>(
		object: I
	): ContractTransaction {
		const message = createBaseContractTransaction();
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
		message.links = object.links?.map((e) => Link.fromPartial(e)) || [];
		return message;
	}
};

messageTypeRegistry.set(ContractTransaction.$type, ContractTransaction);

function createBaseLink(): Link {
	return { $type: 'cross.core.initiator.Link', srcIndex: 0 };
}

export const Link = {
	$type: 'cross.core.initiator.Link' as const,

	encode(message: Link, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.srcIndex !== undefined && message.srcIndex !== 0) {
			writer.uint32(8).uint32(message.srcIndex);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): Link {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseLink();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.srcIndex = reader.uint32();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): Link {
		return {
			$type: Link.$type,
			srcIndex: isSet(object.srcIndex) ? Number(object.srcIndex) : 0
		};
	},

	toJSON(message: Link): unknown {
		const obj: any = {};
		message.srcIndex !== undefined && (obj.srcIndex = Math.round(message.srcIndex));
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<Link>, I>>(object: I): Link {
		const message = createBaseLink();
		message.srcIndex = object.srcIndex ?? 0;
		return message;
	}
};

messageTypeRegistry.set(Link.$type, Link);

function createBaseGenesisState(): GenesisState {
	return { $type: 'cross.core.initiator.GenesisState' };
}

export const GenesisState = {
	$type: 'cross.core.initiator.GenesisState' as const,

	encode(_: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseGenesisState();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): GenesisState {
		return {
			$type: GenesisState.$type
		};
	},

	toJSON(_: GenesisState): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(_: I): GenesisState {
		const message = createBaseGenesisState();
		return message;
	}
};

messageTypeRegistry.set(GenesisState.$type, GenesisState);

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
