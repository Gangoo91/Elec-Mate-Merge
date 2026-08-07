import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { CircleCheck, CircleX, AlertTriangle, Minus } from 'lucide-react';
import { TestValidationResults } from '@/utils/testValidation';
import type { CellWarning } from '@/utils/cellWarnings';
import { describeCellWarning } from '@/utils/cellWarnings';

interface EnhancedValidatedInputProps {
  value: string;
  onChange: (value: string) => void;
  validation?: TestValidationResults[keyof TestValidationResults];
  /**
   * A BS 7671 finding that names this cell.
   *
   * Separate from `validation`, which is the field-level check (is this a
   * plausible number, is it in range). This is the regulation engine — "a 32 A
   * device on 2.5mm² at reference method C" — and it has only ever been visible
   * in a panel, thirty columns away from the value it is about.
   *
   * Takes precedence over the field-level icon: a cell that passes its own
   * range check but breaks a regulation must not show a tick.
   */
  regulationWarning?: CellWarning;
  /** Opens the finding. Without it the marker is shown but not interactive. */
  onOpenWarning?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onNavigate?: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onFillDown?: () => void;
  /** Fires on blur with the current committed value — used to e.g. format to 2dp. */
  onCommit?: (value: string) => void;
}

export const EnhancedValidatedInput: React.FC<EnhancedValidatedInputProps> = ({
  value,
  onChange,
  validation,
  regulationWarning,
  onOpenWarning,
  placeholder,
  className = '',
  disabled = false,
  onNavigate,
  onFillDown,
  onCommit,
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
    onCommit?.(previousValueRef.current);
  };

  const getValidationMessage = (): string | undefined => {
    if (!validation) return undefined;
    if ('message' in validation && typeof validation.message === 'string') return validation.message;
    return undefined;
  };

  const getValidationIcon = () => {
    /**
     * A regulation finding outranks the field-level check.
     *
     * Rendered as a button rather than an icon: the whole point is that the
     * electrician can act on it where they found it, instead of reading a
     * panel and then hunting for the cell. Colour alone does not carry the
     * meaning — there is a triangle and a title, so it survives both a
     * greyscale screen and a screen reader.
     */
    // No handler means no surface to open — see CellWarningMarker for why a
    // flag you cannot act on is worse than none.
    if (regulationWarning && onOpenWarning) {
      const critical = regulationWarning.severity === 'critical';
      const label = describeCellWarning(regulationWarning);
      return (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenWarning?.();
          }}
          title={label}
          aria-label={label}
          /* Focusable. Only flagged cells add a tab stop, so the cost is
             proportional to the number of problems rather than to the 34
             columns — and a finding you can only reach with a mouse is one a
             keyboard user cannot act on at all. */
          tabIndex={0}
          className={`absolute right-1 top-1/2 -translate-y-1/2 inline-flex h-5 w-5 items-center justify-center rounded transition-colors ${
            critical
              ? 'text-red-300 hover:bg-red-500/20'
              : 'text-amber-300 hover:bg-amber-400/20'
          } ${onOpenWarning ? 'cursor-pointer' : 'pointer-events-none'}`}
        >
          <AlertTriangle className="h-3.5 w-3.5" />
        </button>
      );
    }

    if (!showValidation || !validation) return null;
    if (!('level' in validation)) return null;

    const message = getValidationMessage();
    switch (validation.level) {
      case 'pass':
        return (
          <CircleCheck className="h-3.5 w-3.5 text-success absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" title={message} />
        );
      case 'warning':
        return (
          <AlertTriangle className="h-3.5 w-3.5 text-warning absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" title={message} />
        );
      case 'fail':
        return (
          <CircleX className="h-3.5 w-3.5 text-destructive absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" title={message} />
        );
      case 'na':
        return (
          <Minus className="h-3.5 w-3.5 text-muted-foreground/60 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" title={message} />
        );
      default:
        return null;
    }
  };

  const getValidationBorder = () => {
    /**
     * Colour the value, not the cell and not a border.
     *
     * A tint across a 52px cell on a dark ground reads as a muddy block — the
     * olive-brown problem. An underline was the first attempt and silently did
     * nothing: this class string is concatenated ahead of the caller's
     * `className`, and the cells pass `border-0`, which wins on stylesheet
     * order. Beating that would have meant `!important`, which is a bad reason
     * to reach for it.
     *
     * The number itself carrying the colour is a stronger signal anyway: it
     * points at the value that is wrong rather than at the box around it, and
     * nothing in the cell recipe competes for text colour.
     */
    if (regulationWarning) {
      // Colour only. `font-semibold` was here and did nothing: the
      // `.sot-table-wrapper td input` rule sets font-weight and out-specifies a
      // utility class. Left out rather than escalated to `!important` — the
      // colour and the triangle already carry the signal, and a class that
      // silently does nothing is worse than no class.
      return regulationWarning.severity === 'critical' ? '!text-red-300' : '!text-amber-300';
    }
    if (!showValidation || !validation) return '';
    if (!('level' in validation)) return '';

    switch (validation.level) {
      case 'pass':
        return 'border-success focus-visible:ring-success';
      case 'warning':
        return 'border-warning focus-visible:ring-warning';
      case 'fail':
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
        className={`overflow-hidden text-ellipsis bg-transparent !text-foreground hover:bg-white/[0.04] focus:bg-transparent placeholder:!text-muted-foreground/50 border-transparent focus:border-elec-yellow disabled:bg-transparent disabled:!text-muted-foreground/50 ${getValidationBorder()} ${className} !pr-7 focus:ring-0 focus:shadow-none focus:ring-offset-0`}
      />
      {getValidationIcon()}
    </div>
  );
};
