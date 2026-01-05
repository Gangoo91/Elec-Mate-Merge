import { ArrowLeft, ArrowRight, Scale, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { useMemo } from 'react';

const FireAlarmModule7Section2 = () => {
  // Quiz Data
  const questions = useMemo(() => [
    {
      id: 1,
      question: "What is the maximum fine that can be imposed by a Crown Court for serious fire safety offences?",
      options: [
        "£20,000",
        "£50,000", 
        "£100,000",
        "Unlimited"
      ],
      correct: 3,
      explanation: "Crown Court can impose unlimited fines for serious fire safety breaches under the Regulatory Reform (Fire Safety) Order 2005, reflecting the severity of potential consequences."
    },
    {
      id: 2,
      question: "Under Building Regulations Part B, what is the minimum system category required for common areas in flats?",
      options: [
        "Grade D domestic system",
        "L3 system for escape routes",
        "L2 system with full coverage", 
        "P1 property protection system"
      ],
      correct: 1,
      explanation: "Building Regulations Part B typically requires L3 systems in common areas of flats to provide automatic fire detection along escape routes."
    },
    {
      id: 3,
      question: "What is the minimum professional indemnity insurance requirement for fire safety design professionals?",
      options: [
        "£1M",
        "£2M",
        "£5M",
        "£10M"
      ],
      correct: 1,
      explanation: "£2M is the typical minimum professional indemnity insurance requirement, though £6M is preferred for fire safety professionals due to potential liability exposure."
    },
    {
      id: 4,
      question: "Which Act introduced stronger fire safety requirements specifically for high-rise residential buildings?",
      options: [
        "Regulatory Reform (Fire Safety) Order 2005",
        "Fire Safety Act 2021",
        "Building Safety Act 2022",
        "Housing Act 2004"
      ],
      correct: 1,
      explanation: "The Fire Safety Act 2021 specifically strengthened fire safety requirements for high-rise residential buildings, clarifying RRO application to external walls and common areas."
    },
    {
      id: 5,
      question: "What is the statutory minimum consultation period for fire authority input on major planning applications?",
      options: [
        "14 days",
        "21 days",
        "28 days",
        "35 days"
      ],
      correct: 1,
      explanation: "Planning legislation requires a minimum 21-day consultation period for statutory consultees including fire and rescue services on relevant planning applications."
    }
  ], []);

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              <Scale className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Legal Duties and Building Regulations
                </h1>
                <p className="text-xl text-gray-400">
                  Legal requirements and regulatory compliance
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
                  <span className="text-sm">Understand legal duties under fire safety legislation</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Learn Building Regulations requirements for fire alarms</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Identify responsible person obligations</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Understand enforcement and penalties</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-sm">Learn about planning permission requirements</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fire Safety Legislation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Key Fire Safety Legislation Framework</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                  <h4 className="text-red-400 font-semibold mb-2">Regulatory Reform (Fire Safety) Order 2005 (RRO)</h4>
                  <p className="text-sm mb-2">Primary legislation covering fire safety in non-domestic premises across England and Wales</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Applies to workplaces, commercial and public buildings</li>
                      <li>Requires comprehensive fire risk assessments</li>
                      <li>Mandates appropriate fire precautions and systems</li>
                      <li>Places legal duties on responsible persons</li>
                      <li>Enables enforcement action and prosecution</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Covers means of escape and fire detection</li>
                      <li>Requires emergency procedures and training</li>
                      <li>Mandates maintenance of fire safety measures</li>
                      <li>Includes consultation with employees</li>
                      <li>Requires cooperation between duty holders</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Fire Safety Act 2021</h4>
                  <p className="text-sm mb-2">Amendments strengthening fire safety requirements for high-rise residential buildings</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Clarifies RRO application to external walls and common areas</li>
                    <li>Includes flat entrance doors within scope of assessment</li>
                    <li>Strengthens responsible person duties and accountability</li>
                    <li>Enables stronger enforcement action by fire authorities</li>
                    <li>Requires regular review of fire risk assessments</li>
                    <li>Mandates provision of information to residents</li>
                  </ul>
                </div>
                <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Building Safety Act 2022</h4>
                  <p className="text-sm mb-2">Comprehensive reform of building safety regime following Grenfell Tower</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Establishes Building Safety Regulator under HSE</li>
                    <li>Creates new competence requirements for industry</li>
                    <li>Introduces gateway approval process for high-risk buildings</li>
                    <li>Mandates golden thread of building information</li>
                    <li>Establishes resident engagement and complaint procedures</li>
                    <li>Creates new enforcement powers and penalties</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Building Regulations Detailed */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Building Regulations Part B - Comprehensive Coverage</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Building Regulations Part B (Fire Safety) sets mandatory requirements for fire safety provisions 
                in new buildings and material alterations, with specific requirements for fire detection systems.
              </p>
              <div className="space-y-4">
                <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Section B1 - Means of Warning and Escape:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Detection Requirements:</strong> Automatic fire detection in specified areas</li>
                      <li><strong>Alarm Systems:</strong> Manual and automatic fire alarm provisions</li>
                      <li><strong>Domestic Smoke Alarms:</strong> Mains powered with battery backup</li>
                      <li><strong>Protected Routes:</strong> Detection along escape routes</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Sleeping Accommodation:</strong> Enhanced detection requirements</li>
                      <li><strong>High-Risk Areas:</strong> Additional detection provisions</li>
                      <li><strong>Disabled Persons:</strong> Visual and vibrating alarm requirements</li>
                      <li><strong>Large Buildings:</strong> Zoned systems and control panels</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-4">
                  <h4 className="text-purple-400 font-semibold mb-2">Approved Document B Guidance:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>References BS 5839 series for system design</li>
                      <li>Specifies minimum system categories required</li>
                      <li>Details installation and commissioning standards</li>
                      <li>Covers maintenance and testing obligations</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Integration with other fire safety systems</li>
                      <li>Interface requirements with building services</li>
                      <li>Power supply and cable installation standards</li>
                      <li>Documentation and certification requirements</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-amber-600/10 border border-amber-600/20 rounded-md p-4">
                  <h4 className="text-amber-400 font-semibold mb-2">Key Application Areas:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-amber-500/20">
                          <th className="text-left p-2">Building Type</th>
                          <th className="text-left p-2">Detection Requirement</th>
                          <th className="text-left p-2">System Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-amber-500/10">
                          <td className="p-2">Houses</td>
                          <td className="p-2">Smoke alarms each floor</td>
                          <td className="p-2">Grade D minimum</td>
                        </tr>
                        <tr className="border-b border-amber-500/10">
                          <td className="p-2">Flats</td>
                          <td className="p-2">Smoke alarms in flat + common areas</td>
                          <td className="p-2">Grade B/C in flat, L3 common</td>
                        </tr>
                        <tr className="border-b border-amber-500/10">
                          <td className="p-2">Offices &gt;60m height</td>
                          <td className="p-2">Automatic throughout</td>
                          <td className="p-2">L1 system required</td>
                        </tr>
                        <tr>
                          <td className="p-2">Hotels</td>
                          <td className="p-2">Automatic in bedrooms + common</td>
                          <td className="p-2">L1 or L2 system</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Responsible Person Comprehensive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Responsible Person Duties and Obligations</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-amber-600/10 border border-amber-600/20 rounded-md p-4">
                <h4 className="text-amber-400 font-semibold mb-2">Who is the Responsible Person?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm mb-2"><strong>Primary Responsible Persons:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Employer in workplace premises</li>
                      <li>Person in control of premises</li>
                      <li>Owner of premises (if no other control)</li>
                      <li>Landlord in common areas of flats</li>
                      <li>Managing agent where appointed</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm mb-2"><strong>Shared Responsibilities:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Multiple employers in shared premises</li>
                      <li>Landlord and tenant arrangements</li>
                      <li>Management companies and freeholders</li>
                      <li>Contractors and service providers</li>
                      <li>Event organisers and venue operators</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-white font-semibold">Comprehensive Responsibilities:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-600/10 border border-red-600/20 rounded-md p-3">
                    <h5 className="text-red-400 font-medium mb-2">Fire Risk Assessment:</h5>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Conduct suitable and sufficient assessment</li>
                      <li>Review regularly and after significant changes</li>
                      <li>Record findings where 5+ employees</li>
                      <li>Implement identified fire precautions</li>
                      <li>Monitor effectiveness of measures</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-3">
                    <h5 className="text-yellow-400 font-medium mb-2">Fire Safety Management:</h5>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Establish emergency procedures</li>
                      <li>Provide information and training</li>
                      <li>Maintain fire safety equipment</li>
                      <li>Ensure means of escape are available</li>
                      <li>Coordinate with other responsible persons</li>
                    </ul>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-md p-3">
                    <h5 className="text-green-400 font-medium mb-2">System Maintenance:</h5>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Ensure fire detection systems maintained</li>
                      <li>Keep records of testing and maintenance</li>
                      <li>Arrange prompt repair of defects</li>
                      <li>Ensure competent persons undertake work</li>
                      <li>Provide access for maintenance activities</li>
                    </ul>
                  </div>
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-3">
                    <h5 className="text-purple-400 font-medium mb-2">Compliance Monitoring:</h5>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Cooperate with enforcing authorities</li>
                      <li>Provide information when requested</li>
                      <li>Ensure staff competence and training</li>
                      <li>Monitor contractor performance</li>
                      <li>Review and update procedures regularly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Domestic Requirements Expanded */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Domestic Premises Requirements - Comprehensive Guide</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">New Build Requirements (Building Regulations):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Smoke alarm on every storey used as living accommodation</li>
                      <li>Mains powered with integral standby battery</li>
                      <li>Interlinked throughout property (hard-wired or radio)</li>
                      <li>Heat detector in kitchen areas (recommended practice)</li>
                      <li>Carbon monoxide alarm with solid fuel appliances</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Alarm audibility throughout property when all doors closed</li>
                      <li>Positioned away from cooking areas to reduce false alarms</li>
                      <li>Annual testing and battery replacement programme</li>
                      <li>User manual and maintenance instructions provided</li>
                      <li>Building control notification and inspection</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Rental Property Obligations (Housing Act 2004):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Landlord must ensure smoke alarms installed and working</li>
                      <li>Test alarms on first day of each new tenancy</li>
                      <li>Carbon monoxide alarm required with solid fuel appliances</li>
                      <li>Penalties up to £5,000 for non-compliance</li>
                      <li>Local authority enforcement and improvement notices</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Electrical safety checks every 5 years maximum</li>
                      <li>Gas safety checks annually by Gas Safe engineer</li>
                      <li>Energy Performance Certificate requirement</li>
                      <li>Minimum energy efficiency standards (MEES)</li>
                      <li>HMO licensing where applicable</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-md p-4">
                  <h4 className="text-purple-400 font-semibold mb-2">Houses in Multiple Occupation (HMO):</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Enhanced fire detection requirements beyond standard domestic</li>
                    <li>Grade A or B systems typically required in common areas</li>
                    <li>Individual room detection may be required based on risk</li>
                    <li>Emergency lighting in escape routes</li>
                    <li>Fire doors and compartmentation requirements</li>
                    <li>Annual fire risk assessment and regular reviews</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enforcement and Penalties Comprehensive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Enforcement Actions and Legal Penalties</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                  <h4 className="text-red-400 font-semibold mb-2">Fire and Rescue Service Powers:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">Inspection Powers:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Right of entry with warrant for inspection</li>
                        <li>Power to require information and documents</li>
                        <li>Authority to take samples and photographs</li>
                        <li>Ability to seize and detain articles</li>
                        <li>Right to require persons to provide assistance</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Enforcement Tools:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Informal notices and improvement advice</li>
                        <li>Enforcement notices for specific contraventions</li>
                        <li>Prohibition notices for imminent risk</li>
                        <li>Prosecution in magistrates' or crown court</li>
                        <li>Emergency closure powers for serious risk</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-md p-4">
                  <h4 className="text-orange-400 font-semibold mb-2">Criminal Penalties and Sanctions:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">Magistrates' Court:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Fine up to £20,000 per offence</li>
                        <li>Up to 6 months imprisonment</li>
                        <li>Disqualification from company directorship</li>
                        <li>Costs orders against defendants</li>
                        <li>Compensation orders for victims</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Crown Court:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Unlimited fines</li>
                        <li>Up to 2 years imprisonment</li>
                        <li>Company director disqualification</li>
                        <li>Confiscation of assets</li>
                        <li>Remedial orders</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Additional Consequences:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Insurance policy invalidation</li>
                        <li>Civil liability for damages</li>
                        <li>Professional qualification sanctions</li>
                        <li>Reputational damage</li>
                        <li>Business closure orders</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Recent Prosecutions and Case Studies:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">Notable Fire Safety Prosecutions:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>£6M fine for major hotel chain (2019)</li>
                        <li>£2.8M penalty for hospital trust (2020)</li>
                        <li>£1.5M fine for university accommodation (2021)</li>
                        <li>Multiple director imprisonments for care home failures</li>
                        <li>Company liquidation following prosecution costs</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Common Failure Areas:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Inadequate fire risk assessments</li>
                        <li>Failed or disabled fire detection systems</li>
                        <li>Blocked escape routes and fire doors</li>
                        <li>Lack of staff training and procedures</li>
                        <li>Poor maintenance of fire safety equipment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Planning and Consent Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Planning Consent and Change of Use Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-indigo-600/10 border border-indigo-600/20 rounded-md p-4">
                  <h4 className="text-indigo-400 font-semibold mb-2">Planning Permission Triggers:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Material change of use requiring planning consent</li>
                      <li>Intensification of use within same use class</li>
                      <li>Mixed use developments and subdivisions</li>
                      <li>Extensions exceeding permitted development rights</li>
                      <li>Listed building consent for heritage properties</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Advertisement consent for signage and wayfinding</li>
                      <li>Conservation area consent requirements</li>
                      <li>Permitted development prior approval</li>
                      <li>Article 4 direction restrictions</li>
                      <li>Tree preservation order considerations</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-md p-4">
                  <h4 className="text-cyan-400 font-semibold mb-2">Fire Safety Planning Conditions:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">Pre-Commencement Conditions:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Fire strategy submission and approval</li>
                        <li>Detailed fire safety design drawings</li>
                        <li>Sprinkler system design (where required)</li>
                        <li>Emergency vehicle access arrangements</li>
                        <li>Water supply and fire-fighting facilities</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Pre-Occupation Conditions:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Fire detection system commissioning certificates</li>
                        <li>Emergency lighting test certificates</li>
                        <li>Fire door installation certificates</li>
                        <li>Staff training programme completion</li>
                        <li>Emergency evacuation procedure approval</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-teal-600/10 border border-teal-600/20 rounded-md p-4">
                  <h4 className="text-teal-400 font-semibold mb-2">Building Control and Fire Authority Consultation:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">Statutory Consultees:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Building Control Body (Local Authority or Approved Inspector)</li>
                        <li>Fire and Rescue Service (automatic consultation)</li>
                        <li>Health and Safety Executive (major hazard sites)</li>
                        <li>Environment Agency (waste and chemical processes)</li>
                        <li>Highways Authority (access and traffic generation)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Consultation Requirements:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>21-day minimum consultation period</li>
                        <li>Technical submissions required</li>
                        <li>Access for emergency vehicles assessment</li>
                        <li>Water supply adequacy evaluation</li>
                        <li>Risk assessment methodology review</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Competence and Insurance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Professional Competence and Insurance Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-violet-600/10 border border-violet-600/20 rounded-md p-4">
                  <h4 className="text-violet-400 font-semibold mb-2">Industry Accreditation Schemes:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">FIA (Fire Industry Association):</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Third-party certification for fire alarm companies</li>
                        <li>Annual assessment and surveillance audits</li>
                        <li>Technical competence and quality system requirements</li>
                        <li>Insurance and financial stability verification</li>
                        <li>Continuing professional development obligations</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">BAFE (British Approvals for Fire Equipment):</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Independent third-party certification scheme</li>
                        <li>Modular approach covering design, installation, commissioning</li>
                        <li>Regular assessment and surveillance visits</li>
                        <li>UKAS accreditation providing international recognition</li>
                        <li>Specialist schemes for different fire protection systems</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-600/10 border border-emerald-600/20 rounded-md p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Professional Qualifications and Competence:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">Design Personnel:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Degree in fire engineering or related discipline</li>
                        <li>Chartered Engineer status (IFE, IMechE, IET)</li>
                        <li>Professional certification scheme membership</li>
                        <li>Continuing professional development records</li>
                        <li>Professional indemnity insurance (minimum £2M)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Installation Personnel:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>City & Guilds Level 3 qualification minimum</li>
                        <li>Manufacturer-specific product training</li>
                        <li>Health and safety competence (CSCS card)</li>
                        <li>Working at height certification</li>
                        <li>First aid and emergency response training</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Commissioning Personnel:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Higher level technical qualification</li>
                        <li>Commissioning engineer certification</li>
                        <li>Test equipment calibration knowledge</li>
                        <li>Documentation and certification competence</li>
                        <li>System integration and programming skills</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-rose-600/10 border border-rose-600/20 rounded-md p-4">
                  <h4 className="text-rose-400 font-semibold mb-2">Insurance and Liability Requirements:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">Essential Insurance Covers:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Professional indemnity: £2M minimum (£6M preferred)</li>
                        <li>Public liability: £2M minimum for site work</li>
                        <li>Employers' liability: £10M statutory minimum</li>
                        <li>Product liability: Cover for equipment supplied</li>
                        <li>Cyber liability: Data protection and business interruption</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Liability Considerations:</h5>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Joint and several liability with other parties</li>
                        <li>Limitation periods and discovery rules</li>
                        <li>Defective Premises Act 1972 implications</li>
                        <li>Corporate manslaughter liability exposure</li>
                        <li>Director and officer personal liability</li>
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
            title="Test Your Knowledge: Legal Duties & Building Regulations" 
          />

          <div className="flex justify-between">
            <Link to="../fire-alarm-module-7-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../fire-alarm-module-7-section-3">
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

export default FireAlarmModule7Section2;