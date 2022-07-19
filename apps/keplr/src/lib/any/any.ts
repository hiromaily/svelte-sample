//import mapObject, { mapObjectSkip } from 'map-obj';
import mapObject from 'map-obj';
import { messageTypeRegistry } from '$codec/typeRegistry';
import type { MessageType } from '$codec/typeRegistry';
import '$codec/cosmos/crypto/secp256k1/keys'; // somehow this module was not loaded
import { bytesFromBase64 } from '$lib/base64/base64';

const isAny = (value: any): boolean => {
	return typeof value === 'object' && value.typeUrl !== undefined && value.value !== undefined;
};

type ToJSONFunction = (targetType: MessageType, value: string) => unknown;
const exceptionalTypeURLs = new Map<string, ToJSONFunction>();

// ----------------------------------------------------------------------------
// if exceptional logic is required to unpack specific object, refer to the below code
// however, it's not used anywhere for now
// ----------------------------------------------------------------------------
// const paymentAuthExtensionToJSON = (
//   targetType: MessageType,
//   value: string
// ): unknown => {
//   // expected response
//   // {
//   //   "@type": "/extension.auth.PaymentAuthExtension",
//   //   "sign_type": "SIGNTYPE_PERSONAL_SIGN"
//   // }
//   return {
//     '@type': `/${targetType.$type}`,
//     sign_type: fromBase64(value),
//   };
// };
// exceptionalTypeURLs.set(PaymentAuthExtension.$type, paymentAuthExtensionToJSON);

const toJSON = (targetType: MessageType, value: string): unknown => {
	const targetValue = bytesFromBase64(value);
	const decoded = targetType.decode(targetValue);
	const jsonObj = targetType.toJSON(decoded);

	// add @type
	(jsonObj as any)['@type'] = `/${decoded.$type}`;
	return jsonObj;
};

const unpackAny = (value: any): unknown | undefined => {
	// get target type from typeUrl
	// Note: if typeUrl includes `/` it must be removed
	const typeUrls = (value.typeUrl as string).split('/');
	const targetUrl = typeUrls.length == 1 ? typeUrls[0] : typeUrls.length == 2 ? typeUrls[1] : '';
	if (!messageTypeRegistry.has(targetUrl)) return undefined;
	const targetType = messageTypeRegistry.get(targetUrl);
	if (targetType === undefined) return undefined;

	// decode value by target type
	// Note: decode pattern must be changed by typeUrl
	if (exceptionalTypeURLs.has(targetUrl)) {
		const targetFn = exceptionalTypeURLs.get(targetUrl);
		if (targetFn !== undefined) return targetFn(targetType, value.value as string);
	} else {
		return toJSON(targetType, value.value as string);
	}
	return undefined;
};

const decodeAnyFromJSON = (target: any): unknown => {
	return mapObject(
		target,
		(key: any, value: any) => {
			// check value
			if (Array.isArray(value)) {
				const anyList = value;
				anyList.forEach((anyObj, idx) => {
					if (isAny(anyObj)) {
						const result = unpackAny(anyObj);
						if (result !== undefined) anyList[idx] = result;
					}
				});
				return [key, anyList];
			} else if (isAny(value)) {
				// object
				const result = unpackAny(value);
				if (result !== undefined) return [key, result];
			}

			// return
			//return mapObjectSkip; //when skipping
			return [key, value];
		},
		{ deep: true }
	) as unknown;
};

export { decodeAnyFromJSON };
