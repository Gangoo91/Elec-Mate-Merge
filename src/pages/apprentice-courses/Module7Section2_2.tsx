import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span>Section 2.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Short Circuits
            </h1>
            <p className="text-white/60 max-w-xl mx-auto">
              Understanding detection, causes, and rectification of short circuit faults
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/80 text-sm leading-relaxed">
              A <strong className="text-white">short circuit fault</strong> occurs when current flows along an unintended path with very low resistance, causing dangerously high current levels. These require immediate attention and protective device operation.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Definition and Characteristics
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                A short circuit occurs when live conductors at different potentials come into direct contact, either physically or through a conductive path with very low resistance. This creates an unintended path that bypasses the normal load, allowing current to flow at levels far exceeding the circuit's design capacity.
              </p>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-3">Key Characteristics</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    Extremely low resistance path (typically less than 1 ohm)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    Fault current many times higher than normal operating current
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    Immediate operation of protective devices (fuses, MCBs)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    Potential for arcing, heating, and fire
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    Voltage drop to near zero at the fault point
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-3">Types of Short Circuit Faults</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <strong className="text-white">Line to Neutral:</strong> Most common in single-phase systems
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <strong className="text-white">Line to Line:</strong> Between phase conductors in three-phase systems
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <strong className="text-white">Line to Earth:</strong> Phase conductor touching earthed metalwork
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <strong className="text-white">Three-phase:</strong> All phases short-circuited together
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <strong className="text-white">Arcing faults:</strong> Intermittent contact causing arcing
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="text-sm text-red-200/80">
                  <strong className="text-red-300">Immediate Danger:</strong> Short circuits can generate fault currents of thousands of amperes within milliseconds, creating intense heat, dangerous arcing, and potential for explosion or fire.
                </p>
              </div>
            </div>

            <div className="mt-6">
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
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Causes and Contributing Factors
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Short circuits can result from numerous factors, often involving a combination of installation errors, environmental conditions, and equipment failures:
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-medium text-elec-yellow mb-3 text-sm">Installation Faults</h4>
                  <ul className="space-y-1.5 text-sm">
                    <li>• Incorrect or careless installation practices</li>
                    <li>• Stripped insulation left too long at terminations</li>
                    <li>• Poor cable management causing conductor contact</li>
                    <li>• Inadequate separation between live parts</li>
                    <li>• Wrong cable types for the application</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-medium text-elec-yellow mb-3 text-sm">Mechanical Damage</h4>
                  <ul className="space-y-1.5 text-sm">
                    <li>• Drilling or nailing through cables</li>
                    <li>• Cable crushing during construction work</li>
                    <li>• Impact damage from vehicles or machinery</li>
                    <li>• Excessive bending or pulling forces</li>
                    <li>• Vibration causing insulation breakdown</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-medium text-elec-yellow mb-3 text-sm">Environmental Factors</h4>
                  <ul className="space-y-1.5 text-sm">
                    <li>• Moisture ingress causing tracking and flashover</li>
                    <li>• Overheating leading to insulation failure</li>
                    <li>• UV radiation degrading cable insulation</li>
                    <li>• Chemical attack in industrial environments</li>
                    <li>• Rodent damage to cable insulation</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-medium text-elec-yellow mb-3 text-sm">Equipment Failures</h4>
                  <ul className="space-y-1.5 text-sm">
                    <li>• Internal faults in electrical equipment</li>
                    <li>• Insulation breakdown in motors and transformers</li>
                    <li>• Failed switching devices creating short paths</li>
                    <li>• Manufacturing defects in electrical components</li>
                    <li>• Age-related deterioration of materials</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
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
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Dangers and Immediate Effects
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Short circuits represent one of the most dangerous electrical fault conditions, capable of causing immediate and severe consequences:
              </p>

              <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                <h4 className="font-medium text-red-400 mb-3">Immediate Physical Dangers</h4>
                <ul className="space-y-1.5 text-sm text-red-200/80">
                  <li>• <strong className="text-red-300">Arcing:</strong> Intense electrical arcs reaching thousands of degrees</li>
                  <li>• <strong className="text-red-300">Fire risk:</strong> Ignition of surrounding materials</li>
                  <li>• <strong className="text-red-300">Explosion:</strong> Rapid heating causing metal expansion and arc blast</li>
                  <li>• <strong className="text-red-300">Toxic gases:</strong> Burning insulation releasing harmful fumes</li>
                  <li>• <strong className="text-red-300">Electric shock:</strong> Touch potentials and step potentials</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-3">Equipment and System Effects</h4>
                <ul className="space-y-1.5 text-sm">
                  <li>• <strong className="text-white">Equipment destruction:</strong> Severe damage to electrical components</li>
                  <li>• <strong className="text-white">System instability:</strong> Voltage dips affecting other circuits</li>
                  <li>• <strong className="text-white">Power outages:</strong> Protective device operation causing loss of supply</li>
                  <li>• <strong className="text-white">Data loss:</strong> Sudden power interruption to IT systems</li>
                  <li>• <strong className="text-white">Process disruption:</strong> Industrial systems shutting down</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="text-sm text-red-200/80">
                  <strong className="text-red-300">Arc Flash Hazard:</strong> Arc flash incidents can reach temperatures of 20,000°C (four times hotter than the sun's surface) and produce pressure waves capable of causing severe burns and hearing damage. Proper PPE and safety procedures are essential when working on live equipment.
                </p>
              </div>
            </div>

            <div className="mt-6">
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
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Protective Devices and Standards
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                BS 7671 requires appropriate protection against short circuit currents with specific performance criteria:
              </p>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-elec-yellow mb-3">Protective Device Types</h4>
                <ul className="space-y-1.5 text-sm">
                  <li>• <strong className="text-white">Fuses (BS 88, BS 1361):</strong> Reliable interruption, high breaking capacity</li>
                  <li>• <strong className="text-white">MCBs (BS EN 60898):</strong> Automatic reset, precise characteristics</li>
                  <li>• <strong className="text-white">MCCBs (BS EN 60947):</strong> High current ratings, adjustable settings</li>
                  <li>• <strong className="text-white">RCBOs:</strong> Combined overcurrent and earth fault protection</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-3">BS 7671 Requirements</h4>
                <ul className="space-y-1.5 text-sm">
                  <li>• <strong className="text-white">Breaking capacity:</strong> Must exceed prospective short circuit current</li>
                  <li>• <strong className="text-white">Discrimination:</strong> Selective operation between protective devices</li>
                  <li>• <strong className="text-white">Disconnection times:</strong> Maximum times specified for safety</li>
                  <li>• <strong className="text-white">Let-through energy:</strong> Limitation of thermal and dynamic effects</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
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
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Detection and Emergency Response
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Proper detection methods and emergency procedures are critical for managing short circuit incidents safely:
              </p>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-elec-yellow mb-3">Detection Methods</h4>
                <ul className="space-y-1.5 text-sm">
                  <li>• <strong className="text-white">Insulation resistance testing:</strong> Low readings indicate potential problems</li>
                  <li>• <strong className="text-white">Visual inspection:</strong> Signs of overheating, burning, or damage</li>
                  <li>• <strong className="text-white">Thermal imaging:</strong> Hot spots indicating high resistance joints</li>
                  <li>• <strong className="text-white">Protective device operation:</strong> Repeated tripping indicates faults</li>
                </ul>
              </div>

              <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/30">
                <h4 className="font-medium text-orange-300 mb-3">Emergency Response</h4>
                <ul className="space-y-1.5 text-sm text-orange-200/80">
                  <li>• <strong className="text-orange-300">Immediate isolation:</strong> Switch off supply if safe to do so</li>
                  <li>• <strong className="text-orange-300">Evacuation:</strong> Clear area of personnel if arc flash risk</li>
                  <li>• <strong className="text-orange-300">Fire suppression:</strong> Use appropriate extinguishing methods</li>
                  <li>• <strong className="text-orange-300">Medical attention:</strong> For any injuries from arc flash or shock</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <h4 className="font-medium text-red-300 mb-2">Investigation Rules</h4>
                <ul className="space-y-1.5 text-sm text-red-200/80">
                  <li>• <strong className="text-red-300">Never re-energise:</strong> Until fault is found and rectified</li>
                  <li>• <strong className="text-red-300">Systematic approach:</strong> Logical fault-finding methodology</li>
                  <li>• <strong className="text-red-300">Safe isolation:</strong> Proper isolation and verification procedures</li>
                  <li>• <strong className="text-red-300">Competent person:</strong> Qualified electrician to investigate</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
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
            </div>
          </section>

          {/* Real World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real World Example
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <h4 className="font-medium text-red-300 mb-2">Case Study: Lighting Circuit Short Circuit</h4>
                <p className="text-sm text-red-200/80">
                  During the installation of new LED downlights in an office ceiling, an electrician experienced a dramatic short circuit that tripped the lighting MCB and caused a small fire in the ceiling void.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
                <h4 className="font-medium text-orange-300 mb-2">The Incident</h4>
                <p className="text-sm text-orange-200/80">
                  While fixing a recessed LED fitting to the ceiling, the electrician used a screw that was too long. The screw penetrated through the plasterboard and pinched the twin and earth cable supplying the lighting circuit. There was a loud bang, bright flash, and the lighting MCB tripped immediately.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border-l-2 border-elec-yellow/50">
                <h4 className="font-medium text-elec-yellow mb-2">What Happened</h4>
                <p className="text-sm text-elec-yellow/80">
                  The screw had penetrated the cable insulation, causing the line and neutral conductors to come into contact through the metal screw. This created a short circuit with extremely low resistance, allowing a fault current of approximately 1,500A to flow for the brief moment before the 6A Type B MCB operated.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500/50">
                <h4 className="font-medium text-purple-300 mb-2">The Damage</h4>
                <p className="text-sm text-purple-200/80">
                  The intense heat generated by the fault current caused the cable insulation to burn, creating smoke and a small fire in the ceiling void. The screw was welded to the cable by the arcing, and approximately 500mm of cable was damaged by heat. Fortunately, the ceiling insulation was mineral wool which did not ignite.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <h4 className="font-medium text-green-300 mb-2">Lessons Learned</h4>
                <ul className="text-sm text-green-200/80 space-y-1">
                  <li>• Always use cable detection equipment before drilling or screwing</li>
                  <li>• Mark cable routes clearly on installation drawings</li>
                  <li>• Use appropriate screw lengths for the application</li>
                  <li>• Install cables in safe zones where possible</li>
                  <li>• Protective devices operated correctly, preventing more serious damage</li>
                  <li>• Proper emergency response prevented escalation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-2">What's the main difference between a short circuit and an overload?</h4>
                <p className="text-sm text-white/70">A short circuit creates an unintended low-resistance path with very high current, while an overload is excessive current through the intended path due to too much load.</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-2">How quickly do protective devices respond to short circuits?</h4>
                <p className="text-sm text-white/70">MCBs and fuses can respond in milliseconds to short circuits, but the exact time depends on the fault current magnitude and device characteristics.</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-2">Can I test for short circuits with the power on?</h4>
                <p className="text-sm text-white/70">No, never test for short circuits on live circuits. Always isolate, verify isolation, and use insulation resistance testing methods.</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-medium text-white mb-2">What causes most short circuit faults?</h4>
                <p className="text-sm text-white/70">Common causes include damaged cable insulation, moisture ingress, incorrect connections, and physical damage to conductors.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-5 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-white">Summary</h3>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                Short circuit faults represent the most dangerous type of electrical fault, creating extremely low resistance paths that allow dangerous fault currents to flow. These can result from installation errors, mechanical damage, and equipment failures, causing intense arcing, fire risks, and potential injury. BS 7671 requires appropriate protective devices with sufficient breaking capacity to interrupt fault currents safely. Prevention relies on quality installation practices and proper maintenance, while systematic investigation following safe isolation procedures is crucial when faults occur.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test your knowledge of short circuits" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto min-h-[48px] touch-manipulation active:scale-[0.98] justify-center sm:justify-start"
              asChild
            >
              <Link to="../2-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Open Circuits
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto min-h-[48px] touch-manipulation active:scale-[0.98] bg-elec-yellow hover:bg-elec-yellow/90 text-black justify-center sm:justify-start"
              asChild
            >
              <Link to="../2-3">
                Next: Earth Faults
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section2_2;
