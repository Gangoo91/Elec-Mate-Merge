import * as React from 'react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface SettingsSheetContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SheetContent>, 'side' | 'title'> {
  /** Short forms (e.g. password confirm) keep natural height on mobile. */
  mobileAuto?: boolean;
  /**
   * Accessible name for the sheet, announced by screen readers.
   *
   * Radix requires every dialog to have a Title and a Description, and warns
   * in the console when they are missing. Every sheet in Settings draws its
   * own styled `<h2>` instead, so the accessible name is supplied here and
   * visually hidden — the heading on screen is unchanged.
   *
   * Pass the same words as the visible heading.
   */
  title?: string;
  /** One line describing the sheet, for the same reason. */
  description?: string;
}

/**
 * Settings edit surface: bottom sheet on mobile, right-hand panel on desktop.
 * Keeps the native-app feel on phones without stretching a phone pattern
 * across a desktop viewport.
 *
 * ⚠️ The background must be OPAQUE. A sheet floats over the page, so any
 * translucent value (`bg-white/[0.05]`, a colour with an alpha) lets the
 * content behind it read through and the form becomes unreadable. The default
 * below is the app's page colour; override it with another *solid* colour, not
 * with a wash.
 */
const SettingsSheetContent = React.forwardRef<
  React.ElementRef<typeof SheetContent>,
  SettingsSheetContentProps
>(({ className, children, mobileAuto, title, description, ...props }, ref) => {
  const isMobile = useIsMobile();
  return (
    <SheetContent
      ref={ref}
      side={isMobile ? 'bottom' : 'right'}
      hideCloseButton
      className={cn(
        'overflow-hidden bg-elec-dark p-0',
        isMobile
          ? cn('rounded-t-2xl border-t border-white/[0.08]', !mobileAuto && 'h-[85vh]')
          : 'h-full w-full rounded-none border-l border-white/[0.08] sm:max-w-xl',
        className
      )}
      {...props}
    >
      <VisuallyHidden.Root>
        <SheetTitle>{title ?? 'Settings'}</SheetTitle>
        <SheetDescription>{description ?? 'Edit your Elec-Mate settings.'}</SheetDescription>
      </VisuallyHidden.Root>
      {children}
    </SheetContent>
  );
});
SettingsSheetContent.displayName = 'SettingsSheetContent';

export default SettingsSheetContent;
