import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Info, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface IntelligentInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'date' | 'email';
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  regulation?: string;
  typicalExample?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => { valid: boolean; message?: string };
  };
  className?: string;
  showCheckmark?: boolean;
}

const IntelligentInput = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  helpText,
  regulation,
  typicalExample,
  validation,
  className,
  showCheckmark = true
}: IntelligentInputProps) => {
  const [touched, setTouched] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateValue = (val: string): boolean => {
    if (!validation) return true;
    
    if (validation.minLength && val.length < validation.minLength && val.length > 0) {
      setValidationError(`Minimum ${validation.minLength} characters required`);
      return false;
    }
    
    if (validation.maxLength && val.length > validation.maxLength) {
      setValidationError(`Maximum ${validation.maxLength} characters`);
      return false;
    }
    
    if (validation.pattern && val.length > 0 && !validation.pattern.test(val)) {
      setValidationError('Invalid format');
      return false;
    }
    
    if (validation.custom) {
      const result = validation.custom(val);
      if (!result.valid) {
        setValidationError(result.message || 'Invalid value');
        return false;
      }
    }
    
    setValidationError(null);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (touched) {
      validateValue(newValue);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    validateValue(value);
  };

  const isValid = required ? value.length > 0 && !validationError : !validationError;
  const showSuccess = showCheckmark && touched && value.length > 0 && isValid;
  const showError = touched && validationError;

  const hasTooltip = helpText || regulation || typicalExample;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Label htmlFor={label} className="flex items-center gap-2">
          {label}
          {required && <span className="text-red-400 text-xs">*</span>}
        </Label>
        
        {hasTooltip && (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-muted-foreground hover:text-white/80 transition-colors">
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-card border-border p-3">
                <div className="space-y-2 text-xs">
                  {helpText && <p className="text-white/80">{helpText}</p>}
                  {regulation && (
                    <p className="text-blue-400 font-medium">{regulation}</p>
                  )}
                  {typicalExample && (
                    <p className="text-white/70">
                      <span className="text-white/60">Example:</span> {typicalExample}
                    </p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="relative">
      <Input
        id={label}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={cn(
          "transition-all duration-200 text-base",
            showSuccess && "border-green-500/50 focus:border-green-500 pr-10",
            showError && "border-red-500/50 focus:border-red-500",
            !touched && value.length === 0 && "border-border"
          )}
        />
        
        {showSuccess && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 success-icon">
            <CheckCircle className="h-4 w-4" />
          </div>
        )}
        
        {showError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <AlertTriangle className="h-4 w-4" />
          </div>
        )}
      </div>

      {showError && validationError && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          {validationError}
        </p>
      )}

      {!showError && helpText && !hasTooltip && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="h-3 w-3" />
          {helpText}
        </p>
      )}
    </div>
  );
};

export default IntelligentInput;
