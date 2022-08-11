# Note: Apple Silicon Mac need to set the following environment variable
#npm_config_target_arch:=x64
.PHONY: npm-apple-silicon
npm-apple-silicon:
	export npm_config_target_arch=x64 && \
	npm install

.PHONY: get-cosmos-proto
get-cosmos-proto:
	./scripts/get-cosmos-proto.sh

.PHONY: proto-gen-cosmos
proto-gen-cosmos:
	@echo "Generating Protobuf files for cosmos"
	./scripts/protocgen-cosmos.sh

.PHONY: proto-gen-ibc
proto-gen-ibc:
	@echo "Generating Protobuf files for ibc"
	./scripts/protocgen-ibc.sh

.PHONY: get-cross-proto
get-cross-proto:
	./scripts/get-cross-proto.sh

.PHONY: proto-gen-cross
proto-gen-cross:
	@echo "Generating Protobuf files for cross"
	./scripts/protocgen-cross.sh

# .PHONY: get-yui-fabric-ibc-proto
# get-yui-fabric-ibc-proto:
# 	./scripts/get-yui-fabric-ibc-proto.sh

# .PHONY: proto-gen-yui-fabric-ibc
# proto-gen-yui-fabric-ibc:
# 	@echo "Generating Protobuf files for proto-gen-yui-fabric-ibc"
# 	./scripts/protocgen-yui-fabric-ibc.sh

#------------------------------------------------------------------------------
# docker
#------------------------------------------------------------------------------

.PHONY: run-tendermint
run-tendermint:
	docker compose up tendermint-chain0

# .PHONY: run-simd
# run-simd:
# 	docker compose up simdnode0

# cosmos16cklmahud406gg6mx8wz3s2hf68e5997p4pdv6
