import React, { useMemo } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DistributionBoard,
  createDefaultBoard,
  createMainBoard,
  generateBoardId,
  getBoardWays,
  getNextSubBoardName,
  isMainBoard,
  sortBoards,
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
    return sortBoards(boards);
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
    const totalWays = currentBoards.reduce((sum, b) => sum + (getBoardWays(b) || 0), 0);
    const configuredBoards = currentBoards.filter(
      (b) => b.location && b.make && getBoardWays(b)
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
    newBoard.suppliedFrom = mainBoard?.name || 'DB';
    onBoardsChange([...currentBoards, newBoard]);
  };

  // Handle removing a board — guard on supply-chain position, not legacy ID
  const handleRemoveBoard = (boardId: string) => {
    const board = currentBoards.find((b) => b.id === boardId);
    if (!board || isMainBoard(board)) return; // Can't remove main board

    const updatedBoards = currentBoards
      .filter((b) => b.id !== boardId)
      .map((b, index) => ({ ...b, order: index })); // Re-order

    onBoardsChange(updatedBoards);
  };

  // Swap adjacent boards' `order` values (ELE-830 Phase 1).
  // The main board (order===0) is movable too — moving a sub-board UP into the
  // main position is the whole point of this feature (commercial supply-chain
  // flows where the incomer is added late).
  const handleMoveBoard = (boardId: string, direction: 'up' | 'down') => {
    const sorted = sortBoards(currentBoards);
    const idx = sorted.findIndex((b) => b.id === boardId);
    if (idx < 0) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const a = sorted[idx];
    const b = sorted[swapIdx];
    const updated = currentBoards.map((board) => {
      if (board.id === a.id) return { ...board, order: b.order, updatedAt: new Date() };
      if (board.id === b.id) return { ...board, order: a.order, updatedAt: new Date() };
      return board;
    });
    onBoardsChange(updated);
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
        <span className="text-[10px] text-white">
          {stats.totalBoards} board{stats.totalBoards !== 1 ? 's' : ''}
          {stats.totalWays > 0 && ` · ${stats.totalWays} ways`}
        </span>
      </div>

      {/* Board Cards */}
      <div className="space-y-3">
        {currentBoards.map((board, index) => (
          <BoardSetupCard
            key={board.id}
            board={board}
            onUpdate={(field, value) => handleUpdateBoard(board.id, field, value)}
            onRemove={() => handleRemoveBoard(board.id)}
            onMoveUp={() => handleMoveBoard(board.id, 'up')}
            onMoveDown={() => handleMoveBoard(board.id, 'down')}
            isFirst={index === 0}
            isLast={index === currentBoards.length - 1}
            isRemovable={!isMainBoard(board)}
          />
        ))}
      </div>

      {/* Add Sub-Board */}
      {currentBoards.length < maxBoards && (
        <button
          onClick={handleAddBoard}
          className="w-full h-10 rounded-lg border border-dashed border-white/[0.10] text-[11px] font-medium text-white hover:bg-white/[0.03] touch-manipulation active:scale-[0.98] flex items-center justify-center gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Sub-Board
        </button>
      )}

      {currentBoards.length >= maxBoards && (
        <p className="text-[10px] text-white text-center">Maximum {maxBoards} boards</p>
      )}
    </div>
  );
};

export default MultiboardSetup;
