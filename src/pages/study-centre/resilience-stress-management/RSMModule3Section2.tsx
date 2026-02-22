import {
  ArrowLeft,
  Timer,
  CheckCircle,
  HelpCircle,
  Wind,
  Eye,
  Hand,
  AlertTriangle,
  Car,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'breathing-space-stages',
    question:
      'What are the three stages of the Three-Minute Breathing Space, in the correct order?',
    options: [
      'Relax, Focus, Expand',
      'Awareness, Gathering, Expanding',
      'Inhale, Hold, Exhale',
      'Notice, Accept, Release',
    ],
    correctIndex: 1,
    explanation:
      'The Three-Minute Breathing Space has three stages: Awareness (noticing what is present in your experience right now — thoughts, feelings, sensations), Gathering (narrowing your focus to the breath as a single anchor point), and Expanding (broadening your awareness back out to include the whole body, the space around you, and the task ahead). Each stage lasts approximately one minute.',
  },
  {
    id: 'box-breathing-pattern',
    question: 'What is the correct pattern for Box Breathing?',
    options: [
      'Inhale 4 seconds, exhale 8 seconds',
      'Inhale 7 seconds, hold 4 seconds, exhale 8 seconds',
      'Inhale 4 seconds, hold 4 seconds, exhale 4 seconds, hold 4 seconds',
      'Double inhale through the nose, long exhale through the mouth',
    ],
    correctIndex: 2,
    explanation:
      'Box Breathing follows a 4-4-4-4 pattern: inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. The name comes from the four equal sides, like a box or square. It is used by military and emergency services personnel worldwide for its effectiveness in reducing stress and restoring cognitive clarity under pressure.',
  },
  {
    id: 'grounding-senses',
    question: 'In the 5-4-3-2-1 Grounding technique, what is the correct sequence of senses used?',
    options: [
      '5 touch, 4 taste, 3 smell, 2 hear, 1 see',
      '5 see, 4 hear, 3 touch, 2 smell, 1 taste',
      '5 hear, 4 see, 3 smell, 2 touch, 1 taste',
      '5 see, 4 touch, 3 hear, 2 smell, 1 taste',
    ],
    correctIndex: 1,
    explanation:
      'The 5-4-3-2-1 Grounding technique follows this sequence: 5 things you can SEE, 4 things you can HEAR, 3 things you can TOUCH, 2 things you can SMELL, and 1 thing you can TASTE. The descending count creates a structured pathway from the most dominant sense (vision) to the least often consciously noticed (taste), progressively anchoring you in the present moment through your physical senses.',
  },
];

