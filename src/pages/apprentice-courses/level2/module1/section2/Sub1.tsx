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
  'Electric shock and burns | Level 2 Module 1.2.1 | Elec-Mate';
const DESCRIPTION =
  "What electricity actually does to a human body — the currents, the paths, the burns, the numbers BS 7671 protective devices are sized to stop.";

/* ── Inline check questions (wired into stats/streaks) ──────────────── */

const checks = [
  {
    id: 'shock-current-vs-voltage-check',
    question: "What does the actual damage in an electric shock?",
    options: [
      'The voltage on the conductor',
      'The current that ends up flowing through your body',
      'The frequency of the supply',
      'The size of the cable',
    ],
    correctIndex: 1,
    explanation:
      "Voltage just sets up the pressure. It’s the current — measured in milliamps — flowing through your tissue that stops your heart and your lungs. That’s why every BS 7671 protective device is rated in current, not volts.",
  },
  {
    id: 'let-go-threshold-check',
    question: "Roughly what current makes 'let-go' impossible for most people?",
    options: ['1 mA', '10 mA', '100 mA', '1 A'],
    correctIndex: 1,
    explanation:
      "Around 10-15 mA your forearm muscles clamp shut and you can’t release the conductor. That’s why 30 mA RCDs are sized to trip well below the next threshold up — respiratory paralysis and fibrillation.",
  },
  {
    id: 'shocked-mate-check',
    question: 'A mate is gripped to a live cable, can’t let go. What’s the FIRST move?',
    options: [
      'Grab them and pull them off',
      'Pour water on them',
      'Isolate the supply at the breaker or main switch',
      'Call 999 then pull them off',
    ],
    correctIndex: 2,
    explanation:
      "Don’t touch them. The current’s still flowing — touching them makes you the second casualty. Get the supply off first. Then 999, then first aid. If you genuinely can’t isolate, use a non-conductive object (broom handle, dry timber) to break the contact.",
  },
];

