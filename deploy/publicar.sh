#!/bin/sh
# Publica a pasta sites/ e a config do nginx na VPS
# Uso: sh deploy/publicar.sh
set -e

SERVER=${SERVER:-root@2.25.104.104}
# Se a sua internet não alcança o IPv4 da VPS: SSH_OPTS="-6" SERVER=root@srv1899434.hstgr.cloud sh ...
# (HostKeyAlias confere a chave do servidor já conhecida pelo IPv4)
SSH_OPTS="${SSH_OPTS:-} -o HostKeyAlias=2.25.104.104"
REMOTE=/docker/lowticket
ROOT=$(cd "$(dirname "$0")/.." && pwd)

ssh $SSH_OPTS "$SERVER" "mkdir -p $REMOTE/sites"
scp $SSH_OPTS "$ROOT/deploy/docker-compose.yml" "$ROOT/deploy/nginx.conf" "$SERVER:$REMOTE/"
tar -C "$ROOT/sites" -cf - . | ssh $SSH_OPTS "$SERVER" "find $REMOTE/sites -mindepth 1 -delete && tar -C $REMOTE/sites -xf -"
ssh $SSH_OPTS "$SERVER" "cd $REMOTE && docker compose up -d && docker compose exec -T web nginx -s reload"

echo "Publicado em https://appnovidades.com.br"
