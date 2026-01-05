import { ArrowLeft, ArrowRight, BookOpen, AlertTriangle, CheckCircle, Search, FileText, Scale, Brain, Target, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module2Section1 = () => {
  // SEO
  useEffect(() => {
    const title = 'Part 2 Definitions | BS 7671 Module 2 Section 1';
    document.title = title;
    const desc = 'Learn how Part 2 definitions shape application of BS 7671 regulations. Understand the regulatory dictionary and its impact on electrical installation compliance and safety.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary purpose of Part 2 in BS 7671?",
      options: [
        "To provide installation methods",
        "To serve as the regulatory dictionary defining terminology",
        "To list protective devices",
        "To specify cable ratings"
      ],
      correct: 1,
      explanation: "Part 2 serves as the regulatory dictionary, providing consistent definitions for all terminology used throughout BS 7671."
    },
    {
      id: 2,
      question: "Why must definitions in Part 2 be interpreted consistently?",
      options: [
        "To reduce paperwork",
        "To ensure uniform understanding and safety across all installations", 
        "To simplify training",
        "To reduce costs"
      ],
      correct: 1,
      explanation: "Consistent interpretation ensures uniform understanding, prevents misapplication, and maintains safety standards across all electrical installations."
    },
    {
      id: 3,
      question: "What could happen if an installer misunderstands the term 'isolator'?",
      options: [
        "Higher installation costs",
        "Slower installation process",
        "Non-compliance and potentially unsafe installation",
        "Need for additional paperwork"
      ],
      correct: 2,
      explanation: "Misunderstanding 'isolator' could lead to installing inadequate switching devices that don't provide proper isolation, creating safety risks and non-compliance."
    },
    {
      id: 4,
      question: "How does Part 2 connect to the rest of BS 7671?",
      options: [
        "It provides optional additional information",
        "Every regulation in BS 7671 is underpinned by these definitions",
        "It only applies to domestic installations",
        "It replaces other Parts when conflicts arise"
      ],
      correct: 1,
      explanation: "Part 2 definitions underpin every regulation throughout BS 7671, ensuring consistent terminology and interpretation across all Parts."
    },
    {
      id: 5,
      question: "What is the legal significance of Part 2 definitions?",
      options: [
        "They are suggestions only",
        "They form the basis for regulatory interpretation and compliance",
        "They only apply to new installations",
        "They can be modified by local authorities"
      ],
      correct: 1,
      explanation: "Part 2 definitions form the legal basis for interpreting regulations and determining compliance, making them critical for professional practice."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <Link to="../bs7671-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Search className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Navigating Part 2 – How Definitions Shape Application
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Understanding how terminology underpins all regulations
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2.1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                20 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Understanding the terminology in Part 2 of BS 7671 is foundational to interpreting and applying the regulations correctly. Without a clear grasp of these definitions, misapplication and safety risks can arise. This section focuses on the purpose of Part 2 and how it informs the rest of the Wiring Regulations.
              </p>
              <Alert className="bg-red-600/10 border-red-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-white">
                  <strong>Critical Foundation:</strong> Misunderstanding Part 2 definitions can lead to incorrect application of regulations throughout BS 7671, creating safety risks and compliance failures.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>By the end of this section, you should be able to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Understand the role of Part 2 in BS 7671
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Learn how consistent terminology aids regulatory compliance
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Appreciate the legal and technical significance of definitions
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Identify the most referenced terms across installations
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Part 2 Overview */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Part 2: The Regulatory Dictionary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Part 2 of BS 7671 is titled "Definitions" and serves as the regulatory dictionary for the entire set of wiring regulations. Every regulation within BS 7671 is underpinned by these definitions, ensuring consistent interpretation and application across all electrical work.
              </p>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Characteristics of Part 2</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Comprehensive coverage:</strong> Defines all technical terms used throughout BS 7671</li>
                    <li>• <strong>Legal significance:</strong> Forms the basis for regulatory interpretation</li>
                    <li>• <strong>International alignment:</strong> Based on IEC standards for global consistency</li>
                    <li>• <strong>Regular updates:</strong> Revised to reflect technological advances</li>
                  </ul>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Cross-referencing:</strong> Referenced throughout all other Parts</li>
                    <li>• <strong>Practical application:</strong> Directly impacts installation methods</li>
                    <li>• <strong>Safety focus:</strong> Definitions support safety objectives</li>
                    <li>• <strong>Professional clarity:</strong> Eliminates ambiguity in technical communication</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                  <h5 className="text-white font-semibold mb-2">Examples of Critical Terms</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Protective conductor</li>
                    <li>• Live part</li>
                    <li>• Earthing arrangement</li>
                    <li>• Overcurrent</li>
                    <li>• Isolation</li>
                  </ul>
                </div>

                <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                  <h5 className="text-white font-semibold mb-2">Safety-Related Definitions</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Basic protection</li>
                    <li>• Fault protection</li>
                    <li>• Automatic disconnection</li>
                    <li>• RCD</li>
                    <li>• Earth fault</li>
                  </ul>
                </div>

                <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                  <h5 className="text-white font-semibold mb-2">System Definitions</h5>
                  <ul className="text-sm space-y-1">
                    <li>• TN system</li>
                    <li>• TT system</li>
                    <li>• IT system</li>
                    <li>• SELV</li>
                    <li>• PELV</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Consistency Matters */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Scale className="h-6 w-6 text-yellow-400" />
                Why Consistent Interpretation Matters
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Consistent interpretation of definitions is crucial for safety, compliance, and professional practice. When terms are understood differently by different people, the risk of errors and accidents increases significantly.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Benefits of Consistency</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Safety Assurance</h5>
                      <p className="text-xs mt-1">Uniform understanding prevents dangerous misapplications of safety measures</p>
                    </div>
                    <div className="bg-yellow-400/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Regulatory Compliance</h5>
                      <p className="text-xs mt-1">Consistent interpretation ensures installations meet intended requirements</p>
                    </div>
                    <div className="bg-purple-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Professional Communication</h5>
                      <p className="text-xs mt-1">Clear terminology enables effective communication between professionals</p>
                    </div>
                    <div className="bg-orange-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Quality Assurance</h5>
                      <p className="text-xs mt-1">Standardised definitions support consistent quality across the industry</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Risks of Inconsistency</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Safety Compromises</h5>
                      <p className="text-xs mt-1">Misunderstood definitions can lead to inadequate protective measures</p>
                    </div>
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Compliance Failures</h5>
                      <p className="text-xs mt-1">Incorrect interpretation results in non-compliant installations</p>
                    </div>
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Legal Exposure</h5>
                      <p className="text-xs mt-1">Misapplication can lead to liability in case of incidents</p>
                    </div>
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Professional Reputation</h5>
                      <p className="text-xs mt-1">Errors due to misunderstanding damage professional credibility</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How Definitions Shape Application */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-6 w-6 text-yellow-400" />
                How Definitions Shape Practical Application
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Every term defined in Part 2 directly influences how regulations are applied in practice. Understanding these definitions is not academic exercise — it's essential for safe, compliant electrical work.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4">Example: "Protective Conductor"</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-semibold text-sm mb-2">Part 2 Definition:</p>
                      <p className="text-sm italic">
                        "A conductor used for some measures of protection against electric shock and intended to connect together any of the following parts: exposed-conductive-parts, extraneous-conductive-parts, the main earthing terminal, earth electrode(s), the earthed point of the source..."
                      </p>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-2">Practical Impact:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Must be sized according to fault current</li>
                        <li>• Cannot be used as a functional conductor</li>
                        <li>• Must maintain continuity throughout circuit</li>
                        <li>• Requires specific identification (green/yellow)</li>
                        <li>• Subject to continuity testing requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4">Example: "Live Part"</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-semibold text-sm mb-2">Part 2 Definition:</p>
                      <p className="text-sm italic">
                        "A conductor or conducting part intended to be energised in normal use, including a neutral conductor but, by convention, not a PEN conductor, a protective conductor or a protective earthed neutral conductor."
                      </p>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-2">Practical Impact:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Requires protection against direct contact</li>
                        <li>• Subject to insulation requirements</li>
                        <li>• Must be properly enclosed or guarded</li>
                        <li>• Affects IP rating requirements</li>
                        <li>• Influences safe working procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4">Example: "Isolation"</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-semibold text-sm mb-2">Part 2 Definition:</p>
                      <p className="text-sm italic">
                        "Function intended to cut off for reasons of safety the supply from all, or a discrete section, of the installation by separating the installation or section from every source of electrical energy."
                      </p>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-2">Practical Impact:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Must disconnect ALL live conductors</li>
                        <li>• Requires visible air gap or equivalent</li>
                        <li>• Cannot rely on electronic switching alone</li>
                        <li>• Must be lockable in open position</li>
                        <li>• Affects selection of switching devices</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Most Referenced Terms */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ExternalLink className="h-6 w-6 text-yellow-400" />
                Most Referenced Terms in Electrical Installations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Some definitions in Part 2 are referenced more frequently than others. Understanding these key terms is essential for day-to-day electrical work.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Safety-Critical Terms</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Basic Protection</p>
                      <p className="text-xs text-white">Protection against electric shock under normal conditions</p>
                    </div>
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Fault Protection</p>
                      <p className="text-xs text-white">Protection against electric shock under single fault conditions</p>
                    </div>
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Automatic Disconnection of Supply</p>
                      <p className="text-xs text-white">Protective measure using automatic circuit interruption</p>
                    </div>
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Residual Current Device</p>
                      <p className="text-xs text-white">Device that detects earth leakage and disconnects supply</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Installation Terms</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Circuit</p>
                      <p className="text-xs text-white">Assembly of electrical equipment supplied from same origin</p>
                    </div>
                    <div className="bg-yellow-400/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Final Circuit</p>
                      <p className="text-xs text-white">Circuit connected directly to current-using equipment</p>
                    </div>
                    <div className="bg-yellow-400/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Distribution Circuit</p>
                      <p className="text-xs text-white">Circuit supplying distribution boards or other distribution points</p>
                    </div>
                    <div className="bg-yellow-400/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Origin of Installation</p>
                      <p className="text-xs text-white">Point where electrical energy is supplied to installation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Professional Tip: Building Your Definition Library</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Create flashcards:</strong> Make cards for frequently used terms</li>
                  <li>• <strong>Cross-reference:</strong> Note where each term appears in other Parts</li>
                  <li>• <strong>Real-world examples:</strong> Relate definitions to actual installations</li>
                  <li>• <strong>Regular review:</strong> Revisit definitions when studying other Parts</li>
                  <li>• <strong>Practical application:</strong> Use correct terminology in all professional communication</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">The "Isolator" Misunderstanding</h4>
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> An electrician is asked to install an "isolator" for a lighting circuit in a commercial building. Without consulting Part 2, they install a standard single-pole switch from their van stock, thinking it will provide adequate isolation.
                  </p>
                  
                  <p className="text-sm">
                    <strong>The Problem:</strong> Part 2 defines an isolator as a device that must "cut off for reasons of safety the supply from all, or a discrete section, of the installation by separating the installation or section from every source of electrical energy."
                  </p>
                  
                  <p className="text-sm">
                    <strong>What Was Wrong:</strong>
                  </p>
                  <ul className="text-xs space-y-1 ml-4">
                    <li>• Single-pole switch doesn't isolate neutral conductor</li>
                    <li>• No visible air gap confirmation</li>
                    <li>• Cannot be secured in off position</li>
                    <li>• Doesn't meet isolation requirements for safety</li>
                  </ul>
                  
                  <p className="text-sm">
                    <strong>Consequences:</strong>
                  </p>
                  <ul className="text-xs space-y-1 ml-4">
                    <li>• EICR identifies non-compliance (C2 or C3 defect)</li>
                    <li>• Unsafe working conditions during maintenance</li>
                    <li>• Insurance may question compliance in event of incident</li>
                    <li>• Professional reputation damage</li>
                    <li>• Cost of remedial work</li>
                  </ul>
                  
                  <p className="text-sm">
                    <strong>Correct Solution:</strong> Install a double-pole isolator with visible indication, capable of being locked in the off position, providing true isolation as defined in Part 2.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal and Technical Significance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Scale className="h-6 w-6 text-yellow-400" />
                Legal and Technical Significance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Part 2 definitions carry significant legal weight. In the event of an incident, investigation, or legal proceedings, these definitions form the basis for determining whether work complies with recognised standards.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Legal Implications</h4>
                  <div className="bg-red-600/10 p-4 rounded-lg">
                    <ul className="text-sm space-y-2">
                      <li>• <strong>Expert witness testimony:</strong> Part 2 definitions used to assess competence</li>
                      <li>• <strong>HSE investigations:</strong> Compliance measured against Part 2 standards</li>
                      <li>• <strong>Insurance claims:</strong> Definitions determine coverage validity</li>
                      <li>• <strong>Professional disputes:</strong> Part 2 provides objective reference</li>
                      <li>• <strong>Court proceedings:</strong> Definitions establish technical benchmarks</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Technical Significance</h4>
                  <div className="bg-yellow-400/10 p-4 rounded-lg">
                    <ul className="text-sm space-y-2">
                      <li>• <strong>Design decisions:</strong> Definitions influence system selection</li>
                      <li>• <strong>Safety measures:</strong> Determine appropriate protective devices</li>
                      <li>• <strong>Testing procedures:</strong> Define test requirements and methods</li>
                      <li>• <strong>Maintenance protocols:</strong> Establish inspection criteria</li>
                      <li>• <strong>International compatibility:</strong> Enable global project work</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Professional Responsibility</h4>
                <p className="text-sm mb-3">
                  As a competent person, you have a professional duty to understand and correctly apply Part 2 definitions. This includes:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-sm space-y-1">
                    <li>• Staying current with definition updates</li>
                    <li>• Using terminology correctly in documentation</li>
                    <li>• Explaining definitions to clients and colleagues</li>
                    <li>• Applying definitions consistently across all work</li>
                  </ul>
                  <ul className="text-sm space-y-1">
                    <li>• Questioning ambiguous specifications</li>
                    <li>• Seeking clarification when uncertain</li>
                    <li>• Maintaining professional development</li>
                    <li>• Teaching correct usage to apprentices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Definitions in Part 2 aren't optional reading—they shape how every single rule in BS 7671 is applied. Clear understanding of these terms is essential for safe, compliant work and professional competence.
              </p>
              
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Takeaways</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Part 2 serves as the regulatory dictionary for all of BS 7671</li>
                  <li>• Every regulation throughout BS 7671 depends on these definitions</li>
                  <li>• Consistent interpretation is crucial for safety and compliance</li>
                  <li>• Misunderstanding definitions can lead to dangerous misapplications</li>
                  <li>• Part 2 definitions carry significant legal and technical weight</li>
                  <li>• Professional competence requires thorough understanding of key terms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <BS7671EmbeddedQuiz 
            questions={quizQuestions}
            title="Knowledge Check Quiz"
            description="Test your understanding of Part 2's role and significance in BS 7671."
          />

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div></div>
            <Link to="../bs7671-module-2-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 w-full sm:w-auto">
                Next Section: Key Terms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module2Section1;
