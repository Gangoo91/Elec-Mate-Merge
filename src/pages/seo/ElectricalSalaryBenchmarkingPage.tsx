import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Users,
  Building2,
  TrendingUp,
  MapPin,
  Clock,
  GraduationCap,
  Briefcase,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/electrical-business-growth' },
  { label: 'Electrician Salary Benchmarking', href: '/electrical-salary-benchmarking' },
];

const tocItems = [
  { id: 'jib-grades', label: 'JIB Grade Rates 2025' },
  { id: 'apprentice-rates', label: 'Apprentice Pay by Year' },
  { id: 'london-weighting', label: 'London Weighting' },
  { id: 'regional-variations', label: 'Regional Variations' },
  { id: 'shift-allowances', label: 'Shift Allowances & Hazard Money' },
  { id: 'how-to-benchmark', label: 'How to Benchmark Your Pay' },
  { id: 'negotiating', label: 'Negotiating a Pay Rise' },
  { id: 'for-electricians', label: 'Running a Profitable Business' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Joint Industry Board (JIB) sets national minimum rates for electricians in England, Wales, and Northern Ireland. JIB rates are updated annually and apply to employers who are JIB members.',
  'The JIB Approved Electrician rate is the benchmark most often cited. At the 2025 rate of approximately £20.00 per hour, a full-time Approved Electrician earns around £38,000 to £42,000 gross per annum including typical overtime.',
  'London weighting under the JIB Working Rule Agreement (WRA) adds a premium of around £1.50 to £2.50 per hour above the national rate, depending on the Inner or Outer London zone.',
  'Shift allowances, hazard money, and travel time can add 15 to 30 per cent to basic earnings on industrial or commercial contracts, making total compensation significantly higher than the headline hourly rate.',
  'Electricians working outside the JIB — typically self-employed contractors — should benchmark against regional market rates rather than JIB national rates, which may understate actual market pay in tight labour markets.',
];

const faqs = [
  {
    question: 'What is the JIB Approved Electrician rate in 2025?',
    answer:
      "The JIB sets the Approved Electrician (AE) rate annually following negotiations between the Electrical Contractors' Association (ECA) and Unite the Union. For 2025, the JIB Approved Electrician national rate is approximately £20.00 per hour. This equates to a gross annual salary of approximately £37,000 to £40,000 based on a standard 37.5-hour week, rising to £42,000 to £46,000 with typical overtime. Check the JIB website (jib.org.uk) for the current confirmed rate, as it is updated each January.",
  },
  {
    question: 'What is the JIB Technician Electrician rate?',
    answer:
      'The JIB Technician Electrician grade sits above Approved Electrician. The Technician rate in 2025 is approximately £22.50 to £23.00 per hour at national rates, reflecting the additional qualifications and responsibilities of the grade. To achieve JIB Technician grade, an electrician typically needs to hold a relevant Level 4 qualification (such as the EAL Level 4 Award in the Design and Verification of Electrical Installations) and demonstrate a higher level of technical responsibility on site.',
  },
  {
    question: 'How much does an electrical apprentice earn in Year 1?',
    answer:
      'The JIB recommends Year 1 apprentice pay at 40% of the Approved Electrician rate. At a £20.00/hour AE rate, Year 1 apprentices earn approximately £8.00/hour. This is above the National Minimum Wage for apprentices (£6.40/hour from April 2024) but below the NMW for those aged 21+. The JIB scale rises to 50% in Year 2, 65% in Year 3, and 75% in Year 4. Actual pay varies by employer — many firms in tight labour markets pay above the JIB recommended scale to attract and retain apprentices.',
  },
  {
    question: 'Do JIB rates apply to self-employed electricians?',
    answer:
      "JIB rates are contractual minimum rates for employees working for JIB-registered employers in England, Wales, and Northern Ireland. They do not directly apply to self-employed electricians or sole traders. However, JIB rates serve as a useful benchmark — self-employed day rate electricians typically charge a premium above the equivalent employed rate to cover their self-employment costs (no employer's NI contribution, no holiday pay, no sick pay, funding their own tools and insurance). A typical self-employed day rate in 2025 for an Approved Electrician equivalent is £200 to £280 per day, depending on region and specialism.",
  },
  {
    question: 'What is London weighting for electricians?',
    answer:
      'The JIB Working Rule Agreement includes a London Allowance paid to electricians working within the Greater London area. The allowance is divided into Inner London and Outer London zones. In 2025, the Inner London addition is approximately £1.50 to £2.50 per hour above the national rate; the Outer London addition is slightly lower. This is in addition to any site-specific allowances. Electricians working on major London commercial or infrastructure projects may also negotiate additional site-specific payments above the JIB minimum.',
  },
  {
    question: 'What hazard money are electricians entitled to?',
    answer:
      'The JIB Working Rule Agreement provides for hazard money on work involving specific risks. Common hazard payments include: working in confined spaces, work at height above specified levels, work with live equipment, and work in contaminated environments. The specific rates are set out in the WRA and vary by hazard category. Some employers also pay additional discretionary hazard payments on certain site types (e.g., data centres, substations, chemical plants). Electricians should check the current WRA for the applicable rates and ensure hazard payments are correctly reflected in their payslips.',
  },
  {
    question: 'How do I negotiate a pay rise as an electrician?',
    answer:
      'The most effective approach is to benchmark your current pay against market rates before any negotiation. Research the JIB rate for your grade and your regional market rate. If you are being paid below market rate, this is your starting point. Prepare a case based on: your qualifications and grade, additional responsibilities you have taken on, your contribution to certifying work and attracting repeat clients, and comparable market rates. Request a formal meeting (not an informal conversation) and come prepared with written evidence. If your employer is a JIB member and is paying below the JIB minimum for your grade, you are entitled to the higher rate regardless of any negotiation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/hiring-electrical-apprentices',
    title: 'Hiring Electrical Apprentices',
    description: 'ESFA funding, JIB registration, and apprentice wage guidance.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/managing-electrical-subcontractors',
    title: 'Managing Electrical Subcontractors',
    description: 'Day rates, measure-and-value, and CIS for subcontractors.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/electrical-van-leasing',
    title: 'Electrician Van Leasing',
    description: 'Lease vs HP vs outright purchase — tax benefits and typical costs.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-business-growth',
    title: 'Growing Your Electrical Business',
    description: 'Strategies for scaling from sole trader to employer.',
    icon: Building2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'jib-grades',
    heading: 'JIB Grade Rates for 2025',
    content: (
      <>
        <p>
          The Joint Industry Board (JIB) is the industry body established jointly by the Electrical
          Contractors' Association (ECA) and Unite the Union to regulate employment conditions in
          the electrical contracting industry. JIB rates apply to employers who are JIB registered,
          covering the vast majority of NICEIC and NAPIT member companies.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technician Electrician</strong> — approximately £22.50 to £23.00/hour. The
                highest employed grade under the JIB. Typically holds Level 4 qualifications and
                takes technical responsibility for design, verification, or project management.
                Annual salary equivalent: approximately £43,000 to £47,000 at standard hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Electrician (AE)</strong> — approximately £20.00/hour nationally.
                The standard benchmark grade. Requires appropriate qualifications (typically City &
                Guilds 2357 or equivalent), a current BS 7671 qualification, and JIB assessment.
                Annual salary equivalent: approximately £37,000 to £40,000 at standard hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician</strong> — approximately £17.50 to £18.50/hour. A transitional
                grade for those who have completed their apprenticeship but have not yet achieved
                JIB Approved Electrician assessment. Annual salary equivalent: approximately £33,000
                to £36,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Improver</strong> — approximately £14.00 to £16.00/hour. For
                those with some electrical experience and qualifications but not yet fully
                qualified. Annual salary equivalent: approximately £27,000 to £31,000.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always check the current JIB rate schedule at jib.org.uk — rates are updated annually in
          January and the figures above are 2025 approximations. The JIB also publishes consolidated
          WRA documents covering all grades and allowances.
        </p>
      </>
    ),
  },
  {
    id: 'apprentice-rates',
    heading: 'Apprentice Pay by Year',
    content: (
      <>
        <p>
          JIB apprentice pay scales are expressed as a percentage of the Approved Electrician rate,
          reflecting the apprentice's increasing skill and value to the employer as the
          apprenticeship progresses.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 1 — 40% of AE rate</strong> — approximately £8.00/hour (2025). Legal
                minimum (NMW apprentice rate) is £6.40/hour; most JIB employers pay at or above the
                JIB recommended rate. Annual equivalent: approximately £15,600.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 2 — 50% of AE rate</strong> — approximately £10.00/hour. From Year 2,
                if the apprentice is 19 or older, the NMW for their age band applies instead if
                higher. Annual equivalent: approximately £19,500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 3 — 65% of AE rate</strong> — approximately £13.00/hour. The apprentice
                is now capable of undertaking most standard installation tasks under supervision.
                Annual equivalent: approximately £25,350.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 4 — 75% of AE rate</strong> — approximately £15.00/hour. Final
                apprenticeship year — the apprentice is preparing for their end-point assessment
                (EPA). Annual equivalent: approximately £29,250.
              </span>
            </li>
          </ul>
        </div>
        <p>
          On completion of the apprenticeship standard and JIB Approved Electrician assessment, pay
          should move to the full AE rate. Employers who do not upgrade pay on qualification risk
          losing their newly qualified electricians to better-paying competitors.
        </p>
      </>
    ),
  },
  {
    id: 'london-weighting',
    heading: 'London Weighting for Electricians',
    content: (
      <>
        <p>
          The JIB Working Rule Agreement recognises that the cost of living and working in London is
          significantly higher than in the rest of England. A London Allowance is paid on top of
          national rates for electricians working within Greater London.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inner London zone</strong> — covers the central London boroughs and adds
                approximately £1.50 to £2.50 per hour above the national rate. An Approved
                Electrician working in Inner London earns approximately £21.50 to £22.50/hour before
                shift allowances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outer London zone</strong> — covers outer boroughs and adds a slightly
                smaller premium. Check the JIB's Inner/Outer London boundary definition — some
                boroughs may surprise you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Market premium above JIB</strong> — in reality, the London market often pays
                significantly above JIB minimums, particularly on major commercial, infrastructure,
                and data centre projects. Self-employed Approved Electrician equivalent day rates in
                London are commonly £280 to £380 per day, well above the JIB implied rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ULEZ and congestion charge</strong> — electricians working in central London
                incur additional costs (ULEZ charge of £12.50/day, congestion charge of £15/day).
                These are employer costs under the WRA travel and expenses provisions and should be
                reimbursed. Self-employed contractors should factor these into their day rates.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regional-variations',
    heading: 'Regional Pay Variations Across the UK',
    content: (
      <>
        <p>
          The JIB national rate applies across England, Wales, and Northern Ireland, but actual
          market pay varies considerably by region due to differences in cost of living, labour
          demand, and the type of electrical work available.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South East (excluding London)</strong> — typically 5 to 10% above national
                JIB rates. Areas such as Surrey, Hertfordshire, and Berkshire have high labour
                demand driven by commercial and high-value residential work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Midlands and North of England</strong> — typically at or close to the JIB
                national rate, with some premium in major city centres (Manchester, Birmingham,
                Leeds) where commercial activity is high.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scotland</strong> — the SELECT (Scottish Electrical Charitable Training
                Trust) sets rates for electrical contractors in Scotland separately from the JIB.
                SELECT rates are broadly comparable to JIB but have a different grade structure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist sectors</strong> — data centres, offshore, nuclear, and rail
                electrification projects pay significant premiums above JIB rates due to specialist
                risk, extended hours, and location. Rates of £300 to £450+ per day are not unusual
                for experienced electricians on major infrastructure projects.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'shift-allowances',
    heading: 'Shift Allowances and Hazard Money',
    content: (
      <>
        <p>
          Shift allowances and hazard money can substantially increase total compensation above the
          basic hourly rate. Understanding what you are entitled to and ensuring your employer pays
          correctly is an important part of pay benchmarking.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overtime rates</strong> — the JIB WRA sets overtime premiums: typically
                time-and-a-quarter (1.25x) for Monday to Friday overtime, time-and-a-half (1.5x) for
                Saturday, and double time (2x) for Sundays and public holidays. On a project with
                regular overtime, total weekly earnings can be 20 to 30% above the standard hourly
                rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shift work allowances</strong> — electricians working early morning, late
                evening, or night shifts are entitled to shift premiums under the WRA. Night shifts
                (typically hours that are majority worked after midnight) attract the highest
                premium. Rotating shift patterns attract a blended premium.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hazard money</strong> — the WRA specifies categories of hazardous work
                attracting additional payments: work at height (above specified levels), confined
                spaces, contaminated environments, live working, and others. Always check whether
                hazard money is applicable to your work type and claim it if so.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Travel time and mileage</strong> — under the JIB WRA, travel time to and
                from site is paid at applicable rates. Mileage reimbursement applies when using your
                own vehicle. These entitlements are frequently underpaid — check your payslip
                against the WRA provisions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-benchmark',
    heading: 'How to Benchmark Your Pay',
    content: (
      <>
        <p>
          Effective pay benchmarking requires comparing like with like. A direct comparison of
          headline hourly rates is rarely sufficient — total compensation (including overtime, shift
          premium, travel, and benefits) is the correct measure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Establish your JIB grade</strong> — if you are employed by a JIB
                employer, confirm your current JIB grade. Your ECS Card shows your grade. If your
                qualifications justify a higher grade but you have not been assessed, apply to the
                JIB for grading — this could immediately increase your rate of pay.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Check current market rates</strong> — search live job listings on
                Indeed, Reed, and the ECA Jobs Board for comparable roles in your area. Note both
                the advertised rate and whether it is above or below JIB minimums. Trade forums and
                union shop stewards are also good sources of real-world pay data.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — Calculate total compensation</strong> — add up base pay, typical
                overtime earnings, shift premium, mileage reimbursement, and the value of employer
                pension contributions. Compare total compensation, not just hourly rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — Consider non-pay benefits</strong> — employer pension contributions
                above the auto-enrolment minimum, private medical insurance, income protection, and
                funded training and qualifications all have real financial value that should be
                factored into any comparison.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'negotiating',
    heading: 'Negotiating a Pay Rise',
    content: (
      <>
        <p>
          Once you have benchmarked your pay and identified a gap, the negotiation itself is
          straightforward if you are well-prepared. Approach it as a business conversation, not a
          personal request.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Request a formal meeting</strong> — do not raise pay in passing. Ask for a
                dedicated meeting with your manager. This signals that you are serious and gives
                both parties time to prepare.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lead with market data</strong> — present the JIB rate for your grade and
                comparable market rates. If your employer is paying below the JIB minimum for your
                grade, state this clearly — they have a legal obligation to pay the JIB rate if they
                are a JIB member.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quantify your contribution</strong> — list certificates issued in your name,
                projects you have led, apprentices you have mentored, and any additional
                qualifications gained since your last pay review. Make the business case for your
                value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Have an alternative if needed</strong> — knowing your market value gives you
                confidence. If your employer refuses a reasonable rise despite clear market
                evidence, it may be time to test the market. Qualified electricians are in short
                supply in most UK regions and a new employer can often offer considerably more.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Running a Profitable Electrical Business with Elec-Mate',
    content: (
      <>
        <p>
          For self-employed electricians and business owners, understanding market rates is only
          half the story — your effective hourly rate depends on how efficiently you quote, invoice,
          and recover costs. Elec-Mate's{' '}
          <SEOInternalLink href="/electrical-quoting-app">quoting tools</SEOInternalLink> help
          you price jobs correctly from day one.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Your True Hourly Rate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to build quotes that reflect your actual costs — materials, labour at your target
                  rate, travel, and margin. Never undercharge because you guessed your hours.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Track Profitability by Job Type</h4>
                <p className="text-white text-sm leading-relaxed">
                  Review completed job profitability in Elec-Mate to identify which types of work
                  deliver the best return. Focus your quoting effort on the work that earns you the
                  most per hour, not just the work you enjoy most.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, invoice, and track profitability with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, invoicing, electrical certificates, and job scheduling. Know your numbers and grow your business. 7-day free trial."
          icon={PoundSterling}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalSalaryBenchmarkingPage() {
  return (
    <GuideTemplate
      title="Electrician Salary Benchmarking UK 2025 | Pay Rates Guide"
      description="Complete UK electrician pay rates guide for 2025. JIB grade rates (Apprentice Year 1–4, Electrician, Approved Electrician, Technician), London weighting, regional variations, shift allowances, hazard money, and how to negotiate a pay rise."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Pay Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrician Salary Benchmarking UK 2025:{' '}
          <span className="text-yellow-400">JIB Pay Rates Guide</span>
        </>
      }
      heroSubtitle="JIB national grade rates for 2025, apprentice pay by year, London weighting, regional variations, shift allowances, hazard money, and a step-by-step guide to benchmarking your pay and negotiating a rise."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Pay Rates"
      relatedPages={relatedPages}
      ctaHeading="Run a more profitable electrical business with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting, invoicing, electrical certificates, and job scheduling. 7-day free trial, cancel anytime."
    />
  );
}
