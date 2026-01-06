/**
 * Level 3 Module 2 Section 5.4
 * Load Balancing and Harmonics Considerations
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
const TITLE = "Load Balancing and Harmonics Considerations - Level 3 Module 2 Section 5.4";
const DESCRIPTION = "Understanding electrical load balancing requirements and harmonic distortion in installations with renewable generation and modern electronic loads.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why is load balancing important in a three-phase installation with single-phase PV generation?",
    options: [
      "It's not important - single-phase generation can go on any phase",
      "Unbalanced loads increase neutral current and reduce system efficiency",
      "It only affects the electricity bill, not the installation",
      "Load balancing is only needed for commercial properties"
    ],
    correctIndex: 1,
    explanation: "Unbalanced phases cause current to flow in the neutral conductor, creating I²R losses and potentially overloading the neutral. Adding single-phase generation to the most heavily loaded phase helps balance the system."
  },
  {
    id: "check-2",
    question: "What are harmonics in an electrical system?",
    options: [
      "Low frequency noise from motors",
      "Current or voltage components at multiples of the fundamental frequency (50Hz)",
      "Random fluctuations in the supply",
      "Earth fault currents"
    ],
    correctIndex: 1,
    explanation: "Harmonics are frequency components at integer multiples of the fundamental 50Hz - so 3rd harmonic is 150Hz, 5th is 250Hz, etc. They're produced by non-linear loads like inverters, LED drivers, and switched-mode power supplies."
  },
  {
    id: "check-3",
    question: "How can triplen harmonics (3rd, 9th, 15th) cause problems in three-phase systems?",
    options: [
      "They cancel out in the neutral, so no problems occur",
      "They add together in the neutral, potentially causing overheating",
      "They only affect single-phase systems",
      "Triplen harmonics don't exist in modern systems"
    ],
    correctIndex: 1,
    explanation: "Unlike other harmonics that partially cancel in a balanced three-phase system, triplen harmonics are in-phase and add together in the neutral conductor. This can cause neutral currents exceeding phase currents, leading to overheating."
  },
  {
    id: "check-4",
    question: "What is Total Harmonic Distortion (THD) and why does it matter?",
    options: [
      "The total number of harmonics present in a system",
      "A measure of harmonic content as a percentage of the fundamental, affecting equipment operation",
      "The distortion caused by the electricity meter",
      "Only relevant for audio equipment, not electrical installations"
    ],
    correctIndex: 1,
    explanation: "THD quantifies harmonic content as a percentage of the fundamental frequency component. High THD can cause equipment malfunction, increased losses, overheating of cables and transformers, and interference with sensitive equipment."
  }
];

// ============================================
// QUIZ QUESTIONS (10 minimum)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "In a three-phase supply, what is the typical voltage between any phase and neutral?",
    options: [
      "400V",
      "230V",
      "415V",
      "110V"
    ],
    correctAnswer: 1,
    explanation: "UK three-phase supplies provide 400V between phases (line-to-line) and 230V between any phase and neutral (line-to-neutral). Understanding this is essential for load balancing calculations."
  },
  {
    id: 2,
    question: "A property has 30A on L1, 25A on L2, and 35A on L3. Which phase should a 16A single-phase PV inverter connect to?",
    options: [
      "L1 because it's in the middle",
      "L2 because it has the lowest load",
      "L3 because it has the highest load - generation will offset it",
      "It doesn't matter which phase is used"
    ],
    correctAnswer: 2,
    explanation: "Connecting generation to the most heavily loaded phase (L3 at 35A) helps balance the system. The 16A of generation will offset some of L3's load, reducing the imbalance between phases."
  },
  {
    id: 3,
    question: "What effect do harmonics have on the power factor of an installation?",
    options: [
      "They improve power factor",
      "They have no effect on power factor",
      "They can reduce the true power factor below the displacement power factor",
      "Power factor is only affected by inductive loads"
    ],
    correctAnswer: 2,
    explanation: "Harmonics introduce distortion power factor in addition to displacement power factor. The true (total) power factor is lower than displacement alone when harmonic content is significant, meaning less useful work per unit of apparent power."
  },
  {
    id: 4,
    question: "Why might a cable sized correctly for the fundamental current still overheat in a harmonics-rich environment?",
    options: [
      "Cables can't handle harmonics at all",
      "Harmonics create additional heating due to skin effect and increase I²R losses",
      "The cable insulation breaks down at harmonic frequencies",
      "Harmonics cause mechanical vibration that generates heat"
    ],
    correctAnswer: 1,
    explanation: "Harmonics increase RMS current beyond the fundamental frequency current. Additionally, skin effect causes higher-frequency currents to flow near the conductor surface, increasing effective resistance and I²R losses, generating more heat."
  },
  {
    id: 5,
    question: "What is the main source of harmonics from a grid-tied solar PV inverter?",
    options: [
      "The solar panels themselves",
      "The DC cabling",
      "The switching circuits that convert DC to AC",
      "The metering equipment"
    ],
    correctAnswer: 2,
    explanation: "The inverter's power electronics use high-frequency switching (PWM) to convert DC to AC. While filtering reduces harmonic content, some residual harmonics remain. Quality inverters are designed to minimise THD and meet grid code requirements."
  },
  {
    id: 6,
    question: "What standard governs the harmonic limits for equipment connected to public supply systems in the UK?",
    options: [
      "BS 7671 only",
      "Engineering Recommendation G5/5 and BS EN 61000 series",
      "Building Regulations Part P",
      "There are no limits on harmonics"
    ],
    correctAnswer: 1,
    explanation: "Engineering Recommendation G5/5 sets limits for harmonic distortion on the public distribution network. BS EN 61000 series (EMC standards) specifies limits for equipment emissions. Inverters must comply with these to be grid-connected."
  },
  {
    id: 7,
    question: "How does a modern three-phase inverter help with load balancing?",
    options: [
      "It can only output on one phase at a time",
      "It automatically adjusts output across phases to balance the system",
      "It distributes generation equally across all three phases simultaneously",
      "Three-phase inverters don't affect load balancing"
    ],
    correctAnswer: 2,
    explanation: "A three-phase inverter generates power equally across all three phases, inherently helping balance the system. Some advanced inverters can even adjust phase output based on load monitoring for optimal balance."
  },
  {
    id: 8,
    question: "What is the consequence of excessive neutral current in a three-phase system?",
    options: [
      "The RCD will trip",
      "The neutral conductor may overheat and potentially cause fire",
      "The voltage will increase",
      "No consequence - neutrals are sized to handle any current"
    ],
    correctAnswer: 1,
    explanation: "Neutral conductors are typically sized based on balanced load assumptions. Imbalance and triplen harmonics can cause neutral current to exceed phase currents. If the neutral overheats, insulation damage and fire risk result."
  },
  {
    id: 9,
    question: "What type of filter might be installed to reduce harmonics from a large inverter installation?",
    options: [
      "HEPA filter",
      "Sand filter",
      "Passive LC filter or active filter",
      "Filters cannot reduce harmonics"
    ],
    correctAnswer: 2,
    explanation: "Passive filters use inductors (L) and capacitors (C) tuned to specific harmonic frequencies to absorb them. Active filters inject counter-harmonics to cancel distortion. The choice depends on harmonic spectrum and installation size."
  },
  {
    id: 10,
    question: "Why is monitoring phase currents important in an installation with renewable generation?",
    options: [
      "It's not important once the system is commissioned",
      "To verify ongoing balance and identify any developing problems",
      "Only for billing purposes",
      "Monitoring is only required for commercial installations"
    ],
    correctAnswer: 1,
    explanation: "Load patterns change over time, and generation varies with conditions. Monitoring identifies phase imbalance, excessive neutral current, and potential problems before they cause damage. This is particularly important with mixed generation and loads."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Do domestic PV systems create significant harmonic problems?",
    answer: "Modern domestic inverters are designed to meet strict harmonic emission limits and typically have THD below 5%. Problems are more likely with multiple inverters, LED lighting, and other non-linear loads combining. Individual domestic systems rarely cause issues, but cumulative effects in areas with high PV penetration can affect network quality."
  },
  {
    question: "How do I measure harmonics on site?",
    answer: "Power quality analysers can measure harmonic content, THD, and identify specific harmonic frequencies. Some advanced multifunction test instruments include basic harmonic measurement. For detailed analysis, specialist equipment may be needed. Clamp-on power quality meters can monitor ongoing harmonic levels."
  },
  {
    question: "Can load imbalance damage equipment?",
    answer: "Severe imbalance can cause voltage variations between phases, affecting three-phase motors and sensitive equipment. The neutral conductor is at greatest risk from overheating. Electronic equipment may malfunction if supplied with distorted waveforms. Proper load balancing and harmonic management protect both equipment and infrastructure."
  },
  {
    question: "Do batteries affect harmonics differently than direct PV generation?",
    answer: "Battery inverters use similar power electronics to PV inverters, so harmonic characteristics are comparable. However, batteries can provide or absorb reactive power and some advanced battery systems can actively compensate for harmonics, improving overall power quality."
  },
  {
    question: "What if I can't balance phases due to fixed load locations?",
    answer: "If physical redistribution isn't possible, consider three-phase generation equipment, phase balancing equipment, or accepting some imbalance within design limits. Document the imbalance in your design. For existing installations, the DNO may need to be consulted if imbalance exceeds acceptable limits."
  },
  {
    question: "Are LED lights a significant source of harmonics?",
    answer: "Yes, LED drivers typically use switched-mode power supplies that generate harmonics. In installations with many LED luminaires, the cumulative harmonic current can be significant. Quality LED drivers include harmonic filtering. This should be considered when combining large LED installations with renewable generation."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section5_4 = () => {
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
            <Link to="../level3-module2-section5">
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
            <span>Module 2.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Load Balancing and Harmonics Considerations
          </h1>
          <p className="text-white/80">
            Managing electrical loads and power quality in integrated systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Balance:</strong> Connect single-phase generation to most loaded phase</li>
              <li><strong>Harmonics:</strong> Multiples of 50Hz from inverters and electronics</li>
              <li><strong>Neutral risk:</strong> Triplen harmonics add in neutral conductor</li>
              <li><strong>THD:</strong> Should typically be below 5% for quality installations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Warm neutral conductors indicating imbalance</li>
              <li><strong>Use:</strong> Measure phase currents before connecting generation</li>
              <li><strong>Apply:</strong> Choose inverter phase based on load analysis</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Principles of three-phase load balancing",
              "What harmonics are and where they come from",
              "Effects of harmonics on installations",
              "Triplen harmonics and neutral current",
              "Measuring and managing harmonic content",
              "Inverter selection for power quality"
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
            Understanding Load Balancing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a three-phase supply, the ideal situation is equal current draw on each phase. When loads are perfectly balanced, the neutral conductor carries no current - the three phase currents, displaced by 120 degrees, cancel out completely. In practice, perfect balance is rare, and some neutral current always flows.
            </p>

            <p>
              Adding single-phase generation changes the balance equation. If a PV system generates 16A on one phase while the others draw from the grid, that phase becomes a net exporter while the others remain importers. This creates imbalance, increasing neutral current and potentially causing problems in the installation and on the distribution network.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Consequences of Imbalance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Increased neutral current and associated losses</li>
                <li>Risk of neutral conductor overheating</li>
                <li>Voltage variations between phases</li>
                <li>Reduced efficiency of the overall system</li>
                <li>Potential network problems with high generation penetration</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Before connecting single-phase generation to a three-phase supply, measure current on each phase under typical load conditions. Connect generation to the most heavily loaded phase to improve balance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What Are Harmonics?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The ideal AC supply is a pure sinusoidal waveform at 50Hz - this is the fundamental frequency. Harmonics are additional frequency components at integer multiples of this fundamental: 100Hz (2nd harmonic), 150Hz (3rd), 200Hz (4th), 250Hz (5th), and so on. When present, these combine with the fundamental to create a distorted waveform.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Harmonic Sources</p>
                <ul className="text-sm text-white space-y-1">
                  <li>PV and battery inverters</li>
                  <li>LED lighting drivers</li>
                  <li>Variable speed drives</li>
                  <li>Computer power supplies</li>
                  <li>EV chargers (especially DC fast chargers)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effects of Harmonics</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Increased conductor heating</li>
                  <li>Transformer overheating</li>
                  <li>Capacitor stress and failure</li>
                  <li>Interference with sensitive equipment</li>
                  <li>Reduced power factor</li>
                </ul>
              </div>
            </div>

            <p>
              Non-linear loads - those that don't draw current proportionally to the voltage applied - create harmonics. Modern power electronics in inverters, LED drivers, and switch-mode power supplies are inherently non-linear. While each device may produce relatively small harmonic currents, the cumulative effect in buildings with many such devices can be significant.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Triplen Harmonics and Neutral Current
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a balanced three-phase system, most harmonic currents partially cancel in the neutral - some phase angles align, others oppose. However, triplen harmonics (3rd, 9th, 15th, etc.) behave differently. These harmonics are in-phase across all three lines and add arithmetically in the neutral rather than cancelling.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Triplen Problem:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>If each phase carries 10A of 3rd harmonic current, the neutral carries 30A of 3rd harmonic</li>
                <li>Neutral current can exceed phase current in harmonic-rich installations</li>
                <li>Neutral conductors may be undersized for this additional current</li>
                <li>LED lighting is particularly prone to generating 3rd harmonics</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An office refit replaces all fluorescent lighting with LED. Each LED driver produces some 3rd harmonic current. With 200 fittings, the cumulative 3rd harmonic current in the neutral is substantial, even though each fitting individually meets standards. The original neutral was sized for fluorescent loads - now it runs hot.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Managing Power Quality
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Total Harmonic Distortion (THD) quantifies the overall harmonic content as a percentage of the fundamental. A THD of 5% means the combined harmonic content is 5% of the fundamental frequency magnitude. Grid codes and equipment standards specify maximum acceptable THD to maintain power quality.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Equipment Design</p>
                <p className="text-white/90 text-xs">Select inverters and loads with low THD specifications</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Filtering</p>
                <p className="text-white/90 text-xs">Install passive or active filters for larger installations</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Monitoring</p>
                <p className="text-white/90 text-xs">Measure and track power quality parameters ongoing</p>
              </div>
            </div>

            <p>
              Modern quality inverters include output filters and are designed to meet harmonic emission standards. However, as more non-linear loads combine in an installation, the cumulative effect must be considered. For larger commercial installations, power quality surveys and potentially active filtering may be necessary.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Individual equipment may comply with standards, but cumulative effects can still cause problems. Consider the whole installation when assessing power quality, especially when adding renewable generation to buildings with many electronic loads.
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
                <li>Measure phase currents before adding single-phase generation</li>
                <li>Document existing load distribution for design decisions</li>
                <li>Consider three-phase inverters for larger systems</li>
                <li>Specify low-THD equipment where possible</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify phase balance with generation operating</li>
                <li>Check neutral current doesn't exceed design assumptions</li>
                <li>Record baseline power quality measurements</li>
                <li>Test under various generation and load conditions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Random phase selection</strong> - Always analyse loads before choosing connection phase</li>
                <li><strong>Ignoring neutral sizing</strong> - Ensure neutral can handle harmonic content</li>
                <li><strong>Assuming standards compliance equals no problems</strong> - Cumulative effects matter</li>
                <li><strong>Not monitoring after installation</strong> - Load patterns change over time</li>
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
                <p className="font-medium text-white mb-1">Three-Phase Voltages</p>
                <ul className="space-y-0.5">
                  <li>Line-to-neutral: 230V</li>
                  <li>Line-to-line: 400V</li>
                  <li>Phase displacement: 120 degrees</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Harmonics</p>
                <ul className="space-y-0.5">
                  <li>3rd harmonic: 150Hz (triplen)</li>
                  <li>5th harmonic: 250Hz</li>
                  <li>7th harmonic: 350Hz</li>
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
            <Link to="../level3-module2-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Earthing & Protection
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module2-section5-5">
              Next: Testing & Certification
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section5_4;
