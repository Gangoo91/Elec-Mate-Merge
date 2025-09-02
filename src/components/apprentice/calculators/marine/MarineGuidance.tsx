import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCard } from "@/components/ui/result-card";
import { Badge } from "@/components/ui/badge";
import { 
  Anchor, 
  Battery, 
  Zap, 
  Cable, 
  Shield, 
  AlertTriangle, 
  BookOpen, 
  Wrench, 
  Eye,
  CheckCircle 
} from "lucide-react";
import { MarineResults, MarineInputs } from "@/lib/marine";

interface MarineGuidanceProps {
  results: MarineResults;
  inputs: MarineInputs;
}

const MarineGuidance = ({ results, inputs }: MarineGuidanceProps) => {
  const getCriticalityLevel = () => {
    const criticalIssues = results.complianceChecks.filter(check => check.status === 'non-compliant').length;
    const warnings = results.complianceChecks.filter(check => check.status === 'warning').length;
    
    if (criticalIssues > 0) return { level: 'critical', color: 'error', message: 'Critical compliance issues require immediate attention' };
    if (warnings > 2) return { level: 'caution', color: 'warning', message: 'Multiple warnings - system review recommended' };
    if (warnings > 0) return { level: 'advisory', color: 'warning', message: 'Minor issues identified - consider improvements' };
    return { level: 'compliant', color: 'success', message: 'System meets marine electrical standards' };
  };

  const criticality = getCriticalityLevel();

  return (
    <div className="space-y-6">
      {/* Professional Notice */}
      <Card className="border-red-500/50 bg-red-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-red-400 mb-2">Professional Marine Electrical Installation Required</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Marine electrical systems must be installed and certified by qualified marine electricians. This calculator provides 
                design guidance only and does not replace professional installation, inspection, and certification requirements.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs border-red-500/30 text-red-400">
                  MCA Compliance Required
                </Badge>
                <Badge variant="outline" className="text-xs border-red-500/30 text-red-400">
                  Professional Installation
                </Badge>
                <Badge variant="outline" className="text-xs border-red-500/30 text-red-400">
                  Marine Survey Required
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            System Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ResultCard
              title="Compliance Status"
              value={criticality.level.toUpperCase()}
              subtitle={criticality.message}
              status={criticality.color as any}
              icon={<Shield className="h-5 w-5" />}
            />
            <ResultCard
              title="Energy Autonomy"
              value={Math.round((results.recommendedBatteryCapacity / results.dailyEnergyConsumption) * 10) / 10}
              unit="days"
              subtitle="Battery runtime at current consumption"
              status={results.energyBalance > 0 ? "success" : "warning"}
              icon={<Battery className="h-5 w-5" />}
            />
            <ResultCard
              title="System Efficiency"
              value={Math.round((results.dailyEnergyConsumption / (results.totalChargingCapacity * 0.8 * 8)) * 100)}
              unit="%"
              subtitle="Daily consumption vs charging capacity"
              status={results.energyBalance > 0 ? "success" : "warning"}
              icon={<Zap className="h-5 w-5" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Load Analysis & Management */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Load Analysis & Energy Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg flex items-center gap-2 text-white">
                <Eye className="h-5 w-5 text-elec-yellow" />
                Load Distribution Analysis
              </h4>
              <div className="space-y-3 text-sm bg-elec-card p-4 rounded-lg border border-elec-yellow/10">
                <div className="flex justify-between items-center">
                  <span className="text-white">Continuous Loads:</span>
                  <span className="text-elec-yellow font-medium">{results.totalContinuousLoad}W ({Math.round((results.totalContinuousLoad / results.peakLoad) * 100)}%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">Intermittent Loads:</span>
                  <span className="text-elec-yellow font-medium">{results.totalIntermittentLoad}W ({Math.round((results.totalIntermittentLoad / results.peakLoad) * 100)}%)</span>
                </div>
                <div className="flex justify-between items-center border-t border-elec-yellow/20 pt-2">
                  <span className="text-white font-medium">Peak Demand:</span>
                  <span className="text-elec-yellow font-bold">{results.peakLoad}W</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">Current at Peak:</span>
                  <span className="text-elec-yellow font-medium">{(results.peakLoad / inputs.systemVoltage).toFixed(1)}A</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5 text-elec-yellow" />
                Energy Management Guidelines
              </h4>
              <div className="bg-elec-card p-4 rounded-lg border border-elec-yellow/10">
                <ul className="space-y-3 text-sm text-white">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Monitor battery voltage regularly - never discharge below 50% for lead-acid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Use load prioritisation: Navigation equipment first, comfort loads second</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Install battery monitor with Ah counting for accurate state of charge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Consider inverter efficiency - typically 85-95% for quality units</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Implement low voltage disconnects to protect batteries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Schedule high-draw equipment during charging periods</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Battery System Guidance */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Battery className="h-5 w-5 text-elec-yellow" />
            Battery System Design & Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-white">Battery Configuration</h4>
              <div className="p-6 bg-elec-card rounded-lg border border-elec-yellow/20">
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Recommended Capacity:</span>
                    <span className="font-bold text-elec-yellow">{results.recommendedBatteryCapacity}Ah @ {results.batteryBankVoltage}V</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Battery Configuration:</span>
                    <span className="text-white font-medium">{results.numberOfBatteries} × 100Ah batteries</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Usable Capacity:</span>
                    <span className="text-white font-medium">{Math.round(results.recommendedBatteryCapacity * (inputs.maxDischarge / 100))}Ah</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Reserve Capacity:</span>
                    <span className="text-white font-medium">{Math.round(results.recommendedBatteryCapacity * (1 - inputs.maxDischarge / 100))}Ah</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-white">Battery Technology Comparison</h4>
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-elec-card rounded-lg border border-elec-yellow/10">
                  <div className="font-semibold mb-2 text-white">Lead Acid (Flooded)</div>
                  <div className="text-white text-xs leading-relaxed">
                    • Lowest cost • Requires ventilation • 50% DoD • 3-5 year life • Regular maintenance
                  </div>
                </div>
                <div className="p-4 bg-elec-card rounded-lg border border-elec-yellow/10">
                  <div className="font-semibold mb-2 text-white">AGM/Gel</div>
                  <div className="text-white text-xs leading-relaxed">
                    • Sealed design • 80% DoD • 5-7 year life • Minimal maintenance • Good vibration resistance
                  </div>
                </div>
                <div className="p-4 bg-elec-card rounded-lg border border-green-500/30 bg-green-500/10">
                  <div className="font-semibold mb-2 text-green-400">LiFePO4 (Recommended for performance)</div>
                  <div className="text-white text-xs leading-relaxed">
                    • 90% DoD • 10-15 year life • Lightweight • Fast charging • Built-in BMS protection
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white text-center">Installation Requirements</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-elec-card p-4 rounded-lg border border-elec-yellow/10">
                <h5 className="font-medium text-elec-yellow mb-3">Safety & Placement</h5>
                <ul className="space-y-2 text-sm text-white">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Install in ventilated compartment (except LiFePO4)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Secure against movement in heavy seas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Use marine-grade battery boxes with drainage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Install battery isolator switches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Provide easy access for maintenance</span>
                  </li>
                </ul>
              </div>
              <div className="bg-elec-card p-4 rounded-lg border border-elec-yellow/10">
                <h5 className="font-medium text-elec-yellow mb-3">Electrical & Monitoring</h5>
                <ul className="space-y-2 text-sm text-white">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Install battery temperature sensors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Use appropriate battery bank fusing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Ensure proper cable terminations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Label all circuits clearly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Install low voltage alarms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charging System Analysis */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Charging System Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-white">Charging Source Analysis</h4>
              <div className="bg-elec-card p-6 rounded-lg border border-elec-yellow/20">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white">Engine Alternator:</span>
                    <span className="text-elec-yellow font-medium">{inputs.alternatorRating}W ({Math.round((inputs.alternatorRating / results.totalChargingCapacity) * 100)}%)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white">Solar Panels:</span>
                    <span className="text-elec-yellow font-medium">{inputs.solarPanels}W ({Math.round((inputs.solarPanels / results.totalChargingCapacity) * 100)}%)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white">Wind Generator:</span>
                    <span className="text-elec-yellow font-medium">{inputs.windGenerator}W ({Math.round((inputs.windGenerator / results.totalChargingCapacity) * 100)}%)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white">Shore Charger:</span>
                    <span className="text-elec-yellow font-medium">{inputs.shoreCharger}W ({Math.round((inputs.shoreCharger / results.totalChargingCapacity) * 100)}%)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold border-t border-elec-yellow/30 pt-3">
                    <span className="text-white">Total Capacity:</span>
                    <span className="text-elec-yellow text-lg">{results.totalChargingCapacity}W</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-white">Charging Recommendations</h4>
              <div className="space-y-4">
                <div className="p-4 bg-elec-card rounded-lg border border-elec-yellow/10">
                  <div className="font-semibold text-elec-yellow mb-2">Alternator Sizing</div>
                  <div className="text-white text-sm">Minimum 20% of battery bank capacity (Ah) for adequate charging rate</div>
                </div>
                <div className="p-4 bg-elec-card rounded-lg border border-elec-yellow/10">
                  <div className="font-semibold text-elec-yellow mb-2">Solar Array</div>
                  <div className="text-white text-sm">Size for 20-30% of daily consumption to extend battery life</div>
                </div>
                <div className="p-4 bg-elec-card rounded-lg border border-elec-yellow/10">
                  <div className="font-semibold text-elec-yellow mb-2">Charge Controllers</div>
                  <div className="text-white text-sm">Use MPPT controllers for solar, 3-stage charging for alternators</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marine Safety & Regulations */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Marine Safety Standards & Regulations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-white">UK Maritime & Coastguard Agency (MCA)</h4>
              <ul className="space-y-1 text-sm text-white">
                <li>• MGN 280(M) - Small Vessel Electrical Safety</li>
                <li>• MGN 503(M) - Fire Safety on Small Commercial Vessels</li>
                <li>• Pleasure craft ≤24m: Recreational Craft Directive (RCD)</li>
                <li>• Commercial vessels: MCA coding requirements</li>
                <li>• Annual electrical safety inspections required</li>
                <li>• Electrical installation certificates mandatory</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-white">International Standards</h4>
              <ul className="space-y-1 text-sm text-white">
                <li>• ISO 13297 - Small craft electrical systems</li>
                <li>• IEC 60092 - Marine electrical installations</li>
                <li>• ABYC E-11 - AC & DC electrical systems aboard boats</li>
                <li>• IEC 60364-7-709 - Marinas and similar locations</li>
                <li>• CE marking requirements for EU waters</li>
                <li>• Lloyd's Register approval for commercial vessels</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-white text-center">Critical Safety Requirements</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-elec-card rounded border border-elec-yellow/10 text-center">
                <h5 className="font-medium text-sm mb-3 text-elec-yellow">Electrical Protection</h5>
                <ul className="text-xs text-white space-y-1 text-left">
                  <li>• RCD protection (30mA) for AC circuits</li>
                  <li>• Galvanic isolation transformers</li>
                  <li>• Overcurrent protection all circuits</li>
                  <li>• Emergency battery disconnect</li>
                </ul>
              </div>
              <div className="p-4 bg-elec-card rounded border border-elec-yellow/10 text-center">
                <h5 className="font-medium text-sm mb-3 text-elec-yellow">Fire Prevention</h5>
                <ul className="text-xs text-white space-y-1 text-left">
                  <li>• Battery compartment ventilation</li>
                  <li>• Ignition protection devices</li>
                  <li>• Proper cable routing and protection</li>
                  <li>• Emergency shutdown systems</li>
                </ul>
              </div>
              <div className="p-4 bg-elec-card rounded border border-elec-yellow/10 text-center">
                <h5 className="font-medium text-sm mb-3 text-elec-yellow">Water Ingress</h5>
                <ul className="text-xs text-white space-y-1 text-left">
                  <li>• IP65 minimum rating wet areas</li>
                  <li>• Sealed penetrations through hull</li>
                  <li>• Corrosion-resistant materials</li>
                  <li>• Proper earthing systems</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Best Practices */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Installation Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-white text-center">Cable Installation</h4>
              <div className="bg-elec-card p-6 rounded-lg border border-elec-yellow/20">
                <ul className="space-y-3 text-sm text-white">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Use tinned copper conductors for saltwater environments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Route cables high and dry where possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Support cables every 18 inches maximum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Use proper marine-grade cable glands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Maintain separation from hot surfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Label all circuits at both ends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Use heat-shrink tubing on all connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Apply dielectric grease to connections</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-white text-center">Equipment Mounting</h4>
              <div className="bg-elec-card p-6 rounded-lg border border-elec-yellow/20">
                <ul className="space-y-3 text-sm text-white">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Mount equipment clear of bilge water</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Secure against vibration and shock</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Ensure adequate ventilation for electronics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Use stainless steel fasteners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Install easy-access service panels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Protect from spray and condensation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Consider vessel heel angles in placement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Emergency equipment must be accessible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="flex justify-center items-center gap-2 mb-4">
                <AlertTriangle className="h-6 w-6 text-amber-400" />
                <h4 className="font-bold text-xl text-amber-400">Corrosion Prevention</h4>
              </div>
              <p className="text-white text-base leading-relaxed max-w-4xl mx-auto">
                Marine environments are extremely corrosive. All electrical connections must use 
                appropriate materials and protection methods:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-white text-sm">
                  <span className="text-elec-yellow">•</span> Install galvanic isolator on shore power connection
                </div>
              </div>
              <div className="text-center">
                <div className="text-white text-sm">
                  <span className="text-elec-yellow">•</span> Use sacrificial anodes on metal components
                </div>
              </div>
              <div className="text-center">
                <div className="text-white text-sm">
                  <span className="text-elec-yellow">•</span> Apply anti-corrosion compounds to all connections
                </div>
              </div>
              <div className="text-center">
                <div className="text-white text-sm">
                  <span className="text-elec-yellow">•</span> Regular inspection and maintenance schedule essential
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarineGuidance;