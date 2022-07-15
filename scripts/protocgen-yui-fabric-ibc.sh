#!/bin/bash

# refer to script
# https://github.com/cosmos/cosmjs/blob/v0.25.6/packages/stargate/scripts/define-proto.sh

#PROTOC=protoc
PROTOC="`yarn bin`"/grpc_tools_node_protoc

# for cross files
PROTO_DIR="./proto/yui-fabric-ibc/proto"
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
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=all,outputTypeRegistry=true" \
  $(find "${dir}" -maxdepth 1 -name '*.proto')
done

sed -i -e 's/..\/typeRegistry/$codec\/typeRegistry/' ${OUT_DIR}app/types.ts
sed -i -e 's/..\/typeRegistry/$codec\/typeRegistry/' ${OUT_DIR}commitment/types.ts
sed -i -e 's/protobufjs\/minimal/protobufjs\/minimal.js/' ${OUT_DIR}app/types.ts
sed -i -e 's/protobufjs\/minimal/protobufjs\/minimal.js/' ${OUT_DIR}commitment/types.ts
sed -i -e 's/import * as _m0/import _m0/' ${OUT_DIR}app/types.ts
sed -i -e 's/import * as _m0/import _m0/' ${OUT_DIR}commitment/types.ts
# FIXME:
# import * as _m0 from "protobufjs/minimal";
# import _m0 from 'protobufjs/minimal.js';

rm -rf ./apps/keplr/src/codec/yui-fabric-ibc
mkdir -p ./apps/keplr/src/codec/yui-fabric-ibc

# TODO: copy only required files
mv ${OUT_DIR}app ./apps/keplr/src/codec/yui-fabric-ibc/
mv ${OUT_DIR}commitment ./apps/keplr/src/codec/yui-fabric-ibc/
# mkdir -p ./apps/keplr/src/codec/cross/core/client/v1/; mv ${OUT_DIR}ibc/core/client/v1/client.ts $_
# mkdir -p ./apps/keplr/src/codec/cross/applications/transfer/v1/; mv ${OUT_DIR}ibc/applications/transfer/v1/tx.ts $_

# Remove unnecessary codec files
rm -rf ./tmp
rm -rf ./apps/keplr/src/codec/yui-fabric-ibc/app/types.ts-e
rm -rf ./apps/keplr/src/codec/yui-fabric-ibc/commitment/types.ts-e
