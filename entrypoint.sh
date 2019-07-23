#!/bin/sh

# pkill -F /project/tmp/pids/server.pid
# rm /project/tmp/pids/server.pid

npm run serve

while true
do
    echo "Press [CTRL+C] to stop.."
    sleep 1
done