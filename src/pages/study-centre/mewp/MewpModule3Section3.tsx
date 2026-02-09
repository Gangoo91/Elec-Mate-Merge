import {
  ArrowLeft,
  Anchor,
  CheckCircle,
  AlertTriangle,
  Shield,
  Layers,
  Lock,
  ClipboardCheck,
  Eye,
  Footprints,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mewp-outrigger-partial',
    question:
      'When setting up a boom-type MEWP, is it ever acceptable to only partially deploy the outriggers?',
    options: [
      'Yes, if the machine will only be used at low height',
      'Yes, provided the ground is firm and level',
      'No — ALL outriggers must ALWAYS be fully deployed before elevating',
      'Yes, if the operator holds a valid PAL Card for that category',
    ],
    correctIndex: 2,
    explanation:
      'Partial deployment of outriggers is NEVER acceptable. ALL outriggers must be fully extended and lowered before the platform is elevated. Partial deployment drastically reduces the stability envelope and is a leading cause of MEWP overturn incidents.',
  },
  {
    id: 'mewp-ground-excavation',
    question:
      'As a general rule, how far from the edge of an excavation should a MEWP be positioned?',
    options: [
      'At least 1 metre regardless of depth',
      'A distance at least equal to the depth of the excavation',
      'At least 3 metres regardless of depth',
      "There is no rule — it depends solely on the operator's judgement",
    ],
    correctIndex: 1,
    explanation:
      'The general rule is that the MEWP should be positioned at least a distance equal to the depth of the excavation away from the edge. For example, a 2-metre-deep trench requires a minimum 2-metre standoff. A site-specific assessment may require a greater distance depending on ground conditions and loading.',
  },
  {
    id: 'mewp-interlock-bypass',
    question:
      'An outrigger interlock prevents elevation because one outrigger is not fully deployed. What should the operator do?',
    options: [
      'Bypass the interlock using the override key',
      'Ask a colleague to hold the interlock switch while elevating',
      'Investigate and correct the outrigger deployment, then re-check before elevating',
      'Use the machine without outriggers deployed',
    ],
    correctIndex: 2,
    explanation:
      'The operator must NEVER bypass or defeat interlock systems. If an interlock prevents elevation, it is doing its job. The correct action is to investigate the cause, correct the outrigger deployment, and verify the interlock clears before attempting to elevate. Bypassing interlocks is an offence under HSWA 1974 Section 8.',
  },
];

