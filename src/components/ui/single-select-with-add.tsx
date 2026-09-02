import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SelectField } from '@/components/forms/SelectField';
import { buttonPrimaryCn, chipBase, chipOn, labelCn } from '@/components/forms/fieldStyles';

interface SelectOption {
  value: string;
  label: string;
}

interface SingleSelectWithAddProps {
  label?: string;
  placeholder?: string;
  value: string[];
  onValueChange: (value: string[]) => void;
  options: SelectOption[];
  error?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
}

export const SingleSelectWithAdd: React.FC<SingleSelectWithAddProps> = ({
  label,
  placeholder = 'Select an option...',
  value,
  onValueChange,
  options,
  error,
  hint,
  disabled = false,
  className,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleAdd = () => {
    if (selectedOption && !value.includes(selectedOption)) {
      onValueChange([...value, selectedOption]);
      setSelectedOption('');
    }
  };

  const handleRemove = (itemValue: string) => {
    onValueChange(value.filter((v) => v !== itemValue));
  };

  const availableOptions = options.filter((option) => !value.includes(option.value));

  const getSelectedLabels = () => {
    return value.map((val) => options.find((opt) => opt.value === val)?.label).filter(Boolean);
  };

  return (
    <div className={cn(className)}>
      {label && <label className={labelCn}>{label}</label>}

      {/* Selected items — solid chips, tap the cross to remove */}
      {value.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {getSelectedLabels().map((itemLabel, index) => (
            <button
              key={`${value[index]}-${index}`}
              type="button"
              onClick={() => handleRemove(value[index])}
              aria-label={`Remove ${itemLabel}`}
              className={cn(chipBase, chipOn, 'inline-flex items-center gap-1.5 px-3.5')}
            >
              {itemLabel}
              <X className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      )}

      {/* Add another */}
      <div className="flex items-end gap-2">
        <div className="min-w-0 flex-1">
          <SelectField
            value={selectedOption}
            onValueChange={setSelectedOption}
            placeholder={availableOptions.length === 0 ? 'All options selected' : placeholder}
            title={label}
            options={availableOptions}
            disabled={disabled || availableOptions.length === 0}
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!selectedOption || disabled}
          aria-label="Add"
          className={cn(buttonPrimaryCn, 'h-11 w-11 shrink-0 p-0')}
        >
          <Plus className="mx-auto h-4 w-4" />
        </button>
      </div>

      {hint && !error && <p className="mt-1.5 text-[11.5px] leading-snug text-white">{hint}</p>}
      {error && <p className="mt-1.5 text-[11.5px] leading-snug text-red-300">{error}</p>}
    </div>
  );
};
