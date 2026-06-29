/**
 * Module 3 · Section 5 — Accuracy, neatness, and compliance with BS 7671
 * AM2 day-prep — AM2 Phase B (composite installation: cable, containment, circuits, terminations)
 * Workmanship to the spec on the drawing and the standard in BS 7671 — neat, level, accurate.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  RegsCallout,
  TLDR,
  Scenario,
  KeyTakeaways,
  FAQ,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Accuracy, Neatness, and BS 7671 Compliance | AM2 Module 3.5 | Elec-Mate';
const DESCRIPTION =
  'Workmanship to the AM2 standard — accurate to the drawing, neat on the wall, compliant with BS 7671.';

const AM2Module3Section5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const learningOutcomes = [
    'Define "workmanlike standard" under BS 7671 and apply it consistently',
    'Install accessories, containment, and wiring to accurate dimensions per specification',
    'Apply neat and consistent workmanship across all circuits and components',
    'Identify common presentation faults that cost marks in NET assessments',
    'Self-inspect your work using the same criteria as NET assessors',
    'Understand how workmanship standards translate to real-world electrical work',
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'specification-accuracy',
      question: 'If you install sockets 50mm higher than the spec drawing, what happens?',
      options: [
        'Marks lost - not to specification',
        "It's acceptable as long as it's safe",
        'Only matters if assessor notices',
        'Minor deviation is allowed',
      ],
      correctIndex: 0,
      explanation:
        'Marks lost - installations must match drawings exactly. Even safe deviations from specification result in lost marks.',
    },
    {
      id: 'bs7671-connections',
      question:
        'Which BS 7671 regulation requires all connections to be electrically and mechanically sound?',
      options: [
        'Regulation 134.1.4',
        'Regulation 559',
        'Regulation 522',
        'Regulation 526.1',
      ],
      correctIndex: 3,
      explanation:
        "Regulation 526.1 states verbatim: 'Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection.' That's the clause an AM2 assessor expects you to quote when asked why a termination has to be both tight and properly insulated.",
    },
    {
      id: 'bare-copper-safety',
      question: 'If the assessor sees bare copper at a socket terminal, what happens?',
      options: [
        'It is acceptable if the connection is tight',
        'Only a small note is made on the report',
        'Work marked unsafe - significant marks lost',
        'It is overlooked if the circuit tests pass',
      ],
      correctIndex: 2,
      explanation:
        'Work marked unsafe with significant marks lost, possibly leading to failure. No bare copper is acceptable at any termination.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question:
        'Which BS 7671 regulation requires that every joint and connection is of proper construction as regards conductance, insulation, mechanical strength and protection?',
      options: [
        'Regulation 526.5',
        'Regulation 134.1.4',
        'Regulation 522',
        'Regulation 411',
      ],
      correctAnswer: 1,
      explanation:
        "Regulation 134.1.4 states verbatim: 'Every electrical joint and connection shall be of proper construction as regards conductance, insulation, mechanical strength and protection.' That's the workmanship clause AM2 holds you to — every screw torque, every sleeve, every gland.",
    },
    {
      id: 2,
      question: "What's the maximum amount of bare copper acceptable at a termination?",
      options: [
        '5mm if secure',
        '1mm',
        'None - zero tolerance',
        '2mm',
      ],
      correctAnswer: 2,
      explanation:
        'Zero bare copper is acceptable. Insulation must run right up to the terminal for safety and compliance.',
    },
    {
      id: 3,
      question: 'Why must CPCs always be sleeved?',
      options: [
        'To increase the current-carrying capacity',
        'To improve the mechanical strength of the joint',
        'To reduce the resistance of the earth path',
        'BS 7671 identification requirement',
      ],
      correctAnswer: 3,
      explanation:
        'BS 7671 requires proper conductor identification. CPC sleeving ensures clear identification and compliance.',
    },
    {
      id: 4,
      question: 'What happens if sockets are installed crooked in AM2?',
      options: [
        'Workmanship marks lost',
        'Nothing if they work',
        'Minor warning only',
        'Acceptable variation',
      ],
      correctAnswer: 0,
      explanation:
        "Crooked installation loses workmanship marks as it doesn't meet professional standards expected in AM2.",
    },
    {
      id: 5,
      question:
        'Which BS 7671 regulation requires every termination and joint in a live conductor or PEN conductor to be made within a suitable accessory, equipment enclosure, or non-combustible building enclosure?',
      options: [
        'Regulation 134',
        'Regulation 526.5',
        'Regulation 411',
        'Regulation 522',
      ],
      correctAnswer: 1,
      explanation:
        "Regulation 526.5 states verbatim: 'Every termination and joint in a live conductor or a PEN conductor shall be made within one of the following or a combination thereof: (a) a suitable accessory complying with the appropriate product standard; (b) an equipment enclosure complying with the appropriate product standard; (c) an enclosure partially formed or completed with building material which is non-combustible when tested to BS 476-4.' This is why a connector block sat in a void without an enclosure fails AM2.",
    },
    {
      id: 6,
      question: 'Give one example of poor workmanship in trunking:',
      options: [
        'Lids fitted flush',
        'Screws aligned',
        'Gaps between lid sections',
        'Level installation',
      ],
      correctAnswer: 2,
      explanation:
        'Gaps between trunking lid sections demonstrate poor workmanship and lose marks in assessment.',
    },
    {
      id: 7,
      question: 'How should cables be presented inside a DB?',
      options: [
        'Coiled to leave plenty of spare length',
        'Crossed over to save space in the enclosure',
        'Left loose to allow easy future changes',
        'Dressed neatly with no tangles',
      ],
      correctAnswer: 3,
      explanation:
        'Cables must be dressed neatly with no tangles, maintaining professional presentation standards.',
    },
    {
      id: 8,
      question: 'How does neatness affect your AM2 result if the installation is electrically safe?',
      options: [
        'Poor workmanship still loses marks even when safe',
        'Neatness is not assessed at all',
        'Marks are only lost if the circuit fails a test',
        'Neatness only matters on the practical wiring task',
      ],
      correctAnswer: 0,
      explanation:
        'Neatness is critical for passing AM2. Poor workmanship loses marks even if the installation is electrically safe.',
    },
    {
      id: 9,
      question: 'What tool should you always use to check accessory alignment?',
      options: [
        'Tape measure only',
        'Spirit level',
        'Visual estimation',
        'Plumb line',
      ],
      correctAnswer: 1,
      explanation:
        'Spirit level ensures accessories are properly aligned and level, meeting professional installation standards.',
    },
    {
      id: 10,
      question: "What's the golden rule for self-inspection in AM2?",
      options: [
        'Would this be quick enough to finish on time?',
        'Would this use the least amount of cable?',
        'Would this pass customer handover/NICEIC inspection?',
        'Would this look acceptable from a distance?',
      ],
      correctAnswer: 2,
      explanation:
        "The golden rule: if your installation wouldn't pass customer handover or NICEIC inspection, it won't pass AM2.",
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/am2/module3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5"
            title="Accuracy, Neatness, and Compliance with BS 7671"
            description="Professional workmanship standards, accuracy requirements and NET compliance for AM2 assessment success - master the critical details that determine pass or fail."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 134.1.4 is the workmanship clause — every joint and connection of proper construction. The whole AM2 install gets judged against it.',
              'Accuracy = match the drawing exactly. Heights, positions, cable types, MCB ratings — no "close enough".',
              'Neatness = level accessories, flush trunking lids, dressed cables in the DB, no exposed copper anywhere.',
              "Self-inspect against the same eye an NICEIC inspector would bring. If you'd be embarrassed handing it over to a customer, you'll be embarrassed handing it to the assessor.",
              '47% of NET failures are misaligned accessories; 42% are bare copper at terminals; 38% are missed CPC sleeving. These are all preventable.',
            ]}
          />

          <CommonMistake
            title="CRITICAL: Workmanship Standards Determine AM2 Outcome"
            whatHappens="Accuracy and neatness aren't cosmetic extras in AM2 — they're central to passing. NET assessors judge your installation against BS 7671 and the supplied specification. The standard you're held to is Reg 134.1.4: 'Every electrical joint and connection shall be of proper construction as regards conductance, insulation, mechanical strength and protection.' Even if a circuit works, sloppy workmanship, poor alignment or incorrect cable dressing will lose you marks. Unsafe presentation — exposed copper, damaged insulation — can fail you outright."
            doInstead="Hold every cut, sleeve, gland and termination to Reg 134.1.4 and self-inspect with the same eye an NICEIC inspector would bring."
          />

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="1. Accuracy to Specification - Zero Tolerance Standards">
            <p>
              <strong>Critical Measurement Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Accessories positioned exactly as per drawings.</strong> Height, distance,
                and position must match specification exactly. No "close enough" tolerance.
              </li>
              <li>
                <strong>Cable sizes and types per specification.</strong> No substitutions allowed.
                Wrong cable = automatic failure regardless of functionality.
              </li>
              <li>
                <strong>Protective devices match exactly.</strong> MCB/RCBO ratings must correspond
                to drawing specifications. No approximations.
              </li>
              <li>
                <strong>LV and ELV segregation mandatory.</strong> Proper separation in
                trunking/conduit as per BS 7671. Mixing circuits fails safety.
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Measurement Best Practices:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mark out before drilling/fixing</strong> - Accuracy starts with careful
                layout
              </li>
              <li>
                <strong>Use proper measuring tools</strong> - Steel rules, spirit levels, laser
                levels for precision
              </li>
              <li>
                <strong>Double-check measurements</strong> - Measure twice, cut once principle
              </li>
              <li>
                <strong>Reference drawings constantly</strong> - Don't rely on memory for positions
              </li>
              <li>
                <strong>Verify before fixing</strong> - Check positions before final securing
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <ConceptBlock title="2. Neatness and Workmanship Standards">
            <p>
              <strong>Trunking Installation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lids flush and properly seated</li>
              <li>Screws aligned in consistent pattern</li>
              <li>Runs level and straight throughout</li>
              <li>Joints tight with no gaps</li>
              <li>Proper support spacing maintained</li>
            </ul>
            <p>
              <strong>Conduit Systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Smooth bends with no kinks or distortion</li>
              <li>Saddles evenly spaced and aligned</li>
              <li>Proper coupling techniques at joints</li>
              <li>Correct entry methods into accessories</li>
              <li>Appropriate bend radius maintained</li>
            </ul>
            <p>
              <strong>Cable Installation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Straight runs with no unnecessary twists</li>
              <li>Minimal crossover of circuits</li>
              <li>Proper support spacing maintained</li>
              <li>Segregation of different circuit types</li>
              <li>Clean entry into termination points</li>
            </ul>
            <p>
              <strong>Termination Excellence:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Insulation to terminal edge</strong> - No exposed copper, proper strip
                length
              </li>
              <li>
                <strong>Accessories mounted perfectly</strong> - Level, flush, and square to surface
              </li>
              <li>
                <strong>DB presentation immaculate</strong> - Cables dressed, labeled, no tangles
              </li>
              <li>
                <strong>Consistent quality throughout</strong> - Same standards applied everywhere
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="3. Compliance with BS 7671 - Regulatory Framework">
            <div className="space-y-4">
              <p className="text-ios-callout text-white">
                These are the verbatim regs an AM2 assessor will hold your installation against.
                Read the clause text — it's the language you should reach for when asked to justify
                what you've fitted.
              </p>
            </div>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 134.1.4"
            clause={
              <>
                "Every electrical joint and connection shall be of proper construction as regards
                conductance, insulation, mechanical strength and protection."
              </>
            }
            meaning={
              <>
                This is the workmanship clause. On AM2 day it covers torque, sleeving, the absence
                of bare copper at terminals, and the mechanical security of every gland and clamp
                the assessor lifts a lid on.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 134.1.4."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 526.1"
            clause={
              <>
                "Every connection between conductors or between a conductor and other equipment
                shall provide durable electrical continuity and adequate mechanical strength and
                protection."
              </>
            }
            meaning={
              <>
                "Durable" is the word AM2 hangs on. A connection that's tight today but works loose
                under thermal cycling fails this reg. It's why you torque to the manufacturer's
                figure and don't double up flex into a single rigid terminal.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 526.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 526.5"
            clause={
              <>
                "Every termination and joint in a live conductor or a PEN conductor shall be made
                within one of the following or a combination thereof: (a) a suitable accessory
                complying with the appropriate product standard; (b) an equipment enclosure
                complying with the appropriate product standard; (c) an enclosure partially formed
                or completed with building material which is non-combustible when tested to BS
                476-4."
              </>
            }
            meaning={
              <>
                No bare connector blocks in a ceiling void. Every joint on AM2 has to live inside an
                accessory, an enclosure, or a non-combustible building enclosure — full stop.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 526.5."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 522.6.1"
            clause={
              <>
                "Wiring systems shall be selected and erected so as to minimize the damage arising
                from mechanical stress, for example, by impact, abrasion, penetration, tension or
                compression during installation, use or maintenance."
              </>
            }
            meaning={
              <>
                This is what the assessor is testing when they look at how you've supported,
                clipped, bushed and protected cables — including grommets where cables enter metal
                enclosures and capping in chases.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 522.6.1."
          />

          <ConceptBlock title="Compliance verification checklist">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Review specification against BS 7671</strong> - Ensure no conflicts
              </li>
              <li>
                <strong>Check protection coordination</strong> - MCB/RCD ratings appropriate
              </li>
              <li>
                <strong>Verify identification requirements</strong> - All conductors properly marked
              </li>
              <li>
                <strong>Confirm earthing arrangements</strong> - CPC continuity throughout
              </li>
              <li>
                <strong>Validate installation methods</strong> - Support, protection, segregation
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <ConceptBlock title="4. What the Assessor Looks For - Professional Standards">
            <p>
              <strong>First Impression Assessment.</strong> "Does this installation look like a real
              electrician did it, or like rushed training-bay work?"
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual impact</strong> - Overall professional appearance and attention to
                detail
              </li>
              <li>
                <strong>Geometric precision</strong> - Straight lines, square corners, consistent
                spacing
              </li>
              <li>
                <strong>Attention to detail</strong> - Small finishing touches that show pride in
                work
              </li>
              <li>
                <strong>Consistency</strong> - Same high standards maintained throughout
                installation
              </li>
            </ul>
            <p>
              <strong>Detailed Inspection Points — Containment Systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Trunking runs straight and level</li>
              <li>No gaps in lids or joints</li>
              <li>Screws aligned consistently</li>
              <li>Proper support spacing</li>
              <li>Clean cut ends and finishes</li>
            </ul>
            <p>
              <strong>Accessories:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Perfectly aligned and level</li>
              <li>No visible gaps around edges</li>
              <li>Flush mounting to surface</li>
              <li>Consistent height/spacing</li>
              <li>Clean, undamaged faceplates</li>
            </ul>
            <p>
              <strong>Terminations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Zero exposed copper visible</li>
              <li>Proper conductor identification</li>
              <li>Conductors cut to exact length</li>
              <li>Secure mechanical connections</li>
              <li>Appropriate sleeving applied</li>
            </ul>
            <p>
              <strong>Distribution Board:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cables dressed systematically</li>
              <li>Clear, permanent labelling</li>
              <li>No cable crossings/tangles</li>
              <li>CPCs in correct terminals</li>
              <li>Professional presentation</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="5. Common Candidate Mistakes - NET Findings Analysis">
            <p>
              <strong>Top Workmanship Failures:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Misaligned or uneven accessories (47% of cases).</strong> Sockets, switches
                crooked or at wrong heights - immediate visual impact failure.
              </li>
              <li>
                <strong>Over-stripped conductors with bare copper (42% of cases).</strong> Safety
                critical failure - exposed copper at terminations.
              </li>
              <li>
                <strong>CPC unsleeved or cut short (38% of cases).</strong> BS 7671 identification
                requirement not met.
              </li>
              <li>
                <strong>Trunking overfilled or lids not fitted properly (35% of cases).</strong>{' '}
                Poor containment standards and presentation.
              </li>
              <li>
                <strong>Untidy DB wiring with crossing conductors (31% of cases).</strong>{' '}
                Professional presentation standards not met.
              </li>
              <li>
                <strong>Messy or incomplete paperwork (28% of cases).</strong> Documentation
                standards affect overall assessment.
              </li>
            </ol>
            <p>
              <strong className="text-elec-yellow">Real Assessment Examples:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Example 1:</strong> Candidate wired installation correctly but left all
                sockets crooked. Lost workmanship marks, borderline fail.
              </li>
              <li>
                <strong>Example 2:</strong> Candidate left 15mm of bare copper showing at DB
                termination. Unsafe - section failed.
              </li>
              <li>
                <strong>Example 3:</strong> Candidate rushed containment, left trunking lid with
                gaps. Assessor deducted marks for poor finish.
              </li>
              <li>
                <strong>Example 4:</strong> In real work, installation failed EICR inspection
                because CPC sleeving missing. Same error in AM2 = marks lost.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <ConceptBlock title="6. Practical Guidance - Professional Installation Techniques">
            <p>
              <strong>Step-by-Step Excellence Process:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mark out before drilling/fixing.</strong> Accuracy starts with careful
                layout. Use proper measuring tools and double-check positions.
              </li>
              <li>
                <strong>Check levels twice, always use spirit level.</strong> On accessories and
                trunking runs. Crooked installation immediately visible to assessor.
              </li>
              <li>
                <strong>Cut and strip carefully.</strong> Don't rush cable preparation. Nicked
                conductors or wrong strip lengths lose marks.
              </li>
              <li>
                <strong>Sleeve before termination.</strong> Don't leave CPC sleeving to the end.
                Apply during cable preparation phase.
              </li>
              <li>
                <strong>Dress cables systematically in DBs.</strong> Keep conductors straight, bend
                neatly, avoid tangles. Group by function.
              </li>
              <li>
                <strong>Self-inspect continuously.</strong> Step back regularly: would you be happy
                to hand this over to an NICEIC inspector?
              </li>
            </ol>
            <p>
              <strong className="text-elec-yellow">Professional Quality Indicators:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Geometric precision</strong> - Everything square, level, and aligned
              </li>
              <li>
                <strong>Consistent spacing</strong> - Uniform gaps and distances throughout
              </li>
              <li>
                <strong>Clean finishes</strong> - No damaged components or rough edges
              </li>
              <li>
                <strong>Systematic approach</strong> - Organized, logical installation sequence
              </li>
              <li>
                <strong>Attention to detail</strong> - Small touches that show professional pride
              </li>
              <li>
                <strong>Documentation quality</strong> - Clear, legible, complete paperwork
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Section Summary - Critical Success Factors">
            <p>
              <strong className="text-elec-yellow">Golden Rule for AM2 Success:</strong> "If your
              installation wouldn't pass a customer handover or NICEIC inspection, it won't pass
              AM2." This single principle encompasses all workmanship standards. Every decision
              should pass this test.
            </p>
            <p>
              <strong className="text-elec-yellow">Assessment Success Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Exact specification compliance</strong> - No deviations from drawings
              </li>
              <li>
                <strong>Perfect geometric alignment</strong> - Square, straight, and level
                throughout
              </li>
              <li>
                <strong>Zero termination faults</strong> - No exposed copper, proper sleeving
              </li>
              <li>
                <strong>Professional presentation</strong> - Neat cable dressing and labelling
              </li>
              <li>
                <strong>BS 7671 compliance</strong> - Regulations 134.1.4, 526.1, 526.5, 522.6.1
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Assessment Day Strategy:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Work systematically - don't rush quality for speed</li>
              <li>Self-inspect continuously throughout installation</li>
              <li>Use proper tools for measurement and alignment</li>
              <li>Apply consistent standards across all work areas</li>
              <li>Remember: assessor sees everything you do</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating neatness as cosmetic"
            whatHappens={
              <>
                Candidate finishes the install electrically perfect — every test passes, every
                circuit operates — but accessories are off-level by 5–10°, trunking lids have
                visible gaps, and the DB has cables crossing in front of MCBs. They assume the
                assessor will only mark the electrical side. Result: workmanship marks tank, and the
                overall section can drop below the pass threshold.
              </>
            }
            doInstead={
              <>
                Treat presentation as scoring marks just like terminations do. Spirit-level every
                accessory, dress cables in the DB so each MCB has a clear feed, push trunking lid
                screws home so they sit flat. Self-inspect every 30 minutes — does this look like
                show-home work, or like someone rushed it?
              </>
            }
          />

          <Scenario
            title="Sockets are 50 mm above the spec drawing height"
            situation={
              <>
                You've fitted four sockets along a dado run. Looking back, the back boxes are at 500
                mm to centre — but the spec drawing called for 450 mm. They're all level with each
                other and the install works fine. You've got two hours of testing and paperwork
                left.
              </>
            }
            whatToDo={
              <>
                Move them. Yes, it's painful with the cables already pulled and terminated — but
                accuracy to spec is a primary marking criterion. Lift the back boxes, plug the old
                fixings, drill 50 mm lower, refit. If it's a quick chase the cables will stretch; if
                not, you'll need to feed extra slack from the trunking. Better to lose 30 minutes
                correcting it than to lose accuracy marks across all four sockets.
              </>
            }
            whyItMatters={
              <>
                "Heights, positions, routes exactly as shown" is in the NET assessment criteria.
                Even safe deviations from the drawing lose marks — the assessor isn't grading
                whether your version is acceptable, they're grading whether it matches the drawing.
                On a real site this is the same conversation with a clerk of works.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: "What's the tolerance on accessory positioning — is 5 mm acceptable?",
                answer:
                  'Roughly ±5 mm is what most assessors quietly accept on heights, with everything in a row aligned to each other. Beyond that and marks start dropping. The bigger issue is consistency — three sockets at 450 mm and one at 460 mm draws the eye, even if 460 mm is closer to spec than 440 mm would be. Mark out all positions before drilling and check each one against a tape measure not memory.',
              },
              {
                question: 'How do assessors check if accessories are level?',
                answer:
                  "By eye first — a crooked socket is obvious from across the room. Then by spirit level if there's any doubt. They're looking for both individual level (square to the wall) and consistent level (all sockets in a row at the same height). A torpedo level lives in your AM2 toolbag for exactly this reason.",
              },
              {
                question: 'Is paperwork really part of the workmanship mark?',
                answer:
                  "It's marked separately, but yes — illegible test sheets, missing values, or a schedule of inspections with blanks all lose marks. The principle is the same as the install: if it wouldn't pass a customer handover, it doesn't pass AM2. Fill in test sheets as you complete each circuit, not all at the end when you're rushed.",
              },
              {
                question: "What's the single biggest workmanship win on AM2 day?",
                answer:
                  'Cable dressing in the DB. Assessors lift that lid expecting to see chaos — straight feeds to each MCB, neutrals dropped vertically into the bar, CPCs grouped, no crossings, label printed and aligned. A neat DB sets the tone for the whole inspection. A messy DB makes them look harder at everything else.',
              },
              {
                question: "Should I redo work I'm not happy with, even if time's tight?",
                answer:
                  'Depends what "not happy with" means. Bare copper, CPC in the wrong bar, kinked conduit, broken ring — yes, fix it, those are pass/fail items. A trunking lid screw not perfectly aligned with the others — leave it if you\'re tight on time and move on; the marginal mark you might recover isn\'t worth losing 20 minutes that should be on testing or paperwork. Triage what you fix.',
              },
              {
                question: "What does 'workmanlike' actually mean in BS 7671 terms?",
                answer:
                  'Reg 134.1.4 is the legal-style version: "of proper construction as regards conductance, insulation, mechanical strength and protection." In English: tight, properly insulated, mechanically secure, protected from damage. The OSG and IET Code of Practice expand on it — straight runs, level accessories, secure fixings, identifiable conductors, accessible terminations. That\'s the bar.',
              },
            ]}
          />

          <KeyTakeaways
            points={[
              'Reg 134.1.4 is the workmanship clause — proper construction in conductance, insulation, mechanical strength, protection. Memorise it.',
              'Heights, positions, cable types, MCB ratings: match the drawing exactly. Even safe deviations lose accuracy marks.',
              'Spirit-level every accessory. Flush every trunking lid. Dress every DB cable. These visible details are the first thing an assessor looks at.',
              'Zero bare copper. CPC sleeved green/yellow everywhere. Sheath into every accessory. These are the recurring NET failure points.',
              'Reg 526.1 (durable continuity), 526.5 (joints in proper enclosures), 522.6.1 (mechanical stress) — all stack on top of 134.1.4.',
              "Self-inspect like an NICEIC inspector. If it wouldn't pass customer handover, it won't pass AM2.",
            ]}
          />

          <ConceptBlock title="Knowledge Check - Workmanship Standards">
            <p className="text-sm text-white mb-6">
              Test your understanding of accuracy, neatness and BS 7671 compliance requirements.
              This quiz covers key assessment criteria and common failure points.
            </p>

            <Quiz questions={quizQuestions} title="Accuracy and Workmanship Assessment" />
          </ConceptBlock>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module3/section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Termination & Connections
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module3/section6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Time Management
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module3Section5;
