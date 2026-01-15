import { ArrowLeft, Cable, Zap, CheckCircle, Wrench, Settings, Scissors, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Flexible Cords and Flex Outlets - Module 3.1.5 | Level 2 Electrical Course";
const DESCRIPTION = "Complete guide to flexible cord types, construction, flex outlets and installation. Heat-resistant, HOFR and artic flex applications.";

const quickCheckQuestions = [
  {
    id: "flex-construction",
    question: "Why are flexible cords made with many fine strands rather than a single solid conductor?",
    options: ["Cheaper to manufacture", "Better electrical conductivity", "Greater flexibility without breakage", "Easier to strip"],
    correctIndex: 2,
    explanation: "Multi-stranded conductors can bend repeatedly without breaking, making them ideal for movable applications."
  },
  {
    id: "flex-application",
    question: "Name one application for heat-resistant flex.",
    options: ["Table lamps", "Cookers and ovens", "Computer equipment", "Garden tools"],
    correctIndex: 1,
    explanation: "Heat-resistant flex is essential for high-temperature applications like cookers, ovens, and immersion heaters."
  },
  {
    id: "flex-outlet",
    question: "What is the purpose of a cord grip at a flex outlet?",
    options: ["Improve appearance", "Prevent strain on conductor connections", "Reduce electrical resistance", "Allow easier disconnection"],
    correctIndex: 1,
    explanation: "Cord grips provide strain relief, preventing pulling forces from damaging the conductor terminations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main difference between flexible cords and fixed wiring cables?",
    options: ["Colour of insulation", "Use of multi-stranded conductors for flexibility", "Thickness of outer sheath", "Voltage rating"],
    correctAnswer: 1,
    explanation: "Flexible cords use multi-stranded conductors that can bend repeatedly without breaking, unlike solid conductors in fixed wiring."
  },
  {
    id: 2,
    question: "Which type of flex would you use for an outdoor tool exposed to mechanical wear?",
    options: ["PVC flex", "Heat-resistant flex", "Rubber-sheathed HOFR flex", "Artic flex"],
    correctAnswer: 2,
    explanation: "HOFR (Heavy Duty Oil and Flame Resistant) rubber-sheathed flex provides excellent protection against mechanical wear."
  },
  {
    id: 3,
    question: "True or False: Flexible cords can be used for permanent fixed wiring inside walls.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. BS 7671 does not permit flexible cords for concealed fixed wiring in building fabric."
  },
  {
    id: 4,
    question: "Why is heat-resistant flex used for cookers and immersion heaters?",
    options: ["It's cheaper than PVC flex", "It withstands high operating temperatures", "It's more flexible", "It's waterproof"],
    correctAnswer: 1,
    explanation: "Heat-resistant flex maintains its insulation properties and flexibility at high temperatures up to 90°C or more."
  },
  {
    id: 5,
    question: "Which colour is used for the earth conductor in flexible cords?",
    options: ["Green", "Yellow", "Green/yellow", "Bare copper"],
    correctAnswer: 2,
    explanation: "Green/yellow is the standard earth conductor colour in flexible cords, following BS 7671 colour coding."
  },
  {
    id: 6,
    question: "What component must be used at a flex outlet to prevent damage from pulling forces?",
    options: ["Cable ties", "Cord grip or clamp", "Insulation tape", "Terminal blocks"],
    correctAnswer: 1,
    explanation: "Cord grips or clamps provide essential strain relief to prevent conductor damage from pulling forces."
  },
  {
    id: 7,
    question: "Which type of flex remains flexible at low temperatures?",
    options: ["PVC flex", "Heat-resistant flex", "Artic flex", "Standard rubber flex"],
    correctAnswer: 2,
    explanation: "Artic flex is specially formulated to remain flexible in cold conditions where other types become stiff."
  },
  {
    id: 8,
    question: "What is the maximum continuous temperature rating for standard PVC flex?",
    options: ["60°C", "70°C", "90°C", "105°C"],
    correctAnswer: 1,
    explanation: "Standard PVC flexible cord is typically rated for continuous operation up to 70°C."
  },
  {
    id: 9,
    question: "Which British Standard covers flexible cords and cables?",
    options: ["BS 6004", "BS 6500", "BS 7671", "BS 5467"],
    correctAnswer: 1,
    explanation: "BS 6500 covers flexible cords and cables, whilst BS 7671 provides installation requirements."
  },
  {
    id: 10,
    question: "What causes most flexible cord failures?",
    options: ["Overloading", "Repeated bending at connections", "UV degradation", "Manufacturing defects"],
    correctAnswer: 1,
    explanation: "Most failures occur at connection points where repeated bending causes conductor fatigue without proper strain relief."
  },
  {
    id: 11,
    question: "Which flex type is suitable for food preparation areas?",
    options: ["Standard PVC", "Rubber HOFR", "Heat and oil resistant", "Artic flex"],
    correctAnswer: 2,
    explanation: "Heat and oil resistant flex can withstand the temperatures and food-safe requirements of commercial kitchens."
  },
  {
    id: 12,
    question: "What is the minimum bend radius for flexible cords during installation?",
    options: ["2 times cable diameter", "4 times cable diameter", "6 times cable diameter", "8 times cable diameter"],
    correctAnswer: 2,
    explanation: "A minimum bend radius of 6 times the cable diameter prevents damage to conductors and insulation."
  }
];

const faqs = [
  { q: "Can I use flexible cord for wiring inside walls?", a: "No, BS 7671 does not permit flex for concealed fixed wiring in building fabric." },
  { q: "Can flexible cords be repaired if damaged?", a: "Minor damage can be repaired by shortening and re-terminating, but cords with insulation damage along their length should be replaced." },
  { q: "Are all flexible cords heat-resistant?", a: "No — only those specifically designed and rated for high-temperature use can withstand elevated temperatures." },
  { q: "How do I select the correct flex for outdoor use?", a: "Consider temperature range, UV resistance, mechanical protection needed, and choose appropriate type (HOFR, artic, or UV-stabilised)." }
];

const Module3Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Flexible Cords and Flex Outlets – Module 3 (3.1.5)",
    description: DESCRIPTION,
    articleSection: "Electrical Installation",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  } as const;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } as const;

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

      {/* Main Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Cable className="h-4 w-4" />
            <span>Module 3.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Flexible Cords and Flex Outlets
          </h1>
          <p className="text-white/80">
            Multi-stranded cables designed for movement, portability and flexible connections to equipment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li>Multi-stranded copper conductors designed for repeated bending and movement</li>
              <li>Various types: PVC, heat-resistant, HOFR rubber, and artic for different environments</li>
              <li>Must use proper flex outlets with strain relief - cannot be used for fixed wiring</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Multi-stranded conductors, flexible outer sheath, used with cord grips</li>
              <li><strong>Use:</strong> Portable appliances, pendant lights, extension leads, equipment connections</li>
              <li><strong>Check:</strong> Correct type for environment, proper strain relief, current rating adequate</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the construction of flexible cords and why they differ from fixed wiring cables",
              "Identify common types of flexible cords and their specific applications",
              "Understand the limitations of flexible cords in fixed installations",
              "Apply correct methods for terminating and securing flexible cords at flex outlets",
              "Select appropriate cord types for different environmental conditions",
              "Recognise regulatory and safety requirements for flexible cord usage under BS 7671"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Construction of Flexible Cords */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Construction of Flexible Cords
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Flexible cords use fine multi-stranded conductors that can withstand repeated bending and movement
              without conductor fatigue or breakage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Core Construction:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Conductors</p>
                  <p className="text-xs text-white/80">Class 5 or Class 6 multi-stranded copper for maximum flexibility</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Insulation</p>
                  <p className="text-xs text-white/80">PVC, rubber, silicone or heat-resistant synthetic materials</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Outer Sheath</p>
                  <p className="text-xs text-white/80">Protective covering to resist abrasion, moisture and environmental effects</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white text-sm mb-1">Strain Relief</p>
                  <p className="text-xs text-white/80">Built-in or added at terminations to prevent conductor damage</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Conductor Classes</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Class 5:</strong> Flexible conductors for fixed installation connections</li>
                  <li><strong>Class 6:</strong> Extra flexible for portable equipment and frequent movement</li>
                  <li><strong>Stranding:</strong> Multiple fine wires twisted together</li>
                  <li><strong>Tinning:</strong> Often tin-plated to resist corrosion and ease termination</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Materials</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>PVC:</strong> Standard domestic and commercial use up to 70°C</li>
                  <li><strong>Rubber:</strong> Superior flexibility and temperature resistance</li>
                  <li><strong>Silicone:</strong> High temperature applications up to 180°C</li>
                  <li><strong>XLPE:</strong> Cross-linked for enhanced thermal properties</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id="ic-construction"
          question="What class of conductor stranding is used for extra flexible applications?"
          options={["Class 2", "Class 5", "Class 6", "Class 7"]}
          correctIndex={2}
          explanation="Class 6 conductors have the finest stranding for maximum flexibility in portable and frequently moved equipment."
        />

        {/* Section 2: Common Types and Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Common Types and Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-3 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">PVC Insulated and Sheathed Flex</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>Temperature:</strong> Up to 70°C continuous operation</li>
                  <li><strong>Applications:</strong> Domestic appliances, table lamps, extension leads</li>
                  <li><strong>Advantages:</strong> Cost-effective, good general performance</li>
                  <li><strong>Limitations:</strong> Can become stiff in cold conditions</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">Heat-Resistant Flex</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>Temperature:</strong> Up to 90°C, 105°C or higher ratings available</li>
                  <li><strong>Applications:</strong> Cookers, ovens, immersion heaters, industrial equipment</li>
                  <li><strong>Insulation:</strong> Silicone rubber or high-temperature PVC compounds</li>
                  <li><strong>Cost:</strong> Higher than standard PVC but essential for hot environments</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 my-6">
              <div className="p-3 rounded bg-green-500/10 border border-green-400/30">
                <p className="font-medium text-white text-sm mb-1">Rubber-Sheathed Flex (HOFR)</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>HOFR:</strong> Heavy duty Oil and Flame Resistant</li>
                  <li><strong>Applications:</strong> Outdoor tools, industrial equipment, mechanical wear environments</li>
                  <li><strong>Properties:</strong> Excellent abrasion resistance, oil resistance</li>
                  <li><strong>Durability:</strong> Superior to PVC for harsh conditions</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-1">Artic Flex</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li><strong>Temperature:</strong> Remains flexible down to -40°C or lower</li>
                  <li><strong>Applications:</strong> Outdoor use in cold climates, refrigeration equipment</li>
                  <li><strong>Construction:</strong> Special rubber compounds maintain flexibility</li>
                  <li><strong>Identification:</strong> Usually marked as "Artic" or low-temperature rated</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Specialist Flex Types</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-xs text-white space-y-1">
                  <li><strong>Submersible flex:</strong> Pumps and underwater equipment</li>
                  <li><strong>Chemical resistant:</strong> Laboratory and industrial process equipment</li>
                  <li><strong>Low smoke zero halogen:</strong> Public buildings and escape routes</li>
                  <li><strong>Screened flex:</strong> Data and control applications with EMC requirements</li>
                </ul>
                <ul className="text-xs text-white space-y-1">
                  <li><strong>Flat flex:</strong> Space-saving installations under carpets</li>
                  <li><strong>Coiled flex:</strong> Retractable connections for portable tools</li>
                  <li><strong>Multicore flex:</strong> Control panels and instrumentation</li>
                  <li><strong>High voltage flex:</strong> Specialist industrial and medical equipment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id="ic-types"
          question="Which type of flex would you choose for a freezer room application?"
          options={["Standard PVC flex", "Heat-resistant flex", "Artic flex", "HOFR rubber flex"]}
          correctIndex={2}
          explanation="Artic flex remains flexible at very low temperatures, making it ideal for freezer rooms and cold storage applications."
        />

        {/* Section 3: Flex Outlets and Termination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Flex Outlets and Termination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Purpose of Flex Outlets:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Provide secure termination point between fixed wiring and flexible cord</li>
                <li>Incorporate strain relief to prevent conductor damage from pulling forces</li>
                <li>Allow safe disconnection and reconnection of portable equipment</li>
                <li>Maintain electrical safety standards whilst providing flexibility</li>
                <li>Comply with BS 7671 requirements for accessible connections</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 my-6">
              <div className="p-3 rounded bg-green-500/10 border border-green-400/30">
                <p className="font-medium text-white text-sm mb-2">Ceiling Rose Types</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Loop-in ceiling rose with cord grip</li>
                  <li>Junction box ceiling rose</li>
                  <li>Low profile roses for modern fittings</li>
                  <li>Heat-resistant roses for high-wattage lighting</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Flex Outlet Plates</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Surface-mounted outlet plates</li>
                  <li>Flush-mounted plates for neat installation</li>
                  <li>Industrial outlet plates with enhanced protection</li>
                  <li>Weatherproof outlets for outdoor use</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Adaptable Box Solutions</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Metallic boxes with cord grips</li>
                  <li>Non-metallic enclosures</li>
                  <li>IP-rated boxes for harsh environments</li>
                  <li>Multi-entry boxes for several connections</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id="ic-outlets"
          question="What is the most critical component in a flex outlet installation?"
          options={["Terminal blocks", "Cord grip for strain relief", "Junction connections", "Mounting screws"]}
          correctIndex={1}
          explanation="The cord grip provides essential strain relief to prevent pulling forces from damaging the conductor connections."
        />

        {/* Section 4: Practical Installation Guide */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Installation Guide
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-3">Essential Tools and Materials</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium text-white text-xs mb-2">Preparation Tools</p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li>Wire strippers for multi-strand conductors</li>
                    <li>Sharp cable knife</li>
                    <li>Small screwdrivers (electrician's set)</li>
                    <li>Multimeter for testing</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white text-xs mb-2">Termination Materials</p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li>Appropriate flex outlet with cord grip</li>
                    <li>Terminal blocks or connectors</li>
                    <li>Insulation sleeves if required</li>
                    <li>Cable markers for identification</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white text-xs mb-2">Safety Equipment</p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li>Voltage tester/proving unit</li>
                    <li>Lock-off devices</li>
                    <li>Personal protective equipment</li>
                    <li>Warning notices</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flexible Cord Preparation Process:</p>
              <ol className="list-decimal ml-6 space-y-1 text-sm text-white">
                <li><strong>Measure and cut:</strong> Allow sufficient length for strain relief loop inside outlet</li>
                <li><strong>Remove outer sheath:</strong> Strip back 50-75mm using cable knife, taking care not to damage insulation</li>
                <li><strong>Separate conductors:</strong> Identify and separate live (brown), neutral (blue), and earth (green/yellow)</li>
                <li><strong>Strip conductor insulation:</strong> Remove 10-12mm from each conductor using appropriate strippers</li>
                <li><strong>Prepare conductor ends:</strong> Twist strands tightly or fit ferrules for neat termination</li>
                <li><strong>Check polarity:</strong> Ensure brown connects to live, blue to neutral, green/yellow to earth</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-green-500/10 border border-green-400/30">
                <p className="font-medium text-white text-sm mb-2">Installation Steps</p>
                <ol className="list-decimal ml-4 space-y-1 text-xs text-white/80">
                  <li>Isolate supply and prove dead</li>
                  <li>Position outlet and mark fixing holes</li>
                  <li>Prepare cable entry (knockout or drilling)</li>
                  <li>Secure outlet firmly to surface or mounting box</li>
                  <li>Connect supply cables to outlet terminals</li>
                  <li>Install cord grip components in correct order</li>
                  <li>Thread flex through cord grip</li>
                  <li>Form strain relief loop inside outlet</li>
                  <li>Connect flex conductors to terminals</li>
                  <li>Tighten cord grip to secure flex outer sheath</li>
                  <li>Test installation before energising</li>
                </ol>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Cord Grip Best Practices</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Grip must clamp onto outer sheath, not individual conductors</li>
                  <li>Leave small service loop inside outlet for strain relief</li>
                  <li>Ensure adequate IP rating for environment</li>
                  <li>Check grip holds firmly but doesn't damage sheath</li>
                  <li>Use thread sealant on outdoor installations</li>
                  <li>Label outlet with load information if required</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Problems to Avoid</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Cord grip clamping on individual conductors</li>
                  <li>Over-tightening causing sheath damage</li>
                  <li>Insufficient conductor length causing tension</li>
                  <li>Wrong polarity connections (live/neutral reversed)</li>
                  <li>Poor conductor preparation with loose strands</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white text-sm mb-2">Best Practice Solutions</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Use proper cord grips designed for cable diameter</li>
                  <li>Form service loop to relieve mechanical stress</li>
                  <li>Check connections are secure but not over-tight</li>
                  <li>Use ferrules on fine stranded conductors</li>
                  <li>Test continuity and insulation resistance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id="ic-practical"
          question="How should the cord grip clamp the flexible cable?"
          options={["On individual conductors", "On the outer sheath only", "On the insulation", "As tight as possible"]}
          correctIndex={1}
          explanation="The cord grip must clamp only on the outer sheath to provide proper strain relief without damaging individual conductors."
        />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Knowledge Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Knowledge Checks</h2>
          <div className="space-y-6">
            {quickCheckQuestions.map((q) => (
              <InlineCheck key={q.id} {...q} />
            ))}
          </div>
        </section>

        {/* Real-World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Real-World Example</h2>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-400/30">
            <h3 className="text-sm font-medium text-white mb-3">Commercial Kitchen Pendant Light Failure</h3>
            <p className="text-sm text-white mb-4">
              A pendant light in a commercial kitchen was initially connected using standard PVC flex.
              After several months of operation, the heat from cooking equipment and steam caused the
              PVC insulation to harden and crack near the lamp holder.
            </p>
            <p className="text-sm font-medium text-white mb-2">Problems Identified:</p>
            <ul className="list-disc ml-6 space-y-1 text-sm text-white mb-4">
              <li>Problem identified during routine PAT testing - insulation resistance failure</li>
              <li>Investigation revealed hardened and cracked PVC insulation from heat exposure</li>
              <li>Ambient temperature near ceiling reached 85°C during peak cooking periods</li>
              <li>Standard PVC flex only rated to 70°C continuous operation</li>
              <li>Risk of electric shock and potential fire hazard identified</li>
            </ul>
            <p className="text-sm font-medium text-white mb-2">Solution Implemented:</p>
            <ul className="list-disc ml-6 space-y-1 text-sm text-white mb-4">
              <li>Replaced with silicone-insulated heat-resistant flex rated to 180°C</li>
              <li>Used high-temperature rated ceiling rose and cord grip components</li>
              <li>Implemented regular inspection schedule for harsh environment equipment</li>
              <li>Updated maintenance documentation to specify heat-resistant requirements</li>
            </ul>
            <p className="text-sm text-white">
              The heat-resistant flex maintained flexibility and electrical safety in the demanding
              kitchen environment, demonstrating the importance of selecting appropriate cable types
              for specific operating conditions.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.q}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm text-white mb-3">
              Flexible cords are essential for connecting portable or movable equipment safely whilst
              providing the flexibility needed for repeated movement and positioning. Correct selection,
              installation, and termination ensure they remain safe and reliable throughout their service life.
            </p>
            <p className="text-sm text-white mb-3">
              They are not a substitute for fixed wiring but are a vital part of many electrical installations.
              Key success factors include:
            </p>
            <ul className="text-sm text-white space-y-1 ml-4">
              <li>Selecting appropriate flex type for environmental conditions and temperature requirements</li>
              <li>Using proper cord grips and strain relief to prevent conductor damage</li>
              <li>Ensuring correct polarity connections following BS 7671 colour coding</li>
              <li>Avoiding use of flexible cords for permanent fixed wiring installations</li>
              <li>Regular inspection and testing, especially in harsh operating environments</li>
              <li>Understanding limitations and replacing damaged cords rather than attempting repairs</li>
            </ul>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Flexible Cords Knowledge Test"
            questions={quizQuestions}
          />
        </section>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../1-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Module3Section1_5;
