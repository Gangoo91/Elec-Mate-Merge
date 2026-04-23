import React from 'react';
import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DistributionBoard,
  isMainBoard as isMainBoardFn,
  BOARD_MANUFACTURERS,
  BOARD_TYPES,
  BOARD_LOCATIONS,
  BOARD_SIZES,
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
}

// BS EN Standards
const BS_EN_OPTIONS = [
  { value: '60898', label: 'BS EN 60898 — MCB' },
  { value: '61009', label: 'BS EN 61009 — RCBO' },
  { value: '61008', label: 'BS EN 61008 — RCD' },
  { value: '60947', label: 'BS EN 60947 — Industrial' },
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
    case '60947': // Industrial
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
    case '60947': // Industrial
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
  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow';

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
}) => {
  // ELE-830: Main-ness is position-based (order === 0), not ID-based.
  // The dual-check preserves backwards compatibility with legacy certs where
  // the main always had id='main-cu'.
  const isMainBoard = isMainBoardFn(board);
  const canReorder = (onMoveUp || onMoveDown) !== undefined;

  return (
    <div className={cn('space-y-3', className)}>
      {/* Board Header */}
      <div className="space-y-2">
        <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10" />
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <h3 className="text-xs font-medium text-white uppercase tracking-wider truncate">
              {board.name}
            </h3>
            <span
              className={cn(
                'text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0',
                isMainBoard
                  ? 'bg-elec-yellow/15 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-blue-500/15 border border-blue-500/40 text-blue-300'
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
                    'h-11 w-11 rounded-md flex items-center justify-center touch-manipulation',
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
                    'h-11 w-11 rounded-md flex items-center justify-center touch-manipulation',
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
                className="h-11 px-2 text-[10px] text-red-400/70 hover:text-red-400 touch-manipulation"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Board Details — grouped card */}
      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-2">
        <div className="grid grid-cols-2 gap-2 items-end">
          <div>
            <label className="text-[10px] text-white block mb-1">Reference</label>
            <Input value={board.reference} onChange={(e) => onUpdate('reference', e.target.value)} placeholder="Main CU" className={inputCn} />
          </div>
          <div>
            <label className="text-[10px] text-white block mb-1">Location</label>
            <MobileSelectPicker value={board.location || ''} onValueChange={(value) => onUpdate('location', value)} options={BOARD_LOCATIONS.map((loc) => ({ value: loc, label: loc }))} placeholder="Select" title="Location" triggerClassName="text-white" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 items-end">
          <div>
            <label className="text-[10px] text-white block mb-1">Make</label>
            <MobileSelectPicker value={board.make || ''} onValueChange={(value) => onUpdate('make', value)} options={BOARD_MANUFACTURERS.map((m) => ({ value: m, label: m }))} placeholder="Select" title="Manufacturer" triggerClassName="text-white" />
          </div>
          <div>
            <label className="text-[10px] text-white block mb-1">Model</label>
            <Input value={board.model || ''} onChange={(e) => onUpdate('model', e.target.value)} placeholder="VML110" className={inputCn} />
          </div>
          <div>
            <label className="text-[10px] text-white block mb-1">From</label>
            <Input value={board.suppliedFrom || ''} onChange={(e) => onUpdate('suppliedFrom', e.target.value)} placeholder={isMainBoard ? 'DNO' : 'DB'} className={inputCn} />
          </div>
        </div>

        {/* Ways as toggle buttons + custom */}
        <div>
          <label className="text-[10px] text-white block mb-1">Ways</label>
          <div className="grid grid-cols-6 sm:grid-cols-9 gap-1">
            {[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => onUpdate('totalWays', board.totalWays === w ? 0 : w)}
                className={cn(
                  'h-9 rounded-md font-semibold transition-all touch-manipulation text-[10px] active:scale-[0.98]',
                  board.totalWays === w
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {w}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onUpdate('totalWays', board.totalWays === -1 ? 0 : -1)}
              className={cn(
                'h-9 rounded-md font-semibold transition-all touch-manipulation text-[10px] active:scale-[0.98]',
                board.totalWays === -1
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              Other
            </button>
          </div>
          {board.totalWays === -1 && (
            <Input
              type="number"
              inputMode="numeric"
              value={(board as any).totalWaysCustom || ''}
              onChange={(e) => onUpdate('totalWaysCustom' as any, e.target.value)}
              placeholder="e.g. 32"
              className={cn(inputCn, 'mt-1')}
            />
          )}
        </div>

        {/* Board Type — dual select: Enclosure + Mounting */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-white block mb-1">Enclosure</label>
            <div className="grid grid-cols-2 gap-1">
              {[{ value: 'metal-clad', label: 'Metal' }, { value: 'plastic', label: 'Plastic' }].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => onUpdate('type', board.type === t.value || board.type?.startsWith(t.value) ? '' : t.value as BoardType)}
                  className={cn(
                    'h-9 rounded-md font-medium transition-all touch-manipulation text-[10px] active:scale-[0.98]',
                    board.type?.includes(t.value.split('-')[0])
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] border border-white/[0.08] text-white'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-white block mb-1">Mounting</label>
            <div className="grid grid-cols-2 gap-1">
              {[{ value: 'flush-mount', label: 'Flush' }, { value: 'surface-mount', label: 'Surface' }].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => {
                    const mounting = (board as any).boardMounting === t.value ? '' : t.value;
                    onUpdate('boardMounting' as any, mounting);
                  }}
                  className={cn(
                    'h-9 rounded-md font-medium transition-all touch-manipulation text-[10px] active:scale-[0.98]',
                    (board as any).boardMounting === t.value
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] border border-white/[0.08] text-white'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Incoming Device — Smart Cascading */}
      {(() => {
        const incomingTypeOptions = getTypeOptionsForBsEn(board.incomingDeviceBsEn || '');
        const incomingRatings = getRatingOptionsForBsEn(board.incomingDeviceBsEn || '');
        const isRCD = board.incomingDeviceBsEn === '61008';
        const isRCBO = board.incomingDeviceBsEn === '61009';
        const hasRcdFields = isRCD || isRCBO || ['RCD', 'RCCB', 'RCBO'].includes(board.incomingDeviceType || '');
        const ratingUnit = isRCD ? 'mA' : 'A';
        return (
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-2">
            <label className="text-[10px] font-medium text-elec-yellow/80 uppercase tracking-wider">Incoming Device</label>
            <div className={cn('grid gap-2', incomingTypeOptions ? 'grid-cols-3' : 'grid-cols-2')}>
              <div>
                <label className="text-[10px] text-white block mb-1">BS EN</label>
                <MobileSelectPicker
                  value={board.incomingDeviceBsEn || ''}
                  onValueChange={(value) => {
                    onUpdate({ incomingDeviceBsEn: value, incomingDeviceType: '', incomingDeviceRating: '' });
                  }}
                  options={BS_EN_OPTIONS}
                  placeholder="Select"
                  title="BS EN Standard"
                  triggerClassName="text-white"
                />
              </div>
              {incomingTypeOptions && (
                <div>
                  <label className="text-[10px] text-white block mb-1">Type</label>
                  <MobileSelectPicker
                    value={board.incomingDeviceType || ''}
                    onValueChange={(value) => onUpdate('incomingDeviceType', value)}
                    options={incomingTypeOptions}
                    placeholder="Select"
                    title="Device Type"
                    triggerClassName="text-white"
                  />
                </div>
              )}
              <div>
                <label className="text-[10px] text-white block mb-1">Rating ({ratingUnit})</label>
                <MobileSelectPicker
                  value={board.incomingDeviceRating || ''}
                  onValueChange={(value) => onUpdate('incomingDeviceRating', value)}
                  options={incomingRatings.map((r) => ({ value: String(r), label: `${r}${ratingUnit}` }))}
                  placeholder="Select"
                  title={`Rating (${ratingUnit})`}
                  triggerClassName="text-white"
                />
              </div>
            </div>
            {/* RCD/RCBO mA and trip time */}
            {hasRcdFields && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-white block mb-1">RCD mA</label>
                  <MobileSelectPicker
                    value={(board as any).incomingRcdMa || ''}
                    onValueChange={(value) => onUpdate('incomingRcdMa' as any, value)}
                    options={[{ value: '30', label: '30mA' }, { value: '100', label: '100mA' }, { value: '300', label: '300mA' }]}
                    placeholder="Select"
                    title="RCD Rating (mA)"
                    triggerClassName="text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-white block mb-1">Trip Time (ms)</label>
                  <MobileSelectPicker
                    value={(board as any).incomingRcdMs || ''}
                    onValueChange={(value) => onUpdate('incomingRcdMs' as any, value)}
                    options={[{ value: '0', label: '0ms' }, { value: '40', label: '40ms' }, { value: '150', label: '150ms' }, { value: '300', label: '300ms' }, { value: '500', label: '500ms' }]}
                    placeholder="Select"
                    title="Trip Time (ms)"
                    triggerClassName="text-white"
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
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-2">
            <label className="text-[10px] font-medium text-elec-yellow/80 uppercase tracking-wider">Main Switch</label>
            <div className="grid grid-cols-2 gap-3 items-end">
              <div>
                <label className="text-[10px] text-white block mb-1">BS EN</label>
                <MobileSelectPicker
                  value={board.mainSwitchBsEn || ''}
                  onValueChange={(value) => {
                    onUpdate({ mainSwitchBsEn: value, mainSwitchType: '', mainSwitchRating: '' });
                  }}
                  options={BS_EN_OPTIONS}
                  placeholder="Select"
                  title="BS EN Standard"
                  triggerClassName="text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-white block mb-1">Type</label>
                <MobileSelectPicker
                  value={board.mainSwitchType || ''}
                  onValueChange={(value) => onUpdate('mainSwitchType', value)}
                  options={typeOptions}
                  placeholder="Select"
                  title="Type"
                  triggerClassName="text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-white block mb-1">Rating ({ratingUnit})</label>
                <MobileSelectPicker
                  value={board.mainSwitchRating || ''}
                  onValueChange={(value) => onUpdate('mainSwitchRating', value)}
                  options={ratingOptions}
                  placeholder="Select"
                  title={`Rating (${ratingUnit})`}
                  triggerClassName="text-white"
                />
              </div>
            </div>
            {/* RCD/RCBO mA and trip time */}
            {hasRcdFields && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-white block mb-1">RCD mA</label>
                  <MobileSelectPicker
                    value={(board as any).mainSwitchRcdMa || ''}
                    onValueChange={(value) => onUpdate('mainSwitchRcdMa' as any, value)}
                    options={[{ value: '30', label: '30mA' }, { value: '100', label: '100mA' }, { value: '300', label: '300mA' }]}
                    placeholder="Select"
                    title="RCD Rating (mA)"
                    triggerClassName="text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-white block mb-1">Trip Time (ms)</label>
                  <MobileSelectPicker
                    value={(board as any).mainSwitchRcdMs || ''}
                    onValueChange={(value) => onUpdate('mainSwitchRcdMs' as any, value)}
                    options={[{ value: '0', label: '0ms' }, { value: '40', label: '40ms' }, { value: '150', label: '150ms' }, { value: '300', label: '300ms' }, { value: '500', label: '500ms' }]}
                    placeholder="Select"
                    title="Trip Time (ms)"
                    triggerClassName="text-white"
                  />
                </div>
              </div>
            )}
            {/* Poles as toggle buttons */}
            <div>
              <label className="text-[10px] text-white block mb-1">Poles</label>
              <div className="grid grid-cols-4 gap-1">
                {['SP', 'DP', 'TP', 'TPN'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => onUpdate('mainSwitchPoles', board.mainSwitchPoles === p ? '' : p)}
                    className={cn(
                      'h-9 rounded-md font-semibold transition-all touch-manipulation text-[10px] active:scale-[0.98]',
                      board.mainSwitchPoles === p
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] border border-white/[0.08] text-white'
                    )}
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
