
import React from 'react';
import { Input } from '@/components/ui/input';
import { ValidationResult } from '@/utils/testValidation';
import { CircleCheck, AlertTriangle, CircleX, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidatedInputProps {
  value: string;
  onChange: (value: string) => void;
  validation?: ValidationResult;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const ValidatedInput = ({ 
  value, 
  onChange, 
  validation, 
  placeholder, 
  className,
  disabled = false
}: ValidatedInputProps) => {
  const getValidationIcon = () => {
    if (!validation) return null;

    switch (validation.level) {
      case 'pass':
        return <CircleCheck className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'fail':
        return <CircleX className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getValidationBorder = () => {
    if (!validation) return '';

    switch (validation.level) {
      case 'pass':
        return 'border-green-300 focus-visible:ring-green-500';
      case 'warning':
        return 'border-amber-300 focus-visible:ring-amber-500';
      case 'fail':
        return 'border-red-300 focus-visible:ring-red-500';
      default:
        return '';
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'bg-transparent',
            className,
            getValidationBorder(),
            validation && 'pr-8'
          )}
        />
        {validation && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {getValidationIcon()}
          </div>
        )}
      </div>

      {/* Validation message - only show in desktop table tooltips */}
      {validation && validation.message && (
        <div className={cn(
          "absolute z-50 hidden group-hover:block mt-1 text-xs px-2 py-1 rounded bg-white border shadow-lg max-w-xs",
          validation.level === 'pass' && "text-green-600 border-green-200",
          validation.level === 'warning' && "text-amber-600 border-amber-200",
          validation.level === 'fail' && "text-red-600 border-red-200"
        )}>
          <div className="flex items-start gap-1">
            <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span>{validation.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidatedInput;
