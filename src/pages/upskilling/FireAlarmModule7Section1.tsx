import { ArrowLeft, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { useMemo } from 'react';

const FireAlarmModule7Section1 = () => {
  // Quiz Data
  const questions = useMemo(() => [
    {
      id: 1,
      question: "Which BS 5839-1 system category provides complete building coverage for maximum life safety protection?",
      options: [
        "L1 system",
        "L2 system", 
        "L3 system",
        "P1 system"
      ],
      correct: 0,
      explanation: "L1 systems provide complete building coverage including all rooms and areas, offering the highest level of life safety protection under BS 5839-1."
    },
    {
      id: 2,
      question: "What is the primary difference between Grade A and Grade B domestic fire alarm systems?",
      options: [
        "Power supply type only",
        "Grade A requires a control panel, Grade B does not",
        "Number of detectors allowed",
        "Installation complexity only"
      ],
      correct: 1,
      explanation: "Grade A systems require control and indicating equipment with zone indication capabilities, while Grade B systems are interconnected devices without a central control panel."
    },
    {
      id: 3,
      question: "Which BS EN 54 standard covers fire alarm control and indicating equipment?",
      options: [
        "BS EN 54-2",
        "BS EN 54-3",
        "BS EN 54-5", 
        "BS EN 54-7"
      ],
      correct: 0,
      explanation: "BS EN 54-2 specifies requirements for control and indicating equipment used in fire detection and alarm systems, covering panels and their functions."
    },
    {
      id: 4,
      question: "What is the maximum voltage drop permitted to the furthest device in a Grade A domestic system?",
      options: [
        "1.0V",
        "1.5V",
        "2.0V",
        "2.5V"
      ],
      correct: 1,
      explanation: "BS 5839-6 specifies a maximum voltage drop of 1.5V to the furthest device in Grade A systems to ensure reliable operation of all components."
    },
    {
      id: 5,
      question: "Which of the following is NOT a Category P system application?",
      options: [
        "High-value property protection",
        "Complete building coverage for property",
        "Life safety in escape routes",
        "Defined building areas based on risk"
      ],
      correct: 2,
      explanation: "Life safety in escape routes is a Category L system application. Category P systems are specifically for property protection, not life safety."
    }
  ], []);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../fire-alarm-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <BookOpen className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  BS 5839 Parts 1 & 6: The Complete Standard
                </h1>
                <p className="text-xl text-gray-400">
                  Comprehensive guide to British Standards for fire detection and alarm systems
                </p>
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Understand the structure and scope of BS 5839 Part 1</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Learn the applications of BS 5839 Part 6</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Identify system categories and their requirements</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Understand design principles and documentation</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Learn about testing and commissioning requirements</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BS 5839 Overview and Legal Framework */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 5839: Legal Framework and Application</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                BS 5839 is the primary British Standard for fire detection and alarm systems, providing comprehensive 
                guidance that underpins UK fire safety legislation and building regulations compliance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                  <h4 className="text-red-400 font-semibold mb-2">Legal Status and Enforcement:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Referenced in Building Regulations Approved Document B</li>
                    <li>Regulatory Reform (Fire Safety) Order 2005 compliance</li>
                    <li>Insurance industry standard for risk assessment</li>
                    <li>Duty holder responsibilities under Fire Safety Act 2021</li>
                    <li>Planning condition requirements for new developments</li>
                  </ul>
                </div>
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Professional Competence Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Third-party certification scheme membership</li>
                    <li>FIA (Fire Industry Association) accreditation</li>
                    <li>BAFE (British Approvals for Fire Equipment) registration</li>
                    <li>Continuing professional development obligations</li>
                    <li>Professional indemnity insurance requirements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BS 5839 Part 1 Overview */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 5839-1: Commercial and Non-Domestic Systems</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                BS 5839-1 provides the code of practice for the design, installation, commissioning and maintenance 
                of fire detection and fire alarm systems in commercial and non-domestic buildings.
              </p>
              <div className="space-y-4">
                <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Scope and Application:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Commercial and industrial premises</li>
                      <li>Educational establishments and healthcare facilities</li>
                      <li>Hotels, guest houses, and boarding houses</li>
                      <li>Residential care homes and sheltered housing</li>
                      <li>Entertainment venues and sports facilities</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Shopping centres and retail premises</li>
                      <li>Transport terminals and car parks</li>
                      <li>Heritage buildings and places of worship</li>
                      <li>High-rise residential buildings (common areas)</li>
                      <li>Mixed-use developments and complexes</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Technical Standards Compliance:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>BS EN 54 series component specifications</li>
                    <li>Environmental and electromagnetic compatibility</li>
                    <li>Seismic and vibration resistance requirements</li>
                    <li>IP rating specifications for harsh environments</li>
                    <li>ATEX compliance for hazardous area applications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Categories */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Fire Alarm System Categories (BS 5839-1)</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                  <h4 className="text-red-400 font-semibold mb-2">Category L Systems</h4>
                  <p className="text-sm mb-2">Life safety systems for protecting people</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li><strong>L1:</strong> Complete building coverage including all rooms and areas</li>
                    <li><strong>L2:</strong> Escape routes plus areas of high fire risk or rapid fire spread</li>
                    <li><strong>L3:</strong> Escape routes only including corridors, stairways, and lobbies</li>
                    <li><strong>L4:</strong> Escape routes within fire compartment of origin only</li>
                    <li><strong>L5:</strong> Localised application to protect specific high-risk areas</li>
                  </ul>
                </div>
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Category P Systems</h4>
                  <p className="text-sm mb-2">Property protection systems for buildings and contents</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li><strong>P1:</strong> Complete building coverage for maximum property protection</li>
                    <li><strong>P2:</strong> Defined parts of building based on risk assessment</li>
                  </ul>
                  <div className="mt-3 bg-card border border-yellow-400/30 rounded p-2">
                    <p className="text-xs"><strong>Note:</strong> P systems may incorporate L system features</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BS 5839 Part 1 Detailed Structure */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 5839-1 Detailed Structure and Scope</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Part 1 - Sections Overview:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Section 0:</strong> Introduction and general principles</li>
                      <li><strong>Section 1:</strong> Scope and definitions</li>
                      <li><strong>Section 2:</strong> Normative references</li>
                      <li><strong>Section 3:</strong> Terms and definitions</li>
                      <li><strong>Section 4:</strong> Management of fire safety</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Section 5:</strong> System design principles</li>
                      <li><strong>Section 6:</strong> System components</li>
                      <li><strong>Section 7:</strong> Control and indicating equipment</li>
                      <li><strong>Section 8:</strong> Power supplies</li>
                      <li><strong>Section 9:</strong> Cables and wiring</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Additional Sections:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Section 10:</strong> Planning the system</li>
                      <li><strong>Section 11:</strong> Installation</li>
                      <li><strong>Section 12:</strong> Commissioning</li>
                      <li><strong>Section 13:</strong> Acceptance</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Section 14:</strong> Verification of system performance</li>
                      <li><strong>Section 15:</strong> Maintenance</li>
                      <li><strong>Section 16:</strong> Records</li>
                      <li><strong>Annexes:</strong> Technical guidance and examples</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BS 5839 Part 6 Detailed Coverage */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 5839-6 Comprehensive Coverage</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                BS 5839-6 provides detailed guidance for fire detection and alarm systems in domestic premises, 
                addressing the unique challenges of residential environments.
              </p>
              <div className="space-y-4">
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-4">
                  <h4 className="text-purple-400 font-semibold mb-2">Domestic System Types:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">Grade A Systems:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Mains powered with standby battery</li>
                        <li>Control and indicating equipment required</li>
                        <li>Zone indication capabilities</li>
                        <li>Remote monitoring possible</li>
                        <li>Professional installation required</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Grade B Systems:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Mains powered with battery backup</li>
                        <li>No control panel required</li>
                        <li>Interconnected alarm devices</li>
                        <li>Suitable for most domestic properties</li>
                        <li>Competent person installation acceptable</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-md p-3">
                    <h5 className="text-orange-400 font-medium mb-2">Grade C Systems:</h5>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Mains powered systems only</li>
                      <li>No battery backup provision</li>
                      <li>Limited application and reliability</li>
                      <li>Not recommended for new installations</li>
                      <li>May be acceptable for low-risk scenarios</li>
                    </ul>
                  </div>
                  <div className="bg-amber-600/10 border border-amber-600/20 rounded-md p-3">
                    <h5 className="text-amber-400 font-medium mb-2">Grade D Systems:</h5>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Battery powered detectors only</li>
                      <li>10-year sealed battery recommended</li>
                      <li>Minimum acceptable standard</li>
                      <li>Simple installation and maintenance</li>
                      <li>Suitable for basic protection needs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Selection Criteria */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">System Selection Criteria and Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                  <h4 className="text-red-400 font-semibold mb-2">Risk Factors for System Selection:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Building height and floor area</li>
                      <li>Occupancy type and vulnerability</li>
                      <li>Fire load and ignition sources</li>
                      <li>Construction materials and methods</li>
                      <li>Escape route configuration</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Sleeping accommodation presence</li>
                      <li>Disabled persons evacuation needs</li>
                      <li>Automatic suppression systems</li>
                      <li>Fire brigade access and response</li>
                      <li>Insurance and legal requirements</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Category Selection Matrix:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-yellow-400/30">
                          <th className="text-left p-2">Building Type</th>
                          <th className="text-left p-2">Minimum Category</th>
                          <th className="text-left p-2">Recommended</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-1">
                        <tr className="border-b border-yellow-400/30">
                          <td className="p-2">Small single-storey office</td>
                          <td className="p-2">M (Manual only)</td>
                          <td className="p-2">L3 or L4</td>
                        </tr>
                        <tr className="border-b border-yellow-400/30">
                          <td className="p-2">Multi-storey office</td>
                          <td className="p-2">L3</td>
                          <td className="p-2">L2</td>
                        </tr>
                        <tr className="border-b border-yellow-400/30">
                          <td className="p-2">Hotel/residential care</td>
                          <td className="p-2">L2</td>
                          <td className="p-2">L1</td>
                        </tr>
                        <tr>
                          <td className="p-2">High-value property</td>
                          <td className="p-2">P2</td>
                          <td className="p-2">P1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Design Principles */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Design Principles and Documentation</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="text-white font-semibold mb-2">Essential Design Considerations:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Risk assessment and system category selection</li>
                    <li>Zone planning and detector positioning</li>
                    <li>Cable routing and fire resistance requirements</li>
                    <li>Power supply and standby provisions</li>
                    <li>Integration with building services</li>
                  </ul>
                </div>
                <div className="bg-amber-600/10 border border-amber-600/20 rounded-md p-4">
                  <h4 className="text-amber-400 font-semibold mb-2">Required Documentation:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Fire strategy and cause and effect matrix</li>
                    <li>System schematic and zone plans</li>
                    <li>Equipment schedules and specifications</li>
                    <li>Installation and commissioning certificates</li>
                    <li>Operation and maintenance manuals</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Technical Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Technical Implementation Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-md p-4">
                  <h4 className="text-cyan-400 font-semibold mb-2">Component Specifications (BS EN 54 Series):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>BS EN 54-2:</strong> Control and indicating equipment</li>
                      <li><strong>BS EN 54-3:</strong> Fire alarm sounders</li>
                      <li><strong>BS EN 54-4:</strong> Power supply equipment</li>
                      <li><strong>BS EN 54-5:</strong> Heat detectors</li>
                      <li><strong>BS EN 54-7:</strong> Smoke detectors</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>BS EN 54-11:</strong> Manual call points</li>
                      <li><strong>BS EN 54-12:</strong> Smoke detector line equipment</li>
                      <li><strong>BS EN 54-17:</strong> Short circuit isolators</li>
                      <li><strong>BS EN 54-20:</strong> Aspirating smoke detectors</li>
                      <li><strong>BS EN 54-23:</strong> Visual alarm devices</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-indigo-600/10 border border-indigo-600/20 rounded-md p-4">
                  <h4 className="text-indigo-400 font-semibold mb-2">Installation Standards and Practices:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Cable fire resistance: 30, 60, 90, or 120 minutes</li>
                      <li>Maximum circuit resistance and voltage drop</li>
                      <li>Earthing and electrical separation requirements</li>
                      <li>EMC compliance and interference immunity</li>
                      <li>Environmental protection (IP ratings)</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Detector spacing and positioning criteria</li>
                      <li>Zone boundaries and compartmentation</li>
                      <li>Access for maintenance and testing</li>
                      <li>Integration with building management systems</li>
                      <li>Cause and effect programming</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BS 5839-6 Detailed Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 5839-6: Domestic Systems - Detailed Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-violet-600/10 border border-violet-600/20 rounded-md p-4">
                  <h4 className="text-violet-400 font-semibold mb-2">Grade A System Requirements:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <h5 className="text-white font-medium">Design Criteria:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Professional design required with risk assessment</li>
                        <li>Minimum 30V standby battery capacity</li>
                        <li>Control panel with zone indication (max 32 zones)</li>
                        <li>Fault monitoring and indication</li>
                        <li>Interface capability for transmission equipment</li>
                        <li>Test facilities for all functions</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-white font-medium">Installation Standards:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Fire-resistant cables (FP200 or equivalent)</li>
                        <li>Maximum 1.5V voltage drop to furthest device</li>
                        <li>Short circuit isolation within 100m</li>
                        <li>Minimum IP20 protection for indoor devices</li>
                        <li>Professional commissioning certificate required</li>
                        <li>Annual maintenance by competent person</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-teal-600/10 border border-teal-600/20 rounded-md p-4">
                  <h4 className="text-teal-400 font-semibold mb-2">Grade B System Implementation:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <h5 className="text-white font-medium">Technical Specifications:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Mains supply with integral battery backup</li>
                        <li>Interconnection via hard wiring or radio frequency</li>
                        <li>Maximum 40 interconnected devices per system</li>
                        <li>Automatic battery testing with low battery warning</li>
                        <li>Silence/test button on each detector</li>
                        <li>Hush feature for nuisance alarm management</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-white font-medium">Coverage Requirements:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>All circulation spaces (hallways, stairs, landings)</li>
                        <li>All rooms except bathrooms under 10m²</li>
                        <li>Heat detectors in kitchens and garages</li>
                        <li>Optical smoke detectors in living areas</li>
                        <li>Multi-sensor detectors for versatile protection</li>
                        <li>Carbon monoxide detection where applicable</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance and Compliance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Maintenance Schedules and Compliance Verification</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-emerald-600/10 border border-emerald-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Routine Maintenance Requirements:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">Daily (Automatic):</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>System self-monitoring</li>
                        <li>Battery condition checks</li>
                        <li>Fault signal verification</li>
                        <li>Power supply monitoring</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Weekly:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Visual inspection of panel</li>
                        <li>Log book entries review</li>
                        <li>Manual call point test (rotating basis)</li>
                        <li>Sounder test verification</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Monthly:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Full system function test</li>
                        <li>All manual call points tested</li>
                        <li>Battery standby test</li>
                        <li>Documentation updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-rose-600/10 border border-rose-600/20 rounded-md p-4">
                  <h4 className="text-rose-400 font-semibold mb-2">Annual Comprehensive Inspection:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Complete system performance verification</li>
                      <li>All detector sensitivity testing</li>
                      <li>Cable insulation resistance testing</li>
                      <li>Earth fault loop impedance verification</li>
                      <li>Battery capacity and autonomy testing</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Cause and effect programming verification</li>
                      <li>Integration system testing</li>
                      <li>Environmental condition assessment</li>
                      <li>Documentation and certification updates</li>
                      <li>Competent person signed certificate</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing and Commissioning */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Commissioning and Acceptance Testing</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Pre-Commissioning Checks:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Visual inspection of all equipment</li>
                    <li>Cable termination and labelling verification</li>
                    <li>Power supply connections and earthing</li>
                    <li>Device addressing and zone configuration</li>
                    <li>Documentation review and compliance check</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Commissioning Test Sequence:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Power supply and battery autonomy tests</li>
                    <li>All detector functional verification</li>
                    <li>Manual call point operation tests</li>
                    <li>Sounder and beacon operation verification</li>
                    <li>Fault monitoring and isolation testing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Acceptance Criteria:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>100% device response within specified time</li>
                    <li>No spurious alarms during testing period</li>
                    <li>All fault conditions properly indicated</li>
                    <li>System meets design specification</li>
                    <li>Documentation complete and accurate</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Handover Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Commissioning certificate issued</li>
                    <li>Operation and maintenance manuals provided</li>
                    <li>User training completed and documented</li>
                    <li>Maintenance contract arrangements confirmed</li>
                    <li>Building owner acceptance signature obtained</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <SingleQuestionQuiz 
            questions={questions} 
            title="Test Your Knowledge: BS 5839 Parts 1 & 6" 
          />

          <div className="flex justify-between">
            <div></div>
            <Link to="../fire-alarm-module-7-section-2">
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

export default FireAlarmModule7Section1;