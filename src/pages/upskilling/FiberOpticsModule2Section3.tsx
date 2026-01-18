import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Connector Types (LC, SC, ST, MTP) - Fibre Optics Course";
const DESCRIPTION = "Master fibre optic connector identification and selection. Learn LC, SC, ST, and MTP/MPO connectors including applications, ferrule sizes, and installation requirements for UK networks.";

const quickCheckQuestions = [
  {
    id: "fo-m2s3-qc1",
    question: "What ferrule diameter do LC connectors use?",
    options: ["2.5mm", "1.25mm", "3.0mm", "0.9mm"],
    correctIndex: 1,
    explanation: "LC (Lucent Connector) uses a 1.25mm ferrule, half the size of SC connectors, enabling higher port density in data centres and equipment."
  },
  {
    id: "fo-m2s3-qc2",
    question: "Which connector type uses a bayonet locking mechanism?",
    options: ["LC", "SC", "ST", "MTP"],
    correctIndex: 2,
    explanation: "ST (Straight Tip) connectors use a bayonet twist-lock mechanism, requiring a quarter-turn to engage. SC and LC use push-pull latching."
  },
  {
    id: "fo-m2s3-qc3",
    question: "How many fibres can a standard MTP/MPO connector terminate?",
    options: ["2 fibres", "4 fibres", "8, 12, or 24 fibres", "48 fibres"],
    correctIndex: 2,
    explanation: "MTP/MPO connectors terminate 8, 12, or 24 fibres in a single connector using an array of precision ferrules for high-density applications."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "LC connectors were developed by which company?",
    options: ["Siemens", "Lucent Technologies", "Corning", "Amphenol"],
    correctAnswer: 1,
    explanation: "LC connectors were developed by Lucent Technologies (now part of Nokia) in the late 1990s."
  },
  {
    id: 2,
    question: "What is the ferrule diameter of SC connectors?",
    options: ["1.25mm", "2.5mm", "3.0mm", "1.0mm"],
    correctAnswer: 1,
    explanation: "SC connectors use a 2.5mm ferrule diameter, the same as ST and FC connectors."
  },
  {
    id: 3,
    question: "ST connectors are most commonly found in:",
    options: ["Modern data centres", "Legacy LAN installations", "Submarine cables", "Mobile networks"],
    correctAnswer: 1,
    explanation: "ST connectors were popular in early LANs and are now primarily found in legacy installations from the 1990s and early 2000s."
  },
  {
    id: 4,
    question: "What does MTP stand for in MTP connectors?",
    options: ["Multi-fibre Termination Push-on", "Mechanical Transfer Push-on", "Multi-Terminal Plug", "Module Trunk Port"],
    correctAnswer: 1,
    explanation: "MTP stands for Mechanical Transfer Push-on, which is US Conec's enhanced version of the MPO standard."
  },
  {
    id: 5,
    question: "The primary advantage of LC over SC connectors is:",
    options: ["Lower cost", "Higher port density", "Better polish quality", "Faster termination"],
    correctAnswer: 1,
    explanation: "LC's smaller 1.25mm ferrule allows twice the port density of SC connectors in the same panel space."
  },
  {
    id: 6,
    question: "Which connector type is specified in TIA-568 for high-density applications?",
    options: ["ST", "SC", "LC", "FC"],
    correctAnswer: 2,
    explanation: "TIA-568 specifies LC connectors as the preferred choice for horizontal cabling and high-density applications."
  },
  {
    id: 7,
    question: "MTP/MPO connectors are primarily used for:",
    options: ["Desktop connections", "Backbone and trunk cabling", "Test equipment only", "Outdoor installations"],
    correctAnswer: 1,
    explanation: "MTP/MPO connectors are used for high-density backbone trunks and parallel optics in data centres."
  },
  {
    id: 8,
    question: "The 'push-pull' latching mechanism is used by:",
    options: ["ST and FC connectors", "LC and SC connectors", "MTP connectors only", "All fibre connectors"],
    correctAnswer: 1,
    explanation: "LC and SC connectors both use push-pull latching mechanisms for easy connection in tight spaces."
  },
  {
    id: 9,
    question: "What is the typical insertion loss specification for a quality LC connector?",
    options: ["0.1 dB maximum", "0.25 dB maximum", "0.5 dB maximum", "1.0 dB maximum"],
    correctAnswer: 1,
    explanation: "Quality LC connectors typically specify 0.25 dB maximum insertion loss per mated pair."
  },
  {
    id: 10,
    question: "When connecting different connector types, you would use a:",
    options: ["Connector reducer", "Hybrid adaptor", "Mode conditioner", "Attenuator"],
    correctAnswer: 1,
    explanation: "Hybrid adaptors have different connector types on each side, enabling connection between LC and SC, for example."
  }
];

