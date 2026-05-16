/**
 * Module 7 · Section 1 · Subsection 2 — JIB grading deep dive
 * Maps to C&G 2365-03 / Unit 308 / LO1 / AC 1.6
 *   AC 1.6 — "Define the different roles in building services engineering"
 *
 * The Joint Industry Board (JIB) grading ladder — Apprentice (Stage 1-4),
 * Adult Trainee, Electrician, Approved Electrician, Technician — what each
 * formal grade means, what you need to evidence to climb it, the JIB pay
 * framework that sits behind it, and how the grading shows up on your ECS
 * card and your payslip. Note: 'Improver' is colloquial industry shorthand
 * for the post-college / pre-AM2 stage and is NOT a formal JIB grade.
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

const TITLE = 'JIB grading deep dive | Level 3 Module 7.1.2 | Elec-Mate';
const DESCRIPTION =
  'The formal JIB grading ladder — Apprentice (Stage 1-4), Adult Trainee, Electrician, Approved Electrician, Technician — what each grade means, the evidence you need to progress, and how the JIB pay framework links your grade to your hourly rate. The colloquial term "Improver" is not a formal JIB grade.';

const checks = [
  {
    id: 'mod7-s1-sub2-stages',
    question:
      "What's the difference between an Apprentice Stage 1 and an Apprentice Stage 4 on the JIB ladder?",
    options: [
      "Nothing — they're the same.",
      "Stage 1 is your first year of apprenticeship (typically pre-college foundation), Stage 4 is your final year (post-2365-03, gateway to AM2). Each Stage carries a different JIB minimum hourly rate, rising as you complete more of the syllabus and accumulate evidence in your portfolio. Stages are progressed by your employer on JIB rules — you don't apply, your employer signs you off as you hit the milestones.",
      "Stage 1 is for under-18s only.",
      "Stages are only used in Scotland.",
    ],
    correctIndex: 1,
    explanation:
      "JIB Apprentice Stages 1-4 (sometimes called 'Year 1 / Year 2 / Year 3 / Year 4') are the rungs inside the apprentice grade. The exact pay rate at each Stage is set by the annual JIB Working Rule Agreement (negotiated between ECA and Unite). Your employer moves you up a Stage as you complete the syllabus milestones — typically tied to passing each year of the C&G 2365 (or equivalent NVQ units). The 2024 JIB rates put Stage 1 at around £8-9/hr and Stage 4 at around £14-15/hr (London weighting adds more). Knowing the Stages matters because the difference between Stage 3 and Stage 4 pay is significant.",
  },
  {
    id: 'mod7-s1-sub2-am2-line',
    question:
      "Why is the AM2 described as 'the line between final-year Apprentice and Electrician'?",
    options: [
      "It isn't — AM2 has nothing to do with grading.",
      "Because the JIB rules require you to hold the practical assessment (AM2 or equivalent) before they'll grade you as Electrician. After college and 2365-03 you remain on the final-year Apprentice (or Adult Trainee) rate — qualifications complete, AM2 not yet passed (colloquially called the 'Improver' stage, though that is NOT a formal JIB grade). After AM2 your employer applies to JIB to upgrade you to Electrician grade, which carries the full Electrician pay rate (around £19-20/hr in 2024 outside London). The jump to Electrician is the biggest single pay rise in the apprenticeship.",
      "AM2 is only for Scottish apprentices.",
      "AM2 is purely academic.",
    ],
    correctIndex: 1,
    explanation:
      "The JIB Electrician grade requires both the Level 3 qualifications AND the AM2 (or equivalent JIB-recognised practical assessment). Without AM2 you stay on the final-year Apprentice or Adult Trainee rate even if you've finished college. The pay differential between that pre-AM2 stage (sometimes informally called the 'Improver' period) and Electrician is typically £4-5/hr — over a year that's £8,000+ in extra gross pay. This is why employers, college tutors and mentors take AM2 readiness seriously — it's not just a certificate, it's a step-change in your earnings.",
  },
  {
    id: 'mod7-s1-sub2-approved',
    question:
      "What's the practical difference between an Electrician and an Approved Electrician on JIB rules?",
    options: [
      "There's no difference.",
      "An Approved Electrician has additional time-served experience (typically 2+ years post-AM2) plus an Inspection and Testing qualification (2391-52 or equivalent), and is recognised by JIB as competent to supervise others, sign off completed work, and lead a gang. The Approved grade carries a higher hourly rate (around £21-22/hr in 2024) and is the JIB grade typically required for site Foreman, Qualified Supervisor and Senior Electrician roles.",
      "Approved Electricians only work on solar PV.",
      "Only the company can be 'approved', not the person.",
    ],
    correctIndex: 1,
    explanation:
      "Approved Electrician is the JIB's recognition that you've moved beyond execution into supervision and certification. The 2391-52 (Inspection and Testing) is the typical academic anchor — it gives you the formal authority to inspect, test and certify, which is what supervision and sign-off requires. Time-served experience is the practical anchor. Together they earn the Approved grade. Most contractors require Approved status for QS (Qualified Supervisor) roles and competent-person scheme registration.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Who negotiates the annual JIB pay rates?",
    options: [
      "The HSE.",
      "The Electrical Contractors' Association (ECA, employer side) and Unite the Union (worker side) negotiate annually under the JIB Working Rule Agreement. Rates are typically reviewed in autumn for the following January. The negotiated rates set minimum hourly pay for each JIB grade across England, Wales and Northern Ireland; SJIB does the equivalent in Scotland. JIB-graded firms are bound to pay at least the negotiated rates.",
      "The Government.",
      "Only NICEIC.",
    ],
    correctAnswer: 1,
    explanation:
      "JIB pay framework is collective bargaining between ECA (employers) and Unite (workers). The Working Rule Agreement covers pay, holiday entitlement, sick pay, pension contributions, travel allowances and overtime premiums. JIB-graded employment contracts incorporate the WRA by reference. Knowing your firm's JIB status tells you whether you're on collectively-bargained rates or whether your pay is set independently by the employer.",
  },
  {
    id: 2,
    question: "What's the SJIB and how does it differ from the JIB?",
    options: [
      "SJIB is a typo for JIB.",
      "The Scottish Joint Industry Board (SJIB) is the equivalent of the JIB for the electrical contracting industry in Scotland. It sets working rules, pay rates and grades for Scottish electricians, working alongside SELECT (the Scottish trade association). SJIB grading uses similar terminology (Apprentice, Approved Electrician, Technician) but the rates and the ECS card variants are Scottish-specific.",
      "SJIB only applies to oil-rig work.",
      "SJIB sets pay for English firms.",
    ],
    correctAnswer: 1,
    explanation:
      "SJIB and JIB are functionally similar collective-bargaining bodies for two different territories. Apprentices working in Scotland will be on SJIB grading and SJIB pay rates; those in England, Wales or NI will be on JIB. The grade names are similar but the administrative bodies, the ECS card colour variants and the pay rates are separately negotiated.",
  },
  {
    id: 3,
    question: "Are JIB pay rates the same across the UK?",
    options: [
      "Yes — single national rate.",
      "No — there's a London weighting (typically £2-3/hr extra for work inside the M25), a separate set of SJIB rates for Scotland, and travel allowances vary. The headline JIB hourly rate is the national minimum for the grade; London-weighted rates apply on top for inner-London work. Always check your contract for which rate applies.",
      "Yes, but only outside London.",
      "Only London has JIB rates.",
    ],
    correctAnswer: 1,
    explanation:
      "London rates reflect the higher cost of living. The JIB Working Rule Agreement publishes both 'national' and 'London' rates each year. Apprentices working on London projects typically receive the London-weighted rate while on those projects, even if their home depot is outside London. Travel and lodging allowances also kick in for distant work — read your firm's JIB-aligned travel policy.",
  },
  {
    id: 4,
    question: "What evidence does an apprentice need to move from Stage 3 to Stage 4?",
    options: [
      "Nothing — it happens automatically with age.",
      "Completion of the relevant year's college units (typically C&G 2365-03 Year 2 / NVQ Level 3 progress), portfolio entries signed by the workplace mentor, and your employer's formal approval through the JIB grading update. Stage progression is evidence-based, not time-based — you can't just 'wait' for the next Stage; you have to demonstrate you've earned it.",
      "Two years on the job, no qualifications needed.",
      "Only an HSE inspector can promote you.",
    ],
    correctAnswer: 1,
    explanation:
      "JIB Stages are tied to syllabus completion, not chronological time. Apprentices who fall behind on coursework can find themselves stuck at a lower Stage even if they've been on the apprenticeship for the standard number of years. Conversely, fast-track apprentices can progress Stages quicker if they complete the syllabus ahead of schedule. The College Tutor and Workplace Mentor calibrate readiness; the Employer formally moves you up.",
  },
  {
    id: 5,
    question: "What's the JIB Technician grade and what does it require?",
    options: [
      "Same as Apprentice.",
      "Technician is the highest of the standard JIB grades — typically requires Approved Electrician status PLUS additional formal qualifications (HNC, HND, foundation degree or BEng) PLUS specific time-served experience in design, commissioning or senior installation roles. Technician grade carries the highest standard JIB pay rate and is the gateway to design and senior project engineer roles.",
      "Only for university graduates.",
      "Only used in maintenance work.",
    ],
    correctAnswer: 1,
    explanation:
      "Technician is the JIB recognition that you've moved into the engineering tier — design, commissioning, complex project work. It usually requires both an academic qualification beyond Level 3 (HNC minimum) and demonstrable experience in technician-level work. Many Technicians eventually progress to professional engineering routes (EngTech, IEng, CEng — covered in Sub 4.2).",
  },
  {
    id: 6,
    question: "How is JIB grading shown on your ECS card?",
    options: [
      "It isn't.",
      "Your JIB grade is printed on the front of the ECS card alongside your photo, qualifications and any specialist endorsements (PV, EV, etc). Card colour can also indicate grade tier — the 'Gold' card is the most common Electrician/Approved card. Site security and main contractor compliance teams check the ECS card on entry to verify your grade matches the role you're being paid for.",
      "Only in Scotland.",
      "Only on union members' cards.",
    ],
    correctAnswer: 1,
    explanation:
      "ECS card is the portable evidence of your JIB grade. The card includes your photo, name, JIB grade, qualifications listed and the date of your last CSCS-equivalent H&S test. Sites scan the card on entry; payroll cross-checks the card grade against the agreed pay rate. Carry your card every shift — most sites refuse entry without it.",
  },
  {
    id: 7,
    question: "What happens to your JIB grade if you change employer?",
    options: [
      "You start again at Apprentice.",
      "Your JIB grade and ECS card go with you — they're tied to you, not to the employer. The new employer will accept your existing grade and pay you the corresponding JIB rate (assuming they're a JIB-graded firm). If you move to a non-JIB firm your contract with them might pay above or below JIB rates by mutual agreement, but your grade is still recorded with JIB.",
      "Your grade gets cancelled.",
      "You have to re-take AM2.",
    ],
    correctAnswer: 1,
    explanation:
      "JIB grade is portable. The ECS card is the evidence — and any new JIB-graded employer will pay you the grade rate without re-assessment. Non-JIB firms are not bound to JIB rates but typically pay close to them (because the JIB rate is the market reference point for electrician pay). Keep your ECS card current; if your card lapses you may need to re-evidence to JIB to keep your recorded grade.",
  },
  {
    id: 8,
    question: "What's a 'JIB-graded' employer and why does it matter to an apprentice?",
    options: [
      "Means the firm sells JIB merchandise.",
      "A JIB-graded employer is a firm that has signed up to the JIB Working Rule Agreement and undertakes to pay at least JIB minimum rates and follow JIB conditions (holiday, sick pay, pension, apprentice training rules). For an apprentice this matters because JIB-graded firms are bound to follow the JIB Apprentice Code of Practice — named mentor, structured training, Stage progression on evidence, paid college time.",
      "Means the firm is Scottish only.",
      "Means the firm is non-union.",
    ],
    correctAnswer: 1,
    explanation:
      "JIB-graded status signals that the employer plays by industry-collective rules. For an apprentice it's a meaningful protection — the JIB Apprentice Code of Practice gives you structured training expectations and your pay automatically tracks the negotiated Stages. Non-JIB firms vary widely — some pay above JIB rates and follow good practice; others pay below and skip the structured training. Always ask in interview whether the firm is JIB-graded.",
  },
];

const faqs = [
  {
    question: "How often do JIB rates change?",
    answer:
      "Annually. The JIB Working Rule Agreement is renegotiated each year between ECA (employer side) and Unite (worker side). New rates typically take effect from January (sometimes April). The JIB publishes the new rate card on jib.org.uk every autumn. Apprentices should check the new rate card each January — your Stage rate goes up automatically.",
  },
  {
    question: "What if my employer is paying me less than the JIB rate for my grade?",
    answer:
      "If your firm is JIB-graded, contact your College Tutor or your union (Unite) rep first — JIB-graded firms are contractually bound to pay JIB minimums and a quiet word usually fixes it. If your firm is non-JIB they're not legally bound to JIB rates (only to the National Minimum/Living Wage), but they may match JIB by policy. The JIB doesn't enforce pay against non-JIB firms — that's a contract matter between you and the employer.",
  },
  {
    question: "Can I jump from Apprentice straight to Approved without first becoming an Electrician?",
    answer:
      "No. The grading is sequential — you must hold the previous grade and meet the additional criteria before progressing. Apprentice → (qualifications + AM2) → Electrician → (2391-52 + 2 years' experience) → Approved → (HNC/experience) → Technician. Each step takes time; the ladder is designed to protect competence as much as career progression.",
  },
  {
    question: "Does JIB grading apply if I'm self-employed?",
    answer:
      "Self-employed electricians can hold an ECS card with their JIB grade recorded — your grade is tied to you, not the employer. But the JIB pay rates only apply to employed work under JIB-graded contracts. Self-employed day rates are negotiated direct with the client; the JIB rate is a useful market reference but not a binding floor for self-employed work.",
  },
  {
    question: "What's the difference between the JIB Working Rule Agreement and a normal employment contract?",
    answer:
      "The Working Rule Agreement (WRA) is a collectively-bargained framework agreed between ECA and Unite that covers pay, hours, holidays, sick pay, pension, overtime premiums, travel allowances and apprentice training rules. JIB-graded employers incorporate the WRA into individual employment contracts by reference — so the contract says 'employee will be paid in accordance with current JIB rates' rather than a fixed hourly figure. As JIB rates change annually, your pay tracks them.",
  },
  {
    question: "Where do I find the current JIB rates?",
    answer:
      "Published annually at jib.org.uk under 'Working Rule Agreement' — the rate card lists every grade and Stage, both national and London-weighted. SJIB rates are at sjib.org.uk for Scottish work. Your college tutor and your firm's HR or training lead should also have the current rate card; ask if they don't volunteer it.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1 · Subsection 2"
            title="JIB grading deep dive"
            description="The formal JIB grading ladder — Apprentice Stages 1-4, Adult Trainee, Electrician, Approved Electrician, Technician — what each grade means, what evidence you need, and how the JIB pay framework links your grade to your hourly rate."
            tone="emerald"
          />

          <TLDR
            points={[
              "Formal JIB grades climb from Apprentice (Stages 1-4 during the apprenticeship) → Adult Trainee (non-apprentice adult learner route) → Electrician (post-AM2) → Approved Electrician (post-2391-52 + experience) → Technician (post-HNC + experience). Each grade has a JIB-published minimum hourly rate. The colloquial term 'Improver' (post-college, pre-AM2) is NOT a formal JIB grade.",
              "Pay rates are renegotiated annually by ECA (employer side) and Unite (worker side) under the JIB Working Rule Agreement. London weighting adds £2-3/hr inside the M25; SJIB sets separate rates for Scotland.",
              "Your JIB grade is portable — recorded on your ECS card, it travels with you to any new employer. JIB-graded firms are bound to pay at least the JIB minimum for your grade.",
              "AM2 is the practical line between final-year Apprentice (or Adult Trainee) and Electrician — and the biggest single pay rise of the apprenticeship (typically £4-5/hr step up).",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO1 / AC 1.6 — define the different roles in building services engineering, including the JIB grade structure that names them.",
              "State the full JIB grading ladder from Apprentice Stage 1 through Technician, and the entry criteria for each grade.",
              "Identify the relationship between AM2, the 2391-52 inspection and testing qualification, and the JIB grade progression.",
              "Explain how the JIB Working Rule Agreement is negotiated and how it sets the annual pay framework for the electrical contracting industry.",
              "Identify how London weighting, SJIB rates and travel allowances modify the headline JIB hourly rate.",
              "Identify how JIB grading is recorded on an ECS card and used by site security and payroll.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The JIB grading ladder</ContentEyebrow>

          <ConceptBlock
            title="Five formal grades, evidence-based progression"
            plainEnglish="JIB grading is the industry-collective recognition of your competence. Each grade is the next rung on a ladder that starts with Apprentice (sub-divided into Stages 1-4) and ends with Technician. You don't apply for grades — your employer notifies JIB when you've met the criteria, and the new grade is added to your ECS card. The grade determines your minimum hourly rate under JIB-graded employment. (Note: 'Improver' is a colloquial industry term for the post-college, pre-AM2 stage and is NOT a formal JIB grade.)"
            onSite="Knowing where you sit on the ladder matters because every step up is a pay rise — typically £1-5/hr depending on the step. Knowing what evidence you need for the next grade lets you plan deliberately. Most apprentices focus on AM2 (final-year Apprentice → Electrician) but forget that the next big jump (Electrician → Approved) requires the 2391-52 inspection and testing qualification — start planning that the day after AM2."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Apprentice (Stages 1-4)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Four sub-stages aligned to the years of the apprenticeship. Each Stage requires
                  the corresponding college units to be complete plus portfolio evidence signed
                  by the workplace mentor. Pay rises with each Stage. 2024 indicative national
                  rates: Stage 1 ~&pound;8.50/hr, Stage 4 ~&pound;14.50/hr.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Adult Trainee
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  The formal JIB grade for a non-apprenticeship adult learner working towards
                  the Level 3 qualifications and AM2. (The colloquial term &quot;Improver&quot;
                  is sometimes used for the post-college, pre-AM2 stage but is NOT a formal JIB
                  grade.)
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Electrician
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Post-AM2. Full Electrician JIB grade, qualified to work independently on
                  installation. Most common card on UK sites. 2024 indicative national rate
                  ~&pound;19-20/hr; London-weighted ~&pound;22/hr.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Approved Electrician
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Electrician + 2391-52 (Inspection &amp; Testing) + 2 years post-AM2 experience.
                  Authority to supervise, inspect, certify and lead gangs. 2024 indicative rate
                  ~&pound;21-22/hr nationally. The JIB grade required for QS roles.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4 sm:col-span-2">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Technician
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Approved + HNC/HND/foundation degree/BEng + senior experience in design,
                  commissioning or technical leadership. The engineering-tier JIB grade. Often
                  the route into EngTech / IEng / CEng professional registration.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Apprentice Stages 1-4 — what triggers each step"
            plainEnglish="The four Apprentice Stages roughly map to the four years of a typical electrical apprenticeship, but they're driven by syllabus completion and portfolio evidence — not by chronological time. Each Stage carries a different JIB minimum rate, and your employer formally notifies JIB to move you to the next Stage when the evidence is in place."
            onSite="If you fall behind on coursework you'll be stuck at a lower Stage rate even though months are ticking by. If you fast-track the syllabus you can move up Stages quicker. Either way, the Workplace Mentor and College Tutor calibrate readiness at the three-way review and the Employer signs the formal Stage update."
          >
            <p>
              Typical Stage progression triggers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stage 1</strong> &mdash; entry to the apprenticeship. C&amp;G 2365-02
                Level 2 in progress. ECS Apprentice card issued.
              </li>
              <li>
                <strong>Stage 2</strong> &mdash; C&amp;G 2365-02 Level 2 complete; 2365-03
                Level 3 commencing. Portfolio Year 1 evidence in place.
              </li>
              <li>
                <strong>Stage 3</strong> &mdash; mid-2365-03; substantial Level 3 units
                complete; portfolio Year 2 evidence in place.
              </li>
              <li>
                <strong>Stage 4</strong> &mdash; final year of apprenticeship; 2365-03 nearing
                completion; AM2 prep in progress.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The post-apprenticeship grades</ContentEyebrow>

          <ConceptBlock
            title="Final-year Apprentice → Electrician → Approved → Technician — the qualified ladder"
            plainEnglish="Once the apprenticeship completes the post-apprenticeship grades open up. The final-year Apprentice (or Adult Trainee) is the bridge stage — qualifications complete but AM2 not yet passed (colloquially called the 'Improver' period). Electrician is the standard qualified grade. Approved adds supervision and certification authority. Technician adds engineering-tier responsibility."
            onSite="Each step requires specific evidence — not just time-served. Mapping out the qualifications and experience needed for each grade lets you plan your CPD spending. The 2391-52 (Inspection and Testing) is the most common bottleneck for the Electrician → Approved jump; HNC is the most common bottleneck for Approved → Technician."
          >
            <p>
              Evidence required for each post-apprenticeship grade:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Final-year Apprentice / Adult Trainee (pre-AM2)</strong> &mdash; C&amp;G
                2365-03 Level 3 (or NVQ Level 3 Electrotechnical Services) complete; portfolio
                complete; AM2 not yet passed. Sometimes informally called the &quot;Improver&quot;
                stage &mdash; but that is not a formal JIB grade.
              </li>
              <li>
                <strong>Electrician</strong> &mdash; Level 3 qualifications PLUS AM2 (or AM2E /
                AM2S) passed. Employer applies to JIB to upgrade.
              </li>
              <li>
                <strong>Approved Electrician</strong> &mdash; Electrician PLUS 2391-52 (or
                equivalent inspection and testing qualification) PLUS typically 2 years
                post-AM2 site experience.
              </li>
              <li>
                <strong>Technician</strong> &mdash; Approved PLUS academic qualification at
                HNC level or above (HNC/HND/foundation degree/BEng) PLUS senior experience
                in design, commissioning or technical leadership.
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

          <ContentEyebrow>The pay framework behind the grades</ContentEyebrow>

          <ConceptBlock
            title="JIB Working Rule Agreement — collective bargaining sets the rates"
            plainEnglish="JIB pay rates are not set by Government and not set unilaterally by employers. They're collectively bargained each year between the Electrical Contractors' Association (ECA, employer side) and Unite the Union (worker side) under the JIB Working Rule Agreement (WRA). The negotiated rates set the minimum hourly pay for each grade, plus holiday entitlement, sick pay, pension contributions, overtime premiums and travel allowances."
            onSite="Your JIB-graded employment contract typically incorporates the WRA by reference — so the contract says 'pay in accordance with current JIB rates' rather than a fixed hourly figure. As the WRA is renegotiated annually, your pay automatically tracks the new rates each January. If your contract names a fixed rate that's lower than the JIB rate, that's a breach for a JIB-graded employer."
          >
            <p>
              What the JIB Working Rule Agreement covers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pay rates</strong> &mdash; minimum hourly rate for each grade, both
                national and London-weighted.
              </li>
              <li>
                <strong>Working hours</strong> &mdash; standard week (typically 37.5 hours),
                overtime premiums (time-and-a-half, double-time).
              </li>
              <li>
                <strong>Holiday entitlement</strong> &mdash; statutory minimum plus industry
                additions (typically 22-25 days plus bank holidays).
              </li>
              <li>
                <strong>Sick pay</strong> &mdash; the Industry Sick Pay scheme (top-up above
                Statutory Sick Pay).
              </li>
              <li>
                <strong>Pension</strong> &mdash; employer contributions to the JIB pension
                scheme (Electrical Contractors&apos; Industry Joint Industry Board pension fund).
              </li>
              <li>
                <strong>Travel and lodging allowances</strong> &mdash; daily travel time and
                expenses for distant work.
              </li>
              <li>
                <strong>Apprentice rules</strong> &mdash; Stage progression, mentor
                requirements, paid college time.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="London weighting and SJIB — geography matters"
            plainEnglish="The headline JIB rate is the national minimum. Two geographic adjustments modify it: London weighting (for work inside the M25, typically £2-3/hr extra to reflect cost of living) and SJIB rates (separate Scottish rates negotiated by the Scottish JIB). London weighting kicks in based on the work location, not your home location — so if you live in Kent but work in Canary Wharf, you get the London rate while on that project."
            onSite="Travel allowances stack on top of pay. JIB-published travel rules pay you for time spent travelling to distant sites and lodging allowances for overnight stays. Always check the WRA travel rules when accepting work outside your normal area — the allowances can significantly affect take-home."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  London weighting
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Adds typically &pound;2-3/hr to the national rate for work inside the M25.
                  Applies on a per-project basis, not per-employee. JIB publishes both
                  national and London-weighted rate cards each year.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  SJIB rates (Scotland)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Separately negotiated by the Scottish JIB; broadly similar to JIB rates but
                  not identical. Scottish apprentices are on SJIB Stages and SJIB grade rates.
                  Published at sjib.org.uk.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <RegsCallout
            source="JIB Working Rule Agreement (current edition) — pay grades and progression (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The JIB Working Rule Agreement (WRA) sets the pay framework for electrical
                  contracting in England, Wales and Northern Ireland. Headline provisions
                  include:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Minimum hourly rates for each formal JIB grade (Apprentice Stages 1-4,
                    Adult Trainee, Electrician, Approved Electrician, Technician).
                  </li>
                  <li>
                    Separate national and London-weighted rate cards, renegotiated annually
                    between ECA (employer side) and Unite (worker side).
                  </li>
                  <li>
                    Standard working week (typically 37.5 hours), with defined overtime
                    premiums and travel allowances.
                  </li>
                  <li>
                    Industry Sick Pay scheme (top-up above Statutory Sick Pay) and JIB pension
                    contributions.
                  </li>
                  <li>
                    Holiday entitlement above the statutory minimum.
                  </li>
                  <li>
                    Apprentice training rules including Stage progression criteria, mentor
                    requirements and paid college time.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                The WRA is the practical floor of pay and conditions for JIB-graded
                employment. JIB-graded employers contractually undertake to follow the WRA;
                non-JIB employers are not bound but typically use JIB rates as the market
                reference. As an apprentice on a JIB-graded contract you can rely on the WRA
                as the minimum &mdash; if your contract pays less, that&apos;s a breach.
              </>
            }
            cite="Source: JIB Working Rule Agreement — paraphrased from publicly-available JIB guidance at jib.org.uk. Specific rates and provisions change annually; check the current edition for live figures."
          />

          <RegsCallout
            source="National Minimum Wage Act 1998 / National Living Wage — apprentice pay floor (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Apprenticeship Rate of the National Minimum Wage applies in the first
                  year of apprenticeship and to apprentices under 19. After year 1 (and once
                  the apprentice is 19 or older) the standard age-based NMW or NLW applies.
                  Rates are set annually by the Low Pay Commission and published on gov.uk.
                </p>
                <p>
                  Where the JIB Stage rate is higher than the applicable NMW/NLW, the JIB
                  Stage rate applies under JIB-graded contracts. Where it&apos;s lower, the
                  NMW/NLW is the legal floor.
                </p>
              </>
            }
            meaning={
              <>
                Even the lowest JIB Apprentice Stage rate is materially above the
                Apprenticeship Rate of the National Minimum Wage. So in practice, JIB-graded
                apprentices are on JIB Stage rates, not NMW. But the NMW/NLW remains the
                legal floor &mdash; if for any reason a JIB rate fell below NMW, NMW would
                still apply. Non-JIB employers can pay just NMW/NLW &mdash; another reason
                why JIB-graded firms are usually a better proposition for apprentices.
              </>
            }
            cite="Source: National Minimum Wage Act 1998; current rates published annually by the Low Pay Commission at gov.uk."
          />

          <RegsCallout
            source="Apprenticeships, Skills, Children and Learning Act 2009 — apprenticeship contracts (paraphrased)"
            clause={
              <>
                The 2009 Act and the Apprenticeships (Form of Apprenticeship Agreement)
                Regulations 2012 set the form of the apprenticeship agreement &mdash; a
                specific statutory form of employment contract recognised in law. The
                apprenticeship agreement records the apprenticeship framework or standard,
                the working hours, the off-the-job training requirement, and the pay.
              </>
            }
            meaning={
              <>
                JIB Stage progression sits on top of the apprenticeship agreement &mdash; the
                Act is the legal underpin, the WRA is the industry-collective layer above it.
                A JIB-graded apprentice is covered by both: the statutory apprenticeship
                framework and the collectively-bargained JIB Stage and pay framework.
              </>
            }
            cite="Source: Apprenticeships, Skills, Children and Learning Act 2009 (c.22) and Apprenticeships (Form of Apprenticeship Agreement) Regulations 2012 — paraphrased from legislation.gov.uk."
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
            title="Assuming Stage progression is automatic with time"
            whatHappens={
              <>
                Apprentice assumes that &quot;Stage 1 in Year 1, Stage 2 in Year 2&quot; is
                automatic. Falls behind on coursework in college Year 2, doesn&apos;t complete
                the relevant units. Year 2 ends but the Stage 2 evidence isn&apos;t in place
                &mdash; employer can&apos;t move them to Stage 3 in JIB&apos;s system. Stays
                on Stage 2 rate for an extra six months while the catch-up coursework gets
                done. Loses several thousand pounds in gross pay over those six months.
              </>
            }
            doInstead={
              <>
                Treat Stage progression as evidence-based, not time-based. Track your
                coursework completion against the Stage criteria. If you fall behind, raise
                it at the three-way review &mdash; the College Tutor and Workplace Mentor can
                help build a catch-up plan. Most employers will accept reasonable explanation
                for a one-month delay; longer delays directly cost you money.
              </>
            }
          />

          <Scenario
            title="Just passed AM2 — your employer hasn't moved you to Electrician rate. What's the right move?"
            situation={
              <>
                You sat AM2 six weeks ago and got the pass. You&apos;ve told your line manager
                and your College Tutor. Your next payslip arrives and you&apos;re still on the
                final-year Apprentice rate (the pre-AM2 stage colloquially called the
                &quot;Improver&quot; period) &mdash; about &pound;4/hr below the Electrician
                rate. You ask payroll and they say &quot;the JIB upgrade hasn&apos;t come
                through&quot;. You&apos;re losing several hundred pounds a month while this
                drags on.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; verify your AM2 result is officially with JIB</strong>.
                NET (the AM2 administrator) issues the pass certificate and notifies JIB once
                processed. Check that your AM2 pass is recorded on your JIB account
                (jib.org.uk login). If it&apos;s not, chase NET.
                <br /><br />
                <strong>Step 2 &mdash; ask your employer to formally apply for the grade
                upgrade</strong>. The JIB grade upgrade is initiated by the employer through
                the JIB portal, with your AM2 evidence attached. Your line manager or HR /
                training lead is the person to push. Give them the AM2 certificate number and
                date.
                <br /><br />
                <strong>Step 3 &mdash; raise it at the three-way review or with the union
                rep</strong>. If the employer is dragging their feet (or worse, hoping you
                won&apos;t notice), this is a legitimate JIB-graded contract issue. Raise it
                politely first, then formally if needed. Unite rep is the escalation route on
                JIB-graded sites.
                <br /><br />
                <strong>Step 4 &mdash; get the back-pay</strong>. Once the grade upgrade goes
                through, the new rate should be backdated to the date of your AM2 pass (or to
                the date your employer was notified, depending on contract wording). Check
                the back-pay arrives on the next payroll.
                <br /><br />
                <strong>Step 5 &mdash; document for the future</strong>. Keep a copy of your
                AM2 certificate, your JIB upgrade date, and the date the new rate first
                appeared on payroll. If you change employer in future, that record proves you
                hold the Electrician grade and avoid being asked to re-prove it.
              </>
            }
            whyItMatters={
              <>
                The pre-AM2 to Electrician jump is the biggest single pay step of the
                apprenticeship &mdash; typically &pound;4-5/hr or &pound;8,000+/year of gross
                pay. Every week the upgrade is delayed costs you real money. JIB-graded
                employers are bound to process upgrades promptly; the practical reality is
                that some firms need to be reminded. Don&apos;t be shy about chasing &mdash;
                this is contractual, not optional.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Beyond the headline grade — what the JIB ladder really gates</ContentEyebrow>

          <ConceptBlock
            title="The Approved Electrician evidence pack — what JIB actually wants to see"
            plainEnglish="Approved Electrician is not automatic three years after AM2 — JIB requires evidence. The application asks for at least three years post-AM2 experience, demonstration of supervisory capacity (signing off junior electricians' work, leading small gangs), evidence of higher-level competence (Inspection & Testing on real installations, supervision of complex installs), and continued CPD. The standard evidence pack is a CV with project references, sample test certificates you've signed, a brief portfolio of jobs you've led, and references from your Foreman or Project Engineer."
            onSite="Don't wait three years and then start gathering — start collecting evidence from month one post-AM2. Keep a working list of every job you've signed, every junior you've supervised, every CPD course you've done. JIB processes Approved upgrades in 4-6 weeks once the application's complete; the pay step (~£1.79/hr extra national, more with LW) backdates to the JIB processing date, not the date you started doing the work. Late paperwork costs you real money."
          >
            <p>
              The Approved Electrician application stack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Three years post-AM2</strong> &mdash; minimum experience as a JIB Electrician.
              </li>
              <li>
                <strong>Supervisory evidence</strong> &mdash; signed-off work, witness records, references from a Foreman or Project Engineer confirming you've led work.
              </li>
              <li>
                <strong>Inspection &amp; Testing competence</strong> &mdash; ideally C&amp;G 2391-52 plus signed certificates demonstrating competent application.
              </li>
              <li>
                <strong>CPD record</strong> &mdash; recent BS 7671 update, manufacturer training, scheme assessments.
              </li>
              <li>
                <strong>Application fee</strong> &mdash; submitted via JIB portal; nominal cost (typically &lt;&pound;100).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Technician grade — the often-skipped final rung"
            plainEnglish="Technician is the senior JIB grade, sitting above Approved Electrician. It requires the Approved Electrician baseline plus an HNC, HND or BEng in electrical engineering (or recognised equivalent) and evidence of design or specialist competence. The pay step over Approved is moderate (~£0.80-1.20/hr) but the grade is what most Project Engineer, Senior Designer and Contracts Engineer roles formally require. It's also the JIB grade that aligns with EngTech registration with the Engineering Council via the IET — opening the chartered-route ladder."
            onSite="Many electricians plateau at Approved because the Technician requirement (the HNC) feels like a step out of trade work into 'proper studying'. That's missing the point — the HNC is one year part-time at a local FE college, often with employer fee contribution, and it's the gate to roughly £8-15k/year more in design and engineering roles. If you've enjoyed the technical side of the apprenticeship (load calcs, design queries, fault diagnosis), the Technician route is worth planning from year 4-5 post-AM2."
          >
            <p>
              The Technician grade evidence stack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Approved Electrician baseline</strong> &mdash; already JIB-processed.
              </li>
              <li>
                <strong>HNC, HND or BEng</strong> &mdash; in Electrical / Electrical &amp; Electronic Engineering or accepted equivalent.
              </li>
              <li>
                <strong>Specialist competence evidence</strong> &mdash; design work, commissioning records, supervisory portfolio.
              </li>
              <li>
                <strong>Optional EngTech registration</strong> &mdash; via IET as the chartered-route stepping-stone, often filed alongside.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="JIB Working Rules — the contract clauses that turn grade into take-home"
            plainEnglish="The JIB Working Rule Agreement is the document that converts your grade into your weekly cheque. It defines the working week (typically 37.5-39 hours basic depending on industry sector), overtime triggers (1.5x weekday after contracted hours, 2x weekends and bank holidays), the Welfare, Holidays and Retirement Benefits Scheme (paid holiday on top of statutory minimum), the Combined Benefits Stamp (the JIB pension contribution mechanism), travel time and lodging allowances. Most JIB-graded employment contracts incorporate the Working Rules by reference."
            onSite="Read your contract — if it says 'JIB Working Rules apply' or 'JIB-graded contract' then the Working Rule Agreement is part of your terms. ACAS Code of Practice on disciplinary and grievance procedures sits on top. If you ever have a pay dispute (unpaid travel time, missed overtime, late grade upgrade) the Working Rules are your reference document, and JIB has a formal disputes procedure. Knowing where to find the rules is itself a career skill."
          >
            <p>
              Key Working Rule clauses every JIB-graded electrician should know:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Working week</strong> &mdash; typically 37.5&ndash;39 hours basic, defined per sector.
              </li>
              <li>
                <strong>Overtime</strong> &mdash; 1.5x after contracted hours weekdays, 2x weekends and bank holidays.
              </li>
              <li>
                <strong>Travel time</strong> &mdash; tier-banded allowance based on distance from the JIB-defined home depot.
              </li>
              <li>
                <strong>Lodging</strong> &mdash; flat daily allowance for jobs &gt;50 miles from home.
              </li>
              <li>
                <strong>Holiday</strong> &mdash; statutory 5.6 weeks plus JIB-additional, accrued through the Combined Benefits Stamp.
              </li>
              <li>
                <strong>Sick pay</strong> &mdash; company sick pay scheme on top of SSP, typically scaling with service.
              </li>
              <li>
                <strong>Disputes</strong> &mdash; formal JIB disputes procedure; sits alongside ACAS Code on internal grievance.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="ACAS Code of Practice 1 &mdash; Disciplinary and Grievance Procedures (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The ACAS Code of Practice 1 sets the minimum standard for handling disciplinary and grievance issues
                  in UK workplaces. Headline expectations:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Raise issues promptly and in writing where possible.</li>
                  <li>Employer must investigate fairly before any disciplinary outcome.</li>
                  <li>Employee has the right to be accompanied at formal meetings (by a colleague or trade union rep).</li>
                  <li>Right of appeal against any formal decision.</li>
                  <li>Employment Tribunals can adjust awards by up to 25% for unreasonable failure to follow the Code.</li>
                </ul>
              </>
            }
            meaning={
              <>
                The ACAS Code is not statute but tribunals weight non-compliance heavily in any unfair-dismissal or
                unpaid-wages case. For a JIB-graded apprentice the typical issue is a delayed grade upgrade or unpaid
                travel time &mdash; the right path is grievance under your firm's procedure first, then JIB disputes
                procedure if unresolved, then ACAS conciliation, then Employment Tribunal as a last resort. Most
                disputes resolve at stage 1 if you raise them properly in writing.
              </>
            }
            cite="Source: ACAS Code of Practice 1 on Disciplinary and Grievance Procedures &mdash; paraphrased from acas.org.uk."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Formal JIB grading ladder: Apprentice (Stages 1-4) → Adult Trainee → Electrician → Approved Electrician → Technician. Each grade has a JIB-published minimum hourly rate. 'Improver' is colloquial industry shorthand for the post-college, pre-AM2 stage — NOT a formal JIB grade.",
              "Apprentice Stages 1-4 are evidence-based (syllabus completion + portfolio), not chronological. Falling behind on coursework can trap you at a lower Stage rate.",
              "Final-year Apprentice → Electrician requires AM2; Electrician → Approved requires 2391-52 + 2 years' experience; Approved → Technician requires HNC/HND/degree + senior experience.",
              "JIB pay rates are renegotiated annually by ECA (employers) and Unite (workers) under the Working Rule Agreement. New rates typically take effect each January.",
              "London weighting adds £2-3/hr inside the M25; SJIB sets separate rates for Scotland; travel allowances stack on top for distant work.",
              "Your JIB grade is portable — recorded on your ECS card. JIB-graded employers are bound to pay at least the JIB minimum for your grade.",
              "AM2 is the biggest single pay step — typically £4-5/hr step up to Electrician rate. Chase the JIB upgrade promptly after passing.",
              "Non-JIB employers are not bound to JIB rates (only to NMW/NLW), but typically use JIB rates as the market reference. Always ask in interview about JIB status.",
            ]}
          />

          <Quiz title="JIB grading and pay framework — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.1 Industry structure and roles
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 ECS card requirements
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
