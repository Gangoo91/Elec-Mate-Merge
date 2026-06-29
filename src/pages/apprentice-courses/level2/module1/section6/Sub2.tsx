/**
 * Module 1 · Section 6 · Subsection 2 — First aid for electrical injuries.
 *
 * Unit 201 LO2 / LO3 alignment:
 *   - AC 2.1: respond to electrical accidents and emergencies on site.
 *   - AC 3.5: know the equipment and procedures used in workplace first aid.
 *   - AC 3.6: do not misuse first aid kits / equipment; replace what you use.
 *
 * Pedagogy:
 *   - Burns (cool, cover, don’t pop / cream / pick).
 *   - Arc eye / flash burn — eyes are the most underestimated electrical injury.
 *   - AED — what it is, when to use, why you can’t harm someone with one.
 *   - Cardiac arrhythmia — the delayed killer that mandates a hospital check.
 *   - **EXPLICIT AC 3.6 handling**: don’t raid the first aid box for a dirty
 *     knee; replace anything used; never administer untrained; the weekly /
 *     monthly first aid check rota.
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
  'First aid for electrical injuries | Level 2 Module 1.6.2 | Elec-Mate';
const DESCRIPTION =
  'Burns, arc eye, AED, cardiac arrhythmia — the actual treatment for the things electricity does to a body. Plus the don’t-misuse rules every first aid box runs on.';

/* ── Inline check questions (wired into stats/streaks) ──────────────── */

const checks = [
  {
    id: 'burns-cooling-time-check',
    question:
      'You’ve cooled an electrical burn under cool running water for 5 minutes — the casualty says it feels better, can you stop?',
    options: [
      'Yes — once the pain has eased the deeper tissue has stopped being damaged',
      'Yes — but only if you then smear on a layer of burn cream to seal it',
      'No — cool burns under running water for at least 20 minutes, even if it feels better',
      'No — but switch to ice once the first five minutes are up',
    ],
    correctIndex: 2,
    explanation:
      '20 minutes minimum, ideally with cool tap water — not ice, not freezing water. Heat keeps damaging tissue for ages after the source is gone. Stopping early lets the deep tissue keep cooking. After 20 min, cover with cling film or a non-fluffy sterile dressing.',
  },
  {
    id: 'aed-rhythm-check',
    question: 'When will an AED actually deliver a shock?',
    options: [
      'The nominal voltage at which the device is designed to operate',
      'Only when it detects a shockable rhythm like ventricular fibrillation',
      'To prevent cable insulation damage and meet workmanship standards',
      'Close the day: review completed work, capture loose ends, preview tomorrow',
    ],
    correctIndex: 1,
    explanation:
      'AEDs are smart — they analyse the rhythm and only shock VF or pulseless VT. If the heart’s in any other state (asystole, normal rhythm, pulseless electrical activity), the AED refuses. You literally cannot make things worse by attaching one.',
  },
  {
    id: 'first-aid-misuse-check',
    question:
      'You scrape your hand on a piece of trunking — there’s a small graze, no bleed. The first aid box is on the wall. What’s the right call?',
    options: [
      'Take a couple of plasters and a dressing for the van in case you need them later',
      'Leave it — only a trained first aider is allowed to open the kit at all',
      'Wash the graze under the tap, dry it, use ONE plaster, and tell the first aider you used one so it gets replaced',
      'Smear some antiseptic cream from the kit on it and carry on working',
    ],
    correctIndex: 2,
    explanation:
      'Use what you need (one plaster), don’t over-help yourself, and TELL THE FIRST AIDER. The box gets checked monthly and contents get replaced when they’re used. Quietly raiding it for non-medical jobs (taping a cable, plastering up a tatty pair of safety glasses) means it’s empty when someone’s actually bleeding.',
  },
];

