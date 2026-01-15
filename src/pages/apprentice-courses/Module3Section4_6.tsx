import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Plug,
  ToggleLeft,
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  Wrench,
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "Installing Accessories (Sockets, Switches, FCUs) - Module 3.4.6 | Level 2 Electrical Course";
const DESCRIPTION =
  "Master the installation of electrical accessories including sockets, switches, and FCUs with proper wiring, mounting heights, and BS 7671 compliance.";

// Quiz questions for the end of the page
const quizQuestions = [
  {
    id: 1,
    question:
      "What is the typical mounting height for switches in new builds under Part M?",
    options: ["450 mm", "900 mm", "1200 mm", "1500 mm"],
    correctAnswer: 2,
    explanation:
      "The typical mounting height for switches in new builds under Part M guidance is 1200 mm above finished floor level.",
  },
  {
    id: 2,
    question: "Which BS 7671 requirement applies to almost all socket outlets?",
    options: [
      "RCBO protection",
      "RCD protection",
      "Earth-free installation",
      "Overload protection only",
    ],
    correctAnswer: 1,
    explanation:
      "RCD protection is required for almost all socket outlets in accordance with BS 7671.",
  },
  {
    id: 3,
    question: "True or False: Switched live conductors must always be sleeved brown.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Switched live conductors must be identified with brown sleeving or brown core to clearly identify them.",
  },
  {
    id: 4,
    question: "Name one reason to use an FCU.",
    options: [
      "To reduce cable costs",
      "To provide a fused spur for a fixed appliance",
      "To eliminate RCD protection",
      "To increase socket capacity",
    ],
    correctAnswer: 1,
    explanation:
      "FCUs provide a fused spur from a ring or radial circuit to supply fixed appliances and allow local isolation.",
  },
  {
    id: 5,
    question: "What must be done before installing any accessory?",
    options: [
      "Fit the faceplate first",
      "Isolate the supply",
      "Install the fuse",
      "Test the load",
    ],
    correctAnswer: 1,
    explanation:
      "The supply must always be isolated before installing any electrical accessory for safety.",
  },
  {
    id: 6,
    question: "Why is torqueing terminals important?",
    options: [
      "To make them look neat",
      "To ensure safe, secure connections that won't loosen",
      "To comply with RCD regulations",
      "To improve cable flexibility",
    ],
    correctAnswer: 1,
    explanation:
      "Proper torqueing ensures safe, secure connections that won't loosen over time, preventing overheating and fire risk.",
  },
  {
    id: 7,
    question: "Which type of switch is used to control a light from two locations?",
    options: ["One-way", "Two-way", "Intermediate", "Dimmer"],
    correctAnswer: 1,
    explanation:
      "Two-way switches are used to control a light from two different locations.",
  },
  {
    id: 8,
    question: "Name one safety consideration for installing sockets outdoors.",
    options: [
      "Use standard indoor sockets",
      "Use weatherproof sockets with IP rating and RCD protection",
      "Install at ground level",
      "Use plastic conduit only",
    ],
    correctAnswer: 1,
    explanation:
      "Outdoor sockets must be weatherproof with appropriate IP rating and RCD protection for safety.",
  },
];

// Quick knowledge check questions
const quickCheckQuestions = [
  {
    id: "mounting-height",
    question:
      "What is the typical mounting height for sockets in new builds under Part M guidance?",
    options: [
      "300-400 mm",
      "450-1200 mm",
      "1200-1500 mm",
      "Above 1500 mm",
    ],
    correctIndex: 1,
    explanation:
      "Part M guidance specifies socket mounting height generally between 450 mm to 1200 mm above finished floor level in new builds.",
  },
  {
    id: "rcd-protection",
    question: "Why is RCD protection required for most socket outlets?",
    options: [
      "To reduce installation costs",
      "To protect against electric shock",
      "To improve socket performance",
      "To comply with manufacturer warranties",
    ],
    correctIndex: 1,
    explanation:
      "RCD protection is required for most socket outlets to protect against electric shock, especially in case of earth faults.",
  },
  {
    id: "terminal-torque",
    question: "What can happen if terminals are not properly torqued?",
    options: [
      "Improved electrical performance",
      "Better cable flexibility",
      "Terminal loosening and overheating",
      "Reduced material costs",
    ],
    correctIndex: 2,
    explanation:
      "Improperly torqued terminals can loosen over time, creating high resistance connections that generate heat and potentially cause fires.",
  },
];

