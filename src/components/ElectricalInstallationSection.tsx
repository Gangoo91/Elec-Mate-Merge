import React, { useState, useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Cable, Gauge, CircuitBoard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import { useEICRSmartForm } from '@/hooks/inspection/useEICRSmartForm';
import MultiboardSetup from '@/components/testing/MultiboardSetup';
import { DistributionBoard, createMainBoard, MAIN_BOARD_ID } from '@/types/distributionBoard';

// Fields managed by this section (for memoization comparison)
const ELECTRICAL_SECTION_FIELDS = [
  'distributionBoards',
  'cuLocation',
  'cuManufacturer',
  'cuType',
  'boardSize',
  'intakeCableSize',
  'intakeCableType',
  'tailsSize',
  'tailsLength',
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
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">
      {label}{required && ' *'}
    </Label>
    {children}
    {hint && <p className="text-[10px] text-white mt-1">{hint}</p>}
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

    // Also update legacy fields from main board for backward compatibility
    const mainBoard = newBoards.find((b) => b.id === MAIN_BOARD_ID) || newBoards[0];
    if (mainBoard) {
      if (mainBoard.location) onUpdate('cuLocation', mainBoard.location);
      if (mainBoard.make) onUpdate('cuManufacturer', mainBoard.make);
      if (mainBoard.type) onUpdate('cuType', mainBoard.type);
      if (mainBoard.totalWays) onUpdate('boardSize', `${mainBoard.totalWays}-way`);
    }
  };

  // Cable size options
  const intakeCableSizes = ['16mm', '25mm', '35mm', '50mm', '70mm', '95mm'];
  const tailsSizes = ['16mm', '25mm', '35mm'];

  // Cable type options
  const cableTypes = [
    { value: 'swa', label: 'Steel Wire Armoured (SWA)' },
    { value: 'pvc-singles', label: 'PVC Singles' },
    { value: 'xlpe', label: 'XLPE' },
    { value: 'concentric', label: 'Concentric Cable' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className={cn('space-y-6', '')}>
      {/* Distribution Boards Section */}
      <div>
        <SectionTitle title="Distribution Boards" />
        <div className={cn('py-4', '')}>
          <MultiboardSetup boards={boards} onBoardsChange={handleBoardsChange} />
          {/* Board ways vs circuits warnings */}
          {boards.map((b) => getWarningsForField(`board-${b.id}`).map((w, i) => (
            <p key={`${b.id}-${i}`} className="text-[10px] text-amber-400/80 mt-1">{w.message}</p>
          )))}
        </div>
      </div>

      {/* Intake Cable Section */}
      <div>
        <SectionTitle title="Intake Cable" />
        <div className={cn('space-y-4 py-4', '')}>
          <FormField label="Intake Cable Size" required>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {intakeCableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate('intakeCableSize', formData.intakeCableSize === size ? '' : size);
                  }}
                  className={cn(
                    'h-11 rounded-lg font-medium transition-all touch-manipulation text-sm',
                    formData.intakeCableSize === size
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.03] text-white border border-white/[0.06]'
                  )}
                >
                  {size}²
                </button>
              ))}
            </div>
          </FormField>

          {getWarningsForField('intakeCableSize').map((w, i) => (
            <p key={i} className="text-[10px] text-amber-400/80">{w.message} ({w.regulation})</p>
          ))}

          <FormField label="Intake Cable Type" required>
            <Select
              value={formData.intakeCableType || ''}
              onValueChange={(value) => {
                haptic.light();
                onUpdate('intakeCableType', value);
              }}
            >
              <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
                <SelectValue placeholder="Select cable type" />
              </SelectTrigger>
              <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                {cableTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </div>

      {/* Meter Tails Section */}
      <div>
        <SectionTitle title="Meter Tails" />
        <div className="space-y-3 py-3">
          <div className="grid grid-cols-[2fr_1fr] gap-3">
            <FormField label="Tails Size *">
              <div className="grid grid-cols-3 gap-1.5">
                {tailsSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      haptic.light();
                      onUpdate('tailsSize', formData.tailsSize === size ? '' : size);
                    }}
                    className={cn(
                      'h-11 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                      formData.tailsSize === size
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] text-white border border-white/[0.08]'
                    )}
                  >
                    {size}²
                  </button>
                ))}
              </div>
            </FormField>
            <FormField label="Length (m)">
              <Input
                value={formData.tailsLength || ''}
                onChange={(e) => onUpdate('tailsLength', e.target.value)}
                placeholder="3"
                type="number"
                min="0"
                step="0.1"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                inputMode="decimal"
            />
          </FormField>
          </div>
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
