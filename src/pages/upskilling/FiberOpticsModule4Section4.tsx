import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Connectorisation Techniques - Fibre Optics Technology";
const DESCRIPTION = "Learn field-installable connector methods, factory termination options, and best practices for fibre optic connector installation and testing.";

const quickCheckQuestions = [
  {
    id: "connector-qc1",
    question: "What is the main advantage of field-installable connectors?",
    options: [
      "Lower cost per connector",
      "No need for splicing equipment",
      "Always better performance than fusion",
      "No testing required"
    ],
    correctIndex: 1,
    explanation: "Field-installable connectors eliminate the need for expensive fusion splicing equipment, making them practical for low-volume work or where splicers are not available."
  },
  {
    id: "connector-qc2",
    question: "What type of field connector uses a pre-polished factory ferrule?",
    options: [
      "Epoxy and polish",
      "Mechanical splice-on",
      "Pre-polished/no-epoxy connector",
      "Crimp-on connector"
    ],
    correctIndex: 2,
    explanation: "Pre-polished (no-epoxy) connectors have a factory-polished ferrule with an internal mechanical splice that joins to the field fibre, eliminating field polishing."
  },
  {
    id: "connector-qc3",
    question: "What is a critical step after installing any field connector?",
    options: [
      "Paint it for identification",
      "Visual inspection and insertion loss testing",
      "Wait 24 hours before use",
      "Apply protective gel"
    ],
    correctIndex: 1,
    explanation: "Every connector must be visually inspected for end-face quality and tested for insertion loss. Never install connectors without verification."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What advantage does a fusion splice-on connector offer?",
    options: [
      "No equipment needed",
      "Lowest possible loss - fusion spliced to factory pigtail",
      "Fastest installation",
      "No testing required"
    ],
    correctAnswer: 1,
    explanation: "Fusion splice-on connectors provide the lowest possible loss by fusion splicing the field fibre to a factory-terminated pigtail connector."
  },
  {
    id: 2,
    question: "In epoxy-polish connectorisation, what cures the epoxy?",
    options: [
      "UV light only",
      "Heat from an oven",
      "Time (anaerobic cure) or heat acceleration",
      "Pressure only"
    ],
    correctAnswer: 2,
    explanation: "Epoxy can cure at ambient temperature over time (anaerobic cure) or be accelerated with heat in a curing oven."
  },
  {
    id: 3,
    question: "What is the typical insertion loss specification for a field connector?",
    options: [
      "Less than 0.1 dB",
      "Less than 0.5 dB (often 0.3 dB)",
      "Less than 1.0 dB",
      "Less than 2.0 dB"
    ],
    correctAnswer: 1,
    explanation: "Field connectors typically specify less than 0.5 dB maximum insertion loss, with good installations achieving 0.3 dB or less."
  },
  {
    id: 4,
    question: "What is the purpose of polishing in epoxy connectorisation?",
    options: [
      "Remove epoxy from outside",
      "Create smooth, scratch-free end face for low loss",
      "Clean the ferrule",
      "Adjust connector length"
    ],
    correctAnswer: 1,
    explanation: "Polishing creates a smooth, scratch-free end face that minimises insertion loss and prevents damage to mating connectors."
  },
  {
    id: 5,
    question: "What polish grade is typically used for APC connectors?",
    options: [
      "Flat polish only",
      "Special angled polishing process",
      "Same as UPC",
      "No polishing needed"
    ],
    correctAnswer: 1,
    explanation: "APC connectors require special angled polishing fixtures to maintain the 8 degree angle on the end face."
  },
  {
    id: 6,
    question: "What indicates a good connector end face under microscope?",
    options: [
      "Any smooth surface",
      "Clean, scratch-free, properly polished/shaped",
      "Visible fibre core",
      "Opaque appearance"
    ],
    correctAnswer: 1,
    explanation: "A good end face shows a clean, scratch-free surface with proper polish geometry (flat, domed, or angled depending on type)."
  },
  {
    id: 7,
    question: "Why might you choose pre-polished connectors over epoxy-polish?",
    options: [
      "Better performance always",
      "Faster installation, no polishing equipment needed",
      "Lower cost per connector",
      "Works on any fibre type"
    ],
    correctAnswer: 1,
    explanation: "Pre-polished connectors offer faster installation times and eliminate the need for polishing equipment and supplies."
  },
  {
    id: 8,
    question: "What is the fibre stub in a pre-polished connector?",
    options: [
      "External protection",
      "Factory-terminated fibre inside connector that field fibre joins to",
      "Cleaning tool",
      "Strain relief"
    ],
    correctAnswer: 1,
    explanation: "The fibre stub is a short factory-terminated fibre inside the connector that the field fibre mechanically splices to."
  },
  {
    id: 9,
    question: "How should excess fibre at a connector be managed?",
    options: [
      "Cut off close to connector",
      "Coil loosely maintaining bend radius",
      "Leave extended in straight line",
      "Tape tightly against cable"
    ],
    correctAnswer: 1,
    explanation: "Excess fibre should be coiled loosely while maintaining minimum bend radius to avoid signal loss from excessive bending."
  },
  {
    id: 10,
    question: "What documentation is required for connector terminations?",
    options: [
      "None - connectors are standard",
      "Insertion loss, return loss, visual inspection results",
      "Connector brand only",
      "Date only"
    ],
    correctAnswer: 1,
    explanation: "Complete documentation includes insertion loss, return loss, visual inspection results, and technician identification for quality assurance."
  }
];

