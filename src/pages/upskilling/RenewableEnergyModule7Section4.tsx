import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fault-Finding in Renewable Systems - Renewable Energy Module 7";
const DESCRIPTION =
  "Develop systematic fault-finding skills for PV, battery, and inverter systems including diagnostic techniques, error code interpretation, and root cause analysis.";

const quickCheckQuestions = [
  {
    id: "fault-qc1",
    question: "What is the first step in systematic fault-finding?",
    options: [
      "Replace the inverter",
      "Document symptoms and gather information",
      "Disconnect all components",
      "Call the manufacturer",
    ],
    correctIndex: 1,
    explanation:
      "Systematic fault-finding begins with documenting symptoms, reviewing error codes, and gathering information about the fault conditions before any physical investigation.",
  },
  {
    id: "fault-qc2",
    question: "What does a ground fault indication on a PV inverter typically suggest?",
    options: [
      "Inverter failure",
      "Insulation breakdown in DC wiring or modules",
      "Grid connection issue",
      "Module degradation",
    ],
    correctIndex: 1,
    explanation:
      "Ground faults typically indicate insulation breakdown allowing current to flow to earth, commonly caused by damaged cables, water ingress, or module junction box issues.",
  },
  {
    id: "fault-qc3",
    question: "Why is it important to distinguish between site and equipment faults?",
    options: [
      "To determine warranty coverage",
      "To avoid unnecessary equipment replacement",
      "Both of the above",
      "Neither - all faults should be treated the same",
    ],
    correctIndex: 2,
    explanation:
      "Distinguishing site issues (installation, environment) from equipment failures prevents unnecessary replacements and ensures the actual root cause is addressed.",
  },
  {
    id: "fault-qc4",
    question: "What testing should be performed before re-energising a system after fault repair?",
    options: [
      "Visual inspection only",
      "Insulation resistance and functional testing",
      "No testing required",
      "Module cleaning only",
    ],
    correctIndex: 1,
    explanation:
      "Before re-energising, insulation resistance testing confirms the repair is effective and functional testing verifies safe operation of protection devices.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the fault tree methodology?",
    options: [
      "A physical inspection technique",
      "A systematic approach working backwards from symptoms",
      "A software diagnostic tool",
      "A manufacturer support procedure",
    ],
    correctAnswer: 1,
    explanation:
      "Fault tree methodology starts with the observed symptom and systematically works backwards through possible causes, testing hypotheses to isolate the root cause.",
  },
  {
    id: 2,
    question: "What does zero current on a PV string with normal voltage indicate?",
    options: [
      "Complete string failure",
      "Open circuit in the string (blown fuse, loose connector)",
      "Inverter MPPT failure",
      "Module degradation",
    ],
    correctAnswer: 1,
    explanation:
      "Normal voltage with zero current indicates an open circuit - the string can generate voltage but current cannot flow. Check fuses, isolators, and connectors.",
  },
  {
    id: 3,
    question: "What is the significance of intermittent arc fault (AFCI) trips?",
    options: [
      "Normal operation",
      "Faulty AFCI device",
      "Potentially dangerous loose connection requiring investigation",
      "Grid instability",
    ],
    correctAnswer: 2,
    explanation:
      "Intermittent AFCI trips indicate arcing, often from loose connections. These must be investigated as arc faults can cause fires. Never bypass AFCI protection.",
  },
  {
    id: 4,
    question: "What battery BMS fault requires immediate attention?",
    options: [
      "Low state of charge",
      "Cell voltage imbalance greater than 100mV",
      "Normal temperature variation",
      "Scheduled maintenance reminder",
    ],
    correctAnswer: 1,
    explanation:
      "Cell voltage imbalance greater than 100mV indicates potential cell failure or balancing circuit issues, requiring investigation before continued operation.",
  },
  {
    id: 5,
    question: "What does an inverter overvoltage fault typically indicate?",
    options: [
      "PV array too small",
      "Grid voltage too high or string Voc exceeds inverter limit",
      "Low irradiance",
      "Module degradation",
    ],
    correctAnswer: 1,
    explanation:
      "Overvoltage faults occur when input voltage exceeds inverter limits, either from high grid voltage or cold-condition Voc exceeding DC input ratings.",
  },
  {
    id: 6,
    question: "How should you approach a system with multiple simultaneous faults?",
    options: [
      "Address all faults together",
      "Prioritise safety faults, then isolate and address systematically",
      "Replace all components",
      "Ignore minor faults",
    ],
    correctAnswer: 1,
    explanation:
      "Prioritise safety-related faults first. Then isolate the system and address faults systematically, as some may be consequences of others rather than independent issues.",
  },
  {
    id: 7,
    question: "What tool is most useful for identifying thermal anomalies?",
    options: [
      "Multimeter",
      "Thermal imaging camera",
      "Clamp meter",
      "Oscilloscope",
    ],
    correctAnswer: 1,
    explanation:
      "Thermal imaging cameras quickly identify hot spots from loose connections, failed bypass diodes, cell defects, and other thermal anomalies across the system.",
  },
  {
    id: 8,
    question: "What should be verified after replacing a failed inverter?",
    options: [
      "Visual appearance only",
      "Grid settings, communication, and performance match specifications",
      "Colour matches original",
      "No verification needed",
    ],
    correctAnswer: 1,
    explanation:
      "After inverter replacement, verify grid compliance settings match DNO requirements, communication links work, and measured performance matches expected values.",
  },
  {
    id: 9,
    question: "What causes repeated DC fuse failures?",
    options: [
      "Fuse ageing only",
      "Overcurrent from short circuit, ground fault, or undersized fusing",
      "Normal operation",
      "Cold weather",
    ],
    correctAnswer: 1,
    explanation:
      "Repeated fuse failures indicate underlying issues: short circuits, ground faults, arc faults, or incorrect fuse sizing. Investigate the cause before replacing fuses.",
  },
  {
    id: 10,
    question: "When should manufacturer technical support be contacted?",
    options: [
      "Never - always solve problems independently",
      "For warranty claims and complex faults beyond standard diagnostics",
      "For every fault",
      "Only for new equipment",
    ],
    correctAnswer: 1,
    explanation:
      "Contact manufacturers for warranty issues, complex or unusual faults, access to diagnostic tools, and guidance on repairs that could affect warranties.",
  },
];

