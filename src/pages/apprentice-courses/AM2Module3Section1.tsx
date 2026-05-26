/**
 * Module 3 · Section 1 — Cable selection and containment
 * AM2 day-prep — AM2 Phase B (composite installation: cable, containment, circuits, terminations)
 * Picking the right cable to spec and installing trunking, conduit and tray to a workmanlike standard.
 */

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import VoltageDropCalculator from '@/components/apprentice-courses/VoltageDropCalculator';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  VideoCard,
  TLDR,
  RegsCallout,
  Scenario,
  KeyTakeaways,
  FAQ,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Cable Selection and Containment | AM2 Module 3.1 | Elec-Mate';
const DESCRIPTION =
  'Cable to the spec on the drawing — and containment (trunking, conduit, tray) installed straight, level and workmanlike.';

const AM2Module3Section1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'cable-spec-compliance',
      question:
        "If the drawing calls for 4mm² radial and you install 2.5mm², is it acceptable if it's safe?",
      options: [
        'No, but only if assessor notices',
        'Yes, if you upgrade the MCB',
        'No - not to spec, marks lost',
        'Yes, as long as it passes testing',
      ],
      correctIndex: 2,
      explanation:
        'Using incorrect cable size is non-compliance with specification regardless of safety - this loses marks and potentially fails the assessment for not following drawings exactly.',
    },
    {
      id: 'containment-workmanship',
      question:
        "What's more important - finishing fast, or ensuring every trunking lid is flush and every bend neat?",
      options: [
        'Speed is critical in AM2 assessment',
        'Focus on electrical safety only',
        'Balance speed and quality equally',
        'Neatness and compliance; rushing = lost marks',
      ],
      correctIndex: 3,
      explanation:
        'Workmanship quality and compliance take priority over speed. Rushed work with poor containment installation loses significant marks even if electrically safe.',
    },
    {
      id: 'segregation-requirements',
      question:
        'If the spec calls for segregated trunking for ELV cabling but you run it with mains, what happens?',
      options: [
        'Fail for specification non-compliance and safety breach',
        'Investigate the cause as it\\\\\\\\\\\\\\\'s below the minimum requirement',
        'A plan showing ceiling-mounted items as if looking up',
        'Calendar-based scheduling with smooth transitions',
      ],
      correctIndex: 0,
      explanation:
        'Mixing ELV with mains violates specification compliance and safety segregation requirements - this is a fail situation for both compliance and safety.',
    },
    {
      id: 'conduit-technique',
      question: 'Why must conduit edges be deburred after cutting?',
      options: [
        'Raise the alarm, call fire brigade, evacuate if safe to do so',
        'The likelihood that a hazard will cause harm and the severity of that harm',
        'To prevent cable insulation damage and meet workmanship standards',
        'Reduced pumping energy while maintaining heat delivery',
      ],
      correctIndex: 2,
      explanation:
        'Deburring prevents cable insulation damage and demonstrates professional workmanship standards - sharp edges can cause cable failure and lose marks.',
    },
    {
      id: 'cable-containment-space',
      question: 'What happens if trunking is overfilled beyond space factor requirements?',
      options: [
        'Marks lost for non-compliance with BS 7671',
        'Minor warning from assessor',
        'No issue if cables fit physically',
        'Acceptable if installation looks neat',
      ],
      correctIndex: 0,
      explanation:
        'Overfilling trunking breaches BS 7671 space factor requirements and loses marks for non-compliance, regardless of physical appearance.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'Why is it important to follow cable size/type in the spec exactly?',
      options: [
        'PEN fault detection and automatic disconnection',
        'For compliance and current-carrying capacity requirements',
        'Ensuring stable power and communication infrastructure',
        'Anyone who prepares or modifies designs affecting H&S',
      ],
      correctAnswer: 1,
      explanation:
        'Cable specifications ensure compliance with design requirements and current-carrying capacity - deviation can cause failure and safety issues.',
    },
    {
      id: 2,
      question: 'Name three workmanship points assessors look for in trunking:',
      options: [
        'Cost-effectiveness, material quality, brand selection',
        'Speed, efficiency, cable capacity',
        'Straight runs, flush lids, secure fixings',
        'Accessibility, maintenance, documentation',
      ],
      correctAnswer: 2,
      explanation:
        'Assessors focus on straight runs, flush lids, and secure fixings as key workmanship indicators for professional trunking installation.',
    },
    {
      id: 3,
      question: "What's the correct spacing for conduit saddles?",
      options: [
        'As close together as possible',
        'Every 1000mm maximum',
        "Manufacturer's recommendation only",
        '300-600mm apart depending on size',
      ],
      correctAnswer: 3,
      explanation:
        'Conduit saddles should be spaced 300-600mm apart depending on conduit size to ensure adequate support and professional appearance.',
    },
    {
      id: 4,
      question: 'What happens if trunking is overfilled?',
      options: [
        'Marks lost for BS 7671 space factor breach',
        'Straight runs, flush lids, secure fixings',
        'Fail for safety and specification breach',
        '40% - it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s the largest weighting',
      ],
      correctAnswer: 0,
      explanation:
        'Overfilling breaches BS 7671 space factor requirements and results in mark deduction for non-compliance with regulations.',
    },
    {
      id: 5,
      question: 'Why must conduit edges be deburred?',
      options: [
        'For visual appearance only',
        'To prevent cable insulation damage',
        'Makes installation faster',
        'Only required by some assessors',
      ],
      correctAnswer: 1,
      explanation:
        'Deburring prevents cable insulation damage from sharp edges, ensuring safety and demonstrating professional workmanship standards.',
    },
    {
      id: 6,
      question: 'True or false: You can use tape to hold cables in tray.',
      options: [
        'True - any securing method works',
        'True - if it looks professional',
        'False - only approved clips/ties allowed',
        'True - for temporary holding only',
      ],
      correctAnswer: 2,
      explanation:
        'False - only approved clips and cable ties should be used. Insulation tape is not an acceptable cable securing method in tray systems.',
    },
    {
      id: 7,
      question: 'Give one common error candidates make with bends in conduit:',
      options: [
        'Making bends too slowly',
        'Using too many bends per run',
        'Not marking bend positions',
        'Kinking or creating uneven bends',
      ],
      correctAnswer: 3,
      explanation:
        'Kinking or creating uneven bends is a common error that loses marks for poor workmanship and can damage cables during installation.',
    },
    {
      id: 8,
      question: 'What must be maintained into every accessory termination?',
      options: [
        'Cable sheath maintained into accessories',
        'Spare cores for expansion',
        'Cable length for future modifications',
        'Original cable packaging labels',
      ],
      correctAnswer: 0,
      explanation:
        'Cable sheath must be maintained into accessories to prevent conductor exposure and demonstrate professional termination techniques.',
    },
    {
      id: 9,
      question: "If segregation is missing between LV and ELV circuits, what's the consequence?",
      options: [
        'To prevent cable insulation damage',
        'Fail for safety and specification breach',
        'Straight runs, flush lids, secure fixings',
        '40% - it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s the largest weighting',
      ],
      correctAnswer: 1,
      explanation:
        'Missing segregation between LV and ELV circuits violates safety requirements and specification compliance, resulting in assessment failure.',
    },
    {
      id: 10,
      question: "What's the golden rule before cutting trunking/conduit?",
      options: [
        'Check you have spare material',
        'Ensure cutting tools are sharp',
        'Measure twice, cut once',
        "Mark the manufacturer's details",
      ],
      correctAnswer: 2,
      explanation:
        'Measure twice, cut once prevents waste and ensures accurate installation meeting specification requirements exactly.',
    },
    {
      id: 11,
      question: 'What percentage of AM2 marks typically relates to specification compliance?',
      options: [
        "20% - it's a minor factor",
        '10% - workmanship is more important',
        '60% - it dominates assessment',
        "40% - it's the largest weighting",
      ],
      correctAnswer: 3,
      explanation:
        'Specification compliance carries approximately 40% weighting in AM2 assessment - the largest single marking criteria.',
    },
    {
      id: 12,
      question: 'What tolerance do assessors typically allow for containment positioning?',
      options: [
        '±5mm for exact positioning requirements',
        'No tolerance - exact positioning required',
        '±50mm for non-critical positions',
        '±20mm if installation looks professional',
      ],
      correctAnswer: 0,
      explanation:
        'Assessors typically allow ±5mm tolerance for positioning - beyond this results in mark deduction for specification non-compliance.',
    },
  ];

  const learningOutcomes = [
    'Select the correct cable type and size in line with the AM2 spec and BS 7671',
    'Install trunking, conduit, and tray neatly and securely',
    'Maintain segregation of circuits where required',
    'Apply bending and fixing techniques to professional standards',
    'Anticipate exactly what assessors are checking when they mark containment work',
    "Avoid the common errors listed in NET's Pre-Assessment Manual",
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
            eyebrow="Module 3 · Section 1"
            title="Cable Selection and Containment (Trunking, Conduit, Tray)"
            description="Essential guide to cable selection and containment systems for AM2 - trunking, conduit, tray installation and assessment requirements."
            tone="yellow"
          />

          <TLDR
            points={[
              'On AM2 day the spec gives you the cable size and the containment route — your job is to install it exactly as drawn, not redesign it.',
              'Workmanship is what the assessor photographs: square cuts, flush lids, deburred edges, even saddle spacing, sheath into every accessory.',
              'Segregation between LV and ELV is a hard rule — mixing them in the same trunking compartment is a fail.',
              'Space factor (45% trunking, 40% mixed, 31% single-cable conduit) is checked — overfilled containment loses marks even if everything else is perfect.',
              'Measure twice, cut once. A short trunking run with a gap under the lid is the easiest mark you can throw away.',
            ]}
          />

          <CommonMistake
            title="CRITICAL: Cable Selection and Containment Are Non-Negotiable"
            whatHappens="In the AM2 your installation task will involve selecting the correct cables and installing them within containment systems such as trunking, conduit, and cable tray. The assessor is looking for two things: Correctness - cables and containment must match the drawings and the written specification exactly. Workmanship - neat, safe, and compliant installation in line with BS 7671 and IET 'workmanlike' standards. This section is where poor preparation shows: wrong cable type/size, messy containment, or not following dimensions are among the most common reasons candidates fail the installation section."
            doInstead="Work through this section methodically — every standard below is non-negotiable for AM2 success."
          />

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="Equipment & Documentation Requirements">
            <p>
              <strong>Essential Tools & Equipment</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable strippers and termination tools</li>
              <li>Trunking cutters and deburring tools</li>
              <li>Conduit benders and cutting equipment</li>
              <li>Measuring tools (tape measure, spirit level)</li>
              <li>Fixings and fasteners for containment systems</li>
            </ul>
            <p>
              <strong>Essential References</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>AM2 drawings and written specifications</li>
              <li>BS 7671 cable tables and installation methods</li>
              <li>Manufacturer's installation instructions</li>
              <li>Cable selection guides and space factor charts</li>
              <li>NET assessment criteria and marking scheme</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="1. Cable Selection in AM2">
            <p>
              <strong>Specification Compliance.</strong> Match the specification exactly - you'll be
              told what size and type (e.g. 2.5 mm² T&E for ring, 4 mm² radial, flex for motor).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Derating factors don't come into play in AM2 (assessors want you to follow the spec,
                not recalc)
              </li>
              <li>Cables must be free from damage (no nicks in insulation)</li>
              <li>Correctly identified (L/N/E clearly visible)</li>
              <li>Terminated neatly and securely</li>
              <li>Sheath maintained into all accessories and connection points</li>
              <li>No substitutions - 2.5mm² specified means 2.5mm² installed</li>
            </ul>
            <p>
              <strong>Common Cable Types in AM2 — Power Circuits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1.5mm² T&E - Lighting circuits (6A MCB)</li>
              <li>2.5mm² T&E - Socket radials (20A MCB)</li>
              <li>2.5mm² T&E - Ring finals (32A MCB)</li>
              <li>4.0mm² T&E - Cooker radials (32A MCB)</li>
              <li>6.0mm² T&E - Shower circuits (40A MCB)</li>
            </ul>
            <p>
              <strong>Special Applications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>3-core & earth - Two-way switching</li>
              <li>1.5mm² flex - Pendant lights</li>
              <li>2.5mm² flex - Portable equipment</li>
              <li>2.5mm² SY cable - Motor control circuits</li>
              <li>4.0mm² SWA cable - Motor feeders (outdoor/industrial)</li>
              <li>Cat6 data cable - Network points</li>
              <li>Fire-rated cable - Fire alarm circuits</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Critical Cable Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Correct size as per specification (no substitutions allowed)</li>
              <li>Appropriate cable type for installation method and environment</li>
              <li>Proper colour identification throughout installation</li>
              <li>Undamaged insulation and sheathing (inspect before installation)</li>
              <li>Current-carrying capacity matches or exceeds circuit protection</li>
              <li>Voltage rating appropriate for system (300/500V minimum for T&E)</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <div className="my-6">
            <VideoCard
              url={videos.containmentVsClipping.url}
              title={videos.containmentVsClipping.title}
              channel={videos.containmentVsClipping.channel}
              duration={videos.containmentVsClipping.duration}
              topic="Containment choice on the AM2 rig"
              caption={
                <>
                  Craig's take on when to clip vs containment on a typical AM2-style install — the
                  same decision you'll make on the day depending on the rig spec you're handed.
                </>
              }
            />
          </div>

          <div className="my-6">
            <h3 className="text-ios-headline font-semibold text-elec-yellow mb-3">
              Try the calculator — voltage drop check on your AM2 cable
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mb-3">
              The AM2 spec gives you the cable size, but assessors expect you to know whether it
              stays within the BS 7671 voltage drop limits (3% lighting, 5% other) over the route
              length. Drop in your circuit current and route length and confirm the chosen cable
              passes.
            </p>
            <VoltageDropCalculator />
          </div>

          <ConceptBlock title="2. Containment Systems: What Assessors Expect">
            <p>
              Containment systems protect cables and demonstrate professional workmanship. Assessors
              focus on three key areas: compliance with installation standards, quality of
              workmanship, and adherence to safety requirements.
            </p>
            <p>
              <strong>Trunking Systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Straight runs, cut square, burrs removed</li>
              <li>Lids flush, no gaps, screws aligned</li>
              <li>Cables not overfilled - comply with space factor</li>
              <li>Correct segregation for LV and ELV circuits</li>
              <li>Joints properly made with couplers</li>
              <li>End caps fitted where required</li>
              <li>Support spacing per manufacturer specs</li>
            </ul>
            <p>
              <strong>Conduit Systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Neat bends - no kinking or flattening</li>
              <li>Saddles evenly spaced (300-600mm apart)</li>
              <li>Boxes aligned level and square</li>
              <li>Bushes fitted, no sharp edges exposed</li>
              <li>Pull boxes every 10m maximum</li>
              <li>Maximum 2 x 90° bends per run</li>
              <li>Threads cut clean on steel conduit</li>
            </ul>
            <p>
              <strong>Cable Tray:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Runs level and properly supported</li>
              <li>Correct clips or ties (no insulation tape)</li>
              <li>No sharp edges against cables</li>
              <li>Consistent spacing of support fixings</li>
              <li>Cable segregation maintained on tray</li>
              <li>Tray joints properly made</li>
              <li>Load calculations considered</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">
                Space Factor Requirements — Trunking & Tray:
              </strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single cable type: 45% fill factor</li>
              <li>Mixed cable types: 40% fill factor</li>
              <li>Consider cable outer diameter</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Conduit Systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single cable: 31% fill factor</li>
              <li>Two cables: 43% fill factor</li>
              <li>Three or more: 40% fill factor</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

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
                On the AM2 rig this is the clause behind every grommet, every bush, every saddle and
                every clip. Sharp edges in conduit, an unbushed knockout in a metal back box, or a
                cable taking the strain at a pulled-in tray fixing — all fail this reg.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 522.6.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 522.6.201"
            clause={
              <>
                "A cable installed under a floor or above a ceiling shall be run in such a position
                that it is not liable to be damaged by contact with the floor or ceiling or their
                fixings. A cable passing through a joist within a floor or ceiling construction or
                through a ceiling support (for example, under floorboards), shall: (a) be installed
                at least 50 mm measured vertically from the top, or bottom as appropriate, of the
                joist or batten; or (b) comply with Regulation 522.6.204."
              </>
            }
            meaning={
              <>
                If your AM2 rig has a joist run, drill at least 50 mm from the top or bottom — or
                use mechanical protection / earthed metallic containment per 522.6.204. Drilling
                straight through the centre of a joist 20 mm down is the textbook fail.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 522.6.201."
          />

          <ConceptBlock title="3. What the Assessor Checks (NET Guidance)">
            <p>
              <strong>Assessment Focus Areas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Accuracy to drawing/spec:</strong> Heights, positions, routes, and
                terminations exactly as shown
              </li>
              <li>
                <strong>Workmanship:</strong> Is it neat, straight, aligned? Cables not twisted,
                sheath maintained into accessories
              </li>
              <li>
                <strong>Compliance:</strong> Correct cable types, correct containment fixings, no
                breaches of BS 7671
              </li>
              <li>
                <strong>Safety:</strong> Grommets/bushes used, no exposed sharp edges, boxes secure
              </li>
            </ul>
            <p>
              <strong>Mark Allocation — Pass Standard:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Specification compliance (40%)</li>
              <li>Workmanship quality (30%)</li>
              <li>Safety compliance (20%)</li>
              <li>Completion time (10%)</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="4. Common Errors in AM2 Containment Tasks (NET 'Common Errors' List)">
            <p>
              <strong className="text-elec-yellow">Critical Errors That Cause Failure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Using wrong cable type/size</li>
              <li>Poor segregation in trunking</li>
              <li>Kinked or uneven conduit bends</li>
              <li>Leaving sharp edges on cut trunking/conduit</li>
              <li>Not securing tray properly</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Mark-Losing Mistakes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Accessories fixed off-level</li>
              <li>Overfilled trunking</li>
              <li>Poor measurement and marking out</li>
              <li>Inconsistent fixing spacing</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Real AM2 Failure Examples:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Candidate completed installation electrically correct but conduit bends were kinked
                - lost marks for workmanship
              </li>
              <li>
                Candidate forgot to segregate data cable from power in trunking - failed segregation
                requirement
              </li>
              <li>
                Candidate measured once and cut trunking short - left gap under lid - lost marks
              </li>
              <li>
                Candidate drilled tray fixing too close to edge of brick - fixing pulled out -
                unsafe support
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="5. Practical Guidance for Candidates">
            <p>
              <strong>Pre-Installation Checklist:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Read the spec twice before starting</li>
              <li>Mark out routes and positions clearly</li>
              <li>Dry fit first - lay trunking/conduit before cutting</li>
              <li>Measure twice, cut once</li>
              <li>Check cable types and sizes against spec</li>
            </ol>
            <p>
              <strong>Installation Best Practices:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cut trunking/conduit square and deburr every edge</li>
              <li>Bend slowly and evenly - practice with conduit benders</li>
              <li>Use correct fixing spacing, keep all screws straight</li>
              <li>Keep cables straight, no twists</li>
              <li>Always maintain sheath into accessories</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Self-Assessment Question:</strong> Check as you
              go: "Would an assessor photograph this as good practice or poor practice?"
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="6. Assessment Criteria and Mark Allocations">
            <p>
              <strong className="text-elec-yellow">Pass Criteria:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>100% specification compliance</li>
              <li>Professional workmanship standards</li>
              <li>Correct cable types and sizes</li>
              <li>Neat, secure containment installation</li>
              <li>Proper segregation maintained</li>
              <li>All edges deburred and safe</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Failure Points:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Wrong cable size/type used</li>
              <li>Poor workmanship (kinked bends, misaligned)</li>
              <li>Segregation breaches</li>
              <li>Sharp edges left on containment</li>
              <li>Insecure fixings or overfilled systems</li>
              <li>Non-compliance with drawings</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[4]} />

          <ConceptBlock title="7. Professional Standards and Industry Expectations">
            <p>
              The standards expected in AM2 mirror real industry requirements where specification
              compliance and workmanship quality are non-negotiable.
            </p>
            <p>
              <strong className="text-elec-yellow">Industry Consequences:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Contract non-compliance penalties</li>
              <li>Insurance claims voided</li>
              <li>Safety certification failures</li>
              <li>Rework costs and delays</li>
              <li>Professional reputation damage</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Professional Benefits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Specification compliance confidence</li>
              <li>Quality workmanship reputation</li>
              <li>Reduced callback and fault rates</li>
              <li>Enhanced career progression</li>
              <li>Industry recognition and trust</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Real-World Examples">
            <p>
              <strong className="text-elec-yellow">Failure Examples:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Example 1:</strong> Candidate completed installation electrically correct
                but conduit bends were kinked. Lost marks for workmanship.
              </li>
              <li>
                <strong>Example 2:</strong> Candidate forgot to segregate data cable from power in
                trunking. Failed segregation requirement.
              </li>
              <li>
                <strong>Example 3:</strong> Candidate measured once and cut trunking short. Left gap
                under lid - lost marks.
              </li>
              <li>
                <strong>Example 4:</strong> In real life, an apprentice drilled a tray fixing too
                close to edge of brick. Fixing pulled out - unsafe support. Same mistake loses marks
                in AM2.
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Industry Applications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hospital Project:</strong> Segregation requirements critical for medical
                equipment interference prevention
              </li>
              <li>
                <strong>Data Centre:</strong> Cable tray systems requiring precise spacing and
                professional appearance for client acceptance
              </li>
              <li>
                <strong>Industrial Installation:</strong> Conduit systems needing robust protection
                and proper earthing for safety certification
              </li>
              <li>
                <strong>Commercial Office:</strong> Trunking systems requiring easy access for
                future modifications and maintenance
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Summary">
            <p>
              In AM2, cable selection and containment are about compliance and workmanship. The
              assessor wants to see:
            </p>
            <p>
              <strong>Essential Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Correct cable types and sizes exactly as per spec</li>
              <li>Containment systems installed straight, square, and burr-free</li>
              <li>Proper segregation, secure fixings, and safe terminations</li>
              <li>Work that looks professional and "workmanlike"</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Failure Causes:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Messy work and shortcuts</li>
              <li>Wrong cables or non-specification compliance</li>
              <li>Poor containment installation</li>
              <li>Safety breaches and workmanship failures</li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Golden Rule:</strong> Follow the specification
              exactly, maintain professional workmanship standards, and prioritise compliance over
              speed.
            </p>
          </ConceptBlock>

          <Scenario
            title="The trunking is 30 mm short — do you swap the run or fudge a coupler?"
            situation={
              <>
                You measured your steel trunking run from the DB to the first dado box, cut it,
                fitted it — and you can see daylight under the lid where the trunking stops 30 mm
                short of the box. You've already used the offcut for a different drop. There's a
                spare 1 m length on the bench.
              </>
            }
            whatToDo={
              <>
                Swap the short run for a fresh cut from the spare length. Coupling a 30 mm offcut in
                just to bridge the gap looks rushed, leaves an unnecessary joint, and the assessor
                will photograph it. Take the 5-minute hit, cut a clean replacement, deburr the ends,
                and refit. Square cut, lid flush, gap closed.
              </>
            }
            whyItMatters={
              <>
                Workmanship marks live on these decisions. NET assessors are explicitly looking for
                "straight runs, flush lids, secure fixings" — a coupler shoved in to hide a
                measuring error fails all three at once. Reg 522.6.1 also expects the wiring system
                to be selected and erected to minimise mechanical stress; an extra unnecessary joint
                is the opposite of that.
              </>
            }
          />

          <FAQ
            items={[
              {
                question:
                  "Do I have to calculate cable size on AM2, or just install what's on the spec?",
                answer:
                  "Just install what's on the spec — exactly. AM2 isn't a design exam. The drawing tells you 2.5 mm² ring, 1.5 mm² lighting, 6 mm² shower; your job is to install that, neatly, in the containment shown. No derating, no recalculation. Substituting 2.5 mm² where 4 mm² is specified is an automatic mark loss even if the circuit would work.",
              },
              {
                question: 'How tight is the space factor — do assessors actually count cables?',
                answer:
                  "They don't count individual cables, but they will spot an obviously overstuffed trunking. Rule of thumb: 45% fill for single cable type, 40% mixed, 31% for one cable in conduit, 40% for three or more. If the lid won't go flush because cables are bulging out, you're over the space factor — and the lid going on flat is what the assessor sees first.",
              },
              {
                question: 'What does "segregation" actually mean on the AM2 rig?',
                answer:
                  'Mains (LV) and ELV (data, fire alarm, intruder, telecoms) cannot share the same trunking compartment. Either run them in separate trunking, use a partitioned trunking with the divider fitted, or use separate conduit. Cat6 next to a 230 V T&E in the same compartment with no partition is a section fail — both for safety and spec compliance.',
              },
              {
                question: 'How do I avoid kinking conduit on a bend?',
                answer:
                  "Bend slowly, lubricate the former, and don't try to do it in one pass — pull the bender through gradually. For 20 mm steel conduit on the AM2 rig, work it in small increments and check the radius against the former. A kinked or flattened bend can't be unbent — you'll be cutting that piece off and starting again, which costs you 10 minutes you can't afford.",
              },
              {
                question: 'Do I need to deburr plastic conduit, or just steel?',
                answer:
                  "Both. The point of deburring isn't about the conduit material — it's about the cable insulation that has to slide past the cut edge. PVC conduit cut with a hacksaw leaves a sharp internal lip just like steel does. A quick swipe with a deburring tool or even a half-round file takes 5 seconds and protects the sheath. Assessors will catch a sharp edge with a fingernail.",
              },
              {
                question: 'Can I use cable ties or insulation tape to hold cables on tray?',
                answer:
                  "Cable ties — yes (UV-stable for outdoor, properly tensioned, ends trimmed). Insulation tape — no, never. Tape is not a recognised cable support. On tray, use proper cleats or cable ties at the spacing called for in the spec, and trim the tie ends flush so they don't snag. Tape on tray is an automatic workmanship mark loss and looks unprofessional in the photographs.",
              },
            ]}
          />

          <KeyTakeaways
            points={[
              'Install exactly to spec — cable size, type and route. AM2 is a workmanship test, not a design exercise.',
              "Square cuts, deburred edges, flush lids, even saddle spacing (300–600 mm) — that's what the assessor photographs.",
              "Space factor: 45% trunking single cable, 40% mixed, 31% single-cable conduit. If the lid won't sit flat, you're over.",
              'LV and ELV must be segregated — separate trunking, partitioned trunking, or separate conduit. No exceptions.',
              'Reg 522.6.1 — minimise mechanical stress (grommets, bushes, supports). Reg 522.6.201 — at least 50 mm from joist edges.',
              'Sheath maintained into every accessory. No bare cores visible outside any termination.',
            ]}
          />

          <Quiz questions={quizQuestions} title="Cable Selection and Containment Quiz" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module 3 Overview
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module3/section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Power Circuits
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module3Section1;
