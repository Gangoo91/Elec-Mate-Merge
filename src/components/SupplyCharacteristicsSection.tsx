
import React, { useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Info, Zap, Building2, Plug, Shield, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';

// Fields managed by this section (for memoization comparison)
const SUPPLY_SECTION_FIELDS = [
  'dnoName',
  'mpan',
  'cutoutLocation',
  'serviceEntry',
  'phases',
  'supplyAcDc',
  'conductorConfiguration',
  'supplyVoltage',
  'supplyFrequency',
  'supplyPME',
  'externalZe',
  'prospectiveFaultCurrent',
  'supplyPolarityConfirmed',
  'otherSourcesOfSupply',
  'mainProtectiveDevice',
  'mainProtectiveDeviceCustom',
  'mainSwitchRating',
  'breakingCapacity',
  'mainSwitchPoles',
  'fuseDeviceRating',
  'mainSwitchVoltageRating',
  'earthingArrangement',
  'earthElectrodeType',
  'rcdMainSwitch',
  'rcdRating',
  'rcdTimeDelay',
  'rcdMeasuredTime',
] as const;

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
 *
 * Performance optimised with React.memo for selective re-rendering
 */
const SupplyCharacteristicsSectionInner = ({ formData, onUpdate }: SupplyCharacteristicsSectionProps) => {
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

  // Main protective device types (rating entered separately below)
  const mainProtectiveDeviceOptions = [
    // Fuses
    { value: 'BS 1361 Fuse', label: 'BS 1361 Cartridge Fuse', group: 'Fuses' },
    { value: 'BS 88 HRC Fuse', label: 'BS 88 HRC Fuse', group: 'Fuses' },
    { value: 'BS 3036 Rewireable Fuse', label: 'BS 3036 Rewireable Fuse', group: 'Fuses' },
    // MCBs
    { value: 'MCB Type B', label: 'MCB Type B', group: 'MCBs' },
    { value: 'MCB Type C', label: 'MCB Type C', group: 'MCBs' },
    { value: 'MCB Type D', label: 'MCB Type D', group: 'MCBs' },
    // Moulded Case
    { value: 'MCCB', label: 'MCCB', group: 'Moulded Case' },
    // Switches / Isolators
    { value: 'Switch Disconnector', label: 'Switch Disconnector', group: 'Switches' },
    { value: 'Isolator', label: 'Isolator', group: 'Switches' },
    // RCDs
    { value: 'RCD Main Switch', label: 'RCD Main Switch', group: 'RCDs' },
    { value: 'RCBO', label: 'RCBO', group: 'RCDs' },
  ];

  const knownDeviceValues = mainProtectiveDeviceOptions.map(d => d.value);

  // Smart rating options based on selected device type
  const deviceRatings: Record<string, string[]> = {
    'BS 1361 Fuse': ['45', '60', '80', '100'],
    'BS 88 HRC Fuse': ['16', '20', '25', '32', '40', '50', '63', '80', '100', '125', '160', '200'],
    'BS 3036 Rewireable Fuse': ['5', '15', '20', '30', '45', '60'],
    'MCB Type B': ['6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100'],
    'MCB Type C': ['6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100'],
    'MCB Type D': ['6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100'],
    'MCCB': ['16', '20', '25', '32', '40', '50', '63', '80', '100', '125', '160', '200', '250', '315', '400', '500', '630'],
    'Switch Disconnector': ['32', '40', '63', '80', '100', '125', '160', '200'],
    'Isolator': ['32', '40', '63', '80', '100', '125', '160'],
    'RCD Main Switch': ['25', '40', '63', '80', '100'],
    'RCBO': ['6', '10', '16', '20', '25', '32', '40', '50', '63'],
  };

  // Smart breaking capacity options based on selected device type
  const deviceBreakingCapacity: Record<string, string[]> = {
    'BS 1361 Fuse': ['16.5', '33'],
    'BS 88 HRC Fuse': ['80'],
    'BS 3036 Rewireable Fuse': ['1', '2', '4'],
    'MCB Type B': ['6', '10', '15', '25'],
    'MCB Type C': ['6', '10', '15', '25'],
    'MCB Type D': ['6', '10', '15', '25'],
    'MCCB': ['16', '25', '36', '50', '70'],
    'Switch Disconnector': [],
    'Isolator': [],
    'RCD Main Switch': [],
    'RCBO': ['6', '10'],
  };

  const currentRatings = deviceRatings[formData.mainProtectiveDevice] || [];
  const currentBreakingCapacities = deviceBreakingCapacity[formData.mainProtectiveDevice] || [];

  // Check if custom input should be shown
  const showCustomProtectiveDevice = formData.mainProtectiveDeviceCustom === 'true' ||
    (formData.mainProtectiveDevice && !knownDeviceValues.includes(formData.mainProtectiveDevice));

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

          <FormField label="Service Entry">
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'overhead', label: 'Overhead' },
                { value: 'underground', label: 'Underground' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptics.tap();
                    onUpdate('serviceEntry', formData.serviceEntry === option.value ? '' : option.value);
                  }}
                  className={cn(
                    "h-11 rounded-lg font-medium transition-all touch-manipulation",
                    formData.serviceEntry === option.value
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="AC / DC">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'ac', label: 'AC' },
                  { value: 'dc', label: 'DC' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      haptics.tap();
                      onUpdate('supplyAcDc', formData.supplyAcDc === option.value ? '' : option.value);
                    }}
                    className={cn(
                      "h-11 rounded-lg font-medium transition-all touch-manipulation",
                      (formData.supplyAcDc || 'ac') === option.value
                        ? "bg-elec-yellow text-black"
                        : "bg-card/50 text-foreground border border-border/30 hover:bg-card"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </FormField>
            <FormField label="Wire Count" hint="Conductor configuration">
              <Select
                value={formData.conductorConfiguration || ''}
                onValueChange={(value) => { haptics.tap(); onUpdate('conductorConfiguration', value === '__clear__' ? '' : value); }}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear</span></SelectItem>
                  <SelectItem value="2-wire">2-wire</SelectItem>
                  <SelectItem value="3-wire">3-wire</SelectItem>
                  <SelectItem value="4-wire">4-wire</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="External Ze (Ω)" hint="Earth fault loop impedance at origin">
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.externalZe || ''}
                onChange={(e) => onUpdate('externalZe', e.target.value)}
                placeholder="e.g., 0.35"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
            <FormField label="Ipf at Origin (kA)" hint="Prospective fault current at supply origin">
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.prospectiveFaultCurrent || ''}
                onChange={(e) => onUpdate('prospectiveFaultCurrent', e.target.value)}
                placeholder="e.g., 16"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
          </div>

          <button
            type="button"
            onClick={() => {
              haptics.tap();
              onUpdate('supplyPolarityConfirmed', formData.supplyPolarityConfirmed === 'true' ? 'false' : 'true');
            }}
            className={cn(
              "w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all touch-manipulation",
              formData.supplyPolarityConfirmed === 'true'
                ? "border-elec-yellow bg-elec-yellow/10"
                : "border-border/30 bg-card/30"
            )}
          >
            <Checkbox
              checked={formData.supplyPolarityConfirmed === 'true'}
              className="h-5 w-5 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
            />
            <span className="font-medium">Confirmation of supply polarity</span>
          </button>

          <FormField label="Other Sources of Supply" hint="e.g., Solar PV, generator, battery storage">
            <Textarea
              value={formData.otherSourcesOfSupply || ''}
              onChange={(e) => onUpdate('otherSourcesOfSupply', e.target.value)}
              placeholder="Details of any other sources of supply"
              className="min-h-[80px] text-base touch-manipulation resize-none"
            />
          </FormField>
        </div>
      </div>

      {/* Main Protective Device Section */}
      <div>
        <SectionTitle icon={Shield} title="Main Protective Device" color="orange" isMobile={isMobile} />
        <div className={cn("space-y-4 py-4", isMobile ? "px-4" : "")}>
          <FormField label="Main Protective Device" required hint="Select device type, enter rating below">
            <Select
              value={showCustomProtectiveDevice ? 'other' : (formData.mainProtectiveDevice || '')}
              onValueChange={handleMainProtectiveDeviceChange}
            >
              <SelectTrigger className="h-11 touch-manipulation">
                <SelectValue placeholder="Select protective device" />
              </SelectTrigger>
              <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] max-h-[60vh]">
                <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                {(() => {
                  let lastGroup = '';
                  return mainProtectiveDeviceOptions.map((option) => {
                    const showHeader = option.group !== lastGroup;
                    lastGroup = option.group;
                    return (
                      <React.Fragment key={option.value}>
                        {showHeader && (
                          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-t border-border/30 mt-1 first:mt-0 first:border-t-0">
                            {option.group}
                          </div>
                        )}
                        <SelectItem value={option.value}>{option.label}</SelectItem>
                      </React.Fragment>
                    );
                  });
                })()}
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-t border-border/30 mt-1">
                  Custom
                </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Main Switch Rating (A)">
              {currentRatings.length > 0 ? (
                <Select
                  value={formData.mainSwitchRating || ''}
                  onValueChange={(value) => { haptics.tap(); onUpdate('mainSwitchRating', value === '__clear__' ? '' : value); }}
                >
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                    <SelectItem value="__clear__"><span className="text-muted-foreground">Clear</span></SelectItem>
                    {currentRatings.map((r) => (
                      <SelectItem key={r} value={r}>{r}A</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={formData.mainSwitchRating || ''}
                  onChange={(e) => onUpdate('mainSwitchRating', e.target.value)}
                  placeholder="e.g., 100"
                  type="number"
                  min="0"
                  className="h-11 text-base touch-manipulation"
                />
              )}
            </FormField>
            <FormField label="Breaking Capacity (kA)">
              {currentBreakingCapacities.length > 0 ? (
                <Select
                  value={formData.breakingCapacity || ''}
                  onValueChange={(value) => { haptics.tap(); onUpdate('breakingCapacity', value === '__clear__' ? '' : value); }}
                >
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Select kA" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                    <SelectItem value="__clear__"><span className="text-muted-foreground">Clear</span></SelectItem>
                    {currentBreakingCapacities.map((kA) => (
                      <SelectItem key={kA} value={kA}>{kA} kA</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={formData.breakingCapacity || ''}
                  onChange={(e) => onUpdate('breakingCapacity', e.target.value)}
                  placeholder={currentBreakingCapacities.length === 0 && formData.mainProtectiveDevice ? 'N/A' : 'e.g., 6'}
                  type="number"
                  min="0"
                  step="0.1"
                  className="h-11 text-base touch-manipulation"
                />
              )}
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Main Switch Poles">
              <Select
                value={formData.mainSwitchPoles || ''}
                onValueChange={(value) => { haptics.tap(); onUpdate('mainSwitchPoles', value === '__clear__' ? '' : value); }}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear</span></SelectItem>
                  <SelectItem value="1">1-pole</SelectItem>
                  <SelectItem value="2">2-pole</SelectItem>
                  <SelectItem value="3">3-pole</SelectItem>
                  <SelectItem value="4">4-pole</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Fuse/Device Rating (A)">
              <Input
                type="number"
                min="0"
                value={formData.fuseDeviceRating || ''}
                onChange={(e) => onUpdate('fuseDeviceRating', e.target.value)}
                placeholder="e.g., 100"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
            <FormField label="Voltage Rating (V)">
              <Input
                type="number"
                min="0"
                value={formData.mainSwitchVoltageRating || ''}
                onChange={(e) => onUpdate('mainSwitchVoltageRating', e.target.value)}
                placeholder="e.g., 230"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
          </div>
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

          {showRCDFields && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="RCD Time Delay (ms)">
                <Select
                  value={formData.rcdTimeDelay || ''}
                  onValueChange={(value) => { haptics.tap(); onUpdate('rcdTimeDelay', value === '__clear__' ? '' : value); }}
                >
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Select delay" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__clear__"><span className="text-muted-foreground">Clear</span></SelectItem>
                    <SelectItem value="0">0ms (Instantaneous)</SelectItem>
                    <SelectItem value="40">40ms</SelectItem>
                    <SelectItem value="150">150ms</SelectItem>
                    <SelectItem value="200">200ms</SelectItem>
                    <SelectItem value="300">300ms</SelectItem>
                    <SelectItem value="500">500ms</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="RCD Measured Time (ms)" hint="Actual measured operating time">
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={formData.rcdMeasuredTime || ''}
                  onChange={(e) => onUpdate('rcdMeasuredTime', e.target.value)}
                  placeholder="e.g., 18"
                  className="h-11 text-base touch-manipulation"
                />
              </FormField>
            </div>
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

// Memoized component - only re-renders when SUPPLY_SECTION_FIELDS change
const SupplyCharacteristicsSection = React.memo(SupplyCharacteristicsSectionInner, (prevProps, nextProps) => {
  // Compare only the fields this section cares about
  for (const field of SUPPLY_SECTION_FIELDS) {
    if (prevProps.formData[field] !== nextProps.formData[field]) {
      return false; // Re-render needed
    }
  }
  return prevProps.onUpdate === nextProps.onUpdate;
});

SupplyCharacteristicsSection.displayName = 'SupplyCharacteristicsSection';

export default SupplyCharacteristicsSection;
