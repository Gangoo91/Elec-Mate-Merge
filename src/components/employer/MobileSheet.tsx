import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PrimaryButton, SecondaryButton, fieldLabelClass } from './editorial';

interface MobileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  className?: string;
  contentClassName?: string;
  /** Height of the sheet: 'full' (95vh), 'large' (85vh), 'medium' (70vh), 'auto' (fit content) */
  size?: 'full' | 'large' | 'medium' | 'auto';
}

const sizeMap = {
  full: 'h-[95vh]',
  large: 'h-[85vh]',
  medium: 'h-[70vh]',
  auto: 'max-h-[90vh]',
};

/**
 * Mobile-optimized Sheet component for forms and dialogs.
 * Uses bottom slide-up pattern which is more natural on mobile.
 */
export function MobileSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  showBack,
  onBack,
  className,
  contentClassName,
  size = 'full',
}: MobileSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className={cn(
          'p-0 rounded-t-2xl bg-[hsl(0_0%_8%)] border-t border-white/[0.06]',
          sizeMap[size],
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with drag indicator */}
          <div className="flex flex-col">
            {/* Drag indicator */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Title bar */}
            <SheetHeader className="px-4 py-2 border-b border-white/[0.06]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {showBack && (
                    <button
                      type="button"
                      className="h-8 w-8 -ml-1 flex items-center justify-center rounded-full hover:bg-white/[0.06] text-white touch-manipulation"
                      onClick={onBack}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                  )}
                  <div>
                    <SheetTitle className="text-base sm:text-lg text-left text-white">
                      {title}
                    </SheetTitle>
                    {description && (
                      <SheetDescription className="text-xs text-left text-white">
                        {description}
                      </SheetDescription>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/[0.06] text-white touch-manipulation"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </SheetHeader>
          </div>

          {/* Content */}
          <ScrollArea className={cn('flex-1', contentClassName)}>
            <div className="px-4 py-4 pb-safe">{children}</div>
          </ScrollArea>

          {/* Footer */}
          {footer && (
            <div className="px-4 py-3 border-t border-white/[0.06] bg-[hsl(0_0%_8%)] pb-safe">
              {footer}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/**
 * Pre-built footer with common button patterns
 */
interface MobileSheetFooterProps {
  onCancel?: () => void;
  onSubmit?: () => void;
  cancelLabel?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
  variant?: 'single' | 'double' | 'stacked';
}

export function MobileSheetFooter({
  onCancel,
  onSubmit,
  cancelLabel = 'Cancel',
  submitLabel = 'Save',
  isSubmitting = false,
  submitDisabled = false,
  variant = 'double',
}: MobileSheetFooterProps) {
  if (variant === 'single') {
    return (
      <PrimaryButton
        onClick={onSubmit}
        disabled={isSubmitting || submitDisabled}
        size="lg"
        fullWidth
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </PrimaryButton>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className="flex flex-col gap-2">
        <PrimaryButton
          onClick={onSubmit}
          disabled={isSubmitting || submitDisabled}
          size="lg"
          fullWidth
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </PrimaryButton>
        <SecondaryButton onClick={onCancel} fullWidth>
          {cancelLabel}
        </SecondaryButton>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <SecondaryButton onClick={onCancel} size="lg" className="flex-1">
        {cancelLabel}
      </SecondaryButton>
      <PrimaryButton
        onClick={onSubmit}
        disabled={isSubmitting || submitDisabled}
        size="lg"
        className="flex-1"
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </PrimaryButton>
    </div>
  );
}

/**
 * Mobile-optimized form input wrapper with proper spacing
 */
interface MobileFormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function MobileFormField({
  label,
  required,
  error,
  hint,
  children,
  className,
}: MobileFormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className={cn(fieldLabelClass, 'flex items-center gap-1 mb-0')}>
        {label}
        {required && <span className="text-elec-yellow">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[11px] text-white">{hint}</p>}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}
