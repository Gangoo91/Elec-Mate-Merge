import { ArrowLeft, ArrowRight, UserCheck, BookOpen, Target, AlertTriangle, CheckCircle, Lightbulb, Shield, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule7Section2Quiz } from '@/components/upskilling/quiz/EVChargingModule7Section2Quiz';

const EVChargingModule7Section2 = () => {
  useEffect(() => {
    document.title = 'Approved Installer Registration Process - EV Charging Module 7 Section 2';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn how to become an OZEV approved installer, including registration requirements, competency standards, and ongoing obligations.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-7">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <UserCheck className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 7 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Approved Installer Registration Process
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Becoming an approved EV charging installer with OZEV certification
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">

          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                To deliver EV charging installations under OZEV grant schemes, installers must be 
                officially approved and registered. This approval process ensures that only competent 
                professionals deliver grant-funded projects, maintaining quality standards and 
                protecting public investment.
              </p>
              <p>
                This comprehensive section covers the complete registration process, detailed competency 
                requirements, ongoing compliance obligations, quality assurance procedures, customer 
                protection measures, and the business benefits of becoming an OZEV approved installer.
              </p>
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Detailed Coverage Includes</h4>
                <ul className="text-sm space-y-1">
                  <li>• Complete application process walkthrough</li>
                  <li>• Qualification requirements and assessment criteria</li>
                  <li>• Insurance and liability obligations</li>
                  <li>• Quality management system requirements</li>
                  <li>• Ongoing compliance and monitoring procedures</li>
                  <li>• Customer complaint handling protocols</li>
                  <li>• Audit procedures and documentation requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">Upon completion of this section, you will be able to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Understand the requirements for OZEV installer approval</li>
                <li>Navigate the registration application process</li>
                <li>Identify required competencies and qualifications</li>
                <li>Recognise ongoing compliance obligations</li>
                <li>Understand the benefits and responsibilities of approval</li>
                <li>Implement quality management systems for EV installations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Why Become Approved */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <UserCheck className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Why Become an OZEV Approved Installer?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400" />
                    Business Benefits
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Access to grant-funded projects</li>
                    <li>• Increased market opportunities</li>
                    <li>• Enhanced credibility and trust</li>
                    <li>• Marketing advantages</li>
                    <li>• Government backing</li>
                    <li>• Competitive differentiation</li>
                  </ul>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-yellow-400" />
                    Quality Assurance
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Standardised installation practices</li>
                    <li>• Quality control processes</li>
                    <li>• Customer protection</li>
                    <li>• Technical support access</li>
                    <li>• Industry recognition</li>
                    <li>• Professional development</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Essential Qualifications */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Essential Qualifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Mandatory Qualifications</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Level 3 Award in the Installation of Electric Vehicle Charging Equipment (City & Guilds 2919)</li>
                    <li>• 18th Edition BS 7671 (IET Wiring Regulations)</li>
                    <li>• 2391-52 Inspection, Testing and Certification of Electrical Installations</li>
                    <li>• Part P Building Regulations (for domestic installations)</li>
                    <li>• Current ECS/JIB/NICEIC registration</li>
                  </ul>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Professional Development</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Continuing Professional Development (CPD) records</li>
                    <li>• Annual competency assessments</li>
                    <li>• Technical update training attendance</li>
                    <li>• Manufacturer-specific training certificates</li>
                    <li>• Health and safety qualification updates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Process */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Registration Application Process</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                The approval process involves several stages designed to verify competency 
                and ensure compliance with OZEV standards.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Initial Application</h4>
                    <p className="text-sm mb-2">Submit online application with required documentation</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Complete registration form</li>
                      <li>• Upload qualification certificates</li>
                      <li>• Provide business registration details</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Document Review</h4>
                    <p className="text-sm mb-2">OZEV reviews application and supporting documents</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Qualification verification</li>
                      <li>• Insurance validation</li>
                      <li>• Business compliance checks</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Assessment</h4>
                    <p className="text-sm mb-2">Technical assessment and competency evaluation</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Site visits (if required)</li>
                      <li>• Technical interviews</li>
                      <li>• Practical demonstrations</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Approval Decision</h4>
                    <p className="text-sm mb-2">OZEV makes approval decision and issues credentials</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Approval certificate issued</li>
                      <li>• Installer database listing</li>
                      <li>• Access to installer portal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insurance Requirements */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Insurance and Liability Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Mandatory Insurance</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Public liability: Minimum £2 million</li>
                    <li>• Professional indemnity: Minimum £500,000</li>
                    <li>• Employers liability (if applicable)</li>
                    <li>• Product liability coverage</li>
                    <li>• Annual policy renewal required</li>
                  </ul>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Coverage Areas</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Installation defects and errors</li>
                    <li>• Property damage during installation</li>
                    <li>• Third-party injury claims</li>
                    <li>• Equipment failure consequences</li>
                    <li>• Legal defence costs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ongoing Obligations */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Ongoing Compliance Obligations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-amber-950/20 border border-amber-800 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-2">Key Obligations Include</h4>
                    <ul className="text-amber-200 text-sm space-y-1">
                      <li>• Maintain valid qualifications and certifications</li>
                      <li>• Comply with all OZEV installation standards</li>
                      <li>• Submit accurate installation reports and documentation</li>
                      <li>• Participate in monitoring and audit activities</li>
                      <li>• Report any changes to business circumstances</li>
                      <li>• Maintain appropriate insurance coverage</li>
                      <li>• Handle customer complaints professionally</li>
                      <li>• Attend mandatory training updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Documentation Guide */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Application Documentation Guide</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Required Documents Checklist</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Business Documentation</h5>
                      <ul className="space-y-1">
                        <li>• Companies House registration certificate</li>
                        <li>• VAT registration certificate</li>
                        <li>• Public liability insurance certificate</li>
                        <li>• Professional indemnity insurance</li>
                        <li>• Health and safety policy</li>
                        <li>• Quality management procedures</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Technical Qualifications</h5>
                      <ul className="space-y-1">
                        <li>• City & Guilds 2919 certificate</li>
                        <li>• 18th Edition qualification</li>
                        <li>• 2391-52 testing qualification</li>
                        <li>• Trade body membership certificates</li>
                        <li>• CPD training records</li>
                        <li>• Manufacturer training certificates</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Portfolio Requirements</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Minimum 5 completed EV charging installations</li>
                    <li>• Electrical installation certificates for each project</li>
                    <li>• Customer testimonials and references</li>
                    <li>• Photos of completed installations</li>
                    <li>• Evidence of compliance with standards</li>
                    <li>• Details of any remedial work undertaken</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Management Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Quality Management Systems</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">ISO 9001 Implementation</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Core Requirements</h5>
                      <ul className="space-y-1">
                        <li>• Document control procedures</li>
                        <li>• Management review processes</li>
                        <li>• Customer satisfaction monitoring</li>
                        <li>• Corrective action procedures</li>
                        <li>• Supplier evaluation processes</li>
                        <li>• Continuous improvement systems</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">OZEV Specific Elements</h5>
                      <ul className="space-y-1">
                        <li>• Installation quality procedures</li>
                        <li>• Customer complaint handling</li>
                        <li>• Compliance monitoring systems</li>
                        <li>• Training record management</li>
                        <li>• Equipment approval tracking</li>
                        <li>• Performance measurement</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Customer Service Standards</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Initial response within 24 hours</li>
                    <li>• Site survey completion within 5 working days</li>
                    <li>• Installation completion within agreed timeframes</li>
                    <li>• Post-installation support and training</li>
                    <li>• 12-month warranty on all installations</li>
                    <li>• Annual maintenance service offerings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training and Development */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Training and Professional Development</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Mandatory Training Requirements</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Initial Qualification</h5>
                      <ul className="space-y-1">
                        <li>• City & Guilds 2919 course</li>
                        <li>• Duration: 5 days</li>
                        <li>• Cost: £1,200-1,500</li>
                        <li>• Assessment included</li>
                        <li>• Valid for 5 years</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Annual Updates</h5>
                      <ul className="space-y-1">
                        <li>• Technical update seminars</li>
                        <li>• Regulation changes briefing</li>
                        <li>• New equipment training</li>
                        <li>• Safety procedure updates</li>
                        <li>• Customer service training</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Manufacturer Training</h5>
                      <ul className="space-y-1">
                        <li>• Product-specific courses</li>
                        <li>• Installation techniques</li>
                        <li>• Troubleshooting procedures</li>
                        <li>• Warranty requirements</li>
                        <li>• Technical support access</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Continuing Professional Development (CPD)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Minimum 20 hours CPD annually</li>
                    <li>• Mix of technical and business skills training</li>
                    <li>• Industry conference attendance</li>
                    <li>• Peer learning and knowledge sharing</li>
                    <li>• Online learning modules and webinars</li>
                    <li>• Professional body membership maintenance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit and Compliance Monitoring */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Audit and Compliance Monitoring</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">OZEV Audit Process</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Audit Types</h5>
                      <ul className="space-y-1">
                        <li>• Initial approval audit</li>
                        <li>• Annual surveillance audits</li>
                        <li>• Random spot checks</li>
                        <li>• Customer complaint investigations</li>
                        <li>• Renewal audits (every 3 years)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Audit Focus Areas</h5>
                      <ul className="space-y-1">
                        <li>• Installation quality and compliance</li>
                        <li>• Documentation and record keeping</li>
                        <li>• Customer satisfaction levels</li>
                        <li>• Training and competency records</li>
                        <li>• Business operation procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Performance Indicators</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Quality Metrics</h5>
                      <ul className="space-y-1">
                         <li>• Installation success rate: &gt;95%</li>
                         <li>• Customer satisfaction: &gt;90%</li>
                         <li>• Compliance score: 100%</li>
                         <li>• Defect rate: &lt;2%</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Service Metrics</h5>
                      <ul className="space-y-1">
                        <li>• Response time: &lt;24 hours</li>
                        <li>• Installation time: Within agreed</li>
                        <li>• Support availability: 5 days/week</li>
                        <li>• Training completion: 100%</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Business Metrics</h5>
                      <ul className="space-y-1">
                        <li>• Insurance coverage: Current</li>
                        <li>• Qualification validity: Current</li>
                        <li>• Complaint resolution: &lt;7 days</li>
                        <li>• Audit compliance: 100%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Application Mistakes */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Common Application Mistakes to Avoid</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Documentation Errors</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Expired Certificates</h5>
                      <p className="text-sm mb-1">Submitting expired qualification or insurance certificates.</p>
                      <p className="text-sm text-green-300">✅ <strong>Solution:</strong> Check all certificate expiry dates before submission and ensure renewals are current.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Incomplete Portfolio</h5>
                      <p className="text-sm mb-1">Insufficient evidence of practical experience and installations.</p>
                      <p className="text-sm text-green-300">✅ <strong>Solution:</strong> Prepare comprehensive portfolio with detailed project documentation and customer references.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Poor Quality Documentation</h5>
                      <p className="text-sm mb-1">Unclear photos, illegible documents, or missing information.</p>
                      <p className="text-sm text-green-300">✅ <strong>Solution:</strong> Ensure all documents are high resolution, clearly legible, and complete.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Business Structure Issues</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Inadequate Insurance Coverage</h5>
                      <p className="text-sm mb-1">Insurance limits below OZEV minimum requirements.</p>
                      <p className="text-sm text-green-300">✅ <strong>Solution:</strong> Verify insurance meets all OZEV requirements: £2M public liability, £500K professional indemnity.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Missing Quality Procedures</h5>
                      <p className="text-sm mb-1">Lack of documented quality management systems and procedures.</p>
                      <p className="text-sm text-green-300">✅ <strong>Solution:</strong> Develop comprehensive quality management system covering all aspects of EV installation services.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Opportunities */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Market Opportunities for Approved Installers</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Market Size and Growth</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Current Market</h5>
                      <ul className="space-y-1">
                        <li>• UK EV market: 300,000+ registrations annually</li>
                        <li>• Charging point installations: 50,000+ per year</li>
                        <li>• Average installation value: £800-2,500</li>
                        <li>• Grant funding available: £100M+ annually</li>
                        <li>• Approved installers: 2,000+ nationwide</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Future Projections</h5>
                      <ul className="space-y-1">
                        <li>• 2030 target: 1.5M installations required</li>
                        <li>• Market value: £3 billion by 2030</li>
                        <li>• Workplace charging: 400% growth expected</li>
                        <li>• Public charging: 800% growth required</li>
                        <li>• Job creation: 30,000+ new positions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Revenue Streams for Approved Installers</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Installation Services</h5>
                      <ul className="space-y-1">
                        <li>• Domestic installations: £500-1,500</li>
                        <li>• Commercial installations: £2,000-50,000</li>
                        <li>• Fleet installations: £10,000-100,000</li>
                        <li>• Public charging: £5,000-25,000</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Ongoing Services</h5>
                      <ul className="space-y-1">
                        <li>• Annual maintenance: £100-500 per point</li>
                        <li>• Emergency repairs: £200-800 per call</li>
                        <li>• Software updates: £50-200 per point</li>
                        <li>• Warranty extensions: £150-600</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Additional Opportunities</h5>
                      <ul className="space-y-1">
                        <li>• Training delivery: £500-2,000 per day</li>
                        <li>• Consultancy services: £400-1,200 per day</li>
                        <li>• Equipment supply: 10-30% margin</li>
                        <li>• Grant application support: £200-1,000</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Real World Case Study</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-3">ElectroTech Solutions - OZEV Approval Journey</h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Preparation Phase</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Completed City & Guilds 2919 training</li>
                      <li>• Updated 18th Edition certification</li>
                      <li>• Obtained appropriate insurance</li>
                      <li>• Prepared portfolio of work</li>
                      <li>• Established quality procedures</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-white mb-2">Business Benefits</h5>
                    <ul className="text-sm space-y-1">
                      <li>• 300% increase in EV work</li>
                      <li>• Access to £50k+ grant projects</li>
                      <li>• Enhanced market credibility</li>
                      <li>• Competitive advantage gained</li>
                      <li>• Stable revenue from grants</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-950/20 border border-green-800 rounded">
                  <p className="text-green-200 text-sm">
                    <strong>Result:</strong> ElectroTech became approved in 6 weeks and secured their first 
                    WCS project worth £14,000 within the first month of approval.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Component */}
          <EVChargingModule7Section2Quiz />

          <Separator className="bg-gray-700" />

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link to="../ev-charging-module-7-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <div></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EVChargingModule7Section2;