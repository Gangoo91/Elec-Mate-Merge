import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, AlertTriangle, CheckCircle2, Settings, Shield } from 'lucide-react';

export const BMSModule4Section5Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Comprehensive Integration Implementation Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* System Integration Planning */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">System Integration Planning and Installation</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Zone Definition and Mapping</h4>
                  <p className="text-sm text-gray-300">Define control zones where HVAC and lighting operate together. Create detailed zone plans showing sensor coverage, equipment locations, and control boundaries.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Communication Network Design</h4>
                  <p className="text-sm text-gray-300">Plan BACnet or Modbus networks enabling HVAC and lighting systems to share sensor data and coordinate control responses effectively.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Load Calculation Integration</h4>
                  <p className="text-sm text-gray-300">Calculate lighting heat gains and their impact on HVAC loads. Size systems accounting for coordinated operation rather than independent peak loads.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Sensor Sharing Strategy</h4>
                  <p className="text-sm text-gray-300">Use single sensors (PIR, CO₂, photocells) for multiple systems. Install interface relays and signal conditioning to prevent system conflicts.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Timing Coordination</h4>
                  <p className="text-sm text-gray-300">Program appropriate delays between lighting and HVAC responses. Prevent system conflicts while maintaining occupant comfort during transitions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Override and Safety Systems</h4>
                  <p className="text-sm text-gray-300">Install local override controls for occupants whilst preventing permanent system disabling that compromises energy-saving strategies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Installation Specifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Installation Specifications and Requirements</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-600 text-sm">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Installation Task</th>
                  <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Technical Specification</th>
                  <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Best Practice Requirements</th>
                  <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Common Issues & Solutions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2"><strong>Multi-System PIR Sensors</strong></td>
                  <td className="border border-gray-600 px-4 py-2">Dual-output sensors with NO/NC contacts</td>
                  <td className="border border-gray-600 px-4 py-2">Mount at 2.4m height, 60° coverage angle</td>
                  <td className="border border-gray-600 px-4 py-2">False triggers from heat sources - adjust sensitivity</td>
                </tr>
                <tr className="bg-gray-800/50">
                  <td className="border border-gray-600 px-4 py-2"><strong>Daylight Sensor Integration</strong></td>
                  <td className="border border-gray-600 px-4 py-2">0-10V outputs for both lighting and BMS</td>
                  <td className="border border-gray-600 px-4 py-2">North-facing mounting, avoid reflections</td>
                  <td className="border border-gray-600 px-4 py-2">Signal drift over time - annual calibration needed</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2"><strong>Interface Relay Installation</strong></td>
                  <td className="border border-gray-600 px-4 py-2">Interposing relays, 24V DC coils preferred</td>
                  <td className="border border-gray-600 px-4 py-2">Panel-mount in accessible locations</td>
                  <td className="border border-gray-600 px-4 py-2">Relay chatter from voltage fluctuations</td>
                </tr>
                <tr className="bg-gray-800/50">
                  <td className="border border-gray-600 px-4 py-2"><strong>Communication Wiring</strong></td>
                  <td className="border border-gray-600 px-4 py-2">RS-485 twisted pair, 120Ω termination</td>
                  <td className="border border-gray-600 px-4 py-2">Separate conduits from power cables</td>
                  <td className="border border-gray-600 px-4 py-2">Communication errors from EMI interference</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2"><strong>Power Supply Coordination</strong></td>
                  <td className="border border-gray-600 px-4 py-2">UPS backup for critical control circuits</td>
                  <td className="border border-gray-600 px-4 py-2">Dedicated neutrals, surge protection</td>
                  <td className="border border-gray-600 px-4 py-2">System lockup during power fluctuations</td>
                </tr>
                <tr className="bg-gray-800/50">
                  <td className="border border-gray-600 px-4 py-2"><strong>Control Panel Integration</strong></td>
                  <td className="border border-gray-600 px-4 py-2">Modular design allowing future expansion</td>
                  <td className="border border-gray-600 px-4 py-2">Clear labelling, circuit documentation</td>
                  <td className="border border-gray-600 px-4 py-2">Difficulty tracing circuits during commissioning</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Advanced Control System Specifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Advanced Control System Components</h3>
          
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold mb-3 text-foreground">Occupancy Detection Systems</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>PIR Sensors:</strong> Ceiling-mount, 360° coverage, adjustable sensitivity</p>
                <p><strong>Ultrasonic:</strong> Motion detection in cubicles, 40kHz frequency</p>
                <p><strong>CO₂ Sensors:</strong> Air quality monitoring, 0-2000ppm range</p>
                <p><strong>Desk Sensors:</strong> Personal occupancy detection, USB powered</p>
                <p><strong>Integration:</strong> Multi-technology sensors for accuracy</p>
                <p><strong>Networking:</strong> BACnet or Modbus integration capability</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold mb-3 text-foreground">Environmental Control Interfaces</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Photocell Sensors:</strong> 0-10V output, weatherproof IP65 rating</p>
                <p><strong>Temperature Sensors:</strong> ±0.5°C accuracy, wireless capability</p>
                <p><strong>Humidity Sensors:</strong> RH measurement, dewpoint calculation</p>
                <p><strong>Weather Stations:</strong> Wind, rain, solar irradiance monitoring</p>
                <p><strong>Air Quality:</strong> VOC, particulate matter detection</p>
                <p><strong>Energy Meters:</strong> Real-time power monitoring and feedback</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold mb-3 text-foreground">Control and Communication Hardware</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>BMS Controllers:</strong> Modular I/O, expandable architecture</p>
                <p><strong>Lighting Gateways:</strong> DALI to BACnet protocol conversion</p>
                <p><strong>HVAC Interfaces:</strong> Direct digital control integration</p>
                <p><strong>Network Switches:</strong> Managed Ethernet for system backbone</p>
                <p><strong>HMI Panels:</strong> Touch-screen user interfaces with graphics</p>
                <p><strong>Mobile Apps:</strong> Remote monitoring and control capability</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testing and Commissioning */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Testing, Commissioning and Documentation</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-blue-900/30 rounded-lg border border-blue-600/40">
                <Settings className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-blue-400">Integration Testing Protocol</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Test occupancy scenarios with both systems responding correctly</li>
                    <li>• Verify daylight dimming affects HVAC cooling calculations</li>
                    <li>• Check override functions don't permanently disable energy savings</li>
                    <li>• Confirm communication between lighting and HVAC controllers</li>
                    <li>• Test emergency modes and fail-safe operation sequences</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-green-900/30 rounded-lg border border-green-600/40">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-green-400">Performance Verification</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Measure energy consumption before and after integration</li>
                    <li>• Monitor system response times and coordination delays</li>
                    <li>• Verify occupant comfort levels maintained during transitions</li>
                    <li>• Check system stability during various load conditions</li>
                    <li>• Document baseline performance for future optimization</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-yellow-900/30 rounded-lg border border-yellow-600/40">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-yellow-400">Documentation Requirements</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Create as-built drawings showing integrated control circuits</li>
                    <li>• Document sensor locations and coverage patterns</li>
                    <li>• Provide commissioning reports with test results</li>
                    <li>• Include troubleshooting guides for maintenance teams</li>
                    <li>• Record control logic and sequence of operations</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-purple-900/30 rounded-lg border border-purple-600/40">
                <Shield className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-purple-400">Ongoing Maintenance Strategy</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Schedule annual sensor calibration and performance checks</li>
                    <li>• Monitor system performance metrics and energy savings</li>
                    <li>• Provide user training on override functions and benefits</li>
                    <li>• Establish preventive maintenance schedules for all components</li>
                    <li>• Plan for future system upgrades and expansion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety and Compliance */}
        <div className="bg-red-900/30 border border-red-600/40 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-red-400 mb-4">Safety and Compliance Considerations</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Electrical Safety Requirements</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Ensure proper earthing and equipotential bonding for all systems</li>
                <li>• Install appropriate surge protection for sensitive control equipment</li>
                <li>• Verify circuit protection coordination between lighting and HVAC systems</li>
                <li>• Maintain separation between extra-low voltage and mains circuits</li>
                <li>• Provide emergency stop functions accessible to building occupants</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Building Regulations Compliance</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Ensure emergency lighting remains independent of normal control systems</li>
                <li>• Maintain fire alarm integration with automatic system shutdown</li>
                <li>• Provide manual overrides meeting accessibility requirements</li>
                <li>• Document energy efficiency calculations for Building Control approval</li>
                <li>• Ensure systems meet relevant British Standards and BS 7671 requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};