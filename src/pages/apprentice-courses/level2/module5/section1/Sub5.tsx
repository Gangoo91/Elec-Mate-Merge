/**
 * Module 5 · Section 1 · Subsection 5 — Apprenticeship triangle + UK trade-body landscape
 * Supplementary content — extends LO1 of Unit 210 but is not directly mapped to a
 * 210 AC. Builds the wider professional landscape around the apprenticeship.
 *
 * Frame: the three-way triangle of College Tutor, Workplace Mentor, Employer.
 * EPA at the end. Schemes (NICEIC, NAPIT, ELECSA, STROMA, Certsure). Trade
 * bodies (ECA, SELECT, JIB). Industry charities (Mates in Mind, Lighthouse
 * Club, Electrical Industries Charity).
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
  'Apprenticeship triangle + UK trade-body landscape | Level 2 Module 5.1.5 | Elec-Mate';
const DESCRIPTION =
  'College Tutor, Workplace Mentor, Employer — the three-way relationship that runs the apprenticeship. EPA, schemes (NICEIC, NAPIT, ELECSA, STROMA), trade bodies (ECA, SELECT, JIB) and industry charities.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s1-sub5-triangle',
    question:
      "Who are the three people in the 'apprenticeship triangle' that drives a UK electrical apprenticeship?",
    options: [
      "The HSE, the Building Inspector and the customer.",
      "The College Tutor (delivers the 2365 syllabus, marks coursework, owns the AM2 prep), the Workplace Mentor (your day-job teacher, signs portfolio entries, calibrates your gradings), and the Employer (pays you, owns your apprenticeship contract, signs the off-the-job training declaration). The three meet monthly for the three-way review.",
      "The Apprentice, the Foreman and the Site Manager.",
      "The Project Engineer, the Contracts Manager and the Apprentice.",
    ],
    correctIndex: 1,
    explanation:
      "The apprenticeship triangle is the formal partnership that runs the apprenticeship. Each corner has a different job — the Tutor handles the syllabus and the qualifications, the Mentor handles the on-site teaching and portfolio, the Employer handles the contract and the time. The monthly three-way review is the formal sit-down where all three calibrate progress with the apprentice. Treat the triangle as the structure that keeps everyone aligned.",
  },
  {
    id: 'mod5-s1-sub5-epa',
    question:
      "What's the End-Point Assessment (EPA) and how does it differ from the AM2?",
    options: [
      "EPA is just a longer name for AM2.",
      "EPA (End-Point Assessment) is the apprenticeship-standard's formal assessment at the end of the apprenticeship, conducted by an independent End-Point Assessment Organisation (EPAO). For the Installation Electrician apprenticeship the EPA is built around the AM2, the AM2E and additional knowledge tests and a professional discussion. AM2 is the practical test; EPA is the holistic wrap that also includes the trade test, the knowledge tests and the discussion.",
      "EPA is only for plumbing apprenticeships.",
      "EPA is taken halfway through the apprenticeship.",
    ],
    correctIndex: 1,
    explanation:
      "Apprenticeship Standards (the post-2017 model) require an EPA delivered by an independent EPAO. For the Installation and Maintenance Electrician standard the EPA includes the AM2 (the long-standing practical test from the JIB) plus knowledge tests and a professional discussion. The EPA is taken at the gateway — when your Employer, Tutor and Mentor agree you're ready. It's holistic — it assesses the whole apprenticeship, not just the practical skills.",
  },
  {
    id: 'mod5-s1-sub5-jib',
    question:
      "What does the JIB do and why does an apprentice care?",
    options: [
      "Nothing — the JIB doesn't exist any more.",
      "The Joint Industry Board (JIB) is the body that sets the working rules, pay rates, holiday entitlements, sick-pay and pension arrangements for electricians in England, Wales and Northern Ireland. It also runs the JIB grading structure (Apprentice / Improver / Electrician / Approved / Technician) and the Apprentice Code of Practice. As an apprentice your pay rate, your training requirements and your grading are set by JIB rules.",
      "The JIB only handles disputes.",
      "The JIB only applies to Scotland.",
    ],
    correctIndex: 1,
    explanation:
      "JIB is the long-standing collective bargaining body for the electrical contracting industry in England, Wales and Northern Ireland. SELECT/SJIB does the equivalent in Scotland. JIB rules are commonly written into electrical contracting employment contracts ('JIB-graded' company), which is how the JIB pay rates and conditions reach individual apprentices. Knowing your firm's JIB status (or non-JIB status) tells you what your pay structure looks like.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the Workplace Mentor's main role on a UK electrical apprenticeship?",
    options: [
      "To drive the apprentice to college.",
      "To be the apprentice's day-job teacher and portfolio signer-off. The Mentor is an experienced electrician (typically Approved or Technician grade) who is formally allocated to support a specific apprentice. They sign portfolio entries as evidence of on-site competence, calibrate gradings with the College Tutor, attend the monthly three-way reviews, and act as the first point of escalation for apprentice-specific issues.",
      "Only to attend the AM2.",
      "Only to make the tea.",
    ],
    correctAnswer: 1,
    explanation:
      "Mentor is a workplace responsibility, not a JIB grade. The JIB Apprentice Code of Practice expects every apprentice to have a named workplace Mentor. The Mentor is rarely the same person you're paired with day-to-day (pairings change with the work) but they stay constant across the apprenticeship as your strategic teacher.",
  },
  {
    id: 2,
    question:
      "What does the College Tutor own in the apprenticeship?",
    options: [
      "Only the canteen at the college.",
      "Delivery of the 2365 (or equivalent) syllabus, marking of coursework and exams, AM2 preparation, and the formal academic record. The Tutor sees the apprentice typically one day a week (day-release model) or in block release. They calibrate progress with the Workplace Mentor at three-way reviews and own the academic side of the apprenticeship.",
      "Only the marketing of the college.",
      "Nothing — the college tutor is a ceremonial role.",
    ],
    correctAnswer: 1,
    explanation:
      "The Tutor is the academic anchor of the apprenticeship. They own the syllabus delivery, the coursework marking and the AM2 prep. They're also the apprentice's first point of contact for academic difficulties (struggling with maths, complications with assessments). The two-way calibration with the Workplace Mentor at the monthly three-way review is what stops the academic and the practical sides drifting apart.",
  },
  {
    id: 3,
    question:
      "What does the Employer own in the apprenticeship?",
    options: [
      "Only the apprentice's tools.",
      "The apprenticeship contract (a formal indenture under the Apprenticeships, Skills, Children and Learning Act 2009), the wages, the off-the-job training declaration (a minimum 20% of paid working hours under the Apprenticeship Standard), the provision of suitable work and supervision, and HASAWA s.2 duties to provide a safe place of work and adequate training.",
      "Only the apprentice's transport.",
      "Only the welfare facilities.",
    ],
    correctAnswer: 1,
    explanation:
      "The Employer is the legal anchor of the apprenticeship — they sign the apprenticeship contract, they pay the wages, they provide the work and supervision, they ensure the 20% off-the-job training. The Apprenticeships, Skills, Children and Learning Act 2009 sets the legal framework for apprenticeship contracts; the Apprenticeship Standards (post-2017 model) set the off-the-job training requirement; HASAWA s.2 sets the safety and training duties.",
  },
  {
    id: 4,
    question:
      "Who attends the monthly three-way review?",
    options: [
      "Only the College Tutor.",
      "The Apprentice, the College Tutor and the Workplace Mentor (with the Employer's training lead or HR sometimes attending as a fourth voice). The three-way review is the formal sit-down where progress is calibrated, gaps identified, and the next month's targets agreed. It's the structural mechanism that stops academic and practical sides drifting apart.",
      "Only the Apprentice.",
      "The Apprentice and the customer only.",
    ],
    correctAnswer: 1,
    explanation:
      "Three-way reviews (sometimes 'tri-partite reviews') are the standard apprenticeship mechanism for keeping the College Tutor, the Workplace Mentor and the Apprentice aligned. The Employer's HR or training lead often attends as a fourth voice on the contract and pastoral side. Most college courses build these reviews into the apprenticeship calendar — typically monthly or six-weekly.",
  },
  {
    id: 5,
    question:
      "What is the ECA?",
    options: [
      "A type of consumer unit.",
      "The Electrical Contractors' Association — the trade association for electrical contractors in England, Wales and Northern Ireland. Founded 1901. ECA membership is a quality mark for the contractor; ECA also lobbies on behalf of the industry, runs technical events, publishes guidance and runs the JIB jointly with the trade union (Unite).",
      "An electrical accreditation course.",
      "A circuit type.",
    ],
    correctAnswer: 1,
    explanation:
      "ECA is the largest trade association for electrical contractors. It's the employer side of the JIB (with Unite as the worker side). ECA membership signals a contractor that meets a quality standard and follows industry best practice. As an apprentice you might see the ECA logo on your firm's letterhead — it tells the customer the firm is a member.",
  },
  {
    id: 6,
    question:
      "What does SELECT do?",
    options: [
      "Selects which colleges to attend.",
      "SELECT is the campaigning trade association for electrical contracting in Scotland. It's the equivalent of the ECA but for Scotland, and it works alongside the SJIB (Scottish Joint Industry Board) which sets the Scottish equivalent of the JIB rules. Scottish apprentices are usually contracted under SJIB rules with SELECT-member firms.",
      "Only deals with Scottish football.",
      "Only deals with English universities.",
    ],
    correctAnswer: 1,
    explanation:
      "SELECT is the Scottish equivalent of the ECA. The Scottish electrical contracting landscape uses SELECT (employer body) and the SJIB (Scottish JIB) for the bargaining and grading framework. The two are functionally similar to ECA + JIB but Scottish-specific. UK apprentices working in Scotland will encounter SJIB grading and SELECT-member firms.",
  },
  {
    id: 7,
    question:
      "Name a UK industry charity that an apprentice might encounter or use.",
    options: [
      "There are no industry charities.",
      "Mates in Mind (mental health awareness in construction), the Lighthouse Construction Industry Charity (financial, physical and mental wellbeing support for construction workers and their families), the Electrical Industries Charity (EIC — financial and welfare support for electrical industry workers and their families). Both Lighthouse Club and EIC run helplines and offer practical support including financial grants, mental health support and bereavement counselling.",
      "Only the Red Cross.",
      "Only Greenpeace.",
    ],
    correctAnswer: 1,
    explanation:
      "Construction industry mental health and welfare is now a recognised priority. Mates in Mind raises awareness of mental health in construction. The Lighthouse Club runs the Construction Industry Helpline (24/7 free) and provides financial grants in crisis. The Electrical Industries Charity (EIC) provides similar support specifically for the electrical industry. Knowing these exist is itself important — apprentices should not feel they have to suffer in silence.",
  },
  {
    id: 8,
    question:
      "What's the AM2?",
    options: [
      "A type of cable.",
      "The Achievement Measurement 2 — the long-standing JIB practical test for electrical installation. It's a multi-day practical assessment in a controlled environment covering installation, testing, fault-finding and inspection. Passing the AM2 is the line between 'Improver' and 'Electrician' on the JIB grading and is the practical centrepiece of the EPA for the Installation Electrician apprenticeship.",
      "An MCB rating.",
      "A type of consumer unit.",
    ],
    correctAnswer: 1,
    explanation:
      "AM2 has been the standard practical test for UK electricians for decades. It's run by NET (National Electrotechnical Training) at approved centres around the country. The AM2 (and the more advanced AM2E and AM2S variants for renewables and supplementary topics) is the practical anchor of the EPA. Apprentices typically take the AM2 in the final months of the apprenticeship after the Employer, Tutor and Mentor agree they're ready.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "What's the difference between an Apprenticeship Standard and an Apprenticeship Framework?",
    answer:
      "Apprenticeship Frameworks were the older model (qualifications-based) and Apprenticeship Standards are the newer model (occupation-based, with an EPA at the end). Most current apprenticeships in England follow the Standards model. The Installation and Maintenance Electrician standard is currently the most common route for UK electrical apprentices. Wales and Northern Ireland use slightly different models; Scotland uses Modern Apprenticeships under SDS (Skills Development Scotland).",
  },
  {
    question: "Does my Employer have to give me 20% off-the-job training?",
    answer:
      "Yes — Apprenticeship Standards in England require a minimum 20% of the apprentice's normal working hours to be spent on off-the-job training (which includes college, structured workplace learning, training events, shadowing, mentoring sessions and other forms of structured learning). This is paid time. The Employer signs an off-the-job training declaration confirming compliance. From August 2022 the requirement was changed to a minimum of six hours per week on a 30-hour-week basis.",
  },
  {
    question: "What if my College Tutor and my Workplace Mentor disagree on whether I'm ready for AM2?",
    answer:
      "This is one of the key reasons for the monthly three-way review — it's the structural mechanism for surfacing and resolving exactly this kind of disagreement. The right response is to bring all three of you together (Apprentice, Tutor, Mentor, often with the Employer's training lead) and walk through the specific evidence. The Tutor sees the academic side; the Mentor sees the practical side; the Apprentice sees both. Agreement usually emerges by walking through the portfolio and the assessment record together.",
  },
  {
    question: "Can I move my apprenticeship to a different employer?",
    answer:
      "Yes, but the apprenticeship contract is between you and the employer — moving requires the new employer to take on the contract (a 'change of employer' arrangement) and the college and EPA provider to be informed. It's not unusual on construction-sector apprenticeships where projects come and go. Your College Tutor and the apprenticeship-standard's training provider (often the college itself) handle the paperwork. Don't just walk out — talk to your Tutor first.",
  },
  {
    question: "What's the JIB Apprentice Code of Practice and where can I find it?",
    answer:
      "The JIB Apprentice Code of Practice is a JIB-published guide setting expectations for both apprentices and employers under JIB-graded contracts. It covers training expectations, supervision, grading progression, the Mentor role, and pay-grade progression as the apprentice gains qualifications and experience. It's available on the JIB website (jib.org.uk) and your firm's HR or training lead should be able to supply a copy.",
  },
  {
    question: "What support is available if I'm struggling — financially or with mental health?",
    answer:
      "The Lighthouse Construction Industry Charity runs the free 24/7 Construction Industry Helpline (0345 605 1956) and offers financial grants, mental health support and crisis intervention for construction workers and their families. The Electrical Industries Charity (electricalcharity.org) offers similar support specifically for the electrical sector. Mates in Mind (matesinmind.org) raises mental health awareness in construction. Many colleges also have student support services. Reaching out is a sign of strength, not weakness.",
  },
];

export default function Sub5() {
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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1 · Subsection 5"
            title="Apprenticeship triangle + UK trade-body landscape"
            description="College Tutor, Workplace Mentor, Employer — the three-way relationship that runs the apprenticeship. Plus EPA, schemes (NICEIC, NAPIT, ELECSA, STROMA), trade bodies (ECA, SELECT, JIB) and industry charities."
            tone="emerald"
          />

          <TLDR
            points={[
              "The apprenticeship triangle: College Tutor (delivers the syllabus, owns AM2 prep), Workplace Mentor (your day-job teacher and portfolio signer), and Employer (your apprenticeship contract, your wages, your 20% off-the-job training). The three meet monthly for the three-way review.",
              "End-Point Assessment (EPA) is the formal assessment at the end of the apprenticeship, delivered by an independent EPAO. For the Installation Electrician standard the EPA wraps around the AM2 plus knowledge tests and a professional discussion.",
              "The wider landscape — competent-person schemes (NICEIC, NAPIT, ELECSA, STROMA, Certsure), trade bodies (ECA in England/Wales/NI, SELECT in Scotland), the JIB/SJIB for collective bargaining and grading, and industry charities (Mates in Mind, Lighthouse Club, EIC) for support.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO1 of Unit 210 but is not directly mapped to a 210 AC. Builds the wider professional landscape around the apprenticeship.",
              "Identify the three roles in the apprenticeship triangle — College Tutor, Workplace Mentor, Employer — and what each owns.",
              "State the role of the End-Point Assessment Organisation (EPAO) in the Apprenticeship Standards model and how the AM2 fits into the EPA for the Installation and Maintenance Electrician standard.",
              "Identify the role of competent-person schemes (NICEIC, NAPIT, ELECSA, STROMA, Certsure) in self-certifying Building Regulations Part P work in dwellings.",
              "Identify the role of trade associations — ECA (England, Wales and Northern Ireland) and SELECT (Scotland) — in representing electrical contractors and contributing to the JIB / SJIB.",
              "Identify the role of the JIB / SJIB in setting working rules, pay grades and the JIB Apprentice Code of Practice.",
              "Identify the UK industry charities — Mates in Mind, Lighthouse Construction Industry Charity, Electrical Industries Charity (EIC) — and the support they offer.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The apprenticeship triangle</ContentEyebrow>

          <ConceptBlock
            title="Three corners, one apprentice — the structural partnership"
            plainEnglish="A UK electrical apprenticeship is a three-way partnership between a College Tutor (who delivers the academic syllabus), a Workplace Mentor (your day-job teacher) and an Employer (who signs your contract and pays you). Each corner owns a different part of the apprenticeship. The structure that keeps them aligned is the monthly three-way review, where all three sit down with the apprentice to calibrate progress and agree the next month's targets."
            onSite="In practice you'll spend most of your week with the Mentor and the on-site team, with the Employer's training lead occasionally checking in, and the College Tutor for the day-release or block-release week. The triangle is the framework that makes sure all three perspectives meet on the same record. Without the triangle, apprenticeships often drift — academic falls behind practical, or practical races ahead of academic."
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  College Tutor
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Delivers the 2365 syllabus. Marks coursework and exams. Owns AM2 preparation.
                  Sees you typically one day a week (day release) or in block. Calibrates with
                  the Mentor at three-way reviews.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Workplace Mentor
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Your day-job teacher and portfolio signer. Experienced electrician (typically
                  Approved or Technician grade). Signs portfolio entries, calibrates gradings
                  with the College Tutor, attends three-way reviews, first point of escalation
                  for apprentice issues.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Employer
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Your apprenticeship contract (formal indenture). Pays your wages. Provides
                  suitable work and supervision. Signs the off-the-job training declaration
                  (minimum 20% of paid working hours). HASAWA s.2 duties to you.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="The monthly three-way review — the calibration mechanism"
            plainEnglish="Three-way reviews (sometimes 'tri-partite reviews') are the formal sit-down between Apprentice, College Tutor and Workplace Mentor (with the Employer's training lead often as a fourth voice). They happen monthly or six-weekly throughout the apprenticeship. The agenda is straightforward: progress against the syllabus, progress on the portfolio, gaps identified, next month's targets, any pastoral or contractual issues."
            onSite="The review is the most important meeting in your apprenticeship calendar. It's where the academic and practical sides meet, where disagreements get surfaced and resolved, and where you get a written record of progress that follows you into the EPA. Treat the reviews seriously — turn up prepared, with your portfolio updated, with questions for both Tutor and Mentor, and with honest reflection on the previous month."
          >
            <p>
              A typical three-way review agenda:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Last month&apos;s targets &mdash; what was achieved, what wasn&apos;t, why.
              </li>
              <li>
                Academic progress &mdash; coursework marks, knowledge gaps, exam preparation.
              </li>
              <li>
                Practical progress &mdash; portfolio entries since last review, on-site
                competence demonstrated, gaps identified.
              </li>
              <li>
                Calibration &mdash; do the academic and practical pictures agree? If not, why
                not?
              </li>
              <li>
                Next month&apos;s targets &mdash; specific, measurable, agreed by all three.
              </li>
              <li>
                Pastoral / contractual issues &mdash; anything that isn&apos;t strictly academic
                or practical (workload, mental health, travel, programme).
              </li>
              <li>
                EPA gateway readiness (in later stages) &mdash; are we on track to book the EPA
                at the planned point?
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

          <ContentEyebrow>EPA and the AM2</ContentEyebrow>

          <ConceptBlock
            title="End-Point Assessment (EPA) — the holistic wrap at the end"
            plainEnglish="EPA is the formal assessment at the end of an Apprenticeship Standard. It's delivered by an independent End-Point Assessment Organisation (EPAO) — a body that hasn't been involved in your training. For the Installation and Maintenance Electrician standard the EPA includes the AM2 (the long-standing JIB practical test), additional knowledge tests and a professional discussion. The EPA is taken at the gateway — when your Employer, Tutor and Mentor agree you're ready."
            onSite="The EPA is holistic — it assesses the whole apprenticeship, not just the practical skills. Knowledge tests check the theory; the AM2 checks the practical; the professional discussion checks the breadth and reflective thinking. Treating the EPA as 'just the AM2' is a common misconception — preparing for the AM2 alone won't get you through the discussion or the knowledge tests."
          >
            <p>
              EPA components for Installation and Maintenance Electrician:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>AM2 / AM2E / AM2S</strong> &mdash; the JIB-administered practical test
                covering installation, testing, fault-finding and inspection in a controlled
                environment. AM2E adds the wider Electrotechnical scope; AM2S covers Solar PV
                and renewables.
              </li>
              <li>
                <strong>Multiple-choice knowledge tests</strong> &mdash; covering BS 7671, the
                Wiring Regulations, design principles, regulatory frameworks (HASAWA, CDM,
                Building Regulations).
              </li>
              <li>
                <strong>Professional discussion</strong> &mdash; a structured conversation with
                the EPAO assessor exploring portfolio examples, decision-making and reflective
                thinking. Demonstrates breadth beyond the AM2.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="AM2 — the practical test most apprentices fixate on"
            plainEnglish="AM2 (Achievement Measurement 2) is the long-standing JIB practical test for electrical installation, run by NET (National Electrotechnical Training) at approved centres. It's a multi-day practical assessment in a controlled bay covering installation (containment, cabling, terminations, accessory fitting), testing (continuity, insulation resistance, polarity, earth fault loop, RCD), fault-finding and inspection. Passing the AM2 is the line between 'Improver' and 'Electrician' on the JIB grading."
            onSite="AM2 prep is owned by the College Tutor (academic), reinforced by the Workplace Mentor (practical calibration), and signed off for booking by the Employer, Tutor and Mentor jointly at the gateway. Most apprentices take the AM2 in the final months of the apprenticeship. Failing AM2 isn't the end — re-takes are allowed but the gateway readiness assessment becomes more critical for the second attempt."
          >
            <p>
              The AM2 day in summary:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Day 1</strong> &mdash; installation. Set up the bay, install containment,
                run cables, terminate, fit accessories. Time-pressured.
              </li>
              <li>
                <strong>Day 2</strong> &mdash; testing and inspection. Initial verification on
                the install you just did. Demonstrate the test sequence and complete certificates.
              </li>
              <li>
                <strong>Fault-finding</strong> &mdash; an introduced fault on a separate rig.
                Diagnose using meters and logical reasoning.
              </li>
              <li>
                <strong>Online elements</strong> &mdash; some knowledge questions and write-up
                may be online during or after the practical.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Competent-person schemes</ContentEyebrow>

          <ConceptBlock
            title="NICEIC, NAPIT, ELECSA, STROMA, Certsure — the self-certification schemes"
            plainEnglish="Competent-person schemes are private-sector audit bodies authorised by Government to verify that registered contractors continue to meet the competence standards needed to self-certify Building Regulations work — especially Part P (electrical safety in dwellings). Each scheme conducts an annual assessment of the registered contractor; in return the contractor can self-certify Part P notifiable work and issue compliance certificates direct to the Local Authority on the Local Authority's behalf."
            onSite="Most established electrical contracting firms are registered with one of these schemes. As an apprentice your firm's scheme registration is what allows them to do Part P notifiable work without LABC physically inspecting every job. The scheme assessor visits annually (covered in Sub 3 — Site Visitors). Knowing your firm's scheme matters because it shapes what work the firm can take on and the certification routes for that work."
          >
            <p>
              The main schemes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NICEIC</strong> &mdash; the oldest and largest scheme. Approved
                Contractor and Domestic Installer streams.
              </li>
              <li>
                <strong>NAPIT</strong> &mdash; multi-trade competent-person scheme covering
                electrical and other building services.
              </li>
              <li>
                <strong>ELECSA</strong> &mdash; electrical-focused scheme, now operated by
                Certsure (the same company that operates NICEIC).
              </li>
              <li>
                <strong>STROMA</strong> &mdash; multi-discipline certification body covering
                electrical and other compliance areas.
              </li>
              <li>
                <strong>Certsure</strong> &mdash; the operating company behind NICEIC and ELECSA.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Trade bodies and the JIB</ContentEyebrow>

          <ConceptBlock
            title="ECA, SELECT and the JIB / SJIB — collective bargaining and industry voice"
            plainEnglish="The Electrical Contractors' Association (ECA) is the trade association for electrical contractors in England, Wales and Northern Ireland. SELECT is the equivalent for Scotland. Both lobby on behalf of the industry, run technical events, publish guidance and contribute to the collective bargaining bodies (the JIB and the SJIB respectively) jointly with the trade union (Unite)."
            onSite="The JIB (Joint Industry Board for the Electrical Contracting Industry) sets the working rules, pay rates, holiday entitlements, sick pay, pension arrangements and the JIB grading structure (Apprentice / Improver / Electrician / Approved / Technician) for England, Wales and Northern Ireland. The SJIB does the equivalent in Scotland. JIB rules are commonly written into electrical contracting employment contracts ('JIB-graded' company), which is how the JIB pay rates and conditions reach you as an apprentice."
          >
            <p>
              What JIB membership does for an apprentice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>JIB grading</strong> &mdash; your competence grade (Apprentice, Improver,
                Electrician, Approved, Technician) is set by JIB rules.
              </li>
              <li>
                <strong>JIB pay rate</strong> &mdash; the minimum hourly rate for your grade,
                annually negotiated between ECA (employer side) and Unite (worker side).
              </li>
              <li>
                <strong>JIB pension</strong> &mdash; the industry-wide pension scheme (Electrical
                Contractors&apos; Industry Joint Industry Board pension fund).
              </li>
              <li>
                <strong>ECS card</strong> &mdash; the Electrotechnical Certification Scheme card
                evidencing your JIB grade. Required on most sites.
              </li>
              <li>
                <strong>JIB Apprentice Code of Practice</strong> &mdash; sets expectations for
                training, supervision, mentoring and grading progression for apprentices in
                JIB-graded firms.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="ECS card and the route from Apprentice card to Approved card"
            plainEnglish="The Electrotechnical Certification Scheme (ECS) card is the industry-standard ID card you carry on site. Run by JIB on behalf of the industry, it records your competence grade (Apprentice / Improver / Electrician / Approved / Technician), your CSCS H&S test pass and any specialist endorsements (such as solar PV or EV charging). On most CDM sites the ECS card is required for entry."
            onSite="As an apprentice your ECS card shows the Apprentice grade. The card includes your photo, your JIB grade, the qualifications you hold and the date of your last H&S test. After AM2 you upgrade to Electrician grade by submitting evidence to JIB; after additional time-served and CPD you can apply for Approved. The card is more than just an ID — it's the portable evidence of your competence that you carry across employers and across sites."
          >
            <p>
              The ECS card progression for an apprentice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Apprentice card</strong> &mdash; issued during the apprenticeship.
                Requires CSCS-equivalent H&amp;S test pass and proof of registered apprenticeship.
              </li>
              <li>
                <strong>Improver card</strong> &mdash; post-college, pre-AM2. Holds the technical
                qualifications (2365-03 or NVQ Level 3) but has not yet passed AM2.
              </li>
              <li>
                <strong>Electrician card</strong> &mdash; post-AM2. The full Electrician JIB
                grade. Most common card on UK sites.
              </li>
              <li>
                <strong>Approved Electrician card</strong> &mdash; additional experience and CPD
                evidenced to JIB. Authority to supervise, sign off work and lead gangs.
              </li>
              <li>
                <strong>Technician card</strong> &mdash; additional formal qualifications (HNC,
                HND or degree) plus Approved status. Senior design and commissioning grade.
              </li>
              <li>
                <strong>Endorsements</strong> &mdash; specialist add-ons such as Solar PV (after
                AM2S) or EV Charging. Recorded on the same card.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Apprenticeships, Skills, Children and Learning Act 2009 — s.32 (Apprenticeship agreement)"
            clause={
              <>
                <p className="mb-2">
                  &quot;An apprenticeship agreement is an agreement entered into in connection
                  with a recognised English framework or standard under which &mdash; (a) the
                  apprentice undertakes to work for the other party (the employer) for reward,
                  (b) the agreement is in the prescribed form, and (c) the agreement states that
                  it is governed by the law of England and Wales.&quot;
                </p>
                <p>
                  <strong>Note:</strong> the Act and subsequent secondary legislation (Apprenticeships
                  (Form of Apprenticeship Agreement) Regulations 2012, and the Apprenticeship
                  Standards regulations) set out the form and the off-the-job training requirements.
                </p>
              </>
            }
            meaning={
              <>
                The apprenticeship agreement is a specific form of employment contract recognised
                by statute. It binds you and your Employer into the apprenticeship framework or
                standard and triggers the Employer&apos;s duty to provide the off-the-job
                training (currently a minimum of six hours per week on a 30-hour-week basis under
                the Apprenticeship Standards model). It&apos;s a serious contract &mdash; not a
                handshake. Treat it accordingly.
              </>
            }
            cite="Source: Apprenticeships, Skills, Children and Learning Act 2009 (c.22), s.32 — paraphrased and summarised from legislation.gov.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.2(2)(c) (training)"
            clause={
              <>
                &quot;The matters to which that duty extends include in particular &mdash; (c)
                the provision of such information, instruction, training and supervision as is
                necessary to ensure, so far as is reasonably practicable, the health and safety
                at work of his employees.&quot;
              </>
            }
            meaning={
              <>
                HASAWA s.2(2)(c) is the explicit training duty on the Employer. It applies in
                full to apprentices &mdash; arguably more so than to fully-qualified electricians
                because the apprentice is &quot;in the process of obtaining&quot; competence and
                needs more training and supervision than a qualified colleague. An Employer who
                under-supervises an apprentice or who skips training is in breach of s.2(2)(c)
                and is also typically in breach of the apprenticeship contract.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="JIB Apprentice Code of Practice — supervision and progression (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The JIB Apprentice Code of Practice sets expectations for both apprentice and
                  employer under JIB-graded contracts. Headline expectations include:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Every apprentice has a named workplace Mentor who supports portfolio
                    development and on-site learning.
                  </li>
                  <li>
                    Apprentices are paired with an Approved Electrician for direct supervision
                    of the work face.
                  </li>
                  <li>
                    The apprentice attends college (day release or block) for the off-the-job
                    learning required by the Apprenticeship Standard.
                  </li>
                  <li>
                    Pay grades progress as the apprentice gains qualifications and time-served
                    experience under JIB rules.
                  </li>
                  <li>
                    Three-way reviews happen at agreed intervals between the apprentice, the
                    college tutor and the workplace mentor.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                The Code of Practice is paraphrased here from JIB-published guidance. It&apos;s
                not statute but it&apos;s the industry-standard expectation for JIB-graded firms
                and is commonly written into the apprenticeship contract itself. As an apprentice
                you can refer to the Code as evidence of what good supervision and training look
                like &mdash; and your Mentor and Tutor can use it to calibrate progress against
                the standard.
              </>
            }
            cite="Source: JIB (Joint Industry Board for the Electrical Contracting Industry) Apprentice Code of Practice — paraphrased from publicly-available JIB guidance at jib.org.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Industry charities and welfare</ContentEyebrow>

          <ConceptBlock
            title="Mates in Mind, Lighthouse Club, Electrical Industries Charity"
            plainEnglish="Construction industry mental health and welfare is now a recognised priority. Three UK charities are most relevant for electrical apprentices — Mates in Mind (mental health awareness in construction), the Lighthouse Construction Industry Charity (financial and welfare support for construction workers and families) and the Electrical Industries Charity (EIC — financial and welfare support specifically for electrical industry workers and families)."
            onSite="Knowing these exist is itself important. The construction sector still has higher-than-average rates of mental health crisis and suicide. The charities exist precisely because the sector recognises the issue and wants to provide practical support. Reaching out is a sign of strength, not weakness — and most college student services can also signpost to local support."
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Mates in Mind
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Charity raising mental health awareness across the construction industry.
                  Training programmes, workplace toolkits and campaigning. matesinmind.org
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Lighthouse Club
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Free 24/7 Construction Industry Helpline (0345 605 1956). Financial grants,
                  mental health support, crisis intervention for construction workers and
                  families. lighthouseclub.org
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Electrical Industries Charity (EIC)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Financial and welfare support specifically for the electrical industry.
                  Hardship grants, mental health support, family support and bereavement
                  counselling. electricalcharity.org
                </p>
              </div>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Assuming the EPA is 'just an exam' — it's holistic"
            whatHappens={
              <>
                Apprentice fixates on AM2 prep, treats the AM2 day as the entire apprenticeship.
                Spends months in mock-AM2 environments, doesn&apos;t engage with the wider
                portfolio, doesn&apos;t prepare for the knowledge tests or the professional
                discussion. Passes the AM2 itself but then struggles in the discussion because
                they can&apos;t articulate the design decisions in their portfolio examples or
                explain how they applied BS 7671 in real situations. The EPAO assessor flags the
                breadth gap. The apprentice has to re-take the discussion.
              </>
            }
            doInstead={
              <>
                Treat the EPA as a holistic assessment of the whole apprenticeship. The AM2 is
                the practical centrepiece but the knowledge tests and the professional
                discussion are equally weighted. Prepare across all three: practice the AM2,
                revise BS 7671 and the regulatory frameworks for the knowledge tests, and
                practice talking through your portfolio examples for the discussion. The
                three-way reviews are where you check you&apos;re prepared across all three
                strands &mdash; not just the AM2.
              </>
            }
          />

          <Scenario
            title="Tutor and Mentor disagree on AM2 readiness — what's the resolution?"
            situation={
              <>
                You&apos;re ten months out from your planned AM2 booking. At the latest three-way
                review your College Tutor says &quot;you&apos;ve not done enough portfolio
                evidence in the last two months &mdash; I don&apos;t think you&apos;re on track
                for AM2 in the planned window&quot;. Your Workplace Mentor says &quot;he&apos;s
                been doing solid work on site every day &mdash; I think he&apos;s practically
                ready and the portfolio just needs writing up&quot;. You sit between them feeling
                pulled both ways and the meeting is getting tense.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; surface the actual evidence</strong>. Both Tutor and
                Mentor are partially right. The Tutor sees the portfolio (the formal record); the
                Mentor sees the work face (the actual competence). The disagreement is usually
                about whether the formal record reflects the actual competence. Walk through the
                portfolio together and identify the specific gaps the Tutor is flagging.
                <br /><br />
                <strong>Step 2 &mdash; agree a write-up plan</strong>. If the Mentor is right
                that the practical work has been solid, the gap is in writing it up as portfolio
                evidence. Agree a specific number of portfolio entries to be drafted by the
                apprentice and signed by the Mentor in the next four weeks. Tutor reviews the
                drafts ahead of the next three-way.
                <br /><br />
                <strong>Step 3 &mdash; agree calibration moments</strong>. Schedule two
                additional check-ins (one Tutor-Apprentice, one Mentor-Apprentice) before the
                next full three-way to keep the work on track. Make sure the Employer&apos;s
                training lead is in the loop &mdash; if the off-the-job training time is
                insufficient that&apos;s their issue to fix.
                <br /><br />
                <strong>Step 4 &mdash; agree a contingency on AM2 booking</strong>. If the
                portfolio gap can&apos;t be closed, agree how the AM2 booking date moves. Be
                honest with yourself &mdash; rushing into AM2 underprepared and failing is worse
                than booking it three months later and passing first time. Tutor and Mentor will
                respect honesty about readiness more than they&apos;ll respect bravado.
                <br /><br />
                <strong>Step 5 &mdash; record the decision</strong>. Whatever you agree gets
                written up in the three-way review record so all four (Apprentice, Tutor, Mentor,
                Employer) are on the same page. The record protects everyone if the conversation
                gets revisited in three months.
              </>
            }
            whyItMatters={
              <>
                Tension between Tutor and Mentor is normal and is exactly what the three-way
                review is designed to resolve. Each has a piece of the picture: Tutor sees the
                portfolio and the academic record; Mentor sees the on-site competence; you see
                both. The apprenticeship triangle works because the disagreements get surfaced
                in a structured forum rather than left to fester. Bringing all three together
                and walking through the actual evidence is almost always how it resolves.
                Pretending the disagreement isn&apos;t happening is what kills apprenticeships.
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
              "The apprenticeship triangle is College Tutor (academic syllabus, AM2 prep), Workplace Mentor (day-job teacher, portfolio sign-off, on-site competence) and Employer (apprenticeship contract, wages, 20% off-the-job training).",
              "The monthly three-way review is the formal sit-down between Apprentice, Tutor and Mentor (with the Employer's training lead as a fourth voice). It's the structural mechanism for surfacing and resolving disagreements between academic and practical sides.",
              "End-Point Assessment (EPA) is the formal assessment at the end of an Apprenticeship Standard, delivered by an independent EPAO. For Installation and Maintenance Electrician the EPA includes AM2, knowledge tests and a professional discussion — it's holistic, not 'just an exam'.",
              "AM2 (Achievement Measurement 2) is the long-standing JIB practical test. Passing AM2 is the line between Improver and Electrician on the JIB grading. AM2 is the practical centrepiece of the EPA.",
              "Competent-person schemes (NICEIC, NAPIT, ELECSA, STROMA, Certsure) are private-sector audit bodies authorising contractors to self-certify Building Regulations Part P notifiable work in dwellings.",
              "Trade bodies — ECA (England, Wales, Northern Ireland) and SELECT (Scotland) — represent electrical contractors and contribute to the collective bargaining bodies (JIB / SJIB) jointly with the trade union (Unite).",
              "JIB / SJIB sets the working rules, pay rates, grades (Apprentice / Improver / Electrician / Approved / Technician), pension and the JIB Apprentice Code of Practice. ECS card evidences the JIB grade.",
              "Industry charities — Mates in Mind (mental health), Lighthouse Construction Industry Charity (24/7 helpline, grants), Electrical Industries Charity (EIC) — provide financial, mental health and welfare support. Reaching out is a sign of strength, not weakness.",
            ]}
          />

          <Quiz title="Apprenticeship triangle and trade bodies — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section1/1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.4 CDM 2015 framework — your duties as Worker
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2 — Information sources
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
