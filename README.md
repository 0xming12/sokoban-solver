# Sokoban Solver

[![make.fun](https://img.shields.io/badge/make.fun-bounty-blue)](https://make.fun/bounty/sokoban-solver-01-run-20261121)
[![Sokoban Solver](https://img.shields.io/badge/sokoban-solver-1,000,000-brightgreen)](https://make.fun/bounty/sokoban-solver-01-run-20261121)

A push-optimal Sokoban solver for the [make.fun Sokoban Solver bounty](https://make.fun/bounty/sokoban-solver-01-run-20261121). Dependency-free TypeScript, run with Node 22.

## How it works

Levels are split per room (boxes never leave their room). Each room is solved by a reverse layered BFS over "pulls" from the solved state: the fewest pulls equals the fewest pushes, so the result is push-optimal. Room solutions are concatenated and player walks between pushes are reconstructed by BFS.

## Verified results

- Practice set: **1,000,000 / 1,000,000** (all 5 levels push-optimal)
- 3 freshly generated level sets (15 levels): **1,000,000 each**
- Deterministic: two runs byte-identical
- Runtime: ~1.4s for the 5-level practice set (limit 60s)

## Usage

Reads `/input/<id>/level.txt`, writes `/output/<id>/solution.txt` (moves as `u`/`d`/`l`/`r`).
