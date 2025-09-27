import InfoBox from "@/components/common/InfoBox";
import { ExternalLink, BookOpen, Shield, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const R1R2Standards = () => {
  return (
    <div className="space-y-6">
      {/* BS7671 Regulatory References */}
      <InfoBox
        title="BS7671 Regulatory Framework"
        icon={<BookOpen className="h-5 w-5 text-blue-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div>
                <Badge className="bg-blue-500/20 text-blue-300 mb-2">Chapter 54</Badge>
                <p className="text-xs">
                  <strong>Earthing arrangements and protective conductors:</strong> Requirements for 
                  protective conductor sizing, installation, and continuity.
                </p>
              </div>
              
              <div>
                <Badge className="bg-green-500/20 text-green-300 mb-2">Regulation 543.7</Badge>
                <p className="text-xs">
                  <strong>Protective conductor continuity:</strong> Every protective conductor must 
                  be protected against mechanical damage and deterioration.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <Badge className="bg-yellow-500/20 text-yellow-300 mb-2">Table 54.7</Badge>
                <p className="text-xs">
                  <strong>Minimum cross-sectional area of protective conductors:</strong> 
                  Defines minimum CPC sizes relative to line conductor areas.
                </p>
              </div>
              
              <div>
                <Badge className="bg-orange-500/20 text-orange-300 mb-2">Part 6</Badge>
                <p className="text-xs">
                  <strong>Inspection and testing:</strong> Procedures for initial verification 
                  and periodic inspection, including R1+R2 testing requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </InfoBox>

      {/* Testing Requirements */}
      <InfoBox
        title="Testing Requirements & Procedures"
        icon={<Shield className="h-5 w-5 text-green-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="bg-elec-dark/50 rounded p-4">
            <h4 className="text-elec-yellow font-medium mb-3">BS7671 Testing Sequence</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <h5 className="text-sm font-medium text-elec-light mb-1">Test 1: Continuity</h5>
                <ul className="text-xs space-y-0.5 text-muted-foreground">
                  <li>• Protective conductor continuity (R2)</li>
                  <li>• Ring final circuit continuity (R1, R2, Rn)</li>
                  <li>• R1+R2 at each point on radial circuits</li>
                  <li>• Test voltage: Low voltage DC (4-24V)</li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-elec-light mb-1">When to Test</h5>
                <ul className="text-xs space-y-0.5 text-muted-foreground">
                  <li>• Initial verification of new installations</li>
                  <li>• After alterations or additions</li>
                  <li>• Periodic inspection and testing</li>
                  <li>• After repair of protective conductors</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-200 text-xs">
              <strong>Regulation 611.2:</strong> Every installation shall, during erection and on completion, 
              be inspected and tested to verify compliance with BS 7671.
            </p>
          </div>
        </div>
      </InfoBox>

      {/* Protective Conductor Requirements */}
      <InfoBox
        title="Protective Conductor Design Requirements"
        icon={<AlertTriangle className="h-5 w-5 text-yellow-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="bg-elec-dark/30 border-elec-yellow/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-elec-light text-sm">Adiabatic Equation (543.1.3)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs space-y-2">
                  <p><strong>Formula:</strong> S = √(I²t) / k</p>
                  <div className="space-y-1">
                    <p>• <strong>S:</strong> Minimum CPC cross-sectional area (mm²)</p>
                    <p>• <strong>I:</strong> Fault current (A)</p>
                    <p>• <strong>t:</strong> Disconnection time (s)</p>
                    <p>• <strong>k:</strong> Material factor</p>
                  </div>
                  <p className="text-yellow-200">
                    Ensures CPC can withstand fault current without overheating.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-elec-dark/30 border-elec-yellow/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-elec-light text-sm">Material K Factors (Table 54.4)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs space-y-2">
                  <p><strong>Copper conductors:</strong></p>
                  <div className="space-y-1">
                    <p>• PVC insulation: k = 115</p>
                    <p>• XLPE insulation: k = 143</p>
                    <p>• Bare conductor: k = 228</p>
                  </div>
                  <p><strong>Aluminium conductors:</strong></p>
                  <div className="space-y-1">
                    <p>• PVC insulation: k = 76</p>
                    <p>• XLPE insulation: k = 94</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </InfoBox>

      {/* Test Equipment Standards */}
      <InfoBox
        title="Test Equipment & Safety Standards"
        icon={<Shield className="h-5 w-5 text-elec-yellow" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="bg-elec-dark/50 rounded p-4">
            <h4 className="text-elec-yellow font-medium mb-3">GS 38 Requirements</h4>
            <div className="space-y-3">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                <p className="text-yellow-200 text-xs mb-2">
                  <strong>Test Equipment Safety:</strong> Electrical test equipment for use by electricians
                </p>
                <div className="grid gap-2 sm:grid-cols-2 text-xs">
                  <div>
                    <p><strong>Test leads:</strong> Insulated to at least 500V</p>
                    <p><strong>Probe tips:</strong> Maximum 2mm exposed metal</p>
                  </div>
                  <div>
                    <p><strong>Fused leads:</strong> Current-limiting for safety</p>
                    <p><strong>Regular calibration:</strong> Annual verification required</p>
                  </div>
                </div>
              </div>
              
              <div className="text-xs space-y-1">
                <p><strong>Continuity tester requirements:</strong></p>
                <ul className="list-disc pl-5 space-y-0.5">
                  <li>Open circuit voltage between 4V and 24V DC</li>
                  <li>Short circuit current not less than 200mA</li>
                  <li>Capable of measuring to 0.01Ω resolution</li>
                  <li>Lead resistance compensation facility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </InfoBox>

      {/* Conductor Resistivity Standards */}
      <InfoBox
        title="Conductor Resistivity Standards"
        icon={<ExternalLink className="h-5 w-5 text-blue-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="bg-elec-dark/50 rounded p-4">
            <h4 className="text-elec-yellow font-medium mb-3">BS EN 60228 Standard</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h5 className="text-sm font-medium text-elec-light mb-2">Copper Conductors</h5>
                <ul className="text-xs space-y-1">
                  <li>• Resistivity at 20°C: 17.241 nΩ·m</li>
                  <li>• Temperature coefficient: 0.00393/°C</li>
                  <li>• Standard for electrical installations</li>
                  <li>• Most common conductor material</li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-elec-light mb-2">Aluminium Conductors</h5>
                <ul className="text-xs space-y-1">
                  <li>• Resistivity at 20°C: 28.264 nΩ·m</li>
                  <li>• Temperature coefficient: 0.00403/°C</li>
                  <li>• Used in larger installations</li>
                  <li>• Requires larger CSA for same resistance</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 mt-3">
              <p className="text-blue-200 text-xs">
                <strong>Practical impact:</strong> These standard values ensure consistent calculations 
                across the industry and compatibility with protective device characteristics.
              </p>
            </div>
          </div>
        </div>
      </InfoBox>

      {/* Testing Frequencies */}
      <InfoBox
        title="Testing Frequencies & Documentation"
        icon={<BookOpen className="h-5 w-5 text-elec-yellow" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              <h4 className="text-elec-yellow font-medium">Initial Verification</h4>
              <ul className="text-xs space-y-1">
                <li>• <strong>New installations:</strong> 100% of circuits tested</li>
                <li>• <strong>Alterations:</strong> Affected circuits and associated protective conductors</li>
                <li>• <strong>Additions:</strong> New circuits plus verification of existing earthing</li>
                <li>• <strong>Documentation:</strong> Electrical Installation Certificate required</li>
              </ul>
              
              <h4 className="text-elec-yellow font-medium mt-4">Periodic Inspection</h4>
              <ul className="text-xs space-y-1">
                <li>• <strong>Domestic:</strong> 10 years (or 5 years if rented)</li>
                <li>• <strong>Commercial:</strong> 5 years typical</li>
                <li>• <strong>Industrial:</strong> 3 years typical</li>
                <li>• <strong>Special locations:</strong> Annual or more frequent</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-elec-yellow font-medium">Test Records</h4>
              <div className="bg-gray-500/10 border border-gray-500/30 rounded p-3">
                <p className="text-xs mb-2"><strong>Required information:</strong></p>
                <ul className="text-xs space-y-1">
                  <li>• Circuit identification</li>
                  <li>• R1+R2 measured values at each outlet</li>
                  <li>• Test instrument details and calibration</li>
                  <li>• Environmental conditions during test</li>
                  <li>• Any deviations or limitations</li>
                  <li>• Recommendations for remedial work</li>
                </ul>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                <p className="text-blue-200 text-xs">
                  <strong>Legal requirement:</strong> Test results must be provided to client 
                  and retained for reference during periodic inspections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </InfoBox>

      {/* Related Standards */}
      <InfoBox
        title="Related Standards & References"
        icon={<BookOpen className="h-5 w-5 text-elec-yellow" />}
        as="section"
      >
        <div className="space-y-3 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-elec-yellow">British Standards</h5>
              <ul className="text-xs space-y-1">
                <li>• BS 7671: Requirements for electrical installations</li>
                <li>• BS EN 60228: Conductors of insulated cables</li>
                <li>• BS EN 61557: Electrical safety testing equipment</li>
                <li>• GS 38: Electrical test equipment safety</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-elec-yellow">Industry Guidance</h5>
              <ul className="text-xs space-y-1">
                <li>• IET Code of Practice: Inspection and testing</li>
                <li>• IET Guidance Note 3: Inspection and testing</li>
                <li>• NICEIC Technical Manual</li>
                <li>• NAPIT Technical Bulletins</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-500/10 border border-gray-500/30 rounded p-3">
            <p className="text-gray-300 text-xs">
              <strong>Note:</strong> This calculator and guidance is based on BS7671:2018+A3:2024. 
              Always refer to the latest edition of relevant standards and seek advice from 
              qualified persons for complex installations.
            </p>
          </div>
        </div>
      </InfoBox>
    </div>
  );
};

export default R1R2Standards;