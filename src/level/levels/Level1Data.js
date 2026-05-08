// Tile IDs: 0=empty, 1=solid, 2=one-way platform, 3=spike
// L1 spans cols 0–29 (vertical climb, bottom → top)

import { r } from '../levelUtils.js';

const _W          = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _INTRO      = [1,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _STAIR0     = [1,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _STAIR1     = [1,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _STAIR2     = [1,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _STAIR3     = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,1];
const _STAIR4     = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,1];
const _RREST      = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,1];
const _CENTERR    = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,1];
const _LMID       = [1,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _RMID       = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,1];
const _STAIRA     = [1,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _STAIRB     = [1,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _STAIRC     = [1,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _SP_STAIR2  = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _SP_CENTERL = [1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _SP_STAIRB  = [1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _APP1       = [1,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _APP2       = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,1];
const _APP3       = [1,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const _GOAL       = [1,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,1];

function l1(base, overrides = {}) {
  const row = [...base];
  for (const [c, v] of Object.entries(overrides)) row[+c] = v;
  return row;
}

const L1_SOLID = new Array(30).fill(1);
const L1_ROW35 = [1,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];

export const LEVEL_1_ROWS = [
  L1_SOLID,                           // 0  — ceiling
  _W,                                 // 1
  _W,                                 // 2
  l1(_W, { 29: 0 }),                  // 3  — clear col-29 wall for bridge body clearance
  l1(_GOAL, r(18, 29, 2)),            // 4  — bridge: goal + extension to col 29
  _W,                                 // 5
  _W,                                 // 6
  _W,                                 // 7
  _APP3,                              // 8  — approach 3
  _W,                                 // 9
  _W,                                 // 10
  _APP2,                              // 11 — approach 2
  _W,                                 // 12
  _W,                                 // 13
  _APP1,                              // 14 — approach 1
  _W,                                 // 15
  _W,                                 // 16
  _STAIRC,                            // 17 — stair C
  _W,                                 // 18
  _SP_STAIRB,                         // 19 — spike (col 9)
  _STAIRB,                            // 20 — stair B
  _W,                                 // 21
  _W,                                 // 22
  _STAIRA,                            // 23 — stair A
  _W,                                 // 24
  _W,                                 // 25
  _RMID,                              // 26 — right-mid
  _W,                                 // 27
  _W,                                 // 28
  _LMID,                              // 29 — left-mid
  _W,                                 // 30
  _W,                                 // 31
  _CENTERR,                           // 32 — center-right
  _W,                                 // 33
  _SP_CENTERL,                        // 34 — spike above center-left col 9
  L1_ROW35,                           // 35 — center-left platform
  _W,                                 // 36
  _W,                                 // 37
  _RREST,                             // 38 — wide right rest (cols 15–22)
  _W,                                 // 39
  _W,                                 // 40
  _STAIR4,                            // 41 — ascending stair 4 (cols 23–25)
  _W,                                 // 42
  _W,                                 // 43
  _STAIR3,                            // 44 — ascending stair 3 (cols 18–20)
  _W,                                 // 45
  _SP_STAIR2,                         // 46 — spike above stair 2 col 14
  _STAIR2,                            // 47 — ascending stair 2 (cols 13–15)
  _W,                                 // 48
  _W,                                 // 49
  _STAIR1,                            // 50 — ascending stair 1 (cols 8–10)
  _W,                                 // 51
  _W,                                 // 52
  _STAIR0,                            // 53 — ascending stair 0 (cols 2–5)
  _W,                                 // 54
  _W,                                 // 55
  _INTRO,                             // 56 — wide intro (cols 2–9)
  _W,                                 // 57
  _W,                                 // 58
  L1_SOLID,                           // 59 — solid floor
];

export const LEVEL_1_ENEMY_SPAWNS = [
  [8,  56],  // INTRO wide platform
  [21, 38],  // RREST wide platform
  [18, 26],  // RMID
  [12, 14],  // APP1
];

export const LEVEL_1_FLYING_SPAWNS = [
  [220, 33 * 16, 70],  // between CENTER-R (row 32) and CENTER-L (row 35)
  [240, 24 * 16, 70],  // between STAIR-A (row 23) and RMID (row 26)
  [210, 12 * 16, 60],  // between APP1 (row 14) and APP2 (row 11)
];
