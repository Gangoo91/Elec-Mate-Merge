import { AlertTriangle, Clock, BookOpen, Zap, Settings, Wrench, CheckCircle, Target } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module3Section2 = () => {
  useSEO(
    "Power Circuits - Ring, Radial, Cooker, Motor | AM2 Module 3 Section 2",
    "Master power circuit installation for AM2 assessment - ring finals, radials, cooker circuits, and motor controls with professional workmanship standards"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "ring-open-consequence",
      question: "What happens if a ring final circuit is left open (one leg disconnected)?",
      options: [
        "It still works safely as designed",
        "It becomes an unprotected radial circuit",
        "The MCB will trip immediately",
        "Only half the sockets will work"
      ],
      correctIndex: 1,
      explanation: "An open ring becomes a radial circuit but is still protected by a 32A MCB, which exceeds the safe rating for 2.5mm² cable (20A max). This is a major safety issue and automatic fail."
    },
    {
      id: "cooker-workmanship",
      question: "Why do many candidates lose marks on cooker circuits?",
      options: [
        "Using wrong cable size",
        "Incorrect MCB rating",
        "Over-stripping cable sheath leaving bare conductors visible",
        "Poor earth connections"
      ],
      correctIndex: 2,
      explanation: "The most common error is over-stripping the cable sheath, leaving bare conductors visible at the outlet plate. The sheath must enter the accessory to maintain protection."
    },
    {
      id: "swa-gland-check",
      question: "What does the assessor specifically check at an SWA gland?",
      options: [
        "Cable entry angle only",
        "Gland tightness only",
        "Mechanical strength and earth continuity",
        "Cable identification"
      ],
      correctIndex: 2,
      explanation: "The assessor checks both mechanical strength (proper gland tightening) and earth continuity through the SWA armour to ensure both physical and electrical protection."
    },
    {
      id: "safety-vs-neatness",
      question: "In AM2 assessment, which is worse - messy work or unsafe work?",
      options: [
        "Both are equally bad",
        "Messy work - it shows poor professionalism",
        "Unsafe work - messy loses marks, unsafe means fail",
        "Neither affects the result"
      ],
      correctIndex: 2,
      explanation: "Unsafe work results in immediate failure regardless of other factors. Messy work loses marks but doesn't automatically fail the assessment. Safety is always the priority."
    },
    {
      id: "testing-requirement",
      question: "Can you energise a power circuit before completing all required tests?",
      options: [
        "Yes, if continuity is confirmed",
        "Yes, for basic function testing",
        "No - that's unsafe and results in failure",
        "Only with assessor permission"
      ],
      correctIndex: 2,
      explanation: "All required tests (continuity, polarity, insulation resistance, loop impedance) must be completed before energisation. Energising untested circuits is unsafe practice and results in immediate failure."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What cable size is typically specified for a ring final circuit in AM2?",
      options: ["1.5mm²", "2.5mm²", "4mm²", "6mm²"],
      correctAnswer: 1,
      explanation: "Ring final circuits typically use 2.5mm² twin & earth cable with a 32A MCB protection."
    },
    {
      id: 2,
      question: "What's the consequence of leaving one leg disconnected in a ring final?",
      options: [
        "Circuit works normally",
        "Half the sockets stop working",
        "It becomes an unprotected radial circuit",
        "The RCD will trip"
      ],
      correctAnswer: 2,
      explanation: "A disconnected ring becomes a radial circuit still protected by 32A, exceeding the 20A safe rating for 2.5mm² cable."
    },
    {
      id: 3,
      question: "Which protective device rating is typically used for a cooker circuit?",
      options: ["20A MCB", "32A MCB", "32-40A MCB", "50A MCB"],
      correctAnswer: 2,
      explanation: "Cooker circuits typically use 32-40A MCB depending on the cooker load and cable size specified."
    },
    {
      id: 4,
      question: "Why must the cable sheath enter the cooker outlet plate?",
      options: [
        "For better appearance",
        "To prevent moisture entry",
        "To protect bare conductors from damage",
        "To meet cable bend radius requirements"
      ],
      correctAnswer: 2,
      explanation: "The sheath must enter the outlet plate to ensure no bare conductors are visible and maintain mechanical protection."
    },
    {
      id: 5,
      question: "What device must be correctly set in a motor circuit?",
      options: ["Timer relay", "Contactor", "Overload protection", "Phase monitor"],
      correctAnswer: 2,
      explanation: "The overload protection device must be set correctly for the motor's full load current to provide proper protection."
    },
    {
      id: 6,
      question: "What's the purpose of a banjo washer in SWA glanding?",
      options: [
        "Weatherproofing",
        "Cable strain relief",
        "Earth continuity connection",
        "Cable identification"
      ],
      correctAnswer: 2,
      explanation: "The banjo washer provides earth continuity between the SWA armour and the equipment earth terminal."
    },
    {
      id: 7,
      question: "True or false: You must calculate cable sizes in AM2.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. In AM2, you follow the specification exactly as given - no calculations are required or expected."
    },
    {
      id: 8,
      question: "What's the difference between a radial and a broken ring?",
      options: [
        "No difference in function",
        "Radial is designed as one-way feed, broken ring is faulty two-way feed",
        "Radial uses smaller cable",
        "Broken ring has lower impedance"
      ],
      correctAnswer: 1,
      explanation: "A radial is designed as a one-way feed with appropriate protection. A broken ring is a fault condition where a two-way circuit becomes one-way but retains inappropriate protection."
    },
    {
      id: 9,
      question: "Give an example of poor workmanship in power circuits.",
      options: [
        "Using correct cable size",
        "Over-tightening terminals damaging insulation",
        "Following the specification exactly",
        "Completing all required tests"
      ],
      correctAnswer: 1,
      explanation: "Over-tightening terminals can damage cable insulation, creating safety hazards and demonstrating poor workmanship."
    },
    {
      id: 10,
      question: "What happens if you energise before completing all required tests?",
      options: [
        "Minor marks deduction",
        "Warning from assessor",
        "Immediate failure for unsafe practice",
        "No consequence if circuit works"
      ],
      correctAnswer: 2,
      explanation: "Energising circuits before completing all required tests is unsafe practice and results in immediate failure."
    },
    {
      id: 11,
      question: "Which test confirms ring circuit integrity?",
      options: [
        "Insulation resistance only",
        "End-to-end continuity of all conductors",
        "Loop impedance only",
        "Polarity check only"
      ],
      correctAnswer: 1,
      explanation: "End-to-end continuity testing of line, neutral, and CPC conductors confirms the ring is complete and unbroken."
    },
    {
      id: 12,
      question: "What must be done to CPCs in all power circuits?",
      options: [
        "Twisted together",
        "Left bare",
        "Sleeved and properly connected",
        "Painted for identification"
      ],
      correctAnswer: 2,
      explanation: "All CPCs must be sleeved with green/yellow sleeving and properly connected to maintain earth continuity and meet standards."
    }
  ];

  const learningOutcomes = [
    "Install ring, radial, cooker, and motor circuits as per AM2 drawings and specifications",
    "Terminate cables neatly, with CPCs correctly sleeved and connected",
    "Carry out required tests before energisation according to NET standards",
    "Recognise common candidate errors in each type of circuit",
    "Apply strategies to work efficiently under time pressure without sacrificing safety",
    "Understand what the assessor is checking for in each circuit type"
  ];

  return (
    <AM2SectionLayout
      backHref=".."
      breadcrumbs={[
        { label: "AM2", href: "/apprentice-courses/am2" },
        { label: "Module 3", href: "/apprentice-courses/am2/module3" },
        { label: "Section 2" }
      ]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Zap}
        title="Power Circuits - Ring, Radial, Cooker, Motor"
        description="Master power circuit installation for AM2 assessment - ring finals, radials, cooker circuits, and motor controls with professional workmanship standards."
        badge="Module 3 - Section 2"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning
        title="Critical Assessment Area"
        message="Power circuits are where most AM2 candidates lose marks or fail. You must demonstrate not just technical knowledge but competent, safe, and workmanlike installation. The assessor watches for accuracy to specification, safe practices, and professional workmanship. Incorrect cable selection, incomplete testing, or poor workmanship will result in failure."
      />

      {/* Learning Outcomes */}
      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* Ring Final Circuit */}
      <AM2ContentCard
        title="1. Ring Final Circuit"
        icon={Zap}
        accent
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div>
            <h3 className="font-medium text-white/90 mb-2">Typical Specification</h3>
            <p>2.5mm² twin & earth cable, 32A MCB protection. Must form a complete closed loop.</p>
          </div>

          <div>
            <h3 className="font-medium text-white/90 mb-2">Critical Testing Requirements</h3>
            <ul className="space-y-1 text-white/70">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                End-to-end continuity (Line, Neutral, CPC)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Cross connections for r1 + rn and r1 + r2
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Polarity checks at all outlets
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Insulation resistance between conductors
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white/90 mb-2">Assessor Focus Points</h3>
            <ul className="space-y-1 text-white/70">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Ring continuity completely intact
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                All terminations correct and secure
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                CPCs sleeved with green/yellow and properly connected
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Socket outlets installed level and to drawing heights
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                No "broken ring" scenarios
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[0]} />

      {/* Radial Circuit */}
      <AM2ContentCard
        title="2. Radial Circuit"
        icon={Target}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div>
            <h3 className="font-medium text-white/90 mb-2">Typical Specifications</h3>
            <ul className="space-y-1 text-white/70">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                2.5mm² on 20A MCB for standard loads
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                4mm² on 32A MCB for higher loads
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Simple end-to-end wiring, no loop back to origin
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white/90 mb-2">Assessor Focus Points</h3>
            <ul className="space-y-1 text-white/70">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Correct cable size as specified on drawings
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Neat terminations at final point
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Protective device rating matches specification
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                No exposed copper or over-stripped insulation
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Clear marking where radial terminates
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Cooker Circuit */}
      <AM2ContentCard
        title="3. Cooker Circuit"
        icon={Settings}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div>
            <h3 className="font-medium text-white/90 mb-2">Typical Specification</h3>
            <p>6mm² twin & earth cable, 32-40A MCB, connected through cooker control unit and outlet plate.</p>
          </div>

          <div>
            <h3 className="font-medium text-white/90 mb-2">Assessor Focus Points</h3>
            <ul className="space-y-1 text-white/70">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Correct cable size as per specification
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Secure terminations (large conductors need proper clamping)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Cable sheath enters accessory - no bare conductors visible
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                CPC properly sleeved and connected
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Control unit and outlet plate correctly wired
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-amber-500/30 rounded-xl p-4">
            <p className="text-sm text-white/80">
              <strong className="text-amber-400">Common Error:</strong> Over-stripping cable sheath leaving bare conductors visible at outlet plate. This is the most frequent reason for losing marks on cooker circuits.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[1]} />

      {/* Motor Circuit */}
      <AM2ContentCard
        title="4. Motor Circuit"
        icon={Wrench}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div>
            <h3 className="font-medium text-white/90 mb-2">Typical Configuration</h3>
            <p>Usually wired in SWA or flex, feeding a DOL (Direct-On-Line) starter. May include start/stop control circuit.</p>
          </div>

          <div>
            <h3 className="font-medium text-white/90 mb-2">Assessor Focus Points</h3>
            <ul className="space-y-1 text-white/70">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Correct SWA gland termination with earth continuity
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Proper polarity at starter and motor terminals
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Overload protection device set appropriately for motor FLC
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Start/stop controls wired correctly and functional
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Banjo washer fitted for earth continuity
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Cable gland mechanically secure
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-elec-yellow/30 rounded-xl p-4">
            <p className="text-sm text-white/80">
              <strong className="text-elec-yellow">Professional Tip:</strong> Practice SWA glanding until it's second nature. Use a checklist: gland tight, banjo fitted, earth continuous, cable strain relief adequate.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[2]} />

      {/* General Assessor Expectations */}
      <AM2ContentCard
        title="5. General Assessor Expectations (All Power Circuits)"
        icon={CheckCircle}
      >
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white/80">
          <div>
            <h3 className="font-medium text-white/90 mb-3">Technical Requirements</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span><strong className="text-white/90">Specification compliance:</strong> Cable sizes, routes, protective devices exactly as shown</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span><strong className="text-white/90">Safety:</strong> CPC sleeved and connected, no exposed copper</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span><strong className="text-white/90">Testing:</strong> All tests completed before energisation</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white/90 mb-3">Workmanship Standards</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span><strong className="text-white/90">Installation quality:</strong> Straight runs, level accessories, neat terminations</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span><strong className="text-white/90">Professional finish:</strong> Conduits/trunking aligned, cables not twisted</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span><strong className="text-white/90">Protection integrity:</strong> No damage to cable insulation</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Common Candidate Errors */}
      <AM2ContentCard
        title="6. Common Candidate Errors (NET Guidance)"
        icon={AlertTriangle}
      >
        <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="space-y-3">
            <div className="p-3 bg-white/5 border border-red-500/30 rounded-xl">
              <h4 className="font-medium text-red-400 text-sm">Critical Errors (Fail)</h4>
              <ul className="text-sm text-white/80 mt-2 space-y-1">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  Wrong cable size installed
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  Ring finals left open (broken)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  CPC unsleeved or not terminated
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  Energising before testing complete
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-white/5 border border-amber-500/30 rounded-xl">
              <h4 className="font-medium text-amber-400 text-sm">Workmanship Issues (Marks Lost)</h4>
              <ul className="text-sm text-white/80 mt-2 space-y-1">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  Cooker cable sheath not fully enclosed
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  Poor SWA glanding technique
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  Over-tightened terminals damaging insulation
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  Motor overload not set correctly
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[3]} />

      {/* Practical Guidance */}
      <AM2ContentCard
        title="7. Practical Guidance"
        icon={Clock}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div>
            <h3 className="font-medium text-white/90 mb-2">Time Management Strategies</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span><strong className="text-white/90">Ring circuits:</strong> Lay out both ends before terminating to ensure continuity</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span><strong className="text-white/90">Radials:</strong> Mark clearly where the circuit ends to avoid confusion</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span><strong className="text-white/90">Cooker circuits:</strong> Pre-shape large cables before termination</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span><strong className="text-white/90">Motors:</strong> Have SWA glanding checklist ready</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white/90 mb-2">Professional Techniques</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Record test results as you perform them - don't leave until the end
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Treat every installation as show home quality
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Double-check ring continuity before final termination
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Use appropriate tools for large cable termination
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Real-World Examples */}
      <AM2ContentCard
        title="8. Real-World Examples"
        icon={BookOpen}
      >
        <div className="grid gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white/5 border border-red-500/30 rounded-xl">
            <h4 className="font-medium text-red-400 mb-2">Example 1: Ring Final Failure</h4>
            <p className="text-white/80">Candidate installed ring final but left one leg disconnected in consumer unit. Failed continuity test - section fail. Always verify complete loop before termination.</p>
          </div>

          <div className="p-4 bg-white/5 border border-red-500/30 rounded-xl">
            <h4 className="font-medium text-red-400 mb-2">Example 2: Cooker Circuit Workmanship</h4>
            <p className="text-white/80">Cooker circuit wired with sheath stripped back too far. Exposed cable insulation visible at outlet plate = significant marks lost for poor workmanship.</p>
          </div>

          <div className="p-4 bg-white/5 border border-amber-500/30 rounded-xl">
            <h4 className="font-medium text-amber-400 mb-2">Example 3: Motor Circuit Incomplete</h4>
            <p className="text-white/80">Motor circuit wired correctly but overload protection not set for motor FLC. Assessor flagged incomplete installation - lost marks for attention to detail.</p>
          </div>

          <div className="p-4 bg-white/5 border border-amber-500/30 rounded-xl">
            <h4 className="font-medium text-amber-400 mb-2">Example 4: Terminal Damage</h4>
            <p className="text-white/80">Candidate over-tightened terminals on 6mm² cooker cable, crushing insulation. Lost significant workmanship marks for poor technique.</p>
          </div>
        </div>
      </AM2ContentCard>

      {/* FAQ Section */}
      <AM2ContentCard
        title="9. Frequently Asked Questions"
        icon={BookOpen}
      >
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <div>
            <h3 className="font-medium text-white/90 mb-2">Q1: Do I need to calculate cable sizes in AM2?</h3>
            <p>No - follow the AM2 specification exactly as provided. No calculations are required or expected.</p>
          </div>

          <div>
            <h3 className="font-medium text-white/90 mb-2">Q2: Will the assessor open socket outlets and accessories?</h3>
            <p>Yes - expect sample inspections of terminations, so ensure all connections are neat and secure.</p>
          </div>

          <div>
            <h3 className="font-medium text-white/90 mb-2">Q3: Can I energise a circuit before completing all tests?</h3>
            <p>No - that's unsafe practice and results in immediate failure. All tests must be completed first.</p>
          </div>

          <div>
            <h3 className="font-medium text-white/90 mb-2">Q4: What if I accidentally damage cable insulation?</h3>
            <p>Replace the cable section - tape repairs are not acceptable and will result in failure.</p>
          </div>

          <div>
            <h3 className="font-medium text-white/90 mb-2">Q5: How important is neatness compared to correctness?</h3>
            <p>Both matter significantly: correctness is essential for safety, neatness is heavily marked for professionalism.</p>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck {...quickCheckQuestions[4]} />

      {/* Summary */}
      <AM2ContentCard
        title="10. Summary"
        icon={CheckCircle}
        accent
      >
        <div className="space-y-4 text-sm text-white/80">
          <p>
            In AM2, power circuits must be installed to specification, neatly, and safely. Assessors check:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <span><strong className="text-white/90">Technical accuracy:</strong> Ring continuity, correct radial wiring, proper cooker cable termination</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <span><strong className="text-white/90">Motor circuits:</strong> Overloads set correctly, SWA glanded properly with earth continuity</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <span><strong className="text-white/90">Professional standards:</strong> CPCs sleeved, terminations secure, accessories level</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <span><strong className="text-white/90">Safety compliance:</strong> No unsafe shortcuts, circuits tested fully before energisation</span>
            </li>
          </ul>
          <div className="bg-white/5 border border-green-500/30 rounded-xl p-3 mt-4">
            <p className="font-semibold text-green-400">
              Remember: Unsafe = Fail | Untidy = Marks Lost | Accurate + Neat + Safe = Pass
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz questions={quizQuestions} title="Power Circuits Assessment Quiz" />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        previousHref="../section1"
        previousLabel="Cable Selection & Containment"
        nextHref="../section3"
        nextLabel="Lighting Circuits"
        currentSection={2}
        totalSections={6}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module3Section2;
