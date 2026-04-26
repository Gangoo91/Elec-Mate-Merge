/**
 * Module 3 · Section 1 · Subsection 6 — Competent Person Schemes, insurance and civil implications
 * Maps to City & Guilds 2365-02 / Unit 203 / LO1 / AC 1.2, 1.4
 *   AC 1.2 — "Identify non statutory regulations/guidance"
 *   AC 1.4 — "State implications of non-statutory regulations"
 *
 * Frame: scheme membership and insurance are non-statutory but commercially
 * mandatory. Why being on a CPS isn't optional for self-employed work.
 * The legal AND commercial chain — NICEIC/NAPIT/ELECSA, JIB grading, Part P
 * notification routes, PL/EL/PI insurance, civil claims (contract & tort),
 * scheme withdrawal, ECA / SELECT trade body memberships, and the
 * apprentice-specific angle on what the firm needs vs what the apprentice
 * needs personally during training.
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
  'Competent Person Schemes, insurance and civil claims (1.2, 1.4) | Level 2 Module 3.1.6 | Elec-Mate';
const DESCRIPTION =
  'NICEIC, NAPIT, ELECSA; JIB grading; Public Liability, Employers Liability and Professional Indemnity cover; civil claims under contract and tort; scheme withdrawal consequences; ECA / SELECT membership; what the firm needs vs what an apprentice needs personally during training.';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'mod3-s1-sub6-cps-vs-jib',
    question:
      "What's the practical difference between a Competent Person Scheme (NICEIC, NAPIT, ELECSA) and a JIB grading?",
    options: [
      "They're the same thing.",
      "A CPS is a Government-approved scheme that lets a contractor self-certify Part P notifiable work in dwellings (England/Wales). JIB is the joint employer/union body that sets pay grades, conditions and the national working rules for the contracting industry. CPS is contractor-level and licences the firm; JIB grading is operative-level and decides what you're paid and what you're allowed to sign for unsupervised on a JIB site. Different bodies, different scopes, different audiences.",
      "JIB regulates electricity supply.",
      "CPS is the same as the IET.",
    ],
    correctIndex: 1,
    explanation:
      "Different worlds. CPS is the contractor's licence to self-cert Part P. JIB is the operative's grading and pay framework. Most working electricians end up touching both — the firm holds the CPS registration; the individual carries the JIB card. Knowing which body does which thing is essential for understanding why both matter.",
  },
  {
    id: 'mod3-s1-sub6-pl-el-pi',
    question:
      "An electrical contractor working in England carries three different insurance lines. Which combination is correct?",
    options: [
      "Only Public Liability.",
      "Public Liability (PL) for damage / injury to third parties from the firm's activities; Employers' Liability (EL) — compulsory under the Employers' Liability (Compulsory Insurance) Act 1969 for any firm with employees, minimum £5 million cover; Professional Indemnity (PI) for design / advice / specification errors. Most contractors carry all three; the apprenticeship itself triggers the EL requirement.",
      "Just car insurance.",
      "House insurance.",
    ],
    correctIndex: 1,
    explanation:
      "Three lines, three different scopes. PL covers damage and injury caused by the firm's work. EL is compulsory whenever you employ anyone (including apprentices) under the 1969 Act — minimum cover £5m, certificate must be displayed. PI covers errors in design or advice — increasingly relevant as installers move into design-and-build and prosumer (PV / battery / EV) territory. Lose any one and the firm has a major commercial exposure.",
  },
  {
    id: 'mod3-s1-sub6-scheme-withdrawal',
    question:
      "A NICEIC contractor is suspended from the scheme after persistent failure to remediate non-conformances. What are the realistic immediate commercial consequences?",
    options: [
      "Nothing — the firm carries on as before.",
      "Immediate loss of Part P self-certification authority — every notifiable job now needs LABC notification before starting (delays + fees). Public Liability insurer is likely to cancel or refuse renewal (most insurers require scheme membership as a condition of cover). Marketing claims (NICEIC logo on van / website / quotes) must be withdrawn — using them after suspension is itself fraud. Tier-1 contractors that require CPS membership in their procurement criteria will remove the firm from approved-supplier lists. The trading firm collapses commercially even though no statute has been breached.",
      "Only loss of the badge.",
      "An automatic criminal prosecution.",
    ],
    correctIndex: 1,
    explanation:
      "Scheme withdrawal is the non-statutory framework's commercial equivalent of a criminal sanction — and is often more damaging in practice. Loss of self-cert authority, insurance cover, brand assets and contractor approvals all hit at the same time. Most contractors faced with serious non-conformance remediate before it gets to suspension because the alternative is the end of the trading firm.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Building Regulations 2010, Part P (England) requires that certain categories of domestic electrical work are notified to Building Control. What are the two routes to compliance and which is faster on a typical job?",
    options: [
      "Only LABC notification — there is no other route.",
      "Either (a) Competent Person Scheme self-certification — registered contractor uploads the cert to the scheme portal, scheme notifies LABC within 30 days, customer receives Building Reg compliance certificate by post; OR (b) LABC notification — non-registered contractor (or anyone choosing not to self-cert) must notify Local Authority Building Control BEFORE starting, pay the LABC fee, and be inspected by LABC or an Approved Inspector. Route (a) takes minutes; route (b) takes weeks plus a fee.",
      "Only ringing the IET.",
      "Only Trading Standards.",
    ],
    correctAnswer: 1,
    explanation:
      "The two-route system is what makes CPS membership commercially essential for any firm doing notifiable domestic work. Route (a) is fast, integrated into the workflow, and customer-friendly. Route (b) is slow, expensive, and the customer ends up paying the LABC fee on top of your bill. Once you understand this you understand why effectively every domestic-work contractor is on a scheme.",
  },
  {
    id: 2,
    question:
      "The Employers' Liability (Compulsory Insurance) Act 1969 makes EL insurance compulsory for most employers in Great Britain. What is the minimum required cover and where must the certificate be displayed?",
    options: [
      "£100 cover, in the bin.",
      "Minimum £5 million cover (most policies are written at £10m as standard). The certificate must be displayed at each place of business — historically a printed certificate on the wall; the 2008 amendment regulations allow electronic display provided employees can readily access it. Failure to insure is a criminal offence with daily-rate fines up to £2,500 for each day uninsured.",
      "£500, on the van.",
      "£100,000, in the office only.",
    ],
    correctAnswer: 1,
    explanation:
      "EL is one of the few genuinely compulsory insurances under UK law. The minimum is £5m (set by the 1969 Act) but most policies default to £10m because the underwriter's pricing difference is small. The certificate-display rule is criminally enforceable — HSE inspectors check it during routine visits. Apprentices count as employees from day one of the contract.",
  },
  {
    id: 3,
    question:
      "An electrical contractor causes a fire in a customer's house through a faulty connection. The customer sues. Which two routes can a civil claim follow and which is more commonly pursued?",
    options: [
      "Only fraud.",
      "Two parallel civil routes — (a) breach of contract (the implied term under the Supply of Goods and Services Act 1982 / Consumer Rights Act 2015 that work be carried out with reasonable care and skill); AND (b) tort of negligence (duty of care + breach + causation + loss). Both can be pleaded in the same claim. Negligence is usually the lead because it covers physical damage to property + consequential loss + injury, where contract may be limited by exclusion clauses. The contractor's PL insurer handles the defence under whichever route applies.",
      "Only judicial review.",
      "Only the small claims track.",
    ],
    correctAnswer: 1,
    explanation:
      "Civil claims for electrical-incident damage almost always plead both routes. Contract (Consumer Rights Act 2015 implied terms) gives the customer a route based on the relationship; negligence (the common law tort) gives them a route based on the harm. The PL insurer's defence team usually fights both in parallel. The non-statutory framework (BS 7671 compliance, scheme paperwork, EIC) is the documentary evidence the insurer relies on to defend.",
  },
  {
    id: 4,
    question:
      "An electrical contractor designs and specifies a bespoke distribution arrangement for a customer (without doing the install). The design later causes a problem. Which insurance line is primarily in play?",
    options: [
      "Public Liability.",
      "Professional Indemnity (PI) — covers the firm against claims arising from errors, omissions or negligent advice in their professional capacity (design, specification, recommendation). PL covers physical damage / injury from the contractor's activities; PI covers economic loss caused by bad advice or design. Increasingly relevant as installers move into design-and-build, EV charging design, solar PV design and prosumer's installations under BS 7671 Part 8.",
      "Employers' Liability.",
      "Travel insurance.",
    ],
    correctAnswer: 1,
    explanation:
      "PI is the under-appreciated third insurance line. As contractors take on more design responsibility (one-off control panels, EV/PV design, prosumer installations), PI exposure goes up. A contractor who does install-only work can sometimes get away with PL + EL alone; a design-and-build firm needs PI too. The trade body (ECA, SELECT) and most CPS schemes increasingly require PI as a condition of membership.",
  },
  {
    id: 5,
    question:
      "An apprentice on Year 1 isn't on a Competent Person Scheme themselves — schemes register the firm, not the individual operative. So what scheme-membership does the apprentice's employer need, and what does the apprentice carry personally?",
    options: [
      "Apprentice needs their own NICEIC.",
      "The employer's firm needs Competent Person Scheme registration (NICEIC / NAPIT / ELECSA) to self-certify the firm's notifiable domestic work. The apprentice carries: (a) a JIB Industrial Determination card showing their grade and apprenticeship year (issued through the apprenticeship); (b) ECS card for site access on most major commercial sites; (c) evidence of their college enrolment and progression. The apprentice does NOT need personal CPS membership — that's a contractor-level registration.",
      "Apprentice needs personal Public Liability.",
      "The apprentice needs nothing at all.",
    ],
    correctAnswer: 1,
    explanation:
      "This is a common point of confusion. CPS is contractor-level — it licences the firm to self-cert Part P. The apprentice (and indeed any individual operative) carries personal credentials separately — JIB card, ECS card, college enrolment record. After qualification the operative may take their own scheme membership if they go self-employed; during apprenticeship that's not relevant.",
  },
  {
    id: 6,
    question:
      "JIB grading runs from Adult Trainee / Labourer at the entry level through to Technician at the top. What's the typical sequence an apprentice progresses through?",
    options: [
      "There is no progression.",
      "Apprentice (graded by year of apprenticeship) → on completion of Level 3 + AM2/E + 18th Ed → Electrician → with additional experience and competence demonstration → Approved Electrician → with further design / fault-finding competence → Technician. Each grade unlocks higher pay (set by the JIB National Working Rules) and a wider scope of work the operative can carry out unsupervised on JIB-affiliated sites.",
      "Apprentice → Director.",
      "There are only two grades.",
    ],
    correctAnswer: 1,
    explanation:
      "The JIB grading ladder is the operative-level career framework. Pay is set nationally — your JIB grade × hours × the JIB hourly rate. Most large commercial / industrial sites are JIB-only, meaning unbadged operatives don't get on site. The apprentice card tracks progression year by year, and the post-apprenticeship grades (Electrician → Approved Electrician → Technician) give a clear continuing-development path with measurable pay impact.",
  },
  {
    id: 7,
    question:
      "What's the difference between the ECA (Electrical Contractors' Association) and the JIB?",
    options: [
      "They're identical.",
      "The ECA is a trade body — voluntary membership organisation representing contractors' commercial interests, providing technical / commercial / legal support, lobbying, training and standard-form contracts. The JIB is the joint employer/union body that sets pay, conditions and grading on JIB-affiliated jobs. ECA members typically apply JIB rules but the bodies are separate. SELECT plays a similar (but distinct) role for the contracting industry in Scotland.",
      "ECA is a Government department.",
      "JIB is a charity.",
    ],
    correctAnswer: 1,
    explanation:
      "Trade body (ECA / SELECT) vs joint employer/union body (JIB / SJIB) is a useful distinction. ECA = voluntary commercial membership for contractors. JIB = pay and grading framework for the industry. CPS = Government-approved scheme for self-cert. Three bodies, three different functions, often confused. Knowing what each one does avoids signing up to the wrong thing or assuming you're covered when you aren't.",
  },
  {
    id: 8,
    question:
      "After scheme suspension a contractor wants to challenge the decision. What's the realistic route?",
    options: [
      "Go straight to the High Court.",
      "Use the scheme's documented appeals process first — every CPS publishes a complaints / appeals procedure that members must exhaust before any external challenge. Decisions are typically reviewed by an independent panel within the scheme. After that, if the suspension is alleged to be unfair / wrongful, civil action can theoretically follow but is rarely successful — scheme membership is contractual, the rules were signed up to on enrolment, and courts are reluctant to second-guess scheme decisions on technical compliance. Better strategy: remediate, demonstrate corrective action and re-apply for membership.",
      "Stop trading immediately.",
      "Join a different scheme without remediation.",
    ],
    correctAnswer: 1,
    explanation:
      "Scheme appeals processes are the realistic remedy. They're built into the scheme rules and a CPS that suspended a member without following its own appeals process would itself be in trouble. External legal challenges to scheme decisions almost never succeed because the relationship is contractual and the scheme's technical judgement is generally respected by the courts. The pragmatic path after suspension is remediate + reapply, not litigate.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "Do I personally need to be on a Competent Person Scheme during my apprenticeship?",
    answer:
      "No. Schemes register the firm (the contractor), not the individual operative. Your employer carries the scheme registration — that's what lets the firm self-cert Part P notifiable work. You as an apprentice carry your JIB card (showing your grade and apprenticeship year) and your ECS card (for site access). After you qualify, if you go self-employed and want to do notifiable domestic work, you'd then take your own scheme membership in your own name.",
  },
  {
    question: "What's the difference between NICEIC and ELECSA — they're both run by Certsure?",
    answer:
      "Yes — both are run by Certsure (the Electrical Safety Council's commercial arm). They're branded differently and historically targeted different segments (NICEIC bigger contractors, ELECSA smaller domestic contractors), with slightly different fee structures and assessment styles. Functionally they cover the same ground for the regulator. Choosing between them is a commercial decision based on fees, marketing preference and what your business model looks like.",
  },
  {
    question: "If I work for a firm that has Public Liability cover, am I personally covered?",
    answer:
      "Generally yes for the firm's work — the PL policy will defend the firm against claims arising from your activities as an employee. But the policy may exclude wilful misconduct, work outside your competence, or unauthorised activities. And the EL policy is what covers YOU if you're injured at work (not PL — that's for third-party claims). Once you go self-employed you carry your own PL because the firm's policy stops protecting you.",
  },
  {
    question: "Why does Part P need a Competent Person Scheme at all — couldn't anyone just notify LABC?",
    answer:
      "They could — and that's exactly the LABC notification route. But it's slow, expensive (LABC fees per job), customer-facing (the customer is paying you AND the council), and disrupts the workflow on every notifiable job. CPS self-cert is the fast lane that the Government created to encourage contractors to maintain demonstrated competence in exchange for the right to notify on their own behalf. The trade-off for the contractor is annual scheme assessment and adherence to scheme rules.",
  },
  {
    question: "If my firm loses its scheme membership, what happens to the work I've already certified?",
    answer:
      "Existing certificates remain valid — the work was done under valid scheme registration at the time. But any subsequent rectification, addition or alteration will need to be done either by another scheme-registered contractor or via LABC notification. For the employee / apprentice the practical impact is the firm has lost its self-cert route, may struggle to keep trading, and may have to lay off staff. The scheme withdrawal isn't your personal record — it's the firm's — but it can affect your job security.",
  },
  {
    question: "What's SELECT and how does it relate to NICEIC / NAPIT / ELECSA?",
    answer:
      "SELECT is the trade body for the electrical contracting industry in Scotland — broadly equivalent to ECA south of the border, but in Scotland SELECT also operates a recognised competent person scheme route. The Scottish building regulations are devolved (Building (Scotland) Regulations and Scottish Technical Handbooks) so the Part P framework that applies in England doesn't directly apply in Scotland. SELECT's scheme operates within the Scottish regulatory framework. The technical standard everyone follows on either side of the border is still BS 7671.",
  },
];

export default function Sub6() {
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
            eyebrow="Module 3 · Section 1 · Subsection 6"
            title="Competent Person Schemes, insurance and civil implications"
            description="Why being on a CPS isn't optional for self-employed work — the legal AND commercial chain. NICEIC, NAPIT, ELECSA scheme rules; JIB grading; PL / EL / PI insurance; civil claims under contract and tort; scheme withdrawal consequences; ECA / SELECT trade body memberships; and what an apprentice needs personally vs what the employer needs."
            tone="emerald"
          />

          <TLDR
            points={[
              "A Competent Person Scheme (NICEIC / NAPIT / ELECSA) registers the firm as a self-certifier for Part P notifiable domestic work in England/Wales — without it, every notifiable job needs LABC notification, fees and weeks of delay.",
              "Three insurance lines run together — Public Liability (third-party damage / injury), Employers' Liability (compulsory under the 1969 Act, minimum £5m, covers employees including apprentices), Professional Indemnity (design / advice errors).",
              "Civil claims after an incident usually plead both contract (Consumer Rights Act 2015 implied terms) AND negligence (common law tort) in parallel. The non-statutory paperwork (BS 7671 compliance, EIC, scheme records) is the documentary defence.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the main UK Competent Person Schemes (NICEIC, NAPIT, ELECSA) and explain how scheme membership operates as the Part P self-certification route.",
              "Describe the JIB grading ladder (Apprentice → Electrician → Approved Electrician → Technician) and explain how grading determines pay and unsupervised work scope on JIB-affiliated sites.",
              "Distinguish the three main insurance lines a working contractor carries — Public Liability, Employers' Liability (compulsory under the 1969 Act), Professional Indemnity — and what each covers.",
              "Explain the two civil-claim routes (breach of contract under the Consumer Rights Act 2015, and the tort of negligence at common law) and how both rely on the non-statutory documentary trail for defence.",
              "Outline the commercial consequences of scheme suspension or withdrawal — loss of self-certification authority, likely loss of insurance cover, withdrawal of brand assets, removal from approved-supplier lists.",
              "Distinguish trade body memberships (ECA in England, SELECT in Scotland) from CPS membership and JIB grading, and explain what an apprentice needs personally vs what the firm carries.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters at deep-dive level</ContentEyebrow>

          <ConceptBlock
            title="Non-statutory but commercially mandatory — the framework that decides whether you can keep trading"
            plainEnglish="Sub 2 introduced CPS, JIB and the trade infrastructure as concepts. This Sub goes deeper into how each one actually operates commercially — what scheme membership buys you, what insurance covers, what civil claims look like in practice, and what happens to a firm when its scheme withdraws certification."
            onSite="The order of priority is the reverse of what apprentices often assume. Statutory regs (HASAWA / EAWR) carry criminal sanctions but rarely end a trading firm. The non-statutory framework (CPS / insurance / civil claims) doesn't carry criminal sanctions but routinely DOES end firms. The two systems run in parallel and the commercial one bites harder."
          >
            <p>
              The non-statutory commercial framework has four interlocking pieces:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Competent Person Schemes</strong> — Government-approved bodies that
                let the contractor self-certify Part P notifiable domestic work.
              </li>
              <li>
                <strong>Insurance</strong> — Public Liability (third-party damage), Employers&apos;
                Liability (compulsory), Professional Indemnity (design errors).
              </li>
              <li>
                <strong>JIB grading and the trade infrastructure</strong> — the operative-level
                pay and progression framework, with the JIB card as proof of grade.
              </li>
              <li>
                <strong>Trade body memberships</strong> — ECA in England, SELECT in Scotland —
                voluntary commercial associations providing support, advocacy and standard-form
                contracts.
              </li>
            </ul>
            <p>
              Each piece is voluntary. Each piece is commercially essential for any contractor
              doing serious volume of work. Together they decide whether the firm can keep
              trading — independently of whether anything statutory has been breached.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Competent Person Schemes — the Part P self-cert route</ContentEyebrow>

          <ConceptBlock
            title="How NICEIC, NAPIT and ELECSA actually operate"
            plainEnglish="A CPS is a Government-approved body that assesses electrical contractors against the scheme's technical and commercial criteria. Once registered, the contractor can self-certify Part P notifiable work in dwellings — uploading the cert to the scheme portal, with the scheme notifying Local Authority Building Control on the contractor's behalf."
            onSite="Without CPS membership the contractor's only route to compliance with Part P notifiable categories is to notify LABC BEFORE starting each notifiable job. That means: phone call to the council, fee payment (typically £200–£500 per notification), wait for inspection arrangement, work delayed by days or weeks, customer pays the LABC fee on top of the contractor's bill. CPS self-cert avoids all of that — which is why effectively every domestic-work contractor is on a scheme."
          >
            <p>
              The five-stage CPS lifecycle:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Application</strong> — submit application form, evidence of qualifications
                (Level 3 minimum + 18th Ed for the Qualified Supervisor), evidence of insurance
                cover (PL minimum £2m typically required), evidence of a calibrated test
                instrument set (MFT plus voltage indicator), evidence of business premises and
                paperwork systems, signed scheme rules.
              </li>
              <li>
                <strong>Initial assessment</strong> — scheme assessor visits the contractor&apos;s
                premises and a sample of completed work, checks paperwork, observes test
                procedures, audits a small batch of recent jobs against the scheme&apos;s
                technical standards.
              </li>
              <li>
                <strong>Annual re-assessment</strong> — every 12 months thereafter. Same pattern
                — premises visit, paperwork audit, sample job inspection. Scheme assessor
                produces a written report with any non-conformances flagged.
              </li>
              <li>
                <strong>Self-certification</strong> — for every notifiable job, the contractor
                uploads the cert to the scheme portal within 30 days. Scheme then notifies LABC
                on the contractor&apos;s behalf, and the homeowner receives a Building Reg
                compliance certificate by post.
              </li>
              <li>
                <strong>Non-conformance and escalation</strong> — assessor finds an issue,
                contractor gets a non-conformance notice with a deadline to remediate. Persistent
                or serious issues escalate to formal warning, then suspension, then removal from
                scheme.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="The three main schemes — NICEIC, NAPIT, ELECSA"
            onSite="Functionally equivalent for the regulator. The differences are in fees, assessment style, customer-facing branding, and the handful of niche scopes (e.g. solar PV, EV charging, microgeneration) that some schemes cover and others don't. Most contractors choose based on cost, perceived assessment intensity and which badge resonates with their customer base."
          >
            <p>
              The schemes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NICEIC</strong> — the largest UK scheme, run by Certsure (the Electrical
                Safety Council&apos;s commercial arm). Strong customer-facing brand recognition.
                Multiple registration scopes (Domestic Installer, Approved Contractor, Solar PV,
                EV Charging, etc).
              </li>
              <li>
                <strong>NAPIT</strong> — second-largest scheme, separate organisation. Similar
                scope coverage. Different assessment style and fee structure.
              </li>
              <li>
                <strong>ELECSA</strong> — also run by Certsure, branded separately from NICEIC,
                historically targeted at smaller domestic contractors with a slightly lighter
                assessment touch.
              </li>
            </ul>
            <p>
              Other smaller scheme operators exist (Stroma was a notable one until its scheme
              transferred to NICEIC) but the three above account for the vast majority of
              registrations. Choosing between them is a commercial decision — there&apos;s no
              regulator-driven reason to pick one over another.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations 2010 (England) — Schedule 1, Part P, Requirement P1"
            clause={
              <>
                &quot;Reasonable provision shall be made in the design and installation of
                electrical installations in order to protect persons operating, maintaining or
                altering the installations from fire or injury.&quot;
              </>
            }
            meaning={
              <>
                That single sentence is the statutory basis for everything in this Sub. P1
                doesn&apos;t tell you HOW to make reasonable provision — it points at BS 7671
                (via Approved Document P) as the deemed-to-satisfy route. The notification regime
                that makes CPS membership commercially essential sits separately in regs 12 and
                20 of the Building Regulations 2010, which list the categories of electrical work
                that must be notified to Building Control and the two routes to compliance (CPS
                self-cert or LABC notification before starting). The whole CPS commercial
                framework hangs off this short paragraph plus the regs 12/20 notification rules.
              </>
            }
            cite="Source: The Building Regulations 2010 (SI 2010/2214), Schedule 1, Part P, Requirement P1; supported by Approved Document P (verbatim from legislation.gov.uk)."
          />

          <SectionRule />

          <ContentEyebrow>Insurance — the three lines every working firm carries</ContentEyebrow>

          <ConceptBlock
            title="Public Liability — third-party damage and injury"
            plainEnglish="PL covers the firm against claims from third parties (customers, public, other contractors on site) for property damage or personal injury arising from the firm's activities. Not compulsory under statute, but commercially mandatory — no commercial customer will engage you without it, no scheme will register you without it."
          >
            <p>
              Typical PL policy structure:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Cover limit — typical minimum £2m, more often £5m for routine work, £10m for
                larger commercial. Some tier-1 contracts require £10m as standard.
              </li>
              <li>
                Scope — physical damage to third-party property, personal injury to non-employees,
                consequential losses arising from those.
              </li>
              <li>
                Excess — typical £250–£1,000 per claim; the contractor pays the first slice
                before the policy responds.
              </li>
              <li>
                Conditions — most policies require BS 7671 compliance, scheme membership,
                calibrated test instruments, written RAMS for higher-risk jobs. Breach a condition
                and the insurer can reduce or refuse the claim.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Employers' Liability — compulsory under the 1969 Act"
            plainEnglish="EL covers the firm against claims from its OWN employees (including apprentices) for injury or illness arising from work. Compulsory under the Employers' Liability (Compulsory Insurance) Act 1969 for any firm with employees in Great Britain. Minimum cover £5m. Failure to insure is a criminal offence."
            onSite="The moment your firm hires an apprentice, EL is mandatory by statute. The certificate must be displayed at each place of business — historically a printed certificate on the wall; the 2008 amendment regulations allow electronic display provided employees can readily access it. HSE inspectors check this routinely."
          >
            <p>
              The statutory wording:
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Employers' Liability (Compulsory Insurance) Act 1969 — s.1(1) and s.1(2)"
            clause={
              <>
                <p className="mb-2">
                  <strong>s.1(1)</strong> — &quot;Except as otherwise provided by this Act, every
                  employer carrying on any business in Great Britain shall insure, and maintain
                  insurance, under one or more approved policies with an authorised insurer or
                  insurers against liability for bodily injury or disease sustained by his
                  employees, and arising out of and in the course of their employment in Great
                  Britain in that business.&quot;
                </p>
                <p>
                  <strong>s.1(2)</strong> — &quot;Regulations may provide that the amount for
                  which an employer is required by this Act to insure and maintain insurance
                  shall, either generally or in such cases or classes of case as may be prescribed
                  by the regulations, be limited&hellip;&quot;
                </p>
              </>
            }
            meaning={
              <>
                The 1969 Act is the basis of compulsory EL. The minimum cover (set by the
                Employers&apos; Liability (Compulsory Insurance) Regulations 1998) is £5 million,
                though most policies are written at £10m as standard. The certificate must be
                displayed (paper or electronic) so employees can readily access it. Failure to
                insure is a criminal offence with daily-rate fines up to £2,500 for each day
                uninsured. Failure to display the certificate is a separate (lesser) criminal
                offence. Apprentices count as employees from day one of the contract — meaning
                the moment a firm takes on an apprentice they trigger the EL requirement.
              </>
            }
            cite="Source: Employers' Liability (Compulsory Insurance) Act 1969 (1969 c.57), s.1 — verbatim from legislation.gov.uk."
          />
            <p>
              Key points on EL:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Compulsory floor £5m</strong> — set by the 1969 Act. Most policies are
                written at £10m as standard because the underwriter&apos;s pricing difference is
                marginal and the higher limit gives bigger-claim headroom.
              </li>
              <li>
                <strong>Certificate display</strong> — must be displayed (paper or electronic) so
                employees can readily access it. HSE inspectors check this.
              </li>
              <li>
                <strong>Failure to insure</strong> — criminal offence with daily-rate fines (up
                to £2,500 per uninsured day) under the 1969 Act. Failure to display = separate
                criminal offence (lesser fine).
              </li>
              <li>
                <strong>Apprentices and EL</strong> — apprentices are employees from day one of
                the contract and trigger the EL requirement. The college component of the
                apprenticeship doesn&apos;t change this.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Professional Indemnity — design and advice errors"
            plainEnglish="PI covers the firm against claims arising from errors, omissions or negligent advice in their professional capacity — design, specification, recommendation. Not the same as PL: PL covers physical damage / injury from work; PI covers economic loss from bad advice or design. Increasingly relevant as installers move into design-and-build territory."
            onSite="A contractor who only does install-to-spec work (someone else's design) can sometimes operate on PL + EL alone. A contractor who does design-and-build, EV charging design, solar PV design or prosumer's installations under BS 7671 Part 8 needs PI too. Many CPS schemes and trade bodies (ECA) increasingly require PI as a condition of membership for design-active firms."
          >
            <p>
              PI policies typically cover:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Errors in design or specification (e.g. mis-sized cable selected at design stage,
                wrong protective device specified for the prospective fault current).
              </li>
              <li>
                Negligent advice given to the customer (e.g. misleading recommendation on
                upgrade scope, wrong assessment of an existing installation).
              </li>
              <li>
                Defective documentation (e.g. inadequate handover pack causing the customer
                consequential loss when they can&apos;t maintain the install).
              </li>
            </ul>
            <p>
              PI is &apos;claims-made&apos; rather than &apos;occurrence-based&apos; in most
              policies — meaning the claim has to be made during the policy period, even if the
              error occurred years earlier. Contractors leaving design work need to maintain
              run-off cover to deal with claims that surface after they&apos;ve stopped trading.
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

          <ContentEyebrow>Civil claims — contract and tort</ContentEyebrow>

          <ConceptBlock
            title="Two parallel routes a customer can take"
            plainEnglish="When a customer sues an electrical contractor for damage / injury / financial loss caused by the contractor's work, the claim almost always pleads both routes: breach of contract AND tort of negligence. Both can succeed independently. The contractor's PL insurer handles the defence under whichever route applies."
          >
            <p>
              The two routes:
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Consumer Rights Act 2015 — section 49 (services performed with reasonable care and skill)"
            clause={
              <>
                &quot;Every contract to supply a service is to be treated as including a term that
                the trader must perform the service with reasonable care and skill.&quot;
              </>
            }
            meaning={
              <>
                The contractual hook for any claim by a consumer customer (private individual,
                not a business). Replaced the equivalent term in the Supply of Goods and Services
                Act 1982 for consumer contracts. &apos;Reasonable care and skill&apos; is judged
                against what a competent electrician in the trade would have done — which in
                practice means BS 7671 compliance + IET GN standards + scheme paperwork. Fall
                short and the contractor is in breach of the implied term, with the customer
                entitled to repeat performance, price reduction or damages.
              </>
            }
            cite="Source: Consumer Rights Act 2015 (c.15), Part 1, Chapter 4, s.49 — verbatim from legislation.gov.uk."
          />

          <ConceptBlock
            title="The tort of negligence — the parallel common-law route"
            onSite="Negligence is the route most often pleaded after physical damage (fire / water damage) or personal injury, because contract claims can sometimes be limited by exclusion clauses while tort claims for property damage and personal injury usually can't be excluded by contract terms (Unfair Contract Terms Act 1977 / Consumer Rights Act 2015 limits)."
          >
            <p>
              The four-step negligence test the court applies:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Duty of care</strong> — does the contractor owe a duty of care to the
                claimant? For a customer-claimant the answer is yes by default; for a third-party
                claimant (a neighbour, a subsequent occupier) the answer is usually yes if the
                damage was reasonably foreseeable.
              </li>
              <li>
                <strong>Breach</strong> — did the contractor fall below the standard of a
                reasonably competent electrician? BS 7671 compliance is the standard the court
                applies.
              </li>
              <li>
                <strong>Causation</strong> — did the breach actually cause the damage / injury?
                Often the most contested element — was it the install or some other factor (a
                manufacturing defect, an act of the customer, weather)?
              </li>
              <li>
                <strong>Loss</strong> — what is the actual financial loss? Repair costs,
                consequential losses (alternative accommodation, loss of business income),
                personal injury damages.
              </li>
            </ol>
            <p>
              All four steps have to be satisfied for the claim to succeed. The contractor&apos;s
              defence team (funded by the PL insurer) typically attacks &apos;breach&apos; and
              &apos;causation&apos; as the strongest defensive ground — and the documentary
              evidence base (EIC, EICR, calibration records, RAMS, scheme paperwork) is what
              supports both attacks.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Scheme withdrawal — the commercial consequences</ContentEyebrow>

          <ConceptBlock
            title="What actually happens when a scheme suspends or removes a contractor"
            plainEnglish="Scheme suspension or removal isn't a criminal sanction. It's the loss of a contractual licence. But the cascade of commercial consequences can end the trading firm just as effectively as a criminal conviction would."
          >
            <p>
              The commercial cascade after scheme suspension:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Loss of Part P self-certification authority</strong> — every notifiable
                job from that day forward needs LABC notification before starting, with the
                associated fee and delay.
              </li>
              <li>
                <strong>Insurance cancellation or non-renewal</strong> — most PL insurers require
                scheme membership as a condition of cover for electrical contractors. Suspension
                triggers the insurer&apos;s right to cancel or refuse renewal.
              </li>
              <li>
                <strong>Brand asset withdrawal</strong> — scheme logo on van / website / quotes
                must be removed immediately. Continued use after suspension is fraud (using the
                badge to imply a status you no longer hold).
              </li>
              <li>
                <strong>Removal from approved-supplier lists</strong> — tier-1 contractors,
                housing associations, councils and many commercial customers maintain
                CPS-registered-only supplier lists. Suspension triggers automatic removal.
              </li>
              <li>
                <strong>Customer-facing reputation damage</strong> — many CPS schemes publish
                lists of suspended / removed members. Search-engine results and customer review
                sites pick this up.
              </li>
            </ul>
            <p>
              The scheme&apos;s appeals process is the realistic remedy. Every CPS publishes a
              complaints / appeals procedure that members must exhaust before any external
              challenge. Decisions are typically reviewed by an independent panel within the
              scheme. The pragmatic path after suspension is remediate + re-apply, not litigate.
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

          <ContentEyebrow>JIB grading and the trade infrastructure</ContentEyebrow>

          <ConceptBlock
            title="The operative-level pay and progression framework"
            plainEnglish="The Joint Industry Board for the Electrical Contracting Industry (JIB) is the joint employer/union body that sets pay, conditions and grading for the contracting industry in England, Wales and Northern Ireland. SELECT plays a similar role in Scotland (with the SJIB national working rules)."
            onSite="Most large commercial / industrial sites are JIB-only — no current JIB card at the right grade, no entry. The card carries your grade and is the proof of your status on a JIB-affiliated job. Pay is set by your grade × hours × the JIB hourly rate published in the National Working Rules each year."
          >
            <p>
              The JIB grading ladder you&apos;ll move through:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Adult Trainee / Labourer</strong> — entry route for those without
                qualifications.
              </li>
              <li>
                <strong>Apprentice</strong> — graded by year of apprenticeship (Year 1, 2, 3,
                4 typically). The card tracks your progression through the standard.
              </li>
              <li>
                <strong>Electrician</strong> — fully qualified (Level 3 + AM2/E + 18th Edition
                certification + completed apprenticeship).
              </li>
              <li>
                <strong>Approved Electrician</strong> — Electrician + additional experience and
                competence demonstration through the JIB&apos;s assessment route. Higher pay
                grade, broader scope of unsupervised work.
              </li>
              <li>
                <strong>Technician</strong> — top working grade on the JIB ladder. Additional
                design, fault-finding and supervisory competence demonstrated. Highest hourly
                rate.
              </li>
            </ul>
            <p>
              Beyond grading, the JIB Health &amp; Safety Handbook is the practical site-safety
              reference for JIB jobs, and the JIB National Working Rules cover pay, holidays,
              travel allowances, lodging allowances and the procedural framework for disputes
              and grievances.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="ECA (England) and SELECT (Scotland) — the trade bodies"
            onSite="ECA = trade body for England, Wales and Northern Ireland. SELECT = the equivalent for Scotland (and SELECT also operates a recognised competent person scheme route within the Scottish regulatory framework). Both are voluntary commercial membership organisations — different from CPS (which is a Government-approved scheme) and different from JIB (which is the joint employer/union body)."
          >
            <p>
              What trade body membership actually buys you:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Technical, commercial and legal helpline support.
              </li>
              <li>
                Standard-form contracts (e.g. ECA standard sub-contract forms) that members can
                use as templates instead of drafting from scratch.
              </li>
              <li>
                Lobbying and policy representation with Government and standards bodies.
              </li>
              <li>
                Training resources, CPD events and technical updates on amendments to standards.
              </li>
              <li>
                Customer-facing brand for marketing — &apos;ECA member&apos; / &apos;SELECT
                member&apos; carries some weight with informed customers.
              </li>
            </ul>
            <p>
              Trade body membership is voluntary, doesn&apos;t replace CPS or insurance, but
              gives the contractor a support network that makes the commercial framework easier
              to operate. Apprentices don&apos;t need ECA / SELECT membership personally —
              that&apos;s a contractor-level relationship.
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

          <ContentEyebrow>The apprentice angle — what you need vs what your firm needs</ContentEyebrow>

          <ConceptBlock
            title="Two different layers of credentialing"
            plainEnglish="The firm carries the contractor-level credentials (CPS scheme registration, PL/EL/PI insurance, ECA membership, JIB affiliation). You as an apprentice carry the operative-level credentials (JIB card with apprenticeship grade, ECS card for site access, college enrolment record). Don't confuse the two."
            onSite="A common point of confusion early in the apprenticeship: 'do I need NICEIC?' — no, the scheme registers the firm. 'Do I need my own PL insurance?' — no, you're covered under the firm's policy as long as you're acting within scope. 'Do I need EL?' — your firm needs EL to cover YOU; you don't need to buy it personally. 'Do I need a JIB card?' — yes, this is YOUR personal credential."
          >
            <p>
              The credential split:
            </p>
            <div className="overflow-x-auto -mx-1 my-2">
              <table className="w-full text-[13px] text-white/90 border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.1]">
                    <th className="text-left p-2 font-semibold text-white/70">Credential</th>
                    <th className="text-left p-2 font-semibold text-white/70">Held by</th>
                    <th className="text-left p-2 font-semibold text-white/70">Apprentice needs personally?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  <tr>
                    <td className="p-2">CPS registration (NICEIC / NAPIT / ELECSA)</td>
                    <td className="p-2">Firm</td>
                    <td className="p-2">No</td>
                  </tr>
                  <tr>
                    <td className="p-2">Public Liability insurance</td>
                    <td className="p-2">Firm</td>
                    <td className="p-2">No (covered under firm&apos;s policy)</td>
                  </tr>
                  <tr>
                    <td className="p-2">Employers&apos; Liability insurance</td>
                    <td className="p-2">Firm (statutory duty)</td>
                    <td className="p-2">No — firm holds it to cover you</td>
                  </tr>
                  <tr>
                    <td className="p-2">Professional Indemnity</td>
                    <td className="p-2">Firm (if design-active)</td>
                    <td className="p-2">No</td>
                  </tr>
                  <tr>
                    <td className="p-2">JIB card (apprentice grade)</td>
                    <td className="p-2">Operative (you)</td>
                    <td className="p-2">YES — your personal credential</td>
                  </tr>
                  <tr>
                    <td className="p-2">ECS card (site access)</td>
                    <td className="p-2">Operative (you)</td>
                    <td className="p-2">YES — required for most major sites</td>
                  </tr>
                  <tr>
                    <td className="p-2">College enrolment / progression record</td>
                    <td className="p-2">Operative (you)</td>
                    <td className="p-2">YES — your apprenticeship record</td>
                  </tr>
                  <tr>
                    <td className="p-2">ECA / SELECT trade body membership</td>
                    <td className="p-2">Firm</td>
                    <td className="p-2">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              After qualification, if you stay employed, the same split continues. If you go
              self-employed, you become &apos;the firm&apos; in your own right and have to take
              on the contractor-level credentials yourself: scheme registration if you do
              notifiable work, PL insurance, EL if you ever hire anyone, PI if you take design
              responsibility.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Assuming the firm's PL insurance covers everything you do"
            whatHappens={
              <>
                Apprentice does a small &apos;foreigner&apos; (cash-in-hand side job) for a
                friend over a weekend — installs a couple of sockets in a garage. The work is
                competent. Three months later, a fault in the install causes a fire and
                significant property damage. The apprentice claims under the firm&apos;s PL
                policy. Insurer refuses — the work was outside the scope of the apprentice&apos;s
                employment, wasn&apos;t authorised by the firm, wasn&apos;t covered by any
                relevant insurance. Apprentice is personally exposed to the civil claim with no
                insurance backing.
              </>
            }
            doInstead={
              <>
                Don&apos;t do unauthorised side work during apprenticeship. The firm&apos;s PL
                only covers work done in the course of employment for the firm. Side work needs
                its own insurance arrangement, which is rarely commercially viable for an
                apprentice. The personal exposure on a serious incident is unbounded — there&apos;s
                no insurance, no scheme defence, no firm to absorb the claim.
              </>
            }
          />

          <CommonMistake
            title="Confusing the JIB card with a CPS scheme registration"
            whatHappens={
              <>
                Apprentice in their final year sees the JIB card as &apos;the same thing&apos; as
                NICEIC registration and assumes that holding the card means they&apos;re licensed
                to self-cert Part P notifiable work. They aren&apos;t. JIB grades the operative;
                CPS registers the contractor (the firm). Self-certifying notifiable work without
                the firm being on a scheme is unlawful (Building Regs breach) regardless of how
                competent the operative is.
              </>
            }
            doInstead={
              <>
                Keep the two layers straight in your head. The card is YOUR grade; the scheme is
                the FIRM&apos;s licence. After qualification, if you go self-employed, you become
                the firm and have to take scheme registration in your own name to self-cert
                notifiable work. Until then it&apos;s your firm&apos;s scheme that authorises
                self-cert, and you sign certificates as an operative under that registration.
              </>
            }
          />

          <Scenario
            title="Scheme assessment finds persistent calibration gaps and triggers escalation"
            situation={
              <>
                Your firm&apos;s annual NICEIC re-assessment is in two weeks. The Qualified
                Supervisor (the senior electrician designated for scheme purposes) realises that
                the firm&apos;s MFTs have lapsed calibration by 4 months. This was raised on the
                previous assessment as a non-conformance with a 30-day remediation window. The
                non-conformance was closed at the time, but the calibration cycle has slipped
                again. The supervisor knows that &apos;persistent failure&apos; is grounds for
                escalation to formal warning, then suspension.
              </>
            }
            whatToDo={
              <>
                Get the calibration done before the assessment. Document the failure-mode
                (whatever caused the slip — change of supplier, missed reminder, staff turnover)
                and put a corrective system in place (calibration calendar, named person
                responsible, automated reminders). Bring the corrective action to the assessment
                voluntarily — assessors react better to a self-reported issue with a documented
                fix than to a recurrence they have to find. The firm&apos;s commercial position
                depends on the assessment outcome — losing scheme membership would cascade into
                insurance loss, brand-asset withdrawal, supplier-list removal, and potentially
                the end of the firm.
              </>
            }
            whyItMatters={
              <>
                Scheme membership is the contractor&apos;s most valuable non-statutory asset.
                Losing it for an avoidable reason like calibration drift is a textbook commercial
                self-harm. The systems that prevent it (calibration cycle, named QS responsible,
                paperwork audit before each assessment) are part of the &apos;safe systems of
                work&apos; obligation under HASAWA s.2(2)(a) AND the scheme&apos;s contractual
                obligations on the contractor. Both layers point in the same direction: get the
                paperwork right BEFORE the assessor knocks.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "A Competent Person Scheme (NICEIC / NAPIT / ELECSA) registers the firm as a self-certifier for Part P notifiable domestic work. Without it, every notifiable job needs LABC notification, fees and weeks of delay.",
              "Three insurance lines run together — Public Liability (third-party), Employers' Liability (compulsory under the 1969 Act, minimum £5m, criminal offence not to insure), Professional Indemnity (design / advice errors).",
              "Civil claims after an incident plead both contract (Consumer Rights Act 2015 s.49 — reasonable care and skill) and the tort of negligence (duty / breach / causation / loss). The non-statutory paperwork (BS 7671 + EIC + scheme records) is the documentary defence.",
              "Scheme suspension triggers a cascade — loss of Part P self-certification, likely insurance cancellation, brand-asset withdrawal, removal from approved-supplier lists. Often ends the trading firm even though no statute has been breached.",
              "JIB grading is operative-level — Apprentice → Electrician → Approved Electrician → Technician. Sets pay rates and unsupervised work scope on JIB-affiliated sites. Different from CPS (contractor-level) and from ECA / SELECT (trade bodies).",
              "ECA (England/Wales/NI) and SELECT (Scotland) are voluntary trade body memberships. They provide commercial / technical / legal support, standard-form contracts and lobbying — different from CPS and JIB.",
              "Apprentice carries personal credentials — JIB card (your grade), ECS card (site access), college enrolment record. Firm carries contractor-level credentials — CPS, PL/EL/PI insurance, trade body membership. Don't confuse the two layers.",
              "Don't do unauthorised side work during apprenticeship — the firm's PL policy doesn't cover work done outside the scope of employment, and the personal civil exposure on a serious incident is unbounded.",
            ]}
          />

          <Quiz title="CPS, insurance and civil — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section1/1-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.5 BS 7671 deep dive
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section2/2-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2 — Technical information and drawings
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
