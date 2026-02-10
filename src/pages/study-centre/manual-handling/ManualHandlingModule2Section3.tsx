import {
  ArrowLeft,
  Users,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  UserCheck,
  Megaphone,
  Ruler,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'team-leader-role',
    question: 'What is the primary role of the team leader during a team lift?',
    options: [
      'To lift the heaviest part of the load',
      'To coordinate the lift, give clear verbal commands, and ensure everyone lifts and lowers together',
      'To stand back and supervise without participating in the lift',
      'To document the lift for the risk assessment',
    ],
    correctIndex: 1,
    explanation:
      'The team leader&rsquo;s primary role is coordination: they plan the lift, brief the team, give clear verbal commands (&ldquo;Ready, steady, lift&rdquo;), and ensure everyone lifts, moves, and lowers in unison. The team leader usually participates in the lift as well, but their coordination role is the most important &mdash; without it, team members may lift at different times, creating sudden uneven loading that can cause injury.',
  },
  {
    id: 'max-team-size',
    question: 'What is the practical maximum team size for a manual team lift?',
    options: [
      '2 people',
      '3 people',
      '4 people',
      '8 people',
    ],
    correctIndex: 2,
    explanation:
      'The practical maximum for a coordinated manual team lift is approximately 4 people. Beyond this, coordination becomes extremely difficult &mdash; team members cannot all hear the leader&rsquo;s commands clearly, grip positions become cramped, and it is nearly impossible to ensure everyone lifts and lowers at exactly the same time. If a load requires more than 4 people, a mechanical lifting aid should be used instead.',
  },
  {
    id: 'verbal-commands',
    question:
      'What is the standard verbal command sequence for a team lift in the UK?',
    options: [
      '&ldquo;One, two, three, go!&rdquo;',
      '&ldquo;Ready, steady, lift&rdquo;',
      '&ldquo;On my count &mdash; now!&rdquo;',
      '&ldquo;Lift when you are ready&rdquo;',
    ],
    correctIndex: 1,
    explanation:
      'The standard UK verbal command sequence is &ldquo;Ready, steady, lift&rdquo;. &ldquo;Ready&rdquo; tells the team to prepare and check their grip. &ldquo;Steady&rdquo; signals that the lift is about to happen. &ldquo;Lift&rdquo; is the command to apply force simultaneously. This three-part sequence gives the team time to prepare and ensures everyone acts at the same moment. Avoid ambiguous commands like &ldquo;go&rdquo; or &ldquo;now&rdquo; which can be misheard.',
  },
];

