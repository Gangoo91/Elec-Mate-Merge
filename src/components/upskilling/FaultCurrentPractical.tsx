import { Wrench, CheckCircle, AlertTriangle, Zap, Shield, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FaultCurrentPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Equipment Setup */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Equipment Setup and Preparation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-elec-yellow" />
                Test Equipment Selection
              </h4>
              <div className="space-y-3">
                <ul className="text-foreground text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Use multifunction tester with PSC measurement capability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Ensure test leads are rated for expected currents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Verify calibration certificate is current</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Check battery levels and probe condition</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                Safety Preparation
              </h4>
              <div className="space-y-3">
                <ul className="text-foreground text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Wear appropriate PPE including arc flash protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Identify and inform relevant personnel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Establish safe working procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Have emergency procedures ready</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Procedure */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Step-by-Step Testing Procedure</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-4">
              
              <div className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <div>
                  <h4 className="text-foreground font-medium">Initial Verification</h4>
                  <p className="text-foreground text-sm mb-2">Confirm system conditions and protective device ratings</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• Check supply voltage is nominal</li>
                    <li>• Verify protective device types and ratings</li>
                    <li>• Note any parallel paths or unusual configurations</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <div>
                  <h4 className="text-foreground font-medium">Select Test Function</h4>
                  <p className="text-foreground text-sm mb-2">Configure tester for prospective fault current measurement</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• Select PSC or PFC function on tester</li>
                    <li>• Choose appropriate test current level</li>
                    <li>• Set temperature compensation if available</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <div>
                  <h4 className="text-foreground font-medium">Connect Test Leads</h4>
                  <p className="text-foreground text-sm mb-2">Establish secure connections for accurate measurement</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• For Ipsc: Connect between live conductors</li>
                    <li>• For Ipef: Connect line to earth</li>
                    <li>• Ensure clean, tight connections</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                <div>
                  <h4 className="text-foreground font-medium">Perform Measurement</h4>
                  <p className="text-foreground text-sm mb-2">Execute test and record stable readings</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• Press test button and wait for stable reading</li>
                    <li>• Note both current and impedance values</li>
                    <li>• Repeat test to verify consistency</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                <div>
                  <h4 className="text-foreground font-medium">Verify Breaking Capacity</h4>
                  <p className="text-foreground text-sm mb-2">Compare results with protective device specifications</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• Check measured fault current against device capacity</li>
                    <li>• Consider temperature effects on final current</li>
                    <li>• Document compliance or non-compliance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Issues and Solutions */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Common Issues and Solutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <h4 className="text-red-200 font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                High Fault Current Issues
              </h4>
              <div className="space-y-2">
                <p className="text-foreground text-sm">When fault current exceeds breaking capacity:</p>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Install current-limiting devices</li>
                  <li>• Upgrade to higher-capacity MCBs</li>
                  <li>• Consider series-connected protection</li>
                  <li>• Review supply arrangements with DNO</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <h4 className="text-yellow-200 font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Low Fault Current Issues
              </h4>
              <div className="space-y-2">
                <p className="text-foreground text-sm">When fault current is insufficient for protection:</p>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Install RCD protection as backup</li>
                  <li>• Check earth electrode resistance</li>
                  <li>• Verify bonding connections</li>
                  <li>• Consider supplementary bonding</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="text-blue-200 font-medium mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Measurement Inconsistencies
              </h4>
              <div className="space-y-2">
                <p className="text-foreground text-sm">When readings vary significantly:</p>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Check test lead connections</li>
                  <li>• Verify supply stability</li>
                  <li>• Consider parallel earth paths</li>
                  <li>• Investigate loose connections</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <h4 className="text-green-200 font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Best Practice Tips
              </h4>
              <div className="space-y-2">
                <p className="text-foreground text-sm">For reliable and accurate results:</p>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Test during normal operating conditions</li>
                  <li>• Document ambient temperature</li>
                  <li>• Record supply voltage at time of test</li>
                  <li>• Keep detailed measurement records</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Scenarios */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Real-World Testing Scenarios</h3>
          
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <h4 className="text-foreground font-medium">Scenario 1: Commercial Office Building</h4>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-sm mb-2">
                <strong>Situation:</strong> Three-phase supply, multiple distribution boards, mixed lighting and power circuits
              </p>
              <div className="space-y-2">
                <p className="text-blue-200 text-sm"><strong>Testing approach:</strong></p>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Test at main incomer for maximum values</li>
                  <li>• Test at each distribution board</li>
                  <li>• Verify MCB breaking capacities throughout</li>
                  <li>• Consider discrimination between protection levels</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <h4 className="text-foreground font-medium">Scenario 2: Industrial Installation</h4>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-foreground text-sm mb-2">
                <strong>Situation:</strong> High-power machinery, motor starters, significant cable runs
              </p>
              <div className="space-y-2">
                <p className="text-green-200 text-sm"><strong>Testing approach:</strong></p>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• High fault currents at origin - verify HRC fuse ratings</li>
                  <li>• Consider motor contribution to fault currents</li>
                  <li>• Test at motor control centres</li>
                  <li>• Coordinate with production scheduling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};