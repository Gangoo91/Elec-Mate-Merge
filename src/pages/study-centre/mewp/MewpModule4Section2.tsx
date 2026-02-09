import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Truck,
  Gauge,
  Weight,
  Navigation,
  Package,
  RotateCcw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'elevated-travel-categories',
    question: 'Which MEWP categories are designed to be driven while the platform is elevated?',
    options: [
      '1A and 1B only',
      '3A and 3B only',
      'All categories can be driven elevated',
      'No categories allow elevated driving',
    ],
    correctIndex: 1,
    explanation:
      'Only category 3A (mobile vertical / scissor lifts) and 3B (mobile boom lifts) are designed to be driven while the platform is elevated. Categories 1A and 1B are static machines — they must NOT be driven while elevated. Travel speed is automatically restricted when a 3A/3B machine is elevated.',
  },
  {
    id: 'swl-definition',
    question: 'What does the Safe Working Load (SWL) of a MEWP platform include?',
    options: [
      'Only the weight of the operators',
      'Only the weight of tools and materials',
      'The combined weight of ALL operators, ALL tools, and ALL materials on the platform',
      'The total weight of the machine including the platform',
    ],
    correctIndex: 2,
    explanation:
      'The SWL is the combined weight of ALL operator(s) plus ALL tools plus ALL materials on the platform. Everything carried onto the platform counts towards the SWL. If you are unsure whether you are within the limit, you must cease work and verify before continuing.',
  },
  {
    id: 'loading-transport-accidents',
    question:
      'Approximately what proportion of rental company-reported MEWP accidents occur during delivery and collection?',
    options: ['About one tenth', 'About one quarter', 'About one third', 'About one half'],
    correctIndex: 2,
    explanation:
      'Approximately one third of rental company-reported accidents occur during delivery and collection — specifically during loading and unloading onto transport vehicles. This makes it one of the highest-risk activities associated with MEWPs. Only trained and authorised personnel should carry out loading and unloading operations.',
  },
];

