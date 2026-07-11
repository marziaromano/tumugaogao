/* TUMU GAOGAO — home page.
   Ogni pezzo della griglia è un link alla sua scheda: prodotto.html?p=<nome>
   I contenuti arrivano da content/sito.json e content/prodotti.json. */

(function () {
  "use strict";

  const { $, esc, price, paragraphs, path, slug, loadAll, chrome, buyLine, mobileNav, LOCAL_HINT } = TG;

  mobileNav();

  loadAll()
    .then(({ site, products }) => {
      const igUrl = chrome(site);

      /* ---- Hero ---- */
      $("#hero-tagline").textContent = site.tagline || "";
      $("#shop-ig").href = igUrl;

      const slidesRoot = $("#hero-slides");
      (site.hero || []).forEach((src, i) => {
        const img = document.createElement("img");
        img.src = path(src);
        img.alt = site.name || "";
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
      $("#about-it").innerHTML = "<h3>Italiano</h3>" + paragraphs(site.aboutIt);
      $("#about-en").innerHTML = "<h3>English</h3>" + paragraphs(site.aboutEn);

      /* ---- Contatti ---- */
      const bits = [
        `Instagram <a href="${igUrl}" target="_blank" rel="noopener">@${esc(site.instagram)}</a>`,
      ];
      if (site.email) {
        bits.unshift(`<a href="mailto:${esc(site.email)}">${esc(site.email)}</a>`);
      }
      const note = site.contactNote || "Per ordini e informazioni:";
      $("#contact-body").innerHTML = esc(note) + " " + bits.join(" · ");

      /* ---- Griglia dei pezzi ---- */
      const grid = $("#product-grid");
      grid.innerHTML = "";
      const buyText = buyLine(site, false); // testo semplice: la card è già un link

      products.forEach((p) => {
        const imgs = p.images.map(path);
        const a = document.createElement("a");
        a.className = "card" + (p.sold ? " is-sold" : "");
        a.href = "prodotto.html?p=" + encodeURIComponent(slug(p.title));
        a.innerHTML =
          `<div class="thumb">` +
            (p.sold ? `<span class="badge">Sold out</span>` : ``) +
            `<img loading="lazy" src="${imgs[0]}" alt="${esc(p.title)} — ${esc(site.name)}">` +
          `</div>` +
          `<div class="card-info"><span class="card-title">${esc(p.title)}</span>` +
          `<span class="card-price">${price(p.price)}</span></div>` +
          (imgs.length > 1 ? `<div class="card-count">${imgs.length} photos</div>` : ``) +
          (p.sold ? `` : `<p class="card-buy">${buyText}</p>`);
        grid.appendChild(a);
      });
    })
    .catch((e) => {
      console.error(e);
      const grid = $("#product-grid");
      if (grid) grid.innerHTML = `<p class="load-error">${LOCAL_HINT}</p>`;
    });
})();
