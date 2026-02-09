import {
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertTriangle,
  ArrowUpDown,
  Maximize2,
  Truck,
  GitBranch,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mewp-group-ab',
    question:
      'A scissor lift raises its platform straight up above the chassis. Is this Group A or Group B?',
    options: [
      'Group A — platform stays within the base footprint',
      'Group B — platform extends beyond the base footprint',
      'Neither — scissor lifts are not classified',
      'Both — it depends on the model',
    ],
    correctIndex: 0,
    explanation:
      'Scissor lifts are Group A because the platform only moves vertically, remaining directly above the chassis/base. Group B machines use booms or articulating structures to move the platform outside the base area.',
  },
  {
    id: 'mewp-scissor-mechanism',
    question: "What is the primary mechanical advantage of a scissor lift's pantograph mechanism?",
    options: [
      'It allows horizontal outreach beyond the chassis',
      'It provides a large, stable platform with vertical-only lift',
      'It enables 360-degree slewing',
      'It reduces the need for outriggers',
    ],
    correctIndex: 1,
    explanation:
      "The criss-cross 'X' pantograph mechanism of a scissor lift provides purely vertical lift with a large, stable working platform. The platform area is typically much larger than that of a boom lift, making scissor lifts ideal for tasks directly beneath the work area.",
  },
  {
    id: 'mewp-vehicle-mounted',
    question: 'A van-mounted platform (Category 1B) requires outriggers before use. Why?',
    options: [
      "Because the van's suspension is too soft for elevated work",
      'Because it is a Type 1 (static) machine — it must not travel with the platform elevated',
      'Because outriggers are required by the Highway Code',
      'Because all MEWPs need outriggers regardless of type',
    ],
    correctIndex: 1,
    explanation:
      'Vehicle-mounted platforms are IPAF Category 1B (Static Boom). Type 1 machines cannot be driven whilst the platform is elevated, so outriggers must be deployed to provide a stable base before the boom is extended. This prevents the vehicle from tipping.',
  },
];

