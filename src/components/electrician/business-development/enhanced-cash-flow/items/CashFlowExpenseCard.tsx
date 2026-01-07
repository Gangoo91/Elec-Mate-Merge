import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Trash2, PiggyBank } from "lucide-react";
import { ExpenseCategory } from "@/hooks/use-cash-flow";
import { CalculatorInput, CalculatorSelect } from "@/components/calculators/shared";

interface CashFlowExpenseCardProps {
  category: ExpenseCategory;
  onUpdate: (id: string, updates: Partial<ExpenseCategory>) => void;
  onRemove: (id: string) => void;
}

const frequencyOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annual", label: "Annual" },
];

const formatCurrency = (n: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
};

export const CashFlowExpenseCard = ({
  category,
  onUpdate,
  onRemove,
}: CashFlowExpenseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors touch-manipulation"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="p-2 rounded-lg bg-red-500/10 shrink-0">
            <PiggyBank className="h-4 w-4 text-red-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-white text-sm truncate">{category.name}</h4>
              {category.variable && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 shrink-0">
                  Variable
                </span>
              )}
            </div>
            <p className="text-xs text-white/50 capitalize">{category.frequency}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-red-400 font-semibold text-sm">
            {formatCurrency(category.amount)}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-white/10 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CalculatorInput
              label="Amount"
              unit="£"
              type="text"
              inputMode="decimal"
              value={category.amount.toString()}
              onChange={(val) => onUpdate(category.id, { amount: parseFloat(val) || 0 })}
            />
            <CalculatorSelect
              label="Frequency"
              value={category.frequency}
              onChange={(val) => onUpdate(category.id, { frequency: val as any })}
              options={frequencyOptions}
            />
            <CalculatorInput
              label="Annual Growth"
              unit="%"
              type="text"
              inputMode="decimal"
              value={(category.growth * 100).toString()}
              onChange={(val) =>
                onUpdate(category.id, { growth: (parseFloat(val) || 0) / 100 })
              }
            />
            {(category.frequency === "quarterly" || category.frequency === "annual") && (
              <CalculatorInput
                label="Timing (Month)"
                type="text"
                inputMode="numeric"
                value={(category.timing || 1).toString()}
                onChange={(val) =>
                  onUpdate(category.id, { timing: parseInt(val) || 1 })
                }
              />
            )}
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={category.variable}
                onChange={(e) => onUpdate(category.id, { variable: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span className="text-sm text-white/70">Variable cost</span>
            </label>
          </div>
          <button
            onClick={() => onRemove(category.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 text-sm hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Remove Expense</span>
          </button>
        </div>
      )}
    </div>
  );
};
