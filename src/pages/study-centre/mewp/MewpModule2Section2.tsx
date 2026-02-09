import { ArrowLeft, AlertTriangle, CheckCircle, BookOpen, Zap, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question: 'What is the catapult effect in relation to MEWP operations?',
    options: [
      'The force created when a boom is extended too quickly',
      'A sudden machine movement from a pothole, collision or ground collapse that launches the occupant from the platform',
      'The recoil effect when a scissor lift is lowered rapidly',
      'The force experienced during normal boom slewing operations',
    ],
    correctAnswer: 1,
    explanation:
      'The catapult effect occurs when a sudden, unexpected movement at ground level — such as hitting a pothole, a vehicle collision, or ground collapse — is amplified along the length of the boom, launching the occupant out of the platform. This is why harnesses are mandatory on boom-type (Group B) MEWPs.',
  },
  {
    id: 2,
    question:
      'At what distance can high-voltage electricity arc or flash over to a MEWP without direct contact?',
    options: [
      'Up to 3 metres',
      'Up to 10 metres',
      'Up to 45 feet (approximately 14 metres)',
      'Only on direct contact',
    ],
    correctAnswer: 2,
    explanation:
      'High-voltage electricity can arc or flash over up to 45 feet (approximately 14 metres) without any direct physical contact. This means a MEWP does not need to touch a power line to cause a fatal electrocution — proximity alone is sufficient.',
  },
  {
    id: 3,
    question: 'According to 2024 IPAF data, what was the TOP cause of MEWP accidents?',
    options: [
      'Falls from the platform',
      'Electrocution',
      'Overturn / tip-over',
      'Entrapment / crushing',
    ],
    correctAnswer: 2,
    explanation:
      'Overturn (tip-over) was the leading cause of MEWP accidents in 2024. It is frequently fatal and is caused by unsuitable ground conditions, slopes, overloading, wind loading, and improper outrigger deployment.',
  },
  {
    id: 4,
    question: 'What percentage increase in entrapment reports was recorded between 2023 and 2024?',
    options: ['25% increase', '50% increase', '75% increase', '100% increase'],
    correctAnswer: 2,
    explanation:
      'There was a 75% increase in entrapment reports between 2023 and 2024, with a corresponding 62% increase in fatalities. Entrapment occurs when an operator is trapped between the platform guardrails and overhead structures such as beams, bridge undersides, or balconies.',
  },
  {
    id: 5,
    question:
      'What is the IPAF-recommended minimum safe distance from any overhead power line when operating a MEWP?',
    options: ['1 metre', '3 metres', '5 metres', '9 metres'],
    correctAnswer: 1,
    explanation:
      'The absolute minimum safe distance from any overhead line is 3 metres. For cables on wooden poles, the distance increases to 9 metres plus the fully extended boom length. For pylons, it is 15 metres plus the fully extended boom length. Always contact the electricity supplier before working near power lines.',
  },
  {
    id: 6,
    question: 'What is the primary purpose of a secondary guarding device (SGD) on a MEWP?',
    options: [
      'To prevent the boom from over-extending',
      'To detect and respond to entrapment situations by stopping or reversing machine movement',
      'To provide a backup steering system',
      'To monitor wind speed automatically',
    ],
    correctAnswer: 1,
    explanation:
      "Secondary guarding devices (SGDs) are designed to detect entrapment situations — where an operator is being crushed between the guardrails and an overhead structure — and automatically stop or reverse the machine's movement. They are a critical preventive measure against the rising number of entrapment incidents.",
  },
  {
    id: 7,
    question:
      'According to 2024 IPAF global data, how many fatalities were recorded and what was the trend?',
    options: [
      '50 fatalities — a 10% increase from 2023',
      '100 fatalities — a 26% decrease from 2023',
      '150 fatalities — roughly the same as 2023',
      '200 fatalities — a 15% increase from 2023',
    ],
    correctAnswer: 1,
    explanation:
      'IPAF recorded 100 fatalities globally in 2024, representing a 26% decrease from 2023. However, while overall fatalities decreased, entrapment fatalities rose sharply — a reminder that specific hazards require ongoing vigilance.',
  },
  {
    id: 8,
    question: 'Which MEWP group type accounts for the highest percentage of fall fatalities?',
    options: [
      'Group 1A — static vertical (scissor lifts)',
      'Group 1B — mobile vertical',
      'Group 3A — static boom',
      'Group 3B — mobile boom',
    ],
    correctAnswer: 3,
    explanation:
      'Group 3B (mobile boom) MEWPs account for 38% of fall fatalities — the highest of any group. This is primarily due to the catapult effect, where sudden ground-level movements are amplified along the boom length, launching occupants from the platform.',
  },
];

