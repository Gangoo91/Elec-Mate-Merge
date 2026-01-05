import { ArrowLeft, ArrowRight, Zap, CheckCircle, AlertCircle, FileText, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule8Section3 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the export threshold for G98 applications?",
      options: [
        "Less than 16A per phase (usually 3.68kW single phase)",
        "Less than 32A per phase (usually 7.36kW single phase)",
        "Less than 50kW total capacity",
        "Less than 100kW total capacity"
      ],
      correct: 0,
      explanation: "G98 applies to microgeneration installations with export capacity less than 16A per phase, which typically means up to 3.68kW on single-phase domestic installations."
    },
    {
      id: 2,
      question: "What happens if you skip DNO approval for grid-connected systems?",
      options: [
        "Nothing, it's only a recommendation",
        "Small fine but connection remains legal",
        "Formal warning, forced disconnection, and potential prosecution",
        "Reduced feed-in tariff payments only"
      ],
      correct: 2,
      explanation: "Connecting without proper DNO approval can result in formal warnings, forced system disconnection, potential prosecution, and invalidated insurance coverage."
    },
    {
      id: 3,
      question: "What's included in a commissioning declaration to the DNO?",
      options: [
        "Only the installation date and capacity",
        "Test results, certificates, and confirmation of compliance with standards",
        "Customer contact details and payment information",
        "Planning permission and warranty documents"
      ],
      correct: 1,
      explanation: "A commissioning declaration includes comprehensive test results, electrical certificates, confirmation of compliance with G98/G99 standards, and system technical specifications."
    },
    {
      id: 4,
      question: "Which form is used for installations less than 16A single-phase?",
      options: [
        "G99 Application Form",
        "G98 Notification Form",
        "DNO Connection Agreement",
        "ENA Application Form"
      ],
      correct: 1,
      explanation: "G98 Notification Form is used for smaller installations (less than 16A per phase), which is typically a simpler notification process rather than a full application."
    },
    {
      id: 5,
      question: "Who is the DNO (Distribution Network Operator)?",
      options: [
        "The company that generates electricity",
        "The government energy regulator",
        "The company that owns and operates the local electricity distribution network",
        "The renewable energy equipment manufacturer"
      ],
      correct: 2,
      explanation: "The DNO is the company that owns and operates the local electricity distribution network infrastructure, responsible for maintaining the grid and managing connections in their area."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-8">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 8
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Network className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  DNO Application Processes (G98, G99)
                </h1>
                <p className="text-xl text-gray-400">
                  Grid connection requirements and approval procedures
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 3
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Grid-tied systems must be registered with the local Distribution Network Operator (DNO) 
                under G98 or G99 procedures depending on capacity. Proper DNO approval ensures safe grid 
                integration and legal compliance for renewable energy installations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Know when to submit a G98 vs G99 application</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Understand pre-installation and post-installation requirements</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Learn what documents to submit to the DNO for approval</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">G98 vs G99: Understanding the Thresholds</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Key Distinction:</h4>
                <p className="text-sm">
                  The choice between G98 and G99 depends on the export capacity and connection type. 
                  Understanding these thresholds is crucial for compliance and avoiding delays.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">G98 - Microgeneration (Simplified Process):</h4>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Capacity Limits:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• <strong>Single-phase:</strong> Export ≤ 16A (typically 3.68kW)</li>
                        <li>• <strong>Three-phase:</strong> Export ≤ 16A per phase (typically 11.04kW)</li>
                        <li>• <strong>Power factor:</strong> Must operate between 0.95 lag and 0.95 lead</li>
                        <li>• <strong>Voltage limits:</strong> LV connections only (230V/400V)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Process Characteristics:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• <strong>Notification only:</strong> No formal application required</li>
                        <li>• <strong>Fast-track approval:</strong> Typically 15-20 working days</li>
                        <li>• <strong>Standard requirements:</strong> Must meet Type 1 specification</li>
                        <li>• <strong>No studies required:</strong> Basic network impact assessment</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-400 mb-3">G99 - Larger Scale (Formal Application):</h4>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Capacity Ranges:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• <strong>Type A:</strong> {">"} 16A per phase up to 1MW</li>
                        <li>• <strong>Type B:</strong> 1MW to 10MW</li>
                        <li>• <strong>Type C:</strong> 10MW to 100MW</li>
                        <li>• <strong>Type D:</strong> {">"} 100MW</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Process Requirements:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• <strong>Formal application:</strong> Detailed technical submission</li>
                        <li>• <strong>Extended timeline:</strong> 65-90 working days typical</li>
                        <li>• <strong>Network studies:</strong> Impact assessment required</li>
                        <li>• <strong>Connection agreement:</strong> Formal contractual terms</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t border-gray-600 pt-6">
                <h4 className="font-semibold text-purple-400 mb-4">Capacity Calculation Guidelines:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h5 className="text-white font-medium mb-2">Export Limiting:</h5>
                    <ul className="text-gray-300 space-y-1 ml-4">
                      <li>• Inverter export limitation to meet G98 threshold</li>
                      <li>• DNO meter reading for actual export measurement</li>
                      <li>• Consideration of battery storage discharge</li>
                      <li>• Multiple inverter installations cumulative capacity</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Common Scenarios:</h5>
                    <ul className="text-gray-300 space-y-1 ml-4">
                      <li>• 4kW array with 3.68kW export limit = G98</li>
                      <li>• 6kW three-phase system = G99 Type A</li>
                      <li>• Multiple arrays on same property = Cumulative assessment</li>
                      <li>• Storage systems with grid export = Include discharge capacity</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Application vs Notification Pathways</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Understanding the correct pathway ensures smooth approval and avoids unnecessary delays:</p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-4">G98 Notification Process:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-3">Pre-Installation Steps:</h5>
                      <ol className="text-gray-300 space-y-2 list-decimal list-inside">
                        <li>Identify correct DNO for the installation postcode</li>
                        <li>Complete G98 notification form with system details</li>
                        <li>Submit technical data sheets for all equipment</li>
                        <li>Await acknowledgment (typically 5-10 working days)</li>
                        <li>Proceed with installation once acknowledged</li>
                      </ol>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-3">Post-Installation Steps:</h5>
                      <ol className="text-gray-300 space-y-2 list-decimal list-inside">
                        <li>Complete commissioning tests and documentation</li>
                        <li>Submit commissioning declaration within 28 days</li>
                        <li>Provide electrical installation certificate</li>
                        <li>Include MCS certificate and compliance documentation</li>
                        <li>Await final registration confirmation</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-8">
                  <h4 className="font-semibold text-yellow-400 mb-4">G99 Application Process:</h4>
                  <div className="space-y-6 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-3">Stage 1 - Application Submission:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• Complete G99 application form with detailed technical specifications</li>
                        <li>• Provide single line diagrams and protection settings</li>
                        <li>• Submit equipment type test certificates</li>
                        <li>• Include proposed connection point and network studies</li>
                        <li>• Pay application fees (typically £500-£2000 depending on size)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-3">Stage 2 - DNO Assessment:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• Network impact studies and capacity assessment</li>
                        <li>• Protection coordination analysis</li>
                        <li>• Connection offer with terms and costs</li>
                        <li>• Connection agreement negotiation</li>
                        <li>• Witness testing requirements definition</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-3">Stage 3 - Connection and Commissioning:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• Installation to approved design and specifications</li>
                        <li>• DNO witness testing and inspection</li>
                        <li>• Commissioning certificate and test results submission</li>
                        <li>• Final connection approval and energisation</li>
                        <li>• Ongoing compliance monitoring arrangements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">DNO Approval Timelines and Documentation</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3">Standard Processing Timelines:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">G98 Notification Timeline:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Initial acknowledgment: 5-10 working days</li>
                        <li>• Installation can proceed after acknowledgment</li>
                        <li>• Commissioning declaration: Within 28 days of energisation</li>
                        <li>• Final registration: 10-15 working days after declaration</li>
                        <li>• <strong>Total process:</strong> 4-7 weeks from start to finish</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">G99 Application Timeline:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Application assessment: 65 working days</li>
                        <li>• Connection offer validity: 90 days</li>
                        <li>• Connection agreement: 2-4 weeks negotiation</li>
                        <li>• Installation and commissioning: Project dependent</li>
                        <li>• <strong>Total process:</strong> 4-6 months minimum</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-3">Essential Documentation Checklist:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Technical Documents:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Equipment data sheets and specifications</li>
                        <li>• Single line electrical diagrams</li>
                        <li>• Protection and control settings</li>
                        <li>• Type test certificates for all equipment</li>
                        <li>• Proposed connection point details</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Compliance Certificates:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• MCS installation certificate</li>
                        <li>• Electrical Installation Certificate (EIC)</li>
                        <li>• Commissioning test results</li>
                        <li>• Insurance and warranty documentation</li>
                        <li>• Competent person registration details</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                <h4 className="font-semibold text-orange-400 mb-3">DNO Contact and Regional Variations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Major DNOs:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• UK Power Networks (London, East, Southeast)</li>
                      <li>• Northern Powergrid (Northeast, Yorkshire)</li>
                      <li>• Electricity North West</li>
                      <li>• WPD (now National Grid) - Wales, Southwest, Midlands</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Scottish Networks:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Scottish Power Energy Networks</li>
                      <li>• SSE Networks (SSEN)</li>
                      <li>• Different application procedures</li>
                      <li>• Scottish specific requirements</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Regional Differences:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Application form variations</li>
                      <li>• Different processing timelines</li>
                      <li>• Local network constraints</li>
                      <li>• Specific technical requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Common Errors and Application Rejections</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                <h4 className="text-red-400 font-semibold mb-2">Prevention is Better Than Cure:</h4>
                <p className="text-sm">
                  Understanding common rejection reasons helps ensure first-time approval and 
                  avoids costly delays and resubmissions.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-3">Most Common Application Errors:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Technical Errors:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Incorrect capacity calculations (export vs generation)</li>
                        <li>• Missing or invalid equipment certificates</li>
                        <li>• Inadequate protection settings documentation</li>
                        <li>• Wrong voltage/frequency specifications</li>
                        <li>• Incomplete single line diagrams</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Administrative Errors:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Incorrect DNO area identification</li>
                        <li>• Missing signatures or incomplete forms</li>
                        <li>• Wrong application type (G98 vs G99)</li>
                        <li>• Insufficient contact information</li>
                        <li>• Late or missing commissioning declarations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Quality Assurance Checklist:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Pre-Submission Review:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Verify all form fields completed and accurate</li>
                        <li>• Cross-check capacity calculations and thresholds</li>
                        <li>• Ensure all supporting documents are attached</li>
                        <li>• Confirm contact details and site address accuracy</li>
                        <li>• Review technical specifications for consistency</li>
                        <li>• Validate equipment model numbers and certificates</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Post-Installation Quality Control:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Complete all commissioning tests before declaration</li>
                        <li>• Verify actual installation matches approved design</li>
                        <li>• Ensure all certificates are properly completed</li>
                        <li>• Submit within required timeframes</li>
                        <li>• Keep copies of all correspondence and approvals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced DNO Considerations</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Network Capacity and Constraints:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Understanding Network Limitations:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Transformer capacity:</strong> Local substation limitations</li>
                        <li>• <strong>Cable ratings:</strong> Distribution circuit thermal limits</li>
                        <li>• <strong>Voltage regulation:</strong> Import/export voltage changes</li>
                        <li>• <strong>Fault level contributions:</strong> Protection coordination</li>
                        <li>• <strong>Power quality:</strong> Harmonic distortion limits</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Mitigation Requirements:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Network reinforcement:</strong> Upgrade costs and timescales</li>
                        <li>• <strong>Export limitation:</strong> Power factor and curtailment</li>
                        <li>• <strong>Protection upgrades:</strong> Directional and sensitive settings</li>
                        <li>• <strong>Monitoring systems:</strong> Real-time network visibility</li>
                        <li>• <strong>Active network management:</strong> Smart grid integration</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-3">Commercial and Export Considerations:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Export Revenue Streams:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Smart Export Guarantee (SEG) eligibility requires DNO approval</li>
                        <li>• Export meter requirements and bidirectional capabilities</li>
                        <li>• Power purchase agreements and commercial export contracts</li>
                        <li>• Renewable Energy Guarantee of Origin (REGO) certificates</li>
                        <li>• Business energy trading and balancing requirements</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Future System Modifications:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Capacity increases require new applications</li>
                        <li>• Battery storage additions may need separate approvals</li>
                        <li>• EV charger integration with generation systems</li>
                        <li>• Heat pump coordination and demand management</li>
                        <li>• Building additional arrays or inverter replacements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Real World Scenario</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                <p className="text-sm">
                  <strong>Case Study:</strong> Installer connected a 6kW inverter without G99 approval—client 
                  received a formal warning from the DNO, faced forced disconnection, and the installer 
                  was liable for £8,000 in reconnection fees and network reinforcement costs.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                No grid-connected installation is complete without proper DNO sign-off. Plan ahead to 
                avoid delays, understand the correct application pathway, and ensure all documentation 
                is complete and accurate before submission.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz questions={quizQuestions} title="DNO Applications Quiz" />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../renewable-energy-module-8-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-8-section-4">
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

export default RenewableEnergyModule8Section3;