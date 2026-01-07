import { ArrowLeft, Tag, CheckCircle, Eye, HelpCircle, Lightbulb, AlertTriangle, Bookmark, ChevronRight, ChevronLeft, Square } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Identifying Appliance Class by Markings and Labels - PAT Testing Course";
const DESCRIPTION = "Learn to identify electrical appliance classes through visual inspection of markings, symbols, rating plates, and construction features. Essential for PAT testing.";

const quickCheckQuestions = [
  {
    id: "m2s5-qc1",
    question: "What symbol indicates a Class II (double insulated) appliance?",
    options: [
      "A circle with an earth symbol inside",
      "Two concentric squares (square within a square)",
      "A triangle with a lightning bolt",
      "The letters 'CI' in a box"
    ],
    correctIndex: 1,
    explanation: "The Class II symbol is two concentric squares - a smaller square inside a larger square. This internationally recognised symbol indicates the appliance relies on double or reinforced insulation for protection rather than an earth connection."
  },
  {
    id: "m2s5-qc2",
    question: "Where would you typically find the rating plate on an appliance?",
    options: [
      "Always on the front panel",
      "On the power cord itself",
      "On the base, rear, or inside a cover/door",
      "Stamped into the plug pins"
    ],
    correctIndex: 2,
    explanation: "Rating plates are typically located on the base, rear panel, or inside an access cover/door of the appliance. They contain essential information including voltage, current/wattage, and class markings."
  },
  {
    id: "m2s5-qc3",
    question: "If an appliance has a three-core cable but no Class II symbol, what class is it most likely?",
    options: [
      "Class 0",
      "Class I",
      "Class II",
      "Class III"
    ],
    correctIndex: 1,
    explanation: "A three-core cable (live, neutral, earth) without the Class II double-square symbol indicates a Class I appliance. Class I appliances rely on earthing for protection and require an earth continuity test during PAT testing."
  }
];

