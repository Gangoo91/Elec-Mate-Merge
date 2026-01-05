import { ArrowLeft, ArrowRight, FileText, CheckCircle, AlertCircle, Shield, Wrench, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule8Section5 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What's one critical item that must be included in every handover pack?",
      options: [
        "Marketing brochures about future products",
        "MCS certificate and electrical installation certificate",
        "Installer's personal contact details only",
        "Generic system specifications from the internet"
      ],
      correct: 1,
      explanation: "MCS certificate and electrical installation certificate are legally required documents that prove compliance and enable warranty claims and government incentives."
    },
    {
      id: 2,
      question: "Why are inverter operation manuals critically important for clients?",
      options: [
        "They contain warranty terms only",
        "They're required by building regulations",
        "They provide essential safety procedures for isolation and emergency shutdown",
        "They help with system marketing to neighbours"
      ],
      correct: 2,
      explanation: "Inverter manuals contain crucial safety information including proper isolation procedures, emergency shutdown steps, and warning indicators that prevent accidents and equipment damage."
    },
    {
      id: 3,
      question: "Who should receive a copy of the DNO notification and approval documents?",
      options: [
        "Only the DNO and installer",
        "The client, their electricity supplier, and future maintainers",
        "Just the client's solicitor",
        "The equipment manufacturer only"
      ],
      correct: 1,
      explanation: "The client needs copies for their records, the electricity supplier may need them for export payments, and future maintainers require them to understand the approved system configuration."
    },
    {
      id: 4,
      question: "What could void a system warranty post-installation?",
      options: [
        "Reading the operation manual",
        "Regular visual inspections by the homeowner",
        "Unauthorised modifications or repairs without following proper procedures",
        "Cleaning solar panels with water"
      ],
      correct: 2,
      explanation: "Unauthorised modifications, improper maintenance, or repairs not following manufacturer guidelines can void warranties. Proper documentation helps clients understand these requirements."
    },
    {
      id: 5,
      question: "Should handover documentation be provided in physical or digital format?",
      options: [
        "Only physical copies for legal compliance",
        "Only digital copies to save costs",
        "Both formats - digital for convenience, physical backup for critical documents",
        "Whatever format is cheapest for the installer"
      ],
      correct: 2,
      explanation: "Digital copies provide easy access and sharing, while physical backups ensure critical documents remain available if technology fails. Both formats serve important purposes."
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
              <FileText className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Handover Documentation & Operation Manuals
                </h1>
                <p className="text-xl text-gray-400">
                  Complete system documentation for client independence and legal protection
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 5
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Professional handover documentation is the final critical step that transforms a technical 
                installation into a manageable system for the client. Comprehensive documentation ensures 
                client independence, provides legal protection for installers, and forms the foundation 
                for ongoing system maintenance and warranty support.
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
                <span>Create comprehensive system handover documentation packs</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Include essential safety and maintenance instructions for client operation</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Understand documentation's critical role in warranty and legal protection</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Essential Handover Documentation Components</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Documentation Purpose:</h4>
                <p className="text-sm">
                  Every document serves specific purposes: legal compliance, warranty protection, 
                  safety guidance, and operational independence. Missing documentation can result 
                  in rejected warranty claims and ongoing liability issues.
                </p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold text-green-400 mb-4">System Overview and Technical Documentation:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-3">System Diagrams and Layout:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• <strong>System schematic:</strong> Single-line electrical diagram</li>
                        <li>• <strong>Array layout:</strong> Panel positions and string configurations</li>
                        <li>• <strong>Equipment locations:</strong> Inverter, isolators, meters</li>
                        <li>• <strong>Cable routes:</strong> DC and AC wiring paths</li>
                        <li>• <strong>Earthing arrangements:</strong> Bonding and protection systems</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-3">Technical Specifications:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• <strong>System capacity:</strong> DC generation and AC export limits</li>
                        <li>• <strong>Expected performance:</strong> Annual yield estimates</li>
                        <li>• <strong>Equipment specifications:</strong> Model numbers and ratings</li>
                        <li>• <strong>Protection settings:</strong> Inverter and isolator configurations</li>
                        <li>• <strong>Monitoring setup:</strong> Portal access and login details</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-8">
                  <h4 className="font-semibold text-purple-400 mb-4">Compliance and Legal Documentation:</h4>
                  <div className="space-y-6 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-3">Essential Certificates:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• <strong>MCS Installation Certificate:</strong> Proof of certified installation</li>
                        <li>• <strong>Electrical Installation Certificate:</strong> BS 7671 compliance</li>
                        <li>• <strong>Building Control notifications:</strong> Where applicable</li>
                        <li>• <strong>DNO connection approval:</strong> G98/G99 documentation</li>
                        <li>• <strong>Insurance certificates:</strong> Public liability and indemnity</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-3">Warranty Documentation:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• <strong>Equipment warranties:</strong> All manufacturers' terms and conditions</li>
                        <li>• <strong>Installation warranty:</strong> Installer's workmanship guarantee</li>
                        <li>• <strong>Performance guarantees:</strong> Expected yield commitments</li>
                        <li>• <strong>Insurance-backed warranties:</strong> Financial protection details</li>
                        <li>• <strong>Warranty claim procedures:</strong> Contact details and processes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-8">
                  <h4 className="font-semibold text-orange-400 mb-4">Operation and Maintenance Manuals:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-3">Safety Information:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• <strong>Emergency procedures:</strong> System shutdown and isolation</li>
                        <li>• <strong>Warning signs:</strong> Electrical hazards and hot surfaces</li>
                        <li>• <strong>Access restrictions:</strong> Roof work and electrical safety</li>
                        <li>• <strong>Fire safety:</strong> Emergency services information</li>
                        <li>• <strong>Equipment limitations:</strong> Operating temperature and weather</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-3">Routine Maintenance:</h5>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• <strong>Visual inspection checklists:</strong> What to check monthly</li>
                        <li>• <strong>Cleaning procedures:</strong> Safe panel and equipment cleaning</li>
                        <li>• <strong>Performance monitoring:</strong> Normal operation indicators</li>
                        <li>• <strong>Troubleshooting guides:</strong> Common issues and solutions</li>
                        <li>• <strong>Professional service schedule:</strong> Annual maintenance requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Equipment-Specific Operation Manuals</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Each major system component requires specific operational guidance tailored to the client's installation:</p>
              
              <div className="space-y-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Inverter Operation Manual:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Critical Safety Procedures:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Isolation sequence:</strong> AC then DC isolation procedure</li>
                        <li>• <strong>Arc flash warnings:</strong> Never disconnect under load</li>
                        <li>• <strong>Restart procedures:</strong> Correct sequence after maintenance</li>
                        <li>• <strong>Emergency shutdown:</strong> Location and operation of emergency stops</li>
                        <li>• <strong>Fault indicators:</strong> LED meanings and appropriate responses</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Normal Operation:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Status indicators:</strong> Normal operation LED patterns</li>
                        <li>• <strong>Display functions:</strong> Menu navigation and information</li>
                        <li>• <strong>Data logging access:</strong> Performance monitoring features</li>
                        <li>• <strong>Communication status:</strong> WiFi and monitoring connectivity</li>
                        <li>• <strong>Environmental considerations:</strong> Operating temperature limits</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Battery System Documentation (where applicable):</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Safety and Operation:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Battery chemistry specific safety information (lithium-ion, lead-acid)</li>
                        <li>• Charge/discharge cycle information and optimisation settings</li>
                        <li>• Environmental requirements (temperature, ventilation, access)</li>
                        <li>• Emergency procedures for thermal events or cell failures</li>
                        <li>• Backup power operation and limitations during outages</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Monitoring and Management:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Battery management system (BMS) interface and alerts</li>
                        <li>• State of charge indicators and normal operating ranges</li>
                        <li>• Energy storage scheduling and time-of-use optimisation</li>
                        <li>• Integration with solar generation and grid import settings</li>
                        <li>• Warranty requirements and prohibited operating conditions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3">Monitoring System Setup:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Portal Access and Setup:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Account credentials and password reset procedures</li>
                        <li>• Mobile app installation and setup guide</li>
                        <li>• Notification settings for performance and fault alerts</li>
                        <li>• Historical data interpretation and performance comparison</li>
                        <li>• Sharing access with family members or property managers</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Performance Interpretation:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Expected daily, monthly, and annual generation patterns</li>
                        <li>• Weather impact understanding and seasonal variations</li>
                        <li>• Fault detection and when to contact support</li>
                        <li>• Energy consumption analysis and optimisation opportunities</li>
                        <li>• Export tracking and feed-in tariff validation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Documentation Storage and Presentation</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-4">
                <h4 className="text-purple-400 font-semibold mb-2">Professional Presentation:</h4>
                <p className="text-sm">
                  How documentation is presented reflects professionalism and affects client confidence. 
                  Well-organised, easily accessible documentation reduces support calls and demonstrates quality service.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Digital Documentation Solutions:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Advantages:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Easy sharing:</strong> Email to suppliers, maintainers, insurers</li>
                        <li>• <strong>Searchable content:</strong> Quick location of specific information</li>
                        <li>• <strong>Version control:</strong> Updated manuals and revised procedures</li>
                        <li>• <strong>Multiple backups:</strong> Cloud storage and local copies</li>
                        <li>• <strong>Hyperlinked navigation:</strong> Quick access between related documents</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Recommended Formats:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>PDF portfolios:</strong> Combined documents with bookmarks</li>
                        <li>• <strong>Cloud storage links:</strong> Shared folders with organised structure</li>
                        <li>• <strong>QR codes:</strong> Quick access to online documentation</li>
                        <li>• <strong>Mobile-optimised:</strong> Smartphone and tablet accessible</li>
                        <li>• <strong>Password protection:</strong> Secure access to sensitive information</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-3">Physical Documentation Requirements:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Critical Physical Documents:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Emergency shutdown procedures posted near main isolators</li>
                        <li>• System warning labels and electrical hazard notifications</li>
                        <li>• Quick reference cards for common operations and troubleshooting</li>
                        <li>• Contact information for emergency services and support</li>
                        <li>• Original certificates in protective sleeves or folders</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Presentation Standards:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Professional binding or presentation folders</li>
                        <li>• Laminated quick reference guides for outdoor equipment</li>
                        <li>• Clear labelling and section dividers for easy navigation</li>
                        <li>• Weatherproof storage near main system components</li>
                        <li>• Branded documentation reflecting installer professionalism</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3">Handover Process and Client Training:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Documentation Walkthrough:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Guided tour through all documentation sections</li>
                        <li>• Demonstration of system operation and safety procedures</li>
                        <li>• Hands-on practice with monitoring systems and apps</li>
                        <li>• Q&A session addressing client-specific concerns</li>
                        <li>• Written confirmation of handover completion</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Ongoing Support Structure:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Clear escalation procedures for different issue types</li>
                        <li>• Support contact details with response time commitments</li>
                        <li>• Annual review and maintenance scheduling information</li>
                        <li>• Documentation update procedures for system modifications</li>
                        <li>• Client feedback collection and continuous improvement</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Legal Protection and Warranty Implications</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                <h4 className="text-red-400 font-semibold mb-2">Documentation as Legal Protection:</h4>
                <p className="text-sm">
                  Comprehensive handover documentation serves as evidence of professional installation, 
                  proper client briefing, and compliance with all relevant standards and regulations.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-3">Liability Reduction Strategies:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Client Education Documentation:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Signed acknowledgment of safety briefing received</li>
                        <li>• Written confirmation of operation training completion</li>
                        <li>• Documentation of client questions asked and answered</li>
                        <li>• Clear specification of what client can/cannot do themselves</li>
                        <li>• Evidence of proper handover process followed</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Warranty Protection Elements:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Detailed installation methodology and compliance evidence</li>
                        <li>• Manufacturer specification adherence documentation</li>
                        <li>• Environmental condition warnings and limitations</li>
                        <li>• Maintenance requirement communication and scheduling</li>
                        <li>• Modification prohibition and approval process clarity</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Common Documentation Deficiencies:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Frequently Missing Items:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Equipment-specific safety warnings and operating limitations</li>
                        <li>• Clear contact procedures for different types of issues</li>
                        <li>• Routine maintenance schedules and requirements</li>
                        <li>• System modification approval processes and restrictions</li>
                        <li>• Insurance implications of improper operation or maintenance</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Quality Assurance Checklist:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• All certificates present and properly completed</li>
                        <li>• Equipment manuals match actual installed components</li>
                        <li>• Contact information current and comprehensive</li>
                        <li>• Safety procedures clearly explained and demonstrated</li>
                        <li>• Client sign-off obtained for all handover elements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Digital Tools and Customer Support Systems</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Modern Handover Technology:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Digital Documentation Platforms:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Cloud storage:</strong> Secure document hosting and access</li>
                        <li>• <strong>Mobile apps:</strong> Customer portal for system management</li>
                        <li>• <strong>QR code access:</strong> Instant document and manual retrieval</li>
                        <li>• <strong>Version control:</strong> Automatic updates to manuals and guides</li>
                        <li>• <strong>Multi-device access:</strong> Smartphone, tablet, and desktop</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Interactive Training Tools:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Video tutorials:</strong> System operation demonstrations</li>
                        <li>• <strong>AR overlays:</strong> Augmented reality equipment identification</li>
                        <li>• <strong>Virtual walkthroughs:</strong> 3D system exploration</li>
                        <li>• <strong>Interactive checklists:</strong> Guided maintenance procedures</li>
                        <li>• <strong>Knowledge assessments:</strong> Customer understanding verification</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3">Ongoing Customer Support Infrastructure:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Multi-Channel Support:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• 24/7 helpdesk with technical expertise and emergency response</li>
                        <li>• Live chat integration with system monitoring data</li>
                        <li>• Video call support for visual troubleshooting</li>
                        <li>• Remote diagnostic capabilities through monitoring systems</li>
                        <li>• Automated fault notification and resolution tracking</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Customer Education Programs:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Quarterly system performance reviews and optimisation advice</li>
                        <li>• Seasonal maintenance reminders and weather preparation</li>
                        <li>• Energy efficiency workshops and consumption analysis</li>
                        <li>• Technology update notifications and upgrade options</li>
                        <li>• Peer user community forums and knowledge sharing</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-3">Performance Guarantee and Monitoring:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Guaranteed Performance Tracking:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Baseline establishment:</strong> First-year performance calibration</li>
                        <li>• <strong>Weather normalisation:</strong> Climate-adjusted comparisons</li>
                        <li>• <strong>Degradation monitoring:</strong> Annual efficiency loss tracking</li>
                        <li>• <strong>Threshold alerts:</strong> Performance drop notifications</li>
                        <li>• <strong>Rectification procedures:</strong> Underperformance resolution</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Warranty Administration:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• <strong>Warranty database:</strong> Centralised component tracking</li>
                        <li>• <strong>Claim processing:</strong> Streamlined warranty submissions</li>
                        <li>• <strong>Replacement logistics:</strong> Component supply and installation</li>
                        <li>• <strong>Extended warranties:</strong> Optional coverage extensions</li>
                        <li>• <strong>Insurance coordination:</strong> Claims support and documentation</li>
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
                  <strong>Case Study:</strong> A client attempted to isolate their inverter during a power cut 
                  without reading the operation manual. They disconnected the DC isolator under load, causing 
                  an arc flash that damaged the isolator and burned their hand. The installer was held liable 
                  for £3,000 in medical costs and equipment replacement because they couldn't prove adequate 
                  safety training had been provided during handover.
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
                Professional handover documentation transforms installations into manageable systems while 
                providing essential legal protection. Comprehensive documentation reduces support calls, 
                ensures client independence, and demonstrates the professionalism that builds lasting 
                business relationships and referrals.
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
              <SingleQuestionQuiz questions={quizQuestions} title="Handover Documentation Quiz" />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../renewable-energy-module-8-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-8">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Complete Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule8Section5;