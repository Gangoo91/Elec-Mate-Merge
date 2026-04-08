import React from 'react';
import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DistributionBoard,
  MAIN_BOARD_ID,
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
  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/60 focus:border-elec-yellow';

const BoardSetupCard: React.FC<BoardSetupCardProps> = ({
  board,
  onUpdate,
  onRemove,
  isRemovable = true,
  className,
}) => {
  const isMainBoard = board.id === MAIN_BOARD_ID || board.order === 0;

  return (
    <div className={cn('space-y-3', className)}>
      {/* Board Header */}
      <div className="space-y-2">
        <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10" />
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium text-white uppercase tracking-wider">
            {board.name}
          </h3>
          {isRemovable && !isMainBoard && onRemove && (
            <button
              onClick={onRemove}
              className="text-[10px] text-red-400/50 hover:text-red-400 touch-manipulation"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Reference + Location + Make */}
      <div className="grid grid-cols-2 gap-3 items-end">
        <div>
          <label className="text-xs text-white block mb-1">Reference</label>
          <Input value={board.reference} onChange={(e) => onUpdate('reference', e.target.value)} placeholder="Main CU" className={inputCn} />
        </div>
        <div>
          <label className="text-xs text-white block mb-1">Location</label>
          <MobileSelectPicker value={board.location || ''} onValueChange={(value) => onUpdate('location', value)} options={BOARD_LOCATIONS.map((loc) => ({ value: loc, label: loc }))} placeholder="Select" title="Location" triggerClassName="text-white" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 items-end">
        <div>
          <label className="text-xs text-white block mb-1">Manufacturer</label>
          <MobileSelectPicker value={board.make || ''} onValueChange={(value) => onUpdate('make', value)} options={BOARD_MANUFACTURERS.map((m) => ({ value: m, label: m }))} placeholder="Select" title="Manufacturer" triggerClassName="text-white" />
        </div>
        <div>
          <label className="text-xs text-white block mb-1">Board Type</label>
          <MobileSelectPicker value={board.type || ''} onValueChange={(value) => onUpdate('type', value as BoardType)} options={BOARD_TYPES.map((t) => ({ value: t.value, label: t.label }))} placeholder="Select" title="Board Type" triggerClassName="text-white" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-white block mb-1">Ways</label>
          <MobileSelectPicker value={board.totalWays?.toString() || ''} onValueChange={(value) => onUpdate('totalWays', parseInt(value, 10))} options={BOARD_SIZES.map((s) => ({ value: s.toString(), label: `${s} way` }))} placeholder="Select" title="Size (Ways)" triggerClassName="text-white" />
        </div>
        <div>
          <label className="text-xs text-white block mb-1">Model</label>
          <Input value={board.model || ''} onChange={(e) => onUpdate('model', e.target.value)} placeholder="VML110" className={inputCn} />
        </div>
        <div>
          <label className="text-xs text-white block mb-1">Supplied From</label>
          <Input value={board.suppliedFrom || ''} onChange={(e) => onUpdate('suppliedFrom', e.target.value)} placeholder={isMainBoard ? 'DNO' : 'Main CU'} className={inputCn} />
        </div>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-white/[0.06] to-transparent" />

      {/* Incoming Device — Smart Cascading */}
      {(() => {
        const incomingTypeOptions = getTypeOptionsForBsEn(board.incomingDeviceBsEn || '');
        const incomingRatings = getRatingOptionsForBsEn(board.incomingDeviceBsEn || '');
        const isRCD = board.incomingDeviceBsEn === '61008';
        const ratingUnit = isRCD ? 'mA' : 'A';
        return (
          <div className="space-y-2">
            <label className="text-xs text-white block">Incoming Device</label>
            <div className={cn('grid gap-3', incomingTypeOptions ? 'grid-cols-3' : 'grid-cols-2')}>
              <div>
                <label className="text-[10px] text-white/60 block mb-1">BS EN</label>
                <MobileSelectPicker
                  value={board.incomingDeviceBsEn || ''}
                  onValueChange={(value) => {
                    // Batch update: set BS EN and clear dependent fields
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
                  <label className="text-[10px] text-white/60 block mb-1">Type</label>
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
                <label className="text-[10px] text-white/60 block mb-1">Rating ({ratingUnit})</label>
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
          </div>
        );
      })()}

      <div className="h-[1px] bg-gradient-to-r from-white/[0.06] to-transparent" />

      {/* Main Switch — Smart Cascading */}
      {(() => {
        const switchTypeOptions = getTypeOptionsForBsEn(board.mainSwitchBsEn || '');
        const switchRatings = getRatingOptionsForBsEn(board.mainSwitchBsEn || '');
        const isRCD = board.mainSwitchBsEn === '61008';
        const ratingUnit = isRCD ? 'mA' : 'A';
        // Use SWITCH_TYPE_OPTIONS as fallback when no BS EN selected
        const typeOptions = switchTypeOptions || SWITCH_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }));
        const ratingOptions = board.mainSwitchBsEn
          ? switchRatings.map((r) => ({ value: String(r), label: `${r}${ratingUnit}` }))
          : MAIN_SWITCH_RATINGS;
        return (
          <div className="space-y-2">
            <label className="text-xs text-white block">Main Switch</label>
            <div className="grid grid-cols-2 gap-3 items-end">
              <div>
                <label className="text-[10px] text-white/60 block mb-1">BS EN</label>
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
                <label className="text-[10px] text-white/60 block mb-1">Type</label>
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
                <label className="text-[10px] text-white/60 block mb-1">Rating ({ratingUnit})</label>
                <MobileSelectPicker
                  value={board.mainSwitchRating || ''}
                  onValueChange={(value) => onUpdate('mainSwitchRating', value)}
                  options={ratingOptions}
                  placeholder="Select"
                  title={`Rating (${ratingUnit})`}
                  triggerClassName="text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-white/60 block mb-1">Poles</label>
                <MobileSelectPicker
                  value={board.mainSwitchPoles || ''}
                  onValueChange={(value) => onUpdate('mainSwitchPoles', value)}
                  options={[{ value: 'SP', label: 'SP' }, { value: 'DP', label: 'DP' }, { value: 'TP', label: 'TP' }, { value: 'TPN', label: 'TPN' }]}
                  placeholder="Select"
                  title="Poles"
                  triggerClassName="text-white"
                />
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default BoardSetupCard;
