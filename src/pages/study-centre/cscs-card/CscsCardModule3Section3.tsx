import {
  ArrowLeft,
  PackageOpen,
  CheckCircle,
  AlertTriangle,
  Users,
  ClipboardList,
  Dumbbell,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mhor-employer-duties',
    question:
      'Under the Manual Handling Operations Regulations 1992, what is the employer\'s FIRST duty regarding manual handling?',
    options: [
      'Provide manual handling training to all employees',
      'Assess the risk of all manual handling operations',
      'Avoid hazardous manual handling operations so far as is reasonably practicable',
      'Provide mechanical aids for all lifting tasks',
    ],
    correctIndex: 2,
    explanation:
      'The hierarchy of duties under MHOR 1992 is: (1) AVOID hazardous manual handling operations so far as is reasonably practicable, (2) ASSESS the risk of any operations that cannot be avoided, (3) REDUCE the risk of injury so far as is reasonably practicable. Avoidance is always the first priority before assessment or risk reduction.',
  },
  {
    id: 'tileo-factors',
    question:
      'A manual handling risk assessment uses the TILEO acronym. What does the "I" stand for?',
    options: [
      'Inspection — has the load been inspected before lifting?',
      'Individual — the capability, health, and fitness of the person doing the lifting',
      'Instruction — has the person received formal lifting training?',
      'Incline — is the route uphill or downhill?',
    ],
    correctIndex: 1,
    explanation:
      'TILEO stands for Task, Individual, Load, Environment, and Other factors. The "I" — Individual — considers the capability, health, fitness, strength, and any pre-existing conditions of the person carrying out the manual handling. For example, a pregnant worker, someone with a back injury, or a person who lacks the physical strength for the task would all be identified as individual risk factors.',
  },
  {
    id: 'guideline-weight',
    question:
      'According to HSE guidelines, what is the maximum recommended weight for a man to lift close to the body at waist height under ideal conditions?',
    options: ['10 kg', '16 kg', '20 kg', '25 kg'],
    correctIndex: 3,
    explanation:
      'The HSE guideline figure for a man lifting close to the body at waist height under ideal conditions is 25 kg. For women in the same position, the guideline is 16 kg. These figures are reduced significantly when the load is held at arm\'s length, above shoulder height, or below knee level. These are guidelines, not legal limits — a risk assessment is always required.',
  },
];

