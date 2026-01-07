import { Ruler, CheckCircle, AlertTriangle, Target, Settings, BookOpen, Square, Wrench } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";

const AM2Module3Section5 = () => {
  useSEO(
    "Accuracy, Neatness, and Compliance with BS 7671 | AM2 Module 3 Section 5",
    "Professional workmanship standards, accuracy requirements and NET compliance for AM2 assessment success"
  );

  const learningOutcomes = [
    "Define \"workmanlike standard\" under BS 7671 and apply it consistently",
    "Install accessories, containment, and wiring to accurate dimensions per specification",
    "Apply neat and consistent workmanship across all circuits and components",
    "Identify common presentation faults that cost marks in NET assessments",
    "Self-inspect your work using the same criteria as NET assessors",
    "Understand how workmanship standards translate to real-world electrical work"
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "specification-accuracy",
      question: "If you install sockets 50mm higher than the spec drawing, what happens?",
      options: [
        "It's acceptable as long as it's safe",
        "Marks lost - not to specification",
        "Only matters if assessor notices",
        "Minor deviation is allowed"
      ],
      correctIndex: 1,
      explanation: "Marks lost - installations must match drawings exactly. Even safe deviations from specification result in lost marks."
    },
    {
      id: "bs7671-connections",
      question: "Which BS 7671 regulation requires all connections to be electrically and mechanically sound?",
      options: [
        "Regulation 134.1.1",
        "Regulation 526",
        "Regulation 522",
        "Regulation 559"
      ],
      correctIndex: 1,
      explanation: "Regulation 526 covers joints and connections, requiring them to be both electrically and mechanically sound."
    },
    {
      id: "bare-copper-safety",
      question: "If the assessor sees bare copper at a socket terminal, what happens?",
      options: [
        "Minor mark deduction only",
        "Work marked unsafe - significant marks lost",
        "Warning given to fix it",
        "No impact if connection is secure"
      ],
      correctIndex: 1,
      explanation: "Work marked unsafe with significant marks lost, possibly leading to failure. No bare copper is acceptable at any termination."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Which BS 7671 regulation defines 'workmanlike' standards?",
      options: ["Regulation 134.1.1", "Regulation 526", "Regulation 522", "Regulation 411"],
      correctAnswer: 0,
      explanation: "Regulation 134.1.1 requires electrical work to be completed in a 'proper and workmanlike manner'."
    },
    {
      id: 2,
      question: "What's the maximum amount of bare copper acceptable at a termination?",
      options: ["1mm", "2mm", "None - zero tolerance", "5mm if secure"],
      correctAnswer: 2,
      explanation: "Zero bare copper is acceptable. Insulation must run right up to the terminal for safety and compliance."
    },
    {
      id: 3,
      question: "Why must CPCs always be sleeved?",
      options: ["For aesthetics", "BS 7671 identification requirement", "To prevent corrosion", "Cost reduction"],
      correctAnswer: 1,
      explanation: "BS 7671 requires proper conductor identification. CPC sleeving ensures clear identification and compliance."
    },
    {
      id: 4,
      question: "What happens if sockets are installed crooked in AM2?",
      options: ["Nothing if they work", "Workmanship marks lost", "Minor warning only", "Acceptable variation"],
      correctAnswer: 1,
      explanation: "Crooked installation loses workmanship marks as it doesn't meet professional standards expected in AM2."
    },
    {
      id: 5,
      question: "Which BS 7671 regulation covers joints and connections?",
      options: ["Regulation 134", "Regulation 526", "Regulation 522", "Regulation 411"],
      correctAnswer: 1,
      explanation: "Regulation 526 specifically covers electrical connections, requiring them to be electrically and mechanically sound."
    },
    {
      id: 6,
      question: "Give one example of poor workmanship in trunking:",
      options: ["Lids fitted flush", "Gaps between lid sections", "Screws aligned", "Level installation"],
      correctAnswer: 1,
      explanation: "Gaps between trunking lid sections demonstrate poor workmanship and lose marks in assessment."
    },
    {
      id: 7,
      question: "How should cables be presented inside a DB?",
      options: ["Any way that fits", "Dressed neatly with no tangles", "Bundled together tightly", "Crossing for space"],
      correctAnswer: 1,
      explanation: "Cables must be dressed neatly with no tangles, maintaining professional presentation standards."
    },
    {
      id: 8,
      question: "True or false: Neatness doesn't matter if installation is electrically safe.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False - neatness is critical for passing AM2. Poor workmanship loses marks even if installation is safe."
    },
    {
      id: 9,
      question: "What tool should you always use to check accessory alignment?",
      options: ["Tape measure only", "Spirit level", "Visual estimation", "Plumb line"],
      correctAnswer: 1,
      explanation: "Spirit level ensures accessories are properly aligned and level, meeting professional installation standards."
    },
    {
      id: 10,
      question: "What's the golden rule for self-inspection in AM2?",
      options: ["Speed over quality", "Would this pass customer handover/NICEIC inspection?", "Good enough is sufficient", "Focus on function only"],
      correctAnswer: 1,
      explanation: "The golden rule: if your installation wouldn't pass customer handover or NICEIC inspection, it won't pass AM2."
    }
  ];

  return (
    <AM2SectionLayout
      backHref=".."
      breadcrumbs={[
        { label: "AM2", href: "/apprentice-courses/am2" },
        { label: "Module 3", href: "/apprentice-courses/am2/module3" },
        { label: "Section 5" }
      ]}
    >
      <AM2HeroSection
        icon={Ruler}
        title="Accuracy, Neatness, and Compliance with BS 7671"
        description="Professional workmanship standards, accuracy requirements and NET compliance for AM2 assessment success - master the critical details that determine pass or fail."
        badge="Module 3 - Section 5"
      />

      <AM2CriticalWarning
        title="CRITICAL: Workmanship Standards Determine AM2 Outcome"
        message="Accuracy and neatness are not cosmetic extras in AM2 - they're central to passing. NET assessors judge your installation against BS 7671 (Regulation 134.1.1 - \"workmanlike manner\") and the supplied specification. Even if a circuit works, sloppy workmanship, poor alignment, or incorrect cable dressing will lose you marks. Unsafe presentation (like exposed copper or damaged insulation) can fail you outright. This section teaches you exactly what assessors are looking for."
      />

      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* Accuracy to Specification */}
      <AM2ContentCard title="1. Accuracy to Specification - Zero Tolerance Standards" icon={Target}>
        <div className="space-y-4">
          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Critical Measurement Requirements</h4>
            <ul className="space-y-2 text-sm text-white">
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">•</span>
                <div>
                  <strong>Accessories positioned exactly as per drawings</strong>
                  <p className="text-xs mt-1">Height, distance, and position must match specification exactly. No "close enough" tolerance.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">•</span>
                <div>
                  <strong>Cable sizes and types per specification</strong>
                  <p className="text-xs mt-1">No substitutions allowed. Wrong cable = automatic failure regardless of functionality.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">•</span>
                <div>
                  <strong>Protective devices match exactly</strong>
                  <p className="text-xs mt-1">MCB/RCBO ratings must correspond to drawing specifications. No approximations.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">•</span>
                <div>
                  <strong>LV and ELV segregation mandatory</strong>
                  <p className="text-xs mt-1">Proper separation in trunking/conduit as per BS 7671. Mixing circuits fails safety.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
            <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Measurement Best Practices</h4>
            <ul className="space-y-1 text-sm text-orange-700 dark:text-elec-yellow">
              <li>• <strong>Mark out before drilling/fixing</strong> - Accuracy starts with careful layout</li>
              <li>• <strong>Use proper measuring tools</strong> - Steel rules, spirit levels, laser levels for precision</li>
              <li>• <strong>Double-check measurements</strong> - Measure twice, cut once principle</li>
              <li>• <strong>Reference drawings constantly</strong> - Don't rely on memory for positions</li>
              <li>• <strong>Verify before fixing</strong> - Check positions before final securing</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[0].id}
        question={quickCheckQuestions[0].question}
        options={quickCheckQuestions[0].options}
        correctIndex={quickCheckQuestions[0].correctIndex}
        explanation={quickCheckQuestions[0].explanation}
      />

      {/* Neatness and Workmanship */}
      <AM2ContentCard title="2. Neatness and Workmanship Standards" icon={Wrench}>
        <div className="space-y-4">
          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Component-Specific Standards</h4>
            <div className="space-y-3">
              <div className="bg-muted/50 rounded p-3">
                <h5 className="font-medium text-white mb-2">Trunking Installation</h5>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Lids flush and properly seated</li>
                  <li>• Screws aligned in consistent pattern</li>
                  <li>• Runs level and straight throughout</li>
                  <li>• Joints tight with no gaps</li>
                  <li>• Proper support spacing maintained</li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded p-3">
                <h5 className="font-medium text-white mb-2">Conduit Systems</h5>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Smooth bends with no kinks or distortion</li>
                  <li>• Saddles evenly spaced and aligned</li>
                  <li>• Proper coupling techniques at joints</li>
                  <li>• Correct entry methods into accessories</li>
                  <li>• Appropriate bend radius maintained</li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded p-3">
                <h5 className="font-medium text-white mb-2">Cable Installation</h5>
                <ul className="space-y-1 text-sm text-white">
                  <li>• Straight runs with no unnecessary twists</li>
                  <li>• Minimal crossover of circuits</li>
                  <li>• Proper support spacing maintained</li>
                  <li>• Segregation of different circuit types</li>
                  <li>• Clean entry into termination points</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Termination Excellence</h4>
            <ul className="space-y-2 text-sm text-white">
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">•</span>
                <div>
                  <strong>Insulation to terminal edge</strong> - No exposed copper, proper strip length
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">•</span>
                <div>
                  <strong>Accessories mounted perfectly</strong> - Level, flush, and square to surface
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">•</span>
                <div>
                  <strong>DB presentation immaculate</strong> - Cables dressed, labeled, no tangles
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">•</span>
                <div>
                  <strong>Consistent quality throughout</strong> - Same standards applied everywhere
                </div>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* BS 7671 Compliance */}
      <AM2ContentCard title="3. Compliance with BS 7671 - Regulatory Framework" icon={Settings}>
        <div className="space-y-4">
          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Key Regulatory Requirements</h4>
            <ul className="space-y-2 text-sm text-white">
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[60px]">134.1.1</span>
                <div>
                  <strong>"Proper and workmanlike manner"</strong>
                  <p className="text-xs mt-1">Foundation requirement - all work must meet professional installation standards</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[60px]">526</span>
                <div>
                  <strong>Electrical connections standard</strong>
                  <p className="text-xs mt-1">Joints and connections must be electrically and mechanically sound</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[60px]">Part 5</span>
                <div>
                  <strong>Cable installation requirements</strong>
                  <p className="text-xs mt-1">Adequate support, protection, and identification of all conductors</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[60px]">RCD</span>
                <div>
                  <strong>Protection requirements</strong>
                  <p className="text-xs mt-1">Applied where specification demands (sockets, special locations, outdoor circuits)</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[60px]">Polarity</span>
                <div>
                  <strong>Correct connections everywhere</strong>
                  <p className="text-xs mt-1">Line, neutral, and earth properly identified and connected throughout</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-transparent border border-elec-yellow/20 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Compliance Verification Checklist</h4>
            <ul className="space-y-1 text-sm text-white">
              <li>• <strong>Review specification against BS 7671</strong> - Ensure no conflicts</li>
              <li>• <strong>Check protection coordination</strong> - MCB/RCD ratings appropriate</li>
              <li>• <strong>Verify identification requirements</strong> - All conductors properly marked</li>
              <li>• <strong>Confirm earthing arrangements</strong> - CPC continuity throughout</li>
              <li>• <strong>Validate installation methods</strong> - Support, protection, segregation</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[1].id}
        question={quickCheckQuestions[1].question}
        options={quickCheckQuestions[1].options}
        correctIndex={quickCheckQuestions[1].correctIndex}
        explanation={quickCheckQuestions[1].explanation}
      />

      {/* Assessor Perspective */}
      <AM2ContentCard title="4. What the Assessor Looks For - Professional Standards" icon={Square}>
        <div className="space-y-4">
          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">First Impression Assessment</h4>
            <div className="bg-muted/50 rounded p-3 mb-3">
              <p className="text-sm text-white italic">
                "Does this installation look like a real electrician did it, or like rushed training-bay work?"
              </p>
            </div>
            <ul className="space-y-2 text-sm text-white">
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">•</span>
                <div>
                  <strong>Visual impact</strong> - Overall professional appearance and attention to detail
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">•</span>
                <div>
                  <strong>Geometric precision</strong> - Straight lines, square corners, consistent spacing
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">•</span>
                <div>
                  <strong>Attention to detail</strong> - Small finishing touches that show pride in work
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-green-400 min-w-[20px]">•</span>
                <div>
                  <strong>Consistency</strong> - Same high standards maintained throughout installation
                </div>
              </li>
            </ul>
          </div>

          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Detailed Inspection Points</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-white mb-2">Containment Systems</h5>
                <ul className="space-y-1 text-xs text-white">
                  <li>• Trunking runs straight and level</li>
                  <li>• No gaps in lids or joints</li>
                  <li>• Screws aligned consistently</li>
                  <li>• Proper support spacing</li>
                  <li>• Clean cut ends and finishes</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Accessories</h5>
                <ul className="space-y-1 text-xs text-white">
                  <li>• Perfectly aligned and level</li>
                  <li>• No visible gaps around edges</li>
                  <li>• Flush mounting to surface</li>
                  <li>• Consistent height/spacing</li>
                  <li>• Clean, undamaged faceplates</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Terminations</h5>
                <ul className="space-y-1 text-xs text-white">
                  <li>• Zero exposed copper visible</li>
                  <li>• Proper conductor identification</li>
                  <li>• Conductors cut to exact length</li>
                  <li>• Secure mechanical connections</li>
                  <li>• Appropriate sleeving applied</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Distribution Board</h5>
                <ul className="space-y-1 text-xs text-white">
                  <li>• Cables dressed systematically</li>
                  <li>• Clear, permanent labelling</li>
                  <li>• No cable crossings/tangles</li>
                  <li>• CPCs in correct terminals</li>
                  <li>• Professional presentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Common Candidate Mistakes */}
      <AM2ContentCard title="5. Common Candidate Mistakes - NET Findings Analysis" icon={AlertTriangle}>
        <div className="space-y-4">
          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Top Workmanship Failures</h4>
            <ol className="space-y-2 text-sm text-white">
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[30px]">1.</span>
                <div>
                  <strong>Misaligned or uneven accessories (47% of cases)</strong>
                  <p className="text-xs mt-1">Sockets, switches crooked or at wrong heights - immediate visual impact failure</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[30px]">2.</span>
                <div>
                  <strong>Over-stripped conductors with bare copper (42% of cases)</strong>
                  <p className="text-xs mt-1">Safety critical failure - exposed copper at terminations</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[30px]">3.</span>
                <div>
                  <strong>CPC unsleeved or cut short (38% of cases)</strong>
                  <p className="text-xs mt-1">BS 7671 identification requirement not met</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[30px]">4.</span>
                <div>
                  <strong>Trunking overfilled or lids not fitted properly (35% of cases)</strong>
                  <p className="text-xs mt-1">Poor containment standards and presentation</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[30px]">5.</span>
                <div>
                  <strong>Untidy DB wiring with crossing conductors (31% of cases)</strong>
                  <p className="text-xs mt-1">Professional presentation standards not met</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[30px]">6.</span>
                <div>
                  <strong>Messy or incomplete paperwork (28% of cases)</strong>
                  <p className="text-xs mt-1">Documentation standards affect overall assessment</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
            <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Real Assessment Examples</h4>
            <ul className="space-y-2 text-sm text-red-700 dark:text-elec-yellow">
              <li><strong>Example 1:</strong> Candidate wired installation correctly but left all sockets crooked. Lost workmanship marks, borderline fail.</li>
              <li><strong>Example 2:</strong> Candidate left 15mm of bare copper showing at DB termination. Unsafe - section failed.</li>
              <li><strong>Example 3:</strong> Candidate rushed containment, left trunking lid with gaps. Assessor deducted marks for poor finish.</li>
              <li><strong>Example 4:</strong> In real work, installation failed EICR inspection because CPC sleeving missing. Same error in AM2 = marks lost.</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[2].id}
        question={quickCheckQuestions[2].question}
        options={quickCheckQuestions[2].options}
        correctIndex={quickCheckQuestions[2].correctIndex}
        explanation={quickCheckQuestions[2].explanation}
      />

      {/* Practical Guidance */}
      <AM2ContentCard title="6. Practical Guidance - Professional Installation Techniques" icon={Target}>
        <div className="space-y-4">
          <div className="border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Step-by-Step Excellence Process</h4>
            <ol className="space-y-2 text-sm text-white">
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">1.</span>
                <div>
                  <strong>Mark out before drilling/fixing</strong>
                  <p className="text-xs mt-1">Accuracy starts with careful layout. Use proper measuring tools and double-check positions.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">2.</span>
                <div>
                  <strong>Check levels twice, always use spirit level</strong>
                  <p className="text-xs mt-1">On accessories and trunking runs. Crooked installation immediately visible to assessor.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">3.</span>
                <div>
                  <strong>Cut and strip carefully</strong>
                  <p className="text-xs mt-1">Don't rush cable preparation. Nicked conductors or wrong strip lengths lose marks.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">4.</span>
                <div>
                  <strong>Sleeve before termination</strong>
                  <p className="text-xs mt-1">Don't leave CPC sleeving to the end. Apply during cable preparation phase.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">5.</span>
                <div>
                  <strong>Dress cables systematically in DBs</strong>
                  <p className="text-xs mt-1">Keep conductors straight, bend neatly, avoid tangles. Group by function.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-elec-yellow min-w-[20px]">6.</span>
                <div>
                  <strong>Self-inspect continuously</strong>
                  <p className="text-xs mt-1">Step back regularly: would you be happy to hand this over to an NICEIC inspector?</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Professional Quality Indicators</h4>
            <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
              <li>• <strong>Geometric precision</strong> - Everything square, level, and aligned</li>
              <li>• <strong>Consistent spacing</strong> - Uniform gaps and distances throughout</li>
              <li>• <strong>Clean finishes</strong> - No damaged components or rough edges</li>
              <li>• <strong>Systematic approach</strong> - Organized, logical installation sequence</li>
              <li>• <strong>Attention to detail</strong> - Small touches that show professional pride</li>
              <li>• <strong>Documentation quality</strong> - Clear, legible, complete paperwork</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary and Key Takeaways */}
      <AM2ContentCard title="Section Summary - Critical Success Factors" icon={CheckCircle}>
        <div className="space-y-4">
          <div className="bg-transparent border border-elec-yellow/20 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-2">Golden Rule for AM2 Success</h4>
            <p className="text-sm text-white italic mb-3">
              "If your installation wouldn't pass a customer handover or NICEIC inspection, it won't pass AM2."
            </p>
            <p className="text-sm text-white">
              This single principle encompasses all workmanship standards. Every decision should pass this test.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Assessment Success Requirements</h4>
            <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
              <li>• <strong>Exact specification compliance</strong> - No deviations from drawings</li>
              <li>• <strong>Perfect geometric alignment</strong> - Square, straight, and level throughout</li>
              <li>• <strong>Zero termination faults</strong> - No exposed copper, proper sleeving</li>
              <li>• <strong>Professional presentation</strong> - Neat cable dressing and labelling</li>
              <li>• <strong>BS 7671 compliance</strong> - Regulations 134.1.1, 526, Part 5</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Assessment Day Strategy</h4>
            <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
              <li>• Work systematically - don't rush quality for speed</li>
              <li>• Self-inspect continuously throughout installation</li>
              <li>• Use proper tools for measurement and alignment</li>
              <li>• Apply consistent standards across all work areas</li>
              <li>• Remember: assessor sees everything you do</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Knowledge Check Quiz */}
      <AM2ContentCard title="Knowledge Check - Workmanship Standards" icon={BookOpen}>
        <p className="text-sm text-white mb-6">
          Test your understanding of accuracy, neatness and BS 7671 compliance requirements. This quiz covers key assessment criteria and common failure points.
        </p>

        <Quiz
          questions={quizQuestions}
          title="Accuracy and Workmanship Assessment"
        />
      </AM2ContentCard>

      <AM2NavigationFooter
        previousHref="../section4"
        previousLabel="Termination & Connections"
        nextHref="../section6"
        nextLabel="Time Management"
        currentSection={5}
        totalSections={6}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module3Section5;
