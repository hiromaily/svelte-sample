/* eslint-disable */
import { messageTypeRegistry } from '../../../typeRegistry';
import Long from 'long';
import _m0 from 'protobufjs/minimal.js';

export const protobufPackage = 'cosmos.upgrade.v1beta1';

/** Plan specifies information about a planned upgrade and when it should occur. */
export interface Plan {
	$type: 'cosmos.upgrade.v1beta1.Plan';
	/**
	 * Sets the name for the upgrade. This name will be used by the upgraded
	 * version of the software to apply any special "on-upgrade" commands during
	 * the first BeginBlock method after the upgrade is applied. It is also used
	 * to detect whether a software version can handle a given upgrade. If no
	 * upgrade handler with this name has been set in the software, it will be
	 * assumed that the software is out-of-date when the upgrade Time or Height is
	 * reached and the software will exit.
	 */
	name?: string;
	/**
	 * The height at which the upgrade must be performed.
	 * Only used if Time is not set.
	 */
	height?: Long;
	/**
	 * Any application specific upgrade info to be included on-chain
	 * such as a git commit that validators could automatically upgrade to
	 */
	info?: string;
}

/**
 * SoftwareUpgradeProposal is a gov Content type for initiating a software
 * upgrade.
 */
export interface SoftwareUpgradeProposal {
	$type: 'cosmos.upgrade.v1beta1.SoftwareUpgradeProposal';
	title?: string;
	description?: string;
	plan?: Plan;
}

/**
 * CancelSoftwareUpgradeProposal is a gov Content type for cancelling a software
 * upgrade.
 */
export interface CancelSoftwareUpgradeProposal {
	$type: 'cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal';
	title?: string;
	description?: string;
}

function createBasePlan(): Plan {
	return {
		$type: 'cosmos.upgrade.v1beta1.Plan',
		name: '',
		height: Long.ZERO,
		info: ''
	};
}

export const Plan = {
	$type: 'cosmos.upgrade.v1beta1.Plan' as const,

	encode(message: Plan, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.name !== undefined && message.name !== '') {
			writer.uint32(10).string(message.name);
		}
		if (message.height !== undefined && !message.height.isZero()) {
			writer.uint32(24).int64(message.height);
		}
		if (message.info !== undefined && message.info !== '') {
			writer.uint32(34).string(message.info);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): Plan {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBasePlan();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.name = reader.string();
					break;
				case 3:
					message.height = reader.int64() as Long;
					break;
				case 4:
					message.info = reader.string();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): Plan {
		return {
			$type: Plan.$type,
			name: isSet(object.name) ? String(object.name) : '',
			height: isSet(object.height) ? Long.fromValue(object.height) : Long.ZERO,
			info: isSet(object.info) ? String(object.info) : ''
		};
	},

	toJSON(message: Plan): unknown {
		const obj: any = {};
		message.name !== undefined && (obj.name = message.name);
		message.height !== undefined && (obj.height = (message.height || Long.ZERO).toString());
		message.info !== undefined && (obj.info = message.info);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<Plan>, I>>(object: I): Plan {
		const message = createBasePlan();
		message.name = object.name ?? '';
		message.height =
			object.height !== undefined && object.height !== null
				? Long.fromValue(object.height)
				: Long.ZERO;
		message.info = object.info ?? '';
		return message;
	}
};

messageTypeRegistry.set(Plan.$type, Plan);

function createBaseSoftwareUpgradeProposal(): SoftwareUpgradeProposal {
	return {
		$type: 'cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
		title: '',
		description: '',
		plan: undefined
	};
}

export const SoftwareUpgradeProposal = {
	$type: 'cosmos.upgrade.v1beta1.SoftwareUpgradeProposal' as const,

	encode(message: SoftwareUpgradeProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.title !== undefined && message.title !== '') {
			writer.uint32(10).string(message.title);
		}
		if (message.description !== undefined && message.description !== '') {
			writer.uint32(18).string(message.description);
		}
		if (message.plan !== undefined) {
			Plan.encode(message.plan, writer.uint32(26).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): SoftwareUpgradeProposal {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseSoftwareUpgradeProposal();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.title = reader.string();
					break;
				case 2:
					message.description = reader.string();
					break;
				case 3:
					message.plan = Plan.decode(reader, reader.uint32());
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): SoftwareUpgradeProposal {
		return {
			$type: SoftwareUpgradeProposal.$type,
			title: isSet(object.title) ? String(object.title) : '',
			description: isSet(object.description) ? String(object.description) : '',
			plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined
		};
	},

	toJSON(message: SoftwareUpgradeProposal): unknown {
		const obj: any = {};
		message.title !== undefined && (obj.title = message.title);
		message.description !== undefined && (obj.description = message.description);
		message.plan !== undefined && (obj.plan = message.plan ? Plan.toJSON(message.plan) : undefined);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<SoftwareUpgradeProposal>, I>>(
		object: I
	): SoftwareUpgradeProposal {
		const message = createBaseSoftwareUpgradeProposal();
		message.title = object.title ?? '';
		message.description = object.description ?? '';
		message.plan =
			object.plan !== undefined && object.plan !== null ? Plan.fromPartial(object.plan) : undefined;
		return message;
	}
};

messageTypeRegistry.set(SoftwareUpgradeProposal.$type, SoftwareUpgradeProposal);

function createBaseCancelSoftwareUpgradeProposal(): CancelSoftwareUpgradeProposal {
	return {
		$type: 'cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
		title: '',
		description: ''
	};
}

export const CancelSoftwareUpgradeProposal = {
	$type: 'cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal' as const,

	encode(
		message: CancelSoftwareUpgradeProposal,
		writer: _m0.Writer = _m0.Writer.create()
	): _m0.Writer {
		if (message.title !== undefined && message.title !== '') {
			writer.uint32(10).string(message.title);
		}
		if (message.description !== undefined && message.description !== '') {
			writer.uint32(18).string(message.description);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): CancelSoftwareUpgradeProposal {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseCancelSoftwareUpgradeProposal();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.title = reader.string();
					break;
				case 2:
					message.description = reader.string();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): CancelSoftwareUpgradeProposal {
		return {
			$type: CancelSoftwareUpgradeProposal.$type,
			title: isSet(object.title) ? String(object.title) : '',
			description: isSet(object.description) ? String(object.description) : ''
		};
	},

	toJSON(message: CancelSoftwareUpgradeProposal): unknown {
		const obj: any = {};
		message.title !== undefined && (obj.title = message.title);
		message.description !== undefined && (obj.description = message.description);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<CancelSoftwareUpgradeProposal>, I>>(
		object: I
	): CancelSoftwareUpgradeProposal {
		const message = createBaseCancelSoftwareUpgradeProposal();
		message.title = object.title ?? '';
		message.description = object.description ?? '';
		return message;
	}
};

messageTypeRegistry.set(CancelSoftwareUpgradeProposal.$type, CancelSoftwareUpgradeProposal);

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
