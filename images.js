/**
 * VELOURA — images.js
 * Gestion des médias, URLs Unsplash et politique de fallback résiliente
 */

const IMAGES = {
  hero: {
    candidates: [
      'https://images.unsplash.com/photo-1556821862-4b3fe13a6ce6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587003866373-7ab55655b099?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80'
    ],
    alt: 'Silhouette de dos en veste oversize sombre VELOURA sur fond clair de studio'
  },
  card230: {
    candidates: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Portrait en casquette noire, éclairage feutré monochrome'
  },
  harmattan: {
    candidates: [
      'https://images.unsplash.com/photo-1759719440814-bbb8cc5422c4?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1787424325609-c1c8e188b00d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Capsule Harmattan, silhouette textile abstraite en mouvement monochrome'
  },
  portrait: {
    candidates: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
    ],
    alt: 'Profil de côté en t-shirt blanc minimaliste VELOURA'
  },
  avatars: [
    {
      name: 'Aïcha',
      initial: 'A',
      url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=240&h=240&crop=faces&q=80'
    },
    {
      name: 'Rodrigue',
      initial: 'R',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&h=240&crop=faces&q=80'
    },
    {
      name: 'Mireille',
      initial: 'M',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&crop=faces&q=80'
    },
    {
      name: 'Koffi',
      initial: 'K',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&crop=faces&q=80'
    },
    {
      name: 'Fadel',
      initial: 'F',
      url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=240&h=240&crop=faces&q=80'
    },
    {
      name: 'Sena',
      initial: 'S',
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&h=240&crop=faces&q=80'
    },
    {
      name: 'Chloé',
      initial: 'C',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&h=240&crop=faces&q=80'
    },
    {
      name: 'Arnaud',
      initial: 'A',
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=240&h=240&crop=faces&q=80'
    }
  ]
};

/**
 * Catalogue complet des pièces du Lookbook Carrousel
 */
const LOOKBOOK_PIECES = [
  {
    id: 'look-1',
    ref: 'VEL-01',
    title: 'Veste Tailoring Oversize Japonaise',
    category: 'vestes',
    categoryLabel: 'Vestes & Tailoring',
    size: 'Taille L (coupe boxy)',
    price: 28500,
    priceFormatted: '28 500 FCFA',
    oldPrice: 36000,
    oldPriceFormatted: '36 000 FCFA',
    savings: '7 500 FCFA',
    edition: 'Pièce unique (1/1)',
    badge: 'Pièce maîtresse',
    tagline: 'Laine vierge peignée 420g/m² & tombé d’épaule fluide',
    description: 'Chinée avec soin au port de Cotonou, entièrement désinfectée et restaurée. Une coupe architecturale japonaise avec épaules déstructurées, idéale pour les soirées fraîches à Fidjrossè ou Haie Vive.',
    bullets: [
      'Tombé fluide naturel sans rigidité artificielle',
      'Doublure satinée respirante et coutures renforcées',
      'Boutons corne d’origine polis à la main'
    ],
    deliveryNote: 'Commandez aujourd’hui : livrée sous 24 h à Cotonou et Calavi',
    candidates: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80'
    ],
    thumb: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'look-2',
    ref: 'VEL-02',
    title: 'Blouson Bombardier Cuir Patiné ’94',
    category: 'vestes',
    categoryLabel: 'Vestes & Tailoring',
    size: 'Taille M/L (ajustement régulier)',
    price: 34000,
    priceFormatted: '34 000 FCFA',
    oldPrice: 45000,
    oldPriceFormatted: '45 000 FCFA',
    savings: '11 000 FCFA',
    edition: 'Pièce unique (1/1)',
    badge: 'Archive vintage',
    tagline: 'Cuir pleine fleur patiné & fermeture zip YKK laiton lourd',
    description: 'Cuir véritable ayant traversé 30 ans avec une patine naturelle satinée. Nourri au baume végétal local, il protège des embruns marins tout en affirmant une présence brute.',
    bullets: [
      'Cuir épais et souple, patine authentique sans accroc',
      'Bords-côtes poignets et bas intacts, zip laiton fluide',
      'Deux poches profondes doublées polaire légère'
    ],
    deliveryNote: 'Livraison avec essayage immédiat devant le livreur',
    candidates: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80'
    ],
    thumb: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'look-3',
    ref: 'VEL-03',
    title: 'Denim Selvedge Raw Cut ’Heavy Wash’',
    category: 'streetwear',
    categoryLabel: 'Streetwear & Denim',
    size: 'Taille W32 L32 (ourlet droit)',
    price: 19500,
    priceFormatted: '19 500 FCFA',
    oldPrice: 26000,
    oldPriceFormatted: '26 000 FCFA',
    savings: '6 500 FCFA',
    edition: 'Pièce unique (1/1)',
    badge: 'Toile japonaise',
    tagline: 'Toile selvedge 14.5 oz liseré rouge & délavage artisanal',
    description: 'Toile en pur coton lourd non stretch au tissage serré. Déjà rodé pour un confort immédiat, avec un contraste naturel aux plis de hanches et aux genoux.',
    bullets: [
      'Liseré rouge selvedge authentique sur revers de cheville',
      'Rivets cuivre martelés main et coutures point de chaînette',
      'Ne rétrécit pas au lavage écologique'
    ],
    deliveryNote: 'Échange de taille sans frais si essayage non concluant',
    candidates: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80'
    ],
    thumb: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'look-4',
    ref: 'VEL-04',
    title: 'Trench Minimaliste Ceinturé Noir Nuit',
    category: 'vestes',
    categoryLabel: 'Vestes & Tailoring',
    size: 'Taille Unisexe Oversize (M à XL)',
    price: 32000,
    priceFormatted: '32 000 FCFA',
    oldPrice: 42000,
    oldPriceFormatted: '42 000 FCFA',
    savings: '10 000 FCFA',
    edition: 'Pièce unique (1/1)',
    badge: 'Silhouette signature',
    tagline: 'Gabardine déperlante & ceinture à boucle noir mat',
    description: 'Une coupe fluide descendant sous le genou. Se porte ouvert avec amplitude ou ceinturé pour structurer la taille avec élégance sobre.',
    bullets: [
      'Traitement déperlant contre les averses côtières soudaines',
      'Grande fente d’aisance dorsale pour une démarche ample',
      'Poches passepoilées généreuses à rabat intérieur'
    ],
    deliveryNote: 'Livré sur cintre protecteur avec housse textile',
    candidates: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    thumb: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'look-5',
    ref: 'VEL-05',
    title: 'Hoodie Boxy Heavyweight Washed Black',
    category: 'streetwear',
    categoryLabel: 'Streetwear & Denim',
    size: 'Taille XL (coupe boxy courte)',
    price: 17500,
    priceFormatted: '17 500 FCFA',
    oldPrice: 23000,
    oldPriceFormatted: '23 000 FCFA',
    savings: '5 500 FCFA',
    edition: 'Pièce unique (1/1)',
    badge: 'Streetwear pur',
    tagline: 'Molleton 480 g/m² & capuche double épaisseur sans cordon',
    description: 'Coupe large et raccourcie inspirée du streetwear contemporain. Lavage minéral noir délavé, tombé lourd qui ne se déforme jamais.',
    bullets: [
      'Capuche rigide qui tient naturellement droite',
      'Coutures plates renforcées triple fil',
      'Aucun logo visible, silhouette 100 % épurée'
    ],
    deliveryNote: 'Paiement à la livraison après examen du molleton',
    candidates: [
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80'
    ],
    thumb: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'look-6',
    ref: 'VEL-06',
    title: 'Sacoche Bandoulière Cuir Brut & Quincaillerie Noire',
    category: 'accessoires',
    categoryLabel: 'Accessoires & Cuir',
    size: 'Format compact 24 × 18 × 7 cm',
    price: 14500,
    priceFormatted: '14 500 FCFA',
    oldPrice: 19000,
    oldPriceFormatted: '19 000 FCFA',
    savings: '4 500 FCFA',
    edition: 'Pièce unique (1/1)',
    badge: 'Accessoire cuir',
    tagline: 'Cuir épais ciré & sangle nylon balistique haute tension',
    description: 'Le compagnon parfait pour circuler à Cotonou : compacte, ultra-sécurisée avec double fermeture magnétique et zip dissimulé.',
    bullets: [
      'Cuir résistant aux rayures, finitions bords francs cirés',
      'Sangle réglable avec mousquetons métalliques noir mat',
      'Poche arrière discrète spéciale smartphone et passeport'
    ],
    deliveryNote: 'Emballée dans un pochon en coton écru réutilisable',
    candidates: [
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    thumb: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=300&q=80'
  }
];

