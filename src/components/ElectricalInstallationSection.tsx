
import React, { useState, useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cable, Gauge, CircuitBoard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';
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

// Section header - MUST be outside main component to prevent focus loss
const SectionTitle = ({ icon: Icon, title, color = "orange", isMobile }: { icon: React.ElementType; title: string; color?: string; isMobile: boolean }) => (
  <div className={cn(
    "flex items-center gap-3 py-3",
    isMobile ? "-mx-4 px-4 bg-card/30 border-y border-border/20" : "pb-2 border-b border-border/30"
  )}>
    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", `bg-${color}-500/20`)}>
      <Icon className={cn("h-4 w-4", `text-${color}-400`)} />
    </div>
    <h3 className="font-semibold text-foreground">{title}</h3>
  </div>
);

// Input field wrapper - MUST be outside main component to prevent focus loss
const FormField = ({
  label,
  required,
  hint,
  children
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label className="text-sm text-foreground/80">
      {label}
      {required && <span className="text-elec-yellow ml-1">*</span>}
    </Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

/**
 * ElectricalInstallationSection - Best-in-class mobile form for electrical installation details
 * Edge-to-edge design with large touch targets and native app feel
 *
 * Performance optimised with React.memo for selective re-rendering
 */
const ElectricalInstallationSectionInner = ({ formData, onUpdate }: ElectricalInstallationSectionProps) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();

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
  }, [formData.distributionBoards, formData.cuLocation, formData.cuManufacturer, formData.cuType, formData.boardSize]);

  // Handle board changes - sync to both new and legacy fields for backward compatibility
  const handleBoardsChange = (newBoards: DistributionBoard[]) => {
    onUpdate('distributionBoards', newBoards);

    // Also update legacy fields from main board for backward compatibility
    const mainBoard = newBoards.find(b => b.id === MAIN_BOARD_ID) || newBoards[0];
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
    <div className={cn("space-y-6", isMobile && "-mx-4")}>
      {/* Distribution Boards Section */}
      <div>
        <SectionTitle icon={CircuitBoard} title="Distribution Boards" color="orange" isMobile={isMobile} />
        <div className={cn("py-4", isMobile ? "px-4" : "")}>
          <MultiboardSetup
            boards={boards}
            onBoardsChange={handleBoardsChange}
          />
        </div>
      </div>

      {/* Intake Cable Section */}
      <div>
        <SectionTitle icon={Cable} title="Intake Cable" color="blue" isMobile={isMobile} />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="Intake Cable Size" required>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {intakeCableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => { haptics.tap(); onUpdate('intakeCableSize', formData.intakeCableSize === size ? '' : size); }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm",
                    formData.intakeCableSize === size
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {size}²
                </button>
              ))}
            </div>
          </FormField>

          <FormField label="Intake Cable Type" required>
            <Select value={formData.intakeCableType || ''} onValueChange={(value) => { haptics.tap(); onUpdate('intakeCableType', value); }}>
              <SelectTrigger className="h-11 touch-manipulation">
                <SelectValue placeholder="Select cable type" />
              </SelectTrigger>
              <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                {cableTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </div>

      {/* Meter Tails Section */}
      <div>
        <SectionTitle icon={Gauge} title="Meter Tails" color="green" isMobile={isMobile} />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="Tails Size" required>
            <div className="grid grid-cols-3 gap-2">
              {tailsSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => { haptics.tap(); onUpdate('tailsSize', formData.tailsSize === size ? '' : size); }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm",
                    formData.tailsSize === size
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {size}²
                </button>
              ))}
            </div>
          </FormField>

          <FormField label="Approximate Length (m)">
            <Input
              value={formData.tailsLength || ''}
              onChange={(e) => onUpdate('tailsLength', e.target.value)}
              placeholder="e.g., 3"
              type="number"
              min="0"
              step="0.1"
              className="h-11 text-base touch-manipulation"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};

// Memoized component - only re-renders when ELECTRICAL_SECTION_FIELDS change
const ElectricalInstallationSection = React.memo(ElectricalInstallationSectionInner, (prevProps, nextProps) => {
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
});

ElectricalInstallationSection.displayName = 'ElectricalInstallationSection';

export default ElectricalInstallationSection;