const faqs = [
  {
    question: 'Do I always need spreader plates under outriggers?',
    answer:
      'For boom-type MEWPs on outriggers, spreader plates or pads MUST ALWAYS be used. For other outriggered MEWPs (such as vehicle-mounted platforms), spreader plates must be used unless a specific risk assessment has determined they are not required for that particular ground condition. In practice, it is best practice to always use them — the cost of a set of pads is negligible compared to the consequences of an overturn.',
  },
  {
    question: 'How do I find out the ground bearing capacity of a site?',
    answer:
      "Ground bearing capacity can be obtained from site investigation reports, geotechnical surveys, or the client's pre-construction information pack. In the absence of formal data, you should consult with the site manager or principal contractor. IPAF provides guidance on typical bearing capacities for common ground types (e.g. tarmac, compacted gravel, soft clay). If in doubt, always assume the worst case and use larger spreader pads or ground mats.",
  },
  {
    question: 'What is the IPAF Spreader Pad Calculator and how do I use it?',
    answer:
      'The IPAF Spreader Pad Calculator is a free online tool that helps you determine the correct size of spreader pad for a given MEWP, based on the machine weight, rated load, outrigger pad size, and ground bearing capacity. You input these values and the calculator tells you the minimum pad size required. It is available on the IPAF website and is an essential planning tool for any boom-type MEWP operation using outriggers.',
  },
  {
    question: 'Can I set up a MEWP on a slope without levelling it?',
    answer:
      "No. The MEWP must be level before outriggers are deployed and the platform is elevated. Most manufacturers specify a maximum permissible gradient (typically 1 to 3 degrees for boom-type MEWPs on outriggers). If the ground is sloped beyond the manufacturer's limit, it must be levelled using timber packing or the machine must be repositioned to a level area. Operating on a slope outside the manufacturer's specification invalidates the stability calculations and creates a serious overturn risk.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the PRIMARY purpose of outriggers on a boom-type MEWP?',
    options: [
      'To lift the machine higher off the ground',
      'To transfer the load to the ground and define the stability envelope',
      'To prevent the machine from moving during transit',
      'To provide a mounting point for safety signs',
    ],
    correctAnswer: 1,
    explanation:
      'Outriggers transfer the combined load of the MEWP, platform, operator, and materials to the ground. The outrigger base defines the stability envelope — the wider the outrigger spread, the greater the stability of the machine.',
  },
  {
    id: 2,
    question:
      'Spreader plates distribute the outrigger point load over a larger area. What determines the SIZE of spreader plate needed?',
    options: [
      'Only the weight of the MEWP',
      'The colour of the outrigger pad',
      'Machine weight + rated load, ground bearing capacity, and outrigger pad size',
      'The height the platform will be elevated to',
    ],
    correctAnswer: 2,
    explanation:
      'The correct pad size depends on three factors: the total load (machine weight plus rated platform load), the ground bearing capacity, and the size of the outrigger foot. The IPAF Spreader Pad Calculator uses these inputs to determine the minimum pad area required.',
  },
  {
    id: 3,
    question:
      'Before positioning a MEWP, you should check for underground services. Which tool is used on site to detect buried cables and pipes?',
    options: [
      'A spirit level',
      'A Cable Avoidance Tool (CAT scanner)',
      'An anemometer',
      'A torque wrench',
    ],
    correctAnswer: 1,
    explanation:
      'A Cable Avoidance Tool (CAT scanner) is used to detect buried services such as electrical cables, gas pipes, and water mains before any ground-loading or ground-penetrating activity. Utility maps should also be consulted, but a CAT scan provides real-time confirmation of what lies beneath the surface.',
  },
  {
    id: 4,
    question:
      'What is the general rule for the minimum distance a MEWP should be positioned from the edge of an excavation?',
    options: [
      'At least half the depth of the excavation',
      'At least equal to the depth of the excavation',
      'Always 5 metres regardless of depth',
      "There is no rule — it is the operator's choice",
    ],
    correctAnswer: 1,
    explanation:
      'The general rule is that the MEWP must be positioned at least a distance equal to the depth of the excavation away from the edge. This prevents the outrigger loads from causing the excavation sides to collapse. Site-specific conditions may require a greater standoff distance.',
  },
  {
    id: 5,
    question:
      'Outrigger interlocks prevent elevation until outriggers are correctly deployed. Under which legislation is it an offence to bypass or defeat these interlocks?',
    options: [
      'LOLER 1998 Regulation 4',
      'PUWER 1998 Regulation 9',
      'HSWA 1974 Section 8',
      'CDM 2015 Regulation 13',
    ],
    correctAnswer: 2,
    explanation:
      'HSWA 1974 Section 8 makes it an offence for any person to intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety, or welfare. Bypassing an outrigger interlock is a clear example of interfering with a safety provision.',
  },
  {
    id: 6,
    question:
      'Which of the following is the CORRECT order for the practical outrigger setup procedure?',
    options: [
      'Elevate platform, extend outriggers, place pads, level machine',
      'Place pads, extend outriggers fully, lower onto pads, level machine, check interlocks',
      'Level machine, extend outriggers, elevate platform, place pads',
      'Extend outriggers, elevate platform, then place pads under outriggers',
    ],
    correctAnswer: 1,
    explanation:
      'The correct sequence is: place spreader pads at each outrigger position, extend outriggers fully, lower outriggers onto pads (check they are centred), level the machine, then verify all interlock indicators before elevating. The platform must NEVER be elevated before outriggers are fully deployed and the machine is level.',
  },
  {
    id: 7,
    question:
      'When using spreader plates, where must the plate be positioned relative to the outrigger foot?',
    options: [
      'To one side of the outrigger foot to allow drainage',
      'Centrally under the outrigger foot',
      'Behind the outrigger foot',
      'It does not matter as long as the plate is touching the foot',
    ],
    correctAnswer: 1,
    explanation:
      'The spreader plate must be placed CENTRALLY under the outrigger foot. If the foot is off-centre, the load is not distributed evenly across the pad, which can cause the pad to tilt, the outrigger to slip, or the ground to fail on one side — all of which can lead to overturn.',
  },
  {
    id: 8,
    question: 'Which of the following is NOT a type of outrigger interlock sensor?',
    options: [
      'Pressure switch (detects load on outrigger)',
      'Position sensor (detects full extension)',
      'Level sensor (detects machine is level)',
      'Temperature sensor (detects ground temperature)',
    ],
    correctAnswer: 3,
    explanation:
      'Outrigger interlock systems typically use pressure switches, position sensors, and level sensors. Temperature sensors are not used in outrigger interlock systems. The three sensor types work together to confirm that outriggers are fully deployed, under load, and that the machine is level before elevation is permitted.',
  },
];

