/* TUMU GAOGAO — funzioni condivise tra la home e le schede prodotto.
   Non c'è niente da modificare qui per aggiungere un pezzo:
   i contenuti stanno in content/sito.json e content/prodotti.json. */

const TG = (function () {
  "use strict";

  const $ = (s, c) => (c || document).querySelector(s);

  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  const price = (n) => (n || n === 0 ? n + " €" : "");

  const paragraphs = (t) =>
    String(t || "").split(/\n\s*\n/).filter(Boolean)
      .map((p) => `<p>${esc(p)}</p>`).join("");

  // Il pannello può salvare i percorsi con lo slash iniziale: li rendiamo relativi.
  const path = (p) => String(p || "").replace(/^\/+/, "");

  // "Ceramic Mugs · Set of 4" → "ceramic-mugs-set-of-4"
  // È l'indirizzo della pagina del pezzo: prodotto.html?p=ceramic-mugs-set-of-4
  const slug = (t) =>
    String(t || "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  async function loadJson(file) {
    const res = await fetch(file + "?v=" + Date.now());
    if (!res.ok) throw new Error(file + " — " + res.status);
    return res.json();
  }

  function loadAll() {
    return Promise.all([
      loadJson("content/sito.json"),
      loadJson("content/prodotti.json"),
    ]).then(([site, prods]) => ({
      site,
      products: (prods.prodotti || []).filter(
        (p) => p && p.title && (p.images || []).length
      ),
    }));
  }

  /* Intestazione, piè di pagina e link Instagram: uguali su tutte le pagine */
  function chrome(site) {
    const igUrl = "https://www.instagram.com/" + (site.instagram || "");
    const navIg = $("#nav-ig");
    if (navIg) navIg.href = igUrl;
    const fname = $("#footer-name");
    if (fname) fname.textContent = "© " + (site.name || "");
    const fig = $("#footer-ig");
    if (fig) {
      fig.href = igUrl;
      fig.textContent = "@" + (site.instagram || "");
    }
    return igUrl;
  }

  /* Riga "Per acquistare, contatta ..." */
  function buyLine(site, asLink) {
    const igUrl = "https://www.instagram.com/" + (site.instagram || "");
    const note = site.buyNote || "Per acquistare, contatta";
    if (!asLink) {
      const name = site.email ? site.email : "@" + (site.instagram || "");
      return esc(note) + " " + esc(name);
    }
    const link = site.email
      ? `<a href="mailto:${esc(site.email)}">${esc(site.email)}</a>`
      : `<a href="${igUrl}" target="_blank" rel="noopener">@${esc(site.instagram)}</a>`;
    return esc(note) + " " + link;
  }

  /* Menu su mobile */
  function mobileNav() {
    const toggle = $(".nav-toggle"), nav = $(".site-nav");
    if (!toggle || !nav) return;
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
  }

  const LOCAL_HINT =
    "Contenuti non caricati. Se hai aperto il file con un doppio clic dal " +
    "computer è normale: guarda il sito dal link pubblicato.";

  return { $, esc, price, paragraphs, path, slug, loadAll, chrome, buyLine, mobileNav, LOCAL_HINT };
})();
