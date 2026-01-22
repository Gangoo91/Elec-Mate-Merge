/**
 * Board Migration Utilities
 * Handles migration from legacy single-board to multi-board structure
 * and provides helper functions for board operations
 */

import {
  DistributionBoard,
  MAIN_BOARD_ID,
  createDefaultBoard,
  createMainBoard,
  getNextSubBoardName,
  generateBoardId,
} from '@/types/distributionBoard';
import { TestResult } from '@/types/testResult';

export interface MultiboardFormData {
  distributionBoards: DistributionBoard[];
  scheduleOfTests: TestResult[];
}

/**
 * Migrate legacy single-board data to multi-board structure
 * Preserves all existing data while adding board support
 */
export const migrateToMultiBoard = (formData: any): MultiboardFormData => {
  // If already migrated (has distributionBoards array), ensure all fields exist
  if (formData.distributionBoards?.length > 0) {
    // Ensure all boards have required fields (handles boards saved before new fields were added)
    const boardsWithDefaults = formData.distributionBoards.map((board: Partial<DistributionBoard>) => ({
      // Start with defaults from createDefaultBoard pattern
      id: board.id || MAIN_BOARD_ID,
      name: board.name || 'Board',
      reference: board.reference || board.name || 'Board',
      order: board.order ?? 0,
      zdb: board.zdb || '',
      ipf: board.ipf || '',
      confirmedCorrectPolarity: board.confirmedCorrectPolarity ?? false,
      confirmedPhaseSequence: board.confirmedPhaseSequence ?? false,
      spdOperationalStatus: board.spdOperationalStatus ?? false,
      spdNA: board.spdNA ?? false,
      // Optional fields
      location: board.location,
      make: board.make,
      model: board.model,
      type: board.type,
      totalWays: board.totalWays,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    }));

    return {
      distributionBoards: boardsWithDefaults,
      scheduleOfTests: (formData.scheduleOfTests || []).map((circuit: TestResult) => ({
        ...circuit,
        boardId: circuit.boardId || MAIN_BOARD_ID,
      })),
    };
  }

  // Create main board from legacy verification data
  const mainBoard = createMainBoard();
  mainBoard.reference = formData.dbReference || 'Main CU';
  mainBoard.zdb = formData.zdb || '';
  mainBoard.ipf = formData.ipf || '';
  mainBoard.confirmedCorrectPolarity = formData.confirmedCorrectPolarity || false;
  mainBoard.confirmedPhaseSequence = formData.confirmedPhaseSequence || false;
  mainBoard.spdOperationalStatus = formData.spdOperationalStatus || false;
  mainBoard.spdNA = formData.spdNA || false;

  // Copy board metadata if available
  if (formData.boardMake) mainBoard.make = formData.boardMake;
  if (formData.boardModel) mainBoard.model = formData.boardModel;
  if (formData.boardSize) mainBoard.totalWays = parseInt(formData.boardSize) || undefined;

  // Assign all existing circuits to main board
  const migratedCircuits = (formData.scheduleOfTests || []).map((circuit: TestResult) => ({
    ...circuit,
    boardId: circuit.boardId || MAIN_BOARD_ID,
  }));

  return {
    distributionBoards: [mainBoard],
    scheduleOfTests: migratedCircuits,
  };
};

/**
 * Get board by ID with fallback to main board
 */
export const getBoardById = (
  boards: DistributionBoard[],
  boardId: string
): DistributionBoard | undefined => {
  return boards.find(b => b.id === boardId) || boards.find(b => b.order === 0);
};

/**
 * Get circuits for a specific board
 */
export const getCircuitsForBoard = (
  circuits: TestResult[],
  boardId: string
): TestResult[] => {
  return circuits.filter(c => (c.boardId || MAIN_BOARD_ID) === boardId);
};

/**
 * Add a new sub-board
 */
export const addSubBoard = (boards: DistributionBoard[]): DistributionBoard[] => {
  const newBoard = createDefaultBoard(
    generateBoardId(),
    getNextSubBoardName(boards),
    boards.length
  );
  return [...boards, newBoard];
};

/**
 * Remove a board and optionally move its circuits to main board
 * Cannot remove the main board
 */
export const removeBoard = (
  boards: DistributionBoard[],
  circuits: TestResult[],
  boardId: string
): { boards: DistributionBoard[]; circuits: TestResult[] } => {
  // Cannot remove main board
  if (boardId === MAIN_BOARD_ID) {
    return { boards, circuits };
  }

  const boardToRemove = boards.find(b => b.id === boardId);
  if (!boardToRemove) {
    return { boards, circuits };
  }

  // Move circuits from removed board to main board
  const updatedCircuits = circuits.map(c =>
    c.boardId === boardId ? { ...c, boardId: MAIN_BOARD_ID } : c
  );

  // Remove the board and reorder remaining boards
  const remainingBoards = boards
    .filter(b => b.id !== boardId)
    .map((b, index) => ({ ...b, order: index }));

  return {
    boards: remainingBoards,
    circuits: updatedCircuits,
  };
};

/**
 * Update a board's verification data
 */
export const updateBoard = (
  boards: DistributionBoard[],
  boardId: string,
  updates: Partial<DistributionBoard>
): DistributionBoard[] => {
  return boards.map(b =>
    b.id === boardId
      ? { ...b, ...updates, updatedAt: new Date() }
      : b
  );
};

/**
 * Move a circuit to a different board
 */
export const moveCircuitToBoard = (
  circuits: TestResult[],
  circuitId: string,
  newBoardId: string
): TestResult[] => {
  return circuits.map(c =>
    c.id === circuitId ? { ...c, boardId: newBoardId } : c
  );
};

/**
 * Get board statistics
 */
export const getBoardStatistics = (
  boards: DistributionBoard[],
  circuits: TestResult[]
): { boardId: string; name: string; circuitCount: number; completedCount: number }[] => {
  return boards.map(board => {
    const boardCircuits = getCircuitsForBoard(circuits, board.id);
    const completedCount = boardCircuits.filter(c =>
      c.zs && c.polarity && (c.insulationLiveEarth || c.insulationResistance)
    ).length;

    return {
      boardId: board.id,
      name: board.name,
      circuitCount: boardCircuits.length,
      completedCount,
    };
  });
};

/**
 * Reorder boards (e.g., after drag-and-drop)
 * Main board always stays at order 0
 */
export const reorderBoards = (
  boards: DistributionBoard[],
  fromIndex: number,
  toIndex: number
): DistributionBoard[] => {
  // Cannot move main board
  if (fromIndex === 0 || toIndex === 0) {
    return boards;
  }

  const result = [...boards];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);

  // Update order values
  return result.map((board, index) => ({
    ...board,
    order: index,
  }));
};

/**
 * Export helper: Format boards data for formData update
 */
export const formatBoardsForFormData = (
  boards: DistributionBoard[],
  circuits: TestResult[]
): any => {
  // For backward compatibility, also set legacy single-board fields from main board
  const mainBoard = boards.find(b => b.order === 0) || boards[0];

  return {
    distributionBoards: boards,
    scheduleOfTests: circuits,
    // Legacy fields (for PDF export and backward compatibility)
    dbReference: mainBoard?.reference || '',
    zdb: mainBoard?.zdb || '',
    ipf: mainBoard?.ipf || '',
    confirmedCorrectPolarity: mainBoard?.confirmedCorrectPolarity || false,
    confirmedPhaseSequence: mainBoard?.confirmedPhaseSequence || false,
    spdOperationalStatus: mainBoard?.spdOperationalStatus || false,
    spdNA: mainBoard?.spdNA || false,
  };
};
