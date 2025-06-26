import fs from 'fs';
import path from 'path';

const distPath = './docs/assets';
const base = '/pixi-test/';

fs.readdirSync(distPath).forEach(file => {
  const filePath = path.join(distPath, file);

  // Only match files like index-*.js, index.something.js, etc.
  if (/^index.*\.js$/.test(file)) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace any string like "assets/foo.js" with "/pixi-test/assets/foo.js"
    content = content.replace(/"assets\//g, `"${base}assets/`);

    fs.writeFileSync(filePath, content);
    return;
  }
});