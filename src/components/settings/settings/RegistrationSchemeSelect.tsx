import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";

interface RegistrationSchemeSelectProps {
  scheme: string;
  registrationNumber: string;
  registrationExpiry?: string;
  onSchemeChange: (value: string) => void;
  onNumberChange: (value: string) => void;
  onExpiryChange: (value: string) => void;
}

const UK_REGISTRATION_SCHEMES = [
  { value: "none", label: "None" },
  { value: "niceic", label: "NICEIC" },
  { value: "napit", label: "NAPIT" },
  { value: "elecsa", label: "ELECSA" },
  { value: "stroma", label: "STROMA" },
  { value: "oftec", label: "OFTEC" },
  { value: "besca", label: "BESCA" },
  { value: "other", label: "Other" },
];

export function RegistrationSchemeSelect({
  scheme,
  registrationNumber,
  registrationExpiry,
  onSchemeChange,
  onNumberChange,
  onExpiryChange,
}: RegistrationSchemeSelectProps) {
  const showFields = scheme && scheme !== "none";

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="registrationScheme" className="text-foreground font-semibold">
          Registration Scheme
        </Label>
        <Select value={scheme} onValueChange={onSchemeChange}>
          <SelectTrigger id="registrationScheme" className="mt-1.5 h-12 min-h-[48px] bg-background border-elec-gray-light">
            <SelectValue placeholder="Select a scheme" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-elec-gray-light">
            {UK_REGISTRATION_SCHEMES.map((option) => (
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
            <Label htmlFor="registrationNumber" className="text-foreground font-semibold">
              Registration Number <span className="text-red-500 text-base font-bold">*</span>
            </Label>
            <Input
              id="registrationNumber"
              value={registrationNumber}
              onChange={(e) => onNumberChange(e.target.value)}
              placeholder="Enter registration number"
              className="mt-1.5 min-h-[48px]"
            />
          </div>

          <div>
            <Label htmlFor="registrationExpiry" className="text-foreground font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4 text-elec-yellow" />
              Expiry Date
            </Label>
            <Input
              id="registrationExpiry"
              type="date"
              value={registrationExpiry || ''}
              onChange={(e) => onExpiryChange(e.target.value)}
              className="mt-1.5 h-12 min-h-[48px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
