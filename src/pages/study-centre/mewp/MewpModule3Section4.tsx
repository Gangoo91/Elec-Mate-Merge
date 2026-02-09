import {
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertTriangle,
  HardHat,
  Eye,
  Search,
  Link2,
  ClipboardCheck,
  Calendar,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'restraint-vs-arrest',
    question:
      'Why is a work RESTRAINT system preferred over a fall ARREST system when working from a boom-type MEWP?',
    options: [
      'Restraint harnesses are cheaper to purchase',
      'Restraint prevents the operator reaching a fall position, avoiding arrest forces on the MEWP structure and stability issues',
      'Fall arrest systems are illegal in the UK',
      'Restraint lanyards are longer and give more freedom of movement',
    ],
    correctIndex: 1,
    explanation:
      'Work restraint keeps the operator inside the platform by preventing them from reaching a position where they could fall. Fall arrest catches the fall after it starts, generating significant forces that MEWP anchor points may not be rated for, and potentially affecting machine stability. The pendulum effect is also a serious risk with fall arrest on MEWPs.',
  },
  {
    id: 'harness-inspection-priority',
    question:
      'During a pre-use harness inspection, you notice pulled stitching on one of the shoulder straps. What should you do?',
    options: [
      'Use the harness but avoid heavy loads',
      'Tape over the damaged area and continue',
      'Immediately withdraw the harness from service and report the defect',
      'Continue using it until the next formal inspection',
    ],
    correctIndex: 2,
    explanation:
      'Any damage found during a pre-use inspection means the harness must be immediately withdrawn from service. Pulled or broken stitching is a critical defect that compromises the structural integrity of the harness. The defect must be reported, the harness tagged as defective, and a replacement obtained before work continues.',
  },
  {
    id: 'ppe-chin-strap',
    question:
      'When working at height from a MEWP, why must a hard hat be fitted with a chin strap?',
    options: [
      "To comply with the manufacturer's warranty requirements",
      'To prevent the hard hat falling from height and injuring persons below, and to keep it in place if the operator is jolted',
      'Chin straps are only required above 10 metres',
      'To match the colour coding system used on site',
    ],
    correctIndex: 1,
    explanation:
      "A chin strap prevents the hard hat from falling off the operator's head when working at height. A hard hat falling from a MEWP platform could seriously injure anyone below. The strap also keeps the hat in place if the operator is jolted by sudden platform movement, wind gusts, or contact with objects.",
  },
];

