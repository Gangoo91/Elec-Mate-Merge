import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Router, Wifi, AlertCircle, Search, Network, Shield } from 'lucide-react';

export const BMSModule7Section3ContentPart4 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Router className="h-5 w-5 text-elec-yellow" />
          Advanced Addressing & Network Diagnostics
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Gateway Configuration & Protocol Bridging</h4>
          <p className="text-foreground mb-4">
            Modern BMS installations often require connecting devices using different communication protocols. 
            Gateways bridge between protocols, requiring careful addressing coordination to prevent conflicts and ensure reliable data flow.
          </p>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg p-4">
            <h5 className="text-blue-400 font-semibold mb-2">Multi-Protocol System Example</h5>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-foreground font-semibold mb-2">System Architecture:</p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-blue-500/20 rounded p-2">
                    <p className="text-blue-300 font-semibold">BACnet/IP Network</p>
                    <ul className="text-xs mt-1">
                      <li>• Main BMS controllers</li>
                      <li>• Device IDs: 100001-100050</li>
                      <li>• IP Range: 192.168.1.100-150</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/20 rounded p-2">
                    <p className="text-green-300 font-semibold">Modbus RTU Subnet</p>
                    <ul className="text-xs mt-1">
                      <li>• Energy meters and sensors</li>
                      <li>• Addresses: 1-32</li>
                      <li>• Via RS485 gateway</li>
                    </ul>
                  </div>
                  <div className="bg-purple-500/20 rounded p-2">
                    <p className="text-purple-300 font-semibold">KNX Lighting</p>
                    <ul className="text-xs mt-1">
                      <li>• Lighting control devices</li>
                      <li>• Physical: 1.1.1-1.15.255</li>
                      <li>• Via KNX/IP gateway</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
                <p className="text-orange-400 font-semibold mb-1">Gateway Addressing Considerations:</p>
                <ul className="text-xs space-y-1">
                  <li>• Each gateway needs unique BACnet Device ID</li>
                  <li>• Gateway IP addresses must not conflict with controllers</li>
                  <li>• Subnet addressing must be coordinated across all protocols</li>
                  <li>• Point mapping tables must track cross-protocol references</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Network Diagnostics & Troubleshooting</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h5 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Common Addressing Problems
              </h5>
              <div className="space-y-2 text-sm">
                <ul className="ml-4 space-y-2">
                  <li>
                    <strong className="text-red-300">Duplicate addresses:</strong>
                    <p className="text-foreground text-xs mt-1">Multiple devices respond to same address, causing data corruption and timeouts</p>
                  </li>
                  <li>
                    <strong className="text-red-300">Address gaps:</strong>
                    <p className="text-foreground text-xs mt-1">Missing device addresses cause polling delays and slow network performance</p>
                  </li>
                  <li>
                    <strong className="text-red-300">Wrong subnets:</strong>
                    <p className="text-foreground text-xs mt-1">IP devices on incorrect subnets cannot communicate with controllers</p>
                  </li>
                  <li>
                    <strong className="text-red-300">Mapping errors:</strong>
                    <p className="text-foreground text-xs mt-1">Physical points mapped to wrong software objects show incorrect data</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Diagnostic Tools & Methods
              </h5>
              <div className="space-y-2 text-sm">
                <ul className="ml-4 space-y-2">
                  <li>
                    <strong className="text-green-300">Network scanners:</strong>
                    <p className="text-foreground text-xs mt-1">Discover active devices and identify addressing conflicts or duplicates</p>
                  </li>
                  <li>
                    <strong className="text-green-300">Protocol analysers:</strong>
                    <p className="text-foreground text-xs mt-1">Monitor network traffic to identify communication errors and timing issues</p>
                  </li>
                  <li>
                    <strong className="text-green-300">Ping/connectivity tests:</strong>
                    <p className="text-foreground text-xs mt-1">Verify IP device reachability and basic network connectivity</p>
                  </li>
                  <li>
                    <strong className="text-green-300">Data validation:</strong>
                    <p className="text-foreground text-xs mt-1">Compare BMS readings with direct field measurements to verify mapping</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">IP Network Configuration</h4>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2">IP Addressing Strategy</h5>
              <div className="space-y-3 text-sm">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-foreground font-semibold mb-2">Network Segmentation:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• <strong>Management VLAN:</strong> 192.168.10.0/24</li>
                      <li>• <strong>Controllers VLAN:</strong> 192.168.20.0/24</li>
                      <li>• <strong>Field devices VLAN:</strong> 192.168.30.0/24</li>
                      <li>• <strong>Client access VLAN:</strong> 192.168.40.0/24</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-foreground font-semibold mb-2">Static IP Allocation:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• <strong>BMS servers:</strong> .10-.19</li>
                      <li>• <strong>Main controllers:</strong> .20-.99</li>
                      <li>• <strong>Gateways:</strong> .100-.109</li>
                      <li>• <strong>Smart devices:</strong> .110-.199</li>
                      <li>• <strong>DHCP pool:</strong> .200-.250</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
                  <p className="text-yellow-400 font-semibold mb-1">⚠️ IP Configuration Checklist:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Coordinate with IT department for VLAN and subnet allocation</li>
                    <li>• Document all static IP assignments in network register</li>
                    <li>• Configure appropriate subnet masks and default gateways</li>
                    <li>• Test inter-VLAN routing for multi-segment communications</li>
                    <li>• Verify DNS resolution for any named devices or services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Security Considerations for Device Addressing</h4>
          
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
            <h5 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Cybersecurity & Addressing
            </h5>
            <div className="space-y-3 text-sm">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Network Security Measures:</p>
                  <ul className="space-y-1">
                    <li>• <strong>Device authentication:</strong> Unique credentials per device</li>
                    <li>• <strong>Encrypted communications:</strong> Secure protocol variants</li>
                    <li>• <strong>Network segmentation:</strong> Isolate BMS from corporate networks</li>
                    <li>• <strong>Access control lists:</strong> Restrict device-to-device communication</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Addressing Security Practices:</p>
                  <ul className="space-y-1">
                    <li>• <strong>Avoid predictable patterns:</strong> Don't use sequential addressing</li>
                    <li>• <strong>Change default addresses:</strong> Never leave factory defaults</li>
                    <li>• <strong>Regular address audits:</strong> Verify only authorised devices</li>
                    <li>• <strong>Network monitoring:</strong> Detect unauthorised address usage</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-black rounded p-3 mt-3">
                <p className="text-foreground text-xs">
                  <strong>Critical Security Note:</strong> Default device passwords and addresses are major security vulnerabilities. 
                  All BMS devices must have unique, non-default credentials and addresses before network connection. 
                  Document security settings separately from technical addressing information.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Advanced Testing & Validation</h4>
          
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4">
            <h5 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
              <Network className="h-4 w-4" />
              Comprehensive Testing Procedures
            </h5>
            <div className="space-y-3 text-sm">
              <div className="grid gap-3">
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Phase 1: Individual Device Testing</p>
                  <ul className="ml-4 space-y-1 text-xs">
                    <li>• Verify each device responds to its assigned address only</li>
                    <li>• Test all configured I/O points individually</li>
                    <li>• Confirm data types and scaling match documentation</li>
                    <li>• Check device-specific parameters and configurations</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Phase 2: Network Integration Testing</p>
                  <ul className="ml-4 space-y-1 text-xs">
                    <li>• Verify multi-device polling sequences and timing</li>
                    <li>• Test gateway translation and data forwarding</li>
                    <li>• Confirm alarm propagation across network segments</li>
                    <li>• Validate trending and data logging from all devices</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-foreground font-semibold mb-2">Phase 3: System Performance Testing</p>
                  <ul className="ml-4 space-y-1 text-xs">
                    <li>• Load testing with all devices active simultaneously</li>
                    <li>• Network recovery testing after communication failures</li>
                    <li>• Failover testing for redundant addressing schemes</li>
                    <li>• Performance monitoring under peak data traffic</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded p-3 mt-3">
                <p className="text-green-400 font-semibold mb-1">✅ Sign-off Requirements:</p>
                <p className="text-xs text-foreground">
                  Complete addressing documentation, verified network performance metrics, successful 48-hour continuous 
                  operation test, and formal handover of addressing register and network topology documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};