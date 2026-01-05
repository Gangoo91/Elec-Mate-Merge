import { Building2, Home, Zap, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BS7671Module8Section3RealWorld = () => {
  return (
    <Card className="bg-gradient-to-r from-emerald-900/20 to-elec-gray border-emerald-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-6 w-6 text-elec-yellow" />
          Amendment 3 Real-World Implementation
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-emerald-600 text-foreground">Practical Applications</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-elec-dark border-gray-600">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Home className="h-5 w-5 text-elec-yellow" />
                Smart Home Retrofit Project
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-4">
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Project: Victorian House Smart Upgrade</h6>
                <ul className="text-sm space-y-1">
                  <li>• Full home automation system integration</li>
                  <li>• Solar PV with battery storage installation</li>
                  <li>• EV charging with V2G capability</li>
                  <li>• Enhanced security and monitoring systems</li>
                  <li>• Smart HVAC with heat pump integration</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Amendment 3 Challenges:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Cybersecurity assessment for 50+ IoT devices</li>
                  <li>• AFDD requirements for all socket circuits</li>
                  <li>• Enhanced fire safety cable specifications</li>
                  <li>• Data protection compliance documentation</li>
                  <li>• Smart grid integration and load management</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Implementation Solutions:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Dedicated IoT network with enterprise-grade security</li>
                  <li>• Smart AFDDs with remote monitoring capability</li>
                  <li>• Enhanced fire-resistant cabling throughout</li>
                  <li>• Comprehensive privacy impact assessment</li>
                  <li>• Dynamic load management system integration</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-elec-dark border-gray-600">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Zap className="h-5 w-5 text-elec-yellow" />
                Commercial Microgrid Project
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-4">
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Project: Business Park Microgrid</h6>
                <ul className="text-sm space-y-1">
                  <li>• 500kW solar PV installation across multiple buildings</li>
                  <li>• 2MWh battery energy storage system</li>
                  <li>• Smart EV charging infrastructure (50 points)</li>
                  <li>• Advanced energy management and trading platform</li>
                  <li>• Grid services provision capability</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Amendment 3 Requirements:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Comprehensive cybersecurity framework</li>
                  <li>• Advanced fire safety for BESS installation</li>
                  <li>• Enhanced grid protection and coordination</li>
                  <li>• Real-time monitoring and predictive maintenance</li>
                  <li>• Emergency response and islanding procedures</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Technical Implementation:</h6>
                <ul className="text-sm space-y-1">
                  <li>• IEC 62443 cybersecurity standard compliance</li>
                  <li>• Enhanced fire suppression and detection systems</li>
                  <li>• Advanced protection relay coordination</li>
                  <li>• AI-powered predictive analytics platform</li>
                  <li>• Automated emergency response protocols</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Amendment 3 Implementation Case Studies:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Case Study 1: Hospital Critical Systems Upgrade</h6>
              <div className="bg-gray-800 p-3 rounded text-sm">
                <p className="mb-2"><strong>Challenge:</strong> Upgrade critical power systems while maintaining 24/7 operation</p>
                <p className="mb-2"><strong>Amendment 3 Requirements:</strong></p>
                <ul className="space-y-1 text-xs">
                  <li>• Enhanced medical equipment protection standards</li>
                  <li>• Advanced emergency power system monitoring</li>
                  <li>• Cybersecurity for medical device networks</li>
                  <li>• Predictive maintenance for critical systems</li>
                  <li>• Enhanced fire safety for patient areas</li>
                </ul>
                <p className="mt-2 text-elec-yellow"><strong>Result:</strong> 99.99% uptime maintained during upgrade with zero patient impact</p>
              </div>
            </div>
            
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Case Study 2: Educational Campus Smart Transformation</h6>
              <div className="bg-gray-800 p-3 rounded text-sm">
                <p className="mb-2"><strong>Challenge:</strong> Transform 1970s campus into smart, sustainable facility</p>
                <p className="mb-2"><strong>Amendment 3 Implementation:</strong></p>
                <ul className="space-y-1 text-xs">
                  <li>• Campus-wide smart classroom technology</li>
                  <li>• Renewable energy and storage integration</li>
                  <li>• Enhanced safety systems for student areas</li>
                  <li>• AI-powered energy management</li>
                  <li>• Advanced emergency response coordination</li>
                </ul>
                <p className="mt-2 text-elec-yellow"><strong>Result:</strong> 40% energy reduction with enhanced safety and learning outcomes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Implementation Challenges and Solutions:</h5>
          <div className="space-y-4">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-red-400">
              <h6 className="font-bold text-red-400 mb-2">Challenge: Cybersecurity Integration Complexity</h6>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs font-semibold mb-1">Common Issues:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Legacy system integration difficulties</li>
                    <li>• Skills gap in cybersecurity for electrical professionals</li>
                    <li>• Cost implications of security upgrades</li>
                    <li>• Balancing security with system performance</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1">Practical Solutions:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Phased implementation with security gateways</li>
                    <li>• Partnership with cybersecurity specialists</li>
                    <li>• Investment in training and certification</li>
                    <li>• Performance testing and optimisation</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-orange-400">
              <h6 className="font-bold text-orange-400 mb-2">Challenge: Enhanced Fire Safety Requirements</h6>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs font-semibold mb-1">Implementation Difficulties:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Higher cost of enhanced fire-resistant cables</li>
                    <li>• Retrofit challenges in existing buildings</li>
                    <li>• Coordination with building control authorities</li>
                    <li>• Testing and verification complexity</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1">Successful Approaches:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Early engagement with suppliers and authorities</li>
                    <li>• Phased upgrade programs with priority areas</li>
                    <li>• Comprehensive testing and documentation</li>
                    <li>• Client education on long-term value benefits</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-2">Challenge: Smart System Integration and Interoperability</h6>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs font-semibold mb-1">Technical Challenges:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Multiple communication protocols</li>
                    <li>• Device compatibility and interoperability</li>
                    <li>• System scalability and future-proofing</li>
                    <li>• Performance monitoring and optimisation</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1">Best Practice Solutions:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Open standards adoption (Matter, Thread)</li>
                    <li>• Comprehensive system testing and validation</li>
                    <li>• Modular design for easy upgrades</li>
                    <li>• Continuous monitoring and performance analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Professional Development and Training Outcomes:</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-3 rounded">
              <Shield className="h-5 w-5 text-elec-yellow mb-2" />
              <h6 className="font-bold text-foreground mb-2">Enhanced Competence</h6>
              <ul className="text-xs space-y-1">
                <li>• Cybersecurity risk assessment skills</li>
                <li>• Smart system commissioning expertise</li>
                <li>• Advanced fire safety knowledge</li>
                <li>• Emergency response planning</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <Zap className="h-5 w-5 text-elec-yellow mb-2" />
              <h6 className="font-bold text-foreground mb-2">Technical Skills</h6>
              <ul className="text-xs space-y-1">
                <li>• Advanced testing and verification</li>
                <li>• System integration and coordination</li>
                <li>• Performance monitoring and analytics</li>
                <li>• Predictive maintenance techniques</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <Building2 className="h-5 w-5 text-elec-yellow mb-2" />
              <h6 className="font-bold text-foreground mb-2">Business Development</h6>
              <ul className="text-xs space-y-1">
                <li>• New service offering opportunities</li>
                <li>• Enhanced client advisory capabilities</li>
                <li>• Technology partnership development</li>
                <li>• Premium service differentiation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Industry Transformation Impact:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-1">Market Evolution</h6>
              <p className="text-sm">Amendment 3 has created new market opportunities in smart systems, cybersecurity, and advanced safety systems, requiring electrical professionals to develop new competencies and service offerings.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-1">Client Expectations</h6>
              <p className="text-sm">Clients now expect integrated solutions combining electrical installation, smart technology, cybersecurity, and ongoing support services, requiring a more consultative approach to project delivery.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
              <h6 className="font-bold text-purple-400 mb-1">Professional Recognition</h6>
              <p className="text-sm">Amendment 3 compliance has become a mark of professional excellence, with clients and partners recognising the additional value and expertise required for contemporary electrical installations.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section3RealWorld;