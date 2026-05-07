// Tile IDs: 0=empty, 1=solid ground, 2=one-way platform, 3=spike, 4=L2 one-way platform (amber)
// World: 120 wide × 60 tall tiles = 1920 × 960 px
// Level 1: cols 0–29   (vertical climb, bottom → top)
// Level 2: cols 30–119 (horizontal traverse; fall-floor at row 35; re-entry staircase cols 30–37)

// ── helpers ───────────────────────────────────────────────────────────────────

// Expand a 30-wide L1 base row to a 120-wide world row.
// Sets col 119 = 1 (L2 right wall) and applies any point overrides.
function e(base, overrides = {}) {
  const row = [...base, ...new Array(90).fill(0)];
  row[119] = 1;
  for (const [c, v] of Object.entries(overrides)) row[+c] = v;
  return row;
}

// Build an override object filling cols [start, end] with val (inclusive).
function r(start, end, val) {
  const o = {};
  for (let c = start; c <= end; c++) o[c] = val;
  return o;
}

// ── L1 base rows (30 wide) ────────────────────────────────────────────────────

const _W       = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];

// Intro section (bottom)
const _INTRO   = [1,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _STAIR0  = [1,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _STAIR1  = [1,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _STAIR2  = [1,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _STAIR3  = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,1];
const _STAIR4  = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,1];

// Middle section
const _RREST   = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,1];
const _CENTERR = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,1];
const _LMID    = [1,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _RMID    = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,1];

