import { ArrowLeft, Target, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "You need to install cable tray in a corridor that is 1.0m wide. Which tower width should you choose?",
    options: [
      "Double-width (1.35m) for maximum stability",
      "Single-width (0.7m) to fit the available space",
      "Either width — both will fit",
      "Use a ladder instead — no tower will fit"
    ],
    correctAnswer: 1,
    explanation: "A single-width tower at 0.7m fits comfortably in a 1.0m corridor with clearance either side. A double-width tower at 1.35m is wider than the corridor and cannot be used. Always measure the available space first."
  },
  {
    id: 2,
    question: "What is the FIRST factor you should consider when selecting a tower for an outdoor job?",
    options: [
      "The colour of the tower",
      "The wind conditions and weather forecast",
      "Whether the tower has a warranty",
      "The brand name of the tower"
    ],
    correctAnswer: 1,
    explanation: "For outdoor work, wind conditions are the primary concern. Check the weather forecast, assess current conditions, and plan for gusts. Wind loading affects the maximum permissible height and determines whether stabilisers are required."
  },
  {
    id: 3,
    question: "You are working in a data centre with live server racks either side. What tower material must you use?",
    options: [
      "Standard aluminium",
      "Steel",
      "GRP (fibreglass)",
      "Any material is acceptable"
    ],
    correctAnswer: 2,
    explanation: "GRP (fibreglass) must be used when there is any risk of the tower contacting live electrical equipment. Data centres have live power distribution throughout, making a non-conductive tower essential for safety."
  },
  {
    id: 4,
    question: "You need to reach a ceiling-mounted smoke detector 5m above a staircase. Which tower type is most appropriate?",
    options: [
      "Standard double-width aluminium tower",
      "Folding low-level tower",
      "Stairwell tower with adjustable legs",
      "Single-width aluminium tower on the landing"
    ],
    correctAnswer: 2,
    explanation: "A stairwell tower with adjustable legs is the correct choice. The independently adjustable legs allow the tower to sit level on the staircase, providing a safe platform at the required height. Standard towers cannot be safely levelled on stairs."
  },
  {
    id: 5,
    question: "Two electricians need to work side by side installing a large cable containment system at 4m height in a warehouse. Which configuration is best?",
    options: [
      "Two single-width towers side by side",
      "One double-width aluminium tower",
      "Two folding low-level platforms",
      "One single-width tower — they can take turns"
    ],
    correctAnswer: 1,
    explanation: "A double-width tower provides sufficient platform area for two operatives to work side by side with their tools and materials. The 1.35m width gives enough room for comfortable working, and the platform load must be checked against the 275kg limit."
  },
  {
    id: 6,
    question: "You need to change four ceiling light fittings in a small office with a 2.7m ceiling. What is the most practical access equipment?",
    options: [
      "Full-height double-width tower",
      "Stairwell tower",
      "Folding or low-level tower/platform",
      "GRP tower"
    ],
    correctAnswer: 2,
    explanation: "A folding or low-level tower is ideal for this task. The ceiling is low (2.7m), the work is light (fitting changes), and the tower needs frequent repositioning between the four fittings. A full-height tower would be impractical and overkill for this application."
  },
  {
    id: 7,
    question: "When selecting a tower for outdoor use, what additional equipment is typically required compared to indoor use?",
    options: [
      "Larger platforms",
      "Stabilisers or outriggers",
      "Taller guardrails",
      "Heavier castors"
    ],
    correctAnswer: 1,
    explanation: "Outdoor towers typically require stabilisers or outriggers to provide additional stability against wind loading. The manufacturer's instructions will specify when stabilisers are required — this is usually at lower heights for outdoor use compared to indoor use."
  },
  {
    id: 8,
    question: "A client asks you to install lighting in a swimming pool hall with high humidity and a chlorinated atmosphere. What should you consider when selecting the tower?",
    options: [
      "Only the height requirement matters",
      "Use a GRP tower to avoid corrosion and electrical risks in the damp environment",
      "Any aluminium tower is fine — aluminium does not corrode",
      "Towers cannot be used in swimming pool halls"
    ],
    correctAnswer: 1,
    explanation: "A GRP tower is the best choice for swimming pool environments. The high humidity and chlorinated atmosphere can accelerate corrosion of aluminium components and create electrical hazard risks. GRP is also non-conductive, important in a wet environment with electrical installations."
  }
];