export default function Module3Section4_6() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white active:text-white p-0 -ml-1 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
            <Plug className="w-4 h-4 text-elec-yellow" />
            <span className="text-elec-yellow text-sm font-medium">Module 3</span>
            <span className="text-white/50">|</span>
            <span className="text-white/70 text-sm">Section 3.4.6</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Installing Accessories (Sockets, Switches, FCUs)
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Master the installation of electrical accessories with proper wiring techniques, mounting heights, and BS 7671 compliance for safe, professional installations.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Sockets, switches, and FCUs are critical Second Fix accessories.</li>
                <li>Mounting heights must comply with Part M accessibility guidance.</li>
                <li>RCD protection required for most socket outlets per BS 7671.</li>
                <li>Proper termination and torqueing prevents connection failure.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Socket outlets, light switches, FCUs, pull-cord switches.</li>
                <li><strong>Use:</strong> Correct wiring methods; proper mounting heights; secure fixing.</li>
                <li><strong>Check:</strong> Polarity, continuity, RCD protection, operation testing.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify best practices for installing sockets, switches, and FCUs.</li>
            <li>Apply correct wiring and termination methods for each accessory type.</li>
            <li>Follow regulations for mounting heights, clearances, and circuit protection.</li>
            <li>Recognise common installation faults and how to avoid them.</li>
          </ul>
        </section>

        {/* Content / Learning */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Content / Learning
          </h2>

          {/* 1. Sockets */}
          <div className="mb-8">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Plug className="w-5 h-5" /> 1. Socket Outlets - Comprehensive Guide
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Socket Types and Applications</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-2">Standard Socket Outlets</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>13A Single Switched:</strong> Individual appliance connections, compact installations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>13A Double Switched:</strong> Multiple appliances, standard residential/commercial use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>13A Unswitched:</strong> Permanent appliances, clock connections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>USB Integrated:</strong> 2.1A-4.8A USB output, reduces adapter requirements</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-transparent border border-green-400/30 rounded-lg">
                  <h5 className="font-medium text-green-400 mb-2">Specialist Socket Types</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Weatherproof (IP55-IP66):</strong> Outdoor installations, garage/shed applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>RCD Socket Outlets:</strong> Integral 30mA protection, portable appliance use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Floor Sockets:</strong> Pop-up units, raised access floors, conference rooms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Industrial Sockets:</strong> 16A/32A, IP44+ rating, CEE form connections</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Detailed Regulatory Requirements</h4>
              <div className="space-y-4">
                <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg">
                  <h5 className="font-medium text-amber-400 mb-2">BS 7671 Socket Regulations</h5>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Regulation 411.3.3:</strong> RCD protection (≤30mA, ≤40ms) for all socket outlets except specific exemptions</li>
                    <li><strong>Regulation 522.6.204:</strong> Cables to be protected against mechanical damage</li>
                    <li><strong>Regulation 526.3:</strong> Electrical connections must be accessible for inspection</li>
                    <li><strong>Regulation 132.8:</strong> Every installation must be divided into circuits to prevent danger</li>
                    <li><strong>Table 55A:</strong> Diversity factors for socket outlet calculations</li>
                  </ul>
                </div>
                <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-2">Part M Accessibility Requirements</h5>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Height Range:</strong> 450mm-1200mm above finished floor level for new builds</li>
                    <li><strong>Horizontal Distance:</strong> Maximum 350mm from internal corner of room</li>
                    <li><strong>Approach Space:</strong> Minimum 300mm clear space for wheelchair access</li>
                    <li><strong>Operation Force:</strong> Maximum 5N operating force for switches</li>
                    <li><strong>Visual Contrast:</strong> Faceplate must contrast with background surface</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Advanced Installation Procedures</h4>
              <div className="p-4 bg-transparent border border-white/10 rounded-lg">
                <h5 className="font-medium text-white mb-3">Step-by-Step Socket Installation</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Preparation Phase</h6>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Isolate circuit at consumer unit/distribution board</li>
                      <li>Prove dead using GS38 compliant voltage tester</li>
                      <li>Check back box fixing - minimum 25mm depth for standard socket</li>
                      <li>Verify cable route and protection adequacy</li>
                      <li>Confirm circuit capacity and diversity calculations</li>
                    </ol>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Connection Phase</h6>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Strip outer sheath to minimum required (typically 10-15mm)</li>
                      <li>Strip individual conductors to 12-15mm (check manufacturer data)</li>
                      <li>Connect earth (G/Y) first using appropriate terminal</li>
                      <li>Connect neutral (blue) to left terminal (viewed from front)</li>
                      <li>Connect live (brown) to right terminal (viewed from front)</li>
                      <li>Apply specified torque (typically 2.0-2.5Nm)</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-white mb-3">Critical Installation Considerations</h4>
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-3 border border-border/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-2">Safety Critical</h5>
                  <ul className="space-y-1 text-xs">
                    <li>- Verify polarity before energising</li>
                    <li>- Ensure adequate cable support</li>
                    <li>- Check earth continuity ≤0.05Ohm</li>
                    <li>- Confirm RCD operation ≤40ms</li>
                    <li>- Test insulation resistance ≥1MOhm</li>
                  </ul>
                </div>
                <div className="p-3 border border-border/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-2">Quality Assurance</h5>
                  <ul className="space-y-1 text-xs">
                    <li>- Level installation using spirit level</li>
                    <li>- Secure but don't overtighten faceplates</li>
                    <li>- Ensure gasket integrity (outdoor types)</li>
                    <li>- Check switching operation smoothness</li>
                    <li>- Verify USB output voltage (if applicable)</li>
                  </ul>
                </div>
                <div className="p-3 border border-green-400/30 rounded-lg">
                  <h5 className="font-medium text-green-400 mb-2">Documentation</h5>
                  <ul className="space-y-1 text-xs">
                    <li>- Record circuit details on schedule</li>
                    <li>- Note any deviations from standard</li>
                    <li>- Complete test certificates</li>
                    <li>- Photograph complex installations</li>
                    <li>- Update as-built drawings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <div className="my-6 border-t border-white/10" />

          {/* 2. Switches */}
          <div className="mb-8">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <ToggleLeft className="w-5 h-5" /> 2. Switches - Complete Installation Guide
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Switch Types and Control Methods</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-2">Standard Switch Types</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>One-way switches:</strong> Single switching point, basic on/off control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Two-way switches:</strong> Control from two locations, L1, L2, COM terminals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Intermediate switches:</strong> Control from three+ locations, requires two-way at ends</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Double pole switches:</strong> Isolates both live and neutral, 20A rating</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-transparent border border-elec-yellow/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-2">Specialist Switch Applications</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Dimmer switches:</strong> LED compatible, trailing/leading edge, load matching</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>PIR switches:</strong> Motion detection, adjustable timing, daylight sensing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Pull-cord switches:</strong> Bathroom zones, 6A rating, cord length compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Timer switches:</strong> Fan isolation, heating control, programmable functions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Switch Wiring Configurations</h4>
              <div className="space-y-4">
                <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-3">One-Way Switch Wiring</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-white mb-2">Terminal Connections</h6>
                      <ul className="space-y-1 text-sm">
                        <li>- <strong>L1:</strong> Permanent live (brown core)</li>
                        <li>- <strong>L2:</strong> Switched live to load (brown or sleeved blue)</li>
                        <li>- <strong>Earth:</strong> Continuous protective conductor</li>
                        <li>- <strong>Neutral:</strong> Direct to load (not switched)</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-white mb-2">Cable Requirements</h6>
                      <ul className="space-y-1 text-sm">
                        <li>- Twin & earth to switch from ceiling rose</li>
                        <li>- 1.0mm² for lighting circuits ≤6A</li>
                        <li>- 1.5mm² for circuits &gt;6A up to 10A</li>
                        <li>- Blue core sleeved brown at both ends</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-transparent border border-green-400/30 rounded-lg">
                  <h5 className="font-medium text-green-400 mb-3">Two-Way Switch Wiring</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-white mb-2">Switch 1 (Feed End)</h6>
                      <ul className="space-y-1 text-sm">
                        <li>- <strong>COM:</strong> Permanent live feed</li>
                        <li>- <strong>L1:</strong> Strapper to other switch L1</li>
                        <li>- <strong>L2:</strong> Strapper to other switch L2</li>
                        <li>- Three-core & earth cable to Switch 2</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-white mb-2">Switch 2 (Load End)</h6>
                      <ul className="space-y-1 text-sm">
                        <li>- <strong>COM:</strong> Switched live to load</li>
                        <li>- <strong>L1:</strong> Strapper from other switch</li>
                        <li>- <strong>L2:</strong> Strapper from other switch</li>
                        <li>- Twin & earth to lighting load</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Advanced Installation Requirements</h4>
              <div className="space-y-4">
                <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg">
                  <h5 className="font-medium text-amber-400 mb-2">Bathroom Zone Regulations (BS 7671 Section 701)</h5>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Zone 0:</strong> No switches permitted (inside bath/shower)</li>
                    <li><strong>Zone 1:</strong> Pull-cord switches only, minimum IPX4 rating</li>
                    <li><strong>Zone 2:</strong> Pull-cord or SELV switches, minimum IPX4 rating</li>
                    <li><strong>Outside Zones:</strong> Standard switches permitted, minimum 0.6m from zone boundary</li>
                    <li><strong>Cord Length:</strong> Minimum 1.5m, maximum 2.5m for pull-cord switches</li>
                  </ul>
                </div>

                <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-2">Dimmer Switch Specifications</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-white mb-2">LED Compatibility</h6>
                      <ul className="space-y-1 text-sm">
                        <li>- Leading edge for most LED drivers</li>
                        <li>- Trailing edge for resistive/inductive loads</li>
                        <li>- Minimum load requirements (typically 10W)</li>
                        <li>- Maximum load capacity verification</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-white mb-2">Installation Considerations</h6>
                      <ul className="space-y-1 text-sm">
                        <li>- Heat dissipation requirements</li>
                        <li>- Two-way dimming limitations</li>
                        <li>- Neutral requirement for some types</li>
                        <li>- EMC compliance and filtering</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-white mb-3">Installation Quality Standards</h4>
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-3 border border-border/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-2">Mechanical Installation</h5>
                  <ul className="space-y-1 text-xs">
                    <li>- Back box depth: 25mm minimum for standard switch</li>
                    <li>- Fixing centres: 60.3mm (UK standard)</li>
                    <li>- Level installation using spirit level</li>
                    <li>- Secure fixing without overtightening</li>
                    <li>- Gang alignment for multiple switches</li>
                  </ul>
                </div>
                <div className="p-3 border border-green-400/30 rounded-lg">
                  <h5 className="font-medium text-green-400 mb-2">Electrical Standards</h5>
                  <ul className="space-y-1 text-xs">
                    <li>- Terminal torque: 1.2-1.5Nm (lighting circuits)</li>
                    <li>- Core identification: Brown sleeving on blues</li>
                    <li>- Earth continuity: ≤0.05Ohm</li>
                    <li>- Insulation resistance: ≥2MOhm</li>
                    <li>- Operation testing under load</li>
                  </ul>
                </div>
                <div className="p-3 border border-border/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-2">Compliance Testing</h5>
                  <ul className="space-y-1 text-xs">
                    <li>- Switching function verification</li>
                    <li>- Load compatibility confirmation</li>
                    <li>- EMC compliance (dimmers)</li>
                    <li>- IP rating verification (wet areas)</li>
                    <li>- Accessibility compliance check</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <div className="my-6 border-t border-white/10" />

          {/* 3. Fused Connection Units (FCUs) */}
          <div className="mb-8">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> 3. Fused Connection Units - Advanced Applications
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">FCU Types and Applications</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg">
                  <h5 className="font-medium text-amber-400 mb-2">Standard FCU Variants</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Switched FCU:</strong> Local isolation capability, load control, status indication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Unswitched FCU:</strong> Fused protection only, permanent appliance feeds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span><strong>FCU with flex outlet:</strong> Integrated cable connection, sealed cable entry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span><strong>FCU with socket:</strong> Combination unit, switched fused socket outlet</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-teal-500/10 border border-teal-400/30 rounded-lg">
                  <h5 className="font-medium text-teal-400 mb-2">Specialist FCU Applications</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Boiler connections:</strong> 3A fused, dedicated circuit, service switch access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Immersion heater:</strong> 15A/16A fused, heat-resistant design, timer integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Kitchen appliances:</strong> 13A fused, accessible isolation, appliance labelling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Security systems:</strong> 3A/5A fused, UPS compatibility, tamper resistance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Detailed Fuse Selection and Protection</h4>
              <div className="space-y-4">
                <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-3">Fuse Rating Selection Criteria</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-white mb-2">Load Assessment</h6>
                      <ul className="space-y-1 text-sm">
                        <li>- <strong>Continuous loads:</strong> Fuse rating ≥125% of full load current</li>
                        <li>- <strong>Motor loads:</strong> Consider starting current (typically 6-8x FL)</li>
                        <li>- <strong>Inductive loads:</strong> Account for power factor and inrush</li>
                        <li>- <strong>Resistive loads:</strong> Direct calculation: P = V x I</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-white mb-2">Common Fuse Ratings</h6>
                      <ul className="space-y-1 text-sm">
                        <li>- <strong>3A:</strong> Lighting circuits, small appliances, control circuits</li>
                        <li>- <strong>5A:</strong> Medium appliances, ventilation fans, pumps</li>
                        <li>- <strong>10A:</strong> Small heating elements, larger fans</li>
                        <li>- <strong>13A:</strong> Standard appliances, maximum for FCU</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-3">Cable Sizing and Protection Coordination</h5>
                  <div className="space-y-3">
                    <div>
                      <h6 className="font-medium text-white mb-2">Discrimination and Selectivity</h6>
                      <p className="text-sm mb-2">FCU fuse must operate before upstream protective device:</p>
                      <ul className="space-y-1 text-sm pl-4">
                        <li>- FCU fuse: 3A (I²t = 4.5 A²s at 5s)</li>
                        <li>- Ring circuit MCB: 32A (operates at ~1.45 x In = 46.4A)</li>
                        <li>- Radial circuit MCB: 20A (operates at ~1.45 x In = 29A)</li>
                        <li>- Time-current characteristic coordination essential</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-white mb-2">Cable De-rating Factors</h6>
                      <ul className="space-y-1 text-sm">
                        <li>- Ambient temperature: Factor Ca (Table 4B1)</li>
                        <li>- Grouping: Factor Cg (Table 4C1)</li>
                        <li>- Thermal insulation: Factor Ci (Table 4B2)</li>
                        <li>- Overall factor: Cf = Ca x Cg x Ci</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Advanced Installation Procedures</h4>
              <div className="p-4 bg-transparent border border-white/10 rounded-lg">
                <h5 className="font-medium text-white mb-3">Professional FCU Installation Process</h5>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-white mb-2">Pre-Installation Assessment</h6>
                      <ol className="list-decimal pl-6 space-y-1 text-sm">
                        <li>Calculate load requirements and diversity factors</li>
                        <li>Verify upstream circuit capacity and discrimination</li>
                        <li>Select appropriate cable size with de-rating factors</li>
                        <li>Confirm mounting position accessibility for maintenance</li>
                        <li>Check compliance with appliance manufacturer requirements</li>
                      </ol>
                    </div>
                    <div>
                      <h6 className="font-medium text-white mb-2">Installation Execution</h6>
                      <ol className="list-decimal pl-6 space-y-1 text-sm">
                        <li>Install back box with adequate depth (35mm minimum)</li>
                        <li>Route and terminate supply cables (ring or radial)</li>
                        <li>Install load cable with appropriate strain relief</li>
                        <li>Connect and torque all terminals to specification</li>
                        <li>Install correct fuse rating and verify operation</li>
                      </ol>
                    </div>
                  </div>

                  <div className="p-3 border border-amber-400/30 rounded-lg">
                    <h6 className="font-medium text-amber-400 mb-2">Critical Safety Considerations</h6>
                    <ul className="space-y-1 text-sm">
                      <li>- <strong>Isolation:</strong> Ensure complete circuit isolation before work</li>
                      <li>- <strong>Testing:</strong> Verify continuity, insulation, and polarity</li>
                      <li>- <strong>Load testing:</strong> Confirm operation under actual load conditions</li>
                      <li>- <strong>Documentation:</strong> Record fuse rating and load details on circuit schedule</li>
                      <li>- <strong>Labelling:</strong> Clear identification of controlled appliance/circuit</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-white mb-3">Maintenance and Fault Finding</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-2">Common FCU Faults</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Blown fuses:</strong> Overload, fault current, wrong rating</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Overheating:</strong> Loose connections, overload, poor ventilation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Switch failure:</strong> Contact wear, mechanical fatigue</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span><strong>Arcing:</strong> Poor connections, contamination, wear</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-transparent border border-green-400/30 rounded-lg">
                  <h5 className="font-medium text-green-400 mb-2">Preventive Maintenance</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Regular inspection:</strong> 6-12 month visual checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Thermal imaging:</strong> Annual hot spot detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Load monitoring:</strong> Verify operating currents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Contact resistance:</strong> Test switch contact integrity</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
          <div className="my-6 border-t border-white/10" />

          {/* 4. General Best Practices for All Accessories */}
          <div className="mb-8">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5" /> 4. General Best Practices for All Accessories
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg">
                <h4 className="font-medium text-white mb-2">Safety Practices</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Always isolate supply before installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Verify isolation with approved voltage tester</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Use appropriate PPE throughout installation</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                <h4 className="font-medium text-white mb-2">Installation Quality</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>Check boxes are fixed securely and flush to finished surfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>Avoid overtightening faceplate screws to prevent damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span>Keep all wiring neat and within back box capacity</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-transparent border border-border/30 rounded-lg">
              <h4 className="font-medium text-white mb-2">Testing and Commissioning</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Test the accessory for correct operation and safety before handover</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Verify correct polarity and earth continuity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Conduct RCD testing where applicable</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Document installation details and test results</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 5. Detailed Installation Procedures */}
          <div className="mb-8">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> 5. Detailed Installation Procedures
            </h3>

            <div className="space-y-6">
              <div className="p-4 bg-transparent border border-white/10 rounded-lg">
                <h4 className="font-medium text-white mb-3">Socket Installation Process</h4>
                <ol className="list-decimal pl-6 space-y-2 text-xs sm:text-sm text-white">
                  <li>Isolate supply and verify dead with approved voltage tester</li>
                  <li>Check back box is secure and flush with finished wall surface</li>
                  <li>Strip cable sheath to minimum required length (typically 10-15mm)</li>
                  <li>Strip individual cores to manufacturer specification (usually 12-15mm)</li>
                  <li>Connect Earth (G/Y) to earth terminal first</li>
                  <li>Connect Neutral (Blue) to left terminal when viewed from front</li>
                  <li>Connect Live (Brown) to right terminal when viewed from front</li>
                  <li>Torque terminals to manufacturer specification (typically 2-2.5 Nm)</li>
                  <li>Fold cables neatly into back box without straining terminals</li>
                  <li>Secure faceplate with appropriate screws, ensuring level installation</li>
                  <li>Test installation: polarity, continuity, insulation resistance, and operation</li>
                </ol>
              </div>

              <div className="p-4 bg-transparent border border-white/10 rounded-lg">
                <h4 className="font-medium text-white mb-3">Switch Installation Process</h4>
                <ol className="list-decimal pl-6 space-y-2 text-xs sm:text-sm text-white">
                  <li>Isolate supply and verify dead</li>
                  <li>Identify switching arrangements (one-way, two-way, or intermediate)</li>
                  <li>Sleeve blue cores brown to identify as switched live</li>
                  <li>For one-way: Connect live feed and switched live to L1 and L2</li>
                  <li>For two-way: Connect live feed to COM, and strappers to L1 and L2</li>
                  <li>Connect earth to earth terminal (if metal faceplate or required)</li>
                  <li>Ensure all connections are tight and properly torqued</li>
                  <li>Test switching operation and continuity before final fixing</li>
                </ol>
              </div>

              <div className="p-4 bg-transparent border border-white/10 rounded-lg">
                <h4 className="font-medium text-white mb-3">FCU Installation Process</h4>
                <ol className="list-decimal pl-6 space-y-2 text-xs sm:text-sm text-white">
                  <li>Calculate correct fuse rating for connected appliance</li>
                  <li>Isolate ring/radial circuit supply</li>
                  <li>Install appropriate back box and containment</li>
                  <li>Connect supply side: Live, Neutral, Earth from circuit</li>
                  <li>Connect load side to appliance or flexible outlet</li>
                  <li>Install correct fuse rating in FCU</li>
                  <li>Ensure fuse is accessible for future maintenance</li>
                  <li>Test operation of isolator switch and load circuit</li>
                </ol>
              </div>
            </div>
          </div>

          {/* 6. Common Installation Faults and Solutions */}
          <div className="mb-8">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> 6. Common Installation Faults and Solutions
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                <h4 className="font-medium text-elec-yellow mb-3">Common Faults</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Incorrect polarity:</strong> Live and neutral reversed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Loose terminals:</strong> Insufficient torque applied</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Exposed copper:</strong> Excessive cable stripping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Incorrect mounting height:</strong> Non-compliance with Part M</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Missing earth connections:</strong> Safety compromise</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg">
                <h4 className="font-medium text-green-400 mb-3">Prevention Solutions</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Always use polarity tester before connection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Use calibrated torque driver for all terminals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Follow manufacturer's cable preparation guidelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Measure and mark mounting heights before installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Complete earth continuity testing on all circuits</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 7. Tools and Equipment Required */}
          <div className="mb-8">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5" /> 7. Essential Tools and Equipment
            </h3>

            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                <h4 className="font-medium text-elec-yellow mb-3">Hand Tools</h4>
                <ul className="space-y-1 text-sm">
                  <li>- Insulated screwdrivers (flathead and Phillips)</li>
                  <li>- Wire strippers and side cutters</li>
                  <li>- Adjustable spanner set</li>
                  <li>- Spirit level for alignment</li>
                  <li>- Tape measure for positioning</li>
                  <li>- Pencil for marking</li>
                </ul>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                <h4 className="font-medium text-elec-yellow mb-3">Test Equipment</h4>
                <ul className="space-y-1 text-sm">
                  <li>- Approved voltage tester (GS38)</li>
                  <li>- Multimeter for continuity</li>
                  <li>- Insulation resistance tester</li>
                  <li>- RCD tester</li>
                  <li>- Socket tester for polarity</li>
                  <li>- Torque driver/screwdriver</li>
                </ul>
              </div>

              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg">
                <h4 className="font-medium text-green-400 mb-3">Installation Materials</h4>
                <ul className="space-y-1 text-sm">
                  <li>- Appropriate back boxes</li>
                  <li>- Fixing screws and plugs</li>
                  <li>- Cable management clips</li>
                  <li>- Insulation sleeving</li>
                  <li>- Earth sleeving (green/yellow)</li>
                  <li>- Appropriate fuses for FCUs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 8. Compliance and Standards */}
          <div className="mb-8">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> 8. Regulatory Compliance and Standards
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg">
                <h4 className="font-medium text-amber-400 mb-3">BS 7671 Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Section 411:</strong> RCD protection for socket outlets (30mA, 40ms)</li>
                  <li><strong>Section 522:</strong> Cable selection and installation methods</li>
                  <li><strong>Section 526:</strong> Electrical connections and terminations</li>
                  <li><strong>Section 701:</strong> Special requirements for bathrooms</li>
                  <li><strong>Part 6:</strong> Inspection and testing requirements</li>
                </ul>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                <h4 className="font-medium text-elec-yellow mb-3">Building Regulations Part M</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Socket heights:</strong> 450mm - 1200mm above floor level</li>
                  <li><strong>Switch heights:</strong> 750mm - 1200mm above floor level</li>
                  <li><strong>Accessibility:</strong> Clear approach and operation space required</li>
                  <li><strong>Visual contrast:</strong> Faceplates should contrast with wall colour</li>
                </ul>
              </div>

              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg">
                <h4 className="font-medium text-green-400 mb-3">Manufacturer Standards</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Terminal torque:</strong> Follow manufacturer specifications (typically 2-2.5Nm)</li>
                  <li><strong>Cable entry:</strong> Use appropriate strain relief methods</li>
                  <li><strong>Environmental rating:</strong> Select appropriate IP rating for location</li>
                  <li><strong>Load capacity:</strong> Ensure accessories match circuit requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Example */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Real-World Example
          </h2>
          <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg">
            <p className="text-xs sm:text-sm text-white mb-3">
              <strong>Case Study: Office Refurbishment Socket Failure</strong>
            </p>
            <p className="text-xs sm:text-sm text-white mb-3">
              An electrician installed a row of sockets in an office refurbishment but did not torque the terminals correctly. After several months, one terminal loosened, creating heat damage and tripping the circuit.
            </p>
            <p className="text-xs sm:text-sm text-white">
              <strong>Resolution:</strong> The fault was resolved by replacing the socket and retightening all connections to manufacturer specifications. A systematic check of all accessories in the installation was conducted, and a maintenance schedule was implemented to prevent recurrence.
            </p>
          </div>
        </section>

        {/* Enhanced FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Can I install a socket in a bathroom?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Generally not, unless it's more than 3m from the edge of the bath or shower and RCD protected. Shaver sockets are allowed in certain zones with appropriate IP rating.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Do dimmer switches require special consideration?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Yes - they must match the load type (LED, halogen, incandescent) and wattage. LED dimmers require specific compatibility with LED driver types.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Can I spur multiple sockets from an FCU?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Yes, as long as the total load is within the fuse rating and cable size limits. Consider diversity and cable de-rating factors.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: What's the maximum number of sockets on a 32A ring final circuit?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: There's no specific limit in BS 7671, but guidance suggests a maximum floor area of 100m² and consideration of diversity and load assessment.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: When should I use an FCU instead of a socket?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Use FCUs for permanent appliances requiring local isolation, appliances exceeding 13A rating, or where enhanced protection is needed for specific loads.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Summary
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
            <p className="text-white/90">
              Sockets, switches, and FCUs are key components of an installation. Correct positioning, secure fixing, accurate wiring, and compliance with regulations ensure these accessories are safe, reliable, and fit for purpose.
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Quiz (8 Questions)
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-6 border-t border-white/10">
          <Button variant="outline" className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../4-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Supporting and Securing Cables
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              Next: Section 3.5
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
