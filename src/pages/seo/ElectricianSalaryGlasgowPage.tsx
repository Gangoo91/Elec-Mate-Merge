import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  TrendingUp,
  Users,
  Briefcase,
  Star,
  ClipboardCheck,
  FileCheck2,
  Building2,
  Zap,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrician Salary Guides', href: '/guides/electrician-salary' },
  { label: 'Electrician Salary Glasgow', href: '/electrician-salary-glasgow' },
];

const tocItems = [
  { id: 'overview', label: 'Glasgow Electrician Salaries 2025' },
  { id: 'jib-secta', label: 'JIB-SECTA Rates for Glasgow' },
  { id: 'self-employed', label: 'Self-Employed Day Rates' },
  { id: 'specialist-work', label: 'Specialist Work Uplifts' },
  { id: 'apprentice-rates', label: 'Apprentice Rates' },
  { id: 'benefits', label: 'Benefits & Allowances' },
  { id: 'progression', label: 'Pay Progression' },
  { id: 'glasgow-vs-edinburgh', label: 'Glasgow vs Edinburgh Pay' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Employed electricians in Glasgow earn £35,000 to £47,000 per year at Approved Electrician grade under JIB-SECTA. Glasgow rates are broadly similar to Edinburgh but with slightly lower average market premiums due to a larger supply of qualified electricians.',
  "Self-employed electricians in Glasgow charge £380 to £700 per day for commercial work, rising to £600 to £900 for specialist industrial, maritime, and energy sector work. Glasgow's heavy industrial heritage creates demand for high-voltage and industrial electricians not commonly found in other Scottish cities.",
  'Glasgow is the commercial and industrial hub of Scotland. Major regeneration projects (Clyde Waterfront, Glasgow City Innovation District, Barclays campus at Tradeston) create substantial ongoing demand for commercial electricians.',
  "JIB-SECTA 2024/2025 Approved Electrician rate of £21.27 per hour applies across Scotland including Glasgow. Most Glasgow commercial contractors pay £22 to £25 per hour — slightly below Edinburgh's premium but above the JIB-SECTA minimum.",
  'SECTT delivers electrical apprenticeships in Glasgow through Glasgow Kelvin College and City of Glasgow College. The four-year SVQ Level 3 programme follows the same framework as Edinburgh, with the same ECS Gold Card outcome on completion.',
];

const faqs = [
  {
    question: 'What is the average electrician salary in Glasgow in 2025?',
    answer:
      "The average employed electrician salary in Glasgow in 2025 is approximately £35,000 to £47,000 per year at Approved Electrician grade. Glasgow is Scotland's largest city and offers a wide range of commercial and industrial work, making it one of the strongest markets for electricians in Scotland. Self-employed electricians in Glasgow typically earn £75,000 to £130,000 gross depending on specialism, sector, and hours worked.",
  },
  {
    question: 'How do Glasgow electrician rates compare to Edinburgh?',
    answer:
      'Glasgow electrician rates are typically 3 to 8% below Edinburgh rates for equivalent grades, primarily because Glasgow has a larger pool of qualified electricians relative to its market size. However, Glasgow offers unique opportunities in heavy industry, maritime, and energy sectors that Edinburgh cannot match. Specialist electricians (HV, instrumentation, industrial) can actually earn more in Glasgow than Edinburgh due to the concentration of industrial clients in the Clyde Valley.',
  },
  {
    question: 'What is SELECT and is it important for Glasgow electricians?',
    answer:
      "SELECT (Electrical Contractors' Association of Scotland) is Scotland's largest electrical trade body and operates the competent person scheme for domestic and small commercial electrical work in Scotland. SELECT membership allows Glasgow electricians to self-certify notifiable work under Scottish Building Standards without notifying the local authority verifier (equivalent to Building Control in England). Most Glasgow domestic customers and letting agents specifically request SELECT-registered electricians. Membership requires demonstrated competence and carries professional indemnity insurance requirements.",
  },
  {
    question: 'What do self-employed electricians charge per day in Glasgow?',
    answer:
      "Self-employed electricians in Glasgow typically charge: domestic work — £360 to £550 per day; commercial and retail — £430 to £650 per day; industrial and manufacturing — £500 to £750 per day; energy sector and maritime — £600 to £900 per day. Glasgow's extensive industrial estate at Hillington, the Clyde shipyards, and energy clients along the west coast provide consistent demand for industrial electricians at the higher end of these ranges.",
  },
  {
    question: 'What are the best-paid electrical specialisms in Glasgow?',
    answer:
      'In Glasgow, the highest-paying specialisms are: (1) High-voltage authorised person work for ScottishPower/SP Energy Networks and industrial clients — £650 to £950 per day; (2) Maritime and shipyard work at Scotstoun and Govan — £550 to £800 per day; (3) Instrumentation for chemical, food processing, and pharmaceutical plants — £500 to £750 per day; (4) Data centre and critical systems — £500 to £700 per day; (5) Industrial process control and PLC — £480 to £700 per day.',
  },
  {
    question: 'How does the apprenticeship process work for Glasgow electricians?',
    answer:
      'Glasgow electrical apprentices follow the SECTT framework, leading to SVQ Level 3 in Electrotechnical Services. Day-release training is provided at Glasgow Kelvin College (Springburn campus) and City of Glasgow College. The four-year programme combines on-the-job training with a JIB-SECTA registered employer and college study. Pay follows JIB-SECTA apprentice rates: Year 1 (16-18) — £7.56/hr; Year 2 — £11.55/hr; Year 3 — £14.29/hr; Year 4 — £16.48/hr. Upon completion and ECS Gold Card, progression to the JIB-SECTA Approved Electrician rate (£21.27/hr) follows immediately.',
  },
  {
    question: 'What are the overtime rates for Glasgow electricians?',
    answer:
      'Glasgow electricians working under JIB-SECTA terms receive the same overtime rates as Edinburgh: first four hours weekday overtime — time and a third (133%); thereafter — time and a half (150%); Saturday morning — time and a half (150%); Saturday afternoon — time and three quarters (175%); Sundays and Scottish public holidays — double time (200%). Major Glasgow construction projects (new Queen Elizabeth University Hospital extensions, Clyde Waterfront developments) regularly offer extensive overtime opportunities.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrician-salary-edinburgh',
    title: 'Electrician Salary Edinburgh',
    description:
      'Edinburgh JIB-SECTA rates, SECTT training, and Scotland electrician pay guide 2025.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/electrician-salary-bristol',
    title: 'Electrician Salary Bristol',
    description: 'Bristol JIB rates, tech economy premium, and Southwest pay guide 2025.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary',
    title: 'Electrician Salary UK Guide',
    description: 'National JIB rates, regional comparisons, and self-employed earnings.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote jobs professionally and maximise your day rate as a self-employed electrician.',
    icon: FileCheck2,
    category: 'Tool',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Electrician Salaries in Glasgow in 2025',
    content: (
      <>
        <p>
          Glasgow is Scotland's largest city and its commercial and industrial heart. The city's
          diverse economy — spanning manufacturing, energy, financial services, retail, and a
          rapidly growing technology cluster — creates strong and varied demand for qualified
          electricians across all sectors.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Electrician (employed)</strong> — £35,000 to £47,000 per year
                including JIB-SECTA allowances. The 2024/2025 JIB-SECTA rate of £21.27 per hour
                equates to approximately £41,500 per year. Most Glasgow commercial contractors pay
                £22 to £25 per hour — up to 18% above the JIB-SECTA minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Senior / Foreman level</strong> — £46,000 to £56,000. Major Glasgow projects
                including the Barclays Tradeston campus, Queen Elizabeth University Hospital
                expansions, and Clyde Waterfront regeneration employ large numbers of working
                foremen at £24 to £28 per hour.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employed</strong> — £380 to £900+ per day depending on sector.
                Glasgow's industrial and energy clients offer some of the highest day rates in
                Scotland. Experienced industrial electricians can earn £90,000 to £140,000 gross.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Glasgow's large and active electrical contracting sector — served by a high density of
          SELECT-member firms and a strong tradition of trade union membership — means the JIB-SECTA
          framework is broadly applied across commercial and industrial work.
        </p>
      </>
    ),
  },
  {
    id: 'jib-secta',
    heading: 'JIB-SECTA Pay Rates Applicable in Glasgow (2024/2025)',
    content: (
      <>
        <p>
          Glasgow electricians employed by JIB-SECTA member firms are paid on the Scotland JIB
          scale. These are minimum rates — Glasgow's competitive labour market typically results in
          actual pay 5 to 18% above the JIB-SECTA minimum.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Trainee (Apprentice)</strong> — £7.56 to £16.48 per hour over
                four years. Many Glasgow employers pay above these rates in Years 3 and 4.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician</strong> — £20.12 per hour (£39,200 per year at 37.5hr/week).
                NVQ/SVQ Level 3 qualified, ECS Blue or Gold Card. Entry grade for newly qualified
                Glasgow electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Electrician</strong> — £21.27 per hour (£41,480 per year). ECS Gold
                Card holder. Market rate in Glasgow is typically £22 to £25 per hour for most
                commercial roles. Industrial sites often pay £24 to £27 per hour.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Technician</strong> — £22.18 per hour (£43,250 per year). For
                engineers with HNC/HND or degree qualifications. Common in Glasgow's energy, marine
                engineering, and process industries.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Working Foreman</strong> — £23.09 per hour (£45,000 per year). Site
                supervisors on Glasgow's major regeneration projects regularly earn £25 to £29 per
                hour with overtime and site allowances.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The JIB-SECTA National Working Rule Agreement also governs holiday entitlement (24 days
          per year), pension scheme membership, overtime rates, and welfare entitlements for Glasgow
          electricians working under the agreement.
        </p>
      </>
    ),
  },
  {
    id: 'self-employed',
    heading: 'Self-Employed Electrician Day Rates in Glasgow',
    content: (
      <>
        <p>
          Self-employment is a popular choice for experienced Glasgow electricians. The city's
          diverse industrial and commercial base offers multiple routes to high day rates.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic work</strong> — £360 to £540 per day. Strong residential market in
                Glasgow's West End (Hyndland, Partick, Hillhead), Southside, and new-build
                developments on the Clyde waterfront.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial (retail, hospitality)</strong> — £430 to £640 per day. Glasgow's
                large retail sector (Buchanan Street, Braehead, Fort Kinnaird) and restaurant/bar
                scene generate consistent commercial electrical demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial and manufacturing</strong> — £500 to £750 per day. Hillington
                Industrial Estate, Blantyre, and the Clyde Valley manufacturing corridor provide
                industrial maintenance and project work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy and maritime</strong> — £600 to £900 per day. Offshore wind supply
                chain, Clyde shipyards (Scotstoun, Govan), and ScottishPower network work offer some
                of the highest day rates available to Glasgow electricians.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Self-employed Glasgow electricians netting 58 to 65% of gross earnings can achieve £60,000
          to £100,000 take-home in a productive year. Fast invoicing, efficient quoting, and minimal
          gap days between jobs are critical to maximising annual income.
        </p>
      </>
    ),
  },
  {
    id: 'specialist-work',
    heading: 'Specialist Work Uplifts in Glasgow',
    content: (
      <>
        <p>
          Glasgow's industrial heritage and proximity to Scotland's energy sector create specialist
          electrical opportunities that are largely unique to the city and West of Scotland.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High voltage authorised person</strong> — 25 to 45% above standard rate.
                ScottishPower/SP Energy Networks in Glasgow, Queen Elizabeth University Hospital
                (one of Europe's largest teaching hospitals), and Clyde industrial sites all employ
                HV APs at £65 to £95 per hour.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maritime and shipyard electrical</strong> — £550 to £800 per day. BAE
                Systems at Govan and Scotstoun builds Royal Navy vessels. Electrical work on naval
                vessels requires specialist clearance and skills commanding significant premiums
                over standard commercial rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Offshore wind supply chain</strong> — £600 to £900 per day. Scotland's
                offshore wind sector is booming. Glasgow serves as a logistics hub for ScotWind
                projects. Electricians with offshore safety (BOSIET, GWO) and HV experience are in
                very high demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Process and instrumentation</strong> — £480 to £750 per day. Food and drink
                manufacturing (Glasgow's substantial food processing sector), chemical plants, and
                water treatment works require I&C-qualified electricians.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'apprentice-rates',
    heading: 'Apprentice Rates for Glasgow Electricians',
    content: (
      <>
        <p>
          Glasgow electrical apprentices train under the SECTT framework at Glasgow Kelvin College
          and City of Glasgow College, following the SVQ Level 3 pathway. Pay follows JIB-SECTA
          apprentice rates.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 1 (aged 16 to 18)</strong> — £7.56 per hour. Approximately £14,700 per
                year. Glasgow's competitive apprentice market means some employers start at above
                minimum wage rates from day one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 1 (aged 19+)</strong> — £10.42 per hour. Approximately £20,300 per
                year. Adult entrants to the electrical trade are increasingly common in Glasgow.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 2</strong> — £11.55 per hour. Approximately £22,500 per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 3</strong> — £14.29 per hour. Approximately £27,900 per year. Most
                Glasgow employers pay above the minimum at Year 3 to retain good apprentices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 4</strong> — £16.48 per hour. Approximately £32,100 per year.
                Progression to Approved Electrician rate (£21.27/hr minimum) on SVQ Level 3
                completion and ECS Gold Card application.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Glasgow Kelvin College's Springburn campus is the main training provider for Glasgow
          electrical apprentices. City of Glasgow College's Riverside campus also delivers
          electrical training. SECTT provides field officers who visit employers and colleges to
          monitor apprentice progress throughout the programme.
        </p>
      </>
    ),
  },
  {
    id: 'benefits',
    heading: 'Benefits and Allowances for Glasgow Electricians',
    content: (
      <>
        <p>
          Glasgow electricians working under JIB-SECTA agreements receive a comprehensive benefits
          package. The total value of benefits often adds £4,000 to £9,000 of annual value beyond
          basic salary.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>JIB-SECTA Pension and Death Benefit Scheme</strong> — employer contributions
                of 5 to 6%. On a £43,000 Glasgow salary, this represents £2,150 to £2,580 of
                additional annual value. Death-in-service benefit is also included.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Holiday entitlement</strong> — 24 working days per year for JIB-SECTA
                members, rising to 25 days for many Glasgow employers after three years' service.
                Scottish bank holidays in addition to standard UK holidays.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tool allowance</strong> — £400 to £1,200 per year. Standard with most
                Glasgow commercial electrical contractors. SELECT members have access to the SELECT
                tool and equipment scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Van or mileage</strong> — works vans are standard for most Glasgow
                commercial site roles. Glasgow's congested roads and limited parking make a named
                van with a residents' permit particularly valuable for site-to-site working.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Travel allowances for away-from-base work</strong> — Glasgow electricians
                working on offshore wind projects, Highland construction, or away-from-home
                contracts often qualify for subsistence and lodging allowances of £45 to £90 per day
                in addition to their base day rate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'progression',
    heading: 'Pay Progression for Glasgow Electricians',
    content: (
      <>
        <p>
          Glasgow offers a well-defined career and pay progression path, with the industrial and
          energy sectors providing higher long-term ceiling salaries than domestic work alone.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>0 to 4 years</strong> — SECTT apprentice. £14,700 to £32,100 per year. SVQ
                Level 3 and ECS Gold Card application on completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>4 to 8 years</strong> — Approved Electrician. £35,000 to £47,000 in Glasgow.
                Target industrial and energy sector roles for faster pay progression. Add HV
                awareness, inspection and testing (C&G 2391), and EV charging qualifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>8 to 12 years</strong> — Senior Electrician / Working Foreman. £44,000 to
                £56,000 in Glasgow. Supervisory experience on major projects opens doors to
                contracts manager and project manager roles.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>12+ years</strong> — Contracts Manager or self-employment. Senior employed
                roles reach £58,000 to £75,000. Self-employed Glasgow electricians targeting energy
                and industrial sectors can earn £90,000 to £140,000 gross per year.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'glasgow-vs-edinburgh',
    heading: 'Glasgow vs Edinburgh: Electrician Pay Comparison',
    content: (
      <>
        <p>
          The two Scottish cities offer somewhat different earning profiles for electricians.
          Understanding these differences helps you target the most lucrative work for your skills.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edinburgh premium for government/finance work</strong> — Edinburgh's
                concentration of government buildings, financial services headquarters, and defence
                establishments creates a consistent premium of 5 to 12% over Glasgow for public
                sector and commercial office work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Glasgow premium for industrial/energy work</strong> — Glasgow's industrial
                legacy and energy sector proximity creates higher ceiling day rates for HV,
                maritime, and offshore electricians. The highest-paid Glasgow specialists can earn
                more than their Edinburgh counterparts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Similar domestic rates</strong> — domestic rates are broadly similar between
                the two cities, with Edinburgh's West End comparable to Glasgow's West End.
                Edinburgh's Morningside and Stockbridge match Glasgow's Newton Mearns and Bearsden
                for affluent domestic work rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commuting opportunity</strong> — Glasgow and Edinburgh are 50 minutes apart
                by train. Many Scottish electricians work in both cities, targeting Edinburgh for
                commercial office and government work and Glasgow for industrial and energy
                projects.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Maximise Your Glasgow Earnings',
    content: (
      <>
        <p>
          Glasgow's combination of large-scale commercial development, industrial maintenance work,
          and Scotland's expanding offshore wind sector makes it one of the most opportunity-rich
          cities in the UK for electricians with the right specialisms.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Invoice Faster</h4>
                <p className="text-white text-sm leading-relaxed">
                  Glasgow domestic electricians leave money on the table through slow quotes and
                  late invoices. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to send professional quotes and invoices from your phone before you leave the job
                  — and complete all your{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICR and EIC certificates
                  </SEOInternalLink>{' '}
                  on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Target Glasgow's Energy Sector</h4>
                <p className="text-white text-sm leading-relaxed">
                  HV authorisation and offshore safety certification (BOSIET, GWO) opens access to
                  some of the highest-paying electrical work in Scotland. Glasgow electricians with
                  energy sector credentials regularly earn £700 to £950 per day — significantly
                  above standard commercial rates. The ScotWind offshore wind programme will drive
                  demand for this skill set through to 2035 and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Glasgow electrical business smarter with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate to quote jobs, complete certificates on site, and manage their business from their phone. 7-day free trial."
          icon={PoundSterling}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianSalaryGlasgowPage() {
  return (
    <GuideTemplate
      title="Electrician Salary Glasgow 2025 | Electrician Pay Glasgow"
      description="Electrician salary guide for Glasgow 2025. JIB-SECTA Scotland rates, self-employed day rates, industrial and offshore energy uplifts, SECTT apprentice pay, benefits, and Glasgow vs Edinburgh pay comparison."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Salary Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrician Salary Glasgow 2025:{' '}
          <span className="text-yellow-400">JIB-SECTA Rates, Day Rates & Scotland Pay Guide</span>
        </>
      }
      heroSubtitle="Complete guide to electrician earnings in Glasgow. JIB-SECTA rates (£21.27/hr), self-employed day rates from £360 to £900+, specialist uplifts for industrial and offshore energy work, SECTT apprentice pay, and Glasgow vs Edinburgh salary comparison."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Salaries in Glasgow"
      relatedPages={relatedPages}
      ctaHeading="Maximise Your Glasgow Electrician Earnings with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to quote faster, complete certificates on site, and get paid sooner. 7-day free trial, cancel anytime."
    />
  );
}
