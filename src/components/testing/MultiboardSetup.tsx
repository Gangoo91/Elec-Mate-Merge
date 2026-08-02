import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  DistributionBoard,
  MAIN_BOARD_ID,
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
  /** EICR hides Model/From and the duplicate Incoming Device section (ELE-1106/1107). */
  certType?: 'eicr' | 'eic';
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
  certType,
}) => {
  // Ensure we always have at least a main board. Display-only fallback — no
  // eager write: a mount-time onBoardsChange raced async form hydration on
  // saved certs and could dirty the cert with a default board. The fallback
  // main board is persisted the first time the user actually edits or adds.
  const currentBoards = useMemo(() => {
    if (!boards || boards.length === 0) {
      return [createMainBoard()];
    }
    return sortBoards(boards);
  }, [boards]);

  // Legacy-tolerant main-ness: order === 0 OR the legacy fixed id (matches
  // BoardSection/BoardSetupCard) so old certs without order data keep their
  // main CU protected.
  const isMainBoardCompat = (b: DistributionBoard) => isMainBoard(b) || b.id === MAIN_BOARD_ID;

  // Calculate summary stats
  const stats = useMemo(() => {
    const totalBoards = currentBoards.length;
    const totalWays = currentBoards.reduce((sum, b) => sum + (getBoardWays(b) || 0), 0);
    return { totalBoards, totalWays };
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

  // Handle removing a board — guard on supply-chain position or legacy main ID
  const handleRemoveBoard = (boardId: string) => {
    const board = currentBoards.find((b) => b.id === boardId);
    if (!board || isMainBoardCompat(board)) return; // Can't remove main board

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
      {/* Section heading + stats — matches the sibling SectionHeading recipe
          and the testing page's "Distribution boards" naming. EIC only: the
          EICR hosts render their own SectionTitle above this component, so an
          unconditional heading would double up there. */}
      <div>
        {certType === 'eic' && (
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            Distribution boards
          </h2>
        )}
        <p className="mt-0.5 text-[12px] text-white/85 tabular-nums">
          {stats.totalBoards} board{stats.totalBoards !== 1 ? 's' : ''}
          {stats.totalWays > 0 && ` · ${stats.totalWays} ways`}
        </p>
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
            isRemovable={!isMainBoardCompat(board)}
            certType={certType}
          />
        ))}
      </div>

      {/* Add Sub-Board */}
      {currentBoards.length < maxBoards && (
        <button
          onClick={handleAddBoard}
          className="w-full h-11 rounded-xl border border-dashed border-white/[0.12] bg-white/[0.06] text-[13px] font-semibold text-white touch-manipulation active:scale-[0.98] flex items-center justify-center"
        >
          Add sub-board
        </button>
      )}

      {currentBoards.length >= maxBoards && (
        <p className="text-[12px] text-white/85 text-center">Maximum {maxBoards} boards</p>
      )}
    </div>
  );
};

export default MultiboardSetup;
