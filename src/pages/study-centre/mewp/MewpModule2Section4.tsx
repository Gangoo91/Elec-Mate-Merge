import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Wind,
  Mountain,
  Droplets,
  Compass,
  Shield,
  Thermometer,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'outrigger-spreader-pads',
    question:
      "A boom-type MEWP is being set up on soft grass with outriggers. The operator places the outriggers but does not use spreader plates because the ground 'feels firm'. Is this acceptable?",
    options: [
      'Yes — if the ground feels firm, spreader plates are optional',
      'No — spreader plates MUST always be used with boom-type MEWPs on outriggers',
      'Yes — spreader plates are only required on concrete surfaces',
      'No — but only because it is grass, not because of the machine type',
    ],
    correctIndex: 1,
    explanation:
      'Spreader plates (pads) MUST always be used with boom-type MEWPs on outriggers, regardless of the ground condition. This is a non-negotiable requirement. The pads distribute the concentrated outrigger load over a wider area, preventing the outrigger from punching through the ground surface. On soft grass, additional foundations such as timber mats may also be required.',
  },
  {
    id: 'wind-speed-action',
    question:
      'You are working at 15 metres height in a boom lift. Your anemometer shows the wind speed has reached 30 mph (13.4 m/s). What should you do?',
    options: [
      'Continue working — the limit is 35 mph',
      'Move to a lower working height where wind is less',
      'Lower the platform IMMEDIATELY and cease all elevated operations',
      'Wait 10 minutes to see if the wind drops',
    ],
    correctIndex: 2,
    explanation:
      "The maximum design wind speed for outdoor-rated MEWPs is 12.5 m/s (28 mph). At 30 mph (13.4 m/s), you have exceeded this limit. You must lower the platform IMMEDIATELY and cease all elevated operations. Do not wait, do not try a lower height — the machine's stability calculations are based on the 12.5 m/s limit. Wind speed at 15m height may be significantly higher than at ground level.",
  },
  {
    id: 'seasonal-lightning',
    question:
      'You are working from a MEWP on an outdoor site when a colleague reports seeing lightning approximately 8 miles away. The sky above you is currently clear. What is the correct action?',
    options: [
      'Continue working — the lightning is 8 miles away and the sky is clear above',
      'Cease all elevated work immediately — lightning within 10 miles requires operations to stop',
      'Move to a lower working height as a precaution',
      'Continue but keep one person on the ground as a lookout',
    ],
    correctIndex: 1,
    explanation:
      'Lightning within 10 miles requires all elevated MEWP work to cease immediately. Lightning can strike well ahead of the storm front, and a MEWP elevated to working height acts as a significant conductor. The fact that the sky above you is clear does not mean you are safe — lightning can travel horizontally for miles. Lower the platform, vacate the machine, and move to a safe shelter.',
  },
];

