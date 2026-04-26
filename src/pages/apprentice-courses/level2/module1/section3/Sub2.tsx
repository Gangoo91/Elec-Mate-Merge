/**
 * Module 1 · Section 3 · Subsection 2 — The five-step risk assessment process
 * City &amp; Guilds 2365-02 → Unit 201
 *   • LO3 → AC 3.1 — state the procedure for producing risk assessments and
 *     method statements in accordance with their level of responsibility.
 *   • LO4 → AC 4.5 — explain practices and procedures for addressing hazards
 *     in the workplace (HSE 5-step model).
 *   • LO3 → AC 3.2 — describe the procedures that should be taken to remove or
 *     minimise risks before deciding PPE is needed (hierarchy of control).
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
  'The five-step risk assessment process | Level 2 Module 1.3.2 | Elec-Mate';
const DESCRIPTION =
  "How HSE actually wants you to walk through a job — five steps, used the same way on every site, from a single socket swap to a full commercial fit-out.";

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'five-step-order-check',
    question: "What’s the FIRST step of the HSE’s five-step risk assessment?",
    options: [
      'Decide what controls to put in place',
      'Identify the hazards',
      'Decide who could be harmed',
      'Write the method statement',
    ],
    correctIndex: 1,
    explanation:
      "Step 1 is always identify the hazards. You can’t decide who’s at risk or what to do about it until you know what could actually hurt someone. HSE INDG163 lays out all five steps in this exact order.",
  },
  {
    id: 'risk-rating-check',
    question: "On a 5×5 matrix, you score a hazard 4 (Likelihood — Likely) × 4 (Severity — Major). What’s that?",
    options: [
      'Low — monitor only',
      'Medium — control if reasonably practicable',
      'High — needs additional controls before work starts',
      'Very high — stop work',
    ],
    correctIndex: 2,
    explanation:
      "4 × 4 = 16. On most company matrices that’s solidly in the High band (typically 12-15) or sometimes Very High (16+). Either way it’s 'do not start work until extra controls are in place'. Different firms use slightly different bands — read your company’s legend before you score anything.",
  },
  {
    id: 'review-trigger-check',
    question: "Which of these does NOT trigger a risk-assessment review under MHSWR Reg 3(3)?",
    options: [
      'A near miss on the job',
      'New people joining the team mid-project',
      'The weather changing significantly',
      'The client paying the invoice',
    ],
    correctIndex: 3,
    explanation:
      "Anything that changes the conditions or makes the assessment 'no longer valid' triggers a review — new hazards, new people, near misses, weather, layout changes. Payment doesn’t change the work — it just means the office is happy.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: "You’re asked to do a quick assessment for replacing a damaged socket-outlet in a kitchen. Which approach matches the five-step method?",
    options: [
      "Skip it — it’s only a socket",
      "Walk through the kitchen, name the hazards (live conductors, water nearby, occupant traffic), decide controls (isolate, prove dead, RCD test), and write a short note",
      "Copy the RAMS from the last socket job and sign it",
      "Just get on with it and write it up later",
    ],
    correctAnswer: 1,
    explanation:
      "Even a one-socket job goes through the same five steps — proportionate to the work. Walk it, name the hazards, decide controls, document briefly, plan to review if anything changes. That’s the method working as intended.",
  },
  {
    id: 2,
    question: "Step 2 of the HSE method is 'decide who might be harmed and how'. On a domestic CU change, who should you be thinking about beyond yourself?",
    options: [
      "Just the homeowner",
      "Yourself, the homeowner, anyone else in the property (kids, pets, vulnerable adults), and the next person to work on the install",
      "Only your apprentice",
      "Nobody — it’s your job to look after yourself",
    ],
    correctAnswer: 1,
    explanation:
      "MHSWR Reg 3(1)(b) explicitly covers 'persons not in his employment'. Family members, vulnerable occupants, future maintenance sparks, even visitors. The control measures (cordon off the area, brief the homeowner, lock the CU when you leave for lunch) all flow from naming who could be harmed.",
  },
  {
    id: 3,
    question: "On a 5×5 risk matrix, what does the SCORE actually represent?",
    options: [
      "Cost of the job",
      "Likelihood × Severity — how likely it is to happen, multiplied by how bad it would be",
      "Hours of work needed",
      "Number of people on site",
    ],
    correctAnswer: 1,
    explanation:
      "Risk score = Likelihood (1-5) × Severity (1-5). Range 1-25. The number gives you an objective starting point for prioritising what to control first — but it’s a tool, not a decision. Your judgement still matters.",
  },
  {
    id: 4,
    question: "What does the hierarchy of control put FIRST as the most effective option?",
    options: [
      "PPE",
      "Substitution",
      "Elimination — remove the hazard entirely",
      "Training",
    ],
    correctAnswer: 2,
    explanation:
      "Elimination (often by isolation in electrical work — turn it off and lock it off) is the most effective control. PPE is the LAST resort, not the first one. Working through the hierarchy in order is how 'reasonably practicable' gets demonstrated.",
  },
  {
    id: 5,
    question: "You’ve scored a hazard High (15). The control you’ve listed is 'workers to be careful'. Why is that not acceptable?",
    options: [
      "It is acceptable — being careful is a control",
      "Care is a behaviour, not a control. Controls have to be physical, procedural or PPE, and the higher the risk the more substantive the control needs to be",
      "It’s only acceptable on jobs under £1,000",
      "It’s only acceptable for apprentices",
    ],
    correctAnswer: 1,
    explanation:
      "'Be careful' is the apprentice classic that an inspector tears apart in seconds. Controls have to be specific and verifiable — isolation procedure, signed permit, physical barrier, written checklist, supervisor sign-off. 'Be careful' is what you do AFTER the controls are in place.",
  },
  {
    id: 6,
    question: "Step 4 of the HSE method is 'record findings and implement them'. What counts as adequate recording?",
    options: [
      "A 30-page document for every job",
      "The significant findings — hazards, who’s affected, the controls and who’s responsible. Proportionate to the work",
      "A photo of the job sent to the office",
      "The customer’s name and the date",
    ],
    correctAnswer: 1,
    explanation:
      "MHSWR Reg 3(6) only mandates the 'significant findings'. The bar is: someone else picking it up should be able to understand what’s being controlled and why. A small job might be a one-page form. A complex one might be 20 pages. Both are correct if proportionate.",
  },
  {
    id: 7,
    question: "Step 5 is 'review your assessment and update if necessary'. What’s a sensible review trigger on a 6-month commercial fit-out?",
    options: [
      "Only at the end of the job",
      "Significant changes (new sub-contractor, layout change, near miss), monthly check-ins as a minimum, plus immediate review after any incident",
      "Once at the start, then never",
      "Only when the client asks",
    ],
    correctAnswer: 1,
    explanation:
      "Reviews are triggered by reality, not the calendar — but most firms also bake in a regular check (weekly/monthly) so reviews don’t get forgotten. Near misses, layout changes, new team members, weather all force reviews. The point of step 5 is to keep the document alive.",
  },
  {
    id: 8,
    question: "You see a generic 'CU change' RAMS your firm uses for every consumer unit. Today’s job is in a tenanted flat with elderly occupants, no labelling on the existing CU, and the meter cupboard is shared with three other flats. What do you do with the generic RAMS?",
    options: [
      "Use it as-is — it’s been signed off by the office",
      "Use it as a starting point but add the site-specific hazards (vulnerable occupants, identification of circuits, shared meter, isolation coordination with neighbouring flats) and the corresponding controls",
      "Throw it away and start from scratch",
      "Tell the office to do a new generic one",
    ],
    correctAnswer: 1,
    explanation:
      "Generic templates are fine as a starting point — that’s how most firms work efficiently. But 'suitable and sufficient' means site-specific. Take the generic, walk the site, add what’s actually different, score those hazards, write the controls. THAT becomes today’s RAMS.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: "Do I HAVE to use the 5×5 matrix? Can I just use Low / Medium / High?",
    answer:
      "Either is fine — there’s no legal requirement for a specific matrix. 5×5 is the most common because it gives more granularity (1-25 instead of 1-9 on a 3×3). Some firms use 4×4. Pick whatever your company uses and stick with it. The matrix is a tool to help your thinking, not a magic formula.",
  },
  {
    question: "Step 3 says 'evaluate the risks and decide on precautions'. How do I actually evaluate?",
    answer:
      "Score Likelihood (how likely the hazard is to cause harm given current conditions, 1-5) × Severity (how bad if it does, 1-5). Look up the score on your company matrix legend — you’ll get a band (Low / Medium / High / Very High) with an action level (e.g. 'review controls', 'additional controls required', 'stop work'). Then work the hierarchy of control to pick the controls.",
  },
  {
    question: "What’s the hierarchy of control?",
    answer:
      "Eliminate → Substitute → Engineering controls → Administrative controls → PPE. Most effective at the top, least effective at the bottom. For electrical work: eliminate by isolating, substitute with battery tools, engineer with RCDs and barriers, administer with permits and procedures, PPE last (insulated tools, gloves, arc-rated clothing). Sub 4 covers this in detail.",
  },
  {
    question: "Steps 4 and 5 sound like the same thing — what’s the difference?",
    answer:
      "Step 4 is the snapshot: record what you’ve decided AND put the controls in place (the 'implement them' bit). Step 5 is the loop: keep checking it’s still valid and update when things change. Step 4 happens before work starts. Step 5 is alive throughout the job.",
  },
  {
    question: "Who has to sign the risk assessment?",
    answer:
      "The competent person who carried it out (or had it carried out) signs to confirm it’s suitable and sufficient. Workers usually sign to confirm they’ve read and understood it. On larger sites it might also need principal contractor sign-off and client acceptance. The signatures matter — they’re the audit trail if anything goes wrong later.",
  },
  {
    question: "What if the same hazard scores differently for different people on the team?",
    answer:
      "It often does — and the assessment has to reflect that. An apprentice working at height has a higher likelihood of harm (less experience) than a 20-year scaffolder. A pregnant worker, someone with a disability, someone with a back injury — all might face a higher severity from the same hazard. MHSWR Reg 3(1)(a) is explicit: assess for the actual people at work, not a theoretical average worker.",
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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 1 · Section 3 · Subsection 2"
            title="The five-step risk assessment process"
            description="How HSE actually wants you to walk through a job. Five steps, used the same way on every site — single socket swap or full commercial fit-out. The step-by-step you’ll do for the rest of your career."
            tone="emerald"
          />

          <TLDR
            points={[
              "Step 1: Identify the hazards. Step 2: Decide who could be harmed. Step 3: Evaluate risks and pick controls. Step 4: Record findings and implement. Step 5: Review and update.",
              "Same five steps for every job — scaled to the work. A socket swap might fit on one page. A commercial CU upgrade might run twenty. Both follow the same logic.",
              "Risk score = Likelihood × Severity. Most firms use a 5×5 matrix giving 1-25. The number isn’t the answer — it’s a starting point for the controls conversation.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Walk through the HSE’s five-step risk assessment process in order, knowing what each step delivers.",
              "Identify hazards on a real electrical job — primary, secondary, environmental.",
              "Use a 5×5 risk matrix to score Likelihood × Severity and read the action level off the legend.",
              "Apply the hierarchy of control to pick the most effective controls reasonably practicable.",
              "Record significant findings in a way that’s proportionate to the job and meets MHSWR Reg 3(6).",
              "Recognise the triggers that mean an assessment has to be reviewed under Reg 3(3).",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The method, end-to-end</ContentEyebrow>

          <ConceptBlock title="Five steps — the same five, every job">
            <p>
              HSE codified this in INDG163 ('A brief guide to risk assessment') decades ago and
              it hasn’t changed because it works. Five steps, taken in order, scaled to the size
              of the job. You’ll do the same five for a domestic socket swap and a six-month
              commercial fit-out — the difference is depth, not method.
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li><strong>Identify the hazards</strong> — what could cause harm.</li>
              <li><strong>Decide who might be harmed and how</strong> — workers, public, others.</li>
              <li><strong>Evaluate the risks and decide on precautions</strong> — score, then pick controls.</li>
              <li><strong>Record your findings and implement them</strong> — write what matters, do what’s written.</li>
              <li><strong>Review your assessment and update if necessary</strong> — keep it alive.</li>
            </ol>
            <p>
              Get the steps in the wrong order and you make rookie mistakes. Picking controls
              before identifying hazards (jumping to 'we’ll just wear gloves' without naming what
              you’re actually being protected from). Recording before evaluating (filling in a
              form with no thinking behind it). The order matters because each step depends on
              the one before.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE INDG163 — 'Risk assessment: A brief guide to controlling risks in the workplace'"
            clause="Identify the hazards. Decide who might be harmed and how. Evaluate the risks and decide on precautions. Record your significant findings. Review your risk assessment and update if necessary."
            meaning={
              <>
                The five-step method straight from HSE. Every safety advisor, NEBOSH course and
                site induction in the UK is built on these five lines. Memorise them — they’re
                the spine of everything in this section.
              </>
            }
            cite="Reference: HSE INDG163 (paraphrased) — original text on HSE website"
          />

          <SectionRule />

          <ContentEyebrow>Step 1 — Identify the hazards</ContentEyebrow>

          <ConceptBlock
            title="Walk the site. Talk to people. Look at the records."
            plainEnglish="A hazard is anything that could cause harm. You find them by walking the job, asking the people who work there, and checking the paperwork (manuals, accident book, previous RAMS, manufacturer’s data)."
            onSite="Don’t do this from the office. Do it on site, with the kit you’ll actually use, with the people who’ll be doing the work. Hazards you can’t see from a desk: water leak under the floor, asbestos in the ceiling void, neighbour’s burglar alarm wires running through the wall you’re drilling."
          >
            <p>For an electrical job, hazard categories you should be sweeping through:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical</strong> — live conductors, indirect contact via faulty equipment,
                arc flash, stored energy in capacitors, induced voltage on parallel circuits.
              </li>
              <li>
                <strong>Mechanical</strong> — drills, saws, sharp cable armour, falling tools,
                manual handling of heavy gear.
              </li>
              <li>
                <strong>Environmental</strong> — water, weather, temperature, lighting, dust,
                confined spaces, working at height.
              </li>
              <li>
                <strong>Chemical / biological</strong> — solder fume, asbestos, mould, COSHH
                substances (cleaning agents, lubricants, jointing compound).
              </li>
              <li>
                <strong>Site-specific</strong> — other trades, traffic, public access, the
                customer’s own activities, fragile structures, fire risks.
              </li>
            </ul>
            <p>
              Trivial risks (a paper cut, mild static) can be ignored. The bar is{' '}
              <em>significant</em> hazards — ones that could realistically cause harm.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Step 2 — Decide who might be harmed and how</ContentEyebrow>

          <ConceptBlock
            title="Not just you. Not just your team. Anyone affected by the work."
            plainEnglish="MHSWR Reg 3(1)(b) is explicit: assess risks to people NOT in your employment too. Customers, the public, other trades, future maintenance sparks, vulnerable people."
            onSite="On a domestic job: the homeowner, kids, pets, the elderly relative who lives upstairs, the cleaner who comes in on Tuesday. On a commercial job: other trades on site, building users, deliveries, security guards, the next person to walk into the room you’ve just isolated."
          >
            <p>
              For each hazard you identified in Step 1, write down WHO could be harmed and HOW.
              That second word — 'how' — matters. 'Customer could be harmed by electric shock'
              is too vague. 'Customer could be harmed by direct contact with exposed live tails
              if they enter the meter cupboard while the cover is off' is something you can
              actually design controls around.
            </p>
            <p>
              Pay extra attention to vulnerable groups. They show up explicitly in HSE guidance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Young workers (under 18) — apprentices included.</li>
              <li>New / inexperienced staff — first six months especially.</li>
              <li>Pregnant workers and nursing mothers.</li>
              <li>Workers with disabilities or pre-existing medical conditions.</li>
              <li>Lone workers — no immediate help if anything goes wrong.</li>
              <li>Members of the public, especially children, elderly, those with reduced mobility.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Step 3 — Evaluate the risks and decide on precautions</ContentEyebrow>

          <ConceptBlock
            title="Score it, then control it"
            plainEnglish="Likelihood × Severity gives you a number. The number tells you how aggressive the controls need to be. Higher the score, more substantial the controls."
          >
            <p>
              Most UK firms use a 5×5 matrix. Your company will have its own version with a
              colour-coded legend. Standard layout:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Likelihood (1-5):</strong> 1 = Rare (almost never), 2 = Unlikely (could
                happen but probably won’t), 3 = Possible (might happen sometimes), 4 = Likely
                (will probably happen), 5 = Almost certain (expected to happen).
              </li>
              <li>
                <strong>Severity (1-5):</strong> 1 = Negligible (first aid, no time off), 2 =
                Minor (medical treatment, less than 7 days off), 3 = Moderate (lost-time injury,
                hospital admission), 4 = Major (serious injury, long recovery, permanent
                impairment), 5 = Catastrophic (fatality or life-changing).
              </li>
              <li>
                <strong>Score = L × S</strong>, range 1-25. Bands typically:
                <span className="block ml-1 mt-1">1-3 Low (acceptable, monitor)</span>
                <span className="block ml-1">4-9 Medium (control if reasonably practicable)</span>
                <span className="block ml-1">10-15 High (additional controls required before work starts)</span>
                <span className="block ml-1">16-25 Very High (stop / do not start until risk reduced)</span>
              </li>
            </ul>
            <p>
              The score isn’t the decision. It’s the prompt for a decision. A High score means
              'don’t crack on — design the controls properly first'. A Very High score means
              'this can’t go ahead in its current form'. The matrix gives you a defensible audit
              trail for ALARP — which is what gets examined if anything later goes to court.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The hierarchy of control — pick the most effective option that’s reasonably practicable"
            plainEnglish="Don’t jump to PPE. Work down the list: eliminate → substitute → engineer → administer → PPE. Higher up = more effective. Combine multiple layers for serious risks (defence in depth)."
            onSite="On a CU change: ELIMINATE the live risk by isolating at the cut-out / supplying utility. SUBSTITUTE mains tools for cordless. ENGINEER with locks, warning notices, RCDs. ADMINISTER with the permit, the prove-dead procedure, the toolbox talk. PPE: insulated tools, voltage-rated gloves if needed, eye protection. Five layers from a single hazard."
          >
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Elimination</strong> — remove the hazard. In electrical work, this is usually
                'isolate and prove dead'. Most effective control there is.
              </li>
              <li>
                <strong>Substitution</strong> — replace with something less dangerous. Battery tools
                instead of mains, SELV instead of LV, low-energy LEDs replacing fluorescents
                with their stored energy in capacitors and chokes.
              </li>
              <li>
                <strong>Engineering controls</strong> — physical barriers, RCDs, interlocks, fixed
                guards, fire-rated enclosures. Built into the kit, not relying on people.
              </li>
              <li>
                <strong>Administrative controls</strong> — permits, procedures, training, supervision,
                signage, toolbox talks. Rely on people doing the right thing.
              </li>
              <li>
                <strong>PPE</strong> — last resort. Insulated tools, voltage-rated gloves, helmet,
                arc-rated clothing where required. Doesn’t remove the hazard — only the
                consequences if everything else fails.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="HSE HSG65 — 'Managing for health and safety' (Plan-Do-Check-Act)"
            clause="Where possible, eliminate the hazard altogether. If not, control the risk by reducing the likelihood and/or severity. Apply the hierarchy of control: elimination, substitution, engineering controls, administrative controls, personal protective equipment — in that order."
            meaning={
              <>
                HSG65 is the umbrella document HSE expects employers to manage their whole
                safety system to. The hierarchy is the operating principle. Skipping straight to
                PPE without working through the higher tiers is one of the easiest ways to fail
                an HSE audit — or a coroner’s inquest.
              </>
            }
            cite="Reference: HSE HSG65 (paraphrased) — full document on HSE website"
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Step 4 — Record findings and implement them</ContentEyebrow>

          <ConceptBlock
            title="Write the significant findings down. Then DO what’s written."
            plainEnglish="Recording is half the step. Implementing is the other half. A perfect document with no controls actually in place is worthless. Implemented controls without a record are legally fragile."
            onSite="Most firms use a standard template — hazard, who’s affected, current controls, residual risk score, additional controls needed, who’s responsible, when by. Sign it, date it, file it where the team can read it. THEN actually put the controls in place before work starts."
          >
            <p>What 'significant findings' means in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>The hazards you identified (the significant ones).</li>
              <li>Who could be harmed and how.</li>
              <li>Existing controls and how well they’re working.</li>
              <li>Additional controls needed, with named responsibility and timescales.</li>
              <li>Residual risk score after controls are in place.</li>
              <li>Date assessed, by whom, when to review.</li>
            </ul>
            <p>
              Implementation is the part that gets forgotten. The document says 'lock-off
              required' — is the lock-off kit on site? The document says 'first-aider must be
              present' — has someone been nominated and briefed? The document says 'isolate at
              main switch' — is the main switch labelled and accessible? Step 4 isn’t finished
              until each control listed has been physically put in place.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Step 5 — Review and update</ContentEyebrow>

          <ConceptBlock
            title="The assessment is alive — keep it that way"
            plainEnglish="MHSWR Reg 3(3) requires review when the assessment is no longer valid OR there’s been a significant change. That’s any time the conditions you assessed against shift."
          >
            <p>Triggers for an immediate review:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>An accident or near miss on this job (or a similar one elsewhere).</li>
              <li>Layout changes — wall down, scaffold up, new opening, route change.</li>
              <li>New equipment introduced, or existing equipment modified.</li>
              <li>New people on the team — different competence, different vulnerabilities.</li>
              <li>Weather change for outdoor work — wind, rain, ice, heat.</li>
              <li>Time pressure that wasn’t there at the assessment — extended hours, rushed schedule.</li>
              <li>Any change to the regulatory landscape (new edition of BS 7671, new HSE guidance).</li>
            </ul>
            <p>
              On top of that, baseline reviews on a calendar (weekly toolbox-talk check, monthly
              full review on long jobs) catch slow drift before it becomes a problem.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Scoring the residual risk before the controls are actually in place"
            whatHappens={
              <>
                Apprentice fills in the matrix. Initial risk: 5 × 5 = 25 (Very High, stop
                work). Adds the planned controls — 'isolate, prove dead, work cover off' —
                rescores: 1 × 5 = 5 (Medium). Document goes off to the office. Three weeks
                later the controls aren’t actually in place — no lock-off kit on site, no
                voltage indicator that’s been function-tested, no permit-to-work issued.
                Someone gets shocked. The document says risk is Medium. The reality is
                Very High. Audit trail: catastrophic.
              </>
            }
            doInstead={
              <>
                Score the residual risk based on what’s ACTUALLY in place, not what’s planned.
                If the lock-off kit isn’t on site yet, the residual risk hasn’t come down. The
                document should match reality minute-by-minute. If a control listed isn’t
                physically there, the score doesn’t drop until it is.
              </>
            }
          />

          <Scenario
            title="Mid-job change: the architect just added three more sockets to the kitchen"
            situation={
              <>
                You’re three days into a small commercial fit-out. Original RAMS was based on
                the drawings at quote stage — 8 sockets on a 32 A radial. Architect comes back
                today and adds three more sockets in a service area you hadn’t accounted for.
                The service area is wet (sluice room next to the staff toilet), in zone 1 of
                what counts as a special location. Your gaffer says 'just add them, same as the
                others'.
              </>
            }
            whatToDo={
              <>
                Stop and trigger a Step 5 review. The hazards have changed (wet location, IP
                rating now matters, RCD selection might need to change, supplementary bonding
                might need consideration). The 'who might be harmed' has changed (cleaning
                staff handling water and electricity in the same room). The controls have to
                change. Walk the new area, score the new hazards, write the additions to the
                RAMS, get them signed off, brief the team on the new controls — THEN add the
                sockets. Twenty minutes of process avoids a week of rework or worse.
              </>
            }
            whyItMatters={
              <>
                'Same as the others' is how scope creep becomes incident. The original
                assessment isn’t valid for the new conditions. Doing the new work to the old
                RAMS is a textbook MHSWR Reg 3(3) breach AND a BS 7671 special locations
                problem. Both end up at the same place if anything goes wrong: prosecution.
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

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Five steps in order: Identify hazards → Decide who’s harmed → Evaluate and pick controls → Record and implement → Review.",
              "Same five steps for every job — proportionate to the work. Socket swap to commercial fit-out, same logic.",
              "Risk score = Likelihood × Severity. 5×5 matrix is standard. The score guides the controls — it doesn’t make the decision.",
              "Hierarchy of control: Eliminate → Substitute → Engineering → Administrative → PPE. Work top-down. PPE is the LAST resort.",
              "Step 4 isn’t done until the controls are actually in place. Score residual risk against reality, not against intentions.",
              "Step 5 is alive: review on incidents, layout changes, new people, weather, time pressure — anything that makes the original assessment 'no longer valid' under MHSWR Reg 3(3).",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="Five-step risk assessment knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section3/3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Purpose of risk assessments
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section3/3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Method statements and safe systems of work
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
