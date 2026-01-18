import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
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
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 2</span>
              <span className="sm:hidden">Back</span>
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
              <span className="text-white/60">Section 2.6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Loose or Poor Connections
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
              Detecting, correcting and preventing loose or poor electrical connections
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h2 className="text-lg font-semibold text-white mb-3">In 30 seconds</h2>
            <div className="grid gap-4 sm:grid-cols-2 text-sm text-white/80">
              <div>
                <h3 className="font-medium text-white mb-2">Spot it</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Discolouration or burning smell</li>
                  <li>Warm outlets or accessories</li>
                  <li>Intermittent operation of equipment</li>
                  <li>High resistance in test readings</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">Use it</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Torque screwdriver with correct settings</li>
                  <li>Thermal imaging camera</li>
                  <li>Continuity and Zs testing</li>
                  <li>Visual inspection techniques</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-10">
            <h2 className="text-lg font-semibold text-white mb-3">Learning Outcomes</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
              <li>Define what loose or poor connections are in electrical circuits</li>
              <li>Identify the main causes of loose or poor connections</li>
              <li>Explain the dangers they create for people and property</li>
              <li>Understand how to detect, correct, and prevent this type of fault</li>
            </ul>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              What Are Loose or Poor Connections?
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>A loose connection occurs when a conductor is not securely fastened within a terminal, or the contact surface is not clean and tight enough to carry current effectively. Poor connections can also result from incorrect termination, such as too much insulation stripped away, or multiple conductors crammed into a terminal not designed for them.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-2">Types of poor connections:</h3>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Loose terminal screws allowing conductor movement</li>
                  <li>Oxidised or corroded contact surfaces</li>
                  <li>Oversized conductors forced into undersized terminals</li>
                  <li>Insufficient conductor insertion depth</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <h3 className="font-medium text-elec-yellow mb-2">Physics principle:</h3>
                <p className="text-sm">Poor connections create high resistance. Using Ohm's Law (P = I²R), even small increases in resistance cause significant heat generation.</p>
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
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Causes of Loose or Poor Connections
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <h3 className="font-medium text-orange-400 mb-2">Installation factors:</h3>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Poor workmanship and inadequate torque settings</li>
                    <li>Using incorrect tools or techniques</li>
                    <li>Rushed installation schedules</li>
                    <li>Inadequate quality control procedures</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <h3 className="font-medium text-purple-400 mb-2">Environmental factors:</h3>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Vibration in industrial or transport settings</li>
                    <li>Thermal cycling from load changes</li>
                    <li>Corrosion in humid environments</li>
                    <li>Mechanical stress over time</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-2">Progressive deterioration cycle:</h3>
                <p className="text-sm">Loose connections create a cycle: increased resistance → heat generation → thermal expansion → further loosening → more resistance. This process accelerates over time.</p>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <h3 className="font-medium text-elec-yellow mb-2">Manufacturer specifications:</h3>
                <p className="text-sm">Always follow torque settings - typically 1.0-1.2 Nm for 2.5mm² terminals, 1.2-1.5 Nm for 4mm² terminals.</p>
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
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Dangers and Consequences
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Loose connections cause resistance, which generates heat according to I²R losses. The consequences escalate progressively:</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <h3 className="font-medium text-orange-400 mb-2">Immediate risks:</h3>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Overheating of terminals and accessories</li>
                    <li>Voltage drops affecting equipment performance</li>
                    <li>Increased energy consumption and costs</li>
                    <li>Intermittent operation causing disruption</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h3 className="font-medium text-red-400 mb-2">Progressive damage:</h3>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Arcing causing carbonisation</li>
                    <li>Insulation degradation from heat</li>
                    <li>Terminal damage requiring replacement</li>
                    <li>Fire ignition of surrounding materials</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="font-medium text-red-400 mb-2">Critical safety point:</h3>
                <p className="text-sm">Loose connections can cause fires without tripping protective devices because increased resistance may not create enough excess current to operate overcurrent protection.</p>
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
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Detection, Correction, and Prevention
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Early detection and proper correction techniques are essential for preventing serious consequences:</p>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 mb-4">
                <h3 className="font-medium text-green-400 mb-2">Detection methods:</h3>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Visual inspection for discolouration, heat damage, or melted insulation</li>
                  <li>Thermal imaging cameras to identify hot spots</li>
                  <li>High resistance readings in continuity or Zs tests</li>
                  <li>Unusual odours, sounds, or warm components</li>
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <h3 className="font-medium text-blue-400 mb-2">Correction process:</h3>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Safe isolation of the affected circuit</li>
                    <li>Clean contact surfaces of oxidation or corrosion</li>
                    <li>Re-terminate conductor with correct torque</li>
                    <li>Test and verify repair effectiveness</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <h3 className="font-medium text-purple-400 mb-2">Prevention strategy:</h3>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Use calibrated torque tools and follow specifications</li>
                    <li>Implement regular inspection schedules</li>
                    <li>Maintain quality installation procedures</li>
                    <li>Ensure proper training and supervision</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <h3 className="font-medium text-elec-yellow mb-2">Professional best practice:</h3>
                <p className="text-sm">Always retest after correction and document findings. High resistance readings often indicate connection problems before visual signs appear.</p>
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
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Practical Guidance</h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <ul className="list-disc pl-6 space-y-2 text-sm text-white/80">
                <li>Always check every connection during installation, not just assume it is secure</li>
                <li>Use the correct screwdriver and torque settings recommended by manufacturers</li>
                <li>Inspect for signs of overheating when carrying out maintenance or EICRs</li>
                <li>Record any loose connections found and confirm corrective action with a retest</li>
              </ul>
            </div>
          </section>

          {/* Real-World Case Study */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Real-World Example: Near-Miss Fire Incident</h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
              <h3 className="font-medium text-amber-400 mb-3">Retail Shop Case Study</h3>
              <p className="text-sm text-white/80 mb-4">
                In a busy retail clothing shop, staff noticed a burning smell during peak Saturday trading. Investigation revealed a loose neutral conductor in a socket terminal that had overheated, melting the faceplate and scorching the wall behind.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-2 text-sm">Timeline of events:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-white/70">
                    <li>Burning smell noticed over 2-3 hours</li>
                    <li>Socket outlet becoming warm to touch</li>
                    <li>Till equipment operating intermittently</li>
                    <li>No circuit breaker trips occurring</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-2 text-sm">Investigation findings:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-white/70">
                    <li>Terminal screw only finger-tight</li>
                    <li>Severe carbonisation around terminal</li>
                    <li>Socket faceplate partially melted</li>
                    <li>Wall plasterboard scorched</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10 mb-4">
                <h4 className="font-medium text-white mb-2 text-sm">Root cause:</h4>
                <p className="text-xs text-white/70">
                  Poor termination during original installation, worsened by thermal cycling from high-current till equipment, with no routine maintenance programme in place.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <h4 className="font-medium text-elec-yellow mb-2 text-sm">Lesson:</h4>
                <p className="text-xs text-white/70">
                  Without quick response, this could have ignited the wall cavity, potentially causing a major fire in a crowded shopping centre. Quality installation and routine maintenance are essential fire prevention measures.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-medium text-white mb-2">Q: Do loose connections always cause immediate faults?</h3>
                <p className="text-sm text-white/70">A: No, they often develop slowly and may only show symptoms after prolonged use.</p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-medium text-white mb-2">Q: Can vibration cause connections to loosen?</h3>
                <p className="text-sm text-white/70">A: Yes, particularly in industrial, commercial, or transport applications.</p>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-medium text-white mb-2">Q: How can electricians prevent loose connections?</h3>
                <p className="text-sm text-white/70">A: By using correct torque settings, good workmanship, and thorough inspection/testing.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-gradient-to-r from-elec-yellow/10 to-red-500/10 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Professional Knowledge Summary</h2>

              <div className="grid gap-3 sm:grid-cols-2 mb-4">
                <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                  <h3 className="font-medium text-elec-yellow mb-2 text-sm">Definition & Physics:</h3>
                  <p className="text-xs text-white/70">
                    Conductors not securely fastened create high resistance. Using P = I²R, even small resistance increases cause significant heat generation.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h3 className="font-medium text-red-400 mb-2 text-sm">Hidden Danger:</h3>
                  <p className="text-xs text-white/70">
                    Can cause fires without tripping protective devices. Heat generation occurs without excess current draw.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <h3 className="font-medium text-orange-400 mb-2 text-sm">Progressive Nature:</h3>
                  <p className="text-xs text-white/70">
                    Creates deterioration cycle: poor connection → resistance → heat → expansion → worse connection → more heat.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h3 className="font-medium text-green-400 mb-2 text-sm">Detection Methods:</h3>
                  <p className="text-xs text-white/70">
                    Visual inspection, thermal imaging, high resistance in tests, burning odours, and warm components.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <h3 className="font-medium text-purple-400 mb-2 text-sm">Common Causes:</h3>
                  <p className="text-xs text-white/70">
                    Poor workmanship, incorrect torque settings, vibration and thermal cycling.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <h3 className="font-medium text-blue-400 mb-2 text-sm">Prevention & Correction:</h3>
                  <p className="text-xs text-white/70">
                    Calibrated torque tools, regular maintenance, quality control, safe isolation, clean and re-terminate, test and document.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="font-medium text-red-400 mb-2 text-sm">Critical Professional Insight:</h3>
                <p className="text-xs text-white/70">
                  Loose connections are a leading cause of electrical fires, often developing slowly over years without obvious symptoms. The physics is unforgiving: poor connections create resistance, resistance creates heat, and heat causes damage that can ignite surrounding materials. Quality installation and regular maintenance are the only defences against this progressive threat to life and property.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-5">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Incorrect Polarity
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Complete Section 2
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section2_6;