/* ── End-of-page Quiz (wires into stats/streaks) ─────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'How should you cool a fresh electrical burn?',
    options: [
      'Pack it with ice for five minutes to numb the pain quickly',
      'Cool running water for at least 20 minutes, then cover loosely',
      'Smother it with burn cream and wrap it tightly to seal it',
      'Dab it with antiseptic and cover with a cotton-wool pad',
    ],
    correctAnswer: 1,
    explanation:
      'Cool tap water for at least 20 min — it stops the heat from continuing to damage tissue underneath. Don’t use ice (vasoconstriction makes things worse). Don’t apply creams or fats (lock in heat). Cover loosely with cling film or non-fluffy dressing afterwards.',
  },
  {
    id: 2,
    question:
      'What is "arc eye" and how does it present?',
    options: [
      'A retinal burn from the infrared flash that causes instant permanent blindness',
      'A chemical burn to the eye from electrolyte splashing out of a battery',
      'Inflammation of the cornea from UV exposure during an arc flash, with symptoms appearing 4–12 hours later',
      'A bruise to the eye socket caused by the blast wave of an arc flash',
    ],
    correctAnswer: 2,
    explanation:
      'Arc eye (photokeratitis) is essentially sunburn of the cornea from the UV in an arc flash or welding arc. Symptoms — gritty feeling, watering, pain, light sensitivity — show up 4–12 hours after exposure, often catching the casualty off-shift. Cool compresses, dark room, A&E. It usually heals in 24–72 hours.',
  },
  {
    id: 3,
    question:
      'A casualty had a 230 V shock, jumped clear, says they feel fine. The next day they collapse. What likely killed them?',
    options: [
      'A deep internal burn that became infected overnight',
      'Delayed concussion from hitting their head as they jumped clear',
      'Slow blood loss from an entry wound that looked minor',
      'Cardiac arrhythmia developing hours after the shock',
    ],
    correctAnswer: 3,
    explanation:
      'Electric current can disrupt the heart’s electrical system in ways that don’t show on a basic survey. Arrhythmias can develop minutes to hours after the original shock. This is why every electric-shock casualty gets a hospital check, even one who jumps up and says they’re fine.',
  },
  {
    id: 4,
    question: 'Which of these belongs in a workplace first aid kit?',
    options: [
      'Sterile dressings, plasters, eyewash, gloves, foil blanket, scissors',
      'Implementing a permit to work system for HV switching',
      'In locations with sleeping accommodation and high fire risk locations',
      '"Complete weekly planning every Friday 4-4:30pm for the next 3 months"',
    ],
    correctAnswer: 0,
    explanation:
      'Workplace first aid kits hold sterile dressings, plasters, eyewash, gloves, a foil blanket, scissors and similar passive items. They do NOT hold medications — pills, creams, ointments. That’s a legal limit, not a budget thing: dispensing medication needs medical training.',
  },
  {
    id: 5,
    question:
      'You used the eyewash bottle on Tuesday for a small splash. What should happen next?',
    options: [
      'Top the same bottle back up from the tap and put it back on the wall',
      'Tell the appointed first aider so the bottle is replaced before the next person needs it',
      'Nothing — eyewash bottles are refilled automatically at the monthly audit',
      'Reseal the cap and keep it for the next splash since most of it is left',
    ],
    correctAnswer: 1,
    explanation:
      'AC 3.6 in plain English: when you USE something from the first aid kit, you REPLACE it. Eyewash is single-use and must be discarded once opened. Tell the first aider, sign the replenishment log if there is one. The next person to need it can’t wait while someone runs to a pharmacy.',
  },
  {
    id: 6,
    question: 'What must NEVER be put on a fresh burn?',
    options: [
      'Cool running water',
      'Cling film loosely wrapped after cooling',
      'Butter, toothpaste, oils, fluffy dressings, ice',
      'A foil blanket to keep the casualty warm elsewhere',
    ],
    correctAnswer: 2,
    explanation:
      'Old wives’ tales kill. Butter and toothpaste lock in heat. Ice causes deep frostbite damage on top of the burn. Fluffy dressings stick to the wound and tear tissue when removed. Stick to: cool water → loose non-stick cover → A&E.',
  },
  {
    id: 7,
    question:
      'You’re trained in EFAW. Your supervisor asks you to give a colleague a paracetamol from the first aid box. What do you do?',
    options: [
      'Give it — you hold a current EFAW certificate so you are covered',
      'Give it, but only one tablet and note it in the accident book',
      'Give it if the colleague confirms they have taken paracetamol before',
      'Refuse — paracetamol is not in a workplace first aid kit, and you’re not trained to administer medication',
    ],
    correctAnswer: 3,
    explanation:
      'Paracetamol shouldn’t be in the workplace kit in the first place. Even if it is (someone left it there), you’re not authorised to dispense medication. The colleague can buy their own from a shop. AC 3.6 — never administer something you’re not trained for, even if asked.',
  },
  {
    id: 8,
    question:
      'How often should the workplace first aid kit be checked, by whom?',
    options: [
      'Weekly visual check by the appointed first aider, monthly full audit, plus immediate top-up after any use',
      'Once a year by an external first-aid contractor, with no checks in between',
      'Only when someone notices an item is missing during an emergency',
      'Daily by every worker before they start, signed off on the job sheet',
    ],
    correctAnswer: 0,
    explanation:
      'Weekly quick check (seal intact, contents present), monthly full audit against the contents list, and immediate top-up after any use. Items have expiry dates — sterile dressings, eyewash, AED pads. A box full of expired kit is worse than an empty one because it gives false confidence.',
  },
];

/* ── FAQs (apprentice voice) ─────────────────────────────────────────── */