const faqs = [
  {
    question: 'Does team lifting double the weight we can safely handle?',
    answer:
      'No. A common misconception is that two people can safely lift twice what one person can manage alone. In practice, a two-person team can typically handle only about 1.6 to 1.7 times the individual capacity. This is because coordination losses mean both people never apply their full force at exactly the same moment, and the awkwardness of sharing a grip reduces each person&rsquo;s effective strength. The HSE recommends reducing the expected capacity of a team lift by approximately one-third compared to the sum of individual capacities.',
  },
  {
    question: 'What should I do if I feel the load is too heavy during a team lift?',
    answer:
      'Communicate immediately. Say &ldquo;Stop&rdquo; or &ldquo;Down&rdquo; clearly and loudly so the entire team can hear. The team leader should then coordinate a controlled lowering of the load. Never try to push through if the load feels too heavy &mdash; if one person in the team is struggling, the others may be compensating without realising it, creating an uneven and unstable lift. After setting the load down, reassess: do you need more people, a different approach, or a mechanical aid?',
  },
  {
    question: 'Can team members of different heights safely lift together?',
    answer:
      'Yes, but height differences must be managed carefully. When team members are significantly different heights, the taller person will tend to bear more of the load because the load will naturally slope towards the shorter person. To compensate, the shorter person should be positioned at the higher end of the load (if there is one), or the team should use a carrying device (such as a pole through handles) that allows each person to carry at their own comfortable height. Very large height differences (more than about 15 cm) should be avoided for sustained carries.',
  },
  {
    question: 'Do we need a written plan for every team lift?',
    answer:
      'A formal written plan is not required for every team lift, but a verbal briefing is essential. Before every team lift, the team leader should brief the group on: what is being lifted, the estimated weight, how it will be gripped, the route and destination, the verbal commands to be used, and what to do if something goes wrong. For routine, repeated team lifts (such as regularly moving cable drums), the approach should be documented in the site-specific risk assessment. For one-off heavy or complex lifts, a written method statement is good practice.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'When should a team lift be used instead of a solo lift?',
    options: [
      'Only when the load weighs more than 50 kg',
      'When the load is too heavy, too bulky, or too awkward for one person to handle safely',
      'Only when a supervisor instructs you to',
      'Team lifts should always be avoided because they are more dangerous than solo lifts',
    ],
    correctAnswer: 1,
    explanation:
      'A team lift should be used whenever the load is too heavy, too bulky, or too awkward for one person to handle safely. There is no single weight threshold &mdash; the decision depends on the load&rsquo;s weight, size, shape, grip options, and the route to be taken, as well as the individual capabilities of the handler. If you have any doubt about managing a load alone, get help.',
  },
  {
    id: 2,
    question: 'What is the first thing the team leader should do before a team lift?',
    options: [
      'Grip the load and start lifting',
      'Brief the team on the load, the plan, the route, the commands, and what to do if something goes wrong',
      'Ask everyone to guess the weight of the load',
      'Check that everyone is wearing gloves',
    ],
    correctAnswer: 1,
    explanation:
      'Before any team lift, the team leader must brief the team. This includes: what the load is, its estimated weight, where it is going, the route, who will grip where, the verbal commands to be used, and the emergency procedure (usually &ldquo;Stop&rdquo; or &ldquo;Down&rdquo; to coordinate an emergency lowering). This briefing ensures everyone understands the plan and their role.',
  },
  {
    id: 3,
    question:
      'Approximately what percentage of individual capacity is lost when two people lift together?',
    options: [
      'No capacity is lost &mdash; two people can lift exactly twice as much',
      'Approximately 10% is lost',
      'Approximately one-third (33%) is lost due to coordination inefficiency',
      'Approximately 50% is lost',
    ],
    correctAnswer: 2,
    explanation:
      'When two people lift together, approximately one-third of the combined individual capacity is lost due to coordination inefficiency. This means two people who can each safely lift 25 kg alone should not be expected to safely team-lift 50 kg together &mdash; a more realistic safe limit would be approximately 33 kg (50 kg minus one-third). This coordination loss increases as more people are added to the team.',
  },
  {
    id: 4,
    question:
      'What verbal command should a team member use if they need the team to lower the load immediately?',
    options: [
      '&ldquo;Help!&rdquo;',
      '&ldquo;Stop&rdquo; or &ldquo;Down&rdquo;',
      '&ldquo;Wait a moment&rdquo;',
      'No verbal command &mdash; just release the load',
    ],
    correctAnswer: 1,
    explanation:
      'Any team member who needs the team to stop or lower the load immediately should shout &ldquo;Stop&rdquo; or &ldquo;Down&rdquo; clearly and loudly. This must be agreed in advance during the briefing so everyone recognises the command instantly. Never release a load without warning &mdash; this transfers the full weight to the other team members, who are not prepared for it, and can cause serious injury.',
  },
  {
    id: 5,
    question: 'Why is 4 people considered the practical maximum for a manual team lift?',
    options: [
      'It is a legal requirement under the Manual Handling Operations Regulations',
      'More than 4 people cannot physically fit around a single load',
      'Beyond 4 people, coordination becomes too difficult &mdash; commands are misheard and timing breaks down',
      'The HSE does not allow more than 4 people to lift together',
    ],
    correctAnswer: 2,
    explanation:
      'Beyond approximately 4 people, a coordinated manual lift becomes impractical. Team members cannot all hear the leader&rsquo;s commands clearly, grip positions become cramped, and it is nearly impossible to ensure everyone applies force at exactly the same time. Each additional person increases the coordination loss, so the benefit of extra hands diminishes rapidly. If a load needs more than 4 people, a mechanical aid is the appropriate solution.',
  },
  {
    id: 6,
    question:
      'When carrying a long load (such as a 5-metre length of cable tray), how should the team be arranged?',
    options: [
      'All team members on one side of the load',
      'One person at each end, facing the same direction of travel, with the front person navigating',
      'All team members at the centre of the load',
      'Each team member should carry the load independently for part of the distance',
    ],
    correctAnswer: 1,
    explanation:
      'For long loads, team members should be positioned at each end (or at evenly spaced intervals for very long loads). Everyone should face the same direction of travel. The person at the front navigates (calling out obstacles, turns, and doorways), while the person at the rear controls the pace. The team leader can be at either position but must be able to communicate with the whole team. The load should be balanced &mdash; carried at a point where neither end is significantly heavier.',
  },
  {
    id: 7,
    question: 'What is the main risk if team members lift at different times during a team lift?',
    options: [
      'The load will move sideways',
      'One or more people will bear a disproportionate share of the weight, potentially causing injury',
      'The load will become lighter',
      'There is no additional risk &mdash; as long as the load gets lifted',
    ],
    correctAnswer: 1,
    explanation:
      'If team members lift at different times (asynchronous lifting), the person who lifts first bears the full weight of the load momentarily, before the others catch up. This sudden overloading can cause acute back injury to the person who lifts early, or to the person who lifts late and must rapidly take on their share. This is precisely why coordinated verbal commands (&ldquo;Ready, steady, lift&rdquo;) are essential.',
  },
  {
    id: 8,
    question:
      'Before a team lift, the leader should ask the team to do a "practice run". What does this involve?',
    options: [
      'Lifting the load to full height and then putting it back down',
      'Going through the motions without actually lifting &mdash; gripping, adjusting positions, and walking the route',
      'Timing how long the lift takes',
      'Having each team member lift the load individually to test their strength',
    ],
    correctAnswer: 1,
    explanation:
      'A practice run (or "dry run") involves going through the motions of the lift without actually committing to it: the team takes their grip positions, the leader gives the commands, and the team rehearses the movements (but only tilts or slightly lifts the load to test the weight). The team also walks the planned route to check for obstacles. This identifies problems before the actual lift and gives everyone confidence in the plan.',
  },
];

