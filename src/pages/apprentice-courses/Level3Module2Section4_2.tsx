/**
 * Level 3 Module 2 Section 4.2 - Charger Types and Connectors
 * Understanding EV charger types, connector standards, and cable configurations
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
const TITLE = "EV Charger Types and Connectors - Level 3 Module 2 Section 4.2";
const DESCRIPTION = "Understanding EV connector types including Type 1, Type 2, CCS, CHAdeMO, and the different wallbox configurations available in the UK market.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Which connector type is the standard for AC charging in Europe and the UK?",
    options: [
      "Type 1 (J1772)",
      "Type 2 (Mennekes)",
      "CHAdeMO",
      "Tesla proprietary"
    ],
    correctIndex: 1,
    explanation: "Type 2 (also known as Mennekes) is the standard AC charging connector in Europe and the UK. It supports single-phase up to 7kW and three-phase up to 22kW (or 43kW in some cases). All new EVs sold in Europe have Type 2 inlets for AC charging."
  },
  {
    id: "check-2",
    question: "What is a CCS connector?",
    options: [
      "A Chinese charging standard",
      "A combined AC and DC connector with Type 2 plus two DC pins",
      "An older Japanese standard",
      "A wireless charging system"
    ],
    correctIndex: 1,
    explanation: "CCS (Combined Charging System) combines a Type 2 AC connector with two additional DC power pins below it. CCS2 (European version) enables both AC charging via Type 2 and DC rapid charging up to 350kW+ through the same vehicle inlet, making it extremely versatile."
  },
  {
    id: "check-3",
    question: "What is the difference between 'tethered' and 'untethered' chargers?",
    options: [
      "Tethered chargers are portable, untethered are fixed",
      "Tethered has a permanently attached cable, untethered requires you to use your own cable",
      "Tethered is for AC, untethered is for DC",
      "There is no difference"
    ],
    correctIndex: 1,
    explanation: "A tethered charger has a cable permanently attached - you just plug into your car. An untethered charger has a Type 2 socket; you use your own cable to connect charger to vehicle. Tethered is more convenient at home; untethered offers more flexibility for different vehicles."
  },
  {
    id: "check-4",
    question: "What maximum power can a Type 2 connector deliver for three-phase AC charging?",
    options: [
      "7kW",
      "11kW",
      "22kW (or 43kW with some systems)",
      "150kW"
    ],
    correctIndex: 2,
    explanation: "Type 2 connectors can deliver up to 22kW with standard three-phase supply (32A x 400V x 3 phases), or up to 43kW in some specialised installations with higher current ratings. However, most UK domestic installations are single-phase limited to 7kW."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Which connector type is primarily used for DC rapid charging in Europe?",
    options: [
      "Type 1",
      "Type 2",
      "CCS2 (Combined Charging System)",
      "BS 1363"
    ],
    correctAnswer: 2,
    explanation: "CCS2 is the dominant DC rapid charging standard in Europe. It combines the Type 2 connector (top section) with two DC power pins (bottom section), allowing vehicles with CCS inlets to use both AC chargers and DC rapid chargers through the same port."
  },
  {
    id: 2,
    question: "What is CHAdeMO?",
    options: [
      "A European charging standard",
      "A Japanese DC rapid charging standard",
      "A type of battery chemistry",
      "A charging payment system"
    ],
    correctAnswer: 1,
    explanation: "CHAdeMO is a Japanese DC rapid charging standard, commonly found on older Nissan and Mitsubishi EVs. While still present on the UK charging network, it's being phased out in favour of CCS. CHAdeMO uses a separate, larger connector distinct from the AC charging port."
  },
  {
    id: 3,
    question: "Why might a customer choose an untethered home charger?",
    options: [
      "They are always cheaper",
      "They charge faster",
      "Flexibility to use different cables or for multiple vehicles with different connectors",
      "They don't require installation"
    ],
    correctAnswer: 2,
    explanation: "Untethered chargers offer flexibility - users can use their own cables of different lengths, and households with multiple EVs (possibly with different connectors) can use the same charger. However, you must remember to bring your cable and store it when not in use."
  },
  {
    id: 4,
    question: "What does the 'Type 1' connector refer to?",
    options: [
      "The European standard AC connector",
      "The American/Japanese standard AC connector (J1772)",
      "A DC rapid charging connector",
      "A three-phase connector"
    ],
    correctAnswer: 1,
    explanation: "Type 1 (SAE J1772) is the single-phase AC charging connector standard used primarily in North America and Japan. Some older imported EVs in the UK have Type 1 inlets. It supports up to 7.4kW but only single-phase charging, unlike the European Type 2."
  },
  {
    id: 5,
    question: "What is the purpose of the proximity pilot (PP) pin in Type 2 connectors?",
    options: [
      "To supply high current",
      "To detect cable current rating and ensure proper connection",
      "To provide internet connectivity",
      "To lock the vehicle doors"
    ],
    correctAnswer: 1,
    explanation: "The proximity pilot (PP) indicates to the EVSE the current rating of the connected cable (through a specific resistor value) and detects when the connector is properly inserted. This ensures the EVSE doesn't supply more current than the cable can safely carry."
  },
  {
    id: 6,
    question: "Which connector type does Tesla use for Superchargers in Europe?",
    options: [
      "Tesla proprietary connector",
      "Type 2 / CCS2",
      "CHAdeMO",
      "Type 1"
    ],
    correctAnswer: 1,
    explanation: "Tesla uses CCS2 for their Supercharger network in Europe, and European Tesla vehicles have CCS2 inlets. This differs from North America where Tesla uses their proprietary NACS connector. This means European Teslas can use any CCS rapid charger."
  },
  {
    id: 7,
    question: "What is the main advantage of a tethered home charger?",
    options: [
      "Lower purchase price",
      "Convenience - the cable is always attached and ready to use",
      "Higher charging power",
      "Better for public locations"
    ],
    correctAnswer: 1,
    explanation: "Tethered chargers are more convenient for home use - the cable is always there, ready to plug in. No need to retrieve a cable from the car boot, especially in bad weather. The trade-off is less flexibility if you have multiple vehicles with different connectors."
  },
  {
    id: 8,
    question: "What cable length is typically available for tethered home chargers?",
    options: [
      "1-2 metres only",
      "5-7.5 metres typically",
      "15-20 metres",
      "Cable length is not adjustable"
    ],
    correctAnswer: 1,
    explanation: "Tethered home chargers typically come with 5-7.5 metre cables, allowing flexibility in parking position. Some manufacturers offer longer options. When installing, consider where the charger will be mounted relative to the vehicle's charge port location."
  },
  {
    id: 9,
    question: "What should you check when purchasing a charging cable for an untethered charger?",
    options: [
      "Only the colour",
      "Connector types at both ends, current rating, and cable length",
      "Just the price",
      "Only the brand name"
    ],
    correctAnswer: 1,
    explanation: "When buying a cable for untethered charging, verify: connector types (usually Type 2 to Type 2, or Type 2 to Type 1 for older vehicles), current rating (must match or exceed charger output), and length (typically 5m for home use). Quality and certification are also important."
  },
  {
    id: 10,
    question: "Why do DC rapid chargers always have tethered cables?",
    options: [
      "To reduce cost",
      "Because the high-power DC cables require liquid cooling and are too heavy/expensive for users to carry",
      "Due to connector standardisation only",
      "They don't - untethered DC chargers are common"
    ],
    correctAnswer: 1,
    explanation: "DC rapid charger cables are tethered because they're heavy (often liquid-cooled for high power), expensive, and not practical for users to carry. The cooling systems, thick conductors, and robust connectors required for 150kW+ charging make portable DC cables impractical."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I use any Type 2 cable with my EV?",
    answer: "If your EV has a Type 2 inlet (most European EVs do), you can use any Type 2 to Type 2 cable, but ensure the cable's current rating matches or exceeds your charger's output. Using an under-rated cable will limit charging speed. Most EVs come with a cable, but you may want a spare or different length."
  },
  {
    question: "My EV has a Type 1 inlet - can I use UK public chargers?",
    answer: "Yes, but you'll need a Type 2 to Type 1 adapter cable for untethered public AC chargers (most public AC points). Some older EVs came with this cable. For tethered chargers (like home wallboxes), ensure it's installed with a Type 1 connector or you have the appropriate adapter."
  },
  {
    question: "Should I choose tethered or untethered for my home charger?",
    answer: "For single-vehicle households with no plans to change EV type, tethered is usually more convenient. For multiple vehicles (or if visitors may charge), or if you might change to an EV with a different connector, untethered offers more flexibility. Consider cable management and weather protection too."
  },
  {
    question: "What's the difference between CCS1 and CCS2?",
    answer: "CCS1 combines Type 1 with DC pins (used in North America/Japan), while CCS2 combines Type 2 with DC pins (used in Europe/UK). They're not interchangeable. All new EVs sold in Europe have CCS2, though some adapters exist. CCS2 is the only DC standard you need to know for UK installations."
  },
  {
    question: "Are connector types being standardised globally?",
    answer: "There's a trend toward standardisation. Europe has mandated CCS2 for DC charging and Type 2 for AC. North America is moving toward Tesla's NACS (now SAE J3400). CHAdeMO is declining. This simplifies the landscape but older vehicles and legacy infrastructure mean multiple connectors will coexist for years."
  },
  {
    question: "Can I get an adapter to use CHAdeMO chargers with my CCS car?",
    answer: "CHAdeMO to CCS adapters exist but are expensive (several hundred pounds) and relatively rare. Given the declining CHAdeMO network and widespread CCS availability, most owners don't need one. If your EV has CHAdeMO, adapters to CCS are not generally available due to technical limitations."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Charger Types and Connectors
          </h1>
          <p className="text-white/80">
            Understanding the connector standards and charger configurations in the UK market
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Type 2:</strong> European AC standard, up to 22kW (7kW typical UK home)</li>
              <li><strong>CCS2:</strong> Type 2 + DC pins, rapid charging up to 350kW+</li>
              <li><strong>CHAdeMO:</strong> Japanese DC standard, declining in Europe</li>
              <li><strong>Tethered vs Untethered:</strong> Fixed cable vs bring-your-own</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Type 2 has 7 pins in circular pattern with flat top</li>
              <li><strong>Use:</strong> Match cable current rating to charger output</li>
              <li><strong>Apply:</strong> Tethered for convenience, untethered for flexibility</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "AC connector types: Type 1 and Type 2",
              "DC connector types: CCS and CHAdeMO",
              "The difference between tethered and untethered chargers",
              "How connector standards are evolving",
              "Cable specifications and current ratings",
              "Choosing the right charger configuration for customers"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Content Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            AC Connector Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              AC charging connectors are used for Mode 2 and Mode 3 charging, where the vehicle's onboard charger converts AC to DC. Two main standards exist: Type 1 (American/Japanese) and Type 2 (European), with Type 2 being the standard for all new EVs in the UK and Europe.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type 2 (Mennekes)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>European/UK standard for AC charging</li>
                  <li>7-pin connector with flat top edge</li>
                  <li>Single-phase: up to 7.4kW (32A)</li>
                  <li>Three-phase: up to 22kW (32A) or 43kW</li>
                  <li>All new European EVs have Type 2 inlet</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type 1 (J1772)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>American/Japanese standard</li>
                  <li>5-pin connector, circular shape</li>
                  <li>Single-phase only: up to 7.4kW</li>
                  <li>Found on older/imported EVs (e.g., older Nissan Leaf)</li>
                  <li>Declining in UK market</li>
                </ul>
              </div>
            </div>

            <p>
              Type 2 connectors include control pilot (CP) and proximity pilot (PP) pins for communication and safety. The CP manages charging current and safety checks, while PP detects cable rating and proper connection.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> When installing home chargers, Type 2 is the default choice for UK customers. Only specify Type 1 if the customer has an older EV with a Type 1 inlet.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Content Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            DC Connector Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DC rapid chargers bypass the vehicle's onboard charger, supplying DC power directly to the battery. This requires higher-specification connectors capable of handling much greater power. Two main standards exist in the UK: CCS (Combined Charging System) and CHAdeMO.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">CCS (Combined Charging System):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>CCS2:</strong> European version - Type 2 top with two DC pins below</li>
                <li>Single inlet on vehicle supports both AC and DC charging</li>
                <li>Power range: 50kW to 350kW+ (depending on charger and vehicle)</li>
                <li>Dominant standard for all new European EVs</li>
                <li>Used by Tesla Superchargers in Europe</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">CHAdeMO:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Japanese DC standard, separate from AC connector</li>
                <li>Typically 50kW, some up to 100kW</li>
                <li>Found on older Nissan (Leaf, e-NV200) and Mitsubishi EVs</li>
                <li>Declining in Europe - being phased out by manufacturers</li>
                <li>Legacy infrastructure still exists but shrinking</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A new EV with CCS2 inlet can charge at any Type 2 AC charger (using the top part of the inlet) and any CCS DC rapid charger (using the full inlet including DC pins). This versatility is why CCS has become dominant.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Content Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Tethered vs Untethered Chargers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Home and destination chargers come in two configurations: tethered (with permanently attached cable) or untethered (socket only, requiring the user to provide a cable). Each has advantages depending on the use case.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tethered Chargers</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cable permanently attached (typically 5-7.5m)</li>
                  <li>Just plug in and charge - no cable handling</li>
                  <li>Convenient in all weather conditions</li>
                  <li>Cable cannot be stolen or misplaced</li>
                  <li>Less flexible if vehicles change</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Untethered Chargers</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Type 2 socket - bring your own cable</li>
                  <li>Flexibility for different vehicles/connectors</li>
                  <li>Choose cable length to suit needs</li>
                  <li>Must store and retrieve cable each use</li>
                  <li>Cable can be used at public chargers too</li>
                </ul>
              </div>
            </div>

            <p>
              For home installations, tethered chargers are more popular due to convenience. Untethered is preferred for workplaces or locations serving multiple vehicle types, or where the owner expects to change vehicles. Consider the customer's current vehicle, potential future vehicles, and convenience preferences.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Content Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Cable Specifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For Mode 2 and Mode 3 charging, the cable's current rating must match or exceed the charger's output. Using an under-rated cable results in reduced charging speed, as the EVSE reads the cable's PP resistor and limits current accordingly.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">16A Cable</p>
                <p className="text-white/90 text-xs">Up to 3.7kW (single-phase) or 11kW (three-phase)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">32A Cable</p>
                <p className="text-white/90 text-xs">Up to 7.4kW (single-phase) or 22kW (three-phase)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Typical Length</p>
                <p className="text-white/90 text-xs">5m standard, 7.5m+ for flexibility</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Current rating:</strong> Match to charger output (32A for most 7kW home chargers)</li>
                <li><strong>Length:</strong> Consider parking variations and charge port location</li>
                <li><strong>Connector types:</strong> Usually Type 2 to Type 2; specify if Type 1 needed</li>
                <li><strong>Quality:</strong> Look for appropriate certifications and robust construction</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The EVSE, cable, and vehicle onboard charger all affect charging speed. The system operates at the lowest common rating. A 32A cable on a 16A charger still only delivers 16A.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying Chargers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Type 2 tethered is the default for most UK domestic installations</li>
                <li>Check customer's current EV - some older vehicles need Type 1</li>
                <li>Consider future vehicle purchases and household members</li>
                <li>Untethered suits workplace or multi-vehicle scenarios</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Length Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>5m is minimum practical length for most driveways</li>
                <li>7.5m+ recommended where parking position varies</li>
                <li>Consider charge port location on the vehicle (front/rear, left/right)</li>
                <li>Longer cables are heavier - consider storage and handling</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong connector type</strong> - verify customer's EV inlet before ordering</li>
                <li><strong>Under-rated cable</strong> - ensure cable matches charger output capacity</li>
                <li><strong>Too short cable</strong> - allow for parking variations and port location</li>
                <li><strong>Ignoring future needs</strong> - consider likely next vehicle before choosing tethered connector</li>
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
                <p className="font-medium text-white mb-1">AC Connectors</p>
                <ul className="space-y-0.5">
                  <li>Type 2: European standard, 7-pin, up to 22kW</li>
                  <li>Type 1: American/Japanese, 5-pin, up to 7.4kW</li>
                  <li>UK default: Type 2</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">DC Connectors</p>
                <ul className="space-y-0.5">
                  <li>CCS2: Type 2 + DC pins, up to 350kW+</li>
                  <li>CHAdeMO: Japanese, up to 100kW, declining</li>
                  <li>UK dominant: CCS2</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: EV Charging Modes
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section4-3">
              Next: Installation Requirements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section4_2;
