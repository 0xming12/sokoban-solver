import * as fs from 'node:fs';

function solve(board) {
 const stride = board.indexOf('\n') + 1;
 const steps = [-stride, stride, -1, 1];
 const player = board.indexOf('@');
 const hall = player - player % stride;
 let answer = 'l'.repeat(player - hall - 1);

 rooms: for (let door = hall + 1; board[door] !== '#'; door++, answer += 'r') {
  const floor = [door];
  let boxes = 0, goals = 0;
  for (const [i, cell] of floor.entries()) {
   const tile = board[cell];
   if ('$*'.includes(tile)) boxes |= 1 << i;
   if ('.*'.includes(tile)) goals |= 1 << i;
   for (const step of steps) {
    const next = cell + step;
    if ((next < hall || next >= hall + stride) && ' .$*'.includes(board[next]) && !floor.includes(next))
     floor.push(next);
   }
  }

  // Reverse BFS: walking stays in the same layer.
  const seen = new Set();
  for (let layer = [[goals, 0, '']]; layer.length;) {
   const pulls = [];
   for (const [mask, at, moves] of layer) {
    if (mask === boxes && at === 0) {
     answer += moves;
     continue rooms;
    }
    const before = seen.size;
    if (seen.add(mask * 32 + at).size === before) continue;
    for (const [dir, step] of steps.entries()) {
     const next = floor.indexOf(floor[at] + step);
     if (next < 0 || mask & (1 << next)) continue;
     const path = 'durl'[dir] + moves;
     layer.push([mask, next, path]);
     const box = floor.indexOf(floor[at] - step);
     if (box >= 0 && mask & (1 << box))
      pulls.push([mask ^ (1 << box) ^ (1 << at), next, path]);
    }
   }
   layer = pulls;
  }
  return '';
 }
 return answer.slice(0, -1);
}

const input = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const output = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
for (const id of fs.readdirSync(input)) {
 const dir = output + '/' + id;
 fs.mkdirSync(dir, { recursive: true });
 fs.writeFileSync(dir + '/solution.txt', solve(fs.readFileSync(input + '/' + id + '/level.txt', 'utf8')));
}
