const { execSync } = require('child_process');
const hash = '$2a$10$nnoozBORO46nsVGGULw6QOLFWNvDNE2z/eNlV.Cuc33/wNUWDAIU.';
const query = `UPDATE users SET password='${hash}' WHERE email='euclidesm195@gmail.com';`;
execSync(`docker exec om-distribution-mysql-db mysql -u root -prootpass om_markets -e "${query}"`, { stdio: 'inherit' });
