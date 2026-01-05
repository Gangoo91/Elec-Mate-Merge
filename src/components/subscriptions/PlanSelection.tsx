
import { useState } from "react";
import PlansList from "./PlansList";
import { cn } from "@/lib/utils";

const PlanSelection = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative inline-flex items-center p-1 rounded-full bg-elec-gray/50 border border-elec-yellow/20 backdrop-blur-sm">
          {/* Background slider */}
          <div
            className={cn(
              "absolute h-[calc(100%-8px)] rounded-full bg-elec-yellow transition-all duration-300 ease-out",
              billing === "monthly" ? "left-1 w-[calc(50%-4px)]" : "left-[calc(50%+2px)] w-[calc(50%-4px)]"
            )}
          />
          
          {/* Monthly Button */}
          <button
            onClick={() => setBilling("monthly")}
            className={cn(
              "relative z-10 px-6 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 min-w-[120px]",
              billing === "monthly" ? "text-elec-dark" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Monthly
          </button>
          
          {/* Annual Button */}
          <button
            onClick={() => setBilling("yearly")}
            className={cn(
              "relative z-10 px-6 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 min-w-[120px]",
              billing === "yearly" ? "text-elec-dark" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Annual
          </button>
        </div>

        {/* Savings Badge */}
        {billing === "yearly" && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 animate-fade-in">
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
