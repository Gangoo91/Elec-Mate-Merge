import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StickyGenerateButtonProps {
  children: ReactNode;
  className?: string;
}

export const StickyGenerateButton = ({ children, className }: StickyGenerateButtonProps) => {
  return (
    <>
      {/* Spacer for normal flow on larger screens */}
      <div className="hidden sm:block">
        {children}
      </div>
      
      {/* Sticky bottom bar on mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 animate-slide-up-fade">
        <div className="bg-gradient-to-t from-background via-background to-background/0 pt-6 pb-safe">
          <div className="px-3 pb-3">
            <div className="backdrop-blur-md bg-background/80 rounded-lg p-2 shadow-2xl border border-border/50">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
