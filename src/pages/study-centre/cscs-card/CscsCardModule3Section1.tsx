import {
  ArrowLeft,
  ArrowRight,
  ArrowUpFromLine,
  CheckCircle,
  AlertTriangle,
  Shield,
  HardHat,
  ClipboardCheck,
  Users,
  Layers,
  Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cscs-wah-hierarchy',
    question:
      'What is the correct order of the hierarchy for managing work at height?',
    options: [
      'Mitigate falls, prevent falls, avoid work at height',
      'Prevent falls, avoid work at height, mitigate falls',
      'Avoid work at height, prevent falls, mitigate falls',
      'Mitigate falls, avoid work at height, prevent falls',
    ],
    correctIndex: 2,
    explanation:
      'The Work at Height Regulations 2005 require duty holders to follow the hierarchy in strict order: first avoid work at height where it is reasonably practicable to do so, then prevent falls using collective or personal protection if work at height cannot be avoided, and finally mitigate the consequences of a fall using nets, airbags, or harnesses if falls cannot be prevented. This order must always be followed — you cannot skip straight to harnesses without first considering whether the task can be done from the ground.',
  },
  {
    id: 'cscs-wah-guardrail',
    question:
      'What is the minimum height for a top guard rail on a working platform?',
    options: [
      '750 mm',
      '900 mm',
      '950 mm',
      '1100 mm',
    ],
    correctIndex: 2,
    explanation:
      'The Work at Height Regulations specify that a guard rail must have a top rail at a minimum height of 950 mm above the working platform. The system must also include an intermediate (mid) rail to prevent a person falling through the gap, and a toe board of at least 150 mm in height to prevent tools and materials falling from the platform edge. These dimensions are critical for the CSCS HS&E test.',
  },
  {
    id: 'cscs-wah-fragile',
    question:
      'When working near roof lights, what should you always assume?',
    options: [
      'They are safe to walk on if they look solid',
      'They are fragile unless proven otherwise by a competent person',
      'They are only dangerous in wet weather',
      'They can support the weight of one person at a time',
    ],
    correctIndex: 1,
    explanation:
      'You must always assume that roof lights and similar surfaces are fragile unless a competent person has confirmed otherwise through inspection and testing. Roof lights — even those that appear solid — can become brittle with age and UV exposure, and many fatal falls have occurred when workers have stepped on or fallen through roof lights. Controls include crawling boards, permanent covers, warning signs, barriers, and safety netting beneath.',
  },
];

