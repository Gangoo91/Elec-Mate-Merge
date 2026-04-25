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
  'The Electricity at Work Regulations 1989 (EAWR) | Level 2 Module 1.1.2 | Elec-Mate';
const DESCRIPTION =
  "The electrical version of HASAWA. The reg behind every prove-dead, every lock-off, and every reason your gaffer says 'isolate it first'.";

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'eawr-purpose-check',
    question: 'What is EAWR 1989 actually for?',
    options: [
      'Telling you which RCD to fit',
      'General electrical safety duties on duty-holders at work',
      'Setting BS 7671 cable sizes',
      'Sorting out who pays the electric bill',
    ],
    correctIndex: 1,
    explanation:
      "EAWR is the electrical version of HASAWA. Made under it in 1989, in force from April 1990. It puts hard duties on duty-holders — your boss, the self-employed spark, and you — to prevent danger from electricity at work.",
  },
  {
    id: 'reg14-live-work-check',
    question: 'When can you legally work on or near a live conductor under EAWR Reg 14?',
    options: [
      'Whenever the gaffer says crack on',
      'Only if dead working is unreasonable AND it’s reasonable to do live AND suitable precautions are taken',
      'Never, under any circumstances',
      'Only if you’ve got rubber gloves on',
    ],
    correctIndex: 1,
    explanation:
      "Three tests, all three have to be ticked. Default is dead. Live working is the exception, with a written justification and proper precautions. 'Quicker' or 'less faff' isn’t on the list.",
  },
  {
    id: 'competence-check',
    question: "You’re a first-year. Where do you sit under Reg 16?",
    options: [
      'Skilled person — same as a time-served spark',
      'Ordinary person — same as the customer',
      'Instructed person — you can do what you’ve been shown, under suitable supervision',
      "It doesn’t apply to apprentices",
    ],
    correctIndex: 2,
    explanation:
      "Reg 16 says you need either the technical knowledge yourself, OR enough supervision for the job. As an apprentice you’re an instructed person — fine for what you’ve been shown, but anything that needs proper electrician judgement needs a sign-off.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: 'Where does EAWR 1989 sit in the legal stack?',
    options: [
      "It’s a British Standard, like BS 7671",
      "It’s a regulation made under HASAWA 1974, specifically for electrical work",
      'It replaces HASAWA',
      'It’s just industry guidance, not law',
    ],
    correctAnswer: 1,
    explanation:
      "EAWR is statute. It was made under section 15 of HASAWA in 1989 and came into force on 1 April 1990. Breaking it is a criminal offence.",
  },
  {
    id: 2,
    question: 'Who counts as a "duty-holder" under EAWR?',
    options: [
      'Only the company director',
      'Only qualified electricians',
      'Employers, the self-employed AND employees — including you',
      'Only the person signing the certificate',
    ],
    correctAnswer: 2,
    explanation:
      "EAWR puts duties on every duty-holder for matters within their control. That includes you as the apprentice on the tools — different scope from the gaffer, but a real personal duty all the same.",
  },
  {
    id: 3,
    question: 'Reg 4 of EAWR is about:',
    options: [
      'Reporting accidents',
      'Systems, work activities and protective equipment being safe',
      'Notifying the HSE before any job',
      'Who can hold the keys to the cupboard',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 4 is the big one. Systems must be constructed and maintained to prevent danger. Work activities must not give rise to danger. Protective equipment must be suitable. Reg 4(1) and 4(2) are absolute duties — no 'reasonably practicable' get-out.",
  },
  {
    id: 4,
    question: 'Under EAWR Reg 14, when is live working actually allowed?',
    options: [
      'Whenever it’s quicker',
      'Only if it’s unreasonable to be dead, reasonable to do live, and suitable precautions are taken',
      'Never',
      'Only on three-phase',
    ],
    correctAnswer: 1,
    explanation:
      "Three tests. ALL three. Plus a documented justification, the right kit, the right competence and supervision. Default is dead — live working is the rare exception.",
  },
  {
    id: 5,
    question: 'Which reg covers the safe isolation precautions for working on dead equipment?',
    options: ['Reg 4', 'Reg 12', 'Reg 13', 'Reg 16'],
    correctAnswer: 2,
    explanation:
      "Reg 13 — adequate precautions shall be taken to prevent equipment that’s been made dead from becoming live while work is in progress. That’s where prove-dead, isolation, lock-off and labels all live.",
  },
  {
    id: 6,
    question: 'Reg 16 is about:',
    options: [
      'Earthing arrangements',
      'Competence — having the technical knowledge OR being suitably supervised',
      'Notifying the HSE',
      'PAT testing',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 16 is why we have skilled, instructed and ordinary persons. As an apprentice you’re an instructed person — you can do what you’ve been shown to do, under the right level of supervision.",
  },
  {
    id: 7,
    question: "You’re sent to swap a faulty socket. The lead spark says 'breaker’s off, crack on'. No padlock, no tester out. What do you do?",
    options: [
      'Crack on — he’s the lead',
      'Stop. Ask for the lock-off and the prove-dead. Won’t take long.',
      'Test it with the back of your hand',
      'Nip the cover off, see if it sparks',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 13 + Reg 14 say working dead is the default and you must keep it dead. No lock-off + no prove-dead = not isolated. 'He told me to' is not a defence in court — Reg 16 puts a duty on YOU too.",
  },
  {
    id: 8,
    question: "What’s the difference between an 'absolute' duty and a 'reasonably practicable' one in EAWR?",
    options: [
      'No difference, just legal jargon',
      'Absolute = MUST be met, no excuses. Reasonably practicable = balance the risk against the cost and trouble.',
      'Absolute only applies to bosses',
      'Reasonably practicable means "do whatever you fancy"',
    ],
    correctAnswer: 1,
    explanation:
      "EAWR mixes both. Reg 4(1) and (2) are absolute — full stop. Most others (Regs 5–15) are 'so far as is reasonably practicable'. That’s why the standard for electrical work is stricter than general workplace safety.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: 'Does EAWR apply to me as an apprentice?',
    answer:
      "Yep. The moment you’re at work on anything electrical — paid, unpaid, on a training day — EAWR is on you. You’re a duty-holder for matters within your control. Different scope from the gaffer, same Act.",
  },
  {
    question: "What’s the actual difference between EAWR and BS 7671?",
    answer:
      "EAWR is the law. Break it and you can be in court. BS 7671 is the British Standard — it’s not law on its own, but it’s the recognised way to show you’ve met EAWR. Stick to BS 7671 properly and you’re generally meeting EAWR through it. Deviate from BS 7671 and you have to prove your way is just as safe.",
  },
  {
    question: "I’ve heard 'absolute' and 'reasonably practicable' used about EAWR — what’s the deal?",
    answer:
      "EAWR is a mix. Reg 4 (the big one — systems, work activities, equipment) is mostly absolute. No excuses, no balancing. Most of the others (Regs 5–15) are 'reasonably practicable' — you balance the risk against the time, money and effort of fixing it. The absolute bits are why electrical work is treated more strictly than general site safety.",
  },
  {
    question: 'Who actually enforces EAWR?',
    answer:
      "The HSE in most workplaces, or local authorities for some commercial premises. Same enforcement powers as HASAWA — improvement notices, prohibition notices, unlimited fines, prison time for the worst breaches. It hits individuals (s.7 HASAWA + EAWR Reg 3) not just companies.",
  },
  {
    question: 'Why is dead working the default? Why not just work live carefully?',
    answer:
      "Because the stats are brutal. The HSE reports around 1,000 electrical accidents at work a year — about 30 of them fatal. Most of those happen because someone thought it was off, or worked it live to save time. Reg 14 forces a hard pause: justify the live work, prove there’s no reasonable alternative, then put proper precautions in place. If you can’t justify all three, it’s dead.",
  },
  {
    question: 'Do I need to learn the regulation numbers off by heart?',
    answer:
      "Useful to know the big four: Reg 4 (systems and work being safe), Reg 13 (precautions for dead working — your safe isolation), Reg 14 (live working — almost never), Reg 16 (competence — why apprentices need supervision). The rest you can look up. Knowing what they DO matters more than memorising the numbers.",
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
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1.1 · Subsection 2"
            title="The Electricity at Work Regulations 1989"
            description="The electrical version of HASAWA. It’s the reg behind every prove-dead, every lock-off, every 'no, isolate it first' you’ll hear on site. Learn it once — it’s on you for the rest of your career."
            tone="emerald"
          />

          <TLDR
            points={[
              "EAWR 1989 is the electrical version of HASAWA. It puts criminal duties on duty-holders — including you.",
              "Default is dead. Reg 13 covers the precautions for keeping it that way; Reg 14 says live work is only allowed if dead is unreasonable AND live is reasonable AND precautions are in place.",
              "Reg 16 = competence. As an apprentice you’re an 'instructed person' — fine for what you’ve been shown, supervised for the rest.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain what EAWR 1989 is, who made it, and why it exists.",
              "Tell the difference between 'absolute' and 'reasonably practicable' duties under EAWR.",
              "Recognise the four regs that drive almost every site decision: Reg 4, Reg 13, Reg 14, Reg 16.",
              "Apply Reg 14’s three tests before anyone even thinks about working live.",
              "Know where you sit as an apprentice — instructed person, not skilled — and why supervision isn’t optional.",
              "Show how EAWR links back to HASAWA and forward to BS 7671 and your safe isolation routine.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why EAWR exists</ContentEyebrow>

          <ConceptBlock title="HASAWA covers everything. EAWR covers electricity.">
            <p>
              HASAWA 1974 is the umbrella safety law. Brilliant, but very general — it doesn’t tell
              you anything specific about electricity. By the late 1980s the HSE had enough data to
              know that electrical work was killing people in ways that needed their own rules.
            </p>
            <p>
              So in 1989, the government used <strong>section 15 of HASAWA</strong> (which lets the
              Secretary of State make detailed regs under the Act) to bring in the{' '}
              <strong>Electricity at Work Regulations 1989</strong>. They came into force on{' '}
              <strong>1 April 1990</strong> and they’ve barely been touched since — because they
              still work. Almost every electrical safety prosecution in the UK is brought under
              EAWR, not HASAWA.
            </p>
            <p>
              Yeah, more law stuff. Stick with me — this one’s the reg that’s actually behind
              everything you do with a screwdriver.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="EAWR 1989 — duty-holders"
            clause="It is the duty of every duty-holder to comply with the provisions of these Regulations in so far as they relate to matters that are within their control."
            meaning={
              <>
                A "duty-holder" is anyone who has any control over an electrical system at work —
                employers, the self-employed, AND employees. That last one is you.{' '}
                <strong>Different scope from the gaffer, same Act.</strong> Your duty is for the
                bits within YOUR control: doing what you’ve been shown to do, properly, and not
                doing what you haven’t.
              </>
            }
            cite="Source: HSE — Electricity at Work Regulations 1989, Reg 3"
          />

          <SectionRule />

          <ContentEyebrow>How the duties work</ContentEyebrow>

          <ConceptBlock
            title="Absolute vs reasonably practicable — and why it matters more here"
            plainEnglish="Some duties are 'do this, no exceptions'. Others are 'balance the risk against what it’d take to prevent it'. EAWR has a heavy mix of both — that’s what makes electrical work stricter than most."
            onSite="When the gaffer says 'we always prove dead' — that’s because Reg 4 doesn’t give him a choice. There’s no 'reasonable cost' argument for skipping it."
          >
            <p>
              Most of HASAWA is "so far as is reasonably practicable" — you balance risk against
              cost, time and trouble. EAWR is harder. Some of its regs are{' '}
              <strong>absolute</strong>: they have to be met, full stop, no balancing.
            </p>
            <p>
              The big absolute ones in EAWR are <strong>Reg 4(1)</strong> (systems shall be of such
              construction as to prevent danger) and <strong>Reg 4(2)</strong> (systems shall be
              maintained to prevent danger). Most of the others (Regs 5–15) are "reasonably
              practicable", but a few — like the requirement to wear suitable PPE in Reg 4(4) — are
              also absolute.
            </p>
            <p>
              Bottom line: when somebody on site tells you "we don’t have to do that, it’s only
              reasonably practicable" — about prove-dead, about isolation, about Reg 4 — they’re
              wrong. Some of these duties don’t bend.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Reg 4 — the big one</ContentEyebrow>

          <ConceptBlock
            title="Reg 4: systems, work activities and protective equipment"
            onSite="Faulty old CU? Reg 4(2) — maintenance. Knackered drill cable? Reg 4(2). Working without lock-off? Reg 4(3) — work activities. PPE that doesn’t fit? Reg 4(4). One regulation, half the prosecutions."
          >
            <p>
              If you only remember one regulation in EAWR, make it Reg 4. It’s split into four
              bits:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>4(1) — Construction:</strong> any system at work has to be built so it can
                prevent danger. That covers your installation, your CU, your tails, the lot.
              </li>
              <li>
                <strong>4(2) — Maintenance:</strong> the system has to be maintained, as far as
                reasonably practicable, to keep preventing danger. PAT testing, EICRs and routine
                checks all sit under this.
              </li>
              <li>
                <strong>4(3) — Work activities:</strong> any work near a system has to be done in a
                way that doesn’t cause danger. This is where safe isolation and dead-working sit.
              </li>
              <li>
                <strong>4(4) — Protective equipment:</strong> any PPE provided has to be suitable,
                kept in good condition and properly used. Insulated tools, voltage indicators,
                gloves — all in scope.
              </li>
            </ul>
            <p>
              When the HSE prosecutes someone after an electrical accident, it’s almost always Reg 4
              that gets cited.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="EAWR 1989 — Regulation 4"
            clause="All systems shall at all times be of such construction as to prevent, so far as is reasonably practicable, danger. As may be necessary to prevent danger, all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger. Every work activity, including operation, use and maintenance of a system and work near a system, shall be carried out in such a manner as not to give rise to danger, so far as is reasonably practicable."
            meaning={
              <>
                Three things: build it safe, keep it safe, work on it safely.{' '}
                <strong>"At all times"</strong> is the bit that bites — there’s no excuse for "it
                was safe last week". And the duty is on the person doing the work too, not just the
                designer.
              </>
            }
            cite="Source: HSE HSR25 — Memorandum of guidance on the Electricity at Work Regulations 1989"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reg 13 — keeping it dead</ContentEyebrow>

          <ConceptBlock
            title="Reg 13: the rules for working on equipment that’s been made dead"
            plainEnglish="If you’ve turned it off, you have to make sure it stays off the whole time you’re touching it. That’s prove-dead, isolation, lock-off, label."
            onSite="The 5-step JIB safe isolation procedure (prove tester → isolate → lock off → prove dead at point of work → re-prove tester) is the industry’s answer to Reg 13. Do it every time. No shortcuts."
          >
            <p>
              Reg 13 is short but mighty. Once you’ve isolated something to work on it, the reg
              says you have to take "adequate precautions" to stop it being made live again — by
              accident, by someone else, by anything — while the work’s going on.
            </p>
            <p>
              In practice, "adequate precautions" means the standard safe isolation kit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lockable isolator</strong> — physically prevent reset.
              </li>
              <li>
                <strong>Padlock + key on you</strong> — your lock, your work, your key. Don’t leave
                it in.
              </li>
              <li>
                <strong>Warning notice</strong> — durable, written in durable ink, name + date +
                contact.
              </li>
              <li>
                <strong>Prove-dead at the point of work</strong> with a GS38-compliant voltage
                indicator. Not the multimeter on continuity. Not the back of your hand.
              </li>
              <li>
                <strong>Re-prove the tester</strong> on a known live source or proving unit
                immediately before AND after.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="EAWR 1989 — Regulation 13"
            clause="Adequate precautions shall be taken to prevent electrical equipment, which has been made dead in order to prevent danger while work is carried out on or near that equipment, from becoming electrically charged during that work if danger may thereby arise."
            meaning={
              <>
                "Made dead" is the start. <strong>"Stays dead while you work"</strong> is the duty.
                Functional switch isn’t enough. A breaker someone could flip back on isn’t enough.
                You need a lockable means of isolation, controlled by you, with a label and a
                prove-dead at the point of work.
              </>
            }
            cite="Source: HSE HSR25; JIB Safe Isolation Procedure"
          />

          <SectionRule />

          <ContentEyebrow>Reg 14 — the live working test</ContentEyebrow>

          <ConceptBlock
            title="Reg 14: when can you actually work on something live?"
            plainEnglish="Almost never. Reg 14 sets three tests, and ALL three have to be ticked before live work is even legal."
          >
            <p>
              Reg 14 is the one that makes dead working the default for the entire industry. It
              doesn’t say "never work live" — it says you can only do it if you can satisfy three
              tests at the same time:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>It’s unreasonable for the conductor to be dead</strong> — eg you’re testing
                or fault-finding and you actually need it live to see what’s happening.
              </li>
              <li>
                <strong>It’s reasonable for the work to be carried out live</strong> — the risk of
                doing it live is genuinely lower than the risk of shutting it down (think life
                support, certain control systems).
              </li>
              <li>
                <strong>Suitable precautions are taken</strong> — risk assessment, insulated tools,
                PPE, mats, barriers, second person, the lot.
              </li>
            </ol>
            <p>
              "It would take longer to isolate", "the customer doesn’t want power off", "it’s just
              a quick one" — none of those tick test (1) or (2). Live work that gets prosecuted is
              almost always live work that should have been dead.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="EAWR 1989 — Regulation 14"
            clause="No person shall be engaged in any work activity on or so near any live conductor (other than one suitably covered with insulating material so as to prevent danger) that danger may arise unless — (a) it is unreasonable in all the circumstances for it to be dead; and (b) it is reasonable in all the circumstances for him to be at work on or near it while it is live; and (c) suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury."
            meaning={
              <>
                Three tests. <strong>All three</strong>. As an apprentice you’ll almost never be in
                a position where (b) is satisfied for you specifically — your competence isn’t there
                yet. If anyone asks you to test live without supervision in your first couple of
                years, that’s the reg you point to.
              </>
            }
            cite="Source: HSE HSR25 — Memorandum of guidance on the Electricity at Work Regulations 1989"
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reg 16 — competence</ContentEyebrow>

          <ConceptBlock
            title="Reg 16: skilled, instructed, or supervised. Pick one."
            onSite="The reason you can’t just rock up and second-fix a board on your own as a first-year isn’t that the gaffer’s being mean. It’s Reg 16. Your card hasn’t earned it yet."
          >
            <p>
              Reg 16 is the one that splits people into roles. It’s the reason BS 7671 talks about
              "skilled persons", "instructed persons" and "ordinary persons":
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Skilled person</strong> — has the technical knowledge AND experience to
                avoid danger. Time-served spark with the right tickets and the right hours.
              </li>
              <li>
                <strong>Instructed person</strong> — has been instructed or supervised by a skilled
                person well enough to handle a defined task safely. <em>That’s you.</em> You can do
                what you’ve been shown to do, with the right level of supervision.
              </li>
              <li>
                <strong>Ordinary person</strong> — the customer, the joiner on site, anyone who’s
                not in either of the above. Should not be doing electrical work, full stop.
              </li>
            </ul>
            <p>
              Competence isn’t just qualifications — it’s knowledge + skills + experience +{' '}
              <em>knowing your limits</em>. The "knowing your limits" bit is the one that catches
              people out. A grade 3 with two years on site isn’t suddenly a skilled person because
              they did a board change once.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="EAWR 1989 — Regulation 16"
            clause="No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."
            meaning={
              <>
                Two ways to be legal: have the knowledge yourself OR be properly supervised. As an
                apprentice, you’re on the second route. <strong>"Suitable supervision"</strong>{' '}
                shrinks as you go up — first-year is direct, third-year might be available-on-site,
                JIB-graded improver is much lighter. But you don’t get to skip it. And if your
                supervisor isn’t actually skilled themselves, the chain breaks.
              </>
            }
            cite="Source: HSE HSR25; BS 7671 Part 2 — Definitions"
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating 'breaker flicked off' as 'isolated'"
            whatHappens={
              <>
                Quick socket swap. The lead spark flicks the breaker, says "right, off you go". No
                lock, no label, no prove-dead. You crack on. Halfway through, another sparky in the
                cupboard sees the breaker tripped and helpfully resets it. You’re now holding live
                conductors.
              </>
            }
            doInstead={
              <>
                Reg 13 says the equipment has to <em>stay</em> dead while you work on it. That
                means a lockable isolator, your padlock, your key on YOU, a warning label, and a
                prove-dead at the point of work with a GS38 voltage indicator (proved on a known
                source before AND after). Every. Single. Time. No exceptions for "small jobs".
              </>
            }
          />

          <Scenario
            title="The fault-find on a live distribution board"
            situation={
              <>
                You’re a second-year. You’re with the gaffer at a small commercial unit. A circuit
                keeps tripping. The gaffer pops the cover off the DB and starts probing with a
                multimeter, board fully energised. He waves you over to "have a look at this".
              </>
            }
            whatToDo={
              <>
                Stand back. Watch, don’t touch. Don’t put your tools in. Live fault-finding can be
                legal under Reg 14 — but only for someone competent for that work, with the right
                kit, with a documented justification. It’s not legal for you yet, regardless of who
                tells you to crack on. Your job here is to learn, not to reach in.
              </>
            }
            whyItMatters={
              <>
                Reg 14’s three tests have to be satisfied <em>for the person doing the work</em>.
                You being supervised is great, but it doesn’t transfer his competence onto you for
                live working specifically. And Reg 16 means if it goes wrong while you’ve got the
                probe in your hand, the "I told him to" defence won’t save the gaffer or you.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>How it joins up</ContentEyebrow>

          <ConceptBlock
            title="HASAWA → EAWR → BS 7671 → your RAMS, again"
            plainEnglish="Same stack as last subsection, just zoomed into the electrical lane. HASAWA: 'be safe.' EAWR: 'be safe with electricity.' BS 7671: 'here’s the technical method.' RAMS: 'here’s how on this exact job.'"
          >
            <p>
              EAWR is the legal duty. <strong>BS 7671</strong> is the British Standard that tells
              you the technical "how" — cable sizes, protective devices, earthing, testing
              schedules. BS 7671 isn’t law on its own, but the HSE explicitly accepts that
              following BS 7671 is generally accepted as one way of meeting EAWR.
            </p>
            <p>
              That’s why your RAMS, your SOPs, your tutor, your gaffer all bang on about BS 7671 —
              it’s the route to legal compliance with EAWR, and through it, with HASAWA. Departure
              from BS 7671 isn’t automatically illegal, but you’ll have to prove your alternative
              prevents danger just as well. Easier to follow it.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What happens if it goes wrong</ContentEyebrow>

          <ConceptBlock title="EAWR has teeth">
            <p>
              Same enforcement chain as HASAWA — the HSE (or local authority for some commercial
              premises) investigates, prosecutes, issues notices. EAWR carries the full weight of
              statute behind it.
            </p>
            <p>For individuals — including apprentices — the worst-case headlines:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>
                <strong>Magistrates' court:</strong> unlimited fine and/or up to 6 months in
                prison.
              </li>
              <li>
                <strong>Crown Court:</strong> unlimited fine and/or up to 2 years in prison.
              </li>
              <li>
                <strong>Companies:</strong> fines tied to turnover under the Sentencing Council
                guidelines — multi-million for the worst breaches.
              </li>
            </ul>
            <p>
              The HSE reports about <strong>1,000 electrical accidents at work a year</strong>, and
              around <strong>30 of those are fatal</strong>. Most of the fatal ones come from
              contact with live conductors during work that should have been done dead. Reg 14 and
              Reg 13 exist because of those numbers, not in spite of them.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "EAWR 1989 was made under HASAWA s.15. It’s statute — break it and you can be in court. Almost every electrical safety prosecution is brought under EAWR.",
              "Reg 4 is the big one: systems built safe (4.1), maintained safe (4.2), worked on safely (4.3), with suitable PPE (4.4). Mostly absolute duties.",
              "Reg 13 = stay dead. Once you’ve isolated, the equipment has to stay isolated for the duration. Lock + label + prove-dead at the point of work.",
              "Reg 14 = live working is the rare exception, not the default. Three tests, all three have to be met, with documented justification.",
              "Reg 16 = competence. Skilled person OR instructed person OR suitable supervision. As an apprentice you’re an instructed person — fine for what you’ve been shown, supervised for the rest.",
              "BS 7671 isn’t law itself — it’s the recognised technical route to meeting EAWR. Stick to it and you’re generally compliant. Deviate and you have to prove your way is just as safe.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="EAWR 1989 knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section1/1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                HASAWA 1974
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section1/1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                RIDDOR, PUWER & COSHH
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
