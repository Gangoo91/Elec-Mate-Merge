import React, { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cableSizeOptions } from '@/types/cableTypes';
import MultiboardSetup from '@/components/testing/MultiboardSetup';
import {
  DistributionBoard,
  createMainBoard,
  getMainBoard,
  MAIN_BOARD_ID,
} from '@/types/distributionBoard';
import { cn } from '@/lib/utils';
import {
  FieldLimitationBadge,
  FieldNotesInput,
  isFieldMarker,
} from '@/components/field-limitations';

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const FormField = ({ label, required, hint, trailing, children }: { label: string; required?: boolean; hint?: string; trailing?: React.ReactNode; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center justify-between gap-2 mb-1.5">
      <Label className="text-white text-xs">{label}{required && ' *'}</Label>
      {trailing}
    </div>
    {children}
    {hint && <span className="text-[10px] text-white block mt-1">{hint}</span>}
  </div>
);

const inputClasses = "h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]";

interface EICElectricalInstallationSectionProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: string) => void;
}

const EICElectricalInstallationSection = ({
  formData,
  onUpdate,
}: EICElectricalInstallationSectionProps) => {
  const hasRCDProtection = formData.rcdMainSwitch && formData.rcdMainSwitch !== 'no';
  const showRCDFields = hasRCDProtection;

  // Smart cascading: device type → auto-set BS EN
  const DEVICE_TO_BS: Record<string, string> = {
    'main-switch': '',
    'switch-fuse': 'BS EN 60947-3',
    'circuit-breaker': 'BS EN 60898-1',
    'rcd': 'BS EN 61008-1',
    'mcb': 'BS EN 60898-1',
    'mccb': 'BS EN 60947-2',
    'fuse': 'BS 88-2',
    'isolator': 'BS EN 60947-3',
  };

  const handleDeviceTypeChange = (value: string) => {
    const newValue = formData.mainProtectiveDevice === value ? '' : value;
    onUpdate('mainProtectiveDevice', newValue);
    // Auto-set BS EN if we have a mapping
    if (newValue && DEVICE_TO_BS[newValue]) {
      onUpdate('mainSwitchBsEn', DEVICE_TO_BS[newValue]);
    }
  };

  const handleRCDMainSwitchChange = (value: string) => {
    const actualValue = value === '__clear__' ? '' : value;
    onUpdate('rcdMainSwitch', actualValue);

    // Clear RCD fields when "No" or cleared
    if (actualValue === 'no' || actualValue === '') {
      onUpdate('rcdRating', '');
      onUpdate('rcdType', '');
    }
  };

  // Migrate legacy single-board data to multi-board format
  const boards: DistributionBoard[] = useMemo(() => {
    // If we already have distributionBoards, use them
    if (formData.distributionBoards && (formData.distributionBoards as DistributionBoard[]).length > 0) {
      return formData.distributionBoards as DistributionBoard[];
    }

    // Otherwise, create main board from legacy fields
    const mainBoard = createMainBoard();
    if (formData.boardLocation) mainBoard.location = formData.boardLocation as string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (formData.boardType) mainBoard.type = formData.boardType as any;
    if (formData.boardSize) {
      mainBoard.totalWays = parseInt(formData.boardSize as string) || 0;
    }
    return [mainBoard];
  }, [formData.distributionBoards, formData.boardLocation, formData.boardType, formData.boardSize]);

  // Handle board changes - sync to both new and legacy fields for backward compatibility
  const handleBoardsChange = (newBoards: DistributionBoard[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUpdate('distributionBoards', newBoards as any);

    // ELE-830: main board is whichever sits at order 0 after reorder — fall
    // back to legacy id or first board if nothing resolves.
    const mainBoard =
      getMainBoard(newBoards) ||
      newBoards.find((b) => b.id === MAIN_BOARD_ID) ||
      newBoards[0];
    if (mainBoard) {
      if (mainBoard.location) onUpdate('boardLocation', mainBoard.location);
      if (mainBoard.type) onUpdate('boardType', mainBoard.type);
      if (mainBoard.totalWays) onUpdate('boardSize', String(mainBoard.totalWays));
    }
  };

  // --- Option arrays ---

  const deviceTypeOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: 'main-switch', label: 'Main Switch' },
    { value: 'switch-fuse', label: 'Switch Fuse' },
    { value: 'circuit-breaker', label: 'Circuit-breaker' },
    { value: 'rcd', label: 'RCD' },
    { value: 'mcb', label: 'MCB' },
    { value: 'mccb', label: 'MCCB' },
    { value: 'fuse', label: 'Fuse' },
    { value: 'isolator', label: 'Isolator' },
  ];

  const bsEnOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: 'BS EN 60898-1', label: 'BS EN 60898-1 (MCBs)' },
    { value: 'BS EN 60898-2', label: 'BS EN 60898-2 (MCBs AC/DC)' },
    { value: 'BS EN 60947-2', label: 'BS EN 60947-2 (MCCBs)' },
    { value: 'BS EN 60947-3', label: 'BS EN 60947-3 (Switch-disconnectors)' },
    { value: 'BS EN 61008-1', label: 'BS EN 61008-1 (RCCBs)' },
    { value: 'BS EN 61009-1', label: 'BS EN 61009-1 (RCBOs)' },
    { value: 'BS 88-2', label: 'BS 88-2 (HRC Fuses)' },
    { value: 'BS 88-3', label: 'BS 88-3 (HRC Fuses)' },
    { value: 'BS 1361', label: 'BS 1361 (Cartridge Fuses)' },
    { value: 'BS 1362', label: 'BS 1362 (Plug Fuses)' },
    { value: 'BS 3036', label: 'BS 3036 (Semi-enclosed Fuses)' },
    { value: 'BS 7671', label: 'BS 7671 (Wiring Regs)' },
  ];

  const polesOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: '1', label: '1 Pole' },
    { value: '2', label: '2 Pole' },
    { value: '3', label: '3 Pole' },
    { value: '4', label: '4 Pole' },
  ];

  const currentRatingOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: '5', label: '5A' },
    { value: '6', label: '6A' },
    { value: '10', label: '10A' },
    { value: '15', label: '15A' },
    { value: '16', label: '16A' },
    { value: '20', label: '20A' },
    { value: '25', label: '25A' },
    { value: '30', label: '30A' },
    { value: '32', label: '32A' },
    { value: '40', label: '40A' },
    { value: '45', label: '45A' },
    { value: '50', label: '50A' },
    { value: '60', label: '60A' },
    { value: '63', label: '63A' },
    { value: '80', label: '80A' },
    { value: '100', label: '100A' },
    { value: '125', label: '125A' },
    { value: '160', label: '160A' },
    { value: '200', label: '200A' },
    { value: '250', label: '250A' },
    { value: '315', label: '315A' },
    { value: '400', label: '400A' },
    { value: '500', label: '500A' },
    { value: '630', label: '630A' },
    { value: '800', label: '800A' },
    { value: '1000', label: '1000A' },
    { value: '1250', label: '1250A' },
    { value: '1600', label: '1600A' },
  ];

  const fuseSettingOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: '3', label: '3A' },
    { value: '5', label: '5A' },
    { value: '6', label: '6A' },
    { value: '10', label: '10A' },
    { value: '13', label: '13A' },
    { value: '15', label: '15A' },
    { value: '16', label: '16A' },
    { value: '20', label: '20A' },
    { value: '25', label: '25A' },
    { value: '30', label: '30A' },
    { value: '32', label: '32A' },
    { value: '40', label: '40A' },
    { value: '45', label: '45A' },
    { value: '50', label: '50A' },
    { value: '60', label: '60A' },
    { value: '63', label: '63A' },
    { value: '80', label: '80A' },
    { value: '100', label: '100A' },
    { value: '125', label: '125A' },
    { value: '160', label: '160A' },
    { value: '200', label: '200A' },
    { value: '250', label: '250A' },
    { value: '315', label: '315A' },
    { value: '400', label: '400A' },
    { value: '500', label: '500A' },
    { value: '630', label: '630A' },
    { value: '800', label: '800A' },
    { value: '1000', label: '1000A' },
    { value: '1250', label: '1250A' },
    { value: '1600', label: '1600A' },
  ];

  const voltageOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: '230', label: '230V' },
    { value: '400', label: '400V' },
    { value: 'other', label: 'Other' },
  ];

  const breakingCapacityOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: '1', label: '1kA' },
    { value: '1.5', label: '1.5kA' },
    { value: '3', label: '3kA' },
    { value: '4.5', label: '4.5kA' },
    { value: '6', label: '6kA' },
    { value: '10', label: '10kA' },
    { value: '15', label: '15kA' },
    { value: '16', label: '16kA' },
    { value: '20', label: '20kA' },
    { value: '25', label: '25kA' },
    { value: '35', label: '35kA' },
    { value: '50', label: '50kA' },
    { value: '70', label: '70kA' },
    { value: '100', label: '100kA' },
  ];

  const rcdRatingOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: '30', label: '30mA' },
    { value: '100', label: '100mA' },
    { value: '300', label: '300mA' },
  ];

  const rcdTypeOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: 'ac', label: 'AC Type' },
    { value: 'a', label: 'A Type' },
    { value: 'b', label: 'B Type' },
    { value: 'f', label: 'F Type' },
  ];

  const rcdTimeDelayOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: '0', label: '0ms (No delay)' },
    { value: '40', label: '40ms' },
    { value: '150', label: '150ms' },
    { value: '200', label: '200ms' },
    { value: '300', label: '300ms' },
    { value: '500', label: '500ms (S Type)' },
  ];

  const intakeCableSizeOptions = [
    { value: '__clear__', label: '— Clear —' },
    ...cableSizeOptions.map((o) => ({ value: o.value, label: o.label })),
    { value: 'custom', label: 'Other/Custom' },
  ];

  const intakeCableTypeOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: 'pvc', label: 'PVC' },
    { value: 'xlpe', label: 'XLPE' },
    { value: 'swa', label: 'SWA (Steel Wire Armoured)' },
    { value: 'pvc-swa', label: 'PVC/SWA' },
    { value: 'xlpe-swa', label: 'XLPE/SWA' },
    { value: 'concentric', label: 'Concentric' },
    { value: 'paper', label: 'Paper Insulated' },
    { value: 'pilc', label: 'PILC (Paper Insulated Lead Covered)' },
    { value: 'micc', label: 'MICC (Mineral Insulated)' },
    { value: 'other', label: 'Other' },
  ];

  const tailsSizeOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: '16mm', label: '16mm\u00B2' },
    { value: '25mm', label: '25mm\u00B2' },
    { value: '35mm', label: '35mm\u00B2' },
    { value: '50mm', label: '50mm\u00B2' },
    { value: 'custom', label: 'Other/Custom' },
  ];

  const tailsLengthOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: '1m', label: '1m' },
    { value: '1.5m', label: '1.5m' },
    { value: '2m', label: '2m' },
    { value: '2.5m', label: '2.5m' },
    { value: '3m', label: '3m' },
    { value: '4m', label: '4m' },
    { value: '5m', label: '5m' },
    { value: 'custom', label: 'Custom Length' },
  ];

  // RCD Main Switch toggle value
  const rcdMainSwitchValue = (formData.rcdMainSwitch as string) || '';

  return (
    <div className="space-y-4">
      {/* Main Switch */}
      <SectionTitle title="Main Switch / Circuit-Breaker / RCD" />

      {/* Device Type as toggle buttons */}
      <div className="grid grid-cols-4 gap-1">
        {[
          { value: 'main-switch', label: 'Switch' },
          { value: 'circuit-breaker', label: 'CB' },
          { value: 'rcd', label: 'RCD' },
          { value: 'fuse', label: 'Fuse' },
        ].map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleDeviceTypeChange(opt.value)}
            className={cn(
              'h-10 rounded-lg font-semibold transition-all touch-manipulation text-[11px] active:scale-[0.98]',
              formData.mainProtectiveDevice === opt.value
                ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                : 'bg-white/[0.05] border border-white/[0.08] text-white'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <FormField label="Location">
        <Input
          value={(formData.mainSwitchLocation as string) || ''}
          onChange={(e) => onUpdate('mainSwitchLocation', e.target.value)}
          placeholder="e.g., Under stairs cupboard"
          className={inputClasses}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3 items-end">
        <FormField label="BS (EN)">
          <MobileSelectPicker
            value={(formData.mainSwitchBsEn as string) || ''}
            onValueChange={(value) =>
              onUpdate('mainSwitchBsEn', value === '__clear__' ? '' : value)
            }
            options={bsEnOptions}
            placeholder="Select BS"
            title="BS (EN) Standard"
            triggerClassName={inputClasses}
          />
        </FormField>
        <FormField label="Poles">
          <MobileSelectPicker
            value={(formData.mainSwitchPoles as string) || ''}
            onValueChange={(value) =>
              onUpdate('mainSwitchPoles', value === '__clear__' ? '' : value)
            }
            options={polesOptions}
            placeholder="Poles"
            title="Number of Poles"
            triggerClassName={inputClasses}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-3 items-end">
        <FormField label="Rating (A)" required>
          <MobileSelectPicker
            value={(formData.mainSwitchRating as string) || ''}
            onValueChange={(value) =>
              onUpdate('mainSwitchRating', value === '__clear__' ? '' : value)
            }
            options={currentRatingOptions}
            placeholder="Rating"
            title="Current Rating"
            triggerClassName={inputClasses}
          />
        </FormField>
        <FormField label="Fuse Setting (A)">
          <MobileSelectPicker
            value={(formData.mainSwitchFuseRating as string) || ''}
            onValueChange={(value) =>
              onUpdate('mainSwitchFuseRating', value === '__clear__' ? '' : value)
            }
            options={fuseSettingOptions}
            placeholder="Setting"
            title="Fuse/Device Setting"
            triggerClassName={inputClasses}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-3 items-end">
        <FormField label="Voltage (V)">
          <MobileSelectPicker
            value={(formData.mainSwitchVoltageRating as string) || ''}
            onValueChange={(value) =>
              onUpdate('mainSwitchVoltageRating', value === '__clear__' ? '' : value)
            }
            options={voltageOptions}
            placeholder="Voltage"
            title="Voltage Rating"
            triggerClassName={inputClasses}
          />
        </FormField>
        <FormField label="Breaking Capacity (kA)">
          <MobileSelectPicker
            value={(formData.breakingCapacity as string) || ''}
            onValueChange={(value) =>
              onUpdate('breakingCapacity', value === '__clear__' ? '' : value)
          }
          options={breakingCapacityOptions}
          placeholder="Select capacity"
          title="Breaking Capacity"
          triggerClassName={inputClasses}
        />
      </FormField>
      </div>

      {/* RCD Protection — grouped card */}
      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-3">
        <SectionTitle title="RCD Protection" />

        {/* RCD Main Switch — toggle buttons */}
        <div className="grid grid-cols-3 gap-1">
          {[
            { value: 'yes', label: 'RCD' },
            { value: 'no', label: 'No RCD' },
            { value: 'rcbo', label: 'RCBO' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleRCDMainSwitchChange(
                rcdMainSwitchValue === opt.value ? '__clear__' : opt.value
              )}
              className={cn(
                'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                rcdMainSwitchValue === opt.value
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {showRCDFields ? (
          <div className="space-y-3">
            {/* Type as toggle buttons */}
            <FormField label="RCD Type">
              <div className="grid grid-cols-4 gap-1">
                {[
                  { value: 'ac', label: 'AC' },
                  { value: 'a', label: 'A' },
                  { value: 'b', label: 'B' },
                  { value: 'f', label: 'F' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onUpdate('rcdType', (formData.rcdType as string) === opt.value ? '' : opt.value)}
                    className={cn(
                      'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                      (formData.rcdType as string) === opt.value
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] border border-white/[0.08] text-white'
                    )}
                  >
                    Type {opt.label}
                  </button>
                ))}
              </div>
            </FormField>

            {/* Rating as toggle buttons */}
            <FormField label="IΔn Rating (mA)">
              <div className="grid grid-cols-3 gap-1">
                {['30', '100', '300'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => onUpdate('rcdRating', (formData.rcdRating as string) === r ? '' : r)}
                    className={cn(
                      'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                      (formData.rcdRating as string) === r
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] border border-white/[0.08] text-white'
                    )}
                  >
                    {r}mA
                  </button>
                ))}
              </div>
            </FormField>

            {/* Time fields in 3-col */}
            <div className="grid grid-cols-3 gap-2 items-end">
              <FormField label="Delay (ms)">
                <MobileSelectPicker
                  value={(formData.rcdTimeDelay as string) || ''}
                  onValueChange={(value) =>
                    onUpdate('rcdTimeDelay', value === '__clear__' ? '' : value)
                  }
                  options={rcdTimeDelayOptions}
                  placeholder="Delay"
                  title="Time Delay"
                  triggerClassName={inputClasses}
                />
              </FormField>
              <FormField label="Rated (ms)">
                <Input
                  type="text"
                  inputMode="numeric"
                  value={(formData.rcdOperatingTime as string) || ''}
                  onChange={(e) => onUpdate('rcdOperatingTime', e.target.value)}
                  placeholder="40"
                  className={inputClasses}
                />
              </FormField>
              <FormField label="Measured (ms)">
                <Input
                  type="text"
                  inputMode="numeric"
                  value={(formData.rcdMeasuredTime as string) || ''}
                  onChange={(e) => onUpdate('rcdMeasuredTime', e.target.value)}
                  placeholder="28"
                  className={inputClasses}
                />
              </FormField>
            </div>
          </div>
        ) : (
          rcdMainSwitchValue === 'no' && (
          <div className="flex items-center justify-center p-4 bg-white/[0.03] border border-white/[0.08] rounded-lg">
            <p className="text-xs text-white text-center">
              RCD rating and type not applicable
            </p>
          </div>
        )
      )}
      </div>

      {/* Distribution Boards */}
      <MultiboardSetup boards={boards} onBoardsChange={handleBoardsChange} />

      {/* Supply Cables */}
      <SectionTitle title="Supply Cables" />
      <div className="space-y-3">
        {/* Intake Cable — size as toggle buttons */}
        <FormField
          label="Intake Cable Size"
          trailing={
            <FieldLimitationBadge
              compact
              value={(formData.intakeCableSize as string) || ''}
              markers={['LIM', 'N/V']}
              onChange={(v) => onUpdate('intakeCableSize', v)}
            />
          }
        >
          {isFieldMarker(formData.intakeCableSize as string) ? (
            <Input
              value={formData.intakeCableSize as string}
              disabled
              className={cn(inputClasses, 'opacity-60')}
            />
          ) : (
            <div className="grid grid-cols-6 gap-1">
              {['16mm', '25mm', '35mm', '50mm', '70mm', '95mm'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => onUpdate('intakeCableSize', formData.intakeCableSize === size ? '' : size)}
                  className={cn(
                    'h-10 rounded-lg font-medium transition-all touch-manipulation text-[10px] active:scale-[0.98]',
                    formData.intakeCableSize === size
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] border border-white/[0.08] text-white'
                  )}
                >
                  {size}²
                </button>
              ))}
            </div>
          )}
          <FieldNotesInput
            parentValue={(formData.intakeCableSize as string) || ''}
            value={(formData.intakeCableSizeNotes as string) || ''}
            onChange={(v) => onUpdate('intakeCableSizeNotes', v)}
            placeholder="Reason (e.g. cable concealed / inaccessible)"
          />
        </FormField>

        <FormField
          label="Intake Cable Type"
          trailing={
            <FieldLimitationBadge
              compact
              value={(formData.intakeCableType as string) || ''}
              markers={['LIM', 'N/V']}
              onChange={(v) => onUpdate('intakeCableType', v)}
            />
          }
        >
          {isFieldMarker(formData.intakeCableType as string) ? (
            <Input
              value={formData.intakeCableType as string}
              disabled
              className={cn(inputClasses, 'opacity-60')}
            />
          ) : (
            <MobileSelectPicker
              value={(formData.intakeCableType as string) || ''}
              onValueChange={(value) =>
                onUpdate('intakeCableType', value === '__clear__' ? '' : value)
              }
              options={intakeCableTypeOptions}
              placeholder="Cable type"
              title="Intake Cable Type"
              triggerClassName={inputClasses}
            />
          )}
          <FieldNotesInput
            parentValue={(formData.intakeCableType as string) || ''}
            value={(formData.intakeCableTypeNotes as string) || ''}
            onChange={(v) => onUpdate('intakeCableTypeNotes', v)}
            placeholder="Reason (e.g. cable run inaccessible)"
          />
        </FormField>

        {/* Meter Tails — size as toggle buttons */}
        <div className="grid grid-cols-2 gap-3 items-end">
          <FormField
            label="Tails Size"
            trailing={
              <FieldLimitationBadge
                compact
                value={(formData.tailsSize as string) || ''}
                markers={['LIM', 'N/V']}
                onChange={(v) => onUpdate('tailsSize', v)}
              />
            }
          >
            {isFieldMarker(formData.tailsSize as string) ? (
              <Input
                value={formData.tailsSize as string}
                disabled
                className={cn(inputClasses, 'opacity-60')}
              />
            ) : (
              <div className="grid grid-cols-3 gap-1">
                {['16mm', '25mm', '35mm'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => onUpdate('tailsSize', formData.tailsSize === size ? '' : size)}
                    className={cn(
                      'h-10 rounded-lg font-medium transition-all touch-manipulation text-xs active:scale-[0.98]',
                      formData.tailsSize === size
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] border border-white/[0.08] text-white'
                    )}
                  >
                    {size}²
                  </button>
                ))}
              </div>
            )}
            <FieldNotesInput
              parentValue={(formData.tailsSize as string) || ''}
              value={(formData.tailsSizeNotes as string) || ''}
              onChange={(v) => onUpdate('tailsSizeNotes', v)}
              placeholder="Reason (e.g. tails not accessible)"
            />
          </FormField>
          <FormField label="Tails Length">
            <div className="grid grid-cols-3 gap-1">
              {['1m', '2m', '3m'].map((len) => (
                <button
                  key={len}
                  type="button"
                  onClick={() => onUpdate('tailsLength', formData.tailsLength === len ? '' : len)}
                  className={cn(
                    'h-10 rounded-lg font-medium transition-all touch-manipulation text-xs active:scale-[0.98]',
                    formData.tailsLength === len
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] border border-white/[0.08] text-white'
                  )}
                >
                  {len}
                </button>
              ))}
            </div>
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default EICElectricalInstallationSection;
