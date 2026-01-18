import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Splicing Equipment Overview - Fibre Optics Technology";
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
      "It is faster than basic cleavers",
      "Fusion requires cleave angles under 1 degree",
      "It is required by regulations",
      "Basic cleavers do not work on fibre"
    ],
    correctIndex: 1,
    explanation: "Fusion splicing requires cleave angles under 1 degree for quality splices. Precision cleavers consistently achieve this accuracy; basic cleavers cannot."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical splice time for a modern fusion splicer?",
    options: [
      "1-2 minutes",
      "6-10 seconds",
      "30 seconds",
      "2-3 minutes"
    ],
    correctAnswer: 1,
    explanation: "Modern fusion splicers complete a splice in 6-10 seconds, with some high-end models even faster."
  },
  {
    id: 2,
    question: "What does the heat shrink oven on a fusion splicer do?",
    options: [
      "Heats the electrodes",
      "Shrinks splice protection sleeves",
      "Warms the fibre before splicing",
      "Dries the splice point"
    ],
    correctAnswer: 1,
    explanation: "The heat shrink oven applies heat to protection sleeves placed over the splice, shrinking them to protect the bare fibre."
  },
  {
    id: 3,
    question: "What type of splicer is recommended for singlemode backbone work?",
    options: [
      "Any type is suitable",
      "Clad alignment",
      "Core alignment",
      "Mechanical only"
    ],
    correctAnswer: 2,
    explanation: "Core alignment splicers are essential for singlemode backbone work where low splice loss is critical."
  },
  {
    id: 4,
    question: "How often should fusion splicer electrodes be replaced?",
    options: [
      "Every 100 splices",
      "Every 2,000-5,000 splices",
      "Annually only",
      "When they break"
    ],
    correctAnswer: 1,
    explanation: "Electrodes typically last 2,000-5,000 splices. Track splice count and replace before quality degrades."
  },
  {
    id: 5,
    question: "What is an arc calibration?",
    options: [
      "Adjusting electrode gap",
      "Automatic adjustment of arc power for conditions",
      "Replacing electrodes",
      "Cleaning the splicer"
    ],
    correctAnswer: 1,
    explanation: "Arc calibration automatically adjusts the arc power to compensate for temperature, pressure, and humidity changes."
  },
  {
    id: 6,
    question: "What should be checked before using a rental fusion splicer?",
    options: [
      "Nothing - rentals are pre-checked",
      "Electrode life, calibration date, included accessories",
      "Colour only",
      "Brand name"
    ],
    correctAnswer: 1,
    explanation: "Always verify electrode condition, recent calibration, and that all needed accessories are included with rental equipment."
  },
  {
    id: 7,
    question: "What power options do field fusion splicers typically offer?",
    options: [
      "Mains only",
      "Battery only",
      "Mains, battery, and often DC (vehicle)",
      "Generator only"
    ],
    correctAnswer: 2,
    explanation: "Field splicers typically support multiple power options: mains AC, battery, and 12V DC for vehicle operation."
  },
  {
    id: 8,
    question: "What is the purpose of the fibre holder/clamps in a splicer?",
    options: [
      "Decoration",
      "Securely position fibres during alignment and fusion",
      "Measure fibre diameter",
      "Strip the coating"
    ],
    correctAnswer: 1,
    explanation: "Fibre holders securely position the fibres for precise alignment and stable fusion. Different holders match different fibre types."
  },
  {
    id: 9,
    question: "How should a fusion splicer be stored?",
    options: [
      "In any convenient location",
      "In protective case, electrodes removed, climate controlled",
      "Standing upright only",
      "In direct sunlight"
    ],
    correctAnswer: 1,
    explanation: "Store splicers in their protective case, in a climate-controlled environment. Some manufacturers recommend removing electrodes for long-term storage."
  },
  {
    id: 10,
    question: "What does 'estimated splice loss' displayed by the splicer indicate?",
    options: [
      "Guaranteed actual loss",
      "Calculated loss based on alignment geometry",
      "Maximum possible loss",
      "Testing result from OTDR"
    ],
    correctAnswer: 1,
    explanation: "The estimated loss is calculated from alignment geometry, not actual optical measurement. Always verify with OTDR or power meter testing."
  }
];

