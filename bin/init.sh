#!/bin/sh
source bin/env.sh
babel --presets es2015 src --out-dir dist
node ./bin/www