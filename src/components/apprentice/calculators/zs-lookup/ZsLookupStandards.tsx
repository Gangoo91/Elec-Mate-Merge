import InfoBox from "@/components/common/InfoBox";
import { ExternalLink, BookOpen, Shield, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ZsLookupStandards = () => {
  return (
    <div className="space-y-6">
      {/* BS7671 Regulatory References */}
      <InfoBox
        title="BS7671 Regulatory References"
        icon={<BookOpen className="h-5 w-5 text-blue-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div>
                <Badge className="bg-blue-500/20 text-blue-300 mb-2">Regulation 411.4.5</Badge>
                <p className="text-xs">
                  <strong>Automatic disconnection requirement:</strong> Protective devices must disconnect 
                  supply within specified time when earth fault occurs.
                </p>
              </div>
              
              <div>
                <Badge className="bg-green-500/20 text-green-300 mb-2">Table 41.2</Badge>
                <p className="text-xs">
                  <strong>Maximum disconnection times:</strong> 0.4s for final circuits ≤32A, 
                  5s for distribution circuits.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <Badge className="bg-yellow-500/20 text-yellow-300 mb-2">Table 41.3</Badge>
                <p className="text-xs">
                  <strong>MCB/RCBO values:</strong> Maximum earth fault loop impedance for 
                  circuit breakers to BS EN 60898 and BS EN 61009.
                </p>
              </div>
              
              <div>
                <Badge className="bg-orange-500/20 text-orange-300 mb-2">Table 41.4</Badge>
                <p className="text-xs">
                  <strong>Fuse values:</strong> Maximum earth fault loop impedance for 
                  general purpose and HRC fuses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </InfoBox>

      {/* Disconnection Time Requirements */}
      <InfoBox
        title="Understanding Disconnection Time Requirements"
        icon={<Shield className="h-5 w-5 text-green-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="bg-elec-dark/50 rounded p-4">
            <h4 className="text-elec-yellow font-medium mb-3">Why These Time Limits?</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <h5 className="text-sm font-medium text-elec-light mb-1">0.4 Second Limit (Final Circuits)</h5>
                <ul className="text-xs space-y-0.5 text-muted-foreground">
                  <li>• Prevents dangerous electric shock</li>
                  <li>• Based on body impedance studies</li>
                  <li>• Critical for socket outlets, hand-held equipment</li>
                  <li>• Applies to circuits ≤32A serving final distribution</li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-elec-light mb-1">5 Second Limit (Distribution)</h5>
                <ul className="text-xs space-y-0.5 text-muted-foreground">
                  <li>• Prevents fire risk from sustained fault current</li>
                  <li>• Allows for selective discrimination</li>
                  <li>• Protects fixed wiring and equipment</li>
                  <li>• Distribution boards, sub-mains, fixed equipment</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-200 text-xs">
              <strong>International basis:</strong> These requirements align with IEC 60364 international 
              standards and extensive research into electrical safety thresholds.
            </p>
          </div>
        </div>
      </InfoBox>

      {/* Origin of Zs Values */}
      <InfoBox
        title="Origin of BS7671 Zs Values"
        icon={<AlertTriangle className="h-5 w-5 text-yellow-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="bg-elec-dark/30 border-elec-yellow/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-elec-light text-sm">Calculation Method</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs space-y-2">
                  <p><strong>Formula:</strong> Zs = Uo / Ia</p>
                  <div className="space-y-1">
                    <p>• <strong>Uo:</strong> Nominal voltage to earth (230V)</p>
                    <p>• <strong>Ia:</strong> Current causing automatic operation in specified time</p>
                  </div>
                  <p className="text-yellow-200">
                    Values derived from device manufacturer test data and BS/EN standards.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-elec-dark/30 border-elec-yellow/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-elec-light text-sm">Temperature Considerations</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs space-y-2">
                  <p><strong>Standard conditions:</strong></p>
                  <div className="space-y-1">
                    <p>• Conductor at 70°C (normal operating temp)</p>
                    <p>• Ambient temperature: 20°C</p>
                    <p>• No derating factors applied</p>
                  </div>
                  <p className="text-yellow-200">
                    80% test factor accounts for temperature rise under fault conditions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </InfoBox>

      {/* TT System Considerations */}
      <InfoBox
        title="TT System Special Requirements"
        icon={<Shield className="h-5 w-5 text-elec-yellow" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="bg-elec-dark/50 rounded p-4">
            <h4 className="text-elec-yellow font-medium mb-3">TT System RCD Verification</h4>
            <div className="space-y-3">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                <p className="text-yellow-200 text-xs mb-2">
                  <strong>Key Requirement:</strong> RA × IΔn ≤ 50V
                </p>
                <div className="grid gap-2 sm:grid-cols-2 text-xs">
                  <div>
                    <p><strong>RA:</strong> Earth electrode resistance (Ω)</p>
                    <p><strong>IΔn:</strong> RCD rated residual current (A)</p>
                  </div>
                  <div>
                    <p><strong>50V:</strong> Maximum touch voltage</p>
                    <p><strong>Example:</strong> If RA = 100Ω, need IΔn ≤ 500mA</p>
                  </div>
                </div>
              </div>
              
              <div className="text-xs space-y-1">
                <p><strong>Why this matters:</strong> In TT systems, fault current may be limited by earth electrode resistance.</p>
                <p>Standard Zs tables don't apply - RCD must operate before dangerous voltages develop.</p>
              </div>
            </div>
          </div>
        </div>
      </InfoBox>

      {/* Voltage Factors */}
      <InfoBox
        title="Voltage Factor Considerations"
        icon={<ExternalLink className="h-5 w-5 text-blue-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="bg-elec-dark/50 rounded p-4">
            <h4 className="text-elec-yellow font-medium mb-3">Standard vs Actual Voltages</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h5 className="text-sm font-medium text-elec-light mb-2">BS7671 Standard Values</h5>
                <ul className="text-xs space-y-1">
                  <li>• Single phase: 230V nominal</li>
                  <li>• Three phase: 400V nominal</li>
                  <li>• Based on European harmonisation</li>
                  <li>• Tables calculated for these voltages</li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-elec-light mb-2">UK Supply Reality</h5>
                <ul className="text-xs space-y-1">
                  <li>• Declared voltage: 230V ±10%</li>
                  <li>• Actual supply often ~240V</li>
                  <li>• Higher voltage = higher fault current</li>
                  <li>• Additional safety margin in practice</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 mt-3">
              <p className="text-blue-200 text-xs">
                <strong>Practical impact:</strong> UK supply voltages typically provide additional safety margin 
                over BS7671 calculated values, but design should still use standard 230V figures.
              </p>
            </div>
          </div>
        </div>
      </InfoBox>

      {/* Related Standards */}
      <InfoBox
        title="Related Standards & Documents"
        icon={<BookOpen className="h-5 w-5 text-elec-yellow" />}
        as="section"
      >
        <div className="space-y-3 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-elec-yellow">Device Standards</h5>
              <ul className="text-xs space-y-1">
                <li>• BS EN 60898: MCBs for household use</li>
                <li>• BS EN 61009: RCBOs for household use</li>
                <li>• BS 88: HRC fuses</li>
                <li>• BS 1361: Cartridge fuses (domestic)</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-elec-yellow">Test Standards</h5>
              <ul className="text-xs space-y-1">
                <li>• GS 38: Test equipment safety</li>
                <li>• BS 7671 Part 6: Inspection & testing</li>
                <li>• IET Code of Practice: Testing procedures</li>
                <li>• NICEIC/NAPIT: Industry guidance</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-500/10 border border-gray-500/30 rounded p-3">
            <p className="text-gray-300 text-xs">
              <strong>Note:</strong> This tool provides guidance based on BS7671:2018+A3:2024. 
              Always refer to the latest edition of BS7671 and relevant standards for authoritative requirements.
            </p>
          </div>
        </div>
      </InfoBox>
    </div>
  );
};

export default ZsLookupStandards;