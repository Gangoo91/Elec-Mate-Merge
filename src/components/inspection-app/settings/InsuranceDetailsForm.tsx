import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Shield } from "lucide-react";

interface InsuranceDetailsFormProps {
  provider: string;
  policyNumber: string;
  coverage: string;
  expiry?: string;
  onProviderChange: (value: string) => void;
  onPolicyNumberChange: (value: string) => void;
  onCoverageChange: (value: string) => void;
  onExpiryChange: (value: string) => void;
}

const UK_INSURANCE_PROVIDERS = [
  { value: "none", label: "None" },
  { value: "axa", label: "AXA" },
  { value: "hiscox", label: "Hiscox" },
  { value: "zurich", label: "Zurich" },
  { value: "aviva", label: "Aviva" },
  { value: "allianz", label: "Allianz" },
  { value: "simplebusiness", label: "Simply Business" },
  { value: "direct-line", label: "Direct Line for Business" },
  { value: "gallagher", label: "Gallagher" },
  { value: "other", label: "Other" },
];

export function InsuranceDetailsForm({
  provider,
  policyNumber,
  coverage,
  expiry,
  onProviderChange,
  onPolicyNumberChange,
  onCoverageChange,
  onExpiryChange,
}: InsuranceDetailsFormProps) {
  const showFields = provider && provider !== "none";

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="insuranceProvider" className="text-foreground font-semibold">
          Insurance Provider <span className="text-red-500 text-base font-bold">*</span>
        </Label>
        <Select value={provider} onValueChange={onProviderChange}>
          <SelectTrigger id="insuranceProvider" className="mt-1.5 h-12 min-h-[48px] bg-background border-elec-gray-light">
            <SelectValue placeholder="Select a provider" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-elec-gray-light">
            {UK_INSURANCE_PROVIDERS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showFields && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-elec-yellow/30">
          <div>
            <Label htmlFor="insurancePolicyNumber" className="text-foreground font-semibold">
              Policy Number <span className="text-red-500 text-base font-bold">*</span>
            </Label>
            <Input
              id="insurancePolicyNumber"
              value={policyNumber}
              onChange={(e) => onPolicyNumberChange(e.target.value)}
              placeholder="Enter policy number"
              className="mt-1.5 min-h-[48px]"
            />
          </div>

          <div>
            <Label htmlFor="insuranceCoverage" className="text-foreground font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4 text-elec-yellow" />
              Coverage Amount (£)
            </Label>
            <Input
              id="insuranceCoverage"
              value={coverage}
              onChange={(e) => onCoverageChange(e.target.value)}
              placeholder="e.g., 1000000"
              inputMode="numeric"
              className="mt-1.5 min-h-[48px]"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="insuranceExpiry" className="text-foreground font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4 text-elec-yellow" />
              Expiry Date
            </Label>
            <Input
              id="insuranceExpiry"
              type="date"
              value={expiry || ''}
              onChange={(e) => onExpiryChange(e.target.value)}
              className="mt-1.5 h-12 min-h-[48px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
