import { ArrowLeft, Wrench, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "What is the required minimum height for guardrails on a mobile access tower platform?",
    options: [
      "750mm above the platform",
      "850mm above the platform",
      "950mm above the platform",
      "1100mm above the platform"
    ],
    correctAnswer: 2,
    explanation: "Guardrails must be at least 950mm above the platform surface. This height is specified in BS EN 1004 and the Work at Height Regulations to prevent falls from the platform edge."
  },
  {
    id: 2,
    question: "At what height should mid-rails be fitted on a mobile access tower?",
    options: [
      "Exactly 470mm above the platform",
      "Exactly 475mm above the platform",
      "Approximately halfway between the platform and the guardrail — around 470mm",
      "There is no specific requirement for mid-rail height"
    ],
    correctAnswer: 2,
    explanation: "Mid-rails should be positioned approximately 470mm above the platform, roughly halfway between the toeboard and the guardrail. This prevents a person falling or sliding through the gap between the guardrail and the platform."
  },
  {
    id: 3,
    question: "What is the minimum height for toeboards on a mobile access tower?",
    options: [
      "50mm",
      "100mm",
      "150mm",
      "200mm"
    ],
    correctAnswer: 2,
    explanation: "Toeboards must be at least 150mm high. They prevent tools, materials, and debris from being kicked or falling off the platform edge, protecting anyone below the tower."
  },
  {
    id: 4,
    question: "What is the primary function of diagonal braces on a mobile access tower?",
    options: [
      "To provide a climbing route to the platform",
      "To prevent the tower from racking (swaying sideways)",
      "To support the weight of the platform",
      "To connect the stabilisers to the frames"
    ],
    correctAnswer: 1,
    explanation: "Diagonal braces (also called cross-braces) triangulate the tower structure, preventing it from racking — the sideways swaying motion that could cause the tower to collapse. Without diagonal braces, the tower has no lateral rigidity."
  },
  {
    id: 5,
    question: "What must you always do with castors before anyone climbs the tower?",
    options: [
      "Remove them completely",
      "Replace them with base plates",
      "Lock the brakes on all castors",
      "Grease the wheels for smooth operation"
    ],
    correctAnswer: 2,
    explanation: "All castor brakes must be locked before anyone climbs or works on the tower. Unlocked castors allow the tower to roll, which could cause it to move unexpectedly and tip over, especially on sloping surfaces."
  },
  {
    id: 6,
    question: "What is a spigot used for on a mobile access tower?",
    options: [
      "To lock castor brakes",
      "To connect frame sections together vertically",
      "To attach stabilisers to the base",
      "To secure the trapdoor in the platform"
    ],
    correctAnswer: 1,
    explanation: "Spigots are connecting pins that fit into the top of one frame section and allow the next frame section to sit on top, creating a secure vertical connection. They ensure the frames are correctly aligned and locked together."
  },
  {
    id: 7,
    question: "Why do tower platforms have trapdoors?",
    options: [
      "To allow ventilation inside the tower",
      "To reduce the weight of the platform",
      "To provide safe access through the platform whilst maintaining guardrail protection",
      "To allow tools to be passed up from below"
    ],
    correctAnswer: 2,
    explanation: "Trapdoors allow the operative to climb up through the platform from inside the tower. Once on the platform, the trapdoor is closed, maintaining a complete working surface and uninterrupted edge protection from the guardrails."
  },
  {
    id: 8,
    question: "What is the difference between stabilisers and outriggers?",
    options: [
      "There is no difference — the terms are interchangeable",
      "Stabilisers attach to the base; outriggers attach higher up the tower",
      "Stabilisers increase the effective base area; outriggers provide diagonal support",
      "Stabilisers are used outdoors; outriggers are used indoors"
    ],
    correctAnswer: 2,
    explanation: "Stabilisers are devices that increase the effective base area of the tower, extending outward from the base on all four sides. Outriggers serve a similar purpose but may attach at different points. Both increase stability and prevent overturning."
  }
];

