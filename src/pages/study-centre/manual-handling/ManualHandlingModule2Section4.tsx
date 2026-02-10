import {
  ArrowLeft,
  Boxes,
  CheckCircle,
  AlertTriangle,
  Flame,
  ShieldAlert,
  HardHat,
  Ruler,
  Eye,
  Scissors,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'long-loads-doorways',
    question:
      'What is the safest way to carry a 3-metre length of cable tray through a standard doorway?',
    options: [
      'Run through the doorway quickly before the door closes',
      'Tilt the cable tray vertically or at an angle to clear the door frame, and have someone hold the door open',
      'Push the cable tray along the floor through the doorway',
      'Carry it above your head to clear the door frame',
    ],
    correctIndex: 1,
    explanation:
      'Long loads must be tilted or angled to pass through standard doorways. Have a colleague hold the door open (or wedge it) so both your hands are free to control the load. Tilting the load vertically or at a steep angle allows it to pass through without catching on the door frame. Never carry long loads above your head &mdash; this places them outside the power zone and creates a significant risk of the load falling or striking overhead services.',
  },
  {
    id: 'hot-items',
    question:
      'What precaution must you take before handling a transformer that has recently been de-energised?',
    options: [
      'No precautions are needed once it is de-energised',
      'Check the surface temperature and allow it to cool, or use heat-resistant gloves',
      'Pour water on it to cool it down quickly',
      'Wrap it in bubble wrap for insulation',
    ],
    correctIndex: 1,
    explanation:
      'Transformers, motor starters, and other electrical equipment can retain significant heat for a long time after being de-energised. The surface temperature should be checked before handling &mdash; either by using a non-contact thermometer or by cautiously hovering your hand near (not on) the surface to feel for radiated heat. If the item is too hot to handle barehanded, allow it to cool or use heat-resistant gloves rated for the temperature. Never pour water on hot electrical equipment.',
  },
  {
    id: 'restricted-headroom',
    question:
      'What is the main risk when performing manual handling in a ceiling void or under-floor space?',
    options: [
      'The lighting is usually poor',
      'You cannot use proper lifting technique because you cannot stand upright or position your feet correctly',
      'The temperature is usually very hot',
      'There are usually no other workers to help you',
    ],
    correctIndex: 1,
    explanation:
      'In restricted headroom environments (ceiling voids, under-floor voids, crawl spaces), you cannot stand upright, adopt a shoulder-width stance, or use your legs to lift. This forces you into awkward postures &mdash; crouching, kneeling, or lying down &mdash; where the spine is in a compromised position and the large leg muscles cannot contribute to the lift. The risk of back injury is significantly higher. Loads handled in these spaces should be as light as possible, and mechanical aids (ropes, pulleys, cable rollers) should be used wherever practical.',
  },
];

const faqs = [
  {
    question: 'How do I safely handle a large, floppy item like a roll of cable or a coil of conduit?',
    answer:
      'Floppy or coiled items are difficult to grip and can shift unpredictably during handling. For cable rolls, keep them in their original packaging or on the drum as long as possible. If you must carry a loose coil, secure it with cable ties or tape first to prevent it uncoiling. Carry it close to your body, supporting the bottom. For heavier rolls, use a trolley or drum stand rather than carrying. Never let a cable coil hang from one hand &mdash; the weight creates significant lateral spinal loading. If the coil is large, use a two-person carry.',
  },
  {
    question: 'Can I lift while wearing a full-face respirator or dust mask?',
    answer:
      'Yes, but be aware that respirators and dust masks restrict your field of vision and make breathing harder during exertion. Restricted vision means you may not see obstacles clearly, especially at floor level. Increased breathing resistance means you will fatigue more quickly. Reduce the weight of loads, take more frequent breaks, and have a colleague act as a spotter when lifting with restricted visibility. If you are required to wear respiratory protective equipment (RPE) for the environment, the manual handling risk assessment should account for this.',
  },
  {
    question: 'What should I do if I discover sharp edges on a piece of cable tray mid-lift?',
    answer:
      'If you discover sharp edges while handling a load, do not adjust your grip while the load is in the air. Communicate with any team members, then lower the load carefully using proper technique. Inspect the load and deal with the sharp edges before continuing: file or deburr the edges, wrap them with tape or foam, or change your grip to avoid the sharp area. Wear appropriate gloves for the rest of the handling task. Report damaged or poorly finished equipment that presents a handling hazard.',
  },
  {
    question: 'Is it safe to handle loads while standing on a ladder?',
    answer:
      'Handling loads while standing on a ladder is one of the most dangerous manual handling scenarios and should be avoided wherever possible. On a ladder, you have a very small base of support, you cannot adopt a stable stance, and you must maintain three points of contact for fall prevention &mdash; which is impossible if both hands are holding a load. The Work at Height Regulations 2005 require that ladders should only be used for light, short-duration work. For tasks that involve handling loads at height, use a mobile scaffold tower, MEWP, or fixed platform that gives you a stable surface and enough room to use proper lifting technique.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is a specific challenge when handling long loads such as 6-metre lengths of conduit?',
    options: [
      'They are always heavier than short loads',
      'They are difficult to balance, swing when turning, and can strike other workers or overhead services',
      'They can only be carried by one person',
      'They must always be carried horizontally',
    ],
    correctAnswer: 1,
    explanation:
      'Long loads present unique challenges: they are unwieldy and difficult to balance, they swing when the carrier turns (creating a large hazard radius), they can strike other workers or overhead services, and they are difficult to navigate through doorways, around corners, and in confined spaces. The weight is often less of a problem than the length and awkwardness.',
  },
  {
    id: 2,
    question: 'What is the primary risk when handling a container of liquid (e.g. a drum of cutting oil)?',
    options: [
      'The liquid may spill and create a slip hazard',
      'The liquid inside shifts as you move, causing unpredictable changes in the centre of gravity',
      'Liquid containers are always heavier than solid loads',
      'There is no additional risk compared to solid loads of the same weight',
    ],
    correctAnswer: 1,
    explanation:
      'Liquid containers present a unique hazard because the contents shift as you move. When you tilt, turn, or stop suddenly, the liquid sloshes to one side, suddenly changing the load&rsquo;s centre of gravity. This can cause you to lose balance or lose control of the load. Move slowly and smoothly, avoid sudden changes of direction, and keep the container as upright as possible. Ensure the lid is secure to prevent spills.',
  },
  {
    id: 3,
    question: 'How do gloves affect your manual handling capability?',
    options: [
      'Gloves always improve handling because they protect your hands',
      'Gloves have no effect on handling capability',
      'Thick gloves reduce grip sensitivity and dexterity, requiring a firmer grip and increasing hand fatigue',
      'Gloves make loads lighter because they reduce friction',
    ],
    correctAnswer: 2,
    explanation:
      'While gloves protect against cuts, abrasions, and chemicals, thick or bulky gloves reduce grip sensitivity (the ability to feel the load) and dexterity (the ability to manipulate the load). This means you need to grip harder to achieve the same security, which increases hand and forearm fatigue. Where possible, use thinner gloves with good grip surfaces for manual handling tasks, and reserve thicker gloves for specific hazards (sharp edges, chemicals).',
  },
  {
    id: 4,
    question: 'What should you do before handling a piece of metal trunking with cut edges?',
    options: [
      'Handle it quickly to minimise exposure to the sharp edges',
      'Wear appropriate cut-resistant gloves and inspect the edges &mdash; deburr or cover sharp edges before lifting',
      'Only handle it with one hand so the other is free to check for sharp edges',
      'There is no additional risk from cut edges',
    ],
    correctAnswer: 1,
    explanation:
      'Cut or unfinished metal edges on cable tray, trunking, and conduit fittings are a significant handling hazard. Sharp edges can cause deep lacerations even through thin gloves. Before handling: inspect the load for sharp edges, deburr them with a file if practical, or cover them with tape or edge protectors. Always wear appropriate cut-resistant gloves. A sudden cut can cause you to release the load reflexively, creating a secondary injury risk.',
  },
  {
    id: 5,
    question:
      'Why is manual handling particularly risky in ceiling voids and under-floor spaces?',
    options: [
      'The materials are always heavier in these locations',
      'There is usually no lighting available',
      'Restricted headroom prevents proper lifting posture &mdash; you cannot stand upright or use your legs effectively',
      'You are not allowed to perform manual handling in these spaces',
    ],
    correctAnswer: 2,
    explanation:
      'In ceiling voids and under-floor spaces, restricted headroom means you cannot stand upright, cannot adopt a shoulder-width stance, and cannot use the powerful leg muscles for lifting. You are forced into crouching, kneeling, or lying positions where the spine is in a compromised posture and the risk of back injury is much higher. Keep loads as light as possible in these spaces and use ropes, pulleys, or cable rollers to move items rather than carrying.',
  },
  {
    id: 6,
    question:
      'A load containing loose items (e.g. a box of mixed fittings) shifts unexpectedly during a lift. What should you do?',
    options: [
      'Continue the lift &mdash; the load is still the same weight',
      'Stop, stabilise the load, and either secure the contents or repack them before continuing',
      'Tilt the load to the opposite side to counterbalance',
      'Speed up to reach the destination before the load shifts again',
    ],
    correctAnswer: 1,
    explanation:
      'An unexpected shift in the load changes its centre of gravity and can cause loss of balance or loss of grip. Stop the lift safely (call &ldquo;Stop&rdquo; if in a team), set the load down, and assess why it shifted. Secure loose contents (pack tightly, use dividers, tape the box closed) before attempting the lift again. Never continue a lift with an unstable load &mdash; the shift may get worse.',
  },
  {
    id: 7,
    question:
      'How does wearing a hard hat affect your ability to perform manual handling tasks safely?',
    options: [
      'A hard hat has no effect on manual handling',
      'A hard hat can limit upward vision, making it harder to see overhead obstacles and high placement points',
      'A hard hat makes your head heavier, increasing neck strain',
      'A hard hat improves handling because it protects you from falling objects',
    ],
    correctAnswer: 1,
    explanation:
      'A hard hat limits your upward field of vision, which becomes a problem when you need to see above you &mdash; for example, when placing a load on a high shelf, feeding cable through a ceiling void, or navigating under low overhead obstacles. The brim restricts how far back you can tilt your head. Be extra cautious when lifting to heights while wearing a hard hat. Pause, look up before lifting, and use a spotter if needed. Despite this limitation, always wear your hard hat where required &mdash; falling-object protection is more important.',
  },
  {
    id: 8,
    question:
      'Which of the following is the safest approach to handling loads while working from a mobile scaffold tower?',
    options: [
      'Lift loads directly from the ground to the platform by leaning over the edge',
      'Have a colleague throw the items up to you',
      'Use the internal ladder access with items passed up via a rope and bucket, or hoist materials using a gin wheel',
      'Carry as many items as possible per trip to reduce the number of trips up the ladder',
    ],
    correctAnswer: 2,
    explanation:
      'When working from a mobile scaffold tower, the safest approach is to separate the person from the load: climb the tower empty-handed (maintaining three points of contact on the ladder), then have materials raised separately using a rope and bucket, material hoist, or gin wheel. Never lean over the edge of a scaffold to lift items from below &mdash; this shifts your centre of gravity outside the platform and creates a fall risk. Never overload yourself when climbing.',
  },
];