/**
 * Charge une image avec bascule automatique sur les URLs de secours en cas d'erreur
 */
function loadImageWithCandidates(imgElement, candidates, altText) {
  if (!imgElement || !candidates || !candidates.length) return;
  let candidateIndex = 0;

  if (altText) {
    imgElement.alt = altText;
  }

  function tryNext() {
    if (candidateIndex < candidates.length) {
      const src = candidates[candidateIndex];
      candidateIndex++;
      imgElement.src = src;
    } else {
      // Toutes les URLs ont échoué : fond dégradé gris sans casser la mise en page
      imgElement.style.display = 'none';
      if (imgElement.parentElement) {
        imgElement.parentElement.classList.add('has-fallback-gradient');
      }
    }
  }

  imgElement.onerror = tryNext;
  tryNext();
}

/**
 * Initialise le chargement de toutes les photos et avatars
 */
function initImages() {
  const heroImg = document.getElementById('hero-img');
  const card230Img = document.getElementById('card230-img');
  const harmattanImg = document.getElementById('harmattan-img');
  const portraitImg = document.getElementById('portrait-img');

  if (heroImg && IMAGES.hero) {
    loadImageWithCandidates(heroImg, IMAGES.hero.candidates, IMAGES.hero.alt);
  }
  if (card230Img && IMAGES.card230) {
    loadImageWithCandidates(card230Img, IMAGES.card230.candidates, IMAGES.card230.alt);
  }
  if (harmattanImg && IMAGES.harmattan) {
    loadImageWithCandidates(harmattanImg, IMAGES.harmattan.candidates, IMAGES.harmattan.alt);
  }
  if (portraitImg && IMAGES.portrait) {
    loadImageWithCandidates(portraitImg, IMAGES.portrait.candidates, IMAGES.portrait.alt);
  }

  // Avatars
  const avatarElements = document.querySelectorAll('.avatar-slot');
  avatarElements.forEach((container, idx) => {
    const avatarData = IMAGES.avatars[idx];
    if (!avatarData) return;

    const img = document.createElement('img');
    img.className = 'avatar-img';
    img.alt = `Client ${avatarData.name}`;
    img.loading = 'lazy';

    img.onerror = function () {
      img.remove();
      const fallback = document.createElement('div');
      fallback.className = 'avatar-fallback';
      fallback.textContent = avatarData.initial;
      container.appendChild(fallback);
    };

    img.src = avatarData.url;
    container.innerHTML = '';
    container.appendChild(img);
  });
}

// Initialisation dès que le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initImages);
} else {
  initImages();
}
