
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sun, Info, Calculator, RotateCcw, Zap, TrendingUp, Lightbulb, CheckCircle, AlertTriangle, FileText, Shield } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Expanded UK locations with solar irradiance data (kWh/m²/year)
const UK_LOCATIONS = [
  { name: "London", irradiance: 1100 },
  { name: "Manchester", irradiance: 950 },
  { name: "Birmingham", irradiance: 1000 },
  { name: "Leeds", irradiance: 950 },
  { name: "Glasgow", irradiance: 850 },
  { name: "Edinburgh", irradiance: 900 },
  { name: "Cardiff", irradiance: 1050 },
  { name: "Belfast", irradiance: 850 },
  { name: "Bristol", irradiance: 1100 },
  { name: "Liverpool", irradiance: 950 },
  { name: "Newcastle", irradiance: 900 },
  { name: "Nottingham", irradiance: 1000 },
  { name: "Sheffield", irradiance: 950 },
  { name: "Brighton", irradiance: 1150 },
  { name: "Plymouth", irradiance: 1100 },
  { name: "Norwich", irradiance: 1050 },
  { name: "York", irradiance: 950 },
  { name: "Bath", irradiance: 1050 },
  { name: "Oxford", irradiance: 1050 },
  { name: "Cambridge", irradiance: 1000 },
  { name: "Exeter", irradiance: 1100 },
  { name: "Canterbury", irradiance: 1100 },
  { name: "Winchester", irradiance: 1100 },
  { name: "Inverness", irradiance: 800 },
  { name: "Aberdeen", irradiance: 850 },
  { name: "Dundee", irradiance: 850 },
  { name: "Stirling", irradiance: 850 },
  { name: "Perth", irradiance: 850 },
  { name: "Swansea", irradiance: 1000 },
  { name: "Newport", irradiance: 1050 },
  { name: "Bangor", irradiance: 950 },
  { name: "Derry", irradiance: 800 },
  { name: "Armagh", irradiance: 850 }
];

