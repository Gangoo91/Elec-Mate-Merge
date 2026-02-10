import {
  ArrowLeft,
  ArrowRight,
  Flame,
  CheckCircle,
  AlertTriangle,
  Wind,
  Thermometer,
  Eye,
  Zap,
  ShieldAlert,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'fs-m1s3-smoke-deaths',
    question:
      'What percentage of fire deaths are caused by smoke inhalation rather than burns?',
    options: [
      'Approximately 25%',
      'Approximately 50%',
      'Approximately 75%',
      'Approximately 90%',
    ],
    correctIndex: 2,
    explanation:
      'Approximately 75% of fire deaths are caused by smoke inhalation, not direct burns. Smoke contains toxic gases including carbon monoxide (CO) and hydrogen cyanide (HCN) that can incapacitate and kill far more quickly than flames. This is why early detection and evacuation are so critical — by the time flames are visible, the smoke layer may already be lethal.',
  },
  {
    id: 'fs-m1s3-flashover-temp',
    question:
      'At approximately what ceiling temperature does flashover occur in a compartment fire?',
    options: [
      '100-200\u00B0C',
      '300-400\u00B0C',
      '500-600\u00B0C',
      '900-1000\u00B0C',
    ],
    correctIndex: 2,
    explanation:
      'Flashover typically occurs when the hot gas layer at ceiling level reaches approximately 500-600\u00B0C. At this temperature, the thermal radiation from the smoke layer is intense enough to ignite all exposed combustible surfaces in the compartment simultaneously. This is a critical transition point beyond which the room becomes unsurvivable.',
  },
  {
    id: 'fs-m1s3-backdraught',
    question: 'What is backdraught and what causes it?',
    options: [
      'A sudden increase in wind that fans a fire to burn faster',
      'A deflagration caused by sudden oxygen introduction to a ventilation-starved fire',
      'The collapse of a burning structure due to weakened supports',
      'A fire that spreads backwards along a cable route towards the source',
    ],
    correctIndex: 1,
    explanation:
      'Backdraught (also spelt backdraft) is a deflagration — a rapid combustion event — caused when fresh air (oxygen) is suddenly introduced into a compartment where a fire has been burning in a ventilation-limited state. The fire has produced large volumes of unburnt pyrolysis gases that are above their ignition temperature but lack sufficient oxygen to burn. Opening a door or window introduces the missing oxygen, causing the accumulated gases to ignite explosively.',
  },
];

