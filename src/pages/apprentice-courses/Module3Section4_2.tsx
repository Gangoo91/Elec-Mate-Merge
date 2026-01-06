import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Construction,
  AlertTriangle,
  Paintbrush,
  Home,
  Shield,
  Building,
  Target,
  Scissors,
  Settings,
  CheckCircle2,
  Zap,
  Hammer,
  Power,
  Activity,
  Search,
  Truck,
  HardHat,
  Cable,
  Clock,
  Users,
  ClipboardCheck,
  Wrench,
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
    id: "trunking-stage",
    question: "At which stage is trunking typically installed — First Fix or Second Fix?",
    options: [
      "First Fix",
      "Second Fix",
      "Both stages",
      "Neither stage",
    ],
    correctIndex: 0,
    explanation:
      "Trunking is installed during First Fix as it forms part of the cable containment infrastructure that must be in place before surfaces are finished.",
  },
  {
    id: "decoration-timing",
    question: "Why should Second Fix only occur after decoration is complete?",
    options: [
      "To save time",
      "To prevent damage to final fittings and finishes",
      "To reduce costs",
      "To meet building regulations",
    ],
    correctIndex: 1,
    explanation:
      "Second Fix must wait until decoration is complete to prevent damage to electrical accessories and to avoid contaminating painted surfaces during installation.",
  },
  {
    id: "first-fix-task",
    question: "Name one key task in the First Fix stage.",
    options: [
      "Installing socket outlets",
      "Running cables through containment",
      "Fitting light switches",
      "Testing final circuits",
    ],
    correctIndex: 1,
    explanation:
      "Running cables through floors, walls, ceilings, and containment is a key First Fix task, establishing the electrical infrastructure before surfaces are finished.",
  },
];

