# Configuración local

## Requisitos

- Node.js 20 o superior.
- Docker Desktop con `docker-compose.exe`, o una instancia MySQL 8 accesible.

## Base de datos

Desde la raíz del repositorio:

```powershell
docker-compose up -d om-mysql-db
docker-compose ps
```

El contenedor local se inicializa con el esquema y datos incluidos en el proyecto. Aplica después las migraciones numeradas que todavía no existan en esa base. Para esta actualización:

```powershell
docker cp backend/database/migrations/004_product_categories.sql om-distribution-mysql-db:/tmp/004.sql
docker exec om-distribution-mysql-db sh -c 'mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" < /tmp/004.sql'
```

La migración puede ejecutarse nuevamente: sus cambios de esquema y backfill son idempotentes.

## Backend

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

Variables mínimas:

```dotenv
PORT=5000
DATABASE_URL=mysql://mysqluser:change_me@127.0.0.1:3306/om_markets
JWT_SECRET=replace_with_a_long_random_value
JWT_REFRESH_SECRET=replace_with_another_long_random_value
FRONTEND_URL=http://localhost:5173
```

## Frontend

```powershell
cd frontend
npm install
npm run dev
```

`VITE_API_URL` es opcional localmente y por defecto apunta a `http://localhost:5000/api`.

## Pruebas

Con MySQL local disponible y las variables de prueba configuradas:

```powershell
cd backend
npm test -- --runInBand
npm run build

cd ..\frontend
npm run lint
npm run build
```
