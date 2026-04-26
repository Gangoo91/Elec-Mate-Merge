/**
 * Module 1 · Section 6 · Subsection 1 — First response to electric shock.
 *
 * Unit 201 LO2 alignment:
 *   - AC 2.1: respond to electrical accidents and emergencies on site.
 *
 * Pedagogy:
 *   - Drilled order of operations: ISOLATE → check → call → treat → preserve.
 *   - DR ABC primary survey, recovery position, when to start CPR.
 *   - Cross-references back to §2.1 (shock effects), §5 (safe isolation).
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'First response to electric shock | Level 2 Module 1.6.1 | Elec-Mate';
const DESCRIPTION =
  'The first 60 seconds when a mate gets caught on a live conductor — isolate first, DR ABC, recovery position, when to start CPR. Don’t become casualty number two.';

/* ── Inline check questions (wired into stats/streaks) ──────────────── */

const checks = [
  {
    id: 'first-action-shock-check',
    question:
      'You walk into the cupboard and your second-year is locked onto a live tail. What is your FIRST action?',
    options: [
      'Grab him and pull him clear',
      'Shout for help, then start CPR',
      'Hit the main switch — isolate the supply',
      'Call 999 first and wait for paramedics',
    ],
    correctIndex: 2,
    explanation:
      'Isolation comes before everything. While the current’s flowing, he’s a live conductor. Touching him puts you in the circuit and the supervisor ends up with two casualties instead of one. Drop the supply first, then assess, then call 999.',
  },
  {
    id: 'dr-abc-order-check',
    question: 'In the DR ABC primary survey, what does the first D stand for?',
    options: [
      'Defibrillator — fetch the AED',
      'Danger — make the scene safe before approaching',
      'Diagnose — work out what kind of shock it was',
      'Drugs — check whether they’ve taken anything',
    ],
    correctIndex: 1,
    explanation:
      'D = Danger. Before you touch the casualty, look at the scene. Is the supply still live? Is there a tool resting on the conductor? Is anything going to fall? Make it safe FIRST. Then Response, Airway, Breathing, Circulation.',
  },
  {
    id: 'recovery-position-check',
    question:
      'A casualty is unconscious but breathing normally after a shock. What position do you put them in?',
    options: [
      'Flat on their back, head tilted up',
      'Sitting upright against a wall',
      'Recovery position — on their side, top knee bent forward',
      'Lying face down, head turned to the side',
    ],
    correctIndex: 2,
    explanation:
      'Recovery position keeps the airway open and lets vomit, blood or saliva drain out instead of choking them. On their side, top leg bent at 90°, top arm cushioning the head. Stay with them, monitor breathing, wait for paramedics.',
  },
];