const mainQuizQuestions = [
  {
    id: 1,
    question: "Which stage includes installing back boxes?",
    options: ["First Fix", "Second Fix", "Both", "Neither"],
    correctAnswer: 0,
    explanation:
      "Back boxes are installed during First Fix as they need to be embedded in walls before plastering and decoration.",
  },
  {
    id: 2,
    question: "Why is the two-stage approach used?",
    options: [
      "To split labour costs evenly",
      "To protect final fittings and coordinate with other trades",
      "To avoid electrical testing",
      "To save on materials",
    ],
    correctAnswer: 1,
    explanation:
      "The two-stage approach protects final electrical fittings from damage during construction and allows proper coordination with other building trades.",
  },
  {
    id: 3,
    question: "True or False: All testing is carried out only during First Fix.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False — Basic continuity and insulation resistance tests may be done during First Fix, but comprehensive testing including circuit functionality is carried out at Second Fix.",
  },
  {
    id: 4,
    question: "Name one accessory installed during Second Fix.",
    options: ["Back boxes", "Conduit", "Socket outlets", "Cable trays"],
    correctAnswer: 2,
    explanation:
      "Socket outlets are installed during Second Fix, along with switches, light fittings, and other accessories that complete the electrical installation.",
  },
  {
    id: 5,
    question: "Which stage usually includes running main earthing conductors?",
    options: ["First Fix", "Second Fix", "Both", "Neither"],
    correctAnswer: 0,
    explanation:
      "Main earthing conductors are installed during First Fix as part of the essential electrical infrastructure that must be in place before final connections.",
  },
  {
    id: 6,
    question: "Why is trunking installed before plastering?",
    options: [
      "To hide it completely",
      "To prevent damage from other trades",
      "To allow cables to be run easily without damaging finished walls",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "All options are correct — trunking is installed before plastering to hide it, protect it from damage, and allow easy cable installation without damaging finished surfaces.",
  },
  {
    id: 7,
    question: "What document must be finalised during Second Fix for compliance?",
    options: [
      "Building permit",
      "Electrical Installation Certificate",
      "Planning permission",
      "Fire safety certificate",
    ],
    correctAnswer: 1,
    explanation:
      "The Electrical Installation Certificate must be completed and signed during Second Fix to demonstrate compliance with BS 7671 and building regulations.",
  },
  {
    id: 8,
    question: "Give one reason why Second Fix requires careful handling of accessories.",
    options: [
      "They are expensive",
      "To avoid damaging walls, paintwork, or finishes",
      "They are fragile",
      "To save time",
    ],
    correctAnswer: 1,
    explanation:
      "Careful handling during Second Fix is essential to avoid damaging the completed walls, paintwork, or floor finishes that have been applied since First Fix.",
  },
];

const Module3Section4_2: React.FC = () => {
  console.log("Module3Section4_2 component loaded");
  
  useSEO(
    "First Fix and Second Fix Explained – Module 3 (3.4.2)",
    "Complete guide to First Fix and Second Fix electrical installation stages. Project planning, coordination with trades and BS 7671 compliance."
  );

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white active:text-white p-0 -ml-1"
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Cable className="w-6 h-6 text-white" />
            </div>
            <Badge
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow"
            >
              Section 3.4.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            First Fix and Second Fix Explained
          </h1>
          <p className="text-white">
            Understanding the two-stage electrical installation approach for project planning and trade coordination.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>First Fix:</strong> Infrastructure phase — cables, containment, back boxes, CU location.</li>
                <li><strong>Second Fix:</strong> Finish phase — accessories fitted and final terminations and testing.</li>
                <li>Sequence protects finishes and improves coordination with other trades.</li>
                <li>Testing: preliminary checks at First Fix; full testing and certification at Second Fix.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Trunking, conduits, and back boxes (First Fix); flush sockets, luminaires (Second Fix).</li>
                <li><strong>Use:</strong> Carry out First Fix before plaster/decoration; Second Fix only after finishes are complete.</li>
                <li><strong>Check:</strong> Safe zones, earthing/bonding in place, documentation and labels at Second Fix.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Define the terms First Fix and Second Fix in electrical installation.</li>
            <li>Identify the tasks carried out in each stage.</li>
            <li>Understand how timing affects efficiency and quality.</li>
            <li>Recognise the importance of coordination with other trades.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* First Fix */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" /> First Fix
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Definition</p>
                <p>The stage where cables, containment, and electrical infrastructure are installed, but final connections and fittings are not yet in place.</p>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Typical Tasks</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Running cables through floors, walls, ceilings, and containment.</li>
                  <li>Installing conduits, trunking, cable trays, and back boxes.</li>
                  <li>Mounting consumer units and distribution boards.</li>
                  <li>Installing earth bonding and main earthing conductors.</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Timing</p>
                <p>Usually carried out after initial construction but before plastering, decoration, or floor finishes.</p>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-2">Key Considerations</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Ensure cable routes are planned in compliance with safe zones.</li>
                  <li>Allow for future capacity.</li>
                  <li>Protect installed cables from damage by other trades.</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* Second Fix */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5" /> Second Fix
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium mb-2">Definition</p>
                <p>The stage where electrical accessories and final connections are installed after surfaces are finished.</p>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium mb-2">Typical Tasks</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Fitting sockets, switches, and light fittings.</li>
                  <li>Connecting appliances and equipment.</li>
                  <li>Terminating and testing final circuits.</li>
                  <li>Labelling distribution boards and finalising documentation.</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium mb-2">Timing</p>
                <p>Carried out after walls are painted, floors laid, and ceilings finished to prevent damage to final fittings.</p>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-2">Key Considerations</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Handle accessories carefully to avoid damaging finishes.</li>
                  <li>Test circuits before energising.</li>
                  <li>Ensure all work complies with BS 7671 and Part P (where applicable).</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* Benefits of Two-Stage Approach */}
          <section className="mb-2">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" /> Benefits of the Two-Stage Approach
            </h3>
            <div className="rounded-lg p-4 bg-transparent border border-amber-400/30 text-xs sm:text-sm text-white">
              <ul className="list-disc pl-6 space-y-2">
                <li>Prevents damage to final fittings during construction.</li>
                <li>Allows easier installation of cables and containment without obstruction.</li>
                <li>Facilitates better coordination between electrical and other trades.</li>
                <li>Improves quality control and reduces snagging.</li>
              </ul>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* Coordination with Other Trades */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" /> Coordination with Other Trades
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">First Fix Coordination</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>With Builders:</strong> Ensure structural work complete before cable runs.</li>
                  <li><strong>With Plumbers:</strong> Coordinate routes to avoid clashes with pipework.</li>
                  <li><strong>With HVAC:</strong> Plan around ductwork and ventilation systems.</li>
                  <li><strong>With Carpenters:</strong> Mark cable routes before stud work completion.</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Second Fix Coordination</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>With Decorators:</strong> Wait until all painting and wallpapering complete.</li>
                  <li><strong>With Flooring:</strong> Coordinate socket heights with floor finishes.</li>
                  <li><strong>With Kitchen Fitters:</strong> Time appliance connections with installation.</li>
                  <li><strong>With Final Clean:</strong> Install accessories after deep cleaning.</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Testing Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Search className="w-5 h-5" /> Testing Requirements by Stage
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                <p className="font-medium mb-2">First Fix Testing</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Continuity of protective conductors (R1 + R2)</li>
                  <li>Continuity of ring final circuit conductors</li>
                  <li>Insulation resistance testing (before connection to consumer unit)</li>
                  <li>Earth electrode resistance (if applicable)</li>
                  <li>Visual inspection of cable routes and containment</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                <p className="font-medium mb-2">Second Fix Testing</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Complete sequence testing per BS 7671 Chapter 61</li>
                  <li>Polarity testing of all circuits</li>
                  <li>Earth fault loop impedance (Zs) measurements</li>
                  <li>RCD functionality and operating times</li>
                  <li>Functional testing of all circuits and accessories</li>
                  <li>Completion of Electrical Installation Certificate</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Common Mistakes */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Common Mistakes to Avoid
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">First Fix Mistakes</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Not protecting cables from other trades during construction</li>
                  <li>Failing to photograph cable routes before covering</li>
                  <li>Inadequate marking of cable positions for Second Fix</li>
                  <li>Not allowing sufficient cable length at termination points</li>
                  <li>Installing back boxes at incorrect heights for floor finishes</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Second Fix Mistakes</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Starting before decoration is fully complete</li>
                  <li>Damaging finished surfaces during accessory installation</li>
                  <li>Not checking cable identification before termination</li>
                  <li>Rushing testing procedures to meet deadlines</li>
                  <li>Incomplete labelling and documentation</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Planning Considerations */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5" /> Planning Considerations
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
                <p className="font-medium mb-2">Time Allocation</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>First Fix:</strong> Typically 60-70% of total electrical installation time</li>
                  <li><strong>Second Fix:</strong> Usually 30-40% of total time but requires precision</li>
                  <li>Allow contingency time for coordination delays</li>
                  <li>Factor in testing and rectification time</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
                <p className="font-medium mb-2">Resource Planning</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>First Fix requires more labour-intensive cable pulling</li>
                  <li>Second Fix needs skilled electricians for terminations</li>
                  <li>Testing equipment required for both stages</li>
                  <li>Documentation and certification tools for Second Fix</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Quality Control Checkpoints */}
          <section className="mb-2">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Quality Control Checkpoints
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
                <p className="font-medium mb-2">First Fix Inspection Points</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Cable routes comply with safe zones (BS 7671 Section 522)</li>
                  <li>Adequate mechanical protection provided</li>
                  <li>Correct cable types selected for environment</li>
                  <li>Earth bonding connections properly made</li>
                  <li>Consumer unit positioned and secured correctly</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
                <p className="font-medium mb-2">Second Fix Inspection Points</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All accessories correctly terminated and secure</li>
                  <li>Polarity correct at all points</li>
                  <li>Test results within acceptable limits</li>
                  <li>Labelling complete and legible</li>
                  <li>Consumer unit schedule accurate and fixed</li>
                  <li>Installation certificate completed and signed</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/30">
              <Home className="w-6 h-6 text-elec-yellow" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Real-World Example</h2>
              <p className="text-white font-medium">Residential Development Project - Meadowview Gardens</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* First Fix Timeline */}
            <div className="bg-muted/30 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-elec-yellow rounded-full"></div>
                <h3 className="font-semibold text-white">First Fix Phase (Week 8-10)</h3>
              </div>
              <div className="space-y-2 text-sm text-white">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Week 8:</strong> Roof completed, ground floor slab ready</span>
                </div>
                <div className="flex items-start gap-2">
                  <Cable className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Electricians install all containment, run T&E cables, fit back boxes</span>
                </div>
                <div className="flex items-start gap-2">
                  <Power className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Consumer units mounted, main earthing conductors connected</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Week 10:</strong> All cables in, continuity tests passed</span>
                </div>
              </div>
            </div>

            {/* Second Fix Timeline */}
            <div className="bg-muted/30 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-elec-yellow rounded-full"></div>
                <h3 className="font-semibold text-white">Second Fix Phase (Week 18-19)</h3>
              </div>
              <div className="space-y-2 text-sm text-white">
                <div className="flex items-start gap-2">
                  <Paintbrush className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Week 17:</strong> All decoration and flooring completed</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Electricians fit all sockets, switches, and luminaires</span>
                </div>
                <div className="flex items-start gap-2">
                  <Search className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Complete testing sequence, all results within limits</span>
                </div>
                <div className="flex items-start gap-2">
                  <ClipboardCheck className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Week 19:</strong> EICRs issued, handover complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Benefits Achieved */}
          <div className="mt-6 bg-elec-yellow/5 rounded-lg p-4 border border-elec-yellow/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-elec-yellow rounded-full"></div>
              <h3 className="font-semibold text-white">Project Benefits Achieved</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong className="text-white">Zero Damage:</strong> No accessories damaged during construction phase</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong className="text-white">Time Saved:</strong> 15% faster than single-phase approach</span>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong className="text-white">Trade Harmony:</strong> Excellent coordination with all trades</span>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 text-xs sm:text-sm text-white">
            <div>
              <p className="font-semibold mb-1">Can First Fix and Second Fix be done in the same week?</p>
              <p>On small projects, yes — but usually they’re separated to allow other trades to finish their work in between.</p>
            </div>
            <Separator />
            <div>
              <p className="font-semibold mb-1">Do you test circuits in First Fix?</p>
              <p>Basic continuity and insulation resistance tests may be done during First Fix, but full testing is carried out at Second Fix.</p>
            </div>
            <Separator />
            <div>
              <p className="font-semibold mb-1">Is consumer unit installation part of First Fix or Second Fix?</p>
              <p>The consumer unit is usually mounted during First Fix, but final terminations and energising are done during Second Fix.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/30">
              <ClipboardCheck className="w-6 h-6 text-elec-yellow" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Summary</h2>
              <p className="text-white">Key takeaways for electrical installation sequencing</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* First Fix Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-elec-yellow rounded-full"></div>
                <h3 className="font-semibold text-white">First Fix Essentials</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Hammer className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Infrastructure Phase</p>
                    <p className="text-white">Install all cables, containment, and infrastructure before building finishes</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Timing Critical</p>
                    <p className="text-white">Complete before plastering, decoration, or floor finishes</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Protection Focus</p>
                    <p className="text-white">Safeguard installed cables from damage by other trades</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Fix Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-elec-yellow rounded-full"></div>
                <h3 className="font-semibold text-white">Second Fix Essentials</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Completion Phase</p>
                    <p className="text-white">Fit accessories, terminate circuits, and complete testing</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Paintbrush className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Finish Dependent</p>
                    <p className="text-white">Only begin after decoration and flooring complete</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Search className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Testing & Certification</p>
                    <p className="text-white">Complete full testing sequence and issue certificates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-elec-yellow" />
              Why the Two-Stage Approach Works
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-white">Protects electrical accessories from construction damage</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-white">Enables efficient coordination with other building trades</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-white">Improves quality control and reduces rectification work</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-white">Ensures BS 7671 compliance throughout the process</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="mt-6 bg-elec-yellow/5 rounded-lg p-4 border border-elec-yellow/30">
            <p className="text-white font-medium text-center">
              <strong>Bottom Line:</strong> The two-stage approach isn't just about timing—it's about delivering professional, 
              damage-free electrical installations that meet BS 7671 standards while working harmoniously with other trades.
            </p>
          </div>
        </Card>

        {/* Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Knowledge Check</h2>
          <Quiz questions={mainQuizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.4
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              Next: Section 3.5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module3Section4_2;