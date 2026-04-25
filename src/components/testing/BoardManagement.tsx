import React from 'react';
import { DistributionBoard } from '@/types/distributionBoard';

interface BoardManagementProps {
  boards: DistributionBoard[];
  onAddBoard: () => void;
}

/**
 * BoardManagement — section header between the hero and the board list.
 * College editorial style: eyebrow + title + factual subtitle + text-link action.
 */
const BoardManagement: React.FC<BoardManagementProps> = ({ boards, onAddBoard }) => {
  const mainBoardCount = boards.filter((b) => b.order === 0).length;
  const subBoardCount = boards.filter((b) => b.order > 0).length;

  const subtitleParts: string[] = [
    `${boards.length} ${boards.length === 1 ? 'board' : 'boards'}`,
  ];
  if (mainBoardCount > 0) subtitleParts.push(`${mainBoardCount} main`);
  if (subBoardCount > 0) {
    subtitleParts.push(`${subBoardCount} sub-${subBoardCount === 1 ? 'board' : 'boards'}`);
  }

  return (
    <div className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Boards
        </p>
        <h2 className="mt-1.5 text-xl sm:text-2xl lg:text-[26px] font-semibold text-white tracking-tight leading-tight">
          Distribution boards
        </h2>
        <p className="mt-2 text-[12px] text-white tabular-nums">
          {subtitleParts.join(' · ')}
        </p>
      </div>
      <button
        onClick={onAddBoard}
        className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors shrink-0 touch-manipulation"
      >
        Add sub-board →
      </button>
    </div>
  );
};

export default BoardManagement;
