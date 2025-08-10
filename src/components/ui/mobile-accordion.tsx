import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const MobileAccordion = AccordionPrimitive.Root;

const MobileAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("", className)}
    {...props}
  />
));
MobileAccordionItem.displayName = "MobileAccordionItem";

const MobileAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    icon?: React.ReactNode;
  }
>(({ className, children, icon, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-center py-4 px-4 text-sm font-medium transition-all hover:underline relative",
        "bg-elec-gray border border-elec-yellow/20 rounded-t-lg [&[data-state=open]]:rounded-b-none",
        "touch-manipulation min-h-[48px] text-white",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center w-full">
        {icon}
        {children}
      </div>
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 [&[data-state=open]]:rotate-180 absolute right-4" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
MobileAccordionTrigger.displayName = "MobileAccordionTrigger";

const MobileAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("p-0 text-white", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
MobileAccordionContent.displayName = "MobileAccordionContent";

export {
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent,
};