import { Building, Home, Factory } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BS7671Module8Section2RealWorld = () => {
  return (
    <Card className="bg-gradient-to-r from-teal-900/20 to-elec-gray border-teal-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-6 w-6 text-elec-yellow" />
          Real-World Documentation Scenarios
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-teal-600 text-foreground">Practical Applications</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-elec-dark border-gray-600">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Home className="h-5 w-5 text-elec-yellow" />
                Residential Installation Project
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-4">
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Project: Victorian Terrace House Conversion</h6>
                <ul className="text-sm space-y-1">
                  <li>• Conversion of single dwelling to 3 flats</li>
                  <li>• New 3-phase supply installation required</li>
                  <li>• Individual metering for each flat</li>
                  <li>• Fire alarm system integration</li>
                  <li>• EV charging provision in rear car park</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Documentation Challenges:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Multiple EICs required for separate installations</li>
                  <li>• Complex earthing arrangements documentation</li>
                  <li>• Fire alarm interaction with lighting circuits</li>
                  <li>• Building control coordination requirements</li>
                  <li>• Landlord certification obligations</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Solutions Implemented:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Separate EIC for each flat with clear boundaries</li>
                  <li>• Common areas documented on building EIC</li>
                  <li>• Detailed earthing and bonding schedules</li>
                  <li>• Fire alarm certificate cross-referenced</li>
                  <li>• Digital documentation system for ongoing management</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-elec-dark border-gray-600">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Factory className="h-5 w-5 text-elec-yellow" />
                Industrial Installation Project
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-4">
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Project: Manufacturing Facility Upgrade</h6>
                <ul className="text-sm space-y-1">
                  <li>• 1000kVA transformer installation</li>
                  <li>• 150 motor control circuits</li>
                  <li>• Emergency lighting and fire safety systems</li>
                  <li>• Hazardous area classifications (Zone 1, Zone 2)</li>
                  <li>• Power factor correction and harmonics mitigation</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Documentation Complexity:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Phased installation requiring multiple certificates</li>
                  <li>• Hazardous area equipment certification</li>
                  <li>• Motor protection coordination studies</li>
                  <li>• Extensive test schedules for 400+ circuits</li>
                  <li>• Integration with existing building management systems</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Professional Approach:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Staged certification with clear phase definitions</li>
                  <li>• ATEX compliance documentation integrated</li>
                  <li>• Digital test data capture system</li>
                  <li>• Comprehensive as-built drawings package</li>
                  <li>• Maintenance schedule and procedure documentation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Complex Certification Scenarios:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Scenario 1: Partial Rewire with Retained Circuits</h6>
              <div className="bg-gray-800 p-3 rounded text-sm">
                <p className="mb-2"><strong>Challenge:</strong> Kitchen and bathroom rewire in occupied house with retained lighting circuits</p>
                <p className="mb-2"><strong>Documentation Required:</strong></p>
                <ul className="space-y-1 text-xs">
                  <li>• EIC for new installation work</li>
                  <li>• EICR for retained circuits to verify safety</li>
                  <li>• Clear scope definition on certificates</li>
                  <li>• Interface points documented</li>
                  <li>• Test results for both new and existing</li>
                </ul>
                <p className="mt-2 text-elec-yellow"><strong>Solution:</strong> Combined approach with clear boundary definitions and comprehensive testing program</p>
              </div>
            </div>
            
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Scenario 2: Emergency Lighting Integration</h6>
              <div className="bg-gray-800 p-3 rounded text-sm">
                <p className="mb-2"><strong>Challenge:</strong> New emergency lighting system interfacing with existing general lighting</p>
                <p className="mb-2"><strong>Documentation Required:</strong></p>
                <ul className="space-y-1 text-xs">
                  <li>• EIC for emergency lighting circuits</li>
                  <li>• BS 5266 compliance certification</li>
                  <li>• Duration and illumination test results</li>
                  <li>• Monthly and annual test log books</li>
                  <li>• Integration with fire alarm documentation</li>
                </ul>
                <p className="mt-2 text-elec-yellow"><strong>Solution:</strong> Multi-standard approach with cross-referenced documentation and ongoing test schedules</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Quality Control Case Studies:</h5>
          <div className="space-y-4">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-red-400">
              <h6 className="font-bold text-red-400 mb-2">Case Study: Certification Error Discovery</h6>
              <p className="text-sm mb-2"><strong>Situation:</strong> Post-completion inspection revealed Zs values exceeded tabulated limits on 3 circuits</p>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs font-semibold mb-1">Root Cause Analysis:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Calculation error in earth fault loop impedance</li>
                    <li>• Inadequate verification procedures</li>
                    <li>• Lack of peer review for complex calculations</li>
                    <li>• Test equipment calibration issue</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1">Corrective Actions:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Immediate circuit isolation and remedial work</li>
                    <li>• Enhanced calculation verification procedures</li>
                    <li>• Additional test equipment calibration checks</li>
                    <li>• Updated quality management procedures</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-2">Case Study: Excellence in Documentation</h6>
              <p className="text-sm mb-2"><strong>Situation:</strong> Large commercial project with exemplary documentation standards</p>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs font-semibold mb-1">Success Factors:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Comprehensive pre-planning and design review</li>
                    <li>• Digital documentation system with real-time updates</li>
                    <li>• Regular quality audits throughout installation</li>
                    <li>• Client engagement and communication excellence</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1">Outcomes Achieved:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Zero non-conformances in final inspection</li>
                    <li>• Client satisfaction rating of 98%</li>
                    <li>• Project completed ahead of schedule</li>
                    <li>• Recognition as industry best practice example</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Technology Integration Examples:</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="font-bold text-blue-400 mb-2">Mobile Data Capture</h6>
              <p className="text-sm mb-2">Tablet-based test result entry with automatic calculation verification</p>
              <ul className="text-xs space-y-1">
                <li>• Real-time error detection</li>
                <li>• Photograph integration</li>
                <li>• Automatic report generation</li>
                <li>• Cloud synchronisation</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="font-bold text-green-400 mb-2">Test Equipment Integration</h6>
              <p className="text-sm mb-2">Direct data transfer from test instruments to certification software</p>
              <ul className="text-xs space-y-1">
                <li>• Eliminates transcription errors</li>
                <li>• Timestamps all measurements</li>
                <li>• Maintains calibration traceability</li>
                <li>• Enables trend analysis</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="font-bold text-purple-400 mb-2">Digital Signatures</h6>
              <p className="text-sm mb-2">Secure electronic authentication for certificate completion</p>
              <ul className="text-xs space-y-1">
                <li>• Legal equivalence to handwritten signatures</li>
                <li>• Audit trail maintenance</li>
                <li>• Multi-party authentication</li>
                <li>• Document integrity protection</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Lessons Learned and Best Practices:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-1">Planning and Preparation</h6>
              <p className="text-sm">Thorough pre-work planning, including documentation requirements, significantly reduces completion time and error rates while improving client satisfaction.</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-1">Communication Excellence</h6>
              <p className="text-sm">Clear, frequent communication with clients, building control, and other stakeholders prevents misunderstandings and ensures smooth project delivery.</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-1">Continuous Improvement</h6>
              <p className="text-sm">Regular review of documentation processes, incorporation of new technologies, and learning from both successes and challenges drives professional excellence.</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
              <h6 className="font-bold text-purple-400 mb-1">Regulatory Compliance</h6>
              <p className="text-sm">Staying current with regulatory changes, maintaining competence through training, and understanding legal obligations ensures professional protection and public safety.</p>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Future Trends in Documentation:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Emerging Technologies:</h6>
              <ul className="text-sm space-y-1">
                <li>• Artificial intelligence for error detection and prevention</li>
                <li>• Blockchain technology for document authentication</li>
                <li>• Augmented reality for installation verification</li>
                <li>• IoT integration for ongoing monitoring and maintenance</li>
                <li>• Machine learning for pattern recognition and improvement</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Industry Evolution:</h6>
              <ul className="text-sm space-y-1">
                <li>• Increased focus on sustainability and carbon footprint</li>
                <li>• Integration with building information modelling (BIM)</li>
                <li>• Enhanced cybersecurity requirements for smart systems</li>
                <li>• Standardisation of digital documentation formats</li>
                <li>• Greater emphasis on data analytics and performance metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section2RealWorld;