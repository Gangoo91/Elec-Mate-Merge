/**
 * First Aid at Work Mock Exam Question Bank
 *
 * 200 questions covering all 5 categories with difficulty distribution.
 *
 * Categories (5):
 *   CPR, AED & Airway (40) | Bleeding, Burns & Shock (40) |
 *   Medical Emergencies (40) | Injuries & Specific Conditions (40) |
 *   Legislation, Kit & Protocol (40)
 *
 * Difficulty per category: ~40% basic, ~40% intermediate, ~20% advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const firstAidCategories = [
  'CPR, AED & Airway',
  'Bleeding, Burns & Shock',
  'Medical Emergencies',
  'Injuries & Specific Conditions',
  'Legislation, Kit & Protocol',
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const firstAidMockExamConfig: MockExamConfig = {
  examId: 'first-aid-at-work',
  examTitle: 'First Aid at Work Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800, // 30 minutes
  passThreshold: 80,
  exitPath: '/study-centre/general-upskilling/first-aid-module-6',
  categories: firstAidCategories,
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomFirstAidExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(firstAidQuestionBank, numQuestions, firstAidCategories);
};

// ---------------------------------------------------------------------------
// Question Bank — 200 questions
// ---------------------------------------------------------------------------
export const firstAidQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // CPR, AED & AIRWAY — 40 questions (id 1–40)
  // =======================================================================

  // ── BASIC (1–16) ─────────────────────────────────────────────────────
  {
    id: 1,
    question: 'What is the correct compression-to-breath ratio for adult CPR?',
    options: [
      '20 compressions to 2 breaths',
      '30 compressions to 2 breaths',
      '15 compressions to 2 breaths',
      '30 compressions to 1 breath',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'The Resuscitation Council UK recommends 30 chest compressions followed by 2 rescue breaths for adult CPR. This ratio applies whether there is one rescuer or two. It maximises coronary perfusion while still providing ventilation.',
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'Adult CPR ratio',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 2,
    question: 'How do you recognise cardiac arrest in a casualty?',
    options: [
      'They are pale and sweating',
      'They have a weak pulse and are confused',
      'They are unresponsive and not breathing normally',
      'They are breathing rapidly and clutching their chest',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'Cardiac arrest is recognised when a person is unresponsive and not breathing normally. You should not spend time trying to find a pulse as this is unreliable. If in doubt, start CPR immediately.',
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'Recognising cardiac arrest',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 3,
    question: 'What is the recommended depth of chest compressions for an adult?',
    options: [
      '2–3 cm',
      '3–4 cm',
      '7–8 cm',
      '5–6 cm',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'Chest compressions for an adult should depress the sternum by 5–6 cm. Compressions that are too shallow are ineffective at generating blood flow. Allow the chest to fully recoil between each compression.',
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'Compression depth',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 4,
    question: 'What rate should chest compressions be delivered at during adult CPR?',
    options: [
      '100–120 per minute',
      '80–100 per minute',
      '60–80 per minute',
      '120–140 per minute',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      "Chest compressions should be delivered at a rate of 100–120 per minute. Compressing faster than 120/min reduces compression depth and quality. A useful memory aid is pressing in time with the beat of 'Stayin' Alive' by the Bee Gees.",
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'Compression rate',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 5,
    question: 'Which of the following best describes the purpose of the recovery position?',
    options: [
      'To realign the spine after a fall',
      'To maintain an open airway and allow fluids to drain',
      'To reduce swelling in the limbs',
      'To keep the casualty warm while waiting for help',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'The recovery position keeps the airway open and allows vomit or other fluids to drain from the mouth, reducing the risk of aspiration. It should be used for unconscious casualties who are breathing normally. The casualty should be monitored continuously.',
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'Recovery position',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 6,
    question: "What does 'AED' stand for?",
    options: [
      'Automatic Electrical Defibrillator',
      'Automated Emergency Device',
      'Automated External Defibrillator',
      'Automatic External Decompressor',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      "AED stands for Automated External Defibrillator. It is a portable device that analyses the heart's rhythm and delivers a shock if needed. AEDs are designed to be used by members of the public with minimal training.",
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'AED basics',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 7,
    question:
      'A colleague collapses at their desk and is unresponsive. What is the first thing you should do?',
    options: [
      'Start chest compressions immediately',
      'Place them in the recovery position',
      'Call 999 and wait for the ambulance',
      'Check for danger and then check for a response',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'The first step is always to ensure the scene is safe, then check whether the casualty responds by gently shaking their shoulders and speaking loudly. This follows the standard approach of Danger, Response, Airway, Breathing before deciding on the next action.',
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'Initial assessment',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 8,
    question:
      'How do you open the airway of an unconscious casualty with no suspected spinal injury?',
    options: [
      'Head tilt and chin lift',
      'Jaw thrust manoeuvre',
      'Finger sweep of the mouth',
      'Turn the head to one side',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'The head tilt–chin lift is the standard technique for opening the airway in an unconscious casualty when there is no suspicion of spinal injury. Place one hand on the forehead and gently tilt the head back while lifting the chin with two fingers. This moves the tongue away from the back of the throat.',
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'Airway management',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 9,
    question: "What does the 'V' stand for in the AVPU scale?",
    options: [
      'Vital signs (pulse and breathing rate)',
      'Voice (responds to verbal stimulus)',
      'Vomiting (airway at risk)',
      'Vision (pupil reaction to light)',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      "In the AVPU scale, V stands for Voice — the casualty responds to verbal stimulus. The full scale is Alert, Voice, Pain, Unresponsive. It provides a rapid assessment of a casualty's level of consciousness.",
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'AVPU scale',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 10,
    question: 'A person is choking and is coughing forcefully. What should you do?',
    options: [
      'Give 5 sharp back blows between the shoulder blades immediately',
      'Begin abdominal thrusts straight away to clear the obstruction',
      'Encourage them to keep coughing and monitor closely',
      'Lay them down and start chest compressions',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'If a choking casualty can cough effectively, this indicates a mild airway obstruction. You should encourage them to keep coughing as this is the most effective way to dislodge the object. Stay with them and be ready to intervene if the obstruction becomes severe.',
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'Mild choking',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 11,
    question: 'How many links are there in the Chain of Survival?',
    options: [
      '3',
      '6',
      '5',
      '4',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'The Chain of Survival has four links: early recognition and call for help, early CPR, early defibrillation, and post-resuscitation care. Each link is vital — weakness in any one link reduces the chances of survival.',
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'Chain of survival',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 12,
    question: 'When using an AED, what must everyone do just before a shock is delivered?',
    options: [
      'Stand clear and not touch the casualty',
      'Place a blanket over the casualty',
      "Hold the casualty's hand for reassurance",
      'Remove the AED pads temporarily',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      "Before a shock is delivered, the operator must ensure nobody is touching the casualty. Contact during the shock could result in injury to the rescuer and divert energy away from the casualty's heart. The AED will prompt you to stand clear before shocking.",
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'AED safety',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 13,
    question: 'What is compression-only CPR?',
    options: [
      'CPR performed only by healthcare professionals',
      'Chest compressions without rescue breaths',
      'Compressions delivered using a mechanical device',
      'CPR performed at a slower rate for elderly casualties',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'Compression-only CPR means delivering continuous chest compressions without rescue breaths. It is recommended for untrained bystanders or those unwilling to give rescue breaths. It is better than no CPR at all and can be effective in the first few minutes of adult cardiac arrest.',
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'Compression-only CPR',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 14,
    question:
      'A person faints in a warm, crowded room. Once they are on the ground and responsive, what should you do?',
    options: [
      'Sit them upright immediately and give them water',
      'Place them in the recovery position and call 999',
      'Raise their legs, ensure fresh air, and monitor them',
      'Begin CPR as they may go into cardiac arrest',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'Fainting (vasovagal syncope) is usually caused by a temporary drop in blood pressure. Raising the legs helps blood return to the brain. Ensuring fresh air and loosening tight clothing aids recovery. If they do not regain consciousness quickly, place them in the recovery position and call for help.',
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'Fainting / vasovagal syncope',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 15,
    question: 'Where should AED pads be placed on an adult casualty?',
    options: [
      'Both pads side by side in the centre of the chest over the breastbone',
      'One pad on each shoulder, just below the collarbones',
      'One pad over the navel and one over the upper back',
      'One pad below the right collarbone, one on the left side below the armpit',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'The standard placement is one pad below the right collarbone and one on the left side of the chest, below the armpit. This positioning allows the electrical current to pass through the heart. Most AED pads have diagrams showing the correct placement.',
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'AED pad placement',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 16,
    question: 'What is agonal breathing?',
    options: [
      'Occasional, irregular gasps that should not be mistaken for normal breathing',
      'Slow, deep breathing seen in sleeping casualties',
      'Rapid, shallow breathing seen in panic attacks',
      'Noisy breathing caused by a partially blocked airway',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'Agonal breathing consists of infrequent, irregular gasps or sighs. It is a sign of cardiac arrest and should not be mistaken for normal breathing. If a casualty is unresponsive and displaying agonal breathing, you should begin CPR immediately.',
    section: 'Module 2',
    difficulty: 'basic' as const,
    topic: 'Agonal breathing',
    category: 'CPR, AED & Airway' as const,
  },

  // ── INTERMEDIATE (17–32) ──────────────────────────────────────────────
  {
    id: 17,
    question:
      "You are performing CPR on a colleague when an AED arrives. The AED analyses the rhythm and advises 'no shock'. What should you do?",
    options: [
      'Stop CPR and place the casualty in the recovery position',
      'Immediately resume CPR for 2 minutes, then allow the AED to re-analyse',
      'Turn off the AED and continue CPR without it',
      'Check for a pulse before deciding what to do next',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      "If the AED advises no shock, you should immediately resume CPR for 2 minutes (approximately 5 cycles of 30:2). The AED will then re-analyse the rhythm. A 'no shock' message means the rhythm is non-shockable, but it does not mean the heart has restarted — CPR must continue.",
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'AED no-shock protocol',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 18,
    question:
      'During a fire evacuation drill, a colleague faints. After they recover they say they felt dizzy and hot before collapsing. What most likely caused this?',
    options: [
      'A transient ischaemic attack triggered by the exertion of evacuating',
      'A sudden drop in blood sugar from missing breakfast',
      'Vasovagal syncope triggered by heat and stress',
      'The early stages of a heart attack brought on by stress',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'Vasovagal syncope is the most common cause of fainting. It is triggered by factors such as heat, prolonged standing, stress, and dehydration. The casualty typically feels lightheaded, warm, and nauseous beforehand. Recovery is usually rapid once lying down.',
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'Vasovagal syncope',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 19,
    question:
      'You find an unconscious adult who has fallen from a ladder. They are breathing normally. How should you open their airway?',
    options: [
      'Head tilt–chin lift',
      'Insert an oropharyngeal airway',
      'Turn them onto their side into the recovery position',
      'Jaw thrust without head extension',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'When spinal injury is suspected, the jaw thrust manoeuvre should be used to open the airway because it avoids movement of the cervical spine. The rescuer places their fingers behind the angles of the jaw and lifts it forward. Head tilt–chin lift should only be used if the jaw thrust fails to open the airway.',
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'Jaw thrust',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 20,
    question: 'A choking adult becomes unconscious. What is the correct sequence of actions?',
    options: [
      'Lower them to the ground, call 999, and begin CPR starting with compressions',
      'Give 5 more abdominal thrusts, then call 999',
      'Attempt a blind finger sweep then give rescue breaths',
      'Place them in the recovery position and wait for the ambulance',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'If a choking casualty becomes unconscious, lower them carefully to the ground. Call 999 (or send someone) and begin CPR starting with 30 chest compressions. Each time the airway is opened to give breaths, look in the mouth for any visible obstruction and remove it. Do not perform blind finger sweeps.',
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'Unconscious choking',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 21,
    question: 'Which of the following is the correct sequence for the Chain of Survival?',
    options: [
      'Early CPR → Early recognition → Early defibrillation → Post-resuscitation care',
      'Early recognition and call for help → Early CPR → Early defibrillation → Post-resuscitation care',
      'Early defibrillation → Early CPR → Early recognition → Hospital treatment',
      'Call for help → Recovery position → Early defibrillation → Early CPR',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'The Chain of Survival begins with early recognition of cardiac arrest and calling for help. This is followed by early CPR to maintain circulation, early defibrillation to restore a normal rhythm, and post-resuscitation care to improve outcomes. The order matters because each link depends on the one before it.',
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'Chain of survival sequence',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 22,
    question:
      'You are giving CPR and notice the casualty has occasional gasping breaths approximately every 15 seconds. Should you continue CPR?',
    options: [
      'No — any breathing means you should stop and place them in the recovery position',
      'No — gasping indicates the heart has restarted',
      'Yes — agonal gasps are not effective breathing and CPR must continue',
      'Yes — but switch to rescue breaths only',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'Agonal gasps are a sign of cardiac arrest and are not effective breathing. They occur in up to 40% of cardiac arrest cases. CPR must continue because the gasps do not provide adequate oxygenation. Only stop CPR if the casualty shows clear signs of recovery such as moving, opening their eyes, and breathing normally.',
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'Agonal breathing during CPR',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 23,
    question:
      'When performing abdominal thrusts on a conscious choking adult, where should you position your fist?',
    options: [
      'Directly over the bottom tip of the breastbone (sternum)',
      'On the centre of the chest, between the nipples',
      'On the lower back, level with the bottom of the ribs',
      'Between the navel and the bottom of the breastbone (sternum)',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'The fist should be placed centrally, between the navel and the bottom of the sternum. This area overlies the diaphragm and creates the upward pressure needed to expel the foreign body. Thrusting too low risks damaging abdominal organs; too high risks fracturing the xiphoid process.',
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'Abdominal thrust technique',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 24,
    question:
      'You arrive at a casualty who is unconscious and breathing normally. After placing them in the recovery position, how often should you check their breathing?',
    options: [
      'Continuously — reassess at least every minute',
      'Every 10 minutes is sufficient once they are stable',
      'Only when the ambulance crew arrives to take over',
      'Every 30 minutes, as the position keeps the airway clear',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      "An unconscious casualty's condition can deteriorate rapidly. You should monitor their breathing continuously and reassess frequently, at least every minute. If they stop breathing normally at any point, roll them onto their back and begin CPR immediately.",
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'Recovery position monitoring',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 25,
    question:
      'A severely choking adult is unable to cough or speak. What is the correct first intervention?',
    options: [
      'Perform 5 abdominal thrusts',
      'Give up to 5 back blows between the shoulder blades',
      'Attempt to pull the object from their throat with your fingers',
      'Lay them down and begin chest compressions',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'For severe choking, the first intervention is to give up to 5 back blows between the shoulder blades using the heel of your hand. Lean the casualty forward and check after each blow whether the obstruction has cleared. If back blows fail, move on to abdominal thrusts.',
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'Severe choking — back blows',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 26,
    question: 'Why is it important to allow full chest recoil between compressions during CPR?',
    options: [
      'It prevents the rescuer from tiring as quickly during CPR',
      'It reduces the risk of fracturing the casualty’s ribs',
      'It allows the heart to refill with blood, maximising blood flow',
      'It keeps the compression rate steady at 100–120 per minute',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'Full chest recoil allows the heart chambers to refill with blood between compressions. Leaning on the chest (incomplete recoil) reduces venous return and significantly decreases coronary and cerebral perfusion. This is a common error, particularly when rescuers become fatigued.',
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'Chest recoil',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 27,
    question:
      "The AED pads indicate they should not be placed over a medication patch on the casualty's chest. Why?",
    options: [
      "The medication may interfere with the AED's analysis software",
      'The medication may react with the adhesive on the AED pads',
      'The patch could explode when exposed to an electrical current',
      'The patch may block energy delivery and cause a skin burn',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'Medication patches (such as GTN patches) contain metallic backing that can block the delivery of electrical energy and cause burns to the skin. You should remove the patch, wipe the area clean, and then apply the AED pad. Always wear gloves when removing medication patches.',
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'AED special circumstances',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 28,
    question:
      'You are alone with an unresponsive adult who is not breathing normally. In what order should you act?',
    options: [
      'Call 999 (put phone on speaker) → begin CPR → send someone for the AED when possible',
      'Begin CPR → after 1 minute, call 999 → continue CPR',
      'Run to fetch an AED → return and begin CPR → call 999 after 2 minutes',
      'Give 5 rescue breaths → call 999 → begin chest compressions',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'For an adult cardiac arrest, you should call 999 immediately — use the speaker function if alone — and begin CPR straight away. In adults, cardiac arrest is most commonly caused by a heart problem, so early defibrillation is critical. Call for the AED as soon as someone else is available.',
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'Lone rescuer priorities',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 29,
    question:
      'During CPR, you attempt to give rescue breaths but the chest does not rise. What should you do?',
    options: [
      'Abandon rescue breaths entirely and continue with compressions only',
      'Recheck the head tilt–chin lift, ensure a good seal, and attempt one more breath before returning to compressions',
      'Perform a blind finger sweep of the mouth to clear any obstruction',
      'Give three further breaths in quick succession to force air in',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'If a rescue breath does not make the chest rise, reposition the head tilt–chin lift to ensure the airway is open and check that you have a proper seal over the mouth. Attempt the second breath. Do not delay — spend no more than 10 seconds on breaths before returning to compressions. Each cycle of 30:2 should include a maximum of 2 breath attempts.',
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'Rescue breath troubleshooting',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 30,
    question: 'What is the primary purpose of an AED?',
    options: [
      "To pump blood around the body in place of the rescuer's compressions",
      "To deliver oxygen directly into the casualty's lungs",
      "To analyse the heart's rhythm and deliver a shock to correct certain abnormal rhythms",
      "To restart a heart that has stopped completely (asystole)",
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      "An AED analyses the heart's electrical rhythm and delivers a shock only for shockable rhythms such as ventricular fibrillation (VF) or pulseless ventricular tachycardia (pVT). It cannot restart a heart in asystole (flatline). The shock aims to stop the chaotic rhythm so the heart's natural pacemaker can restore a normal rhythm.",
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'AED purpose',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 31,
    question: "A 'P' rating on the AVPU scale means the casualty responds to what?",
    options: [
      'Pressure applied to their chest',
      'Pupil examination with a torch',
      'A verbal prompt or question',
      'Painful stimulus only',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      "In the AVPU scale, P stands for Pain. A casualty rated 'P' only responds when a painful stimulus is applied, such as a trapezius squeeze. They do not respond to voice alone. This indicates a significantly reduced level of consciousness and requires urgent medical attention.",
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'AVPU — pain response',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 32,
    question:
      'You have been performing CPR for several minutes and are becoming exhausted. What should you do?',
    options: [
      'Swap with another trained rescuer, minimising any pause in compressions',
      'Switch to compression-only CPR to conserve energy',
      'Stop CPR and wait for the ambulance to arrive',
      'Slow the compression rate to 60 per minute',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'Rescuer fatigue leads to a decline in compression quality, often without the rescuer realising. You should swap with another trained rescuer approximately every 2 minutes, ensuring the changeover is as quick as possible to minimise interruptions. Effective compressions are critical for survival.',
    section: 'Module 2',
    difficulty: 'intermediate' as const,
    topic: 'Rescuer fatigue and swapping',
    category: 'CPR, AED & Airway' as const,
  },

  // ── ADVANCED (33–40) ──────────────────────────────────────────────────
  {
    id: 33,
    question:
      'You are about to apply AED pads to a casualty who is lying in a shallow puddle of water. What should you do?',
    options: [
      'Do not use the AED near water under any circumstances',
      'Move the casualty to a dry area, dry their chest, then apply the pads and use the AED',
      'Apply the pads but stand further away when the shock is delivered',
      'Use the AED in the water — modern AEDs are waterproof',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'Water conducts electricity and creates a risk of shock to both the rescuer and bystanders. The casualty should be moved to a dry surface and their chest dried before applying the AED pads. This ensures proper pad adhesion and safe energy delivery. Do not delay unnecessarily — move quickly and efficiently.',
    section: 'Module 2',
    difficulty: 'advanced' as const,
    topic: 'AED near water',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 34,
    question:
      "While applying AED pads, you notice a raised lump under the skin below the casualty's left collarbone, suggesting an implanted pacemaker or ICD. How should you place the pads?",
    options: [
      'Do not use the AED, as the implanted device makes defibrillation dangerous',
      'Place one pad directly over the device to target the shock effectively',
      'Place the pads in the normal position but ensure the pad is at least 8 cm (approximately 3 inches) from the device',
      'Use only half the normal shock energy to avoid damaging the device',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'An implanted device is not a contraindication to using an AED. However, you should avoid placing a pad directly over the device as it may reduce shock effectiveness. Position the pad at least 8 cm away from the lump, adjusting the standard placement slightly if needed. The benefit of defibrillation far outweighs any risk.',
    section: 'Module 2',
    difficulty: 'advanced' as const,
    topic: 'AED with pacemaker',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 35,
    question: 'The two shockable rhythms that an AED can treat are:',
    options: [
      'Asystole and pulseless electrical activity (PEA)',
      'Sinus bradycardia and complete heart block',
      'Atrial fibrillation and supraventricular tachycardia',
      'Ventricular fibrillation (VF) and pulseless ventricular tachycardia (pVT)',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'The two shockable rhythms are ventricular fibrillation (VF) — a chaotic, disorganised electrical activity — and pulseless ventricular tachycardia (pVT) — a rapid rhythm that fails to produce effective cardiac output. Asystole and PEA are non-shockable rhythms where CPR and addressing reversible causes are the primary treatment.',
    section: 'Module 2',
    difficulty: 'advanced' as const,
    topic: 'Shockable vs non-shockable rhythms',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 36,
    question:
      'A pregnant woman in her third trimester collapses and is in cardiac arrest. How should CPR be modified?',
    options: [
      'Perform standard CPR but manually displace the uterus to the left to relieve pressure on the inferior vena cava',
      'Place her flat on her back and perform compressions at the normal depth without any modification',
      'Avoid using an AED, as defibrillation is unsafe during pregnancy',
      'Compress higher up the breastbone to avoid the abdomen and unborn baby',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'In late pregnancy, the gravid uterus can compress the inferior vena cava, reducing venous return and making CPR less effective. The uterus should be manually displaced to the left while performing standard chest compressions on a firm, flat surface. An AED should also be used as normal. Pregnancy is not a contraindication to defibrillation.',
    section: 'Module 2',
    difficulty: 'advanced' as const,
    topic: 'CPR in pregnancy',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 37,
    question:
      'A first aider gives abdominal thrusts to a choking casualty and the obstruction is cleared. Should the casualty still be assessed at hospital?',
    options: [
      'No — once the object is cleared and they are breathing normally, no further action is needed',
      'Yes — abdominal thrusts can cause internal injuries and the casualty should be assessed by a clinician',
      'No — they only need to rest at home for the remainder of the day',
      'Yes — but only if they continue to cough after the obstruction has cleared',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'Abdominal thrusts can cause internal injuries including damage to abdominal organs and blood vessels. Any casualty who has received abdominal thrusts should be assessed at hospital even if they appear to have recovered fully. This is a consistent recommendation across Resuscitation Council UK guidelines.',
    section: 'Module 2',
    difficulty: 'advanced' as const,
    topic: 'Post-choking assessment',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 38,
    question:
      'An AED is available but only has adult pads, and the casualty is a child aged 6 years. What should you do?',
    options: [
      'Do not use the AED, as adult pads must never be used on a child',
      'Cut the adult pads down to a smaller size so they fit the chest',
      'Use the adult pads; place one on the chest and one on the back if the pads are too large to fit without overlapping',
      'Wait for paediatric pads to arrive before attempting defibrillation',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      "If paediatric pads are not available, adult pads should be used rather than withholding defibrillation. If the child's chest is too small for the pads to be placed without touching, use an anterior–posterior placement: one pad on the centre of the chest and one on the back between the shoulder blades. Using an AED is always better than not using one.",
    section: 'Module 2',
    difficulty: 'advanced' as const,
    topic: 'AED on children',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 39,
    question:
      'During a resuscitation attempt, the AED delivers a shock but the casualty remains unresponsive with no signs of life. What is the immediate next step?',
    options: [
      'Check for a pulse and rhythm before doing anything further',
      'Wait for the AED to deliver a second shock before touching the casualty',
      'Place the casualty in the recovery position and monitor their breathing',
      'Resume CPR immediately for 2 minutes before the AED re-analyses',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'After a shock is delivered, CPR should be resumed immediately for 2 minutes (5 cycles of 30:2) without pausing to check for a pulse or rhythm. The AED will automatically prompt a re-analysis after this period. Minimising pauses in chest compressions is critical for maintaining coronary perfusion pressure.',
    section: 'Module 2',
    difficulty: 'advanced' as const,
    topic: 'Post-shock CPR protocol',
    category: 'CPR, AED & Airway' as const,
  },
  {
    id: 40,
    question:
      'Which of the following is a non-shockable cardiac arrest rhythm, and what is the primary treatment?',
    options: [
      'Pulseless electrical activity (PEA) — treated with high-quality CPR and addressing reversible causes',
      'Ventricular fibrillation — treated with continuous CPR only',
      'Pulseless ventricular tachycardia — treated with synchronised cardioversion',
      'Asystole — treated with a single AED shock followed by CPR',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      "Pulseless electrical activity (PEA) is a non-shockable rhythm where the heart shows organised electrical activity but fails to produce a pulse. The treatment is high-quality CPR and identifying and treating reversible causes (the 4 Hs and 4 Ts). An AED will correctly advise 'no shock' for PEA and asystole.",
    section: 'Module 2',
    difficulty: 'advanced' as const,
    topic: 'Non-shockable rhythms',
    category: 'CPR, AED & Airway' as const,
  },

  // =======================================================================
  // BLEEDING, BURNS & SHOCK — 40 questions (id 41–80)
  // =======================================================================

  // ── BLEEDING ──────────────────────────────────────────────────────────

  {
    id: 41,
    question:
      'Which type of bleeding is characterised by bright red blood that spurts rhythmically with each heartbeat?',
    options: [
      'Venous bleeding',
      'Arterial bleeding',
      'Capillary bleeding',
      'Internal bleeding',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'Arterial bleeding produces bright red, oxygenated blood that spurts in time with the pulse. It is the most dangerous type of external bleeding because arteries carry blood under high pressure directly from the heart. Without rapid intervention, arterial bleeding can be life-threatening within minutes.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Types of bleeding',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 42,
    question: 'Venous bleeding is best described as:',
    options: [
      'Bright red blood that spurts with the pulse',
      'Blood mixed with cerebrospinal fluid',
      'Dark red blood that flows steadily',
      'A slow ooze of blood from a graze',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'Venous blood is darker red because it is deoxygenated, having already delivered oxygen to the tissues. It flows steadily rather than spurting because veins carry blood under lower pressure than arteries. While still potentially serious, venous bleeding is generally easier to control with direct pressure than arterial bleeding.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Types of bleeding',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 43,
    question:
      'What is the first action a first aider should take when managing severe external bleeding?',
    options: [
      'Apply a tourniquet immediately',
      'Elevate the limb above heart level',
      'Pack the wound with gauze',
      'Apply direct pressure over the wound',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'Direct pressure over the wound is the primary and most effective first response for controlling severe external bleeding. Firm, continuous pressure compresses the blood vessels and allows clotting to begin. Other interventions such as tourniquets are considered only when direct pressure alone fails to control catastrophic limb bleeding.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Direct pressure technique',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 44,
    question:
      'When applying direct pressure to a wound, which of the following is correct practice?',
    options: [
      'Apply pressure and maintain it for at least 10 minutes without lifting the dressing',
      'Lift the dressing every minute to check whether the bleeding has stopped',
      'Remove a blood-soaked dressing and replace it with a clean one',
      'Apply pressure for 30 seconds, then release to let the wound clot',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'Firm, continuous pressure should be maintained for at least 10 minutes without lifting the dressing to check, as doing so disrupts clot formation. If a dressing becomes soaked through, a second dressing should be applied on top of the first rather than removing it. Removing the original dressing can dislodge forming clots and restart bleeding.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Direct pressure technique',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 45,
    question:
      'A colleague has a large piece of glass embedded in their forearm. What should you do?',
    options: [
      'Remove the glass carefully and apply direct pressure',
      'Leave the object in place and build dressings around it',
      'Push the glass through to the other side and bandage both wounds',
      'Pull the glass out quickly to reduce contamination risk',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'Embedded objects must never be removed by a first aider as they may be plugging damaged blood vessels and preventing further bleeding. The correct approach is to leave the object in situ, apply padding around it to build up the dressings on either side, and bandage over the top without pressing down on the object. The casualty should then be transported to hospital.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Embedded objects',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 46,
    question: 'Why should a first aider wear disposable gloves when treating a bleeding wound?',
    options: [
      'To keep the wound completely sterile and prevent any infection',
      'To allow firmer pressure to be applied directly over the wound',
      'To prevent cross-contamination between the casualty and the first aider',
      'To stop the blood from clotting too quickly on the dressing',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      "Gloves form a barrier that protects both the first aider and the casualty from cross-contamination. Blood-borne infections such as hepatitis B, hepatitis C, and HIV can be transmitted through contact with infected blood via cuts or broken skin. Since a first aider cannot know a casualty's infection status, gloves should always be worn as standard precaution when there is any risk of contact with blood or body fluids.",
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Cross-contamination prevention',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 47,
    question: 'Capillary bleeding typically presents as:',
    options: [
      'A forceful jet of bright red blood',
      'A steady flow of dark red blood',
      'Blood that changes colour from red to blue',
      'A slow ooze of blood from the wound surface',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'Capillary bleeding occurs when the smallest blood vessels are damaged, typically in superficial wounds such as grazes and abrasions. It presents as a slow ooze across the wound surface and usually stops on its own within a few minutes as clotting occurs. While generally the least dangerous type of bleeding, the wound still needs cleaning to prevent infection.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Types of bleeding',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 48,
    question: "In the C-ABC approach to trauma management, what does the initial 'C' stand for?",
    options: [
      'Catastrophic bleeding',
      'Consciousness',
      'Cervical spine',
      'Circulation',
    ] as [
      string,
      string,
      string,
      string,
    ],
    correctAnswer: 0,
    explanation:
      "The 'C' in C-ABC stands for Catastrophic bleeding, reflecting the principle that life-threatening external haemorrhage must be addressed before anything else in a major trauma scenario. This approach was adopted from military medicine, recognising that a casualty can bleed to death in minutes from a catastrophic limb wound. Only after catastrophic bleeding is controlled does the first aider move to Airway, Breathing, and Circulation.",
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Catastrophic bleeding',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 49,
    question: 'When should a tourniquet be considered for bleeding control?',
    options: [
      'As the first measure for any wound that is bleeding heavily',
      'Only when direct pressure has failed to control catastrophic limb bleeding',
      'Whenever a casualty shows the early signs of hypovolaemic shock',
      'For any deep wound to the neck, torso, or groin',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'A tourniquet is a last-resort measure used when direct pressure alone cannot control catastrophic bleeding from a limb. Current UK first aid guidelines recognise that trained first aiders may apply a tourniquet in life-threatening situations where other methods have failed. Tourniquets are not appropriate for non-limb injuries or for bleeding that can be controlled by direct pressure.',
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Tourniquet use',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 50,
    question: 'Where should a tourniquet be placed on a limb with catastrophic bleeding?',
    options: [
      'Directly over the wound to compress it as tightly as possible',
      'Below the wound, on the side furthest from the heart',
      '5 to 7 centimetres above the wound, between the wound and the heart',
      'Over the nearest joint, such as the elbow or knee, for the best grip',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'A tourniquet should be positioned 5 to 7 centimetres above the wound site, between the wound and the heart. This distance ensures the tourniquet compresses the artery effectively while avoiding placement directly on the wound or on a joint. Placing it too close to the wound may not adequately compress the supplying vessel, while placing it unnecessarily high restricts blood flow to more tissue than needed.',
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Tourniquet use',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 51,
    question: 'After applying a tourniquet, what critical information must be recorded?',
    options: [
      "The casualty's blood type",
      'The brand and model of tourniquet used',
      'The amount of blood lost before application',
      'The time of tourniquet application',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      "The time of tourniquet application must always be recorded and communicated to the ambulance crew. This is critical because prolonged tourniquet use can cause tissue damage, and medical professionals need to know how long the limb has been without blood supply to guide treatment decisions. The time should ideally be written on the tourniquet itself or on the casualty's skin near the device.",
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Tourniquet use',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 52,
    question: 'Once a tourniquet has been applied by a first aider, which statement is correct?',
    options: [
      'It should never be removed or loosened by the first aider',
      'It should be loosened every 15 minutes to allow blood flow',
      'It can be removed once bleeding appears to have stopped',
      'It should be gradually released over 30 minutes',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'Once applied, a tourniquet should never be removed or loosened by a first aider. Releasing a tourniquet can cause a sudden rush of toxins from the oxygen-starved tissue into the circulation, potentially leading to cardiac arrest. Only hospital medical staff with appropriate monitoring and resuscitation equipment should remove a tourniquet in a controlled environment.',
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Tourniquet use',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 53,
    question: 'Haemostatic dressings work by:',
    options: [
      'Providing an antibacterial barrier over the wound',
      'Promoting rapid clot formation through agents such as kaolin or chitosan',
      'Absorbing all the blood so the wound appears dry',
      'Cooling the wound to constrict blood vessels',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      "Haemostatic dressings contain agents such as kaolin or chitosan that accelerate the body's natural clotting process. Kaolin activates clotting factors in the blood, while chitosan (derived from crustacean shells) attracts red blood cells and platelets to form a gel-like seal. These dressings are used in conjunction with direct pressure for severe bleeding that is difficult to control with standard dressings alone.",
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Haemostatic dressings',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 54,
    question:
      'Which of the following wound types is caused by a sharp object such as a knife and has clean, straight edges?',
    options: [
      'Laceration',
      'Abrasion',
      'Incision',
      'Contusion',
    ] as [
      string,
      string,
      string,
      string,
    ],
    correctAnswer: 2,
    explanation:
      'An incision is a clean, straight-edged wound caused by a sharp cutting instrument such as a knife, scalpel, or glass. Because the edges are clean, incisions may bleed heavily but often heal more neatly than lacerations. A laceration, by contrast, has irregular, torn edges typically caused by blunt force or crushing, while an abrasion is a superficial graze.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Wound types',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 55,
    question: 'A puncture wound is particularly dangerous because:',
    options: [
      'The wound edges are clean and straight, making stitching difficult',
      'They always bleed profusely and are hard to control with pressure',
      'They heal too quickly, trapping bacteria beneath the surface',
      'The entry wound may appear small while internal damage can be extensive, and infection risk is high',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      "Puncture wounds are deceptively dangerous because the small entry point can mask significant internal damage to deeper structures such as organs and blood vessels. Additionally, the object that caused the wound can carry bacteria deep into the tissue where the body's defences are less effective, significantly increasing the risk of infection including tetanus. These wounds should always be assessed at hospital.",
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Wound types',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 56,
    question:
      'If a finger has been amputated in a workplace accident, how should the severed part be managed?',
    options: [
      'Wrap it in damp gauze, place it in a sealed plastic bag, and put the bag on ice',
      'Place it directly onto ice to keep the tissue as cold as possible',
      'Wash it thoroughly in antiseptic and wrap it in a dry bandage',
      'Keep it warm against the casualty’s body to preserve the tissue',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'The amputated part should be wrapped in clean, damp gauze or cloth, placed in a sealed plastic bag, and then placed on ice or in cold water. This keeps the tissue cool without allowing direct contact with ice, which can cause frostbite damage to the delicate tissues and reduce the chance of successful reattachment. The part should accompany the casualty to hospital as soon as possible.',
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Amputations',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 57,
    question:
      'When managing a partial amputation where the body part is still attached by a flap of tissue, the first aider should:',
    options: [
      'Cut through the remaining tissue to fully separate the part for storage on ice',
      'Realign the part as best as possible, control bleeding, and support in position with dressings',
      'Leave the part hanging and apply a tourniquet above it without realigning',
      'Push the part firmly back into place and bandage tightly over it',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'In a partial amputation, the attached tissue may still have some blood supply, so the first aider should gently realign the part to its normal position if possible, control bleeding with direct pressure and dressings, and support the limb. The tissue connection should never be severed by the first aider, as even a partial blood supply can improve the chances of surgical repair.',
    section: 'Module 3',
    difficulty: 'advanced' as const,
    topic: 'Amputations',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 58,
    question:
      'A kaolin-based haemostatic dressing differs from a chitosan-based one in that kaolin:',
    options: [
      'Is derived from crustacean shells and may cause allergic reactions in shellfish-allergic patients',
      'Must be removed before the casualty reaches hospital',
      'Is a mineral clay that activates the intrinsic clotting cascade on contact with blood',
      'Can only be used on capillary bleeding',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'Kaolin is a naturally occurring mineral clay that works by activating factor XII in the intrinsic clotting cascade, dramatically speeding up clot formation. Chitosan, by contrast, is the agent derived from crustacean shells. While both are effective haemostatic agents, kaolin-based products carry no shellfish allergy risk, making them a broader-use option in pre-hospital settings.',
    section: 'Module 3',
    difficulty: 'advanced' as const,
    topic: 'Haemostatic dressings',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 59,
    question:
      'In a mass casualty incident, a first aider encounters a casualty with catastrophic bilateral leg bleeding. Direct pressure is impractical due to the extent of injuries. What is the most appropriate action?',
    options: [
      'Apply haemostatic dressings to both legs and elevate',
      'Focus on airway management as bleeding control is hopeless',
      'Pack both wounds with clothing and wait for the ambulance',
      'Apply a tourniquet to each leg 5–7 cm above the highest wound on each limb',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'When catastrophic bleeding from both limbs cannot be controlled with direct pressure, a tourniquet should be applied to each limb 5–7 cm above the highest wound. In mass casualty situations the C-ABC principle prioritises catastrophic bleeding control first. Each tourniquet application time should be noted separately and communicated to emergency services upon their arrival.',
    section: 'Module 3',
    difficulty: 'advanced' as const,
    topic: 'Catastrophic bleeding',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 60,
    question:
      'A construction worker has a severe laceration to the neck with profuse venous bleeding. A tourniquet is not appropriate. What is the best approach?',
    options: [
      'Apply direct pressure with a large pad and maintain it firmly',
      'Apply a tourniquet around the neck just tight enough to slow the flow',
      'Tilt the head back to stretch the wound edges closed',
      'Wrap a pressure bandage right around the neck to compress the wound',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'For neck wounds, tourniquets are never appropriate as they would obstruct the airway and blood supply to the brain. The correct approach is firm direct pressure using a large sterile pad held over the wound. A haemostatic dressing may be used if available and the first aider is trained. Circumferential bandaging around the neck must be avoided as it could compress the airway and vessels on the uninjured side.',
    section: 'Module 3',
    difficulty: 'advanced' as const,
    topic: 'Catastrophic bleeding',
    category: 'Bleeding, Burns & Shock' as const,
  },

  // ── BURNS ─────────────────────────────────────────────────────────────

  {
    id: 61,
    question: 'What is the recommended duration for cooling a burn under cool running water?',
    options: [
      '5 minutes',
      '20 minutes',
      '10 minutes',
      '30 minutes',
    ] as [
      string,
      string,
      string,
      string,
    ],
    correctAnswer: 1,
    explanation:
      'Current UK first aid guidelines recommend cooling a burn under cool running water for a minimum of 20 minutes. This helps to dissipate heat from the deeper tissue layers, reduce swelling, and provide pain relief. Cooling for less time may not adequately remove residual heat, while excessively cold water or ice should never be used as they can cause vasoconstriction and further tissue damage.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Cooling burns',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 62,
    question: 'After cooling a burn, what is the recommended covering to protect the wound?',
    options: [
      'A thick layer of cotton wool held in place with tape',
      'A self-adhesive plaster pressed firmly over the burn',
      'Cling film applied lengthways over the burn',
      'A damp tea towel wrapped tightly around the area',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'Cling film should be applied lengthways in strips over the burn rather than wrapped around the limb, as wrapping can create a tourniquet effect if swelling occurs. Cling film provides a sterile, non-adherent covering that protects the wound from infection while allowing medical staff to assess the burn without removing the dressing. Fluffy materials like cotton wool must be avoided as fibres can stick to the wound.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Burns dressings',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 63,
    question:
      'Why must cling film be applied lengthways in strips rather than wrapped circumferentially around a burnt limb?',
    options: [
      'Lengthways application sticks better to the skin',
      'Wrapping around a limb causes the cling film to melt',
      'Lengthways strips are easier to see through for assessment',
      'Circumferential wrapping can act as a tourniquet if the burn swells',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'Burns cause significant tissue swelling (oedema), particularly in the hours following the injury. If cling film is wrapped circumferentially around a limb, it cannot expand with the swelling and may constrict blood flow, effectively acting as a tourniquet. Applying it lengthways in overlapping strips allows the covering to separate and accommodate swelling without restricting circulation.',
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Burns dressings',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 64,
    question: 'A superficial burn (formerly called a first-degree burn) affects:',
    options: [
      'Only the epidermis (outer layer of skin)',
      'The epidermis and part of the dermis',
      'The full thickness of the skin including subcutaneous tissue',
      'Muscle and bone beneath the skin',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'A superficial burn involves only the epidermis, the outermost layer of skin. It typically presents as red, painful skin without blistering, similar to mild sunburn. Superficial burns usually heal within 7 to 10 days without scarring, as the underlying dermis containing the regenerative structures remains intact.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Burns depth',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 65,
    question: 'Which of the following is a characteristic of a partial-thickness burn?',
    options: [
      'The skin appears white or charred and there is no pain',
      'The skin is red, blistered, and extremely painful',
      'Only the surface of the skin is pink with no blistering',
      'The burn area is numb with a leathery texture',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'Partial-thickness burns damage both the epidermis and part of the dermis. They characteristically form fluid-filled blisters and are very painful because nerve endings in the dermis are exposed and irritated but not destroyed. The skin appears red, moist, and blistered. These burns may take several weeks to heal and can result in scarring.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Burns depth',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 66,
    question: 'A full-thickness burn may appear painless at the burn site because:',
    options: [
      'The body releases a large amount of natural painkillers',
      'Full-thickness burns only affect the surface layer',
      'The nerve endings in the skin have been destroyed',
      'Cold water treatment has numbed the area',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'Full-thickness burns destroy all layers of the skin including the nerve endings, which is why the burn site itself may be painless. The surrounding areas of partial-thickness damage, however, are often extremely painful. The burnt skin typically appears white, waxy, charred, or leathery. Full-thickness burns always require hospital treatment and usually need skin grafting.',
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Burns depth',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 67,
    question:
      'Using the Rule of Nines in an adult, approximately what percentage of total body surface area does one entire arm represent?',
    options: [
      '1%',
      '36%',
      '18%',
      '9%',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'Under the Rule of Nines, each entire arm (including the hand) represents approximately 9% of the total body surface area in an adult. This system divides the body into regions that are roughly 9% or multiples of 9%: each leg is 18%, the front of the torso is 18%, the back is 18%, the head is 9%, and the perineum is 1%. This tool helps first aiders and paramedics quickly estimate the extent of a burn.',
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Rule of Nines',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 68,
    question:
      'According to the Rule of Nines, an adult with burns covering the entire front of the torso and one entire leg would have approximately what percentage burn?',
    options: [
      '36%',
      '27%',
      '18%',
      '45%',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      "The front of the torso accounts for 18% and one entire leg accounts for 18%, giving a total of 36% total body surface area burned. Burns covering more than 20% of an adult's body surface area carry significant risk of hypovolaemic shock due to plasma fluid loss through the damaged skin. This casualty would require urgent hospital treatment with intravenous fluid resuscitation.",
    section: 'Module 3',
    difficulty: 'advanced' as const,
    topic: 'Rule of Nines',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 69,
    question: 'Which of the following should NEVER be applied to a burn?',
    options: [
      'Cool running water',
      'Ice, creams, or adhesive dressings',
      'Cling film in lengthways strips',
      'A clean, non-fluffy sterile dressing',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'Ice, creams, lotions, butter, and adhesive dressings must never be applied to a burn. Ice causes vasoconstriction that can worsen tissue damage, creams and lotions trap heat in the tissue and introduce potential contaminants, and adhesive dressings will stick to the damaged skin and cause further injury when removed. Only cool running water followed by a non-adherent covering such as cling film is appropriate.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Burns — what NOT to do',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 70,
    question: 'A casualty has a burn with intact blisters. What should the first aider do?',
    options: [
      'Burst the blisters to release the fluid and relieve pressure',
      'Pierce each blister with a sterile needle and cover with a plaster',
      'Leave the blisters intact as they protect the underlying tissue from infection',
      'Apply antiseptic cream to the blisters to prevent infection',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'Burn blisters should never be burst by a first aider. The intact blister acts as a natural sterile dressing, protecting the raw, damaged tissue beneath from infection and further trauma. Bursting blisters exposes the wound to bacteria and significantly increases the risk of infection. The blisters should be left intact and protected with an appropriate non-adherent covering.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Burns — what NOT to do',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 71,
    question: 'When treating a chemical burn to the skin, the first aider should:',
    options: [
      'Apply a neutralising agent to counteract the acid or alkali',
      'Cover the burn immediately without flushing to avoid spreading the chemical',
      'Flush for no more than 2 minutes, then apply a burn dressing',
      'Brush off any dry chemical, then flush with copious running water for at least 20 minutes',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'For chemical burns, any dry chemical powder should first be carefully brushed off (to prevent it dissolving and spreading in water), then the affected area should be flushed with copious amounts of running water for at least 20 minutes. Attempting to neutralise a chemical can produce an exothermic reaction that generates further heat and worsens the burn. The water dilutes and removes the chemical from the skin.',
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Chemical burns',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 72,
    question: 'Electrical burns are particularly dangerous because:',
    options: [
      'They cause deep internal tissue damage along the current pathway, often with small entry and exit wounds',
      'They are confined to the surface of the skin and rarely cause lasting harm',
      'They never bleed, making the extent of injury easy to underestimate',
      'They heal faster than thermal burns because the wound is cauterised',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'Electrical burns cause damage along the entire path the current takes through the body, meaning extensive internal tissue damage to muscles, nerves, and blood vessels can occur even when the external entry and exit wounds appear relatively small. The severity of an electrical burn is almost always far greater than the visible skin damage suggests. Cardiac monitoring is essential as electrical current can disrupt heart rhythm.',
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Electrical burns',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 73,
    question:
      'When assessing a casualty with an electrical burn, which TWO wound sites should the first aider look for?',
    options: [
      'The wound closest to the heart and the wound furthest from the heart',
      'An entry wound where current entered and an exit wound where it left the body',
      'The largest wound and the smallest wound',
      'A wound on the left side and a corresponding wound on the right side',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'Electrical current follows a path through the body, creating an entry wound where it entered and an exit wound where it left. Both sites need assessment and treatment. The exit wound is often larger and more damaged than the entry wound because the current concentrates as it leaves the body. All tissue between these two points may have sustained internal damage even if the skin appears normal.',
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Electrical burns',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 74,
    question:
      'A factory worker suffers burns to the entire back of their torso and the back of both legs. Using the Rule of Nines, the estimated total body surface area burned is:',
    options: [
      '18%',
      '27%',
      '36%',
      '54%',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'The back of the torso accounts for 18% of total body surface area. Each entire leg is 18%, but the back of each leg is 9%. The back of both legs combined is therefore 18%. Adding the back of the torso (18%) to the back of both legs (18%) gives a total of 36%. This represents a major burn requiring immediate emergency treatment and fluid resuscitation.',
    section: 'Module 3',
    difficulty: 'advanced' as const,
    topic: 'Rule of Nines',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 75,
    question:
      'A casualty has suffered chemical burns to both eyes from an alkaline cleaning product. The first aider should:',
    options: [
      'Apply a sterile eye pad to both eyes and arrange transport to hospital',
      'Irrigate for 2 minutes, then neutralise the alkali with a mild acid such as vinegar',
      'Encourage the casualty to keep their eyes tightly shut until help arrives',
      'Irrigate the affected eye(s) with cool, clean water for at least 20 minutes, ensuring runoff does not enter the unaffected eye',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'Chemical burns to the eyes require immediate and prolonged irrigation with cool, clean water for at least 20 minutes. The head should be tilted so that contaminated water runs away from the unaffected eye to prevent secondary chemical injury. Alkaline burns are particularly dangerous as alkalis continue to penetrate and damage tissue until fully flushed away. Neutralising agents should never be used as they can cause exothermic reactions.',
    section: 'Module 3',
    difficulty: 'advanced' as const,
    topic: 'Chemical burns',
    category: 'Bleeding, Burns & Shock' as const,
  },

  // ── SHOCK ─────────────────────────────────────────────────────────────

  {
    id: 76,
    question:
      'What is the correct first aid treatment for a conscious casualty showing signs of hypovolaemic shock?',
    options: [
      'Lie them flat, raise their legs, keep them warm, and call 999',
      'Sit them upright to help breathing and give them warm sweet tea',
      'Place them in the recovery position and apply cold compresses',
      'Have them walk around slowly to maintain circulation',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'A conscious casualty in hypovolaemic shock should be laid flat on their back with their legs raised approximately 15 to 30 centimetres to help blood return to the heart and vital organs. Keeping the casualty warm with a blanket prevents heat loss, which worsens shock. The casualty should not eat or drink as they may need surgery, and emergency services must be called immediately.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Shock treatment',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 77,
    question: 'Which of the following is an early sign of shock?',
    options: [
      'Hot, flushed skin with a slow pulse',
      'Pale, cold, clammy skin with a rapid pulse',
      'High blood pressure and slow breathing',
      'Constricted pupils and warm extremities',
    ] as [string, string, string, string],
    correctAnswer: 1,
    explanation:
      'Early signs of shock include pale, cold, and clammy skin as the body redirects blood from the extremities to vital organs, and a rapid (tachycardic) pulse as the heart attempts to compensate for reduced circulating volume. Other early signs include feeling dizzy or faint, thirst, and anxiety or restlessness. Recognising these early signs is crucial for prompt treatment before the casualty deteriorates.',
    section: 'Module 3',
    difficulty: 'basic' as const,
    topic: 'Shock recognition',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 78,
    question:
      'A casualty is showing signs of severe anaphylaxis with breathing difficulty and swelling of the face and throat. They carry a prescribed adrenaline auto-injector. Where should it be administered?',
    options: [
      'Into a vein in the forearm for the fastest possible effect',
      'Into the upper outer buttock, avoiding the sciatic nerve',
      'Into the outer mid-thigh through clothing if necessary',
      'Into the upper arm muscle after exposing bare skin',
    ] as [string, string, string, string],
    correctAnswer: 2,
    explanation:
      'An adrenaline auto-injector should be administered into the outer mid-thigh, and it can be given through clothing if necessary to avoid delay. The outer mid-thigh has a large muscle mass with good blood supply, ensuring rapid absorption of the adrenaline. It should never be injected into the buttock (risk of hitting the sciatic nerve) or intravenously. The thigh site is also the easiest for self-administration.',
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Anaphylaxis',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 79,
    question:
      "If a casualty's anaphylaxis symptoms have not improved after the first adrenaline auto-injector dose, what should the first aider do?",
    options: [
      'Give a sugary drink to help raise the casualty’s blood pressure',
      'Lay the casualty flat and wait at least 30 minutes before acting further',
      'Assume the first dose has failed and begin CPR immediately',
      'Administer a second auto-injector after 5 minutes if symptoms persist and a second device is available',
    ] as [string, string, string, string],
    correctAnswer: 3,
    explanation:
      'If symptoms of anaphylaxis have not improved 5 minutes after the first adrenaline auto-injector, a second dose may be administered provided a second device is available. The 5-minute interval allows time for the first dose to take effect while not delaying further treatment if it proves insufficient. Emergency services should always be called even if the adrenaline appears effective, as biphasic reactions can cause symptoms to return hours later.',
    section: 'Module 3',
    difficulty: 'intermediate' as const,
    topic: 'Anaphylaxis',
    category: 'Bleeding, Burns & Shock' as const,
  },
  {
    id: 80,
    question:
      'Which combination of signs would most strongly suggest a casualty is developing anaphylactic shock rather than a simple localised allergic reaction?',
    options: [
      'Widespread urticarial rash, swollen tongue, wheezing, and rapidly falling blood pressure',
      'Redness and itching confined to the area around a bee sting',
      'A mild headache and localised swelling at the site of contact',
      'Nausea and a single episode of vomiting with stable vital signs',
    ] as [string, string, string, string],
    correctAnswer: 0,
    explanation:
      'Anaphylactic shock presents with a combination of widespread systemic signs affecting multiple body systems: urticaria (hives) on the skin, angioedema (swelling of the tongue, lips, and throat), bronchospasm causing wheeze and breathing difficulty, and cardiovascular collapse with rapidly falling blood pressure. This multi-system involvement distinguishes anaphylaxis from a simple localised allergic reaction and makes it a life-threatening emergency requiring immediate adrenaline.',
    section: 'Module 3',
    difficulty: 'advanced' as const,
    topic: 'Anaphylaxis',
    category: 'Bleeding, Burns & Shock' as const,
  },

  // =======================================================================
  // MEDICAL EMERGENCIES — 40 questions (id 81–120)
  // =======================================================================

  // --- HEART ATTACK RECOGNITION (basic) ---
  {
    id: 81,
    question:
      'Which of the following is the most characteristic description of chest pain during a heart attack?',
    options: [
      'A burning sensation localised to the upper abdomen',
      'A crushing or tight band-like pain in the centre of the chest',
      'A sharp, stabbing pain that worsens when breathing in',
      'A dull ache that only occurs during physical exertion',
    ],
    correctAnswer: 1,
    explanation:
      'Heart attack pain is classically described as a crushing, squeezing, or tight band-like sensation in the centre of the chest. Unlike pleuritic pain, it does not typically worsen with breathing. It may occur at rest and is often more severe and persistent than angina.',
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Heart Attack Recognition',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 82,
    question:
      'A colleague complains of severe chest pain that spreads to their left arm and jaw. They are sweating profusely and feel nauseous. What is the most likely cause?',
    options: [
      'A panic attack brought on by stress at work',
      'Severe indigestion after a heavy meal',
      'A heart attack (myocardial infarction)',
      'A pulled muscle in the chest wall',
    ],
    correctAnswer: 2,
    explanation:
      'The combination of crushing chest pain radiating to the left arm and jaw, profuse sweating, and nausea are classic signs of a heart attack. While panic attacks can mimic some symptoms, the radiation pattern and sweating strongly suggest a cardiac event. This casualty needs an immediate 999 call.',
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Heart Attack Recognition',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 83,
    question: 'Which of the following is NOT a common sign or symptom of a heart attack?',
    options: [
      'Nausea and a sense of impending doom',
      'Profuse sweating and grey, pale skin',
      'Pain radiating to the left arm or jaw',
      'A high temperature and a rash',
    ],
    correctAnswer: 3,
    explanation:
      'A high temperature and a rash are not associated with a heart attack; they are more indicative of an infection or allergic reaction. Heart attack signs include chest pain, radiating pain, sweating, pallor, nausea, and shortness of breath. Recognising the correct signs enables a faster emergency response.',
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Heart Attack Recognition',
    category: 'Medical Emergencies' as const,
  },
  // --- ASPIRIN & POSITIONING (basic / intermediate) ---
  {
    id: 84,
    question:
      'What dose of aspirin should a first aider offer a conscious adult casualty who is suspected of having a heart attack, provided they are not allergic?',
    options: [
      '300 mg chewed slowly',
      '500 mg dissolved in water',
      '150 mg swallowed with a sugary drink',
      '75 mg swallowed whole with water',
    ],
    correctAnswer: 0,
    explanation:
      'The recommended first aid dose for a suspected heart attack is a single 300 mg aspirin tablet, chewed slowly rather than swallowed whole. Chewing the tablet allows it to be absorbed more quickly into the bloodstream. This helps to thin the blood and may limit further clot formation in the coronary arteries.',
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Aspirin Administration',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 85,
    question:
      'In what position should you place a conscious casualty who is suspected of having a heart attack?',
    options: [
      "Lying completely flat on their back with their legs raised",
      "Sitting upright, ideally in a comfortable 'W' position with knees bent",
      "On their side in the recovery position",
      "Standing up and walking slowly to keep the circulation moving",
    ],
    correctAnswer: 1,
    explanation:
      "A conscious heart attack casualty should be placed in a comfortable seated position, often described as the 'W' position with their back supported and knees bent. This position eases the workload on the heart and helps breathing. Lying flat could make breathing harder and increase strain on the heart.",
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Heart Attack Positioning',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 86,
    question: 'Why is aspirin chewed rather than swallowed whole during a suspected heart attack?',
    options: [
      'Chewing prevents the casualty from choking on the tablet',
      'Chewing reduces the risk of an allergic reaction',
      'Chewing allows the aspirin to be absorbed into the bloodstream more quickly',
      'Chewing makes the aspirin taste better so the casualty is more likely to take it',
    ],
    correctAnswer: 2,
    explanation:
      'Chewing the aspirin breaks it into smaller pieces, increasing the surface area and allowing faster absorption through the lining of the mouth and stomach. In a heart attack, speed of absorption is critical because aspirin inhibits platelet aggregation, helping to prevent the clot from growing larger. Swallowing whole would significantly delay this effect.',
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Aspirin Administration',
    category: 'Medical Emergencies' as const,
  },
  // --- ANGINA VS HEART ATTACK (intermediate) ---
  {
    id: 87,
    question: 'How does angina pain typically differ from a heart attack?',
    options: [
      'Angina pain always radiates to the jaw, whereas heart attack pain never does',
      'Angina only affects people under 40, whereas heart attacks affect older adults',
      'Angina pain is sharp and worsens on breathing in; heart attack pain does not',
      'Angina pain is usually relieved by rest or GTN spray within a few minutes; heart attack pain is not',
    ],
    correctAnswer: 3,
    explanation:
      'Angina is caused by a temporary reduction in blood flow to the heart and is usually relieved by rest or prescribed GTN (glyceryl trinitrate) spray within 5 minutes. Heart attack pain persists despite rest and GTN, because the blood supply is completely blocked. Both conditions can cause nausea and can affect any adult age group.',
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Angina vs Heart Attack',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 88,
    question:
      'A worker with a known history of angina uses their GTN spray but their chest pain has not eased after 5 minutes. What should a first aider do next?',
    options: [
      'Call 999 immediately, as the pain may indicate a heart attack',
      'Administer a second dose of GTN and wait another 10 minutes',
      'Give them paracetamol and advise them to rest for 30 minutes',
      'Drive them to the nearest hospital yourself',
    ],
    correctAnswer: 0,
    explanation:
      "If a known angina sufferer's pain is not relieved by their GTN spray within 5 minutes, the situation should be treated as a possible heart attack. Call 999 immediately, sit the casualty in a comfortable position, and offer 300 mg aspirin to chew if they are not allergic. Do not delay calling emergency services.",
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Angina vs Heart Attack',
    category: 'Medical Emergencies' as const,
  },
  // --- STROKE & FAST (basic / intermediate / advanced) ---
  {
    id: 89,
    question: 'What does the FAST test stand for in stroke recognition?',
    options: [
      'Feel, Assess, Sit, Treat',
      'Face, Arms, Speech, Time',
      'First, Aid, Support, Transport',
      'Fluid, Airway, Stabilise, Temperature',
    ],
    correctAnswer: 1,
    explanation:
      'FAST stands for Face (has their face fallen on one side?), Arms (can they raise both arms and keep them there?), Speech (is their speech slurred or garbled?), and Time (call 999 immediately). The FAST test is a simple and effective way for non-medical personnel to identify a potential stroke quickly.',
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Stroke FAST Test',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 90,
    question:
      "During the FAST test, you notice one side of the casualty's face has drooped and they cannot raise their left arm. They are speaking clearly. Should you still suspect a stroke?",
    options: [
      'No — all three signs (face, arms, speech) must be present to suspect a stroke',
      'No — clear speech rules out a stroke',
      'Yes — any single FAST sign is enough to suspect a stroke and call 999',
      'Yes — but only if the casualty is over 65 years old',
    ],
    correctAnswer: 2,
    explanation:
      'Any single positive sign in the FAST test is sufficient to suspect a stroke and trigger a 999 call. Not all signs need to be present simultaneously. Strokes can affect different areas of the brain, so symptoms vary. Time is critical — the sooner treatment begins, the better the outcome.',
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Stroke FAST Test',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 91,
    question: 'What is a transient ischaemic attack (TIA)?',
    options: [
      'A permanent loss of brain function caused by a bleed in the brain',
      'A type of heart attack that briefly reduces blood flow to the brain',
      'A seizure caused by a sudden drop in blood pressure',
      'A temporary disruption to the blood supply to the brain, with symptoms that resolve within 24 hours',
    ],
    correctAnswer: 3,
    explanation:
      "A TIA, sometimes called a 'mini-stroke', is caused by a temporary disruption to the blood supply in the brain, and symptoms typically resolve within 24 hours. Although symptoms pass, a TIA is a serious warning sign that the person is at risk of a full stroke. They should still be assessed urgently at hospital.",
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'TIA',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 92,
    question:
      'A colleague suddenly develops slurred speech and weakness on one side of their body. Symptoms completely resolve after 20 minutes. What is the correct course of action?',
    options: [
      'Treat it as a medical emergency — call 999, as this may be a TIA and requires urgent assessment',
      'Reassure them that, as the symptoms have gone, no action is needed',
      'Advise them to book a routine GP appointment within the next week',
      'Give them aspirin to chew and send them home to rest',
    ],
    correctAnswer: 0,
    explanation:
      'Even though the symptoms resolved, this presentation is consistent with a TIA, which is a medical emergency and a major warning sign of a future full stroke. The casualty needs urgent hospital assessment to determine the cause and begin preventative treatment. A first aider should never dismiss resolved stroke-like symptoms.',
    section: 'Module 4',
    difficulty: 'advanced' as const,
    topic: 'TIA',
    category: 'Medical Emergencies' as const,
  },
  // --- SEIZURES (basic / intermediate / advanced) ---
  {
    id: 93,
    question:
      'What is the most important thing a first aider should do during a tonic-clonic seizure?',
    options: [
      "Hold the casualty's limbs firmly to stop the jerking movements",
      'Protect the casualty from injury by clearing the area around them, but do NOT restrain them',
      "Pour cold water on the casualty's face to bring them round more quickly",
      'Place something in their mouth to prevent them biting their tongue',
    ],
    correctAnswer: 1,
    explanation:
      "During a tonic-clonic seizure, the first aider should clear the surrounding area of hard or sharp objects and protect the casualty's head, but must NOT attempt to restrain their movements. Restraining a seizing person can cause injury to both the casualty and the first aider. Never place anything in the mouth.",
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Seizure Management',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 94,
    question:
      'Which of the following should you NEVER do when managing a casualty who is having a seizure?',
    options: [
      'Call 999 if the seizure lasts more than 5 minutes',
      'Place soft padding under their head',
      'Put your fingers or an object into their mouth',
      'Note the time the seizure started',
    ],
    correctAnswer: 2,
    explanation:
      "You should never place anything in a seizing person's mouth, including your fingers. This can cause injury to the casualty's teeth or jaw and can result in a serious bite injury to the first aider. The idea that a person can swallow their tongue during a seizure is a myth.",
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Seizure Management',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 95,
    question:
      'A worker has a tonic-clonic seizure that has lasted for 6 minutes and shows no signs of stopping. What is this condition called and what should you do?',
    options: [
      'Postictal state — let them sleep it off without calling for help',
      'Febrile convulsion — cool the casualty and wait for it to pass',
      'Absence seizure — reassure them and monitor without intervention',
      'Status epilepticus — call 999 immediately as this is a life-threatening emergency',
    ],
    correctAnswer: 3,
    explanation:
      'A seizure lasting more than 5 minutes is classified as status epilepticus, which is a life-threatening medical emergency. Call 999 immediately if this occurs. Prolonged seizures can lead to brain damage, breathing difficulties, and cardiac arrest. Continue to protect the casualty from injury while waiting for emergency services.',
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Status Epilepticus',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 96,
    question:
      'After a tonic-clonic seizure ends, the casualty is breathing but remains unconscious. What should you do?',
    options: [
      'Place them in the recovery position, monitor their breathing, and stay with them',
      'Sit them upright and give them water to drink',
      'Shake them vigorously to try to wake them up',
      'Leave them where they are and go to call for help',
    ],
    correctAnswer: 0,
    explanation:
      'After a seizure, the casualty enters a postictal phase during which they may be confused or remain unconscious. If they are breathing but unresponsive, place them in the recovery position to keep their airway clear and monitor their breathing continuously. Stay with them until they are fully alert or emergency services arrive.',
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Seizure Management',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 97,
    question:
      'In which of the following scenarios should you call 999 for a person having a seizure?',
    options: [
      'Only if the casualty does not regain full consciousness within 30 seconds',
      'If it is their first seizure, the seizure lasts more than 5 minutes, they have a second seizure without regaining consciousness, or they are injured',
      'Only if the casualty has no known history of epilepsy whatsoever',
      'Whenever a seizure occurs, regardless of duration or the person’s history',
    ],
    correctAnswer: 1,
    explanation:
      "You should call 999 if it is the person's first known seizure, if the seizure lasts more than 5 minutes, if they have repeated seizures without regaining consciousness between them, if they are injured, or if you are unsure. The 5-minute threshold marks the onset of status epilepticus, which requires emergency medical intervention.",
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Status Epilepticus',
    category: 'Medical Emergencies' as const,
  },
  // --- HYPOGLYCAEMIA & HYPERGLYCAEMIA (basic / intermediate / advanced) ---
  {
    id: 98,
    question:
      'A known diabetic colleague becomes shaky, confused, pale, and sweaty. What is the most likely cause?',
    options: [
      'Hyperglycaemia (high blood sugar)',
      'A panic attack brought on by stress',
      'Hypoglycaemia (low blood sugar)',
      'A heart attack (myocardial infarction)',
    ],
    correctAnswer: 2,
    explanation:
      'Shakiness, confusion, pallor, and sweating are classic signs of hypoglycaemia (low blood sugar). In diabetics, this can occur when they have taken too much insulin, missed a meal, or over-exerted themselves. Hyperglycaemia develops more gradually and typically presents with thirst, frequent urination, and drowsiness.',
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Hypoglycaemia Recognition',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 99,
    question:
      'What is the correct first aid treatment for a conscious casualty experiencing hypoglycaemia?',
    options: [
      'Help them inject their insulin to bring their blood sugar under control',
      'Encourage them to rest and avoid food until the symptoms pass',
      'Give them a large glass of water and lay them flat with legs raised',
      'Give them a sugary drink such as non-diet cola or fruit juice, followed by a longer-acting carbohydrate snack',
    ],
    correctAnswer: 3,
    explanation:
      'A conscious hypoglycaemic casualty needs fast-acting sugar to raise their blood glucose quickly — a sugary (non-diet) drink or glucose tablets are ideal. Follow this with a longer-acting carbohydrate such as a sandwich or cereal bar to maintain blood sugar levels. Never give insulin, as this would make the situation worse.',
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Hypoglycaemia Treatment',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 100,
    question:
      'A diabetic casualty is found unconscious. You suspect hypoglycaemia. What should you do?',
    options: [
      'Place them in the recovery position, call 999, and do NOT give anything by mouth',
      'Pour a sugary drink into the side of their mouth to raise blood sugar',
      'Rub glucose gel onto their gums and sit them upright',
      'Inject their adrenaline auto-injector to stabilise their condition',
    ],
    correctAnswer: 0,
    explanation:
      'Never give food or drink to an unconscious casualty as it poses a serious choking and aspiration risk. Place them in the recovery position to maintain their airway, call 999 immediately, and monitor their breathing. Paramedics can administer intravenous glucose or glucagon safely.',
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Hypoglycaemia Treatment',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 101,
    question:
      'Which of the following signs is more indicative of hyperglycaemia than hypoglycaemia?',
    options: [
      'Sudden onset of trembling, sweating, and pallor within minutes',
      'Gradual onset of excessive thirst, frequent urination, and a fruity smell on the breath',
      'Rapid confusion and aggression that resolves quickly with sugar',
      'Cold, clammy skin accompanied by a fast, weak pulse',
    ],
    correctAnswer: 1,
    explanation:
      'Hyperglycaemia develops gradually over hours or days and is characterised by excessive thirst, frequent urination, drowsiness, and sometimes a sweet or fruity smell on the breath (caused by ketones). Hypoglycaemia, by contrast, has a rapid onset with sweating, trembling, confusion, and pallor.',
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Hyperglycaemia Recognition',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 102,
    question:
      'You are unsure whether a conscious diabetic casualty is experiencing hypoglycaemia or hyperglycaemia. What is the safest initial action?',
    options: [
      'Give nothing and wait to see whether the symptoms improve on their own',
      'Help them inject insulin, as high blood sugar is the more dangerous state',
      'Give them a sugary drink — if they are hypoglycaemic it will help; if hyperglycaemic it is unlikely to cause significant additional harm in the short term',
      'Give a large glass of plain water to dilute the blood sugar either way',
    ],
    correctAnswer: 2,
    explanation:
      'When in doubt, give sugar. Hypoglycaemia is immediately life-threatening and sugar will correct it rapidly. A small amount of additional sugar in a hyperglycaemic casualty is unlikely to cause significant harm in the short term. Never administer insulin unless you are specifically trained and authorised to do so.',
    section: 'Module 4',
    difficulty: 'advanced' as const,
    topic: 'Diabetic Emergency',
    category: 'Medical Emergencies' as const,
  },
  // --- ELECTRIC SHOCK (basic / intermediate / advanced) ---
  {
    id: 103,
    question:
      'What is the first thing you should do before approaching a casualty who has received an electric shock from a mains appliance?',
    options: [
      'Pull the casualty away from the appliance by their clothing',
      'Begin CPR straight away, as time is critical after an electric shock',
      'Check the casualty for entry and exit burns before doing anything else',
      'Switch off the power supply at the mains or isolate the power source before approaching',
    ],
    correctAnswer: 3,
    explanation:
      'Scene safety is the absolute priority with any electrical incident. Before touching the casualty, you must isolate the power source by switching off the mains supply or unplugging the appliance. Touching the casualty while they are still in contact with a live source could electrocute the rescuer as well.',
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Electric Shock Scene Safety',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 104,
    question:
      'At a construction site, a worker has come into contact with a high-voltage overhead power line (>1,000V). What is the correct first aid response?',
    options: [
      'Stay at least 25 metres away, call 999, and wait for the distribution network operator (DNO) to isolate the supply',
      'Use a dry wooden broom handle to push the casualty clear of the line',
      'Switch off the supply at the nearest mains isolator before approaching',
      'Approach quickly and drag the casualty clear by their dry clothing',
    ],
    correctAnswer: 0,
    explanation:
      'High-voltage electricity (over 1,000V) can arc through the air and across the ground. You must stay at least 25 metres away and call 999 immediately. Only the distribution network operator (DNO) can safely isolate high-voltage supplies. Approaching the casualty before isolation risks fatal electrocution.',
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'High Voltage Procedures',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 105,
    question:
      'After safely isolating a low-voltage electrical source, you find the casualty is unresponsive and not breathing normally. What should you do?',
    options: [
      'Check for burns only, as the heart is unlikely to be affected at low voltage',
      'Begin CPR immediately and call 999 — electric shock can cause cardiac arrest',
      'Wait 5 minutes to see if they recover on their own',
      'Place them in the recovery position and monitor',
    ],
    correctAnswer: 1,
    explanation:
      "Even low-voltage electric shock can cause cardiac arrest by disrupting the heart's electrical rhythm. If the casualty is unresponsive and not breathing normally after the source has been isolated, begin CPR immediately and call 999. Time is critical — early CPR and defibrillation significantly improve survival.",
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Low Voltage Procedures',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 106,
    question:
      'Electrical burns often have a characteristic pattern. Which of the following best describes this?',
    options: [
      'A single large, irregular burn over the area of skin contact',
      'Widespread superficial reddening with no deep tissue involvement',
      'Entry and exit wounds — a burn where the current entered the body and another where it left',
      'Blistering confined to the palms of both hands only',
    ],
    correctAnswer: 2,
    explanation:
      "Electrical burns typically produce an entry wound (where the current entered the body) and an exit wound (where it left to reach earth). The external burns may appear small, but internal tissue damage along the current's path can be severe. All electrical burn casualties should be assessed at hospital even if external injuries appear minor.",
    section: 'Module 4',
    difficulty: 'advanced' as const,
    topic: 'Electrical Burns',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 107,
    question:
      'Why must a first aider never use water to separate a casualty from a live electrical source?',
    options: [
      'Water cools the casualty too quickly and may trigger hypothermia',
      'Splashing water can wash away the entry and exit burn wounds',
      'Water makes the casualty harder to grip and pull clear of the source',
      'Water is an excellent conductor of electricity and could electrocute the rescuer',
    ],
    correctAnswer: 3,
    explanation:
      'Water conducts electricity very effectively. Using water near a live electrical source creates a pathway for the current to flow through the water and into the rescuer, potentially causing fatal electrocution. Always isolate the power supply first. If that is not possible, use a dry, non-conductive object to push the source away.',
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Electric Shock Scene Safety',
    category: 'Medical Emergencies' as const,
  },
  // --- HEAT EXHAUSTION & HEAT STROKE (intermediate / advanced) ---
  {
    id: 108,
    question:
      'Which of the following is a key sign that distinguishes heat stroke from heat exhaustion?',
    options: [
      "The casualty's skin is hot and dry, and their body temperature is above 40°C",
      "The casualty is sweating heavily with cool, pale, clammy skin",
      "The casualty complains of muscle cramps in the legs and abdomen",
      "The casualty feels dizzy and faint but quickly recovers when lying down",
    ],
    correctAnswer: 0,
    explanation:
      "Heat stroke is characterised by a core body temperature above 40°C and hot, dry skin because the body's cooling mechanism has failed. In heat exhaustion, the casualty still sweats and their temperature is usually below 40°C. Heat stroke is a life-threatening emergency requiring immediate cooling and a 999 call.",
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Heat Exhaustion vs Heat Stroke',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 109,
    question: 'How should you treat a casualty suffering from heat exhaustion?',
    options: [
      'Wrap them in warm blankets and give them a hot, sweet drink',
      'Move them to a cool place, lay them down, raise their legs, and give them plenty of water to sip',
      'Immerse them in an ice bath as quickly as possible to cool them',
      'Encourage them to keep working gently to maintain their circulation',
    ],
    correctAnswer: 1,
    explanation:
      'Heat exhaustion is treated by moving the casualty to a cool environment, laying them down with legs raised to improve blood flow to vital organs, removing excess clothing, and giving them water to sip. Cool packs around the neck, armpits, and groin can also help. If symptoms worsen or do not improve within 30 minutes, call 999.',
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Heat Exhaustion Treatment',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 110,
    question:
      'A worker in a hot environment collapses. Their skin is hot and dry, they are confused, and their temperature reads 41°C. What condition is this and what is the priority treatment?',
    options: [
      'Heat exhaustion — give sips of water and rest in shade',
      'Dehydration — encourage them to drink a litre of water quickly',
      'Heat stroke — call 999 immediately and begin rapid cooling by any means available',
      'Sunburn — apply after-sun cream and move to shade',
    ],
    correctAnswer: 2,
    explanation:
      'Hot, dry skin, confusion, and a temperature above 40°C indicate heat stroke, which is a medical emergency. Call 999 immediately. Begin rapid cooling: remove clothing, wrap in a cold wet sheet, fan them, and apply cold packs to the neck, armpits, and groin. Do not immerse in ice water as this can cause dangerous shivering.',
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Heat Stroke Emergency',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 111,
    question:
      'Which of the following correctly lists the progression from mild to life-threatening heat-related illness?',
    options: [
      'Heat stroke → heat exhaustion → heat cramps',
      'Heat cramps → heat stroke → heat exhaustion',
      'Heat exhaustion → heat cramps → heat stroke',
      'Heat cramps → heat exhaustion → heat stroke',
    ],
    correctAnswer: 3,
    explanation:
      'Heat-related illness progresses from heat cramps (muscle cramps due to salt loss) to heat exhaustion (heavy sweating, weakness, nausea) to heat stroke (body temperature above 40°C, dry skin, confusion, organ failure). Recognising and treating heat exhaustion early can prevent progression to life-threatening heat stroke.',
    section: 'Module 4',
    difficulty: 'advanced' as const,
    topic: 'Heat Exhaustion vs Heat Stroke',
    category: 'Medical Emergencies' as const,
  },
  // --- HYPOTHERMIA (basic / intermediate / advanced) ---
  {
    id: 112,
    question: 'At what core body temperature is a casualty considered to be hypothermic?',
    options: [
      'Below 35°C',
      'Below 36°C',
      'Below 37°C',
      'Below 33°C',
    ],
    correctAnswer: 0,
    explanation:
      'Hypothermia is defined as a core body temperature below 35°C. Normal body temperature is approximately 37°C. Mild hypothermia (32–35°C) causes shivering and confusion, while severe hypothermia (below 32°C) can cause loss of consciousness, dangerous heart rhythms, and cardiac arrest.',
    section: 'Module 4',
    difficulty: 'basic' as const,
    topic: 'Hypothermia Recognition',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 113,
    question: 'Which of the following is the correct method for rewarming a hypothermic casualty?',
    options: [
      'Place them in a hot bath to raise their core temperature quickly',
      'Rewarm them gradually using blankets, dry clothing, and warm (not hot) drinks if conscious',
      'Rub their arms and legs vigorously to restore circulation',
      'Apply hot water bottles directly against their bare skin',
    ],
    correctAnswer: 1,
    explanation:
      'Hypothermic casualties must be rewarmed gradually. Use blankets, dry clothing, and warm (not hot) drinks if conscious. Rapid rewarming with direct heat (hot baths, hot water bottles against skin) can cause a dangerous rush of cold blood from the extremities to the heart, potentially triggering cardiac arrest.',
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Hypothermia Treatment',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 114,
    question: 'Why should you NOT give alcohol to a hypothermic casualty?',
    options: [
      'Alcohol causes blood vessels to constrict, trapping cold blood in the limbs',
      'Alcohol increases shivering, which dangerously raises oxygen demand',
      'Alcohol causes blood vessels to dilate, increasing heat loss from the skin and potentially lowering core temperature further',
      'Alcohol thickens the blood, making the heart work harder to pump it',
    ],
    correctAnswer: 2,
    explanation:
      'Alcohol causes peripheral vasodilation — the blood vessels near the skin surface widen. This increases heat loss from the body and can cause a further drop in core temperature. Although the casualty may feel temporarily warmer, they are actually losing heat faster. Alcohol also impairs judgement and the shivering response.',
    section: 'Module 4',
    difficulty: 'advanced' as const,
    topic: 'Hypothermia Treatment',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 115,
    question:
      'Why must direct heat sources such as hot water bottles or heaters NOT be placed directly against the skin of a hypothermic casualty?',
    options: [
      'The casualty may have reduced sensation and suffer burns, and rapid peripheral rewarming can send cold blood to the heart, causing afterdrop',
      'Direct heat causes the skin to sweat, increasing evaporative heat loss',
      'Direct heat raises the core temperature too slowly to be of any benefit',
      'Direct heat triggers uncontrollable shivering that exhausts the casualty',
    ],
    correctAnswer: 0,
    explanation:
      "There are two reasons. A hypothermic casualty may have reduced sensation and cannot feel burns from direct heat. Additionally, rapid peripheral rewarming causes vasodilation, which floods the core with cold blood from the extremities. This sudden drop in core temperature — called 'afterdrop' — can trigger fatal cardiac arrhythmias.",
    section: 'Module 4',
    difficulty: 'advanced' as const,
    topic: 'Hypothermia Treatment',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 116,
    question:
      'A construction worker is found outdoors in freezing conditions. They are conscious but drowsy, shivering uncontrollably, and their speech is slurred. What is your priority action?',
    options: [
      'Remove them from the cold environment, remove any wet clothing, wrap them in dry blankets, call 999, and monitor their condition',
      'Give them a hot bath to raise their core temperature as quickly as possible',
      'Rub their arms and legs briskly to stimulate blood flow to the extremities',
      'Give them a strong alcoholic drink to help them feel warmer',
    ],
    correctAnswer: 0,
    explanation:
      'The priority is to prevent further heat loss by removing the casualty from the cold, replacing wet clothing with dry layers, and insulating them with blankets. Call 999 as hypothermia can deteriorate rapidly. Do not rub extremities or use direct heat. Monitor their breathing and consciousness level while awaiting emergency services.',
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Hypothermia Treatment',
    category: 'Medical Emergencies' as const,
  },
  // --- FROSTBITE (intermediate / advanced) ---
  {
    id: 117,
    question: 'What are the early signs of frostbite?',
    options: [
      'Hot, red, swollen skin with a burning sensation in the affected area',
      'Pins and needles, numbness, and hard, pale or white skin in the affected area',
      'Heavy sweating and itching across the fingers and toes',
      'Deep bruising and bleeding under the nails of the affected digits',
    ],
    correctAnswer: 1,
    explanation:
      'Early frostbite presents as pins and needles progressing to numbness, with the skin becoming hard, pale, or white. The extremities — fingers, toes, ears, and nose — are most commonly affected. As frostbite progresses, the skin may become waxy and blisters may form once the tissue starts to thaw.',
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Frostbite Recognition',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 118,
    question: 'Which of the following is the correct first aid for frostbite?',
    options: [
      'Rub the affected area briskly with snow to rewarm it gradually',
      'Hold the affected area close to a radiator or heater until sensation returns',
      'Gently warm the affected area by placing it in warm (not hot) water at around 37–39°C, and do not rub or apply direct heat',
      'Burst any blisters that form and apply antiseptic cream to the area',
    ],
    correctAnswer: 2,
    explanation:
      'Frostbitten tissue should be gently rewarmed by placing it in warm (not hot) water at approximately 37–39°C. Never rub the affected area, apply direct heat, or burst blisters, as damaged tissue is extremely fragile. Rubbing can cause further tissue destruction. The casualty should be taken to hospital for assessment.',
    section: 'Module 4',
    difficulty: 'intermediate' as const,
    topic: 'Frostbite Treatment',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 119,
    question:
      'A colleague working in a cold storage facility has frostbitten fingers. You have rewarmed their hand in warm water, but they now need to walk through the freezing area to reach the first aid room. What is the risk?',
    options: [
      'Walking will improve circulation to the hand and speed up recovery',
      'The rewarmed tissue is now fully healed and at no further risk',
      'Cold air will help to numb the pain in the rewarmed fingers',
      'Refreezing of thawed tissue causes significantly more damage than the original frostbite, so the hand should be insulated and protected from refreezing at all costs',
    ],
    correctAnswer: 3,
    explanation:
      'Refreezing thawed frostbitten tissue causes far more severe and irreversible damage than the original injury. Ice crystals form within the cells and destroy them. If there is any risk of refreezing, it may be better to delay rewarming until the casualty is in a warm environment where refreezing can be prevented.',
    section: 'Module 4',
    difficulty: 'advanced' as const,
    topic: 'Frostbite Treatment',
    category: 'Medical Emergencies' as const,
  },
  {
    id: 120,
    question:
      'A severely hypothermic casualty is found unresponsive and you cannot detect any breathing or pulse. According to first aid guidance, what should you consider before deciding they are dead?',
    options: [
      'A hypothermic casualty is not considered dead until they are warm and dead — begin CPR and call 999, as severe hypothermia can mimic death',
      'The absence of breathing and pulse confirms death, so resuscitation should not be attempted',
      'You should rewarm the casualty fully before deciding whether to start CPR',
      'A casualty this cold cannot be revived, so the priority is to record the time of death',
    ],
    correctAnswer: 0,
    explanation:
      "There is a well-known principle in emergency medicine: 'nobody is dead until they are warm and dead.' Severe hypothermia dramatically slows the body's metabolism and can make vital signs undetectable, but the person may still be resuscitable. Begin CPR, call 999, and continue resuscitation until advanced medical help takes over. Remarkable recoveries from severe hypothermia have been documented.",
    section: 'Module 4',
    difficulty: 'advanced' as const,
    topic: 'Hypothermia Treatment',
    category: 'Medical Emergencies' as const,
  },

  // =======================================================================
  // INJURIES & SPECIFIC CONDITIONS — 40 questions (id 121–160)
  // =======================================================================

  // --- BASIC (16 questions: IDs 121–136) ---
  {
    id: 121,
    question: 'What is the key difference between an open fracture and a closed fracture?',
    options: [
      'An open fracture only occurs in the arms and legs',
      'An open fracture involves a wound where bone may be visible or has pierced the skin',
      'A closed fracture is more serious than an open fracture',
      'An open fracture means the bone is completely shattered',
    ],
    correctAnswer: 1,
    explanation:
      'An open (compound) fracture is one where the skin is broken, and the bone may protrude through the wound or be visible. This carries a significantly higher risk of infection compared to a closed fracture. A closed (simple) fracture is where the skin remains intact over the fracture site.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Open vs Closed Fractures',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 122,
    question: 'Which of the following is NOT a typical sign of a fracture?',
    options: [
      'Deformity at the injury site',
      'Loss of function in the affected limb',
      'A rash spreading outward from the injury',
      'Swelling and bruising',
    ],
    correctAnswer: 2,
    explanation:
      'The signs of a fracture include deformity, swelling, bruising, pain on movement, tenderness, loss of function, and sometimes crepitus (a grating sensation). A rash spreading outward is not associated with a fracture. It may indicate an allergic reaction or infection.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Fracture Recognition',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 123,
    question: 'What is the primary purpose of immobilising a suspected fracture?',
    options: [
      'To diagnose the exact type of fracture',
      'To allow the casualty to continue working',
      'To realign the bone ends before the ambulance arrives',
      'To prevent further injury, reduce pain, and minimise blood loss',
    ],
    correctAnswer: 3,
    explanation:
      'Immobilisation prevents further damage to surrounding tissues, nerves, and blood vessels. It also reduces pain and helps control internal bleeding at the fracture site. First aiders should never attempt to realign or reset a broken bone.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Immobilisation Principles',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 124,
    question: 'When should an elevated sling be used instead of a standard arm sling?',
    options: [
      'When the casualty has an injury to the hand, fingers, or forearm where elevation is needed to reduce swelling or control bleeding',
      'When the casualty has a suspected fracture of the upper arm or elbow',
      'When the casualty has injured their shoulder and cannot bend their elbow',
      'When the casualty has a suspected spinal injury and must be kept still',
    ],
    correctAnswer: 0,
    explanation:
      'An elevated sling supports the hand and forearm in a raised position across the chest, which helps reduce swelling and control bleeding. A standard broad arm sling is used for injuries to the upper arm, elbow, or to support a sling for rib injuries. Choosing the correct sling depends on the injury location and the need for elevation.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Slings',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 125,
    question:
      'A colleague twists their ankle on site and it rapidly swells. What type of soft tissue injury is this most likely to be?',
    options: ['A strain', 'A sprain', 'A dislocation', 'An open fracture'],
    correctAnswer: 1,
    explanation:
      'A sprain is an injury to a ligament caused by the joint being forced beyond its normal range of movement. Twisted ankles are one of the most common sprains. A strain, by contrast, involves damage to a muscle or tendon, often from overstretching or overuse.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Sprains and Strains',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 126,
    question: 'What should a first aider do if they suspect a casualty has a dislocated joint?',
    options: [
      'Attempt to push the joint back into its normal position',
      'Apply firm pressure to the joint to reduce swelling',
      'Immobilise the joint in the position found and arrange transport to hospital',
      'Ask the casualty to move the joint to see how far it can go',
    ],
    correctAnswer: 2,
    explanation:
      'A first aider must never attempt to relocate a dislocated joint, as this can cause further damage to blood vessels, nerves, and surrounding tissues. The correct approach is to immobilise the joint in the position found, support it with padding, and arrange urgent transport to hospital. Only trained medical professionals should attempt reduction.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Dislocations',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 127,
    question:
      'Which of the following is a red flag symptom following a head injury that requires urgent medical attention?',
    options: [
      'A small bump on the forehead',
      'Mild headache that resolves within 10 minutes',
      'A superficial graze on the scalp',
      'Clear fluid leaking from the ear or nose',
    ],
    correctAnswer: 3,
    explanation:
      'Clear, watery fluid leaking from the ear or nose after a head injury may be cerebrospinal fluid (CSF), which indicates a possible skull fracture. This is a serious red flag that requires immediate emergency medical attention. Other red flags include loss of consciousness, repeated vomiting, worsening headache, seizures, and amnesia.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Head Injury Red Flags',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 128,
    question:
      'A worker gets a small piece of grit in their eye. What is the correct first aid approach?',
    options: [
      'Irrigate the eye with clean water or sterile saline, flowing from the inner corner outward',
      'Use a cotton bud to remove the grit directly from the eyeball',
      'Ask the casualty to rub their eye vigorously to dislodge the object',
      'Cover both eyes with tight bandages and wait for medical help',
    ],
    correctAnswer: 0,
    explanation:
      'For a loose foreign object in the eye, gentle irrigation with clean water or sterile saline is the correct approach, flowing from the inner corner (nearest the nose) outward to avoid washing debris into the other eye. Rubbing the eye may cause further damage. Direct removal from the surface of the eyeball should not be attempted by a first aider.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Eye Injuries',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 129,
    question:
      'If a casualty has been poisoned by swallowing a harmful substance, should the first aider induce vomiting?',
    options: [
      'Yes, but only if the casualty is conscious',
      'No, inducing vomiting could cause further harm',
      'Yes, but only if the substance was swallowed less than 5 minutes ago',
      'Yes, always induce vomiting to remove the poison quickly',
    ],
    correctAnswer: 1,
    explanation:
      'A first aider should never induce vomiting in a poisoning case. Vomiting can cause corrosive substances to burn the oesophagus and airway a second time, and may lead to aspiration into the lungs. The correct action is to call 999, try to identify the substance, note the time of ingestion, and follow the guidance of the emergency services or Poison Information Service.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Poisoning',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 130,
    question:
      'A colleague has inhaled fumes from a chemical spill in a poorly ventilated area. What is the first priority?',
    options: [
      'Enter the area immediately and carry the casualty out as fast as possible',
      'Give the casualty water to drink to dilute the inhaled chemical',
      'Move the casualty into fresh air, ensuring it is safe for you to approach',
      'Lay the casualty down where they are and begin rescue breaths',
    ],
    correctAnswer: 2,
    explanation:
      'The priority for inhalation injuries is to move the casualty into fresh air, but only if it is safe for the rescuer to do so. Entering a contaminated atmosphere without appropriate protection can result in the rescuer also becoming a casualty. Once in fresh air, monitor breathing, call 999, and be prepared to perform CPR if the casualty stops breathing.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Inhalation',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 131,
    question: 'What does the acronym COSHH stand for?',
    options: [
      'Control of Substances Harmful to Health',
      'Caution of Spillages Hazardous to Health',
      'Care of Substances Hazardous to Humans',
      'Control of Substances Hazardous to Health',
    ],
    correctAnswer: 3,
    explanation:
      'COSHH stands for the Control of Substances Hazardous to Health Regulations 2002. These regulations require employers to assess the risks from hazardous substances in the workplace and implement appropriate control measures. COSHH covers chemicals, fumes, dust, biological agents, and other substances that can cause harm.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'COSHH Regulations 2002',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 132,
    question: 'What is a concussion?',
    options: [
      'A temporary disturbance in brain function caused by a blow or jolt to the head',
      'A fracture of the skull that always causes bleeding from the ears',
      'A permanent loss of brain function following a severe head injury',
      'A bruise to the scalp that heals without any effect on the brain',
    ],
    correctAnswer: 0,
    explanation:
      'A concussion is a temporary disturbance in brain function that occurs following a blow, bump, or jolt to the head. Symptoms may include headache, confusion, dizziness, nausea, and short-term memory loss. While most concussions resolve on their own, all head injuries should be assessed by a medical professional to rule out more serious damage.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Concussion',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 133,
    question:
      'Why is it important for first aiders to have access to debriefing after a traumatic incident?',
    options: [
      'To ensure they complete the correct paperwork',
      'To help them process the emotional impact and maintain their own wellbeing',
      'To allow managers to assess their performance',
      'To decide whether the casualty should return to work',
    ],
    correctAnswer: 1,
    explanation:
      'First aiders may experience significant emotional and psychological stress after dealing with traumatic incidents, including anxiety, flashbacks, and difficulty sleeping. Debriefing provides an opportunity to process the event in a supportive environment. Employers have a duty to support the wellbeing of first aiders just as they would any other employee exposed to a distressing event.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'First Aider Wellbeing and Debriefing',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 134,
    question:
      'Which section of a Safety Data Sheet (SDS) contains first aid measures for a hazardous substance?',
    options: [
      'Section 2: Hazard Identification',
      'Section 7: Handling and Storage',
      'Section 4: First Aid Measures',
      'Section 11: Toxicological Information',
    ],
    correctAnswer: 2,
    explanation:
      'Section 4 of a Safety Data Sheet is specifically dedicated to First Aid Measures. It provides guidance on what to do in the event of inhalation, skin contact, eye contact, or ingestion of the substance. First aiders should be familiar with how to locate and read SDSs for substances used in their workplace.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Safety Data Sheets',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 135,
    question:
      'When communicating with a casualty during a medical emergency, which approach is most appropriate?',
    options: [
      'Speak quickly so you can gather information as fast as possible',
      'Use technical medical terminology so the casualty understands the seriousness',
      'Avoid speaking to the casualty to reduce their stress levels',
      'Speak calmly and clearly, using simple language and maintaining eye contact',
    ],
    correctAnswer: 3,
    explanation:
      'Calm, clear communication using simple language helps reassure the casualty and reduces panic. Maintaining eye contact demonstrates care and helps build trust. Speaking quickly or using jargon can increase anxiety, while not speaking at all can make the casualty feel isolated and more frightened.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Communication Skills in Emergencies',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 136,
    question:
      'A worker has symptoms of carbon monoxide poisoning including headache, dizziness, and nausea. What should the first aider do first?',
    options: [
      'Move the casualty into fresh air immediately, ensuring your own safety, and call 999',
      'Open the nearest window and keep the casualty where they are',
      'Give the casualty a sugary drink to counteract the dizziness',
      'Lay the casualty down and raise their legs to treat for shock',
    ],
    correctAnswer: 0,
    explanation:
      'Carbon monoxide is an odourless, colourless gas that can be fatal. The priority is to remove the casualty from the source of carbon monoxide into fresh air, while ensuring you do not become a casualty yourself. Call 999 immediately, as the casualty may need urgent hospital treatment including oxygen therapy. Never remain in a potentially contaminated environment.',
    section: 'Module 5',
    difficulty: 'basic' as const,
    topic: 'Carbon Monoxide Poisoning',
    category: 'Injuries & Specific Conditions' as const,
  },

  // --- INTERMEDIATE (16 questions: IDs 137–152) ---
  {
    id: 137,
    question:
      'A construction worker falls from a ladder and is lying on the ground complaining of severe pain in their lower leg. You can see an obvious bend in the shin and the skin is intact. How should you manage this injury?',
    options: [
      'Gently straighten the leg to realign the bone before splinting it',
      'Immobilise the leg in the position found using padding and bandages, support the joints above and below the fracture, and call 999',
      'Help the casualty stand and walk to test whether the leg is broken',
      'Elevate the leg above heart level and apply a firm pressure bandage',
    ],
    correctAnswer: 1,
    explanation:
      'A closed fracture with visible deformity should be immobilised in the position found. You should support the joints above and below the suspected fracture with padding, rolled blankets, or splints. Never attempt to straighten or realign a fracture as this can damage blood vessels and nerves. Call 999 for emergency help.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Immobilisation Principles',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 138,
    question:
      'You are treating a casualty with a suspected broken collarbone. Which sling is most appropriate?',
    options: [
      'An elevated sling holding the hand high against the opposite shoulder',
      'A tightly bound bandage strapping the arm flat against the chest',
      'A broad arm sling supporting the arm on the injured side, with the hand slightly higher than the elbow',
      'No sling — the arm should hang freely to keep the collarbone aligned',
    ],
    correctAnswer: 2,
    explanation:
      'A broad arm sling is the correct choice for a suspected fractured clavicle (collarbone). It supports the weight of the arm on the injured side and reduces movement at the fracture site. The hand should sit slightly higher than the elbow to aid comfort. An elevated sling is reserved for injuries to the hand or forearm where elevation is needed.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Slings',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 139,
    question: 'What is the difference between a sprain and a strain?',
    options: [
      'A sprain only occurs in the ankle; a strain only occurs in the back',
      'A sprain is more painful than a strain',
      'A strain always involves a fracture; a sprain does not',
      'A sprain affects ligaments; a strain affects muscles or tendons',
    ],
    correctAnswer: 3,
    explanation:
      'A sprain is a stretching or tearing of a ligament (the tissue connecting bone to bone at a joint), while a strain is a stretching or tearing of a muscle or tendon (the tissue connecting muscle to bone). Both can cause pain, swelling, and reduced function, but they affect different structures. Treatment for both includes rest, ice, comfortable support, and elevation (RICE).',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Sprains and Strains',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 140,
    question:
      'A casualty who banged their head 30 minutes ago was initially alert but is now becoming increasingly confused and drowsy. What does this pattern suggest?',
    options: [
      'A possible compression of the brain, which is a life-threatening emergency',
      'A minor concussion that is resolving normally',
      'Normal tiredness following a stressful event',
      'A psychological reaction that does not need medical attention',
    ],
    correctAnswer: 0,
    explanation:
      "Deteriorating consciousness after a head injury (a 'lucid interval' followed by decline) is a hallmark sign of cerebral compression, often caused by bleeding inside the skull. This is a life-threatening emergency requiring immediate hospital treatment. Call 999 without delay, monitor the casualty's airway and breathing, and be prepared to place them in the recovery position if they become unresponsive.",
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Head Injury Red Flags',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 141,
    question:
      'You suspect a casualty may have a spinal injury after a fall. They are conscious and breathing. What is the correct approach?',
    options: [
      'Help them sit up slowly to assess whether they can feel their legs',
      'Keep them still, apply manual inline stabilisation to the head and neck, and call 999',
      'Roll them onto their side into the recovery position immediately',
      'Place a pillow under their head for comfort and wait',
    ],
    correctAnswer: 1,
    explanation:
      'If a spinal injury is suspected and the casualty is conscious and breathing, do not move them. Apply manual inline stabilisation by holding the head still in the position found, keeping the head, neck, and spine aligned. Call 999 for specialist help. Only move a casualty with a suspected spinal injury if their airway is compromised or they are in immediate danger.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Spinal Injury',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 142,
    question:
      "A chemical has been splashed into a colleague's eyes. How long should you irrigate the affected eye(s)?",
    options: [
      'For about 2 minutes, then cover the eye with a sterile pad',
      'Only until the casualty says the pain has stopped',
      'At least 20 minutes continuously, ensuring water flows away from the unaffected eye',
      'For 5 minutes, then apply a neutralising agent to the eye',
    ],
    correctAnswer: 2,
    explanation:
      'Chemical splashes to the eye require immediate and prolonged irrigation with clean water for at least 20 minutes. The water should flow from the inner corner of the affected eye outward to prevent contamination of the unaffected eye. Continue irrigation even if the casualty says the pain has stopped, as chemical damage can continue after the pain subsides.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Eye Injuries',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 143,
    question: "An object is embedded in a casualty's eye. What is the correct first aid treatment?",
    options: [
      'Gently pull the object out and irrigate the eye with clean water',
      'Ask the casualty to blink rapidly to dislodge the object naturally',
      'Cover only the injured eye and tell the casualty to keep it closed',
      'Do not attempt to remove the object; pad around it, cover both eyes, and arrange urgent hospital transfer',
    ],
    correctAnswer: 3,
    explanation:
      'An embedded object in the eye must never be removed by a first aider. Build padding around the object to prevent movement, then cover both eyes with dressings. Both eyes are covered because the eyes move together (consensual eye movement), and covering both reduces movement of the injured eye. Call 999 or arrange urgent hospital transfer.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Eye Injuries',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 144,
    question:
      'Under the COSHH Regulations 2002, what must an employer do before using a hazardous substance in the workplace?',
    options: [
      'Carry out a risk assessment and implement appropriate control measures',
      'Simply provide gloves to all employees',
      'Write the name of the chemical on a whiteboard in the staff room',
      'Ensure that at least one first aider has handled the substance before',
    ],
    correctAnswer: 0,
    explanation:
      'The COSHH Regulations 2002 require employers to carry out a thorough risk assessment for all hazardous substances used in the workplace and implement appropriate control measures to prevent or adequately control exposure. This includes considering substitution with less hazardous alternatives, engineering controls, and provision of appropriate PPE as a last resort.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'COSHH Regulations 2002',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 145,
    question:
      'A casualty has swallowed a corrosive cleaning product. They are conscious and complaining of burning in their mouth and throat. What should you do?',
    options: [
      'Make the casualty drink plenty of water to dilute the product',
      'Do not induce vomiting; call 999, keep the casualty calm, and try to identify the product',
      'Encourage the casualty to make themselves sick to bring the product back up',
      'Give the casualty milk to neutralise the chemical and ease the burning',
    ],
    correctAnswer: 1,
    explanation:
      'Never induce vomiting after ingestion of a corrosive substance, as this will cause further chemical burns to the oesophagus, throat, and mouth on the way back up. Call 999 immediately, identify the substance if possible, and bring the container or Safety Data Sheet to the hospital. Do not give anything by mouth unless specifically advised by the emergency services.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Poisoning',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 146,
    question:
      'When applying a splint to a suspected fracture of the lower leg, which joints should the splint immobilise?',
    options: [
      'The ankle only, as it is closest to the lower leg fracture',
      'The hip and the knee, to control the whole limb from above',
      'The knee and the ankle (the joints above and below the fracture)',
      'No joints — only the fracture site itself should be supported',
    ],
    correctAnswer: 2,
    explanation:
      'When splinting a fracture, the splint must immobilise the joint above and the joint below the fracture site to prevent movement at the break. For a lower leg fracture, this means the knee and the ankle must both be immobilised. Immobilising only one joint would still allow movement that could worsen the injury.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Splinting',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 147,
    question:
      'A worker reports feeling anxious, shaky, and unable to concentrate after witnessing a serious accident on site. What should you do?',
    options: [
      'Tell them to pull themselves together and get back to work',
      'Send them home immediately without any follow-up or support',
      'Ignore the reaction, as it will pass on its own within the hour',
      'Remove them from the scene, listen without judgement, and ensure they are referred for appropriate support',
    ],
    correctAnswer: 3,
    explanation:
      'Psychological responses to witnessing traumatic events are normal and should be taken seriously. The first aider should remove the individual from the scene, provide a calm and safe space, listen without judgement, and ensure they are referred for appropriate support such as occupational health or an employee assistance programme. Mental health is as important as physical health on site.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Mental Health Crises on Site',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 148,
    question: 'Why should both eyes be covered when an object is embedded in one eye?',
    options: [
      'Because both eyes move together (consensual movement), so covering both reduces movement of the injured eye',
      'Because covering both eyes blocks out light, which reduces pain in the injury',
      'Because the uninjured eye will become infected if left uncovered',
      'Because covering both eyes prevents the casualty from seeing the injury and panicking',
    ],
    correctAnswer: 0,
    explanation:
      'The eyes move in unison — this is called consensual eye movement. If only the injured eye is covered, the uncovered eye will continue to move as the casualty looks around, and the injured eye will move with it, potentially worsening the damage. Covering both eyes minimises this movement and protects the injury.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Eye Injuries',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 149,
    question:
      'Which of the following symptoms is most characteristic of carbon monoxide poisoning?',
    options: [
      'A bluish tinge to the lips and fingertips with rapid, shallow breathing',
      'Cherry-red colouration of the skin, along with headache and confusion',
      'Profuse sweating with cold, clammy, pale skin',
      'A widespread itchy rash spreading from the chest outwards',
    ],
    correctAnswer: 1,
    explanation:
      'Carbon monoxide binds to haemoglobin more readily than oxygen, forming carboxyhaemoglobin which gives the skin a characteristic cherry-red or pink colour. Other symptoms include headache, nausea, confusion, dizziness, and eventually loss of consciousness. However, the cherry-red colour may not always be apparent, particularly in darker-skinned individuals, so other symptoms must also be considered.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Carbon Monoxide Poisoning',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 150,
    question:
      'A first aider notices a casualty with a suspected arm fracture also has numbness and tingling in their fingers. What does this indicate?',
    options: [
      'The tingling is a normal part of healing and can be safely ignored',
      'The casualty is anxious and the numbness is purely psychological',
      'The fracture may be compressing or damaging nerves or blood vessels — this is an urgent sign',
      'The numbness confirms the bone is only bruised rather than broken',
    ],
    correctAnswer: 2,
    explanation:
      'Numbness, tingling, or loss of sensation beyond a fracture site suggests that nerves or blood vessels may be compressed or damaged. This is a neurovascular compromise and is an urgent finding that must be communicated to the ambulance service. The first aider should also check circulation beyond the injury by assessing colour, warmth, and pulse if accessible.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Fracture Recognition',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 151,
    question:
      'When communicating with a casualty who is disoriented after a head injury, which technique is most helpful?',
    options: [
      'Repeat the same question loudly until they answer correctly',
      'Ask them complex questions to test their brain function',
      'Provide a detailed explanation of what happened to help them remember',
      'Ask short, simple questions; repeat information calmly; and avoid overwhelming them with choices',
    ],
    correctAnswer: 3,
    explanation:
      'A casualty who is disoriented needs calm, simple, and repeated communication. Short questions and clear instructions reduce cognitive load and help them feel safe. Avoid bombarding them with information or testing them, as this can increase confusion and anxiety. Reassurance and patience are key communication skills in these situations.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Communication Skills in Emergencies',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 152,
    question:
      'Under what circumstances should a first aider move a casualty with a suspected spinal injury?',
    options: [
      "Only if the casualty's airway is compromised or they are in immediate life-threatening danger",
      'If the casualty asks to be moved to a more comfortable position',
      'If the ambulance is expected to take longer than 15 minutes',
      'A suspected spinal injury casualty should never be moved under any circumstances',
    ],
    correctAnswer: 0,
    explanation:
      'The general rule is to keep a suspected spinal injury casualty still. However, if the airway is at risk (for example, the casualty is vomiting and unable to clear it, or they are in a burning building), the risk of not moving them outweighs the risk of movement. In such cases, use a log roll technique with multiple helpers to maintain spinal alignment as much as possible.',
    section: 'Module 5',
    difficulty: 'intermediate' as const,
    topic: 'Spinal Injury',
    category: 'Injuries & Specific Conditions' as const,
  },

  // --- ADVANCED (8 questions: IDs 153–160) ---
  {
    id: 153,
    question:
      'A casualty has an open fracture of the forearm with a bone end protruding through the skin. The wound is bleeding moderately. How should you manage this injury?',
    options: [
      'Push the protruding bone back beneath the skin and bandage tightly over it',
      'Cover the wound and bone end with a sterile dressing without applying direct pressure over the protruding bone, build up padding around it, immobilise the limb, and call 999',
      'Apply firm direct pressure over the protruding bone to stop the bleeding',
      'Pull the forearm straight to realign the bone before dressing the wound',
    ],
    correctAnswer: 1,
    explanation:
      'An open fracture with a protruding bone requires careful management. Never push a protruding bone back in, as this introduces infection and can cause further damage. Cover the wound with a sterile dressing, build up padding around the bone to protect it, control bleeding with indirect pressure if needed, immobilise the limb, and call 999. This injury carries a high risk of infection and blood loss.',
    section: 'Module 5',
    difficulty: 'advanced' as const,
    topic: 'Open vs Closed Fractures',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 154,
    question:
      'A casualty fell from height and is unresponsive. You suspect a spinal injury but their airway is obstructed by vomit. What is the correct sequence of actions?',
    options: [
      'Leave the casualty supine and untouched to protect the spine, and wait for the ambulance',
      'Sit the casualty fully upright to let the vomit drain out of the mouth',
      'Perform a jaw thrust without head tilt to open the airway; if the airway cannot be cleared, log roll the casualty into the recovery position with manual inline stabilisation, protecting the cervical spine',
      'Perform a standard head-tilt chin-lift and begin chest compressions immediately',
    ],
    correctAnswer: 2,
    explanation:
      'Airway takes priority over spinal injury management. First, attempt a jaw thrust (without tilting the head) to open the airway. If the airway remains compromised by vomit and cannot be cleared with the casualty supine, you must log roll them into the recovery position while maintaining manual inline stabilisation of the cervical spine. Multiple rescuers should assist to keep the head, neck, and spine aligned during the roll.',
    section: 'Module 5',
    difficulty: 'advanced' as const,
    topic: 'Spinal Injury',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 155,
    question:
      "A colleague working in a confined space is found unresponsive. Other workers report a 'rotten eggs' smell. A carbon monoxide detector has not alarmed. What should you suspect and how should you respond?",
    options: [
      'Suspect carbon monoxide despite the silent detector; enter and ventilate the space',
      'Hold your breath, enter quickly, and drag the casualty out before the gas affects you',
      'Assume the smell is harmless drains; enter and check the casualty for injuries',
      'Suspect hydrogen sulphide (H2S) exposure; do NOT enter the confined space without appropriate breathing apparatus; call 999 and the site confined space rescue team',
    ],
    correctAnswer: 3,
    explanation:
      "A 'rotten eggs' smell in a confined space strongly suggests hydrogen sulphide (H2S), which is extremely toxic and can cause rapid unconsciousness and death. Carbon monoxide is odourless, so the CO detector not alarming is consistent with H2S rather than CO. Never enter a confined space without appropriate respiratory protection and a rescue plan. Call 999 and activate the site's confined space rescue procedures immediately.",
    section: 'Module 5',
    difficulty: 'advanced' as const,
    topic: 'Inhalation',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 156,
    question:
      'During a site incident, a first aider is managing a casualty with a head injury who suddenly develops unequal pupils (one dilated, one normal), increasing drowsiness, and weakness on one side of the body. What is the most likely cause and correct action?',
    options: [
      'Raised intracranial pressure from a developing intracranial haemorrhage — call 999 immediately, maintain the airway, and monitor for deterioration',
      'A simple concussion that will resolve with rest — let the casualty sleep it off',
      'A panic attack triggered by the head injury — reassure them and monitor their breathing',
      'A stroke unrelated to the injury — give aspirin and sit them upright',
    ],
    correctAnswer: 0,
    explanation:
      "Unequal pupils (anisocoria), increasing drowsiness, and unilateral weakness following a head injury are classic signs of rising intracranial pressure, likely from an extradural or subdural haemorrhage. This is a neurosurgical emergency. Call 999 immediately, monitor and maintain the airway, and be prepared to commence CPR if the casualty deteriorates. Do not allow a head-injured casualty with these symptoms to 'sleep it off'.",
    section: 'Module 5',
    difficulty: 'advanced' as const,
    topic: 'Head Injury Red Flags',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 157,
    question:
      'A worker sustains a high-energy impact to their pelvis after being struck by a reversing vehicle. They are conscious but in severe pain and appear pale and clammy. Why is this injury particularly dangerous, and what is the priority?',
    options: [
      'The pelvis is mostly bone, so a fracture there is rarely serious — help the casualty stand and walk it off',
      'The pelvis contains major blood vessels; a pelvic fracture can cause massive internal haemorrhage — call 999 immediately, keep the casualty still, treat for shock, and do not attempt to bind the pelvis unless trained',
      'The danger is purely the pain; give pain relief and roll the casualty onto their side',
      'The risk is a damaged spine; log roll the casualty and sit them upright to check sensation',
    ],
    correctAnswer: 1,
    explanation:
      'The pelvis is surrounded by major blood vessels and organs. A fractured pelvis can cause life-threatening internal haemorrhage, with casualties potentially losing several litres of blood into the pelvic cavity. Signs of shock (pale, clammy skin, rapid pulse) in this context suggest significant bleeding. Call 999 immediately, keep the casualty still, cover them to maintain warmth, and monitor their level of consciousness. Pelvic binders should only be applied by those trained in their use.',
    section: 'Module 5',
    difficulty: 'advanced' as const,
    topic: 'Fracture Recognition',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 158,
    question:
      "A Safety Data Sheet (SDS) for a workplace chemical states in Section 4: 'In case of eye contact, irrigate immediately with water for at least 15 minutes. In case of ingestion, do NOT induce vomiting. Seek immediate medical advice.' However, your first aid training says to irrigate eyes for 20 minutes. Which guidance should you follow?",
    options: [
      'Always follow the Safety Data Sheet exactly, as it is the legally binding instruction',
      'Stop irrigating as soon as the casualty reports the pain has eased',
      'Follow whichever provides the greater level of protection — in this case, irrigate for at least 20 minutes as per your training',
      'Split the difference and irrigate for around 17 minutes, then cover the eye',
    ],
    correctAnswer: 2,
    explanation:
      'When there is a conflict between general first aid training and a Safety Data Sheet, the precautionary principle applies: follow whichever guidance provides the greater level of protection for the casualty. In this case, your first aid training recommends 20 minutes of irrigation, which exceeds the SDS recommendation of 15 minutes. Irrigating for longer provides better protection. Always note the SDS guidance and pass it to the ambulance service.',
    section: 'Module 5',
    difficulty: 'advanced' as const,
    topic: 'Safety Data Sheets',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 159,
    question:
      'A first aider has dealt with three serious incidents in one month, including a fatality. They are struggling to sleep, experiencing intrusive thoughts, and avoiding areas of the workplace where the incidents occurred. What should happen?',
    options: [
      'They should be told these feelings are weakness and to carry on as normal',
      'They should be permanently removed from the workplace without support',
      'They should be ignored, as the symptoms will resolve by themselves in time',
      'They should be offered professional psychological support such as trauma counselling, have their first aid duties temporarily reassigned if needed, and be assured that their reaction is a normal response to abnormal events',
    ],
    correctAnswer: 3,
    explanation:
      'The symptoms described — sleep disturbance, intrusive thoughts, and avoidance behaviour — may indicate post-traumatic stress. These are normal reactions to abnormal events. The employer should offer access to professional psychological support such as trauma-focused counselling, consider temporary reassignment of first aid duties, and reassure the individual. Simply telling them to carry on or permanently removing them from the role are both inappropriate responses.',
    section: 'Module 5',
    difficulty: 'advanced' as const,
    topic: 'First Aider Wellbeing and Debriefing',
    category: 'Injuries & Specific Conditions' as const,
  },
  {
    id: 160,
    question:
      'During a multi-casualty incident on a construction site, a first aider is managing a casualty with a suspected spinal injury when a second casualty nearby begins having a seizure. The first aider is the only trained responder. What should they do?',
    options: [
      'Maintain manual inline stabilisation on the spinal casualty, shout for help, and instruct a bystander to clear the area around the seizing casualty to prevent injury; reassess priorities once additional help arrives',
      'Immediately leave the spinal casualty to restrain the seizing casualty and stop their movements',
      'Roll the spinal casualty into the recovery position so both hands are free for the seizing casualty',
      'Wait until the seizure stops on its own before doing anything for either casualty',
    ],
    correctAnswer: 0,
    explanation:
      'In a multi-casualty scenario, a lone first aider must prioritise effectively. The spinal casualty requires continuous manual stabilisation; abandoning this could cause permanent paralysis. For the seizing casualty, the immediate priority is protecting them from injury by clearing the surrounding area — a task that can be delegated to an untrained bystander. Shout for help, guide bystanders, and reassess priorities as additional resources arrive. This demonstrates effective communication and triage under pressure.',
    section: 'Module 5',
    difficulty: 'advanced' as const,
    topic: 'Mental Health Crises on Site',
    category: 'Injuries & Specific Conditions' as const,
  },

  // =======================================================================
  // LEGISLATION, KIT & PROTOCOL — 40 questions (id 161–200)
  // =======================================================================

  // === BASIC (16 questions: IDs 161–176) ===
  {
    id: 161,
    question:
      'Which piece of legislation sets out the legal requirements for first aid provision in the workplace?',
    options: [
      'The Health and Safety at Work Act 1974',
      'The Health and Safety (First-Aid) Regulations 1981',
      'The Management of Health and Safety at Work Regulations 1999',
      'The Regulatory Reform (Fire Safety) Order 2005',
    ],
    correctAnswer: 1,
    explanation:
      'The Health and Safety (First-Aid) Regulations 1981 specifically require employers to provide adequate and appropriate first aid equipment, facilities, and personnel. While the Health and Safety at Work Act 1974 provides the overarching framework, the 1981 Regulations deal exclusively with first aid duties.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'First Aid Regulations 1981',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 162,
    question: 'What is the standard validity period of a First Aid at Work (FAW) certificate?',
    options: [
      '1 year',
      '2 years',
      '3 years',
      '5 years',
    ],
    correctAnswer: 2,
    explanation:
      'A First Aid at Work certificate is valid for three years from the date of issue. Before the certificate expires, the holder must undertake a requalification course to maintain their status. Employers should monitor expiry dates and arrange retraining well in advance.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'FAW Certificate Validity',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 163,
    question: 'What colour combination is used on standard first aid signage in the UK?',
    options: [
      'Green cross on a white background',
      'Red cross on a white background',
      'White cross on a blue background',
      'White cross on a green background',
    ],
    correctAnswer: 3,
    explanation:
      'UK first aid signage uses a white cross on a green background, in accordance with the Health and Safety (Safety Signs and Signals) Regulations 1996. This colour scheme is internationally recognised under ISO 7010. The red cross symbol is protected by the Geneva Conventions and must not be used for general first aid signage.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'First Aid Signage',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 164,
    question: 'What does the abbreviation EFAW stand for?',
    options: [
      'Emergency First Aid at Work',
      'Elementary First Aid at Work',
      'Essential First Aid at Work',
      'Extended First Aid at Work',
    ],
    correctAnswer: 0,
    explanation:
      'EFAW stands for Emergency First Aid at Work. It is a one-day qualification that covers basic life-saving first aid skills. The full FAW course is a three-day qualification that covers a much broader range of conditions and injuries.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'EFAW Certificate',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 165,
    question: 'Who has the legal duty to provide first aid arrangements in the workplace?',
    options: [
      'The local authority',
      'The employer',
      'The Health and Safety Executive',
      'The senior first aider on site',
    ],
    correctAnswer: 1,
    explanation:
      'Under the Health and Safety (First-Aid) Regulations 1981, it is the employer who has the legal duty to provide adequate first aid equipment, facilities, and personnel. This duty cannot be delegated, although the employer may appoint competent persons to carry out first aid responsibilities on their behalf.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'Employer Duties',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 166,
    question: 'What does DR ABC stand for in the primary survey?',
    options: [
      'Danger, Resuscitation, Airway, Blood, Consciousness',
      'Diagnosis, Recovery, Assessment, Breathing, Cardiac',
      'Danger, Response, Airway, Breathing, Circulation',
      'Diagnosis, Response, Airway, Blood, Circulation',
    ],
    correctAnswer: 2,
    explanation:
      'DR ABC stands for Danger, Response, Airway, Breathing, and Circulation. It is the systematic approach used in the primary survey to assess a casualty and identify life-threatening conditions. Each step must be addressed in order before moving to the next.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'Primary Survey (DR ABC)',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 167,
    question:
      'What is the minimum number of employees at which an employer must keep an Accident Book (BI 510)?',
    options: [
      '1 employee',
      '5 employees',
      '25 employees',
      '10 employees',
    ],
    correctAnswer: 3,
    explanation:
      'Employers with 10 or more employees are legally required to keep an Accident Book (form BI 510) under the Social Security (Claims and Payments) Regulations 1979. The book must be kept readily accessible and entries should be made as soon as possible after an incident.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'Accident Book BI 510',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 168,
    question: 'How long must accident records be retained by an employer?',
    options: [
      '3 years',
      '2 years',
      '1 year',
      '5 years',
    ],
    correctAnswer: 0,
    explanation:
      'Accident records must be retained for a minimum of three years from the date of the last entry. This requirement exists under the Social Security (Claims and Payments) Regulations 1979. Keeping accurate records is essential for identifying patterns, supporting insurance claims, and demonstrating regulatory compliance.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'Record Retention Period',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 169,
    question: 'What does RIDDOR stand for?',
    options: [
      'Recording of Incidents, Diseases and Dangerous Occurrences Regulations',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Reporting of Incidents, Deaths and Dangerous Operations Regulations',
      'Recording of Injuries, Deaths and Dangerous Operations Regulations',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR stands for the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013. These regulations require employers, the self-employed, and people in control of work premises to report certain serious workplace accidents, occupational diseases, and specified dangerous occurrences to the HSE.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'RIDDOR 2013',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 170,
    question: 'Which British Standard specifies the contents of workplace first aid kits?',
    options: [
      'BS EN 166:2002',
      'BS 7671:2018',
      'BS 8599-1:2019',
      'BS 5839-1:2025',
    ],
    correctAnswer: 2,
    explanation:
      'BS 8599-1:2019 is the British Standard that specifies the contents of workplace first aid kits. It defines three kit sizes — small, medium, and large — based on the number of employees. This standard replaced the earlier 2011 edition and introduced updated contents including burn dressings and foil blankets.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'BS 8599-1:2019 Kit Contents',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 171,
    question:
      'Before approaching a collapsed casualty, what is the very first thing a first aider should check?',
    options: [
      'Whether the casualty is breathing',
      'Whether bystanders can help',
      'Whether the casualty is conscious',
      'Whether the scene is safe (DANGER)',
    ],
    correctAnswer: 3,
    explanation:
      'The first step in any emergency response is to check for danger and ensure the scene is safe for the first aider, bystanders, and the casualty. Approaching a hazardous scene without assessing danger could result in additional casualties. Only once the area is confirmed safe should the first aider proceed with the primary survey.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'Scene Safety (DANGER)',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 172,
    question: 'What is the Approved Code of Practice for workplace first aid?',
    options: [
      'L74',
      'L144',
      'L21',
      'L8',
    ],
    correctAnswer: 0,
    explanation:
      'L74 is the Approved Code of Practice (ACoP) and guidance document for the Health and Safety (First-Aid) Regulations 1981. It provides practical guidance on what employers need to do to comply with the Regulations. Although an ACoP is not law itself, failure to follow its guidance can be used as evidence in court proceedings.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'Approved Code of Practice L74',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 173,
    question:
      'A conscious adult casualty tells a first aider to stop treating them. What should the first aider do?',
    options: [
      'Ask a colleague to continue treatment instead',
      'Respect their wishes and stop treatment',
      'Call the police to override the refusal',
      'Continue treatment as the first aider has a duty of care',
    ],
    correctAnswer: 1,
    explanation:
      'A conscious adult with mental capacity has the legal right to refuse treatment, and a first aider must respect that decision. Continuing to treat someone who has refused consent could constitute assault or battery. The first aider should document the refusal and remain available in case the casualty changes their mind.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'Consent and Capacity',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 174,
    question: 'How many days does a FAW (First Aid at Work) qualification course typically last?',
    options: [
      '1 day',
      '2 days',
      '3 days',
      '5 days',
    ],
    correctAnswer: 2,
    explanation:
      'The full First Aid at Work (FAW) course is typically a three-day training programme. It covers a comprehensive range of first aid topics including CPR, choking, wounds, burns, fractures, and medical conditions. The shorter EFAW course lasts one day and covers only essential life-saving skills.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'FAW vs EFAW Certificates',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 175,
    question: 'What is the purpose of a first aid needs assessment?',
    options: [
      'To determine how many first aid kits to order',
      'To comply with fire safety regulations',
      'To check whether existing first aiders need retraining',
      'To identify the first aid provision required for a specific workplace',
    ],
    correctAnswer: 3,
    explanation:
      'A first aid needs assessment is carried out to determine the appropriate level of first aid provision for a specific workplace. It considers factors such as workplace hazards, the number of employees, the nature of the work, the site layout, and access to emergency services. The assessment should be reviewed regularly and whenever circumstances change.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'First Aid Needs Assessment',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 176,
    question:
      'Under the primary survey, what should a first aider do immediately after confirming the scene is safe and the casualty is unresponsive?',
    options: [
      'Open the airway',
      'Begin chest compressions',
      'Place the casualty in the recovery position',
      'Check for bleeding',
    ],
    correctAnswer: 0,
    explanation:
      'Following DR ABC, after confirming Danger is clear and the casualty shows no Response, the next step is to open the Airway using a head-tilt chin-lift manoeuvre. This ensures the tongue is not blocking the airway before assessing Breathing. Chest compressions are only started if the casualty is not breathing normally.',
    section: 'Module 1',
    difficulty: 'basic' as const,
    topic: 'Primary Survey (DR ABC)',
    category: 'Legislation, Kit & Protocol' as const,
  },

  // === INTERMEDIATE (16 questions: IDs 177–192) ===
  {
    id: 177,
    question:
      'According to the Approved Code of Practice L74, which of the following factors must be considered in a first aid needs assessment?',
    options: [
      'The brand of first aid kit already purchased',
      'The proximity of the workplace to emergency medical services',
      'The political views of the workforce',
      'The religious practices of employees',
    ],
    correctAnswer: 1,
    explanation:
      'L74 lists several factors to consider in a first aid needs assessment, including the distance from the workplace to emergency medical services. A remote location with longer ambulance response times may require more qualified first aiders and additional equipment. Other key factors include hazard types, workforce size, shift patterns, and the presence of vulnerable individuals.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'First Aid Needs Assessment Checklist',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 178,
    question:
      'On a construction site with 35 workers, what is the minimum number of qualified FAW holders required?',
    options: [
      'None — an appointed person is sufficient',
      '2 FAW holders',
      '1 FAW holder',
      '3 FAW holders',
    ],
    correctAnswer: 2,
    explanation:
      'HSE guidance for construction sites recommends at least one qualified FAW holder for every 5 to 50 workers on site. With 35 workers, the site falls within this range and therefore requires a minimum of one FAW holder. For sites with more than 50 workers, additional FAW holders are needed at a ratio of one per 50 workers.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'Construction Site Requirements',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 179,
    question: 'Which of the following incidents must be reported under RIDDOR 2013?',
    options: [
      'A minor cut that requires a plaster',
      'A worker who feels unwell and goes home early',
      'A near miss where nobody was injured',
      'A fracture of the arm sustained at work',
    ],
    correctAnswer: 3,
    explanation:
      'Fractures (other than to fingers, thumbs, and toes) are classified as specified injuries under RIDDOR 2013 and must be reported to the HSE. The four main reportable categories are deaths, specified injuries, over-7-day incapacitation injuries, and dangerous occurrences. Minor cuts and general illness are not reportable under RIDDOR.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'RIDDOR 2013 Categories',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 180,
    question:
      'A worker sustains an injury at work and is unable to carry out their normal duties for 9 consecutive days (not counting the day of the accident). Is this reportable under RIDDOR?',
    options: [
      'Yes — it is an over-7-day incapacitation injury',
      "No — only injuries causing over 14 days' absence are reportable",
      'No — only specified injuries are reportable',
      'Yes — but only if the worker is hospitalised',
    ],
    correctAnswer: 0,
    explanation:
      'Under RIDDOR 2013, injuries that result in incapacitation for more than seven consecutive days (not counting the day of the accident) must be reported to the HSE. Nine days of incapacity clearly exceeds this threshold. The report must be made within 15 days of the accident.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'RIDDOR Over-7-Day Injuries',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 181,
    question:
      'What additional item is recommended for inclusion in a first aid kit on a high-risk construction site, beyond standard BS 8599-1:2019 contents?',
    options: [
      'A bottle of paracetamol and a tube of antiseptic cream',
      'Burn gel sachets and trauma dressings',
      'A glucose drink and a set of glucose tablets',
      'A supply of prescription-only adrenaline auto-injectors',
    ],
    correctAnswer: 1,
    explanation:
      'High-risk construction sites should supplement standard BS 8599-1:2019 kits with items appropriate to the hazards present, such as burn gel sachets and trauma dressings for dealing with serious burns and catastrophic bleeding. First aid kits should never contain medications such as paracetamol or antiseptic cream, as first aiders are not authorised to administer medicines.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'High-Risk Construction Kit Additions',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 182,
    question: 'Under GDPR, how should completed pages of the Accident Book (BI 510) be handled?',
    options: [
      'They should be displayed on the health and safety noticeboard',
      'They should be sent to the HSE within 7 days',
      'They should be removed and stored securely to protect personal data',
      'They should be shredded immediately after the accident is resolved',
    ],
    correctAnswer: 2,
    explanation:
      "Under the General Data Protection Regulation (GDPR), accident records contain personal and sensitive data that must be protected. Completed pages of the Accident Book should be removed and stored securely so that other employees cannot access another person's details. The current BI 510 format uses tear-out pages specifically to facilitate compliance with data protection requirements.",
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'GDPR Considerations',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 183,
    question:
      'A medium-sized workplace BS 8599-1:2019 first aid kit is designed to cover how many employees?',
    options: [
      'Fewer than 25 employees',
      'More than 250 employees',
      '100 to 250 employees',
      '25 to 100 employees',
    ],
    correctAnswer: 3,
    explanation:
      'Under BS 8599-1:2019, first aid kit sizes are categorised as small (fewer than 25 employees), medium (25 to 100 employees), and large (more than 100 employees). These are guidelines, and the actual provision should be based on the findings of the first aid needs assessment, taking account of specific workplace hazards and risks.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'BS 8599-1:2019 Kit Sizes',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 184,
    question: 'Which of the following is NOT a specified injury under RIDDOR 2013?',
    options: [
      'A sprained ankle requiring 5 days off work',
      'Loss of consciousness caused by a head injury',
      'Amputation of a finger',
      'Any injury resulting from a workplace accident that requires hospital treatment for more than 24 hours',
    ],
    correctAnswer: 0,
    explanation:
      'A sprained ankle requiring only 5 days off work is not a specified injury and does not meet the over-7-day incapacitation threshold either, so it is not reportable under RIDDOR. Specified injuries include amputations, fractures (other than fingers/thumbs/toes), loss of consciousness, and injuries requiring admittance to hospital for more than 24 hours.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'RIDDOR Specified Injuries',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 185,
    question:
      'What is the key difference between a first aid record kept by a first aider and a RIDDOR report?',
    options: [
      'A first aid record is sent to the HSE; a RIDDOR report is kept by the employer',
      'A first aid record is kept internally; a RIDDOR report is submitted to the HSE for qualifying incidents',
      'There is no difference; the two documents are interchangeable',
      'A first aid record is a legal requirement; a RIDDOR report is optional',
    ],
    correctAnswer: 1,
    explanation:
      'A first aid record is an internal document completed by the first aider detailing any treatment given, and it is retained by the employer. A RIDDOR report is a formal notification submitted to the HSE when an incident meets specified reporting criteria such as death, specified injury, over-7-day incapacitation, or dangerous occurrence. Both serve different legal purposes.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'First Aid Records vs RIDDOR',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 186,
    question:
      'An employer has a FAW certificate holder whose certificate expires in two months. What should the employer arrange?',
    options: [
      'Nothing — the first aider can continue practising after expiry',
      'An annual refresher course and no further action',
      'A requalification course to be completed before the certificate expires',
      'A one-day EFAW course to extend the certificate',
    ],
    correctAnswer: 2,
    explanation:
      'The employer should arrange for the first aider to attend a full requalification course before their certificate expires. If the certificate lapses, the individual is no longer a qualified first aider and the employer may be in breach of the Regulations. HSE strongly recommends that first aiders also attend annual refresher training to maintain their skills between requalification courses.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'Requalification Rules',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 187,
    question:
      'When conducting a first aid needs assessment, which of the following workplace characteristics would most likely increase the level of first aid provision required?',
    options: [
      'A small low-risk office with fewer than five employees',
      'A single-storey shop located next door to an A&E department',
      'A quiet workplace where staff work only standard daytime hours',
      'A multi-storey factory using hazardous chemicals with shift workers',
    ],
    correctAnswer: 3,
    explanation:
      'A multi-storey factory using hazardous chemicals with shift workers presents multiple risk factors: dangerous substances, a large or complex layout, and the need to cover different shift patterns. All of these factors would increase the provision of first aiders, equipment, and potentially require a dedicated first aid room. The needs assessment must reflect the specific hazards and circumstances of the workplace.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'First Aid Needs Assessment Checklist',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 188,
    question:
      'Under the Health and Safety (First-Aid) Regulations 1981, what must an employer provide if a first aid needs assessment identifies that a first aid room is necessary?',
    options: [
      'A lockable room with a telephone, running water, a couch, and first aid equipment',
      'A shared store cupboard containing a single first aid kit',
      'A clearly signed area of the car park with an outdoor seat',
      'Any spare office, provided it has a chair and a first aid poster',
    ],
    correctAnswer: 0,
    explanation:
      'Where a first aid room is required, it should be a dedicated, clearly signed room that is easily accessible. It should contain a couch or examination bed, running water, a telephone or means of communication, first aid materials, and appropriate heating, lighting, and ventilation. The room should be kept clean and available for first aid purposes at all times.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'First Aid Room Requirements',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 189,
    question:
      'An AED (Automated External Defibrillator) is provided in a workplace. Who is permitted to use it?',
    options: [
      'Only a qualified doctor or paramedic may operate it',
      'Any person — AEDs are designed to be used by anyone, including untrained bystanders',
      'Only a current FAW certificate holder is permitted to use it',
      'Only staff who have completed a separate AED-specific course',
    ],
    correctAnswer: 1,
    explanation:
      'AEDs are specifically designed to be used by anyone, including people with no formal training. The device provides clear voice prompts and will only deliver a shock if it detects a shockable heart rhythm. While training improves confidence and speed, the Resuscitation Council (UK) encourages the use of AEDs by any bystander in a cardiac arrest situation.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'AED Provision',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 190,
    question:
      'Which of the following items would you expect to find in a standard BS 8599-1:2019 workplace first aid kit?',
    options: [
      'Paracetamol tablets, antiseptic cream, and a bottle of antihistamine',
      'A blood pressure monitor, a stethoscope, and suturing equipment',
      'Sterile dressings, disposable gloves, a foil blanket, and a resuscitation face shield',
      'Prescription adrenaline auto-injectors and a bottle of aspirin',
    ],
    correctAnswer: 2,
    explanation:
      'A standard BS 8599-1:2019 kit includes items such as sterile dressings of various sizes, adhesive plasters, triangular bandages, disposable gloves, a foil blanket, sterile eye pads, microporous tape, and a resuscitation face shield. Medications (aspirin, paracetamol) and prescription items must never be included in a workplace first aid kit.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'BS 8599-1:2019 Kit Contents',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 191,
    question:
      'A casualty is unconscious after a fall from height. You suspect a spinal injury. How does this affect the primary survey?',
    options: [
      'Skip the airway step to avoid moving the head',
      'Roll the casualty into the recovery position immediately',
      'Do not assess the casualty — wait for the ambulance',
      'Use a jaw-thrust manoeuvre instead of head-tilt chin-lift to open the airway',
    ],
    correctAnswer: 3,
    explanation:
      'When a spinal injury is suspected, the jaw-thrust manoeuvre should be used to open the airway instead of the standard head-tilt chin-lift, as it minimises movement of the cervical spine. The primary survey must still be completed because maintaining an open airway takes priority. Manual in-line stabilisation of the head and neck should be maintained throughout.',
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'Primary Survey (DR ABC)',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 192,
    question:
      'What information should be recorded in a first aid treatment record after attending to a casualty?',
    options: [
      "The casualty's name, date, time, nature of injury or illness, treatment given, and the outcome",
      "Only the casualty's name and the date, to keep the record brief",
      "The first aider's personal opinion on who was at fault for the incident",
      "The casualty's full medical history and a list of their medications",
    ],
    correctAnswer: 0,
    explanation:
      "A comprehensive first aid record should include the casualty's name, the date and time of the incident, the nature of the injury or illness, the treatment provided, and the outcome or onward referral. These records support employer compliance, help identify workplace hazard trends, and may be required as evidence in legal or insurance proceedings.",
    section: 'Module 1',
    difficulty: 'intermediate' as const,
    topic: 'First Aid Records vs RIDDOR',
    category: 'Legislation, Kit & Protocol' as const,
  },

  // === ADVANCED (8 questions: IDs 193–200) ===
  {
    id: 193,
    question:
      'A construction company operates two sites: Site A has 48 workers and Site B has 55 workers. Using HSE construction guidance, what is the minimum FAW provision across both sites?',
    options: [
      '2 FAW holders at each site',
      '1 FAW holder at Site A and 2 FAW holders at Site B',
      '1 FAW holder shared between both sites',
      '1 FAW holder at Site A and 1 FAW holder at Site B',
    ],
    correctAnswer: 1,
    explanation:
      'HSE guidance for construction sites recommends one FAW holder for 5 to 50 workers and an additional FAW holder for every 50 workers beyond that. Site A (48 workers) falls within the 5–50 range and requires one FAW holder. Site B (55 workers) exceeds 50 and therefore requires two FAW holders. First aiders cannot be shared across separate sites as they must be available at all times.',
    section: 'Module 1',
    difficulty: 'advanced' as const,
    topic: 'Construction Site Requirements',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 194,
    question:
      'A worker suffers a serious burn and is taken to hospital, where they are admitted for observation for 26 hours. Under RIDDOR 2013, how should this be classified and when must it be reported?',
    options: [
      'It is not reportable, as a burn is never classed as a specified injury',
      'It is reportable only as an over-7-day injury, within 15 days of the accident',
      'It is reportable as a specified injury because the worker was admitted to hospital for more than 24 hours; it must be reported without delay',
      'It is recordable in the accident book only and does not need reporting to the HSE',
    ],
    correctAnswer: 2,
    explanation:
      'Under RIDDOR 2013, any injury that results in a worker being admitted to hospital for more than 24 hours is classified as a specified injury. Specified injuries must be reported to the HSE without delay — the responsible person must notify the HSE by the quickest practicable means (usually by telephone) and follow up with a written report within 10 days using the online F2508 form.',
    section: 'Module 1',
    difficulty: 'advanced' as const,
    topic: 'RIDDOR 2013 Categories',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 195,
    question:
      'An employer completes a first aid needs assessment and determines that EFAW provision is sufficient. Six months later, the company introduces a new process involving molten metal. What action is required?',
    options: [
      'The employer should purchase additional plasters for the first aid kit',
      'No action — the original assessment remains valid for three years',
      'The employer should wait until the annual health and safety audit to review provision',
      'The employer must review and update the first aid needs assessment to reflect the new hazard',
    ],
    correctAnswer: 3,
    explanation:
      'A first aid needs assessment must be reviewed whenever there is a significant change in the workplace, such as the introduction of a new hazardous process. The use of molten metal introduces severe burn risks that may require upgrading from EFAW to full FAW provision, additional first aid equipment, and potentially a first aid room. Waiting for a scheduled audit could leave workers unprotected.',
    section: 'Module 1',
    difficulty: 'advanced' as const,
    topic: 'First Aid Needs Assessment',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 196,
    question:
      'A 15-year-old work experience student collapses at a workplace. They are unconscious and a parent is not present. What is the legal position regarding consent for first aid treatment?',
    options: [
      'Implied consent applies — a first aider may treat an unconscious minor in their best interests under the principle of necessity',
      'No treatment may be given until a parent or guardian arrives to consent',
      'Treatment is permitted only if a manager signs a consent form on the parent’s behalf',
      'The first aider must wait for the ambulance crew, as only they can consent for a minor',
    ],
    correctAnswer: 0,
    explanation:
      'When a casualty is unconscious and unable to give consent, the principle of necessity (sometimes called implied consent) applies regardless of age. A first aider should act in the best interests of the casualty to preserve life. Delaying treatment to seek parental consent for an unconscious minor could be considered negligent. The first aider should treat the casualty, call 999, and inform the parents as soon as practicable.',
    section: 'Module 1',
    difficulty: 'advanced' as const,
    topic: 'Consent and Capacity',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 197,
    question:
      "An employee requests access to another colleague's accident record entry under a Subject Access Request (SAR) citing GDPR. How should the employer respond?",
    options: [
      "Provide the colleague's full accident record, as workplace records are public",
      "Provide only the requesting employee's own records; another person's data is protected and cannot be disclosed without their consent",
      "Refuse the request entirely, as no accident records can ever be disclosed",
      "Provide the colleague's record only if the requester gives a written reason",
    ],
    correctAnswer: 1,
    explanation:
      "Under GDPR, a Subject Access Request entitles an individual to access their own personal data only. The employer must not disclose another employee's accident record without that person's consent, as it constitutes third-party personal data. The employer should provide the requester with their own records and explain that disclosing another individual's data would breach data protection law.",
    section: 'Module 1',
    difficulty: 'advanced' as const,
    topic: 'GDPR Considerations',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 198,
    question:
      'A workplace has an AED but the device has not been maintained. During a cardiac arrest, the AED fails to function. Who is likely to be held responsible?',
    options: [
      'The AED manufacturer, regardless of how the device was looked after',
      'The first aider who used the device during the cardiac arrest',
      'The employer, who has a duty to ensure first aid equipment is properly maintained and in working order',
      'Nobody — AED failure is always treated as an unavoidable accident',
    ],
    correctAnswer: 2,
    explanation:
      'Under the Health and Safety (First-Aid) Regulations 1981 and general duties under the Health and Safety at Work Act 1974, the employer is responsible for ensuring that all first aid equipment is adequate, properly maintained, and readily available. This includes regular checks on AED pads, batteries, and software updates. Failure to maintain an AED could result in enforcement action and potential liability in civil proceedings.',
    section: 'Module 1',
    difficulty: 'advanced' as const,
    topic: 'AED Provision',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 199,
    question:
      'A scaffold collapses on a construction site but no one is injured. Under RIDDOR 2013, is this reportable?',
    options: [
      'No — only incidents that injure someone are reportable under RIDDOR',
      'No — scaffold collapses are recorded in the accident book but never reported',
      'Yes — but only if the scaffold was being used at the time of the collapse',
      'Yes — the collapse of scaffolding over 5 metres in height is a reportable dangerous occurrence',
    ],
    correctAnswer: 3,
    explanation:
      'Under RIDDOR 2013, the collapse, overturning, or failure of load-bearing parts of scaffolding is classified as a dangerous occurrence and must be reported to the HSE regardless of whether anyone was injured. The threshold for scaffold collapses is a height of more than 5 metres. Dangerous occurrences must be reported without delay by the quickest practicable means.',
    section: 'Module 1',
    difficulty: 'advanced' as const,
    topic: 'RIDDOR Dangerous Occurrences',
    category: 'Legislation, Kit & Protocol' as const,
  },
  {
    id: 200,
    question:
      'During a primary survey, you find a casualty who is unresponsive but making occasional gasping breaths approximately every 15 seconds. What is the correct interpretation and action?',
    options: [
      'The casualty has agonal breathing, which is not effective breathing — begin CPR immediately and call 999',
      'The casualty is breathing normally — place them in the recovery position and monitor',
      'The gasping shows the heart has restarted — stop and check for a pulse',
      'The casualty is choking — give back blows and abdominal thrusts',
    ],
    correctAnswer: 0,
    explanation:
      'Infrequent, irregular gasps (agonal breathing) are not effective breathing and are a sign of cardiac arrest. Agonal breathing occurs in up to 40% of cardiac arrest cases and is often mistaken for normal breathing, leading to delays in starting CPR. The first aider should treat the casualty as being in cardiac arrest, call 999 immediately, begin CPR, and deploy an AED as soon as one is available.',
    section: 'Module 1',
    difficulty: 'advanced' as const,
    topic: 'Primary Survey (DR ABC)',
    category: 'Legislation, Kit & Protocol' as const,
  },
];
