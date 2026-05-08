export function r(start, end, val) {
  const o = {};
  for (let c = start; c <= end; c++) o[c] = val;
  return o;
}
