import {
  ArrowLeft,
  Settings,
  AlertTriangle,
  BookOpen,
  Crosshair,
  Eye,
  Users,
  Layers,
  Car,
  Shield,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quiz questions (8)                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: "What does the 'A' stand for in the HSE ACTORS mnemonic for MEWP selection?",
    options: ['Altitude', 'Application', 'Assessment', 'Access'],
    correctAnswer: 1,
    explanation:
      'A stands for Application — is the MEWP appropriate for the job? Consider height, outreach, duration, and frequency of the task before selecting a machine.',
  },
  {
    id: 2,
    question: 'Where can the Safe Working Load (SWL) of a MEWP be found?',
    options: [
      "Only in the operator's manual",
      "On the manufacturer's data plate, operator's manual, and decals on the machine",
      'Only on the hire company paperwork',
      'It is calculated on site by the operator',
    ],
    correctAnswer: 1,
    explanation:
      "The SWL is found on the manufacturer's data plate (usually near the controls), in the operator's manual, and on decals affixed to the machine. It is set by the manufacturer, not calculated on site.",
  },
  {
    id: 3,
    question:
      'An operator weighing 90 kg is on the platform with 35 kg of tools and 120 kg of materials. The data plate shows an SWL of 230 kg. What should the operator do?',
    options: [
      'Continue — the load is within limits',
      'Remove 15 kg of materials to bring the load within limits',
      'Cease work and verify — the total of 245 kg exceeds the 230 kg SWL',
      'Redistribute the load to one side of the platform',
    ],
    correctAnswer: 2,
    explanation:
      'Total load = 90 + 35 + 120 = 245 kg, which exceeds the 230 kg SWL by 15 kg. The operator must cease work immediately and reduce the load before continuing. Overloading risks triggering load-sensing cutouts, structural failure, or overturn.',
  },
  {
    id: 4,
    question:
      'Which MEWP type would be most suitable for navigating around obstacles and reaching over structures?',
    options: [
      'Scissor lift (Group A, Type 3A)',
      'Telescopic boom lift (Group B, Type 3B)',
      'Articulating boom lift (Group B, Type 3B)',
      'Trailer-mounted platform (Group B, Type 1B)',
    ],
    correctAnswer: 2,
    explanation:
      'Articulating (knuckle) boom lifts are specifically designed for up-and-over access. Their jointed boom sections allow the platform to navigate around obstacles, parapets, and overhanging structures that a straight telescopic boom cannot reach.',
  },
  {
    id: 5,
    question:
      'Which of the following is NOT a required component of a method statement for MEWP work?',
    options: [
      'Step-by-step task description with hazards and controls',
      'Emergency and rescue procedures',
      'The hire cost of the MEWP',
      'Competencies and training required',
    ],
    correctAnswer: 2,
    explanation:
      'A method statement must include the task steps, hazards, control measures, competency requirements, PPE, emergency procedures, and review dates. The hire cost is a commercial matter and is not part of the safe system of work documentation.',
  },
  {
    id: 6,
    question: 'Before a MEWP arrives on site, which of these tasks should already be completed?',
    options: [
      'Risk assessment, method statement, ground preparation, and rescue plan',
      'Only the risk assessment — everything else can be done when the machine arrives',
      "The operator's PAL card check — nothing else is needed in advance",
      'A telephone call to the hire company',
    ],
    correctAnswer: 0,
    explanation:
      'Before the machine arrives, you must confirm the machine category matches the task, verify operator PAL cards, complete the risk assessment and method statement, prepare the ground, arrange exclusion zone materials, confirm the rescue plan, check for overhead services, and arrange a banksman if required.',
  },
  {
    id: 7,
    question: 'At what sustained wind speed should MEWP operations generally cease?',
    options: [
      '8.0 m/s (Beaufort 4)',
      '10.0 m/s (Beaufort 5)',
      '12.5 m/s (Beaufort 6)',
      '15.0 m/s (Beaufort 7)',
    ],
    correctAnswer: 2,
    explanation:
      "IPAF and most manufacturers set 12.5 m/s (28 mph, approximately Beaufort 6) as the maximum wind speed for MEWP operations. Above this, the machine must be lowered and stowed. Some machines have lower limits — always check the operator's manual.",
  },
  {
    id: 8,
    question: 'When might a MEWP NOT be the most appropriate choice for working at height?',
    options: [
      'When the task involves sustained overhead work at 8 metres',
      'When the task is very short duration at low height and a podium step meets the risk assessment',
      'When you need to reach over an obstacle at 12 metres',
      'When installing ceiling services across a large open area',
    ],
    correctAnswer: 1,
    explanation:
      'For very short duration tasks at low height, simpler equipment such as podium steps or stepladders may be more proportionate if the risk assessment supports this. The hierarchy of control still applies — use the simplest adequate equipment. MEWPs are not always the most proportionate solution.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quick-check questions (3) — placed after sections 2, 4, 6        */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'swl-overload-check',
    question:
      'A MEWP data plate shows SWL 230 kg. Two operators (80 kg each) are on the platform with 65 kg of materials. Is the platform overloaded?',
    options: [
      'No — 225 kg is within the 230 kg SWL',
      'Yes — 225 kg is too close to the limit and should be reduced',
      'Cannot determine without knowing the machine type',
      'No — operator weight does not count towards SWL',
    ],
    correctIndex: 0,
    explanation:
      'Total platform load = 80 + 80 + 65 = 225 kg. This is within the 230 kg SWL, but only just. The platform is NOT overloaded, but with only 5 kg of spare capacity, no additional items should be brought onto the platform. Always include operator body weight in the calculation.',
  },
  {
    id: 'method-statement-check',
    question:
      'A method statement for MEWP work does not include emergency rescue procedures. Is the document adequate?',
    options: [
      'Yes — rescue procedures are only needed for rope access',
      'No — every method statement for MEWP work must include emergency and rescue procedures',
      'Yes — rescue is covered by the general site emergency plan',
      'It depends on the height of the work',
    ],
    correctIndex: 1,
    explanation:
      'Emergency and rescue procedures are a mandatory component of any method statement for MEWP work. If an operator becomes stranded, incapacitated, or the machine fails, a documented rescue plan and trained ground rescue person must be in place BEFORE work begins.',
  },
  {
    id: 'when-not-mewp',
    question:
      'An electrician needs to change a single light fitting at 2.5 metres for a 10-minute task in a dry, level indoor environment. What is the most proportionate access equipment?',
    options: [
      'A scissor lift — it is the safest option',
      'A podium step or step platform, if supported by the risk assessment',
      'A stepladder is never acceptable for any work at height',
      'No access equipment is needed below 3 metres',
    ],
    correctIndex: 1,
    explanation:
      'For a very short duration, low-height task in a controlled indoor environment, a podium step or step platform may be the most proportionate solution if the risk assessment supports it. The hierarchy of control means using the simplest adequate equipment — not always the most complex.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What is the difference between a method statement and a risk assessment?',
    answer:
      'A risk assessment identifies hazards and evaluates the level of risk. A method statement is a step-by-step safe system of work that describes HOW the task will be done safely, referencing the controls identified in the risk assessment. They are companion documents — the risk assessment identifies what could go wrong; the method statement describes how to prevent it. Together they form the SSOW (Safe System of Work).',
  },
  {
    question: 'Do I need a separate method statement for every MEWP task?',
    answer:
      'Yes, unless the tasks are substantially identical in scope, location, and hazards. A generic method statement can be used as a template, but it must be reviewed and amended for each specific task to reflect the actual site conditions, machine type, hazards, and control measures. A method statement that does not reflect the real conditions on site is not worth the paper it is printed on.',
  },
  {
    question: 'Can I use a MEWP that does not match my PAL card category?',
    answer:
      'No. Your IPAF PAL card specifies the categories of MEWP you are trained and authorised to operate. Operating a machine outside your card categories means you are not competent for that machine type, which is a breach of the Work at Height Regulations 2005 and PUWER 1998. If the task requires a category you do not hold, you must either obtain the additional training or another qualified operator must carry out that part of the work.',
  },
  {
    question:
      'What should I do if I arrive on site and the ground conditions are worse than expected?',
    answer:
      'Stop and reassess. Do not proceed with the original plan if ground conditions have changed. Review the risk assessment and method statement. Consider whether the selected MEWP is still suitable — you may need a different machine type, spreader plates, or an alternative access method entirely. If the ground cannot support the MEWP safely, the work must not proceed until conditions are made suitable. Document the change and notify the site supervisor.',
  },
];

