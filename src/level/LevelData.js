// Tile IDs: 0=empty, 1=solid ground, 2=one-way platform
// World: 30 wide x 60 tall tiles = 480x960px
//
// Section overview (bottom → top):
//   INTRO SECTION  rows 59–41 : wide intro + ascending right staircase
//   MIDDLE SECTION rows 38–26 : wide rest platform, center pivots, mid platforms
//   UPPER SECTION  rows 23–8  : left-descending staircase, three approach platforms
//   GOAL           row 4      : goal platform (one-way, cols 10-17)
//
// All adjacent platform jumps verified ≤ 44px horizontal gap (58px max at 3-row height)

const W       = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
const FLOOR   = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
const CEIL    = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

// Intro section (bottom)
const INTRO   = [1,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]; // cols 2-14
const STAIR0  = [1,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]; // cols 2-5
const STAIR1  = [1,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]; // cols 8-10
const STAIR2  = [1,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1]; // cols 13-15
const STAIR3  = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,1]; // cols 18-20
const STAIR4  = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,1]; // cols 23-25

// Middle section
const RREST   = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,1]; // cols 15-26
const CENTERL = [1,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]; // cols 9-14
const CENTERR = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,1]; // cols 17-22
const LMID    = [1,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]; // cols 8-13
const RMID    = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,1]; // cols 15-21

// Upper staircase (descending left, then turn to goal approach)
const STAIRA  = [1,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]; // cols 12-14
const STAIRB  = [1,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]; // cols 8-10
const STAIRC  = [1,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]; // cols 4-6

// Goal approach
const APP1    = [1,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1]; // cols 9-15
const APP2    = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,1]; // cols 14-20
const APP3    = [1,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1]; // cols 8-15
const GOAL    = [1,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,1]; // cols 10-17

export const LEVEL_DATA = [
  CEIL,    // 0  — ceiling (gap at cols 14-15)
  W,       // 1
  W,       // 2
  W,       // 3
  GOAL,    // 4  — goal platform
  W,       // 5
  W,       // 6
  W,       // 7
  APP3,    // 8  — approach 3 (cols 8-15)
  W,       // 9
  W,       // 10
  APP2,    // 11 — approach 2 (cols 14-20)
  W,       // 12
  W,       // 13
  APP1,    // 14 — approach 1 (cols 9-15)
  W,       // 15
  W,       // 16
  STAIRC,  // 17 — stair C (cols 4-6)
  W,       // 18
  W,       // 19
  STAIRB,  // 20 — stair B (cols 8-10)
  W,       // 21
  W,       // 22
  STAIRA,  // 23 — stair A (cols 12-14)
  W,       // 24
  W,       // 25
  RMID,    // 26 — right-mid (cols 15-21)
  W,       // 27
  W,       // 28
  LMID,    // 29 — left-mid (cols 8-13)
  W,       // 30
  W,       // 31
  CENTERR, // 32 — center-right (cols 17-22)
  W,       // 33
  W,       // 34
  CENTERL, // 35 — center-left (cols 9-14)
  W,       // 36
  W,       // 37
  RREST,   // 38 — wide right rest (cols 15-26)
  W,       // 39
  W,       // 40
  STAIR4,  // 41 — ascending stair 4 (cols 23-25)
  W,       // 42
  W,       // 43
  STAIR3,  // 44 — ascending stair 3 (cols 18-20)
  W,       // 45
  W,       // 46
  STAIR2,  // 47 — ascending stair 2 (cols 13-15)
  W,       // 48
  W,       // 49
  STAIR1,  // 50 — ascending stair 1 (cols 8-10)
  W,       // 51
  W,       // 52
  STAIR0,  // 53 — ascending stair 0 (cols 2-5)
  W,       // 54
  W,       // 55
  INTRO,   // 56 — wide intro (cols 2-14)
  W,       // 57
  W,       // 58
  FLOOR,   // 59
];

// [col, row] — walking enemies spawn just above their platform row
export const ENEMY_SPAWNS = [
  [8,  56],  // INTRO wide platform
  [21, 38],  // RREST wide platform
  [18, 26],  // RMID
  [12, 14],  // APP1
];

// [x_px, y_px, patrol_range_px] — flying enemies patrol mid-air
export const FLYING_SPAWNS = [
  [220, 33 * 16, 70],  // between CENTER-R (row 32) and CENTER-L (row 35)
  [240, 24 * 16, 70],  // between STAIR-A (row 23) and RMID (row 26)
  [210, 12 * 16, 60],  // between APP1 (row 14) and APP2 (row 11)
];

// [col, row] — goal pickup position (row 3 = empty space above GOAL platform row 4)
export const GOAL_TILE = [14, 3];
