import { Window as KeplrWindow } from '@keplr-wallet/types';

export {};

interface MetamaskWindow {
	ethereum: any;
}
declare global {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Window extends KeplrWindow {}
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Window extends MetamaskWindow {}
}
