#!/bin/sh

patch -N -p1 < react-native_0.51.patch
if [ ! -f ./node_modules/react-navigation/lib/PlatformHelpers.js ]; then
  mv ./node_modules/react-navigation/lib/PlatformHelpers.native.js ./node_modules/react-navigation/lib/PlatformHelpers.js
fi