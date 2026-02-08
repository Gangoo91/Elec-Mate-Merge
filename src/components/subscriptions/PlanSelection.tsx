import { useState } from "react";
import PlansList from "./PlansList";
import { cn } from "@/lib/utils";

const PlanSelection = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Billing Toggle — cleaner, tighter */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative inline-flex items-center p-1 rounded-full bg-white/[0.06] border border-white/[0.08]">
          {/* Slider */}
          <div
            className={cn(
              "absolute h-[calc(100%-8px)] rounded-full transition-all duration-300 ease-out",
              "bg-elec-yellow shadow-md shadow-elec-yellow/30",
              billing === "monthly" ? "left-1 w-[calc(50%-4px)]" : "left-[calc(50%+3px)] w-[calc(50%-4px)]"
            )}
          />

          <button
            onClick={() => setBilling("monthly")}
            className={cn(
              "relative z-10 px-6 sm:px-8 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 min-w-[110px] sm:min-w-[130px] min-h-[44px] touch-manipulation",
              "active:scale-[0.98]",
              billing === "monthly" ? "text-elec-dark" : "text-white/50"
            )}
          >
            Monthly
          </button>

          <button
            onClick={() => setBilling("yearly")}
            className={cn(
              "relative z-10 px-6 sm:px-8 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 min-w-[110px] sm:min-w-[130px] min-h-[44px] touch-manipulation",
              "active:scale-[0.98]",
              billing === "yearly" ? "text-elec-dark" : "text-white/50"
            )}
          >
            Annual
          </button>
        </div>

        {/* Annual savings note */}
        {billing === "yearly" && (
          <span className="text-xs text-green-400 font-medium animate-fade-in">
            Save up to 17% with annual billing
          </span>
        )}
      </div>

      {/* Plans Grid */}
      <PlansList billing={billing} />
    </div>
  );
};

export default PlanSelection;
