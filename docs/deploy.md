# Release en VPS con Coolify

Este procedimiento actualiza los recursos existentes de OM Distribution. No crea un stack Compose nuevo ni reemplaza la configuración de Coolify.

## Orden del release

1. Confirmar el contenedor MySQL y crear un backup.
2. Aplicar `004_product_categories.sql`.
3. Verificar esquema y backfill.
4. Desplegar el backend.
5. Desplegar el frontend.
6. Ejecutar comprobaciones funcionales.

La base de datos debe migrarse antes que el código porque el backend nuevo consulta `product_categories`.

## 1. Preparar variables en el VPS

Identifica el nombre real del contenedor en Coolify:

```bash
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}' | grep -Ei 'mysql|mariadb'
```

El helper admite nombres personalizados. No guardes contraseñas en el repositorio:

```bash
export DB_CONTAINER='<contenedor-mysql>'
export DB_NAME='<base-de-datos>'
export DB_USER='<usuario-mysql>'
export MYSQL_PWD='<password-mysql>'
```

## 2. Backup obligatorio

Desde el checkout del proyecto en el VPS:

```bash
python3 backend/scripts/mysql_db.py backup
```

Conserva la ruta indicada por el comando y comprueba que el archivo no esté vacío antes de continuar.

## 3. Aplicar la migración 004

El archivo exacto para producción es:

```text
backend/database/migrations/004_product_categories.sql
```

Ejecuta el SQL mediante el helper, que pasa la contraseña al contenedor por variable de entorno:

```bash
python3 backend/scripts/mysql_db.py import backend/database/migrations/004_product_categories.sql --yes
```

Este archivo no contiene `DROP TABLE` ni elimina `products.category_id`. Es idempotente y puede volver a ejecutarse si el comando se interrumpe.

## 4. Verificar la migración

La propia migración imprime tres resultados. Deben cumplirse estas condiciones:

- `relation_count` es mayor o igual al número de productos con categoría.
- `missing_backfills` es `0`.

Además, verifica la conexión y los conteos básicos:

```bash
python3 backend/scripts/mysql_db.py verify
```

## 5. Desplegar en Coolify

Cuando la migración esté verificada:

1. Redeploy del recurso backend y espera a que `/api/health` responda correctamente.
2. Redeploy del recurso frontend con `VITE_API_URL` apuntando a la API pública.
3. No cambies los volúmenes de uploads ni la base de datos durante este release.

Variables críticas del backend:

```dotenv
DATABASE_URL=mysql://USER:PASSWORD@MYSQL_HOST:3306/DB_NAME
JWT_SECRET=<valor-largo-y-aleatorio>
JWT_REFRESH_SECRET=<otro-valor-largo-y-aleatorio>
FRONTEND_URL=https://<dominio-frontend>
NODE_ENV=production
```

## 6. Smoke test

- Abrir el catálogo público y comprobar productos y categorías.
- Iniciar sesión en `/admin`.
- Crear o editar un producto con dos categorías.
- Confirmar que ambas categorías aparecen en el panel y el catálogo público.
- Confirmar que el catálogo y el PDF son informativos y no muestran precios.
- Cerrar sesión y volver a iniciar sesión.
- Confirmar que el footer y el banner del panel abren `https://rafaelmarin.dev` en otra pestaña.

## Rollback

La opción segura es desplegar el commit anterior y conservar las columnas/tablas nuevas; el código anterior seguirá usando `products.category_id`.

Solo si es imprescindible revertir también el esquema, y después de restaurar o validar el backup:

```sql
DROP TABLE product_categories;
```

No ejecutes ese rollback mientras el backend nuevo esté activo.
