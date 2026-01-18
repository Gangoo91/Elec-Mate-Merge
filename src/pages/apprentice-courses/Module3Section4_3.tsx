import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Cable,
  AlertTriangle,
  Zap,
  Shield,
  Building,
  Target,
  Scissors,
  CheckCircle2,
  Power,
  Activity,
  Search,
  Clock,
  Wrench,
  ClipboardCheck,
  CircuitBoard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: "ferrule-purpose",
    question: "What is the main purpose of using ferrules on flexible conductors?",
    options: [
      "To change the cable colour",
      "To prevent conductor strand splay and ensure reliable connection",
      "To increase conductor size",
      "To reduce cable cost",
    ],
    correctIndex: 1,
    explanation:
      "Ferrules prevent strand splay in multi-stranded conductors, ensuring all strands make contact and providing a reliable connection in screw or clamp terminals.",
  },
  {
    id: "sleeving-fit",
    question: "Why must sleeving fit snugly over a conductor?",
    options: [
      "To look professional",
      "To prevent slipping and ensure full protection",
      "To reduce material cost",
      "To make installation faster",
    ],
    correctIndex: 1,
    explanation:
      "Snug-fitting sleeving prevents it from slipping off the conductor and ensures complete coverage and protection of exposed copper.",
  },
  {
    id: "crimp-types",
    question: "Name one type of crimp terminal.",
    options: [
      "Ring terminal",
      "Cable gland",
      "Junction box",
      "Circuit breaker",
    ],
    correctIndex: 0,
    explanation:
      "Ring terminals are a common type of crimp terminal used for bolted connections, providing a secure mechanical and electrical connection.",
  },
  {
    id: "earth-sleeving",
    question: "What colour is sleeving for an earth conductor in the UK?",
    options: [
      "Blue",
      "Brown",
      "Green/Yellow",
      "Red",
    ],
    correctIndex: 2,
    explanation:
      "In the UK, earth conductor sleeving must be green/yellow as per BS 7671, providing clear identification for safety.",
  },
];

const mainQuizQuestions = [
  {
    id: 1,
    question: "Which termination method prevents strand splay in flexible conductors?",
    options: ["Sleeving", "Ferrules", "Crimps", "Tape"],
    correctAnswer: 1,
    explanation:
      "Ferrules are specifically designed to prevent strand splay in flexible conductors, ensuring all strands are contained and make proper contact.",
  },
  {
    id: 2,
    question: "What colour is sleeving for an earth conductor in the UK?",
    options: ["Blue", "Brown", "Green/Yellow", "Red"],
    correctAnswer: 2,
    explanation:
      "Earth conductor sleeving must be green/yellow in the UK as specified in BS 7671 for clear identification and safety.",
  },
  {
    id: 3,
    question: "True or False: All crimps are insulated.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False — crimps can be either insulated or uninsulated. Insulated crimps provide additional protection and are preferred in many applications.",
  },
  {
    id: 4,
    question: "Name one tool used for installing ferrules.",
    options: ["Screwdriver", "Ferrule crimping tool", "Wire strippers", "Multimeter"],
    correctAnswer: 1,
    explanation:
      "A ferrule crimping tool is specifically designed to properly compress ferrules onto conductors for secure connections.",
  },
  {
    id: 5,
    question: "Which crimp type is best for bolted connections?",
    options: ["Butt connector", "Ring terminal", "Spade terminal", "Blade connector"],
    correctAnswer: 1,
    explanation:
      "Ring terminals provide the most secure connection for bolted applications as they completely encircle the bolt.",
  },
  {
    id: 6,
    question: "Why should you perform a tug-test on a crimp?",
    options: [
      "To check insulation colour",
      "To ensure the conductor is secure",
      "To stretch the wire",
      "To mark the cable",
    ],
    correctAnswer: 1,
    explanation:
      "A tug-test verifies that the crimp has properly gripped the conductor and won't come loose under normal operating conditions.",
  },
  {
    id: 7,
    question: "Give one risk of loose cable terminations.",
    options: [
      "Reduced cable flexibility",
      "Overheating and potential fire risk",
      "Increased cable cost",
      "Slower installation",
    ],
    correctAnswer: 1,
    explanation:
      "Loose terminations create high resistance joints that generate heat, potentially leading to overheating, arcing, and fire risk.",
  },
  {
    id: 8,
    question: "What must be done before sliding sleeving onto a conductor?",
    options: [
      "Test the circuit",
      "Strip the insulation and prepare the conductor end",
      "Mark the cable",
      "Connect to earth",
    ],
    correctAnswer: 1,
    explanation:
      "The conductor must be properly stripped and prepared before sleeving can be fitted to ensure proper fit and coverage.",
  },
];

