/* TUMU GAOGAO — renderer + hero slideshow + lightbox.
   I contenuti arrivano da content/sito.json e content/prodotti.json,
   i due file che il pannello (Pages CMS) modifica al posto tuo.
   Non serve toccare questo file per aggiungere un pezzo. */

(function () {
  "use strict";

  const $ = (s, c) => (c || document).querySelector(s);
  const price = (n) => (n || n === 0 ? n + " €" : "");
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  const paragraphs = (t) =>
    String(t || "").split(/\n\s*\n/).map((p) => `<p>${esc(p)}</p>`).join("");

  // Il CMS può salvare i percorsi con lo slash iniziale ("/assets/...").
  // Qui li rendiamo sempre relativi, così funzionano sia su
  // username.github.io/tumugaogao/ sia sul dominio vero.
  const path = (p) => String(p || "").replace(/^\/+/, "");

  async function load(file) {
    const res = await fetch(file + "?v=" + Date.now());
    if (!res.ok) throw new Error(file + " — " + res.status);
    return res.json();
  }

  function fail(err) {
    console.error(err);
    const grid = $("#product-grid");
    if (grid) {
      grid.innerHTML =
        '<p class="load-error">Contenuti non caricati. ' +
        "Se stai aprendo il file con un doppio clic dal computer, è normale: " +
        "guarda il sito dal link pubblicato (GitHub Pages).</p>";
    }
  }

  function render(SITE, PRODUCTS) {
    /* ---- Header / links ---- */
    const igUrl = "https://www.instagram.com/" + (SITE.instagram || "");
    $("#hero-tagline").textContent = SITE.tagline || "";
    $("#nav-ig").href = igUrl;
    $("#shop-ig").href = igUrl;
    $("#footer-name").textContent = "© " + (SITE.name || "");
    const fig = $("#footer-ig");
    fig.href = igUrl;
    fig.textContent = "@" + (SITE.instagram || "");

    /* ---- Hero slideshow ---- */
    const slidesRoot = $("#hero-slides");
    (SITE.hero || []).forEach((src, i) => {
      const img = document.createElement("img");
      img.src = path(src);
      img.alt = SITE.name || "";
      if (i === 0) img.className = "active";
      slidesRoot.appendChild(img);
    });
    const slides = slidesRoot.querySelectorAll("img");
    if (slides.length > 1) {
      let cur = 0;
      setInterval(() => {
        slides[cur].classList.remove("active");
        cur = (cur + 1) % slides.length;
        slides[cur].classList.add("active");
      }, 4500);
    }

    /* ---- About ---- */
    $("#about-it").innerHTML = "<h3>Italiano</h3>" + paragraphs(SITE.aboutIt);
    $("#about-en").innerHTML = "<h3>English</h3>" + paragraphs(SITE.aboutEn);

    /* ---- Contact ---- */
    const bits = [
      `Instagram <a href="${igUrl}" target="_blank" rel="noopener">@${esc(SITE.instagram)}</a>`,
    ];
    if (SITE.email) {
      bits.unshift(`<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`);
    }
    const note = SITE.contactNote || "Per ordini e informazioni:";
    $("#contact-body").innerHTML = esc(note) + " " + bits.join(" · ");

    /* ---- Riga "per acquistare" mostrata sotto ogni pezzo disponibile ---- */
    const buyNote = SITE.buyNote || "Per acquistare, contatta";
    const contactName = SITE.email ? SITE.email : "@" + (SITE.instagram || "");
    const contactLink = SITE.email
      ? `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`
      : `<a href="${igUrl}" target="_blank" rel="noopener">@${esc(SITE.instagram)}</a>`;
    // Sulla card il testo è semplice: la card è un pulsante, un link dentro
    // un pulsante non si comporta bene. Nel lightbox invece è cliccabile.
    const buyLineText = `${esc(buyNote)} ${esc(contactName)}`;
    const buyLineLink = `${esc(buyNote)} ${contactLink}`;

    /* ---- Products ---- */
    const grid = $("#product-grid");
    grid.innerHTML = "";
    const flat = []; // elenco piatto per la navigazione nel lightbox

    PRODUCTS.filter((p) => p && p.title && (p.images || []).length).forEach((p) => {
      const imgs = p.images.map(path);
      const startIdx = flat.length;
      imgs.forEach((src) =>
        flat.push({
          src, title: p.title, price: p.price,
          sold: !!p.sold, description: p.description || "",
        })
      );

      const btn = document.createElement("button");
      btn.className = "card" + (p.sold ? " is-sold" : "");
      btn.dataset.idx = startIdx;
      btn.innerHTML =
        `<div class="thumb">` +
          (p.sold ? `<span class="badge">Sold out</span>` : ``) +
          `<img loading="lazy" src="${imgs[0]}" alt="${esc(p.title)} — ${esc(SITE.name)}">` +
        `</div>` +
        `<div class="card-info"><span class="card-title">${esc(p.title)}</span>` +
        `<span class="card-price">${price(p.price)}</span></div>` +
        (p.description ? `<p class="card-desc">${esc(p.description)}</p>` : ``) +
        (imgs.length > 1 ? `<div class="card-count">${imgs.length} photos</div>` : ``) +
        (p.sold ? `` : `<p class="card-buy">${buyLineText}</p>`);
      grid.appendChild(btn);
    });

    /* ---- Lightbox ---- */
    const lb = $("#lightbox");
    const lbImg = $(".lb-img", lb);
    const lbCap = $(".lb-caption", lb);
    let current = -1;

    function show(i) {
      if (!flat.length) return;
      if (i < 0) i = flat.length - 1;
      if (i >= flat.length) i = 0;
      current = i;
      const w = flat[i];
      lbImg.src = w.src;
      lbImg.alt = w.title;
      lbCap.innerHTML =
        `${esc(w.title)} — <span class="price">${price(w.price)}</span>` +
        (w.sold ? `<span class="sold">Sold out</span>` : ``) +
        (w.description ? `<span class="lb-desc">${esc(w.description)}</span>` : ``) +
        (w.sold ? `` : `<span class="lb-buy">${buyLineLink}</span>`);
    }
    function open(i) {
      show(i);
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      current = -1;
    }

    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if (card) open(parseInt(card.dataset.idx, 10));
    });
    $(".lb-close", lb).addEventListener("click", close);
    $(".lb-next", lb).addEventListener("click", (e) => { e.stopPropagation(); show(current + 1); });
    $(".lb-prev", lb).addEventListener("click", (e) => { e.stopPropagation(); show(current - 1); });
    lb.addEventListener("click", (e) => {
      if (e.target === lb || e.target.classList.contains("lb-figure")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (current < 0) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(current + 1);
      else if (e.key === "ArrowLeft") show(current - 1);
    });
  }

  /* ---- Mobile nav (non dipende dai contenuti) ---- */
  const toggle = $(".nav-toggle"), nav = $(".site-nav");
  toggle.addEventListener("click", () => {
    const o = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(o));
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---- Avvio ---- */
  Promise.all([load("content/sito.json"), load("content/prodotti.json")])
    .then(([site, prods]) => render(site, prods.prodotti || []))
    .catch(fail);
})();
