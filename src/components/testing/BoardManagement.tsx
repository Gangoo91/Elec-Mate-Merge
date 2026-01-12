import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, CircuitBoard } from 'lucide-react';
import { DistributionBoard } from '@/types/distributionBoard';

interface BoardManagementProps {
  boards: DistributionBoard[];
  onAddBoard: () => void;
}

/**
 * BoardManagement - Header component for managing distribution boards
 * Provides "Add Sub-Board" button and board count summary
 */
const BoardManagement: React.FC<BoardManagementProps> = ({
  boards,
  onAddBoard,
}) => {
  const subBoardCount = boards.filter(b => b.order > 0).length;

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl border border-white/10">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-elec-yellow/20">
          <CircuitBoard className="h-5 w-5 text-elec-yellow" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Distribution Boards</h3>
          <p className="text-sm text-white/50">
            {boards.length} board{boards.length !== 1 ? 's' : ''}
            {subBoardCount > 0 && ` (${subBoardCount} sub-board${subBoardCount !== 1 ? 's' : ''})`}
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="h-9 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/50"
        onClick={onAddBoard}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Sub-Board
      </Button>
    </div>
  );
};

export default BoardManagement;
