import { ArrowLeft, ArrowRight, Wrench, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Using Ferrules, Sleeving, Glands, and Crimps - Module 4.5.4 | Level 2 Electrical Course";
const DESCRIPTION = "Master cable termination accessories including ferrules, sleeving, glands, and crimps. Learn proper selection, fitting techniques, and BS 7671 compliance for safe electrical installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of a ferrule on a flexible cable?",
    options: ["To provide strain relief", "To prevent strand separation", "To identify the cable", "To protect insulation"],
    correctIndex: 1,
    explanation: "Ferrules prevent fine strands from spreading when inserted into terminals, ensuring reliable connection and preventing loose strands."
  },
  {
    id: 2,
    question: "Name the colour coding for CPC sleeving.",
    options: ["Blue", "Brown", "Green/Yellow", "Black"],
    correctIndex: 2,
    explanation: "BS 7671 requires CPC conductors to be identified with green/yellow sleeving for safety and identification purposes."
  },
  {
    id: 3,
    question: "Why should metallic glands often be earthed?",
    options: ["To improve conductivity", "To prevent them becoming live in a fault", "To reduce installation cost", "To meet colour requirements"],
    correctIndex: 1,
    explanation: "Metallic glands must be earthed to prevent them becoming live during fault conditions, ensuring safety."
  }
];

