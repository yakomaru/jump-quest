// Tile IDs: 0=empty, 1=solid ground, 2=one-way platform, 3=spike
// World: 30 wide x 60 tall tiles = 480x960px
// Platforms are spaced 3-4 rows (48-64px) apart — within the ~84px max held jump.

const W = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];

function plat(cols, id = 2) {
  const row = [...W];
  for (const c of cols) row[c] = id;
  return row;
}

function range(a, b) { return Array.from({ length: b - a + 1 }, (_, i) => i + a); }

export const LEVEL_DATA = [
  // Row 0: ceiling (gap at cols 14-15 for visual goal entrance)
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  W, // 1
  W, // 2
  // Row 3: goal platform (solid, cols 12-17)
  plat(range(12, 17), 1),
  W, // 4
  W, // 5
  // Row 6: one-way, left (cols 4-8)  ← 3 rows above goal platform
  plat(range(4, 8)),
  W, // 7
  W, // 8
  // Row 9: one-way, right (cols 19-24)  ← 3 rows
  plat(range(19, 24)),
  W, // 10
  W, // 11
  // Row 12: one-way, center-left (cols 9-14)  ← 3 rows
  plat(range(9, 14)),
  W, // 13
  W, // 14
  // Row 15: one-way, right-center (cols 16-21)  ← 3 rows
  plat(range(16, 21)),
  W, // 16
  W, // 17
  W, // 18
  // Row 19: one-way, left (cols 3-7)  ← 4 rows
  plat(range(3, 7)),
  W, // 20
  W, // 21
  // Row 22: spike ledge — solid edges, spikes center  ← 3 rows
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,1,1,0,0,0,0,0,0,0,0,0,0,1],
  W, // 23
  W, // 24
  W, // 25
  // Row 26: one-way, right (cols 20-25)  ← 4 rows
  plat(range(20, 25)),
  W, // 27
  W, // 28
  W, // 29
  // Row 30: one-way, left-center (cols 6-11)  ← 4 rows
  plat(range(6, 11)),
  W, // 31
  W, // 32
  W, // 33
  // Row 34: one-way, right-center (cols 14-19)  ← 4 rows
  plat(range(14, 19)),
  W, // 35
  W, // 36
  // Row 37: spike ledge — solid edges, spikes center  ← 3 rows
  [1,0,0,0,0,0,0,1,1,3,3,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  W, // 38
  W, // 39
  W, // 40
  // Row 41: one-way, right (cols 17-23)  ← 4 rows
  plat(range(17, 23)),
  W, // 42
  W, // 43
  W, // 44
  // Row 45: one-way, left (cols 3-8)  ← 4 rows
  plat(range(3, 8)),
  W, // 46
  W, // 47
  W, // 48
  // Row 49: one-way, center (cols 11-16)  ← 4 rows
  plat(range(11, 16)),
  W, // 50
  W, // 51
  W, // 52
  // Row 53: one-way, right (cols 19-25)  ← 4 rows
  plat(range(19, 25)),
  W, // 54
  W, // 55
  // Row 56: one-way, wide left — first step above floor  ← 3 rows
  plat(range(4, 13)),
  W, // 57
  W, // 58
  // Row 59: floor
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// [col, row] — enemies spawn one tile above their platform row
export const ENEMY_SPAWNS = [
  [6,  6],   // row 6 platform
  [22, 9],   // row 9 platform
  [12, 12],  // row 12 platform
  [18, 15],  // row 15 platform
  [22, 26],  // row 26 platform
  [9,  30],  // row 30 platform
  [16, 34],  // row 34 platform
  [20, 41],  // row 41 platform
  [6,  45],  // row 45 platform
  [22, 53],  // row 53 platform
];

// Goal floats just above the goal platform, inside the ceiling gap
export const GOAL_TILE = [14, 2];
