import React, { useState, useMemo } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { CircuitBoard, Shield, Cable } from 'lucide-react';
import { cn } from '@/lib/utils';
import MWSmartDefaults from './MWSmartDefaults';
import {
  PROTECTIVE_DEVICE_TYPES,
  BS_EN_STANDARDS,
  DEVICE_RATINGS,
  BREAKING_CAPACITIES,
  CABLE_TYPES,
  INSTALLATION_METHODS,
  REFERENCE_METHODS,
  CONDUCTOR_SIZES,
  RCD_RATINGS,
  RCD_TYPES,
  CIRCUIT_TYPES,
  SmartDefault,
} from '@/constants/minorWorksOptions';
import {
  STANDARD_TO_DEVICE_TYPES,
  DEVICE_TYPE_RATINGS,
  DEVICE_TYPE_KA_RATINGS,
  getDeviceCategory,
} from '@/constants/deviceMappings';

interface MWCircuitTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const MWCircuitTab: React.FC<MWCircuitTabProps> = ({ formData, onUpdate }) => {
  const [openSections, setOpenSections] = useState({
    circuit: true,
    protection: true,
    cable: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getCompletionPercentage = (section: string) => {
    switch (section) {
      case 'circuit': {
        const fields = ['circuitDesignation'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'protection': {
        const fields = ['protectiveDeviceType', 'protectiveDeviceRating'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'cable': {
        const fields = ['liveConductorSize'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      default:
        return 0;
    }
  };

  // Handle smart defaults application
  const handleSmartDefaultApply = (values: SmartDefault['values']) => {
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        onUpdate(key, value);
      }
    });
  };

  // Auto-fill reference method based on installation method
  const handleInstallationMethodChange = (value: string) => {
    onUpdate('installationMethod', value);

    // Auto-suggest reference method based on installation method
    const methodMapping: { [key: string]: string } = {
      'clipped-direct': 'C',
      'surface-conduit': 'B',
      'concealed-conduit': 'A',
      'surface-trunking': 'B',
      'flush-trunking': 'B',
      'cable-tray': 'C',
      'cable-basket': 'E',
      'under-plaster': 'A',
      'thermally-insulated': '100',
      'accessible-floor': 'C',
      'ceiling-void': 'C',
      'buried-direct': 'D',
      'in-duct': 'D',
    };

    if (methodMapping[value] && !formData.referenceMethod) {
      onUpdate('referenceMethod', methodMapping[value]);
    }
  };

  // ============================================================================
  // Cascading Protective Device Selectors
  // ============================================================================

  // Get filtered device types based on selected BS EN standard
  const filteredDeviceTypes = useMemo(() => {
    if (!formData.overcurrentDeviceBsEn) return PROTECTIVE_DEVICE_TYPES;
    const allowedTypes = STANDARD_TO_DEVICE_TYPES[formData.overcurrentDeviceBsEn];
    if (!allowedTypes || allowedTypes.length === 0) return PROTECTIVE_DEVICE_TYPES;
    return PROTECTIVE_DEVICE_TYPES.filter(d => allowedTypes.includes(d.value));
  }, [formData.overcurrentDeviceBsEn]);

  // Get filtered ratings based on selected device type
  const filteredRatings = useMemo(() => {
    if (!formData.protectiveDeviceType) return DEVICE_RATINGS;
    const deviceKey = getDeviceCategory(formData.protectiveDeviceType);
    const allowedRatings = DEVICE_TYPE_RATINGS[deviceKey];
    if (!allowedRatings) return DEVICE_RATINGS;
    return DEVICE_RATINGS.filter(r => allowedRatings.includes(parseInt(r.value, 10)));
  }, [formData.protectiveDeviceType]);

  // Get filtered kA ratings based on selected device type
  const filteredKaRatings = useMemo(() => {
    if (!formData.protectiveDeviceType) return BREAKING_CAPACITIES;
    const deviceKey = getDeviceCategory(formData.protectiveDeviceType);
    const allowedKa = DEVICE_TYPE_KA_RATINGS[deviceKey];
    if (!allowedKa) return BREAKING_CAPACITIES;
    return BREAKING_CAPACITIES.filter(k => allowedKa.includes(parseFloat(k.value)));
  }, [formData.protectiveDeviceType]);

  // Get filtered CPC sizes based on live conductor (BS 7671 Table 54.7)
  // CPC size is typically related to live conductor size:
  // - S ≤ 16mm²: CPC can equal S
  // - 16 < S ≤ 35mm²: CPC minimum 16mm²
  // - S > 35mm²: CPC minimum S/2
  // We show all sizes up to and including live conductor size (plus minimum 16mm² floor)
  const filteredCpcSizes = useMemo(() => {
    if (!formData.liveConductorSize) return CONDUCTOR_SIZES;

    const liveSize = parseFloat(formData.liveConductorSize);

    // Allow CPC sizes up to the live conductor size
    // But always show at least up to 16mm² as minimum practical range
    const maxCpc = Math.max(liveSize, 16);

    return CONDUCTOR_SIZES.filter(o => parseFloat(o.value) <= maxCpc);
  }, [formData.liveConductorSize]);

  // Handle BS EN standard change with cascading reset
  const handleStandardChange = (value: string) => {
    onUpdate('overcurrentDeviceBsEn', value);

    // Check if current device type is still valid for the new standard
    const allowedTypes = STANDARD_TO_DEVICE_TYPES[value];
    if (allowedTypes && allowedTypes.length > 0 && formData.protectiveDeviceType) {
      if (!allowedTypes.includes(formData.protectiveDeviceType)) {
        // Reset device type and dependent fields
        onUpdate('protectiveDeviceType', '');
        onUpdate('protectiveDeviceRating', '');
        onUpdate('protectiveDeviceKaRating', '');
      }
    }
  };

  // Handle device type change with cascading reset
  const handleDeviceTypeChange = (value: string) => {
    onUpdate('protectiveDeviceType', value);

    const deviceKey = getDeviceCategory(value);

    // Check if current rating is still valid for the new device type
    const allowedRatings = DEVICE_TYPE_RATINGS[deviceKey];
    if (allowedRatings && formData.protectiveDeviceRating) {
      if (!allowedRatings.includes(parseInt(formData.protectiveDeviceRating, 10))) {
        onUpdate('protectiveDeviceRating', '');
      }
    }

    // Check if current kA rating is still valid for the new device type
    const allowedKa = DEVICE_TYPE_KA_RATINGS[deviceKey];
    if (allowedKa && formData.protectiveDeviceKaRating) {
      if (!allowedKa.includes(parseFloat(formData.protectiveDeviceKaRating))) {
        onUpdate('protectiveDeviceKaRating', '');
      }
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Smart Defaults Quick Fill */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
        <MWSmartDefaults onApply={handleSmartDefaultApply} />
      </div>

      {/* Circuit Details */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.circuit} onOpenChange={() => toggleSection('circuit')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Circuit Details"
              icon={CircuitBoard}
              isOpen={openSections.circuit}
              color="purple-500"
              completionPercentage={getCompletionPercentage('circuit')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Distribution Board</Label>
                  <Input
                    value={formData.distributionBoard || ''}
                    onChange={(e) => onUpdate('distributionBoard', e.target.value)}
                    placeholder="e.g., Main DB, Sub DB"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">DB Location & Type</Label>
                  <Input
                    value={formData.dbLocationType || ''}
                    onChange={(e) => onUpdate('dbLocationType', e.target.value)}
                    placeholder="e.g., Under stairs, Split-load CU"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Circuit Designation *</Label>
                  <Input
                    value={formData.circuitDesignation || ''}
                    onChange={(e) => onUpdate('circuitDesignation', e.target.value)}
                    placeholder="e.g., Circuit 1, MCB 5"
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500", !formData.circuitDesignation && "border-red-500/50")}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Circuit Description</Label>
                  <Input
                    value={formData.circuitDescription || ''}
                    onChange={(e) => onUpdate('circuitDescription', e.target.value)}
                    placeholder="e.g., Kitchen sockets, Lighting circuit"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Circuit Type</Label>
                <MobileSelectPicker
                  value={formData.circuitType || 'radial'}
                  onValueChange={(v) => onUpdate('circuitType', v)}
                  options={CIRCUIT_TYPES}
                  placeholder="Select type"
                  title="Circuit Type"
                  triggerClassName="bg-elec-gray border-white/30"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Protective Device */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.protection} onOpenChange={() => toggleSection('protection')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Protective Device"
              icon={Shield}
              isOpen={openSections.protection}
              color="red-500"
              completionPercentage={getCompletionPercentage('protection')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">BS (EN) Standard</Label>
                  <MobileSelectPicker
                    value={formData.overcurrentDeviceBsEn || ''}
                    onValueChange={handleStandardChange}
                    options={BS_EN_STANDARDS}
                    placeholder="Select"
                    title="BS (EN) Standard"
                    triggerClassName="bg-elec-gray border-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Device Type *</Label>
                  <MobileSelectPicker
                    value={formData.protectiveDeviceType || ''}
                    onValueChange={handleDeviceTypeChange}
                    options={filteredDeviceTypes}
                    placeholder="Select type"
                    title="Protective Device Type"
                    triggerClassName={cn(
                      "bg-elec-gray border-white/30",
                      !formData.protectiveDeviceType && "border-red-500/50"
                    )}
                  />
                  {formData.overcurrentDeviceBsEn && filteredDeviceTypes.length < PROTECTIVE_DEVICE_TYPES.length && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Filtered for {formData.overcurrentDeviceBsEn}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Rating (A) *</Label>
                  <MobileSelectPicker
                    value={formData.protectiveDeviceRating || ''}
                    onValueChange={(v) => onUpdate('protectiveDeviceRating', v)}
                    options={filteredRatings}
                    placeholder="Rating"
                    title="Device Rating"
                    triggerClassName={cn(
                      "bg-elec-gray border-white/30",
                      !formData.protectiveDeviceRating && "border-red-500/50"
                    )}
                  />
                  {formData.protectiveDeviceType && filteredRatings.length < DEVICE_RATINGS.length && (
                    <p className="text-xs text-muted-foreground mt-1">
                      BS 7671 ratings for {PROTECTIVE_DEVICE_TYPES.find(d => d.value === formData.protectiveDeviceType)?.label || formData.protectiveDeviceType}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Breaking Capacity (kA)</Label>
                  <MobileSelectPicker
                    value={formData.protectiveDeviceKaRating || ''}
                    onValueChange={(v) => onUpdate('protectiveDeviceKaRating', v)}
                    options={filteredKaRatings}
                    placeholder="kA rating"
                    title="Breaking Capacity"
                    triggerClassName="bg-elec-gray border-white/30"
                  />
                  {formData.protectiveDeviceType && filteredKaRatings.length < BREAKING_CAPACITIES.length && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Typical for {PROTECTIVE_DEVICE_TYPES.find(d => d.value === formData.protectiveDeviceType)?.label || formData.protectiveDeviceType}
                    </p>
                  )}
                </div>
              </div>

              {/* Protection Types */}
              <div className="space-y-3">
                <Label className="text-sm">Additional Protection</Label>
                <div className="flex flex-wrap gap-4">
                  {[
                    { id: 'protectionRcd', label: 'RCD' },
                    { id: 'protectionRcbo', label: 'RCBO' },
                    { id: 'protectionAfdd', label: 'AFDD' },
                    { id: 'protectionSpd', label: 'SPD' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center gap-2 p-3 min-h-[44px] rounded-lg bg-card/50">
                      <Checkbox
                        id={item.id}
                        checked={formData[item.id] || false}
                        onCheckedChange={(c) => onUpdate(item.id, c)}
                        className="h-5 w-5 border-white/40 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 touch-manipulation"
                      />
                      <Label htmlFor={item.id} className="text-sm cursor-pointer">{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* RCD Details - IET Required */}
              {(formData.protectionRcd || formData.protectionRcbo) && (
                <div className="p-4 bg-blue-50/30 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <Label className="text-sm font-medium">RCD Details (IET Required)</Label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">BS (EN) Standard</Label>
                      <MobileSelectPicker
                        value={formData.rcdBsEn || ''}
                        onValueChange={(v) => onUpdate('rcdBsEn', v)}
                        options={[
                          { value: 'BS EN 61008', label: 'BS EN 61008', description: 'RCDs without overcurrent protection' },
                          { value: 'BS EN 61009', label: 'BS EN 61009', description: 'RCBOs' },
                          { value: 'BS EN 62423', label: 'BS EN 62423', description: 'Type F and Type B RCDs' },
                        ]}
                        placeholder="Select"
                        title="RCD BS (EN) Standard"
                        triggerClassName="bg-elec-gray border-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Type</Label>
                      <MobileSelectPicker
                        value={formData.rcdType || ''}
                        onValueChange={(v) => onUpdate('rcdType', v)}
                        options={RCD_TYPES}
                        placeholder="Select"
                        title="RCD Type"
                        triggerClassName="bg-elec-gray border-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Rating (A)</Label>
                      <Input
                        type="number"
                        value={formData.rcdRatingAmps || ''}
                        onChange={(e) => onUpdate('rcdRatingAmps', e.target.value)}
                        placeholder="e.g., 63"
                        className="h-11 text-base touch-manipulation border-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">IΔn (mA)</Label>
                      <MobileSelectPicker
                        value={formData.rcdIdn || ''}
                        onValueChange={(v) => onUpdate('rcdIdn', v)}
                        options={RCD_RATINGS}
                        placeholder="Select"
                        title="RCD Rating (IΔn)"
                        triggerClassName="bg-elec-gray border-white/30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* AFDD Details - IET Required */}
              {formData.protectionAfdd && (
                <div className="p-4 bg-purple-50/30 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <Label className="text-sm font-medium">AFDD Details (IET Required)</Label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">BS (EN) Standard</Label>
                      <MobileSelectPicker
                        value={formData.afddBsEn || ''}
                        onValueChange={(v) => onUpdate('afddBsEn', v)}
                        options={[
                          { value: 'BS EN 62606', label: 'BS EN 62606', description: 'Arc Fault Detection Devices' },
                        ]}
                        placeholder="Select"
                        title="AFDD BS (EN) Standard"
                        triggerClassName="bg-elec-gray border-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Rating (A)</Label>
                      <Input
                        type="number"
                        value={formData.afddRating || ''}
                        onChange={(e) => onUpdate('afddRating', e.target.value)}
                        placeholder="e.g., 16"
                        className="h-11 text-base touch-manipulation border-white/30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SPD Details - IET Required */}
              {formData.protectionSpd && (
                <div className="p-4 bg-green-50/30 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <Label className="text-sm font-medium">SPD Details (IET Required)</Label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">BS (EN) Standard</Label>
                      <MobileSelectPicker
                        value={formData.spdBsEn || ''}
                        onValueChange={(v) => onUpdate('spdBsEn', v)}
                        options={[
                          { value: 'BS EN 61643-11', label: 'BS EN 61643-11', description: 'Surge Protective Devices' },
                        ]}
                        placeholder="Select"
                        title="SPD BS (EN) Standard"
                        triggerClassName="bg-elec-gray border-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Type</Label>
                      <MobileSelectPicker
                        value={formData.spdType || ''}
                        onValueChange={(v) => onUpdate('spdType', v)}
                        options={[
                          { value: '1', label: 'Type 1', description: 'Lightning current arrestor' },
                          { value: '2', label: 'Type 2', description: 'Overvoltage limiting device' },
                          { value: '3', label: 'Type 3', description: 'Equipment protection' },
                          { value: '1+2', label: 'Type 1+2', description: 'Combined Type 1 and 2' },
                          { value: '2+3', label: 'Type 2+3', description: 'Combined Type 2 and 3' },
                        ]}
                        placeholder="Select"
                        title="SPD Type"
                        triggerClassName="bg-elec-gray border-white/30"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Cable & Installation */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.cable} onOpenChange={() => toggleSection('cable')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Cable & Installation"
              icon={Cable}
              isOpen={openSections.cable}
              color="green-500"
              completionPercentage={getCompletionPercentage('cable')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Live Conductor Size *</Label>
                  <MobileSelectPicker
                    value={formData.liveConductorSize || ''}
                    onValueChange={(v) => onUpdate('liveConductorSize', v)}
                    options={CONDUCTOR_SIZES}
                    placeholder="Size"
                    title="Live Conductor Size"
                    triggerClassName={cn(
                      "bg-elec-gray border-white/30",
                      !formData.liveConductorSize && "border-red-500/50"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">CPC Size</Label>
                  <MobileSelectPicker
                    value={formData.cpcSize || ''}
                    onValueChange={(v) => onUpdate('cpcSize', v)}
                    options={filteredCpcSizes}
                    placeholder="Size"
                    title="CPC Size"
                    triggerClassName="bg-elec-gray border-white/30"
                  />
                  {formData.liveConductorSize && parseFloat(formData.liveConductorSize) > 16 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Sizes shown up to {formData.liveConductorSize}mm² (per BS 7671)
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Cable Type</Label>
                  <MobileSelectPicker
                    value={formData.cableType || ''}
                    onValueChange={(v) => onUpdate('cableType', v)}
                    options={CABLE_TYPES}
                    placeholder="Type"
                    title="Cable Type"
                    triggerClassName="bg-elec-gray border-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Installation Method</Label>
                  <MobileSelectPicker
                    value={formData.installationMethod || ''}
                    onValueChange={handleInstallationMethodChange}
                    options={INSTALLATION_METHODS}
                    placeholder="Method"
                    title="Installation Method"
                    triggerClassName="bg-elec-gray border-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Reference Method</Label>
                  <MobileSelectPicker
                    value={formData.referenceMethod || ''}
                    onValueChange={(v) => onUpdate('referenceMethod', v)}
                    options={REFERENCE_METHODS}
                    placeholder="e.g., A, B, C"
                    title="Reference Method (BS 7671 Table 4A2)"
                    triggerClassName="bg-elec-gray border-white/30"
                  />
                  {formData.referenceMethod && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {REFERENCE_METHODS.find(r => r.value === formData.referenceMethod)?.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default MWCircuitTab;
