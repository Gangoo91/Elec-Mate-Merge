import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
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
    id: 1,
    question: "What does the Class II symbol (double square) indicate about an appliance's safety features?",
    options: [
      "It has a fused plug",
      "It relies on double or reinforced insulation instead of earthing",
      "It operates at extra-low voltage",
      "It has been PAT tested"
    ],
    correctAnswer: 1,
    explanation: "The double square symbol indicates the appliance uses double or reinforced insulation as its primary protection method, eliminating the need for an earth connection."
  },
  {
    id: 2,
    question: "Which information is NOT typically found on an appliance rating plate?",
    options: [
      "Voltage rating",
      "Power consumption (watts)",
      "Date of next PAT test",
      "Manufacturer name or logo"
    ],
    correctAnswer: 2,
    explanation: "The date of next PAT test is added by the tester after inspection, not by the manufacturer on the original rating plate."
  },
  {
    id: 3,
    question: "What does CE marking on an appliance indicate?",
    options: [
      "The appliance has passed PAT testing",
      "The appliance conforms to relevant EU safety directives",
      "The appliance is Class II",
      "The appliance was made in Europe"
    ],
    correctAnswer: 1,
    explanation: "CE marking indicates conformity with relevant EU safety directives. It does not indicate PAT test status, appliance class, or country of manufacture."
  },
  {
    id: 4,
    question: "How can you identify a Class III appliance from its construction?",
    options: [
      "It has a metal case with earth terminal",
      "It uses a standard 13A plug",
      "It operates from a SELV supply (typically via transformer or USB)",
      "It has double insulation throughout"
    ],
    correctAnswer: 2,
    explanation: "Class III appliances operate at Safety Extra-Low Voltage (SELV), typically powered via a transformer, USB connection, or battery. This safe voltage level provides the protection."
  },
  {
    id: 5,
    question: "If the rating plate is missing or illegible, what should you do?",
    options: [
      "Assume it is Class I and test accordingly",
      "Pass it without testing",
      "Fail the appliance until properly identified",
      "Test it as Class II to be safe"
    ],
    correctAnswer: 2,
    explanation: "If you cannot determine the appliance class with reasonable certainty, the appliance should be failed and removed from service until proper documentation is obtained."
  },
  {
    id: 6,
    question: "What colour is typically used for the earth core in UK flex?",
    options: [
      "Blue",
      "Brown",
      "Green and yellow striped",
      "Black"
    ],
    correctAnswer: 2,
    explanation: "The earth conductor in UK flexible cables is identified by green and yellow stripes. Brown is live and blue is neutral."
  },
  {
    id: 7,
    question: "A laptop charger with a two-core cable and the double square symbol is classified as:",
    options: [
      "Class I",
      "Class II",
      "Class III",
      "Class 0"
    ],
    correctAnswer: 1,
    explanation: "The double square symbol and two-core cable both indicate Class II. The charger uses double insulation for protection rather than an earth connection."
  },
  {
    id: 8,
    question: "What does UKCA marking indicate on electrical equipment?",
    options: [
      "UK Class A safety rating",
      "Conformity with UK product regulations (post-Brexit equivalent of CE)",
      "United Kingdom Consumer Approved",
      "The appliance is British-made"
    ],
    correctAnswer: 1,
    explanation: "UKCA (UK Conformity Assessed) is the UK's post-Brexit equivalent of CE marking, indicating conformity with UK product regulations."
  },
  {
    id: 9,
    question: "Which construction feature would suggest an appliance is Class I?",
    options: [
      "Fully plastic enclosure with no visible screws",
      "Metal casing with an earth terminal or three-core cable",
      "Powered via USB cable only",
      "Sealed unit with no user-accessible parts"
    ],
    correctAnswer: 1,
    explanation: "Metal casing with an earth terminal or three-core cable indicates Class I construction. The earthing provides fault protection for the metal parts."
  },
  {
    id: 10,
    question: "When inspecting a moulded plug, what markings should be present?",
    options: [
      "Only the manufacturer's logo",
      "BS 1363 approval mark and fuse rating",
      "The PAT test due date",
      "The appliance serial number"
    ],
    correctAnswer: 1,
    explanation: "Moulded plugs should display the BS 1363 approval mark (or equivalent) and the fuse rating. These indicate compliance with UK plug standards."
  }
];

