import React, { useMemo, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Zap, Info, Link2, Cable, CircuitBoard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';

interface EarthingBondingSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

/**
 * EarthingBondingSection - Best-in-class mobile form for earthing & bonding details
 * Edge-to-edge design with large touch targets and native app feel
 */
const EarthingBondingSection = ({ formData, onUpdate }: EarthingBondingSectionProps) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();

  const showEarthElectrodeResistance = formData.earthElectrodeType &&
    formData.earthElectrodeType !== 'n/a' &&
    formData.earthElectrodeType !== '';

  const showCustomMainBonding = formData.mainBondingSize === 'custom';
  const showCustomSupplementaryBonding = formData.supplementaryBondingSize === 'custom';

  // Parse existing main bonding locations into checkboxes
  const parseMainBondingLocations = (value: string = ''): Set<string> => {
    const normalized = value.toLowerCase().trim();
    const locations = new Set<string>();

    if (normalized.includes('water')) locations.add('water');
    if (normalized.includes('gas')) locations.add('gas');
    if (normalized.includes('oil')) locations.add('oil');
    if (normalized.includes('structural steel') || normalized.includes('steel')) locations.add('structural-steel');
    if (normalized.includes('telecom')) locations.add('telecoms');

    return locations;
  };

  const [bondingLocations, setBondingLocations] = useState<Set<string>>(() =>
    parseMainBondingLocations(formData.mainBondingLocations)
  );
  const [otherBonding, setOtherBonding] = useState<string>(() => {
    const value = formData.mainBondingLocations || '';
    const knownServices = ['water', 'gas', 'oil', 'structural steel', 'steel', 'telecom'];
    const parts = value.split(',').map((s: string) => s.trim()).filter((s: string) => s);
    const otherParts = parts.filter((part: string) =>
      !knownServices.some(service => part.toLowerCase().includes(service))
    );
    return otherParts.join(', ');
  });

  // Sync state when formData changes externally
  useEffect(() => {
    setBondingLocations(parseMainBondingLocations(formData.mainBondingLocations));
  }, [formData.mainBondingLocations]);

  const handleBondingLocationChange = (service: string, checked: boolean) => {
    haptics.tap();
    const updatedLocations = new Set(bondingLocations);

    if (checked) {
      updatedLocations.add(service);
    } else {
      updatedLocations.delete(service);
    }

    setBondingLocations(updatedLocations);
    updateMainBondingLocations(updatedLocations, otherBonding);
  };

  const handleOtherBondingChange = (value: string) => {
    setOtherBonding(value);
    updateMainBondingLocations(bondingLocations, value);
  };

  const updateMainBondingLocations = (locations: Set<string>, other: string) => {
    const serviceLabels: Record<string, string> = {
      'water': 'Water',
      'gas': 'Gas',
      'oil': 'Oil',
      'structural-steel': 'Structural Steel',
      'telecoms': 'Telecommunications'
    };

    const parts = Array.from(locations).map(s => serviceLabels[s] || s);
    if (other.trim()) {
      parts.push(other.trim());
    }

    onUpdate('mainBondingLocations', parts.join(', '));
  };

  // Section header component
  const SectionTitle = ({ icon: Icon, title, color = "green" }: { icon: React.ElementType; title: string; color?: string }) => (
    <div className={cn(
      "flex items-center gap-3 py-3",
      isMobile ? "-mx-4 px-4 bg-card/30 border-y border-border/20" : "pb-2 border-b border-border/30"
    )}>
      <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", `bg-${color}-500/20`)}>
        <Icon className={cn("h-4 w-4", `text-${color}-400`)} />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
    </div>
  );

  // Input field wrapper with proper mobile styling
  const FormField = ({
    label,
    required,
    hint,
    children
  }: {
    label: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm text-foreground/80">
        {label}
        {required && <span className="text-elec-yellow ml-1">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );

  // Conductor size options
  const conductorSizes = ['6', '10', '16', '25', '35', 'custom'];
  const supplementarySizes = ['2.5', '4', '6', '10', 'not-required', 'custom'];

  // Bonding services
  const bondingServices = [
    { id: 'water', label: 'Water' },
    { id: 'gas', label: 'Gas' },
    { id: 'oil', label: 'Oil' },
    { id: 'structural-steel', label: 'Structural Steel' },
    { id: 'telecoms', label: 'Telecoms' },
  ];

  return (
    <div className={cn("space-y-6", isMobile && "-mx-4")}>
      {/* Earth Electrode Section */}
      {showEarthElectrodeResistance && (
        <div>
          <SectionTitle icon={Zap} title="Earth Electrode" color="yellow" />
          <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
            <FormField
              label="Earth Electrode Resistance (Ω)"
              required
              hint="Measured in Ohms (Ω). Typical values: TT systems <200Ω"
            >
              <Input
                value={formData.earthElectrodeResistance || ''}
                onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
                placeholder="e.g., 21"
                type="number"
                step="0.01"
                min="0"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
          </div>
        </div>
      )}

      {/* Main Earthing Conductor Section */}
      <div>
        <SectionTitle icon={Cable} title="Main Earthing Conductor" color="green" />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Conductor Material" required>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'Cu', label: 'Copper (Cu)' },
                  { value: 'Al', label: 'Aluminium (Al)' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => { haptics.tap(); onUpdate('mainEarthingConductorType', option.value); }}
                    className={cn(
                      "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm",
                      formData.mainEarthingConductorType === option.value
                        ? "bg-elec-yellow text-black"
                        : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </FormField>
            <FormField label="Conductor Size" required>
              <Select
                value={formData.mainEarthingConductorSize || ''}
                onValueChange={(value) => { haptics.tap(); onUpdate('mainEarthingConductorSize', value); }}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {conductorSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size === 'custom' ? 'Other/Custom' : `${size}mm²`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {formData.mainEarthingConductorSize === 'custom' && (
            <FormField label="Custom Size">
              <Input
                value={formData.mainEarthingConductorSizeCustom || ''}
                onChange={(e) => onUpdate('mainEarthingConductorSizeCustom', e.target.value)}
                placeholder="e.g., 50mm²"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
          )}
        </div>
      </div>

      {/* Main Protective Bonding Section */}
      <div>
        <SectionTitle icon={Link2} title="Main Protective Bonding" color="blue" />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Conductor Material" required>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'Cu', label: 'Copper (Cu)' },
                  { value: 'Al', label: 'Aluminium (Al)' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => { haptics.tap(); onUpdate('mainBondingConductorType', option.value); }}
                    className={cn(
                      "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm",
                      formData.mainBondingConductorType === option.value
                        ? "bg-elec-yellow text-black"
                        : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </FormField>
            <FormField label="Conductor Size" required hint="Typical: 10mm² copper for domestic">
              <Select
                value={formData.mainBondingSize || ''}
                onValueChange={(value) => { haptics.tap(); onUpdate('mainBondingSize', value); }}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {conductorSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size === 'custom' ? 'Other/Custom' : `${size}mm²`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {showCustomMainBonding && (
            <FormField label="Custom Size">
              <Input
                value={formData.mainBondingSizeCustom || ''}
                onChange={(e) => onUpdate('mainBondingSizeCustom', e.target.value)}
                placeholder="e.g., 35mm²"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
          )}

          <FormField label="Bonding Compliance" required>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'satisfactory', label: 'Satisfactory' },
                { value: 'unsatisfactory', label: 'Unsatisfactory' },
                { value: 'not-applicable', label: 'N/A' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => { haptics.tap(); onUpdate('bondingCompliance', option.value); }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm",
                    formData.bondingCompliance === option.value
                      ? option.value === 'satisfactory' ? "bg-green-500 text-black"
                        : option.value === 'unsatisfactory' ? "bg-red-500 text-white"
                          : "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FormField>

          <FormField label="Bonding Locations" hint="Select all services with main protective bonding">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {bondingServices.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleBondingLocationChange(service.id, !bondingLocations.has(service.id))}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm flex items-center justify-center gap-2",
                    bondingLocations.has(service.id)
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {bondingLocations.has(service.id) && <span>✓</span>}
                  {service.label}
                </button>
              ))}
            </div>
          </FormField>

          <FormField label="Other Services">
            <Input
              value={otherBonding}
              onChange={(e) => handleOtherBondingChange(e.target.value)}
              placeholder="e.g., Lightning protection, Metal pipework"
              className="h-11 text-base touch-manipulation"
            />
          </FormField>
        </div>
      </div>

      {/* Supplementary Bonding Section */}
      <div>
        <SectionTitle icon={CircuitBoard} title="Supplementary Bonding" color="purple" />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="Supplementary Bonding Conductor Size" hint="Required in locations with increased risk (e.g., bathrooms)">
            <Select
              value={formData.supplementaryBondingSize || ''}
              onValueChange={(value) => { haptics.tap(); onUpdate('supplementaryBondingSize', value); }}
            >
              <SelectTrigger className="h-11 touch-manipulation">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {supplementarySizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size === 'custom' ? 'Other/Custom' :
                      size === 'not-required' ? 'Not Required' : `${size}mm²`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {showCustomSupplementaryBonding && (
            <FormField label="Custom Size">
              <Input
                value={formData.supplementaryBondingSizeCustom || ''}
                onChange={(e) => onUpdate('supplementaryBondingSizeCustom', e.target.value)}
                placeholder="e.g., 16mm²"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
          )}

          <FormField label="Equipotential Bonding Status">
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'present', label: 'Present & OK' },
                { value: 'present-unsatisfactory', label: 'Unsatisfactory' },
                { value: 'not-present', label: 'Not Present' },
                { value: 'not-required', label: 'Not Required' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => { haptics.tap(); onUpdate('equipotentialBonding', option.value); }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm",
                    formData.equipotentialBonding === option.value
                      ? option.value === 'present' ? "bg-green-500 text-black"
                        : option.value === 'present-unsatisfactory' || option.value === 'not-present' ? "bg-amber-500 text-black"
                          : "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FormField>

          <div className="p-3 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-elec-yellow mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-elec-yellow font-medium">BS 7671 Requirement</p>
                <p className="text-xs text-elec-yellow/70 mt-1">
                  Main bonding must be provided to incoming services. Supplementary bonding may be required in special locations where automatic disconnection times cannot be met.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthingBondingSection;
