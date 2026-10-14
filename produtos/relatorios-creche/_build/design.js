// Sistema visual compartilhado pelos arquivos do kit (PPTX em A4 retrato, importável no Canva).
// Cores em hexadecimal fixo (não cores de tema) para o Canva importar exatamente como desenhado.
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const sharp = require('sharp');
const Pi = require('react-icons/pi');

const W = 8.27;   // A4 retrato, polegadas
const H = 11.69;
const M = 0.6;    // margem

const FONT_HEAD = 'Fredoka';
const FONT_BODY = 'Nunito';

const C = {
  ink: '2D2A4A',      // texto principal
  ink2: '5E5A7A',     // texto secundário
  line: 'E6E2EF',
  paper: 'FFFFFF',
  mist: 'F6F4FA',     // fundo suave
  brand: 'EF6F57',    // coral da marca
  brandDark: 'C9533D',
  // Campos de experiência
  coral: 'EF6F57', coralT: 'FDE7E2',
  mint: '2FA587', mintT: 'DCF2EB',
  sun: 'E9A21F', sunT: 'FCF0D4',
  sky: '3F86D6', skyT: 'DFEBF9',
  lilac: '8A67C9', lilacT: 'EEE7F8',
};

const CAMPO_COR = { EO: 'coral', CG: 'mint', TS: 'sun', EF: 'sky', ET: 'lilac' };
const CAMPO_ICON = { EO: 'PiHandHeart', CG: 'PiPersonSimpleRun', TS: 'PiPaintBrush', EF: 'PiChatCircleText', ET: 'PiMagnifyingGlass' };

const iconCache = new Map();
async function icon(name, color = 'FFFFFF', size = 256) {
  const key = `${name}-${color}-${size}`;
  if (iconCache.has(key)) return iconCache.get(key);
  const Comp = Pi[name];
  if (!Comp) throw new Error(`Ícone inexistente: ${name}`);
  const svg = renderToStaticMarkup(React.createElement(Comp, { color: `#${color}`, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  const data = 'image/png;base64,' + buf.toString('base64');
  iconCache.set(key, data);
  return data;
}

// Círculo colorido com ícone branco centralizado (motivo visual do kit).
async function iconCircle(slide, pres, { x, y, d, fill, name, iconColor = 'FFFFFF', ratio = 0.56, objectName }) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0 }, objectName: objectName ? objectName + ' fundo' : undefined });
  const s = d * ratio;
  slide.addImage({ data: await icon(name, iconColor), x: x + (d - s) / 2, y: y + (d - s) / 2, w: s, h: s, objectName: objectName ? objectName + ' ícone' : undefined });
}

// Texto com defaults do kit (sempre caixa de texto, margem zero para alinhar com formas).
function text(slide, str, opts) {
  slide.addText(str, { isTextBox: true, margin: 0, fontFace: FONT_BODY, color: C.ink, fontSize: 11, valign: 'top', ...opts });
}

// Rodapé discreto com nome do kit e número da página.
function footer(slide, n, label = 'Kit Relatórios da Creche · Guia pedagógico') {
  text(slide, label, { x: M, y: H - 0.45, w: 5, h: 0.2, fontSize: 8, color: C.ink2 });
  text(slide, String(n), { x: W - M - 0.6, y: H - 0.45, w: 0.6, h: 0.2, fontSize: 8, color: C.ink2, align: 'right', bold: true });
}

// Título de página de conteúdo: rótulo pequeno (seção) + título grande.
function pageTitle(slide, kicker, title, color = C.brand) {
  text(slide, kicker.toUpperCase(), { x: M, y: 0.55, w: W - 2 * M, h: 0.25, fontSize: 9, bold: true, color, charSpacing: 2 });
  text(slide, title, { x: M, y: 0.8, w: W - 2 * M, h: 0.9, fontSize: 26, fontFace: FONT_HEAD, bold: true, color: C.ink, valign: 'top' });
}