const faqs = [
  {
    question: 'Can I use these techniques while actually working, or only during breaks?',
    answer:
      'Some techniques can be used during work, and some are better suited to breaks. The 5-4-3-2-1 Grounding technique can be practised at any time, even while working, because it simply involves noticing what is already around you. Box Breathing can be done silently and discreetly during any task that does not require you to talk. The Three-Minute Breathing Space is best used during a natural pause — before starting a new task, during a short break, or between jobs. The full Body Scan requires you to close your eyes and be still, so it is best reserved for lunch breaks, the commute, or the evening. The key principle is: match the technique to the moment. You do not need to stop working to be mindful, but some practices benefit from a brief pause.',
  },
  {
    question: 'What if I feel silly doing breathing exercises on a building site?',
    answer:
      'Every technique described in this section can be practised completely silently, without anyone knowing you are doing it. Box Breathing is just breathing slowly — nobody will notice. The 5-4-3-2-1 technique happens entirely in your head. The Three-Minute Breathing Space can be done while standing, sitting, or walking. There is nothing to announce, no special posture to adopt, and no equipment to use. The reality is that elite military units, emergency services, professional athletes, and surgeons all use these techniques precisely because they work and can be used discreetly under pressure. There is nothing silly about using evidence-based tools to perform better under stress.',
  },
  {
    question: 'How often should I practise these techniques to see real results?',
    answer:
      'Research suggests that practising any of these techniques for just five to ten minutes a day produces noticeable improvements in stress levels, focus, and emotional regulation within two to four weeks. The key is consistency rather than duration: five minutes every day is more effective than thirty minutes once a week. Many people find it helpful to attach mindfulness practice to an existing habit — for example, doing a Three-Minute Breathing Space every time they get into the van, or practising Box Breathing during the commute. This "habit stacking" approach makes it easier to maintain a regular practice without having to find extra time in your day.',
  },
  {
    question: 'Are there any situations where I should NOT use these techniques?',
    answer:
      'Yes. You should not use any technique that requires you to close your eyes or significantly reduce your awareness of your surroundings when you are in an active emergency, driving a vehicle, operating machinery or power tools, working at height, or in any situation where reduced situational awareness could create a safety risk. The 5-4-3-2-1 Grounding technique is an exception because it actually increases awareness of your environment. For all other techniques, choose a safe moment — a break, a pause between tasks, or a moment when you are not responsible for safety-critical activities. Mindfulness should enhance your safety, never compromise it.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'During which stage of the Three-Minute Breathing Space do you narrow your attention to focus solely on the breath?',
    options: ['Awareness', 'Gathering', 'Expanding', 'Releasing'],
    correctAnswer: 1,
    explanation:
      'The Gathering stage (the second minute) involves narrowing your attention from the broad awareness of the first stage to a single focused anchor point: the breath. You feel the sensation of air entering and leaving your nostrils, the rise and fall of your chest or abdomen. This narrowing of focus interrupts rumination and creates a stable point of present-moment awareness before the third stage (Expanding) broadens your awareness back out.',
  },
  {
    id: 2,
    question: 'Box Breathing is also known by which of the following names?',
    options: [
      'The physiological sigh',
      'Square breathing or tactical breathing',
      'Pranayama breathing',
      'Diaphragmatic breathing',
    ],
    correctAnswer: 1,
    explanation:
      'Box Breathing is also called square breathing (because of the four equal sides of the breathing pattern) and tactical breathing (because it is widely used by military and emergency services for managing stress in high-pressure situations). The physiological sigh is a different technique (double inhale, long exhale, developed by Huberman). Pranayama is the general yogic term for breath control, not a specific name for box breathing.',
  },
  {
    id: 3,
    question:
      'Why does the 5-4-3-2-1 Grounding technique work so effectively for acute stress and panic?',
    options: [
      'It distracts you from the stressor by giving you a task to complete',
      'It anchors your attention in the present moment through physical senses, interrupting the cognitive loop of worry and rumination',
      'It reduces blood pressure through controlled breathing',
      'It activates the vagus nerve through sensory stimulation',
    ],
    correctAnswer: 1,
    explanation:
      'The 5-4-3-2-1 technique works primarily by anchoring your attention in the present moment through your physical senses. When you are stressed or anxious, your mind is typically caught in a cognitive loop — replaying past events or worrying about future ones. By systematically engaging each of your five senses with the present environment, you interrupt this loop and ground yourself in what is actually happening right now. This is not mere distraction; it is a deliberate shift from abstract, threat-focused thinking to concrete, present-moment sensory awareness.',
  },
  {
    id: 4,
    question: 'During a Body Scan, in which direction do you typically move your attention?',
    options: [
      'From the head down to the feet',
      'From the feet up to the top of the head',
      'From the centre of the body outwards to the extremities',
      'In random order, wherever tension is felt',
    ],
    correctAnswer: 1,
    explanation:
      'The standard Body Scan moves attention systematically from the feet up to the top of the head. This upward progression was chosen by Kabat-Zinn because it encourages a thorough, methodical sweep of the entire body, and because starting at the feet (which are far from the head where most people carry their stress awareness) helps develop sensitivity to parts of the body that are often ignored. The systematic approach ensures no area is skipped.',
  },
  {
    id: 5,
    question: 'What is the primary purpose of the mindful commute technique?',
    options: [
      'To practise meditation while driving for maximum efficiency',
      'To use travel time as a deliberate transition between work-mode and home-mode',
      'To reduce the boredom of a long commute',
      'To practise breathing exercises while stuck in traffic',
    ],
    correctAnswer: 1,
    explanation:
      'The mindful commute uses travel time as a deliberate psychological transition between work and home. Without this transition, many people carry work stress home with them (or home stress to work), which contaminates both environments. By using the commute mindfully — choosing a transition point, consciously letting go of one role, and preparing for the other — you create a clear boundary that protects both your working life and your personal life from cross-contamination.',
  },
  {
    id: 6,
    question:
      'Which of the following situations would be INAPPROPRIATE for practising a full Body Scan?',
    options: [
      'Sitting in the van during a lunch break',
      'Lying on the sofa in the evening after work',
      'While operating a power tool on site',
      'Sitting in a quiet room before bed',
    ],
    correctAnswer: 2,
    explanation:
      'A full Body Scan requires you to close your eyes (or soften your gaze) and direct your attention inwards, which significantly reduces your awareness of your external environment. Operating a power tool requires full external awareness and concentration. Practising a Body Scan in this situation would create a serious safety risk. The technique should only be used in safe environments where reduced external awareness is not a hazard.',
  },
  {
    id: 7,
    question:
      'An electrician has just experienced a near-miss incident on site where a scaffold board fell close to them. They are shaken and their heart is racing. Which technique would be most immediately useful?',
    options: [
      'A full 45-minute sitting meditation',
      'A 10-minute Body Scan lying down',
      'The 5-4-3-2-1 Grounding technique to anchor themselves in the present moment',
      'The mindful commute technique',
    ],
    correctAnswer: 2,
    explanation:
      'After a near-miss, the immediate priority is to ground yourself in the present moment and interrupt the acute stress response. The 5-4-3-2-1 Grounding technique is specifically designed for this: it anchors you in your current sensory experience, breaks the loop of replaying what just happened or catastrophising about what could have happened, and brings you back to the present reality (you are safe, the danger has passed). A full meditation or body scan would be impractical and inappropriate immediately after a safety incident on site.',
  },
  {
    id: 8,
    question:
      'What is the key difference between Box Breathing and the Three-Minute Breathing Space?',
    options: [
      'Box Breathing is longer and more complex than the Breathing Space',
      'Box Breathing focuses purely on the breathing pattern, while the Breathing Space includes awareness, gathering, and expanding stages',
      'The Breathing Space can only be used by trained meditation practitioners',
      'Box Breathing is only effective for physical symptoms, while the Breathing Space works on psychological symptoms',
    ],
    correctAnswer: 1,
    explanation:
      'Box Breathing is a focused breathing pattern (4-4-4-4) that works by activating the parasympathetic nervous system through controlled breathing. The Three-Minute Breathing Space is a broader mindfulness practice with three distinct stages (Awareness, Gathering, Expanding) that includes but goes beyond breathing. Box Breathing is best for immediate physiological calming; the Breathing Space is best for stepping back from automatic pilot and reconnecting with present-moment awareness. Both are effective, but they serve different purposes.',
  },
];

