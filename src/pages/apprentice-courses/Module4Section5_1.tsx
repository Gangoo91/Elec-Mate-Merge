import { ArrowLeft, ArrowRight, Plug, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Mounting Socket Outlets, Switches, and Spurs - Module 4.5.1 | Level 2 Electrical Course";
const DESCRIPTION = "Master the correct procedures for mounting socket outlets, switches, and spurs. Learn positioning requirements, fixing methods, wiring connections, and testing procedures according to BS 7671 and Building Regulations Part M.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the typical mounting height for socket outlets in new builds according to Part M?",
    options: ["300mm", "450mm", "500mm"],
    correctIndex: 1,
    explanation: "Part M of Building Regulations requires socket outlets to be mounted at 450mm to the bottom edge from finished floor level in new builds for accessibility."
  },
  {
    id: 2,
    question: "Why are grommets fitted to back box cable entries?",
    options: ["For decoration", "To protect cables from sharp edges", "To improve conductivity"],
    correctIndex: 1,
    explanation: "Grommets protect cable insulation from damage caused by sharp edges of the knockout holes in back boxes."
  },
  {
    id: 3,
    question: "What is the correct earth conductor colour in modern UK wiring?",
    options: ["Green/yellow", "Blue", "Brown"],
    correctIndex: 0,
    explanation: "The modern UK standard uses green/yellow sleeving for earth conductors in accordance with BS 7671."
  }
];

