import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateWordLighting,
  interpolateColor,
  calculateParallax,
  formatCounterValue
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
