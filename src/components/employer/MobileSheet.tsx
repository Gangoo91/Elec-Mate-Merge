import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

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
  size?: "full" | "large" | "medium" | "auto";
}

const sizeMap = {
  full: "h-[95vh]",
  large: "h-[85vh]",
  medium: "h-[70vh]",
  auto: "max-h-[90vh]",
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
  size = "full",
}: MobileSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className={cn(
          "p-0 rounded-t-2xl",
          sizeMap[size],
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with drag indicator */}
          <div className="flex flex-col">
            {/* Drag indicator */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Title bar */}
            <SheetHeader className="px-4 py-2 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {showBack && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 -ml-1"
                      onClick={onBack}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  )}
                  <div>
                    <SheetTitle className="text-base sm:text-lg text-left">{title}</SheetTitle>
                    {description && (
                      <SheetDescription className="text-xs text-left">{description}</SheetDescription>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </SheetHeader>
          </div>

          {/* Content */}
          <ScrollArea className={cn("flex-1", contentClassName)}>
            <div className="px-4 py-4 pb-safe">
              {children}
            </div>
          </ScrollArea>

          {/* Footer */}
          {footer && (
            <div className="px-4 py-3 border-t border-border bg-background pb-safe">
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
  variant?: "single" | "double" | "stacked";
}

export function MobileSheetFooter({
  onCancel,
  onSubmit,
  cancelLabel = "Cancel",
  submitLabel = "Save",
  isSubmitting = false,
  submitDisabled = false,
  variant = "double",
}: MobileSheetFooterProps) {
  if (variant === "single") {
    return (
      <Button
        onClick={onSubmit}
        disabled={isSubmitting || submitDisabled}
        className="w-full h-12 text-base"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    );
  }

  if (variant === "stacked") {
    return (
      <div className="flex flex-col gap-2">
        <Button
          onClick={onSubmit}
          disabled={isSubmitting || submitDisabled}
          className="w-full h-12 text-base"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
        <Button
          variant="ghost"
          onClick={onCancel}
          className="w-full h-10 text-base"
        >
          {cancelLabel}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        onClick={onCancel}
        className="flex-1 h-12 text-base"
      >
        {cancelLabel}
      </Button>
      <Button
        onClick={onSubmit}
        disabled={isSubmitting || submitDisabled}
        className="flex-1 h-12 text-base"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
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
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-foreground flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
