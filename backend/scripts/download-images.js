/**
 * Downloads all external product images to public/uploads/ and updates the DB.
 * Run from the backend folder: node scripts/download-images.js
 */
require('dotenv').config();
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const UPLOADS_DIR = path.join(__dirname, '../public/uploads');
const HOST = process.env.PUBLIC_URL || 'http://localhost:5000';

const download = (url, dest, redirectCount = 0) =>
  new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        res.resume();
        const next = new URL(res.headers.location, url).toString();
        return download(next, dest, redirectCount + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', (e) => { fs.unlink(dest, () => {}); reject(e); });
    }).on('error', reject);
  });

const extFromUrl = (url) => {
  try {
    const p = new URL(url).pathname;
    const ext = path.extname(p).split('?')[0].toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext) ? ext : '.jpg';
  } catch { return '.jpg'; }
};

async function run() {
  const { rows } = await pool.query(
    `SELECT id, name_es, image_url FROM products
     WHERE image_url IS NOT NULL AND image_url != ''
       AND image_url NOT LIKE '%/uploads/%'`
  );

  console.log(`Found ${rows.length} products with external images.\n`);
  let ok = 0, fail = 0;

  for (const product of rows) {
    const ext = extFromUrl(product.image_url);
    const filename = `product-${product.id}${ext}`;
    const dest = path.join(UPLOADS_DIR, filename);
    const localUrl = `${HOST}/uploads/${filename}`;

    try {
      process.stdout.write(`[${product.id}] ${product.name_es.slice(0, 40).padEnd(40)} → `);
      await download(product.image_url, dest);
      await pool.query('UPDATE products SET image_url = $1 WHERE id = $2', [localUrl, product.id]);
      console.log(`✓ saved`);
      ok++;
    } catch (err) {
      console.log(`✗ ${err.message}`);
      fail++;
    }
  }

  console.log(`\nDone: ${ok} downloaded, ${fail} failed.`);
  await pool.end();
}

run().catch(console.error);
