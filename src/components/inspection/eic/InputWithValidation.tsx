import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputWithValidationProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  step?: string;
  helpText?: string;
  validationRules?: {
    pattern?: RegExp;
    message?: string;
    minLength?: number;
    maxLength?: number;
  };
  className?: string;
}

const InputWithValidation: React.FC<InputWithValidationProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  step,
  helpText,
  validationRules,
  className,
}) => {
  const [touched, setTouched] = React.useState(false);

  const isComplete = value && value.trim() !== '';
  const isValid =
    !validationRules ||
    ((validationRules.pattern ? validationRules.pattern.test(value) : true) &&
      (validationRules.minLength ? value.length >= validationRules.minLength : true) &&
      (validationRules.maxLength ? value.length <= validationRules.maxLength : true));

  const showError = touched && value && !isValid;
  const showSuccess = touched && isComplete && isValid;

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-center gap-1.5">
        <Label htmlFor={id} className="text-white text-xs">
          {label}
          {required && ' *'}
        </Label>
        {showSuccess && <CheckCircle className="h-3 w-3 text-green-400" />}
        {showError && <AlertCircle className="h-3 w-3 text-red-400" />}
      </div>

      <Input
        id={id}
        type={type}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        className={cn(
          'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]',
          showError && 'border-red-500/50 focus:border-red-500',
          showSuccess && 'border-green-500/50 focus:border-green-500'
        )}
      />

      {helpText && (
        <span className="text-[10px] text-white block">{helpText}</span>
      )}

      {showError && validationRules?.message && (
        <p className="text-[10px] text-red-400 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {validationRules.message}
        </p>
      )}
    </div>
  );
};

export default InputWithValidation;
