
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface UnitDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const UnitDropdown = ({ value, onChange, className }: UnitDropdownProps) => {
  const electricalUnits = [
    { value: 'Ω', label: 'Ω (Ohms)' },
    { value: 'kΩ', label: 'kΩ (Kiloohms)' },
    { value: 'MΩ', label: 'MΩ (Megohms)' },
    { value: 'V', label: 'V (Volts)' },
    { value: 'mV', label: 'mV (Millivolts)' },
    { value: 'kV', label: 'kV (Kilovolts)' },
    { value: 'A', label: 'A (Amperes)' },
    { value: 'mA', label: 'mA (Milliamperes)' },
    { value: 'μA', label: 'μA (Microamperes)' },
    { value: 'W', label: 'W (Watts)' },
    { value: 'kW', label: 'kW (Kilowatts)' },
    { value: 'VAr', label: 'VAr (Reactive Power)' },
    { value: 'VA', label: 'VA (Apparent Power)' },
    { value: 'Hz', label: 'Hz (Hertz)' },
    { value: 'ms', label: 'ms (Milliseconds)' },
    { value: 's', label: 's (Seconds)' },
    { value: '°C', label: '°C (Celsius)' },
    { value: '%', label: '% (Percentage)' },
    { value: 'mm', label: 'mm (Millimeters)' },
    { value: 'm', label: 'm (Meters)' },
    { value: 'lux', label: 'lux (Illuminance)' }
  ];

  return (
    <div>
      <Label htmlFor="unit" className="text-sm font-medium">Unit</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`bg-elec-dark border-elec-yellow/20 mt-1 ${className}`}>
          <SelectValue placeholder="Select unit" />
        </SelectTrigger>
        <SelectContent className="bg-elec-dark border-elec-yellow/20 max-h-60">
          {electricalUnits.map((unit) => (
            <SelectItem 
              key={unit.value} 
              value={unit.value}
              className="text-white hover:bg-elec-yellow/20 focus:bg-elec-yellow/20"
            >
              {unit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UnitDropdown;
