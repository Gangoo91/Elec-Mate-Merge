import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Cable,
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "Supporting and Securing Cables - Module 3.4.5 | Level 2 Electrical Course";
const DESCRIPTION =
  "Learn essential cable support methods, spacing requirements, fire-resistant fixings, and BS 7671 compliance for professional electrical installations.";

// Quiz questions for the end of the page (unchanged content)
const quizQuestions = [
  {
    id: 1,
    question:
      "Which regulation edition introduced the requirement for non-combustible cable supports in escape routes?",
    options: ["16th Edition", "17th Edition", "18th Edition", "BS 6004"],
    correctAnswer: 2,
    explanation:
      "The 18th Edition of BS 7671 introduced the requirement for non-combustible cable supports in escape routes to prevent premature collapse during fires.",
  },
  {
    id: 2,
    question: "Which fixing is best suited for SWA cables?",
    options: [
      "Flat twin clip",
      "Cable cleat",
      "Plastic cable tie",
      "Adhesive pad",
    ],
    correctAnswer: 1,
    explanation:
      "Cable cleats are heavy-duty fixings specifically designed for SWA cables, providing adequate support for their weight and mechanical protection.",
  },
  {
    id: 3,
    question:
      "True or False: Plastic cable clips are acceptable as the sole fixing method in escape routes.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. The 18th Edition requires non-combustible supports in escape routes. Plastic clips must be combined with metal fixings.",
  },
  {
    id: 4,
    question: "Name one advantage of proper cable support.",
    options: [
      "Prevents sagging and maintains safety",
      "Reduces cable costs",
      "Eliminates need for RCD protection",
      "Increases cable current rating",
    ],
    correctAnswer: 0,
    explanation:
      "Proper cable support prevents sagging, maintains safety, improves installation neatness, and facilitates easier inspection and maintenance.",
  },
  {
    id: 5,
    question: "How often should horizontal T&E runs be clipped?",
    options: ["Every 100 mm", "Every 300-400 mm", "Every 1 m", "Every 2 m"],
    correctAnswer: 1,
    explanation:
      "Horizontal T&E runs should typically be clipped every 300-400 mm according to BS 7671 and manufacturer recommendations.",
  },
  {
    id: 6,
    question: "Why should clips not be over-tightened?",
    options: [
      "It wastes materials",
      "It may damage cable insulation",
      "It makes the job look untidy",
      "It increases electrical resistance in the conductor",
    ],
    correctAnswer: 1,
    explanation:
      "Over-tightening clips can damage cable insulation, potentially leading to insulation failure and safety hazards.",
  },
  {
    id: 7,
    question: "Give one fire-resistant fixing option.",
    options: [
      "Plastic cable tie",
      "Stainless steel tie",
      "Adhesive clip",
      "Rubber grommet",
    ],
    correctAnswer: 1,
    explanation:
      "Stainless steel ties, metal P-clips, and steel fixings are all acceptable fire-resistant fixing options for escape routes.",
  },
  {
    id: 8,
    question: "Give one method of protecting cables from sharp edges.",
    options: [
      "Use thicker cables",
      "Fit grommets or bushes",
      "Increase cable spacing",
      "Use lower voltages",
    ],
    correctAnswer: 1,
    explanation:
      "Grommets or bushes should be fitted at cable entry/exit points to protect cables from damage by sharp edges.",
  },
];

// Quick knowledge check questions (unchanged content)
const quickCheckQuestions = [
  {
    id: "support-fire",
    question:
      "Why must cables in escape routes be supported with non-combustible fixings?",
    options: [
      "To reduce installation costs",
      "To prevent premature collapse during fires",
      "To improve electrical performance",
      "To meet manufacturer warranties",
    ],
    correctIndex: 1,
    explanation:
      "Non-combustible fixings prevent cables from collapsing into escape routes during fires, maintaining safe evacuation paths.",
  },
  {
    id: "swa-fixing",
    question: "What type of fixing is commonly used for heavy SWA cables?",
    options: [
      "Plastic clips",
      "Cable cleats",
      "Adhesive pads",
      "Cable ties only",
    ],
    correctIndex: 1,
    explanation:
      "Cable cleats are specifically designed heavy-duty fixings that can adequately support the weight and provide mechanical protection for SWA cables.",
  },
  {
    id: "over-tightening",
    question: "Give one consequence of over-tightening a cable clip.",
    options: [
      "Improved cable performance",
      "Better weather resistance",
      "Damage to cable insulation",
      "Reduced installation time",
    ],
    correctIndex: 2,
    explanation:
      "Over-tightening can compress and damage the cable insulation, potentially leading to insulation failure and safety hazards.",
  },
];

