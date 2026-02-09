import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Shield,
  Heart,
  Phone,
  Eye,
  Brain,
  Hand,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'danger-acronym',
    question: "In the DANGER acronym used for scene safety, what does the 'G' stand for?",
    options: [
      'Get help immediately',
      'Guard against risks',
      'Go to the casualty',
      'Give first aid',
    ],
    correctIndex: 1,
    explanation:
      "DANGER stands for: Danger, Approach with care, Note any hazards, Guard against risks, Evaluate the situation, React to the assessment. 'G' stands for Guard against risks — you must protect yourself and others before approaching a casualty.",
  },
  {
    id: 'agonal-breathing',
    question:
      'A casualty is making occasional gasping sounds with long pauses between breaths. What should you do?',
    options: [
      'Place them in the recovery position and monitor',
      'Wait 60 seconds to see if normal breathing returns',
      'Treat as cardiac arrest — call 999 and begin CPR immediately',
      'Open the airway and reassess in 2 minutes',
    ],
    correctIndex: 2,
    explanation:
      'Agonal breathing (irregular gasps, sometimes described as snoring or gurgling) is NOT normal breathing. It occurs in the early stages of cardiac arrest and must be treated as such. Call 999 and begin CPR immediately. The Resuscitation Council UK emphasises that agonal breathing is a sign OF cardiac arrest, not a sign of life.',
  },
  {
    id: 'consent-unconscious',
    question:
      'An unconscious adult casualty requires first aid treatment. What type of consent applies?',
    options: [
      'You must wait for a family member to give consent',
      "Implied consent — treatment is in the casualty's best interests",
      'Written consent must be obtained first',
      'No consent is ever needed for first aid',
    ],
    correctIndex: 1,
    explanation:
      'Implied consent applies to unconscious casualties. Under UK law (including the Mental Capacity Act 2005), if a person lacks capacity to consent, you may treat them in their best interests. A reasonable person would be expected to consent to life-saving treatment. You do not need to wait for relatives or written consent.',
  },
];

