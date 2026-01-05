import { ArrowLeft, ArrowRight, FileCheck, CheckCircle, AlertCircle, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule1Section5QuizData } from '@/data/upskilling/bmsModule1Section5QuizData';

const BMSModule1Section5 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 sm:pb-12">
        <Link to="../bms-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-6 sm:space-y-8">
          {/* Title and Badges */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <FileCheck className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Overview of Relevant Standards
                </h1>
                 <p className="text-base sm:text-lg lg:text-xl text-white mt-1">
                   ISO 16484, EN 15232, and Industry Compliance
                 </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black font-medium px-3 py-1">
                Module 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 px-3 py-1">
                Section 5
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-white text-lg sm:text-xl flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3 sm:space-y-4 text-sm sm:text-base">
              <p>
                Building Management Systems (BMS) are not just about technology — they must also meet international 
                standards to ensure safety, compatibility, and energy efficiency. Two of the most important standards 
                are <strong className="text-yellow-400">ISO 16484</strong>, which defines BMS design and operation 
                principles, and <strong className="text-yellow-400">EN 15232</strong>, which focuses on energy performance.
              </p>
              <p>
                For electricians, understanding these standards is vital for compliance, client confidence, and 
                delivering professional work that meets industry best practices.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-white text-lg sm:text-xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-white mb-4 text-sm sm:text-base">
                 By the end of this section, you should be able to:
               </p>
               <ul className="space-y-2 sm:space-y-3 text-white text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Identify the purpose of ISO 16484 and EN 15232
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Explain how these standards impact BMS design and operation
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Recognise the compliance responsibilities of electricians
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Understand how standards help achieve energy efficiency and safety
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* ISO 16484 Section */}
          <Card className="bg-card border-transparent">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-white text-lg sm:text-xl">
                1. ISO 16484 – Building Automation and Control Systems
              </CardTitle>
            </CardHeader>
             <CardContent className="space-y-4 sm:space-y-6">
               <div className="text-white space-y-3 sm:space-y-4 text-sm sm:text-base">
                <p>
                  <strong className="text-yellow-400">ISO 16484</strong> is the comprehensive international standard that provides 
                  detailed guidance for Building Automation and Control Systems (BACS). Published by the International Organisation 
                  for Standardisation, this multi-part standard establishes the technical framework for professional BMS design, 
                  installation, and operation across all building types.
                </p>
                
                <div className="bg-yellow-400/10 border border-yellow-400/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Key Standard Components</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• <strong>Part 1:</strong> Project specification and implementation</li>
                    <li>• <strong>Part 2:</strong> Hardware requirements and installation</li>
                    <li>• <strong>Part 3:</strong> Control functionality and applications</li>
                    <li>• <strong>Part 4:</strong> Communication protocols (BACnet, LON, etc.)</li>
                    <li>• <strong>Part 5:</strong> Data communication and management</li>
                    <li>• <strong>Part 6:</strong> Data exchange with other building services</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-black/30 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">System Architecture</h4>
                     <p className="text-sm text-white">
                       Defines proper system structure, component integration, and communication protocols
                     </p>
                   </div>
                   <div className="bg-black/30 p-3 sm:p-4 rounded-lg">
                     <h4 className="font-semibold text-white mb-2">Data Exchange</h4>
                     <p className="text-sm text-white">
                       Establishes standards for data communication between different system components
                     </p>
                   </div>
                   <div className="bg-black/30 p-3 sm:p-4 rounded-lg">
                     <h4 className="font-semibold text-white mb-2">Interoperability</h4>
                     <p className="text-sm text-white">
                       Ensures compatibility between different manufacturers' systems and components
                     </p>
                   </div>
                   <div className="bg-black/30 p-3 sm:p-4 rounded-lg">
                     <h4 className="font-semibold text-white mb-2">Quality Consistency</h4>
                     <p className="text-sm text-white">
                      Creates consistency in performance standards and operational quality
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/30 p-4 rounded-lg">
                <h4 className="font-medium text-blue-300 mb-3 text-sm sm:text-base">Quick Check</h4>
                <div className="space-y-3">
                  <p className="text-blue-200 text-sm font-medium">
                    What does ISO 16484 ensure between different manufacturers' BMS systems?
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <button className="text-left p-2 bg-blue-800/30 hover:bg-blue-800/50 rounded text-sm text-blue-200 transition-colors">
                      A) Cost reduction and faster installation
                    </button>
                    <button className="text-left p-2 bg-blue-800/30 hover:bg-blue-800/50 rounded text-sm text-blue-200 transition-colors">
                      B) Interoperability and compatibility
                    </button>
                    <button className="text-left p-2 bg-blue-800/30 hover:bg-blue-800/50 rounded text-sm text-blue-200 transition-colors">
                      C) Energy efficiency improvements
                    </button>
                    <button className="text-left p-2 bg-blue-800/30 hover:bg-blue-800/50 rounded text-sm text-blue-200 transition-colors">
                      D) Reduced maintenance requirements
                    </button>
                  </div>
                  <p className="text-xs text-blue-300 italic">Answer: B) Interoperability ensures different manufacturers' systems can work together seamlessly.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EN 15232 Section */}
          <Card className="bg-card border-transparent">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-white text-lg sm:text-xl">
                2. EN 15232 – Energy Performance of Buildings
              </CardTitle>
            </CardHeader>
             <CardContent className="space-y-4 sm:space-y-6">
               <div className="text-white space-y-3 sm:space-y-4 text-sm sm:text-base">
                <p>
                  <strong className="text-yellow-400">EN 15232</strong> is the European standard that specifically addresses 
                  the impact of building automation, control, and building management systems on energy performance. 
                  This standard provides both calculation methods and classification systems to quantify energy savings 
                  achieved through intelligent building controls.
                </p>
                
                <div className="bg-green-900/20 border border-green-700/30 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-green-300 mb-3">Energy Efficiency Factors</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-white mb-2">HVAC Control Factors</h5>
                      <ul className="text-sm text-green-200 space-y-1">
                        <li>• Zone temperature control accuracy</li>
                        <li>• Occupancy-based scheduling</li>
                        <li>• Demand-controlled ventilation</li>
                        <li>• Heat recovery optimisation</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-2">Lighting Control Factors</h5>
                      <ul className="text-sm text-green-200 space-y-1">
                        <li>• Daylight harvesting systems</li>
                        <li>• Occupancy detection control</li>
                        <li>• Time-based scheduling</li>
                        <li>• Dimming and load reduction</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-900/20 border border-green-700/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Energy Classification System</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                     <div className="text-center p-2 bg-green-800/30 rounded">
                       <div className="font-bold text-green-300 text-lg">A</div>
                       <div className="text-xs text-white">High Performance</div>
                     </div>
                     <div className="text-center p-2 bg-yellow-800/30 rounded">
                       <div className="font-bold text-yellow-300 text-lg">B</div>
                       <div className="text-xs text-white">Advanced</div>
                     </div>
                     <div className="text-center p-2 bg-orange-800/30 rounded">
                       <div className="font-bold text-orange-300 text-lg">C</div>
                       <div className="text-xs text-white">Standard</div>
                     </div>
                     <div className="text-center p-2 bg-red-800/30 rounded">
                       <div className="font-bold text-red-300 text-lg">D</div>
                       <div className="text-xs text-white">Non-Automated</div>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    Defines energy classes (A to D), showing efficiency levels achieved with automation
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    Helps clients calculate savings and justify investment in BMS technology
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    Encourages automation for lighting, HVAC, and shading systems to reduce waste
                  </li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-700/30 p-4 rounded-lg">
                <h4 className="font-medium text-green-300 mb-3 text-sm sm:text-base">Quick Check</h4>
                <div className="space-y-3">
                  <p className="text-green-200 text-sm font-medium">
                    What does EN 15232 measure in relation to BMS?
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <button className="text-left p-2 bg-green-800/30 hover:bg-green-800/50 rounded text-sm text-green-200 transition-colors">
                      A) Installation time and labour costs
                    </button>
                    <button className="text-left p-2 bg-green-800/30 hover:bg-green-800/50 rounded text-sm text-green-200 transition-colors">
                      B) Energy performance and efficiency classification
                    </button>
                    <button className="text-left p-2 bg-green-800/30 hover:bg-green-800/50 rounded text-sm text-green-200 transition-colors">
                      C) System reliability and uptime
                    </button>
                    <button className="text-left p-2 bg-green-800/30 hover:bg-green-800/50 rounded text-sm text-green-200 transition-colors">
                      D) User satisfaction and comfort levels
                    </button>
                  </div>
                  <p className="text-xs text-green-300 italic">Answer: B) EN 15232 measures and classifies building energy performance through automation systems.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Standards Matter */}
          <Card className="bg-card border-transparent">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-white text-lg sm:text-xl">
                3. Why Standards Matter for Electricians
              </CardTitle>
            </CardHeader>
             <CardContent className="space-y-4 sm:space-y-6">
               <div className="text-white space-y-3 sm:space-y-4 text-sm sm:text-base">
                <p>
                  Understanding and applying BMS standards is crucial for professional electricians working in modern 
                  building automation environments. Standards compliance is increasingly becoming a contractual requirement, 
                  and clients expect electrical contractors to demonstrate knowledge of relevant industry standards.
                </p>
                
                <div className="bg-yellow-900/20 border border-yellow-700/30 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-yellow-300 mb-3">Legal and Contractual Requirements</h4>
                  <div className="space-y-3 text-sm text-white">
                    <div>
                      <h5 className="font-medium text-yellow-200 mb-1">Public Sector Projects</h5>
                      <p>Government and NHS projects typically mandate ISO 16484 and EN 15232 compliance as standard procurement requirements.</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-yellow-200 mb-1">Commercial Developments</h5>
                      <p>BREEAM and other sustainability certifications often require demonstrable compliance with energy efficiency standards.</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-yellow-200 mb-1">Insurance and Warranties</h5>
                      <p>Professional indemnity insurance may require compliance with recognised industry standards for full coverage.</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Professional Benefits
                    </h4>
                     <ul className="space-y-2 text-sm text-white">
                      <li>• Enhanced credibility and professional reputation</li>
                      <li>• Compliance with contract requirements</li>
                      <li>• Future-proof installation practices</li>
                      <li>• Competitive advantage in the marketplace</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      Risk Mitigation
                    </h4>
                     <ul className="space-y-2 text-sm text-white">
                      <li>• Avoid legal and financial penalties</li>
                      <li>• Prevent safety hazards and liability issues</li>
                      <li>• Ensure insurance compliance</li>
                      <li>• Protect against system failures</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/20 border border-orange-700/30 p-4 rounded-lg">
                <h4 className="font-medium text-orange-300 mb-3 text-sm sm:text-base">Quick Check</h4>
                <div className="space-y-3">
                  <p className="text-orange-200 text-sm font-medium">
                    Why is compliance with BMS standards important for electricians?
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <button className="text-left p-2 bg-orange-800/30 hover:bg-orange-800/50 rounded text-sm text-orange-200 transition-colors">
                      A) To increase project costs and complexity
                    </button>
                    <button className="text-left p-2 bg-orange-800/30 hover:bg-orange-800/50 rounded text-sm text-orange-200 transition-colors">
                      B) To ensure legal protection, professional credibility, and client confidence
                    </button>
                    <button className="text-left p-2 bg-orange-800/30 hover:bg-orange-800/50 rounded text-sm text-orange-200 transition-colors">
                      C) To limit competition from other electricians
                    </button>
                    <button className="text-left p-2 bg-orange-800/30 hover:bg-orange-800/50 rounded text-sm text-orange-200 transition-colors">
                      D) To reduce the need for ongoing training
                    </button>
                  </div>
                  <p className="text-xs text-orange-300 italic">Answer: B) Standards compliance provides legal protection, builds professional credibility, and ensures client confidence.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applying Standards in Practice */}
          <Card className="bg-card border-transparent">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-white text-lg sm:text-xl">
                4. Applying Standards in Practice
              </CardTitle>
            </CardHeader>
             <CardContent className="space-y-4 sm:space-y-6">
               <div className="text-white space-y-3 sm:space-y-4 text-sm sm:text-base">
                <p>
                  Practical application of ISO 16484 and EN 15232 requires a systematic approach and attention to detail 
                  throughout the entire project lifecycle. Successful standards implementation begins during the design 
                  phase and continues through installation, commissioning, and ongoing maintenance.
                </p>
                
                <div className="bg-card/50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-white mb-3">Pre-Installation Checklist</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-yellow-400 mb-2">Documentation Review</h5>
                      <ul className="text-sm text-white space-y-1">
                        <li>• Contract specifications and compliance requirements</li>
                        <li>• System architecture and device schedules</li>
                        <li>• Communication protocol requirements</li>
                        <li>• Energy efficiency targets and classifications</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-yellow-400 mb-2">Equipment Verification</h5>
                      <ul className="text-sm text-white space-y-1">
                        <li>• Device compliance certificates</li>
                        <li>• Protocol compatibility testing</li>
                        <li>• Energy rating documentation</li>
                        <li>• Installation and configuration manuals</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-black/30 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center text-xs font-bold">1</div>
                      Project Specification Review
                    </h4>
                     <p className="text-sm text-white">
                       Always check whether project specifications require compliance with ISO 16484 or EN 15232 
                       before beginning work. Identify specific requirements and compliance levels needed.
                     </p>
                   </div>

                   <div className="bg-black/30 p-3 sm:p-4 rounded-lg">
                     <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                       <div className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center text-xs font-bold">2</div>
                       Documentation and Recording
                     </h4>
                     <p className="text-sm text-white">
                       Record results and system performance data during commissioning. Maintain detailed 
                       documentation of compliance measures and test results for future reference.
                     </p>
                   </div>

                   <div className="bg-black/30 p-3 sm:p-4 rounded-lg">
                     <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                       <div className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center text-xs font-bold">3</div>
                       Team Collaboration
                     </h4>
                     <p className="text-sm text-white">
                       Work closely with BMS engineers to ensure devices and wiring meet required 
                       classifications. Coordinate with other trades for integrated compliance.
                     </p>
                   </div>

                   <div className="bg-black/30 p-3 sm:p-4 rounded-lg">
                     <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                       <div className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center text-xs font-bold">4</div>
                       Client Communication
                     </h4>
                     <p className="text-sm text-white">
                      Use standards as a selling point to clients, demonstrating how BMS compliance 
                      improves both regulatory compliance and operational efficiency.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/30 p-4 rounded-lg">
                <h4 className="font-medium text-purple-300 mb-3 text-sm sm:text-base">Quick Check</h4>
                <div className="space-y-3">
                  <p className="text-purple-200 text-sm font-medium">
                    How can electricians use standards as a benefit when talking to clients?
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <button className="text-left p-2 bg-purple-800/30 hover:bg-purple-800/50 rounded text-sm text-purple-200 transition-colors">
                      A) To justify higher project costs without explanation
                    </button>
                    <button className="text-left p-2 bg-purple-800/30 hover:bg-purple-800/50 rounded text-sm text-purple-200 transition-colors">
                      B) To demonstrate professionalism, ensure compliance, and quantify energy savings
                    </button>
                    <button className="text-left p-2 bg-purple-800/30 hover:bg-purple-800/50 rounded text-sm text-purple-200 transition-colors">
                      C) To avoid detailed project discussions
                    </button>
                    <button className="text-left p-2 bg-purple-800/30 hover:bg-purple-800/50 rounded text-sm text-purple-200 transition-colors">
                      D) To limit client involvement in technical decisions
                    </button>
                  </div>
                  <p className="text-xs text-purple-300 italic">Answer: B) Standards demonstrate professionalism, ensure regulatory compliance, and help quantify measurable energy savings for clients.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-card border-transparent">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-white text-lg sm:text-xl flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-400" />
                Practical Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white font-medium text-sm sm:text-base">As an electrician:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-green-900/20 border border-green-700/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Knowledge Development</h4>
                  <p className="text-green-200 text-xs sm:text-sm">
                    Familiarise yourself with key parts of ISO 16484 and EN 15232. Stay updated 
                    on latest revisions and industry best practices.
                  </p>
                </div>
                <div className="bg-blue-900/20 border border-blue-700/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-300 mb-2 text-sm sm:text-base">Installation Verification</h4>
                  <p className="text-blue-200 text-xs sm:text-sm">
                    During installation, confirm that devices and systems are rated to meet 
                    compliance requirements. Test and verify performance.
                  </p>
                </div>
                <div className="bg-purple-900/20 border border-purple-700/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">Documentation Management</h4>
                  <p className="text-purple-200 text-xs sm:text-sm">
                    Use certification documentation to back up your work. Maintain comprehensive 
                    records for compliance audits.
                  </p>
                </div>
                <div className="bg-orange-900/20 border border-orange-700/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-300 mb-2 text-sm sm:text-base">Professional Standards</h4>
                  <p className="text-orange-200 text-xs sm:text-sm">
                    Be proactive in raising standards — it demonstrates professionalism 
                    and adds value to your services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-gray-700">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-white text-lg sm:text-xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Real World Example: London Commercial Office
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-white space-y-3 text-sm sm:text-base">
                <p>
                  A commercial office in London upgraded its BMS to comply with EN 15232 standards. 
                  The comprehensive upgrade transformed the building's energy performance significantly.
                </p>
                
                <div className="bg-black/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Implementation Details</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Integrated automated lighting control systems</li>
                    <li>• Implemented intelligent HVAC scheduling</li>
                    <li>• Added automated shading systems</li>
                    <li>• Installed occupancy-based controls</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-red-900/30 p-3 rounded-lg text-center">
                    <div className="text-red-300 font-bold text-xl">Class C</div>
                     <div className="text-xs text-white">Before Upgrade</div>
                   </div>
                   <div className="flex items-center justify-center">
                     <ArrowRight className="h-6 w-6 text-yellow-400" />
                   </div>
                   <div className="bg-green-900/30 p-3 rounded-lg text-center">
                     <div className="text-green-300 font-bold text-xl">Class A</div>
                     <div className="text-xs text-white">After Upgrade</div>
                  </div>
                </div>

                <div className="bg-green-900/20 border border-green-700/30 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-2">Results Achieved</h4>
                  <ul className="space-y-1 text-green-200 text-sm">
                    <li>• 22% reduction in annual energy bills</li>
                    <li>• Met corporate sustainability targets</li>
                    <li>• Increased property attractiveness to tenants</li>
                    <li>• Improved occupant comfort and productivity</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/10 border-yellow-400/30">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-white text-lg sm:text-xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 sm:space-y-3 text-white text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  ISO 16484 defines BMS design, operation, and interoperability standards
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  EN 15232 measures and improves building energy efficiency through automation
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Standards protect electricians and clients by ensuring safety and compliance
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Applying standards delivers measurable cost savings and professional credibility
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Embedded Quiz */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Knowledge Check</h2>
            <SingleQuestionQuiz 
              questions={bmsModule1Section5QuizData}
              title="Test your understanding of BMS Standards"
            />
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between pt-6 sm:pt-8">
            <Link to="../bms-module-1-section-4" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="border-gray-600 text-white hover:bg-card hover:text-white w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
             <Link to="../bms-module-1-section-6" className="w-full sm:w-auto">
               <Button className="bg-yellow-400 text-black hover:bg-yellow-600 w-full sm:w-auto">
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

export default BMSModule1Section5;