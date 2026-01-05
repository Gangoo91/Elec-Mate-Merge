import { ArrowLeft, ArrowRight, Cable, Zap, Globe, Shield, CheckCircle, AlertTriangle, Info, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EVChargingModule2Section4 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-8 pt-8 pb-12">
        <Link to="../ev-charging-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Cable className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white">
                  IEC 61851, 62196 Connectors
                </h1>
                <p className="text-lg sm:text-xl text-gray-400">
                  International charging standards and connector types
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 4
              </Badge>
            </div>
          </div>

          {/* IEC 61851 Standard */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="h-5 w-5 text-yellow-400" />
                IEC 61851: Electric Vehicle Conductive Charging System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-400/20 border border-blue-600/30 rounded-lg p-4 mb-4">
                <p className="text-blue-200 font-medium mb-2">Standard Overview</p>
                <p className="text-blue-100 text-sm">
                  IEC 61851 is the international standard that defines the requirements for conductive charging 
                  systems for electric vehicles. It ensures safety, interoperability, and performance across 
                  all EV charging infrastructure globally.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-4">Standard Structure</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded-md">
                      <p className="text-yellow-400 font-medium">IEC 61851-1</p>
                      <p className="text-gray-300 text-sm">General requirements and safety specifications for conductive charging</p>
                    </div>
                    <div className="bg-card p-3 rounded-md">
                      <p className="text-yellow-400 font-medium">IEC 61851-21</p>
                      <p className="text-gray-300 text-sm">AC electric vehicle charging station requirements</p>
                    </div>
                    <div className="bg-card p-3 rounded-md">
                      <p className="text-yellow-400 font-medium">IEC 61851-22</p>
                      <p className="text-gray-300 text-sm">AC electric vehicle charging station connector specifications</p>
                    </div>
                    <div className="bg-card p-3 rounded-md">
                      <p className="text-yellow-400 font-medium">IEC 61851-23</p>
                      <p className="text-gray-300 text-sm">DC electric vehicle charging station specifications</p>
                    </div>
                    <div className="bg-card p-3 rounded-md">
                      <p className="text-yellow-400 font-medium">IEC 61851-24</p>
                      <p className="text-gray-300 text-sm">Digital communication between charging station and EV</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-4">Key Safety Requirements</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
                      <p className="text-green-300 font-medium">Electrical Safety</p>
                      <p className="text-green-100 text-sm">RCD protection, insulation monitoring, earth fault detection</p>
                    </div>
                    <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-3">
                      <p className="text-blue-300 font-medium">Mechanical Safety</p>
                      <p className="text-blue-100 text-sm">Connector retention, cable management, environmental protection</p>
                    </div>
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-3">
                      <p className="text-purple-300 font-medium">Functional Safety</p>
                      <p className="text-purple-100 text-sm">Control pilot verification, proximity detection, emergency stop</p>
                    </div>
                    <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-3">
                      <p className="text-orange-300 font-medium">Communication Safety</p>
                      <p className="text-orange-100 text-sm">Signal integrity, error detection, fail-safe operation</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IEC 62196 Connectors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="h-5 w-5 text-yellow-400" />
                IEC 62196: Plugs, Socket-outlets, and Couplers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Type 1 Connector (SAE J1772)</h4>
                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <p className="text-blue-300 font-medium">Technical Specifications:</p>
                      <p className="text-blue-100">• Single-phase AC: up to 240V, 80A (19.2kW)</p>
                      <p className="text-blue-100">• 5 pins: L1, N, PE, CP, PP</p>
                      <p className="text-blue-100">• Operating temperature: -30°C to +50°C</p>
                      <p className="text-blue-100">• IP54 protection rating minimum</p>
                      <p className="text-blue-100">• Mechanical durability: 10,000 cycles</p>
                      
                      <p className="text-blue-300 font-medium mt-3">Regional Usage:</p>
                      <p className="text-blue-100">• Primary in North America and Japan</p>
                      <p className="text-blue-100">• Nissan Leaf, Chevrolet Volt, BMW i3 (US models)</p>
                      <p className="text-blue-100">• Tesla vehicles (with adapter)</p>
                      
                      <p className="text-blue-300 font-medium mt-3">Pin Configuration:</p>
                      <p className="text-blue-100">• CP (Control Pilot): PWM signal for current capability</p>
                      <p className="text-blue-100">• PP (Proximity Pilot): Cable capacity detection</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Type 2 Connector (Mennekes)</h4>
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <p className="text-purple-300 font-medium">Technical Specifications:</p>
                      <p className="text-purple-100">• Three-phase AC: up to 500V, 63A (43.5kW)</p>
                      <p className="text-purple-100">• 7 pins: L1, L2, L3, N, PE, CP, PP</p>
                      <p className="text-purple-100">• Operating temperature: -30°C to +50°C</p>
                      <p className="text-purple-100">• IP54 protection rating minimum</p>
                      <p className="text-purple-100">• Mechanical durability: 10,000 cycles</p>
                      
                      <p className="text-purple-300 font-medium mt-3">Regional Usage:</p>
                      <p className="text-purple-100">• EU standard, mandated since 2014</p>
                      <p className="text-purple-100">• BMW, Mercedes, Audi, Volvo, Tesla (EU)</p>
                      <p className="text-purple-100">• Most European charging infrastructure</p>
                      
                      <p className="text-purple-300 font-medium mt-3">Advanced Features:</p>
                      <p className="text-purple-100">• Three-phase capability for faster charging</p>
                      <p className="text-purple-100">• Higher power ratings than Type 1</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DC Charging Connectors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Settings className="h-5 w-5 text-yellow-400" />
                DC Fast Charging Connectors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-3">CHAdeMO</h4>
                  <div className="text-green-100 text-sm space-y-2">
                    <p><strong>Origin:</strong> Japan (CHArge de MOve)</p>
                    <p><strong>Power:</strong> Up to 500kW (CHAdeMO 3.0)</p>
                    <p><strong>Voltage:</strong> Up to 1000V DC</p>
                    <p><strong>Current:</strong> Up to 500A</p>
                    <p><strong>Communication:</strong> CAN bus protocol</p>
                    <p><strong>Vehicles:</strong> Nissan Leaf, Mitsubishi Outlander PHEV</p>
                    <p><strong>Features:</strong></p>
                    <ul className="ml-2">
                      <li>• Bidirectional charging (V2G)</li>
                      <li>• Mature technology</li>
                      <li>• Large installed base in Asia</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-3">CCS Type 1 (Combo 1)</h4>
                  <div className="text-blue-100 text-sm space-y-2">
                    <p><strong>Origin:</strong> North America/SAE</p>
                    <p><strong>Power:</strong> Up to 500kW</p>
                    <p><strong>Voltage:</strong> Up to 1000V DC</p>
                    <p><strong>Current:</strong> Up to 500A</p>
                    <p><strong>Communication:</strong> PLC (Power Line Communication)</p>
                    <p><strong>Vehicles:</strong> BMW i3, Chevrolet Bolt, Ford Mustang Mach-E</p>
                    <p><strong>Features:</strong></p>
                    <ul className="ml-2">
                      <li>• Combined AC/DC connector</li>
                      <li>• ISO 15118 support</li>
                      <li>• Plug & Charge capability</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-3">CCS Type 2 (Combo 2)</h4>
                  <div className="text-purple-100 text-sm space-y-2">
                    <p><strong>Origin:</strong> Europe</p>
                    <p><strong>Power:</strong> Up to 500kW</p>
                    <p><strong>Voltage:</strong> Up to 1000V DC</p>
                    <p><strong>Current:</strong> Up to 500A</p>
                    <p><strong>Communication:</strong> PLC (Power Line Communication)</p>
                    <p><strong>Vehicles:</strong> BMW, Mercedes, Audi, Volkswagen ID series</p>
                    <p><strong>Features:</strong></p>
                    <ul className="ml-2">
                      <li>• Combined AC/DC connector</li>
                      <li>• Three-phase AC capability</li>
                      <li>• Mandatory in EU from 2024</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tesla Proprietary Connectors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Tesla Proprietary Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Tesla Connector (North America)</h4>
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <p className="text-red-300 font-medium">Technical Specifications:</p>
                      <p className="text-red-100">• Compact design: 21mm diameter pins</p>
                      <p className="text-red-100">• AC: Single-phase up to 19.2kW</p>
                      <p className="text-red-100">• DC: Up to 250kW (V3 Supercharger)</p>
                      <p className="text-red-100">• Voltage: Up to 480V DC</p>
                      <p className="text-red-100">• Current: Up to 625A</p>
                      
                      <p className="text-red-300 font-medium mt-3">Unique Features:</p>
                      <p className="text-red-100">• Same connector for AC and DC</p>
                      <p className="text-red-100">• Proprietary communication protocol</p>
                      <p className="text-red-100">• Integrated into vehicle charging port</p>
                      <p className="text-red-100">• Liquid-cooled cables for high-power charging</p>
                      
                      <p className="text-red-300 font-medium mt-3">Network:</p>
                      <p className="text-red-100">• 40,000+ Supercharger connectors globally</p>
                      <p className="text-red-100">• Opening to other manufacturers from 2024</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Tesla in Europe/Asia</h4>
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <p className="text-orange-300 font-medium">Standard Compliance:</p>
                      <p className="text-orange-100">• Uses CCS Type 2 for DC charging</p>
                      <p className="text-orange-100">• Type 2 AC connector for destination charging</p>
                      <p className="text-orange-100">• Complies with IEC 61851/62196 standards</p>
                      
                      <p className="text-orange-300 font-medium mt-3">Supercharger V3 Specifications:</p>
                      <p className="text-orange-100">• Power: Up to 250kW</p>
                      <p className="text-orange-100">• Voltage: 50-1000V DC</p>
                      <p className="text-orange-100">• Peak current: 631A</p>
                      <p className="text-orange-100">• Liquid-cooled CCS2 cables</p>
                      
                      <p className="text-orange-300 font-medium mt-3">Compatibility:</p>
                      <p className="text-orange-100">• Open to non-Tesla vehicles via app</p>
                      <p className="text-orange-100">• CCS adapter provided for Model S/X</p>
                      <p className="text-orange-100">• Native CCS2 on Model 3/Y</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication Protocols */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Info className="h-5 w-5 text-yellow-400" />
                Communication Protocols
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">ISO 15118 - Plug & Charge</h4>
                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <p className="text-blue-300 font-medium">Protocol Overview:</p>
                      <p className="text-blue-100">International standard for vehicle-to-grid communication enabling seamless charging without user interaction</p>
                      
                      <p className="text-blue-300 font-medium mt-3">Key Features:</p>
                      <ul className="text-blue-100 ml-2 space-y-1">
                        <li>• Automatic authentication and billing</li>
                        <li>• Certificate-based security (PKI)</li>
                        <li>• Bidirectional power transfer support</li>
                        <li>• Smart charging and load management</li>
                        <li>• Encrypted TLS communication</li>
                      </ul>
                      
                      <p className="text-blue-300 font-medium mt-3">Implementation:</p>
                      <p className="text-blue-100">• HomePlug Green PHY over PLC</p>
                      <p className="text-blue-100">• IPv6 and TCP/UDP protocols</p>
                      <p className="text-blue-100">• X.509 certificate management</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Control Pilot Signalling</h4>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <p className="text-green-300 font-medium">Basic PWM Communication:</p>
                      <p className="text-green-100">Square wave signal on CP pin indicating EVSE current capability and charging states</p>
                      
                      <p className="text-green-300 font-medium mt-3">Signal States:</p>
                      <ul className="text-green-100 ml-2 space-y-1">
                        <li>• +12V: EVSE ready, no vehicle connected</li>
                        <li>• +9V: Vehicle connected, not ready to charge</li>
                        <li>• +6V: Vehicle ready, charging permitted</li>
                        <li>• +3V: Charging in progress (with ventilation)</li>
                        <li>• 0V/-12V: Error state or emergency stop</li>
                      </ul>
                      
                      <p className="text-green-300 font-medium mt-3">PWM Duty Cycle:</p>
                      <p className="text-green-100">• 10% = 6A available current</p>
                      <p className="text-green-100">• 25% = 20A available current</p>
                      <p className="text-green-100">• 50% = 40A available current</p>
                      <p className="text-green-100">• 90% = 63A available current</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation and Testing */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-yellow-400" />
                Installation and Testing Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Pre-installation Checks</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-3">
                      <p className="text-yellow-300 font-medium">Electrical Infrastructure</p>
                      <ul className="text-yellow-100 text-sm ml-2 space-y-1">
                        <li>• Supply capacity assessment (Ze, Zs values)</li>
                        <li>• RCD compatibility (Type A, Type B requirements)</li>
                        <li>• Earthing system verification (TN-S, TN-C-S, TT)</li>
                        <li>• Cable sizing for voltage drop (&lt;5%)</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-3">
                      <p className="text-blue-300 font-medium">Environmental Considerations</p>
                      <ul className="text-blue-100 text-sm ml-2 space-y-1">
                        <li>• IP rating requirements (IP54 minimum)</li>
                        <li>• Temperature range (-30°C to +50°C)</li>
                        <li>• UV resistance for outdoor installations</li>
                        <li>• Mechanical impact protection (IK08+)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Testing and Commissioning</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
                      <p className="text-green-300 font-medium">Mandatory Tests</p>
                      <ul className="text-green-100 text-sm ml-2 space-y-1">
                        <li>• Insulation resistance (&gt;1MΩ)</li>
                        <li>• Earth continuity (&lt;0.5Ω)</li>
                        <li>• RCD trip time and sensitivity</li>
                        <li>• Control pilot signal verification</li>
                        <li>• Proximity pilot resistance check</li>
                      </ul>
                    </div>
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-3">
                      <p className="text-purple-300 font-medium">Functional Tests</p>
                      <ul className="text-purple-100 text-sm ml-2 space-y-1">
                        <li>• Connector retention force (80N minimum)</li>
                        <li>• Emergency stop operation</li>
                        <li>• Communication protocol verification</li>
                        <li>• Load balancing system test</li>
                        <li>• User interface functionality</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Developments */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Future Developments and Standards Evolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-3">MCS (Megawatt Charging)</h4>
                  <div className="text-purple-100 text-sm space-y-2">
                    <p><strong>Target:</strong> 1-3.75MW charging capability</p>
                    <p><strong>Voltage:</strong> Up to 1500V DC</p>
                    <p><strong>Current:</strong> Up to 3000A</p>
                    <p><strong>Applications:</strong> Heavy-duty vehicles, buses, trucks</p>
                    <p><strong>Features:</strong></p>
                    <ul className="ml-2">
                      <li>• Liquid-cooled cables mandatory</li>
                      <li>• Enhanced safety systems</li>
                      <li>• Automated connection systems</li>
                    </ul>
                    <p><strong>Timeline:</strong> Commercial deployment 2025-2026</p>
                  </div>
                </div>
                
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-3">Wireless Charging (WPT)</h4>
                  <div className="text-blue-100 text-sm space-y-2">
                    <p><strong>Standard:</strong> ISO 19363 (SAE J2954)</p>
                    <p><strong>Power:</strong> Up to 22kW (stationary)</p>
                    <p><strong>Efficiency:</strong> 85-95% power transfer</p>
                    <p><strong>Frequency:</strong> 85kHz operating frequency</p>
                    <p><strong>Applications:</strong></p>
                    <ul className="ml-2">
                      <li>• Stationary wireless charging</li>
                      <li>• Dynamic charging (en-route)</li>
                      <li>• Autonomous vehicle support</li>
                    </ul>
                    <p><strong>Challenges:</strong> Cost, efficiency, standardisation</p>
                  </div>
                </div>
                
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-3">Enhanced V2G Standards</h4>
                  <div className="text-green-100 text-sm space-y-2">
                    <p><strong>Protocols:</strong> ISO 15118-20, IEC 61850</p>
                    <p><strong>Power:</strong> Bidirectional up to 22kW AC</p>
                    <p><strong>Grid Services:</strong> Frequency regulation, peak shaving</p>
                    <p><strong>Features:</strong></p>
                    <ul className="ml-2">
                      <li>• Smart grid integration</li>
                      <li>• Blockchain energy trading</li>
                      <li>• AI-driven optimisation</li>
                    </ul>
                    <p><strong>Markets:</strong> UK, Netherlands, Denmark leading</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../ev-charging-module-2-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-2-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVChargingModule2Section4;