/**
 * VELOURA — script.js
 * Toutes les interactions et les 17 animations requises
 */

// Détection des modes particuliers
const urlParams = new URLSearchParams(window.location.search);
const IS_RECORD_MODE = urlParams.get('rec') === '1';
const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Texte exact du manifeste selon le prompt
const MANIFESTO_TEXT = 
  "Nous croyons que le meilleur style se construit pièce par pièce, pas par effet de mode. Chaque article est choisi pour se faire remarquer, durer et raconter une histoire.";

/**
 * Utilitaires mathématiques & animations
 */
function easeOutQuad(t) {
  return t * (2 - t);
}

function easeOutCubic(t) {
  return (--t) * t * t + 1;
}

function interpolateRgb(rgb1, rgb2, factor) {
  const f = Math.max(0, Math.min(1, factor));
  const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * f);
  const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * f);
  const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * f);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Animation générique de compteur numérique
 */
function animateCounter(element, target, duration = 1400, suffix = '+') {
  if (!element) return;
  if (PREFERS_REDUCED_MOTION) {
    element.textContent = `${target}${suffix}`;
    return;
  }

  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const current = Math.floor(eased * target);

    element.textContent = `${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = `${target}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

/**
 * ANIMATION 1 : Titre PURE STYLE hors de son masque (Web Animations API)
 */
function animateHeroTitle() {
  const line1 = document.querySelector('.title-line-1');
  const line2 = document.querySelector('.title-line-2');
  if (!line1 || !line2) return;

  if (PREFERS_REDUCED_MOTION) {
    line1.style.transform = 'translateY(0)';
    line2.style.transform = 'translateY(0)';
    return;
  }

  line1.animate(
    [
      { transform: 'translateY(110%)', opacity: 0 },
      { transform: 'translateY(0%)', opacity: 1 }
    ],
    {
      duration: 1000,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards'
    }
  );

  line2.animate(
    [
      { transform: 'translateY(110%)', opacity: 0 },
      { transform: 'translateY(0%)', opacity: 1 }
    ],
    {
      duration: 1000,
      delay: 110,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards'
    }
  );
}

/**
 * ANIMATION 2 : Photo du hero monte de 40px, se dé-floute et fondu (1.3 s)
 */
function animateHeroPhoto() {
  const photoWrapper = document.getElementById('hero-photo-wrapper');
  const photoImg = document.getElementById('hero-img');
  if (!photoWrapper || !photoImg) return;

  if (PREFERS_REDUCED_MOTION) {
    photoWrapper.style.transform = 'translateY(0)';
    photoImg.style.opacity = '1';
    photoImg.style.filter = 'grayscale(1) contrast(1.08) brightness(1.06) blur(0px)';
    return;
  }

  photoWrapper.animate(
    [
      { transform: 'translateY(40px)' },
      { transform: 'translateY(0px)' }
    ],
    {
      duration: 1300,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards'
    }
  );

  photoImg.animate(
    [
      {
        opacity: 0,
        filter: 'grayscale(1) contrast(1.08) brightness(1.06) blur(20px)'
      },
      {
        opacity: 1,
        filter: 'grayscale(1) contrast(1.08) brightness(1.06) blur(0px)'
      }
    ],
    {
      duration: 1300,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards'
    }
  );
}

/**
 * ANIMATION 3 : Nav pilule descend en place
 */
function animateNavEntrance() {
  const navPill = document.getElementById('nav-pill');
  if (!navPill) return;

  if (PREFERS_REDUCED_MOTION) {
    navPill.style.transform = 'translateY(0)';
    navPill.style.opacity = '1';
    return;
  }

  navPill.animate(
    [
      { transform: 'translateY(-24px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ],
    {
      duration: 850,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards'
    }
  );
}

/**
 * ANIMATION 4 : Tous les autres éléments du hero montent de 14px et apparaissent en fondu
 */
function animateHeroOtherElements() {
  const items = document.querySelectorAll('.hero-fade-item');
  if (!items.length) return;

  if (PREFERS_REDUCED_MOTION) {
    items.forEach(el => {
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
    });
    return;
  }

  const baseDelay = 180;
  items.forEach((item, index) => {
    item.animate(
      [
        { transform: 'translateY(14px)', opacity: 0 },
        { transform: 'translateY(0px)', opacity: 1 }
      ],
      {
        duration: 750,
        delay: baseDelay + index * 55,
        easing: 'cubic-bezier(0.2, 0.8, 0.25, 1)',
        fill: 'forwards'
      }
    );
  });
}

/**
 * ANIMATION 5 : Ligne de progression Capsule Harmattan se dessine
 */
function animateHarmattanProgress() {
  const progressBar = document.getElementById('harmattan-progress-bar');
  if (!progressBar) return;

  if (PREFERS_REDUCED_MOTION) {
    progressBar.style.width = '68%';
    return;
  }

  setTimeout(() => {
    progressBar.style.width = '68%';
  }, 350);
}

/**
 * ANIMATION 6 : "400+" et "230+" comptent de 0 à leur valeur en 1.4 s
 */
function animateHeroCounters() {
  const counter400 = document.getElementById('counter-400');
  const counter230 = document.getElementById('counter-230');

  setTimeout(() => {
    animateCounter(counter400, 400, 1400, '+');
    animateCounter(counter230, 230, 1400, '+');
  }, 200);
}

/**
 * Initialisation des mots du manifeste pour le défilement
 */
function setupManifestoWords() {
  const manifestoContainer = document.getElementById('manifesto-text');
  if (!manifestoContainer) return;

  manifestoContainer.innerHTML = '';
  const words = MANIFESTO_TEXT.split(' ');

  words.forEach((word, idx) => {
    const span = document.createElement('span');
    span.className = 'manifesto-word';
    span.textContent = word + (idx < words.length - 1 ? ' ' : '');
    manifestoContainer.appendChild(span);
  });
}

/**
 * ANIMATION 7 : Photo du hero dérive à 0.12× du scroll (parallaxe)
 * ANIMATION 8 : Manifeste : passage du gris #6f6f6f au blanc #f4f4f4 avec bord doux de 3 mots
 */
function setupScrollDrivenAnimations() {
  if (IS_RECORD_MODE) return; // Traité par timer spécifique en mode rec=1

  const photoWrapper = document.getElementById('hero-photo-wrapper');
  const manifestoSection = document.getElementById('manifesto-section');
  const words = document.querySelectorAll('.manifesto-word');
  const totalWords = words.length;

  const greyRgb = [111, 111, 111]; // #6f6f6f
  const whiteRgb = [244, 244, 244]; // #f4f4f4
  const softEdge = 3;

  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Animation 7 : Parallaxe photo hero 0.12x
    if (photoWrapper && !PREFERS_REDUCED_MOTION) {
      photoWrapper.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
    }

    // Animation 8 : Remplissage manifeste au scroll
    if (manifestoSection && totalWords > 0) {
      if (PREFERS_REDUCED_MOTION) {
        words.forEach(w => w.style.color = '#f4f4f4');
        return;
      }

      const rect = manifestoSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progression du centre de la section dans la vue (0 quand entre, 1 quand sort)
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.2;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));

      const front = progress * (totalWords + softEdge);

      words.forEach((span, i) => {
        let lighting = 0;
        if (i < front - softEdge) {
          lighting = 1;
        } else if (i > front) {
          lighting = 0;
        } else {
          lighting = (front - i) / softEdge;
        }

        lighting = Math.max(0, Math.min(1, lighting));
        span.style.color = interpolateRgb(greyRgb, whiteRgb, lighting);
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * ANIMATION 9 : Panneau de confiance IntersectionObserver ("12K+" et "10+")
 * ANIMATION 10 : Les 8 avatars apparaissent en pop (scale 0.4 → 1), décalés
 */
function setupTrustPanelObserver() {
  if (IS_RECORD_MODE) return; // Géré par le timer rec=1

  const panel = document.getElementById('trust-panel');
  const counter12k = document.getElementById('counter-12k');
  const counter10 = document.getElementById('counter-10');
  const avatarSlots = document.querySelectorAll('.avatar-slot');

  let hasTriggered = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasTriggered) {
        hasTriggered = true;

        // Animation 9 : Compteurs 12K+ et 10+
        animateCounter(counter12k, 12, 1400, 'K+');
        animateCounter(counter10, 10, 1400, '+');

        // Animation 10 : Avatars pop in décalés
        if (!PREFERS_REDUCED_MOTION) {
          avatarSlots.forEach((slot, idx) => {
            slot.animate(
              [
                { transform: 'scale(0.4)', opacity: 0 },
                { transform: 'scale(1)', opacity: 1 }
              ],
              {
                duration: 550,
                delay: idx * 65,
                easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                fill: 'forwards'
              }
            );
          });
        }
      }
    });
  }, { threshold: 0.25 });

  if (panel) observer.observe(panel);
}

