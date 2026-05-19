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

La base de datos actual está incluida en `backend/database/docker-init/01_dump.sql`.
PostgreSQL la carga **automáticamente** al arrancar con un volumen vacío — no hace falta importar nada a mano.

### 1. Configurar el entorno en el VPS

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

### 2. Levantar el stack

```bash
docker compose up -d --build
```

Al ser el primer arranque con volumen vacío, PostgreSQL ejecuta automáticamente `01_dump.sql` y carga el schema + todos los datos actuales.

### 3. Verificar

```bash
docker compose ps                                  # todos en "running"
docker compose logs om-backend --tail=20
curl https://api.yourdomain.com/api/health         # { success: true, db: "connected" }
```

### 4. Copiar las imágenes de productos al volumen

```bash
docker compose cp backend/public/uploads/. om-distribution-backend:/app/public/uploads/
```

### 5. Eliminar el contenedor viejo

Solo cuando hayas confirmado que todo funciona:
```bash
docker stop <nombre-contenedor-viejo>
docker rm <nombre-contenedor-viejo>
# docker volume rm <nombre-volumen-viejo>   # si tenía volumen exclusivo
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
