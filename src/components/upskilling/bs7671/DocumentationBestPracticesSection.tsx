import { Shield, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DocumentationBestPracticesSection = () => {
  return (
    <Card className="bg-gradient-to-r from-indigo-900/20 to-elec-gray border-indigo-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-elec-yellow" />
          Professional Documentation Standards
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-indigo-600 text-foreground">Best Practice</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Legal and Professional Responsibilities:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Statutory Requirements:</h6>
              <ul className="text-sm space-y-1">
                <li>• Building Regulations Part P compliance certification</li>
                <li>• Electrical Safety Standards in the Private Rented Sector</li>
                <li>• Health and Safety at Work Act documentation</li>
                <li>• Consumer Rights Act warranty implications</li>
                <li>• Insurance requirements for professional indemnity</li>
                <li>• Data protection considerations for client records</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Professional Standards:</h6>
              <ul className="text-sm space-y-1">
                <li>• Institution of Engineering and Technology (IET) guidance</li>
                <li>• Competent Person Scheme requirements</li>
                <li>• NICEIC, NAPIT, ELECSA documentation standards</li>
                <li>• City & Guilds assessment criteria alignment</li>
                <li>• Continuing Professional Development (CPD) records</li>
                <li>• Quality management system compliance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Certificate Completion Excellence:</h5>
          
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
          <h5 className="text-elec-yellow font-semibold mb-3">Digital Documentation Integration:</h5>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h6 className="text-yellow-400 font-medium mb-2">Technology Benefits:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Automatic calculation verification reduces errors</li>
                  <li>• Standardised templates ensure consistency</li>
                  <li>• Cloud storage provides secure backup</li>
                  <li>• Electronic signatures speed processing</li>
                  <li>• Integration with test equipment streamlines workflow</li>
                  <li>• Version control maintains document integrity</li>
                </ul>
              </div>
              <div>
                <h6 className="text-yellow-400 font-medium mb-2">Implementation Considerations:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Ensure software meets BS 7671 requirements</li>
                  <li>• Maintain hard copy backup capabilities</li>
                  <li>• Train personnel on system operation</li>
                  <li>• Verify legal acceptability of digital signatures</li>
                  <li>• Consider client preferences and requirements</li>
                  <li>• Plan for system maintenance and updates</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="text-purple-400 font-medium mb-2">Recommended Digital Workflow:</h6>
              <div className="grid md:grid-cols-4 gap-2 text-sm">
                <div className="bg-gray-900 p-2 rounded text-center">
                  <div className="font-bold text-blue-400 mb-1">1. Survey</div>
                  <div className="text-xs">Tablet-based data collection</div>
                </div>
                <div className="bg-gray-900 p-2 rounded text-center">
                  <div className="font-bold text-green-400 mb-1">2. Design</div>
                  <div className="text-xs">Automated calculations</div>
                </div>
                <div className="bg-gray-900 p-2 rounded text-center">
                  <div className="font-bold text-yellow-400 mb-1">3. Test</div>
                  <div className="text-xs">Direct equipment integration</div>
                </div>
                <div className="bg-gray-900 p-2 rounded text-center">
                  <div className="font-bold text-purple-400 mb-1">4. Certify</div>
                  <div className="text-xs">Electronic completion</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Record Keeping and Archive Management:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Retention Requirements:</h6>
              <ul className="text-sm space-y-1">
                <li>• Electrical certificates: Minimum 6 years (limitation period)</li>
                <li>• Test results and calculations: Match certificate retention</li>
                <li>• Design documentation: Throughout installation life</li>
                <li>• Competence records: Duration of professional practice</li>
                <li>• Insurance documentation: As per policy requirements</li>
                <li>• Training records: Continuous professional development</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Archive Best Practices:</h6>
              <ul className="text-sm space-y-1">
                <li>• Systematic filing with clear identification</li>
                <li>• Multiple backup locations (physical and digital)</li>
                <li>• Regular review and purging of expired records</li>
                <li>• Access control for confidential information</li>
                <li>• Disaster recovery procedures in place</li>
                <li>• Format migration for long-term digital preservation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Common Documentation Errors and Prevention:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-red-400">
              <h6 className="font-bold text-red-400 mb-1">Incomplete Information</h6>
              <p className="text-sm mb-2"><strong>Error:</strong> Missing circuit descriptions, unclear protective device ratings, incomplete test results</p>
              <p className="text-sm"><strong>Prevention:</strong> Use comprehensive checklists, peer review processes, and systematic completion procedures</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-orange-400">
              <h6 className="font-bold text-orange-400 mb-1">Calculation Mistakes</h6>
              <p className="text-sm mb-2"><strong>Error:</strong> Incorrect Zs values, wrong correction factors, voltage drop miscalculations</p>
              <p className="text-sm"><strong>Prevention:</strong> Double-check all calculations, use verified software tools, maintain competence through training</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-1">Inappropriate Certification</h6>
              <p className="text-sm mb-2"><strong>Error:</strong> Using MEIWC for work requiring EIC, incorrect EICR coding, missing signatures</p>
              <p className="text-sm"><strong>Prevention:</strong> Understand certificate scope limitations, follow guidance notes, ensure competent person authority</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-1">Poor Presentation</h6>
              <p className="text-sm mb-2"><strong>Error:</strong> Illegible handwriting, unprofessional appearance, missing client copies</p>
              <p className="text-sm"><strong>Prevention:</strong> Use clear presentation methods, maintain professional standards, implement quality assurance procedures</p>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Client Relations and Professional Service:</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="font-bold text-green-400 mb-2">Pre-Work Communication</h6>
              <ul className="text-xs space-y-1">
                <li>• Explain certification requirements</li>
                <li>• Clarify scope and limitations</li>
                <li>• Discuss timescales and procedures</li>
                <li>• Provide cost estimates where appropriate</li>
                <li>• Document agreements and variations</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="font-bold text-blue-400 mb-2">During Installation</h6>
              <ul className="text-xs space-y-1">
                <li>• Maintain clear communication channels</li>
                <li>• Report significant issues promptly</li>
                <li>• Document variations and changes</li>
                <li>• Respect client property and privacy</li>
                <li>• Follow health and safety procedures</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="font-bold text-purple-400 mb-2">Post-Completion Service</h6>
              <ul className="text-xs space-y-1">
                <li>• Provide certificates promptly</li>
                <li>• Explain maintenance requirements</li>
                <li>• Offer guidance on operation</li>
                <li>• Maintain warranty obligations</li>
                <li>• Follow up on customer satisfaction</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentationBestPracticesSection;