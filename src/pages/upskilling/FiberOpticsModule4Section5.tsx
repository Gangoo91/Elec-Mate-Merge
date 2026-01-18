import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Inspection Microscopes and Cleaning Tools - Fibre Optics Technology";
const DESCRIPTION = "Learn about fibre optic inspection equipment, cleaning methods, and best practices for maintaining connector quality and system reliability.";

const quickCheckQuestions = [
  {
    id: "inspection-qc1",
    question: "Why should you always inspect connectors before mating them?",
    options: [
      "To check the colour",
      "Contamination causes signal loss and can damage connectors",
      "Regulatory requirement only",
      "To verify connector type"
    ],
    correctIndex: 1,
    explanation: "Even microscopic contamination causes signal loss and can permanently damage connector end faces when mated. Inspection catches problems before they cause damage or system failures."
  },
  {
    id: "inspection-qc2",
    question: "What magnification is typically used for fibre end-face inspection?",
    options: [
      "10x-50x",
      "200x-400x",
      "1000x-2000x",
      "50x-100x"
    ],
    correctIndex: 1,
    explanation: "200x-400x magnification is standard for fibre inspection, allowing clear viewing of the core, cladding, and contact zones defined in IEC 61300-3-35."
  },
  {
    id: "inspection-qc3",
    question: "What is the 'inspect, clean, inspect' rule?",
    options: [
      "Inspect the connector three times",
      "Inspect before cleaning, clean, then inspect again to verify",
      "Use three different microscopes",
      "Clean three times before inspecting"
    ],
    correctIndex: 1,
    explanation: "First inspection identifies contamination type, cleaning removes it, second inspection verifies the end face is clean. Never skip the verification step."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What type of contamination commonly causes high insertion loss?",
    options: [
      "Magnetic particles",
      "Dust, oil, and debris on the end face",
      "Connector colour",
      "Cable jacket damage"
    ],
    correctAnswer: 1,
    explanation: "Dust, oil, fingerprints and debris on the connector end face block light transmission and cause insertion loss."
  },
  {
    id: 2,
    question: "What is a video probe microscope used for?",
    options: [
      "Testing cable length",
      "Inspecting connectors in patch panels and adapters",
      "Measuring loss",
      "Stripping cable"
    ],
    correctAnswer: 1,
    explanation: "Video probe microscopes have thin probes that can reach connectors installed in adapters and patch panels where handheld scopes cannot access."
  },
  {
    id: 3,
    question: "What cleaning method is recommended for connectors in adapters?",
    options: [
      "Compressed air only",
      "Wet-dry stick cleaners",
      "Water rinse",
      "Abrasive pads"
    ],
    correctAnswer: 1,
    explanation: "Stick cleaners (1.25mm for LC, 2.5mm for SC) are designed to reach into adapter ports and clean the ferrule end face."
  },
  {
    id: 4,
    question: "How should used cleaning stick tips be handled?",
    options: [
      "Reuse until dirty",
      "Discard after single use",
      "Wash and reuse",
      "Share between technicians"
    ],
    correctAnswer: 1,
    explanation: "Cleaning sticks are single-use consumables. Reusing them transfers contamination back to connectors."
  },
  {
    id: 5,
    question: "What IEC standard defines end-face inspection criteria?",
    options: [
      "IEC 60793",
      "IEC 61300-3-35",
      "IEC 61754",
      "IEC 60794"
    ],
    correctAnswer: 1,
    explanation: "IEC 61300-3-35 defines the inspection zones (A, B, C, D) and acceptance criteria for fibre connector end faces."
  },
  {
    id: 6,
    question: "What does a 'cassette cleaner' contain?",
    options: [
      "Compressed air",
      "Ribbon of dry cleaning material",
      "Liquid cleaner",
      "Polishing film"
    ],
    correctAnswer: 1,
    explanation: "Cassette cleaners contain a ribbon of dry lint-free cleaning material that advances to provide fresh cleaning surface for each use."
  },
  {
    id: 7,
    question: "What contamination type is most likely from skin contact?",
    options: [
      "Dust",
      "Oil and fingerprints",
      "Metal particles",
      "Water"
    ],
    correctAnswer: 1,
    explanation: "Skin oils transfer easily to connector end faces and require wet cleaning with IPA to fully remove."
  },
  {
    id: 8,
    question: "When should you use wet cleaning (IPA)?",
    options: [
      "Always as first step",
      "When dry cleaning doesn't remove contamination",
      "Never on fibre",
      "Only on outdoor connectors"
    ],
    correctAnswer: 1,
    explanation: "Try dry cleaning first. Use IPA (isopropyl alcohol) wet cleaning when dry methods fail to remove oils or stubborn contamination."
  },
  {
    id: 9,
    question: "What can result from mating a contaminated connector?",
    options: [
      "Improved signal",
      "Scratched/damaged end faces on both connectors",
      "No significant effect",
      "Cleaner connection"
    ],
    correctAnswer: 1,
    explanation: "Contamination gets pressed between end faces causing scratches and permanent damage to both connectors when mated."
  },
  {
    id: 10,
    question: "How should inspection equipment be stored?",
    options: [
      "Any convenient location",
      "In protective case, lens covers on, away from contamination",
      "In direct sunlight",
      "Loose in tool bag"
    ],
    correctAnswer: 1,
    explanation: "Protect microscope optics with lens caps and cases. Store away from dust and contamination that could affect inspection accuracy."
  }
];

