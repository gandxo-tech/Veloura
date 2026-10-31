/**
 * Pure logic calculations for VELOURA landing page
 */

export function calculateWordLighting(
  wordIndex: number,
  totalWords: number,
  progress: number,
  softEdge: number = 3
): number {
  // progress is 0 to 1
  // mappedWordProgress: the front of the lighting wave
  // front position across [0, totalWords + softEdge]
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const front = clampedProgress * (totalWords + softEdge);
  
  if (wordIndex < front - softEdge) {
    return 1; // 100% white
  } else if (wordIndex > front) {
    return 0; // 0% white (base grey)
  } else {
    // Inside soft edge transition
    const ratio = (front - wordIndex) / softEdge;
    return Math.max(0, Math.min(1, ratio));
  }
}

export function interpolateColor(
  fromRgb: [number, number, number],
  toRgb: [number, number, number],
  factor: number
): string {
  const f = Math.max(0, Math.min(1, factor));
  const r = Math.round(fromRgb[0] + (toRgb[0] - fromRgb[0]) * f);
  const g = Math.round(fromRgb[1] + (toRgb[1] - fromRgb[1]) * f);
  const b = Math.round(fromRgb[2] + (toRgb[2] - fromRgb[2]) * f);
  return `rgb(${r}, ${g}, ${b})`;
}

export function calculateParallax(scrollY: number, factor: number = 0.12): number {
  return scrollY * factor;
}

export function formatCounterValue(
  current: number,
  target: number,
  suffix: string = ""
): string {
  const rounded = Math.round(current);
  if (rounded >= target) {
    return `${target}${suffix}`;
  }
  return `${rounded}${suffix}`;
}

export function getNextSlideIndex(
  currentIndex: number,
  totalSlides: number,
  direction: 'next' | 'prev'
): number {
  if (totalSlides <= 0) return 0;
  if (direction === 'next') {
    return (currentIndex + 1) % totalSlides;
  }
  return (currentIndex - 1 + totalSlides) % totalSlides;
}

export function formatSlideCounter(index: number, total: number): string {
  const paddedIndex = String(index + 1).padStart(2, '0');
  const paddedTotal = String(total).padStart(2, '0');
  return `${paddedIndex} / ${paddedTotal}`;
}

export function generateWhatsAppOrderUrl(pieceTitle: string, pieceRef: string): string {
  const text = `Bonjour, je souhaite commander la pièce : ${pieceTitle} (${pieceRef})`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function compressUnsplashUrl(
  url: string,
  width: number,
  quality: number = 70,
  height?: number
): string {
  if (!url || !url.includes('images.unsplash.com')) return url;
  // Strip existing dimensions & quality queries
  const baseUrl = url.split('?')[0];
  let params = `auto=format&fit=crop&w=${width}&q=${quality}&fm=webp`;
  if (height) {
    params += `&h=${height}`;
  }
  return `${baseUrl}?${params}`;
}

export function calculateStaggerDelay(
  index: number,
  baseDelay: number = 100,
  stepDelay: number = 80
): number {
  return baseDelay + index * stepDelay;
}

export function calculateHeroEntranceTransform(
  progress: number,
  startY: number = -70
): { translateY: number; opacity: number } {
  const p = Math.max(0, Math.min(1, progress));
  // Ease-out cubic calculation
  const eased = 1 - Math.pow(1 - p, 3);
  const rawY = Math.round(startY * (1 - eased));
  return {
    translateY: rawY === 0 ? 0 : rawY,
    opacity: Number((p * (2 - p)).toFixed(3))
  };
}

