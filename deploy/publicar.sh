#!/bin/sh
# Publica a pasta sites/ e a config do nginx na VPS
# Uso: sh deploy/publicar.sh
set -e

SERVER=root@2.25.104.104
REMOTE=/docker/lowticket
ROOT=$(cd "$(dirname "$0")/.." && pwd)

ssh "$SERVER" "mkdir -p $REMOTE/sites"
scp "$ROOT/deploy/docker-compose.yml" "$ROOT/deploy/nginx.conf" "$SERVER:$REMOTE/"
tar -C "$ROOT/sites" -cf - . | ssh "$SERVER" "find $REMOTE/sites -mindepth 1 -delete && tar -C $REMOTE/sites -xf -"
ssh "$SERVER" "cd $REMOTE && docker compose up -d && docker compose exec -T web nginx -s reload"

echo "Publicado em https://appnovidades.com.br"
