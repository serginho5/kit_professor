// Substituto do pptxgenjs para pré-visualização: grava as mesmas chamadas como HTML (1 página A4 por slide).
// Uso: PREVIEW=1 node build-x.js saida.html  → depois o Edge converte em PDF para conferência visual.
// Caixas de texto cujo conteúdo não cabe recebem contorno vermelho e são listadas em #report.
const fs = require('fs');

const PX = 96; // px por polegada
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const hex = (c, t) => {
  if (!c) return 'transparent';
  if (t) { const n = parseInt(c, 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${1 - t / 100})`; }
  return '#' + c;
};

class Slide {
  constructor(meta) { this.items = []; this.background = null; this.meta = meta; }
  addShape(type, o) { this.items.push({ kind: 'shape', type, o: { ...o } }); }
  addText(t, o) { this.items.push({ kind: 'text', t, o: { ...o } }); }
  addImage(o) { this.items.push({ kind: 'image', o: { ...o } }); }
  addNotes() {}
}

class PreviewPres {
  constructor() { this.slides = []; this.shapes = { OVAL: 'oval', ROUNDED_RECTANGLE: 'rrect', RECTANGLE: 'rect', LINE: 'line' }; this.W = 10; this.H = 5.625; }
  defineLayout({ width, height }) { this.W = width; this.H = height; }
  set layout(v) { if (v === 'LAYOUT_WIDE') { this.W = 13.333; this.H = 7.5; } }
  addSection() {}
  addSlide(meta = {}) { const s = new Slide(meta); this.slides.push(s); return s; }

  renderRuns(t, o) {
    const runs = Array.isArray(t) ? t : [{ text: t, options: {} }];
    let html = '<p>';
    for (const r of runs) {
      const ro = { ...o, ...(r.options || {}) };
      const parts = String(r.text).split('\n');
      parts.forEach((p, i) => {
        if (i > 0) html += '</p><p>';
        const st = [];
        if (ro.fontSize) st.push(`font-size:${ro.fontSize * PX / 72}px`);
        if (ro.fontFace) st.push(`font-family:'${ro.fontFace}'`);
        if (ro.bold) st.push('font-weight:700');
        if (ro.italic) st.push('font-style:italic');
        if (ro.color) st.push(`color:#${ro.color}`);
        if (ro.strike) st.push('text-decoration:line-through');
        if (p) html += `<span style="${st.join(';')}">${esc(p)}</span>`;
      });
      if (r.options && r.options.breakLine) html += `</p><p style="margin-top:${((r.options.paraSpaceAfter || 0) * PX / 72)}px">`;
    }
    return html + '</p>';
  }

  async writeFile({ fileName }) {
    const W = this.W * PX, H = this.H * PX;
    let body = '';
    this.slides.forEach((s, idx) => {
      const bg = s.background ? hex(s.background.color) : '#fff';
      let inner = '';
      let z = 0;
      for (const it of s.items) {
        const o = it.o; z += 1;
        const box = `left:${o.x * PX}px;top:${o.y * PX}px;width:${(o.w || 0) * PX}px;height:${(o.h || 0) * PX}px;z-index:${z}`;
        if (it.kind === 'shape') {
          const fill = o.fill ? hex(o.fill.color, o.fill.transparency) : 'transparent';
          const ln = o.line && o.line.width ? `${o.line.width * PX / 72}px ${o.line.dashType ? 'dashed' : 'solid'} #${o.line.color}` : 'none';
          if (it.type === 'line') {
            const vertical = !o.w;
            inner += `<div style="position:absolute;${box};${vertical ? `border-left:${ln};width:0` : `border-top:${ln};height:0`}"></div>`;
          } else {
            const rad = it.type === 'oval' ? '50%' : it.type === 'rrect' ? `${(o.rectRadius || 0.1) * PX}px` : '0';
            const sh = o.shadow ? 'box-shadow:0 2px 8px rgba(138,132,168,.25);' : '';
            inner += `<div style="position:absolute;${box};background:${fill};border:${ln};box-sizing:border-box;border-radius:${rad};${sh}"></div>`;
          }
        } else if (it.kind === 'image') {
          inner += `<img style="position:absolute;${box}" src="data:${o.data.replace(/^data:/, '')}">`;
        } else {
          const fs_ = (o.fontSize || 18) * PX / 72;
          const st = [
            box, `font-family:'${o.fontFace || 'Nunito'}'`, `font-size:${fs_}px`, `color:#${o.color || '000000'}`,
            `text-align:${o.align || 'left'}`, `justify-content:${o.valign === 'middle' ? 'center' : o.valign === 'bottom' ? 'flex-end' : 'flex-start'}`,
            `line-height:${1.2 * (o.lineSpacingMultiple || 1)}`,
            o.bold ? 'font-weight:700' : '', o.italic ? 'font-style:italic' : '',
            o.charSpacing ? `letter-spacing:${o.charSpacing * PX / 72}px` : '',
            o.strike ? 'text-decoration:line-through' : '',
          ].filter(Boolean).join(';');
          const pa = o.paraSpaceAfter ? `style="margin-bottom:${o.paraSpaceAfter * PX / 72}px"` : '';
          inner += `<div class="tx" data-slide="${idx + 1}" style="position:absolute;display:flex;flex-direction:column;${st}"><div class="in" ${pa}>${this.renderRuns(it.t, {})}</div></div>`;
        }
      }
      body += `<section class="page" style="width:${W}px;height:${H}px;background:${bg}">${inner}</section>`;
    });
    const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=block" rel="stylesheet">
<style>
@page{size:${this.W}in ${this.H}in;margin:0}
*{margin:0;padding:0}
body{background:#fff}
.page{position:relative;overflow:hidden;page-break-after:always;break-after:page}
.page:last-of-type{page-break-after:auto;break-after:auto}
.tx p{margin:0}
.tx.over{outline:2px solid red}
#report{position:absolute;left:0;top:0;width:1px;height:1px;overflow:hidden}
</style></head><body>${body}<pre id="report"></pre>
<script>
document.fonts.ready.then(()=>{
  const bad=[];
  document.querySelectorAll('.tx').forEach(el=>{
    const inn=el.querySelector('.in');
    if(inn.scrollHeight>el.clientHeight+2||inn.scrollWidth>el.clientWidth+2){el.classList.add('over');bad.push('p'+el.dataset.slide+': '+inn.textContent.slice(0,70)+' ['+inn.scrollHeight+'>'+el.clientHeight+']');}
  });
  document.getElementById('report').textContent='OVERFLOW_REPORT\\n'+(bad.join('\\n')||'nenhum')+'\\nEND_REPORT';
});
</script></body></html>`;
    fs.writeFileSync(fileName, html);
    console.log('preview', fileName, this.slides.length, 'páginas');
  }
}

module.exports = PreviewPres;