/* ── End-of-page Quiz (wires into stats/streaks) ─────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What actually causes the damage in an electric shock?',
    options: [
      'The voltage of the supply',
      'The current flowing through body tissue',
      'The frequency only',
      'The cable size',
    ],
    correctAnswer: 1,
    explanation:
      "Voltage is the pressure — current is what passes through you. Measured in milliamps. A few tens of milliamps is enough to fibrillate the heart. That’s why protective devices are rated in current.",
  },
  {
    id: 2,
    question: "Roughly what current is the 'let-go' threshold for most people?",
    options: ['1â2 mA', '10â15 mA', '100 mA', '1 A'],
    correctAnswer: 1,
    explanation:
      "Around 10-15 mA. Below that you can usually pull away. Above it, the muscles in your forearm contract so hard you can’t release the conductor — and the longer you’re held on, the worse it gets.",
  },
  {
    id: 3,
    question: 'Which current path through the body is the most dangerous?',
    options: ['Foot to foot', 'Hand to foot', 'Hand to hand across the chest', 'Forearm only'],
    correctAnswer: 2,
    explanation:
      "Hand-to-hand drives the current straight across the chest cavity and through the heart. Highest risk of ventricular fibrillation. It’s the reason you’ll hear sparks talk about 'one-handed working' near anything that might still be live.",
  },
  {
    id: 4,
    question: 'What is ventricular fibrillation?',
    options: [
      'A burn caused by an arc',
      'Loss of feeling in the arm',
      'The heart twitching chaotically instead of pumping properly',
      'A type of muscle spasm in the leg',
    ],
    correctAnswer: 2,
    explanation:
      "The heart muscle stops beating in rhythm and just quivers. Blood stops moving. Brain damage starts within 3-7 minutes. It’s why a small fault current can be fatal — it’s not the burn that gets you, it’s the heart.",
  },
  {
    id: 5,
    question: 'What’s the BS 7671 voltage band for Low Voltage AC?',
    options: [
      'Up to 50 V AC',
      'Above 50 V AC up to 1000 V AC',
      'Above 1000 V AC up to 10 kV AC',
      'Anything above 10 kV AC',
    ],
    correctAnswer: 1,
    explanation:
      "Extra-Low is up to 50 V AC. Low Voltage is 50 V to 1000 V AC — the band that includes 230 V single-phase and 400 V three-phase, where most apprentice work happens. Above 1000 V is High Voltage.",
  },
  {
    id: 6,
    question: "What’s the difference between direct contact and indirect contact?",
    options: [
      'Direct = AC, indirect = DC',
      'Direct = touching a live conductor; indirect = touching a metal part that’s become live through a fault',
      'Direct = at home, indirect = at work',
      'They mean the same thing',
    ],
    correctAnswer: 1,
    explanation:
      "Direct = touching something meant to be live (a bare conductor). Indirect = touching something not meant to be live but that’s gone live through a fault (a metal enclosure). Basic protection deals with the first, ADS with the second.",
  },
  {
    id: 7,
    question: 'A colleague has been thrown clear of a 230 V cable and is awake but shaken. What now?',
    options: [
      'Send them home, no need to do anything',
      'Get them checked at hospital and report it under RIDDOR',
      'Just fill out the accident book',
      'Wait to see if symptoms develop over the next week',
    ],
    correctAnswer: 1,
    explanation:
      "Any electric shock that needs medical attention or causes loss of consciousness is RIDDOR-reportable. Internal damage from electrical contact can show up hours or days later — heart rhythm issues especially. Hospital, then report.",
  },
  {
    id: 8,
    question: 'How does a 30 mA RCD protect against electric shock?',
    options: [
      'It limits the voltage to a safe level',
      'It detects current leaking to earth and disconnects within milliseconds',
      'It shuts off the supply if the cable overheats',
      'It steps the voltage down to ELV',
    ],
    correctAnswer: 1,
    explanation:
      "An RCD compares the current going out on the line with the current coming back on the neutral. If they don’t match (because some current is leaking to earth — through a person, for example), it cuts the supply, typically within 40 ms. 30 mA is set deliberately below the fibrillation threshold.",
  },
];

/* ── FAQs (apprentice voice) ─────────────────────────────────────────── */