const faqs = [
  {
    question: 'How do I check ground bearing capacity before setting up a MEWP?',
    answer:
      "Start with a visual inspection: look for signs of recent excavation, backfill, soft patches, standing water, or proximity to drainage runs. Check for sub-surface hazards using available site drawings (buried services, cellars, culverts). For outrigger-mounted machines, calculate the maximum outrigger load from the manufacturer's data and compare it with the ground bearing capacity. If in doubt, consult the site manager or a geotechnical engineer. On unknown ground, always use spreader pads and consider additional foundations such as timber mats or steel grillages.",
  },
  {
    question: 'What wind speed instrument should I use and where should I measure?',
    answer:
      'Use a hand-held anemometer (wind speed meter) to measure wind speed. Ideally, measure at the intended working height, but if this is not practical, measure at ground level and apply a height correction factor — wind speed at 20m can be 50% greater than at ground level. Digital anemometers that record gusts are preferred over average-only models. Check the wind speed before starting work, monitor it continuously during elevated operations, and re-check after any noticeable change in conditions.',
  },
  {
    question:
      "Can I operate a MEWP on a slope if the manufacturer's manual says the maximum gradient is 5 degrees?",
    answer:
      "You may only elevate the platform if the slope is within the machine's rated operating gradient AND the manufacturer explicitly permits elevation on that gradient. Most MEWPs are designed to be elevated only on firm, level ground — the 5-degree limit typically applies to travel only, not to elevated operations. Always check the specific guidance in the operator's manual. If the machine has outriggers, deploying them on a slope may bring the chassis within the permitted angle, but this must be confirmed with the manufacturer's data.",
  },
  {
    question: 'What additional precautions are needed when operating a MEWP near an excavation?',
    answer:
      'Maintain a safe distance from the excavation edge — as a general rule, the distance from the edge should be at least equal to the depth of the excavation. The ground near excavation edges is weakened and may not support the concentrated loads from MEWP wheels or outriggers. Use physical barriers to prevent the machine from approaching too close. Assess the ground bearing capacity, which will be reduced near the excavation. If the excavation is water-filled, be aware that the true edge may be concealed. A geotechnical assessment may be required for deep excavations.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is a hidden ground hazard that must be identified before setting up a MEWP?',
    options: [
      'A visible pothole in the tarmac',
      'A sub-surface cellar or basement beneath the setup area',
      'A parked vehicle blocking access',
      'Overhead power lines',
    ],
    correctAnswer: 1,
    explanation:
      'Sub-surface voids such as cellars, basements, culverts, tanks, and buried pipes are hidden hazards that cannot be seen from the surface. The concentrated load from MEWP outriggers or wheels can cause the ground above these voids to collapse. Site drawings and underground utility surveys should be consulted before positioning any MEWP.',
  },
  {
    id: 2,
    question: 'When using a boom-type MEWP with outriggers, when are spreader plates required?',
    options: [
      'Only on soft ground such as grass or mud',
      'Only when the outrigger load exceeds 5 tonnes',
      'ALWAYS — spreader plates must be used with boom-type MEWPs on outriggers',
      'Only when specified by the site manager',
    ],
    correctAnswer: 2,
    explanation:
      'Spreader plates (pads) MUST always be used with boom-type MEWPs on outriggers. This is a mandatory requirement regardless of the ground condition. The pads distribute the concentrated outrigger load over a larger area, reducing the ground bearing pressure. IPAF provides a Spreader Pad Calculator to help determine the correct pad size for the machine and ground conditions.',
  },
  {
    id: 3,
    question: 'What is the typical maximum chassis angle for operating most standard MEWPs?',
    options: ['1 degree or less', '5 degrees or less', '15 degrees or less', '20 degrees or less'],
    correctAnswer: 1,
    explanation:
      "Most standard MEWPs are designed to operate with a chassis angle of 5 degrees or less. This may increase to approximately 10 degrees for machines equipped with outriggers or stabilisers. Only specialist MEWPs designed for rough terrain or slope work may operate up to approximately 20 degrees. Always check the specific machine's rated gradient in the operator's manual.",
  },
  {
    id: 4,
    question: 'The maximum design wind speed for outdoor-rated MEWPs is:',
    options: ['8.0 m/s (18 mph)', '10.0 m/s (22 mph)', '12.5 m/s (28 mph)', '15.0 m/s (34 mph)'],
    correctAnswer: 2,
    explanation:
      'The maximum design wind speed for outdoor-rated MEWPs is 12.5 m/s (28 mph). If the wind speed exceeds this limit while the platform is elevated, the operator must lower the platform immediately and cease all elevated operations. Wind speed increases with height, so ground-level measurements may underestimate the wind at the working position.',
  },
  {
    id: 5,
    question: 'When travelling a MEWP on a slope, which end should face uphill?',
    options: [
      'The lighter end, to improve steering',
      'The heavy end, to maintain stability',
      'Either end — it makes no difference',
      'The end with the platform, to protect the operator',
    ],
    correctAnswer: 1,
    explanation:
      "When travelling on slopes, always travel with the heavy end facing uphill. This maintains the machine's centre of gravity over the base and reduces the risk of tipping. The heavy end is typically the end with the engine and counterweight. The operator's manual will specify the maximum travel gradient and the correct orientation for slope travel.",
  },
  {
    id: 6,
    question:
      'Why should you NOT increase the platform surface area by attaching sheeting, boards, or signs?',
    options: [
      'It adds too much weight to the platform',
      "It increases the wind loading area, which can exceed the machine's design limits",
      "It obscures the operator's view",
      'It is not permitted by the Highway Code',
    ],
    correctAnswer: 1,
    explanation:
      "Attaching sheeting, boards, signs, or any other material that increases the platform surface area dramatically increases the wind loading on the machine. The MEWP's stability calculations are based on the standard platform area. Increasing this area can cause the wind force to exceed the machine's design limits, leading to overturning. Even a small increase in area can have a significant effect at height where wind speeds are higher.",
  },
  {
    id: 7,
    question:
      'What is the general rule for safe distance from an excavation edge when positioning a MEWP?',
    options: [
      'At least 1 metre from the edge in all cases',
      'Distance from the edge should equal the depth of the excavation',
      'At least 3 metres from the edge in all cases',
      'There is no specific rule — use your judgement',
    ],
    correctAnswer: 1,
    explanation:
      'The general rule is that the safe distance from an excavation edge should be at least equal to the depth of the excavation. For example, if the excavation is 2 metres deep, the MEWP should be positioned at least 2 metres from the edge. Ground near excavation edges is weakened and may not support concentrated loads. A geotechnical assessment may be required for deep excavations or poor ground conditions.',
  },
  {
    id: 8,
    question:
      'After a period of heavy rain overnight, you arrive on site to use a MEWP. Which of the following should you check FIRST?',
    options: [
      'Whether the battery is fully charged',
      'Whether the paint on the machine has been damaged',
      'Ground conditions — rain may have softened the ground and reduced bearing capacity',
      'Whether the hire company has sent the correct machine',
    ],
    correctAnswer: 2,
    explanation:
      'After heavy rain, the ground conditions should be reassessed before setting up or operating the MEWP. Rain softens the ground, reduces bearing capacity, and can conceal hazards such as holes or excavations under standing water. What was firm ground yesterday may now be too soft to support the concentrated loads from outriggers or wheels. Spreader pads and additional foundations may now be required even if they were not needed before the rain.',
  },
];

