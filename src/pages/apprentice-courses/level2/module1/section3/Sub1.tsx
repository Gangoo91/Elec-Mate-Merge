/**
 * Module 1 · Section 3 · Subsection 1 — Purpose of risk assessments
 * City &amp; Guilds 2365-02 → Unit 201
 *   • LO3 → AC 3.1 — state the procedure for producing risk assessments and
 *     method statements in accordance with their level of responsibility.
 *   • LO4 → AC 4.5 — explain practices and procedures for addressing hazards
 *     in the workplace.
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
  'Purpose of risk assessments | Level 2 Module 1.3.1 | Elec-Mate';
const DESCRIPTION =
  "Why every job on every site starts with a piece of paper that names the things that could hurt you — and what happens to apprentices who treat it as paperwork.";

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'rams-purpose-check',
    question: "What is a risk assessment actually for?",
    options: [
      'Covering the boss when something goes wrong',
      'Identifying what could hurt people on this job, and what to do about it',
      'Showing the client you’re professional',
      'Replacing PPE on site',
    ],
    correctIndex: 1,
    explanation:
      "It’s a planning tool. You look at the job, you name the things that could hurt someone, you decide how to stop them. Everything else (paperwork, evidence, client tick-boxes) is a side effect. If it’s only being done to cover backsides, it’s being done wrong.",
  },
  {
    id: 'rams-who-must-check',
    question: "Who has to make sure a suitable and sufficient risk assessment exists for the job?",
    options: [
      'The HSE before you start',
      'The apprentice on the day',
      'The employer (or self-employed person doing the work)',
      'The client',
    ],
    correctIndex: 2,
    explanation:
      "MHSWR 1999 Reg 3 puts the duty on the employer (and on self-employed people for their own work). On site you’ll often see it produced by a competent person on their behalf — but the legal duty is the employer’s.",
  },
  {
    id: 'rams-record-check',
    question: "When does the law require the significant findings to be written down?",
    options: [
      'Only when something has gone wrong',
      'Only on construction sites',
      'When the employer has 5 or more employees',
      'Always — verbal is never acceptable',
    ],
    correctIndex: 2,
    explanation:
      "MHSWR Reg 3(6) — the trigger is 5 or more employees. Most firms record everything anyway because the written record is what you actually use to run the job and what you reach for if the HSE asks questions later.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: "You arrive on site and your gaffer hands you a RAMS document. What’s the first thing you should do with it?",
    options: [
      "Sign it without reading — everyone else has",
      "Read it. Check the hazards listed match what you can actually see on site",
      "Ignore it and crack on, you’ve done this kind of job before",
      "File it in the van for the end of the week",
    ],
    correctAnswer: 1,
    explanation:
      "RAMS only protects you if you’ve actually read it and the controls are still right for the conditions. Signing without reading is one of the easiest ways an apprentice ends up in front of a coroner — or sacked.",
  },
  {
    id: 2,
    question: "The site RAMS says 'isolate at the local DB before drilling'. The DB you’re drilling near isn’t labelled and the gaffer says 'just kill the lighting circuit, you’ll be fine'. What do you do?",
    options: [
      "Crack on — the gaffer’s been here 20 years",
      "Stop. The RAMS doesn’t match what’s on site. Flag it before you drill",
      "Switch off everything in the building to be safe",
      "Drill through and check afterwards",
    ],
    correctAnswer: 1,
    explanation:
      "If the assessment doesn’t match reality, the controls don’t apply either. Stop, raise it, get the RAMS amended (or a fresh dynamic assessment done) before you put a drill through a wall.",
  },
  {
    id: 3,
    question: "Which regulation puts the legal duty to do a risk assessment on the employer?",
    options: [
      "BS 7671 Regulation 411.3",
      "EAWR 1989 Regulation 16",
      "MHSWR 1999 Regulation 3",
      "RIDDOR 2013",
    ],
    correctAnswer: 2,
    explanation:
      "Management of Health and Safety at Work Regulations 1999, Reg 3 — 'Every employer shall make a suitable and sufficient assessment'. It’s the legal hook that turns RAMS from good practice into a hard duty.",
  },
  {
    id: 4,
    question: "What does 'suitable and sufficient' actually mean for a risk assessment?",
    options: [
      "It must be at least 10 pages long",
      "It identifies the significant risks and helps you make sensible decisions about controls",
      "It covers every possible thing that could ever go wrong",
      "It has to be approved by the HSE",
    ],
    correctAnswer: 1,
    explanation:
      "HSE’s words: proportionate to the risk, identifies the significant hazards, considers who could be harmed, gets the controls right. Big jobs get big assessments. A single-socket swap doesn’t need a 30-page document — but it still needs you to think.",
  },
  {
    id: 5,
    question: "A mate gets electrocuted because the RAMS missed a buried live cable. The RAMS was a copy-paste from the last job. Who can the HSE prosecute?",
    options: [
      "Only the company",
      "Only the person who wrote the RAMS",
      "The employer, and potentially the individuals who knew the assessment was inadequate",
      "Nobody — it was an accident",
    ],
    correctAnswer: 2,
    explanation:
      "The corporate body gets done under HASAWA and MHSWR. But individuals — directors, supervisors, the person who signed it off — can be prosecuted personally if they knew (or should have known) the assessment wasn’t fit for the job. Generic copy-paste RAMS is a classic prosecution starter.",
  },
  {
    id: 6,
    question: "What’s the difference between a risk assessment and a method statement?",
    options: [
      "They’re the same thing with different names",
      "Risk assessment names the hazards and controls; method statement says how the work will be done in safe order",
      "Risk assessment is for the boss; method statement is for you",
      "Method statement is law; risk assessment is optional",
    ],
    correctAnswer: 1,
    explanation:
      "RA = what could hurt you and how we’re stopping it. MS = the actual sequence of work, who’s doing what, with what kit, in what order. They’re sister documents — that’s why they’re always bundled together as RAMS.",
  },
  {
    id: 7,
    question: "When does a risk assessment need to be reviewed?",
    options: [
      "Once every 5 years",
      "Only after an accident",
      "When circumstances change, when there’s reason to believe it’s no longer valid, or after an incident",
      "Never — once approved, it’s fixed",
    ],
    correctAnswer: 2,
    explanation:
      "MHSWR Reg 3(3): review when it’s no longer valid OR there’s been a significant change. New hazard appears, layout changes, near miss happens, weather turns — all triggers. Tomorrow’s site isn’t today’s site.",
  },
  {
    id: 8,
    question: "Your firm employs 4 sparks including you. Does the law require risk assessments to be written down?",
    options: [
      "Yes — always",
      "No — under 5 employees the SIGNIFICANT FINDINGS don’t have to be recorded by law (but are still expected as good practice)",
      "Only if the client asks",
      "Only for jobs over £10,000",
    ],
    correctAnswer: 1,
    explanation:
      "MHSWR Reg 3(6) only forces written records at 5+ employees. Below that, the assessment still has to happen — you just don’t legally have to write the significant findings down. Almost every firm does anyway, because verbal RAMS = no defence if anything goes wrong.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: "I’m the apprentice — am I supposed to write risk assessments?",
    answer:
      "Not full ones, no. The legal duty sits with the employer. But you ARE expected to read them, understand them, point out where they don’t match the site, and contribute observations during point-of-work checks. As you move through your apprenticeship you’ll do dynamic risk assessments (the on-the-spot ones) more and more — and by the time you’re a Level 3 spark, writing job-specific RAMS is part of the role.",
  },
  {
    question: "What if there’s no RAMS on the job?",
    answer:
      "Stop and ask. On a notifiable construction job (CDM 2015) it’s a legal must. On smaller domestic work it might genuinely not exist — but the assessment still has to have happened in someone’s head. If it hasn’t, you’re working blind. Politely flag it before you start. 'I just want to check what the RAMS says about X' is a perfectly normal question.",
  },
  {
    question: "Generic RAMS — is that allowed?",
    answer:
      "Generic templates are fine as a starting point — most firms have them for common jobs (CU change, socket add, light replacement). What’s NOT allowed is using a generic without making it site-specific. Suitable and sufficient means the controls match THIS site, THIS day, THIS team. Tick-box generic RAMS are one of the most common HSE prosecution patterns.",
  },
  {
    question: "Does the customer get to see the risk assessment?",
    answer:
      "On commercial sites, almost always — they’ll often demand it before letting you on. On domestic, usually not unless they ask. Either way the document belongs to your employer, who has to keep it for the duration of the work and a sensible period after (often quoted as 3+ years).",
  },
  {
    question: "What’s ALARP got to do with risk assessments?",
    answer:
      "ALARP — As Low As Reasonably Practicable — is the test the controls are judged against. Once you’ve identified a hazard, you don’t have to eliminate the risk completely (often impossible). You have to reduce it ALARP — to the point where the cost or trouble of doing more outweighs the safety gain. Bigger the risk, more you’ve got to do. It’s the principle every prosecution comes back to.",
  },
  {
    question: "RAMS, risk assessment, method statement, safe system of work — what’s the difference?",
    answer:
      "RAMS = the bundle (RA + MS). Risk assessment = the hazard-and-controls list. Method statement = the step-by-step plan. Safe System of Work = the broader concept — the whole way the job is run safely, of which RAMS is the documentation. Permit-to-work systems sit on top for higher-risk jobs (live work, confined spaces). All four are layers of the same idea.",
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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 1 · Section 3 · Subsection 1"
            title="Purpose of risk assessments"
            description="Why every job on every site starts with a piece of paper that names the things that could hurt you — and what happens to the apprentices who treat it as paperwork to sign rather than a plan to read."
            tone="emerald"
          />

          <TLDR
            points={[
              "A risk assessment names what could hurt you on THIS job and decides how to stop it. Everything else is a side effect.",
              "It’s a legal duty under MHSWR 1999 Reg 3 — the employer has to do one for every work activity, and write down the significant findings if there are 5+ employees.",
              "On site, your job is to READ it, check it matches reality, and flag it the moment it doesn’t. Signing without reading is a sackable habit — and not a defence in court.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain what a risk assessment is for, in plain English — and what it isn’t.",
              "State the legal duty under MHSWR 1999 Reg 3 and who it sits on.",
              "Tell the difference between hazard, risk, and control measure.",
              "Describe what 'suitable and sufficient' actually means for a job-specific assessment.",
              "Apply the ALARP principle to a real on-site decision.",
              "Recognise when a RAMS document doesn’t match the site — and know what to do about it.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this exists</ContentEyebrow>

          <ConceptBlock title="The whole point: stop the accident before it happens">
            <p>
              You learnt in Section 1 that HASAWA puts a general duty on the boss to keep you safe.
              You learnt in Section 2 what electricity actually does to a body, and the other things
              on site that quietly hurt sparks (slips, manual handling, working at height). A risk
              assessment is the bridge between those two.
            </p>
            <p>
              The HSE prosecutes around{' '}
              <strong>1,000 electrical incidents at work each year</strong>. Most of them weren’t
              caused by missing knowledge — they were caused by someone skipping the planning step.
              Drilling without checking what was behind the wall. Working live because nobody
              wrote down a safe isolation procedure. A buried cable nobody mapped.
            </p>
            <p>
              The risk assessment is the moment the accident gets prevented — on paper, in the van
              before you get the kit out. Get the paper right, and the day mostly runs itself.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The three words you have to know</ContentEyebrow>

          <ConceptBlock
            title="Hazard, risk, control measure — they’re not the same thing"
            plainEnglish="A hazard is the thing that could hurt you. The risk is how likely it is, and how bad if it does. The control measure is what you’re doing about it."
            onSite="When the gaffer asks 'what’s the hazard?' and you say 'electricity', you’re half-right. Better answer: 'the live tails coming into the consumer unit' — that’s a specific hazard. 'Mate working overhead' is a risk factor. 'Lock-off, prove dead, work cover off' is the control."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hazard</strong> — anything with the potential to cause harm. A live conductor, a
                step ladder, a drum of cable, a wet floor, asbestos in the ceiling void.
              </li>
              <li>
                <strong>Risk</strong> — the chance the hazard actually causes harm × how bad the harm would
                be. Same hazard, different risks: a 230 V tail in a sealed enclosure has a low risk
                until you take the cover off, then it’s very high.
              </li>
              <li>
                <strong>Control measure</strong> — what you put in place to reduce the risk. Isolation, PPE,
                barriers, training, supervision, written procedures. Most jobs need several layers.
              </li>
            </ul>
            <p>
              The risk assessment is the document that walks through every significant hazard,
              estimates the risk, and lists the controls. Method statement (next subsection) is how
              you actually do the work given those controls.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="MHSWR 1999 — Regulation 3(1)"
            clause="Every employer shall make a suitable and sufficient assessment of (a) the risks to the health and safety of his employees to which they are exposed whilst they are at work; and (b) the risks to the health and safety of persons not in his employment arising out of or in connection with the conduct by him of his undertaking."
            meaning={
              <>
                The legal hook. Every employer (and any self-employed spark working for themselves)
                has to assess the risks before work happens. It covers <em>employees</em> AND{' '}
                <em>everyone else affected by the work</em> — customers, the public, other trades.
                'Suitable and sufficient' is the test the HSE applies if anything goes wrong.
              </>
            }
            cite="Reference: HSE — Management of Health and Safety at Work Regulations 1999, Regulation 3"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What the law actually wants</ContentEyebrow>

          <ConceptBlock
            title="'Suitable and sufficient' — what HSE means by it"
            plainEnglish="Big enough to do its job, no bigger. Identifies the real significant hazards, considers who’s affected, gets the controls right. A 30-page document for swapping a socket is wrong. A two-line sentence for a CU change is also wrong."
          >
            <p>
              HSE guidance (HSG65 / INDG163) breaks the 'suitable and sufficient' test into four
              parts. Your assessment has to:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify the significant risks</strong> — not every conceivable risk, just the
                ones that could realistically cause harm. Trivial risks (a paper cut from the
                spec sheet) you can ignore.
              </li>
              <li>
                <strong>Identify who’s affected</strong> — yourself, mates, other trades, the customer,
                the public, vulnerable people (kids, elderly, anyone with a disability).
              </li>
              <li>
                <strong>Be appropriate to the nature of the work</strong> — proportionate. Bigger and more
                dangerous the job, more detailed the assessment.
              </li>
              <li>
                <strong>Identify the period of time it remains valid</strong> — when it gets reviewed and
                what triggers an early review.
              </li>
            </ol>
            <p>
              That last one trips people up. A risk assessment isn’t a one-off. It’s alive for the
              duration of the work — and the moment something significant changes (new hazard,
              different team, weather turns, near miss happens), it gets reviewed.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE INDG163 — 'Risk assessment: A brief guide to controlling risks in the workplace'"
            clause="A risk assessment is not about creating huge amounts of paperwork, but rather about identifying sensible measures to control the risks in your workplace. The law does not expect you to eliminate all risk, but you are required to protect people as far as 'reasonably practicable'."
            meaning={
              <>
                Straight from HSE. Risk assessment is a thinking exercise, not a paperwork
                exercise. The output is sensible controls, not a document for the filing cabinet.
                Anyone telling you otherwise has missed the point — and the HSE inspector who
                turns up after an accident has missed nothing.
              </>
            }
            cite="Reference: HSE INDG163 (paraphrased) — original text on HSE website"
          />

          <ConceptBlock
            title="The 5+ employees rule — when it has to be in writing"
            onSite="Most firms above the size of one person and a van will have written RAMS for everything anyway. The legal threshold is the floor, not the standard. Verbal RAMS = no audit trail = no defence."
          >
            <p>
              MHSWR Reg 3(6) only forces written records when the employer has 5 or more
              employees. Below that, the assessment still has to happen — the employer just
              isn’t legally forced to write it down.
            </p>
            <p>
              In practice this distinction barely matters. Insurance won’t cover you without
              written records. Larger clients won’t let you on site without RAMS. And if anything
              ever goes wrong, the HSE will ask 'show me your assessment' — and 'I had it in my
              head' is not an acceptable answer.
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

          <ContentEyebrow>ALARP — the test every control gets measured against</ContentEyebrow>

          <ConceptBlock
            title="As Low As Reasonably Practicable — the principle behind every decision"
            plainEnglish="You don’t have to make it impossible for anyone to ever get hurt. You have to push the risk down until the cost, time and trouble of doing more outweighs the safety gain."
            onSite="Two examples. (1) An RCD on every socket is now ALARP — they’re cheap, they save lives, no excuse not to. (2) Body-worn arc-flash suits for every CU change is NOT ALARP — the risk doesn’t justify the cost on a typical domestic install. The judgement is what makes the assessor competent."
          >
            <p>
              ALARP comes from HASAWA (the 'so far as is reasonably practicable' phrase you met in
              Section 1.1) and runs through every UK safety reg. It defines what 'good enough'
              looks like. Three regions:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Intolerable</strong> — the risk is so high it cannot be justified, whatever the
                benefit. Working on a live HV busbar without authorisation. Not negotiable.
              </li>
              <li>
                <strong>ALARP / tolerable</strong> — the risk is real but you’ve pushed it down to where
                further reduction would cost grossly more than the safety benefit. This is where
                most well-controlled work lives.
              </li>
              <li>
                <strong>Broadly acceptable</strong> — the risk is so low it’s not worth doing more about it
                (within reason). Routine tasks with proven controls.
              </li>
            </ul>
            <p>
              The risk assessment is where you make the ALARP call for each significant hazard.
              The HSE inspector who turns up after an incident asks one question: was the risk
              ALARP at the time? If yes, you defended yourself. If no, prosecution.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong when it gets skipped</ContentEyebrow>

          <CommonMistake
            title="Treating RAMS as paperwork to sign rather than a plan to read"
            whatHappens={
              <>
                Eight blokes on a site. RAMS comes round on a clipboard. Everyone signs it
                without reading because that’s what they always do. Three weeks in, an apprentice
                drills into a buried cable that the RAMS specifically warned about. He’s lucky —
                burns to the hand and a six-month cardiac follow-up. The HSE looks at the
                clipboard, sees his signature, sees he never actually read the document. Now it’s
                his s.7 problem too — not just the gaffer’s.
              </>
            }
            doInstead={
              <>
                Treat the signature like a contract you’ve actually read. Two minutes per page.
                Find the hazards listed, find your name, find what you’re supposed to do
                differently. If something doesn’t make sense, ASK before you sign. 'I just want
                to check what this section means' is a normal, professional question — not a
                pain in the gaffer’s side.
              </>
            }
          />

          <CommonMistake
            title="Reading the RAMS once at induction and never looking at it again"
            whatHappens={
              <>
                Day-one site induction is a fire-hose. RAMS, traffic management plan, welfare
                arrangements, fire muster point — you nod through it. Three months later you’re
                still on the same job and the conditions have completely changed (a wall came
                down, scaffold went up, a new sub-contractor arrived). You’re working off the
                day-one mental model. None of the new hazards are in your head. Easy way to walk
                into an accident.
              </>
            }
            doInstead={
              <>
                The RAMS lives in the site office or the cabin for a reason. Re-read the bits
                relevant to your work each morning — takes 60 seconds. If anything has changed on
                site, the RAMS should have been reviewed. If it hasn’t, that’s your point-of-work
                check (Sub 4) — flag it. Old RAMS + new hazards = the textbook prosecution
                pattern.
              </>
            }
          />

          <Scenario
            title="The site induction RAMS says 'isolate before drilling'. The gaffer says 'just crack on, it’s only a sub-board.'"
            situation={
              <>
                You’re on a small commercial fit-out, second week. RAMS for the day’s work
                clearly says any drilling near electrical equipment requires the local
                distribution board to be isolated and proved dead first. You’re fitting trunking
                and need to drill through a partition near a sub-DB. The site supervisor walks
                past, sees you setting up the lock-off, and says 'leave it, don’t bother with
                that, it’s only a sub-board, just crack on.'
              </>
            }
            whatToDo={
              <>
                Don’t crack on. The RAMS is the legal document that controls how the work gets
                done — the supervisor verbally overriding it doesn’t make that legal. Politely:
                'The RAMS says I need to isolate first — I’m happy to do it the way it’s written
                but I’m not happy ignoring it. Can we get the RAMS amended if we want to do it
                differently, or shall I just isolate?' If they push back, escalate above them —
                principal contractor, your own employer, whoever signs your timesheet. Note the
                conversation: time, name, what was said.
              </>
            }
            whyItMatters={
              <>
                If you drill into a live cable because you ignored the RAMS on someone else’s
                say-so, the HSE prosecution lands on YOU under HASAWA s.7 (you knowingly
                breached a written safe system of work) AND the gaffer (he instructed you to).
                Both go down. 'He told me to' is not a defence. The RAMS is the agreed plan —
                and it changes only on paper, not on the say-so of a supervisor under time
                pressure.
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

          <ContentEyebrow>Where it links back to the rest of the safety stack</ContentEyebrow>

          <ConceptBlock
            title="HASAWA → MHSWR → RAMS → safe isolation"
            plainEnglish="Each layer turns the one above into something more concrete. HASAWA: 'be safe'. MHSWR Reg 3: 'plan to be safe'. RAMS: 'this is the plan for THIS job'. Safe isolation procedure: 'this is the exact step on the day'."
          >
            <p>
              You met HASAWA in Section 1.1 and the specific hazards in Section 2. The risk
              assessment is what stitches them together for a real job. It’s where the law
              becomes a list of actions you do today.
            </p>
            <p>
              The next three subsections walk through the practical mechanics — the five-step
              HSE method (Sub 2), how method statements turn the controls into a sequence of
              work (Sub 3), and how RAMS gets used live on site through toolbox talks and
              point-of-work checks (Sub 4). Section 5 then drills into safe isolation — the
              single most-used control measure in any electrical RAMS.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="MHSWR 1999 — Regulation 3(3)"
            clause="Any assessment such as is referred to in paragraph (1) or (2) shall be reviewed by the employer or self-employed person who made it if (a) there is reason to suspect that it is no longer valid; or (b) there has been a significant change in the matters to which it relates; and where as a result of any such review changes to an assessment are required, the employer or self-employed person concerned shall make them."
            meaning={
              <>
                Risk assessment is not 'do it once, file it forever'. It has to be reviewed when
                anything significant changes — new equipment, new people, a near miss, a
                different layout, weather conditions. Most jobs have a 'live document' field on
                the RAMS for exactly this reason. Your point-of-work checks (Sub 4) are the
                ground-floor version of this same duty.
              </>
            }
            cite="Reference: HSE — Management of Health and Safety at Work Regulations 1999, Regulation 3(3)"
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "A risk assessment names the hazards on THIS job and decides what controls go in. It’s a planning tool, not paperwork.",
              "Legal duty: MHSWR 1999 Reg 3 — sits on the employer (and on self-employed sparks for their own work).",
              "'Suitable and sufficient' = identifies significant risks, considers everyone affected, proportionate to the job, has a review trigger.",
              "Significant findings have to be in writing if the employer has 5+ employees. Almost every firm writes them down anyway.",
              "ALARP is the test every control measure gets judged against — push the risk down until further effort costs grossly more than the safety gain.",
              "Your job as an apprentice: READ the RAMS, check it matches the site, flag it the second it doesn’t. Signing without reading is a sackable habit and not a defence.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="Purpose of risk assessments knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section2/2-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Slips, trips and manual handling
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section3/3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                The five-step risk assessment process
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
