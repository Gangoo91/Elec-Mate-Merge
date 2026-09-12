import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Input } from '@/components/ui/input';
import { inputCn, labelCn, selectTriggerCn } from '@/components/settings/formStyles';

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
        <Label className={labelCn}>
          Insurance provider <span className="text-red-400">*</span>
        </Label>
        <MobileSelectPicker
          value={provider}
          onValueChange={onProviderChange}
          options={UK_INSURANCE_PROVIDERS}
          placeholder="Select a provider"
          triggerClassName={selectTriggerCn}
        />
      </div>

      {showFields && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="insurancePolicyNumber" className={labelCn}>
              Policy number <span className="text-red-400">*</span>
            </Label>
            <Input
              id="insurancePolicyNumber"
              value={policyNumber}
              onChange={(e) => onPolicyNumberChange(e.target.value)}
              placeholder="Enter policy number"
              className={inputCn}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="insuranceCoverage" className={labelCn}>
              Coverage amount (£)
            </Label>
            <Input
              id="insuranceCoverage"
              value={coverage}
              onChange={(e) => onCoverageChange(e.target.value)}
              placeholder="e.g., 1000000"
              inputMode="numeric"
              className={inputCn}
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="insuranceExpiry" className={labelCn}>
              Expiry date
            </Label>
            <Input
              id="insuranceExpiry"
              type="date"
              value={expiry || ''}
              onChange={(e) => onExpiryChange(e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
      )}
    </div>
  );
}
