import { ArrowLeft, ArrowRight, Smartphone, Wifi, Database, Zap, Gauge, Settings, Globe, Shield, Users, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import EVChargingModule2Section3Quiz from '@/components/upskilling/quiz/EVChargingModule2Section3Quiz';
import EVChargingModule2Section3FAQ from '@/components/upskilling/quiz/EVChargingModule2Section3FAQ';

const EVChargingModule2Section3 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
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
              <Smartphone className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white">
                  Smart Chargers, App Control, and APIs
                </h1>
                <p className="text-lg sm:text-xl text-gray-400">
                  Connected charging systems and remote management
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 3
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Wifi className="h-5 w-5 text-yellow-400" />
                Introduction to Smart Charging
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Smart charging represents the evolution of EV charging infrastructure beyond simple power delivery. 
                These systems incorporate connectivity, intelligence, and user interaction to optimise charging 
                operations, enhance user experience, and integrate with broader energy management systems.
              </p>
              <p>
                Modern smart chargers combine hardware functionality with software intelligence, enabling 
                remote monitoring, dynamic load management, payment processing, and integration with 
                renewable energy sources and grid services.
              </p>
              <div className="bg-yellow-400/20 border border-blue-600/30 rounded-lg p-4">
                <p className="text-blue-200 font-medium mb-2">Key Benefits:</p>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>• Remote monitoring and control capabilities</li>
                  <li>• Energy cost optimisation through time-of-use scheduling</li>
                  <li>• Integration with renewable energy sources</li>
                  <li>• Enhanced user experience through mobile applications</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Connectivity Technologies */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="h-5 w-5 text-yellow-400" />
                Connectivity Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-3">Wi-Fi Connectivity</h4>
                  <div className="text-purple-100 text-sm space-y-2">
                    <p><strong>Frequency:</strong> 2.4GHz/5GHz IEEE 802.11 standards</p>
                    <p><strong>Range:</strong> 30-100m depending on environment</p>
                    <p><strong>Data Rate:</strong> Up to 1.3Gbps (802.11ac)</p>
                    <p><strong>Applications:</strong> High-bandwidth data, firmware updates, real-time monitoring</p>
                    <p><strong>Security:</strong> WPA3 encryption, enterprise authentication</p>
                  </div>
                </div>
                
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-3">4G/5G Cellular</h4>
                  <div className="text-green-100 text-sm space-y-2">
                    <p><strong>Coverage:</strong> Extensive network coverage</p>
                    <p><strong>Reliability:</strong> 99.9% network availability</p>
                    <p><strong>Latency:</strong> 4G: 50ms, 5G: &lt;10ms</p>
                    <p><strong>Applications:</strong> Remote locations, redundant connectivity</p>
                    <p><strong>Cost:</strong> Ongoing data charges, SIM management</p>
                  </div>
                </div>
                
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-3">Ethernet/Hardwired</h4>
                  <div className="text-blue-100 text-sm space-y-2">
                    <p><strong>Standards:</strong> IEEE 802.3, Cat5e/Cat6 cabling</p>
                    <p><strong>Speed:</strong> 100Mbps to 10Gbps</p>
                    <p><strong>Reliability:</strong> Highest stability, no interference</p>
                    <p><strong>Applications:</strong> Commercial installations, critical infrastructure</p>
                    <p><strong>Installation:</strong> Requires structured cabling</p>
                  </div>
                </div>
                
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-300 mb-3">OCPP Over PLC</h4>
                  <div className="text-orange-100 text-sm space-y-2">
                    <p><strong>Technology:</strong> Power Line Communication</p>
                    <p><strong>Frequency:</strong> 2-30MHz over existing power cables</p>
                    <p><strong>Range:</strong> Up to 300m on low voltage networks</p>
                    <p><strong>Applications:</strong> Retrofit installations, cost reduction</p>
                    <p><strong>Limitations:</strong> Noise susceptibility, variable performance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <EVChargingModule2Section3FAQ />

          {/* Mobile Applications */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5 text-yellow-400" />
                Mobile Application Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Core Functionality</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded-md">
                      <p className="text-yellow-400 font-medium">Remote Start/Stop</p>
                      <p className="text-gray-300 text-sm">Initiate or terminate charging sessions remotely with instant feedback</p>
                    </div>
                    <div className="bg-card p-3 rounded-md">
                      <p className="text-yellow-400 font-medium">Real-time Monitoring</p>
                      <p className="text-gray-300 text-sm">Live power consumption, charging speed, and session duration tracking</p>
                    </div>
                    <div className="bg-card p-3 rounded-md">
                      <p className="text-yellow-400 font-medium">Scheduling & Timers</p>
                      <p className="text-gray-300 text-sm">Programme charging to start/stop at specific times for off-peak rates</p>
                    </div>
                    <div className="bg-card p-3 rounded-md">
                      <p className="text-yellow-400 font-medium">Energy Management</p>
                      <p className="text-gray-300 text-sm">Set charging limits, track energy consumption, and manage costs</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Advanced Features</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded-md">
                      <p className="text-yellow-400 font-medium">Load Balancing</p>
                      <p className="text-gray-300 text-sm">Automatic power distribution across multiple charging points</p>
                    </div>
                    <div className="bg-card p-3 rounded-md">
                      <p className="text-yellow-400 font-medium">Solar Integration</p>
                      <p className="text-gray-300 text-sm">Optimise charging to maximise use of solar generation</p>
                    </div>
                    <div className="bg-card p-3 rounded-md">
                      <p className="text-yellow-400 font-medium">Access Control</p>
                      <p className="text-gray-300 text-sm">RFID, PIN, or app-based authentication for user management</p>
                    </div>
                    <div className="bg-card p-3 rounded-md">
                      <p className="text-yellow-400 font-medium">Diagnostics</p>
                      <p className="text-gray-300 text-sm">Fault detection, maintenance alerts, and performance analytics</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OCPP Protocol */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="h-5 w-5 text-yellow-400" />
                Open Charge Point Protocol (OCPP)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 mb-4">
                <p className="text-green-200 font-medium mb-2">Protocol Overview</p>
                <p className="text-green-100 text-sm">
                  OCPP is an open standard communication protocol between charging stations and central 
                  management systems, ensuring interoperability and preventing vendor lock-in.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-3">OCPP 1.6J</h4>
                  <div className="text-blue-100 text-sm space-y-2">
                    <p><strong>Release:</strong> 2015</p>
                    <p><strong>Transport:</strong> WebSocket over TLS</p>
                    <p><strong>Messages:</strong> 44 message types</p>
                    <p><strong>Features:</strong></p>
                    <ul className="ml-2 space-y-1">
                      <li>• Smart charging profiles</li>
                      <li>• Local authorisation lists</li>
                      <li>• Firmware management</li>
                      <li>• Remote diagnostics</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-3">OCPP 2.0.1</h4>
                  <div className="text-purple-100 text-sm space-y-2">
                    <p><strong>Release:</strong> 2020</p>
                    <p><strong>Transport:</strong> WebSocket over TLS</p>
                    <p><strong>Messages:</strong> 80+ message types</p>
                    <p><strong>New Features:</strong></p>
                    <ul className="ml-2 space-y-1">
                      <li>• Device model framework</li>
                      <li>• ISO 15118 support</li>
                      <li>• Enhanced security</li>
                      <li>• Display message support</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-300 mb-3">Key Messages</h4>
                  <div className="text-orange-100 text-sm space-y-2">
                    <p><strong>Core Operations:</strong></p>
                    <ul className="ml-2 space-y-1">
                      <li>• Authorize</li>
                      <li>• StartTransaction</li>
                      <li>• StopTransaction</li>
                      <li>• StatusNotification</li>
                      <li>• MeterValues</li>
                      <li>• Heartbeat</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Integration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Settings className="h-5 w-5 text-yellow-400" />
                API Integration and Development
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-4">REST API Architecture</h4>
                  <div className="bg-card p-4 rounded-md space-y-3">
                    <div>
                      <p className="text-yellow-400 font-medium">Authentication</p>
                      <p className="text-gray-300 text-sm">OAuth 2.0, API keys, JWT tokens</p>
                    </div>
                    <div>
                      <p className="text-yellow-400 font-medium">Endpoints</p>
                      <div className="text-gray-300 text-sm font-mono">
                        <p>GET /api/v1/chargers</p>
                        <p>POST /api/v1/sessions/start</p>
                        <p>PUT /api/v1/settings</p>
                        <p>DELETE /api/v1/sessions/:id</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-yellow-400 font-medium">Response Formats</p>
                      <p className="text-gray-300 text-sm">JSON, XML, rate limiting (100 req/min)</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-4">WebSocket Real-time</h4>
                  <div className="bg-card p-4 rounded-md space-y-3">
                    <div>
                      <p className="text-yellow-400 font-medium">Live Data Streams</p>
                      <p className="text-gray-300 text-sm">Power consumption, charging status, error notifications</p>
                    </div>
                    <div>
                      <p className="text-yellow-400 font-medium">Event Types</p>
                      <div className="text-gray-300 text-sm">
                        <p>• session_started</p>
                        <p>• power_changed</p>
                        <p>• fault_detected</p>
                        <p>• session_completed</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-yellow-400 font-medium">Connection Management</p>
                      <p className="text-gray-300 text-sm">Auto-reconnection, heartbeat monitoring</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Load Management */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Gauge className="h-5 w-5 text-yellow-400" />
                Dynamic Load Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Load Balancing Algorithms</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-3">
                      <p className="text-blue-300 font-medium">Equal Distribution</p>
                      <p className="text-blue-100 text-sm">Available power divided equally among active sessions</p>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
                      <p className="text-green-300 font-medium">Priority-based</p>
                      <p className="text-green-100 text-sm">Allocation based on user hierarchy or payment tiers</p>
                    </div>
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-3">
                      <p className="text-purple-300 font-medium">First-come-first-served</p>
                      <p className="text-purple-100 text-sm">Earlier connections receive priority allocation</p>
                    </div>
                    <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-3">
                      <p className="text-orange-300 font-medium">Adaptive Scheduling</p>
                      <p className="text-orange-100 text-sm">ML-based prediction of charging patterns and grid conditions</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Implementation Example</h4>
                  <div className="bg-card p-4 rounded-md">
                    <div className="text-sm space-y-2">
                      <p className="text-yellow-400 font-medium">Scenario: 100A supply, 4 chargers</p>
                      <div className="text-gray-300 space-y-1">
                        <p>• Charger 1: 32A (Tesla Model S)</p>
                        <p>• Charger 2: 16A (Nissan Leaf)</p>
                        <p>• Charger 3: Standby</p>
                        <p>• Charger 4: 32A (BMW i3)</p>
                      </div>
                      <p className="text-green-300 font-medium mt-3">Total Demand: 80A (within limit)</p>
                      <p className="text-blue-300 text-sm">If Charger 3 activates (32A request):</p>
                      <p className="text-orange-300 text-sm">System reduces all to 25A each = 100A total</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security and Cyber Protection */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-yellow-400" />
                Cybersecurity Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Security Threats</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-3">
                      <p className="text-red-300 font-medium">Unauthorised Access</p>
                      <p className="text-red-100 text-sm">Weak authentication, default passwords, unsecured APIs</p>
                    </div>
                    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-3">
                      <p className="text-red-300 font-medium">Data Interception</p>
                      <p className="text-red-100 text-sm">Unencrypted communications, man-in-the-middle attacks</p>
                    </div>
                    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-3">
                      <p className="text-red-300 font-medium">DoS Attacks</p>
                      <p className="text-red-100 text-sm">Service disruption, resource exhaustion, network flooding</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Protection Measures</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
                      <p className="text-green-300 font-medium">Transport Layer Security</p>
                      <p className="text-green-100 text-sm">TLS 1.3, certificate validation, perfect forward secrecy</p>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
                      <p className="text-green-300 font-medium">Multi-factor Authentication</p>
                      <p className="text-green-100 text-sm">RFID + PIN, biometric verification, time-based OTP</p>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
                      <p className="text-green-300 font-medium">Network Segmentation</p>
                      <p className="text-green-100 text-sm">VLANs, firewalls, intrusion detection systems</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-world Implementation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="h-5 w-5 text-yellow-400" />
                Real-world Implementation Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-3">Commercial Fleet Management</h4>
                  <div className="text-blue-100 text-sm space-y-2">
                    <p><strong>Application:</strong> DHL delivery fleet charging</p>
                    <p><strong>Chargers:</strong> 50 x 22kW AC chargers</p>
                    <p><strong>Smart Features:</strong></p>
                    <ul className="ml-2 space-y-1">
                      <li>• Route-based charging scheduling</li>
                      <li>• Vehicle-to-grid integration</li>
                      <li>• Predictive maintenance alerts</li>
                      <li>• Real-time fleet status dashboard</li>
                    </ul>
                    <p><strong>Results:</strong> 25% reduction in energy costs, 99.8% uptime</p>
                  </div>
                </div>
                
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-3">Smart Home Integration</h4>
                  <div className="text-purple-100 text-sm space-y-2">
                    <p><strong>Application:</strong> Residential smart home ecosystem</p>
                    <p><strong>System:</strong> 7kW wallbox with solar PV</p>
                    <p><strong>Smart Features:</strong></p>
                    <ul className="ml-2 space-y-1">
                      <li>• Home energy management integration</li>
                      <li>• Solar surplus charging priority</li>
                      <li>• Time-of-use rate optimisation</li>
                      <li>• Emergency backup power capability</li>
                    </ul>
                    <p><strong>Results:</strong> 60% solar-powered charging, £400/year savings</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-lg font-medium text-white mb-4">
                Key Takeaways from Smart Chargers, App Control, and APIs:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-3">
                    <h4 className="text-blue-300 font-medium mb-2">Connectivity Options</h4>
                    <p className="text-blue-100 text-sm">
                      Choose between Wi-Fi (high bandwidth), cellular (reliable coverage), 
                      Ethernet (maximum stability), or PLC (retrofit friendly) based on installation requirements.
                    </p>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
                    <h4 className="text-green-300 font-medium mb-2">OCPP Protocol</h4>
                    <p className="text-green-100 text-sm">
                      OCPP ensures interoperability between manufacturers, with version 2.0.1 
                      offering enhanced security and ISO 15118 support for future-proof installations.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-3">
                    <h4 className="text-purple-300 font-medium mb-2">Smart Features</h4>
                    <p className="text-purple-100 text-sm">
                      Mobile apps enable remote control, scheduling, and monitoring whilst dynamic 
                      load management optimises power distribution across multiple charging points.
                    </p>
                  </div>
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-3">
                    <h4 className="text-orange-300 font-medium mb-2">API Integration</h4>
                    <p className="text-orange-100 text-sm">
                      REST APIs and WebSocket connections allow seamless integration with fleet 
                      management systems and real-time monitoring applications.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg mt-4">
                <p className="text-yellow-400 font-medium mb-2">
                  Professional Application:
                </p>
                <p className="text-gray-300 text-sm">
                  Understanding smart charging technologies is essential for designing modern EV infrastructure 
                  that can scale, integrate with existing systems, and adapt to future requirements. 
                  These systems not only improve user experience but also enable energy cost optimisation 
                  and grid integration capabilities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <EVChargingModule2Section3Quiz />

          <div className="flex justify-between">
            <Link to="../ev-charging-module-2-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-2-section-4">
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

export default EVChargingModule2Section3;