const Module3Section4_3: React.FC = () => {
  console.log("Module3Section4_3 component loaded");

  useSEO(
    "Terminating Cables: Sleeving, Ferrules, and Crimps – Module 3 (3.4.3)",
    "Complete guide to cable termination methods. Learn sleeving, ferrules, and crimps for safe, reliable electrical connections per BS 7671."
  );

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
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
            <Cable className="w-4 h-4 text-elec-yellow" />
            <span className="text-elec-yellow text-sm font-medium">Module 3</span>
            <span className="text-white/50">|</span>
            <span className="text-white/70 text-sm">Section 3.4.3</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Terminating Cables: Sleeving, Ferrules, and Crimps
          </h1>
          <p className="text-white/80">
            Essential cable termination techniques for safe, reliable electrical connections meeting BS 7671 standards.
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
                <li><strong>Sleeving:</strong> Provides identification and insulation for exposed conductors.</li>
                <li><strong>Ferrules:</strong> Prevent strand splay in flexible conductors for reliable connections.</li>
                <li><strong>Crimps:</strong> Join conductors or provide termination points for various connections.</li>
                <li>Poor termination leads to overheating, arcing, and potential fire risks.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Green/yellow earth sleeving, insulated ferrules, ring/spade terminals.</li>
                <li><strong>Use:</strong> Ferrules for multi-strand, sleeving for identification, crimps for connections.</li>
                <li><strong>Check:</strong> Correct colours, secure crimps, full coverage, proper tool marks.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify the main types of cable terminations and their purposes.</li>
            <li>Select appropriate termination methods for different cable types and applications.</li>
            <li>Apply correct installation techniques to ensure safe, reliable connections.</li>
            <li>Recognise the consequences of poor cable termination.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Content
          </h2>

          {/* Sleeving */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Sleeving
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Purpose & Materials</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white mb-1">Primary Purpose</p>
                    <p className="text-white">Provides identification and insulation for exposed conductors at termination points</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Materials Available</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>PVC sleeving - most common, various colours</li>
                      <li>Heat-shrink tubing - self-sealing when heated</li>
                      <li>Silicone sleeving - high temperature applications</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Common Applications</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Earth conductors - green/yellow identification</li>
                      <li>Neutral conductors - blue identification</li>
                      <li>Phase conductors - brown identification</li>
                      <li>Insulating bare copper strands at terminals</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Installation Best Practice</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Select correct size for snug fit without slipping</li>
                      <li>Slide sleeving on before making connections</li>
                      <li>Ensure full coverage of exposed copper</li>
                      <li>Leave adequate length for future maintenance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <div className="my-6 border-t border-white/10" />

          {/* Ferrules */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5" /> Ferrules
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium mb-2">Purpose & Construction</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white mb-1">Primary Purpose</p>
                    <p className="text-white">Prevents conductor strand splay and ensures reliable connection in screw or clamp terminals</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Construction</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Tin-plated copper tube for conductivity</li>
                      <li>Plastic collar for insulation (insulated types)</li>
                      <li>Colour-coded plastic for easy size identification</li>
                      <li>Various lengths for different applications</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Applications</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Multi-stranded flexible conductors</li>
                      <li>Control panels and distribution boards</li>
                      <li>Modular equipment connections</li>
                      <li>High-vibration environments</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Installation Technique</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Cut conductor cleanly with proper strippers</li>
                      <li>Strip correct amount of insulation (ferrule length)</li>
                      <li>Insert conductor fully into ferrule</li>
                      <li>Crimp using correct ferrule crimping tool</li>
                      <li>Ensure no copper strands left outside ferrule</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <div className="my-6 border-t border-white/10" />

          {/* Crimps */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <CircuitBoard className="w-5 h-5" /> Crimps
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Types & Applications</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white mb-1">Ring Terminals</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>For bolted connections - completely encircles bolt</li>
                      <li>Most secure connection for high-current applications</li>
                      <li>Cannot be removed without unbolting</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Spade Terminals</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>For quick connection and disconnection</li>
                      <li>Easy maintenance access</li>
                      <li>Can be removed without full disconnection</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Butt Connectors</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>For joining two conductors inline</li>
                      <li>Extends cable runs or repairs damaged sections</li>
                      <li>Maintains conductor integrity</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Installation Process</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Select correct crimp size for conductor CSA</li>
                      <li>Use ratchet crimping tool for consistent pressure</li>
                      <li>Position conductor in crimp barrel properly</li>
                      <li>Crimp in correct location (marked on crimp)</li>
                      <li>Perform tug-test to verify secure connection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
          <div className="my-6 border-t border-white/10" />

          {/* Consequences of Poor Termination */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Consequences of Poor Termination
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Electrical Hazards</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>High Resistance Joints:</strong> Loose terminations cause increased resistance, leading to heat build-up</li>
                  <li><strong>Arcing:</strong> Poor connections can create arcs under load, causing fire risk</li>
                  <li><strong>Voltage Drop:</strong> Increased resistance reduces available voltage at equipment</li>
                  <li><strong>Circuit Failure:</strong> Complete disconnection under load can damage equipment</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Mechanical Issues</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Strand Breakage:</strong> Damaged conductors reduce current-carrying capacity</li>
                  <li><strong>Vibration Damage:</strong> Loose connections worsen under mechanical stress</li>
                  <li><strong>Corrosion:</strong> Exposed copper strands oxidize, increasing resistance</li>
                  <li><strong>Contact Degradation:</strong> Poor terminations deteriorate over time</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Safety Risks</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Electric Shock:</strong> Incorrect colour coding causes identification errors</li>
                  <li><strong>Fire Risk:</strong> Overheating can ignite surrounding materials</li>
                  <li><strong>Equipment Damage:</strong> Poor connections can damage expensive equipment</li>
                  <li><strong>System Downtime:</strong> Failures often occur at critical times</li>
                </ul>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </section>

        {/* Tools and Equipment */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Essential Tools and Equipment
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-semibold">Crimping Tools</h3>
              </div>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Ratchet Crimping Tool:</strong> Ensures consistent pressure and proper crimp</li>
                <li><strong>Ferrule Crimping Tool:</strong> Specific for ferrule installation</li>
                <li><strong>Multi-Size Crimpers:</strong> Various jaw sizes for different terminals</li>
                <li><strong>Quality Check:</strong> Look for calibrated tools with clear size markings</li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Scissors className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-semibold">Preparation Tools</h3>
              </div>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Wire Strippers:</strong> Clean, precise insulation removal</li>
                <li><strong>Cable Cutters:</strong> Clean conductor cutting</li>
                <li><strong>Heat Gun:</strong> For heat-shrink sleeving application</li>
                <li><strong>Tug-Test Equipment:</strong> Verify connection security</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Industry Standards */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Industry Standards & Compliance
          </h2>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-white">
            <div className="bg-elec-yellow/5 rounded-lg p-4 border border-elec-yellow/30">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-elec-yellow" />
                BS 7671 Requirements
              </h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>Section 526: Electrical connections</li>
                <li>Regulation 526.5: Termination requirements</li>
                <li>Section 514: Identification and notices</li>
              </ul>
            </div>
            <div className="bg-elec-yellow/5 rounded-lg p-4 border border-elec-yellow/30">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-elec-yellow" />
                IET Guidelines
              </h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>On-Site Guide recommendations</li>
                <li>Guidance Note 1: Selection</li>
                <li>Best practice procedures</li>
              </ul>
            </div>
            <div className="bg-elec-yellow/5 rounded-lg p-4 border border-elec-yellow/30">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Building className="w-4 h-4 text-elec-yellow" />
                Manufacturer Standards
              </h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>Tool calibration requirements</li>
                <li>Terminal specifications</li>
                <li>Quality assurance procedures</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real-World Example */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Real-World Example
          </h2>
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/30">
              <AlertTriangle className="w-6 h-6 text-elec-yellow" />
            </div>
            <div>
              <p className="text-white font-medium">Distribution Board Installation - Terminal Failure Case Study</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* The Problem */}
            <div className="bg-muted/30 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h3 className="font-semibold text-white">The Problem</h3>
              </div>
              <div className="space-y-2 text-sm text-white">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Initial Installation:</strong> Multi-stranded conductor terminated directly into screw terminal</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Over Time:</strong> Building vibration caused conductor strand splay</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Result:</strong> Reduced contact area created high-resistance hot joint</span>
                </div>
                <div className="flex items-start gap-2">
                  <Power className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Failure:</strong> Joint overheated, tripped circuit, required costly emergency repairs</span>
                </div>
              </div>
            </div>

            {/* The Solution */}
            <div className="bg-muted/30 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-elec-yellow rounded-full"></div>
                <h3 className="font-semibold text-white">The Correct Method</h3>
              </div>
              <div className="space-y-2 text-sm text-white">
                <div className="flex items-start gap-2">
                  <Wrench className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Preparation:</strong> Strip conductor to correct length for ferrule</span>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Ferrule Installation:</strong> Insert conductor fully and crimp with proper tool</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Termination:</strong> Ferrule provides solid termination point preventing strand splay</span>
                </div>
                <div className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Outcome:</strong> Reliable connection maintains integrity under vibration</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Lessons */}
          <div className="mt-6 bg-elec-yellow/5 rounded-lg p-4 border border-elec-yellow/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-elec-yellow rounded-full"></div>
              <h3 className="font-semibold text-white">Key Lessons Learned</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong className="text-white">Prevention:</strong> Always use ferrules with multi-stranded conductors</span>
              </div>
              <div className="flex items-start gap-2">
                <Search className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong className="text-white">Inspection:</strong> Regular thermal imaging can detect developing problems</span>
              </div>
              <div className="flex items-start gap-2">
                <ClipboardCheck className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong className="text-white">Quality:</strong> Initial correct installation prevents costly failures</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 text-xs sm:text-sm text-white">
            <div>
              <p className="font-semibold mb-1">Can I use electrical tape instead of sleeving?</p>
              <p>No — sleeving provides a neater, safer, and more durable solution. Tape can unravel over time and doesn't provide the same level of protection or identification.</p>
            </div>
            <div className="border-t border-white/10" />
            <div>
              <p className="font-semibold mb-1">Do all ferrules need to be insulated?</p>
              <p>Not always, but insulated ferrules are generally preferred for improved handling, safety, and prevention of accidental contact in tight spaces.</p>
            </div>
            <div className="border-t border-white/10" />
            <div>
              <p className="font-semibold mb-1">How do I choose the right crimp size?</p>
              <p>Match the crimp to the conductor CSA. Most crimps are colour-coded to industry standards: red (0.5-1.5mm²), blue (1.5-2.5mm²), yellow (4.0-6.0mm²).</p>
            </div>
            <div className="border-t border-white/10" />
            <div>
              <p className="font-semibold mb-1">What's the difference between insulated and non-insulated crimps?</p>
              <p>Insulated crimps have a plastic sleeve that provides insulation and protection. Non-insulated crimps are bare metal and may require additional sleeving for protection.</p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Summary
          </h2>
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/30">
              <ClipboardCheck className="w-6 h-6 text-elec-yellow" />
            </div>
            <div>
              <p className="text-white">Essential termination techniques for professional electrical installations</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Sleeving Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-elec-yellow rounded-full"></div>
                <h3 className="font-semibold text-white">Sleeving</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Protection & Identification</p>
                    <p className="text-white">Insulates and colour-codes exposed conductors</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">BS 7671 Compliance</p>
                    <p className="text-white">Green/yellow for earth, blue for neutral</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ferrules Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-elec-yellow rounded-full"></div>
                <h3 className="font-semibold text-white">Ferrules</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Wrench className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Strand Management</p>
                    <p className="text-white">Prevents splay in flexible conductors</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Reliable Connection</p>
                    <p className="text-white">Ensures all strands make contact</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Crimps Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-elec-yellow rounded-full"></div>
                <h3 className="font-semibold text-white">Crimps</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CircuitBoard className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Versatile Connections</p>
                    <p className="text-white">Ring, spade, butt connectors available</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Power className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Secure Termination</p>
                    <p className="text-white">Proper crimping ensures lasting connection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="mt-6 bg-elec-yellow/5 rounded-lg p-4 border border-elec-yellow/30">
            <p className="text-white font-medium text-center">
              <strong>Bottom Line:</strong> Proper cable termination using sleeving, ferrules, and crimps is fundamental to electrical safety.
              These techniques prevent failures, ensure compliance with BS 7671, and protect both equipment and personnel.
            </p>
          </div>
        </section>

        {/* Knowledge Check */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Knowledge Check
          </h2>
          <Quiz questions={mainQuizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-6 border-t border-white/10">
          <Button variant="outline" className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: First Fix and Second Fix
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
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

export default Module3Section4_3;
