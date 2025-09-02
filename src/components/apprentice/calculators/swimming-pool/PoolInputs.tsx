import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PoolCalculationInputs } from "@/lib/swimming-pool";
import { Waves, Thermometer, Zap, Cable } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PoolInputsProps {
  inputs: PoolCalculationInputs;
  errors: { [key: string]: string };
  onInputChange: (field: keyof PoolCalculationInputs, value: any) => void;
}

const PoolInputs = ({ inputs, errors, onInputChange }: PoolInputsProps) => {
  const poolTypes = {
    private: "Private Domestic Pool",
    public: "Public Swimming Pool", 
    commercial: "Commercial Pool/Spa",
    therapy: "Therapy/Medical Pool"
  };

  const filtrationSystems = {
    sand: "Sand Filter",
    cartridge: "Cartridge Filter",
    de: "Diatomaceous Earth (DE)"
  };

  const heatingTypes = {
    electric: "Electric Heater",
    gas: "Gas Heater",
    'heat-pump': "Heat Pump",
    solar: "Solar Heating"
  };

  const earthingSystems = {
    'TN-S': "TN-S (Separate neutral and earth)",
    'TN-C-S': "TN-C-S (PME/CNE)",
    'TT': "TT (Earth electrode)"
  };

  const installationMethods = {
    underground: "Underground (Direct burial/Duct)",
    overhead: "Overhead (Catenary wire)",
    indoor: "Indoor (Through building)"
  };

  const zones = {
    zone0: "Zone 0 (Inside pool/fountain)",
    zone1: "Zone 1 (2m around pool edge)",
    zone2: "Zone 2 (1.5m beyond zone 1)"
  };

  return (
    <div className="space-y-6">
      {/* Pool Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Waves className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Pool Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <MobileSelect value={inputs.poolType} onValueChange={(value) => onInputChange('poolType', value)}>
            <MobileSelectTrigger label="Pool Type">
              <MobileSelectValue />
            </MobileSelectTrigger>
            <MobileSelectContent>
              {Object.entries(poolTypes).map(([key, type]) => (
                <MobileSelectItem key={key} value={key}>{type}</MobileSelectItem>
              ))}
            </MobileSelectContent>
          </MobileSelect>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileInput
              label="Pool Volume"
              type="number"
              value={inputs.poolVolume || ''}
              onChange={(e) => onInputChange('poolVolume', parseFloat(e.target.value) || 0)}
              placeholder="50000"
              unit="L"
              error={errors.poolVolume}
            />
            <MobileInput
              label="Cable Run Length"
              type="number"
              value={inputs.cableRunLength || ''}
              onChange={(e) => onInputChange('cableRunLength', parseFloat(e.target.value) || 0)}
              placeholder="25"
              unit="m"
              error={errors.cableRunLength}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MobileInput
              label="Length"
              type="number"
              value={inputs.poolLength || ''}
              onChange={(e) => onInputChange('poolLength', parseFloat(e.target.value) || 0)}
              placeholder="8"
              unit="m"
            />
            <MobileInput
              label="Width"
              type="number"
              value={inputs.poolWidth || ''}
              onChange={(e) => onInputChange('poolWidth', parseFloat(e.target.value) || 0)}
              placeholder="4"
              unit="m"
            />
            <MobileInput
              label="Depth"
              type="number"
              value={inputs.poolDepth || ''}
              onChange={(e) => onInputChange('poolDepth', parseFloat(e.target.value) || 0)}
              placeholder="1.5"
              unit="m"
            />
          </div>
        </CardContent>
      </Card>

      {/* Electrical Loads */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Electrical Loads</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileInput
              label="Pool Heater Power"
              type="number"
              value={inputs.heaterPower || ''}
              onChange={(e) => onInputChange('heaterPower', parseFloat(e.target.value) || 0)}
              placeholder="6000"
              unit="W"
              error={errors.heaterPower}
            />
            <MobileInput
              label="Pump Motor Power"
              type="number"
              value={inputs.pumpPower || ''}
              onChange={(e) => onInputChange('pumpPower', parseFloat(e.target.value) || 0)}
              placeholder="1500"
              unit="W"
              error={errors.pumpPower}
            />
          </div>

          <MobileInput
            label="Pool Lighting"
            type="number"
            value={inputs.lighting || ''}
            onChange={(e) => onInputChange('lighting', parseFloat(e.target.value) || 0)}
            placeholder="300"
            unit="W"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileSelect value={inputs.filtrationSystem} onValueChange={(value) => onInputChange('filtrationSystem', value)}>
              <MobileSelectTrigger label="Filtration System">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {Object.entries(filtrationSystems).map(([key, type]) => (
                  <MobileSelectItem key={key} value={key}>{type}</MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={inputs.heatingType} onValueChange={(value) => onInputChange('heatingType', value)}>
              <MobileSelectTrigger label="Heating Type">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {Object.entries(heatingTypes).map(([key, type]) => (
                  <MobileSelectItem key={key} value={key}>{type}</MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={inputs.hasUnderwaterLighting ? "default" : "outline"}
              className={`cursor-pointer ${inputs.hasUnderwaterLighting ? 'bg-elec-yellow text-elec-dark' : ''}`}
              onClick={() => onInputChange('hasUnderwaterLighting', !inputs.hasUnderwaterLighting)}
            >
              Underwater Lighting
            </Badge>
            <Badge 
              variant={inputs.hasPoolCover ? "default" : "outline"}
              className={`cursor-pointer ${inputs.hasPoolCover ? 'bg-elec-yellow text-elec-dark' : ''}`}
              onClick={() => onInputChange('hasPoolCover', !inputs.hasPoolCover)}
            >
              Pool Cover
            </Badge>
            <Badge 
              variant={inputs.hasEmergencyStop ? "default" : "outline"}
              className={`cursor-pointer ${inputs.hasEmergencyStop ? 'bg-elec-yellow text-elec-dark' : ''}`}
              onClick={() => onInputChange('hasEmergencyStop', !inputs.hasEmergencyStop)}
            >
              Emergency Stop
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Installation Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cable className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Installation Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileSelect value={inputs.supplyVoltage.toString()} onValueChange={(value) => onInputChange('supplyVoltage', parseInt(value))}>
              <MobileSelectTrigger label="Supply Voltage">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="230">230V Single Phase</MobileSelectItem>
                <MobileSelectItem value="400">400V Three Phase</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={inputs.earthingSystem} onValueChange={(value) => onInputChange('earthingSystem', value)}>
              <MobileSelectTrigger label="Earthing System">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {Object.entries(earthingSystems).map(([key, type]) => (
                  <MobileSelectItem key={key} value={key}>{type}</MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileSelect value={inputs.installationMethod} onValueChange={(value) => onInputChange('installationMethod', value)}>
              <MobileSelectTrigger label="Installation Method">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {Object.entries(installationMethods).map(([key, type]) => (
                  <MobileSelectItem key={key} value={key}>{type}</MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={inputs.zone} onValueChange={(value) => onInputChange('zone', value)}>
              <MobileSelectTrigger label="Installation Zone">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {Object.entries(zones).map(([key, description]) => (
                  <MobileSelectItem key={key} value={key}>{description}</MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileInput
              label="Ambient Temperature"
              type="number"
              value={inputs.ambientTemperature || ''}
              onChange={(e) => onInputChange('ambientTemperature', parseFloat(e.target.value) || 20)}
              placeholder="20"
              unit="°C"
              error={errors.ambientTemperature}
            />
            <MobileInput
              label="Soil Resistivity"
              type="number"
              value={inputs.soilResistivity || ''}
              onChange={(e) => onInputChange('soilResistivity', parseFloat(e.target.value) || 100)}
              placeholder="100"
              unit="Ω.m"
            />
          </div>
        </CardContent>
      </Card>

      {errors.general && (
        <Alert className="border-red-500/20 bg-red-500/10">
          <AlertDescription className="text-red-200">
            {errors.general}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PoolInputs;