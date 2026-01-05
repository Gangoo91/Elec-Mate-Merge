import { ArrowLeft, ArrowRight, Shield, CheckCircle, AlertCircle, FileText, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule8Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What does MCS stand for?",
      options: [
        "Microgeneration Certification Scheme",
        "Manufacturing Compliance Standard",
        "Mechanical Control System",
        "Maintenance Certification Service"
      ],
      correct: 0,
      explanation: "MCS stands for Microgeneration Certification Scheme, which is the UK's quality assurance scheme for small-scale renewable energy technologies and installations."
    },
    {
      id: 2,
      question: "Why must products be MCS certified for domestic installations?",
      options: [
        "To improve product efficiency",
        "To access government incentives and Smart Export Guarantee",
        "To reduce installation costs",
        "To extend warranty periods"
      ],
      correct: 1,
      explanation: "Products must be MCS certified to access government incentives like the Smart Export Guarantee (SEG) and to ensure consumer protection through quality assurance."
    },
    {
      id: 3,
      question: "What's one essential document required for MCS compliance?",
      options: [
        "Building insurance certificate",
        "Installation commissioning certificate",
        "Local authority planning permission",
        "Manufacturer warranty document"
      ],
      correct: 1,
      explanation: "The installation commissioning certificate is essential for MCS compliance, proving the system has been installed and tested according to MCS standards."
    },
    {
      id: 4,
      question: "How does MCS relate to the Smart Export Guarantee (SEG)?",
      options: [
        "MCS installations are optional for SEG",
        "Only MCS certified installations are eligible for SEG payments",
        "MCS and SEG are separate unrelated schemes",
        "SEG has replaced MCS requirements"
      ],
      correct: 1,
      explanation: "Only MCS certified installations are eligible for SEG payments, making MCS certification essential for customers wanting to sell excess energy back to the grid."
    },
    {
      id: 5,
      question: "Who governs the MCS scheme?",
      options: [
        "Department for Business, Energy and Industrial Strategy (BEIS)",
        "Office of Gas and Electricity Markets (Ofgem)",
        "MCS Service Company Ltd",
        "Local Authority Building Control"
      ],
      correct: 2,
      explanation: "The MCS scheme is governed by MCS Service Company Ltd, which operates the certification scheme on behalf of the Department for Energy Security and Net Zero."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              <Award className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  MCS Requirements and Certification Pathways
                </h1>
                <p className="text-xl text-gray-400">
                  Foundation for regulatory compliance in renewable energy installations
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 1
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                The Microgeneration Certification Scheme (MCS) is the foundation for regulatory compliance 
                in renewable energy installations. It provides quality assurance, consumer protection, and 
                access to government incentive schemes across the UK.
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
                <span>Understand the role and importance of MCS certification</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Identify installer and product certification requirements</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Follow the complete process for becoming MCS certified</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Overview of MCS: Purpose and Governance</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">What is MCS?</h4>
                <p className="text-sm mb-3">
                  The Microgeneration Certification Scheme is the UK's quality assurance scheme for small-scale 
                  renewable energy technologies (up to 50kW electrical or 300kW thermal capacity).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Key Functions:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Product performance verification</li>
                      <li>• Installer competency certification</li>
                      <li>• Installation quality assurance</li>
                      <li>• Consumer protection framework</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Governing Body:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• MCS Service Company Ltd</li>
                      <li>• Oversight by DESNZ</li>
                      <li>• Industry stakeholder involvement</li>
                      <li>• Independent certification bodies</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3">MCS Covered Technologies:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Solar PV systems:</strong> Up to 50kW capacity</li>
                    <li><strong>Solar thermal:</strong> Hot water and space heating</li>
                    <li><strong>Heat pumps:</strong> Air source and ground source</li>
                    <li><strong>Biomass boilers:</strong> Up to 300kW thermal</li>
                    <li><strong>Small wind turbines:</strong> Up to 50kW electrical</li>
                    <li><strong>Micro-hydro:</strong> Small-scale hydroelectric systems</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-3">Consumer Benefits:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Quality assurance:</strong> Verified performance and safety</li>
                    <li><strong>Financial incentives:</strong> Access to SEG and grants</li>
                    <li><strong>Insurance cover:</strong> Deposit protection and warranties</li>
                    <li><strong>Complaint resolution:</strong> Independent dispute process</li>
                    <li><strong>Technical support:</strong> Installation guidance and standards</li>
                    <li><strong>Market confidence:</strong> Recognised industry standard</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Installer Certification Process</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>Becoming an MCS certified installer requires meeting strict competency and business standards:</p>
              
              <div className="space-y-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-3">Step-by-Step Certification Process:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium mb-2">Initial Requirements:</h5>
                      <ol className="text-gray-300 space-y-1 list-decimal list-inside">
                        <li>Choose approved certification body</li>
                        <li>Complete application with supporting documents</li>
                        <li>Demonstrate technical competency</li>
                        <li>Provide evidence of relevant qualifications</li>
                        <li>Submit quality management documentation</li>
                        <li>Pay certification fees</li>
                      </ol>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Assessment Process:</h5>
                      <ol className="text-gray-300 space-y-1 list-decimal list-inside">
                        <li>Document review by certification body</li>
                        <li>Technical interview and assessment</li>
                        <li>Witness installation (if required)</li>
                        <li>Office audit of procedures</li>
                        <li>Certification decision</li>
                        <li>Certificate issuance and registration</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Technical Competency Requirements:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="text-white font-medium">Electrical Qualifications:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• 18th Edition Wiring Regulations</li>
                        <li>• Inspection and Testing (2391/2394)</li>
                        <li>• Solar PV specific training</li>
                        <li>• Safe isolation procedures</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Installation Skills:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Roof work and safety training</li>
                        <li>• Mechanical fixing techniques</li>
                        <li>• Commissioning procedures</li>
                        <li>• System design principles</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Business Requirements:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Public liability insurance (£2M min)</li>
                        <li>• Professional indemnity cover</li>
                        <li>• Quality management system</li>
                        <li>• Customer care procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Product Certification and Verification</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Why Product Certification Matters:</h4>
                <p className="text-sm">
                  Only MCS certified products can be used in installations eligible for government 
                  incentives. This ensures performance, safety, and reliability standards are met.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3">Product Testing Requirements:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Performance Testing:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• IEC 61215: Crystalline silicon terrestrial PV modules</li>
                        <li>• IEC 61730: PV module safety qualification</li>
                        <li>• Power output verification at STC</li>
                        <li>• Temperature coefficient measurement</li>
                        <li>• Low irradiance performance testing</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Safety and Durability:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Electrical safety testing (Class II)</li>
                        <li>• Fire resistance classification</li>
                        <li>• Mechanical load testing (wind/snow)</li>
                        <li>• UV exposure and thermal cycling</li>
                        <li>• Potential Induced Degradation (PID) testing</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-3">How to Verify MCS Certification:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Online Verification:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Visit the official MCS database</li>
                        <li>• Search by manufacturer and model</li>
                        <li>• Check certificate validity dates</li>
                        <li>• Verify scope of certification</li>
                        <li>• Download certificate copies</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Documentation Check:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• MCS certificate number on datasheet</li>
                        <li>• Performance ratings and test conditions</li>
                        <li>• Installation and safety instructions</li>
                        <li>• Warranty terms and conditions</li>
                        <li>• Manufacturing quality standards</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Quality Management and Consumer Protection</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-3">Quality Management System Requirements:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Documentation Requirements:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Customer enquiry and quotation procedures</li>
                        <li>• Design and installation methodology</li>
                        <li>• Commissioning and handover protocols</li>
                        <li>• After-sales service procedures</li>
                        <li>• Complaint handling and resolution</li>
                        <li>• Record keeping and data protection</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Ongoing Compliance:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Annual surveillance audits</li>
                        <li>• Customer satisfaction monitoring</li>
                        <li>• Technical competency updates</li>
                        <li>• Insurance renewal verification</li>
                        <li>• Continuing professional development</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-3">Consumer Protection Framework:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Financial Protection:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Deposit protection insurance schemes</li>
                        <li>• Minimum warranty requirements</li>
                        <li>• Insurance-backed guarantees</li>
                        <li>• Workmanship warranties (min 2 years)</li>
                        <li>• Product warranties (min 10 years)</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h5 className="text-white font-medium mb-2">Dispute Resolution:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• MCS complaints procedure</li>
                        <li>• Independent dispute resolution</li>
                        <li>• Ombudsman services access</li>
                        <li>• Compensation schemes</li>
                        <li>• Regulatory enforcement actions</li>
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
                  <strong>Case Study:</strong> A company lost a major contract due to using non-MCS panels 
                  on a domestic install eligible for SEG. The customer couldn't access Smart Export Guarantee 
                  payments, leading to contract termination and reputational damage worth £50,000+ in lost business.
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
                MCS is not optional—it underpins trust, funding, and legal compliance in UK renewables. 
                Understanding MCS requirements ensures access to incentives, protects consumers, and 
                maintains professional standards across the renewable energy industry.
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
              <SingleQuestionQuiz questions={quizQuestions} title="MCS Requirements Quiz" />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../renewable-energy-module-8">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module
              </Button>
            </Link>
            <Link to="../renewable-energy-module-8-section-2">
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

export default RenewableEnergyModule8Section1;