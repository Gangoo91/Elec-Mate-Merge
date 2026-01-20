import { ArrowLeft, Zap, CheckCircle, Award, FileText, Globe, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "TIA/EIA and ISO/IEC Standards - Fibre Optics Technology";
const DESCRIPTION = "Learn the key international standards governing fibre optic cabling including TIA-568, ISO/IEC 11801, and their requirements for installation and testing.";

const quickCheckQuestions = [
  {
    id: "standards-qc1",
    question: "Which standard series is primarily used in North America for structured cabling?",
    options: [
      "ISO/IEC 11801",
      "TIA-568",
      "BS 7671",
      "EN 50173"
    ],
    correctIndex: 1,
    explanation: "TIA-568 is the primary standard series used in North America, while ISO/IEC 11801 is the international equivalent used more widely in Europe and elsewhere."
  },
  {
    id: "standards-qc2",
    question: "What does TIA-568.3-D specifically cover?",
    options: [
      "Copper cabling only",
      "Optical fibre cabling components",
      "Wireless systems",
      "Power over Ethernet"
    ],
    correctIndex: 1,
    explanation: "TIA-568.3-D is the optical fibre cabling components standard, covering fibre types, connectors, and performance requirements for fibre optic systems."
  },
  {
    id: "standards-qc3",
    question: "What is the relationship between TIA and ISO/IEC standards?",
    options: [
      "They are completely different",
      "TIA is stricter than ISO",
      "They are harmonised and broadly equivalent",
      "ISO replaces TIA"
    ],
    correctIndex: 2,
    explanation: "TIA and ISO/IEC standards are harmonised, meaning they are broadly equivalent and designed to be compatible, though there are minor regional differences."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does TIA stand for?",
    options: [
      "Technical Installation Association",
      "Telecommunications Industry Association",
      "Testing and Inspection Authority",
      "Technology Infrastructure Alliance"
    ],
    correctAnswer: 1,
    explanation: "TIA stands for Telecommunications Industry Association, the US-based organisation that develops cabling standards."
  },
  {
    id: 2,
    question: "Which TIA document covers general cabling requirements?",
    options: [
      "TIA-568.0-D",
      "TIA-568.1-D",
      "TIA-568.2-D",
      "TIA-568.3-D"
    ],
    correctAnswer: 0,
    explanation: "TIA-568.0-D covers generic telecommunications cabling requirements, while .1 covers commercial buildings, .2 covers balanced twisted-pair, and .3 covers optical fibre."
  },
  {
    id: 3,
    question: "What fibre types does OM1 refer to?",
    options: [
      "Singlemode fibre",
      "62.5/125 multimode fibre",
      "50/125 laser-optimised multimode",
      "Plastic optical fibre"
    ],
    correctAnswer: 1,
    explanation: "OM1 refers to legacy 62.5/125 multimode fibre, which has lower bandwidth than modern OM3/OM4/OM5 50/125 fibres."
  },
  {
    id: 4,
    question: "What is the maximum attenuation for OS2 singlemode fibre at 1310nm per TIA standards?",
    options: [
      "0.5 dB/km",
      "0.4 dB/km",
      "1.0 dB/km",
      "3.5 dB/km"
    ],
    correctAnswer: 1,
    explanation: "OS2 singlemode fibre has a maximum attenuation of 0.4 dB/km at 1310nm and 0.3 dB/km at 1550nm per TIA specifications."
  },
  {
    id: 5,
    question: "What does ISO/IEC 11801-1 cover?",
    options: [
      "Home cabling only",
      "Generic cabling for customer premises",
      "Data centre cabling only",
      "Industrial cabling only"
    ],
    correctAnswer: 1,
    explanation: "ISO/IEC 11801-1 covers generic cabling for customer premises, providing the foundation for the entire 11801 series."
  },
  {
    id: 6,
    question: "Which standard specifically addresses data centre cabling?",
    options: [
      "ISO/IEC 11801-3",
      "ISO/IEC 11801-5",
      "TIA-942",
      "Both B and C"
    ],
    correctAnswer: 3,
    explanation: "Both ISO/IEC 11801-5 and TIA-942 address data centre cabling requirements, with TIA-942 being the US-focused standard."
  },
  {
    id: 7,
    question: "What minimum bend radius does TIA specify for singlemode fibre during installation?",
    options: [
      "10x cable diameter",
      "15x cable diameter",
      "25mm minimum",
      "Depends on cable construction"
    ],
    correctAnswer: 3,
    explanation: "Bend radius depends on cable construction and manufacturer specifications. Standards provide guidelines but actual values vary by cable type."
  },
  {
    id: 8,
    question: "What is a 'permanent link' in standards terminology?",
    options: [
      "A link that cannot be changed",
      "The fixed cabling between outlets, excluding patch cords",
      "Any fibre connection",
      "A link longer than 100m"
    ],
    correctAnswer: 1,
    explanation: "A permanent link is the fixed cabling infrastructure between telecommunications outlets, excluding work area and equipment patch cords."
  },
  {
    id: 9,
    question: "Which connector type is specified as the standard interface in TIA-568.3-D?",
    options: [
      "ST connector",
      "SC connector",
      "LC connector",
      "Both B and C"
    ],
    correctAnswer: 3,
    explanation: "TIA-568.3-D specifies both SC and LC connectors as standard interfaces, with LC being more common in high-density applications."
  },
  {
    id: 10,
    question: "What does 'channel' mean in cabling standards?",
    options: [
      "A single fibre strand",
      "The complete end-to-end transmission path including patch cords",
      "A cable pathway",
      "A frequency band"
    ],
    correctAnswer: 1,
    explanation: "A channel is the complete end-to-end transmission path from equipment to equipment, including permanent link and all patch cords."
  }
];

const faqs = [
  {
    question: "Do I need to follow both TIA and ISO standards?",
    answer: "Typically you follow the standard specified in the project requirements. In the UK and Europe, ISO/IEC 11801 and EN 50173 are commonly referenced. In North America, TIA-568 is standard. The standards are harmonised, so following one generally ensures compliance with the other. Always confirm project requirements with the client or specifier."
  },
  {
    question: "What's the difference between OM3, OM4, and OM5 fibres?",
    answer: "All three are laser-optimised 50/125 multimode fibres. OM3 supports 10 Gigabit Ethernet to 300m, OM4 extends this to 400m, and OM5 adds support for wavelength division multiplexing (SWDM) allowing higher speeds over the same fibre count. OM5 is also known as wideband multimode fibre (WBMMF)."
  },
  {
    question: "Are the standards mandatory?",
    answer: "Standards themselves are not legally mandatory unless referenced in contracts, building regulations, or local codes. However, they represent industry best practice and are typically required for manufacturer warranties, insurance purposes, and professional installations. Always install to the current edition of relevant standards."
  },
  {
    question: "How often are standards updated?",
    answer: "Major standards are typically reviewed every 5 years and updated as needed. TIA uses letter suffixes (A, B, C, D) to indicate revisions. ISO uses edition numbers. Always check you're working to the current edition - older versions may have outdated specifications or be withdrawn."
  },
  {
    question: "What documentation do standards require?",
    answer: "Standards require comprehensive documentation including test results for all links, cable routing records, labelling schemes, and as-built drawings. TIA-606 specifically covers administration and documentation requirements. Proper documentation is essential for warranty claims and future maintenance."
  },
  {
    question: "Do standards cover installation workmanship?",
    answer: "Yes, standards include requirements for installation practices including cable handling, bend radius, pulling tension, termination procedures, and testing. BICSI (Building Industry Consulting Service International) provides additional installation training and certification that complements the standards."
  }
];

const FiberOpticsModule6Section1 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fiber-optics-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            TIA/EIA and ISO/IEC Standards
          </h1>
          <p className="text-white/80">
            The foundation of professional fibre optic installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>TIA-568:</strong> North American standard series</li>
              <li><strong>ISO/IEC 11801:</strong> International standard</li>
              <li><strong>Harmonised:</strong> Standards are broadly equivalent</li>
              <li><strong>Key docs:</strong> TIA-568.3-D for optical fibre</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Why It Matters</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Consistency:</strong> Common language and specifications</li>
              <li><strong>Quality:</strong> Defined performance requirements</li>
              <li><strong>Warranty:</strong> Required for manufacturer support</li>
              <li><strong>Interoperability:</strong> Equipment works together</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "TIA-568 standard structure",
              "ISO/IEC 11801 requirements",
              "Fibre classifications (OM/OS)",
              "Performance specifications",
              "Documentation requirements",
              "Testing standards"
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
            Understanding Cabling Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cabling standards provide the foundation for consistent, reliable network infrastructure. They define everything from fibre types and connector specifications to testing requirements and documentation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why standards matter:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Interoperability:</strong> Equipment from different manufacturers works together</li>
                <li><strong>Performance guarantee:</strong> Defined specifications ensure network capability</li>
                <li><strong>Quality assurance:</strong> Consistent installation and testing practices</li>
                <li><strong>Future-proofing:</strong> Infrastructure supports evolving applications</li>
                <li><strong>Warranty support:</strong> Manufacturers require standards compliance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key standards organisations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>TIA (Telecommunications Industry Association):</strong> US-based, develops TIA-568 series</li>
                <li><strong>ISO (International Organization for Standardization):</strong> International standards body</li>
                <li><strong>IEC (International Electrotechnical Commission):</strong> Works with ISO on IT standards</li>
                <li><strong>CENELEC:</strong> European standards based on ISO/IEC</li>
                <li><strong>BICSI:</strong> Training and installation best practices</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            TIA-568 Standard Series
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The TIA-568 series is the primary structured cabling standard in North America. The current edition uses the 'D' suffix (TIA-568.0-D through TIA-568.3-D).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">TIA-568 document structure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>TIA-568.0-D:</strong> Generic telecommunications cabling - general requirements</li>
                <li><strong>TIA-568.1-D:</strong> Commercial building cabling - building-specific requirements</li>
                <li><strong>TIA-568.2-D:</strong> Balanced twisted-pair cabling - copper specifications</li>
                <li><strong>TIA-568.3-D:</strong> Optical fibre cabling components - fibre specifications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">TIA-568.3-D key content:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fibre types:</strong> OM1, OM2, OM3, OM4, OM5 multimode; OS1, OS2 singlemode</li>
                <li><strong>Connectors:</strong> LC and SC as standard interfaces</li>
                <li><strong>Performance:</strong> Attenuation, bandwidth, and return loss specifications</li>
                <li><strong>Testing:</strong> Tier 1 and Tier 2 test requirements</li>
                <li><strong>Polarity:</strong> Methods A, B, and C for maintaining Tx/Rx alignment</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Related TIA Standards</p>
              <p className="text-sm text-white">
                TIA-942 covers data centre infrastructure, TIA-606 covers administration and documentation, and TIA-607 covers grounding and bonding. These work together with TIA-568 for complete installation guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            ISO/IEC 11801 Series
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ISO/IEC 11801 is the international structured cabling standard, widely used in Europe and throughout the world. The current edition is structured as a multi-part standard.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ISO/IEC 11801 structure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>11801-1:</strong> General requirements - foundation document</li>
                <li><strong>11801-2:</strong> Office premises - commercial building cabling</li>
                <li><strong>11801-3:</strong> Industrial premises - factory and harsh environments</li>
                <li><strong>11801-4:</strong> Single-tenant homes - residential cabling</li>
                <li><strong>11801-5:</strong> Data centres - high-density infrastructure</li>
                <li><strong>11801-6:</strong> Distributed building services - building automation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key ISO/IEC concepts:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Classes:</strong> Performance categories for channels (e.g., Class OF-300, OF-500)</li>
                <li><strong>Categories:</strong> Component specifications (e.g., OM3, OS2)</li>
                <li><strong>Permanent link:</strong> Fixed infrastructure excluding patch cords</li>
                <li><strong>Channel:</strong> Complete end-to-end transmission path</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">European implementations:</p>
              <p className="text-sm text-white">
                In Europe, EN 50173 series implements ISO/IEC 11801 as the European Norm. EN 50173-1 through EN 50173-6 mirror the ISO structure. UK installations typically reference EN 50173 or ISO/IEC 11801 in specifications.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fibre Classifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standards define fibre classifications using the OM (Optical Multimode) and OS (Optical Singlemode) naming convention. Each classification has specific performance characteristics.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Multimode fibre classifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>OM1:</strong> 62.5/125 legacy fibre - 200 MHz·km at 850nm - limited to 33m at 10G</li>
                <li><strong>OM2:</strong> 50/125 standard multimode - 500 MHz·km at 850nm - limited to 82m at 10G</li>
                <li><strong>OM3:</strong> 50/125 laser-optimised - 2000 MHz·km at 850nm - supports 300m at 10G</li>
                <li><strong>OM4:</strong> 50/125 enhanced laser-optimised - 4700 MHz·km - supports 400m at 10G</li>
                <li><strong>OM5:</strong> 50/125 wideband - supports SWDM for 40G/100G over 150m</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Singlemode fibre classifications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>OS1:</strong> Indoor singlemode - 1.0 dB/km max attenuation - tight buffered</li>
                <li><strong>OS2:</strong> Low water peak singlemode - 0.4 dB/km at 1310nm, 0.3 dB/km at 1550nm</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Practical Selection</p>
              <p className="text-sm text-white">
                For new installations: OM4 or OM5 for multimode applications under 400m; OS2 for longer distances or future-proofing. OM1 and OM2 are considered legacy and should be avoided in new designs.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Performance and Testing Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standards define specific performance parameters and testing requirements to ensure installed cabling meets specifications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key performance parameters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Attenuation:</strong> Signal loss through the link (dB)</li>
                <li><strong>Return loss (ORL):</strong> Reflected light back to source (dB)</li>
                <li><strong>Bandwidth:</strong> Data-carrying capacity (MHz·km for multimode)</li>
                <li><strong>Connector loss:</strong> Loss at each mated connector pair</li>
                <li><strong>Splice loss:</strong> Loss at fusion or mechanical splices</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Testing tiers (TIA terminology):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Tier 1 (Basic):</strong> Length, loss, and polarity - uses light source and power meter</li>
                <li><strong>Tier 2 (Extended):</strong> Tier 1 plus OTDR trace - characterises entire link</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Connector loss budgets (per mated pair):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Random mate:</strong> 0.75 dB maximum per TIA-568.3-D</li>
                <li><strong>High performance:</strong> 0.5 dB or better for modern connectors</li>
                <li><strong>Splice loss:</strong> 0.3 dB maximum for fusion splices</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Documentation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation is a key requirement of cabling standards. TIA-606 specifically addresses administration and documentation practices.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Required documentation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Test results:</strong> Pass/fail and measured values for all links</li>
                <li><strong>Cable records:</strong> Fibre count, type, and routing for all cables</li>
                <li><strong>Labelling:</strong> Unique identifiers for all components</li>
                <li><strong>As-built drawings:</strong> Actual installation vs design</li>
                <li><strong>Warranty information:</strong> Component warranties and system warranty</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">TIA-606 administration classes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Class 1:</strong> Single building, single tenant - basic requirements</li>
                <li><strong>Class 2:</strong> Single building, multiple tenants</li>
                <li><strong>Class 3:</strong> Campus environment</li>
                <li><strong>Class 4:</strong> Multi-campus - most comprehensive</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Digital Records</p>
              <p className="text-sm text-white">
                Modern practice requires digital test results that can be stored, searched, and shared. Test equipment should export results in standard formats. Cable management software helps maintain records throughout the infrastructure lifecycle.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Applying Standards</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Check specifications:</strong> Confirm which standards are referenced</li>
                <li><strong>Use current editions:</strong> Standards are updated regularly</li>
                <li><strong>Follow all requirements:</strong> Not just fibre specs - also admin and testing</li>
                <li><strong>Document compliance:</strong> Records prove standards were met</li>
                <li><strong>Training:</strong> BICSI certification validates installer competence</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Specification References</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>UK/Europe:</strong> "In accordance with ISO/IEC 11801 and EN 50173"</li>
                <li><strong>North America:</strong> "Per ANSI/TIA-568.3-D requirements"</li>
                <li><strong>Data centres:</strong> "Compliant with TIA-942 / ISO/IEC 11801-5"</li>
                <li><strong>Testing:</strong> "Tier 2 testing per TIA-568.3-D"</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Outdated standards:</strong> Using superseded editions</li>
                <li><strong>Incomplete testing:</strong> Not testing all required parameters</li>
                <li><strong>Missing documentation:</strong> No records of compliance</li>
                <li><strong>Mixed classifications:</strong> Using incompatible fibre types</li>
                <li><strong>Ignoring related standards:</strong> Only following fibre specs, not admin</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Key Standards</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">TIA Series</p>
                <ul className="space-y-0.5">
                  <li>TIA-568.0-D: Generic requirements</li>
                  <li>TIA-568.3-D: Optical fibre</li>
                  <li>TIA-606: Administration</li>
                  <li>TIA-942: Data centres</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">ISO/IEC Series</p>
                <ul className="space-y-0.5">
                  <li>11801-1: General requirements</li>
                  <li>11801-2: Office premises</li>
                  <li>11801-5: Data centres</li>
                  <li>14763-3: Optical fibre testing</li>
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
            <Link to="/electrician/upskilling/fiber-optics-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../fiber-optics-module-6-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule6Section1;
