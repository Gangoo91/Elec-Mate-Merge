import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
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
    id: 1,
    question: "What does the first digit in an IP rating indicate?",
    options: ["Water ingress protection", "Solid object/dust ingress protection", "Impact resistance", "Temperature rating"],
    correctAnswer: 1,
    explanation: "The first digit indicates protection against solid objects and dust ingress."
  },
  {
    id: 2,
    question: "Which environment typically requires the shortest PAT testing intervals?",
    options: ["Hotel rooms", "Office environments", "Construction sites", "Schools (classrooms)"],
    correctAnswer: 2,
    explanation: "Construction sites require the most frequent testing due to harsh conditions."
  },
  {
    id: 3,
    question: "What additional protection is recommended for equipment used in wet conditions?",
    options: ["A larger fuse", "RCD protection (30mA or less)", "A longer cable", "A metal enclosure"],
    correctAnswer: 1,
    explanation: "RCD protection of 30mA or less provides personal protection in wet conditions."
  },
  {
    id: 4,
    question: "In an industrial environment with conductive dust, what class of equipment is preferred?",
    options: ["Class I with good earthing", "Class II (double insulated)", "Class 0 (unprotected)", "Any class is equally suitable"],
    correctAnswer: 1,
    explanation: "Class II double insulated equipment is preferred as it doesn't rely on earthing which can be compromised by conductive dust."
  },
  {
    id: 5,
    question: "What does IP65 rating mean?",
    options: ["Protected against dust and low-pressure water jets", "Protected against fingers and dripping water", "Protected against tools and splashing water", "No specific protection"],
    correctAnswer: 0,
    explanation: "IP65 means dust tight (6) and protected against water jets (5)."
  },
  {
    id: 6,
    question: "Which factor does NOT typically increase the required testing frequency?",
    options: ["Equipment moved frequently", "Hostile environment (dust, moisture)", "Equipment used in a clean office", "Equipment used by the public"],
    correctAnswer: 2,
    explanation: "Clean office environments allow for longer testing intervals."
  },
  {
    id: 7,
    question: "For equipment used in a commercial kitchen, what environmental hazards should be considered?",
    options: ["Water, heat, grease, and frequent cleaning", "Only water exposure", "Only heat exposure", "Only dust exposure"],
    correctAnswer: 0,
    explanation: "Commercial kitchens present multiple hazards including water, heat, grease, and cleaning chemicals."
  },
  {
    id: 8,
    question: "What is the centre-tap voltage to earth in a 110V construction site system?",
    options: ["110V", "220V", "55V", "0V"],
    correctAnswer: 2,
    explanation: "The centre-tapped transformer limits voltage to earth to 55V maximum."
  },
  {
    id: 9,
    question: "Which environment would typically allow the longest testing interval?",
    options: ["Building site", "Hotel with housekeeping equipment", "Office with IT equipment (double insulated)", "School science laboratory"],
    correctAnswer: 2,
    explanation: "Offices with IT equipment in controlled conditions allow the longest intervals."
  },
  {
    id: 10,
    question: "What should you check when inspecting equipment used in dusty environments?",
    options: ["Only the cable condition", "Ventilation slots are clear, seals intact, no dust ingress to internals", "Only the plug wiring", "Only the fuse rating"],
    correctAnswer: 1,
    explanation: "Dusty environments require checking ventilation, seals, and for dust ingress."
  }
];

const faqs = [
  {
    question: "How do I determine the correct IP rating for a specific environment?",
    answer: "Consider the specific hazards present: For dry offices, IP20 is sufficient. For kitchens and bathrooms, IP44 minimum. For outdoor use, IP44-IP65 depending on exposure. For jet washing or immersion risk, IP65-IP68. Always check manufacturer specifications and relevant regulations for specific applications."
  },
  {
    question: "Can I use standard office equipment on a construction site?",
    answer: "Generally no. Construction sites require 110V equipment for safety, appropriate IP ratings for the conditions, and more robust construction to withstand the environment. Standard 230V office equipment would also require more frequent testing and may not meet site safety requirements. Always check site-specific rules."
  },
  {
    question: "What about equipment used in different environments at different times?",
    answer: "The testing frequency should be based on the most demanding environment in which the equipment is used. For example, if a drill is occasionally used outdoors but mainly in a workshop, it should be tested at the frequency appropriate for outdoor/construction use. Document all environments where equipment is used."
  },
  {
    question: "How does temperature affect PAT testing requirements?",
    answer: "Extreme temperatures affect insulation and cable flexibility. In cold environments, cables become brittle and prone to cracking. In hot environments, insulation may degrade faster. Equipment in extreme temperatures may need more frequent visual inspection. Some test equipment may also require temperature compensation for accurate readings."
  },
  {
    question: "Are there specific requirements for equipment in food preparation areas?",
    answer: "Yes. Equipment must be suitable for wash-down where applicable (appropriate IP rating), resistant to cleaning chemicals, and designed for food safety. More frequent inspection is needed due to water and chemical exposure. Cables may deteriorate faster due to cleaning regimes. Check food hygiene regulations as well as electrical safety requirements."
  },
  {
    question: "What about equipment in zones with explosive atmospheres (ATEX)?",
    answer: "Explosive atmosphere zones require specially certified equipment meeting ATEX/IECEx standards. Standard PAT testing is not sufficient - specialist inspection by trained personnel is required. Never use non-ATEX equipment in these zones. This is beyond the scope of standard PAT testing and requires specialist knowledge."
  }
];

