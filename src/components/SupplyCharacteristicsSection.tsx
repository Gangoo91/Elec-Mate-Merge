
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Info, Zap, Building2, Plug, Shield, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';

interface SupplyCharacteristicsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

// Section header - MUST be outside main component to prevent focus loss
const SectionTitle = ({ icon: Icon, title, color = "purple", isMobile }: { icon: React.ElementType; title: string; color?: string; isMobile: boolean }) => (
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

// Input field wrapper - MUST be outside main component to prevent focus loss
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

/**
 * SupplyCharacteristicsSection - Best-in-class mobile form for supply & earthing details
 * Edge-to-edge design with large touch targets and native app feel
 */
const SupplyCharacteristicsSection = ({ formData, onUpdate }: SupplyCharacteristicsSectionProps) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();

  // Auto-set common voltage based on phases
  const handlePhasesChange = (value: string) => {
    haptics.tap();
    // Toggle off if already selected
    if (formData.phases === value) {
      onUpdate('phases', '');
      return;
    }
    onUpdate('phases', value);

    // Auto-suggest common voltages
    if (value === '1' && !formData.supplyVoltage) {
      onUpdate('supplyVoltage', '230');
    } else if (value === '3' && !formData.supplyVoltage) {
      onUpdate('supplyVoltage', '400');
    }
  };

  // Auto-set PME based on earthing arrangement
  React.useEffect(() => {
    if (formData.earthingArrangement === 'TN-C-S' && formData.supplyPME !== 'yes') {
      onUpdate('supplyPME', 'yes');
    } else if (formData.earthingArrangement && formData.earthingArrangement !== 'TN-C-S' && formData.supplyPME === 'yes') {
      onUpdate('supplyPME', 'no');
    }

    // Auto-set earth electrode type to N/A for TN systems
    if ((formData.earthingArrangement === 'TN-S' || formData.earthingArrangement === 'TN-C-S') &&
      formData.earthElectrodeType !== 'n/a') {
      onUpdate('earthElectrodeType', 'n/a');
    }
  }, [formData.earthingArrangement]);

  // Auto-set earthing arrangement when PME is set to Yes
  const handleSupplyPMEChange = (value: string) => {
    haptics.tap();
    // Toggle off if already selected
    if (formData.supplyPME === value) {
      onUpdate('supplyPME', '');
      return;
    }
    onUpdate('supplyPME', value);
    if (value === 'yes' && formData.earthingArrangement !== 'TN-C-S') {
      onUpdate('earthingArrangement', 'TN-C-S');
    }
  };

  // Show RCD fields only when RCD main switch is yes
  const showRCDFields = formData.rcdMainSwitch === 'yes';

  // Handle main protective device selection
  const handleMainProtectiveDeviceChange = (value: string) => {
    haptics.tap();
    if (value === '__clear__') {
      onUpdate('mainProtectiveDevice', '');
      onUpdate('mainProtectiveDeviceCustom', 'false');
    } else if (value === 'other') {
      onUpdate('mainProtectiveDevice', '');
      onUpdate('mainProtectiveDeviceCustom', 'true');
    } else {
      onUpdate('mainProtectiveDevice', value);
      onUpdate('mainProtectiveDeviceCustom', 'false');
    }
  };

  // Check if custom input should be shown
  const showCustomProtectiveDevice = formData.mainProtectiveDeviceCustom === 'true' ||
    (formData.mainProtectiveDevice && !['100A BS 88 Fuse', '80A BS 88 Fuse', '63A BS 88 Fuse', '32A BS 1361 Fuse', '100A MCCB', '80A MCCB', '63A MCCB', '100A MCB Type B', '80A MCB Type B', '63A MCB Type B', '100A MCB Type C', '80A MCB Type C', '63A MCB Type C'].includes(formData.mainProtectiveDevice));

  // Get earthing arrangement info
  const getEarthingInfo = (arrangement: string) => {
    const info: { [key: string]: string } = {
      'TN-S': 'Separate neutral and protective conductors',
      'TN-C-S': 'Combined neutral and protective conductor (PME)',
      'TT': 'Installation earth electrode independent of supply',
      'IT': 'Isolated or impedance earthed supply'
    };
    return info[arrangement] || '';
  };

  // Common DNO options (including Northern Ireland)
  const dnoOptions = [
    'UK Power Networks',
    'Western Power Distribution',
    'Scottish Power Energy Networks',
    'Northern Powergrid',
    'Electricity North West',
    'SSE Networks (SSEN)',
    'National Grid Electricity Distribution',
    'NIE Networks (Northern Ireland)',
  ];

  // Earthing arrangement options
  const earthingOptions = [
    { value: 'TN-S', label: 'TN-S' },
    { value: 'TN-C-S', label: 'TN-C-S (PME)' },
    { value: 'TT', label: 'TT' },
    { value: 'IT', label: 'IT' },
  ];

  return (
    <div className={cn("space-y-6", isMobile && "-mx-4")}>
      {/* Supply Authority Section */}
      <div>
        <SectionTitle icon={Building2} title="Supply Authority" color="blue" isMobile={isMobile} />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="DNO (Distribution Network Operator)">
            <Select value={formData.dnoName || ''} onValueChange={(value) => { haptics.tap(); onUpdate('dnoName', value === '__clear__' ? '' : value); }}>
              <SelectTrigger className="h-11 touch-manipulation">
                <SelectValue placeholder="Select DNO" />
              </SelectTrigger>
              <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                {dnoOptions.map((dno) => (
                  <SelectItem key={dno} value={dno}>{dno}</SelectItem>
                ))}
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="MPAN" hint="Found on electricity bill (optional)">
              <Input
                value={formData.mpan || ''}
                onChange={(e) => onUpdate('mpan', e.target.value)}
                placeholder="e.g., 12 345 678 901 234"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
            <FormField label="Cutout Location">
              <Input
                value={formData.cutoutLocation || ''}
                onChange={(e) => onUpdate('cutoutLocation', e.target.value)}
                placeholder="e.g., Under stairs cupboard"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Supply Details Section */}
      <div>
        <SectionTitle icon={Plug} title="Supply Details" color="yellow" isMobile={isMobile} />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="Number of Phases" required>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: '1', label: 'Single Phase' },
                { value: '3', label: 'Three Phase' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handlePhasesChange(option.value)}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation",
                    formData.phases === option.value
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FormField>

          <FormField label="Supply Voltage" required>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: '230', label: '230V' },
                { value: '400', label: '400V' },
                { value: '230/400', label: '230/400V' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptics.tap();
                    // Toggle off if already selected
                    onUpdate('supplyVoltage', formData.supplyVoltage === option.value ? '' : option.value);
                  }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation",
                    formData.supplyVoltage === option.value
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {formData.phases && (
              <p className="text-xs text-elec-yellow/70 flex items-center gap-1 mt-2">
                <span className="w-1 h-1 rounded-full bg-elec-yellow"></span>
                {formData.phases === '1' ? 'Typically 230V for single phase' :
                  formData.phases === '3' ? 'Typically 400V for three phase' :
                    'Select nominal voltage'}
              </p>
            )}
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Frequency (Hz)">
              <Input
                value={formData.supplyFrequency || '50'}
                onChange={(e) => onUpdate('supplyFrequency', e.target.value)}
                placeholder="50"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
            <FormField label="Supply PME">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSupplyPMEChange(option.value)}
                    className={cn(
                      "h-11 rounded-lg font-medium transition-all touch-manipulation",
                      formData.supplyPME === option.value
                        ? "bg-elec-yellow text-black"
                        : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </FormField>
          </div>

          {formData.supplyPME === 'yes' && formData.earthingArrangement === 'TN-C-S' && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-green-400 shrink-0" />
                <p className="text-sm text-green-400">Correct - PME typically uses TN-C-S</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Protective Device Section */}
      <div>
        <SectionTitle icon={Shield} title="Main Protective Device" color="orange" isMobile={isMobile} />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="Main Protective Device" required hint="Common protective devices per BS 7671">
            <Select
              value={showCustomProtectiveDevice ? 'other' : (formData.mainProtectiveDevice || '')}
              onValueChange={handleMainProtectiveDeviceChange}
            >
              <SelectTrigger className="h-11 touch-manipulation">
                <SelectValue placeholder="Select protective device" />
              </SelectTrigger>
              <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                <SelectItem value="100A BS 88 Fuse">100A BS 88 Fuse</SelectItem>
                <SelectItem value="80A BS 88 Fuse">80A BS 88 Fuse</SelectItem>
                <SelectItem value="63A BS 88 Fuse">63A BS 88 Fuse</SelectItem>
                <SelectItem value="32A BS 1361 Fuse">32A BS 1361 Fuse</SelectItem>
                <SelectItem value="100A MCCB">100A MCCB</SelectItem>
                <SelectItem value="80A MCCB">80A MCCB</SelectItem>
                <SelectItem value="63A MCCB">63A MCCB</SelectItem>
                <SelectItem value="100A MCB Type B">100A MCB Type B</SelectItem>
                <SelectItem value="80A MCB Type B">80A MCB Type B</SelectItem>
                <SelectItem value="63A MCB Type B">63A MCB Type B</SelectItem>
                <SelectItem value="100A MCB Type C">100A MCB Type C</SelectItem>
                <SelectItem value="80A MCB Type C">80A MCB Type C</SelectItem>
                <SelectItem value="63A MCB Type C">63A MCB Type C</SelectItem>
                <SelectItem value="other">Other (specify)</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {showCustomProtectiveDevice && (
            <FormField label="Custom Device" hint="Include rating, type, and standard">
              <Input
                value={formData.mainProtectiveDevice || ''}
                onChange={(e) => onUpdate('mainProtectiveDevice', e.target.value)}
                placeholder="e.g. 125A BS 88 Fuse"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
          )}
        </div>
      </div>

      {/* Earthing System Section */}
      <div>
        <SectionTitle icon={Globe} title="Earthing System" color="green" isMobile={isMobile} />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="Earthing Arrangement" required>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {earthingOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptics.tap();
                    // Toggle off if already selected
                    onUpdate('earthingArrangement', formData.earthingArrangement === option.value ? '' : option.value);
                  }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm",
                    formData.earthingArrangement === option.value
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {formData.earthingArrangement && (
              <p className="text-xs text-muted-foreground mt-2">
                {getEarthingInfo(formData.earthingArrangement)}
              </p>
            )}
          </FormField>

          <FormField label="Earth Electrode Type">
            <Select value={formData.earthElectrodeType || ''} onValueChange={(value) => { haptics.tap(); onUpdate('earthElectrodeType', value === '__clear__' ? '' : value); }}>
              <SelectTrigger className="h-11 touch-manipulation">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                <SelectItem value="rod">Rod</SelectItem>
                <SelectItem value="tape">Tape</SelectItem>
                <SelectItem value="plate">Plate</SelectItem>
                <SelectItem value="structural">Structural Steel</SelectItem>
                <SelectItem value="water-pipe">Water Pipe</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="n/a">N/A (TN-S/TN-C-S)</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </div>

      {/* RCD Protection Section */}
      <div>
        <SectionTitle icon={Shield} title="RCD Protection" color="purple" isMobile={isMobile} />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="RCD Main Switch">
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptics.tap();
                    // Toggle off if already selected
                    const newValue = formData.rcdMainSwitch === option.value ? '' : option.value;
                    onUpdate('rcdMainSwitch', newValue);
                    // Clear RCD rating if turning off
                    if (newValue !== 'yes') onUpdate('rcdRating', '');
                  }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation",
                    formData.rcdMainSwitch === option.value
                      ? "bg-elec-yellow text-black"
                      : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FormField>

          {showRCDFields && (
            <FormField label="RCD Rating" required hint="30mA typical for domestic">
              <div className="grid grid-cols-4 gap-2">
                {['30mA', '100mA', '300mA', '500mA'].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => {
                      haptics.tap();
                      // Toggle off if already selected
                      onUpdate('rcdRating', formData.rcdRating === rating ? '' : rating);
                    }}
                    className={cn(
                      "h-11 rounded-lg font-medium transition-all touch-manipulation text-sm",
                      formData.rcdRating === rating
                        ? "bg-elec-yellow text-black"
                        : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                    )}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </FormField>
          )}

          {formData.rcdMainSwitch === 'no' && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-amber-400 font-medium">No RCD Main Switch</p>
                  <p className="text-xs text-amber-400/70 mt-1">
                    Consider if additional RCD protection is provided at circuit level for BS 7671 compliance
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplyCharacteristicsSection;