const faqs = [
  {
    question: 'Can I travel a scissor lift with the platform raised to save time repositioning?',
    answer:
      'Only if the machine is a category 3A (mobile vertical). Category 3A scissor lifts are designed for elevated travel, but the travel speed is automatically restricted when elevated. You must still observe all elevated driving precautions: watch for ground-level hazards, overhead obstacles, slope changes, and people nearby. If the machine is a category 1A (static vertical), you must NEVER drive it while elevated — lower the platform fully first, retract outriggers, then reposition.',
  },
  {
    question: 'What should I do if I suspect the platform load is close to the Safe Working Load?',
    answer:
      "If you are unsure whether you are within the SWL, you must cease work immediately and verify before continuing. Weigh or estimate the combined weight of all operators, tools, and materials on the platform. Check the SWL on the manufacturer's data plate or the operator's manual. Do not guess — overloading can trigger load-sensing systems (stranding you at height), risk overturn, or cause structural failure. Remove unnecessary materials from the platform before elevating.",
  },
  {
    question: 'Who is responsible for loading and unloading a hired MEWP onto transport?',
    answer:
      "The hire company driver typically loads and unloads the MEWP. Do NOT attempt to load or unload a MEWP onto a transport vehicle unless you are specifically trained and authorised to do so. About one third of rental company-reported accidents occur during delivery and collection. If you need to move a MEWP onto a trailer or flatbed, ensure you have: firm level ground, ramps rated for the machine's weight, a competent driver, clear communication, and an exclusion zone around the loading area.",
  },
  {
    question: 'When travelling a boom lift on a slope, which way should I face?',
    answer:
      "When travelling on slopes, always travel with the heavy end of the machine pointing uphill. For most boom-type MEWPs, the heavy end is the counterweight end (opposite to the boom). This prevents the machine from tipping forward on a downhill gradient. The boom must be stowed before travelling on slopes. Never attempt to drive across a slope unless the manufacturer's manual confirms the machine is rated for the gradient and the specific direction of travel.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Before travelling a MEWP to a new location on site, what is the FIRST thing you should do?',
    options: [
      'Start the engine and begin driving immediately',
      'Check the route is clear of obstacles, pedestrians, and overhead hazards',
      'Raise the platform to check for obstructions',
      'Sound the horn three times',
    ],
    correctAnswer: 1,
    explanation:
      'Before travelling, you must check the route is clear of obstacles, pedestrians, overhead hazards, and ground-level hazards such as kerbs, ramps, potholes, cables, and uneven surfaces. The boom or scissor mechanism should be fully stowed before long-distance travel.',
  },
  {
    id: 2,
    question: 'What must be deployed BEFORE elevating a category 1A or 1B (static) MEWP?',
    options: [
      'The platform extension',
      'The warning beacon',
      'All outriggers and stabilisers',
      'The wind speed indicator',
    ],
    correctAnswer: 2,
    explanation:
      'All outriggers and stabilisers must be fully deployed and the machine levelled BEFORE elevating a static (1A/1B) MEWP. Elevating without outriggers deployed risks catastrophic overturn. Never partially deploy outriggers — all must be fully extended and set on firm ground.',
  },
  {
    id: 3,
    question:
      'When using proportional controls to position a MEWP platform near a structure, what technique should you use?',
    options: [
      'Full control input for speed, then brake suddenly at the target position',
      'Small control inputs for slow, precise movement — use finer controls for final positioning',
      'Switch to manual override and use ground controls only',
      'Have a colleague push the platform into position by hand',
    ],
    correctAnswer: 1,
    explanation:
      'Proportional controls mean small input equals slow movement. Use gentle, gradual control inputs when positioning near structures. Use the finer controls for final positioning. Always leave enough control authority to retreat from a tight position. Never rush to reach the working position.',
  },
  {
    id: 4,
    question: 'What can happen if the SWL of a MEWP platform is exceeded?',
    options: [
      'Nothing — MEWPs have a large safety margin and will still function normally',
      'The machine will automatically lower to the ground',
      'Load-sensing systems may prevent operation (stranding occupants at height), or the machine risks overturn or structural failure',
      'An alarm sounds but the machine continues to operate normally',
    ],
    correctAnswer: 2,
    explanation:
      'Overloading a MEWP can trigger load-sensing systems that prevent further operation — potentially stranding occupants at height. More seriously, overloading risks overturn and structural failure. IPAF warns of the potential for catastrophic collapse. The SWL must never be exceeded.',
  },
  {
    id: 5,
    question: 'Why must sharp turns be avoided when driving a boom-type MEWP while elevated?',
    options: [
      'It wastes battery power',
      'It damages the tyres',
      'Centrifugal forces with the boom extended create a significant tip-over risk',
      'It is too slow to be practical',
    ],
    correctAnswer: 2,
    explanation:
      "When a boom is extended and the machine turns sharply, centrifugal forces act on the elevated boom and platform. With the weight high up and out from the machine's centre of gravity, these forces can cause the machine to tip over. Always make gentle, gradual turns when driving with the platform elevated.",
  },
  {
    id: 6,
    question: 'What requirements must be met before loading a MEWP onto a transport vehicle?',
    options: [
      'Only a valid driving licence is needed',
      'Firm level ground, rated ramps, competent driver, clear communication, exclusion zone, machine at minimum height with boom stowed and outriggers retracted',
      'Just a flat piece of ground and two people',
      "Only the manufacturer's manual needs to be present",
    ],
    correctAnswer: 1,
    explanation:
      "Loading a MEWP onto transport requires: firm, level ground; suitable ramps rated for the machine's weight; a competent driver; clear communication between all personnel; an exclusion zone around the loading area; the machine at minimum height; the boom fully stowed; and outriggers fully retracted. About one third of rental company-reported accidents occur during this activity.",
  },
  {
    id: 7,
    question: 'When repositioning a static MEWP (category 1A/1B), what is the correct sequence?',
    options: [
      'Drive to the new position, then lower the platform',
      'Lower the platform fully, retract outriggers, retract boom/scissor, reposition, re-deploy outriggers, re-level, re-inspect',
      'Simply drag the machine with a forklift',
      'Only retract the outriggers — the platform can stay elevated',
    ],
    correctAnswer: 1,
    explanation:
      'For static machines (1A/1B), you must: lower the platform fully, retract the outriggers, retract the boom or scissor mechanism, then reposition using the drive function or tow as appropriate. At the new position, re-deploy outriggers, re-level the machine, and re-inspect before elevating again. Never move a static MEWP with the platform elevated.',
  },
  {
    id: 8,
    question:
      'On a scissor lift (3A), what safety system cuts drive power if the machine tilts beyond a safe limit?',
    options: [
      'The emergency stop button',
      'The load-sensing system',
      'The pothole protection system',
      'The outrigger interlock',
    ],
    correctAnswer: 2,
    explanation:
      'Scissor lifts (3A) are fitted with a pothole protection system that monitors the tilt of the machine. If the tilt exceeds a safe limit — for example, if a wheel drops into a pothole — the system cuts drive power to prevent the machine from continuing to travel in an unsafe condition. This is a critical safety feature for elevated travel.',
  },
];