/* ------------------------------------------------------------------ */
/*  Border colours for alternating sections                           */
/* ------------------------------------------------------------------ */
const borderColours = [
  'border-elec-yellow/50', // 01
  'border-blue-500/50', // 02
  'border-green-500/50', // 03
  'border-purple-500/50', // 04
  'border-cyan-500/50', // 05
  'border-red-500/50', // 06
];

const numColours = [
  'text-elec-yellow/80',
  'text-blue-400/80',
  'text-green-400/80',
  'text-purple-400/80',
  'text-cyan-400/80',
  'text-red-400/80',
];

const headingColours = [
  'text-elec-yellow',
  'text-blue-300',
  'text-green-300',
  'text-purple-300',
  'text-cyan-300',
  'text-red-300',
];

/* ------------------------------------------------------------------ */
/*  ACTORS card data                                                  */
/* ------------------------------------------------------------------ */
const actorsCards = [
  {
    letter: 'A',
    label: 'Application',
    icon: Crosshair,
    colour: 'elec-yellow',
    borderClass: 'border-elec-yellow/30',
    bgClass: 'bg-elec-yellow/10',
    textClass: 'text-elec-yellow',
    detail:
      'Is the MEWP appropriate for the job? Consider the required working height, horizontal outreach, duration of the task, and frequency of repositioning.',
  },
  {
    letter: 'C',
    label: 'Conditions',
    icon: Layers,
    colour: 'blue-400',
    borderClass: 'border-blue-400/30',
    bgClass: 'bg-blue-400/10',
    textClass: 'text-blue-400',
    detail:
      'Assess ground conditions, surface stability, overturn risk, and whether the work is indoor or outdoor. Consider slopes, nearby excavations, and underground services.',
  },
  {
    letter: 'T',
    label: 'Operators',
    icon: Users,
    colour: 'green-400',
    borderClass: 'border-green-400/30',
    bgClass: 'bg-green-400/10',
    textClass: 'text-green-400',
    detail:
      'Are operators trained, competent, and fit for work? Does each operator hold the correct IPAF PAL card category for the machine being used?',
  },
  {
    letter: 'O',
    label: 'Obstructions',
    icon: Eye,
    colour: 'purple-400',
    borderClass: 'border-purple-400/30',
    bgClass: 'bg-purple-400/10',
    textClass: 'text-purple-400',
    detail:
      'Identify protruding features, overhead hazards (beams, cables, pipework), nearby structures, and anything the platform or boom could strike during operation.',
  },
  {
    letter: 'R',
    label: 'Traffic',
    icon: Car,
    colour: 'cyan-400',
    borderClass: 'border-cyan-400/30',
    bgClass: 'bg-cyan-400/10',
    textClass: 'text-cyan-400',
    detail:
      'Is there passing vehicular or pedestrian traffic? What collision prevention measures are needed — barriers, banksmen, Chapter 8 signage, exclusion zones?',
  },
  {
    letter: 'S',
    label: 'Restraint',
    icon: Shield,
    colour: 'red-400',
    borderClass: 'border-red-400/30',
    bgClass: 'bg-red-400/10',
    textClass: 'text-red-400',
    detail:
      'Is work restraint or fall arrest required? Boom-type MEWPs require a harness and short lanyard as standard. Determine the correct PPE for the machine category.',
  },
];