export default function RSMModule3Section2() {
  useSEO({
    title: 'Practical Mindfulness Techniques | RSM Module 3.2',
    description:
      'Three-Minute Breathing Space, Box Breathing, 5-4-3-2-1 Grounding, Body Scan, mindful commute, and construction-specific applications.',
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
            <Link to="../rsm-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Timer className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Practical Mindfulness Techniques
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto">
            Step-by-step techniques you can use immediately: breathing spaces, box breathing,
            grounding exercises, body scans, and the mindful commute
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Breathing Space:</strong> Three stages &mdash; Awareness, Gathering,
                Expanding &mdash; in three minutes
              </li>
              <li>
                <strong>Box Breathing:</strong> 4-4-4-4 pattern used by military and emergency
                services
              </li>
              <li>
                <strong>Grounding:</strong> 5-4-3-2-1 sensory technique for acute stress and panic
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Immediate:</strong> These techniques can reduce stress in seconds to
                minutes, not weeks
              </li>
              <li>
                <strong>Discreet:</strong> Every technique can be practised silently without anyone
                noticing
              </li>
              <li>
                <strong>Proven:</strong> All backed by clinical research and used by elite
                performance professionals
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Demonstrate the Three-Minute Breathing Space with its three distinct stages: Awareness, Gathering, Expanding',
              'Practise Box Breathing using the correct 4-4-4-4 pattern and explain its physiological mechanism',
              'Apply the 5-4-3-2-1 Grounding technique for acute stress and explain why sensory anchoring works',
              'Describe the Body Scan technique and identify when and where it can be safely practised',
              'Explain the mindful commute concept and its role in creating psychological boundaries between work and home',
              'Identify situations where mindfulness techniques should NOT be used due to safety considerations',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Three-Minute Breathing Space */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Three-Minute Breathing Space
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Three-Minute Breathing Space is the single most practical mindfulness technique
                for working life. Developed as part of Mindfulness-Based Cognitive Therapy (MBCT) by
                Segal, Williams, and Teasdale (2002), it was designed specifically as a brief
                practice that could be used throughout the day to interrupt automatic pilot,
                reconnect with the present moment, and create a deliberate pause between stimulus
                and response.
              </p>

              <p>
                The practice follows an hourglass shape: you start wide (broad awareness), narrow to
                a single point (the breath), and then expand back out (whole-body awareness). Each
                stage lasts approximately one minute, giving you a complete mindfulness reset in
                just three minutes.
              </p>

              <div className="space-y-3">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      A
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Stage 1: Awareness (Minute 1)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Begin by deliberately adopting an upright, dignified posture &mdash; whether
                    sitting, standing, or even walking. Then ask yourself:{' '}
                    <em>&ldquo;What is my experience right now?&rdquo;</em>
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Thoughts:</strong> What thoughts are passing through your mind right
                        now? Not judging them, not trying to change them &mdash; simply noticing.
                        Perhaps you are thinking about the job you have just finished, worrying
                        about the one coming up, or replaying a conversation.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Feelings:</strong> What emotions are present? Stress, frustration,
                        anxiety, boredom, contentment? Again, simply acknowledging what is there
                        without trying to fix it.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Sensations:</strong> What physical sensations do you notice? Tension
                        in the shoulders, tightness in the chest, cold hands, aching back? Just
                        noticing.
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-white mt-2">
                    This stage creates a snapshot of your current state. It is the &ldquo;checking
                    in&rdquo; that most of us never do &mdash; we go through the day on autopilot
                    without ever stopping to notice how we actually are.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      G
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Stage 2: Gathering (Minute 2)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Now narrow your attention from the broad awareness of stage one to a single
                    anchor point: the breath. Focus on the physical sensations of breathing.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Feel the air entering and leaving through your nostrils</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Notice the rise and fall of your chest or abdomen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        If your mind wanders (it will), gently notice that it has wandered and
                        return to the breath
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Do not try to change your breathing &mdash; simply observe it as it
                        naturally occurs
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-white mt-2">
                    This narrowing of focus interrupts whatever cognitive loop you were caught in
                    (worry, rumination, planning, frustration) and anchors you in a single point of
                    present-moment awareness. The breath is always available, always in the present
                    moment, and always neutral.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      E
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Stage 3: Expanding (Minute 3)
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Now expand your awareness from the breath back outwards to include your whole
                    body, the space around you, and the activity you are about to engage in.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Expand your awareness to include your whole body &mdash; your posture, your
                        physical state
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Include the sounds around you, the temperature, the space you are in
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Bring awareness to the task or activity that comes next</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        Open your eyes (if they were closed) and move forward with presence
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-white mt-2">
                    You are now re-entering your activity from a place of awareness rather than
                    autopilot. The three minutes have given you a complete reset: you have
                    acknowledged your current state, interrupted automatic thinking, and re-engaged
                    with the present moment deliberately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Box Breathing (4-4-4-4) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Box Breathing (4-4-4-4)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Box Breathing, also known as square breathing or tactical breathing, is used by
                military special forces, emergency services, elite athletes, and surgical teams
                worldwide. It is called &ldquo;tactical&rdquo; breathing because it was specifically
                developed for use in high-pressure, high-stakes situations where maintaining
                cognitive clarity and emotional control is critical.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-rose-400">4s</p>
                  <p className="text-xs text-white">Inhale</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-rose-400">4s</p>
                  <p className="text-xs text-white">Hold</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-rose-400">4s</p>
                  <p className="text-xs text-white">Exhale</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-rose-400">4s</p>
                  <p className="text-xs text-white">Hold</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Step-by-Step Instructions</p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 1:</strong> Breathe in slowly through your nose for 4 seconds,
                      feeling your lungs fill from the bottom upwards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 2:</strong> Hold your breath for 4 seconds &mdash; do not tense;
                      simply pause gently at the top of the inhale
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 3:</strong> Exhale slowly through your mouth for 4 seconds,
                      letting the air leave in a controlled, steady stream
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 4:</strong> Hold the empty breath for 4 seconds before beginning
                      the next cycle
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Repeat</strong> for 4 complete cycles (approximately 4 minutes total)
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The physiological mechanism is well understood. The controlled, rhythmic breathing
                pattern activates the parasympathetic nervous system via the vagus nerve. The holds
                (both at the top and bottom of the breath) increase the CO2 tolerance threshold,
                which is a key factor in reducing the feeling of breathlessness that accompanies
                anxiety. Within two to three minutes, cortisol levels begin to drop, heart rate
                decreases, and cognitive clarity improves.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Before a Difficult Client Conversation
                  </p>
                </div>
                <p className="text-sm text-white">
                  You have just received a phone call from a client who is unhappy about the cost of
                  additional work. You can feel your jaw clenching and your chest tightening. Before
                  calling them back, you sit in the van and run through four cycles of box
                  breathing: inhale 4, hold 4, exhale 4, hold 4. By the time you pick up the phone,
                  your voice is steady, your thinking is clear, and you are able to explain the
                  additional costs calmly and professionally. The conversation goes well because you
                  entered it regulated, not reactive.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: 5-4-3-2-1 Grounding */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            5-4-3-2-1 Grounding Technique
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The 5-4-3-2-1 Grounding technique is one of the most effective tools for managing
                acute stress, panic, and anxiety. It works by systematically engaging all five
                senses to anchor your attention in the present physical environment, interrupting
                the cognitive loop of worry, catastrophising, or traumatic replay that sustains the
                stress response.
              </p>

              <p>
                This technique is particularly useful after a near-miss, a confrontation, bad news,
                or any sudden stressful event. It requires no equipment, no special environment, and
                no prior training. It can be practised with your eyes open, anywhere, without anyone
                knowing you are doing it.
              </p>

              <div className="space-y-3">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">5 Things You Can SEE</p>
                  </div>
                  <p className="text-sm text-white">
                    Look around and consciously identify five things you can see. Name them
                    deliberately in your mind:{' '}
                    <em>
                      the red fire extinguisher, the grey conduit on the ceiling, the scaffolding
                      through the window, my test meter on the bench, the green exit sign.
                    </em>{' '}
                    Do not rush. Really look at each one as if noticing it for the first time. This
                    engages your visual cortex and begins pulling your attention out of internal
                    rumination and into the external present.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">4 Things You Can HEAR</p>
                  </div>
                  <p className="text-sm text-white">
                    Focus on your hearing and identify four distinct sounds:{' '}
                    <em>
                      the hum of the site generator, traffic outside, a drill somewhere on the floor
                      above, my own breathing.
                    </em>{' '}
                    Many of these sounds are ones you normally filter out. By deliberately attending
                    to them, you are expanding your sensory awareness and further anchoring yourself
                    in the present physical environment.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Hand className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">3 Things You Can TOUCH</p>
                  </div>
                  <p className="text-sm text-white">
                    Notice three things you can physically feel right now:{' '}
                    <em>
                      the texture of my work trousers against my legs, the solid ground under my
                      boots, the cool metal of the railing I am leaning against.
                    </em>{' '}
                    Tactile sensation is powerfully grounding because it connects you directly to
                    your physical body and the physical world around you. Some people find it
                    helpful to actively touch something &mdash; running their hand along a surface,
                    feeling the weight of a tool in their hand.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-rose-400 mb-2">
                        2 Things You Can SMELL
                      </p>
                      <p className="text-sm text-white/80">
                        Identify two things you can smell:{' '}
                        <em>fresh plaster, coffee from the flask, dust, PVC from new cable.</em>{' '}
                        Smell is directly connected to the limbic system (the emotional brain) and
                        can have a powerful grounding effect. If you cannot detect obvious smells,
                        bring something closer &mdash; smell the back of your hand, your sleeve, or
                        a nearby material.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-rose-400 mb-2">
                        1 Thing You Can TASTE
                      </p>
                      <p className="text-sm text-white/80">
                        Notice one thing you can taste right now:{' '}
                        <em>
                          the remnant of your morning tea, toothpaste, the slight metallic tang from
                          the dusty air.
                        </em>{' '}
                        If you cannot taste anything specific, take a sip of water or press your
                        tongue against the roof of your mouth and notice the sensation. This final
                        sense completes the full-body grounding, bringing you fully into the present
                        physical reality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: After a Near-Miss Incident
                  </p>
                </div>
                <p className="text-sm text-white">
                  A scaffold board has fallen and landed within a metre of where you were standing.
                  Your heart is pounding, your hands are shaking, and your mind is racing with
                  &ldquo;what if&rdquo; thoughts. You move to a safe area and immediately begin
                  5-4-3-2-1: five things you can see (the safety netting, the site cabin, your tool
                  bag, the blue sky, the crane in the distance), four things you can hear (the site
                  alarm being acknowledged, voices of colleagues, wind, a distant radio), three
                  things you can touch (the fence you are leaning on, the fabric of your gloves, the
                  hard hat on your head), two things you can smell (fresh air, the diesel from the
                  generator), one thing you can taste (the last sip of tea). Within two to three
                  minutes, your heart rate has begun to settle, the shaking has reduced, and you are
                  thinking clearly enough to report the incident properly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: The Body Scan (10-Minute Version) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Body Scan (10-Minute Version)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Body Scan is one of the four core MBSR practices. While the formal version takes
                30-45 minutes, a shortened 10-minute version is highly effective and much more
                practical for working life. The Body Scan develops interoceptive awareness &mdash;
                the ability to sense and interpret signals from inside your own body &mdash; which
                is a key component of emotional intelligence and stress management.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  10-Minute Body Scan: Step by Step
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Position:</strong> Sit comfortably or lie down. Close your eyes or
                      soften your gaze. Take three slow, deep breaths to settle.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Feet (1 minute):</strong> Direct your attention to the soles of your
                      feet. Notice any sensations &mdash; warmth, tingling, pressure from the floor,
                      tightness in the arches. Simply observe without trying to change anything.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Legs (1.5 minutes):</strong> Move your attention up through your
                      ankles, calves, knees, and thighs. Notice heaviness, lightness, tension, or
                      numbness. If you have been kneeling or climbing all morning, you might notice
                      aching or fatigue &mdash; observe it without judgement.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Hips and Lower Back (1.5 minutes):</strong> Bring attention to your
                      pelvis, hips, and lower back. This is where many electricians carry physical
                      tension from bending, lifting, and working in awkward positions. Notice what
                      is there.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Abdomen and Chest (1.5 minutes):</strong> Notice the movement of
                      breathing in your abdomen and chest. Notice any tightness, butterflies, or
                      holding. Stress often manifests here as a tight chest or a knotted stomach.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Shoulders and Arms (1.5 minutes):</strong> Move attention to your
                      shoulders, upper arms, elbows, forearms, wrists, and hands. Shoulders are one
                      of the most common tension-holding areas. Notice if they are raised, tight, or
                      hunched.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Neck, Face, and Head (1.5 minutes):</strong> Bring attention to your
                      neck, jaw, face, and the top of your head. Notice jaw clenching (very common
                      under stress), tension around the eyes, or a tight forehead.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Whole Body (1 minute):</strong> Finally, expand your awareness to
                      include your entire body as one complete unit. Take a few deep breaths and,
                      when you are ready, gently open your eyes.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Construction Example: Evening Body Scan for Recovery
                </p>
                <p className="text-sm text-white">
                  After a physically demanding day on site &mdash; overhead work, ladder work,
                  crawling through ceiling voids &mdash; a ten-minute body scan in the evening helps
                  your body transition from &ldquo;work mode&rdquo; to &ldquo;rest mode.&rdquo; As
                  you scan through each body part, you notice where the day has left its mark: tight
                  shoulders from overhead cable runs, aching knees from kneeling, stiff lower back
                  from bending. Simply noticing and breathing into these areas promotes physical
                  relaxation, improves sleep quality, and helps you identify when strain is building
                  up before it becomes a chronic injury.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: The Mindful Commute */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Mindful Commute
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                For many electricians, the commute is the longest unstructured period of the day. It
                is often spent replaying stressful events, worrying about upcoming tasks, listening
                to increasingly agitating news, or making stressful phone calls. The mindful commute
                transforms this dead time into a deliberate psychological transition between
                work-mode and home-mode.
              </p>

              <p>
                The concept is simple: use your travel time as a conscious boundary between your two
                worlds. Without this transition, work stress bleeds into home life (you walk through
                the door already irritable, distracted, and emotionally unavailable) and home stress
                bleeds into work (you arrive on site carrying an argument from breakfast, a worry
                about finances, or poor sleep).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  How to Practise the Mindful Commute
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Choose a transition point:</strong> Pick a specific landmark on your
                      route (a particular roundabout, a bridge, a specific junction) that becomes
                      your psychological &ldquo;threshold.&rdquo; Before this point, you are in the
                      role you are leaving. After it, you begin preparing for the role you are
                      arriving into.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Before the threshold:</strong> Allow yourself to process the day.
                      Think about what went well, what was challenging, and what you want to let go
                      of. This is not rumination; it is deliberate processing &mdash; acknowledging
                      and then releasing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>At the threshold:</strong> Consciously let go of the day. Some people
                      find it helpful to say (silently or aloud): &ldquo;I am leaving work behind. I
                      am now heading home.&rdquo; This may sound strange, but the deliberate
                      verbalisation creates a genuine psychological boundary.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After the threshold:</strong> Begin thinking about the role you are
                      arriving into. Who will be at home? What do they need from you? What kind of
                      presence do you want to bring through the door? Alternatively, use this time
                      for silent awareness of the drive itself &mdash; the feel of the steering
                      wheel, the view through the windscreen, the sounds of the engine.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Car className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Why the Commute Matters So Much
                  </p>
                </div>
                <p className="text-sm text-white">
                  Research by the Institute for Employment Studies found that the inability to
                  &ldquo;switch off&rdquo; from work is one of the strongest predictors of burnout,
                  relationship difficulties, and poor mental health in construction workers. The
                  commute is your natural opportunity to create a buffer zone. Without it, you are
                  asking your brain to switch instantly from one demanding role to another &mdash;
                  which it cannot do effectively. The mindful commute gives your brain the
                  transition time it needs to let go of one context and prepare for the next.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: When NOT to Use These Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            When NOT to Use These Techniques
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While mindfulness techniques are powerful tools, there are important safety
                considerations about when and where they should be used. Mindfulness should enhance
                your safety, never compromise it.
              </p>

              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">
                  Do NOT Use Eyes-Closed Techniques When:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Driving or operating a vehicle</strong> &mdash; never close your eyes
                      or significantly divert your attention while driving, even in traffic
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Operating machinery or power tools</strong> &mdash; full external
                      awareness is essential when using any equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Working at height</strong> &mdash; on ladders, scaffolding, or
                      elevated platforms where reduced awareness could lead to a fall
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>During an active emergency</strong> &mdash; deal with the immediate
                      situation first; use grounding techniques afterwards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong>Working live</strong> &mdash; any electrical work where reduced
                      attention could result in contact with live conductors
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">
                  Safe Alternatives for the Workplace:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>5-4-3-2-1 Grounding</strong> can be used anywhere because it increases
                      (rather than decreases) awareness of your surroundings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Box Breathing</strong> can be done with eyes open and is completely
                      discreet &mdash; suitable for any non-emergency situation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Mindful awareness</strong> of the task you are doing (noticing
                      sensations, sounds, movements) can be practised during any work activity
                    </span>
                  </li>
                </ul>
              </div>

              {/* Key Takeaways */}
              <div className="border-l-2 border-green-500/50 pl-4 mt-8">
                <p className="text-sm font-medium text-white mb-3">Key Takeaways</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The Three-Minute Breathing Space (Awareness, Gathering, Expanding) is the most
                      practical technique for working life and can be used anywhere
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Box Breathing (4-4-4-4) is used by military and emergency services for rapid
                      stress reduction under pressure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      5-4-3-2-1 Grounding anchors you through all five senses and is ideal after a
                      near-miss or sudden stressful event
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The Body Scan develops awareness of physical tension and is best practised
                      during breaks or in the evening
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The mindful commute creates a psychological boundary between work and home,
                      reducing stress cross-contamination
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Always match the technique to the situation &mdash; never use eyes-closed
                      practices in safety-critical environments
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                <h3 className="text-sm font-medium text-rose-400 mb-2">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-3-section-3">
              Next: Cognitive Strategies
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
