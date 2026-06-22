# TUMU GAOGAO — anteprima sito vetrina

Versione statica (solo vetrina, **senza e-commerce**) del sito
[www.tumugaogao.com](https://www.tumugaogao.com), pensata come alternativa
all'abbonamento Big Cartel quando non serve la vendita online diretta.

Contenuti (bio IT/EN, titoli, prezzi, immagini delle ceramiche) ripresi dal
sito Big Cartel attuale.

## ⚠️ Anteprima: il dominio NON viene toccato

Questo repo si pubblica su un **URL temporaneo** (es. GitHub Pages / Netlify).
`www.tumugaogao.com` resta puntato a Big Cartel finché non si decide di spostarlo.
Per questo **non c'è un file `CNAME`**: va aggiunto solo al momento del passaggio
vero (vedi sotto).

## Struttura

```
.
├── assets/images/   # immagini ceramiche + slideshow
├── data.js          # ← unica fonte: bio, prodotti, prezzi, link
├── index.html
├── script.js        # render + slideshow + lightbox
├── style.css
├── README.md
└── .nojekyll
```

## Anteprima online (senza toccare il dominio)

**Opzione A — GitHub Pages**
1. Crea un repo su GitHub e carica questi file (branch `main`).
2. Settings → Pages → Source: `Deploy from a branch`, branch `main`, `/ (root)`.
3. URL pubblico: `https://<username>.github.io/<nome-repo>/` → da condividere.

**Opzione B — Netlify (drag & drop)**
- Trascina questa cartella su https://app.netlify.com/drop → URL `*.netlify.app` immediato.

## Anteprima locale

```bash
cd tumugaogao-preview
python3 -m http.server 8000
# http://localhost:8000
```

## Modificare i contenuti

Tutto in **`data.js`**: bio (`aboutIt` / `aboutEn`), immagini hero, ed elenco
`PRODUCTS` (titolo, prezzo, `sold: true/false`, immagini). Per aggiungere foto:
mettile in `assets/images/` e referenziale nel prodotto.

## Quando (e se) si passa al dominio vero

1. Crea un file `CNAME` con dentro: `www.tumugaogao.com`
2. Disattiva il dominio su Big Cartel.
3. Dal registrar del dominio: CNAME `www` → `<username>.github.io`
   (+ record A per l'apex verso gli IP di GitHub Pages: 185.199.108–111.153).
4. GitHub → Settings → Pages → Custom domain → conferma + Enforce HTTPS.

Passaggio reversibile: se non convince, si ripunta il dominio a Big Cartel.

## Nota sulla pagina "Walls"

Sul sito originale la sezione **Walls** (murales) è al momento vuota, quindi qui
non è inclusa. Se servono i murales, mandami le foto e aggiungo la sezione.