// Bolhas decorativas (motivo do kit) em um canto.
function dots(slide, pres, x, y, scale = 1) {
  const set = [
    { dx: 0, dy: 0, d: 0.5, c: C.coral },
    { dx: 0.62, dy: 0.15, d: 0.32, c: C.sun },
    { dx: 0.2, dy: 0.62, d: 0.36, c: C.mint },
    { dx: 0.72, dy: 0.6, d: 0.24, c: C.sky },
    { dx: 1.05, dy: 0.28, d: 0.2, c: C.lilac },
  ];
  for (const s of set) slide.addShape(pres.shapes.OVAL, { x: x + s.dx * scale, y: y + s.dy * scale, w: s.d * scale, h: s.d * scale, fill: { color: s.c }, line: { color: s.c, width: 0 } });
}

function card(slide, pres, { x, y, w, h, fill = C.mist, radius = 0.18, shadow = false }) {
  const o = { x, y, w, h, fill: { color: fill }, line: { color: fill, width: 0 }, rectRadius: radius };
  if (shadow) o.shadow = { type: 'outer', color: '8A84A8', opacity: 0.18, blur: 8, offset: 2, angle: 90 };
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, o);
}

// Página de encerramento: despedida + fontes consultadas (última página de cada arquivo).
function closingPage(pres, sectionTitle, { titulo, texto, fontes, nota, marca = 'Kit Relatórios da Creche' }) {
  const s = pres.addSlide({ sectionTitle });
  s.background = { color: C.ink };
  const CW = W - 2 * M;
  dots(s, pres, M, 0.9, 1.3);
  text(s, 'PARA ENCERRAR', { x: M, y: 2.35, w: CW, h: 0.3, fontSize: 10, bold: true, color: C.sun, charSpacing: 3 });
  text(s, titulo, { x: M, y: 2.7, w: 6.6, h: 1.9, fontSize: 26, fontFace: FONT_HEAD, bold: true, color: 'FFFFFF' });
  text(s, texto, { x: M, y: 4.65, w: 6.6, h: 1.25, fontSize: 12.5, color: 'E9E6F5', lineSpacingMultiple: 1.1 });
  card(s, pres, { x: M, y: 6.15, w: CW, h: 4.35, fill: '3A3660' });
  text(s, 'FONTES CONSULTADAS NA ELABORAÇÃO DESTE MATERIAL', { x: M + 0.35, y: 6.4, w: CW - 0.7, h: 0.25, fontSize: 8.5, bold: true, color: C.sun, charSpacing: 1.5 });
  text(s, fontes.map((f, i) => ({ text: f, options: { breakLine: i < fontes.length - 1, paraSpaceAfter: 4 } })), { x: M + 0.35, y: 6.8, w: CW - 0.7, h: 3.1, fontSize: 8.5, color: 'E9E6F5' });
  text(s, nota, { x: M + 0.35, y: 9.95, w: CW - 0.7, h: 0.4, fontSize: 8.5, italic: true, color: 'B9B4D3' });
  text(s, `${marca} · Material de apoio pedagógico para uso individual. Proibida a revenda ou distribuição.`, { x: M, y: 10.85, w: CW, h: 0.3, fontSize: 8.5, color: 'B9B4D3' });
  return s;
}

// Espaço tracejado para foto (no Canva: apagar e arrastar a foto).
async function photoSlot(slide, pres, { x, y, w, h, round = false, label = 'Foto', fill = 'FFFFFF' }) {
  const o = { x, y, w, h, fill: { color: fill }, line: { color: 'CFC9E0', width: 1.5, dashType: 'dash' }, objectName: 'Espaço para foto' };
  if (round) slide.addShape(pres.shapes.OVAL, o); else slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { ...o, rectRadius: 0.15 });
  const ic = Math.min(w, h) * 0.26;
  slide.addImage({ data: await icon('PiCamera', 'A9A4BF'), x: x + (w - ic) / 2, y: y + h / 2 - ic * 0.85, w: ic, h: ic });
  text(slide, label, { x: x + 0.1, y: y + h / 2 + ic * 0.25, w: w - 0.2, h: 0.3, fontSize: 9, color: 'A9A4BF', align: 'center' });
}

module.exports = { photoSlot, closingPage, W, H, M, C, FONT_HEAD, FONT_BODY, CAMPO_COR, CAMPO_ICON, icon, iconCircle, text, footer, pageTitle, dots, card };
