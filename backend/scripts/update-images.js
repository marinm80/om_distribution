const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const uploadsDir = path.join(__dirname, '../public/uploads');
const files = fs.readdirSync(uploadsDir);

let count = 0;
files.forEach(file => {
  const match = file.match(/^product-(\d+)\.(jpg|jpeg|png|webp)$/i);
  if (match) {
    const id = match[1];
    const imgUrl = `/uploads/${file}`;
    const query = `UPDATE products SET image_url = '${imgUrl}' WHERE id = ${id};`;
    try {
      execSync(`docker exec om-distribution-mysql-db mysql -u root -prootpass om_markets -e "${query}"`, { stdio: 'ignore' });
      count++;
    } catch (e) {
      console.error('Error updating', id, e.message);
    }
  }
});
console.log(`Successfully updated ${count} product images.`);