const faqs = [
  {
    question: "How do I interpret inverter error codes?",
    answer:
      "Consult the manufacturer's documentation for specific error code meanings. Document the code, conditions when it occurred, and any patterns. Many manufacturers provide online databases or technical support for error code interpretation.",
  },
  {
    question: "What causes intermittent faults that are hard to diagnose?",
    answer:
      "Common causes include loose connections that make contact intermittently, temperature-dependent component failures, moisture ingress during specific weather, and grid voltage fluctuations. Use data logging and thermal imaging to capture conditions during fault occurrence.",
  },
  {
    question: "Should I reset an inverter that has faulted?",
    answer:
      "Check error codes and documentation first. Some faults (grid events, temporary conditions) can be safely reset. Others (ground faults, arc faults, overcurrent) require investigation before resetting. Never repeatedly reset without understanding the cause.",
  },
  {
    question: "How do I diagnose communication faults in monitoring systems?",
    answer:
      "Check physical connections (cables, terminators), verify network settings (IP addresses, ports), test communication pathways independently, and review firewall settings. Use manufacturer diagnostic tools where available.",
  },
  {
    question: "What documentation should I create during fault investigation?",
    answer:
      "Record initial symptoms, error codes, environmental conditions, test results, components checked, root cause determination, repairs performed, and verification tests. This supports warranty claims and helps identify recurring issues.",
  },
  {
    question: "How do I handle faults on systems under warranty?",
    answer:
      "Document the fault thoroughly with photographs and data. Contact the manufacturer or installer before attempting repairs that could void warranty. Follow their guidance on diagnostic steps and approved repair procedures.",
  },
];