const faqs = [
  {
    question: "Should I use field connectors or splice pigtails?",
    answer: "Fusion splicing factory-terminated pigtails generally provides lowest loss and highest reliability. Field connectors are convenient for low-volume work, quick repairs, or where splicing equipment is not available. For permanent infrastructure, splice pigtails are preferred. For moves/adds/changes and troubleshooting, field connectors offer flexibility."
  },
  {
    question: "Can I terminate APC connectors in the field?",
    answer: "Yes, but with care. Pre-polished APC field connectors are available (e.g., Corning Unicam). Epoxy-polish APC requires special angled polishing fixtures. APC ferrules must maintain the 8 degree angle precisely. Test carefully - APC connector quality is critical for PON and analogue video systems."
  },
  {
    question: "What causes high loss in field connectors?",
    answer: "Common causes: contaminated end face, poor cleave in mechanical splice connectors, incomplete fibre seating, damaged internal splice mechanism, and scratched or improperly polished end face. Always inspect and test. If loss exceeds specification, re-terminate rather than accept a marginal connector."
  },
  {
    question: "How long does field connector installation take?",
    answer: "Pre-polished connectors: 2-5 minutes once skilled. Epoxy-polish: 15-30 minutes including cure time and polishing. Fusion splice-on: 5-10 minutes including splice. Speed improves significantly with practice. Do not rush - quality is more important than speed."
  },
  {
    question: "Are field connectors as reliable as factory connectors?",
    answer: "Quality field installations can match factory performance. However, factory termination in controlled conditions with production equipment often provides more consistent results. For critical infrastructure, factory-terminated assemblies with fusion splice to the cable may offer best overall reliability."
  },
  {
    question: "What equipment do I need for field connectorisation?",
    answer: "Minimum: stripping tools, cleaver (for mechanical types), cleaning supplies, and test equipment. For epoxy-polish: add epoxy, curing oven (or wait for ambient cure), polishing films, and inspection microscope. Investment ranges from 200-500 pounds for mechanical connector kits to 2,000 pounds+ for full epoxy-polish setups."
  }
];