const quickCheckQuestions = [
  {
    id: "indoor-outdoor-choice",
    question: "You are installing external security lighting on a building fascia at 6m height. The weather forecast shows gusts of 15 mph. Can you proceed?",
    options: [
      "Yes — 15 mph is below the Beaufort 4 threshold",
      "No — outdoor work requires zero wind",
      "Yes — but only with stabilisers fitted",
      "Yes — 15 mph is fine, but monitor for increases"
    ],
    correctIndex: 3,
    explanation: "15 mph is Beaufort Force 3 (gentle breeze), which is below the Beaufort 4 cease-work threshold of 17 mph. You can proceed but must monitor conditions closely, as gusts may be higher than the sustained wind speed. Stabilisers will be required for outdoor use at 6m — check the manufacturer's manual."
  },
  {
    id: "load-class-check",
    question: "You need to position 120kg of cable drums on the platform alongside yourself (85kg). Before climbing, what should you calculate?",
    options: [
      "The cost of the cable",
      "The total platform load (85 + 120 = 205kg) against the 275kg limit",
      "The length of cable needed",
      "How many drums will fit on the platform"
    ],
    correctIndex: 1,
    explanation: "Before climbing, always calculate the total platform load. In this case: 85kg (you) + 120kg (cable drums) = 205kg, which is within the 275kg per-platform limit. You have 70kg of remaining capacity for tools and other materials. Always do this calculation before loading the tower."
  },
  {
    id: "access-type-selection",
    question: "An 8-storey residential block requires emergency lighting installation in all stairwells. What combination of tower types would you plan for?",
    options: [
      "One large double-width tower for all areas",
      "Stairwell towers for stairs, plus standard towers for landing corridors",
      "Folding towers throughout — they are the easiest to move",
      "Ladders for the stairs, towers only for the landings"
    ],
    correctIndex: 1,
    explanation: "This job requires stairwell towers (with adjustable legs) for the staircase areas and standard towers for the flat landing corridors. Using the right type for each location ensures safe, stable access throughout the building. Ladders on stairs are extremely hazardous and should never be used."
  }
];

const faqs = [
  {
    question: "How do I decide between a single-width and double-width tower for a specific job?",
    answer: "Consider four factors: (1) Available space — measure the work area, doorways, and access routes; (2) Number of operatives — double-width for two people working simultaneously; (3) Materials and tools — double-width provides more workspace for spreading out; (4) Required height — double-width towers can typically reach higher. If in doubt and the space allows it, double-width is the safer and more productive choice."
  },
  {
    question: "Can I use the same tower indoors and outdoors?",
    answer: "Yes, the same tower can be used in both locations, but the maximum permissible height will be different. Outdoor use typically has a lower maximum height than indoor use for the same configuration because of wind loading. Stabilisers may be required outdoors at heights where they are not needed indoors. Always check the manufacturer's instruction manual for the specific limits."
  },
  {
    question: "What if no standard tower type seems to fit my job?",
    answer: "If none of the standard tower types are suitable, do not improvise. Consult with the tower manufacturer or a scaffolding specialist. They may have a bespoke solution or can advise on alternative access equipment such as MEWPs (Mobile Elevating Work Platforms), rope access, or traditional scaffolding. The wrong tower for the job is more dangerous than no tower at all."
  },
  {
    question: "Should I always choose the largest tower available for maximum safety?",
    answer: "No. A larger tower is not automatically safer. Using a tower that is too large for the space can create hazards — it may not fit properly, obstruct escape routes, or prove difficult to manoeuvre into position. The safest tower is the one that is correctly matched to the task, environment, and conditions. This is why proper planning and selection is essential."
  }
];