const SolarPVCalculator = () => {
  const [systemSize, setSystemSize] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [panelEfficiency, setPanelEfficiency] = useState<string>("20");
  const [roofOrientation, setRoofOrientation] = useState<string>("south");
  const [roofTilt, setRoofTilt] = useState<string>("35");
  const [systemCost, setSystemCost] = useState<string>("6000");
  const [electricityRate, setElectricityRate] = useState<string>("0.25");
  const [result, setResult] = useState<{
    annualGeneration: number;
    dailyGeneration: number;
    annualSavings: number;
    paybackPeriod: number;
    co2Savings: number;
    systemEfficiency: number;
    orientationFactor: number;
    tiltFactor: number;
    dnoConnectionType: string;
    viability: string;
  } | null>(null);

  const calculateSolarPV = () => {
    const size = parseFloat(systemSize);
    const efficiency = parseFloat(panelEfficiency) / 100;
    const cost = parseFloat(systemCost);
    const rate = parseFloat(electricityRate);
    const tilt = parseFloat(roofTilt);

    if (size > 0 && location && efficiency > 0) {
      const locationData = UK_LOCATIONS.find(loc => loc.name === location);
      if (!locationData) return;

      let irradiance = locationData.irradiance;

      // Orientation factor
      let orientationFactor = 1.0;
      switch (roofOrientation) {
        case "south": orientationFactor = 1.0; break;
        case "southwest": 
        case "southeast": orientationFactor = 0.95; break;
        case "east":
        case "west": orientationFactor = 0.85; break;
        case "north": orientationFactor = 0.6; break;
      }

      // Tilt factor (optimal tilt in UK is around 35°)
      const optimalTilt = 35;
      const tiltDifference = Math.abs(tilt - optimalTilt);
      const tiltFactor = Math.max(0.7, 1 - (tiltDifference / 100));

      // System efficiency (includes inverter losses, wiring losses, etc.)
      const systemEfficiency = efficiency * 0.85; // 85% system efficiency

      // Annual generation calculation
      const annualGeneration = size * irradiance * orientationFactor * tiltFactor * systemEfficiency;
      const dailyGeneration = annualGeneration / 365;

      // Financial calculations
      const annualSavings = annualGeneration * rate;
      const paybackPeriod = cost / annualSavings;

      // Environmental impact (UK grid factor: 0.233 kg CO2/kWh)
      const co2Savings = annualGeneration * 0.233;

      // DNO connection type based on system size
      const dnoConnectionType = size <= 3.68 ? "G98" : "G99";
      
      // System viability assessment
      let viability = "Poor";
      if (paybackPeriod < 8) viability = "Excellent";
      else if (paybackPeriod < 12) viability = "Good";
      else if (paybackPeriod < 16) viability = "Fair";

      setResult({
        annualGeneration: Math.round(annualGeneration),
        dailyGeneration: Math.round(dailyGeneration * 10) / 10,
        annualSavings: Math.round(annualSavings),
        paybackPeriod: Math.round(paybackPeriod * 10) / 10,
        co2Savings: Math.round(co2Savings),
        systemEfficiency: Math.round(systemEfficiency * 100),
        orientationFactor: Math.round(orientationFactor * 100),
        tiltFactor: Math.round(tiltFactor * 100),
        dnoConnectionType,
        viability
      });
    }
  };

  const reset = () => {
    setSystemSize("");
    setLocation("");
    setPanelEfficiency("20");
    setRoofOrientation("south");
    setRoofTilt("35");
    setSystemCost("6000");
    setElectricityRate("0.25");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Solar PV System Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate solar panel performance, energy generation, and financial returns for UK installations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            {/* System Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="system-size">System Size (kW)</Label>
                <Input
                  id="system-size"
                  type="number"
                  step="0.1"
                  value={systemSize}
                  onChange={(e) => setSystemSize(e.target.value)}
                  placeholder="e.g., 4.0"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="panel-efficiency">Panel Efficiency (%)</Label>
                <Select value={panelEfficiency} onValueChange={setPanelEfficiency}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="15">15% (Budget panels)</SelectItem>
                    <SelectItem value="18">18% (Standard panels)</SelectItem>
                    <SelectItem value="20">20% (Premium panels)</SelectItem>
                    <SelectItem value="22">22% (High-efficiency panels)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location and Installation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue placeholder="Select your location" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    {UK_LOCATIONS.map((loc) => (
                      <SelectItem key={loc.name} value={loc.name}>
                        {loc.name} ({loc.irradiance} kWh/m²/year)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="roof-orientation">Roof Orientation</Label>
                <Select value={roofOrientation} onValueChange={setRoofOrientation}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="south">South (Best)</SelectItem>
                    <SelectItem value="southeast">South-East</SelectItem>
                    <SelectItem value="southwest">South-West</SelectItem>
                    <SelectItem value="east">East</SelectItem>
                    <SelectItem value="west">West</SelectItem>
                    <SelectItem value="north">North (Poor)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Financial and Technical Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roof-tilt">Roof Tilt (degrees)</Label>
                <Input
                  id="roof-tilt"
                  type="number"
                  value={roofTilt}
                  onChange={(e) => setRoofTilt(e.target.value)}
                  placeholder="35"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="system-cost">System Cost (£)</Label>
                <Input
                  id="system-cost"
                  type="number"
                  value={systemCost}
                  onChange={(e) => setSystemCost(e.target.value)}
                  placeholder="6000"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="electricity-rate">Electricity Rate (£/kWh)</Label>
              <Input
                id="electricity-rate"
                type="number"
                step="0.01"
                value={electricityRate}
                onChange={(e) => setElectricityRate(e.target.value)}
                placeholder="0.25"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={calculateSolarPV} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-gray p-6 min-h-[400px]">
              {result ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">Solar PV System Analysis</h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                        {location} - {result.systemEfficiency}% Efficiency
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className={`${
                          result.viability === 'Excellent' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          result.viability === 'Good' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          result.viability === 'Fair' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                          'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}
                      >
                        {result.viability} Viability
                      </Badge>
                    </div>
                  </div>
                  
                  <Separator className="bg-elec-yellow/20" />
                  
                  {/* Key Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-elec-gray/50 p-4 rounded-lg border border-elec-yellow/20">
                      <div className="flex items-center justify-between mb-2">
                        <Zap className="h-5 w-5 text-elec-yellow" />
                        <span className="text-lg font-bold text-white">{result.annualGeneration.toLocaleString()} kWh</span>
                      </div>
                      <p className="text-sm text-white/80">Annual Generation</p>
                      <p className="text-xs text-white/60 mt-1">{result.dailyGeneration} kWh/day average</p>
                    </div>
                    
                    <div className="bg-elec-gray/50 p-4 rounded-lg border border-green-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="h-5 w-5 text-green-400" />
                        <span className="text-lg font-bold text-white">£{result.annualSavings.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-white/80">Annual Savings</p>
                      <p className="text-xs text-white/60 mt-1">{result.paybackPeriod} year payback</p>
                    </div>
                    
                    <div className="bg-elec-gray/50 p-4 rounded-lg border border-blue-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <Lightbulb className="h-5 w-5 text-blue-400" />
                        <span className="text-lg font-bold text-white">{result.co2Savings} kg</span>
                      </div>
                      <p className="text-sm text-white/80">CO₂ Saved Annually</p>
                      <p className="text-xs text-white/60 mt-1">Environmental benefit</p>
                    </div>
                  </div>

                  <Separator className="bg-elec-yellow/20" />

                  {/* Why It Matters */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Info className="h-5 w-5 text-elec-yellow" />
                      Why It Matters
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
                      <div className="space-y-2">
                        <p><strong className="text-elec-yellow">Energy Independence:</strong> Reducing reliance on grid electricity and volatile energy prices.</p>
                        <p><strong className="text-elec-yellow">Carbon Footprint:</strong> Significant environmental impact - equivalent to planting {Math.round(result.co2Savings / 21)} trees annually.</p>
                      </div>
                      <div className="space-y-2">
                        <p><strong className="text-elec-yellow">Property Value:</strong> Solar installations typically add 4% to property value.</p>
                        <p><strong className="text-elec-yellow">Future-Proofing:</strong> Protection against rising electricity costs and energy security.</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-elec-yellow/20" />

                  {/* What It Means Practically */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-elec-yellow" />
                      What It Means Practically
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-white">Daily Usage Coverage:</p>
                          <p>Your system generates {result.dailyGeneration} kWh daily - enough to power an average UK home for {Math.round((result.dailyGeneration / 9) * 10) / 10} days.</p>
                        </div>
                        <div>
                          <p className="font-medium text-white">Orientation Impact:</p>
                          <p>Your {roofOrientation} orientation achieves {result.orientationFactor}% of optimal performance. Tilt angle provides {result.tiltFactor}% efficiency.</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-white">Financial Impact:</p>
                          <p>Monthly savings of approximately £{Math.round(result.annualSavings / 12)}, with full investment recovery in {result.paybackPeriod} years.</p>
                        </div>
                        <div>
                          <p className="font-medium text-white">Grid Connection:</p>
                          <p>Requires {result.dnoConnectionType} notification to your Distribution Network Operator (DNO).</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-elec-yellow/20" />

                  {/* Regulations & Standards */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Shield className="h-5 w-5 text-elec-yellow" />
                      Regulations & Standards
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="bg-elec-gray/30 p-3 rounded border border-elec-yellow/20">
                          <p className="font-medium text-white mb-1">BS 7671 (18th Edition)</p>
                          <p className="text-xs text-white/80">• RCD protection required (411.3.3)</p>
                          <p className="text-xs text-white/80">• DC isolator within 3m of PV array</p>
                          <p className="text-xs text-white/80">• AC isolator accessible to firefighters</p>
                        </div>
                        <div className="bg-elec-gray/30 p-3 rounded border border-blue-500/30">
                          <p className="font-medium text-white mb-1">DNO Connection ({result.dnoConnectionType})</p>
                          <p className="text-xs text-white/80">• {result.dnoConnectionType === 'G98' ? 'Simplified notification for ≤3.68kW' : 'Full application required for >3.68kW'}</p>
                          <p className="text-xs text-white/80">• Must not exceed 16A per phase</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-elec-gray/30 p-3 rounded border border-green-500/30">
                          <p className="font-medium text-white mb-1">MCS Certification</p>
                          <p className="text-xs text-white/80">• Required for SEG payments</p>
                          <p className="text-xs text-white/80">• Ensures quality installation</p>
                          <p className="text-xs text-white/80">• Insurance compliance</p>
                        </div>
                        <div className="bg-elec-gray/30 p-3 rounded border border-yellow-500/30">
                          <p className="font-medium text-white mb-1">Building Regulations</p>
                          <p className="text-xs text-white/80">• Structural assessment may be required</p>
                          <p className="text-xs text-white/80">• Fire safety considerations</p>
                          <p className="text-xs text-white/80">• Planning permission if listed building</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-elec-yellow/20" />

                  {/* Analysis & Recommendations */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <FileText className="h-5 w-5 text-elec-yellow" />
                      Analysis & Recommendations
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {/* System Performance Analysis */}
                      <div className="bg-elec-gray/30 p-4 rounded border border-elec-yellow/20">
                        <h5 className="font-medium text-white mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          System Performance Analysis
                        </h5>
                        <div className="text-sm text-white/90 space-y-1">
                          <p>• Your {systemSize}kW system has {result.systemEfficiency}% overall efficiency after losses</p>
                          <p>• {roofOrientation.charAt(0).toUpperCase() + roofOrientation.slice(1)} orientation provides {result.orientationFactor}% of optimal performance</p>
                          <p>• {roofTilt}° tilt angle achieves {result.tiltFactor}% efficiency (optimal: 35°)</p>
                          <p>• Expected 25-year generation: {Math.round(result.annualGeneration * 22.5 / 1000)} MWh (accounting for 1%/year degradation)</p>
                        </div>
                      </div>

                      {/* Financial Recommendations */}
                      <div className="bg-elec-gray/30 p-4 rounded border border-green-500/30">
                        <h5 className="font-medium text-white mb-2 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          Financial Recommendations
                        </h5>
                        <div className="text-sm text-white/90 space-y-1">
                          {result.paybackPeriod < 10 ? (
                            <p className="text-green-400">• Excellent financial case - payback under 10 years</p>
                          ) : result.paybackPeriod < 15 ? (
                            <p className="text-yellow-400">• Good financial case - consider maximising self-consumption</p>
                          ) : (
                            <p className="text-red-400">• Consider larger system or check for shading issues</p>
                          )}
                          <p>• Smart Export Guarantee (SEG) could provide £{Math.round(result.annualGeneration * 0.05)}-£{Math.round(result.annualGeneration * 0.15)} additional annual income</p>
                          <p>• Battery storage could increase self-consumption from 30% to 70%</p>
                          <p>• 25-year total savings: £{Math.round(result.annualSavings * 22.5).toLocaleString()} (inflation-adjusted)</p>
                        </div>
                      </div>

                      {/* Installation Recommendations */}
                      <div className="bg-elec-gray/30 p-4 rounded border border-blue-500/30">
                        <h5 className="font-medium text-white mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-blue-400" />
                          Installation Recommendations
                        </h5>
                        <div className="text-sm text-white/90 space-y-1">
                          <p>• Use MCS-certified installer for warranty and SEG eligibility</p>
                          <p>• Ensure {result.dnoConnectionType} application submitted before installation</p>
                          <p>• Consider optimisers if partial shading exists</p>
                          <p>• Plan for roof access and maintenance requirements</p>
                          <p>• Install bird guards and cleaning access points</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="bg-elec-yellow/20" />
                  
                  <div className="text-xs text-white/60 bg-elec-gray/20 p-3 rounded">
                    <p className="font-medium text-white/80 mb-1">Calculation Details:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>• System efficiency losses (15%)</div>
                      <div>• Orientation and tilt factors</div>
                      <div>• UK solar irradiance data</div>
                      <div>• Grid carbon intensity: 0.233 kg CO₂/kWh</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-white/60">
                  <div className="text-center">
                    <Sun className="h-12 w-12 text-elec-yellow/60 mx-auto mb-4" />
                    <p className="text-lg font-medium">Configure Your Solar PV System</p>
                    <p className="text-sm mt-2">Enter your system details to see comprehensive performance analysis, financial projections, and regulatory guidance</p>
                  </div>
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-200">
                <strong>Professional Notice:</strong> Results are estimates based on typical UK conditions and industry standards. 
                Actual performance may vary due to weather, shading, system maintenance, and local factors. 
                Always consult with MCS-certified installers for detailed site assessments and BS 7671 compliance verification.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolarPVCalculator;
