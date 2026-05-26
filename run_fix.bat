@echo off
node backend/scripts/convert-pg-to-mysql.js
docker exec om-distribution-mysql-db mysql -u root -prootpass -e "DROP DATABASE IF EXISTS om_markets;"
docker exec -i om-distribution-mysql-db mysql -u root -prootpass < backend\database\mysql-init\01_mysql_dump.sql
docker exec om-distribution-mysql-db mysql -u root -prootpass om_markets -e "DELETE p1 FROM products p1 JOIN products p2 ON p1.name_en = p2.name_en AND p1.id > p2.id;"
node backend/scripts/update-images.js
docker exec om-distribution-mysql-db mysqldump -u root -prootpass om_markets > backend\database\mysql-init\01_mysql_dump.sql
node -e "const fs = require('fs'); let c = fs.readFileSync('backend/database/mysql-init/01_mysql_dump.sql', 'utf8'); c = 'CREATE DATABASE IF NOT EXISTS om_markets;\nUSE om_markets;\n' + c; fs.writeFileSync('backend/database/mysql-init/01_mysql_dump.sql', c, 'utf8');"
