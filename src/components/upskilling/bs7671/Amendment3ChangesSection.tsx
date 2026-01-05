import { Zap, Shield, Wifi, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Amendment3ChangesSection = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-900/20 to-elec-gray border-blue-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-6 w-6 text-elec-yellow" />
          Major Amendment 3 Changes Overview
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-blue-600 text-foreground">Revolutionary Updates</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Cybersecurity Integration Requirements:</h5>
          
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded border-l-4 border-purple-400">
              <div className="flex justify-between items-center mb-3">
                <h6 className="font-bold text-purple-400 text-sm sm:text-base">Smart System Security</h6>
                <Wifi className="h-5 w-5 text-purple-400" />
              </div>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• Mandatory cybersecurity assessment for connected systems</li>
                <li>• Secure configuration requirements for IoT devices</li>
                <li>• Network segregation for critical electrical systems</li>
                <li>• Regular security update procedures</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
              <div className="flex justify-between items-center mb-3">
                <h6 className="font-bold text-green-400 text-sm sm:text-base">Data Protection Standards</h6>
                <Shield className="h-5 w-5 text-green-400" />
              </div>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• GDPR compliance for smart meter installations</li>
                <li>• Encrypted communication protocols mandatory</li>
                <li>• User consent requirements for data collection</li>
                <li>• Privacy impact assessments for smart homes</li>
              </ul>
            </div>
          </div>
          
          <div className="hidden lg:block overflow-x-auto mt-6">
            <table className="w-full text-sm border border-gray-600">
              <thead>
                <tr className="border-b border-gray-600 bg-gray-800">
                  <th className="text-left py-3 px-4 text-elec-yellow">Security Aspect</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Requirement</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Implementation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4">Device Authentication</td>
                  <td className="py-3 px-4">Multi-factor authentication for smart devices</td>
                  <td className="py-3 px-4">Certificate-based security protocols</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4">Network Security</td>
                  <td className="py-3 px-4">Isolated networks for critical systems</td>
                  <td className="py-3 px-4">VLAN segregation and firewall protection</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Update Management</td>
                  <td className="py-3 px-4">Secure automatic update mechanisms</td>
                  <td className="py-3 px-4">Verified update channels and rollback procedures</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Enhanced AFDD Requirements:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Expanded Mandatory Applications:</h6>
              <ul className="text-sm space-y-1">
                <li>• All residential final circuits serving socket outlets</li>
                <li>• Lighting circuits in bedrooms and high-risk areas</li>
                <li>• Commercial premises with public access</li>
                <li>• Healthcare facilities (all patient areas)</li>
                <li>• Educational buildings (classrooms and dormitories)</li>
                <li>• Entertainment venues and assembly buildings</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Enhanced Performance Standards:</h6>
              <ul className="text-sm space-y-1">
                <li>• Improved detection algorithms for modern loads</li>
                <li>• Reduced nuisance tripping with LED lighting</li>
                <li>• Integration with smart home systems</li>
                <li>• Remote monitoring and diagnostic capabilities</li>
                <li>• Self-testing functions and health reporting</li>
                <li>• Coordination with RCDs and MCBs enhanced</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Advanced Fire Safety Measures:</h5>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-3 rounded border-l-4 border-red-400">
                <h6 className="font-bold text-red-400 mb-2">Cable Performance</h6>
                <ul className="text-sm space-y-1">
                  <li>• Enhanced fire-resistant cable specifications</li>
                  <li>• 120-minute fire survival for critical circuits</li>
                  <li>• Improved smoke and toxicity performance</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-3 rounded border-l-4 border-orange-400">
                <h6 className="font-bold text-orange-400 mb-2">Installation Methods</h6>
                <ul className="text-sm space-y-1">
                  <li>• Enhanced fire stopping requirements</li>
                  <li>• Improved cable support fire ratings</li>
                  <li>• Mandatory compartmentation integrity</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
                <h6 className="font-bold text-yellow-400 mb-2">Detection Systems</h6>
                <ul className="text-sm space-y-1">
                  <li>• Advanced fire detection integration</li>
                  <li>• Smart smoke detection with electrical systems</li>
                  <li>• Automatic isolation procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Smart Grid and Vehicle Integration:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-1">Vehicle-to-Grid (V2G) Standards</h6>
              <p className="text-sm">New requirements for bidirectional EV charging systems including grid synchronisation, power quality management, and emergency backup capabilities during power outages.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-1">Dynamic Load Management</h6>
              <p className="text-sm">Mandatory smart load management for installations over 63A, including peak demand limiting, time-of-use optimisation, and renewable energy prioritisation.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
              <h6 className="font-bold text-purple-400 mb-1">Grid Resilience Requirements</h6>
              <p className="text-sm">Enhanced requirements for installations to support grid stability including voltage regulation, frequency response, and islanding prevention for distributed generation.</p>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Implementation Timeline and Transition:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Immediate Requirements (2025):</h6>
              <ul className="text-sm space-y-1">
                <li>• Cybersecurity assessments for new smart installations</li>
                <li>• Enhanced AFDD requirements in high-risk premises</li>
                <li>• Updated fire safety cable specifications</li>
                <li>• V2G installation standards compliance</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Phased Implementation (2025-2027):</h6>
              <ul className="text-sm space-y-1">
                <li>• Gradual rollout of smart grid integration requirements</li>
                <li>• Training and competence development programs</li>
                <li>• Industry guidance document publication</li>
                <li>• Certification scheme updates and alignment</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Amendment3ChangesSection;