const fs = require('fs');
const path = require('path');

const pgDumpPath = path.join(__dirname, '../database/docker-init/01_dump.sql');
const mysqlDumpPath = path.join(__dirname, '../database/mysql-init/01_mysql_dump.sql');

if (!fs.existsSync(path.dirname(mysqlDumpPath))) {
  fs.mkdirSync(path.dirname(mysqlDumpPath), { recursive: true });
}

const pgDump = fs.readFileSync(pgDumpPath, 'utf8');

let mysqlDump = `
-- MySQL Dump converted from PostgreSQL

SET FOREIGN_KEY_CHECKS=0;

CREATE DATABASE IF NOT EXISTS \`om_markets\`;
USE \`om_markets\`;

CREATE TABLE \`categories\` (
  \`id\` INT NOT NULL AUTO_INCREMENT,
  \`name_en\` VARCHAR(100) NOT NULL,
  \`name_es\` VARCHAR(100) NOT NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`contacts\` (
  \`id\` INT NOT NULL AUTO_INCREMENT,
  \`full_name\` VARCHAR(255) NOT NULL,
  \`email\` VARCHAR(255) NOT NULL,
  \`phone\` VARCHAR(50),
  \`company_name\` VARCHAR(255),
  \`message\` TEXT NOT NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`products\` (
  \`id\` INT NOT NULL AUTO_INCREMENT,
  \`name_en\` VARCHAR(255) NOT NULL,
  \`name_es\` VARCHAR(255) NOT NULL,
  \`description_en\` TEXT,
  \`description_es\` TEXT,
  \`image_url\` TEXT,
  \`category_id\` INT,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  \`is_active\` TINYINT(1) DEFAULT 1,
  \`show_on_landing\` TINYINT(1) DEFAULT 0,
  PRIMARY KEY (\`id\`),
  KEY \`category_id\` (\`category_id\`),
  CONSTRAINT \`fk_products_category\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`users\` (
  \`id\` VARCHAR(36) NOT NULL DEFAULT (UUID()),
  \`email\` VARCHAR(255) NOT NULL,
  \`password\` VARCHAR(255) NOT NULL,
  \`role\` VARCHAR(50) DEFAULT 'admin',
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`refresh_tokens\` (
  \`id\` INT NOT NULL AUTO_INCREMENT,
  \`token\` TEXT NOT NULL,
  \`user_id\` VARCHAR(36),
  \`expires_at\` DATETIME NOT NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`user_id\` (\`user_id\`),
  CONSTRAINT \`fk_refresh_tokens_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`testimonials\` (
  \`id\` INT NOT NULL AUTO_INCREMENT,
  \`author_name\` VARCHAR(100) NOT NULL,
  \`content_en\` TEXT NOT NULL,
  \`content_es\` TEXT NOT NULL,
  \`rating\` INT,
  \`role_en\` VARCHAR(100),
  \`role_es\` VARCHAR(100),
  \`image_url\` TEXT,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  CONSTRAINT \`testimonials_rating_check\` CHECK (\`rating\` >= 1 AND \`rating\` <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

function escapeString(str) {
  if (str === '\\N') return 'NULL';
  return "'" + str.replace(/'/g, "''").replace(/\\/g, '\\\\') + "'";
}

const copyRegex = /COPY public\.(\w+) \((.*?)\) FROM stdin;\r?\n([\s\S]*?)\\\./g;
let match;
while ((match = copyRegex.exec(pgDump)) !== null) {
  const tableName = match[1];
  const columns = match[2];
  const rows = match[3].split(/\r?\n/).filter(r => r.trim().length > 0);
  
  if (rows.length === 0) continue;

  mysqlDump += `\n-- Data for ${tableName}\n`;
  
  rows.forEach(row => {
    const values = row.split('\t').map(val => escapeString(val));
    mysqlDump += `INSERT INTO \`${tableName}\` (${columns}) VALUES (${values.join(', ')});\n`;
  });
}

mysqlDump = mysqlDump.replace(/'t'/g, '1').replace(/'f'/g, '0');
mysqlDump = mysqlDump.replace(/\+\d{2}/g, ''); // simple fix for timezone

mysqlDump += '\nSET FOREIGN_KEY_CHECKS=1;\n';
fs.writeFileSync(mysqlDumpPath, mysqlDump, 'utf8');
console.log('Successfully generated MySQL dump at', mysqlDumpPath);
