import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

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
  { value: 'none', label: 'None' },
  { value: 'axa', label: 'AXA' },
  { value: 'hiscox', label: 'Hiscox' },
  { value: 'zurich', label: 'Zurich' },
  { value: 'aviva', label: 'Aviva' },
  { value: 'allianz', label: 'Allianz' },
  { value: 'simplebusiness', label: 'Simply Business' },
  { value: 'direct-line', label: 'Direct Line for Business' },
  { value: 'gallagher', label: 'Gallagher' },
  { value: 'other', label: 'Other' },
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
  const showFields = provider && provider !== 'none';

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="insuranceProvider" className="text-white font-medium text-[13px]">
          Insurance provider <span className="text-red-400">*</span>
        </Label>
        <Select value={provider} onValueChange={onProviderChange}>
          <SelectTrigger
            id="insuranceProvider"
            className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
          >
            <SelectValue placeholder="Select a provider" />
          </SelectTrigger>
          <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
            {UK_INSURANCE_PROVIDERS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showFields && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="insurancePolicyNumber" className="text-white font-medium text-[13px]">
              Policy number <span className="text-red-400">*</span>
            </Label>
            <Input
              id="insurancePolicyNumber"
              value={policyNumber}
              onChange={(e) => onPolicyNumberChange(e.target.value)}
              placeholder="Enter policy number"
              className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="insuranceCoverage" className="text-white font-medium text-[13px]">
              Coverage amount (£)
            </Label>
            <Input
              id="insuranceCoverage"
              value={coverage}
              onChange={(e) => onCoverageChange(e.target.value)}
              placeholder="e.g., 1000000"
              inputMode="numeric"
              className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="insuranceExpiry" className="text-white font-medium text-[13px]">
              Expiry date
            </Label>
            <Input
              id="insuranceExpiry"
              type="date"
              value={expiry || ''}
              onChange={(e) => onExpiryChange(e.target.value)}
              className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
            />
          </div>
        </div>
      )}
    </div>
  );
}
