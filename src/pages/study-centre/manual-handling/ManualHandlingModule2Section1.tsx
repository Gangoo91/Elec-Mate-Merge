import {
  ArrowLeft,
  Dumbbell,
  CheckCircle,
  AlertTriangle,
  Target,
  Footprints,
  Hand,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'kinetic-lift-start',
    question:
      'What is the very first step you should take before physically lifting any load?',
    options: [
      'Bend your knees and grip the load',
      'Plan the lift &mdash; assess the load, route, and destination',
      'Ask a colleague to help you',
      'Put on gloves and safety boots',
    ],
    correctIndex: 1,
    explanation:
      'The first step of the kinetic lifting technique is always to plan the lift. Before you touch the load, you should assess its weight, shape, and stability; check your route for obstacles; identify where you will set it down; and decide whether you need help or mechanical aids. Planning prevents the majority of manual handling injuries.',
  },
  {
    id: 'centre-of-gravity',
    question:
      'Why should you keep the load as close to your body as possible during a lift?',
    options: [
      'It makes the load lighter',
      'It keeps the load&rsquo;s centre of gravity within your base of support, reducing spinal stress',
      'It prevents the load from slipping',
      'It is required by the Manual Handling Operations Regulations',
    ],
    correctIndex: 1,
    explanation:
      'Keeping the load close to your body ensures that the combined centre of gravity (yours plus the load&rsquo;s) stays within your base of support. The further a load is held from your body, the greater the leverage force on your lower back. At arm&rsquo;s length, the effective strain on your lumbar spine can be up to 10 times the actual weight of the load.',
  },
  {
    id: 'twisting-during-lift',
    question:
      'What should you do if you need to change direction while carrying a load?',
    options: [
      'Twist your upper body while keeping your feet planted',
      'Lean to one side and pivot on one foot',
      'Move your feet to turn your whole body &mdash; never twist at the waist',
      'Set the load down, reposition yourself, then pick it up again',
    ],
    correctIndex: 2,
    explanation:
      'Twisting the spine under load is one of the most common causes of back injury during manual handling. The intervertebral discs are weakest when subjected to combined compression and rotation. Instead of twisting, you should move your feet to turn your whole body in the direction you need to face. This keeps the spine aligned and the load centred.',
  },
];

