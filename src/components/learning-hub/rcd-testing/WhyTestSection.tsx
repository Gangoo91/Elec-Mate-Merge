
import React from 'react';
import { AlertTriangle, Shield, Heart, Clock, Users, TrendingUp, Activity, BookOpen, Zap } from 'lucide-react';

const WhyTestSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
        <h4 className="font-medium text-sm sm:text-base text-red-400">Critical Life-Saving Protection</h4>
      </div>
      <div className="space-y-3 text-xs sm:text-sm text-white">
        <div className="flex items-start gap-2">
          <Heart className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Protection Against Fatal Electric Shock</p>
            <p>RCDs detect earth leakage currents as low as 30mA (or less) and disconnect the supply within 40ms. This is fast enough to prevent cardiac fibrillation in healthy adults, as the human heart can typically withstand currents up to 50mA for short durations without fatal consequences.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Fire Prevention</p>
            <p>Earth leakage currents can cause arcing and heating in damaged cables or loose connections. RCDs prevent electrical fires by detecting these fault currents before they reach dangerous levels that could ignite surrounding materials.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Users className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Enhanced Protection for Vulnerable Persons</p>
            <p>Children, elderly, and people with medical conditions may be more susceptible to electric shock. RCDs provide an additional layer of protection that doesn't rely on the adequacy of earthing or the operation of overcurrent devices.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Zap className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Detection of Insulation Breakdown</p>
            <p>RCDs can detect gradual deterioration of cable insulation, water ingress, or damage to equipment before it becomes dangerous. This early warning capability helps prevent accidents and equipment damage.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="h-4 w-4 text-blue-400" />
        <h4 className="font-medium text-blue-400">The Science Behind RCD Operation</h4>
      </div>
      <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white leading-relaxed">
        <div>
          <p className="font-medium text-foreground">Residual Current Detection Principle:</p>
          <p className="ml-4">• <strong>Balanced currents:</strong> In normal operation, current flowing out through the phase conductor returns through the neutral</p>
          <p className="ml-4">• <strong>Current imbalance:</strong> During an earth fault, some current flows to earth, creating an imbalance</p>
          <p className="ml-4">• <strong>Toroidal transformer:</strong> Detects the magnetic field difference caused by unequal currents</p>
          <p className="ml-4">• <strong>Trip mechanism:</strong> Amplified signal operates the trip relay to open the contacts</p>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Physiological Response to Electric Current:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-blue-400">Current Levels & Effects:</p>
              <p>• <strong>1mA:</strong> Barely perceptible</p>
              <p>• <strong>5mA:</strong> Maximum safe current</p>
              <p>• <strong>10-20mA:</strong> Muscular control lost</p>
              <p>• <strong>30mA:</strong> Respiratory paralysis</p>
              <p>• <strong>50mA:</strong> Ventricular fibrillation possible</p>
              <p>• <strong>100mA+:</strong> Certain ventricular fibrillation</p>
            </div>
            <div>
              <p className="font-medium text-blue-400">Time/Current Relationship:</p>
              <p>• Higher currents = less time to cause damage</p>
              <p>• 30mA RCDs trip in ≤40ms at rated current</p>
              <p>• 100mA+ currents can cause fibrillation in &lt;200ms</p>
              <p>• RCD protection prevents sustained contact</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-orange-400" />
        <h4 className="font-medium text-orange-400">RCD Types and Applications</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-white">
        <div className="bg-card rounded p-3">
          <div className="text-orange-400 font-medium mb-2">Type AC RCDs</div>
          <ul className="space-y-1">
            <li>• Detects AC residual currents only</li>
            <li>• Most common and economical type</li>
            <li>• Suitable for resistive and inductive loads</li>
            <li>• Standard for most domestic applications</li>
            <li>• May not detect all fault types with electronic equipment</li>
          </ul>
        </div>
        <div className="bg-card rounded p-3">
          <div className="text-orange-400 font-medium mb-2">Type A RCDs</div>
          <ul className="space-y-1">
            <li>• Detects AC and pulsating DC currents</li>
            <li>• Required for equipment with electronic controls</li>
            <li>• Washing machines, dishwashers, computers</li>
            <li>• Variable speed drives and inverters</li>
            <li>• Recommended for modern installations</li>
          </ul>
        </div>
        <div className="bg-card rounded p-3">
          <div className="text-orange-400 font-medium mb-2">Type B RCDs</div>
          <ul className="space-y-1">
            <li>• Detects AC, pulsating DC, and smooth DC</li>
            <li>• Required for EV charging points</li>
            <li>• Medical equipment applications</li>
            <li>• Three-phase inverter equipment</li>
            <li>• Photovoltaic installations</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          <p className="font-medium text-yellow-400 mb-2">Sensitivity Ratings:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
            <div>
              <p className="font-medium text-foreground">High Sensitivity (≤30mA):</p>
              <p>• Personal protection against electric shock</p>
              <p>• Socket outlets and portable equipment</p>
              <p>• Bathrooms and special locations</p>
              <p>• Required by BS 7671 for most circuits</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Lower Sensitivity (100mA, 300mA):</p>
              <p>• Fire protection and equipment protection</p>
              <p>• Distribution boards and sub-mains</p>
              <p>• Industrial equipment with high earth leakage</p>
              <p>• Backup protection for downstream RCDs</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded p-3">
          <p className="font-medium text-purple-400 mb-2">Time Delay Characteristics:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
            <div>
              <p className="font-medium text-foreground">Instantaneous (General Type):</p>
              <p>• No intentional time delay</p>
              <p>• Trip time ≤40ms at rated current</p>
              <p>• Used for final circuits</p>
              <p>• Maximum shock protection</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Time Delayed (S-Type):</p>
              <p>• Intentional delay of 130-500ms</p>
              <p>• Used for discrimination/selectivity</p>
              <p>• Upstream protection devices</p>
              <p>• Prevents unwanted tripping</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Real-World Failure Scenarios</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Scenario 1: Faulty Appliance with Damaged Cable</p>
          <p className="mb-2">A lawn mower cable is damaged, causing the metal casing to become live:</p>
          <div className="ml-4 space-y-1">
            <p className="text-green-400">• <strong>With functioning RCD:</strong> User touches the casing, 30mA earth leakage detected, RCD trips in &lt;40ms, minimal shock sensation</p>
            <p className="text-red-400">• <strong>Without RCD/faulty RCD:</strong> User receives sustained shock through body to earth, potential cardiac arrest or muscular paralysis preventing release</p>
          </div>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Scenario 2: Water Ingress in Bathroom</p>
          <p className="mb-2">Water penetrates a light fitting, creating earth leakage:</p>
          <div className="ml-4 space-y-1">
            <p className="text-green-400">• <strong>With functioning RCD:</strong> Leakage current detected immediately, power disconnected, no risk to users</p>
            <p className="text-red-400">• <strong>Without RCD/faulty RCD:</strong> Wet conditions reduce body resistance, increased shock severity, potential electrocution in high-risk environment</p>
          </div>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Scenario 3: Gradual Cable Insulation Degradation</p>
          <p className="mb-2">Old cable insulation slowly deteriorates over time:</p>
          <div className="ml-4 space-y-1">
            <p className="text-green-400">• <strong>With functioning RCD:</strong> Increasing leakage detected early, RCD trips before dangerous levels reached</p>
            <p className="text-red-400">• <strong>Without RCD/faulty RCD:</strong> Insulation continues to degrade, potential for arcing, fire risk, eventual catastrophic failure</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">Legal and Regulatory Requirements</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">BS 7671 Requirements for RCD Protection:</p>
          <p className="ml-4">• <strong>Regulation 411.3.3:</strong> Additional protection by RCD for socket outlets ≤20A</p>
          <p className="ml-4">• <strong>Regulation 411.3.3:</strong> RCD protection for mobile equipment outdoors</p>
          <p className="ml-4">• <strong>Section 701:</strong> All circuits in bathrooms require RCD protection</p>
          <p className="ml-4">• <strong>Section 702:</strong> Swimming pool installations require RCD protection</p>
          <p className="ml-4">• <strong>Section 704:</strong> Construction sites require RCD protection</p>
          <p className="ml-4">• <strong>Regulation 531.3.2:</strong> RCD testing requirements and frequencies</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Testing and maintenance obligations:</p>
          <p className="ml-4">• <strong>Initial verification:</strong> All new RCDs must be tested during commissioning</p>
          <p className="ml-4">• <strong>Periodic inspection:</strong> RCDs tested during electrical installation condition reports</p>
          <p className="ml-4">• <strong>Routine testing:</strong> Monthly test button operation recommended</p>
          <p className="ml-4">• <strong>Professional testing:</strong> Annual testing with calibrated instruments</p>
          <p className="ml-4">• <strong>Landlord obligations:</strong> Regular RCD testing for rental properties</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
          <p className="font-medium text-red-400 mb-2">Consequences of Non-Compliance:</p>
          <div className="space-y-1 text-sm">
            <p>• Fatal accident liability under Health and Safety at Work Act</p>
            <p>• Prosecution under Electricity at Work Regulations</p>
            <p>• Insurance claims may be invalidated</p>
            <p>• Professional negligence for electrical contractors</p>
            <p>• Building control non-compliance (Part P)</p>
            <p>• Duty holder liability in workplace accidents</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">RCD Limitations and Considerations</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">What RCDs cannot protect against:</p>
          <p className="ml-4">• <strong>Phase to neutral shock:</strong> No earth leakage current flows</p>
          <p className="ml-4">• <strong>Phase to phase contact:</strong> Balanced currents in three-phase systems</p>
          <p className="ml-4">• <strong>Downstream of the RCD:</strong> Faults between RCD and protective device</p>
          <p className="ml-4">• <strong>Overcurrent conditions:</strong> RCDs don't provide overcurrent protection</p>
          <p className="ml-4">• <strong>DC systems:</strong> Type AC RCDs ineffective with pure DC currents</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Common causes of RCD failure:</p>
          <p className="ml-4">• <strong>Age-related degradation:</strong> Internal components deteriorate over time</p>
          <p className="ml-4">• <strong>Mechanical damage:</strong> Physical impact or vibration damage</p>
          <p className="ml-4">• <strong>Environmental conditions:</strong> Extreme temperatures or humidity</p>
          <p className="ml-4">• <strong>Electrical stress:</strong> Lightning strikes or voltage surges</p>
          <p className="ml-4">• <strong>Contamination:</strong> Dust, insects, or corrosion affecting contacts</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          <p className="font-medium text-yellow-400 mb-2">Why Regular Testing is Essential:</p>
          <p className="text-sm text-white">
            RCDs are mechanical devices with moving parts that can fail without warning. Unlike fuses or MCBs that clearly show when they've operated, 
            a failed RCD may appear normal but provide no protection. Regular testing is the only way to ensure continued protection.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default WhyTestSection;
