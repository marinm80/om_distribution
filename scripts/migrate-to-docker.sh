#!/bin/bash
# =============================================================================
# migrate-to-docker.sh
# Migra la DB del contenedor compartido (psql/mariadb/mongo) al nuevo
# contenedor PostgreSQL dedicado de om_distribution.
#
# Ejecutar en el VPS DESPUÉS de hacer git pull y tener el dump listo.
# Uso: bash scripts/migrate-to-docker.sh [ruta-al-dump.sql]
# =============================================================================

set -e

DUMP_FILE="${1:-om_markets_dump.sql}"
DB_CONTAINER="om-distribution-db"
DB_USER="${POSTGRES_USER:-postgres}"
DB_NAME="${POSTGRES_DB:-om_markets}"

echo ">>> Verificando dump: $DUMP_FILE"
if [ ! -f "$DUMP_FILE" ]; then
  echo "ERROR: No se encontró $DUMP_FILE"
  echo "Exporta la DB del contenedor antiguo primero:"
  echo "  docker exec <viejo-contenedor> pg_dump -U postgres om_markets > om_markets_dump.sql"
  exit 1
fi

echo ">>> Levantando solo el contenedor de DB..."
docker compose up -d om-db

echo ">>> Esperando que PostgreSQL esté listo..."
until docker exec $DB_CONTAINER pg_isready -U $DB_USER -d $DB_NAME 2>/dev/null; do
  sleep 2
done
echo "    PostgreSQL listo."

echo ">>> Importando dump..."
docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME < "$DUMP_FILE"
echo "    Dump importado correctamente."

echo ">>> Aplicando índices de performance..."
docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME < backend/database/003_indexes.sql
echo "    Índices aplicados."

echo ">>> Levantando el stack completo..."
docker compose up -d

echo ""
echo "=== Migración completada ==="
echo "Verifica el estado: docker compose ps"
echo "Logs del backend:   docker compose logs -f om-backend"
echo ""
echo "Cuando confirmes que todo funciona, detén el contenedor antiguo:"
echo "  docker stop <nombre-del-contenedor-viejo>"
