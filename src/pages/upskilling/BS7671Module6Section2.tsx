import { ArrowLeft, ArrowRight, Eye, Book, AlertTriangle, Target, Search, HelpCircle, ChevronDown, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BS7671Module6Section2Quiz from '@/components/upskilling/quiz/BS7671Module6Section2Quiz';

const BS7671Module6Section2 = () => {
  const [expandedCheck, setExpandedCheck] = useState<number | null>(null);

  const inlineChecks = [
    {
      question: "Why must visual inspection be completed before electrical testing?",
      answer: "Visual inspection identifies defects that could make testing unsafe or provide false results. Testing faulty installations can damage equipment, cause injury, or mask underlying problems. BS 7671 Regulation 611 requires visual inspection to be completed with the installation disconnected before any electrical testing begins."
    },
    {
      question: "What are the key categories in the Schedule of Inspections?",
      answer: "The main categories are: equipment selection and suitability, environmental suitability, mechanical protection, cables and conductors, earthing and bonding arrangements, protective devices, labelling and identification, and special location requirements."
    },
    {
      question: "Who is responsible for the accuracy of test results?",
      answer: "The competent person signing the certificate is personally responsible for all test results and their accuracy. This includes ensuring correct test methods, calibrated instruments, proper interpretation of results, and comprehensive documentation."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div>
        <Link to="../bs7671-module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Eye className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Visual Inspection and Testing Responsibilities
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Module 6, Section 2
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 6.2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                25 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Book className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Before electrical testing begins, visual inspection must be carried out on every installation. 
                This step identifies defects that could make testing unsafe or mask underlying issues. It's not 
                enough to just run test instruments — electricians are responsible for ensuring the installation 
                is correctly designed, assembled, and labelled. Under BS 7671, both inspection and testing are 
                mandatory, and the responsibility lies with the competent person signing the certificate.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4">By the end of this section, you should be able to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Explain why visual inspection is carried out before testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify key items to check during inspection</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Describe the responsibilities of electricians during testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand the link between inspection, testing, and certification</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Content / Learning - Section 1 */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">1. Purpose of Visual Inspection</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Critical Safety Foundation
              </p>
              <p className="mb-4">
                Visual inspection represents the first and most crucial phase of initial verification. Under BS 7671 
                Regulation 611, this systematic examination must be completed with the installation completely 
                disconnected from the supply. The inspection serves multiple critical purposes: ensuring tester safety, 
                identifying defects that could compromise subsequent electrical testing, and verifying compliance with 
                design specifications and regulatory requirements.
              </p>
              
              <div className="bg-red-900/20 p-4 rounded-md border border-red-600/30 mb-6">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Critical Safety Protocol
                </h4>
                <p className="text-sm mb-3">
                  Testing faulty installations can result in equipment damage, personal injury, or invalidate test results. 
                  Visual inspection identifies these hazards before any electrical testing begins.
                </p>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-sm font-semibold text-white">
                    "Electrical testing must NEVER be carried out without first completing a thorough visual inspection"
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4 flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Primary Inspection Objectives
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-3">Safety Verification</h5>
                      <ul className="text-sm space-y-2">
                        <li>• Ensures installation is safe to test and energise</li>
                        <li>• Identifies immediate safety hazards</li>
                        <li>• Verifies isolation and safety procedures</li>
                        <li>• Confirms protective measures are in place</li>
                        <li>• Validates emergency provisions and signage</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-3">Defect Identification</h5>
                      <ul className="text-sm space-y-2">
                        <li>• Damaged cables and insulation breaches</li>
                        <li>• Loose or inadequate terminations</li>
                        <li>• Incorrect protective device selections</li>
                        <li>• Missing or inadequate earthing/bonding</li>
                        <li>• Non-compliant installation methods</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">Design and Compliance Verification</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Design Adherence</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Circuit arrangements match design</li>
                        <li>• Cable routes as specified</li>
                        <li>• Equipment selections correct</li>
                        <li>• Load calculations verified</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">BS 7671 Compliance</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Fundamental principles adherence</li>
                        <li>• Special location requirements</li>
                        <li>• Protection methods verification</li>
                        <li>• Installation method compliance</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Manufacturer Instructions</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Equipment installation methods</li>
                        <li>• Environmental limitations</li>
                        <li>• Connection requirements</li>
                        <li>• Maintenance access provisions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/20 p-4 rounded-md border border-green-600/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Systematic Inspection Methodology</h4>
                  <p className="text-sm mb-3">
                    Effective visual inspection requires a systematic approach to ensure no critical aspects are overlooked:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Supply to Load Path</h5>
                      <ul className="text-sm space-y-1">
                        <li>1. Incoming supply arrangements</li>
                        <li>2. Main switchgear and distribution</li>
                        <li>3. Distribution boards and protective devices</li>
                        <li>4. Circuit wiring and containment</li>
                        <li>5. Final circuits and accessories</li>
                        <li>6. Load connections and terminations</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Safety Systems Check</h5>
                      <ul className="text-sm space-y-1">
                        <li>1. Earthing system integrity</li>
                        <li>2. Equipotential bonding completeness</li>
                        <li>3. RCD and protective device presence</li>
                        <li>4. Fire barriers and segregation</li>
                        <li>5. Emergency switching provisions</li>
                        <li>6. Warning notices and identification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card 
                className={`bg-blue-900/20 border-blue-600/30 cursor-pointer transition-all duration-200 hover:bg-blue-900/30`}
                onClick={() => setExpandedCheck(expandedCheck === 0 ? null : 0)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-yellow-400" />
                      Interactive Check: Safety Protocol
                    </div>
                    {expandedCheck === 0 ? 
                      <ChevronDown className="h-4 w-4 text-yellow-400" /> : 
                      <ChevronRight className="h-4 w-4 text-yellow-400" />
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-white mb-3">{inlineChecks[0].question}</p>
                  {expandedCheck === 0 && (
                    <div className="bg-card p-3 rounded border border-green-600/30 mt-3">
                      <p className="text-sm text-green-300 font-semibold mb-2">Answer:</p>
                      <p className="text-sm text-white">{inlineChecks[0].answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Content / Learning - Section 2 */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">2. Key Items to Inspect</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Comprehensive Inspection Checklist (BS 7671 Schedule of Inspections)
              </p>
              
              <div className="bg-purple-900/20 p-4 rounded-md border border-purple-600/30 mb-6">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Mandatory Schedule of Inspections
                </h4>
                <p className="text-sm mb-3">
                  BS 7671 Appendix 6 provides the definitive Schedule of Inspections that must be completed for all 
                  installations. This checklist ensures consistency and completeness across all verification activities.
                </p>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-sm font-semibold text-white">
                    Every item marked as applicable must be inspected and recorded as satisfactory before proceeding to testing.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Equipment Selection and Suitability
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-3">Conductor Selection Verification</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Current-carrying capacity:</strong> Cable size adequate for design current</li>
                        <li>• <strong>Voltage rating:</strong> Insulation suitable for system voltage</li>
                        <li>• <strong>Environmental suitability:</strong> Temperature, chemical, UV resistance</li>
                        <li>• <strong>Mechanical protection:</strong> Armoured cables where required</li>
                        <li>• <strong>Fire performance:</strong> Low smoke, halogen-free where specified</li>
                        <li>• <strong>Identification:</strong> Core colours comply with BS 7671 Table 51</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-3">Protective Device Verification</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Current rating:</strong> Protective device rating ≥ design current</li>
                        <li>• <strong>Type characteristics:</strong> B, C, D curves appropriate for load</li>
                        <li>• <strong>Breaking capacity:</strong> Adequate for prospective fault current</li>
                        <li>• <strong>Discrimination:</strong> Selective operation achieved</li>
                        <li>• <strong>RCD protection:</strong> Type and sensitivity appropriate</li>
                        <li>• <strong>Special applications:</strong> AFDD, RCBO as specified</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4 flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Environmental Suitability Assessment
                  </h4>
                  <div className="grid gap-4">
                    <div className="bg-yellow-900/20 p-4 rounded border border-yellow-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">IP Rating Verification</h5>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <h6 className="font-semibold text-white mb-2">Standard Environments</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Domestic: IP2X minimum</li>
                            <li>• Office/commercial: IP2X</li>
                            <li>• General industrial: IP4X</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-semibold text-white mb-2">Wet Locations</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Bathrooms: IPX4 (zones 1,2)</li>
                            <li>• Swimming pools: IPX5</li>
                            <li>• External installations: IP44</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-semibold text-white mb-2">Harsh Environments</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Agriculture: IP54</li>
                            <li>• Wash-down areas: IP65</li>
                            <li>• Dusty locations: IP5X</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-900/20 p-4 rounded border border-orange-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Special Location Requirements</h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-semibold text-white mb-2">Bathrooms (Section 701)</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Zone 0: No electrical equipment</li>
                            <li>• Zone 1: IPX4, SELV only</li>
                            <li>• Zone 2: IPX4, Class II or RCD protected</li>
                            <li>• Supplementary bonding verification</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-semibold text-white mb-2">Swimming Pools (Section 702)</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Zone 0: 12V SELV maximum</li>
                            <li>• Zone 1: IPX5, SELV circuits only</li>
                            <li>• Zone 2: IPX2, RCD protection mandatory</li>
                            <li>• Equipotential bonding essential</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">🔧 Installation Quality and Workmanship</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-3">Cable Installation Standards</h5>
                      <div className="space-y-3">
                        <div className="bg-blue-900/20 p-3 rounded border border-blue-600/30">
                          <h6 className="font-semibold text-yellow-400 mb-2">Support and Fixings</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Horizontal runs: Support every 300mm (PVC), 400mm (LSF)</li>
                            <li>• Vertical runs: Support every 400mm</li>
                            <li>• Cable tray/ladder: Secure fixing at joints</li>
                            <li>• Conduit/trunking: Support per manufacturer requirements</li>
                          </ul>
                        </div>
                        <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                          <h6 className="font-semibold text-yellow-400 mb-2">Mechanical Protection</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Protection from impact damage</li>
                            <li>• Armoured cables in vulnerable locations</li>
                            <li>• Conduit/trunking where specified</li>
                            <li>• Cable guards at penetrations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-3">Safety System Integrity</h5>
                      <div className="space-y-3">
                        <div className="bg-red-900/20 p-3 rounded border border-red-600/30">
                          <h6 className="font-semibold text-yellow-400 mb-2">Earthing and Bonding</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Main earthing terminal correctly connected</li>
                            <li>• Equipotential bonding to metallic services</li>
                            <li>• Supplementary bonding where required</li>
                            <li>• Protective conductor continuity maintained</li>
                          </ul>
                        </div>
                        <div className="bg-purple-900/20 p-3 rounded border border-purple-600/30">
                          <h6 className="font-semibold text-yellow-400 mb-2">Identification and Labelling</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Circuit identification at distribution boards</li>
                            <li>• Emergency switching clearly marked</li>
                            <li>• Warning notices at appropriate locations</li>
                            <li>• Isolation point identification</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">📊 Documentation and Compliance Evidence</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-orange-900/20 p-3 rounded border border-orange-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-2">Equipment Compliance</h5>
                      <ul className="text-sm space-y-1">
                        <li>• CE marking presence</li>
                        <li>• British/European standards compliance</li>
                        <li>• Third-party certification</li>
                        <li>• Declaration of performance</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 p-3 rounded border border-blue-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-2">Installation Records</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Design calculations availability</li>
                        <li>• As-built drawings accuracy</li>
                        <li>• Specification compliance</li>
                        <li>• Variation documentation</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-2">Safety Documentation</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Risk assessment records</li>
                        <li>• Method statements</li>
                        <li>• Safety procedures evidence</li>
                        <li>• Competency verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 p-4 rounded-md border border-blue-600/30 mt-4">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-400 mb-1">In-line Check:</p>
                    <p className="text-sm">👉 Question: Name two items that must be checked during visual inspection.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content / Learning - Section 3 */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">3. Responsibilities During Testing</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Professional Accountability and Testing Protocol
              </p>
              
              <div className="bg-red-900/20 p-4 rounded-md border border-red-600/30 mb-6">
                <h4 className="text-yellow-400 font-semibold mb-3">⚖️ Legal and Professional Responsibility</h4>
                <p className="text-sm mb-3">
                  The electrician conducting testing assumes full legal responsibility for safety and accuracy. 
                  This includes criminal liability under health and safety legislation and professional accountability 
                  for all recorded results and safety assessments.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">📋 Mandatory Testing Sequence (Regulation 612)</h4>
                  <div className="grid gap-4">
                    <div className="bg-purple-900/20 p-4 rounded border border-purple-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Dead Testing Phase (Installation Isolated)</h5>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <h6 className="font-semibold text-white mb-2">1-2. Continuity Tests</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Protective conductors</li>
                            <li>• Ring final circuits</li>
                            <li>• Equipotential bonding</li>
                            <li>• Test current: ≥200mA</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-semibold text-white mb-2">3. Insulation Resistance</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Minimum values: ≥1MΩ</li>
                            <li>• Test voltages specified</li>
                            <li>• Electronic equipment isolation</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-semibold text-white mb-2">4. Polarity Check</h6>
                          <ul className="text-sm space-y-1">
                            <li>• Single-pole device connections</li>
                            <li>• Socket outlet verification</li>
                            <li>• Lampholder polarity</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-900/20 p-4 rounded border border-orange-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Live Testing Phase (Controlled Energisation)</h5>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="font-semibold text-white mb-2">5. Earth Fault Loop Impedance</h6>
                          <ul className="text-sm space-y-1">
                            <li>• External impedance (Ze) measurement</li>
                            <li>• Circuit impedance (Zs) verification</li>
                            <li>• Maximum values per BS 7671 tables</li>
                            <li>• Temperature correction applied</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-semibold text-white mb-2">6-7. Protection Testing</h6>
                          <ul className="text-sm space-y-1">
                            <li>• RCD operation times</li>
                            <li>• Phase sequence verification</li>
                            <li>• Functional device testing</li>
                            <li>• Emergency systems operation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">🎯 Result Validation and Action Requirements</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-900/20 p-4 rounded border border-green-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Acceptable Results</h5>
                      <ul className="text-sm space-y-2">
                        <li>• All values within BS 7671 limits</li>
                        <li>• No safety concerns identified</li>
                        <li>• Protective devices operate correctly</li>
                        <li>• Documentation complete and accurate</li>
                        <li>• Installation ready for energisation</li>
                      </ul>
                    </div>
                    <div className="bg-red-900/20 p-4 rounded border border-red-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Unsatisfactory Results</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Mandatory corrective action</strong> required</li>
                        <li>• Installation must remain isolated</li>
                        <li>• Defects must be rectified completely</li>
                        <li>• Re-testing required after corrections</li>
                        <li>• Client notification of issues</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 p-4 rounded-md border border-blue-600/30 mt-4">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-400 mb-1">In-line Check:</p>
                    <p className="text-sm">👉 Question: What must an electrician do if test results fall outside BS 7671 limits?</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content / Learning - Section 4 */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">4. Recording and Accountability</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Professional Documentation and Legal Accountability
              </p>
              
              <div className="bg-red-900/20 p-4 rounded-md border border-red-600/30 mb-6">
                <h4 className="text-yellow-400 font-semibold mb-3">⚖️ Legal Significance of Certification</h4>
                <p className="text-sm mb-3">
                  The person signing inspection and testing certificates assumes full legal responsibility for all 
                  recorded information. This creates both professional accountability and potential criminal liability 
                  under health and safety legislation.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">📋 Documentation Requirements</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-900/20 p-4 rounded border border-blue-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Mandatory Recording (EIC/MEIWC)</h5>
                      <ul className="text-sm space-y-2">
                        <li>• All inspection results documented</li>
                        <li>• Complete test results recorded</li>
                        <li>• Defects clearly identified</li>
                        <li>• Limitations of inspection noted</li>
                        <li>• Recommendations for improvement</li>
                        <li>• Next inspection date specified</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 p-4 rounded border border-green-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Supporting Documentation</h5>
                      <ul className="text-sm space-y-2">
                        <li>• Instrument calibration certificates</li>
                        <li>• Risk assessments and method statements</li>
                        <li>• Photographic evidence of defects</li>
                        <li>• Manufacturer data sheets</li>
                        <li>• Design calculations and drawings</li>
                        <li>• Previous inspection reports</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">🎯 Individual Accountability Framework</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-purple-900/20 p-4 rounded border border-purple-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Competence Requirements</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Formal electrical qualifications</li>
                        <li>• Inspection and testing competence</li>
                        <li>• Current BS 7671 knowledge</li>
                        <li>• Risk assessment abilities</li>
                        <li>• Instrument operation skills</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-900/20 p-4 rounded border border-yellow-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Professional Obligations</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Accurate result recording</li>
                        <li>• Safety-first decision making</li>
                        <li>• Client duty of care</li>
                        <li>• Professional indemnity insurance</li>
                        <li>• Continuous professional development</li>
                      </ul>
                    </div>
                    <div className="bg-orange-900/20 p-4 rounded border border-orange-600/30">
                      <h5 className="font-semibold text-yellow-400 mb-3">Quality Assurance</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Calibrated instrument use only</li>
                        <li>• Systematic inspection procedures</li>
                        <li>• Independent result verification</li>
                        <li>• Documentation review processes</li>
                        <li>• Peer assessment participation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 p-4 rounded-md border border-blue-600/30 mt-4">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-400 mb-1">In-line Check:</p>
                    <p className="text-sm">👉 Question: Who is legally responsible for inspection and testing results once a certificate is signed?</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comprehensive Practical Guidance */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="h-5 w-5 text-yellow-400" />
                Advanced Inspection and Testing Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              {/* Systematic Inspection Methodology */}
              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Systematic Inspection Checklists and Methodologies
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-3">Distribution Board Inspection Protocol</h5>
                    <ul className="text-sm space-y-2">
                      <li>• Verify IP rating appropriate for location and environment</li>
                      <li>• Check all protective devices correctly rated and type-tested</li>
                      <li>• Confirm RCD/RCBO placement meets BS 7671 requirements</li>
                      <li>• Inspect all terminations for tightness and corrosion</li>
                      <li>• Verify labelling clear, permanent, and corresponds to circuit layout</li>
                      <li>• Check spare ways adequately protected or blanked off</li>
                      <li>• Confirm earthing bar connections and continuity</li>
                      <li>• Inspect for evidence of overheating or arcing</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-3">Cable Installation Assessment</h5>
                    <ul className="text-sm space-y-2">
                      <li>• Verify cable types suitable for installation method</li>
                      <li>• Check support spacing meets manufacturer requirements</li>
                      <li>• Inspect for mechanical damage during installation</li>
                      <li>• Confirm separation from non-electrical services</li>
                      <li>• Verify fire barriers maintain compartmentation</li>
                      <li>• Check cable bending radii not exceeded</li>
                      <li>• Inspect containment for sharp edges and burrs</li>
                      <li>• Confirm cable capacity calculations account for grouping</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Testing Sequence Optimisation */}
              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Testing Sequence Optimisation and Safety Protocols</h4>
                <div className="space-y-4">
                  <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                    <h5 className="font-semibold text-white mb-2">Optimal Testing Sequence (Dead Tests)</h5>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div>
                        <h6 className="font-semibold text-yellow-400 text-sm mb-1">Phase 1: Continuity</h6>
                        <ul className="text-xs space-y-1">
                          <li>1. Protective conductor continuity</li>
                          <li>2. Ring final circuit continuity</li>
                          <li>3. Main equipotential bonding</li>
                          <li>4. Supplementary bonding</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold text-yellow-400 text-sm mb-1">Phase 2: Insulation</h6>
                        <ul className="text-xs space-y-1">
                          <li>1. Insulation resistance</li>
                          <li>2. Site applied insulation</li>
                          <li>3. Protective separation</li>
                          <li>4. Floor/wall heating systems</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold text-yellow-400 text-sm mb-1">Phase 3: Polarity</h6>
                        <ul className="text-xs space-y-1">
                          <li>1. All single-pole devices</li>
                          <li>2. Socket outlets and accessories</li>
                          <li>3. Bayonet lampholders</li>
                          <li>4. Fixed appliance connections</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-900/20 p-3 rounded border border-orange-600/30">
                    <h5 className="font-semibold text-white mb-2">Live Testing Safety Protocol</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Ensure all dead tests satisfactorily completed first</li>
                      <li>• Use appropriate PPE for live working procedures</li>
                      <li>• Verify test instrument appropriate for system voltage</li>
                      <li>• Check earth fault loop impedance before RCD testing</li>
                      <li>• Test RCDs in correct sequence (upstream to downstream)</li>
                      <li>• Re-energise circuits systematically with load monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Defect Identification Techniques */}
              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Advanced Defect Identification and Reporting</h4>
                <div className="grid gap-4">
                  <div className="bg-red-900/20 p-3 rounded border border-red-600/30">
                    <h5 className="font-semibold text-white mb-2">Critical Defects (Immediate Danger)</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Live parts accessible to touch (IP2X not achieved)</li>
                      <li>• Missing or inadequate earthing arrangements</li>
                      <li>• RCD protection absent where required by regulations</li>
                      <li>• Cables damaged with exposed conductors</li>
                      <li>• Overloaded circuits or incorrect protective device ratings</li>
                      <li>• Non-compliant bathroom/shower room installations</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600/30">
                    <h5 className="font-semibold text-white mb-2">Potentially Dangerous Defects</h5>
                    <ul className="text-sm space-y-1">
                      <li>• High insulation resistance readings indicating deterioration</li>
                      <li>• RCD test times approaching maximum permitted values</li>
                      <li>• Earth fault loop impedance values close to maximum permitted</li>
                      <li>• Signs of overheating in terminations or accessories</li>
                      <li>• Inadequate IP rating for environmental conditions</li>
                      <li>• Missing warning labels or identification</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quality Assurance Procedures */}
              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Quality Assurance and Peer Review Processes</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Self-Verification Checks</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Review all test results against BS 7671 acceptance criteria</li>
                      <li>• Cross-reference circuit descriptions with actual installation</li>
                      <li>• Verify all sections of certificate completed accurately</li>
                      <li>• Check calculations and ensure consistency throughout</li>
                      <li>• Confirm all defects identified and appropriately categorised</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Peer Review Requirements</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Complex installations requiring specialist knowledge</li>
                      <li>• First-time installations of new technology (AFDD, etc.)</li>
                      <li>• High-risk environments or special locations</li>
                      <li>• Installations where test results are borderline</li>
                      <li>• Any work where competence may be questioned</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Professional Development */}
              <div className="bg-green-900/20 p-4 rounded-md border border-green-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Professional Development and Competence Maintenance</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Continuing Professional Development</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Annual update training on BS 7671 amendments and guidance</li>
                      <li>• Regular calibration and use of test equipment</li>
                      <li>• Participation in industry forums and technical discussions</li>
                      <li>• Review of incident reports and lessons learned</li>
                      <li>• Mentoring and knowledge transfer activities</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Competence Documentation</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Maintain records of all installations verified</li>
                      <li>• Document challenging installations and solutions</li>
                      <li>• Keep evidence of training and development activities</li>
                      <li>• Regular assessment and verification by competent person scheme</li>
                      <li>• Professional registration maintenance and renewal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Check 2 */}
          <Card 
            className={`bg-blue-900/20 border-blue-600/30 cursor-pointer transition-all duration-200 hover:bg-blue-900/30`}
            onClick={() => setExpandedCheck(expandedCheck === 1 ? null : 1)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-yellow-400" />
                  Interactive Check: Inspection Categories
                </div>
                {expandedCheck === 1 ? 
                  <ChevronDown className="h-4 w-4 text-yellow-400" /> : 
                  <ChevronRight className="h-4 w-4 text-yellow-400" />
                }
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-white mb-3">{inlineChecks[1].question}</p>
              {expandedCheck === 1 && (
                <div className="bg-card p-3 rounded border border-green-600/30 mt-3">
                  <p className="text-sm text-green-300 font-semibold mb-2">Answer:</p>
                  <p className="text-sm text-white">{inlineChecks[1].answer}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comprehensive Real World Example */}
          <Card className="bg-gradient-to-r from-elec-gray to-elec-dark border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Real World Case Study: Retail Unit Comprehensive Inspection
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-card p-4 rounded border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Project Details</h4>
                <p className="text-sm mb-2">
                  <strong>Location:</strong> High street retail unit, Birmingham - former bank premises
                </p>
                <p className="text-sm mb-2">
                  <strong>Size:</strong> 400m² ground floor with basement storage (150m²)
                </p>
                <p className="text-sm mb-2">
                  <strong>Work:</strong> Complete electrical refurbishment for clothing retailer
                </p>
                <p className="text-sm">
                  <strong>Inspection Challenge:</strong> Mixture of original 1970s installation and various additions over 40 years
                </p>
              </div>

              <div className="bg-red-900/20 p-4 rounded border border-red-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Systematic Inspection Reveals Multiple Issues</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Visual Inspection Findings</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Distribution board labelling:</strong> 70% of circuits incorrectly identified</li>
                      <li>• <strong>Cable identification:</strong> Mixed core colours throughout installation</li>
                      <li>• <strong>Earthing arrangements:</strong> Original TT system converted to TN-S incorrectly</li>
                      <li>• <strong>RCD protection:</strong> Missing on all socket circuits installed pre-2008</li>
                      <li>• <strong>Fire barriers:</strong> Numerous penetrations not properly sealed</li>
                      <li>• <strong>Mechanical protection:</strong> Cables in basement running through storage areas unprotected</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Equipment and Installation Issues</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Obsolete equipment:</strong> Several rewireable fuses still in use</li>
                      <li>• <strong>Overloading:</strong> Ring circuits extended beyond safe capacity</li>
                      <li>• <strong>Special locations:</strong> Staff toilet area non-compliant with Section 701</li>
                      <li>• <strong>Emergency lighting:</strong> System not maintained, several fittings failed</li>
                      <li>• <strong>Containment:</strong> Steel trunking system with poor earth continuity</li>
                      <li>• <strong>Accessories:</strong> Various non-standard items installed over time</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 p-4 rounded border border-yellow-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Detailed Testing Process and Discoveries</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Dead Testing Results</h5>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div>
                        <h6 className="font-semibold text-yellow-400 text-sm mb-1">Continuity Testing</h6>
                        <ul className="text-xs space-y-1">
                          <li>• 3 ring circuits with breaks in protective conductor</li>
                          <li>• Main earthing connection resistance 2.3Ω (should be &lt;0.5Ω)</li>
                          <li>• Steel trunking system with multiple discontinuities</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold text-yellow-400 text-sm mb-1">Insulation Resistance</h6>
                        <ul className="text-xs space-y-1">
                          <li>• 2 circuits below 1MΩ (basement dampness issue)</li>
                          <li>• Several junction boxes with deteriorated connections</li>
                          <li>• MICC cable in kitchen area with damaged sheath</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-semibold text-yellow-400 text-sm mb-1">Polarity Verification</h6>
                        <ul className="text-xs space-y-1">
                          <li>• 8 socket outlets with reversed polarity</li>
                          <li>• Emergency lighting key switch incorrectly wired</li>
                          <li>• Immersion heater switch on neutral conductor</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-white mb-2">Live Testing Challenges</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Earth fault loop impedance:</strong> Several circuits exceeding maximum values</li>
                      <li>• <strong>RCD testing:</strong> Where present, 2 RCDs failed to operate within time limits</li>
                      <li>• <strong>Voltage drop:</strong> Excessive volt drop on extended circuits to basement</li>
                      <li>• <strong>Phase sequence:</strong> Three-phase supply to air conditioning incorrectly connected</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded border border-green-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Professional Resolution and Client Communication</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Comprehensive Remedial Plan</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Complete consumer unit replacement with RCD protection</li>
                      <li>• Remedial earthing work and main bonding conductor upgrade</li>
                      <li>• Replacement of damaged cables and non-compliant circuits</li>
                      <li>• Professional labelling and circuit identification</li>
                      <li>• Fire barrier reinstatement and containment improvements</li>
                      <li>• Emergency lighting system overhaul and testing</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Client Value and Impact</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Detailed written report with photographic evidence</li>
                      <li>• Clear prioritisation of safety-critical vs improvement works</li>
                      <li>• Cost-effective phased approach to spread expense</li>
                      <li>• Ongoing maintenance schedule established</li>
                      <li>• Insurance requirements satisfied with compliant installation</li>
                      <li>• Business premises safe for staff and customers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 p-4 rounded border border-blue-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Time and Cost Analysis</h4>
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Inspection Phase</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Initial survey: 4 hours</li>
                      <li>• Detailed inspection: 8 hours</li>
                      <li>• Testing procedures: 12 hours</li>
                      <li>• Documentation: 4 hours</li>
                      <li>• <strong>Total: 28 hours</strong></li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Remedial Work</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Materials cost: £3,200</li>
                      <li>• Labour (80 hours): £4,000</li>
                      <li>• Re-testing: £600</li>
                      <li>• Certification: £200</li>
                      <li>• <strong>Total: £8,000</strong></li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Value Delivered</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Prevented potential injury claims</li>
                      <li>• Avoided insurance issues</li>
                      <li>• Enhanced property value</li>
                      <li>• Reduced ongoing maintenance costs</li>
                      <li>• <strong>ROI: Immediate</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Check 3 */}
          <Card 
            className={`bg-blue-900/20 border-blue-600/30 cursor-pointer transition-all duration-200 hover:bg-blue-900/30`}
            onClick={() => setExpandedCheck(expandedCheck === 2 ? null : 2)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-yellow-400" />
                  Interactive Check: Professional Responsibility
                </div>
                {expandedCheck === 2 ? 
                  <ChevronDown className="h-4 w-4 text-yellow-400" /> : 
                  <ChevronRight className="h-4 w-4 text-yellow-400" />
                }
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-white mb-3">{inlineChecks[2].question}</p>
              {expandedCheck === 2 && (
                <div className="bg-card p-3 rounded border border-green-600/30 mt-3">
                  <p className="text-sm text-green-300 font-semibold mb-2">Answer:</p>
                  <p className="text-sm text-white">{inlineChecks[2].answer}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <ul className="space-y-2">
                <li>• Visual inspection is essential before testing to identify defects and confirm compliance</li>
                <li>• Key checks include selection of conductors, protection, containment, bonding, and labelling</li>
                <li>• Testing must follow BS 7671 procedures, and results compared with regulation values</li>
                <li>• Electricians are legally responsible for inspection, testing, and recorded results</li>
              </ul>
            </CardContent>
          </Card>

          {/* Knowledge Assessment */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Knowledge Assessment: Visual Inspection and Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BS7671Module6Section2Quiz />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-6-section-1">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-6-section-3">
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

export default BS7671Module6Section2;