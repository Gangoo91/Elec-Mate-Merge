import React, { useMemo } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DistributionBoard,
  MAIN_BOARD_ID,
  createDefaultBoard,
  createMainBoard,
  generateBoardId,
  getNextSubBoardName,
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
  maxBoards = 10,
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
    const configuredBoards = currentBoards.filter(
      (b) => b.location && b.make && b.totalWays
    ).length;
    return { totalBoards, totalWays, configuredBoards };
  }, [currentBoards]);

  // Handle adding a new sub-board
  const handleAddBoard = () => {
    if (currentBoards.length >= maxBoards) return;

    const mainBoard = currentBoards.find((b) => b.order === 0);
    const newBoard = createDefaultBoard(
      generateBoardId(),
      getNextSubBoardName(currentBoards),
      currentBoards.length
    );
    // Smart: auto-populate "Supplied From" with main board name
    newBoard.suppliedFrom = mainBoard?.name || 'Main CU';
    onBoardsChange([...currentBoards, newBoard]);
  };

  // Handle removing a board
  const handleRemoveBoard = (boardId: string) => {
    if (boardId === MAIN_BOARD_ID) return; // Can't remove main board

    const updatedBoards = currentBoards
      .filter((b) => b.id !== boardId)
      .map((b, index) => ({ ...b, order: index })); // Re-order

    onBoardsChange(updatedBoards);
  };

  // Handle updating a board field
  const handleUpdateBoard = (
    boardId: string,
    field: keyof DistributionBoard | Record<string, any>,
    value?: any
  ) => {
    const updates = typeof field === 'string' ? { [field]: value } : field;
    const updatedBoards = currentBoards.map((b) =>
      b.id === boardId ? { ...b, ...updates, updatedAt: new Date() } : b
    );
    onBoardsChange(updatedBoards);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Stats */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-white/60">
          {stats.totalBoards} board{stats.totalBoards !== 1 ? 's' : ''}
          {stats.totalWays > 0 && ` · ${stats.totalWays} ways`}
        </span>
      </div>

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

      {/* Add Sub-Board */}
      {currentBoards.length < maxBoards && (
        <button
          onClick={handleAddBoard}
          className="w-full h-10 rounded-lg border border-dashed border-white/[0.10] text-[11px] font-medium text-white/60 hover:bg-white/[0.03] touch-manipulation active:scale-[0.98] flex items-center justify-center gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Sub-Board
        </button>
      )}

      {currentBoards.length >= maxBoards && (
        <p className="text-[10px] text-white/60 text-center">Maximum {maxBoards} boards</p>
      )}
    </div>
  );
};

export default MultiboardSetup;
