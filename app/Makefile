PHONY: dev
dev:
	npm run dev

# https://formulae.brew.sh/cask/ngrok
PHONY: expose-dev
expose-dev:
	npm run dev --host 0.0.0.0
	#ngrok http 3000

PHONY: dev-open
dev-open:
	npm run dev -- --open

PHONY: build
build:
	npm run build

PHONY: build-node
build-node:
	NODE_OPTIONS='--es-module-specifier-resolution=node' npm run build

# github page: https://hiromaily.github.io/svelte-sample/
PHONY: deploy-gitpage
deploy-gitpage:
	rm -rf ../docs/index.html ../docs/_app
	cp -r build/ ../docs/
