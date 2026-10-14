import sys, os, pymupdf as fitz
# Uso: python topng.py arquivo.pdf prefixo [zoom]  -> prefixo-NN.png (uma por página) + folhas de contato 2x2
pdf, prefix = sys.argv[1], sys.argv[2]
zoom = float(sys.argv[3]) if len(sys.argv) > 3 else 0.9
doc = fitz.open(pdf)
files = []
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom))
    f = f"{prefix}-{i+1:02d}.png"; pix.save(f); files.append(f)
# folhas de contato com 4 páginas lado a lado (para revisão rápida)
from PIL import Image
for k in range(0, len(files), 4):
    ims = [Image.open(f) for f in files[k:k+4]]
    w, h = ims[0].size
    sheet = Image.new("RGB", (w*len(ims) + 10*(len(ims)-1), h), "white")
    for j, im in enumerate(ims): sheet.paste(im, (j*(w+10), 0))
    out = f"{prefix}-sheet-{k//4+1:02d}.png"; sheet.save(out); print(os.path.abspath(out))
