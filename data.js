/*
 * data.js — Single source of truth for the TUMU GAOGAO showcase site.
 * Bios are transcribed verbatim from www.tumugaogao.com (Big Cartel).
 * Products (titles, prices, images, availability) mirror the current shop.
 * This is a static "vetrina" (showcase) — no e-commerce / cart.
 * Edit this file to update content; the page renders from it.
 */

const SITE = {
  name: "TUMU GAOGAO",
  tagline: "Ceramics · Modern primitivism",
  // Live domain (currently on Big Cartel). Add a CNAME file only when you switch.
  domain: "www.tumugaogao.com",
  instagram: "tumu_gaogao",
  instagramUrl: "https://www.instagram.com/tumu_gaogao",
  email: "", // add an email here if you want a mailto link in Contact

  // Rotating hero images (from the original site slideshow)
  hero: ["assets/images/hero_1.jpg", "assets/images/hero_2.jpg", "assets/images/hero_3.jpg"],

  // About — verbatim from the original site
  aboutIt:
    "Artista poliedrico nato a Napoli nel 1992, ha tracciato il suo percorso attraverso diverse " +
    "espressioni artistiche. Inizialmente influenzato dall'astrattismo e dall'informale, ha gradualmente " +
    "esplorato la street art, i graffiti e la pittura murale, introducendo nuovi elementi e codici nel suo " +
    "linguaggio espressivo.\n\n" +
    "Negli ultimi anni il suo interesse indaga anche la ceramica, una nuova frontiera che esplora con " +
    "originalità e passione.\n\n" +
    "Lo stile di Tumu GaoGao si distingue per un primitivismo moderno, dove il segno gestuale e i ritmi " +
    "espressionisti si fondono in una ricerca continua di significato e di connessione con la natura e la " +
    "sfera primordiale/ancestrale. Alla base della ricerca vi è la sintesi, l’anelito del vuoto, il " +
    "desiderio di indagare atmosfere, esseri, e paesaggi appartenenti ad una natura dimenticata e " +
    "incontaminata.\n\n" +
    "Vive e lavora nei Campi Flegrei (Napoli) a stretto contatto con la natura, la spiritualità e le arti marziali.",
  aboutEn:
    "A multidisciplinary artist born in Naples in 1992, Tumu GaoGao has developed his practice across a " +
    "variety of artistic languages. Initially influenced by abstraction and Art Informel, he gradually " +
    "expanded his research into street art, graffiti, and mural painting, introducing new elements and " +
    "visual codes into his expressive vocabulary.\n\n" +
    "In recent years, his exploration has also extended to ceramics, a new medium he approaches with " +
    "originality and passion, opening further possibilities within his artistic investigation.\n\n" +
    "Tumu GaoGao’s work is characterized by a form of modern primitivism, where gestural marks and " +
    "expressionist rhythms converge in an ongoing search for meaning and for a deeper connection with " +
    "nature and the primordial, ancestral sphere. At the core of his research lies a drive toward synthesis, " +
    "a tension toward emptiness, and a desire to evoke atmospheres, beings, and landscapes belonging to a " +
    "forgotten and unspoiled nature.\n\n" +
    "He lives and works in the Campi Flegrei, near Naples, in close contact with nature, spirituality, and " +
    "the practice of martial arts.",
};

const im = (f) => `assets/images/${f}`;

/* Ceramics — { title, price (number, €), sold, images[] } */
const PRODUCTS = [
  { title: "Ceramic Plate #1", price: 180, sold: false, images: ["ceramic-plate_1.jpg", "ceramic-plate_2.jpg"].map(im) },
  { title: "Ceramic Plate #2", price: 180, sold: false, images: ["ceramic-plate-2_1.jpg", "ceramic-plate-2_2.jpg"].map(im) },
  { title: "Ceramic Plate #3", price: 130, sold: false, images: ["ceramic-plate-3_1.jpg", "ceramic-plate-3_2.jpg", "ceramic-plate-3_3.jpg", "ceramic-plate-3_4.jpg"].map(im) },
  { title: "Ceramic Plate #4", price: 150, sold: false, images: ["ceramic-plate-4_1.jpg", "ceramic-plate-4_2.jpg", "ceramic-plate-4_3.jpg", "ceramic-plate-4_4.jpg"].map(im) },
  { title: "Ceramic Plate #5", price: 150, sold: false, images: ["ceramic-plate-5_1.jpg", "ceramic-plate-5_2.jpg", "ceramic-plate-5_3.jpg", "ceramic-plate-5_4.jpg"].map(im) },
  { title: "Ceramic Plate #6", price: 180, sold: false, images: ["ceramic-plate-6_1.jpg", "ceramic-plate-6_2.jpg", "ceramic-plate-6_3.jpg", "ceramic-plate-6_4.jpg"].map(im) },
  { title: "Ceramic Plate #7", price: 180, sold: true, images: ["ceramic-plate-7_1.jpg", "ceramic-plate-7_2.jpg", "ceramic-plate-7_3.jpg"].map(im) },
  { title: "Ceramic Plate #8", price: 180, sold: true, images: ["ceramic-plate-8_1.jpg", "ceramic-plate-8_2.jpg", "ceramic-plate-8_3.jpg"].map(im) },
  { title: "Ceramic Plate #9", price: 100, sold: true, images: ["ceramic-plate-9_1.jpg", "ceramic-plate-9_2.jpg", "ceramic-plate-9_3.jpg"].map(im) },
  { title: "Ceramic Plate #10", price: 160, sold: true, images: ["ceramic-plate-10_1.jpg"].map(im) },
  { title: "Ceramic Plate #11", price: 160, sold: true, images: ["ceramic-plate-11_1.jpg", "ceramic-plate-11_2.jpg"].map(im) },
  { title: "Ceramic Bowl #1", price: 50, sold: true, images: ["ceramic-bowl-1_1.jpg", "ceramic-bowl-1_2.jpg", "ceramic-bowl-1_3.jpg"].map(im) },
  { title: "Ceramic Mugs · Set of 4", price: 160, sold: true, images: ["ceramic-mugs-set-of-4_1.jpg", "ceramic-mugs-set-of-4_2.jpg", "ceramic-mugs-set-of-4_3.jpg", "ceramic-mugs-set-of-4_4.jpg", "ceramic-mugs-set-of-4_5.jpg"].map(im) },
  { title: "Ceramic Mugs · Set of 6", price: 210, sold: true, images: ["ceramic-mugs-set-of-6_1.jpg", "ceramic-mugs-set-of-6_2.jpg", "ceramic-mugs-set-of-6_3.jpg", "ceramic-mugs-set-of-6_4.jpg", "ceramic-mugs-set-of-6_5.jpg"].map(im) },
  { title: "Ceramic Shot Glasses · Set of 6", price: 100, sold: true, images: ["ceramic-shot-glasses-set-of-6_1.jpg", "ceramic-shot-glasses-set-of-6_2.jpg"].map(im) },
];
