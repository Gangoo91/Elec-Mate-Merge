import React, { memo, useRef, useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface MobileChatInputProps {
  /** Current input value */
  value: string;
  /** Called when input changes */
  onChange: (value: string) => void;
  /** Called when message is submitted */
  onSubmit: () => void;
  /** Called when conversation is cleared */
  onClear?: () => void;
  /** Whether currently streaming a response */
  isStreaming?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Maximum characters allowed */
  maxLength?: number;
  /** Whether to show clear button */
  showClearButton?: boolean;
  /** Number of messages in conversation */
  messageCount?: number;
  /** Custom className */
  className?: string;
}

/**
 * MobileChatInput - Optimized input for mobile chat
 *
 * Features:
 * - Fixed bottom with safe area insets
 * - Auto-expanding textarea (max 4 lines)
 * - Large tap targets (48px minimum)
 * - 16px font to prevent iOS zoom
 * - Haptic feedback on send
 * - Keyboard-aware positioning
 */
export const MobileChatInput = memo(function MobileChatInput({
  value,
  onChange,
  onSubmit,
  onClear,
  isStreaming = false,
  placeholder = 'Ask about BS 7671...',
  maxLength = 2000,
  showClearButton = true,
  messageCount = 0,
  className,
}: MobileChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const haptic = useHaptic();

  // Auto-resize textarea
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to calculate scroll height
    textarea.style.height = 'auto';

    // Calculate new height (max 4 lines ~120px)
    const maxHeight = 120;
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  }, [onChange, maxLength]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isStreaming) {
        handleSubmit();
      }
    }
  }, [value, isStreaming]);

  const handleSubmit = useCallback(() => {
    if (!value.trim() || isStreaming) return;
    haptic.medium();
    onSubmit();
  }, [value, isStreaming, haptic, onSubmit]);

  const handleClear = useCallback(() => {
    if (messageCount === 0) return;
    haptic.warning();
    onClear?.();
  }, [messageCount, haptic, onClear]);

  const charCount = value.length;
  const isNearLimit = charCount > maxLength * 0.9;

  return (
    <div className={cn('pb-4', className)}>
      {/* Conversation indicator with inline clear */}
      {messageCount > 0 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 px-1">
          <span>💬 Continuing conversation • Ask follow-up questions</span>
          {showClearButton && onClear && (
            <button
              onClick={handleClear}
              className="text-muted-foreground/60 hover:text-destructive transition-colors p-1 -mr-1"
              aria-label="Clear conversation"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Input container */}
      <div
        className={cn(
          "relative rounded-2xl",
          "bg-card/80 backdrop-blur-sm",
          "border-2 transition-all duration-200",
          isFocused
            ? "border-elec-yellow/50 shadow-lg shadow-elec-yellow/10"
            : "border-border/50",
          "p-3 sm:p-4"
        )}
      >
        {/* Glow effect when focused */}
        {isFocused && (
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-elec-yellow/10 via-elec-blue/10 to-elec-yellow/10 rounded-2xl blur-xl opacity-50" />
        )}

        <div className="flex items-end gap-3">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isStreaming}
            rows={1}
            className={cn(
              "flex-1 bg-transparent border-none outline-none resize-none",
              "text-foreground placeholder:text-muted-foreground/50",
              "min-h-[48px] max-h-[120px]",
              // 16px minimum to prevent iOS zoom
              "text-base leading-relaxed",
              "disabled:opacity-50"
            )}
            style={{ fontSize: '16px' }}
            aria-label="Message input"
          />

          {/* Send button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!value.trim() || isStreaming}
            className={cn(
              "shrink-0 h-12 w-12 rounded-xl",
              "bg-gradient-to-br from-elec-yellow to-elec-yellow/90",
              "hover:from-elec-yellow/90 hover:to-elec-yellow",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center justify-center",
              "shadow-lg shadow-elec-yellow/30 transition-all",
              "disabled:shadow-none"
            )}
            aria-label={isStreaming ? "Sending..." : "Send message"}
          >
            {isStreaming ? (
              <Loader2 className="w-5 h-5 animate-spin text-elec-dark" />
            ) : (
              <Send className="w-5 h-5 text-elec-dark" />
            )}
          </motion.button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground/70">
          <span className="hidden sm:inline">
            Press Enter to send, Shift+Enter for new line
          </span>
          <span className="sm:hidden">Enter to send</span>

          {charCount > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                isNearLimit && "text-orange-500 font-medium"
              )}
            >
              {charCount}/{maxLength}
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
});

export default MobileChatInput;
