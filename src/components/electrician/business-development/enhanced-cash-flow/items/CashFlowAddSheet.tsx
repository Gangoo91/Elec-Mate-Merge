import { useState } from "react";
import { cn } from "@/lib/utils";
import { X, Plus, Wallet, PiggyBank } from "lucide-react";
import { CalculatorInput, CalculatorSelect } from "@/components/calculators/shared";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type ItemType = "income" | "expense";

interface CashFlowAddSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: ItemType;
  onAdd: (item: any) => void;
}

const incomeFrequencyOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "seasonal", label: "Seasonal" },
];

const expenseFrequencyOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annual", label: "Annual" },
];

export const CashFlowAddSheet = ({
  open,
  onOpenChange,
  type,
  onAdd,
}: CashFlowAddSheetProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [paymentDelayDays, setPaymentDelayDays] = useState("14");
  const [growth, setGrowth] = useState("5");
  const [variable, setVariable] = useState(true);

  const isIncome = type === "income";

  const handleSubmit = () => {
    if (!name || !amount) return;

    if (isIncome) {
      onAdd({
        name,
        amount: parseFloat(amount) || 0,
        frequency,
        paymentDelayDays: parseInt(paymentDelayDays) || 14,
        growth: (parseFloat(growth) || 5) / 100,
      });
    } else {
      onAdd({
        name,
        amount: parseFloat(amount) || 0,
        frequency,
        variable,
        growth: (parseFloat(growth) || 3) / 100,
      });
    }

    // Reset form
    setName("");
    setAmount("");
    setFrequency("monthly");
    setPaymentDelayDays("14");
    setGrowth(isIncome ? "5" : "3");
    setVariable(true);
    onOpenChange(false);
  };

  const canSubmit = name.trim() !== "" && parseFloat(amount) > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="bg-card border-white/10 rounded-t-2xl max-h-[85vh] overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-3 text-white">
            <div
              className={cn(
                "p-2 rounded-lg",
                isIncome ? "bg-green-500/10" : "bg-red-500/10"
              )}
            >
              {isIncome ? (
                <Wallet className="h-5 w-5 text-green-400" />
              ) : (
                <PiggyBank className="h-5 w-5 text-red-400" />
              )}
            </div>
            Add {isIncome ? "Income Stream" : "Expense"}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 py-4">
          <CalculatorInput
            label="Name"
            type="text"
            value={name}
            onChange={setName}
            placeholder={isIncome ? "e.g., Regular Contracts" : "e.g., Van Insurance"}
          />

          <CalculatorInput
            label="Amount"
            unit="£"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={setAmount}
            placeholder="0"
          />

          <CalculatorSelect
            label="Frequency"
            value={frequency}
            onChange={setFrequency}
            options={isIncome ? incomeFrequencyOptions : expenseFrequencyOptions}
          />

          {isIncome && (
            <CalculatorInput
              label="Payment Delay"
              unit="days"
              type="text"
              inputMode="numeric"
              value={paymentDelayDays}
              onChange={setPaymentDelayDays}
              hint="Average time to receive payment"
            />
          )}

          <CalculatorInput
            label="Annual Growth"
            unit="%"
            type="text"
            inputMode="decimal"
            value={growth}
            onChange={setGrowth}
            hint="Expected yearly increase"
          />

          {!isIncome && (
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
              <input
                type="checkbox"
                checked={variable}
                onChange={(e) => setVariable(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              <div>
                <span className="text-sm font-medium text-white">Variable cost</span>
                <p className="text-xs text-white/50">Fluctuates with business activity</p>
              </div>
            </label>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 h-12 rounded-xl bg-white/5 border border-white/10 text-white/70 font-medium transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={cn(
              "flex-1 h-12 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors",
              canSubmit
                ? isIncome
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-red-500 text-white hover:bg-red-600"
                : "bg-white/10 text-white/30 cursor-not-allowed"
            )}
          >
            <Plus className="h-4 w-4" />
            Add {isIncome ? "Income" : "Expense"}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
