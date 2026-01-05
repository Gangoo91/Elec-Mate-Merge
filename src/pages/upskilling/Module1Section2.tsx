
import { ArrowLeft, Scale, FileText, Shield, AlertTriangle, BookOpen, Users, Gavel, CheckCircle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InspectionTestingQuiz from '@/components/upskilling/InspectionTestingQuiz';

const Module1Section2 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-1">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold">
              Module 1 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Legal & Regulatory Framework
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Understanding the statutory requirements and regulatory framework governing electrical inspection and testing
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Quick Intro */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Scale className="h-5 w-5 text-yellow-400" />
                Quick Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Electrical inspection and testing isn't just good practice—it's a legal requirement. Understanding the regulatory framework ensures compliance and helps protect both people and property.
              </p>
              <p>
                This section covers the key legislation, regulations, and standards that govern electrical safety in the UK, providing the legal foundation for all inspection and testing activities.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4">By the end of this section, you will:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand the key legislation governing electrical safety in the UK</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Know the requirements of Building Regulations Part P</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify the role of BS 7671 in electrical installations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Recognise legal duties and responsibilities for electrical safety</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Apply regulatory requirements in practical situations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                Primary Legislation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Electricity at Work Regulations 1989</h3>
                
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-2">Overview</h4>
                    <p className="text-sm text-white mb-3">
                      The Electricity at Work Regulations 1989 (EAWR) are the primary legislation governing electrical safety in the workplace. They place absolute duties on employers and employees to ensure electrical safety.
                    </p>
                    <h5 className="font-semibold text-yellow-400 mb-2">Key Requirements:</h5>
                    <ul className="text-sm text-white space-y-1 ml-4">
                      <li>• Electrical systems must be constructed to prevent danger (Regulation 4)</li>
                      <li>• Systems must be maintained to prevent danger (Regulation 4)</li>
                      <li>• Work on electrical systems must be carried out safely (Regulation 14)</li>
                      <li>• Adequate precautions must be taken to prevent danger (Regulation 4)</li>
                      <li>• Only competent persons should work on electrical systems (Regulation 16)</li>
                    </ul>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-2">Regulation 4 - Systems, Work Activities and Protective Equipment</h4>
                    <p className="text-sm text-white mb-2">
                      This is the cornerstone regulation that requires:
                    </p>
                    <ul className="text-sm text-white space-y-1 ml-4">
                      <li>• All electrical systems to be constructed, maintained and worked upon to prevent danger</li>
                      <li>• Use of protective equipment that is suitable and properly maintained</li>
                      <li>• Regular inspection and testing to ensure continued safety</li>
                    </ul>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-2">Regulation 16 - Persons to be Competent</h4>
                    <p className="text-sm text-white mb-2">
                      No person shall be engaged in work which requires technical knowledge or experience unless they:
                    </p>
                    <ul className="text-sm text-white space-y-1 ml-4">
                      <li>• Possess sufficient technical knowledge and experience</li>
                      <li>• Are under appropriate supervision</li>
                      <li>• Have been adequately trained</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Health and Safety at Work Act 1974</h3>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Framework Legislation</h4>
                  <p className="text-sm text-white mb-2">
                    Provides the overarching framework for workplace safety. Key sections include:
                  </p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>• Section 2: General duties of employers to employees</li>
                    <li>• Section 3: General duties of employers to persons other than employees</li>
                    <li>• Section 7: General duties of employees at work</li>
                    <li>• Section 8: Duty not to interfere with or misuse safety provisions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Building Regulations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gavel className="h-5 w-5 text-yellow-400" />
                Building Regulations Part P
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">Electrical Safety in Dwellings</h4>
                <p className="text-sm text-white mb-2">
                  Part P covers electrical safety in dwellings, requiring that electrical installations are:
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>• Designed and installed safely</li>
                  <li>• Inspected and tested appropriately</li>
                  <li>• Certified by competent persons</li>
                  <li>• Notified to Building Control where required</li>
                </ul>
              </div>

              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">Notifiable Work</h4>
                <p className="text-sm text-white mb-2">
                  Certain electrical work must be notified to Building Control:
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>• New circuits (except minor additions)</li>
                  <li>• Consumer unit replacements</li>
                  <li>• Work in special locations (bathrooms, swimming pools)</li>
                  <li>• Outdoor power installations</li>
                </ul>
              </div>

              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">Competent Person Schemes</h4>
                <p className="text-sm text-white mb-2">
                  Registered electricians can self-certify work through approved schemes:
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>• NICEIC</li>
                  <li>• NAPIT</li>
                  <li>• Stroma Certification</li>
                  <li>• BSI (British Standards Institution)</li>
                  <li>• Benchmark Certification</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Standards and Codes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                Standards and Codes of Practice
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">BS 7671 (IET Wiring Regulations)</h4>
                <p className="text-sm text-white mb-3">
                  The national standard for electrical installations in the UK. Current edition is the 18th Edition (2018) with Amendment 2 (2022).
                </p>
                
                <h5 className="font-semibold text-yellow-400 mb-2">Structure of BS 7671:</h5>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>• Part 1: Scope, object and fundamental principles</li>
                  <li>• Part 2: Definitions</li>
                  <li>• Part 3: Assessment of general characteristics</li>
                  <li>• Part 4: Protection for safety</li>
                  <li>• Part 5: Selection and erection of equipment</li>
                  <li>• Part 6: Inspection and testing</li>
                  <li>• Part 7: Special installations or locations</li>
                </ul>
                
                <p className="text-sm text-white mt-3">
                  <strong>Legal Status:</strong> Whilst not legally binding, compliance with BS 7671 demonstrates due diligence and is recognised by courts as good practice.
                </p>
              </div>

              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">Supporting Standards</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-white text-sm">BS 7909: Code of Practice for Temporary Electrical Systems</h5>
                    <p className="text-xs text-white">Covers temporary installations for events, construction sites, and similar applications.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm">BS 6626: Code of Practice for Maintenance of Electrical Switchgear</h5>
                    <p className="text-xs text-white">Provides guidance on maintenance of high voltage switchgear and control gear.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm">IET Code of Practice for In-Service Inspection and Testing</h5>
                    <p className="text-xs text-white">Guidance on periodic inspection and testing of electrical installations.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Duties and Responsibilities */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-400" />
                Legal Duties and Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Employers' Duties</h4>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>• Ensure electrical systems are safe and properly maintained</li>
                    <li>• Provide adequate training and supervision</li>
                    <li>• Ensure only competent persons work on electrical systems</li>
                    <li>• Provide suitable protective equipment</li>
                    <li>• Conduct risk assessments</li>
                    <li>• Maintain records of inspections and tests</li>
                  </ul>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Employees' Duties</h4>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>• Take reasonable care for their own safety</li>
                    <li>• Take reasonable care for the safety of others</li>
                    <li>• Cooperate with employers on safety matters</li>
                    <li>• Use protective equipment provided</li>
                    <li>• Report dangerous situations</li>
                    <li>• Not interfere with safety provisions</li>
                  </ul>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Competent Persons</h4>
                  <p className="text-sm text-white mb-2">
                    Competency is determined by a combination of:
                  </p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>• <strong>Knowledge:</strong> Understanding of electrical principles and safety</li>
                    <li>• <strong>Training:</strong> Formal qualifications and ongoing development</li>
                    <li>• <strong>Experience:</strong> Practical experience in relevant work</li>
                    <li>• <strong>Supervision:</strong> Appropriate oversight where needed</li>
                  </ul>
                  <p className="text-sm text-white mt-2">
                    <strong>Note:</strong> Competency is situation-specific and must be demonstrated for each type of work.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enforcement and Penalties */}
          <Card className="bg-red-900/20 border-red-800/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Enforcement and Penalties
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              
              <div className="bg-red-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-red-400 mb-2">Health and Safety Executive (HSE)</h4>
                 <p className="text-sm text-white mb-2">
                  The HSE enforces electrical safety regulations and has powers to:
                </p>
                 <ul className="text-sm text-white space-y-1 ml-4">
                  <li>• Issue improvement notices</li>
                  <li>• Issue prohibition notices</li>
                  <li>• Prosecute for breaches of regulations</li>
                  <li>• Investigate accidents and incidents</li>
                </ul>
              </div>

              <div className="bg-red-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-red-400 mb-2">Penalties for Non-Compliance</h4>
                 <ul className="text-sm text-white space-y-1 ml-4">
                  <li>• <strong>Magistrates' Court:</strong> Up to £20,000 fine and/or 6 months imprisonment</li>
                  <li>• <strong>Crown Court:</strong> Unlimited fine and/or up to 2 years imprisonment</li>
                  <li>• <strong>Corporate Manslaughter:</strong> Unlimited fine for organisations</li>
                  <li>• <strong>Civil Liability:</strong> Compensation claims for injuries or damage</li>
                </ul>
              </div>

              <div className="bg-red-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-red-400 mb-2">Building Control Enforcement</h4>
                <p className="text-sm text-white mb-2">
                  Local Authority Building Control can:
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>• Require work to be opened up for inspection</li>
                  <li>• Require work to be removed or altered</li>
                  <li>• Take prosecution action for non-compliance</li>
                  <li>• Issue completion certificates</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Practical Application */}
          <Card className="bg-blue-900/20 border-blue-800/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                Practical Application
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              
              <div className="bg-blue-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">Documentation Requirements</h4>
                 <p className="text-sm text-white mb-2">
                  Legal compliance requires proper documentation:
                </p>
                 <ul className="text-sm text-white space-y-1 ml-4">
                  <li>• Electrical Installation Certificates (EIC)</li>
                  <li>• Electrical Installation Condition Reports (EICR)</li>
                  <li>• Minor Electrical Installation Works Certificates (MEIWC)</li>
                  <li>• Periodic Inspection and Test Records</li>
                  <li>• Risk Assessments</li>
                  <li>• Method Statements</li>
                </ul>
              </div>

              <div className="bg-blue-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">Insurance Implications</h4>
                 <p className="text-sm text-white mb-2">
                  Non-compliance can affect insurance coverage:
                </p>
                 <ul className="text-sm text-white space-y-1 ml-4">
                  <li>• Claims may be refused for non-compliant installations</li>
                  <li>• Higher premiums for poor safety records</li>
                  <li>• Requirements for regular inspections and certificates</li>
                  <li>• Professional indemnity implications</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* On-the-Job Scenarios */}
          <Card className="bg-[#2a4d3a] border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                On-the-Job Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div className="bg-[#1e3a2a] p-4 rounded-lg">
                <h4 className="font-semibold text-green-400 mb-2">Scenario 1: Maintenance Inspection Discovers Dangerous Defects</h4>
                <p className="text-sm mb-3">
                  During a routine periodic inspection at a small office building, you discover several electrical installations that pose immediate danger: exposed live conductors, missing earthing, and damaged insulation. The building owner asks you to "just note it down" and continue with the inspection, claiming they'll "sort it out later."
                </p>
                
                <h5 className="font-semibold text-green-400 mb-2">Legal Considerations:</h5>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Electricity at Work Regulations require immediate action to prevent danger</li>
                  <li>• You have a legal duty to ensure safety</li>
                  <li>• Building owner has legal responsibilities as a duty holder</li>
                  <li>• Continuing to use dangerous installations would breach regulations</li>
                </ul>
                
                <h5 className="font-semibold text-green-400 mb-2 mt-3">Required Actions:</h5>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Immediately isolate dangerous circuits</li>
                  <li>• Inform building owner of legal requirements</li>
                  <li>• Issue appropriate certification noting defects</li>
                  <li>• Ensure remedial work is completed before re-energising</li>
                </ul>
              </div>

              <div className="bg-[#1e3a2a] p-4 rounded-lg">
                <h4 className="font-semibold text-green-400 mb-2">Scenario 2: Domestic Installation Without Building Control Notification</h4>
                <p className="text-sm mb-3">
                  A homeowner has had a new kitchen installed with additional circuits and wants you to provide an EICR. You discover the work wasn't notified to Building Control and doesn't have proper certification.
                </p>
                
                <h5 className="font-semibold text-green-400 mb-2">Legal Implications:</h5>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Building Regulations Part P requires notification of certain work</li>
                  <li>• Uncertified work may not comply with BS 7671</li>
                  <li>• Building Control may require remedial action</li>
                  <li>• Insurance implications for non-compliant work</li>
                </ul>
                
                <h5 className="font-semibold text-green-400 mb-2 mt-3">Recommended Actions:</h5>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Advise homeowner of Building Regulations requirements</li>
                  <li>• Suggest contacting Building Control for regularisation</li>
                  <li>• Conduct thorough inspection and testing</li>
                  <li>• Issue appropriate certification noting any defects</li>
                </ul>
              </div>

              <div className="bg-[#1e3a2a] p-4 rounded-lg">
                <h4 className="font-semibold text-green-400 mb-2">Scenario 3: Competency Challenge</h4>
                <p className="text-sm mb-3">
                  An employer asks you to inspect a high-voltage installation, but you've only worked on low-voltage systems. The employer states "you're qualified, so you can do it."
                </p>
                
                <h5 className="font-semibold text-green-400 mb-2">Legal Considerations:</h5>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Regulation 16 requires competency for specific work</li>
                  <li>• Competency is situation-specific</li>
                  <li>• Working beyond competency could endanger lives</li>
                  <li>• Personal and employer liability for accidents</li>
                </ul>
                
                <h5 className="font-semibold text-green-400 mb-2 mt-3">Correct Response:</h5>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Decline work outside your competency</li>
                  <li>• Recommend suitably qualified person</li>
                  <li>• Suggest appropriate training if interested</li>
                  <li>• Document the refusal and reasons</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Key Takeaways</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Legal Requirement:</strong> Electrical inspection and testing is mandated by law, not optional</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Multiple Frameworks:</strong> Various regulations and standards work together to ensure electrical safety</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Shared Responsibility:</strong> All duty holders have legal obligations for electrical safety</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Competency Matters:</strong> Only competent persons should carry out electrical work</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Immediate Action:</strong> Dangerous conditions must be addressed immediately</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Documentation:</strong> Proper certification and records are essential for legal compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Consequences:</strong> Non-compliance can result in serious legal and financial penalties</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Quick Knowledge Checks */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Quick Knowledge Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 1: EAWR 1989</h4>
                  <p className="text-sm">Which regulation in EAWR 1989 requires electrical systems to be maintained to prevent danger?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Regulation 4 - Systems, work activities and protective equipment</p>
                  </details>
                </div>
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 2: Building Regulations</h4>
                  <p className="text-sm">What does Building Regulations Part P specifically cover?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Electrical safety in dwellings (residential buildings)</p>
                  </details>
                </div>
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 3: Competent Person Schemes</h4>
                  <p className="text-sm">Name three approved Competent Person Schemes for electrical work.</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">NICEIC, NAPIT, Stroma Certification (also BSI, Benchmark Certification)</p>
                  </details>
                </div>
                <div className="bg-orange-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 4: Legal Status of BS 7671</h4>
                  <p className="text-sm">Is BS 7671 legally binding in the UK?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">No, but compliance demonstrates due diligence and is recognised by courts as good practice</p>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What's the difference between absolute and reasonably practicable duties?</h4>
                  <p className="text-sm text-white">A: Absolute duties (like those in EAWR) must be complied with regardless of cost or difficulty. Reasonably practicable duties (like those in HASWA) allow for a balance between risk and the cost/difficulty of measures to reduce that risk.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Do I need to be registered with a Competent Person Scheme to do electrical work?</h4>
                  <p className="text-sm text-white">A: Not for all work. Registration is required for self-certifying notifiable work under Building Regulations Part P. However, you can still do electrical work if you're competent and have appropriate qualifications, but you'll need to notify Building Control separately for notifiable work.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What work is notifiable under Part P?</h4>
                  <p className="text-sm text-white">A: New circuits (except minor additions), consumer unit replacements, work in special locations (bathrooms, swimming pools), outdoor power installations, and work in dwellings with combustible construction materials.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Who can I report electrical safety concerns to?</h4>
                  <p className="text-sm text-white">A: For workplace concerns: HSE or local authority. For domestic properties: Local Authority Building Control or Trading Standards. For immediate danger: Emergency services and the electricity distribution network operator.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What are the penalties for working beyond my competency?</h4>
                  <p className="text-sm text-white">A: Serious penalties including unlimited fines, imprisonment, professional sanctions, civil liability for damages, and potential corporate manslaughter charges if someone dies as a result.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Q: How do I demonstrate competency to clients or employers?</h4>
                  <p className="text-sm text-white">A: Through relevant qualifications (e.g., City & Guilds 2391), ongoing CPD records, professional registration, insurance cover, work portfolio, and references from previous projects demonstrating experience in similar work.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge - Comprehensive Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-6">
                Complete this comprehensive quiz to test your understanding of the legal and regulatory framework for electrical inspection and testing.
              </p>
              <InspectionTestingQuiz />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Module1Section2;
