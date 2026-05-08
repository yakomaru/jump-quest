// Tile IDs: 0=empty, 1=solid, 4=one-way platform (amber), 3=spike
// L3 spans cols 30–119 (horizontal traverse right→left; no fall floor — drop returns to L2)
// World rows 0–29; staircase at cols 104–116 connects down to L2 right side

import { r } from '../levelUtils.js';

function l3(overrides = {}) {
  const row = new Array(90).fill(0);
  row[89] = 1; // col 119 = right wall
  for (const [c, v] of Object.entries(overrides)) row[+c - 30] = v;
  return row;
}

const L3_SOLID = new Array(90).fill(1);

// Staircase at right side (mirrors L2's left staircase)
const SC_INNER = r(104, 109, 4);   // cols 104–109 (inner step, closer to center)
const SC_OUTER = r(111, 116, 4);   // cols 111–116 (outer step, near right wall)

// High platforms (row 7) — Entry, P-B, P-D, P-F, P-H, Goal
const HIGH_R7 = {
  ...r(108, 116, 4),  // Entry  (top of staircase)
  ...r(92,   96, 4),  // P-B
  ...r(76,   80, 4),  // P-D
  ...r(60,   64, 4),  // P-F
  ...r(44,   48, 4),  // P-H
  ...r(37,   41, 4),  // Goal platform
};

// Low platforms (row 9) — P-A, P-C, P-E, P-G
const LOW_R9 = {
  ...r(99, 103, 4),   // P-A
  ...r(83,  87, 4),   // P-C
  ...r(67,  71, 4),   // P-E
  ...r(51,  55, 4),   // P-G
};

// Spikes above right edge of each high platform (row 6)
const SPIKES_R6 = { 96: 3, 80: 3, 64: 3, 48: 3 };

// Spikes above right edge of each low platform (row 8)
const SPIKES_R8 = { 103: 3, 87: 3, 71: 3, 55: 3 };

export const LEVEL_3_ROWS = [
  L3_SOLID,           // 0  — ceiling
  l3(),               // 1
  l3(),               // 2
  l3(),               // 3
  l3(),               // 4
  l3(),               // 5
  l3(SPIKES_R6),      // 6  — spikes above right edges of high platforms
  l3(HIGH_R7),        // 7  — high platforms (Entry, P-B, P-D, P-F, P-H, Goal)
  l3(SPIKES_R8),      // 8  — spikes above right edges of low platforms
  l3(LOW_R9),         // 9  — low platforms (P-A, P-C, P-E, P-G)
  l3(SC_INNER),       // 10 — staircase step 1
  l3(),               // 11
  l3(),               // 12
  l3(SC_OUTER),       // 13 — staircase step 2
  l3(),               // 14
  l3(),               // 15
  l3(SC_INNER),       // 16 — staircase step 3
  l3(),               // 17
  l3(),               // 18
  l3(SC_OUTER),       // 19 — staircase step 4
  l3(),               // 20
  l3(),               // 21
  l3(SC_INNER),       // 22 — staircase step 5
  l3(),               // 23
  l3(),               // 24
  l3(SC_OUTER),       // 25 — staircase step 6
  l3(),               // 26
  l3(),               // 27
  l3(SC_INNER),       // 28 — staircase step 7 (lowest, connects to L2 staircase below)
  l3(),               // 29 — open bottom — falling here drops into L2
];

// [col, row] in world tile coords (Level 3 is at top = world rows 0–29)
export const LEVEL_3_ENEMY_SPAWNS = [
  [101, 9],   // P-A patrol (cols 99–103)
  [ 85, 9],   // P-C patrol (cols 83–87)
  [ 69, 9],   // P-E patrol (cols 67–71)
];

// [x_pixel, y_pixel, patrol_range_pixels] — world pixel coords
export const LEVEL_3_FLYING_SPAWNS = [
  [1504, 128, 32],  // guards gap between Entry (ends 116) and P-A (starts 99): cols 97–107
  [1288, 128, 32],  // guards gap between P-B (ends 96) and P-C (starts 83):    cols 81–91
  [1064, 128, 32],  // guards gap between P-D (ends 80) and P-E (starts 67):    cols 65–79
];

// [col, row] — Level 3 goal above Goal platform (row 7, cols 37–41)
export const GOAL_TILE = [38, 6];
