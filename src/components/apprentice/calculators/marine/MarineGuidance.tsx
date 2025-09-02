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
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Eye className="h-4 w-4 text-elec-yellow" />
                Load Distribution Analysis
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Continuous Loads:</span>
                  <span>{results.totalContinuousLoad}W ({Math.round((results.totalContinuousLoad / results.peakLoad) * 100)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Intermittent Loads:</span>
                  <span>{results.totalIntermittentLoad}W ({Math.round((results.totalIntermittentLoad / results.peakLoad) * 100)}%)</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Peak Demand:</span>
                  <span>{results.peakLoad}W</span>
                </div>
                <div className="flex justify-between text-elec-yellow">
                  <span>Current at Peak:</span>
                  <span>{(results.peakLoad / inputs.systemVoltage).toFixed(1)}A</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-elec-yellow" />
                Energy Management Guidelines
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Monitor battery voltage regularly - never discharge below 50% for lead-acid</li>
                <li>• Use load prioritisation: Navigation equipment first, comfort loads second</li>
                <li>• Install battery monitor with Ah counting for accurate state of charge</li>
                <li>• Consider inverter efficiency - typically 85-95% for quality units</li>
                <li>• Implement low voltage disconnects to protect batteries</li>
                <li>• Schedule high-draw equipment during charging periods</li>
              </ul>
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
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Battery Configuration</h4>
              <div className="p-4 bg-elec-card rounded-lg border border-elec-yellow/10">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Recommended Capacity:</span>
                    <span className="font-medium">{results.recommendedBatteryCapacity}Ah @ {results.batteryBankVoltage}V</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Battery Configuration:</span>
                    <span>{results.numberOfBatteries} × 100Ah batteries</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Usable Capacity:</span>
                    <span>{Math.round(results.recommendedBatteryCapacity * (inputs.maxDischarge / 100))}Ah</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reserve Capacity:</span>
                    <span>{Math.round(results.recommendedBatteryCapacity * (1 - inputs.maxDischarge / 100))}Ah</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Battery Technology Comparison</h4>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-elec-card rounded border border-elec-yellow/10">
                  <div className="font-medium mb-1">Lead Acid (Flooded)</div>
                  <div className="text-muted-foreground text-xs">
                    • Lowest cost • Requires ventilation • 50% DoD • 3-5 year life • Regular maintenance
                  </div>
                </div>
                <div className="p-3 bg-elec-card rounded border border-elec-yellow/10">
                  <div className="font-medium mb-1">AGM/Gel</div>
                  <div className="text-muted-foreground text-xs">
                    • Sealed design • 80% DoD • 5-7 year life • Minimal maintenance • Good vibration resistance
                  </div>
                </div>
                <div className="p-3 bg-elec-card rounded border border-green-500/20 bg-green-500/5">
                  <div className="font-medium mb-1 text-green-400">LiFePO4 (Recommended for performance)</div>
                  <div className="text-muted-foreground text-xs">
                    • 90% DoD • 10-15 year life • Lightweight • Fast charging • Built-in BMS protection
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Installation Requirements</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Install in ventilated compartment (except LiFePO4)</li>
                <li>• Secure against movement in heavy seas</li>
                <li>• Use marine-grade battery boxes with drainage</li>
                <li>• Install battery isolator switches</li>
                <li>• Provide easy access for maintenance</li>
              </ul>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Install battery temperature sensors</li>
                <li>• Use appropriate battery bank fusing</li>
                <li>• Ensure proper cable terminations</li>
                <li>• Label all circuits clearly</li>
                <li>• Install low voltage alarms</li>
              </ul>
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
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Charging Source Analysis</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Engine Alternator:</span>
                  <span>{inputs.alternatorRating}W ({Math.round((inputs.alternatorRating / results.totalChargingCapacity) * 100)}%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Solar Panels:</span>
                  <span>{inputs.solarPanels}W ({Math.round((inputs.solarPanels / results.totalChargingCapacity) * 100)}%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Wind Generator:</span>
                  <span>{inputs.windGenerator}W ({Math.round((inputs.windGenerator / results.totalChargingCapacity) * 100)}%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shore Charger:</span>
                  <span>{inputs.shoreCharger}W ({Math.round((inputs.shoreCharger / results.totalChargingCapacity) * 100)}%)</span>
                </div>
                <div className="flex justify-between text-sm font-medium border-t border-elec-yellow/20 pt-2">
                  <span>Total Capacity:</span>
                  <span>{results.totalChargingCapacity}W</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Charging Recommendations</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="p-3 bg-elec-card rounded border border-elec-yellow/10">
                  <div className="font-medium text-elec-light mb-1">Alternator Sizing</div>
                  <div>Minimum 20% of battery bank capacity (Ah) for adequate charging rate</div>
                </div>
                <div className="p-3 bg-elec-card rounded border border-elec-yellow/10">
                  <div className="font-medium text-elec-light mb-1">Solar Array</div>
                  <div>Size for 20-30% of daily consumption to extend battery life</div>
                </div>
                <div className="p-3 bg-elec-card rounded border border-elec-yellow/10">
                  <div className="font-medium text-elec-light mb-1">Charge Controllers</div>
                  <div>Use MPPT controllers for solar, 3-stage charging for alternators</div>
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
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Cable Installation</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use tinned copper conductors for saltwater environments</li>
                <li>• Route cables high and dry where possible</li>
                <li>• Support cables every 18 inches maximum</li>
                <li>• Use proper marine-grade cable glands</li>
                <li>• Maintain separation from hot surfaces</li>
                <li>• Label all circuits at both ends</li>
                <li>• Use heat-shrink tubing on all connections</li>
                <li>• Apply dielectric grease to connections</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Equipment Mounting</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Mount equipment clear of bilge water</li>
                <li>• Secure against vibration and shock</li>
                <li>• Ensure adequate ventilation for electronics</li>
                <li>• Use stainless steel fasteners</li>
                <li>• Install easy-access service panels</li>
                <li>• Protect from spray and condensation</li>
                <li>• Consider vessel heel angles in placement</li>
                <li>• Emergency equipment must be accessible</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-amber-400 mb-2">Corrosion Prevention</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Marine environments are extremely corrosive. All electrical connections must use appropriate 
                  materials and protection methods:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Install galvanic isolator on shore power connection</li>
                  <li>• Use sacrificial anodes on metal components</li>
                  <li>• Apply anti-corrosion compounds to all connections</li>
                  <li>• Regular inspection and maintenance schedule essential</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarineGuidance;