import { copyFileSync, existsSync } from 'node:fs';

const builtHtml = existsSync('dist/index.html')
  ? 'dist/index.html'
  : 'dist/index.source.html';

copyFileSync(builtHtml, 'dist/index.html');
copyFileSync('dist/index.html', 'dist/404.html');