/* ── End-of-page Quiz (wires into stats/streaks) ─────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      'You find a colleague in contact with a live cable, not moving. What sequence of actions is correct?',
    options: [
      'Pull them clear → call 999 → start CPR',
      'Isolate the supply → check breathing → call 999 → CPR if needed',
      'Call 999 → wait for paramedics → don’t touch them',
      'Throw water on the cable to short it out',
    ],
    correctAnswer: 1,
    explanation:
      'Isolate first (no second casualty). Then DR ABC — check response and breathing. Call 999 and say "electrical injury". Start CPR if they’re not breathing normally. Stay with them until paramedics arrive.',
  },
  {
    id: 2,
    question: 'What do you tell the 999 operator FIRST about an electrical incident?',
    options: [
      'Just give the address and hang up',
      'Say it’s an electrical injury and confirm the supply is now isolated',
      'Try to describe the cable type',
      'Wait for them to ask questions',
    ],
    correctAnswer: 1,
    explanation:
      'Telling them it’s an electrical injury changes the response — paramedics bring cardiac monitoring because heart rhythm issues can develop hours later. Confirming isolation tells them it’s safe to enter the scene.',
  },
  {
    id: 3,
    question: 'Why is "isolate first, treat second" drilled into every electrician from day one?',
    options: [
      'It looks more professional',
      'A live casualty is a live conductor — touch them and you join the circuit',
      'It’s in the company handbook',
      'Paramedics insist on it',
    ],
    correctAnswer: 1,
    explanation:
      'Current keeps flowing through them as long as the supply’s on. Touch them and the current finds a new path through you too. Two casualties, twice the rescue, half the chance. Isolate first — every time.',
  },
  {
    id: 4,
    question:
      'You can’t safely reach the isolation point — the casualty is hung up on a HV overhead line. What now?',
    options: [
      'Use a metal pole to push them off',
      'Pour water to short it out',
      'Stay back, call 999 and the DNO, do not approach until the line is confirmed dead',
      'Climb up and try to free them',
    ],
    correctAnswer: 2,
    explanation:
      'HV is not yours to isolate. Step voltages around a fallen line can kill you metres away. Stay back at least 10 m, call 999 and the DNO (national emergency: 105). The line stays live until the DNO confirms otherwise.',
  },
  {
    id: 5,
    question: 'How often do you give chest compressions during adult CPR?',
    options: [
      'About 30 per minute',
      '60 per minute, in time with your watch',
      '100–120 per minute, depth around 5–6 cm',
      'As fast as you can, no rhythm needed',
    ],
    correctAnswer: 2,
    explanation:
      '100–120 compressions per minute, 5–6 cm deep, on the centre of the chest. Standard CPR ratio is 30 compressions then 2 rescue breaths if you’re trained. Hands-only CPR is fine if you’re not — keep going until paramedics take over.',
  },
  {
    id: 6,
    question: 'Why use the recovery position for an unconscious casualty who IS breathing?',
    options: [
      'It looks more comfortable',
      'It keeps the airway clear and lets fluids drain so they don’t choke',
      'It restarts the heart',
      'It speeds up recovery time',
    ],
    correctAnswer: 1,
    explanation:
      'On their back they can choke on vomit, blood or their own tongue. On their side, gravity keeps the airway open and drains anything in the mouth. Top leg bent stops them rolling onto their face.',
  },
  {
    id: 7,
    question:
      'A mate took a shock through one hand, jumped clear, and says they feel fine. What do you do?',
    options: [
      'Send them back to work — no harm done',
      'Get them checked at hospital, even if they say they’re fine',
      'Just write it in the accident book',
      'Tell them to go home and rest',
    ],
    correctAnswer: 1,
    explanation:
      'Electrical contact can cause cardiac rhythm issues that show up minutes or hours later, plus deep tissue burns under unimpressive skin entry points. Any electric shock that needed isolating gets a hospital check. No exceptions.',
  },
  {
    id: 8,
    question:
      'You’ve treated the casualty, paramedics have taken them. What about the scene?',
    options: [
      'Tidy up so the boss doesn’t see it',
      'Get back to work — job has to finish today',
      'Leave the scene as it is, lock off the supply, photograph it, and tell the supervisor',
      'Pull the cable out so it can’t happen again',
    ],
    correctAnswer: 2,
    explanation:
      'Preserve the scene. The investigation needs to see what happened — what was energised, what isolation was in place, where tools were resting. Lock off the supply so nobody re-energises anything. Photos help the report later.',
  },
];

/* ── FAQs (apprentice voice) ─────────────────────────────────────────── */

