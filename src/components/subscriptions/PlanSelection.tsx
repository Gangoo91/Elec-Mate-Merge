
import { useState } from "react";
import PlansList from "./PlansList";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const PlanSelection = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex flex-col items-center gap-5">
        <div className="relative inline-flex items-center p-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-lg">
          {/* Background slider with glow */}
          <div
            className={cn(
              "absolute h-[calc(100%-12px)] rounded-full transition-all duration-300 ease-out",
              "bg-elec-yellow shadow-lg shadow-elec-yellow/40",
              billing === "monthly" ? "left-1.5 w-[calc(50%-6px)]" : "left-[calc(50%+3px)] w-[calc(50%-6px)]"
            )}
          />

          {/* Monthly Button */}
          <button
            onClick={() => setBilling("monthly")}
            className={cn(
              "relative z-10 px-8 py-3 text-sm font-semibold rounded-full transition-all duration-300 min-w-[140px] min-h-[48px] touch-manipulation",
              "active:scale-[0.98]",
              billing === "monthly" ? "text-elec-dark" : "text-white/70 hover:text-foreground"
            )}
          >
            Monthly
          </button>

          {/* Annual Button */}
          <button
            onClick={() => setBilling("yearly")}
            className={cn(
              "relative z-10 px-8 py-3 text-sm font-semibold rounded-full transition-all duration-300 min-w-[140px] min-h-[48px] touch-manipulation",
              "active:scale-[0.98]",
              billing === "yearly" ? "text-elec-dark" : "text-white/70 hover:text-foreground"
            )}
          >
            Annual
          </button>
        </div>

        {/* Savings Badge */}
        {billing === "yearly" && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 animate-fade-in shadow-lg shadow-green-500/10">
            <Sparkles className="h-4 w-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">
              Save up to 17% with annual billing
            </span>
          </div>
        )}
      </div>

      {/* Plans Grid */}
      <PlansList billing={billing} />
    </div>
  );
};

export default PlanSelection;
