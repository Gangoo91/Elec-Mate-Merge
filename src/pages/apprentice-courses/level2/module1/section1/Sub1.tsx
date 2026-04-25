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
  'The Health and Safety at Work Act 1974 (HASAWA) | Level 2 Module 1.1.1 | Elec-Mate';
const DESCRIPTION =
  "The big safety law. The one underneath every PPE rule, every RAMS and every lock-off you’ll meet on site.";

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'hasawa-purpose-check',
    question: 'What is HASAWA 1974 actually for?',
    options: [
      'Telling you which cable to use',
      'General duties for health, safety and welfare at work',
      'Setting electrical testing standards',
      'Sorting out electricity prices',
    ],
    correctIndex: 1,
    explanation:
      "HASAWA is the big one. Every other UK workplace safety reg sits under it. It doesn’t tell you the technical rules — those live in regs like EAWR and standards like BS 7671.",
  },
  {
    id: 'employer-duties-check',
    question: "Which of these is the boss’s job under HASAWA?",
    options: [
      'Only let you work when supervised',
      'Provide safe systems of work',
      'Only employ qualified electricians',
      'Phone the HSE every day',
    ],
    correctIndex: 1,
    explanation:
      'Section 2(2)(a). The boss must provide safe gear, safe procedures, training, supervision and decent welfare. If any of that’s missing, you’re right to ask why.',
  },
  {
    id: 'employee-duties-check',
    question: "What’s YOUR main duty under HASAWA?",
    options: [
      'Write the safety policy',
      'Run the risk assessments',
      'Take reasonable care and cooperate with the system',
      'Supervise the other apprentices',
    ],
    correctIndex: 2,
    explanation:
      "Section 7. Look after yourself, watch out for others, and get on with the safety system the boss has set up. RAMS, PPE, briefings, lock-off — use them, don’t fight them.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What is the main purpose of the Health and Safety at Work Act 1974?',
    options: [
      'To tell electricians which cable to use',
      'To set general duties for the safety, health and welfare of people at work',
      'To list electrical testing instruments',
      'To set energy prices',
    ],
    correctAnswer: 1,
    explanation:
      "It’s the umbrella law. Sets the general duties on bosses, workers and anyone in charge of a workplace. Every other UK workplace safety reg sits underneath it.",
  },
  {
    id: 2,
    question: 'Which of these is an employer’s duty under HASAWA s.2?',
    options: [
      'Only let you work when supervised',
      'Provide a safe place to work and safe systems of work',
      'Only employ time-served electricians',
      'Send all defects straight to the HSE',
    ],
    correctAnswer: 1,
    explanation:
      'Section 2(2) lists the boss’s five duties: safe plant + systems, safe handling of stuff, training/instruction/info/supervision (ITIS), safe place of work, welfare.',
  },
  {
    id: 3,
    question: 'What does s.7 of HASAWA put on YOU?',
    options: [
      'Write the company safety policy',
      'Make sure all work is dead before starting',
      'Take reasonable care for yourself and others, and cooperate with the system',
      'Carry out every risk assessment yourself',
    ],
    correctAnswer: 2,
    explanation:
      "Two duties: don’t be reckless, and cooperate with whatever the boss has put in place. RAMS, PPE, briefings, isolation procedures — use them, don’t fight them.",
  },
  {
    id: 4,
    question: 'Who actually enforces HASAWA?',
    options: ['The HSE (and local authorities)', 'NICEIC', 'Ofgem', 'BSI'],
    correctAnswer: 0,
    explanation:
      'HSE inspectors or your local authority. Improvement notices, prohibition notices, unlimited fines, prison time for serious stuff. Hits individuals, not just companies.',
  },
  {
    id: 5,
    question: 'How does HASAWA relate to BS 7671?',
    options: [
      'They’re the same thing',
      'HASAWA is the law; BS 7671 tells you how to do electrical work safely',
      'BS 7671 is law and HASAWA is just guidance',
      'No connection',
    ],
    correctAnswer: 1,
    explanation:
      "Three layers: HASAWA (the law) → EAWR (electrical version of the law) → BS 7671 (the standard that shows you HOW). Follow BS 7671 and you generally meet the law.",
  },
  {
    id: 6,
    question: 'What does "so far as is reasonably practicable" mean?',
    options: [
      'Spend whatever it takes, no limit',
      'Balance the risk against the time, money and trouble of fixing it',
      'Only the cheapest option',
      'Whatever’s most convenient',
    ],
    correctAnswer: 1,
    explanation:
      'Bigger the risk, more the boss has to do — even if it’s expensive. Smaller the risk, less needed. It’s a balance, not a free pass to skip safety.',
  },
  {
    id: 7,
    question: 'A foreman tells you to do something you think is unsafe. What do you do?',
    options: [
      'Crack on quickly so it’s over with',
      'Stop, make safe, and raise it',
      'Only do it if someone’s watching',
      'Do it and report it later',
    ],
    correctAnswer: 1,
    explanation:
      "Stop. Make safe. Speak up. The law backs you for refusing genuinely unsafe work. Going ahead because someone told you to is not a defence in court.",
  },
  {
    id: 8,
    question: 'Where do safe systems of work usually live on site?',
    options: [
      'BS 7671',
      'HASAWA itself',
      'Risk Assessments and Method Statements (RAMS)',
      'The Electrical Installation Certificate',
    ],
    correctAnswer: 2,
    explanation:
      "RAMS turn the law into actual steps for the actual job. Read them before you start. If they don’t match what’s on the floor, flag it.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: 'Does HASAWA apply to me as an apprentice?',
    answer:
      "Yep. The moment you walk on site â paid, unpaid, training, work experience â HASAWA applies. Section 7 binds you. Section 2 binds your boss. Same rules as the qualified spark next to you.",
  },
  {
    question: 'What if I refuse to do something I think is unsafe?',
    answer:
      "You’re covered. Section 44 of the Employment Rights Act 1996 sits alongside HASAWA â they can’t bin you off or pull your hours for raising a real safety concern, or for refusing work that’s actually dangerous. Make a note of dates, names and what was said in case it kicks off later.",
  },
  {
    question: 'How does HASAWA fit with BS 7671 and EAWR?',
    answer:
      "Three layers. HASAWA is the big safety law (any workplace). EAWR 1989 is the electrical version, made under HASAWA. BS 7671 is the standard that tells you HOW to do electrical work safely. Stick to BS 7671 and you generally meet EAWR â and through it, HASAWA.",
  },
  {
    question: 'Who can actually take you to court for breaking HASAWA?',
    answer:
      "HSE inspectors or your local authority. Goes to magistrates' or Crown Court depending on how serious. Worst case for individuals: unlimited fines AND up to two years inside. Companies get hit with bigger fines â multi-million for the worst breaches.",
  },
  {
    question: "What’s the difference between 'absolute' and 'reasonably practicable' duties?",
    answer:
      "An absolute duty has to be met, full stop â no balance. Reasonably practicable means you weigh the risk against what it would take to fix it. Most HASAWA duties are the second kind. EAWR has a few absolute duties (like Reg 4 â working dead is the default), which is why electrical work is treated more strictly.",
  },
  {
    question: 'Do I need to learn this word for word?',
    answer:
      "No, nobody does. Three things to keep in your head: what’s on you (s.7), what’s on your boss (s.2), and what 'reasonably practicable' means when you’re making a call. The RAMS for each job turns the law into actual steps for actual work.",
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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1.1 · Subsection 1"
            title="The Health and Safety at Work Act 1974"
            description="The big safety law. The one underneath every PPE rule, every RAMS, every lock-off you’ll meet on site. Worth ten minutes — it’s the bit that protects you when things go wrong."
            tone="emerald"
          />

          <TLDR
            points={[
              "HASAWA is THE big safety law. Every other workplace safety reg you’ll meet sits underneath it.",
              "Section 2 = what your boss has to do for you. Safe gear, safe place, training, decent welfare.",
              "Section 7 = what YOU have to do. Don’t be reckless. Cooperate with the safety system. Don’t mess with anything that’s there to keep people safe.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain what HASAWA is for, in plain English.",
              "List the boss’s five duties under section 2 — and your two under section 7.",
              "Show how HASAWA links to BS 7671, EAWR 1989 and the RAMS you read each morning.",
              "Apply 'reasonably practicable' to a real on-site call.",
              "Know what happens if HASAWA gets broken — and your rights when you flag a safety issue.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why HASAWA exists</ContentEyebrow>

          <ConceptBlock title="It came out of one bad decade for British workers">
            <p>
              Before HASAWA, UK workplace safety law was a patchwork of trade-specific Acts going
              back to the Victorian era. By the early 1970s, around 1,000 people a year were dying
              at work and another half a million were getting injured. The Robens Report (1972)
              said it was time to scrap the patchwork and put one general duty on every employer.
            </p>
            <p>
              That became HASAWA in 1974. It still applies today, with a stack of regulations made
              under it (EAWR, MHSWR, COSHH, PUWER, CDM and more) handling specific risks. The
              workplace death rate has dropped about 85% since.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The law itself</ContentEyebrow>

          <ConceptBlock
            title="HASAWA tells everyone to be safe — it doesn’t tell you exactly how"
            plainEnglish="Be safe. That’s it. The 'how' is in your RAMS, your training, BS 7671, and the spark showing you the ropes."
            onSite="Every toolbox talk you’ve sat through? That’s HASAWA in action. Your boss has to deliver it. You have to listen. That’s the deal."
          >
            <p>
              HASAWA doesn’t tell you which cable to use or how to test a circuit. It just says
              everyone at work has to keep things safe — bosses, you, sub-contractors, even the
              customer walking past. The detail (lock-off, cable sizes, RCDs) lives in other regs
              that hang off it.
            </p>
            <p>
              The Act applies to <em>every</em> workplace in the UK. Big construction site or a
              boiler swap in a flat — same Act, same duties, scaled to how risky the job is.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HASAWA 1974 — section 2(1)"
            clause="It shall be the duty of every employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all his employees."
            meaning={
              <>
                One sentence. It’s why every safety system on every site exists.{' '}
                <strong>"So far as is reasonably practicable"</strong> means the boss has to weigh
                the risk against the time, money and effort of fixing it. Bigger the risk → more
                they’ve got to do — even if it’s expensive.
              </>
            }
            cite="Reference: HSE — Health and Safety at Work etc. Act 1974"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What the boss owes you</ContentEyebrow>

          <ConceptBlock
            title="Section 2: the boss’s five duties"
            onSite="Site induction = the boss doing s.2(2)(c). PPE issued at the gate = (b). Toilets in the welfare cabin = (e). Same Act, every time."
          >
            <p>
              Section 2(2) breaks the boss’s general duty into five specific bits. They have to
              provide:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>(a) Safe plant and safe systems of work</strong> — tools that aren’t
                knackered, procedures that don’t kill you. If your drill keeps tripping the RCD,
                that’s an (a) problem.
              </li>
              <li>
                <strong>(b) Safe handling, storage and transport</strong> — cable drums you can
                actually move, COSHH labels on chemicals, switchgear stored properly.
              </li>
              <li>
                <strong>(c) Information, instruction, training, supervision (ITIS)</strong> — they
                tell you what, show you how, train you up, then supervise while you’re learning. If
                any of that’s missing, ask.
              </li>
              <li>
                <strong>(d) Safe place of work</strong> — you shouldn’t have to dodge holes, fight
                a wonky ladder or climb over scaffold to get to the consumer unit.
              </li>
              <li>
                <strong>(e) Welfare</strong> — toilets, somewhere to eat, hot water, warm in
                winter. Not a perk. Not optional.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Section 3: duties to everyone else on site"
            plainEnglish="Section 2 covers the boss’s own employees. Section 3 covers everyone else affected by the work — the public, the customer, sub-contractors, you when you’re a sparky on someone else’s site."
          >
            <p>
              On a typical job there’ll be other trades, the customer, deliveries, neighbours.
              Section 3 says the boss can’t just look after their own crew and ignore the rest.
              Same applies to you when you’re a self-employed spark on someone else’s site —
              you’re a duty-holder under s.3 too.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What you owe back</ContentEyebrow>

          <ConceptBlock
            title="Section 7: your bit — two duties"
            plainEnglish="Don’t be reckless. Don’t fight the safety system. Use what’s been given to you."
            onSite="If your foreman asks you to skip lock-off, s.7 actually puts YOU in the wrong if you do it. The pressure from above doesn’t transfer the blame down."
          >
            <p>Section 7 is short, but it’s about you personally. Two duties:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Don’t be the cause.</strong> Look after yourself. Watch out for the next
                mate too. Even what you DON’T do counts — leaving a tool on the stairs, walking
                past a missing trip switch, not flagging a hot wire.
              </li>
              <li>
                <strong>Get on with the system.</strong> RAMS, PPE, briefings, isolation
                procedures. If your boss puts it in place, you use it. Refusing to play ball is on
                you, not them.
              </li>
            </ol>
            <p>
              Section 8 adds a third bit: don’t intentionally mess with anything that’s there for
              safety. Removing a guard for speed, defeating an interlock, taking the lock off
              someone else’s lock-off — all s.8 breaches, all sackable.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HASAWA 1974 — section 7"
            clause="It shall be the duty of every employee while at work to take reasonable care for the health and safety of himself and of other persons who may be affected by his acts or omissions at work; and as regards any duty or requirement imposed on his employer or any other person by or under any of the relevant statutory provisions, to co-operate with him so far as is necessary to enable that duty or requirement to be performed or complied with."
            meaning={
              <>
                In English: read the RAMS, wear what they gave you, turn up to the toolbox talks,
                follow safe isolation. If the gaffer asks you to skip any of that, s.7 actually
                puts you in the wrong if you go ahead. The pressure doesn’t transfer the blame.
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Knowing the difference</ContentEyebrow>

          <ConceptBlock title="Absolute duty vs reasonably practicable">
            <p>
              Most HASAWA duties are <strong>"reasonably practicable"</strong> — you balance the
              risk against the cost, time and trouble of preventing it. Bigger the risk → the more
              you have to do, even if it gets expensive.
            </p>
            <p>
              A few duties are <strong>absolute</strong> — they MUST be met, no excuses. EAWR 1989
              Reg 4 is the big one for electrical work: where danger may arise, no work shall be
              carried out on or near any live conductor unless it’s unreasonable for it to be dead
              AND it’s reasonable for the work to be carried out live AND suitable precautions are
              taken. That’s why "prove dead" is the rule, not the exception.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Thinking you’re off the hook because you’re 'just the apprentice'"
            whatHappens={
              <>
                You’re a year in. A grizzled spark with 20 years on the tools tells you "just do it
                like this, mate". He must know what he’s on about, right? You crack on. Something
                goes wrong. Now <em>you’re</em> personally on the hook under s.7 — apprentice card
                or not.
              </>
            }
            doInstead={
              <>
                From day one, you’re a duty-holder just like him. If a job feels wrong, stop. Say
                something. The law backs you for asking. It does NOT back you for cracking on
                because someone with more grey hair told you to.
              </>
            }
          />

          <Scenario
            title="The foreman says it’s already off — but you can’t see proof"
            situation={
              <>
                Sent to swap a socket. The foreman tells you "it’s off, breaker’s flipped, crack
                on". No padlock on the breaker, no warning notice up, no test instrument anywhere
                in sight.
              </>
            }
            whatToDo={
              <>
                Don’t touch it. Ask for the lock-off and the prove-dead. Politely — they’re
                probably just rushing. If they push back, mention you’ve got a personal duty under
                s.7. If they STILL push, escalate above them. Note it down — date, time, who said
                what.
              </>
            }
            whyItMatters={
              <>
                Cracking on because someone told you to is not a defence in court. EAWR 1989 Reg 4
                says working dead is the default — and s.7 means it’s your call too, not just
                theirs.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>How it all fits together</ContentEyebrow>

          <ConceptBlock
            title="HASAWA → EAWR → BS 7671 → your RAMS"
            plainEnglish="Each layer makes the one above more specific. HASAWA: 'be safe'. EAWR: 'be safe with electricity'. BS 7671: 'here’s how, technically'. RAMS: 'here’s how, on this exact job'."
          >
            <p>
              HASAWA is the parent. The <strong>Electricity at Work Regulations 1989 (EAWR)</strong>{' '}
              are made under it and apply just to electrical work. They put hard duties on
              everyone involved.
            </p>
            <p>
              <strong>BS 7671</strong> isn’t law itself. It’s the British Standard for electrical
              installations. But sticking to BS 7671 is generally accepted as proof that you’ve
              met EAWR — and through that, HASAWA. Deviate from BS 7671 and you’ll have to prove
              your way is just as safe. Easier to follow it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="EAWR 1989 — Regulation 16"
            clause="No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."
            meaning={
              <>
                This is why BS 7671 splits people into <strong>skilled</strong>,{' '}
                <strong>instructed</strong> and <strong>ordinary</strong>. As an apprentice you’re
                an <em>instructed person</em> — you can crack on with stuff once someone’s shown
                you, but anything that needs proper electrician judgement (sizing a circuit,
                deciding if something’s safe to energise) isn’t yours yet. Get a sign-off.
              </>
            }
            cite="Source: BS 7671 Part 2 — Definitions; HSE HSR25"
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What happens if it goes wrong</ContentEyebrow>

          <ConceptBlock title="Real penalties, in real numbers">
            <p>
              HASAWA isn’t toothless. The HSE prosecutes hundreds of breaches a year. The
              Sentencing Council’s guidelines (since 2016) tie fines to company turnover and to
              how seriously the breach risked harm.
            </p>
            <p>For individuals, the worst-case headlines:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>
                <strong>Magistrates' court:</strong> unlimited fine and/or up to 6 months in
                prison.
              </li>
              <li>
                <strong>Crown Court:</strong> unlimited fine and/or up to 2 years in prison.
              </li>
              <li>
                <strong>For companies:</strong> fines have hit £15m+ for the worst cases. Average
                fine for serious breaches is now in the £100k+ bracket.
              </li>
            </ul>
            <p>
              And it’s not just bosses who get done. Workers and supervisors regularly get
              prosecuted under s.7 — if you knew it was unsafe and did it anyway, the gaffer’s
              "I told him to" defence won’t save you.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "HASAWA is THE big safety law — every other workplace reg sits under it.",
              "Section 2 = boss’s five duties (safe plant, safe handling, ITIS, safe place, welfare).",
              "Section 3 = duties to everyone else affected (the public, sub-contractors, other trades).",
              "Section 7 = your two duties: don’t be reckless, cooperate with the system.",
              "'Reasonably practicable' = balance the risk against the cost and effort of fixing it. A few duties are absolute (like EAWR Reg 4 — working dead).",
              "BS 7671 + EAWR are how the electrical industry shows it’s meeting HASAWA. Follow them and you’re protected.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="HASAWA 1974 knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('..')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                UK health and safety legislation
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section1/1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Electricity at Work Regulations 1989
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
