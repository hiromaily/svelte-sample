#!/bin/bash

# refer to script
# https://github.com/cosmos/cosmjs/blob/v0.25.6/packages/stargate/scripts/define-proto.sh

#PROTOC=protoc
PROTOC="`yarn bin`"/grpc_tools_node_protoc

# for cross files
CROSS_PROTO_DIR="./proto/cross/proto"
THIRD_PARTY_PROTO_DIR="./third_party/proto"
OUT_DIR="./tmp/"


mkdir -p ${OUT_DIR}

proto_dirs=$(find $CROSS_PROTO_DIR -path -prune -o -name '*.proto' -print0 | xargs -0 -n1 dirname | sort | uniq)
for dir in $proto_dirs; do
  $PROTOC \
  --plugin="$(yarn bin protoc-gen-ts_proto)" \
  --ts_proto_out="${OUT_DIR}" \
  --proto_path="$CROSS_PROTO_DIR" \
  --proto_path="$THIRD_PARTY_PROTO_DIR" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=all,outputTypeRegistry=true" \
  $(find "${dir}" -maxdepth 1 -name '*.proto')
done

rm -rf ./apps/wallet/src/codec/cross
mkdir -p ./apps/wallet/src/codec/cross

mkdir -p ./apps/wallet/src/codec/cross/core/auth/; mv ${OUT_DIR}cross/core/auth/types.ts $_
mkdir -p ./apps/wallet/src/codec/cross/core/initiator/; mv ${OUT_DIR}cross/core/initiator/types.ts $_
mv ${OUT_DIR}cross/core/initiator/msgs.ts $_
mv ${OUT_DIR}cross/core/initiator/query.ts $_
mkdir -p ./apps/wallet/src/codec/cross/core/tx/; mv ${OUT_DIR}cross/core/tx/types.ts $_
mkdir -p ./apps/wallet/src/codec/cross/core/xcc/; mv ${OUT_DIR}cross/core/xcc/types.ts $_

# Remove unnecessary codec files
rm -rf ./tmp