const faqs = [
  {
    question: 'What is the difference between flashover and backdraught?',
    answer:
      'Flashover and backdraught are both dangerous fire phenomena, but they occur under very different conditions. Flashover happens in a well-ventilated fire during the growth phase — the hot smoke layer radiates heat downward until all combustible surfaces in the room reach their ignition temperature and ignite simultaneously. The room transitions from a localised fire to a fully involved compartment fire. Backdraught, by contrast, occurs in a ventilation-limited fire where the oxygen supply has been restricted (e.g. in a sealed room). The fire produces large volumes of hot, unburnt gases. When a door or window is opened, fresh oxygen rushes in and mixes with these gases, causing a sudden, explosive combustion event (deflagration). Flashover is a thermal radiation event; backdraught is a ventilation event. Both are unsurvivable if you are in the compartment.',
  },
  {
    question: 'Why does fire spread through cable routes and service risers?',
    answer:
      'Cable routes, service risers, trunking systems and ducts create concealed pathways that connect different rooms, floors and compartments within a building. Fire can spread through these routes in several ways: direct flame spread along combustible cable insulation; convection of hot gases through vertical risers (the stack effect draws hot gases upward); conduction through metallic conduit and tray systems; and the failure of fire stopping (intumescent seals, fire-rated collars and penetration seals) that should compartmentalise these routes. For electricians, this is critically important — you are responsible for ensuring that fire stopping is maintained whenever you install, modify or add cables through fire-rated walls and floors. Breaching fire compartmentation by running cables through unsealed penetrations is one of the most common causes of rapid fire spread in buildings.',
  },
  {
    question: 'How quickly can a room fire reach flashover?',
    answer:
      'In a typical domestic or office room with a standard fuel load, a fire can progress from ignition to flashover in as little as 3 to 5 minutes. However, this time varies significantly depending on several factors: the type and quantity of fuel present (modern synthetic furnishings burn much faster than traditional materials); the room geometry and ceiling height (smaller rooms with lower ceilings reach flashover faster); the ventilation conditions (an open window provides the oxygen that accelerates growth); and whether fire suppression systems (sprinklers) are present. In modern open-plan offices with large quantities of synthetic materials, flashover can occur in under 3 minutes. This extremely short timeframe is why immediate evacuation upon fire alarm activation is essential — there is no safe time to "investigate" or collect belongings.',
  },
  {
    question: 'What should you do if you encounter signs of backdraught?',
    answer:
      'If you observe warning signs of potential backdraught — pulsing or "breathing" smoke from gaps around doors and windows, yellowish-grey or brown smoke, windows that are blackened by soot deposits and hot to the touch, or air being drawn inward at small openings — you must NOT open any doors or windows into the compartment. Opening a door would introduce the fresh oxygen that triggers the explosive event. Instead, you should: evacuate the area immediately and ensure no one else approaches; call the fire service (999) if not already called and specifically report the signs you have observed; keep all doors and windows to the affected area closed; move to a safe distance and wait for the fire service, who have specialist training, equipment and techniques (such as fog nailing and controlled ventilation) to manage backdraught situations. Under no circumstances should untrained personnel attempt to "ventilate" or enter a room showing these signs.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following correctly lists the five phases of fire development in order?',
    options: [
      'Ignition, flashover, growth, fully developed, decay',
      'Ignition, growth, flashover, fully developed, decay',
      'Growth, ignition, flashover, decay, fully developed',
      'Ignition, growth, fully developed, flashover, decay',
    ],
    correctAnswer: 1,
    explanation:
      'The five phases of fire development in correct order are: ignition, growth, flashover, fully developed, and decay. This sequence follows the classic time-temperature curve used in fire engineering. After ignition, the fire grows exponentially until it reaches flashover — the critical transition to full room involvement — followed by the fully developed phase at peak intensity, and finally decay as fuel is consumed.',
  },
  {
    id: 2,
    question:
      'Which toxic gas is responsible for the majority of smoke inhalation deaths in fires?',
    options: [
      'Carbon dioxide (CO\u2082)',
      'Hydrogen cyanide (HCN)',
      'Carbon monoxide (CO)',
      'Sulphur dioxide (SO\u2082)',
    ],
    correctAnswer: 2,
    explanation:
      'Carbon monoxide (CO) is the single greatest killer in fire smoke. It is colourless and odourless, and binds to haemoglobin approximately 200 times more readily than oxygen, forming carboxyhaemoglobin. This prevents the blood from carrying oxygen to vital organs. Even relatively low concentrations (1,000 ppm) can cause loss of consciousness within minutes and death shortly after. Hydrogen cyanide (HCN) is also extremely toxic and acts synergistically with CO, but CO is present in greater quantities in most fire smoke.',
  },
  {
    id: 3,
    question:
      'At approximately what temperature range does flashover occur at ceiling level?',
    options: [
      '200-300\u00B0C',
      '350-450\u00B0C',
      '500-600\u00B0C',
      '800-1000\u00B0C',
    ],
    correctAnswer: 2,
    explanation:
      'Flashover occurs when the hot gas (smoke) layer at ceiling level reaches approximately 500-600\u00B0C. At this temperature, the radiant heat flux at floor level exceeds approximately 20 kW/m\u00B2, which is sufficient to ignite all exposed combustible materials in the compartment simultaneously. This transition marks the boundary between a survivable and an unsurvivable fire condition.',
  },
  {
    id: 4,
    question:
      'Which of the following is a recognised warning sign of potential backdraught?',
    options: [
      'Bright orange flames visible through windows',
      'Loud crackling and popping sounds from inside the room',
      'Pulsing or "breathing" smoke from gaps, with yellowish-grey colour and windows blackened by soot',
      'A strong smell of burning plastic with no visible smoke',
    ],
    correctAnswer: 2,
    explanation:
      'The classic warning signs of backdraught include: pulsing or "breathing" smoke emerging from gaps around doors and windows (the fire is starved of oxygen and fluctuating); yellowish-grey or brown-coloured smoke (indicating incomplete combustion due to oxygen starvation); windows that are blackened by heavy soot deposits and hot to the touch; and air being drawn inward at openings rather than smoke pushing outward. These signs indicate a ventilation-limited fire with accumulated unburnt gases — opening a door would trigger a deflagration.',
  },
  {
    id: 5,
    question:
      'Which fire spread mechanism involves hot gases rising and carrying heat to upper floors and remote areas?',
    options: [
      'Conduction',
      'Convection',
      'Radiation',
      'Direct burning',
    ],
    correctAnswer: 1,
    explanation:
      'Convection is the transfer of heat through the movement of hot gases and air. In a building fire, hot combustion gases (which can exceed 600\u00B0C) rise and travel along ceilings, through stairwells, lift shafts, service risers and ductwork. This is the primary mechanism by which fire spreads to upper floors. The "stack effect" in tall buildings amplifies convective spread, drawing hot gases upward through vertical shafts. Convection is the most significant fire spread mechanism within buildings.',
  },
  {
    id: 6,
    question:
      'During which phase of fire development do the majority of fire casualties occur?',
    options: [
      'Ignition phase',
      'Growth phase',
      'Fully developed phase',
      'Decay phase',
    ],
    correctAnswer: 1,
    explanation:
      'The majority of fire casualties occur during the growth phase. During this phase, smoke production increases rapidly and the descending smoke layer reduces visibility and introduces toxic gases at head height. Occupants who have not yet evacuated become trapped or incapacitated by smoke inhalation. By the time flashover occurs, the compartment of origin is already unsurvivable — but the growth phase smoke has often spread well beyond that room through corridors and stairwells, affecting people in other parts of the building.',
  },
  {
    id: 7,
    question:
      'In the fully developed phase of a fire, what primarily limits the rate of burning?',
    options: [
      'The type of fuel available',
      'The temperature of the fire',
      'The oxygen supply (ventilation)',
      'The size of the compartment',
    ],
    correctAnswer: 2,
    explanation:
      'After flashover, a fire transitions from being fuel-controlled (limited by the amount and type of fuel) to being ventilation-controlled (limited by the available oxygen supply). In the fully developed phase, all combustible materials are burning and there is more fuel available than the oxygen supply can support. The rate of burning is therefore governed by the rate at which fresh air (oxygen) can enter the compartment through openings such as windows, doors and ventilation systems. This is why breaking a window during a fully developed fire can dramatically increase the fire intensity.',
  },
  {
    id: 8,
    question:
      'During the decay phase of a fire, which dangerous phenomenon can occur if a door or window is opened?',
    options: [
      'Flashover',
      'Spontaneous combustion',
      'Backdraught',
      'Thermal runaway',
    ],
    correctAnswer: 2,
    explanation:
      'During the decay phase, if the fire has been burning in a ventilation-limited state, large volumes of hot, unburnt pyrolysis gases accumulate in the compartment. The fire may appear to be dying down because it has consumed the available oxygen. However, these gases are still above their ignition temperature. If a door or window is opened — introducing fresh oxygen — the gases can ignite explosively in a backdraught (deflagration). This is why the decay phase can be as dangerous as the growth phase, and why untrained persons should never open doors into smoke-filled rooms.',
  },
];

