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
 * Charge une image avec bascule automatique sur les URLs de secours en cas d'erreur
 */
function loadImageWithCandidates(imgElement, key) {
  if (!imgElement || !IMAGES[key]) return;
  const config = IMAGES[key];
  let candidateIndex = 0;

  imgElement.alt = config.alt;

  function tryNext() {
    if (candidateIndex < config.candidates.length) {
      const src = config.candidates[candidateIndex];
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

  loadImageWithCandidates(heroImg, 'hero');
  loadImageWithCandidates(card230Img, 'card230');
  loadImageWithCandidates(harmattanImg, 'harmattan');
  loadImageWithCandidates(portraitImg, 'portrait');

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