const quickCheckQuestions = [
  {
    id: "guardrail-height",
    question: "A site supervisor asks you what the minimum guardrail height should be on your tower. What do you tell them?",
    options: [
      "750mm",
      "850mm",
      "950mm",
      "1100mm"
    ],
    correctIndex: 2,
    explanation: "The minimum guardrail height is 950mm above the platform surface, as specified in BS EN 1004. This is a non-negotiable safety requirement — if the guardrails do not reach this height, the tower must not be used."
  },
  {
    id: "diagonal-braces",
    question: "You notice that a colleague has assembled a tower without fitting the diagonal braces. What is the risk?",
    options: [
      "The platform will not be level",
      "The tower could rack (sway sideways) and collapse",
      "The castors will not lock properly",
      "The guardrails will not stay in position"
    ],
    correctIndex: 1,
    explanation: "Without diagonal braces, the tower has no lateral rigidity and can rack — sway sideways like a parallelogram until it collapses. Diagonal braces triangulate the structure and are essential for the tower's structural integrity."
  },
  {
    id: "toeboard-purpose",
    question: "Why are toeboards required on every working platform, even at relatively low heights?",
    options: [
      "To provide a footrest for the operative",
      "To prevent tools and materials falling off the platform edge",
      "To add structural strength to the platform",
      "To mark the edge of the platform visually"
    ],
    correctIndex: 1,
    explanation: "Toeboards at a minimum of 150mm high prevent tools, materials, and debris from being kicked or sliding off the platform edge. Falling objects are a serious hazard to anyone below the tower, even from relatively modest heights."
  }
];

const faqs = [
  {
    question: "Do I need guardrails on all four sides of the platform?",
    answer: "Yes. Guardrails, mid-rails, and toeboards must be fitted on all four sides of every working platform. There must be no unprotected edges at any point. The only opening in the edge protection should be the trapdoor access point, and this must be closed once the operative is on the platform."
  },
  {
    question: "Can I use the diagonal braces as a climbing route to reach the platform?",
    answer: "No. Diagonal braces are structural components, not access routes. Climbing on diagonal braces can damage them, alter the tower's structural integrity, and is a significant fall hazard. Always use the internal ladder or stairway system provided with the tower for access to the platform."
  },
  {
    question: "When should stabilisers or outriggers be used?",
    answer: "Stabilisers or outriggers should be used whenever specified by the manufacturer's instruction manual. Generally, they are required when the tower exceeds certain height-to-base ratios, when used outdoors, or when additional stability is needed. Always refer to the specific tower system's instruction manual for guidance."
  },
  {
    question: "What should I do if a component appears damaged or bent?",
    answer: "Do not use any component that appears damaged, bent, cracked, or corroded. Remove it from service immediately and tag it as defective. Report the damage to your supervisor. Damaged components can compromise the structural integrity of the entire tower and must be replaced with genuine manufacturer parts before the tower is used."
  }
];

