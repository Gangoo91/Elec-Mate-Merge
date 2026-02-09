import {
  ArrowLeft,
  HeartPulse,
  CheckCircle,
  AlertTriangle,
  Heart,
  Activity,
  Users,
  Link as LinkIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'compression-rate',
    question: 'What is the correct compression rate for adult CPR?',
    options: [
      '60&ndash;80 per minute',
      '80&ndash;100 per minute',
      '100&ndash;120 per minute',
      '120&ndash;140 per minute',
    ],
    correctIndex: 2,
    explanation:
      'The Resuscitation Council UK 2021 guidelines (updated 2025) recommend a compression rate of 100&ndash;120 per minute for adult CPR. A useful aid is to push to the beat of &ldquo;Stayin&rsquo; Alive&rdquo; by the Bee Gees, which has a tempo of approximately 104 beats per minute.',
  },
  {
    id: 'compression-breath-ratio',
    question: 'What ratio of compressions to rescue breaths is used in adult CPR?',
    options: [
      '15 compressions to 1 breath',
      '15 compressions to 2 breaths',
      '30 compressions to 1 breath',
      '30 compressions to 2 breaths',
    ],
    correctIndex: 3,
    explanation:
      'The standard ratio for adult CPR is 30 chest compressions followed by 2 rescue breaths. This ratio applies whether CPR is being performed by one rescuer or two. If you are unwilling or unable to give rescue breaths, compression-only CPR is still far better than no CPR at all.',
  },
  {
    id: 'agonal-breathing',
    question: 'What should you do if you see agonal breathing in an unresponsive person?',
    options: [
      'Place them in the recovery position and monitor',
      'Wait to see if their breathing improves',
      'Start CPR immediately &mdash; agonal breathing is not normal breathing',
      'Give rescue breaths only, without compressions',
    ],
    correctIndex: 2,
    explanation:
      'Agonal breathing (irregular, infrequent gasps that may sound like snoring or groaning) is present in up to 40% of cardiac arrests. It is NOT normal breathing. An unresponsive person with agonal breathing should be treated as being in cardiac arrest &mdash; start CPR immediately and call 999.',
  },
];