const quickCheckQuestions = [
  {
    id: 'electrocution-distance',
    question:
      'You are planning to use a boom MEWP near overhead power lines on wooden poles. What is the IPAF-recommended minimum safe distance you must maintain?',
    options: [
      '3 metres',
      '9 metres from the cables',
      '9 metres plus the fully extended boom length from the cables',
      '15 metres plus the fully extended boom length',
    ],
    correctIndex: 2,
    explanation:
      'For cables on wooden poles, the safe distance is 9 metres PLUS the fully extended boom length. This accounts for the fact that the boom could reach the cables even when the base of the MEWP appears to be far away. For pylons (high voltage), the distance increases to 15 metres plus boom length.',
  },
  {
    id: 'entrapment-prevention',
    question:
      'An operator is using a boom MEWP to work near an overhead steel beam. What is the MOST important measure to prevent entrapment?',
    options: [
      'Wearing a hard hat at all times',
      'Using a secondary guarding device (SGD) and maintaining awareness of overhead structures',
      'Working only during daylight hours',
      'Ensuring the harness lanyard is short enough',
    ],
    correctIndex: 1,
    explanation:
      'Secondary guarding devices (SGDs) detect entrapment situations and stop or reverse machine movement. Combined with constant awareness of overhead structures, use of spotters, and fine control movements near obstructions, SGDs are the primary defence against entrapment — the fastest-rising cause of MEWP fatalities.',
  },
  {
    id: 'accident-statistics',
    question:
      'According to 2024 IPAF data, which hazard type showed the most significant INCREASE in reported incidents?',
    options: [
      'Falls from the platform',
      'Electrocution',
      'Overturn / tip-over',
      'Entrapment / crushing',
    ],
    correctIndex: 3,
    explanation:
      'Entrapment showed the most significant increase — a 75% rise in reports and a 62% increase in fatalities between 2023 and 2024. In contrast, falls from the platform have been decreasing (39% reduction in fall fatalities in 2024). This shifting pattern means the industry must refocus its safety efforts.',
  },
];

const faqs = [
  {
    question: 'Do I always need to wear a harness when using a MEWP?',
    answer:
      'It depends on the MEWP type. On boom-type MEWPs (Group B — 1B and 3B), a harness with a short restraint lanyard is mandatory because of the catapult effect risk. On scissor lifts (Group A — 1A and 3A), a harness is not always required provided the guardrails are in good condition, the platform is secured, and the gate is closed — but always follow your site-specific risk assessment and employer policy. Some sites mandate harnesses on all MEWP types.',
  },
  {
    question: 'What should I do if my MEWP contacts an overhead power line?',
    answer:
      'Do NOT attempt to leave the platform — you could complete the circuit to earth and be electrocuted. Stay in the platform and warn others to keep clear of the machine. If possible, try to drive the MEWP away from the line. If you must evacuate (e.g., the machine is on fire), jump clear — do not step down — ensuring no part of your body touches the machine and the ground simultaneously. Land with both feet together and shuffle away using small steps.',
  },
  {
    question: 'How do I know if the ground is suitable for my MEWP?',
    answer:
      "Conduct a thorough ground assessment before positioning the MEWP. Check for firm, level ground with adequate bearing capacity. Look for hidden hazards such as underground services, voids, cellars, drains, and soft spots. Consider recent weather — rain can dramatically reduce ground bearing capacity. Use spreader pads under outriggers to distribute the load. If in doubt, consult the site manager and refer to the MEWP manufacturer's ground bearing requirements.",
  },
  {
    question: 'What is a secondary guarding device (SGD) and when should one be fitted?',
    answer:
      "A secondary guarding device is a system fitted to a MEWP that detects entrapment situations — where the operator is being crushed between the platform guardrails and an overhead obstruction — and automatically stops or reverses the machine's movement. SGDs should be considered for any work near overhead structures including beams, bridge undersides, ceilings, and building facades. Given the 75% increase in entrapment reports, SGDs are increasingly being mandated on sites with overhead obstruction risks.",
  },
];

