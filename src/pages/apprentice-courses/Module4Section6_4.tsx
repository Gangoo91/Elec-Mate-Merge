import { ArrowLeft, ArrowRight, Wrench, Target, CheckCircle, AlertTriangle, Search, TrendingUp, Shield, Activity, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Checking Fixings, Cable Routes, and Terminations - Module 4.6.4 | Level 2 Electrical Course";
const DESCRIPTION = "Master the final inspection techniques for electrical installations. Learn to verify secure fixings, safe cable routes, and reliable terminations for BS 7671 compliance.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the purpose of safe wiring zones?",
    options: ["To reduce cable costs", "To protect cables from accidental damage", "To improve electrical performance", "To meet aesthetic requirements"],
    correctIndex: 1,
    explanation: "Safe wiring zones protect cables from accidental damage during building work by defining specific areas where cables should be routed, such as vertically and horizontally from outlets."
  },
  {
    id: 2,
    question: "Name one tool that ensures terminations are tightened correctly.",
    options: ["Standard screwdriver", "Torque screwdriver", "Wire strippers", "Multimeter"],
    correctIndex: 1,
    explanation: "A torque screwdriver ensures terminal screws are tightened to the manufacturer's specified torque, preventing over-tightening that could damage conductors or under-tightening that creates loose connections."
  },
  {
    id: 3,
    question: "Why should multi-stranded conductors be fitted with ferrules?",
    options: ["To reduce cost", "To ensure secure connection and prevent strand breakage", "To improve conductivity", "To meet colour coding requirements"],
    correctIndex: 1,
    explanation: "Ferrules prevent individual strands of multi-stranded conductors from breaking or becoming loose in terminals, ensuring a secure and reliable electrical connection."
  }
];

