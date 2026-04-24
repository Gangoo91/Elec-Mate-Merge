/**
 * Circuit Reorder Utilities — ELE-857
 *
 * Move circuits up/down within the schedule of tests. Reordering is scoped to a
 * single board (boardId) so cross-board moves don't accidentally happen. After a
 * move the circuitNumber column is re-indexed as C1, C2, C3… within that board
 * so the schedule stays consistent with the PDF output.
 */

import { TestResult } from '@/types/testResult';
import { MAIN_BOARD_ID } from '@/types/distributionBoard';

const getBoardId = (circuit: TestResult): string => circuit.boardId || MAIN_BOARD_ID;

const renumberBoard = (circuits: TestResult[], boardId: string): TestResult[] => {
  let n = 0;
  return circuits.map((c) => {
    if (getBoardId(c) !== boardId) return c;
    n += 1;
    // circuitNumber is the raw number ("1", "2"...) — some scanners store "C1" style.
    // circuitDesignation is the display badge ("C1", "C2"...). The desktop row
    // and mobile card both render circuitDesignation, so keep both in sync.
    return { ...c, circuitNumber: String(n), circuitDesignation: `C${n}` };
  });
};

const move = (circuits: TestResult[], id: string, direction: -1 | 1): TestResult[] => {
  const targetIndex = circuits.findIndex((c) => c.id === id);
  if (targetIndex === -1) return circuits;

  const target = circuits[targetIndex];
  const boardId = getBoardId(target);

  const sameBoardIndices = circuits
    .map((c, i) => ({ i, sameBoard: getBoardId(c) === boardId }))
    .filter((x) => x.sameBoard)
    .map((x) => x.i);

  const positionWithinBoard = sameBoardIndices.indexOf(targetIndex);
  const swapWithBoardPos = positionWithinBoard + direction;

  if (swapWithBoardPos < 0 || swapWithBoardPos >= sameBoardIndices.length) {
    return circuits;
  }

  const swapIndex = sameBoardIndices[swapWithBoardPos];
  const next = [...circuits];
  [next[targetIndex], next[swapIndex]] = [next[swapIndex], next[targetIndex]];

  return renumberBoard(next, boardId);
};

export const moveCircuitUp = (circuits: TestResult[], id: string): TestResult[] =>
  move(circuits, id, -1);

export const moveCircuitDown = (circuits: TestResult[], id: string): TestResult[] =>
  move(circuits, id, 1);

export const canMoveCircuitUp = (circuits: TestResult[], id: string): boolean => {
  const idx = circuits.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  const boardId = getBoardId(circuits[idx]);
  const firstOfBoard = circuits.findIndex((c) => getBoardId(c) === boardId);
  return idx !== firstOfBoard;
};

export const canMoveCircuitDown = (circuits: TestResult[], id: string): boolean => {
  const idx = circuits.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  const boardId = getBoardId(circuits[idx]);
  const lastOfBoard = [...circuits]
    .map((c, i) => ({ i, sameBoard: getBoardId(c) === boardId }))
    .filter((x) => x.sameBoard)
    .pop()?.i;
  return idx !== lastOfBoard;
};
