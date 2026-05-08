// Tile IDs: 0=empty, 1=solid, 2=one-way (staircase), 3=spike, 4=one-way platform (amber)
// L2 spans cols 30–119 (horizontal traverse; fall-floor at row 35; re-entry staircase cols 30–37)

import { r } from '../levelUtils.js';

// Build a 90-element row for cols 30–119; override keys are absolute col indices.
function l2(overrides = {}) {
  const row = new Array(90).fill(0);
  row[89] = 1; // col 119 = right wall
  for (const [c, v] of Object.entries(overrides)) row[+c - 30] = v;
  return row;
}

const L2_SOLID = new Array(90).fill(1);

const SC_L = r(30, 33, 2);  // Left step  (cols 30–33)
const SC_R = r(34, 37, 2);  // Right step (cols 34–37)

// Row 7: P1 (38–41), stair1-top (51), P3 (53–55), stair2-top (65), P5 (67–69), PG (80–85), stair3-top (95), NEW_PG (102–110)
const P135 = {
  ...r(38, 41, 4),
  51: 4,
  ...r(53, 55, 4),
  65: 4,
  ...r(67, 69, 4),
  ...r(80, 85, 4),
  95: 4,
  ...r(102, 110, 4),
};

// Row 9: P2 (44–47), stair1-base (49), P4 (58–61), stair2-base (63), P6 (73–76), P7 (88–91), stair3-base (93)
const P24 = {
  ...r(44, 47, 4),
  49: 4,
  ...r(58, 61, 4),
  63: 4,
  ...r(73, 76, 4),
  ...r(88, 91, 4),
  93: 4,
};

export const LEVEL_2_ROWS = [
  L2_SOLID,                                                              // 0  — ceiling
  l2(),                                                                  // 1
  l2(),                                                                  // 2
  l2(),                                                                  // 3
  l2(r(30, 37, 2)),                                                      // 4  — bridge cols 30–37
  l2(SC_L),                                                              // 5  — staircase Left step
  l2({ 55: 3, 69: 3, 95: 3 }),                                           // 6  — spikes above P3 right, P5 right, stair3-top
  l2(P135),                                                              // 7  — platforms P1, stair1-top, P3, stair2-top, P5, PG, stair3-top, NEW_PG
  l2({ ...SC_R, 44: 3, 50: 4, 64: 4, 78: 4, 88: 3, 94: 4 }),            // 8  — SC_R + spike(44) + stair1-mid(50) + stair2-mid(64) + bridge(78) + spike(88) + stair3-mid(94)
  l2(P24),                                                               // 9  — platforms P2, stair1-base, P4, stair2-base, P6, P7, stair3-base
  l2(),                                                                  // 10
  l2(SC_L),                                                              // 11 — staircase Left step
  l2(),                                                                  // 12
  l2(),                                                                  // 13
  l2(SC_R),                                                              // 14 — staircase Right step
  l2(),                                                                  // 15
  l2(),                                                                  // 16
  l2(SC_L),                                                              // 17 — staircase Left step
  l2(),                                                                  // 18
  l2({ 36: 3 }),                                                         // 19 — spike at col 36
  l2(SC_R),                                                              // 20 — staircase Right step
  l2(),                                                                  // 21
  l2(),                                                                  // 22
  l2(SC_L),                                                              // 23 — staircase Left step
  l2(),                                                                  // 24
  l2(),                                                                  // 25
  l2(SC_R),                                                              // 26 — staircase Right step
  l2(),                                                                  // 27
  l2(),                                                                  // 28
  l2(SC_L),                                                              // 29 — staircase Left step
  l2(),                                                                  // 30
  l2({ 34: 3 }),                                                         // 31 — spike at col 34
  l2(SC_R),                                                              // 32 — staircase Right step (lowest)
  l2(),                                                                  // 33
  l2(),                                                                  // 34
  L2_SOLID,                                                              // 35 — solid L2 floor
  l2(),                                                                  // 36
  l2(),                                                                  // 37
  l2(),                                                                  // 38
  l2(),                                                                  // 39
  l2(),                                                                  // 40
  l2(),                                                                  // 41
  l2(),                                                                  // 42
  l2(),                                                                  // 43
  l2(),                                                                  // 44
  l2(),                                                                  // 45
  l2(),                                                                  // 46
  l2(),                                                                  // 47
  l2(),                                                                  // 48
  l2(),                                                                  // 49
  l2(),                                                                  // 50
  l2(),                                                                  // 51
  l2(),                                                                  // 52
  l2(),                                                                  // 53
  l2(),                                                                  // 54
  l2(),                                                                  // 55
  l2(),                                                                  // 56
  l2(),                                                                  // 57
  l2(),                                                                  // 58
  L2_SOLID,                                                              // 59 — solid floor
];

export const LEVEL_2_ENEMY_SPAWNS = [
  [50, 35],   // L2 fall-floor patrol
  [45,  9],   // P2 patrol (cols 44–47)
  [74,  9],   // P6 patrol (cols 73–76)
  [89,  9],   // P7 patrol (cols 88–91)
  [106, 7],   // NEW_PG patrol (cols 102–110)
];

export const LEVEL_2_FLYING_SPAWNS = [
  [896,  128, 32],  // guards gap between P3 (ends col 55) and P4 (starts col 58)
  [1136, 128, 32],  // guards gap between P5 (ends col 69) and P6 (starts col 73)
  [1392, 128, 32],  // guards gap between PG (ends col 85) and P7 (starts col 88)
  [1568, 128, 32],  // guards gap between stair3-top (col 95) and NEW_PG (starts col 102)
];

// [col, row] — Level 2 goal above NEW_PG platform (row 7, cols 102–110)
export const GOAL_TILE = [106, 6];
