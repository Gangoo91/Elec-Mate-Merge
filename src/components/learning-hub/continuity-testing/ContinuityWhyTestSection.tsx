
import React from 'react';
import { AlertTriangle, Shield, Heart, Zap, Users, TrendingUp, Activity, BookOpen, Brain } from 'lucide-react';

const ContinuityWhyTestSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-red-500/10 border border-red-500/20 border-l-4 border-l-red-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-red-400">Critical Safety Protection</h4>
      </div>
      <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white leading-relaxed">
        <div className="flex items-start gap-2">
          <Heart className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Ensures Protective Conductor Integrity</p>
            <p>Protective conductors must provide a continuous low-resistance path for fault currents. A broken or high-resistance protective conductor cannot safely carry fault currents to earth, potentially leaving metalwork at dangerous potentials during fault conditions.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Enables Automatic Disconnection</p>
            <p>For automatic disconnection of supply (ADS) to operate effectively, protective conductors must have sufficiently low resistance. High resistance prevents adequate fault current flow, potentially causing protective devices to fail to operate within required time limits.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Users className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Protects Against Electric Shock</p>
            <p>Continuity testing verifies that exposed-conductive-parts are effectively connected to earth. Without proper continuity, these parts could remain at dangerous potentials during fault conditions, creating serious shock hazards for users.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Zap className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Validates Design Calculations</p>
            <p>Measured R1+R2 values are essential for verifying that calculated fault currents are achievable in practice. This ensures that protective device characteristics will provide adequate protection as designed.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-blue-400">Understanding Fault Current Paths</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">How protective conductors work in fault conditions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-blue-400 mb-2">Normal Operation:</p>
              <div className="space-y-1 text-xs">
                <p>• Current flows through phase conductor to load</p>
                <p>• Returns via neutral conductor to source</p>
                <p>• Protective conductor carries no current</p>
                <p>• Exposed metalwork remains at earth potential</p>
                <p>• No potential difference between metalwork and earth</p>
              </div>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-blue-400 mb-2">Fault Condition:</p>
              <div className="space-y-1 text-xs">
                <p>• Phase conductor contacts exposed metalwork</p>
                <p>• Fault current flows through protective conductor</p>
                <p>• Protective device must operate within time limits</p>
                <p>• Higher fault current = faster disconnection</p>
                <p>• Low resistance path essential for safety</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
          <p className="font-medium text-green-400 mb-2">The Physics of Fault Protection:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Ohm's Law in Fault Conditions:</p>
              <p>• Fault Current (If) = Supply Voltage (U0) ÷ Total Loop Impedance (Zs)</p>
              <p>• Zs = Ze + R1 + R2 (external + phase + protective conductor)</p>
              <p>• Lower R1+R2 = Higher fault current = Faster disconnection</p>
              <p>• Protective conductor resistance (R2) is critical component</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Time/Current Relationship:</p>
              <p>• BS 7671 requires disconnection within 0.4s (final circuits)</p>
              <p>• Higher fault currents operate protective devices faster</p>
              <p>• Broken protective conductor = infinite resistance</p>
              <p>• No fault current = no automatic disconnection</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Brain className="h-4 w-4 text-orange-400" />
        <h4 className="font-medium text-orange-400">Common Failure Modes</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Real-world protective conductor failures:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="space-y-2">
              <p>• <strong>Mechanical damage:</strong> Cables crushed, cut, or severed during installation</p>
              <p>• <strong>Corrosion:</strong> Damp conditions causing conductor deterioration</p>
              <p>• <strong>Loose connections:</strong> High resistance joints at terminals</p>
              <p>• <strong>Installation errors:</strong> Incorrect termination or routing</p>
            </div>
            <div className="space-y-2">
              <p>• <strong>Thermal damage:</strong> Overheating from poor connections</p>
              <p>• <strong>Rodent damage:</strong> Cables chewed by pests</p>
              <p>• <strong>Age-related failure:</strong> Insulation breakdown affecting conductor</p>
              <p>• <strong>Inadequate sizing:</strong> Undersized conductors with excessive resistance</p>
            </div>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
          <p className="font-medium text-red-400 mb-2">Consequences of Inadequate Continuity:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-foreground mb-1">Immediate Dangers:</p>
              <p>• Exposed metalwork at dangerous potentials</p>
              <p>• Electric shock from normally safe surfaces</p>
              <p>• Protective devices fail to operate</p>
              <p>• Sustained fault conditions</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Progressive Risks:</p>
              <p>• Electrical fires from sustained arcing</p>
              <p>• Equipment damage from fault currents</p>
              <p>• System instability and power quality issues</p>
              <p>• Cascading failures in interconnected systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Case Studies: When Testing Saves Lives</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Case 1: Commercial Kitchen Equipment Fault</p>
          <p className="mb-2">A commercial kitchen's stainless steel worktop became live due to a faulty appliance connection:</p>
          <div className="ml-4 space-y-1">
            <p className="text-red-400">• <strong>Fault:</strong> Protective conductor broken in appliance plug</p>
            <p className="text-red-400">• <strong>Consequence:</strong> Kitchen staff received shocks from worktop</p>
            <p className="text-green-400">• <strong>Detection:</strong> Continuity testing revealed open circuit</p>
            <p className="text-blue-400">• <strong>Outcome:</strong> Immediate repair prevented serious injury</p>
          </div>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Case 2: Industrial Motor Installation</p>
          <p className="mb-2">High-power motor installation with inadequate protective conductor sizing:</p>
          <div className="ml-4 space-y-1">
            <p className="text-red-400">• <strong>Fault:</strong> Undersized CPC with excessive resistance</p>
            <p className="text-red-400">• <strong>Consequence:</strong> Motor casing became live during earth fault</p>
            <p className="text-green-400">• <strong>Detection:</strong> R1+R2 measurement exceeded maximum values</p>
            <p className="text-blue-400">• <strong>Outcome:</strong> Protective conductor upgraded before energisation</p>
          </div>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Case 3: Domestic Ring Circuit Failure</p>
          <p className="mb-2">Ring final circuit with broken protective conductor continuity:</p>
          <div className="ml-4 space-y-1">
            <p className="text-red-400">• <strong>Fault:</strong> CPC severed during cavity wall insulation work</p>
            <p className="text-red-400">• <strong>Consequence:</strong> Socket outlets beyond break had no earth protection</p>
            <p className="text-green-400">• <strong>Detection:</strong> Continuity test revealed infinite resistance</p>
            <p className="text-blue-400">• <strong>Outcome:</strong> Cable replacement restored safety</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">Regulatory and Professional Requirements</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">UK Legal and Standards Framework:</p>
          <div className="ml-4 space-y-1">
            <p>• <strong>BS 7671:18+A3:2024:</strong> Regulation 612.2 - Continuity of protective conductors</p>
            <p>• <strong>Electricity at Work Regulations 1989:</strong> Regulation 4 - Systems to be safe</p>
            <p>• <strong>Building Regulations Part P:</strong> Electrical safety in dwellings</p>
            <p>• <strong>IET Guidance Note 3:</strong> Inspection & Testing procedures</p>
            <p>• <strong>Health and Safety at Work Act 1974:</strong> Duty of care requirements</p>
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground">Professional Standards:</p>
          <div className="ml-4 space-y-1">
            <p>• <strong>Competent Person Schemes:</strong> NICEIC, NAPIT, ELECSA requirements</p>
            <p>• <strong>City & Guilds 2391:</strong> Inspection and testing qualification</p>
            <p>• <strong>IET Code of Practice:</strong> Professional competence standards</p>
            <p>• <strong>JIB Handbook:</strong> Industry recognised procedures</p>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          <p className="font-medium text-yellow-400 mb-2">Certification Requirements:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-foreground mb-1">Initial Verification:</p>
              <p>• All protective conductors must be tested</p>
              <p>• Results recorded on schedule of test results</p>
              <p>• Electrical Installation Certificate required</p>
              <p>• Building Control notification where applicable</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Periodic Inspection:</p>
              <p>• Protective conductor integrity verification</p>
              <p>• Comparison with previous test results</p>
              <p>• Electrical Installation Condition Report</p>
              <p>• Recommendations for remedial action</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContinuityWhyTestSection;
