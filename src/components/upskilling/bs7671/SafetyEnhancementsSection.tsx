import { Shield, Eye, AlertTriangle, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SafetyEnhancementsSection = () => {
  return (
    <Card className="bg-gradient-to-r from-red-900/20 to-elec-gray border-red-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-elec-yellow" />
          Enhanced Safety Requirements
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-red-600 text-foreground">Critical Safety Updates</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Advanced Personal Protection Systems:</h5>
          
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded border-l-4 border-red-400">
              <div className="flex justify-between items-center mb-3">
                <h6 className="font-bold text-red-400 text-sm sm:text-base">Enhanced RCD Protection</h6>
                <Shield className="h-5 w-5 text-red-400" />
              </div>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• 10mA RCDs for enhanced personal protection</li>
                <li>• Type F RCDs mandatory for mixed load circuits</li>
                <li>• Self-monitoring RCDs with health diagnostics</li>
                <li>• Surge-resistant RCD requirements</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-orange-400">
              <div className="flex justify-between items-center mb-3">
                <h6 className="font-bold text-orange-400 text-sm sm:text-base">AFDD Evolution</h6>
                <AlertTriangle className="h-5 w-5 text-orange-400" />
              </div>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• Smart AFDDs with adaptive learning algorithms</li>
                <li>• Integration with building management systems</li>
                <li>• Remote monitoring and fault prediction</li>
                <li>• Enhanced detection for modern electronic loads</li>
              </ul>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h6 className="text-yellow-400 font-medium mb-2">Personal Protection Enhancements:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Ultra-sensitive RCD protection (10mA) for wet areas</li>
                  <li>• Enhanced touch voltage protection standards</li>
                  <li>• Advanced earth fault protection coordination</li>
                  <li>• Improved protection for DC systems and mixed installations</li>
                  <li>• Smart protection devices with self-diagnosis</li>
                </ul>
              </div>
              <div>
                <h6 className="text-yellow-400 font-medium mb-2">Fire Protection Advances:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Enhanced arc fault detection sensitivity</li>
                  <li>• Ground fault circuit interrupter improvements</li>
                  <li>• Temperature monitoring integration</li>
                  <li>• Smoke detection system electrical integration</li>
                  <li>• Automatic fire suppression system coordination</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Monitoring and Diagnostic Systems:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Real-Time Monitoring Requirements:</h6>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">Continuous System Health Monitoring:</span>
                </div>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• Insulation resistance continuous monitoring</li>
                  <li>• Earth fault loop impedance trending</li>
                  <li>• Power quality analysis and alerting</li>
                  <li>• Thermal imaging integration for hotspot detection</li>
                </ul>
              </div>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Predictive Safety Systems:</h6>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium">Advanced Fault Prediction:</span>
                </div>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• AI-powered fault prediction algorithms</li>
                  <li>• Preventive maintenance scheduling systems</li>
                  <li>• Component life cycle monitoring</li>
                  <li>• Risk assessment automation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Special Location Safety Upgrades:</h5>
          <div className="space-y-4">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-2">Bathroom and Wet Area Enhancements</h6>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Enhanced Zone Classifications:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Refined zone boundaries for modern bathroom layouts</li>
                    <li>• Smart shower and bath integration requirements</li>
                    <li>• Heated floor system safety enhancements</li>
                    <li>• Steam room and spa electrical safety standards</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Protection Requirements:</p>
                  <ul className="text-xs space-y-1">
                    <li>• 10mA RCD protection for all bathroom circuits</li>
                    <li>• Enhanced IP rating requirements</li>
                    <li>• Smart mirror and toilet electrical safety</li>
                    <li>• Wireless charging system integration</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-2">Medical and Healthcare Facility Requirements</h6>
              <ul className="text-sm space-y-1">
                <li>• Enhanced medical electrical system safety standards</li>
                <li>• Isolated power system requirements for critical care areas</li>
                <li>• Medical gas system electrical integration safety</li>
                <li>• Patient monitoring equipment electrical safety</li>
                <li>• Emergency power system reliability enhancements</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-2">Educational and Childcare Facilities</h6>
              <ul className="text-sm space-y-1">
                <li>• Enhanced protection for areas accessible to children</li>
                <li>• Smart classroom technology electrical safety</li>
                <li>• Playground and outdoor activity area requirements</li>
                <li>• Educational equipment electrical safety standards</li>
                <li>• Emergency evacuation system electrical integration</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Hazardous Environment Safety:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Enhanced ATEX Compliance:</h6>
              <ul className="text-sm space-y-1">
                <li>• Updated hazardous area classification requirements</li>
                <li>• Smart sensor integration in explosive atmospheres</li>
                <li>• Enhanced intrinsic safety barrier requirements</li>
                <li>• Temperature monitoring for explosion prevention</li>
                <li>• Advanced purge and pressurisation systems</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Industrial Safety Systems:</h6>
              <ul className="text-sm space-y-1">
                <li>• Enhanced machine safety electrical requirements</li>
                <li>• Smart lockout/tagout system integration</li>
                <li>• Advanced emergency stop system coordination</li>
                <li>• Functional safety system electrical integration</li>
                <li>• Robotic system electrical safety standards</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Emergency Response and Resilience:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
              <h6 className="font-bold text-purple-400 mb-1">Enhanced Emergency Power Systems</h6>
              <p className="text-sm">Advanced requirements for emergency power including renewable energy backup, smart grid disconnection procedures, and automated emergency response protocols.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-1">Smart Emergency Lighting</h6>
              <p className="text-sm">Integration of emergency lighting with building management systems, self-testing capabilities, and adaptive lighting patterns based on occupancy and emergency type.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-1">Communication System Integration</h6>
              <p className="text-sm">Enhanced requirements for emergency communication systems integration with electrical installations, including public address, fire alarm, and security system coordination.</p>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Implementation and Compliance Timeline:</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-lg font-bold text-elec-yellow mb-1">2025</div>
              <div className="text-xs font-medium mb-2">Immediate Implementation</div>
              <ul className="text-xs space-y-1">
                <li>• Enhanced RCD requirements</li>
                <li>• Smart AFDD installations</li>
                <li>• Basic monitoring systems</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-lg font-bold text-elec-yellow mb-1">2026</div>
              <div className="text-xs font-medium mb-2">Phased Rollout</div>
              <ul className="text-xs space-y-1">
                <li>• Predictive safety systems</li>
                <li>• Special location upgrades</li>
                <li>• Advanced monitoring</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-lg font-bold text-elec-yellow mb-1">2027</div>
              <div className="text-xs font-medium mb-2">Full Compliance</div>
              <ul className="text-xs space-y-1">
                <li>• Complete system integration</li>
                <li>• AI-powered safety systems</li>
                <li>• Advanced emergency response</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SafetyEnhancementsSection;