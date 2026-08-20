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
  { id: 'jib-grades', label: 'JIB Grade Rates 2026' },
  { id: 'apprentice-rates', label: 'Apprentice Pay by Stage (2026)' },
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
  'The JIB Approved Electrician rate is the benchmark most often cited. At the rate effective 5 January 2026 of £20.08 per hour (National Standard, Transport Provided), a full-time Approved Electrician earns around £39,200 gross per annum at standard hours, and more with typical overtime.',
  'The JIB London Zone rate under National Working Rule 6.2 replaces the national rate rather than adding a flat premium. From 5 January 2026 the London Approved Electrician rate is £22.48 per hour (Transport Provided) against £20.08 nationally — a difference of £2.40 per hour.',
  'Shift allowances, hazard money, and travel time can add 15 to 30 per cent to basic earnings on industrial or commercial contracts, making total compensation significantly higher than the headline hourly rate.',
  'Electricians working outside the JIB — typically self-employed contractors — should benchmark against regional market rates rather than JIB national rates, which may understate actual market pay in tight labour markets.',
  'The ability to independently sign Electrical Installation Certificates is a regulated competence requirement under BS 7671 Regulation 644.5 — only a skilled person competent to verify BS 7671 compliance may compile and authenticate an EIC. This certification authority is a key reason Approved Electrician and Technician grades command a pay premium over the Electrician grade.',
];