/**
 * ANIMATION 11 : Nav survol — la pilule noire glisse vers le lien survolé
 */
function setupNavHoverSlider() {
  const navPill = document.getElementById('nav-pill');
  const slidingPill = document.getElementById('nav-sliding-pill');
  const links = document.querySelectorAll('.nav-link');
  if (!navPill || !slidingPill || !links.length) return;

  function updatePillPosition(link) {
    const linkRect = link.getBoundingClientRect();
    const navRect = navPill.getBoundingClientRect();

    const x = linkRect.left - navRect.left;
    const width = linkRect.width;

    slidingPill.style.transform = `translateX(${x}px)`;
    slidingPill.style.width = `${width}px`;

    links.forEach(l => l.classList.remove('is-active'));
    link.classList.add('is-active');
  }

  // Initialisation sur le lien actif par défaut (Accueil)
  const activeLink = document.querySelector('.nav-link.is-active') || links[0];
  setTimeout(() => {
    updatePillPosition(activeLink);
  }, 100);

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      updatePillPosition(link);
    });
  });

  navPill.addEventListener('mouseleave', () => {
    const currentActive = document.querySelector('.nav-link.is-active') || links[0];
    updatePillPosition(currentActive);
  });
}

/**
 * ANIMATION 12 : Boutons montent de 1px au survol (géré en CSS .btn-*:hover { transform: translateY(-1px); })
 * ANIMATION 13 : Cartes du panneau de confiance montent de 6u au survol (géré en CSS .trust-card:hover { transform: translateY(calc(-6 * var(--u))); })
 * ANIMATION 14 : Image Capsule Harmattan zoome au survol (géré en CSS .harmattan-card:hover .harmattan-img { transform: scale(1.72); })
 * ANIMATION 15 : Flèche Capsule Harmattan tourne de 45° au survol (géré en CSS .harmattan-card:hover .harmattan-arrow { transform: rotate(45deg); })
 */
