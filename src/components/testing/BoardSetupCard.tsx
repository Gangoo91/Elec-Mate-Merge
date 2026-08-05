import React from 'react';
import { useHaptic } from '@/hooks/useHaptic';
import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DistributionBoard,
  MAIN_BOARD_ID,
  isMainBoard as isMainBoardFn,
  getBoardWays,
  BOARD_LOCATIONS,
  BoardType,
} from '@/types/distributionBoard';

interface BoardSetupCardProps {
  board: DistributionBoard;
  onUpdate: (field: keyof DistributionBoard | Record<string, any>, value?: any) => void;
  onRemove?: () => void;
  /** Move this board one position up in the supply-chain list (ELE-830). */
  onMoveUp?: () => void;
  /** Move this board one position down. */
  onMoveDown?: () => void;
  /** `true` if this is the first card in the list — disables "up". */
  isFirst?: boolean;
  /** `true` if this is the last card in the list — disables "down". */
  isLast?: boolean;
  isRemovable?: boolean;
  className?: string;
  /** EICR hides Model/From (ELE-1106) and the duplicate Incoming Device section (ELE-1107). */
  certType?: 'eicr' | 'eic';
}

// BS EN Standards
const BS_EN_OPTIONS = [
  { value: '60898', label: 'BS EN 60898 — MCB' },
  { value: '61009', label: 'BS EN 61009 — RCBO' },
  { value: '61008', label: 'BS EN 61008 — RCD' },
  { value: '60947-3', label: 'BS EN 60947-3 — Switch-Disconnector' },
  { value: '60947', label: 'BS EN 60947 — Industrial (other)' },
  // ELE-1436 — withdrawn, superseded by BS EN 60947-3, but still the standard
  // cited on the main switch of many older UK boards being inspected.
  { value: '5419', label: 'BS 5419 — Isolator/Switch' },
  { value: '88-2', label: 'BS 88-2 — HRC Fuse' },
  { value: '88-3', label: 'BS 88-3 — HRC Fuse' },
  { value: '1361', label: 'BS 1361 — Cartridge Fuse' },
  { value: '3036', label: 'BS 3036 — Rewirable Fuse' },
];

// Smart cascading: BS EN → Type options
// Verified against BS 7671:2018+A3:2024 Tables 41.2, 41.3, 41.5
const getTypeOptionsForBsEn = (bsEn: string) => {
  switch (bsEn) {
    case '60898': // MCB
      return [
        { value: 'Type B', label: 'Type B' },
        { value: 'Type C', label: 'Type C' },
        { value: 'Type D', label: 'Type D' },
      ];
    case '61009': // RCBO
      return [
        { value: 'Type B', label: 'Type B' },
        { value: 'Type C', label: 'Type C' },
        { value: 'Type D', label: 'Type D' },
      ];
    case '61008': // RCD
      return [
        { value: 'Type AC', label: 'Type AC' },
        { value: 'Type A', label: 'Type A' },
        { value: 'Type B', label: 'Type B' },
        { value: 'Type F', label: 'Type F' },
        { value: 'Type S', label: 'Type S (Delayed)' },
      ];
    case '60947-3': // Switch-disconnectors / isolators (domestic + commercial)
    case '60947': // Industrial (other)
    case '5419': // Withdrawn air-break switch/disconnector standard — same shapes
      return [
        { value: 'MCCB', label: 'MCCB' },
        { value: 'ACB', label: 'ACB' },
        { value: 'Isolator', label: 'Isolator' },
        { value: 'Switch-Disconnector', label: 'Switch-Disconnector' },
      ];
    // Fuses have no type/curve selection
    case '88-2':
    case '88-3':
    case '1361':
    case '3036':
      return null; // null = hide type field
    default:
      return null;
  }
};

// Smart cascading: BS EN → Rating options
// Ratings verified against BS 7671 Zs tables
const getRatingOptionsForBsEn = (bsEn: string) => {
  switch (bsEn) {
    case '60898': // MCB — BS 7671 Table 41.3
    case '61009': // RCBO — same ratings as MCB
      return [3, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];
    case '61008': // RCD — rated in mA not A
      return [30, 100, 300, 500]; // mA values
    case '88-2': // BS 88-2 HRC — Table 41.2(a) + 41.4(a)
      return [2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200];
    case '88-3': // BS 88-3 — Table 41.2(b) + 41.4(b)
      return [5, 16, 20, 32, 45, 63, 80, 100];
    case '1361': // BS 1361 Cartridge — standard range
      return [5, 15, 20, 30, 45, 60, 80, 100];
    case '3036': // BS 3036 Rewirable — Table 41.2(c) + 41.4(c)
      return [5, 15, 20, 30, 45, 60, 100];
    case '60947-3': // Switch-disconnectors / isolators
    case '60947': // Industrial (other)
      return [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 630, 800, 1000, 1250, 1600];
    default:
      return [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100];
  }
};

