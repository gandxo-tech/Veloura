import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateWordLighting,
  interpolateColor,
  calculateParallax,
  formatCounterValue,
  getNextSlideIndex,
  formatSlideCounter,
  generateWhatsAppOrderUrl,
  compressUnsplashUrl,
  calculateStaggerDelay,
  calculateHeroEntranceTransform
} from './logic';

test('calculateWordLighting transitions smoothly with soft edge', () => {
  const total = 30;
  // Progress 0: all words dark
  assert.equal(calculateWordLighting(0, total, 0, 3), 0);
  assert.equal(calculateWordLighting(10, total, 0, 3), 0);

  // Progress 1: all words lit
  assert.equal(calculateWordLighting(0, total, 1, 3), 1);
  assert.equal(calculateWordLighting(29, total, 1, 3), 1);

  // Midway: earlier words are 1, later words are 0, boundary is between 0 and 1
  const midLightingWord1 = calculateWordLighting(1, total, 0.3, 3);
  const midLightingWord20 = calculateWordLighting(20, total, 0.3, 3);
  assert.equal(midLightingWord1, 1);
  assert.equal(midLightingWord20, 0);
});

test('interpolateColor interpolates correctly between grey #6f6f6f and white #f4f4f4', () => {
  const grey: [number, number, number] = [111, 111, 111]; // #6f6f6f
  const white: [number, number, number] = [244, 244, 244]; // #f4f4f4

  assert.equal(interpolateColor(grey, white, 0), 'rgb(111, 111, 111)');
  assert.equal(interpolateColor(grey, white, 1), 'rgb(244, 244, 244)');
  assert.equal(interpolateColor(grey, white, 0.5), 'rgb(178, 178, 178)');
});

test('calculateParallax applies correct ratio', () => {
  assert.equal(calculateParallax(100, 0.12), 12);
  assert.equal(calculateParallax(500, 0.12), 60);
});

test('formatCounterValue displays progressive values and clamps target', () => {
  assert.equal(formatCounterValue(0, 400, '+'), '0+');
  assert.equal(formatCounterValue(230.4, 230, '+'), '230+');
  assert.equal(formatCounterValue(245, 230, '+'), '230+');
});

test('getNextSlideIndex wraps correctly around boundaries', () => {
  const total = 6;
  assert.equal(getNextSlideIndex(0, total, 'next'), 1);
  assert.equal(getNextSlideIndex(5, total, 'next'), 0);
  assert.equal(getNextSlideIndex(0, total, 'prev'), 5);
  assert.equal(getNextSlideIndex(3, total, 'prev'), 2);
});

test('formatSlideCounter formats 2-digit padded strings', () => {
  assert.equal(formatSlideCounter(0, 6), '01 / 06');
  assert.equal(formatSlideCounter(4, 6), '05 / 06');
});

test('generateWhatsAppOrderUrl creates encoded WhatsApp intent URL with piece name and ref', () => {
  const url = generateWhatsAppOrderUrl('Veste Tailoring Oversize', 'VEL-01');
  assert.ok(url.startsWith('https://wa.me/?text=Bonjour%2C%20je%20souhaite%20commander%20la%20pi%C3%A8ce%20%3A%20'));
  assert.ok(url.includes('VEL-01'));
});

test('compressUnsplashUrl converts URLs to lightweight WebP format with given dimensions', () => {
  const raw = 'https://images.unsplash.com/photo-1556821862-4b3fe13a6ce6?auto=format&fit=crop&w=1200&q=80';
  const compressed = compressUnsplashUrl(raw, 900, 70);
  assert.equal(compressed, 'https://images.unsplash.com/photo-1556821862-4b3fe13a6ce6?auto=format&fit=crop&w=900&q=70&fm=webp');

  const avatar = compressUnsplashUrl(raw, 100, 65, 100);
  assert.equal(avatar, 'https://images.unsplash.com/photo-1556821862-4b3fe13a6ce6?auto=format&fit=crop&w=100&q=65&fm=webp&h=100');
});

test('calculateStaggerDelay produces correctly incremental delays', () => {
  assert.equal(calculateStaggerDelay(0, 100, 80), 100);
  assert.equal(calculateStaggerDelay(2, 100, 80), 260);
});

test('calculateHeroEntranceTransform starts at -70 translateY with 0 opacity and finishes at 0 with 1 opacity', () => {
  const start = calculateHeroEntranceTransform(0, -70);
  assert.equal(start.translateY, -70);
  assert.equal(start.opacity, 0);

  const end = calculateHeroEntranceTransform(1, -70);
  assert.equal(end.translateY, 0);
  assert.equal(end.opacity, 1);

  const mid = calculateHeroEntranceTransform(0.5, -70);
  assert.ok(mid.translateY > -70 && mid.translateY < 0);
  assert.ok(mid.opacity > 0 && mid.opacity <= 1);
});