export default function MewpModule4Section2() {
  useSEO({
    title: 'Travelling, Elevating & Platform Loading | MEWP Module 4.2',
    description:
      'Safe travelling procedures, elevating and positioning techniques, SWL management, driving while elevated, and loading/unloading MEWPs from transport vehicles.',
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
            <Link to="../mewp-module-4">
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
            <BookOpen className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 4 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Travelling, Elevating & Platform Loading
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Safe travel procedures, elevating and positioning techniques, SWL management, driving
            while elevated, and loading/unloading MEWPs from transport
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Travel:</strong> Check route, stow boom, heavy end uphill on slopes
              </li>
              <li>
                <strong>Elevate:</strong> Outriggers first (1A/1B), smooth inputs, watch proximity
              </li>
              <li>
                <strong>SWL:</strong> Operators + tools + materials = must not exceed data plate
                rating
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>3A/3B:</strong> CAN drive elevated — but with extreme caution and reduced
                speed
              </li>
              <li>
                <strong>1A/1B:</strong> CANNOT drive elevated — always lower and stow first
              </li>
              <li>
                <strong>Loading:</strong> One third of hire accidents happen during
                delivery/collection
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Describe the pre-travel checks and safe travelling procedures for MEWPs',
              'Explain the correct sequence for elevating and positioning a MEWP platform',
              'Calculate and manage Safe Working Load (SWL) on the platform',
              'Identify which MEWP categories may be driven while elevated and the precautions required',
              'Describe the hazards and controls for loading/unloading MEWPs from transport',
              'Explain the correct procedure for repositioning static and mobile MEWPs on site',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Travelling a MEWP */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Travelling a MEWP
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before travelling any MEWP, you must plan the route carefully. Check that the route
                is clear of obstacles, pedestrians, and overhead hazards. Know the machine&rsquo;s
                travel speed limits &mdash; stowed travel speed is significantly faster than
                elevated travel speed. Elevated travel on 3A/3B machines is <strong>MUCH</strong>{' '}
                slower by design.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Rule:</strong> Category 3A and 3B
                  machines
                  <strong> CAN</strong> be driven while elevated &mdash; but only with extreme
                  caution and at automatically restricted speeds. Category 1A and 1B machines{' '}
                  <strong>CANNOT</strong> be driven while elevated. They are static machines and
                  must be fully lowered and stowed before any travel.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Pre-Travel Checks</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Check the route is clear of obstacles, pedestrians, and overhead hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Identify ground-level hazards: kerbs, ramps, potholes, cables, uneven surfaces
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Confirm the machine&rsquo;s travel speed limits (stowed vs elevated)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Use a spotter or banksman where visibility is limited</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Stow boom or scissor mechanism fully before long-distance travel</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Slopes and Gradients</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    When travelling on slopes,{' '}
                    <strong className="text-white">
                      always travel with the heavy end of the machine pointing uphill
                    </strong>
                    . This prevents the machine from tipping forward on a downhill gradient.
                  </p>
                  <p>
                    Never travel with platform occupants unless the machine is specifically designed
                    for it &mdash; only category <strong className="text-white">3A and 3B</strong>{' '}
                    machines permit this. Even then, the boom must be stowed and extreme caution
                    exercised on any gradient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Elevating and Positioning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Elevating and Positioning
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Elevating a MEWP to the working position requires patience and precision. Rushing to
                reach the working height is one of the most common causes of contact with overhead
                obstacles and nearby structures. Smooth, controlled movements are essential at every
                stage of the elevation process.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Static Machines (1A/1B):</strong> All
                  outriggers and stabilisers must be fully deployed and the machine levelled{' '}
                  <strong>BEFORE</strong> any elevation begins. Never elevate a static MEWP without
                  outriggers deployed &mdash; this risks catastrophic overturn.
                </p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Proportional Control Technique
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Small input = slow movement:</strong> Use
                      proportional controls to match speed to the situation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Smooth inputs:</strong> Avoid jerky or sudden
                      control movements &mdash; these cause the platform to swing or jolt
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fine positioning:</strong> Use the finer
                      (slower) controls for final positioning near structures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Retreat authority:</strong> Always leave enough
                      control authority to retreat from a tight position
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Boom-Type MEWPs: Elevating Sequence
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Extend the boom <strong className="text-white">THEN</strong> slew (rotate)
                      &mdash; do not combine both movements simultaneously near structures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Constantly check proximity to overhead obstacles as you elevate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Maintain awareness of workers, vehicles, and pedestrians below at all times
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Never rush to reach the working position &mdash; a controlled approach is
                      always safer
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Safe Working Load Management */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Safe Working Load Management
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every MEWP has a rated Safe Working Load (SWL) &mdash; the maximum total weight that
                may be carried on the platform. This is not just the weight of the operator. The SWL
                is the combined weight of <strong>ALL</strong> operator(s), <strong>ALL</strong>{' '}
                tools, and <strong>ALL</strong> materials on the platform. Exceeding this limit can
                have catastrophic consequences.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Where to Find the SWL:</strong> The SWL is
                  displayed on the manufacturer&rsquo;s data plate (usually mounted on the platform
                  or turret), in the operator&rsquo;s manual, and on decals affixed to the machine.
                  If you cannot read the SWL clearly, do <strong>NOT</strong> use the machine until
                  it is confirmed.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Weight className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">SWL Calculation</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p className="font-medium text-white">
                    SWL = Weight of ALL operator(s) + Weight of ALL tools + Weight of ALL materials
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Distribute load <strong className="text-white">EVENLY</strong> across the
                        platform &mdash; no concentration on one side
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Account for <strong className="text-white">everything</strong>: tool bags,
                        battery drills, cable drums, fixings, lunch boxes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        If unsure of weight: <strong className="text-white">CEASE work</strong> and
                        verify before continuing
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Remove unnecessary items from the platform before elevating</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Warning: Consequences of Overloading
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>Exceeding the SWL can result in any of the following:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Load-sensing lockout:</strong> The
                        machine&rsquo;s load-sensing system prevents further operation, potentially{' '}
                        <strong className="text-red-300">stranding occupants at height</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Overturn:</strong> Excess weight shifts the
                        centre of gravity beyond the machine&rsquo;s stability envelope
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Structural failure:</strong> Boom, scissor
                        mechanism, or platform components may fail under excessive load
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Catastrophic collapse:</strong> IPAF warns
                        that overloading carries the potential for catastrophic collapse of the
                        machine
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Driving While Elevated (3A/3B Only) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Driving While Elevated (3A/3B Only)
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Only machines in categories <strong>3A</strong> (mobile vertical / scissor lifts)
                and <strong>3B</strong> (mobile boom lifts) are designed to be driven while the
                platform is elevated. Travel speed is <strong>automatically restricted</strong> when
                the platform is raised &mdash; this is a critical safety feature that must never be
                overridden or bypassed.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical: Never Drive 1A/1B While Elevated
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Category 1A and 1B machines are <strong className="text-white">static</strong>{' '}
                  MEWPs. They are <strong className="text-red-300">NOT</strong> designed to be
                  driven while elevated. Attempting to move a static MEWP with the platform raised
                  risks immediate overturn. Always lower the platform fully, retract all outriggers,
                  and stow the boom/scissor before repositioning a 1A or 1B machine.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Elevated Driving Awareness</p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  When driving a 3A or 3B machine while elevated, maintain constant awareness of:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Ground conditions:</strong> Potholes, soft
                      ground, kerbs, ramps, debris, cables
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Overhead obstacles:</strong> Beams, cables,
                      pipework, building edges, other plant
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">People and vehicles:</strong> Workers,
                      pedestrians, other mobile plant operating nearby
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Slope changes:</strong> Even minor gradient
                      changes affect stability when elevated
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-amber-400 mb-2">
                    Sharp Turns &mdash; Tip-Over Risk
                  </p>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">Avoid sharp turns</strong>, especially with a
                    boom extended. Centrifugal forces act on the elevated boom and platform during
                    turning. With the weight high up and out from the machine&rsquo;s centre of
                    gravity, these forces create a significant{' '}
                    <strong className="text-white">tip-over risk</strong>. Always make gentle,
                    gradual turns when driving with the platform elevated.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Banksman / Spotter Requirements
                  </p>
                  <p className="text-sm text-white/80">
                    Use a banksman or spotter for blind spots &mdash; the operator&rsquo;s view of
                    the ground is significantly impaired when the platform is elevated, particularly
                    on boom-type machines. The banksman must have clear line of sight to both the
                    operator and the surrounding area, and agreed communication signals must be in
                    place.
                  </p>
                </div>

                <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-teal-400 mb-2">
                    Scissor Lifts: Pothole Protection System
                  </p>
                  <p className="text-sm text-white/80">
                    Category 3A scissor lifts are fitted with a{' '}
                    <strong className="text-white">pothole protection system</strong>. This monitors
                    the tilt of the machine during elevated travel. If the tilt exceeds a safe limit
                    &mdash; for example, if a wheel drops into a pothole or the machine encounters
                    an unexpected slope change &mdash; the system
                    <strong className="text-white"> cuts drive power</strong> to prevent the machine
                    from continuing to travel in an unsafe condition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Loading and Unloading from Transport */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Loading and Unloading from Transport
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Loading and unloading MEWPs onto transport vehicles is a{' '}
                <strong>high-risk activity</strong>. Approximately <strong>one third</strong> of
                rental company-reported accidents occur during delivery and collection. This phase
                of MEWP operations demands careful planning, competent personnel, and strict
                adherence to safe procedures.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">High-Risk Activity</p>
                </div>
                <p className="text-sm text-white/80">
                  About <strong className="text-red-300">one third</strong> of rental
                  company-reported MEWP accidents occur during delivery and collection. The hire
                  company driver typically loads and unloads the machine.{' '}
                  <strong className="text-white">Do NOT</strong> attempt to load or unload a MEWP
                  unless you are specifically trained and authorised to do so.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    Requirements for Loading/Unloading
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Firm, level ground:</strong> The transport
                      vehicle must be on a stable, level surface
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Suitable ramps:</strong> Ramps must be rated
                      for the weight of the machine being loaded
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Competent driver:</strong> Only a trained and
                      authorised person should operate the MEWP during loading
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Clear communication:</strong> Agreed signals
                      between the driver and any assistants
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Exclusion zone:</strong> No personnel in the
                      loading area other than those directly involved
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Machine at minimum height:</strong> Platform
                      lowered fully, boom fully stowed, outriggers retracted
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Hire Company Responsibility:</strong> The
                  hire company driver typically loads and unloads the MEWP as part of the delivery
                  and collection service. If you are receiving a MEWP on site, ensure you have
                  prepared firm, level ground for the delivery, with adequate space for the
                  transport vehicle to manoeuvre safely. Maintain an exclusion zone around the
                  loading area for the duration of the operation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Repositioning on Site */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Repositioning on Site
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Repositioning a MEWP on site is a common task, but the procedure differs
                significantly between static machines (1A/1B) and mobile machines (3A/3B). Getting
                the procedure wrong &mdash; particularly for static machines &mdash; can result in
                overturn. Plan your repositioning carefully: position the MEWP correctly the{' '}
                <strong>first time</strong> where possible to minimise unnecessary movement.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Static Machines (1A/1B)</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    The full sequence <strong className="text-white">MUST</strong> be followed:
                  </p>
                  <ol className="text-sm text-white/80 space-y-1 list-decimal list-inside">
                    <li>Lower the platform fully</li>
                    <li>Retract the boom or scissor mechanism</li>
                    <li>Retract all outriggers</li>
                    <li>Reposition using drive function or tow (as appropriate)</li>
                    <li>Re-deploy all outriggers at the new position</li>
                    <li>Re-level the machine</li>
                    <li>Re-inspect before elevating</li>
                  </ol>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <RotateCcw className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Mobile Machines (3A/3B)</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Can reposition while elevated, but must observe:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>All elevated driving precautions (Section 04)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Restricted travel speed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ground condition awareness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Overhead obstacle checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Banksman for blind spots</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Best Practice:</strong> Plan your work to
                  minimise repositioning. Before you first position the MEWP, assess the full scope
                  of the task and identify the optimal location. Correct positioning the first time
                  reduces risk, saves time, and avoids repeated elevation/lowering cycles that
                  contribute to operator fatigue and increased exposure to hazards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-4-section-3">
              Next: Working Near Structures, Power Lines & Public Areas
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
