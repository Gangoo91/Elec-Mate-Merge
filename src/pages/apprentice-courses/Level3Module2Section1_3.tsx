/**
 * Level 3 Module 2 Section 1.3 - BS7671 Sustainability Considerations
 *
 * IET Wiring Regulations requirements for sustainable electrical installations
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "BS7671 Sustainability Considerations - Level 3 Module 2 Section 1.3";
const DESCRIPTION = "Understanding BS7671 18th Edition requirements for sustainable electrical installations. Energy efficiency and environmental considerations in wiring regulations.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Which chapter of BS7671 specifically addresses prosumer installations like solar PV?",
    options: [
      "Chapter 41",
      "Chapter 52",
      "Chapter 64",
      "Chapter 71"
    ],
    correctIndex: 2,
    explanation: "Chapter 64 of BS7671 covers prosumer's low voltage electrical installations, including requirements for solar PV, battery storage, and other generating sources."
  },
  {
    id: "check-2",
    question: "What does BS7671 require regarding energy efficiency in electrical installations?",
    options: [
      "Nothing - it only covers safety",
      "Installations should be designed for energy efficiency where practicable",
      "All installations must include solar panels",
      "Only commercial buildings need to consider efficiency"
    ],
    correctIndex: 1,
    explanation: "BS7671 recognises that electrical installations should consider energy efficiency alongside safety. Good design practice includes minimising losses and enabling efficient operation."
  },
  {
    id: "check-3",
    question: "When installing EV charging equipment, BS7671 requires consideration of:",
    options: [
      "Only the charging point itself",
      "The charging point and its dedicated circuit",
      "Supply capacity, protective devices, earthing, and load management",
      "Nothing specific - standard socket outlet rules apply"
    ],
    correctIndex: 2,
    explanation: "EV charging installations require careful consideration of supply capacity, appropriate protective devices, PME earthing implications, and potentially load management systems to prevent supply overload."
  },
  {
    id: "check-4",
    question: "What earthing consideration is particularly important for EV charging at domestic premises with PME supplies?",
    options: [
      "Standard PME earthing is always suitable",
      "Additional earth electrode may be required to address open PEN conductor risk",
      "Earthing is not required for EV chargers",
      "TT earthing must always be used"
    ],
    correctIndex: 1,
    explanation: "Due to the risk of electric shock if the PEN conductor becomes open-circuit while someone is touching a vehicle, additional protective measures such as an earth electrode may be required for EV charging on PME supplies."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "BS7671 18th Edition Amendment 2 introduced significant updates for:",
    options: [
      "Traditional lighting circuits only",
      "Prosumer installations and EV charging",
      "Industrial motor circuits",
      "Emergency lighting requirements"
    ],
    correctAnswer: 1,
    explanation: "Amendment 2 introduced substantial updates for prosumer installations (Chapter 64) covering solar PV, batteries, and EV charging to address the growth of these technologies."
  },
  {
    id: 2,
    question: "A 'prosumer' installation as defined in BS7671 is one that:",
    options: [
      "Only consumes electricity from the grid",
      "Only generates electricity",
      "Both consumes and produces electricity",
      "Is connected to three-phase supplies only"
    ],
    correctAnswer: 2,
    explanation: "A prosumer installation both consumes electricity from and produces electricity to the grid - the term combines 'producer' and 'consumer'. Solar PV with battery storage is a typical example."
  },
  {
    id: 3,
    question: "According to BS7671, what maximum disconnection time applies to EV charging circuits?",
    options: [
      "0.1 seconds",
      "0.2 seconds",
      "0.4 seconds",
      "5 seconds"
    ],
    correctAnswer: 2,
    explanation: "EV charging equipment is typically classed as portable equipment outdoors, requiring maximum disconnection times of 0.4 seconds for TN systems to ensure safety."
  },
  {
    id: 4,
    question: "BS7671 requires that PV system isolation must be achievable:",
    options: [
      "Only at the inverter",
      "Only at the consumer unit",
      "From both the DC (array) and AC (grid) sides",
      "Solar PV doesn't require isolation provisions"
    ],
    correctAnswer: 2,
    explanation: "PV installations must have isolation capability on both the DC side (string isolator at the array) and AC side (at the consumer unit) to allow safe maintenance and emergency response."
  },
  {
    id: 5,
    question: "What is the purpose of an export limitation device in a solar PV installation?",
    options: [
      "To increase power generation",
      "To limit the power exported to the grid to DNO requirements",
      "To charge batteries faster",
      "To prevent the inverter from overheating"
    ],
    correctAnswer: 1,
    explanation: "Export limitation devices ensure that the power exported to the grid does not exceed the amount agreed with the DNO, which may be zero (zero export) for installations without export permission."
  },
  {
    id: 6,
    question: "BS7671 recognises that installations should consider electromagnetic compatibility (EMC) because:",
    options: [
      "It's a legal requirement under Building Regulations",
      "Modern equipment like LED drivers and inverters can cause interference",
      "It improves energy efficiency",
      "It's only relevant for industrial installations"
    ],
    correctAnswer: 1,
    explanation: "LED drivers, solar inverters, EV chargers and other modern equipment can generate electromagnetic interference. BS7671 requires consideration of EMC to prevent disruption to other equipment."
  },
  {
    id: 7,
    question: "When designing circuits for energy-efficient equipment, what should be considered?",
    options: [
      "Only the rated current of the equipment",
      "Harmonic currents which may increase neutral current",
      "Equipment efficiency ratings only",
      "The colour of the equipment"
    ],
    correctAnswer: 1,
    explanation: "Non-linear loads such as LED drivers and switch-mode power supplies generate harmonic currents. These can cause increased neutral current in three-phase systems, requiring larger neutral conductors."
  },
  {
    id: 8,
    question: "What documentation must be provided for a solar PV installation under BS7671?",
    options: [
      "Only a Minor Works Certificate",
      "Electrical Installation Certificate plus system-specific documentation",
      "No documentation is required",
      "Only a visual inspection checklist"
    ],
    correctAnswer: 1,
    explanation: "PV installations require full certification including an Electrical Installation Certificate, plus system-specific documentation showing AC and DC circuit details, and typically MCS certification."
  },
  {
    id: 9,
    question: "BS7671 guidance on battery storage systems requires consideration of:",
    options: [
      "Only the charging circuit",
      "Ventilation, fire risks, and safe isolation procedures",
      "Nothing specific - treat as any other load",
      "Only lithium battery systems"
    ],
    correctAnswer: 1,
    explanation: "Battery storage systems require consideration of ventilation (for hydrogen release in some types), fire risks, overcurrent protection, and safe isolation procedures for maintenance."
  },
  {
    id: 10,
    question: "The principle of selectivity in protection devices becomes more important with renewable installations because:",
    options: [
      "It improves energy generation",
      "It reduces installation costs",
      "Fault currents may flow from multiple sources, requiring coordinated protection",
      "It's only relevant for three-phase systems"
    ],
    correctAnswer: 2,
    explanation: "With generation sources like solar PV and batteries, fault current can flow from multiple directions. Proper selectivity ensures only the affected circuit is disconnected while maintaining supply elsewhere."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Does BS7671 require electricians to design for energy efficiency?",
    answer: "While BS7671's primary focus is safety, it recognises that good design should consider energy efficiency where practicable. This includes minimising voltage drop, correctly sizing conductors, and enabling the installation of energy-efficient equipment. Building Regulations Part L provides the legal requirements for energy efficiency."
  },
  {
    question: "What changed in BS7671 regarding EV charging?",
    answer: "Amendment 2 introduced clearer requirements for EV charging including guidance on Mode 3 charging, PME earthing considerations, load management, and the need for dedicated circuits. It recognises that EV charging is now mainstream and requires specific design considerations."
  },
  {
    question: "Can I install solar PV on any existing electrical installation?",
    answer: "The existing installation must be safe and suitable for the additional PV system. BS7671 requires the installation to be inspected and any defects corrected. The consumer unit may need upgrading to accommodate additional circuits, and supply capacity must be verified with the DNO."
  },
  {
    question: "What are the key differences between AC and DC circuits in PV systems?",
    answer: "DC circuits from PV panels typically operate at higher voltages (up to 1000V DC) and require specialist isolators, cables, and connectors rated for DC use. Arc faults are more dangerous in DC circuits as there's no zero-crossing point. Specific DC-rated protective devices must be used."
  },
  {
    question: "How does BS7671 address smart home installations?",
    answer: "BS7671 provides general requirements that apply to smart home systems including appropriate cable selection, EMC considerations, and ensuring control systems don't compromise the safety of the electrical installation. Specific product standards apply to individual smart home devices."
  },
  {
    question: "What training do I need to install prosumer systems?",
    answer: "While BS7671 provides the regulatory framework, additional training is recommended for prosumer installations. MCS certification is often required for solar PV to access government incentives. Manufacturer training for specific battery systems and inverters is also advisable."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Chapter 64:</strong> Prosumer installations (PV, batteries)</li>
              <li><strong>EV charging:</strong> PME earthing and load management</li>
              <li><strong>Harmonics:</strong> Consider neutral sizing for LED loads</li>
              <li><strong>EMC:</strong> Interference from inverters and drivers</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> DC isolators on PV systems, Type B RCDs</li>
              <li><strong>Use:</strong> Chapter 64 for prosumer installations</li>
              <li><strong>Apply:</strong> Consider EV earthing on PME supplies</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Chapter 64: Prosumer Installations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS7671 18th Edition Amendment 2 introduced Chapter 64 specifically for prosumer installations - those that both consume electricity from and produce electricity to the public supply. This covers solar PV, battery storage, and small-scale wind generation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Chapter 64 requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Isolation:</strong> Must be possible from both grid and generating source</li>
                <li><strong>Protection:</strong> Overcurrent and fault protection for both directions</li>
                <li><strong>Labelling:</strong> Clear warning labels for dual supply sources</li>
                <li><strong>Selectivity:</strong> Coordinated protection for multi-source systems</li>
                <li><strong>Documentation:</strong> Specific requirements for prosumer systems</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Prosumer installations present unique hazards - electricity can flow from multiple sources even when the main supply is isolated. Safe working procedures must account for this.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            EV Charging Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electric vehicle charging has specific requirements in BS7671, recognising that vehicles are often charged in locations with increased risk (outdoors, in contact with earthed metalwork) and may draw significant currents for extended periods.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Dedicated circuit with appropriate protection</li>
                  <li>RCD protection (Type A minimum for Mode 3)</li>
                  <li>Maximum 0.4s disconnection time</li>
                  <li>Load management where supply limited</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">PME Earthing Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Open PEN conductor risk assessment</li>
                  <li>Additional earth electrode often required</li>
                  <li>PEN fault detection devices available</li>
                  <li>TT system may be preferable in some cases</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Solar PV Installation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Solar PV systems involve both DC circuits (from panels to inverter) and AC circuits (from inverter to grid). BS7671 provides requirements for both, with particular attention to the hazards of DC systems which behave differently to AC in fault conditions.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> When isolating a solar PV system for maintenance, you must isolate both the DC array (at the string isolators) and the AC side (at the consumer unit). Remember that DC circuits remain live whenever daylight falls on the panels - there is no "off switch" for sunlight.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">DC side requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>DC isolator:</strong> Adjacent to the inverter, rated for DC use</li>
                <li><strong>String protection:</strong> Fuses or DC MCBs where required</li>
                <li><strong>Cable selection:</strong> PV-specific cables (e.g., H1Z2Z2-K)</li>
                <li><strong>Connectors:</strong> Compatible MC4 or similar rated connectors</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Energy Efficiency Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While BS7671's primary focus is safety, it recognises the relationship between good installation practice and energy efficiency. Modern equipment like LED lighting and variable speed drives create new considerations for circuit design.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Voltage Drop</p>
                <p className="text-white/90 text-xs">Minimise losses with correct cable sizing</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Harmonics</p>
                <p className="text-white/90 text-xs">Consider neutral sizing for LED loads</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">EMC</p>
                <p className="text-white/90 text-xs">Prevent interference from inverters</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Non-linear loads like LED drivers generate harmonic currents. In three-phase systems, third harmonics add in the neutral conductor, potentially requiring oversized neutrals.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing Renewable Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always verify DNO requirements and apply for connection if required</li>
                <li>Use appropriately rated DC equipment - AC equipment is not suitable</li>
                <li>Ensure all isolation points are clearly labelled</li>
                <li>Provide system documentation including schematic diagrams</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing EV Charging</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assess PME earthing risks before installation</li>
                <li>Consider load management if supply capacity is limited</li>
                <li>Use Type A RCD minimum (Type B for some DC charging)</li>
                <li>Ensure adequate ventilation if installed in garages</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using AC isolators on DC circuits</strong> - DC requires specific rated equipment</li>
                <li><strong>Forgetting dual isolation requirements</strong> - PV arrays remain live in daylight</li>
                <li><strong>Ignoring PME earthing risks for EV charging</strong> - Can result in dangerous touch voltages</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key BS7671 Chapters</p>
                <ul className="space-y-0.5">
                  <li>Chapter 64: Prosumer installations</li>
                  <li>Section 722: EV charging (special locations)</li>
                  <li>Chapter 52: Cable selection and installation</li>
                  <li>Chapter 41: Protection against shock</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Protection Requirements</p>
                <ul className="space-y-0.5">
                  <li>EV: 0.4s disconnection, Type A RCD min</li>
                  <li>PV DC: DC-rated isolators and protection</li>
                  <li>Batteries: Overcurrent and isolation</li>
                  <li>Export: Limitation device where required</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section1-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section1_3;