const faqs = [
  {
    question: "How do I choose between different splicer brands?",
    answer: "Consider: reliability record, local service/support availability, spare parts accessibility, training availability, and compatibility with your organisation's existing equipment. Major brands (Fujikura, Sumitomo, FITEL) all produce quality equipment. Try before buying if possible, and check user reviews from similar applications."
  },
  {
    question: "Is it better to buy or rent a fusion splicer?",
    answer: "Depends on usage volume. Regular use (monthly or more) usually justifies purchase. Occasional use (few times yearly) often favours rental. Consider: purchase price (3,000-30,000 pounds+), maintenance costs, calibration requirements, and training. Rental provides access to maintained equipment without capital investment."
  },
  {
    question: "Can one splicer handle all fibre types?",
    answer: "Most modern splicers handle standard singlemode and multimode fibres. However, specialty fibres (polarisation maintaining, erbium-doped, etc.) may need specific models with appropriate programmes. Check splicer specifications match your fibre types. Ribbon splicers are needed for mass fusion of ribbon cables."
  },
  {
    question: "How important is the splice loss estimation accuracy?",
    answer: "The displayed estimate is based on alignment geometry, not actual optical measurement. It is a good indicator but not definitive. Always verify with OTDR or power meter testing. If estimated loss is high, consider re-splicing. Modern splicers are quite accurate, but actual loss can vary from estimate."
  },
  {
    question: "What maintenance can I do versus what needs the manufacturer?",
    answer: "User maintenance: electrode replacement, cleaning V-grooves and mirrors, cleaning fibre clamps, updating software. Manufacturer service: calibration verification, internal repairs, electrode gap adjustment, major component replacement. Follow the manufacturer's maintenance schedule and keep service records."
  },
  {
    question: "Do I need different cleavers for different fibres?",
    answer: "A quality precision cleaver handles most standard fibres (singlemode, multimode, various coating diameters). However, ribbon cleavers are needed for ribbon fibre, and specialty fibres may have specific requirements. Ensure your cleaver can handle your fibre coating diameter (250 micrometre, 900 micrometre) and has appropriate blade settings."
  }
];

