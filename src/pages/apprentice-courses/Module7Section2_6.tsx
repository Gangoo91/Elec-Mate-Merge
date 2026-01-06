import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Module7Section2_6 = () => {
  useSEO(
    "Loose or Poor Connections - Level 2 Module 7 Section 2.6",
    "Detecting, correcting and preventing loose or poor electrical connections"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is a loose connection in electrical terms?",
      options: [
        "A connection that carries too much current",
        "A conductor not securely fastened within a terminal",
        "A connection with too much insulation",
        "A connection that is properly earthed"
      ],
      correctAnswer: 1,
      explanation: "A loose connection occurs when a conductor is not securely fastened within a terminal, or the contact surface is not clean and tight enough to carry current effectively."
    },
    {
      id: 2,
      question: "Give two causes of loose connections.",
      options: [
        "High voltage and low current",
        "Poor workmanship and vibration",
        "Too much earthing and insulation",
        "Correct tools and proper torque"
      ],
      correctAnswer: 1,
      explanation: "Poor workmanship (not tightening screws properly) and vibration or movement are common causes of loose connections."
    },
    {
      id: 3,
      question: "How can thermal cycling loosen a connection?",
      options: [
        "It increases the voltage",
        "It causes metal to expand and contract, gradually loosening connections",
        "It improves conductivity",
        "It reduces electrical resistance"
      ],
      correctAnswer: 1,
      explanation: "Thermal cycling causes heating and cooling, which makes metal expand and contract, gradually loosening connections over time."
    },
    {
      id: 4,
      question: "Why are loose connections dangerous even without high currents?",
      options: [
        "They improve efficiency",
        "They cause resistance which generates heat, leading to arcing and fire",
        "They reduce voltage drops",
        "They make protective devices work better"
      ],
      correctAnswer: 1,
      explanation: "Loose connections create resistance, which generates heat when current flows. This can lead to arcing, insulation damage, and fire even with normal currents."
    },
    {
      id: 5,
      question: "What kind of damage can arcing from a loose connection cause?",
      options: [
        "Improved electrical efficiency",
        "Better voltage regulation",
        "Damage to insulation and fire risk",
        "Enhanced conductor performance"
      ],
      correctAnswer: 2,
      explanation: "Arcing from loose connections can damage insulation, create fire hazards, and cause progressive deterioration of the electrical installation."
    },
    {
      id: 6,
      question: "True or False: Protective devices always trip when a connection is loose.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Loose connections often develop slowly and may not draw enough excess current to trip protective devices until the fault becomes severe."
    },
    {
      id: 7,
      question: "What test might show a poor connection in continuity results?",
      options: [
        "Very low resistance readings",
        "High resistance readings indicating poor conductivity",
        "No resistance readings",
        "Variable voltage readings"
      ],
      correctAnswer: 1,
      explanation: "Poor connections show up as higher than expected resistance readings in continuity or loop impedance tests."
    },
    {
      id: 8,
      question: "How can thermal imaging help detect loose connections?",
      options: [
        "It shows voltage levels",
        "It identifies hot spots in electrical equipment",
        "It measures current flow",
        "It tests insulation resistance"
      ],
      correctAnswer: 1,
      explanation: "Thermal imaging can detect hot spots caused by the heating effect of resistance in loose connections, especially in distribution boards."
    },
    {
      id: 9,
      question: "What should be done after tightening or re-terminating a conductor?",
      options: [
        "Leave it as is",
        "Add more insulation",
        "Record the work and retest the circuit",
        "Increase the voltage"
      ],
      correctAnswer: 2,
      explanation: "After correcting loose connections, the work should be recorded and the circuit should be retested to confirm the fault is corrected."
    },
    {
      id: 10,
      question: "In the real-world example, what gave the first sign of a loose neutral conductor?",
      options: [
        "The lights flickered",
        "A burning smell from the socket",
        "The circuit breaker tripped",
        "The voltage was too high"
      ],
      correctAnswer: 1,
      explanation: "In the retail shop example, staff noticed a burning smell from the socket, which led to the discovery of the loose neutral conductor and overheated terminal."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 2</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-start gap-3">
          <div className="p-2 rounded-lg self-start">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex-1">
            <Badge variant="outline" className="mb-2 border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 7.2.6
            </Badge>
            <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              2.6 Loose or Poor Connections
            </h1>
            <p className="text-sm sm:text-base text-white">
              Detecting, correcting and preventing loose or poor electrical connections
            </p>
          </div>
        </div>

        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <ul className="list-disc pl-4 space-y-1 sm:space-y-2">
                  <li><strong>Loose or poor connections</strong> are common faults in electrical installations</li>
                  <li>Create resistance which generates heat when current flows</li>
                  <li>Can lead to arcing, insulation damage, and fire risk</li>
                  <li>Often develop slowly, making them harder to detect initially</li>
                  <li>Importance of correct workmanship and proper torque settings</li>
                </ul>
              </div>
              
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
                <h3 className="font-medium text-white mb-2">Spot / Use / Check</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Spot:</strong> Discolouration, burning smell, warm outlets, intermittent operation</li>
                  <li><strong>Use:</strong> Torque screwdriver, thermal imaging camera, clamp meter</li>
                  <li><strong>Check:</strong> Terminal tightness per manufacturer torque, correct conductor prep, signs of overheating</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li>Define what loose or poor connections are in electrical circuits</li>
              <li>Identify the main causes of loose or poor connections</li>
              <li>Explain the dangers they create for people and property</li>
              <li>Understand how to detect, correct, and prevent this type of fault</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Content</h2>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">What Are Loose or Poor Connections?</p>
                    <p className="text-xs sm:text-sm text-white mb-3">
                      A loose connection occurs when a conductor is not securely fastened within a terminal, or the contact surface is not clean and tight enough to carry current effectively. Poor connections can also result from incorrect termination, such as too much insulation stripped away, or multiple conductors crammed into a terminal not designed for them.
                    </p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Types of poor connections:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-3 list-disc space-y-1">
                      <li>Loose terminal screws allowing conductor movement</li>
                      <li>Oxidised or corroded contact surfaces</li>
                      <li>Oversized conductors forced into undersized terminals</li>
                      <li>Insufficient conductor insertion depth</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Physics principle:</strong> Poor connections create high resistance. Using Ohm's Law (P = I²R), even small increases in resistance cause significant heat generation
                    </div>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="loose-connection-definition"
                question="What is meant by a 'loose connection' in an electrical installation?"
                options={[
                  "A connection that carries too much current",
                  "A conductor not securely fastened within a terminal",
                  "A connection with excessive insulation",
                  "A properly earthed connection"
                ]}
                correctIndex={1}
                explanation="A loose connection occurs when a conductor is not securely fastened within a terminal, creating poor electrical contact."
              />

              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Causes of Loose or Poor Connections</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Installation factors:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-3 list-disc space-y-1">
                      <li>Poor workmanship and inadequate torque settings</li>
                      <li>Using incorrect tools or techniques</li>
                      <li>Rushed installation schedules</li>
                      <li>Inadequate quality control procedures</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Environmental factors:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-3 list-disc space-y-1">
                      <li>Vibration in industrial or transport settings</li>
                      <li>Thermal cycling from load changes</li>
                      <li>Corrosion in humid environments</li>
                      <li>Mechanical stress over time</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Progressive deterioration cycle:</strong></p>
                    <p className="text-xs text-white ml-4 mb-3">
                      Loose connections create a cycle: increased resistance → heat generation → thermal expansion → further loosening → more resistance. This process accelerates over time.
                    </p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Manufacturer specifications:</strong> Always follow torque settings - typically 1.0-1.2 Nm for 2.5mm² terminals, 1.2-1.5 Nm for 4mm² terminals
                    </div>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="loose-connection-causes"
                question="Give two reasons why a connection might become loose over time."
                options={[
                  "High voltage and excessive current",
                  "Thermal cycling and vibration",
                  "Too much earthing and insulation",
                  "Correct torque and proper tools"
                ]}
                correctIndex={1}
                explanation="Thermal cycling (heating and cooling) and vibration are common reasons why connections become loose over time."
              />

              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-3">Dangers and Consequences</p>
                    <p className="text-xs sm:text-sm text-white mb-3">
                      Loose connections cause resistance, which generates heat according to I²R losses. The consequences escalate progressively:
                    </p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Immediate risks:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-3 list-disc space-y-1">
                      <li>Overheating of terminals and accessories</li>
                      <li>Voltage drops affecting equipment performance</li>
                      <li>Increased energy consumption and costs</li>
                      <li>Intermittent operation causing disruption</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Progressive damage:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-3 list-disc space-y-1">
                      <li>Arcing causing carbonisation</li>
                      <li>Insulation degradation from heat</li>
                      <li>Terminal damage requiring replacement</li>
                      <li>Fire ignition of surrounding materials</li>
                    </ul>
                    <div className="text-xs text-white bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
                      <strong>Critical safety point:</strong> Loose connections can cause fires without tripping protective devices because increased resistance may not create enough excess current to operate overcurrent protection
                    </div>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="loose-connection-dangers"
                question="Why might a loose connection cause a fire even without tripping a breaker?"
                options={[
                  "It improves electrical efficiency",
                  "Resistance creates heat which can cause arcing and ignition without excess current",
                  "It reduces the voltage in the circuit",
                  "It makes protective devices work better"
                ]}
                correctIndex={1}
                explanation="Loose connections create resistance that generates heat and arcing, which can cause fires without drawing enough current to trip protective devices."
              />

              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-3">Detection, Correction, and Prevention</p>
                    <p className="text-xs sm:text-sm text-white mb-3">
                      Early detection and proper correction techniques are essential for preventing serious consequences:
                    </p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Detection methods:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-3 list-disc space-y-1">
                      <li>Visual inspection for discolouration, heat damage, or melted insulation</li>
                      <li>Thermal imaging cameras to identify hot spots</li>
                      <li>High resistance readings in continuity or Zs tests</li>
                      <li>Unusual odours, sounds, or warm components</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Correction process:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-3 list-disc space-y-1">
                      <li>Safe isolation of the affected circuit</li>
                      <li>Clean contact surfaces of oxidation or corrosion</li>
                      <li>Re-terminate conductor with correct torque</li>
                      <li>Test and verify repair effectiveness</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Prevention strategy:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-3 list-disc space-y-1">
                      <li>Use calibrated torque tools and follow specifications</li>
                      <li>Implement regular inspection schedules</li>
                      <li>Maintain quality installation procedures</li>
                      <li>Ensure proper training and supervision</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Professional best practice:</strong> Always retest after correction and document findings. High resistance readings often indicate connection problems before visual signs appear
                    </div>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="loose-connection-detection"
                question="What test result might indicate a poor connection in a protective conductor?"
                options={[
                  "Very low resistance reading",
                  "High resistance reading in continuity test",
                  "No resistance reading at all",
                  "Variable voltage reading"
                ]}
                correctIndex={1}
                explanation="A high resistance reading in a continuity test would indicate a poor connection in a protective conductor, which should have very low resistance."
              />
            </div>
          </CardContent>
        </Card>

        {/* Practical Guidance Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
            <div className="space-y-3 text-xs sm:text-sm text-white">
              <ul className="list-disc pl-6 space-y-2">
                <li>Always check every connection during installation, not just assume it is secure</li>
                <li>Use the correct screwdriver and torque settings recommended by manufacturers</li>
                <li>Inspect for signs of overheating when carrying out maintenance or EICRs</li>
                <li>Record any loose connections found and confirm corrective action with a retest</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Real-World Example Section */}
        <Card className="mb-6 sm:mb-8 p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
            
            <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">🔥</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-amber-600 dark:text-amber-400 mb-3">Near-Miss Fire Incident: Retail Shop Case Study</p>
                  
                  <p className="text-xs sm:text-sm text-white mb-4">
                    In a busy retail clothing shop, staff noticed a burning smell during peak Saturday trading. Investigation revealed a loose neutral conductor in a socket terminal that had overheated, melting the faceplate and scorching the wall behind.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-white mb-1">Timeline of events:</p>
                      <ul className="text-xs text-white ml-4 list-disc space-y-1">
                        <li>Burning smell noticed over 2-3 hours</li>
                        <li>Socket outlet becoming warm to touch</li>
                        <li>Till equipment operating intermittently</li>
                        <li>No circuit breaker trips occurring</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-white mb-1">Investigation findings:</p>
                      <ul className="text-xs text-white ml-4 list-disc space-y-1">
                        <li>Terminal screw only finger-tight</li>
                        <li>Severe carbonisation around terminal</li>
                        <li>Socket faceplate partially melted</li>
                        <li>Wall plasterboard scorched</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-white mb-1">Root cause:</p>
                      <p className="text-xs text-white ml-4">
                        Poor termination during original installation, worsened by thermal cycling from high-current till equipment, with no routine maintenance programme in place.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                    <p className="font-medium text-emerald-700 dark:text-elec-yellow text-sm">
                      ✅ Lesson: Without quick response, this could have ignited the wall cavity, potentially causing a major fire in a crowded shopping centre. Quality installation and routine maintenance are essential fire prevention measures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium text-white mb-2">Q: Do loose connections always cause immediate faults?</h3>
                <p className="text-white">A: No, they often develop slowly and may only show symptoms after prolonged use.</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium text-white mb-2">Q: Can vibration cause connections to loosen?</h3>
                <p className="text-white">A: Yes, particularly in industrial, commercial, or transport applications.</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium text-white mb-2">Q: How can electricians prevent loose connections?</h3>
                <p className="text-white">A: By using correct torque settings, good workmanship, and thorough inspection/testing.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Summary Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-[#121212]/80 border-white/10 backdrop-blur-sm">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Professional Knowledge Summary</h2>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 border-l-4 border-l-elec-yellow border border-emerald-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-2">Definition & Physics:</p>
                    <p className="text-xs sm:text-sm text-white">
                      Conductors not securely fastened create high resistance. Using P = I²R, even small resistance increases cause significant heat generation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-red-500 border border-red-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-2">Hidden Danger:</p>
                    <p className="text-xs sm:text-sm text-white">
                      Can cause fires without tripping protective devices. Heat generation occurs without excess current draw.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-orange-500 border border-orange-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-2">Progressive Nature:</p>
                    <p className="text-xs sm:text-sm text-white">
                      Creates deterioration cycle: poor connection → resistance → heat → expansion → worse connection → more heat.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-green-500 border border-green-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-2">Detection Methods:</p>
                    <p className="text-xs sm:text-sm text-white">
                      Visual inspection, thermal imaging, high resistance in tests, burning odours, and warm components.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-purple-500 border border-purple-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-2">Common Causes:</p>
                    <ul className="text-xs sm:text-sm text-white space-y-1">
                      <li>• Poor workmanship</li>
                      <li>• Incorrect torque settings</li>
                      <li>• Vibration and thermal cycling</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-elec-yellow bg-elec-yellow/10 border border-emerald-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-2">Prevention:</p>
                    <ul className="text-xs sm:text-sm text-white space-y-1">
                      <li>• Calibrated torque tools</li>
                      <li>• Regular maintenance</li>
                      <li>• Quality control procedures</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-indigo-500 bg-indigo-500/10 border border-indigo-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
                  <div className="flex-1">
                    <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Correction:</p>
                    <ul className="text-xs sm:text-sm text-white space-y-1">
                      <li>• Safe isolation</li>
                      <li>• Clean and re-terminate</li>
                      <li>• Test and document</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-red-600 bg-red-600/10 border border-red-500/20 mt-6">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">!</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-2">Critical Professional Insight:</p>
                    <p className="text-xs sm:text-sm text-white">
                      Loose connections are a leading cause of electrical fires, often developing slowly over years without obvious symptoms. The physics is unforgiving: poor connections create resistance, resistance creates heat, and heat causes damage that can ignite surrounding materials. Quality installation and regular maintenance are the only defences against this progressive threat to life and property.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Quiz questions={quizQuestions} />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
          <Button variant="outline" className="flex-1 sm:flex-none" asChild>
            <Link to="../2-5" className="flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous: 2.5 Incorrect Polarity</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          </Button>
          <Button className="flex-1 sm:flex-none" asChild>
            <Link to=".." className="flex items-center justify-center gap-2">
              <span className="hidden sm:inline">Next: Section 3</span>
              <span className="sm:hidden">Section 3</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module7Section2_6;