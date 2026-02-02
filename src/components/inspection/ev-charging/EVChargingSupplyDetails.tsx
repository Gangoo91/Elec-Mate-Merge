import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Zap, Cable, Shield, AlertTriangle, Globe, BookOpen, Sparkles, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEVChargingSmartForm } from '@/hooks/inspection/useEVChargingSmartForm';

interface EVChargingSupplyDetailsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EVChargingSupplyDetails: React.FC<EVChargingSupplyDetailsProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const { lookupMaxZs, checkDNORequirements } = useEVChargingSmartForm();

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    supply: true,
    pme: true,
    circuit: true,
    protection: true,
    dno: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Auto-lookup Max Zs when protection device details change
  const maxZsLookup = useMemo(() => {
    const deviceType = formData.protectionDeviceType;
    const rating = formData.protectionDeviceRating;
    const curve = formData.protectionDeviceCurve;

    if (!deviceType || !rating || !curve) return null;

    return lookupMaxZs(deviceType, rating, curve);
  }, [formData.protectionDeviceType, formData.protectionDeviceRating, formData.protectionDeviceCurve, lookupMaxZs]);

  // Auto-update maxZs in testResults when lookup changes
  useEffect(() => {
    if (maxZsLookup?.maxZs) {
      const currentResults = formData.testResults || {};
      if (currentResults.maxZs !== maxZsLookup.maxZs.toString()) {
        onUpdate('testResults', { ...currentResults, maxZs: maxZsLookup.maxZs.toString() });
      }
    }
  }, [maxZsLookup]);

  // Check DNO requirements based on power rating
  const dnoRequirement = useMemo(() => {
    const power = formData.powerRating || 7.4;
    const phases = formData.phases || 1;
    return checkDNORequirements(power, phases);
  }, [formData.powerRating, formData.phases, checkDNORequirements]);

  // Check if PME section should show warning
  const isPME = formData.earthingArrangement === 'TN-C-S' || formData.isPME;

  return (
    <div className={cn(isMobile ? "space-y-0" : "space-y-6")}>
      {/* Supply Characteristics */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.supply} onOpenChange={() => toggleSection('supply')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Supply Characteristics</h3>
                  <span className="text-xs text-muted-foreground">Voltage, phases, earthing</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.supply && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <span className="text-white font-semibold">Supply Characteristics</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.supply && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplyVoltage">Voltage (V)</Label>
                  <Input
                    id="supplyVoltage"
                    type="number"
                    value={formData.supplyVoltage || 230}
                    onChange={(e) => onUpdate('supplyVoltage', parseInt(e.target.value) || 230)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplyPhases">Phases</Label>
                  <Select
                    value={formData.supplyPhases || 'single'}
                    onValueChange={(value) => onUpdate('supplyPhases', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="single">Single Phase</SelectItem>
                      <SelectItem value="three">Three Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="earthingArrangement">Earthing *</Label>
                  <Select
                    value={formData.earthingArrangement || ''}
                    onValueChange={(value) => {
                      onUpdate('earthingArrangement', value);
                      // Auto-set isPME based on earthing selection
                      onUpdate('isPME', value === 'TN-C-S');
                    }}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                      <SelectItem value="TN-S">TN-S</SelectItem>
                      <SelectItem value="TT">TT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ze">Ze (Ω)</Label>
                  <Input
                    id="ze"
                    placeholder="e.g., 0.35"
                    value={formData.ze || ''}
                    onChange={(e) => onUpdate('ze', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prospectiveFaultCurrent">PSCC (kA)</Label>
                  <Input
                    id="prospectiveFaultCurrent"
                    placeholder="e.g., 2.5"
                    value={formData.prospectiveFaultCurrent || ''}
                    onChange={(e) => onUpdate('prospectiveFaultCurrent', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="externalLoopImpedance">Zs at Origin (Ω)</Label>
                  <Input
                    id="externalLoopImpedance"
                    placeholder="e.g., 0.35"
                    value={formData.externalLoopImpedance || ''}
                    onChange={(e) => onUpdate('externalLoopImpedance', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* PME Considerations */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.pme} onOpenChange={() => toggleSection('pme')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                  isPME ? "bg-amber-500/20" : "bg-gray-500/20"
                )}>
                  <AlertTriangle className={cn("h-5 w-5", isPME ? "text-amber-400" : "text-gray-400")} />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">PME Considerations</h3>
                  <span className="text-xs text-muted-foreground">
                    {isPME ? 'PME detected - review earthing' : 'Earthing measures'}
                  </span>
                </div>
                {isPME && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-amber-500/30 text-amber-400 shrink-0 mr-2">
                    PME
                  </Badge>
                )}
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.pme && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center",
                    isPME ? "bg-amber-500/15" : "bg-gray-500/15"
                  )}>
                    <AlertTriangle className={cn("h-4 w-4", isPME ? "text-amber-400" : "text-gray-400")} />
                  </div>
                  <span className="text-white font-semibold">PME Earthing Considerations</span>
                  {isPME && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-amber-500/30 text-amber-400">
                      PME Detected
                    </Badge>
                  )}
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.pme && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {isPME && (
                <Alert className="border-amber-500/30 bg-amber-500/10">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <AlertDescription className="text-amber-200 text-xs sm:text-sm">
                    <strong>IET Code of Practice:</strong> Special earthing arrangements may be required for EV chargers
                    connected to PME supplies. Ensure compliance with Section 722 and the IET CoP for EV charging.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                <Checkbox
                  id="isPME"
                  checked={formData.isPME || false}
                  onCheckedChange={(checked) => onUpdate('isPME', checked)}
                  className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <Label htmlFor="isPME" className="cursor-pointer text-base leading-relaxed">
                  Installation is connected to a PME (TN-C-S) supply
                </Label>
              </div>

              {formData.isPME && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="pmeEarthingMeasures">PME Earthing Measures Applied</Label>
                    <Select
                      value={formData.pmeEarthingMeasures || ''}
                      onValueChange={(value) => onUpdate('pmeEarthingMeasures', value)}
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                        <SelectValue placeholder="Select measures" />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-background border-border text-foreground">
                        <SelectItem value="integral-rcd">Integral RCD protection in charger</SelectItem>
                        <SelectItem value="earth-electrode">Additional earth electrode installed</SelectItem>
                        <SelectItem value="class-ii">Class II charger used</SelectItem>
                        <SelectItem value="separated-extra-low">Separated extra-low voltage</SelectItem>
                        <SelectItem value="protective-bonding">Additional protective bonding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                    <Checkbox
                      id="earthElectrodeInstalled"
                      checked={formData.earthElectrodeInstalled || false}
                      onCheckedChange={(checked) => onUpdate('earthElectrodeInstalled', checked)}
                      className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                    />
                    <Label htmlFor="earthElectrodeInstalled" className="cursor-pointer text-base leading-relaxed">
                      Additional earth electrode installed
                    </Label>
                  </div>

                  {formData.earthElectrodeInstalled && (
                    <div className="space-y-2">
                      <Label htmlFor="earthElectrodeResistance">Earth Electrode Resistance Ra (Ω)</Label>
                      <Input
                        id="earthElectrodeResistance"
                        placeholder="e.g., 150"
                        value={formData.earthElectrodeResistance || ''}
                        onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
                        className="h-11 text-base touch-manipulation w-full sm:w-48 border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Circuit Details */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.circuit} onOpenChange={() => toggleSection('circuit')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Cable className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Circuit Details</h3>
                  <span className="text-xs text-muted-foreground">Cable type & size</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.circuit && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <Cable className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold">Circuit Details</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.circuit && "rotate-180")} />
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
                  <Label htmlFor="circuitDesignation">Circuit Designation</Label>
                  <Input
                    id="circuitDesignation"
                    placeholder="e.g., EV Charger"
                    value={formData.circuitDesignation || ''}
                    onChange={(e) => onUpdate('circuitDesignation', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cableType">Cable Type *</Label>
                  <Select
                    value={formData.cableType || ''}
                    onValueChange={(value) => onUpdate('cableType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="6242Y">6242Y Twin & Earth</SelectItem>
                      <SelectItem value="6243Y">6243Y (3C + E)</SelectItem>
                      <SelectItem value="SWA">SWA Armoured Cable</SelectItem>
                      <SelectItem value="H07RN-F">H07RN-F Flex</SelectItem>
                      <SelectItem value="singles-conduit">Singles in Conduit</SelectItem>
                      <SelectItem value="singles-trunking">Singles in Trunking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cableSize">Size (mm²)</Label>
                  <Select
                    value={formData.cableSize?.toString() || '6'}
                    onValueChange={(value) => onUpdate('cableSize', parseFloat(value))}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="2.5">2.5mm²</SelectItem>
                      <SelectItem value="4">4mm²</SelectItem>
                      <SelectItem value="6">6mm²</SelectItem>
                      <SelectItem value="10">10mm²</SelectItem>
                      <SelectItem value="16">16mm²</SelectItem>
                      <SelectItem value="25">25mm²</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cableLength">Length (m)</Label>
                  <Input
                    id="cableLength"
                    type="number"
                    placeholder="metres"
                    value={formData.cableLength || ''}
                    onChange={(e) => onUpdate('cableLength', parseFloat(e.target.value) || 0)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="installationMethod">Installation Method</Label>
                  <Select
                    value={formData.installationMethod || ''}
                    onValueChange={(value) => onUpdate('installationMethod', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="clipped-direct">Clipped Direct</SelectItem>
                      <SelectItem value="trunking">In Trunking</SelectItem>
                      <SelectItem value="conduit">In Conduit</SelectItem>
                      <SelectItem value="buried">Buried Direct</SelectItem>
                      <SelectItem value="ducting">In Ducting Underground</SelectItem>
                      <SelectItem value="cable-tray">On Cable Tray</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Protection */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.protection} onOpenChange={() => toggleSection('protection')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Circuit Protection</h3>
                  <span className="text-xs text-muted-foreground">MCB/RCBO & RCD</span>
                </div>
                {maxZsLookup && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-elec-yellow/30 text-elec-yellow shrink-0 mr-2">
                    Max Zs: {maxZsLookup.maxZs}Ω
                  </Badge>
                )}
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.protection && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-white font-semibold">Circuit Protection</span>
                  {maxZsLookup && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-elec-yellow/30 text-elec-yellow">
                      Max Zs: {maxZsLookup.maxZs}Ω
                    </Badge>
                  )}
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.protection && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="protectionDeviceType">Type *</Label>
                  <Select
                    value={formData.protectionDeviceType || ''}
                    onValueChange={(value) => onUpdate('protectionDeviceType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="MCB">MCB</SelectItem>
                      <SelectItem value="RCBO">RCBO</SelectItem>
                      <SelectItem value="MCCB">MCCB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protectionDeviceRating">Rating (A)</Label>
                  <Select
                    value={formData.protectionDeviceRating?.toString() || '32'}
                    onValueChange={(value) => onUpdate('protectionDeviceRating', parseInt(value))}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="16">16A</SelectItem>
                      <SelectItem value="20">20A</SelectItem>
                      <SelectItem value="32">32A</SelectItem>
                      <SelectItem value="40">40A</SelectItem>
                      <SelectItem value="50">50A</SelectItem>
                      <SelectItem value="63">63A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protectionDeviceCurve">Curve</Label>
                  <Select
                    value={formData.protectionDeviceCurve || 'B'}
                    onValueChange={(value) => onUpdate('protectionDeviceCurve', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="B">Type B</SelectItem>
                      <SelectItem value="C">Type C</SelectItem>
                      <SelectItem value="D">Type D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Max Zs Auto-lookup Display */}
              {maxZsLookup && (
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-elec-yellow" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-elec-yellow">Max Zs: {maxZsLookup.maxZs}Ω</span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-blue-500/30 text-blue-400">
                          Auto-lookup
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {maxZsLookup.source}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <BookOpen className="h-3 w-3 text-muted-foreground" />
                        <p className="text-[10px] text-muted-foreground">
                          {maxZsLookup.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-black/40 rounded-xl p-4">
                <h4 className="font-medium mb-3 text-sm text-elec-yellow flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
                  RCD Protection
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rcdType">RCD Type</Label>
                    <Select
                      value={formData.rcdType || ''}
                      onValueChange={(value) => onUpdate('rcdType', value)}
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-background border-border text-foreground">
                        <SelectItem value="Type A">Type A</SelectItem>
                        <SelectItem value="Type B">Type B</SelectItem>
                        <SelectItem value="Type A + 6mA DC">Type A + 6mA DC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rcdRating">Rating (mA)</Label>
                    <Select
                      value={formData.rcdRating?.toString() || '30'}
                      onValueChange={(value) => onUpdate('rcdRating', parseInt(value))}
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-background border-border text-foreground">
                        <SelectItem value="30">30mA</SelectItem>
                        <SelectItem value="100">100mA</SelectItem>
                        <SelectItem value="300">300mA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-end">
                    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg w-full">
                      <Checkbox
                        id="rcdIntegral"
                        checked={formData.rcdIntegral || false}
                        onCheckedChange={(checked) => onUpdate('rcdIntegral', checked)}
                        className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                      />
                      <Label htmlFor="rcdIntegral" className="cursor-pointer text-sm">
                        Integral RCD
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* DNO Notification */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.dno} onOpenChange={() => toggleSection('dno')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                  dnoRequirement.required ? "bg-orange-500/20" : "bg-green-500/20"
                )}>
                  <Globe className={cn(
                    "h-5 w-5",
                    dnoRequirement.required ? "text-orange-400" : "text-green-400"
                  )} />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">DNO Notification</h3>
                  <span className="text-xs text-muted-foreground">
                    {dnoRequirement.required ? dnoRequirement.type : 'G98/G99 compliance'}
                  </span>
                </div>
                {dnoRequirement.required && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] px-1.5 py-0 shrink-0 mr-2",
                      dnoRequirement.type === 'G99'
                        ? "border-red-500/30 text-red-400"
                        : "border-orange-500/30 text-orange-400"
                    )}
                  >
                    {dnoRequirement.type}
                  </Badge>
                )}
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.dno && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center",
                    dnoRequirement.required ? "bg-orange-500/15" : "bg-green-500/15"
                  )}>
                    <Globe className={cn(
                      "h-4 w-4",
                      dnoRequirement.required ? "text-orange-400" : "text-green-400"
                    )} />
                  </div>
                  <span className="text-white font-semibold">DNO Notification</span>
                  {dnoRequirement.required && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] px-1.5 py-0",
                        dnoRequirement.type === 'G99'
                          ? "border-red-500/30 text-red-400"
                          : "border-orange-500/30 text-orange-400"
                      )}
                    >
                      {dnoRequirement.type} Required
                    </Badge>
                  )}
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.dno && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {/* Dynamic DNO Requirement Alert */}
              {dnoRequirement.type === 'G99' ? (
                <Alert className="border-red-500/30 bg-red-500/10">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-200 text-xs sm:text-sm">
                    <strong>{dnoRequirement.message}</strong>
                    <p className="mt-1">{dnoRequirement.details}</p>
                  </AlertDescription>
                </Alert>
              ) : dnoRequirement.type === 'G98' ? (
                <Alert className="border-orange-500/30 bg-orange-500/10">
                  <Info className="h-4 w-4 text-orange-400" />
                  <AlertDescription className="text-orange-200 text-xs sm:text-sm">
                    <strong>{dnoRequirement.message}</strong>
                    <p className="mt-1">{dnoRequirement.details}</p>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-green-500/30 bg-green-500/10">
                  <Info className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-200 text-xs sm:text-sm">
                    <strong>{dnoRequirement.message}</strong>
                    <p className="mt-1">{dnoRequirement.details}</p>
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                <Checkbox
                  id="dnoNotified"
                  checked={formData.dnoNotified || false}
                  onCheckedChange={(checked) => onUpdate('dnoNotified', checked)}
                  className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <Label htmlFor="dnoNotified" className="cursor-pointer text-base leading-relaxed">
                  DNO has been notified of this installation
                </Label>
              </div>

              {formData.dnoNotified && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dnoNotificationDate">Notification Date</Label>
                    <Input
                      id="dnoNotificationDate"
                      type="date"
                      value={formData.dnoNotificationDate || ''}
                      onChange={(e) => onUpdate('dnoNotificationDate', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dnoReference">Reference Number</Label>
                    <Input
                      id="dnoReference"
                      placeholder="DNO reference"
                      value={formData.dnoReference || ''}
                      onChange={(e) => onUpdate('dnoReference', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                  <Checkbox
                    id="g98Notification"
                    checked={formData.g98Notification || false}
                    onCheckedChange={(checked) => onUpdate('g98Notification', checked)}
                    className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <Label htmlFor="g98Notification" className="cursor-pointer text-sm leading-relaxed">
                    G98 Notification
                  </Label>
                </div>
                <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                  <Checkbox
                    id="g99Application"
                    checked={formData.g99Application || false}
                    onCheckedChange={(checked) => onUpdate('g99Application', checked)}
                    className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <Label htmlFor="g99Application" className="cursor-pointer text-sm leading-relaxed">
                    G99 Application
                  </Label>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default EVChargingSupplyDetails;
