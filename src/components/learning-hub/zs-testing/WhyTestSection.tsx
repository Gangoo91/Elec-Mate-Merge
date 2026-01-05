
import React from 'react';
import { AlertTriangle, Shield, Zap, Clock, Users, TrendingUp, Activity, BookOpen } from 'lucide-react';

const WhyTestSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-red-500/10 border border-red-500/20 border-l-4 border-l-red-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-red-400">Critical Life Safety Requirement</h4>
      </div>
      <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white leading-relaxed">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Automatic Disconnection of Supply (ADS)</p>
            <p>Ensures protective devices operate within required disconnection times to prevent dangerous touch voltages persisting during earth faults. This is the primary method of protection against electric shock in most installations.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Disconnection Time Compliance</p>
            <p>Verifies that MCBs and fuses will disconnect within 0.4s (socket outlets) or 5s (fixed equipment) as required by BS 7671 Regulation 411.3.2. These times are based on physiological research into safe shock duration limits.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Zap className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Fault Current Adequacy</p>
            <p>Confirms sufficient fault current flows to operate protective devices reliably under all installation conditions. Insufficient fault current means protective devices may not operate at all, leaving dangerous voltages present indefinitely.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Users className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Public Safety Assurance</p>
            <p>Protects users from electric shock by ensuring dangerous voltages cannot persist during earth fault conditions. This protects both competent electrical workers and members of the public who may come into contact with the installation.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-blue-400">The Physics of Earth Fault Loop Impedance</h4>
      </div>
      <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white leading-relaxed">
        <div>
          <p className="font-medium text-foreground">Understanding the complete fault path:</p>
          <p className="ml-4">• <strong>Source impedance (Ze):</strong> External supply network resistance</p>
          <p className="ml-4">• <strong>Phase conductor (R1):</strong> Resistance from origin to fault point</p>
          <p className="ml-4">• <strong>CPC resistance (R2):</strong> Return path through protective conductor</p>
          <p className="ml-4">• <strong>Total loop (Zs):</strong> Ze + R1 + R2 (simplified for resistive circuits)</p>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Ohm's Law Application:</p>
          <div className="text-center text-lg font-mono text-blue-400 mb-2">
            Fault Current (If) = Supply Voltage (U₀) ÷ Earth Fault Loop Impedance (Zs)
          </div>
          <p className="text-center text-sm">
            For UK single-phase: If = 230V ÷ Zs
          </p>
        </div>
        <div>
          <p className="font-medium text-foreground">Protective device operation requirements:</p>
          <p className="ml-4">• <strong>MCB magnetic operation:</strong> Typically 5-10 times rated current</p>
          <p className="ml-4">• <strong>BS EN 60898 Type B MCB:</strong> 5 × In instantaneous trip</p>
          <p className="ml-4">• <strong>BS EN 60898 Type C MCB:</strong> 10 × In instantaneous trip</p>
          <p className="ml-4">• <strong>BS 88 fuses:</strong> Variable characteristics based on fuse rating</p>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 border-l-4 border-l-orange-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-orange-400">Disconnection Time Requirements Explained</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
        <div className="bg-card rounded p-3">
          <div className="text-orange-400 font-medium mb-2">Socket Outlet Circuits (0.4s max)</div>
          <ul className="space-y-1">
            <li>• <strong>Reason:</strong> High accessibility and mobility risk</li>
            <li>• Portable appliances can be moved while plugged in</li>
            <li>• Increased chance of simultaneous contact</li>
            <li>• Wet conditions possible (kitchens, utility rooms)</li>
            <li>• Hand-held equipment creates direct contact risk</li>
            <li>• Children and untrained persons have access</li>
          </ul>
        </div>
        <div className="bg-card rounded p-3">
          <div className="text-orange-400 font-medium mb-2">Fixed Equipment Circuits (5s max)</div>
          <ul className="space-y-1">
            <li>• <strong>Reason:</strong> Lower accessibility and contact probability</li>
            <li>• Equipment normally out of reach or enclosed</li>
            <li>• Reduced likelihood of accidental contact</li>
            <li>• More predictable installation conditions</li>
            <li>• Typically only accessed by competent persons</li>
            <li>• Fixed mounting reduces movement during faults</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          <p className="font-medium text-yellow-400 mb-2">Special Location Requirements:</p>
          <p className="text-sm text-white">
            Bathrooms (Section 701), swimming pools (Section 702), construction sites (Section 704), and other special locations 
            typically require 0.4s disconnection for all circuits due to increased shock risk from reduced body resistance in wet conditions or harsh environments.
          </p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded p-3">
          <p className="font-medium text-purple-400 mb-2">Medical Locations (Section 710):</p>
          <p className="text-sm text-white">
            Medical locations may require even shorter disconnection times or additional protective measures such as medical IT systems, 
            due to the critical nature of patient safety and the presence of life-supporting equipment.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Real-World Failure Scenarios and Consequences</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Scenario 1: High Zs = Inadequate Fault Current</p>
          <p className="mb-2">A 32A Type B MCB protecting a ring final circuit requires 160A fault current for 0.4s disconnection.</p>
          <p className="mb-2">If Zs = 2.0Ω (exceeds BS 7671 limit of 1.44Ω):</p>
          <div className="ml-4 space-y-1">
            <p className="text-red-400">• Fault current = 230V ÷ 2.0Ω = 115A (insufficient for magnetic trip)</p>
            <p className="text-red-400">• MCB relies on thermal trip - may take several seconds or minutes</p>
            <p className="text-red-400">• Dangerous touch voltages persist during entire trip time</p>
            <p className="text-red-400">• Risk of electrocution, fire, or equipment damage</p>
            <p className="text-red-400">• Potential for arc formation and consequential fire</p>
          </div>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Scenario 2: Acceptable Zs = Adequate Protection</p>
          <p className="mb-2">Same 32A MCB with compliant installation:</p>
          <p className="mb-2">If Zs = 1.2Ω (within BS 7671 limit of 1.44Ω):</p>
          <div className="ml-4 space-y-1">
            <p className="text-green-400">• Fault current = 230V ÷ 1.2Ω = 192A (exceeds 160A magnetic trip threshold)</p>
            <p className="text-green-400">• MCB trips magnetically in &lt;0.4s reliably</p>
            <p className="text-green-400">• Touch voltages limited to safe levels and duration</p>
            <p className="text-green-400">• Full protection achieved as per BS 7671 requirements</p>
            <p className="text-green-400">• Installation safe for normal use</p>
          </div>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Scenario 3: Marginal Zs Values</p>
          <p className="mb-2">When Zs approaches but doesn't exceed limits:</p>
          <div className="ml-4 space-y-1">
            <p className="text-yellow-400">• Protection may be unreliable under all conditions</p>
            <p className="text-yellow-400">• Voltage variations may affect fault current</p>
            <p className="text-yellow-400">• Temperature changes affect conductor resistance</p>
            <p className="text-yellow-400">• Consider remedial action even if technically compliant</p>
            <p className="text-yellow-400">• Document concerns for future reference</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">Legal and Regulatory Framework</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Primary legislation and standards:</p>
          <p className="ml-4">• <strong>BS 7671 Regulation 612.9:</strong> Mandatory test for verification of ADS</p>
          <p className="ml-4">• <strong>BS 7671 Regulation 411.3:</strong> Requirements for automatic disconnection</p>
          <p className="ml-4">• <strong>Electricity at Work Regulations 1989:</strong> Duty to maintain safe electrical systems</p>
          <p className="ml-4">• <strong>IET Guidance Note 3:</strong> Detailed inspection and testing procedures</p>
          <p className="ml-4">• <strong>Health and Safety at Work Act 1974:</strong> General duty of care</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Professional and commercial implications:</p>
          <p className="ml-4">• <strong>Insurance requirements:</strong> Valid electrical certificates often mandatory</p>
          <p className="ml-4">• <strong>Legal liability:</strong> Prosecution possible if accidents occur due to non-compliance</p>
          <p className="ml-4">• <strong>Professional responsibility:</strong> Competent persons must ensure compliance</p>
          <p className="ml-4">• <strong>Building regulations:</strong> Part P compliance in domestic premises</p>
          <p className="ml-4">• <strong>Landlord obligations:</strong> Electrical safety certificates required</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
          <p className="font-medium text-red-400 mb-2">Consequences of Non-Compliance:</p>
          <div className="space-y-1 text-sm">
            <p>• Criminal prosecution under Electricity at Work Regulations</p>
            <p>• Unlimited fines for corporate offences</p>
            <p>• Personal prosecution of responsible individuals</p>
            <p>• Professional body disciplinary action</p>
            <p>• Insurance claim refusal</p>
            <p>• Premises closure orders</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">Additional Protection Methods</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">When Zs limits cannot be met:</p>
          <p className="ml-4">• <strong>RCD protection:</strong> 30mA RCDs provide additional shock protection</p>
          <p className="ml-4">• <strong>Supplementary bonding:</strong> In special locations where required</p>
          <p className="ml-4">• <strong>SELV/PELV systems:</strong> Safety extra-low voltage applications</p>
          <p className="ml-4">• <strong>Class II equipment:</strong> Double or reinforced insulation</p>
          <p className="ml-4">• <strong>Electrical separation:</strong> Isolating transformer systems</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          <p className="font-medium text-yellow-400 mb-2">RCD Limitation:</p>
          <p className="text-sm text-white">
            RCDs provide additional protection but cannot replace the requirement for ADS compliance. 
            They protect against earth leakage currents but may not operate for phase-to-phase or phase-to-neutral faults.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default WhyTestSection;