export default function FireSafetyModule1Section3() {
  useSEO({
    title: 'Fire Behaviour & Development | Fire Safety Module 1.3',
    description:
      'Phases of fire development, ignition, growth, flashover, fully developed fire, decay, backdraught, fire spread mechanisms, smoke production, and the time-temperature curve for Fire Safety & Fire Marshal certification.',
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
            <Link to="../fire-safety-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Flame className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fire Behaviour &amp; Development
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding how fires ignite, grow, reach flashover, burn at full intensity, and decay
            &mdash; including the deadly phenomena of backdraught and the mechanisms by which fire
            spreads through buildings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Five phases:</strong> Ignition &rarr; Growth &rarr; Flashover &rarr; Fully
                Developed &rarr; Decay
              </li>
              <li>
                <strong>Flashover:</strong> 500&ndash;600&deg;C at ceiling &mdash; everything ignites
                simultaneously
              </li>
              <li>
                <strong>Smoke kills:</strong> ~75% of fire deaths from inhalation, not burns
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">For Electricians</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Cable routes:</strong> Key fire spread pathway &mdash; fire stopping is critical
              </li>
              <li>
                <strong>Backdraught:</strong> Never open doors showing warning signs
              </li>
              <li>
                <strong>3&ndash;5 minutes:</strong> Ignition to flashover in a typical room
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Describe the five phases of fire development and the time-temperature curve',
              'Explain why smoke is the primary killer in fires and identify the key toxic components',
              'Define flashover and state the approximate temperature at which it occurs',
              'Explain the difference between fuel-controlled and ventilation-controlled burning',
              'Identify the warning signs of backdraught and the correct response',
              'Describe the four mechanisms of fire spread and their relevance to electrical installations',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Phases of Fire Development */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Phases of Fire Development
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fire does not burn at a constant rate. It develops through a series of{' '}
                <strong>five distinct phases</strong>, each with different characteristics, hazards and
                implications for fire safety. Understanding these phases is fundamental to
                understanding why evacuation timelines are so critical and why fire protection measures
                are designed the way they are.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  The Five Phases of Fire Development
                </p>
                <p className="text-sm text-white">
                  Every compartment fire follows the same general development pattern: <strong>ignition</strong>,{' '}
                  <strong>growth</strong>, <strong>flashover</strong>,{' '}
                  <strong>fully developed</strong>, and <strong>decay</strong>. The time taken to
                  progress through each phase varies depending on fuel type, fuel load, compartment
                  geometry and ventilation conditions. In a typical domestic room with modern furnishings,
                  the progression from ignition to flashover can take as little as{' '}
                  <strong>3 to 5 minutes</strong>.
                </p>
              </div>

              <div className="grid sm:grid-cols-5 gap-3">
                {[
                  {
                    phase: 'Ignition',
                    detail: 'Heat source meets fuel. Fire may smoulder or produce open flame.',
                    colour: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
                  },
                  {
                    phase: 'Growth',
                    detail: 'Fire grows exponentially. Smoke layer descends. Most casualties occur here.',
                    colour: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
                  },
                  {
                    phase: 'Flashover',
                    detail: 'All surfaces ignite simultaneously. 500-600\u00B0C at ceiling. Unsurvivable.',
                    colour: 'bg-red-500/20 border-red-500/30 text-red-400',
                  },
                  {
                    phase: 'Fully Developed',
                    detail: 'Maximum intensity. 800-1200\u00B0C. Ventilation-controlled burning.',
                    colour: 'bg-red-600/20 border-red-600/30 text-red-300',
                  },
                  {
                    phase: 'Decay',
                    detail: 'Fuel consumed. Temperature drops. Backdraught risk if ventilation-starved.',
                    colour: 'bg-rose-500/20 border-rose-500/30 text-rose-400',
                  },
                ].map((item, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${item.colour}`}>
                    <p className="text-xs font-bold mb-1">{item.phase}</p>
                    <p className="text-xs text-white/70">{item.detail}</p>
                  </div>
                ))}
              </div>

              <p>
                The <strong>time-temperature curve</strong> is a graphical representation of this
                progression. Temperature rises slowly during ignition, accelerates exponentially during
                growth, spikes sharply at flashover, plateaus during the fully developed phase (limited
                by oxygen supply), and gradually falls during decay. This curve is used by fire
                engineers to design structural fire resistance ratings, sprinkler activation times and
                evacuation strategies.
              </p>

              {/* Fire Development Curve Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Fire Development Curve &mdash; Time vs Temperature
                </p>
                <div className="relative w-full max-w-lg mx-auto">
                  {/* Y-axis label */}
                  <div className="absolute -left-1 top-0 bottom-8 flex items-center">
                    <span className="text-[10px] text-white/50 -rotate-90 whitespace-nowrap">
                      Temperature (&deg;C)
                    </span>
                  </div>
                  {/* Chart area */}
                  <div className="ml-8 mr-2">
                    {/* Temperature markers */}
                    <div className="flex flex-col justify-between h-48 sm:h-56 relative border-l border-b border-white/20">
                      {/* 1200 line */}
                      <div className="absolute top-0 left-0 right-0 flex items-center">
                        <span className="text-[9px] text-white/40 -ml-7 w-6 text-right">1200</span>
                        <div className="flex-1 border-t border-dashed border-white/10 ml-1" />
                      </div>
                      {/* 800 line */}
                      <div className="absolute top-[16%] left-0 right-0 flex items-center">
                        <span className="text-[9px] text-white/40 -ml-5 w-4 text-right">800</span>
                        <div className="flex-1 border-t border-dashed border-white/10 ml-1" />
                      </div>
                      {/* 600 line - Flashover */}
                      <div className="absolute top-[40%] left-0 right-0 flex items-center">
                        <span className="text-[9px] text-red-400/70 -ml-5 w-4 text-right">600</span>
                        <div className="flex-1 border-t border-dashed border-red-400/30 ml-1" />
                        <span className="text-[9px] text-red-400/70 ml-1 whitespace-nowrap">
                          Flashover zone
                        </span>
                      </div>
                      {/* 300 line */}
                      <div className="absolute top-[65%] left-0 right-0 flex items-center">
                        <span className="text-[9px] text-white/40 -ml-5 w-4 text-right">300</span>
                        <div className="flex-1 border-t border-dashed border-white/10 ml-1" />
                      </div>
                      {/* Phase labels along the bottom */}
                      <div className="absolute -bottom-7 left-0 right-0 flex justify-between px-1">
                        <span className="text-[8px] sm:text-[9px] text-amber-400/70">Ignition</span>
                        <span className="text-[8px] sm:text-[9px] text-orange-400/70">Growth</span>
                        <span className="text-[8px] sm:text-[9px] text-red-400/70 font-bold">
                          Flashover
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-red-300/70">Fully Dev.</span>
                        <span className="text-[8px] sm:text-[9px] text-rose-400/70">Decay</span>
                      </div>
                    </div>
                    {/* X-axis label */}
                    <p className="text-center text-[10px] text-white/50 mt-8">
                      Time &rarr;
                    </p>
                  </div>
                </div>
                <p className="text-xs text-white/50 text-center mt-4">
                  Typical compartment fire: 3&ndash;5 minutes from ignition to flashover. Peak
                  temperatures 800&ndash;1200&deg;C during fully developed phase.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Critical Fact</p>
                </div>
                <p className="text-sm text-white/80">
                  The majority of fire casualties occur during the <strong>growth phase</strong>, not
                  during flashover or the fully developed phase. By the time flashover occurs, the
                  compartment of origin is already unsurvivable &mdash; but smoke from the growth phase
                  has often spread through corridors and stairwells, trapping and incapacitating
                  occupants in other parts of the building. This is why{' '}
                  <strong>early detection and immediate evacuation</strong> save lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Ignition Phase */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Ignition Phase
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The ignition phase is the very beginning of a fire &mdash; the moment when a{' '}
                <strong>heat source</strong> comes into contact with a <strong>fuel source</strong> in
                the presence of sufficient <strong>oxygen</strong> to sustain combustion. This is the
                point at which the fire triangle is completed. Ignition may produce immediate open
                flame, or it may begin as a smouldering, incipient fire with little or no visible
                flame.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Definition &mdash; Incipient / Smouldering Fire
                </p>
                <p className="text-sm text-white">
                  An <strong>incipient fire</strong> (also called a smouldering fire) is a fire in its
                  earliest stage, where combustion is occurring below the surface or at very low
                  intensity. Smouldering fires produce smoke and heat but may not produce visible
                  flame for extended periods &mdash; potentially hours. They are particularly common
                  in electrical installations where <strong>overheated cables in concealed voids</strong>,
                  overloaded connections or arcing faults generate enough heat to char insulation
                  without producing open flame.
                </p>
              </div>

              <p>
                Detection at the ignition stage is crucial because the fire can still be controlled
                or extinguished with minimal effort. However, incipient fires are difficult to detect
                because they may be hidden within walls, ceilings or equipment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Detection Methods at the Ignition Stage
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-rose-400 mb-2">Smoke Detectors</p>
                    <ul className="text-xs text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Detect smoke particles in the air &mdash; effective for smouldering fires</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Ionisation type: better for fast-flaming fires with small particles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Optical type: better for smouldering fires with larger particles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Respond during incipient stage &mdash; earliest possible warning</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-rose-400 mb-2">Heat Detectors</p>
                    <ul className="text-xs text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Respond to temperature rise, not smoke &mdash; less prone to false alarms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Fixed temperature type: activates at a set threshold (e.g. 57&deg;C)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Rate-of-rise type: activates on rapid temperature increase</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Slower response &mdash; fire may have progressed to growth phase before activation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Electrician&apos;s Relevance</p>
                </div>
                <p className="text-sm text-white/80">
                  Many electrical fires begin as smouldering, incipient fires. An overheated cable in
                  a ceiling void, a loose connection generating heat through resistance, or an arcing
                  fault behind a consumer unit can smoulder for <strong>hours</strong> before
                  producing enough heat or flame to activate detection systems. This is why{' '}
                  <strong>thermal imaging surveys</strong> of electrical installations are valuable
                  &mdash; they can identify hot spots that indicate incipient fire conditions before
                  they develop into open flame.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Growth Phase & Smoke Production */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Growth Phase &amp; Smoke Production
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Once ignition has occurred and the fire has established itself, it enters the{' '}
                <strong>growth phase</strong>. During this phase, the fire grows{' '}
                <strong>exponentially</strong> if unchecked &mdash; the rate of heat release increases
                rapidly as more fuel becomes involved. Flames spread across surfaces, the smoke layer
                develops at ceiling level and begins to descend, and temperatures within the
                compartment rise sharply.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Critical Fact &mdash; Smoke Is the Primary Killer
                </p>
                <p className="text-sm text-white">
                  Approximately <strong>75% of fire deaths</strong> are caused by smoke inhalation,
                  not direct burns. Smoke is a complex mixture of hot gases, vapours and solid
                  particulates produced by incomplete combustion. It kills through a combination of{' '}
                  <strong>toxic poisoning</strong> (carbon monoxide and hydrogen cyanide),{' '}
                  <strong>asphyxiation</strong> (oxygen depletion), <strong>thermal injury</strong> to
                  the respiratory tract, and <strong>disorientation</strong> (zero visibility causing
                  people to become lost or trapped).
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Toxic Components of Fire Smoke
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      gas: 'Carbon Monoxide (CO)',
                      detail:
                        'Colourless, odourless. Binds to haemoglobin 200x more readily than O\u2082. Causes confusion, loss of consciousness, death. The single biggest killer in fires.',
                    },
                    {
                      gas: 'Hydrogen Cyanide (HCN)',
                      detail:
                        'Produced when nitrogen-containing materials burn (nylon, polyurethane, wool). Extremely toxic — inhibits cellular respiration. Acts synergistically with CO.',
                    },
                    {
                      gas: 'Carbon Dioxide (CO\u2082)',
                      detail:
                        'Produced in large quantities. At high concentrations causes rapid breathing, which increases inhalation of other toxins. Displaces oxygen.',
                    },
                    {
                      gas: 'Particulates (Soot)',
                      detail:
                        'Fine carbon particles and condensed organic compounds. Coat the lungs and airways. Reduce visibility to near zero — a major cause of disorientation.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-rose-400 mb-1">{item.gas}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                During the growth phase, the <strong>smoke layer</strong> forms at ceiling level and
                progressively descends toward the floor. As it descends, visibility at head height
                drops rapidly &mdash; in a typical room, the smoke layer can reach head height within{' '}
                <strong>2 to 3 minutes</strong> of ignition. The temperature of the smoke layer
                increases as the fire grows, and the toxic gas concentration rises with it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Factors Affecting Rate of Growth
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Fuel load:</strong> The type and quantity of combustible material in the
                      room. Modern synthetic furnishings (polyurethane foam, plastics) burn far faster
                      and produce more toxic smoke than traditional natural materials (wood, cotton).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Ventilation:</strong> An open window or door provides oxygen that
                      accelerates fire growth. A sealed room will slow growth but may create
                      backdraught conditions later.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Room geometry:</strong> Smaller rooms with lower ceilings reach flashover
                      faster because the smoke layer has less volume to fill before heat builds to
                      critical levels.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Ceiling material:</strong> Combustible ceiling linings (e.g. polystyrene
                      tiles) can dramatically accelerate fire spread across the ceiling, increasing
                      the rate of heat release and hastening flashover.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Suppression systems:</strong> Sprinklers activating during the growth
                      phase can control or extinguish the fire, preventing flashover entirely. This is
                      why sprinkler systems save lives.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Flashover */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Flashover
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Flashover</strong> is the critical transition point in a compartment fire. It
                is the moment when all exposed combustible surfaces in the room reach their ignition
                temperature simultaneously and ignite. The fire transitions from a localised,
                growing fire to a <strong>fully involved compartment fire</strong> in a matter of
                seconds.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">
                  Key Definition &mdash; Flashover
                </p>
                <p className="text-sm text-white">
                  Flashover occurs when the hot gas layer at ceiling level reaches approximately{' '}
                  <strong>500&ndash;600&deg;C</strong>. At this temperature, the thermal radiation
                  from the smoke layer (approximately 20 kW/m&sup2; at floor level) is intense enough
                  to simultaneously ignite all combustible materials in the compartment &mdash;
                  furniture, carpet, curtains, wall coverings, and anything else that can burn. The
                  room transitions from partial involvement to <strong>total involvement</strong> in
                  seconds.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Warning Signs of Approaching Flashover
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Rolling flames across the ceiling:</strong> Flames in the hot gas layer
                      roll across the ceiling surface, igniting gases as they travel &mdash; this is
                      called <strong>rollover</strong> or <strong>flameover</strong> and is an
                      immediate precursor to flashover.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Intense radiant heat:</strong> The heat radiated by the smoke layer
                      becomes unbearable, even at floor level. Exposed skin feels as though it is
                      burning without direct flame contact.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Rapid temperature rise:</strong> Temperatures in the room escalate
                      extremely quickly &mdash; the transition from pre-flashover to post-flashover
                      can occur in under 10 seconds.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Ignition of remote items:</strong> Objects far from the original fire
                      begin to smoulder or ignite from radiant heat alone, without direct flame
                      contact.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">No Survivability</p>
                </div>
                <p className="text-sm text-white/80">
                  Once flashover occurs, the compartment is <strong>unsurvivable</strong>. No person
                  can remain in or enter the room after flashover. Even professional firefighters in
                  full protective equipment and breathing apparatus cannot safely enter a
                  post-flashover compartment &mdash; the temperatures (exceeding 600&deg;C) will
                  overwhelm their protective clothing within seconds. This is why the fire service
                  fights post-flashover fires <strong>defensively</strong> (from outside the
                  compartment) rather than offensively (from inside).
                </p>
              </div>

              <p>
                The average time from ignition to flashover in a modern furnished room is{' '}
                <strong>3 to 5 minutes</strong>. This means that if a fire starts in a room with
                standard office or domestic furnishings, occupants have at most 3 to 5 minutes to
                detect the fire, raise the alarm, and evacuate before the room becomes a death trap.
                With modern synthetic materials, this window can be even shorter.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Fully Developed Fire & Ventilation-Controlled Burning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Fully Developed Fire &amp; Ventilation-Controlled Burning
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                After flashover, the fire enters its <strong>fully developed phase</strong>. This is
                the period of maximum heat release and the greatest intensity. Every combustible
                surface in the compartment is burning, and the fire has transitioned from being{' '}
                <strong>fuel-controlled</strong> to being <strong>ventilation-controlled</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Concept &mdash; Fuel-Controlled vs Ventilation-Controlled
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-bold text-amber-400 mb-1">Fuel-Controlled (Pre-Flashover)</p>
                    <p className="text-xs text-white/70">
                      During the growth phase, the fire&apos;s intensity is limited by the{' '}
                      <strong>amount and type of fuel</strong> that is currently burning. There is
                      more oxygen available than the fire needs. Adding more fuel (or the fire
                      spreading to new fuel) increases the fire&apos;s intensity.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-bold text-red-400 mb-1">Ventilation-Controlled (Post-Flashover)</p>
                    <p className="text-xs text-white/70">
                      After flashover, all available fuel is burning and there is{' '}
                      <strong>more fuel than oxygen can support</strong>. The fire&apos;s intensity is
                      now limited by the rate at which fresh air (oxygen) can enter through openings.
                      Opening a window increases intensity; closing one reduces it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Characteristics of the Fully Developed Phase
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Temperatures:</strong> Compartment temperatures reach{' '}
                      <strong>800&ndash;1200&deg;C</strong>. Steel begins to lose structural strength
                      at approximately 550&deg;C and fails at around 700&deg;C (without fire
                      protection). Concrete can spall and crack above 300&deg;C.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Structural damage:</strong> Prolonged exposure to these temperatures
                      causes structural elements to deform, crack or collapse. This is why building
                      regulations require minimum fire resistance periods (30, 60, 90 or 120 minutes)
                      for structural elements.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Fire spread to adjacent compartments:</strong> The intense heat can
                      breach fire-rated barriers through conduction, radiation through windows, or
                      failure of fire-stopping materials. Flames may emerge from windows and re-enter
                      the building at higher floors (external fire spread).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Duration:</strong> The fully developed phase continues until the fuel
                      load is substantially consumed or the fire service suppresses it. In a standard
                      office, this may last 30&ndash;60 minutes. In a heavily loaded storage area, it
                      can last several hours.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Implication for Building Design</p>
                </div>
                <p className="text-sm text-white/80">
                  The concept of ventilation-controlled burning is the reason why{' '}
                  <strong>fire compartmentation</strong> is so important in building design. Fire-rated
                  walls, floors, doors and fire stopping are designed to contain a fully developed fire
                  within a single compartment for a specified period &mdash; giving occupants time to
                  evacuate and the fire service time to respond. As an electrician, every time you pass
                  a cable through a fire-rated wall or floor, you must ensure the{' '}
                  <strong>fire stopping is properly reinstated</strong> to maintain compartmentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Decay Phase & Backdraught */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Decay Phase &amp; Backdraught
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>decay phase</strong> begins when the available fuel is substantially
                consumed and the fire&apos;s heat release rate starts to decline. Temperatures in the
                compartment gradually drop, flames reduce, and the fire appears to be dying down.
                However, the decay phase can be{' '}
                <strong>extremely dangerous</strong> due to the risk of <strong>backdraught</strong>.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">
                  Key Definition &mdash; Backdraught (Backdraft)
                </p>
                <p className="text-sm text-white">
                  A <strong>backdraught</strong> is a type of deflagration &mdash; a rapid combustion
                  event &mdash; that occurs when fresh air (oxygen) is suddenly introduced into a
                  compartment where a fire has been burning in a{' '}
                  <strong>ventilation-limited state</strong>. The fire has consumed most of the
                  available oxygen but has continued to produce large volumes of{' '}
                  <strong>hot, unburnt pyrolysis gases</strong> (fuel vapours from heated materials).
                  These gases are above their ignition temperature but cannot burn due to insufficient
                  oxygen. When a door or window is opened, fresh oxygen enters, mixes with the
                  superheated gases, and <strong>ignition occurs explosively</strong>.
                </p>
              </div>

              <p>
                Backdraught is not a gradual event. It occurs as a sudden, violent blast of flame and
                hot gases that can project several metres from the opening. The overpressure wave can
                knock people off their feet, shatter windows and cause structural damage. It is one
                of the most dangerous phenomena that firefighters and building occupants can
                encounter.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Backdraught Warning Signs
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Recognising the warning signs of potential backdraught can save your life. If you
                  observe any of the following, <strong>do NOT open doors or windows</strong> into the
                  affected area:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      sign: 'Pulsing / "Breathing" Smoke',
                      detail:
                        'Smoke puffs rhythmically in and out of gaps around doors and windows, as if the fire is "breathing". This indicates the fire is cycling between burning and oxygen starvation.',
                    },
                    {
                      sign: 'Yellowish-Grey or Brown Smoke',
                      detail:
                        'The smoke is an unusual yellowish-grey or dirty brown colour, rather than the typical black or grey. This indicates incomplete combustion and a high concentration of unburnt fuel vapours.',
                    },
                    {
                      sign: 'Blackened, Hot Windows',
                      detail:
                        'Windows in the affected area are blackened by heavy soot deposits on the inside and feel hot to the touch. The soot deposits indicate the fire has been burning in an oxygen-starved state.',
                    },
                    {
                      sign: 'Inward Air Movement',
                      detail:
                        'Air is being drawn inward at small gaps and openings rather than smoke pushing outward. This "inverse pressure" occurs because the cooling fire creates a partial vacuum inside the compartment.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-400 mb-1">{item.sign}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">What to Do</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Do NOT open any doors or windows</strong> into the affected compartment
                      &mdash; this is the action that triggers backdraught.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Evacuate the area immediately</strong> and ensure no one else approaches
                      the room.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Call 999</strong> if the fire service has not already been called, and
                      specifically report the warning signs you have observed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Wait for the fire service</strong> &mdash; they have specialist training,
                      equipment and techniques (such as fog nailing and controlled ventilation) to
                      manage backdraught situations safely.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Fire Spread Mechanisms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">07</span>
            Fire Spread Mechanisms
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fire spreads from its point of origin to other areas through four fundamental
                mechanisms: <strong>conduction</strong>, <strong>convection</strong>,{' '}
                <strong>radiation</strong>, and <strong>direct burning</strong> (flame contact).
                Understanding these mechanisms is essential for understanding how fire protection
                measures work &mdash; and for electricians, why fire stopping of cable penetrations
                is so critically important.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Conduction */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Conduction</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    Heat transfer through direct contact with a solid material. Heat travels through
                    the material from the hot side to the cold side.
                  </p>
                  <ul className="text-xs text-white/70 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Steel beams conducting heat through fire-rated walls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Copper pipes and metallic conduit transferring heat to adjacent rooms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Metal cable tray acting as a heat bridge through compartment walls</span>
                    </li>
                  </ul>
                </div>

                {/* Convection */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="h-5 w-5 text-orange-400" />
                    <p className="text-sm font-medium text-orange-400">Convection</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    Heat transfer through the movement of hot gases and air. Hot gases rise and travel
                    to remote areas through openings, shafts and voids.
                  </p>
                  <ul className="text-xs text-white/70 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Hot gases rising through stairwells and lift shafts (stack effect)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Fire spread through service risers, cable routes and ductwork</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Hot smoke layer spreading along corridors from the room of origin</span>
                    </li>
                  </ul>
                </div>

                {/* Radiation */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Radiation</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    Heat transfer through electromagnetic waves (infrared). Does not require a medium
                    &mdash; heat radiates through air and even through vacuum.
                  </p>
                  <ul className="text-xs text-white/70 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Heat from the smoke layer igniting surfaces below (flashover mechanism)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Flames from windows igniting adjacent buildings across a gap</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Radiant heat igniting combustible materials several metres from the fire</span>
                    </li>
                  </ul>
                </div>

                {/* Direct Burning */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="h-5 w-5 text-rose-500" />
                    <p className="text-sm font-medium text-rose-400">Direct Burning (Flame Contact)</p>
                  </div>
                  <p className="text-sm text-white/80 mb-3">
                    Fire spreads by direct flame impingement on adjacent combustible materials. The
                    simplest and most obvious spread mechanism.
                  </p>
                  <ul className="text-xs text-white/70 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Flames spreading along combustible cable insulation in a cable tray</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Fire travelling along timber framing or combustible wall linings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Burning debris falling and igniting materials on lower floors</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  The Stack Effect in Buildings
                </p>
                <p className="text-sm text-white/80">
                  The <strong>stack effect</strong> is a natural air movement phenomenon in tall
                  buildings where warm air rises through vertical shafts (stairwells, lift shafts,
                  service risers) and is replaced by cooler air drawn in at lower levels. During a
                  fire, the stack effect dramatically accelerates the upward spread of hot gases and
                  smoke through these vertical pathways. A fire on a lower floor can rapidly fill
                  upper stairwells with lethal smoke, cutting off escape routes. This is why{' '}
                  <strong>fire doors</strong> on stairwells and <strong>smoke ventilation systems</strong>{' '}
                  are critical life-safety features.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Fire Spread Through Voids, Ducts &amp; Cable Routes &mdash; Critical for
                    Electricians
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Concealed spaces within buildings &mdash; ceiling voids, floor voids, wall cavities,
                  cable risers, trunking systems and ventilation ducts &mdash; are some of the most
                  significant pathways for fire spread. Fire can travel unseen through these routes,
                  bypassing fire-rated walls and floors and emerging in areas far from the original
                  fire.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Cable penetrations:</strong> Every hole drilled through a fire-rated wall
                      or floor for cables or conduit creates a potential fire spread pathway. If not
                      properly sealed with intumescent fire stopping, fire can travel through the gap
                      around the cables.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Cable tray and trunking:</strong> PVC cable insulation is combustible and
                      can propagate flame along its length. Large bundles of cables in a tray can
                      sustain fire and carry it through compartment barriers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>Service risers:</strong> Vertical risers that carry cables, pipes and
                      ducts between floors act as chimneys during a fire, drawing hot gases upward by
                      convection. Fire-rated collars and intumescent seals at each floor penetration
                      are essential.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong>The electrician&apos;s responsibility:</strong> Regulation 527 of BS
                      7671 requires that wiring passing through building elements (walls, floors,
                      ceilings) must be internally sealed to maintain the fire resistance of those
                      elements. As an electrician, you must reinstate fire stopping after every cable
                      installation that passes through a fire-rated barrier.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Real-World Consequence</p>
                </div>
                <p className="text-sm text-white/80">
                  Many of the most devastating building fires in UK history were worsened by fire
                  spreading through concealed routes where fire stopping had been omitted, damaged or
                  incorrectly installed. Unsealed cable penetrations, missing fire collars on plastic
                  pipe penetrations, and breached compartment walls have all been identified as
                  contributing factors in fatal fire investigations. As an electrician, maintaining
                  fire compartmentation is not just a regulatory requirement &mdash; it is a{' '}
                  <strong>life-safety responsibility</strong>.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Classes of Fire
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-1-section-4">
              How Fires Start in the Workplace
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
