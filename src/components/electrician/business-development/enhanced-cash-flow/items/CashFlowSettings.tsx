import { Settings } from "lucide-react";
import { CalculatorInput, CalculatorSelect } from "@/components/calculators/shared";

interface CashFlowSettingsProps {
  startingBalance: number;
  emergencyFundTarget: number;
  vatQuarter: number;
  selectedScenario: string;
  vatScheme: string;
  badDebtPercent: number;
  cardFeesPercent: number;
  monthlyLoanRepayments: number;
  flatRatePercent: number;
  scenarios: { id: string; name: string }[];
  onUpdate: (updates: any) => void;
}

const vatQuarterOptions = [
  { value: "1", label: "Jan/Apr/Jul/Oct" },
  { value: "2", label: "Feb/May/Aug/Nov" },
  { value: "3", label: "Mar/Jun/Sep/Dec" },
];

const vatSchemeOptions = [
  { value: "standard", label: "Standard" },
  { value: "flat-rate", label: "Flat Rate" },
];

export const CashFlowSettings = ({
  startingBalance,
  emergencyFundTarget,
  vatQuarter,
  selectedScenario,
  vatScheme,
  badDebtPercent,
  cardFeesPercent,
  monthlyLoanRepayments,
  flatRatePercent,
  scenarios,
  onUpdate,
}: CashFlowSettingsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Settings className="h-4 w-4 text-blue-400" />
        <span className="text-sm font-medium text-white/80">Settings & Assumptions</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <CalculatorInput
          label="Starting Balance"
          unit="£"
          type="text"
          inputMode="decimal"
          value={startingBalance.toString()}
          onChange={(val) => onUpdate({ startingBalance: parseFloat(val) || 0 })}
          hint="Current cash on hand"
        />
        <CalculatorInput
          label="Emergency Fund Target"
          unit="£"
          type="text"
          inputMode="decimal"
          value={emergencyFundTarget.toString()}
          onChange={(val) => onUpdate({ emergencyFundTarget: parseFloat(val) || 0 })}
          hint="Target emergency reserve"
        />
        <CalculatorSelect
          label="VAT Quarter"
          value={vatQuarter.toString()}
          onChange={(val) => onUpdate({ vatQuarter: parseInt(val) })}
          options={vatQuarterOptions}
        />
        <CalculatorSelect
          label="Active Scenario"
          value={selectedScenario}
          onChange={(val) => onUpdate({ selectedScenario: val })}
          options={scenarios.map((s) => ({ value: s.id, label: s.name }))}
        />
        <CalculatorSelect
          label="VAT Scheme"
          value={vatScheme}
          onChange={(val) => onUpdate({ vatScheme: val })}
          options={vatSchemeOptions}
        />
        <CalculatorInput
          label="Bad Debt %"
          unit="%"
          type="text"
          inputMode="decimal"
          value={badDebtPercent.toString()}
          onChange={(val) => onUpdate({ badDebtPercent: parseFloat(val) || 0 })}
          hint="Allowance for non-payment"
        />
        <CalculatorInput
          label="Card Fees %"
          unit="%"
          type="text"
          inputMode="decimal"
          value={cardFeesPercent.toString()}
          onChange={(val) => onUpdate({ cardFeesPercent: parseFloat(val) || 0 })}
          hint="Payment processing fees"
        />
        <CalculatorInput
          label="Monthly Loan Repayments"
          unit="£"
          type="text"
          inputMode="decimal"
          value={monthlyLoanRepayments.toString()}
          onChange={(val) => onUpdate({ monthlyLoanRepayments: parseFloat(val) || 0 })}
        />
        {vatScheme === "flat-rate" && (
          <CalculatorInput
            label="Flat Rate %"
            unit="%"
            type="text"
            inputMode="decimal"
            value={flatRatePercent.toString()}
            onChange={(val) => onUpdate({ flatRatePercent: parseFloat(val) || 0 })}
            hint="Typical 12.5% for services"
          />
        )}
      </div>
    </div>
  );
};
