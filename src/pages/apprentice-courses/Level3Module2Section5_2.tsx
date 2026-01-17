/**
 * Level 3 Module 2 Section 5.2
 * Exporting Energy Back to the Grid
 *
 * Design follows: Level3ContentTemplate.tsx
 * Mobile optimised with touch targets and dark theme
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
const TITLE = "Exporting Energy Back to the Grid - Level 3 Module 2 Section 5.2";
const DESCRIPTION = "Understanding grid export requirements, DNO notification procedures, Smart Export Guarantee, and bi-directional energy flow for renewable installations.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the G98 notification process primarily designed for?",
    options: [
      "Commercial solar farms only",
      "Single premises connections up to 16A per phase (3.68kW single-phase)",
      "All renewable installations regardless of size",
      "Battery storage systems only"
    ],
    correctIndex: 1,
    explanation: "G98 applies to smaller installations connecting to a single premises with generation up to 16A per phase. For single-phase, this equates to approximately 3.68kW. This simplified process allows notification rather than full application."
  },
  {
    id: "check-2",
    question: "Why might a DNO impose an export limitation on a renewable installation?",
    options: [
      "To increase the customer's electricity bills",
      "To protect local network infrastructure from overloading",
      "Export limitations are never imposed in the UK",
      "To prevent the system from generating during peak hours"
    ],
    correctIndex: 1,
    explanation: "DNOs may limit export where local network capacity cannot safely absorb the generated power. This protects transformers and cables from overloading, prevents voltage rise issues, and maintains supply quality for other customers."
  },
  {
    id: "check-3",
    question: "What is the Smart Export Guarantee (SEG)?",
    options: [
      "A government grant for solar panels",
      "An obligation on larger suppliers to pay for exported renewable electricity",
      "Insurance for exported energy",
      "A type of smart meter"
    ],
    correctIndex: 1,
    explanation: "The SEG requires licensed electricity suppliers with 150,000+ customers to offer tariffs paying for exported renewable electricity. Rates vary between suppliers, so customers should compare offers to maximise returns."
  },
  {
    id: "check-4",
    question: "What equipment is essential for measuring exported energy accurately?",
    options: [
      "A standard single-direction meter",
      "A smart meter capable of measuring bidirectional flow",
      "The inverter's built-in display",
      "No special equipment is needed"
    ],
    correctIndex: 1,
    explanation: "A smart meter with export capability measures power flowing both into and out of the property. This provides accurate data for SEG payments. Older meters cannot measure export and may run backwards, which is not permitted."
  }
];

// ============================================
// QUIZ QUESTIONS (10 minimum)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the maximum single-phase generation capacity that falls under G98 notification rather than G99 application?",
    options: [
      "1kW",
      "3.68kW (16A per phase)",
      "5kW",
      "10kW"
    ],
    correctAnswer: 1,
    explanation: "G98 covers installations up to 16A per phase, which equates to 3.68kW for single-phase (16A x 230V = 3.68kW). Larger installations require G99 application, which involves more detailed assessment by the DNO."
  },
  {
    id: 2,
    question: "What is anti-islanding protection and why is it essential for grid-connected systems?",
    options: [
      "It prevents the system working on islands",
      "It stops the inverter generating when grid power fails, protecting network workers",
      "It limits export during peak demand",
      "It protects against lightning strikes"
    ],
    correctAnswer: 1,
    explanation: "Anti-islanding ensures the inverter shuts down within milliseconds if grid power fails. This prevents the system from energising what workers assume is a dead network, protecting anyone working on the distribution system from electrocution."
  },
  {
    id: 3,
    question: "Which document confirms that a PV installation meets DNO requirements for grid connection?",
    options: [
      "Building Regulations Approval",
      "G98/G99 Commissioning Confirmation (DNO notification form)",
      "The electricity bill",
      "The inverter warranty certificate"
    ],
    correctAnswer: 1,
    explanation: "The G98 or G99 commissioning confirmation, submitted to the DNO, confirms the installation meets grid connection requirements. This includes details of the inverter, its anti-islanding protection, and the installation's compliance with Engineering Recommendation G98 or G99."
  },
  {
    id: 4,
    question: "What happens if exported energy causes voltage rise on the local network?",
    options: [
      "Nothing, voltage rise is always acceptable",
      "The DNO may require export limiting or reject the connection",
      "The customer receives a bonus payment",
      "The smart meter automatically adjusts"
    ],
    correctAnswer: 1,
    explanation: "Excessive voltage rise affects supply quality for other customers and can damage equipment. If export would cause unacceptable voltage rise, the DNO may require zero export limiting, reduced export, or in some cases may not permit the connection without network reinforcement."
  },
  {
    id: 5,
    question: "How does a zero-export limiter typically work?",
    options: [
      "It physically disconnects the array from the grid",
      "It monitors grid power flow and curtails generation to prevent export",
      "It stores all excess energy in batteries",
      "It only allows generation at night"
    ],
    correctAnswer: 1,
    explanation: "A zero-export limiter uses CT clamps to monitor power flow at the meter point. When it detects power flowing towards the grid (export), it signals the inverter to reduce output, matching generation to consumption and preventing any export."
  },
  {
    id: 6,
    question: "What is the difference between 'deemed' and 'metered' export under the SEG?",
    options: [
      "There is no difference",
      "Deemed assumes 50% export; metered measures actual export via smart meter",
      "Deemed pays more than metered",
      "Metered is only for commercial installations"
    ],
    correctAnswer: 1,
    explanation: "Deemed export assumes 50% of generation is exported, regardless of actual usage. Metered export uses smart meter data to pay for actual exported units. Metered typically benefits those who export more than 50%, while deemed suits those with high self-consumption."
  },
  {
    id: 7,
    question: "Why must the installer notify the DNO of a renewable installation?",
    options: [
      "For tax purposes only",
      "So the DNO can manage network capacity and ensure safe operation",
      "Notification is optional",
      "To claim subsidies"
    ],
    correctAnswer: 1,
    explanation: "DNO notification is a legal requirement enabling them to manage network capacity, plan for bidirectional power flows, ensure transformer and cable ratings aren't exceeded, and maintain records of generation equipment connected to their network."
  },
  {
    id: 8,
    question: "What certification is typically required to be eligible for SEG payments?",
    options: [
      "No certification required",
      "MCS certification or equivalent for the installation",
      "Only the inverter needs certification",
      "University degree in electrical engineering"
    ],
    correctAnswer: 1,
    explanation: "SEG eligibility typically requires MCS (Microgeneration Certification Scheme) certification, which confirms the installation was completed by an accredited installer to appropriate standards. Some suppliers may accept equivalent certifications."
  },
  {
    id: 9,
    question: "How does battery storage affect the grid export from a PV system?",
    options: [
      "It has no effect",
      "It can store excess generation for later use, reducing daytime export",
      "It always increases export",
      "Batteries cannot be used with grid-connected systems"
    ],
    correctAnswer: 1,
    explanation: "Battery storage captures excess generation that would otherwise be exported, storing it for use when generation is insufficient. This reduces export (and SEG income) but increases self-consumption, potentially offering better overall financial returns depending on tariff rates."
  },
  {
    id: 10,
    question: "What voltage level does the UK low voltage distribution network operate at?",
    options: [
      "110V",
      "230V nominal (single-phase), 400V (three-phase)",
      "415V only",
      "120V"
    ],
    correctAnswer: 1,
    explanation: "UK low voltage distribution operates at 230V nominal single-phase (with +10%/-6% tolerance) and 400V three-phase. Understanding this is essential when considering voltage rise from export and compliance with network voltage limits."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How much can I earn from exporting electricity?",
    answer: "SEG rates vary between suppliers and change over time. As of recent rates, payments typically range from 1p to 15p per kWh exported, depending on supplier and tariff type. Compare offers from different suppliers and consider whether metered or deemed export suits your usage pattern better."
  },
  {
    question: "What happens if I install solar without notifying the DNO?",
    answer: "Installing without notification breaches G98/G99 requirements and may invalidate insurance. The DNO can require disconnection, and you won't be eligible for SEG payments. MCS certification also requires proper DNO notification, so the installation wouldn't be certifiable."
  },
  {
    question: "Can the DNO refuse my grid connection?",
    answer: "The DNO cannot unreasonably refuse, but they can impose conditions such as export limiting or require network reinforcement at the customer's expense. If your proposed installation would cause unacceptable network issues (voltage rise, overloading), they may offer alternatives rather than a straight refusal."
  },
  {
    question: "Do I need a smart meter to receive SEG payments?",
    answer: "For metered export, yes - a smart meter with export capability is essential. Some suppliers offer deemed export tariffs that assume 50% export without measuring, but rates are often lower. Requesting a smart meter installation before or alongside solar installation is recommended."
  },
  {
    question: "What is the difference between G98 and G99?",
    answer: "G98 covers smaller installations (up to 16A per phase) with a simplified notification process taking about 28 days. G99 covers larger installations requiring full application with technical assessment. The process is more detailed and the timeline depends on DNO assessment of network capacity."
  },
  {
    question: "Can I export from battery storage as well as solar?",
    answer: "Yes, but the combined export capability of all sources must be considered for DNO notification. Battery-to-grid export may have different rules depending on whether the battery charges from solar or grid. Some tariffs specifically value battery export for grid balancing services."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER
          ======================================== */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ========================================
          MAIN ARTICLE CONTENT
          ======================================== */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Exporting Energy Back to the Grid
          </h1>
          <p className="text-white/80">
            Grid connection requirements, DNO processes, and export payments
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>G98:</strong> Notify DNO for systems up to 3.68kW single-phase</li>
              <li><strong>G99:</strong> Apply to DNO for larger installations</li>
              <li><strong>SEG:</strong> Suppliers must pay for exported renewable electricity</li>
              <li><strong>Smart meter:</strong> Essential for measuring actual export</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Smart meters with export display, CT clamps at tails</li>
              <li><strong>Use:</strong> Check G98/G99 thresholds before system sizing</li>
              <li><strong>Apply:</strong> Complete DNO notification before commissioning</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "G98 and G99 notification/application processes",
              "Smart Export Guarantee eligibility and requirements",
              "Why anti-islanding protection is mandatory",
              "Export limiting and zero-export configurations",
              "Smart meter requirements for export measurement",
              "Network voltage considerations for export"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            DNO Notification and Application Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before any generation system can legally export to the grid, the Distribution Network Operator (DNO) must be notified or, for larger systems, must approve the connection. This isn't optional bureaucracy - it's essential for safe network operation. The DNO needs to know what generation connects to their network to manage capacity, plan for bidirectional power flows, and ensure network equipment isn't overloaded.
            </p>

            <p>
              The process depends on the installation size. Engineering Recommendation G98 covers smaller installations up to 16A per phase - approximately 3.68kW for single-phase systems. This simplified process involves notification rather than application, with a typical 28-day timeline. For larger installations, G99 requires a formal application with detailed technical assessment of network capacity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">G98 Notification Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maximum 16A per phase (3.68kW single-phase, 11.04kW three-phase)</li>
                <li>Single premises connection only</li>
                <li>Type tested inverter with certified anti-islanding</li>
                <li>Notification submitted within 28 days of commissioning</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The MCS installation process requires DNO notification as part of certification. Skipping this step means the installation cannot be MCS certified and won't be eligible for SEG payments.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Network Capacity and Export Limitations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The distribution network was originally designed for one-way power flow - from power stations to consumers. Widespread distributed generation reverses this, and not all network sections can handle significant reverse power flow. Understanding these limitations is essential for system design and customer expectation management.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Rise Issues</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Export pushes voltage up at connection point</li>
                  <li>Distant from transformer = greater rise</li>
                  <li>Must stay within statutory limits</li>
                  <li>Affects other customers on same circuit</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Capacity</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cables and transformers have current limits</li>
                  <li>Reverse flow still causes heating</li>
                  <li>Multiple generators compound the issue</li>
                  <li>May require network reinforcement</li>
                </ul>
              </div>
            </div>

            <p>
              Where network capacity is constrained, the DNO may offer connection with an export limitation. This might be zero export (generation limited to site consumption only) or a reduced export level. The system uses CT clamps at the meter point to monitor power flow and signals the inverter to curtail output when export would exceed the limit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Smart Export Guarantee (SEG)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Smart Export Guarantee replaced the Feed-in Tariff for new installations from 2020. Unlike the FiT, which guaranteed specific rates, the SEG requires eligible suppliers to offer tariffs for exported electricity but doesn't set minimum rates. This means customers must actively compare suppliers to get the best deal for their exported power.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">SEG Eligibility Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Installation must be MCS certified (or equivalent)</li>
                <li>Maximum 5MW capacity (different rules above this)</li>
                <li>Smart meter with export capability required for metered tariffs</li>
                <li>DNO notification completed</li>
                <li>Not receiving FiT export payments</li>
              </ul>
            </div>

            <p>
              Suppliers offer two main approaches: metered export uses smart meter data to pay for actual exported units; deemed export assumes 50% of generation is exported regardless of actual consumption. Metered is more accurate but requires smart meter installation. The choice affects income - households with high daytime consumption might export less than 50%, making deemed less attractive.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A 4kW system generates 3,400 kWh annually. Under deemed export (50%), the customer would be paid for 1,700 kWh. If they actually export only 1,200 kWh due to high daytime usage, metered export would pay less. If they export 2,000 kWh, metered pays more.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Anti-Islanding and Safety Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Anti-islanding protection is non-negotiable for all grid-connected generation. It ensures that if the grid supply fails for any reason, the generation system stops exporting immediately. The reason is life-critical: network engineers and emergency services need to know that isolating a section of network makes it dead.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Detection</p>
                <p className="text-white/90 text-xs">Inverter monitors grid frequency and voltage continuously</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Response</p>
                <p className="text-white/90 text-xs">Must disconnect within specified time (typically &lt;500ms)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Reconnection</p>
                <p className="text-white/90 text-xs">Waits for stable grid before resuming (typically 3 minutes)</p>
              </div>
            </div>

            <p>
              Grid-connected inverters achieve this through multiple detection methods. They monitor voltage and frequency, looking for the slight changes that occur when island mode begins. Some also use active techniques, injecting small signals to detect whether they're connected to the grid or just local loads. The inverter must be type-tested and certified to G98/G99 requirements.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Never bypass or disable anti-islanding protection. Doing so creates a potentially lethal hazard for anyone working on the network, violates legal requirements, and invalidates certification.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check network capacity early - use DNO online tools where available</li>
                <li>Size system considering G98 threshold for simpler process</li>
                <li>Request smart meter installation if not present</li>
                <li>Configure export limiter if required before commissioning</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test anti-islanding by disconnecting AC while generating</li>
                <li>Verify export limiter operation with CT clamps correctly positioned</li>
                <li>Record grid voltage to confirm within limits under export</li>
                <li>Complete DNO notification form with accurate inverter details</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Installing before DNO notification</strong> - May require disconnection</li>
                <li><strong>Wrong CT clamp positioning</strong> - Export limiter won't function correctly</li>
                <li><strong>Forgetting smart meter request</strong> - Customer loses metered export option</li>
                <li><strong>Exceeding G98 without G99 application</strong> - Non-compliant connection</li>
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
                <p className="font-medium text-white mb-1">G98 Thresholds</p>
                <ul className="space-y-0.5">
                  <li>Single-phase: 16A / 3.68kW</li>
                  <li>Three-phase: 16A per phase / 11.04kW</li>
                  <li>Notification within 28 days</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">SEG Requirements</p>
                <ul className="space-y-0.5">
                  <li>MCS certification required</li>
                  <li>Smart meter for metered export</li>
                  <li>Compare supplier rates</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Consumer Units
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section5-3">
              Next: Earthing & Protection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section5_2;
