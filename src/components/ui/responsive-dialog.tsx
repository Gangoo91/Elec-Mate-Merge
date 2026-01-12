import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ResponsiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface ResponsiveDialogContentProps {
  children: React.ReactNode;
  className?: string;
  /** Height for mobile sheet. Defaults to 85vh */
  mobileHeight?: string;
  /** Side for mobile sheet. Defaults to bottom */
  side?: "bottom" | "right" | "left" | "top";
}

interface ResponsiveDialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface ResponsiveDialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface ResponsiveDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface ResponsiveDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface ResponsiveDialogCloseProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const ResponsiveDialogContext = React.createContext<{
  isMobile: boolean;
}>({ isMobile: false });

/**
 * ResponsiveDialog - Renders as Sheet on mobile, Dialog on desktop
 *
 * Usage:
 * ```tsx
 * <ResponsiveDialog open={open} onOpenChange={setOpen}>
 *   <ResponsiveDialogContent>
 *     <ResponsiveDialogHeader>
 *       <ResponsiveDialogTitle>Title</ResponsiveDialogTitle>
 *       <ResponsiveDialogDescription>Description</ResponsiveDialogDescription>
 *     </ResponsiveDialogHeader>
 *     <div className="flex-1 overflow-y-auto p-4">
 *       {content}
 *     </div>
 *     <ResponsiveDialogFooter>
 *       <Button>Action</Button>
 *     </ResponsiveDialogFooter>
 *   </ResponsiveDialogContent>
 * </ResponsiveDialog>
 * ```
 */
export function ResponsiveDialog({
  open,
  onOpenChange,
  children,
}: ResponsiveDialogProps) {
  const isMobile = useIsMobile();

  return (
    <ResponsiveDialogContext.Provider value={{ isMobile }}>
      {isMobile ? (
        <Sheet open={open} onOpenChange={onOpenChange}>
          {children}
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          {children}
        </Dialog>
      )}
    </ResponsiveDialogContext.Provider>
  );
}

export function ResponsiveDialogContent({
  children,
  className,
  mobileHeight = "85vh",
  side = "bottom",
}: ResponsiveDialogContentProps) {
  const { isMobile } = React.useContext(ResponsiveDialogContext);

  if (isMobile) {
    return (
      <SheetContent
        side={side}
        className={cn(
          "flex flex-col p-0",
          side === "bottom" && "rounded-t-2xl",
          className
        )}
        style={side === "bottom" ? { height: mobileHeight } : undefined}
      >
        {children}
      </SheetContent>
    );
  }

  return (
    <DialogContent
      className={cn(
        "max-h-[90vh] flex flex-col overflow-hidden",
        className
      )}
    >
      {children}
    </DialogContent>
  );
}

export function ResponsiveDialogHeader({
  children,
  className,
}: ResponsiveDialogHeaderProps) {
  const { isMobile } = React.useContext(ResponsiveDialogContext);

  if (isMobile) {
    return (
      <SheetHeader
        className={cn("p-4 border-b border-border shrink-0", className)}
      >
        {children}
      </SheetHeader>
    );
  }

  return <DialogHeader className={className}>{children}</DialogHeader>;
}

export function ResponsiveDialogTitle({
  children,
  className,
}: ResponsiveDialogTitleProps) {
  const { isMobile } = React.useContext(ResponsiveDialogContext);

  if (isMobile) {
    return <SheetTitle className={className}>{children}</SheetTitle>;
  }

  return <DialogTitle className={className}>{children}</DialogTitle>;
}

export function ResponsiveDialogDescription({
  children,
  className,
}: ResponsiveDialogDescriptionProps) {
  const { isMobile } = React.useContext(ResponsiveDialogContext);

  if (isMobile) {
    return (
      <SheetDescription className={className}>{children}</SheetDescription>
    );
  }

  return (
    <DialogDescription className={className}>{children}</DialogDescription>
  );
}

export function ResponsiveDialogFooter({
  children,
  className,
}: ResponsiveDialogFooterProps) {
  const { isMobile } = React.useContext(ResponsiveDialogContext);

  if (isMobile) {
    return (
      <SheetFooter
        className={cn(
          "p-4 border-t border-border shrink-0 pb-safe",
          className
        )}
      >
        {children}
      </SheetFooter>
    );
  }

  return <DialogFooter className={className}>{children}</DialogFooter>;
}

export function ResponsiveDialogClose({
  children,
  className,
  asChild,
}: ResponsiveDialogCloseProps) {
  const { isMobile } = React.useContext(ResponsiveDialogContext);

  if (isMobile) {
    return (
      <SheetClose asChild={asChild} className={className}>
        {children}
      </SheetClose>
    );
  }

  return (
    <DialogClose asChild={asChild} className={className}>
      {children}
    </DialogClose>
  );
}

/**
 * Body component for scrollable content area
 */
export function ResponsiveDialogBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-4", className)}>
      {children}
    </div>
  );
}
