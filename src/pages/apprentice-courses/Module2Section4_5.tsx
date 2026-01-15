import { ArrowLeft, Zap, CheckCircle, Plug, Battery, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Where AC and DC Are Used in Real Installations - Level 2 Module 2 Section 4.5";
const DESCRIPTION = "Learn where AC and DC are typically used in electrical installations - distribution, controls, conversion equipment and practical selection guidance.";

const quickCheckQuestions = [
  {
    id: "ac-applications",
    question: "Which is typically supplied as AC in UK installations?",
    options: [
      "ELV control circuits",
      "Mains distribution",
      "Battery strings",
      "PV module output"
    ],
    correctIndex: 1,
    explanation: "Public supply and most building distribution are AC (230/400 V) - this powers sockets, lighting, HVAC and motors."
  },
  {
    id: "dc-applications",
    question: "A fire alarm loop is most commonly:",
    options: [
      "230 V AC",
      "400 V three‑phase",
      "SELV/PELV DC",
      "50 Hz variable"
    ],
    correctIndex: 2,
    explanation: "Fire alarms commonly use ELV DC (often 24 V) for control circuits and field devices."
  },
  {
    id: "conversion-equipment",
    question: "What does a VFD (inverter) primarily do?",
    options: [
      "Increase voltage only",
      "Convert AC to DC to AC at a new frequency",
      "Measure insulation",
      "Provide earthing"
    ],
    correctIndex: 1,
    explanation: "VFDs rectify AC to DC then invert to a controlled AC frequency for motor speed control."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which is typically supplied as AC in UK installations?",
    options: ["ELV control circuits", "Mains distribution", "Battery strings", "PV module output"],
    correctAnswer: 1,
    explanation: "Public supply and most building distribution are AC (230/400 V).",
  },
  {
    id: 2,
    question: "A fire alarm loop is most commonly:",
    options: ["230 V AC", "400 V three‑phase", "SELV/PELV DC", "50 Hz variable"],
    correctAnswer: 2,
    explanation: "Fire alarms commonly use ELV DC (often 24 V).",
  },
  {
    id: 3,
    question: "What does a VFD (inverter) primarily do?",
    options: ["Increase voltage only", "Convert AC to DC to AC at a new frequency", "Measure insulation", "Provide earthing"],
    correctAnswer: 1,
    explanation: "VFDs rectify AC to DC then invert to a controlled AC frequency for motor speed.",
  },
  {
    id: 4,
    question: "Which is a typical DC application?",
    options: ["Ring final circuits", "Lighting radial", "PV string output", "DOL motor starter"],
    correctAnswer: 2,
    explanation: "PV panels create DC strings before the inverter.",
  },
  {
    id: 5,
    question: "Emergency lighting central battery systems are usually:",
    options: ["400 V AC", "SELV/PELV DC", "High‑frequency AC", "Three‑phase DC"],
    correctAnswer: 1,
    explanation: "Many emergency lighting systems distribute ELV DC from a central battery.",
  },
  {
    id: 6,
    question: "What is the AC supply frequency in the UK?",
    options: ["60 Hz", "25 Hz", "50 Hz", "400 Hz"],
    correctAnswer: 2,
    explanation: "UK mains frequency is nominally 50 Hz.",
  },
  {
    id: 7,
    question: "Which statement about EV charging is true?",
    options: [
      "All EV charging is AC",
      "DC rapid chargers deliver DC to the vehicle",
      "EVs cannot charge from DC",
      "EVSE never contains rectifiers/inverters",
    ],
    correctAnswer: 1,
    explanation: "Rapid chargers provide DC directly to the vehicle's battery via the CCS/CHAdeMO interface.",
  },
  {
    id: 8,
    question: "Control panels commonly use which for PLC I/O?",
    options: ["11 kV AC", "230 V AC only", "24 V DC", "400 Hz AC"],
    correctAnswer: 2,
    explanation: "24 V DC is common for control/automation I/O.",
  },
  {
    id: 9,
    question: "Which of the following uses DC at the output stage?",
    options: ["Ring final circuit", "Three-phase motor starter", "Solar PV panel array", "Standard lighting circuit"],
    correctAnswer: 2,
    explanation: "Solar PV panels generate DC electricity which is then converted to AC by an inverter.",
  },
  {
    id: 10,
    question: "Why is AC preferred for long-distance power transmission?",
    options: [
      "AC cannot be transformed to different voltages",
      "AC is easier to transform to higher/lower voltages using transformers",
      "DC is always safer",
      "AC has no losses"
    ],
    correctAnswer: 1,
    explanation: "AC can be easily transformed to high voltages for efficient transmission over long distances, then stepped down for safe use.",
  }
];

const faqs = [
  {
    question: "Why do we use AC for mains distribution?",
    answer: "AC is easier to transform to different voltages using transformers, making it efficient for long-distance transmission. Power stations generate high voltage AC, step it down for distribution, and step it down again for safe use in buildings."
  },
  {
    question: "When should I use DC instead of AC?",
    answer: "DC is commonly used for control circuits (24V), electronics, batteries, PV strings, and some specialty applications. It's preferred when you need steady voltage, battery compatibility, or specific control functions."
  },
  {
    question: "What equipment converts between AC and DC?",
    answer: "Rectifiers convert AC to DC (like phone chargers), inverters convert DC to AC (like solar inverters), and VFDs convert AC to DC then back to variable-frequency AC for motor control."
  },
  {
    question: "How do I know if equipment needs AC or DC?",
    answer: "Always check the nameplate or rating label on equipment. It will specify the voltage, frequency (if AC), and whether it's AC or DC. When in doubt, check the manufacturer's documentation."
  },
  {
    question: "Are there special safety considerations for DC systems?",
    answer: "Yes - DC can sustain arcs more readily than AC, so use DC-rated switching devices. Also ensure proper segregation of ELV/SELV from LV circuits, and provide clear labelling for multiple sources."
  },
  {
    question: "What's important about RCD selection with DC components?",
    answer: "Standard AC RCDs may not work correctly with DC residual currents. For systems with DC components (like EV chargers, VFDs), use appropriate RCD types (A, F, or B) as specified in BS 7671."
  }
];

const Module2Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Where AC and DC Are Used in Real Installations
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Learn practical AC and DC applications in electrical installations
          </p>
        </header>

        {/* Summary Box */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
          <p className="text-sm text-white/80 leading-relaxed">
            <strong className="text-elec-yellow">Key Points:</strong> AC powers 230/400V mains distribution for sockets, lighting, HVAC and motors.
            DC is used for ELV controls, electronics, PV strings, BESS and EV charger electronics. Conversion equipment (rectifiers, inverters, SMPS) bridges the two systems.
          </p>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <p className="text-white/70 mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white/80">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify typical AC applications in buildings and industry</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify typical DC applications including ELV, PV and controls</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise equipment that converts AC↔DC (PSUs, inverters, EVSE)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply BS 7671 selection and erection guidance for AC/DC circuits</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Plan safe isolation and segregation for mixed AC/DC installations</span>
            </li>
          </ul>
        </section>

        {/* Section 2: AC Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            AC Applications in Electrical Installations
          </h2>
          <div className="space-y-4 text-white/80">
            <p>
              AC (Alternating Current) is the backbone of electrical distribution in the UK.
              It's used for mains electricity supply and most building installations.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-bold text-elec-yellow">Distribution & General Loads</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Mains supply:</strong> 230V single-phase, 400V three-phase</li>
                  <li><strong>Consumer units:</strong> DB distribution to final circuits</li>
                  <li><strong>Socket circuits:</strong> Ring finals and radial circuits</li>
                  <li><strong>Lighting:</strong> Circuits with electronic drivers and ballasts</li>
                  <li><strong>Fixed appliances:</strong> Ovens, HVAC, immersion heaters</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-elec-yellow">Motors & Variable Speed</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Induction motors:</strong> Single and three-phase supplies</li>
                  <li><strong>VFDs/inverters:</strong> For pumps, fans, conveyors</li>
                  <li><strong>UPS output:</strong> Often AC for critical loads</li>
                  <li><strong>Generators:</strong> Standby AC power systems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[0]} />
        </div>

        {/* Section 3: DC Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            DC Applications in Electrical Installations
          </h2>
          <div className="space-y-4 text-white/80">
            <p>
              DC (Direct Current) is widely used for control systems, electronics, renewable energy,
              and modern technologies like EV charging.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-bold text-elec-yellow">ELV, Control & Electronics</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Control circuits:</strong> SELV/PELV 24V DC for PLC I/O</li>
                  <li><strong>Fire & security:</strong> Alarm systems, access control</li>
                  <li><strong>Emergency lighting:</strong> Central battery systems</li>
                  <li><strong>Data systems:</strong> PoE, networking equipment</li>
                  <li><strong>Electronic PSUs:</strong> For IT and AV equipment</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-elec-yellow">Generation, Storage & EV</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>PV strings:</strong> DC output from solar panels</li>
                  <li><strong>Battery storage:</strong> BESS and UPS systems</li>
                  <li><strong>EV charging:</strong> DC rapid/ultra-rapid chargers</li>
                  <li><strong>DC busbars:</strong> Data centres and telecoms</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[1]} />
        </div>

        {/* Section 4: Conversion Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            AC/DC Conversion Equipment
          </h2>
          <div className="space-y-4 text-white/80">
            <p>
              Many modern installations include equipment that converts between AC and DC.
              Understanding these conversion processes is essential for proper selection and installation.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">AC to DC Conversion</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                  <li><strong>Rectifiers:</strong> Convert AC mains to DC supply</li>
                  <li><strong>Phone chargers:</strong> 230V AC to low voltage DC</li>
                  <li><strong>DC power supplies:</strong> For electronic equipment</li>
                  <li><strong>Battery chargers:</strong> UPS and emergency systems</li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">DC to AC Conversion</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                  <li><strong>Solar inverters:</strong> PV DC to mains AC</li>
                  <li><strong>UPS systems:</strong> Battery DC to load AC</li>
                  <li><strong>VFDs:</strong> AC→DC→variable frequency AC</li>
                  <li><strong>EV chargers:</strong> Internal AC/DC conversion</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
              <p className="text-yellow-300">
                <strong>Practical Tip:</strong> VFDs first convert AC to DC, then back to variable-frequency AC
                for precise motor speed control. This is why they can create harmonics and DC components
                that affect RCD selection.
              </p>
            </div>
          </div>
        </section>

        <div className="mb-10">
          <InlineCheck {...quickCheckQuestions[2]} />
        </div>

        {/* Section 5: Selection and Safety */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Selection Criteria and Safety Considerations
          </h2>
          <div className="space-y-4 text-white/80">
            <p>
              Proper selection of equipment and safety measures is crucial when working with mixed AC/DC installations.
              Key considerations include device ratings, isolation methods, and protective devices.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-elec-yellow">Equipment Selection</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Check nameplates for AC/DC rating, voltage range, and frequency</li>
                  <li>Verify IP ratings for environmental conditions</li>
                  <li>Consider power electronics impacts: harmonics, EMC, inrush currents</li>
                  <li>Select appropriate cable types and sizes for AC vs DC applications</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-elec-yellow">Safety Considerations</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>DC can sustain arcs - use DC-rated switching devices where required</li>
                  <li>Segregate ELV/SELV from LV conductors per BS 7671</li>
                  <li>Provide clear labelling for multiple sources (PV, battery, mains)</li>
                  <li>Plan isolation procedures for safe working on mixed systems</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <p className="text-elec-yellow">
                  <strong>Safety Alert:</strong> Always isolate, lock-off and prove dead before working.
                  DC systems can sustain arcs; use suitable PPE, tools and CAT-rated instruments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Practical Guidance for Apprentices
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">On Site Application</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">When Installing AC Systems</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-white/70">
                    <li>Check supply characteristics (230V/400V, TN/TT system)</li>
                    <li>Consider three-phase balance for motor loads</li>
                    <li>Account for power factor and harmonics</li>
                    <li>Ensure appropriate RCD types for loads</li>
                  </ul>
                </div>
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">When Installing DC Systems</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-elec-yellow/80">
                    <li>Verify polarity and maintain consistent marking</li>
                    <li>Use DC-rated switching devices where required</li>
                    <li>Plan for arc-resistant isolation methods</li>
                    <li>Segregate from AC circuits as per BS 7671</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Common Mistakes to Avoid</h3>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <ul className="list-disc pl-4 space-y-2 text-sm text-white/70">
                  <li><strong>Assuming all loads are AC:</strong> Always check equipment nameplates</li>
                  <li><strong>Mixing circuits incorrectly:</strong> Don't combine ELV with LV without barriers</li>
                  <li><strong>Wrong RCD selection:</strong> Consider DC components when selecting type A/F/B</li>
                  <li><strong>Inadequate labelling:</strong> Clearly mark all sources and isolation points</li>
                  <li><strong>Ignoring conversion equipment:</strong> Account for harmonics and EMC effects</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Building Your Understanding</h3>
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <ul className="list-disc pl-4 space-y-2 text-sm text-elec-yellow/80">
                  <li><strong>Study nameplates:</strong> Learn to read equipment ratings and requirements</li>
                  <li><strong>Understand conversion:</strong> How rectifiers, inverters, and VFDs work</li>
                  <li><strong>Practice identification:</strong> Recognise AC vs DC applications on site</li>
                  <li><strong>Learn BS 7671:</strong> Segregation and selection requirements</li>
                  <li><strong>Safety first:</strong> Always plan isolation before working on any system</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-white/10">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pocket Guide */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            AC/DC Applications Pocket Guide
          </h2>
          <p className="text-sm text-white/70 mb-4">
            Quick identification and selection guide for apprentice electricians
          </p>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <Plug className="w-4 h-4" />
                  Typical AC Uses
                </h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>• 230V sockets, lighting, small appliances</li>
                  <li>• 400V motors, HVAC, industrial equipment</li>
                  <li>• Generator backup systems</li>
                  <li>• VFD input (before conversion)</li>
                  <li>• UPS output to critical loads</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <Battery className="w-4 h-4" />
                  Typical DC Uses
                </h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>• 24V PLC/BMS control circuits</li>
                  <li>• Fire/security alarm systems</li>
                  <li>• PV strings (before inverter)</li>
                  <li>• Battery storage systems (BESS)</li>
                  <li>• EV rapid charging (50kW+)</li>
                  <li>• Emergency lighting batteries</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-3 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Quick ID Checks</h4>
                <ul className="space-y-1 text-elec-yellow/80 text-xs">
                  <li>• <strong>Nameplate:</strong> Look for AC/DC, V rating, Hz</li>
                  <li>• <strong>Waveform symbol:</strong> ~ = AC, ⎓ = DC</li>
                  <li>• <strong>Cable colours:</strong> AC = Brown/Blue/G&Y</li>
                  <li>• <strong>Polarity:</strong> DC = +/− markings</li>
                  <li>• <strong>Frequency:</strong> 50Hz = AC, blank = DC</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Safety Reminders
                </h4>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>• DC can sustain arcs - use DC-rated MCBs</li>
                  <li>• Segregate ELV/SELV from LV circuits</li>
                  <li>• Label all sources (PV/Battery/Mains)</li>
                  <li>• RCD type: A/F/B for DC components</li>
                  <li>• Plan isolation for multiple sources</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="text-center">
                <p className="font-semibold text-white">AC→DC</p>
                <p className="text-white/70">Rectifier, PSU, Charger</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-white">DC→AC</p>
                <p className="text-white/70">Inverter, UPS, VFD output</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-white">AC→DC→AC</p>
                <p className="text-white/70">VFD, Variable speed drive</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge: AC and DC Applications"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../4-4"><ArrowLeft className="w-4 h-4 mr-2" />Previous</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../4-6">Next<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Module2Section4_5;
