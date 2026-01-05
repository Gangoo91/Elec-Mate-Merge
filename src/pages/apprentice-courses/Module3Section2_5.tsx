import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Building2,
  AlertTriangle,
  Factory,
  Home,
  Shield,
  Building,
  Target,
  Scissors,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: "trunking-spacing",
    question: "What is the typical maximum spacing for support brackets in underfloor trunking?",
    options: [
      "300mm centres",
      "600mm centres",
      "900mm centres",
    ],
    correctIndex: 1,
    explanation:
      "Support brackets for underfloor trunking should typically be placed every 600mm to ensure adequate support and prevent sagging.",
  },
  {
    id: "segregation-distance",
    question: "According to BS 7671, what is the minimum segregation distance between power and data cables in trunking?",
    options: [
      "25mm",
      "50mm",
      "100mm",
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 requires a minimum segregation distance of 50mm between power and data cables to prevent electromagnetic interference.",
  },
  {
    id: "fill-factor",
    question: "What is the maximum fill factor for cables in trunking according to BS 7671?",
    options: [
      "35%",
      "45%",
      "55%",
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 specifies a maximum fill factor of 45% for cables in trunking to ensure adequate heat dissipation and ease of installation.",
  },
  {
    id: "fire-barriers",
    question: "Fire barriers in underfloor trunking must be installed at intervals of:",
    options: [
      "10m maximum",
      "15m maximum",
      "20m maximum",
    ],
    correctIndex: 1,
    explanation:
      "Fire barriers must be installed at maximum 15m intervals in underfloor trunking to prevent fire spread and maintain compartmentation.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical maximum spacing for support brackets in underfloor trunking?",
    options: [
      "300mm",
      "600mm",
      "900mm", 
      "1200mm",
    ],
    correctAnswer: 1,
    explanation:
      "Support brackets for underfloor trunking should typically be placed every 600mm to ensure adequate support and prevent sagging.",
  },
  {
    id: 2,
    question: "According to BS 7671, what is the minimum segregation distance between power and data cables in trunking?",
    options: [
      "25mm",
      "50mm",
      "100mm",
      "150mm",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 requires a minimum segregation distance of 50mm between power and data cables to prevent electromagnetic interference.",
  },
  {
    id: 3,
    question: "Fire barriers in underfloor trunking must be installed at intervals of:",
    options: [
      "5m",
      "10m",
      "15m",
      "20m",
    ],
    correctAnswer: 2,
    explanation:
      "Fire barriers must be installed at maximum 15m intervals in underfloor trunking to prevent fire spread and maintain compartmentation.",
  },
  {
    id: 4,
    question: "What is the maximum fill factor for cables in trunking according to BS 7671?",
    options: [
      "35%",
      "45%",
      "55%",
      "65%",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 specifies a maximum fill factor of 45% for cables in trunking to ensure adequate heat dissipation and ease of installation.",
  },
  {
    id: 5,
    question: "When using metal trunking, what additional requirement must be met?",
    options: [
      "Painting",
      "Earthing",
      "Labelling",
      "Insulation",
    ],
    correctAnswer: 1,
    explanation:
      "Metal trunking must be properly earthed to provide electrical safety and comply with BS 7671 earthing requirements.",
  },
  {
    id: 6,
    question: "What is the recommended spacing for access covers in dado trunking?",
    options: [
      "1-2 metres",
      "3-4 metres",
      "5-6 metres",
      "7-8 metres",
    ],
    correctAnswer: 1,
    explanation:
      "Access covers should be positioned every 3-4 metres to allow reasonable access for cable installation and future maintenance.",
  },
  {
    id: 7,
    question: "For a 200m² office with 25 workstations at 300W each, what is the design load with 0.8 diversity factor?",
    options: [
      "6kW",
      "7.5kW",
      "6kW",
      "9kW",
    ],
    correctAnswer: 2,
    explanation:
      "Total load = 25 × 300W = 7.5kW. Design load = 7.5kW × 0.8 = 6kW with diversity factor applied.",
  },
  {
    id: 8,
    question: "Which standard specifically covers trunking and ducting systems for electrical installations?",
    options: [
      "BS 7671",
      "BS EN 50085",
      "BS 5839",
      "BS 6701",
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 50085 specifically covers cable trunking and ducting systems for electrical installations, while BS 7671 provides the installation requirements.",
  },
];

const Module3Section2_5: React.FC = () => {
  console.log("Module3Section2_5 component loaded");
  
  useSEO(
    "Underfloor and Dado Trunking Systems – Module 3 (3.2.5)",
    "Complete guide to underfloor and dado trunking systems. Installation, segregation, load calculations and BS 7671 compliance."
  );

  const faqs = [
    {
      q: "Can power and data cables share the same trunking compartment?",
      a: "No — BS 7671 requires segregation. Use compartmented trunking with minimum 50mm separation or separate trunking systems for power and data.",
    },
    {
      q: "What's the difference between underfloor and dado trunking applications?",
      a: "Underfloor trunking is hidden beneath raised floors for open-plan offices, while dado trunking is wall-mounted for accessible power and data outlets.",
    },
    {
      q: "Do PVC trunking systems require earthing?",
      a: "No — PVC trunking is non-conductive and doesn't require earthing. However, any metal components (supports, covers) must be earthed.",
    },
    {
      q: "How do you calculate the correct trunking size for mixed cable installations?",
      a: "Calculate total cable cross-sectional area including segregation barriers. Ensure maximum 45% fill factor and allow for future expansion.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Building2 className="w-6 h-6 text-foreground" />
            </div>
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-emerald-400"
            >
              Section 3.2.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Underfloor and Dado Trunking Systems
          </h1>
          <p className="text-muted-foreground">
            Understanding trunking systems for power and data distribution in commercial buildings and office environments.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Underfloor: Hidden distribution beneath raised floors for clean office aesthetics.</li>
                <li>Dado: Wall-mounted horizontal trunking with accessible outlet points.</li>
                <li>Compartmented: Segregated sections maintain separation between power and data.</li>
                <li>Both require load calculations, support spacing and BS 7671 compliance.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spot:</strong> Rectangular channels in floors (underfloor) or horizontal wall-mounted boxes (dado).
                </li>
                <li>
                  <strong>Use:</strong> Underfloor for open offices; dado for perimeter power/data distribution.
                </li>
                <li>
                  <strong>Check:</strong> 45% fill factor, 50mm segregation, 600mm support spacing, earthing continuity.
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
            Learning outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Calculate load requirements and support spacing for underfloor and dado trunking systems.</li>
            <li>Determine segregation distances and compartment sizing for mixed power and data installations.</li>
            <li>Apply fire barrier placement and access cover positioning calculations to meet regulations.</li>
            <li>Implement proper cable pulling techniques and capacity calculations for trunking systems.</li>
            <li>Ensure BS 7671 and BS EN 50085 compliance for commercial trunking installations.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Trunking Types */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Trunking System Types and Applications
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                  <p className="font-medium mb-2">Underfloor Trunking Systems</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Construction & Applications</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Installed beneath raised access floors</li>
                        <li>Compartmented for power and data segregation</li>
                        <li>Galvanised steel or PVC construction</li>
                        <li>Ideal for open-plan offices and trading floors</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Key Features</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Hidden installation maintains clean aesthetics</li>
                        <li>Flexible outlet positioning</li>
                        <li>Easy reconfiguration for office changes</li>
                        <li>High cable capacity in single installation</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Installation Requirements</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Support spacing: 600mm centres maximum</li>
                        <li>Access covers: Every 3-4 metres</li>
                        <li>Fire barriers: Every 15m maximum</li>
                        <li>Minimum 100mm clear height under floor</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-4 bg-card border border-green-400/30">
                  <p className="font-medium mb-2">Dado Trunking Systems</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-green-200 mb-1">Construction & Applications</p>
                      <ul className="list-disc pl-4 space-y-1 text-green-200">
                        <li>Wall-mounted horizontal distribution</li>
                        <li>Typically 100-200mm wide systems</li>
                        <li>Steel or PVC with snap-on covers</li>
                        <li>Perimeter power and data distribution</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-green-200 mb-1">Key Features</p>
                      <ul className="list-disc pl-4 space-y-1 text-green-200">
                        <li>Easy access for maintenance and additions</li>
                        <li>Multiple outlet configurations available</li>
                        <li>Can incorporate switches and sockets</li>
                        <li>Suitable for workshops and laboratories</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-green-200 mb-1">Installation Requirements</p>
                      <ul className="list-disc pl-4 space-y-1 text-green-200">
                        <li>Height: 150-300mm above worktop level</li>
                        <li>Support spacing: 750mm centres maximum</li>
                        <li>Level installation within ±2mm over 3m</li>
                        <li>Segregated compartments for power/data</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* What this means on site */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" /> What this means on site
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium text-orange-200 mb-2">Load calculations and sizing</p>
                <ul className="list-disc pl-4 space-y-1 text-orange-200">
                  <li>Calculate total cable cross-sectional area including separators and barriers</li>
                  <li>Apply diversity factors: 0.8 for office loads, 1.0 for critical equipment</li>
                  <li>Allow 25% spare capacity for future installations and modifications</li>
                  <li>Consider heat dissipation requirements for high-density cable installations</li>
                  <li>Factor in cable bend radius restrictions within trunking systems</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-card border border-cyan-400/30">
                <p className="font-medium text-cyan-200 mb-2">Segregation and compartmentation</p>
                <ul className="list-disc pl-4 space-y-1 text-cyan-200">
                  <li>Power circuits: Band I (up to 50V), Band II (over 50V) separation required</li>
                  <li>Data circuits: Cat5e/6/6A require separate compartments from power cables</li>
                  <li>Fire barriers: Must maintain compartmentation integrity across trunking runs</li>
                  <li>Access planning: Coordinate with building services and structural constraints</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* Installation Calculations */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" /> Installation Calculations and Methods
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/30">
                <p className="font-medium text-emerald-200 mb-2">Support and structural calculations</p>
                <ul className="list-disc pl-4 space-y-1 text-emerald-200">
                  <li><strong>Support loading:</strong> Trunking weight + cable weight + 2.5 safety factor</li>
                  <li><strong>Underfloor spacing:</strong> 600mm centres for standard loads up to 50kg/m</li>
                  <li><strong>Dado spacing:</strong> 750mm centres with additional support at junctions</li>
                  <li><strong>Deflection limits:</strong> Maximum L/300 under full load for steel systems</li>
                  <li><strong>Thermal expansion:</strong> Allow 1mm per metre for temperature changes</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-violet-500/10 border border-violet-400/30">
                <p className="font-medium text-violet-200 mb-2">Cable capacity and fill calculations</p>
                <ul className="list-disc pl-4 space-y-1 text-violet-200">
                  <li><strong>Fill factor formula:</strong> (Total cable area ÷ compartment area) × 100%</li>
                  <li><strong>Maximum fill:</strong> 45% for cables in trunking (BS 7671 Table 4F1)</li>
                  <li><strong>Cable area:</strong> π × (d/2)² where d = overall cable diameter</li>
                  <li><strong>Derating:</strong> Apply current capacity reduction factors for grouping</li>
                  <li><strong>Heat dissipation:</strong> Consider thermal resistance of trunking material</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
                <p className="font-medium text-indigo-200 mb-2">Worked example: Office trunking sizing</p>
                <div className="bg-background/50 p-3 rounded font-mono text-xs text-indigo-100">
                  <p><strong>Scenario:</strong> 500m² office, 50 workstations at 300W each</p>
                  <p><strong>Calculation:</strong></p>
                  <p>• Total load = 50 × 300W = 15kW</p>
                  <p>• Diversity factor = 0.8 (office environment)</p>
                  <p>• Design load = 15kW × 0.8 = 12kW</p>
                  <p>• Current = 12,000W ÷ 230V = 52.2A</p>
                  <p>• Cable: 10mm² T&E (carrying capacity 64A)</p>
                  <p>• Cable diameter = 11.5mm (inc. sheath)</p>
                  <p>• 20 cables required for distribution</p>
                  <p>• Total cable area = 20 × π × (11.5/2)² = 2077mm²</p>
                  <p>• Compartment area req. = 2077 ÷ 0.45 = 4616mm²</p>
                  <p>• Select: 100 × 50mm compartment (5000mm²)</p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* Common Mistakes */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Common Mistakes to Avoid
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium text-red-200 mb-2">Installation errors</p>
                <ul className="list-disc pl-4 space-y-1 text-red-200">
                  <li><strong>Overfilling trunking:</strong> Exceeding 45% fill factor causes overheating and installation difficulties</li>
                  <li><strong>Inadequate segregation:</strong> Mixing power and data cables without proper barriers</li>
                  <li><strong>Poor support spacing:</strong> Excessive spans causing sagging and stress on cable insulation</li>
                  <li><strong>Missing fire barriers:</strong> Compromising building compartmentation and fire safety</li>
                  <li><strong>Incorrect earthing:</strong> Failing to maintain continuity in metal trunking systems</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-card border border-amber-400/30">
                <p className="font-medium text-amber-200 mb-2">Planning and design oversights</p>
                <ul className="list-disc pl-4 space-y-1 text-amber-200">
                  <li><strong>Insufficient access provision:</strong> Poor access cover placement making maintenance difficult</li>
                  <li><strong>Ignoring future expansion:</strong> Not allowing adequate spare capacity for modifications</li>
                  <li><strong>Poor coordination:</strong> Conflicts with other building services and structural elements</li>
                  <li><strong>Thermal considerations:</strong> Not accounting for heat buildup in high-density installations</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[3]} />
          <Separator className="my-6" />

          {/* BS 7671 Context */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> BS 7671 and Standards Context
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium text-blue-200 mb-2">Key standards and regulations</p>
                <ul className="list-disc pl-4 space-y-1 text-blue-200">
                  <li><strong>BS EN 50085:</strong> Cable trunking and ducting systems for electrical installations</li>
                  <li><strong>BS 7671 Section 521:</strong> Selection and erection of wiring systems - trunking</li>
                  <li><strong>521.8:</strong> Requirements for cable trunking and ducting systems</li>
                  <li><strong>543.2:</strong> Protective conductor arrangements for trunking systems</li>
                  <li><strong>527.1:</strong> Current-carrying capacity and voltage drop in trunking</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-card border border-green-400/30">
                <p className="font-medium text-green-200 mb-2">Segregation and compatibility requirements</p>
                <ul className="list-disc pl-4 space-y-1 text-green-200">
                  <li>Band I circuits (ELV): Up to 50V including telecommunications and control</li>
                  <li>Band II circuits: Over 50V including power distribution circuits</li>
                  <li>Physical segregation: Separate compartments or 50mm minimum air gap</li>
                  <li>Electromagnetic compatibility: Consider screening requirements for sensitive circuits</li>
                  <li>Fire barrier requirements: Maintain compartmentation per Building Regulations</li>
                </ul>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium text-purple-200 mb-2">Testing and compliance verification</p>
                <ul className="list-disc pl-4 space-y-1 text-purple-200">
                  <li>Earth continuity: &lt;0.05Ω between all metallic sections</li>
                  <li>Insulation resistance: Minimum 1MΩ between segregated compartments</li>
                  <li>Fill factor verification: Measure and document actual vs. calculated values</li>
                  <li>Mechanical security: Check support fixing and trunking joint integrity</li>
                  <li>Documentation: Installation certificates, test records and as-built drawings</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-world Scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building className="w-5 h-5" /> Real-world Scenario
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-card border border-slate-400/30">
            <h3 className="font-medium text-slate-200 mb-2">Open-plan office electrical distribution</h3>
            <p className="text-slate-200 text-sm mb-3">
              A financial services company requires electrical distribution for a new 800m² trading floor
              with 60 workstations, each requiring power and dual data connections.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-slate-200 mb-2">Underfloor power distribution</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-200">
                  <li>Compartmented trunking: 150 × 100mm steel construction</li>
                  <li>Power compartment: 32A radial circuits using 4mm² T&E</li>
                  <li>Support spacing: 600mm centres due to 25kg/m load</li>
                  <li>Fire barriers: Every 12m to exceed regulatory requirements</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-slate-200 mb-2">Data distribution system</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-200">
                  <li>Separate compartment: Cat6A cabling for high-speed trading</li>
                  <li>120 data points: Dual connections per workstation</li>
                  <li>Access covers: Every 3m for flexible outlet positioning</li>
                  <li>Future capacity: 50% spare for trading floor expansion</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-emerald-500/50 pl-4">
                <p className="font-medium text-foreground mb-1">Q: {faq.q}</p>
                <p className="text-muted-foreground text-sm">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <div className="space-y-3 text-xs sm:text-sm text-foreground">
            <p>
              <strong>Trunking systems</strong> provide organised, accessible distribution for power and data cables in commercial buildings.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Underfloor trunking</strong> offers hidden distribution beneath raised floors with flexible outlet positioning</li>
              <li><strong>Dado trunking</strong> provides wall-mounted distribution with easy access for maintenance</li>
              <li><strong>Segregation</strong> is critical - maintain 50mm minimum separation between power and data circuits</li>
              <li><strong>Load calculations</strong> must include diversity factors, future capacity and thermal considerations</li>
              <li><strong>Installation compliance</strong> requires proper support spacing, earthing and fire barrier placement</li>
            </ul>
            <p>
              Proper installation with correct fill factors, segregation and support spacing ensures safe, 
              compliant installations meeting BS EN 50085 and BS 7671 requirements.
            </p>
          </div>
        </Card>

        {/* Apprentice Do's and Don'ts */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Apprentice Do's and Don'ts</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="rounded-lg p-4 bg-card border border-green-400/30">
              <h3 className="font-medium text-green-200 mb-3">✓ DO</h3>
              <ul className="space-y-2 text-green-200">
                <li>• Calculate cable cross-sectional areas and ensure 45% maximum fill</li>
                <li>• Maintain 50mm minimum segregation between power and data</li>
                <li>• Install support brackets at 600mm centres maximum</li>
                <li>• Provide fire barriers every 15m to maintain compartmentation</li>
                <li>• Test earth continuity in metal trunking systems (&lt;0.05Ω)</li>
                <li>• Plan access covers every 3-4m for future maintenance</li>
                <li>• Allow 25% spare capacity for future installations</li>
                <li>• Document all calculations and test results</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <h3 className="font-medium text-red-200 mb-3">✗ DON'T</h3>
              <ul className="space-y-2 text-red-200">
                <li>• Exceed 45% fill factor - causes overheating risks</li>
                <li>• Mix power and data cables without proper segregation</li>
                <li>• Install with excessive support spacing causing sagging</li>
                <li>• Forget fire barriers in long trunking runs</li>
                <li>• Ignore earthing requirements for metal systems</li>
                <li>• Block access to junction boxes and terminations</li>
                <li>• Install without considering future expansion needs</li>
                <li>• Rush installation without proper measurements</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Pocket Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Pocket Card: Trunking Installation Quick Reference</h2>
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-lg p-3 bg-card border border-border/30">
              <h4 className="font-medium text-blue-200 mb-2">Underfloor Trunking</h4>
              <ul className="space-y-1 text-blue-200">
                <li>• Support spacing: 600mm max</li>
                <li>• Fire barriers: Every 15m</li>
                <li>• Access covers: Every 3-4m</li>
                <li>• Fill factor: 45% maximum</li>
                <li>• Segregation: 50mm min</li>
                <li>• Earth continuity: &lt;0.05Ω</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 bg-card border border-green-400/30">
              <h4 className="font-medium text-green-200 mb-2">Dado Trunking</h4>
              <ul className="space-y-1 text-green-200">
                <li>• Support spacing: 750mm max</li>
                <li>• Height: 150-300mm above desk</li>
                <li>• Level tolerance: ±2mm/3m</li>
                <li>• Fill factor: 45% maximum</li>
                <li>• Compartments: Separate power/data</li>
                <li>• Access: Snap-on covers</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <p className="text-yellow-200 text-xs">
              <strong>Critical checks:</strong> Fill factor calculation, segregation distances, support spacing, 
              fire barrier placement, earthing continuity. Test before energising!
            </p>
          </div>
        </Card>

        {/* Key References */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Key References</h2>
          <div className="space-y-2 text-xs sm:text-sm text-foreground">
            <div className="flex justify-between items-center p-2 rounded bg-muted/10">
              <span>BS EN 50085:2005</span>
              <span className="text-muted-foreground">Cable trunking and ducting systems</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-muted/10">
              <span>BS 7671:2018+A2:2022</span>
              <span className="text-muted-foreground">IET Wiring Regulations (Section 521)</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-muted/10">
              <span>Building Regulations Part B</span>
              <span className="text-muted-foreground">Fire safety and compartmentation</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-muted/10">
              <span>BS EN 61439-2</span>
              <span className="text-muted-foreground">Switchgear and controlgear assemblies</span>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="p-6 bg-card border-border/20">
          <Quiz title="Test Your Knowledge: Underfloor and Dado Trunking Systems" questions={quizQuestions} />
        </Card>
      </main>
    </div>
  );
};

export default Module3Section2_5;