export default function MewpModule3Section3() {
  useSEO({
    title: 'Outriggers, Stabilisers & Ground Preparation | MEWP Module 3.3',
    description:
      'Outrigger types and deployment, spreader plates and pads, ground preparation, interlock systems, and the complete practical setup procedure for boom-type MEWPs on outriggers.',
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
            <Anchor className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 3 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Outriggers, Stabilisers &amp; Ground Preparation
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Outrigger types and deployment procedures, spreader plates and pads, ground assessment
            and preparation, interlock systems, and the complete practical setup procedure for
            boom-type MEWPs
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Outriggers:</strong> ALL must be fully deployed &mdash; partial is NEVER
                acceptable
              </li>
              <li>
                <strong>Pads:</strong> Spreader plates MUST be used with boom-type MEWPs
              </li>
              <li>
                <strong>Ground:</strong> Check bearing capacity, services, and voids first
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Before:</strong> Assess ground, place pads, extend outriggers fully
              </li>
              <li>
                <strong>During:</strong> Check level, verify interlocks, test at low height
              </li>
              <li>
                <strong>Always:</strong> Never bypass interlocks, never skip spreader pads
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain why correct outrigger setup is critical to MEWP stability',
              'Describe the different types of outriggers and stabilisers',
              'Explain the purpose and correct use of spreader plates and pads',
              'Identify the ground preparation checks required before positioning a MEWP',
              'Describe the types and function of outrigger interlock systems',
              'Carry out the practical setup procedure for a boom-type MEWP on outriggers',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Outrigger Setup Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Outrigger Setup Matters
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Outriggers and stabilisers transfer the combined load of the MEWP, platform,
                operator, tools, and materials to the ground. They are the foundation upon which the
                entire machine&rsquo;s stability depends. The outrigger base &mdash; the rectangle
                or square formed by the four outrigger feet &mdash; defines the{' '}
                <strong>stability envelope</strong> of the machine. Every force acting on the MEWP
                (wind, boom extension, platform load) must remain within this envelope for the
                machine to stay upright.
              </p>

              <p>
                Incorrect outrigger setup is a{' '}
                <strong>leading cause of MEWP overturn incidents</strong> in the United Kingdom. If
                one outrigger sinks into soft ground, slides off a pad, or is not fully deployed,
                the stability envelope shrinks or shifts &mdash; and the entire machine can tip
                over. Overturn events are almost always catastrophic, frequently resulting in fatal
                or life-changing injuries to the operator and anyone in the vicinity.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Safety Rule</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    ALL outriggers must be FULLY deployed before the platform is elevated.
                  </strong>{' '}
                  Partial deployment is <strong>NEVER</strong> acceptable under any circumstances.
                  Even on firm, level ground, partial deployment drastically reduces the stability
                  envelope and creates an immediate overturn risk. If a machine&rsquo;s outriggers
                  cannot be fully deployed due to site constraints, the machine is not suitable for
                  that location and a different MEWP or access method must be selected.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> The stability of a MEWP
                  on outriggers depends on three things: the outrigger spread (wider is more
                  stable), the ground bearing capacity (can it take the load?), and the load
                  distribution (are spreader pads correctly placed?). Get any one of these wrong and
                  the machine can overturn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Outrigger Types and Deployment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Outrigger Types and Deployment
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There are three main types of ground-support systems used on MEWPs: manual
                outriggers, hydraulic outriggers, and stabilisers. Each has different
                characteristics, but the fundamental rule is the same for all three &mdash; they
                must be fully extended and correctly deployed before the platform is elevated.
              </p>

              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Manual Outriggers</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Pin-lock mechanism for extension positions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Manual extension by sliding or cranking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Visual level check by operator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Common on smaller trailer-mounted platforms</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Hydraulic Outriggers</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Powered extension and retraction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Auto-levelling available on some machines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Pressure-monitored for load feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Common on larger boom-type MEWPs</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Stabilisers</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Shorter legs that stabilise rather than fully support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Machine retains weight on wheels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Resist tipping but do not lift the chassis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Common on vehicle-mounted platforms</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                All outrigger and stabiliser systems must have either{' '}
                <strong>hydraulic holding valves</strong> or <strong>mechanical locks</strong> to
                prevent retraction under load. These are safety-critical components &mdash; if an
                outrigger retracts while the platform is elevated, the machine will overturn
                instantly.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">
                  Deployment Procedure (All Types)
                </p>
                <div className="space-y-2">
                  {[
                    'Extend outriggers fully to each side — verify pin or hydraulic lock engages',
                    'Lower outriggers to the ground onto spreader pads',
                    'Check that pads are centrally placed under each outrigger foot',
                    'Check the machine is level using the on-board level indicator or spirit level',
                    'Apply mechanical lock or confirm hydraulic pressure indicator shows correct reading',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outrigger Layout Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Outrigger Layout &mdash; View From Above
                </p>
                <div className="flex justify-center">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                    {/* Stability envelope (outer square) */}
                    <div className="absolute inset-0 border-2 border-dashed border-green-500/40 rounded-sm" />
                    <p className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] text-green-400 whitespace-nowrap">
                      Stability Envelope
                    </p>

                    {/* Machine body (centre rectangle) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-36 sm:w-28 sm:h-40 bg-white/10 border border-white/30 rounded flex items-center justify-center">
                      <span className="text-[10px] text-white/60 text-center leading-tight">
                        MEWP
                        <br />
                        Chassis
                      </span>
                    </div>

                    {/* Outrigger arms */}
                    {/* Top-left arm */}
                    <div className="absolute top-[22%] left-[12%] w-[22%] h-[1px] bg-amber-400/60 rotate-0" />
                    <div className="absolute top-[12%] left-[12%] w-[1px] h-[10%] bg-amber-400/60" />
                    {/* Top-right arm */}
                    <div className="absolute top-[22%] right-[12%] w-[22%] h-[1px] bg-amber-400/60" />
                    <div className="absolute top-[12%] right-[12%] w-[1px] h-[10%] bg-amber-400/60" />
                    {/* Bottom-left arm */}
                    <div className="absolute bottom-[22%] left-[12%] w-[22%] h-[1px] bg-amber-400/60" />
                    <div className="absolute bottom-[12%] left-[12%] w-[1px] h-[10%] bg-amber-400/60" />
                    {/* Bottom-right arm */}
                    <div className="absolute bottom-[22%] right-[12%] w-[22%] h-[1px] bg-amber-400/60" />
                    <div className="absolute bottom-[12%] right-[12%] w-[1px] h-[10%] bg-amber-400/60" />

                    {/* Outrigger pads (4 corners) */}
                    {[
                      { pos: 'top-[4%] left-[4%]', label: 'FL' },
                      { pos: 'top-[4%] right-[4%]', label: 'FR' },
                      { pos: 'bottom-[4%] left-[4%]', label: 'RL' },
                      { pos: 'bottom-[4%] right-[4%]', label: 'RR' },
                    ].map((pad, i) => (
                      <div
                        key={i}
                        className={`absolute ${pad.pos} w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/20 border-2 border-amber-400/60 rounded flex items-center justify-center`}
                      >
                        <span className="text-[10px] font-bold text-amber-400">{pad.label}</span>
                      </div>
                    ))}

                    {/* Spreader pads (larger, behind outrigger pads) */}
                    {[
                      'top-[1%] left-[1%]',
                      'top-[1%] right-[1%]',
                      'bottom-[1%] left-[1%]',
                      'bottom-[1%] right-[1%]',
                    ].map((pos, i) => (
                      <div
                        key={i}
                        className={`absolute ${pos} w-14 h-14 sm:w-16 sm:h-16 border border-blue-400/30 rounded -z-0`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-amber-500/20 border border-amber-400/60 rounded" />
                    <span className="text-white/60">Outrigger foot</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border border-blue-400/30 rounded" />
                    <span className="text-white/60">Spreader pad</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-[1px] border border-dashed border-green-500/40" />
                    <span className="text-white/60">Stability envelope</span>
                  </div>
                </div>
                <p className="text-[11px] text-white/40 text-center mt-2">
                  FL = Front Left, FR = Front Right, RL = Rear Left, RR = Rear Right
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Spreader Plates and Pads */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Spreader Plates and Pads
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Spreader plates (also called spreader pads, outrigger pads, or base plates)
                distribute the concentrated point load from an outrigger foot over a larger area of
                ground. Without a spreader pad, the full weight of the MEWP and its load bears down
                through a small outrigger foot &mdash; creating ground pressures that can easily
                exceed the bearing capacity of most surfaces.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Mandatory Requirement</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    <strong className="text-white">Boom-type MEWPs on outriggers:</strong> Spreader
                    plates MUST ALWAYS be used. No exceptions.
                  </p>
                  <p>
                    <strong className="text-white">All other outriggered MEWPs:</strong> Spreader
                    plates must be used unless a specific risk assessment determines they are not
                    required for the particular ground conditions.
                  </p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">
                  Sizing Spreader Pads &mdash; IPAF Spreader Pad Calculator
                </p>
                <p className="text-sm text-white/80 mb-3">
                  IPAF provides a free Spreader Pad Calculator. The correct pad size depends on
                  three inputs:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">Machine weight + rated load</strong> &mdash;
                      the total force bearing down on each outrigger
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">Ground bearing capacity</strong> &mdash; the
                      maximum pressure the ground can support (kN/m&sup2; or kPa)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">Outrigger pad size</strong> &mdash; the contact
                      area of the outrigger foot itself
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-amber-400 mb-2">Timber Pads</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Scaffold boards (multiple, bolted)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Hardwood blocks or mats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Cost-effective, widely available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Must be checked for rot and damage</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">Proprietary Pads</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Engineered plastic or composite</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Rated to specific load capacities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Lightweight, durable, consistent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Often colour-coded by load rating</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Steel Plates</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Heavy-duty industrial applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Very high load capacity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Heavy to transport and position</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Risk of slipping on smooth surfaces</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Correct vs Incorrect Pad Placement Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Spreader Pad Placement &mdash; Correct vs Incorrect
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {/* Correct Placement */}
                  <div className="flex flex-col items-center">
                    <p className="text-xs font-semibold text-green-400 mb-3">CORRECT</p>
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                      {/* Spreader pad */}
                      <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-400/40 rounded flex items-center justify-center">
                        <span className="text-[9px] text-blue-400/60 absolute bottom-1">
                          Spreader pad
                        </span>
                      </div>
                      {/* Outrigger foot - centred */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/30 border-2 border-amber-400/70 rounded flex items-center justify-center">
                        <span className="text-[9px] text-amber-400 font-bold">Foot</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-green-400/80 mt-2 text-center">
                      Foot CENTRED on pad
                      <br />
                      Load distributed evenly
                    </p>
                  </div>

                  {/* Incorrect Placement */}
                  <div className="flex flex-col items-center">
                    <p className="text-xs font-semibold text-red-400 mb-3">INCORRECT</p>
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                      {/* Spreader pad */}
                      <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-400/40 rounded flex items-center justify-center">
                        <span className="text-[9px] text-blue-400/60 absolute bottom-1">
                          Spreader pad
                        </span>
                      </div>
                      {/* Outrigger foot - off centre */}
                      <div className="absolute top-1 right-1 w-10 h-10 sm:w-12 sm:h-12 bg-red-500/30 border-2 border-red-400/70 rounded flex items-center justify-center">
                        <span className="text-[9px] text-red-400 font-bold">Foot</span>
                      </div>
                      {/* Danger indicator */}
                      <div className="absolute bottom-2 left-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      </div>
                    </div>
                    <p className="text-[10px] text-red-400/80 mt-2 text-center">
                      Foot OFF-CENTRE
                      <br />
                      Tilt, slip, or ground failure risk
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Remember:</strong> Spreader pads must be
                  placed <strong>CENTRALLY</strong> under the outrigger foot. If the foot is
                  off-centre, the load is unevenly distributed across the pad. This can cause the
                  pad to tilt, the outrigger to slide, or the ground to fail on one side &mdash; any
                  of which can lead to overturn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Ground Preparation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ground Preparation
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The ground beneath a MEWP is just as important as the machine itself. Before
                positioning a MEWP &mdash; especially one that will be set up on outriggers &mdash;
                the ground must be assessed and prepared. Poor ground conditions are a major
                contributing factor in MEWP overturn incidents.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Footprints className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Pre-Positioning Ground Checks</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Clear debris and loose material</strong>{' '}
                      &mdash; rubble, mud, gravel, or waste that could shift under load
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Check for underground services</strong> &mdash;
                      consult utility maps and use a Cable Avoidance Tool (CAT scanner) to detect
                      buried cables, gas mains, and water pipes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Check for sub-surface voids</strong> &mdash;
                      cellars, basements, culverts, drains, or underground chambers that could
                      collapse under concentrated outrigger loads
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Assess bearing capacity</strong> &mdash; can
                      the ground support the outrigger point loads? Check site investigation data or
                      consult IPAF guidance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Level uneven ground</strong> &mdash; where
                      possible, level the ground or select a different position rather than relying
                      solely on outrigger adjustment
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">
                  Solutions for Poor Ground Conditions
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Timber Mats</p>
                    <p className="text-sm text-white/80">
                      Multiple scaffold boards bolted together to form a load-spreading platform.
                      Suitable for moderately soft ground.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Proprietary Ground Mats</p>
                    <p className="text-sm text-white/80">
                      Lightweight composite mats designed specifically for spreading heavy point
                      loads. Interlocking for larger areas.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Steel Grillages</p>
                    <p className="text-sm text-white/80">
                      Heavy-duty steel frameworks for industrial applications where very high ground
                      loading is expected.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Concrete Pads</p>
                    <p className="text-sm text-white/80">
                      Permanent installations for locations where MEWPs are regularly used in the
                      same position (e.g. maintenance bays).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    Distance From Excavation Edges
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The general rule is that the MEWP must be positioned at least a distance{' '}
                  <strong className="text-white">equal to the depth</strong> of the excavation away
                  from its edge. For example: a 3-metre-deep trench requires a minimum 3-metre
                  standoff from the excavation edge to the nearest outrigger pad. The concentrated
                  loads from outriggers can cause excavation sides to collapse, with catastrophic
                  consequences. A site-specific assessment may require a greater distance depending
                  on ground type and loading.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Typical Ground Bearing Capacities (Approximate)
                </p>
                <div className="space-y-1.5">
                  {[
                    {
                      type: 'Compacted hardcore / tarmac',
                      capacity: '100–200 kN/m²',
                      colour: 'bg-green-400',
                    },
                    {
                      type: 'Firm clay / compacted gravel',
                      capacity: '75–150 kN/m²',
                      colour: 'bg-green-400',
                    },
                    {
                      type: 'Stiff sandy clay',
                      capacity: '50–100 kN/m²',
                      colour: 'bg-amber-400',
                    },
                    {
                      type: 'Loose sand / soft clay',
                      capacity: '25–50 kN/m²',
                      colour: 'bg-orange-400',
                    },
                    {
                      type: 'Very soft clay / waterlogged ground',
                      capacity: '< 25 kN/m²',
                      colour: 'bg-red-400',
                    },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${row.colour} flex-shrink-0`} />
                        <span className="text-white/80">{row.type}</span>
                      </div>
                      <span className="text-white/60 text-xs ml-2 whitespace-nowrap">
                        {row.capacity}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-white/40 mt-2">
                  Values are indicative only. Always use site-specific data where available.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Interlock Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Interlock Systems
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Many modern MEWPs are fitted with outrigger interlock systems that prevent the boom
                or platform from being elevated until the outriggers are correctly deployed. These
                interlocks are a critical safety layer, but they must be understood as a{' '}
                <strong>backup</strong>, not a replacement for proper visual confirmation by the
                operator.
              </p>

              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Pressure Switches</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Detect that load is being applied to the outrigger foot, confirming it is in
                    contact with the ground and bearing weight. If an outrigger is not loaded, the
                    switch prevents elevation.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Position Sensors</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Detect that the outrigger beam is fully extended to its maximum reach. If
                    outriggers are only partially extended, the sensor prevents elevation and may
                    restrict the working envelope.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Level Sensors</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Detect that the machine chassis is within the manufacturer&rsquo;s permitted
                    tilt range. If the machine is not level enough, elevation is prevented until the
                    operator adjusts the outriggers.
                  </p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    WARNING: Never Bypass Interlocks
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Interlocks are a safety backup, <strong className="text-white">NOT</strong> a
                    substitute for visual confirmation by the operator. The operator must always
                    physically verify that outriggers are fully extended, pads are correctly placed,
                    and the machine is level &mdash; regardless of what the interlock indicators
                    show.
                  </p>
                  <p>
                    <strong className="text-red-300">
                      Never attempt to bypass or defeat interlock systems.
                    </strong>{' '}
                    This is an offence under{' '}
                    <strong className="text-white">HSWA 1974 Section 8</strong> &mdash;
                    intentionally or recklessly interfering with or misusing anything provided in
                    the interests of health, safety, or welfare. It can result in prosecution,
                    unlimited fines, and imprisonment.
                  </p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> If an interlock prevents
                  you from elevating, it is doing its job. Do not try to find a workaround. Instead,
                  investigate and correct the root cause: is an outrigger not fully extended? Is a
                  pad missing? Is the machine not level? Fix the problem, then re-check.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Practical Setup Procedure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Practical Setup Procedure
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following is a step-by-step procedure for setting up a boom-type MEWP on
                outriggers. This procedure should be followed every time the machine is set up in a
                new position. Skipping steps or changing the order can create serious safety risks.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">
                    Boom-Type MEWP Outrigger Setup &mdash; 10 Steps
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      step: 'Position machine on firm, level ground',
                      detail:
                        'Check ground conditions, bearing capacity, and clearance from excavations, overhead lines, and other hazards.',
                    },
                    {
                      step: 'Apply parking brake and chock wheels',
                      detail:
                        'The machine must not move during outrigger deployment or operation. Wheel chocks provide a secondary restraint.',
                    },
                    {
                      step: 'Place spreader pads at each outrigger position',
                      detail:
                        'Pads must be correctly sized for the ground conditions and positioned where each outrigger foot will land.',
                    },
                    {
                      step: 'Extend outriggers fully to each side',
                      detail:
                        'ALL outriggers must be extended to their full reach. Verify pin-locks engage or hydraulic locks activate.',
                    },
                    {
                      step: 'Lower outriggers onto pads — check pads are centred',
                      detail:
                        'Each outrigger foot must land centrally on its spreader pad. If off-centre, retract and reposition the pad.',
                    },
                    {
                      step: 'Level machine using hydraulic levelling or manual adjustment',
                      detail:
                        'Adjust outrigger heights until the machine is level. Some machines have auto-levelling — verify it completes correctly.',
                    },
                    {
                      step: 'Check level indicator or bubble level',
                      detail:
                        'Confirm the on-board level indicator shows the machine is within the permitted tilt range before proceeding.',
                    },
                    {
                      step: 'Verify all interlock indicators show green / ready',
                      detail:
                        'Check the control panel. All outrigger status lights should indicate correct deployment before elevation is permitted.',
                    },
                    {
                      step: 'Test platform controls at low height before full elevation',
                      detail:
                        'Elevate the platform a short distance and test all boom and platform controls. Check for unusual noises, vibration, or movement.',
                    },
                    {
                      step: 'Confirm ground rescue person is present',
                      detail:
                        'A trained person must be present at ground level throughout the operation, able to use the ground-level emergency controls if required.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{item.step}</p>
                        <p className="text-sm text-white/70 mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Common Setup Errors</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Partially deploying outriggers due to site obstructions &mdash; select a
                      different machine or position instead
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Using undersized or damaged spreader pads &mdash; always use pads rated for
                      the load and ground conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Setting up over underground voids (cellars, drains) &mdash; always check for
                      sub-surface features
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Failing to re-check level after ground settlement &mdash; monitor throughout
                      the operation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      No ground rescue person present &mdash; this must be arranged before work
                      begins
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Remember:</strong> This procedure applies
                  every time the machine is repositioned. Even moving a boom-type MEWP a few metres
                  to a new work position requires the full outrigger setup procedure to be repeated
                  from the beginning. Never assume the ground conditions are the same as the
                  previous position.
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
            <Link to="../mewp-module-3-section-4">
              Next: Fall Protection, Harnesses &amp; PPE
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
