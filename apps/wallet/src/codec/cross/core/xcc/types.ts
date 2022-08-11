/* eslint-disable */
import { messageTypeRegistry } from '../../../typeRegistry';
import Long from 'long';
import _m0 from 'protobufjs/minimal.js';

export const protobufPackage = 'cross.core.xcc';

export interface ChannelInfo {
	$type: 'cross.core.xcc.ChannelInfo';
	port?: string;
	channel?: string;
}

function createBaseChannelInfo(): ChannelInfo {
	return { $type: 'cross.core.xcc.ChannelInfo', port: '', channel: '' };
}

export const ChannelInfo = {
	$type: 'cross.core.xcc.ChannelInfo' as const,

	encode(message: ChannelInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.port !== undefined && message.port !== '') {
			writer.uint32(10).string(message.port);
		}
		if (message.channel !== undefined && message.channel !== '') {
			writer.uint32(18).string(message.channel);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ChannelInfo {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseChannelInfo();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.port = reader.string();
					break;
				case 2:
					message.channel = reader.string();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): ChannelInfo {
		return {
			$type: ChannelInfo.$type,
			port: isSet(object.port) ? String(object.port) : '',
			channel: isSet(object.channel) ? String(object.channel) : ''
		};
	},

	toJSON(message: ChannelInfo): unknown {
		const obj: any = {};
		message.port !== undefined && (obj.port = message.port);
		message.channel !== undefined && (obj.channel = message.channel);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<ChannelInfo>, I>>(object: I): ChannelInfo {
		const message = createBaseChannelInfo();
		message.port = object.port ?? '';
		message.channel = object.channel ?? '';
		return message;
	}
};

messageTypeRegistry.set(ChannelInfo.$type, ChannelInfo);

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
