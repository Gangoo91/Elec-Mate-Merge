import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { isFieldMarker } from './FieldLimitationBadge';

interface FieldNotesInputProps {
  /** The marker value of the parent field. Notes only render when this is LIM/N/V/N/A. */
  parentValue: string;
  /** Current note text. */
  value: string;
  /** Called with the new note text. */
  onChange: (value: string) => void;
  /** Placeholder text (reason-style). Defaults to a sensible default. */
  placeholder?: string;
  className?: string;
  /** Max length — kept short so it fits a PDF cell. */
  maxLength?: number;
}

/**
 * FieldNotesInput — small inline textarea that appears only when a parent
 * field is marked LIM/N/V/N/A. Used to capture the *reason* (e.g. "meter
 * room locked") so it can be rendered on the PDF alongside the marker badge.
 *
 * Stored as a sibling `*Notes` field on the form state.
 */
export const FieldNotesInput: React.FC<FieldNotesInputProps> = ({
  parentValue,
  value,
  onChange,
  placeholder = 'Reason (e.g. meter room locked)',
  className,
  maxLength = 200,
}) => {
  if (!isFieldMarker(parentValue)) return null;

  return (
    <Input
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className={cn(
        'h-9 text-[12px] touch-manipulation bg-orange-500/[0.06] border-orange-500/20 text-white placeholder:text-white/40',
        'mt-1.5',
        className
      )}
      aria-label="Limitation reason"
    />
  );
};