const faqs = [
  {
    question: 'What is the difference between DR ABC and ABCDE?',
    answer:
      'DR ABC (Danger, Response, Airway, Breathing, Circulation) is the primary survey sequence used by first aiders as an initial rapid assessment. The ABCDE approach (Airway, Breathing, Circulation, Disability, Exposure) is an extended clinical assessment tool used by healthcare professionals and advanced first aiders. ABCDE adds Disability (neurological assessment using AVPU or GCS) and Exposure (examining the whole body). In first aid at work, DR ABC is the standard approach for the primary survey. The ABCDE framework builds upon this for a more thorough assessment once the initial DR ABC has been completed.',
  },
  {
    question: 'When should I use a jaw thrust instead of a head tilt-chin lift?',
    answer:
      'Use a jaw thrust when you suspect a spinal injury — for example, after a fall from height, a road traffic collision, a diving accident, or any incident involving significant force to the head or neck. The jaw thrust opens the airway by displacing the mandible (lower jaw) forward without moving the cervical spine. Place your fingers behind the angles of the jaw on both sides and push the jaw forward. If you are unable to open the airway with a jaw thrust, revert to a head tilt-chin lift, as opening the airway always takes priority over spinal protection.',
  },
  {
    question: 'How do I know if a casualty is breathing normally?',
    answer:
      "After opening the airway, use the look, listen, and feel technique for up to 10 seconds. Look at the chest for visible rise and fall. Listen close to the casualty's mouth and nose for breath sounds. Feel for air movement on your cheek. Normal breathing is regular, effortless, and produces visible chest movement. If you are in any doubt about whether breathing is normal, treat the casualty as not breathing and begin CPR. Agonal breathing (occasional gasps) is NOT normal breathing and must be treated as cardiac arrest.",
  },
  {
    question: 'Does the Mental Capacity Act 2005 apply to first aid situations?',
    answer:
      "Yes. The Mental Capacity Act 2005 provides the legal framework for treating adults (aged 16+) who lack capacity to consent. It establishes that a person lacks capacity if they are unable to understand, retain, weigh up, or communicate a decision. Unconscious casualties clearly lack capacity. The Act requires that any treatment given must be in the person's best interests. For children under 16, the principle of Gillick competence applies — a child who demonstrates sufficient understanding and maturity can consent to or refuse treatment. For younger children who lack Gillick competence, consent should be obtained from a parent or guardian where possible, but life-saving treatment should never be delayed.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the FIRST step in the primary survey?',
    options: [
      "Check the casualty's airway",
      'Check for a response by tapping the shoulders',
      'Assess the scene for danger',
      'Call 999 for an ambulance',
    ],
    correctAnswer: 2,
    explanation:
      'The primary survey begins with Danger — assessing the scene for hazards before approaching the casualty. The full sequence is DR ABC: Danger, Response, Airway, Breathing, Circulation. You must ensure your own safety first, because an injured rescuer cannot help anyone and creates an additional casualty.',
  },
  {
    id: 2,
    question:
      'You arrive at a workplace incident. Which of the following is the correct application of the DANGER acronym?',
    options: [
      'Dial 999, Assess injuries, Note the time, Give CPR, Elevate legs, Record details',
      'Danger, Approach with care, Note any hazards, Guard against risks, Evaluate the situation, React to the assessment',
      'Danger, Airway, Neck support, Guard the scene, Emergency services, Recovery position',
      'Danger, Alert others, Note casualties, Get first aid kit, Examine injuries, Report to manager',
    ],
    correctAnswer: 1,
    explanation:
      "The DANGER acronym is: Danger (identify it), Approach with care, Note any hazards, Guard against risks, Evaluate the situation, React to the assessment. This systematic approach ensures the rescuer's safety before any treatment begins.",
  },
  {
    id: 3,
    question: 'When checking for breathing, how long should you look, listen, and feel for?',
    options: ['Up to 5 seconds', 'Up to 10 seconds', 'Up to 15 seconds', 'Up to 30 seconds'],
    correctAnswer: 1,
    explanation:
      'The Resuscitation Council UK guidelines state you should look, listen, and feel for up to 10 seconds. If there is any doubt about whether the casualty is breathing normally within this time, treat them as not breathing and begin CPR. Taking longer than 10 seconds delays life-saving intervention.',
  },
  {
    id: 4,
    question: 'Which airway management technique should be used when a spinal injury is suspected?',
    options: ['Head tilt-chin lift', 'Jaw thrust', 'Recovery position', 'Finger sweep'],
    correctAnswer: 1,
    explanation:
      'The jaw thrust is the preferred technique when spinal injury is suspected, as it opens the airway without moving the cervical spine. However, if the jaw thrust fails to open the airway adequately, a careful head tilt-chin lift should be used instead — airway management always takes priority over spinal protection.',
  },
  {
    id: 5,
    question: 'What information should you give when calling 999/112?',
    options: [
      "Only your name and the casualty's name",
      'Location, number of casualties, nature of injuries, and any hazards present',
      'Only the location and type of incident',
      "The casualty's NHS number and GP details",
    ],
    correctAnswer: 1,
    explanation:
      'When calling 999 or 112, provide: your location (as precisely as possible), the number of casualties, the nature of their injuries or illness, any hazards present at the scene, and your callback number. The call handler will guide you through additional questions and may provide instructions for treatment while you wait for the ambulance.',
  },
  {
    id: 6,
    question: "In the ABCDE assessment, what does 'D' stand for?",
    options: [
      'Defibrillation',
      'Diagnosis',
      'Disability (neurological assessment)',
      'Documentation',
    ],
    correctAnswer: 2,
    explanation:
      "In the ABCDE approach, 'D' stands for Disability, which refers to a rapid neurological assessment. This is typically assessed using the AVPU scale (Alert, responds to Voice, responds to Pain, Unresponsive) or the Glasgow Coma Scale (GCS). It also includes checking pupil size and reactivity, blood glucose levels, and any limb weakness.",
  },
  {
    id: 7,
    question:
      'A conscious adult casualty with capacity refuses your offer of first aid. What should you do?',
    options: [
      'Treat them anyway — you have a duty of care',
      'Respect their decision, stay nearby, and call 999 if their condition deteriorates',
      'Leave the scene immediately',
      'Ask their manager to override their decision',
    ],
    correctAnswer: 1,
    explanation:
      'A conscious adult with capacity has the legal right to refuse treatment, even if that refusal may result in harm. You must respect their decision. However, you should stay nearby if possible, monitor their condition, explain what might happen if they refuse treatment, and be ready to act if they lose consciousness (at which point implied consent applies). Document the refusal.',
  },
  {
    id: 8,
    question: 'During a secondary survey, what is the correct approach?',
    options: [
      'Focus only on the area where the casualty reports pain',
      'Carry out a systematic head-to-toe examination after the primary survey is complete and life-threatening conditions are managed',
      'Begin the secondary survey immediately before the primary survey',
      'Only perform a secondary survey if the ambulance has not arrived within 30 minutes',
    ],
    correctAnswer: 1,
    explanation:
      'The secondary survey is a systematic head-to-toe examination performed AFTER the primary survey is complete and all life-threatening conditions have been managed. It looks for injuries that are not immediately life-threatening but still require treatment — fractures, burns, wounds, swelling, deformity, and tenderness. Never begin a secondary survey until DR ABC is complete and stable.',
  },
];

