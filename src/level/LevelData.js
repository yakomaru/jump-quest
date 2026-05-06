// Tile IDs: 0=empty, 1=solid ground, 2=one-way platform, 3=spike
// World: 30 wide x 60 tall tiles = 480x960px
//
// Platform layout:
//   LEFT  = one-way, cols 3-12  (10 tiles)
//   RIGHT = one-way, cols 15-24 (10 tiles)
//   Horizontal gap between adjacent platforms: 3 tiles = 48px
//   Vertical spacing: 4 rows = 64px (requires held jump, always reachable)
//
// Spike sections replace a platform in the sequence:
//   LSPIKE: solid(3-4) + spike(5-7) + solid(8-12) — land on edge, avoid center
//   RSPIKE: solid(15-17) + spike(18-20) + solid(21-24)
//
// Enemies are centered on their platform (col 7 for LEFT, col 20 for RIGHT),
// away from the 3-tile take-off edge at cols 12 / 15.

const W      = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const LEFT   = [1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const RIGHT  = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,1];
const GOAL   = [1,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,1];
const LSPIKE = [1,0,0,1,1,3,3,3,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const RSPIKE = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,3,3,3,1,1,1,1,0,0,0,0,1];
const CEIL   = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
const FLOOR  = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

export const LEVEL_DATA = [
  CEIL,   // 0  — ceiling (gap at cols 14-15)
  W,      // 1
  W,      // 2
  W,      // 3
  GOAL,   // 4  — goal platform, solid cols 10-17
  W,      // 5
  W,      // 6
  W,      // 7
  LEFT,   // 8  — ← 4 rows above goal
  W,      // 9
  W,      // 10
  W,      // 11
  RIGHT,  // 12 — ← 4 rows
  W,      // 13
  W,      // 14
  W,      // 15
  LEFT,   // 16 — ← 4 rows
  W,      // 17
  W,      // 18
  W,      // 19
  RSPIKE, // 20 — ← 4 rows: spike hazard (RIGHT position)
  W,      // 21
  W,      // 22
  W,      // 23
  RIGHT,  // 24 — ← 4 rows
  W,      // 25
  W,      // 26
  W,      // 27
  LEFT,   // 28 — ← 4 rows
  W,      // 29
  W,      // 30
  W,      // 31
  RIGHT,  // 32 — ← 4 rows
  W,      // 33
  W,      // 34
  W,      // 35
  LSPIKE, // 36 — ← 4 rows: spike hazard (LEFT position)
  W,      // 37
  W,      // 38
  W,      // 39
  LEFT,   // 40 — ← 4 rows
  W,      // 41
  W,      // 42
  W,      // 43
  RIGHT,  // 44 — ← 4 rows
  W,      // 45
  W,      // 46
  W,      // 47
  LEFT,   // 48 — ← 4 rows
  W,      // 49
  W,      // 50
  W,      // 51
  RIGHT,  // 52 — ← 4 rows
  W,      // 53
  W,      // 54
  W,      // 55
  LEFT,   // 56 — ← 4 rows: first platform (3 rows above floor)
  W,      // 57
  W,      // 58
  FLOOR,  // 59
];

// [col, row] — enemies spawn just above their platform row
// Placed at col 7 (center of LEFT) or col 20 (center of RIGHT),
// leaving cols 3 & 12 / 15 & 24 free as take-off edges.
export const ENEMY_SPAWNS = [
  [7,  56],  // LEFT  row 56
  [20, 52],  // RIGHT row 52
  [20, 44],  // RIGHT row 44
  [7,  40],  // LEFT  row 40
  [20, 32],  // RIGHT row 32
  [7,  28],  // LEFT  row 28
  [20, 24],  // RIGHT row 24
  [7,  16],  // LEFT  row 16
  [20, 12],  // RIGHT row 12
  [7,   8],  // LEFT  row 8
];

// Center of goal platform (cols 10-17, row 4)
export const GOAL_TILE = [14, 3];
