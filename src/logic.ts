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

