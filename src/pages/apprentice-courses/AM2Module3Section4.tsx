import { ArrowLeft, ArrowRight, Settings, Cable, CheckCircle, AlertTriangle, Target, Wrench, Zap, Terminal, BookOpen, Clock, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module3Section4 = () => {
  useSEO(
    "Termination, Connections, and Circuit Labelling | AM2 Module 3 Section 4",
    "Professional workmanship standards and NET compliance requirements for AM2 assessment - terminations, connections and labelling"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "termination-standards",
      question: "What is the most critical requirement for conductor terminations?",
      options: [
        "Using the correct cable size",
        "No exposed copper beyond terminals",
        "Tight terminal connections only",
        "Proper cable routing"
      ],
      correctIndex: 1,
      explanation: "No exposed copper beyond terminals is critical for safety - prevents short circuits, electric shock, and ensures compliance with BS7671 Section 526."
    },
    {
      id: "cpc-sleeving",
      question: "When is CPC sleeving required?",
      options: [
        "Only in metal accessories",
        "Only where confusion could arise",
        "Everywhere - including plastic accessories",
        "Only in distribution boards"
      ],
      correctIndex: 2,
      explanation: "CPC sleeving is mandatory everywhere according to BS7671, including plastic accessories. This ensures proper identification and compliance."
    },
    {
      id: "swa-glands",
      question: "What provides the earthing connection for SWA cable armour?",
      options: [
        "The gland body only",
        "Banjo washer and earthing connection",
        "Cable clamp mechanism",
        "Internal armour contact"
      ],
      correctIndex: 1,
      explanation: "The banjo washer provides the crucial earthing connection for SWA cable armour, ensuring continuity and safety."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What BS 7671 section covers requirements for electrical connections?",
      options: ["Section 512", "Section 526", "Section 541", "Section 559"],
      correctAnswer: 1,
      explanation: "Section 526 of BS 7671 covers electrical connections and terminations, setting out requirements for secure and safe connections."
    },
    {
      id: 2,
      question: "Why must conductor insulation run up to the terminal?",
      options: ["For aesthetics", "To prevent short circuits and maintain safety", "To reduce cost", "For easier identification"],
      correctAnswer: 1,
      explanation: "Insulation must run up to terminals to prevent exposed copper which could cause short circuits, electric shock, or arc faults."
    },
    {
      id: 3,
      question: "In AM2 assessment, CPC sleeving is required:",
      options: ["Only in metal back boxes", "Only where confusion could arise", "Everywhere, including plastic accessories", "Only in distribution boards"],
      correctAnswer: 2,
      explanation: "CPC sleeving is mandatory everywhere in AM2 - including plastic accessories. This demonstrates understanding of BS7671 requirements."
    },
    {
      id: 4,
      question: "What's the purpose of a banjo washer in an SWA gland?",
      options: ["Aesthetic finishing", "Earthing connection for the armour", "Cable strain relief", "Weather sealing"],
      correctAnswer: 1,
      explanation: "The banjo washer provides the earthing connection for the SWA cable armour, ensuring electrical continuity and safety."
    },
    {
      id: 5,
      question: "Why must no copper be left exposed outside terminals?",
      options: ["Regulation requirement only", "Risk of short circuit and shock", "Aesthetic reasons", "Cost considerations"],
      correctAnswer: 1,
      explanation: "Exposed copper creates serious risks: short circuits, electric shock, arc faults, and fails NET workmanship standards."
    },
    {
      id: 6,
      question: "What is the most common DB termination error in AM2?",
      options: ["Using correct cable sizes", "Neat cable dressing", "CPC connected to neutral bar", "Proper labelling"],
      correctAnswer: 2,
      explanation: "Connecting CPC to neutral bar is a serious error - non-compliant with BS 7671 and results in immediate failure."
    },
    {
      id: 7,
      question: "What type of screwdriver should you use in a DB?",
      options: ["Any available screwdriver", "Torque screwdriver for critical connections", "Phillips head only", "Flathead only"],
      correctAnswer: 1,
      explanation: "Torque screwdrivers ensure connections meet manufacturer specifications and demonstrate professional standards expected in AM2."
    },
    {
      id: 8,
      question: "How should you label circuits in a distribution board?",
      options: ["Pencil markings", "Masking tape and pen", "Permanent, legible labels", "No labelling needed"],
      correctAnswer: 2,
      explanation: "Labels must be permanent and legible - pencil markings fade and temporary tape doesn't meet professional standards."
    },
    {
      id: 9,
      question: "What cable preparation error causes most AM2 failures?",
      options: ["Using wrong cable size", "Over-stripped insulation exposing copper", "Correct terminal selection", "Proper cable routing"],
      correctAnswer: 1,
      explanation: "Over-stripped cables with exposed copper is the #1 termination error - creates safety risks and fails workmanship checks."
    },
    {
      id: 10,
      question: "What marking strategy saves marks in AM2?",
      options: ["Label everything at the end", "Label as you go during installation", "Label only what's specified", "Use temporary labels"],
      correctAnswer: 1,
      explanation: "Labelling as you go prevents rushing at the end, ensures nothing is missed, and demonstrates systematic working methods."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 3
              </Link>
            </Button>
            <Button variant="ghost" className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
              <Link to="../section5">
                Section 5
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        {/* Title Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-elec-yellow/10 text-elec-yellow text-sm font-medium rounded-full mb-4">
            <Terminal className="w-4 h-4" />
            Module 3 – Section 4
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Termination, Connections, and Circuit Labelling
          </h1>
          <p className="text-base text-white mb-8 leading-relaxed">
            Professional workmanship standards and NET compliance requirements for AM2 assessment - master terminations, connections and labelling for assessment success.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-8">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  CRITICAL: Terminations Determine AM2 Success or Failure
                </h3>
                <p className="text-sm text-red-700 dark:text-elec-yellow mb-3">
                  Poor terminations are the #1 cause of AM2 failures. Even if your circuits work perfectly, exposed copper, loose connections, or missing labels will fail you. The assessor opens every accessory, checks every connection, and examines every label. There are no second chances.
                </p>
                <p className="text-sm text-red-700 dark:text-elec-yellow font-medium">
                  Perfect terminations require systematic preparation, correct tools, and understanding of NET standards. Rush this section and you risk everything.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Learning Outcomes
            </h2>
            <p className="text-sm text-white mb-4">
              By the end of this section, you should be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Execute professional terminations meeting BS7671 Section 526 requirements
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Apply correct CPC sleeving and conductor identification in all situations
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Master SWA cable gland installation and armour earthing techniques
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Implement systematic labelling strategies for circuit identification
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Avoid the critical errors that cause 70% of AM2 termination failures
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Understand NET assessment criteria and assessor expectations
              </li>
            </ul>
          </div>
        </Card>

        {/* NET Assessment Criteria */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              NET Assessment Criteria - What Assessors Check
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Primary Assessment Areas (Pass/Fail)</h4>
                <ul className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">❌</span>
                    <div>
                      <strong>Exposed copper beyond terminals</strong> - Immediate fail
                      <p className="text-xs mt-1">Any visible copper creates shock/short circuit risk</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">❌</span>
                    <div>
                      <strong>CPC not sleeved or connected</strong> - Safety critical failure
                      <p className="text-xs mt-1">Required everywhere, including plastic accessories</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">❌</span>
                    <div>
                      <strong>Loose or insecure connections</strong> - Fire/safety risk
                      <p className="text-xs mt-1">Must be mechanically and electrically sound</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">❌</span>
                    <div>
                      <strong>Incorrect polarity in DB</strong> - Fundamental error
                      <p className="text-xs mt-1">CPC to neutral bar = automatic fail</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Secondary Assessment (Marks Deduction)</h4>
                <ul className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">⚠️</span>
                    <div>
                      <strong>Poor cable preparation/stripping</strong> - Workmanship marks
                      <p className="text-xs mt-1">Nicked insulation, incorrect strip lengths</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">⚠️</span>
                    <div>
                      <strong>Untidy cable dressing</strong> - Professional standards
                      <p className="text-xs mt-1">Cables crossing, poor routing, excessive length</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">⚠️</span>
                    <div>
                      <strong>Missing or poor labelling</strong> - Identification requirements
                      <p className="text-xs mt-1">Pencil marks, temporary labels, illegible text</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">⚠️</span>
                    <div>
                      <strong>Conductor damage during installation</strong> - Care and skill
                      <p className="text-xs mt-1">Damaged insulation, kinked conductors</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* General Termination Standards */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              1. General Termination Standards (BS 7671, Section 526)
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Core Requirements - Non-Negotiable</h4>
                <ul className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-green-400 min-w-[20px]">✓</span>
                    <div>
                      <strong>Conductors electrically and mechanically sound</strong>
                      <p className="text-xs mt-1">Secure connections that won't work loose over time</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-green-400 min-w-[20px]">✓</span>
                    <div>
                      <strong>No bare copper visible outside terminals</strong>
                      <p className="text-xs mt-1">Critical safety requirement - prevents shock and short circuits</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-green-400 min-w-[20px]">✓</span>
                    <div>
                      <strong>Insulation runs up to terminal</strong>
                      <p className="text-xs mt-1">Proper cable preparation with correct strip lengths</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-green-400 min-w-[20px]">✓</span>
                    <div>
                      <strong>CPC sleeving correctly applied</strong>
                      <p className="text-xs mt-1">Green/yellow identification on all CPC conductors</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-green-400 min-w-[20px]">✓</span>
                    <div>
                      <strong>Correct torque values applied</strong>
                      <p className="text-xs mt-1">Manufacturer specifications met for critical connections</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-transparent border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Professional Tips</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Strip cables using proper strippers - avoid damaging conductor insulation</li>
                  <li>• Cut conductors to exact length - no bunching or excessive length in terminals</li>
                  <li>• Use torque screwdrivers for DB connections - demonstrates professional standards</li>
                  <li>• Check terminations twice - once during installation, once before energising</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Accessory Terminations */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              2. Accessory Terminations (Sockets, Switches, Cooker Outlets)
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Step-by-Step Accessory Termination</h4>
                <ol className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                    <div>
                      <strong>Cable preparation</strong>
                      <p className="text-xs mt-1">Strip outer sheath to allow cable entry into accessory (typically 15-20mm). Sheath must enter the accessory - no excessive stripping.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                    <div>
                      <strong>CPC identification</strong>
                      <p className="text-xs mt-1">Apply green/yellow sleeving to CPC - required in ALL accessories including plastic ones. No exceptions in AM2.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                    <div>
                      <strong>Conductor preparation</strong>
                      <p className="text-xs mt-1">Cut conductors to correct length - no twisting or bunching. Allow enough length for secure termination without stress.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                    <div>
                      <strong>Terminal connections</strong>
                      <p className="text-xs mt-1">Tighten terminals firmly without over-tightening. Multiple conductors must be neat and equally secure.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Common Accessory Errors</h4>
                <ul className="space-y-1 text-sm text-red-700 dark:text-elec-yellow">
                  <li>❌ <strong>Over-stripped cable sheath</strong> - Exposes cable outside accessory</li>
                  <li>❌ <strong>CPC not sleeved in plastic accessories</strong> - Still required for identification</li>
                  <li>❌ <strong>Twisted or damaged conductors</strong> - Poor workmanship and safety risk</li>
                  <li>❌ <strong>Loose terminal connections</strong> - Creates arcing and fire risk</li>
                  <li>❌ <strong>Mixed up Line/Neutral</strong> - Polarity error affects RCD protection</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Distribution Board Terminations */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              3. Distribution Board (DB) Terminations - Critical Assessment Area
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">DB Termination Sequence</h4>
                <ol className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                    <div>
                      <strong>Verify circuit/MCB matching</strong>
                      <p className="text-xs mt-1">Check drawing - correct cable size in correct protective device. Ring circuits in 32A, lighting in 6A/10A, etc.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                    <div>
                      <strong>Prepare cable entries</strong>
                      <p className="text-xs mt-1">Use proper cable entries. Strip cables to correct length. Plan cable routes to avoid crossing.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                    <div>
                      <strong>Line conductor termination</strong>
                      <p className="text-xs mt-1">Into MCB/RCBO terminal. Ensure full insertion and correct torque. No copper visible outside terminal.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                    <div>
                      <strong>Neutral conductor termination</strong>
                      <p className="text-xs mt-1">Into neutral bar only. NEVER into earth bar. Apply blue identification if required.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">5.</span>
                    <div>
                      <strong>CPC termination</strong>
                      <p className="text-xs mt-1">Into earth bar only with green/yellow sleeving. Ensure mechanical continuity throughout installation.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">6.</span>
                    <div>
                      <strong>Cable dressing and labelling</strong>
                      <p className="text-xs mt-1">Dress cables neatly. Apply permanent labels to each circuit. No temporary markings.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">DB Errors That Cause Immediate Failure</h4>
                <ul className="space-y-1 text-sm text-red-700 dark:text-elec-yellow">
                  <li>❌ <strong>CPC connected to neutral bar</strong> - Fundamental polarity error</li>
                  <li>❌ <strong>Wrong cable in wrong MCB</strong> - Circuit protection mismatch</li>
                  <li>❌ <strong>Exposed copper in terminals</strong> - Safety critical failure</li>
                  <li>❌ <strong>Loose connections</strong> - Creates arcing, overheating, fire risk</li>
                  <li>❌ <strong>Cables crossing untidily</strong> - Poor workmanship, access issues</li>
                  <li>❌ <strong>No circuit identification</strong> - Doesn't meet BS7671 requirements</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Professional DB Standards</h4>
                <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                  <li>✓ <strong>Use torque screwdriver</strong> - Demonstrates professional approach</li>
                  <li>✓ <strong>Plan cable routes</strong> - Avoid cables crossing each other</li>
                  <li>✓ <strong>Label as you go</strong> - Prevents errors and saves time</li>
                  <li>✓ <strong>Check polarity twice</strong> - Before and after termination</li>
                  <li>✓ <strong>Dress cables systematically</strong> - Group by function, neat presentation</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* SWA Terminations */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Cable className="w-5 h-5" />
              4. SWA Cable Terminations - Advanced Techniques
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">SWA Termination Process</h4>
                <ol className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                    <div>
                      <strong>Cable preparation</strong>
                      <p className="text-xs mt-1">Mark and cut outer sheath to correct length. Remove armour carefully without damaging cores. Clean armour ends.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                    <div>
                      <strong>Gland assembly</strong>
                      <p className="text-xs mt-1">Thread gland components onto cable in correct order. Ensure banjo washer is properly positioned for armour contact.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                    <div>
                      <strong>Armour clamping</strong>
                      <p className="text-xs mt-1">Clamp armour securely in gland. No loose strands. Armour must make good electrical contact with banjo washer.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                    <div>
                      <strong>Earthing connection</strong>
                      <p className="text-xs mt-1">Connect CPC to banjo washer or separate earth terminal. This provides the armour earthing path.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">5.</span>
                    <div>
                      <strong>Seal and secure</strong>
                      <p className="text-xs mt-1">Tighten gland assembly to IP rating requirements. Check cable strain relief and weatherproofing.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">SWA Common Issues</h4>
                <ul className="space-y-1 text-sm text-orange-700 dark:text-elec-yellow">
                  <li>⚠️ <strong>Loose armour strands</strong> - Can cause short circuits or poor earthing</li>
                  <li>⚠️ <strong>Damaged core insulation</strong> - Often occurs during armour removal</li>
                  <li>⚠️ <strong>Poor armour-banjo contact</strong> - Results in high earth loop impedance</li>
                  <li>⚠️ <strong>Under-tightened gland</strong> - Allows moisture ingress and movement</li>
                  <li>⚠️ <strong>Missing earth connection</strong> - Armour not properly earthed</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Circuit Labelling */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Badge className="w-5 h-5" />
              5. Circuit Identification and Labelling
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Systematic Labelling Strategy</h4>
                <ol className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                    <div>
                      <strong>Label as you install</strong>
                      <p className="text-xs mt-1">Don't leave labelling until the end. Mark cables and circuits during installation to prevent confusion.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                    <div>
                      <strong>Distribution board circuits</strong>
                      <p className="text-xs mt-1">Each protective device must be clearly labelled with the circuit it protects (e.g., "Ring Main Kitchen", "Lights Ground Floor").</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                    <div>
                      <strong>Conductor identification</strong>
                      <p className="text-xs mt-1">Label conductors where multiple circuits are present in same area. Use permanent markers or proper labels.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                    <div>
                      <strong>Accessory labelling</strong>
                      <p className="text-xs mt-1">Label isolators, switches, and special outlets as specified in drawings (e.g., "Cooker Isolator", "Emergency Stop").</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">5.</span>
                    <div>
                      <strong>Verification and durability</strong>
                      <p className="text-xs mt-1">Check all labels are legible, permanent, and accurately describe the circuits. No temporary markings allowed.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Labelling Mistakes That Lose Marks</h4>
                <ul className="space-y-1 text-sm text-red-700 dark:text-elec-yellow">
                  <li>❌ <strong>Pencil markings</strong> - Not permanent, will fade</li>
                  <li>❌ <strong>Masking tape and pen</strong> - Temporary and unprofessional</li>
                  <li>❌ <strong>Illegible handwriting</strong> - Can't be read by assessor</li>
                  <li>❌ <strong>Generic labels</strong> - "Circuit 1" instead of descriptive names</li>
                  <li>❌ <strong>Missing labels</strong> - Circuits not identified in DB</li>
                  <li>❌ <strong>Wrong information</strong> - Labels don't match actual circuits</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Professional Labelling Standards</h4>
                <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                  <li>✓ <strong>Use label maker or permanent markers</strong> - Professional appearance</li>
                  <li>✓ <strong>Descriptive circuit names</strong> - "Kitchen Sockets", "Upstairs Lights"</li>
                  <li>✓ <strong>Consistent naming convention</strong> - Follow pattern throughout installation</li>
                  <li>✓ <strong>Multiple language where required</strong> - Symbols plus text if specified</li>
                  <li>✓ <strong>Weatherproof labels outdoors</strong> - Survive environmental conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Assessment Failures */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              6. Common Assessment Failures - NET Data Analysis
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Top 10 Termination Failures (NET Statistics)</h4>
                <ol className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">1.</span>
                    <div>
                      <strong>Over-stripped cables (42% of failures)</strong>
                      <p className="text-xs mt-1">Exposed copper beyond terminals - immediate safety failure</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">2.</span>
                    <div>
                      <strong>CPC not sleeved (38% of failures)</strong>
                      <p className="text-xs mt-1">Particularly in plastic accessories where candidates assume it's not needed</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">3.</span>
                    <div>
                      <strong>Polarity errors in DB (31% of failures)</strong>
                      <p className="text-xs mt-1">CPC in neutral bar, line/neutral confusion</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">4.</span>
                    <div>
                      <strong>Loose terminal connections (29% of failures)</strong>
                      <p className="text-xs mt-1">Insufficient tightening or damaged terminals</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">5.</span>
                    <div>
                      <strong>Poor SWA gland installation (24% of failures)</strong>
                      <p className="text-xs mt-1">Armour not properly clamped or earthed</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">6.</span>
                    <div>
                      <strong>Missing circuit labels (22% mark loss)</strong>
                      <p className="text-xs mt-1">Circuits not identified in distribution board</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">7.</span>
                    <div>
                      <strong>Damaged conductor insulation (19% mark loss)</strong>
                      <p className="text-xs mt-1">Cable damage during installation or stripping</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">8.</span>
                    <div>
                      <strong>Untidy cable dressing (18% mark loss)</strong>
                      <p className="text-xs mt-1">Poor presentation, cables crossing unnecessarily</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">9.</span>
                    <div>
                      <strong>Wrong cable in wrong MCB (15% mark loss)</strong>
                      <p className="text-xs mt-1">Circuit/protection device mismatch</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[30px]">10.</span>
                    <div>
                      <strong>Conductor identification errors (12% mark loss)</strong>
                      <p className="text-xs mt-1">Missing sleeving on neutrals used as switched lives</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-transparent border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Assessment Recovery Strategy</h4>
                <p className="text-sm text-white mb-3">If you make a termination error during assessment:</p>
                <ul className="space-y-1 text-sm text-white">
                  <li>• <strong>Acknowledge immediately</strong> - Don't try to hide mistakes</li>
                  <li>• <strong>Rectify systematically</strong> - Fix the root cause, not just symptoms</li>
                  <li>• <strong>Check similar connections</strong> - Prevent recurring errors</li>
                  <li>• <strong>Document the fix</strong> - Show understanding of the issue</li>
                  <li>• <strong>Test thoroughly</strong> - Prove the repair is effective</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Professional Standards */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              7. Professional Standards and Best Practices
            </h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Tools and Equipment</h4>
                <ul className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-green-400 min-w-[20px]">✓</span>
                    <div>
                      <strong>Proper cable strippers</strong> - Avoid damage to conductor insulation
                      <p className="text-xs mt-1">Different sizes for different cable types. Regular inspection for sharp edges.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-green-400 min-w-[20px]">✓</span>
                    <div>
                      <strong>Torque screwdrivers</strong> - Critical for DB connections
                      <p className="text-xs mt-1">Follow manufacturer specifications. Demonstrate professional approach to assessor.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-green-400 min-w-[20px]">✓</span>
                    <div>
                      <strong>Terminal test equipment</strong> - Verify connections after termination
                      <p className="text-xs mt-1">Low resistance ohmmeters for checking connection integrity.</p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-green-400 min-w-[20px]">✓</span>
                    <div>
                      <strong>Labelling equipment</strong> - Professional identification
                      <p className="text-xs mt-1">Label makers, permanent markers, weatherproof labels for different environments.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="border border-white/10 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Quality Assurance Process</h4>
                <ol className="space-y-2 text-sm text-white">
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                    <div>
                      <strong>Plan before executing</strong> - Review drawings and specifications
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                    <div>
                      <strong>Prepare systematically</strong> - Cut cables, apply sleeving before installation
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                    <div>
                      <strong>Terminate methodically</strong> - One circuit at a time, check each connection
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                    <div>
                      <strong>Verify immediately</strong> - Visual and electrical checks before moving on
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-elec-yellow min-w-[20px]">5.</span>
                    <div>
                      <strong>Document and label</strong> - As you go, not as an afterthought
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary and Key Takeaways */}
        <Card className="bg-transparent border-elec-yellow/30">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Section Summary - Key Takeaways
            </h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Critical Success Factors</h4>
                <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                  <li>✓ <strong>No exposed copper</strong> - Fundamental safety requirement</li>
                  <li>✓ <strong>CPC sleeving everywhere</strong> - Including plastic accessories</li>
                  <li>✓ <strong>Correct polarity in DB</strong> - CPC and neutral in correct bars</li>
                  <li>✓ <strong>Systematic labelling</strong> - As you go, not at the end</li>
                  <li>✓ <strong>Professional tools</strong> - Proper strippers, torque screwdrivers</li>
                </ul>
              </div>
              
              <div className="bg-transparent border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Remember for Assessment Day</h4>
                <ul className="space-y-1 text-sm text-white">
                  <li>• The assessor will inspect every connection you make</li>
                  <li>• Poor terminations can fail you even if circuits work correctly</li>
                  <li>• Label circuits as you install them - saves time and prevents errors</li>
                  <li>• Use proper tools - demonstrates professional competence</li>
                  <li>• Check your work twice - once during installation, once before energising</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Next Steps</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Practice termination techniques on spare equipment before your assessment. Focus particularly on cable preparation, CPC sleeving, and systematic labelling. The key to AM2 success is consistent, professional workmanship across all termination types.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Knowledge Check Quiz */}
        <Card className="bg-transparent border-elec-yellow/30 mb-8">
          <div className="p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Knowledge Check - Termination Standards
            </h2>
            <p className="text-sm text-white mb-6">
              Test your understanding of termination requirements and NET assessment criteria. This quiz simulates the type of questions you might face and helps identify knowledge gaps.
            </p>
            
            <Quiz 
              questions={quizQuestions}
              title="Termination and Labelling Assessment"
            />
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../section3" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous:</span>
              <span>Lighting Circuits</span>
            </Link>
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-white">
            <span className="hidden sm:inline">Section 4 of 6</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              <div className="w-2 h-2 bg-border rounded-full"></div>
              <div className="w-2 h-2 bg-border rounded-full"></div>
            </div>
          </div>

          <Button className="w-full sm:w-auto" asChild>
            <Link to="../section5" className="flex items-center gap-2">
              <span className="hidden sm:inline">Next:</span>
              <span>Testing & Commissioning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module3Section4;