// Main switch types
const SWITCH_TYPE_OPTIONS = [
  { value: 'Isolator', label: 'Isolator' },
  { value: 'Switch-Disconnector', label: 'Switch-Disconnector' },
  { value: 'RCD', label: 'RCD' },
  { value: 'RCCB', label: 'RCCB' },
  { value: 'MCB', label: 'MCB' },
  { value: 'MCCB', label: 'MCCB' },
  { value: 'Switch-Fuse', label: 'Switch-Fuse' },
];

const MAIN_SWITCH_RATINGS = [
  { value: '40', label: '40A' },
  { value: '63', label: '63A' },
  { value: '80', label: '80A' },
  { value: '100', label: '100A' },
  { value: '125', label: '125A' },
  { value: '160', label: '160A' },
  { value: '200', label: '200A' },
  { value: '250', label: '250A' },
];

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

// rounded-xl matches the MW ground-truth chips (MWDetailsTab/MWTestingTab).
const chipBase =
  'h-11 rounded-xl text-[12px] font-medium transition-all touch-manipulation active:scale-[0.97]';
const chipOn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white';

const BoardSetupCard: React.FC<BoardSetupCardProps> = ({
  board,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false,
  isRemovable = true,
  className,
  certType,
}) => {
  const isEicr = certType === 'eicr';
  // ELE-1388 — the EIC collapses Make/Model/From/Ways into a single free-text
  // "Board details" line (e.g. "Wylex 10way"). The individual data fields are
  // kept on the type so old certs keep their values.
  const isEic = certType === 'eic';
  // ELE-830: Main-ness is position-based (order === 0), not ID-based.
  // The dual-check preserves backwards compatibility with legacy certs where
  // the main always had id='main-cu' (matches BoardSection.tsx).
  const isMainBoard = isMainBoardFn(board) || board.id === MAIN_BOARD_ID;
  // Hide the reorder chevrons entirely when this is the only board — nothing
  // to reorder, so no permanently-disabled controls.
  const canReorder = (onMoveUp !== undefined || onMoveDown !== undefined) && !(isFirst && isLast);
  const haptic = useHaptic();

  return (
    <div
      className={cn(
        // EIC details tab renders inside a px-4 column whose sibling cards are
        // full-bleed on mobile — match that treatment. Other hosts (EICR
        // section, EICR wizard Card) keep the inset rounded card.
        isEic
          ? '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x'
          : 'rounded-2xl border border-white/[0.14]',
        'bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4',
        className
      )}
      // Delegated press haptic — every chip/button tap in the board card buzzes
      // like the MW tabs without wiring each onClick individually.
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) haptic.light();
      }}
    >
      {/* Board Header */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <h3 className="text-[15px] font-semibold tracking-tight text-white truncate">
              {board.name}
            </h3>
            <span
              className={cn(
                'text-[11px] font-semibold shrink-0',
                isMainBoard ? 'text-elec-yellow' : 'text-white/85'
              )}
            >
              {isMainBoard ? 'Main board' : 'Sub-board'}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {canReorder && (
              <>
                <button
                  type="button"
                  onClick={onMoveUp}
                  disabled={isFirst}
                  aria-label={`Move ${board.name} up`}
                  className={cn(
                    'h-11 w-11 rounded-xl flex items-center justify-center touch-manipulation',
                    'border border-white/[0.08] text-white active:scale-[0.98]',
                    isFirst
                      ? 'opacity-25 cursor-not-allowed'
                      : 'bg-white/[0.04] hover:bg-white/[0.08]'
                  )}
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onMoveDown}
                  disabled={isLast}
                  aria-label={`Move ${board.name} down`}
                  className={cn(
                    'h-11 w-11 rounded-xl flex items-center justify-center touch-manipulation',
                    'border border-white/[0.08] text-white active:scale-[0.98]',
                    isLast
                      ? 'opacity-25 cursor-not-allowed'
                      : 'bg-white/[0.04] hover:bg-white/[0.08]'
                  )}
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </>
            )}
            {isRemovable && !isMainBoard && onRemove && (
              <button
                onClick={onRemove}
                aria-label={`Remove ${board.name}`}
                className="h-11 px-3 rounded-xl text-[13px] font-semibold text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Board Details — flat block. Desktop gets more columns so the card
          reads dense at 1600px instead of two ~750px-wide fields per row. */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 items-end">
          <div>
            <label className={labelCn}>Reference</label>
            <Input value={board.reference} onChange={(e) => onUpdate('reference', e.target.value)} placeholder="Main CU" className={inputCn} />
          </div>
          <div>
            <label className={labelCn}>Location</label>
            <MobileSelectPicker value={board.location || ''} onValueChange={(value) => onUpdate('location', value)} options={BOARD_LOCATIONS.map((loc) => ({ value: loc, label: loc }))} placeholder="Select" title="Location" triggerClassName={pickerTriggerCn} />
          </div>
        </div>

        {/* ELE-1388 — EIC: one free-text board line instead of Make/Model/From/Ways. */}
        {isEic && (
          <div>
            <label className={labelCn}>Board details</label>
            <Input
              value={board.boardDetails || ''}
              onChange={(e) => onUpdate('boardDetails', e.target.value)}
              placeholder="e.g. Wylex 10way, Hager 4way"
              className={inputCn}
            />
          </div>
        )}

        {/* EICR drops Model to streamline the board (ELE-1106). From stays on BOTH
            cert types: the EICR PDF prints supplied_from (with "DNO"/"Main DB"
            template defaults), so hiding the input left users stuck with values
            they couldn't change (ELE-1244). */}
        {!isEic && (
        <div className={cn('grid grid-cols-1 gap-x-6 gap-y-4 items-end lg:grid-cols-4', isEicr ? 'sm:grid-cols-2' : 'sm:grid-cols-3')}>
          <div>
            <label className={labelCn}>Make</label>
            {/* ELE-1383 — free text, not a dropdown: manufacturers vary too much
                for a fixed list. */}
            <Input value={board.make || ''} onChange={(e) => onUpdate('make', e.target.value)} placeholder="e.g. Hager, Schneider" className={inputCn} />
          </div>
          {!isEicr && (
            <div>
              <label className={labelCn}>Model</label>
              <Input value={board.model || ''} onChange={(e) => onUpdate('model', e.target.value)} placeholder="VML110" className={inputCn} />
            </div>
          )}
          <div>
            <label className={labelCn}>From</label>
            <Input value={board.suppliedFrom || ''} onChange={(e) => onUpdate('suppliedFrom', e.target.value)} placeholder={isMainBoard ? 'DNO' : 'DB'} className={inputCn} />
          </div>
        </div>
        )}

        {/* Ways as toggle buttons + custom. ELE-1245 — read the selection via
            getBoardWays so boards whose way count arrived under a legacy or
            alternate field (ways / totalWaysCustom) still highlight instead of
            showing blank. Select/deselect writes a PATCH that also clears the
            alternate fields — otherwise getBoardWays falls back to the old
            value and the button can never be un-toggled. */}
        {!isEic && (
        <div>
          {(() => {
            const selectedWays = board.totalWays === -1 ? -1 : getBoardWays(board) ?? 0;
            const clearedWays = { totalWays: 0, totalWaysCustom: '', ways: '' };
            return (
              <>
                <label className={labelCn}>Ways</label>
                {/* Full-width grid on phones; natural-width chips on desktop so
                    twelve options don't stretch into giant pills at 1600px. */}
                <div className="grid grid-cols-6 gap-1 sm:flex sm:flex-wrap">
                  {[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() =>
                        onUpdate(selectedWays === w ? clearedWays : { ...clearedWays, totalWays: w })
                      }
                      className={cn(chipBase, 'sm:h-9 sm:w-12', selectedWays === w ? chipOn : chipOff)}
                    >
                      {w}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      onUpdate(selectedWays === -1 ? clearedWays : { ...clearedWays, totalWays: -1 })
                    }
                    className={cn(chipBase, 'sm:h-9 sm:w-16', selectedWays === -1 ? chipOn : chipOff)}
                  >
                    Other
                  </button>
                </div>
                {selectedWays === -1 && (
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={(board as any).totalWaysCustom || ''}
                    onChange={(e) => onUpdate('totalWaysCustom' as any, e.target.value)}
                    placeholder="e.g. 32"
                    className={cn(inputCn, 'mt-1')}
                  />
                )}
              </>
            );
          })()}
        </div>
        )}

        {/* Board Type — dual select: Enclosure + Mounting. Natural-width chips
            on desktop (full-width halves read as giant bars at 1600px). */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-10">
          <div>
            <label className={labelCn}>Enclosure</label>
            <div className="grid grid-cols-2 gap-1 sm:flex">
              {[{ value: 'metal-clad', label: 'Metal' }, { value: 'plastic', label: 'Plastic' }].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => onUpdate('type', board.type === t.value || board.type?.startsWith(t.value) ? '' : t.value as BoardType)}
                  className={cn(chipBase, 'sm:h-9 sm:w-24', board.type?.includes(t.value.split('-')[0]) ? chipOn : chipOff)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCn}>Mounting</label>
            <div className="grid grid-cols-2 gap-1 sm:flex">
              {[{ value: 'flush-mount', label: 'Flush' }, { value: 'surface-mount', label: 'Surface' }].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => {
                    const mounting = (board as any).boardMounting === t.value ? '' : t.value;
                    onUpdate('boardMounting' as any, mounting);
                  }}
                  className={cn(chipBase, 'sm:h-9 sm:w-24', (board as any).boardMounting === t.value ? chipOn : chipOff)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Incoming Device — Smart Cascading.
          Hidden on EICR (ELE-1107): duplicates the main protective device captured
          in the supply/main-switch section. Mapping retained so old certs still render. */}
      {!isEicr && (() => {
        const incomingTypeOptions = getTypeOptionsForBsEn(board.incomingDeviceBsEn || '');
        const incomingRatings = getRatingOptionsForBsEn(board.incomingDeviceBsEn || '');
        const isRCD = board.incomingDeviceBsEn === '61008';
        const isRCBO = board.incomingDeviceBsEn === '61009';
        const hasRcdFields = isRCD || isRCBO || ['RCD', 'RCCB', 'RCBO'].includes(board.incomingDeviceType || '');
        const ratingUnit = isRCD ? 'mA' : 'A';
        return (
          <div className="border-t border-white/[0.1] pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-white">Incoming device</h3>
            <div className={cn('grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-4', incomingTypeOptions ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
              <div>
                <label className={labelCn}>BS EN</label>
                <MobileSelectPicker
                  value={board.incomingDeviceBsEn || ''}
                  onValueChange={(value) => {
                    onUpdate({ incomingDeviceBsEn: value, incomingDeviceType: '', incomingDeviceRating: '' });
                  }}
                  options={BS_EN_OPTIONS}
                  placeholder="Select"
                  title="BS EN standard"
                  triggerClassName={pickerTriggerCn}
                />
              </div>
              {incomingTypeOptions && (
                <div>
                  <label className={labelCn}>Type</label>
                  <MobileSelectPicker
                    value={board.incomingDeviceType || ''}
                    onValueChange={(value) => onUpdate('incomingDeviceType', value)}
                    options={incomingTypeOptions}
                    placeholder="Select"
                    title="Device type"
                    triggerClassName={pickerTriggerCn}
                  />
                </div>
              )}
              <div>
                <label className={labelCn}>Rating ({ratingUnit})</label>
                <MobileSelectPicker
                  value={board.incomingDeviceRating || ''}
                  onValueChange={(value) => onUpdate('incomingDeviceRating', value)}
                  options={incomingRatings.map((r) => ({ value: String(r), label: `${r}${ratingUnit}` }))}
                  placeholder="Select"
                  title={`Rating (${ratingUnit})`}
                  triggerClassName={pickerTriggerCn}
                />
              </div>
            </div>
            {/* RCD/RCBO mA and trip time */}
            {hasRcdFields && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
                <div>
                  <label className={labelCn}>RCD mA</label>
                  <MobileSelectPicker
                    value={(board as any).incomingRcdMa || ''}
                    onValueChange={(value) => onUpdate('incomingRcdMa' as any, value)}
                    options={[{ value: '30', label: '30mA' }, { value: '100', label: '100mA' }, { value: '300', label: '300mA' }]}
                    placeholder="Select"
                    title="RCD rating (mA)"
                    triggerClassName={pickerTriggerCn}
                  />
                </div>
                <div>
                  <label className={labelCn}>Trip time (ms)</label>
                  <MobileSelectPicker
                    value={(board as any).incomingRcdMs || ''}
                    onValueChange={(value) => onUpdate('incomingRcdMs' as any, value)}
                    options={[{ value: '0', label: '0ms' }, { value: '40', label: '40ms' }, { value: '150', label: '150ms' }, { value: '300', label: '300ms' }, { value: '500', label: '500ms' }]}
                    placeholder="Select"
                    title="Trip time (ms)"
                    triggerClassName={pickerTriggerCn}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Main Switch — Smart Cascading */}
      {(() => {
        const switchTypeOptions = getTypeOptionsForBsEn(board.mainSwitchBsEn || '');
        const switchRatings = getRatingOptionsForBsEn(board.mainSwitchBsEn || '');
        const isRCD = board.mainSwitchBsEn === '61008';
        const isRCBO = board.mainSwitchBsEn === '61009';
        const hasRcdFields = isRCD || isRCBO || ['RCD', 'RCCB', 'RCBO'].includes(board.mainSwitchType || '');
        const ratingUnit = isRCD ? 'mA' : 'A';
        const typeOptions = switchTypeOptions || SWITCH_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }));
        const ratingOptions = board.mainSwitchBsEn
          ? switchRatings.map((r) => ({ value: String(r), label: `${r}${ratingUnit}` }))
          : MAIN_SWITCH_RATINGS;
        return (
          <div className="border-t border-white/[0.1] pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-white">Main switch</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 items-end">
              <div>
                <label className={labelCn}>BS EN</label>
                <MobileSelectPicker
                  value={board.mainSwitchBsEn || ''}
                  onValueChange={(value) => {
                    onUpdate({ mainSwitchBsEn: value, mainSwitchType: '', mainSwitchRating: '' });
                  }}
                  options={BS_EN_OPTIONS}
                  placeholder="Select"
                  title="BS EN standard"
                  triggerClassName={pickerTriggerCn}
                />
              </div>
              <div>
                <label className={labelCn}>Type</label>
                <MobileSelectPicker
                  value={board.mainSwitchType || ''}
                  onValueChange={(value) => onUpdate('mainSwitchType', value)}
                  options={typeOptions}
                  placeholder="Select"
                  title="Type"
                  triggerClassName={pickerTriggerCn}
                />
              </div>
              <div>
                <label className={labelCn}>Rating ({ratingUnit})</label>
                <MobileSelectPicker
                  value={board.mainSwitchRating || ''}
                  onValueChange={(value) => onUpdate('mainSwitchRating', value)}
                  options={ratingOptions}
                  placeholder="Select"
                  title={`Rating (${ratingUnit})`}
                  triggerClassName={pickerTriggerCn}
                />
              </div>
            </div>
            {/* RCD/RCBO mA and trip time */}
            {hasRcdFields && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
                <div>
                  <label className={labelCn}>RCD mA</label>
                  <MobileSelectPicker
                    value={(board as any).mainSwitchRcdMa || ''}
                    onValueChange={(value) => onUpdate('mainSwitchRcdMa' as any, value)}
                    options={[{ value: '30', label: '30mA' }, { value: '100', label: '100mA' }, { value: '300', label: '300mA' }]}
                    placeholder="Select"
                    title="RCD rating (mA)"
                    triggerClassName={pickerTriggerCn}
                  />
                </div>
                <div>
                  <label className={labelCn}>Trip time (ms)</label>
                  <MobileSelectPicker
                    value={(board as any).mainSwitchRcdMs || ''}
                    onValueChange={(value) => onUpdate('mainSwitchRcdMs' as any, value)}
                    options={[{ value: '0', label: '0ms' }, { value: '40', label: '40ms' }, { value: '150', label: '150ms' }, { value: '300', label: '300ms' }, { value: '500', label: '500ms' }]}
                    placeholder="Select"
                    title="Trip time (ms)"
                    triggerClassName={pickerTriggerCn}
                  />
                </div>
              </div>
            )}
            {/* Poles as toggle buttons — natural width on desktop */}
            <div>
              <label className={labelCn}>Poles</label>
              <div className="grid grid-cols-4 gap-1 sm:flex">
                {['SP', 'DP', 'TP', 'TPN'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => onUpdate('mainSwitchPoles', board.mainSwitchPoles === p ? '' : p)}
                    className={cn(chipBase, 'sm:h-9 sm:w-16', board.mainSwitchPoles === p ? chipOn : chipOff)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Test instruments are captured once globally in the Testing tab footer — not per-board */}
    </div>
  );
};

export default BoardSetupCard;
