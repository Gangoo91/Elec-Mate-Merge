import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileBottomSheetProps {
  /** Whether the sheet is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Title shown in header */
  title?: string;
  /** Children to render in the sheet body */
  children: React.ReactNode;
  /** Snap points as fractions (e.g., [0.5, 0.9] for 50% and 90%) */
  snapPoints?: number[];
  /** Additional class names for content */
  className?: string;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Custom header content */
  headerContent?: React.ReactNode;
}

/**
 * General-purpose mobile bottom sheet component
 * Uses Vaul drawer for touch-friendly interactions
 */
export const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  snapPoints = [0.85],
  className = '',
  showCloseButton = true,
  headerContent,
}) => {
  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      snapPoints={snapPoints}
    >
      <DrawerContent
        className={cn(
          'max-h-[95vh] flex flex-col',
          className
        )}
      >
        {/* Header */}
        {(title || headerContent || showCloseButton) && (
          <DrawerHeader className="border-b border-border pb-3 px-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              {title && (
                <DrawerTitle className="text-lg font-semibold">
                  {title}
                </DrawerTitle>
              )}
              {headerContent}
              {showCloseButton && (
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 -mr-2"
                    onClick={onClose}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DrawerClose>
              )}
            </div>
          </DrawerHeader>
        )}

        {/* Body */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

/**
 * Scrollable content area for bottom sheet
 */
export const BottomSheetScrollArea: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={cn('flex-1 overflow-y-auto overscroll-contain', className)}>
    {children}
  </div>
);

/**
 * Fixed footer area for bottom sheet
 */
export const BottomSheetFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={cn(
      'flex-shrink-0 border-t border-border p-4 pb-safe bg-background',
      className
    )}
  >
    {children}
  </div>
);

export default MobileBottomSheet;
