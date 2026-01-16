import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, ChevronDown, Link as LinkIcon, Target, Settings, AlertTriangle, BookOpen, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Connectorisation Techniques - Fiber Optics Technology";
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
    explanation: "Field-installable connectors eliminate the need for expensive fusion splicing equipment, making them practical for low-volume work or where splicers aren't available."
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
    question: "What advantage does a fusion splice-on connector offer?",
    options: [
      "No equipment needed",
      "Lowest possible loss - fusion spliced to factory pigtail",
      "Fastest installation",
      "No testing required"
    ],
    correctAnswer: 1
  },
  {
    question: "In epoxy-polish connectorisation, what cures the epoxy?",
    options: [
      "UV light only",
      "Heat from an oven",
      "Time (anaerobic cure) or heat acceleration",
      "Pressure only"
    ],
    correctAnswer: 2
  },
  {
    question: "What is the typical insertion loss specification for a field connector?",
    options: [
      "Less than 0.1 dB",
      "Less than 0.5 dB (often 0.3 dB)",
      "Less than 1.0 dB",
      "Less than 2.0 dB"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the purpose of polishing in epoxy connectorisation?",
    options: [
      "Remove epoxy from outside",
      "Create smooth, scratch-free end face for low loss",
      "Clean the ferrule",
      "Adjust connector length"
    ],
    correctAnswer: 1
  },
  {
    question: "What polish grade is typically used for APC connectors?",
    options: [
      "Flat polish only",
      "Special angled polishing process",
      "Same as UPC",
      "No polishing needed"
    ],
    correctAnswer: 1
  },
  {
    question: "What indicates a good connector end face under microscope?",
    options: [
      "Any smooth surface",
      "Clean, scratch-free, properly polished/shaped",
      "Visible fibre core",
      "Opaque appearance"
    ],
    correctAnswer: 1
  },
  {
    question: "Why might you choose pre-polished connectors over epoxy-polish?",
    options: [
      "Better performance always",
      "Faster installation, no polishing equipment needed",
      "Lower cost per connector",
      "Works on any fibre type"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the fibre stub in a pre-polished connector?",
    options: [
      "External protection",
      "Factory-terminated fibre inside connector that field fibre joins to",
      "Cleaning tool",
      "Strain relief"
    ],
    correctAnswer: 1
  },
  {
    question: "How should excess fibre at a connector be managed?",
    options: [
      "Cut off close to connector",
      "Coil loosely maintaining bend radius",
      "Leave extended in straight line",
      "Tape tightly against cable"
    ],
    correctAnswer: 1
  },
  {
    question: "What documentation is required for connector terminations?",
    options: [
      "None - connectors are standard",
      "Insertion loss, return loss, visual inspection results",
      "Connector brand only",
      "Date only"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "Should I use field connectors or splice pigtails?",
    answer: "Fusion splicing factory-terminated pigtails generally provides lowest loss and highest reliability. Field connectors are convenient for low-volume work, quick repairs, or where splicing equipment isn't available. For permanent infrastructure, splice pigtails are preferred. For moves/adds/changes and troubleshooting, field connectors offer flexibility."
  },
  {
    question: "Can I terminate APC connectors in the field?",
    answer: "Yes, but with care. Pre-polished APC field connectors are available (e.g., Corning Unicam). Epoxy-polish APC requires special angled polishing fixtures. APC ferrules must maintain the 8° angle precisely. Test carefully - APC connector quality is critical for PON and analogue video systems."
  },
  {
    question: "What causes high loss in field connectors?",
    answer: "Common causes: contaminated end face, poor cleave in mechanical splice connectors, incomplete fibre seating, damaged internal splice mechanism, and scratched or improperly polished end face. Always inspect and test. If loss exceeds specification, re-terminate rather than accept a marginal connector."
  },
  {
    question: "How long does field connector installation take?",
    answer: "Pre-polished connectors: 2-5 minutes once skilled. Epoxy-polish: 15-30 minutes including cure time and polishing. Fusion splice-on: 5-10 minutes including splice. Speed improves significantly with practice. Don't rush - quality is more important than speed."
  },
  {
    question: "Are field connectors as reliable as factory connectors?",
    answer: "Quality field installations can match factory performance. However, factory termination in controlled conditions with production equipment often provides more consistent results. For critical infrastructure, factory-terminated assemblies with fusion splice to the cable may offer best overall reliability."
  },
  {
    question: "What equipment do I need for field connectorisation?",
    answer: "Minimum: stripping tools, cleaver (for mechanical types), cleaning supplies, and test equipment. For epoxy-polish: add epoxy, curing oven (or wait for ambient cure), polishing films, and inspection microscope. Investment ranges from £200-500 for mechanical connector kits to £2,000+ for full epoxy-polish setups."
  }
];

const FiberOpticsModule4Section4 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module4"
            className="flex items-center gap-2 text-white/70 hover:text-white active:scale-[0.98] touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Module 4</span>
          </Link>
          <span className="text-xs text-white/40 hidden sm:block">Section 4 of 5</span>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4 max-w-3xl mx-auto">
        {/* Module Number Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-elec-yellow">
            <LinkIcon className="w-4 h-4" />
            Module 4 · Section 4
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Connectorisation Techniques
        </h1>

        {/* Quick Summary Card */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-5 border border-purple-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Field connectors allow termination without fusion splicers. Pre-polished (no-epoxy)
            connectors use internal mechanical splices for fastest installation. Epoxy-polish
            connectors require curing and polishing but offer lowest cost per connector. Fusion
            splice-on connectors combine fusion quality with connector convenience. Always
            inspect and test every connector installation.
          </p>
        </div>

        {/* Spot it / Use it Card */}
        <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-5 border border-pink-500/20 mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-pink-400 mb-2">Field Methods</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Pre-polished (mechanical)</li>
                <li>• Epoxy and polish</li>
                <li>• Fusion splice-on</li>
                <li>• Crimp and cleave</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-purple-400 mb-2">Quality Targets</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• IL: &lt;0.5 dB (typical &lt;0.3)</li>
                <li>• RL: &gt;45 dB (UPC), &gt;60 dB (APC)</li>
                <li>• Clean end face</li>
                <li>• Document all results</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            What You'll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Pre-polished connector installation",
              "Epoxy and polish technique",
              "Fusion splice-on connectors",
              "End face inspection criteria",
              "Testing requirements",
              "Method selection guidance"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                </div>
                <span className="text-sm text-white/80">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1: Pre-Polished Connectors */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-lg font-bold">01</span>
            </div>
            <h2 className="text-xl font-bold">Pre-Polished (No-Epoxy) Connectors</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Pre-polished connectors have a factory-terminated fibre stub inside the connector.
              Field fibre is mechanically spliced to this stub, eliminating the need for polishing
              or epoxy.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-purple-400" />
                How They Work
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Internal structure:</strong> Factory-polished ferrule with short fibre stub inside</li>
                <li><strong>Mechanical splice:</strong> Index-matching gel and alignment mechanism</li>
                <li><strong>Field fibre joins:</strong> Cleaved field fibre butts against internal stub</li>
                <li><strong>Cam or clamp:</strong> Locks field fibre in alignment</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Installation Process</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Strip fibre:</strong> Remove coating to specified length</li>
                <li><strong>2. Clean fibre:</strong> IPA and lint-free wipe</li>
                <li><strong>3. Cleave fibre:</strong> Precision cleave to exact length specified</li>
                <li><strong>4. Insert fibre:</strong> Push into connector until seated</li>
                <li><strong>5. Engage lock:</strong> Activate cam or clamp mechanism</li>
                <li><strong>6. Inspect and test:</strong> Verify end face and loss</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Advantages</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Fast installation (2-5 min)</li>
                  <li>• No polishing equipment</li>
                  <li>• No epoxy handling</li>
                  <li>• Pre-tested ferrule</li>
                  <li>• Consistent results</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
                <h4 className="font-semibold text-orange-400 mb-2">Limitations</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Higher cost per connector</li>
                  <li>• Internal splice adds loss</li>
                  <li>• Critical cleave length</li>
                  <li>• Not re-terminable</li>
                  <li>• Gel can degrade</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Popular Products</h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>Corning Unicam:</strong> Widely used, available in all connector types</li>
                <li>• <strong>3M NPC:</strong> No-Polish Connector range</li>
                <li>• <strong>CommScope LightCrimp Plus:</strong> Mechanical crimp design</li>
                <li>• <strong>Senko UPC/APC:</strong> Various pre-polished options</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Epoxy and Polish */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-lg font-bold">02</span>
            </div>
            <h2 className="text-xl font-bold">Epoxy and Polish Connectorisation</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Traditional epoxy-polish termination bonds the fibre into the connector ferrule
              with epoxy, then polishes the end face to optical quality. Lower per-connector
              cost but requires more equipment and skill.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Equipment Required</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Connectors:</strong> Appropriate type for application (SC, LC, ST, etc.)</li>
                <li><strong>Epoxy:</strong> Two-part or heat-cure optical epoxy</li>
                <li><strong>Curing oven:</strong> For heat-cure epoxy (or wait for anaerobic cure)</li>
                <li><strong>Polishing films:</strong> Multiple grades (5μm, 3μm, 1μm, 0.3μm)</li>
                <li><strong>Polishing puck:</strong> Holds connector for polishing</li>
                <li><strong>Inspection microscope:</strong> Verify end face quality</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Installation Process</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Prepare connector:</strong> Attach boot and crimp ring to cable</li>
                <li><strong>2. Strip and clean fibre:</strong> Expose fibre for insertion</li>
                <li><strong>3. Mix/apply epoxy:</strong> Fill ferrule bore with epoxy</li>
                <li><strong>4. Insert fibre:</strong> Push through until protruding from ferrule</li>
                <li><strong>5. Crimp strain relief:</strong> Secure cable in connector body</li>
                <li><strong>6. Cure epoxy:</strong> Heat cure (minutes) or ambient (hours)</li>
                <li><strong>7. Scribe and break:</strong> Remove protruding fibre</li>
                <li><strong>8. Polish:</strong> Progressive grades to mirror finish</li>
                <li><strong>9. Inspect:</strong> Verify end face quality</li>
                <li><strong>10. Test:</strong> Measure insertion loss</li>
              </ol>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Polishing Sequence</h4>
              <p className="text-sm text-white/70 mb-2">
                Progressive polishing removes scratches from previous steps:
              </p>
              <ul className="text-sm text-white/60 space-y-1">
                <li>• <strong>5μm film:</strong> Remove excess epoxy and fibre</li>
                <li>• <strong>3μm film:</strong> Remove 5μm scratches</li>
                <li>• <strong>1μm film:</strong> Further refinement</li>
                <li>• <strong>0.3μm film:</strong> Final polish for mirror finish</li>
              </ul>
              <p className="text-xs text-white/50 mt-2">
                Use figure-8 motion, consistent pressure, 20-30 seconds per grade.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 3: Fusion Splice-On Connectors */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-lg font-bold">03</span>
            </div>
            <h2 className="text-xl font-bold">Fusion Splice-On Connectors</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Fusion splice-on connectors combine the low loss of fusion splicing with the
              convenience of a connector. A factory-terminated pigtail connector is fusion
              spliced to the field fibre.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-pink-400" />
                How They Work
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Factory connector:</strong> Pre-terminated, tested connector with short pigtail</li>
                <li><strong>Fusion splice:</strong> Field fibre spliced to pigtail</li>
                <li><strong>Integrated package:</strong> Splice protected within connector assembly</li>
                <li><strong>Result:</strong> Connector with fusion splice quality</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Installation Process</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Prepare both fibres:</strong> Strip, clean, and cleave</li>
                <li><strong>2. Load splice-on connector:</strong> Place pigtail in splicer holder</li>
                <li><strong>3. Load field fibre:</strong> Position in opposite holder</li>
                <li><strong>4. Perform fusion splice:</strong> Standard fusion procedure</li>
                <li><strong>5. Protect splice:</strong> Apply heat shrink if not integral</li>
                <li><strong>6. Assemble connector:</strong> Complete mechanical assembly</li>
                <li><strong>7. Test:</strong> Verify end face and loss</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Advantages</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Lowest total loss</li>
                  <li>• Factory connector quality</li>
                  <li>• Fusion splice reliability</li>
                  <li>• No field polishing</li>
                  <li>• Consistent results</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
                <h4 className="font-semibold text-orange-400 mb-2">Considerations</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Requires fusion splicer</li>
                  <li>• Higher cost per unit</li>
                  <li>• Specific holders needed</li>
                  <li>• Not field-repairable</li>
                  <li>• Longer than standard connector</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">When to Use</h4>
              <p className="text-sm text-white/80">
                Fusion splice-on connectors are ideal when you need connector convenience with
                fusion-splice quality. Perfect for data centres, high-density installations,
                and anywhere maximum performance matters. The additional cost is justified
                where loss budgets are tight.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: End Face Inspection */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-lg font-bold">04</span>
            </div>
            <h2 className="text-xl font-bold">End Face Inspection Criteria</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Inspecting the connector end face before testing catches defects that cause
              high loss or damage mating connectors. Use a fibre inspection microscope at
              200x or 400x magnification.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">IEC 61300-3-35 Zones</h4>
              <p className="text-sm text-white/60 mb-3">
                The standard defines zones on the end face with different cleanliness requirements:
              </p>
              <ul className="space-y-2 text-sm">
                <li><strong>Zone A (Core):</strong> No defects allowed in core area</li>
                <li><strong>Zone B (Cladding):</strong> Limited small scratches acceptable</li>
                <li><strong>Zone C (Adhesive):</strong> Some contamination may be acceptable</li>
                <li><strong>Zone D (Contact):</strong> Ferrule contact area - limited defects</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Common Defects</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-pink-300 font-medium mb-1">Contamination:</p>
                  <ul className="text-white/60 space-y-1">
                    <li>• Dust particles</li>
                    <li>• Oil/residue</li>
                    <li>• Dried fluids</li>
                    <li>• Solution: Clean and re-inspect</li>
                  </ul>
                </div>
                <div>
                  <p className="text-purple-300 font-medium mb-1">Physical Damage:</p>
                  <ul className="text-white/60 space-y-1">
                    <li>• Scratches</li>
                    <li>• Chips</li>
                    <li>• Cracks</li>
                    <li>• Solution: Re-terminate</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Critical Inspection Points
              </h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>Core area must be clean:</strong> Any defect here causes loss</li>
                <li>• <strong>No deep scratches:</strong> Can damage mating connector</li>
                <li>• <strong>Proper polish geometry:</strong> Flat or correctly domed</li>
                <li>• <strong>APC angle:</strong> Must show correct 8° face</li>
                <li>• <strong>Clean before inspection:</strong> Distinguish dirt from damage</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 5: Testing Requirements */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-lg font-bold">05</span>
            </div>
            <h2 className="text-xl font-bold">Testing Requirements</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Every field connector must be tested to verify it meets specifications. Testing
              catches installation errors before they cause system problems.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Test Parameters</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Insertion Loss (IL):</strong> Signal loss through connector, measured in dB</li>
                <li><strong>Return Loss (RL):</strong> Reflected signal level, higher is better</li>
                <li><strong>Visual inspection:</strong> End face quality verification</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Typical Specifications</h4>
              <div className="overflow-x-auto">
                <table className="text-sm w-full">
                  <thead>
                    <tr className="text-left border-b border-white/20">
                      <th className="pb-2 text-white/80">Parameter</th>
                      <th className="pb-2 text-white/80">UPC</th>
                      <th className="pb-2 text-white/80">APC</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    <tr className="border-b border-white/10">
                      <td className="py-2">Insertion Loss</td>
                      <td>&lt;0.3 dB typical</td>
                      <td>&lt;0.3 dB typical</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Max IL (spec)</td>
                      <td>&lt;0.5 dB</td>
                      <td>&lt;0.5 dB</td>
                    </tr>
                    <tr>
                      <td className="py-2">Return Loss</td>
                      <td>&gt;45 dB</td>
                      <td>&gt;60 dB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Test Equipment
              </h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• <strong>Optical power meter:</strong> Measures signal level for IL calculation</li>
                <li>• <strong>Light source:</strong> Calibrated reference source</li>
                <li>• <strong>OTDR:</strong> Can measure individual connector loss and location</li>
                <li>• <strong>Test cables:</strong> Reference-quality cables for measurement</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-2">Documentation</h4>
              <p className="text-sm text-white/70">
                Record for each connector: location/ID, connector type, test date, wavelength,
                measured IL and RL values, visual inspection result, and technician ID.
                Failed connectors should be re-terminated and re-tested.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Method Selection */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-lg font-bold">06</span>
            </div>
            <h2 className="text-xl font-bold">Method Selection Guide</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Choosing the right connectorisation method depends on your specific requirements,
              available equipment, and skill level.
            </p>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Decision Matrix</h4>
              <div className="overflow-x-auto">
                <table className="text-sm w-full">
                  <thead>
                    <tr className="text-left border-b border-white/20">
                      <th className="pb-2 text-white/80">Factor</th>
                      <th className="pb-2 text-pink-300">Pre-Polish</th>
                      <th className="pb-2 text-purple-300">Epoxy</th>
                      <th className="pb-2 text-cyan-300">Splice-On</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    <tr className="border-b border-white/10">
                      <td className="py-2">Install time</td>
                      <td>5 min</td>
                      <td>30 min</td>
                      <td>10 min</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Equipment cost</td>
                      <td>Low</td>
                      <td>Medium</td>
                      <td>High</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Per-connector cost</td>
                      <td>High</td>
                      <td>Low</td>
                      <td>Medium</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Skill required</td>
                      <td>Low</td>
                      <td>High</td>
                      <td>Medium</td>
                    </tr>
                    <tr>
                      <td className="py-2">Loss typical</td>
                      <td>0.2-0.4 dB</td>
                      <td>0.1-0.3 dB</td>
                      <td>&lt;0.15 dB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-pink-400 mb-2">Use Pre-Polished When:</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Speed is priority</li>
                  <li>• Low volume work</li>
                  <li>• Minimal equipment available</li>
                  <li>• Limited skill/training</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-purple-400 mb-2">Use Epoxy-Polish When:</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• High volume terminations</li>
                  <li>• Cost per connector matters</li>
                  <li>• Skilled technicians available</li>
                  <li>• Equipment investment justified</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-cyan-400 mb-2">Use Fusion Splice-On When:</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Lowest loss essential</li>
                  <li>• Fusion splicer available</li>
                  <li>• High reliability required</li>
                  <li>• Data centre/critical infrastructure</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Practical Guidance</h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Best Practices</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Clean first, always:</strong> Inspect end face before and after cleaning</li>
                <li>• <strong>Follow specifications:</strong> Use exact strip and cleave lengths</li>
                <li>• <strong>Test every connector:</strong> No exceptions - catch problems early</li>
                <li>• <strong>Document results:</strong> Maintain records for handover</li>
                <li>• <strong>Practice technique:</strong> Skill improves with experience</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Common Mistakes</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Skipping inspection:</strong> Installing contaminated connectors</li>
                <li>• <strong>Wrong cleave length:</strong> Causes incomplete seating or stress</li>
                <li>• <strong>Inadequate polishing:</strong> Scratched end face causes loss</li>
                <li>• <strong>Mixing polish types:</strong> APC and UPC are NOT interchangeable</li>
                <li>• <strong>Rushing:</strong> Quality suffers when you skip steps</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
              <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Troubleshooting High Loss
              </h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Clean and retest:</strong> Contamination is most common cause</li>
                <li>• <strong>Check end face:</strong> Inspect for damage under microscope</li>
                <li>• <strong>Verify insertion:</strong> Connector fully seated?</li>
                <li>• <strong>Check cleave:</strong> Was cleave quality good?</li>
                <li>• <strong>Re-terminate if needed:</strong> Don't accept marginal connectors</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  className="w-full px-4 py-3 flex items-center justify-between text-left min-h-[44px] touch-manipulation"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-sm font-medium text-white/90">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/60 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-3">
                    <p className="text-sm text-white/70">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-5 border border-purple-500/30">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-purple-400" />
              Quick Reference: Field Connectorisation
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-pink-300 mb-2">Methods</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>• Pre-polished: Fast, no polish</li>
                  <li>• Epoxy-polish: Low cost/unit</li>
                  <li>• Splice-on: Lowest loss</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Always Do</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>☐ Inspect end face</li>
                  <li>☐ Test insertion loss</li>
                  <li>☐ Document results</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                Targets: IL &lt;0.5 dB (typical &lt;0.3) | RL &gt;45 dB (UPC), &gt;60 dB (APC)
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Section Quiz"
            questions={quizQuestions}
            onComplete={(score, total) => {
              console.log(`Quiz completed: ${score}/${total}`);
            }}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module4/section3"
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto gap-2 text-white/70 hover:text-white min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Splicing Equipment Overview
            </Button>
          </Link>
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module4/section5"
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
            >
              Next: Inspection and Cleaning Tools
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule4Section4;