const Module4Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the standard mounting height for socket outlets in a new build under Part M?",
      options: [
        "300 mm",
        "450 mm", 
        "500 mm",
        "600 mm"
      ],
      correctAnswer: 1,
      explanation: "Building Regulations Part M requires socket outlets to be mounted at 450mm to the bottom edge from finished floor level in new builds for accessibility."
    },
    {
      id: 2,
      question: "Which regulation sets out accessibility heights for sockets and switches?",
      options: [
        "BS 7671",
        "Building Regulations Part M",
        "BS 5839",
        "IET Code of Practice"
      ],
      correctAnswer: 1,
      explanation: "Building Regulations Part M sets out accessibility requirements including mounting heights for electrical accessories."
    },
    {
      id: 3,
      question: "True or False: Switches are generally mounted at 900mm above floor level in new builds.",
      options: [
        "True", 
        "False",
        "Only in bathrooms",
        "Only for commercial buildings"
      ],
      correctAnswer: 1,
      explanation: "False. Switches are generally mounted at 1200mm to the centre from finished floor level in new builds according to Part M."
    },
    {
      id: 4,
      question: "Name two types of back boxes.",
      options: [
        "Flush-mounted and surface-mounted",
        "Round and square",
        "Metal and plastic",
        "Large and small"
      ],
      correctAnswer: 0,
      explanation: "The main types are flush-mounted (for plastered walls), surface-mounted (for workshops/garages), and dry-lining boxes (for partition walls)."
    },
    {
      id: 5,
      question: "Why are grommets used in back boxes?",
      options: [
        "For decoration",
        "To protect cables from sharp edges and prevent insulation damage",
        "To improve electrical conductivity",
        "To reduce installation time"
      ],
      correctAnswer: 1,
      explanation: "Grommets protect cables from sharp edges of knockout holes and prevent damage to cable insulation."
    },
    {
      id: 6,
      question: "What is the correct wiring colour for a neutral conductor in modern UK wiring?",
      options: [
        "Brown",
        "Blue", 
        "Green/yellow",
        "Black"
      ],
      correctAnswer: 1,
      explanation: "In modern UK wiring, the neutral conductor is blue in accordance with BS 7671 harmonised colours."
    },
    {
      id: 7,
      question: "What should be done before energising a newly installed socket outlet?",
      options: [
        "Check it looks neat",
        "Carry out polarity, continuity, and insulation resistance tests",
        "Install the faceplate",
        "Clean the area"
      ],
      correctAnswer: 1,
      explanation: "Testing including polarity, continuity, and insulation resistance tests must be completed before energising any new installation."
    },
    {
      id: 8,
      question: "Give one practical tip to ensure socket outlets are aligned in a row.",
      options: [
        "Use a tape measure",
        "Use a laser level or temporarily fit all faceplates before final fixing",
        "Measure from the ceiling",
        "Estimate by eye"
      ],
      correctAnswer: 1,
      explanation: "Using a laser level or temporarily fitting all faceplates before final fixing ensures perfect alignment across multiple accessories."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Plug className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.5.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Mounting Socket Outlets, Switches, and Spurs
          </h1>
          <p className="text-white">
            Master the fundamental skills for installing electrical accessories safely and correctly, ensuring compliance with BS 7671 and Building Regulations Part M.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Set out from consistent reference points for accuracy.</li>
                <li>Use correct spacing: conduit 1.2-1.5m, trunking 0.9-1.2m.</li>
                <li>Check for obstructions and mark centre lines for alignment.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Reference points, fixing positions, potential obstructions.</li>
                <li><strong>Use:</strong> Levels for alignment, chalk lines for marking, correct spacing.</li>
                <li><strong>Check:</strong> Measurements, alignment, compliance with drawings.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify the correct mounting heights and positions for sockets, switches, and spurs according to regulations and client requirements.</li>
            <li>Select appropriate fixings and back boxes for different wall types and installation environments.</li>
            <li>Wire accessories correctly, ensuring secure terminations and correct polarity according to BS 7671.</li>
            <li>Test the installation for safety and functionality before energising the circuit.</li>
            <li>Apply best practices for neatness, accessibility, and durability in professional installations.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Regulatory Requirements and Standard Heights */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Regulatory Requirements and Standard Heights</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              BS 7671 and Building Regulations Part M establish mounting heights for accessibility and safety compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Building Regulations Part M Requirements</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Socket outlet heights:</strong> 450mm to bottom edge from finished floor level in new builds.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Switch heights:</strong> 1200mm to centre from finished floor level for accessibility.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Special considerations:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Kitchen worktop sockets: 150mm above work surface minimum</li>
                      <li>Bathroom zones: specific height restrictions for safety zones</li>
                      <li>Commercial buildings: may require different heights for specific use</li>
                      <li>Retrofit installations: existing heights may be retained if safe</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Compliance note:</strong> Part M applies to new builds - retrofit work may follow existing patterns
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">BS 7671 Safety and Installation Requirements</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Safe zones for cable routes:</strong> Accessories must be positioned to maintain safe cable routes.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Environmental considerations:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>IP ratings appropriate for location (bathrooms, kitchens, outdoor)</li>
                      <li>Minimum distances from water sources and heat sources</li>
                      <li>Fire barrier requirements for penetrations through walls</li>
                      <li>RCD protection requirements for socket outlet circuits</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Circuit protection and design:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Ring final circuits: maximum 100m² floor area coverage</li>
                      <li>Spur limitations: maximum one socket or one FCU per spur</li>
                      <li>Diversity calculations for socket outlet loading</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Key regulation:</strong> 522.6.202 - cables concealed in walls require RCD protection
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Site-Specific Requirements and Client Specifications</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Design drawings take precedence:</strong> Always follow project specifications over general guidelines.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Special environment considerations:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Schools and care homes: child-safe heights and tamper-resistant outlets</li>
                      <li>Industrial premises: robust mounting and IP-rated accessories</li>
                      <li>Listed buildings: conservation considerations for visible installations</li>
                      <li>Accessible housing: lower switch heights and contrasting faceplates</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Professional practice:</strong> Confirm heights with client before fixing positions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="regulatory-requirements-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Box Selection and Fixing Methods */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Box Selection and Fixing Methods</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Selecting appropriate back boxes and fixing methods ensures secure, long-lasting installations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Back Box Types and Applications</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Flush-mounted boxes:</strong> For plastered walls in domestic and commercial applications.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Surface-mounted boxes:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Workshops and garages where chasing is not practical</li>
                      <li>Temporary installations and portable buildings</li>
                      <li>Retrofit work where minimal disruption is required</li>
                      <li>Industrial environments requiring robust protection</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Dry-lining boxes:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Plasterboard partition walls without solid backing</li>
                      <li>Stud wall constructions with cavity insulation</li>
                      <li>Metal stud partitions requiring special fixings</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Depth selection:</strong> 25mm minimum for single accessories, 35mm for doubles
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Wall Construction and Fixing Selection</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Solid masonry walls:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Brown plugs (size 6) for brick construction</li>
                      <li>Grey plugs (size 8) for concrete block or hard materials</li>
                      <li>Hammer fixings for fast installation in hard substrates</li>
                      <li>Chemical anchors for maximum holding power in poor substrates</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Hollow construction:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Spring toggles for plasterboard on metal frame</li>
                      <li>Expanding anchors for cavity walls with thin inner leaf</li>
                      <li>Dry-lining boxes with integral fixings for standard plasterboard</li>
                      <li>Metal stud grab fixings for commercial partitions</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Load consideration:</strong> Single sockets require 25kg pull-out resistance minimum
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Mounting Procedure and Quality Assurance</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Accurate marking out:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Use laser level or water level for consistent heights</li>
                      <li>Mark from same datum point to avoid cumulative errors</li>
                      <li>Check for services behind wall using detector before drilling</li>
                      <li>Use box template or faceplate for precise hole cutting</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Installation best practice:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Ensure box sits flush with final wall finish level</li>
                      <li>Fit grommets to all cable entry points before cable installation</li>
                      <li>Leave adequate conductor length (150mm minimum) for connections</li>
                      <li>Test box security with firm pull before proceeding to wiring</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Quality check:</strong> Box should not move when moderate force is applied to edges
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="box-selection-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Installation Procedures and Wiring */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Installation Procedures and Wiring</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Systematic installation and wiring procedures ensure safety, compliance, and professional results:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Cable Preparation and Stripping</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Conductor preparation:</strong> Strip insulation carefully to avoid nicking copper conductors.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Cable types and preparation:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Twin and earth: remove outer sheath 25mm, inner conductors 12mm</li>
                      <li>Single core: strip to manufacturer's recommended length (typically 12mm)</li>
                      <li>SWA cables: use proper cable glands and maintain armour earthing</li>
                      <li>Data cables: maintain twist rates and use appropriate termination tools</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Earth conductor requirements:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Apply green/yellow sleeving to bare earth conductors</li>
                      <li>Ensure earth continuity through all accessories</li>
                      <li>Use earth tail connections for metal back boxes</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety requirement:</strong> All earth conductors must be identifiable and continuous
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Correct Terminal Connections</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>BS 7671 harmonised colours (post-2004):</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Live (Line): Brown conductor to L terminal</li>
                      <li>Neutral: Blue conductor to N terminal</li>
                      <li>Earth: Green/yellow sleeved conductor to E or ⏚ terminal</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Terminal tightening procedure:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Insert conductor fully into terminal - no copper visible</li>
                      <li>Tighten screw to manufacturer's torque specification</li>
                      <li>Perform gentle pull test to verify secure connection</li>
                      <li>Check adjacent terminals not loosened during tightening</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Ring final circuit connections:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Two line conductors into line terminal for through connections</li>
                      <li>Two neutral conductors into neutral terminal</li>
                      <li>All earth conductors connected with earth tail to accessory</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical check:</strong> Verify polarity before energising - L and N must not be reversed
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Spur Connections and Protection</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Unfused spur limitations:</strong> Maximum one single or one double socket per spur.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Fused spur requirements:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>13A fuse maximum for socket outlet protection</li>
                      <li>Fused connection unit (FCU) to be accessible</li>
                      <li>Load side of FCU can supply multiple accessories</li>
                      <li>Appropriate cable sizing for load and protection</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Cable routing for spurs:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Maintain safe zones as per BS 7671 Section 522</li>
                      <li>RCD protection required for concealed cables in walls</li>
                      <li>Adequate mechanical protection in exposed areas</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Design limitation:</strong> Total number of spurs must not exceed socket outlets on ring
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="wiring-procedures-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Testing and Quality Control */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Testing and Quality Control</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Comprehensive testing ensures safety, compliance, and reliable operation before the installation is energised:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Pre-Energising Safety Tests</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Continuity of protective conductors:</strong> Verify earth path integrity through all accessories.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Test sequence (BS 7671 Part 6):</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Continuity of protective conductors (R1+R2 test)</li>
                      <li>Continuity of ring final circuit conductors</li>
                      <li>Insulation resistance testing at 500V DC</li>
                      <li>Polarity verification using continuity tester</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Acceptable test values:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Insulation resistance: minimum 1MΩ at 500V DC</li>
                      <li>Earth continuity: typically 0.05-1.38Ω for domestic circuits</li>
                      <li>Ring circuit end-to-end: ±0.05Ω difference maximum</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical requirement:</strong> No test may be omitted - all must pass before energising
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Functional Testing and RCD Verification</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>RCD testing requirements:</strong> All socket circuits require 30mA RCD protection.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>RCD test procedure:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>×1 rated current test: should NOT trip</li>
                      <li>×1 rated current test: should trip within 300ms</li>
                      <li>×5 rated current test: should trip within 40ms</li>
                      <li>Manual test button operation verification</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Socket outlet functional tests:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Socket tester to verify correct wiring and earth integrity</li>
                      <li>Switch operation check for switched sockets</li>
                      <li>USB socket operation where fitted</li>
                      <li>Phase rotation verification for 3-phase sockets</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Documentation:</strong> All test results must be recorded on installation certificate
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Visual Inspection and Professional Finish</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Visual inspection checklist:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>All accessories level, aligned, and securely fixed</li>
                      <li>Faceplates flush with wall surface, no gaps or damage</li>
                      <li>Correct cable entry and grommet protection</li>
                      <li>No visible conductors or poor terminations</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Professional finishing standards:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Clean accessories and surrounding areas</li>
                      <li>Faceplate screws aligned (vertical slots typically)</li>
                      <li>Cable damage inspection and repair where necessary</li>
                      <li>Label circuits clearly for future identification</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Quality standard:</strong> Installation should appear professionally completed to building standards
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-world example */}
        <Card className="mb-8 p-6 border-elec-blue">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-world example</h2>
          <p className="text-xs sm:text-sm text-white mb-4">
            During a school refurbishment project, the electrical contractor installed socket outlets at standard 300mm height to match existing installations. However, the building control officer noted that the new extension was subject to Part M accessibility requirements and required 450mm mounting height for all new socket outlets.
          </p>
          <p className="text-xs sm:text-sm text-white mb-4">
            The contractor had to relocate all socket outlets in the new areas, requiring new back boxes, cable extensions, and making good of the original holes. The rework delayed the project by two weeks and doubled the labour costs for the socket installations.
          </p>
          <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
            <p className="font-medium text-green-600 dark:text-green-400 mb-2">Lesson learned</p>
            <p className="text-sm text-green-600 dark:text-green-400">
              Always verify which regulations apply to specific areas of a project. New build, extensions, and refurbishment work may have different requirements even within the same building. Check Part M compliance requirements during the design phase and confirm mounting heights with building control before installation begins.
            </p>
          </div>
        </Card>

        {/* Practical guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical guidance</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div>
              <h3 className="font-medium text-white mb-3">Planning and Measurement</h3>
              <ul className="space-y-2 text-white">
                <li>• Use laser level or water level for consistent heights across multiple accessories.</li>
                <li>• Mark all positions from the same datum point to avoid cumulative measurement errors.</li>
                <li>• Check for hidden services using electronic detector before drilling or chasing.</li>
                <li>• Create paper templates for complex multi-gang installations to ensure accuracy.</li>
                <li>• Allow for final floor finishes when setting socket heights from subfloor level.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-3">Installation Best Practice</h3>
              <ul className="space-y-2 text-white">
                <li>• Install all back boxes before pulling cables to ensure proper cable management.</li>
                <li>• Leave 150mm minimum conductor length for reliable connections and future maintenance.</li>
                <li>• Use correct torque on terminal screws - overtightening can damage accessories.</li>
                <li>• Fit temporary faceplate when testing to check final appearance and alignment.</li>
                <li>• Complete all testing before final fixing to avoid unnecessary removal for faults.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quick knowledge check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick knowledge check</h2>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium text-white mb-2">What is the standard socket outlet height for new builds under Part M?</p>
              <p className="text-sm text-white">450mm to the bottom edge from finished floor level for accessibility compliance in new construction.</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium text-white mb-2">Why must earth conductors be sleeved in green/yellow?</p>
              <p className="text-sm text-white">BS 7671 requires clear identification of protective conductors to prevent confusion and ensure safety during maintenance.</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium text-white mb-2">What is the maximum number of sockets allowed on an unfused spur?</p>
              <p className="text-sm text-white">One single socket or one double socket maximum per unfused spur from a ring final circuit.</p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white mb-2">Q: Can socket heights vary from the standard Part M recommendation?</h3>
              <p className="text-sm text-white">A: Yes, in retrofit works or special needs environments, different heights may be specified. Always follow project drawings and confirm with building control for new work.</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium text-white mb-2">Q: What is the main reason for sleeving earth conductors?</h3>
              <p className="text-sm text-white">A: To provide clear identification and prevent accidental contact with live parts during installation and maintenance work.</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium text-white mb-2">Q: Do spurs need to be on the same RCD as the ring final circuit?</h3>
              <p className="text-sm text-white">A: Yes, spurs must have the same protective device as the circuit they are fed from, including RCD protection for socket circuits.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <p className="text-xs sm:text-sm text-white">
            Mounting socket outlets, switches, and spurs requires careful planning, adherence to regulations, and precise execution. Correct heights according to Part M, secure fixings appropriate to wall construction, neat wiring with proper connections, and thorough testing ensure the installation is safe, compliant, and professional. Always verify requirements with project specifications and building control.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test your knowledge of mounting socket outlets, switches, and spurs" />

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
          <Button asChild>
            <Link to="../5-2">
              Next: Installing Lighting Points and Pendants
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section5_1;