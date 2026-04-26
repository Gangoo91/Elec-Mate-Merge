/**
 * Module 1 · Section 3 · Subsection 3 — Method statements and safe systems of work
 * City &amp; Guilds 2365-02 → Unit 201
 *   • LO3 → AC 3.1 — state the procedure for producing risk assessments and
 *     method statements in accordance with their level of responsibility.
 *   • LO3 → AC 3.7 — describe and demonstrate safe practices and procedures
 *     for the use of equipment and materials in the working environment.
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
  'Method statements and safe systems of work | Level 2 Module 1.3.3 | Elec-Mate';
const DESCRIPTION =
  "How the controls from your risk assessment turn into a step-by-step plan you can actually work to — and how permits, safe isolation procedures and toolbox talks fit on top.";

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'method-statement-purpose-check',
    question: "What does a method statement add that a risk assessment doesn’t?",
    options: [
      'It replaces the risk assessment',
      'It describes the sequence of work — exactly how the job will be done given the controls',
      'It’s the legal document the HSE looks at first',
      'It records what happened after the job',
    ],
    correctIndex: 1,
    explanation:
      "RA names the hazards and controls. MS turns those controls into the actual order of work — who does what, with what kit, in what sequence, with what handovers. Both are needed; that’s why they’re bundled as RAMS.",
  },
  {
    id: 'permit-to-work-check',
    question: "When is a permit-to-work typically required on top of a method statement?",
    options: [
      'For every electrical job',
      'For higher-risk work that needs explicit authorisation each time — live work, confined spaces, work near HV',
      'Only on Mondays',
      'Only if the customer asks for one',
    ],
    correctIndex: 1,
    explanation:
      "Permits are a layer ON TOP of RAMS for jobs where you can’t allow someone to just 'crack on' — work that needs a competent person to formally authorise it for that specific shift. Live work, confined spaces, hot work near flammables, work near HV. The permit isn’t the system of work — it’s the authorisation gate.",
  },
  {
    id: 'sssw-definition-check',
    question: "A 'safe system of work' is BEST described as:",
    options: [
      'Just a written document',
      'The risk assessment',
      'The whole way the job is run safely — RA, MS, controls, training, supervision, communication, permits',
      'PPE',
    ],
    correctIndex: 2,
    explanation:
      "SSoW is the umbrella concept. RAMS is the documentation. Controls, training, permits, supervision, comms, monitoring all sit inside it. HASAWA s.2(2)(a) puts a hard duty on the employer to provide and maintain safe systems of work.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: "You’re reading a method statement for a CU change. Which of these would you EXPECT to see written down?",
    options: [
      "Only the customer’s name",
      "Sequence of work, isolation procedure, who does what, tools and PPE required, emergency arrangements, drawings/SLD references",
      "Just the start and finish times",
      "The price of the job",
    ],
    correctAnswer: 1,
    explanation:
      "A useful method statement tells you the sequence of work, isolation steps, role allocations, kit list, PPE, emergency contacts, and references back to the risk assessment and any relevant drawings or schedules. If it’s missing any of that, it’s probably not site-specific enough.",
  },
  {
    id: 2,
    question: "The MS step says 'isolate at the main switch and prove dead'. The site reality: the main switch is locked behind a panel only the building manager has the key to, and they’re off today. What do you do?",
    options: [
      "Crack on without isolating — it should be fine",
      "Stop. The MS can’t be followed as written. Either get key access (call building manager), find an alternative isolation point in the MS, or pause the work until tomorrow",
      "Find a different lock and put yours on it",
      "Skip just this step and do the rest",
    ],
    correctAnswer: 1,
    explanation:
      "If you can’t follow the method statement as written, you don’t have a safe system of work. Either restore the conditions the MS assumes (get the key) or pause until you can. Skipping or improvising steps is exactly how prosecutions start.",
  },
  {
    id: 3,
    question: "Which BEST describes the relationship between a risk assessment, a method statement and a permit-to-work?",
    options: [
      "They’re three names for the same document",
      "RA = hazards and controls; MS = the sequence of work; PTW = formal authorisation for higher-risk tasks for a specific shift",
      "Permit-to-work replaces both",
      "Method statement replaces the risk assessment",
    ],
    correctAnswer: 1,
    explanation:
      "Three layers, distinct purposes. RA identifies what could hurt you. MS turns the controls into a sequence. PTW (when needed) is the formal sign-off that says 'you, specifically, are authorised to do this specific job, today, with these conditions in place'.",
  },
  {
    id: 4,
    question: "Where does the legal duty for a 'safe system of work' actually come from?",
    options: [
      "BS 7671 Regulation 411.3",
      "EAWR 1989 Regulation 4(3)",
      "HASAWA 1974 Section 2(2)(a) — and EAWR Reg 4 specifically for electrical work",
      "MHSWR Regulation 14",
    ],
    correctAnswer: 2,
    explanation:
      "HASAWA s.2(2)(a) puts the general duty on the employer to provide 'safe systems of work'. EAWR 1989 Reg 4(3) makes that specific for electrical work — every work activity on or near electrical equipment must be done in a manner that doesn’t give rise to danger.",
  },
  {
    id: 5,
    question: "You’re shown a method statement that’s 80 pages long for installing a single LED downlight. What’s most likely wrong?",
    options: [
      "Nothing — bigger is always safer",
      "It’s probably generic and not job-specific. A useful MS is proportionate to the actual work",
      "It’s perfect — copy it for every future job",
      "The customer wrote it",
    ],
    correctAnswer: 1,
    explanation:
      "Proportionate documentation is the principle. A single-fitting job that runs to 80 pages is bureaucratic theatre, not safety. Workers won’t read it, the actual hazards get buried, and the MS fails its primary purpose: telling someone how to do the job safely. Right-sized RAMS is part of competence.",
  },
  {
    id: 6,
    question: "What’s the FIRST thing you should do at the start of a shift covered by a method statement?",
    options: [
      "Sign it without reading",
      "Read the relevant sections, check the controls listed are in place on site, raise anything that doesn’t match",
      "Photocopy it",
      "Email it to the customer",
    ],
    correctAnswer: 1,
    explanation:
      "Pre-work check: read it, verify it, raise mismatches. This is the bridge between Step 4 (implement) and Step 5 (review) of the five-step process. It’s also the foundation of point-of-work checks (Sub 4) — the live, on-the-ground version of the same idea.",
  },
  {
    id: 7,
    question: "On a permit-to-work for live electrical testing, what should the permit specify?",
    options: [
      "Only the date",
      "The exact work to be done, who’s authorised to do it, the duration, the precautions required, and how the permit is closed off when work is finished",
      "Just the customer’s address",
      "Nothing — it’s just paperwork",
    ],
    correctAnswer: 1,
    explanation:
      "A permit isn’t a formality. It defines the work, the people, the duration, the precautions, and the close-out. When the permit is open, the work is authorised under those conditions; when it’s closed, the system goes back to its normal state. That sequence is what makes it a control rather than just paperwork.",
  },
  {
    id: 8,
    question: "Your RAMS bundle includes a method statement that references 'Procedure SOP-014: Safe Isolation'. The procedure isn’t attached and you’ve never seen it. What do you do?",
    options: [
      "Make up your own isolation procedure",
      "Crack on and assume the standard procedure",
      "Ask for the procedure document before starting work — the MS isn’t complete without it",
      "Skip isolation altogether",
    ],
    correctAnswer: 2,
    explanation:
      "If a method statement references a separate procedure, that procedure is part of the safe system of work. You can’t follow what you haven’t read. Ask for it before you start. 'I assumed' is one of the most common phrases in HSE prosecution narratives.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: "Are method statements legally required?",
    answer:
      "Not directly named in MHSWR — but the 'safe system of work' duty in HASAWA s.2(2)(a) and EAWR Reg 4(3) effectively forces them for any non-trivial job. CDM 2015 makes them the default expectation on construction sites. Most clients won’t let you on site without one. So in practice: yes, expect to need one for almost any work beyond the smallest domestic task.",
  },
  {
    question: "Who should write the method statement?",
    answer:
      "A competent person on behalf of the employer — usually a supervisor, project manager, or a designated competent person within the firm. As you progress through your apprenticeship and into qualified work, writing job-specific method statements becomes part of the role. Generic MS templates are common starting points, but each job needs site-specific tweaks.",
  },
  {
    question: "What should a good method statement actually contain?",
    answer:
      "Standard contents: scope of work, references to the risk assessment, sequence of operations (numbered steps), people and roles, plant and tools, materials, PPE, isolation procedures, emergency arrangements, supervision, training requirements, references to drawings and standards, sign-off. Some firms also include 'stop the job' triggers and lessons-learned space.",
  },
  {
    question: "What if the actual work doesn’t go to the method statement?",
    answer:
      "Stop and review. If you’re halfway through and reality has diverged from the plan, you don’t have a safe system of work any more — you have an improvisation. Either get back to the plan or get the plan changed (Step 5 review of the RAMS, MS amended, briefed back to the team). 'We’re halfway, let’s just push through' is the wrong answer.",
  },
  {
    question: "What’s a 'permit-to-work' and when do I need one?",
    answer:
      "A formal written authorisation for higher-risk work that you can’t allow people to just decide to do on their own. Common uses: live electrical work, hot work (welding, cutting), confined spaces, work near HV, work on safety-critical systems. The permit specifies WHO can do WHAT under WHICH conditions for HOW LONG — and it has to be formally closed when the work finishes. It sits ON TOP of RAMS, not instead of them.",
  },
  {
    question: "I’m an apprentice — do I need to write or sign these documents?",
    answer:
      "Sign: yes, you sign to confirm you’ve read and understood the RAMS that covers your work. Write: not full RAMS at apprentice stage, no — but you’ll start contributing to dynamic risk assessments and point-of-work checks (Sub 4) from very early on, and by the time you’re a Level 3 electrician you’ll be expected to write site-specific method statements for jobs you supervise.",
  },
];

export default function Sub3() {
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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 1 · Section 3 · Subsection 3"
            title="Method statements and safe systems of work"
            description="How the controls from your risk assessment turn into a step-by-step plan you can actually work to — and how permits, safe isolation procedures and toolbox talks layer on top to make a complete safe system of work."
            tone="emerald"
          />

          <TLDR
            points={[
              "A method statement turns the risk-assessment controls into a sequence of work — who does what, in what order, with what kit. RA + MS = RAMS.",
              "A 'safe system of work' is the whole package — RAMS, controls, training, permits, supervision, comms. HASAWA s.2(2)(a) puts a legal duty on the employer to provide one.",
              "Permits-to-work sit on top of RAMS for higher-risk jobs (live work, confined spaces, hot work). They’re formal authorisation, not just paperwork.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain the difference between a risk assessment, a method statement, a permit-to-work and a safe system of work.",
              "List the key sections you’d expect in a useful, site-specific method statement.",
              "State the legal duty for a safe system of work under HASAWA s.2(2)(a) and EAWR Reg 4(3).",
              "Identify when a permit-to-work is required and what it has to specify.",
              "Recognise generic vs site-specific MS — and the prosecution risk of working off generics that don’t match the site.",
              "Use the MS as a live document on the day — pre-work check, mid-job adjustments, close-out.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The four words you have to keep separate</ContentEyebrow>

          <ConceptBlock
            title="RA, MS, RAMS, SSoW — what each one actually is"
            plainEnglish="Risk assessment names the hazards and controls. Method statement turns those controls into the order of work. RAMS is the bundle of both. Safe system of work is the bigger picture — RAMS plus the people, training, permits, supervision and comms that make it all actually run."
            onSite="Most sites you’ll work on will hand you a RAMS pack. The pack contains both documents — sometimes as separate files, sometimes interleaved on the same form. The site’s safe system of work also includes the toolbox talks, permits, induction, and the supervisor walking the floor. RAMS is the documentation; SSoW is the living thing."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Risk assessment (RA)</strong> — identifies the significant hazards, who could be
                harmed and the controls. The 'what' and 'why'.
              </li>
              <li>
                <strong>Method statement (MS)</strong> — describes the actual sequence of work given those
                controls. The 'how' and 'when' and 'who'.
              </li>
              <li>
                <strong>RAMS</strong> — the combined document or pack. What you’ll be handed on site.
              </li>
              <li>
                <strong>Safe system of work (SSoW)</strong> — the whole way the job is run safely. RAMS
                plus competence, supervision, communication, permits, monitoring, training. The
                concept the law actually requires.
              </li>
              <li>
                <strong>Permit-to-work</strong> — a separate formal authorisation document for
                higher-risk tasks. Sits on top of RAMS for those specific jobs.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HASAWA 1974 — Section 2(2)(a)"
            clause="The provision and maintenance of plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health."
            meaning={
              <>
                'Safe systems of work' is a HASAWA phrase, not a regulation invented later. The
                duty is on the employer to <em>provide</em> them AND <em>maintain</em> them.
                Provision is RAMS, training, kit, permits. Maintenance is reviewing, updating,
                supervising, and stopping work when the system breaks down.
              </>
            }
            cite="Reference: HSE — Health and Safety at Work etc. Act 1974, Section 2(2)(a)"
          />

          <RegsCallout
            source="EAWR 1989 — Regulation 4(3)"
            clause="Every work activity, including operation, use and maintenance of a system and work near a system, shall be carried out in such a manner as not to give rise, so far as is reasonably practicable, to danger."
            meaning={
              <>
                The electrical-specific version. EAWR Reg 4(3) is the hook the HSE uses when an
                electrical accident traces back to a missing or inadequate method of work. It’s
                why every electrical job — however small — needs SOMEONE to have thought
                through how it’s being done safely. RAMS is how you evidence that thinking.
              </>
            }
            cite="Reference: HSE — Electricity at Work Regulations 1989, Regulation 4(3)"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What goes in a useful method statement</ContentEyebrow>

          <ConceptBlock
            title="The sections you’ll see — and why each one earns its space"
            plainEnglish="A method statement isn’t a free-form essay. It has a standard shape because every section answers a question someone on site needs to know the answer to before they can work safely."
            onSite="When you read an MS for the first time, scan for the sections in this order: scope, sequence, isolation, emergency. Those four tell you 90% of what you need to know about the job. Everything else is supporting detail."
          >
            <p>Standard sections of a useful, job-specific MS:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Scope</strong> — what work is in (and what’s explicitly out). Stops scope creep
                being rolled in without a fresh assessment.
              </li>
              <li>
                <strong>Reference documents</strong> — the relevant risk assessment(s), drawings,
                schedules, manufacturer data, BS 7671 reference. Tells you what to read alongside.
              </li>
              <li>
                <strong>Personnel and roles</strong> — who’s on the team, who’s the competent person in
                charge, who’s authorised for what (apprentice / instructed / skilled).
              </li>
                <li>
                <strong>Sequence of operations</strong> — numbered steps, in order. The heart of the
                document. Including the safe isolation procedure as discrete steps with prove-dead.
              </li>
              <li>
                <strong>Plant, tools and equipment</strong> — what kit is needed and what spec. Voltage
                indicator (must be GS38 compliant). Lock-off kit. Test instruments. Insulated tools.
              </li>
              <li>
                <strong>PPE</strong> — what’s required for which steps. Helmet, eye protection,
                insulated gloves, arc-rated clothing where applicable.
              </li>
              <li>
                <strong>Isolation arrangements</strong> — exact isolation point, padlock arrangement,
                warning notices, who holds the key, who proves dead.
              </li>
              <li>
                <strong>Emergency arrangements</strong> — first aid, who’s the first-aider, AED location,
                emergency contacts, fire muster point, ambulance access. Read it BEFORE you need it.
              </li>
              <li>
                <strong>Sign-off</strong> — who wrote it, who approved it, who briefed the team, who
                read and understood it. Signatures with dates.
              </li>
            </ul>
            <p>
              Right-sized to the job. A single-socket replacement MS might be a one-page form
              with these sections in compressed form. A commercial CU upgrade might be 15-20
              pages. An LV/HV interface job could be 40+. The principle is proportionate — not
              minimum, not maximum.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Generic vs site-specific — the prosecution line"
            onSite="A generic MS for 'CU change' is a fine starting point. A generic MS used unchanged on a tenanted flat with elderly occupants and a shared meter cupboard is a problem waiting to happen. The work to make it site-specific is the work that actually keeps you safe."
          >
            <p>
              Generic templates exist because most jobs share a common shape. CU changes,
              socket additions, lighting refurbs — your firm will have a pattern. The risk is
              treating the generic as the finished article.
            </p>
            <p>
              The HSE’s 'suitable and sufficient' test (and its method-statement equivalent
              under the safe systems of work duty) demands site-specific application. That
              means walking the actual site, naming the actual hazards present, listing the
              actual people involved, and writing the controls for THIS job. Generic templates
              with site-specific overlays are normal. Generic templates run unchanged are a
              prosecution starter.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Permits-to-work — when you need them</ContentEyebrow>

          <ConceptBlock
            title="A formal authorisation gate for higher-risk work"
            plainEnglish="Some work is risky enough that you can’t allow it to just happen because someone read the RAMS. It needs a competent person to formally authorise THIS person doing THIS specific job for THIS specific period, with named precautions verified before work starts."
            onSite="Examples on electrical jobs: live work where dead working isn’t reasonably practicable (rare), work in a confined space (cable pit, riser shaft), hot work near flammables (welding, soldering with naked flame), work on or near HV apparatus, work that requires temporary lift of safety interlocks."
          >
            <p>A typical permit-to-work specifies:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>The exact work to be done — scope and limits.</li>
              <li>Person(s) authorised to do it — by name, with competence verified.</li>
              <li>Period the permit is valid for — typically a single shift.</li>
              <li>Precautions that must be in place before work starts — checked off.</li>
              <li>Precautions that must remain in place during work — supervision, monitoring.</li>
              <li>Communications arrangements — radio check, lone-worker check-in.</li>
              <li>Sign-on (issuer, recipient) and sign-off (work complete, system restored).</li>
            </ul>
            <p>
              The permit isn’t paperwork for its own sake. It’s the gate. Open permit = work
              authorised under named conditions. Closed permit = system back to normal,
              barriers down, lock-offs removed. The discipline of opening and closing the
              permit is what stops 'I thought you’d done that' incidents.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE HSG85 — 'Electricity at work: Safe working practices'"
            clause="A permit-to-work is a formal written system used to control certain types of work which are potentially hazardous. It is a statement, signed by an authorised person, that the conditions for safety have been met and the work specified can proceed."
            meaning={
              <>
                HSG85 is the HSE’s practical guide for electrical work. The permit-to-work
                section is short but firm: for higher-risk electrical work, formal written
                authorisation is the expected standard. On larger sites you’ll see permit
                systems used routinely. On smaller jobs they may be used only for specific
                tasks (live testing, work near HV).
              </>
            }
            cite="Reference: HSE HSG85 (paraphrased) — full document on HSE website"
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Working to the method statement on the day</ContentEyebrow>

          <ConceptBlock
            title="Pre-work check, mid-job adjustments, close-out"
            plainEnglish="The MS isn’t a document you sign and forget. You read it before you start, work to it during the job, and reference it at the end to confirm everything’s back to normal."
            onSite="Pre-work: read the relevant sections, walk the site, check controls listed are physically in place, raise mismatches BEFORE work starts. Mid-job: if anything changes, stop and trigger a Step 5 review (Sub 2). Close-out: confirm isolations restored, permits closed, area clear, paperwork signed."
          >
            <p>Pre-work check — what you’re looking for:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Are the named people on site? (Including the first-aider.)</li>
              <li>Is the listed kit available and in date? (Voltage indicator function-tested.)</li>
              <li>Is the isolation point accessible and labelled?</li>
              <li>Are the listed PPE items available and in good condition?</li>
              <li>Have any environmental conditions changed since the MS was written?</li>
              <li>Does the customer/occupier know what’s about to happen?</li>
            </ul>
            <p>
              Mid-job: if you hit something the MS didn’t cover (an unexpected cable, a different
              circuit topology, an additional occupant), stop and escalate. Don’t improvise. The
              MS has to be amended (Step 5) before you carry on. Sub 4 covers point-of-work
              checks in detail — they’re the live, in-the-moment version of the same idea.
            </p>
            <p>
              Close-out: every isolation restored OR formally left in a known state. Every
              permit closed. Every lock removed (yours, by you). Customer briefed on anything
              they need to know. Paperwork completed. The job isn’t finished until the system
              is documented as back to normal.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating the method statement as instructions for someone ELSE"
            whatHappens={
              <>
                Apprentice arrives on site, RAMS pack handed to the supervisor, supervisor skim-reads
                it, doesn’t share the detail with the apprentice. Apprentice gets stuck into
                the work knowing only what they’ve been told verbally. Halfway through there’s
                a step the apprentice didn’t know about (e.g. 'temporary feed required to keep
                the alarm system live during the CU change'). Alarm goes down, building
                evacuates, money lost, supervisor blames apprentice, apprentice has no defence
                because they never read the document.
              </>
            }
            doInstead={
              <>
                If your name is on the team, the MS applies to YOU. Read it. The whole thing,
                or at minimum every section that mentions your role or your part of the work.
                If the supervisor hasn’t shared it, ask. 'Can I read the MS before we start?' is a
                completely normal request — and any supervisor who refuses is making a problem for
                themselves later.
              </>
            }
          />

          <Scenario
            title="The MS says 'apprentice to assist with cable pulling under direct supervision'. The supervisor leaves site to take a call."
            situation={
              <>
                You’re on a small commercial fit-out, second day. The method statement is
                explicit: cable pulling requires direct supervision of the apprentice (you).
                The supervisor steps outside to take a call from the office, says it’ll be
                'two minutes'. Twenty minutes later they’re still not back. The job is on a
                schedule and you’re aware time’s being lost. The other electrician on site (not your
                supervisor, not in the MS for your supervision) says 'just keep going, I’m
                here'.
              </>
            }
            whatToDo={
              <>
                Stop pulling cable. The MS specifies 'direct supervision' — not 'someone else
                in the building'. Either wait for your named supervisor to return, OR get the
                MS amended on the spot (someone competent has to formally authorise the other
                electrician as your supervisor for the duration). Don’t carry on under informal
                cover. While you wait, do something the MS doesn’t require supervision for —
                tidy the route, prep the next pull, label cables. You’re working productively
                without breaching the system of work.
              </>
            }
            whyItMatters={
              <>
                The MS is the safe system of work for that activity. 'Someone else is here' is
                not the same as 'direct supervision'. If something goes wrong (you damage the
                cable, you injure yourself, you damage the building) and you were working
                outside the MS, you’ve got no defence — and your supervisor is also in the
                wrong for leaving you. EAWR Reg 16 (technical knowledge or experience) and
                HASAWA s.2(2)(c) (supervision) both apply. Your willingness to stop the job is
                a sign of competence, not weakness.
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

          <ContentEyebrow>How it all stacks up</ContentEyebrow>

          <ConceptBlock
            title="HASAWA → EAWR → RA → MS → permit → safe isolation"
            plainEnglish="Each layer makes the one above more concrete. The law says 'be safe'. RAMS turns that into 'this is the plan for THIS job'. The permit (where needed) is the formal go-ahead for THIS shift. The safe isolation procedure (Section 5) is the actual sequence of switches and tests on the day."
          >
            <p>
              You met the legal layers in Section 1 (HASAWA, EAWR, BS 7671). Section 2 covered
              the hazards. Sub 1 of this section explained why we do risk assessments. Sub 2
              gave you the five-step method.
            </p>
            <p>
              This subsection is the bridge to actual delivery: how the controls turn into a
              sequence of work (MS), how higher-risk steps get authorised (permits), and how
              all of it sits inside the bigger 'safe system of work' duty.
            </p>
            <p>
              Sub 4 takes it to the next level: how RAMS gets used live on site — toolbox talks
              before work starts each morning, point-of-work risk assessments throughout the
              day, what to do when reality stops matching the plan. That’s where the system
              meets the floor.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Method statement = the sequence of work given the controls. RA + MS = RAMS — the bundle you’ll be handed on site.",
              "Safe system of work (SSoW) is the umbrella concept — RAMS plus competence, training, supervision, comms, permits. HASAWA s.2(2)(a) makes it a legal duty.",
              "EAWR Reg 4(3) makes the safe-system duty specific for electrical work — every activity must not give rise to danger.",
              "Permits-to-work sit ON TOP of RAMS for higher-risk tasks (live work, confined spaces, hot work, near HV). They’re formal authorisation, not paperwork.",
              "Generic MS templates are fine starters; generic MS used unchanged on a real site is prosecution territory. Site-specific is the standard.",
              "On the day: pre-work check, mid-job stop-and-escalate when reality diverges, formal close-out. The MS is alive throughout the job — not a one-off form.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="Method statements and safe systems of work knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section3/3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                The five-step risk assessment process
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section3/3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Working with RAMS on site
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