const MewpModule2Section2 = () => {
  useSEO({
    title: 'The Six Key Hazards | MEWP Module 2 Section 2',
    description:
      'Falls, electrocution, overturn, entrapment, collision and machine failure — the six key MEWP hazards with causes, prevention and 2024 IPAF statistics.',
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <AlertTriangle className="h-10 w-10 text-red-400 mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 2
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">The Six Key Hazards</h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Every MEWP operator must understand these six hazards — they are the primary causes of
            serious injury and death in powered access work
          </p>
        </div>

        {/* Section 01: Falls from the Platform */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">01</span>
              Falls from the Platform
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Falls from the platform have historically been the most common cause of MEWP
                fatalities, although the trend is improving — IPAF data shows a{' '}
                <strong className="text-green-300">39% reduction</strong> in fall fatalities in
                2024. However, falls remain a critical hazard and must never be underestimated.
              </p>

              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-2">Fall Fatalities by MEWP Group</h3>
                <div className="grid grid-cols-3 gap-4 text-center mb-3">
                  <div>
                    <div className="text-2xl font-bold text-red-300">38%</div>
                    <div className="text-xs text-white/60">Group 3B</div>
                    <div className="text-xs text-white/40">Mobile boom</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-300">27%</div>
                    <div className="text-xs text-white/60">Group 1B</div>
                    <div className="text-xs text-white/40">Mobile vertical</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-amber-300">19%</div>
                    <div className="text-xs text-white/60">Group 3A</div>
                    <div className="text-xs text-white/40">Static boom</div>
                  </div>
                </div>
                <p className="text-white/60 text-xs text-center">
                  Group 3B (mobile boom) accounts for the highest proportion of fall fatalities —
                  primarily due to the catapult effect
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">Common Causes of Falls</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Leaning over or reaching beyond the guardrails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Platform not properly secured — allowing it to lift or shift</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Catapult effect</strong> on boom-type machines (see definition below)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Standing on guardrails or mid-rails to gain extra height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Platform gate left open or not properly latched</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Failure to wear a harness on boom-type MEWPs</span>
                  </li>
                </ul>
              </div>

              {/* Key Definition: Catapult Effect */}
              <div className="bg-red-500/10 border-2 border-red-500/40 p-4 sm:p-5 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <ShieldAlert className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-red-300 text-base">
                    Key Definition: The Catapult Effect
                  </h3>
                </div>
                <p className="text-white text-sm leading-relaxed mb-4">
                  The <strong>catapult effect</strong> occurs when a sudden, unexpected movement at
                  ground level is amplified along the length of a boom, launching the occupant from
                  the platform. The longer the boom, the greater the amplification. Even a small
                  movement at the base can produce violent forces at the platform.
                </p>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  <strong className="text-white">Causes:</strong> Driving into a pothole or kerb,
                  collision from another vehicle, ground collapse beneath an outrigger or wheel,
                  sudden tyre deflation, or contact with an overhead obstruction.
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong className="text-white">
                    This is why harnesses are mandatory on all boom-type MEWPs
                  </strong>{' '}
                  — the restraint lanyard keeps the operator within the platform when the catapult
                  effect occurs.
                </p>
              </div>

              {/* Catapult Effect Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                <h4 className="text-elec-yellow font-semibold text-sm mb-4 text-center">
                  Catapult Effect — Force Amplification
                </h4>
                <div className="relative max-w-md mx-auto">
                  {/* Ground line */}
                  <div className="border-b-2 border-dashed border-white/30 mb-2 relative h-48">
                    {/* Machine base */}
                    <div className="absolute bottom-0 left-4 sm:left-8">
                      <div className="w-16 h-8 bg-amber-500/30 border border-amber-500/50 rounded-sm flex items-center justify-center">
                        <span className="text-[10px] text-amber-300 font-bold">BASE</span>
                      </div>
                    </div>

                    {/* Boom arm - angled line */}
                    <div className="absolute bottom-8 left-12 sm:left-16 w-[200px] sm:w-[260px] h-[2px] bg-white/60 origin-bottom-left -rotate-[35deg]" />

                    {/* Platform at end of boom */}
                    <div className="absolute top-2 right-4 sm:right-8">
                      <div className="w-14 h-10 bg-blue-500/20 border-2 border-blue-400/50 rounded-sm flex items-center justify-center">
                        <span className="text-[10px] text-blue-300 font-bold">PLATFORM</span>
                      </div>
                    </div>

                    {/* Small force arrow at base */}
                    <div className="absolute bottom-10 left-0">
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-[2px] bg-amber-400" />
                        <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-amber-400" />
                      </div>
                      <span className="text-[9px] text-amber-300 block mt-0.5">Small force</span>
                    </div>

                    {/* Large force arrow at platform */}
                    <div className="absolute top-0 right-0 sm:right-2">
                      <div className="flex items-center gap-1">
                        <div className="w-10 h-[3px] bg-red-400" />
                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-red-400" />
                      </div>
                      <span className="text-[9px] text-red-300 block mt-0.5 font-bold">
                        LARGE force
                      </span>
                    </div>

                    {/* Pothole indicator */}
                    <div className="absolute bottom-[-6px] left-6 sm:left-10">
                      <div className="w-10 h-3 bg-red-500/20 border border-red-500/40 rounded-b-full" />
                      <span className="text-[8px] text-red-300 block text-center mt-0.5">
                        Pothole
                      </span>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-white/50 text-xs">Ground Level</p>
                  </div>

                  {/* Amplification label */}
                  <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                    <p className="text-red-300 text-xs sm:text-sm font-semibold">
                      A 50mm ground movement at the base can produce 1-2 metres of displacement at
                      the platform
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-medium mb-2">Prevention</h3>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Always wear a harness with a short restraint lanyard on boom-type MEWPs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Never lean over or climb on guardrails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Ensure the platform is secured and the gate is closed and latched</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Check ground conditions to reduce catapult effect risk</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Electrocution */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">02</span>
              Electrocution
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Electrocution from overhead power lines is one of the most lethal MEWP hazards.
                Critically,
                <strong className="text-amber-300"> direct contact is NOT required</strong> —
                high-voltage electricity can arc or flash over through the air across significant
                distances.
              </p>

              <div className="bg-red-500/10 border-2 border-red-500/40 p-4 sm:p-5 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Zap className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-amber-300 text-base">Critical Fact</h3>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  High-voltage electricity can jump up to{' '}
                  <strong className="text-red-300">45 feet (~14 metres)</strong> through the air
                  without any physical contact. A MEWP does not need to touch a power line to cause
                  a fatal electrocution — proximity alone is enough to kill.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">What Happens on Contact</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Occupants on the platform receive a potentially fatal electric shock
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      The entire machine becomes energised — touching any part can be fatal
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Anyone on the ground near the machine is also at risk from step potential
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Fires and explosions can result from electrical arcing</span>
                  </li>
                </ul>
              </div>

              {/* Safe Distance Zones Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                <h4 className="text-elec-yellow font-semibold text-sm mb-4 text-center">
                  IPAF Safe Distance Zones — Overhead Power Lines
                </h4>
                <div className="relative max-w-lg mx-auto space-y-3">
                  {/* Pylon / power line source */}
                  <div className="text-center mb-4">
                    <div className="inline-flex flex-col items-center">
                      <Zap className="h-6 w-6 text-amber-400 mb-1" />
                      <div className="w-4 h-16 bg-white/20 border border-white/30 rounded-sm" />
                      <div className="w-1 h-4 bg-white/40" />
                      <span className="text-[10px] text-white/60 mt-1">Power Source</span>
                    </div>
                  </div>

                  {/* Zone 1: Red - Pylons */}
                  <div className="border-2 border-red-500/60 bg-red-500/10 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
                          <h5 className="text-red-300 font-bold text-sm">
                            DANGER ZONE — Pylons (High Voltage)
                          </h5>
                        </div>
                        <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                          Minimum{' '}
                          <strong className="text-white">
                            15 metres + fully extended boom length
                          </strong>{' '}
                          from pylons. High-voltage lines on steel pylons carry the highest voltages
                          and the greatest arcing distance.
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold text-red-300">15m+</div>
                        <div className="text-[10px] text-white/50">+ boom</div>
                      </div>
                    </div>
                  </div>

                  {/* Zone 2: Amber - Wooden poles */}
                  <div className="border-2 border-amber-500/60 bg-amber-500/10 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0" />
                          <h5 className="text-amber-300 font-bold text-sm">
                            CAUTION ZONE — Cables on Wooden Poles
                          </h5>
                        </div>
                        <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                          Minimum{' '}
                          <strong className="text-white">
                            9 metres + fully extended boom length
                          </strong>{' '}
                          from cables on wooden poles. Lower voltage but still lethal — treat with
                          the same respect.
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold text-amber-300">9m+</div>
                        <div className="text-[10px] text-white/50">+ boom</div>
                      </div>
                    </div>
                  </div>

                  {/* Zone 3: Green - Minimum any line */}
                  <div className="border-2 border-green-500/60 bg-green-500/10 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
                          <h5 className="text-green-300 font-bold text-sm">
                            ABSOLUTE MINIMUM — Any Overhead Line
                          </h5>
                        </div>
                        <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                          <strong className="text-white">3 metres minimum</strong> from any overhead
                          line at all times. This is the closest any part of the MEWP or its load
                          should ever come to any power line.
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold text-green-300">3m</div>
                        <div className="text-[10px] text-white/50">absolute min</div>
                      </div>
                    </div>
                  </div>

                  {/* Key actions */}
                  <div className="bg-white/5 border border-elec-yellow/30 rounded-lg p-3 mt-4">
                    <p className="text-elec-yellow text-xs sm:text-sm font-semibold mb-2">
                      Before Working Near Power Lines:
                    </p>
                    <ul className="text-white/80 text-xs sm:text-sm space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-elec-yellow mt-0.5 flex-shrink-0" />
                        <span>Contact the electricity supplier BEFORE starting work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-elec-yellow mt-0.5 flex-shrink-0" />
                        <span>Use goal posts/barriers to define safe approach limits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-elec-yellow mt-0.5 flex-shrink-0" />
                        <span>Brief all operatives on exclusion zones</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Overturn / Tip-Over */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">03</span>
              Overturn / Tip-Over
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-red-500/10 border-2 border-red-500/40 p-4 sm:p-5 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-red-300 text-base">
                    TOP Cause of Accidents in 2024
                  </h3>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  Overturn was the <strong>leading cause of MEWP accidents</strong> in 2024
                  according to IPAF global data. When a MEWP overturns, the consequences are almost
                  always catastrophic — the accident is frequently fatal, particularly for boom-type
                  machines at height.
                </p>
              </div>

              <div className="bg-white/5 border border-orange-400/30 p-4 rounded-lg">
                <h3 className="text-orange-300 font-medium mb-3">Causes of Overturn</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong>Unsuitable ground conditions</strong> — soft, uncompacted, waterlogged
                      or uneven ground
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong>Slopes and gradients</strong> — exceeding the machine's rated slope
                      limit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong>Hidden ground hazards</strong> — voids, cellars, drains, underground
                      services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong>Collapsing ground</strong> — ground gives way under outrigger or wheel
                      loads
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong>Overloading</strong> — exceeding the safe working load (SWL) of the
                      platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong>Wind loading</strong> — operating in wind speeds above the machine's
                      rated limit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong>Outriggers not properly deployed</strong> — partially set, not on
                      pads, not on firm ground
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong>Contact with other vehicles</strong> — impact from site traffic or
                      plant
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-medium mb-2">Prevention</h3>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Conduct a thorough ground assessment before positioning the MEWP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Ensure correct outrigger setup — fully deployed, on spreader pads, firm ground
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Observe the machine's slope limits — never exceed the rated gradient
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Monitor wind conditions — cease operations above the rated wind speed
                      (typically 12.5 m/s)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Respect the SWL — never overload the platform with personnel, tools, or
                      materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Set up exclusion zones and traffic management to prevent vehicle impact
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Entrapment / Crushing */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">04</span>
              Entrapment / Crushing
            </h2>
            <div className="space-y-4 text-white">
              {/* Rising danger warning */}
              <div className="bg-red-500/15 border-2 border-red-500/50 p-4 sm:p-5 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5 animate-pulse" />
                  <h3 className="font-bold text-red-300 text-base">
                    RISING DANGER — Entrapment is Increasing Sharply
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center bg-red-500/10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-red-300">75%</div>
                    <div className="text-xs text-white/60">increase in reports</div>
                    <div className="text-[10px] text-white/40">2023 to 2024</div>
                  </div>
                  <div className="text-center bg-red-500/10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-red-300">62%</div>
                    <div className="text-xs text-white/60">increase in fatalities</div>
                    <div className="text-[10px] text-white/40">2023 to 2024</div>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  In 2023, there were 16 entrapment reports resulting in{' '}
                  <strong className="text-red-300">13 fatalities</strong> — an 81% fatality rate.
                  This makes entrapment one of the most lethal hazard types. Unlike other hazards
                  where the trend is improving, entrapment is getting{' '}
                  <strong className="text-red-300">significantly worse</strong>.
                </p>
              </div>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">How Entrapment Occurs</h3>
                <p className="text-white/80 text-sm mb-3">
                  Entrapment happens when an operator is trapped and crushed between the platform
                  guardrails and an overhead structure. The machine continues to move because the
                  operator — now pinned — is unable to release the controls.
                </p>
                <h4 className="text-white font-medium text-sm mb-2">
                  Common overhead obstructions:
                </h4>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Steel beams and structural members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Bridge undersides and soffits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Balconies and window ledges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Signs, brackets, and protruding fixtures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Tree branches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Doorways, canopies, and building overhangs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-medium mb-2">Prevention</h3>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Secondary guarding devices (SGDs)</strong> — detect entrapment and
                      stop/reverse movement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Spotters / banksmen</strong> — dedicated person watching for overhead
                      obstructions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Constant awareness</strong> — always look above before and during
                      movement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Fine control</strong> — use slow, precise movements near structures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Ground-level controls</strong> — ensure someone can override from
                      ground level in an emergency
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Collision */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">05</span>
              Collision
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Collision hazards work in two directions: other vehicles or plant hitting the MEWP,
                and the MEWP itself colliding with structures, vehicles, or pedestrians while
                travelling. Both scenarios can result in overturn, structural damage, or injury to
                the operator and bystanders.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                  <h3 className="text-blue-300 font-medium mb-2">Impact FROM Other Vehicles</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Passing road vehicles striking the MEWP base</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>
                        Site plant (forklifts, dumpers, telehandlers) colliding with the machine
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Delivery vehicles on site approaching too close</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                  <h3 className="text-blue-300 font-medium mb-2">MEWP Colliding with Others</h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>MEWP driven into structures while elevated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Platform striking parked vehicles or equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Pedestrians struck during MEWP travel</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-medium mb-2">Prevention</h3>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Exclusion zones</strong> — physical barriers around the MEWP work area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Traffic management</strong> — planned routes, speed limits, signage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Banksman</strong> — dedicated person guiding the MEWP and managing
                      traffic
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Hi-vis clothing and flashing beacons</strong> — maximum visibility for
                      the operator and machine
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Barriers and bollards</strong> — physical protection from road/site
                      traffic
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Machine Failure */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">06</span>
              Machine Failure
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Mechanical, hydraulic, or electrical failure can leave operators stranded at height
                or cause uncontrolled movement. While less common than other hazards, machine
                failure can be extremely dangerous — particularly if it occurs at maximum working
                height.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">Types of Failure</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-white font-medium text-sm">Hydraulic Failure</h4>
                    <ul className="text-white/80 space-y-1.5 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>Hose burst or leak — loss of lifting/lowering capability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>Cylinder seal failure — platform drift or uncontrolled descent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>Pump failure — complete loss of powered movement</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-medium text-sm">Electrical / Control Failure</h4>
                    <ul className="text-white/80 space-y-1.5 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>Battery depletion — machine becomes inoperable at height</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>Control joystick malfunction — erratic or no movement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>Sensor/limit switch failure — safety cut-outs may not activate</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-green-500/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-medium mb-2">Prevention</h3>
                <ul className="text-white space-y-1.5 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Pre-use inspections</strong> — visual and functional checks before
                      every shift
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Regular maintenance</strong> — manufacturer's service schedule
                      strictly followed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Thorough examinations</strong> — LOLER inspections at prescribed
                      intervals (typically 6-monthly)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Emergency lowering systems</strong> — know the location and operation
                      of the manual descent system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Rescue plan</strong> — always have a documented rescue plan before
                      working at height
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    If You Become Stranded at Height
                  </h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Stay calm and remain on the platform. Attempt the emergency lowering procedure
                  (usually a manual descent valve or hand pump). If this fails, contact the ground
                  crew to activate the ground-level override controls. Never attempt to climb down
                  from an elevated platform. The rescue plan should be activated and emergency
                  services called if necessary.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: IPAF Accident Statistics & Trends */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              IPAF Accident Statistics &amp; Trends (2024 Data)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Understanding the latest accident data helps you focus your safety efforts where
                they matter most. IPAF collects and publishes global accident data annually, and the
                2024 figures reveal important shifts in the types of hazards causing the most harm.
              </p>

              {/* Summary Statistics Box */}
              <div className="bg-white/5 border-2 border-elec-yellow/40 rounded-lg p-4 sm:p-5">
                <h3 className="text-elec-yellow font-bold text-base mb-4 text-center">
                  2024 IPAF Global Accident Summary
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="text-center bg-white/5 rounded-lg p-3">
                    <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">100</div>
                    <div className="text-xs text-white/60">fatalities globally</div>
                  </div>
                  <div className="text-center bg-green-500/10 rounded-lg p-3">
                    <div className="text-2xl sm:text-3xl font-bold text-green-300">26%</div>
                    <div className="text-xs text-white/60">decrease from 2023</div>
                  </div>
                  <div className="text-center bg-white/5 rounded-lg p-3">
                    <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">12</div>
                    <div className="text-xs text-white/60">countries reporting</div>
                  </div>
                  <div className="text-center bg-red-500/10 rounded-lg p-3">
                    <div className="text-2xl sm:text-3xl font-bold text-red-300">#1</div>
                    <div className="text-xs text-white/60">cause: overturn</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">Reports by Country</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">USA</span>
                      <span className="text-white/60">31%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-elec-yellow/70 h-2 rounded-full"
                        style={{ width: '31%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">United Kingdom</span>
                      <span className="text-white/60">12%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-elec-yellow/70 h-2 rounded-full"
                        style={{ width: '12%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">South Korea</span>
                      <span className="text-white/60">12%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-elec-yellow/70 h-2 rounded-full"
                        style={{ width: '12%' }}
                      />
                    </div>
                  </div>
                  <p className="text-white/40 text-xs mt-2">
                    + 9 additional countries reporting incidents
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">Incidents by Sector</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">Facilities Management</span>
                      <span className="text-white/60">27.0%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-blue-400/70 h-2 rounded-full" style={{ width: '27%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">Construction</span>
                      <span className="text-white/60">19.2%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-blue-400/70 h-2 rounded-full" style={{ width: '19.2%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">Electrical Work</span>
                      <span className="text-white/60">15.4%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-blue-400/70 h-2 rounded-full" style={{ width: '15.4%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <h3 className="text-green-300 font-medium mb-2">Improving Trends</h3>
                  <ul className="text-white space-y-1.5 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Overall fatalities down 26% year-on-year</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Fall fatalities reduced by 39%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Harness usage and training improving outcomes</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <h3 className="text-red-300 font-medium mb-2">Worsening Trends</h3>
                  <ul className="text-white space-y-1.5 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Entrapment reports up 75%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Entrapment fatalities up 62%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Overturn remains the top cause of death</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-elec-yellow">What the Data Tells Us</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  The overall decrease in fatalities is encouraging and shows that training,
                  improved equipment, and better safety practices are making a difference. However,
                  the sharp rise in entrapment incidents is a clear warning — the industry must
                  focus on secondary guarding devices, spotter use, and operator awareness of
                  overhead hazards. As an operator, you should treat entrapment prevention as a top
                  priority, especially when working near structures.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
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

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz title="The Six Key Hazards — Quiz" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Risk Assessment Process
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-2-section-3">
              Machine Selection &amp; Safe Systems of Work
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default MewpModule2Section2;
