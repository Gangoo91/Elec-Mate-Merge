import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Zap, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DistributionBoard,
  MAIN_BOARD_ID,
  createDefaultBoard,
  createMainBoard,
  generateBoardId,
  getNextSubBoardName
} from '@/types/distributionBoard';
import BoardSetupCard from './BoardSetupCard';

interface MultiboardSetupProps {
  boards: DistributionBoard[];
  onBoardsChange: (boards: DistributionBoard[]) => void;
  className?: string;
  maxBoards?: number;
}

/**
 * MultiboardSetup - Container for managing multiple distribution boards
 * Used in wizard Installation step for EIC/EICR forms
 */
const MultiboardSetup: React.FC<MultiboardSetupProps> = ({
  boards,
  onBoardsChange,
  className,
  maxBoards = 10
}) => {
  // Ensure we always have at least a main board
  const currentBoards = useMemo(() => {
    if (!boards || boards.length === 0) {
      return [createMainBoard()];
    }
    return [...boards].sort((a, b) => a.order - b.order);
  }, [boards]);

  // Initialize boards if empty
  React.useEffect(() => {
    if (!boards || boards.length === 0) {
      onBoardsChange([createMainBoard()]);
    }
  }, []);

  // Calculate summary stats
  const stats = useMemo(() => {
    const totalBoards = currentBoards.length;
    const totalWays = currentBoards.reduce((sum, b) => sum + (b.totalWays || 0), 0);
    const configuredBoards = currentBoards.filter(b =>
      b.location && b.make && b.totalWays
    ).length;
    return { totalBoards, totalWays, configuredBoards };
  }, [currentBoards]);

  // Handle adding a new sub-board
  const handleAddBoard = () => {
    if (currentBoards.length >= maxBoards) return;

    const newBoard = createDefaultBoard(
      generateBoardId(),
      getNextSubBoardName(currentBoards),
      currentBoards.length
    );
    onBoardsChange([...currentBoards, newBoard]);
  };

  // Handle removing a board
  const handleRemoveBoard = (boardId: string) => {
    if (boardId === MAIN_BOARD_ID) return; // Can't remove main board

    const updatedBoards = currentBoards
      .filter(b => b.id !== boardId)
      .map((b, index) => ({ ...b, order: index })); // Re-order

    onBoardsChange(updatedBoards);
  };

  // Handle updating a board field
  const handleUpdateBoard = (boardId: string, field: keyof DistributionBoard, value: any) => {
    const updatedBoards = currentBoards.map(b =>
      b.id === boardId ? { ...b, [field]: value, updatedAt: new Date() } : b
    );
    onBoardsChange(updatedBoards);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-base font-semibold text-white">Distribution Boards</h3>
        </div>

        {/* Summary Stats */}
        <div className="flex items-center gap-3 text-xs text-white/60">
          <span>{stats.totalBoards} {stats.totalBoards === 1 ? 'board' : 'boards'}</span>
          {stats.totalWays > 0 && (
            <span className="text-elec-yellow">{stats.totalWays} ways total</span>
          )}
        </div>
      </div>

      {/* Completion Hint */}
      {stats.configuredBoards < stats.totalBoards && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
          <span className="text-xs text-amber-300">
            Complete board details for accurate circuit protection calculations
          </span>
        </div>
      )}

      {/* Board Cards */}
      <div className="space-y-3">
        {currentBoards.map((board) => (
          <BoardSetupCard
            key={board.id}
            board={board}
            onUpdate={(field, value) => handleUpdateBoard(board.id, field, value)}
            onRemove={() => handleRemoveBoard(board.id)}
            isRemovable={board.id !== MAIN_BOARD_ID && board.order !== 0}
          />
        ))}
      </div>

      {/* Add Sub-Board Button */}
      {currentBoards.length < maxBoards && (
        <Button
          variant="outline"
          onClick={handleAddBoard}
          className="w-full h-12 touch-manipulation border-dashed border-white/20 text-white/70 hover:text-white hover:border-elec-yellow/50 hover:bg-elec-yellow/5"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Sub-Board
        </Button>
      )}

      {/* Max boards message */}
      {currentBoards.length >= maxBoards && (
        <p className="text-xs text-white/40 text-center">
          Maximum of {maxBoards} boards reached
        </p>
      )}
    </div>
  );
};

export default MultiboardSetup;
