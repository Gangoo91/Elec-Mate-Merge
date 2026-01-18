/**
 * Level 3 Module 2 Section 4.3 - Installation Requirements
 * EV charger installation: circuit design, earthing, cable sizing, and PME considerations
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
const TITLE = "EV Charger Installation Requirements - Level 3 Module 2 Section 4.3";
const DESCRIPTION = "Understanding EV charger installation requirements including circuit design, earthing arrangements, PME considerations, and compliance with BS 7671.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the typical circuit protection arrangement for a 7kW domestic EV charger?",
    options: [
      "16A MCB with 100mA RCD",
      "32A MCB with Type A 30mA RCD (or Type B if required by manufacturer)",
      "63A MCB with no RCD",
      "20A MCB with 300mA RCD"
    ],
    correctIndex: 1,
    explanation: "A 7kW charger drawing 32A requires a 32A or 40A MCB. RCD protection is required - typically Type A 30mA minimum, though some manufacturers specify Type B RCDs due to potential DC fault currents from the charger's electronics. Always check manufacturer requirements."
  },
  {
    id: "check-2",
    question: "What special earthing consideration applies to EV chargers installed on PME (TN-C-S) supplies?",
    options: [
      "No special considerations - standard earthing applies",
      "The charger cannot be installed on PME supplies",
      "Additional earth electrode may be required to limit touch voltage if PEN conductor fails",
      "Only TT earthing can be used"
    ],
    correctIndex: 2,
    explanation: "On PME supplies, loss of the PEN conductor can cause dangerous voltages on exposed metalwork. BS 7671 Regulation 722.411.4.1 requires additional protective measures for EV charging, typically an earth electrode with maximum resistance specified (often 100 ohms or manufacturer's value) to limit touch voltage."
  },
  {
    id: "check-3",
    question: "What DNO notification is required for a 7kW domestic EV charger installation?",
    options: [
      "No notification required",
      "G98 notification required",
      "G99 application and approval required",
      "Only planning permission is needed"
    ],
    correctIndex: 1,
    explanation: "EV chargers with load significance require DNO notification. Most 7kW domestic chargers fall under G98 notification (rather than approval) requirements. The installer must notify the DNO, typically through an online portal. Some areas have additional local requirements."
  },
  {
    id: "check-4",
    question: "What minimum cable size is typically required for a 32A EV charger circuit using 6mm² twin and earth cable?",
    options: [
      "2.5mm²",
      "4mm²",
      "6mm² (subject to installation method and voltage drop)",
      "10mm²"
    ],
    correctIndex: 2,
    explanation: "6mm² twin and earth cable can carry 32A under many installation methods (check BS 7671 current carrying capacity tables). However, voltage drop must also be calculated - longer cable runs may require larger sizes. The CPC (earth) size in 6mm² T&E is 2.5mm², which must be verified adequate for fault current."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Which BS 7671 section specifically covers EV charging installations?",
    options: [
      "Section 701 (Bathrooms)",
      "Section 722 (Electric Vehicle Charging)",
      "Section 751 (Extra-low Voltage)",
      "Section 729 (Operating Systems)"
    ],
    correctAnswer: 1,
    explanation: "Section 722 of BS 7671 specifically addresses electrical installations for charging electric vehicles. It covers requirements for earthing, protection, circuit design, and external influences applicable to EV charging points."
  },
  {
    id: 2,
    question: "What is the primary concern with PME earthing for external EV chargers?",
    options: [
      "Higher electricity bills",
      "Risk of dangerous touch voltages if the PEN conductor is lost",
      "Slower charging speeds",
      "Incompatibility with smart chargers"
    ],
    correctAnswer: 1,
    explanation: "If the combined protective earth and neutral (PEN) conductor is lost in a PME system, the MET can rise to a dangerous potential. External EV chargers are particularly concerning as users may be in contact with the charger and true earth simultaneously."
  },
  {
    id: 3,
    question: "What is the typical earth electrode resistance requirement for EV charging on PME supplies?",
    options: [
      "Less than 1 ohm",
      "Exactly 10 ohms",
      "Maximum 100 ohms (or manufacturer's specified value)",
      "Any resistance is acceptable"
    ],
    correctAnswer: 2,
    explanation: "The earth electrode for EV charging typically must not exceed 100 ohms (or the manufacturer's specified value if lower). This limits touch voltage in case of PEN conductor failure. The resistance must be verified during commissioning and may need periodic testing."
  },
  {
    id: 4,
    question: "What RCD type provides protection against both AC and pulsating DC fault currents?",
    options: [
      "Type AC RCD",
      "Type A RCD",
      "Type B RCD",
      "Type S RCD"
    ],
    correctAnswer: 2,
    explanation: "Type B RCDs detect AC, pulsating DC, and smooth DC fault currents. Some EV chargers can produce smooth DC components that Type A RCDs won't detect. Manufacturer instructions or BS 7671 requirements may mandate Type B RCDs for certain installations."
  },
  {
    id: 5,
    question: "What is the maximum permitted voltage drop for EV charging circuits according to BS 7671?",
    options: [
      "1% of supply voltage",
      "3% for lighting, 5% for other uses (total 5% is common guidance)",
      "10% under all circumstances",
      "There is no limit for EV charging"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 appendix 4 recommends maximum 5% total voltage drop from origin to point of use. For EV charging, the circuit voltage drop plus distribution circuit drop should not exceed this. Excessive voltage drop can affect charging performance and trigger charger faults."
  },
  {
    id: 6,
    question: "Why might a supply upgrade be required before installing a 7kW EV charger?",
    options: [
      "EV chargers always need supply upgrades",
      "The existing supply may have insufficient capacity for the additional load",
      "Planning regulations require it",
      "To improve internet connectivity for smart charging"
    ],
    correctAnswer: 1,
    explanation: "Many UK properties have 60-80A incoming supplies. Adding a 32A EV charger to existing loads may exceed this capacity. A maximum demand calculation should be performed. If capacity is insufficient, a supply upgrade from the DNO may be required."
  },
  {
    id: 7,
    question: "What IP rating is typically required for outdoor EV charging equipment?",
    options: [
      "IP20",
      "IP44 minimum, often IP54 or IP65",
      "IP00",
      "IP rating is not important outdoors"
    ],
    correctAnswer: 1,
    explanation: "Outdoor installations require protection against water and dust ingress. IP44 is often considered minimum for outdoor use, but IP54 or IP65 is common for EV chargers exposed to weather. The specific requirement depends on the installation location and manufacturer specifications."
  },
  {
    id: 8,
    question: "What testing must be performed on an earth electrode installed for EV charging?",
    options: [
      "No testing required",
      "Visual inspection only",
      "Earth electrode resistance test to verify it meets the required value",
      "Only continuity testing"
    ],
    correctAnswer: 2,
    explanation: "Earth electrode resistance must be measured using appropriate test equipment (typically a dedicated earth electrode tester or fall-of-potential method). The result must meet the specified maximum (often 100 ohms). This should be recorded on the Electrical Installation Certificate."
  },
  {
    id: 9,
    question: "What is the purpose of the 'Additional protective measure' for EV charging mentioned in BS 7671 Section 722?",
    options: [
      "To increase charging speed",
      "To protect against electric shock in case of PME earth fault",
      "To prevent cable theft",
      "To enable smart charging features"
    ],
    correctAnswer: 1,
    explanation: "The additional protective measure (earth electrode, protective equipotential bonding, etc.) protects against electric shock if the PME earth fails while someone is touching the charger. It provides an alternative path for fault current and limits touch voltage."
  },
  {
    id: 10,
    question: "Which document must be provided to the customer after EV charger installation?",
    options: [
      "Only the sales receipt",
      "Electrical Installation Certificate (or Minor Works for small additions)",
      "Only the manufacturer's warranty",
      "No documentation is required"
    ],
    correctAnswer: 1,
    explanation: "An Electrical Installation Certificate (EIC) must be provided for new circuits. It documents the design, construction, and inspection/testing of the installation. This should include earth electrode test results if applicable, and must be provided along with the manufacturer's documentation."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I install an EV charger on any existing circuit?",
    answer: "No, EV chargers require a dedicated circuit from the consumer unit with appropriate overcurrent and RCD protection. The existing installation must have sufficient spare capacity. Sharing circuits with other loads is not permitted due to the sustained high current draw and specific protection requirements of EV charging."
  },
  {
    question: "What if my consumer unit has no spare ways?",
    answer: "Options include: installing a larger consumer unit, adding a secondary consumer unit (properly coordinated), or using a dedicated EV charger enclosure with its own protection. The solution depends on available space, existing installation condition, and customer preferences. Never double-tap or overload existing circuits."
  },
  {
    question: "Do I need to install an earth rod for every EV charger?",
    answer: "Not necessarily. Earth electrodes are required for PME installations where the charger is accessible from outside the equipotential zone (typically outdoor or garage installations). TT installations already use earth electrodes. Some chargers have integrated PME protection that may reduce requirements - check manufacturer guidance."
  },
  {
    question: "What if the earth rod resistance is too high?",
    answer: "If initial resistance exceeds requirements, you may need multiple rods in parallel (spaced at least the rod length apart) or a different earthing arrangement. Soil conditions greatly affect resistance. In difficult cases, consult the DNO about alternative solutions or consider enhanced protective equipotential bonding."
  },
  {
    question: "Can EV chargers be installed in flats?",
    answer: "Installation in flats requires careful consideration: freeholder/management company permission, adequate supply capacity (often shared), cable routing through common areas, fire safety implications, and parking arrangements. Many blocks now actively plan EV charging infrastructure. Individual assessment is essential."
  },
  {
    question: "What labelling is required for EV charger installations?",
    answer: "Labels should include: warning at the consumer unit about additional EV circuit, isolation instructions at the charger, and any DNO-required notices about low carbon technology. If an earth electrode is installed, this should also be labelled for future reference during testing."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section4_3 = () => {
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
            <Link to="/study-centre/apprentice/level3-module2-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Installation Requirements
          </h1>
          <p className="text-white/80">
            Circuit design, earthing, and compliance requirements for EV charger installation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Circuit:</strong> Dedicated 32A+ circuit with RCD protection</li>
              <li><strong>PME earthing:</strong> Earth electrode often required (max 100 ohms typical)</li>
              <li><strong>Cable sizing:</strong> 6mm² minimum, check voltage drop for long runs</li>
              <li><strong>DNO notification:</strong> Required under G98 for domestic chargers</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> BS 7671 Section 722 for EV-specific requirements</li>
              <li><strong>Use:</strong> Earth electrode tester to verify rod resistance</li>
              <li><strong>Apply:</strong> Maximum demand calculation before installation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Circuit design requirements for EV charging",
              "PME earthing considerations and solutions",
              "Cable sizing and voltage drop calculations",
              "RCD types and protection requirements",
              "DNO notification and supply capacity assessment",
              "Documentation and certification requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Content Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Circuit Design Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EV chargers require dedicated circuits designed to handle sustained high current draw. Unlike many domestic appliances that operate intermittently, EV chargers may run at full rated current for hours. This affects circuit design, protection selection, and cable sizing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key circuit design requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Dedicated circuit:</strong> Must not be shared with other loads</li>
                <li><strong>Overcurrent protection:</strong> 32A or 40A MCB for 7kW charger (Type B or C typical)</li>
                <li><strong>RCD protection:</strong> 30mA Type A minimum; Type B if manufacturer requires</li>
                <li><strong>Isolation:</strong> Local means of isolation at or near the charger</li>
                <li><strong>Cable sizing:</strong> Based on current rating, installation method, and voltage drop</li>
              </ul>
            </div>

            <p>
              Before designing the circuit, assess the existing installation's capacity. A maximum demand calculation determines whether the incoming supply can accommodate the additional load without requiring a DNO supply upgrade.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> EV charging is covered by BS 7671 Section 722. Always check both general wiring regulations and this specific section when designing installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Content Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            PME Earthing Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Most UK properties have PME (Protective Multiple Earthing) supplies, also known as TN-C-S. This presents specific challenges for EV charging because the charger is often located outside the main equipotential zone where users may be in contact with true earth.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">The PME Risk</p>
                <ul className="text-sm text-white space-y-1">
                  <li>PEN conductor carries neutral current and provides earth</li>
                  <li>If PEN is lost, MET rises to dangerous voltage</li>
                  <li>User touching charger and ground completes fault path</li>
                  <li>External locations have greater true earth contact risk</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protective Measures</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Earth electrode (max 100 ohms typical)</li>
                  <li>Protective equipotential bonding</li>
                  <li>Electrical separation (rare for domestic)</li>
                  <li>Manufacturer's integrated PME protection</li>
                </ul>
              </div>
            </div>

            <p>
              The earth electrode provides an alternative path that limits touch voltage if PME earth is lost. Multiple rods may be needed in high-resistance soil. The resistance must be tested and recorded on the installation certificate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Content Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable Sizing and Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable selection must consider current carrying capacity, voltage drop, and fault current capacity of the protective conductor. For typical domestic installations, 6mm² twin and earth cable is commonly used, but this must be verified for each installation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable sizing considerations:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Current rating:</strong> Must exceed circuit design current with appropriate correction factors (ambient temperature, grouping, insulation)</li>
                <li><strong>Voltage drop:</strong> Total drop from origin to charger should not exceed 5% (230V x 5% = 11.5V maximum)</li>
                <li><strong>CPC sizing:</strong> Must satisfy adiabatic equation for fault current - 2.5mm² CPC in 6mm² T&E may need verification</li>
                <li><strong>Installation method:</strong> Affects current rating - clipped direct, in conduit, buried, etc.</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A 25m cable run for a 32A charger using 6mm² T&E: voltage drop = 7.3mV/A/m x 32A x 25m = 5.84V (2.5% of 230V). This is acceptable within the 5% limit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Content Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            DNO Notification and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EV charger installations require notification to the Distribution Network Operator (DNO). This is separate from but related to G98/G99 requirements for generation/storage. DNO notification helps network planning and ensures supply adequacy.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">DNO Notification</p>
                <p className="text-white/90 text-xs">Required for all EV charger installations</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">EIC/Minor Works</p>
                <p className="text-white/90 text-xs">Electrical Installation Certificate for new circuit</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Part P</p>
                <p className="text-white/90 text-xs">Notifiable work - competent person scheme or BCB</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Documentation checklist:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Electrical Installation Certificate (BS 7671 compliant)</li>
                <li>Earth electrode test results (if applicable)</li>
                <li>DNO notification confirmation</li>
                <li>Manufacturer documentation and warranty registration</li>
                <li>User instructions including emergency shutdown</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> EV charger installation is notifiable electrical work under Part P in England. Use a competent person scheme or notify Building Control. Failure to notify can cause problems for future property sales.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Installation Assessment</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check existing supply capacity and main fuse rating</li>
                <li>Identify earthing system (PME/TT) and plan accordingly</li>
                <li>Survey cable route and identify installation method</li>
                <li>Verify consumer unit has spare way with appropriate rating</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Installation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Install earth electrode before backfilling if required</li>
                <li>Ensure correct polarity and secure connections throughout</li>
                <li>Mount charger per manufacturer instructions (height, access)</li>
                <li>Install appropriate labels at charger and consumer unit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping earth electrode</strong> - required for PME external installations</li>
                <li><strong>Undersized cable</strong> - calculate voltage drop for actual route length</li>
                <li><strong>Wrong RCD type</strong> - check manufacturer requirement for Type A or B</li>
                <li><strong>Missing DNO notification</strong> - required for all EV charger installations</li>
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
                <p className="font-medium text-white mb-1">Circuit Requirements (7kW)</p>
                <ul className="space-y-0.5">
                  <li>MCB: 32A or 40A Type B/C</li>
                  <li>RCD: 30mA Type A or Type B</li>
                  <li>Cable: 6mm² T&E minimum (verify)</li>
                  <li>Earth electrode: Max 100 ohms (PME)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Documentation Required</p>
                <ul className="space-y-0.5">
                  <li>Electrical Installation Certificate</li>
                  <li>Earth electrode test results</li>
                  <li>DNO notification confirmation</li>
                  <li>Part P notification/certificate</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Charger Types and Connectors
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section4-4">
              Next: Smart Charging and Load Management
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section4_3;
