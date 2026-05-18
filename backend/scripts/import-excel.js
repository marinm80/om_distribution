require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const xlsx = require('xlsx');
const pool = require('../src/config/pool');
const path = require('path');

async function importExcel() {
  const filePath = '/tmp/excel.xlsx';
  console.log(`Leyendo archivo: ${filePath}`);
  
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log(`Se encontraron ${rows.length} productos en el archivo.`);
    
    // Check if categories need to be mapped. The excel file might have a category string instead of id.
    // Actually, looking at the code, it expects category_id. We'll just insert null if not found, or insert directly.
    
    for (const row of rows) {
      const name_en = row.name_en || row.name || '';
      const name_es = row.name_es || row.name || '';
      const description_en = row.description_en || row.description || '';
      const description_es = row.description_es || row.description || '';
      const image_url = row.image_url || '';
      let category_id = row.category_id ? parseInt(row.category_id, 10) : null;
      if (isNaN(category_id) || category_id > 4) category_id = null;
      
      const is_active = String(row.is_active || 'true').toLowerCase() !== 'false';
      const show_on_landing = String(row.show_on_landing || 'false').toLowerCase() === 'true';

      await pool.query(
        `INSERT INTO products (name_en, name_es, description_en, description_es, image_url, category_id, is_active, show_on_landing)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [name_en, name_es, description_en, description_es, image_url, category_id, is_active, show_on_landing]
      );
    }
    
    console.log('✅ Base de datos alimentada con éxito.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al importar:', err);
    process.exit(1);
  }
}

importExcel();
