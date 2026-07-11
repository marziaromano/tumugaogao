# TUMU GAOGAO — come si gestisce il sito

Sito vetrina statico (niente carrello, niente abbonamenti).
I contenuti si modificano da un pannello, senza toccare il codice.

---

## Una volta sola: mettere online il sito

1. Carica tutti i file nel repository GitHub (dal browser: **Add file → Upload files**).
2. Repository → **Settings** → **Pages**
3. Source: *Deploy from a branch* → branch `main` → cartella `/ (root)` → **Save**
4. Dopo 1-2 minuti il sito è online su
   `https://<tuo-utente>.github.io/tumugaogao/`

## Una volta sola: attivare il pannello

1. Vai su **app.pagescms.org** ed entra con l'account GitHub
2. Autorizza l'accesso al repository `tumugaogao`
3. Il pannello legge il file `.pages.yml` e mostra due sezioni:
   **Ceramiche** e **Impostazioni sito**

---

## Aggiungere un pezzo (la cosa che farai sempre)

1. Apri il pannello → **Ceramiche**
2. **+ Add item** in fondo alla lista
3. Compila i campi:
   - **Titolo** — il nome del pezzo
   - **Prezzo (€)** — solo il numero, es. `150`
   - **Descrizione** — facoltativa (misure, materiale, tecnica...)
   - **Venduto** — spunta solo se è già stato venduto
   - **Foto** — trascina una o più immagini; la prima è quella della griglia
4. **Save**

Il sito si aggiorna da solo dopo circa un minuto. Nessun codice, nessuna virgola
da azzeccare. Le foto vengono caricate in `assets/images/` automaticamente.

## Segnare un pezzo come venduto

Pannello → **Ceramiche** → apri il pezzo → spunta **Venduto** → **Save**.
Sulla foto comparirà la fascetta "Sold out".

## La riga "per acquistare, contatta..."

Sotto ogni pezzo **non venduto** compare in automatico l'invito a contattare.
Il testo si cambia in **Impostazioni sito** → *Testo sotto ogni pezzo*.

Il contatto mostrato è l'**email** se l'hai compilata in Impostazioni sito,
altrimenti l'**Instagram**. Sui pezzi già venduti la riga non compare.

## Cambiare bio, contatti, foto dello slideshow

Pannello → **Impostazioni sito**. Se metti un'email nel campo *Email*, comparirà
anche nella sezione Contatti.

---

## Come è fatto (per riferimento)

```
.pages.yml            → configurazione del pannello
content/sito.json     → bio, contatti, slideshow      ← lo modifica il pannello
content/prodotti.json → elenco dei pezzi              ← lo modifica il pannello
assets/images/        → tutte le foto                 ← ci carica il pannello
index.html            → home (griglia dei pezzi)
prodotto.html         → scheda di UN pezzo (una sola, valida per tutti)
common.js             → funzioni condivise dalle due pagine
script.js             → disegna la home
prodotto.js           → disegna la scheda del pezzo
style.css             → grafica
```

**Le schede dei pezzi:** ogni pezzo ha la sua pagina, all'indirizzo
`prodotto.html?p=<titolo-del-pezzo>` (es. `prodotto.html?p=ceramic-plate-3`).
Non devi crearla: esiste una sola `prodotto.html` che si riempie da sola in base
al pezzo su cui si clicca. Aggiungi un pezzo dal pannello → la sua pagina c'è già,
ed è un link condivisibile (puoi mandarlo su WhatsApp o metterlo nelle storie).

⚠️ Se **cambi il titolo** di un pezzo, cambia anche l'indirizzo della sua pagina:
i link vecchi non funzioneranno più. Con un pezzo nuovo non è un problema.

**Nota:** aprendo `index.html` con un doppio clic dal computer i contenuti non
si caricano (è una limitazione dei browser sui file locali). Guarda sempre il
sito dal link pubblicato.

## Passare al dominio vero (quando siete convinti)

1. Crea nel repository un file chiamato `CNAME` contenente una sola riga:
   `www.tumugaogao.com`
2. Su Namecheap: record `CNAME` per `www` → `<tuo-utente>.github.io`
   (+ record `A` per il dominio senza www verso gli IP di GitHub Pages:
   185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
3. Togli il dominio da Big Cartel
4. GitHub → Settings → Pages → *Custom domain* → conferma + **Enforce HTTPS**
5. Solo a questo punto: disdici l'abbonamento Big Cartel

Reversibile: se qualcosa non va, ripunti il dominio a Big Cartel.
