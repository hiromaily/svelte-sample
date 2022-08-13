# wallet-demo-using-svelte

## apps

- [wallet](./apps/wallet/)

## sites

- [wallet on the web](https://hiromaily.github.io/wallet-demo-using-svelte/web/wallet/)

## About Svelte

- [docs](https://github.com/hiromaily/documents/blob/main/frontend/framework/svelte.md)


## WIP
There is a problems when generating proto.
Generated files would include
```
import * as _m0 from "protobufjs/minimal";
```
But it must be
```
import _m0 from 'protobufjs/minimal.js';
```
