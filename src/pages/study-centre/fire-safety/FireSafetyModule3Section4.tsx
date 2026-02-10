import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Battery,
  Clock,
  DoorOpen,
  Wrench,
  SignpostBig,
  Zap,
  Shield,
  ClipboardCheck,
  Eye,
  Cable,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'escape-route-lux',
    question: 'What is the minimum illumination on the centre line of an escape route?',
    options: [
      '0.5 lux',
      '1 lux',
      '2 lux',
      '5 lux',
    ],
    correctIndex: 1,
    explanation:
      'BS 5266 Part 1 requires a minimum of 1 lux on the centre line of an escape route. This level of illumination is sufficient to allow safe movement along the route even in total darkness. The measurement is taken at floor level along the centre line of the defined escape route. In addition, a minimum of 50% of the centre line width must achieve at least 0.5 lux to ensure adequate uniformity across the route.',
  },
  {
    id: 'sleeping-duration',
    question: 'What is the minimum emergency lighting duration for premises with sleeping accommodation?',
    options: [
      '1 hour',
      '2 hours',
      '3 hours',
      '4 hours',
    ],
    correctIndex: 2,
    explanation:
      'For premises with sleeping accommodation — such as hotels, care homes, hospitals, and hostels — emergency lighting must operate for a minimum of 3 hours. This extended duration accounts for the additional time required to wake, orientate, and evacuate persons who may be asleep when the emergency occurs. It also allows for the possibility that the normal mains supply may not be restored quickly, particularly during overnight incidents. For premises without sleeping risk, the minimum duration is 1 hour.',
  },
  {
    id: 'full-duration-test',
    question: 'How often must a full-duration test of emergency lighting be carried out?',
    options: [
      'Monthly',
      'Every 6 months',
      'Annually',
      'Every 2 years',
    ],
    correctIndex: 2,
    explanation:
      'A full-duration test of emergency lighting must be carried out annually in accordance with BS 5266 Part 1. During this test, the normal supply is disconnected and the emergency lighting system is left to operate on its batteries for the full rated duration (1 hour or 3 hours depending on the premises type). This verifies that the batteries can sustain the required illumination for the entire rated period. Monthly functional tests (brief flick tests) and 6-monthly interim tests are also required, but the full-duration test is the most comprehensive and is performed annually.',
  },
];

