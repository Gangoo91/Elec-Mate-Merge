import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Heat Pump Installation and Commissioning - Renewable Energy Module 5";
const DESCRIPTION = "Learn about heat pump installation requirements, electrical connections, commissioning procedures, and MCS compliance for UK installations.";

const quickCheckQuestions = [
  {
    id: "hp-electrical-supply",
    question: "What electrical supply is typically required for a domestic ASHP?",
    options: ["13A plug socket", "Dedicated 32A single-phase circuit with RCD protection", "Three-phase only", "Low voltage DC"],
    correctIndex: 1,
    explanation: "Most domestic ASHPs up to 12kW require a dedicated 32A single-phase circuit with appropriate protection (typically Type C MCB and RCD). Larger units may need three-phase."
  },
  {
    id: "hp-commissioning-delta-t",
    question: "What should delta T (temperature difference) across the heat pump typically be?",
    options: ["1-2C", "5C for heating mode", "15-20C", "No specific value"],
    correctIndex: 1,
    explanation: "Delta T should typically be 5C for heating mode (check manufacturer specification). This indicates correct flow rate - too high suggests insufficient flow, too low indicates excessive flow."
  },
  {
    id: "hp-mcs-requirement",
    question: "What is required for MCS certification of a heat pump installation?",
    options: ["Only product certification", "MCS-certified installer, certified products, and compliant installation", "Customer signature only", "Building regulations approval"],
    correctIndex: 1,
    explanation: "MCS certification requires an MCS-certified installer, MCS-certified products, installation to MCS standards (MIS 3005), and completion of required documentation."
  },
  {
    id: "hp-refrigerant-check",
    question: "What refrigerant checks apply to split system installations?",
    options: ["No checks required", "F-Gas qualified person must check charge and leak test", "Visual inspection only", "Only at annual service"],
    correctIndex: 1,
    explanation: "Split system refrigerant work requires F-Gas qualified personnel. Charge must be verified against manufacturer specification and leak testing performed before commissioning."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What earthing arrangement is typically used for heat pump installations?",
    options: [
      "TT system only",
      "Connection to existing TN-C-S or TT earthing as appropriate",
      "No earthing required",
      "Separate earth electrode always"
    ],
    correctAnswer: 1,
    explanation: "Heat pumps connect to the existing installation earthing arrangement (typically TN-C-S in UK). All exposed metalwork must be bonded, with outdoor units having supplementary bonding."
  },
  {
    id: 2,
    question: "What document is required for grid connection of heat pump systems?",
    options: [
      "No notification required",
      "DNO notification may be required for larger systems",
      "Planning permission only",
      "Building regulations certificate"
    ],
    correctAnswer: 1,
    explanation: "DNO notification may be required for larger heat pumps or where supply capacity is limited. Check with DNO for systems above 3.68kW or where existing load is high."
  },
  {
    id: 3,
    question: "What should be verified before first energising a heat pump?",
    options: [
      "Nothing specific",
      "Electrical connections, refrigerant charge (split), water system filled and pressurised",
      "Only power supply",
      "Only water connections"
    ],
    correctAnswer: 1,
    explanation: "Pre-commissioning checks include electrical connection verification, refrigerant charge (split systems), water system filled/pressurised/vented, and all isolation valves open."
  },
  {
    id: 4,
    question: "What is the purpose of the commissioning heating curve adjustment?",
    options: [
      "Aesthetic display setting",
      "Match flow temperature response to building heat loss characteristics",
      "Set maximum temperature only",
      "Control defrost timing"
    ],
    correctAnswer: 1,
    explanation: "The heating curve relates outdoor temperature to required flow temperature. Correct setting ensures adequate heat in cold weather while maximising efficiency in mild conditions."
  },
  {
    id: 5,
    question: "What antifreeze concentration should be verified in ground source systems?",
    options: [
      "No antifreeze needed",
      "20-30% propylene glycol for freeze protection to -10 to -15C",
      "Pure glycol",
      "50% ethylene glycol"
    ],
    correctAnswer: 1,
    explanation: "Ground source systems require antifreeze (typically propylene glycol) at 20-30% concentration for freeze protection. Test concentration with refractometer during commissioning."
  },
  {
    id: 6,
    question: "What Part P requirement applies to heat pump electrical installation?",
    options: [
      "No Part P applies",
      "Notifiable work - requires competent person or building control",
      "Only applies to bathrooms",
      "Self-certification always allowed"
    ],
    correctAnswer: 1,
    explanation: "Heat pump electrical installation is notifiable work under Part P. Must be done by registered competent person scheme member or notified to building control."
  },
  {
    id: 7,
    question: "What should be recorded on the commissioning checklist?",
    options: [
      "Only completion date",
      "Flow rates, temperatures, pressures, protection settings, refrigerant charge",
      "Just customer signature",
      "Serial numbers only"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive commissioning records include all measured values (flow rates, temperatures, pressures), protection settings, refrigerant details, and verification of correct operation."
  },
  {
    id: 8,
    question: "What MCS standard applies to heat pump installations?",
    options: [
      "MCS 001",
      "MIS 3005 for heat pump installations",
      "MCS 020 only",
      "No MCS standard exists"
    ],
    correctAnswer: 1,
    explanation: "MIS 3005 is the MCS installation standard for heat pump systems, covering design, installation, and commissioning requirements for certified installations."
  },
  {
    id: 9,
    question: "What certificate should be provided on completion of heat pump installation?",
    options: [
      "No certificate required",
      "Electrical Installation Certificate (EIC) and MCS certificate if applicable",
      "Only verbal confirmation",
      "Warranty card only"
    ],
    correctAnswer: 1,
    explanation: "Installations require an Electrical Installation Certificate per BS 7671. MCS-certified installations also need MCS certificate for grant/incentive eligibility."
  },
  {
    id: 10,
    question: "How should hot water pasteurisation (Legionella cycle) be verified?",
    options: [
      "Not required",
      "Confirm cylinder reaches 60C and cycle is programmed to run periodically",
      "Visual inspection only",
      "Check cold water temperature"
    ],
    correctAnswer: 1,
    explanation: "Verify that hot water cylinder can reach 60C for Legionella control and that automatic pasteurisation cycle is programmed (typically weekly). Document settings."
  }
];

const faqs = [
  {
    question: "What electrical work can I do on heat pump installations?",
    answer: "Electrical installation work is notifiable under Part P. You need to be a member of a competent person scheme (e.g., NICEIC, NAPIT) or notify building control. This includes the dedicated circuit, protection devices, and connection to the heat pump."
  },
  {
    question: "Do I need F-Gas certification for heat pump work?",
    answer: "Monobloc units do not require F-Gas for installation as refrigerant circuit is factory-sealed. Split systems require F-Gas qualified personnel for any refrigerant work. Recovery, charging, and leak testing require certification."
  },
  {
    question: "What documentation should I provide to customers?",
    answer: "Provide: Electrical Installation Certificate, MCS certificate (if certified), commissioning checklist, user instructions, warranty documentation, maintenance schedule, and emergency contact information."
  },
  {
    question: "How do I set up weather compensation correctly?",
    answer: "Start with manufacturer default curve for building type. After a week of operation, adjust if building overheats in mild weather (reduce curve) or underheats in cold weather (increase curve). Fine-tune based on customer feedback."
  },
  {
    question: "What ongoing maintenance do heat pumps require?",
    answer: "Annual maintenance includes: filter cleaning, refrigerant pressure check (split systems), electrical connection inspection, controls verification, performance check, and water system pressure verification. More frequent checks for commercial systems."
  },
  {
    question: "How do I verify correct system performance?",
    answer: "Check: delta T across heat pump (should be ~5C), COP indication if available, flow temperature matches weather compensation setting, no excessive cycling, hot water reaching target temperature. Compare electricity use to expected values."
  }
];

const RenewableEnergyModule5Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Installation and Commissioning
          </h1>
          <p className="text-white/80">
            Electrical requirements, commissioning procedures, and MCS compliance
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Installation Essentials</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Electrical:</strong> 32A dedicated circuit typical</li>
              <li><strong>Part P:</strong> Notifiable electrical work</li>
              <li><strong>F-Gas:</strong> Required for split systems</li>
              <li><strong>MCS:</strong> For grant eligibility</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Commissioning Checks</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Delta T:</strong> 5C across heat pump</li>
              <li><strong>Weather comp:</strong> Curve set correctly</li>
              <li><strong>Legionella:</strong> 60C cycle programmed</li>
              <li><strong>Documentation:</strong> EIC + MCS cert</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Design electrical supply for heat pumps",
              "Apply Part P and F-Gas requirements",
              "Complete pre-commissioning checks",
              "Perform commissioning procedures",
              "Configure system controls",
              "Complete required documentation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Electrical Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Heat pump electrical installation must comply with BS 7671 and Part P of Building Regulations, requiring proper supply sizing, protection, and safe isolation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Supply Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Domestic ASHP:</strong> Typically 32A single-phase for up to 12kW</li>
                <li><strong>Larger systems:</strong> May require three-phase supply</li>
                <li><strong>Cable sizing:</strong> Based on current, length, installation method</li>
                <li><strong>Voltage drop:</strong> Must not exceed 5% at full load</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Protection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>MCB:</strong> Type C or D depending on starting current</li>
                <li><strong>RCD:</strong> 30mA for additional protection</li>
                <li><strong>Isolation:</strong> Local isolator at outdoor unit</li>
                <li><strong>Surge protection:</strong> SPD recommended</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Regulatory Compliance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Part P:</strong> Notifiable work - competent person or building control</li>
                <li><strong>BS 7671:</strong> Full compliance with Wiring Regulations</li>
                <li><strong>EIC:</strong> Electrical Installation Certificate required</li>
                <li><strong>DNO:</strong> May need notification for larger systems</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Pre-Commissioning Checks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thorough pre-commissioning checks ensure the system is ready for safe energisation and identify any installation issues before operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Electrical Checks:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Visual inspection:</strong> Correct installation, no damage</li>
                <li><strong>Continuity:</strong> Earth continuity verified</li>
                <li><strong>Insulation:</strong> Resistance tests satisfactory</li>
                <li><strong>Polarity:</strong> Correct phase and neutral connection</li>
                <li><strong>Protection:</strong> Devices correctly rated</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Hydraulic Checks:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Water system:</strong> Filled, pressurised, vented</li>
                <li><strong>Leak test:</strong> All joints checked</li>
                <li><strong>Isolation valves:</strong> Open and operational</li>
                <li><strong>Strainer:</strong> Installed and clean</li>
                <li><strong>Antifreeze:</strong> Concentration verified (GSHP)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Refrigerant Checks (Split Systems):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Pipework:</strong> Correct size, insulated</li>
                <li><strong>Leak test:</strong> Nitrogen pressure test</li>
                <li><strong>Vacuum:</strong> System evacuated correctly</li>
                <li><strong>Charge:</strong> Verified per manufacturer spec</li>
                <li><strong>F-Gas records:</strong> Documentation complete</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Commissioning Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Systematic commissioning verifies correct operation, optimises settings for the specific installation, and ensures the customer understands system operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Initial Start-Up:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Power on:</strong> Verify display/indicators active</li>
                <li><strong>Error codes:</strong> Check for any fault indications</li>
                <li><strong>Pump operation:</strong> Verify circulation pump running</li>
                <li><strong>Compressor:</strong> Confirm starting and running normally</li>
                <li><strong>Fan:</strong> Check outdoor fan operation (ASHP)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Performance Verification:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Delta T:</strong> Measure temperature rise across heat pump</li>
                <li><strong>Flow rate:</strong> Calculate from delta T and capacity</li>
                <li><strong>Pressures:</strong> Verify refrigerant pressures within spec</li>
                <li><strong>Current:</strong> Check operating current against rating</li>
                <li><strong>COP indication:</strong> If available, verify sensible value</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Control Configuration:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Weather compensation:</strong> Set heating curve for building</li>
                <li><strong>DHW settings:</strong> Target temperature and schedules</li>
                <li><strong>Legionella cycle:</strong> Program pasteurisation</li>
                <li><strong>Backup heating:</strong> Configure immersion/boiler integration</li>
                <li><strong>Frost protection:</strong> Verify settings appropriate</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            MCS Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              MCS certification is required for installations to be eligible for government incentives and provides quality assurance for customers.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">MCS Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Certified installer:</strong> Company registered with MCS</li>
                <li><strong>Certified products:</strong> Heat pump on MCS product list</li>
                <li><strong>MIS 3005:</strong> Installation to MCS installation standard</li>
                <li><strong>Design:</strong> Compliant heat loss calculation and sizing</li>
                <li><strong>Documentation:</strong> Required paperwork completed</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Heat loss:</strong> Room-by-room calculation required</li>
                <li><strong>Emitter assessment:</strong> Verify adequacy at design flow temp</li>
                <li><strong>Sizing:</strong> Heat pump matched to calculated load</li>
                <li><strong>Performance estimate:</strong> SPF prediction</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Documentation Checklist</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>MCS certificate for the installation</li>
                <li>EPC (where required for BUS grant)</li>
                <li>Heat loss calculations</li>
                <li>Commissioning checklist completed</li>
                <li>Handover documentation to customer</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Handover and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper handover ensures the customer can operate the system effectively and has all necessary documentation for warranty and compliance purposes.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Customer Handover:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Demonstration:</strong> Show basic operation and controls</li>
                <li><strong>Explain:</strong> Weather compensation and continuous operation</li>
                <li><strong>Settings:</strong> Review programmed temperatures and schedules</li>
                <li><strong>Maintenance:</strong> Explain routine checks customer can do</li>
                <li><strong>Contact:</strong> Provide emergency and service contact details</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Documentation Package:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Electrical Installation Certificate</strong></li>
                <li><strong>MCS certificate</strong> (if applicable)</li>
                <li><strong>Commissioning checklist</strong> with recorded values</li>
                <li><strong>User manual</strong> and quick-start guide</li>
                <li><strong>Warranty documentation</strong></li>
                <li><strong>Maintenance schedule</strong></li>
                <li><strong>F-Gas log</strong> (split systems)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Records to Retain:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Design calculations:</strong> Keep for warranty claims</li>
                <li><strong>Commissioning data:</strong> Baseline for future comparison</li>
                <li><strong>Serial numbers:</strong> All major components</li>
                <li><strong>Photos:</strong> Installation for future reference</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify supply capacity before committing to system size</li>
                <li>Install local isolator accessible at outdoor unit</li>
                <li>Use appropriate glands and sealing for outdoor connections</li>
                <li>Label all circuits clearly at consumer unit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Allow system to run for 15+ minutes before measuring delta T</li>
                <li>Set weather compensation curve conservatively initially</li>
                <li>Verify Legionella protection is programmed and functioning</li>
                <li>Record all values on commissioning checklist</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Inadequate supply</strong> - causes voltage drop and trips</li>
                <li><strong>Missing documentation</strong> - affects warranty and grants</li>
                <li><strong>Poor handover</strong> - customer operates inefficiently</li>
                <li><strong>Skipping commissioning</strong> - misses setup optimisation</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule5Section5;
