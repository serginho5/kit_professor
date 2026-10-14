// Monta a página e publica em sites/relatorios-creche/ (pasta servida pelo nginx da VPS).
// Copia só as imagens que a página realmente referencia.
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'src.html'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'index.html'), html);

const out = path.join(__dirname, '..', '..', '..', 'sites', 'relatorios-creche');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
fs.writeFileSync(path.join(out, 'index.html'), html);
const usados = new Set([...html.matchAll(/assets\/([\w.-]+\.(?:webp|jpg|png))/g)].map((m) => m[1]));
// imagens montadas pelo script da lista (assets/${k}.webp)
for (const m of html.matchAll(/data-img="([\w-]+)"/g)) usados.add(m[1] + '.webp');
for (const f of usados) fs.copyFileSync(path.join(__dirname, 'assets', f), path.join(out, 'assets', f));
console.log('ok', out, usados.size, 'imagens');
