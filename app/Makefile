PHONY: dev
dev:
	npm run dev


PHONY: dev-open
dev-open:
	npm run dev -- --open

# FIXME:
#  - Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/hiroki.yasui/work/practice-by-yh/keplr-sample/app/node_modules/protobufjs/minimal' imported from /Users/hiroki.yasui/work/practice-by-yh/keplr-sample/app/.svelte-kit/output/server/entries/pages/index.svelte.js
#   - refer to https://bytemeta.vip/repo/sveltejs/kit/issues/3210
#  - TypeError: Cannot read properties of undefined (reading 'Long')
#   - `npm i long` doesn't work
#   - `npm i @types/long` doesn't work
PHONY: build
build:
	NODE_OPTIONS='--es-module-specifier-resolution=node' npm run build

# https://formulae.brew.sh/cask/ngrok
PHONY: expose-dev
expose-dev:
	npx svelte-kit dev --host 0.0.0.0
	#ngrok http 3000
