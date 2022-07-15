#!/bin/bash

mkdir ./proto/cross

mkdir tmp && cd tmp
git clone https://github.com/datachainlab/cross.git
cd cross
git checkout -b target v0.2.2

cp -r proto ../../proto/cross/
cp -r third_party ../../

cd ../../
rm -rf proto/cross/proto/samplemod/
rm -rf tmp
