import React, { useState, useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormSelectSheet from '@/components/ui/form-select-sheet';
import { Cable, Gauge, CircuitBoard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import { useEICRSmartForm } from '@/hooks/inspection/useEICRSmartForm';
import MultiboardSetup from '@/components/testing/MultiboardSetup';
import {
  FieldLimitationBadge,
  FieldNotesInput,
  isFieldMarker,
} from '@/components/field-limitations';
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

const SectionTitle = ({ title }: { icon?: any; title: string; color?: string; isMobile?: boolean }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const FormField = ({
  label,
  required,
  hint,
  trailing,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center justify-between gap-2 mb-1.5">
      <Label className="text-white text-xs">
        {label}{required && ' *'}
      </Label>
      {trailing}
    </div>
    {children}
    {hint && <span className="text-[10px] text-white block mt-1">{hint}</span>}
  </div>
);

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
  const isMobile = useIsMobile();
  const haptic = useHaptic();
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
    <div className={cn('space-y-6', '')}>
      {/* Distribution Boards Section */}
      <div>
        <SectionTitle title="Distribution Boards" />
        <div className={cn('py-4', '')}>
          <MultiboardSetup boards={boards} onBoardsChange={handleBoardsChange} certType="eicr" />
          {/* Board ways vs circuits warnings */}
          {boards.map((b) => getWarningsForField(`board-${b.id}`).map((w, i) => (
            <p key={`${b.id}-${i}`} className="text-[10px] text-amber-400/80 mt-1">{w.message}</p>
          )))}
        </div>
      </div>
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