const faqs = [
  {
    question:
      'Does the Work at Height Regulations 2005 only apply when working at extreme heights such as on skyscrapers?',
    answer:
      'No. The Work at Height Regulations 2005 apply to all work at height where a person could fall a distance liable to cause personal injury — regardless of how small that distance is. There is no minimum height threshold. Work on a stepladder, at the edge of a loading bay, beside an open excavation, or on a flat roof all count as work at height. In fact, the majority of fatal falls in the UK construction industry occur from heights below 2 metres. The regulations require a risk assessment and appropriate control measures for every instance of work at height, no matter how routine or low-level it may seem.',
  },
  {
    question:
      'Who is a competent person under the Work at Height Regulations?',
    answer:
      'A competent person is someone who has sufficient training, experience, knowledge, and other qualities to carry out the task safely. Under the Work at Height Regulations 2005, a competent person must plan, organise, and supervise all work at height. They must also carry out inspections of work equipment used for working at height. The level of competence required depends on the complexity of the task — simple ladder work may require basic training, while complex scaffold design requires formal qualifications and extensive experience. Employers must ensure that anyone involved in planning, supervising, or carrying out work at height is competent for the specific tasks they are undertaking.',
  },
  {
    question:
      'How often must scaffolding be inspected on a construction site?',
    answer:
      'Under the Work at Height Regulations 2005, scaffolding must be inspected by a competent person before first use, at intervals not exceeding 7 days while it remains erected, and after any event that may have affected its stability — such as severe weather (high winds, heavy rain, frost), any alteration or modification, or after being struck by plant or vehicles. The results of every inspection must be recorded in a scaffold inspection report, which must be kept on site and made available to any inspector from the HSE or local authority. If the inspection reveals any defect, the scaffold must not be used until the defect has been rectified and the scaffold re-inspected.',
  },
  {
    question:
      'What is the difference between fall prevention and fall mitigation?',
    answer:
      'Fall prevention refers to measures that physically stop a person from falling in the first place. These include guard rails, edge protection, scaffolding with full guardrails, working platforms with barriers, and MEWPs (Mobile Elevating Work Platforms). Fall mitigation, on the other hand, refers to measures that reduce the severity of injury if a fall does occur — they do not prevent the fall itself. Mitigation measures include safety nets, soft landing systems (such as air bags), and personal fall arrest systems (harnesses with lanyards attached to secure anchor points). The Work at Height Regulations require that prevention is always preferred over mitigation — you should only rely on mitigation when it is not reasonably practicable to prevent the fall entirely.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under the Work at Height Regulations 2005, what is the definition of "work at height"?',
    options: [
      'Any work carried out more than 2 metres above ground level',
      'Any work at a place where a person could fall a distance liable to cause personal injury',
      'Any work carried out on a scaffold or ladder',
      'Any work carried out more than 3 metres above ground level on a construction site',
    ],
    correctAnswer: 1,
    explanation:
      'The Work at Height Regulations 2005 define work at height as work at any place where a person could fall a distance liable to cause personal injury. There is no minimum height threshold. This includes working on ladders, roofs, loading bays, near excavation edges, on vehicles, and even at ground level beside an open void.',
  },
  {
    id: 2,
    question:
      'What is the FIRST step in the hierarchy for managing work at height?',
    options: [
      'Provide personal fall arrest equipment such as harnesses',
      'Install guard rails and edge protection',
      'Avoid work at height where it is reasonably practicable to do so',
      'Provide safety nets below the work area',
    ],
    correctAnswer: 2,
    explanation:
      'The first step in the hierarchy is always to avoid work at height where it is reasonably practicable. This might mean assembling components at ground level and lifting them into position, using long-handled tools to reach high areas, or designing out the need for work at height entirely. Only if avoidance is not reasonably practicable should you move to the next step — preventing falls.',
  },
  {
    id: 3,
    question:
      'A guard rail system on a working platform must have a top rail at a minimum height of:',
    options: [
      '750 mm',
      '900 mm',
      '950 mm',
      '1100 mm',
    ],
    correctAnswer: 2,
    explanation:
      'The minimum height for a top guard rail is 950 mm above the working surface. The guard rail system must also include an intermediate rail (mid rail) and a toe board at least 150 mm high to prevent tools and materials falling from the platform edge.',
  },
  {
    id: 4,
    question:
      'How often must scaffolding be inspected while it remains erected on site?',
    options: [
      'Every 3 days',
      'Every 7 days',
      'Every 14 days',
      'Every 28 days',
    ],
    correctAnswer: 1,
    explanation:
      'The Work at Height Regulations require scaffolding to be inspected by a competent person at intervals not exceeding 7 days, as well as before first use and after any event likely to have affected its stability (such as severe weather, alteration, or impact from plant). Inspection results must be recorded and kept on site.',
  },
  {
    id: 5,
    question:
      'Which of the following is an example of fall PREVENTION rather than fall MITIGATION?',
    options: [
      'A safety harness with a lanyard and shock absorber',
      'A safety net positioned below the work area',
      'Guard rails and toe boards around the edge of a working platform',
      'A soft landing system (air bag) beneath a fragile roof',
    ],
    correctAnswer: 2,
    explanation:
      'Guard rails and toe boards are fall prevention measures — they physically stop a person from falling from the edge of a platform. Safety harnesses, safety nets, and soft landing systems are fall mitigation measures — they reduce the consequences of a fall but do not prevent the fall itself. Prevention is always preferred over mitigation in the hierarchy.',
  },
  {
    id: 6,
    question:
      'Before using a personal fall arrest system (harness), what must already be in place?',
    options: [
      'A fire escape plan',
      'A rescue plan that details how the fallen person will be recovered',
      'Written permission from the site manager only',
      'An insurance certificate covering the worker',
    ],
    correctAnswer: 1,
    explanation:
      'A rescue plan must always be in place before any work involving personal fall arrest equipment begins. If a worker falls and is left suspended in a harness, they can suffer suspension trauma (positional asphyxia) within minutes, which can be fatal. The rescue plan must detail how the person will be recovered quickly, what equipment is needed, and who is trained to carry out the rescue.',
  },
  {
    id: 7,
    question:
      'Fibre cement roof sheets and old roof lights should be treated as:',
    options: [
      'Safe to walk on provided you walk along the line of the bolts',
      'Fragile surfaces unless a competent person has confirmed they are safe',
      'Safe to work on if the weather is dry and calm',
      'Strong enough to support one person at a time',
    ],
    correctAnswer: 1,
    explanation:
      'Fibre cement sheets, roof lights, corroded metal decking, and glass panels must always be assumed to be fragile surfaces unless a competent person has inspected them and confirmed they can support the required loads. Many fatal falls occur through fragile surfaces that workers assumed were safe. Controls include crawling boards, staging, safety netting, barriers, and warning signs.',
  },
  {
    id: 8,
    question:
      'Under LOLER 1998, personal fall arrest equipment such as harnesses must have a thorough examination at least every:',
    options: [
      '3 months',
      '6 months',
      '12 months',
      '24 months',
    ],
    correctAnswer: 1,
    explanation:
      'Under the Lifting Operations and Lifting Equipment Regulations (LOLER) 1998, equipment used to arrest falls — including harnesses, lanyards, and retractable fall arresters — must undergo a thorough examination by a competent person at intervals not exceeding 6 months. This is in addition to pre-use visual checks carried out by the user before every use. Records of thorough examinations must be kept and made available for inspection.',
  },
];

