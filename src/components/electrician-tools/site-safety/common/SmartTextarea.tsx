import React, { useRef, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useSmartAutotype } from '@/hooks/useSmartAutotype';
import { X } from 'lucide-react';

interface SmartTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

/**
 * SmartTextarea wraps the standard Textarea with:
 * - Auto-correction of US → UK English on word completion
 * - Auto-capitalisation of electrical abbreviations (MCB, RCD, etc.)
 * - Floating suggestion chips for remaining corrections
 */
export function SmartTextarea({ value, onChange, className, ...props }: SmartTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { processText, checkForSuggestions, suggestions, applySuggestion, dismissSuggestion } =
    useSmartAutotype();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      const cursorPos = e.target.selectionStart ?? newValue.length;

      // Check if user just typed a space or newline (word boundary)
      const lastChar = newValue[cursorPos - 1];
      if (lastChar === ' ' || lastChar === '\n') {
        const { correctedText, appliedCount } = processText(newValue, cursorPos);
        if (appliedCount > 0) {
          onChange(correctedText);
          // Restore cursor position
          requestAnimationFrame(() => {
            if (textareaRef.current) {
              const offset = correctedText.length - newValue.length;
              textareaRef.current.selectionStart = cursorPos + offset;
              textareaRef.current.selectionEnd = cursorPos + offset;
            }
          });
          checkForSuggestions(correctedText);
          return;
        }
      }

      onChange(newValue);
      checkForSuggestions(newValue);
    },
    [onChange, processText, checkForSuggestions]
  );

  const handleApplySuggestion = useCallback(
    (suggestion: (typeof suggestions)[0]) => {
      const result = applySuggestion(value, suggestion);
      onChange(result);
      checkForSuggestions(result);
      textareaRef.current?.focus();
    },
    [value, onChange, applySuggestion, checkForSuggestions]
  );

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className={className}
        {...props}
      />
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {suggestions.slice(0, 3).map((s, i) => (
            <button
              key={`${s.start}-${i}`}
              type="button"
              onClick={() => handleApplySuggestion(s)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 text-[11px] text-elec-yellow font-medium touch-manipulation active:scale-[0.97] transition-all"
            >
              <span className="line-through text-white opacity-60">{s.original}</span>
              <span>&rarr;</span>
              <span>{s.replacement}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  dismissSuggestion(s);
                }}
                className="ml-0.5 p-0.5 rounded-full hover:bg-white/10 touch-manipulation"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
