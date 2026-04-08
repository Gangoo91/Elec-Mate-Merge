import React from 'react';
import { Plus } from 'lucide-react';
import { DistributionBoard } from '@/types/distributionBoard';

interface BoardManagementProps {
  boards: DistributionBoard[];
  onAddBoard: () => void;
}

const BoardManagement: React.FC<BoardManagementProps> = ({ boards, onAddBoard }) => {
  const subBoardCount = boards.filter((b) => b.order > 0).length;

  return (
    <div className="space-y-3">
      <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10" />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xs font-medium text-white uppercase tracking-wider">
            Distribution Boards
          </h2>
          <p className="text-[10px] text-white/40 mt-0.5">
            {boards.length} board{boards.length !== 1 ? 's' : ''}
            {subBoardCount > 0 &&
              ` · ${subBoardCount} sub-board${subBoardCount !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button
          onClick={onAddBoard}
          className="h-9 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-white/50 touch-manipulation active:scale-[0.98] flex items-center gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          Sub-Board
        </button>
      </div>
    </div>
  );
};

export default BoardManagement;
