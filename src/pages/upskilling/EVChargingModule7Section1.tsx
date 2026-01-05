import { ArrowLeft, ArrowRight, Award, BookOpen, Target, AlertTriangle, CheckCircle, Lightbulb, Banknote, Users, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule7Section1Quiz } from '@/components/upskilling/quiz/EVChargingModule7Section1Quiz';

const EVChargingModule7Section1 = () => {
  useEffect(() => {
    document.title = 'OZEV and Workplace Charging Scheme Explained - EV Charging Module 7 Section 1';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about OZEV grants, workplace charging schemes, and government incentives for EV infrastructure installations.');
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
            <Award className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 7 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            OZEV and Workplace Charging Scheme Explained
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Understanding government incentives and charging schemes for EV infrastructure
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
                The Office for Zero Emission Vehicles (OZEV) provides crucial funding to accelerate the deployment 
                of EV charging infrastructure across the UK. Understanding these schemes is essential for installers 
                to help clients access available grants and ensure compliance with funding requirements.
              </p>
              <p>
                This comprehensive section covers all major OZEV funding schemes, detailed eligibility criteria, 
                step-by-step application processes, installer responsibilities, compliance requirements, and real-world 
                case studies demonstrating successful grant applications and installations.
              </p>
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Key Topics Covered</h4>
                <ul className="text-sm space-y-1">
                  <li>• OZEV structure and grant schemes overview</li>
                  <li>• Workplace Charging Scheme (WCS) detailed requirements</li>
                  <li>• Electric Vehicle Homecharge Scheme (EVHS) criteria</li>
                  <li>• Application processes and documentation requirements</li>
                  <li>• Compliance obligations and ongoing responsibilities</li>
                  <li>• Financial calculations and cost-benefit analysis</li>
                  <li>• Case studies and practical examples</li>
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
                <li>Explain the purpose and structure of OZEV funding schemes</li>
                <li>Identify eligibility criteria for different OZEV grants</li>
                <li>Understand the Workplace Charging Scheme requirements</li>
                <li>Navigate the application and approval processes</li>
                <li>Recognise installer obligations under grant schemes</li>
                <li>Calculate grant funding and project costs effectively</li>
              </ul>
            </CardContent>
          </Card>

          {/* OZEV Overview */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">What is OZEV?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                The Office for Zero Emission Vehicles (OZEV) is a government body that works across 
                departments to support the transition to zero emission vehicles. OZEV administers 
                various grant schemes to accelerate the deployment of EV charging infrastructure.
              </p>
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Key OZEV Objectives</h4>
                <ul className="text-sm space-y-1">
                  <li>• Reduce barriers to EV adoption</li>
                  <li>• Support the development of charging infrastructure</li>
                  <li>• Drive innovation in zero emission transport</li>
                  <li>• Ensure equitable access to charging facilities</li>
                  <li>• Protect public investment through quality standards</li>
                  <li>• Enable the transition to net-zero transport</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Workplace Charging Scheme */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Workplace Charging Scheme (WCS)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                The Workplace Charging Scheme provides vouchers towards the up-front costs of the 
                purchase and installation of electric vehicle charge points for eligible businesses, 
                charities, and public sector organisations.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Banknote className="h-4 w-4 text-yellow-400" />
                    Grant Details
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Up to £350 per socket</li>
                    <li>• Maximum 40 sockets per applicant</li>
                    <li>• Covers up to 75% of total costs</li>
                    <li>• Includes installation costs</li>
                    <li>• Available until March 2025</li>
                  </ul>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400" />
                    Eligibility Criteria
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• UK-based organisations</li>
                    <li>• Dedicated parking spaces</li>
                    <li>• Charge points for staff/fleet use</li>
                    <li>• OZEV approved installer required</li>
                    <li>• Smart charging capability</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-950/20 border border-red-800 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-1">Important Update</h4>
                    <p className="text-red-200 text-sm">
                      The WCS is currently under review and scheduled to close to new applications 
                      in March 2025. Always check the latest guidance on the OZEV website.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Requirements */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Technical Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Charging Point Standards</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Mode 3 charging (Type 1 or Type 2)</li>
                    <li>• Minimum 3.6kW output power</li>
                    <li>• Smart charging capability required</li>
                    <li>• OZEV approved equipment only</li>
                    <li>• Network connectivity required</li>
                  </ul>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Installation Standards</h4>
                  <ul className="text-sm space-y-1">
                    <li>• BS 7671 compliance mandatory</li>
                    <li>• IET Code of Practice adherence</li>
                    <li>• Building Regulations compliance</li>
                    <li>• Appropriate RCD protection</li>
                    <li>• Load balancing where required</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Process */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Application Process</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                The application process for OZEV grants follows a structured approach to ensure 
                compliance and proper use of public funds.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Pre-Application Checks</h4>
                    <p className="text-sm mb-2">Verify eligibility criteria and gather required documentation</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Site survey and electrical assessment</li>
                      <li>• Confirm dedicated parking availability</li>
                      <li>• Check DNO capacity requirements</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Online Application</h4>
                    <p className="text-sm mb-2">Submit application through the OZEV portal</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Complete application form</li>
                      <li>• Upload site plans and drawings</li>
                      <li>• Provide installer certifications</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Installation Phase</h4>
                    <p className="text-sm mb-2">Proceed with installation using approved installer</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Use OZEV approved equipment</li>
                      <li>• Complete electrical testing</li>
                      <li>• Issue installation certificates</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Grant Claim</h4>
                    <p className="text-sm mb-2">Submit evidence and claim reimbursement</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Provide completion evidence</li>
                      <li>• Submit final invoices</li>
                      <li>• Upload installation photos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EVHS Overview */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Electric Vehicle Homecharge Scheme (EVHS)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                The Electric Vehicle Homecharge Scheme provides grant funding towards the cost of installing 
                electric vehicle charge points at domestic properties across the UK.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Grant Structure</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Up to £350 or 75% of costs (whichever is lower)</li>
                    <li>• Available for homeowners and tenants</li>
                    <li>• Must have dedicated off-street parking</li>
                    <li>• One grant per household eligible</li>
                    <li>• Smart charging capability required</li>
                  </ul>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Eligibility Requirements</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Own or lease an eligible electric vehicle</li>
                    <li>• Have off-street parking available</li>
                    <li>• Property must be domestic residence</li>
                    <li>• Use OZEV approved installer</li>
                    <li>• Install OZEV approved equipment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Analysis */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Banknote className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Financial Analysis and Cost Benefits</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Cost Breakdown Analysis</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Small Installation (1-2 points)</h5>
                      <ul className="space-y-1">
                        <li>• Equipment: £800-1,200</li>
                        <li>• Installation: £400-600</li>
                        <li>• Total: £1,200-1,800</li>
                        <li>• Grant: £350-700</li>
                        <li>• Net cost: £500-1,450</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Medium Installation (5-10 points)</h5>
                      <ul className="space-y-1">
                        <li>• Equipment: £4,000-8,000</li>
                        <li>• Installation: £2,000-4,000</li>
                        <li>• Total: £6,000-12,000</li>
                        <li>• Grant: £1,750-3,500</li>
                        <li>• Net cost: £4,250-8,500</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Large Installation (20+ points)</h5>
                      <ul className="space-y-1">
                        <li>• Equipment: £15,000-30,000</li>
                        <li>• Installation: £8,000-15,000</li>
                        <li>• Total: £23,000-45,000</li>
                        <li>• Grant: £7,000-14,000</li>
                        <li>• Net cost: £16,000-31,000</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Return on Investment Calculation</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Direct Benefits</h5>
                      <ul className="space-y-1">
                        <li>• Reduced installation costs (30-50%)</li>
                        <li>• Tax advantages for businesses</li>
                        <li>• Enhanced property value</li>
                        <li>• Employee satisfaction improvement</li>
                        <li>• Corporate sustainability goals</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Indirect Benefits</h5>
                      <ul className="space-y-1">
                        <li>• Talent attraction and retention</li>
                        <li>• Corporate social responsibility</li>
                        <li>• Future-proofing infrastructure</li>
                        <li>• Potential revenue from charging</li>
                        <li>• Marketing and PR opportunities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance and Documentation */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Compliance and Documentation Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Essential Documentation</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Pre-Installation</h5>
                      <ul className="space-y-1">
                        <li>• Site survey report</li>
                        <li>• Electrical load assessment</li>
                        <li>• Planning permission (if required)</li>
                        <li>• DNO application and approval</li>
                        <li>• Risk assessment documentation</li>
                        <li>• Method statements</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Post-Installation</h5>
                      <ul className="space-y-1">
                        <li>• Electrical Installation Certificate</li>
                        <li>• Inspection and test results</li>
                        <li>• Commissioning certificates</li>
                        <li>• User manuals and warranties</li>
                        <li>• As-built drawings</li>
                        <li>• Grant claim documentation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Regulatory Compliance Checklist</h4>
                  <ul className="text-sm space-y-1">
                    <li>• BS 7671:2018+A2:2022 (18th Edition) compliance</li>
                    <li>• IET Code of Practice for EV Charging Equipment Installation</li>
                    <li>• Building Regulations Part P compliance</li>
                    <li>• CDM Regulations 2015 compliance</li>
                    <li>• HASAWA 1974 and associated regulations</li>
                    <li>• Data Protection Act 2018 (for smart charging)</li>
                    <li>• Equality Act 2010 (accessibility requirements)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Challenges and Solutions */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Common Challenges and Solutions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Application Challenges</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">Challenge: Incomplete Documentation</h5>
                      <p className="text-sm mb-1">Many applications are rejected due to missing or incomplete supporting documents.</p>
                      <p className="text-sm text-green-300"><strong>Solution:</strong> Create a comprehensive checklist and verify all documents before submission. Use the OZEV portal's document verification tool.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">Challenge: Ineligible Equipment Selection</h5>
                      <p className="text-sm mb-1">Using non-OZEV approved charging equipment leads to application rejection.</p>
                      <p className="text-sm text-green-300"><strong>Solution:</strong> Always check the OZEV approved product database before specifying equipment. Verify manufacturer certification status.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">Challenge: Insufficient Electrical Capacity</h5>
                      <p className="text-sm mb-1">Existing electrical infrastructure cannot support the proposed charging installation.</p>
                      <p className="text-sm text-green-300"><strong>Solution:</strong> Conduct thorough electrical surveys early in the process. Consider load management systems to optimize existing capacity.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Installation Challenges</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">Challenge: Parking Space Allocation</h5>
                      <p className="text-sm mb-1">Difficulty in securing dedicated parking spaces for charging points.</p>
                      <p className="text-sm text-green-300"><strong>Solution:</strong> Work with facility management to develop clear EV parking policies and signage strategies.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">Challenge: Network Connectivity Issues</h5>
                      <p className="text-sm mb-1">Poor mobile signal or internet connectivity affecting smart charging functionality.</p>
                      <p className="text-sm text-green-300"><strong>Solution:</strong> Conduct connectivity surveys and consider Wi-Fi integration or signal boosters for reliable communication.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multiple Case Studies */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Additional Case Studies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-3">Case Study 1: NHS Trust Hospital Complex</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Project Scope</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 50 × 7kW charging points</li>
                        <li>• Staff and visitor parking</li>
                        <li>• Total cost: £45,000</li>
                        <li>• Grant funding: £17,500 (maximum 40 points)</li>
                        <li>• Net cost: £27,500</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Key Challenges</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Limited electrical capacity</li>
                        <li>• 24/7 operational requirements</li>
                        <li>• Multiple user groups</li>
                        <li>• Accessibility compliance</li>
                        <li>• Infection control considerations</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-green-950/20 border border-green-800 rounded">
                    <p className="text-green-200 text-sm">
                      <strong>Outcome:</strong> Successful installation with load management system. 85% staff satisfaction, 
                      30% increase in EV adoption among employees within 12 months.
                    </p>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-3">Case Study 2: Small Manufacturing Business</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Project Details</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 8 × 7kW charging points</li>
                        <li>• Employee van fleet charging</li>
                        <li>• Total cost: £8,500</li>
                        <li>• Grant funding: £2,800</li>
                        <li>• 33% cost reduction achieved</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Implementation Strategy</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Phased installation approach</li>
                        <li>• Integration with existing fleet management</li>
                        <li>• Time-of-use tariff optimization</li>
                        <li>• Employee incentive programme</li>
                        <li>• Maintenance contract included</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-3">Case Study 3: Local Authority Office Building</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Public Sector Implementation</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 25 × 11kW charging points</li>
                        <li>• Mixed staff and public access</li>
                        <li>• Total investment: £28,000</li>
                        <li>• Grant support: £8,750</li>
                        <li>• Procurement compliance required</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Sustainability Goals</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Carbon neutral by 2030 target</li>
                        <li>• Solar PV integration planned</li>
                        <li>• Public demonstration project</li>
                        <li>• Community engagement programme</li>
                        <li>• Revenue generation from public use</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices Guide */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Best Practices for OZEV Applications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Application Success Factors</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Preparation Phase</h5>
                      <ul className="space-y-1">
                        <li>• Engage with clients early in the process</li>
                        <li>• Conduct thorough site surveys</li>
                        <li>• Verify all eligibility criteria</li>
                        <li>• Check equipment availability and lead times</li>
                        <li>• Prepare comprehensive documentation</li>
                        <li>• Plan for potential complications</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Application Phase</h5>
                      <ul className="space-y-1">
                        <li>• Double-check all form entries</li>
                        <li>• Upload high-quality supporting documents</li>
                        <li>• Provide clear and accurate cost breakdowns</li>
                        <li>• Include detailed technical specifications</li>
                        <li>• Submit well in advance of deadlines</li>
                        <li>• Maintain regular communication with OZEV</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Installation Excellence</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Use only OZEV approved equipment and installers</li>
                    <li>• Implement robust project management procedures</li>
                    <li>• Maintain clear communication with all stakeholders</li>
                    <li>• Document all work comprehensively</li>
                    <li>• Test all systems thoroughly before commissioning</li>
                    <li>• Provide comprehensive user training</li>
                    <li>• Establish clear maintenance and support procedures</li>
                  </ul>
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
                <h4 className="font-semibold text-yellow-400 mb-3">TechCorp Ltd - WCS Application Success</h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Project Details</h5>
                    <ul className="text-sm space-y-1">
                      <li>• 4 × 7kW smart charging points</li>
                      <li>• Total installation cost: £2,800</li>
                      <li>• Grant received: £1,400 (4 × £350)</li>
                      <li>• Company contribution: £1,400</li>
                      <li>• 50% cost reduction achieved</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-white mb-2">Timeline</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Application approved</li>
                      <li>• Week 2: Site survey completed</li>
                      <li>• Week 3-4: Equipment delivered</li>
                      <li>• Week 5: Installation & testing</li>
                      <li>• Week 6: Grant claim submitted</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Component */}
          <EVChargingModule7Section1Quiz />

          <Separator className="bg-gray-700" />

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <div></div>
            <Link to="../ev-charging-module-7-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 transition-colors">
                Next Section: Installer Registration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EVChargingModule7Section1;