const faqs = [
  {
    question: "How often should I clean connectors?",
    answer: "Every time before mating and after any handling. Even new connectors from packaging should be inspected and cleaned. Make inspection and cleaning a standard step in every connection procedure - it takes seconds and prevents problems that take hours to diagnose."
  },
  {
    question: "Can I clean APC connectors the same way as UPC?",
    answer: "Yes, the cleaning process is similar. However, some cleaning tools have specific versions for APC (angled) to ensure proper contact with the angled end face. Check your cleaning tool specifications. The angled face may require slightly different technique to ensure full surface contact."
  },
  {
    question: "Is compressed air safe for fibre cleaning?",
    answer: "Use with caution. Only use filtered, dry, oil-free compressed air designed for electronics. Regular workshop air often contains oil and moisture. Compressed air alone doesn't remove all contamination types - it's best as a first step before other cleaning methods. Never use high pressure directly on end faces."
  },
  {
    question: "What if contamination won't come off after multiple cleanings?",
    answer: "If contamination persists after proper wet and dry cleaning, it may be damage rather than contamination (scratches, chips, or burned-in particles). Inspect closely under magnification. Damaged connectors must be re-terminated or replaced - continued cleaning won't fix physical damage."
  },
  {
    question: "Do I need different microscopes for different connector types?",
    answer: "The basic microscope can view most connector types, but you need appropriate adapters or tips for different form factors (LC, SC, MPO, etc.). Video probe microscopes are essential for inspecting connectors installed in panels and adapters where handheld microscopes can't reach."
  },
  {
    question: "How do I know if my cleaning supplies are contaminated?",
    answer: "Store supplies in sealed containers. Discard wipes exposed to dirty environments. Check IPA containers for contamination. If cleaning seems ineffective or you're seeing new contamination appear after cleaning, your supplies may be compromised. Use fresh supplies from sealed packaging."
  }
];