const faqs = [
  {
    question: "How can a 'low' voltage like 230 V actually kill someone?",
    answer:
      "Easily. 230 V across a hand-to-hand path with damp skin pushes well over 100 mA through the body — more than enough to fibrillate the heart in under a second. Most UK electrical fatalities at work happen at 230 V, not on HV systems.",
  },
  {
    question: "Why do sparks talk about working one-handed?",
    answer:
      "If a fault catches you, you’d much rather the current go hand-to-hand-via-tool-to-floor than hand-to-hand-across-the-chest. Keep your spare hand in your pocket or behind your back when you’re near anything that might still be live. Breaks the path that goes through the heart.",
  },
  {
    question: "I felt a tingle off something. Is that worth flagging?",
    answer:
      "Yes — every time. A tingle means current is finding a path it shouldn’t. Could be a failing earth, a loose neutral, capacitive coupling, a dodgy appliance. Don’t keep using it. Isolate it, label it, tell the supervisor. Today’s tingle is tomorrow’s shock.",
  },
  {
    question: "What’s the difference between an electric burn and an arc burn?",
    answer:
      "Electric burns happen when current flows through your body — they’re often deep, internal, with small entry/exit wounds that look minor but can hide serious damage. Arc burns are radiated heat from the arc itself — the air round an arc can hit thousands of degrees in a millisecond, and it’ll melt clothing into skin. You can pick up both at the same incident.",
  },
  {
    question: "Do all electric shocks at work have to be reported?",
    answer:
      "Under RIDDOR, you report a shock if it caused loss of consciousness, needed resuscitation, kept the person in hospital over 24 hours, or stopped them working for more than 7 consecutive days. Plus any specified injury (serious burns, etc). Even shocks that don’t meet RIDDOR still go in the company accident book.",
  },
  {
    question: "How does BS 7671 actually stop me getting shocked?",
    answer:
      "Layered protection. Basic protection (insulation, enclosures) keeps you off live parts in the first place. Fault protection (earthing, bonding, ADS) disconnects the supply fast if a metal part goes live. Additional protection (30 mA RCDs) catches the bits that slip through both — and that’s what saves you when the drill bit goes through a buried cable.",
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
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 1 · Section 2 · Subsection 1"
            title="Electric shock and burns"
            description="What electricity actually does to a human body — the currents, the paths, the burns, and the numbers every BS 7671 protective device is sized to stop. The reason every other safety habit on site exists."
            tone="emerald"
          />

          <TLDR
            points={[
              "It’s the CURRENT through your body that does the damage, not the voltage. Tens of milliamps is enough to stop your heart.",
              "Path matters. Hand-to-hand across the chest is the killer. One-handed working breaks that path.",
              "BS 7671’s protective layers — basic protection, ADS, 30 mA RCDs — are all sized around what current does to a human body.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain the physiological effects of electric current at the key threshold levels (1 mA, 10 mA, 30 mA, 50 mA+).",
              "Describe why current path through the body matters and what 'one-handed working' is for.",
              "Tell the difference between electric burns, arc burns and contact burns.",
              "Distinguish direct contact from indirect contact, and the BS 7671 voltage bands (ELV, LV, HV).",
              "React correctly to someone who’s been shocked — isolate, call, treat, report.",
              "Link RCDs, ADS, double insulation and SELV/PELV back to the body’s actual tolerance.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this is the first hazard you learn</ContentEyebrow>

          <ConceptBlock title="Most common serious injury on the tools — and the reason for every other safety habit">
            <p>
              The HSE gets reports of around <strong>1,000 electric-shock and burn accidents at
              work each year</strong>. About <strong>30 of those are fatal</strong>. Most of the
              fatalities come from contact with overhead or underground power cables — but the
              non-fatal ones are everywhere: distribution boards, dodgy appliances, that "I’ll
              just have a quick look while it’s on" moment.
            </p>
            <p>
              Even a non-fatal shock can wreck a career. Burns that need skin grafts. Heart-rhythm
              issues that show up months later. Or a fall off a ladder because the shock made you
              jump. This is why every isolation procedure, every RCD, every PPE rule that follows
              exists.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What a shock actually does</ContentEyebrow>

          <ConceptBlock
            title="Voltage is the pressure. Current is what hurts you."
            plainEnglish="Voltage pushes — but it’s the current that actually flows through your tissue and disrupts your nerves, muscles and heart. That’s why every protective device in BS 7671 is rated in current, not voltage."
            onSite="A 12 V car battery is harmless to touch. A 230 V socket can kill you. Same person, same body resistance — the difference is how much CURRENT the voltage can push through you."
          >
            <p>
              When current passes through the body it does three things at once: it scrambles the
              nerve signals to your muscles, it heats the tissue it flows through, and — if it
              reaches the heart — it can throw the heart out of rhythm. Which of those gets you
              first depends on how much current, where it flows, and how long for.
            </p>
            <p>
              The body has both <strong>skin impedance</strong> (high when dry, much lower when
              wet) and <strong>internal impedance</strong> (fairly low). Wet hands, sweat, a cut,
              or a conductor that punctures the skin all crash the resistance and let far more
              current through for the same voltage. That’s why "it’s only 230" gets people killed.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The threshold currents — the numbers behind the regs">
            <p>
              These figures come from decades of medical research. They assume a current path
              through the body lasting more than about 200 ms. Round figures, not exact, but
              they’re the numbers BS 7671 protective devices are sized against:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1-2 mA</strong> — perception threshold. You feel a tingle.
              </li>
              <li>
                <strong>5-10 mA</strong> — painful but you can usually still let go.
              </li>
              <li>
                <strong>10-15 mA</strong> — <em>let-go threshold</em>. Your forearm muscles
                contract and clamp onto the conductor. You can’t release.
              </li>
              <li>
                <strong>20-30 mA</strong> — severe shock. Sustained muscle contraction,
                respiratory paralysis if it crosses the chest.
              </li>
              <li>
                <strong>50 mA and above</strong> — ventricular fibrillation likely. Heart stops
                pumping, brain damage in 3-7 minutes if not reversed.
              </li>
              <li>
                <strong>100 mA+</strong> — fibrillation almost certain at typical durations. Plus
                deep tissue burns at the entry and exit points.
              </li>
            </ul>
            <p>
              For perspective: a 100 W bulb draws about 400 mA. The current in a kettle is around
              13 amps. Compared to those, the current that kills you is tiny. That’s why a 30 mA
              RCD trips well below the lethal range — and why it’s the main safeguard for sockets
              and most domestic final circuits.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electrical Health and Safety — HSE-aligned learner reference"
            clause="Each year about 1,000 accidents at work involving electric shock or burns are reported to the Health and Safety Executive (HSE). Around 30 of these are fatal. Most of these fatalities arise from contact with overhead or underground power cables. Even non-fatal shocks can cause severe and permanent injury."
            meaning={
              <>
                Electrical injury is the most common serious electrical incident on UK sites.
                Non-fatal doesn’t mean minor — burns, falls, long-term cardiac issues all sit in
                the "non-fatal" column. Treat every potential shock path like it could be the one.
              </>
            }
            cite="Reference: HSE — Electricity at Work general guidance (HSG85)"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Path of the current</ContentEyebrow>

          <ConceptBlock
            title="Hand-to-hand is the killer path"
            plainEnglish="The danger isn’t just how much current — it’s WHERE it flows. Anything across the chest goes through the heart. That’s the path you want to break."
            onSite="One-handed working: keep your spare hand in your pocket, behind your back, or holding a non-conductive surface. If something does catch you, the path is hand-to-foot at worst, not hand-to-hand-through-the-chest."
          >
            <p>
              Hand-to-hand current crosses the heart cavity directly. It’s the path most likely
              to cause ventricular fibrillation at low currents. Hand-to-foot is also dangerous
              but generally lower risk than hand-to-hand. Foot-to-foot — like getting a step
              voltage off a downed line — usually misses the chest, though it can still throw you
              off balance.
            </p>
            <p>
              That’s why the experienced sparks you’ll see drop test leads and screwdrivers don’t
              just grab the bare end with two hands. They isolate the path. It looks fussy until
              the day it doesn’t.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Burns — three different kinds</ContentEyebrow>

          <ConceptBlock title="Contact burns, arc burns and internal burns">
            <p>
              Electrical burns aren’t all the same. You can get any combination of these from one
              incident:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Contact burns</strong> — at the point where the current entered or left
                the body. Often look small but can be deep. Tissue cooked from the inside.
              </li>
              <li>
                <strong>Arc burns (arc flash)</strong> — radiated heat from an electrical arc. An
                arc can hit several thousand degrees in milliseconds. Hot enough to ignite
                clothing, melt tools, and cause flash burns to skin and eyes from a metre or more
                away.
              </li>
              <li>
                <strong>Internal burns</strong> — deep tissue damage along the current path. The
                most dangerous and the easiest to underestimate, because the skin entry/exit
                wounds can look unimpressive while the muscle and nerve damage underneath is
                severe.
              </li>
            </ul>
            <p>
              An arc flash event is a different beast from a "just" shock. The pressure wave can
              rupture eardrums and knock you down; the light can blind; the vapourised metal can
              burn lungs. Switching faulty gear, racking a faulty MCCB, or shorting a busbar with
              a screwdriver are classic causes. You’ll learn more about this in Section 2.2 —
              overloads, short circuits and arcing.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating electrical burns like ordinary burns and missing what’s underneath"
            whatHappens={
              <>
                Casualty took a shock through the hand. Small black mark on the palm, looks
                minor, they say "I’m fine, just got a tingle". You patch it up and let them carry
                on. Hours later they collapse — the heart’s gone into an irregular rhythm from
                the original current path, or there’s deep tissue damage cooking the muscle.
              </>
            }
            doInstead={
              <>
                Any electric shock that broke the skin, caused unconsciousness, or made the
                casualty fall, gets a hospital check. Full stop. Internal electrical damage and
                cardiac issues can take hours to show. Don’t let macho "I’m alright, mate" talk
                you out of A&E.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Direct vs indirect contact</ContentEyebrow>

          <ConceptBlock
            title="Touching something live vs touching something that’s GONE live"
            plainEnglish="Direct contact = you touched a bare live conductor. Indirect contact = you touched a metal case that shouldn’t have been live but is, because something inside has faulted."
            onSite="The metal washing-machine case that gives you a tingle, the dishwasher that buzzes when you brush it — that’s indirect contact. The fault has put line voltage onto the case because the earth or insulation has failed."
          >
            <p>
              <strong>Basic protection</strong> stops direct contact. Insulation on cables,
              barriers, enclosures, plug shutters — anything that keeps you off the live parts in
              the first place.
            </p>
            <p>
              <strong>Fault protection</strong> deals with indirect contact. The main system for
              this in BS 7671 is <strong>Automatic Disconnection of Supply (ADS)</strong>:
              everything metallic gets connected back to earth via a circuit protective conductor
              (CPC), and if a fault dumps line voltage onto a casing, the resulting fault current
              trips the protective device fast enough to stop you getting a fatal shock.
            </p>
            <p>
              On top of that, <strong>additional protection</strong> (the 30 mA RCD) is the
              backstop — for when the basic and fault protection both fail, or when you’ve done
              something neither of them can predict, like driving a nail through a buried cable.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Part 2 (Definitions)"
            clause="Automatic disconnection of supply: a protective measure in which (a) basic protection is provided by basic insulation of live parts or by barriers or enclosures in accordance with Section 416; and (b) fault protection is provided by protective earthing, protective equipotential bonding and automatic disconnection in case of a fault, in accordance with Regulations 411.3 to 411.6."
            meaning={
              <>
                ADS is the standard protective regime for nearly every circuit you’ll wire as an
                apprentice. Three legs: <strong>earthing</strong> (every exposed-conductive-part
                connected back to the MET), <strong>bonding</strong> (extraneous metalwork tied
                in too, so everything sits at the same potential), and{' '}
                <strong>automatic disconnection</strong> (the MCB or RCD that trips on fault).
                All three have to be there — earth without disconnection just keeps the casing
                live.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 4 Chapter 41"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 415.1 (additional protection)"
            clause="Where specified, additional protection is provided by an RCD with rated residual operating current not exceeding 30 mA, in accordance with Regulation 415.1."
            meaning={
              <>
                30 mA is the magic number. It’s set deliberately below the threshold at which
                ventricular fibrillation becomes likely, and modern RCDs disconnect typically
                within 40 ms of detecting that imbalance. That’s the difference between a
                survivable jolt and a cardiac arrest. Almost every socket-outlet up to 32 A in a
                domestic install needs 30 mA RCD protection — and most lighting circuits too.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 4 Chapter 41 Regulation 415.1"
          />

          <SectionRule />

          <ContentEyebrow>Voltage bands</ContentEyebrow>

          <ConceptBlock title="Extra-Low, Low Voltage, High Voltage — and why it matters">
            <p>BS 7671 splits AC voltages into three bands:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Extra-Low Voltage (ELV):</strong> up to 50 V AC (or 120 V ripple-free
                DC). SELV and PELV systems live here — used for things like bathroom shaver
                sockets, doorbells, low-voltage lighting.
              </li>
              <li>
                <strong>Low Voltage (LV):</strong> 50 V to 1000 V AC. This is where 99% of your
                apprenticeship lives — 230 V single-phase, 400 V three-phase. The "Low" is
                relative to HV; it’ll still kill you.
              </li>
              <li>
                <strong>High Voltage (HV):</strong> above 1000 V AC. Substations, distribution
                transformers, the DNO’s side of the meter. Specialist competence required —
                you’ll never touch HV without specific training and authorisation.
              </li>
            </ul>
            <p>
              SELV (Separated Extra-Low Voltage) is the safest tier — isolated source, no earth
              connection, and below 50 V AC there’s not enough pressure to push a dangerous
              current through normal dry skin. That’s why it’s mandated for the riskiest spots,
              like inside zone 0 of a bathroom (where it has to be even lower, 12 V AC max).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>If someone gets shocked</ContentEyebrow>

          <ConceptBlock
            title="Isolate first. Always. Don’t make it two casualties."
            onSite="Lock-off keys live on the same belt as your VI. If a mate’s hung up on a live cable, you want the supply off in seconds, not minutes hunting for the right key."
          >
            <p>
              Order of operations when you find someone in contact with a live source:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Don’t touch them.</strong> While the current’s flowing, they’re a
                conductor. Touching them adds you to the circuit.
              </li>
              <li>
                <strong>Isolate the supply.</strong> Main switch, the relevant MCB, the plug —
                whatever drops the supply fastest. Get it off and locked off if you can.
              </li>
              <li>
                <strong>If you genuinely cannot isolate</strong> (the supply isn’t accessible,
                an HV line, a fallen cable on a public road), use a non-conductive object — a
                dry broom handle, a length of timber — to break the contact. Don’t use anything
                damp or metal.
              </li>
              <li>
                <strong>Call 999.</strong> Tell them it’s an electrical injury — paramedics will
                bring cardiac monitoring, which they should do for any electric-shock casualty.
              </li>
              <li>
                <strong>First aid.</strong> Check responsiveness and breathing. CPR if trained
                and needed. Cool any burns under cool running water for at least 20 minutes —
                cling film over the burn afterwards is ideal. Don’t pop blisters, don’t apply
                creams.
              </li>
              <li>
                <strong>Preserve the scene.</strong> Don’t tidy up. The investigation needs to
                see what happened.
              </li>
            </ol>
          </ConceptBlock>

          <Scenario
            title="The apprentice with the screwdriver in the consumer unit"
            situation={
              <>
                You’re working alongside another second-year. He’s putting a new circuit into a
                consumer unit. You hear a yelp, turn round and see him locked onto the busbar —
                left hand on the case, right hand still gripping a screwdriver wedged against a
                live tail. He’s not moving and his eyes are open but blank.
              </>
            }
            whatToDo={
              <>
                Don’t grab him — current’s still flowing through both of you the second you
                touch him. The main switch is right there in the same enclosure: hit it. As
                soon as it drops, get him on his back, check breathing, call 999 and say
                "electrical injury". Start CPR if he’s not breathing. Keep him warm. Once
                paramedics are en route, isolate at the meter as well so nobody re-energises
                anything. Note times, what you saw, who was on site.
              </>
            }
            whyItMatters={
              <>
                Hand-to-hand across the chest at 230 V is the textbook fibrillation path.
                Seconds matter. The reason "isolate first" is drilled into you is exactly this —
                a panicked grab kills two people instead of one. Even after he wakes up, he goes
                to hospital, and it goes in as a RIDDOR report.
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

          <ContentEyebrow>Reporting it</ContentEyebrow>

          <ConceptBlock title="RIDDOR — when an electric shock has to be reported to HSE">
            <p>
              Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations
              2013 (RIDDOR), the responsible person at work has to report certain electrical
              accidents. For an electric shock, the triggers include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Loss of consciousness caused by the shock or asphyxia.</li>
              <li>Any specified injury — serious burns covering &gt;10% of the body, burns to the eyes, respiratory damage from fume or arc flash.</li>
              <li>Any worker incapacitated for more than 7 consecutive days as a result.</li>
              <li>An accident requiring the casualty to be taken to hospital (if not at work).</li>
              <li>Any "dangerous occurrence" — including electrical short or overload that causes a fire or explosion stopping plant for more than 24 hours, or that posed a significant risk of death.</li>
            </ul>
            <p>
              Even shocks that don’t meet RIDDOR thresholds still go in the company accident
              book. That record is what the HSE looks at if something later goes wrong, and it’s
              what your boss uses to spot recurring kit or procedural issues. Don’t shrug them
              off. Write them down.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>How BS 7671 protects against all this</ContentEyebrow>

          <ConceptBlock
            title="Layered protection — basic, fault, additional"
            plainEnglish="There’s no single thing that stops electric shock. There’s a stack: keep you off the live parts, kill the supply fast if metalwork goes live, and a 30 mA backstop on top for when the first two fail."
          >
            <p>
              Everything in Part 4 of BS 7671 (Protection for Safety) ladders up from the
              physiology you’ve just read. The protective measures are designed to either keep
              dangerous current off you, or disconnect it before it can reach the dangerous
              thresholds:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Basic protection:</strong> insulation, barriers, enclosures, IP-rated
                casings. Stops direct contact in normal use.
              </li>
              <li>
                <strong>Fault protection (ADS):</strong> earthing + bonding + a protective
                device that disconnects within the time required by Reg 411.3.2 (typically 0.4 s
                on a 230 V TN final circuit). Stops indirect contact lasting long enough to
                fibrillate.
              </li>
              <li>
                <strong>Class II equipment:</strong> double or reinforced insulation. No exposed
                metal that can become live, so no need for an earth connection. The "double
                square" symbol on a power tool.
              </li>
              <li>
                <strong>SELV / PELV:</strong> reduce the voltage so far it can’t push a
                dangerous current through a person. Used in special locations like bathroom
                zones.
              </li>
              <li>
                <strong>Additional protection (30 mA RCD):</strong> the catch-all. Required for
                most socket-outlets, lighting circuits, mobile equipment used outdoors, and any
                cable buried less than 50 mm in a wall without earthed mechanical protection.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.4"
            clause="Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
            meaning={
              <>
                Lighting circuits in homes now need 30 mA RCD protection — not just sockets.
                That’s a recent shift driven by the realisation that most domestic shocks happen
                from changing bulbs, dodgy fittings, or kids poking at lampholders. If you’re
                installing or modifying domestic lighting, that RCD has to be there.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 4 Chapter 41 Regulation 411.3.4"
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Current does the damage, not voltage. Tens of milliamps through the chest can fibrillate the heart.",
              "Threshold numbers to know: 1 mA tingle, 10 mA can’t-let-go, 30 mA respiratory paralysis, 50 mA+ fibrillation likely.",
              "Hand-to-hand is the killer path. One-handed working breaks it.",
              "Three burn types: contact (entry/exit), arc (radiated heat), internal (deep tissue along the current path). All three can happen in one incident.",
              "Direct contact = touching live parts (basic protection stops it). Indirect contact = touching something that’s gone live (ADS + RCD stop it).",
              "If a mate’s been shocked: isolate first, never touch them while live, call 999, treat for shock and burns, RIDDOR-report if it meets the threshold.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="Electric shock and burns knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section1/1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Regulatory bodies
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section2/2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Overloads, short circuits and arcing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