export default function CscsCardModule3Section1() {
  useSEO({
    title: 'Working at Height Regulations | CSCS Card Module 3.1',
    description:
      'Work at Height Regulations 2005, hierarchy of controls, duty holders, fall prevention and mitigation, fragile surfaces, and inspection requirements for the CSCS HS&E test.',
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
            <Link to="../cscs-card-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-500/30 mb-4">
            <ArrowUpFromLine className="h-7 w-7 text-green-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 3 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Working at Height Regulations
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The Work at Height Regulations 2005, the hierarchy of controls, duty holders,
            fall prevention and mitigation, fragile surfaces, and inspection requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Leading cause:</strong> ~40 deaths and 5,000+ major injuries per year
              </li>
              <li>
                <strong>Hierarchy:</strong> Avoid &rarr; Prevent &rarr; Mitigate
              </li>
              <li>
                <strong>Guard rails:</strong> 950 mm top rail, mid rail, 150 mm toe board
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Scaffolds:</strong> 7-day inspections by competent person
              </li>
              <li>
                <strong>Harnesses:</strong> LOLER 6-monthly thorough examination
              </li>
              <li>
                <strong>Fragile surfaces:</strong> Assume fragile unless proven otherwise
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain why working at height is the leading cause of workplace fatalities',
              'State the key definitions and scope of the Work at Height Regulations 2005',
              'Describe the three-tier hierarchy for managing work at height',
              'Identify the responsibilities of duty holders including employers and employees',
              'Distinguish between fall prevention and fall mitigation measures',
              'Explain the requirements for working on or near fragile surfaces',
              'Describe the inspection requirements for scaffolding, harnesses, and other equipment',
              'Apply the regulations to common construction site scenarios',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 — Why Working at Height Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">01</span>
            Why Working at Height Matters
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Falls from height are the{' '}
                <strong>single largest cause of workplace fatalities</strong> in the United
                Kingdom. Every year, approximately <strong>40 workers are killed</strong> and
                over <strong>5,000 suffer major injuries</strong> as a result of falls from
                height. The construction industry accounts for the majority of these
                incidents, and electricians — who regularly work on ladders, scaffolding,
                roofs, and elevated platforms — are among the most at-risk trade groups.
              </p>

              <p>
                What makes these statistics even more alarming is that the{' '}
                <strong>majority of fatal falls occur from relatively low heights</strong>.
                Falls from below 2 metres account for a significant proportion of all
                fatalities. This demonstrates that it is not just extreme heights that are
                dangerous — any fall, even from a stepladder or the back of a vehicle, can
                result in life-changing or fatal injuries. A fall from as little as 1.5 metres
                onto a hard surface can cause skull fractures, spinal cord injuries, and death.
              </p>

              {/* Falls Statistics Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                <p className="text-sm text-white/60 mb-4 text-center">
                  Falls from Height &mdash; UK Fatalities by Height Band
                </p>
                <div className="max-w-md mx-auto space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/60 w-20 text-right shrink-0">Below 2 m</span>
                    <div className="flex-1 bg-white/5 rounded-full h-7 overflow-hidden">
                      <div className="bg-red-500/60 h-full rounded-full flex items-center justify-end pr-2" style={{ width: '35%' }}>
                        <span className="text-[10px] font-bold text-white">~35%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/60 w-20 text-right shrink-0">2&ndash;5 m</span>
                    <div className="flex-1 bg-white/5 rounded-full h-7 overflow-hidden">
                      <div className="bg-orange-500/60 h-full rounded-full flex items-center justify-end pr-2" style={{ width: '30%' }}>
                        <span className="text-[10px] font-bold text-white">~30%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/60 w-20 text-right shrink-0">5&ndash;10 m</span>
                    <div className="flex-1 bg-white/5 rounded-full h-7 overflow-hidden">
                      <div className="bg-amber-500/60 h-full rounded-full flex items-center justify-end pr-2" style={{ width: '20%' }}>
                        <span className="text-[10px] font-bold text-white">~20%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/60 w-20 text-right shrink-0">Above 10 m</span>
                    <div className="flex-1 bg-white/5 rounded-full h-7 overflow-hidden">
                      <div className="bg-green-500/60 h-full rounded-full flex items-center justify-end pr-2" style={{ width: '15%' }}>
                        <span className="text-[10px] font-bold text-white">~15%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-white/40 text-center mt-3">
                  Source: HSE RIDDOR data &mdash; approximate distribution of fatal falls by height band
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Common Causes of Falls</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Overreaching from ladders:</strong> Leaning
                      too far to one side or stretching beyond a safe reach causes the ladder to
                      become unstable and topple. This is one of the most frequent causes of
                      falls among electricians working from ladders.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Falls through fragile surfaces:</strong>{' '}
                      Stepping on roof lights, fibre cement sheets, or corroded metal decking
                      that gives way under the weight of a person. Many workers do not recognise
                      fragile surfaces until it is too late.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Unprotected edges:</strong> Working near
                      unguarded roof edges, floor openings, stairwell voids, or scaffold
                      platforms without edge protection. A momentary loss of balance or an
                      unexpected gust of wind can be fatal.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Failure to use fall protection:</strong>{' '}
                      Harnesses not worn, lanyards not clipped on, guard rails removed and not
                      replaced. Complacency and time pressure are common contributing factors.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Inadequate planning:</strong> Work at height
                      carried out without a proper risk assessment, method statement, or
                      supervision. Many incidents occur during short-duration tasks that workers
                      consider &ldquo;quick jobs&rdquo; not worth planning for.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Key Point</p>
                </div>
                <p className="text-sm text-white/80">
                  Working at height is the{' '}
                  <strong className="text-white">
                    number one killer in the UK construction industry
                  </strong>
                  . Most fatal falls occur from heights that many workers consider &ldquo;not
                  that high&rdquo;. The regulations exist because even short-duration, low-level
                  work at height can have devastating consequences. Every task involving work at
                  height &mdash; no matter how routine &mdash; must be properly planned,
                  supervised, and carried out by competent persons using appropriate equipment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02 — Work at Height Regulations 2005 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">02</span>
            Work at Height Regulations 2005
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Work at Height Regulations 2005</strong> are the primary piece of
                legislation governing working at height in the United Kingdom. They apply to
                all work at height where there is a risk of a fall liable to cause personal
                injury. The regulations replaced a patchwork of older rules and brought all
                work at height under a single, clear legal framework.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Key Definitions</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The regulations define <strong className="text-white">&ldquo;work at height&rdquo;</strong>{' '}
                  as work at any place where, if precautions were not taken, a person could fall
                  a distance liable to cause personal injury. This definition is deliberately
                  broad and includes:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Working on ladders and stepladders</strong>{' '}
                      &mdash; even a 2-step stepladder counts as work at height
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Working on flat or pitched roofs</strong>{' '}
                      &mdash; including maintenance, installation, and inspection work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Working near loading bays</strong>{' '}
                      &mdash; open dock edges present a fall hazard even at ground floor level
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Working near excavation edges</strong>{' '}
                      &mdash; open trenches, pits, and foundations are work at height if a fall
                      could cause injury
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Working on scaffolding and mobile towers</strong>{' '}
                      &mdash; including erection, use, and dismantling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Working from mobile elevating work platforms</strong>{' '}
                      (MEWPs) &mdash; cherry pickers, scissor lifts, and boom lifts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Working on top of vehicles, containers, or plant</strong>{' '}
                      &mdash; including loading and sheeting operations
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Scope of the Regulations</p>
                <p className="text-sm text-white/80 mb-3">
                  The regulations apply to <strong className="text-white">all work at height</strong>,
                  not just extreme heights or construction work. Key points about scope:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      There is <strong className="text-white">no minimum height threshold</strong>{' '}
                      &mdash; the regulations apply wherever a person could fall and be injured,
                      regardless of the distance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      They apply to <strong className="text-white">all industries</strong>,
                      not just construction &mdash; offices, factories, warehouses, shops,
                      schools, and hospitals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      They cover <strong className="text-white">access and egress</strong> to and
                      from a place of work at height, not just the work itself
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Falls <strong className="text-white">below ground level</strong> (into pits,
                      excavations, manholes) are included
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-amber-300">
                  <strong>CSCS Test Tip:</strong> The CSCS HS&amp;E test frequently asks about the
                  definition of work at height. Remember: there is no minimum height, it applies
                  to all industries, and it includes any place where a person could fall a
                  distance liable to cause personal injury. The key phrase is &ldquo;liable to
                  cause personal injury&rdquo; &mdash; not &ldquo;above 2 metres&rdquo;.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 — The Hierarchy for Working at Height */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">03</span>
            The Hierarchy for Working at Height
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations 2005 establish a strict{' '}
                <strong>three-tier hierarchy</strong> that must be followed when planning any
                work at height. This hierarchy must be applied in order &mdash; you cannot
                skip to a lower tier without first demonstrating that the higher tiers are not
                reasonably practicable.
              </p>

              {/* Working at Height Hierarchy Pyramid */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                <p className="text-sm text-white/60 mb-4 text-center">
                  The Hierarchy for Working at Height &mdash; follow in strict order
                </p>
                <div className="max-w-lg mx-auto space-y-2">
                  {/* Tier 1 — Avoid */}
                  <div className="bg-green-500/15 border border-green-500/30 rounded-lg p-3 sm:p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-green-400 text-xs font-bold uppercase tracking-wider">
                        1. Avoid Work at Height
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80">
                      Eliminate the need to work at height entirely &mdash; assemble at ground
                      level, use long-reach tools, design out the hazard
                    </p>
                  </div>

                  {/* Tier 2 — Prevent */}
                  <div className="bg-blue-500/15 border border-blue-500/30 rounded-lg p-3 sm:p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                        2. Prevent Falls
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80">
                      Use collective protection first &mdash; guard rails, working platforms,
                      scaffolding, edge protection, MEWPs
                    </p>
                  </div>

                  {/* Tier 3 — Mitigate */}
                  <div className="bg-amber-500/15 border border-amber-500/30 rounded-lg p-3 sm:p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                        3. Mitigate Falls
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80">
                      Reduce consequences if a fall does occur &mdash; safety nets, airbags,
                      personal fall arrest systems (harnesses)
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-white/50">
                    &uarr; Most effective &mdash; always start at the top and work downwards &darr;
                  </p>
                </div>
              </div>

              {/* Tier 1 Detail */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">
                  Tier 1: Avoid Work at Height
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The most effective control is to avoid the need to work at height altogether.
                  This should always be the first consideration. Examples include:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Ground-level assembly:</strong> Pre-fabricate
                      cable trays, containment systems, or lighting rigs at ground level and then
                      lift them into position using mechanical handling equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Long-reach tools:</strong> Use telescopic
                      tools, extendable poles, or remote monitoring equipment to carry out
                      inspections or maintenance from ground level
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Design out the hazard:</strong> During the
                      design phase, position equipment at accessible heights, provide permanent
                      access platforms, or relocate services to avoid the need for work at height
                      during installation and maintenance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Lowering systems:</strong> In some cases,
                      equipment can be lowered to ground level for maintenance (such as winch-down
                      lighting systems in warehouses and sports halls)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Tier 2 Detail */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Tier 2: Prevent Falls
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Where work at height cannot be avoided, the next step is to use measures that
                  prevent a person from falling. Collective protection (measures that protect
                  everyone in the area) is always preferred over personal protection (measures
                  that protect only the individual wearing them):
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Guard rails and edge protection:</strong>{' '}
                      Physical barriers at the edge of working platforms, roofs, and openings
                      that prevent anyone from falling over the edge
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Scaffolding with full guardrails:</strong>{' '}
                      Properly erected scaffold with top rails, mid rails, toe boards, and
                      scaffold boarding providing a safe working platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Mobile Elevating Work Platforms (MEWPs):</strong>{' '}
                      Cherry pickers, scissor lifts, and boom lifts that provide an enclosed or
                      guarded working platform at height
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Podium steps and tower scaffolds:</strong>{' '}
                      For lower-level work, podium steps and mobile tower scaffolds provide stable
                      working platforms with integrated guardrails
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Work restraint systems:</strong> A harness
                      and short lanyard that prevents the wearer from reaching the edge &mdash;
                      this is prevention because the person physically cannot reach the fall hazard
                    </span>
                  </li>
                </ul>
              </div>

              {/* Tier 3 Detail */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-400 mb-3">
                  Tier 3: Mitigate Falls
                </p>
                <p className="text-sm text-white/80 mb-3">
                  If it is not reasonably practicable to prevent falls, the final tier is to
                  minimise the distance and consequences of any fall that does occur:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Safety nets:</strong> Positioned below the
                      work area to catch a falling person. Must be installed as close as possible
                      to the working level to minimise fall distance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Soft landing systems:</strong> Inflatable
                      airbags or bean bag systems positioned below the work area to cushion a
                      fall. Used where nets are not suitable.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Personal fall arrest systems:</strong>{' '}
                      Full-body harnesses with energy-absorbing lanyards or retractable fall
                      arresters attached to a secure anchor point. These do not prevent the fall
                      but arrest it before the person hits the ground.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  The hierarchy must be followed{' '}
                  <strong className="text-white">in strict order</strong>. It is{' '}
                  <strong className="text-red-300">
                    not acceptable to issue workers with harnesses as the first option
                  </strong>{' '}
                  without first considering whether the work can be avoided or whether
                  collective fall prevention can be provided. Enforcement action can be taken
                  against employers who fail to follow the hierarchy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04 — Duty Holders & Responsibilities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">04</span>
            Duty Holders &amp; Responsibilities
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations 2005 place duties on several categories of
                people. Understanding who is responsible &mdash; and for what &mdash; is
                essential for compliance and is frequently tested in the CSCS HS&amp;E exam.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Duty Holders</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-sm font-bold text-green-400 mb-1">Employers</p>
                    <p className="text-xs text-white/70">
                      Must ensure that all work at height is properly planned, organised, and
                      supervised. Must provide suitable equipment, training, and competent
                      supervision. Must carry out risk assessments and implement the hierarchy
                      of controls. Must ensure that all equipment used for work at height is
                      inspected and maintained.
                    </p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-sm font-bold text-green-400 mb-1">Employees</p>
                    <p className="text-xs text-white/70">
                      Must report any hazards or defects in equipment to their employer. Must
                      use all equipment and protection provided in accordance with their
                      training. Must not take unnecessary risks or interfere with safety
                      measures. Must follow the safe system of work established for each task.
                    </p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-sm font-bold text-green-400 mb-1">Self-Employed Persons</p>
                    <p className="text-xs text-white/70">
                      Have the same duties as both employers and employees. Must ensure that
                      any work at height they carry out is properly planned, that they use
                      appropriate equipment, and that they are competent to carry out the work
                      safely.
                    </p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-sm font-bold text-green-400 mb-1">Building Occupants &amp; Facilities Managers</p>
                    <p className="text-xs text-white/70">
                      Must ensure that anyone carrying out work at height on their premises
                      does so safely. Must provide information about the building (such as the
                      location of fragile surfaces, anchor points, and access restrictions) to
                      contractors before they begin work.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HardHat className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">The Competent Person</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The regulations require that a <strong className="text-white">competent person</strong>{' '}
                  must plan, organise, and supervise all work at height. A competent person is
                  someone with sufficient training, experience, knowledge, and other qualities
                  to carry out the task safely.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Planning:</strong> A competent person must
                      plan the work, including the selection of equipment, the sequence of
                      operations, and the emergency and rescue procedures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Organising:</strong> Ensuring the right
                      people, equipment, and materials are available, and that conditions
                      (weather, surface, lighting) are suitable for the work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Supervising:</strong> Monitoring the work
                      to ensure it is carried out in accordance with the plan and that workers
                      are following safe systems of work
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Factors to Consider When Planning</p>
                <p className="text-sm text-white/80 mb-3">
                  The competent person must take account of a range of factors when planning
                  work at height:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Weather conditions:</strong> Wind speed,
                          rain, ice, snow, and temperature can all affect the safety of work at
                          height. Work should be postponed in adverse conditions.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Surface conditions:</strong> Wet, icy,
                          oily, or uneven surfaces increase the risk of slips and falls on
                          working platforms and access routes.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Duration of the task:</strong> Longer
                          tasks require more robust access solutions. A 5-minute check might be
                          acceptable from a ladder; a 4-hour installation needs a scaffold or
                          MEWP.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Emergency and rescue:</strong> A plan
                          must be in place for how an injured or fallen worker will be rescued
                          promptly.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 — Fall Prevention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">05</span>
            Fall Prevention
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fall prevention measures are the second tier of the hierarchy and the most
                commonly applied control on construction sites. The fundamental principle is
                that <strong>collective protection</strong> (measures that protect everyone in
                the area without individual action) is always preferred over{' '}
                <strong>personal protection</strong> (measures that protect only the individual
                wearing or using them).
              </p>

              {/* Guard Rail Specification */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Guard Rail Specification</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Guard rails are the most common form of collective fall prevention. The Work
                  at Height Regulations specify the following minimum requirements for guard
                  rail systems:
                </p>
                <div className="grid sm:grid-cols-3 gap-3 mb-3">
                  <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold text-green-400 mb-1">950 mm</p>
                    <p className="text-xs text-white/70">
                      Minimum top rail height above the working platform surface
                    </p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold text-green-400 mb-1">Mid Rail</p>
                    <p className="text-xs text-white/70">
                      Intermediate rail to prevent a person falling between the top rail and platform
                    </p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold text-green-400 mb-1">150 mm</p>
                    <p className="text-xs text-white/70">
                      Minimum toe board height to prevent tools and materials falling from the edge
                    </p>
                  </div>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Guard rails must be strong enough to withstand a person leaning against
                      them or being pushed into them &mdash; they must not collapse under load
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      There must be no unprotected gap greater than 470 mm between any guard
                      rail, toe board, or other barrier
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Guard rails must be provided at every open edge where a person could
                      fall &mdash; including the ends of scaffold platforms, stairwell openings,
                      and around floor voids
                    </span>
                  </li>
                </ul>
              </div>

              {/* Collective Prevention Measures */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Collective Prevention Measures</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Scaffolding:</strong> A properly erected
                      scaffold provides a safe working platform with guard rails, toe boards,
                      and safe access (ladder bays or stair towers). Must be erected, altered,
                      and dismantled by trained and competent scaffolders under the supervision
                      of a scaffold supervisor.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Working platforms:</strong> Temporary or
                      permanent platforms that provide a flat, stable surface with edge
                      protection. Must be wide enough for the work being carried out and strong
                      enough to support the workers, tools, and materials.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">MEWPs (Mobile Elevating Work Platforms):</strong>{' '}
                      Scissor lifts, cherry pickers, and boom lifts provide enclosed or guarded
                      platforms. Operators must be trained (IPAF or equivalent) and the MEWP
                      must be suitable for the task, ground conditions, and working height.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Edge protection systems:</strong>{' '}
                      Temporary guard rail systems that can be installed around roof edges,
                      floor openings, and other unprotected edges. Available as free-standing
                      (counterweighted), fixed (bolted), and clamped systems.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Covers over openings:</strong> Floor
                      openings, roof openings, and void covers must be securely fixed, clearly
                      marked, and strong enough to support the heaviest load that may be placed
                      on them. Covers must be labelled &ldquo;DANGER &mdash; OPENING BELOW&rdquo;.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Key Point</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">Collective protection always takes priority
                  over personal protection.</strong> A scaffold with guard rails protects
                  everyone on the platform automatically, regardless of whether they remember to
                  clip on a harness. Personal protection (such as harnesses) depends entirely on
                  the individual using it correctly every time &mdash; one moment of
                  forgetfulness can be fatal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06 — Fall Mitigation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">06</span>
            Fall Mitigation
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fall mitigation is the third and final tier of the hierarchy. These measures
                do not prevent falls &mdash; they reduce the{' '}
                <strong>distance fallen and the severity of injury</strong> if a fall occurs.
                Fall mitigation should only be used when it is not reasonably practicable to
                avoid work at height or to prevent falls using collective protection.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Safety Nets</p>
                <p className="text-sm text-white/80 mb-3">
                  Safety nets are positioned below the work area to catch a falling person.
                  They are a form of collective mitigation &mdash; they protect everyone
                  working above them without requiring individual action.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Must be installed as close as possible to the working level to minimise
                      the fall distance &mdash; maximum 2 metres below the working area is
                      typical
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Must be installed by trained and competent riggers, and inspected weekly
                      and after any fall into the net
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Must extend far enough beyond the edge of the working area to catch a
                      person who falls outwards as well as downwards
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Soft Landing Systems</p>
                <p className="text-sm text-white/80 mb-3">
                  Inflatable airbags, bean bag systems, and other soft landing solutions are
                  used where safety nets are not practical &mdash; for example, in confined
                  spaces or where there is insufficient clearance below the working area.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Must be positioned to cover the entire area where a fall could occur
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Must be inspected before each use and maintained in accordance with the
                      manufacturer&rsquo;s instructions
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-400 mb-3">
                  Personal Fall Arrest Systems (Harnesses)
                </p>
                <p className="text-sm text-white/80 mb-3">
                  A personal fall arrest system consists of a full-body harness connected by
                  an energy-absorbing lanyard or retractable fall arrester to a secure anchor
                  point. It arrests a fall after it has begun, limiting the distance fallen
                  and the forces on the body.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Full-body harness:</strong> Must distribute
                      arrest forces across the thighs, pelvis, chest, and shoulders &mdash; a
                      belt alone is not acceptable for fall arrest
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Anchor points:</strong> Must be strong enough
                      to withstand the forces generated during a fall arrest &mdash; typically
                      rated to at least 12 kN per person attached
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Energy absorbers:</strong> Lanyards must
                      include an energy absorber that extends during a fall to limit the peak
                      arrest force on the body to a maximum of 6 kN
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Clearance calculation:</strong> There must
                      be sufficient clearance below the anchor point for the lanyard, energy
                      absorber extension, harness attachment point, and the height of the
                      person &mdash; to ensure they do not hit the ground or an obstruction
                      during the fall
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Warning &mdash; Rescue Plans</p>
                </div>
                <p className="text-sm text-white/80">
                  A <strong className="text-white">rescue plan must always be in place</strong>{' '}
                  before any work involving personal fall arrest equipment begins. If a worker
                  falls and is suspended in a harness, they can suffer{' '}
                  <strong className="text-red-300">suspension trauma (positional asphyxia)</strong>{' '}
                  within as little as 15&ndash;20 minutes. The blood pools in the legs, the
                  heart cannot maintain adequate circulation, and the person can lose
                  consciousness and die. The rescue plan must specify how the fallen person will
                  be recovered quickly, what equipment is needed, and who is trained to carry out
                  the rescue. Simply dialling 999 is not an adequate rescue plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07 — Fragile Surfaces */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">07</span>
            Fragile Surfaces
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fragile surfaces are one of the most dangerous hazards when working at height.
                A <strong>fragile surface</strong> is any surface that would be liable to fail
                if a person&rsquo;s weight were applied to it &mdash; including walking on it,
                working on it, or falling onto it from a short distance. Falls through fragile
                surfaces are frequently fatal because the person is often unaware that the
                surface cannot support them until it is too late.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Common Fragile Surfaces</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The following materials and surfaces must always be assumed to be fragile
                  unless a competent person has confirmed otherwise through inspection and
                  testing:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Roof lights:</strong> Plastic, polycarbonate,
                          and glass roof lights &mdash; including those that appear solid. They
                          become brittle with age and UV exposure.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Fibre cement sheets:</strong> Commonly used
                          as industrial roof and wall cladding. Become more fragile with age and
                          weathering. Cannot support a person&rsquo;s weight.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-sm text-white/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Corroded metal decking:</strong> Metal
                          roof sheets that have corroded and lost structural integrity. Corrosion
                          may not be visible from above.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Glass panels:</strong> Skylights,
                          atrium glazing, and glass floor panels that are not designed to support
                          foot traffic.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Golden Rule: Assume Fragile Unless Proven Otherwise
                </p>
                <p className="text-sm text-white/80 mb-3">
                  This is one of the most important principles in working at height. If you
                  cannot confirm that a surface will support the required loads, you must treat
                  it as fragile and implement appropriate controls. &ldquo;It looks solid&rdquo;
                  is never a valid justification for walking on an unverified surface.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Controls for Fragile Surfaces</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Crawling boards and staging:</strong>{' '}
                      Timber or lightweight boards that spread the load over a wider area and
                      bridge across fragile panels. Must be properly supported and secured to
                      prevent movement.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Safety netting beneath:</strong> Nets
                      installed below the fragile surface to catch a person if the surface
                      fails. Must be installed close to the underside of the roof and extend
                      beyond the working area.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Permanent covers and guards:</strong>{' '}
                      Purpose-built covers over roof lights and barriers around fragile areas
                      that physically prevent access. The most effective long-term control.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Warning signs and barriers:</strong>{' '}
                      Clearly visible warning signs reading &ldquo;DANGER &mdash; FRAGILE
                      ROOF&rdquo; at all access points. Physical barriers to prevent anyone
                      approaching the fragile area without authorisation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Demarcation:</strong> The perimeter of the
                      fragile area must be clearly marked so that workers can identify the zone
                      of danger. Brightly coloured tape, barriers, or painted lines may be used.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  Falls through fragile surfaces are{' '}
                  <strong className="text-white">almost always fatal</strong>. The person falls
                  without warning, has no time to react, and lands on a hard surface below &mdash;
                  often concrete or machinery. Many victims are experienced workers who have
                  walked across the same roof many times before. The surface may have
                  deteriorated invisibly, or the worker may have deviated from their usual path
                  and stepped on an area they have never tested. Complacency is the biggest
                  killer when it comes to fragile surfaces.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08 — Inspection Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">08</span>
            Inspection Requirements
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations 2005 place specific requirements on the
                inspection of all equipment used for working at height. Regular inspection is
                essential because equipment deteriorates with use, weather exposure, and time.
                A component that was safe last week may not be safe today.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Pre-Use Checks</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Every person who uses equipment for working at height must carry out a
                  visual pre-use check before each use. This is the user&rsquo;s personal
                  responsibility and cannot be delegated.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Ladders:</strong> Check for bent or cracked
                      stiles, missing or damaged rungs, defective feet, and any signs of damage,
                      corrosion, or modification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Harnesses:</strong> Check all webbing for
                      cuts, abrasion, chemical damage, and UV degradation. Check buckles,
                      D-rings, and stitching for wear and damage. Check the label for the next
                      thorough examination date.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Lanyards and fall arresters:</strong> Check
                      for fraying, cuts, knots, corrosion of karabiners, and correct operation
                      of retractable mechanisms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Scaffolding:</strong> Before stepping onto
                      a scaffold, check that the scaffold tag is green (inspected and safe),
                      that all guard rails and toe boards are in place, and that the platform
                      boards are secure and undamaged
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Scaffold Inspections</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Scaffolding requires formal, recorded inspections by a competent person at
                  specific intervals:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Before first use:</strong> After initial
                      erection and before anyone other than the erection team uses the scaffold
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Every 7 days:</strong> A formal inspection
                      at intervals not exceeding 7 days while the scaffold remains erected
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">After any event affecting stability:</strong>{' '}
                      Following severe weather (high winds, heavy rain, frost, snow), any
                      alteration or modification to the scaffold, or after being struck by plant
                      or vehicles
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Scaffold inspection reports:</strong> The
                      results of every inspection must be recorded in a scaffold inspection
                      report. This report must be kept on site and made available to any HSE or
                      local authority inspector. It forms part of the legal compliance record.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-400 mb-3">
                  LOLER &mdash; Thorough Examination of Fall Arrest Equipment
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The Lifting Operations and Lifting Equipment Regulations 1998 (LOLER) apply
                  to equipment used for arresting falls, including harnesses, lanyards,
                  retractable fall arresters, and anchor devices. LOLER requires:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">6-monthly thorough examination:</strong>{' '}
                      All fall arrest equipment must be thoroughly examined by a competent
                      person at intervals not exceeding 6 months. This is a detailed inspection
                      that goes beyond the daily pre-use check.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">After any fall arrest event:</strong> If a
                      harness, lanyard, or fall arrester has been subject to a fall arrest load,
                      it must be withdrawn from service immediately and submitted for thorough
                      examination before it can be used again. Energy absorbers that have
                      deployed cannot be reused.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Record keeping:</strong> A report of every
                      thorough examination must be kept for at least 2 years (or until the next
                      thorough examination, whichever is longer). The report must detail the
                      equipment examined, the condition found, any defects identified, and
                      whether the equipment is safe for continued use.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Marking:</strong> Equipment must be clearly
                      marked with a unique identification number so that it can be traced back
                      to its thorough examination records.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Inspection Summary Table */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Inspection Frequency Summary
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                    <span className="text-sm text-white/80">Pre-use visual check (all equipment)</span>
                    <span className="text-xs font-bold text-green-400">Every use</span>
                  </div>
                  <div className="flex items-center justify-between bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                    <span className="text-sm text-white/80">Scaffold formal inspection</span>
                    <span className="text-xs font-bold text-green-400">Every 7 days</span>
                  </div>
                  <div className="flex items-center justify-between bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                    <span className="text-sm text-white/80">Scaffold &mdash; after weather/alteration</span>
                    <span className="text-xs font-bold text-green-400">Immediately</span>
                  </div>
                  <div className="flex items-center justify-between bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                    <span className="text-sm text-white/80">Harness/lanyard thorough examination (LOLER)</span>
                    <span className="text-xs font-bold text-green-400">Every 6 months</span>
                  </div>
                  <div className="flex items-center justify-between bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                    <span className="text-sm text-white/80">After any fall arrest event</span>
                    <span className="text-xs font-bold text-green-400">Before reuse</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-amber-300">
                  <strong>CSCS Test Tip:</strong> The CSCS HS&amp;E test frequently asks about
                  scaffold inspection intervals and LOLER requirements for harnesses. Remember
                  the key intervals: scaffolds every 7 days (or after an event), harnesses
                  every 6 months under LOLER. Also remember that pre-use checks are the
                  user&rsquo;s personal responsibility &mdash; every time, no exceptions.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-3-section-2">
              Access Equipment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
