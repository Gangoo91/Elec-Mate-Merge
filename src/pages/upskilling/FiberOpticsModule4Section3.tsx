import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, ChevronDown, Settings, Monitor, Battery, Cpu, BookOpen, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Splicing Equipment Overview - Fiber Optics Technology";
const DESCRIPTION = "Learn about fusion splicers, cleavers, and essential tools for fibre optic splicing. Understand equipment features, selection criteria, and maintenance requirements.";

const quickCheckQuestions = [
  {
    id: "equipment-qc1",
    question: "What is the key difference between core alignment and clad alignment splicers?",
    options: [
      "Core alignment is cheaper",
      "Core alignment directly views and aligns fibre cores",
      "Clad alignment is more accurate",
      "They produce the same results"
    ],
    correctIndex: 1,
    explanation: "Core alignment splicers use cameras to directly view and align the fibre cores, producing lower loss splices especially on singlemode fibre. Clad alignment only aligns the outer cladding."
  },
  {
    id: "equipment-qc2",
    question: "What component needs regular replacement in a fusion splicer?",
    options: [
      "The display screen",
      "The fibre clamps",
      "The electrodes",
      "The camera"
    ],
    correctIndex: 2,
    explanation: "Electrodes wear with use and need replacement typically every 2,000-5,000 splices. Worn electrodes produce inconsistent arcs and poor splice quality."
  },
  {
    id: "equipment-qc3",
    question: "Why is a precision cleaver essential for fusion splicing?",
    options: [
      "It's faster than basic cleavers",
      "Fusion requires cleave angles under 1 degree",
      "It's required by regulations",
      "Basic cleavers don't work on fibre"
    ],
    correctIndex: 1,
    explanation: "Fusion splicing requires cleave angles under 1° for quality splices. Precision cleavers consistently achieve this accuracy; basic cleavers cannot."
  }
];

