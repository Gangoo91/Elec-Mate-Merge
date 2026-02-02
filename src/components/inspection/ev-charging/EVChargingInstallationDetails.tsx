import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, User, Car, Zap, Building2, Sparkles, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import ChargerAutocomplete from './ChargerAutocomplete';
import { EVCharger, calculateCurrentFromPower, calculatePowerFromCurrent } from '@/data/evChargerDatabase';
import { useEVChargingSmartForm } from '@/hooks/inspection/useEVChargingSmartForm';

interface EVChargingInstallationDetailsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EVChargingInstallationDetails: React.FC<EVChargingInstallationDetailsProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const { applyChargerDefaults, powerToCurrent, currentToPower } = useEVChargingSmartForm();

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    client: true,
    vehicle: false,
    installation: true,
    charger: true,
  });

  // Track if power/current was auto-filled from charger selection
  const [chargerAutoFilled, setChargerAutoFilled] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle charger selection from autocomplete
  const handleChargerSelect = useCallback((charger: EVCharger | null) => {
    if (charger) {
      const defaults = applyChargerDefaults(charger);
      // Apply all charger defaults
      Object.entries(defaults).forEach(([field, value]) => {
        onUpdate(field, value);
      });
      setChargerAutoFilled(true);
    } else {
      // Clear charger fields when deselected
      onUpdate('chargerMake', '');
      onUpdate('chargerModel', '');
      setChargerAutoFilled(false);
    }
  }, [applyChargerDefaults, onUpdate]);

  // Handle "Same as client address" checkbox
  const handleSameAddressChange = (checked: boolean) => {
    onUpdate('sameAsClientAddress', checked);
    if (checked && formData.clientAddress) {
      onUpdate('installationAddress', formData.clientAddress);
    }
  };

  // Sync installation address when client address changes and checkbox is checked
  useEffect(() => {
    if (formData.sameAsClientAddress && formData.clientAddress) {
      onUpdate('installationAddress', formData.clientAddress);
    }
  }, [formData.clientAddress, formData.sameAsClientAddress]);

  // Handle power change - auto-calculate current
  const handlePowerChange = (power: number) => {
    onUpdate('powerRating', power);
    const phases = formData.phases || 1;
    const calculatedCurrent = powerToCurrent(power, phases);
    onUpdate('ratedCurrent', calculatedCurrent);
  };

  // Handle current change - auto-calculate power
  const handleCurrentChange = (current: number) => {
    onUpdate('ratedCurrent', current);
    const phases = formData.phases || 1;
    const calculatedPower = currentToPower(current, phases);
    onUpdate('powerRating', calculatedPower);
  };

  // Handle phase change - recalculate current from power
  const handlePhasesChange = (phases: number) => {
    onUpdate('phases', phases);
    if (formData.powerRating) {
      const calculatedCurrent = powerToCurrent(formData.powerRating, phases);
      onUpdate('ratedCurrent', calculatedCurrent);
    }
  };

  return (
    <div className={cn(isMobile ? "space-y-0" : "space-y-6")}>
      {/* Client Details */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.client} onOpenChange={() => toggleSection('client')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Client Details</h3>
                  <span className="text-xs text-muted-foreground">Name, contact & address</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.client && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold">Client Details</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.client && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    placeholder="Enter client name"
                    value={formData.clientName || ''}
                    onChange={(e) => onUpdate('clientName', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientTelephone">Telephone</Label>
                  <Input
                    id="clientTelephone"
                    type="tel"
                    placeholder="Contact number"
                    value={formData.clientTelephone || ''}
                    onChange={(e) => onUpdate('clientTelephone', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientAddress">Client Address</Label>
                <Textarea
                  id="clientAddress"
                  placeholder="Full address"
                  value={formData.clientAddress || ''}
                  onChange={(e) => onUpdate('clientAddress', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="Email address"
                  value={formData.clientEmail || ''}
                  onChange={(e) => onUpdate('clientEmail', e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Vehicle Details (Optional) */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.vehicle} onOpenChange={() => toggleSection('vehicle')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <Car className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Vehicle Details</h3>
                  <span className="text-xs text-muted-foreground">Optional - make, model, reg</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.vehicle && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <Car className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">Vehicle Details (Optional)</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.vehicle && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleMake">Vehicle Make</Label>
                  <Input
                    id="vehicleMake"
                    placeholder="e.g., Tesla, BMW"
                    value={formData.vehicleMake || ''}
                    onChange={(e) => onUpdate('vehicleMake', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleModel">Vehicle Model</Label>
                  <Input
                    id="vehicleModel"
                    placeholder="e.g., Model 3, iX3"
                    value={formData.vehicleModel || ''}
                    onChange={(e) => onUpdate('vehicleModel', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleRegistration">Registration</Label>
                  <Input
                    id="vehicleRegistration"
                    placeholder="e.g., AB12 CDE"
                    value={formData.vehicleRegistration || ''}
                    onChange={(e) => onUpdate('vehicleRegistration', e.target.value)}
                    className="h-11 text-base touch-manipulation uppercase border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Installation Details */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.installation} onOpenChange={() => toggleSection('installation')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Building2 className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Installation Details</h3>
                  <span className="text-xs text-muted-foreground">Address & type</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.installation && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">Installation Details</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.installation && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {/* Same as client address checkbox */}
              <div className="flex items-center gap-3 p-3 bg-black/40 rounded-lg">
                <Checkbox
                  id="sameAsClientAddress"
                  checked={formData.sameAsClientAddress || false}
                  onCheckedChange={handleSameAddressChange}
                  className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <Label htmlFor="sameAsClientAddress" className="cursor-pointer text-sm">
                  Same as client address
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="installationAddress">Installation Address *</Label>
                <Textarea
                  id="installationAddress"
                  placeholder="Full address where charger is installed"
                  value={formData.installationAddress || ''}
                  onChange={(e) => onUpdate('installationAddress', e.target.value)}
                  disabled={formData.sameAsClientAddress}
                  className={cn(
                    "text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                    formData.sameAsClientAddress && "bg-muted/50 cursor-not-allowed"
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="installationType">Installation Type</Label>
                  <Select
                    value={formData.installationType || 'domestic'}
                    onValueChange={(value) => onUpdate('installationType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="domestic">Domestic</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="installationDate">Installation Date *</Label>
                  <Input
                    id="installationDate"
                    type="date"
                    value={formData.installationDate || ''}
                    onChange={(e) => onUpdate('installationDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Charger Details */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.charger} onOpenChange={() => toggleSection('charger')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Charger Details</h3>
                  <span className="text-xs text-muted-foreground">Make, model & specs</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.charger && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <span className="text-white font-semibold">Charger Details</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.charger && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {/* Charger Autocomplete - Smart Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Charger Make & Model *</Label>
                  <div className="flex items-center gap-1 text-[10px] text-elec-yellow">
                    <Sparkles className="h-3 w-3" />
                    <span>Auto-fills specs</span>
                  </div>
                </div>
                <ChargerAutocomplete
                  value={{ make: formData.chargerMake || '', model: formData.chargerModel || '' }}
                  onChange={handleChargerSelect}
                />
                {chargerAutoFilled && (
                  <p className="text-[10px] text-green-400 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Charger specifications auto-filled from database
                  </p>
                )}
              </div>

              {/* Manual entry fallback for make/model */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chargerMake">Make</Label>
                  <Input
                    id="chargerMake"
                    placeholder="e.g., Myenergi"
                    value={formData.chargerMake || ''}
                    onChange={(e) => {
                      onUpdate('chargerMake', e.target.value);
                      setChargerAutoFilled(false);
                    }}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chargerModel">Model</Label>
                  <Input
                    id="chargerModel"
                    placeholder="e.g., Zappi V2.1"
                    value={formData.chargerModel || ''}
                    onChange={(e) => {
                      onUpdate('chargerModel', e.target.value);
                      setChargerAutoFilled(false);
                    }}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chargerSerial">Serial Number</Label>
                  <Input
                    id="chargerSerial"
                    placeholder="Serial number"
                    value={formData.chargerSerial || ''}
                    onChange={(e) => onUpdate('chargerSerial', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chargerType">Charging Mode</Label>
                  <Select
                    value={formData.chargerType || ''}
                    onValueChange={(value) => onUpdate('chargerType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="Mode2">Mode 2 (Slow)</SelectItem>
                      <SelectItem value="Mode3">Mode 3 (Fast)</SelectItem>
                      <SelectItem value="Mode4">Mode 4 (Rapid DC)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chargerConnection">Connection</Label>
                  <Select
                    value={formData.chargerConnection || ''}
                    onValueChange={(value) => onUpdate('chargerConnection', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="tethered">Tethered</SelectItem>
                      <SelectItem value="socketed">Socketed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phases">Phases</Label>
                  <Select
                    value={formData.phases?.toString() || '1'}
                    onValueChange={(value) => handlePhasesChange(parseInt(value))}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="1">Single Phase</SelectItem>
                      <SelectItem value="3">Three Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socketType">Socket Type</Label>
                  <Select
                    value={formData.socketType || 'Type 2'}
                    onValueChange={(value) => onUpdate('socketType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="Type 1">Type 1 (J1772)</SelectItem>
                      <SelectItem value="Type 2">Type 2 (Mennekes)</SelectItem>
                      <SelectItem value="CCS">CCS (Combo)</SelectItem>
                      <SelectItem value="CHAdeMO">CHAdeMO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Power and Current with bidirectional sync */}
              <div className="bg-black/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowRightLeft className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm font-medium text-elec-yellow">Power & Current</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-elec-yellow/30 text-elec-yellow">
                    Auto-synced
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="powerRating">Power (kW)</Label>
                    <Input
                      id="powerRating"
                      type="number"
                      step="0.1"
                      value={formData.powerRating || 7.4}
                      onChange={(e) => handlePowerChange(parseFloat(e.target.value) || 7.4)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                    <p className="text-[10px] text-muted-foreground">
                      {formData.phases === 3 ? 'P = √3 × 400V × I' : 'P = 230V × I'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ratedCurrent">Current (A)</Label>
                    <Input
                      id="ratedCurrent"
                      type="number"
                      value={formData.ratedCurrent || 32}
                      onChange={(e) => handleCurrentChange(parseInt(e.target.value) || 32)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                    <p className="text-[10px] text-muted-foreground">
                      {formData.phases === 3 ? 'I = P / (√3 × 400V)' : 'I = P / 230V'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default EVChargingInstallationDetails;
