import { ArrowLeft, ArrowRight, Cable, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cable Pulling Techniques - Single-Core and Multi-Core Cables | Level 2 Electrical Course";
const DESCRIPTION = "Master professional cable pulling techniques for single-core and multi-core cables. Learn preparation methods, tension control, and damage prevention for BS 7671 compliance.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Why should cable rollers be used during pulling?",
    options: ["To increase pulling speed", "To reduce friction and prevent cable damage", "To reduce the number of workers needed"],
    correctIndex: 1,
    explanation: "Cable rollers reduce friction and prevent abrasion damage by supporting the cable and creating smooth contact points during pulling operations."
  },
  {
    id: 2,
    question: "What is the purpose of using a pulling lubricant?",
    options: ["To clean the cable during installation", "To reduce friction during pulling", "To protect from UV damage"],
    correctIndex: 1,
    explanation: "Pulling lubricant reduces friction between the cable and containment surfaces, making pulls easier and preventing jacket damage, especially in long runs or tight bends."
  },
  {
    id: 3,
    question: "Why is it important to observe minimum bend radius?",
    options: ["For aesthetic purposes", "To prevent permanent conductor and insulation damage", "To reduce installation time"],
    correctIndex: 1,
    explanation: "Exceeding minimum bend radius can cause permanent damage to conductors and insulation, leading to reduced performance, early failure, and safety hazards."
  }
];

