import { ArrowLeft, Eye, BookOpen, Target, CheckCircle2, Settings, Brain, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Module3Section1Quiz from '@/components/upskilling/Module3Section1Quiz';

const Module3Section1 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-3">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="h-8 w-8 text-elec-yellow" />
            <Badge variant="secondary" className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold">
              Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Purpose of Visual Inspection
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Understanding the fundamental objectives and requirements for conducting visual inspections
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-elec-yellow" />
                Introduction to Visual Inspection
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-sm leading-relaxed">
                Visual inspection forms the foundation of all electrical safety testing and is the first step 
                in any electrical inspection process. It's often the most revealing part of an inspection, 
                identifying obvious defects without energising circuits or using test instruments.
              </p>
              <p className="text-sm leading-relaxed">
                A systematic visual inspection can identify up to 80% of electrical defects, making it one of 
                the most cost-effective safety procedures available. Understanding what to look for and how to 
                document findings professionally is essential for all electrical work.
              </p>
              <div className="bg-transparent/80 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Key Fact:</p>
                <p className="text-sm">
                  BS 7671 requires visual inspection to be carried out before any testing is undertaken, 
                  and it must be performed with the installation isolated from the supply.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-elec-yellow" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <p className="text-sm font-medium text-elec-yellow">By the end of this section, you'll be able to:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Understand the legal requirements and standards governing visual inspection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Identify when visual inspection is required and its sequence in the testing process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Recognise the limitations and scope of visual inspection procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Apply systematic approaches to ensure comprehensive coverage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Document findings appropriately and determine appropriate actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Understand the relationship between visual inspection and subsequent testing</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Main Content - Purpose and Legal Requirements */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-elec-yellow" />
                Purpose and Legal Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Primary Purposes of Visual Inspection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">Safety Verification</h4>
                    <p className="text-sm">
                      Identify immediate dangers that could cause electric shock, fire, or injury. 
                      This includes exposed live parts, damaged insulation, and inadequate earthing connections.
                    </p>
                  </div>
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">Compliance Assessment</h4>
                    <p className="text-sm">
                      Verify that installations meet current standards and regulations, identifying 
                      non-compliant work that may require remedial action.
                    </p>
                  </div>
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">Defect Identification</h4>
                    <p className="text-sm">
                      Discover deterioration, damage, or incorrect installation that could affect 
                      the safety or performance of the electrical system.
                    </p>
                  </div>
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">Test Planning</h4>
                    <p className="text-sm">
                      Inform the extent and type of subsequent testing required, ensuring efficient 
                      use of time and resources during the inspection process.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Legal and Regulatory Requirements</h3>
                <p className="text-sm leading-relaxed">
                  Visual inspection is mandated by multiple regulations and standards, making it not just good practice 
                  but a legal requirement in many situations.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">BS 7671 Requirements</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Must be performed before any testing (Section 612)</li>
                      <li>• Installation must be isolated from supply during inspection</li>
                      <li>• All circuits and equipment must be examined</li>
                      <li>• Defects must be rectified before testing proceeds</li>
                      <li>• Findings must be recorded on appropriate certificates</li>
                    </ul>
                  </div>

                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">Electricity at Work Regulations 1989</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Regulation 4: Systems must be maintained to prevent danger</li>
                      <li>• Regulation 16: Work on live systems only in exceptional circumstances</li>
                      <li>• Visual inspection supports compliance with maintenance duties</li>
                      <li>• Helps identify work that requires isolation before testing</li>
                    </ul>
                  </div>

                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">IET Guidance Notes</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• GN3 provides detailed inspection and testing procedures</li>
                      <li>• Specifies minimum requirements for visual examination</li>
                      <li>• Includes inspection checklists and recording methods</li>
                      <li>• Covers both initial verification and periodic inspection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">When Visual Inspection is Required</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">Initial Verification</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• New installations before first energisation</li>
                      <li>• Additions and alterations to existing installations</li>
                      <li>• After any major modification or extension</li>
                      <li>• Following remedial work on existing systems</li>
                    </ul>
                  </div>
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">Periodic Inspection</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• At recommended intervals (typically 5-10 years)</li>
                      <li>• Before change of occupancy or use</li>
                      <li>• After damage (fire, flood, mechanical damage)</li>
                      <li>• Following reports of electrical problems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inspection Process and Methodology */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-elec-yellow" />
                Systematic Inspection Methodology
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Pre-Inspection Preparation</h3>
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Essential Preparation Steps</h4>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow font-medium">1.</span>
                      <span>Obtain and review installation documentation (drawings, previous certificates, manuals)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow font-medium">2.</span>
                      <span>Confirm scope of inspection with client and identify any access limitations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow font-medium">3.</span>
                      <span>Assess safety requirements and prepare appropriate PPE and tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow font-medium">4.</span>
                      <span>Plan isolation procedures and coordinate with building occupants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow font-medium">5.</span>
                      <span>Prepare inspection forms and documentation materials</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Systematic Inspection Sequence</h3>
                <div className="space-y-4">
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">1. Origin of Installation</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Service head and earthing arrangements</li>
                      <li>• Main protective bonding conductors</li>
                      <li>• Consumer unit/distribution board condition</li>
                      <li>• RCD and circuit breaker operation and ratings</li>
                    </ul>
                  </div>

                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">2. Distribution Systems</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Sub-main cables and their protection</li>
                      <li>• Distribution board installations and accessibility</li>
                      <li>• Circuit identification and labelling</li>
                      <li>• Segregation of different voltage systems</li>
                    </ul>
                  </div>

                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">3. Final Circuits</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Cable routes, support, and protection</li>
                      <li>• Accessories and their mounting</li>
                      <li>• Connection integrity and terminations</li>
                      <li>• Environmental suitability and IP ratings</li>
                    </ul>
                  </div>

                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">4. Special Installations</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Bathroom and special location requirements</li>
                      <li>• Swimming pool installations</li>
                      <li>• Agricultural and horticultural premises</li>
                      <li>• Medical locations and emergency systems</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Documentation and Recording</h3>
                <p className="text-sm leading-relaxed">
                  Proper documentation is crucial for legal compliance and provides valuable information for future inspections.
                </p>
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Recording Requirements</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Clear description of defects found</li>
                    <li>• Location and circuit identification</li>
                    <li>• Classification of defects (C1, C2, C3, FI)</li>
                    <li>• Photographic evidence where appropriate</li>
                    <li>• Recommendations for remedial action</li>
                    <li>• Inspector details and competency evidence</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Exercises */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-elec-yellow" />
                Practical Learning Exercises
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-6">
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Exercise 1: Consumer Unit Assessment</h4>
                  <p className="text-sm mb-3">
                    Practice systematic visual inspection of a consumer unit, identifying compliance issues, 
                    labelling adequacy, and potential safety defects.
                  </p>
                  <div className="text-sm text-white">
                    <strong>Focus Areas:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• RCD testing button accessibility</li>
                      <li>• Circuit identification and schedules</li>
                      <li>• Overcurrent device ratings</li>
                      <li>• Cable entry methods and sealing</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Exercise 2: Socket Outlet Survey</h4>
                  <p className="text-sm mb-3">
                    Conduct a comprehensive socket outlet inspection covering different room types, 
                    environmental conditions, and special locations.
                  </p>
                  <div className="text-sm text-white">
                    <strong>Assessment Points:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Mounting security and condition</li>
                      <li>• Appropriate IP ratings for location</li>
                      <li>• RCD protection requirements</li>
                      <li>• Evidence of overheating or damage</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Exercise 3: Cable Installation Review</h4>
                  <p className="text-sm mb-3">
                    Examine cable installation methods, support systems, and protection measures 
                    across different environments and building types.
                  </p>
                  <div className="text-sm text-white">
                    <strong>Key Elements:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Support spacing and methods</li>
                      <li>• Protection against mechanical damage</li>
                      <li>• Segregation from other services</li>
                      <li>• Fire barrier penetrations</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Exercise 4: Earthing System Inspection</h4>
                  <p className="text-sm mb-3">
                    Trace and verify earthing arrangements from origin through to final circuits, 
                    including main and supplementary bonding.
                  </p>
                  <div className="text-sm text-white">
                    <strong>Verification Points:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Earth electrode connections</li>
                      <li>• Main protective bonding conductor sizing</li>
                      <li>• CPC continuity at accessories</li>
                      <li>• Equipotential bonding in special locations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-elec-yellow" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-6">
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: Can I perform visual inspection on a live installation?</h4>
                  <p className="text-sm text-white">
                    A: No. BS 7671 requires the installation to be isolated from the supply during visual inspection. 
                    This ensures safety and allows proper examination of connections and components.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: What should I do if I find a C1 defect during visual inspection?</h4>
                  <p className="text-sm text-white">
                    A: Stop the inspection immediately and make the defect safe. C1 defects present immediate danger 
                    and must be rectified before any further work can proceed.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: How detailed should my visual inspection documentation be?</h4>
                  <p className="text-sm text-white">
                    A: Document all defects clearly with location, description, and classification. Include photographs 
                    where helpful and ensure someone else could understand and locate the issues from your records.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: Should I open all electrical accessories during inspection?</h4>
                  <p className="text-sm text-white">
                    A: Only open accessories where necessary for proper inspection and where you have permission. 
                    Some sealed units should not be opened, and some areas may require specialist access.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: What if the client restricts access to certain areas?</h4>
                  <p className="text-sm text-white">
                    A: Document any limitations clearly on your certificate. Note which areas couldn't be inspected 
                    and recommend future inspection when access becomes available.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: How long should a visual inspection take?</h4>
                  <p className="text-sm text-white">
                    A: Time varies with installation size and complexity. Allow adequate time for thorough inspection - 
                    rushing leads to missed defects. Factor in travel time between areas and documentation.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: Can visual inspection identify all electrical defects?</h4>
                  <p className="text-sm text-white">
                    A: No. Visual inspection identifies obvious defects but testing is required to detect insulation 
                    breakdown, earth fault loop impedance issues, and RCD performance problems.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-transparent border-l-4 border-l-elec-yellow">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-elec-yellow" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-transparent p-4 rounded-md">
                <h4 className="text-elec-yellow font-medium mb-2">Scenario:</h4>
                <p className="text-sm">
                  You're conducting a periodic inspection of a 20-year-old office building. During visual inspection 
                  of the main distribution board, you notice several circuits have had their labels removed or 
                  painted over. Some circuit breakers appear to be different brands and ratings than others, 
                  and you can see some copper conductors have turned green at termination points.
                </p>
              </div>
              <div className="bg-transparent p-4 rounded-md">
                <h4 className="text-green-400 font-medium mb-2">Professional Response:</h4>
                <ol className="space-y-2 text-sm">
                  <li>1. Document the poor labelling as a C3 defect (improvement recommended)</li>
                  <li>2. Investigate mixed circuit breaker types - this could indicate unauthorised work</li>
                  <li>3. The green copper suggests overheating - classify as C2 requiring urgent attention</li>
                  <li>4. Take photographs to support your findings</li>
                  <li>5. Recommend immediate electrical contractor involvement for the overheating issue</li>
                  <li>6. Plan additional testing to verify circuit integrity and performance</li>
                  <li>7. Advise client of potential safety implications and required actions</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
                Key Summary Points
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Visual inspection is legally required and must be performed before any testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Installations must be isolated from supply during visual inspection for safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Systematic approach ensures comprehensive coverage and consistent results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Up to 80% of electrical defects can be identified through visual inspection alone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Proper documentation protects both inspector and client legally</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Defect classification (C1, C2, C3, FI) guides appropriate remedial actions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Interactive Quiz */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Module3Section1Quiz />
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Module3Section1;