const MewpModule2Section4 = () => {
  useSEO({
    title: 'Ground Conditions, Slopes & Weather Limits | MEWP Module 2 Section 4',
    description:
      'Learn how to assess ground conditions, slope limits, outrigger setup, wind speed restrictions, and seasonal considerations for safe MEWP operations.',
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
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
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 mb-4">
            <Mountain className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-block bg-elec-yellow/10 border border-elec-yellow/20 px-3 py-1 rounded-full text-sm font-semibold mb-4 ml-0">
            <span className="text-elec-yellow">MODULE 2</span>
            <span className="text-white/40 mx-2">&middot;</span>
            <span className="text-white/60">SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ground Conditions, Slopes & Weather Limits
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Assessing the ground beneath and the environment around your MEWP — the factors that
            determine whether it is safe to operate
          </p>
        </div>

        {/* Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg p-4 bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Ground:</strong> must be firm, level, and capable
                  of bearing the machine load
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Outriggers:</strong> ALL deployed, spreader pads
                  ALWAYS on boom-type MEWPs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Slopes:</strong> max 5 degrees for most machines,
                  10 degrees with outriggers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Wind:</strong> max 12.5 m/s (28 mph) — lower
                  immediately if exceeded
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-elec-yellow/90 mb-2">On Site</p>
            <ul className="text-white/80 text-base space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Assess:</strong> ground bearing, hidden voids,
                  excavations, water
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Measure:</strong> slope with inclinometer, wind
                  with anemometer
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">Monitor:</strong> conditions continuously — they
                  change throughout the day
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                <span>
                  <strong className="text-white">React:</strong> lower immediately if limits are
                  exceeded
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white/70 mb-4">By the end of this section, you will be able to:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Assess ground conditions and identify hidden hazards before setting up a MEWP',
              'Explain the requirements for outrigger deployment and spreader pad use',
              'State the slope and gradient limits for MEWP operation and travel',
              'Describe the wind speed limits and actions required when they are exceeded',
              'Identify the risks of working near excavations and water',
              'Apply seasonal and environmental considerations to MEWP operations',
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Ground Conditions Assessment */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Ground Conditions Assessment
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                The ground beneath a MEWP must support the full weight of the machine, its
                occupants, and the dynamic forces generated during operation. Unlike a person
                standing on the ground, a MEWP concentrates enormous loads through its wheels and
                outriggers — loads that can easily exceed what the ground can bear if conditions are
                poor.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">
                  Key Ground Assessment Factors
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="text-center">
                    <p className="text-elec-yellow text-lg font-bold mb-1">Firm & Level?</p>
                    <p className="text-white/60">
                      Is the ground solid enough to support concentrated loads without sinking or
                      shifting?
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-elec-yellow text-lg font-bold mb-1">Bearing Capacity</p>
                    <p className="text-white/60">
                      Can the ground support the machine weight and outrigger point loads?
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Hidden Hazards — Sub-Surface Dangers
                  </h3>
                </div>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Sub-surface voids:</strong> cellars, basements,
                      culverts, tanks, and buried pipes can collapse under concentrated loads
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Drop-offs, holes, and excavations:</strong>{' '}
                      including those concealed by water, ice, or mud
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Recently backfilled ground:</strong> not yet
                      compacted and will not support concentrated loads
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Proximity to excavation edges:</strong> ground
                      near edges is weakened and can collapse
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Weather effects:</strong> rain softens ground,
                      frost heave creates instability, ice conceals hazards
                    </div>
                  </li>
                </ul>
              </div>

              {/* Ground Assessment Checklist Info Box */}
              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">Ground Assessment Checklist</h3>
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex items-start gap-2">
                    <span className="text-elec-yellow font-mono text-xs mt-0.5">&#9744;</span>
                    <span>
                      Visual inspection — look for soft patches, standing water, cracks, settlement
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-elec-yellow font-mono text-xs mt-0.5">&#9744;</span>
                    <span>
                      Check site drawings for buried services, cellars, culverts, and voids
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-elec-yellow font-mono text-xs mt-0.5">&#9744;</span>
                    <span>Probe for recently backfilled or disturbed ground</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-elec-yellow font-mono text-xs mt-0.5">&#9744;</span>
                    <span>Assess proximity to excavation edges — maintain safe distance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-elec-yellow font-mono text-xs mt-0.5">&#9744;</span>
                    <span>Calculate outrigger point loads vs ground bearing capacity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-elec-yellow font-mono text-xs mt-0.5">&#9744;</span>
                    <span>Consider weather effects — has recent rain softened the ground?</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-elec-yellow font-mono text-xs mt-0.5">&#9744;</span>
                    <span>
                      Determine if spreader pads, timber mats, or additional foundations are
                      required
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-elec-yellow font-mono text-xs mt-0.5">&#9744;</span>
                    <span>Confirm ground is level — measure slope with inclinometer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Outrigger and Stabiliser Setup */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              Outrigger and Stabiliser Setup
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Outriggers and stabilisers extend the effective base of the MEWP, dramatically
                improving stability. Their correct deployment is critical to preventing overturning
                — the most common cause of fatal MEWP incidents.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Mandatory Requirements</h3>
                </div>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        ALL outriggers must be fully deployed and secured
                      </strong>{' '}
                      — never operate with partial outrigger deployment
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Spreader plates/pads MUST always be used
                      </strong>{' '}
                      with boom-type MEWPs on outriggers — no exceptions
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">All other MEWPs with outriggers</strong>{' '}
                      require pads unless a specific risk assessment says otherwise
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Pads must be appropriately sized</strong> for
                      the ground conditions — larger pads on softer ground
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        All outriggers must have hydraulic holding valves or mechanical locks
                      </strong>{' '}
                      to prevent accidental retraction
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-2">Poor Ground Solutions</h3>
                <p className="text-white/70 text-sm mb-3">
                  When ground conditions are poor, additional foundations may be required beneath
                  the spreader pads:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Timber Mats</p>
                    <p className="text-white/60">
                      Heavy-duty timber platforms that distribute load over a very large area.
                      Suitable for soft ground, grass, and gravel.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Proprietary Mats</p>
                    <p className="text-white/60">
                      Engineered plastic or composite mats with known load ratings. Lightweight and
                      reusable.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Steel Grillages</p>
                    <p className="text-white/60">
                      Steel beam arrangements for very heavy machines on poor ground. Engineered for
                      the specific load.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-white font-medium">Concrete Pads</p>
                    <p className="text-white/60">
                      Pre-cast or in-situ concrete foundations for permanent or long-term MEWP
                      positions.
                    </p>
                  </div>
                </div>
                <p className="text-white/50 text-xs mt-3 italic">
                  IPAF provides a Spreader Pad Calculator to help determine the correct pad size for
                  your machine and ground conditions.
                </p>
              </div>

              {/* Outrigger Layout Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-4 text-center">
                  Outrigger Layout — Plan View
                </h3>
                <div className="relative w-full max-w-xs mx-auto aspect-square">
                  {/* Machine body (centre) */}
                  <div className="absolute inset-[25%] bg-purple-500/20 border-2 border-purple-400/60 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-purple-300 text-xs font-semibold">MEWP</p>
                      <p className="text-purple-300/60 text-[10px]">chassis</p>
                    </div>
                  </div>

                  {/* Outrigger arms */}
                  <div className="absolute top-[15%] left-[25%] right-[25%] h-[1px] bg-white/30" />
                  <div className="absolute bottom-[15%] left-[25%] right-[25%] h-[1px] bg-white/30" />
                  <div className="absolute left-[15%] top-[25%] bottom-[25%] w-[1px] bg-white/30" />
                  <div className="absolute right-[15%] top-[25%] bottom-[25%] w-[1px] bg-white/30" />

                  {/* Diagonal lines to corners */}
                  <div className="absolute top-[25%] left-[25%] w-[1px] h-[10%] bg-white/20 origin-top -rotate-45 scale-x-[1.41]" />

                  {/* Top-left pad */}
                  <div className="absolute top-[4%] left-[4%] w-[18%] h-[18%] bg-elec-yellow/15 border-2 border-elec-yellow/50 rounded flex items-center justify-center">
                    <span className="text-elec-yellow text-[9px] font-bold">PAD</span>
                  </div>
                  {/* Top-right pad */}
                  <div className="absolute top-[4%] right-[4%] w-[18%] h-[18%] bg-elec-yellow/15 border-2 border-elec-yellow/50 rounded flex items-center justify-center">
                    <span className="text-elec-yellow text-[9px] font-bold">PAD</span>
                  </div>
                  {/* Bottom-left pad */}
                  <div className="absolute bottom-[4%] left-[4%] w-[18%] h-[18%] bg-elec-yellow/15 border-2 border-elec-yellow/50 rounded flex items-center justify-center">
                    <span className="text-elec-yellow text-[9px] font-bold">PAD</span>
                  </div>
                  {/* Bottom-right pad */}
                  <div className="absolute bottom-[4%] right-[4%] w-[18%] h-[18%] bg-elec-yellow/15 border-2 border-elec-yellow/50 rounded flex items-center justify-center">
                    <span className="text-elec-yellow text-[9px] font-bold">PAD</span>
                  </div>

                  {/* Outrigger dots at midpoints */}
                  <div className="absolute top-[12%] left-[12%] w-3 h-3 bg-purple-400 rounded-full border border-purple-300" />
                  <div className="absolute top-[12%] right-[12%] w-3 h-3 bg-purple-400 rounded-full border border-purple-300" />
                  <div className="absolute bottom-[12%] left-[12%] w-3 h-3 bg-purple-400 rounded-full border border-purple-300" />
                  <div className="absolute bottom-[12%] right-[12%] w-3 h-3 bg-purple-400 rounded-full border border-purple-300" />
                </div>
                <div className="flex justify-center gap-6 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full" />
                    <span className="text-white/60">Outrigger foot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-elec-yellow/15 border border-elec-yellow/50 rounded" />
                    <span className="text-white/60">Spreader pad</span>
                  </div>
                </div>
                <p className="text-white/40 text-xs text-center mt-2">
                  All four outriggers fully deployed with spreader pads on firm, level ground
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Slope and Gradient Limits */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">03</span>
              Slope and Gradient Limits
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                MEWPs are designed to operate on surfaces within specific gradient limits. Exceeding
                these limits shifts the machine's centre of gravity outside the tipping line, with
                potentially fatal consequences. Even small slopes that appear insignificant can
                exceed the machine's rated limits.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">Operating Gradient Limits</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 rounded p-3 flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">Standard MEWPs (no outriggers)</p>
                      <p className="text-white/60">Most scissor lifts and self-propelled booms</p>
                    </div>
                    <p className="text-teal-300 font-bold text-lg">5&deg;</p>
                  </div>
                  <div className="bg-white/5 rounded p-3 flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">MEWPs with outriggers/stabilisers</p>
                      <p className="text-white/60">Boom lifts and truck-mounted platforms</p>
                    </div>
                    <p className="text-teal-300 font-bold text-lg">~10&deg;</p>
                  </div>
                  <div className="bg-white/5 rounded p-3 flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">Specialist slope MEWPs</p>
                      <p className="text-white/60">
                        Specifically designed for rough terrain and slopes
                      </p>
                    </div>
                    <p className="text-teal-300 font-bold text-lg">~20&deg;</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Key Rules for Slopes</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Elevate ONLY on firm, level ground</strong>{' '}
                      unless the machine is specifically designed for slope operations
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Use a digital inclinometer</strong> to measure
                      the actual slope angle — do not estimate by eye
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        Modern boom lifts have function cutouts
                      </strong>{' '}
                      that automatically disable operation if slope limits are exceeded
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">When travelling on slopes:</strong> always
                      travel with the heavy end facing uphill to maintain stability
                    </div>
                  </li>
                </ul>
              </div>

              {/* Slope Angle Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-4 text-center">
                  Slope Angle Reference
                </h3>
                <div className="w-full max-w-md mx-auto space-y-4">
                  {/* 5 degree slope */}
                  <div className="relative h-16">
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/20" />
                    <div
                      className="absolute bottom-0 left-0 w-[85%] h-[1px] bg-green-400/70 origin-bottom-left"
                      style={{ transform: 'rotate(-5deg)' }}
                    />
                    <div className="absolute bottom-0 left-[85%] flex items-end">
                      <div className="bg-green-500/20 border border-green-400/50 rounded px-2 py-1 mb-2">
                        <span className="text-green-300 text-xs font-bold">
                          5&deg; — Standard limit
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-1 left-2">
                      <Compass className="h-4 w-4 text-green-400/60" />
                    </div>
                  </div>
                  {/* 10 degree slope */}
                  <div className="relative h-20">
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/20" />
                    <div
                      className="absolute bottom-0 left-0 w-[75%] h-[1px] bg-amber-400/70 origin-bottom-left"
                      style={{ transform: 'rotate(-10deg)' }}
                    />
                    <div className="absolute bottom-0 left-[75%] flex items-end">
                      <div className="bg-amber-500/20 border border-amber-400/50 rounded px-2 py-1 mb-4">
                        <span className="text-amber-300 text-xs font-bold">
                          10&deg; — With outriggers
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Warning zone */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <span className="text-red-300 text-sm font-semibold">
                        Above these limits: DO NOT elevate the platform
                      </span>
                    </div>
                    <p className="text-white/50 text-xs mt-1">
                      Function cutouts on modern machines will prevent operation — never override
                      safety systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Wind Speed and Weather */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">04</span>
              Wind Speed and Weather
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Wind is the single most dangerous environmental factor for MEWP operations. The
                large surface area of the platform and boom acts as a sail, and wind forces increase
                dramatically with height. A MEWP that feels stable at ground level can become
                dangerously unstable when elevated in moderate winds.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Wind className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Wind Speed Limits</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                    <p className="text-red-300 font-medium">
                      Maximum Design Wind Speed: 12.5 m/s (28 mph)
                    </p>
                    <p className="text-white/60">
                      This is the absolute limit for outdoor-rated MEWPs. It is the speed at which
                      the machine's stability has been tested and verified.
                    </p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                    <p className="text-amber-300 font-medium">
                      If wind exceeds 28 mph when elevated:
                    </p>
                    <p className="text-white font-semibold">
                      Lower the platform IMMEDIATELY and cease all elevated operations.
                    </p>
                    <p className="text-white/60 mt-1">
                      Do not wait for a lull. Do not attempt to finish the task. Lower immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">Critical Wind Facts</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <Wind className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Wind speed INCREASES with height</strong> — it
                      may be 50% greater at 20m above ground than at ground level
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wind className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Funnelling and shielding effects:</strong>{' '}
                      buildings, traffic infrastructure, and terrain features can accelerate wind
                      locally
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wind className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Use an anemometer</strong> to measure wind
                      speed — do not rely on estimation or weather forecasts alone
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wind className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Do NOT increase platform surface area</strong>{' '}
                      by attaching sheeting, boards, banners, or signs — this increases wind loading
                      beyond design limits
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wind className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white">After severe weather:</strong> inspect the
                      machine thoroughly before use — check for water ingress, structural damage,
                      and control system function
                    </div>
                  </li>
                </ul>
              </div>

              {/* Wind Speed vs Height Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-4 text-center">
                  Wind Speed Increase with Height
                </h3>
                <div className="w-full max-w-sm mx-auto">
                  <div className="flex items-end gap-2 justify-centre">
                    {/* Ground level bar */}
                    <div className="flex-1 flex flex-col items-center">
                      <div className="text-xs text-white/60 mb-1">Ground</div>
                      <div
                        className="w-full bg-green-500/30 border border-green-400/50 rounded-t"
                        style={{ height: '60px' }}
                      >
                        <div className="flex items-center justify-center h-full">
                          <span className="text-green-300 text-xs font-bold">20 mph</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-white/40 mt-1">0m</div>
                    </div>
                    {/* 10m bar */}
                    <div className="flex-1 flex flex-col items-center">
                      <div className="text-xs text-white/60 mb-1">10m</div>
                      <div
                        className="w-full bg-amber-500/30 border border-amber-400/50 rounded-t"
                        style={{ height: '84px' }}
                      >
                        <div className="flex items-center justify-center h-full">
                          <span className="text-amber-300 text-xs font-bold">25 mph</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-white/40 mt-1">10m</div>
                    </div>
                    {/* 20m bar */}
                    <div className="flex-1 flex flex-col items-center">
                      <div className="text-xs text-white/60 mb-1">20m</div>
                      <div
                        className="w-full bg-red-500/30 border border-red-400/50 rounded-t"
                        style={{ height: '108px' }}
                      >
                        <div className="flex items-center justify-center h-full">
                          <span className="text-red-300 text-xs font-bold">30 mph</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-white/40 mt-1">20m</div>
                    </div>
                  </div>
                  {/* Base line */}
                  <div className="w-full h-[2px] bg-white/20 mt-0" />
                  <div className="flex justify-between mt-2">
                    <span className="text-green-400 text-[10px]">Within limit</span>
                    <span className="text-red-400 text-[10px]">EXCEEDS 28 mph limit</span>
                  </div>
                  <p className="text-white/40 text-xs text-center mt-2">
                    Wind at 20m can be ~50% greater than at ground level — always apply height
                    correction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Working Near Excavations and Water */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">05</span>
              Working Near Excavations and Water
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                Excavations and water features present specific hazards for MEWP operations. The
                ground near excavation edges is inherently weakened, and water can conceal hazards
                that would otherwise be visible. Both require careful assessment and additional
                precautions.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Excavation Hazards
                </h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Weakened ground:</strong> soil near excavation
                      edges has reduced bearing capacity and can collapse without warning
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Sliding risk:</strong> the MEWP can slide into
                      the excavation, especially on wet or sloping ground
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Concealed hazards:</strong> water, ice, or mud
                      can obscure the true edge and depth of the excavation
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Physical barriers:</strong> additional barriers
                      are required to prevent the machine from approaching too close to edges
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Safe Distance Rule</h3>
                <div className="text-center py-3">
                  <p className="text-white text-lg font-mono font-bold">
                    Distance from edge = Depth of excavation
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    As a general rule, the MEWP should be positioned at least as far from the edge
                    as the excavation is deep
                  </p>
                </div>
                <p className="text-white/50 text-xs mt-2">
                  Example: A 3m deep excavation requires at least 3m clearance from the edge to the
                  nearest MEWP support point. A geotechnical assessment may require greater
                  distances for deep excavations or poor ground.
                </p>
              </div>

              <div className="bg-white/5 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Fragile Surfaces</h3>
                </div>
                <p className="text-white/70 text-sm">
                  Do NOT position MEWPs on fragile surfaces such as flat roofs that are not designed
                  for concentrated point loads, glass panels, skylights, or lightweight cladding.
                  Even if the surface appears solid, it may not support the concentrated loads from
                  MEWP wheels or outriggers. Always confirm the surface load rating before
                  positioning the machine.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Water Hazards</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <Droplets className="h-4 w-4 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      Standing water conceals the true ground level, depth of holes, and condition
                      of the surface beneath
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Droplets className="h-4 w-4 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      Waterlogged ground has dramatically reduced bearing capacity — it may appear
                      firm on the surface
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Droplets className="h-4 w-4 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      Ice over water or excavations creates a false surface that can collapse under
                      load
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Seasonal and Environmental Considerations */}
        <section className="mb-10">
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400/80 text-sm font-normal">06</span>
              Seasonal and Environmental Considerations
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                MEWP operations are affected by seasonal weather patterns and environmental
                conditions throughout the year. Each season brings specific hazards that must be
                assessed and managed. Conditions can change rapidly — what was safe at 8am may be
                dangerous by midday.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                  <h3 className="text-blue-300 font-medium mb-2 flex items-center gap-2">
                    <Droplets className="h-4 w-4" />
                    Rain
                  </h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Softens ground — reduces bearing capacity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Slippery controls and platform surfaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Reduced visibility for operator and ground crew</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Water ingress to electrical and hydraulic systems</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                  <h3 className="text-cyan-300 font-medium mb-2 flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    Ice & Frost
                  </h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>Slippery platform surfaces and access routes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>Reduced tyre grip — risk of sliding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>Frozen controls — hydraulic systems sluggish</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>Ice conceals ground hazards</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <h3 className="text-red-300 font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Lightning
                  </h3>
                  <p className="text-white font-semibold text-sm mb-2">
                    Cease ALL elevated work immediately if lightning is observed within 10 miles.
                  </p>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>A MEWP at height acts as a lightning conductor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Lightning can strike ahead of the visible storm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Lower platform, vacate machine, seek shelter</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-orange-400/30 p-4 rounded-lg">
                  <h3 className="text-orange-300 font-medium mb-2 flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    Extreme Heat
                  </h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>Operator fatigue and dehydration at height</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>Hydraulic fluid expansion affects controls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>Metal surfaces hot to touch — burn risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                      <span>Provide shade, water, and regular breaks</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-3">Darkness & Low Light</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Adequate lighting is essential</strong> — the
                      operator must be able to see the work area, controls, and surrounding hazards
                      clearly
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Flashing beacons</strong> should be used on the
                      MEWP to make it visible to other site traffic and workers
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Enhanced hi-vis clothing</strong> with
                      reflective strips is required for the operator and ground crew
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">UV Exposure</h3>
                <p className="text-white/70 text-sm">
                  Operators working at height for extended periods are exposed to higher levels of
                  UV radiation than those at ground level. This is a particular welfare concern
                  during summer months. Provide sunscreen, UV-rated safety glasses, and appropriate
                  clothing. Consider scheduling elevated work to avoid the peak UV hours of 11:00 to
                  15:00 where practicable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <div className="mt-12">
          <Quiz title="Ground Conditions, Slopes & Weather Limits Quiz" questions={quizQuestions} />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mewp-module-3">
              Next: Module 3 — Inspections & Setup
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MewpModule2Section4;
