# Note: Apple Silicon Mac need to set the following environment variable
#npm_config_target_arch:=x64
.PHONY: npm-apple-silicon
npm-apple-silicon:
	export npm_config_target_arch=x64 && \
	npm install

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
build: clean
	npm run build

PHONY: build-node
build-node: clean
	NODE_OPTIONS='--es-module-specifier-resolution=node' npm run build

# github page: https://hiromaily.github.io/svelte-sample/web/
# replace `_app` from js file as well
PHONY: deploy-gitpage
deploy-gitpage:
	rm -rf ../../web/wallet/*.html ../../web/wallet/app
	cp -r build/ ../../web/wallet/

PHONY: clean
clean:
	rm -rf build