export default function Module3Section4_5() {
  useSEO(TITLE, DESCRIPTION);

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
              Section 3.4.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Supporting and Securing Cables
          </h1>
          <p className="text-white">
            Master the essential techniques for cable support, fire-resistant fixings, and BS 7671 compliance for professional electrical installations.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>All fixed wiring must be adequately supported per BS 7671.</li>
                <li>Use non-combustible fixings in escape routes (18th Edition).</li>
                <li>Spacing depends on cable type; avoid over-tightening clips.</li>
                <li>Protect against strain, vibration, heat and sharp edges.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Metal P-clips, stainless ties, cleats, flat twin clips.</li>
                <li><strong>Use:</strong> Correct spacing; suit fixing to cable and environment.</li>
                <li><strong>Check:</strong> No crushed insulation; secure, aligned, labelled runs.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Explain why correct cable support is important for safety and compliance.</li>
            <li>Identify suitable fixing methods for different cable types and environments.</li>
            <li>Apply correct spacing and positioning for cable fixings.</li>
            <li>Understand the fire-resistant support requirements of the 18th Edition.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* 1) Purposes of Cable Support */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> 1) Purposes of Cable Support
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Prevents sagging or strain on conductors</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Protects insulation from wear and damage</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Maintains separation between power, data, and control cables</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Keeps installation neat for easier inspection and maintenance</span>
              </li>
            </ul>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* 2) Types of Cable Supports */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Cable className="w-5 h-5" /> 2) Types of Cable Supports
            </h3>
            <div className="grid gap-4 text-sm">
              <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                <h4 className="font-medium mb-1 text-white">Clips</h4>
                <p className="text-white">Flat twin clips for T&E, round clips for circular cables.</p>
              </div>
              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg">
                <h4 className="font-medium mb-1 text-white">Cleats</h4>
                <p className="text-white">Heavy-duty fixings for SWA cables, metal or high-strength polymer.</p>
              </div>
              <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                <h4 className="font-medium mb-1 text-white">Cable Ties</h4>
                <p className="text-white">Grouping cables; stainless steel for fire-resistant applications.</p>
              </div>
              <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg">
                <h4 className="font-medium mb-1 text-white">Saddles and Brackets</h4>
                <p className="text-white">Securing conduit or trunking carrying cables.</p>
              </div>
              <div className="p-4 bg-teal-500/10 border border-teal-400/30 rounded-lg">
                <h4 className="font-medium mb-1 text-white">Cable Trays and Baskets</h4>
                <p className="text-white">Provide continuous support for multiple cables.</p>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* 3) Spacing Guidelines (Typical) */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> 3) Spacing Guidelines (Typical)
            </h3>
            <p className="text-white mb-3">
              Always refer to BS 7671 and manufacturer recommendations
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-white/10">
                <thead>
                  <tr className="bg-card text-white">
                    <th className="border border-white/10 p-3 text-left font-semibold">
                      Cable Type
                    </th>
                    <th className="border border-white/10 p-3 text-left font-semibold">
                      Spacing
                    </th>
                    <th className="border border-white/10 p-3 text-left font-semibold">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 p-3">T&E on walls/ceilings</td>
                    <td className="border border-white/10 p-3">
                      300-400mm horizontal, 400-500mm vertical
                    </td>
                    <td className="border border-white/10 p-3">Use flat twin clips</td>
                  </tr>
                  <tr className="">
                    <td className="border border-white/10 p-3">SWA on walls</td>
                    <td className="border border-white/10 p-3">
                      300-600mm depending on size
                    </td>
                    <td className="border border-white/10 p-3">Use cable cleats</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 p-3">Tray/basket supports</td>
                    <td className="border border-white/10 p-3">1.5-2m typically</td>
                    <td className="border border-white/10 p-3">Varies by load and span</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* 4) Fire-Resistant Supports */}
          <section className="mb-2">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> 4) Fire-Resistant Supports (18th Edition Requirement)
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-white">
                  All wiring systems in escape routes must be supported by non-combustible fixings to prevent premature collapse in a fire.
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>
                    Plastic clips and ties are not permitted as the sole support in these areas
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Acceptable methods include stainless steel cable ties, metal P-clips, or steel fixings
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </Card>

        {/* Best Practice */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Best Practice</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Avoid over-tightening fixings to prevent insulation damage</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Maintain alignment for a neat finish</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Protect cables from sharp edges by using grommets or bushes</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Ensure separation from sources of heat or vibration where possible</span>
            </li>
          </ul>
        </Card>


        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <p className="text-white/90">
            In a warehouse fire, plastic cable fixings melted, causing cables to collapse into escape routes. Firefighters reported the hazard and
            regulations were updated in the 18th Edition to require non-combustible supports in such locations.
          </p>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4 text-sm">
            <div className="space-y-1">
              <p className="font-medium">Q: Can I still use plastic cable clips?</p>
              <p className="text-white/90">
                A: Yes, but not as the sole means of support in escape routes — combine them with metal fixings.
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Q: Do all cables need to be clipped?</p>
              <p className="text-white/90">
                A: Yes, all fixed wiring must be adequately supported, although method and spacing will vary.
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">
                Q: Is stainless steel overkill for normal domestic installations?
              </p>
              <p className="text-white/90">
                A: It's only required in specific high-risk areas like escape routes, but it can still improve durability.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium mb-2">Key Benefits</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Prevents sagging and maintains safety</li>
                <li>Neat installation aids inspection and maintenance</li>
                <li>Compliance with BS 7671 and 18th Edition fire rules</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-sky-500/10 border border-sky-400/30">
              <p className="font-medium mb-2">Essential Points</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Use suitable fixings for cable type and environment</li>
                <li>Follow spacing guidelines; avoid over-tightening</li>
                <li>Use non-combustible supports in escape routes</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Knowledge Check Quiz</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-2">
          <Link to="..">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous: Section 4.4
            </Button>
          </Link>
          <Link to="..">
            <Button className="gap-2">
              Next: Section 4.6
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