const IpafModule2Section4 = () => {
  useSEO({
    title: "Selecting the Right Tower | IPAF Module 2 Section 4",
    description: "Learn how to select the correct mobile access tower for any job — matching tower type to task, environment, height, load, and access requirements.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centered Header */}
        <div className="mb-12 text-center">
          <Target className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 2 — Section 4
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Selecting the Right Tower
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Matching the tower type to the task, environment, and conditions — getting it right first time
          </p>
        </div>

        {/* Section 01: Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-base text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Indoor vs outdoor:</strong> Outdoor needs wind assessment + stabilisers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Width:</strong> Single for narrow spaces, double for bigger jobs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Height:</strong> Check manufacturer limits for your configuration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Load:</strong> Calculate total platform load before selecting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Material:</strong> GRP near live electrics, aluminium otherwise.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Access:</strong> Stairwell towers for stairs, folding for low heights.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-base text-elec-yellow mb-2">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Survey:</strong> Measure the workspace before ordering the tower.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Plan:</strong> Consider all tasks, not just the first one.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Check:</strong> Floor condition, overhead clearance, access routes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Confirm:</strong> Tower system matches the manufacturer manual on site.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply a systematic approach to tower selection for any given task</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify the key factors: indoor/outdoor, height, width, load, material, and access type</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Explain how environmental conditions influence tower selection</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Match common electrical tasks to appropriate tower types</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Use the decision flowchart to select the correct tower for a given scenario</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise when a tower is not the appropriate access solution</span>
            </li>
          </ul>
        </section>

        {/* Section 03: Decision Flowchart */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Tower Selection Flowchart
            </h2>
            <p className="text-white mb-6">
              Use this decision flowchart to guide your tower selection. Work through each question in order
              to arrive at the correct tower type for your job.
            </p>

            {/* Inline SVG Decision Flowchart */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6 mb-6">
              <svg className="w-full max-w-lg mx-auto" viewBox="0 0 560 820" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Title */}
                <text x="280" y="28" textAnchor="middle" fill="#facc15" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Tower Selection Decision Flowchart</text>

                {/* START node */}
                <rect x="205" y="48" width="150" height="36" rx="18" fill="#facc15" fillOpacity="0.2" stroke="#facc15" strokeWidth="2" />
                <text x="280" y="71" textAnchor="middle" fill="#facc15" fontSize="12" fontFamily="sans-serif" fontWeight="bold">START: Assess Task</text>

                {/* Arrow down */}
                <line x1="280" y1="84" x2="280" y2="110" stroke="#9ca3af" strokeWidth="1.5" />
                <polygon points="276,108 284,108 280,116" fill="#9ca3af" />

                {/* Diamond 1: Indoor or Outdoor? */}
                <polygon points="280,120 400,165 280,210 160,165" fill="#facc15" fillOpacity="0.15" stroke="#facc15" strokeWidth="2" />
                <text x="280" y="161" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Indoor or</text>
                <text x="280" y="175" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Outdoor?</text>

                {/* Left path: Indoor */}
                <line x1="160" y1="165" x2="80" y2="165" stroke="#22c55e" strokeWidth="1.5" />
                <text x="120" y="157" textAnchor="middle" fill="#22c55e" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Indoor</text>
                <line x1="80" y1="165" x2="80" y2="195" stroke="#22c55e" strokeWidth="1.5" />
                <polygon points="76,193 84,193 80,201" fill="#22c55e" />

                {/* Indoor box */}
                <rect x="20" y="204" width="120" height="36" rx="6" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1.5" />
                <text x="80" y="220" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="sans-serif">No wind loading.</text>
                <text x="80" y="232" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="sans-serif">Higher max height.</text>

                {/* Right path: Outdoor */}
                <line x1="400" y1="165" x2="480" y2="165" stroke="#f97316" strokeWidth="1.5" />
                <text x="440" y="157" textAnchor="middle" fill="#f97316" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Outdoor</text>
                <line x1="480" y1="165" x2="480" y2="195" stroke="#f97316" strokeWidth="1.5" />
                <polygon points="476,193 484,193 480,201" fill="#f97316" />

                {/* Outdoor box */}
                <rect x="420" y="204" width="120" height="36" rx="6" fill="#f97316" fillOpacity="0.15" stroke="#f97316" strokeWidth="1.5" />
                <text x="480" y="220" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="sans-serif">Check wind forecast.</text>
                <text x="480" y="232" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="sans-serif">Stabilisers likely.</text>

                {/* Merge arrows back to centre */}
                <line x1="80" y1="240" x2="80" y2="270" stroke="#9ca3af" strokeWidth="1" />
                <line x1="80" y1="270" x2="280" y2="270" stroke="#9ca3af" strokeWidth="1" />
                <line x1="480" y1="240" x2="480" y2="270" stroke="#9ca3af" strokeWidth="1" />
                <line x1="480" y1="270" x2="280" y2="270" stroke="#9ca3af" strokeWidth="1" />
                <line x1="280" y1="270" x2="280" y2="290" stroke="#9ca3af" strokeWidth="1.5" />
                <polygon points="276,288 284,288 280,296" fill="#9ca3af" />

                {/* Diamond 2: Near live electrics? */}
                <polygon points="280,300 400,345 280,390 160,345" fill="#facc15" fillOpacity="0.15" stroke="#facc15" strokeWidth="2" />
                <text x="280" y="341" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Near live</text>
                <text x="280" y="355" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">electrics?</text>

                {/* Yes path to GRP */}
                <line x1="400" y1="345" x2="480" y2="345" stroke="#22c55e" strokeWidth="1.5" />
                <text x="440" y="337" textAnchor="middle" fill="#22c55e" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Yes</text>

                {/* GRP outcome */}
                <rect x="420" y="326" width="120" height="38" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="480" y="343" textAnchor="middle" fill="#3b82f6" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Use GRP</text>
                <text x="480" y="356" textAnchor="middle" fill="#3b82f6" fontSize="10" fontFamily="sans-serif">(fibreglass)</text>

                {/* No path continues down */}
                <line x1="280" y1="390" x2="280" y2="420" stroke="#9ca3af" strokeWidth="1.5" />
                <text x="290" y="408" fill="#f97316" fontSize="10" fontFamily="sans-serif" fontWeight="bold">No</text>
                <polygon points="276,418 284,418 280,426" fill="#9ca3af" />

                {/* Diamond 3: On stairs/slope? */}
                <polygon points="280,430 400,475 280,520 160,475" fill="#facc15" fillOpacity="0.15" stroke="#facc15" strokeWidth="2" />
                <text x="280" y="471" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">On stairs</text>
                <text x="280" y="485" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">or slope?</text>

                {/* Yes path to Stairwell */}
                <line x1="400" y1="475" x2="480" y2="475" stroke="#22c55e" strokeWidth="1.5" />
                <text x="440" y="467" textAnchor="middle" fill="#22c55e" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Yes</text>

                {/* Stairwell outcome */}
                <rect x="420" y="456" width="120" height="38" rx="6" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="1.5" />
                <text x="480" y="473" textAnchor="middle" fill="#a855f7" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Stairwell Tower</text>
                <text x="480" y="486" textAnchor="middle" fill="#a855f7" fontSize="10" fontFamily="sans-serif">(adjustable legs)</text>

                {/* No path continues down */}
                <line x1="280" y1="520" x2="280" y2="550" stroke="#9ca3af" strokeWidth="1.5" />
                <text x="290" y="538" fill="#f97316" fontSize="10" fontFamily="sans-serif" fontWeight="bold">No</text>
                <polygon points="276,548 284,548 280,556" fill="#9ca3af" />

                {/* Diamond 4: Height needed? */}
                <polygon points="280,560 400,605 280,650 160,605" fill="#facc15" fillOpacity="0.15" stroke="#facc15" strokeWidth="2" />
                <text x="280" y="601" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Platform</text>
                <text x="280" y="615" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">{"<"}2.5m?</text>

                {/* Yes path to Folding */}
                <line x1="160" y1="605" x2="80" y2="605" stroke="#22c55e" strokeWidth="1.5" />
                <text x="120" y="597" textAnchor="middle" fill="#22c55e" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Yes</text>

                {/* Folding outcome */}
                <rect x="20" y="586" width="120" height="38" rx="6" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="80" y="603" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Folding / Low-</text>
                <text x="80" y="616" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="sans-serif">Level Tower</text>

                {/* No path continues down */}
                <line x1="280" y1="650" x2="280" y2="680" stroke="#9ca3af" strokeWidth="1.5" />
                <text x="290" y="668" fill="#f97316" fontSize="10" fontFamily="sans-serif" fontWeight="bold">No</text>
                <polygon points="276,678 284,678 280,686" fill="#9ca3af" />

                {/* Diamond 5: Space >1m wide? */}
                <polygon points="280,690 390,725 280,760 170,725" fill="#facc15" fillOpacity="0.15" stroke="#facc15" strokeWidth="2" />
                <text x="280" y="721" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Space</text>
                <text x="280" y="735" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">{">"}1.5m wide?</text>

                {/* Yes: Double-width */}
                <line x1="390" y1="725" x2="465" y2="725" stroke="#22c55e" strokeWidth="1.5" />
                <text x="428" y="717" textAnchor="middle" fill="#22c55e" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Yes</text>

                <rect x="420" y="706" width="120" height="38" rx="6" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="1.5" />
                <text x="480" y="723" textAnchor="middle" fill="#22c55e" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Double-Width</text>
                <text x="480" y="736" textAnchor="middle" fill="#22c55e" fontSize="10" fontFamily="sans-serif">Aluminium Tower</text>

                {/* No: Single-width */}
                <line x1="170" y1="725" x2="95" y2="725" stroke="#f97316" strokeWidth="1.5" />
                <text x="133" y="717" textAnchor="middle" fill="#f97316" fontSize="10" fontFamily="sans-serif" fontWeight="bold">No</text>

                <rect x="20" y="706" width="120" height="38" rx="6" fill="#f97316" fillOpacity="0.2" stroke="#f97316" strokeWidth="1.5" />
                <text x="80" y="723" textAnchor="middle" fill="#f97316" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Single-Width</text>
                <text x="80" y="736" textAnchor="middle" fill="#f97316" fontSize="10" fontFamily="sans-serif">Aluminium Tower</text>

                {/* Footer note */}
                <text x="280" y="790" textAnchor="middle" fill="#9ca3af" fontSize="10" fontFamily="sans-serif">Always verify your selection against the</text>
                <text x="280" y="805" textAnchor="middle" fill="#facc15" fontSize="10" fontFamily="sans-serif" fontWeight="bold">manufacturer's instruction manual</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Section 04: Indoor vs Outdoor */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">04</span>
              Indoor vs Outdoor Considerations
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The first major decision when selecting a tower is whether it will be used indoors or outdoors.
                This single factor affects almost every other aspect of the selection, from maximum height to
                the need for stabilisers.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Indoor Use</h3>
                  <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>No wind loading:</strong> Higher maximum heights permitted</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Controlled surface:</strong> Floors are usually flat and firm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Stabilisers:</strong> May not be required at lower heights (check manual)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Weather:</strong> Not a factor for stability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Space constraints:</strong> Doorways, corridors, low ceilings may limit options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Floor loading:</strong> Check raised floors can take the weight</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Outdoor Use</h3>
                  <div className="bg-white/5 border border-orange-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Wind loading:</strong> Major factor — lower max heights apply</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Weather dependent:</strong> Rain, ice, and wind affect safety</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Stabilisers:</strong> Almost always required for outdoor use</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Ground conditions:</strong> May be uneven, soft, or sloping</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Lighting:</strong> Daylight hours may limit working time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span><strong>Security:</strong> Tower may need to be secured overnight</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Semi-Outdoor Locations</h3>
                <p className="text-white/80 text-sm">
                  Some locations fall between indoor and outdoor — car parks, covered loading bays, open-sided
                  buildings, and buildings under construction. These are generally treated as outdoor locations
                  for tower selection purposes because wind can still affect the tower. When in doubt, apply
                  the outdoor criteria.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: Height Requirements */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">05</span>
              Height Requirements
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The working height you need to reach determines the platform height, which in turn determines
                the tower configuration. Remember: the platform height is not the same as the reach height.
                A person standing on a platform can typically reach approximately 2m above the platform level.
              </p>

              <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-2">Calculating Platform Height</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-white/80">
                    <strong className="text-white">Working height</strong> = Platform height + person's reach (approximately 2m)
                  </p>
                  <p className="text-white/80">
                    <strong className="text-white">Example:</strong> To work at 6m height, you need a platform at approximately 4m.
                  </p>
                  <p className="text-white/80">
                    <strong className="text-white">Note:</strong> Do not stand on the guardrail, toolbox, or any improvised platform to
                    gain extra height. If you cannot reach, you need a higher tower.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Height Limits — A General Guide</h3>
                <p className="text-white/60 text-xs mb-3">
                  These are approximate. Always check the manufacturer's specific data for your tower system.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-2 text-white/80">
                    <span className="font-semibold text-white">Configuration</span>
                    <span className="font-semibold text-white text-center">Indoor</span>
                    <span className="font-semibold text-white text-center">Outdoor</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 grid grid-cols-3 gap-2 text-white/80">
                    <span>Single-width, no stabilisers</span>
                    <span className="text-center">~4m</span>
                    <span className="text-center">~2.5m</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-white/80">
                    <span>Single-width, with stabilisers</span>
                    <span className="text-center">~6m</span>
                    <span className="text-center">~4m</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-white/80">
                    <span>Double-width, no stabilisers</span>
                    <span className="text-center">~6m</span>
                    <span className="text-center">~4m</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-white/80">
                    <span>Double-width, with stabilisers</span>
                    <span className="text-center">~12m</span>
                    <span className="text-center">~8m</span>
                  </div>
                </div>
              </div>

              <p>
                If the required platform height exceeds the maximum for any tower configuration, you may need to
                consider alternative access equipment such as a MEWP (cherry picker), traditional scaffolding,
                or a combination of solutions. Do not attempt to exceed the manufacturer's maximum height.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Load & Width Selection */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">06</span>
              Load Requirements & Width Selection
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The weight of personnel, tools, and materials you need on the platform determines both the
                width and the type of tower you need. Remember the 275kg per-platform limit.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-2">Load Planning Checklist</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Count the operatives:</strong> How many people will be on the platform simultaneously? Add their weights.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong>List the tools:</strong> Power tools, hand tools, test instruments — weigh them or estimate.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Assess materials:</strong> Cable drums, containment, luminaires, fixings — weigh the heaviest items.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Add it all up:</strong> Total must be under 275kg. If it exceeds this, reduce the load or make multiple trips.</div>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-2">Choose Single-Width When:</h4>
                  <ul className="text-white space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Space is less than 1.5m wide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Tower must pass through standard doorways</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Only one operative on the platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Light materials and tools only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Quick repositioning is needed</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-2">Choose Double-Width When:</h4>
                  <ul className="text-white space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Space allows 1.5m+ width</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Two operatives needed on the platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Heavy materials (cable drums, luminaires)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Extended working periods (more comfort)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Greater height is required</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 07: Environmental Considerations */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">07</span>
              Environmental Considerations
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The environment where the tower will be used can significantly affect your selection. Beyond the
                basic indoor/outdoor distinction, several environmental factors must be assessed during planning.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h4 className="text-amber-300 font-medium mb-2">Floor/Ground Conditions</h4>
                  <ul className="text-white space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Raised access floors:</strong> May not support tower weight — check floor tile loading</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Soft ground:</strong> Use base plates or spreader boards to distribute load</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Slopes:</strong> Use adjustable legs or stairwell towers — never pack under castors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Wet surfaces:</strong> Ensure castors and stabilisers grip safely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Fragile surfaces:</strong> Glass roofs, ceiling tiles — tower must be on the structural floor</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h4 className="text-amber-300 font-medium mb-2">Overhead Hazards</h4>
                  <ul className="text-white space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Overhead power lines:</strong> Maintain safe exclusion zones — consult the DNO if in doubt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Low beams and pipes:</strong> Measure clearance before selecting tower height</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Moving equipment:</strong> Overhead cranes, conveyors — establish a safe system of work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Falling objects:</strong> Other work happening above? Use a fan or crash deck</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h4 className="text-amber-300 font-medium mb-2">Special Environments</h4>
                  <ul className="text-white space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Wet/humid:</strong> Swimming pools, food processing — use GRP, check for corrosion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Dusty/dirty:</strong> Construction sites — clean components, check brakes work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Chemical exposure:</strong> Laboratories, industrial — check material compatibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Extreme temperature:</strong> Cold stores, furnace areas — material properties may change</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Common Electrical Scenarios */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">08</span>
              Common Electrical Scenarios — Tower Selection Guide
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The following table maps common electrical tasks to recommended tower configurations. Use this as
                a starting point, then verify against the manufacturer's instructions and your site-specific
                risk assessment.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-1">Warehouse Lighting Installation</h4>
                  <p className="text-white/80 text-sm"><strong className="text-white">Recommended:</strong> Double-width aluminium tower with stabilisers. Height will depend on the warehouse — typically 6-10m platforms.</p>
                  <p className="text-white/60 text-xs mt-1">Two operatives often needed. Heavy luminaires and cable drums on platform.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-1">Switchroom Cable Tray Installation</h4>
                  <p className="text-white/80 text-sm"><strong className="text-white">Recommended:</strong> GRP single-width tower. Live switchgear present — non-conductive material essential.</p>
                  <p className="text-white/60 text-xs mt-1">Narrow aisles between switchgear panels. Single-width fits the space.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-1">Stairwell Emergency Lighting</h4>
                  <p className="text-white/80 text-sm"><strong className="text-white">Recommended:</strong> Stairwell tower with adjustable legs. Must sit level on the stairs.</p>
                  <p className="text-white/60 text-xs mt-1">Single operative with light tools. Multiple positions needed on each floor.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-1">Office Ceiling Sensor Installation</h4>
                  <p className="text-white/80 text-sm"><strong className="text-white">Recommended:</strong> Folding or low-level tower. Standard office ceiling at 2.7m — platform height under 1m needed.</p>
                  <p className="text-white/60 text-xs mt-1">Quick repositioning between sensors. Compact storage between uses.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-1">External CCTV Installation</h4>
                  <p className="text-white/80 text-sm"><strong className="text-white">Recommended:</strong> Double-width aluminium tower with stabilisers. Outdoor use — check wind and ground conditions.</p>
                  <p className="text-white/60 text-xs mt-1">Monitor weather throughout. May need to secure tower overnight between installation days.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-1">Data Centre Containment Work</h4>
                  <p className="text-white/80 text-sm"><strong className="text-white">Recommended:</strong> GRP single-width tower. Live power distribution present. Narrow aisles between server racks.</p>
                  <p className="text-white/60 text-xs mt-1">Check raised floor loading. Controlled environment — indoor conditions apply.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 09: Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Practical Tower Selection Pocket Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Pre-Selection Checklist</h3>
                <ul className="space-y-1 text-white/80">
                  <li>&#9744; Measure available workspace (width, length, height)</li>
                  <li>&#9744; Identify access routes (doorways, lifts, corridors)</li>
                  <li>&#9744; Check floor/ground conditions and loading</li>
                  <li>&#9744; Assess for electrical hazards (GRP needed?)</li>
                  <li>&#9744; Check for stairs/slopes (stairwell tower needed?)</li>
                  <li>&#9744; Determine indoor or outdoor use</li>
                  <li>&#9744; Calculate platform load (people + tools + materials)</li>
                  <li>&#9744; Check weather forecast for outdoor work</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Quick Decision Rules</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Near live electrics?</strong> GRP only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">On stairs?</strong> Stairwell tower only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Under 2.5m?</strong> Consider folding tower</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Narrow space?</strong> Single-width</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Two people?</strong> Double-width</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Common Mistakes to Avoid</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Ordering without measuring the workspace first</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Ignoring access routes (tower will not fit through the door)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Using aluminium near live electrical equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Packing under legs instead of using adjustable stairwell tower</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Forgetting to check the weather for outdoor work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Not calculating platform load before work begins</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">When a Tower Is Not Enough</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Height exceeds manufacturer's maximum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>No suitable ground/floor to support the tower</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Work area cannot accommodate any tower footprint</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Continuous movement needed (consider MEWP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Very heavy loads exceed tower capacity</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz
            title="Selecting the Right Tower Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Stability & Safe Working Loads
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-3">
              Next: Module 3 — Assembly & Dismantling
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IpafModule2Section4;