const faqs = [
  {
    question: 'What is the difference between IPAF Category 3A and 3B?',
    answer:
      'Category 3A covers Mobile Vertical machines (self-propelled scissor lifts) that can be driven whilst the platform is elevated but only move vertically. Category 3B covers Mobile Boom machines (self-propelled articulating or telescopic booms) that can also be driven elevated but move the platform both vertically and horizontally beyond the base footprint. The key distinction is whether the platform stays above the base (3A) or extends beyond it (3B).',
  },
  {
    question: 'Can I operate any MEWP with a single IPAF PAL Card category?',
    answer:
      'No. Your IPAF PAL Card is endorsed for specific machine categories. If you are trained on 3B (Mobile Boom) machines, that does not automatically qualify you to operate 1B (Static Boom) machines, because the operating characteristics and safety procedures differ. You need the correct category endorsement for each type of MEWP you operate.',
  },
  {
    question: 'What is a spider lift and when would I choose one?',
    answer:
      "A spider lift is a compact, track-mounted or wheeled boom lift (Group B) with broad outrigger legs that spread out like a spider's legs. They are ideal for restricted-access sites where a larger boom lift cannot fit — for example, through standard doorways, on delicate flooring, or on sloped ground. Despite their compact size, many spider lifts achieve working heights of 15–30 metres.",
  },
  {
    question: 'Is a Push Around Vertical (PAV) the same as a podium step?',
    answer:
      'No. A PAV is a MEWP — it has a work platform, an extending structure (usually a mast), and controls at platform level. It is pushed manually between positions at ground level and then elevated. A podium step is a fixed-height platform with no extending structure and is not classified as a MEWP. PAVs typically reach working heights of 4–6 metres, whilst podium steps are typically under 2 metres.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What defines a MEWP?',
    options: [
      'Any platform used at height, including ladders and scaffolding',
      'A machine designed to lift persons to a working position, with a work platform, extending structure, and chassis',
      'A vehicle with a crane mounted on the back',
      'A fixed platform permanently installed on a building',
    ],
    correctAnswer: 1,
    explanation:
      'A MEWP (Mobile Elevating Work Platform) is specifically defined as a machine with three key elements: a work platform with controls, an extending structure that raises and positions the platform, and a chassis/base. Ladders, scaffolding, and fixed installations are not MEWPs.',
  },
  {
    id: 2,
    question: 'Which of these is a Group B MEWP?',
    options: [
      'A scissor lift',
      'A vertical mast lift',
      'An articulating boom lift',
      'A push-around vertical lift',
    ],
    correctAnswer: 2,
    explanation:
      'An articulating boom lift is Group B because its boom structure can move the platform outside the base footprint. Scissor lifts, vertical mast lifts, and push-around verticals are all Group A — their platforms only move vertically above the base.',
  },
  {
    id: 3,
    question: 'What does IPAF Category 1A refer to?',
    options: [
      'Mobile Vertical — can drive elevated',
      'Static Vertical — cannot drive elevated, uses outriggers',
      'Static Boom — truck-mounted with outriggers',
      'Mobile Boom — self-propelled articulating boom',
    ],
    correctAnswer: 1,
    explanation:
      'Category 1A is Static Vertical. These are vertical-lift machines (Group A) that cannot be driven with the platform elevated. They are typically used on outriggers in a fixed position. Examples include static scissor lifts on outriggers.',
  },
  {
    id: 4,
    question:
      'A self-propelled telescopic boom that can drive whilst elevated is which IPAF category?',
    options: ['1A', '1B', '3A', '3B'],
    correctAnswer: 3,
    explanation:
      "A self-propelled telescopic boom is Category 3B — Mobile Boom. The '3' means it is mobile (can drive whilst elevated) and the 'B' means it is Group B (the platform moves outside the base footprint via a boom).",
  },
  {
    id: 5,
    question:
      'Which type of boom lift is best for navigating around obstacles to reach a work position?',
    options: [
      'Telescopic boom — straight extending arm',
      'Articulating boom — multiple jointed sections with up-and-over capability',
      'Scissor lift — pantograph vertical lift',
      'Trailer-mounted platform — towed to site',
    ],
    correctAnswer: 1,
    explanation:
      "An articulating (knuckle) boom has multiple jointed sections allowing 'up-and-over' capability. This means it can reach over parapets, around building edges, and past obstacles that would block a straight telescopic boom. It is the best choice when the work position is not in a direct line from the machine.",
  },
  {
    id: 6,
    question:
      'When choosing a MEWP, which factor determines whether you need Group B rather than Group A?',
    options: [
      'The weight of tools and materials on the platform',
      'Whether the work position is directly above or offset from where the machine can be positioned',
      'Whether the job is indoors or outdoors',
      'The number of operatives required on the platform',
    ],
    correctAnswer: 1,
    explanation:
      'The critical factor is horizontal outreach. If the work position is directly above the base, Group A (vertical-only) is sufficient. If the work position is offset — requiring the platform to extend beyond the base footprint — you need Group B (boom) to reach it.',
  },
  {
    id: 7,
    question:
      'What is the main advantage of a vehicle-mounted platform (Category 1B) over a self-propelled boom?',
    options: [
      'It can drive with the platform elevated',
      'It is road-legal and can travel between sites under its own power',
      'It does not require outriggers',
      'It has a larger platform area',
    ],
    correctAnswer: 1,
    explanation:
      'Vehicle-mounted platforms (on vans, trucks, or lorries) are road-legal and can drive between sites via public roads. Self-propelled booms must be transported on a low-loader. This makes vehicle-mounted platforms ideal for utility work, street lighting, and telecoms where multiple locations must be visited in a single shift.',
  },
  {
    id: 8,
    question:
      'A PAV (Push Around Vertical) is manually pushed between positions. Why is it still classified as a MEWP?',
    options: [
      'Because it has wheels',
      'Because it has a work platform, an extending structure (mast), and a chassis',
      'Because it requires an IPAF licence',
      'Because it can be used outdoors',
    ],
    correctAnswer: 1,
    explanation:
      'A PAV meets the MEWP definition: it has a work platform with controls, an extending structure (mast) that elevates the platform, and a chassis/base. The fact that it is pushed manually rather than self-propelled does not change its classification — it is still a MEWP, just in the special PAV category.',
  },
];

