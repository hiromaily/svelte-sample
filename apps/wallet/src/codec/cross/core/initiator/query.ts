/* eslint-disable */
import { messageTypeRegistry } from '../../../typeRegistry';
import { Any } from '../../../google/protobuf/any';
import Long from 'long';
import _m0 from 'protobufjs/minimal.js';

export const protobufPackage = 'cross.core.initiator';

export interface QuerySelfXCCRequest {
	$type: 'cross.core.initiator.QuerySelfXCCRequest';
}

export interface QuerySelfXCCResponse {
	$type: 'cross.core.initiator.QuerySelfXCCResponse';
	xcc?: Any;
}

function createBaseQuerySelfXCCRequest(): QuerySelfXCCRequest {
	return { $type: 'cross.core.initiator.QuerySelfXCCRequest' };
}

export const QuerySelfXCCRequest = {
	$type: 'cross.core.initiator.QuerySelfXCCRequest' as const,

	encode(_: QuerySelfXCCRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): QuerySelfXCCRequest {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseQuerySelfXCCRequest();
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

	fromJSON(_: any): QuerySelfXCCRequest {
		return {
			$type: QuerySelfXCCRequest.$type
		};
	},

	toJSON(_: QuerySelfXCCRequest): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<QuerySelfXCCRequest>, I>>(_: I): QuerySelfXCCRequest {
		const message = createBaseQuerySelfXCCRequest();
		return message;
	}
};

messageTypeRegistry.set(QuerySelfXCCRequest.$type, QuerySelfXCCRequest);

function createBaseQuerySelfXCCResponse(): QuerySelfXCCResponse {
	return { $type: 'cross.core.initiator.QuerySelfXCCResponse', xcc: undefined };
}

export const QuerySelfXCCResponse = {
	$type: 'cross.core.initiator.QuerySelfXCCResponse' as const,

	encode(message: QuerySelfXCCResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.xcc !== undefined) {
			Any.encode(message.xcc, writer.uint32(10).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): QuerySelfXCCResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseQuerySelfXCCResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.xcc = Any.decode(reader, reader.uint32());
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): QuerySelfXCCResponse {
		return {
			$type: QuerySelfXCCResponse.$type,
			xcc: isSet(object.xcc) ? Any.fromJSON(object.xcc) : undefined
		};
	},

	toJSON(message: QuerySelfXCCResponse): unknown {
		const obj: any = {};
		message.xcc !== undefined && (obj.xcc = message.xcc ? Any.toJSON(message.xcc) : undefined);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<QuerySelfXCCResponse>, I>>(
		object: I
	): QuerySelfXCCResponse {
		const message = createBaseQuerySelfXCCResponse();
		message.xcc =
			object.xcc !== undefined && object.xcc !== null ? Any.fromPartial(object.xcc) : undefined;
		return message;
	}
};

messageTypeRegistry.set(QuerySelfXCCResponse.$type, QuerySelfXCCResponse);

export interface Query {
	SelfXCC(request: QuerySelfXCCRequest): Promise<QuerySelfXCCResponse>;
}

export class QueryClientImpl implements Query {
	private readonly rpc: Rpc;
	constructor(rpc: Rpc) {
		this.rpc = rpc;
		this.SelfXCC = this.SelfXCC.bind(this);
	}
	SelfXCC(request: QuerySelfXCCRequest): Promise<QuerySelfXCCResponse> {
		const data = QuerySelfXCCRequest.encode(request).finish();
		const promise = this.rpc.request('cross.core.initiator.Query', 'SelfXCC', data);
		return promise.then((data) => QuerySelfXCCResponse.decode(new _m0.Reader(data)));
	}
}

interface Rpc {
	request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
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
