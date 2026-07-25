import * as React from 'react';
import { SheetContent } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface SettingsSheetContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SheetContent>, 'side'> {
  /** Short forms (e.g. password confirm) keep natural height on mobile. */
  mobileAuto?: boolean;
}

/**
 * Settings edit surface: bottom sheet on mobile, right-hand panel on desktop.
 * Keeps the native-app feel on phones without stretching a phone pattern
 * across a desktop viewport.
 */
const SettingsSheetContent = React.forwardRef<
  React.ElementRef<typeof SheetContent>,
  SettingsSheetContentProps
>(({ className, children, mobileAuto, ...props }, ref) => {
  const isMobile = useIsMobile();
  return (
    <SheetContent
      ref={ref}
      side={isMobile ? 'bottom' : 'right'}
      className={cn(
        'p-0 overflow-hidden',
        isMobile
          ? cn('rounded-t-2xl border-t border-white/[0.06]', !mobileAuto && 'h-[85vh]')
          : 'h-full w-full sm:max-w-xl rounded-none border-l border-white/[0.08]',
        className
      )}
      {...props}
    >
      {children}
    </SheetContent>
  );
});
SettingsSheetContent.displayName = 'SettingsSheetContent';

export default SettingsSheetContent;