export default function ManualHandlingModule2Section3() {
  useSEO({
    title: 'Team Handling & Communication | Manual Handling Module 2.3',
    description:
      'Learn when and how to perform team lifts, verbal commands, the role of the team leader, maximum team sizes, height differences, and carrying long loads like cable trays and conduit.',
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
          <Users className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 3
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Team Handling &amp; Communication
          </h1>
          <p className="text-white/80 max-w-xl mx-auto leading-relaxed">
            When team lifts are needed, planning and briefing, verbal commands, maximum team
            sizes, height and strength differences, and carrying long loads
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
                    <strong>Designate a leader:</strong> One person plans, briefs, and calls the
                    commands.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Standard command:</strong> &ldquo;Ready, steady, lift.&rdquo; Everyone
                    lifts on &ldquo;lift&rdquo;.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Max ~4 people:</strong> Beyond this, coordination breaks down. Use a
                    mechanical aid.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Practice first:</strong> Dry-run the lift before committing to it.
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
                    <strong>Long loads:</strong> One at each end, same direction, front person
                    navigates.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Height difference:</strong> Shorter person at the higher end; or use a
                    carrying pole.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Emergency stop:</strong> Any member calls &ldquo;Stop&rdquo; or
                    &ldquo;Down&rdquo; &mdash; never release without warning.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Capacity loss:</strong> Two people &#8800; twice the capacity. Expect
                    ~1/3 loss.
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
                Identify when a team lift is necessary rather than a solo lift or mechanical aid
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Describe the role of the team leader and the correct verbal command sequence
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Explain why coordination losses reduce effective team lifting capacity
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Plan and execute a safe team carry of long loads such as cable trays and conduit
                bundles
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                Manage height and strength differences within a lifting team
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: When Team Handling Is Needed */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">01</span>
              When Team Handling Is Needed
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Not every heavy load requires a team lift, and not every team lift is the right
                solution. The decision to use a team lift should be based on a quick mental risk
                assessment: can the load be handled safely by one person using the kinetic lifting
                technique? If not, can a mechanical aid (trolley, hoist, forklift) do the job
                instead? A team lift should be used when the load is too heavy, too bulky, or too
                awkward for one person, <strong>and</strong> mechanical aids are not available or
                practical.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-emerald-400">
                  <UserCheck className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Indicators That You Need a Team Lift
                </h3>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="leading-relaxed">
                      The load exceeds what one person can safely handle (considering weight,
                      shape, and grip)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="leading-relaxed">
                      The load is too long, wide, or bulky for one person to control (e.g. 6-metre
                      cable tray sections, large distribution boards)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="leading-relaxed">
                      The load has no adequate grip points for one person
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="leading-relaxed">
                      The route involves obstacles that require one person to navigate while the
                      other carries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="leading-relaxed">
                      The load is unstable or has shifting contents that need to be controlled
                      during movement
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Team Lifting Is Not a Substitute for Mechanical Aids
                  </h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  The hierarchy of control for manual handling is: (1) eliminate the need to
                  handle the load, (2) use mechanical aids, (3) reduce the risk through better
                  technique, lighter loads, or team handling. Team lifting should not be the
                  default solution for heavy loads &mdash; a trolley, hoist, or forklift is almost
                  always safer and more efficient. Team lifts are appropriate when mechanical aids
                  are genuinely not available, not practical for the specific task, or as a
                  short-term measure while better equipment is obtained.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Planning a Team Lift */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">02</span>
              Planning a Team Lift
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Every team lift must be planned and briefed before the load is touched. Even a
                quick two-person lift of a distribution board requires a brief conversation to
                agree on the approach. For heavier or more complex lifts, a more structured
                briefing is needed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  <MessageSquare className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  The Pre-Lift Briefing
                </h3>
                <p className="text-white/80 text-sm mb-3 leading-relaxed">
                  The team leader should cover the following points with the team before every
                  lift:
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">The Load</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          What are we lifting? How heavy is it (estimated or known)? Is it stable
                          or does it have shifting contents? Are there sharp edges, hot surfaces,
                          or other hazards?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">Grip Positions</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Where will each person grip the load? Grip positions should be evenly
                          spaced and balanced. Avoid having all hands on one side. Agree on handle
                          usage if the load has handles.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">Route &amp; Destination</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Where are we taking it? What obstacles are on the route (doorways,
                          stairs, other workers, uneven ground)? Where exactly will we set it down?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">Commands</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          We will use &ldquo;Ready, steady, lift&rdquo; to start. To stop or
                          lower, anyone can call &ldquo;Stop&rdquo; or &ldquo;Down&rdquo;.
                          Everyone must respond to these commands immediately.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-emerald-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">5</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-emerald-300 font-medium mb-1">Practice Run</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          For heavy or complex lifts, do a dry run: take grip positions, rehearse
                          the commands, tilt the load slightly to test the weight, and walk the
                          route. Fix any problems before the actual lift.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Verbal Commands & Communication */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">03</span>
              Verbal Commands &amp; Communication
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Clear, unambiguous verbal communication is the single most important factor in a
                safe team lift. Miscommunication &mdash; or no communication at all &mdash; is the
                leading cause of team-lift injuries. The team leader must be able to be heard by
                every member of the team.
              </p>

              {/* Team Lift Communication Sequence Diagram */}
              <div className="bg-white/5 border border-emerald-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  Team Lift Communication Sequence
                </h3>
                <div className="flex flex-col items-center gap-2">
                  {/* Phase 1: Brief */}
                  <div className="w-full max-w-md bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <MessageSquare className="h-4 w-4 text-emerald-300" />
                      <span className="text-emerald-300 font-semibold text-sm">
                        Phase 1: Brief
                      </span>
                    </div>
                    <p className="text-white/70 text-xs leading-relaxed">
                      Leader explains load, plan, route, grip positions, and commands
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="h-4 w-0.5 bg-emerald-400/40" />
                  {/* Phase 2: Position */}
                  <div className="w-full max-w-md bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-emerald-300" />
                      <span className="text-emerald-300 font-semibold text-sm">
                        Phase 2: Position
                      </span>
                    </div>
                    <p className="text-white/70 text-xs leading-relaxed">
                      Team takes grip positions. Leader checks everyone is ready.
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="h-4 w-0.5 bg-emerald-400/40" />
                  {/* Phase 3: Ready */}
                  <div className="w-full max-w-md bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Megaphone className="h-4 w-4 text-yellow-300" />
                      <span className="text-yellow-300 font-semibold text-sm">
                        &ldquo;READY&rdquo;
                      </span>
                    </div>
                    <p className="text-white/70 text-xs leading-relaxed">
                      Leader calls &ldquo;Ready&rdquo; &mdash; team confirms grip and stance
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="h-4 w-0.5 bg-emerald-400/40" />
                  {/* Phase 4: Steady */}
                  <div className="w-full max-w-md bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Megaphone className="h-4 w-4 text-yellow-300" />
                      <span className="text-yellow-300 font-semibold text-sm">
                        &ldquo;STEADY&rdquo;
                      </span>
                    </div>
                    <p className="text-white/70 text-xs leading-relaxed">
                      Team prepares to apply force &mdash; brace your legs
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="h-4 w-0.5 bg-emerald-400/40" />
                  {/* Phase 5: Lift */}
                  <div className="w-full max-w-md bg-emerald-500/20 border-2 border-emerald-400/50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Megaphone className="h-4 w-4 text-emerald-300" />
                      <span className="text-emerald-300 font-bold text-sm">
                        &ldquo;LIFT&rdquo;
                      </span>
                    </div>
                    <p className="text-white/70 text-xs leading-relaxed">
                      Everyone lifts simultaneously using their legs
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="h-4 w-0.5 bg-emerald-400/40" />
                  {/* Phase 6: Move & Lower */}
                  <div className="w-full max-w-md bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <UserCheck className="h-4 w-4 text-emerald-300" />
                      <span className="text-emerald-300 font-semibold text-sm">
                        Move &amp; Lower
                      </span>
                    </div>
                    <p className="text-white/70 text-xs leading-relaxed">
                      Leader guides route. To lower: &ldquo;Ready, steady, down.&rdquo;
                    </p>
                  </div>
                  {/* Emergency */}
                  <div className="mt-2 w-full max-w-md bg-red-500/10 border border-red-400/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-red-300" />
                      <span className="text-red-300 font-semibold text-sm">
                        Emergency: &ldquo;STOP&rdquo; / &ldquo;DOWN&rdquo;
                      </span>
                    </div>
                    <p className="text-white/70 text-xs leading-relaxed">
                      Any team member can call stop. Controlled lowering immediately.
                    </p>
                  </div>
                </div>
                <p className="text-white/50 text-xs text-center mt-4 italic">
                  The three-part command sequence ensures the whole team acts simultaneously.
                  Never release a load without warning.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-2">
                  Why &ldquo;Ready, Steady, Lift&rdquo;?
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  The three-part command sequence is deliberately designed to give the team time
                  to prepare. &ldquo;Ready&rdquo; tells everyone the lift is about to happen and
                  to finalise their grip. &ldquo;Steady&rdquo; signals that the command to lift is
                  imminent &mdash; brace your legs and prepare to apply force. &ldquo;Lift&rdquo;
                  is the action word &mdash; everyone applies force at the same moment. Avoid
                  counting (&ldquo;1, 2, 3&rdquo;) because people disagree on whether to lift on
                  &ldquo;3&rdquo; or after &ldquo;3&rdquo;, which causes dangerous asynchronous
                  lifting.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Never Release Without Warning
                  </h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  If you need to stop or let go during a team lift, you{' '}
                  <strong className="text-white">must</strong> warn the rest of the team first by
                  calling &ldquo;Stop&rdquo; or &ldquo;Down&rdquo;. Releasing a shared load
                  without warning transfers your share of the weight instantly to the other team
                  members, who are not prepared for the sudden increase. This can cause acute back
                  injuries, crushed fingers, or dropped loads. Even if you are in pain, maintain
                  your grip until the team has lowered the load together.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Team Size & Coordination Losses */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">04</span>
              Team Size &amp; Coordination Losses
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Adding more people to a lift does not increase capacity proportionally. Each
                additional person introduces coordination losses &mdash; the difficulty of
                ensuring everyone applies the right amount of force at exactly the right moment
                increases with every extra pair of hands.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  <Ruler className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Coordination Loss by Team Size
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-3 text-center">
                    <p className="text-emerald-400 font-bold text-2xl">2 people</p>
                    <p className="text-white/60 text-sm mt-1">
                      ~1.6&times; individual capacity
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      (~1/3 coordination loss)
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-3 text-center">
                    <p className="text-emerald-400 font-bold text-2xl">3 people</p>
                    <p className="text-white/60 text-sm mt-1">
                      ~2.2&times; individual capacity
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      (increasing coordination difficulty)
                    </p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3 text-center">
                    <p className="text-yellow-400 font-bold text-2xl">4 people</p>
                    <p className="text-white/60 text-sm mt-1">
                      ~2.6&times; individual capacity
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      (practical maximum for coordination)
                    </p>
                  </div>
                  <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-3 text-center">
                    <p className="text-red-400 font-bold text-2xl">5+ people</p>
                    <p className="text-white/60 text-sm mt-1">
                      Use a mechanical aid instead
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      (coordination loss outweighs benefit)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-2">
                  Managing Height &amp; Strength Differences
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Height differences:</strong> When team members are different heights,
                      the load will slope towards the shorter person, causing the taller person to
                      bear more weight. Position the shorter person at the higher end of the load
                      (if there is one) to compensate. For very large height differences (&gt;15
                      cm), use a carrying pole or device that allows each person to carry at their
                      own height.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Strength differences:</strong> The team is only as strong as its
                      weakest member. If one person is significantly weaker or smaller, they should
                      be positioned at the lighter end of the load or given a supporting role
                      (navigating, opening doors) rather than a primary lifting role. Never
                      pressure a team member to lift beyond their capability.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Carrying Long Loads */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">05</span>
              Carrying Long Loads
            </h2>
            <div className="space-y-4 text-white">
              <p className="leading-relaxed">
                Electricians frequently handle long loads: 3-metre and 6-metre lengths of conduit,
                cable tray sections, trunking, and conduit bundles. Long loads present unique
                challenges: they are unwieldy, difficult to balance, and hazardous in confined
                spaces, doorways, and around corners.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  Long Load Handling Principles
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Find the balance point:</strong> Before lifting, find the point
                      where the load balances horizontally. This is where you should grip for a
                      single-person carry, or where the team should be positioned symmetrically
                      around.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Two-person carry:</strong> One at each end, both facing the same
                      direction of travel. The front person navigates and calls out obstacles. The
                      rear person controls the pace.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Doorways and corners:</strong> The front person must communicate
                      clearly when approaching doorways, turns, and narrow passages. Slow down or
                      stop. Tilt the load to clear door frames if needed. For right-angle turns,
                      the rear person may need to step wide while the front person pivots.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Shoulder carrying:</strong> For lighter long loads (e.g. individual
                      conduit lengths), carrying on the shoulder is effective. Keep the front end
                      tilted slightly upward to avoid hitting people or obstacles at head height.
                      Be especially aware of people behind you.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="leading-relaxed">
                      <strong>Bundled loads:</strong> Bundles of conduit or cable tray sections
                      should be secured with straps or bands before carrying. Loose items in a
                      bundle can shift, fall, or pinch fingers. Carry bundles at the balance point
                      or use a two-person carry with one at each end.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Long Loads and Other Workers
                  </h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  A long load carried at shoulder height or horizontally can swing and strike other
                  workers, especially when the carrier turns or changes direction. This is a
                  common cause of head and face injuries on construction sites. Always be aware of
                  people around you when carrying long loads. Call out warnings when turning.
                  Consider using a spotter in busy areas. If the work area is congested, wait for
                  a clear path or carry the load vertically (if it is light enough) to reduce the
                  swing radius.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Key Numbers */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">06</span>
              Key Numbers &amp; Summary
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">
                  Key Numbers to Remember
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">4</p>
                    <p className="text-white/60 text-xs mt-1">
                      Max people
                      <br />
                      for team lift
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">&frac13;</p>
                    <p className="text-white/60 text-xs mt-1">
                      Coordination
                      <br />
                      loss (2 people)
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">3</p>
                    <p className="text-white/60 text-xs mt-1">
                      Part command
                      <br />
                      sequence
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-400 font-bold text-xl sm:text-2xl">15 cm</p>
                    <p className="text-white/60 text-xs mt-1">
                      Max height
                      <br />
                      difference
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  Team Handling Checklist
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      Team leader designated and accepted by the team
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      Load assessed: weight, shape, grip points, hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      Route checked: obstacles, doorways, floor condition, destination clear
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      Grip positions agreed and balanced
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      Verbal commands agreed (&ldquo;Ready, steady, lift&rdquo; /
                      &ldquo;Stop&rdquo; / &ldquo;Down&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      Practice run completed for heavy or complex lifts
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      Height and strength differences managed
                    </span>
                  </li>
                </ul>
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
          <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Pushing &amp; Pulling
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-2-section-4">
              Next: Awkward Loads
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
