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
      "Software glitch",
    ],
    correctAnswer: 2,
    explanation:
      "Intermittent AFCI trips often indicate loose connections that create arcing under certain conditions. These require urgent investigation as they can cause fires.",
  },
  {
    id: 4,
    question: "How should inverter error codes be used in fault-finding?",
    options: [
      "Ignored - they are unreliable",
      "Used as a starting point for investigation, not definitive diagnosis",
      "Taken as absolute confirmation of fault location",
      "Only relevant for warranty claims",
    ],
    correctAnswer: 1,
    explanation:
      "Error codes provide valuable diagnostic information but indicate symptoms rather than root causes. Use them to guide investigation, not as definitive diagnosis.",
  },
  {
    id: 5,
    question: "What does reduced string voltage (lower than expected Voc) typically indicate?",
    options: [
      "Inverter fault",
      "Shaded or bypassed cells, or failed bypass diodes",
      "Grid voltage issue",
      "Incorrect system design",
    ],
    correctAnswer: 1,
    explanation:
      "Lower than expected Voc indicates some cells are bypassed (due to shading, cell failure, or stuck bypass diodes), reducing the string voltage.",
  },
  {
    id: 6,
    question: "What should be checked if multiple strings show similar underperformance?",
    options: [
      "Individual module faults",
      "Common factors like inverter, irradiance measurement, or shading",
      "Cable sizing",
      "String fuse ratings",
    ],
    correctAnswer: 1,
    explanation:
      "Consistent underperformance across multiple strings suggests common factors like inverter issues, soiling, environmental conditions, or incorrect baseline assumptions.",
  },
  {
    id: 7,
    question: "What is the purpose of comparing measured values to commissioning records?",
    options: [
      "Regulatory requirement only",
      "Identify degradation or changes from baseline",
      "No practical purpose",
      "Only for warranty claims",
    ],
    correctAnswer: 1,
    explanation:
      "Commissioning records provide baseline values for comparison, helping identify changes that indicate developing faults or degradation over time.",
  },
  {
    id: 8,
    question: "How should communication faults be approached?",
    options: [
      "Always replace the inverter",
      "Check physical connections, configuration, and network issues systematically",
      "Ignore - they do not affect generation",
      "Wait for automatic recovery",
    ],
    correctAnswer: 1,
    explanation:
      "Communication faults require systematic checking of physical connections, network configuration, and software settings before assuming hardware failure.",
  },
  {
    id: 9,
    question: "What battery fault requires immediate system shutdown?",
    options: [
      "Low state of charge",
      "Signs of thermal runaway (swelling, smoke, unusual heat)",
      "Communication errors",
      "Slow charge rate",
    ],
    correctAnswer: 1,
    explanation:
      "Thermal runaway signs (swelling, smoke, extreme heat, unusual odours) require immediate isolation and evacuation - this is a fire and explosion hazard.",
  },
  {
    id: 10,
    question: "What is the value of documenting fault-finding procedures and outcomes?",
    options: [
      "No value",
      "Building knowledge base for future similar faults",
      "Warranty purposes only",
      "Customer entertainment",
    ],
    correctAnswer: 1,
    explanation:
      "Documentation builds institutional knowledge, speeds diagnosis of recurring issues, supports training, and provides evidence for warranty claims.",
  },
];

const faqs = [
  {
    question: "How do I approach a complete system failure?",
    answer:
      "Start with the basics - verify AC supply is present, check all isolators are on, review monitoring for error codes. If no power, work backwards from the inverter to the array checking for open circuits. Verify grid connection status. Document findings systematically.",
  },
  {
    question: "What causes ground fault indications that clear when tested?",
    answer:
      "Intermittent ground faults are often caused by moisture ingress that dries out, damaged insulation that only makes contact under certain conditions, or loose connections. They require thorough investigation including insulation resistance testing in various conditions.",
  },
  {
    question: "How do I diagnose inverter efficiency loss?",
    answer:
      "Compare DC input to AC output power. Check for excess heat indicating internal issues. Review efficiency trends over time - gradual decline often indicates capacitor ageing. Compare to manufacturer specifications and similar units in the fleet.",
  },
  {
    question: "What tools are essential for PV fault-finding?",
    answer:
      "Essential tools include a CAT III/IV rated multimeter, DC clamp meter, insulation resistance tester, and thermal imaging camera. I-V curve tracers are valuable for detailed module diagnostics. Always ensure tools are rated for DC voltages present.",
  },
  {
    question: "How should I handle faults I cannot diagnose?",
    answer:
      "Document all observations and test results. Consult manufacturer technical support with specific error codes and measurements. Consider engaging specialist diagnostic services. Do not guess - incorrect repairs waste time and money.",
  },
  {
    question: "What is the most common cause of underperformance?",
    answer:
      "Soiling is the most common cause of underperformance, followed by shading (often from new vegetation or building changes), followed by component faults. Always check the simple causes first before assuming equipment failure.",
  },
];

