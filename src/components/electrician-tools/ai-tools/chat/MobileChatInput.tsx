import React, { memo, useRef, useEffect, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { VoiceInputButton } from './VoiceInputButton';

interface MobileChatInputProps {
  /** Current input value */
  value: string;
  /** Called when input changes */
  onChange: (value: string) => void;
  /** Called when message is submitted */
  onSubmit: () => void;
  /** Called when conversation is cleared */
  onClear?: () => void;
  /** Optional camera affordance — rendered as a text "Camera" pill inline */
  onCameraPress?: () => void;
  /** Whether camera action is disabled */
  cameraDisabled?: boolean;
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
  /**
   * Whether to render the Web Speech API voice pill alongside attachments.
   * Defaults to true. The button auto-disables on unsupported browsers.
   */
  voiceEnabled?: boolean;
  /**
   * Optional transcript handler — when voice input finishes the recognised
   * text is passed here. If omitted the input value is appended directly.
   */
  onTranscript?: (text: string) => void;
  /**
   * When true, Send is enabled even with empty text. Used by photo
   * diagnostic — a photo with no caption is a valid request.
   */
  canSubmitWithoutText?: boolean;
}

/**
 * MobileChatInput — Editorial, text-led chat input.
 *
 * Auto-expanding textarea plus a single yellow `Send` pill button.
 * No paper-plane icon, no camera icon — attachment buttons live outside
 * this component (rendered as text pills by the parent).
 */
export const MobileChatInput = memo(function MobileChatInput({
  value,
  onChange,
  onSubmit,
  onClear,
  onCameraPress,
  cameraDisabled = false,
  isStreaming = false,
  placeholder = 'Ask Elec-AI…',
  maxLength = 2000,
  showClearButton = true,
  messageCount = 0,
  className,
  voiceEnabled = true,
  onTranscript,
  canSubmitWithoutText = false,
}: MobileChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const haptic = useHaptic();

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

  const handleSubmit = useCallback(() => {
    const hasText = value.trim().length > 0;
    if ((!hasText && !canSubmitWithoutText) || isStreaming) return;
    haptic.medium();
    onSubmit();
  }, [value, isStreaming, haptic, onSubmit, canSubmitWithoutText]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Cmd/Ctrl + Enter → always send.
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (value.trim() && !isStreaming) {
          handleSubmit();
        }
        return;
      }
      // Shift + Enter → insert newline (native default).
      if (e.key === 'Enter' && e.shiftKey) {
        return;
      }
      // Bare Enter → send (mobile-friendly; keeps prior behaviour).
      if (e.key === 'Enter') {
        e.preventDefault();
        if (value.trim() && !isStreaming) {
          handleSubmit();
        }
      }
    },
    [value, isStreaming, handleSubmit]
  );

  const handleTranscript = useCallback(
    (transcript: string) => {
      if (!transcript.trim()) return;
      if (onTranscript) {
        onTranscript(transcript);
        return;
      }
      const merged = value.trim() ? `${value.trim()} ${transcript.trim()}` : transcript.trim();
      onChange(merged);
    },
    [onChange, onTranscript, value]
  );

  const handleClear = useCallback(() => {
    if (messageCount === 0) return;
    haptic.warning();
    onClear?.();
  }, [messageCount, haptic, onClear]);

  const canSend = (value.trim().length > 0 || canSubmitWithoutText) && !isStreaming;

  return (
    <div className={cn('', className)}>
      {/* Inline conversation meta — hidden on mobile (wasted vertical space);
          Clear lives as a trailing action on the input row instead. */}
      {messageCount > 0 && (
        <div className="hidden sm:flex mb-2 items-center justify-between px-1 text-[11px]">
          <span className="uppercase tracking-[0.18em] text-white">Continuing conversation</span>
          {showClearButton && onClear && (
            <button
              onClick={handleClear}
              className="font-medium text-white hover:text-white transition-colors touch-manipulation"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Input row — textarea + Send pill */}
      <div
        className={cn(
          'flex items-end gap-2 rounded-2xl bg-[hsl(0_0%_12%)] border transition-colors',
          isFocused ? 'border-elec-yellow/50' : 'border-white/[0.08]',
          'p-1.5'
        )}
      >
        {onCameraPress && (
          <button
            onClick={onCameraPress}
            disabled={isStreaming || cameraDisabled}
            className={cn(
              'shrink-0 h-11 px-3 rounded-full text-[12px] font-medium',
              'bg-white/[0.04] border border-white/[0.08] text-white',
              'hover:bg-white/[0.08] transition-colors touch-manipulation',
              'disabled:opacity-40 disabled:cursor-not-allowed'
            )}
            aria-label="Take or attach photo"
          >
            Camera
          </button>
        )}

        {voiceEnabled && onTranscript && (
          <div className="shrink-0 self-center pl-1">
            <VoiceInputButton
              onTranscript={handleTranscript}
              disabled={isStreaming}
            />
          </div>
        )}

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
            'text-white placeholder:text-white',
            'min-h-[40px] max-h-[120px]',
            'leading-relaxed py-2 px-2.5',
            'disabled:opacity-60'
          )}
          style={{ fontSize: '16px' }}
          aria-label="Message input"
        />

        <button
          onClick={handleSubmit}
          disabled={!canSend}
          className={cn(
            'shrink-0 h-11 px-5 rounded-full text-[13px] font-semibold',
            'bg-elec-yellow text-black hover:bg-elec-yellow/90',
            'active:scale-[0.98] transition-all touch-manipulation',
            'disabled:opacity-40 disabled:active:scale-100 disabled:cursor-not-allowed'
          )}
          aria-label={isStreaming ? 'Sending' : 'Send message'}
        >
          {isStreaming ? 'Sending' : 'Send'}
        </button>
      </div>
    </div>
  );
});

export default MobileChatInput;
