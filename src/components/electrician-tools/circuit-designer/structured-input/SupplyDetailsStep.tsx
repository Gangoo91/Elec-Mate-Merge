import * as React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MobileInput } from "@/components/ui/mobile-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Zap, ChevronDown, Building2, Calendar, Wrench } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SupplyDetailsStepProps {
  voltage: number;
  setVoltage: (value: number) => void;
  phases: 'single' | 'three';
  setPhases: (value: 'single' | 'three') => void;
  ze: number;
  setZe: (value: number) => void;
  earthingSystem: 'TN-S' | 'TN-C-S' | 'TT';
  setEarthingSystem: (value: 'TN-S' | 'TN-C-S' | 'TT') => void;
  pscc: number | undefined;
  setPscc: (value: number | undefined) => void;
  ambientTemp: number;
  setAmbientTemp: (value: number) => void;
  installationMethod: string;
  setInstallationMethod: (value: string) => void;
  groupingFactor: number;
  setGroupingFactor: (value: number) => void;
  installationType: 'domestic' | 'commercial' | 'industrial';
  mainSwitchRating: number | undefined;
  setMainSwitchRating: (value: number | undefined) => void;
  propertyAge: 'new-build' | 'modern' | 'older' | 'very-old' | undefined;
  setPropertyAge: (value: 'new-build' | 'modern' | 'older' | 'very-old' | undefined) => void;
}

