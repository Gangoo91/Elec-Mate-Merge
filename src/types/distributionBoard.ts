/**
 * Distribution Board Type Definitions
 * Supports multiple boards (Main CU + Sub-DBs) per installation
 */

export interface DistributionBoard {
  id: string;
  name: string;                      // "Main CU", "Sub-DB1", "Sub-DB2"
  reference: string;                 // User-editable reference
  location?: string;                 // Physical location description
  order: number;                     // Display order (0 = main, 1+ = sub-boards)

  // Verification Data (per board)
  zdb: string;                       // Earth fault loop impedance at board (Ω)
  ipf: string;                       // Prospective fault current (kA)
  confirmedCorrectPolarity: boolean;
  confirmedPhaseSequence: boolean;
  spdOperationalStatus: boolean;
  spdNA: boolean;

  // Board metadata
  make?: string;
  model?: string;
  totalWays?: number;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

// Default main board ID for backward compatibility
export const MAIN_BOARD_ID = 'main-cu';

/**
 * Create a new distribution board with default values
 */
export const createDefaultBoard = (
  id: string,
  name: string = 'Main CU',
  order: number = 0
): DistributionBoard => ({
  id,
  name,
  reference: name,
  order,
  zdb: '',
  ipf: '',
  confirmedCorrectPolarity: false,
  confirmedPhaseSequence: false,
  spdOperationalStatus: false,
  spdNA: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});

/**
 * Create the default main consumer unit board
 */
export const createMainBoard = (): DistributionBoard =>
  createDefaultBoard(MAIN_BOARD_ID, 'Main CU', 0);

/**
 * Generate next sub-board name based on existing boards
 */
export const getNextSubBoardName = (boards: DistributionBoard[]): string => {
  const subBoards = boards.filter(b => b.name.startsWith('Sub-DB'));
  const nextNumber = subBoards.length + 1;
  return `Sub-DB${nextNumber}`;
};

/**
 * Generate unique ID for a new board
 */
export const generateBoardId = (): string =>
  `board-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