const faqs = [
  {
    question: 'Should I stop CPR to check if the person is breathing?',
    answer:
      'No. Once you have started CPR, you should continue with minimal interruption. Stopping to check for breathing wastes valuable time and reduces the effectiveness of CPR. The only reasons to stop are: emergency services arrive and take over, the casualty shows clear signs of life (normal breathing, movement, eyes opening), you are too exhausted to continue, or a defibrillator is ready to analyse the heart rhythm. Any pause in compressions allows blood pressure to drop rapidly.',
  },
  {
    question: 'Can I harm someone by performing CPR if they are not in cardiac arrest?',
    answer:
      'The risk of harm from performing CPR on someone who does not need it is very low compared to the risk of NOT performing CPR on someone who does need it. If a person is genuinely unresponsive and not breathing normally, the benefit of starting CPR far outweighs any risk. Cracked ribs can occur during effective CPR, but this is a minor injury compared to death from cardiac arrest. The Resuscitation Council UK is clear: if in doubt, start CPR.',
  },
  {
    question: 'Is compression-only CPR as effective as CPR with rescue breaths?',
    answer:
      'For the first few minutes of a witnessed cardiac arrest in an adult, compression-only CPR can be almost as effective as full CPR with rescue breaths. This is because the blood still contains oxygen for a short period after the heart stops. However, for prolonged resuscitation, drowning, or cardiac arrest in children, rescue breaths are important because the oxygen in the blood becomes depleted. Compression-only CPR is always far better than no CPR at all.',
  },
  {
    question: 'Am I legally protected if I perform CPR and something goes wrong?',
    answer:
      'Yes. In the UK, the Social Action, Responsibility and Heroism Act 2015 provides legal protection for people who act to help others in an emergency. As long as you act in good faith and within the scope of your training, you are protected. No bystander in the UK has ever been successfully sued for performing CPR in good faith. The greatest legal and moral risk is doing nothing when someone is in cardiac arrest.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What are the four links in the Chain of Survival?',
    options: [
      'Call 999, CPR, defibrillation, hospital transfer',
      'Early recognition and call for help, early CPR, early defibrillation, post-resuscitation care',
      'Danger assessment, airway management, rescue breaths, chest compressions',
      'Scene safety, primary survey, secondary survey, handover',
    ],
    correctAnswer: 1,
    explanation:
      'The Chain of Survival consists of four links: (1) Early recognition and call for help, (2) Early CPR to buy time, (3) Early defibrillation to restart the heart, and (4) Post-resuscitation care to improve outcomes. Each link must be strong for the best chance of survival.',
  },
  {
    id: 2,
    question: 'How do you recognise cardiac arrest in a casualty?',
    options: [
      'Check for a pulse at the wrist for 30 seconds',
      'The casualty is unresponsive and not breathing normally (or only agonal gasps)',
      'The casualty is pale, cold, and sweating',
      'The casualty complains of chest pain and shortness of breath',
    ],
    correctAnswer: 1,
    explanation:
      'Cardiac arrest is recognised when a person is unresponsive AND not breathing normally (or only making occasional agonal gasps). You should NOT check for a pulse as this is unreliable for non-healthcare professionals and wastes valuable time. If in doubt, start CPR.',
  },
  {
    id: 3,
    question: 'What is the correct compression depth for adult CPR?',
    options: ['2&ndash;3 cm', '3&ndash;4 cm', '5&ndash;6 cm', '7&ndash;8 cm'],
    correctAnswer: 2,
    explanation:
      'The correct compression depth for adult CPR is 5&ndash;6 cm (approximately one-third of the depth of the chest). Compressions that are too shallow are ineffective, while compressions that are too deep can cause injury. Allow full chest recoil between each compression.',
  },
  {
    id: 4,
    question: 'Where should you place your hands for adult chest compressions?',
    options: [
      'On the upper half of the breastbone, near the collarbones',
      'On the lower half of the breastbone, in the centre of the chest',
      'On the left side of the chest, directly over the heart',
      'On the abdomen, just below the ribcage',
    ],
    correctAnswer: 1,
    explanation:
      'Place the heel of one hand on the centre of the chest, on the lower half of the breastbone (sternum). Place your other hand on top and interlock your fingers. Keep your arms straight and push down vertically using your body weight.',
  },
  {
    id: 5,
    question: 'What is agonal breathing?',
    options: [
      'Rapid, shallow breathing that occurs during a panic attack',
      'Slow, deep breathing that occurs during sleep',
      'Irregular, infrequent gasps that may sound like snoring or groaning',
      'Wheezing caused by a narrowed airway',
    ],
    correctAnswer: 2,
    explanation:
      'Agonal breathing consists of irregular, infrequent gasps that may sound like snoring, groaning, or gasping. It is present in up to 40% of cardiac arrests and is NOT normal breathing. It is caused by the brainstem&rsquo;s dying reflex. An unresponsive person with agonal breathing should be treated as being in cardiac arrest.',
  },
  {
    id: 6,
    question:
      'According to UK statistics, approximately what is the survival rate for out-of-hospital cardiac arrest without bystander CPR?',
    options: [
      'Approximately 1&ndash;2%',
      'Approximately 8&ndash;10%',
      'Approximately 25&ndash;30%',
      'Approximately 50%',
    ],
    correctAnswer: 1,
    explanation:
      'The overall survival rate for out-of-hospital cardiac arrest in the UK is approximately 8&ndash;10%. However, bystander CPR can double or triple survival chances, and the use of an AED within 3&ndash;5 minutes can increase survival to 50&ndash;70%. Without any intervention, survival drops by approximately 10% for every minute that passes.',
  },
  {
    id: 7,
    question: 'When performing CPR on a pregnant woman, what modification should you consider?',
    options: [
      'Do not perform CPR on pregnant women &mdash; wait for paramedics',
      'Use a hand position slightly higher on the breastbone and apply a left lateral tilt if possible',
      'Perform compressions on the abdomen instead of the chest',
      'Give rescue breaths only, without chest compressions',
    ],
    correctAnswer: 1,
    explanation:
      'CPR should always be performed on a pregnant woman in cardiac arrest. The hand position may need to be slightly higher on the breastbone to account for the displaced diaphragm. If possible, manually tilt the casualty to the left (left lateral tilt) to relieve pressure on the inferior vena cava from the uterus, which improves blood return to the heart.',
  },
  {
    id: 8,
    question: 'What is the 2025 update regarding the surface for performing CPR?',
    options: [
      'CPR must only be performed on a hard, flat floor surface',
      'CPR can be performed on a bed if moving the casualty is not practical',
      'CPR should be performed on a soft surface to prevent rib fractures',
      'A backboard must always be placed under the casualty before CPR',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 guidelines update acknowledges that CPR can be performed on a bed if moving the casualty to the floor is not practical. This is particularly important in workplace scenarios where a casualty may collapse in a confined space or where moving them could cause delay. While a firm surface is ideal, the priority is to start compressions as quickly as possible without unnecessary delay.',
  },
];

export default function FirstAidModule2Section1() {
  useSEO({
    title: 'Cardiac Arrest & CPR | First Aid Module 2.1',
    description:
      'Learn how to recognise cardiac arrest, perform adult CPR following Resuscitation Council UK 2021/2025 guidelines, understand the Chain of Survival, agonal breathing, compression-only CPR, and special circumstances.',
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
            <Link to="../first-aid-module-2">
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
          <HeartPulse className="h-10 w-10 text-rose-400 mx-auto mb-4" />
          <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Cardiac Arrest &amp; CPR
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Recognising cardiac arrest, performing effective CPR, and understanding the Chain of
            Survival &mdash; following Resuscitation Council UK 2021/2025 guidelines
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">00</span>
            Quick Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Recognise:</strong> Unresponsive + not breathing normally = cardiac
                    arrest.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Call 999:</strong> Immediately, or send someone to call while you start
                    CPR.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>30:2 ratio:</strong> 30 compressions, 2 rescue breaths. Repeat.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Push hard &amp; fast:</strong> 5&ndash;6&nbsp;cm deep, 100&ndash;120 per
                    minute.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>AED:</strong> Use as soon as one arrives &mdash; it talks you through
                    it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Don&rsquo;t stop:</strong> Continue until help arrives or the casualty
                    shows signs of life.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">In the Workplace</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Know your AED location:</strong> Every workplace should have a
                    defibrillator and trained users.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Electrocution risk:</strong> Electricians face a higher risk of cardiac
                    arrest from electric shock.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Bed/surface:</strong> 2025 update &mdash; CPR can be done on a bed if
                    moving is not practical.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span>
                    <strong>Agonal gasps:</strong> Sound like snoring &mdash; this is NOT normal
                    breathing. Start CPR.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">&nbsp;</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>Explain the four links of the Chain of Survival and why each one matters</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>Recognise the signs of cardiac arrest, including agonal breathing</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>Perform high-quality adult CPR at the correct rate, depth, and ratio</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>Deliver effective rescue breaths using the head-tilt, chin-lift technique</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Describe when compression-only CPR is appropriate and why it still saves lives
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Adapt CPR for special circumstances including pregnancy, drowning, and children
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: The Chain of Survival */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">01</span>
              The Chain of Survival
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Chain of Survival is the internationally recognised sequence of actions that
                gives a person in cardiac arrest the best chance of survival. Each link in the chain
                is critical &mdash; if any link is weak or missing, survival chances drop
                dramatically. As a first aider in the workplace, you are responsible for the first
                three links.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">Definition: Cardiac Arrest</h3>
                <p className="text-white/80 text-sm">
                  <strong className="text-white">Cardiac arrest</strong> occurs when the heart
                  suddenly stops pumping blood around the body. The brain and vital organs are
                  starved of oxygen. Without intervention, death occurs within minutes. Cardiac
                  arrest is different from a heart attack &mdash; a heart attack is a circulation
                  problem (blocked artery), while cardiac arrest is an electrical problem (the heart
                  stops beating effectively).
                </p>
              </div>

              {/* Chain of Survival Diagram */}
              <div className="bg-white/5 border border-rose-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  Chain of Survival
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
                  {/* Link 1 */}
                  <div className="flex flex-col items-center text-center w-full sm:w-1/4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-500/20 border-2 border-rose-400/60 flex items-center justify-center mb-2">
                      <span className="text-rose-300 font-bold text-xl sm:text-2xl">1</span>
                    </div>
                    <p className="text-rose-300 font-semibold text-xs sm:text-sm leading-tight">
                      Early Recognition
                      <br />
                      &amp; Call for Help
                    </p>
                    <p className="text-white/60 text-xs mt-1 leading-tight">
                      Recognise cardiac arrest.
                      <br />
                      Call 999 immediately.
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="hidden sm:flex items-center justify-center flex-shrink-0 px-1">
                    <div className="w-6 h-0.5 bg-rose-400/40" />
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-rose-400/40" />
                  </div>
                  <div className="sm:hidden flex items-center justify-center py-1">
                    <div className="h-4 w-0.5 bg-rose-400/40" />
                  </div>
                  {/* Link 2 */}
                  <div className="flex flex-col items-center text-center w-full sm:w-1/4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-500/20 border-2 border-rose-400/60 flex items-center justify-center mb-2">
                      <span className="text-rose-300 font-bold text-xl sm:text-2xl">2</span>
                    </div>
                    <p className="text-rose-300 font-semibold text-xs sm:text-sm leading-tight">
                      Early CPR
                    </p>
                    <p className="text-white/60 text-xs mt-1 leading-tight">
                      Buy time. Keep blood
                      <br />
                      flowing to the brain.
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="hidden sm:flex items-center justify-center flex-shrink-0 px-1">
                    <div className="w-6 h-0.5 bg-rose-400/40" />
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-rose-400/40" />
                  </div>
                  <div className="sm:hidden flex items-center justify-center py-1">
                    <div className="h-4 w-0.5 bg-rose-400/40" />
                  </div>
                  {/* Link 3 */}
                  <div className="flex flex-col items-center text-center w-full sm:w-1/4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-500/20 border-2 border-rose-400/60 flex items-center justify-center mb-2">
                      <span className="text-rose-300 font-bold text-xl sm:text-2xl">3</span>
                    </div>
                    <p className="text-rose-300 font-semibold text-xs sm:text-sm leading-tight">
                      Early
                      <br />
                      Defibrillation
                    </p>
                    <p className="text-white/60 text-xs mt-1 leading-tight">
                      Shock the heart back
                      <br />
                      into a normal rhythm.
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="hidden sm:flex items-center justify-center flex-shrink-0 px-1">
                    <div className="w-6 h-0.5 bg-rose-400/40" />
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-rose-400/40" />
                  </div>
                  <div className="sm:hidden flex items-center justify-center py-1">
                    <div className="h-4 w-0.5 bg-rose-400/40" />
                  </div>
                  {/* Link 4 */}
                  <div className="flex flex-col items-center text-center w-full sm:w-1/4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-500/20 border-2 border-rose-400/60 flex items-center justify-center mb-2">
                      <span className="text-rose-300 font-bold text-xl sm:text-2xl">4</span>
                    </div>
                    <p className="text-rose-300 font-semibold text-xs sm:text-sm leading-tight">
                      Post-Resuscitation
                      <br />
                      Care
                    </p>
                    <p className="text-white/60 text-xs mt-1 leading-tight">
                      Advanced care by
                      <br />
                      paramedics &amp; hospital.
                    </p>
                  </div>
                </div>
                <p className="text-white/50 text-xs text-center mt-4 italic">
                  Each link increases the chance of survival. Bystander CPR alone doubles or triples
                  survival rates.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">Why Every Link Matters</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Link 1 &mdash; Early recognition:</strong> The sooner cardiac arrest
                      is recognised and 999 is called, the sooner professional help is dispatched.
                      Every minute without CPR reduces survival by approximately 10%.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Link 2 &mdash; Early CPR:</strong> Chest compressions manually pump
                      blood around the body, delivering oxygen to the brain and vital organs. CPR
                      buys time until a defibrillator arrives. Without CPR, brain damage begins
                      within 3&ndash;4 minutes.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Link 3 &mdash; Early defibrillation:</strong> Most cardiac arrests are
                      caused by an abnormal heart rhythm called ventricular fibrillation (VF). The
                      only effective treatment for VF is an electrical shock from a defibrillator.
                      CPR alone cannot restart the heart.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Link 4 &mdash; Post-resuscitation care:</strong> Even after the heart
                      is restarted, the casualty needs advanced medical care to stabilise their
                      condition and prevent further cardiac arrest. This is provided by paramedics
                      and hospital teams.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Time Is Critical</h3>
                </div>
                <p className="text-white/80 text-sm">
                  For every minute that passes without CPR or defibrillation, the chance of survival
                  decreases by approximately 10%. After 10 minutes without intervention, survival is
                  extremely unlikely. This is why bystander action is so important &mdash; the
                  average ambulance response time in the UK is 7&ndash;8 minutes. Your actions in
                  those first few minutes can be the difference between life and death.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Recognising Cardiac Arrest */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">02</span>
              Recognising Cardiac Arrest
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Rapid recognition of cardiac arrest is the first link in the Chain of Survival. The
                quicker you recognise that someone is in cardiac arrest, the sooner you can call for
                help and start CPR. The assessment should take no more than 10 seconds.
              </p>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-3">Two-Step Recognition</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Check for Response</h4>
                        <p className="text-white/80 text-sm">
                          Gently shake the casualty&rsquo;s shoulders and shout loudly: &ldquo;Can
                          you hear me? Open your eyes!&rdquo; If there is no response, the casualty
                          is <strong className="text-white">unresponsive</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">
                          Check for Normal Breathing
                        </h4>
                        <p className="text-white/80 text-sm">
                          Open the airway (head tilt, chin lift) and look, listen, and feel for
                          normal breathing for no more than 10 seconds. Look for chest movement,
                          listen for breath sounds, and feel for air on your cheek. If the casualty
                          is <strong className="text-white">not breathing normally</strong> (or only
                          making occasional agonal gasps), treat as cardiac arrest.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Do NOT Check for a Pulse</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The Resuscitation Council UK guidelines are clear:{' '}
                  <strong className="text-white">
                    non-healthcare professionals should NOT attempt to check for a pulse.
                  </strong>{' '}
                  Studies have shown that even trained healthcare professionals frequently make
                  errors when checking for a pulse &mdash; either finding a pulse that is not there,
                  or failing to detect one that is. Checking for a pulse wastes precious time. If a
                  person is unresponsive and not breathing normally, start CPR.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">Definition: Agonal Breathing</h3>
                <p className="text-white/80 text-sm">
                  <strong className="text-white">Agonal breathing</strong> consists of irregular,
                  infrequent gasps that may sound like snoring, groaning, or gasping. The casualty
                  may appear to be making an effort to breathe, but the breaths are ineffective and
                  do not deliver oxygen to the lungs. Agonal breathing is present in up to{' '}
                  <strong className="text-white">40% of cardiac arrests</strong> and is caused by
                  the brainstem&rsquo;s dying reflex. It is{' '}
                  <strong className="text-white">NOT normal breathing</strong> &mdash; if you see
                  agonal breathing in an unresponsive person, start CPR immediately.
                </p>
              </div>

              <p>
                Once you have established that the casualty is unresponsive and not breathing
                normally, you must act immediately: <strong>call 999</strong> (or shout for someone
                to call) and <strong>start CPR</strong>. If you are alone with no phone, perform CPR
                for one minute before leaving to call 999 &mdash; but ideally, call first if at all
                possible.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Adult CPR Technique */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">03</span>
              Adult CPR Technique
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The following technique is based on the{' '}
                <strong>Resuscitation Council UK 2021 guidelines</strong>, with updates from the{' '}
                <strong>2025 revision</strong>. These are the current UK standard for CPR and are
                the guidelines you will be assessed against on this course.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Heart className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Step-by-Step Adult CPR
                </h3>
                <div className="space-y-3">
                  {/* Step 1: Call 999 */}
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Call 999</h4>
                        <p className="text-white/80 text-sm">
                          Call 999 immediately, or send someone to call. Put the phone on speaker so
                          the ambulance dispatcher can guide you through CPR. Ask someone to fetch
                          the nearest AED.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 2: Position your hands */}
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Position Your Hands</h4>
                        <p className="text-white/80 text-sm">
                          Kneel beside the casualty. Place the{' '}
                          <strong className="text-white">
                            heel of one hand on the centre of the chest
                          </strong>{' '}
                          (on the lower half of the breastbone/sternum). Place your other hand on
                          top and <strong className="text-white">interlock your fingers</strong>.
                          Keep your fingers raised off the ribs.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 3: Compress */}
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">
                          Give 30 Chest Compressions
                        </h4>
                        <p className="text-white/80 text-sm">
                          Lock your arms straight, position your shoulders directly above your
                          hands, and press down firmly. Compress the chest to a depth of{' '}
                          <strong className="text-white">5&ndash;6&nbsp;cm</strong> (about one-third
                          of the chest depth). Push at a rate of{' '}
                          <strong className="text-white">
                            100&ndash;120 compressions per minute
                          </strong>{' '}
                          &mdash; to the beat of &ldquo;Stayin&rsquo; Alive&rdquo; by the Bee Gees.{' '}
                          <strong className="text-white">Allow full chest recoil</strong> between
                          each compression &mdash; do not lean on the chest.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 4: Rescue breaths */}
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Give 2 Rescue Breaths</h4>
                        <p className="text-white/80 text-sm">
                          Tilt the head back and lift the chin to open the airway. Pinch the nose
                          shut. Seal your mouth over the casualty&rsquo;s mouth and blow steadily
                          for about
                          <strong className="text-white"> 1 second</strong>, watching for the chest
                          to rise. Allow the chest to fall, then give a second breath. Each breath
                          should take no more than 1 second. If the chest does not rise, reposition
                          the head and try again. Do not attempt more than 2 breaths before
                          returning to compressions.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Step 5: Continue */}
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">5</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Continue 30:2</h4>
                        <p className="text-white/80 text-sm">
                          Continue the cycle of{' '}
                          <strong className="text-white">
                            30 compressions followed by 2 rescue breaths
                          </strong>{' '}
                          without stopping. If another trained rescuer is available, swap every 2
                          minutes to prevent fatigue &mdash; effective CPR is physically demanding.
                          Minimise any interruptions to chest compressions; pauses should not exceed
                          10 seconds.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CPR Hand Position Diagram */}
              <div className="bg-white/5 border border-rose-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  CPR Hand Position
                </h3>
                <div className="flex flex-col items-center">
                  {/* Chest outline */}
                  <div className="relative w-48 sm:w-56 h-64 sm:h-72 border-2 border-white/20 rounded-[40%_40%_20%_20%/30%_30%_10%_10%] bg-white/5">
                    {/* Breastbone line */}
                    <div className="absolute left-1/2 top-[15%] bottom-[25%] w-0.5 bg-white/20 -translate-x-1/2" />
                    {/* Label: Breastbone */}
                    <p className="absolute top-[8%] left-1/2 -translate-x-1/2 text-white/40 text-[10px] sm:text-xs whitespace-nowrap">
                      Breastbone (sternum)
                    </p>
                    {/* Hand placement zone */}
                    <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-20 sm:w-24 h-10 sm:h-12 rounded-lg border-2 border-rose-400 bg-rose-500/20 flex items-center justify-center">
                      <span className="text-rose-300 text-[10px] sm:text-xs font-semibold text-center leading-tight">
                        Hands
                        <br />
                        Here
                      </span>
                    </div>
                    {/* Arrow pointing to zone */}
                    <div className="absolute right-2 sm:right-4 top-[45%] -translate-y-1/2 flex items-center gap-1">
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-rose-400/60" />
                      <span className="text-rose-400/80 text-[9px] sm:text-[10px] leading-tight">
                        Lower half
                        <br />
                        of sternum
                      </span>
                    </div>
                    {/* Centre of chest label */}
                    <p className="absolute bottom-[12%] left-1/2 -translate-x-1/2 text-white/40 text-[10px] sm:text-xs whitespace-nowrap">
                      Centre of chest
                    </p>
                  </div>
                  <p className="text-white/50 text-xs text-center mt-3 italic max-w-xs">
                    Heel of one hand on the lower half of the breastbone, other hand on top, fingers
                    interlocked.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">
                  <Activity className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Key Numbers to Remember
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                    <p className="text-rose-400 font-bold text-xl sm:text-2xl">30:2</p>
                    <p className="text-white/60 text-xs mt-1">
                      Compressions
                      <br />
                      to breaths
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                    <p className="text-rose-400 font-bold text-xl sm:text-2xl">100&ndash;120</p>
                    <p className="text-white/60 text-xs mt-1">
                      Compressions
                      <br />
                      per minute
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                    <p className="text-rose-400 font-bold text-xl sm:text-2xl">5&ndash;6 cm</p>
                    <p className="text-white/60 text-xs mt-1">
                      Compression
                      <br />
                      depth
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                    <p className="text-rose-400 font-bold text-xl sm:text-2xl">1 sec</p>
                    <p className="text-white/60 text-xs mt-1">
                      Per rescue
                      <br />
                      breath
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">Full Chest Recoil</h3>
                <p className="text-white/80 text-sm">
                  <strong className="text-white">Full chest recoil</strong> means completely
                  releasing pressure on the chest after each compression, allowing the chest wall to
                  return to its normal position. This is essential because the recoil phase creates
                  a negative pressure inside the chest that draws blood back into the heart. If you
                  lean on the chest between compressions (a common mistake when fatigued), the heart
                  cannot refill properly and CPR becomes much less effective. Keep your hands in
                  contact with the chest but remove all downward pressure.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Rescue Breath Failure</h3>
                </div>
                <p className="text-white/80 text-sm">
                  If you cannot achieve effective rescue breaths (the chest does not rise), do not
                  spend excessive time trying. Ensure the head is adequately tilted back and the
                  chin lifted, check the mouth for visible obstructions, and attempt two breaths
                  only. If both breaths fail, immediately return to chest compressions. Do not delay
                  compressions to troubleshoot airway problems. The most important element of CPR is{' '}
                  <strong className="text-white">
                    continuous, high-quality chest compressions
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Compression-Only CPR */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">04</span>
              Compression-Only CPR
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Resuscitation Council UK recognises that not everyone is willing or able to give
                rescue breaths.
                <strong> Compression-only CPR</strong> (also called hands-only CPR) is an
                alternative that is significantly better than doing nothing at all.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">
                  When to Use Compression-Only CPR
                </h3>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      You are <strong className="text-white">untrained</strong> in rescue breaths
                      and feel unable to perform them safely
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      You are <strong className="text-white">unwilling</strong> to give
                      mouth-to-mouth (e.g. concerns about infection, blood, vomit)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      You are being <strong className="text-white">guided over the phone</strong> by
                      a 999 dispatcher
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      No pocket mask or face shield is available and you prefer not to give direct
                      mouth-to-mouth
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">How It Works</h3>
                <p className="text-white/80 text-sm mb-3">
                  Compression-only CPR means giving{' '}
                  <strong className="text-white">
                    continuous chest compressions without stopping for rescue breaths
                  </strong>
                  . Push hard and fast on the centre of the chest at 100&ndash;120 compressions per
                  minute. Do not stop until emergency services arrive.
                </p>
                <p className="text-white/80 text-sm">
                  In the first few minutes of a witnessed cardiac arrest, the blood still contains
                  enough oxygen to sustain the brain &mdash; provided it is being circulated by
                  chest compressions. This is why compression-only CPR is effective in the early
                  stages. Over time, however, the oxygen in the blood becomes depleted, which is why
                  rescue breaths become increasingly important for prolonged resuscitation.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">The Worst CPR Is No CPR</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Many bystanders hesitate to perform CPR because they fear doing it
                  &ldquo;wrong&rdquo;. The reality is simple:{' '}
                  <strong className="text-white">
                    any attempt at CPR is far better than no attempt at all.
                  </strong>{' '}
                  A person in cardiac arrest is clinically dead &mdash; you cannot make their
                  situation worse by trying to help. Imperfect CPR still circulates some blood.
                  Perfect inaction guarantees death. Push hard, push fast, and do not stop.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: When to Stop CPR */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">05</span>
              When to Stop CPR
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Once you have started CPR, you should continue with as few interruptions as
                possible. However, there are specific situations in which you should stop.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">You Should Stop CPR When:</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Emergency services arrive and take over:</strong> When paramedics
                      arrive, they will assess the casualty and take control of the resuscitation.
                      Continue CPR until they explicitly tell you to stop.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>The casualty shows signs of life:</strong> Normal breathing resumes,
                      the casualty moves purposefully, or they open their eyes. If the casualty
                      starts breathing normally, place them in the recovery position and monitor
                      closely &mdash; be prepared to restart CPR if they deteriorate.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>You are too exhausted to continue:</strong> Effective CPR is
                      physically demanding. If you cannot maintain adequate compression depth and
                      rate, your CPR is no longer effective. If another rescuer is available, swap
                      immediately. If you are alone and cannot continue, you have done your best.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>A defibrillator is ready to analyse:</strong> Pause compressions
                      briefly while the AED analyses the heart rhythm. Follow the AED&rsquo;s voice
                      prompts. Resume CPR immediately after the shock is delivered (or if no shock
                      is advised).
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Do Not Stop for Rib Fractures</h3>
                </div>
                <p className="text-white/80 text-sm">
                  You may hear or feel cracking during CPR. This is likely the cartilage connecting
                  the ribs to the breastbone, or the ribs themselves.{' '}
                  <strong className="text-white">Do not stop CPR.</strong>&nbsp; Rib fractures are a
                  common and accepted consequence of effective chest compressions. A cracked rib is
                  a minor injury compared to death from cardiac arrest. Continue CPR at the correct
                  depth and rate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: 2025 Update & Special Circumstances */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">06</span>
              2025 Update &amp; Special Circumstances
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">
                  2025 Guidelines Update: CPR on a Bed
                </h3>
                <p className="text-white/80 text-sm">
                  The <strong className="text-white">2025 Resuscitation Council UK update</strong>{' '}
                  acknowledges that CPR can be performed on a bed or other soft surface if moving
                  the casualty to the floor is not practical. This is particularly relevant in
                  workplace scenarios where a casualty may collapse in a confined space, an office,
                  or a welfare cabin. While a firm, flat surface remains ideal for effective
                  compressions, the priority is to{' '}
                  <strong className="text-white">start CPR as quickly as possible</strong> without
                  unnecessary delay. Do not waste time moving the casualty if it would significantly
                  delay the start of compressions.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Users className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  CPR in Special Circumstances
                </h3>
                <div className="space-y-4">
                  {/* Pregnancy */}
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-2">Pregnancy</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          CPR <strong className="text-white">must</strong> be performed on a
                          pregnant woman in cardiac arrest &mdash; do not hesitate
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Hand position may need to be{' '}
                          <strong className="text-white">slightly higher</strong> on the breastbone
                          to account for the displaced diaphragm
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          If possible, apply a{' '}
                          <strong className="text-white">left lateral tilt</strong> (manually tilt
                          the casualty to the left, or place a wedge/rolled blanket under the right
                          hip) to relieve pressure from the uterus on the inferior vena cava
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          If tilting is not possible, perform standard CPR &mdash; any CPR is better
                          than none
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Drowning */}
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-2">Drowning</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Drowning is a respiratory emergency &mdash;{' '}
                          <strong className="text-white">rescue breaths are essential</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Give <strong className="text-white">5 initial rescue breaths</strong>{' '}
                          before starting chest compressions
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Then continue with standard 30:2 ratio (compressions to breaths)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Do not attempt to drain water from the lungs &mdash; start CPR immediately
                          once out of the water
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Children */}
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-2">Children (Age 1 to Puberty)</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Use the <strong className="text-white">same 30:2 ratio</strong> as for
                          adults
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          You may use <strong className="text-white">one hand</strong> for
                          compressions on a smaller child, rather than two
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Compress to approximately{' '}
                          <strong className="text-white">one-third of the depth</strong> of the
                          chest
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          If you are alone, give{' '}
                          <strong className="text-white">5 initial rescue breaths</strong> before
                          starting compressions, then perform CPR for 1 minute before calling 999
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Paediatric cardiac arrest is more commonly caused by respiratory failure
                          than a heart rhythm problem
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">
                  Workplace Relevance for Electricians
                </h3>
                <p className="text-white/80 text-sm">
                  Electricians face a higher-than-average risk of cardiac arrest caused by{' '}
                  <strong className="text-white">electric shock</strong>. An electric current
                  passing through the body can disrupt the heart&rsquo;s electrical system, causing
                  ventricular fibrillation (the most common shockable cardiac arrest rhythm). If a
                  colleague suffers an electric shock and becomes unresponsive and is not breathing
                  normally, the response is the same:{' '}
                  <strong className="text-white">ensure the scene is safe</strong> (isolate the
                  supply), <strong className="text-white">call 999</strong>, and{' '}
                  <strong className="text-white">start CPR immediately</strong>. Early
                  defibrillation is particularly effective in electrocution cases because the heart
                  was in a normal rhythm before the shock.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Survival Statistics */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">07</span>
              Survival Statistics &amp; Why Bystander CPR Matters
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Understanding the statistics behind out-of-hospital cardiac arrest (OHCA) helps
                illustrate why your skills as a trained first aider are so valuable. The numbers are
                stark &mdash; but they also show that bystander intervention makes an enormous
                difference.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <LinkIcon className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  UK Cardiac Arrest Statistics
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Approximately <strong>30,000 out-of-hospital cardiac arrests</strong>{' '}
                          occur in the UK each year
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Overall survival rate: approximately <strong>8&ndash;10%</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          With bystander CPR, survival <strong>doubles or triples</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          With AED use within 3&ndash;5 minutes, survival can exceed{' '}
                          <strong>50&ndash;70%</strong>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Survival drops by approximately <strong>10% per minute</strong> without
                          CPR or defibrillation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Average UK ambulance response time: <strong>7&ndash;8 minutes</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Bystander CPR rate in the UK: approximately <strong>40&ndash;50%</strong>{' '}
                          (improving but still too low)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          In workplaces with AEDs and trained staff, survival rates are{' '}
                          <strong>significantly higher</strong>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">The Bystander Effect</h3>
                <p className="text-white/80 text-sm mb-3">
                  Research consistently shows that bystanders who have received CPR training are
                  significantly more likely to intervene in a cardiac arrest. As a first aider
                  trained in CPR, you are part of a group of people who can genuinely save lives.
                  The most common reasons people give for not performing CPR are:
                </p>
                <ul className="text-white/80 text-sm space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fear of doing it wrong</strong> &mdash; any CPR
                      is better than no CPR
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fear of legal consequences</strong> &mdash; UK
                      law protects good-faith rescuers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Panic and hesitation</strong> &mdash; training
                      builds confidence and muscle memory
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Not recognising cardiac arrest</strong> &mdash;
                      especially when agonal breathing is present
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Every Minute Counts</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Without any intervention, a person in cardiac arrest loses approximately 10%
                  chance of survival for every minute that passes. After 10 minutes without CPR or
                  defibrillation, survival is virtually impossible. By starting CPR immediately, you
                  slow this decline dramatically &mdash; maintaining some blood flow to the brain
                  and vital organs until a defibrillator or paramedics arrive. Your actions in those
                  first few minutes are truly the difference between life and death.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Resuscitation Council UK Guidelines */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400/80 text-sm font-normal">08</span>
              Resuscitation Council UK 2021/2025 Guidelines
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The <strong>Resuscitation Council UK (RCUK)</strong> publishes the definitive
                guidelines for resuscitation practice in the United Kingdom. The current guidelines
                were published in 2021 and updated in 2025. All CPR training in the UK &mdash;
                including this First Aid at Work course &mdash; must align with these guidelines.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Key Principles from the 2021/2025 Guidelines
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Minimise interruptions:</strong> Chest compressions should be
                      interrupted as little as possible. Any pause allows blood pressure to drop,
                      reducing the effectiveness of CPR.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>High-quality compressions:</strong> Push hard (5&ndash;6&nbsp;cm),
                      push fast (100&ndash;120/min), allow full recoil, and minimise pauses. Quality
                      of compressions is the single most important factor in CPR effectiveness.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Phone-guided CPR:</strong> 999 dispatchers are trained to guide
                      callers through CPR. Put the phone on speaker and follow instructions. This
                      has been shown to significantly improve outcomes.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Early defibrillation focus:</strong> Public access defibrillators
                      (PADs) should be used as soon as available. Send someone to fetch the AED
                      while you continue CPR. AEDs are designed for use by untrained bystanders.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Recognition over pulse checking:</strong> The guidelines emphasise
                      recognising cardiac arrest through unresponsiveness and absence of normal
                      breathing, rather than relying on pulse checks.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>2025 surface update:</strong> CPR can be performed on a bed or soft
                      surface if moving the casualty would cause significant delay. Start
                      compressions immediately.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">Adult BLS Algorithm Summary</h3>
                <div className="text-white/80 text-sm space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      1.
                    </span>
                    <span>Ensure the scene is safe for you and the casualty</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      2.
                    </span>
                    <span>Check for response &mdash; gently shake shoulders, shout</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      3.
                    </span>
                    <span>If unresponsive &mdash; shout for help</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      4.
                    </span>
                    <span>Open the airway (head tilt, chin lift)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      5.
                    </span>
                    <span>
                      Check for normal breathing (look, listen, feel &mdash; max 10 seconds)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      6.
                    </span>
                    <span>
                      If not breathing normally &mdash;{' '}
                      <strong className="text-white">call 999, send for AED</strong>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      7.
                    </span>
                    <span>
                      Start CPR:{' '}
                      <strong className="text-white">30 compressions, 2 rescue breaths</strong>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      8.
                    </span>
                    <span>
                      Continue until help arrives, signs of life, or you are unable to continue
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0">
                      9.
                    </span>
                    <span>Use AED as soon as it arrives &mdash; follow voice prompts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">&nbsp;</span>
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
            <Link to="../first-aid-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-2-section-2">
              Next: Using an AED
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
