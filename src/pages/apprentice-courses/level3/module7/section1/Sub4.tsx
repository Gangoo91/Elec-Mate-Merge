/**
 * Module 7 · Section 1 · Subsection 4 — Scheme membership economics
 * Maps to C&G 2365-03 / Unit 308 / LO1 — supplementary depth
 *   Extends LO1 with apprentice-relevant career pathway material on the
 *   commercial side of CPS scheme membership.
 *
 * NICEIC vs NAPIT vs ELECSA vs ECA vs SELECT — costs, audit cycle, what
 * each unlocks, choosing between them when you set up your own firm or
 * when comparing employers. The economics behind the schemes — application
 * fees, annual subscriptions, audit fees, why a one-person band might pick
 * NAPIT over NICEIC, and what each scheme actually delivers for the money.
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

const TITLE = 'Scheme membership economics | Level 3 Module 7.1.4 | Elec-Mate';
const DESCRIPTION =
  'NICEIC vs NAPIT vs ELECSA vs ECA vs SELECT — application fees, annual subscriptions, audit cycle, what each scheme unlocks, and how to choose when setting up a firm or comparing employers.';

const checks = [
  {
    id: 'mod7-s1-sub4-cps-vs-trade',
    question:
      "What's the difference between a competent-person scheme (NICEIC, NAPIT, ELECSA) and a trade association (ECA, SELECT)?",
    options: [
      "There's no difference.",
      "Competent-person schemes (CPS) are Government-authorised audit bodies that allow registered contractors to self-certify Building Regulations Part P notifiable work in dwellings. Trade associations are member bodies that lobby for the industry, run technical events, publish guidance and (in the case of ECA and SELECT) co-run the JIB / SJIB. A firm typically belongs to both — one CPS for self-certification, one trade association for representation.",
      "Trade associations issue ECS cards.",
      "Schemes only cover Scotland.",
    ],
    correctIndex: 1,
    explanation:
      "Two distinct functions. CPS = self-certification authority (regulatory). Trade association = member representation (industry voice). NICEIC, NAPIT, ELECSA and STROMA are the main UK electrical CPS schemes (Certsure is the operating company behind NICEIC and ELECSA, not a separate scheme). ECA, SELECT are trade associations. Confusion arises because some firms market 'NICEIC-approved' as a quality mark, when really it's a regulatory authorisation. Both have value; they're different things.",
  },
  {
    id: 'mod7-s1-sub4-costs',
    question:
      "Roughly what does it cost a one-person electrical firm to register with NICEIC or NAPIT for the first year?",
    options: [
      "Free.",
      "Typical first-year cost is £700-1,200 covering application fee, annual subscription, the initial assessment visit (where the assessor visits and reviews your QS, your records and a sample of recent work), plus the cost of the QS qualification (2391-52 typically £1,200-1,800 if you don't already hold it). Year 2+ total ongoing cost is typically £700-1,500/year once subscription, assessment, insurance and calibration are stacked together — the exact range depends on which CPS and which bolt-ons.",
      "£10,000.",
      "£50.",
    ],
    correctIndex: 1,
    explanation:
      "Scheme registration is a meaningful business cost — but it's the gateway to Part P self-certification, which removes the need to pay LABC for every notifiable job. For a busy domestic installer the cost pays back many times over per year because each LABC notification would otherwise cost £150-300 per job. NAPIT and NICEIC are roughly comparable on cost; ELECSA (also Certsure-operated) is broadly similar. Always factor in the QS qualification cost if you don't already hold 2391-52.",
  },
  {
    id: 'mod7-s1-sub4-audit',
    question:
      "What happens during an annual scheme assessment visit?",
    options: [
      "Nothing — they just take your money.",
      "An accredited assessor (employed or contracted by NICEIC / NAPIT etc.) visits your premises annually. They review your QS qualification (must be current and someone in the firm must hold it), inspect a sample of recent jobs (typically 1-2 jobs visited and certificates reviewed), check your test equipment is calibrated, review your insurance, and audit your record-keeping. Pass = scheme registration continues; fail = re-visit required and registration may be suspended.",
      "Only test your tools.",
      "Just collect membership fees.",
    ],
    correctIndex: 1,
    explanation:
      "Annual assessment is the substance behind the scheme. The assessor looks at your QS, your work, your records, your insurance and your test equipment calibration. Most firms pass first time but the visit isn't a rubber stamp — assessors flag genuinely unsafe work and require remediation. The assessment is also how the scheme verifies you're still operating to the competence standard you were originally registered against.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Who needs to hold the QS (Qualified Supervisor) qualification in a CPS-registered firm?",
    options: [
      "Nobody.",
      "At least one person in the firm must hold a QS qualification (typically C&G 2391-52 Inspection and Testing, or equivalent) and that person is named on the scheme registration as the firm's QS. The QS doesn't have to do every job personally but is responsible for the standard of work and for signing off certification. For a sole trader the QS is normally the sole trader themselves.",
      "Everyone in the firm.",
      "Only the receptionist.",
    ],
    correctAnswer: 1,
    explanation:
      "QS is the human anchor of scheme registration. Without a named QS the firm can't be registered — and if the QS leaves the firm, the registration lapses unless a replacement QS is named within a set period. For sole traders this means the proprietor must hold 2391-52 themselves; for larger firms it can be a named manager. Plan QS qualification well ahead of scheme registration.",
  },
  {
    id: 2,
    question: "What's the practical advantage of CPS Part P self-certification over LABC notification?",
    options: [
      "No advantage.",
      "CPS-registered firms can self-certify notifiable Part P work and issue compliance certificates direct to the Local Authority on the homeowner's behalf. The LABC route requires a Building Notice or Building Regulations application before work starts, plus an LABC inspection during/after work — typically £150-300 per job and several weeks of LABC scheduling delay. Self-certification removes the cost and the delay.",
      "Only legal route.",
      "Just for marketing.",
    ],
    correctAnswer: 1,
    explanation:
      "Self-certification is the practical reason most domestic-focused electrical firms join a CPS. The cost and delay of LABC for every consumer-unit replacement, every full rewire, every kitchen extension circuit would make domestic work uneconomic at scale. CPS membership turns each notifiable job into a self-certified job that's compliant and cheaper.",
  },
  {
    id: 3,
    question: "What's NICEIC's 'Approved Contractor' versus 'Domestic Installer' stream?",
    options: [
      "Same thing.",
      "Two NICEIC streams. Domestic Installer (DI) is the entry tier — covers Part P self-certification for dwellings only. Approved Contractor (AC) is the higher tier — covers wider scope including commercial and industrial work, generally with stricter assessment criteria. Many sole traders start with DI and upgrade to AC as the business grows or as they take on more commercial work.",
      "Only Approved exists.",
      "Only DI exists.",
    ],
    correctAnswer: 1,
    explanation:
      "DI vs AC reflects the firm's scope. A pure domestic installer (consumer units, rewires, EV chargers) usually only needs DI. A firm doing commercial fit-out alongside domestic typically needs AC. Both let you self-certify Part P; AC lets you also evidence wider competence to commercial clients. Cost difference is modest — choose based on the work you actually do.",
  },
  {
    id: 4,
    question: "What's NAPIT's main differentiator from NICEIC?",
    options: [
      "It's cheaper for everyone.",
      "NAPIT is multi-trade — registers electricians, plumbers, gas engineers and other trades under a single scheme structure. For multi-discipline firms (e.g. a heating engineer doing gas plus electrical wiring) NAPIT offers single-scheme coverage rather than dual scheme membership. Cost is broadly comparable to NICEIC for electrical-only registration; the saving comes if you also need other trade registrations.",
      "Only operates in Scotland.",
      "Only does commercial.",
    ],
    correctAnswer: 1,
    explanation:
      "NAPIT positions itself as the multi-trade scheme. For a sole trader doing only electrical the choice between NICEIC and NAPIT is largely about service preferences (assessor relationship, online portals, reputation in your local market). For multi-trade firms NAPIT often wins on cost and admin overhead because it covers everything in one membership.",
  },
  {
    id: 5,
    question: "What's the ECA and what does ECA membership give an electrical firm?",
    options: [
      "ECA is the same as NICEIC.",
      "The Electrical Contractors' Association — the largest trade association for electrical contractors in England, Wales and Northern Ireland. Membership signals quality, access to ECA technical guidance, ECA insurance products, ECA Apprentice scheme (for member firms taking on apprentices), and joint co-running of the JIB. ECA is not a CPS — you still need separate CPS membership for Part P self-certification.",
      "Only does Scotland.",
      "Only for sole traders.",
    ],
    correctAnswer: 1,
    explanation:
      "ECA is the trade-association layer above CPS. Many established firms hold both — CPS (NICEIC/NAPIT) for self-certification, ECA for industry voice, technical resources and co-running JIB. ECA membership is a meaningful quality mark for commercial clients and is sometimes a tender pre-requisite on commercial work.",
  },
  {
    id: 6,
    question: "What's SELECT in Scotland?",
    options: [
      "A football team.",
      "SELECT is the Scottish trade association for electrical contractors — equivalent to ECA in England/Wales/NI. It campaigns on behalf of the Scottish electrical industry, runs technical events, and co-runs the SJIB. SELECT also operates a Member Approved scheme that signals quality to clients. Scottish firms typically hold SELECT membership plus a CPS (NICEIC, NAPIT or similar) for Part P self-certification.",
      "Only does plumbing.",
      "Only operates in England.",
    ],
    correctAnswer: 1,
    explanation:
      "SELECT is the Scottish equivalent of ECA. Scottish firms operating north of the border join SELECT for representation and the SELECT Member Approved scheme; CPS membership stays as the regulatory layer. The two together cover the same ground that ECA + CPS cover in England.",
  },
  {
    id: 7,
    question: "Roughly what does the LABC charge per Part P notifiable job if you DON'T have CPS membership?",
    options: [
      "Free.",
      "£150-300 per notifiable job — varies by Local Authority. Each notifiable Part P job (consumer unit replacement, new circuit in kitchen/bathroom, full rewire) requires either a Building Notice or full Building Regulations application before work, plus an LABC inspection during/after. Cost adds up fast for a busy domestic installer; CPS membership pays for itself in a handful of jobs.",
      "£10 flat fee.",
      "£10,000.",
    ],
    correctAnswer: 1,
    explanation:
      "LABC Building Notice fees vary widely by Council — typically £150-300 per notifiable electrical job. For a busy domestic installer doing 50+ notifiable jobs a year that's £7,500-15,000 in LABC fees that simply disappear with CPS membership. The CPS economic case is overwhelming for any firm doing meaningful domestic work.",
  },
  {
    id: 8,
    question: "If you change your firm's QS, what do you have to do?",
    options: [
      "Nothing.",
      "Notify the CPS within the timeframe specified in the scheme rules (typically 28 days). The new QS must hold a current QS qualification (2391-52 or equivalent) and must be available to the firm. Failure to notify, or failure to maintain a QS, can result in scheme registration suspension. CPS rules expect continuous QS coverage — the firm shouldn't operate notifiable work without one.",
      "Wait for the next annual assessment.",
      "Tell only HMRC.",
    ],
    correctAnswer: 1,
    explanation:
      "QS continuity is a scheme rule. If your QS leaves and you don't immediately replace them, your registration is at risk. For sole traders the QS is normally the proprietor — but if the proprietor's qualification lapses (CPD requirements not met) the same issue arises. Plan QS coverage with the same care as plant calibration or insurance renewal.",
  },
];

const faqs = [
  {
    question: "Do I need a CPS to work as an electrician?",
    answer:
      "Not as an employee — your employer's CPS covers the firm's certification. Only if you set up your own firm (sole trader or Ltd) and intend to do notifiable Part P work in dwellings without paying LABC for every job. CPS membership is the practical economic gateway to running a domestic-focused electrical firm.",
  },
  {
    question: "Can I be a member of more than one CPS at once?",
    answer:
      "You could in theory but there's no practical reason to — multiple memberships duplicate cost without adding capability. Pick the scheme that fits your firm best (NICEIC for traditional electrical-only, NAPIT for multi-trade, ELECSA as an alternative to NICEIC). Switching is normally easy at annual renewal.",
  },
  {
    question: "Is NICEIC 'better' than NAPIT?",
    answer:
      "Neither is objectively better. NICEIC is older and more widely recognised by lay consumers (the 'NICEIC tick' is a household quality mark in some markets). NAPIT is multi-trade and often slightly cheaper for electrical-only registration. For a one-person band the choice often comes down to local assessor relationship, market reputation in your area, and personal preference. Both deliver Part P self-certification equally.",
  },
  {
    question: "What's the 'Trustmark' that some firms display?",
    answer:
      "TrustMark is the Government-endorsed quality scheme for tradespeople working in and around the home, covering all trades (not just electrical). Many CPS-registered electrical firms also hold TrustMark for additional consumer reassurance. TrustMark is operated separately from the CPS schemes but shares some assessment overlaps.",
  },
  {
    question: "What if I want to work commercial only — do I still need a CPS?",
    answer:
      "Strictly no — Part P only covers dwellings. Pure commercial work is governed by Building Regulations Part B (fire), Part L (energy) and the BS 7671 Wiring Regulations applied through the contract, not by Part P self-certification. But many commercial clients still ask for CPS evidence as a quality proxy, and most firms hold a CPS even if commercial-focused. The bigger commercial quality marks tend to be ECA membership and ISO 9001.",
  },
  {
    question: "What happens if I fail an annual scheme assessment?",
    answer:
      "Most assessors flag minor issues for fixing rather than outright failing — they want the scheme to grow, not to lose members. Common issues: out-of-date test equipment calibration, missing certificates on a sample job, paperwork gaps. The assessor typically gives a defined period to fix and returns to verify. Outright failure (gross competence concerns, fraudulent certificates) leads to suspension and possible expulsion. Take assessment visits seriously and prepare in advance.",
  },
];

export default function Sub4() {
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
            eyebrow="Module 7 · Section 1 · Subsection 4"
            title="Scheme membership economics"
            description="NICEIC vs NAPIT vs ELECSA vs ECA vs SELECT — costs, audit cycle, what each scheme unlocks, and how to choose when setting up your own firm or comparing employers."
            tone="emerald"
          />

          <TLDR
            points={[
              "Two different things: competent-person schemes (NICEIC, NAPIT, ELECSA, STROMA) authorise Part P self-certification in dwellings; trade associations (ECA, SELECT) represent the industry and co-run the JIB / SJIB. Certsure is the operating company behind NICEIC and ELECSA — not a separate fifth scheme.",
              "First-year CPS cost typically £700-1,200 for the scheme entry (application + subscription + first assessment), plus QS qualification (£1,200-1,800) if not already held, plus insurance + calibration. Year 2+ ongoing total typically £700-1,500/year — the exact range depends on which CPS, which streams, and what insurance / calibration bolt-ons you carry.",
              "CPS pays back fast for domestic work — LABC notification is £150-300 per notifiable job, so 5-10 jobs a year covers the CPS membership.",
              "Annual assessment is substantive — assessor reviews QS, sample jobs, calibration, insurance, records. Treat it as a serious compliance event, not a rubber stamp.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO1 with apprentice-relevant career pathway material on running an electrical firm.",
              "Distinguish between competent-person schemes (regulatory) and trade associations (representational) — what each delivers.",
              "Identify the main UK competent-person schemes (NICEIC, NAPIT, ELECSA, STROMA) and their headline differences. Note that Certsure is the operating company behind NICEIC and ELECSA, not a separate scheme.",
              "State the typical annual cost of CPS membership and explain the economic case for membership against the LABC notification alternative.",
              "Identify the role of the QS (Qualified Supervisor) in CPS-registered firms and the consequences of QS coverage lapsing.",
              "Identify the role of trade associations (ECA, SELECT) in industry representation and JIB / SJIB co-management.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Two layers — schemes and associations</ContentEyebrow>

          <ConceptBlock
            title="Competent-person schemes vs trade associations — different jobs"
            plainEnglish="Competent-person schemes (CPS) are private-sector audit bodies authorised by Government to verify that registered contractors continue to meet competence standards needed to self-certify Building Regulations Part P notifiable work in dwellings. Trade associations are member bodies that lobby for the industry, run technical events, publish guidance, and co-run the collective bargaining bodies (JIB / SJIB). Most established firms belong to both: a CPS for self-certification authority, plus a trade association for industry voice and resources."
            onSite="As an apprentice your firm's CPS is what allows the firm to do notifiable Part P work without paying LABC for every job. Your firm's trade association membership is the badge it carries on its letterhead and on tender documents. Both matter. Knowing which scheme is which helps you read the firm's positioning and (later) make sense of options when you set up on your own."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Competent-person schemes (regulatory)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  NICEIC, NAPIT, ELECSA, STROMA. Authorised by Government to allow
                  registered contractors to self-certify Part P notifiable electrical work in
                  dwellings. Annual assessment, QS-required, public-register listed. Certsure
                  is the operating company behind NICEIC and ELECSA &mdash; not a separate
                  scheme.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Trade associations (representational)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  ECA (England/Wales/NI), SELECT (Scotland). Lobby for the industry, run
                  technical events, publish guidance, co-run JIB / SJIB with Unite. Member
                  firms display logo as quality signal.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The main UK CPS — NICEIC, NAPIT, ELECSA, STROMA</ContentEyebrow>

          <ConceptBlock
            title="The CPS landscape — broadly comparable, with differences in flavour"
            plainEnglish="The main UK electrical Part P competent-person schemes are NICEIC, ELECSA, NAPIT and STROMA. NICEIC and ELECSA are both operated by the same company, Certsure (Certsure is the operating body, not a separate fifth scheme). NAPIT is multi-trade; STROMA covers multiple compliance disciplines including environmental. Functionally they all do the same job — annual assessment, QS-required, Part P self-certification authority. Differences are in flavour: NICEIC is the oldest and most widely recognised by lay consumers; NAPIT positions itself for multi-trade firms; ELECSA is a NICEIC sister scheme (also Certsure-operated) often used by smaller installers."
            onSite="For a one-person electrical firm the choice often comes down to local assessor relationship, market reputation in your area, and personal preference. Cost and capability are broadly equivalent. For multi-trade firms NAPIT typically wins on admin overhead. Switch costs are modest — most firms don't switch once registered, but you can if needed."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  NICEIC
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Oldest and largest CPS. Approved Contractor (AC) and Domestic Installer
                  (DI) streams. Operated by Certsure. The household-name &quot;NICEIC
                  tick&quot; is a meaningful quality signal in the consumer market.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  NAPIT
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  National Association of Professional Inspectors and Testers. Multi-trade
                  scheme covering electrical, plumbing, heating, gas. Often the choice for
                  multi-discipline firms.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  ELECSA
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Electrical-focused scheme operated by Certsure (NICEIC&apos;s parent). Often
                  positioned for smaller installers, slightly cheaper than NICEIC AC,
                  similar regulatory authority.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  STROMA
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Multi-discipline certification body. Covers electrical alongside other
                  building compliance areas (energy assessment, retrofit). Often chosen
                  by firms with environmental specialisms.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The economics — what it costs and what it saves</ContentEyebrow>

          <ConceptBlock
            title="First-year cost vs annual ongoing — the membership bill"
            plainEnglish="First-year CPS cost is typically £700-1,200 covering application fee, annual subscription, the initial assessment visit, and (if you don't already hold it) the QS qualification (C&G 2391-52 typically £1,200-1,800). The scheme-only ongoing cost (subscription + annual assessment) sits around £400-800; once you stack the bolted-on insurance (PL £5-10m typically £200-500/year, EL if you have employees, PI if you do design — £300-800/year) and test-equipment calibration (~£100-180/year), the realistic Year 2+ total ongoing cost is £700-1,500/year. The range depends on which CPS, which streams and what insurance you carry."
            onSite="The headline membership cost looks meaningful for a sole trader but the comparison is against the LABC notification alternative — typically £150-300 per notifiable job. A busy domestic installer doing 30-50 notifiable jobs a year would face £4,500-15,000 in LABC fees without CPS membership. CPS pays for itself many times over within months for any meaningful domestic workload."
          >
            <p>
              Typical year-1 cost breakdown for a sole-trader electrical firm joining a CPS:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>QS qualification</strong> &mdash; 2391-52 (or equivalent) typically
                &pound;1,200-1,800 if not already held. One-off cost.
              </li>
              <li>
                <strong>CPS application fee</strong> &mdash; typically &pound;100-200.
              </li>
              <li>
                <strong>CPS annual subscription</strong> &mdash; typically &pound;200-400.
              </li>
              <li>
                <strong>Initial assessment visit</strong> &mdash; typically &pound;300-500.
              </li>
              <li>
                <strong>Public Liability insurance</strong> &mdash; &pound;5-10m cover
                typically &pound;200-500/year.
              </li>
              <li>
                <strong>Test equipment calibration</strong> &mdash; multifunction tester
                annual calibration typically &pound;100-180.
              </li>
              <li>
                <strong>Total year 1</strong> &mdash; roughly &pound;2,000-3,500 depending on
                whether QS qualification needs buying.
              </li>
              <li>
                <strong>Total year 2+</strong> &mdash; roughly &pound;700-1,500/year ongoing.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The annual assessment visit — what assessors actually look at"
            plainEnglish="Once a year the CPS sends an accredited assessor to your premises (or a sample job site). They review your QS qualification, inspect a sample of recent jobs (typically 1-2 jobs visited or certificates reviewed), check your test equipment is in calibration, review your insurance cover, and audit your record-keeping. The visit takes 2-4 hours. Pass = scheme registration continues; fail = re-visit required and registration may be suspended."
            onSite="Prepare for the assessment well ahead. Gather a sample of recent EICs and EICRs in good order. Make sure your tester calibration certificate is current. Check your insurance is in date. Make sure your QS qualification (or the named QS's qualification) is valid. Tidy your records. Most failures are paperwork failures, not competence failures."
          >
            <p>
              Annual assessment checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>QS qualification valid and named QS available.</li>
              <li>Sample of recent EICs / EICRs / Minor Works certificates available.</li>
              <li>Multifunction tester calibration certificate current (within 12 months).</li>
              <li>Public Liability insurance current and at required cover level.</li>
              <li>Employer&apos;s Liability insurance (if you have employees) at &pound;5m+.</li>
              <li>Records of recent CPD (technical training, scheme updates).</li>
              <li>Customer complaint log (most schemes require one).</li>
              <li>One or two recent sample jobs available for site visit if requested.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Trade associations — ECA and SELECT</ContentEyebrow>

          <ConceptBlock
            title="ECA and SELECT — the industry voice layer"
            plainEnglish="The Electrical Contractors' Association (ECA) is the largest trade association for electrical contractors in England, Wales and Northern Ireland — founded 1901. SELECT is the Scottish equivalent. Both lobby on behalf of the industry, run technical events, publish technical guidance, and co-run the JIB / SJIB jointly with Unite. Membership is voluntary and additional to (not instead of) CPS membership."
            onSite="ECA and SELECT membership is a meaningful quality signal for commercial clients. Many tender documents on commercial work require ECA membership as a pre-requisite. ECA also offers technical helpline support for members, model contract documents, insurance products and access to ECA-organised CPD. For a firm doing meaningful commercial work the ECA membership cost (typically £500-2,000/year depending on firm size) is usually well-justified."
          >
            <p>
              What ECA / SELECT membership delivers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Industry voice and lobbying.</li>
              <li>Technical helpline and guidance documents.</li>
              <li>Model contract and warranty documents.</li>
              <li>ECA-branded insurance products at member rates.</li>
              <li>Access to JIB Apprentice scheme infrastructure.</li>
              <li>CPD events, regional meetings, technical updates.</li>
              <li>Recognition on tender documents (often a tender pre-requisite).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations 2010 — Part P (Electrical safety in dwellings) and competent-person schemes (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  Building Regulations Part P requires &quot;reasonable provision&quot; to
                  protect persons operating, maintaining or altering an electrical
                  installation in a dwelling from fire or injury. Approved Document P
                  identifies notifiable work and the routes for compliance:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Notifiable work in a dwelling must either be notified to the LABC before
                    work starts, OR self-certified by a contractor registered with a
                    competent-person scheme (CPS) authorised under Building Regulations.
                  </li>
                  <li>
                    The CPS issues the compliance certificate to the homeowner and notifies
                    the LABC on the homeowner&apos;s behalf, removing the need for LABC
                    inspection.
                  </li>
                  <li>
                    Non-notifiable work (minor alterations, like-for-like replacements not in
                    special locations) does not require notification but must still meet BS
                    7671 and Part P standards.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                Part P is the regulatory mechanism that makes CPS membership economically
                attractive. Without CPS, every notifiable job in a dwelling requires LABC
                notification (and LABC fee). With CPS, the registered firm self-certifies and
                issues the compliance certificate direct &mdash; cheaper and faster.
                Apprentices working in a CPS-registered firm should know the firm&apos;s CPS
                and what it allows the firm to self-certify.
              </>
            }
            cite="Source: Building Regulations 2010 (SI 2010/2214) Part P; Approved Document P (current edition) — paraphrased from gov.uk."
          />

          <RegsCallout
            source="Companies Act 2006 — directors' duties (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Companies Act 2006 sets out the general duties of company directors,
                  including:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    s.171 &mdash; duty to act within powers (the company&apos;s constitution).
                  </li>
                  <li>
                    s.172 &mdash; duty to promote the success of the company for the benefit
                    of its members as a whole.
                  </li>
                  <li>
                    s.174 &mdash; duty to exercise reasonable care, skill and diligence.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                If you set up your electrical firm as a Ltd company you become a director
                with statutory duties. Maintaining CPS registration, keeping insurance current
                and discharging health-and-safety duties to staff and customers is part of
                discharging those director duties. Failure to do so can expose the director
                personally as well as the company.
              </>
            }
            cite="Source: Companies Act 2006 (c.46), Part 10 (Company directors) — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="ECA membership rules (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  ECA membership requires applicants to demonstrate:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Trading history, financial standing and reputation.
                  </li>
                  <li>
                    Suitable insurance cover (PL, EL, PI as appropriate).
                  </li>
                  <li>
                    Competence to industry standards (typically evidenced by CPS
                    registration, qualified staff, technical resources).
                  </li>
                  <li>
                    Commitment to the JIB Working Rule Agreement (for JIB-graded firms).
                  </li>
                  <li>
                    Compliance with ECA Code of Conduct including customer-care standards.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                ECA membership is a meaningful quality signal because the entry criteria are
                substantive. For commercial clients selecting a contractor, ECA membership
                provides reassurance that the firm is financially sound, insured, technically
                competent and commits to industry-standard working conditions. It&apos;s
                often the difference-maker on tender shortlists.
              </>
            }
            cite="Source: ECA membership rules — paraphrased from publicly-available ECA guidance at eca.co.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating CPS as a marketing badge instead of a regulatory authority"
            whatHappens={
              <>
                New sole-trader electrician joins NICEIC for the &quot;tick&quot; on the van.
                Doesn&apos;t take the annual assessment seriously. Doesn&apos;t track QS
                qualification expiry. Lets test equipment calibration lapse. Annual visit
                comes round; assessor finds multiple paperwork failures and lapsed
                calibration. Registration suspended pending remediation; can&apos;t self-certify
                Part P during suspension; LABC notifications stack up; cash flow squeezed.
              </>
            }
            doInstead={
              <>
                Treat CPS as a regulatory compliance regime, not a marketing prop. Calendar
                the QS qualification renewal, the test equipment calibration, the insurance
                renewal and the annual assessment visit. Keep a tidy records folder for each
                customer job: design notes, certificates, photos. Use the assessment visit as
                a yearly health-check &mdash; assessors are typically helpful and want to keep
                you compliant.
              </>
            }
          />

          <Scenario
            title="You're starting your own firm — NICEIC or NAPIT? How to choose."
            situation={
              <>
                You&apos;ve passed AM2, you&apos;ve held the 2391-52 for two years, and
                you&apos;ve decided to set up as a sole trader doing domestic and small
                commercial work in your local area. You need a CPS to self-certify Part P. You
                ring round and the assessor at NICEIC quotes you &pound;750 first year, and
                the assessor at NAPIT quotes &pound;680 first year. The cost is similar. How
                do you choose?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; check local market reputation</strong>. Ask local
                customers, suppliers (wholesalers like Edmundson, City Electrical Factors) and
                other electricians which scheme is best-recognised in your area. NICEIC has
                stronger lay-consumer recognition nationally; in some regional markets NAPIT
                is well-established. Talk to two or three local firms.
                <br /><br />
                <strong>Step 2 &mdash; check the assessor relationship</strong>. The annual
                visit is much smoother with a good assessor. Ask each scheme who the local
                assessor is and (if possible) speak to one or two firms about their
                experience.
                <br /><br />
                <strong>Step 3 &mdash; check whether you might do other trades</strong>. If
                you&apos;re also gas-qualified or planning plumbing work, NAPIT&apos;s
                multi-trade structure may save admin overhead later. If you&apos;re
                electrical-only, NICEIC and NAPIT are equivalent on capability.
                <br /><br />
                <strong>Step 4 &mdash; check the online portal and tools</strong>. Each
                scheme provides a portal for certificate generation, customer notifications,
                CPD tracking. Some are nicer to use than others. Most allow a free trial
                login &mdash; ask for one.
                <br /><br />
                <strong>Step 5 &mdash; decide and commit</strong>. Honestly, for a typical
                domestic-focused sole trader either scheme is a fine choice. Don&apos;t
                agonise. Pick, register, get on with the work. You can switch at annual
                renewal if it doesn&apos;t work out.
              </>
            }
            whyItMatters={
              <>
                CPS is the regulatory backbone of running a domestic-focused electrical firm.
                Picking the wrong scheme isn&apos;t a disaster &mdash; you can switch &mdash;
                but switching mid-year is painful and the assessor relationship matters more
                than the scheme name. Take a week to decide; ring round the local market;
                make a deliberate choice rather than defaulting to whichever logo you see
                most often.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Real numbers and switching costs</ContentEyebrow>

          <ConceptBlock
            title="The actual £ stack — first-year and steady-state costs by scheme"
            plainEnglish="Scheme economics matter when you're starting a firm — getting them wrong means a £1,500 mistake. NICEIC Approved Contractor first-year typically lands £700-1,200 (application + first assessment + first annual sub) plus the QS qualification cost (~£1,200-1,800 for C&G 2391-52 if not already held) plus the assessor's day rate (~£350-500). NAPIT comes in slightly cheaper on annual subs but their introductory packages vary. STROMA bundles multiple compliance areas (Part L, Part F, electrical) so the per-stream cost looks lower if you carry multiple. ELECSA (NICEIC sister) sits between NICEIC and NAPIT on price."
            onSite="When choosing a scheme for a new firm, build the actual cash-flow model: year 1 setup + assessor day + scheme sub; year 2 onwards just sub + assessor day. Then compare against the LABC alternative (~£200-300 per notifiable job × your projected job count). Most firms doing more than 6-8 notifiable Part P jobs/yr break even on scheme membership. Below that volume, LABC may genuinely be cheaper but you lose the marketing and QA benefits of scheme membership."
          >
            <p>
              Indicative scheme cost stack (always verify current pricing direct):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NICEIC Approved Contractor</strong> &mdash; ~&pound;700&ndash;1,200 first-year, ~&pound;500&ndash;800 steady annual sub plus assessor day.
              </li>
              <li>
                <strong>NICEIC Domestic Installer</strong> &mdash; cheaper entry (~&pound;400&ndash;600 annual sub) but dwellings-only scope.
              </li>
              <li>
                <strong>NAPIT Approved</strong> &mdash; ~&pound;500&ndash;900 annual sub plus assessor day; introductory deals common.
              </li>
              <li>
                <strong>ELECSA</strong> &mdash; NICEIC sister scheme, similar pricing structure to NICEIC Domestic.
              </li>
              <li>
                <strong>STROMA</strong> &mdash; multi-stream certification body; price varies on stream count.
              </li>
              <li>
                <strong>QS qualification</strong> &mdash; C&amp;G 2391-52 (~&pound;1,200&ndash;1,800), required for at least one named QS in firm.
              </li>
              <li>
                <strong>LABC alternative</strong> &mdash; ~&pound;200&ndash;300 per notifiable Part P job, no scheme but no marketing either.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Switching schemes mid-year — the friction nobody warns you about"
            plainEnglish="Switching schemes (NICEIC to NAPIT, or vice versa) is allowed and the schemes will tell you it's straightforward. The reality is friction: your annual fees don't pro-rata refund cleanly, the new scheme assessor wants to do a fresh full assessment (not just rely on the previous scheme's), your customers' compliance certificates may need re-issuing under the new scheme's logo, and your insurance may need notifying because some scheme-required cover is bundled. Plan switches at year-end, never mid-year, and budget 3-6 months of overlap if you can absorb it."
            onSite="Most firms don't switch unless there's a real driver — assessor relationship has broken down, scheme has changed pricing materially, or business model is shifting (e.g. moving from domestic to commercial, where Approved Contractor scope is needed). If you're considering a switch, ring the prospective scheme first, get a written assessment of what they want from you, and time the move to align with both schemes' annual cycles. Burning a bridge with a long-term assessor is a small industry — those relationships matter."
          >
            <p>
              Switching scheme — the practical checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Time it to year-end</strong> &mdash; align with the outgoing scheme's annual renewal date.
              </li>
              <li>
                <strong>Plan a fresh full assessment</strong> &mdash; the new scheme won't accept the previous scheme's audit.
              </li>
              <li>
                <strong>Notify your insurer</strong> &mdash; some PI cover is scheme-bundled.
              </li>
              <li>
                <strong>Re-issue templates</strong> &mdash; certificate templates carry the scheme logo.
              </li>
              <li>
                <strong>Update marketing</strong> &mdash; website, vans, business cards.
              </li>
              <li>
                <strong>Customer comms</strong> &mdash; only matters if previous certs are referenced (e.g. EICR follow-up jobs).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="ECA and SELECT — what trade-association membership adds on top of the scheme"
            plainEnglish="The competent-person scheme (NICEIC etc) is regulatory — it lets you self-certify Part P. Trade-association membership (ECA in England/Wales/NI, SELECT in Scotland) is industry voice — it adds technical guidance, dispute mediation, employment-law support, lobbying representation, sector intelligence and the JIB/SJIB collective bargaining input. Many serious firms hold both. ECA membership runs ~£500-2,000+/yr depending on firm size; SELECT runs broadly similar. They're cumulative on top of CPS cost, not alternatives."
            onSite="As an apprentice you may see both logos on the firm's letterhead — NICEIC (or NAPIT) and ECA. The ECA logo signals a firm that pays into the industry voice and accepts the JIB/Working Rules framework. As you progress your career, ECA-member firms tend to be the ones with structured CPD, formal apprenticeship frameworks and JIB-graded contracts. SELECT in Scotland plays the same role with the SJIB. Knowing the difference between regulatory scheme and industry body helps you read what kind of firm you're looking at when assessing employers."
          >
            <p>
              CPS scheme vs trade association &mdash; what each does:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CPS scheme (NICEIC, NAPIT etc)</strong> &mdash; regulatory authorisation for Part P self-cert; required to issue compliance certificates.
              </li>
              <li>
                <strong>ECA / SELECT</strong> &mdash; trade association; technical guidance, employment law, lobbying, JIB input.
              </li>
              <li>
                <strong>JIB / SJIB</strong> &mdash; collective bargaining body; sets rates, conditions, grading.
              </li>
              <li>
                <strong>Held together</strong> &mdash; established commercial sub-contractors typically hold all three plus an MCS scheme for renewables.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Competent-person schemes (NICEIC, NAPIT, ELECSA, STROMA) authorise Part P self-certification in dwellings; trade associations (ECA, SELECT) represent the industry. Most established firms hold both.",
              "First-year CPS cost typically £700-1,200 plus QS qualification (£1,200-1,800 if not already held); Year 2+ ongoing total typically £700-1,500/year (scheme subscription + assessment + insurance + calibration combined — the range depends on bolt-ons).",
              "Economic case is strong — LABC notification £150-300 per notifiable job, so 5-10 jobs a year covers CPS membership.",
              "Annual assessment is substantive — assessor reviews QS, sample jobs, calibration, insurance, records. Treat as serious compliance event.",
              "QS continuity is a scheme rule — at least one named QS must hold a current 2391-52 (or equivalent); QS leaving requires immediate replacement.",
              "NICEIC has strongest lay-consumer recognition; NAPIT positions for multi-trade firms; ELECSA is NICEIC's sister scheme; STROMA covers wider compliance.",
              "ECA / SELECT membership is a quality signal for commercial work — often a tender pre-requisite. Membership cost typically £500-2,000/year.",
              "Multiple CPS memberships duplicate cost without adding capability — pick the scheme that fits the firm best and switch at annual renewal if needed.",
            ]}
          />

          <Quiz title="Scheme membership economics — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.3 ECS card requirements
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.5 Trade union landscape
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
