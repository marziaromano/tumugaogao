/* TUMU GAOGAO — renderer + hero slideshow + lightbox.
   Reads SITE and PRODUCTS from data.js. */

(function () {
  "use strict";

  const $ = (s, c) => (c || document).querySelector(s);
  const paragraphs = (t) => t.split("\n\n").map((p) => `<p>${p}</p>`).join("");
  const price = (n) => n + " €";

  /* ---- Header / links ---- */
  $("#hero-tagline").textContent = SITE.tagline;
  $("#nav-ig").href = SITE.instagramUrl;
  $("#shop-ig").href = SITE.instagramUrl;
  $("#footer-name").textContent = "© " + SITE.name;
  const fig = $("#footer-ig");
  fig.href = SITE.instagramUrl;
  fig.textContent = "@" + SITE.instagram;

  /* ---- Hero slideshow ---- */
  const slidesRoot = $("#hero-slides");
  SITE.hero.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = SITE.name;
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
  const cbits = [`Instagram <a href="${SITE.instagramUrl}" target="_blank" rel="noopener">@${SITE.instagram}</a>`];
  if (SITE.email) cbits.unshift(`<a href="mailto:${SITE.email}">${SITE.email}</a>`);
  $("#contact-body").innerHTML =
    "Per acquisti, commissioni o informazioni: " + cbits.join(" · ") + ".";

  /* ---- Products ---- */
  const grid = $("#product-grid");
  // flat list of {src, title, price, sold} for lightbox navigation
  const flat = [];
  PRODUCTS.forEach((p) => {
    const startIdx = flat.length;
    p.images.forEach((src) => flat.push({ src, title: p.title, price: p.price, sold: p.sold }));

    const btn = document.createElement("button");
    btn.className = "card" + (p.sold ? " is-sold" : "");
    btn.dataset.idx = startIdx;
    btn.innerHTML =
      `<div class="thumb">` +
        (p.sold ? `<span class="badge">Sold out</span>` : ``) +
        `<img loading="lazy" src="${p.images[0]}" alt="${p.title} — ${SITE.name}">` +
      `</div>` +
      `<div class="card-info"><span class="card-title">${p.title}</span>` +
      `<span class="card-price">${price(p.price)}</span></div>` +
      (p.images.length > 1 ? `<div class="card-count">${p.images.length} photos</div>` : ``);
    grid.appendChild(btn);
  });

  /* ---- Lightbox ---- */
  const lb = $("#lightbox");
  const lbImg = $(".lb-img", lb);
  const lbCap = $(".lb-caption", lb);
  let current = -1;

  function show(i) {
    if (i < 0) i = flat.length - 1;
    if (i >= flat.length) i = 0;
    current = i;
    const w = flat[i];
    lbImg.src = w.src;
    lbImg.alt = w.title;
    lbCap.innerHTML =
      `${w.title} — <span class="price">${price(w.price)}</span>` +
      (w.sold ? `<span class="sold">Sold out</span>` : ``);
  }
  function open(i) { show(i); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function close() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; current = -1; }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) open(parseInt(card.dataset.idx, 10));
  });
  $(".lb-close", lb).addEventListener("click", close);
  $(".lb-next", lb).addEventListener("click", (e) => { e.stopPropagation(); show(current + 1); });
  $(".lb-prev", lb).addEventListener("click", (e) => { e.stopPropagation(); show(current - 1); });
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb-figure")) close(); });
  document.addEventListener("keydown", (e) => {
    if (current < 0) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "ArrowLeft") show(current - 1);
  });

  /* ---- Mobile nav ---- */
  const toggle = $(".nav-toggle"), nav = $(".site-nav");
  toggle.addEventListener("click", () => {
    const o = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(o));
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });
})();