const RenewableEnergyModule7Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to=".."
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module Overview
          </Link>
          <span className="text-sm text-white">Module 7 • Section 4</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-elec-yellow/10 px-4 py-1.5 text-sm font-medium text-elec-yellow">
              <Zap className="h-4 w-4" />
              Operation and Maintenance
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Fault-Finding in Renewable Systems
            </h1>
            <p className="text-lg text-white sm:text-xl">
              Systematic diagnostics for PV, battery, and inverter systems to reduce downtime and prevent unnecessary repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Systematic Approach</h3>
              <p className="text-sm text-white">
                Following a logical fault-finding methodology prevents guesswork and ensures the actual root cause is identified and addressed.
              </p>
            </div>
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Root Cause Analysis</h3>
              <p className="text-sm text-white">
                Distinguishing between equipment failures and site-related issues ensures appropriate repairs and prevents recurring faults.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Learning Outcomes</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Use logical steps for fault isolation",
                "Interpret error codes and warning signals",
                "Differentiate between hardware and configuration issues",
                "Apply appropriate testing techniques",
                "Document fault investigation findings",
                "Determine when to escalate to manufacturer support",
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-elec-yellow" />
                  <span className="text-sm text-white">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Section 01 */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                01
              </span>
              <h2 className="text-2xl font-bold text-white">Systematic Fault-Finding Methodology</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Effective fault-finding follows a structured approach that prevents wasted time and ensures the actual root cause is identified.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Fault Tree Approach</h4>
                <ol className="list-inside list-decimal space-y-2">
                  <li><strong>Document the symptom:</strong> What is the observed problem?</li>
                  <li><strong>Gather information:</strong> Error codes, monitoring data, recent changes</li>
                  <li><strong>List possible causes:</strong> What could produce this symptom?</li>
                  <li><strong>Prioritise by likelihood:</strong> Most common causes first</li>
                  <li><strong>Test hypotheses:</strong> Systematically eliminate possibilities</li>
                  <li><strong>Identify root cause:</strong> Confirm with testing</li>
                  <li><strong>Implement repair:</strong> Address the actual cause</li>
                  <li><strong>Verify resolution:</strong> Confirm system operates correctly</li>
                </ol>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Information Gathering</h4>
                <ul className="list-inside list-disc space-y-1">
                  <li>Review inverter display and error codes</li>
                  <li>Check monitoring system for performance data</li>
                  <li>Note environmental conditions (weather, temperature)</li>
                  <li>Ask about recent events, changes, or maintenance</li>
                  <li>Review historical fault logs for patterns</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Isolation Techniques</h4>
                <ul className="list-inside list-disc space-y-1">
                  <li>Test individual components separately</li>
                  <li>Use bypass methods where safe</li>
                  <li>Compare with known good references</li>
                  <li>Validate findings with multiple test methods</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 02 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                02
              </span>
              <h2 className="text-2xl font-bold text-white">Common PV System Faults</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Understanding common fault patterns and their signatures enables rapid diagnosis and targeted repairs.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Complete String Failure</h4>
                <p className="mb-2"><strong>Symptoms:</strong> Zero current, no voltage under load</p>
                <p className="mb-2"><strong>Common causes:</strong></p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Blown string fuse (most common)</li>
                  <li>Loose MC4 connector</li>
                  <li>Cable damage from wildlife</li>
                  <li>Failed DC isolator</li>
                  <li>Module junction box failure</li>
                </ul>
                <p className="mt-2"><strong>Diagnosis:</strong> Check DC isolators and fuses first, then measure Voc at combiner box, trace cable route for damage.</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Module Mismatch/Underperformance</h4>
                <p className="mb-2"><strong>Symptoms:</strong> Uneven string currents, reduced output, thermal hotspots</p>
                <p className="mb-2"><strong>Common causes:</strong></p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Partial shading from new obstructions</li>
                  <li>Uneven soiling accumulation</li>
                  <li>Bypass diode failure</li>
                  <li>Cell-level degradation</li>
                  <li>Manufacturing defects</li>
                </ul>
                <p className="mt-2"><strong>Diagnosis:</strong> I-V curve tracing, thermal imaging during peak sunlight, string current comparison.</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Ground Fault Detection</h4>
                <p className="mb-2"><strong>Symptoms:</strong> Ground fault alarm, reduced insulation resistance</p>
                <p className="mb-2"><strong>Common causes:</strong></p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Water ingress into junction boxes</li>
                  <li>Cable insulation damage</li>
                  <li>Rodent damage</li>
                  <li>UV degradation of cables</li>
                  <li>Installation damage</li>
                </ul>
                <p className="mt-2"><strong>Diagnosis:</strong> Insulation resistance testing at 500V DC, systematic string isolation to locate fault.</p>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 03 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                03
              </span>
              <h2 className="text-2xl font-bold text-white">Battery and Inverter Faults</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Battery storage and power electronics introduce additional complexity requiring specialised diagnostic approaches.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Battery Management System Faults</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Overvoltage protection:</strong> Cell voltage greater than 4.2V (Li-ion) - indicates charging issue</li>
                  <li><strong>Undervoltage protection:</strong> Cell voltage less than 2.5V (Li-ion) - indicates over-discharge</li>
                  <li><strong>Cell imbalance:</strong> Voltage variation greater than 100mV indicates balancing or cell failure</li>
                  <li><strong>Temperature protection:</strong> Operating outside safe range requires cooling/heating review</li>
                  <li><strong>Communication errors:</strong> BMS module communication failures</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Inverter Faults</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Grid voltage fault:</strong> Check utility supply, voltage may be outside acceptable range</li>
                  <li><strong>Frequency fault:</strong> Grid frequency deviation triggering protection</li>
                  <li><strong>Overcurrent:</strong> May indicate internal fault or excessive load</li>
                  <li><strong>Overtemperature:</strong> Check ventilation, ambient temperature, cooling fans</li>
                  <li><strong>Isolation fault:</strong> DC-side ground fault detection</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Internal Component Failures</h4>
                <ul className="list-inside list-disc space-y-1">
                  <li>IGBT or MOSFET switching device failure</li>
                  <li>DC bus capacitor degradation</li>
                  <li>Cooling system malfunction</li>
                  <li>Control board or sensor failure</li>
                  <li>EMC filter component breakdown</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 04 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                04
              </span>
              <h2 className="text-2xl font-bold text-white">Site vs Equipment Root Causes</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Determining whether faults originate from site conditions or equipment failure is crucial for effective repairs and warranty claims.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Site-Related Causes</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Earthing issues:</strong> Poor earthing or bonding causing protection trips</li>
                  <li><strong>Cable sizing:</strong> Undersized cables causing voltage drop or overheating</li>
                  <li><strong>Environmental:</strong> Excessive dust, moisture, salt spray, or animal damage</li>
                  <li><strong>Grid quality:</strong> Voltage fluctuations, frequency issues, harmonics</li>
                  <li><strong>Installation errors:</strong> Incorrect connections, torque, or configuration</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Equipment Failures</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Component wear:</strong> Capacitor ageing, fan bearing failure</li>
                  <li><strong>Manufacturing defects:</strong> Cell defects, solder failures</li>
                  <li><strong>Software bugs:</strong> Firmware issues causing incorrect behaviour</li>
                  <li><strong>Design limitations:</strong> Equipment not suitable for conditions</li>
                  <li><strong>Age-related:</strong> Normal end-of-life degradation</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Determination Approach</h4>
                <ol className="list-inside list-decimal space-y-1">
                  <li>Review installation records for compliance</li>
                  <li>Check environmental conditions against specifications</li>
                  <li>Verify grid supply quality</li>
                  <li>Test replacement equipment to confirm equipment fault</li>
                  <li>Document findings for warranty discussions</li>
                </ol>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          {/* Section 05 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                05
              </span>
              <h2 className="text-2xl font-bold text-white">Safety During Fault Investigation</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Fault investigation on energised or recently active systems requires careful attention to safety procedures.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">High Voltage Hazards</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>PV arrays remain energised in daylight - cannot be fully isolated</li>
                  <li>Battery systems maintain voltage even when isolated</li>
                  <li>Capacitors can store energy after disconnection</li>
                  <li>Verify zero energy state before intrusive work</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Arc Flash Risk</h4>
                <p className="mb-2">
                  DC arc faults are particularly dangerous as they can be sustained indefinitely:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Use appropriate arc-rated PPE</li>
                  <li>Maintain safe working distances</li>
                  <li>Never work on suspected arc fault sources when energised</li>
                  <li>Investigate AFCI trips thoroughly before re-energising</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Safe Testing Procedures</h4>
                <ul className="list-inside list-disc space-y-1">
                  <li>Use properly rated test equipment (CAT III minimum)</li>
                  <li>Verify test lead integrity before use</li>
                  <li>Follow GS38 guidance for test equipment</li>
                  <li>Prove test equipment before and after testing</li>
                  <li>Never assume - always verify isolation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-12 mt-12">
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/5 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Practical Guidance</h2>
              <div className="space-y-4 text-white">
                <div>
                  <h4 className="font-semibold text-elec-yellow">Building Diagnostic Skills</h4>
                  <p className="mt-1 text-sm">
                    Document every fault investigation including initial hypotheses and actual findings. Review cases to identify patterns and improve diagnostic efficiency over time.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">When to Seek Help</h4>
                  <p className="mt-1 text-sm">
                    Do not hesitate to contact manufacturer technical support for complex faults or unfamiliar error codes. Document your investigation thoroughly before calling to enable efficient support.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Avoiding Common Mistakes</h4>
                  <p className="mt-1 text-sm">
                    Do not jump to conclusions or replace components without testing. Always verify the repair has resolved the issue before leaving site. Document findings even when faults are quickly resolved.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="mb-2 font-semibold text-elec-yellow">{faq.question}</h3>
                  <p className="text-sm text-white">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="Fault-Finding Quiz"
              questions={quizQuestions}
              onComplete={(score) => console.log("Quiz completed with score:", score)}
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
            <Link to="/upskilling/renewable-energy/module-7/section-3">
              <Button variant="outline" className="w-full gap-2 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/upskilling/renewable-energy/module-7/section-5">
              <Button className="w-full gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 sm:w-auto">
                Next Section
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section4;
