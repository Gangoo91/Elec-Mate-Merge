/**
 * Module 3 · Section 4 — Termination, connections, and circuit labelling
 * AM2 day-prep — AM2 Phase B (composite installation: cable, containment, circuits, terminations)
 * No exposed copper, the right torque, the right sleeving — and every circuit clearly labelled.
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
  TLDR,
  RegsCallout,
  Scenario,
  KeyTakeaways,
  FAQ,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Termination, Connections, and Circuit Labelling | AM2 Module 3.4 | Elec-Mate';
const DESCRIPTION =
  'Tight, sleeved, no exposed copper — and every circuit labelled. The terminations and labelling that earn marks on the AM2.';

const AM2Module3Section4 = () => {
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
      id: 'termination-standards',
      question: 'What is the most critical requirement for conductor terminations?',
      options: [
        'Using the correct cable size',
        'Tight terminal connections only',
        'No exposed copper beyond terminals',
        'Proper cable routing',
      ],
      correctIndex: 2,
      explanation:
        'No exposed copper beyond terminals is critical for safety - prevents short circuits, electric shock, and ensures compliance with BS7671 Section 526.',
    },
    {
      id: 'cpc-sleeving',
      question: 'When is CPC sleeving required?',
      options: [
        'It requires preparation and deepens understanding',
        'Everywhere - including plastic accessories',
        'Enhanced IP ratings and RCD protection',
        'If one circuit fails, others continue to work',
      ],
      correctIndex: 1,
      explanation:
        'CPC sleeving is mandatory everywhere according to BS7671, including plastic accessories. This ensures proper identification and compliance.',
    },
    {
      id: 'swa-glands',
      question: 'What provides the earthing connection for SWA cable armour?',
      options: [
        'Banjo washer and earthing connection',
        'Appropriate mechanical protection is provided',
        'Self-declaration without evidence',
        'The rate of flow of charge past a point',
      ],
      correctIndex: 0,
      explanation:
        'The banjo washer provides the crucial earthing connection for SWA cable armour, ensuring continuity and safety.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What BS 7671 section covers requirements for electrical connections?',
      options: [
        'Section 512',
        'Section 526',
        'Section 541',
        'Section 559',
      ],
      correctAnswer: 1,
      explanation:
        'Section 526 of BS 7671 covers electrical connections and terminations, setting out requirements for secure and safe connections.',
    },
    {
      id: 2,
      question: 'Why must conductor insulation run up to the terminal?',
      options: [
        'High humidity typically reduces insulation resistance',
        'To ensure visibility and operability during power failures',
        'To prevent short circuits and maintain safety',
        'To contain and protect cables and wiring',
      ],
      correctAnswer: 2,
      explanation:
        'Insulation must run up to terminals to prevent exposed copper which could cause short circuits, electric shock, or arc faults.',
    },
    {
      id: 3,
      question: 'In AM2 assessment, CPC sleeving is required:',
      options: [
        'To convert millivolts (mV) into volts (V).',
        'Add capacitors to offset inductive effects',
        'Cognitive Behavioural Therapy',
        'Everywhere, including plastic accessories',
      ],
      correctAnswer: 3,
      explanation:
        'CPC sleeving is mandatory everywhere in AM2 - including plastic accessories. This demonstrates understanding of BS7671 requirements.',
    },
    {
      id: 4,
      question: "What's the purpose of a banjo washer in an SWA gland?",
      options: [
        'Earthing connection for the armour',
        'Knowledge, Skills, and Attitudes',
        'BACnet, Modbus, KNX, or DALI for lighting',
        'The reciprocal of resistance',
      ],
      correctAnswer: 0,
      explanation:
        'The banjo washer provides the earthing connection for the SWA cable armour, ensuring electrical continuity and safety.',
    },
    {
      id: 5,
      question: 'Why must no copper be left exposed outside terminals?',
      options: [
        'Affects product compliance requirements',
        'Risk of short circuit and shock',
        'A measure of the sharpness of resonance',
        'A to G (with A being most efficient)',
      ],
      correctAnswer: 1,
      explanation:
        'Exposed copper creates serious risks: short circuits, electric shock, arc faults, and fails NET workmanship standards.',
    },
    {
      id: 6,
      question: 'What is the most common DB termination error in AM2?',
      options: [
        'Using correct cable sizes',
        'Neat cable dressing',
        'CPC connected to neutral bar',
        'Proper labelling',
      ],
      correctAnswer: 2,
      explanation:
        'Connecting CPC to neutral bar is a serious error - non-compliant with BS 7671 and results in immediate failure.',
    },
    {
      id: 7,
      question: 'What type of screwdriver should you use in a DB?',
      options: [
        'Branch resistance and applied voltage',
        'To allow safe shutdown of dangerous processes',
        'A persistent fault still exists on the circuit',
        'Torque screwdriver for critical connections',
      ],
      correctAnswer: 3,
      explanation:
        'Torque screwdrivers ensure connections meet manufacturer specifications and demonstrate professional standards expected in AM2.',
    },
    {
      id: 8,
      question: 'How should you label circuits in a distribution board?',
      options: [
        'Permanent, legible labels',
        'No labelling needed',
        'Pencil markings',
        'Masking tape and pen',
      ],
      correctAnswer: 0,
      explanation:
        "Labels must be permanent and legible - pencil markings fade and temporary tape doesn't meet professional standards.",
    },
    {
      id: 9,
      question: 'What cable preparation error causes most AM2 failures?',
      options: [
        'Isolation and lock-off procedures',
        'Over-stripped insulation exposing copper',
        'A contactor (the first contactor in the circuit)',
        'Expansion joints and flexible supports',
      ],
      correctAnswer: 1,
      explanation:
        'Over-stripped cables with exposed copper is the #1 termination error - creates safety risks and fails workmanship checks.',
    },
    {
      id: 10,
      question: 'What marking strategy saves marks in AM2?',
      options: [
        'Label everything at the end',
        'Use temporary labels',
        'Label as you go during installation',
        "Label only what's specified",
      ],
      correctAnswer: 2,
      explanation:
        'Labelling as you go prevents rushing at the end, ensures nothing is missed, and demonstrates systematic working methods.',
    },
  ];

  const learningOutcomes = [
    'Execute professional terminations meeting BS7671 Section 526 requirements',
    'Apply correct CPC sleeving and conductor identification in all situations',
    'Master SWA cable gland installation and armour earthing techniques',
    'Implement systematic labelling strategies for circuit identification',
    'Avoid the critical errors that cause 70% of AM2 termination failures',
    'Understand NET assessment criteria and assessor expectations',
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
            eyebrow="Module 3 · Section 4"
            title="Termination, Connections, and Circuit Labelling"
            description="Professional workmanship standards and NET compliance requirements for AM2 assessment - master terminations, connections and labelling for assessment success."
            tone="yellow"
          />

          <TLDR
            points={[
              "Terminations are where AM2 days are won or lost. The assessor opens every accessory and lifts the DB lid — what's underneath either passes or fails you.",
              'Reg 526.1 — durable continuity, mechanical strength, protection. Reg 526.5 — every joint inside a proper accessory or enclosure, no bare connectors in voids.',
              'Sheath into every accessory. CPC sleeved green/yellow at every termination, including plastic ones. No bare copper outside any terminal.',
              'DB: line into MCB/RCBO, neutral into neutral bar (right RCD side if split-board), CPC into earth bar — never crossed.',
              'SWA: gland tight, banjo washer fitted, CPC tail to earth terminal, armour visibly clamped.',
              'Label every circuit at the DB with permanent labels — pencil marks and masking tape lose marks.',
            ]}
          />

          <CommonMistake
            title="CRITICAL: Terminations Determine AM2 Success or Failure"
            whatHappens="Poor terminations are the #1 cause of AM2 failures. Even if your circuits work perfectly, exposed copper, loose connections, or missing labels will fail you. The assessor opens every accessory, checks every connection, and examines every label. There are no second chances. Perfect terminations require systematic preparation, correct tools, and understanding of NET standards. Rush this section and you risk everything."
            doInstead="Slow down at every termination — strip to the right length, sleeve every CPC, torque every terminal, and label as you go."
          />

          <LearningOutcomes outcomes={learningOutcomes} />

          <ConceptBlock title="NET Assessment Criteria - What Assessors Check">
            <p>
              <strong>Primary Assessment Areas (Pass/Fail):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Exposed copper beyond terminals</strong> - Immediate fail. Any visible
                copper creates shock/short circuit risk.
              </li>
              <li>
                <strong>CPC not sleeved or connected</strong> - Safety critical failure. Required
                everywhere, including plastic accessories.
              </li>
              <li>
                <strong>Loose or insecure connections</strong> - Fire/safety risk. Must be
                mechanically and electrically sound.
              </li>
              <li>
                <strong>Incorrect polarity in DB</strong> - Fundamental error. CPC to neutral bar =
                automatic fail.
              </li>
            </ul>
            <p>
              <strong>Secondary Assessment (Marks Deduction):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Poor cable preparation/stripping</strong> - Workmanship marks. Nicked
                insulation, incorrect strip lengths.
              </li>
              <li>
                <strong>Untidy cable dressing</strong> - Professional standards. Cables crossing,
                poor routing, excessive length.
              </li>
              <li>
                <strong>Missing or poor labelling</strong> - Identification requirements. Pencil
                marks, temporary labels, illegible text.
              </li>
              <li>
                <strong>Conductor damage during installation</strong> - Care and skill. Damaged
                insulation, kinked conductors.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="1. General Termination Standards (BS 7671, Section 526)">
            <p>
              <strong>Core Requirements - Non-Negotiable:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Conductors electrically and mechanically sound.</strong> Secure connections
                that won't work loose over time.
              </li>
              <li>
                <strong>No bare copper visible outside terminals.</strong> Critical safety
                requirement - prevents shock and short circuits.
              </li>
              <li>
                <strong>Insulation runs up to terminal.</strong> Proper cable preparation with
                correct strip lengths.
              </li>
              <li>
                <strong>CPC sleeving correctly applied.</strong> Green/yellow identification on all
                CPC conductors.
              </li>
              <li>
                <strong>Correct torque values applied.</strong> Manufacturer specifications met for
                critical connections.
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Professional Tips:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Strip cables using proper strippers - avoid damaging conductor insulation</li>
              <li>Cut conductors to exact length - no bunching or excessive length in terminals</li>
              <li>
                Use torque screwdrivers for DB connections - demonstrates professional standards
              </li>
              <li>Check terminations twice - once during installation, once before energising</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

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
                "Durable" is the AM2 word. Tight today isn't enough — the connection has to stay
                tight after thermal cycling. That's why you torque to spec, why you don't double
                flex into a single rigid terminal, and why the assessor will give a screw a gentle
                pull-test. Loose, hand-tight or over-crushed terminations all fail this clause.
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
                Every joint on AM2 has to live inside a proper accessory or enclosure — full stop. A
                connector block taped up and pushed into a void fails this reg, even if the
                connection itself is sound. If you can't reach an outlet in one cable run, your
                joint goes inside a BS 4662 box or a BS 5733 maintenance-free junction box, fixed
                and accessible.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 526.5."
          />

          <ConceptBlock title="2. Accessory Terminations (Sockets, Switches, Cooker Outlets)">
            <p>
              <strong>Step-by-Step Accessory Termination:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable preparation.</strong> Strip outer sheath to allow cable entry into
                accessory (typically 15-20mm). Sheath must enter the accessory - no excessive
                stripping.
              </li>
              <li>
                <strong>CPC identification.</strong> Apply green/yellow sleeving to CPC - required
                in ALL accessories including plastic ones. No exceptions in AM2.
              </li>
              <li>
                <strong>Conductor preparation.</strong> Cut conductors to correct length - no
                twisting or bunching. Allow enough length for secure termination without stress.
              </li>
              <li>
                <strong>Terminal connections.</strong> Tighten terminals firmly without
                over-tightening. Multiple conductors must be neat and equally secure.
              </li>
            </ol>
            <p>
              <strong className="text-elec-yellow">Common Accessory Errors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Over-stripped cable sheath</strong> - Exposes cable outside accessory
              </li>
              <li>
                <strong>CPC not sleeved in plastic accessories</strong> - Still required for
                identification
              </li>
              <li>
                <strong>Twisted or damaged conductors</strong> - Poor workmanship and safety risk
              </li>
              <li>
                <strong>Loose terminal connections</strong> - Creates arcing and fire risk
              </li>
              <li>
                <strong>Mixed up Line/Neutral</strong> - Polarity error affects RCD protection
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="3. Distribution Board (DB) Terminations - Critical Assessment Area">
            <p>
              <strong>DB Termination Sequence:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Verify circuit/MCB matching.</strong> Check drawing - correct cable size in
                correct protective device. Ring circuits in 32A, lighting in 6A/10A, etc.
              </li>
              <li>
                <strong>Prepare cable entries.</strong> Use proper cable entries. Strip cables to
                correct length. Plan cable routes to avoid crossing.
              </li>
              <li>
                <strong>Line conductor termination.</strong> Into MCB/RCBO terminal. Ensure full
                insertion and correct torque. No copper visible outside terminal.
              </li>
              <li>
                <strong>Neutral conductor termination.</strong> Into neutral bar only. NEVER into
                earth bar. Apply blue identification if required.
              </li>
              <li>
                <strong>CPC termination.</strong> Into earth bar only with green/yellow sleeving.
                Ensure mechanical continuity throughout installation.
              </li>
              <li>
                <strong>Cable dressing and labelling.</strong> Dress cables neatly. Apply permanent
                labels to each circuit. No temporary markings.
              </li>
            </ol>
            <p>
              <strong className="text-elec-yellow">DB Errors That Cause Immediate Failure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CPC connected to neutral bar</strong> - Fundamental polarity error
              </li>
              <li>
                <strong>Wrong cable in wrong MCB</strong> - Circuit protection mismatch
              </li>
              <li>
                <strong>Exposed copper in terminals</strong> - Safety critical failure
              </li>
              <li>
                <strong>Loose connections</strong> - Creates arcing, overheating, fire risk
              </li>
              <li>
                <strong>Cables crossing untidily</strong> - Poor workmanship, access issues
              </li>
              <li>
                <strong>No circuit identification</strong> - Doesn't meet BS7671 requirements
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Professional DB Standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Use torque screwdriver</strong> - Demonstrates professional approach
              </li>
              <li>
                <strong>Plan cable routes</strong> - Avoid cables crossing each other
              </li>
              <li>
                <strong>Label as you go</strong> - Prevents errors and saves time
              </li>
              <li>
                <strong>Check polarity twice</strong> - Before and after termination
              </li>
              <li>
                <strong>Dress cables systematically</strong> - Group by function, neat presentation
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="4. SWA Cable Terminations - Advanced Techniques">
            <p>
              <strong>SWA Termination Process:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable preparation.</strong> Mark and cut outer sheath to correct length.
                Remove armour carefully without damaging cores. Clean armour ends.
              </li>
              <li>
                <strong>Gland assembly.</strong> Thread gland components onto cable in correct
                order. Ensure banjo washer is properly positioned for armour contact.
              </li>
              <li>
                <strong>Armour clamping.</strong> Clamp armour securely in gland. No loose strands.
                Armour must make good electrical contact with banjo washer.
              </li>
              <li>
                <strong>Earthing connection.</strong> Connect CPC to banjo washer or separate earth
                terminal. This provides the armour earthing path.
              </li>
              <li>
                <strong>Seal and secure.</strong> Tighten gland assembly to IP rating requirements.
                Check cable strain relief and weatherproofing.
              </li>
            </ol>
            <p>
              <strong className="text-elec-yellow">SWA Common Issues:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Loose armour strands</strong> - Can cause short circuits or poor earthing
              </li>
              <li>
                <strong>Damaged core insulation</strong> - Often occurs during armour removal
              </li>
              <li>
                <strong>Poor armour-banjo contact</strong> - Results in high earth loop impedance
              </li>
              <li>
                <strong>Under-tightened gland</strong> - Allows moisture ingress and movement
              </li>
              <li>
                <strong>Missing earth connection</strong> - Armour not properly earthed
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="5. Circuit Identification and Labelling">
            <p>
              <strong>Systematic Labelling Strategy:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Label as you install.</strong> Don't leave labelling until the end. Mark
                cables and circuits during installation to prevent confusion.
              </li>
              <li>
                <strong>Distribution board circuits.</strong> Each protective device must be clearly
                labelled with the circuit it protects (e.g., "Ring Main Kitchen", "Lights Ground
                Floor").
              </li>
              <li>
                <strong>Conductor identification.</strong> Label conductors where multiple circuits
                are present in same area. Use permanent markers or proper labels.
              </li>
              <li>
                <strong>Accessory labelling.</strong> Label isolators, switches, and special outlets
                as specified in drawings (e.g., "Cooker Isolator", "Emergency Stop").
              </li>
              <li>
                <strong>Verification and durability.</strong> Check all labels are legible,
                permanent, and accurately describe the circuits. No temporary markings allowed.
              </li>
            </ol>
            <p>
              <strong className="text-elec-yellow">Labelling Mistakes That Lose Marks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pencil markings</strong> - Not permanent, will fade
              </li>
              <li>
                <strong>Masking tape and pen</strong> - Temporary and unprofessional
              </li>
              <li>
                <strong>Illegible handwriting</strong> - Can't be read by assessor
              </li>
              <li>
                <strong>Generic labels</strong> - "Circuit 1" instead of descriptive names
              </li>
              <li>
                <strong>Missing labels</strong> - Circuits not identified in DB
              </li>
              <li>
                <strong>Wrong information</strong> - Labels don't match actual circuits
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Professional Labelling Standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Use label maker or permanent markers</strong> - Professional appearance
              </li>
              <li>
                <strong>Descriptive circuit names</strong> - "Kitchen Sockets", "Upstairs Lights"
              </li>
              <li>
                <strong>Consistent naming convention</strong> - Follow pattern throughout
                installation
              </li>
              <li>
                <strong>Multiple language where required</strong> - Symbols plus text if specified
              </li>
              <li>
                <strong>Weatherproof labels outdoors</strong> - Survive environmental conditions
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="6. Common Assessment Failures - NET Data Analysis">
            <p>
              <strong>Top 10 Termination Failures (NET Statistics):</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Over-stripped cables (42% of failures).</strong> Exposed copper beyond
                terminals - immediate safety failure.
              </li>
              <li>
                <strong>CPC not sleeved (38% of failures).</strong> Particularly in plastic
                accessories where candidates assume it's not needed.
              </li>
              <li>
                <strong>Polarity errors in DB (31% of failures).</strong> CPC in neutral bar,
                line/neutral confusion.
              </li>
              <li>
                <strong>Loose terminal connections (29% of failures).</strong> Insufficient
                tightening or damaged terminals.
              </li>
              <li>
                <strong>Poor SWA gland installation (24% of failures).</strong> Armour not properly
                clamped or earthed.
              </li>
            </ol>
            <p>
              <strong className="text-elec-yellow">Assessment Recovery Strategy.</strong> If you
              make a termination error during assessment:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Acknowledge immediately</strong> - Don't try to hide mistakes
              </li>
              <li>
                <strong>Rectify systematically</strong> - Fix the root cause, not just symptoms
              </li>
              <li>
                <strong>Check similar connections</strong> - Prevent recurring errors
              </li>
              <li>
                <strong>Document the fix</strong> - Show understanding of the issue
              </li>
              <li>
                <strong>Test thoroughly</strong> - Prove the repair is effective
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Section Summary - Key Takeaways">
            <p>
              <strong className="text-elec-yellow">Critical Success Factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>No exposed copper</strong> - Fundamental safety requirement
              </li>
              <li>
                <strong>CPC sleeving everywhere</strong> - Including plastic accessories
              </li>
              <li>
                <strong>Correct polarity in DB</strong> - CPC and neutral in correct bars
              </li>
              <li>
                <strong>Systematic labelling</strong> - As you go, not at the end
              </li>
              <li>
                <strong>Professional tools</strong> - Proper strippers, torque screwdrivers
              </li>
            </ul>
            <p>
              <strong className="text-elec-yellow">Remember for Assessment Day:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>The assessor will inspect every connection you make</li>
              <li>Poor terminations can fail you even if circuits work correctly</li>
              <li>Label circuits as you install them - saves time and prevents errors</li>
              <li>Use proper tools - demonstrates professional competence</li>
              <li>Check your work twice - once during installation, once before energising</li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="The assessor lifts the DB lid and finds a CPC in the neutral bar"
            situation={
              <>
                You've finished wiring the DB. Six circuits in, you're tired, you've been swapping
                between line, neutral and earth tails and the lid is closed. The assessor opens it,
                scans the bars, and points at one circuit's CPC sat in the neutral bar. Everything
                else is correct.
              </>
            }
            whatToDo={
              <>
                Acknowledge it immediately, isolate the supply, lift the misplaced conductor, drop
                it into the correct bar, and re-tighten. Then check every other CPC and neutral — if
                you mixed one, you might have mixed another. Don't try to defend the mistake. The
                recovery — calm, methodical, full check — is what an assessor wants to see.
              </>
            }
            whyItMatters={
              <>
                CPC in the neutral bar disconnects the circuit's earth path entirely. On a fault,
                the casing of an accessory could go to mains potential with no return path through
                the MCB — exposed-conductive-parts at 230 V. It's a fundamental polarity error and a
                section fail. The assessor isn't looking to embarrass you — they're checking whether
                you spot and fix safety-critical errors.
              </>
            }
          />

          <FAQ
            items={[
              {
                question: 'How much insulation should I strip back at a terminal?',
                answer:
                  "Just enough that the conductor goes fully into the terminal with no bare copper visible outside it. For most accessory terminals that's 8–12 mm of conductor; for larger DB terminals 10–15 mm. Strip a bit short and the terminal grips insulation, not copper — bad connection, IR fail. Strip a bit long and bare copper is visible — safety fail. Practice on offcuts before the day.",
              },
              {
                question: 'Do I need to sleeve the CPC in a plastic accessory?',
                answer:
                  "Yes. BS 7671 identification rules apply everywhere — a bare CPC in a plastic socket back box still has to be sleeved green/yellow. AM2 statistics show this is one of the most common mark losses (around 38% of failures involve missed CPC sleeving). Apply the sleeving when you're preparing the cable, not at the final termination — saves time and ensures it's never missed.",
              },
              {
                question: 'What torque do I use on MCB and RCBO terminals?',
                answer:
                  "Whatever the manufacturer's data sheet specifies — usually 2.0–2.5 Nm for the line terminal on a domestic-style MCB and 1.0–1.2 Nm for neutral bars. Use a torque screwdriver if you've got one; the assessor will absolutely notice and it demonstrates professional standards. Over-tightening crushes the conductor and fails durability under thermal cycling; under-tightening leaves a loose connection that arcs.",
              },
              {
                question: 'How do I get the SWA armour properly earthed at a gland?',
                answer:
                  "Strip outer sheath to expose the armour, fit the gland body so the armour clamps under the cone — you should see clean armour ends visible inside the gland nut. Slide on the banjo washer between the gland body and the enclosure, then run an earth tail (CPC) from the banjo bolt to the equipment earth terminal. Test continuity from the armour at one end to the earth bar at the other end — should read very low. If it reads high, the banjo isn't biting on the armour properly.",
              },
              {
                question:
                  "What's the right way to label the DB — handwriting on tape, or printed labels?",
                answer:
                  "Permanent, legible, descriptive. A label printer or printed insert in the DB's own labelling strip is best. Permanent marker on a proper label is acceptable. Pencil, masking tape with a Biro, or 'Circuit 1, Circuit 2, Circuit 3' instead of 'Ring Kitchen, Lights Up, Cooker' all lose marks. Label as you wire each circuit, not in the last 5 minutes.",
              },
              {
                question: "How does the assessor decide a connection is 'loose'?",
                answer:
                  "Visual check first — gap visible between conductor and terminal, or insulation pulled into the terminal. Then a gentle pull-test: a finger-and-thumb tug on the conductor should not move it. They might also flick it with a screwdriver tip. A connection that wobbles is a fail under Reg 526.1 (durability + mechanical strength). If you've got any doubt as you wire it, re-do it before they see it.",
              },
            ]}
          />

          <KeyTakeaways
            points={[
              'No bare copper visible outside any terminal — anywhere. This is the #1 termination fail.',
              'CPC sleeved green/yellow at every termination, including in plastic accessories.',
              'Reg 526.1 — durable continuity + mechanical strength. Reg 526.5 — joints inside approved accessories/enclosures only.',
              'DB polarity: line in MCB/RCBO, neutral in neutral bar, CPC in earth bar. Never cross them.',
              'SWA: gland tight, armour clamped, banjo washer fitted, separate earth tail to equipment earth terminal.',
              'Label every circuit at the DB with permanent, legible, descriptive labels. Label as you wire, not at the end.',
            ]}
          />

          <Quiz questions={quizQuestions} title="Termination and Labelling Assessment" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module3/section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Lighting Circuits
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/am2/module3/section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Accuracy & Neatness
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module3Section4;
