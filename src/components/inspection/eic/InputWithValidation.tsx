
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
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
  className
}) => {
  const [touched, setTouched] = React.useState(false);
  
  const isComplete = value && value.trim() !== '';
  const isValid = !validationRules || 
    (validationRules.pattern ? validationRules.pattern.test(value) : true) &&
    (validationRules.minLength ? value.length >= validationRules.minLength : true) &&
    (validationRules.maxLength ? value.length <= validationRules.maxLength : true);
  
  const showError = touched && value && !isValid;
  const showSuccess = touched && isComplete && isValid;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        
        {showSuccess && (
          <CheckCircle className="h-4 w-4 text-green-500" />
        )}
        
        {showError && (
          <AlertCircle className="h-4 w-4 text-red-500" />
        )}
        
        {required && !touched && (
          <Badge variant="secondary" className="text-xs">Required</Badge>
        )}
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
          showError && "border-red-300 focus:border-red-500",
          showSuccess && "border-green-300 focus:border-green-500"
        )}
      />
      
      {helpText && (
        <div className="flex items-start gap-1 text-xs text-muted-foreground">
          <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <span>{helpText}</span>
        </div>
      )}
      
      {showError && validationRules?.message && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {validationRules.message}
        </p>
      )}
    </div>
  );
};

export default InputWithValidation;
