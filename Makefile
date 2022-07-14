
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