export const SupplyDetailsStep = ({
  voltage,
  setVoltage,
  phases,
  setPhases,
  ze,
  setZe,
  earthingSystem,
  setEarthingSystem,
  pscc,
  setPscc,
  ambientTemp,
  setAmbientTemp,
  installationMethod,
  setInstallationMethod,
  groupingFactor,
  setGroupingFactor,
  installationType,
  mainSwitchRating,
  setMainSwitchRating,
  propertyAge,
  setPropertyAge
}: SupplyDetailsStepProps) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  // Combined supply type (voltage + phases)
  const supplyType = phases === 'single' 
    ? (voltage === 110 ? '110-single' : '230-single')
    : '400-three';

  const handleSupplyTypeChange = (value: string) => {
    switch(value) {
      case '110-single':
        setVoltage(110);
        setPhases('single');
        break;
      case '230-single':
        setVoltage(230);
        setPhases('single');
        break;
      case '400-three':
        setVoltage(400);
        setPhases('three');
        break;
    }
  };

  // Auto-fill Ze based on earthing system
  React.useEffect(() => {
    if (earthingSystem === 'TN-S' || earthingSystem === 'TN-C-S') {
      if (ze === 0.35 || ze === 200) setZe(0.35);
    } else if (earthingSystem === 'TT') {
      if (ze === 0.35) setZe(200);
    }
  }, [earthingSystem]);
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Smart defaults info */}
      <Alert className="p-2.5 sm:p-3 bg-blue-500/10 border-blue-500/30">
        <Info className="h-3.5 w-3.5 text-blue-400" />
        <AlertDescription className="text-xs sm:text-sm text-blue-100">
          Smart defaults pre-filled. Adjust only if you have specific requirements.
        </AlertDescription>
      </Alert>

      <div className="space-y-4 sm:space-y-5">
        {/* Property Context Section */}
        <div className="space-y-3 pt-4 border-t border-border/30">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-xs uppercase tracking-wide font-medium text-muted-foreground">Property Context</h3>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="property-age" className="text-sm sm:text-base font-medium sm:font-semibold">
              <span className="sm:hidden">Age</span>
              <span className="hidden sm:inline">Property Age</span>
            </Label>
            <Select 
              value={propertyAge || ''} 
              onValueChange={(v) => setPropertyAge((v as 'new-build' | 'modern' | 'older' | 'very-old') || undefined)}
            >
              <SelectTrigger id="property-age" className="h-11 sm:h-12 bg-card border-elec-yellow/20 text-sm sm:text-base">
                <SelectValue placeholder="Select age (helps AI adjust diversity factors)..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-build">New Build (&lt; 5 years)</SelectItem>
                <SelectItem value="modern">Modern (5-20 years)</SelectItem>
                <SelectItem value="older">Older (20-40 years)</SelectItem>
                <SelectItem value="very-old">Very Old (40+ years)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Adjusts diversity factors and upgrade requirements</p>
          </div>
        </div>

        {/* Primary Supply Section */}
        <div className="space-y-3 pt-4 border-t border-border/30">
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-xs uppercase tracking-wide font-medium text-muted-foreground">Primary Supply</h3>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="supply-type" className="text-sm sm:text-base font-medium sm:font-semibold">Supply Type *</Label>
              <Select value={supplyType} onValueChange={handleSupplyTypeChange}>
                <SelectTrigger id="supply-type" className="h-11 sm:h-12 bg-card border-elec-yellow/20 text-sm sm:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="110-single">110V Single Phase (Site/Temporary)</SelectItem>
                  <SelectItem value="230-single">230V Single Phase (UK Standard)</SelectItem>
                  <SelectItem value="400-three">400V Three Phase (Commercial/Industrial)</SelectItem>
                </SelectContent>
              </Select>
              
              {supplyType === '110-single' && (
                <Alert className="p-2 bg-amber-500/10 border-amber-500/30">
                  <Info className="h-3.5 w-3.5 text-amber-400" />
                  <AlertDescription className="text-xs">
                    110V requires transformers. Ensure proper labelling and verify supply source.
                  </AlertDescription>
                </Alert>
              )}
              
              {supplyType === '400-three' && (
                <Alert className="p-2 bg-blue-500/10 border-blue-500/30">
                  <Info className="h-3.5 w-3.5 text-blue-400" />
                  <AlertDescription className="text-xs">
                    400V three-phase provides higher capacity. Phase balance is critical for compliance.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>

        {/* Consumer Unit Details */}
        <div className="space-y-3 pt-4 border-t border-border/30">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-xs uppercase tracking-wide font-medium text-muted-foreground">Consumer Unit Details</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="main-switch" className="text-sm sm:text-base font-medium sm:font-semibold">
                <span className="sm:hidden">Main Switch (A)</span>
                <span className="hidden sm:inline">Main Switch Rating</span>
              </Label>
              <Select value={mainSwitchRating?.toString() || ''} onValueChange={(v) => setMainSwitchRating(v ? Number(v) : undefined)}>
                <SelectTrigger id="main-switch" className="h-11 sm:h-12 bg-card border-elec-yellow/20 text-sm sm:text-base">
                  <SelectValue placeholder="Auto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60A</SelectItem>
                  <SelectItem value="80">80A</SelectItem>
                  <SelectItem value="100">100A (Standard)</SelectItem>
                  <SelectItem value="125">125A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ways" className="text-sm sm:text-base font-medium sm:font-semibold">
                <span className="sm:hidden">Ways</span>
                <span className="hidden sm:inline">Number of Ways</span>
              </Label>
              <Select defaultValue="auto">
                <SelectTrigger id="ways" className="h-11 sm:h-12 bg-card border-elec-yellow/20 text-sm sm:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto (Based on circuits)</SelectItem>
                  <SelectItem value="6">6 Way</SelectItem>
                  <SelectItem value="8">8 Way</SelectItem>
                  <SelectItem value="10">10 Way</SelectItem>
                  <SelectItem value="12">12 Way</SelectItem>
                  <SelectItem value="16">16 Way</SelectItem>
                  <SelectItem value="18">18 Way</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 sm:col-span-3 lg:col-span-1">
              <Label htmlFor="cu-type" className="text-sm sm:text-base font-medium sm:font-semibold">Type</Label>
              <Select defaultValue="split-load">
                <SelectTrigger id="cu-type" className="h-11 sm:h-12 bg-card border-elec-yellow/20 text-sm sm:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="split-load">Split Load (Standard)</SelectItem>
                  <SelectItem value="high-integrity">High Integrity</SelectItem>
                  <SelectItem value="main-switch">Main Switch Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">AI will auto-select if not specified</p>
        </div>

        {/* Earthing System */}
        <div className="space-y-3 pt-4 border-t border-border/30">
          <div className="flex items-center gap-1.5">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-xs uppercase tracking-wide font-medium text-muted-foreground">Earthing & Protection</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="earthing" className="text-sm sm:text-base font-medium sm:font-semibold">Earthing System *</Label>
              <Select value={earthingSystem} onValueChange={(v: any) => setEarthingSystem(v)}>
                <SelectTrigger id="earthing" className="h-11 sm:h-12 bg-card border-elec-yellow/20 text-sm sm:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TN-S">TN-S (PME)</SelectItem>
                  <SelectItem value="TN-C-S">TN-C-S (Most common)</SelectItem>
                  <SelectItem value="TT">TT (Rod earthing)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Check your consumer unit label</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ze" className="text-sm sm:text-base font-medium sm:font-semibold">
                <span className="sm:hidden">Ze (Ω) *</span>
                <span className="hidden sm:inline">External Earth Fault Loop Impedance (Ze) *</span>
              </Label>
              <MobileInput
                id="ze"
                type="number"
                step="0.01"
                value={ze}
                onChange={(e) => setZe(Number(e.target.value))}
                className="h-11 sm:h-12 bg-card border-elec-yellow/20 text-sm sm:text-base"
              />
              <div className="text-xs text-muted-foreground space-y-0.5">
                <div className="font-medium">Typical: TN-S/TN-C-S: 0.35Ω, TT: 200Ω</div>
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="pscc" className="text-sm sm:text-base font-medium sm:font-semibold">
                <span className="sm:hidden">PSCC (kA)</span>
                <span className="hidden sm:inline">Prospective Short Circuit Current (PSCC)</span>
              </Label>
              <MobileInput
                id="pscc"
                type="number"
                step="0.1"
                value={pscc || ''}
                onChange={(e) => setPscc(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Leave blank to auto-calculate"
                className="h-11 sm:h-12 bg-card border-elec-yellow/20 text-sm sm:text-base"
              />
              <p className="text-xs text-muted-foreground">AI will calculate based on Ze if not provided</p>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="pt-4 border-t border-border/30">
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between hover:bg-elec-yellow/10 -ml-3"
              >
                <span className="flex items-center gap-1.5 font-medium text-sm">
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-200 ${showAdvanced && "rotate-180"}`}
                  />
                  Advanced Settings
                </span>
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-3 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="install-method" className="text-sm sm:text-base font-medium sm:font-semibold">
                    <span className="sm:hidden">Install Method</span>
                    <span className="hidden sm:inline">Default Installation Method</span>
                  </Label>
                  <Select value={installationMethod} onValueChange={setInstallationMethod}>
                    <SelectTrigger id="install-method" className="h-11 sm:h-12 bg-card border-elec-yellow/20 text-sm sm:text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clipped-direct">Clipped Direct (Most common)</SelectItem>
                      <SelectItem value="in-conduit">In Conduit</SelectItem>
                      <SelectItem value="in-trunking">In Trunking</SelectItem>
                      <SelectItem value="buried-direct">Buried Direct</SelectItem>
                      <SelectItem value="in-insulation">In Thermal Insulation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="ambient-temp" className="text-sm sm:text-base font-medium sm:font-semibold">
                    <span className="sm:hidden">Temp (°C)</span>
                    <span className="hidden sm:inline">Ambient Temperature (°C)</span>
                  </Label>
                  <MobileInput
                    id="ambient-temp"
                    type="number"
                    value={ambientTemp}
                    onChange={(e) => setAmbientTemp(Number(e.target.value))}
                    className="h-11 sm:h-12 bg-card border-elec-yellow/20 text-sm sm:text-base"
                  />
                  <p className="text-xs text-muted-foreground">Standard: 25°C</p>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="grouping" className="text-sm sm:text-base font-medium sm:font-semibold">Cable Grouping Factor</Label>
                  <MobileInput
                    id="grouping"
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="1"
                    value={groupingFactor}
                    onChange={(e) => setGroupingFactor(Number(e.target.value))}
                    className="h-11 sm:h-12 bg-card border-elec-yellow/20 text-sm sm:text-base"
                  />
                  <p className="text-xs text-muted-foreground">1.0 = no grouping (default)</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};
