import { CheckSquare, FileText, Scale, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ComplianceUpdatesSection = () => {
  return (
    <Card className="bg-gradient-to-r from-indigo-900/20 to-elec-gray border-indigo-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Scale className="h-6 w-6 text-elec-yellow" />
          Updated Compliance and Regulatory Framework
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-indigo-600 text-foreground">Regulatory Updates</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Enhanced Competence Requirements:</h5>
          
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded border-l-4 border-blue-400">
              <div className="flex justify-between items-center mb-3">
                <h6 className="font-bold text-blue-400 text-sm sm:text-base">Qualification Standards</h6>
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• Smart systems competence certification required</li>
                <li>• Cybersecurity awareness training mandatory</li>
                <li>• Renewable energy integration qualifications</li>
                <li>• Advanced testing and verification competence</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
              <div className="flex justify-between items-center mb-3">
                <h6 className="font-bold text-green-400 text-sm sm:text-base">CPD Requirements</h6>
                <CheckSquare className="h-5 w-5 text-green-400" />
              </div>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• Annual technology update training (16 hours minimum)</li>
                <li>• Amendment 3 compliance certification</li>
                <li>• Emerging technology workshops</li>
                <li>• Safety enhancement training programs</li>
              </ul>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h6 className="text-yellow-400 font-medium mb-2">Professional Development Requirements:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Smart technology installation and commissioning</li>
                  <li>• Cybersecurity risk assessment and mitigation</li>
                  <li>• Advanced fire safety system integration</li>
                  <li>• Emergency response system design and testing</li>
                  <li>• Renewable energy system design and integration</li>
                </ul>
              </div>
              <div>
                <h6 className="text-yellow-400 font-medium mb-2">Certification and Assessment Updates:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Amendment 3 specific assessment modules</li>
                  <li>• Practical smart system installation testing</li>
                  <li>• Advanced troubleshooting and diagnostic skills</li>
                  <li>• Client consultation and advisory competencies</li>
                  <li>• Digital documentation and quality assurance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Updated Documentation and Certification Requirements:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Enhanced Certificate Requirements:</h6>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">Smart System Documentation:</span>
                </div>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• Cybersecurity assessment certificates</li>
                  <li>• Smart device commissioning records</li>
                  <li>• Network configuration documentation</li>
                  <li>• Data protection compliance certificates</li>
                </ul>
              </div>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Digital Certification Standards:</h6>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium">Electronic Document Standards:</span>
                </div>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• Blockchain-verified certificate integrity</li>
                  <li>• Real-time test data integration</li>
                  <li>• Automated compliance verification</li>
                  <li>• Digital signature authentication protocols</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Building Control and Planning Integration:</h5>
          <div className="space-y-4">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
              <h6 className="font-bold text-purple-400 mb-2">Enhanced Building Regulations Interface</h6>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Part P Extensions:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Smart home system integration requirements</li>
                    <li>• EV charging installation notifications</li>
                    <li>• Renewable energy system approvals</li>
                    <li>• Battery storage system compliance</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Planning Permission Integration:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Grid connection impact assessments</li>
                    <li>• Community benefit sharing requirements</li>
                    <li>• Environmental impact documentation</li>
                    <li>• Smart infrastructure coordination</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-2">Local Authority Coordination Requirements</h6>
              <ul className="text-sm space-y-1">
                <li>• Smart city infrastructure integration protocols</li>
                <li>• Emergency services communication system coordination</li>
                <li>• Public safety system electrical integration requirements</li>
                <li>• Community resilience hub electrical specifications</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Insurance and Liability Framework Updates:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Professional Indemnity Requirements:</h6>
              <ul className="text-sm space-y-1">
                <li>• Enhanced coverage for smart system installations</li>
                <li>• Cybersecurity liability protection requirements</li>
                <li>• Data breach and privacy violation coverage</li>
                <li>• Technology obsolescence risk coverage</li>
                <li>• Long-term performance warranty obligations</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Client Protection Enhancements:</h6>
              <ul className="text-sm space-y-1">
                <li>• Smart system performance guarantees</li>
                <li>• Technology upgrade path protection</li>
                <li>• Cybersecurity incident response obligations</li>
                <li>• Data portability and extraction rights</li>
                <li>• System decommissioning responsibilities</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Quality Assurance and Audit Requirements:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-1">Enhanced Quality Management Systems</h6>
              <p className="text-sm">Requirement for ISO 9001 compliance with additional modules for smart system installation, cybersecurity management, and technology lifecycle management.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-1">Third-Party Verification Requirements</h6>
              <p className="text-sm">Mandatory independent verification for complex smart installations, renewable energy systems over 50kW, and critical infrastructure electrical installations.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-1">Continuous Monitoring and Reporting</h6>
              <p className="text-sm">Requirements for ongoing performance monitoring, annual compliance reporting, and proactive maintenance scheduling for smart and renewable energy systems.</p>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">International Standards Harmonisation:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">European Alignment:</h6>
              <ul className="text-sm space-y-1">
                <li>• IEC 61851 EV charging standards integration</li>
                <li>• IEC 62443 cybersecurity standards adoption</li>
                <li>• EN 50549 grid connection requirements</li>
                <li>• IEC 61508 functional safety standards</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Global Best Practice Integration:</h6>
              <ul className="text-sm space-y-1">
                <li>• IEEE smart grid standards incorporation</li>
                <li>• ISO 27001 information security management</li>
                <li>• IEC 62351 power system security standards</li>
                <li>• NIST cybersecurity framework alignment</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Compliance Timeline and Transition Support:</h5>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-lg font-bold text-blue-400 mb-1">Q1 2025</div>
              <div className="text-xs font-medium mb-2">Training Launch</div>
              <ul className="text-xs space-y-1">
                <li>• Amendment 3 courses</li>
                <li>• Competence assessments</li>
                <li>• Guidance publication</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-lg font-bold text-green-400 mb-1">Q2 2025</div>
              <div className="text-xs font-medium mb-2">System Updates</div>
              <ul className="text-xs space-y-1">
                <li>• Certification system upgrades</li>
                <li>• Digital platform launches</li>
                <li>• Assessment tool releases</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-lg font-bold text-yellow-400 mb-1">Q3 2025</div>
              <div className="text-xs font-medium mb-2">Pilot Programs</div>
              <ul className="text-xs space-y-1">
                <li>• Early adopter schemes</li>
                <li>• Industry testing</li>
                <li>• Feedback integration</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-lg font-bold text-purple-400 mb-1">Q4 2025</div>
              <div className="text-xs font-medium mb-2">Full Implementation</div>
              <ul className="text-xs space-y-1">
                <li>• Mandatory compliance</li>
                <li>• Full system operation</li>
                <li>• Ongoing support</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceUpdatesSection;