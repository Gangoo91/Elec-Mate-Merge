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
  'CED',
  'Eaton',
  'ABB',
  'Legrand',
  'Other',
] as const;

// Board type display names
export const BOARD_TYPES: { value: BoardType; label: string }[] = [
  { value: 'metal-clad', label: 'Metal Clad' },
  { value: 'plastic', label: 'Plastic' },
  { value: 'flush-mount', label: 'Flush Mount' },
  { value: 'surface-mount', label: 'Surface Mount' },
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
  'Other',
] as const;

// Board size options (number of ways)
export const BOARD_SIZES = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24] as const;

export interface DistributionBoard {
  id: string;
  name: string; // "Main CU", "Sub-DB1", "Sub-DB2"
  reference: string; // User-editable reference
  location?: string; // Physical location description
  order: number; // Display order (0 = main, 1+ = sub-boards)

  // Verification Data (per board)
  zdb: string; // Earth fault loop impedance at board (Ω)
  ipf: string; // Prospective fault current (kA)
  confirmedCorrectPolarity: boolean;
  confirmedPhaseSequence: boolean;
  ringFinalCircuitConfirmed: boolean; // A4:2026 — Ring final circuit: Confirmed
  spdOperationalStatus: boolean;
  spdNA: boolean;

  // SPD Type Details (IET Form - tick boxes for T1, T2, T3)
  spdT1: boolean; // Type 1 SPD installed
  spdT2: boolean; // Type 2 SPD installed
  spdT3: boolean; // Type 3 SPD installed

  // SPD Details (make, model, location, rated current)
  spdMake?: string;
  spdModel?: string;
  spdLocation?: string;
  spdRatedCurrentKa?: string;

  // Board details (for wizard collection)
  make?: string; // Manufacturer (from BOARD_MANUFACTURERS)
  model?: string; // Model number/name
  type?: BoardType; // Board enclosure type
  totalWays?: number; // Board size (from BOARD_SIZES)
  totalWaysCustom?: string; // Custom board size when "Other" is selected
  boardMounting?: string; // Separate mounting detail when tracked independently

  // Schedule page headers (BS 7671 model form)
  suppliedFrom?: string; // "Main DB", "Sub-DB1" - which board feeds this one
  incomingDeviceBsEn?: string; // BS EN standard of incoming protective device
  incomingDeviceType?: string; // Type of incoming protective device (MCB, MCCB, etc.)
  incomingDeviceRating?: string; // Rating (A) of incoming protective device
  incomingRcdMa?: string;
  incomingRcdMs?: string;

  // Main switch details (per-board, for EICR schedule)
  mainSwitchBsEn?: string; // BS EN standard of main switch
  mainSwitchType?: string; // Type of main switch (e.g. isolator, RCCB, RCD)
  mainSwitchRating?: string; // Rating (A) of main switch
  mainSwitchPoles?: string; // Number of poles (e.g. SP, DP, TP, TPN)
  mainSwitchRcdMa?: string;
  mainSwitchRcdMs?: string;

  // Test instruments used (per-board, A4:2026 Schedule of Test Results)
  testInstrumentMultifunction?: string; // Serial / asset number
  testInstrumentContinuity?: string;
  testInstrumentInsulation?: string;
  testInstrumentEli?: string; // Earth fault loop impedance
  testInstrumentRcd?: string;
  testInstrumentEarthElectrode?: string;

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
  name: string = 'DB',
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
  ringFinalCircuitConfirmed: false,
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
  createDefaultBoard(MAIN_BOARD_ID, 'DB', 0);

const parseWays = (value: unknown): number | undefined => {
  if (value === null || value === undefined || value === '') return undefined;
  const parsed =
    typeof value === 'number' ? value : Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
};

export const getBoardWays = (
  board?: Partial<DistributionBoard> & { ways?: string | number }
): number | undefined => {
  if (!board) return undefined;
  return (
    parseWays(board.totalWays) ??
    parseWays(board.totalWaysCustom) ??
    parseWays(board.ways)
  );
};

/**
 * Generate next sub-board name based on existing boards
 */
export const getNextSubBoardName = (boards: DistributionBoard[]): string => {
  const subBoards = boards.filter((b) => b.name.startsWith('Sub-DB'));
  const nextNumber = subBoards.length + 1;
  return `Sub-DB${nextNumber}`;
};

/**
 * Generate unique ID for a new board
 */
export const generateBoardId = (): string =>
  `board-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