const faqs = [
  {
    question: 'What is the JIB Approved Electrician rate in 2026?',
    answer:
      "The JIB sets the Approved Electrician (AE) rate annually following negotiations between the Electrical Contractors' Association (ECA) and Unite the Union. Effective 5 January 2026, the JIB Approved Electrician National Standard rate is £20.08 per hour where transport is provided (£21.19 own transport, £18.61 shop employed). At £20.08 per hour this equates to a gross annual salary of approximately £39,200 based on a standard 37.5-hour week, rising with typical overtime. Check the JIB website (jib.org.uk) for the current confirmed rate, as it is updated each January.",
  },
  {
    question: 'What is the JIB Site or Installation Technician rate?',
    answer:
      'The JIB Site or Installation Technician grade sits above Approved Electrician and is the highest employed grade. Effective 5 January 2026, the National Standard Technician rate is £22.70 per hour where transport is provided (£23.87 own transport, £21.24 shop employed), reflecting the additional qualifications and responsibilities of the grade. To achieve JIB Technician grade, an electrician typically needs to hold a relevant Level 4 qualification (such as the EAL Level 4 Award in the Design and Verification of Electrical Installations) and demonstrate a higher level of technical responsibility on site. Technician and Approved Electrician grades are the minimum required to independently compile and sign Electrical Installation Certificates under BS 7671 Regulation 644.5 — the ability to certify work is a key reason these grades command a pay premium.',
  },
  {
    question: 'How much does an electrical apprentice earn at Stage 1?',
    answer:
      'Under the JIB Industrial Determination, the Stage 1 apprentice rate from 5 January 2026 is £8.16 per hour at national standard rates (£9.14 in the JIB London Zone). This is just above the National Minimum Wage for apprentices (£8.00/hour from 1 April 2026) but below the NMW for those aged 21+. The JIB scale rises to £10.60 per hour at Stage 2, £13.05 at Stage 3, and £14.03 at Stage 4. Apprentice rates are a single rate covering all hours, including off-the-job training — the separate lower "at college" rate has been removed for England, Wales and Northern Ireland. Actual pay varies by employer — many firms in tight labour markets pay above the JIB rates to attract and retain apprentices.',
  },
  {
    question: 'Do JIB rates apply to self-employed electricians?',
    answer:
      "JIB rates are contractual minimum rates for employees working for JIB-registered employers in England, Wales, and Northern Ireland. They do not directly apply to self-employed electricians or sole traders. However, JIB rates serve as a useful benchmark — self-employed day rate electricians typically charge a premium above the equivalent employed rate to cover their self-employment costs (no employer's NI contribution, no holiday pay, no sick pay, funding their own tools and insurance). A typical self-employed day rate in 2026 for an Approved Electrician equivalent is £200 to £280 per day, depending on region and specialism.",
  },
  {
    question: 'What is London weighting for electricians?',
    answer:
      'National Working Rule 6.2 sets a separate London Zone rate for electricians working within the defined London area — it is a distinct rate table, not a percentage uplift. Effective 5 January 2026, the London Zone rates where transport is provided are £22.48 per hour for an Approved Electrician, £20.58 for an Electrician, and £25.47 for a Site or Installation Technician, against national rates of £20.08, £18.38 and £22.70 respectively. Electricians working on major London commercial or infrastructure projects may also negotiate additional site-specific payments above the JIB minimum.',
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
    heading: 'JIB Grade Rates for 2026',
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
                <strong>Site or Installation Technician</strong> — £22.70/hour (Transport Provided;
                £23.87 own transport, £21.24 shop employed). The highest employed grade under the
                JIB. Typically holds Level 4 qualifications and takes technical responsibility for
                design, verification, or project management. Annual salary equivalent: approximately
                £44,300 at standard hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Electrician (AE)</strong> — £20.08/hour nationally (Transport
                Provided; £21.19 own transport, £18.61 shop employed). The standard benchmark grade.
                Requires appropriate qualifications (typically City &amp; Guilds 2357 or
                equivalent), a current BS 7671 qualification, and JIB assessment. Annual salary
                equivalent: approximately £39,200 at standard hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician (including Domestic)</strong> — £18.38/hour (Transport Provided;
                £19.54 own transport, £16.95 shop employed). The grade for those who have completed
                their apprenticeship but have not yet achieved JIB Approved Electrician assessment.
                Annual salary equivalent: approximately £35,800.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trainee Electrician</strong> — Stage 3 £17.51/hour, Stage 2 £16.54/hour,
                Stage 1 £14.60/hour (Transport Provided). The Trainee stages sit between the
                apprenticeship and the Electrician grade. The Electrical Labourer rate matches
                Trainee Stage 1 at £14.60/hour.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The figures above are the National Standard rates effective Monday 5 January 2026, shown
          on the Transport Provided column unless stated otherwise. Always check the current JIB
          rate schedule at jib.org.uk — rates are updated annually in January. The JIB also
          publishes consolidated WRA documents covering all grades and allowances.
        </p>
      </>
    ),
  },
  {
    id: 'apprentice-rates',
    heading: 'Apprentice Pay by Stage',
    content: (
      <>
        <p>
          The JIB uses Stages 1 to 4 for apprentices, not years. Each stage rate is a single rate
          covering all hours, including off-the-job training — the separate lower &ldquo;at
          college&rdquo; rate was removed for England, Wales and Northern Ireland. Rates below are effective 5 January
          2026.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stage 1 — £8.16/hour</strong> (£9.14 in the JIB London Zone). The legal
                minimum (NMW apprentice rate from 1 April 2026) is £8.00/hour; JIB employers
                pay the determination rate or above. Annual equivalent: approximately £15,900.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stage 2 — £10.60/hour</strong> (£11.88 London Zone). From Stage 2, if the
                apprentice is 19 or older, the NMW for their age band applies instead if higher.
                Annual equivalent: approximately £20,700.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stage 3 — £13.05/hour</strong> (£14.62 London Zone). The apprentice is
                now capable of undertaking most standard installation tasks under supervision.
                Annual equivalent: approximately £25,450.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stage 4 — £14.03/hour</strong> (£15.72 London Zone). Final apprenticeship
                stage — the apprentice is preparing for their end-point assessment
                (EPA). Annual equivalent: approximately £27,350.
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
          significantly higher than in the rest of England. National Working Rule 6.2 sets a
          separate London Zone rate table for electricians working within the defined London area —
          it replaces the national rate rather than adding a flat allowance on top.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>London Zone rates (Transport Provided)</strong> — from 5 January 2026: Site
                or Installation Technician £25.47/hour, Approved Electrician £22.48/hour,
                Electrician £20.58/hour. Trainee Electrician Stage 3 is £19.55, Stage 2 £18.52, and
                Stage 1 / Electrical Labourer £16.37.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Difference against the national rate</strong> — the London Approved
                Electrician rate of £22.48 is £2.40/hour above the £20.08 national rate; for an
                Electrician the gap is £2.20 (£20.58 against £18.38). Check the JIB&apos;s London
                Zone boundary definition before assuming a site qualifies.
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
                <strong>Scotland</strong> — SELECT (the trade association for electrical contractors
                in Scotland, formerly known as SELECT — Promoting Electrical Safety) sets rates for
                Scottish electrical contractors separately from the JIB. SELECT rates are broadly
                comparable to JIB but have a different grade structure. Note: SECTT (Scottish
                Electrical Charitable Training Trust) is the separate apprentice training body and
                should not be confused with SELECT.
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
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lodging and responsibility money</strong> — from 5 January 2026 the lodging
                allowance is £53.09 per night, with holiday retention up to £17.46 per night
                (£122.22 per week). Responsibility money for an Approved Electrician placed in
                charge of work and supervising other operatives is not less than 50p and not more
                than £2.00 per hour; supervising apprentices or trainees alone does not qualify.
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
          <SEOInternalLink href="/electrical-quoting-app">quoting tools</SEOInternalLink> help you
          price jobs correctly from day one.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">True Cost of an Electrician to an Employer</h4>
          <p className="text-white/80 text-sm leading-relaxed mb-3">
            JIB grade rates are the starting point, not the total cost. When budgeting for an
            employed electrician, employers should account for the full overhead-inclusive labour
            rate. A JIB Approved Electrician at £20.08/hour carries significantly higher total
            employment cost once the following are factored in:
          </p>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>
              <strong className="text-white">Employer's National Insurance</strong> — 13.8% on
              earnings above the secondary threshold (£9,100/year for 2025/26), adding approximately
              £2.50 to £3.00/hour to the effective cost.
            </li>
            <li>
              <strong className="text-white">Pension contributions</strong> — minimum 3% employer
              contribution under auto-enrolment; many JIB employers pay the JIB pension scheme rate.
            </li>
            <li>
              <strong className="text-white">Holiday pay</strong> — 5.6 weeks' statutory minimum;
              the JIB WRA specifies holiday entitlement and pay arrangements.
            </li>
            <li>
              <strong className="text-white">Vehicle, tools, PPE, and insurance</strong> — van
              provision or mileage reimbursement, tool allowances, PPE supply, and employer's
              liability insurance are significant overheads that must be included when calculating
              the true cost of a field electrician. For small works and domestic contracting, these
              overheads can add 30 to 50% above the base hourly rate.
            </li>
          </ul>
          <p className="text-white/70 text-sm mt-3">
            For self-employed contractors, these same costs fall on the individual — which is why a
            comparable self-employed day rate must be set well above the implied employed hourly
            equivalent to be commercially viable.
          </p>
        </div>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
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
          title="2026 JIB rates for electricians"
          description="JIB rates effective 5 January 2026. Compare approved labour costs, hourly scales and grade benchmarks against your current pay structure."
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
      title="UK Electrician Salary 2026: JIB Rates + Pay"
      description="UK electrician pay in 2026: JIB grade rates (Apprentice to Technician), London Zone rates, and employed vs self-employed comparison."
      datePublished="2026-03-27"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Pay Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrician Salary Benchmarking UK 2026:{' '}
          <span className="text-yellow-400">JIB Pay Rates Guide</span>
        </>
      }
      heroSubtitle="JIB national grade rates effective 5 January 2026, apprentice pay by stage, London Zone rates, regional variations, shift allowances, hazard money, and a step-by-step guide to benchmarking your pay and negotiating a rise."
      readingTime={13}
      answerBox={{
        question: 'What is the average UK electrician salary in 2026?',
        answer:
          'A qualified electrician on the JIB Approved Electrician grade earns £20.08 per hour from 5 January 2026 (National Standard, Transport Provided) — roughly £39,200 gross a year at standard hours, and more with typical overtime. The higher Site or Installation Technician grade is £22.70 per hour, and the Electrician grade is £18.38. Apprentices start at £8.16 per hour at Stage 1, and self-employed Approved-equivalent day rates run £200–£280. In the JIB London Zone the Approved Electrician rate is £22.48 per hour.',
      }}
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
