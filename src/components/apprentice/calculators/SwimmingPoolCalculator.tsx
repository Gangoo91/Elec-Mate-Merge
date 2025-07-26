import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Waves, Calculator, RotateCcw, Droplets, Shield, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SwimmingPoolCalculator = () => {
  const [poolType, setPoolType] = useState<string>("private");
  const [poolVolume, setPoolVolume] = useState<string>("");
  const [heaterPower, setHeaterPower] = useState<string>("");
  const [pumpPower, setPumpPower] = useState<string>("");
  const [lighting, setLighting] = useState<string>("");
  const [zone, setZone] = useState<string>("zone1");
  const [result, setResult] = useState<{
    totalLoad: number;
    supplyRequirements: string;
    protectionType: string;
    cableRequirements: string;
    earthingSystem: string;
    specialRequirements: string[];
    zonalRequirements: { [key: string]: string[] };
  } | null>(null);

  const poolTypes = {
    private: "Private Domestic Pool",
    public: "Public Swimming Pool", 
    commercial: "Commercial Pool/Spa",
    therapy: "Therapy/Medical Pool"
  };

  const zones = {
    zone0: "Zone 0 (Inside pool/fountain)",
    zone1: "Zone 1 (2m around pool edge)",
    zone2: "Zone 2 (1.5m beyond zone 1)"
  };

  const calculatePoolInstallation = () => {
    const volume = parseFloat(poolVolume) || 0;
    const heater = parseFloat(heaterPower) || 0;
    const pump = parseFloat(pumpPower) || 0;
    const lights = parseFloat(lighting) || 0;

    if (volume > 0) {
      const totalLoad = heater + pump + lights;

      // Supply requirements based on load
      let supplyRequirements = "";
      if (totalLoad <= 3000) {
        supplyRequirements = "Single phase 16A supply";
      } else if (totalLoad <= 7000) {
        supplyRequirements = "Single phase 32A supply";
      } else if (totalLoad <= 15000) {
        supplyRequirements = "Three phase 25A supply";
      } else {
        supplyRequirements = "Three phase 40A+ supply";
      }

      // Protection requirements
      const protectionType = poolType === "private" 
        ? "30mA RCD protection mandatory"
        : "30mA RCD + additional local protection";

      // Cable requirements
      const cableRequirements = poolType === "private"
        ? "H07RN-F flexible cable, buried direct or in conduit"
        : "Armoured cable (SWA) with earthed screen";

      // Earthing system
      const earthingSystem = "Supplementary equipotential bonding required. Bond all exposed/extraneous conductive parts within 2m of pool";

      // Special requirements by pool type
      const specialRequirements = [];
      if (poolType === "private") {
        specialRequirements.push("IET Code of Practice for swimming pools");
        specialRequirements.push("18th Edition Section 702 compliance");
        specialRequirements.push("Socket outlets minimum 2m from pool edge");
      } else {
        specialRequirements.push("BS EN 60335-2-60 for commercial pools");
        specialRequirements.push("Emergency stop systems required");
        specialRequirements.push("Professional design certification needed");
      }

      // Zonal requirements
      const zonalRequirements = {
        zone0: [
          "12V SELV only",
          "IPX8 rated equipment only",
          "No socket outlets permitted",
          "Underwater lighting max 12V"
        ],
        zone1: [
          "12V SELV preferred",
          "IPX4 minimum rating",
          "No socket outlets within 2m",
          "RCD protection mandatory"
        ],
        zone2: [
          "230V equipment permitted",
          "IPX2 minimum rating", 
          "Socket outlets allowed with RCD",
          "Standard wiring methods acceptable"
        ]
      };

      setResult({
        totalLoad,
        supplyRequirements,
        protectionType,
        cableRequirements,
        earthingSystem,
        specialRequirements,
        zonalRequirements
      });
    }
  };

  const reset = () => {
    setPoolType("private");
    setPoolVolume("");
    setHeaterPower("");
    setPumpPower("");
    setLighting("");
    setZone("zone1");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Waves className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Swimming Pool Electrical Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate electrical requirements for swimming pools according to BS 7671 Section 702 and safety regulations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <MobileSelect value={poolType} onValueChange={setPoolType}>
              <MobileSelectTrigger label="Pool Type">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {Object.entries(poolTypes).map(([key, type]) => (
                  <MobileSelectItem key={key} value={key}>{type}</MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            <MobileInput
              label="Pool Volume (litres)"
              type="number"
              value={poolVolume}
              onChange={(e) => setPoolVolume(e.target.value)}
              placeholder="e.g., 50000"
              unit="L"
            />

            <MobileInput
              label="Pool Heater Power (W)"
              type="number"
              value={heaterPower}
              onChange={(e) => setHeaterPower(e.target.value)}
              placeholder="e.g., 6000"
              unit="W"
            />

            <MobileInput
              label="Pump Motor Power (W)"
              type="number"
              value={pumpPower}
              onChange={(e) => setPumpPower(e.target.value)}
              placeholder="e.g., 1500"
              unit="W"
            />

            <MobileInput
              label="Pool Lighting (W)"
              type="number"
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              placeholder="e.g., 300"
              unit="W"
            />

            <MobileSelect value={zone} onValueChange={setZone}>
              <MobileSelectTrigger label="Installation Zone">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {Object.entries(zones).map(([key, description]) => (
                  <MobileSelectItem key={key} value={key}>{description}</MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            <div className="flex gap-2">
              <MobileButton 
                onClick={calculatePoolInstallation}
                variant="elec"
                disabled={!poolVolume}
                icon={<Calculator className="h-4 w-4" />}
                className="flex-1"
              >
                Calculate Pool Installation
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[400px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Pool Installation Requirements</h3>
                    <Badge variant="secondary" className="mb-4">
                      Section 702 Compliance
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Load:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.totalLoad} W</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Supply Requirements:</span>
                      <div className="font-mono text-elec-yellow">{result.supplyRequirements}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-400" />
                        <span className="text-muted-foreground">Protection:</span>
                      </div>
                      <div className="font-mono text-elec-yellow pl-6">{result.protectionType}</div>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Cable Requirements:</span>
                      <div className="font-mono text-elec-yellow">{result.cableRequirements}</div>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="h-4 w-4 text-cyan-400" />
                        <span className="font-medium">Earthing System:</span>
                      </div>
                      <div className="text-xs text-muted-foreground pl-6">
                        {result.earthingSystem}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <div className="font-medium mb-2">Zone {zone.slice(-1)} Requirements:</div>
                      <ul className="space-y-1 pl-4">
                        {result.zonalRequirements[zone]?.map((req, index) => (
                          <li key={index} className="text-xs text-muted-foreground">• {req}</li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                        <span className="font-medium">Special Requirements:</span>
                      </div>
                      <ul className="space-y-1 pl-6">
                        {result.specialRequirements.map((req, index) => (
                          <li key={index} className="text-xs text-muted-foreground">• {req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter pool details to calculate electrical requirements
                </div>
              )}
            </div>

            <Alert className="border-red-500/20 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-200">
                <strong>Critical:</strong> Swimming pool installations require specialist knowledge. 
                Always consult qualified pool electrical engineers and building control.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SwimmingPoolCalculator;