const faqs = [
  {
    question: "Can I connect LC to SC connectors directly?",
    answer: "Not directly - they have different ferrule sizes (1.25mm vs 2.5mm). You need a hybrid adaptor (LC-SC coupler) or a hybrid patch lead with LC on one end and SC on the other. Hybrid adaptors introduce additional insertion loss (typically 0.2-0.3dB), so minimise their use in the permanent link."
  },
  {
    question: "Why are ST connectors being phased out?",
    answer: "ST's bayonet lock mechanism requires rotational movement that can stress fibres in dense cable management. The single-fibre design and 2.5mm ferrule limit port density. SC and LC push-pull mechanisms are easier to use in tight spaces. Most new standards specify LC or SC for structured cabling."
  },
  {
    question: "What's the difference between MTP and MPO?",
    answer: "MPO (Multi-fibre Push-On) is the generic standard defined by IEC 61754-7. MTP is US Conec's enhanced version with tighter tolerances, removable housing, and improved spring mechanism. MTP connectors are backwards compatible with MPO but offer better performance. Most high-quality installations specify MTP."
  },
  {
    question: "How do I identify male vs female MTP/MPO connectors?",
    answer: "Male MTP connectors have guide pins (two small metal pins on the ferrule face). Female connectors have corresponding holes. In trunk cables, one end is male and one is female. Pin polarity (Type A, B, or C) determines how fibres map between connectors - always verify polarity before connecting."
  },
  {
    question: "Which connector should I specify for a new installation?",
    answer: "For most applications: LC duplex is the standard choice for equipment connections (transceivers, patch panels). For backbone trunks requiring 12+ fibres, MTP/MPO with LC breakout modules enables high-density and future 40G/100G upgrades. SC may still be specified for compatibility with existing infrastructure."
  }
];