function setupHoverClasses() {
  // Les écouteurs de styles CSS assurent un rendu matériel fluide à 60/120 fps.
  // Une classe d'assurance JS est initialisée si nécessaire.
}

/**
 * ANIMATION 16 : Cas particulier mode enregistreur (?rec=1)
 * Toute la page est capturée en une seule image, les animations au scroll tournent sur un minuteur :
 * - Remplissage manifeste : 1.3–4.2 s
 * - Compteurs et avatars du panneau : 3.5–5.2 s
 * - Montée de la carte distinctions : 5.3 s
 * - La photo dérive lentement pendant toute la durée
 */
function setupRecorderModeTimer() {
  if (!IS_RECORD_MODE) return;

  const photoWrapper = document.getElementById('hero-photo-wrapper');
  const words = document.querySelectorAll('.manifesto-word');
  const counter12k = document.getElementById('counter-12k');
  const counter10 = document.getElementById('counter-10');
  const avatarSlots = document.querySelectorAll('.avatar-slot');
  const cardDistinctions = document.getElementById('card-distinctions');

  const totalWords = words.length;
  const greyRgb = [111, 111, 111];
  const whiteRgb = [244, 244, 244];
  const softEdge = 3;

  const startTime = performance.now();

  function recordFrame(currentTime) {
    const elapsedSeconds = (currentTime - startTime) / 1000;

    // Dérive lente continue de la photo hero
    if (photoWrapper) {
      photoWrapper.style.transform = `translate3d(0, ${elapsedSeconds * 12}px, 0)`;
    }

    // 1. Remplissage du manifeste : 1.3s à 4.2s
    if (elapsedSeconds >= 1.3 && elapsedSeconds <= 4.2) {
      const p = (elapsedSeconds - 1.3) / (4.2 - 1.3);
      const front = p * (totalWords + softEdge);
      words.forEach((span, i) => {
        let lighting = 0;
        if (i < front - softEdge) lighting = 1;
        else if (i > front) lighting = 0;
        else lighting = (front - i) / softEdge;
        span.style.color = interpolateRgb(greyRgb, whiteRgb, Math.max(0, Math.min(1, lighting)));
      });
    } else if (elapsedSeconds > 4.2) {
      words.forEach(span => span.style.color = '#f4f4f4');
    }

    // 2. Compteurs et avatars du panneau : 3.5s à 5.2s
    if (elapsedSeconds >= 3.5 && elapsedSeconds <= 5.2) {
      const p = (elapsedSeconds - 3.5) / (5.2 - 3.5);
      const val12 = Math.floor(p * 12);
      const val10 = Math.floor(p * 10);
      if (counter12k) counter12k.textContent = `${val12}K+`;
      if (counter10) counter10.textContent = `${val10}+`;

      // Pop des avatars
      avatarSlots.forEach((slot, idx) => {
        const itemP = Math.max(0, Math.min(1, (elapsedSeconds - 3.5 - idx * 0.12) / 0.4));
        slot.style.transform = `scale(${0.4 + 0.6 * itemP})`;
        slot.style.opacity = `${itemP}`;
      });
    } else if (elapsedSeconds > 5.2) {
      if (counter12k) counter12k.textContent = '12K+';
      if (counter10) counter10.textContent = '10+';
      avatarSlots.forEach(slot => {
        slot.style.transform = 'scale(1)';
        slot.style.opacity = '1';
      });
    }

    // 3. Montée de la carte distinctions : 5.3s
    if (elapsedSeconds >= 5.3 && cardDistinctions) {
      cardDistinctions.style.transform = 'translateY(calc(-6 * var(--u)))';
    }

    requestAnimationFrame(recordFrame);
  }

  requestAnimationFrame(recordFrame);
}