const FiberOpticsModule4Section5 = () => {
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
            <Link to="/electrician/upskilling/fiber-optics-module-4">
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
            <span>Module 4 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Inspection Microscopes and Cleaning Tools
          </h1>
          <p className="text-white/80">
            Master connector inspection and cleaning for reliable fibre networks
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Contamination:</strong> Leading cause of fibre problems</li>
              <li><strong>Magnification:</strong> 200-400x for inspection</li>
              <li><strong>Rule:</strong> Inspect, clean, inspect again</li>
              <li><strong>Tools:</strong> Cassette cleaners and stick cleaners</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Handheld scope:</strong> Patch cords, loose connectors</li>
              <li><strong>Video probe:</strong> Adapters, patch panels</li>
              <li><strong>Cassette cleaner:</strong> Quick dry cleaning</li>
              <li><strong>Stick cleaner:</strong> Cleaning inside adapters</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Inspection microscope types and selection",
              "IEC end-face inspection criteria",
              "Cleaning tool types and applications",
              "Proper cleaning procedures and techniques",
              "Troubleshooting persistent contamination",
              "Equipment care and maintenance"
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
            Why Inspection and Cleaning Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Contamination is the number one cause of fibre optic network problems. A particle as small as 1 micron on a 9-micron singlemode core can block significant light and cause signal loss.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The cost of contamination:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Signal loss:</strong> Particles block light transmission</li>
                <li><strong>Back-reflection:</strong> Contamination causes unwanted reflections</li>
                <li><strong>Permanent damage:</strong> Dirt gets pressed into end faces when mated</li>
                <li><strong>Chain reaction:</strong> One dirty connector contaminates others it mates with</li>
                <li><strong>Troubleshooting cost:</strong> Hours finding problems that cleaning prevents</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">The Golden Rule</p>
              <p className="text-sm text-white">
                <strong>Inspect, Clean, Inspect</strong> before every connection. First inspection identifies contamination, cleaning removes it, final inspection verifies success. This takes only seconds but prevents hours of troubleshooting.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Inspection Microscope Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different inspection tools serve different purposes. Most technicians need both handheld and video probe types for comprehensive inspection capability.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Handheld microscope:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Magnification: 200x or 400x with built-in LED illumination</li>
                <li>Adapter tips for different connector types (LC, SC, FC, ST)</li>
                <li>Price range: typically 50 to 300 pounds</li>
                <li>Best for: Patch cords and accessible ferrules</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Video probe microscope:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Thin probe diameter: 1.25mm (LC) or 2.5mm (SC)</li>
                <li>LCD display or smartphone app connection</li>
                <li>Essential for installed connectors in adapters</li>
                <li>Price range: typically 500 to 2,000 pounds</li>
                <li>Best for: Panels, switches, adapters</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Desktop/USB microscope:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Higher magnification options (up to 800x)</li>
                <li>Image capture and storage capability</li>
                <li>Computer connection for documentation</li>
                <li>Best for: Lab, quality control, training, documentation</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Recommended Setup</p>
              <p className="text-sm text-white">
                For field work, carry both a handheld scope (for patch cords) and a video probe (for installed connectors). Many manufacturers offer combined kits. For workshop use, add a desktop microscope for detailed analysis and documentation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            IEC Inspection Criteria
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IEC 61300-3-35 defines inspection zones and cleanliness criteria for fibre connector end faces. Understanding these zones helps evaluate inspection results.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">End face zones (singlemode):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Zone A (Core):</strong> 0-25 micrometres from centre. NO defects or contamination allowed.</li>
                <li><strong>Zone B (Cladding):</strong> 25-120 micrometres. Limited scratches acceptable, no contamination.</li>
                <li><strong>Zone C (Adhesive):</strong> 120-130 micrometres. Some defects acceptable, not critical.</li>
                <li><strong>Zone D (Contact):</strong> 130-250 micrometres. Ferrule contact area, limited defects.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Practical Interpretation</p>
              <p className="text-sm text-white">
                Focus on the core area (Zone A) - this is most critical. Any visible contamination or defect in the core fails inspection. Light scratches in the cladding are often acceptable. When in doubt, clean again and re-inspect. Never mate a connector with visible core contamination.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Cleaning Tool Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different cleaning tools suit different situations. Choose based on whether the connector is accessible (patch cord) or installed (in an adapter).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cassette/reel cleaners:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Dry cleaning tape in a cassette - swipe connector across exposed tape</li>
                <li>Quick and convenient with 500+ cleans per cassette</li>
                <li>No consumables to manage individually</li>
                <li>For patch cords and accessible connectors</li>
                <li>Popular brands: Cletop, NTT-AT, AFL</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Stick cleaners (swabs):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1.25mm tip for LC/MU ports</li>
                <li>2.5mm tip for SC/FC/ST ports</li>
                <li>Available dry or with IPA pre-saturated</li>
                <li>Single-use disposable tips - never reuse</li>
                <li>Essential for cleaning adapters and switch ports</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Lint-free wipes and IPA:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>99%+ isopropyl alcohol for wet cleaning</li>
                <li>Optical-grade lint-free wipes</li>
                <li>For stubborn contamination (oils, fingerprints)</li>
                <li>Requires dry follow-up - never let IPA air dry</li>
                <li>Lower cost but more technique-dependent</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Cleaning Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper cleaning technique ensures contamination is removed without damaging the end face or spreading contamination.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cleaning patch cords (cassette method):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Inspect connector under microscope</li>
                <li>2. Open cassette cleaner to expose cleaning surface</li>
                <li>3. Hold connector perpendicular to cleaning surface</li>
                <li>4. Press down and swipe across tape once</li>
                <li>5. Advance tape to fresh area for next use</li>
                <li>6. Re-inspect to verify clean</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cleaning adapters/ports (stick method):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Inspect with video probe if possible</li>
                <li>2. Select correct stick size (1.25mm or 2.5mm)</li>
                <li>3. Insert stick straight into adapter</li>
                <li>4. Rotate 2-3 times with light pressure</li>
                <li>5. Remove and discard used stick</li>
                <li>6. Inspect to verify clean</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wet cleaning procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use when dry cleaning doesn't remove contamination</li>
                <li>Dampen (not soak) wipe or stick with IPA</li>
                <li>Clean end face with wet material</li>
                <li>Immediately follow with dry cleaning</li>
                <li>Ensure no residue remains - never let IPA air dry</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Common cleaning mistakes to avoid:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Reusing cleaning surfaces:</strong> Transfers contamination back</li>
                <li><strong>Skipping final inspection:</strong> Cleaning isn't complete until verified</li>
                <li><strong>Excessive pressure:</strong> Can damage end face</li>
                <li><strong>Circular motion on ferrule:</strong> Use straight wipes</li>
                <li><strong>Letting IPA dry naturally:</strong> Leaves residue</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Equipment Care and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper care of inspection and cleaning equipment ensures reliable performance and extends equipment life.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Microscope care:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always cap lenses when not in use</li>
                <li>Use only optical-grade lens cleaners</li>
                <li>Remove batteries if storing long-term</li>
                <li>Protect thin video probes from bending</li>
                <li>Keep in protective case, away from dust</li>
                <li>Periodic check for focus and illumination</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cleaning supply management:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Advance cassette tape fully after contaminated environments</li>
                <li>Store stick cleaners in sealed packaging, check expiry dates</li>
                <li>Keep IPA tightly sealed, discard if contaminated</li>
                <li>Store wipes in sealed containers, don't touch cleaning surfaces</li>
                <li>Rotate stock, use first-in first-out</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Kit Checklist</p>
              <p className="text-sm text-white mb-2">Every fibre technician should carry:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Handheld microscope with adapter tips</li>
                <li>Video probe microscope (for installed connectors)</li>
                <li>Cassette/reel cleaner</li>
                <li>Stick cleaners (1.25mm and 2.5mm)</li>
                <li>IPA and lint-free wipes (backup)</li>
                <li>Spare batteries</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Make it routine:</strong> Inspect and clean EVERY connection, EVERY time</li>
                <li><strong>Dry first:</strong> Try dry cleaning before wet - often sufficient</li>
                <li><strong>Don't assume:</strong> Even new connectors from packaging need inspection</li>
                <li><strong>Use proper tools:</strong> Right size stick for adapter type</li>
                <li><strong>Document issues:</strong> Photograph persistent problems for analysis</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Troubleshooting Persistent Contamination</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Try wet cleaning:</strong> IPA removes oils that dry cleaning misses</li>
                <li><strong>Check cleaning supplies:</strong> Are they contaminated?</li>
                <li><strong>Evaluate environment:</strong> Is workspace too dirty?</li>
                <li><strong>Look for damage:</strong> What looks like dirt may be physical damage</li>
                <li><strong>Check mating connector:</strong> May be transferring contamination</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">When Cleaning Fails</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>If contamination won't clean after multiple attempts with wet and dry methods, the end face may be damaged</li>
                <li>Scratches, pits, or burned-in debris cannot be cleaned away</li>
                <li>These connectors must be re-terminated or replaced</li>
                <li>Continuing to use damaged connectors risks damaging mating connectors</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Inspect, Clean, Inspect</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Inspection</p>
                <ul className="space-y-0.5">
                  <li>200-400x magnification</li>
                  <li>Focus on core area (Zone A)</li>
                  <li>No defects in core = pass</li>
                  <li>Use video probe for adapters</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Cleaning</p>
                <ul className="space-y-0.5">
                  <li>Dry clean first (cassette/stick)</li>
                  <li>Wet clean if needed (IPA)</li>
                  <li>Always dry after wet</li>
                  <li>Verify with final inspection</li>
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
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fiber-optics-module-5">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule4Section5;
