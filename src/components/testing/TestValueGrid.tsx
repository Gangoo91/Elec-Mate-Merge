import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { TestResult } from '@/types/testResult';
import { useHaptics } from '@/hooks/useHaptics';
import QuickValueInput from './QuickValueInput';
import { Check, AlertTriangle } from 'lucide-react';

interface TestValueGridProps {
  circuit: TestResult;
  onUpdate: (field: keyof TestResult, value: string) => void;
}

interface TestTile {
  field: keyof TestResult;
  label: string;
  unit: string;
  placeholder: string;
  validate?: (value: string, circuit: TestResult) => 'pass' | 'fail' | 'warning' | null;
}

const TEST_TILES: TestTile[] = [
  {
    field: 'r1r2',
    label: 'R1+R2',
    unit: 'Ω',
    placeholder: '0.00',
    validate: (value) => {
      if (!value) return null;
      const num = parseFloat(value);
      if (num <= 1.0) return 'pass';
      if (num <= 1.5) return 'warning';
      return 'fail';
    }
  },
  {
    field: 'zs',
    label: 'Zs',
    unit: 'Ω',
    placeholder: '0.00',
    validate: (value, circuit) => {
      if (!value) return null;
      const zs = parseFloat(value);
      const maxZs = parseFloat(circuit.maxZs || '');
      if (!maxZs) return null;
      if (zs <= maxZs * 0.8) return 'pass';
      if (zs <= maxZs) return 'warning';
      return 'fail';
    }
  },
  {
    field: 'insulationLiveEarth',
    label: 'Ir (L-E)',
    unit: 'MΩ',
    placeholder: '>200',
    validate: (value) => {
      if (!value) return null;
      if (value.includes('>') || parseFloat(value) >= 2) return 'pass';
      if (parseFloat(value) >= 1) return 'warning';
      return 'fail';
    }
  },
  {
    field: 'polarity',
    label: 'Polarity',
    unit: '',
    placeholder: '✓',
    validate: (value) => {
      if (!value) return null;
      const v = value.toLowerCase();
      if (v === '✓' || v === 'correct' || v === 'ok' || v === 'c') return 'pass';
      return 'fail';
    }
  }
];

const EXTRA_TILES: TestTile[] = [
  {
    field: 'rcdOneX',
    label: 'RCD 1×',
    unit: 'ms',
    placeholder: '<300',
    validate: (value) => {
      if (!value) return null;
      const num = parseFloat(value);
      if (num <= 200) return 'pass';
      if (num <= 300) return 'warning';
      return 'fail';
    }
  },
  {
    field: 'pfc',
    label: 'Ipf',
    unit: 'kA',
    placeholder: '0.0',
    validate: () => null // No automatic validation
  }
];

/**
 * TestValueGrid - 2x2 grid of tappable test value tiles
 * Optimized for quick data entry on mobile with validation colors
 */
const TestValueGrid: React.FC<TestValueGridProps> = ({ circuit, onUpdate }) => {
  const haptics = useHaptics();
  const [editingField, setEditingField] = useState<keyof TestResult | null>(null);

  const handleTileClick = (field: keyof TestResult) => {
    haptics.tap();
    setEditingField(field);
  };

  const handleValueChange = (field: keyof TestResult, value: string) => {
    onUpdate(field, value);
  };

  const handleInputClose = () => {
    setEditingField(null);
  };

  // Check if circuit has RCD (show extra tile)
  const hasRcd = circuit.protectiveDeviceType === 'RCBO' ||
    circuit.protectiveDeviceType === 'RCD' ||
    circuit.bsStandard?.includes('RCBO') ||
    circuit.bsStandard?.includes('RCD');

  const tilesToShow = hasRcd ? [...TEST_TILES, EXTRA_TILES[0]] : TEST_TILES;

  const getValidationColor = (status: 'pass' | 'fail' | 'warning' | null) => {
    switch (status) {
      case 'pass': return 'border-green-500/50 bg-green-500/10';
      case 'warning': return 'border-amber-500/50 bg-amber-500/10';
      case 'fail': return 'border-red-500/50 bg-red-500/10';
      default: return 'border-white/10 bg-white/5';
    }
  };

  const getValidationIcon = (status: 'pass' | 'fail' | 'warning' | null) => {
    switch (status) {
      case 'pass': return <Check className="h-3 w-3 text-green-400" />;
      case 'warning': return <AlertTriangle className="h-3 w-3 text-amber-400" />;
      case 'fail': return <AlertTriangle className="h-3 w-3 text-red-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-xs font-medium text-white/60 uppercase tracking-wide">
        Quick Test Entry
      </Label>

      {/* 2x2 Grid of tappable tiles */}
      <div className="grid grid-cols-2 gap-3">
        {tilesToShow.map((tile) => {
          const value = circuit[tile.field] as string || '';
          const validationStatus = tile.validate?.(value, circuit) || null;
          const isEditing = editingField === tile.field;

          return (
            <div key={tile.field} className="relative">
              {isEditing ? (
                <QuickValueInput
                  value={value}
                  onChange={(v) => handleValueChange(tile.field, v)}
                  onClose={handleInputClose}
                  label={tile.label}
                  unit={tile.unit}
                  placeholder={tile.placeholder}
                  validationStatus={validationStatus}
                />
              ) : (
                <button
                  onClick={() => handleTileClick(tile.field)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 transition-transform duration-200",
                    "touch-manipulation active:scale-95",
                    "flex flex-col items-center justify-center min-h-[90px]",
                    getValidationColor(validationStatus)
                  )}
                >
                  {/* Label */}
                  <span className="text-xs text-white/50 mb-1">{tile.label}</span>

                  {/* Value */}
                  <div className="flex items-center gap-1">
                    <span className={cn(
                      "text-2xl font-bold",
                      value ? "text-white" : "text-white/30"
                    )}>
                      {value || tile.placeholder}
                    </span>
                    {tile.unit && value && (
                      <span className="text-sm text-white/50">{tile.unit}</span>
                    )}
                  </div>

                  {/* Validation indicator */}
                  {validationStatus && (
                    <div className="absolute top-2 right-2">
                      {getValidationIcon(validationStatus)}
                    </div>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional test fields in a row */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        <div className="space-y-1">
          <Label className="text-xs text-white/40">Max Zs</Label>
          <div className="h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-sm text-white/70">
            {circuit.maxZs || '-'} Ω
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-white/40">L-N (MΩ)</Label>
          <button
            onClick={() => handleTileClick('insulationLiveNeutral')}
            className="w-full h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 touch-manipulation"
          >
            {circuit.insulationLiveNeutral || 'Tap'}
          </button>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-white/40">N-E (MΩ)</Label>
          <button
            onClick={() => handleTileClick('insulationNeutralEarth')}
            className="w-full h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 touch-manipulation"
          >
            {circuit.insulationNeutralEarth || 'Tap'}
          </button>
        </div>
      </div>

      {/* Quick value input modal for other fields */}
      {editingField && !tilesToShow.find(t => t.field === editingField) && (
        <QuickValueInput
          value={circuit[editingField] as string || ''}
          onChange={(v) => handleValueChange(editingField, v)}
          onClose={handleInputClose}
          label={editingField}
          unit="MΩ"
          placeholder=">200"
          validationStatus={null}
          fullScreen
        />
      )}
    </div>
  );
};

export default TestValueGrid;