// Upper staircase
const _STAIRA  = [1,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _STAIRB  = [1,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _STAIRC  = [1,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];

// Spike rows
const _SP_STAIR2  = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _SP_CENTERL = [1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _SP_STAIRB  = [1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];

// Goal approach
const _APP1    = [1,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _APP2    = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,1];
const _APP3    = [1,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _GOAL    = [1,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,1];

// ── L2 re-entry staircase overrides (zigzag, every 3 rows) ───────────────────

const SC_L = r(30, 33, 2);  // Left step  (cols 30–33)
const SC_R = r(34, 37, 2);  // Right step (cols 34–37)

// ── L2 traversal platform overrides (type 4 = amber one-way) ─────────────────

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
const P24  = {
  ...r(44, 47, 4),
  49: 4,
  ...r(58, 61, 4),
  63: 4,
  ...r(73, 76, 4),
  ...r(88, 91, 4),
  93: 4,
};

// ── Special full-width rows ───────────────────────────────────────────────────

// Solid ceiling over entire world
const CEIL120 = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

// Solid floor across entire world
const FLOOR120 = new Array(120).fill(1);

// Row 35 — CENTERL (L1 cols 9–14) + solid L2 floor (cols 30–119)
const ROW35 = [
  1,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

// ── Level data (90 wide × 60 tall) ───────────────────────────────────────────

export const LEVEL_DATA = [
  CEIL120,                             // 0  — ceiling (L1 gap at cols 14–15)
  e(_W),                               // 1
  e(_W),                               // 2
  e(_W, { 29: 0 }),                    // 3  — clear col-29 wall for bridge body clearance
  e(_GOAL, r(18, 37, 2)),              // 4  — bridge: goal + extension to col 37 (col 29 → type 2)
  e(_W, SC_L),                         // 5  — staircase top Left step  (cols 30–33)
  e(_W, { 55: 3, 69: 3, 95: 3 }),      // 6  — spikes above P3 right (55), P5 right (69), stair3-top (95)
  e(_W, P135),                         // 7  — L2 platforms P1, stair1-top, P3, stair2-top, P5, PG
  e(_APP3, { ...SC_R, 44: 3, 50: 4, 64: 4, 78: 4, 88: 3, 94: 4 }), // 8 — approach 3 + SC_R + spike(44) + stair1-mid(50) + stair2-mid(64) + bridge(78) + spike(88) + stair3-mid(94)
  e(_W, P24),                          // 9  — L2 platforms P2, stair1-base, P4, stair2-base, P6
  e(_W),                               // 10
  e(_APP2, SC_L),                      // 11 — approach 2 + staircase Left step
  e(_W),                               // 12
  e(_W),                               // 13
  e(_APP1, SC_R),                      // 14 — approach 1 + staircase Right step
  e(_W),                               // 15
  e(_W),                               // 16
  e(_STAIRC, SC_L),                    // 17 — stair C + staircase Left step
  e(_W),                               // 18
  e(_SP_STAIRB, { 36: 3 }),            // 19 — spike (L1 col 9) + L2 spike at col 36
  e(_STAIRB, SC_R),                    // 20 — stair B + staircase Right step
  e(_W),                               // 21
  e(_W),                               // 22
  e(_STAIRA, SC_L),                    // 23 — stair A + staircase Left step
  e(_W),                               // 24
  e(_W),                               // 25
  e(_RMID, SC_R),                      // 26 — right-mid + staircase Right step
  e(_W),                               // 27
  e(_W),                               // 28
  e(_LMID, SC_L),                      // 29 — left-mid + staircase Left step
  e(_W),                               // 30
  e(_W, { 34: 3 }),                    // 31 — spike above staircase step at row 32
  e(_CENTERR, SC_R),                   // 32 — center-right + staircase Right step (lowest)
  e(_W),                               // 33
  e(_SP_CENTERL),                      // 34 — spike above CENTERL col 9
  ROW35,                               // 35 — center-left (L1) + solid L2 floor
  e(_W),                               // 36
  e(_W),                               // 37
  e(_RREST),                           // 38 — wide right rest (cols 15–22)
  e(_W),                               // 39
  e(_W),                               // 40
  e(_STAIR4),                          // 41 — ascending stair 4 (cols 23–25)
  e(_W),                               // 42
  e(_W),                               // 43
  e(_STAIR3),                          // 44 — ascending stair 3 (cols 18–20)
  e(_W),                               // 45
  e(_SP_STAIR2),                       // 46 — spike above stair 2 col 14
  e(_STAIR2),                          // 47 — ascending stair 2 (cols 13–15)
  e(_W),                               // 48
  e(_W),                               // 49
  e(_STAIR1),                          // 50 — ascending stair 1 (cols 8–10)
  e(_W),                               // 51
  e(_W),                               // 52
  e(_STAIR0),                          // 53 — ascending stair 0 (cols 2–5)
  e(_W),                               // 54
  e(_W),                               // 55
  e(_INTRO),                           // 56 — wide intro (cols 2–9)
  e(_W),                               // 57
  e(_W),                               // 58
  FLOOR120,                            // 59 — solid floor
];

// Walking enemies [col, row] — spawn just above their platform row
export const ENEMY_SPAWNS = [
  // Level 1
  [8,  56],  // INTRO wide platform
  [21, 38],  // RREST wide platform
  [18, 26],  // RMID
  [12, 14],  // APP1
  // Level 2
  [50, 35],  // L2 fall-floor patrol
  [45,  9],  // P2 patrol (cols 44–47)
  [74,  9],  // P6 patrol (cols 73–76)
  [89,  9],  // P7 patrol (cols 88–91)
  [106, 7],  // NEW_PG patrol (cols 102–110)
];

// Flying enemies [x_px, y_px, patrol_range_px]
export const FLYING_SPAWNS = [
  // Level 1
  [220, 33 * 16, 70],  // between CENTER-R (row 32) and CENTER-L (row 35)
  [240, 24 * 16, 70],  // between STAIR-A (row 23) and RMID (row 26)
  [210, 12 * 16, 60],  // between APP1 (row 14) and APP2 (row 11)
  // Level 2
  [896,  128, 32],     // guards gap between P3 (ends col 55) and P4 (starts col 58)
  [1136, 128, 32],     // guards gap between P5 (ends col 69) and P6 (starts col 73)
  [1392, 128, 32],     // guards gap between PG (ends col 85) and P7 (starts col 88)
  [1568, 128, 32],     // guards gap between stair3-top (col 95) and NEW_PG (starts col 102)
];

// [col, row] — Level 2 goal above NEW_PG platform (row 7, cols 102–110)
export const GOAL_TILE = [106, 6];