const RenewableEnergyModule7Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="..">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">Fault-Finding in Renewable Systems</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 7 - Section 4</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Fault-Finding in Renewable Systems
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Systematic diagnostic techniques for PV, battery, and inverter systems
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">In 30 Seconds:</span> Document symptoms first, then work backwards from the fault
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Spot it:</span> Zero current with voltage = open circuit; low voltage = bypassed cells
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Use it:</span> Compare to commissioning records and baseline performance
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Key Rule:</span> Test IR and verify protection before re-energising
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Apply systematic fault-finding methodology",
            "Interpret common error codes and symptoms",
            "Diagnose PV array, inverter, and battery faults",
            "Distinguish equipment faults from installation issues",
            "Document findings for warranty and knowledge building",
            "Verify repairs before system re-energisation",
          ].map((outcome, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 shrink-0" />
              <span className="text-white/80 text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl font-semibold text-white">Systematic Fault-Finding Approach</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Effective fault-finding follows a systematic approach rather than random component replacement, saving time and avoiding unnecessary costs.
            </p>
            <p>
              <span className="text-white font-medium">Information Gathering:</span> Document all symptoms including error codes, performance data, and fault timing. Review monitoring history for patterns. Check recent weather events and maintenance activities. Note any changes to site conditions or equipment.
            </p>
            <p>
              <span className="text-white font-medium">Fault Tree Analysis:</span> Start with the observed symptom and work backwards through possible causes. Test hypotheses systematically, ruling out possibilities until root cause is identified. Consider multiple simultaneous faults in complex situations.
            </p>
            <p>
              <span className="text-white font-medium">Test and Verify:</span> Use appropriate test equipment to confirm hypotheses. Compare measurements to expected values and commissioning records. After repair, test to confirm the fault is resolved before full re-commissioning.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">PV Array Fault Diagnosis</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Array faults can be identified through voltage and current measurements combined with visual inspection and thermal imaging.
            </p>
            <p>
              <span className="text-white font-medium">Voltage Anomalies:</span> Low Voc indicates bypassed cells from shading, cell failure, or stuck bypass diodes. Very low or zero Voc suggests complete string open circuit. Inconsistent string voltages warrant individual string investigation.
            </p>
            <p>
              <span className="text-white font-medium">Current Anomalies:</span> Zero current with normal voltage indicates open circuit such as blown fuse, open isolator, or loose connector. Low current suggests partial shading, soiling, or cell degradation. Use DC clamp meter to compare string currents.
            </p>
            <p>
              <span className="text-white font-medium">Ground Faults:</span> Ground fault indications typically result from insulation breakdown. Check cables for damage, especially at penetrations and junction boxes. Water ingress is a common cause. Use insulation resistance testing to locate the fault.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Inverter Fault Diagnosis</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Inverters provide error codes and data that guide diagnosis, but symptoms must be interpreted in context rather than taken at face value.
            </p>
            <p>
              <span className="text-white font-medium">Error Code Interpretation:</span> Codes indicate what the inverter detected, not necessarily the root cause. Grid voltage errors may result from DNO issues or internal sensing faults. Ground fault codes may indicate array problems or inverter sensor failures. Review manufacturer documentation for specific code meanings.
            </p>
            <p>
              <span className="text-white font-medium">Efficiency Loss:</span> Compare DC input power to AC output power. Gradual efficiency decline often indicates capacitor degradation. Sudden drops may indicate failed components. Check for cooling system issues causing thermal derating.
            </p>
            <p>
              <span className="text-white font-medium">Communication Failures:</span> Check physical connections first such as RS485, Ethernet, and WiFi. Verify network configuration and IP settings. Review firewall and port settings. Try manufacturer diagnostic tools before assuming hardware failure.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Battery System Fault Diagnosis</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Battery fault diagnosis requires particular care due to the safety hazards associated with battery systems.
            </p>
            <p>
              <span className="text-white font-medium">Critical Safety Issues:</span> Signs of thermal runaway such as swelling, smoke, unusual heat, or strange odours require immediate isolation and evacuation. Do not attempt diagnosis. Contact fire services if necessary and manufacturer emergency support.
            </p>
            <p>
              <span className="text-white font-medium">Performance Issues:</span> Check cell voltage balance as excessive imbalance indicates failing cells. Review temperature distribution and look for abnormal hot spots. Verify BMS operation and communication. Compare capacity tests to specifications.
            </p>
            <p>
              <span className="text-white font-medium">Charging/Discharging Faults:</span> Verify inverter settings match battery requirements. Check communication between BMS and inverter. Review protection settings such as voltage limits and current limits. Confirm cooling system operation is adequate for ambient conditions.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Post-Repair Verification</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Thorough verification after repairs ensures the fault is fully resolved and the system can be safely returned to service.
            </p>
            <p>
              <span className="text-white font-medium">Before Re-Energisation:</span> Perform insulation resistance testing on affected circuits. Verify all connections are correctly made and torqued. Confirm protection devices are functional. Remove all tools and temporary equipment.
            </p>
            <p>
              <span className="text-white font-medium">Functional Testing:</span> Energise the system and observe initial operation. Verify error codes have cleared. Check performance metrics return to expected values. Monitor for any recurrence of symptoms.
            </p>
            <p>
              <span className="text-white font-medium">Documentation:</span> Record fault symptoms, diagnosis process, and repair actions. Document test results before and after repair. Note any recommendations for preventing recurrence. Update maintenance records and commissioning data.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-elec-yellow" />
            Practical Guidance
          </h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <span className="text-white font-medium">Check simple causes first:</span> Soiling, tripped isolators, and loose connections cause more problems than component failures. Always rule out the obvious before assuming major faults.
            </p>
            <p>
              <span className="text-white font-medium">Use manufacturer resources:</span> Technical support lines, diagnostic software, and documentation can save significant time. Build relationships with manufacturer technical teams.
            </p>
            <p>
              <span className="text-white font-medium">Build diagnostic skills over time:</span> Document every fault diagnosis to build personal and team knowledge. Patterns emerge that speed future diagnosis of similar issues.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Fault-Finding Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-3">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="../section-5">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section4;
