import { Award, FileCheck, ClipboardCheck, Users, Clock, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CertificatesAndFormsSection = () => {
  return (
    <Card className="bg-gradient-to-r from-green-900/20 to-elec-gray border-green-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Award className="h-6 w-6 text-elec-yellow" />
          Model Certificates and Forms
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-green-600 text-foreground">Legal Documentation</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-4 text-base sm:text-lg">Electrical Installation Certificate (EIC):</h5>
          
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
              <div className="flex justify-between items-center mb-3">
                <h6 className="font-bold text-green-400 text-sm sm:text-base">When Required</h6>
                <FileCheck className="h-5 w-5 text-green-400" />
              </div>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• New electrical installations</li>
                <li>• Complete rewiring projects</li>
                <li>• Major alterations or extensions</li>
                <li>• Consumer unit replacements</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-blue-400">
              <div className="flex justify-between items-center mb-3">
                <h6 className="font-bold text-blue-400 text-sm sm:text-base">Required Signatures</h6>
                <ClipboardCheck className="h-5 w-5 text-blue-400" />
              </div>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• Designer (responsible for design)</li>
                <li>• Constructor (installation responsibility)</li>
                <li>• Inspector/Tester (verification)</li>
                <li>• All three roles may be same person</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-yellow-400">
              <div className="flex justify-between items-center mb-3">
                <h6 className="font-bold text-yellow-400 text-sm sm:text-base">Key Information</h6>
                <Award className="h-5 w-5 text-yellow-400" />
              </div>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• Installation description and extent</li>
                <li>• Earthing and bonding arrangements</li>
                <li>• Protective measures employed</li>
                <li>• Schedule of test results</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Minor Electrical Installation Works Certificate (MEIWC):</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Suitable Applications:</h6>
              <ul className="text-sm space-y-1">
                <li>• Addition of socket outlets or lighting points</li>
                <li>• Installation of outside lighting</li>
                <li>• Replacement of accessories</li>
                <li>• Minor alterations not affecting main characteristics</li>
                <li>• Work not requiring design calculations</li>
                <li>• Single circuit additions or modifications</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Limitations and Exclusions:</h6>
              <ul className="text-sm space-y-1">
                <li>• Cannot be used for consumer unit changes</li>
                <li>• Not suitable for special location work</li>
                <li>• Excludes work requiring design verification</li>
                <li>• Must not create new circuits to special locations</li>
                <li>• Limited to competent person scheme members</li>
                <li>• Building control notification may still be required</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Electrical Installation Condition Report (EICR):</h5>
          <div className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-3 rounded border-l-4 border-red-500">
                <h6 className="font-bold text-red-400 mb-2">C1 - Danger Present</h6>
                <p className="text-xs">Immediate action required. Danger to life or property exists.</p>
              </div>
              <div className="bg-gray-800 p-3 rounded border-l-4 border-orange-500">
                <h6 className="font-bold text-orange-400 mb-2">C2 - Potentially Dangerous</h6>
                <p className="text-xs">Urgent remedial action required to remove potential danger.</p>
              </div>
              <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-500">
                <h6 className="font-bold text-yellow-400 mb-2">C3 - Improvement Recommended</h6>
                <p className="text-xs">Non-compliance with current standards, improvement recommended.</p>
              </div>
              <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-500">
                <h6 className="font-bold text-blue-400 mb-2">FI - Further Investigation</h6>
                <p className="text-xs">Unable to complete inspection, further investigation required.</p>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="text-yellow-400 font-medium mb-2">EICR Completion Requirements:</h6>
              <ul className="text-sm space-y-1">
                <li>• Only qualified and competent persons may complete EICRs</li>
                <li>• Must include overall condition assessment and recommendations</li>
                <li>• Requires sampling strategy for large installations</li>
                <li>• Limitation schedule must detail areas not inspected</li>
                <li>• Next inspection date recommendation required</li>
                <li>• Distribution to interested parties (landlords, tenants, etc.)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Schedule of Test Results Completion:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Circuit Information Required:</h6>
              <ul className="text-sm space-y-1">
                <li>• Circuit designation (clear identification)</li>
                <li>• Circuit description (type and location)</li>
                <li>• Reference method (installation method code)</li>
                <li>• Number of points served</li>
                <li>• Type and rating of protective device</li>
                <li>• Conductor cross-sectional area (live and protective)</li>
                <li>• Length of circuit run</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Test Results Documentation:</h6>
              <ul className="text-sm space-y-1">
                <li>• Continuity of protective conductors (R2)</li>
                <li>• Continuity of ring final circuits (r1+r2)</li>
                <li>• Insulation resistance (line/neutral to earth)</li>
                <li>• Polarity verification (satisfactory/unsatisfactory)</li>
                <li>• Earth fault loop impedance (Zs)</li>
                <li>• RCD operation times (general and additional protection)</li>
                <li>• Functional testing results</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-4 text-base sm:text-lg">Certificate Completion Excellence:</h5>
          
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-3 text-sm sm:text-base">EIC Best Practices</h6>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• Complete all sections legibly and accurately</li>
                <li>• Use permanent ink for handwritten entries</li>
                <li>• Ensure all three signatures are genuine</li>
                <li>• Cross-reference schedule entries with circuit labels</li>
                <li>• Include comprehensive scope description</li>
                <li>• Document any limitations or exclusions clearly</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-3 text-sm sm:text-base">MEIWC Standards</h6>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• Verify work scope falls within certificate limitations</li>
                <li>• Complete circuit details comprehensively</li>
                <li>• Document protective measures adequately</li>
                <li>• Include relevant test results only</li>
                <li>• Ensure competent person signature validity</li>
                <li>• Provide clear work description</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-orange-400">
              <h6 className="font-bold text-orange-400 mb-3 text-sm sm:text-base">EICR Professional Standards</h6>
              <ul className="text-sm sm:text-base space-y-2">
                <li>• Use appropriate sampling strategy</li>
                <li>• Document inspection limitations clearly</li>
                <li>• Apply coding classifications consistently</li>
                <li>• Provide actionable recommendations</li>
                <li>• Include photographic evidence where helpful</li>
                <li>• Set realistic next inspection dates</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-800 p-4 rounded touch-manipulation">
                <Users className="h-6 w-6 text-elec-yellow mb-3" />
                <h6 className="font-bold text-foreground mb-3 text-sm sm:text-base">Client Communication</h6>
                <ul className="text-sm space-y-2">
                  <li>• Explain certification requirements clearly</li>
                  <li>• Provide copies promptly after completion</li>
                  <li>• Maintain professional presentation</li>
                  <li>• Document client interactions</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded touch-manipulation">
                <Clock className="h-6 w-6 text-elec-yellow mb-3" />
                <h6 className="font-bold text-foreground mb-3 text-sm sm:text-base">Timely Completion</h6>
                <ul className="text-sm space-y-2">
                  <li>• Issue certificates without delay</li>
                  <li>• Notify building control within required timeframes</li>
                  <li>• Update competent person registers promptly</li>
                  <li>• Archive documentation systematically</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded touch-manipulation">
                <Shield className="h-6 w-6 text-elec-yellow mb-3" />
                <h6 className="font-bold text-foreground mb-3 text-sm sm:text-base">Quality Assurance</h6>
                <ul className="text-sm space-y-2">
                  <li>• Peer review complex installations</li>
                  <li>• Maintain competence through training</li>
                  <li>• Use calibrated test equipment</li>
                  <li>• Follow systematic procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-4 text-base sm:text-lg">Digital Documentation Integration:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-4 rounded border-l-4 border-purple-400">
              <h6 className="font-bold text-purple-400 mb-2 text-sm sm:text-base">Modern Documentation Tools</h6>
              <p className="text-sm sm:text-base">Tablet-based certification apps, cloud storage systems, digital signatures, and automated calculation tools are transforming documentation efficiency while maintaining compliance.</p>
            </div>
            <div className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-2 text-sm sm:text-base">Regulatory Acceptance</h6>
              <p className="text-sm sm:text-base">Digital certificates are legally acceptable provided they maintain document integrity, include required signatures, and can be reproduced in hard copy when required.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificatesAndFormsSection;
