/**
 * MOET · Module 1 · Section 1.6 · Subsection 2 — First Aid for Electrical Incidents
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Emergency incident and response procedures."
 *   Skills     · "Follow emergency incident and response procedures."
 *   Behaviours · "Prioritise safe working practices.."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. This is
 * life-safety content — every procedural step and sequence below is kept
 * verbatim and in its original order.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'First Aid for Electrical Incidents - MOET Module 1 Section 6.2';
const DESCRIPTION =
  'Comprehensive guide to first aid for electrical incidents: electric shock response, CPR and DR ABC procedure, AED use, treatment of electrical burns, arc flash injuries, low voltage vs high voltage shock, and first aid responsibilities for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'shock-response',
    question:
      'A colleague has received an electric shock and is still in contact with the live conductor. What is the FIRST thing you should do?',
    options: [
      'Throw water over the casualty to break the circuit',
      'Begin CPR immediately',
      'Pull them away from the conductor by their clothing',
      'Switch off the electrical supply or isolate the circuit',
    ],
    correctIndex: 3,
    explanation:
      'The first action is always to isolate the electrical supply — switch off at the nearest isolator, remove the plug, or trip the circuit breaker. Never touch the casualty while they are still in contact with a live conductor, as the current will pass through you as well. If you cannot isolate the supply, use a dry, non-conductive object (e.g., a wooden broom handle) to push the casualty clear.',
  },
  {
    id: 'dr-abc',
    question: "In the DR ABC primary survey, what does the 'D' stand for?",
    options: ['Defibrillate', 'Diagnose', 'Danger', 'Disability'],
    correctIndex: 2,
    explanation:
      'D stands for Danger — the first step in any emergency response is to check for danger to yourself, bystanders and the casualty. In an electrical incident, this means ensuring the supply is isolated and there is no ongoing risk of electric shock before approaching the casualty.',
  },
  {
    id: 'aed-use',
    question:
      'When using an AED on a casualty who has suffered cardiac arrest from electric shock, what should you ensure first?',
    options: [
      'That you hold a recognised medical qualification before using the device',
      'That the casualty has a detectable pulse before applying the pads',
      'That you give at least five rescue breaths before switching the AED on',
      'That the casualty is not in contact with the electrical source and their chest is dry and bare',
    ],
    correctIndex: 3,
    explanation:
      'Before applying AED pads, ensure the casualty is no longer in contact with the electrical source, their chest is bare and dry (remove clothing, wipe sweat or water), and any medication patches or excessive chest hair are dealt with. AEDs are designed to be used by anyone — you do not need to be a doctor or paramedic.',
  },
  {
    id: 'electrical-burns',
    question: 'Why are electrical burns particularly dangerous compared to thermal burns?',
    options: [
      'The current causes deep internal tissue damage that may not be visible externally',
      'They always heal more slowly than an equivalent thermal burn',
      'They are only ever caused by high voltage and never by low voltage',
      'They cannot be cooled with water like an ordinary thermal burn',
    ],
    correctIndex: 0,
    explanation:
      'Electrical burns are particularly dangerous because the current passes through the body, causing deep internal tissue damage (to muscles, nerves, blood vessels and organs) that may not be visible on the skin surface. Entry and exit wounds may appear small, but the internal damage can be severe. All electrical burns must be assessed at hospital, even if the external injury looks minor.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'If a person is still in contact with a live conductor, you should:',
    options: [
      'Grab their hand and pull them away immediately',
      'Isolate the supply first, then approach the casualty',
      'Pour water over them to break the circuit',
      'Begin CPR while they are still in contact',
    ],
    correctAnswer: 1,
    explanation:
      'Always isolate the electrical supply before approaching the casualty. Touching someone who is in contact with a live conductor will cause the current to flow through you as well. If isolation is not possible, use a dry non-conductive object to separate them from the source.',
  },
  {
    id: 2,
    question: 'The letters DR ABC in the primary survey stand for:',
    options: [
      'Diagnosis, Recovery, Assessment, Bandaging, Care',
      'Danger, Response, Airway, Breathing, CPR',
      'Danger, Response, Airway, Breathing, Circulation',
      'Danger, Rescue, Assess, Breathe, Compressions',
    ],
    correctAnswer: 2,
    explanation:
      'DR ABC stands for Danger, Response, Airway, Breathing and Circulation. This systematic approach ensures you check for hazards first, then assess whether the casualty is conscious, ensure their airway is open, check for breathing, and assess circulation (pulse/signs of life).',
  },
  {
    id: 3,
    question: 'The correct ratio of chest compressions to rescue breaths in adult CPR is:',
    options: [
      '30 compressions to 1 breath',
      '15 compressions to 2 breaths',
      '5 compressions to 1 breath',
      '30 compressions to 2 breaths',
    ],
    correctAnswer: 3,
    explanation:
      'The current Resuscitation Council UK guidelines specify 30 chest compressions followed by 2 rescue breaths for adult CPR. Compressions should be at a rate of 100-120 per minute, pressing down 5-6 cm on the centre of the chest. If you are unwilling or unable to give rescue breaths, continuous compressions alone are better than no CPR.',
  },
  {
    id: 4,
    question: 'Chest compressions during CPR should be performed at a depth of:',
    options: ['5-6 cm', '3-4 cm', '2-3 cm', '7-8 cm'],
    correctAnswer: 0,
    explanation:
      'Effective chest compressions require a depth of 5-6 cm (approximately one-third of the depth of the chest). Compressions that are too shallow will not generate sufficient blood flow. Allow the chest to recoil fully between compressions to allow the heart to refill.',
  },
  {
    id: 5,
    question: 'An AED (automated external defibrillator) is used to:',
    options: [
      'Measure the casualty’s blood pressure and oxygen levels continuously',
      'Deliver a controlled electric shock to restore a normal heart rhythm during ventricular fibrillation',
      'Provide oxygen to a casualty who is breathing but unconscious',
      'Warm a casualty who is suffering from shock and hypothermia',
    ],
    correctAnswer: 1,
    explanation:
      'An AED delivers a controlled electric shock to the heart to correct ventricular fibrillation (VF) or pulseless ventricular tachycardia (VT) — disorganised electrical activity that prevents the heart from pumping effectively. It analyses the heart rhythm and will only deliver a shock if a shockable rhythm is detected. It will not shock a heart in asystole (flatline).',
  },
  {
    id: 6,
    question: 'When treating electrical burns, you should:',
    options: [
      'Apply butter or a greasy cream to soothe the burn before dressing it',
      'Burst any blisters and cover the burn with a tight adhesive dressing',
      'Cool the burn with cold running water for at least 20 minutes and seek medical attention',
      'Pack the burn with ice to bring the temperature down as quickly as possible',
    ],
    correctAnswer: 2,
    explanation:
      'Cool the burn with cold running water for at least 20 minutes (start as soon as possible, up to 3 hours after the injury). Do not use ice, butter, creams or adhesive dressings. Cover loosely with cling film or a clean, non-fluffy material. All electrical burns must be assessed at hospital due to the risk of internal damage.',
  },
  {
    id: 7,
    question:
      'The difference between a low voltage electric shock and a high voltage shock is that HV shock:',
    options: [
      'Is always harmless because the current passes too quickly to injure',
      'Never causes burns, only a brief tingling sensation',
      'Can only occur through direct contact, never by arcing across a gap',
      'Causes more severe burns, deeper tissue damage and a higher likelihood of cardiac arrest',
    ],
    correctAnswer: 3,
    explanation:
      'High voltage shocks are significantly more dangerous than low voltage. HV causes more severe burns (both entry and exit wounds), deeper tissue damage to muscles and organs, a higher likelihood of cardiac arrest, and potential for blast injuries from arc flash. All HV shock casualties must be taken to hospital immediately, even if they appear uninjured.',
  },
  {
    id: 8,
    question: 'Arc flash injuries can include:',
    options: [
      'Severe thermal burns, blast injuries, eye damage from UV radiation and hearing damage',
      'Only a mild reddening of the skin that needs no treatment',
      'Frostbite and hypothermia from the rapid cooling of the arc',
      'Purely psychological effects with no physical injury',
    ],
    correctAnswer: 0,
    explanation:
      'Arc flash produces temperatures up to 20,000°C, causing severe thermal burns to exposed skin. The pressure wave can cause blast injuries (broken bones, ruptured eardrums). Intense UV and visible light can cause arc eye (photokeratitis) and permanent retinal damage. Molten metal and debris can cause secondary injuries.',
  },
  {
    id: 9,
    question: "An 'appointed person' for first aid is someone who:",
    options: [
      'Holds a three-day First Aid at Work certificate and treats all injuries',
      'Is responsible for calling the emergency services and maintaining the first aid kit when a trained first aider is absent',
      'Is a qualified paramedic employed permanently on the site',
      'Is the only person legally allowed to perform CPR in the workplace',
    ],
    correctAnswer: 1,
    explanation:
      'An appointed person is not a trained first aider. They are designated to take charge when someone is injured or ill (calling 999, looking after the first aid kit) when a qualified first aider is not available. They may have received basic emergency first aid awareness training but are not qualified to provide first aid treatment.',
  },
  {
    id: 10,
    question:
      'After an electric shock incident on site, the casualty says they feel fine and wants to continue working. You should:',
    options: [
      'Allow them to continue working as long as they have no visible burns',
      'Send them home to rest and review them at the start of the next shift',
      'Insist they attend hospital for assessment, as internal injuries may not be immediately apparent',
      'Give them a hot drink and let them decide for themselves whether to carry on',
    ],
    correctAnswer: 2,
    explanation:
      'All electric shock casualties must attend hospital for assessment, even if they appear well. Electric current passing through the body can cause delayed cardiac arrhythmias, internal tissue damage and kidney damage (from muscle breakdown) that may not be immediately apparent. The casualty should be monitored and transported to A&E.',
  },
  {
    id: 11,
    question:
      'When performing the primary survey on an electric shock casualty, if they are unresponsive and not breathing normally, you should:',
    options: [
      'Place them in the recovery position and wait for the ambulance',
      'Give rescue breaths only — compressions are not needed for electric shock',
      'Check their pulse for 5 minutes before deciding on treatment',
      'Call 999, start CPR (30:2) immediately and send someone for the nearest AED',
    ],
    correctAnswer: 3,
    explanation:
      'If the casualty is unresponsive and not breathing normally, they are in cardiac arrest. Call 999 immediately (or send someone to call), begin CPR with 30 compressions to 2 rescue breaths, and send someone to fetch the nearest AED. Early CPR and early defibrillation are the most important factors in survival from cardiac arrest.',
  },
  {
    id: 12,
    question: 'Under the Health and Safety (First-Aid) Regulations 1981, employers must:',
    options: [
      'Provide adequate and appropriate first aid equipment, facilities and personnel based on a needs assessment',
      'Employ a full-time qualified nurse at every workplace regardless of size',
      'Send every employee on a three-day First Aid at Work course each year',
      'Provide first aid only for premises with more than fifty employees',
    ],
    correctAnswer: 0,
    explanation:
      'The Health and Safety (First-Aid) Regulations 1981 require employers to provide adequate and appropriate first aid equipment, facilities and personnel. The level of provision is determined by a first aid needs assessment, which considers the nature of the work, the workplace hazards, the number of employees, and the distance from emergency medical services.',
  },
];

const faqs = [
  {
    question: "Should I give CPR to an electric shock casualty even if I'm not trained?",
    answer:
      'Yes — if the casualty is unresponsive and not breathing normally, doing something is always better than doing nothing. If you have not been trained in CPR, call 999 and the operator will guide you through hands-only CPR (continuous chest compressions without rescue breaths). Push hard and fast in the centre of the chest at a rate of 100-120 per minute. Hands-only CPR is effective and significantly increases survival rates.',
  },
  {
    question: 'Can an AED harm someone who does not need a shock?',
    answer:
      'No. An AED analyses the heart rhythm automatically and will only deliver a shock if it detects a shockable rhythm (ventricular fibrillation or pulseless ventricular tachycardia). If the rhythm is not shockable, the AED will advise you to continue CPR and will not allow a shock to be delivered. AEDs are designed to be safe for use by untrained members of the public.',
  },
  {
    question: 'What is the difference between an appointed person and a first aider?',
    answer:
      'A first aider holds a valid first aid at work (FAW) certificate (3-day course, valid for 3 years) or emergency first aid at work (EFAW) certificate (1-day course, valid for 3 years). They are trained to provide first aid treatment. An appointed person is designated to take charge of first aid arrangements (calling 999, maintaining the kit) but is not trained to provide treatment. Every workplace must have at least an appointed person; the need for qualified first aiders depends on the first aid needs assessment.',
  },
  {
    question: 'How long should I continue CPR before stopping?',
    answer:
      'Continue CPR until: the emergency services arrive and take over, the casualty shows signs of life (starts breathing normally, coughing, moving), you become too physically exhausted to continue, or a qualified medical professional tells you to stop. If there are other people present, take turns doing CPR every 2 minutes to maintain effective compressions. Do not stop CPR to check for signs of life unless the casualty starts breathing.',
  },
  {
    question: 'Do all electric shock casualties need to go to hospital?',
    answer:
      'Yes — all electric shock casualties should attend hospital for assessment, regardless of how they feel. The current pathway through the body can cause delayed cardiac arrhythmias (up to 24 hours after the shock), internal tissue damage, kidney damage from rhabdomyolysis (muscle breakdown), and neurological effects. A 12-lead ECG and blood tests are required to rule out these complications. The casualty should be transported by ambulance if there is any doubt about their condition.',
  },
];

const MOETModule1Section6_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.6 · Subsection 2"
        title="First Aid for Electrical Incidents"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Life-saving response procedures for electric shock, burns and arc flash injuries.
          </p>

          <TLDR
            points={[
              'Rule 1: Never touch a casualty in contact with live conductor',
              'DR ABC: Danger, Response, Airway, Breathing, Circulation',
              'CPR: 30 compressions : 2 breaths, 100-120/min, 5-6 cm depth',
              'Always: Hospital assessment for all shock casualties',
              'LV shock: Tetanic grip, respiratory arrest, cardiac arrhythmia',
              'HV shock: Severe burns, blast injury, cardiac arrest',
              'Arc flash: Thermal burns, UV damage, hearing loss',
              'ST1426: Maps to emergency response KSBs',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Respond safely to an electric shock incident without becoming a casualty yourself',
              'Perform the DR ABC primary survey on an unresponsive casualty',
              'Carry out CPR and use an AED on a casualty in cardiac arrest',
              'Treat electrical burns and arc flash injuries as immediate first aid',
              'Explain the differences between low voltage and high voltage shock injuries',
              'Understand the legal requirements for first aid provision under H&S regulations',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>
            Electric shock response — protecting yourself and the casualty
          </ContentEyebrow>

          <ConceptBlock title="Electric Shock and the Critical Rule">
            <p>
              Electric shock occurs when electrical current flows through the human body. The
              severity of injury depends on the magnitude of the current, its pathway through the
              body, the duration of contact, and the type of current (AC or DC). As an electrical
              maintenance technician, you are at higher risk of encountering electric shock
              incidents than most workers. Knowing how to respond could save your colleague's life —
              or your own.
            </p>
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="mb-2 text-sm font-medium text-red-400">
                Critical Rule: Do NOT Touch the Casualty
              </p>
              <p className="text-sm text-white">
                If a person is in contact with a live electrical conductor, you must NOT touch them
                directly. The current will flow through you as well, making you a second casualty.
                This is the single most important rule in responding to an electric shock incident.
                Many rescuers have been killed by touching electrocuted colleagues.
              </p>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Step-by-Step Response to Electric Shock">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — Isolate:</strong> Switch off the electrical supply at the nearest
                point — isolator, consumer unit, emergency stop, or pull out the plug. If working
                with HV, follow the established switching procedures. Do not attempt to switch HV
                equipment unless you are authorised and competent to do so
              </li>
              <li>
                <strong>Step 2 — Separate:</strong> If you cannot isolate the supply, use a dry,
                non-conductive object to push the casualty clear of the conductor. A wooden broom
                handle, a dry wooden chair, or dry rope can be used. Stand on dry insulating
                material (rubber mat, dry wood, thick newspaper) if possible
              </li>
              <li>
                <strong>Step 3 — Call for help:</strong> Shout for assistance and send someone to
                call 999. If alone, call 999 before starting first aid (put the phone on speaker)
              </li>
              <li>
                <strong>Step 4 — Assess:</strong> Once the casualty is clear of the electrical
                source, begin the DR ABC primary survey
              </li>
              <li>
                <strong>Step 5 — Treat:</strong> Depending on the assessment findings, begin CPR,
                treat burns, or place in the recovery position
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Effects of Current on the Human Body">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Current (mA)</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Effect (50 Hz AC)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">1 mA</td>
                    <td className="border border-white/10 px-3 py-2">
                      Threshold of perception — tingling sensation
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">5-10 mA</td>
                    <td className="border border-white/10 px-3 py-2">
                      Painful shock, difficulty releasing grip (let-go threshold ~10 mA)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">10-30 mA</td>
                    <td className="border border-white/10 px-3 py-2">
                      Muscular contraction (tetanic grip), possible respiratory difficulty
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">30-75 mA</td>
                    <td className="border border-white/10 px-3 py-2">
                      Respiratory arrest, severe pain, possible ventricular fibrillation
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">75-300 mA</td>
                    <td className="border border-white/10 px-3 py-2">
                      Ventricular fibrillation — cardiac arrest
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">&gt;300 mA</td>
                    <td className="border border-white/10 px-3 py-2">
                      Cardiac standstill, severe burns, likely fatal
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> At 230 V AC (UK mains voltage), a current of 30-300 mA
              flowing through the body for just a fraction of a second can cause ventricular
              fibrillation and death. This is why RCDs (30 mA, 40 ms) are so critical — they
              disconnect the supply before the current reaches lethal levels. However, RCDs are not
              foolproof, and electric shock can still occur.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The DR ABC primary survey and CPR</ContentEyebrow>

          <ConceptBlock title="The DR ABC Primary Survey">
            <p>
              The DR ABC primary survey is a systematic approach to assessing and treating a
              casualty. It ensures you address the most life-threatening conditions first in the
              correct order. For an electric shock casualty, this survey must be carried out as soon
              as the casualty is clear of the electrical source.
            </p>
            <p>
              <strong>D — Danger.</strong> Check for danger to yourself, bystanders and the
              casualty. In an electrical incident, confirm the supply is isolated, check for other
              hazards (water, unstable structures, gas leaks), and ensure the area is safe before
              approaching. If working at height, ensure you do not fall while rushing to help.
            </p>
            <p>
              <strong>R — Response.</strong> Check if the casualty is responsive. Gently shake their
              shoulders and shout loudly, &quot;Can you hear me? Open your eyes!&quot; Use the AVPU
              scale: Alert (fully conscious), Voice (responds to voice), Pain (responds to painful
              stimulus), Unresponsive. If unresponsive, shout for help immediately.
            </p>
            <p>
              <strong>A — Airway.</strong> Open the airway using the head-tilt, chin-lift technique.
              Place one hand on the forehead and gently tilt the head back. With your fingertips
              under the chin, lift the chin to open the airway. Check inside the mouth for any
              obvious obstruction and remove it if visible. Do not put your fingers in the mouth to
              sweep blindly.
            </p>
            <p>
              <strong>B — Breathing.</strong> With the airway open, look, listen and feel for normal
              breathing for up to 10 seconds. Look for chest movement, listen for breath sounds,
              feel for breath on your cheek. Occasional gasps (agonal breathing) are NOT normal
              breathing — treat as not breathing. If the casualty is breathing normally, place them
              in the recovery position and monitor. If NOT breathing normally, call 999 and begin
              CPR immediately.
            </p>
            <p>
              <strong>C — Circulation (CPR).</strong> If the casualty is not breathing normally,
              they are in cardiac arrest. Begin CPR immediately:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Position:</strong> Place the heel of one hand on the centre of the chest (on
                the breastbone). Place the other hand on top and interlock your fingers
              </li>
              <li>
                <strong>Compress:</strong> Press down 5-6 cm at a rate of 100-120 compressions per
                minute. Keep your arms straight, press from the shoulders
              </li>
              <li>
                <strong>Ventilate:</strong> After 30 compressions, give 2 rescue breaths. Tilt the
                head back, lift the chin, pinch the nose, and blow steadily into the mouth for about
                1 second until the chest rises
              </li>
              <li>
                <strong>Repeat:</strong> Continue with 30:2 ratio until the ambulance arrives, the
                casualty shows signs of life, or you are too exhausted to continue
              </li>
              <li>
                <strong>Hands-only:</strong> If you cannot or are unwilling to give rescue breaths,
                continuous chest compressions alone are effective and far better than no CPR
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="CPR Quality Matters">
            <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
              <p className="mb-2 text-sm font-medium text-orange-400">CPR Quality Matters</p>
              <p className="text-sm text-white">
                Effective CPR can double or triple survival rates from cardiac arrest. The key
                factors are: starting CPR as soon as possible (every minute of delay reduces
                survival by 7-10%), pushing hard enough (5-6 cm), pushing fast enough (100-120/min),
                allowing full chest recoil, minimising interruptions (do not stop for more than 10
                seconds), and getting an AED attached as quickly as possible. If multiple people are
                present, swap every 2 minutes to maintain compression quality.
              </p>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The most common cause of death from electric shock is
              ventricular fibrillation — the heart's electrical system is disrupted, causing it to
              quiver rather than pump. CPR maintains blood flow to the brain and vital organs until
              an AED can deliver a defibrillating shock to restore normal rhythm. Time is critical —
              every minute counts.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>AED use and treatment of electrical burns</ContentEyebrow>

          <ConceptBlock title="Using an AED — Step by Step">
            <p>
              An automated external defibrillator (AED) is a portable device that analyses the
              heart's rhythm and delivers an electric shock if a shockable rhythm is detected. AEDs
              are designed to be used by anyone — they give voice prompts and visual instructions.
              For an electric shock casualty in cardiac arrest, early defibrillation combined with
              effective CPR offers the best chance of survival.
            </p>
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Switch on the AED and follow the voice prompts. Do not stop
                CPR until the AED instructs you to
              </li>
              <li>
                <strong>Step 2:</strong> Expose the casualty's chest. Remove clothing, wipe the
                chest dry. Remove any medication patches. If the chest is very hairy, shave the pad
                areas (razors are usually included in the AED kit)
              </li>
              <li>
                <strong>Step 3:</strong> Attach the pads as shown in the diagrams on the pads — one
                below the right collarbone, one on the left side below the armpit. Press firmly to
                ensure good contact
              </li>
              <li>
                <strong>Step 4:</strong> Ensure nobody is touching the casualty when the AED
                analyses the rhythm. The AED will say &quot;Analysing — do not touch the
                patient&quot;
              </li>
              <li>
                <strong>Step 5:</strong> If a shock is advised, ensure everyone is clear
                (&quot;Stand clear!&quot;), then press the shock button when instructed
              </li>
              <li>
                <strong>Step 6:</strong> Immediately resume CPR after the shock (or if no shock is
                advised). Continue until the AED re-analyses (usually every 2 minutes)
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Treatment of Electrical Burns">
            <p>
              Electrical burns are caused by current flowing through body tissues and by external
              arc flash heat. They are particularly dangerous because the visible injury on the skin
              surface often underestimates the severity of the internal damage. Current follows the
              path of least resistance through the body — typically along blood vessels, nerves and
              muscles — causing deep tissue destruction.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Entry and exit wounds:</strong> Look for entry wounds (where current entered
                the body) and exit wounds (where it left). These may appear as small, deep, charred
                areas
              </li>
              <li>
                <strong>Cooling:</strong> Cool the burns with cold running water for at least 20
                minutes. This reduces tissue damage, relieves pain and reduces swelling
              </li>
              <li>
                <strong>Do not apply:</strong> Never apply ice, butter, creams, lotions or adhesive
                dressings to burns
              </li>
              <li>
                <strong>Covering:</strong> After cooling, cover loosely with cling film (applied
                lengthways, not wrapped around) or a clean, non-fluffy material
              </li>
              <li>
                <strong>Hospital:</strong> ALL electrical burns must be assessed at hospital — the
                internal damage may be far more severe than the external appearance suggests
              </li>
              <li>
                <strong>Monitoring:</strong> Observe for signs of shock (pale, cold, clammy skin,
                rapid pulse, confusion) and treat accordingly
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Arc Flash Injury Response">
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="mb-2 text-sm font-medium text-red-400">Arc Flash Injury Response</p>
              <p className="mb-2 text-sm text-white">
                Arc flash produces temperatures up to 20,000°C and can cause multiple types of
                injury simultaneously. The response must address all potential injuries:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-white marker:text-elec-yellow/70">
                <li>
                  <strong>Thermal burns:</strong> Cool with running water for at least 20 minutes.
                  Do not remove clothing that is stuck to burns
                </li>
                <li>
                  <strong>Blast injuries:</strong> The pressure wave can cause ruptured eardrums,
                  broken bones and internal organ damage. Keep the casualty still and monitor for
                  breathing difficulties
                </li>
                <li>
                  <strong>Eye injuries:</strong> Intense UV radiation causes arc eye
                  (photokeratitis). Cover both eyes with a clean, damp pad. Do not let the casualty
                  rub their eyes
                </li>
                <li>
                  <strong>Inhalation injuries:</strong> Hot gases and vaporised metal can damage the
                  airways. Monitor breathing closely — airway swelling may develop over hours
                </li>
                <li>
                  <strong>Molten metal:</strong> Do not attempt to remove molten metal embedded in
                  the skin. Cover the area and let hospital staff manage removal
                </li>
              </ul>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Arc flash injuries are some of the most severe trauma an
              electrical maintenance technician can encounter. Prevention through proper PPE
              (arc-rated clothing, face shields, insulated gloves), safe working practices and
              de-energisation is always preferable to treatment. Arc flash risk assessments should
              be carried out before any work on or near live equipment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Low voltage vs high voltage shock and internal injuries</ContentEyebrow>

          <ConceptBlock title="Low Voltage vs High Voltage Shock">
            <p>
              The nature of injuries from electric shock differs significantly between low voltage
              (LV, below 1000 V AC) and high voltage (HV, above 1000 V AC) exposures. Understanding
              these differences is important for providing appropriate first aid and communicating
              effectively with the emergency services.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Low Voltage (&lt;1000 V AC)
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      High Voltage (&gt;1000 V AC)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Contact mechanism
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Typically requires direct contact with live conductor
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Can arc across air gaps — no direct contact needed
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Muscle effect</td>
                    <td className="border border-white/10 px-3 py-2">
                      Tetanic grip — muscles contract, casualty cannot let go
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Violent muscular contraction — throws casualty clear
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Burns</td>
                    <td className="border border-white/10 px-3 py-2">
                      Usually localised to contact points, may be deep
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Severe, extensive burns; major tissue destruction
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Cardiac effect</td>
                    <td className="border border-white/10 px-3 py-2">
                      Ventricular fibrillation is most common cardiac arrest
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Asystole (cardiac standstill) more common at very high currents
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Secondary injuries
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Falls from ladders, striking objects during shock
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Blast injuries, being thrown distances, falling from structures
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Survival</td>
                    <td className="border border-white/10 px-3 py-2">
                      Good survival rate with prompt CPR/AED
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Poorer prognosis; depends on duration and pathway
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Internal Injuries from Electrical Current">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cardiac arrhythmias:</strong> Current passing through the heart can disrupt
                the electrical conduction system, causing ventricular fibrillation, ventricular
                tachycardia, or other arrhythmias. These can be delayed — occurring up to 24 hours
                after the shock. This is why all shock casualties must be monitored in hospital
              </li>
              <li>
                <strong>Rhabdomyolysis:</strong> Current passing through muscles causes cell
                destruction, releasing myoglobin into the bloodstream. Myoglobin can block the
                kidney tubules, causing acute kidney failure. This is a serious complication that
                requires hospital treatment
              </li>
              <li>
                <strong>Nerve damage:</strong> Current follows nerve pathways, causing damage that
                may result in numbness, tingling, weakness or paralysis. Neurological effects may be
                delayed and can be permanent
              </li>
              <li>
                <strong>Vascular damage:</strong> Blood vessels can be damaged internally, leading
                to clotting, aneurysm or delayed haemorrhage
              </li>
              <li>
                <strong>Compartment syndrome:</strong> Swelling within muscle compartments (caused
                by tissue damage) can compress blood vessels and nerves, requiring emergency
                surgical intervention
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Calling Emergency Services and Information for Paramedics">
            <p>
              <strong>Calling Emergency Services</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Call 999 (or 112) immediately for any electric shock incident</li>
              <li>State "electric shock" clearly so the dispatcher can prioritise</li>
              <li>Give the exact location, including building, floor and room</li>
              <li>Describe the voltage (LV or HV) and the casualty's condition</li>
              <li>State whether CPR is in progress and if an AED is available</li>
              <li>Send someone to meet the ambulance at the site entrance</li>
            </ul>
            <p>
              <strong>Information for Paramedics</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Voltage and type of supply (AC/DC, single/three phase)</li>
              <li>Estimated duration of contact</li>
              <li>Current pathway through the body (hand-to-hand, hand-to-foot)</li>
              <li>Whether the casualty was thrown or fell</li>
              <li>Any loss of consciousness, even briefly</li>
              <li>CPR duration and any AED shocks delivered</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to
              understand emergency procedures and be able to respond appropriately to electrical
              incidents. You should know the location of the nearest AED, first aid kit and first
              aid personnel on every site you work on. Check this information during your site
              induction.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>First aid provision and legal requirements</ContentEyebrow>

          <ConceptBlock title="Legal Requirement and First Aid Roles">
            <p>
              The Health and Safety (First-Aid) Regulations 1981 require employers to provide
              adequate and appropriate first aid equipment, facilities and personnel. The level of
              provision is determined by a first aid needs assessment, which takes into account the
              nature of the work, the hazards present, the number of employees, and the proximity of
              emergency medical services. For electrical maintenance work, the higher-risk nature of
              the activities may require enhanced first aid provision.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Role</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Qualification</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Responsibilities</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Appointed person
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      No formal qualification required (basic awareness training recommended)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Takes charge in an emergency, calls 999, maintains first aid kit
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      EFAW first aider
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Emergency First Aid at Work (1-day course, valid 3 years)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Basic life-saving first aid, CPR, treatment of minor injuries
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      FAW first aider
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      First Aid at Work (3-day course, valid 3 years)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Full range of first aid treatment including burns, fractures, shock,
                      unconsciousness
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="First Aid Kit Contents and Recording">
            <p>
              <strong>First Aid Kit Contents (BS 8599-1)</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Guidance leaflet</li>
              <li>Individually wrapped sterile dressings (various sizes)</li>
              <li>Sterile eye pads</li>
              <li>Triangular bandages</li>
              <li>Safety pins</li>
              <li>Disposable gloves (non-latex)</li>
              <li>Sterile wipes and adhesive plasters</li>
              <li>Microporous tape and burn dressings</li>
              <li>Foil blanket and resuscitation face shield</li>
              <li>Clothing shears</li>
            </ul>
            <p>
              <strong>Recording and Reporting</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>All first aid treatment must be recorded in the accident book (BI 510)</li>
              <li>
                Record: date, time, location, casualty details, nature of injury, treatment given
              </li>
              <li>
                GDPR: accident book entries must be individually removable for data protection
              </li>
              <li>
                Electric shock incidents are reportable under RIDDOR if they result in hospital
                treatment
              </li>
              <li>Preserve the scene for investigation (do not disturb equipment)</li>
              <li>Report to your supervisor and H&S manager as soon as possible</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="First Aid Needs Assessment for Electrical Work">
            <p>
              The first aid needs assessment should consider the specific hazards of electrical
              maintenance work. Factors that increase the required level of first aid provision
              include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Nature of work:</strong> HV work, live working, work at height, work in
                remote locations
              </li>
              <li>
                <strong>Hazards:</strong> Risk of electric shock, arc flash, burns, falls
              </li>
              <li>
                <strong>Workforce:</strong> Number of workers, shifts, contractors, lone workers
              </li>
              <li>
                <strong>Location:</strong> Distance from nearest A&E, ambulance response times,
                multi-site working
              </li>
              <li>
                <strong>History:</strong> Previous incidents, near misses, accident trends
              </li>
            </ul>
            <p className="italic text-white">
              <strong>Note:</strong> As an electrical maintenance technician, you are strongly
              encouraged to hold at least an EFAW certificate. Many employers require all electrical
              workers to be first aid trained, given the higher-than-average risk of electrical
              injury. Your knowledge of CPR and AED use could save a colleague's life. First aid
              training must be refreshed every 3 years to remain valid.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              '1. Isolate the supply (do not touch casualty if live)',
              '2. Call 999 / send for help',
              '3. DR ABC primary survey',
              '4. CPR if not breathing (30:2, 100-120/min, 5-6 cm)',
              '5. AED as soon as available',
              '6. All casualties to hospital',
              'Health and Safety (First-Aid) Regulations 1981',
              'Resuscitation Council UK Guidelines',
              'RIDDOR 2013 — reporting requirements',
              'BS 8599-1 — First aid kit contents',
              'HSG85 — Electric shock first aid',
              'ST1426 — Emergency response KSBs',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section6-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Fire Safety and Extinguishers
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section6-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Evacuation Procedures
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section6_2;
