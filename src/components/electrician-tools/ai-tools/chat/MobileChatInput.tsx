import React, { memo, useRef, useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Trash2, Camera } from 'lucide-react';
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
  /** Called when camera button is tapped */
  onCameraPress?: () => void;
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
  /** Whether camera button is disabled */
  cameraDisabled?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * MobileChatInput - Native-feeling chat input (iMessage-style)
 *
 * Features:
 * - Camera button integrated inside the input container
 * - Auto-expanding textarea (max 4 lines)
 * - Large tap targets (48px minimum)
 * - 16px font to prevent iOS zoom
 * - Haptic feedback on send
 * - Minimal chrome — no wasted vertical space
 */
export const MobileChatInput = memo(function MobileChatInput({
  value,
  onChange,
  onSubmit,
  onClear,
  onCameraPress,
  isStreaming = false,
  placeholder = 'Ask about BS 7671...',
  maxLength = 2000,
  showClearButton = true,
  messageCount = 0,
  cameraDisabled = false,
  className,
}: MobileChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const haptic = useHaptic();

  // Auto-resize textarea
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const maxHeight = 120;
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (newValue.length <= maxLength) {
        onChange(newValue);
      }
    },
    [onChange, maxLength]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (value.trim() && !isStreaming) {
          handleSubmit();
        }
      }
    },
    [value, isStreaming]
  );

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

  return (
    <div className={cn('', className)}>
      {/* Conversation indicator with inline clear */}
      {messageCount > 0 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5 px-1">
          <span className="text-[11px]">Continuing conversation</span>
          {showClearButton && onClear && (
            <button
              onClick={handleClear}
              className="text-muted-foreground/60 hover:text-destructive transition-colors p-1 -mr-1 touch-manipulation"
              aria-label="Clear conversation"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Input container — single rounded pill with everything inside */}
      <div
        className={cn(
          'relative flex items-end gap-1.5 rounded-2xl',
          'bg-card/80 backdrop-blur-sm',
          'border-2 transition-all duration-200',
          isFocused
            ? 'border-elec-yellow/50 shadow-lg shadow-elec-yellow/10'
            : 'border-border/50',
          'p-1.5 sm:p-2'
        )}
      >
        {/* Camera button — inside the input pill */}
        {onCameraPress && (
          <button
            onClick={onCameraPress}
            disabled={isStreaming || cameraDisabled}
            className={cn(
              'shrink-0 h-10 w-10 rounded-xl',
              'flex items-center justify-center',
              'bg-white/5 hover:bg-elec-yellow/20',
              'transition-colors touch-manipulation',
              'disabled:opacity-40'
            )}
            aria-label="Attach photo"
          >
            <Camera className="h-5 w-5 text-elec-yellow" />
          </button>
        )}

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
            'flex-1 bg-transparent border-none outline-none resize-none',
            'text-foreground placeholder:text-muted-foreground/50',
            'min-h-[40px] max-h-[120px]',
            'text-base leading-relaxed',
            'disabled:opacity-50',
            'py-2 px-1.5'
          )}
          style={{ fontSize: '16px' }}
          aria-label="Message input"
        />

        {/* Send button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSubmit}
          disabled={!value.trim() || isStreaming}
          className={cn(
            'shrink-0 h-10 w-10 rounded-xl',
            'bg-gradient-to-br from-elec-yellow to-elec-yellow/90',
            'hover:from-elec-yellow/90 hover:to-elec-yellow',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            'flex items-center justify-center',
            'shadow-md shadow-elec-yellow/20 transition-all',
            'disabled:shadow-none touch-manipulation'
          )}
          aria-label={isStreaming ? 'Sending...' : 'Send message'}
        >
          {isStreaming ? (
            <Loader2 className="w-4.5 h-4.5 animate-spin text-elec-dark" />
          ) : (
            <Send className="w-4.5 h-4.5 text-elec-dark" />
          )}
        </motion.button>
      </div>
    </div>
  );
});

export default MobileChatInput;