const IpafModule2Section2 = () => {
  useSEO({
    title: "Components & Terminology | IPAF Module 2 Section 2",
    description: "Learn about mobile access tower components including frames, braces, platforms, guardrails, mid-rails, toeboards, stabilisers, outriggers, castors, and base plates.",
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
          <Wrench className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 2 — Section 2
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Components & Terminology
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Know every part of a mobile access tower — what it does, where it goes, and why it matters
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
                  <span><strong>Frames:</strong> Vertical uprights forming the tower structure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Braces:</strong> Diagonal & horizontal — prevent racking and add rigidity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Platforms:</strong> Working surface with trapdoor access.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Guardrails:</strong> 950mm high — fall prevention on all sides.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Toeboards:</strong> 150mm min — stop items falling off the edge.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Stabilisers/outriggers:</strong> Increase the effective base area.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-base text-elec-yellow mb-2">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Inspect:</strong> Check every component before assembly — reject if damaged.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Assemble:</strong> Follow manufacturer's sequence exactly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Verify:</strong> Guardrails, mid-rails, toeboards on all sides.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Lock:</strong> All castor brakes engaged before climbing.</span>
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
              <span>Identify and name all major components of a mobile access tower</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>State the required dimensions for guardrails, mid-rails, and toeboards</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Explain the function of diagonal and horizontal braces</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Describe the purpose of stabilisers, outriggers, castors, and base plates</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Explain why platforms incorporate trapdoor access hatches</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise damaged or defective components during pre-use inspection</span>
            </li>
          </ul>
        </section>

        {/* Section 03: Tower Anatomy Diagram */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Tower Anatomy — Labelled Diagram
            </h2>
            <p className="text-white mb-6">
              The diagram below shows a double-width mobile access tower with all major components labelled.
              Study this carefully — you need to know each part by name and understand its function.
            </p>

            {/* Inline SVG Tower Anatomy Diagram */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6 mb-6">
              <svg className="w-full max-w-md mx-auto" viewBox="0 0 500 680" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background */}
                <rect width="500" height="680" fill="transparent" />

                {/* Ground line */}
                <line x1="40" y1="620" x2="460" y2="620" stroke="#9ca3af" strokeWidth="2" strokeDasharray="8,4" />
                <text x="250" y="650" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="sans-serif">Ground Level</text>

                {/* Stabilisers/Outriggers */}
                <line x1="90" y1="600" x2="30" y2="618" stroke="#facc15" strokeWidth="2.5" />
                <line x1="360" y1="600" x2="420" y2="618" stroke="#facc15" strokeWidth="2.5" />
                <circle cx="30" cy="618" r="4" fill="#facc15" />
                <circle cx="420" cy="618" r="4" fill="#facc15" />

                {/* Castors */}
                <circle cx="120" cy="610" r="12" stroke="#facc15" strokeWidth="2" fill="none" />
                <circle cx="120" cy="610" r="3" fill="#facc15" />
                <circle cx="330" cy="610" r="12" stroke="#facc15" strokeWidth="2" fill="none" />
                <circle cx="330" cy="610" r="3" fill="#facc15" />

                {/* Left frame uprights */}
                <line x1="120" y1="598" x2="120" y2="120" stroke="#fff" strokeWidth="3" />
                <line x1="170" y1="598" x2="170" y2="120" stroke="#fff" strokeWidth="2" />

                {/* Right frame uprights */}
                <line x1="280" y1="598" x2="280" y2="120" stroke="#fff" strokeWidth="2" />
                <line x1="330" y1="598" x2="330" y2="120" stroke="#fff" strokeWidth="3" />

                {/* Horizontal braces (rungs) - left frame */}
                <line x1="120" y1="550" x2="170" y2="550" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="120" y1="450" x2="170" y2="450" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="120" y1="350" x2="170" y2="350" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="120" y1="250" x2="170" y2="250" stroke="#9ca3af" strokeWidth="1.5" />

                {/* Horizontal braces (rungs) - right frame */}
                <line x1="280" y1="550" x2="330" y2="550" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="280" y1="450" x2="330" y2="450" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="280" y1="350" x2="330" y2="350" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="280" y1="250" x2="330" y2="250" stroke="#9ca3af" strokeWidth="1.5" />

                {/* Horizontal braces across tower (front face) */}
                <line x1="120" y1="550" x2="330" y2="550" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="120" y1="450" x2="330" y2="450" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="120" y1="350" x2="330" y2="350" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="120" y1="250" x2="330" y2="250" stroke="#9ca3af" strokeWidth="1.5" />

                {/* Diagonal braces */}
                <line x1="120" y1="550" x2="330" y2="450" stroke="#facc15" strokeWidth="2" strokeDasharray="6,3" />
                <line x1="330" y1="550" x2="120" y2="450" stroke="#facc15" strokeWidth="2" strokeDasharray="6,3" />
                <line x1="120" y1="450" x2="330" y2="350" stroke="#facc15" strokeWidth="2" strokeDasharray="6,3" />
                <line x1="330" y1="450" x2="120" y2="350" stroke="#facc15" strokeWidth="2" strokeDasharray="6,3" />
                <line x1="120" y1="350" x2="330" y2="250" stroke="#facc15" strokeWidth="2" strokeDasharray="6,3" />

                {/* Platform */}
                <rect x="110" y="195" width="230" height="10" fill="#facc15" fillOpacity="0.3" stroke="#facc15" strokeWidth="2" rx="2" />

                {/* Trapdoor on platform */}
                <rect x="180" y="196" width="50" height="8" fill="#1a1a1a" stroke="#facc15" strokeWidth="1.5" rx="1" />
                <line x1="205" y1="197" x2="205" y2="203" stroke="#facc15" strokeWidth="1" />

                {/* Guardrails */}
                <line x1="110" y1="130" x2="340" y2="130" stroke="#22c55e" strokeWidth="3" />

                {/* Mid-rails */}
                <line x1="110" y1="163" x2="340" y2="163" stroke="#22c55e" strokeWidth="2" strokeDasharray="4,2" />

                {/* Toeboards */}
                <rect x="110" y="190" width="5" height="18" fill="#22c55e" fillOpacity="0.5" stroke="#22c55e" strokeWidth="1" />
                <rect x="335" y="190" width="5" height="18" fill="#22c55e" fillOpacity="0.5" stroke="#22c55e" strokeWidth="1" />

                {/* Guardrail posts */}
                <line x1="115" y1="205" x2="115" y2="125" stroke="#fff" strokeWidth="2" />
                <line x1="335" y1="205" x2="335" y2="125" stroke="#fff" strokeWidth="2" />

                {/* Spigots (small connectors at frame joints) */}
                <rect x="117" y="345" width="6" height="14" fill="#facc15" rx="1" />
                <rect x="327" y="345" width="6" height="14" fill="#facc15" rx="1" />

                {/* === LABELS WITH ARROWS === */}

                {/* Platform label */}
                <line x1="355" y1="200" x2="400" y2="180" stroke="#facc15" strokeWidth="1" />
                <text x="405" y="184" fill="#facc15" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Platform</text>

                {/* Guardrail label */}
                <line x1="345" y1="130" x2="400" y2="110" stroke="#22c55e" strokeWidth="1" />
                <text x="405" y="114" fill="#22c55e" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Guardrail (950mm)</text>

                {/* Mid-rail label */}
                <line x1="345" y1="163" x2="400" y2="148" stroke="#22c55e" strokeWidth="1" />
                <text x="405" y="152" fill="#22c55e" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Mid-rail (470mm)</text>

                {/* Toeboard label */}
                <line x1="105" y1="200" x2="50" y2="185" stroke="#22c55e" strokeWidth="1" />
                <text x="5" y="183" fill="#22c55e" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Toeboard</text>
                <text x="5" y="195" fill="#22c55e" fontSize="10" fontFamily="sans-serif">(150mm)</text>

                {/* Diagonal brace label */}
                <line x1="225" y1="490" x2="20" y2="460" stroke="#facc15" strokeWidth="1" />
                <text x="5" y="448" fill="#facc15" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Diagonal</text>
                <text x="5" y="460" fill="#facc15" fontSize="10" fontFamily="sans-serif">Braces</text>

                {/* Horizontal brace label */}
                <line x1="225" y1="350" x2="20" y2="340" stroke="#9ca3af" strokeWidth="1" />
                <text x="5" y="328" fill="#9ca3af" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Horizontal</text>
                <text x="5" y="340" fill="#9ca3af" fontSize="10" fontFamily="sans-serif">Braces</text>

                {/* Frame label */}
                <line x1="120" y1="300" x2="55" y2="280" stroke="#fff" strokeWidth="1" />
                <text x="5" y="270" fill="#fff" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Frame</text>
                <text x="5" y="282" fill="#fff" fontSize="10" fontFamily="sans-serif">Uprights</text>

                {/* Castor label */}
                <line x1="120" y1="622" x2="55" y2="640" stroke="#facc15" strokeWidth="1" />
                <text x="5" y="648" fill="#facc15" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Castors</text>
                <text x="5" y="660" fill="#facc15" fontSize="10" fontFamily="sans-serif">(with brakes)</text>

                {/* Stabiliser label */}
                <line x1="425" y1="618" x2="440" y2="640" stroke="#facc15" strokeWidth="1" />
                <text x="390" y="655" fill="#facc15" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Stabilisers/</text>
                <text x="390" y="667" fill="#facc15" fontSize="10" fontFamily="sans-serif">Outriggers</text>

                {/* Trapdoor label */}
                <line x1="205" y1="195" x2="205" y2="170" stroke="#facc15" strokeWidth="1" strokeDasharray="2,2" />
                <text x="160" y="168" fill="#facc15" fontSize="9" fontFamily="sans-serif">Trapdoor</text>

                {/* Spigot label */}
                <line x1="128" y1="352" x2="55" y2="370" stroke="#facc15" strokeWidth="1" />
                <text x="5" y="378" fill="#facc15" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Spigot</text>

                {/* Title */}
                <text x="250" y="30" textAnchor="middle" fill="#facc15" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Double-Width Tower — Component Anatomy</text>

                {/* Dimension markers */}
                <line x1="120" y1="75" x2="330" y2="75" stroke="#9ca3af" strokeWidth="1" />
                <line x1="120" y1="70" x2="120" y2="80" stroke="#9ca3af" strokeWidth="1" />
                <line x1="330" y1="70" x2="330" y2="80" stroke="#9ca3af" strokeWidth="1" />
                <text x="225" y="68" textAnchor="middle" fill="#9ca3af" fontSize="10" fontFamily="sans-serif">~1.35m (double-width)</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Section 04: Frames */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Frames
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Frames are the vertical structural elements that form the tower's main upright columns. They are
                typically H-shaped or ladder-shaped sections with two vertical tubes connected by horizontal
                rungs. Frames provide the primary load-bearing structure of the tower.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Frame Characteristics</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Material:</strong> Aluminium alloy or GRP depending on tower type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Connection:</strong> Frames connect vertically via spigots — male pins that fit into the tube ends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Rungs:</strong> Horizontal bars within each frame serve as the internal climbing route</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Sizes:</strong> Available in single-width (~0.7m) and double-width (~1.35m) configurations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Inspection point:</strong> Check for bends, dents, cracks, and corrosion before every use</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Definition: Spigot</h3>
                <p className="text-white/80 text-sm">
                  A <strong className="text-white">spigot</strong> is a short connecting pin or tube that protrudes from
                  the top of a frame section. The next frame section slides down over the spigot, creating a secure
                  vertical joint. Spigots may be integral (permanently welded) or separate (inserted into the tube).
                  They include a locking mechanism — usually a gravity lock or spring clip — to prevent accidental separation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Braces */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">05</span>
              Braces — Diagonal & Horizontal
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Braces are the components that give the tower its lateral rigidity and structural strength. Without
                braces, a tower would have no resistance to sideways forces and could collapse under even
                modest lateral loading.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Diagonal Braces</h3>
                  <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Run diagonally between frame uprights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Create triangulation — the key to structural rigidity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Prevent racking (parallelogram deformation)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Fitted in an X or V pattern on each face of the tower</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Must be fitted on all faces as per manufacturer's instructions</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Horizontal Braces</h3>
                  <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Run horizontally between the frames</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Connect the two sides of the tower together</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Also called plan braces or tie bars</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Maintain the correct spacing between frames</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Often incorporate hooks or clamps for attachment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Critical Safety Point</h3>
                </div>
                <p className="text-white/80 text-sm">
                  A tower assembled without diagonal braces has <strong className="text-white">zero</strong> resistance to
                  lateral forces. Even a slight push, leaning against the guardrail, or wind pressure can cause it to
                  rack and collapse. Never use a tower if any required brace is missing or damaged.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 06: Platforms & Trapdoors */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">06</span>
              Platforms & Trapdoors
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The platform is the working surface at the top of the tower. It must be fully decked — with no
                gaps that a person or object could fall through — and incorporate a trapdoor for safe access
                from below.
              </p>

              <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-medium mb-2">Platform Requirements</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Fully decked:</strong> No gaps greater than 25mm between platform boards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Non-slip surface:</strong> Platforms should have a slip-resistant finish</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Secured:</strong> Platforms must be locked in position — they must not be able to lift or slide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Load rated:</strong> Each platform has a maximum safe working load (typically 275kg)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Wind-up or slide-in:</strong> Platform may slide in from the side or be lifted through the tower</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Trapdoor Function</h3>
                <p className="text-white/80 text-sm mb-3">
                  The trapdoor (also called an access hatch) allows the operative to climb up through the platform
                  from inside the tower. This is a critical safety feature because:
                </p>
                <ul className="text-white space-y-1 text-sm">
                  <li>1. It means you are always within the guardrail protection whilst accessing the platform</li>
                  <li>2. You never have to climb over or around the edge protection</li>
                  <li>3. Once closed, the trapdoor completes the platform surface, eliminating trip hazards</li>
                  <li>4. It prevents tools and materials falling through the access point</li>
                </ul>
              </div>

              <p>
                Always close the trapdoor fully once you are on the platform. An open trapdoor is a trip hazard
                and reduces the effective working area. It also creates a gap through which objects could fall,
                potentially injuring someone below.
              </p>
            </div>
          </div>
        </section>

        {/* Section 07: Guardrails, Mid-Rails & Toeboards */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">07</span>
              Guardrails, Mid-Rails & Toeboards
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Edge protection is the primary fall prevention system on a mobile access tower. It consists of
                three components working together: guardrails, mid-rails, and toeboards. All three must be
                present on every working platform.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <h4 className="text-purple-300 font-medium mb-2">Guardrails — Minimum 950mm</h4>
                  <p className="text-white/80 text-sm">
                    The top rail, positioned at a minimum of 950mm above the platform surface. This is the primary
                    barrier preventing a person from falling over the edge. Guardrails must be fitted on all four
                    sides of the platform with no gaps.
                  </p>
                </div>
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <h4 className="text-purple-300 font-medium mb-2">Mid-Rails — Approximately 470mm</h4>
                  <p className="text-white/80 text-sm">
                    Positioned approximately halfway between the platform and the guardrail, at around 470mm. The
                    mid-rail prevents a person from falling or sliding through the gap between the guardrail and the
                    platform. Without it, a person could roll under the guardrail.
                  </p>
                </div>
                <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                  <h4 className="text-purple-300 font-medium mb-2">Toeboards — Minimum 150mm</h4>
                  <p className="text-white/80 text-sm">
                    Vertical boards at least 150mm high fitted at platform level around all edges. Toeboards prevent
                    tools, materials, and debris from being kicked or falling off the platform. This protects anyone
                    working below or passing near the tower.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Dimensions to Remember</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-elec-yellow">950</div>
                    <div className="text-xs text-white/60">mm guardrail height</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-elec-yellow">470</div>
                    <div className="text-xs text-white/60">mm mid-rail height</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-elec-yellow">150</div>
                    <div className="text-xs text-white/60">mm toeboard height</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 08: Stabilisers, Outriggers & Base Plates */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">08</span>
              Stabilisers, Outriggers & Base Plates
            </h2>
            <div className="space-y-4 text-white">
              <p>
                These components all serve to increase the stability of the tower by enlarging its effective base
                area or ensuring a firm connection with the ground surface.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h4 className="text-amber-300 font-medium mb-2">Stabilisers</h4>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Extend outward from the base of the tower</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Increase the effective base area for greater stability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Usually attached at the bottom frame level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Must be deployed on all four sides when required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Adjustable in length to suit the available space</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <h4 className="text-amber-300 font-medium mb-2">Outriggers</h4>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Similar function to stabilisers — increasing base area</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>May attach at different heights on the tower</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Often incorporate adjustable feet for levelling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Required at specific tower heights per manufacturer data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Must make firm contact with the ground</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="text-elec-yellow font-medium mb-2">Base Plates</h4>
                <p className="text-white/80 text-sm mb-2">
                  Base plates are flat metal plates fitted to the bottom of the frame legs when the tower is
                  positioned on a fixed base (i.e., without castors). They distribute the tower's weight over a
                  larger area and prevent the legs from sinking into soft ground.
                </p>
                <ul className="text-white space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Used when the tower will not need to be moved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Provide a stable footing on firm, level surfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Some types have adjustable screw jacks for fine levelling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Must sit on a firm, level surface capable of supporting the load</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Castors */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">09</span>
              Castors
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Castors are wheeled fittings attached to the base of the tower legs, allowing the tower to be
                repositioned without dismantling. They are a convenience feature but also a potential hazard
                if not used correctly.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-2">Castor Requirements</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Brakes:</strong> Every castor must have a functioning brake mechanism</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Lock before climbing:</strong> All castor brakes must be locked before anyone ascends the tower</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Load rated:</strong> Castors must be rated for the total tower load</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Swivel:</strong> Most tower castors are swivel type for easy manoeuvring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Diameter:</strong> Typically 150mm-200mm for stability and ease of rolling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Compatibility:</strong> Must be the correct type for the tower system</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Never Move a Tower with Anyone on the Platform</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Towers must never be moved with anyone on the platform or any part of the tower structure.
                  All personnel must descend and clear the tower before it is moved. Moving an occupied tower
                  creates extreme instability and is one of the most dangerous practices in tower use.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 10: Pocket Guide */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Component Quick Reference
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Structural Components</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Frames:</strong> Vertical uprights (H-frames)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Diagonal braces:</strong> Prevent racking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Horizontal braces:</strong> Connect frames laterally</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Spigots:</strong> Frame-to-frame connectors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Tie bars:</strong> Maintain frame spacing</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Edge Protection</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Guardrails:</strong> 950mm minimum height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Mid-rails:</strong> ~470mm height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Toeboards:</strong> 150mm minimum height</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Platform & Access</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Platform:</strong> Fully decked, non-slip surface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Trapdoor:</strong> Access hatch — close after use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Internal ladder:</strong> Frame rungs for climbing</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Stability & Mobility</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Stabilisers:</strong> Extend base area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Outriggers:</strong> Additional stability support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Base plates:</strong> For fixed positions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Castors:</strong> Wheels with brakes — always lock</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
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
            title="Components & Terminology Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Types of Towers
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-2-section-3">
              Next: Stability & Safe Working Loads
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IpafModule2Section2;
