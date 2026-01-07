import { ArrowLeft, TriangleAlert, CheckCircle, Eye, HelpCircle, Lightbulb, AlertTriangle, Bookmark, ChevronRight, ChevronLeft, Droplets, Factory, Building2, HardHat, Thermometer } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Environmental Considerations - PAT Testing Course";
const DESCRIPTION = "Learn how environmental factors affect electrical safety, equipment selection, and PAT testing requirements in wet, industrial, office, and construction environments.";

const quickCheckQuestions = [
  {
    id: "m3s4-qc1",
    question: "What IP rating would be appropriate for equipment used outdoors in rain?",
    options: [
      "IP20 - protected against fingers only",
      "IP44 - splashproof from any direction",
      "IP00 - no protection",
      "IP10 - protected against large objects"
    ],
    correctIndex: 1,
    explanation: "IP44 provides protection against splashing water from any direction and solid objects larger than 1mm. This is the minimum suitable rating for outdoor use where rain exposure is possible. Higher ratings like IP65 or IP66 provide even better protection for more demanding environments."
  },
  {
    id: "m3s4-qc2",
    question: "In a construction site environment, what is the recommended maximum testing interval for 110V power tools?",
    options: [
      "48 months",
      "24 months",
      "12 months",
      "3 months"
    ],
    correctIndex: 3,
    explanation: "Construction site equipment is subject to harsh conditions, frequent movement, and heavy use. The IET Code of Practice recommends formal combined inspection and testing every 3 months for portable tools on construction sites, with user checks before each use."
  },
  {
    id: "m3s4-qc3",
    question: "Why are 110V systems used on UK construction sites instead of 230V?",
    options: [
      "They use less electricity",
      "The tools are more powerful",
      "Reduced risk of fatal electric shock if a fault occurs",
      "They are cheaper to run"
    ],
    correctIndex: 2,
    explanation: "110V centre-tapped earth systems limit the maximum voltage to earth to 55V. This significantly reduces the risk of fatal electric shock in the event of a fault. While still dangerous, 55V is much less likely to cause death than 230V, making it safer for harsh construction environments."
  }
];

const quizQuestions = [
  {
    question: "What does the first digit in an IP rating indicate?",
    options: [
      "Water ingress protection",
      "Solid object/dust ingress protection",
      "Impact resistance",
      "Temperature rating"
    ],
    correctAnswer: 1
  },
  {
    question: "Which environment typically requires the shortest PAT testing intervals?",
    options: [
      "Hotel rooms",
      "Office environments",
      "Construction sites",
      "Schools (classrooms)"
    ],
    correctAnswer: 2
  },
  {
    question: "What additional protection is recommended for equipment used in wet conditions?",
    options: [
      "A larger fuse",
      "RCD protection (30mA or less)",
      "A longer cable",
      "A metal enclosure"
    ],
    correctAnswer: 1
  },
  {
    question: "In an industrial environment with conductive dust, what class of equipment is preferred?",
    options: [
      "Class I with good earthing",
      "Class II (double insulated)",
      "Class 0 (unprotected)",
      "Any class is equally suitable"
    ],
    correctAnswer: 1
  },
  {
    question: "What does IP65 rating mean?",
    options: [
      "Protected against dust and low-pressure water jets",
      "Protected against fingers and dripping water",
      "Protected against tools and splashing water",
      "No specific protection"
    ],
    correctAnswer: 0
  },
  {
    question: "Which factor does NOT typically increase the required testing frequency?",
    options: [
      "Equipment moved frequently",
      "Hostile environment (dust, moisture)",
      "Equipment used in a clean office",
      "Equipment used by the public"
    ],
    correctAnswer: 2
  },
  {
    question: "For equipment used in a commercial kitchen, what environmental hazards should be considered?",
    options: [
      "Water, heat, grease, and frequent cleaning",
      "Only water exposure",
      "Only heat exposure",
      "Only dust exposure"
    ],
    correctAnswer: 0
  },
  {
    question: "What is the centre-tap voltage to earth in a 110V construction site system?",
    options: [
      "110V",
      "220V",
      "55V",
      "0V"
    ],
    correctAnswer: 2
  },
  {
    question: "Which environment would typically allow the longest testing interval?",
    options: [
      "Building site",
      "Hotel with housekeeping equipment",
      "Office with IT equipment (double insulated)",
      "School science laboratory"
    ],
    correctAnswer: 2
  },
  {
    question: "What should you check when inspecting equipment used in dusty environments?",
    options: [
      "Only the cable condition",
      "Ventilation slots are clear, seals intact, no dust ingress to internals",
      "Only the plug wiring",
      "Only the fuse rating"
    ],
    correctAnswer: 1
  }
];