const Module4Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the function of a ferrule?",
      options: [
        "Mechanical strain relief",
        "Prevent strand separation in flexible conductors",
        "Provide earth continuity",
        "Seal against moisture"
      ],
      correctAnswer: 1,
      explanation: "Ferrules prevent fine strands from spreading when inserted into terminals, ensuring reliable connection."
    },
    {
      id: 2,
      question: "True or False: You can reuse a crimp terminal if it looks undamaged.",
      options: [
        "True",
        "False",
        "Only if tested first",
        "Only for low current applications"
      ],
      correctAnswer: 1,
      explanation: "False – once deformed during crimping, terminals cannot provide secure contact again and must not be reused."
    },
    {
      id: 3,
      question: "Name one type of crimp terminal.",
      options: [
        "Ring crimp",
        "Spade crimp", 
        "Butt crimp",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "Ring, spade, and butt crimps are all common types of crimp terminals used for different connection purposes."
    },
    {
      id: 4,
      question: "What rating must an outdoor gland meet to be weatherproof?",
      options: [
        "IP44",
        "IP54",
        "IP65",
        "IP68"
      ],
      correctAnswer: 3,
      explanation: "IP68 provides protection against dust ingress and continuous immersion in water, suitable for outdoor/wet locations."
    },
    {
      id: 5,
      question: "Why is correct conductor sizing important for ferrules?",
      options: [
        "To ensure secure mechanical grip and good electrical contact",
        "To prevent overheating",
        "To comply with colour coding",
        "To reduce installation time"
      ],
      correctAnswer: 0,
      explanation: "Correct sizing ensures the ferrule grips the conductor securely and provides good electrical contact without damage."
    },
    {
      id: 6,
      question: "Which type of gland is commonly used for armoured cables?",
      options: [
        "Plastic gland",
        "Metallic gland",
        "Rubber gland",
        "Composite gland"
      ],
      correctAnswer: 1,
      explanation: "Metallic glands are used with armoured cables to provide mechanical retention and earth continuity through the armour."
    },
    {
      id: 7,
      question: "Give one reason why metallic glands must be earthed.",
      options: [
        "To prevent it becoming live in a fault",
        "To improve conductivity",
        "To reduce installation cost",
        "To meet colour coding requirements"
      ],
      correctAnswer: 0,
      explanation: "Metallic glands must be earthed to prevent them becoming live during fault conditions, ensuring safety."
    },
    {
      id: 8,
      question: "What tool should always be used for crimping?",
      options: [
        "Standard pliers",
        "Wire strippers",
        "Ratchet crimping tool",
        "Side cutters"
      ],
      correctAnswer: 2,
      explanation: "Ratchet crimping tools provide the correct compression force and cannot be released until proper crimp is achieved."
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
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.5.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Using Ferrules, Sleeving, Glands, and Crimps
          </h1>
          <p className="text-white">
            Master cable termination accessories for secure, reliable, and compliant electrical connections according to BS 7671.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cable termination accessories ensure secure, reliable, and compliant connections.</li>
                <li>Each accessory has specific purposes: ferrules, sleeving, glands, and crimps.</li>
                <li>Improper selection or installation leads to failures and safety hazards.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Cable type, accessory requirements, environmental conditions.</li>
                <li><strong>Use:</strong> Correct sizes, proper tools, correct fitting techniques.</li>
                <li><strong>Check:</strong> Secure connections, proper identification, mechanical integrity.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify the purpose and types of ferrules, sleeving, glands, and crimps for different applications.</li>
            <li>Select the correct accessory size and type for the cable being terminated.</li>
            <li>Apply correct fitting techniques for each accessory according to manufacturer instructions.</li>
            <li>Inspect and test terminations for compliance and safety according to BS 7671.</li>
            <li>Recognise and avoid common fitting errors that compromise safety and reliability.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Ferrules */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Ferrules and Their Applications</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Ferrules are essential accessories for terminating stranded flexible conductors safely and securely:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Ferrule Construction and Types</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Primary function:</strong> Prevent conductor strands from splaying when inserted into terminals.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Available types:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Uninsulated ferrules: Bare copper or tinned copper for general use</li>
                      <li>Insulated ferrules: Colour-coded plastic sleeves for identification and protection</li>
                      <li>Twin ferrules: For terminating two conductors in one terminal</li>
                      <li>Long ferrules: For extended conductor support in vibration applications</li>
                      <li>Cord-end terminals: Pre-fitted with wire for quick installation</li>
                      <li>Heat-shrink ferrules: Provide additional strain relief and protection</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Size selection criteria:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Must match conductor cross-sectional area exactly (0.5mm² to 50mm²)</li>
                      <li>Consider strand count: Class 5 stranding requires specific ferrule types</li>
                      <li>Temperature rating: Must match or exceed cable operating temperature</li>
                      <li>Material compatibility: Copper for copper conductors, avoid dissimilar metals</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Step-by-step installation procedure:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>1. Strip cable insulation to match ferrule barrel length exactly</li>
                      <li>2. Check conductor for damage or missing strands</li>
                      <li>3. Insert conductor fully into ferrule until touching end stop</li>
                      <li>4. Position ferrule in correct size die of crimping tool</li>
                      <li>5. Apply crimp ensuring tool ratchet completes full cycle</li>
                      <li>6. Perform tug test to verify mechanical security</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Quality check:</strong> Properly crimped ferrule should show hexagonal impression with no conductor visible at crimp
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ferrule-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Sleeving */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Sleeving for Conductor Identification and Protection</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Sleeving provides insulation and identification for conductors, particularly essential for CPC identification:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Sleeving Applications and Colour Coding</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Primary applications:</strong> Insulate and identify bare conductors in electrical installations.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>BS 7671 colour coding requirements:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Green/Yellow: Circuit Protective Conductor (CPC/Earth) - mandatory identification</li>
                      <li>Blue: Neutral conductor identification where required</li>
                      <li>Brown: Line conductor identification in control circuits</li>
                      <li>Other colours: Used for control and instrumentation circuits as specified</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Installation requirements:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Must fit snugly over conductor without gaps or loose sections</li>
                      <li>Extend sufficient length for clear identification at terminations</li>
                      <li>Heat-shrink sleeving for permanent protection in harsh environments</li>
                      <li>Self-amalgamating tape for waterproof sealing applications</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>BS 7671 requirement:</strong> CPC in T&E cable must always be sleeved green/yellow before termination
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="sleeving-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Glands */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Glands for Cable Entry and Environmental Protection</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Glands secure cables at enclosure entry points, providing mechanical retention and environmental sealing:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Gland Types and Applications</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Metallic glands:</strong> Used with armoured cables for mechanical retention and earth continuity.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Brass or stainless steel construction for corrosion resistance</li>
                      <li>Integral earthing through gland body to maintain earth continuity</li>
                      <li>Suitable for SWA, AWA, and other armoured cable types</li>
                      <li>Must be earthed to prevent becoming live during fault conditions</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Plastic glands:</strong> Common for indoor flexible cable terminations.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Nylon or PVC construction for cost-effective sealing</li>
                      <li>Suitable for non-armoured flexible cables</li>
                      <li>Available in various thread sizes and cable diameter ranges</li>
                      <li>Do not require earthing as they cannot become live</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>IP rating requirements:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>IP68: Complete protection against dust and continuous water immersion</li>
                      <li>IP67: Dust-tight and protected against temporary immersion</li>
                      <li>IP54: Protected against dust and water splashing from any direction</li>
                      <li>Selection based on environmental conditions and exposure requirements</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Installation note:</strong> Follow manufacturer torque settings to avoid damage while maintaining IP rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="glands-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Crimps and Common Errors */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Crimps and Installation Best Practices</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Crimps provide reliable mechanical and electrical connections when properly selected and installed:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Crimp Terminal Types and Applications</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Ring crimps:</strong> For bolted terminations providing secure mechanical connection.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Spade crimps:</strong> For quick-connect terminals allowing easy disconnection.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Butt crimps:</strong> For joining conductors end-to-end in cable extensions.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Pin crimps:</strong> For insertion into plug and socket connectors.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Tool requirement:</strong> Ratchet crimp tool matched to terminal size ensures proper compression
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-1">Common Errors to Avoid</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Using wrong size accessory for conductor cross-sectional area</li>
                      <li>Not fully inserting conductor into ferrule, gland, or crimp before securing</li>
                      <li>Over-tightening glands causing damage to cable insulation or sealing components</li>
                      <li>Using pliers instead of proper crimping tools leading to poor connections</li>
                      <li>Failing to earth metallic glands when required by installation requirements</li>
                      <li>Reusing crimped terminals that have been previously deformed</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety note:</strong> Poor terminations are a leading cause of electrical fires and system failures
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Inspection and Testing Procedures</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Visual inspection requirements:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Full insertion of conductor into accessory with no exposed strands</li>
                      <li>Correct colour coding and identification of all conductors</li>
                      <li>No damage to insulation or conductor during termination process</li>
                      <li>Proper sealing and IP rating maintenance at gland entries</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Mechanical testing:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Tug test crimps and ferrules to ensure secure mechanical connection</li>
                      <li>Check gland tightness without over-torquing</li>
                      <li>Verify strain relief effectiveness under normal operating conditions</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Electrical testing:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Continuity testing to verify low-resistance connections</li>
                      <li>Polarity checks to ensure correct conductor identification</li>
                      <li>CPC integrity testing for earth continuity through metallic glands</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>BS 7671 requirement:</strong> All terminations must be tested for electrical and mechanical integrity
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          
          {/* Tool Selection and Preparation */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Tool Selection and Workshop Preparation</h3>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="text-xs sm:text-sm text-white mb-3"><strong>Essential tools for professional terminations:</strong></p>
              <div className="grid md:grid-cols-2 gap-4 text-xs text-white">
                <div>
                  <p className="font-medium mb-2">Crimping Tools:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Ratchet crimp tool set (0.5mm² to 16mm²)</li>
                    <li>Heavy-duty crimper for larger conductors (25mm² to 50mm²)</li>
                    <li>Ferrule crimping tool with hex dies</li>
                    <li>Insulated crimping tools for live working (where permitted)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Preparation Tools:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Adjustable wire strippers with gauge markings</li>
                    <li>Cable knife for sheath removal</li>
                    <li>Deburring tool for clean conductor ends</li>
                    <li>Torque wrench for gland installation</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 p-2 bg-[#121212]/50 rounded border">
                <p className="text-xs text-white"><strong>Workshop organisation:</strong> Keep accessories sorted by size and type in clearly labelled containers to prevent selection errors during installation.</p>
              </div>
            </div>
          </section>

          {/* Step-by-Step Procedures */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Step-by-Step Installation Procedures</h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium text-white mb-2">Procedure 1: Installing Ferrules on Flexible Cables</p>
                <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                  <li>Measure and mark strip length equal to ferrule barrel length (typically 8-12mm)</li>
                  <li>Use appropriate wire strippers to remove insulation without nicking conductors</li>
                  <li>Inspect conductor for damage - reject if more than 10% strands are broken</li>
                  <li>Twist strands gently to consolidate without over-twisting</li>
                  <li>Select ferrule size matching conductor cross-sectional area exactly</li>
                  <li>Insert conductor fully until it contacts ferrule end stop</li>
                  <li>Position in correct die size of ratchet crimping tool</li>
                  <li>Apply crimp with firm, steady pressure until ratchet releases</li>
                  <li>Inspect crimp for proper hex pattern and conductor retention</li>
                  <li>Perform gentle tug test - ferrule should not move on conductor</li>
                </ol>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-white mb-2">Procedure 2: Installing Cable Glands</p>
                <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                  <li>Select gland with appropriate thread size for enclosure knockout</li>
                  <li>Verify IP rating meets or exceeds environmental requirements</li>
                  <li>Disassemble gland and check all sealing components are present</li>
                  <li>Pass cable through gland components in correct sequence</li>
                  <li>Strip outer sheath to expose conductors for termination</li>
                  <li>For armoured cables, dress armour wires evenly around gland cone</li>
                  <li>Insert cable into enclosure and make conductor terminations</li>
                  <li>Tighten gland body to manufacturer's specified torque (typically 15-25Nm)</li>
                  <li>Check IP sealing by visual inspection of gasket compression</li>
                  <li>Test earth continuity through metallic glands using low-resistance ohmmeter</li>
                </ol>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-white mb-2">Procedure 3: Applying Sleeving to CPC Conductors</p>
                <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                  <li>Cut green/yellow sleeving to appropriate length (minimum 25mm each end)</li>
                  <li>Ensure sleeving internal diameter matches conductor size</li>
                  <li>Slide sleeving over bare CPC conductor from both ends</li>
                  <li>Position to cover all exposed copper with 5mm overlap at terminations</li>
                  <li>For heat-shrink sleeving, apply heat evenly with hot-air gun</li>
                  <li>Check for complete coverage with no gaps or loose sections</li>
                  <li>Verify colour coding compliance with BS 7671 requirements</li>
                  <li>Document sleeving application in installation records</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Quality Control */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Quality Control and Testing</h3>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="text-xs sm:text-sm text-white mb-3"><strong>Mandatory checks before energising:</strong></p>
              <div className="grid md:grid-cols-2 gap-4 text-xs text-white">
                <div>
                  <p className="font-medium mb-2">Visual Inspections:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>No exposed conductor strands outside accessories</li>
                    <li>Correct colour identification on all conductors</li>
                    <li>Proper crimp impression (hexagonal pattern visible)</li>
                    <li>Gland sealing gaskets properly compressed</li>
                    <li>No damage to cable insulation during installation</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Electrical Tests:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Continuity: &lt;0.5Ω for crimped connections</li>
                    <li>CPC integrity through metallic glands</li>
                    <li>Polarity verification at all termination points</li>
                    <li>Insulation resistance: &gt;1MΩ between conductors</li>
                    <li>Earth loop impedance where applicable</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 p-2 bg-[#121212]/50 rounded border">
                <p className="text-xs text-white"><strong>Record keeping:</strong> Document all test results and accessory specifications used for future maintenance reference.</p>
              </div>
            </div>
          </section>

          {/* Troubleshooting Guide */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Troubleshooting Common Problems</h3>
            <div className="space-y-3">
              <div className="rounded-lg p-3 border border-amber-400/30">
                <p className="font-medium text-white text-sm mb-1">Problem: Ferrule keeps slipping off conductor</p>
                <p className="text-xs text-white mb-2"><strong>Causes:</strong> Oversized ferrule, insufficient crimp pressure, damaged strands</p>
                <p className="text-xs text-white"><strong>Solutions:</strong> Check size chart, verify tool calibration, inspect conductor integrity, consider twin ferrule for multiple conductors</p>
              </div>
              
              <div className="rounded-lg p-3 border border-amber-400/30">
                <p className="font-medium text-white text-sm mb-1">Problem: Gland not maintaining IP rating</p>
                <p className="text-xs text-white mb-2"><strong>Causes:</strong> Incorrect installation torque, damaged seals, wrong cable diameter</p>
                <p className="text-xs text-white"><strong>Solutions:</strong> Check torque specification, replace gaskets, use cable gland with correct size range, apply thread sealant if specified</p>
              </div>
              
              <div className="rounded-lg p-3 border border-amber-400/30">
                <p className="font-medium text-white text-sm mb-1">Problem: High resistance at crimped connection</p>
                <p className="text-xs text-white mb-2"><strong>Causes:</strong> Incomplete crimp, oxidised surfaces, wrong tool die size</p>
                <p className="text-xs text-white"><strong>Solutions:</strong> Re-crimp with correct tool, clean conductor surfaces, check tool maintenance, verify accessory specifications</p>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Examples</h2>
          
          <div className="space-y-4">
            <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>Case Study 1: Manufacturing Plant Failure</strong>
              </p>
              <p className="text-xs sm:text-sm text-white">
                A machinery installation used flexible cables without ferrules in vibration-heavy conditions. Over time, loose strands worked free from terminals, causing overheating and intermittent tripping. The loose connections created high resistance points, leading to voltage drop and equipment malfunction. Refitting with correctly sized ferrules solved the problem, eliminated the high resistance connections, and extended the system's service life significantly.
              </p>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>Case Study 2: Outdoor Installation Issues</strong>
              </p>
              <p className="text-xs sm:text-sm text-white">
                An outdoor lighting installation failed IP testing after 6 months due to water ingress through improperly fitted glands. Investigation revealed the installer had over-tightened the glands, deforming the sealing gaskets. The solution involved replacing all glands, using proper torque settings, and applying thread sealant where specified by the manufacturer. The installation passed subsequent IP testing and remained watertight.
              </p>
            </div>

            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>Case Study 3: Control Panel Upgrade Success</strong>
              </p>
              <p className="text-xs sm:text-sm text-white">
                A control panel upgrade required terminating over 200 flexible cables in limited space. Using twin ferrules and proper sleeving techniques, all connections were completed safely within tight timeframes. Post-installation testing showed all connections met BS 7671 requirements with continuity readings below 0.1Ω. The systematic approach to accessory selection and quality control prevented any subsequent failures.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-white mb-2">Q: Can I use uninsulated ferrules in domestic wiring?</h4>
              <p className="text-sm text-white">A: Yes, but insulated ferrules are often preferred for added protection and easier identification of conductor functions.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-white mb-2">Q: Do all glands need earthing?</h4>
              <p className="text-sm text-white">A: Only metallic glands that could become live during fault conditions require earthing. Plastic glands do not conduct electricity and therefore do not need earthing.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-white mb-2">Q: Can I crimp a ferrule with pliers in an emergency?</h4>
              <p className="text-sm text-white">A: No — pliers cannot apply the correct compression force uniformly, leading to unsafe terminations that may fail over time. Always use proper crimping tools.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <p className="text-xs sm:text-sm text-white">
            Ferrules, sleeving, glands, and crimps are not optional extras — they are key components in safe and professional electrical installations. Correct sizing, proper tools, and compliance with BS 7671 ensure secure, long-lasting connections that meet safety requirements and maintain system reliability throughout the installation's operational life.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quiz (8 Questions)</h2>
          <p className="text-sm text-white mb-6">
            Test your understanding of ferrules, sleeving, glands, and crimps
          </p>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button asChild variant="outline">
            <Link to="../5-3" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Terminating Twin & Earth, Singles, and Flex
            </Link>
          </Button>
          <Button asChild>
            <Link to="../5-5" className="flex items-center gap-2">
              Next: Dressing Cables Neatly Within Boxes and Enclosures
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section5_4;