const faqs = [
  {
    question: 'Why 20 minutes of cooling for a burn? Feels like overkill.',
    answer:
      'Heat doesn’t stop damaging tissue the moment the source is gone. The deep layers of skin keep cooking for several minutes after surface contact ends, and 20 min of cool water is the threshold the NHS and British Burn Association use to halt that process. Less than 20 min and you’re leaving deep damage running. More than 20 min and you risk hypothermia in a cold environment — so cool the burn, keep the rest of the casualty warm with a foil blanket if needed.',
  },
  {
    question: 'What about chemical burns from battery acid or capacitor electrolyte?',
    answer:
      'Brush off any dry chemical first if you can do it without getting it on you (gloves). Then flood with copious cool water for at least 20 min — same as a thermal burn. Don’t try to neutralise (acid + alkali = exothermic = more burn). For eyes, eyewash bottle or running tap, lower lid pulled away, water from inner corner outwards. Hospital after, every time.',
  },
  {
    question: 'I’ve seen people put ice on burns — why not?',
    answer:
      'Ice causes vasoconstriction (blood vessels squeeze shut), which actually makes the burn deeper because the body can’t flush damaged cells away with blood flow. It can also cause a frostbite injury on top of the original burn. Cool tap water (around 8–25°C) is the sweet spot — cold enough to halt damage, warm enough not to cause new injury.',
  },
  {
    question: 'Can I attach an AED to anyone — including kids?',
    answer:
      'Adult AED pads are for ages 8 and up. Most modern AEDs have a child mode (smaller pad placement diagram + reduced energy) for under-8s; if not, use adult pads but place one on the front of the chest and one on the back. Pregnant women — yes, normal placement. Casualty in water — drag them clear and dry the chest before applying pads. Casualty with a pacemaker — place the pad at least an inch away from the lump.',
  },
  {
    question: 'My EFAW certificate is from two and a half years ago. Am I still a first aider?',
    answer:
      'Technically yes until the three-year mark, but HSE strongly recommends an annual half-day refresher between certs. Skills decay fast — CPR depth, AED steps, recovery position. Don’t rely on what you remember from a 5-day course three years ago. Ask the boss when the next refresher is.',
  },
  {
    question: 'What if there’s no first aider on site?',
    answer:
      'There has to be at least an "appointed person" (someone who calls 999 and looks after the kit). For higher-risk sites or larger crews, a trained first aider is required — the company’s First Aid Needs Assessment decides numbers. If you’re ever on a site with neither, that’s a Health and Safety (First-Aid) Regulations 1981 breach. Flag it in writing.',
  },
];

