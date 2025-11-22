import * as React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MobileInput } from "@/components/ui/mobile-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Zap, ChevronDown, ChevronUp, Building2, Calendar } from "lucide-react";
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
    <div className="space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Supply Details</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Configure the electrical supply characteristics</p>
      </div>

      <Alert className="bg-blue-500/10 border-blue-500/30">
        <Info className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-xs sm:text-sm">
          Smart defaults are pre-filled based on your installation type. Adjust only if you have specific requirements.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {/* Property Context */}
        <Card className="p-5 border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Property Context</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="property-age" className="text-base font-semibold">Property Age</Label>
            <Select 
              value={propertyAge || ''} 
              onValueChange={(v) => setPropertyAge((v as 'new-build' | 'modern' | 'older' | 'very-old') || undefined)}
            >
              <SelectTrigger id="property-age" className="text-base">
                <SelectValue placeholder="Select property age..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-build">New Build (&lt; 5 years)</SelectItem>
                <SelectItem value="modern">Modern (5-20 years)</SelectItem>
                <SelectItem value="older">Older (20-40 years)</SelectItem>
                <SelectItem value="very-old">Very Old (40+ years)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Helps AI adjust diversity factors and flag upgrade requirements</p>
          </div>
        </Card>

        {/* Primary Supply Settings */}
        <Card className="p-5 border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Primary Supply</h3>
          </div>
          
          <div className="space-y-4">
            {/* Combined Supply Type */}
            <div className="space-y-2">
              <Label htmlFor="supply-type" className="text-base font-semibold">Supply Type *</Label>
              <Select value={supplyType} onValueChange={handleSupplyTypeChange}>
                <SelectTrigger id="supply-type" className="text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="110-single">110V Single Phase (Site/Temporary)</SelectItem>
                  <SelectItem value="230-single">230V Single Phase (UK Standard)</SelectItem>
                  <SelectItem value="400-three">400V Three Phase (Commercial/Industrial)</SelectItem>
                </SelectContent>
              </Select>
              
              {supplyType === '110-single' && (
                <Alert className="mt-2 bg-amber-500/10 border-amber-500/30">
                  <Info className="h-4 w-4 text-amber-400" />
                  <AlertDescription className="text-xs">
                    110V requires transformers. Ensure proper labelling and verify supply source.
                  </AlertDescription>
                </Alert>
              )}
              
              {supplyType === '400-three' && (
                <Alert className="mt-2 bg-blue-500/10 border-blue-500/30">
                  <Info className="h-4 w-4 text-blue-400" />
                  <AlertDescription className="text-xs">
                    400V three-phase provides higher capacity. Phase balance is critical for compliance.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </Card>

        {/* Consumer Unit Details */}
        <Card className="p-5 border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Consumer Unit Details</h3>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Main Switch Rating */}
            <div className="space-y-2">
              <Label htmlFor="main-switch" className="text-base font-semibold">Main Switch Rating</Label>
              <Select value={mainSwitchRating?.toString() || ''} onValueChange={(v) => setMainSwitchRating(v ? Number(v) : undefined)}>
                <SelectTrigger id="main-switch" className="text-base">
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

            {/* Number of Ways */}
            <div className="space-y-2">
              <Label htmlFor="ways" className="text-base font-semibold">Number of Ways</Label>
              <Select defaultValue="auto">
                <SelectTrigger id="ways" className="text-base">
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

            {/* CU Type */}
            <div className="space-y-2">
              <Label htmlFor="cu-type" className="text-base font-semibold">Type</Label>
              <Select defaultValue="split-load">
                <SelectTrigger id="cu-type" className="text-base">
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
          <p className="text-xs text-muted-foreground mt-3">AI will auto-select if not specified</p>
        </Card>

        {/* Earthing System */}
        <Card className="p-5">
          <h3 className="font-semibold text-lg mb-4">Earthing & Protection</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Earthing System */}
            <div className="space-y-2">
              <Label htmlFor="earthing" className="text-base font-semibold">Earthing System *</Label>
              <Select value={earthingSystem} onValueChange={(v: any) => setEarthingSystem(v)}>
                <SelectTrigger id="earthing" className="text-base">
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

            {/* Ze */}
            <div className="space-y-2">
              <Label htmlFor="ze" className="text-base font-semibold">External Earth Fault Loop Impedance (Ze) *</Label>
              <MobileInput
                id="ze"
                type="number"
                step="0.01"
                value={ze}
                onChange={(e) => setZe(Number(e.target.value))}
                className="text-base"
              />
              <div className="text-[11px] sm:text-xs text-muted-foreground space-y-0.5">
                <div className="font-medium mb-1">Typical values:</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-elec-yellow">TN-S</div>
                    <div>0.35Ω</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-semibold text-elec-yellow">TN-C-S</div>
                    <div>0.35Ω</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-semibold text-elec-yellow">TT</div>
                    <div>200Ω</div>
                  </div>
                </div>
              </div>
            </div>

            {/* PSCC */}
            <div className="space-y-3">
              <Label htmlFor="pscc" className="text-base font-semibold">
                Prospective Short Circuit Current (PSCC)
              </Label>
              <MobileInput
                id="pscc"
                type="number"
                step="0.1"
                value={pscc || ''}
                onChange={(e) => setPscc(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Leave blank to auto-calculate"
                hint="AI will calculate based on Ze if not provided"
                className="text-base"
              />
              <Alert className="bg-muted/50 p-3 sm:p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 sm:h-3 sm:w-3 mt-0.5 flex-shrink-0" />
                  <AlertDescription className="text-[11px] sm:text-xs flex-1">
                    <div className="font-medium mb-2">Typical PSCC values:</div>
                    <div className="grid grid-cols-1 gap-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-elec-yellow">TN-S (0.35Ω):</span>
                        <span className="font-mono">~657A</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-elec-yellow">TN-C-S (0.35Ω):</span>
                        <span className="font-mono">~657A</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-elec-yellow">TT (200Ω):</span>
                        <span className="font-mono">~1.15A</span>
                      </div>
                    </div>
                  </AlertDescription>
                </div>
              </Alert>
            </div>
          </div>
        </Card>

        {/* Advanced Settings - Collapsible */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <Card className="p-5">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
                <h3 className="font-semibold text-lg">Advanced Settings</h3>
                {showAdvanced ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* PSCC */}
                <div className="space-y-3">
                  <Label htmlFor="pscc" className="text-base font-semibold">
                    Prospective Short Circuit Current (PSCC)
                  </Label>
                  <MobileInput
                    id="pscc"
                    type="number"
                    step="0.1"
                    value={pscc || ''}
                    onChange={(e) => setPscc(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Leave blank to auto-calculate"
                    className="text-base"
                  />
                  <p className="text-xs text-muted-foreground">AI will calculate based on Ze if not provided</p>
                </div>

                {/* Installation Method */}
                <div className="space-y-2">
                  <Label htmlFor="install-method" className="text-base">Default Installation Method</Label>
                  <Select value={installationMethod} onValueChange={setInstallationMethod}>
                    <SelectTrigger id="install-method" className="text-base">
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

                {/* Ambient Temperature */}
                <div className="space-y-2">
                  <Label htmlFor="ambient-temp" className="text-base">Ambient Temperature (°C)</Label>
                  <MobileInput
                    id="ambient-temp"
                    type="number"
                    value={ambientTemp}
                    onChange={(e) => setAmbientTemp(Number(e.target.value))}
                    className="text-base"
                  />
                  <p className="text-xs text-muted-foreground">Standard: 25°C</p>
                </div>

                {/* Grouping Factor */}
                <div className="space-y-2">
                  <Label htmlFor="grouping" className="text-base">Cable Grouping Factor</Label>
                  <MobileInput
                    id="grouping"
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="1"
                    value={groupingFactor}
                    onChange={(e) => setGroupingFactor(Number(e.target.value))}
                    className="text-base"
                  />
                  <p className="text-xs text-muted-foreground">1.0 = no grouping (default)</p>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </div>
  );
};
