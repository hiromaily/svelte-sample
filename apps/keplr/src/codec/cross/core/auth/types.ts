/* eslint-disable */
import { messageTypeRegistry } from '../../../typeRegistry';
import { Any } from '../../../google/protobuf/any';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'cross.core.auth';

export enum AuthMode {
	AUTH_MODE_UNSPECIFIED = 0,
	AUTH_MODE_LOCAL = 1,
	AUTH_MODE_CHANNEL = 2,
	AUTH_MODE_EXTENSION = 3,
	UNRECOGNIZED = -1
}

export function authModeFromJSON(object: any): AuthMode {
	switch (object) {
		case 0:
		case 'AUTH_MODE_UNSPECIFIED':
			return AuthMode.AUTH_MODE_UNSPECIFIED;
		case 1:
		case 'AUTH_MODE_LOCAL':
			return AuthMode.AUTH_MODE_LOCAL;
		case 2:
		case 'AUTH_MODE_CHANNEL':
			return AuthMode.AUTH_MODE_CHANNEL;
		case 3:
		case 'AUTH_MODE_EXTENSION':
			return AuthMode.AUTH_MODE_EXTENSION;
		case -1:
		case 'UNRECOGNIZED':
		default:
			return AuthMode.UNRECOGNIZED;
	}
}

export function authModeToJSON(object: AuthMode): string {
	switch (object) {
		case AuthMode.AUTH_MODE_UNSPECIFIED:
			return 'AUTH_MODE_UNSPECIFIED';
		case AuthMode.AUTH_MODE_LOCAL:
			return 'AUTH_MODE_LOCAL';
		case AuthMode.AUTH_MODE_CHANNEL:
			return 'AUTH_MODE_CHANNEL';
		case AuthMode.AUTH_MODE_EXTENSION:
			return 'AUTH_MODE_EXTENSION';
		case AuthMode.UNRECOGNIZED:
		default:
			return 'UNRECOGNIZED';
	}
}

export interface Account {
	$type: 'cross.core.auth.Account';
	id?: Uint8Array;
	authType?: AuthType;
}

export interface AuthType {
	$type: 'cross.core.auth.AuthType';
	mode?: AuthMode;
	/** xcc or extension_type_url */
	option?: Any;
}

export interface TxAuthState {
	$type: 'cross.core.auth.TxAuthState';
	remainingSigners?: Account[];
}

function createBaseAccount(): Account {
	return {
		$type: 'cross.core.auth.Account',
		id: new Uint8Array(),
		authType: undefined
	};
}

export const Account = {
	$type: 'cross.core.auth.Account' as const,

	encode(message: Account, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.id !== undefined && message.id.length !== 0) {
			writer.uint32(10).bytes(message.id);
		}
		if (message.authType !== undefined) {
			AuthType.encode(message.authType, writer.uint32(18).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): Account {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseAccount();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.id = reader.bytes();
					break;
				case 2:
					message.authType = AuthType.decode(reader, reader.uint32());
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): Account {
		return {
			$type: Account.$type,
			id: isSet(object.id) ? bytesFromBase64(object.id) : new Uint8Array(),
			authType: isSet(object.authType) ? AuthType.fromJSON(object.authType) : undefined
		};
	},

	toJSON(message: Account): unknown {
		const obj: any = {};
		message.id !== undefined &&
			(obj.id = base64FromBytes(message.id !== undefined ? message.id : new Uint8Array()));
		message.authType !== undefined &&
			(obj.authType = message.authType ? AuthType.toJSON(message.authType) : undefined);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<Account>, I>>(object: I): Account {
		const message = createBaseAccount();
		message.id = object.id ?? new Uint8Array();
		message.authType =
			object.authType !== undefined && object.authType !== null
				? AuthType.fromPartial(object.authType)
				: undefined;
		return message;
	}
};

messageTypeRegistry.set(Account.$type, Account);

function createBaseAuthType(): AuthType {
	return { $type: 'cross.core.auth.AuthType', mode: 0, option: undefined };
}

export const AuthType = {
	$type: 'cross.core.auth.AuthType' as const,

	encode(message: AuthType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.mode !== undefined && message.mode !== 0) {
			writer.uint32(8).int32(message.mode);
		}
		if (message.option !== undefined) {
			Any.encode(message.option, writer.uint32(18).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): AuthType {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseAuthType();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.mode = reader.int32() as any;
					break;
				case 2:
					message.option = Any.decode(reader, reader.uint32());
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): AuthType {
		return {
			$type: AuthType.$type,
			mode: isSet(object.mode) ? authModeFromJSON(object.mode) : 0,
			option: isSet(object.option) ? Any.fromJSON(object.option) : undefined
		};
	},

	toJSON(message: AuthType): unknown {
		const obj: any = {};
		message.mode !== undefined && (obj.mode = authModeToJSON(message.mode));
		message.option !== undefined &&
			(obj.option = message.option ? Any.toJSON(message.option) : undefined);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<AuthType>, I>>(object: I): AuthType {
		const message = createBaseAuthType();
		message.mode = object.mode ?? 0;
		message.option =
			object.option !== undefined && object.option !== null
				? Any.fromPartial(object.option)
				: undefined;
		return message;
	}
};

messageTypeRegistry.set(AuthType.$type, AuthType);

function createBaseTxAuthState(): TxAuthState {
	return { $type: 'cross.core.auth.TxAuthState', remainingSigners: [] };
}

export const TxAuthState = {
	$type: 'cross.core.auth.TxAuthState' as const,

	encode(message: TxAuthState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.remainingSigners !== undefined && message.remainingSigners.length !== 0) {
			for (const v of message.remainingSigners) {
				Account.encode(v!, writer.uint32(10).fork()).ldelim();
			}
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): TxAuthState {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseTxAuthState();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.remainingSigners!.push(Account.decode(reader, reader.uint32()));
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): TxAuthState {
		return {
			$type: TxAuthState.$type,
			remainingSigners: Array.isArray(object?.remainingSigners)
				? object.remainingSigners.map((e: any) => Account.fromJSON(e))
				: []
		};
	},

	toJSON(message: TxAuthState): unknown {
		const obj: any = {};
		if (message.remainingSigners) {
			obj.remainingSigners = message.remainingSigners.map((e) =>
				e ? Account.toJSON(e) : undefined
			);
		} else {
			obj.remainingSigners = [];
		}
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<TxAuthState>, I>>(object: I): TxAuthState {
		const message = createBaseTxAuthState();
		message.remainingSigners = object.remainingSigners?.map((e) => Account.fromPartial(e)) || [];
		return message;
	}
};

messageTypeRegistry.set(TxAuthState.$type, TxAuthState);

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