const faqs = [
  {
    question: 'Why can’t I just yank them off the cable — every second counts, right?',
    answer:
      'Because the current is still flowing through them. The moment you grab a live casualty, the current finds a new path through you too. Now there are two unconscious people on the floor and nobody to call 999. Isolating the supply is faster than it feels — you’re talking seconds. Always isolate first.',
  },
  {
    question: 'What if I genuinely cannot isolate the supply?',
    answer:
      'Use something non-conductive and dry — a wooden broom handle, a length of timber, a plastic chair — to break the contact. Never anything damp, never anything metal. If the casualty is on an overhead HV line or a fallen DNO cable, stay back at least 10 m and call 999 and the DNO. Step voltages around a fallen HV line can kill you metres away.',
  },
  {
    question: 'I’ve done my first aid course — how often do I refresh it?',
    answer:
      'HSE-aligned courses (FAW or EFAW) certify you for three years. After that the cert lapses and you’re no longer a "qualified first aider" on the company register. Most decent firms also do an annual half-day refresher to keep the muscle memory in. CPR technique changes — keep up.',
  },
  {
    question: 'Do I have to do CPR if I’m not trained?',
    answer:
      'You’re not legally obliged to, but doing nothing while someone’s in cardiac arrest gives them roughly a 0% chance. Hands-only CPR (no rescue breaths) is what the public is trained on now — push hard, fast, in the centre of the chest, 100–120 a minute. The 999 operator will talk you through it. You can’t make a non-breathing casualty worse.',
  },
  {
    question: 'When does an AED come into the picture?',
    answer:
      'As soon as one’s available. AEDs (defibrillators) detect a shockable rhythm — typically ventricular fibrillation, the rhythm electrical injuries push the heart into. They will not shock a casualty who doesn’t need it, so you cannot harm someone by attaching one. Switch it on, follow the voice prompts, keep doing CPR between shocks. Public AEDs are increasingly common — note where the nearest one is on every site.',
  },
  {
    question: 'Should I ever move the casualty to a "better spot"?',
    answer:
      'Only if the scene is genuinely still dangerous and you cannot make it safe — e.g. a fire’s spreading, the structure is collapsing. Otherwise leave them where they are. Moving casualties without need can make spinal injuries worse, and it disturbs the scene the investigation needs to see.',
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 1 · Section 6 · Subsection 1"
            title="First response to electric shock"
            description="The first 60 seconds when a mate gets caught on a live conductor. Isolate first, DR ABC, recovery position, when to start CPR. Don’t end up as casualty number two."
            tone="emerald"
          />

          <TLDR
            points={[
              "ISOLATE FIRST. While the supply’s on, the casualty is a conductor — touch them and you join the circuit. Drop the breaker, then assess.",
              "DR ABC: Danger, Response, Airway, Breathing, Circulation. Same order every time. Don’t skip the D.",
              'Awake-but-shocked still gets hospital. Cardiac rhythm issues can show hours later — don’t let an "I’m fine, mate" talk you out of A&E.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "React correctly when finding a casualty in contact with a live source — isolate, assess, call, treat, preserve.",
              "Apply the DR ABC primary survey in the right order, every time.",
              "Place an unconscious-but-breathing casualty in the recovery position safely.",
              "Recognise when to start CPR and roughly how (rate, depth, ratio).",
              "Know when to use a non-conductive object instead of touching the casualty — and when NOT to (HV / fallen DNO line).",
              "Hand over to paramedics with a clean scene and the right information.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this is the first thing in section 6</ContentEyebrow>

          <ConceptBlock title="Around 30 UK electrical fatalities a year — most are 230 V, most are at work">
            <p>
              The HSE records around <strong>1,000 electric-shock and burn accidents</strong> at
              UK workplaces every year, and roughly <strong>30 of those are fatal</strong>.
              Almost all of them happen at "low" voltage — 230 V single-phase or 400 V
              three-phase, the same supplies an apprentice meets every day. The killer isn’t
              exotic voltages. It’s the everyday stuff handled badly.
            </p>
            <p>
              Section 2 of this module covered what electricity does to a body — the thresholds,
              the burns, the fibrillation. This subsection covers what YOU do in the first sixty
              seconds when it’s already happened. Treat it like fire drill — rehearse the order
              now, so you’re not making it up under pressure later.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The non-negotiable first step</ContentEyebrow>

          <ConceptBlock
            title="Isolate first. Always. Don’t become the second casualty."
            plainEnglish="While the supply is on, the casualty is a live conductor. The current is still finding a path through them. Touch them and the current finds a new path through you. Two casualties, half the chance."
            onSite="Lock-off keys live on the same belt as your VI. If you’re seconds from the main switch, hit it. If you’re not, the nearest MCB or even pulling the plug counts — anything that drops the supply faster wins."
          >
            <p>
              The order of operations the first time you find someone in contact with a live
              source:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Isolate the supply.</strong> Main switch, the relevant MCB, the plug —
                whichever drops it fastest. Lock it off if you’ve got the kit on you. If you
                haven’t, leave a clear warning at the isolation point so nobody flips it back on.
              </li>
              <li>
                <strong>Check for danger before approaching.</strong> Tools resting on the
                conductor? Anything else live nearby? A ladder about to fall? Make the area safe
                before kneeling next to anyone.
              </li>
              <li>
                <strong>DR ABC primary survey.</strong> See the next block. Don’t skip steps,
                don’t do them out of order.
              </li>
              <li>
                <strong>Call 999.</strong> Tell them "electrical injury" — paramedics bring
                cardiac monitoring on that call.
              </li>
              <li>
                <strong>Treat.</strong> Recovery position if breathing, CPR if not. Deal with
                burns once the bigger threats are handled.
              </li>
              <li>
                <strong>Hand over and preserve the scene.</strong> Brief the paramedics, lock
                off the supply, photograph if you can, brief the supervisor. Don’t tidy up.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="HSE — Electricity at Work, general guidance (HSG85)"
            clause="If a person receives an electric shock, the first action is to switch off the supply. Do not touch the casualty until you are certain the supply is off, or use a non-conducting object such as a wooden broom to break the contact."
            meaning={
              <>
                The HSE’s own first-line guidance — drill it into your head so it comes out
                under pressure. The order is supply OFF first, casualty second. If you genuinely
                can’t isolate (HV, fallen line, inaccessible main switch), use a dry,
                non-conducting object to break the contact. Never use anything metal, never
                anything damp.
              </>
            }
            cite="Reference: HSE HSG85 — Electricity at work, safe working practices."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The primary survey</ContentEyebrow>

          <ConceptBlock
            title="DR ABC — five letters, in this order, every time"
            plainEnglish="A simple checklist that works under panic. Danger, Response, Airway, Breathing, Circulation. Don’t freelance — go in order."
          >
            <p>
              DR ABC is the standard UK first-aid primary survey. It works because it forces you
              to deal with the things that kill fastest, first.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>D — Danger.</strong> Look at the scene before you walk in. Is the supply
                isolated? Anything else live? Anything about to fall? If you’re not safe, the
                casualty stops being your problem and you become a second one.
              </li>
              <li>
                <strong>R — Response.</strong> Talk to them. "Can you hear me, mate?" Squeeze
                their shoulder. If they respond — even just groaning — they’re conscious. If
                nothing, they’re unconscious; act accordingly.
              </li>
              <li>
                <strong>A — Airway.</strong> Tilt the head back gently, lift the chin. This
                opens the airway. If anything’s in the mouth (vomit, broken teeth, dentures),
                clear it.
              </li>
              <li>
                <strong>B — Breathing.</strong> Look (chest rising), listen (at the mouth), feel
                (cheek over the mouth). Take 10 seconds to be sure. Agonal gasping — irregular,
                snoring breaths — does NOT count as breathing. That’s a cardiac-arrest sign.
              </li>
              <li>
                <strong>C — Circulation.</strong> If they’re breathing normally → recovery
                position, monitor, call 999. If they’re not breathing or only gasping → start
                CPR, send someone for an AED.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>If they’re breathing</ContentEyebrow>

          <ConceptBlock
            title="Recovery position — the safest place for an unconscious casualty"
            plainEnglish="On their back, an unconscious casualty can choke on vomit, blood, or their own tongue. On their side, gravity keeps the airway clear and drains the mouth."
            onSite="Practise this on a colleague during a quiet hour — once. The first time you do it for real should not be the first time you’ve done it at all."
          >
            <p>The textbook recovery position, step by step:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Kneel beside them. Straighten both legs.</li>
              <li>
                Place the arm nearest you out at right angles to their body, elbow bent, palm up.
              </li>
              <li>
                Bring the other arm across the chest. Place the back of that hand against the
                cheek nearest you and hold it there.
              </li>
              <li>
                With your other hand, grasp the far leg just above the knee and pull it up,
                keeping the foot flat on the floor.
              </li>
              <li>
                Pull on the bent knee to roll the casualty towards you onto their side. Adjust
                so the upper leg is bent at right angles at the hip and knee.
              </li>
              <li>
                Tilt the head back gently to keep the airway open. Check breathing. Stay with
                them until paramedics arrive.
              </li>
            </ol>
            <p>
              If you have to leave them to call 999 (you’re alone, no phone signal nearby),
              recovery position FIRST, then go. Recheck breathing every few minutes — cardiac
              issues can develop after the initial shock.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>If they’re not breathing</ContentEyebrow>

          <ConceptBlock
            title="CPR — the basics that buy time until paramedics arrive"
            plainEnglish="If the casualty is not breathing, or only doing the gasping thing, the heart has stopped. Compressions push blood — and oxygen — round the body. They’re what keeps the brain alive until a defibrillator can re-set the rhythm."
          >
            <p>
              Adult CPR, the way Resuscitation Council UK currently teaches it:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hand placement:</strong> heel of one hand in the centre of the chest
                (lower half of the breastbone). Other hand on top, fingers interlocked.
              </li>
              <li>
                <strong>Depth:</strong> 5–6 cm, straight down. Arms locked, weight over the
                hands.
              </li>
              <li>
                <strong>Rate:</strong> 100–120 compressions per minute. The rhythm of the Bee
                Gees’ "Stayin’ Alive" or Queen’s "Another One Bites the Dust" — both around 103
                bpm.
              </li>
              <li>
                <strong>Ratio:</strong> 30 compressions then 2 rescue breaths if you’re trained
                in rescue breathing. If you’re not, hands-only CPR is fine — keep going.
              </li>
              <li>
                <strong>Don’t stop</strong> unless: the casualty starts breathing normally, a
                defibrillator is being attached, paramedics take over, or you’re too exhausted
                to continue. If there’s another trained person, swap every 2 minutes — proper
                CPR is exhausting.
              </li>
            </ul>
            <p>
              <strong>AED:</strong> if there’s a public-access defibrillator nearby, send
              someone for it. Switch it on, follow the voice prompts, peel the pads, stick them
              where the pictures show, stand clear when it tells you to. AEDs are designed to
              refuse to shock a non-shockable rhythm — you cannot make things worse.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Resuscitation Council UK — Adult Basic Life Support guidelines"
            clause="In adult basic life support, chest compressions should be delivered at a rate of 100–120 per minute and to a depth of 5–6 cm. The compression to ventilation ratio should be 30:2 for trained rescuers; hands-only CPR is appropriate for untrained or inexperienced rescuers."
            meaning={
              <>
                These numbers are the same on every UK first-aid course — FAW, EFAW, school
                citizenship, military. They’re what 999 operators talk people through over the
                phone. Memorise them: <strong>30:2, 5–6 cm, 100–120 bpm</strong>.
              </>
            }
            cite="Reference: Resuscitation Council UK — Adult BLS, current edition."
          />

          <SectionRule />

          <ContentEyebrow>Calling 999</ContentEyebrow>

          <ConceptBlock title="Tell them it’s an electrical injury — it changes the response">
            <p>
              When you call 999, the operator triages the response. "Electrical injury"
              triggers a different protocol from "fall" or "general unwell" — paramedics
              dispatch with cardiac monitoring kit because heart rhythm issues are the most
              dangerous delayed effect of an electric shock.
            </p>
            <p>Give them, in this order:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Location.</strong> Postcode, house number / building name. Site name if
                it’s a construction site. What3Words is great if you’re on a remote site.
              </li>
              <li>
                <strong>Type of injury.</strong> "Electrical injury — adult, casualty was in
                contact with a 230 V supply." Mention "supply now isolated" if it is.
              </li>
              <li>
                <strong>Casualty status.</strong> Conscious / unconscious. Breathing / not
                breathing. Visible burns. Anything else relevant.
              </li>
              <li>
                <strong>Your number.</strong> Stay on the line. They will give you instructions.
                Don’t hang up.
              </li>
              <li>
                <strong>Send a gateway.</strong> If you can spare someone, post them at the gate
                or front door to wave the ambulance in. Saves minutes that matter.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Calling 999 and forgetting to tell them it’s electrical"
            whatHappens={
              <>
                You ring, you give the postcode, you say "he’s collapsed, hurry up". Paramedics
                roll up assuming a faint or a fall. They don’t bring the cardiac monitor up the
                stairs because nobody told them to. The casualty develops an arrhythmia twenty
                minutes later. Critical minutes lost.
              </>
            }
            doInstead={
              <>
                <strong>First sentence to the 999 operator should include "electrical
                injury".</strong> Mention the voltage if you know it. Confirm whether the supply
                is now isolated — paramedics need to know it’s safe to enter the scene. They’ll
                guide you on everything else.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The ones that catch apprentices out</ContentEyebrow>

          <CommonMistake
            title="Touching the casualty before isolating the supply"
            whatHappens={
              <>
                Mate is locked onto a live tail. You see his face go grey. Instinct says grab.
                You grab. The current that’s flowing through him now finds a second path —
                through you, into the floor. You both hit the deck. The third-year who walks in
                a minute later is suddenly looking at two unconscious people and no idea what
                happened.
              </>
            }
            doInstead={
              <>
                The fastest possible action is the ISOLATION, not the rescue. Main switch, MCB,
                plug — whichever is closer. Most CUs are within arm’s reach of the work; most
                socket-fed tools have a plug a metre away. <strong>Touch the SWITCH first, the
                CASUALTY second.</strong>
              </>
            }
          />

          <Scenario
            title="The apprentice slumped against a CU panel, breaker still in"
            situation={
              <>
                You come back from the van with a roll of T&E. Your work-mate is sat on the
                floor in front of an open consumer unit, head against the cabinet, eyes closed,
                screwdriver still in his hand. The cover’s off. The main switch is up — supply
                is still on. You can’t tell from the doorway whether he’s actually in contact
                with anything live.
              </>
            }
            whatToDo={
              <>
                <strong>Don’t walk in to "check" first.</strong> From the doorway, hit the main
                switch (right there in the unit, top of the bank). Take a breath. NOW go in. DR
                ABC — danger (supply off, no other live parts), response (talk to him, squeeze
                shoulder), airway, breathing. If breathing → recovery position. If not → CPR,
                shout for someone to call 999 and grab the AED. Tell the operator:
                "<em>electrical injury, 230 V, supply now isolated, casualty unconscious</em>".
                When paramedics arrive, leave the scene as you found it (post-isolation), brief
                them, brief the supervisor. Burns get treated by the paramedic — you don’t need
                to start picking at them.
              </>
            }
            whyItMatters={
              <>
                Hand-to-hand across the chest at 230 V is the textbook fibrillation path. The
                person who turns up second is the one who decides whether it stays at one
                casualty or becomes two. You earn your place on site by being the
                second-in who gets it right.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>After the dust settles</ContentEyebrow>

          <ConceptBlock title="Hand-over, RIDDOR, and the bit nobody talks about">
            <p>
              Once the casualty is in safe hands and the scene is locked off, the job changes
              shape. Don’t go back to the work. Things that have to happen:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tell the supervisor / site manager immediately.</strong> They start the
                accident book entry and decide whether RIDDOR applies (covered in §6.3).
              </li>
              <li>
                <strong>Preserve the scene.</strong> Lock-off stays in place. Photograph
                everything before anyone touches it — the test instruments used, the lock-off
                kit (or lack of), the cable ends, the screwdriver, the labels.
              </li>
              <li>
                <strong>Write down what you saw and did.</strong> Times, names, who said what.
                Memory fades fast and fades wrong. A page of notes the same day is worth a
                thousand recollections a fortnight later.
              </li>
              <li>
                <strong>Look after yourself.</strong> Watching a colleague go down isn’t
                nothing. Many firms now have access to confidential mental-health support — use
                it if you need to. There’s no medal for bottling it up.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "ISOLATE FIRST. While the supply’s on, the casualty is a conductor — don’t touch them.",
              "DR ABC: Danger, Response, Airway, Breathing, Circulation. Same order, every time.",
              "Recovery position keeps an unconscious-but-breathing casualty’s airway clear and lets fluids drain.",
              "CPR: 100–120 per minute, 5–6 cm deep, 30:2 if trained, hands-only if not. Don’t stop until handover.",
              "Tell 999 it’s an electrical injury — paramedics bring cardiac monitoring on that call.",
              "Awake-but-shocked still goes to hospital. Lock off the supply, preserve the scene, brief the supervisor.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="First response to electric shock — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section5/5-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Common isolation mistakes
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section6/6-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                First aid for electrical injuries
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