/**
 * ANIMATION 17 : Mouvement réduit (prefers-reduced-motion)
 * Aucune transition, tout est affiché rempli et compté immédiatement
 */
function handleReducedMotionFallback() {
  if (!PREFERS_REDUCED_MOTION) return;

  const counter400 = document.getElementById('counter-400');
  const counter230 = document.getElementById('counter-230');
  const counter12k = document.getElementById('counter-12k');
  const counter10 = document.getElementById('counter-10');
  const words = document.querySelectorAll('.manifesto-word');
  const progressBar = document.getElementById('harmattan-progress-bar');
  const avatarSlots = document.querySelectorAll('.avatar-slot');

  if (counter400) counter400.textContent = '400+';
  if (counter230) counter230.textContent = '230+';
  if (counter12k) counter12k.textContent = '12K+';
  if (counter10) counter10.textContent = '10+';
  if (progressBar) progressBar.style.width = '68%';

  words.forEach(span => span.style.color = '#f4f4f4');
  avatarSlots.forEach(slot => {
    slot.style.opacity = '1';
    slot.style.transform = 'scale(1)';
  });
}

/**
 * Lancement général après chargement du DOM
 */
function initVelouraApp() {
  setupManifestoWords();
  setupNavHoverSlider();
  setupHoverClasses();

  if (PREFERS_REDUCED_MOTION) {
    handleReducedMotionFallback();
    return;
  }

  // Séquence d'entrée au chargement (Animations 1 à 6)
  animateHeroTitle();
  animateHeroPhoto();
  animateNavEntrance();
  animateHeroOtherElements();
  animateHarmattanProgress();
  animateHeroCounters();

  // Scroll & IntersectionObserver (Animations 7 à 10)
  setupScrollDrivenAnimations();
  setupTrustPanelObserver();

  // Mode enregistreur si paramètre URL actif (Animation 16)
  if (IS_RECORD_MODE) {
    setupRecorderModeTimer();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVelouraApp);
} else {
  initVelouraApp();
}