const FiberOpticsModule4Section4 = () => {
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

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Connectorisation Techniques
          </h1>
          <p className="text-white/80">
            Field-installable connector methods and best practices
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Pre-polished:</strong> Fast, no polish equipment</li>
              <li><strong>Epoxy-polish:</strong> Low cost per unit</li>
              <li><strong>Splice-on:</strong> Lowest loss possible</li>
              <li><strong>Always:</strong> Inspect and test every connector</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Quality Targets</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>IL:</strong> Under 0.5 dB (typical under 0.3)</li>
              <li><strong>RL:</strong> &gt;45 dB (UPC), &gt;60 dB (APC)</li>
              <li><strong>End face:</strong> Clean, scratch-free</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Pre-polished connector installation",
              "Epoxy and polish technique",
              "Fusion splice-on connectors",
              "End face inspection criteria",
              "Testing requirements",
              "Method selection guidance"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Pre-Polished Connectors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Pre-Polished (No-Epoxy) Connectors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pre-polished connectors have a factory-terminated fibre stub inside the connector.
              Field fibre is mechanically spliced to this stub, eliminating the need for polishing
              or epoxy.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">How They Work</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Internal structure:</strong> Factory-polished ferrule with short fibre stub inside</li>
                <li><strong>Mechanical splice:</strong> Index-matching gel and alignment mechanism</li>
                <li><strong>Field fibre joins:</strong> Cleaved field fibre butts against internal stub</li>
                <li><strong>Cam or clamp:</strong> Locks field fibre in alignment</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Process:</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal list-inside">
                <li>Strip fibre: Remove coating to specified length</li>
                <li>Clean fibre: IPA and lint-free wipe</li>
                <li>Cleave fibre: Precision cleave to exact length specified</li>
                <li>Insert fibre: Push into connector until seated</li>
                <li>Engage lock: Activate cam or clamp mechanism</li>
                <li>Inspect and test: Verify end face and loss</li>
              </ol>
            </div>

            <div className="my-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                  <p className="text-sm font-medium text-green-400 mb-2">Advantages</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Fast installation (2-5 min)</li>
                    <li>No polishing equipment</li>
                    <li>No epoxy handling</li>
                    <li>Pre-tested ferrule</li>
                    <li>Consistent results</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                  <p className="text-sm font-medium text-red-400 mb-2">Limitations</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Higher cost per connector</li>
                    <li>Internal splice adds loss</li>
                    <li>Critical cleave length</li>
                    <li>Not re-terminable</li>
                    <li>Gel can degrade</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Popular Products</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Corning Unicam:</strong> Widely used, available in all connector types</li>
                <li><strong>3M NPC:</strong> No-Polish Connector range</li>
                <li><strong>CommScope LightCrimp Plus:</strong> Mechanical crimp design</li>
                <li><strong>Senko UPC/APC:</strong> Various pre-polished options</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Epoxy and Polish */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Epoxy and Polish Connectorisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Traditional epoxy-polish termination bonds the fibre into the connector ferrule
              with epoxy, then polishes the end face to optical quality. Lower per-connector
              cost but requires more equipment and skill.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Equipment Required:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Connectors:</strong> Appropriate type for application (SC, LC, ST, etc.)</li>
                <li><strong>Epoxy:</strong> Two-part or heat-cure optical epoxy</li>
                <li><strong>Curing oven:</strong> For heat-cure epoxy (or wait for anaerobic cure)</li>
                <li><strong>Polishing films:</strong> Multiple grades (5 micrometre, 3 micrometre, 1 micrometre, 0.3 micrometre)</li>
                <li><strong>Polishing puck:</strong> Holds connector for polishing</li>
                <li><strong>Inspection microscope:</strong> Verify end face quality</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Process:</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal list-inside">
                <li>Prepare connector: Attach boot and crimp ring to cable</li>
                <li>Strip and clean fibre: Expose fibre for insertion</li>
                <li>Mix/apply epoxy: Fill ferrule bore with epoxy</li>
                <li>Insert fibre: Push through until protruding from ferrule</li>
                <li>Crimp strain relief: Secure cable in connector body</li>
                <li>Cure epoxy: Heat cure (minutes) or ambient (hours)</li>
                <li>Scribe and break: Remove protruding fibre</li>
                <li>Polish: Progressive grades to mirror finish</li>
                <li>Inspect: Verify end face quality</li>
                <li>Test: Measure insertion loss</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Polishing Sequence</p>
              <p className="text-sm text-white mb-2">
                Progressive polishing removes scratches from previous steps:
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>5 micrometre film:</strong> Remove excess epoxy and fibre</li>
                <li><strong>3 micrometre film:</strong> Remove 5 micrometre scratches</li>
                <li><strong>1 micrometre film:</strong> Further refinement</li>
                <li><strong>0.3 micrometre film:</strong> Final polish for mirror finish</li>
              </ul>
              <p className="text-xs text-white mt-2">
                Use figure-8 motion, consistent pressure, 20-30 seconds per grade.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03: Fusion Splice-On Connectors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fusion Splice-On Connectors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fusion splice-on connectors combine the low loss of fusion splicing with the
              convenience of a connector. A factory-terminated pigtail connector is fusion
              spliced to the field fibre.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">How They Work</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Factory connector:</strong> Pre-terminated, tested connector with short pigtail</li>
                <li><strong>Fusion splice:</strong> Field fibre spliced to pigtail</li>
                <li><strong>Integrated package:</strong> Splice protected within connector assembly</li>
                <li><strong>Result:</strong> Connector with fusion splice quality</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Process:</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal list-inside">
                <li>Prepare both fibres: Strip, clean, and cleave</li>
                <li>Load splice-on connector: Place pigtail in splicer holder</li>
                <li>Load field fibre: Position in opposite holder</li>
                <li>Perform fusion splice: Standard fusion procedure</li>
                <li>Protect splice: Apply heat shrink if not integral</li>
                <li>Assemble connector: Complete mechanical assembly</li>
                <li>Test: Verify end face and loss</li>
              </ol>
            </div>

            <div className="my-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                  <p className="text-sm font-medium text-green-400 mb-2">Advantages</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Lowest total loss</li>
                    <li>Factory connector quality</li>
                    <li>Fusion splice reliability</li>
                    <li>No field polishing</li>
                    <li>Consistent results</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Considerations</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Requires fusion splicer</li>
                    <li>Higher cost per unit</li>
                    <li>Specific holders needed</li>
                    <li>Not field-repairable</li>
                    <li>Longer than standard connector</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">When to Use</p>
              <p className="text-sm text-white">
                Fusion splice-on connectors are ideal when you need connector convenience with
                fusion-splice quality. Perfect for data centres, high-density installations,
                and anywhere maximum performance matters. The additional cost is justified
                where loss budgets are tight.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: End Face Inspection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            End Face Inspection Criteria
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Inspecting the connector end face before testing catches defects that cause
              high loss or damage mating connectors. Use a fibre inspection microscope at
              200x or 400x magnification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">IEC 61300-3-35 Zones:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Zone A (Core):</strong> No defects allowed in core area</li>
                <li><strong>Zone B (Cladding):</strong> Limited small scratches acceptable</li>
                <li><strong>Zone C (Adhesive):</strong> Some contamination may be acceptable</li>
                <li><strong>Zone D (Contact):</strong> Ferrule contact area - limited defects</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Defects:</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Contamination</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Dust particles</li>
                    <li>Oil/residue</li>
                    <li>Dried fluids</li>
                    <li><strong>Solution:</strong> Clean and re-inspect</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Physical Damage</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Scratches</li>
                    <li>Chips</li>
                    <li>Cracks</li>
                    <li><strong>Solution:</strong> Re-terminate</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Inspection Points</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Core area must be clean:</strong> Any defect here causes loss</li>
                <li><strong>No deep scratches:</strong> Can damage mating connector</li>
                <li><strong>Proper polish geometry:</strong> Flat or correctly domed</li>
                <li><strong>APC angle:</strong> Must show correct 8 degree face</li>
                <li><strong>Clean before inspection:</strong> Distinguish dirt from damage</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05: Testing Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Testing Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every field connector must be tested to verify it meets specifications. Testing
              catches installation errors before they cause system problems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test Parameters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Insertion Loss (IL):</strong> Signal loss through connector, measured in dB</li>
                <li><strong>Return Loss (RL):</strong> Reflected signal level, higher is better</li>
                <li><strong>Visual inspection:</strong> End face quality verification</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Specifications:</p>
              <div className="overflow-x-auto">
                <table className="text-sm w-full border-collapse">
                  <thead>
                    <tr className="text-left border-b border-white/20">
                      <th className="pb-2 text-white pr-4">Parameter</th>
                      <th className="pb-2 text-elec-yellow pr-4">UPC</th>
                      <th className="pb-2 text-elec-yellow">APC</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">Insertion Loss</td>
                      <td className="pr-4">Under 0.3 dB typical</td>
                      <td>Under 0.3 dB typical</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">Max IL (spec)</td>
                      <td className="pr-4">Under 0.5 dB</td>
                      <td>Under 0.5 dB</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Return Loss</td>
                      <td className="pr-4">&gt;45 dB</td>
                      <td>&gt;60 dB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Test Equipment</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Optical power meter:</strong> Measures signal level for IL calculation</li>
                <li><strong>Light source:</strong> Calibrated reference source</li>
                <li><strong>OTDR:</strong> Can measure individual connector loss and location</li>
                <li><strong>Test cables:</strong> Reference-quality cables for measurement</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Documentation</p>
              <p className="text-sm text-white">
                Record for each connector: location/ID, connector type, test date, wavelength,
                measured IL and RL values, visual inspection result, and technician ID.
                Failed connectors should be re-terminated and re-tested.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Method Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Method Selection Guide
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Choosing the right connectorisation method depends on your specific requirements,
              available equipment, and skill level.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Decision Matrix:</p>
              <div className="overflow-x-auto">
                <table className="text-sm w-full border-collapse">
                  <thead>
                    <tr className="text-left border-b border-white/20">
                      <th className="pb-2 text-white pr-4">Factor</th>
                      <th className="pb-2 text-elec-yellow pr-4">Pre-Polish</th>
                      <th className="pb-2 text-elec-yellow pr-4">Epoxy</th>
                      <th className="pb-2 text-elec-yellow">Splice-On</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">Install time</td>
                      <td className="pr-4">5 min</td>
                      <td className="pr-4">30 min</td>
                      <td>10 min</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">Equipment cost</td>
                      <td className="pr-4">Low</td>
                      <td className="pr-4">Medium</td>
                      <td>High</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">Per-connector cost</td>
                      <td className="pr-4">High</td>
                      <td className="pr-4">Low</td>
                      <td>Medium</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">Skill required</td>
                      <td className="pr-4">Low</td>
                      <td className="pr-4">High</td>
                      <td>Medium</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Loss typical</td>
                      <td className="pr-4">0.2-0.4 dB</td>
                      <td className="pr-4">0.1-0.3 dB</td>
                      <td>Under 0.15 dB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Use Pre-Polished When:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Speed is priority</li>
                  <li>Low volume work</li>
                  <li>Minimal equipment available</li>
                  <li>Limited skill/training</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Use Epoxy-Polish When:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>High volume terminations</li>
                  <li>Cost per connector matters</li>
                  <li>Skilled technicians available</li>
                  <li>Equipment investment justified</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-elec-yellow mb-2">Use Fusion Splice-On When:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Lowest loss essential</li>
                  <li>Fusion splicer available</li>
                  <li>High reliability required</li>
                  <li>Data centre/critical infrastructure</li>
                </ul>
              </div>
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
                <li><strong>Clean first, always:</strong> Inspect end face before and after cleaning</li>
                <li><strong>Follow specifications:</strong> Use exact strip and cleave lengths</li>
                <li><strong>Test every connector:</strong> No exceptions - catch problems early</li>
                <li><strong>Document results:</strong> Maintain records for handover</li>
                <li><strong>Practice technique:</strong> Skill improves with experience</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Troubleshooting High Loss</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Clean and retest:</strong> Contamination is most common cause</li>
                <li><strong>Check end face:</strong> Inspect for damage under microscope</li>
                <li><strong>Verify insertion:</strong> Connector fully seated?</li>
                <li><strong>Check cleave:</strong> Was cleave quality good?</li>
                <li><strong>Re-terminate if needed:</strong> Do not accept marginal connectors</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping inspection</strong> - installing contaminated connectors</li>
                <li><strong>Wrong cleave length</strong> - causes incomplete seating or stress</li>
                <li><strong>Inadequate polishing</strong> - scratched end face causes loss</li>
                <li><strong>Mixing polish types</strong> - APC and UPC are NOT interchangeable</li>
                <li><strong>Rushing</strong> - quality suffers when you skip steps</li>
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
          <div className="p-5 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Field Connectorisation</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Methods</p>
                <ul className="space-y-0.5">
                  <li>Pre-polished: Fast, no polish</li>
                  <li>Epoxy-polish: Low cost/unit</li>
                  <li>Splice-on: Lowest loss</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Always Do</p>
                <ul className="space-y-0.5">
                  <li>Inspect end face</li>
                  <li>Test insertion loss</li>
                  <li>Document results</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white">
                Targets: IL under 0.5 dB (typical under 0.3) | RL &gt;45 dB (UPC), &gt;60 dB (APC)
              </p>
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
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule4Section4;
