# Abertura do vídeo: o monitor bate cada vez mais devagar, zera, fica no som contínuo de
# "sem batimento" e só então começa a narração. Depois de "aparelhos" volta um batimento fraco.
# Gera intro.js (instantes usados pelo video.html) e narracao/narracao-final.wav (bipes + narração
# com EQ de notícia, atrasada pela abertura). Rode depois de tempos.mjs e do EQ:
#   python intro_audio.py
import json, math, wave, array, pathlib

PASTA = pathlib.Path(__file__).parent
INTRO = 4.6                         # segundos de abertura antes da narração começar
BATIDAS = [0.35, 1.15, 2.1, 3.25]   # bipes da abertura, cada vez mais espaçados
VALORES = [62, 41, 23, 9]           # número do monitor depois de cada bipe
RETA = [3.85, INTRO + 0.35]         # som contínuo de "sem batimento"
INTERVALO_FRACO = 1.6               # batimento fraco depois de "aparelhos"

# instantes da narração (tempos.js é gerado pelo tempos.mjs)
s = (PASTA / 'tempos.js').read_text(encoding='utf-8')
tempos = json.loads(s[s.index('{'):s.rindex('}') + 1])
c1 = tempos['cenas'][0]
apar = next(p['t0'] for p in c1['palavras'] if p['txt'].lower().startswith('aparelhos')) + INTRO
pos = []
b = apar + 0.25
while b < c1['fim'] + INTRO - 0.3:
    pos.append(round(b, 3)); b += INTERVALO_FRACO

cfg = {'intro': INTRO, 'batidas': BATIDAS, 'valores': VALORES, 'reta': RETA, 'posBatidas': pos}
(PASTA / 'intro.js').write_text('// Gerado por intro_audio.py. Não edite à mão.\nwindow.INTRO_CFG = ' + json.dumps(cfg) + '\n', encoding='utf-8')

with wave.open(str(PASTA / 'narracao' / 'narracao-noticia.wav'), 'rb') as w:
    taxa, canais, larg = w.getframerate(), w.getnchannels(), w.getsampwidth()
    voz = array.array('h', w.readframes(w.getnframes()))
assert canais == 1 and larg == 2

total = int(INTRO * taxa) + len(voz)
mix = [0.0] * total


def tom(ini, dur, vol, freq=1000.0, ataque=0.008, saida=0.04):
    a = int(ini * taxa)
    for i in range(int(dur * taxa)):
        if a + i >= total:
            break
        t = i / taxa
        env = min(1.0, t / ataque) * min(1.0, (dur - t) / saida)
        mix[a + i] += vol * env * math.sin(2 * math.pi * freq * t)


for b in BATIDAS:
    tom(b, 0.14, 0.24)
tom(RETA[0], RETA[1] - RETA[0], 0.13, saida=0.4)
for b in pos:
    tom(b, 0.11, 0.07)

d = int(INTRO * taxa)
for i, v in enumerate(voz):
    mix[d + i] += v / 32768.0

out = array.array('h', (max(-32767, min(32767, int(x * 32767))) for x in mix))
with wave.open(str(PASTA / 'narracao' / 'narracao-final.wav'), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(taxa)
    w.writeframes(out.tobytes())
print(f'narracao-final.wav: {total / taxa:.2f} s · batimentos fracos: {pos}')
