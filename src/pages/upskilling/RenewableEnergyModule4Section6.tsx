import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BESS Commissioning and Maintenance - Renewable Energy Module 4";
const DESCRIPTION = "Learn about commissioning procedures, testing requirements, and maintenance schedules for battery energy storage systems.";

const quickCheckQuestions = [
  {
    id: "bess-commissioning-first",
    question: "What should be verified BEFORE energising a new BESS installation?",
    options: ["Only the battery warranty", "All electrical connections, protection settings, and safety systems", "Just the inverter display", "Only the grid connection"],
    correctIndex: 1,
    explanation: "Before energisation, verify all electrical connections are correct and tight, protection settings match design, safety systems function, and the installation complies with specifications."
  },
  {
    id: "bess-insulation-test",
    question: "What insulation resistance value is typically acceptable for DC circuits?",
    options: ["Any value above 0", "Greater than 1 megohm per volt of system voltage", "Exactly 500 ohms", "Less than 100 ohms"],
    correctIndex: 1,
    explanation: "DC circuit insulation resistance should typically exceed 1 megohm per volt of system voltage. For a 500V system, this means greater than 500 megohms minimum."
  },
  {
    id: "bess-maintenance-interval",
    question: "What is a typical maintenance inspection interval for commercial BESS?",
    options: ["Only when faulty", "Weekly inspections", "Annual inspection with quarterly monitoring", "Every 5 years"],
    correctIndex: 2,
    explanation: "Commercial BESS typically requires annual comprehensive inspection with quarterly remote monitoring reviews. Visual inspection and basic checks may be more frequent."
  },
  {
    id: "bess-firmware-update",
    question: "What precaution applies when updating BMS or inverter firmware?",
    options: ["No precautions needed", "Ensure backup of settings and verify compatibility before update", "Only update during discharge", "Never update firmware"],
    correctIndex: 1,
    explanation: "Before firmware updates, backup current settings, verify update compatibility with hardware and other system components, and follow manufacturer procedures to avoid system issues."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What document should be completed after BESS commissioning?",
    options: [
      "Only the invoice",
      "Electrical Installation Certificate and commissioning checklist",
      "Just a handover note",
      "No documentation required"
    ],
    correctAnswer: 1,
    explanation: "Commissioning requires completion of an Electrical Installation Certificate per BS 7671, plus a detailed commissioning checklist documenting all tests, settings, and verifications."
  },
  {
    id: 2,
    question: "What functional test verifies BMS protection operation?",
    options: [
      "Only visual inspection",
      "Simulating fault conditions to verify automatic disconnection",
      "Reading the manual",
      "Checking battery weight"
    ],
    correctAnswer: 1,
    explanation: "Functional testing should verify BMS protection by simulating conditions (e.g., low voltage cutoff) or using diagnostic modes to confirm automatic disconnection occurs correctly."
  },
  {
    id: 3,
    question: "What should be recorded during commissioning?",
    options: [
      "Only the installation date",
      "Cell voltages, SoC, settings, test results, and serial numbers",
      "Just the battery brand",
      "Only inverter model"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive commissioning records include individual cell voltages, initial SoC, all configuration settings, test results, serial numbers, and firmware versions for future reference."
  },
  {
    id: 4,
    question: "How should cell voltage balance be verified?",
    options: [
      "Visual inspection only",
      "Compare individual cell voltages - should be within 50mV",
      "Check total pack voltage only",
      "No verification needed"
    ],
    correctAnswer: 1,
    explanation: "Cell balance is verified by comparing individual cell voltages. At similar SoC, cells should be within 50mV of each other. Larger differences indicate potential cell issues."
  },
  {
    id: 5,
    question: "What maintenance task applies to ventilation systems?",
    options: [
      "No maintenance required",
      "Inspect and clean filters, verify fan operation, check airflow",
      "Only check annually",
      "Replace ventilation yearly"
    ],
    correctAnswer: 1,
    explanation: "Ventilation maintenance includes inspecting and cleaning filters, verifying fan operation and rotation, checking airflow paths are clear, and ensuring temperature control is effective."
  },
  {
    id: 6,
    question: "When should battery connections be re-torqued?",
    options: [
      "Never after initial installation",
      "After initial thermal cycling, then periodically per manufacturer",
      "Only if visibly loose",
      "Every week"
    ],
    correctAnswer: 1,
    explanation: "Connections should be re-torqued after initial thermal cycling (typically 1-3 months), then periodically per manufacturer recommendations to maintain proper contact resistance."
  },
  {
    id: 7,
    question: "What indicates potential battery degradation during maintenance checks?",
    options: [
      "Normal operation",
      "Increasing cell voltage imbalance, reduced capacity, higher temperatures",
      "Stable performance",
      "Lower electricity bills"
    ],
    correctAnswer: 1,
    explanation: "Degradation indicators include increasing cell voltage imbalance, reduced usable capacity, higher operating temperatures, and increased internal resistance over time."
  },
  {
    id: 8,
    question: "How should emergency shutdown be tested?",
    options: [
      "Never test emergency systems",
      "Periodically activate to verify complete system isolation",
      "Only test during faults",
      "Visual inspection only"
    ],
    correctAnswer: 1,
    explanation: "Emergency shutdown should be tested periodically (typically annually) to verify it achieves complete system isolation. Document response time and verify all contactors operate."
  },
  {
    id: 9,
    question: "What should be checked regarding grid protection settings?",
    options: [
      "No checking required",
      "Verify settings match G98/G99 requirements and haven't changed",
      "Only check voltage",
      "Settings cannot be verified"
    ],
    correctAnswer: 1,
    explanation: "Protection settings should be verified against G98/G99 requirements, ensuring anti-islanding, frequency, and voltage trip points are correctly configured and unchanged."
  },
  {
    id: 10,
    question: "What record keeping is required for BESS maintenance?",
    options: [
      "No records required",
      "Maintenance log with dates, findings, actions, and technician details",
      "Only fault records",
      "Just annual summary"
    ],
    correctAnswer: 1,
    explanation: "Maintain a detailed maintenance log including inspection dates, findings, corrective actions, parts replaced, firmware updates, and technician identification for compliance and troubleshooting."
  }
];

const faqs = [
  {
    question: "How often should batteries be fully charged and discharged for calibration?",
    answer: "Most BMS systems benefit from a full charge-discharge cycle monthly for SoC calibration. Some modern systems with advanced algorithms need this less frequently. Follow manufacturer recommendations for your specific system."
  },
  {
    question: "What causes high contact resistance at battery terminals?",
    answer: "High contact resistance results from loose connections, corrosion, contamination, or thermal cycling loosening torqued connections. This causes localised heating, voltage drop, and potential fire risk. Regular torque checks and cleaning prevent this."
  },
  {
    question: "Can I perform maintenance while the battery system is energised?",
    answer: "Most maintenance requires isolation for safety. Visual inspection and data logging can be done while energised, but any physical work on connections, cells, or protective equipment requires proper isolation and lock-out/tag-out procedures."
  },
  {
    question: "What indicates a failing battery cell?",
    answer: "Warning signs include voltage significantly different from other cells, failure to hold charge, excessive self-discharge, physical swelling or deformation, elevated temperature, and unusual BMS alerts. Any of these require investigation."
  },
  {
    question: "How should I dispose of failed battery cells or modules?",
    answer: "Failed batteries are classified as hazardous waste. They must be disposed of through approved battery recycling facilities. Never dispose of lithium batteries in general waste due to fire risk. Contact manufacturer or specialist recycler for collection."
  },
  {
    question: "What training is required for BESS maintenance?",
    answer: "Technicians should have electrical competence (e.g., 18th Edition), manufacturer-specific training for the battery and inverter systems, and understanding of battery chemistry hazards. High-voltage battery work may require additional competencies."
  }
];

const RenewableEnergyModule4Section6 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
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
            <span>Module 4 Section 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BESS Commissioning and Maintenance
          </h1>
          <p className="text-white/80">
            Testing procedures, commissioning checklists, and maintenance schedules
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Commissioning Steps</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Pre-energisation:</strong> Visual and connection checks</li>
              <li><strong>Electrical tests:</strong> Insulation, continuity, polarity</li>
              <li><strong>Functional tests:</strong> Protection, communication</li>
              <li><strong>Documentation:</strong> EIC, settings, records</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Maintenance Schedule</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Monthly:</strong> Remote monitoring review</li>
              <li><strong>Quarterly:</strong> Data analysis, alerts review</li>
              <li><strong>Annually:</strong> Comprehensive inspection</li>
              <li><strong>As needed:</strong> Firmware, calibration</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply systematic commissioning procedures",
              "Perform required electrical tests",
              "Verify protection and communication functions",
              "Complete commissioning documentation",
              "Implement maintenance schedules",
              "Identify and address degradation indicators"
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
            Pre-Commissioning Checks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before energising any battery system, thorough pre-commissioning checks ensure the installation is safe and ready for operation, preventing damage and safety incidents.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Visual Inspection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Installation quality:</strong> Workmanship to acceptable standard</li>
                <li><strong>Component condition:</strong> No visible damage during transport/install</li>
                <li><strong>Labelling:</strong> All required labels in place and legible</li>
                <li><strong>Clearances:</strong> Adequate spacing for ventilation and access</li>
                <li><strong>Cable management:</strong> Properly supported and protected</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Connection Verification:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Torque check:</strong> All connections torqued to specification</li>
                <li><strong>Polarity verification:</strong> Correct DC polarity at all points</li>
                <li><strong>Phase rotation:</strong> Correct for three-phase systems</li>
                <li><strong>Earth connections:</strong> All earthing complete and tight</li>
                <li><strong>Communication cables:</strong> Correctly terminated</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Pre-Energisation Checklist:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Isolation devices in OFF position</li>
                <li>All covers and enclosures secured</li>
                <li>Ventilation paths clear and functional</li>
                <li>Fire detection operational (if installed)</li>
                <li>Emergency procedures posted</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Electrical Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive electrical testing verifies the installation meets safety requirements and will operate reliably throughout its service life.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Insulation Resistance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>AC circuits:</strong> Test per BS 7671 at 500V DC</li>
                <li><strong>DC circuits:</strong> Test at system voltage or manufacturer spec</li>
                <li><strong>Minimum value:</strong> 1 megohm typical, check specific requirements</li>
                <li><strong>Battery isolation:</strong> Disconnect battery before testing DC cables</li>
                <li><strong>Record results:</strong> Document for baseline comparison</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Continuity Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Protective conductors:</strong> Verify earth continuity throughout</li>
                <li><strong>Bonding conductors:</strong> All metalwork properly bonded</li>
                <li><strong>Ring final circuits:</strong> If applicable, test as per BS 7671</li>
                <li><strong>Acceptable values:</strong> Generally less than 1 ohm</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Earth Fault Loop Impedance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Measurement:</strong> Zs at furthest point from supply</li>
                <li><strong>Verification:</strong> Confirm protection will operate within limits</li>
                <li><strong>RCD testing:</strong> Verify trip time and current</li>
                <li><strong>Documentation:</strong> Record all values on schedule</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Functional Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Functional commissioning verifies that all system components operate correctly together and protection systems respond appropriately to fault conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BMS Verification:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cell voltages:</strong> Read and record individual cell voltages</li>
                <li><strong>Temperature sensors:</strong> Verify all sensors reading correctly</li>
                <li><strong>SoC indication:</strong> Check plausibility of displayed value</li>
                <li><strong>Communication:</strong> Verify data exchange with inverter</li>
                <li><strong>Alarm testing:</strong> Trigger alarms to verify response</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Inverter Commissioning:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Grid connection:</strong> Verify synchronisation and export</li>
                <li><strong>Protection settings:</strong> Confirm G98/G99 compliance</li>
                <li><strong>MPPT operation:</strong> Verify solar tracking (if applicable)</li>
                <li><strong>Mode selection:</strong> Test operating modes function</li>
                <li><strong>Anti-islanding:</strong> Verify disconnection response</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Protection Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Over-voltage:</strong> Verify charging stops at limit</li>
                <li><strong>Under-voltage:</strong> Verify discharge stops at limit</li>
                <li><strong>Over-current:</strong> Confirm current limiting operates</li>
                <li><strong>Temperature:</strong> Verify thermal protection response</li>
                <li><strong>Emergency stop:</strong> Test complete system isolation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Commissioning Records to Document</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>All individual cell voltages at commissioning</li>
                <li>BMS and inverter firmware versions</li>
                <li>All protection settings and thresholds</li>
                <li>Communication parameters and protocols</li>
                <li>Serial numbers of all major components</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Maintenance Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regular maintenance ensures continued safe operation, optimal performance, and early identification of developing issues before they cause system failures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Monthly (Remote):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Performance review:</strong> Energy throughput vs expectations</li>
                <li><strong>Alarm review:</strong> Check for any logged warnings</li>
                <li><strong>SoH monitoring:</strong> Track capacity trends</li>
                <li><strong>Communication:</strong> Verify data logging is current</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Quarterly:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Data analysis:</strong> Review performance trends</li>
                <li><strong>Cell balance:</strong> Check voltage spread between cells</li>
                <li><strong>Temperature patterns:</strong> Identify any hot spots</li>
                <li><strong>Efficiency tracking:</strong> Monitor round-trip efficiency</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Annual Inspection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Physical inspection:</strong> Check for corrosion, damage, pests</li>
                <li><strong>Connection torque:</strong> Re-torque all critical connections</li>
                <li><strong>Ventilation:</strong> Clean filters, verify fan operation</li>
                <li><strong>Protection test:</strong> Verify all protection functions</li>
                <li><strong>Firmware review:</strong> Check for available updates</li>
                <li><strong>Documentation update:</strong> Record all findings and actions</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Troubleshooting and Degradation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Recognising early signs of degradation and systematic troubleshooting approach enables timely intervention before minor issues become major failures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Degradation Indicators:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Capacity reduction:</strong> SoH declining faster than expected</li>
                <li><strong>Cell imbalance:</strong> Increasing voltage spread between cells</li>
                <li><strong>Temperature rise:</strong> Higher than historical normal</li>
                <li><strong>Efficiency drop:</strong> Lower round-trip efficiency</li>
                <li><strong>Increased alarms:</strong> More frequent protection triggers</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Fault Conditions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Communication failure:</strong> Check cables, settings, termination</li>
                <li><strong>Charging issues:</strong> BMS limits, inverter settings, SoC accuracy</li>
                <li><strong>Grid disconnection:</strong> Protection settings, grid conditions</li>
                <li><strong>High temperature:</strong> Ventilation, ambient, connection resistance</li>
                <li><strong>Low capacity:</strong> Cell degradation, calibration needed</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">When to Escalate</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cell swelling:</strong> Immediately isolate and contact manufacturer</li>
                <li><strong>Smoke or odour:</strong> Isolate, evacuate, call emergency services</li>
                <li><strong>Significant capacity loss:</strong> Warranty claim investigation</li>
                <li><strong>Repeated protection trips:</strong> Root cause investigation needed</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Follow manufacturer commissioning checklist completely</li>
                <li>Record all baseline measurements for future comparison</li>
                <li>Verify customer understands operation and emergency procedures</li>
                <li>Complete all required documentation before handover</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Performing Maintenance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always isolate before physical work on system</li>
                <li>Compare current readings against commissioning baseline</li>
                <li>Look for trends rather than single values</li>
                <li>Document everything including no-fault-found inspections</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping pre-checks</strong> - can cause immediate failure or safety issue</li>
                <li><strong>Poor documentation</strong> - makes troubleshooting difficult later</li>
                <li><strong>Ignoring trends</strong> - small changes indicate developing problems</li>
                <li><strong>Deferred maintenance</strong> - allows minor issues to become major</li>
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
            <Link to="../section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              Complete Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule4Section6;