const faqs = [
  {
    question: 'Is there a legal maximum weight that a person can lift at work?',
    answer:
      'No. There is no single legal maximum weight limit in UK law. The Manual Handling Operations Regulations 1992 do not set absolute weight limits because the risk depends on many factors beyond weight alone — including the shape of the load, the height at which it is held, the distance it is carried, the individual\'s capability, and the environment. The HSE provides guideline figures (25 kg for men, 16 kg for women at waist height close to the body) as a starting point for risk assessment, but these are not legal limits. A 10 kg load could be hazardous if it is awkward, bulky, or lifted repeatedly, while a 30 kg load might be acceptable for a short, controlled lift by a strong individual under ideal conditions. A suitable and sufficient risk assessment is always required.',
  },
  {
    question: 'What is the MAC tool and when should I use it?',
    answer:
      'The Manual Handling Assessment Charts (MAC) tool is a free risk assessment tool published by the HSE. It helps employers assess the most common risk factors in lifting, carrying, and team handling operations. The MAC tool uses a traffic-light colour coding system: green indicates low risk, amber indicates medium risk, red indicates high risk, and purple indicates very high risk. You use the MAC tool when you need to carry out a detailed assessment of a manual handling operation that cannot be avoided. It is particularly useful for comparing different manual handling tasks, prioritising which tasks need improvement first, and demonstrating to employees and managers why changes are needed.',
  },
  {
    question: 'Can I refuse to carry out a manual handling task if I think it is too heavy?',
    answer:
      'Yes. Under the Manual Handling Operations Regulations 1992, employees have a duty to make full and proper use of any systems of work provided by their employer for manual handling. However, employees also have a right under the Health and Safety at Work Act 1974 not to be put at risk of injury. If you believe a manual handling task poses a risk of injury that has not been adequately assessed or controlled, you should raise the concern with your supervisor or safety representative. You should not be disciplined for refusing to carry out a task that you reasonably believe poses a serious and imminent risk of injury. The employer must then reassess the task and put appropriate controls in place.',
  },
  {
    question:
      'How often should manual handling risk assessments be reviewed?',
    answer:
      'Manual handling risk assessments should be reviewed whenever there is a significant change in the operation — for example, a change in the load, the working environment, the equipment used, or the people carrying out the task. They should also be reviewed if an injury or near-miss occurs during a manual handling operation, if new information about risks becomes available, or if there is any reason to believe the existing assessment is no longer valid. As a general rule, assessments should be reviewed at least annually, even if no specific trigger has occurred. The assessment must remain suitable and sufficient — if circumstances change, the assessment must be updated to reflect those changes.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under the Manual Handling Operations Regulations 1992, what is the correct hierarchy of employer duties?',
    options: [
      'Assess, reduce, avoid',
      'Avoid, assess, reduce',
      'Reduce, avoid, assess',
      'Train, assess, monitor',
    ],
    correctAnswer: 1,
    explanation:
      'The correct hierarchy under MHOR 1992 is: (1) AVOID hazardous manual handling operations so far as is reasonably practicable, (2) ASSESS the risk of any operations that cannot be avoided, and (3) REDUCE the risk of injury so far as is reasonably practicable. This hierarchy must be followed in order — avoidance is always the first priority.',
  },
  {
    id: 2,
    question: 'In a TILEO assessment, what does the "E" stand for?',
    options: [
      'Equipment — the type of mechanical aid available',
      'Ergonomics — the posture adopted during the lift',
      'Environment — the space, floor conditions, temperature, and lighting where the task takes place',
      'Effort — the amount of physical exertion required',
    ],
    correctAnswer: 2,
    explanation:
      'The "E" in TILEO stands for Environment. This considers the physical conditions where the manual handling takes place, including the amount of space available, the condition of the floor surface (wet, uneven, slippery), temperature extremes, lighting levels, and any obstacles or obstructions in the route. Poor environmental conditions significantly increase the risk of manual handling injuries.',
  },
  {
    id: 3,
    question:
      'The HSE guideline weight for a woman lifting close to the body at waist height is:',
    options: ['10 kg', '16 kg', '20 kg', '25 kg'],
    correctAnswer: 1,
    explanation:
      'The HSE guideline figure for a woman lifting close to the body at waist height under ideal conditions is 16 kg. For a man in the same position, the guideline is 25 kg. These figures are significantly reduced when the load is held at arm\'s length (7 kg for women, 10 kg for men at waist height) or when lifting above shoulder height or below knee level.',
  },
  {
    id: 4,
    question:
      'When lifting a load from the floor, which of the following is the correct technique?',
    options: [
      'Keep the legs straight, bend at the waist, and grip the load with fingertips',
      'Bend the knees, keep the back straight, grip firmly, keep the load close to the body, and lift smoothly using the legs',
      'Twist at the waist to position yourself over the load, then lift with a quick jerking motion',
      'Lean forward, grip the load, and straighten up using the back muscles',
    ],
    correctAnswer: 1,
    explanation:
      'The correct technique is to plan the lift, position feet shoulder-width apart, bend the knees (not the back), grip the load firmly with the whole hand, keep the load as close to the body as possible, and lift smoothly using the leg muscles. The back should remain straight (maintaining its natural curve), and twisting should be avoided — move the feet to turn instead.',
  },
  {
    id: 5,
    question:
      'Which of the following is NOT one of the five TILEO assessment factors?',
    options: ['Task', 'Individual', 'Legislation', 'Environment'],
    correctAnswer: 2,
    explanation:
      'The five TILEO factors are Task, Individual, Load, Environment, and Other. "Legislation" is not one of the TILEO factors. While legislation (such as MHOR 1992) provides the legal framework requiring the assessment, it is not itself one of the risk factors being assessed. The "Other" factor covers additional considerations such as PPE restricting movement, team handling requirements, and any other relevant factors.',
  },
  {
    id: 6,
    question:
      'During a team lift, who should give the commands to coordinate the lift?',
    options: [
      'Everyone should lift at the same time without specific commands',
      'The strongest person in the team',
      'One designated person who directs the lift and gives clear commands',
      'The supervisor watching from a distance',
    ],
    correctAnswer: 2,
    explanation:
      'During a team lift, one designated person must take charge and direct the operation. This person gives clear, agreed commands (such as "Ready, steady, lift") so that all members of the team lift, carry, and set down the load at the same time. Without a single coordinator, team members may lift at different times, causing the load to shift unpredictably and significantly increasing the risk of injury.',
  },
  {
    id: 7,
    question:
      'Which of the following is the most common type of injury caused by poor manual handling?',
    options: [
      'Fractured wrist',
      'Lower back injury — including disc herniation and muscle strain',
      'Concussion from dropping the load',
      'Chemical burn from load contents',
    ],
    correctAnswer: 1,
    explanation:
      'Lower back injuries are by far the most common type of manual handling injury. These include muscle strains, ligament sprains, and disc herniation (commonly called a "slipped disc"). The lower back (lumbar spine) bears the greatest load during lifting and is particularly vulnerable when the load is held away from the body, when twisting occurs during a lift, or when the back is bent rather than the knees.',
  },
  {
    id: 8,
    question:
      'An employer has identified a manual handling task that cannot be avoided. What must they do next according to MHOR 1992?',
    options: [
      'Provide all workers with a back-support belt',
      'Carry out a suitable and sufficient risk assessment of the operation',
      'Limit the task to workers under the age of 40',
      'Set a maximum weight limit of 25 kg for the task',
    ],
    correctAnswer: 1,
    explanation:
      'If a hazardous manual handling operation cannot be avoided, the employer must carry out a suitable and sufficient risk assessment. This assessment must consider the TILEO factors: the Task, the Individual, the Load, the Environment, and Other factors. Based on the assessment, the employer must then reduce the risk of injury so far as is reasonably practicable — for example, by providing mechanical aids, redesigning the task, or reducing the load weight.',
  },
];

