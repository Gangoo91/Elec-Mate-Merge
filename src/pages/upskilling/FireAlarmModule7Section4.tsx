import { ArrowLeft, GraduationCap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { useMemo } from 'react';

const FireAlarmModule7Section4 = () => {
  // Quiz Data
  const questions = useMemo(() => [
    {
      id: 1,
      question: "What is the minimum annual CPD requirement for BAFE SP203-1 certified professionals?",
      options: [
        "20 hours",
        "25 hours", 
        "35 hours structured CPD",
        "40 hours"
      ],
      correct: 2,
      explanation: "BAFE SP203-1 requires 35 hours of structured CPD annually to maintain certification and demonstrate ongoing competence in fire detection and alarm systems."
    },
    {
      id: 2,
      question: "Who must conduct a fire risk assessment under the Regulatory Reform (Fire Safety) Order 2005?",
      options: [
        "Fire and rescue service only",
        "The responsible person",
        "Building control officer",
        "Insurance company assessor"
      ],
      correct: 1,
      explanation: "The responsible person (typically the employer or person in control of premises) has the legal duty to conduct fire risk assessments under the RRO."
    },
    {
      id: 3,
      question: "What are the five steps of a comprehensive fire risk assessment?",
      options: [
        "Identify hazards, people at risk, evaluate measures, record findings, review regularly",
        "Design, install, test, maintain, certify", 
        "Plan, implement, check, act, improve",
        "Assess, control, monitor, review, update"
      ],
      correct: 0,
      explanation: "The five steps are: 1) Identify fire hazards, 2) Identify people at risk, 3) Evaluate existing measures, 4) Record findings and action plan, 5) Review regularly."
    },
    {
      id: 4,
      question: "What is the primary benefit of ISO 9001 certification for fire safety contractors?",
      options: [
        "Reduced insurance premiums only",
        "Marketing advantage only",
        "Systematic quality management approach",
        "Legal compliance guarantee"
      ],
      correct: 2,
      explanation: "ISO 9001 provides a systematic quality management approach that improves processes, customer satisfaction, and business performance through structured methodology."
    },
    {
      id: 5,
      question: "Which professional development activity provides the most structured learning for fire safety professionals?",
      options: [
        "Reading technical magazines",
        "Networking events",
        "Accredited training courses with assessment",
        "Site visits and observations"
      ],
      correct: 2,
      explanation: "Accredited training courses with assessment provide structured learning with verified outcomes, formal recognition, and quality-assured content delivery."
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
              <GraduationCap className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Competence, Risk Assessments, and CPD Requirements
                </h1>
                <p className="text-xl text-gray-400">
                  Professional competence and development requirements
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
                  <span className="text-sm">Understand professional competence requirements</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Learn fire risk assessment principles</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Identify CPD obligations and opportunities</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Understand industry standards and best practices</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Learn about certification and accreditation schemes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Competence Framework */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Professional Competence Framework and Standards</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Professional competence in fire safety requires a structured approach to knowledge, skills, 
                experience, and ongoing development to ensure safe and compliant installations throughout careers.
              </p>
              <div className="space-y-4">
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Core Competence Framework Areas:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Legal Knowledge:</strong> Fire safety legislation, regulations, and duties</li>
                      <li><strong>Technical Standards:</strong> BS 5839 series, EN standards, and codes</li>
                      <li><strong>System Design:</strong> Risk assessment, specification, and planning</li>
                      <li><strong>Installation Practice:</strong> Safe working, cable installation, commissioning</li>
                      <li><strong>Testing Procedures:</strong> Functional testing, certification, documentation</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Maintenance Systems:</strong> Preventive and corrective maintenance regimes</li>
                      <li><strong>Fault Diagnosis:</strong> Systematic troubleshooting and repair techniques</li>
                      <li><strong>Health and Safety:</strong> Risk assessment, safe working practices</li>
                      <li><strong>Customer Relations:</strong> Communication, education, and service delivery</li>
                      <li><strong>Business Management:</strong> Quality systems, project management, compliance</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Competence Development Levels:</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-white font-medium mb-2">1. Awareness Level:</h5>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Basic understanding of fire safety principles</li>
                          <li>Recognition of key legislation and standards</li>
                          <li>Awareness of system types and applications</li>
                          <li>Understanding of health and safety requirements</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-2">2. Supervised Practice:</h5>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Practical work under experienced guidance</li>
                          <li>Participation in installation and testing</li>
                          <li>Development of practical skills and knowledge</li>
                          <li>Gradual increase in responsibility and scope</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-2">3. Independent Competence:</h5>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Independent work within defined scope</li>
                          <li>Responsibility for own work quality and safety</li>
                          <li>Ability to train and supervise others</li>
                          <li>Recognition of limits of competence</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-2">4. Expert Level:</h5>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Advanced technical knowledge and skills</li>
                          <li>Ability to design complex systems</li>
                          <li>Training and mentoring capability</li>
                          <li>Industry leadership and development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fire Risk Assessment Comprehensive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Fire Risk Assessment - Comprehensive Methodology</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Fire risk assessments form the foundation of fire safety management, requiring systematic 
                evaluation of hazards, people at risk, and effectiveness of existing measures.
              </p>
              <div className="space-y-4">
                <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                  <h4 className="text-red-400 font-semibold mb-2">Comprehensive Five-Step Process:</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">Step 1: Identify Fire Hazards</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Ignition sources: electrical equipment, heating, hot work</li>
                          <li>Fuel sources: flammable materials, furnishings, storage</li>
                          <li>Oxygen sources: ventilation systems, compressed gases</li>
                          <li>Heat sources: industrial processes, cooking equipment</li>
                        </ul>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Arson potential: security measures, access control</li>
                          <li>Lightning protection: building height, location exposure</li>
                          <li>Adjacent risks: neighbouring buildings, external threats</li>
                          <li>Process hazards: chemical reactions, dust explosions</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Step 2: People at Risk Assessment</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Employees: permanent, temporary, visiting workers</li>
                          <li>Public: customers, patients, students, residents</li>
                          <li>Vulnerable persons: disabled, elderly, children</li>
                          <li>Sleeping occupants: hospitals, hotels, care homes</li>
                        </ul>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Lone workers: security guards, cleaners, maintenance</li>
                          <li>Remote locations: basement areas, plant rooms</li>
                          <li>High-risk activities: construction, hot work permits</li>
                          <li>Emergency responders: fire service, first aiders</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-md p-4">
                  <h4 className="text-orange-400 font-semibold mb-2">Risk Evaluation Matrix:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-orange-500/20">
                          <th className="text-left p-2">Likelihood</th>
                          <th className="text-left p-2">Low Consequence</th>
                          <th className="text-left p-2">Medium Consequence</th>
                          <th className="text-left p-2">High Consequence</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-orange-500/10">
                          <td className="p-2 font-medium">High</td>
                          <td className="p-2 bg-yellow-600/20">Medium Risk</td>
                          <td className="p-2 bg-red-600/20">High Risk</td>
                          <td className="p-2 bg-red-600/30">Very High Risk</td>
                        </tr>
                        <tr className="border-b border-orange-500/10">
                          <td className="p-2 font-medium">Medium</td>
                          <td className="p-2 bg-green-600/20">Low Risk</td>
                          <td className="p-2 bg-yellow-600/20">Medium Risk</td>
                          <td className="p-2 bg-red-600/20">High Risk</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Low</td>
                          <td className="p-2 bg-green-600/20">Very Low Risk</td>
                          <td className="p-2 bg-green-600/20">Low Risk</td>
                          <td className="p-2 bg-yellow-600/20">Medium Risk</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-4">
                  <h4 className="text-purple-400 font-semibold mb-2">Assessment Documentation Requirements:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Building plans and occupancy details</li>
                      <li>Hazard identification and risk ratings</li>
                      <li>Existing fire precautions assessment</li>
                      <li>Action plan with priorities and timescales</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Emergency procedures and training records</li>
                      <li>Review schedule and trigger points</li>
                      <li>Competent person details and qualifications</li>
                      <li>Consultation records with employees/residents</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CPD Requirements Expanded */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Continuing Professional Development - Strategic Approach</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-amber-600/10 border border-amber-600/20 rounded-md p-4">
                  <h4 className="text-amber-400 font-semibold mb-2">Strategic Importance of CPD:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Regulatory Evolution:</strong> Standards and regulations continuously develop</li>
                      <li><strong>Technology Advancement:</strong> New products and systems emerge regularly</li>
                      <li><strong>Legal Compliance:</strong> Professional competence requirements increase</li>
                      <li><strong>Insurance Requirements:</strong> Insurers demand demonstrated competence</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Career Development:</strong> Advancement requires current knowledge</li>
                      <li><strong>Risk Management:</strong> Competence reduces liability exposure</li>
                      <li><strong>Quality Assurance:</strong> Better outcomes from informed practice</li>
                      <li><strong>Professional Recognition:</strong> Industry standing and credibility</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Comprehensive CPD Activity Types:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Formal Learning:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Accredited training courses and qualifications</li>
                        <li>Professional conferences and seminars</li>
                        <li>Manufacturer technical training programmes</li>
                        <li>University and college course modules</li>
                        <li>Online learning platforms and webinars</li>
                        <li>Professional body events and presentations</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Informal Learning:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Technical reading and research activities</li>
                        <li>Peer learning and discussion groups</li>
                        <li>Mentoring others and being mentored</li>
                        <li>Site visits and installation observations</li>
                        <li>Industry networking and knowledge sharing</li>
                        <li>Reflective practice and case study analysis</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Effective CPD Recording and Management:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Learning Objectives:</strong> Clear goals for each activity</li>
                      <li><strong>Activity Details:</strong> Date, duration, provider, content</li>
                      <li><strong>Outcomes Achieved:</strong> Knowledge and skills gained</li>
                      <li><strong>Application Evidence:</strong> How learning was applied</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Supporting Evidence:</strong> Certificates, photos, notes</li>
                      <li><strong>Reflection Notes:</strong> Personal insights and development</li>
                      <li><strong>Annual Planning:</strong> Strategic CPD planning process</li>
                      <li><strong>Portfolio Management:</strong> Organised evidence collection</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-4">
                  <h4 className="text-purple-400 font-semibold mb-2">Annual CPD Requirements by Organisation:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-purple-500/20">
                          <th className="text-left p-2">Organisation</th>
                          <th className="text-left p-2">Annual Requirement</th>
                          <th className="text-left p-2">Evidence Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-purple-500/10">
                          <td className="p-2">Engineering Council</td>
                          <td className="p-2">30 hours minimum</td>
                          <td className="p-2">Annual CPD report</td>
                        </tr>
                        <tr className="border-b border-purple-500/10">
                          <td className="p-2">BAFE SP203-1</td>
                          <td className="p-2">35 hours structured</td>
                          <td className="p-2">Detailed activity log</td>
                        </tr>
                        <tr className="border-b border-purple-500/10">
                          <td className="p-2">FIA Membership</td>
                          <td className="p-2">20 hours technical</td>
                          <td className="p-2">CPD certificate submission</td>
                        </tr>
                        <tr>
                          <td className="p-2">NICEIC Approved</td>
                          <td className="p-2">Industry updates</td>
                          <td className="p-2">Annual assessment review</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industry Standards and Certification Expanded */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Industry Standards and Certification Schemes - Complete Guide</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Major Third-Party Certification Schemes:</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">BAFE (British Approval for Fire Equipment):</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li><strong>SP203-1:</strong> Fire detection and alarm systems</li>
                          <li><strong>SP101:</strong> Portable fire extinguishers</li>
                          <li><strong>SP104:</strong> Fixed fire suppression systems</li>
                          <li><strong>SP203-3:</strong> Emergency lighting systems</li>
                        </ul>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Annual assessment and surveillance</li>
                          <li>Competent persons register</li>
                          <li>Quality management system requirements</li>
                          <li>Insurance recognition and benefits</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">FIA (Fire Industry Association):</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Technical guidance and standards development</li>
                        <li>Professional development and training</li>
                        <li>Industry advocacy and representation</li>
                        <li>Quality contractor recognition schemes</li>
                        <li>Technical helpline and support services</li>
                        <li>Regular technical bulletins and updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Electrical Industry Certification:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">NICEIC (National Inspection Council):</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Electrical installation certification</li>
                        <li>Fire alarm specialist registration</li>
                        <li>Annual assessment and inspection</li>
                        <li>Technical support and guidance</li>
                        <li>Insurance-backed warranties</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">ECA (Electrical Contractors Association):</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Trade association membership benefits</li>
                        <li>Technical training and development</li>
                        <li>Industry standards and best practice</li>
                        <li>Advocacy and representation</li>
                        <li>Networking and business development</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-4">
                  <h4 className="text-purple-400 font-semibold mb-2">Certification Benefits and Value:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Market Credibility:</strong> Independent verification of competence</li>
                      <li><strong>Insurance Benefits:</strong> Reduced premiums and enhanced cover</li>
                      <li><strong>Warranty Protection:</strong> Insurance-backed guarantees available</li>
                      <li><strong>Technical Support:</strong> Access to expert guidance and helplines</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Training Access:</strong> Subsidised or exclusive training opportunities</li>
                      <li><strong>Regulatory Compliance:</strong> Assurance of meeting standards</li>
                      <li><strong>Business Development:</strong> Networking and referral opportunities</li>
                      <li><strong>Quality Assurance:</strong> Systematic approach to excellence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Management Comprehensive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Quality Management Systems and Professional Excellence</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-4">
                  <h4 className="text-purple-400 font-semibold mb-2">ISO 9001 Quality Management System:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Process Approach:</strong> Systematic workflow documentation</li>
                      <li><strong>Customer Focus:</strong> Understanding and meeting requirements</li>
                      <li><strong>Leadership:</strong> Management commitment and direction</li>
                      <li><strong>Employee Engagement:</strong> Competence and empowerment</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Continuous Improvement:</strong> Regular review and enhancement</li>
                      <li><strong>Evidence-based Decisions:</strong> Data analysis and monitoring</li>
                      <li><strong>Relationship Management:</strong> Supplier and partner coordination</li>
                      <li><strong>Risk-based Thinking:</strong> Preventive action and planning</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                  <h4 className="text-red-400 font-semibold mb-2">Health and Safety Management (ISO 45001):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Hazard Identification:</strong> Systematic risk assessment processes</li>
                      <li><strong>Legal Compliance:</strong> Monitoring regulatory requirements</li>
                      <li><strong>Safe Work Procedures:</strong> Method statements and controls</li>
                      <li><strong>Emergency Preparedness:</strong> Response procedures and training</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Incident Investigation:</strong> Root cause analysis and prevention</li>
                      <li><strong>Performance Monitoring:</strong> KPIs and improvement targets</li>
                      <li><strong>Competence Management:</strong> Training and development systems</li>
                      <li><strong>Consultation:</strong> Worker participation and communication</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-amber-600/10 border border-amber-600/20 rounded-md p-4">
                  <h4 className="text-amber-400 font-semibold mb-2">Professional Responsibility and Ethics:</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      Fire safety professionals carry significant responsibility for public safety and must 
                      maintain the highest standards of professional conduct and technical competence.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Duty of care to public safety and welfare</li>
                        <li>Professional integrity and honest dealing</li>
                        <li>Competent practice within scope of knowledge</li>
                        <li>Continuing professional development obligation</li>
                      </ul>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Environmental responsibility and sustainability</li>
                        <li>Confidentiality and data protection compliance</li>
                        <li>Fair dealing with clients, suppliers, and competitors</li>
                        <li>Professional development of others in industry</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <SingleQuestionQuiz 
            questions={questions} 
            title="Test Your Knowledge: Professional Competence & CPD" 
          />

          <div className="flex justify-between">
            <Link to="../fire-alarm-module-7-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-course">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Course Complete
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmModule7Section4;