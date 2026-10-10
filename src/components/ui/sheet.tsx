import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { pushOverlay } from '@/lib/overlay-stack';

/**
 * Sheet wrapper that preserves scroll position on iOS.
 * Radix Dialog sets overflow:hidden on body which causes scroll-to-top on iOS.
 * This wrapper saves/restores scroll position around open/close.
 */
const Sheet = ({
  open,
  onOpenChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Root>) => {
  const scrollPos = React.useRef(0);
  const wasOpenRef = React.useRef(false);

  React.useEffect(() => {
    if (open) {
      scrollPos.current = window.scrollY;
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      // Restore scroll after Radix removes overflow:hidden — only if we previously opened
      const timer = setTimeout(() => window.scrollTo(0, scrollPos.current), 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Register with the global overlay stack while open so the Android hardware
  // back button closes this sheet before navigating the route history.
  React.useEffect(() => {
    if (!open || !onOpenChange) return;
    const unregister = pushOverlay(() => onOpenChange(false));
    return unregister;
  }, [open, onOpenChange]);

  return <SheetPrimitive.Root open={open} onOpenChange={onOpenChange} {...props} />;
};
Sheet.displayName = 'Sheet';

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-[100] bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  'fixed z-[100] gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          // pb is composed to MAX(default 1.5rem, env(safe-area-inset-bottom))
          // so bottom sheets always clear the Android 10+ gesture-nav pill
          // (~24px) without losing visual padding on devices without one.
          'inset-x-0 bottom-0 border-t pb-[max(1.5rem,env(safe-area-inset-bottom))] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom lg:left-[var(--sidebar-width,0px)] lg:rounded-t-2xl',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  hideCloseButton?: boolean;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(
  (
    { side = 'right', className, children, hideCloseButton = false, onOpenAutoFocus, ...props },
    ref
  ) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        // Default: don't auto-focus the first input. Mobile keyboards popping
        // up immediately hide the form before the user can read it. Caller
        // can opt back in by passing their own onOpenAutoFocus handler that
        // doesn't preventDefault().
        onOpenAutoFocus={(e) => {
          if (onOpenAutoFocus) {
            onOpenAutoFocus(e);
          } else {
            e.preventDefault();
          }
        }}
        {...props}
      >
        {children}
        {/*
          44px hit area — the documented touch minimum (CLAUDE.md, and
          `.claude/rules/frontend.md`). This was a bare 16px icon, and it is a
          shared primitive, so EVERY sheet in the app carried an undersized
          close. The icon stays 4x4; only the tappable area grows, and it is
          offset so the icon lands EXACTLY where it always has: the old icon
          centred 24px from each edge (16px inset + half of 16px), and a 44px
          box needs a 2px inset to centre in the same place. Every existing
          sheet therefore looks unchanged; only the tappable area grows.
        */}
        {!hideCloseButton && (
          <SheetPrimitive.Close className="absolute right-0.5 top-0.5 h-11 w-11 flex items-center justify-center rounded-full text-white transition-colors hover:bg-white/[0.08] active:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none touch-manipulation">
            {/* Full white, 20px (10 Oct): opacity-70 read as grey. */}
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
