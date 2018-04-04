#!/bin/bash
set -e
cd /BIT_HFCS_SERVER
#启动
echo '启动 server'
node ./bin/www

tail -f /dev/null