const faqs = [
  {
    question: 'What if the load is too heavy for me but others are managing it fine?',
    answer:
      'Individual capability varies significantly. The Manual Handling Operations Regulations 1992 require employers to consider individual factors including age, fitness, strength, and any pre-existing conditions. If a load feels too heavy for you, it is too heavy for you &mdash; regardless of whether others can manage it. You should never feel pressured to lift beyond your capability. Ask for help, use a mechanical aid, or split the load into smaller parts. Reporting that a task exceeds your capability is not a sign of weakness; it is a legal requirement under health and safety legislation.',
  },
  {
    question: 'Is there a maximum weight I am legally allowed to lift?',
    answer:
      'There is no single legal maximum weight limit in UK law. The HSE guideline figures (25 kg for men and 16 kg for women at waist height, close to the body) are risk-assessment thresholds, not absolute limits. Whether a load is safe to lift depends on many factors including posture, grip, distance from the body, frequency of lifting, the environment, and individual capability. The key legal requirement is that employers must carry out a risk assessment for any manual handling task that poses a risk of injury, and they must reduce that risk so far as is reasonably practicable.',
  },
  {
    question: 'Should I wear a back support belt when lifting?',
    answer:
      'The HSE does not recommend the routine use of back support belts (lumbar belts) for manual handling. Research has not shown them to be effective at preventing back injuries, and they can create a false sense of security that encourages people to lift loads that are too heavy. They may also reduce core muscle activation over time, potentially weakening the muscles that naturally support the spine. The most effective protection comes from proper lifting technique, appropriate risk assessment, and the use of mechanical aids where needed.',
  },
  {
    question: 'What should I do if I feel a twinge or pain while lifting?',
    answer:
      'Stop the lift immediately if it is safe to do so. If you are mid-lift and cannot safely set the load down alone, call for help. Never try to push through pain &mdash; a minor twinge can quickly become a serious injury if you continue lifting. Set the load down gently, report the incident to your supervisor, and seek medical advice if the pain persists. Under RIDDOR, injuries that result in more than seven days of incapacity must be reported to the HSE. Even minor pain should be documented in your site accident book.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'How many steps are there in the kinetic lifting technique?',
    options: ['4', '6', '8', '10'],
    correctAnswer: 2,
    explanation:
      'The kinetic lifting technique consists of 8 steps: (1) Plan the lift, (2) Position your feet, (3) Bend your knees, (4) Get a firm grip, (5) Keep the load close, (6) Lift smoothly using your legs, (7) Avoid twisting, (8) Set down carefully. Each step builds on the previous one to create a safe, controlled movement.',
  },
  {
    id: 2,
    question: 'What is the correct foot position when preparing to lift?',
    options: [
      'Feet together for maximum balance',
      'Feet shoulder-width apart with one foot slightly forward',
      'Feet as wide apart as possible',
      'Standing on tiptoes to get closer to the load',
    ],
    correctAnswer: 1,
    explanation:
      'Your feet should be shoulder-width apart with one foot slightly forward (a split stance). This creates a stable base of support and allows you to transfer your weight smoothly from the back foot to the front foot as you lift. Feet together gives poor stability; feet too wide apart restricts movement.',
  },
  {
    id: 3,
    question: 'What is the "power zone" in manual handling?',
    options: [
      'The area directly behind you where you have the most strength',
      'The zone between your knees and shoulders, close to your body',
      'The point at which a load becomes too heavy to lift safely',
      'The maximum distance you should carry a load',
    ],
    correctAnswer: 1,
    explanation:
      'The power zone is the area between your knees and shoulders, close to your body. This is where your muscles are at their strongest and your spine is under the least stress. Lifting, lowering, and carrying within this zone significantly reduces the risk of injury. Loads handled above shoulder height or below knee level place much greater strain on the body.',
  },
  {
    id: 4,
    question:
      'Why should you bend your knees rather than your back when picking up a load from the ground?',
    options: [
      'Bending the back is physically impossible',
      'Bending the knees uses the powerful leg muscles and keeps the spine in a neutral position',
      'It makes you look more professional on site',
      'Bending the back is only dangerous if the load is over 25 kg',
    ],
    correctAnswer: 1,
    explanation:
      'Bending at the knees (squatting) allows you to use the large, powerful muscles of the thighs (quadriceps and gluteals) to generate the lifting force, while keeping the spine in a neutral, upright position. Bending at the waist with straight legs forces the smaller muscles of the lower back to do the work, and places enormous compressive and shear forces on the lumbar discs &mdash; the most common site of manual handling injuries.',
  },
  {
    id: 5,
    question: 'What does "base of support" mean in the context of lifting?',
    options: [
      'The floor surface you are standing on',
      'The area enclosed by your feet and the ground between them',
      'The bottom of the load you are lifting',
      'The mechanical aid supporting the load',
    ],
    correctAnswer: 1,
    explanation:
      'Your base of support is the area enclosed by your feet and the space between them on the ground. For a stable lift, your centre of gravity (and the combined centre of gravity of you plus the load) must remain within this base. A wider stance or split stance increases your base of support, giving you more stability during the lift.',
  },
  {
    id: 6,
    question:
      'Which of the following is a common lifting error that increases the risk of back injury?',
    options: [
      'Keeping the load close to the body',
      'Using a smooth, controlled lifting motion',
      'Jerking or snatching the load upwards quickly',
      'Positioning one foot slightly ahead of the other',
    ],
    correctAnswer: 2,
    explanation:
      'Jerking or snatching a load creates sudden, high forces on the spine that are far greater than those produced by a smooth, controlled lift. A sudden acceleration multiplies the effective weight of the load and can cause disc injuries, muscle tears, or ligament sprains. Always lift smoothly and steadily, accelerating gradually.',
  },
  {
    id: 7,
    question: 'At what point should you reassess whether you need help with a lift?',
    options: [
      'Only if you injure yourself',
      'After you have already lifted the load',
      'During the planning stage, before you start the lift',
      'Only if your supervisor tells you to',
    ],
    correctAnswer: 2,
    explanation:
      'The planning stage is the critical point for deciding whether you need assistance. Before touching the load, you should assess its weight, shape, and stability; check your grip options; evaluate the route and destination; and honestly consider your own capability. If there is any doubt, get help before you start &mdash; not after you are already struggling with the load.',
  },
  {
    id: 8,
    question:
      'What is the approximate multiplier of spinal stress when a 10 kg load is held at arm&rsquo;s length compared to close to the body?',
    options: [
      'The same stress &mdash; the load weighs 10 kg either way',
      'Approximately 2 times the stress',
      'Approximately 5 times the stress',
      'Approximately 10 times the stress',
    ],
    correctAnswer: 3,
    explanation:
      'Due to the lever-arm effect, holding a 10 kg load at arm&rsquo;s length can place approximately 10 times the compressive force on the lumbar spine compared to holding the same load close to the body. This is because the distance from the load to the spine acts as a lever &mdash; the greater the distance, the greater the moment (turning force) that the back muscles must counteract to keep you upright.',
  },
];

