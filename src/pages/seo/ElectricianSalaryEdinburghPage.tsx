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
  { label: 'Electrician Salary Edinburgh', href: '/electrician-salary-edinburgh' },
];

const tocItems = [
  { id: 'overview', label: 'Edinburgh Electrician Salaries 2025' },
  { id: 'scotland-jib', label: 'Scotland JIB Rates' },
  { id: 'sectt', label: 'SECTT — Scottish Training' },
  { id: 'self-employed', label: 'Self-Employed Day Rates' },
  { id: 'specialist-work', label: 'Specialist Work Uplifts' },
  { id: 'apprentice-rates', label: 'Apprentice Rates' },
  { id: 'benefits', label: 'Benefits & Allowances' },
  { id: 'progression', label: 'Pay Progression' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Employed electricians in Edinburgh earn £37,000 to £50,000 per year at Approved Electrician grade under the JIB for the Electrical Contracting Industry in Scotland (JIB-SECTA). Edinburgh rates are typically 5 to 12% above the Scottish national baseline due to high city demand.',
  'The Scottish & Northern Ireland Joint Training Limited (SECTT) delivers electrical apprenticeships in Scotland, including Edinburgh, using the same four-year Electrotechnical framework as JTL in England — though with distinct Scottish qualifications (SVQ Level 3).',
  'Self-employed electricians in Edinburgh charge £400 to £700 per day for general commercial work, rising to £650 to £950 for specialist work in Edinburgh\'s government, defence, and research sectors.',
  'The JIB-SECTA 2024/2025 Approved Electrician rate is £21.27 per hour — slightly below the England JIB rate of £21.81 but Edinburgh employers regularly pay a city premium of 10 to 15% above the SECTA minimum.',
  'Scotland has its own approach to employer pension contributions through the JIB-SECTA Pension and Death Benefit Scheme. Employer contributions of 5 to 6% are standard, with additional holiday pay entitlements of 24 days per year for JIB-SECTA members.',
];

const faqs = [
  {
    question: 'What is the average electrician salary in Edinburgh in 2025?',
    answer:
      'The average employed electrician salary in Edinburgh in 2025 is approximately £37,000 to £49,000 per year at Approved Electrician grade. Edinburgh\'s status as Scotland\'s capital, combined with significant public sector, finance, and construction activity, pushes salaries above the Scottish national average. Self-employed electricians in Edinburgh typically earn £80,000 to £130,000 gross depending on specialism and hours worked.',
  },
  {
    question: 'How do JIB rates work in Scotland?',
    answer:
      'Scotland has its own Joint Industry Board — the JIB for the Electrical Contracting Industry in Scotland (JIB-SECTA), formerly the Scottish JIB. JIB-SECTA sets minimum pay rates for electricians working for member electrical contractors in Scotland. The 2024/2025 Approved Electrician rate under JIB-SECTA is £21.27 per hour — fractionally below the England JIB rate of £21.81 per hour, but Edinburgh\'s labour market typically delivers £23 to £26 per hour in practice. JIB-SECTA covers holiday pay, pension, welfare, and training standards as separate but parallel arrangements to the England JIB.',
  },
  {
    question: 'What is SECTT and how does it relate to electrical apprenticeships in Edinburgh?',
    answer:
      'SECTT (Scottish & Northern Ireland Joint Training Limited) is the sector\'s training body for Scotland and Northern Ireland, equivalent to JTL (Joint Training Limited) in England and Wales. SECTT administers the Electrotechnical Apprenticeship in Scotland, leading to SVQ Level 3 in Electrotechnical Services. Apprentices in Edinburgh study at local colleges including Telford College (now part of Edinburgh College) and take on-the-job training with a SECTT-registered employer. The four-year programme follows the same broad structure as the England equivalent.',
  },
  {
    question: 'What do self-employed electricians charge per day in Edinburgh?',
    answer:
      'Self-employed electricians in Edinburgh typically charge: domestic and small commercial — £380 to £580 per day; standard commercial and industrial — £450 to £700 per day; government, defence, and research facilities — £550 to £900 per day; specialist (HV, instrumentation, data centre) — £600 to £950 per day. Edinburgh\'s concentration of government buildings, universities, hospitals, and financial services creates a large and diverse commercial market.',
  },
  {
    question: 'What qualifications are required to work as an electrician in Edinburgh?',
    answer:
      'To work as an Approved Electrician in Edinburgh\'s commercial sector, you need: NVQ Level 3 / SVQ Level 3 in Electrotechnical Services (or equivalent); ECS Gold Card (ECS card scheme operates across the UK including Scotland); current BS 7671:2018 qualification (C&G 2382 18th Edition); and registration with a competent person scheme such as SELECT (the Scottish equivalent of NICEIC for domestic work). For public sector and government work, BPSS security clearance is often required.',
  },
  {
    question: 'What is SELECT and is it required for Edinburgh electricians?',
    answer:
      'SELECT (Electrical Contractors\' Association of Scotland) is Scotland\'s largest trade body for electrical contractors, covering over 1,000 member firms. SELECT is the Scottish equivalent of the Electrical Contractors\' Association (ECA) in England. SELECT membership includes a competent person scheme for domestic and small commercial work, meaning members can self-certify notifiable electrical work without notifying the local authority building standards department. Many Edinburgh domestic customers specifically request SELECT-registered electricians, making membership commercially valuable.',
  },
  {
    question: 'How does apprentice pay work for Edinburgh electrical apprentices?',
    answer:
      'Edinburgh electrical apprentices are paid under JIB-SECTA apprentice rates, which broadly mirror the England JIB rates. Year 1 (aged 16 to 18): approximately £7.56 to £8.60 per hour; Year 1 (aged 19+): around £10.42 per hour; Year 2: £11.55 per hour; Year 3: £14.29 per hour; Year 4: £16.48 per hour. Edinburgh College (Telford Campus) is the primary provider of day-release training for Edinburgh electrical apprentices. Many Edinburgh employers pay above these minimums in Years 3 and 4 to retain apprentices in a tight labour market.',
  },
  {
    question: 'What are the overtime rates for Edinburgh electricians?',
    answer:
      'JIB-SECTA overtime rates in Scotland mirror the England JIB structure: first four hours of weekday overtime — time and a third (133%); thereafter — time and a half (150%); Saturday morning — time and a half (150%); Saturday afternoon — time and three quarters (175%); Sundays and public holidays — double time (200%). Scottish public holidays differ from English ones — additional bank holidays such as St Andrew\'s Day (30 November) and the two-day New Year bank holiday attract double time.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrician-salary-glasgow',
    title: 'Electrician Salary Glasgow',
    description: 'Glasgow and West of Scotland electrician pay, day rates, and benefits 2025.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/electrician-salary-bristol',
    title: 'Electrician Salary Bristol',
    description: 'Bristol JIB rates, tech economy premium, and self-employed day rates 2025.',
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
    description: 'Quote jobs professionally and maximise your day rate as a self-employed electrician.',
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
    heading: 'Electrician Salaries in Edinburgh in 2025',
    content: (
      <>
        <p>
          Edinburgh is one of the UK's most expensive cities to live in outside London, and
          electrician salaries in the Scottish capital reflect this. The city's economy — anchored
          by financial services, public sector employment, tourism, and a growing technology cluster —
          generates strong demand for qualified electricians across domestic, commercial, and
          specialist sectors.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Electrician (employed)</strong> — £37,000 to £49,000 per year
                including JIB-SECTA allowances. The 2024/2025 JIB-SECTA rate of £21.27 per hour
                equates to approximately £41,500 per year at 37.5 hours per week. Edinburgh employers
                typically pay £23 to £26 per hour to attract and retain staff.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Senior / Foreman level</strong> — £48,000 to £58,000. Working foremen on
                Edinburgh's major projects (St James Quarter completion, Edinburgh Bioquarter,
                Scottish Parliament estate) regularly earn £52,000 to £62,000 with overtime.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employed</strong> — £500 to £900+ per day. Government facilities,
                defence estates, and Edinburgh's large university sector drive premium rates.
                Experienced self-employed electricians in Edinburgh can earn £90,000 to £140,000
                gross per year.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Scotland's distinct legal and regulatory framework — including Scottish Building
          Standards rather than English Building Regulations — creates a slightly different
          operating environment for Edinburgh electricians compared to their counterparts in
          England, though the core electrical standards (BS 7671) are identical.
        </p>
      </>
    ),
  },
  {
    id: 'scotland-jib',
    heading: 'JIB-SECTA: Scotland\'s Joint Industry Board',
    content: (
      <>
        <p>
          The Joint Industry Board for the Electrical Contracting Industry in Scotland (JIB-SECTA)
          is Scotland's equivalent of the England JIB, setting pay rates, working conditions, and
          benefit entitlements for electricians working for member contractors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Trainee (Apprentice)</strong> — £7.56 to £16.48 per hour,
                graduated over four years. SVQ Level 3 in Electrotechnical Services.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician</strong> — £20.12 per hour (£39,200 per year at 37.5hr/week).
                NVQ/SVQ Level 3 qualified, ECS Blue or Gold Card. Starting grade for newly
                qualified electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Electrician</strong> — £21.27 per hour (£41,480 per year). ECS
                Gold Card. Most common grade on Edinburgh commercial and industrial sites. Market
                rate in Edinburgh is typically £23 to £26 per hour.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Technician</strong> — £22.18 per hour (£43,250 per year). For
                those with HNC/HND or degree-level engineering qualifications. Common in
                Edinburgh's defence and research sectors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Working Foreman</strong> — £23.09 per hour (£45,000 per year). Edinburgh
                premium pushes this to £25 to £29 per hour on major projects.
              </span>
            </li>
          </ul>
        </div>
        <p>
          JIB-SECTA rates are reviewed annually and include provisions for holiday pay (24 working
          days per year), pension contributions, and the Scottish electrical welfare scheme.
          SELECT (Electrical Contractors' Association of Scotland) represents the majority of
          JIB-SECTA member firms in Edinburgh.
        </p>
      </>
    ),
  },
  {
    id: 'sectt',
    heading: 'SECTT: Scottish Electrical Apprenticeship Training',
    content: (
      <>
        <p>
          SECTT (Scottish & Northern Ireland Joint Training Limited) is the industry's training
          body for Scotland and Northern Ireland. It administers electrical apprenticeships across
          Scotland, including Edinburgh — the equivalent of JTL in England and Wales.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualification</strong> — SVQ Level 3 in Electrotechnical Services
                (Installation), delivered alongside the Modern Apprenticeship framework. Broadly
                equivalent to the English NVQ Level 3, both widely accepted by employers across
                the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edinburgh College provision</strong> — Edinburgh College (across Granton,
                Milton Road, and Midlothian campuses) is the primary day-release provider for
                Edinburgh electrical apprentices. The college also offers evening and part-time
                routes for adult upskilling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration and structure</strong> — four years of combined on-the-job
                training and college day-release. SECTT apprentices complete the same core
                competencies as JTL apprentices in England, including installation, testing, and
                fault-finding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS Card pathway</strong> — on completion of SVQ Level 3 and required
                AM2S (Assessment of Mechanical and Electrical Skills) assessment, Edinburgh
                apprentices apply for the ECS Gold Card via JIB-SECTA, granting access to
                commercial and industrial sites across the UK.
              </span>
            </li>
          </ul>
        </div>
        <p>
          SECTT-trained electricians are fully recognised across the UK. Edinburgh electricians
          with SVQ Level 3 and ECS Gold Cards can work on English and Welsh sites without
          additional qualification requirements.
        </p>
      </>
    ),
  },
  {
    id: 'self-employed',
    heading: 'Self-Employed Electrician Day Rates in Edinburgh',
    content: (
      <>
        <p>
          Self-employment is common among experienced Edinburgh electricians, particularly those
          targeting the city's public sector, defence, and financial services markets.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic and small commercial</strong> — £380 to £580 per day. Edinburgh's
                large private rental market and affluent areas (Morningside, Newington, Stockbridge)
                generate strong domestic demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial and industrial</strong> — £450 to £700 per day. Edinburgh's
                office market (including the New Town, Fountainbridge, and Quartermile developments)
                provides consistent commercial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Government and public sector</strong> — £500 to £800 per day. The Scottish
                Parliament, government buildings, NHS Lothian hospitals, and City of Edinburgh
                Council estates provide substantial public sector work. SC clearance adds a further
                10 to 20% premium.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist and defence</strong> — £600 to £950 per day. Edinburgh's
                proximity to RAF Leuchars, Faslane (naval base via Glasgow), and various defence
                research establishments creates opportunities for SC and DV-cleared electricians.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'specialist-work',
    heading: 'Specialist Work Uplifts in Edinburgh',
    content: (
      <>
        <p>
          Edinburgh's economy generates significant demand for specialist electrical skills,
          particularly from the public sector, universities, and the finance industry.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High voltage authorised person</strong> — 25 to 40% above standard rate.
                Edinburgh's large NHS Lothian hospitals (Royal Infirmary, Western General),
                Edinburgh Airport, and data centres require HV APs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data centre and critical systems</strong> — £500 to £800 per day. Edinburgh
                is home to several major Scottish data centre facilities serving the financial
                services sector. Critical systems electricians with UPS and generator experience
                are in persistent demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Security-cleared work (SC/DV)</strong> — 15 to 30% premium above standard
                commercial rates. Scottish government, justice, and intelligence facilities in and
                around Edinburgh require SC-cleared contractors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Historic building electrical work</strong> — Edinburgh's UNESCO World
                Heritage site and vast stock of listed Georgian and Victorian buildings demand
                electricians experienced in low-impact installation techniques. Specialist
                domestic rates of £450 to £650 per day.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'apprentice-rates',
    heading: 'Apprentice Rates for Edinburgh Electricians',
    content: (
      <>
        <p>
          Edinburgh electrical apprentices are paid under JIB-SECTA rates. The Scottish
          apprenticeship wage broadly mirrors the England JIB, with many Edinburgh employers
          paying above these minimums to attract quality entrants in a competitive market.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 1 (aged 16 to 18)</strong> — £7.56 per hour. Approximately £14,700
                per year. Most Edinburgh employers pay the National Minimum Wage for 16 to 18
                year olds at a minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 1 (aged 19+)</strong> — £10.42 per hour. Approximately £20,300 per
                year. Adult entrants to electrical apprenticeships in Edinburgh are increasingly
                common, particularly from construction and maintenance backgrounds.
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
                <strong>Year 3</strong> — £14.29 per hour. Approximately £27,900 per year. Many
                Edinburgh employers increase to £15 to £17 per hour at Year 3 stage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 4</strong> — £16.48 per hour. Approximately £32,100 per year.
                Progression to Approved Electrician grade (£21.27/hr JIB-SECTA minimum) follows
                immediately upon SVQ Level 3 completion and ECS Gold Card application.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'benefits',
    heading: 'Benefits and Allowances for Edinburgh Electricians',
    content: (
      <>
        <p>
          Benefits packages for Edinburgh electricians employed by JIB-SECTA member contractors
          include a range of allowances that add significant value beyond basic salary.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>JIB-SECTA Pension and Death Benefit Scheme</strong> — employer
                contributions of 5 to 6% of salary. On a £45,000 Edinburgh salary, this is
                £2,250 to £2,700 of additional annual value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Holiday entitlement</strong> — 24 working days per year for JIB-SECTA
                members (one day more than the England JIB standard of 23 days). Rising to 25
                days after five years' service with many Edinburgh employers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tool allowance</strong> — £500 to £1,200 per year. Most Edinburgh
                electrical contractors provide a tool allowance or direct tool provision. SELECT
                members also benefit from the SELECT tool and equipment scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Van or mileage</strong> — standard across most Edinburgh contractors.
                A works van has an effective annual value of £3,000 to £6,000. Edinburgh's
                parking costs make a van with a permit particularly valuable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish bank holidays</strong> — Scottish electricians get additional
                paid bank holidays compared to English counterparts, including St Andrew's Day
                and two days for New Year — all at double time if worked.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'progression',
    heading: 'Pay Progression for Edinburgh Electricians',
    content: (
      <>
        <p>
          Career progression in Edinburgh's electrical contracting sector follows the JIB-SECTA
          grade structure, with clear salary increments at each stage.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>0 to 4 years</strong> — SECTT apprentice. £14,700 to £32,100 per year.
                SVQ Level 3 and ECS Gold Card on completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>4 to 8 years</strong> — Approved Electrician. £37,000 to £49,000 in
                Edinburgh. Add specialist qualifications (18th edition, inspection and testing,
                HV awareness) to access premium public sector rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>8 to 12 years</strong> — Senior Electrician / Working Foreman. £48,000
                to £58,000. Supervisory responsibility, client liaison, and programme management
                on Edinburgh's commercial and public sector projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>12+ years</strong> — Contracts Manager or transition to self-employment.
                Edinburgh self-employed electricians with government and public sector experience
                earn £90,000 to £140,000 gross per year. SELECT membership and security clearance
                are key differentiators.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Edinburgh',
    content: (
      <>
        <p>
          Edinburgh offers excellent earnings potential for qualified electricians willing to target
          the city's public sector, heritage building, and growing technology markets. SELECT
          membership and ECS Gold Card are effectively non-negotiable for commercial work in the
          Scottish capital.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete Certificates Efficiently</h4>
                <p className="text-white text-sm leading-relaxed">
                  Edinburgh domestic electricians handling EICRs, EICs, and minor works
                  certificates can use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete all certification on site and send PDFs to clients before leaving
                  — meeting SELECT and JIB-SECTA quality standards.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Edinburgh's EV Opportunity</h4>
                <p className="text-white text-sm leading-relaxed">
                  Edinburgh has the highest EV ownership rate in Scotland. OZEV-authorised
                  EV charger installers charge £400 to £600 per day for residential and commercial
                  EV charger installations — a growing and lucrative specialism in the Edinburgh
                  market with strong support from the City of Edinburgh Council.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Edinburgh electrical business smarter with Elec-Mate"
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

export default function ElectricianSalaryEdinburghPage() {
  return (
    <GuideTemplate
      title="Electrician Salary Edinburgh 2025 | Electrician Pay Scotland"
      description="Electrician salary guide for Edinburgh 2025. JIB-SECTA Scotland rates, SECTT apprenticeships, employed vs self-employed earnings, specialist uplifts, apprentice rates, and benefits for Edinburgh electricians."
      datePublished="2025-01-01"
      dateModified="2025-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Salary Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrician Salary Edinburgh 2025:{' '}
          <span className="text-yellow-400">Scotland JIB Rates, SECTT & Pay Guide</span>
        </>
      }
      heroSubtitle="Comprehensive guide to electrician earnings in Edinburgh. JIB-SECTA Scotland rates (£21.27/hr), SECTT apprenticeships, self-employed day rates (£500 to £900+), specialist uplifts for government and defence work, and Edinburgh benefits packages."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Salaries in Edinburgh"
      relatedPages={relatedPages}
      ctaHeading="Maximise Your Edinburgh Electrician Earnings with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to quote faster, complete certificates on site, and get paid sooner. 7-day free trial, cancel anytime."
    />
  );
}