const faqs = [
  {
    q: "How do I determine the correct IP rating for a specific environment?",
    a: "Consider the specific hazards present: For dry offices, IP20 is sufficient. For kitchens and bathrooms, IP44 minimum. For outdoor use, IP44-IP65 depending on exposure. For jet washing or immersion risk, IP65-IP68. Always check manufacturer specifications and relevant regulations for specific applications."
  },
  {
    q: "Can I use standard office equipment on a construction site?",
    a: "Generally no. Construction sites require 110V equipment for safety, appropriate IP ratings for the conditions, and more robust construction to withstand the environment. Standard 230V office equipment would also require more frequent testing and may not meet site safety requirements. Always check site-specific rules."
  },
  {
    q: "What about equipment used in different environments at different times?",
    a: "The testing frequency should be based on the most demanding environment in which the equipment is used. For example, if a drill is occasionally used outdoors but mainly in a workshop, it should be tested at the frequency appropriate for outdoor/construction use. Document all environments where equipment is used."
  },
  {
    q: "How does temperature affect PAT testing requirements?",
    a: "Extreme temperatures affect insulation and cable flexibility. In cold environments, cables become brittle and prone to cracking. In hot environments, insulation may degrade faster. Equipment in extreme temperatures may need more frequent visual inspection. Some test equipment may also require temperature compensation for accurate readings."
  },
  {
    q: "Are there specific requirements for equipment in food preparation areas?",
    a: "Yes. Equipment must be suitable for wash-down where applicable (appropriate IP rating), resistant to cleaning chemicals, and designed for food safety. More frequent inspection is needed due to water and chemical exposure. Cables may deteriorate faster due to cleaning regimes. Check food hygiene regulations as well as electrical safety requirements."
  },
  {
    q: "What about equipment in zones with explosive atmospheres (ATEX)?",
    a: "Explosive atmosphere zones require specially certified equipment meeting ATEX/IECEx standards. Standard PAT testing is not sufficient - specialist inspection by trained personnel is required. Never use non-ATEX equipment in these zones. This is beyond the scope of standard PAT testing and requires specialist knowledge."
  }
];