export default function Sub2() {
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
            eyebrow="Module 1 · Section 6 · Subsection 2"
            title="First aid for electrical injuries"
            description="Burns, arc eye, AED, cardiac arrhythmia — what actually goes wrong with a body after current passes through it, and the right treatment for each. Plus the rules every first aid box runs on."
            tone="emerald"
          />

          <TLDR
            points={[
              "Cool electrical burns under cool running water for at least 20 minutes. No ice, no creams, no butter, no fluffy dressings.",
              "Arc eye shows up 4–12 hours after the flash. If you’ve been near an arc, you need an A&E check the same day, not the next.",
              "AEDs are idiot-proof and refuse to shock anyone who doesn’t need one. If there’s one nearby and someone’s not breathing, attach it.",
              "First aid kit is for first aid. Don’t raid it for non-medical jobs. Replace anything you use. Never give medication you’re not trained for.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Treat thermal, contact and arc burns correctly — cool, cover, transport.",
              "Recognise and treat arc eye / flash burn, including the delayed onset.",
              "Use an AED safely on an adult casualty in cardiac arrest.",
              "Explain why every electric-shock casualty gets a hospital check, even when they say they’re fine.",
              "List what does and doesn’t belong in a workplace first aid kit, and what the appointed first aider is for.",
              "Apply the AC 3.6 rule: don’t misuse first aid supplies; replace what you use; don’t administer beyond your training.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The four classic injuries from current</ContentEyebrow>

          <ConceptBlock title="Burns, arc eye, secondary trauma, and the cardiac one nobody sees coming">
            <p>
              Electric current does damage in more than one way. A single incident can leave a
              casualty with several different injuries, each needing different first aid:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Thermal / contact / internal burns</strong> — at the entry/exit points
                of the current path. Often look minor on the surface, much worse underneath.
              </li>
              <li>
                <strong>Arc eye and flash burns</strong> — UV and infrared radiation from an arc
                flash. Eyes and any exposed skin in direct line of the arc.
              </li>
              <li>
                <strong>Secondary trauma</strong> — falls, impact, cuts. The shock makes them
                jump, jerk or pass out — they hit the floor, the scaffold, the bench. Concussion
                and broken bones aren’t rare.
              </li>
              <li>
                <strong>Cardiac arrhythmia</strong> — the heart’s rhythm thrown off by current
                across the chest. Can be immediate (fibrillation, cardiac arrest) or delayed
                (irregular rhythm developing minutes to hours later).
              </li>
            </ul>
            <p>
              §2.1 covered the physiology — what current does to nerves, muscle and the heart.
              This subsection covers the practical first aid for each injury type.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Burns — the right way</ContentEyebrow>

          <ConceptBlock
            title="Cool, cover, casualty — in that order"
            plainEnglish="The two things you need to remember are the time (at least 20 minutes of cool running water) and the things you must NEVER put on a burn."
            onSite="Most sites have a wash station within reach. If not, a thermos of cool water from the van will do the first few minutes while someone gets to a tap. Time matters more than perfect kit."
          >
            <p>The burn protocol every UK first-aider uses:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stop the source.</strong> If clothing is on fire, smother it (foil
                blanket, jacket, drop and roll). If it’s an electrical contact burn, the supply
                is already isolated by now — don’t skip back to a live source.
              </li>
              <li>
                <strong>Cool the burn under cool running water for at least 20 minutes.</strong>
                Cool tap water — not cold, not iced. If clothing is stuck to the burn, leave it
                — cool through the fabric. Don’t peel.
              </li>
              <li>
                <strong>Remove jewellery and tight clothing</strong> from around the burn area
                (not from the burn itself). Burns swell. A ring on a burned finger becomes a
                tourniquet within minutes.
              </li>
              <li>
                <strong>Cover loosely</strong> with cling film (loose, not wrapped tight) or a
                clean, non-fluffy sterile dressing. Cling film is brilliant: see-through (the
                paramedic can assess without lifting), non-stick, and it holds in moisture.
              </li>
              <li>
                <strong>Keep the rest of the casualty warm</strong> — foil blanket round the
                shoulders if needed. Cooling a big burn for 20 min can drop their core
                temperature, especially in winter.
              </li>
              <li>
                <strong>Hospital.</strong> Any electrical burn, any burn bigger than the
                casualty’s palm, any burn to the face / hands / feet / genitals, any burn on a
                child or elderly casualty — A&E. Same applies if there’s any doubt about depth.
              </li>
            </ol>
            <p>
              <strong>Never put on a burn:</strong> butter, oils, toothpaste, antiseptic creams,
              ointments, ice, fluffy dressings (cotton wool especially). All of them either lock
              in heat, cause secondary damage, or stick to the wound and tear tissue when
              removed.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="British Burn Association — First aid for burns position statement"
            clause="Cool the burn with cool or lukewarm running water for 20 minutes. Do not use ice, iced water or any creams or greasy substances such as butter."
            meaning={
              <>
                The 20-minute number is not folklore — it’s the duration the BBA and NHS use as
                the cut-off below which deep tissue damage is statistically worse. Memorise it.
                It’s the same for thermal, electrical, chemical and friction burns: <strong>20
                minutes minimum</strong>.
              </>
            }
            cite="Reference: British Burn Association — First Aid Position Statement."
          />

          <CommonMistake
            title="Treating an electrical burn like a kitchen burn and missing the deep damage"
            whatHappens={
              <>
                Casualty took a shock — small black entry mark on the palm, looks no worse than
                a kettle burn. You cool it for a couple of minutes, slap on a plaster, send him
                back to work. Hours later he can’t move his hand — the muscle along the
                current’s path has been cooked from the inside, and the tissue is starting to
                swell against the tendons.
              </>
            }
            doInstead={
              <>
                Any electrical burn, however small the entry mark, gets the full 20-minute
                treatment AND a hospital check. Internal damage from current flowing through
                tissue can be invisible at the skin surface — A&E can do bloods (CK, troponin)
                to spot muscle and cardiac damage. Don’t guess.
              </>
            }
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The eye one apprentices forget</ContentEyebrow>

          <ConceptBlock
            title="Arc eye — sunburn of the cornea"
            plainEnglish="When a power-arc flash goes off, it puts out a wash of UV light same as a welding arc. That UV burns the cornea — the front layer of the eye. The pain doesn’t hit until 4–12 hours later, often after you’ve gone home."
            onSite="If you saw an arc flash with your naked eye — even a quick one — get an A&E check the same day, before symptoms start. Tell them how far away you were and how long the flash lasted. Don’t wait until it hurts at midnight."
          >
            <p>
              Arc eye (photokeratitis) presents like extreme grit-in-the-eye pain, with watering,
              redness, painful light sensitivity, and a feeling that something’s scratching the
              eyeball every time you blink. It’s temporary in most cases (24–72 hours) but it’s
              agony, and it’s easily complicated by infection.
            </p>
            <p>First aid for suspected arc eye:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cool, damp cloths over closed eyes — eases pain.</li>
              <li>Dark room, no screens, no driving.</li>
              <li>
                Don’t rub — even when it feels gritty, there’s nothing physical in there to
                rub out. You’ll just damage the cornea further.
              </li>
              <li>A&E or out-of-hours GP — they’ll prescribe lubricating drops and anaesthetic eye drops, and rule out anything more serious.</li>
              <li>
                Recovery is usually full and within a few days. But repeated arc-eye episodes
                cause cumulative damage — that’s why arc-flash PPE includes face shields rated
                for arc, and why you don’t look at switchgear racking with the naked eye.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The defibrillator question</ContentEyebrow>

          <ConceptBlock
            title="AED — what it is, what it does, why you can’t do harm with one"
            plainEnglish="An Automated External Defibrillator analyses the heart’s rhythm. If it sees a shockable rhythm (mainly ventricular fibrillation — VF — or pulseless ventricular tachycardia), it delivers a controlled shock to reset the rhythm. If the heart isn’t in a shockable state, the AED simply refuses to shock."
            onSite="Public-access AEDs are everywhere now — train stations, shopping centres, bigger sites. The location of the nearest one is something every site brief should cover. If it’s not, ask."
          >
            <p>How to use an AED on an adult in cardiac arrest:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Switch it on.</strong> The voice prompt starts immediately. Listen and
                follow.
              </li>
              <li>
                <strong>Bare the casualty’s chest.</strong> Cut clothing if you have to. Dry the
                skin if it’s wet. Shave excessive chest hair if there’s a razor in the kit
                (most have one).
              </li>
              <li>
                <strong>Place the pads</strong> exactly where the diagrams on the pads show:
                one on the upper-right chest below the collar bone, one on the lower-left side
                below the armpit. The pad images are foolproof.
              </li>
              <li>
                <strong>Stand clear when the AED says to.</strong> "Analysing rhythm — do not
                touch the casualty." Look up, hands off, sweep nearby people back.
              </li>
              <li>
                <strong>If a shock is advised: "Stand clear, shock now."</strong> Press the
                shock button if it’s a semi-automatic. Fully-automatic AEDs deliver the shock
                themselves.
              </li>
              <li>
                <strong>Resume CPR immediately</strong> after the shock — 30:2 — until the AED
                analyses again (every 2 minutes). Don’t stop unless paramedics arrive, the
                casualty starts breathing, or the AED tells you to.
              </li>
            </ol>
            <p>
              Cardiac arrest from electric shock is most often a shockable rhythm — VF caused
              by current crossing the heart. Of all causes of out-of-hospital cardiac arrest,
              electrically-induced VF has one of the better survival rates IF an AED arrives
              fast. Time matters more than anything: every minute without defibrillation drops
              survival roughly 10%.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Resuscitation Council UK — AED guidelines (Adult)"
            clause="Once the AED is attached and switched on it will give voice prompts that should be followed. Provide CPR continuously until the AED is ready to analyse, and resume CPR immediately after any shock unless the casualty starts to wake."
            meaning={
              <>
                The headline: AEDs hand-hold you through it. You don’t need to know the rhythms,
                you don’t need to make any clinical decisions. Switch it on, follow the voice,
                push the button when told, restart CPR. Children, pregnant women, casualties
                with pacemakers — there are minor placement adjustments but the basic protocol
                doesn’t change.
              </>
            }
            cite="Reference: Resuscitation Council UK — Adult Basic Life Support, current edition."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The delayed killer</ContentEyebrow>

          <ConceptBlock
            title="Cardiac arrhythmia — why awake-but-shocked still goes to hospital"
            plainEnglish="Even when current doesn’t cause cardiac arrest on the spot, it can leave the heart’s electrical system in a fragile state. An irregular rhythm can develop minutes, hours, or occasionally days later — sometimes fatal."
          >
            <p>
              The reason every electric-shock casualty gets a hospital check, no exceptions, is
              this: current that crossed the chest can damage the cardiac conduction system
              without an immediate visible effect. The heart compensates, then later the rhythm
              destabilises. A&E will run an ECG, often hold the casualty for observation, and
              do bloods to check for muscle damage along the current path.
            </p>
            <p>
              <strong>Don’t accept "I’m fine" as a clinical opinion.</strong> Casualties who walk
              away from a shock are routinely admitted overnight — that’s normal practice, not
              an over-reaction. The cost of a few hours’ observation is nothing compared to what
              happens if you send them home and they collapse on the M6 at 3 a.m.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The first aid box rules — explicit</ContentEyebrow>

          <ConceptBlock
            title="What goes in a workplace first aid kit (and what does NOT)"
            plainEnglish="Workplace first aid kits hold passive supplies — dressings, plasters, eyewash, gloves, foil blanket, scissors. They do NOT hold medication. That’s a legal limit, not a budget thing."
            onSite="The British Standard BS 8599-1 sets the minimum contents for small/medium/large workplace kits. Most decent firms also add an AED and a bigger eyewash bottle for outdoor work."
          >
            <p>A typical BS 8599-1 medium workplace kit holds:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sterile dressings (medium and large)</li>
              <li>Plasters (assorted, hypoallergenic)</li>
              <li>Triangular bandages</li>
              <li>Conforming bandages</li>
              <li>Eyewash bottles (sealed, 250 ml minimum, single-use)</li>
              <li>Sterile saline pods or eye pads</li>
              <li>Disposable gloves (multiple pairs)</li>
              <li>Foil survival blanket</li>
              <li>Burn dressings (hydrogel)</li>
              <li>Scissors, tape, safety pins</li>
              <li>Resuscitation face shield</li>
              <li>First aid guidance leaflet</li>
            </ul>
            <p>
              <strong>What does NOT go in:</strong> any oral medication (paracetamol, ibuprofen,
              aspirin, antihistamines), any cream (antiseptic, antibiotic, hydrocortisone), any
              eye drops, any inhalers, any medical adhesive sprays. None of it. Workplace
              first-aiders are not authorised to dispense medication.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety (First-Aid) Regulations 1981 — Regulation 3"
            clause="An employer shall provide, or ensure that there is provided, such equipment and facilities as are adequate and appropriate in the circumstances for enabling first-aid to be rendered to his employees if they are injured or become ill at work."
            meaning={
              <>
                The boss has to provide the kit, the trained first-aider (or appointed person),
                and the time/space to use them. The HSE’s First Aid at Work guidance (L74)
                takes the regulation and turns it into practical numbers — kit contents, first
                aider:headcount ratios, low/high-risk categorisation. Your boss does a First
                Aid Needs Assessment to size all of that for the workplace.
              </>
            }
            cite="Reference: Health and Safety (First-Aid) Regulations 1981; HSE L74 ACOP."
          />

          <ConceptBlock
            title="Don’t misuse it. Don’t over-help yourself. Replace what you use."
            plainEnglish="The first aid kit is for first aid — actual injuries. Not for the bits and bobs you might want to fix elsewhere. Use what’s needed, then tell the first aider so it gets replaced before the next emergency."
            onSite="The classic apprentice trap: scrape your knuckle on a blade, fancy a plaster, raid the box. No big deal — until the next person turns up with a bleed and the box is a sad collection of empty wrappers."
          >
            <p>
              The four-rule version of AC 3.6 — what every apprentice needs to internalise
              about the kit:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Don’t raid it for non-medical jobs.</strong> Need tape for a cable? Use
                proper tape. Need cling film for lunch? Buy a roll. The kit is for injuries.
              </li>
              <li>
                <strong>Use only what you need.</strong> One plaster for one cut, not three
                "in case". Don’t take the whole pack of dressings back to the van.
              </li>
              <li>
                <strong>Tell the first aider when you’ve used something.</strong> They keep a
                stock list and order replacements monthly. If they don’t know you used it, the
                box is short next time.
              </li>
              <li>
                <strong>Never administer something you’re not trained for.</strong> Even if a
                colleague asks for it. Even if it seems harmless. Painkillers, eye drops, sting
                creams — not your job, not your liability. Point them at a pharmacy.
              </li>
            </ol>
            <p>
              <strong>The check rota every site should run:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>After every use</strong> — restock immediately. Don’t leave it for "the
                end of the day".
              </li>
              <li>
                <strong>Weekly</strong> — appointed first aider does a 30-second look: tamper
                seal intact, contents present, nothing obviously expired.
              </li>
              <li>
                <strong>Monthly</strong> — full audit against the BS 8599-1 contents list,
                expiry dates checked (eyewash, sterile dressings, AED pads all have shelf
                lives).
              </li>
              <li>
                <strong>Annually</strong> — replace the whole kit if it’s been heavily used or
                stored in a hot/damp environment (van in summer, outside cabin in winter).
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Quietly using the eyewash bottle and not telling anyone"
            whatHappens={
              <>
                You catch a flake of paint in your eye on Tuesday. Pop the eyewash bottle, flush
                it out, feel better, get on with the job. Don’t mention it. On Friday a labourer
                takes a face-full of plaster dust — eyes streaming, already going red. He
                fumbles for the bottle. It’s empty. By the time someone runs to a chemist, the
                damage is worse than it had to be.
              </>
            }
            doInstead={
              <>
                <strong>Tell the first aider every single time you use anything.</strong> One
                plaster. One dressing. The eyewash. The cling film. Doesn’t matter if it feels
                trivial — the kit can’t restock itself, and the next person to need it might be
                in a worse state than you were.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <Scenario
            title="Two casualties, one kit — and a cling film roll"
            situation={
              <>
                A junior labourer takes a flash from a switchgear cabinet — small contact burn
                on the palm, plus he’s rubbing his eyes complaining the light has gone funny.
                You’ve already isolated the supply, called 999 and put him on a chair. You’re
                the only EFAW on site and the kit is the standard medium BS 8599-1 box on the
                wall.
              </>
            }
            whatToDo={
              <>
                Burn first — sink, cool tap water, palm under the flow for 20 minutes. Don’t
                put anything on it. While he’s under the tap, the eye complaint worries you
                more — flash, hours-later onset of pain is classic arc eye. Cool damp cloth
                over closed eyes (gauze + saline pod from the kit), darken the room. After
                20 minutes, cover the burn loosely with cling film from the kit (or kitchen
                roll wrapped in cling film if you’re short). Foil blanket round his shoulders
                so he doesn’t go cold. Brief paramedics on arrival: 230 V flash, contact burn
                to right palm, suspected arc eye, fully conscious, GCS 15. Hand over. Then
                tell the appointed first aider what you used — at minimum: eyewash pod, cling
                film, hydrogel burn dressing, saline pod. They’ll restock before close of
                business.
              </>
            }
            whyItMatters={
              <>
                One incident, three injuries (burn + arc eye + the hidden cardiac risk that
                forces the hospital trip). Each gets its own first aid. The kit handles all
                three IF it’s been kept stocked. AC 3.6 in action: if the previous apprentice
                had quietly used the eyewash on Tuesday and not told anyone, the labourer’s eye
                gets nothing.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Burns: cool running water 20 min minimum. Cling film loose afterwards. No ice, no creams, no butter, no fluffy dressings.",
              "Arc eye is delayed (4–12 hours). Same-day A&E if you saw an arc with the naked eye, before symptoms start.",
              "AEDs are idiot-proof and can’t shock a non-shockable rhythm. If one’s nearby, attach it.",
              "Cardiac arrhythmia can develop hours after the original shock — every electric-shock casualty gets a hospital check.",
              "First aid kit holds dressings, plasters, eyewash, gloves, foil blanket — NOT medication. AC 3.6: don’t raid it; replace what you use; never administer beyond your training.",
              "Check rota: after-use restock, weekly visual, monthly audit, annual full replace if heavily used.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="First aid for electrical injuries — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section6/6-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                First response to electric shock
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section6/6-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                RIDDOR — what must be reported
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
