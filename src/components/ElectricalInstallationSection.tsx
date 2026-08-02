import React, { useMemo } from 'react';
import { useEICRSmartForm } from '@/hooks/inspection/useEICRSmartForm';
import MultiboardSetup from '@/components/testing/MultiboardSetup';
import {
  DistributionBoard,
  createMainBoard,
  getBoardWays,
  getMainBoard,
  MAIN_BOARD_ID,
} from '@/types/distributionBoard';

// Fields managed by this section (for memoization comparison)
const ELECTRICAL_SECTION_FIELDS = [
  'distributionBoards',
  'cuLocation',
  'cuManufacturer',
  'cuType',
  'boardSize',
] as const;

interface ElectricalInstallationSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

/**
 * ElectricalInstallationSection - Best-in-class mobile form for electrical installation details
 * Edge-to-edge design with large touch targets and native app feel
 *
 * Performance optimised with React.memo for selective re-rendering
 */
const ElectricalInstallationSectionInner = ({
  formData,
  onUpdate,
}: ElectricalInstallationSectionProps) => {
  const { getWarningsForField } = useEICRSmartForm(formData);

  // Migrate legacy single-board data to multi-board format
  const boards: DistributionBoard[] = useMemo(() => {
    // If we already have distributionBoards, use them
    if (formData.distributionBoards && formData.distributionBoards.length > 0) {
      return formData.distributionBoards;
    }

    // Otherwise, create main board from legacy fields
    const mainBoard = createMainBoard();
    if (formData.cuLocation) mainBoard.location = formData.cuLocation;
    if (formData.cuManufacturer) mainBoard.make = formData.cuManufacturer;
    if (formData.cuType) mainBoard.type = formData.cuType as any;
    if (formData.boardSize) {
      const sizeMatch = formData.boardSize.match(/(\d+)/);
      if (sizeMatch) mainBoard.totalWays = parseInt(sizeMatch[1]);
    }
    return [mainBoard];
  }, [
    formData.distributionBoards,
    formData.cuLocation,
    formData.cuManufacturer,
    formData.cuType,
    formData.boardSize,
  ]);

  // Handle board changes - sync to both new and legacy fields for backward compatibility
  const handleBoardsChange = (newBoards: DistributionBoard[]) => {
    onUpdate('distributionBoards', newBoards);

    // ELE-830: main board is whichever sits at order 0 after reorder — fall
    // back to legacy id or first board if nothing resolves.
    const mainBoard =
      getMainBoard(newBoards) ||
      newBoards.find((b) => b.id === MAIN_BOARD_ID) ||
      newBoards[0];
    if (mainBoard) {
      if (mainBoard.location) onUpdate('cuLocation', mainBoard.location);
      if (mainBoard.make) onUpdate('cuManufacturer', mainBoard.make);
      if (mainBoard.type) onUpdate('cuType', mainBoard.type);
      const resolvedWays = getBoardWays(mainBoard);
      onUpdate('boardSize', resolvedWays ? `${resolvedWays}-way` : '');
    }
  };

  return (
    <div className={cardCn}>
      <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
        Distribution boards
      </h2>
      <MultiboardSetup boards={boards} onBoardsChange={handleBoardsChange} certType="eicr" />
      {/* Board ways vs circuits warnings */}
      {boards.map((b) =>
        getWarningsForField(`board-${b.id}`).map((w, i) => (
          <p key={`${b.id}-${i}`} className="text-[11px] text-elec-yellow mt-1">
            {w.message}
          </p>
        ))
      )}
    </div>
  );
};

// Memoized component - only re-renders when ELECTRICAL_SECTION_FIELDS change
const ElectricalInstallationSection = React.memo(
  ElectricalInstallationSectionInner,
  (prevProps, nextProps) => {
    // Compare only the fields this section cares about
    for (const field of ELECTRICAL_SECTION_FIELDS) {
      const prevVal = prevProps.formData[field];
      const nextVal = nextProps.formData[field];

      // Deep compare for arrays (distributionBoards)
      if (Array.isArray(prevVal) || Array.isArray(nextVal)) {
        if (JSON.stringify(prevVal) !== JSON.stringify(nextVal)) {
          return false; // Re-render needed
        }
      } else if (prevVal !== nextVal) {
        return false; // Re-render needed
      }
    }
    return prevProps.onUpdate === nextProps.onUpdate;
  }
);

ElectricalInstallationSection.displayName = 'ElectricalInstallationSection';

export default ElectricalInstallationSection;