const faqs = [
  {
    question: "What if an appliance has both a metal case AND the Class II symbol?",
    answer: "This is valid - some Class II appliances have decorative metal parts or metal cases that are isolated from internal components by double insulation. The Class II symbol takes precedence. However, verify the metal parts are indeed isolated and not connected to any internal components. When in doubt, consult the manufacturer's documentation."
  },
  {
    question: "Can I trust the class marking on very old appliances?",
    answer: "Approach with caution. Older appliances may have been modified, had cables replaced incorrectly, or standards may have changed. Always verify the marking against the physical construction - check cable type, look for earth connections, and examine the insulation. If there's any doubt, treat it as requiring further investigation before testing."
  },
  {
    question: "What's the difference between CE and UKCA markings?",
    answer: "CE (Conformité Européenne) indicates conformity with EU safety directives and is required for products sold in EU/EEA countries. UKCA (UK Conformity Assessed) is the UK equivalent introduced after Brexit, required for products placed on the GB market. Both indicate the product meets essential safety requirements, but neither is a PAT test pass."
  },
  {
    question: "How do I identify Class III appliances when they often don't have a specific symbol?",
    answer: "Class III appliances operate at Safety Extra-Low Voltage (SELV), typically under 50V AC. Look for: connection via a transformer or USB, very low voltage ratings on the rating plate (e.g., 5V, 12V, 24V), or specific SELV/PELV markings. Common examples include phone charger outputs, LED strip controllers, and battery-operated items with chargers."
  },
  {
    question: "What should I do if the only marking visible is a foreign language?",
    answer: "The class symbols are internationally standardised and don't require language knowledge - look for the double square (Class II) or other pictorial symbols. Voltage and wattage numbers are universal. If you cannot determine the class from symbols and construction, the appliance should be failed until proper documentation is obtained."
  },
  {
    question: "Are there any appliances that don't fit standard class categories?",
    answer: "Some specialist equipment may have unique requirements. IT equipment often follows different standards (IEC 62368-1). Medical equipment has its own classification system. Industrial equipment may have additional markings. For non-standard equipment, consult the manufacturer's documentation or relevant industry-specific guidance."
  }
];