/* ------------------------------------------------------------------ */
/*  MEWP type comparison data                                         */
/* ------------------------------------------------------------------ */
const mewpTypes = [
  {
    need: 'Vertical access only, large platform, directly below work',
    type: 'Scissor lift',
    category: '3A',
    highlight: 'bg-elec-yellow/10 border-elec-yellow/20',
  },
  {
    need: 'Height + outreach, open area',
    type: 'Telescopic boom',
    category: '3B',
    highlight: 'bg-blue-400/10 border-blue-400/20',
  },
  {
    need: 'Navigate around obstacles, up-and-over access',
    type: 'Articulating boom',
    category: '3B',
    highlight: 'bg-green-400/10 border-green-400/20',
  },
  {
    need: 'Restricted access, indoor/outdoor versatile',
    type: 'Spider lift',
    category: '1B',
    highlight: 'bg-purple-400/10 border-purple-400/20',
  },
  {
    need: 'Highway/utility work, mobile between sites',
    type: 'Vehicle-mounted',
    category: '1B',
    highlight: 'bg-cyan-400/10 border-cyan-400/20',
  },
  {
    need: 'Occasional use, portable',
    type: 'Trailer-mounted',
    category: '1B',
    highlight: 'bg-orange-400/10 border-orange-400/20',
  },
  {
    need: 'Indoor, low height, lightweight',
    type: 'PAV (push-around vertical)',
    category: 'PAV',
    highlight: 'bg-pink-400/10 border-pink-400/20',
  },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */
const MewpModule2Section3 = () => {
  useSEO({
    title: 'Machine Selection & Safe Systems of Work | MEWP Module 2 Section 3',
    description:
      'HSE ACTORS selection criteria, safe working loads, MEWP type comparison, method statement components, planning MEWP operations, and when NOT to use a MEWP.',
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Main Content ───────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <Settings className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 3
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Machine Selection &amp; Safe Systems of Work
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            How to choose the right MEWP for the task and build a robust safe system of work around
            it
          </p>
        </div>

        {/* ────────────────────────────────────────────────────── */}
        {/* SECTION 01 — HSE GEIS6 Selection Criteria (ACTORS)    */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[0]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[0]} text-sm font-normal`}>01</span>
              HSE GEIS6 Selection Criteria &mdash; The ACTORS Mnemonic
            </h2>

            <div className="space-y-4 text-white">
              <p>
                The Health &amp; Safety Executive publication <strong>GEIS6</strong> provides
                guidance on selecting the correct MEWP for a task. It uses the{' '}
                <strong>ACTORS</strong> mnemonic to structure the decision. Every letter represents
                a factor that must be considered before a machine is chosen.
              </p>

              {/* ACTORS cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {actorsCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.letter}
                      className={`${card.bgClass} border ${card.borderClass} rounded-lg p-4`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center ${card.bgClass} border ${card.borderClass}`}
                        >
                          <span className={`font-bold text-lg ${card.textClass}`}>
                            {card.letter}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${card.textClass}`} />
                          <span className={`font-semibold ${card.textClass}`}>{card.label}</span>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">{card.detail}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Point</h3>
                <p className="text-white/80 text-sm">
                  Work through <strong>every</strong> letter of ACTORS before confirming a machine
                  choice. If a single factor is unresolved, do not proceed until it has been
                  addressed. ACTORS feeds directly into the risk assessment and method statement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/* SECTION 02 — Safe Working Load (SWL) & Platform       */}
        {/*              Capacity                                  */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[1]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[1]} text-sm font-normal`}>02</span>
              Safe Working Load (SWL) &amp; Platform Capacity
            </h2>

            <div className="space-y-4 text-white">
              <p>
                Every MEWP has a rated <strong>Safe Working Load (SWL)</strong> stated by the
                manufacturer. The SWL is the maximum combined weight the platform is designed to
                carry, including <strong>all operators, tools, and materials</strong>.
              </p>

              <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[1]} font-medium mb-2`}>Where to Find the SWL</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Manufacturer&rsquo;s data plate:</strong> A metal or durable label
                      affixed to the machine, usually near the platform controls
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Operator&rsquo;s manual:</strong> The handbook that must accompany the
                      machine on site
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Decals on the machine:</strong> Stickers placed at the platform entry
                      point and near the controls
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">SWL Calculation</h3>
                <p className="text-white/80 text-sm mb-3">
                  SWL = combined weight of <strong>operator(s)</strong> + <strong>tools</strong> +{' '}
                  <strong>materials</strong>. Always distribute the load <strong>evenly</strong>{' '}
                  across the platform to prevent unbalanced forces.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-white/80">Operator 1:</span>
                    <span className="text-white font-mono">85 kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-white/80">Operator 2:</span>
                    <span className="text-white font-mono">92 kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-white/80">Power tools:</span>
                    <span className="text-white font-mono">18 kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-white/80">Light fittings:</span>
                    <span className="text-white font-mono">40 kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-2 mt-2">
                    <span className="text-white font-semibold">Total platform load:</span>
                    <span className="text-elec-yellow font-mono font-bold">235 kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-white/80">Data plate SWL:</span>
                    <span className="text-green-400 font-mono">230 kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-white/80">Status:</span>
                    <span className="text-red-400 font-mono font-bold">OVERLOADED by 5 kg</span>
                  </div>
                </div>
                <p className="text-white/60 text-xs mt-3">
                  Even a 5 kg overload is unacceptable. Cease work, remove excess load, and
                  recalculate before resuming.
                </p>
              </div>

              <p>
                If you are <strong>unsure</strong> of the weight of any item on the platform, the
                instruction is clear: <strong>CEASE work and verify</strong>. Do not estimate or
                guess.
              </p>

              {/* Warning box */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Consequences of Overloading</h3>
                </div>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Load-sensing cutout:</strong> Many modern MEWPs
                      have load-sensing systems that prevent operation when overloaded &mdash;
                      stranding occupants at height
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Overturn risk:</strong> Excess weight shifts
                      the centre of gravity, dramatically increasing the risk of the machine tipping
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Structural failure:</strong> Boom, platform, or
                      chassis components may fail under excessive load
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">IPAF warning:</strong> Overloading can result
                      in catastrophic collapse of the machine structure
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ────────────────────────────────────────────────────── */}
        {/* SECTION 03 — Selecting Between MEWP Types             */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[2]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[2]} text-sm font-normal`}>03</span>
              Selecting Between MEWP Types
            </h2>

            <div className="space-y-4 text-white">
              <p>
                Choosing the correct type of MEWP is critical for both safety and efficiency. The
                wrong machine for the task creates unnecessary risk and wasted time. Use the
                comparison below to match the task requirements to the machine type.
              </p>

              {/* Comparison grid — stacked cards on mobile */}
              <div className="space-y-3">
                {/* Header row — hidden on mobile */}
                <div className="hidden sm:grid sm:grid-cols-12 gap-2 text-xs font-semibold text-white/60 uppercase tracking-wider px-4">
                  <div className="col-span-5">Task Requirement</div>
                  <div className="col-span-4">MEWP Type</div>
                  <div className="col-span-3">Category</div>
                </div>

                {mewpTypes.map((row, idx) => (
                  <div key={idx} className={`rounded-lg border p-4 ${row.highlight}`}>
                    {/* Mobile layout */}
                    <div className="sm:hidden space-y-1.5">
                      <p className="text-white/60 text-xs uppercase tracking-wider">Requirement</p>
                      <p className="text-white text-sm font-medium">{row.need}</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-white font-semibold text-sm">{row.type}</span>
                        <span className="bg-white/10 text-white/80 text-xs px-2 py-0.5 rounded-full font-mono">
                          {row.category}
                        </span>
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden sm:grid sm:grid-cols-12 gap-2 items-center text-sm">
                      <div className="col-span-5 text-white/80">{row.need}</div>
                      <div className="col-span-4 text-white font-semibold">{row.type}</div>
                      <div className="col-span-3">
                        <span className="bg-white/10 text-white/80 text-xs px-2 py-0.5 rounded-full font-mono">
                          {row.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[2]} font-medium mb-2`}>Decision Tips</h3>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If in doubt between two types, choose the one with the{' '}
                      <strong className="text-white">greater stability</strong> and the{' '}
                      <strong className="text-white">larger platform</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Always verify the operator holds the{' '}
                      <strong className="text-white">correct PAL card category</strong> for the
                      selected machine
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Consider <strong className="text-white">site access</strong> — a large boom
                      may not fit through doorways or gates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Check <strong className="text-white">floor loading</strong> for indoor use —
                      some MEWPs exceed suspended floor capacity
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/* SECTION 04 — Method Statement Components              */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[3]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[3]} text-sm font-normal`}>04</span>
              Method Statement Components
            </h2>

            <div className="space-y-4 text-white">
              <p>
                A method statement is the written safe system of work (SSOW) that describes, step by
                step, how the MEWP task will be carried out safely. It must be cross-referenced to
                the risk assessment and kept on site throughout the work.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[3]} font-medium mb-2`}>Required Components</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      <strong>SSOW reference number</strong> cross-referenced to the risk assessment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      <strong>Name of author</strong> and date of preparation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      <strong>Step-by-step task description</strong> in chronological order
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      4
                    </span>
                    <span>
                      <strong>Hazards identified</strong> at each step
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      5
                    </span>
                    <span>
                      <strong>Control measures</strong> for each hazard
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      6
                    </span>
                    <span>
                      <strong>Competencies and training</strong> required (PAL card categories,
                      CSCS, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      7
                    </span>
                    <span>
                      <strong>PPE requirements</strong> (hard hat, hi-vis, harness, gloves, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      8
                    </span>
                    <span>
                      <strong>Emergency and rescue procedures</strong> including ground rescue
                      person details
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      9
                    </span>
                    <span>
                      <strong>Date for review</strong> and conditions that trigger early review
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      10
                    </span>
                    <span>
                      <strong>Signatures</strong> of author, supervisor, and operatives
                    </span>
                  </li>
                </ul>
              </div>

              {/* Sample method statement structure */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">
                  Example: Method Statement for Installing Ceiling Lights Using a Scissor Lift
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-1">
                      Reference &amp; Author
                    </div>
                    <p className="text-white">
                      SSOW-2026-047 | Author: J. Smith, Site Supervisor | Date: 09/02/2026
                    </p>
                    <p className="text-white/60 text-xs mt-1">Cross-ref: RA-2026-047</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-1">
                      Step 1 &mdash; Pre-start checks
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-white/60">Task:</span>
                        <p className="text-white">
                          Inspect scissor lift, check SWL, confirm ground is level and firm
                        </p>
                      </div>
                      <div>
                        <span className="text-white/60">Hazard:</span>
                        <p className="text-white">Mechanical fault, uneven ground</p>
                      </div>
                      <div>
                        <span className="text-white/60">Control:</span>
                        <p className="text-white">
                          Daily pre-use inspection checklist, spirit level check
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-1">
                      Step 2 &mdash; Set up exclusion zone
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-white/60">Task:</span>
                        <p className="text-white">
                          Erect barriers and &ldquo;MEWP in use&rdquo; signage around work area
                        </p>
                      </div>
                      <div>
                        <span className="text-white/60">Hazard:</span>
                        <p className="text-white">Pedestrians entering drop zone</p>
                      </div>
                      <div>
                        <span className="text-white/60">Control:</span>
                        <p className="text-white">
                          Physical barriers, warning signs, banksman if required
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-1">
                      Step 3 &mdash; Elevate and install fittings
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-white/60">Task:</span>
                        <p className="text-white">
                          Raise platform to working height, install luminaires
                        </p>
                      </div>
                      <div>
                        <span className="text-white/60">Hazard:</span>
                        <p className="text-white">Falling objects, electrocution, overloading</p>
                      </div>
                      <div>
                        <span className="text-white/60">Control:</span>
                        <p className="text-white">
                          Tool tethers, isolation verified, load calculated before lifting
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-1">
                      Emergency &amp; Rescue
                    </div>
                    <p className="text-white text-xs">
                      Ground rescue person: T. Jones (PAL card 1234567). Emergency lowering via
                      manual descent valve. First aider on site. Emergency services: 999.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-1">
                      PPE &amp; Competency
                    </div>
                    <p className="text-white text-xs">
                      PPE: Hard hat, hi-vis vest, safety boots, gloves. Competency: IPAF PAL card
                      category 3A (scissor lift), valid ECS/CSCS card, electrical safe isolation
                      training.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-1">
                      Review &amp; Signatures
                    </div>
                    <p className="text-white text-xs">
                      Review date: 09/03/2026 or if conditions change. Signed: Author / Supervisor /
                      Operative(s).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ────────────────────────────────────────────────────── */}
        {/* SECTION 05 — Planning the MEWP Operation              */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[4]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[4]} text-sm font-normal`}>05</span>
              Planning the MEWP Operation
            </h2>

            <div className="space-y-4 text-white">
              <p>
                Good planning happens <strong>before</strong> the machine arrives on site. Reactive
                planning once the MEWP is already delivered leads to delays, unsafe compromises, and
                wasted hire costs. Complete the following before the machine is mobilised:
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[4]} font-medium mb-2`}>Pre-Arrival Checklist</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-mono font-bold">1</span>
                    </div>
                    <div>
                      <strong>Confirm machine category matches the task</strong> &mdash; height,
                      outreach, SWL, indoor/outdoor suitability
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-mono font-bold">2</span>
                    </div>
                    <div>
                      <strong>Verify operator PAL card covers that category</strong> &mdash; check
                      expiry date and specific machine group
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-mono font-bold">3</span>
                    </div>
                    <div>
                      <strong>Complete risk assessment and method statement</strong> &mdash;
                      site-specific, not generic templates
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-mono font-bold">4</span>
                    </div>
                    <div>
                      <strong>Prepare the ground</strong> &mdash; clear debris, check bearing
                      capacity, confirm level surface or arrange spreader plates
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-mono font-bold">5</span>
                    </div>
                    <div>
                      <strong>Arrange exclusion zone materials</strong> &mdash; barriers, cones,
                      warning signs, Chapter 8 signage if roadside
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-mono font-bold">6</span>
                    </div>
                    <div>
                      <strong>Confirm rescue plan and ground rescue person</strong> &mdash; named
                      individual, trained in emergency lowering
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-mono font-bold">7</span>
                    </div>
                    <div>
                      <strong>Check for overhead services</strong> &mdash; power lines, telecoms
                      cables. Contact the utility company if within safe clearance distances
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-mono font-bold">8</span>
                    </div>
                    <div>
                      <strong>Arrange banksman if required</strong> &mdash; for blind spots,
                      restricted manoeuvring areas, or traffic management
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-300 text-xs font-mono font-bold">9</span>
                    </div>
                    <div>
                      <strong>Check the weather forecast</strong> &mdash; if wind is expected to
                      exceed 12.5 m/s, postpone or plan for early cessation
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Point</h3>
                <p className="text-white/80 text-sm">
                  If <strong>any</strong> of these pre-arrival items cannot be satisfactorily
                  completed, do not proceed with the MEWP delivery. It is far cheaper and safer to
                  delay than to have an unsuitable machine standing idle on site &mdash; or worse,
                  to use it in unsafe conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/* SECTION 06 — When NOT to Use a MEWP                   */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[5]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[5]} text-sm font-normal`}>06</span>
              When NOT to Use a MEWP
            </h2>

            <div className="space-y-4 text-white">
              <p>
                A MEWP is not always the correct answer. The hierarchy of control in the Work at
                Height Regulations 2005 requires that you first consider whether work at height can
                be <strong>avoided entirely</strong>, then select the most proportionate access
                equipment for the task.
              </p>

              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[5]} font-medium mb-2`}>
                  Situations Where Alternatives May Be More Appropriate
                </h3>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Very short duration tasks at low height:</strong> If the risk
                      assessment supports it, podium steps, a step platform, or even a stepladder
                      may be more proportionate for a brief task under 2&ndash;3 metres
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Extremely rough or unstable terrain:</strong> If no available MEWP is
                      rated for the ground conditions and the ground cannot be adequately prepared,
                      an alternative method must be found
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Confined spaces:</strong> If the MEWP physically cannot fit into the
                      work area, or there is insufficient clearance for safe operation
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Near unprotected live electrical installations:</strong> Unless the
                      MEWP is an IAD (Insulated Aerial Device) category machine specifically
                      designed for live-line work, it must not be used near unprotected live
                      conductors
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Wind consistently exceeds 12.5 m/s:</strong> If the forecast shows
                      sustained high winds throughout the working period, plan an alternative method
                      rather than waiting for conditions to improve
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    The Hierarchy of Control Still Applies
                  </h3>
                </div>
                <p className="text-white/80 text-sm mb-3">
                  The Work at Height Regulations 2005 set out a clear hierarchy:
                </p>
                <ul className="text-white space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      <strong>Avoid</strong> work at height entirely if possible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      <strong>Prevent</strong> falls using collective protection (guardrails,
                      platforms)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      <strong>Mitigate</strong> the consequences of a fall (nets, airbags,
                      harnesses)
                    </span>
                  </li>
                </ul>
                <p className="text-white/60 text-xs mt-3">
                  A MEWP provides collective protection (the platform and guardrails), making it a
                  good option at step 2. But if step 1 is achievable &mdash; for example,
                  pre-assembling components at ground level &mdash; that is always preferable.
                </p>
              </div>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Point</h3>
                <p className="text-white/80 text-sm">
                  Choosing NOT to use a MEWP is sometimes the safest decision. Document your
                  reasoning in the risk assessment. The goal is to select the{' '}
                  <strong>most proportionate</strong> access equipment for the specific task,
                  duration, height, and conditions &mdash; not to default to the most expensive
                  option.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ────────────────────────────────────────────────────── */}
        {/* Pocket Guide                                          */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Selection &amp; SSOW Pocket Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">ACTORS</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">A</strong>pplication &mdash; right machine for
                      the job?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">C</strong>onditions &mdash; ground, stability,
                      environment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">T</strong> (Operators) &mdash; trained,
                      competent, PAL card
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">O</strong>bstructions &mdash; overhead,
                      protruding, nearby
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">R</strong> (Traffic) &mdash; vehicles,
                      pedestrians, barriers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">S</strong> (Restraint) &mdash; harness,
                      lanyard, fall arrest
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">SWL Rule</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>SWL = operators + tools + materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Found on data plate, manual, decals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>If unsure: CEASE and verify</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Method Statement Must Include</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>SSOW ref + risk assessment cross-ref</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Step-by-step with hazards and controls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Emergency &amp; rescue procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>PPE, competencies, review date, signatures</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">When NOT to Use a MEWP</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Short duration, low height &mdash; consider podium steps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Unstable terrain no MEWP is rated for</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Near live conductors without IAD category</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Wind &gt; 12.5 m/s sustained</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/* FAQs                                                   */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/* Quiz                                                   */}
        {/* ────────────────────────────────────────────────────── */}
        <div className="mt-12">
          <Quiz title="Machine Selection & Safe Systems of Work Quiz" questions={quizQuestions} />
        </div>

        {/* ────────────────────────────────────────────────────── */}
        {/* Navigation                                             */}
        {/* ────────────────────────────────────────────────────── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: The Six Key Hazards
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-2-section-4">
              Next: Ground Conditions, Slopes &amp; Weather Limits
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default MewpModule2Section3;
