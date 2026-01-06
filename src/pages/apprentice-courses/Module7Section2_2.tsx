import { ArrowLeft, ArrowRight, Zap, Lightbulb, AlertTriangle, CheckCircle, Shield, Flame, Search, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Module7Section2_2 = () => {
  useSEO(
    "Short Circuits - Level 2 Module 7 Section 2.2",
    "Understanding detection, causes, and rectification of short circuit faults"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is a short circuit?",
      options: [
        "When current takes a longer path than intended",
        "When live conductors at different potentials come into direct contact",
        "When voltage is reduced in a circuit",
        "When earth fault occurs"
      ],
      correctAnswer: 1,
      explanation: "A short circuit occurs when live conductors at different potentials (such as line and neutral) come into direct contact, creating a path of very low resistance."
    },
    {
      id: 2,
      question: "What happens to current during a short circuit?",
      options: [
        "Current decreases significantly",
        "Current stays the same",
        "Current increases to very high levels",
        "Current flows backwards"
      ],
      correctAnswer: 2,
      explanation: "During a short circuit, current increases dramatically to very high levels because the resistance of the circuit becomes very low."
    },
    {
      id: 3,
      question: "Give two causes of short circuits.",
      options: [
        "High voltage and low resistance",
        "Damaged insulation and incorrect installation",
        "Too much earthing and poor connections",
        "Circuit breakers and fuses"
      ],
      correctAnswer: 1,
      explanation: "Short circuits are commonly caused by damaged or deteriorated insulation and incorrect or careless installation practices."
    },
    {
      id: 4,
      question: "What type of damage can rodents cause that may lead to a short circuit?",
      options: [
        "Eating electrical equipment",
        "Chewing through cable insulation",
        "Building nests in switch panels",
        "Touching live parts"
      ],
      correctAnswer: 1,
      explanation: "Rodents can chew through cable insulation, exposing conductors which can then come into contact and cause a short circuit."
    },
    {
      id: 5,
      question: "Why are short circuits dangerous?",
      options: [
        "They reduce voltage to equipment",
        "They cause very high currents that can lead to fire and equipment damage",
        "They make circuits more efficient",
        "They improve earthing"
      ],
      correctAnswer: 1,
      explanation: "Short circuits are dangerous because they allow extremely high fault currents that cause overheating, arcing, equipment damage, and can lead to fires."
    },
    {
      id: 6,
      question: "What protective devices are used against short circuits?",
      options: [
        "Voltmeters and ammeters",
        "Fuses, MCBs and MCCBs",
        "Earth rods and bonding",
        "Insulation and barriers"
      ],
      correctAnswer: 1,
      explanation: "Fuses, MCBs (Miniature Circuit Breakers), and MCCBs (Moulded Case Circuit Breakers) are designed to protect against short circuits by rapidly disconnecting the supply."
    },
    {
      id: 7,
      question: "True or False: A short circuit is the same as an overload.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Overloads are excess current flowing through a load, while short circuits are abnormal current paths with very low resistance that bypass the load entirely."
    },
    {
      id: 8,
      question: "What requirement does BS 7671 place on disconnection times?",
      options: [
        "No specific requirements",
        "Maximum disconnection times for safety",
        "Minimum disconnection times only",
        "Variable times depending on weather"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 sets out requirements for maximum disconnection times to ensure protective devices operate quickly enough to prevent danger during short circuits."
    },
    {
      id: 9,
      question: "What must an electrician do if a circuit trips repeatedly due to a short circuit?",
      options: [
        "Keep re-energising until it works",
        "Replace the circuit breaker immediately",
        "Never re-energise until the cause is identified and rectified",
        "Ignore it if equipment still works"
      ],
      correctAnswer: 2,
      explanation: "An electrician must never re-energise a circuit that trips repeatedly until the cause is properly identified and rectified, as this indicates a dangerous fault condition."
    },
    {
      id: 10,
      question: "In the real-world example, what mistake caused the lighting circuit to short?",
      options: [
        "Wrong cable size was used",
        "A cable was pinched by a screw when fixing a light fitting",
        "Too much current was flowing",
        "The earth connection was loose"
      ],
      correctAnswer: 1,
      explanation: "A cable was pinched by a screw when fixing a light fitting, causing the insulation to break down and allowing line and neutral conductors to touch, creating a short circuit."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 2</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="p-2 rounded-lg self-start">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex-1">
            <Badge variant="outline" className="mb-2 sm:mb-3 border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 7.2.2
            </Badge>
            <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              2.2 Short Circuits
            </h1>
            <p className="text-sm sm:text-base text-white max-w-3xl">
              Understanding detection, causes, and rectification of short circuit faults
            </p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <ul className="list-disc pl-4 space-y-1 sm:space-y-2">
                  <li>A <strong>short circuit fault</strong> occurs when current flows along an unintended path</li>
                  <li>Creates very low resistance path bypassing the normal load</li>
                  <li>Causes dangerously high current levels</li>
                  <li>Can damage equipment, cause fires, and pose serious safety risks</li>
                  <li>Requires immediate attention and protective device operation</li>
                </ul>
              </div>
              
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
                <h3 className="font-medium text-white mb-2">Spot / Use / Check</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Spot:</strong> Tripped protective devices, burning smells</li>
                  <li><strong>Use:</strong> Insulation resistance tester, visual inspection</li>
                  <li><strong>Check:</strong> All cable routes and terminations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li>Identify the characteristics and dangers of short circuit faults</li>
              <li>Understand the common causes of short circuits in electrical installations</li>
              <li>Apply safe testing methods to locate short circuit faults</li>
              <li>Implement emergency response procedures for short circuit incidents</li>
              <li>Recognise the operation and selection of protective devices</li>
              <li>Apply BS 7671 requirements for short circuit protection and disconnection times</li>
            </ul>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Content</h2>
            
            {/* Section 1: Definition and Characteristics */}
            <div className="border-l-4 border-l-red-500 p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Definition and Characteristics</h3>
              </div>
              
              <p className="text-sm text-white mb-4 leading-relaxed">
                A short circuit occurs when live conductors at different potentials come into direct contact, either physically or through a conductive path with very low resistance. This creates an unintended path that bypasses the normal load, allowing current to flow at levels far exceeding the circuit's design capacity.
              </p>

              <div className="space-y-3 mb-4">
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2">Key Characteristics</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Extremely low resistance path (typically less than 1 ohm)</li>
                    <li>• Fault current many times higher than normal operating current</li>
                    <li>• Immediate operation of protective devices (fuses, MCBs)</li>
                    <li>• Potential for arcing, heating, and fire</li>
                    <li>• Voltage drop to near zero at the fault point</li>
                  </ul>
                </div>
                
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2">Types of Short Circuit Faults</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• <strong>Line to Neutral:</strong> Most common in single-phase systems</li>
                    <li>• <strong>Line to Line:</strong> Between phase conductors in three-phase systems</li>
                    <li>• <strong>Line to Earth:</strong> Phase conductor touching earthed metalwork</li>
                    <li>• <strong>Three-phase:</strong> All phases short-circuited together</li>
                    <li>• <strong>Arcing faults:</strong> Intermittent contact causing arcing</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-3 rounded-lg mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-elec-yellow mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm text-red-700 dark:text-elec-yellow mb-1">Immediate Danger</h4>
                    <p className="text-xs text-red-600 dark:text-elec-yellow">
                      Short circuits can generate fault currents of thousands of amperes within milliseconds, creating intense heat, dangerous arcing, and potential for explosion or fire.
                    </p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="short-circuit-current"
                question="What happens to circuit current when a line and neutral conductor come into contact?"
                options={[
                  "Current decreases to zero",
                  "Current stays the same",
                  "Current increases dramatically",
                  "Current flows to earth"
                ]}
                correctIndex={2}
                explanation="When line and neutral conductors come into direct contact, the resistance becomes very low, causing current to increase dramatically to dangerous levels."
              />
            </div>

            <Separator className="my-6" />

            {/* Section 2: Causes and Contributing Factors */}
            <div className="border-l-4 border-l-orange-500 p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">2</div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Causes and Contributing Factors</h3>
              </div>
              
              <p className="text-sm text-white mb-4 leading-relaxed">
                Short circuits can result from numerous factors, often involving a combination of installation errors, environmental conditions, and equipment failures:
              </p>

              <div className="grid gap-3 sm:grid-cols-2 mb-4">
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2 text-red-600 dark:text-elec-yellow">Installation Faults</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Incorrect or careless installation practices</li>
                    <li>• Stripped insulation left too long at terminations</li>
                    <li>• Poor cable management causing conductor contact</li>
                    <li>• Inadequate separation between live parts</li>
                    <li>• Wrong cable types for the application</li>
                  </ul>
                </div>
                
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2 text-orange-600 dark:text-elec-yellow">Mechanical Damage</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Drilling or nailing through cables</li>
                    <li>• Cable crushing during construction work</li>
                    <li>• Impact damage from vehicles or machinery</li>
                    <li>• Excessive bending or pulling forces</li>
                    <li>• Vibration causing insulation breakdown</li>
                  </ul>
                </div>
                
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2 text-purple-600 dark:text-elec-yellow">Environmental Factors</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Moisture ingress causing tracking and flashover</li>
                    <li>• Overheating leading to insulation failure</li>
                    <li>• UV radiation degrading cable insulation</li>
                    <li>• Chemical attack in industrial environments</li>
                    <li>• Rodent damage to cable insulation</li>
                  </ul>
                </div>
                
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2 text-elec-yellow dark:text-elec-yellow">Equipment Failures</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Internal faults in electrical equipment</li>
                    <li>• Insulation breakdown in motors and transformers</li>
                    <li>• Failed switching devices creating short paths</li>
                    <li>• Manufacturing defects in electrical components</li>
                    <li>• Age-related deterioration of materials</li>
                  </ul>
                </div>
              </div>

              <InlineCheck
                id="short-circuit-causes"
                question="Name two common causes of short circuit faults."
                options={[
                  "High voltage and earthing problems",
                  "Damaged insulation and mechanical damage",
                  "Overloads and high resistance",
                  "Poor earthing and voltage variations"
                ]}
                correctIndex={1}
                explanation="Damaged or deteriorated insulation and mechanical damage to cables (such as by nails, screws, or rodents) are common causes of short circuit faults."
              />
            </div>

            <Separator className="my-6" />

            {/* Section 3: Dangers and Immediate Effects */}
            <div className="border-l-4 border-l-purple-500 p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">3</div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Dangers and Immediate Effects</h3>
              </div>
              
              <p className="text-sm text-white mb-4 leading-relaxed">
                Short circuits represent one of the most dangerous electrical fault conditions, capable of causing immediate and severe consequences:
              </p>

              <div className="space-y-3 mb-4">
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2 text-red-600 dark:text-elec-yellow">Immediate Physical Dangers</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• <strong>Arcing:</strong> Intense electrical arcs reaching thousands of degrees</li>
                    <li>• <strong>Fire risk:</strong> Ignition of surrounding materials</li>
                    <li>• <strong>Explosion:</strong> Rapid heating causing metal expansion and arc blast</li>
                    <li>• <strong>Toxic gases:</strong> Burning insulation releasing harmful fumes</li>
                    <li>• <strong>Electric shock:</strong> Touch potentials and step potentials</li>
                  </ul>
                </div>
                
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2 text-amber-600 dark:text-amber-400">Equipment and System Effects</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• <strong>Equipment destruction:</strong> Severe damage to electrical components</li>
                    <li>• <strong>System instability:</strong> Voltage dips affecting other circuits</li>
                    <li>• <strong>Power outages:</strong> Protective device operation causing loss of supply</li>
                    <li>• <strong>Data loss:</strong> Sudden power interruption to IT systems</li>
                    <li>• <strong>Process disruption:</strong> Industrial systems shutting down</li>
                  </ul>
                </div>
                
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2 text-elec-yellow dark:text-elec-yellow">Economic Consequences</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Equipment replacement and repair costs</li>
                    <li>• Business interruption and lost productivity</li>
                    <li>• Insurance claims and potential premium increases</li>
                    <li>• Investigation and remedial work expenses</li>
                    <li>• Potential legal liability for safety breaches</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-elec-yellow mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm text-red-700 dark:text-elec-yellow mb-1">Arc Flash Hazard</h4>
                    <p className="text-xs text-red-600 dark:text-elec-yellow">
                      Arc flash incidents can reach temperatures of 20,000°C (four times hotter than the sun's surface) and produce pressure waves capable of causing severe burns and hearing damage. Proper PPE and safety procedures are essential when working on live equipment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <InlineCheck
              id="short-circuit-dangers"
              question="What immediate danger can arc flash from a short circuit create?"
              options={[
                "It reduces the voltage in the circuit",
                "It can reach temperatures of 20,000°C causing severe burns",
                "It makes the current decrease safely",
                "It only affects the protective devices"
              ]}
              correctIndex={1}
              explanation="Arc flash from short circuits can reach temperatures of 20,000°C (four times hotter than the sun's surface) and can cause severe burns, hearing damage, and even death."
            />

            <Separator className="my-6" />

            {/* Section 4: Protective Devices and BS 7671 Requirements */}
            <div className="border-l-4 border-l-teal-500 bg-teal-500/5 p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">4</div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Protective Devices and Standards</h3>
              </div>
              
              <p className="text-sm text-white mb-4 leading-relaxed">
                BS 7671 requires appropriate protection against short circuit currents with specific performance criteria:
              </p>

              <div className="space-y-3 mb-4">
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2 text-elec-yellow dark:text-elec-yellow">Protective Device Types</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• <strong>Fuses (BS 88, BS 1361):</strong> Reliable interruption, high breaking capacity</li>
                    <li>• <strong>MCBs (BS EN 60898):</strong> Automatic reset, precise characteristics</li>
                    <li>• <strong>MCCBs (BS EN 60947):</strong> High current ratings, adjustable settings</li>
                    <li>• <strong>RCBOs:</strong> Combined overcurrent and earth fault protection</li>
                  </ul>
                </div>
                
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2 text-green-600 dark:text-green-400">BS 7671 Requirements</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• <strong>Breaking capacity:</strong> Must exceed prospective short circuit current</li>
                    <li>• <strong>Discrimination:</strong> Selective operation between protective devices</li>
                    <li>• <strong>Disconnection times:</strong> Maximum times specified for safety</li>
                    <li>• <strong>Let-through energy:</strong> Limitation of thermal and dynamic effects</li>
                  </ul>
                </div>
                
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2 text-purple-600 dark:text-elec-yellow">Key Performance Criteria</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• <strong>Prospective fault current (PFC):</strong> Maximum current available</li>
                    <li>• <strong>Breaking capacity (Icn/Icu):</strong> Maximum current device can interrupt</li>
                    <li>• <strong>Operating time:</strong> Speed of operation under fault conditions</li>
                    <li>• <strong>Energy limitation:</strong> Reducing thermal and mechanical stress</li>
                  </ul>
                </div>
              </div>

              <InlineCheck
                id="protective-devices"
                question="What must the breaking capacity of a protective device exceed?"
                options={[
                  "The normal operating current",
                  "The overload current",
                  "The prospective short circuit current",
                  "The earth fault current"
                ]}
                correctIndex={2}
                explanation="The breaking capacity of protective devices must exceed the prospective short circuit current to safely interrupt fault currents."
              />
            </div>

            <Separator className="my-6" />

            {/* Section 5: Detection and Testing */}
            <div className="border-l-4 border-l-indigo-500 bg-indigo-500/5 p-4 sm:p-6 rounded-r-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">5</div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Detection and Emergency Response</h3>
              </div>
              
              <p className="text-sm text-white mb-4 leading-relaxed">
                Proper detection methods and emergency procedures are critical for managing short circuit incidents safely:
              </p>

              <div className="space-y-3 mb-4">
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2 text-elec-yellow dark:text-elec-yellow">Detection Methods</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• <strong>Insulation resistance testing:</strong> Low readings indicate potential problems</li>
                    <li>• <strong>Visual inspection:</strong> Signs of overheating, burning, or damage</li>
                    <li>• <strong>Thermal imaging:</strong> Hot spots indicating high resistance joints</li>
                    <li>• <strong>Protective device operation:</strong> Repeated tripping indicates faults</li>
                  </ul>
                </div>
                
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2 text-orange-600 dark:text-elec-yellow">Emergency Response</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• <strong>Immediate isolation:</strong> Switch off supply if safe to do so</li>
                    <li>• <strong>Evacuation:</strong> Clear area of personnel if arc flash risk</li>
                    <li>• <strong>Fire suppression:</strong> Use appropriate extinguishing methods</li>
                    <li>• <strong>Medical attention:</strong> For any injuries from arc flash or shock</li>
                  </ul>
                </div>
                
                <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                  <h4 className="font-medium text-sm mb-2 text-red-600 dark:text-elec-yellow">Investigation Rules</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• <strong>Never re-energise:</strong> Until fault is found and rectified</li>
                    <li>• <strong>Systematic approach:</strong> Logical fault-finding methodology</li>
                    <li>• <strong>Safe isolation:</strong> Proper isolation and verification procedures</li>
                    <li>• <strong>Competent person:</strong> Qualified electrician to investigate</li>
                  </ul>
                </div>
              </div>
            </div>

            <InlineCheck
              id="short-circuit-response"
              question="What is the most important rule when investigating a short circuit fault?"
              options={[
                "Re-energise immediately to test the circuit",
                "Never re-energise until the fault is found and rectified",
                "Only use visual inspection methods",
                "Work on live circuits to save time"
              ]}
              correctIndex={1}
              explanation="The most important safety rule is to never re-energise a circuit that has experienced a short circuit until the fault has been found and properly rectified by a competent person."
            />
          </CardContent>
        </Card>

        {/* Real World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-[#121212] border-white/10">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Real World Example</h2>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 border-l-4 border-l-red-400 bg-red-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    <Flame className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-elec-yellow mb-2">Case Study: Lighting Circuit Short Circuit</h3>
                    <p className="text-xs sm:text-sm text-white">
                      During the installation of new LED downlights in an office ceiling, an electrician experienced a dramatic short circuit that tripped the lighting MCB and caused a small fire in the ceiling void.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-orange-400 bg-orange-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    <Zap className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow mb-2">The Incident:</p>
                    <p className="text-xs sm:text-sm text-white">
                      While fixing a recessed LED fitting to the ceiling, the electrician used a screw that was too long. The screw penetrated through the plasterboard and pinched the twin and earth cable supplying the lighting circuit. There was a loud bang, bright flash, and the lighting MCB tripped immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-emerald-400 bg-emerald-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    <Target className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow mb-2">What Happened:</p>
                    <p className="text-xs sm:text-sm text-white">
                      The screw had penetrated the cable insulation, causing the line and neutral conductors to come into contact through the metal screw. This created a short circuit with extremely low resistance, allowing a fault current of approximately 1,500A to flow for the brief moment before the 6A Type B MCB operated.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-purple-400 bg-purple-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    <AlertTriangle className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow mb-2">The Damage:</p>
                    <p className="text-xs sm:text-sm text-white">
                      The intense heat generated by the fault current caused the cable insulation to burn, creating smoke and a small fire in the ceiling void. The screw was welded to the cable by the arcing, and approximately 500mm of cable was damaged by heat. Fortunately, the ceiling insulation was mineral wool which did not ignite.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-emerald-400 bg-emerald-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    <Search className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-yellow-300 mb-2">The Investigation:</p>
                    <p className="text-xs sm:text-sm text-white">
                      The electrician immediately isolated the main switch and called the fire brigade as a precaution. Investigation revealed that the cable route had not been marked on the ceiling plan, and the electrician had not used a cable detector. The damaged section of cable was replaced, and all other new fixings were checked.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 border-l-4 border-l-green-400 bg-green-400/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    <Lightbulb className="w-4 h-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-300 mb-2">Lessons Learned:</p>
                    <ul className="text-xs sm:text-sm text-white space-y-1">
                      <li>• Always use cable detection equipment before drilling or screwing</li>
                      <li>• Mark cable routes clearly on installation drawings</li>
                      <li>• Use appropriate screw lengths for the application</li>
                      <li>• Install cables in safe zones where possible</li>
                      <li>• Protective devices operated correctly, preventing more serious damage</li>
                      <li>• Proper emergency response prevented escalation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">FAQs</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white mb-2 text-sm">What's the main difference between a short circuit and an overload?</h3>
                <p className="text-xs sm:text-sm text-white">A short circuit creates an unintended low-resistance path with very high current, while an overload is excessive current through the intended path due to too much load.</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium text-white mb-2 text-sm">How quickly do protective devices respond to short circuits?</h3>
                <p className="text-xs sm:text-sm text-white">MCBs and fuses can respond in milliseconds to short circuits, but the exact time depends on the fault current magnitude and device characteristics.</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium text-white mb-2 text-sm">Can I test for short circuits with the power on?</h3>
                <p className="text-xs sm:text-sm text-white">No, never test for short circuits on live circuits. Always isolate, verify isolation, and use insulation resistance testing methods.</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium text-white mb-2 text-sm">What causes most short circuit faults?</h3>
                <p className="text-xs sm:text-sm text-white">Common causes include damaged cable insulation, moisture ingress, incorrect connections, and physical damage to conductors.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Summary
            </h2>
            <p className="text-xs sm:text-sm text-white">
              Short circuit faults represent the most dangerous type of electrical fault, creating extremely low resistance paths that allow dangerous fault currents to flow. These can result from installation errors, mechanical damage, and equipment failures, causing intense arcing, fire risks, and potential injury. BS 7671 requires appropriate protective devices with sufficient breaking capacity to interrupt fault currents safely. Prevention relies on quality installation practices and proper maintenance, while systematic investigation following safe isolation procedures is crucial when faults occur.
            </p>
          </CardContent>
        </Card>

        <Quiz questions={quizQuestions} title="Test your knowledge of short circuits" />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between mt-6 sm:mt-8">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Previous: Open Circuits</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../2-3">
              <span className="hidden sm:inline">Next: 2.3 Earth Faults</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module7Section2_2;