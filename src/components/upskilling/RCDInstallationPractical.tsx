import { Wrench, CheckCircle, AlertTriangle, Settings, Cable, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RCDInstallationPractical = () => {
  const preInstallationChecks = [
    "Verify circuit design and load calculations",
    "Check compatibility with existing protection",
    "Confirm RCD type matches application requirements",
    "Ensure adequate discrimination timing",
    "Review neutral arrangement and bonding",
    "Check environmental installation conditions"
  ];

  const commonMistakes = [
    { 
      mistake: "Mixing RCD-protected and non-protected neutrals",
      consequence: "Unwanted tripping and loss of protection",
      solution: "Maintain separate neutral arrangements"
    },
    { 
      mistake: "Incorrect load balancing on three-phase RCDs",
      consequence: "Nuisance tripping from natural imbalance",
      solution: "Distribute loads evenly across phases"
    },
    { 
      mistake: "Poor discrimination between RCDs",
      consequence: "Upstream RCD trips instead of downstream",
      solution: "Use S-type RCDs and proper timing"
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Pre-Installation Checks */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Pre-Installation Checks</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {preInstallationChecks.map((check, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-600/10 border border-gray-600/20 rounded">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm sm:text-base">{check}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step-by-Step Installation */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Step-by-Step Installation Process</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
              <h4 className="text-blue-200 font-medium mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">1</span>
                Isolation and Safety
              </h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1 ml-6">
                <li>• Isolate supply and confirm dead</li>
                <li>• Lock off and tag supply isolator</li>
                <li>• Use appropriate PPE and safe working practices</li>
                <li>• Ensure adequate working space and lighting</li>
              </ul>
            </div>

            <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
              <h4 className="text-green-200 font-medium mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">2</span>
                Physical Installation
              </h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1 ml-6">
                <li>• Mount RCD in correct position within enclosure</li>
                <li>• Ensure adequate clearance for operation and maintenance</li>
                <li>• Check mechanical operation of RCD mechanism</li>
                <li>• Verify labelling and identification requirements</li>
              </ul>
            </div>

            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-4">
              <h4 className="text-yellow-200 font-medium mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-xs font-bold">3</span>
                Electrical Connections
              </h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1 ml-6">
                <li>• Connect line conductors to correct terminals</li>
                <li>• Ensure proper neutral conductor arrangement</li>
                <li>• Verify earth continuity through installation</li>
                <li>• Check terminal tightness to manufacturer specifications</li>
              </ul>
            </div>

            <div className="bg-orange-600/10 border border-orange-600/20 rounded p-4">
              <h4 className="text-orange-200 font-medium mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-orange-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">4</span>
                Testing and Verification
              </h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1 ml-6">
                <li>• Perform insulation resistance testing</li>
                <li>• Test RCD operation at all required currents</li>
                <li>• Verify discrimination with other protective devices</li>
                <li>• Complete installation certificates and documentation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Installation Mistakes */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Common Installation Mistakes</h3>
          <div className="space-y-3">
            {commonMistakes.map((item, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <h4 className="text-red-200 font-medium">{item.mistake}</h4>
                </div>
                <div className="ml-8 space-y-2">
                  <div className="bg-red-600/10 border border-red-600/20 rounded p-2">
                    <p className="text-foreground text-sm sm:text-base">
                      <strong>Consequence:</strong> {item.consequence}
                    </p>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded p-2">
                    <p className="text-foreground text-sm sm:text-base">
                      <strong>Solution:</strong> {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools and Equipment */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Required Tools and Equipment</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-2">Installation Tools</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Insulated screwdrivers and spanners</li>
                  <li>• Cable strippers and crimping tools</li>
                  <li>• Digital multimeter</li>
                  <li>• Insulation resistance tester</li>
                  <li>• RCD tester</li>
                  <li>• Torque screwdriver</li>
                </ul>
              </div>
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-2">Safety Equipment</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Voltage indicator and proving unit</li>
                  <li>• Lock-off devices and warning tags</li>
                  <li>• Safety helmet and eye protection</li>
                  <li>• Insulated gloves (where required)</li>
                  <li>• First aid equipment</li>
                  <li>• Emergency procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Post-Installation Testing</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <h4 className="text-yellow-200 font-medium mb-2">Mandatory Tests</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Continuity of protective conductors</li>
                <li>• Insulation resistance (min 0.5MΩ)</li>
                <li>• RCD operation at ½×, 1×, and 5×IΔn (5×IΔn only mandatory for socket outlets ≤20A)</li>
                <li>• Earth fault loop impedance (where applicable)</li>
                <li>• Functional testing of RCD test button</li>
              </ul>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <h4 className="text-blue-200 font-medium mb-2">Documentation Required</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Electrical Installation Certificate</li>
                <li>• RCD test results and schedules</li>
                <li>• Circuit schedules and labelling</li>
                <li>• Operating and maintenance instructions</li>
                <li>• Compliance with BS 7671 confirmation</li>
              </ul>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default RCDInstallationPractical;