const FiberOpticsModule4Section3 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
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
            <span>Module 4 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Splicing Equipment Overview
          </h1>
          <p className="text-white/80">
            Understanding fusion splicers, cleavers, and essential tools
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Core vs Clad:</strong> Core alignment for lowest loss</li>
              <li><strong>Electrodes:</strong> Replace every 2,000-5,000 splices</li>
              <li><strong>Calibration:</strong> Run before each session</li>
              <li><strong>Investment:</strong> 3,000-30,000 pounds+</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Electrode wear, inconsistent splices</li>
              <li><strong>Use:</strong> Core alignment for SM backbone</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Fusion splicer types and features",
              "Cleaver types and selection",
              "Supporting tools and accessories",
              "Equipment selection criteria",
              "Maintenance requirements",
              "Cost and rental considerations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Fusion Splicer Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fusion Splicer Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fusion splicers vary significantly in capability and cost. Understanding the
              differences helps select the right equipment for your application.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Core Alignment Splicers</p>
              <p className="text-sm text-white mb-2">
                Uses cameras to directly view and align the fibre cores before splicing.
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Best splice quality:</strong> Typical loss under 0.02 dB</li>
                <li><strong>Essential for singlemode:</strong> Core alignment critical for SM</li>
                <li><strong>Automatic alignment:</strong> Active core positioning</li>
                <li><strong>Higher cost:</strong> 5,000-30,000 pounds+</li>
                <li><strong>Applications:</strong> Backbone, telecommunications, data centres</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Clad Alignment Splicers</p>
              <p className="text-sm text-white mb-2">
                Aligns the outer cladding surface rather than the core directly.
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Good for multimode:</strong> Large cores more tolerant</li>
                <li><strong>Lower cost:</strong> 3,000-8,000 pounds</li>
                <li><strong>Simpler optics:</strong> Fewer cameras, less complex</li>
                <li><strong>Higher SM loss:</strong> Relies on core-clad concentricity</li>
                <li><strong>Applications:</strong> Multimode, FTTH, basic installations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Comparison Summary:</p>
              <div className="overflow-x-auto">
                <table className="text-sm w-full border-collapse">
                  <thead>
                    <tr className="text-left border-b border-white/20">
                      <th className="pb-2 text-white pr-4">Feature</th>
                      <th className="pb-2 text-elec-yellow pr-4">Core Alignment</th>
                      <th className="pb-2 text-white">Clad Alignment</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">SM splice loss</td>
                      <td className="pr-4">Under 0.02 dB typical</td>
                      <td>0.05-0.1 dB typical</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">MM splice loss</td>
                      <td className="pr-4">Under 0.01 dB</td>
                      <td>Under 0.02 dB</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4">Cost range</td>
                      <td className="pr-4">5,000-30,000 pounds+</td>
                      <td>3,000-8,000 pounds</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Best for</td>
                      <td className="pr-4">SM backbone, telco</td>
                      <td>MM, FTTH, basic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Ribbon Splicers</p>
              <p className="text-sm text-white">
                Specialised splicers for ribbon fibre can splice 4, 8, 12, or 24 fibres
                simultaneously. Much faster for high-count cables but significantly more
                expensive (15,000-50,000 pounds+). Essential for telecommunications backbone work
                with ribbon cables.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Key Splicer Features */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Key Splicer Features
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding splicer features helps you use the equipment effectively and
              select appropriate models for your needs.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Display and Interface:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>LCD/LED display:</strong> Shows fibre view, alignment, and settings</li>
                <li><strong>Touch screen:</strong> Common on modern units for easy navigation</li>
                <li><strong>Multiple views:</strong> X and Y axis views for alignment verification</li>
                <li><strong>Result display:</strong> Estimated loss, cleave angle, splice image</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Power Options:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Battery:</strong> Typically 100-300 splices per charge</li>
                <li><strong>Mains AC:</strong> For workshop/office use</li>
                <li><strong>DC input:</strong> 12V vehicle connection for field work</li>
                <li><strong>Hot-swap:</strong> Some models allow battery changes without shutdown</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Heat Shrink Oven:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Built-in heater:</strong> Shrinks protection sleeves after splicing</li>
                <li><strong>Multiple positions:</strong> Heat next sleeve while splicing</li>
                <li><strong>Cycle time:</strong> Typically 20-40 seconds</li>
                <li><strong>Temperature settings:</strong> Adjustable for different sleeve types</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Automatic Functions</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Arc calibration:</strong> Adjusts arc power for temperature/pressure/humidity</li>
                <li><strong>Fibre identification:</strong> Recognises SM/MM and selects appropriate programme</li>
                <li><strong>Auto-focus:</strong> Camera focus adjustment</li>
                <li><strong>Loss estimation:</strong> Calculates expected splice loss from alignment</li>
                <li><strong>Proof test:</strong> Applies tension to verify splice strength (optional)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03: Cleavers and Stripping Tools */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cleavers and Stripping Tools
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cleavers and strippers are as important as the splicer itself. Quality preparation
              tools are essential for consistent splice results.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Precision Cleavers:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Purpose:</strong> Create flat, perpendicular fibre end face</li>
                <li><strong>Blade:</strong> Diamond or tungsten carbide, multiple positions</li>
                <li><strong>Angle specification:</strong> Must achieve under 1 degree consistently</li>
                <li><strong>Price range:</strong> 200-2,000 pounds depending on quality</li>
                <li><strong>Blade life:</strong> 10,000-20,000 cleaves with position rotation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cleaver Types:</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Automatic Cleavers</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Consistent tension application</li>
                    <li>Push-button operation</li>
                    <li>Higher cost (500-2000 pounds+)</li>
                    <li>Best for production work</li>
                    <li>Less technique-dependent</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Manual Cleavers</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>User applies tension</li>
                    <li>Requires good technique</li>
                    <li>Lower cost (100-500 pounds)</li>
                    <li>Portable and simple</li>
                    <li>Good for occasional use</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Stripping Tools:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Mechanical Strippers:</strong> Fixed or adjustable holes for different coating diameters. Common types: CFS-2 style, Ripley Miller, Jonard.</li>
                <li><strong>Thermal Strippers:</strong> Heated element softens coating for clean removal. Reduces fibre stress. Good for 250 micrometre coated fibre.</li>
                <li><strong>Jacket Strippers:</strong> For removing outer cable jackets. Different tools for different jacket sizes.</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Support Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Support Equipment and Accessories
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond the core splicing equipment, various accessories and support items are
              needed for effective splicing operations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential Accessories:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fibre holders:</strong> Match splicer model, various coating diameters</li>
                <li><strong>Splice protectors:</strong> Heat shrink sleeves, 40mm/60mm lengths</li>
                <li><strong>Electrodes:</strong> Spare pairs for replacement (consumable)</li>
                <li><strong>Cleaning supplies:</strong> IPA, lint-free wipes, cleaning sticks</li>
                <li><strong>Carrying case:</strong> Protection for transport and storage</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test and Support Equipment:</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-green-400 mb-2">Test Equipment</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>OTDR for splice verification</li>
                    <li>Power meter and source</li>
                    <li>Visual fault locator</li>
                    <li>Fibre inspection microscope</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Field Accessories</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Work mat/tray</li>
                    <li>Headlamp or work light</li>
                    <li>Sharps container</li>
                    <li>Cable preparation tools</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Splice Protectors</p>
              <p className="text-sm text-white mb-2">
                Heat shrink splice protectors are essential consumables:
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>40mm:</strong> Standard length for most splices</li>
                <li><strong>60mm:</strong> For longer stripped sections or difficult routing</li>
                <li><strong>Strength member:</strong> Steel rod inside for mechanical protection</li>
                <li><strong>Mini sleeves:</strong> For compact splice trays</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05: Equipment Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Equipment Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regular maintenance ensures consistent splice quality and extends equipment life.
              Follow manufacturer recommendations for specific procedures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Daily/Regular Maintenance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>V-groove cleaning:</strong> Clean with cotton swab and IPA after each session</li>
                <li><strong>Mirror/lens cleaning:</strong> Clean viewing optics as needed</li>
                <li><strong>Electrode check:</strong> Inspect for wear, clean if contaminated</li>
                <li><strong>Fibre clamp cleaning:</strong> Remove debris from holder surfaces</li>
                <li><strong>Arc calibration:</strong> Run auto-calibration before splicing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Electrode Management:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Life cycle:</strong> Typically 2,000-5,000 splices per pair</li>
                <li><strong>Signs of wear:</strong> Inconsistent arcs, high loss splices, visible pitting</li>
                <li><strong>Replacement:</strong> Follow manufacturer procedure, re-calibrate after</li>
                <li><strong>Stock spares:</strong> Always have replacement electrodes available</li>
                <li><strong>Track usage:</strong> Record splice count for replacement scheduling</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Maintenance Responsibilities:</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                  <p className="text-sm font-medium text-green-400 mb-2">User Maintenance</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Daily cleaning</li>
                    <li>Electrode replacement</li>
                    <li>Arc calibration</li>
                    <li>Software updates</li>
                    <li>Battery care</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Service Centre</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Annual calibration</li>
                    <li>Internal cleaning</li>
                    <li>Component replacement</li>
                    <li>Electrode gap adjustment</li>
                    <li>Major repairs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Selection and Costs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Selection and Cost Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the right equipment involves balancing performance requirements,
              budget, and operational needs.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Selection Criteria:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fibre types:</strong> SM only, MM only, or both? Ribbon capability needed?</li>
                <li><strong>Quality requirements:</strong> Backbone (core alignment) vs distribution (clad OK)</li>
                <li><strong>Volume:</strong> Occasional use vs daily production</li>
                <li><strong>Environment:</strong> Workshop, field, or both?</li>
                <li><strong>Support:</strong> Local service availability, training, spare parts</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Typical Equipment Costs (2024)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Core alignment splicer:</strong> 5,000-30,000 pounds+</li>
                <li><strong>Clad alignment splicer:</strong> 3,000-8,000 pounds</li>
                <li><strong>Precision cleaver:</strong> 200-2,000 pounds</li>
                <li><strong>Complete kit (splicer + cleaver + tools):</strong> 4,000-35,000 pounds</li>
                <li><strong>Rental (daily/weekly):</strong> 50-200 pounds/day</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Buy vs Rent Guidance:</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Consider Buying</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Regular use (monthly+)</li>
                    <li>Specific model required</li>
                    <li>Capital budget available</li>
                    <li>In-house maintenance capability</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Consider Renting</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Occasional projects</li>
                    <li>Trial before purchase</li>
                    <li>Budget constraints</li>
                    <li>Access to latest models</li>
                  </ul>
                </div>
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
                <li><strong>Match equipment to application:</strong> Do not overspend or underspend</li>
                <li><strong>Invest in training:</strong> Equipment is only as good as the operator</li>
                <li><strong>Maintain regularly:</strong> Prevents problems and extends equipment life</li>
                <li><strong>Keep spares:</strong> Electrodes, protectors, cleaning supplies always on hand</li>
                <li><strong>Document everything:</strong> Track maintenance, calibration, and usage</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Field Work Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Check battery:</strong> Ensure sufficient charge before starting</li>
                <li><strong>Run calibration:</strong> Environmental conditions affect arc parameters</li>
                <li><strong>Protect from dust:</strong> Use wind shields and clean work area</li>
                <li><strong>Have backup power:</strong> Vehicle DC adapter or spare battery</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping calibration</strong> - arc calibration should be run before each session</li>
                <li><strong>Using worn electrodes</strong> - causes inconsistent results and re-work</li>
                <li><strong>Poor cleaver maintenance</strong> - leads to poor cleaves and splice failures</li>
                <li><strong>Ignoring V-groove cleaning</strong> - contaminated grooves cause alignment errors</li>
                <li><strong>Storing improperly</strong> - dust and moisture damage sensitive components</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Splicing Equipment</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Core Equipment</p>
                <ul className="space-y-0.5">
                  <li>Fusion splicer (core/clad align)</li>
                  <li>Precision cleaver (under 1 degree angle)</li>
                  <li>Fibre strippers (250/900 micrometre)</li>
                  <li>Cleaning supplies (IPA, wipes)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Maintenance Items</p>
                <ul className="space-y-0.5">
                  <li>Electrodes (2000-5000 splice life)</li>
                  <li>Cleave blade positions</li>
                  <li>V-groove cleaning sticks</li>
                  <li>Annual calibration service</li>
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
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule4Section3;
