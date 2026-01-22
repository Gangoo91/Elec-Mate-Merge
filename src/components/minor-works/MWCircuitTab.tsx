import React, { useState, useMemo } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CircuitBoard, Shield, Cable } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
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
  const isMobile = useIsMobile();
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
    <div className={cn("space-y-4 sm:space-y-6", isMobile && "-mx-4")}>
      {/* Smart Defaults Quick Fill */}
      <div className={cn(
        "p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-y border-purple-500/20",
        !isMobile && "rounded-xl border mx-0"
      )}>
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
                <Select value={formData.circuitType || 'radial'} onValueChange={(v) => onUpdate('circuitType', v)}>
                  <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {CIRCUIT_TYPES.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  <Select value={formData.overcurrentDeviceBsEn || ''} onValueChange={handleStandardChange}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {BS_EN_STANDARDS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Device Type *</Label>
                  <Select value={formData.protectiveDeviceType || ''} onValueChange={handleDeviceTypeChange}>
                    <SelectTrigger className={cn(
                      "h-12 bg-white/5 border-white/10 rounded-xl text-base",
                      !formData.protectiveDeviceType && "border-red-500/50"
                    )}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredDeviceTypes.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.overcurrentDeviceBsEn && filteredDeviceTypes.length < PROTECTIVE_DEVICE_TYPES.length && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Filtered for {formData.overcurrentDeviceBsEn}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Rating (A) *</Label>
                  <Select value={formData.protectiveDeviceRating || ''} onValueChange={(v) => onUpdate('protectiveDeviceRating', v)}>
                    <SelectTrigger className={cn(
                      "h-12 bg-white/5 border-white/10 rounded-xl text-base",
                      !formData.protectiveDeviceRating && "border-red-500/50"
                    )}>
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredRatings.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.protectiveDeviceType && filteredRatings.length < DEVICE_RATINGS.length && (
                    <p className="text-xs text-muted-foreground mt-1">
                      BS 7671 ratings for {PROTECTIVE_DEVICE_TYPES.find(d => d.value === formData.protectiveDeviceType)?.label || formData.protectiveDeviceType}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Breaking Capacity (kA)</Label>
                  <Select value={formData.protectiveDeviceKaRating || ''} onValueChange={(v) => onUpdate('protectiveDeviceKaRating', v)}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                      <SelectValue placeholder="kA rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredKaRatings.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

              {/* RCD Details */}
              {(formData.protectionRcd || formData.protectionRcbo) && (
                <div className="rounded-xl border border-white/10 bg-blue-500/5 border-l-2 border-l-blue-500 overflow-hidden">
                  <div className="px-4 py-2.5 bg-blue-500/10 border-b border-white/5">
                    <span className="text-sm font-medium text-blue-400">RCD Details</span>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">BS (EN) Standard</label>
                      <Select value={formData.rcdBsEn || ''} onValueChange={(v) => onUpdate('rcdBsEn', v)}>
                        <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                          <SelectValue placeholder="Select standard" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BS EN 61008">
                            <div className="flex flex-col">
                              <span>BS EN 61008</span>
                              <span className="text-xs text-white/50">RCDs without overcurrent protection</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="BS EN 61009">
                            <div className="flex flex-col">
                              <span>BS EN 61009</span>
                              <span className="text-xs text-white/50">RCBOs</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="BS EN 62423">
                            <div className="flex flex-col">
                              <span>BS EN 62423</span>
                              <span className="text-xs text-white/50">Type F and Type B RCDs</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Type</label>
                        <Select value={formData.rcdType || ''} onValueChange={(v) => onUpdate('rcdType', v)}>
                          <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {RCD_TYPES.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Rating (A)</label>
                        <Input
                          type="number"
                          value={formData.rcdRatingAmps || ''}
                          onChange={(e) => onUpdate('rcdRatingAmps', e.target.value)}
                          placeholder="63"
                          className="h-12 text-base touch-manipulation bg-white/5 border-white/10 rounded-xl focus:border-blue-500/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">IΔn (mA)</label>
                      <Select value={formData.rcdIdn || ''} onValueChange={(v) => onUpdate('rcdIdn', v)}>
                        <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          {RCD_RATINGS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* AFDD Details */}
              {formData.protectionAfdd && (
                <div className="rounded-xl border border-white/10 bg-purple-500/5 border-l-2 border-l-purple-500 overflow-hidden">
                  <div className="px-4 py-2.5 bg-purple-500/10 border-b border-white/5">
                    <span className="text-sm font-medium text-purple-400">AFDD Details</span>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">BS (EN) Standard</label>
                      <Select value={formData.afddBsEn || ''} onValueChange={(v) => onUpdate('afddBsEn', v)}>
                        <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                          <SelectValue placeholder="Select standard" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BS EN 62606">
                            <div className="flex flex-col">
                              <span>BS EN 62606</span>
                              <span className="text-xs text-white/50">Arc Fault Detection Devices</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Rating (A)</label>
                      <Input
                        type="number"
                        value={formData.afddRating || ''}
                        onChange={(e) => onUpdate('afddRating', e.target.value)}
                        placeholder="16"
                        className="h-12 text-base touch-manipulation bg-white/5 border-white/10 rounded-xl focus:border-purple-500/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SPD Details */}
              {formData.protectionSpd && (
                <div className="rounded-xl border border-white/10 bg-green-500/5 border-l-2 border-l-green-500 overflow-hidden">
                  <div className="px-4 py-2.5 bg-green-500/10 border-b border-white/5">
                    <span className="text-sm font-medium text-green-400">SPD Details</span>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">BS (EN) Standard</label>
                      <Select value={formData.spdBsEn || ''} onValueChange={(v) => onUpdate('spdBsEn', v)}>
                        <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                          <SelectValue placeholder="Select standard" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BS EN 61643-11">
                            <div className="flex flex-col">
                              <span>BS EN 61643-11</span>
                              <span className="text-xs text-white/50">Surge Protective Devices</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">Type</label>
                      <Select value={formData.spdType || ''} onValueChange={(v) => onUpdate('spdType', v)}>
                        <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">
                            <div className="flex flex-col">
                              <span>Type 1</span>
                              <span className="text-xs text-white/50">Lightning current arrestor</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="2">
                            <div className="flex flex-col">
                              <span>Type 2</span>
                              <span className="text-xs text-white/50">Overvoltage limiting device</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="3">
                            <div className="flex flex-col">
                              <span>Type 3</span>
                              <span className="text-xs text-white/50">Equipment protection</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="1+2">
                            <div className="flex flex-col">
                              <span>Type 1+2</span>
                              <span className="text-xs text-white/50">Combined Type 1 and 2</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="2+3">
                            <div className="flex flex-col">
                              <span>Type 2+3</span>
                              <span className="text-xs text-white/50">Combined Type 2 and 3</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
                  <Select value={formData.liveConductorSize || ''} onValueChange={(v) => onUpdate('liveConductorSize', v)}>
                    <SelectTrigger className={cn(
                      "h-12 bg-white/5 border-white/10 rounded-xl text-base",
                      !formData.liveConductorSize && "border-red-500/50"
                    )}>
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONDUCTOR_SIZES.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">CPC Size</Label>
                  <Select value={formData.cpcSize || ''} onValueChange={(v) => onUpdate('cpcSize', v)}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCpcSizes.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.liveConductorSize && parseFloat(formData.liveConductorSize) > 16 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Sizes shown up to {formData.liveConductorSize}mm² (per BS 7671)
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Cable Type</Label>
                  <Select value={formData.cableType || ''} onValueChange={(v) => onUpdate('cableType', v)}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {CABLE_TYPES.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Installation Method</Label>
                  <Select value={formData.installationMethod || ''} onValueChange={handleInstallationMethodChange}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
                      {INSTALLATION_METHODS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Reference Method</Label>
                  <Select value={formData.referenceMethod || ''} onValueChange={(v) => onUpdate('referenceMethod', v)}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                      <SelectValue placeholder="e.g., A, B, C" />
                    </SelectTrigger>
                    <SelectContent>
                      {REFERENCE_METHODS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <div className="flex flex-col">
                            <span>{opt.label}</span>
                            {opt.description && (
                              <span className="text-xs text-white/50">{opt.description}</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
