
import React from 'react';
import { Shield, AlertTriangle, Target, Clock, Zap, TrendingUp, CheckCircle2, Users, Building, Flame } from 'lucide-react';

const WhyTestSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-blue-400">Fundamental Safety Purpose</h4>
      </div>
      <div className="space-y-3 text-xs sm:text-sm text-white">
        <p>PFC testing is a critical safety verification that ensures protective devices can operate effectively during fault conditions. Without adequate fault current, protective devices may fail to disconnect dangerous circuits, leading to serious safety hazards.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-foreground mb-2">Personal Safety Protection:</p>
            <div className="space-y-1 text-xs">
              <p>• Prevents prolonged electric shock exposure</p>
              <p>• Ensures rapid disconnection during earth faults</p>
              <p>• Protects against touch voltages exceeding safe limits</p>
              <p>• Critical for automatic disconnection of supply (ADS)</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-foreground mb-2">Fire Prevention:</p>
            <div className="space-y-1 text-xs">
              <p>• Prevents dangerous arcing at fault locations</p>
              <p>• Limits thermal energy during fault conditions</p>
              <p>• Reduces risk of conductor overheating</p>
              <p>• Essential for electrical fire safety</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-red-500/10 border border-red-500/20 border-l-4 border-l-red-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-red-400">Consequences of Inadequate PFC</h4>
      </div>
      <div className="space-y-4 text-sm text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-3 w-3 text-red-400" />
              <p className="font-medium text-red-400">Human Safety Risks:</p>
            </div>
            <div className="space-y-1 text-xs">
              <p>• Extended shock duration (&gt;0.4 seconds)</p>
              <p>• Potential fatal electric shock incidents</p>
              <p>• Burns from touch voltages</p>
              <p>• False sense of protection security</p>
              <p>• Liability for accidents and injuries</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-3 w-3 text-red-400" />
              <p className="font-medium text-red-400">Fire Hazards:</p>
            </div>
            <div className="space-y-1 text-xs">
              <p>• Sustained arcing at fault points</p>
              <p>• Excessive heating of conductors</p>
              <p>• Ignition of surrounding materials</p>
              <p>• Damage to electrical equipment</p>
              <p>• Insurance claim complications</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <Building className="h-3 w-3 text-red-400" />
              <p className="font-medium text-red-400">System Consequences:</p>
            </div>
            <div className="space-y-1 text-xs">
              <p>• Unpredictable protective device operation</p>
              <p>• Loss of discrimination between devices</p>
              <p>• Extended system downtime during faults</p>
              <p>• Difficulty in fault location and repair</p>
              <p>• Potential for cascade failures</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Target className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">How PFC Testing Ensures Safety</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-green-400 mb-2">Automatic Disconnection Verification:</p>
            <div className="space-y-1 text-xs">
              <p>• Confirms MCBs will trip within magnetic range</p>
              <p>• Verifies fuse operation within required time</p>
              <p>• Ensures RCD backup protection remains effective</p>
              <p>• Validates earth fault loop impedance calculations</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-green-400 mb-2">System Reliability Assurance:</p>
            <div className="space-y-1 text-xs">
              <p>• Predictable fault clearance behaviour</p>
              <p>• Maintained discrimination between devices</p>
              <p>• Optimal protection coordination</p>
              <p>• Future-proofed system performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-yellow-400" />
        <h4 className="font-medium text-yellow-400">BS 7671 Disconnection Time Requirements</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="bg-card rounded p-4">
          <p className="font-medium text-yellow-400 mb-3">Maximum Disconnection Times - Table 41.1:</p>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2 font-mono text-xs">
              <div className="font-medium text-foreground">System</div>
              <div className="font-medium text-foreground">Uo (V)</div>
              <div className="font-medium text-foreground">Final Circuits</div>
              <div className="font-medium text-foreground">Distribution</div>
              <div>TN</div><div>120</div><div>0.8s</div><div>5s</div>
              <div>TN</div><div>230</div><div>0.4s</div><div>5s</div>
              <div>TN</div><div>400</div><div>0.2s</div><div>1s</div>
              <div>TT</div><div>120</div><div>0.3s</div><div>1s</div>
              <div>TT</div><div>230</div><div>0.2s</div><div>1s</div>
              <div>TT</div><div>400</div><div>0.07s</div><div>1s</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
              <p className="text-orange-400 font-medium text-xs">
                <strong>Critical Note:</strong> These times assume adequate PFC values. Insufficient PFC prevents achieving these disconnection times, compromising safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">PFC and Protective Device Operation</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-purple-400 mb-2">MCB Operation Zones:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Thermal Zone (1-3 × In):</strong></p>
              <p>• 1-60 minute operation</p>
              <p>• Overload protection</p>
              <p>• Not suitable for fault protection</p>
              <p><strong>Magnetic Zone (&gt;5×In Type B):</strong></p>
              <p>• Instantaneous operation (&lt;0.1s)</p>
              <p>• Fault current protection</p>
              <p>• Requires adequate PFC</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-purple-400 mb-2">Fuse Characteristics:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Low Fault Currents:</strong></p>
              <p>• Extended operating times</p>
              <p>• May not meet disconnection requirements</p>
              <p><strong>High Fault Currents:</strong></p>
              <p>• Rapid fuse operation</p>
              <p>• Effective fault clearance</p>
              <p>• Time/current curves determine performance</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-purple-400 mb-2">RCD Integration:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Primary Protection:</strong></p>
              <p>• 30mA RCDs for additional protection</p>
              <p>• Independent of PFC for earth leakage</p>
              <p><strong>Backup Role:</strong></p>
              <p>• PFC ensures overcurrent device operation</p>
              <p>• RCD provides secondary protection</p>
              <p>• Both systems must be effective</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">Professional and Legal Importance</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-cyan-400 mb-2">Regulatory Compliance:</p>
            <div className="space-y-1 text-xs">
              <p>• BS 7671 Regulation 612.11 mandatory requirement</p>
              <p>• Building Regulations Part P compliance</p>
              <p>• Health and Safety at Work Act duties</p>
              <p>• Electricity at Work Regulations 1989</p>
              <p>• Insurance policy requirements</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-cyan-400 mb-2">Professional Standards:</p>
            <div className="space-y-1 text-xs">
              <p>• IET Code of Practice requirements</p>
              <p>• NICEIC/NAPIT assessment criteria</p>
              <p>• Professional indemnity considerations</p>
              <p>• Duty of care to end users</p>
              <p>• Technical competence demonstration</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        <h4 className="font-medium text-emerald-400">Real-World Safety Benefits</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="bg-card rounded p-4">
          <p className="font-medium text-emerald-400 mb-3">Case Study: Domestic Installation</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-2">Scenario Without Adequate PFC:</p>
              <div className="space-y-1">
                <p>• Kitchen appliance develops earth fault</p>
                <p>• 32A MCB requires 160A minimum to trip magnetically</p>
                <p>• Measured PFC only 120A - insufficient</p>
                <p>• MCB operates thermally after 30+ seconds</p>
                <p>• Person touching appliance receives prolonged shock</p>
                <p>• Potential fatal outcome due to extended exposure</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Scenario With Adequate PFC:</p>
              <div className="space-y-1">
                <p>• Same kitchen appliance earth fault occurs</p>
                <p>• Measured PFC is 800A - well above minimum</p>
                <p>• 32A MCB trips magnetically in &lt;0.1 seconds</p>
                <p>• Fault current immediately disconnected</p>
                <p>• No risk of electric shock to persons</p>
                <p>• Safe installation operation confirmed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WhyTestSection;
