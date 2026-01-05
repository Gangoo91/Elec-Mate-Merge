import { TrendingUp, Wifi, Shield, Zap, Home, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeContent = () => {
  return (
    <div className="space-y-8">
      {/* Definition and Core Concepts */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-500" />
            Smart Home Definition & Core Concepts
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
            <h4 className="text-foreground font-semibold mb-3">What is a Smart Home?</h4>
            <p className="text-sm mb-3">
              A smart home is a residence equipped with interconnected devices and systems that use internet 
              connectivity, sensors, and automation to monitor, control, and optimise various household functions 
              including lighting, heating, ventilation, security, and entertainment systems.
            </p>
            <p className="text-sm">
              These systems can be controlled remotely via smartphones, tablets, or voice commands, and can 
              learn from user behaviour to automatically adjust settings for optimal comfort, security, and energy efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Traditional vs Smart Homes</h4>
              <div className="space-y-3">
                <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                  <p className="text-red-400 font-semibold text-sm mb-1">Traditional Homes</p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Manual control of all systems</li>
                    <li>• Individual device operation</li>
                    <li>• No central coordination</li>
                    <li>• Limited automation capabilities</li>
                    <li>• Higher energy waste</li>
                  </ul>
                </div>
                <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                  <p className="text-green-400 font-semibold text-sm mb-1">Smart Homes</p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Automated system control</li>
                    <li>• Integrated device communication</li>
                    <li>• Centralised management</li>
                    <li>• Advanced automation and AI</li>
                    <li>• Optimised energy efficiency</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Key Components Overview</h4>
              <div className="space-y-3">
                <div className="bg-elec-dark p-3 rounded flex items-start gap-3">
                  <Wifi className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-foreground font-semibold text-sm">Communication Protocols</p>
                    <p className="text-xs text-gray-400">Zigbee, Z-Wave, Wi-Fi, Bluetooth, Thread</p>
                  </div>
                </div>
                <div className="bg-elec-dark p-3 rounded flex items-start gap-3">
                  <Home className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-foreground font-semibold text-sm">Smart Devices</p>
                    <p className="text-xs text-gray-400">Sensors, actuators, controllers, hubs</p>
                  </div>
                </div>
                <div className="bg-elec-dark p-3 rounded flex items-start gap-3">
                  <Settings className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-foreground font-semibold text-sm">Control Interfaces</p>
                    <p className="text-xs text-gray-400">Apps, voice assistants, touch panels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Protocols */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Wifi className="h-6 w-6 text-blue-500" />
            Communication Protocols & Technologies
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-600/40">
              <h5 className="text-blue-400 font-semibold mb-2">Zigbee</h5>
              <ul className="text-xs space-y-1">
                <li>• Low power mesh network</li>
                <li>• 2.4GHz frequency</li>
                <li>• Excellent for sensors</li>
                <li>• Self-healing network</li>
                <li>• Range: 10-20m indoors</li>
              </ul>
            </div>
            <div className="bg-purple-600/20 p-4 rounded-lg border border-purple-600/40">
              <h5 className="text-purple-400 font-semibold mb-2">Z-Wave</h5>
              <ul className="text-xs space-y-1">
                <li>• Sub-1GHz frequency</li>
                <li>• Less interference</li>
                <li>• Mesh networking</li>
                <li>• 232 devices max</li>
                <li>• Range: 30m+ outdoors</li>
              </ul>
            </div>
            <div className="bg-green-600/20 p-4 rounded-lg border border-green-600/40">
              <h5 className="text-green-400 font-semibold mb-2">Wi-Fi</h5>
              <ul className="text-xs space-y-1">
                <li>• High bandwidth</li>
                <li>• Internet connectivity</li>
                <li>• Higher power usage</li>
                <li>• Standard infrastructure</li>
                <li>• Range: 30-50m indoors</li>
              </ul>
            </div>
            <div className="bg-orange-600/20 p-4 rounded-lg border border-orange-600/40">
              <h5 className="text-orange-400 font-semibold mb-2">Bluetooth/Thread</h5>
              <ul className="text-xs space-y-1">
                <li>• Low energy protocols</li>
                <li>• Direct device pairing</li>
                <li>• Short-range communication</li>
                <li>• Emerging standards</li>
                <li>• Range: 5-10m typically</li>
              </ul>
            </div>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg">
            <h4 className="text-elec-yellow font-semibold mb-3">Protocol Selection Considerations</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Range Requirements:</p>
                <ul className="text-xs space-y-1">
                  <li>• Short range: Bluetooth, Zigbee</li>
                  <li>• Medium range: Z-Wave, Wi-Fi</li>
                  <li>• Long range: Wi-Fi, cellular</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Power Consumption:</p>
                <ul className="text-xs space-y-1">
                  <li>• Ultra-low: Zigbee, Z-Wave</li>
                  <li>• Low: Bluetooth LE, Thread</li>
                  <li>• High: Wi-Fi, cellular</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Data Requirements:</p>
                <ul className="text-xs space-y-1">
                  <li>• Low data: Zigbee, Z-Wave</li>
                  <li>• Medium data: Bluetooth</li>
                  <li>• High data: Wi-Fi</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits and Applications */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-6 w-6 text-green-500" />
            Benefits & Real-World Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Primary Benefits</h4>
              <div className="space-y-3">
                <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                  <p className="text-green-400 font-semibold text-sm mb-1">Energy Efficiency</p>
                  <p className="text-xs text-gray-300">Automated lighting, heating, and cooling systems can reduce energy consumption by 20-30% through intelligent scheduling and occupancy detection.</p>
                </div>
                <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Enhanced Security</p>
                  <p className="text-xs text-gray-300">Integrated CCTV, smart locks, motion sensors, and alarm systems provide comprehensive security monitoring and remote access control.</p>
                </div>
                <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Convenience & Comfort</p>
                  <p className="text-xs text-gray-300">Voice control, automated routines, and predictive adjustments create personalised living environments that adapt to user preferences.</p>
                </div>
                <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                  <p className="text-orange-400 font-semibold text-sm mb-1">Accessibility Support</p>
                  <p className="text-xs text-gray-300">Voice control, automated assistance, and remote monitoring capabilities particularly benefit elderly or disabled users.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Application Areas</h4>
              <div className="space-y-3">
                <div className="bg-elec-dark p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-1">Climate Control</p>
                  <p className="text-xs text-gray-400">Smart thermostats, zone control, window sensors, automated ventilation</p>
                </div>
                <div className="bg-elec-dark p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-1">Lighting Systems</p>
                  <p className="text-xs text-gray-400">Automated dimming, colour control, occupancy sensing, circadian rhythm lighting</p>
                </div>
                <div className="bg-elec-dark p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-1">Security & Access</p>
                  <p className="text-xs text-gray-400">Smart locks, video doorbells, CCTV integration, alarm systems</p>
                </div>
                <div className="bg-elec-dark p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-1">Entertainment & Media</p>
                  <p className="text-xs text-gray-400">Multi-room audio, smart TVs, streaming integration, voice control</p>
                </div>
                <div className="bg-elec-dark p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-1">Appliance Control</p>
                  <p className="text-xs text-gray-400">Smart kitchen appliances, washing machines, robotic vacuum cleaners</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenges and Limitations */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-500" />
            Challenges & Implementation Considerations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Common Challenges</h4>
              <div className="space-y-3">
                <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                  <p className="text-red-400 font-semibold text-sm mb-1">Interoperability Issues</p>
                  <p className="text-xs text-gray-300">Different manufacturers often use incompatible protocols, making device integration complex and limiting consumer choice.</p>
                </div>
                <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                  <p className="text-red-400 font-semibold text-sm mb-1">Security Vulnerabilities</p>
                  <p className="text-xs text-gray-300">Connected devices can be entry points for cyber attacks if not properly secured with strong passwords and regular updates.</p>
                </div>
                <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                  <p className="text-red-400 font-semibold text-sm mb-1">High Initial Costs</p>
                  <p className="text-xs text-gray-300">Smart devices and professional installation can require significant upfront investment, though costs are decreasing over time.</p>
                </div>
                <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                  <p className="text-red-400 font-semibold text-sm mb-1">Complexity & Learning Curve</p>
                  <p className="text-xs text-gray-300">Multiple apps, configuration requirements, and troubleshooting can overwhelm non-technical users.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Implementation Strategies</h4>
              <div className="space-y-3">
                <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                  <p className="text-green-400 font-semibold text-sm mb-1">Phased Approach</p>
                  <p className="text-xs text-gray-300">Start with basic systems (lighting, heating) and gradually expand to more complex integrations.</p>
                </div>
                <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Protocol Standardisation</p>
                  <p className="text-xs text-gray-300">Choose devices supporting emerging standards like Matter/Thread for better future compatibility.</p>
                </div>
                <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Professional Installation</p>
                  <p className="text-xs text-gray-300">Consider professional setup for complex systems to ensure proper configuration and security.</p>
                </div>
                <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Security First</p>
                  <p className="text-xs text-gray-300">Implement strong passwords, regular updates, and network segmentation from the start.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg">
            <h4 className="text-elec-yellow font-semibold mb-3">Future Considerations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Emerging Technologies:</p>
                <ul className="text-xs space-y-1">
                  <li>• Matter/Thread universal standards</li>
                  <li>• Edge computing and AI integration</li>
                  <li>• 5G connectivity for faster response</li>
                  <li>• Advanced voice and gesture control</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Market Trends:</p>
                <ul className="text-xs space-y-1">
                  <li>• Decreasing device costs</li>
                  <li>• Improved user interfaces</li>
                  <li>• Energy efficiency regulations</li>
                  <li>• Integration with renewable energy</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};