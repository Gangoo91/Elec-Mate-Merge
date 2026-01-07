import { Settings, Cable, CheckCircle, AlertTriangle, Target, Wrench, Zap, Terminal, BookOpen } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
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

  const learningOutcomes = [
    "Execute professional terminations meeting BS7671 Section 526 requirements",
    "Apply correct CPC sleeving and conductor identification in all situations",
    "Master SWA cable gland installation and armour earthing techniques",
    "Implement systematic labelling strategies for circuit identification",
    "Avoid the critical errors that cause 70% of AM2 termination failures",
    "Understand NET assessment criteria and assessor expectations"
  ];

  return (
    <AM2SectionLayout
      backHref=".."
      breadcrumbs={[
        { label: "AM2", href: "/apprentice-courses/am2" },
        { label: "Module 3", href: "/apprentice-courses/am2/module3" },
        { label: "Section 4" }
      ]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Terminal}
        title="Termination, Connections, and Circuit Labelling"
        description="Professional workmanship standards and NET compliance requirements for AM2 assessment - master terminations, connections and labelling for assessment success."
        badge="Module 3 - Section 4"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning
        title="CRITICAL: Terminations Determine AM2 Success or Failure"
        message="Poor terminations are the #1 cause of AM2 failures. Even if your circuits work perfectly, exposed copper, loose connections, or missing labels will fail you. The assessor opens every accessory, checks every connection, and examines every label. There are no second chances. Perfect terminations require systematic preparation, correct tools, and understanding of NET standards. Rush this section and you risk everything."
      />

      {/* Learning Outcomes */}
      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* NET Assessment Criteria */}
      <AM2ContentCard
        title="NET Assessment Criteria - What Assessors Check"
        icon={Target}
        accent
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Primary Assessment Areas (Pass/Fail)</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-medium text-red-400 min-w-[20px]">X</span>
                <div>
                  <strong className="text-white/90">Exposed copper beyond terminals</strong> - Immediate fail
                  <p className="text-xs mt-1 text-white/70">Any visible copper creates shock/short circuit risk</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-red-400 min-w-[20px]">X</span>
                <div>
                  <strong className="text-white/90">CPC not sleeved or connected</strong> - Safety critical failure
                  <p className="text-xs mt-1 text-white/70">Required everywhere, including plastic accessories</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-red-400 min-w-[20px]">X</span>
                <div>
                  <strong className="text-white/90">Loose or insecure connections</strong> - Fire/safety risk
                  <p className="text-xs mt-1 text-white/70">Must be mechanically and electrically sound</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-red-400 min-w-[20px]">X</span>
                <div>
                  <strong className="text-white/90">Incorrect polarity in DB</strong> - Fundamental error
                  <p className="text-xs mt-1 text-white/70">CPC to neutral bar = automatic fail</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Secondary Assessment (Marks Deduction)</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-medium text-amber-400 min-w-[20px]">!</span>
                <div>
                  <strong className="text-white/90">Poor cable preparation/stripping</strong> - Workmanship marks
                  <p className="text-xs mt-1 text-white/70">Nicked insulation, incorrect strip lengths</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-amber-400 min-w-[20px]">!</span>
                <div>
                  <strong className="text-white/90">Untidy cable dressing</strong> - Professional standards
                  <p className="text-xs mt-1 text-white/70">Cables crossing, poor routing, excessive length</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-amber-400 min-w-[20px]">!</span>
                <div>
                  <strong className="text-white/90">Missing or poor labelling</strong> - Identification requirements
                  <p className="text-xs mt-1 text-white/70">Pencil marks, temporary labels, illegible text</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-amber-400 min-w-[20px]">!</span>
                <div>
                  <strong className="text-white/90">Conductor damage during installation</strong> - Care and skill
                  <p className="text-xs mt-1 text-white/70">Damaged insulation, kinked conductors</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* General Termination Standards */}
      <AM2ContentCard
        title="1. General Termination Standards (BS 7671, Section 526)"
        icon={Terminal}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Core Requirements - Non-Negotiable</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">Y</span>
                <div>
                  <strong className="text-white/90">Conductors electrically and mechanically sound</strong>
                  <p className="text-xs mt-1 text-white/70">Secure connections that won't work loose over time</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">Y</span>
                <div>
                  <strong className="text-white/90">No bare copper visible outside terminals</strong>
                  <p className="text-xs mt-1 text-white/70">Critical safety requirement - prevents shock and short circuits</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">Y</span>
                <div>
                  <strong className="text-white/90">Insulation runs up to terminal</strong>
                  <p className="text-xs mt-1 text-white/70">Proper cable preparation with correct strip lengths</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">Y</span>
                <div>
                  <strong className="text-white/90">CPC sleeving correctly applied</strong>
                  <p className="text-xs mt-1 text-white/70">Green/yellow identification on all CPC conductors</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">Y</span>
                <div>
                  <strong className="text-white/90">Correct torque values applied</strong>
                  <p className="text-xs mt-1 text-white/70">Manufacturer specifications met for critical connections</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-elec-yellow/30 rounded-xl p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Professional Tips</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Strip cables using proper strippers - avoid damaging conductor insulation
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Cut conductors to exact length - no bunching or excessive length in terminals
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Use torque screwdrivers for DB connections - demonstrates professional standards
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Check terminations twice - once during installation, once before energising
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[0]} />

      {/* Accessory Terminations */}
      <AM2ContentCard
        title="2. Accessory Terminations (Sockets, Switches, Cooker Outlets)"
        icon={Zap}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Step-by-Step Accessory Termination</h4>
            <ol className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                <div>
                  <strong className="text-white/90">Cable preparation</strong>
                  <p className="text-xs mt-1 text-white/70">Strip outer sheath to allow cable entry into accessory (typically 15-20mm). Sheath must enter the accessory - no excessive stripping.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                <div>
                  <strong className="text-white/90">CPC identification</strong>
                  <p className="text-xs mt-1 text-white/70">Apply green/yellow sleeving to CPC - required in ALL accessories including plastic ones. No exceptions in AM2.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                <div>
                  <strong className="text-white/90">Conductor preparation</strong>
                  <p className="text-xs mt-1 text-white/70">Cut conductors to correct length - no twisting or bunching. Allow enough length for secure termination without stress.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                <div>
                  <strong className="text-white/90">Terminal connections</strong>
                  <p className="text-xs mt-1 text-white/70">Tighten terminals firmly without over-tightening. Multiple conductors must be neat and equally secure.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
            <h4 className="font-medium text-red-400 mb-2">Common Accessory Errors</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li><strong className="text-red-400">Over-stripped cable sheath</strong> - Exposes cable outside accessory</li>
              <li><strong className="text-red-400">CPC not sleeved in plastic accessories</strong> - Still required for identification</li>
              <li><strong className="text-red-400">Twisted or damaged conductors</strong> - Poor workmanship and safety risk</li>
              <li><strong className="text-red-400">Loose terminal connections</strong> - Creates arcing and fire risk</li>
              <li><strong className="text-red-400">Mixed up Line/Neutral</strong> - Polarity error affects RCD protection</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Distribution Board Terminations */}
      <AM2ContentCard
        title="3. Distribution Board (DB) Terminations - Critical Assessment Area"
        icon={Wrench}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">DB Termination Sequence</h4>
            <ol className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                <div>
                  <strong className="text-white/90">Verify circuit/MCB matching</strong>
                  <p className="text-xs mt-1 text-white/70">Check drawing - correct cable size in correct protective device. Ring circuits in 32A, lighting in 6A/10A, etc.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                <div>
                  <strong className="text-white/90">Prepare cable entries</strong>
                  <p className="text-xs mt-1 text-white/70">Use proper cable entries. Strip cables to correct length. Plan cable routes to avoid crossing.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                <div>
                  <strong className="text-white/90">Line conductor termination</strong>
                  <p className="text-xs mt-1 text-white/70">Into MCB/RCBO terminal. Ensure full insertion and correct torque. No copper visible outside terminal.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                <div>
                  <strong className="text-white/90">Neutral conductor termination</strong>
                  <p className="text-xs mt-1 text-white/70">Into neutral bar only. NEVER into earth bar. Apply blue identification if required.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">5.</span>
                <div>
                  <strong className="text-white/90">CPC termination</strong>
                  <p className="text-xs mt-1 text-white/70">Into earth bar only with green/yellow sleeving. Ensure mechanical continuity throughout installation.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">6.</span>
                <div>
                  <strong className="text-white/90">Cable dressing and labelling</strong>
                  <p className="text-xs mt-1 text-white/70">Dress cables neatly. Apply permanent labels to each circuit. No temporary markings.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
            <h4 className="font-medium text-red-400 mb-2">DB Errors That Cause Immediate Failure</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li><strong className="text-red-400">CPC connected to neutral bar</strong> - Fundamental polarity error</li>
              <li><strong className="text-red-400">Wrong cable in wrong MCB</strong> - Circuit protection mismatch</li>
              <li><strong className="text-red-400">Exposed copper in terminals</strong> - Safety critical failure</li>
              <li><strong className="text-red-400">Loose connections</strong> - Creates arcing, overheating, fire risk</li>
              <li><strong className="text-red-400">Cables crossing untidily</strong> - Poor workmanship, access issues</li>
              <li><strong className="text-red-400">No circuit identification</strong> - Doesn't meet BS7671 requirements</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="font-medium text-green-400 mb-2">Professional DB Standards</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li><strong className="text-green-400">Use torque screwdriver</strong> - Demonstrates professional approach</li>
              <li><strong className="text-green-400">Plan cable routes</strong> - Avoid cables crossing each other</li>
              <li><strong className="text-green-400">Label as you go</strong> - Prevents errors and saves time</li>
              <li><strong className="text-green-400">Check polarity twice</strong> - Before and after termination</li>
              <li><strong className="text-green-400">Dress cables systematically</strong> - Group by function, neat presentation</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[1]} />

      {/* SWA Terminations */}
      <AM2ContentCard
        title="4. SWA Cable Terminations - Advanced Techniques"
        icon={Cable}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">SWA Termination Process</h4>
            <ol className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                <div>
                  <strong className="text-white/90">Cable preparation</strong>
                  <p className="text-xs mt-1 text-white/70">Mark and cut outer sheath to correct length. Remove armour carefully without damaging cores. Clean armour ends.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                <div>
                  <strong className="text-white/90">Gland assembly</strong>
                  <p className="text-xs mt-1 text-white/70">Thread gland components onto cable in correct order. Ensure banjo washer is properly positioned for armour contact.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                <div>
                  <strong className="text-white/90">Armour clamping</strong>
                  <p className="text-xs mt-1 text-white/70">Clamp armour securely in gland. No loose strands. Armour must make good electrical contact with banjo washer.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                <div>
                  <strong className="text-white/90">Earthing connection</strong>
                  <p className="text-xs mt-1 text-white/70">Connect CPC to banjo washer or separate earth terminal. This provides the armour earthing path.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">5.</span>
                <div>
                  <strong className="text-white/90">Seal and secure</strong>
                  <p className="text-xs mt-1 text-white/70">Tighten gland assembly to IP rating requirements. Check cable strain relief and weatherproofing.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-white/5 border border-amber-500/30 rounded-xl p-4">
            <h4 className="font-medium text-amber-400 mb-2">SWA Common Issues</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li><strong className="text-amber-400">Loose armour strands</strong> - Can cause short circuits or poor earthing</li>
              <li><strong className="text-amber-400">Damaged core insulation</strong> - Often occurs during armour removal</li>
              <li><strong className="text-amber-400">Poor armour-banjo contact</strong> - Results in high earth loop impedance</li>
              <li><strong className="text-amber-400">Under-tightened gland</strong> - Allows moisture ingress and movement</li>
              <li><strong className="text-amber-400">Missing earth connection</strong> - Armour not properly earthed</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[2]} />

      {/* Circuit Labelling */}
      <AM2ContentCard
        title="5. Circuit Identification and Labelling"
        icon={BookOpen}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Systematic Labelling Strategy</h4>
            <ol className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                <div>
                  <strong className="text-white/90">Label as you install</strong>
                  <p className="text-xs mt-1 text-white/70">Don't leave labelling until the end. Mark cables and circuits during installation to prevent confusion.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                <div>
                  <strong className="text-white/90">Distribution board circuits</strong>
                  <p className="text-xs mt-1 text-white/70">Each protective device must be clearly labelled with the circuit it protects (e.g., "Ring Main Kitchen", "Lights Ground Floor").</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                <div>
                  <strong className="text-white/90">Conductor identification</strong>
                  <p className="text-xs mt-1 text-white/70">Label conductors where multiple circuits are present in same area. Use permanent markers or proper labels.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                <div>
                  <strong className="text-white/90">Accessory labelling</strong>
                  <p className="text-xs mt-1 text-white/70">Label isolators, switches, and special outlets as specified in drawings (e.g., "Cooker Isolator", "Emergency Stop").</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">5.</span>
                <div>
                  <strong className="text-white/90">Verification and durability</strong>
                  <p className="text-xs mt-1 text-white/70">Check all labels are legible, permanent, and accurately describe the circuits. No temporary markings allowed.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
            <h4 className="font-medium text-red-400 mb-2">Labelling Mistakes That Lose Marks</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li><strong className="text-red-400">Pencil markings</strong> - Not permanent, will fade</li>
              <li><strong className="text-red-400">Masking tape and pen</strong> - Temporary and unprofessional</li>
              <li><strong className="text-red-400">Illegible handwriting</strong> - Can't be read by assessor</li>
              <li><strong className="text-red-400">Generic labels</strong> - "Circuit 1" instead of descriptive names</li>
              <li><strong className="text-red-400">Missing labels</strong> - Circuits not identified in DB</li>
              <li><strong className="text-red-400">Wrong information</strong> - Labels don't match actual circuits</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="font-medium text-green-400 mb-2">Professional Labelling Standards</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li><strong className="text-green-400">Use label maker or permanent markers</strong> - Professional appearance</li>
              <li><strong className="text-green-400">Descriptive circuit names</strong> - "Kitchen Sockets", "Upstairs Lights"</li>
              <li><strong className="text-green-400">Consistent naming convention</strong> - Follow pattern throughout installation</li>
              <li><strong className="text-green-400">Multiple language where required</strong> - Symbols plus text if specified</li>
              <li><strong className="text-green-400">Weatherproof labels outdoors</strong> - Survive environmental conditions</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Common Assessment Failures */}
      <AM2ContentCard
        title="6. Common Assessment Failures - NET Data Analysis"
        icon={AlertTriangle}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Top 10 Termination Failures (NET Statistics)</h4>
            <ol className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[30px]">1.</span>
                <div>
                  <strong className="text-white/90">Over-stripped cables (42% of failures)</strong>
                  <p className="text-xs mt-1 text-white/70">Exposed copper beyond terminals - immediate safety failure</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[30px]">2.</span>
                <div>
                  <strong className="text-white/90">CPC not sleeved (38% of failures)</strong>
                  <p className="text-xs mt-1 text-white/70">Particularly in plastic accessories where candidates assume it's not needed</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[30px]">3.</span>
                <div>
                  <strong className="text-white/90">Polarity errors in DB (31% of failures)</strong>
                  <p className="text-xs mt-1 text-white/70">CPC in neutral bar, line/neutral confusion</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[30px]">4.</span>
                <div>
                  <strong className="text-white/90">Loose terminal connections (29% of failures)</strong>
                  <p className="text-xs mt-1 text-white/70">Insufficient tightening or damaged terminals</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[30px]">5.</span>
                <div>
                  <strong className="text-white/90">Poor SWA gland installation (24% of failures)</strong>
                  <p className="text-xs mt-1 text-white/70">Armour not properly clamped or earthed</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-white/5 border border-elec-yellow/30 rounded-xl p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Assessment Recovery Strategy</h4>
            <p className="text-sm text-white/80 mb-3">If you make a termination error during assessment:</p>
            <ul className="space-y-1 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <strong className="text-white/90">Acknowledge immediately</strong> - Don't try to hide mistakes
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <strong className="text-white/90">Rectify systematically</strong> - Fix the root cause, not just symptoms
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <strong className="text-white/90">Check similar connections</strong> - Prevent recurring errors
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <strong className="text-white/90">Document the fix</strong> - Show understanding of the issue
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <strong className="text-white/90">Test thoroughly</strong> - Prove the repair is effective
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary and Key Takeaways */}
      <AM2ContentCard
        title="Section Summary - Key Takeaways"
        icon={CheckCircle}
        accent
      >
        <div className="space-y-4 text-sm text-white/80">
          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="font-medium text-green-400 mb-2">Critical Success Factors</h4>
            <ul className="space-y-1">
              <li><strong className="text-green-400">No exposed copper</strong> - Fundamental safety requirement</li>
              <li><strong className="text-green-400">CPC sleeving everywhere</strong> - Including plastic accessories</li>
              <li><strong className="text-green-400">Correct polarity in DB</strong> - CPC and neutral in correct bars</li>
              <li><strong className="text-green-400">Systematic labelling</strong> - As you go, not at the end</li>
              <li><strong className="text-green-400">Professional tools</strong> - Proper strippers, torque screwdrivers</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-elec-yellow/30 rounded-xl p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Remember for Assessment Day</h4>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                The assessor will inspect every connection you make
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Poor terminations can fail you even if circuits work correctly
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Label circuits as you install them - saves time and prevents errors
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Use proper tools - demonstrates professional competence
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Check your work twice - once during installation, once before energising
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Knowledge Check Quiz */}
      <Quiz
        questions={quizQuestions}
        title="Termination and Labelling Assessment"
      />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        previousHref="../section3"
        previousLabel="Lighting Circuits"
        nextHref="../section5"
        nextLabel="Accuracy & Neatness"
        currentSection={4}
        totalSections={6}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module3Section4;