const faqs = [
  {
    question: 'Do I always need to wear a harness when using a scissor lift?',
    answer:
      'Not always. Harness use on scissor lifts (Group A machines) is determined by the task-specific risk assessment. Because scissor lifts have an enclosed platform and no catapult effect, the risk of ejection is significantly lower than with boom-type MEWPs. However, a harness may be required if guardrails are removed for access, if you are reaching outside the platform, or if site-specific rules mandate it. Always follow the risk assessment and site requirements.',
  },
  {
    question: 'Can I attach my lanyard to the guardrail of the MEWP basket?',
    answer:
      'No. You must NEVER attach your lanyard to the guardrails. Guardrails are not designed or rated as anchor points and could fail under load, pulling the guardrail out and removing the edge protection entirely. Always attach only to the manufacturer-provided anchor point within the basket, which is specifically designed and rated for the purpose.',
  },
  {
    question:
      'What happens if my harness has been involved in a fall arrest event but looks undamaged?',
    answer:
      'The harness must be immediately withdrawn from service, even if there is no visible damage. Fall arrest forces can cause internal damage to webbing fibres and overstress hardware components in ways that are not visible on external inspection. The harness must be returned to the manufacturer or a competent person for detailed examination before any decision is made about continued use. In most cases, harnesses involved in a fall arrest event are destroyed.',
  },
  {
    question: 'How long does a harness last before it must be replaced?',
    answer:
      "There is no single answer — it depends on the manufacturer's recommendations, the frequency and conditions of use, and the results of formal inspections. Most manufacturers recommend a maximum service life of 5 to 10 years from the date of first use (or date of manufacture if unused). However, a harness must be withdrawn from service at any time if damage is found, if it fails a formal inspection, or if the labels are no longer legible. Always check the manufacturer's guidance for the specific harness model.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the PRIMARY purpose of a work restraint system on a MEWP?',
    options: [
      'To catch the operator after they fall from the platform',
      'To prevent the operator from reaching a position where they could fall',
      'To attach the operator to a structure outside the platform',
      'To allow the operator to lean further out of the basket',
    ],
    correctAnswer: 1,
    explanation:
      'A work restraint system prevents the operator from getting into a fall position in the first place. The lanyard is short enough that the operator cannot reach over or climb on the guardrails. This is fundamentally different from fall arrest, which catches a fall after it has started.',
  },
  {
    id: 2,
    question:
      'For which MEWP types is wearing a work restraint harness STRONGLY RECOMMENDED at all times?',
    options: [
      'All scissor lifts (Group A)',
      'Boom-type MEWPs only (Groups 3B and 1B)',
      'Only truck-mounted platforms',
      'Harnesses are never recommended for MEWPs',
    ],
    correctAnswer: 1,
    explanation:
      'Boom-type MEWPs (IPAF categories 3B and 1B) present a significant risk of operator ejection due to the catapult effect caused by boom movement. A work restraint harness and short lanyard are strongly recommended at all times when operating boom-type machines.',
  },
  {
    id: 3,
    question:
      'Which British/European Standard applies to full body harnesses used for work at height?',
    options: ['BS EN 280', 'BS EN 361', 'BS EN 354', 'BS EN 795'],
    correctAnswer: 1,
    explanation:
      'BS EN 361 is the standard for full body harnesses. BS EN 354 covers lanyards, BS EN 280 covers MEWP design, and BS EN 795 covers anchor devices. A harness used on a MEWP should conform to BS EN 361 and the accompanying lanyard to BS EN 354.',
  },
  {
    id: 4,
    question: "When fitting a harness, the 'two-finger rule' applies to which adjustment?",
    options: [
      'Shoulder strap tension',
      'Chest strap buckle position',
      'Leg strap tightness',
      'Lanyard length',
    ],
    correctAnswer: 2,
    explanation:
      'The two-finger rule applies to the leg straps: once adjusted, you should be able to fit two fingers (flat) between the strap and your leg. This ensures the straps are snug enough to hold the operator securely but not so tight as to restrict circulation or cause discomfort during extended use.',
  },
  {
    id: 5,
    question: 'Where must you attach your lanyard when working from a MEWP basket?',
    options: [
      'To the guardrail of the basket',
      'To a nearby structural steel beam or scaffold',
      'To the manufacturer-provided anchor point within the basket only',
      'To any strong point that looks secure',
    ],
    correctAnswer: 2,
    explanation:
      "You must ONLY attach to the manufacturer-provided anchor point within the MEWP basket. Guardrails are not rated as anchor points. Structures outside the platform create a risk of being pulled from the basket or the pendulum effect. The manufacturer's anchor point is specifically designed and tested for the intended loading.",
  },
  {
    id: 6,
    question:
      'How often must a harness undergo formal inspection by a competent person (typical manufacturer recommendation)?',
    options: ['Every week', 'Every month', 'Every 6 to 12 months', 'Only before first use'],
    correctAnswer: 2,
    explanation:
      'Most manufacturers recommend formal inspection by a competent person at intervals of every 6 to 12 months, depending on frequency and conditions of use. This is in addition to the daily pre-use visual inspection that must be carried out by the operator before every use.',
  },
  {
    id: 7,
    question: 'Why is fall arrest generally NOT recommended for use on MEWPs?',
    options: [
      'Fall arrest harnesses are too heavy for MEWP use',
      'Lack of suitable anchor points rated for arrest forces, effects on MEWP stability, and risk of pendulum effect',
      'Fall arrest is only for use on scaffolding',
      'The HSE has banned all fall arrest equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Fall arrest is not generally recommended on MEWPs for three key reasons: (1) MEWP anchor points may not be rated for the significant forces generated during a fall arrest, (2) the dynamic forces could affect MEWP stability and potentially cause overturning, and (3) the pendulum effect could swing the operator into the MEWP structure or other hazards.',
  },
  {
    id: 8,
    question:
      'Which of the following is NOT a reason to immediately withdraw a harness from service?',
    options: [
      'Frayed webbing found during pre-use inspection',
      'The harness was involved in a fall arrest event with no visible damage',
      'The harness label shows the last formal inspection was 4 months ago',
      "The manufacturer's recommended maximum service life has been exceeded",
    ],
    correctAnswer: 2,
    explanation:
      "A harness with a formal inspection only 4 months ago is within the typical 6-12 month inspection interval and does not need to be withdrawn for that reason alone. All the other options — frayed webbing, involvement in a fall arrest event (even without visible damage), and exceeding the manufacturer's service life — all require immediate withdrawal from service.",
  },
];

export default function MewpModule3Section4() {
  useSEO({
    title: 'Fall Protection, Harnesses & PPE | MEWP Module 3.4',
    description:
      'Work restraint vs fall arrest, harness requirements by MEWP type, selecting and fitting harnesses, pre-use inspection, anchor points, PPE requirements, and formal inspection programmes for MEWP operators.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <Shield className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 3 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fall Protection, Harnesses &amp; PPE
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Work restraint versus fall arrest, harness selection, fitting and inspection, anchor
            points, and the full range of PPE required for safe MEWP operations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>RESTRAINT:</strong> Prevents getting into a fall position
              </li>
              <li>
                <strong>Booms (3B/1B):</strong> Harness strongly recommended at all times
              </li>
              <li>
                <strong>Inspect:</strong> Before every use + formal every 6&ndash;12 months
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Attach:</strong> Only to manufacturer&rsquo;s anchor point in basket
              </li>
              <li>
                <strong>Lanyard:</strong> Short enough to stay inside the platform
              </li>
              <li>
                <strong>PPE:</strong> Hard hat with chin strap, hi-vis, boots, gloves
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Distinguish between work restraint and fall arrest systems',
              'Explain harness requirements for boom-type vs scissor lift MEWPs',
              'Describe the correct procedure for fitting a full body harness',
              'Carry out a thorough pre-use harness inspection',
              'Identify correct anchor points and lanyard adjustment on MEWPs',
              'List the PPE requirements for MEWP operations',
              'Explain the formal harness inspection programme and withdrawal criteria',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Work Restraint vs Fall Arrest */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Work Restraint vs Fall Arrest
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding the difference between work <strong>restraint</strong> and fall{' '}
                <strong>arrest</strong> is one of the most critical safety concepts for MEWP
                operators. These are fundamentally different systems with entirely different
                purposes, and confusing them can have fatal consequences.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Key Definitions</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-green-400">Work Restraint</p>
                    <p className="text-sm text-white/80">
                      A system that <strong>prevents</strong> the operator from getting into a
                      position where they could fall. The lanyard is short enough to keep the
                      operator inside the platform at all times. The operator{' '}
                      <strong>cannot reach</strong> the edge of the platform in a way that would
                      allow a fall.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-400">Fall Arrest</p>
                    <p className="text-sm text-white/80">
                      A system that <strong>catches</strong> the fall after it has started. The
                      operator is allowed to reach a fall position, and the system then arrests the
                      fall via a shock absorber or inertia reel, limiting the forces on the body.
                      The operator <strong>does fall</strong> before the system engages.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical: MEWPs Primarily Use RESTRAINT Systems
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Fall arrest is <strong className="text-white">NOT generally recommended</strong>{' '}
                  for MEWPs. The three principal reasons are:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Anchor point loading:</strong> MEWP anchor
                      points may not be rated for the significant dynamic forces generated during a
                      fall arrest event
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">MEWP stability:</strong> The sudden dynamic
                      forces of a fall arrest could affect machine stability and potentially cause
                      overturning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pendulum effect:</strong> If the operator falls
                      over the side, the swing path could cause them to strike the MEWP structure,
                      boom, or other obstacles
                    </span>
                  </li>
                </ul>
              </div>

              {/* Two-Column Comparison */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-3">
                    Work Restraint (Preferred for MEWPs)
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Prevents the fall from occurring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Short lanyard keeps operator inside platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>No dynamic fall forces on anchor point</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>No pendulum swing risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>No shock absorber required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>No rescue from suspension needed</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-3">
                    Fall Arrest (Not Recommended for MEWPs)
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Catches the fall after it starts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Operator falls before system engages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Generates significant forces on anchor point</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Risk of pendulum effect</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Requires shock absorber or deceleration device</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Immediate rescue from suspension required</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Harness Requirements by Machine Type */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Harness Requirements by Machine Type
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The requirement for harness use on a MEWP depends on the type of machine. Boom-type
                MEWPs carry a significantly higher ejection risk than scissor lifts, and the
                guidance reflects this difference.
              </p>

              {/* Boom-Type MEWPs */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Boom-Type MEWPs (Categories 3B &amp; 1B)
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Work restraint harness and lanyard{' '}
                  <strong className="text-white">STRONGLY RECOMMENDED at all times</strong>. Boom
                  movement can eject operators from the platform &mdash; the &ldquo;catapult
                  effect&rdquo; occurs when the boom moves suddenly, causing the platform to
                  accelerate and the operator&rsquo;s body to be thrown outwards.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Full body harness conforming to{' '}
                      <strong className="text-white">BS EN 361</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Short restraint lanyard conforming to{' '}
                      <strong className="text-white">BS EN 354</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Lanyard must be short enough to{' '}
                      <strong className="text-white">PREVENT</strong> the wearer from getting into a
                      fall position
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Attach to{' '}
                      <strong className="text-white">
                        manufacturer-provided anchor point within the basket ONLY
                      </strong>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Scissor Lifts */}
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Scissor Lifts (Categories 3A &amp; 1A)
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Harness use is{' '}
                  <strong className="text-white">
                    determined by the task-specific risk assessment
                  </strong>
                  . Scissor lifts are generally considered lower risk because they have an enclosed
                  platform and no catapult effect.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Generally lower ejection risk than boom-type machines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Platform rises vertically with no boom-induced movement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>May be required when working near edge with guardrail removed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>May be required when reaching outside the platform boundary</span>
                  </li>
                </ul>
              </div>

              {/* Comparison Grid */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 text-xs sm:text-sm">
                  <div className="p-3 bg-white/10 font-medium text-white border-b border-white/10">
                    Requirement
                  </div>
                  <div className="p-3 bg-white/10 font-medium text-red-400 border-b border-l border-white/10">
                    Boom (3B/1B)
                  </div>
                  <div className="p-3 bg-white/10 font-medium text-blue-400 border-b border-l border-white/10">
                    Scissor (3A/1A)
                  </div>

                  <div className="p-3 text-white/80 border-b border-white/10">Harness worn</div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    Strongly recommended always
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    By risk assessment
                  </div>

                  <div className="p-3 text-white/80 border-b border-white/10">Ejection risk</div>
                  <div className="p-3 text-red-300 font-medium border-b border-l border-white/10">
                    HIGH (catapult effect)
                  </div>
                  <div className="p-3 text-green-300 font-medium border-b border-l border-white/10">
                    LOW (enclosed platform)
                  </div>

                  <div className="p-3 text-white/80 border-b border-white/10">System type</div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    Work restraint
                  </div>
                  <div className="p-3 text-white/80 border-b border-l border-white/10">
                    Work restraint (if required)
                  </div>

                  <div className="p-3 text-white/80">Lanyard length</div>
                  <div className="p-3 text-white/80 border-l border-white/10">
                    Short &mdash; stay inside platform
                  </div>
                  <div className="p-3 text-white/80 border-l border-white/10">
                    Short &mdash; stay inside platform
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Selecting and Fitting a Harness */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Selecting and Fitting a Harness
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A full body harness for MEWP use must conform to <strong>BS EN 361</strong>. It must
                be the correct size for the operator, with fully adjustable straps to achieve a
                secure, comfortable fit. An incorrectly fitted harness can be ineffective or
                dangerous.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">
                  Fitting Procedure &mdash; Step by Step
                </p>
                <div className="space-y-3">
                  {[
                    {
                      step: '1',
                      title: 'Step into leg loops',
                      desc: 'Hold the harness by the dorsal D-ring and allow the leg straps to hang down. Step into the leg loops, one foot at a time.',
                    },
                    {
                      step: '2',
                      title: 'Pull harness up over shoulders',
                      desc: 'Pull the harness up your body and over both shoulders, like putting on a rucksack. Ensure the straps are not twisted.',
                    },
                    {
                      step: '3',
                      title: 'Fasten chest strap',
                      desc: 'Connect and fasten the chest strap across the front of the chest. Position it at mid-chest level (sternum height).',
                    },
                    {
                      step: '4',
                      title: 'Adjust shoulder straps',
                      desc: 'Tighten the shoulder straps so the harness sits snugly on the shoulders without riding up. The dorsal D-ring should sit between the shoulder blades.',
                    },
                    {
                      step: '5',
                      title: 'Adjust leg straps (two-finger rule)',
                      desc: 'Tighten the leg straps so they are firm but not restrictive. You should be able to fit two flat fingers between the strap and your leg.',
                    },
                    {
                      step: '6',
                      title: 'Connect lanyard',
                      desc: 'Attach the lanyard to the rear dorsal D-ring or front sternal D-ring as specified by the manufacturer. Connect the other end to the MEWP anchor point.',
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-sm text-white/80">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                The accompanying lanyard must conform to <strong>BS EN 354</strong> and must be
                short enough for restraint only. It should prevent the operator from reaching over
                or climbing on guardrails. Typical restraint lanyard lengths range from 1.0&nbsp;m
                to 1.8&nbsp;m depending on platform size.
              </p>

              {/* Harness Components Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Full Body Harness &mdash; Key Components
                </p>
                <div className="relative max-w-xs mx-auto">
                  {/* Harness figure using styled divs */}
                  <div className="relative w-full" style={{ minHeight: '340px' }}>
                    {/* Head indicator */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-10 h-10 rounded-full border-2 border-white/30" />

                    {/* Shoulder straps */}
                    <div className="absolute left-1/2 -translate-x-[18px] top-10 w-2 h-20 bg-amber-500/60 rounded-sm transform -rotate-6" />
                    <div className="absolute left-1/2 translate-x-[2px] top-10 w-2 h-20 bg-amber-500/60 rounded-sm transform rotate-6" />

                    {/* Dorsal D-ring (back) */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[52px]">
                      <div className="w-5 h-5 rounded-full border-2 border-elec-yellow bg-elec-yellow/20" />
                    </div>

                    {/* Chest strap */}
                    <div className="absolute left-1/2 -translate-x-[22px] top-[75px] w-11 h-2 bg-teal-500/60 rounded-sm" />

                    {/* Sternal D-ring (front) */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[72px]">
                      <div className="w-4 h-4 rounded-full border-2 border-teal-400 bg-teal-400/20" />
                    </div>

                    {/* Body trunk */}
                    <div className="absolute left-1/2 -translate-x-[14px] top-[80px] w-7 h-24 border-2 border-white/20 rounded-md" />

                    {/* Waist/sub-pelvic strap */}
                    <div className="absolute left-1/2 -translate-x-[22px] top-[200px] w-11 h-2 bg-purple-500/60 rounded-sm" />

                    {/* Leg loops */}
                    <div className="absolute left-1/2 -translate-x-[22px] top-[210px] w-2 h-20 bg-orange-500/60 rounded-sm transform rotate-3" />
                    <div className="absolute left-1/2 translate-x-[6px] top-[210px] w-2 h-20 bg-orange-500/60 rounded-sm transform -rotate-3" />

                    {/* Lanyard from dorsal D-ring */}
                    <div className="absolute left-1/2 translate-x-[16px] top-[44px] w-1.5 h-16 bg-green-500/60 rounded-sm transform rotate-[25deg]" />
                    <div className="absolute left-1/2 translate-x-[36px] top-[32px]">
                      <div className="w-3 h-3 rounded-sm border-2 border-green-400 bg-green-400/20" />
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-amber-500/60" />
                      <span className="text-xs text-white/80">Shoulder straps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-teal-500/60" />
                      <span className="text-xs text-white/80">Chest strap</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-elec-yellow bg-elec-yellow/20" />
                      <span className="text-xs text-white/80">Dorsal D-ring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-teal-400 bg-teal-400/20" />
                      <span className="text-xs text-white/80">Sternal D-ring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-orange-500/60" />
                      <span className="text-xs text-white/80">Leg loops</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-green-500/60" />
                      <span className="text-xs text-white/80">Lanyard attachment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-purple-500/60" />
                      <span className="text-xs text-white/80">Sub-pelvic strap</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Pre-Use Harness Inspection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Pre-Use Harness Inspection
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before <strong>each and every use</strong>, the operator must carry out a thorough
                visual and tactile inspection of the harness, lanyard, and connectors. This pre-use
                check is your first line of defence against equipment failure. Any defect means the
                harness must be immediately withdrawn from service.
              </p>

              {/* Inspection Checklist */}
              <div className="space-y-3">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Search className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Webbing Inspection</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    {[
                      'Cuts or tears in the webbing material',
                      'Fraying or abraded areas along edges or surfaces',
                      'Chemical damage (discolouration, stiffness, softening)',
                      'UV degradation (fading, brittleness, powdery surface)',
                      'Pulled, broken, or loose stitching',
                      'Burns, heat damage, or scorch marks',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ClipboardCheck className="h-4 w-4 text-amber-400/70 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Search className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Hardware Inspection</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    {[
                      'Buckles: functioning correctly, no corrosion, no distortion',
                      'D-rings: no cracks, no corrosion, no distortion or deformation',
                      'Connectors/karabiners: gate opens and closes freely, locking mechanism works correctly',
                      'All rivets and attachment points secure and undamaged',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ClipboardCheck className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Search className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Lanyard Inspection</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    {[
                      'Overall condition of lanyard material (no cuts, fraying, or damage)',
                      'Length adjustment mechanism working correctly',
                      'Shock absorber condition (if fitted) — no deployment, no damage',
                      'Connector condition at both ends — gates, locks, and springs functional',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ClipboardCheck className="h-4 w-4 text-green-400/70 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">Labels &amp; Anchor Point</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    {[
                      'Labels legible — manufacturer, model, standard, serial number',
                      "Within manufacturer's recommended service life",
                      'Last formal inspection date visible and current',
                      'MEWP anchor point: undamaged, securely mounted, no corrosion or distortion',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ClipboardCheck className="h-4 w-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">If ANY Defect Is Found</p>
                </div>
                <p className="text-sm text-white/80">
                  Immediately withdraw the harness or lanyard from service. Tag it as defective so
                  that no one else uses it. Report the defect to your supervisor. Do{' '}
                  <strong className="text-white">NOT</strong> attempt to repair the equipment
                  yourself. Obtain a replacement before starting work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Anchor Points and Lanyard Adjustment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Anchor Points &amp; Lanyard Adjustment
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Correct anchor point selection and lanyard adjustment are essential for the
                restraint system to work as intended. Using an incorrect anchor point or an overly
                long lanyard defeats the entire purpose of the restraint system and may create
                additional hazards.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Anchor Point Rules &mdash; Non-Negotiable
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-green-400">DO:</strong> Attach{' '}
                      <strong className="text-white">ONLY</strong> to the manufacturer-provided
                      anchor point within the MEWP basket
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-green-400">DO:</strong> Verify the anchor point is
                      rated for the intended use
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-green-400">DO:</strong> Inspect the anchor point for
                      damage and corrosion before each use
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-red-400">NEVER:</strong> Attach to guardrails &mdash;
                      they are not designed as anchor points
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-red-400">NEVER:</strong> Attach to structures outside
                      the platform (steel beams, scaffolding, building elements)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-red-400">NEVER:</strong> Use improvised anchor points
                      (tied ropes, clamps, bolts)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Link2 className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Lanyard Length Adjustment</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Adjust so the operator{' '}
                      <strong className="text-white">
                        cannot reach over or climb on the guardrails
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      For restraint: lanyard typically{' '}
                      <strong className="text-white">1.0&nbsp;m to 1.8&nbsp;m</strong> depending on
                      platform size and anchor point position
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Shorter is generally better &mdash; provides more positive restraint
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Check lanyard does not create a trip hazard on the platform floor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Test the range of movement after connecting &mdash; can you reach the platform
                      controls comfortably while staying inside the guardrails?
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Why Not Attach Outside the Platform?</strong>{' '}
                  Attaching to a structure outside the MEWP basket (such as structural steelwork)
                  creates two serious risks. First, if the MEWP moves or lowers unexpectedly, the
                  operator could be pulled from the basket by the lanyard. Second, if the operator
                  falls, the pendulum effect could swing them into the MEWP structure or other
                  obstacles with severe force.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Other PPE Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Other PPE Requirements
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond the harness and lanyard, additional PPE is required for MEWP operations. The
                specific PPE requirements are determined by the task-specific risk assessment, but
                the following items are commonly required on most sites.
              </p>

              {/* PPE Grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30">
                      <HardHat className="h-5 w-5 text-amber-400" />
                    </div>
                    <p className="text-sm font-medium text-amber-400">Hard Hat</p>
                  </div>
                  <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Protection from falling objects and overhead impact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Chin strap required</strong> when working at
                        height
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/30">
                      <Eye className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-sm font-medium text-green-400">
                      High-Visibility Vest/Jacket
                    </p>
                  </div>
                  <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Visibility to other site personnel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Visibility to vehicular and plant traffic</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30">
                      <Shield className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-sm font-medium text-blue-400">Safety Boots</p>
                  </div>
                  <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Steel or composite toe cap protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ankle support and non-slip sole</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30">
                      <Shield className="h-5 w-5 text-purple-400" />
                    </div>
                    <p className="text-sm font-medium text-purple-400">Gloves</p>
                  </div>
                  <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Grip for tools and controls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Protection from materials and fluids</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-500/30">
                      <Eye className="h-5 w-5 text-teal-400" />
                    </div>
                    <p className="text-sm font-medium text-teal-400">Eye Protection</p>
                  </div>
                  <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Required if task involves grinding, cutting, or drilling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Protection from debris, dust, and sparks</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/30">
                      <Shield className="h-5 w-5 text-red-400" />
                    </div>
                    <p className="text-sm font-medium text-red-400">Hearing Protection</p>
                  </div>
                  <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Required if noise levels exceed action values</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ear plugs or ear defenders as appropriate</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Remember:</strong> PPE is the{' '}
                  <strong>last line of defence</strong>, not the first. All PPE requirements should
                  be determined by the task-specific risk assessment. The hierarchy of control
                  always applies &mdash; eliminate the hazard first, then use engineering controls,
                  then administrative controls, and only then specify PPE for any remaining residual
                  risks.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Formal Harness Inspection Programme */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Formal Harness Inspection Programme
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond the daily pre-use checks carried out by the operator, harnesses and lanyards
                require a <strong>formal inspection by a competent person</strong> at regular
                intervals. This is a more detailed examination than the daily check, carried out by
                someone with specific training in harness inspection.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Formal Inspection Requirements
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Carried out by a <strong className="text-white">competent person</strong>{' '}
                      trained in harness inspection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      At intervals defined by the manufacturer &mdash; typically every{' '}
                      <strong className="text-white">6 to 12 months</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      More frequent inspection may be needed for heavy use or harsh environments
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Records must be kept</strong> &mdash; date,
                      inspector name, findings, pass/fail, next inspection date
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Inspection records must be available for audit by the HSE or other enforcing
                      authority
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Immediate Withdrawal from Service
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  A harness must be withdrawn from service immediately if any of the following
                  apply:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Any damage found</strong> during pre-use or
                      formal inspection &mdash; cuts, fraying, corrosion, distortion, or any other
                      defect
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Involved in a fall arrest event</strong>{' '}
                      &mdash; even if there is no visible damage, internal fibre damage may have
                      occurred
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Manufacturer&rsquo;s recommended service life exceeded
                      </strong>{' '}
                      &mdash; regardless of apparent condition
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Labels no longer legible</strong> &mdash; if
                      you cannot read the manufacturer, standard, serial number, or inspection
                      information, the harness must be withdrawn
                    </span>
                  </li>
                </ul>
              </div>

              {/* Inspection Timeline Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Harness Inspection Timeline
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex-shrink-0">
                      <span className="text-green-400 text-xs font-bold">DAILY</span>
                    </div>
                    <div className="flex-1 h-1 bg-gradient-to-r from-green-500/40 to-blue-500/40 rounded" />
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex-shrink-0">
                      <span className="text-blue-400 text-xs font-bold">6-12M</span>
                    </div>
                    <div className="flex-1 h-1 bg-gradient-to-r from-blue-500/40 to-amber-500/40 rounded" />
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex-shrink-0">
                      <span className="text-amber-400 text-xs font-bold">LIFE</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-xs text-green-400 font-medium">Pre-Use Check</p>
                      <p className="text-xs text-white/60">By operator</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-400 font-medium">Formal Inspection</p>
                      <p className="text-xs text-white/60">By competent person</p>
                    </div>
                    <div>
                      <p className="text-xs text-amber-400 font-medium">Service Life Limit</p>
                      <p className="text-xs text-white/60">Manufacturer&rsquo;s max</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Good Practice:</strong> Keep a harness
                  register that records every harness in your organisation, its serial number, date
                  of first use, formal inspection dates, and maximum service life date. This makes
                  it easy to track inspection schedules and ensure no harness is used beyond its
                  service life. Many organisations use a colour-coded tag system where the tag
                  colour changes with each formal inspection to provide a quick visual check.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-4">
              Next: Module 4: Safe Operating
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
