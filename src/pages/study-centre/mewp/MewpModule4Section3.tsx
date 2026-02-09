import {
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertTriangle,
  Zap,
  Moon,
  Droplets,
  FlaskConical,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'power-line-contact',
    question:
      'A MEWP operator accidentally makes contact with an overhead power line whilst elevated. The operator is in the platform and the machine is energised. What should the operator do?',
    options: [
      'Immediately climb down from the platform to the ground',
      'Stay on the platform and call for help — do not leave the machine',
      'Jump from the platform to break contact with the machine',
      'Attempt to reverse the MEWP away from the power line',
    ],
    correctIndex: 1,
    explanation:
      "If a MEWP contacts an overhead power line, the entire machine becomes energised. The operator must STAY on the platform and call for help. Leaving the platform (climbing down or jumping) creates a path to earth through the operator's body, which is likely to be fatal. Ground persons must NOT touch the machine. The electricity supplier must be contacted to isolate the supply.",
  },
  {
    id: 'night-working-risk',
    question:
      'Your team is asked to carry out MEWP work under temporary lighting at night. Which additional risk factor is MOST significantly increased compared to daytime operations?',
    options: [
      'The MEWP is more likely to suffer a mechanical failure at night',
      'Reduced visibility increases the risk of entrapment, collision, and falls',
      'The MEWP cannot be operated at all during the hours of darkness',
      'Insurance policies do not cover night-time MEWP operations',
    ],
    correctIndex: 1,
    explanation:
      'Reduced visibility at night significantly increases the risk of entrapment (operator cannot see overhead structures), collision (ground vehicles and pedestrians cannot see the MEWP clearly), and falls (operator misjudges platform position). Adequate lighting, enhanced hi-vis clothing, flashing beacons, and additional banksmen/spotters are all required to mitigate these increased risks.',
  },
  {
    id: 'fragile-surface-mewp',
    question:
      'You need to carry out work above a fragile roof that cannot support the weight of a MEWP. What is the correct approach?',
    options: [
      'Use a smaller, lighter MEWP directly on the fragile roof',
      "Lay boards across the fragile roof to spread the MEWP's weight",
      'Position the MEWP on firm ground adjacent to the fragile area and reach over it',
      'Use the MEWP on the fragile roof but keep the outriggers retracted',
    ],
    correctIndex: 2,
    explanation:
      "You must NEVER position a MEWP directly on a fragile surface. The correct approach is to position the MEWP on firm, stable ground adjacent to the fragile area and use the boom to reach over it. This keeps the machine's weight on a surface that can support it whilst still providing access to the work area above the fragile roof.",
  },
];

