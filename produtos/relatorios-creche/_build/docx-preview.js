// Gera um HTML que renderiza um .docx com docx-preview (para conferência visual via Edge → PDF).
// Uso: node docx-preview.js arquivo.docx saida.html
// Cada quebra de página explícita vira uma "página"; páginas mais altas que A4 são listadas em #report.
const fs = require('fs');
const [, , docx, out] = process.argv;
const b64 = fs.readFileSync(docx).toString('base64');
const jszip = fs.readFileSync('node_modules/jszip/dist/jszip.min.js', 'utf8');
const dp = fs.readFileSync('node_modules/docx-preview/dist/docx-preview.min.js', 'utf8');
const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=block" rel="stylesheet">
<style>@page{size:A4;margin:0} body{margin:0;background:#fff} .docx-wrapper{background:#fff!important;padding:0!important} .docx-wrapper>section.docx{box-shadow:none!important;margin:0!important;break-after:page} #report{position:absolute;width:1px;height:1px;overflow:hidden}</style>
<script>${jszip}</script><script>${dp}</script></head><body><div id="c"></div><pre id="report"></pre>
<script>
const bin=atob("${b64}");const arr=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);
docx.renderAsync(new Blob([arr]),document.getElementById('c'),null,{breakPages:true,ignoreLastRenderedPageBreak:true,renderFooters:true}).then(()=>document.fonts.ready).then(()=>{
  const bad=[];const secs=[...document.querySelectorAll('section.docx')];
  secs.forEach((s,i)=>{const h=s.scrollHeight; if(h>1125) bad.push('pagina '+(i+1)+': altura '+h+'px (A4=1123)');});
  document.getElementById('report').textContent='OVERFLOW_REPORT\\n'+secs.length+' paginas\\n'+(bad.join('\\n')||'nenhum')+'\\nEND_REPORT';
});
</script></body></html>`;
fs.writeFileSync(out, html);
