import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MobileInput } from "@/components/ui/mobile-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  installationType
}: SupplyDetailsStepProps) => {
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
        {/* Primary Supply Settings */}
        <Card className="p-5 border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Primary Supply</h3>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Phases */}
            <div className="space-y-2">
              <Label htmlFor="phases" className="text-base font-semibold">Phases *</Label>
              <Select value={phases} onValueChange={(v: 'single' | 'three') => setPhases(v)}>
                <SelectTrigger id="phases" className="text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Phase (230V)</SelectItem>
                  <SelectItem value="three">Three Phase (400V)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Voltage */}
            <div className="space-y-2">
              <Label htmlFor="voltage" className="text-base font-semibold">Voltage (V) *</Label>
              <MobileInput
                id="voltage"
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value))}
                className="text-base"
              />
            </div>
          </div>
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
              <p className="text-xs text-muted-foreground">
                Typical: TN-S (0.35Ω), TN-C-S (0.35Ω), TT (200Ω)
              </p>
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
              <Alert className="bg-muted/50">
                <Info className="h-3 w-3" />
                <AlertDescription className="text-xs space-y-1">
                  <div><strong>TN-S (0.35Ω):</strong> ~657A typical</div>
                  <div><strong>TN-C-S (0.35Ω):</strong> ~657A typical</div>
                  <div><strong>TT (200Ω):</strong> ~1.15A typical</div>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </Card>

        {/* Installation Conditions */}
        <Card className="p-5">
          <h3 className="font-semibold text-lg mb-4">Installation Conditions</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
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
        </Card>
      </div>
    </div>
  );
};