const Module4Section6_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which regulation covers electrical connections in BS 7671?",
      options: [
        "522",
        "526",
        "421",
        "110"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 Regulation 526 covers electrical connections, specifying that they must be suitable for the conditions and secure throughout the expected lifetime of the installation."
    },
    {
      id: 2,
      question: "True or False: You can leave cables loosely supported if they will be hidden behind plaster.",
      options: [
        "True",
        "False",
        "Only for low voltage circuits",
        "Only temporarily during installation"
      ],
      correctAnswer: 1,
      explanation: "False - all cables must be properly supported regardless of whether they're visible or hidden. Loose cables can cause damage, create hazards, and fail to meet BS 7671 requirements."
    },
    {
      id: 3,
      question: "Name two safe wiring zones.",
      options: [
        "Diagonal and curved paths",
        "Horizontal above switches/sockets, vertical from switches/sockets",
        "Random routing for shortest path",
        "Only vertical routes"
      ],
      correctAnswer: 1,
      explanation: "Safe wiring zones include horizontal routes within 150mm of the top of the room and within 150mm of angles between walls, and vertical routes within 150mm either side of switches and sockets."
    },
    {
      id: 4,
      question: "What should be used when terminating multi-stranded conductors?",
      options: [
        "Wire nuts",
        "Ferrules",
        "Electrical tape",
        "Cable ties"
      ],
      correctAnswer: 1,
      explanation: "Ferrules should be used when terminating multi-stranded conductors to prevent individual strands from breaking or becoming loose, ensuring a secure connection."
    },
    {
      id: 5,
      question: "Why is over-tightening terminal screws a problem?",
      options: [
        "It improves conductivity",
        "It can damage conductors and reduce connection integrity",
        "It makes maintenance easier",
        "It prevents corrosion"
      ],
      correctAnswer: 1,
      explanation: "Over-tightening can damage conductors, strip threads, or crack terminals, all of which reduce connection integrity and can lead to loose connections over time."
    },
    {
      id: 6,
      question: "Which tool should be used to achieve manufacturer-specified torque?",
      options: [
        "Standard screwdriver",
        "Torque screwdriver",
        "Power drill",
        "Allen key"
      ],
      correctAnswer: 1,
      explanation: "A torque screwdriver (or torque wrench) ensures terminal screws are tightened to the exact torque specified by the manufacturer, preventing damage from over-tightening."
    },
    {
      id: 7,
      question: "Name one protective measure for cables passing through metal enclosures.",
      options: [
        "Copper tape",
        "Grommet or sleeve",
        "Electrical tape",
        "Cable marker"
      ],
      correctAnswer: 1,
      explanation: "Grommets or sleeves protect cable insulation from damage when passing through sharp metal edges of enclosures, preventing potential short circuits and electric shock hazards."
    },
    {
      id: 8,
      question: "Give one consequence of loose terminations.",
      options: [
        "Improved efficiency",
        "Overheating, arcing, potential fire hazard",
        "Better conductivity",
        "Reduced maintenance requirements"
      ],
      correctAnswer: 1,
      explanation: "Loose terminations create high resistance connections that can cause overheating, arcing, and potentially fire hazards, as well as equipment failure and reduced system reliability."
    }
  ];

  const faqs = [
    {
      question: "Can I route cables diagonally if it's the shortest path?",
      answer: "No — cables must follow vertical or horizontal safe zones unless mechanically protected. Diagonal routing increases the risk of accidental damage during building work and doesn't comply with BS 7671 requirements for cable protection."
    },
    {
      question: "Is it acceptable to leave a small amount of copper visible outside the terminal?",
      answer: "No — exposed copper increases the risk of short circuits and should be avoided. All bare conductor should be contained within the terminal, with only the insulated portion visible outside."
    },
    {
      question: "Do I need to check fixings if the containment system feels solid?",
      answer: "Yes — visual and physical checks are essential, as internal fixings may still be loose or unsuitable. A system that feels solid on the surface may have individual fixing points that are compromised."
    },
    {
      question: "What spacing should be maintained for containment system supports?",
      answer: "Follow manufacturer guidance and BS 7671 requirements. Typical spacing is 1.5m for steel conduit, 1m for PVC conduit, and varies for trunking and cable tray depending on size and loading."
    },
    {
      question: "How do I verify that cable routes follow safe zones in finished installations?",
      answer: "Use cable detection equipment to trace routes, check installation drawings, and verify that visible cable entry/exit points align with safe zone requirements. Any deviations should be investigated and corrected."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Settings className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.6.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Checking Fixings, Cable Routes, and Terminations
          </h1>
          <p className="text-muted-foreground">
            Master the final inspection techniques to ensure all fixings are secure, cable routes follow safe zones, and terminations meet BS 7671 standards.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Final inspection ensures secure fixings, safe cable routes, and reliable terminations.</li>
                <li>Incorrect fixings or poor terminations can cause safety hazards and equipment damage.</li>
                <li>Compliance with BS 7671 requires systematic checking of all installation elements.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Loose fixings, unsafe cable routes, faulty terminations.</li>
                <li><strong>Use:</strong> Torque screwdrivers, cable detectors, inspection procedures.</li>
                <li><strong>Check:</strong> Safe zones, secure connections, mechanical integrity.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Verify that all fixings are secure and suitable for the mounting surface.</li>
            <li>Check that cable routes comply with safe wiring zones.</li>
            <li>Confirm that all terminations are correctly stripped, connected, and tightened.</li>
            <li>Identify and rectify common faults with fixings and terminations.</li>
            <li>Apply best practice for long-term reliability.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Checking Fixings */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Checking Fixings</h3>
            <p className="text-base text-foreground mb-4">
              Secure fixings are essential for mechanical protection and long-term reliability of electrical installations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Fixing Selection and Suitability</p>
                    <p className="text-base text-foreground mb-2"><strong>Surface compatibility:</strong> Ensure screws, clips, saddles, or brackets are appropriate for the mounting surface.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Masonry fixings: Use appropriate plugs or anchors for concrete/brick walls</li>
                      <li>Plasterboard fixings: Use cavity fixings or locate studs for heavy loads</li>
                      <li>Metal surface fixings: Use self-tapping screws or through-bolts as appropriate</li>
                      <li>Wooden fixings: Use wood screws of appropriate length and gauge</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Tightness verification:</strong> Fixings should be tight but not over-torqued to avoid damage.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Hand-tight plus quarter turn for most plastic fixings</li>
                      <li>Manufacturer's torque specifications for critical applications</li>
                      <li>Visual inspection for surface damage or distortion</li>
                      <li>No movement when gentle force is applied to installed components</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Containment support:</strong> Brackets and supports for conduit, trunking, and tray must follow manufacturer spacing guidance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safe-zones-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Cable Route Verification */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Cable Route Verification</h3>
            <p className="text-base text-foreground mb-4">
              Proper cable routing ensures protection from damage and compliance with Building Regulations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Safe Wiring Zone Compliance</p>
                    <p className="text-base text-foreground mb-2"><strong>Prescribed zones:</strong> Cables should follow pre-planned safe wiring zones as per Building Regulations Part P.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Horizontal zones: Within 150mm of room edges and junction of walls/ceiling</li>
                      <li>Vertical zones: Within 150mm either side of switches, sockets, and outlets</li>
                      <li>Mechanical protection required for cables outside these zones</li>
                      <li>No diagonal routing unless cables are mechanically protected</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Environmental considerations:</strong> Route cables away from hazards and maintain proper separation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Avoid routing near heat sources unless cables are rated for high temperatures</li>
                      <li>Maintain adequate separation between mains and data/low-voltage cables</li>
                      <li>Protect cables from moisture, chemicals, and mechanical damage</li>
                      <li>Use grommets, sleeves, or conduit when passing through walls or floors</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Protection methods:</strong> Use appropriate barriers for cables passing through structural elements
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="termination-tools-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Termination Checks */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Termination Checks</h3>
            <p className="text-base text-foreground mb-4">
              Proper terminations are critical for electrical safety and system reliability:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Termination Quality and Security</p>
                    <p className="text-base text-foreground mb-2"><strong>Stripping and preparation:</strong> Cable ends should be stripped to the correct length with no exposed copper.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Strip length should match terminal requirements (typically 10-12mm)</li>
                      <li>No bare copper should be visible outside the terminal</li>
                      <li>Clean cuts with no nicked or damaged conductors</li>
                      <li>Remove any sharp edges or burrs from conductor ends</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Connection security:</strong> Conductors must be fully inserted and securely clamped.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Conductors fully inserted into terminals without gaps</li>
                      <li>Multi-stranded conductors terminated with ferrules where required</li>
                      <li>Terminal screws tightened to manufacturer specifications</li>
                      <li>Avoid over-tightening that could damage conductors or terminals</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Testing security:</strong> Gently tug cables at terminations to ensure they are secure
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ferrules-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Testing Mechanical Security */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. Testing Mechanical Security</h3>
            <p className="text-base text-foreground mb-4">
              Physical testing verifies the integrity of connections and fixings:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Physical Testing Procedures</p>
                    <p className="text-base text-foreground mb-2"><strong>Connection testing:</strong> Verify security without damaging components.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Gently tug cables at terminations to check security</li>
                      <li>Check terminal screws are tightened to correct torque if specified</li>
                      <li>Inspect connections for signs of overheating or arcing</li>
                      <li>Verify no movement in terminated conductors</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Visual inspection:</strong> Look for signs of damage or deterioration.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Check for discoloration indicating overheating</li>
                      <li>Look for arc marks or carbonisation around terminals</li>
                      <li>Inspect for cracked or damaged terminal blocks</li>
                      <li>Verify adequate clearances between live parts</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Documentation:</strong> Record any defects found and remedial actions taken
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Regulatory Reference */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">5. Regulatory Reference</h3>
            <div className="rounded-lg p-4 bg-slate-100 dark:bg-card border">
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li><strong>BS 7671 Regulation 526</strong> – Electrical connections must be suitable for the conditions and secure throughout the expected lifetime of the installation.</li>
                <li><strong>BS 7671 Section 522</strong> – Cable routing and protection requirements.</li>
                <li><strong>Building Regulations Part P</strong> – Safe zones for cable routing in domestic installations.</li>
              </ul>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          
          <div className="space-y-4">
            <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-medium text-foreground mb-2">Essential Tools and Equipment</h3>
              <div className="text-xs sm:text-sm text-foreground space-y-2">
                <p><strong>Basic tools:</strong> Screwdrivers (slotted and Phillips), torque screwdriver, inspection torch, cable detector, measuring tape.</p>
                <p><strong>Testing equipment:</strong> Multimeter, insulation resistance tester, socket tester, continuity tester.</p>
                <p><strong>Installation materials:</strong> Cable ties, grommets, bushes, ferrules, cable markers, warning labels.</p>
                <p><strong>Safety equipment:</strong> Non-contact voltage tester, proving unit, personal protective equipment.</p>
              </div>
            </div>
            
            <div className="rounded-lg p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <h3 className="font-medium text-foreground mb-2">Inspection Sequence</h3>
              <div className="text-xs sm:text-sm text-foreground space-y-2">
                <p><strong>1. Visual inspection:</strong> Check all visible fixings, cable routes, and terminations before any testing.</p>
                <p><strong>2. Mechanical testing:</strong> Gently test fixing security and termination tightness.</p>
                <p><strong>3. Route verification:</strong> Use cable detector to confirm hidden cable paths follow safe zones.</p>
                <p><strong>4. Documentation:</strong> Record findings, defects, and remedial actions on inspection sheets.</p>
              </div>
            </div>
            
            <div className="rounded-lg p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
              <h3 className="font-medium text-foreground mb-2">Common Inspection Points</h3>
              <div className="text-xs sm:text-sm text-foreground space-y-2">
                <p><strong>Consumer units:</strong> Check main switch, RCD, and MCB terminations. Verify all conductors are secure.</p>
                <p><strong>Socket outlets:</strong> Ensure back boxes are secure, terminals tight, and earth continuity maintained.</p>
                <p><strong>Light fittings:</strong> Check ceiling fixings can support weight, terminals secure, and earth connections made.</p>
                <p><strong>Junction boxes:</strong> Verify all connections are accessible, secure, and properly identified.</p>
              </div>
            </div>
            
            <div className="rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <h3 className="font-medium text-foreground mb-2">Professional Tips</h3>
              <div className="text-xs sm:text-sm text-foreground space-y-2">
                <p><strong>Double-check everything:</strong> Always verify terminations even if installed by experienced colleagues — fresh eyes catch mistakes.</p>
                <p><strong>Use systematic approach:</strong> Work methodically through each circuit to avoid missing connections.</p>
                <p><strong>Document as you go:</strong> Take photos of unusual installations and label cable routes for future reference.</p>
                <p><strong>Test before energising:</strong> Complete all mechanical checks before applying any electrical tests.</p>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <h3 className="font-medium text-foreground mb-2">Safety Reminders</h3>
              <div className="text-xs sm:text-sm text-foreground space-y-2">
                <p><strong>Isolation verification:</strong> Always prove dead before touching any terminations or conductors.</p>
                <p><strong>Structural integrity:</strong> Don't overtighten fixings that could compromise building structure.</p>
                <p><strong>Personal safety:</strong> Use appropriate access equipment and never rush inspection procedures.</p>
                <p><strong>Documentation:</strong> Record any safety concerns immediately and inform relevant personnel.</p>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
              <h3 className="font-medium text-foreground mb-2">Quality Assurance Checklist</h3>
              <div className="text-xs sm:text-sm text-foreground">
                <ul className="list-disc pl-5 space-y-1">
                  <li>All fixings appropriate for surface type and load</li>
                  <li>Cable routes follow safe zones or are mechanically protected</li>
                  <li>No bare copper visible outside terminals</li>
                  <li>All terminations mechanically secure</li>
                  <li>Containment systems properly supported</li>
                  <li>Cable entry points protected with grommets/bushes</li>
                  <li>All connections accessible for future maintenance</li>
                  <li>Proper separation between different circuit types</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Example Field Scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Example Field Scenario</h2>
          <div className="rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-xs sm:text-sm text-foreground">
              <strong>Scenario:</strong> During a final inspection on a commercial lighting circuit, a loose earth conductor was found in a metal light fitting. Tightening the terminal screw prevented potential safety hazards and ensured continuity of the earth connection.
            </p>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Examples</h2>
          
          <div className="space-y-4">
            <div className="rounded-lg p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <h3 className="font-medium text-foreground mb-2">Case Study 1: Hotel Refurbishment</h3>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Problem:</strong> During final testing of a hotel refurbishment project, several sockets failed the polarity test despite initial visual inspection appearing satisfactory.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Investigation:</strong> Detailed inspection revealed loose neutral connections in several socket outlets. The terminals appeared connected but weren't adequately tightened during the rush to meet deadlines.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Solution:</strong> All socket terminals were systematically retightened using a torque screwdriver, and the polarity tests were repeated successfully.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Lesson:</strong> Visual inspection alone isn't sufficient — physical testing of connections is essential, and time pressure never justifies shortcuts in safety procedures.
              </p>
            </div>

            <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-medium text-foreground mb-2">Case Study 2: Office Block Cable Damage</h3>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Problem:</strong> Six months after completion, an office block experienced intermittent power failures. Investigation found damaged cables behind partition walls.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Root cause:</strong> Cables had been routed diagonally to save time and materials, without mechanical protection. Later fit-out work damaged these hidden cables.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Resolution:</strong> Affected cables were re-routed following safe zones, and all similar installations were identified and protected.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Lesson:</strong> Safe zone compliance isn't just a regulation — it's practical protection that prevents costly failures and safety hazards.
              </p>
            </div>

            <div className="rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <h3 className="font-medium text-foreground mb-2">Case Study 3: Industrial Lighting Failure</h3>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Problem:</strong> Several high-bay lights in a warehouse started flickering and eventually failed, creating safety hazards in the working area.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Investigation:</strong> Inspection revealed that the original installation used standard domestic fixings for heavy industrial luminaires, and vibration had loosened the connections over time.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Solution:</strong> All luminaires were re-mounted using appropriate industrial fixings rated for the weight and environmental conditions, with spring washers to prevent loosening.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Lesson:</strong> Fixing selection must account for the specific application environment — what works in domestic settings may be inadequate for industrial conditions.
              </p>
            </div>

            <div className="rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <h3 className="font-medium text-foreground mb-2">Case Study 4: Moisture Ingress in Outdoor Installation</h3>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Problem:</strong> External socket outlets began tripping RCDs frequently during wet weather, causing disruption to outdoor events.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Investigation:</strong> Cable entry points lacked proper sealing, allowing moisture to penetrate and create leakage paths to earth.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Solution:</strong> All cable entries were sealed with appropriate IP-rated glands, and affected cables were replaced where insulation had been compromised.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Lesson:</strong> Environmental protection isn't optional — proper sealing and protection methods are essential for reliable long-term operation, especially in outdoor applications.
              </p>
            </div>

            <div className="rounded-lg p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
              <h3 className="font-medium text-foreground mb-2">Case Study 5: Multi-stranded Conductor Failure</h3>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Problem:</strong> Control panel connections began failing randomly, causing expensive production downtime in a manufacturing facility.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Analysis:</strong> Multi-stranded control wires had been terminated without ferrules, and individual strands were breaking due to vibration and thermal cycling.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Solution:</strong> All multi-stranded terminations were upgraded with proper ferrules, and connection torque was verified using calibrated tools.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Lesson:</strong> Proper termination techniques for different conductor types aren't suggestions — they're requirements for reliable operation, especially in demanding environments.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg p-4 bg-slate-50 dark:bg-card border">
                <h3 className="font-medium text-foreground mb-2">Q: {faq.question}</h3>
                <p className="text-sm text-muted-foreground">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary & Key Takeaways</h2>
          <div className="space-y-6">
            
            {/* Key Learning Points */}
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold text-foreground">Fixing Verification Essentials</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                  <li>• <strong>Surface compatibility:</strong> Match fixing type to mounting surface (masonry, plasterboard, metal, wood)</li>
                  <li>• <strong>Proper tightness:</strong> Hand-tight plus quarter turn for plastic fixings, manufacturer specs for critical loads</li>
                  <li>• <strong>Support spacing:</strong> Follow manufacturer guidance (typically 1.5m steel conduit, 1m PVC conduit)</li>
                  <li>• <strong>Load verification:</strong> Ensure fixings can handle static and dynamic loads</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-foreground">Safe Wiring Zone Compliance</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                  <li>• <strong>Horizontal zones:</strong> Within 150mm of ceiling and wall junctions</li>
                  <li>• <strong>Vertical zones:</strong> Within 150mm either side of switches/sockets</li>
                  <li>• <strong>No diagonal routing:</strong> Unless mechanically protected</li>
                  <li>• <strong>Protection methods:</strong> Grommets, sleeves, conduit for wall penetrations</li>
                </ul>
              </div>
            </div>

            {/* Termination Best Practices */}
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-orange-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold text-foreground">Termination Excellence</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-foreground">
                <div>
                  <p className="font-medium mb-2">Conductor Preparation:</p>
                  <ul className="space-y-1">
                    <li>• Correct strip length</li>
                    <li>• Clean, undamaged cores</li>
                    <li>• Ferrules for multi-stranded</li>
                    <li>• No exposed copper</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Connection Quality:</p>
                  <ul className="space-y-1">
                    <li>• Proper torque settings</li>
                    <li>• Secure mechanical hold</li>
                    <li>• Correct polarity</li>
                    <li>• Adequate clearances</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Professional Tools:</p>
                  <ul className="space-y-1">
                    <li>• Torque screwdrivers</li>
                    <li>• Ferrule crimps</li>
                    <li>• Cable strippers</li>
                    <li>• Inspection torches</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Common Problems Recap */}
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-red-500/20">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold text-foreground">Problems to Avoid</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm text-foreground">
                <div>
                  <p className="font-medium mb-2">Fixing Issues:</p>
                  <ul className="space-y-1">
                    <li>• Wrong fixing type for surface</li>
                    <li>• Inadequate support spacing</li>
                    <li>• Over or under-tightened fixings</li>
                    <li>• Failed load capacity consideration</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Termination Faults:</p>
                  <ul className="space-y-1">
                    <li>• Loose connections causing overheating</li>
                    <li>• Damaged conductors from over-tightening</li>
                    <li>• Missing ferrules on multi-stranded cables</li>
                    <li>• Exposed copper creating short circuit risks</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* BS 7671 Compliance Summary */}
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold text-foreground">BS 7671 Compliance Requirements</h3>
              </div>
              <div className="text-xs sm:text-sm text-foreground space-y-2">
                <p><strong>Regulation 526:</strong> All electrical connections must be suitable for conditions and secure throughout installation lifetime</p>
                <p><strong>Chapter 52:</strong> Wiring systems must be selected and erected to avoid damage during expected service life</p>
                <p><strong>Building Regulations Part P:</strong> Cable routes must follow prescribed safe zones unless mechanically protected</p>
                <p><strong>Quality assurance:</strong> All work must be inspected, tested, and certified before energisation</p>
              </div>
            </div>

            {/* Final Summary Statement */}
            <div className="text-center p-4 bg-card border border-green-500/20 rounded-lg">
              <p className="text-base font-medium text-foreground mb-2">
                Remember: Every fixing, route, and termination you inspect contributes to the overall safety and reliability of the electrical installation.
              </p>
              <p className="text-sm text-muted-foreground">
                Systematic checking using proper tools and techniques ensures compliance, prevents failures, and protects both property and people.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Knowledge Check</h2>
          <Quiz questions={quizQuestions} title="Checking Fixings, Cable Routes, and Terminations" />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="../6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Insulation Resistance Testing
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              <ArrowRight className="w-4 h-4 ml-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section6_4;