const PATTestingModule3Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="../pat-testing-module-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-white/70 hover:text-elec-yellow hover:bg-white/5 -ml-2 touch-manipulation active:scale-95 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Module 3</span>
            </Button>
          </Link>
          <span className="text-xs font-medium text-elec-yellow bg-elec-yellow/10 px-2.5 py-1 rounded-full">
            Section 4 of 5
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8 pb-24">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-elec-yellow mb-3">
            <TriangleAlert className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">Module 3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            Environmental Considerations
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            Wet, industrial, office, and construction site requirements
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
                  Environment determines IP rating needs, equipment class preference, and testing frequency. Harsh environments = shorter test intervals.
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
                  Office = 48 months. Construction site = 3 months. Check IP ratings match environment. Always use RCDs in wet areas.
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
              "Understand IP ratings and their meaning",
              "Assess wet and damp environment risks",
              "Identify industrial environment hazards",
              "Apply appropriate testing frequencies",
              "Recognise construction site requirements",
              "Select suitable equipment for each environment"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 01: IP Ratings */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Understanding IP Ratings</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              IP (Ingress Protection) ratings indicate how well equipment is protected against solid objects and water. Understanding these is essential for matching equipment to environments.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">IP Rating Structure: IP XY</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-bold text-lg">First Digit (X)</p>
                  <p className="text-white/70 text-sm mb-2">Solid object protection</p>
                  <div className="space-y-1 text-xs text-white/60">
                    <p><span className="text-white font-medium">0</span> - No protection</p>
                    <p><span className="text-white font-medium">1</span> - Objects &gt;50mm (hand)</p>
                    <p><span className="text-white font-medium">2</span> - Objects &gt;12mm (finger)</p>
                    <p><span className="text-white font-medium">3</span> - Objects &gt;2.5mm (tools)</p>
                    <p><span className="text-white font-medium">4</span> - Objects &gt;1mm (wires)</p>
                    <p><span className="text-white font-medium">5</span> - Dust protected</p>
                    <p><span className="text-white font-medium">6</span> - Dust tight</p>
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-elec-yellow font-bold text-lg">Second Digit (Y)</p>
                  <p className="text-white/70 text-sm mb-2">Water protection</p>
                  <div className="space-y-1 text-xs text-white/60">
                    <p><span className="text-white font-medium">0</span> - No protection</p>
                    <p><span className="text-white font-medium">1</span> - Vertical drips</p>
                    <p><span className="text-white font-medium">2</span> - Drips at 15° angle</p>
                    <p><span className="text-white font-medium">3</span> - Spraying water</p>
                    <p><span className="text-white font-medium">4</span> - Splashing water</p>
                    <p><span className="text-white font-medium">5</span> - Water jets</p>
                    <p><span className="text-white font-medium">6</span> - Powerful water jets</p>
                    <p><span className="text-white font-medium">7</span> - Temporary immersion</p>
                    <p><span className="text-white font-medium">8</span> - Continuous immersion</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Common IP Ratings and Applications</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
                  <span className="text-elec-yellow font-bold text-sm min-w-[45px]">IP20</span>
                  <span className="text-white/70 text-sm">Finger-safe only. Indoor, dry locations. Most office equipment.</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
                  <span className="text-elec-yellow font-bold text-sm min-w-[45px]">IP44</span>
                  <span className="text-white/70 text-sm">Splashproof. Bathrooms (outside zones), kitchens, outdoor sheltered.</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
                  <span className="text-elec-yellow font-bold text-sm min-w-[45px]">IP54</span>
                  <span className="text-white/70 text-sm">Dust protected, splashproof. Industrial, outdoor equipment.</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
                  <span className="text-elec-yellow font-bold text-sm min-w-[45px]">IP65</span>
                  <span className="text-white/70 text-sm">Dust tight, water jet protected. Outdoor, wash-down areas.</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
                  <span className="text-elec-yellow font-bold text-sm min-w-[45px]">IP67</span>
                  <span className="text-white/70 text-sm">Dust tight, temporary immersion. Portable outdoor equipment.</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
                  <span className="text-elec-yellow font-bold text-sm min-w-[45px]">IP68</span>
                  <span className="text-white/70 text-sm">Dust tight, continuous immersion. Submersible equipment.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Wet Environments */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Wet and Damp Environments</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Water significantly increases electrical risk. Lower body resistance when wet, conductive paths through moisture, and reduced insulation effectiveness all contribute to higher danger levels.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 sm:p-5">
              <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Examples of Wet Environments
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-white/5 rounded">Commercial kitchens</div>
                <div className="p-2 bg-white/5 rounded">Bathrooms/changing rooms</div>
                <div className="p-2 bg-white/5 rounded">Swimming pools</div>
                <div className="p-2 bg-white/5 rounded">Laundries</div>
                <div className="p-2 bg-white/5 rounded">Car washes</div>
                <div className="p-2 bg-white/5 rounded">Breweries/food processing</div>
                <div className="p-2 bg-white/5 rounded">Outdoor events</div>
                <div className="p-2 bg-white/5 rounded">Farms and agriculture</div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Safety Requirements for Wet Areas</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Appropriate IP rating</strong> - Minimum IP44 for splash zones, higher for jet washing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">RCD protection</strong> - 30mA or less for personal protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Class II preferred</strong> - Double insulation avoids earth path through water</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">SELV/PELV where possible</strong> - Extra-low voltage in highest risk areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Frequent inspection</strong> - Water accelerates deterioration</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-semibold text-sm">Key Risks in Wet Environments</h4>
                  <ul className="text-white/70 text-sm mt-2 space-y-1">
                    <li>• Reduced body resistance increases shock severity</li>
                    <li>• Water provides conductive path bypassing insulation</li>
                    <li>• Moisture ingress degrades internal components</li>
                    <li>• Cleaning chemicals may attack cable insulation</li>
                    <li>• Condensation inside equipment causes tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Industrial Environments */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Industrial Environments</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Industrial settings present multiple hazards including dust, chemicals, heat, vibration, and mechanical damage. Equipment must be robust and appropriate for the specific conditions.
            </p>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 sm:p-5">
              <h3 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">
                <Factory className="w-4 h-4" />
                Industrial Hazard Categories
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Dust and Particulates</p>
                  <p className="text-white/60 text-sm">Conductive dust can cause tracking. Non-conductive dust blocks ventilation. Wood dust, metal filings, flour, etc. all pose risks.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Chemicals and Solvents</p>
                  <p className="text-white/60 text-sm">Attack cable insulation and plastic housings. Fumes may also affect components. Check material compatibility.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Heat and Temperature</p>
                  <p className="text-white/60 text-sm">Accelerates insulation degradation. Affects cable flexibility. May exceed equipment ratings near furnaces or ovens.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Vibration and Impact</p>
                  <p className="text-white/60 text-sm">Loosens connections over time. Causes conductor fatigue. Cable damage from movement.</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white font-medium">Electromagnetic Interference</p>
                  <p className="text-white/60 text-sm">May affect sensitive equipment. Motors and welding create interference. Shielded cables may be needed.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Industrial Equipment Requirements</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Robust construction</strong> - Industrial-grade housings, reinforced cables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Appropriate IP rating</strong> - Typically IP54 minimum for dusty environments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Chemical-resistant materials</strong> - Where chemical exposure exists</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">Heat-rated cables</strong> - Near high-temperature processes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong className="text-white">More frequent testing</strong> - 6-12 month intervals typical</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Office Environments */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Office Environments</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Office environments are generally low-risk, with controlled conditions and mainly IT equipment. However, they still require appropriate attention to electrical safety.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-elec-yellow" />
                Typical Office Equipment
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                <div className="p-2 bg-white/5 rounded text-center">Computers</div>
                <div className="p-2 bg-white/5 rounded text-center">Monitors</div>
                <div className="p-2 bg-white/5 rounded text-center">Printers</div>
                <div className="p-2 bg-white/5 rounded text-center">Desk lamps</div>
                <div className="p-2 bg-white/5 rounded text-center">Phone chargers</div>
                <div className="p-2 bg-white/5 rounded text-center">Kettles</div>
                <div className="p-2 bg-white/5 rounded text-center">Fans/heaters</div>
                <div className="p-2 bg-white/5 rounded text-center">Vacuum cleaners</div>
                <div className="p-2 bg-white/5 rounded text-center">Shredders</div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 sm:p-5">
              <h3 className="text-green-400 font-semibold mb-3">Why Offices Are Lower Risk</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Controlled, dry environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Most IT equipment is Class II (double insulated)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Equipment generally stationary, not moved frequently</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Trained staff, not public use</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Regular building maintenance</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Office-Specific Considerations</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Personal appliances</strong> - Staff may bring heaters, fans, phone chargers that need checking</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Cable management</strong> - Cables routed under desks can be damaged by chairs</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Extension leads</strong> - Often overloaded or daisy-chained</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Kitchen areas</strong> - Kettles, microwaves, fridges need more frequent attention</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05: Construction Sites */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Construction Sites</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Construction sites represent the highest-risk environment for portable electrical equipment. Special precautions, reduced voltage systems, and frequent testing are essential.
            </p>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 sm:p-5">
              <h3 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
                <HardHat className="w-4 h-4" />
                Why Construction Sites Are High Risk
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Equipment subject to rough handling and mechanical damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Outdoor exposure to weather (rain, mud, extreme temperatures)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Dust and debris contamination</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Cables run across traffic routes and work areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Heavy use of power tools with motors</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Temporary supply arrangements</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">110V Centre-Tapped Earth System</h3>
              <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg mb-3">
                <p className="text-white text-center font-medium">
                  Maximum voltage to earth: <span className="text-elec-yellow text-xl font-bold">55V</span>
                </p>
              </div>
              <p className="text-sm text-white/70 mb-3">
                UK construction sites use 110V systems with a centre-tapped transformer. This means the maximum voltage between any conductor and earth is only 55V, significantly reducing shock severity.
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-2 bg-green-500/10 rounded-lg text-center">
                  <p className="text-green-400 font-medium">110V Site Tools</p>
                  <p className="text-white/60 text-xs">Yellow plugs and sockets</p>
                </div>
                <div className="p-2 bg-red-500/10 rounded-lg text-center">
                  <p className="text-red-400 font-medium">230V Standard</p>
                  <p className="text-white/60 text-xs">Blue plugs and sockets</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Construction Site Testing Requirements</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-elec-yellow font-semibold">Check Type</th>
                      <th className="text-center py-2 text-elec-yellow font-semibold">Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2">User visual check</td>
                      <td className="py-2 text-center">Before each use</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Formal visual inspection</td>
                      <td className="py-2 text-center">Weekly</td>
                    </tr>
                    <tr>
                      <td className="py-2">Combined inspection and test</td>
                      <td className="py-2 text-center font-semibold text-elec-yellow">3 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Testing Frequency by Environment */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Testing Frequency by Environment</h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The IET Code of Practice provides guidance on testing frequencies based on environment and equipment type. These are starting points - adjust based on specific conditions.
            </p>

            <div className="bg-white/5 rounded-xl p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3">Suggested Testing Intervals</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-elec-yellow font-semibold">Environment</th>
                      <th className="text-center py-2 text-elec-yellow font-semibold">Class I</th>
                      <th className="text-center py-2 text-elec-yellow font-semibold">Class II</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2">Construction site (110V)</td>
                      <td className="py-2 text-center text-red-400 font-medium">3 months</td>
                      <td className="py-2 text-center text-red-400 font-medium">3 months</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Industrial</td>
                      <td className="py-2 text-center text-amber-400">6-12 months</td>
                      <td className="py-2 text-center text-amber-400">6-12 months</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Commercial kitchen</td>
                      <td className="py-2 text-center text-amber-400">6 months</td>
                      <td className="py-2 text-center text-amber-400">12 months</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Schools</td>
                      <td className="py-2 text-center">12 months</td>
                      <td className="py-2 text-center">24 months</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Hotels</td>
                      <td className="py-2 text-center">12 months</td>
                      <td className="py-2 text-center">24 months</td>
                    </tr>
                    <tr>
                      <td className="py-2">Office (IT equipment)</td>
                      <td className="py-2 text-center text-green-400">24 months</td>
                      <td className="py-2 text-center text-green-400">48 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white/60 text-xs mt-3 italic">
                Based on IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment (5th Edition)
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold text-sm">Factors Requiring Shorter Intervals</h4>
                  <ul className="text-white/70 text-sm mt-2 space-y-1">
                    <li>• Equipment moved frequently or transported</li>
                    <li>• Equipment used by the public</li>
                    <li>• History of damage or failures</li>
                    <li>• High-risk activities (medical, construction)</li>
                    <li>• Hire equipment returned from unknown use</li>
                  </ul>
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
                Environmental Assessment Checklist
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">1.</span>
                  <span>Identify all environmental hazards present</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">2.</span>
                  <span>Check equipment IP ratings match environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">3.</span>
                  <span>Verify appropriate class for conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">4.</span>
                  <span>Confirm RCD protection where required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">5.</span>
                  <span>Set testing frequency based on risk assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">6.</span>
                  <span>Document environmental conditions in records</span>
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
              Quick Reference: Environment Risk Levels
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded-lg">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white text-sm"><strong>Low Risk:</strong> Office, hotel rooms - 24-48 months</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-amber-500/10 rounded-lg">
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                <span className="text-white text-sm"><strong>Medium Risk:</strong> Schools, workshops, kitchens - 6-12 months</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-red-500/10 rounded-lg">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-white text-sm"><strong>High Risk:</strong> Construction sites, heavy industry - 3 months</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Section 4 Quiz: Environmental Considerations"
            questions={quizQuestions}
            moduleId="pat-m3s4"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-white/10">
          <Link to="../pat-testing-module-3-section-3" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto gap-2 border-white/20 text-white hover:bg-white/5 hover:text-elec-yellow min-h-[48px] touch-manipulation active:scale-[0.98]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous: Section 3</span>
            </Button>
          </Link>
          <Link to="../pat-testing-module-3-section-5" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold min-h-[48px] touch-manipulation active:scale-[0.98]"
            >
              <span>Next: Section 5</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default PATTestingModule3Section4;
