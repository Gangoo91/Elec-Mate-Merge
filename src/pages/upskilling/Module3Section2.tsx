import { ArrowLeft, AlertTriangle, BookOpen, Target, CheckCircle2, Settings, Brain, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Module3Section2Quiz from '@/components/upskilling/Module3Section2Quiz';

const Module3Section2 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="/study-centre/upskilling/inspection-testing-module-3">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-8 w-8 text-elec-yellow" />
            <Badge variant="secondary" className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold">
              Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            What to Look For – Common Visual Defects
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Building your visual checklist to identify critical defects and safety issues
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
                Introduction to Common Defects
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-sm leading-relaxed">
                Knowing what to look for during visual inspection is critical for identifying safety hazards and 
                compliance issues. This section provides a comprehensive checklist of the most common defects 
                found in electrical installations, helping you develop a systematic approach to visual examination.
              </p>
              <p className="text-sm leading-relaxed">
                Understanding defect classification and prioritisation ensures appropriate responses to different 
                levels of risk, from immediate dangers requiring urgent action to minor issues that can be 
                scheduled for future attention.
              </p>
              <div className="bg-transparent/80 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Professional Insight:</p>
                <p className="text-sm">
                  Experienced inspectors develop pattern recognition for common defects, but systematic 
                  checklists ensure nothing is missed even in familiar installations.
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
                  <span>Identify and classify common electrical defects according to safety risk levels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Recognise signs of deterioration, damage, and non-compliant installations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Apply systematic visual inspection techniques for different installation areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Distinguish between immediate dangers and improvement recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Document defects appropriately with correct classification codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Understand the implications of different defect types for installation safety</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Defect Classification System */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-elec-yellow" />
                Defect Classification System
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Understanding Classification Codes</h3>
                <p className="text-sm leading-relaxed">
                  The classification system provides a standardised way to communicate the urgency and nature 
                  of defects found during inspection, guiding appropriate remedial actions.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-900/20 border border-red-600/30 p-4 rounded-lg">
                    <h4 className="text-red-300 font-medium mb-2">C1 - Danger Present</h4>
                    <p className="text-sm mb-2">
                      Risk of injury exists. Immediate remedial action required.
                    </p>
                    <ul className="space-y-1 text-sm text-red-200">
                      <li>• Exposed live parts</li>
                      <li>• Missing earthing connections</li>
                      <li>• Damaged protective devices</li>
                      <li>• Live conductors accessible to touch</li>
                    </ul>
                  </div>

                  <div className="bg-orange-900/20 border border-orange-600/30 p-4 rounded-lg">
                    <h4 className="text-orange-300 font-medium mb-2">C2 - Potentially Dangerous</h4>
                    <p className="text-sm mb-2">
                      Urgent remedial action required to prevent danger arising.
                    </p>
                    <ul className="space-y-1 text-sm text-orange-200">
                      <li>• Inadequate protective bonding</li>
                      <li>• Overloaded circuits</li>
                      <li>• Non-compliant cable installations</li>
                      <li>• Missing RCD protection</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-900/20 border border-elec-yellow/30 p-4 rounded-lg">
                    <h4 className="text-yellow-300 font-medium mb-2">C3 - Improvement Recommended</h4>
                    <p className="text-sm mb-2">
                      Improvement would enhance electrical safety but not immediately dangerous.
                    </p>
                    <ul className="space-y-1 text-sm text-yellow-200">
                      <li>• Poor labelling of circuits</li>
                      <li>• Missing warning notices</li>
                      <li>• Inadequate cable support</li>
                      <li>• Minor compliance issues</li>
                    </ul>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                    <h4 className="text-blue-300 font-medium mb-2">FI - Further Investigation</h4>
                    <p className="text-sm mb-2">
                      Investigation required to determine if a defect exists.
                    </p>
                    <ul className="space-y-1 text-sm text-blue-200">
                      <li>• Inaccessible areas requiring specialist access</li>
                      <li>• Complex installations needing detailed testing</li>
                      <li>• Unusual configurations requiring expert opinion</li>
                      <li>• Suspected hidden defects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Defects by Installation Area */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                Common Defects by Installation Area
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Consumer Units and Distribution Boards</h3>
                  <div className="space-y-4">
                    <div className="bg-transparent/80 p-4 rounded-lg">
                      <h4 className="text-elec-yellow font-medium mb-2">High Priority Defects (C1/C2)</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Missing or damaged enclosure covers exposing live parts</li>
                        <li>• Incorrect or missing RCDs for required circuits</li>
                        <li>• Overcurrent devices with incorrect ratings for circuit protection</li>
                        <li>• Evidence of overheating at connections (discoloured terminals)</li>
                        <li>• Loose or damaged main earthing connections</li>
                        <li>• Mixed neutral and earth connections</li>
                        <li>• Non-compliant consumer unit locations (under stairs, bedrooms)</li>
                      </ul>
                    </div>

                    <div className="bg-transparent/80 p-4 rounded-lg">
                      <h4 className="text-elec-yellow font-medium mb-2">Improvement Areas (C3)</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Missing or inadequate circuit labelling</li>
                        <li>• Absence of electrical installation certificate</li>
                        <li>• Missing warning notices for voltage or RCD testing</li>
                        <li>• Poor cable entry methods allowing dust/moisture ingress</li>
                        <li>• Inadequate working space around distribution boards</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Wiring Systems and Cable Installation</h3>
                  <div className="space-y-4">
                    <div className="bg-transparent/80 p-4 rounded-lg">
                      <h4 className="text-elec-yellow font-medium mb-2">Critical Safety Issues</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Damaged cable insulation exposing conductors</li>
                        <li>• Cables installed in inappropriate environments (wet/hot locations)</li>
                        <li>• Missing mechanical protection where required</li>
                        <li>• Inadequate cable support causing stress on connections</li>
                        <li>• Incorrect cable types for the installation method</li>
                        <li>• Poor segregation between low and high voltage systems</li>
                        <li>• Cables penetrating fire barriers without proper sealing</li>
                      </ul>
                    </div>

                    <div className="bg-transparent/80 p-4 rounded-lg">
                      <h4 className="text-elec-yellow font-medium mb-2">Common Installation Problems</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Excessive cable support spacing</li>
                        <li>• Poor cable routing creating trip hazards</li>
                        <li>• Mixed cable types in the same containment system</li>
                        <li>• Inadequate identification of cable purposes</li>
                        <li>• Non-compliant cable entry into enclosures</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Accessories and Equipment</h3>
                  <div className="space-y-4">
                    <div className="bg-transparent/80 p-4 rounded-lg">
                      <h4 className="text-elec-yellow font-medium mb-2">Socket Outlets and Switches</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Damaged or cracked faceplates exposing internal parts</li>
                        <li>• Loose mounting allowing movement when operated</li>
                        <li>• Incorrect IP ratings for the installation environment</li>
                        <li>• Missing RCD protection in required locations</li>
                        <li>• Evidence of overheating (burn marks, discolouration)</li>
                        <li>• Wrong accessory types for the location (bathrooms, kitchens)</li>
                      </ul>
                    </div>

                    <div className="bg-transparent/80 p-4 rounded-lg">
                      <h4 className="text-elec-yellow font-medium mb-2">Lighting and Fixed Equipment</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Inadequate support for heavy luminaires</li>
                        <li>• Missing or damaged protective covers on fluorescent fittings</li>
                        <li>• Incorrect cable connections at light fittings</li>
                        <li>• Non-compliant bathroom lighting zones</li>
                        <li>• Emergency lighting systems not properly maintained</li>
                        <li>• Fixed equipment without adequate isolation means</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Earthing and Bonding</h3>
                  <div className="space-y-4">
                    <div className="bg-transparent/80 p-4 rounded-lg">
                      <h4 className="text-elec-yellow font-medium mb-2">Critical Earthing Defects</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Disconnected or corroded earth electrode connections</li>
                        <li>• Missing main protective bonding to gas and water services</li>
                        <li>• Inadequate supplementary bonding in special locations</li>
                        <li>• Incorrect earth conductor sizing for the installation</li>
                        <li>• Mixed earthing systems creating parallel paths</li>
                        <li>• Poor labelling of earthing and bonding connections</li>
                      </ul>
                    </div>

                    <div className="bg-transparent/80 p-4 rounded-lg">
                      <h4 className="text-elec-yellow font-medium mb-2">Bonding Issues</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Bonding conductors incorrectly sized for the application</li>
                        <li>• Connections to painted or non-conductive surfaces</li>
                        <li>• Missing bonding clamps or inadequate connections</li>
                        <li>• Structural metalwork not properly bonded</li>
                        <li>• Cross-bonding between different earthing systems</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Learning Exercises */}
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
                  <h4 className="text-elec-yellow font-medium mb-3">Exercise 1: Defect Classification Practice</h4>
                  <p className="text-sm mb-3">
                    Practice classifying various electrical defects using standardised codes (C1, C2, C3, FI) 
                    with photographic examples and case studies.
                  </p>
                  <div className="text-sm text-white">
                    <strong>Skills Developed:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Risk assessment and prioritisation</li>
                      <li>• Consistent application of classification standards</li>
                      <li>• Professional judgement in borderline cases</li>
                      <li>• Documentation accuracy and clarity</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Exercise 2: Consumer Unit Detailed Inspection</h4>
                  <p className="text-sm mb-3">
                    Conduct comprehensive visual examination of different consumer unit types, 
                    identifying compliance issues and safety defects systematically.
                  </p>
                  <div className="text-sm text-white">
                    <strong>Focus Areas:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Protective device ratings and coordination</li>
                      <li>• RCD provision and testing arrangements</li>
                      <li>• Earthing and bonding connections</li>
                      <li>• Circuit identification and labelling</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Exercise 3: Cable Installation Assessment</h4>
                  <p className="text-sm mb-3">
                    Evaluate cable installation methods across different environments, 
                    identifying support, protection, and routing defects.
                  </p>
                  <div className="text-sm text-white">
                    <strong>Assessment Criteria:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Support spacing and methods compliance</li>
                      <li>• Environmental suitability of cable types</li>
                      <li>• Mechanical protection adequacy</li>
                      <li>• Fire barrier penetration methods</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Exercise 4: Special Location Inspection</h4>
                  <p className="text-sm mb-3">
                    Practice inspecting bathrooms, kitchens, and other special locations, 
                    focusing on zone requirements and additional protective measures.
                  </p>
                  <div className="text-sm text-white">
                    <strong>Special Considerations:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Zone classification and equipment placement</li>
                      <li>• IP rating requirements for different zones</li>
                      <li>• RCD protection and bonding requirements</li>
                      <li>• Switchgear accessibility and safety</li>
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
                  <h4 className="text-white font-medium mb-2">Q: How do I decide between C1 and C2 classification for a defect?</h4>
                  <p className="text-sm text-white">
                    A: C1 means immediate danger exists (someone could be injured right now). C2 means danger could 
                    arise if conditions change. If you're unsure, err on the side of caution and classify as C1.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: Should I take photographs of every defect I find?</h4>
                  <p className="text-sm text-white">
                    A: Photograph significant defects, especially C1 and C2 issues, complex problems, or anything 
                    that would be difficult to explain clearly in words. Photos support your professional judgement.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: What if I find defects that don't fit the standard classifications?</h4>
                  <p className="text-sm text-white">
                    A: Use the closest appropriate classification and provide detailed descriptions. Document unusual 
                    circumstances and consider seeking advice from more experienced colleagues or technical support.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: How detailed should defect descriptions be?</h4>
                  <p className="text-sm text-white">
                    A: Provide enough detail that another competent person could locate and understand the defect. 
                    Include location, circuit identification, nature of the problem, and potential risks.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: Can I classify minor labelling issues as acceptable?</h4>
                  <p className="text-sm text-white">
                    A: Poor labelling is typically C3 (improvement recommended) as it affects maintenance and emergency 
                    response. Complete absence of labelling in complex installations could be C2 due to safety implications.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: What should I do if the client disputes my defect classifications?</h4>
                  <p className="text-sm text-white">
                    A: Explain your reasoning clearly, reference relevant standards, and provide supporting evidence. 
                    If disagreement persists, consider involving your technical department or scheme provider.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: How do I handle defects in inaccessible areas?</h4>
                  <p className="text-sm text-white">
                    A: Use FI (Further Investigation) classification for suspected defects in inaccessible areas. 
                    Document the limitation and recommend investigation when access becomes available.
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
                  During inspection of a rental property, you discover the bathroom has socket outlets within 
                  3 metres of the bath, no RCD protection on bathroom circuits, missing supplementary bonding 
                  to metal pipework, and a light switch accessible from the shower. The consumer unit shows 
                  evidence of water damage and some circuits have no labelling.
                </p>
              </div>
              <div className="bg-transparent p-4 rounded-md">
                <h4 className="text-green-400 font-medium mb-2">Professional Response:</h4>
                <ol className="space-y-2 text-sm">
                  <li>1. <strong>C1:</strong> Socket outlets in bathroom zones - immediate danger, must be made safe</li>
                  <li>2. <strong>C1:</strong> Switch accessible from shower - immediate shock risk</li>
                  <li>3. <strong>C2:</strong> Missing RCD protection - urgent remedial action required</li>
                  <li>4. <strong>C2:</strong> Water damage to consumer unit - potentially dangerous condition</li>
                  <li>5. <strong>C2:</strong> Missing supplementary bonding - shock risk if fault occurs</li>
                  <li>6. <strong>C3:</strong> Missing circuit labelling - improvement recommended for safety</li>
                  <li>7. Take photographs and advise immediate electrical contractor involvement</li>
                  <li>8. Recommend no further use of bathroom electrical items until repairs completed</li>
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
                  <span>Defect classification guides appropriate response times and remedial actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>C1 defects require immediate action to prevent injury or death</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Systematic inspection by area ensures comprehensive defect identification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Consumer units and earthing systems are common sources of serious defects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Special locations require additional attention due to enhanced risks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Professional documentation protects both inspector and client interests</span>
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
              <Module3Section2Quiz />
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Module3Section2;