export default function CscsCardModule3Section3() {
  useSEO({
    title: 'Manual Handling Assessment | CSCS Card Module 3.3',
    description:
      'Manual Handling Operations Regulations 1992, TILEO assessment factors, HSE guideline weights, safe lifting technique, reducing risks, team handling, common injuries, and record keeping.',
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
            <Link to="../cscs-card-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-500/30 mb-4">
            <PackageOpen className="h-7 w-7 text-green-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Manual Handling Assessment
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The Manual Handling Operations Regulations 1992, TILEO assessment factors, HSE guideline
            weights, safe lifting technique, reducing risks, team handling, common injuries, and record
            keeping
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Hierarchy:</strong> Avoid &rarr; Assess &rarr; Reduce risk
              </li>
              <li>
                <strong>TILEO:</strong> Task, Individual, Load, Environment, Other
              </li>
              <li>
                <strong>Guideline:</strong> 25 kg men / 16 kg women at waist, close to body
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Plan:</strong> Think before you lift &mdash; check weight, route, destination
              </li>
              <li>
                <strong>Technique:</strong> Bend knees, straight back, load close, lift with legs
              </li>
              <li>
                <strong>Team lift:</strong> One person directs, agreed commands, matched heights
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the employer and employee duties under the Manual Handling Operations Regulations 1992',
              'Carry out a TILEO manual handling risk assessment covering all five factors',
              'State the HSE guideline weights and explain how they vary with posture and position',
              'Demonstrate the correct safe lifting technique using an eight-step approach',
              'Identify mechanical aids and task redesign measures that reduce manual handling risk',
              'Describe the coordination and communication requirements for team handling operations',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Manual Handling Operations Regulations 1992 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">01</span>
            Manual Handling Operations Regulations 1992
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Manual Handling Operations Regulations 1992 (MHOR)</strong>, as amended in
                2002, are the primary piece of UK legislation governing manual handling at work. They
                apply to any workplace activity that involves transporting or supporting a load by hand
                or by bodily force. This includes <strong>lifting, lowering, pushing, pulling, carrying,
                moving, holding, and restraining</strong> any object, person, or animal.
              </p>

              <p>
                Manual handling injuries account for over a third of all workplace injuries reported to
                the HSE each year. In the construction industry, the figure is even higher &mdash;
                electricians regularly handle cable drums, distribution boards, conduit bundles, trunking
                lengths, and heavy tools that all present manual handling risks. Understanding these
                regulations is essential for both the CSCS HS&amp;E test and for protecting yourself on
                site.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">
                  Employer Duties &mdash; The Hierarchy
                </p>
                <div className="space-y-2">
                  {[
                    'AVOID hazardous manual handling operations so far as is reasonably practicable — for example, by delivering materials directly to the point of use, using mechanical aids, or redesigning the process',
                    'ASSESS the risk of any manual handling operations that cannot be avoided — using the TILEO factors (covered in Section 02)',
                    'REDUCE the risk of injury so far as is reasonably practicable — by providing mechanical aids, improving the working environment, reducing load weight, or providing training',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Employee Duties</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Make full and proper use of any system of work provided by the employer for
                      manual handling &mdash; this includes using the mechanical aids, trolleys, and
                      lifting equipment provided
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Follow any training and instructions provided on safe manual handling techniques
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Report any hazardous manual handling activities, near-misses, or injuries to the
                      employer or supervisor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Inform the employer of any pre-existing health conditions that may affect their
                      ability to carry out manual handling safely &mdash; such as back problems,
                      pregnancy, or joint conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Take reasonable care of their own health and safety and that of others who may
                      be affected by their actions
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Scope of &ldquo;Manual Handling&rdquo;:</strong>{' '}
                  Manual handling is not limited to lifting heavy objects. The regulations cover any
                  activity involving transporting or supporting a load by hand or bodily force. This
                  includes pushing a loaded trolley, pulling a cable through conduit, carrying tools up
                  a ladder, holding a distribution board in position while it is being fixed, lowering
                  materials from a scaffold, and even restraining an animal. If bodily force is used to
                  move or support a load, it is manual handling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: TILEO Assessment Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">02</span>
            TILEO Assessment Factors
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a manual handling operation cannot be avoided, the employer must carry out a
                suitable and sufficient risk assessment. The <strong>TILEO</strong> framework provides a
                structured approach to identifying and evaluating the risk factors involved. Each letter
                represents one of the five key assessment areas that must be considered.
              </p>

              {/* TILEO Assessment Framework Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  TILEO Assessment Framework
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {/* Task */}
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 border border-green-400/40 mx-auto mb-2">
                      <span className="text-lg font-bold text-green-400">T</span>
                    </div>
                    <p className="text-xs font-semibold text-green-400 mb-1">Task</p>
                    <p className="text-[11px] text-white/70">
                      What is the activity? Holding, twisting, stooping, reaching, carrying distance,
                      repetition, rest periods
                    </p>
                  </div>

                  {/* Individual */}
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/40 mx-auto mb-2">
                      <span className="text-lg font-bold text-blue-400">I</span>
                    </div>
                    <p className="text-xs font-semibold text-blue-400 mb-1">Individual</p>
                    <p className="text-[11px] text-white/70">
                      Capability, health, fitness, strength, age, pregnancy, existing injuries or
                      conditions
                    </p>
                  </div>

                  {/* Load */}
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 mx-auto mb-2">
                      <span className="text-lg font-bold text-amber-400">L</span>
                    </div>
                    <p className="text-xs font-semibold text-amber-400 mb-1">Load</p>
                    <p className="text-[11px] text-white/70">
                      Weight, shape, size, grip points, centre of gravity, stability, sharp edges,
                      hot or cold
                    </p>
                  </div>

                  {/* Environment */}
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 border border-purple-400/40 mx-auto mb-2">
                      <span className="text-lg font-bold text-purple-400">E</span>
                    </div>
                    <p className="text-xs font-semibold text-purple-400 mb-1">Environment</p>
                    <p className="text-[11px] text-white/70">
                      Space constraints, floor condition, slopes, steps, temperature, lighting,
                      weather, obstacles
                    </p>
                  </div>

                  {/* Other */}
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 mx-auto mb-2">
                      <span className="text-lg font-bold text-rose-400">O</span>
                    </div>
                    <p className="text-xs font-semibold text-rose-400 mb-1">Other</p>
                    <p className="text-[11px] text-white/70">
                      PPE restricting movement, team handling needs, time pressure, training level,
                      unusual conditions
                    </p>
                  </div>
                </div>

                {/* Legend */}
                <p className="text-[11px] text-white/40 text-center mt-4">
                  All five factors must be considered in every manual handling risk assessment
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Task Factors in Detail</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Does the task involve holding the load away from the body, twisting, stooping,
                      or reaching upward?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      How far must the load be carried? Long carrying distances significantly increase
                      the risk of fatigue and injury
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Is the task repetitive? Frequent lifting &mdash; even of light loads &mdash;
                      causes cumulative strain on the musculoskeletal system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Are there adequate rest periods between lifts? Fatigue increases the risk of
                      poor technique and injury
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Individual Factors in Detail
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Does the individual have the physical capability and strength for the task?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Are there any pre-existing health conditions &mdash; back problems, joint
                      conditions, hernias, or recent surgery &mdash; that increase the risk?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Is the individual pregnant? Pregnancy affects balance, core strength, and
                      increases the risk of ligament injury due to hormonal changes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Has the individual received adequate training in safe manual handling techniques?
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-3">Load Factors</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>How heavy is the load? Is the weight marked on it?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Is it bulky, awkward, or difficult to grip?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Is the centre of gravity offset, making it unstable?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Does it have sharp edges, or is it hot or cold?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Could the contents shift during handling (e.g., liquids)?</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-3">Environment &amp; Other</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Is there sufficient space to adopt a good posture?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Is the floor uneven, slippery, or cluttered?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Are there steps, slopes, or changes in level?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Is PPE restricting movement or vision?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Is the task being done under time pressure?</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The HSE Risk Filter */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">03</span>
            The HSE Risk Filter
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The HSE provides guideline weights as a starting point for manual handling risk
                assessment. These are <strong>not legal limits</strong> &mdash; they are guideline
                figures that indicate the level of risk under ideal conditions. If all conditions are
                ideal (good posture, good grip, stable environment, no twisting), loads at or below
                these guideline weights present a low risk of injury for most people. Above these
                figures, a more detailed assessment is required.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">
                  Guideline Weights &mdash; Lifting Close to the Body
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-400 mb-2">Men</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Waist height, close to body:</strong> 25 kg
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Waist height, arms extended:</strong> 10 kg
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Above shoulder height:</strong> 10 kg
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Below knee height:</strong> 10 kg
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-2">Women</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Waist height, close to body:</strong> 16 kg
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Waist height, arms extended:</strong> 7 kg
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Above shoulder height:</strong> 7 kg
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Below knee height:</strong> 7 kg
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">
                    The MAC Tool (Manual Handling Assessment Charts)
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    The <strong className="text-white">MAC tool</strong> is a free, practical risk
                    assessment tool published by the HSE. It helps assessors evaluate the most common
                    risk factors in lifting, carrying, and team handling operations using a simple
                    colour-coded system.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                    <div className="bg-green-500/15 border border-green-500/30 p-2 rounded text-center">
                      <p className="text-xs font-bold text-green-400">Green</p>
                      <p className="text-[10px] text-white/60">Low risk</p>
                    </div>
                    <div className="bg-amber-500/15 border border-amber-500/30 p-2 rounded text-center">
                      <p className="text-xs font-bold text-amber-400">Amber</p>
                      <p className="text-[10px] text-white/60">Medium risk</p>
                    </div>
                    <div className="bg-red-500/15 border border-red-500/30 p-2 rounded text-center">
                      <p className="text-xs font-bold text-red-400">Red</p>
                      <p className="text-[10px] text-white/60">High risk</p>
                    </div>
                    <div className="bg-purple-500/15 border border-purple-500/30 p-2 rounded text-center">
                      <p className="text-xs font-bold text-purple-400">Purple</p>
                      <p className="text-[10px] text-white/60">Very high risk</p>
                    </div>
                  </div>
                  <p className="mt-2">
                    The MAC tool is particularly useful for comparing different tasks, prioritising
                    which operations need improvement first, and demonstrating to managers and
                    workers why changes are needed. It covers three types of assessment: lifting
                    operations, carrying operations, and team handling operations.
                  </p>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Important:</strong> The guideline weights assume
                  ideal conditions &mdash; a compact load held close to the body, a good grip, a
                  stable standing position, no twisting, and a smooth floor surface. If any of these
                  conditions are not met, the guideline weight should be reduced. For example, if
                  twisting is involved, the guideline figures should be reduced by approximately 10%
                  to 20%. If the handler is seated, the figures should be reduced by approximately
                  30%. These guidelines apply to infrequent lifting; for repetitive operations, the
                  figures should be reduced further.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Safe Lifting Technique */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">04</span>
            Safe Lifting Technique
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even when a manual handling operation has been assessed and the risk reduced as far as
                is reasonably practicable, correct lifting technique remains essential. Poor technique
                is one of the most common causes of manual handling injury, particularly to the lower
                back. The following eight-step approach should be used for every lift.
              </p>

              {/* Safe Lifting Technique Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Safe Lifting Technique &mdash; Step by Step
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Step 1 */}
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 mx-auto mb-2">
                      <span className="text-sm font-bold text-green-400">1</span>
                    </div>
                    <p className="text-xs font-semibold text-green-400 mb-1">Plan</p>
                    <p className="text-[11px] text-white/70">
                      Think before lifting. Check the weight, route, and destination. Remove obstacles.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 mx-auto mb-2">
                      <span className="text-sm font-bold text-green-400">2</span>
                    </div>
                    <p className="text-xs font-semibold text-green-400 mb-1">Position Feet</p>
                    <p className="text-[11px] text-white/70">
                      Feet shoulder-width apart, one foot slightly forward for balance and stability.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 mx-auto mb-2">
                      <span className="text-sm font-bold text-green-400">3</span>
                    </div>
                    <p className="text-xs font-semibold text-green-400 mb-1">Bend Knees</p>
                    <p className="text-[11px] text-white/70">
                      Bend the knees, not the back. Keep the back straight with its natural curve.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 mx-auto mb-2">
                      <span className="text-sm font-bold text-green-400">4</span>
                    </div>
                    <p className="text-xs font-semibold text-green-400 mb-1">Grip Firmly</p>
                    <p className="text-[11px] text-white/70">
                      Use the whole hand, not just fingertips. A hook grip or handle provides better
                      control.
                    </p>
                  </div>

                  {/* Step 5 */}
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 mx-auto mb-2">
                      <span className="text-sm font-bold text-green-400">5</span>
                    </div>
                    <p className="text-xs font-semibold text-green-400 mb-1">Keep Close</p>
                    <p className="text-[11px] text-white/70">
                      Keep the load as close to the body as possible. The further away, the greater
                      the strain.
                    </p>
                  </div>

                  {/* Step 6 */}
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 mx-auto mb-2">
                      <span className="text-sm font-bold text-green-400">6</span>
                    </div>
                    <p className="text-xs font-semibold text-green-400 mb-1">Lift Smoothly</p>
                    <p className="text-[11px] text-white/70">
                      Lift using the legs, not the back. Smooth, controlled movement &mdash; no
                      jerking.
                    </p>
                  </div>

                  {/* Step 7 */}
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 mx-auto mb-2">
                      <span className="text-sm font-bold text-green-400">7</span>
                    </div>
                    <p className="text-xs font-semibold text-green-400 mb-1">Avoid Twisting</p>
                    <p className="text-[11px] text-white/70">
                      Move the feet to turn &mdash; do not twist the trunk. Twisting under load is a
                      major injury cause.
                    </p>
                  </div>

                  {/* Step 8 */}
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 mx-auto mb-2">
                      <span className="text-sm font-bold text-green-400">8</span>
                    </div>
                    <p className="text-xs font-semibold text-green-400 mb-1">Set Down</p>
                    <p className="text-[11px] text-white/70">
                      Set the load down carefully, then adjust position. Reverse the lifting technique.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Practical Demonstration Approach</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Before any lift, test the weight of the load by rocking it gently or lifting one
                      corner &mdash; this tells you whether you can manage it alone or need help
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Check that your route is clear of obstacles, trip hazards, and obstructions
                      before you start carrying the load
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Ensure the destination is ready to receive the load &mdash; clear space on the
                      bench, workstation, or storage area before you begin the lift
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      If you need to place the load at a low level, do not bend your back &mdash; use
                      the same knee-bending technique in reverse to lower the load to the ground
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      If the load is too heavy, too awkward, or the route is too difficult, stop and
                      reassess &mdash; get help, use a mechanical aid, or break the load into smaller
                      portions
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Common Lifting Mistakes</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Bending the back instead of the knees</strong>{' '}
                      &mdash; places enormous strain on the lumbar spine and intervertebral discs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Twisting while holding a load</strong> &mdash;
                      one of the most common causes of disc herniation and back muscle strain
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Holding the load away from the body</strong>{' '}
                      &mdash; dramatically increases the effective force on the spine. At arm&rsquo;s
                      length, the spinal loading can be five times greater than holding the load close
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Jerking or snatching the load</strong> &mdash;
                      sudden forces overload muscles and ligaments that are not prepared for the strain
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Reducing Manual Handling Risks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">05</span>
            Reducing Manual Handling Risks
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Once a manual handling risk assessment has been completed, the employer must reduce the
                risk of injury so far as is reasonably practicable. There are many practical measures
                available, ranging from mechanical aids to task redesign. The most effective approach
                combines several measures together.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">
                  Mechanical Aids &mdash; Reducing the Need for Manual Lifting
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-2">Transport Aids</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Trolleys</strong> &mdash; flat-bed, cage, and
                          stair-climbing varieties for moving loads across sites
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Sack trucks</strong> &mdash; ideal for moving
                          heavy, compact items such as cable drums or distribution boards
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Pallet trucks</strong> &mdash; for moving
                          palletised loads within warehouses and storage areas
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-2">Lifting Aids</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Hoists and cranes</strong> &mdash; for lifting
                          heavy loads to height, such as steel beams or large equipment
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Vacuum lifters</strong> &mdash; for handling
                          sheet materials, glass panels, and smooth-surfaced items
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>
                          <strong className="text-white">Scissor lifts and platform trucks</strong>{' '}
                          &mdash; adjustable height platforms that bring loads to the correct working
                          level
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Task Redesign Measures</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Reduce the load weight or size</strong> &mdash;
                      break bulk deliveries into smaller, more manageable packages. For example, order
                      cable on smaller drums rather than one large drum
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Improve the grip</strong> &mdash; add handles,
                      grips, or handholds to loads that are difficult to hold. Use carry straps for
                      awkward items
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Reduce carrying distances</strong> &mdash;
                      position storage areas close to the point of use. Arrange deliveries to the
                      floor where the work is taking place, not to a central store on the ground floor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Adjust working heights</strong> &mdash; use
                      adjustable workbenches, platforms, or raised storage to avoid lifting from floor
                      level or above shoulder height
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Implement job rotation</strong> &mdash; rotate
                      workers between manual handling tasks and lighter duties to reduce cumulative
                      strain and fatigue
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Use team lifting</strong> &mdash; where a load
                      is too heavy or awkward for one person, organise team handling with a designated
                      coordinator
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Electricians on Site:</strong> Common electrical
                  loads that benefit from mechanical aids include cable drums (which can weigh over
                  50 kg), distribution boards, lengths of conduit and trunking, transformer units,
                  motor starters, and battery backup systems. Always check whether a trolley, sack
                  truck, or hoist is available before attempting to move heavy items by hand. If the
                  load is too heavy to manage safely, do not attempt it &mdash; ask for help or
                  request appropriate equipment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Team Handling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">06</span>
            Team Handling
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a load is too heavy or too awkward for one person to handle safely, team lifting
                may be appropriate. However, team handling introduces its own risks &mdash; poor
                coordination, uneven load sharing, and communication failures can cause injuries to
                multiple workers simultaneously. Effective team handling requires careful planning and
                clear communication.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">When to Use Team Lifting</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The load is too heavy for one person to lift safely, even with good technique
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The load is too bulky, long, or awkwardly shaped for one person to control
                      &mdash; for example, long lengths of trunking, large boards, or sheet materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The route involves obstacles, stairs, or tight spaces where one person cannot
                      maintain a safe grip and navigate simultaneously
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      No suitable mechanical aid is available and the task cannot be postponed until
                      one becomes available
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Coordinating the Team Lift
                </p>
                <div className="space-y-2">
                  {[
                    'Appoint ONE person to direct the lift — this person gives all commands and coordinates the team',
                    'Brief the team before the lift — explain the route, the destination, and any hazards along the way',
                    'Use clear, agreed commands: "Ready… steady… lift" and "Ready… steady… lower" so all team members act simultaneously',
                    'Match team members for height where possible — significant height differences cause uneven load distribution',
                    'Ensure all team members can see the coordinator and hear the commands clearly',
                    'Walk in step — if team members walk at different speeds or out of rhythm, the load shifts unpredictably',
                    'Communicate throughout — if anyone needs to stop, adjust grip, or rest, they must say so immediately',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Limitations of Team Handling</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Team lifting does <strong className="text-white">not</strong> simply divide the
                    load weight equally among the team members. Research shows that in a two-person
                    lift, each person bears approximately <strong className="text-white">two-thirds
                    </strong> of what they would carry individually &mdash; not half. This is because
                    of coordination difficulties, uneven grip positions, and the additional effort
                    required to synchronise movements.
                  </p>
                  <p>
                    As the team size increases beyond two or three people, the efficiency decreases
                    further. For large or very heavy loads, a mechanical aid is almost always more
                    effective and safer than a large team lift.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Common Injuries & Prevention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">07</span>
            Common Injuries &amp; Prevention
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Manual handling injuries are among the most common workplace injuries in the UK,
                accounting for over a third of all injuries reported under RIDDOR. In the construction
                industry, the problem is particularly acute due to the heavy, awkward loads that
                workers regularly handle. These injuries can be debilitating, career-ending, and
                extremely costly &mdash; both to the individual worker and to the industry as a whole.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Back Injuries</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Disc herniation</strong> (&ldquo;slipped
                        disc&rdquo;) &mdash; the soft centre of an intervertebral disc pushes through
                        the outer ring, pressing on spinal nerves and causing severe pain, numbness,
                        or weakness
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Muscle strain</strong> &mdash; tears in the
                        back muscles caused by sudden or excessive force, particularly when twisting
                        or lifting with a bent back
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Ligament sprain</strong> &mdash; overstretching
                        or tearing of the ligaments that support the spine, causing chronic pain and
                        instability
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Other Injuries</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Upper limb disorders</strong> &mdash;
                        repetitive strain injuries to the wrists, elbows, and shoulders from repeated
                        manual handling, gripping, and carrying
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Hernias</strong> &mdash; a weakness or tear in
                        the abdominal wall, often caused by straining during heavy lifting. Inguinal
                        hernias are particularly common
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Joint injuries</strong> &mdash; damage to the
                        knees, hips, ankles, and shoulders from carrying heavy loads, particularly on
                        uneven surfaces or stairs
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Cost to Industry</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Musculoskeletal disorders account for approximately 7.3 million working days
                      lost per year in the UK, costing the economy billions of pounds annually
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The average manual handling injury results in 16 days off work &mdash;
                      some injuries require months or years of rehabilitation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Employers face costs including sick pay, replacement labour, lost productivity,
                      potential HSE enforcement action, and civil compensation claims
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      For the individual worker, a serious back injury can mean chronic pain, reduced
                      earning capacity, and in severe cases, the end of a career in the construction
                      industry
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Prevention Strategies</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Risk assessment</strong> &mdash; identify and
                      control risks before they cause injury. Review assessments regularly and after
                      any near-miss or injury
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Training</strong> &mdash; provide practical
                      manual handling training that covers safe technique, risk awareness, and the
                      use of mechanical aids
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Mechanical aids</strong> &mdash; provide and
                      maintain trolleys, hoists, sack trucks, and other equipment to reduce the
                      need for manual lifting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Job rotation</strong> &mdash; alternate between
                      heavy manual handling tasks and lighter work to reduce cumulative strain and
                      allow recovery between demanding periods
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Health surveillance</strong> &mdash; monitor the
                      health of workers who regularly carry out manual handling tasks, and act early
                      if problems are identified
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Record Keeping & Training */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">08</span>
            Record Keeping &amp; Training
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Manual Handling Operations Regulations 1992 require employers to record the
                findings of their risk assessments and to provide adequate training to workers who
                carry out manual handling operations. Good record keeping demonstrates compliance with
                the law, provides a reference for future assessments, and is essential evidence in the
                event of an inspection, investigation, or compensation claim.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Recording Assessments</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Where the employer has five or more employees, the significant findings of the
                      risk assessment <strong className="text-white">must</strong> be recorded in
                      writing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The record should identify the manual handling operation assessed, the hazards
                      identified, the people at risk, the existing controls, and any additional
                      measures required
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Assessments should be dated, signed by the assessor, and stored where they can
                      be readily accessed by workers, supervisors, and inspectors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The assessment must be reviewed and updated whenever there is a significant
                      change in the operation, or if an injury or near-miss occurs
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Training Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Employers must provide <strong className="text-white">adequate training</strong>{' '}
                      to all workers who carry out manual handling operations &mdash; this should be
                      practical and task-specific, not just a classroom presentation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Training should cover: the risks of poor manual handling, how to recognise
                      hazardous operations, safe lifting technique, proper use of mechanical aids,
                      and what to do if a load is too heavy or awkward
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Refresher training</strong> should be provided
                      at regular intervals &mdash; typically annually &mdash; and whenever new
                      equipment, processes, or working methods are introduced
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      New starters, young workers, and agency workers must receive manual handling
                      training as part of their induction before they carry out any manual handling
                      tasks
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Health Monitoring &amp; Reporting
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Workers who regularly carry out manual handling should be subject to health
                      monitoring &mdash; this includes pre-employment screening and periodic health
                      checks to identify early signs of musculoskeletal problems
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Any manual handling injury that results in the worker being incapacitated for
                      more than seven consecutive days must be reported to the HSE under{' '}
                      <strong className="text-white">RIDDOR</strong> (Reporting of Injuries, Diseases
                      and Dangerous Occurrences Regulations 2013)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      All manual handling injuries and near-misses should be recorded in the company
                      accident book, regardless of severity &mdash; this data helps identify trends
                      and inform future risk assessments
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Workers should be encouraged to report early symptoms of musculoskeletal
                      discomfort &mdash; early intervention is far more effective than treating
                      established injuries
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Training is Not Enough on Its Own:</strong>{' '}
                  While manual handling training is important, the HSE is clear that training alone
                  is not a substitute for a properly controlled workplace. Training must be combined
                  with risk assessment, mechanical aids, task redesign, and health monitoring to be
                  effective. An employer who provides training but fails to supply trolleys, reduce
                  loads, or improve the working environment has not met their legal duties under the
                  Manual Handling Operations Regulations.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-3-section-4">
              Next: Fall Protection &amp; Safe Lifting
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
