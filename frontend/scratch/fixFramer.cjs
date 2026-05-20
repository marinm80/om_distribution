const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/sections/Categories.tsx',
  'src/components/sections/FAQ.tsx',
  'src/components/sections/About.tsx',
];

filesToFix.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  let content = fs.readFileSync(fullPath, 'utf-8');

  // Add Variants import if not present
  if (!content.includes('Variants') && content.includes('framer-motion')) {
    content = content.replace(/import {([^}]+)} from 'framer-motion';/, (match, p1) => {
      return `import {${p1}, Variants } from 'framer-motion';`;
    });
  }

  content = content.replace(/const containerVariants = \{/g, 'const containerVariants: Variants = {');
  content = content.replace(/const itemVariants = \{/g, 'const itemVariants: Variants = {');

  fs.writeFileSync(fullPath, content);
  console.log(`Fixed ${file}`);
});
