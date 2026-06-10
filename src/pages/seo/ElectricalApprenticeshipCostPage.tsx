import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  PoundSterling,
  Zap,
  ClipboardCheck,
  BookOpen,
  Brain,
  ShieldCheck,
  Calculator,
  FileCheck2,
  Users,
  Building2,
  Wallet,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Apprenticeship Cost', href: '/guides/electrical-apprenticeship-guide-cost' },
];

const tocItems = [
  { id: 'cost-overview', label: 'Apprenticeship Cost Overview' },
  { id: 'levy-vs-non-levy', label: 'Levy vs Non-Levy Employers' },
  { id: 'funding-bands', label: 'Funding Bands Explained' },
  { id: 'co-investment', label: 'Co-Investment and Incentives' },
  { id: 'additional-costs', label: 'Additional Costs to Expect' },
  { id: 'equipment-and-tools', label: 'Equipment and Tool Costs' },
  { id: 'apprentice-wages', label: 'Apprentice Wages and Earnings' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The government funds 95 to 100% of apprenticeship training costs — most apprentices pay nothing for their qualifications.',
  'Levy-paying employers (payroll over £3 million) fund apprenticeships through their digital apprenticeship service account. Non-levy employers pay just 5% co-investment.',
  'The funding band for a Level 3 Installation Electrician apprenticeship is £18,000, meaning the government will contribute up to £17,100 towards training costs.',
  'Additional costs for apprentices include tools (£300 to £800), PPE (£100 to £200), textbooks (£50 to £150), and exam fees (often included in the training provider fee).',
  'When buying textbooks, make sure you get BS 7671:2018+A4:2026 (Amendment 4, April 2026 — orange cover). The EPA knowledge test is based on the current edition; an older A2 or A3 copy will contain deleted or changed regulation numbers.',
  'Elec-Mate supports apprentices through every stage of training with study courses, portfolio guidance, exam preparation, and AI-powered regulation help.',
];

const faqs = [
  {
    question: 'Do apprentices have to pay for their own electrical training?',
    answer:
      'No. Under the current government apprenticeship funding rules, apprentices do not pay for their training. The cost is met by the employer (if they are a levy payer) or shared between the employer and the government (if they are a non-levy payer, with the employer paying just 5% co-investment). In some cases, the government covers 100% of the training cost — for example, when the apprentice is aged 16 to 18 at the start of the apprenticeship, or when the employer has fewer than 50 employees and the apprentice is under 19. The apprentice should never be asked to contribute towards the cost of their training directly.',
  },
  {
    question: 'What is the apprenticeship levy and how does it work?',
    answer:
      'The apprenticeship levy is a UK government tax that applies to all employers with an annual payroll of more than £3 million. They pay 0.5% of their payroll into a digital apprenticeship service (DAS) account, offset by a £15,000 annual allowance. The funds in the DAS account can only be used to pay for apprenticeship training. Levy funds expire after 24 months if not used, and up to 25% of unused levy can be transferred to other employers in the supply chain. For example, a main electrical contractor paying levy could transfer funds to a smaller sub-contractor to help them take on apprentices. If you work for a large employer (M&E contractor, facilities management company, housing association), your apprenticeship is almost certainly funded through the levy.',
  },
  {
    question: 'What does the 5% co-investment mean for non-levy employers?',
    answer:
      'Non-levy employers — those with an annual payroll below £3 million, which includes the vast majority of small and medium electrical contractors — pay 5% of the negotiated training cost. The government pays the remaining 95%. For a Level 3 Installation Electrician apprenticeship with a training cost of £15,000 (within the £18,000 funding band), the employer would pay £750 (5%) and the government would pay £14,250 (95%). This co-investment is paid directly to the training provider, not to the government. Some training providers spread the co-investment across the duration of the apprenticeship (for example, £750 over 48 months is less than £16 per month).',
  },
  {
    question: 'What tools and equipment do electrical apprentices need to buy?',
    answer:
      'Most employers provide basic hand tools, but many apprentices invest in their own quality tool kit as they progress. A basic electrician tool kit costs £300 to £500 and typically includes: insulated screwdrivers (VDE), side cutters, long-nose pliers, cable strippers, a voltage indicator pen, a tape measure, a junior hacksaw, a spirit level, and a tool bag or pouch. As you progress to your AM2 assessment, you will need a more comprehensive kit — budget £500 to £800 for AM2-ready tools. PPE costs £100 to £200 and includes safety boots, hi-vis vest, hard hat, safety glasses, and gloves. Some employers cover PPE costs; others expect the apprentice to provide their own.',
  },
  {
    question: 'How much do electrical apprentices earn in the UK?',
    answer:
      'The national minimum apprenticeship wage from April 2025 is £7.55 per hour for apprentices under 19 or in their first year. After the first year (or if the apprentice is 19+), the National Living Wage for their age group applies — £12.21 per hour for 21 and over (April 2025 rate). However, most electrical employers pay above the minimum. A first-year electrical apprentice typically earns £12,000 to £18,000 per year. A third or fourth-year apprentice, who is more productive and closer to qualifying, can earn £18,000 to £24,000. Once qualified and registered with a competent person scheme, starting salaries are typically £28,000 to £35,000, rising to £35,000 to £50,000+ with experience.',
  },
  {
    question: 'Are exam fees included in the apprenticeship funding or paid separately?',
    answer:
      'End-point assessment (EPA) costs are included within the apprenticeship funding band. The training provider and EPA organisation agree the EPA fee, and it is paid from the same funding that covers the training. For the Level 3 Installation Electrician apprenticeship, the EPA includes the AM2 practical assessment, a knowledge test, and a professional discussion. The apprentice should not be asked to pay for the EPA separately. However, if the apprentice fails a component and needs a resit, the resit fee may or may not be covered — this depends on the training provider agreement. Some employers cover resit costs; others deduct them from wages.',
  },
  {
    question: 'How does Elec-Mate help apprentices during their training?',
    answer:
      'Elec-Mate includes dedicated Level 2 and Level 3 electrical courses that cover the entire apprenticeship curriculum, including science principles, installation methods, inspection and testing, fault diagnosis, and wiring regulations. The platform also includes AM2 exam preparation, EPA preparation guides, portfolio building tools, and 8 Elec-AI agents that can answer any technical or regulatory question. Apprentices can study on their phones during commutes, breaks, and evenings — making it easier to keep up with college work alongside on-site training.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Complete guide to becoming an electrical apprentice in the UK — qualifications, routes, and timeline.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description:
      'Practical tips and strategies for passing the AM2 practical assessment first time.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/training/epa-preparation',
    title: 'EPA Preparation Guide',
    description:
      'How to prepare for the end-point assessment — knowledge test, skills test, and professional discussion.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK',
    description:
      'What electricians earn in the UK — apprentice to experienced, employed to self-employed.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-become-an-electrician',
    title: 'How to Become an Electrician',
    description:
      'Step-by-step route to becoming a qualified electrician in the UK — college, apprenticeship, or adult retraining.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/training/apprentice-portfolio',
    title: 'Apprentice Portfolio Guide',
    description:
      'How to build your apprentice portfolio — evidence requirements, photo tips, and common mistakes.',
    icon: BookOpen,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'cost-overview',
    heading: 'How Much Does an Electrical Apprenticeship Cost?',
    content: (
      <>
        <p className="text-sm text-white/50 mb-4">
          Reviewed by a City &amp; Guilds 2391-qualified electrician and apprenticeship training
          specialist. Funding figures reflect current ESFA rules and NLW rates from April 2025.
        </p>
        <p>
          The short answer: almost nothing for the apprentice, and significantly less than most
          employers expect. The UK government funds 95 to 100% of apprenticeship training costs,
          making an{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            electrical apprenticeship
          </SEOInternalLink>{' '}
          one of the most affordable routes into a skilled trade.
        </p>
        <p>
          The Level 3 Installation Electrician/Maintenance Electrician apprenticeship has a funding
          band of £18,000. This means the government will contribute up to £18,000 towards the cost
          of the training. The actual cost negotiated with the training provider is usually lower —
          typically £12,000 to £16,000 — and the employer pays either nothing (if they are a levy
          payer using their DAS account) or just 5% co-investment (if they are a non-levy payer).
        </p>
        <p>
          This guide breaks down every cost associated with an electrical apprenticeship — what the
          government pays, what the employer pays, what the apprentice pays, and what additional
          costs to expect for tools, PPE, and textbooks.
        </p>
      </>
    ),
  },
  {
    id: 'levy-vs-non-levy',
    heading: 'Levy vs Non-Levy Employers',
    content: (
      <>
        <p>
          How your apprenticeship is funded depends on whether your employer pays the apprenticeship
          levy. This is determined by their annual payroll.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Levy-Paying Employers</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-white mb-1">Payroll Threshold</div>
                <div className="text-xl font-bold text-yellow-400">Over £3 million</div>
              </div>
              <div>
                <div className="text-sm text-white mb-1">Employer Cost</div>
                <div className="text-xl font-bold text-white">£0 out-of-pocket</div>
              </div>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Large employers (major M&E contractors, facilities companies, housing associations)
              pay 0.5% of their payroll into a digital apprenticeship service (DAS) account. This
              money is ring-fenced for apprenticeship training. The employer draws down from their
              DAS account to pay the training provider. There is no additional cost — the training
              is fully funded from the levy they have already paid. Unused levy funds expire after
              24 months.
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Non-Levy Employers</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-white mb-1">Payroll Threshold</div>
                <div className="text-xl font-bold text-yellow-400">Under £3 million</div>
              </div>
              <div>
                <div className="text-sm text-white mb-1">Employer Cost</div>
                <div className="text-xl font-bold text-white">5% co-investment</div>
              </div>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Small and medium employers — which includes the vast majority of electrical
              contractors in the UK — do not pay the levy. Instead, they pay a 5% co-investment
              towards the training cost, with the government covering the remaining 95%. For a
              £15,000 training cost, the employer pays just £750 over the full duration of the
              apprenticeship. Some employers with fewer than 50 employees pay 0% when taking on
              apprentices aged 16 to 18.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'funding-bands',
    heading: 'Funding Bands Explained',
    content: (
      <>
        <p>
          Every apprenticeship standard has a funding band — a maximum amount that the government
          will contribute towards the training cost. The training provider negotiates the actual
          price with the employer, which must be at or below the funding band cap.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-semibold text-white">Apprenticeship</th>
                  <th className="p-4 text-sm font-semibold text-yellow-400 text-right">
                    Funding Band
                  </th>
                  <th className="p-4 text-sm font-semibold text-white text-right">
                    Typical Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: 'Level 3 Installation Electrician',
                    band: '£18,000',
                    duration: '42 — 48 months',
                  },
                  {
                    name: 'Level 3 Maintenance Electrician',
                    band: '£18,000',
                    duration: '42 — 48 months',
                  },
                  {
                    name: 'Level 3 Electrical/Electronic Technical Support',
                    band: '£21,000',
                    duration: '42 — 48 months',
                  },
                  {
                    name: 'Level 4 Building Services Engineer',
                    band: '£15,000',
                    duration: '36 — 48 months',
                  },
                ].map((row, i) => (
                  <tr key={row.name} className={i < 3 ? 'border-b border-white/5' : ''}>
                    <td className="p-4 text-sm text-white">{row.name}</td>
                    <td className="p-4 text-sm text-yellow-400 font-semibold text-right">
                      {row.band}
                    </td>
                    <td className="p-4 text-sm text-white text-right">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p>
          The funding band is the maximum, not the fixed price. Good training providers negotiate
          competitive rates — a Level 3 Installation Electrician apprenticeship might cost £12,000
          to £16,000 in practice. A non-levy employer paying 5% co-investment on a £14,000 training
          cost would pay just £700 over 4 years.
        </p>
      </>
    ),
  },
  {
    id: 'co-investment',
    heading: 'Co-Investment, Incentives, and Transfers',
    content: (
      <>
        <p>
          The government offers several financial incentives to encourage employers to take on
          apprentices. Understanding these can make the business case for hiring an apprentice even
          more compelling.
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: '100% funding for small employers with young apprentices',
              description:
                'Employers with fewer than 50 employees pay no co-investment at all when taking on apprentices aged 16 to 18.',
            },
            {
              title: 'Incentive payments for care leavers and other priority groups',
              description:
                'A targeted £1,000 incentive payment is available to employers who hire apprentices who are care leavers. The general £1,000 incentive for all 16 to 18-year-old apprentices was removed by ESFA for new starts from 1 August 2023. Check the current ESFA guidance for the latest eligibility criteria.',
            },
            {
              title: 'Levy transfer from larger employers',
              description:
                'Levy-paying employers can transfer up to 25% of their annual levy to other employers. This means a main M&E contractor could transfer levy funds to a smaller sub-contractor in its supply chain, fully covering the training cost of an apprentice the smaller firm could not otherwise afford to take on.',
            },
            {
              title: 'Additional learning support',
              description:
                'Training providers receive additional funding for apprentices who need learning support — for example, those with a learning difficulty, a disability, or a recognised additional need. This funding is paid to the provider, not the apprentice, and does not reduce the core training budget.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SEOAppBridge
          title="Apprentice study courses built into Elec-Mate"
          description="Level 2 and Level 3 electrical courses, AM2 preparation, portfolio guidance, and 8 AI agents that answer any technical question."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'additional-costs',
    heading: 'Additional Costs Apprentices Should Expect',
    content: (
      <>
        <p>
          While the training itself is government-funded, there are additional costs that
          apprentices and employers should budget for. These are not covered by apprenticeship
          funding.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-semibold text-white">Cost Item</th>
                  <th className="p-4 text-sm font-semibold text-yellow-400 text-right">
                    Typical Range
                  </th>
                  <th className="p-4 text-sm font-semibold text-white">Who Pays</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    item: 'Basic hand tool kit',
                    range: '£300 — £500',
                    who: 'Varies (often apprentice)',
                  },
                  {
                    item: 'AM2-ready tool kit upgrade',
                    range: '£500 — £800',
                    who: 'Usually apprentice',
                  },
                  {
                    item: 'PPE (boots, hi-vis, hard hat)',
                    range: '£100 — £200',
                    who: 'Employer (legal duty)',
                  },
                  {
                    item: 'Textbooks (BS 7671:2018+A4:2026, OSG, GN3)',
                    range: '£50 — £150',
                    who: 'Varies',
                  },
                  {
                    item: 'Travel to college/training centre',
                    range: '£500 — £2,000/yr',
                    who: 'Apprentice',
                  },
                  {
                    item: 'Exam resit fees (if needed)',
                    range: '£50 — £200 per resit',
                    who: 'Varies',
                  },
                  {
                    item: 'Competent person scheme fee',
                    range: '£300 — £600/yr',
                    who: 'Employer (post-qualification)',
                  },
                ].map((row, i) => (
                  <tr key={row.item} className={i < 6 ? 'border-b border-white/5' : ''}>
                    <td className="p-4 text-sm text-white">{row.item}</td>
                    <td className="p-4 text-sm text-yellow-400 font-semibold text-right">
                      {row.range}
                    </td>
                    <td className="p-4 text-sm text-white">{row.who}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-4 my-4 text-sm text-white leading-relaxed">
          <strong className="text-yellow-400">Important — buy the current edition:</strong> The live
          wiring regulations are <strong>BS 7671:2018+A4:2026</strong> (Amendment 4, April 2026 —
          orange cover). Apprentices sitting the EPA knowledge test are examined on the current
          edition, so a second-hand A2 or A3 copy will contain deleted requirements and outdated
          regulation numbers. The table below shows examples of regulations apprentices are commonly
          tested on under the current edition — always buy or borrow the A4:2026 consolidated book.
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-semibold text-white">Topic in the current edition</th>
                  <th className="p-4 text-sm font-semibold text-yellow-400">Regulation</th>
                  <th className="p-4 text-sm font-semibold text-white">What it requires</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    topic: 'Arc fault detection devices (AFDDs)',
                    reg: '421.1.7',
                    detail:
                      'AFDDs to BS EN 62606 shall be provided for single-phase AC final circuits supplying socket-outlets rated up to 32 A in high-rise residential buildings, HMOs, purpose-built student accommodation and care homes; recommended for all other premises.',
                  },
                  {
                    topic: 'RCD protection for lighting circuits',
                    reg: '411.3.4',
                    detail:
                      'Within domestic (household) premises, additional protection by a 30 mA RCD shall be provided for AC final circuits supplying luminaires.',
                  },
                  {
                    topic: 'TN-C-S earthing — protective neutral bonding',
                    reg: '312.2.1.1',
                    detail:
                      'Now includes a protective neutral bonding (PNB) figure and requirements alongside the existing PME arrangement for TN-C-S systems.',
                  },
                ].map((row, i) => (
                  <tr key={row.reg} className={i < 2 ? 'border-b border-white/5' : ''}>
                    <td className="p-4 text-sm text-white align-top">{row.topic}</td>
                    <td className="p-4 text-sm text-yellow-400 font-semibold align-top whitespace-nowrap">
                      {row.reg}
                    </td>
                    <td className="p-4 text-sm text-white align-top">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-4 pb-4 text-xs text-white/50">
            Regulation references verified against BS 7671:2018+A4:2026.
          </p>
        </div>
        <p>
          The total out-of-pocket cost for an apprentice over a 4-year apprenticeship is typically
          £1,500 to £4,000, mostly spent on tools, travel, and books. This is significantly less
          than the cost of a university degree, and apprentices earn a wage throughout.
        </p>
      </>
    ),
  },
  {
    id: 'equipment-and-tools',
    heading: 'Equipment and Tool Costs in Detail',
    content: (
      <>
        <p>
          Good tools are an investment in your career. A well-equipped electrician works faster,
          safer, and more professionally. Here is what to budget for at each stage:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Wallet className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Year 1: Starter Kit (£300 — £500)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Insulated screwdrivers (flat and Phillips), side cutters, long-nose pliers, cable
                  strippers, voltage indicator pen, tape measure, junior hacksaw, spirit level,
                  Stanley knife, tool pouch or bag. Focus on quality brands — Knipex, Wera, Wiha, CK
                  Tools — they last longer and perform better than budget alternatives.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Wallet className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Year 2 — 3: Expansion (£200 — £400)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Crimping tools, conduit bending tools, SDS drill bits, hole saws, a better
                  multimeter, a fish tape or draw wire kit, and a proper tool bag or backpack. Your
                  employer should provide power tools (SDS drill, jigsaw, chop saw), but some
                  apprentices invest in their own cordless drill and impact driver.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <Wallet className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  AM2 Year: Assessment Kit (£500 — £800)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The <SEOInternalLink href="/guides/am2-exam-tips">AM2 assessment</SEOInternalLink>{' '}
                  requires specific tools. Budget for a GS38-compliant voltage indicator, a proving
                  unit, lock-off devices, a low-resistance ohmmeter (or multifunction tester if
                  provided), and a complete set of quality hand tools. Check the AM2 tool list
                  published by your assessment centre well in advance.
                </p>
                <p className="text-white text-sm leading-relaxed mt-2">
                  GS38 is the HSE guidance note covering electrical test equipment for use on low
                  voltage systems. A GS38-compliant voltage indicator must have fused test leads,
                  finger guards or shrouded probes, and an appropriate CAT rating for the voltage
                  being tested. The Guidance Note 3 (GN3) safe isolation procedure requires you to
                  verify absence of voltage with a GS38-compliant instrument both before and after
                  isolation — not just once. Assessors at the AM2 will check that your voltage
                  indicator meets GS38 and that you follow the correct prove-dead sequence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'apprentice-wages',
    heading: 'Apprentice Wages and Earning Potential',
    content: (
      <>
        <p>
          Unlike university, an apprenticeship pays you a wage from day one. You earn while you
          learn, and your wages increase each year as your skills and productivity grow.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-sm font-semibold text-white">Stage</th>
                  <th className="p-4 text-sm font-semibold text-yellow-400 text-right">
                    Typical Annual Wage
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { stage: 'Year 1 apprentice (16 — 18)', wage: '£12,000 — £16,000' },
                  { stage: 'Year 2 apprentice (19+)', wage: '£16,000 — £20,000' },
                  { stage: 'Year 3 — 4 apprentice', wage: '£18,000 — £24,000' },
                  { stage: 'Newly qualified electrician', wage: '£28,000 — £35,000' },
                  { stage: 'Experienced electrician (5+ years)', wage: '£35,000 — £50,000+' },
                  { stage: 'Self-employed electrician', wage: '£40,000 — £70,000+' },
                ].map((row, i) => (
                  <tr key={row.stage} className={i < 5 ? 'border-b border-white/5' : ''}>
                    <td className="p-4 text-sm text-white">{row.stage}</td>
                    <td className="p-4 text-sm text-yellow-400 font-semibold text-right">
                      {row.wage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p>
          Over a 4-year apprenticeship, a typical apprentice earns £60,000 to £80,000 in total wages
          — while also gaining a fully funded Level 3 qualification worth £12,000 to £18,000.
          Compare this to a university graduate who leaves with £40,000 to £50,000 of student debt.
          The financial case for an electrical apprenticeship is compelling.
        </p>
        <SEOAppBridge
          title="Track your apprenticeship progress with Elec-Mate"
          description="Study courses, portfolio guidance, AM2 preparation, and AI-powered regulation help — all designed for apprentices who want to qualify first time and start earning a qualified electrician's wage sooner."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalApprenticeshipCostPage() {
  return (
    <GuideTemplate
      title="Electrical Apprenticeship Cost | Fees & Funding UK"
      description="How much does an electrical apprenticeship cost in the UK? Apprenticeship levy explained, funding bands, 5% co-investment, tool and PPE costs, and apprentice wages from year 1 to qualified."
      datePublished="2025-08-01"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Electrical Apprenticeship Cost:{' '}
          <span className="text-yellow-400">Fees and Funding UK</span>
        </>
      }
      heroSubtitle="An electrical apprenticeship costs almost nothing for the apprentice and far less than most employers think. The government funds 95 to 100% of training costs. This guide covers the levy, funding bands, co-investment, additional costs for tools and equipment, and what apprentices earn from year 1 to qualified."
      readingTime={11}
      answerBox={{
        question: 'How much does an electrical apprenticeship cost in the UK?',
        answer:
          'An apprentice pays nothing for their training. The government funds 95 to 100% of the cost, capped by the funding band — £18,000 for the Level 3 Installation Electrician standard. Levy-paying employers pay from their digital account; non-levy employers pay just 5% co-investment. Apprentices typically spend £1,500 to £4,000 over four years on tools, PPE, travel and textbooks.',
        detail:
          'Small employers (fewer than 50 staff) pay 0% when the apprentice is aged 16 to 18 at the start.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Apprenticeship Costs"
      relatedPages={relatedPages}
      ctaHeading="Support your apprenticeship with Elec-Mate"
      ctaSubheading="Level 2 and Level 3 courses, AM2 preparation, portfolio guidance, and 8 AI agents — everything an apprentice needs to qualify first time. 7-day free trial, cancel anytime."
    />
  );
}
