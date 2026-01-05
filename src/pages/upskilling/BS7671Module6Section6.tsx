import { ArrowLeft, ArrowRight, Eye, Book, AlertTriangle, Target, Search, HelpCircle, ChevronDown, ChevronRight, CheckCircle, Shield, Info, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BS7671Module6Section6Quiz from '@/components/upskilling/quiz/BS7671Module6Section6Quiz';

const BS7671Module6Section6 = () => {
  const [expandedCheck, setExpandedCheck] = useState<number | null>(null);

  const inlineChecks = [
    {
      question: "What types of limitations should be recorded on electrical certificates?",
      answer: "Limitations include access restrictions (locked rooms, sealed units), operational constraints (live systems, occupied premises), time constraints, environmental conditions, safety restrictions, and any areas not inspected due to practical constraints. All limitations must be clearly documented."
    },
    {
      question: "How do observations differ from limitations on certificates?",
      answer: "Observations record actual defects, non-compliance issues, or areas requiring attention found during inspection. Limitations record areas that could not be inspected or tested. Observations require action, while limitations explain scope restrictions."
    },
    {
      question: "What are the safety observation codes C1, C2, C3, and FI?",
      answer: "C1 = Danger present (immediate action required), C2 = Potentially dangerous (urgent remedial action required), C3 = Improvement recommended (non-urgent), FI = Further investigation needed. These codes classify the severity and urgency of safety issues found."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Eye className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Limitations and Observations in Certificates
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Module 6, Section 6
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 6.6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                35 minutes
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
                Proper recording of limitations and observations is crucial for certificate validity and legal 
                protection. Limitations explain what could not be inspected or tested, while observations document 
                defects and non-compliance issues found. Understanding when and how to record these elements 
                protects both electricians and clients, ensuring certificates accurately reflect inspection scope 
                and findings while maintaining professional standards.
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
                  <span>Identify and record appropriate limitations on certificates</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Document observations using correct safety codes and descriptions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand legal implications of limitations and observations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Apply professional judgment for certificate validity decisions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Content Section 1 - Understanding Limitations */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">1. Understanding Limitations in Electrical Certificates</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Definition, Types, and Proper Documentation
              </p>
              
              <div className="bg-blue-900/20 p-4 rounded-md border border-blue-600/30 mb-6">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Purpose of Limitations
                </h4>
                <p className="text-sm mb-3">
                  Limitations record aspects of the installation that could not be inspected or tested due to 
                  practical constraints. They protect electricians from liability for undiscovered defects in 
                  areas that were inaccessible, whilst informing clients of inspection scope restrictions.
                </p>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-sm font-semibold text-white">
                    "Limitations explain what was NOT inspected - they protect both electrician and client"
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Types of Limitations
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-3">Access Limitations</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Physical barriers:</strong> Locked rooms, sealed ceiling voids</li>
                        <li>• <strong>Height restrictions:</strong> Areas requiring specialist access equipment</li>
                        <li>• <strong>Structural constraints:</strong> Built-in equipment, fixed installations</li>
                        <li>• <strong>Safety restrictions:</strong> Hazardous environments, asbestos areas</li>
                        <li>• <strong>Occupied premises:</strong> Areas in continuous use during inspection</li>
                        <li>• <strong>Third-party restrictions:</strong> Tenant areas, separate ownerships</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-3">Operational Limitations</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Live systems:</strong> Circuits that cannot be isolated safely</li>
                        <li>• <strong>Critical processes:</strong> IT systems, medical equipment</li>
                        <li>• <strong>Time constraints:</strong> Limited inspection windows</li>
                        <li>• <strong>Environmental factors:</strong> Weather, seasonal access issues</li>
                        <li>• <strong>Equipment limitations:</strong> Specialist test equipment unavailable</li>
                        <li>• <strong>Regulatory restrictions:</strong> Planning, heritage constraints</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">Proper Limitation Documentation Techniques</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Specific Descriptions</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Precise location identification</li>
                        <li>• Clear reason for limitation</li>
                        <li>• Affected circuit/area details</li>
                        <li>• Alternative actions suggested</li>
                        <li>• Future access recommendations</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Professional Language</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Factual, objective statements</li>
                        <li>• Technical accuracy maintained</li>
                        <li>• Client-appropriate terminology</li>
                        <li>• Liability implications considered</li>
                        <li>• Regulatory compliance referenced</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Supporting Evidence</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Photographic documentation</li>
                        <li>• Sketch diagrams where helpful</li>
                        <li>• Client acknowledgment recorded</li>
                        <li>• Third-party confirmations</li>
                        <li>• Follow-up recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-md border border-yellow-600/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Impact on Certificate Validity</h4>
                  <div className="space-y-3">
                    <p className="text-sm text-white">
                      Extensive limitations may affect certificate validity and usefulness. Professional judgment 
                      is required to determine whether sufficient inspection has been completed to provide meaningful 
                      certification of installation safety and compliance.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-white mb-2">Acceptable Limitations</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Minor access restrictions (&lt;10% of installation)</li>
                          <li>• Specific areas with valid constraints</li>
                          <li>• Non-critical circuit elements</li>
                          <li>• Temporary operational requirements</li>
                          <li>• Specialist equipment areas</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2">Problematic Limitations</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Major portions of installation (&gt;25%)</li>
                          <li>• Critical safety systems inaccessible</li>
                          <li>• Main distribution equipment restricted</li>
                          <li>• Widespread access problems</li>
                          <li>• Fundamental systems unavailable</li>
                        </ul>
                      </div>
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
                      Interactive Check: Limitation Types
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

          {/* Content Section 2 - Observations and Safety Codes */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">2. Observations and Safety Classification Codes</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Systematic Defect Recording and Risk Assessment
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Safety Observation Codes Classification System
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-red-900/20 p-3 rounded border border-red-600/30">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-red-600 text-white px-2 py-1 rounded font-bold text-sm">C1</span>
                        <h5 className="font-semibold text-red-200">Danger Present - Immediate Action Required</h5>
                      </div>
                      <p className="text-sm text-white mb-2">
                        Immediate danger exists that could cause injury or fire. Installation or affected 
                        circuits should be isolated immediately until remedial action is completed.
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Live parts accessible to normal contact</li>
                        <li>• Missing or inadequate earthing creating shock risk</li>
                        <li>• Dangerous installations in bathrooms/wet areas</li>
                        <li>• Fire hazards from overheating or damage</li>
                        <li>• RCD protection absent where required for safety</li>
                      </ul>
                    </div>

                    <div className="bg-orange-900/20 p-3 rounded border border-orange-600/30">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-orange-600 text-white px-2 py-1 rounded font-bold text-sm">C2</span>
                        <h5 className="font-semibold text-orange-200">Potentially Dangerous - Urgent Remedial Action</h5>
                      </div>
                      <p className="text-sm text-white mb-2">
                        Defects that do not pose immediate danger but could become dangerous under fault 
                        conditions or with deterioration. Should be rectified urgently.
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Inadequate earthing arrangements</li>
                        <li>• Missing RCD protection for specific applications</li>
                        <li>• Overloaded circuits approaching design limits</li>
                        <li>• Deteriorating insulation above minimum values</li>
                        <li>• Non-compliant special location installations</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600/30">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-yellow-600 text-black px-2 py-1 rounded font-bold text-sm">C3</span>
                        <h5 className="font-semibold text-yellow-200">Improvement Recommended - Non-Urgent</h5>
                      </div>
                      <p className="text-sm text-white mb-2">
                        Installations that do not comply with current standards but are not dangerous. 
                        Improvement would enhance safety but is not urgent.
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Absence of RCD protection (not required when installed)</li>
                        <li>• Single-insulated cables in accessible positions</li>
                        <li>• Missing supplementary bonding in older installations</li>
                        <li>• Non-current wiring colours (pre-2004)</li>
                        <li>• Outdated protective devices still functioning</li>
                      </ul>
                    </div>

                    <div className="bg-blue-900/20 p-3 rounded border border-blue-600/30">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-yellow-400 text-white px-2 py-1 rounded font-bold text-sm">FI</span>
                        <h5 className="font-semibold text-blue-200">Further Investigation Required</h5>
                      </div>
                      <p className="text-sm text-white mb-2">
                        Items requiring further investigation to determine if they constitute a defect. 
                        May require specialist knowledge or additional testing.
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Unusual test results requiring analysis</li>
                        <li>• Suspect but unconfirmed defects</li>
                        <li>• Areas requiring specialist access or equipment</li>
                        <li>• Complex installations needing expert assessment</li>
                        <li>• Environmental factors affecting safety</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Professional Observation Documentation</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Essential Information</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Precise location and circuit identification</li>
                        <li>• Clear description of defect or non-compliance</li>
                        <li>• Relevant regulation or standard reference</li>
                        <li>• Risk assessment and safety implications</li>
                        <li>• Recommended remedial action and timeframe</li>
                        <li>• Photographic evidence where helpful</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Professional Language Guidelines</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Factual, objective descriptions</li>
                        <li>• Technical accuracy without over-complication</li>
                        <li>• Client-appropriate terminology</li>
                        <li>• Constructive rather than critical tone</li>
                        <li>• Solution-focused recommendations</li>
                        <li>• Legal and regulatory compliance awareness</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Card 
                className={`bg-blue-900/20 border-blue-600/30 cursor-pointer transition-all duration-200 hover:bg-blue-900/30`}
                onClick={() => setExpandedCheck(expandedCheck === 1 ? null : 1)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-yellow-400" />
                      Interactive Check: Observations vs Limitations
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
            </CardContent>
          </Card>

          {/* Content Section 3 - Client Communication and Follow-up Procedures */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">3. Client Communication and Follow-up Procedures</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Professional Client Relations and Observation Management
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Effective Client Communication Strategies
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-3">Pre-Inspection Briefing</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Scope explanation:</strong> Clearly define what will and won't be inspected</li>
                        <li>• <strong>Access requirements:</strong> Discuss necessary access arrangements</li>
                        <li>• <strong>Time expectations:</strong> Provide realistic timeframes for completion</li>
                        <li>• <strong>Limitation impacts:</strong> Explain how limitations affect certificate validity</li>
                        <li>• <strong>Cost implications:</strong> Discuss additional costs for extended access</li>
                        <li>• <strong>Safety priorities:</strong> Emphasise safety over convenience</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-3">Post-Inspection Explanation</h5>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Finding summary:</strong> Provide clear overview of all observations</li>
                        <li>• <strong>Priority explanation:</strong> Explain C1, C2, C3, FI significance</li>
                        <li>• <strong>Risk assessment:</strong> Help clients understand safety implications</li>
                        <li>• <strong>Remedial guidance:</strong> Provide practical next steps</li>
                        <li>• <strong>Timeframe advice:</strong> Suggest appropriate response timescales</li>
                        <li>• <strong>Professional support:</strong> Offer ongoing technical assistance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">Follow-up and Remedial Action Coordination</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Immediate Actions (C1)</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Immediate client notification</li>
                        <li>• Safety isolation recommendations</li>
                        <li>• Emergency contractor referrals</li>
                        <li>• Risk mitigation advice</li>
                        <li>• Progress monitoring</li>
                        <li>• Re-inspection scheduling</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Urgent Actions (C2)</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Priority scheduling assistance</li>
                        <li>• Qualified contractor recommendations</li>
                        <li>• Specification preparation support</li>
                        <li>• Progress review meetings</li>
                        <li>• Compliance verification</li>
                        <li>• Updated certification</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Planned Actions (C3)</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Improvement planning assistance</li>
                        <li>• Cost-benefit analysis</li>
                        <li>• Phased upgrade strategies</li>
                        <li>• Regular monitoring schedules</li>
                        <li>• Compliance tracking</li>
                        <li>• Future inspection planning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Section 4 - Legal and Insurance Implications */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">4. Legal and Insurance Implications</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg font-semibold text-yellow-400 mb-4">
                Understanding Professional Liability and Risk Management
              </p>

              <div className="space-y-6">
                <div className="bg-red-900/20 p-4 rounded-md border border-red-600/30">
                  <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Professional Liability Considerations
                  </h4>
                  <div className="space-y-4">
                    <p className="text-sm text-white">
                      Proper limitation and observation recording is essential for professional protection. 
                      Inadequate documentation can create liability exposure and compromise insurance coverage.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-white mb-2">Limitation Documentation Risks</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Incomplete limitation recording</li>
                          <li>• Vague or ambiguous descriptions</li>
                          <li>• Failure to obtain client acknowledgment</li>
                          <li>• Inadequate photographic evidence</li>
                          <li>• Missing follow-up recommendations</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2">Observation Recording Risks</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Incorrect safety code assignment</li>
                          <li>• Inadequate defect descriptions</li>
                          <li>• Missing regulatory references</li>
                          <li>• Insufficient client communication</li>
                          <li>• Delayed remedial action advice</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-4">Insurance and Risk Management</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Professional Indemnity Requirements</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Minimum coverage levels for electrical work</li>
                        <li>• Policy terms and exclusions understanding</li>
                        <li>• Claims notification procedures</li>
                        <li>• Documentation retention requirements</li>
                        <li>• Risk assessment protocols</li>
                        <li>• Continuous coverage maintenance</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Best Practice Risk Mitigation</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Comprehensive limitation recording</li>
                        <li>• Clear client communication protocols</li>
                        <li>• Regular competency updates</li>
                        <li>• Industry standard compliance</li>
                        <li>• Peer review procedures</li>
                        <li>• Professional development maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-md border border-blue-600/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Legal Precedents and Case Studies</h4>
                  <div className="space-y-3">
                    <p className="text-sm text-white">
                      Legal cases have established important precedents regarding electrician liability for 
                      limitation and observation documentation. Understanding these precedents helps inform 
                      professional practice and risk management strategies.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-white mb-2">Key Legal Principles</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Duty of care in professional services</li>
                          <li>• Standard of reasonable competence</li>
                          <li>• Limitation of liability through proper documentation</li>
                          <li>• Client informed consent requirements</li>
                          <li>• Professional indemnity policy coverage</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2">Documentation Requirements</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Clear, unambiguous language</li>
                          <li>• Comprehensive scope definition</li>
                          <li>• Client acknowledgment records</li>
                          <li>• Photographic evidence retention</li>
                          <li>• Follow-up communication trails</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Case Study */}
          <Card className="bg-gradient-to-r from-elec-gray to-elec-dark border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Real World Case Study: EICR with Complex Limitations and Observations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-card p-4 rounded border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Project Details</h4>
                <p className="text-sm mb-2">
                  <strong>Location:</strong> Victorian school building, Liverpool - now converted to apartments
                </p>
                <p className="text-sm mb-2">
                  <strong>Challenge:</strong> Multiple ownerships, occupied premises, heritage constraints
                </p>
                <p className="text-sm mb-2">
                  <strong>Inspection scope:</strong> Landlord EICR for common areas and service installations
                </p>
                <p className="text-sm">
                  <strong>Complexity:</strong> Mixed-age installations from 1960s to 2020s upgrades
                </p>
              </div>

              <div className="bg-yellow-900/20 p-4 rounded border border-yellow-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Limitations Encountered and Documentation</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Access Limitations</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Individual flats:</strong> "Unable to inspect 40% of final circuits serving private accommodation due to tenant occupancy and access restrictions"</li>
                      <li>• <strong>Roof spaces:</strong> "Roof void above apartments 4-6 inaccessible due to asbestos survey recommendations"</li>
                      <li>• <strong>Basement areas:</strong> "Eastern basement section flooded - inspection postponed pending drainage works"</li>
                      <li>• <strong>Plant rooms:</strong> "Boiler room inspection limited due to ongoing maintenance by specialist contractor"</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Operational Limitations</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Critical systems:</strong> "Fire alarm panel testing deferred to avoid false evacuation during school hours"</li>
                      <li>• <strong>Heritage restrictions:</strong> "Victorian switchgear inspection limited by Listed Building constraints"</li>
                      <li>• <strong>Live systems:</strong> "Main 400A incomer could not be isolated due to essential services requirement"</li>
                      <li>• <strong>Time constraints:</strong> "Emergency lighting testing limited to 50% of circuits due to evening access only"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Check 2 */}
          <Card 
            className={`bg-blue-900/20 border-blue-600/30 cursor-pointer transition-all duration-200 hover:bg-blue-900/30`}
            onClick={() => setExpandedCheck(expandedCheck === 2 ? null : 2)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-yellow-400" />
                  Interactive Check: Safety Codes
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

          {/* Quiz Component */}
          <BS7671Module6Section6Quiz />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-6-section-5">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-7">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module6Section6;