const FiberOpticsModule2Section3 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
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
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Connector Types (LC, SC, ST, MTP)
          </h1>
          <p className="text-white/80">
            Essential fibre optic connector identification and selection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>LC:</strong> Small (1.25mm), high density, modern standard</li>
              <li><strong>SC:</strong> Medium (2.5mm), push-pull, FTTH common</li>
              <li><strong>ST:</strong> Legacy, bayonet lock, being phased out</li>
              <li><strong>MTP:</strong> Multi-fibre (8-24), data centre trunks</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Check ferrule size and latch type</li>
              <li><strong>Use:</strong> LC for SFP ports, MTP for high-density trunks</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify LC, SC, ST, and MTP connectors",
              "Understand ferrule sizes and latch mechanisms",
              "Select appropriate connectors for applications",
              "Recognise when to use hybrid adaptors",
              "Specify connectors for new installations",
              "Understand MTP polarity and gender"
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
            LC Connectors - Small Form Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The LC (Lucent Connector) has become the dominant connector type for modern fibre optic
              installations. Developed by Lucent Technologies in the late 1990s, it features a compact
              1.25mm ferrule that enables twice the port density of SC connectors in the same panel space.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">LC Specifications</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Ferrule diameter:</strong> 1.25mm</li>
                <li><strong>Latch type:</strong> Push-pull tab</li>
                <li><strong>Typical insertion loss:</strong> 0.25dB maximum</li>
                <li><strong>Return loss (SM APC):</strong> 50dB or better</li>
                <li><strong>Mating cycles:</strong> 500+ typical</li>
              </ul>
            </div>

            <p>
              LC connectors are commonly supplied as LC Duplex - two LC connectors joined by a clip,
              maintaining correct A-B fibre polarity. The duplex housing matches port spacing on SFP
              and SFP+ transceivers. LC is specified in TIA-568 as the preferred connector for
              horizontal cabling and high-density applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">LC Advantages:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>High port density (2x SC in same space)</li>
                <li>Low insertion loss</li>
                <li>Push-pull ease of use in tight spaces</li>
                <li>Industry standard for SFP/SFP+ transceivers</li>
                <li>Available in all polish grades (PC, UPC, APC)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            SC Connectors - Subscriber Connector
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The SC (Subscriber Connector or Standard Connector) was developed by NTT and became an
              early standard for fibre terminations. Its robust 2.5mm ferrule and positive push-pull
              engagement made it popular for telecommunications and enterprise networks before LC
              gained dominance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">SC Specifications</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Ferrule diameter:</strong> 2.5mm</li>
                <li><strong>Latch type:</strong> Push-pull snap</li>
                <li><strong>Housing shape:</strong> Rectangular</li>
                <li><strong>Typical insertion loss:</strong> 0.30dB maximum</li>
                <li><strong>Primary use:</strong> FTTH, legacy telecoms</li>
              </ul>
            </div>

            <p>
              SC connectors remain common in FTTH (Fibre to the Home) installations, older enterprise
              networks, and applications where larger size aids handling. The rectangular housing
              provides anti-rotation that maintains fibre polarity and prevents damage from twisting.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">SC Applications Today:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>FTTH optical network terminals (ONTs)</li>
                <li>Passive optical network (PON) splitters</li>
                <li>Test equipment interfaces</li>
                <li>Legacy telecommunications equipment</li>
                <li>Applications requiring robust handling</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            ST Connectors - Straight Tip (Legacy)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The ST (Straight Tip) connector was developed by AT&T in the 1980s and was among the
              first standardised fibre connectors. Its distinctive bayonet twist-lock mechanism requires
              a quarter-turn to engage, similar to BNC coaxial connectors.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">ST Specifications</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Ferrule diameter:</strong> 2.5mm</li>
                <li><strong>Latch type:</strong> Bayonet twist-lock</li>
                <li><strong>Housing shape:</strong> Round/cylindrical</li>
                <li><strong>Typical insertion loss:</strong> 0.40dB maximum</li>
                <li><strong>Primary use:</strong> Legacy multimode LANs</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Why ST is Being Phased Out</p>
              <ul className="text-sm text-white space-y-1">
                <li>Bayonet mechanism requires rotational space</li>
                <li>Twist motion can stress fibres in tight bundles</li>
                <li>Single-fibre only (no native duplex)</li>
                <li>Lower port density than SC or LC</li>
                <li>Not specified in current TIA-568 standards</li>
              </ul>
            </div>

            <p>
              ST connectors remain in service in many legacy installations from the 1990s and early
              2000s. When maintaining ST installations: push in firmly, turn clockwise to lock
              (quarter-turn until bayonet pins engage). To disconnect, push in slightly, turn
              anti-clockwise, and pull. Never pull without unlocking.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            MTP/MPO - Multi-Fibre Connectors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              MTP (Mechanical Transfer Push-on) and MPO (Multi-fibre Push-On) connectors terminate
              multiple fibres - typically 8, 12, or 24 - in a single connector. These high-density
              connectors are essential for data centre backbone infrastructure, enabling rapid
              deployment and supporting 40G, 100G, and 400G parallel optics.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">MTP/MPO Specifications</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Fibre count:</strong> 8, 12, or 24 fibres</li>
                <li><strong>Fibre pitch:</strong> 250um centres</li>
                <li><strong>Typical insertion loss:</strong> 0.35dB per fibre maximum</li>
                <li><strong>Guide pins:</strong> Male or Female</li>
                <li><strong>Applications:</strong> 40G/100G/400G parallel optics</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">MTP vs MPO - What's the Difference?</p>
              <p className="text-sm text-white">
                MPO is the generic industry standard (IEC 61754-7). MTP is US Conec's enhanced,
                trademarked version with tighter tolerances, removable housing for re-polishing,
                and improved spring design. MTP connectors are MPO-compatible but offer 0.1-0.2dB
                better insertion loss. Most quality installations specify MTP.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Polarity and Gender</p>
              <p className="text-sm text-white">
                MTP connectors have male (with guide pins) and female (with pin holes) variants.
                Trunk cables typically have one male and one female end. Polarity types (A, B, C)
                define how fibre positions map between connectors - critical for ensuring transmit
                connects to receive. Always document polarity in installation records.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Connector Selection Guide
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the right connector type depends on application requirements, existing
              infrastructure, and equipment interfaces. Use this guide for common scenarios.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Application-Based Selection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Data centre equipment:</strong> LC duplex (SFP/SFP+ ports)</li>
                <li><strong>Data centre backbone:</strong> MTP/MPO trunks with LC breakout</li>
                <li><strong>Building backbone:</strong> LC or SC duplex</li>
                <li><strong>Work area outlet:</strong> LC duplex (TIA-568 recommended)</li>
                <li><strong>FTTH/PON:</strong> SC (common) or LC</li>
                <li><strong>Test equipment:</strong> FC or LC (check instrument ports)</li>
                <li><strong>Legacy maintenance:</strong> Match existing (ST, SC common)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">New Installation Recommendations</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Default choice:</strong> LC duplex for all new installations</li>
                <li><strong>High-density backbone:</strong> MTP/MPO with LC cassettes</li>
                <li><strong>40G/100G direct:</strong> MTP/MPO to equipment ports</li>
                <li><strong>Avoid:</strong> ST for new installs; SC only if required by equipment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Connector Handling</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always keep dust caps on connectors until ready to connect</li>
                <li>Never touch ferrule end faces - oils cause contamination</li>
                <li>Clean connectors before every mating - "inspect before you connect"</li>
                <li>Use connector-specific cleaning tools (LC, SC, MTP have different cleaners)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Guidelines</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use a fibre microscope (200-400x) to inspect end faces</li>
                <li>Core zone must be scratch-free; cladding allows minor defects</li>
                <li>Reference IEC 61300-3-35 for pass/fail criteria</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forcing mismatched connectors</strong> - LC into SC adaptor damages both</li>
                <li><strong>Twisting ST without pushing</strong> - damages bayonet pins</li>
                <li><strong>Male MTP to male MTP</strong> - damages guide pins</li>
                <li><strong>Using canned air</strong> - propellant residue contaminates end faces</li>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Connector Comparison</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Single-Fibre Connectors</p>
                <ul className="space-y-0.5">
                  <li>LC: 1.25mm, push-pull, modern standard</li>
                  <li>SC: 2.5mm, push-pull, FTTH/legacy</li>
                  <li>ST: 2.5mm, bayonet, legacy only</li>
                  <li>FC: 2.5mm, screw-on, test equipment</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Multi-Fibre Connectors</p>
                <ul className="space-y-0.5">
                  <li>MTP/MPO-8: 8 fibres, 40G SR4</li>
                  <li>MTP/MPO-12: 12 fibres, standard trunks</li>
                  <li>MTP/MPO-24: 24 fibres, 100G/400G</li>
                  <li>Gender: Male has pins, Female has holes</li>
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

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next: Polish Grades
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule2Section3;