const Module4Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of a pulling lubricant?",
      options: [
        "To make the cable look cleaner",
        "To reduce friction during pulling",
        "To protect from UV light",
        "To increase cable flexibility"
      ],
      correctAnswer: 1,
      explanation: "Pulling lubricant reduces friction between the cable and containment surfaces, preventing damage and making installation easier."
    },
    {
      id: 2,
      question: "True or False: It is acceptable to exceed a cable's minimum bend radius during installation if it will be straightened later.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Exceeding minimum bend radius can cause permanent internal conductor damage that cannot be repaired by straightening."
    },
    {
      id: 3,
      question: "Name two methods of reducing cable abrasion during pulling.",
      options: [
        "Use rollers and apply lubricant",
        "Pull faster and use more force",
        "Install cables when cold",
        "Use smaller containment"
      ],
      correctAnswer: 0,
      explanation: "Cable rollers and pulling lubricant are two primary methods to reduce friction and prevent abrasion during cable installation."
    },
    {
      id: 4,
      question: "Why should single-core cables be pulled together?",
      options: [
        "To save time during installation",
        "To ensure even tension and avoid phase crossover",
        "To reduce the amount of containment needed",
        "To make termination easier"
      ],
      correctAnswer: 1,
      explanation: "Pulling single-core cables together ensures even tension distribution and maintains proper phase arrangement, avoiding crossover issues inside containment."
    },
    {
      id: 5,
      question: "What tool is used to support heavy cables in long tray runs?",
      options: ["Cable ties", "Cable rollers", "Cable clamps", "Cable guides"],
      correctAnswer: 1,
      explanation: "Cable rollers support heavy cables in long tray runs, reducing friction and preventing damage during pulling operations."
    },
    {
      id: 6,
      question: "What is the risk of not supporting cables in vertical pulls?",
      options: [
        "Increased installation time",
        "Excessive stretching, leading to conductor damage",
        "Difficulty in cable identification",
        "Increased material costs"
      ],
      correctAnswer: 1,
      explanation: "Without proper support in vertical pulls, cable weight can cause excessive stretching, potentially damaging conductors and compromising electrical integrity."
    },
    {
      id: 7,
      question: "Name one common mistake when pulling multi-core cables.",
      options: [
        "Pulling too slowly",
        "Twisting or coiling during pulling",
        "Using too many workers",
        "Installing in warm weather"
      ],
      correctAnswer: 1,
      explanation: "Twisting or coiling multi-core cables during pulling can damage the internal structure and compromise the cable's performance and safety."
    },
    {
      id: 8,
      question: "How can pulling tension be monitored during mechanical pulls?",
      options: [
        "By listening to the motor sound",
        "Use a tension gauge",
        "Count the number of cable turns",
        "Time the pulling operation"
      ],
      correctAnswer: 1,
      explanation: "A tension gauge provides real-time monitoring of pulling force, ensuring manufacturer limits are not exceeded and preventing cable damage."
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
              Back to Section 4
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
              <Cable className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.4.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Pulling in Single-Core and Multi-Core Cables
          </h1>
          <p className="text-white">
            Master professional cable pulling techniques that protect conductor insulation, prevent stretching, and ensure BS 7671 compliance for safe installations.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Proper cable pulling protects conductor insulation and prevents stretching.</li>
                <li>Different techniques required for single-core vs multi-core cables.</li>
                <li>Preparation, support, and tension control are critical for success.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Long cable runs, vertical pulls, tight containment bends.</li>
                <li><strong>Use:</strong> Cable rollers, tension gauges, pulling lubricant, draw wire.</li>
                <li><strong>Check:</strong> Bend radius, cable tension, insulation integrity.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Prepare containment systems and cables for pulling operations using professional techniques.</li>
            <li>Select suitable cable pulling methods for different cable types, weights, and installation routes.</li>
            <li>Minimise mechanical strain and damage during installation through proper support and technique.</li>
            <li>Identify common cable pulling faults and implement prevention strategies.</li>
            <li>Apply safe working practices during cable pulling operations to protect personnel and equipment.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Preparation and Planning */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Preparation and Planning for Cable Pulling</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Thorough preparation is essential for successful cable installation and prevents costly damage or rework:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Containment Inspection and Preparation</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Sharp edge protection requirements:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Steel containment: Install insulating bushes at all entry points</li>
                      <li>Cut edges: File smooth to 0.5mm radius minimum, no burrs</li>
                      <li>Entry grommets: Use appropriate IP rating for location</li>
                      <li>Inspect joints: Check for protruding screws or sharp interfaces</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Route verification procedures:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Clear debris and obstructions from full route length</li>
                      <li>Verify against approved drawings: check dimensions and bends</li>
                      <li>Test route with draw wire: 3mm pilot wire through complete path</li>
                      <li>Measure total route length: add 10% allowance for terminations</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical requirement:</strong> No containment opening should exceed 90% fill capacity
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Cable Drum Setup and Positioning</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Drum handling specifications:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Drum jacks: Rated 150% of drum weight, lockable rotation</li>
                      <li>Feed angle: Maximum 45° from straight line to prevent side loading</li>
                      <li>Brake control: Maintain consistent back-tension, prevent overrun</li>
                      <li>Ground clearance: 300mm minimum to prevent contamination</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Environmental considerations:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Temperature limits: PVC cables minimum 0°C, XLPE minimum -20°C</li>
                      <li>Humidity control: Avoid condensation on cable surface</li>
                      <li>Working space: 3m diameter clear area around drum</li>
                      <li>Weather protection: Cover drums in outdoor installations</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Professional tip:</strong> Mark cable length at regular intervals before pulling starts
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Team Coordination and Communication</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Personnel requirements by cable type:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Single-core up to 25mm²: 2-person team (puller + feeder)</li>
                      <li>Multi-core up to 50mm²: 3-person team (puller + feeder + spotter)</li>
                      <li>Heavy cables {'>'}50mm²: 4+ team with mechanical assistance</li>
                      <li>Vertical runs {'>'}10m: Additional support person at each floor</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Communication protocol standards:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Clear verbal signals: "Pull", "Hold", "Stop", "Reverse"</li>
                      <li>Radio communication for long runs: dedicated channel</li>
                      <li>Hand signals as backup: visual confirmation system</li>
                      <li>Emergency stop procedure: immediate tension release protocol</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety requirement:</strong> Designate one person as pull coordinator with override authority
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="preparation-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Cable Pulling Methods and Equipment */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Cable Pulling Methods and Equipment Selection</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Method selection depends on cable weight, route complexity, and available access points:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Manual Pulling Techniques and Limits</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Application parameters:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Maximum distance: 30m for single runs, 20m with multiple bends</li>
                      <li>Cable weight limit: 25kg total weight per pull</li>
                      <li>Maximum pulling force: 500N (50kg force) sustained effort</li>
                      <li>Team efficiency: 2-person team optimal, 4-person maximum</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Technique requirements:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Steady pulling speed: 0.5-1.0 m/min constant rate</li>
                      <li>No jerking motions: smooth acceleration and deceleration</li>
                      <li>Rest periods: 2-minute break every 10 minutes pulling</li>
                      <li>Load distribution: alternate team members to prevent fatigue</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Ergonomic limit:</strong> Individual pulling force should not exceed 25% of body weight
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Mechanical Pulling Systems and Control</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Winch specifications and setup:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Capacity rating: Minimum 3:1 safety factor above cable weight</li>
                      <li>Speed control: Variable 1-15 m/min, fine adjustment capability</li>
                      <li>Load monitoring: Tension gauge with preset limit alarms</li>
                      <li>Emergency stop: Dead-man switch within reach of operator</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Cable tension limits by type:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>PVC/PVC cables: 5 × cable weight maximum tension</li>
                      <li>XLPE/PVC cables: 7 × cable weight maximum tension</li>
                      <li>Single-core cables: 3 × cable weight per core maximum</li>
                      <li>Armoured cables: 10 × cable weight (pulling on armour)</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical safety:</strong> Never exceed manufacturer's stated maximum pulling tension
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Support Equipment and Friction Reduction</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Cable roller specifications:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Roller diameter: Minimum 10 × cable diameter for smooth operation</li>
                      <li>Spacing intervals: Maximum 1.5m centres for tray runs</li>
                      <li>Load rating: 150% of anticipated cable weight</li>
                      <li>Bearing quality: Sealed ball race, maintenance-free type</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Pulling lubricant applications:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Water-based formula: Standard for most cable types</li>
                      <li>Coverage rate: 0.5 litres per 100m of conduit length</li>
                      <li>Application method: Spray ahead of cable entry point</li>
                      <li>Cleanup requirement: Remove excess after installation</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Environmental note:</strong> Use only biodegradable lubricants in outdoor installations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="methods-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Single-Core and Multi-Core Handling */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Single-Core and Multi-Core Cable Handling Techniques</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Different cable types require specific handling techniques to prevent damage and ensure proper installation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Single-Core Cable Installation Procedures</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Simultaneous pulling requirements:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Phase grouping: Pull L1, L2, L3 together to maintain balanced tension</li>
                      <li>Equal length control: Mark cables at 5m intervals for tracking</li>
                      <li>Temporary restraint: Use cable basket during pulling operation</li>
                      <li>Phase identification: Maintain colour coding throughout installation</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Separation and spacing control:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>High voltage installations: 50mm minimum spacing maintained</li>
                      <li>Magnetic field reduction: Trefoil formation for power circuits</li>
                      <li>Spacer installation: Every 2m in horizontal runs</li>
                      <li>Crossover prevention: Pre-arrange sequence before pulling</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>BS 7671 requirement:</strong> Single-core cables must be arranged to minimise inductance
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Multi-Core Cable Protection and Support</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Bend radius calculations:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Standard cables: Minimum 8 × overall cable diameter</li>
                      <li>Armoured cables: Minimum 12 × overall cable diameter</li>
                      <li>High voltage cables: Minimum 15 × overall cable diameter</li>
                      <li>Flexible cables: Minimum 6 × overall cable diameter</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Support and deformation prevention:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Support spacing: Every 500mm maximum in vertical sections</li>
                      <li>Side loading prevention: Guide rollers at direction changes</li>
                      <li>Oval deformation limit: Less than 5% diameter change</li>
                      <li>Recovery time: Allow 30 minutes for cable to relax after pulling</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Quality check:</strong> Measure cable diameter after installation to verify no permanent deformation
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Damage Prevention and Quality Control</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Abrasion protection measures:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Sharp edge inspection: Visual check every 5m of route</li>
                      <li>Contact pressure limits: Maximum 2N/cm² at support points</li>
                      <li>Dragging elimination: Continuous support along route</li>
                      <li>Surface protection: Smooth guides at all contact points</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Post-installation verification:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Visual inspection: Check full cable length for scuffs or cuts</li>
                      <li>Insulation testing: 500V megger test before termination</li>
                      <li>Continuity check: Verify all conductors intact</li>
                      <li>Documentation: Record any anomalies for remedial action</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Rejection criteria:</strong> Any visible damage to outer sheath requires cable replacement
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="handling-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Safety and Professional Practice */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Safety and Professional Practice Guidelines</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Professional cable pulling requires adherence to safety protocols and quality standards:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-1">Common Mistakes and Prevention Strategies</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Critical errors to avoid:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Exceeding bend radius: Permanent conductor damage, early failure</li>
                      <li>Insufficient support: Cable stretching, jacket cracking</li>
                      <li>Sharp edge contact: Insulation cuts, potential shock hazard</li>
                      <li>Poor team coordination: Sudden tension spikes, equipment damage</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Prevention protocols:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Pre-pull inspection: Complete route verification before starting</li>
                      <li>Equipment calibration: Test tension gauges before each use</li>
                      <li>Progressive loading: Gradual force application, monitor response</li>
                      <li>Contingency planning: Pre-planned response to cable jamming</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Industry standard:</strong> Stop work immediately if any resistance increase is detected
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-1">Professional Installation Techniques</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Weight distribution strategies:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Vertical installations: Support every 3m maximum intervals</li>
                      <li>Heavy cable handling: Use slings every 10m during installation</li>
                      <li>Multi-cable pulls: Stagger installation times to reduce congestion</li>
                      <li>Load sharing: Distribute weight across multiple support points</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Environmental adaptations:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Cold weather: Pre-warm cables above 5°C before handling</li>
                      <li>Hot conditions: Schedule work during cooler periods</li>
                      <li>Confined spaces: Ensure adequate ventilation and escape routes</li>
                      <li>Height work: Use appropriate fall protection and lifting equipment</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Best practice:</strong> Record ambient temperature and cable condition for quality documentation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-world example */}
        <Card className="mb-8 p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-world example</h2>
          <div className="text-xs sm:text-sm text-white">
            <p className="mb-4">
              <strong>Scenario:</strong> During a commercial installation, a team pulled a heavy 95mm² 4-core SWA cable through 80m of steel trunking without using cable rollers or lubricant.
            </p>
            <p className="mb-4">
              <strong>Problems encountered:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Excessive pulling force required, exceeding manufacturer limits by 40%</li>
              <li>Cable jacket severely abraded in five locations from sharp trunking edges</li>
              <li>Internal conductor compression from excessive tension during pulling</li>
              <li>Failed insulation resistance test due to moisture ingress through damaged sheath</li>
            </ul>
            <p className="mb-4">
              <strong>Cost implications:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Complete cable replacement: £3,200 material cost</li>
              <li>Additional labour: 16 hours removal and re-installation</li>
              <li>Project delay: 3 days waiting for replacement cable delivery</li>
              <li>Testing and certification: Repeated inspection charges</li>
            </ul>
            <p className="mb-4">
              <strong>Correct approach would have included:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Install bushes at all trunking entry points</li>
              <li>Position cable rollers every 1.5m along the route</li>
              <li>Apply pulling lubricant before cable insertion</li>
              <li>Use tension gauge to monitor pulling force continuously</li>
              <li>Pre-inspect route for sharp edges and obstructions</li>
            </ul>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div>
              <p className="font-medium mb-1">Q: Can I exceed the bend radius just for pulling, if I straighten the cable afterwards?</p>
              <p className="pl-4">A: No. Exceeding the bend radius can cause permanent internal conductor damage that cannot be repaired by straightening. Always maintain manufacturer specifications.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Q: Is pulling lubricant always necessary?</p>
              <p className="pl-4">A: Not always, but it's essential for long runs over 30m, routes with multiple bends, or tight conduit installations. The cost of lubricant is minimal compared to potential cable damage.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Q: What if a cable gets stuck mid-pull?</p>
              <p className="pl-4">A: Stop immediately, reverse slightly to relieve tension, and locate the obstruction. Never force the pull as this risks serious cable damage. Investigate and clear the problem before continuing.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Q: How do I calculate maximum pulling tension for a specific cable?</p>
              <p className="pl-4">A: Refer to the manufacturer's datasheet for maximum pulling tension. As a general rule: PVC cables = 5 × cable weight, XLPE cables = 7 × cable weight. Never exceed these limits.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Q: What spacing should I use for cable rollers in long tray runs?</p>
              <p className="pl-4">A: Install rollers every 1-2 metres for standard cables, every 1 metre for heavy cables over 50mm². The roller diameter should be at least 10 times the cable diameter.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Effective cable pulling relies on thorough preparation, proper equipment selection, and coordinated teamwork to ensure safe, compliant installations.</li>
            <li>Different techniques are required for single-core versus multi-core cables, with specific attention to tension distribution and bend radius limitations.</li>
            <li>Support equipment including cable rollers, pulling lubricant, and tension monitoring devices are essential for preventing damage during installation.</li>
            <li>Following manufacturer tension limits and maintaining minimum bend radius prevents costly cable replacement and ensures long-term system reliability.</li>
            <li>Professional installation practices, including environmental considerations and safety protocols, ensure compliance with BS 7671 and protect both personnel and equipment.</li>
          </ul>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <Quiz
            questions={quizQuestions}
            title="Cable Pulling Techniques Knowledge Check"
          />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="../4-3" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Assembling and Joining
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="../4-5" className="flex items-center gap-2">
              Next: Cable Installation Testing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section4_4;