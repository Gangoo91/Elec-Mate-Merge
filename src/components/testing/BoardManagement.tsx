import React from 'react';
import { DistributionBoard } from '@/types/distributionBoard';

interface BoardManagementProps {
  boards: DistributionBoard[];
  onAddBoard: () => void;
  /** Optional circuit total across all boards — shown in the factual line. */
  totalCircuits?: number;
}

/**
 * BoardManagement — section header between the schedule header and the board
 * list. Cert design language: recipe heading + factual line + text action.
 */
const BoardManagement: React.FC<BoardManagementProps> = ({
  boards,
  onAddBoard,
  totalCircuits,
}) => {
  const mainBoardCount = boards.filter((b) => b.order === 0).length;
  const subBoardCount = boards.filter((b) => b.order > 0).length;

  const subtitleParts: string[] = [
    `${boards.length} ${boards.length === 1 ? 'board' : 'boards'}`,
  ];
  if (mainBoardCount > 0) subtitleParts.push(`${mainBoardCount} main`);
  if (subBoardCount > 0) {
    subtitleParts.push(`${subBoardCount} sub-${subBoardCount === 1 ? 'board' : 'boards'}`);
  }
  if (typeof totalCircuits === 'number' && totalCircuits > 0) {
    subtitleParts.push(`${totalCircuits} circuit${totalCircuits === 1 ? '' : 's'}`);
  }

  return (
    <div className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">
          Distribution boards
        </h2>
        <p className="mt-0.5 text-[12px] text-white/60 tabular-nums">{subtitleParts.join(' · ')}</p>
      </div>
      <button
        onClick={onAddBoard}
        className="h-11 shrink-0 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-[12px] font-semibold text-white transition-colors hover:bg-white/[0.1] touch-manipulation active:scale-[0.97]"
      >
        Add sub-board
      </button>
    </div>
  );
};

export default BoardManagement;
