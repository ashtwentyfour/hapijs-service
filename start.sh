#!/usr/bin/env bash
rm -f nohup.out
rm -f node.pid
export NODE_ENV=DEV
export PORT=8081
nohup node start.js &
echo $! > node.pid