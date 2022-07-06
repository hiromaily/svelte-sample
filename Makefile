
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
