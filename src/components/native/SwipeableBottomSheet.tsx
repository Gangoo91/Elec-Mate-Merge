import React, { ReactNode, useCallback } from 'react';
import { Drawer } from 'vaul';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SwipeableBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  snapPoints?: number[];
  defaultSnapPoint?: number;
  dismissible?: boolean;
  closeThreshold?: number;
  handleVisible?: boolean;
  title?: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  modal?: boolean;
}

export const SwipeableBottomSheet: React.FC<SwipeableBottomSheetProps> = ({
  open,
  onOpenChange,
  children,
  snapPoints,
  defaultSnapPoint,
  dismissible = true,
  closeThreshold = 0.25,
  handleVisible = true,
  title,
  description,
  className,
  contentClassName,
  modal = true,
}) => {
  const handleDrag = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!dismissible) return;

      // If dragged down past threshold, close the sheet
      if (info.offset.y > 100 && info.velocity.y > 0) {
        onOpenChange(false);
      }
    },
    [dismissible, onOpenChange]
  );

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
      activeSnapPoint={defaultSnapPoint}
      modal={modal}
      dismissible={dismissible}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Drawer.Content
          className={cn(
            'fixed bottom-0 left-0 right-0 z-50',
            'bg-background rounded-t-3xl',
            'border-t border-white/10',
            'max-h-[96vh]',
            'focus:outline-none',
            className
          )}
        >
          {/* Drag handle */}
          {handleVisible && (
            <div className="flex justify-center pt-4 pb-2">
              <div className="sheet-handle" />
            </div>
          )}

          {/* Header with title */}
          {(title || description) && (
            <div className="px-6 pb-4 border-b border-white/5">
              {title && (
                <Drawer.Title className="text-lg font-semibold text-foreground">
                  {title}
                </Drawer.Title>
              )}
              {description && (
                <Drawer.Description className="text-sm text-muted-foreground mt-1">
                  {description}
                </Drawer.Description>
              )}
            </div>
          )}

          {/* Content */}
          <div
            className={cn(
              'overflow-y-auto momentum-scroll-y',
              'px-6 py-4 pb-safe',
              contentClassName
            )}
          >
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

// Simpler action sheet variant for quick actions
interface ActionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  actions: {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    destructive?: boolean;
    disabled?: boolean;
  }[];
  cancelLabel?: string;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  open,
  onOpenChange,
  title,
  actions,
  cancelLabel = 'Cancel',
}) => {
  const handleAction = useCallback(
    (action: () => void) => {
      action();
      onOpenChange(false);
    },
    [onOpenChange]
  );

  return (
    <SwipeableBottomSheet
      open={open}
      onOpenChange={onOpenChange}
      handleVisible={true}
      contentClassName="px-4 pb-6"
    >
      {title && (
        <p className="text-center text-sm text-muted-foreground mb-4 px-4">
          {title}
        </p>
      )}

      <div className="space-y-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleAction(action.onClick)}
            disabled={action.disabled}
            className={cn(
              'w-full flex items-center justify-center gap-3',
              'h-14 rounded-2xl',
              'text-base font-medium',
              'transition-all duration-150',
              'active:scale-[0.98]',
              action.destructive
                ? 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                : 'bg-white/5 text-foreground hover:bg-white/10',
              action.disabled && 'opacity-50 pointer-events-none'
            )}
          >
            {action.icon && (
              <span className="w-5 h-5">{action.icon}</span>
            )}
            {action.label}
          </button>
        ))}

        {/* Cancel button */}
        <button
          onClick={() => onOpenChange(false)}
          className={cn(
            'w-full h-14 rounded-2xl mt-2',
            'bg-white/10 text-foreground',
            'text-base font-semibold',
            'transition-all duration-150',
            'active:scale-[0.98]'
          )}
        >
          {cancelLabel}
        </button>
      </div>
    </SwipeableBottomSheet>
  );
};

// Confirmation sheet for destructive actions
interface ConfirmSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  destructive?: boolean;
}

export const ConfirmSheet: React.FC<ConfirmSheetProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  destructive = false,
}) => {
  const handleConfirm = useCallback(() => {
    onConfirm();
    onOpenChange(false);
  }, [onConfirm, onOpenChange]);

  return (
    <SwipeableBottomSheet
      open={open}
      onOpenChange={onOpenChange}
      handleVisible={true}
      contentClassName="text-center"
    >
      <div className="py-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onOpenChange(false)}
          className={cn(
            'flex-1 h-12 rounded-xl',
            'bg-white/5 text-foreground',
            'font-medium',
            'active:scale-[0.98] transition-all'
          )}
        >
          {cancelLabel}
        </button>
        <button
          onClick={handleConfirm}
          className={cn(
            'flex-1 h-12 rounded-xl font-medium',
            'active:scale-[0.98] transition-all',
            destructive
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-elec-yellow text-elec-dark'
          )}
        >
          {confirmLabel}
        </button>
      </div>
    </SwipeableBottomSheet>
  );
};

export default SwipeableBottomSheet;
