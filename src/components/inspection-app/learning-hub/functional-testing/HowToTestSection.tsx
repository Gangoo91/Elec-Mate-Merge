
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, AlertTriangle, CheckCircle2, Clock, Settings, Eye, TestTube } from 'lucide-react';

const HowToTestSection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
          <h4 className="text-base sm:text-lg font-semibold text-green-400">Comprehensive Functional Testing Procedure</h4>
        </div>
        <div className="space-y-4 sm:space-y-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
          
          {/* Pre-Test Preparation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Settings className="h-4 w-4 text-blue-400" />
              Pre-Test Preparation
            </h4>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <div>
                    <strong className="text-foreground">Site Coordination:</strong> Inform all relevant personnel about testing activities and expected disruptions
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <div>
                    <strong className="text-foreground">System Understanding:</strong> Review installation drawings, operation manuals, and control logic
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <div>
                    <strong className="text-foreground">Safety Planning:</strong> Establish emergency procedures and communication protocols
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Main Testing Steps */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <TestTube className="h-4 w-4 text-green-400" />
              Main Testing Sequence
            </h4>

            {/* Step 1: Visual Inspection */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex-1">
                  <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Visual Inspection of Controls
                  </h5>
                  <p className="text-sm mb-3">Comprehensive inspection of all switches, isolators, and control equipment</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h6 className="font-medium text-gray-200 mb-2">Check Points:</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Switch operation - smooth without binding</li>
                        <li>• Contact condition - clean and secure</li>
                        <li>• Labelling - clear and correct</li>
                        <li>• Mounting - secure and stable</li>
                        <li>• Access - adequate for operation</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-gray-200 mb-2">Common Issues:</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Stiff or damaged switch mechanisms</li>
                        <li>• Loose or corroded connections</li>
                        <li>• Missing or incorrect labelling</li>
                        <li>• Inadequate IP rating for environment</li>
                        <li>• Obstructed access to controls</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3 text-xs">
                    <span className="text-orange-400 font-medium">Safety Note:</span> Ensure all equipment is properly isolated before physical inspection. Use appropriate PPE and follow LOTO procedures.
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: RCD Testing */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1">
                  <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    RCD Push Button Test
                  </h5>
                  <p className="text-sm mb-3">Test RCD operation using the integral test button mechanism</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h6 className="font-medium text-gray-200 mb-2">Test Procedure:</h6>
                      <ol className="text-xs space-y-1">
                        <li>1. Energise the RCD normally</li>
                        <li>2. Press the test button firmly</li>
                        <li>3. Observe immediate tripping</li>
                        <li>4. Reset the RCD</li>
                        <li>5. Repeat test 3 times minimum</li>
                      </ol>
                    </div>
                    <div>
                      <h6 className="font-medium text-gray-200 mb-2">Expected Results:</h6>
                      <ul className="text-xs space-y-1">
                        <li>• RCD trips within 40ms</li>
                        <li>• Consistent operation on each test</li>
                        <li>• Clean contact operation</li>
                        <li>• Positive reset action</li>
                        <li>• No mechanical binding</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3 text-xs">
                    <span className="text-blue-400 font-medium">Technical Note:</span> The test button creates an artificial earth fault current to verify RCD sensitivity. This test should be performed monthly.
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Emergency Stop Testing */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1">
                  <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Emergency Stop Testing
                  </h5>
                  <p className="text-sm mb-3">Test operation of emergency stop controls and safety systems</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h6 className="font-medium text-gray-200 mb-2">Test Sequence:</h6>
                      <ol className="text-xs space-y-1">
                        <li>1. Coordinate with operations team</li>
                        <li>2. Activate emergency stop button</li>
                        <li>3. Verify complete system shutdown</li>
                        <li>4. Check all interlocked circuits</li>
                        <li>5. Test reset procedure</li>
                        <li>6. Verify system restart capability</li>
                      </ol>
                    </div>
                    <div>
                      <h6 className="font-medium text-gray-200 mb-2">Verification Points:</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Immediate power disconnection</li>
                        <li>• All related equipment stops</li>
                        <li>• Safety interlocks engage</li>
                        <li>• Status indication correct</li>
                        <li>• Cannot restart without reset</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-3 text-xs">
                    <span className="text-red-400 font-medium">Critical Warning:</span> Only test emergency stops during planned maintenance windows. Coordinate with all stakeholders and have recovery procedures ready.
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Additional Functional Tests */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-foreground rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div className="flex-1">
                  <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Switchgear and Control Systems
                  </h5>
                  <p className="text-sm mb-3">Test operation of main switchgear, control systems, and auxiliary equipment</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h6 className="font-medium text-gray-200 mb-2">Control Tests:</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Automatic transfer switches</li>
                        <li>• Motor control centres</li>
                        <li>• Variable speed drives</li>
                        <li>• PLC control systems</li>
                        <li>• SCADA interface operation</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-gray-200 mb-2">Safety Systems:</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Fire alarm interface</li>
                        <li>• Gas detection systems</li>
                        <li>• Ventilation interlocks</li>
                        <li>• Access control systems</li>
                        <li>• Emergency lighting controls</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Test Documentation */}
          <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-gray-200 mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Documentation Requirements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <h6 className="font-medium text-foreground mb-2">Record Details:</h6>
                <ul className="space-y-1">
                  <li>• Date and time of each test</li>
                  <li>• Equipment tested and results</li>
                  <li>• Any defects or anomalies found</li>
                  <li>• Remedial actions taken</li>
                  <li>• Test engineer signature</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-foreground mb-2">Compliance Notes:</h6>
                <ul className="space-y-1">
                  <li>• Reference to BS 7671 Regulation 612.13</li>
                  <li>• Manufacturer's test procedures followed</li>
                  <li>• Site-specific safety requirements met</li>
                  <li>• Next test due date recorded</li>
                  <li>• Certificate updated with results</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToTestSection;
