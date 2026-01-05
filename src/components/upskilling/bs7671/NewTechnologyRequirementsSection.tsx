import { Smartphone, Car, Zap, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NewTechnologyRequirementsSection = () => {
  return (
    <Card className="bg-gradient-to-r from-green-900/20 to-elec-gray border-green-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-elec-yellow" />
          Emerging Technology Integration Standards
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-green-600 text-foreground">Future-Ready Installations</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Smart Home and IoT Integration Requirements:</h5>
          
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded border-l-4 border-blue-400">
              <div className="flex justify-between items-center mb-3">
                <h6 className="font-bold text-blue-400 text-sm sm:text-base">Home Automation Systems</h6>
                <Smartphone className="h-5 w-5 text-blue-400" />
              </div>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• Dedicated circuits for smart home hubs and controllers</li>
                <li>• Power quality requirements for sensitive electronics</li>
                <li>• Backup power provisions for critical smart systems</li>
                <li>• EMC considerations for wireless communication</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-purple-400">
              <div className="flex justify-between items-center mb-3">
                <h6 className="font-bold text-purple-400 text-sm sm:text-base">AI and Machine Learning Systems</h6>
                <Zap className="h-5 w-5 text-purple-400" />
              </div>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• High-performance computing power requirements</li>
                <li>• Cooling system electrical specifications</li>
                <li>• Harmonic filtering for AI processing equipment</li>
                <li>• Emergency shutdown procedures for AI systems</li>
              </ul>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h6 className="text-yellow-400 font-medium mb-2">Smart Device Integration:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Standardised communication protocols (Matter, Thread, Zigbee)</li>
                  <li>• Power over Ethernet (PoE) infrastructure requirements</li>
                  <li>• Dedicated low-voltage circuits for smart devices</li>
                  <li>• Surge protection for networked equipment</li>
                  <li>• Cable management for data and power integration</li>
                </ul>
              </div>
              <div>
                <h6 className="text-yellow-400 font-medium mb-2">Control System Requirements:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Central control panel electrical specifications</li>
                  <li>• Battery backup systems for smart controllers</li>
                  <li>• Interface requirements with traditional electrical systems</li>
                  <li>• Safety interlocks for automated systems</li>
                  <li>• Manual override provisions for smart controls</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Advanced Electric Vehicle Infrastructure:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Bidirectional Charging Systems:</h6>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium">V2G (Vehicle-to-Grid) Requirements:</span>
                </div>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• Grid synchronisation and power quality control</li>
                  <li>• Anti-islanding protection enhanced for bidirectional flow</li>
                  <li>• Dynamic grid support and frequency regulation</li>
                  <li>• Emergency backup power capability</li>
                </ul>
              </div>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Smart Charging Management:</h6>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">Intelligent Load Control:</span>
                </div>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• Dynamic load balancing with household demand</li>
                  <li>• Time-of-use rate optimisation</li>
                  <li>• Solar PV integration and energy storage coordination</li>
                  <li>• Peak demand management and grid stability support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Renewable Energy and Storage Integration:</h5>
          <div className="space-y-4">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="h-5 w-5 text-green-400" />
                <h6 className="font-bold text-green-400">Next-Generation Solar and Wind Systems</h6>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Advanced Solar Technologies:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Higher voltage DC systems (up to 1500V)</li>
                    <li>• Micro-inverter and power optimiser integration</li>
                    <li>• Building-integrated photovoltaics (BIPV)</li>
                    <li>• Floating solar installation requirements</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Energy Storage Advances:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Next-generation battery chemistries (solid-state)</li>
                    <li>• High-capacity residential storage systems</li>
                    <li>• Thermal runaway prevention enhancements</li>
                    <li>• Smart battery management system integration</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-2">Hydrogen and Alternative Energy Systems</h6>
              <ul className="text-sm space-y-1">
                <li>• Hydrogen fuel cell electrical integration requirements</li>
                <li>• Green hydrogen production facility electrical specifications</li>
                <li>• Alternative energy system safety and monitoring</li>
                <li>• Integration with existing electrical infrastructure</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Heat Pump and HVAC Evolution:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Advanced Heat Pump Technologies:</h6>
              <ul className="text-sm space-y-1">
                <li>• Variable refrigerant flow (VRF) system electrical requirements</li>
                <li>• High-temperature heat pump electrical specifications</li>
                <li>• Ground source heat pump electrical integration</li>
                <li>• Hybrid heat pump system coordination</li>
                <li>• Smart defrost cycle electrical management</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Smart HVAC Integration:</h6>
              <ul className="text-sm space-y-1">
                <li>• AI-driven HVAC control system electrical needs</li>
                <li>• Zone-based climate control electrical requirements</li>
                <li>• Indoor air quality monitoring system integration</li>
                <li>• Energy recovery ventilation electrical specifications</li>
                <li>• Demand response capability for HVAC systems</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Implementation Guidelines for New Technologies:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-1">Design Considerations</h6>
              <p className="text-sm">Plan electrical systems with flexibility for technology upgrades, including spare capacity, upgrade pathways, and modular design approaches that accommodate future developments.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-1">Installation Standards</h6>
              <p className="text-sm">Follow manufacturer specifications while ensuring compliance with BS 7671 requirements, including proper earthing, bonding, and protection coordination for new technologies.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-1">Testing and Commissioning</h6>
              <p className="text-sm">Develop comprehensive testing procedures for new technologies, including communication system verification, cybersecurity validation, and performance optimisation testing.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewTechnologyRequirementsSection;