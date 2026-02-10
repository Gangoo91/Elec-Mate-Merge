import {
  ArrowLeft,
  MoveHorizontal,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Weight,
  Gauge,
  Footprints,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'push-vs-pull',
    question: 'Why is pushing generally safer than pulling when moving a load?',
    options: [
      'Pushing uses less energy than pulling',
      'Pushing gives better visibility, allows use of body weight, and keeps the load ahead of you',
      'Pulling is only dangerous if the load weighs more than 20 kg',
      'There is no difference &mdash; pushing and pulling carry the same risk',
    ],
    correctIndex: 1,
    explanation:
      'Pushing is generally safer than pulling for several reasons: you can see where you are going, you can use your body weight to help move the load, the load is ahead of you (reducing the risk of it running over your feet), and the forces on your lower back are typically lower. The HSE recommends pushing over pulling wherever possible.',
  },
  {
    id: 'sustained-force',
    question:
      'According to HSE guidance, what is the approximate maximum sustained pushing force for men?',
    options: [
      'Approximately 5 kg of force',
      'Approximately 10 kg of force',
      'Approximately 20 kg of force',
      'Approximately 30 kg of force',
    ],
    correctIndex: 1,
    explanation:
      'HSE guidance indicates that a sustained (keeping-going) force for pushing or pulling should not exceed approximately 10 kg of force for men and 7 kg for women. The initial (starting) force can be higher &mdash; approximately 20 kg for men and 15 kg for women &mdash; because more force is needed to overcome static friction and get the load moving.',
  },
  {
    id: 'carrying-stairways',
    question: 'What is the key safety rule when carrying a load on a stairway?',
    options: [
      'Always carry the load above your head for clearance',
      'Run up or down to minimise the time spent on the stairs',
      'Ensure you can see the steps, use the handrail if possible, and take one step at a time',
      'Only carry loads downstairs &mdash; never upstairs',
    ],
    correctIndex: 2,
    explanation:
      'When carrying a load on stairways, you must be able to see the steps ahead of you at all times. If the load blocks your view, get help or use an alternative method. Use the handrail where possible (even if only one hand is free). Take one step at a time, pause on landings if needed, and never rush. Falls on stairs while carrying loads are a major cause of serious workplace injury.',
  },
];

const faqs = [
  {
    question: 'Should I always push rather than pull?',
    answer:
      'Pushing is generally safer than pulling, but there are situations where pulling is necessary or even preferable. For example, pulling may be needed when navigating through doorways (pulling the load through behind you), when you need to control the speed of a load going downhill, or when the design of the equipment requires it (e.g. some hand trucks). The key is to use the method that gives you the best control, visibility, and body posture for the specific task. If you must pull, keep the load close, avoid twisting, and maintain a stable stance.',
  },
  {
    question: 'What can I do to reduce the force needed to push a heavy load?',
    answer:
      'Several practical measures can reduce the force required: ensure wheels and castors are in good condition and properly maintained (a squeaky or seized wheel dramatically increases the force needed); use larger wheels for rough surfaces (larger wheels roll over bumps more easily); keep the floor clean and free of debris; use rollers or slides for loads without wheels; reduce the load weight by splitting it into smaller portions; push rather than pull; apply force at waist height where possible; and ensure the route is flat and smooth. Even small improvements to equipment maintenance can make a significant difference to the force required.',
  },
  {
    question: 'Is it safe to carry a load with one hand?',
    answer:
      'One-handed carrying creates an asymmetric load on the body, which causes the spine to bend laterally (sideways) to compensate. This places uneven stress on the intervertebral discs and the muscles on one side of the body. For light, brief carries this may be acceptable, but for heavier or longer carries it significantly increases the risk of injury. Where possible, carry loads with both hands (centred in front of the body), or split the load evenly between both hands. If you must carry one-handed, switch hands regularly and keep the load as light as possible.',
  },
  {
    question: 'How do I safely move a heavy load across a rough or uneven surface?',
    answer:
      'Rough or uneven surfaces dramatically increase the force required to push or pull a load and increase the risk of the load tipping or the handler tripping. Where possible, improve the surface first (lay boards over soft ground, clear debris). Use equipment with large pneumatic tyres rather than small hard castors. Reduce the load weight. Use two people. Move slowly and maintain a wide, stable stance. On slopes, always keep yourself on the uphill side of the load so it cannot roll back onto you. If the surface is too rough for wheeled equipment, consider carrying the load using the kinetic lifting technique or requesting a mechanical lifting aid.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following is an advantage of pushing over pulling?',
    options: [
      'Pulling uses more energy than pushing',
      'You can see where you are going and use your body weight to assist',
      'Pushing allows you to move faster',
      'There is no advantage &mdash; both are equally safe',
    ],
    correctAnswer: 1,
    explanation:
      'Pushing offers several safety advantages: better forward visibility, the ability to use body weight to help move the load, lower forces on the lumbar spine, and the load being ahead of you rather than behind. The HSE recommends pushing over pulling wherever the task allows.',
  },
  {
    id: 2,
    question:
      'What is the approximate HSE guideline starting (initial) force for pushing for men?',
    options: [
      'Approximately 5 kg of force',
      'Approximately 10 kg of force',
      'Approximately 20 kg of force',
      'Approximately 30 kg of force',
    ],
    correctAnswer: 2,
    explanation:
      'The HSE guideline initial (starting) force for pushing or pulling is approximately 20 kg for men and 15 kg for women. This is higher than the sustained force because more effort is needed to overcome static friction and get the load moving. Once the load is in motion, the sustained force should not exceed approximately 10 kg (men) or 7 kg (women).',
  },
  {
    id: 3,
    question: 'Why does a seized or poorly maintained castor increase manual handling risk?',
    options: [
      'It makes the load look unprofessional',
      'It dramatically increases the force needed to move the load, increasing strain on the handler',
      'It only matters if the load weighs more than 50 kg',
      'It causes the load to make excessive noise',
    ],
    correctAnswer: 1,
    explanation:
      'A seized or poorly maintained castor can double or triple the force required to move a load on wheels. This increased force is transferred directly to the handler&rsquo;s arms, shoulders, and lower back. Regular maintenance of wheels, castors, and bearings is a simple but highly effective way to reduce manual handling risk. Always report faulty equipment.',
  },
  {
    id: 4,
    question: 'What is the best position to apply pushing force to a trolley or wheeled load?',
    options: [
      'As low as possible, near the wheels',
      'At waist height, roughly between hip and chest',
      'As high as possible, above shoulder height',
      'It does not matter where you push',
    ],
    correctAnswer: 1,
    explanation:
      'Force should be applied at approximately waist height (between hip and chest). Pushing too low forces you to bend forward, straining the lower back. Pushing too high can cause the load to tip and reduces your mechanical advantage. Handle height should ideally be between hip and shoulder height for optimal posture and force transfer.',
  },
  {
    id: 5,
    question: 'When carrying a load, where should it be positioned relative to your body?',
    options: [
      'To one side for better visibility',
      'At arm&rsquo;s length to keep it away from your body',
      'As close to your body as possible, centred at waist height',
      'Above your head for maximum clearance',
    ],
    correctAnswer: 2,
    explanation:
      'Loads should be carried as close to the body as possible, centred at waist height (within the power zone). This keeps the combined centre of gravity within your base of support, minimises lever-arm forces on the spine, and allows you to use both arms equally. Carrying at arm&rsquo;s length or to one side significantly increases spinal stress.',
  },
  {
    id: 6,
    question: 'What is the main risk of one-handed carrying over extended distances?',
    options: [
      'The load may swing and hit other people',
      'Asymmetric loading causes lateral spinal bending and uneven muscle strain',
      'It is slower than two-handed carrying',
      'One-handed carrying is only risky above 25 kg',
    ],
    correctAnswer: 1,
    explanation:
      'One-handed carrying creates an asymmetric load that causes the spine to bend sideways (lateral flexion) to compensate. This places uneven compressive forces on the intervertebral discs and overloads the muscles on one side of the body. Over time, this can lead to chronic pain and disc problems. Where possible, use both hands or split the load evenly.',
  },
  {
    id: 7,
    question:
      'Which of the following best reduces friction when moving a heavy load across a smooth floor?',
    options: [
      'Wetting the floor to make it slippery',
      'Using rollers, trolleys, or furniture slides under the load',
      'Dragging the load as quickly as possible',
      'Tilting the load onto one edge and sliding it',
    ],
    correctAnswer: 1,
    explanation:
      'Rollers, trolleys, and furniture slides reduce the friction between the load and the floor by replacing sliding friction with rolling friction, which requires far less force. Wetting the floor creates a slip hazard. Tilting the load concentrates all the weight on a small area, which can damage both the floor and the load, and creates instability. Always use appropriate mechanical aids.',
  },
  {
    id: 8,
    question:
      'When using a sack truck or hand truck, what technique reduces the effort needed to tilt the load back?',
    options: [
      'Jerk the handle backwards as hard as possible',
      'Use a foot brace &mdash; place your foot against the base plate and pull the handle towards you smoothly',
      'Lift the entire truck and load off the ground',
      'Ask a colleague to push the bottom of the load while you pull the handle',
    ],
    correctAnswer: 1,
    explanation:
      'Using the foot brace technique (placing your foot against the base plate of the sack truck) provides leverage that significantly reduces the effort needed to tilt the load back onto the wheels. The base plate acts as a fulcrum, and your foot prevents it from sliding. Always tilt the load smoothly and steadily &mdash; never jerk the handle, as this can cause the load to shift or the truck to tip sideways.',
  },
];

export default function ManualHandlingModule2Section2() {
  useSEO({
    title: 'Pushing, Pulling & Carrying | Manual Handling Module 2.2',
    description:
      'Learn safe pushing, pulling and carrying techniques, HSE force thresholds, friction reduction, stairway safety, and one-handed carrying risks for electricians.',
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
          <MoveHorizontal className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 2
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Pushing, Pulling &amp; Carrying
          </h1>
          <p className="text-white/80 max-w-xl mx-auto leading-relaxed">
            Force thresholds, body positioning, reducing friction, safe carrying techniques,
            one-handed carrying risks, and stairway safety
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
                    <strong>Push, don&rsquo;t pull:</strong> Pushing is safer &mdash; better
                    visibility, can use body weight, lower back strain.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Starting force:</strong> ~20&nbsp;kg men / ~15&nbsp;kg women.
                    Sustained: ~10&nbsp;kg / ~7&nbsp;kg.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Reduce friction:</strong> Maintain wheels, use trolleys, rollers, or
                    slides.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Carry close:</strong> Both hands, centred, within the power zone.
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
                    <strong>Trolleys:</strong> Push at waist height &mdash; avoid leaning forward
                    or reaching up.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Stairs:</strong> See the steps, use the handrail, one step at a time.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>One-handed:</strong> Avoid where possible &mdash; causes lateral
                    spinal bending.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Sack trucks:</strong> Use the foot brace technique to tilt smoothly.
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
                Explain why pushing is generally safer than pulling and identify situations where
                pulling may be necessary
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                State the HSE guideline force thresholds for starting and sustaining pushing and
                pulling tasks
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Describe practical methods for reducing friction when moving loads
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Apply safe carrying techniques including correct posture, load positioning, and
                the use of handles
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Identify the risks of one-handed carrying and safe practices for stairways
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: Pushing vs Pulling */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">01</span>
              Pushing vs Pulling
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Not all manual handling involves lifting. On an electrical installation site, you
                will frequently need to push trolleys of materials, pull cables through
                containment, and carry tools and components from the van to the work area. Each of
                these activities carries its own risks and requires specific techniques.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Why Pushing Is Generally Safer
                </h3>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="leading-relaxed">
                      <strong className="text-white">Better visibility:</strong> You can see where
                      you are going, spot obstacles, and navigate around other workers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="leading-relaxed">
                      <strong className="text-white">Body weight assist:</strong> You can lean
                      into the load and use your body weight to supplement the pushing force,
                      reducing the effort from your arms and back
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="leading-relaxed">
                      <strong className="text-white">Lower back forces:</strong> Pushing tends to
                      create lower compressive forces on the lumbar spine than pulling, because the
                      force vector is directed forward rather than backward
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="leading-relaxed">
                      <strong className="text-white">Load ahead of you:</strong> The load is in
                      front, reducing the risk of it running over your feet or tripping you
                    </span>
                  </li>
                </ul>
              </div>

              {/* Push/Pull Force Guide Diagram */}
              <div className="bg-white/5 border border-emerald-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  Push/Pull Force Guide
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pushing column */}
                  <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ArrowRight className="h-5 w-5 text-emerald-300" />
                      <h4 className="text-emerald-300 font-semibold">Pushing</h4>
                      <span className="ml-auto text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                        Preferred
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white/5 rounded p-3">
                        <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                          Starting Force
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-emerald-400 font-bold text-2xl">~20 kg</span>
                          <span className="text-white/60 text-xs">men</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-emerald-400 font-bold text-2xl">~15 kg</span>
                          <span className="text-white/60 text-xs">women</span>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded p-3">
                        <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                          Sustained Force
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-emerald-400 font-bold text-2xl">~10 kg</span>
                          <span className="text-white/60 text-xs">men</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-emerald-400 font-bold text-2xl">~7 kg</span>
                          <span className="text-white/60 text-xs">women</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Pulling column */}
                  <div className="bg-red-500/5 border border-red-400/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ArrowLeft className="h-5 w-5 text-red-300" />
                      <h4 className="text-red-300 font-semibold">Pulling</h4>
                      <span className="ml-auto text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">
                        Higher Risk
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white/5 rounded p-3">
                        <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                          Risk Factors
                        </p>
                        <ul className="text-white/80 text-sm space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                            <span className="leading-relaxed">Reduced visibility behind you</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                            <span className="leading-relaxed">
                              Load can run into your heels or ankles
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                            <span className="leading-relaxed">
                              Higher shear forces on the lumbar spine
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                            <span className="leading-relaxed">
                              Cannot use body weight effectively
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-white/5 rounded p-3">
                        <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                          When Pulling Is Needed
                        </p>
                        <ul className="text-white/80 text-sm space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                            <span className="leading-relaxed">Through doorways</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                            <span className="leading-relaxed">Downhill / controlling speed</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                            <span className="leading-relaxed">Equipment design requires it</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-white/50 text-xs text-center mt-4 italic">
                  HSE guideline force thresholds for pushing and pulling. These are
                  risk-assessment thresholds, not absolute limits. Individual capability varies.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-2">
                  Starting Force vs Sustained Force
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  The <strong className="text-white">starting force</strong> (also called
                  &ldquo;initial force&rdquo;) is the amount of effort needed to get a stationary
                  load moving. It is always higher than the sustained force because you must
                  overcome <strong className="text-white">static friction</strong> between the
                  load (or its wheels) and the floor. Once the load is moving, the{' '}
                  <strong className="text-white">sustained force</strong> (or
                  &ldquo;keeping-going force&rdquo;) is the effort needed to keep it rolling.
                  This is lower because rolling friction is less than static friction. If the
                  sustained force required exceeds the guideline thresholds, the task needs
                  redesigning &mdash; better wheels, a smoother surface, or a lighter load.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Reducing Friction */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">02</span>
              Reducing Friction
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Friction is the force that resists the movement of one surface across another. In
                manual handling, friction is the enemy when you are trying to move a load
                horizontally (pushing, pulling, or sliding) but your ally when you need grip
                (holding a load, standing on a floor). Reducing{' '}
                <strong>unwanted friction</strong> is one of the most effective ways to lower the
                force requirements of a manual handling task.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  <Gauge className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Practical Friction-Reduction Methods
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-1">
                      Wheels &amp; Castors
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Wheeled equipment (trolleys, sack trucks, platform trucks) replaces sliding
                      friction with rolling friction, which requires{' '}
                      <strong className="text-white">far less force</strong>. Keep wheels and
                      bearings well maintained &mdash; a seized castor can double the force needed.
                      Use larger wheels for rough or uneven surfaces, as they roll over bumps more
                      easily. Pneumatic (air-filled) tyres absorb vibration and handle rough ground
                      better than hard plastic wheels.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-1">
                      Rollers &amp; Conveyors
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      For heavy or bulky loads that cannot easily be placed on a trolley, rollers
                      (pipe rollers, skate rollers) or gravity conveyors can dramatically reduce the
                      effort needed. Cable drums, for example, can be placed on a drum roller or
                      unwound via a cable drum stand rather than being manually lifted and rotated.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-1">
                      Slides &amp; Chutes
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Low-friction slides or chutes can be used to move materials between levels
                      (e.g. from a delivery vehicle to ground level) without manual lifting. This is
                      especially useful for bundles of conduit, lengths of trunking, or boxes of
                      fittings. The slide does the work &mdash; you only need to guide and control.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-1">
                      Surface Maintenance
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Keep floors and pathways clean, smooth, and free of debris. Grit, cable
                      offcuts, and spilt materials on the floor increase rolling resistance and can
                      jam wheels. On construction sites, laying plywood boards over soft or uneven
                      ground creates a smooth rolling surface for trolleys.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Carrying Techniques */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">03</span>
              Carrying Techniques
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Carrying is one of the most common manual handling activities on site. Unlike a
                lift (which is a brief, high-effort movement), carrying involves sustained effort
                over a distance. This means that even relatively light loads can cause cumulative
                strain if carried frequently or over long distances with poor technique.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Safe Carrying Principles</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Keep the load close to your body</strong> &mdash; ideally in contact
                      with your torso. This minimises lever-arm forces on the spine and keeps your
                      centre of gravity within your base of support.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Carry at waist height</strong> within the power zone. Avoid carrying
                      above chest height or below knee level for any significant distance.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Keep the load balanced</strong> &mdash; the weight should be evenly
                      distributed. If the load is lopsided, the heavier end should be closest to
                      your body.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Use handles</strong> wherever available. Handles provide a secure
                      grip and allow you to carry with less hand and forearm fatigue. If no handles
                      exist, consider adding temporary handles (e.g. ratchet straps, carry loops).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Maintain visibility</strong> &mdash; you must be able to see the
                      ground ahead of you and any obstacles in your path. If the load blocks your
                      view, get help.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    One-Handed Carrying Risks
                  </h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Carrying a load in one hand creates an{' '}
                  <strong className="text-white">asymmetric load</strong> on the body. Your spine
                  bends laterally (sideways) to compensate, placing uneven compressive forces on
                  the intervertebral discs and overloading the muscles on one side. Over time, this
                  can lead to chronic back pain, disc degeneration, and postural problems.
                  Electricians often carry tool bags in one hand out of habit &mdash; this is a
                  common cause of cumulative strain. Where possible, use a backpack-style tool bag,
                  carry with both hands, or split tools evenly between two bags.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-2">
                  Carry Distance &amp; Frequency
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  The HSE recognises that the risk of injury increases with both the distance a
                  load is carried and the frequency of the carry. As a rule of thumb, if you are
                  regularly carrying loads more than <strong className="text-white">10 metres</strong>,
                  you should consider using a trolley, sack truck, or other wheeled aid. If
                  carrying is frequent (more than a few times per hour), the individual carry weight
                  should be reduced. Plan your work area layout to minimise carrying distances
                  &mdash; store materials as close to the work point as possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Stairways & Slopes */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">04</span>
              Stairways &amp; Slopes
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Carrying loads on stairways and slopes introduces additional risk factors:
                changes in elevation, restricted width, the need to maintain balance on an incline,
                and the potential for the load to shift or the handler to trip. Falls on stairs
                while carrying loads are a major cause of serious workplace injury.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  <Footprints className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Stairway Safety Rules
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>See the steps:</strong> You must be able to see each step as you
                      approach it. If the load blocks your view, do not carry it on the stairs
                      &mdash; get help, use a smaller load, or find an alternative route (lift,
                      ramp, hoist).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Use the handrail:</strong> Keep one hand on the handrail wherever
                      possible. This may mean carrying the load in one hand or resting it against
                      your body. If the load requires both hands, a second person should be used.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>One step at a time:</strong> Place both feet on each step before
                      moving to the next. Do not skip steps or rush. Pause on landings to rest if
                      the carry is long.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Going down is more dangerous:</strong> Descending stairs while
                      carrying is riskier than ascending because gravity is pulling both you and
                      the load forward and downward. Go slowly and use the handrail.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Slopes &amp; Ramps</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Stay on the uphill side:</strong> When moving a wheeled load on a
                      slope, always position yourself on the uphill side so the load cannot roll
                      back onto you.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Control the speed:</strong> Going downhill, the load will want to
                      accelerate. Use a controlled descent &mdash; keep your weight behind the load
                      and use the brake if the trolley has one. Never let a wheeled load run away
                      from you.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Chock wheels on slopes:</strong> If you need to stop on a slope,
                      chock the wheels or engage the brake immediately. A loaded trolley on a slope
                      will roll if left unsecured.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Wet or Contaminated Stairs</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Construction-site stairways are frequently wet, dusty, or contaminated with
                  building materials. This dramatically reduces the grip between your footwear and
                  the stair surface. If stairs are wet or contaminated, clean them before carrying
                  loads on them, or use an alternative route. Ensure your safety boots have
                  adequate tread. Report hazardous stairway conditions to your site supervisor
                  immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Using Mechanical Aids */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">05</span>
              Using Mechanical Aids Effectively
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Mechanical aids do not eliminate manual handling risk &mdash; they reduce it. You
                still need correct technique when using trolleys, sack trucks, and other equipment.
                Poorly used mechanical aids can create new hazards.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Common Mechanical Aids</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-500/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-2">Platform Trolleys</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Push at waist height using both hands
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Do not overload &mdash; check the rated capacity
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Secure the load to prevent it sliding off
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-2">Sack Trucks</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Use the foot brace to tilt the load back smoothly
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Strap tall or unstable loads to the frame
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Keep the load tilted back at about 45 degrees for travel
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-2">Cable Drum Stands</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Eliminates the need to manually rotate heavy drums
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Ensure the stand is rated for the drum weight
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Position on level ground and secure before use
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-2">
                      Stair-Climbing Trolleys
                    </h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Tri-star wheels designed for stair use
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Reduces the need to lift heavy items up or down stairs
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Requires training &mdash; do not use without instruction
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Key Numbers to Remember
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">20 kg</p>
                    <p className="text-white/60 text-xs mt-1">
                      Starting force
                      <br />
                      (men)
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">10 kg</p>
                    <p className="text-white/60 text-xs mt-1">
                      Sustained force
                      <br />
                      (men)
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">10 m</p>
                    <p className="text-white/60 text-xs mt-1">
                      Use a trolley
                      <br />
                      beyond this
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">45&deg;</p>
                    <p className="text-white/60 text-xs mt-1">
                      Sack truck
                      <br />
                      tilt angle
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
          <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Kinetic Lifting
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-2-section-3">
              Next: Team Handling
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
