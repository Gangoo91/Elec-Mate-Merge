import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useHaptics } from '@/hooks/useHaptics';
import { Check, X, ChevronUp, ChevronDown } from 'lucide-react';

interface QuickValueInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  label: string;
  unit?: string;
  placeholder?: string;
  validationStatus?: 'pass' | 'fail' | 'warning' | null;
  fullScreen?: boolean;
  /** Preset quick values */
  presets?: string[];
  /** Allow increment/decrement */
  allowStepper?: boolean;
  step?: number;
}

/**
 * QuickValueInput - Optimized input for quick test value entry
 * Features large touch targets, auto-focus, and quick action buttons
 */
const QuickValueInput: React.FC<QuickValueInputProps> = ({
  value,
  onChange,
  onClose,
  label,
  unit = '',
  placeholder = '',
  validationStatus,
  fullScreen = false,
  presets = [],
  allowStepper = true,
  step = 0.01
}) => {
  const haptics = useHaptics();
  const inputRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState(value);

  // Auto-focus input when mounted
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleConfirm = () => {
    haptics.success();
    onChange(localValue);
    onClose();
  };

  const handleCancel = () => {
    haptics.tap();
    onClose();
  };

  const handleIncrement = () => {
    haptics.tap();
    const num = parseFloat(localValue) || 0;
    setLocalValue((num + step).toFixed(2));
  };

  const handleDecrement = () => {
    haptics.tap();
    const num = parseFloat(localValue) || 0;
    const newVal = Math.max(0, num - step);
    setLocalValue(newVal.toFixed(2));
  };

  const handlePresetClick = (preset: string) => {
    haptics.tap();
    setLocalValue(preset);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Default presets for common test values
  const defaultPresets = presets.length > 0 ? presets : [
    '>200', '1.00', '0.50', '0.25'
  ];

  const getValidationBorder = () => {
    switch (validationStatus) {
      case 'pass': return 'border-green-500 ring-green-500/20';
      case 'warning': return 'border-amber-500 ring-amber-500/20';
      case 'fail': return 'border-red-500 ring-red-500/20';
      default: return 'border-elec-yellow ring-elec-yellow/20';
    }
  };

  const content = (
    <div className={cn(
      "p-4 rounded-xl border-2 bg-card/95 backdrop-blur-md",
      getValidationBorder(),
      "ring-4"
    )}>
      {/* Label */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white/80">{label}</span>
        {unit && <span className="text-xs text-white/50">{unit}</span>}
      </div>

      {/* Input with stepper */}
      <div className="flex items-center gap-2 mb-3">
        {allowStepper && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleDecrement}
            className="h-14 w-14 shrink-0 border-white/20 touch-manipulation active:scale-95"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        )}

        <Input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "h-14 text-center text-2xl font-bold bg-transparent border-white/20",
            "focus:ring-0 focus:border-white/40",
            "touch-manipulation"
          )}
        />

        {allowStepper && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleIncrement}
            className="h-14 w-14 shrink-0 border-white/20 touch-manipulation active:scale-95"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Quick presets */}
      <div className="flex flex-wrap gap-2 mb-4">
        {defaultPresets.map((preset) => (
          <button
            key={preset}
            onClick={() => handlePresetClick(preset)}
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-all",
              "touch-manipulation active:scale-95",
              localValue === preset
                ? "bg-elec-yellow text-black"
                : "bg-white/10 text-white/80 hover:bg-white/20"
            )}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          className="flex-1 h-12 border-white/20 text-white hover:bg-white/10 touch-manipulation active:scale-95"
        >
          <X className="h-5 w-5 mr-2" />
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleConfirm}
          className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-95"
        >
          <Check className="h-5 w-5 mr-2" />
          Done
        </Button>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="w-full max-w-sm">{content}</div>
      </div>
    );
  }

  return content;
};

export default QuickValueInput;