export default function ManualHandlingModule2Section4() {
  useSEO({
    title: 'Awkward Loads & Restricted Spaces | Manual Handling Module 2.4',
    description:
      'Learn how to handle long loads, uneven and shifting loads, hot and sharp items, handle with PPE, work in restricted headroom, and manage loads from ladders and scaffolds.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <Boxes className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 4
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Awkward Loads &amp; Restricted Spaces
          </h1>
          <p className="text-white/80 max-w-xl mx-auto leading-relaxed">
            Long loads, shifting contents, hot and sharp items, handling with PPE, restricted
            headroom, ceiling voids, and working from ladders and platforms
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-emerald-400/80 text-sm font-normal">00</span>
            Quick Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-2 border-l-emerald-500/50 border border-emerald-500/30">
              <p className="font-semibold text-base text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Long loads:</strong> Find the balance point, tilt for doorways, warn
                    others when turning.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Shifting loads:</strong> Move slowly, keep upright, secure loose
                    contents before lifting.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Hot/sharp items:</strong> Check first, use correct PPE, never handle
                    bare-handed.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Restricted spaces:</strong> Keep loads minimal, use ropes and
                    pulleys, avoid lifting in awkward postures.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-2 border-l-emerald-500/50 border border-emerald-500/30">
              <p className="font-semibold text-base text-emerald-400 mb-2">On the Job</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Cable tray edges:</strong> Always deburr or tape before handling.
                    Wear cut-resistant gloves.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Ceiling voids:</strong> Pass items up &mdash; never carry while
                    climbing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Ladders:</strong> Never handle loads while climbing. Use a rope and
                    bucket.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>PPE reduces grip:</strong> Account for thick gloves and hard hat
                    vision restrictions.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-emerald-400/80 text-sm font-normal">&nbsp;</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4 leading-relaxed">
            By the end of this section, you will be able to:
          </p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Apply safe handling techniques for long, uneven, and shifting loads common in
                electrical work
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Identify the additional risks of handling hot items and sharp-edged materials
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Explain how PPE (gloves, hard hats, respirators) affects manual handling
                capability and describe mitigations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Describe safe handling practices in restricted headroom environments such as
                ceiling voids and under-floor spaces
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Explain why handling loads from ladders is dangerous and identify safer
                alternatives
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: Long Loads */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">01</span>
              Long Loads
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Conduit, trunking, cable tray, and cable ladder sections are among the most
                commonly handled long loads in electrical installation work. Standard lengths of
                3 metres and 6 metres are awkward to carry, difficult to balance, and create
                a significant hazard radius when turning. The weight may be manageable, but the{' '}
                <strong>length and rigidity</strong> are the real challenges.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  <Ruler className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Long Load Handling Techniques
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Find the balance point</strong> before lifting. For uniform loads
                      (like conduit), this is roughly the centre. For irregular loads (like cable
                      tray with fittings attached), it may be off-centre. Grip at or near the
                      balance point for a solo carry.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Shoulder carry</strong> for lighter long loads: rest the load on
                      your shoulder at the balance point, with one hand steadying the front end.
                      Keep the front end tilted slightly upward to avoid striking people or
                      obstacles at head height.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Two-person carry</strong> for heavy or very long loads: one at each
                      end, same direction of travel. The front person navigates and calls out
                      obstacles. Lift and lower together using &ldquo;Ready, steady, lift&rdquo;.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Doorways:</strong> Tilt the load vertically or at a steep angle to
                      pass through. Have a colleague hold the door. For very long loads in narrow
                      corridors, you may need to feed the load through and pull it from the other
                      side.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Corners:</strong> Slow right down. The rear end of a long load
                      swings out when you turn a corner. Communicate with your partner and ensure
                      the area is clear before turning. The rear person may need to step wide
                      while the front person pivots.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Uneven & Shifting Loads */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">02</span>
              Uneven &amp; Shifting Loads
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Not all loads are solid, stable, and evenly distributed. Electricians frequently
                handle containers of liquid (lubricant, cable pulling compound), boxes of mixed
                fittings, bags of fixings, and other items with shifting or uneven contents. These
                loads are unpredictable &mdash; their centre of gravity changes as the contents
                move.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Types of Unpredictable Loads</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-500/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-2">Liquid Containers</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Liquid sloshes when you move, changing the centre of gravity
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Keep containers upright and move slowly
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Ensure lids are secure to prevent spillage
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Avoid sudden stops, starts, or direction changes
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-2">Loose Items</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Bags of fixings, boxes of fittings, and mixed components shift
                          unpredictably
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Pack tightly before moving &mdash; fill voids with packing material
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Tape or seal boxes closed to prevent items falling out
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          If a load shifts mid-carry, stop and repack
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Hot & Sharp Items */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">03</span>
              Hot Items &amp; Sharp Edges
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Electrical equipment and containment materials present two specific physical
                hazards during handling: <strong>heat</strong> from recently energised or soldered
                equipment, and <strong>sharp edges</strong> from cut or stamped metalwork. Both
                can cause a reflexive release of the load, leading to secondary injuries.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  <Flame className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Hot Items
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Transformers:</strong> Can retain significant heat for hours after
                      de-energisation. Surface temperatures can exceed 80&deg;C. Check with a
                      non-contact thermometer or hover your hand near (not on) the surface.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Motor starters &amp; contactors:</strong> Components that have been
                      under heavy load generate heat through resistive losses. Allow to cool
                      before handling.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Recently soldered or brazed items:</strong> Joints and surrounding
                      metal can be dangerously hot. Mark hot items clearly and allow to cool.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Heat-resistant gloves:</strong> If the item must be moved while hot,
                      use gloves rated for the temperature. Standard work gloves are NOT
                      heat-resistant.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  <Scissors className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Sharp Edges
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Cable tray:</strong> Factory-cut ends and site-cut ends are
                      extremely sharp. The thin steel edge can cause deep lacerations even through
                      light gloves. Always deburr cut ends with a file or fit edge protectors.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Metal trunking:</strong> Stamped knockouts and cut edges present
                      similar risks. Handle with cut-resistant gloves and inspect all edges before
                      gripping.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Steel conduit:</strong> Thread-cutting and site-cutting leave burrs
                      and sharp edges at the ends. Ream and deburr all cut conduit ends before
                      handling and installing.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Reflex release:</strong> A sudden cut can cause you to release the
                      load instinctively. This is a natural reflex but extremely dangerous if you
                      are holding a heavy or shared load. Wear appropriate gloves to prevent cuts,
                      and brief team members on the risk.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    The Reflex Release Problem
                  </h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  When your hand touches something unexpectedly hot or sharp, your body&rsquo;s
                  pain-withdrawal reflex causes an instant, involuntary release of the object.
                  You cannot control this reflex &mdash; it happens before your conscious brain
                  is aware of the pain. In a manual handling context, this means a hot or sharp
                  load can be dropped without warning, potentially falling on your feet, legs, or
                  a colleague. This is why inspecting loads for temperature and sharp edges{' '}
                  <strong className="text-white">before</strong> gripping is so important.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Handling with PPE */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">04</span>
              Handling with PPE
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Personal protective equipment is essential on construction sites, but it can also
                affect your manual handling capability. Understanding these effects allows you to
                compensate and maintain safe technique.
              </p>

              {/* Awkward Load Handling Tips Diagram */}
              <div className="bg-white/5 border border-emerald-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  Awkward Load Handling Tips
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Gloves */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <ShieldAlert className="h-5 w-5 text-emerald-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">Gloves</h4>
                        <p className="text-white/80 text-xs leading-relaxed">
                          Thick gloves reduce grip sensitivity and dexterity. You need to grip
                          harder, increasing hand fatigue. Use thinner, high-grip gloves for
                          handling tasks where cut protection is not needed.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Hard Hat */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <HardHat className="h-5 w-5 text-emerald-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">Hard Hat</h4>
                        <p className="text-white/80 text-xs leading-relaxed">
                          The brim limits upward vision. Difficult to see overhead placement
                          points or low beams. Pause and look up before lifting to height. Use a
                          spotter for overhead work.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Safety Boots */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <ShieldAlert className="h-5 w-5 text-emerald-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">Safety Boots</h4>
                        <p className="text-white/80 text-xs leading-relaxed">
                          Heavier and stiffer than normal footwear. Toe caps protect feet from
                          dropped loads but can restrict ankle flexibility. Choose boots that
                          balance protection with mobility.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Respirators */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <Eye className="h-5 w-5 text-emerald-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">
                          Respirators &amp; Goggles
                        </h4>
                        <p className="text-white/80 text-xs leading-relaxed">
                          Restrict breathing and vision. You fatigue faster and see less. Reduce
                          load weights, take more breaks, and use a spotter for restricted
                          visibility.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Hi-Vis */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <ShieldAlert className="h-5 w-5 text-emerald-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">Hi-Vis &amp; Harnesses</h4>
                        <p className="text-white/80 text-xs leading-relaxed">
                          Bulky clothing and harnesses can catch on loads or restrict movement.
                          Ensure straps and zips are secured before handling. Check that harness
                          webbing does not obstruct your grip.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Ear Defenders */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <ShieldAlert className="h-5 w-5 text-emerald-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">Ear Defenders</h4>
                        <p className="text-white/80 text-xs leading-relaxed">
                          Reduce ability to hear verbal commands during team lifts. Use visual
                          signals as well as verbal commands. Ensure the team leader is visible to
                          all members.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-white/50 text-xs text-center mt-4 italic">
                  PPE is essential &mdash; but always account for how it affects your handling
                  capability. Adjust technique, loads, and communication accordingly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Restricted Headroom */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">05</span>
              Restricted Headroom &amp; Confined Spaces
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Electricians frequently work in spaces with restricted headroom: ceiling voids,
                under-floor voids, service risers, plant rooms with low ceilings, and crawl spaces.
                These environments make proper manual handling technique difficult or impossible
                because you cannot stand upright, adopt a stable stance, or use your legs to lift.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Handling in Ceiling Voids</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Pass items up:</strong> Never carry tools or materials while
                      climbing into a ceiling void. Climb in first (maintaining three points of
                      contact), then have items passed up to you by a colleague or raised on a
                      rope.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Minimise load weight:</strong> Only take what you need into the
                      void. A small bag of fixings and the minimum tools required is far safer
                      than dragging a full toolbox through a crawl space.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Slide, don&rsquo;t lift:</strong> In crawl spaces, slide items
                      along the floor rather than lifting them. This keeps the load low and avoids
                      the need for an upright posture.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Use cable rollers:</strong> For running cables through ceiling
                      voids, use cable rollers or guides to reduce the manual pulling force.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Under-Floor Voids</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Raised access floors:</strong> The void depth is usually only
                      150&ndash;600 mm. Working with arms extended down into the void while
                      kneeling on the floor above is the safest approach for installing
                      containment below raised floors.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Deep voids:</strong> For deeper voids that you must enter, the same
                      principles apply as for ceiling voids: climb in empty-handed, have items
                      lowered to you, minimise load weights.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Kneeling and Crouching Risks
                  </h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  When you kneel or crouch, your spine is in a flexed position and the large leg
                  muscles cannot contribute to lifting. Any load you handle in this posture places
                  almost all the strain on your back muscles and lumbar discs. The risk of injury
                  is{' '}
                  <strong className="text-white">
                    significantly higher than when standing
                  </strong>
                  . Keep loads to an absolute minimum in these postures &mdash; if a load would
                  be marginal when standing, it is too heavy when kneeling. Use knee pads to
                  protect your knees and reduce fatigue.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Working from Ladders & Platforms */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">06</span>
              Working from Ladders &amp; Platforms
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Handling loads while on a ladder is one of the most dangerous manual handling
                scenarios. Ladders provide a very small base of support, you cannot adopt a stable
                stance, and the three-point-contact rule for fall prevention is incompatible with
                holding a load in both hands.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Why Ladders and Manual Handling Do Not Mix
                  </h3>
                </div>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="leading-relaxed">
                      <strong className="text-white">Tiny base of support:</strong> Your feet are
                      on narrow rungs, giving almost no lateral stability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="leading-relaxed">
                      <strong className="text-white">No leg drive:</strong> You cannot use the
                      kinetic lifting technique &mdash; the rungs do not allow a squat position
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="leading-relaxed">
                      <strong className="text-white">Three-point contact conflict:</strong>{' '}
                      Carrying a load means losing at least one point of contact with the ladder,
                      greatly increasing fall risk
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="leading-relaxed">
                      <strong className="text-white">Height amplifies consequences:</strong> A
                      dropped load or a fall from height has far more serious consequences than
                      the same event at ground level
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Safer Alternatives</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Rope and bucket:</strong> Climb the ladder empty-handed. Have
                      materials raised using a rope and bucket, tool hoist, or gin wheel. This
                      keeps you free to maintain three-point contact.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Tool belt:</strong> For small items (fixings, tape, pencils), use a
                      tool belt rather than carrying items in your hands. Keep your hands free for
                      climbing.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Mobile scaffold tower:</strong> For tasks that require handling
                      loads at height, a scaffold tower provides a stable platform with enough
                      room to stand, move, and use proper lifting technique.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Podium step:</strong> A podium step gives a larger standing area
                      than a ladder and a guardrail for fall protection. Suitable for light
                      handling tasks at moderate heights.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>MEWP:</strong> For heavy loads at height, a mobile elevated work
                      platform provides a secure platform with guardrails and the ability to raise
                      materials hydraulically.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Key Numbers to Remember
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">80&deg;C+</p>
                    <p className="text-white/60 text-xs mt-1">
                      Transformer
                      <br />
                      surface temp
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">3</p>
                    <p className="text-white/60 text-xs mt-1">
                      Points of
                      <br />
                      contact (ladder)
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">150 mm</p>
                    <p className="text-white/60 text-xs mt-1">
                      Min raised
                      <br />
                      floor depth
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">6 m</p>
                    <p className="text-white/60 text-xs mt-1">
                      Standard
                      <br />
                      conduit length
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400/80 text-sm font-normal">&nbsp;</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Team Handling
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-2">
              Complete Module 2
              <CheckCircle className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
