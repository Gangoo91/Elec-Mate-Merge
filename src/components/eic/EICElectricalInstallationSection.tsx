import React, { useMemo } from 'react';
import { useHaptic } from '@/hooks/useHaptic';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import MultiboardSetup from '@/components/testing/MultiboardSetup';
import {
  DistributionBoard,
  createMainBoard,
  getMainBoard,
  MAIN_BOARD_ID,
} from '@/types/distributionBoard';
import { cn } from '@/lib/utils';
import useReadingKeypad from '@/hooks/useReadingKeypad';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const chipBase =
  'h-11 rounded-xl text-xs transition-all touch-manipulation active:scale-[0.98]';
const chipOn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';

const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const FormField = ({ label, required, hint, trailing, children }: { label: string; required?: boolean; hint?: string; trailing?: React.ReactNode; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center justify-between gap-2 mb-1">
      <Label className="text-[12px] font-medium text-white">{label}{required && ' *'}</Label>
      {trailing}
    </div>
    {children}
    {hint && <span className="text-[11px] text-white block mt-1">{hint}</span>}
  </div>
);

interface EICElectricalInstallationSectionProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: string) => void;
}

const EICElectricalInstallationSection = ({
  formData,
  onUpdate,
}: EICElectricalInstallationSectionProps) => {
  // Legacy tolerance: the old smart-defaults bug wrote 'recommended' into
  // rcdMainSwitch — never a chip value. Treat it as unset so certs that
  // already stored it don't show the RCD detail fields with no chip lit.
  const hasRCDProtection =
    formData.rcdMainSwitch &&
    formData.rcdMainSwitch !== 'no' &&
    formData.rcdMainSwitch !== 'recommended';
  const showRCDFields = hasRCDProtection;

  // Reading keypad — shared MW pattern for the two free-number RCD time
  // readings, matching the Supply (Hz/Ipf/Ze) and Earthing (RA/max demand)
  // sections so every numeric reading on the tab uses the same entry surface.
  const keypad = useReadingKeypad({
    meta: {
      rcdOperatingTime: { label: 'RCD rated operating time', unit: 'ms' },
      rcdMeasuredTime: { label: 'RCD measured operating time', unit: 'ms' },
    },
    sequence: ['rcdOperatingTime', 'rcdMeasuredTime'],
    getValue: (field) => String(formData[field] ?? ''),
    setValue: (field, value) => onUpdate(field, value),
  });

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

    // ELE-1246 — clear ALL RCD detail fields when "No" or cleared, not just
    // rating/type: stale time readings survived in formData and printed on
    // the PDF via the formatter's legacy fallback chain.
    if (actualValue === 'no' || actualValue === '') {
      onUpdate('rcdRating', '');
      onUpdate('rcdType', '');
      onUpdate('rcdOperatingTime', '');
      onUpdate('rcdTimeDelay', '');
      onUpdate('rcdRatedTimeDelay', '');
      onUpdate('rcdMeasuredTime', '');
      onUpdate('rcdMeasuredOperatingTime', '');
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

  const rcdTimeDelayOptions = [
    { value: '__clear__', label: '— Clear —' },
    { value: '0', label: '0ms (No delay)' },
    { value: '40', label: '40ms' },
    { value: '150', label: '150ms' },
    { value: '200', label: '200ms' },
    { value: '300', label: '300ms' },
    { value: '500', label: '500ms (S Type)' },
  ];

  // RCD Main Switch toggle value
  const rcdMainSwitchValue = (formData.rcdMainSwitch as string) || '';


  const haptic = useHaptic();
  return (
    <div
      // lg:contents — on desktop each card becomes its own grid item of the
      // parent 2-col grid (the MW per-card layout), so sections of different
      // heights no longer leave multi-card blank bands. Events still bubble
      // through display:contents, so the delegated haptic keeps working.
      className="space-y-4 lg:space-y-0 lg:contents"
      // Delegated press haptic — every chip/button tap in this section buzzes
      // like the MW tabs without wiring each onClick individually.
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) haptic.light();
      }}
    >
      {/* Main Switch */}
      <div className={cardCn}>
        <SectionHeading title="Main switch / circuit-breaker / RCD" />

        {/* Device Type as toggle buttons */}
        <div className="grid grid-cols-4 gap-2">
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
                chipBase,
                'text-[11px]',
                formData.mainProtectiveDevice === opt.value ? chipOn : chipOff
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
            className={inputCn}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="BS (EN)">
            <MobileSelectPicker
              value={(formData.mainSwitchBsEn as string) || ''}
              onValueChange={(value) =>
                onUpdate('mainSwitchBsEn', value === '__clear__' ? '' : value)
              }
              options={bsEnOptions}
              placeholder="Select BS"
              title="BS (EN) Standard"
              triggerClassName={pickerTriggerCn}
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
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Rating (A)" required>
            <MobileSelectPicker
              value={(formData.mainSwitchRating as string) || ''}
              onValueChange={(value) =>
                onUpdate('mainSwitchRating', value === '__clear__' ? '' : value)
              }
              options={currentRatingOptions}
              placeholder="Rating"
              title="Current Rating"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
          <FormField label="Fuse setting (A)">
            <MobileSelectPicker
              value={(formData.mainSwitchFuseRating as string) || ''}
              onValueChange={(value) =>
                onUpdate('mainSwitchFuseRating', value === '__clear__' ? '' : value)
              }
              options={fuseSettingOptions}
              placeholder="Setting"
              title="Fuse/Device Setting"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Voltage (V)">
            <MobileSelectPicker
              value={(formData.mainSwitchVoltageRating as string) || ''}
              onValueChange={(value) =>
                onUpdate('mainSwitchVoltageRating', value === '__clear__' ? '' : value)
              }
              options={voltageOptions}
              placeholder="Voltage"
              title="Voltage Rating"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
          <FormField label="Breaking capacity (kA)">
            <MobileSelectPicker
              value={(formData.breakingCapacity as string) || ''}
              onValueChange={(value) =>
                onUpdate('breakingCapacity', value === '__clear__' ? '' : value)
              }
              options={breakingCapacityOptions}
              placeholder="Select capacity"
              title="Breaking Capacity"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
        </div>
      </div>

      {/* RCD Protection */}
      <div className={cardCn}>
        <SectionHeading title="RCD protection" />

        {/* RCD Main Switch — toggle buttons */}
        <div className="grid grid-cols-3 gap-2">
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
                chipBase,
                rcdMainSwitchValue === opt.value ? chipOn : chipOff
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {showRCDFields ? (
          <div className="space-y-4">
            {/* Type as toggle buttons */}
            <FormField label="RCD type">
              <div className="grid grid-cols-4 gap-2">
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
                      chipBase,
                      (formData.rcdType as string) === opt.value ? chipOn : chipOff
                    )}
                  >
                    Type {opt.label}
                  </button>
                ))}
              </div>
            </FormField>

            {/* Rating as toggle buttons */}
            <FormField label="IΔn rating (mA)">
              <div className="grid grid-cols-3 gap-2">
                {['30', '100', '300'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => onUpdate('rcdRating', (formData.rcdRating as string) === r ? '' : r)}
                    className={cn(
                      chipBase,
                      (formData.rcdRating as string) === r ? chipOn : chipOff
                    )}
                  >
                    {r}mA
                  </button>
                ))}
              </div>
            </FormField>

            {/* Time fields in 3-col */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
              <FormField label="Delay (ms)">
                <MobileSelectPicker
                  value={(formData.rcdTimeDelay as string) || ''}
                  onValueChange={(value) =>
                    onUpdate('rcdTimeDelay', value === '__clear__' ? '' : value)
                  }
                  options={rcdTimeDelayOptions}
                  placeholder="Delay"
                  title="Time Delay"
                  triggerClassName={pickerTriggerCn}
                />
              </FormField>
              <FormField label="Rated (ms)">
                <Input
                  type="text"
                  inputMode="numeric"
                  value={(formData.rcdOperatingTime as string) || ''}
                  onChange={(e) => onUpdate('rcdOperatingTime', e.target.value)}
                  placeholder="40"
                  className={inputCn}
                  {...keypad.field('rcdOperatingTime')}
                />
              </FormField>
              <FormField label="Measured (ms)">
                <Input
                  type="text"
                  inputMode="numeric"
                  value={(formData.rcdMeasuredTime as string) || ''}
                  onChange={(e) => onUpdate('rcdMeasuredTime', e.target.value)}
                  placeholder="28"
                  className={inputCn}
                  {...keypad.field('rcdMeasuredTime')}
                />
              </FormField>
            </div>
          </div>
        ) : (
          rcdMainSwitchValue === 'no' && (
            <div className="flex items-center justify-center rounded-xl bg-white/[0.05] p-4">
              <p className="text-[12px] text-white text-center">
                RCD rating and type not applicable
              </p>
            </div>
          )
        )}
      </div>

      {/* Distribution Boards — full width on desktop: the board list is the
          tallest block on the tab and pairs badly with a single card. */}
      <div className="lg:col-span-2">
        <MultiboardSetup boards={boards} onBoardsChange={handleBoardsChange} certType="eic" />
      </div>

      {/* Scroll room so the last reading can rise clear of the keypad */}
      {keypad.spacer}

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );
};

export default EICElectricalInstallationSection;
