import { ArrowLeft, ArrowRight, FileCheck, AlertCircle, Users, Calendar, Scale, Lightbulb, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule5Section5 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What's the capacity threshold that separates G98 and G99 applications?",
      options: [
        "11kW (16A per phase at 230V)",
        "4kW single phase maximum", 
        "50kW for all installations",
        "100kW for commercial systems"
      ],
      correct: 0,
      explanation: "The threshold is 16A per phase, which equates to approximately 11kW for three-phase systems (16A × 230V × 3 phases × √3). Below this threshold uses G98, above uses G99."
    },
    {
      id: 2,
      question: "When do you need pre-approval from the DNO?",
      options: [
        "For all solar installations",
        "Only for G99 applications (>16A per phase)",
        "Only for commercial installations",
        "Never, notification is always sufficient"
      ],
      correct: 1,
      explanation: "G99 applications require formal pre-approval before installation. G98 applications only require post-installation notification within 28 days."
    },
    {
      id: 3,
      question: "Who do you notify for grid connection applications?",
      options: [
        "National Grid ESO directly",
        "Local council planning department",
        "The local Distribution Network Operator (DNO)",
        "Ofgem energy regulator"
      ],
      correct: 2,
      explanation: "The local Distribution Network Operator (DNO) handles grid connection applications. Each region has a different DNO (e.g., UK Power Networks, SSE, Northern Powergrid)."
    },
    {
      id: 4,
      question: "What happens if you skip proper DNO approval?",
      options: [
        "Small fine but system can operate",
        "Grid connection may be refused and system must be disconnected",
        "Only affects warranty coverage",
        "No consequences if system works properly"
      ],
      correct: 1,
      explanation: "Operating without proper DNO approval can result in forced disconnection from the grid, legal action, and potential safety risks. Compliance is mandatory."
    },
    {
      id: 5,
      question: "Can G99 applications apply to domestic installations?",
      options: [
        "No, G99 is only for commercial systems",
        "Yes, if the system capacity exceeds 16A per phase",
        "Only for systems above 50kW",
        "Only in specific postcode areas"
      ],
      correct: 1,
      explanation: "G99 can apply to domestic installations if they exceed 16A per phase (approximately 11kW), regardless of whether it's residential or commercial use."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-5">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              G98/G99 Compliance and DNO Notifications
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding UK grid connection standards and Distribution Network Operator requirements
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                UK Compliance
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand G98 and G99 regulations and their application thresholds
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Learn when and how to submit DNO applications and notifications
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Avoid common compliance errors that can delay or prevent grid connection
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                UK grid connections for renewable energy systems are governed by Engineering Recommendations G98 and G99, which define the technical and procedural requirements for connecting generation to the distribution network. Understanding these regulations and proper DNO notification procedures is essential for legal and safe grid connection.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileCheck className="h-6 w-6 text-yellow-400" />
                G98 Regulations: Small-Scale Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                G98 covers small-scale generation systems up to 16A per phase (approximately 11kW for three-phase systems), offering a streamlined notification-only process for grid connection.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">G98 Capacity Limits:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Single-phase:</strong> Maximum 16A (3.68kW at 230V)</li>
                    <li>• <strong>Three-phase:</strong> Maximum 16A per phase (≈11kW)</li>
                    <li>• <strong>DC coupled storage:</strong> Included in inverter rating</li>
                    <li>• <strong>AC coupled storage:</strong> Separate application required</li>
                    <li>• <strong>Multiple installations:</strong> Cumulative capacity applies</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Notification Process:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Post-installation:</strong> Notify DNO within 28 days</li>
                    <li>• <strong>Online submission:</strong> Most DNOs offer web portals</li>
                    <li>• <strong>Required information:</strong> System details and certificates</li>
                    <li>• <strong>No pre-approval:</strong> Can install before notification</li>
                    <li>• <strong>No application fee:</strong> Free notification service</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">G98 Required Documentation:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">System Information:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Installation address and postcode</li>
                      <li>• MPAN (electricity meter reference)</li>
                      <li>• System capacity (kW AC output)</li>
                      <li>• Inverter make, model, and serial numbers</li>
                      <li>• Installation and commissioning dates</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Technical Documentation:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Inverter type test certificates</li>
                      <li>• Installation certificates (MCS/HIES)</li>
                      <li>• Electrical installation certificate</li>
                      <li>• Single-line diagram</li>
                      <li>• Commissioning test results</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Installer Details:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Company name and address</li>
                      <li>• MCS or equivalent certification</li>
                      <li>• Installer contact information</li>
                      <li>• Professional indemnity insurance</li>
                      <li>• Workmanship warranty details</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Scale className="h-6 w-6 text-green-400" />
                G99 Regulations: Larger Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                G99 governs larger generation systems above 16A per phase, requiring formal pre-approval and more comprehensive technical assessment before installation can commence.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">G99 Capacity Bands:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Type A:</strong> {'>'}16A to 50kW per phase</li>
                    <li>• <strong>Type B:</strong> {'>'}50kW to 1MW per phase</li>
                    <li>• <strong>Type C:</strong> {'>'}1MW to 10MW per phase</li>
                    <li>• <strong>Type D:</strong> {'>'}10MW (transmission level)</li>
                    <li>• <strong>Assessment complexity:</strong> Increases with capacity</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Application Timeline:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Pre-application enquiry:</strong> Optional but recommended</li>
                    <li>• <strong>Formal application:</strong> Required before installation</li>
                    <li>• <strong>DNO assessment:</strong> 65 working days (Type A)</li>
                    <li>• <strong>Connection offer:</strong> Terms and conditions</li>
                    <li>• <strong>Commissioning:</strong> DNO witnessing may be required</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">G99 Application Fees and Timescales:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2">Capacity Band</th>
                        <th className="text-left p-2">Application Fee</th>
                        <th className="text-left p-2">Assessment Time</th>
                        <th className="text-left p-2">Studies Required</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Type A (16A-50kW)</td>
                        <td className="p-2">£600-£1,200</td>
                        <td className="p-2">65 working days</td>
                        <td className="p-2">Basic technical assessment</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Type B (50kW-1MW)</td>
                        <td className="p-2">£1,500-£3,000</td>
                        <td className="p-2">90 working days</td>
                        <td className="p-2">Load flow and fault level studies</td>
                      </tr>
                      <tr>
                        <td className="p-2">Type C (1-10MW)</td>
                        <td className="p-2">£3,000-£10,000</td>
                        <td className="p-2">120 working days</td>
                        <td className="p-2">Comprehensive impact assessment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-400" />
                Distribution Network Operators and Regional Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                The UK has 14 DNO licence areas operated by six company groups, each with different procedures, systems, and requirements for grid connection applications.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Major DNO Groups:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>UK Power Networks:</strong> London, South East, East of England</li>
                    <li>• <strong>SSE (SSEN):</strong> Scottish Highlands, Southern England</li>
                    <li>• <strong>Northern Powergrid:</strong> North East, Yorkshire</li>
                    <li>• <strong>Electricity North West:</strong> North West England</li>
                    <li>• <strong>Western Power Distribution:</strong> Midlands, Wales, South West</li>
                    <li>• <strong>SP Energy Networks:</strong> Central/Southern Scotland</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">DNO Services and Support:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Online portals:</strong> Application submission and tracking</li>
                    <li>• <strong>Technical helpdesk:</strong> Pre-application support</li>
                    <li>• <strong>Connection seminars:</strong> Training and guidance</li>
                    <li>• <strong>Flexibility services:</strong> Grid balancing opportunities</li>
                    <li>• <strong>Constraint management:</strong> Export limitation schemes</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Key DNO Contact Information:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Finding Your DNO:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Check your electricity bill for DNO details</li>
                      <li>• Use postcode lookup tools online</li>
                      <li>• Contact your electricity supplier</li>
                      <li>• Check Energy Networks Association website</li>
                      <li>• Refer to DNO licence area maps</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Application Support:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Pre-application enquiry services</li>
                      <li>• Technical guidance documents</li>
                      <li>• Application form assistance</li>
                      <li>• Progress tracking systems</li>
                      <li>• Post-connection support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-orange-400" />
                Common Compliance Errors and How to Avoid Them
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Understanding common mistakes in the DNO application process helps ensure smooth approval and avoids costly delays or rejections.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Documentation Errors:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Incorrect MPAN:</strong> Wrong meter reference number</li>
                    <li>• <strong>Missing certificates:</strong> Incomplete type test documentation</li>
                    <li>• <strong>Wrong capacity:</strong> AC vs DC rating confusion</li>
                    <li>• <strong>Outdated forms:</strong> Using superseded application versions</li>
                    <li>• <strong>Incomplete drawings:</strong> Missing single-line diagrams</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Timing Mistakes:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Late G98 notification:</strong> Beyond 28-day deadline</li>
                    <li>• <strong>Installing before G99 approval:</strong> Work done prematurely</li>
                    <li>• <strong>Missing deadlines:</strong> DNO response timeframes</li>
                    <li>• <strong>Inadequate planning:</strong> Not allowing for assessment time</li>
                    <li>• <strong>Change requests:</strong> Modifications after approval</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Technical Issues:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Wrong DNO region:</strong> Applying to incorrect operator</li>
                    <li>• <strong>Exceeding thresholds:</strong> G98/G99 boundary confusion</li>
                    <li>• <strong>Protection settings:</strong> Incorrect or missing parameters</li>
                    <li>• <strong>Export limitations:</strong> Not considering local constraints</li>
                    <li>• <strong>Cumulative capacity:</strong> Ignoring existing installations</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Best Practice Checklist:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Pre-Application:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• ✓ Verify correct DNO for installation postcode</li>
                      <li>• ✓ Confirm total capacity including existing generation</li>
                      <li>• ✓ Check for any local connection constraints</li>
                      <li>• ✓ Obtain correct MPAN from electricity meter</li>
                      <li>• ✓ Download latest application forms and guidance</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Submission and Follow-up:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• ✓ Double-check all technical specifications</li>
                      <li>• ✓ Include all required certificates and drawings</li>
                      <li>• ✓ Submit G99 applications before installation</li>
                      <li>• ✓ Track application progress through DNO systems</li>
                      <li>• ✓ Notify G98 installations within 28 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-900/20 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400">Case Study: G99 Application Process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A commercial client wants to install a 30kW solar system on their warehouse roof, requiring G99 approval due to the capacity exceeding 16A per phase.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-orange-400 font-semibold mb-3">Project Requirements:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">System Specification:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Capacity: 30kW AC (Type A G99)</li>
                      <li>• Location: Industrial estate, UK Power Networks area</li>
                      <li>• Installation: Three-phase connection</li>
                      <li>• Timeline: 8-week installation programme</li>
                      <li>• Budget: £45,000 including DNO fees</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Application Process:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Week 1: Pre-application enquiry submitted</li>
                      <li>• Week 3: Formal G99 application with £800 fee</li>
                      <li>• Week 12: DNO approval received (65 working days)</li>
                      <li>• Week 14: Installation commenced</li>
                      <li>• Week 18: Commissioning completed and witnessed</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-orange-400 font-semibold mb-2">Key Success Factors:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Early engagement:</strong> Pre-application enquiry identified potential issues</li>
                  <li>• <strong>Complete documentation:</strong> All certificates and drawings provided upfront</li>
                  <li>• <strong>Timeline planning:</strong> DNO assessment time built into project schedule</li>
                  <li>• <strong>Professional support:</strong> Experienced installer managed DNO liaison</li>
                  <li>• <strong>Budget allowance:</strong> DNO fees and potential connection costs included</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                G98 and G99 regulations provide the framework for safe and compliant grid connection of renewable energy systems in the UK. Understanding capacity thresholds, application processes, and DNO requirements is essential for successful project delivery. Proper planning and attention to detail in the application process prevents costly delays and ensures smooth grid connection approval.
              </p>
              <p className="text-yellow-400 font-medium">
                Early engagement with DNOs, complete documentation, and professional support are key factors in successful grid connection applications under both G98 and G99 regulations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">What happens if I install without proper DNO notification or approval?</h4>
                  <p className="text-gray-300 text-sm">
                    For G98: Late notification may result in warnings but system can remain connected. For G99: Installation without pre-approval can result in forced disconnection, legal action, and having to apply retrospectively at higher cost. Always follow the correct process to avoid complications.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">How do I find out which DNO covers my area?</h4>
                  <p className="text-gray-300 text-sm">
                    Check your electricity bill for the DNO logo, use the Energy Networks Association postcode lookup tool, or contact your electricity supplier. The DNO is not the same as your energy supplier - they own and operate the local distribution network infrastructure.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">Can a G98 application be rejected by the DNO?</h4>
                  <p className="text-gray-300 text-sm">
                    G98 is notification-only, not approval-based, but DNOs can request system modifications if there are grid capacity concerns. In rare cases, they may require upgrade to G99 process or network reinforcement at the customer's expense. This mainly occurs in areas with high solar penetration.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">How long does a G99 application take to process?</h4>
                  <p className="text-gray-300 text-sm">
                    Type A (up to 50kW): 65 working days, Type B (50kW-1MW): 90 working days, Type C (1-10MW): 120 working days. These are maximum times - many applications are processed faster. Pre-application enquiries can identify potential issues early and speed up the formal process.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">Are there any situations where I might need additional approvals beyond G98/G99?</h4>
                  <p className="text-gray-300 text-sm">
                    Yes: Planning permission for large ground-mounted arrays, Listed building consent for heritage properties, Environmental impact assessments for utility-scale projects, Export licensing for systems over 50MW, and Local authority building control for structural modifications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="G98/G99 Compliance Quiz"
              />
            </CardContent>
          </Card>

          <div className="flex justify-between pt-8">
            <Link to="../renewable-energy-module-5-section-4">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-5-section-6">
              <Button
                variant="default"
                className="bg-yellow-400 text-black hover:bg-yellow-400"
              >
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

export default RenewableEnergyModule5Section5;