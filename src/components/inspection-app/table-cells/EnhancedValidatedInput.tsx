import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { CircleCheck, CircleX, AlertTriangle } from 'lucide-react';
import { TestValidationResults } from '@/utils/testValidation';

interface EnhancedValidatedInputProps {
  value: string;
  onChange: (value: string) => void;
  validation?: TestValidationResults[keyof TestValidationResults];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onNavigate?: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onFillDown?: () => void;
}

export const EnhancedValidatedInput: React.FC<EnhancedValidatedInputProps> = ({
  value,
  onChange,
  validation,
  placeholder,
  className = '',
  disabled = false,
  onNavigate,
  onFillDown,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const previousValueRef = useRef<string>(value);
  const [showValidation, setShowValidation] = useState(true);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Update the ref when value prop changes
  React.useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Only call onChange if value actually changed to prevent redundant parent updates
    if (newValue !== previousValueRef.current) {
      previousValueRef.current = newValue;
      onChange(newValue);
      
      // Hide validation while typing, show after 250ms pause
      setShowValidation(false);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setShowValidation(true), 250);
    }
  };

  const handleBlur = () => {
    // Show validation immediately on blur
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    setShowValidation(true);
  };

  const getValidationIcon = () => {
    if (!showValidation || !validation) return null;
    if (!('type' in validation)) return null;
    
    const validationType = validation.type;
    switch (validationType) {
      case 'success':
        return <CircleCheck className="h-3.5 w-3.5 text-success absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />;
      case 'warning':
        return <AlertTriangle className="h-3.5 w-3.5 text-warning absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />;
      case 'error':
        return <CircleX className="h-3.5 w-3.5 text-destructive absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />;
      default:
        return null;
    }
  };

  const getValidationBorder = () => {
    if (!showValidation || !validation) return '';
    if (!('type' in validation)) return '';
    
    const validationType = validation.type;
    switch (validationType) {
      case 'success':
        return 'border-success focus-visible:ring-success';
      case 'warning':
        return 'border-warning focus-visible:ring-warning';
      case 'error':
        return 'border-destructive focus-visible:ring-destructive';
      default:
        return '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter: Move to same column, next row
    if (e.key === 'Enter') {
      e.preventDefault();
      onNavigate?.('down');
      return;
    }

    // Arrow keys: Navigate between cells
    if (e.key === 'ArrowUp' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      onNavigate?.('up');
      return;
    }

    if (e.key === 'ArrowDown' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      onNavigate?.('down');
      return;
    }

    // Ctrl/Cmd + Arrow: Navigate horizontally
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
      e.preventDefault();
      onNavigate?.('right');
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft') {
      e.preventDefault();
      onNavigate?.('left');
      return;
    }

    // Escape: Blur
    if (e.key === 'Escape') {
      inputRef.current?.blur();
      return;
    }
  };


  return (
    <div className="relative group z-0">
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`pr-8 overflow-hidden text-ellipsis bg-black !text-secondary-foreground hover:bg-black focus:bg-black placeholder:!text-secondary-foreground/70 border-elec-yellow/30 disabled:bg-black/50 disabled:!text-secondary-foreground/50 ${getValidationBorder()} ${className} focus:ring-2 focus:ring-offset-0`}
      />
      {getValidationIcon()}
    </div>
  );
};
