import { Settings, Shield, AlertTriangle, CheckCircle, Eye, Zap, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { InitialInspectionQuickCheck } from './InitialInspectionQuickCheck';
import { VisualChecksQuickCheck } from './VisualChecksQuickCheck';
import { ElectricalVerificationQuickCheck } from './ElectricalVerificationQuickCheck';
import { LuminaireComplianceQuickCheck } from './LuminaireComplianceQuickCheck';

export const EmergencyLightingModule5Section1Content = () => {
  const visualChecks = [
    {
      type: "Cabling Compliance",
      description: "Verify correct cable type (fire-resistant, LSZH, MICC where specified in design)"
    },
    {
      type: "Physical Installation", 
      description: "Check supports, fixings are non-combustible and compliant with BS 7671 Reg. 521.10.202"
    },
    {
      type: "Circuit Segregation",
      description: "Confirm emergency circuits are kept separate from normal lighting supply"
    },
    {
      type: "System Labelling",
      description: "All circuits, distribution boards, and luminaires correctly identified and labelled"
    }
  ];

  const electricalTests = [
    {
      test: "Continuity",
      purpose: "Verify conductor connections are intact",
      requirement: "Test all protective conductors and circuit conductors"
    },
    {
      test: "Insulation Resistance", 
      purpose: "Ensure adequate insulation between conductors",
      requirement: "Minimum 1MΩ between conductors and earth"
    },
    {
      test: "Polarity",
      purpose: "Confirm live and neutral correctly connected",
      requirement: "Correct polarity at every luminaire and connection point"
    },
    {
      test: "Earth Fault Loop Impedance",
      purpose: "Ensure protective device will operate",
      requirement: "Within acceptable limits for disconnection times"
    }
  ];

  const inspectionSequence = [
    { step: 1, action: "Review design drawings", status: "Complete before site work" },
    { step: 2, action: "Visual and physical inspection", status: "Before energising" },
    { step: 3, action: "Electrical verification testing", status: "Current step" },
    { step: 4, action: "Luminaire function checks", status: "After electrical tests pass" },
    { step: 5, action: "Documentation and certification", status: "Final step before handover" }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-8">
          <Settings className="h-8 w-8 text-elec-yellow flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Technical Content
            </h2>
            <p className="text-base sm:text-lg text-foreground">
              Detailed guidance on initial inspection and verification procedures
            </p>
          </div>
        </div>
        
        {/* Section 1: Purpose of Initial Inspection */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center">
              <span className="text-elec-dark font-bold text-sm">1</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Purpose of Initial Inspection
            </h3>
          </div>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              Initial inspection and verification is the systematic process of confirming that an emergency 
              lighting installation has been completed in accordance with the approved design, complies with 
              all relevant standards (BS 5266-1 and BS 7671), and is ready for commissioning. This stage is 
              mandatory before the system can be put into service.
            </p>
            <div className="flex items-start gap-3 bg-blue-600/10 border border-blue-600/20 rounded p-3 sm:p-4">
              <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm sm:text-base">
                <strong>Key Point:</strong> Without proper initial inspection, hidden faults may remain 
                undetected, potentially causing system failure during an emergency evacuation.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 sm:p-5">
              <CheckCircle className="h-6 w-6 text-green-400 mb-3" />
              <h4 className="text-green-200 font-medium mb-2 text-sm sm:text-base">Design Compliance</h4>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                Confirms the installation matches approved drawings and specifications in all respects
              </p>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 sm:p-5">
              <Eye className="h-6 w-6 text-blue-400 mb-3" />
              <h4 className="text-blue-200 font-medium mb-2 text-sm sm:text-base">Fault Identification</h4>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                Identifies installation defects, cable damage, or incorrect connections before energising
              </p>
            </div>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4 sm:p-5">
              <Zap className="h-6 w-6 text-yellow-400 mb-3" />
              <h4 className="text-yellow-200 font-medium mb-2 text-sm sm:text-base">System Integrity</h4>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                Provides assurance that protective measures and safety features will function correctly
              </p>
            </div>
            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4 sm:p-5">
              <Lightbulb className="h-6 w-6 text-purple-400 mb-3" />
              <h4 className="text-purple-200 font-medium mb-2 text-sm sm:text-base">Certification Basis</h4>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                Forms the foundation of commissioning documentation and handover certification
              </p>
            </div>
          </div>
        </div>

        <InitialInspectionQuickCheck />

        {/* Section 2: Visual and Physical Checks */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center">
              <span className="text-elec-dark font-bold text-sm">2</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Visual and Physical Checks
            </h3>
          </div>
          <div className="bg-[#323232] rounded-lg p-4 sm:p-6">
            <p className="text-foreground text-sm sm:text-base mb-4">
              Before any electrical testing or energisation, a comprehensive visual inspection must be 
              carried out to verify physical compliance and identify any obvious defects:
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {visualChecks.map((check, index) => (
                <div key={index} className="bg-elec-dark rounded-lg p-4 sm:p-5 border-l-4 border-elec-yellow/50">
                  <h4 className="text-foreground font-medium mb-2 text-sm sm:text-base">{check.type}</h4>
                  <p className="text-foreground text-xs sm:text-sm leading-relaxed">{check.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4 sm:p-6">
            <h4 className="text-foreground font-medium mb-3 text-sm sm:text-base">Escape Route Coverage Verification:</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 text-foreground">
                <span className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base">Luminaires positioned at all <strong>exit doors and emergency exits</strong></span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <span className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base">Illumination provided at <strong>changes of direction and intersections</strong></span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <span className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base">Coverage at <strong>stairways and level changes</strong> to prevent trip hazards</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <span className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base">Lighting near <strong>fire alarm call points and firefighting equipment</strong></span>
              </li>
            </ul>
          </div>

          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm sm:text-base leading-relaxed">
                <strong>Critical Requirement:</strong> BS 7671 Regulation 521.10.202 requires that fixings 
                and supports for emergency lighting cables must be non-combustible. Plastic clips and cable 
                ties are not acceptable for fire-resistant cable installations.
              </p>
            </div>
          </div>
        </div>

        <VisualChecksQuickCheck />

        {/* Section 3: Electrical Verification */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center">
              <span className="text-elec-dark font-bold text-sm">3</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Electrical Verification
            </h3>
          </div>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              Electrical verification testing confirms that all circuits are correctly installed, properly 
              connected, and safe to energise. These tests must be performed using calibrated test instruments 
              in accordance with BS 7671 requirements.
            </p>
          </div>

          <div className="space-y-3">
            {electricalTests.map((test, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                  <div className="flex-1">
                    <h4 className="text-elec-yellow font-medium mb-2 text-sm sm:text-base">{test.test}</h4>
                    <p className="text-foreground text-xs sm:text-sm mb-2">{test.purpose}</p>
                    <p className="text-foreground text-xs sm:text-sm">
                      <strong>Requirement:</strong> {test.requirement}
                    </p>
                  </div>
                  <div className="bg-elec-yellow/20 rounded px-3 py-1 self-start">
                    <span className="text-elec-yellow font-bold text-sm">Test {index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 sm:p-5">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              <strong>Additional Testing:</strong> For central battery systems or systems with monitoring 
              panels, verify functional connection of all monitoring and control wiring. Test communication 
              between luminaires and control equipment where applicable.
            </p>
          </div>
        </div>

        <ElectricalVerificationQuickCheck />

        {/* Section 4: Luminaire Verification */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center">
              <span className="text-elec-dark font-bold text-sm">4</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Luminaire Verification
            </h3>
          </div>
          <div className="bg-[#323232] rounded-lg p-4 sm:p-6">
            <p className="text-foreground text-sm sm:text-base mb-4">
              Each individual luminaire must be verified to ensure it is correctly installed, properly 
              connected, and compliant with design specifications:
            </p>
            
            <div className="space-y-4">
              <div className="bg-elec-dark rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-3 text-sm sm:text-base">Self-Contained Luminaires:</h4>
                <ul className="space-y-2 text-foreground text-xs sm:text-sm">
                  <li>• Verify correct type (maintained or non-maintained as per design specification)</li>
                  <li>• Check battery connections are secure and charging indicator is functioning</li>
                  <li>• Confirm emergency module is connected and showing charge status</li>
                  <li>• Test manual test switch operation (where fitted)</li>
                </ul>
              </div>

              <div className="bg-elec-dark rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-3 text-sm sm:text-base">Exit Signs and Directional Indicators:</h4>
                <ul className="space-y-2 text-foreground text-xs sm:text-sm">
                  <li>• Confirm signs face the correct direction for evacuation routes</li>
                  <li>• Verify use of ISO 7010 compliant pictograms (green running man symbol)</li>
                  <li>• Check visibility and clarity of signage from all approach angles</li>
                  <li>• Ensure mounting height complies with BS 5266-1 (typically 2m above floor level)</li>
                </ul>
              </div>

              <div className="bg-elec-dark rounded-lg p-4">
                <h4 className="text-elec-yellow font-medium mb-3 text-sm sm:text-base">Central Battery Systems:</h4>
                <ul className="space-y-2 text-foreground text-xs sm:text-sm">
                  <li>• Verify sub-circuit wiring is correctly terminated at central battery panel</li>
                  <li>• Check polarity of all connections to slave luminaires</li>
                  <li>• Confirm monitoring connections are functioning (if system includes monitoring)</li>
                  <li>• Test that luminaires illuminate when central supply is activated</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm sm:text-base leading-relaxed">
                <strong>Compliance Note:</strong> Exit signs must use the standardised ISO 7010 green 
                running man pictogram. Older "EXIT" text signs or non-standard symbols do not meet current 
                UK regulatory requirements.
              </p>
            </div>
          </div>
        </div>

        <LuminaireComplianceQuickCheck />

        {/* Inspection Sequence */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow flex items-center justify-center">
              <span className="text-elec-dark font-bold text-sm">5</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Initial Inspection Sequence
            </h3>
          </div>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {inspectionSequence.map((item, index) => (
                <div key={index} className={`flex items-center gap-4 p-3 rounded ${
                  item.status === 'Current step' ? 'bg-elec-yellow/20 border border-elec-yellow/30' : 
                  item.status === 'Complete before site work' || item.status === 'Before energising' ? 'bg-green-600/10 border border-green-600/20' : 
                  'bg-gray-600/10 border border-gray-600/20'
                }`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    item.status === 'Current step' ? 'bg-elec-yellow text-black' :
                    item.status === 'Complete before site work' || item.status === 'Before energising' ? 'bg-green-600 text-foreground' :
                    'bg-gray-600 text-foreground'
                  }`}>
                    {item.step}
                  </span>
                  <div className="flex-1">
                    <span className="text-foreground font-medium">{item.action}</span>
                    <p className={`text-xs ${
                      item.status === 'Current step' ? 'text-yellow-200' :
                      item.status === 'Complete before site work' || item.status === 'Before energising' ? 'text-green-200' :
                      'text-foreground'
                    }`}>
                      {item.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm sm:text-base leading-relaxed">
                <strong>Critical:</strong> If any inspection or verification test fails, the defect must be 
                rectified and re-tested before proceeding to the next stage. Never energise a system that has 
                failed inspection.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};