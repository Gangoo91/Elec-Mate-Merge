import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface RegistrationSchemeSelectProps {
  scheme: string;
  registrationNumber: string;
  registrationExpiry?: string;
  onSchemeChange: (value: string) => void;
  onNumberChange: (value: string) => void;
  onExpiryChange: (value: string) => void;
}

const UK_REGISTRATION_SCHEMES = [
  { value: 'none', label: 'None' },
  { value: 'niceic', label: 'NICEIC' },
  { value: 'napit', label: 'NAPIT' },
  { value: 'elecsa', label: 'ELECSA' },
  { value: 'stroma', label: 'STROMA' },
  { value: 'oftec', label: 'OFTEC' },
  { value: 'besca', label: 'BESCA' },
  { value: 'other', label: 'Other' },
];

export function RegistrationSchemeSelect({
  scheme,
  registrationNumber,
  registrationExpiry,
  onSchemeChange,
  onNumberChange,
  onExpiryChange,
}: RegistrationSchemeSelectProps) {
  const showFields = scheme && scheme !== 'none';

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="registrationScheme" className="text-white font-medium text-[13px]">
          Registration scheme
        </Label>
        <Select value={scheme} onValueChange={onSchemeChange}>
          <SelectTrigger
            id="registrationScheme"
            className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
          >
            <SelectValue placeholder="Select a scheme" />
          </SelectTrigger>
          <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
            {UK_REGISTRATION_SCHEMES.map((option) => (
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
            <Label htmlFor="registrationNumber" className="text-white font-medium text-[13px]">
              Registration number <span className="text-red-400">*</span>
            </Label>
            <Input
              id="registrationNumber"
              value={registrationNumber}
              onChange={(e) => onNumberChange(e.target.value)}
              placeholder="Enter registration number"
              className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="registrationExpiry" className="text-white font-medium text-[13px]">
              Expiry date
            </Label>
            <Input
              id="registrationExpiry"
              type="date"
              value={registrationExpiry || ''}
              onChange={(e) => onExpiryChange(e.target.value)}
              className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
            />
          </div>
        </div>
      )}
    </div>
  );
}