const faqs = [
  {
    question: 'What is a Secondary Guarding Device (SGD) and when should one be used?',
    answer:
      "A Secondary Guarding Device (SGD) is a physical barrier or sensor system fitted to a MEWP that detects proximity to overhead or adjacent obstacles and either alerts the operator or automatically stops the machine's movement. SGDs should be considered whenever there is a risk of entrapment — for example, when working near overhead beams, bridge undersides, building facades, or in any environment where the operator's head or body could become trapped between the guardrails and a fixed structure. IPAF strongly recommends SGDs as an additional layer of protection, but they must not be relied upon as the sole control measure.",
  },
  {
    question: 'What are the safe approach distances for overhead power lines?',
    answer:
      'IPAF guidance specifies three key distances: 15 metres (50 feet) plus the fully extended boom length from electrical pylons carrying high-voltage transmission lines; 9 metres (30 feet) plus the fully extended boom length from cables on wooden poles carrying lower-voltage distribution lines; and a minimum of 3 metres (10 feet) as the general safe approach distance from any overhead line of unknown voltage. These distances account for the risk of arcing and flashover, where electricity can jump an air gap without direct contact. Always contact the electricity supplier before starting any work near overhead power lines.',
  },
  {
    question: 'What is Chapter 8 signage and when is it required for MEWP work?',
    answer:
      'Chapter 8 refers to Chapter 8 of the Traffic Signs Manual, which sets out the requirements for temporary traffic management signage on UK roads. It is required whenever MEWP work affects a public highway — for example, street lighting maintenance, telecoms work, or facade work adjacent to a road. Chapter 8 signage includes advance warning signs, cones, barriers, and directional arrows to guide traffic safely past the work area. There are different requirements depending on road speed, and the signage layout must be designed by a competent person qualified in temporary traffic management.',
  },
  {
    question: 'Can a MEWP be used in an ATEX zone or potentially explosive atmosphere?',
    answer:
      'Standard MEWPs must NOT be used in ATEX zones (areas with potentially explosive atmospheres) such as chemical plants, refineries, fuel storage areas, or grain silos. The electrical systems, motors, and hydraulic components of a standard MEWP can generate sparks or hot surfaces that could ignite flammable gases, vapours, or dusts. Specialist ATEX-rated (explosion-proof) MEWPs are available — these have sealed electrical systems, spark-free components, and flame-path enclosures. Any MEWP used in an ATEX zone must carry the appropriate Ex marking and certification for the specific zone classification.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What has happened to entrapment-related fatalities involving MEWPs in recent years?',
    options: [
      'They have decreased significantly due to improved training',
      'They have remained stable with no notable change',
      'Reports increased by 75% and fatalities increased by 62% between 2023–2024',
      'They have been eliminated entirely through the use of SGDs',
    ],
    correctAnswer: 2,
    explanation:
      'Entrapment is a rising cause of MEWP fatalities. Between 2023 and 2024, entrapment reports increased by 75% and fatalities increased by 62%. This makes entrapment one of the most significant and growing hazards in MEWP operations, requiring constant vigilance and proactive prevention measures.',
  },
  {
    id: 2,
    question:
      'At what minimum distance should a MEWP (plus fully extended boom) be kept from electrical pylons?',
    options: [
      '3 metres (10 feet)',
      '9 metres (30 feet)',
      '15 metres (50 feet)',
      '25 metres (82 feet)',
    ],
    correctAnswer: 2,
    explanation:
      'IPAF guidance requires a minimum distance of 15 metres (50 feet) plus the fully extended boom length from electrical pylons carrying high-voltage transmission lines. This greater distance is required because high-voltage electricity can arc across larger air gaps, potentially causing fatal electrocution without any direct contact.',
  },
  {
    id: 3,
    question: 'Why can electric shock from overhead power lines occur WITHOUT direct contact?',
    options: [
      'Because the wind blows electricity towards the MEWP',
      "Because the MEWP's metal structure acts as an aerial",
      'Because electricity can arc or flash over through the air gap at close proximity',
      'Because the ground creates a magnetic field that attracts electricity',
    ],
    correctAnswer: 2,
    explanation:
      'At sufficiently close proximity, electricity can arc (jump) across the air gap between a power line and a MEWP. This is called arcing or flashover. The higher the voltage, the greater the distance across which arcing can occur. This is why safe approach distances are measured from the power line, not from the point of direct contact.',
  },
  {
    id: 4,
    question:
      'When working in a public area with a MEWP, which of the following is NOT typically required?',
    options: [
      'Pedestrian management barriers and signage',
      'Written permission from every nearby resident',
      'A banksman or spotter to manage the public',
      'Enhanced exclusion zones around the work area',
    ],
    correctAnswer: 1,
    explanation:
      'Working in public areas requires enhanced exclusion zones, pedestrian management barriers and signage, a banksman/spotter to manage the public, and hi-vis clothing. However, obtaining written permission from every nearby resident is not a standard requirement — though notification may be courteous and sometimes required by local authority conditions.',
  },
  {
    id: 5,
    question:
      'What is the general rule for safe distance from the edge of an excavation when positioning a MEWP?',
    options: [
      'The distance from the edge should equal at least the depth of the excavation',
      'Position the MEWP as close to the edge as possible for maximum reach',
      'Keep at least 1 metre from the edge regardless of excavation depth',
      'Only the outriggers need to be kept away from the edge',
    ],
    correctAnswer: 0,
    explanation:
      "The general rule is that the distance from the excavation edge should equal at least the depth of the excavation as a minimum. Ground near excavation edges is weakened and may not have sufficient bearing capacity to support the concentrated loads from a MEWP's wheels or outriggers. On soft or wet ground, even greater distances may be required.",
  },
  {
    id: 6,
    question:
      'Which additional measure is essential for MEWP night working to address reduced visibility?',
    options: [
      "Using the MEWP's headlights only, with no additional lighting",
      'Amber flashing beacons on the machine and enhanced retroreflective hi-vis clothing',
      'Working faster to finish before it gets too dark',
      "Turning off the MEWP's lights to avoid blinding passing drivers",
    ],
    correctAnswer: 1,
    explanation:
      "Night working requires amber flashing beacons (rotating or LED) on the MEWP, enhanced retroreflective hi-vis clothing for all personnel, adequate lighting of the work area, and additional banksmen/spotters. Simply relying on the machine's headlights is not sufficient — the work area, the exclusion zone, and all personnel must be clearly visible.",
  },
  {
    id: 7,
    question: 'Why must a standard MEWP NOT be used in a potentially explosive atmosphere?',
    options: [
      "Because the MEWP's tyres may generate static electricity",
      "Because the machine's electrical systems, motors, and hydraulics can generate sparks or hot surfaces",
      "Because the MEWP's paint may react with explosive gases",
      'Because explosive atmospheres always have low oxygen levels',
    ],
    correctAnswer: 1,
    explanation:
      'Standard MEWPs contain electrical systems, motors, relays, switches, and hydraulic components that can generate sparks or hot surfaces during normal operation. In an ATEX zone (potentially explosive atmosphere), these ignition sources could ignite flammable gases, vapours, or dusts. Only specialist ATEX-rated (explosion-proof) MEWPs with sealed electrical systems and spark-free components may be used in such environments.',
  },
  {
    id: 8,
    question:
      'A ground spotter notices the MEWP operator is about to become trapped between the guardrails and an overhead beam. What should the ground spotter do?',
    options: [
      'Wait until the operator notices the hazard themselves',
      'Immediately alert the operator to stop — use the agreed signal or shout a clear warning',
      'Use the ground-level controls to move the platform away without warning the operator',
      'Leave the area to find a supervisor',
    ],
    correctAnswer: 1,
    explanation:
      'The ground spotter must immediately alert the operator to stop all movement using the pre-agreed signal (radio, hand signal, or verbal shout). Entrapment is frequently fatal — once the operator is trapped, they may be unable to release the controls, causing the machine to continue moving. Quick intervention by the spotter can prevent a fatal incident. The spotter should not operate ground controls without warning, as this could cause additional hazards.',
  },
];