const PATTestingModule2Section5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Identifying Appliance Class by Markings and Labels
          </h1>
          <p className="text-white/80">
            Reading rating plates, symbols, and construction clues for accurate class identification
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Class II Symbol:</strong> Two concentric squares</li>
              <li><strong>Class I Indicator:</strong> Three-core cable with earth</li>
              <li><strong>Class III:</strong> SELV supply, under 50V AC</li>
              <li><strong>Key Location:</strong> Rating plate on base/rear</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Check rating plate BEFORE any testing</li>
              <li><strong>Use:</strong> Class determines which tests to perform</li>
              <li><strong>Critical:</strong> Wrong class = wrong tests = invalid results</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Recognise Class I, II, and III symbols instantly",
              "Locate and read appliance rating plates correctly",
              "Understand CE and UKCA marking meanings",
              "Identify appliance class from construction features",
              "Handle missing or unclear markings professionally",
              "Apply knowledge to real PAT testing scenarios"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Class Identification Symbols */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Class Identification Symbols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical appliance classes each have internationally standardised symbols that appear on rating plates and documentation. Being able to recognise these instantly is fundamental to correct PAT testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Three Main Class Symbols:</p>
              <ul className="text-sm text-white space-y-3 ml-4">
                <li><strong>Class I - Earth Symbol:</strong> May show the earth symbol (three horizontal lines decreasing in length). Often identified by three-core cable with earth connection rather than a specific symbol. Relies on earthing for protection.</li>
                <li><strong>Class II - Double Square:</strong> Two concentric squares - a smaller square centred inside a larger square. This is the most important symbol to recognise. Indicates double or reinforced insulation - NO earth connection required or present.</li>
                <li><strong>Class III - Roman Numeral or SELV:</strong> May show Roman numeral III or SELV marking, but often identified by very low voltage rating (under 50V AC) and connection method (transformer, USB, battery). Safety Extra-Low Voltage operation.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Critical Point:</strong> The Class II double square symbol is the most critical to recognise. If you miss it and perform earth continuity testing on a Class II appliance, you'll get a fail reading (open circuit) even though the appliance is perfectly safe. This wastes time and can lead to incorrectly condemning good equipment.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Reading Rating Plates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Reading Rating Plates
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The rating plate (or nameplate) is your primary source of information about an appliance. It contains essential data required for both identification and testing purposes.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Where to Find Rating Plates:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Base or underside</strong> - Most common location for small appliances</li>
                <li><strong>Rear panel</strong> - Common on larger appliances, monitors, computers</li>
                <li><strong>Inside door or cover</strong> - Fridges, washing machines, dishwashers</li>
                <li><strong>Near the cable entry point</strong> - Often found on power tools</li>
                <li><strong>On a separate label</strong> - Some modern appliances use adhesive labels</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Information Typically Found on Rating Plates:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Electrical Ratings:</strong> Voltage (e.g., 230V~), frequency (50Hz), power (W or kW), current (A)</li>
                <li><strong>Identification:</strong> Manufacturer name/logo, model number, serial number, class symbol</li>
                <li><strong>Compliance Marks:</strong> CE marking, UKCA marking, BSI Kitemark (if applicable)</li>
                <li><strong>Additional Info:</strong> IP rating, country of manufacture, date codes, special warnings</li>
              </ul>
            </div>

            <p>
              For PAT testing purposes, the most critical information is the <strong>class symbol</strong>, <strong>voltage rating</strong>, and <strong>power consumption</strong>. The power rating helps determine appropriate fuse sizing, while the class determines which tests to perform.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: CE and UKCA Markings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Understanding CE and UKCA Markings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Compliance markings indicate that a product meets regulatory safety requirements. Understanding these helps assess whether equipment has been properly manufactured to safety standards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">CE Marking (Conformité Européenne):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Required for products sold in EU/EEA markets</li>
                <li>Indicates compliance with relevant EU safety directives</li>
                <li>Self-declared by manufacturer (not necessarily third-party tested)</li>
                <li>Still valid on UK market during transition period</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">UKCA Marking (UK Conformity Assessed):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Required for products sold in Great Britain (post-Brexit)</li>
                <li>UK equivalent of CE marking</li>
                <li>Same technical requirements as CE</li>
                <li>Becoming mandatory for new products on GB market</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Important:</strong> CE/UKCA marking does NOT mean the appliance has been PAT tested, does NOT guarantee it's currently safe, does NOT replace regular inspection and testing, and does NOT indicate the appliance class.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Beware of Fake CE Marks:</p>
              <p className="text-sm text-white ml-4">
                Some imported products bear "China Export" marks that look similar to CE but have different letter spacing. The genuine CE mark has specific proportions - the letters should be at least 5mm high and have a particular spacing ratio. If equipment appears substandard despite bearing a CE mark, treat it with caution.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Identifying Class from Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Identifying Class from Construction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When rating plate symbols are unclear or missing, the physical construction of an appliance provides strong clues about its class. Learning to read these construction features is an essential backup identification method.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Class I Construction Features:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Three-core cable</strong> - Contains green/yellow earth conductor</li>
                <li><strong>Metal casing or exposed metal parts</strong> - Connected to earth for safety</li>
                <li><strong>Earth terminal visible</strong> - Often marked with earth symbol</li>
                <li><strong>Three-pin plug</strong> - With earth pin connected (not just present)</li>
                <li><em>Examples: Kettles with metal bodies, toasters, desktop computers, monitors with metal stands</em></li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Class II Construction Features:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Two-core cable</strong> - Only live (brown) and neutral (blue)</li>
                <li><strong>Fully plastic/insulated enclosure</strong> - No exposed metal parts</li>
                <li><strong>No earth terminal or connection</strong> - Earth not required</li>
                <li><strong>Double-square symbol present</strong> - On rating plate or moulded into case</li>
                <li><em>Examples: Phone chargers, laptop power supplies, plastic-bodied power tools, hair dryers</em></li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Class III Construction Features:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Very low voltage operation</strong> - Under 50V AC or 120V DC ripple-free</li>
                <li><strong>Powered via transformer</strong> - Separate power supply unit</li>
                <li><strong>USB powered</strong> - 5V DC from computer or charger</li>
                <li><strong>Battery operated</strong> - Often with charging capability</li>
                <li><em>Examples: Laptop (the laptop itself, not charger), desk lamps with transformers, USB devices, LED strip lights</em></li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Handling Unclear Markings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Handling Missing or Unclear Markings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In the real world, you'll encounter appliances with damaged, faded, or missing rating plates. Knowing how to handle these situations professionally is essential for safe and compliant PAT testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Decision Tree for Unclear Markings:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Can you find any rating plate? Check all surfaces, inside doors, under covers, near cable entry</li>
                <li><strong>Step 2:</strong> Is the Class II symbol visible anywhere? Check moulded plastic, printed labels, embossed markings</li>
                <li><strong>Step 3:</strong> Check the cable - two core or three core? Two core (no earth) suggests Class II; three core suggests Class I</li>
                <li><strong>Step 4:</strong> Examine the construction. Metal case with earth terminal = Class I; Fully plastic = likely Class II</li>
                <li><strong>Step 5:</strong> Still unsure? Look up the model online - manufacturer websites often have specifications and manuals</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>When to Fail:</strong> If you cannot determine the class with reasonable certainty, the appliance should be failed and removed from service until manufacturer documentation is obtained, a replacement rating plate is fitted, or the appliance is replaced.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Scenarios:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Faded/worn rating plate:</strong> Try photographing with flash at an angle - raised text may become visible. Use torch at low angle to highlight embossed markings.</li>
                <li><strong>Rating plate painted over:</strong> May indicate previous refurbishment. Look for model numbers elsewhere (moulded into case, separate serial plate).</li>
                <li><strong>Foreign appliance with unfamiliar markings:</strong> Class symbols are international standards. Focus on finding the double-square or checking cable/construction.</li>
              </ul>
            </div>

            <p>
              <strong>Documentation is key:</strong> Whatever your decision, document it clearly in your test records. Note why you classified the appliance as you did, or why you failed it. This protects both you and your client if questions arise later.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always identify the class BEFORE starting any electrical tests</li>
                <li>Keep a torch handy for inspecting rating plates in dark locations</li>
                <li>Take photos of rating plates for your records - useful for future reference</li>
                <li>If testing many items of the same model, verify the first one thoroughly then spot-check others</li>
                <li>Build familiarity with common appliances in your testing environment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming all plastic appliances are Class II</strong> — some have internal earth connections</li>
                <li><strong>Testing Class II appliances for earth continuity</strong> — will always show fail/open circuit</li>
                <li><strong>Ignoring the cable type</strong> — when the rating plate is unclear, the cable provides vital clues</li>
                <li><strong>Not checking if cables have been replaced</strong> — wrong cable type may have been fitted</li>
                <li><strong>Relying solely on plug type</strong> — some Class II appliances use 3-pin plugs (earth not connected)</li>
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

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Class Identification</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Class I Features</p>
                <ul className="space-y-0.5">
                  <li>Three-core cable (L, N, E)</li>
                  <li>Earth symbol or terminal</li>
                  <li>Metal casing connected to earth</li>
                  <li>230V mains operation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Class II Features</p>
                <ul className="space-y-0.5">
                  <li>Two-core cable (L, N only)</li>
                  <li>Double square symbol</li>
                  <li>No earth connection</li>
                  <li>Double/reinforced insulation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Class III Features</p>
                <ul className="space-y-0.5">
                  <li>SELV/PELV marking</li>
                  <li>Under 50V AC operation</li>
                  <li>Transformer or USB powered</li>
                  <li>Low voltage connection</li>
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
            <Link to="/electrician/upskilling/pat-testing-module-3">
              Next: Module 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PATTestingModule2Section5;
