#!/bin/bash

# refer to script
# https://github.com/cosmos/cosmjs/blob/v0.25.6/packages/stargate/scripts/define-proto.sh

#PROTOC=protoc
PROTOC="`yarn bin`"/grpc_tools_node_protoc

# for cross files
PROTO_DIR="./proto/ibc"
THIRD_PARTY_PROTO_DIR="./third_party/proto"
OUT_DIR="./tmp/"

mkdir -p ${OUT_DIR}

proto_dirs=$(find $PROTO_DIR -path -prune -o -name '*.proto' -print0 | xargs -0 -n1 dirname | sort | uniq)
for dir in $proto_dirs; do
  $PROTOC \
  --plugin="$(yarn bin protoc-gen-ts_proto)" \
  --ts_proto_out="${OUT_DIR}" \
  --proto_path="$PROTO_DIR" \
  --proto_path="$THIRD_PARTY_PROTO_DIR" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=all,outputTypeRegistry=true,importSuffix=.js" \
  $(find "${dir}" -maxdepth 1 -name '*.proto')
done

# sed -i -e 's/..\/typeRegistry/@src\/codec\/typeRegistry/' ${OUT_DIR}app/types.ts
# sed -i -e 's/..\/typeRegistry/@src\/codec\/typeRegistry/' ${OUT_DIR}commitment/types.ts

rm -rf ./app/src/codec/ibc

mkdir -p ./app/src/codec/ibc
mv ${OUT_DIR}ibc ./app/src/codec/

# Remove unnecessary codec files
rm -rf ./tmp