export default function MewpModule4Section3() {
  useSEO({
    title: 'Working Near Structures, Power Lines & Public Areas | MEWP Module 4.3',
    description:
      'Entrapment prevention, overhead power line safe distances, working in public areas, night working, working near water and excavations, fragile surfaces and special environments for MEWP operations.',
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 mb-4">
            <Shield className="h-7 w-7 text-red-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 4 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Working Near Structures, Power Lines &amp; Public Areas
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Critical safety considerations when operating MEWPs near overhead structures, electrical
            hazards, public spaces, and in challenging environments
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Entrapment:</strong> Rising cause of death &mdash; always check overhead
                before elevating
              </li>
              <li>
                <strong>Power lines:</strong> 15m from pylons, 9m from poles, 3m minimum from any
                line
              </li>
              <li>
                <strong>Public areas:</strong> Barriers, banksman, hi-vis, Chapter 8 for highway
                work
              </li>
              <li>
                <strong>Night work:</strong> Beacons, retroreflective clothing, fatigue management
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Survey:</strong> Check overhead, adjacent, and ground-level hazards before
                work
              </li>
              <li>
                <strong>Spotter:</strong> Use a ground spotter near structures, public, or at night
              </li>
              <li>
                <strong>Excavations:</strong> Distance from edge &ge; depth of excavation
              </li>
              <li>
                <strong>Special:</strong> ATEX MEWPs for explosive atmospheres only
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the causes and prevention of entrapment when working near structures',
              'State the safe approach distances for overhead power lines (pylons, poles, general)',
              'Describe the correct response if a MEWP contacts a power line',
              'List the additional requirements for working with MEWPs in public areas',
              'Identify the additional hazards and controls for night working',
              'Explain the precautions for working near excavations, water, and on fragile surfaces',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ===== Section 01: Entrapment Prevention ===== */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-red-400/80 text-sm font-normal">01</span>
            Entrapment Prevention
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              {/* Critical Warning Box */}
              <div className="bg-red-500/15 border-2 border-red-500/50 p-4 sm:p-5 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-red-300 text-base mb-1">
                      ENTRAPMENT IS FREQUENTLY FATAL
                    </h3>
                    <p className="text-white/90 text-sm">
                      Entrapment is a <strong>rising cause of death</strong> in MEWP operations.
                      Between 2023 and 2024, entrapment reports increased by <strong>75%</strong>{' '}
                      and entrapment-related fatalities increased by <strong>62%</strong>. Every
                      operator must understand this hazard and take active steps to prevent it on
                      every single lift.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Entrapment occurs when the operator&rsquo;s body &mdash; typically the head, chest,
                or torso &mdash; becomes trapped between the MEWP guardrails and a fixed overhead or
                adjacent structure. Once trapped, the operator is often unable to release the
                controls, causing the machine to continue moving and increasing the crushing force.
                Death or catastrophic injury can occur within seconds.
              </p>

              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-3">Common Entrapment Scenarios</h3>
                <ul className="text-sm text-white/80 space-y-2">
                  {[
                    'Operator trapped between guardrails and overhead beams or steelwork',
                    'Crushing against bridge undersides, soffits, or ceilings',
                    'Trapped against balconies, window ledges, or projecting building features',
                    'Caught between the platform and fixed signage or lighting structures',
                    'Entangled with tree branches whilst the platform is moving',
                    'Trapped in doorways or openings when driving a MEWP through a restricted space',
                  ].map((scenario, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400/70 mt-0.5 flex-shrink-0" />
                      <span>{scenario}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">Prevention Measures</h3>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Survey the environment BEFORE elevating:</strong> Always check the
                      working environment for overhead and adjacent obstacles before raising the
                      platform. Look up, look around, and identify anything that could trap the
                      operator at height.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Use FINER CONTROLS for final positioning:</strong> When approaching
                      structures, switch to fine/creep mode for precise, slow movements. Never use
                      full-speed controls when positioning near overhead or adjacent obstacles.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Use a GROUND SPOTTER:</strong> A trained person at ground level who
                      maintains visual contact with the operator and the surrounding structures,
                      providing guidance and warnings via radio or pre-agreed hand signals.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Consider SECONDARY GUARDING DEVICES (SGD):</strong> Physical barriers
                      or sensor systems fitted to the MEWP that detect proximity to obstacles. Some
                      SGDs automatically stop the machine&rsquo;s movement; others sound an alarm to
                      alert the operator.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Maintain clear line of sight:</strong> Always look in the direction of
                      travel when operating boom controls. Never operate controls whilst looking
                      away from the direction of platform movement.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Plan the lift path:</strong> Before elevating, plan the entire path
                      the platform will take from ground level to the working position. Identify all
                      potential pinch points and crushing zones along that path.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Section 02: Working Near Overhead Power Lines ===== */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Working Near Overhead Power Lines
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              {/* Critical Warning */}
              <div className="bg-red-500/15 border-2 border-red-500/50 p-4 sm:p-5 rounded-lg">
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-red-300 text-base mb-1">
                      CRITICAL SAFETY: ELECTROCUTION RISK
                    </h3>
                    <p className="text-white/90 text-sm">
                      Electric shock from overhead power lines can occur{' '}
                      <strong>WITHOUT direct contact</strong>. Electricity can{' '}
                      <strong>arc (flashover)</strong> across the air gap between a power line and a
                      MEWP at close proximity. The higher the voltage, the greater the distance
                      across which arcing can occur. Contact is almost always fatal.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Overhead power lines present one of the most lethal hazards to MEWP operators.
                Unlike most hazards where you must make physical contact to be harmed, high-voltage
                electricity can jump across an air gap and pass through the MEWP structure and the
                operator to earth. The operator may receive a fatal shock before they even realise
                they are too close.
              </p>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">
                  Safe Approach Distances (IPAF Guidance)
                </h3>
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-red-300">
                        Electrical PYLONS (high voltage)
                      </span>
                      <span className="text-lg font-bold text-red-400">15m (50ft)</span>
                    </div>
                    <p className="text-xs text-white/70">
                      Plus the fully extended boom length. These carry the highest voltages
                      (132kV&ndash;400kV+) and present extreme arcing risk.
                    </p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-orange-300">
                        Cables on WOODEN POLES
                      </span>
                      <span className="text-lg font-bold text-orange-400">9m (30ft)</span>
                    </div>
                    <p className="text-xs text-white/70">
                      Plus the fully extended boom length. Distribution lines on wooden poles
                      typically carry 11kV&ndash;33kV.
                    </p>
                  </div>
                  <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-elec-yellow">
                        ANY overhead line (minimum)
                      </span>
                      <span className="text-lg font-bold text-elec-yellow">3m (10ft)</span>
                    </div>
                    <p className="text-xs text-white/70">
                      General minimum safe approach distance from any overhead line. If voltage is
                      unknown, assume the worst case and use 15m.
                    </p>
                  </div>
                </div>
              </div>

              {/* ===== POWER LINE DISTANCE DIAGRAM ===== */}
              <div className="bg-[#111] border border-white/20 p-4 sm:p-6 rounded-xl">
                <h3 className="text-white font-semibold text-center mb-1 text-sm">
                  Overhead Power Line Safe Distance Zones
                </h3>
                <p className="text-white/50 text-xs text-center mb-5">
                  Concentric distance zones from a power line (not to scale)
                </p>

                <div className="flex justify-center">
                  <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px]">
                    {/* Outermost zone: GREEN — SAFE (15m) */}
                    <div className="absolute inset-0 rounded-full bg-green-500/10 border-2 border-green-500/40 flex items-end justify-center pb-2">
                      <span className="text-[10px] sm:text-xs font-mono text-green-400 bg-[#111]/80 px-2 py-0.5 rounded">
                        SAFE ZONE
                      </span>
                    </div>

                    {/* Middle zone: AMBER — CAUTION (9m) */}
                    <div
                      className="absolute rounded-full bg-amber-500/10 border-2 border-amber-500/40 flex items-end justify-center pb-2"
                      style={{ top: '16%', left: '16%', right: '16%', bottom: '16%' }}
                    >
                      <span className="text-[10px] sm:text-xs font-mono text-amber-400 bg-[#111]/80 px-2 py-0.5 rounded">
                        CAUTION
                      </span>
                    </div>

                    {/* Inner zone: RED — DANGER (3m) */}
                    <div
                      className="absolute rounded-full bg-red-500/15 border-2 border-red-500/50 flex items-end justify-center pb-2"
                      style={{ top: '33%', left: '33%', right: '33%', bottom: '33%' }}
                    >
                      <span className="text-[10px] sm:text-xs font-mono text-red-400 bg-[#111]/80 px-2 py-0.5 rounded">
                        DANGER
                      </span>
                    </div>

                    {/* Centre: POWER LINE */}
                    <div
                      className="absolute flex items-center justify-center"
                      style={{ top: '42%', left: '42%', right: '42%', bottom: '42%' }}
                    >
                      <div className="w-full h-full rounded-full bg-red-500/30 border-2 border-red-500 flex items-center justify-center">
                        <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
                      </div>
                    </div>

                    {/* Distance Labels — RIGHT side */}
                    {/* 15m label */}
                    <div
                      className="absolute flex items-center"
                      style={{ top: '6%', right: '-4px' }}
                    >
                      <div className="bg-green-500/20 border border-green-500/40 px-2 py-1 rounded">
                        <span className="text-[10px] sm:text-xs font-bold text-green-400 block">
                          15m (50ft)
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-green-300/70 block">
                          from PYLONS
                        </span>
                      </div>
                    </div>

                    {/* 9m label */}
                    <div
                      className="absolute flex items-center"
                      style={{ top: '22%', right: '-4px' }}
                    >
                      <div className="bg-amber-500/20 border border-amber-500/40 px-2 py-1 rounded">
                        <span className="text-[10px] sm:text-xs font-bold text-amber-400 block">
                          9m (30ft)
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-amber-300/70 block">
                          from POLES
                        </span>
                      </div>
                    </div>

                    {/* 3m label */}
                    <div
                      className="absolute flex items-center"
                      style={{ top: '38%', right: '-4px' }}
                    >
                      <div className="bg-red-500/20 border border-red-500/40 px-2 py-1 rounded">
                        <span className="text-[10px] sm:text-xs font-bold text-red-400 block">
                          3m (10ft)
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-red-300/70 block">
                          MINIMUM
                        </span>
                      </div>
                    </div>

                    {/* LEFT side labels */}
                    <div className="absolute flex items-center" style={{ bottom: '6%', left: '0' }}>
                      <div className="bg-green-500/20 border border-green-500/40 px-2 py-1 rounded">
                        <span className="text-[9px] sm:text-[10px] text-green-300/80 block">
                          + fully extended
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-green-300/80 block">
                          boom length
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diagram Key */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-5">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500/30 border-2 border-red-500"></div>
                    <span className="text-xs text-white/70">Danger &mdash; Fatal risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-500/20 border-2 border-amber-500/50"></div>
                    <span className="text-xs text-white/70">Caution &mdash; Approach limit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500/20 border-2 border-green-500/50"></div>
                    <span className="text-xs text-white/70">Safe &mdash; Beyond exclusion</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">
                  If Contact Occurs &mdash; Emergency Procedure
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/30 border border-red-500/60 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-300 font-bold text-xs">1</span>
                    </div>
                    <p className="text-white/80">
                      <strong className="text-white">DO NOT leave the platform</strong> &mdash; the
                      machine is energised. Climbing down or jumping creates a path to earth through
                      your body.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/30 border border-red-500/60 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-300 font-bold text-xs">2</span>
                    </div>
                    <p className="text-white/80">
                      <strong className="text-white">Stay on the platform</strong> and call for help
                      using radio or phone.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/30 border border-red-500/60 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-300 font-bold text-xs">3</span>
                    </div>
                    <p className="text-white/80">
                      <strong className="text-white">
                        Ground persons must NOT touch the machine
                      </strong>{' '}
                      &mdash; the entire structure is live. Keep everyone at a safe distance.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/30 border border-red-500/60 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-300 font-bold text-xs">4</span>
                    </div>
                    <p className="text-white/80">
                      <strong className="text-white">
                        Contact the electricity supplier immediately
                      </strong>{' '}
                      to isolate the supply before any rescue is attempted.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Pre-Work Controls</h3>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Contact the electricity supplier</strong> before starting any work
                      near overhead power lines
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Use <strong>goal posts and barriers</strong> to define safe approach limits
                      visually on site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Brief all operatives on the location of overhead lines and the required
                      exclusion distances
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If possible, request the DNO to isolate or divert the power line before work
                      begins
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Never assume a line is dead &mdash; <strong>treat all lines as live</strong>{' '}
                      until confirmed otherwise
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ===== Section 03: Working in Public Areas ===== */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Working in Public Areas
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                IPAF provides specific guidance for MEWP operations in public areas. The presence of
                members of the public &mdash; pedestrians, cyclists, motorists, and vulnerable road
                users &mdash; introduces additional hazards and requires enhanced safety measures
                beyond those used on closed construction sites.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Additional Requirements for Public Areas
                </h3>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Enhanced exclusion zones:</strong> Larger exclusion zones than on a
                      closed site, clearly marked with barriers, cones, and signage to prevent
                      public access to the danger area beneath and around the MEWP.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Pedestrian management barriers and signage:</strong> Physical barriers
                      (Heras fencing, Chapter 8 barriers, water-filled barriers) combined with clear
                      signage directing pedestrians to a safe alternative route.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Banksman/spotter to manage the public:</strong> A dedicated trained
                      person whose sole role is to manage pedestrian and vehicle movements around
                      the MEWP operation. They must not have other tasks whilst acting as spotter.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Hi-vis clothing mandatory:</strong> All personnel involved in the
                      operation must wear high-visibility clothing that meets EN ISO 20471
                      standards. This applies to both the MEWP operator and ground personnel.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Traffic management orders:</strong> For work on or adjacent to public
                      roads, a traffic management plan may be required. This may involve road
                      closures, lane restrictions, temporary traffic signals, or convoy working.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Vulnerable road users:</strong> Consider the needs of cyclists,
                      wheelchair users, visually impaired pedestrians, and those with pushchairs or
                      mobility aids. Alternative routes must be accessible and clearly signed.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Street Lighting and Telecoms Work
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  Street lighting and telecoms work presents specific challenges because the MEWP is
                  often parked in <strong>live traffic lanes</strong>. The operator is elevated
                  directly above moving vehicles whilst the machine occupies part of the
                  carriageway.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Chapter 8 signage</strong> is mandatory for all highway work &mdash;
                      advance warning signs, cones, directional arrows, and taper layouts must
                      comply with the Traffic Signs Manual
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Vehicle-mounted platforms should have amber flashing beacons and may require
                      an impact protection vehicle (IPV) or crash cushion for high-speed roads
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The traffic management layout must be designed by a person competent in
                      temporary traffic management (e.g. NRSWA qualified)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Consider timing &mdash; working during off-peak hours may significantly reduce
                      the risk from vehicular traffic
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Key Risk</p>
                </div>
                <p className="text-sm text-white/80">
                  Members of the public are <strong>unpredictable</strong>. Unlike trained site
                  personnel, pedestrians may walk under the MEWP, children may run into the
                  exclusion zone, and vehicles may not slow down or change lanes. Your risk
                  assessment must account for the fact that the public will not always follow
                  instructions, barriers, or signage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Section 04: Night Working ===== */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">04</span>
            Night Working
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Working at height during the hours of darkness significantly increases the risk
                profile of any MEWP operation. Reduced visibility affects the operator&rsquo;s
                ability to identify hazards, the ground team&rsquo;s ability to communicate, and the
                public&rsquo;s ability to see the work area and avoid it.
              </p>

              <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Moon className="h-5 w-5 text-blue-400" />
                  <h3 className="text-blue-300 font-medium">Night Working Requirements</h3>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Adequate lighting of the work area:</strong> The work area, loading
                      area, and access routes must be well lit using temporary tower lights or
                      equivalent. The operator must be able to see overhead structures, obstacles,
                      and the ground below.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Flashing beacons on machines:</strong> Amber rotating or LED flashing
                      beacons must be fitted and activated on the MEWP. These alert passing traffic
                      and pedestrians to the presence of the machine and the work activity.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Enhanced hi-vis clothing:</strong> Retroreflective hi-vis garments
                      (Class 3 as a minimum) must be worn by all personnel. Standard daytime hi-vis
                      is not sufficient &mdash; retroreflective strips are essential for night-time
                      visibility.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Additional banksman/spotter requirements:</strong> The spotter must
                      have their own illumination (head torch or hand-held torch) and wear enhanced
                      hi-vis. Communication between spotter and operator should use radio rather
                      than visual hand signals.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">Increased Risks at Night</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-red-300 mb-1">Falls from Height</p>
                    <p className="text-xs text-white/70">
                      Operator may misjudge platform edge, trip over tools, or fail to see gaps.
                      Ensure platform is clear and well-lit.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-red-300 mb-1">Collision</p>
                    <p className="text-xs text-white/70">
                      Vehicles may not see the MEWP in time. Use beacons, Chapter 8 signage with
                      reflective faces, and IPVs on high-speed roads.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-red-300 mb-1">Entrapment</p>
                    <p className="text-xs text-white/70">
                      Overhead structures are harder to see at night. Extra caution and slower
                      movements are essential near buildings.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-red-300 mb-1">Fatigue</p>
                    <p className="text-xs text-white/70">
                      Operators working at height when tired present increased risk. Manage shift
                      patterns, breaks, and monitor alertness.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">
                  Consider: Night Traffic Patterns
                </p>
                <p className="text-sm text-white/80">
                  Whilst traffic volumes are typically lower at night, vehicle speeds may be{' '}
                  <strong>significantly higher</strong>. Drivers travelling at speed in low-light
                  conditions may not see the MEWP or the work area signage until very late. This
                  increases the risk of a high-speed vehicle striking the MEWP or the work area.
                  Impact protection vehicles and extended advance warning signage may be necessary.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ===== Section 05: Working Near Water and Excavations ===== */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-teal-400/80 text-sm font-normal">05</span>
            Working Near Water and Excavations
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Excavations and water features create ground conditions that are often unsuitable
                for MEWP operations without careful assessment and additional controls. The ground
                near excavation edges is weakened, and water, ice, and mud can conceal hazards that
                make the surface unpredictable.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Droplets className="h-5 w-5 text-teal-400" />
                  <h3 className="text-teal-300 font-medium">Excavation Hazards</h3>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Ground near edges is weakened:</strong> The excavation removes the
                      supporting ground, reducing the bearing capacity of the soil near the edge. A
                      MEWP&rsquo;s concentrated wheel or outrigger loads can cause the edge to
                      collapse, tipping the machine into the excavation.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Risk of sliding on soft or wet ground:</strong> Rain, groundwater, or
                      spoil heaps can make the ground around excavations soft and slippery. A
                      wheeled MEWP may slide towards the excavation edge, especially on sloping
                      ground.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Concealed hazards:</strong> Standing water, ice, snow, or mud can
                      conceal voids, trenches, soft spots, and underground services. Never position
                      a MEWP on a surface that has not been visually inspected and confirmed as
                      safe.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Safe Distance Rule</h3>
                <p className="text-sm text-white/80 mb-2">
                  The general rule for positioning a MEWP near an excavation edge:
                </p>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <p className="text-lg font-bold text-elec-yellow mb-1">
                    Distance from edge &ge; Depth of excavation
                  </p>
                  <p className="text-xs text-white/60">
                    As a minimum, the distance from the excavation edge to the nearest MEWP support
                    point (wheel or outrigger pad) should equal or exceed the depth of the
                    excavation.
                  </p>
                </div>
                <p className="text-xs text-white/60 mt-2">
                  On soft, wet, or granular soils, or where the excavation is unsupported, greater
                  distances may be required. A geotechnical assessment may be necessary for deep
                  excavations.
                </p>
              </div>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">Additional Controls</h3>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Install physical barriers (stop blocks, edge protection) to prevent the MEWP
                      rolling or being driven towards the edge
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Assess the bearing capacity of the ground between the MEWP position and the
                      excavation edge
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Use spreader plates or bog mats on soft or waterlogged ground to distribute
                      the machine&rsquo;s load
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Monitor ground conditions throughout the work &mdash; rain can rapidly change
                      conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Do NOT position MEWPs on fragile surfaces such as flat roofs not designed for
                      point loads
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Water Hazards</h3>
                </div>
                <p className="text-white/80 text-sm">
                  If a MEWP overturns into water or an excavation containing water, the operator
                  faces a dual risk of crushing injury and drowning. Rescue from a water-filled
                  excavation is extremely difficult. When working near any body of water (rivers,
                  canals, docks, flooded excavations), ensure life-saving equipment is available and
                  the rescue plan addresses water rescue.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Section 06: Working on Fragile Surfaces and Special Environments ===== */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-400/80 text-sm font-normal">06</span>
            Working on Fragile Surfaces and Special Environments
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Certain environments present unique challenges for MEWP operations that go beyond
                standard site hazards. Each requires a specialist assessment and may demand modified
                equipment or operational procedures.
              </p>

              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-3">Fragile Roofs and Surfaces</h3>
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <div className="flex items-start gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-red-300">
                        NEVER position a MEWP directly on a fragile surface
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      Fragile surfaces include asbestos cement sheets, fibre cement sheets, liner
                      panels on metal-clad buildings, glass (rooflights, skylights), plastic
                      rooflights, chipboard or plywood decking that has deteriorated, and any
                      surface marked with &ldquo;FRAGILE ROOF&rdquo; warning signs.
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    The correct approach is to position the MEWP on{' '}
                    <strong>firm, stable ground adjacent to the fragile area</strong> and use the
                    boom to reach over it. This keeps the machine&rsquo;s weight on a surface that
                    can support it whilst still providing access to the work area. If a MEWP must
                    work above a fragile surface, a rescue plan must address the risk of the
                    operator falling through the fragile material if the platform fails.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FlaskConical className="h-5 w-5 text-amber-400" />
                  <h3 className="text-amber-300 font-medium">Special Environments</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-orange-300 mb-1">
                      Chemical Plants &amp; Refineries
                    </h4>
                    <p className="text-xs text-white/70">
                      May require <strong>ATEX-rated (explosion-proof) MEWPs</strong> in zones where
                      flammable gases, vapours, or dusts are present. Standard MEWPs contain
                      electrical systems that can generate sparks &mdash; a potential ignition
                      source in ATEX zones. The MEWP must carry the appropriate Ex marking and
                      certification for the specific zone classification.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-blue-300 mb-1">Confined Spaces</h4>
                    <p className="text-xs text-white/70">
                      Confined spaces are <strong>not normally suitable for MEWP use</strong>. The
                      space may not be large enough to operate the machine safely, ventilation may
                      be poor (affecting diesel-powered MEWPs), and rescue in the event of an
                      emergency is severely hampered. A specialist confined space assessment is
                      required before considering a MEWP.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-1">
                      Cold Stores &amp; Freezers
                    </h4>
                    <p className="text-xs text-white/70">
                      Extreme cold affects <strong>battery performance</strong> (reduced capacity
                      and slower charging) and <strong>hydraulic fluid viscosity</strong> (thicker
                      fluid means sluggish or erratic controls). The MEWP may need to be
                      pre-conditioned, and the hydraulic fluid may need to be rated for
                      low-temperature operation. Operator comfort and exposure must also be
                      considered.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-green-300 mb-1">
                      Heritage &amp; Conservation Sites
                    </h4>
                    <p className="text-xs text-white/70">
                      Historic buildings and conservation areas may have{' '}
                      <strong>vibration restrictions</strong>
                      (diesel MEWPs generate vibration that can damage sensitive structures) and{' '}
                      <strong>weight restrictions</strong> (old floors, courtyards, and bridges may
                      have limited load-bearing capacity). Ground protection matting may be required
                      to prevent damage to historic surfaces.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">General Principle</p>
                <p className="text-sm text-white/80">
                  Any environment that falls outside normal construction or maintenance conditions
                  requires a <strong>site-specific risk assessment</strong> that considers the
                  unique hazards of that environment. Generic risk assessments are not sufficient
                  for specialist environments. Consult the site operator, review any site-specific
                  rules and permits, and ensure the MEWP is suitable for the conditions before
                  commencing work.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../mewp-module-4-section-4">
              Next: Exclusion Zones, Traffic Management &amp; Banksman Duties
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
