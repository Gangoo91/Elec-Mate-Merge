import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Trash2, Wallet } from "lucide-react";
import { IncomeStream } from "@/hooks/use-cash-flow";
import { CalculatorInput, CalculatorSelect } from "@/components/calculators/shared";

interface CashFlowIncomeCardProps {
  stream: IncomeStream;
  onUpdate: (id: string, updates: Partial<IncomeStream>) => void;
  onRemove: (id: string) => void;
}

const frequencyOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "seasonal", label: "Seasonal" },
];

const formatCurrency = (n: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
};

export const CashFlowIncomeCard = ({
  stream,
  onUpdate,
  onRemove,
}: CashFlowIncomeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors touch-manipulation"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="p-2 rounded-lg bg-green-500/10 shrink-0">
            <Wallet className="h-4 w-4 text-green-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-white text-sm truncate">{stream.name}</h4>
            <p className="text-xs text-white/50 capitalize">{stream.frequency}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-green-400 font-semibold text-sm">
            {formatCurrency(stream.amount)}
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
              value={stream.amount.toString()}
              onChange={(val) => onUpdate(stream.id, { amount: parseFloat(val) || 0 })}
            />
            <CalculatorSelect
              label="Frequency"
              value={stream.frequency}
              onChange={(val) => onUpdate(stream.id, { frequency: val as any })}
              options={frequencyOptions}
            />
            <CalculatorInput
              label="Payment Delay"
              unit="days"
              type="text"
              inputMode="numeric"
              value={stream.paymentDelayDays.toString()}
              onChange={(val) =>
                onUpdate(stream.id, { paymentDelayDays: parseInt(val) || 0 })
              }
            />
            <CalculatorInput
              label="Annual Growth"
              unit="%"
              type="text"
              inputMode="decimal"
              value={(stream.growth * 100).toString()}
              onChange={(val) =>
                onUpdate(stream.id, { growth: (parseFloat(val) || 0) / 100 })
              }
            />
          </div>
          <button
            onClick={() => onRemove(stream.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 text-sm hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Remove Income Stream</span>
          </button>
        </div>
      )}
    </div>
  );
};