export default function ManualHandlingModule2Section1() {
  useSEO({
    title: 'The Kinetic Lifting Technique | Manual Handling Module 2.1',
    description:
      'Learn the 8-step kinetic lifting technique, base of support, centre of gravity, power zone, and common lifting errors for safe manual handling on site.',
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
          <Dumbbell className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            The Kinetic Lifting Technique
          </h1>
          <p className="text-white/80 max-w-xl mx-auto leading-relaxed">
            The eight-step safe lift, base of support, centre of gravity, the power zone, and
            common lifting errors &mdash; the foundation of every safe manual handling operation
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
                    <strong>Plan first:</strong> Assess the load, route, and destination before
                    touching anything.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Stable stance:</strong> Feet shoulder-width apart, one foot slightly
                    forward.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Bend knees, not back:</strong> Use your legs &mdash; they are your
                    strongest muscles.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Keep it close:</strong> The nearer the load is to your body, the less
                    strain on your spine.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Never twist:</strong> Move your feet to change direction, not your
                    waist.
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
                    <strong>Power zone:</strong> Lift, carry, and set down between knee and
                    shoulder height.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Firm grip:</strong> Use the full hand, not just fingertips &mdash;
                    test the grip before committing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Smooth motion:</strong> Never jerk or snatch &mdash; accelerate
                    gradually.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Set down carefully:</strong> The lowering phase causes just as many
                    injuries as the lift.
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
                Describe all eight steps of the kinetic lifting technique in the correct order
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Explain the concepts of base of support and centre of gravity and how they affect
                lifting safety
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Identify the power zone and explain why handling loads within it reduces injury
                risk
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Recognise common lifting errors and explain the specific injury risks each one
                creates
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Apply the kinetic lifting technique to typical electrical trade tasks such as
                lifting distribution boards, cable drums, and tool bags
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: Why Technique Matters */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">01</span>
              Why Technique Matters
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Back injuries are the single most common type of workplace injury in the UK
                construction and electrical industries. The majority of these injuries are not
                caused by lifting extremely heavy loads &mdash; they are caused by{' '}
                <strong>poor technique</strong> applied repeatedly to moderate loads. A 15&nbsp;kg
                distribution board lifted incorrectly every day for a year will cause far more
                cumulative damage than a single heavy lift performed with proper form.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Definition: Kinetic Lifting
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  <strong className="text-white">Kinetic lifting</strong> (sometimes called the
                  &ldquo;kinetic method&rdquo; or &ldquo;correct manual handling technique&rdquo;)
                  is a systematic approach to lifting that uses the body&rsquo;s natural mechanics
                  to minimise stress on the spine. It relies on the powerful muscles of the legs
                  and buttocks to generate the lifting force, while keeping the spine in a neutral,
                  upright position throughout the movement. The word &ldquo;kinetic&rdquo; refers
                  to the smooth, continuous motion that characterises a safe lift.
                </p>
              </div>

              <p className="leading-relaxed">
                The kinetic lifting technique is not just theory &mdash; it is the practical
                foundation of every safe manual handling operation you will perform on site.
                Whether you are lifting a consumer unit off a pallet, picking up a toolbox, or
                lowering cable drums into position, the same eight steps apply. Mastering this
                technique protects your back for the duration of your career.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">The Cost of Poor Technique</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  According to the HSE, musculoskeletal disorders (MSDs) account for approximately
                  6.6 million working days lost per year in the UK. Back injuries alone cost the
                  construction industry hundreds of millions of pounds annually in lost
                  productivity, compensation claims, and healthcare costs. For individual workers,
                  a chronic back injury can mean reduced earning capacity, chronic pain, and
                  inability to continue in the trade. The kinetic lifting technique is your primary
                  defence against these outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The 8-Step Safe Lift */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">02</span>
              The Eight-Step Safe Lift
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                The kinetic lifting technique can be broken down into eight distinct steps. Each
                step must be performed in order. Skipping or rushing any step significantly
                increases the risk of injury.
              </p>

              {/* 8-Step Safe Lift Diagram */}
              <div className="bg-white/5 border border-emerald-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  8-Step Safe Lift
                </h3>
                <div className="space-y-3">
                  {/* Step 1 */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">
                          <Target className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />
                          Plan the Lift
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Before touching the load, assess its{' '}
                          <strong className="text-white">weight, shape, and stability</strong>.
                          Check for sharp edges, hot surfaces, or shifting contents. Plan your
                          route &mdash; look for obstacles, uneven surfaces, closed doors, and
                          stairs. Identify where you will set the load down. Decide whether you
                          need help or a mechanical aid. If the load has no handles, plan how you
                          will grip it.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">
                          <Footprints className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />
                          Position Your Feet
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Stand with your feet{' '}
                          <strong className="text-white">shoulder-width apart</strong>, with one
                          foot slightly forward of the other (a split stance). This creates a wide,
                          stable base of support. Point your leading foot in the direction you
                          intend to move. Position yourself as close to the load as possible
                          &mdash; directly in front of it, not to the side.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">Bend Your Knees</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Bend at the <strong className="text-white">knees and hips</strong>, not
                          at the waist. Lower yourself by squatting down, keeping your back
                          straight and your head up. Your back should remain in a{' '}
                          <strong className="text-white">neutral, upright position</strong>{' '}
                          throughout. A slight forward lean is acceptable, but you should never
                          round or hunch your back. Think of it as sitting down into a chair rather
                          than bending forward.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 4 */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">
                          <Hand className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />
                          Get a Firm Grip
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Grip the load using the{' '}
                          <strong className="text-white">full palm of both hands</strong>, not just
                          your fingertips. Use handles where available. If there are no handles,
                          grip opposite corners or the bottom edge diagonally. Test the grip before
                          committing to the lift &mdash; try a small tilt or &ldquo;corner
                          lift&rdquo; to check the weight and ensure your grip is secure. If the
                          load is slippery or difficult to hold, consider gloves or alternative
                          grip points.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 5 */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">5</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">
                          Keep the Load Close
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Before you lift, pull the load{' '}
                          <strong className="text-white">
                            as close to your body as possible
                          </strong>
                          . The load should be in contact with your body or as near to it as the
                          shape allows. The closer the load is to your spine, the less leverage
                          force it exerts on your lower back. At arm&rsquo;s length, the effective
                          strain on your lumbar spine can be up to{' '}
                          <strong className="text-white">10 times</strong> the actual weight of
                          the load.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 6 */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">6</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">
                          Lift Smoothly Using Your Legs
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Straighten your legs to lift the load, driving upwards through your{' '}
                          <strong className="text-white">thighs and buttocks</strong>. The lifting
                          force should come entirely from your legs, not your back. Keep the
                          movement <strong className="text-white">smooth and controlled</strong>{' '}
                          &mdash; never jerk, snatch, or accelerate suddenly. Keep your back
                          straight and your head up throughout the lift. Breathe out as you lift.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 7 */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">7</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">
                          Avoid Twisting &mdash; Move Your Feet
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          If you need to change direction,{' '}
                          <strong className="text-white">move your feet</strong> to turn your whole
                          body. Never twist at the waist while holding a load. Twisting under load
                          is one of the most dangerous movements for the spine because the
                          intervertebral discs are weakest when subjected to combined compression
                          and rotation. Take small steps to reposition rather than pivoting.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 8 */}
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">8</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">
                          <ShieldCheck className="h-4 w-4 inline-block mr-1.5 -mt-0.5" />
                          Set Down Carefully
                        </h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Reverse the lifting process to set the load down. Bend your knees, keep
                          your back straight, and lower the load in a{' '}
                          <strong className="text-white">controlled manner</strong>. Position the
                          load exactly where you want it before releasing your grip &mdash; do not
                          drop it or let it slide. Trapped fingers are a common injury during the
                          setting-down phase. Ensure your fingers are clear before releasing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-white/50 text-xs text-center mt-4 italic">
                  Every safe lift follows these eight steps in sequence. Practice until they become
                  second nature.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Base of Support & Centre of Gravity */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">03</span>
              Base of Support &amp; Centre of Gravity
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Two biomechanical concepts underpin the kinetic lifting technique:{' '}
                <strong>base of support</strong> and{' '}
                <strong>centre of gravity</strong>. Understanding these concepts explains{' '}
                <em>why</em> the technique works, not just <em>how</em> to perform it.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Definition: Base of Support
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Your <strong className="text-white">base of support</strong> is the area on the
                  ground enclosed by your feet and the space between them. Think of it as the
                  footprint of a rectangle drawn around both feet. A wider stance creates a larger
                  base of support and greater stability. A narrow stance (feet close together)
                  creates a small base and makes you easy to topple.
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Definition: Centre of Gravity
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Your <strong className="text-white">centre of gravity</strong> is the single
                  point at which your entire body weight (plus any load you are carrying) is
                  concentrated. When standing upright without a load, your centre of gravity is
                  roughly at navel height. When you pick up a load, the combined centre of gravity
                  shifts towards the load. For a stable lift, this combined centre of gravity must
                  remain <strong className="text-white">within your base of support</strong>. If
                  it moves outside this base, you will lose balance.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-2">
                  How They Work Together
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Wide stance</strong> = larger base of support = more room for the
                      centre of gravity to shift without losing balance
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Load close to body</strong> = centre of gravity stays near your
                      spine = less spinal stress and better balance
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Load at arm&rsquo;s length</strong> = centre of gravity moves
                      forward = more spinal stress, less stability, higher injury risk
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Split stance</strong> (one foot forward) = stability in both the
                      forward and sideways directions = ideal for lifting and carrying
                    </div>
                  </li>
                </ul>
              </div>

              <p className="leading-relaxed">
                On a construction site, surfaces are often uneven, cluttered, or slippery. This
                makes a stable base of support even more critical. Before every lift, check the
                ground beneath your feet. Clear any debris, avoid standing on cables or offcuts,
                and ensure you have firm, level footing. If the surface is wet or icy, take extra
                care to widen your stance and slow your movements.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: The Power Zone */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">04</span>
              The Power Zone
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                The <strong>power zone</strong> (also called the &ldquo;comfort zone&rdquo; or
                &ldquo;strike zone&rdquo;) is the region of space in which your body can generate
                the most force with the least strain. It extends from approximately{' '}
                <strong>mid-thigh height to chest height</strong>, and from the front of your body
                to about arm&rsquo;s length ahead (though closer is always better).
              </p>

              <div className="bg-white/5 border border-emerald-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  Power Zone
                </h3>
                <div className="flex flex-col items-center">
                  {/* Body outline with zones */}
                  <div className="relative w-40 sm:w-48 h-72 sm:h-80">
                    {/* Head */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/20 bg-white/5" />
                    {/* Body */}
                    <div className="absolute left-1/2 top-[14%] -translate-x-1/2 w-16 sm:w-20 bottom-[30%] border-2 border-white/20 rounded-lg bg-white/5" />
                    {/* Legs */}
                    <div className="absolute left-[30%] bottom-0 w-4 sm:w-5 h-[32%] border-2 border-white/20 rounded-b-lg bg-white/5" />
                    <div className="absolute right-[30%] bottom-0 w-4 sm:w-5 h-[32%] border-2 border-white/20 rounded-b-lg bg-white/5" />
                    {/* Power zone overlay */}
                    <div className="absolute left-0 right-0 top-[22%] bottom-[28%] border-2 border-emerald-400/60 bg-emerald-500/15 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-300 text-xs sm:text-sm font-semibold text-center leading-tight px-2">
                        Power
                        <br />
                        Zone
                      </span>
                    </div>
                    {/* Shoulder label */}
                    <div className="absolute -right-2 sm:right-0 top-[20%] flex items-center gap-1">
                      <div className="w-4 h-0.5 bg-emerald-400/40" />
                      <span className="text-emerald-400/80 text-[9px] sm:text-[10px]">
                        Shoulders
                      </span>
                    </div>
                    {/* Knee label */}
                    <div className="absolute -right-2 sm:right-0 bottom-[26%] flex items-center gap-1">
                      <div className="w-4 h-0.5 bg-emerald-400/40" />
                      <span className="text-emerald-400/80 text-[9px] sm:text-[10px]">
                        Knees
                      </span>
                    </div>
                    {/* Danger zones */}
                    <div className="absolute left-0 right-0 top-[5%] h-[15%] border border-red-400/30 bg-red-500/10 rounded-t-lg flex items-center justify-center">
                      <span className="text-red-300/80 text-[9px] sm:text-[10px] font-medium">
                        High Risk
                      </span>
                    </div>
                    <div className="absolute left-0 right-0 bottom-[5%] h-[20%] border border-red-400/30 bg-red-500/10 rounded-b-lg flex items-center justify-center">
                      <span className="text-red-300/80 text-[9px] sm:text-[10px] font-medium">
                        High Risk
                      </span>
                    </div>
                  </div>
                  <p className="text-white/50 text-xs text-center mt-3 italic max-w-xs leading-relaxed">
                    Handling loads within the power zone (between knees and shoulders) places the
                    least strain on your body. Above shoulders or below knees = high risk.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  Applying the Power Zone on Site
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Store materials at waist height</strong> where possible &mdash; use
                      workbenches, trestles, or mid-height shelving rather than floor-level or
                      overhead storage
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Use steps or a platform</strong> for loads that need to be placed
                      above shoulder height &mdash; never stretch overhead while holding a heavy
                      load
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Break the lift into stages</strong> &mdash; if a load must go from
                      floor level to above shoulder height, first lift it to a mid-height surface
                      (into the power zone), then reposition and lift again to the final height
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Carry loads at waist height</strong> &mdash; avoid carrying above
                      your chest or below your knees for any distance
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Common Lifting Errors */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">05</span>
              Common Lifting Errors
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Even people who know the correct technique can fall into bad habits, especially
                when tired, rushed, or working in awkward conditions. Being aware of the most
                common errors helps you recognise and correct them before they cause injury.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  <AlertTriangle className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Top Lifting Errors &amp; Their Risks
                </h3>
                <div className="space-y-4">
                  <div className="bg-red-500/5 border border-red-400/20 p-3 rounded-lg">
                    <h4 className="text-red-300 font-medium mb-1">
                      1. Bending at the waist with straight legs
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      This forces the small muscles of the lower back to do the work of the large
                      leg muscles. Compressive forces on the L4/L5 and L5/S1 discs increase
                      dramatically. This is the single most common cause of acute back injury
                      during lifting.
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-400/20 p-3 rounded-lg">
                    <h4 className="text-red-300 font-medium mb-1">
                      2. Twisting while lifting or carrying
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      The intervertebral discs are weakest when subjected to combined compression
                      and rotation. Twisting under load can cause disc herniation (a
                      &ldquo;slipped disc&rdquo;), which may require surgery and months of
                      recovery. Always move your feet to turn.
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-400/20 p-3 rounded-lg">
                    <h4 className="text-red-300 font-medium mb-1">
                      3. Holding the load away from the body
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Due to the lever-arm effect, holding a 10&nbsp;kg load at arm&rsquo;s length
                      can create the equivalent of 100&nbsp;kg of compressive force on the lumbar
                      spine. Always pull the load tight against your body before lifting.
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-400/20 p-3 rounded-lg">
                    <h4 className="text-red-300 font-medium mb-1">
                      4. Jerking or snatching the load
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      A sudden, jerky lift generates peak forces far higher than a smooth,
                      controlled lift of the same load. The acceleration multiplies the effective
                      weight. Always lift smoothly and steadily.
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-400/20 p-3 rounded-lg">
                    <h4 className="text-red-300 font-medium mb-1">
                      5. Failing to test the load first
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Attempting a full lift without first testing the weight can result in sudden
                      overloading. Always tilt or &ldquo;corner lift&rdquo; the load first to
                      gauge its weight before committing to a full lift.
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-400/20 p-3 rounded-lg">
                    <h4 className="text-red-300 font-medium mb-1">
                      6. Lifting with an obstructed view
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Carrying a load so large that you cannot see where you are going leads to
                      trips, collisions, and falls. If you cannot see over or around the load, get
                      help, use a trolley, or have a colleague guide you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Fatigue Degrades Technique
                  </h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Research shows that lifting technique deteriorates significantly as fatigue
                  increases. After repeated lifts, people unconsciously begin bending at the waist,
                  holding loads further from the body, and moving faster. This is why the HSE
                  emphasises reducing the frequency and duration of manual handling tasks, not just
                  the weight. If you are performing repetitive lifting, take regular breaks and
                  rotate tasks where possible. If you notice your technique slipping, stop and
                  rest.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Electrical Trade Applications */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">06</span>
              Applying the Technique on Site
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                The kinetic lifting technique applies to every manual handling task you will
                encounter as an electrician. Here are some common trade-specific scenarios and how
                to apply the eight steps.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">Common Electrical Lifting Tasks</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-500/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-2">Distribution Boards</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Can weigh 15&ndash;40&nbsp;kg fully loaded &mdash; always check weight
                          before lifting
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Grip the frame, not the door or loose components
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Consider a two-person lift for boards over 20&nbsp;kg
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-2">Cable Drums</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Heavy and awkward shape &mdash; roll rather than carry where possible
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Use a drum stand or axle for controlled unwinding
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Team lift needed for drums over 25&nbsp;kg
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-2">Tool Bags &amp; Boxes</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Deceptively heavy when fully loaded &mdash; regularly audit contents
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Carry with both hands or use a bag with a shoulder strap
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Split tools across multiple lighter bags for long carries
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-400/20 p-3 rounded-lg">
                    <h4 className="text-emerald-300 font-medium mb-2">Conduit &amp; Trunking</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Long loads &mdash; balance point and doorway clearance are key
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Carry on the shoulder for longer distances, keeping the front end tilted
                          slightly up
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="leading-relaxed">
                          Two people for lengths over 3 metres or in confined spaces
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
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">8</p>
                    <p className="text-white/60 text-xs mt-1">
                      Steps in
                      <br />
                      the safe lift
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">10&times;</p>
                    <p className="text-white/60 text-xs mt-1">
                      Spinal stress
                      <br />
                      at arm&rsquo;s length
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">25 kg</p>
                    <p className="text-white/60 text-xs mt-1">
                      HSE guideline
                      <br />
                      (men, waist)
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">16 kg</p>
                    <p className="text-white/60 text-xs mt-1">
                      HSE guideline
                      <br />
                      (women, waist)
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
          <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-2-section-2">
              Next: Pushing, Pulling &amp; Carrying
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