const faqs = [
  {
    question: 'What is the difference between maintained and non-maintained emergency lighting?',
    answer:
      'Non-maintained emergency luminaires only illuminate when the normal mains supply fails. They contain a lamp and battery that remain dormant during normal conditions and activate automatically upon mains failure. This is the most common type in non-domestic premises such as offices, warehouses, and retail units. Maintained emergency luminaires operate continuously — the lamp is lit at all times, whether or not the mains supply is present. When the mains supply fails, the luminaire continues to operate from its internal battery without any visible change to the occupant. Maintained luminaires are required in places of public entertainment (cinemas, theatres, concert halls), anywhere the emergency luminaire also serves as the normal room lighting, and in sleeping accommodation where lights may be dimmed but should never be completely off.',
  },
  {
    question: 'Do photoluminescent signs count as emergency lighting?',
    answer:
      'Photoluminescent signs are not a substitute for emergency lighting. They are passive wayfinding devices that absorb light energy from the ambient lighting and re-emit it as a visible glow when the surrounding light level drops. They are governed by BS 5499 Part 2 and are an excellent complement to emergency lighting because they continue to glow even if the emergency lighting fails. However, they cannot illuminate an escape route to the required lux levels, they cannot light open areas or high-risk task areas, and their brightness diminishes over time. Emergency lighting to BS 5266 Part 1 must still be provided. Photoluminescent signs are best used for low-level wayfinding — for example, strips along skirting boards, stair nosings, and door frames — to guide evacuees when smoke obscures higher-level illuminated signs.',
  },
  {
    question: 'Can emergency lighting be on the same circuit as normal lighting?',
    answer:
      'Self-contained emergency luminaires may be wired from the local normal lighting circuit because they detect mains failure at the luminaire itself and switch to battery operation automatically. However, they should not all be supplied from the same final circuit — BS 5266 Part 1 recommends that emergency luminaires are spread across at least two separate final circuits so that a single circuit failure does not disable all emergency lighting in an area. Central battery emergency lighting systems require dedicated fire-resistant cabling (to BS 8519 or BS 7629) that is completely separate from the normal lighting circuits. The central battery circuit must be protected against fire and must maintain circuit integrity for a defined period. Under BS 7671 (IET Wiring Regulations), Chapter 56 requires that safety circuits, including emergency lighting, are segregated from other circuits to prevent a fault in one system from affecting the other.',
  },
  {
    question: 'What are my responsibilities as an electrician installing emergency lighting?',
    answer:
      'As an electrician installing emergency lighting, you must ensure that the system is designed and installed in accordance with BS 5266 Part 1 and BS 7671. This includes selecting the correct type of system (self-contained or central battery), positioning luminaires at all required locations (exits, escape routes, changes of direction, stairways, safety equipment points, and open areas), achieving the required illumination levels (1 lux escape route, 0.5 lux open area, or 10% / 15 lux for high-risk tasks), ensuring correct duration (1 hour or 3 hours), using fire-resistant cabling for central battery systems, and providing proper segregation from normal lighting circuits. You must commission the system, verify illumination levels, issue the appropriate electrical installation certificate, and provide the building owner with a completion certificate, as-installed drawings, an emergency lighting log book, and clear instructions for testing and maintenance. You should also advise the responsible person of their ongoing obligations for monthly functional tests, 6-monthly interim tests, and annual full-duration tests.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which British Standard governs the design, installation, and maintenance of emergency lighting systems?',
    options: [
      'BS 5839 Part 1',
      'BS 5266 Part 1',
      'BS 7671',
      'BS 5499 Part 4',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266 Part 1 is the Code of Practice for the emergency lighting of premises. It covers the design, installation, wiring, commissioning, maintenance, and testing of emergency lighting systems. BS 5839 Part 1 covers fire detection and alarm systems. BS 7671 is the IET Wiring Regulations. BS 5499 Part 4 covers safety signs.',
  },
  {
    id: 2,
    question: 'What is the minimum illumination level required for open area (anti-panic) emergency lighting?',
    options: [
      '0.2 lux',
      '0.5 lux',
      '1 lux',
      '5 lux',
    ],
    correctAnswer: 1,
    explanation:
      'Open area or anti-panic emergency lighting requires a minimum of 0.5 lux at floor level. This level is designed to reduce the risk of panic in large open areas (such as halls with a floor area exceeding 60 m\u00B2) by providing enough illumination for occupants to identify their surroundings and locate escape routes. Escape route lighting requires 1 lux on the centre line, and high-risk task area lighting requires the greater of 10% of normal illumination or 15 lux.',
  },
  {
    id: 3,
    question: 'What is the minimum emergency lighting duration for premises without sleeping accommodation?',
    options: [
      '30 minutes',
      '1 hour',
      '2 hours',
      '3 hours',
    ],
    correctAnswer: 1,
    explanation:
      'For premises without sleeping accommodation, emergency lighting must provide a minimum duration of 1 hour. This allows sufficient time for evacuation and for the mains supply to be restored or alternative arrangements to be made. For premises with sleeping accommodation (hotels, care homes, hospitals), the minimum duration is 3 hours because occupants may be asleep and require more time to wake, orientate, and evacuate.',
  },
  {
    id: 4,
    question: 'Which type of emergency luminaire operates continuously regardless of mains supply status?',
    options: [
      'Non-maintained',
      'Maintained',
      'Sustained',
      'Standby',
    ],
    correctAnswer: 1,
    explanation:
      'A maintained emergency luminaire operates continuously — the lamp is lit at all times from the mains supply, and when the mains fails, it continues to operate from its internal battery. Non-maintained luminaires only illuminate when the mains supply fails. Maintained luminaires are required in places of entertainment, sleeping accommodation, and where the emergency luminaire also serves as the normal room lighting. A sustained luminaire contains two lamps — one for normal use and one for emergency use — and the emergency lamp activates only on mains failure.',
  },
  {
    id: 5,
    question: 'How often must a monthly functional test of emergency lighting be performed?',
    options: [
      'A brief test of each luminaire for its full rated duration',
      'A visual inspection only with no operational test',
      'A brief simulated mains failure to verify each luminaire illuminates and then is restored',
      'A test of the batteries only using a multimeter',
    ],
    correctAnswer: 2,
    explanation:
      'The monthly functional test involves briefly simulating a mains failure (by operating the test switch or isolating the supply) to verify that each emergency luminaire illuminates correctly and that the charging indicator restores when the mains is reconnected. This is a short test — not a full-duration test — and is designed to confirm that the system is operational. Any failures are recorded in the log book and repaired promptly. The full-duration test (1 or 3 hours) is performed annually.',
  },
  {
    id: 6,
    question: 'Which standard governs the green running man pictogram used on emergency exit signs?',
    options: [
      'BS 5266 Part 1',
      'BS 5839 Part 1',
      'BS 5499 Part 4 / BS ISO 7010',
      'BS 7671 Chapter 56',
    ],
    correctAnswer: 2,
    explanation:
      'Exit sign design — including the internationally recognised green running man pictogram and directional arrows — is governed by BS 5499 Part 4 (which is aligned with BS ISO 7010 for graphical symbols). These standards ensure that exit signs are universally understood regardless of language. BS 5266 Part 1 covers emergency lighting systems, BS 5839 Part 1 covers fire alarm systems, and BS 7671 Chapter 56 covers safety services wiring.',
  },
  {
    id: 7,
    question: 'What is a key advantage of a central battery emergency lighting system over self-contained luminaires?',
    options: [
      'It does not require any special wiring',
      'It is cheaper and simpler to install',
      'It provides centralised battery management, easier maintenance, and typically longer battery life',
      'It does not require fire-resistant cabling',
    ],
    correctAnswer: 2,
    explanation:
      'Central battery systems provide centralised battery management, making maintenance easier because all batteries are in one location. The batteries are typically industrial-grade and have a longer service life than the small NiCd or NiMH cells in self-contained luminaires. However, central battery systems require fire-resistant cabling (to BS 8519 or BS 7629) to maintain circuit integrity during a fire, and the installation is more complex and costly. Self-contained systems are simpler to install because each luminaire has its own battery and no special wiring is required.',
  },
  {
    id: 8,
    question: 'Under BS 7671, which chapter requires that emergency lighting circuits are segregated from other circuits?',
    options: [
      'Chapter 41',
      'Chapter 52',
      'Chapter 56',
      'Chapter 61',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Chapter 56 covers safety services, including emergency lighting. It requires that the wiring of safety circuits (such as emergency lighting and fire alarm circuits) is segregated from other circuits so that a fault in one system does not affect the safety system. For central battery emergency lighting, fire-resistant cabling must be used to ensure that the circuit remains operational during a fire for a defined period. Chapter 41 covers protection against electric shock, Chapter 52 covers selection and erection of wiring systems, and Chapter 61 covers initial verification.',
  },
];

export default function FireSafetyModule3Section4() {
  useSEO({
    title: 'Emergency Lighting | Fire Safety Module 3.4',
    description:
      'Emergency lighting systems, BS 5266 Part 1, maintained and non-maintained luminaires, self-contained and central battery systems, exit signs, testing requirements, and design considerations for electricians.',
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
            <Link to="../fire-safety-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Lightbulb className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Lighting
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Emergency lighting systems, BS 5266 Part 1, maintained and non-maintained luminaires,
            self-contained and central battery systems, exit signs, testing, and design considerations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Escape route:</strong> Minimum 1 lux on centre line
              </li>
              <li>
                <strong>Duration:</strong> 1 hour (standard) or 3 hours (sleeping risk)
              </li>
              <li>
                <strong>Testing:</strong> Monthly functional, annual full-duration
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">Key Standards</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>BS 5266 Part 1:</strong> Emergency lighting code of practice
              </li>
              <li>
                <strong>BS 5499 Part 4:</strong> Safety signs &amp; exit sign design
              </li>
              <li>
                <strong>BS 7671 Ch. 56:</strong> Safety services wiring
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Define emergency lighting and explain its purpose under UK fire safety legislation',
              'Describe the illumination and duration requirements of BS 5266 Part 1',
              'Explain the differences between maintained and non-maintained emergency luminaires',
              'Compare self-contained and central battery emergency lighting systems',
              'Identify all locations where emergency lighting is required',
              'Describe exit sign requirements under BS 5499 Part 4 and BS ISO 7010',
              'Explain the testing and maintenance regime for emergency lighting',
              'Apply BS 7671 Chapter 56 requirements to emergency lighting circuit design',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is Emergency Lighting? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            What Is Emergency Lighting?
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Emergency lighting is lighting that <strong>activates automatically when the normal
                mains supply fails</strong>. Its primary purpose is to ensure that building occupants
                can evacuate safely in the event of a power failure, whether caused by a fire, an
                electrical fault, or any other incident. Without emergency lighting, corridors, stairways,
                and exits would be plunged into total darkness, creating panic, disorientation, and a
                serious risk of injury.
              </p>

              <p>
                Emergency lighting serves several critical functions: it illuminates escape routes so that
                occupants can move safely towards the exits; it highlights exit doors and exit signs so
                that the means of escape is clearly identifiable; it illuminates the locations of safety
                equipment such as fire alarm call points, fire extinguishers, and first aid points; and
                it provides sufficient light in open areas to reduce panic and allow orderly movement
                towards escape routes.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Legal Framework</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">RRFSO Article 14:</strong> The Regulatory Reform
                      (Fire Safety) Order 2005, Article 14 requires the responsible person to ensure
                      that emergency routes and exits are provided with emergency lighting where necessary
                      to ensure the safety of relevant persons
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Building Regulations Part B:</strong> Approved
                      Document B (Fire Safety) requires emergency lighting in certain building types
                      and situations as part of the means of escape provisions. It references BS 5266
                      Part 1 as the appropriate standard for design and installation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">BS 5266 Part 1:</strong> The primary British
                      Standard for emergency lighting &mdash; Code of practice for the emergency
                      lighting of premises. It covers system design, illumination levels, duration,
                      type selection, installation, commissioning, testing, and maintenance
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-2">Emergency Escape Lighting</p>
                  <p className="text-sm text-white/80">
                    Lighting that provides illumination for the safe evacuation of people from a
                    building when the normal supply fails. This is the type most commonly referred
                    to as &ldquo;emergency lighting&rdquo; and includes escape route lighting, open
                    area lighting, and high-risk task area lighting. It is designed to ensure that
                    people can see well enough to leave the building safely.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Standby Lighting</p>
                  <p className="text-sm text-white/80">
                    Lighting that enables normal activities to continue substantially unchanged
                    during a mains failure. Standby lighting provides a higher illumination level
                    than emergency escape lighting and is used where it is not acceptable for
                    activities to cease &mdash; for example, in hospital operating theatres, control
                    rooms, or data centres. It is not a substitute for emergency escape lighting,
                    which must always be provided separately.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Key Distinction
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Emergency escape lighting and standby lighting serve different purposes. Emergency
                  escape lighting is solely for safe evacuation and must meet the minimum lux levels
                  specified in BS 5266 Part 1. Standby lighting maintains normal working conditions
                  during a power failure. A building may require both types, but standby lighting alone
                  does not satisfy the legal requirement for emergency escape lighting. The fire risk
                  assessment determines what level of emergency lighting is required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: BS 5266 Part 1: Code of Practice */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            BS 5266 Part 1: Code of Practice
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>BS 5266 Part 1</strong> is the governing British Standard for the emergency
                lighting of premises. It sets out the requirements for design, installation, wiring,
                commissioning, servicing, and testing of emergency lighting systems. Every emergency
                lighting installation in the UK should comply with this standard. The standard defines
                three categories of emergency escape lighting, each with its own illumination
                requirements.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Categories of Emergency Escape Lighting</p>
                <div className="grid gap-4">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DoorOpen className="h-5 w-5 text-rose-400" />
                      <p className="text-sm font-medium text-rose-400">Escape Route Lighting</p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Minimum <strong className="text-white">1 lux</strong> on the centre line of the escape route at floor level</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>50% of the centre line width must achieve at least 0.5 lux for adequate uniformity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Uniformity ratio (maximum to minimum) must not exceed 40:1</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Must be achieved within 5 seconds of mains failure (60 seconds for full output)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-5 w-5 text-rose-400" />
                      <p className="text-sm font-medium text-rose-400">Open Area / Anti-Panic Lighting</p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Minimum <strong className="text-white">0.5 lux</strong> at floor level throughout the area</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Required in open areas exceeding 60 m&sup2; floor area</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Reduces risk of panic by providing sufficient light to identify surroundings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Uniformity ratio must not exceed 40:1</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-rose-400" />
                      <p className="text-sm font-medium text-rose-400">High-Risk Task Area Lighting</p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Minimum <strong className="text-white">10% of normal illumination</strong> or <strong className="text-white">15 lux</strong>, whichever is greater</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Required where a sudden loss of light would create an immediate danger</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Examples: operating machinery, chemical handling, laboratory work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Uniformity ratio must not exceed 10:1 (stricter than escape route)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Duration Requirements</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">1 hour minimum:</strong> For escape routes in
                      premises without sleeping accommodation. This allows time for evacuation and for
                      the mains supply to be restored or alternative arrangements to be made
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">3 hours minimum:</strong> For premises with
                      sleeping accommodation (hotels, care homes, hospitals, hostels). The extended
                      duration accounts for the time needed to wake, orientate, and evacuate persons
                      who may be asleep
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Recharge time:</strong> After a full discharge,
                      batteries must fully recharge within 24 hours to restore the system to its
                      rated duration capacity
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Maintained vs Non-Maintained Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Maintained vs Non-Maintained Systems
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Emergency luminaires are classified by their mode of operation &mdash; specifically,
                whether they operate continuously or only when the mains supply fails. Understanding
                this distinction is essential because the type of luminaire required depends on the
                premises type, the level of risk, and the normal lighting conditions.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-3">Non-Maintained</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Only operates when the normal mains supply fails</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>The lamp remains off during normal conditions &mdash; the battery charges from the mains</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Most common type in non-domestic premises (offices, retail, warehouses)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Lower running cost as the lamp only operates during emergencies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Cannot be used where the luminaire also serves as normal room lighting</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-3">Maintained</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Operates continuously &mdash; the lamp is lit at all times from the mains</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>On mains failure, continues to operate from its internal battery seamlessly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Required in places of public entertainment (cinemas, theatres, concert halls)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Required where the emergency luminaire also serves as normal room lighting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Required in sleeping accommodation where lighting is dimmed but never fully off</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Sustained &amp; Combined Luminaires</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">Sustained</p>
                    <p className="text-xs text-white/80">
                      A luminaire containing two or more lamps, at least one of which is fed from
                      the emergency supply and the other(s) from the normal supply. In normal
                      conditions, both lamps may operate. On mains failure, only the emergency
                      lamp continues to operate from the battery. The emergency lamp may or may
                      not be illuminated in normal conditions.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">Combined</p>
                    <p className="text-xs text-white/80">
                      A luminaire containing two or more lamps where at least one lamp operates
                      from the normal supply and at least one lamp is capable of operating from
                      the emergency supply. The emergency lamp only illuminates when the normal
                      supply fails. This allows a single fitting to serve both normal lighting
                      and emergency lighting functions, reducing the total number of luminaires.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Choosing the Right Type:</strong> The fire risk
                  assessment determines whether maintained or non-maintained luminaires are required.
                  In most offices, warehouses, and retail premises, non-maintained luminaires are
                  sufficient because the normal lighting is always on when the premises are occupied.
                  Maintained luminaires are essential where the normal lighting may be dimmed or
                  switched off while people are present &mdash; such as in cinemas during a performance,
                  hotel corridors at night, or care home bedrooms. Where in doubt, the fire risk
                  assessment should be consulted, and the advice of a competent fire safety professional
                  sought.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Self-Contained vs Central Battery Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Self-Contained vs Central Battery Systems
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Emergency lighting systems are powered by batteries that provide the energy to
                illuminate the luminaires when the mains supply fails. There are two fundamental
                approaches to battery provision: <strong>self-contained</strong> systems where each
                luminaire has its own integral battery, and <strong>central battery</strong> systems
                where a single battery set supplies multiple luminaires via dedicated cabling.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Battery className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Self-Contained</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Each luminaire contains its own battery, charger, and control circuit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Simple installation &mdash; no special wiring required beyond normal mains</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Battery types: NiCd (nickel-cadmium), NiMH (nickel-metal hydride), or LiFePO4 (lithium iron phosphate)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Typical battery life: 4&ndash;6 years (environment dependent)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Battery replacement required at each individual luminaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Most cost-effective for small to medium installations</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Central Battery</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>A single battery set in a dedicated room feeds all emergency luminaires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Requires fire-resistant cabling (BS 8519 or BS 7629) to maintain circuit integrity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Industrial-grade batteries with longer service life (10&ndash;25 years)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Centralised battery management &mdash; easier monitoring and maintenance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Higher initial installation cost but lower long-term maintenance cost</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Preferred for large, complex, or high-rise buildings</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Generator-Fed Systems</p>
                <p className="text-sm text-white/80">
                  In some installations &mdash; particularly hospitals, data centres, and large
                  commercial buildings &mdash; a standby generator provides an extended power supply
                  that can feed emergency lighting (and other essential services) for many hours or
                  even days. Where a generator is used, battery backup is still required to provide
                  illumination during the <strong className="text-white">changeover period</strong> between
                  mains failure and generator start-up (typically 5&ndash;15 seconds). The battery
                  system bridges this gap to ensure there is no period of total darkness. Generator-fed
                  emergency lighting is common in healthcare settings where extended duration is
                  essential for patient safety.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Where Emergency Lighting Is Required */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Where Emergency Lighting Is Required
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BS 5266 Part 1 specifies a comprehensive list of locations where emergency lighting
                must be provided. The fundamental principle is that every part of the means of escape
                &mdash; from the point where a person begins their evacuation to the point where they
                reach a place of ultimate safety outside the building &mdash; must be adequately
                illuminated in the event of a mains failure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4">Mandatory Locations</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      location: 'At each exit door',
                      detail: 'Final exit doors and doors on escape routes must be clearly illuminated so that occupants can see and operate the door mechanism',
                    },
                    {
                      location: 'Along escape routes',
                      detail: 'Corridors, passageways, and other routes forming part of the means of escape must achieve minimum 1 lux on the centre line',
                    },
                    {
                      location: 'At changes of direction',
                      detail: 'Any point where the escape route changes direction \u2014 corners, junctions, and intersections \u2014 must be illuminated to prevent confusion',
                    },
                    {
                      location: 'At stairways',
                      detail: 'Every stairway on an escape route must be illuminated so that each tread is visible. Stairways present the greatest risk of injury during evacuation',
                    },
                    {
                      location: 'At changes of floor level',
                      detail: 'Ramps, steps, and level changes along escape routes must be highlighted to prevent trips and falls',
                    },
                    {
                      location: 'In windowless rooms',
                      detail: 'Any room or area that has no natural light and where people may be present requires emergency lighting to prevent total darkness',
                    },
                    {
                      location: 'At fire alarm call points',
                      detail: 'Manual call points must be illuminated so that they can be located and operated in the dark',
                    },
                    {
                      location: 'At firefighting equipment',
                      detail: 'Fire extinguisher positions, hose reels, and dry risers must be illuminated so that occupants or the fire service can locate them',
                    },
                    {
                      location: 'At exit signs',
                      detail: 'Exit and directional signs must be illuminated (internally or externally) to ensure they remain visible during a mains failure',
                    },
                    {
                      location: 'At first aid posts',
                      detail: 'First aid stations and equipment locations must be illuminated for use during an emergency',
                    },
                    {
                      location: 'At lifts',
                      detail: 'Lift lobbies and lift cars must have emergency lighting. Lift cars must have self-contained emergency lighting to assist trapped passengers',
                    },
                    {
                      location: 'In toilets exceeding 8 m\u00B2',
                      detail: 'Toilets, washrooms, and changing rooms with a floor area exceeding 8 m\u00B2 or without borrowed light require emergency lighting',
                    },
                    {
                      location: 'Generator & switchgear rooms',
                      detail: 'Rooms containing generator plant, main electrical switchgear, or fire safety system control equipment must have emergency lighting for access and operation',
                    },
                    {
                      location: 'Covered car parks',
                      detail: 'Enclosed or covered car parks where daylight does not penetrate require emergency lighting on pedestrian escape routes',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-rose-300 mb-1">{item.location}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    The Fire Risk Assessment Decides
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The list above represents the minimum locations specified in BS 5266 Part 1. The
                  fire risk assessment for the specific building may identify additional locations
                  where emergency lighting is required based on the particular risks, layout, and
                  occupancy of the premises. For example, areas with complex layouts, high-risk
                  activities, or vulnerable occupants may require emergency lighting beyond the
                  standard minimum. The fire risk assessment is the authoritative document that
                  determines the emergency lighting provision for any given premises.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Exit Signs & Wayfinding */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Exit Signs &amp; Wayfinding
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Exit signs are a critical element of the emergency lighting system. They provide
                visual guidance to building occupants, directing them towards the nearest exit and
                along the escape route. The design of exit signs is governed by{' '}
                <strong>BS 5499 Part 4</strong> (aligned with <strong>BS ISO 7010</strong>), which
                specifies the use of the internationally recognised <strong>green running man
                pictogram</strong>. This pictogram is understood regardless of language, making it
                effective for all building occupants including visitors and non-English speakers.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <SignpostBig className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Exit Sign Requirements</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Green running man:</strong> The standard pictogram
                      shows a white figure running towards a door on a green background. It must conform
                      to BS ISO 7010 reference E001 (exit left) or E002 (exit right)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Directional arrows:</strong> Where the exit is not
                      directly ahead, directional arrows must be used to indicate the direction of travel.
                      Arrows point in the direction the person must move &mdash; not towards the sign
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Viewing distance:</strong> The maximum viewing
                      distance depends on the sign height. For a standard 200 mm sign, the viewing
                      distance is approximately 24 m. Larger signs are required for longer distances
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Mounting height:</strong> Signs should be mounted
                      at a height where they are clearly visible above door frames and above head height.
                      Low-level signs (below 2 m) are also used in some premises for visibility in smoke
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-2">Internally Illuminated</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Light source inside the sign itself</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Visible from greater distances</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Typically maintained mode (always lit)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Externally Illuminated</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Lit by a separate emergency luminaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Minimum 5 lux on the sign face</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Simpler and lower cost</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Photoluminescent</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Absorbs and re-emits light energy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Governed by BS 5499 Part 2</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Complement to, not replacement for, emergency lighting</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Low-Level Wayfinding:</strong> In premises where
                  smoke logging is a significant risk, low-level wayfinding systems provide guidance
                  at or near floor level &mdash; below the smoke layer. These systems use
                  photoluminescent strips along skirting boards, stair nosings, and door frames, or
                  low-mounted electrically powered directional signs. Low-level systems are
                  particularly valuable in hotels, hospitals, and care homes where occupants may be
                  unfamiliar with the building and where smoke could quickly obscure high-level signs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Testing & Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">07</span>
            Testing &amp; Maintenance
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regular testing and maintenance is essential to ensure that the emergency lighting
                system will operate correctly when it is needed. BS 5266 Part 1 sets out a
                structured testing regime that must be followed throughout the life of the
                installation. All tests must be recorded in the <strong>emergency lighting log
                book</strong>, which forms part of the building&rsquo;s fire safety records.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Testing Schedule</p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      period: 'Monthly Functional Test',
                      detail: 'Simulate a mains failure briefly (by operating the test facility or isolating the supply) to verify that each luminaire illuminates correctly. Check the charging indicator restores when the mains is reconnected. Record any failures in the log book and arrange repair.',
                    },
                    {
                      period: '6-Monthly Interim Test',
                      detail: 'A more thorough test than the monthly check. Simulate mains failure for a minimum period (typically one-third of the rated duration) and check that all luminaires maintain adequate illumination. Inspect for damage, dirt on diffusers, and obstructions.',
                    },
                    {
                      period: 'Annual Full-Duration Test',
                      detail: 'Disconnect the normal supply and allow the emergency lighting to operate for its full rated duration (1 hour or 3 hours). At the end of the test, check that every luminaire is still illuminated. This is the most critical test as it verifies that the batteries can sustain the required illumination for the entire rated period.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{item.period}</p>
                        <p className="text-sm text-white/80">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Battery Replacement</p>
                  <p className="text-sm text-white/80">
                    Batteries in self-contained luminaires have a finite lifespan (typically 4&ndash;6
                    years for NiCd cells). When a luminaire fails the annual full-duration test, the
                    battery should be replaced. Some modern self-contained luminaires include an
                    automatic self-test function that simplifies the testing process and provides a
                    visible fault indication (LED) when the battery or lamp has failed. Battery
                    replacement must be recorded in the log book.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Log Book Requirements</p>
                  <p className="text-sm text-white/80">
                    Every test, inspection, fault, and repair must be recorded in the emergency
                    lighting log book. The log should include: date and time of each test, type of
                    test performed (monthly, 6-monthly, or annual), results for each luminaire, any
                    faults found, corrective actions taken, and the name of the person who carried
                    out the test. The log book must be available for inspection by the fire authority
                    and should be retained for at least 5 years.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Certificates</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Completion certificate:</strong> Issued by the
                      installing contractor on completion of a new emergency lighting installation,
                      confirming compliance with BS 5266 Part 1
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Periodic inspection certificate:</strong> Issued
                      following a periodic inspection and test of an existing system, detailing the
                      condition of the installation and any deficiencies found
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">As-installed drawings:</strong> Must show the
                      position of every emergency luminaire, its type, its rated duration, and the
                      circuit to which it is connected
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Design Considerations for Electricians */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">08</span>
            Design Considerations for Electricians
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                As an electrician, you play a critical role in the design, installation, and
                commissioning of emergency lighting systems. BS 7671 (the IET Wiring Regulations)
                contains specific requirements for safety services &mdash; including emergency
                lighting &mdash; in <strong>Chapter 56</strong>. Understanding these requirements
                ensures that your installations are safe, compliant, and will function correctly
                in an emergency.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Cable className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Circuit Design Principles</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Circuit separation:</strong> Emergency lighting
                      circuits must be segregated from normal lighting circuits. A fault on the normal
                      lighting circuit must not affect the emergency lighting system. This is a
                      fundamental requirement of BS 7671 Chapter 56
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Multiple final circuits:</strong> Self-contained
                      emergency luminaires should be distributed across at least two separate final
                      circuits. This ensures that a single circuit failure does not disable all
                      emergency lighting in an area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire-resistant cabling:</strong> Central battery
                      systems require fire-resistant cables (to BS 8519 or BS 7629) that maintain
                      circuit integrity during a fire for a minimum defined period. Standard PVC or
                      XLPE cables are not acceptable for central battery distribution circuits
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Charging arrangements:</strong> Self-contained
                      luminaires are typically connected to the local normal lighting circuit so that
                      they detect mains failure at the luminaire. The charging circuit must be
                      permanently live (unswitched) to ensure continuous battery charging
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire alarm integration:</strong> In some
                      installations, the emergency lighting system is triggered by the fire alarm
                      system rather than (or in addition to) mains failure. This ensures that
                      emergency lighting activates whenever the fire alarm sounds, even if the
                      mains supply has not failed
                    </span>
                  </li>
                </ul>
              </div>

              {/* Emergency Lighting Types & Requirements Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Emergency Lighting Types &amp; Requirements
                </p>
                <div className="flex flex-col items-center gap-3">
                  {/* Top level */}
                  <div className="bg-rose-500/20 border-2 border-rose-400/50 rounded-xl p-4 w-full max-w-sm text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Lightbulb className="h-5 w-5 text-rose-400" />
                      <p className="text-sm font-bold text-rose-400">Emergency Lighting</p>
                    </div>
                    <p className="text-[10px] sm:text-xs text-white/60">
                      BS 5266 Part 1 &bull; Activates on mains failure
                    </p>
                  </div>

                  {/* Arrows down */}
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-rose-400/40" />
                    <div className="text-rose-400/60 text-xs">Two system types</div>
                    <div className="w-0.5 h-4 bg-rose-400/40" />
                  </div>

                  {/* System types */}
                  <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                    <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-2 text-center">
                      <p className="text-[10px] sm:text-xs text-rose-400 font-medium">Self-Contained</p>
                      <p className="text-[9px] sm:text-[10px] text-white/50">Own battery per luminaire</p>
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-2 text-center">
                      <p className="text-[10px] sm:text-xs text-rose-400 font-medium">Central Battery</p>
                      <p className="text-[9px] sm:text-[10px] text-white/50">Single battery set + fire-rated cables</p>
                    </div>
                  </div>

                  {/* Arrows down */}
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-rose-400/40" />
                    <div className="text-rose-400/60 text-xs">Operating modes</div>
                    <div className="w-0.5 h-4 bg-rose-400/40" />
                  </div>

                  {/* Operating modes */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-lg">
                    {[
                      { label: 'Non-Maintained', sub: 'On only when mains fails' },
                      { label: 'Maintained', sub: 'Always on' },
                      { label: 'Sustained', sub: 'Two lamps, one emergency' },
                      { label: 'Combined', sub: 'Normal + emergency in one' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-white/5 border border-white/20 rounded-lg p-2 text-center"
                      >
                        <p className="text-[10px] sm:text-xs text-white/80 font-medium">{item.label}</p>
                        <p className="text-[9px] sm:text-[10px] text-white/50">{item.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Arrows down */}
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-rose-400/40" />
                    <div className="text-rose-400/60 text-xs">Illumination categories</div>
                    <div className="w-0.5 h-4 bg-rose-400/40" />
                  </div>

                  {/* Illumination categories */}
                  <div className="grid grid-cols-3 gap-2 w-full max-w-lg">
                    {[
                      { label: 'Escape Route', sub: '1 lux centre line' },
                      { label: 'Open Area', sub: '0.5 lux floor level' },
                      { label: 'High-Risk Task', sub: '10% or 15 lux min' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-2 text-center"
                      >
                        <p className="text-[10px] sm:text-xs text-rose-400 font-medium">{item.label}</p>
                        <p className="text-[9px] sm:text-[10px] text-white/50">{item.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Practical Installation Tips</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      Ensure the mains feed to self-contained luminaires is taken from the
                      <strong className="text-white"> permanent (unswitched) side</strong> of the
                      lighting circuit so that the battery charges regardless of the light switch
                      position
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      Label all emergency lighting circuits clearly at the distribution board to
                      prevent accidental isolation during maintenance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      Position luminaires to avoid glare that could dazzle evacuees and impair
                      their vision in a dark environment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      Consider the ambient temperature at the luminaire location &mdash; battery
                      performance degrades significantly in high temperatures (above 35&deg;C) and
                      low temperatures (below 0&deg;C)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      Issue the appropriate BS 7671 electrical installation certificate on
                      completion, and provide the client with the BS 5266 completion certificate,
                      as-installed drawings, operating instructions, and log book
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Common Installation Errors
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The most common errors found in emergency lighting installations include: connecting
                  self-contained luminaires to the switched side of the lighting circuit (so the
                  battery does not charge when the room light is switched off); failing to provide
                  emergency lighting in windowless toilets and plant rooms; using standard (non
                  fire-resistant) cabling for central battery distribution circuits; inadequate
                  illumination at changes of direction and stairways; failing to provide as-installed
                  drawings and a log book to the building owner; and neglecting to commission and
                  verify illumination levels after installation. These errors can compromise the
                  system and may be identified during a fire safety audit, potentially leading to
                  enforcement action by the fire authority.
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
            <Link to="../fire-safety-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fire Alarm Systems
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-4">
              Continue to Module 4
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
