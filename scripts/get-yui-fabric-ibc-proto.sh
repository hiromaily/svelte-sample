#!/bin/bash

mkdir ./proto/yui-fabric-ibc

mkdir tmp && cd tmp
git clone https://github.com/hyperledger-labs/yui-fabric-ibc.git
cd yui-fabric-ibc
git checkout -b target 02f4f392c023d8845381d2db9fb6d7eb167908ff

cp -r proto ../../proto/yui-fabric-ibc/
cd ../../
rm -rf tmp
