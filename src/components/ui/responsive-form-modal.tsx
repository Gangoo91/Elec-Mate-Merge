import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface ResponsiveFormModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  trigger?: React.ReactNode;
}

interface ResponsiveFormModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface ResponsiveFormModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface ResponsiveFormModalContentProps {
  children: React.ReactNode;
  className?: string;
}

interface ResponsiveFormModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveFormModalContext = React.createContext<{ isMobile: boolean }>({
  isMobile: false,
});

function ResponsiveFormModal({
  open,
  onOpenChange,
  children,
  trigger,
}: ResponsiveFormModalProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <ResponsiveFormModalContext.Provider value={{ isMobile: true }}>
        <Drawer open={open} onOpenChange={onOpenChange}>
          {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
          {children}
        </Drawer>
      </ResponsiveFormModalContext.Provider>
    );
  }

  return (
    <ResponsiveFormModalContext.Provider value={{ isMobile: false }}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        {children}
      </Dialog>
    </ResponsiveFormModalContext.Provider>
  );
}

function ResponsiveFormModalContent({
  children,
  className,
}: ResponsiveFormModalContentProps) {
  const { isMobile } = React.useContext(ResponsiveFormModalContext);

  if (isMobile) {
    return (
      <DrawerContent
        className={cn(
          "max-h-[95vh] flex flex-col",
          className
        )}
      >
        {children}
      </DrawerContent>
    );
  }

  return (
    <DialogContent
      className={cn(
        "max-w-lg max-h-[90vh] overflow-hidden flex flex-col p-0",
        className
      )}
    >
      {children}
    </DialogContent>
  );
}

function ResponsiveFormModalHeader({
  children,
  className,
}: ResponsiveFormModalHeaderProps) {
  const { isMobile } = React.useContext(ResponsiveFormModalContext);

  if (isMobile) {
    return (
      <DrawerHeader className={cn("px-5 pt-2 pb-4", className)}>
        {children}
      </DrawerHeader>
    );
  }

  return (
    <DialogHeader className={cn("px-6 pt-6 pb-4", className)}>
      {children}
    </DialogHeader>
  );
}

function ResponsiveFormModalTitle({
  children,
  className,
}: ResponsiveFormModalTitleProps) {
  const { isMobile } = React.useContext(ResponsiveFormModalContext);

  if (isMobile) {
    return (
      <DrawerTitle className={cn("flex items-center gap-2", className)}>
        {children}
      </DrawerTitle>
    );
  }

  return (
    <DialogTitle className={cn("flex items-center gap-2", className)}>
      {children}
    </DialogTitle>
  );
}

function ResponsiveFormModalBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto px-5 sm:px-6",
        className
      )}
    >
      {children}
    </div>
  );
}

function ResponsiveFormModalFooter({
  children,
  className,
}: ResponsiveFormModalFooterProps) {
  const { isMobile } = React.useContext(ResponsiveFormModalContext);

  return (
    <div
      className={cn(
        "border-t border-border bg-card/80 backdrop-blur-sm",
        isMobile ? "p-4 pb-safe" : "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
  ResponsiveFormModalFooter,
};