const quizQuestions = [
  {
    question: "What does the Class II symbol (double square) indicate about an appliance's safety features?",
    options: [
      "It has a fused plug",
      "It relies on double or reinforced insulation instead of earthing",
      "It operates at extra-low voltage",
      "It has been PAT tested"
    ],
    correctAnswer: 1
  },
  {
    question: "Which information is NOT typically found on an appliance rating plate?",
    options: [
      "Voltage rating",
      "Power consumption (watts)",
      "Date of next PAT test",
      "Manufacturer name or logo"
    ],
    correctAnswer: 2
  },
  {
    question: "What does CE marking on an appliance indicate?",
    options: [
      "The appliance has passed PAT testing",
      "The appliance conforms to relevant EU safety directives",
      "The appliance is Class II",
      "The appliance was made in Europe"
    ],
    correctAnswer: 1
  },
  {
    question: "How can you identify a Class III appliance from its construction?",
    options: [
      "It has a metal case with earth terminal",
      "It uses a standard 13A plug",
      "It operates from a SELV supply (typically via transformer or USB)",
      "It has double insulation throughout"
    ],
    correctAnswer: 2
  },
  {
    question: "If the rating plate is missing or illegible, what should you do?",
    options: [
      "Assume it is Class I and test accordingly",
      "Pass it without testing",
      "Fail the appliance until properly identified",
      "Test it as Class II to be safe"
    ],
    correctAnswer: 2
  },
  {
    question: "What colour is typically used for the earth core in UK flex?",
    options: [
      "Blue",
      "Brown",
      "Green and yellow striped",
      "Black"
    ],
    correctAnswer: 2
  },
  {
    question: "A laptop charger with a two-core cable and the double square symbol is classified as:",
    options: [
      "Class I",
      "Class II",
      "Class III",
      "Class 0"
    ],
    correctAnswer: 1
  },
  {
    question: "What does UKCA marking indicate on electrical equipment?",
    options: [
      "UK Class A safety rating",
      "Conformity with UK product regulations (post-Brexit equivalent of CE)",
      "United Kingdom Consumer Approved",
      "The appliance is British-made"
    ],
    correctAnswer: 1
  },
  {
    question: "Which construction feature would suggest an appliance is Class I?",
    options: [
      "Fully plastic enclosure with no visible screws",
      "Metal casing with an earth terminal or three-core cable",
      "Powered via USB cable only",
      "Sealed unit with no user-accessible parts"
    ],
    correctAnswer: 1
  },
  {
    question: "When inspecting a moulded plug, what markings should be present?",
    options: [
      "Only the manufacturer's logo",
      "BS 1363 approval mark and fuse rating",
      "The PAT test due date",
      "The appliance serial number"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    q: "What if an appliance has both a metal case AND the Class II symbol?",
    a: "This is valid - some Class II appliances have decorative metal parts or metal cases that are isolated from internal components by double insulation. The Class II symbol takes precedence. However, verify the metal parts are indeed isolated and not connected to any internal components. When in doubt, consult the manufacturer's documentation."
  },
  {
    q: "Can I trust the class marking on very old appliances?",
    a: "Approach with caution. Older appliances may have been modified, had cables replaced incorrectly, or standards may have changed. Always verify the marking against the physical construction - check cable type, look for earth connections, and examine the insulation. If there's any doubt, treat it as requiring further investigation before testing."
  },
  {
    q: "What's the difference between CE and UKCA markings?",
    a: "CE (Conformité Européenne) indicates conformity with EU safety directives and is required for products sold in EU/EEA countries. UKCA (UK Conformity Assessed) is the UK equivalent introduced after Brexit, required for products placed on the GB market. Both indicate the product meets essential safety requirements, but neither is a PAT test pass."
  },
  {
    q: "How do I identify Class III appliances when they often don't have a specific symbol?",
    a: "Class III appliances operate at Safety Extra-Low Voltage (SELV), typically under 50V AC. Look for: connection via a transformer or USB, very low voltage ratings on the rating plate (e.g., 5V, 12V, 24V), or specific SELV/PELV markings. Common examples include phone charger outputs, LED strip controllers, and battery-operated items with chargers."
  },
  {
    q: "What should I do if the only marking visible is a foreign language?",
    a: "The class symbols are internationally standardised and don't require language knowledge - look for the double square (Class II) or other pictorial symbols. Voltage and wattage numbers are universal. If you cannot determine the class from symbols and construction, the appliance should be failed until proper documentation is obtained."
  },
  {
    q: "Are there any appliances that don't fit standard class categories?",
    a: "Some specialist equipment may have unique requirements. IT equipment often follows different standards (IEC 62368-1). Medical equipment has its own classification system. Industrial equipment may have additional markings. For non-standard equipment, consult the manufacturer's documentation or relevant industry-specific guidance."
  }
];

const PATTestingModule2Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="../pat-testing-module-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-white/70 hover:text-elec-yellow hover:bg-white/5 -ml-2 touch-manipulation active:scale-95 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Module 2</span>
            </Button>
          </Link>
          <span className="text-xs font-medium text-elec-yellow bg-elec-yellow/10 px-2.5 py-1 rounded-full">
            Section 5 of 5
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8 pb-24">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-elec-yellow mb-3">
            <Tag className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">Module 2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            Identifying Appliance Class by Markings and Labels
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            Reading rating plates, symbols, and construction clues
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">In 30 Seconds</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Appliance class can be identified by symbols on the rating plate, physical construction features, and cable type. Class II shows a double square symbol.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 text-white/70" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">Spot It / Use It</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Always check the rating plate BEFORE testing. The class determines which tests are required - wrong class = wrong tests = invalid results.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-elec-yellow" />
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Recognise Class I, II, and III symbols instantly",
              "Locate and read appliance rating plates",
              "Understand CE and UKCA marking meanings",
              "Identify class from construction features",
              "Handle missing or unclear markings correctly",
              "Apply knowledge to real PAT testing scenarios"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 01: Class Symbols */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Class Identification Symbols</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Electrical appliance classes each have internationally standardised symbols that appear on rating plates and documentation. Being able to recognise these instantly is fundamental to correct PAT testing.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5 space-y-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Square className="w-4 h-4 text-elec-yellow" />
                The Three Main Class Symbols
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 bg-elec-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-elec-yellow/40">
                    <span className="text-elec-yellow font-bold text-lg">I</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Class I - Earth Symbol</h4>
                    <p className="text-white/70 text-sm mt-1">
                      May show the earth symbol (three horizontal lines decreasing in length, or the IEC 5019 symbol). Often no specific symbol - identified by three-core cable with earth connection. Relies on earthing for protection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 bg-elec-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-elec-yellow/40">
                    <div className="w-6 h-6 border-2 border-elec-yellow flex items-center justify-center">
                      <div className="w-3 h-3 border-2 border-elec-yellow"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Class II - Double Square</h4>
                    <p className="text-white/70 text-sm mt-1">
                      Two concentric squares - a smaller square centred inside a larger square. This is the most important symbol to recognise. Indicates double or reinforced insulation - NO earth connection required or present.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 bg-elec-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-elec-yellow/40">
                    <span className="text-elec-yellow font-bold text-lg">III</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Class III - Roman Numeral or SELV</h4>
                    <p className="text-white/70 text-sm mt-1">
                      May show Roman numeral III or SELV marking, but often identified by very low voltage rating (under 50V AC) and connection method (transformer, USB, battery). Safety Extra-Low Voltage operation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold text-sm">Critical Point</h4>
                  <p className="text-white/70 text-sm mt-1">
                    The Class II double square symbol is the most critical to recognise. If you miss it and perform earth continuity testing on a Class II appliance, you'll get a fail reading (open circuit) even though the appliance is perfectly safe. This wastes time and can lead to incorrectly condemning good equipment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Rating Plates */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Reading Rating Plates</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The rating plate (or nameplate) is your primary source of information about an appliance. It contains essential data required for both identification and testing purposes.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Where to Find Rating Plates</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Base or underside</strong> - Most common location for small appliances</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Rear panel</strong> - Common on larger appliances, monitors, computers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Inside door or cover</strong> - Fridges, washing machines, dishwashers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Near the cable entry point</strong> - Often found on power tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">On a separate label</strong> - Some modern appliances use adhesive labels</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Information on Rating Plates</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="text-elec-yellow font-medium text-sm">Electrical Ratings</h4>
                  <ul className="text-white/70 text-sm mt-1 space-y-1">
                    <li>• Voltage (e.g., 230V~, 220-240V)</li>
                    <li>• Frequency (e.g., 50Hz)</li>
                    <li>• Power (e.g., 2000W or 2kW)</li>
                    <li>• Current (e.g., 8.7A)</li>
                  </ul>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="text-elec-yellow font-medium text-sm">Identification</h4>
                  <ul className="text-white/70 text-sm mt-1 space-y-1">
                    <li>• Manufacturer name/logo</li>
                    <li>• Model number</li>
                    <li>• Serial number</li>
                    <li>• Class symbol (if Class II)</li>
                  </ul>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="text-elec-yellow font-medium text-sm">Compliance Marks</h4>
                  <ul className="text-white/70 text-sm mt-1 space-y-1">
                    <li>• CE marking</li>
                    <li>• UKCA marking</li>
                    <li>• BSI Kitemark (if applicable)</li>
                    <li>• Other certification marks</li>
                  </ul>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <h4 className="text-elec-yellow font-medium text-sm">Additional Info</h4>
                  <ul className="text-white/70 text-sm mt-1 space-y-1">
                    <li>• IP rating (ingress protection)</li>
                    <li>• Country of manufacture</li>
                    <li>• Date codes</li>
                    <li>• Special warnings</li>
                  </ul>
                </div>
              </div>
            </div>

            <p>
              For PAT testing purposes, the most critical information is the <strong className="text-white">class symbol</strong>, <strong className="text-white">voltage rating</strong>, and <strong className="text-white">power consumption</strong>. The power rating helps determine appropriate fuse sizing, while the class determines which tests to perform.
            </p>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: CE and UKCA Markings */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Understanding CE and UKCA Markings</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Compliance markings indicate that a product meets regulatory safety requirements. Understanding these helps assess whether equipment has been properly manufactured to safety standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-center mb-3">
                  <span className="text-3xl font-bold text-white">CE</span>
                </div>
                <h3 className="text-white font-semibold text-center mb-2">CE Marking</h3>
                <ul className="text-white/70 text-sm space-y-2">
                  <li>• <strong className="text-white">Conformité Européenne</strong> (European Conformity)</li>
                  <li>• Required for products sold in EU/EEA</li>
                  <li>• Indicates compliance with relevant EU directives</li>
                  <li>• Self-declared by manufacturer (not third-party tested)</li>
                  <li>• Still valid on UK market (transition period)</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-center mb-3">
                  <span className="text-3xl font-bold text-white">UKCA</span>
                </div>
                <h3 className="text-white font-semibold text-center mb-2">UKCA Marking</h3>
                <ul className="text-white/70 text-sm space-y-2">
                  <li>• <strong className="text-white">UK Conformity Assessed</strong></li>
                  <li>• Required for products sold in Great Britain</li>
                  <li>• UK equivalent of CE marking post-Brexit</li>
                  <li>• Same technical requirements as CE</li>
                  <li>• Becoming mandatory for new products</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-semibold text-sm">What CE/UKCA Does NOT Mean</h4>
                  <ul className="text-white/70 text-sm mt-1 space-y-1">
                    <li>• Does NOT mean the appliance has been PAT tested</li>
                    <li>• Does NOT guarantee the appliance is currently safe</li>
                    <li>• Does NOT replace the need for regular inspection and testing</li>
                    <li>• Does NOT indicate the appliance class</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">Beware of Fake CE Marks</h3>
              <p className="text-white/70 text-sm">
                Some imported products bear "China Export" marks that look similar to CE but have different letter spacing. The genuine CE mark has specific proportions - the letters should be at least 5mm high and have a particular spacing ratio. If equipment appears substandard despite bearing a CE mark, treat it with caution.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Construction Features */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Identifying Class from Construction</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              When rating plate symbols are unclear or missing, the physical construction of an appliance provides strong clues about its class. Learning to read these construction features is an essential backup identification method.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-4">Class I Construction Features</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-xs font-bold">1</span>
                  </div>
                  <p className="text-sm"><strong className="text-white">Three-core cable</strong> - Contains green/yellow earth conductor</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-xs font-bold">2</span>
                  </div>
                  <p className="text-sm"><strong className="text-white">Metal casing or exposed metal parts</strong> - Connected to earth for safety</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-xs font-bold">3</span>
                  </div>
                  <p className="text-sm"><strong className="text-white">Earth terminal visible</strong> - Often marked with earth symbol</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-xs font-bold">4</span>
                  </div>
                  <p className="text-sm"><strong className="text-white">Three-pin plug</strong> - With earth pin connected (not just present)</p>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-3 italic">
                Examples: Kettles with metal bodies, toasters, desktop computers, monitors with metal stands
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-4">Class II Construction Features</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 text-xs font-bold">1</span>
                  </div>
                  <p className="text-sm"><strong className="text-white">Two-core cable</strong> - Only live (brown) and neutral (blue)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 text-xs font-bold">2</span>
                  </div>
                  <p className="text-sm"><strong className="text-white">Fully plastic/insulated enclosure</strong> - No exposed metal parts</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 text-xs font-bold">3</span>
                  </div>
                  <p className="text-sm"><strong className="text-white">No earth terminal or connection</strong> - Earth not required</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 text-xs font-bold">4</span>
                  </div>
                  <p className="text-sm"><strong className="text-white">Double-square symbol present</strong> - On rating plate or moulded into case</p>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-3 italic">
                Examples: Phone chargers, laptop power supplies, plastic-bodied power tools, hair dryers
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-4">Class III Construction Features</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 text-xs font-bold">1</span>
                  </div>
                  <p className="text-sm"><strong className="text-white">Very low voltage operation</strong> - Under 50V AC or 120V DC ripple-free</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 text-xs font-bold">2</span>
                  </div>
                  <p className="text-sm"><strong className="text-white">Powered via transformer</strong> - Separate power supply unit</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 text-xs font-bold">3</span>
                  </div>
                  <p className="text-sm"><strong className="text-white">USB powered</strong> - 5V DC from computer or charger</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 text-xs font-bold">4</span>
                  </div>
                  <p className="text-sm"><strong className="text-white">Battery operated</strong> - Often with charging capability</p>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-3 italic">
                Examples: Laptop (the laptop itself, not charger), desk lamps with transformers, USB devices, LED strip lights
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Handling Unclear Markings */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Handling Missing or Unclear Markings</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              In the real world, you'll encounter appliances with damaged, faded, or missing rating plates. Knowing how to handle these situations professionally is essential for safe and compliant PAT testing.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Decision Tree for Unclear Markings</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-sm flex-shrink-0">1</span>
                  <div>
                    <p className="text-white font-medium">Can you find any rating plate?</p>
                    <p className="text-white/60 text-sm">Check all surfaces, inside doors, under covers, near cable entry</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-sm flex-shrink-0">2</span>
                  <div>
                    <p className="text-white font-medium">Is the Class II symbol visible anywhere?</p>
                    <p className="text-white/60 text-sm">Check moulded plastic, printed labels, embossed markings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-sm flex-shrink-0">3</span>
                  <div>
                    <p className="text-white font-medium">Check the cable - two core or three core?</p>
                    <p className="text-white/60 text-sm">Two core (no earth) suggests Class II; three core suggests Class I</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-sm flex-shrink-0">4</span>
                  <div>
                    <p className="text-white font-medium">Examine the construction</p>
                    <p className="text-white/60 text-sm">Metal case with earth terminal = Class I; Fully plastic = likely Class II</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold text-sm flex-shrink-0">5</span>
                  <div>
                    <p className="text-white font-medium">Still unsure? Look up the model online</p>
                    <p className="text-white/60 text-sm">Manufacturer websites often have specifications and manuals</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-semibold text-sm">When to Fail an Appliance</h4>
                  <p className="text-white/70 text-sm mt-1">
                    If you cannot determine the class with reasonable certainty, the appliance should be <strong className="text-white">failed</strong> and removed from service until:
                  </p>
                  <ul className="text-white/70 text-sm mt-2 space-y-1">
                    <li>• Manufacturer documentation is obtained</li>
                    <li>• A replacement rating plate is fitted</li>
                    <li>• The appliance is replaced</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-green-400 font-semibold text-sm">Documentation is Key</h4>
                  <p className="text-white/70 text-sm mt-1">
                    Whatever your decision, document it clearly in your test records. Note why you classified the appliance as you did, or why you failed it. This protects both you and your client if questions arise later.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">Common Scenarios</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Faded/worn rating plate</p>
                  <p className="text-white/60">Try photographing with flash at an angle - raised text may become visible. Use torch at low angle to highlight embossed markings.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Rating plate painted over</p>
                  <p className="text-white/60">May indicate previous refurbishment. Look for model numbers elsewhere (moulded into case, separate serial plate).</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Foreign appliance with unfamiliar markings</p>
                  <p className="text-white/60">Class symbols are international standards. Focus on finding the double-square or checking cable/construction. Voltage compatibility is a separate concern.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Bookmark className="w-5 h-5 text-elec-yellow" />
            <h2 className="text-xl font-bold text-white">Practical Guidance</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Best Practice Tips
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Always identify the class BEFORE starting any electrical tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Keep a torch handy for inspecting rating plates in dark locations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Take photos of rating plates for your records - useful for future reference</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>If testing many items of the same model, verify the first one thoroughly then spot-check others</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Build familiarity with common appliances in your testing environment</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Common Mistakes to Avoid
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Assuming all plastic appliances are Class II (some have internal earth connections)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Testing Class II appliances for earth continuity (will always show fail/open)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Ignoring the cable type when the rating plate is unclear</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Not checking if cables have been replaced (wrong cable type fitted)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Relying solely on plug type - some Class II appliances use 3-pin plugs (earth not connected)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-5 h-5 text-elec-yellow" />
            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white/5 rounded-xl">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none touch-manipulation">
                  <span className="text-white font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-white/40 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-white/70 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 rounded-xl p-5">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-elec-yellow" />
              Quick Reference: Class Identification
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-elec-yellow font-semibold">Feature</th>
                    <th className="text-center py-2 text-elec-yellow font-semibold">Class I</th>
                    <th className="text-center py-2 text-elec-yellow font-semibold">Class II</th>
                    <th className="text-center py-2 text-elec-yellow font-semibold">Class III</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-medium text-white">Symbol</td>
                    <td className="py-2 text-center">Earth or none</td>
                    <td className="py-2 text-center">Double square</td>
                    <td className="py-2 text-center">III or SELV</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-medium text-white">Cable cores</td>
                    <td className="py-2 text-center">3 (L, N, E)</td>
                    <td className="py-2 text-center">2 (L, N)</td>
                    <td className="py-2 text-center">2 (low voltage)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-medium text-white">Earth connection</td>
                    <td className="py-2 text-center">Yes</td>
                    <td className="py-2 text-center">No</td>
                    <td className="py-2 text-center">No</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-medium text-white">Voltage</td>
                    <td className="py-2 text-center">230V mains</td>
                    <td className="py-2 text-center">230V mains</td>
                    <td className="py-2 text-center">&lt;50V AC</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-white">Protection</td>
                    <td className="py-2 text-center">Earthing</td>
                    <td className="py-2 text-center">Double insulation</td>
                    <td className="py-2 text-center">Safe voltage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Section 5 Quiz: Appliance Class Identification"
            questions={quizQuestions}
            moduleId="pat-m2s5"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-white/10">
          <Link to="../pat-testing-module-2-section-4" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto gap-2 border-white/20 text-white hover:bg-white/5 hover:text-elec-yellow min-h-[48px] touch-manipulation active:scale-[0.98]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous: Section 4</span>
            </Button>
          </Link>
          <Link to="../pat-testing-module-3" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold min-h-[48px] touch-manipulation active:scale-[0.98]"
            >
              <span>Next: Module 3</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default PATTestingModule2Section5;