export default function FirstAidModule1Section2() {
  useSEO({
    title: 'Scene Safety & the Primary Survey | First Aid Module 1.2',
    description:
      'Scene safety using the DANGER acronym, DR ABC and ABCDE primary survey, airway management, checking breathing, agonal breathing, calling 999, consent and capacity, and the secondary survey.',
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
            <Link to="../first-aid-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Shield className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Scene Safety &amp; the Primary Survey
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How to assess a scene for danger, carry out the primary survey using DR ABC and ABCDE,
            manage the airway, check breathing, call for help, and understand consent
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>DANGER:</strong> Always assess the scene before approaching
              </li>
              <li>
                <strong>DR ABC:</strong> Danger, Response, Airway, Breathing, Circulation
              </li>
              <li>
                <strong>Agonal breathing:</strong> Gasps are NOT normal — treat as cardiac arrest
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Scene</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>First:</strong> Is the scene safe for you, the casualty, and bystanders?
              </li>
              <li>
                <strong>Check:</strong> Response → Airway → Breathing → Circulation
              </li>
              <li>
                <strong>Call:</strong> 999/112 — location, casualties, injuries, hazards
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Apply the DANGER acronym to assess scene safety before approaching a casualty',
              'Carry out the primary survey using DR ABC and explain the extended ABCDE approach',
              'Demonstrate how to open an airway using head tilt-chin lift and jaw thrust techniques',
              'Assess breathing using look, listen, and feel for up to 10 seconds',
              'Recognise agonal breathing and respond appropriately as a cardiac arrest',
              'Explain the principles of consent, implied consent, and the Mental Capacity Act 2005',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Scene Safety & the DANGER Acronym */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Scene Safety &amp; the DANGER Acronym
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before you touch a casualty, before you even approach them, you must assess the
                scene. The number one rule in first aid is that you must not become a casualty
                yourself. An injured rescuer cannot help anyone and creates an additional burden on
                the emergency services. Scene safety is always the first step in any first aid
                response.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Principle:</strong> Your safety comes first.
                  If the scene is not safe, do not enter. Call 999/112 and wait for the emergency
                  services. You cannot help a casualty if you become one yourself.
                </p>
              </div>

              <p>
                The <strong>DANGER</strong> acronym provides a systematic approach to assessing
                scene safety. It ensures you consider all potential hazards before committing to a
                course of action.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The DANGER Acronym</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-rose-400">
                      D
                    </span>
                    <span>
                      <strong className="text-white">Danger</strong> &mdash; Identify any dangers to
                      yourself, bystanders, and the casualty. Look for traffic, fire, electricity,
                      gas, chemicals, unstable structures, or aggressive individuals.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-rose-400">
                      A
                    </span>
                    <span>
                      <strong className="text-white">Approach with care</strong> &mdash; Do not rush
                      in. Approach cautiously, watching where you step and looking for secondary
                      hazards that may not be immediately obvious.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-rose-400">
                      N
                    </span>
                    <span>
                      <strong className="text-white">Note any hazards</strong> &mdash; Mentally
                      catalogue every hazard you can see, hear, or smell. Broken glass, spilt
                      fluids, exposed wiring, fumes, or unusual smells may all indicate danger.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-rose-400">
                      G
                    </span>
                    <span>
                      <strong className="text-white">Guard against risks</strong> &mdash; Take steps
                      to protect yourself and others. Wear PPE if available, switch off power,
                      redirect traffic, or move bystanders to a safe distance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-rose-400">
                      E
                    </span>
                    <span>
                      <strong className="text-white">Evaluate the situation</strong> &mdash; How
                      many casualties are there? What is the mechanism of injury? What resources do
                      you have? Do you need additional help?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-rose-400">
                      R
                    </span>
                    <span>
                      <strong className="text-white">React to the assessment</strong> &mdash; Based
                      on your evaluation, decide your course of action. Can you safely help? Do you
                      need to call for specialist assistance? Prioritise the most seriously injured.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Electrical Incidents</p>
                </div>
                <p className="text-sm text-white/80">
                  As electricians, you are more likely than most workers to encounter electrical
                  incidents. Never touch a casualty who is still in contact with a live electrical
                  source. For
                  <strong className="text-white"> low voltage (below 1,000 V)</strong>, isolate the
                  supply at the consumer unit or distribution board before approaching. For{' '}
                  <strong className="text-white">high voltage (above 1,000 V)</strong>, stay at
                  least 25 metres away, call 999, and contact the electricity network operator. Do
                  not attempt rescue from high voltage &mdash; this is a job for specialist teams
                  only.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Primary Survey — DR ABC */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            The Primary Survey &mdash; DR ABC
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Once the scene is safe, the primary survey is a rapid, systematic assessment to
                identify and treat life-threatening conditions. The sequence is{' '}
                <strong>DR ABC</strong>: Danger, Response, Airway, Breathing, Circulation. Every
                letter must be addressed in order &mdash; do not skip ahead.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Critical Sequence:</strong> DR ABC must be
                  followed in order. There is no point checking breathing if the airway is blocked.
                  There is no point checking circulation if the casualty is not breathing. Each step
                  builds on the one before it.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">D &mdash; Danger</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Already covered in the DANGER acronym above. Confirm the scene remains safe
                    before you begin your assessment. Hazards can develop after your initial scene
                    safety check &mdash; remain vigilant throughout.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Hand className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">R &mdash; Response</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Assess the casualty&rsquo;s level of responsiveness. Use the &ldquo;shout and
                    tap&rdquo; method:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Tap the casualty firmly on both shoulders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Speak loudly and clearly:{' '}
                        <strong className="text-white">
                          &ldquo;Can you hear me? Open your eyes.&rdquo;
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        If no response, the casualty is{' '}
                        <strong className="text-white">unresponsive</strong> &mdash; shout for help
                        and proceed to Airway
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        If the casualty responds (opens eyes, speaks, moves), assess their condition
                        and treat any injuries found
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">A &mdash; Airway</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    If the casualty is unresponsive, open the airway. In an unconscious person, the
                    tongue falls back and can block the airway. Two techniques are used:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-3">
                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-400 mb-1">
                        Head Tilt-Chin Lift (Standard)
                      </p>
                      <ul className="text-xs text-white/80 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>Place one hand on the forehead and gently tilt the head back</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            Place two fingertips under the bony part of the chin and lift upward
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            This is the most common and effective technique for most casualties
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                      <p className="text-sm font-medium text-amber-400 mb-1">
                        Jaw Thrust (Suspected Spinal Injury)
                      </p>
                      <ul className="text-xs text-white/80 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>Place fingers behind the angle of the jaw on both sides</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>Push the lower jaw forward without moving the head or neck</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                          <span>
                            If this fails, revert to head tilt-chin lift &mdash; airway always takes
                            priority
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">B &mdash; Breathing</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    With the airway open, check for normal breathing using{' '}
                    <strong className="text-white">look, listen, and feel</strong> for up to{' '}
                    <strong className="text-white">10 seconds</strong>:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Look</strong> at the chest for visible rise
                        and fall
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Listen</strong> close to the mouth and nose
                        for breath sounds
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Feel</strong> for air movement on your cheek
                      </span>
                    </li>
                  </ul>
                  <div className="mt-3 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                    <p className="text-xs text-white/80">
                      <strong className="text-rose-400">If breathing normally:</strong> Place in the
                      recovery position, call 999, and monitor breathing continuously.
                      <br />
                      <strong className="text-rose-400">
                        If NOT breathing normally (or agonal breathing):
                      </strong>{' '}
                      Call 999, begin CPR immediately (30 compressions : 2 rescue breaths), and send
                      someone for an AED.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">C &mdash; Circulation</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Look for signs of severe bleeding (catastrophic haemorrhage). If present, apply
                    direct pressure and, if available, use a haemostatic dressing or tourniquet.
                    Check skin colour and temperature &mdash; pale, cold, clammy skin may indicate
                    shock. In the workplace, severe bleeding can result from machinery injuries,
                    falls, or contact with sharp objects. Control of catastrophic bleeding is now
                    recognised as so critical that some protocols place it before Airway (the
                    &lt;C&gt;ABCDE approach used in trauma situations).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The ABCDE Approach */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            The Extended ABCDE Approach
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The ABCDE approach extends the basic ABC assessment with two additional steps:
                <strong> Disability</strong> (neurological assessment) and <strong>Exposure</strong>{' '}
                (full body examination). While DR ABC is the standard first aid primary survey,
                understanding ABCDE gives you a more thorough framework, particularly for casualties
                with complex or multiple injuries.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">When to Use ABCDE:</strong> The ABCDE approach
                  is used as a systematic reassessment tool. After completing your initial DR ABC
                  primary survey and managing any life-threatening conditions, ABCDE allows you to
                  carry out a more detailed assessment. It is also used to reassess a casualty whose
                  condition changes.
                </p>
              </div>

              {/* ABCDE Flow Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  ABCDE Assessment Flow
                </p>
                <div className="flex flex-col items-center gap-0">
                  {/* A - Airway */}
                  <div className="w-full max-w-sm bg-gradient-to-r from-red-500/20 to-red-400/20 border border-red-500/40 rounded-xl p-4 text-center">
                    <p className="text-lg font-bold text-red-400">A</p>
                    <p className="text-sm font-semibold text-white">Airway</p>
                    <p className="text-xs text-white/70 mt-1">
                      Is the airway open and clear? Head tilt-chin lift or jaw thrust. Look for
                      obstructions.
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-3 bg-white/30" />
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/30" />
                  </div>

                  {/* B - Breathing */}
                  <div className="w-full max-w-sm bg-gradient-to-r from-orange-500/20 to-orange-400/20 border border-orange-500/40 rounded-xl p-4 text-center">
                    <p className="text-lg font-bold text-orange-400">B</p>
                    <p className="text-sm font-semibold text-white">Breathing</p>
                    <p className="text-xs text-white/70 mt-1">
                      Look, listen, and feel for up to 10 seconds. Rate, depth, effort. Agonal gasps
                      = not breathing.
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-3 bg-white/30" />
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/30" />
                  </div>

                  {/* C - Circulation */}
                  <div className="w-full max-w-sm bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border border-yellow-500/40 rounded-xl p-4 text-center">
                    <p className="text-lg font-bold text-yellow-400">C</p>
                    <p className="text-sm font-semibold text-white">Circulation</p>
                    <p className="text-xs text-white/70 mt-1">
                      Skin colour, temperature, capillary refill. Control severe bleeding. Signs of
                      shock.
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-3 bg-white/30" />
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/30" />
                  </div>

                  {/* D - Disability */}
                  <div className="w-full max-w-sm bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/40 rounded-xl p-4 text-center">
                    <p className="text-lg font-bold text-green-400">D</p>
                    <p className="text-sm font-semibold text-white">Disability</p>
                    <p className="text-xs text-white/70 mt-1">
                      AVPU scale (Alert, Voice, Pain, Unresponsive). Pupil size and reactivity.
                      Blood glucose.
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-3 bg-white/30" />
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/30" />
                  </div>

                  {/* E - Exposure */}
                  <div className="w-full max-w-sm bg-gradient-to-r from-blue-500/20 to-blue-400/20 border border-blue-500/40 rounded-xl p-4 text-center">
                    <p className="text-lg font-bold text-blue-400">E</p>
                    <p className="text-sm font-semibold text-white">Exposure</p>
                    <p className="text-xs text-white/70 mt-1">
                      Examine the whole body. Remove or cut clothing as needed. Prevent hypothermia.
                      Preserve dignity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  AVPU Scale (Used in &lsquo;D &mdash; Disability&rsquo;)
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">A &mdash; Alert:</strong> The casualty is fully
                      awake, eyes open spontaneously, and responds normally
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">V &mdash; Voice:</strong> The casualty responds
                      to verbal stimulation (opens eyes or moves when spoken to)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">P &mdash; Pain:</strong> The casualty responds
                      only to painful stimuli (e.g. trapezius squeeze)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">U &mdash; Unresponsive:</strong> No response to
                      voice or pain &mdash; this is a medical emergency
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Agonal Breathing & Calling 999 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Agonal Breathing &amp; Calling 999/112
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most critical skills for a first aider is recognising agonal breathing
                and knowing when and how to call the emergency services. Misidentifying agonal
                breathing as normal breathing is one of the most common &mdash; and most dangerous
                &mdash; mistakes in first aid.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical: Agonal Breathing</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Agonal breathing consists of{' '}
                    <strong className="text-white">irregular, infrequent gasps</strong>. It may
                    sound like snoring, gurgling, or laboured breathing. There are often long pauses
                    between gasps. It is{' '}
                    <strong className="text-red-300">NOT normal breathing</strong>.
                  </p>
                  <p>
                    Agonal breathing occurs in the early stages of cardiac arrest when the brainstem
                    is still sending sporadic signals to the breathing muscles. It is present in up
                    to <strong className="text-white">40% of cardiac arrest cases</strong> in the
                    first few minutes.
                  </p>
                  <p className="font-medium text-red-300">
                    If you see agonal breathing, treat it as cardiac arrest: call 999 and begin CPR
                    immediately. Do NOT place the casualty in the recovery position.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Calling 999 or 112</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Call 999 (UK) or 112 (European emergency number, also works in the UK) when:
                </p>
                <ul className="text-sm text-white/80 space-y-1 mb-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The casualty is unresponsive or not breathing normally</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>There is severe or life-threatening bleeding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>You suspect a heart attack, stroke, or anaphylaxis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The injury or illness is beyond your first aid capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>You are in any doubt about the severity of the situation</span>
                  </li>
                </ul>
                <p className="text-sm font-medium text-white mb-2">
                  Information to give the call handler:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Location:</strong> As precise as possible
                      &mdash; address, postcode, landmarks, floor, room number
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Number of casualties:</strong> How many people
                      are injured or ill
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Nature of injuries:</strong> What happened and
                      what injuries or symptoms are present
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards present:</strong> Electricity,
                      chemicals, fire, traffic, height &mdash; so crews can prepare
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Your callback number:</strong> In case you are
                      disconnected
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">On a Construction Site:</strong> Ensure you know
                  the site address and the designated emergency access routes before work begins.
                  Many sites use a &ldquo;what3words&rdquo; location for precise ambulance
                  direction. The site emergency procedure should identify who calls 999, who meets
                  the ambulance, and the route to the casualty.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Consent & Capacity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Consent &amp; Capacity
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before providing first aid to any casualty, you must consider the issue of consent.
                Treating someone without their consent could, in theory, constitute assault or
                battery. The law provides clear frameworks for when and how consent applies in
                emergency situations.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Principle:</strong> A conscious, competent
                  adult has the absolute right to refuse treatment, even if that refusal may result
                  in serious harm or death. You must respect this decision. However, you should stay
                  nearby, monitor their condition, and explain the potential consequences of
                  refusing treatment.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">
                      Conscious Casualties &mdash; Verbal Consent
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    For a conscious adult with capacity, you must obtain verbal consent before
                    providing treatment:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Introduce yourself and explain that you are a trained first aider</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Explain what you want to do and why</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Ask for permission:{' '}
                        <strong className="text-white">
                          &ldquo;Is it OK if I help you?&rdquo;
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Consent can be verbal, a nod, or a gesture &mdash; it does not need to be
                        written
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Unconscious Casualties &mdash; Implied Consent
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    When a casualty is unconscious or otherwise unable to communicate,{' '}
                    <strong className="text-white">implied consent</strong> applies. The legal
                    reasoning is that a reasonable person in the casualty&rsquo;s position would
                    consent to life-saving treatment. Under UK law, you are acting in the
                    casualty&rsquo;s <strong className="text-white">best interests</strong>. You do
                    not need permission from relatives, colleagues, or managers to begin treatment
                    on an unconscious casualty.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Mental Capacity Act 2005</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    The Mental Capacity Act 2005 (applicable in England and Wales) provides the
                    legal framework for decision-making on behalf of adults who lack capacity. Its
                    five key principles are:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Every adult is{' '}
                        <strong className="text-white">presumed to have capacity</strong> unless
                        proven otherwise
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        A person must be given{' '}
                        <strong className="text-white">all practicable help</strong> to make their
                        own decision
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        An <strong className="text-white">unwise decision</strong> does not mean a
                        person lacks capacity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Decisions made on behalf of someone must be in their{' '}
                        <strong className="text-white">best interests</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The <strong className="text-white">least restrictive</strong> option should
                        always be chosen
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Hand className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">
                      Children &mdash; Gillick Competence
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    For children under 16, the principle of{' '}
                    <strong className="text-white">Gillick competence</strong> applies (from the
                    1985 case <em>Gillick v West Norfolk and Wisbech Area Health Authority</em>). A
                    child who demonstrates sufficient understanding and maturity to fully comprehend
                    what is being proposed can consent to treatment. For younger children or those
                    without Gillick competence, seek consent from a parent or guardian where
                    possible. However,{' '}
                    <strong className="text-white">
                      life-saving treatment should never be delayed
                    </strong>{' '}
                    while waiting for parental consent. In an emergency, treat the child in their
                    best interests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: The Secondary Survey */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            The Secondary Survey
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The secondary survey is a systematic head-to-toe examination carried out{' '}
                <strong>after</strong> the primary survey is complete and all life-threatening
                conditions have been identified and managed. Its purpose is to find injuries that
                are not immediately life-threatening but still require treatment &mdash; fractures,
                burns, wounds, dislocations, and other conditions.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">When to Perform:</strong> Only begin the
                  secondary survey when the primary survey (DR ABC) is complete and stable. If the
                  casualty&rsquo;s condition deteriorates during the secondary survey,{' '}
                  <strong>stop and return to the primary survey immediately</strong>. The primary
                  survey always takes priority.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Head-to-Toe Examination</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Head:</strong> Check the scalp for wounds,
                      swelling, or depression. Look in the ears and nose for blood or clear fluid
                      (possible skull fracture). Check pupils for size, equality, and reactivity.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Neck:</strong> Gently palpate the cervical
                      spine for tenderness or deformity (only if no spinal injury is suspected).
                      Check for medical alert jewellery.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Chest:</strong> Look for symmetrical chest
                      rise. Feel for tenderness, crepitus (crackling), or instability over the ribs.
                      Note any difficulty breathing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Abdomen:</strong> Gently feel all four
                      quadrants for rigidity, tenderness, or swelling. A rigid abdomen may indicate
                      internal bleeding.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pelvis:</strong> Do not rock or compress the
                      pelvis. Look for signs of injury: bruising, swelling, or pain on gentle
                      palpation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Limbs:</strong> Check all four limbs for
                      deformity, swelling, tenderness, and loss of sensation or movement. Compare
                      both sides.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Back:</strong> If safe to do so, check the back
                      for wounds, bruising, or spinal tenderness using a log-roll technique with
                      assistance.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">History Taking &mdash; SAMPLE</p>
                <p className="text-sm text-white/80 mb-2">
                  During the secondary survey, gather information using the SAMPLE mnemonic:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">S &mdash; Signs and Symptoms:</strong> What can
                      you see? What does the casualty tell you?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">A &mdash; Allergies:</strong> Are they allergic
                      to anything?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">M &mdash; Medication:</strong> Are they taking
                      any medication?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">P &mdash; Past medical history:</strong> Any
                      relevant medical conditions?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">L &mdash; Last meal:</strong> When did they
                      last eat or drink? (relevant if surgery may be needed)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        E &mdash; Events leading up to the incident:
                      </strong>{' '}
                      What happened? Mechanism of injury?
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Important Reminders</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Always get consent before examining a conscious casualty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Explain what you are doing at each stage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Preserve dignity &mdash; only expose what is necessary and cover the casualty
                      afterwards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Record your findings &mdash; this information is vital for the ambulance crew
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If the casualty deteriorates, return to the primary survey (DR ABC)
                      immediately
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-1-section-3">
              Next: Record Keeping, RIDDOR &amp; the Accident Book
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
