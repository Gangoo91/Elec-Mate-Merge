import { useEffect, useMemo } from 'react';
import { ArrowLeft, Route, Wrench, Shield, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import type { QuizQuestion } from '@/types/quiz';

const DataCablingModule2Section5 = () => {
  // SEO
  useEffect(() => {
    const title = 'Installation Methods & Best Practices | Data Cabling Module 2 Section 5';
    document.title = title;
    const desc = 'Essential installation techniques, routing methods, and safety practices for professional data cabling installations compliant with BS7671.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      (meta as HTMLMetaElement).name = 'description';
      document.head.appendChild(meta);
    }
    (meta as HTMLMetaElement).content = desc;

    // Canonical
    const href = window.location.origin + '/data-cabling-module-2-section-5';
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = href;
  }, []);

  // Quiz Data
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the maximum pulling tension for Category 6 UTP cable?',
      options: ['110N (25 lbf)', '220N (50 lbf)', '330N (75 lbf)', '440N (100 lbf)'],
      correctAnswer: 0,
      explanation: 'Category 6 UTP cable has a maximum pulling tension of 110N (25 lbf) to prevent damage to internal conductors.'
    },
    {
      id: 2,
      question: 'According to BS7671, what is the minimum separation distance between data and power cables at 240V?',
      options: ['50mm', '100mm', '150mm', '300mm'],
      correctAnswer: 3,
      explanation: 'BS7671 requires minimum 300mm separation between data cables and 240V power cables to prevent electromagnetic interference.'
    },
    {
      id: 3,
      question: 'What is the maximum recommended bundle size for Category 6A cables?',
      options: ['12 cables', '24 cables', '36 cables', '48 cables'],
      correctAnswer: 1,
      explanation: 'Category 6A cables should be limited to bundles of 24 cables maximum to control alien crosstalk (ANEXT).'
    },
    {
      id: 4,
      question: 'Which installation method provides the best protection for data cables in industrial environments?',
      options: ['Cable tray systems', 'Conduit and trunking', 'Direct burial', 'Overhead suspension'],
      correctAnswer: 1,
      explanation: 'Conduit and trunking provide the best protection against mechanical damage, moisture, and electromagnetic interference in industrial settings.'
    },
    {
      id: 5,
      question: 'What is the maximum recommended length for horizontal cable runs in structured cabling?',
      options: ['70 metres', '90 metres', '100 metres', '110 metres'],
      correctAnswer: 1,
      explanation: 'Horizontal cable runs should not exceed 90 metres to allow for 5 metres of patch cords at each end within the 100m channel limit.'
    }
  ], []);

  const sequentialQuestions = useMemo(
    () => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })),
    [questions]
  );

  return (
    <div className="min-h-screen bg-background">
      <div>
        <Link to="../data-cabling-module-2">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <Route className="h-8 w-8 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-semibold">
              Section 5
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Installation Methods and Best Practices
          </h1>
          <p className="text-base text-gray-400 max-w-3xl">
            Professional cable installation techniques and safety requirements
          </p>
        </div>

        <div className="space-y-8 mt-8">
          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Introduction to Professional Installation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Professional cable installation requires careful planning, appropriate techniques, and adherence to safety standards. 
                Proper installation methods ensure system performance, longevity, and compliance with BS7671 requirements.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-2">Installation Considerations:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• <span className="text-white">Route Planning:</span> Optimal pathways minimising interference and damage risk</li>
                  <li>• <span className="text-white">Support Systems:</span> Appropriate cable management and support structures</li>
                  <li>• <span className="text-white">Environmental Factors:</span> Temperature, moisture, and mechanical protection</li>
                  <li>• <span className="text-white">Safety Compliance:</span> BS7671 requirements and workplace safety</li>
                  <li>• <span className="text-white">Testing and Certification:</span> Verification of installation quality</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-3">After completing this section, you will be able to:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Plan efficient cable routes considering performance and safety requirements</li>
                  <li>• Apply appropriate installation methods for different environments</li>
                  <li>• Implement proper cable support and protection systems</li>
                  <li>• Understand separation requirements between data and power systems</li>
                  <li>• Follow safe working practices during cable installation</li>
                  <li>• Conduct post-installation testing and certification procedures</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Installation Methods */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Route className="h-5 w-5 text-yellow-400" />
                Cable Installation Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Different environments require specific installation approaches to ensure cable protection, accessibility, and performance maintenance.
              </p>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Conduit and Trunking Systems</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">Advantages</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Maximum mechanical protection</li>
                        <li>• Excellent electromagnetic shielding</li>
                        <li>• Easy cable replacement and additions</li>
                        <li>• Professional appearance</li>
                        <li>• Compliance with fire regulations</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Applications</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Industrial environments</li>
                        <li>• High-traffic commercial areas</li>
                        <li>• Areas requiring frequent reconfiguration</li>
                        <li>• Environments with EMI concerns</li>
                        <li>• Fire-rated installations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Cable Tray Systems</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">System Types</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Ladder type trays for heavy loads</li>
                        <li>• Perforated trays for ventilation</li>
                        <li>• Solid bottom for small cables</li>
                        <li>• Wire mesh for lighter applications</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Installation Considerations</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Support spacing every 1.5-2 metres</li>
                        <li>• Adequate clearance for cable access</li>
                        <li>• Proper grounding and bonding</li>
                        <li>• Load calculations for cable weight</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Ceiling and Floor Systems</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">Suspended Ceiling</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Use appropriate support methods</li>
                        <li>• Maintain fire integrity of ceiling</li>
                        <li>• Consider cable loading on ceiling grid</li>
                        <li>• Plan for maintenance access</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Raised Access Floors</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Utilise floor support structures</li>
                        <li>• Maintain adequate clearances</li>
                        <li>• Protect from mechanical damage</li>
                        <li>• Consider cooling airflow requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cable Pulling and Handling */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Cable Pulling and Handling Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Proper cable pulling techniques prevent damage during installation and ensure long-term performance of the network infrastructure.
              </p>

              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Pulling Limits and Techniques</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                    <div>
                      <p className="text-white font-medium mb-2">Cat5e UTP</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Max tension: 110N (25 lbf)</li>
                        <li>• Min bend radius: 25mm</li>
                        <li>• Bundle limit: No specific limit</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Cat6 UTP</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Max tension: 110N (25 lbf)</li>
                        <li>• Min bend radius: 25mm</li>
                        <li>• Careful handling required</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Cat6A</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Max tension: Variable by cable</li>
                        <li>• Min bend radius: 38mm</li>
                        <li>• Bundle limit: 24 cables</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Professional Pulling Methods</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">Equipment and Tools</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Cable pulling systems with tension monitoring</li>
                        <li>• Appropriate pulling grips and attachments</li>
                        <li>• Cable lubricants for long runs</li>
                        <li>• Pulling guides and corner rollers</li>
                        <li>• Communication systems for coordination</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Best Practices</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Pre-plan routes and identify obstacles</li>
                        <li>• Use intermediate pull points for long runs</li>
                        <li>• Maintain steady, consistent pulling speed</li>
                        <li>• Monitor tension throughout installation</li>
                        <li>• Support cable weight during installation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600/20 border border-yellow-400/30 p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-2">Critical Safety Points:</p>
                <ul className="space-y-1 text-yellow-400 text-sm">
                  <li>• Never exceed manufacturer's specified pulling tension</li>
                  <li>• Use proper personal protective equipment (PPE)</li>
                  <li>• Ensure clear communication between installation team members</li>
                  <li>• Stop immediately if excessive resistance is encountered</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Separation and EMI Protection */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                Cable Separation and EMI Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Proper separation between data and power systems is essential for maintaining signal integrity and complying with safety regulations.
              </p>

              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">BS7671 Separation Requirements</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-300">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left py-2 text-white">Power System Voltage</th>
                          <th className="text-left py-2 text-white">Minimum Separation</th>
                          <th className="text-left py-2 text-white">Alternative Protection</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-2">
                        <tr className="border-b border-gray-700">
                          <td className="py-2">Low voltage (&lt;50V)</td>
                          <td className="py-2">50mm</td>
                          <td className="py-2">Segregated containment</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="py-2">230V single phase</td>
                          <td className="py-2">300mm</td>
                          <td className="py-2">Metallic barrier/screen</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="py-2">400V three phase</td>
                          <td className="py-2">300mm</td>
                          <td className="py-2">Metallic barrier/screen</td>
                        </tr>
                        <tr>
                          <td className="py-2">High voltage (&gt;1kV)</td>
                          <td className="py-2">As per IEC standards</td>
                          <td className="py-2">Specialist containment</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">EMI Sources and Mitigation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">Common EMI Sources</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• AC power cables and distribution</li>
                        <li>• Motors and variable frequency drives</li>
                        <li>• Fluorescent lighting and ballasts</li>
                        <li>• Radio transmitters and wireless devices</li>
                        <li>• Switching power supplies</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Protection Methods</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Maintain adequate physical separation</li>
                        <li>• Use shielded cables in high EMI environments</li>
                        <li>• Cross power cables at 90-degree angles</li>
                        <li>• Implement proper grounding and bonding</li>
                        <li>• Use metallic containment systems</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Considerations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-yellow-400" />
                Environmental and Location Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Different installation environments present unique challenges requiring specific approaches and materials.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Indoor Environments</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white font-medium">Office Buildings</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Standard Category cables acceptable</li>
                        <li>• Focus on aesthetics and accessibility</li>
                        <li>• Fire-rated cables in return air spaces</li>
                        <li>• Consider future reconfiguration needs</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium">Industrial Facilities</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Enhanced mechanical protection required</li>
                        <li>• Consider chemical and temperature exposure</li>
                        <li>• Vibration and shock resistance</li>
                        <li>• Higher ingress protection ratings</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Outdoor and Harsh Environments</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white font-medium">Weather Protection</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• UV-resistant cable jackets</li>
                        <li>• Moisture and water ingress protection</li>
                        <li>• Temperature cycling considerations</li>
                        <li>• Wind and ice loading on installations</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium">Underground Installation</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Direct burial rated cables</li>
                        <li>• Protective conduit systems</li>
                        <li>• Rodent and pest protection</li>
                        <li>• Drainage and moisture management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-600/20 border border-red-500/30 p-4 rounded-lg">
                <p className="text-red-300 font-semibold mb-2">Environmental Hazards to Consider:</p>
                <ul className="space-y-1 text-red-200 text-sm">
                  <li>• Temperature extremes affecting cable performance</li>
                  <li>• Corrosive atmospheres damaging connections</li>
                  <li>• Mechanical damage from building movement</li>
                  <li>• Electromagnetic interference from equipment</li>
                  <li>• Fire and explosion risks in certain areas</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Testing and Certification */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                Installation Testing and Certification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Comprehensive testing ensures installation quality and provides documentation for warranty compliance and future maintenance.
              </p>

              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Testing Procedures</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">Pre-Installation Testing</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Cable reel testing before installation</li>
                        <li>• Equipment calibration verification</li>
                        <li>• Environmental condition assessment</li>
                        <li>• Installation route verification</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Post-Installation Testing</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Wire map and continuity verification</li>
                        <li>• Length and propagation delay measurement</li>
                        <li>• Performance parameter testing (full)</li>
                        <li>• Documentation and certification</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Documentation Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">Installation Records</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• As-built drawings and cable schedules</li>
                        <li>• Material specifications and certificates</li>
                        <li>• Installation method documentation</li>
                        <li>• Test results and certifications</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Handover Documentation</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Complete test reports and certificates</li>
                        <li>• Warranty information and terms</li>
                        <li>• Maintenance recommendations</li>
                        <li>• Contact information for support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-600/20 border border-green-500/30 p-4 rounded-lg">
                <p className="text-green-300 font-semibold mb-2">Quality Assurance Standards:</p>
                <ul className="space-y-1 text-green-200 text-sm">
                  <li>• Follow manufacturer installation guidelines precisely</li>
                  <li>• Implement systematic testing procedures for all links</li>
                  <li>• Maintain detailed records throughout installation process</li>
                  <li>• Provide comprehensive training for end users</li>
                  <li>• Establish clear support and maintenance procedures</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Check</CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz questions={sequentialQuestions} title="Installation Methods Quiz" />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../data-cabling-module-2-section-4">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <Link to="../data-cabling-module-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
                Complete Module 2
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule2Section5;