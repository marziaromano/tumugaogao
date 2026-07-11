/* TUMU GAOGAO — scheda del singolo pezzo.
   L'indirizzo è prodotto.html?p=<nome-del-pezzo>
   Il pezzo viene cercato in content/prodotti.json: non serve creare
   una pagina nuova quando aggiungi un pezzo dal pannello. */

(function () {
  "use strict";

  const { $, esc, price, paragraphs, path, slug, loadAll, chrome, buyLine, mobileNav, LOCAL_HINT } = TG;

  mobileNav();

  function fail(msg) {
    const err = $("#p-error");
    err.textContent = msg;
    err.hidden = false;
  }

  loadAll()
    .then(({ site, products }) => {
      chrome(site);

      const wanted = new URLSearchParams(location.search).get("p");
      const p = products.find((x) => slug(x.title) === wanted);

      if (!p) {
        fail("Pezzo non trovato. Torna all'elenco delle ceramiche.");
        return;
      }

      const imgs = p.images.map(path);

      document.title = p.title + " — " + (site.name || "TUMU GAOGAO");

      $("#p-title").textContent = p.title;
      $("#p-price").textContent = price(p.price);
      $("#p-badge").hidden = !p.sold;

      $("#p-desc").innerHTML = p.description
        ? paragraphs(p.description)
        : "";

      const buy = $("#p-buy");
      if (p.sold) {
        // Sui pezzi venduti la frase "per acquistare" non ha senso: si invita
        // comunque a scrivere per pezzi simili o su commissione.
        const igUrl = "https://www.instagram.com/" + (site.instagram || "");
        const contatto = site.email
          ? `<a href="mailto:${esc(site.email)}">${esc(site.email)}</a>`
          : `<a href="${igUrl}" target="_blank" rel="noopener">@${esc(site.instagram)}</a>`;
        buy.innerHTML =
          "Questo pezzo è stato venduto. Per pezzi simili o su commissione, scrivi a " +
          contatto + ".";
      } else {
        buy.innerHTML = buyLine(site, true) + ".";
      }

      /* ---- Galleria: foto grande + miniature ---- */
      const main = $("#p-main");
      const thumbs = $("#p-thumbs");
      let current = 0;

      function select(i) {
        current = (i + imgs.length) % imgs.length;
        main.src = imgs[current];
        main.alt = p.title;
        thumbs.querySelectorAll("button").forEach((b, n) =>
          b.classList.toggle("active", n === current)
        );
      }

      imgs.forEach((src, i) => {
        const b = document.createElement("button");
        b.className = "pg-thumb";
        b.innerHTML = `<img loading="lazy" src="${src}" alt="${esc(p.title)} — foto ${i + 1}">`;
        b.addEventListener("click", () => select(i));
        thumbs.appendChild(b);
      });
      if (imgs.length < 2) thumbs.hidden = true;
      select(0);

      $("#product").hidden = false;

      /* ---- Lightbox: la foto grande si apre a schermo intero ---- */
      const lb = $("#lightbox");
      const lbImg = $(".lb-img", lb);
      const lbCap = $(".lb-caption", lb);
      let open = false;

      function draw() {
        lbImg.src = imgs[current];
        lbImg.alt = p.title;
        lbCap.innerHTML =
          `${esc(p.title)} — <span class="price">${price(p.price)}</span>` +
          (p.sold ? `<span class="sold">Sold out</span>` : ``);
      }
      function show() {
        draw();
        open = true;
        lb.classList.add("open");
        lb.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
      function close() {
        open = false;
        lb.classList.remove("open");
        lb.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
      function step(d) { select(current + d); draw(); }

      main.addEventListener("click", show);
      $(".lb-close", lb).addEventListener("click", close);
      $(".lb-next", lb).addEventListener("click", (e) => { e.stopPropagation(); step(1); });
      $(".lb-prev", lb).addEventListener("click", (e) => { e.stopPropagation(); step(-1); });
      lb.addEventListener("click", (e) => {
        if (e.target === lb || e.target.classList.contains("lb-figure")) close();
      });
      document.addEventListener("keydown", (e) => {
        if (!open) return;
        if (e.key === "Escape") close();
        else if (e.key === "ArrowRight") step(1);
        else if (e.key === "ArrowLeft") step(-1);
      });
    })
    .catch((e) => {
      console.error(e);
      fail(LOCAL_HINT);
    });
})();
