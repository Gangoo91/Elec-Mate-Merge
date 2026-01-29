/**
 * Distribution Board Type Definitions
 * Supports multiple boards (Main CU + Sub-DBs) per installation
 */

// Board type options
export type BoardType = 'metal-clad' | 'plastic' | 'flush-mount' | 'surface-mount';

// Common board manufacturers
export const BOARD_MANUFACTURERS = [
  'Hager',
  'MK Electric',
  'Schneider Electric',
  'Fusebox',
  'Wylex',
  'Crabtree',
  'Contactum',
  'BG Electrical',
  'Eaton',
  'ABB',
  'Legrand',
  'Other'
] as const;

// Board type display names
export const BOARD_TYPES: { value: BoardType; label: string }[] = [
  { value: 'metal-clad', label: 'Metal Clad' },
  { value: 'plastic', label: 'Plastic' },
  { value: 'flush-mount', label: 'Flush Mount' },
  { value: 'surface-mount', label: 'Surface Mount' }
];

// Common board locations
export const BOARD_LOCATIONS = [
  'Hallway',
  'Kitchen',
  'Utility Room',
  'Garage',
  'Cupboard',
  'Basement',
  'Loft',
  'Plant Room',
  'External',
  'Other'
] as const;

// Board size options (number of ways)
export const BOARD_SIZES = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24] as const;

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

  // SPD Type Details (IET Form - tick boxes for T1, T2, T3)
  spdT1: boolean;                    // Type 1 SPD installed
  spdT2: boolean;                    // Type 2 SPD installed
  spdT3: boolean;                    // Type 3 SPD installed

  // Board details (for wizard collection)
  make?: string;                     // Manufacturer (from BOARD_MANUFACTURERS)
  model?: string;                    // Model number/name
  type?: BoardType;                  // Board enclosure type
  totalWays?: number;                // Board size (from BOARD_SIZES)

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
  spdT1: false,
  spdT2: false,
  spdT3: false,
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