const PATTestingModule3Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-3">
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
            <span>Module 3 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Environmental Considerations
          </h1>
          <p className="text-white/80">
            Wet, industrial, office, and construction site requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>IP Rating:</strong> First digit = solids, second = water</li>
              <li><strong>Construction:</strong> 110V, 3-month testing, IP44+</li>
              <li><strong>Office:</strong> Up to 48-month intervals for IT</li>
              <li><strong>Wet areas:</strong> RCD protection essential</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Check IP rating matches environment</li>
              <li><strong>Use:</strong> Harsh environment = shorter test intervals</li>
              <li><strong>Remember:</strong> 110V on sites limits voltage to 55V to earth</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand IP ratings and their meaning",
              "Assess wet and damp environment risks",
              "Identify industrial environment hazards",
              "Apply appropriate testing frequencies",
              "Recognise construction site requirements",
              "Select suitable equipment for each environment"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Understanding IP Ratings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding IP Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IP (Ingress Protection) ratings indicate how well equipment is protected against solid objects and water. Understanding these is essential for matching equipment to environments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">IP Rating Structure: IP XY</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>First Digit (X) - Solid Object Protection:</strong></li>
                <li>0 = No protection, 1 = Objects &gt;50mm (hand), 2 = Objects &gt;12mm (finger)</li>
                <li>3 = Objects &gt;2.5mm (tools), 4 = Objects &gt;1mm (wires)</li>
                <li>5 = Dust protected, 6 = Dust tight</li>
              </ul>
            </div>

            <div className="my-6">
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Second Digit (Y) - Water Protection:</strong></li>
                <li>0 = No protection, 1 = Vertical drips, 2 = Drips at 15° angle, 3 = Spraying water</li>
                <li>4 = Splashing water, 5 = Water jets, 6 = Powerful water jets</li>
                <li>7 = Temporary immersion, 8 = Continuous immersion</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common IP Ratings and Applications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>IP20:</strong> Finger-safe only. Indoor, dry locations. Most office equipment.</li>
                <li><strong>IP44:</strong> Splashproof. Bathrooms (outside zones), kitchens, outdoor sheltered.</li>
                <li><strong>IP54:</strong> Dust protected, splashproof. Industrial, outdoor equipment.</li>
                <li><strong>IP65:</strong> Dust tight, water jet protected. Outdoor, wash-down areas.</li>
                <li><strong>IP67:</strong> Dust tight, temporary immersion. Portable outdoor equipment.</li>
                <li><strong>IP68:</strong> Dust tight, continuous immersion. Submersible equipment.</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Wet and Damp Environments */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Wet and Damp Environments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Water significantly increases electrical risk. Lower body resistance when wet, conductive paths through moisture, and reduced insulation effectiveness all contribute to higher danger levels.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Examples of Wet Environments:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Commercial kitchens, bathrooms/changing rooms, swimming pools</li>
                <li>Laundries, car washes, breweries/food processing</li>
                <li>Outdoor events, farms and agriculture</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safety Requirements for Wet Areas:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Appropriate IP rating:</strong> Minimum IP44 for splash zones, higher for jet washing</li>
                <li><strong>RCD protection:</strong> 30mA or less for personal protection</li>
                <li><strong>Class II preferred:</strong> Double insulation avoids earth path through water</li>
                <li><strong>SELV/PELV where possible:</strong> Extra-low voltage in highest risk areas</li>
                <li><strong>Frequent inspection:</strong> Water accelerates deterioration</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Key Risks in Wet Environments:</strong> Reduced body resistance increases shock severity. Water provides conductive path bypassing insulation. Moisture ingress degrades internal components. Cleaning chemicals may attack cable insulation. Condensation inside equipment causes tracking.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03: Industrial Environments */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Industrial Environments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Industrial settings present multiple hazards including dust, chemicals, heat, vibration, and mechanical damage. Equipment must be robust and appropriate for the specific conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Industrial Hazard Categories:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Dust and Particulates:</strong> Conductive dust can cause tracking. Non-conductive dust blocks ventilation. Wood dust, metal filings, flour, etc. all pose risks.</li>
                <li><strong>Chemicals and Solvents:</strong> Attack cable insulation and plastic housings. Fumes may also affect components. Check material compatibility.</li>
                <li><strong>Heat and Temperature:</strong> Accelerates insulation degradation. Affects cable flexibility. May exceed equipment ratings near furnaces or ovens.</li>
                <li><strong>Vibration and Impact:</strong> Loosens connections over time. Causes conductor fatigue. Cable damage from movement.</li>
                <li><strong>Electromagnetic Interference:</strong> May affect sensitive equipment. Motors and welding create interference. Shielded cables may be needed.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Industrial Equipment Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Robust construction:</strong> Industrial-grade housings, reinforced cables</li>
                <li><strong>Appropriate IP rating:</strong> Typically IP54 minimum for dusty environments</li>
                <li><strong>Chemical-resistant materials:</strong> Where chemical exposure exists</li>
                <li><strong>Heat-rated cables:</strong> Near high-temperature processes</li>
                <li><strong>More frequent testing:</strong> 6-12 month intervals typical</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Office Environments */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Office Environments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Office environments are generally low-risk, with controlled conditions and mainly IT equipment. However, they still require appropriate attention to electrical safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Offices Are Lower Risk:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Controlled, dry environment</li>
                <li>Most IT equipment is Class II (double insulated)</li>
                <li>Equipment generally stationary, not moved frequently</li>
                <li>Trained staff, not public use</li>
                <li>Regular building maintenance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Office-Specific Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Personal appliances:</strong> Staff may bring heaters, fans, phone chargers that need checking</li>
                <li><strong>Cable management:</strong> Cables routed under desks can be damaged by chairs</li>
                <li><strong>Extension leads:</strong> Often overloaded or daisy-chained</li>
                <li><strong>Kitchen areas:</strong> Kettles, microwaves, fridges need more frequent attention</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05: Construction Sites */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Construction Sites
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Construction sites represent the highest-risk environment for portable electrical equipment. Special precautions, reduced voltage systems, and frequent testing are essential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Construction Sites Are High Risk:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Equipment subject to rough handling and mechanical damage</li>
                <li>Outdoor exposure to weather (rain, mud, extreme temperatures)</li>
                <li>Dust and debris contamination</li>
                <li>Cables run across traffic routes and work areas</li>
                <li>Heavy use of power tools with motors</li>
                <li>Temporary supply arrangements</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>110V Centre-Tapped Earth System:</strong> UK construction sites use 110V systems with a centre-tapped transformer. Maximum voltage to earth: 55V. This significantly reduces shock severity. Yellow plugs and sockets indicate 110V site tools.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Construction Site Testing Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>User visual check:</strong> Before each use</li>
                <li><strong>Formal visual inspection:</strong> Weekly</li>
                <li><strong>Combined inspection and test:</strong> 3 months</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Testing Frequency by Environment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Testing Frequency by Environment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The IET Code of Practice provides guidance on testing frequencies based on environment and equipment type. These are starting points - adjust based on specific conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Suggested Testing Intervals (Class I / Class II):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Construction site (110V):</strong> 3 months / 3 months</li>
                <li><strong>Industrial:</strong> 6-12 months / 6-12 months</li>
                <li><strong>Commercial kitchen:</strong> 6 months / 12 months</li>
                <li><strong>Schools:</strong> 12 months / 24 months</li>
                <li><strong>Hotels:</strong> 12 months / 24 months</li>
                <li><strong>Office (IT equipment):</strong> 24 months / 48 months</li>
              </ul>
              <p className="text-sm text-white mt-2">Based on IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment (5th Edition)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Factors Requiring Shorter Intervals:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Equipment moved frequently or transported</li>
                <li>Equipment used by the public</li>
                <li>History of damage or failures</li>
                <li>High-risk activities (medical, construction)</li>
                <li>Hire equipment returned from unknown use</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Identify all environmental hazards present</li>
                <li>2. Check equipment IP ratings match environment</li>
                <li>3. Verify appropriate class for conditions</li>
                <li>4. Confirm RCD protection where required</li>
                <li>5. Set testing frequency based on risk assessment</li>
                <li>6. Document environmental conditions in records</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using office equipment outdoors</strong> — IP20 is not suitable for wet conditions</li>
                <li><strong>Ignoring environmental changes</strong> — reassess when conditions change</li>
                <li><strong>Fixed intervals regardless of use</strong> — adjust based on actual risk</li>
                <li><strong>Not checking IP ratings</strong> — verify equipment matches environment</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Environment Risk Levels</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">LOW RISK</p>
                <ul className="space-y-0.5">
                  <li>Office, hotel rooms</li>
                  <li>24-48 month intervals</li>
                  <li>IP20 often sufficient</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">MEDIUM RISK</p>
                <ul className="space-y-0.5">
                  <li>Schools, workshops, kitchens</li>
                  <li>6-12 month intervals</li>
                  <li>IP44+ recommended</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">HIGH RISK</p>
                <ul className="space-y-0.5">
                  <li>Construction, heavy industry</li>
                  <li>3 month intervals</li>
                  <li>110V, IP54+, RCDs</li>
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

export default PATTestingModule3Section4;
