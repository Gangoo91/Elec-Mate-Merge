/**
 * Module 7 · Section 4 · Subsection 3 — Online learning + scheme CPD
 * Maps to C&G 2365-03 / Unit 308 / LO2 / AC 2.4
 *   AC 2.4 — "Identify the importance of continuing professional development (CPD)"
 *
 * The UK landscape of online and structured CPD providers — Elec-Mate,
 * NICEIC Connect, NAPIT One-Day Updates, Skills for the Future, IET
 * Academy, JTL, NET, manufacturer training. How to plan a structured
 * annual CPD calendar that meets CPS scheme requirements and supports
 * career progression.
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

const TITLE = 'Online learning + scheme CPD | Level 3 Module 7.4.3 | Elec-Mate';
const DESCRIPTION =
  'Elec-Mate, NICEIC Connect, NAPIT One-Day Updates, IET Academy, JTL, NET, manufacturer training — planning a structured annual CPD calendar that meets CPS scheme requirements.';

const checks = [
  {
    id: 'mod7-s4-sub3-providers',
    question: "What are the main UK CPD providers for working electricians?",
    options: [
      "Just YouTube.",
      "Several: scheme-affiliated (NICEIC Connect, NAPIT One-Day Updates, ELECSA training), training providers (JTL, NET, SECTT in Scotland), professional bodies (IET Academy), manufacturers (Schneider, Siemens, Hager, Wago, etc.), Elec-Mate, plus FE colleges. Each has different formats — short courses, online modules, conferences, manufacturer events. CPS schemes typically accept evidence from any reputable source.",
      "Only college.",
      "Only manufacturer.",
    ],
    correctIndex: 1,
    explanation:
      "UK CPD landscape is rich and varied. Plan a mix: scheme-affiliated for scheme-specific updates, IET for broader professional content, manufacturer for product-specific training, Elec-Mate or similar for ongoing structured learning. CPS schemes typically don't dictate which provider — they want evidence of substantive CPD. Variety keeps your knowledge fresh across topics.",
  },
  {
    id: 'mod7-s4-sub3-calendar',
    question:
      "What's a sensible structured annual CPD calendar for an Approved Electrician QS?",
    options: [
      "Whatever happens.",
      "Plan at year-start: (1) BS 7671 amendment refresher if amendment landed; (2) annual scheme update event (NICEIC Connect or NAPIT equivalent); (3) one specialist training event per active specialism (PV, EV, BAFE, CompEx); (4) quarterly online learning hours (IET Academy, Elec-Mate, scheme portal); (5) at least one trade event for networking and tech updates (ECA Live, etc.). Total: 30-50 CPD hours/year with mix of formal and informal.",
      "1 hour total.",
      "1000 hours.",
    ],
    correctIndex: 1,
    explanation:
      "Most CPS schemes look for 30+ hours of structured CPD per year for QS-named individuals. Plan deliberately at year-start — write down the events you'll attend, the courses you'll take, the online learning hours you'll commit to. Calendar each one. Don't scramble at audit time. The audit-passing CPD log is also the career-developing CPD calendar.",
  },
  {
    id: 'mod7-s4-sub3-evidence',
    question:
      "What format does CPD evidence take for CPS scheme audits?",
    options: [
      "Doesn't matter.",
      "Most CPS schemes accept a CPD log (Excel, paper, or digital platform) with: date, topic, source/provider, time spent, key learning summary, supporting evidence (course completion certificate, attendance email, screenshot of online module completion). Some platforms (Elec-Mate's CPD tracker, NICEIC Connect, IET Academy) provide automated tracking. Keep it tidy throughout the year, not just before audit.",
      "Only paper.",
      "Only video.",
    ],
    correctIndex: 1,
    explanation:
      "CPD log format varies by scheme but the core elements are consistent. Automated tracking via platforms saves time but a manual Excel log works fine if disciplined. Bring the log to annual scheme assessment. Auditor wants to see structured year-round CPD, not last-minute cramming. Plan to log events the day you attend; chasing certificates 6 months later is painful.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's NICEIC Connect?",
    options: [
      "An app.",
      "NICEIC's online member platform combining CPD content, technical updates, scheme communications, certification tools and training booking. Member-only access for NICEIC-registered firms. Provides bite-sized BS 7671 updates, technical briefings, regulatory news, and structured CPD content. Integrates with the scheme's annual assessment process.",
      "A magazine.",
      "Just an email.",
    ],
    correctAnswer: 1,
    explanation:
      "NICEIC Connect is the scheme's primary engagement platform for members. Free for registered firms; content updates regularly. Strong CPD resource for QS-named individuals — content directly aligned with what NICEIC assessors expect to see at annual assessment. Similar platforms exist for NAPIT (NAPIT Direct) and ELECSA. Use the scheme's own platform as your baseline CPD source.",
  },
  {
    id: 2,
    question: "What's the IET Academy and how does it differ from IET Online?",
    options: [
      "Same thing.",
      "IET Online = large technical document archive (standards, journals, conference papers) for searching and reference. IET Academy = structured online learning platform with bite-sized courses on technical topics (BS 7671, PV, EV, motor control, power quality, etc.). Both included with MIET membership. Online for reference; Academy for structured learning.",
      "Only Academy is real.",
      "Both for graduates only.",
    ],
    correctAnswer: 1,
    explanation:
      "IET Online and IET Academy are complementary IET resources. Online is the searchable technical archive — go-to for specific document or technical reference. Academy is structured CPD learning — go-to for guided learning on a topic. Both are MIET subscription benefits. Together they're substantial professional development resources that justify the IET subscription many times over.",
  },
  {
    id: 3,
    question: "What's manufacturer training and does it count for CPD?",
    options: [
      "Doesn't count.",
      "Yes — manufacturer training (Schneider Electric, Siemens, Hager, Wago, ABB, etc.) typically counts as CPD with most CPS schemes provided it's substantive (not a sales pitch). Manufacturer events often free or low-cost; cover product-specific install, design, troubleshooting. Strong source of practical CPD especially for specialist equipment (PLCs, smart switchgear, EV chargers, PV inverters). Count attendance toward annual CPD hours.",
      "Only paid for.",
      "Only academic.",
    ],
    correctAnswer: 1,
    explanation:
      "Manufacturer training is a meaningful and often free CPD source. Major manufacturers run regional roadshows, online webinars and structured training programmes for installers. Content is often very practical (how to size, install, commission specific products). Most CPS schemes accept manufacturer training as CPD evidence; bring the attendance certificate to scheme assessment. Build relationships with key suppliers; their training is often surprisingly good.",
  },
  {
    id: 4,
    question: "What's JTL?",
    options: [
      "A football club.",
      "JTL (Joint Training Limited) is one of the UK's largest training providers for electrical and plumbing apprentices and CPD. Industry-owned (originally formed by JIB and others); not-for-profit. Delivers apprenticeships, AM2 assessments, post-AM2 qualifications (2391-52, 2396), and CPD courses. Major training provider for the UK electrical sector.",
      "A union.",
      "A manufacturer.",
    ],
    correctAnswer: 1,
    explanation:
      "JTL is a major industry-owned training provider — particularly known for delivering apprenticeships and AM2 assessments. Strong post-AM2 CPD provision including 2391-52, 2396, specialist endorsements. Many UK FE colleges work in partnership with JTL for apprenticeship delivery. Free / employer-funded for in-firm staff in many cases.",
  },
  {
    id: 5,
    question: "What's NET?",
    options: [
      "A type of cable.",
      "National Electrotechnical Training (NET) — the body that administers AM2 assessments at approved centres around the UK. Owned by JIB. NET also delivers other practical assessments (AM2E for renewables, AM2S for solar). The 'NET centre' you sit your AM2 at is a NET-approved facility.",
      "Just an email service.",
      "Only Scottish.",
    ],
    correctAnswer: 1,
    explanation:
      "NET runs the AM2 assessment system on behalf of JIB and the wider industry. AM2 (Achievement Measurement 2) is the practical end-test for the Installation Electrician apprenticeship — multi-day practical at a NET-approved centre. AM2E and AM2S are extension variants for renewables and solar. Nothing to do with the internet — it's the practical test administrator.",
  },
  {
    id: 6,
    question: "What about online webinars — do they count?",
    options: [
      "Never.",
      "Yes if substantive. Most CPS schemes accept structured online learning as CPD evidence: live webinars (manufacturer-hosted, scheme-hosted, IET-hosted), recorded courses (IET Academy, scheme portals, Elec-Mate), MOOCs from established providers. Keep evidence of completion (certificate, screenshot, email confirmation). Online learning is increasingly the dominant CPD format because of flexibility.",
      "Only YouTube.",
      "Only paid courses.",
    ],
    correctAnswer: 1,
    explanation:
      "Online learning has transformed CPD accessibility — fit it around work and family. Live webinars often free; recorded structured courses typically modest cost or included in subscription. Mix of formats works best — some online for flexibility, some in-person for networking. Document completion of every online learning event the day you do it; small habit, big effect at scheme audit.",
  },
  {
    id: 7,
    question: "How much should you spend on CPD per year?",
    options: [
      "Nothing.",
      "Plan budget: scheme membership and update events typically £400-800/year if scheme-affiliated (NICEIC, NAPIT) include some CPD; one BS 7671 refresher per amendment year £150-300; one specialist training £400-800; IET Academy / scheme platform online learning typically included with subscription; manufacturer training often free; trade events (ECA Live etc.) £100-300. Total CPD spend typically £1,000-2,500/year for an active QS.",
      "£100,000.",
      "£10/year.",
    ],
    correctAnswer: 1,
    explanation:
      "CPD is a meaningful business cost but a meaningful business investment. Self-employed practitioners can deduct CPD spend against tax. Most career-focused electricians budget £1,000-2,500/year for CPD across courses, events, subscriptions and qualifications. Treat as a fixed annual line item, not ad-hoc spending.",
  },
  {
    id: 8,
    question: "What's Skills for the Future?",
    options: [
      "Doesn't exist.",
      "Industry initiatives funded by Government and industry bodies to support CPD and re-skilling — typical examples include the Electrical Skills Partnership, Energy Skills Partnership (Scotland), Construction Skills Fund and others. Provides funded or subsidised training in priority skills areas (renewables, EV, decarbonisation). Eligibility varies; check current programmes via your scheme or trade association.",
      "Only history.",
      "Only Scottish.",
    ],
    correctAnswer: 1,
    explanation:
      "Skills funding programmes change periodically as Government priorities shift. Worth checking current eligibility via your CPS scheme, trade association (ECA, SELECT) or local FE college. Renewables-related skills (PV, heat pumps, EV) have been particularly well-funded in recent years given UK net-zero policy. Free or subsidised training for in-demand skills is available if you know where to look.",
  },
];

const faqs = [
  {
    question: "Do I have to attend physical events for CPD or is online enough?",
    answer:
      "Most CPS schemes accept online CPD as substantive evidence. Mix is healthier — some online for flexibility, some in-person for networking and hands-on. BS 7671 amendment refreshers are sometimes available online but the in-person day is often more effective for the practical-application aspects. Choose format based on the topic and your learning style.",
  },
  {
    question: "Are scheme-affiliated CPD events better than independent providers?",
    answer:
      "Not necessarily. Scheme-affiliated events (NICEIC Connect, NAPIT events) are well-aligned with what scheme assessors expect to see at audit — that's a real advantage. Independent providers (IET Academy, JTL, NET, Elec-Mate) often offer more depth on specific topics. A mix typically delivers best value.",
  },
  {
    question: "Can I claim CPD for reading articles and books?",
    answer:
      "Most CPS schemes allow reading/self-study to count as a portion of CPD evidence (typically up to 30-50% of total hours). Keep brief notes — date, source, topic, key learning. Reading Wiring Matters articles, IET Standards documents, BS 7671 revisions, manufacturer technical briefs all count. Don't over-claim — assessors expect a mix of formal and informal CPD.",
  },
  {
    question: "What's the best CPD for someone just starting their career?",
    answer:
      "Apprentices and improvers benefit most from: scheme/training-provider events (free with apprenticeship), IET Affiliate or Associate membership for technical resources, manufacturer training (free) for product knowledge, and structured online learning (IET Academy, Elec-Mate). Building a CPD habit early is more important than the specific content choice — discipline carries through your whole career.",
  },
  {
    question: "How do CPD hours relate to scheme requirements?",
    answer:
      "Most CPS schemes look for typically 30 hours of structured CPD per year for QS-named individuals. Some schemes specify hours in particular categories (BS 7671 hours, technical hours, professional hours). Read your scheme's specific CPD policy. Hours are the metric most schemes track but quality matters too — substantive learning evidence beats hour-padding.",
  },
  {
    question: "What's the easiest way to track CPD?",
    answer:
      "Pick one platform and use it consistently. Options: Excel template, Word document, scheme portal (NICEIC Connect, NAPIT Direct), specialist tracker (Elec-Mate's CPD tracker), IET Academy automatic tracking. Whatever you pick, log events the day they happen. Trying to reconstruct 12 months of CPD before scheme assessment is painful and incomplete.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 7 · Section 4 · Subsection 3"
            title="Online learning + scheme CPD"
            description="Elec-Mate, NICEIC Connect, NAPIT One-Day Updates, IET Academy, JTL, NET, manufacturer training — planning a structured annual CPD calendar."
            tone="emerald"
          />

          <TLDR
            points={[
              "UK CPD landscape: scheme-affiliated (NICEIC Connect, NAPIT One-Day Updates, ELECSA), training providers (JTL, NET, SECTT), professional bodies (IET Academy), manufacturers, Elec-Mate, FE colleges.",
              "Most CPS schemes look for 30+ hours of structured CPD per year for QS-named individuals; mix of formal and informal evidence.",
              "Plan annual calendar at year-start: BS 7671 refresher when amendment lands, scheme update event, specialist training, online learning hours, trade event for networking.",
              "Total CPD spend typically £1,000-2,500/year for active QS — tax-deductible for self-employed.",
              "Manufacturer training (Schneider, Siemens, Hager etc.) often free and substantive — counts as CPD for most schemes.",
              "Track CPD throughout the year (Excel, scheme portal, IET Academy auto-tracking, Elec-Mate CPD tracker) — don't scramble at audit.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO2 / AC 2.4 — identify the importance of CPD, including the role of structured online and provider-based learning.",
              "Identify the main UK CPD providers and their formats (scheme-affiliated, training providers, professional bodies, manufacturers).",
              "State typical CPD hours expected by CPS schemes (30+ per year for QS-named individuals).",
              "Plan a structured annual CPD calendar with mix of formal and informal evidence.",
              "Identify CPD evidence formats accepted by CPS schemes (log with date, topic, source, time, key learning).",
              "State the typical annual CPD budget for an active QS (£1,000-2,500/year, tax-deductible).",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The CPD provider landscape</ContentEyebrow>

          <ConceptBlock
            title="The UK CPD landscape — many providers, many formats"
            plainEnglish="UK CPD for electrical practitioners is delivered by multiple providers in multiple formats. Scheme-affiliated providers (NICEIC Connect, NAPIT One-Day Updates, ELECSA) align directly with CPS scheme assessment expectations. Industry training providers (JTL, NET, SECTT) deliver structured qualifications and CPD courses. Professional bodies (IET Academy) provide structured online learning. Manufacturers (Schneider, Siemens, Hager, Wago, ABB) deliver product-specific training. Elec-Mate provides ongoing structured learning. FE colleges deliver longer-form qualifications."
            onSite="Mix and match. Scheme platform for the scheme-aligned baseline; IET Academy for broader technical content; manufacturer events for product knowledge; trade events for networking and updates; Elec-Mate or equivalent for ongoing structured progression. No single provider covers everything. The mix keeps your knowledge fresh across topics and gives you breadth at scheme audit."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Scheme-affiliated
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  NICEIC Connect, NAPIT One-Day Updates, ELECSA training. Aligned with
                  scheme assessment expectations. Free or low-cost for scheme members.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Training providers
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  JTL, NET, SECTT (Scotland). Structured qualifications (2391-52, 2396),
                  AM2 assessments, specialist endorsements. Often employer-funded.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Professional bodies
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  IET Academy (online structured CPD), IET Online (technical archive),
                  regional events. Included with MIET subscription.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Manufacturers
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Schneider, Siemens, Hager, Wago, ABB, etc. Product-specific install,
                  design, commissioning training. Often free; substantive.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4 sm:col-span-2">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Online platforms (Elec-Mate, scheme portals)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Bite-sized structured learning, BS 7671 updates, regulatory briefings,
                  CPD trackers. Subscription typically &pound;10-30/month or included with
                  scheme/MIET. Good for ongoing weekly habit.
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

          <ContentEyebrow>Planning a CPD calendar</ContentEyebrow>

          <ConceptBlock
            title="Annual CPD calendar — plan at year-start"
            plainEnglish="Plan your year's CPD at year-start, not on the day of scheme assessment. Layout the events, courses, online hours and reading you'll commit to. Calendar each one. Aim for 30-50 hours total with mix of formal and informal. The audit-passing CPD log is also the career-developing CPD calendar — it's the same activity served two purposes."
            onSite="Most disciplined practitioners block CPD time monthly — typically 2-4 hours per month plus full-day events as they arise. Sunday morning IET Academy session, weekday evening manufacturer webinar, occasional full-day refresher. Habit beats heroics — small consistent CPD time over the year adds up to substantive currency at year-end."
          >
            <p>
              Sample annual CPD calendar for an Approved Electrician QS:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>January-February</strong> &mdash; year planning; book major events;
                IET Academy / Elec-Mate weekly habit established.
              </li>
              <li>
                <strong>March</strong> &mdash; BS 7671 amendment refresher (if amendment
                landed); scheme update event.
              </li>
              <li>
                <strong>April-May</strong> &mdash; manufacturer training event; IET Academy
                bite-sized topic.
              </li>
              <li>
                <strong>June</strong> &mdash; trade event (ECA Live, Electric Vehicles
                Show, etc.).
              </li>
              <li>
                <strong>July-August</strong> &mdash; specialist training (PV update, EV
                update, BAFE refresher).
              </li>
              <li>
                <strong>September</strong> &mdash; mid-year CPD log review; pre-audit
                tidy-up.
              </li>
              <li>
                <strong>October-November</strong> &mdash; scheme assessment;
                second-half-of-year refresher events.
              </li>
              <li>
                <strong>December</strong> &mdash; year-end review; plan next year.
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

          <ContentEyebrow>CPD evidence</ContentEyebrow>

          <ConceptBlock
            title="CPD log — date, topic, source, time, key learning"
            plainEnglish="CPS schemes audit CPD evidence at annual assessment. Standard format: log with date, topic, source/provider, time spent, key learning summary, supporting evidence (course completion certificate, attendance email, screenshot of online module completion). Most schemes accept Excel or paper; some platforms (Elec-Mate, NICEIC Connect, IET Academy) provide automated tracking."
            onSite="Log events the day they happen. Trying to reconstruct 12 months of CPD in the week before scheme audit is painful and incomplete — and assessors notice the difference. Make it a habit: course finishes Friday, log it Friday evening. Webinar completes Wednesday lunchtime, log it before logging back into work email. Small habit, big effect at audit time."
          >
            <p>
              Sample CPD log entry:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Date:</strong> 14 May 2026</li>
              <li><strong>Topic:</strong> BS 7671 A4:2026 amendment refresher</li>
              <li><strong>Source/Provider:</strong> NICEIC Training (1-day course)</li>
              <li><strong>Time:</strong> 7 hours</li>
              <li>
                <strong>Key learning:</strong> AFDD requirements expanded; TN-C-S handling
                revised especially for EV; new schedule columns; updated renewables
                requirements.
              </li>
              <li>
                <strong>Evidence:</strong> Course completion certificate (uploaded to
                shared folder).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="CPS scheme rules — CPD requirements (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  CPS schemes (NICEIC, NAPIT, ELECSA, STROMA, Certsure) typically require
                  registered firms to evidence ongoing CPD for QS-named individuals:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Minimum hours per year &mdash; typically 30+ hours for QS-named
                    individuals; less for other registered staff.
                  </li>
                  <li>
                    Mix of formal and informal evidence accepted.
                  </li>
                  <li>
                    Particular emphasis on BS 7671 currency and amendment-cycle CPD.
                  </li>
                  <li>
                    Specialist endorsement maintenance (PV, EV, BAFE, etc.) requires
                    specialist-specific CPD.
                  </li>
                  <li>
                    Evidence reviewed at annual scheme assessment.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                CPD is not optional for CPS-registered firms &mdash; it&apos;s a continuing
                obligation. Failure to evidence substantive CPD at annual assessment risks
                scheme registration. Plan structured CPD as part of normal business
                operations, not as an audit-time scramble. The 30+ hours target is
                achievable with disciplined monthly habit.
              </>
            }
            cite="Source: CPS scheme rules (NICEIC, NAPIT, ELECSA) — paraphrased from publicly-available scheme guidance."
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 16 (competence)"
            clause={
              <>
                &quot;No person shall be engaged in any work activity where technical
                knowledge or experience is necessary to prevent danger or, where
                appropriate, injury, unless he possesses such knowledge or experience, or is
                under such degree of supervision as may be appropriate having regard to the
                nature of the work.&quot;
              </>
            }
            meaning={
              <>
                EAWR Regulation 16 is the statutory underpin of the CPD obligation.
                &quot;Technical knowledge&quot; must be current, not stale. CPD is what keeps
                competence current over a long career. Without CPD, the Regulation 16 line
                gets crossed within a few years of qualifying as electrical work and
                regulations move on.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), reg. 16 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="HASAWA s.2(2)(c) — training (paraphrased)"
            clause={
              <>
                &quot;The matters to which that duty extends include in particular &mdash;
                (c) the provision of such information, instruction, training and supervision
                as is necessary to ensure, so far as is reasonably practicable, the health
                and safety at work of his employees.&quot;
              </>
            }
            meaning={
              <>
                For employers (including any sole trader with apprentices, and every Ltd
                with staff) the s.2(2)(c) training duty extends to keeping staff competence
                current. Funding employee CPD &mdash; including BS 7671 amendment courses,
                manufacturer training and scheme update events &mdash; is part of
                discharging the duty. Most JIB-graded employers fund staff CPD as a matter
                of policy.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2 — verbatim from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Cramming CPD evidence the week before scheme assessment"
            whatHappens={
              <>
                QS realises scheme assessment is in 7 days and they have no CPD log for the
                year. Frantic scramble: tries to log every webinar attended, every magazine
                read, every conversation with a colleague. Pulls together a hasty Excel log.
                Assessor sees the pattern &mdash; all entries in last 7 days, all dated
                throughout year retrospectively, no supporting evidence for most entries.
                Assessor flags concern; deferred decision pending evidence.
              </>
            }
            doInstead={
              <>
                Make CPD logging a real-time habit, not an audit-time scramble. Log events
                the day they happen. Save certificates and evidence as they arrive. Keep
                the log in cloud storage (Google Drive, OneDrive, Dropbox) so it&apos;s
                always accessible. Total time per logged event: 2-3 minutes. Total time
                saved at audit: 8-12 hours. Easy maths.
              </>
            }
          />

          <Scenario
            title="Designing a year of CPD around a busy installation business"
            situation={
              <>
                You&apos;re a JIB Approved Electrician running a 3-person sole-trader-with-
                apprentices firm. NICEIC-registered Domestic Installer. Annual scheme
                assessment November. You&apos;re on site 4 days a week, paperwork
                Friday. CPD has historically been ad-hoc &mdash; you scramble before the
                assessment. This year you want to do it differently.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; January planning</strong>. Block one Friday morning
                for year-planning. Layout the year. Identify the must-attend events:
                BS 7671 refresher (March if A4 landed); annual NICEIC Connect; one
                manufacturer event; one trade event. Calendar them.
                <br /><br />
                <strong>Step 2 &mdash; build a weekly habit</strong>. Block 1 hour per
                week for IET Academy / Elec-Mate / scheme portal online learning.
                Sunday morning works for many people; Friday lunchtime for others. The
                specific time matters less than the consistency.
                <br /><br />
                <strong>Step 3 &mdash; log each event the day it happens</strong>. Excel
                template in cloud storage. Date, topic, source, time, key learning. Save
                certificates as they arrive. 2-3 minutes per entry.
                <br /><br />
                <strong>Step 4 &mdash; quarterly check-ins</strong>. End of March, June,
                September: review CPD log. On track for 30+ hours total? Any topic gaps?
                Adjust upcoming planning to fill gaps.
                <br /><br />
                <strong>Step 5 &mdash; pre-audit tidy</strong>. Mid-October: bring the log
                up to date, check evidence is attached for each entry, prep for assessor
                review. November assessment is straightforward because the log is
                substantive and well-evidenced.
              </>
            }
            whyItMatters={
              <>
                Structured CPD is the difference between drifting through the trade and
                building a serious career. Disciplined monthly habit beats audit-time
                heroics every time. The CPD log isn&apos;t bureaucracy &mdash; it&apos;s
                the structured record of how your competence kept current. Treat it as a
                career asset and the assessment becomes routine.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The CPD provider landscape and the annual calendar</ContentEyebrow>

          <ConceptBlock
            title="JTL, NET and the formal apprenticeship-providers — beyond initial training"
            plainEnglish="JTL (Joint Training Limited) and NET (National Electrotechnical Training) are the dominant UK apprenticeship training providers — JTL focused on group training in employer-funded apprenticeships, NET running the AM2 testing centre network. Beyond initial apprenticeship training, both run substantial post-AM2 CPD programmes: JTL's Inspection & Testing courses, NET's specialist AM2 sub-routes (AM2E, AM2S), 18th Edition update courses, BPEC PV/EV qualifications. Both offer corporate group bookings for established firms and individual enrollment for self-funding electricians."
            onSite="JTL and NET courses are typically priced mid-market (~£300-500 per 1-day, £1,200-1,800 per multi-day qualification), with strong industry recognition. Both run nationally, so location is rarely a blocker. JTL is particularly strong in the Midlands and South; NET is strongest at AM2 testing centres. Look at their published calendars 6 months ahead of when you want to sit a course — popular qualifications (2391-52, BPEC PV) book up. Check whether your employer has a corporate JTL/NET arrangement that gives you discount access."
          >
            <p>
              JTL / NET CPD offerings:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>2391-52</strong> &mdash; combined Initial Verification + Periodic Inspection.
              </li>
              <li>
                <strong>2382-22 / 2382-26</strong> &mdash; BS 7671 update qualifications.
              </li>
              <li>
                <strong>AM2 / AM2E / AM2S</strong> &mdash; main AM2 plus Electrotechnical and Solar PV sub-routes.
              </li>
              <li>
                <strong>BPEC PV / EV / HP</strong> &mdash; renewables technology qualifications.
              </li>
              <li>
                <strong>2399 Commissioning</strong> &mdash; commissioning specialism.
              </li>
              <li>
                <strong>1-day update courses</strong> &mdash; for new BS 7671 amendments.
              </li>
              <li>
                <strong>Corporate group bookings</strong> &mdash; for employer-funded team training.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Manufacturer training — Hager, Schneider, ABB, Trend, Tesla and the vendor route"
            plainEnglish="Major electrical equipment manufacturers run substantial training programmes for installers and specifiers — typically free or low-cost (subsidised by the manufacturer's commercial interest in qualified installers). Hager Academy (consumer units, distribution boards), Schneider Electric (power distribution, BMS), ABB (motor controls, drives), Trend Controls (BMS Level 2/3), Tesla (Powerwall installer certification), Solis/SMA (PV inverter), Wallbox/Easee (EV chargers). Many run as 1-2 day events at regional training centres, often with lunch and CPD certification."
            onSite="Manufacturer training is one of the highest-value CPD streams because (a) it's typically free or low-cost, (b) it directly enables you to install/commission specific products, and (c) it builds direct relationships with manufacturer technical support — invaluable when you're struggling with a fault on site. Build a habit of attending one manufacturer course per quarter — over a year that's 4 vendor relationships, 4 product specialisms added, ~£300-600 of training value, and significant network expansion. Most manufacturers actively want specifiers and installers trained — getting on their lists is straightforward."
          >
            <p>
              Manufacturer training routes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hager Academy</strong> &mdash; consumer units, distribution boards, surge protection.
              </li>
              <li>
                <strong>Schneider Electric University</strong> &mdash; power distribution, BMS (EcoStruxure).
              </li>
                <li>
                  <strong>ABB Training</strong> &mdash; drives, motor controls, switchgear.
                </li>
              <li>
                <strong>Trend Controls Academy</strong> &mdash; BMS Level 2/3, IQ4 platform.
              </li>
              <li>
                <strong>Tesla Installer Certification</strong> &mdash; Powerwall battery installer.
              </li>
              <li>
                <strong>Wallbox / Easee / Pod Point</strong> &mdash; EV charger product training.
              </li>
              <li>
                <strong>SMA / Solis / GivEnergy</strong> &mdash; PV inverter and battery training.
              </li>
              <li>
                <strong>Cost</strong> &mdash; typically free to ~&pound;400 per course.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The 12-month CPD calendar — building structured habit"
            plainEnglish="A high-functioning electrician's annual CPD plan typically looks like: January — annual review of CPD record, plan year ahead, book major courses for the year. Quarterly — attend one manufacturer training (1-2 days). Mid-year — attend one IET local branch event. Amendment year — attend BS 7671 update course (1 day, mandatory). Annually — read major industry publications (Professional Electrician, Voltimum, IET E&T magazine) for ~30 mins/week. Scheme audit prep — refresh CPD log 4-6 weeks before annual scheme assessment. Total annual CPD spend ~£600-1,500 + 8-12 days of time."
            onSite="The discipline is in the structure, not the heroics. An electrician who books quarterly CPD slots in January and turns up to each one will accumulate ~30-40 hours of structured CPD/year — easily satisfying any scheme requirement and materially advancing competence. An electrician who plans nothing and tries to retrofit a CPD record 2 weeks before audit will struggle to evidence anything substantive. Use a calendar app to schedule CPD slots like work appointments — defended time, planned ahead. The compound effect over a 30-year career is huge."
          >
            <p>
              Sample annual CPD calendar:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>January</strong> &mdash; annual CPD review, book major courses for year.
              </li>
              <li>
                <strong>March / June / September / December</strong> &mdash; manufacturer training quarterly (4 courses/yr).
              </li>
              <li>
                <strong>April / October</strong> &mdash; IET local branch event (2/yr).
              </li>
              <li>
                <strong>Amendment year</strong> &mdash; 1-day BS 7671 update course within 6 months of publication.
              </li>
              <li>
                <strong>Weekly</strong> &mdash; ~30 mins industry publication reading (Voltimum, Pro Electrician, IET E&amp;T).
              </li>
              <li>
                <strong>Pre-audit</strong> &mdash; refresh CPD log 4&ndash;6 weeks before scheme assessment.
              </li>
              <li>
                <strong>Total spend</strong> &mdash; ~&pound;600&ndash;1,500/yr + 8&ndash;12 days of time.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="CPD evidence and scheme audit — what assessors actually check"
            plainEnglish="CPS scheme assessors at annual audit will check the QS's CPD record looking for: currency on current BS 7671 amendment (essential — non-negotiable), evidence of broader technical CPD across the year (manufacturer training, scheme update events, industry reading), structured logging (date, activity, hours, learning outcome), CPD plan for next year. Most schemes specify minimum CPD hours (NICEIC typically requires ~30 hours/yr of structured CPD for QS). Failure to evidence CPD is a common audit non-conformity that can lead to corrective action plans and (in serious cases) scheme suspension."
            onSite="Format your CPD log professionally — most schemes accept a simple spreadsheet (date, activity, provider, hours, key learning, evidence link). Keep digital copies of all course certificates, attendance confirmations and reading lists. Each entry should briefly describe what you learned and how it applies to your work — assessors look for genuine engagement, not box-ticking. CPS schemes increasingly cross-reference CPD records against scheme content (e.g. NICEIC Connect tracks attendance at NICEIC events automatically). Treating CPD as an audit-ready record from day one removes year-end stress."
          >
            <p>
              CPD log essentials for scheme audit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Date and duration</strong> &mdash; specific date, hours/days.
              </li>
              <li>
                <strong>Activity</strong> &mdash; course title, event name, reading material.
              </li>
              <li>
                <strong>Provider</strong> &mdash; JTL, NET, IET, manufacturer, etc.
              </li>
              <li>
                <strong>Hours</strong> &mdash; structured CPD hours claimed.
              </li>
              <li>
                <strong>Learning outcome</strong> &mdash; brief note on what you learned and how applied.
              </li>
              <li>
                <strong>Evidence</strong> &mdash; certificate, attendance confirmation, link.
              </li>
              <li>
                <strong>Annual total</strong> &mdash; running total against scheme minimum.
              </li>
              <li>
                <strong>Plan for next year</strong> &mdash; brief forward-looking CPD plan.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Online learning platforms — Elec-Mate, NICEIC Connect, IET Academy"
            plainEnglish="Online learning has dramatically expanded post-2020. Elec-Mate (this platform) provides apprentice-aligned content, scheme-recognised CPD modules and integrated assessment tools. NICEIC Connect is NICEIC's member-only platform with live webinars, on-demand technical content and update modules — particularly strong on amendment CPD. NAPIT One-Day Updates run regional in-person courses with online follow-up. IET Academy provides graduate-level engineering content, particularly strong on design and management topics. Each suits different learning styles and career destinations."
            onSite="Online platforms are ideal for accumulating CPD hours flexibly — between site visits, evenings, weekends. Most CPS schemes accept structured online learning as CPD with attendance verification. Build a habit of 1-2 short online modules per month alongside the larger in-person courses. Multiple platforms give you breadth — Elec-Mate for trade content, NICEIC Connect for regulatory updates, IET Academy for engineering depth. Subscriptions are typically modest (~£100-300/yr) and the time-flexibility makes them dramatically more accessible than time-blocked in-person courses."
          >
            <p>
              UK online learning platforms for electricians:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Elec-Mate</strong> &mdash; apprentice content, CPD modules, assessment tools.
              </li>
              <li>
                <strong>NICEIC Connect</strong> &mdash; member-only, technical webinars, amendment updates.
              </li>
              <li>
                <strong>NAPIT One-Day Updates</strong> &mdash; regional in-person + online follow-up.
              </li>
              <li>
                <strong>IET Academy</strong> &mdash; graduate-level engineering content.
              </li>
              <li>
                <strong>JTL e-learning</strong> &mdash; modular online qualifications.
              </li>
              <li>
                <strong>Manufacturer e-learning</strong> &mdash; vendor-specific (Hager, Schneider, Trend etc).
              </li>
              <li>
                <strong>Subscription model</strong> &mdash; ~&pound;100&ndash;300/yr typical, time-flexible.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "UK CPD landscape rich and varied: scheme-affiliated (NICEIC Connect, NAPIT One-Day Updates), training providers (JTL, NET, SECTT), IET Academy, manufacturers, Elec-Mate, FE colleges.",
              "Most CPS schemes look for 30+ hours of structured CPD per year for QS-named individuals; mix of formal and informal evidence.",
              "Plan annual calendar at year-start: BS 7671 refresher when amendment lands, annual scheme update event, specialist training, online learning hours, trade event.",
              "Manufacturer training (Schneider, Siemens, Hager, Wago, ABB etc.) often free and substantive — counts as CPD with most schemes.",
              "Total CPD budget typically £1,000-2,500/year for active QS — tax-deductible for self-employed.",
              "CPD log: date, topic, source, time, key learning, supporting evidence. Log events the day they happen, not at audit time.",
              "EAWR Regulation 16 and HASAWA s.2(2)(c) underpin the CPD obligation — competence must be current, not stale.",
              "Build a weekly CPD habit (1-2 hours) to reach 30+ hours/year by consistent contribution rather than scrambling.",
              "Cloud-storage CPD log keeps evidence always accessible and protects against device loss.",
            ]}
          />

          <Quiz title="Online learning + scheme CPD — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.2 IET membership routes
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.4 Beyond the toolbox &mdash; charities
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
