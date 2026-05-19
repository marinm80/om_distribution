# Deploy Guide — VPS

## Arquitectura en el VPS

```
Nginx Proxy Manager
    ├── om-frontend  (React, puerto 80 interno)
    └── om-backend   (Express, puerto 5000 interno)
            └── om-db  (PostgreSQL 18, red interna — NO expuesto)
```

Todos los servicios corren en `docker compose` dentro del mismo proyecto.
El contendor de base de datos compartida anterior (psql/mariadb/mongo) se elimina después de la migración.

---

## Primera vez (migración desde contenedor compartido)

### 1. Preparar el dump desde el contenedor viejo

```bash
# Identificar el nombre del contenedor viejo con PostgreSQL
docker ps

# Exportar la DB
docker exec <contenedor-viejo> pg_dump -U postgres om_markets > om_markets_dump.sql
```

### 2. Configurar el entorno en el VPS

```bash
git clone <repo-url>   # o git pull si ya existe
cd om_distribution

cp .env.example .env
nano .env              # completar todas las variables
```

Variables obligatorias en `.env`:
```
POSTGRES_PASSWORD=...   # password seguro
JWT_SECRET=...          # openssl rand -hex 64
JWT_REFRESH_SECRET=...  # openssl rand -hex 64
FRONTEND_URL=https://yourdomain.com
VITE_API_URL=https://api.yourdomain.com/api
```

### 3. Ejecutar la migración

```bash
# El script levanta el contenedor de DB, importa el dump y levanta el stack completo
bash scripts/migrate-to-docker.sh om_markets_dump.sql
```

### 4. Verificar

```bash
docker compose ps           # todos en "running"
docker compose logs om-backend --tail=20
curl https://api.yourdomain.com/api/health
```

### 5. Eliminar el contenedor viejo

Solo cuando hayas confirmado que todo funciona:
```bash
docker stop <nombre-contenedor-viejo>
docker rm <nombre-contenedor-viejo>
# Si el contenedor viejo tenía un volumen exclusivo que ya no necesitas:
# docker volume rm <nombre-volumen-viejo>
```

---

## Deploys posteriores (ya migrado)

```bash
cd om_distribution
git pull origin main
docker compose up -d --build
```

Solo el servicio cuya imagen cambió se reconstruye. La DB y el volumen de uploads persisten.

---

## Inicializar imágenes de productos

En el primer deploy, las imágenes del repo se copian al volumen de uploads:

```bash
docker compose cp backend/public/uploads/. om-distribution-backend:/app/public/uploads/
```

---

## Rollback

```bash
git checkout <commit-anterior>
docker compose up -d --build
```

---

## Comandos útiles

```bash
# Logs en tiempo real
docker compose logs -f

# Entrar a la DB
docker exec -it om-distribution-db psql -U postgres -d om_markets

# Hacer un backup de la DB
docker exec om-distribution-db pg_dump -U postgres om_markets > backup_$(date +%Y%m%d).sql

# Reiniciar solo el backend
docker compose restart om-backend
```