export default function MewpModule1Section3() {
  useSEO({
    title: 'MEWP Types, Groups & IPAF Categories | MEWP Module 1.3',
    description:
      'Group A vs Group B classification, IPAF machine categories (1A, 1B, 3A, 3B, PAV, IAD, SPECIAL), scissor lifts, boom lifts, spider lifts, vehicle-mounted platforms, and choosing the right MEWP for the job.',
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
            <Link to="../mewp-module-1">
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
            <FileText className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">
              MODULE 1 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            MEWP Types, Groups & IPAF Categories
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the classification of Mobile Elevating Work Platforms &mdash; Group A vs
            Group B, IPAF machine categories, and selecting the right machine for the task
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Group A:</strong> Platform moves vertically only (e.g. scissor lifts)
              </li>
              <li>
                <strong>Group B:</strong> Platform extends beyond the base (e.g. boom lifts)
              </li>
              <li>
                <strong>Categories:</strong> 1A, 1B (static) &middot; 3A, 3B (mobile) &middot; PAV,
                IAD, SPECIAL
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Match:</strong> Machine type to the task requirements
              </li>
              <li>
                <strong>Check:</strong> Your PAL Card covers the category you need
              </li>
              <li>
                <strong>Consider:</strong> Height, outreach, access, ground, and environment
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Define what a MEWP is and identify its three key components',
              'Distinguish between Group A and Group B classifications',
              'Identify all IPAF machine categories (1A, 1B, 3A, 3B, PAV, IAD, SPECIAL)',
              'Describe the operating principles of scissor lifts and boom lifts',
              'Explain the differences between telescopic and articulating booms',
              'List the factors for selecting the correct MEWP for a given task',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is a MEWP? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is a MEWP?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>MEWP</strong> (Mobile Elevating Work Platform) is a machine designed
                specifically to lift persons to a working position. Unlike scaffolding or ladders, a
                MEWP is a powered machine with integrated controls, allowing the operative to
                position themselves precisely at the required height and location.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Key Definition</p>
                <p className="text-sm text-white">
                  A MEWP consists of <strong>three essential components</strong>:
                </p>
                <div className="grid sm:grid-cols-3 gap-3 mt-3">
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-elec-yellow font-semibold text-sm mb-1">Work Platform</p>
                    <p className="text-xs text-white/70">
                      The enclosed platform where operatives stand, with controls for positioning
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-elec-yellow font-semibold text-sm mb-1">
                      Extending Structure
                    </p>
                    <p className="text-xs text-white/70">
                      The mechanism that raises and positions the platform (boom, mast, scissors)
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-elec-yellow font-semibold text-sm mb-1">Chassis / Base</p>
                    <p className="text-xs text-white/70">
                      The mobile base unit — wheeled, tracked, or vehicle-mounted
                    </p>
                  </div>
                </div>
              </div>

              <p>MEWPs are used across a wide range of industries and applications:</p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-white/80">
                  {[
                    'Construction',
                    'Facilities management',
                    'Utilities & power',
                    'Telecoms & fibre',
                    'Tree surgery',
                    'Filming & broadcasting',
                    'Event rigging',
                    'Warehouse & logistics',
                    'Street lighting',
                  ].map((use, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow/60 flex-shrink-0" />
                      <span>{use}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Not a MEWP</p>
                </div>
                <p className="text-sm text-white/80">
                  Ladders, stepladders, podium steps, scaffolding, cradles, and rope access systems
                  are <strong>not</strong> MEWPs. They do not have an integrated extending structure
                  with platform-level controls. Goods-only lifts (not designed to carry persons) are
                  also excluded from the MEWP definition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Group A vs Group B */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Group A vs Group B Classification
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every MEWP is classified as either <strong>Group A</strong> or{' '}
                <strong>Group B</strong>. This is the most fundamental distinction in MEWP
                classification and determines the type of work the machine can access, the training
                required, and the hazards involved.
              </p>

              {/* Visual Diagram: Group A vs Group B */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* Group A Diagram */}
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-3 text-center">
                    Group A &mdash; Vertical Only
                  </p>
                  <div className="flex justify-center mb-4">
                    <div className="relative w-40 h-48">
                      {/* Chassis */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-blue-500/30 border border-blue-400/50 rounded flex items-center justify-center">
                        <span className="text-[10px] text-blue-300 font-mono">CHASSIS</span>
                      </div>
                      {/* Vertical arrows */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-28 bg-blue-400/60" />
                      <div className="absolute bottom-[136px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-blue-400" />
                      {/* Platform */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-8 bg-blue-500/40 border-2 border-blue-400/70 rounded flex items-center justify-center">
                        <span className="text-[10px] text-blue-200 font-mono">PLATFORM</span>
                      </div>
                      {/* Boundary lines */}
                      <div className="absolute top-0 left-[16px] w-px h-full border-l border-dashed border-blue-400/30" />
                      <div className="absolute top-0 right-[16px] w-px h-full border-l border-dashed border-blue-400/30" />
                    </div>
                  </div>
                  <p className="text-xs text-center text-blue-300/80 mb-3">
                    Platform stays directly above the base
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Scissor lifts (pantograph mechanism)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Vertical mast lifts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Push-around vertical lifts (PAV)</span>
                    </li>
                  </ul>
                </div>

                {/* Group B Diagram */}
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-3 text-center">
                    Group B &mdash; Beyond the Base
                  </p>
                  <div className="flex justify-center mb-4">
                    <div className="relative w-40 h-48">
                      {/* Chassis */}
                      <div className="absolute bottom-0 left-0 w-24 h-6 bg-green-500/30 border border-green-400/50 rounded flex items-center justify-center">
                        <span className="text-[10px] text-green-300 font-mono">CHASSIS</span>
                      </div>
                      {/* Boom arm - angled line */}
                      <div className="absolute bottom-6 left-[48px] w-0.5 h-16 bg-green-400/60 origin-bottom rotate-[-30deg]" />
                      {/* Second boom section */}
                      <div className="absolute bottom-[70px] left-[40px] w-0.5 h-16 bg-green-400/60 origin-bottom rotate-[15deg]" />
                      {/* Platform - offset to the right */}
                      <div className="absolute top-2 right-0 w-20 h-8 bg-green-500/40 border-2 border-green-400/70 rounded flex items-center justify-center">
                        <span className="text-[10px] text-green-200 font-mono">PLATFORM</span>
                      </div>
                      {/* Boundary line showing chassis edge */}
                      <div className="absolute top-0 left-[96px] w-px h-full border-l border-dashed border-red-400/40" />
                      {/* Label */}
                      <div className="absolute top-[90px] right-0 text-[9px] text-red-300/70 font-mono">
                        beyond base
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-center text-green-300/80 mb-3">
                    Platform extends outside the base footprint
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Telescopic boom lifts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Articulating (knuckle) boom lifts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Spider lifts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Vehicle-mounted platforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Trailer-mounted platforms</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Why Does This Matter?</p>
                <p className="text-sm text-white/80">
                  Group B machines introduce <strong>additional hazards</strong> that Group A
                  machines do not have: the platform can be positioned over voids, over live
                  traffic, adjacent to structures, and the centre of gravity shifts as the boom
                  extends. This is why Group B training covers boom operation, outreach limits, and
                  the increased risk of entrapment, crushing, and overturning. You must hold the
                  correct Group endorsement on your PAL Card.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: IPAF Machine Categories */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            IPAF Machine Categories
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                IPAF (International Powered Access Federation) uses a standardised category system
                to classify MEWPs. Each category appears as an endorsement on your PAL Card. The
                system combines the <strong>type number</strong> (1 = static, 3 = mobile) with the
                <strong> group letter</strong> (A = vertical, B = boom).
              </p>

              {/* Category Grid */}
              <div className="space-y-4">
                {/* Static Machines - Type 1 */}
                <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-3">
                    <p className="text-sm font-semibold text-blue-300">
                      Type 1 &mdash; Static (Cannot Drive Elevated)
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-px bg-white/5">
                    <div className="bg-[#1a1a1a] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 text-xs font-bold">
                          1A
                        </span>
                        <span className="text-sm font-medium text-white">Static Vertical</span>
                      </div>
                      <p className="text-xs text-white/60 mb-2">
                        Group A + Static = Cannot drive elevated, vertical lift only
                      </p>
                      <ul className="text-xs text-white/70 space-y-1">
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                          <span>Static scissor lifts on outriggers</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                          <span>Must be positioned before elevating</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                          <span>Less common than self-propelled types</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-[#1a1a1a] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 text-xs font-bold">
                          1B
                        </span>
                        <span className="text-sm font-medium text-white">Static Boom</span>
                      </div>
                      <p className="text-xs text-white/60 mb-2">
                        Group B + Static = Cannot drive elevated, boom extends beyond base
                      </p>
                      <ul className="text-xs text-white/70 space-y-1">
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                          <span>Van-mounted, truck-mounted, lorry-mounted</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                          <span>Trailer-mounted platforms</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                          <span>Spider booms (track-mounted with outriggers)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Mobile Machines - Type 3 */}
                <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <div className="bg-green-500/20 border-b border-green-500/30 px-4 py-3">
                    <p className="text-sm font-semibold text-green-300">
                      Type 3 &mdash; Mobile (Can Drive Elevated)
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-px bg-white/5">
                    <div className="bg-[#1a1a1a] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-green-500/30 text-green-300 text-xs font-bold">
                          3A
                        </span>
                        <span className="text-sm font-medium text-white">Mobile Vertical</span>
                      </div>
                      <p className="text-xs text-white/60 mb-2">
                        Group A + Mobile = Can drive elevated, vertical lift only
                      </p>
                      <ul className="text-xs text-white/70 space-y-1">
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                          <span>Self-propelled scissor lifts (most common type)</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                          <span>Can reposition whilst elevated (slowly)</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                          <span>Indoor electric models very common</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-[#1a1a1a] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-green-500/30 text-green-300 text-xs font-bold">
                          3B
                        </span>
                        <span className="text-sm font-medium text-white">Mobile Boom</span>
                      </div>
                      <p className="text-xs text-white/60 mb-2">
                        Group B + Mobile = Can drive elevated, boom extends beyond base
                      </p>
                      <ul className="text-xs text-white/70 space-y-1">
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                          <span>Self-propelled articulating booms</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                          <span>Self-propelled telescopic booms</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                          <span>Highest working heights (up to ~58m)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Special Categories */}
                <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-3">
                    <p className="text-sm font-semibold text-amber-300">Special Categories</p>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-px bg-white/5">
                    <div className="bg-[#1a1a1a] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 text-xs font-bold">
                          PAV
                        </span>
                      </div>
                      <p className="text-xs font-medium text-white mb-1">Push Around Vertical</p>
                      <p className="text-xs text-white/60">
                        Manually pushed, lightweight, low working heights (4&ndash;6m). No
                        self-propelled drive. Ideal for light indoor work.
                      </p>
                    </div>
                    <div className="bg-[#1a1a1a] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 text-xs font-bold">
                          IAD
                        </span>
                      </div>
                      <p className="text-xs font-medium text-white mb-1">Insulated Aerial Device</p>
                      <p className="text-xs text-white/60">
                        Specialist insulated boom for work near or on live electrical conductors.
                        Used by power distribution companies.
                      </p>
                    </div>
                    <div className="bg-[#1a1a1a] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 text-xs font-bold">
                          SPECIAL
                        </span>
                      </div>
                      <p className="text-xs font-medium text-white mb-1">Specialist Equipment</p>
                      <p className="text-xs text-white/60">
                        Airport de-icers, rail-mounted platforms, and other industry-specific MEWPs
                        not covered by standard categories.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">PAL Card Endorsements</p>
                <p className="text-sm text-white/80">
                  Your IPAF PAL Card will show which categories you are trained and authorised to
                  operate. Each category requires its own training. Holding a 3B endorsement does{' '}
                  <strong>not</strong> automatically cover 1B, 3A, or any other category. Always
                  check that your endorsements match the machine you intend to operate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Scissor Lifts (Group A) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Scissor Lifts (Group A)
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scissor lifts are the most commonly encountered Group A MEWP. They use a criss-cross
                &ldquo;X&rdquo; pantograph mechanism to raise the platform vertically. When the
                hydraulic cylinders extend, the linked arms push upward, elevating the platform
                directly above the chassis.
              </p>

              {/* Scissor Mechanism Diagram */}
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3 text-center">
                  Scissor Lift Mechanism
                </p>
                <div className="flex justify-center">
                  <div className="relative w-48 h-52">
                    {/* Platform */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-7 bg-blue-500/40 border-2 border-blue-400/70 rounded flex items-center justify-center">
                      <span className="text-[10px] text-blue-200 font-mono">WORK PLATFORM</span>
                    </div>
                    {/* Guardrails */}
                    <div
                      className="absolute top-0 left-[2px] w-px h-[-4px] border-l-2 border-blue-400/50"
                      style={{ height: '0px', marginTop: '-2px' }}
                    />
                    {/* X pattern - scissor arms */}
                    <div className="absolute top-7 left-1/2 -translate-x-1/2 w-36 h-28 flex items-center justify-center">
                      {/* First X */}
                      <div className="absolute w-full h-full">
                        <div
                          className="absolute top-0 left-0 w-full h-0.5 bg-blue-400/70 origin-top-left rotate-[28deg]"
                          style={{ width: '80%' }}
                        />
                        <div
                          className="absolute top-0 right-0 w-full h-0.5 bg-blue-400/70 origin-top-right rotate-[-28deg]"
                          style={{ width: '80%' }}
                        />
                      </div>
                      {/* Second X */}
                      <div className="absolute w-full h-full" style={{ top: '12px' }}>
                        <div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400/70 origin-bottom-left rotate-[-28deg]"
                          style={{ width: '80%' }}
                        />
                        <div
                          className="absolute bottom-0 right-0 w-full h-0.5 bg-blue-400/70 origin-bottom-right rotate-[28deg]"
                          style={{ width: '80%' }}
                        />
                      </div>
                      {/* Centre pivot */}
                      <div className="w-3 h-3 rounded-full bg-blue-400/50 border border-blue-400 z-10" />
                    </div>
                    {/* Hydraulic cylinder label */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[9px] text-blue-300/70 font-mono text-center">
                      hydraulic
                      <br />
                      cylinders
                    </div>
                    {/* Chassis */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-7 bg-blue-500/30 border border-blue-400/50 rounded flex items-center justify-center">
                      <span className="text-[10px] text-blue-300 font-mono">CHASSIS</span>
                    </div>
                    {/* Wheels */}
                    <div className="absolute -bottom-2 left-2 w-4 h-4 rounded-full border border-blue-400/40 bg-blue-500/20" />
                    <div className="absolute -bottom-2 right-2 w-4 h-4 rounded-full border border-blue-400/40 bg-blue-500/20" />
                  </div>
                </div>
                <p className="text-xs text-center text-blue-300/70 mt-3">
                  Linked &ldquo;X&rdquo; arms extend to raise the platform &mdash; vertical lift
                  only
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Characteristics</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                      Advantages
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Large platform area &mdash; multiple operatives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Higher load capacity than boom lifts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Stable &mdash; low centre of gravity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Available in electric, hybrid, and diesel</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                      Limitations
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>No horizontal outreach beyond the base</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Cannot reach over obstacles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Max working heights typically up to ~22m</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Must be positioned directly beneath the work</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Best For</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-white/80">
                  {[
                    'Indoor maintenance & fit-out',
                    'Ceiling and overhead work',
                    'Facade work (when directly below)',
                    'Electrical installation',
                    'Painting & decoration',
                    'Warehouse operations',
                  ].map((use, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow/60 flex-shrink-0" />
                      <span>{use}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Boom Lifts (Group B) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Boom Lifts (Group B)
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Boom lifts are Group B machines that use an extending arm (boom) to position the
                platform at height. Unlike scissor lifts, boom lifts can reach{' '}
                <strong>beyond the base footprint</strong>, giving them both vertical height and
                horizontal outreach. There are two main types.
              </p>

              {/* Telescopic vs Articulating Comparison */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Maximize2 className="h-5 w-5 text-cyan-400" />
                    <p className="text-sm font-medium text-cyan-400">Telescopic Boom</p>
                  </div>
                  {/* Simple diagram */}
                  <div className="flex justify-center mb-3">
                    <div className="relative w-40 h-28">
                      <div className="absolute bottom-0 left-0 w-16 h-5 bg-cyan-500/30 border border-cyan-400/50 rounded text-[8px] text-cyan-300 flex items-center justify-center font-mono">
                        BASE
                      </div>
                      <div className="absolute bottom-5 left-[32px] w-[120px] h-1.5 bg-cyan-400/60 origin-bottom-left rotate-[-35deg] rounded" />
                      <div className="absolute top-1 right-0 w-12 h-6 bg-cyan-500/40 border border-cyan-400/60 rounded text-[7px] text-cyan-200 flex items-center justify-center font-mono">
                        PLAT
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-cyan-300/70 text-center mb-3">
                    Straight extending arm
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Single straight extendable boom</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Maximum reach up to ~58 metres</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Best for maximum height and outreach</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Limited obstacle navigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>360&deg; slewing turret</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Articulating Boom (Cherry Picker)
                    </p>
                  </div>
                  {/* Simple diagram */}
                  <div className="flex justify-center mb-3">
                    <div className="relative w-40 h-28">
                      <div className="absolute bottom-0 left-0 w-16 h-5 bg-purple-500/30 border border-purple-400/50 rounded text-[8px] text-purple-300 flex items-center justify-center font-mono">
                        BASE
                      </div>
                      <div className="absolute bottom-5 left-[32px] w-[60px] h-1.5 bg-purple-400/60 origin-bottom-left rotate-[-60deg] rounded" />
                      <div className="absolute top-[22px] left-[60px] w-[60px] h-1.5 bg-purple-400/60 origin-top-left rotate-[10deg] rounded" />
                      <div className="absolute top-[16px] left-[60px] w-2 h-2 rounded-full bg-purple-400/70 border border-purple-300" />
                      <div className="absolute top-3 right-2 w-12 h-6 bg-purple-500/40 border border-purple-400/60 rounded text-[7px] text-purple-200 flex items-center justify-center font-mono">
                        PLAT
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-purple-300/70 text-center mb-3">
                    Jointed sections &mdash; up and over
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Multiple jointed (knuckle) sections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>&ldquo;Up-and-over&rdquo; capability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Navigates around obstacles (parapets, edges)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>360&deg; slewing with precise positioning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Working heights typically up to ~43m</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Spider Lifts */}
              <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">
                  Spider Lifts (Group B &mdash; typically Category 1B)
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white/80 mb-2">
                      Spider lifts are compact, track-mounted or wheeled boom lifts with broad
                      outrigger legs that spread outward like a spider. They are designed
                      specifically for <strong>restricted access sites</strong>.
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                        <span>Narrow enough to fit through standard doorways</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                        <span>Lightweight &mdash; suitable for delicate flooring</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                        <span>Track-mounted for uneven or soft ground</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
                        <span>Working heights up to ~52m on larger models</span>
                      </li>
                    </ul>
                  </div>
                  {/* Spider outrigger diagram */}
                  <div className="flex justify-center items-center">
                    <div className="relative w-32 h-32">
                      {/* Centre body */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-6 bg-teal-500/40 border border-teal-400/60 rounded text-[7px] text-teal-200 flex items-center justify-center font-mono">
                        BODY
                      </div>
                      {/* Outrigger legs */}
                      <div className="absolute top-1/2 left-1/2 w-14 h-0.5 bg-teal-400/50 -translate-y-1/2 origin-left rotate-[-40deg]" />
                      <div className="absolute top-1/2 left-1/2 w-14 h-0.5 bg-teal-400/50 -translate-y-1/2 origin-left rotate-[40deg]" />
                      <div className="absolute top-1/2 right-1/2 w-14 h-0.5 bg-teal-400/50 -translate-y-1/2 origin-right rotate-[40deg]" />
                      <div className="absolute top-1/2 right-1/2 w-14 h-0.5 bg-teal-400/50 -translate-y-1/2 origin-right rotate-[-40deg]" />
                      {/* Pads */}
                      <div className="absolute top-2 left-0 w-3 h-3 rounded-sm bg-teal-400/30 border border-teal-400/50" />
                      <div className="absolute bottom-2 left-0 w-3 h-3 rounded-sm bg-teal-400/30 border border-teal-400/50" />
                      <div className="absolute top-2 right-0 w-3 h-3 rounded-sm bg-teal-400/30 border border-teal-400/50" />
                      <div className="absolute bottom-2 right-0 w-3 h-3 rounded-sm bg-teal-400/30 border border-teal-400/50" />
                      {/* Label */}
                      <p className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-teal-300/60 font-mono whitespace-nowrap">
                        outrigger spread (top view)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Vehicle-Mounted & Trailer-Mounted */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Vehicle-Mounted & Trailer-Mounted Platforms
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                These are Group B machines classified as IPAF Category{' '}
                <strong>1B (Static Boom)</strong>. They cannot be driven with the platform elevated
                &mdash; they must be positioned, stabilised with outriggers, and only then can the
                boom be deployed.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Vehicle-Mounted (1B)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Mounted on vans, trucks, or lorries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Road-legal &mdash; drives between sites via public roads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Outriggers must be deployed before use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Working heights typically 12&ndash;45m</span>
                    </li>
                  </ul>
                  <p className="text-xs text-white/50 mt-3">
                    Best for: utility work, street lighting, telecoms, highway maintenance, tree
                    surgery
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowUpDown className="h-5 w-5 text-orange-400" />
                    <p className="text-sm font-medium text-orange-400">Trailer-Mounted (1B)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Towed to site behind a vehicle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Lightweight and portable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Outriggers required before boom deployment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Working heights typically 9&ndash;20m</span>
                    </li>
                  </ul>
                  <p className="text-xs text-white/50 mt-3">
                    Best for: occasional use, smaller contractors, property maintenance, gutter work
                  </p>
                </div>
              </div>

              {/* Outrigger Deployment Diagram */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-400 mb-3 text-center">
                  Outrigger Deployment Pattern (Top View)
                </p>
                <div className="flex justify-center mb-3">
                  <div className="relative w-56 h-44">
                    {/* Vehicle body */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-12 bg-amber-500/30 border-2 border-amber-400/60 rounded flex items-center justify-center">
                      <span className="text-[10px] text-amber-200 font-mono">VEHICLE</span>
                    </div>
                    {/* Outrigger arms */}
                    {/* Top-left */}
                    <div className="absolute top-[44px] left-[60px] w-[56px] h-0.5 bg-amber-400/50 origin-right rotate-[-40deg]" />
                    {/* Top-right */}
                    <div className="absolute top-[44px] right-[60px] w-[56px] h-0.5 bg-amber-400/50 origin-left rotate-[40deg]" />
                    {/* Bottom-left */}
                    <div className="absolute bottom-[44px] left-[60px] w-[56px] h-0.5 bg-amber-400/50 origin-right rotate-[40deg]" />
                    {/* Bottom-right */}
                    <div className="absolute bottom-[44px] right-[60px] w-[56px] h-0.5 bg-amber-400/50 origin-left rotate-[-40deg]" />
                    {/* Pads - corners */}
                    <div className="absolute top-2 left-2 w-6 h-6 rounded bg-amber-400/30 border-2 border-amber-400/60 flex items-center justify-center">
                      <span className="text-[7px] text-amber-300 font-mono">PAD</span>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 rounded bg-amber-400/30 border-2 border-amber-400/60 flex items-center justify-center">
                      <span className="text-[7px] text-amber-300 font-mono">PAD</span>
                    </div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 rounded bg-amber-400/30 border-2 border-amber-400/60 flex items-center justify-center">
                      <span className="text-[7px] text-amber-300 font-mono">PAD</span>
                    </div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded bg-amber-400/30 border-2 border-amber-400/60 flex items-center justify-center">
                      <span className="text-[7px] text-amber-300 font-mono">PAD</span>
                    </div>
                    {/* Ground level indicator */}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-amber-300/60 font-mono whitespace-nowrap">
                      all 4 pads must be on firm, level ground
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Safety Points</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>All outriggers</strong> must be fully deployed before operating the
                      boom &mdash; never operate on partial outriggers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Outrigger pads must rest on <strong>firm, level ground</strong> &mdash; use
                      spreader plates on soft surfaces
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Check for <strong>underground services</strong> (drains, cables, voids) before
                      placing pads
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The vehicle <strong>handbrake must be engaged</strong> and wheels chocked
                      before outrigger deployment
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Choosing the Right MEWP */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Choosing the Right MEWP for the Job
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Selecting the correct MEWP is a critical planning decision. Using the wrong type can
                result in the job being impossible to complete safely, wasted hire costs, or worse
                &mdash; an accident. Consider these factors systematically before ordering a
                machine.
              </p>

              {/* Decision factors grid */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Decision Factors</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      factor: 'Working height needed',
                      detail:
                        'Measure from ground to the highest point of work + 2m for standing reach',
                    },
                    {
                      factor: 'Horizontal outreach',
                      detail: 'If outreach is needed, you must use Group B (boom)',
                    },
                    {
                      factor: 'Platform capacity',
                      detail: 'Number of persons + weight of tools + weight of materials',
                    },
                    {
                      factor: 'Indoor vs outdoor',
                      detail:
                        'Indoor: electric/hybrid, zero emissions. Outdoor: diesel, rough terrain',
                    },
                    {
                      factor: 'Ground conditions',
                      detail:
                        'Hard/level = wheeled. Soft/uneven = tracked or outriggers with spreaders',
                    },
                    {
                      factor: 'Access restrictions',
                      detail: 'Doorway widths, gate sizes, ceiling heights, overhead cables',
                    },
                    {
                      factor: 'Noise & emissions',
                      detail:
                        'Hospitals, offices, food sites = electric only. Night work = low noise',
                    },
                    {
                      factor: 'Duration & frequency',
                      detail: 'Short task = trailer-mounted. Extended use = self-propelled',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-elec-yellow mb-1">{item.factor}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision Flowchart */}
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-4 text-center">
                  Quick Selection Flowchart
                </p>
                <div className="space-y-3">
                  {/* Step 1 */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center text-xs font-bold text-elec-yellow">
                      1
                    </div>
                    <div className="flex-1 bg-black/30 rounded-lg p-3">
                      <p className="text-sm text-white font-medium">
                        Do you need horizontal outreach?
                      </p>
                    </div>
                  </div>
                  {/* Branch */}
                  <div className="grid grid-cols-2 gap-3 ml-11">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2.5 text-center">
                      <p className="text-xs font-semibold text-blue-400 mb-1">NO &rarr; Group A</p>
                      <p className="text-[10px] text-white/60">Scissor lift or vertical mast</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2.5 text-center">
                      <p className="text-xs font-semibold text-green-400 mb-1">
                        YES &rarr; Group B
                      </p>
                      <p className="text-[10px] text-white/60">
                        Boom lift (telescopic or articulating)
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center text-xs font-bold text-elec-yellow">
                      2
                    </div>
                    <div className="flex-1 bg-black/30 rounded-lg p-3">
                      <p className="text-sm text-white font-medium">
                        Do you need to reposition whilst elevated?
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 ml-11">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2.5 text-center">
                      <p className="text-xs font-semibold text-blue-400 mb-1">
                        NO &rarr; Type 1 (Static)
                      </p>
                      <p className="text-[10px] text-white/60">
                        1A or 1B &mdash; position then elevate
                      </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2.5 text-center">
                      <p className="text-xs font-semibold text-green-400 mb-1">
                        YES &rarr; Type 3 (Mobile)
                      </p>
                      <p className="text-[10px] text-white/60">
                        3A or 3B &mdash; drive whilst elevated
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center text-xs font-bold text-elec-yellow">
                      3
                    </div>
                    <div className="flex-1 bg-black/30 rounded-lg p-3">
                      <p className="text-sm text-white font-medium">
                        Are there obstacles between the base and the work position?
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 ml-11">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-2.5 text-center">
                      <p className="text-xs font-semibold text-cyan-400 mb-1">
                        NO &rarr; Telescopic boom
                      </p>
                      <p className="text-[10px] text-white/60">Straight reach, max height</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-2.5 text-center">
                      <p className="text-xs font-semibold text-purple-400 mb-1">
                        YES &rarr; Articulating boom
                      </p>
                      <p className="text-[10px] text-white/60">Up-and-over capability</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center text-xs font-bold text-elec-yellow">
                      4
                    </div>
                    <div className="flex-1 bg-black/30 rounded-lg p-3">
                      <p className="text-sm text-white font-medium">
                        Is access restricted (narrow doorways, tight spaces)?
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 ml-11">
                    <div className="bg-white/5 border border-white/20 rounded-lg p-2.5 text-center">
                      <p className="text-xs font-semibold text-white/80 mb-1">
                        NO &rarr; Standard machine
                      </p>
                      <p className="text-[10px] text-white/60">Full-size scissor or boom</p>
                    </div>
                    <div className="bg-teal-500/10 border border-teal-500/30 rounded-lg p-2.5 text-center">
                      <p className="text-xs font-semibold text-teal-400 mb-1">
                        YES &rarr; Spider lift or PAV
                      </p>
                      <p className="text-[10px] text-white/60">Compact, fits through doors</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Common Mistakes</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Ordering a scissor lift when horizontal outreach is needed &mdash; the
                      platform cannot reach beyond the base
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Choosing a diesel machine for indoor work &mdash; exhaust fumes in enclosed
                      spaces are hazardous
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Not checking access routes &mdash; the MEWP arrives but cannot fit through the
                      gate or doorway
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Underestimating ground conditions &mdash; a wheeled boom sinking into soft
                      ground
                    </span>
                  </li>
                </ul>
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
            <Link to="../mewp-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-1-section-4">
              Next: Power Sources, Competence & the PAL Card
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