const quizQuestions = [
  {
    question: "What is the typical splice time for a modern fusion splicer?",
    options: [
      "1-2 minutes",
      "6-10 seconds",
      "30 seconds",
      "2-3 minutes"
    ],
    correctAnswer: 1
  },
  {
    question: "What does the heat shrink oven on a fusion splicer do?",
    options: [
      "Heats the electrodes",
      "Shrinks splice protection sleeves",
      "Warms the fibre before splicing",
      "Dries the splice point"
    ],
    correctAnswer: 1
  },
  {
    question: "What type of splicer is recommended for singlemode backbone work?",
    options: [
      "Any type is suitable",
      "Clad alignment",
      "Core alignment",
      "Mechanical only"
    ],
    correctAnswer: 2
  },
  {
    question: "How often should fusion splicer electrodes be replaced?",
    options: [
      "Every 100 splices",
      "Every 2,000-5,000 splices",
      "Annually only",
      "When they break"
    ],
    correctAnswer: 1
  },
  {
    question: "What is an arc calibration?",
    options: [
      "Adjusting electrode gap",
      "Automatic adjustment of arc power for conditions",
      "Replacing electrodes",
      "Cleaning the splicer"
    ],
    correctAnswer: 1
  },
  {
    question: "What should be checked before using a rental fusion splicer?",
    options: [
      "Nothing - rentals are pre-checked",
      "Electrode life, calibration date, included accessories",
      "Colour only",
      "Brand name"
    ],
    correctAnswer: 1
  },
  {
    question: "What power options do field fusion splicers typically offer?",
    options: [
      "Mains only",
      "Battery only",
      "Mains, battery, and often DC (vehicle)",
      "Generator only"
    ],
    correctAnswer: 2
  },
  {
    question: "What is the purpose of the fibre holder/clamps in a splicer?",
    options: [
      "Decoration",
      "Securely position fibres during alignment and fusion",
      "Measure fibre diameter",
      "Strip the coating"
    ],
    correctAnswer: 1
  },
  {
    question: "How should a fusion splicer be stored?",
    options: [
      "In any convenient location",
      "In protective case, electrodes removed, climate controlled",
      "Standing upright only",
      "In direct sunlight"
    ],
    correctAnswer: 1
  },
  {
    question: "What does 'estimated splice loss' displayed by the splicer indicate?",
    options: [
      "Guaranteed actual loss",
      "Calculated loss based on alignment geometry",
      "Maximum possible loss",
      "Testing result from OTDR"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "How do I choose between different splicer brands?",
    answer: "Consider: reliability record, local service/support availability, spare parts accessibility, training availability, and compatibility with your organisation's existing equipment. Major brands (Fujikura, Sumitomo, FITEL) all produce quality equipment. Try before buying if possible, and check user reviews from similar applications."
  },
  {
    question: "Is it better to buy or rent a fusion splicer?",
    answer: "Depends on usage volume. Regular use (monthly or more) usually justifies purchase. Occasional use (few times yearly) often favours rental. Consider: purchase price (£3,000-30,000+), maintenance costs, calibration requirements, and training. Rental provides access to maintained equipment without capital investment."
  },
  {
    question: "Can one splicer handle all fibre types?",
    answer: "Most modern splicers handle standard singlemode and multimode fibres. However, specialty fibres (polarisation maintaining, erbium-doped, etc.) may need specific models with appropriate programs. Check splicer specifications match your fibre types. Ribbon splicers are needed for mass fusion of ribbon cables."
  },
  {
    question: "How important is the splice loss estimation accuracy?",
    answer: "The displayed estimate is based on alignment geometry, not actual optical measurement. It's a good indicator but not definitive. Always verify with OTDR or power meter testing. If estimated loss is high, consider re-splicing. Modern splicers are quite accurate, but actual loss can vary from estimate."
  },
  {
    question: "What maintenance can I do versus what needs the manufacturer?",
    answer: "User maintenance: electrode replacement, cleaning V-grooves and mirrors, cleaning fibre clamps, updating software. Manufacturer service: calibration verification, internal repairs, electrode gap adjustment, major component replacement. Follow the manufacturer's maintenance schedule and keep service records."
  },
  {
    question: "Do I need different cleavers for different fibres?",
    answer: "A quality precision cleaver handles most standard fibres (singlemode, multimode, various coating diameters). However, ribbon cleavers are needed for ribbon fibre, and specialty fibres may have specific requirements. Ensure your cleaver can handle your fibre coating diameter (250μm, 900μm) and has appropriate blade settings."
  }
];

const FiberOpticsModule4Section3 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
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
          <span className="text-xs text-white/40 hidden sm:block">Section 3 of 5</span>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4 max-w-4xl mx-auto">
        {/* Module Number Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-elec-yellow">
            <Settings className="w-4 h-4" />
            Module 4 · Section 3
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Splicing Equipment Overview
        </h1>

        {/* Quick Summary Card */}
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-5 border border-cyan-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Fusion splicing requires specialised equipment: the fusion splicer (core or clad alignment),
            precision cleaver, stripping tools, and test equipment. Core alignment splicers produce
            lowest loss splices and are essential for singlemode work. Regular maintenance including
            electrode replacement and calibration ensures consistent results.
          </p>
        </div>

        {/* Spot it / Use it Card */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-5 border border-blue-500/20 mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-blue-400 mb-2">Essential Equipment</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Fusion splicer</li>
                <li>• Precision cleaver</li>
                <li>• Fibre strippers</li>
                <li>• Cleaning supplies</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 mb-2">Support Equipment</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• OTDR or power meter</li>
                <li>• Splice protectors</li>
                <li>• Spare electrodes</li>
                <li>• Fibre holders</li>
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
              "Fusion splicer types and features",
              "Cleaver types and selection",
              "Supporting tools and accessories",
              "Equipment selection criteria",
              "Maintenance requirements",
              "Cost and rental considerations"
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

        {/* Section 1: Fusion Splicer Types */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-lg font-bold">01</span>
            </div>
            <h2 className="text-xl font-bold">Fusion Splicer Types</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Fusion splicers vary significantly in capability and cost. Understanding the
              differences helps select the right equipment for your application.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Core Alignment Splicers
              </h4>
              <p className="text-sm mb-2">
                Uses cameras to directly view and align the fibre cores before splicing.
              </p>
              <ul className="text-sm text-white/60 space-y-1">
                <li>• <strong>Best splice quality:</strong> Typical loss &lt;0.02 dB</li>
                <li>• <strong>Essential for singlemode:</strong> Core alignment critical for SM</li>
                <li>• <strong>Automatic alignment:</strong> Active core positioning</li>
                <li>• <strong>Higher cost:</strong> £5,000-30,000+</li>
                <li>• <strong>Applications:</strong> Backbone, telecommunications, data centres</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-blue-400 mb-3">Clad Alignment Splicers</h4>
              <p className="text-sm mb-2">
                Aligns the outer cladding surface rather than the core directly.
              </p>
              <ul className="text-sm text-white/60 space-y-1">
                <li>• <strong>Good for multimode:</strong> Large cores more tolerant</li>
                <li>• <strong>Lower cost:</strong> £3,000-8,000</li>
                <li>• <strong>Simpler optics:</strong> Fewer cameras, less complex</li>
                <li>• <strong>Higher SM loss:</strong> Relies on core-clad concentricity</li>
                <li>• <strong>Applications:</strong> Multimode, FTTH, basic installations</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Comparison Summary</h4>
              <div className="overflow-x-auto">
                <table className="text-sm w-full">
                  <thead>
                    <tr className="text-left border-b border-white/20">
                      <th className="pb-2 text-white/80">Feature</th>
                      <th className="pb-2 text-cyan-300">Core Alignment</th>
                      <th className="pb-2 text-blue-300">Clad Alignment</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    <tr className="border-b border-white/10">
                      <td className="py-2">SM splice loss</td>
                      <td>&lt;0.02 dB typical</td>
                      <td>0.05-0.1 dB typical</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">MM splice loss</td>
                      <td>&lt;0.01 dB</td>
                      <td>&lt;0.02 dB</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Cost range</td>
                      <td>£5,000-30,000+</td>
                      <td>£3,000-8,000</td>
                    </tr>
                    <tr>
                      <td className="py-2">Best for</td>
                      <td>SM backbone, telco</td>
                      <td>MM, FTTH, basic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Ribbon Splicers</h4>
              <p className="text-sm text-white/80">
                Specialised splicers for ribbon fibre can splice 4, 8, 12, or 24 fibres
                simultaneously. Much faster for high-count cables but significantly more
                expensive (£15,000-50,000+). Essential for telecommunications backbone work
                with ribbon cables.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Splicer Features */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-lg font-bold">02</span>
            </div>
            <h2 className="text-xl font-bold">Key Splicer Features</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Understanding splicer features helps you use the equipment effectively and
              select appropriate models for your needs.
            </p>

            <div className="grid gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  Display and Interface
                </h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• <strong>LCD/LED display:</strong> Shows fibre view, alignment, and settings</li>
                  <li>• <strong>Touch screen:</strong> Common on modern units for easy navigation</li>
                  <li>• <strong>Multiple views:</strong> X and Y axis views for alignment verification</li>
                  <li>• <strong>Result display:</strong> Estimated loss, cleave angle, splice image</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Battery className="w-4 h-4 text-green-400" />
                  Power Options
                </h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• <strong>Battery:</strong> Typically 100-300 splices per charge</li>
                  <li>• <strong>Mains AC:</strong> For workshop/office use</li>
                  <li>• <strong>DC input:</strong> 12V vehicle connection for field work</li>
                  <li>• <strong>Hot-swap:</strong> Some models allow battery changes without shutdown</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Heat Shrink Oven</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• <strong>Built-in heater:</strong> Shrinks protection sleeves after splicing</li>
                  <li>• <strong>Multiple positions:</strong> Heat next sleeve while splicing</li>
                  <li>• <strong>Cycle time:</strong> Typically 20-40 seconds</li>
                  <li>• <strong>Temperature settings:</strong> Adjustable for different sleeve types</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Automatic Functions</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• <strong>Arc calibration:</strong> Adjusts arc power for temperature/pressure/humidity</li>
                <li>• <strong>Fibre identification:</strong> Recognises SM/MM and selects appropriate program</li>
                <li>• <strong>Auto-focus:</strong> Camera focus adjustment</li>
                <li>• <strong>Loss estimation:</strong> Calculates expected splice loss from alignment</li>
                <li>• <strong>Proof test:</strong> Applies tension to verify splice strength (optional)</li>
              </ul>
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

        {/* Section 3: Cleavers and Strippers */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-lg font-bold">03</span>
            </div>
            <h2 className="text-xl font-bold">Cleavers and Stripping Tools</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Cleavers and strippers are as important as the splicer itself. Quality preparation
              tools are essential for consistent splice results.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Precision Cleavers</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Purpose:</strong> Create flat, perpendicular fibre end face</li>
                <li><strong>Blade:</strong> Diamond or tungsten carbide, multiple positions</li>
                <li><strong>Angle specification:</strong> Must achieve &lt;1° consistently</li>
                <li><strong>Price range:</strong> £200-2,000 depending on quality</li>
                <li><strong>Blade life:</strong> 10,000-20,000 cleaves with position rotation</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-cyan-400 mb-2">Automatic Cleavers</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Consistent tension application</li>
                  <li>• Push-button operation</li>
                  <li>• Higher cost (£500-2000+)</li>
                  <li>• Best for production work</li>
                  <li>• Less technique-dependent</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-blue-400 mb-2">Manual Cleavers</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• User applies tension</li>
                  <li>• Requires good technique</li>
                  <li>• Lower cost (£100-500)</li>
                  <li>• Portable and simple</li>
                  <li>• Good for occasional use</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Stripping Tools</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-cyan-300 font-medium">Mechanical Strippers</p>
                  <p className="text-white/60">Fixed or adjustable holes for different coating diameters. Common types: CFS-2 style, Ripley Miller, Jonard.</p>
                </div>
                <div>
                  <p className="text-blue-300 font-medium">Thermal Strippers</p>
                  <p className="text-white/60">Heated element softens coating for clean removal. Reduces fibre stress. Good for 250μm coated fibre.</p>
                </div>
                <div>
                  <p className="text-purple-300 font-medium">Jacket Strippers</p>
                  <p className="text-white/60">For removing outer cable jackets. Different tools for different jacket sizes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Support Equipment */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-lg font-bold">04</span>
            </div>
            <h2 className="text-xl font-bold">Support Equipment and Accessories</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Beyond the core splicing equipment, various accessories and support items are
              needed for effective splicing operations.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Essential Accessories</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Fibre holders:</strong> Match splicer model, various coating diameters</li>
                <li><strong>Splice protectors:</strong> Heat shrink sleeves, 40mm/60mm lengths</li>
                <li><strong>Electrodes:</strong> Spare pairs for replacement (consumable)</li>
                <li><strong>Cleaning supplies:</strong> IPA, lint-free wipes, cleaning sticks</li>
                <li><strong>Carrying case:</strong> Protection for transport and storage</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-green-400 mb-2">Test Equipment</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• OTDR for splice verification</li>
                  <li>• Power meter and source</li>
                  <li>• Visual fault locator</li>
                  <li>• Fibre inspection microscope</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="font-semibold text-yellow-400 mb-2">Field Accessories</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• Work mat/tray</li>
                  <li>• Headlamp or work light</li>
                  <li>• Sharps container</li>
                  <li>• Cable preparation tools</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Splice Protectors</h4>
              <p className="text-sm text-white/80 mb-2">
                Heat shrink splice protectors are essential consumables:
              </p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• <strong>40mm:</strong> Standard length for most splices</li>
                <li>• <strong>60mm:</strong> For longer stripped sections or difficult routing</li>
                <li>• <strong>Strength member:</strong> Steel rod inside for mechanical protection</li>
                <li>• <strong>Mini sleeves:</strong> For compact splice trays</li>
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

        {/* Section 5: Maintenance */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-lg font-bold">05</span>
            </div>
            <h2 className="text-xl font-bold">Equipment Maintenance</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Regular maintenance ensures consistent splice quality and extends equipment life.
              Follow manufacturer recommendations for specific procedures.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyan-400" />
                Daily/Regular Maintenance
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>V-groove cleaning:</strong> Clean with cotton swab and IPA after each session</li>
                <li><strong>Mirror/lens cleaning:</strong> Clean viewing optics as needed</li>
                <li><strong>Electrode check:</strong> Inspect for wear, clean if contaminated</li>
                <li><strong>Fibre clamp cleaning:</strong> Remove debris from holder surfaces</li>
                <li><strong>Arc calibration:</strong> Run auto-calibration before splicing</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Electrode Management</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Life cycle:</strong> Typically 2,000-5,000 splices per pair</li>
                <li><strong>Signs of wear:</strong> Inconsistent arcs, high loss splices, visible pitting</li>
                <li><strong>Replacement:</strong> Follow manufacturer procedure, re-calibrate after</li>
                <li><strong>Stock spares:</strong> Always have replacement electrodes available</li>
                <li><strong>Track usage:</strong> Record splice count for replacement scheduling</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">User Maintenance</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Daily cleaning</li>
                  <li>• Electrode replacement</li>
                  <li>• Arc calibration</li>
                  <li>• Software updates</li>
                  <li>• Battery care</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
                <h4 className="font-semibold text-orange-400 mb-2">Service Centre</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>• Annual calibration</li>
                  <li>• Internal cleaning</li>
                  <li>• Component replacement</li>
                  <li>• Electrode gap adjustment</li>
                  <li>• Major repairs</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Cleaver Maintenance
              </h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• Rotate blade to fresh position when quality degrades</li>
                <li>• Track blade position and usage</li>
                <li>• Clean blade with IPA if contaminated</li>
                <li>• Replace rubber pads when worn</li>
                <li>• Store in protective case</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Equipment Selection and Costs */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-lg font-bold">06</span>
            </div>
            <h2 className="text-xl font-bold">Selection and Cost Considerations</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Selecting the right equipment involves balancing performance requirements,
              budget, and operational needs.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Selection Criteria</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Fibre types:</strong> SM only, MM only, or both? Ribbon capability needed?</li>
                <li><strong>Quality requirements:</strong> Backbone (core alignment) vs distribution (clad OK)</li>
                <li><strong>Volume:</strong> Occasional use vs daily production</li>
                <li><strong>Environment:</strong> Workshop, field, or both?</li>
                <li><strong>Support:</strong> Local service availability, training, spare parts</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Typical Equipment Costs (2024)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/70">Core alignment splicer</span>
                  <span className="text-cyan-300">£5,000-30,000+</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/70">Clad alignment splicer</span>
                  <span className="text-blue-300">£3,000-8,000</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/70">Precision cleaver</span>
                  <span className="text-purple-300">£200-2,000</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/70">Complete kit (splicer + cleaver + tools)</span>
                  <span className="text-green-300">£4,000-35,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Rental (daily/weekly)</span>
                  <span className="text-yellow-300">£50-200/day</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-2">Buy vs Rent Guidance</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-cyan-300 font-medium mb-1">Consider Buying:</p>
                  <ul className="text-white/60 space-y-1">
                    <li>• Regular use (monthly+)</li>
                    <li>• Specific model required</li>
                    <li>• Capital budget available</li>
                    <li>• In-house maintenance capability</li>
                  </ul>
                </div>
                <div>
                  <p className="text-blue-300 font-medium mb-1">Consider Renting:</p>
                  <ul className="text-white/60 space-y-1">
                    <li>• Occasional projects</li>
                    <li>• Trial before purchase</li>
                    <li>• Budget constraints</li>
                    <li>• Access to latest models</li>
                  </ul>
                </div>
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
                <li>• <strong>Match equipment to application:</strong> Don't overspend or underspend</li>
                <li>• <strong>Invest in training:</strong> Equipment is only as good as the operator</li>
                <li>• <strong>Maintain regularly:</strong> Prevents problems and extends equipment life</li>
                <li>• <strong>Keep spares:</strong> Electrodes, protectors, cleaning supplies always on hand</li>
                <li>• <strong>Document everything:</strong> Track maintenance, calibration, and usage</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Common Mistakes</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Skipping calibration:</strong> Arc calibration should be run before each session</li>
                <li>• <strong>Using worn electrodes:</strong> Causes inconsistent results and re-work</li>
                <li>• <strong>Poor cleaver maintenance:</strong> Leads to poor cleaves and splice failures</li>
                <li>• <strong>Ignoring V-groove cleaning:</strong> Contaminated grooves cause alignment errors</li>
                <li>• <strong>Storing improperly:</strong> Dust and moisture damage sensitive components</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Field Work Tips</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• <strong>Check battery:</strong> Ensure sufficient charge before starting</li>
                <li>• <strong>Run calibration:</strong> Environmental conditions affect arc parameters</li>
                <li>• <strong>Protect from dust:</strong> Use wind shields and clean work area</li>
                <li>• <strong>Have backup power:</strong> Vehicle DC adapter or spare battery</li>
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
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-5 border border-cyan-500/30">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-cyan-400" />
              Quick Reference: Splicing Equipment
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 mb-2">Core Equipment</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>• Fusion splicer (core/clad align)</li>
                  <li>• Precision cleaver (&lt;1° angle)</li>
                  <li>• Fibre strippers (250/900μm)</li>
                  <li>• Cleaning supplies (IPA, wipes)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-300 mb-2">Maintenance Items</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>• Electrodes (2000-5000 splice life)</li>
                  <li>• Cleave blade positions</li>
                  <li>• V-groove cleaning sticks</li>
                  <li>• Annual calibration service</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                Key: Core alignment for SM backbone work | Clean and calibrate before each session
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
            to="/apprentice/study-centre/upskilling/fiber-optics/module4/section2"
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto gap-2 text-white/70 hover:text-white min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Cleaving and Fibre Prep
            </Button>
          </Link>
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module4/section4"
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
            >
              Next: Connectorisation Techniques
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule4Section3;
