import { Buffer } from 'buffer';

const bytesFromBase64 = (b64: string): Uint8Array => {
	// Decodes a string of Base64-encoded data into bytes
	return Uint8Array.from(Buffer.from(b64 as string, 'base64'));
};

export { bytesFromBase64 };
