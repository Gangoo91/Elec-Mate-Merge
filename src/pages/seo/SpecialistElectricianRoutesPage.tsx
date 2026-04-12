import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Star,
  Zap,
  Shield,
  GraduationCap,
  TrendingUp,
  Briefcase,
  PoundSterling,
  Globe,
  FileCheck2,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career Guides', href: '/guides/electrician-career-ladder-uk' },
  { label: 'Specialist Routes', href: '/guides/specialist-electrician-routes-uk' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'atex-compex', label: 'ATEX / CompEx' },
  { id: 'hv', label: 'High Voltage (HV)' },
  { id: 'nuclear', label: 'Nuclear' },
  { id: 'rail', label: 'Rail' },
  { id: 'offshore', label: 'Offshore' },
  { id: 'data-centre', label: 'Data Centre' },
  { id: 'bms', label: 'BMS and Controls' },
  { id: 'fire-security', label: 'Fire and Security' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Specialist electricians typically earn 30 to 80% more than general electrical operatives with equivalent years of experience.',
  'The eight main specialist routes for UK electricians are: ATEX/CompEx, HV, nuclear, rail, offshore, data centre, BMS/controls, and fire and security systems.',
  'Each route requires specific qualifications and licences beyond the standard electrical apprenticeship, typically taking 1 to 3 additional years to achieve.',
  'The highest-paying specialist routes in absolute terms are nuclear, offshore, and HV — all regularly achieving £65,000 to £100,000+ for operatives with 5 or more years of specialist experience.',
  'Specialist routes often offer more stable employment than general electrical work, as the pool of qualified specialists is small relative to demand.',
];

const faqs = [
  {
    question: 'Which specialist electrical route pays the most?',
    answer:
      'In absolute salary terms, the highest-paying specialist routes for UK electricians in 2026 are: nuclear (£65,000–£95,000+ employed, with significant shift and allowance supplements; nuclear sites operate 24/7 and pay substantial enhancements for shift, weekend, and on-call working); offshore oil and gas (£70,000–£110,000+ equivalent, typically on a 28/28 rotation — 28 days offshore, 28 days off; the effective day rate is very high but the working conditions are demanding); and HV (£70,000–£95,000+ for Authorised Persons — the Appointed Person/Authorised Person designation for HV switching requires formal training and sign-off by a Duty Holder and is a significant salary differentiator). CompEx and data centre specialisms also command 30 to 60% premiums above the general electrical rate, and offer excellent work-life balance compared to nuclear or offshore.',
  },
  {
    question: 'How do I get into CompEx / ATEX specialist work?',
    answer:
      'CompEx certification is the UK standard for working in explosive atmospheres (ATEX zones). The route to CompEx: (1) Complete a standard Level 3 electrical apprenticeship and gain at least 2 to 3 years of practical experience. (2) Complete the CompEx Foundation Units (Ex01–Ex04 for electrical) — these cover ATEX classification, inspection techniques, Ex protection concepts, and equipment selection. The units are assessed by practical observation and written examination. (3) Apply to CompEx (operated by TÜV SÜD) for certification. CompEx certification is valid for 5 years and requires a reassessment to renew. The training and assessment costs approximately £1,500 to £2,500 for the electrical units. CompEx-certified electricians are in demand across the UK petrochem sector, oil refining, pharmaceuticals, food manufacturing (dust hazard areas), and offshore.',
  },
  {
    question: 'What qualifications do I need to work as a High Voltage (HV) electrician?',
    answer:
      'There is no single UK qualification that certifies an HV electrician — HV authorisation is site-specific and employer-specific. The route typically involves: (1) Substantial LV electrical experience (typically 5+ years post-qualification). (2) Formal HV training — there are several training providers offering HV Switching and Protection courses (typically 3 to 5 days). (3) Internal HV Authorisation by the employer or Duty Holder — the employer formally assesses and authorises the individual to work on specific HV systems (switching, isolation, and work-on authorisation levels). (4) Some large DNOs (Distribution Network Operators) have their own internal training and authorisation programmes. The City & Guilds 2391 and a general electrical design background are valuable prerequisites. HV work in the UK is governed by the Electricity at Work Regulations 1989 and the employer\'s Safety Rules.',
  },
  {
    question: 'How do electricians break into the rail sector?',
    answer:
      'Getting into rail electrical work requires specific safety-critical training. The route: (1) Hold the standard electrical qualifications (18th Edition, NVQ Level 3, ECS Gold Card). (2) Complete Personal Track Safety (PTS) training — the mandatory qualification for accessing the railway trackside environment. PTS is offered by a number of approved training centres and takes 3 to 5 days including a medical. (3) For more complex rail electrical work (25kV overhead line, DC traction, signalling), additional specialist training is required — typically employer-specific training courses followed by competency sign-off. Rail work is often managed through framework contractors (Aecom, Colas Rail, Balfour Beatty) and Network Rail Approved Contractor status is required. London Underground (TfL) has its own competency framework and contractor approval process.',
  },
  {
    question: 'What is involved in data centre electrical work?',
    answer:
      'Data centre electrical work combines high electrical skills with knowledge of critical power systems — UPS (Uninterruptible Power Supply), standby generators, paralleling switchgear, PDUs (Power Distribution Units), and precision cooling systems. Key characteristics: (1) Highly process-driven — strict permit-to-work systems, change management procedures, and impact assessment processes govern all work in live data centres. (2) Shift and on-call working — data centres operate 24/7 and require 24/7 maintenance coverage. (3) Vendor-specific knowledge — UPS systems (Eaton, Vertiv, APC/Schneider) and generator control systems (DEIF, DSE, ComAp) each have specific operation and maintenance requirements requiring vendor training. (4) High standards of documentation — every test, measurement, and maintenance activity must be recorded in detail. Electricians moving into data centre work typically start as part of an operations team under a Tier 1 critical facilities contractor and progress through internal competency assessment.',
  },
  {
    question: 'Is fire and security engineering a good career move for an electrician?',
    answer:
      'Fire and security systems installation and maintenance is a well-established and growing specialist route for electricians. The sector benefits from: strong recurring revenue (mandatory fire alarm servicing, regular CCTV and access control maintenance contracts), regulatory demand (fire alarm installation and commissioning to BS 5839, BAFE SP203 certification, NSI or SSAIB registration for security work), and growing demand driven by commercial property compliance requirements, insurers, and residential security concerns. Electricians entering this sector typically take the FIA (Fire Industry Association) Level 3 Award in Fire Detection and Alarm Systems or the EAL Level 3 Fire Alarm Installation and Commissioning qualification. The transition from general electrical to fire and security typically takes 12 to 24 months of practical experience in the sector alongside the qualification.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-career-ladder-uk',
    title: 'Electrician Career Ladder UK',
    description: 'Complete career progression from apprentice to electrical director.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/master-electrician-uk',
    title: 'Master Electrician in the UK',
    description: 'Advanced qualifications and professional recognition in the UK context.',
    icon: Star,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-working-abroad-uk',
    title: 'Working Abroad as a UK Electrician',
    description: 'Specialist skills that command premium rates in the Middle East and beyond.',
    icon: Globe,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-london',
    title: 'Electrician Salary in London',
    description: 'Specialist role premiums in the London market.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Training',
    description: 'C&G 2391 — a foundation qualification for many specialist routes.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Professional electrical certification for all installation types.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const specialist = [
  {
    id: 'atex-compex',
    icon: Shield,
    colour: 'yellow',
    title: 'ATEX / CompEx — Explosive Atmospheres',
    salary: '30–50% above general electrical',
    typicalEarnings: '£50,000–£80,000 employed; £400–£600/day self-employed',
    entry: '2–3 years post-qualification + CompEx Foundation Units (Ex01–Ex04)',
    sectors: 'Oil and gas, petrochem, pharmaceuticals, food manufacturing, offshore',
    description:
      'CompEx certification is the UK standard for working in explosive atmospheres (ATEX classified zones). Work includes inspection, installation, and maintenance of Ex-rated equipment (Ex d, Ex e, Ex i, Ex p enclosures). The small pool of CompEx-certified UK electricians relative to demand creates a strong ongoing rate premium.',
  },
  {
    id: 'hv',
    icon: Zap,
    colour: 'red',
    title: 'High Voltage (HV)',
    salary: '40–80% above general electrical',
    typicalEarnings: '£70,000–£95,000+ employed',
    entry: '5+ years LV experience + employer HV authorisation programme',
    sectors: 'DNOs, large industrial, data centres, substations, renewable energy',
    description:
      'HV electricians (Authorised Persons) perform switching, isolation, and maintenance on systems above 1,000V AC. Authorisation is site- and employer-specific. The Electricity at Work Regulations 1989 govern HV work. Demand is driven by the energy transition — new grid connections, substations, and offshore wind O&M all require HV-authorised personnel.',
  },
  {
    id: 'nuclear',
    icon: Shield,
    colour: 'green',
    title: 'Nuclear',
    salary: '50–80% above general electrical',
    typicalEarnings: '£65,000–£95,000+ employed with significant shift supplements',
    entry: '3+ years experience + nuclear site vetting + site-specific competency training',
    sectors: 'EDF Nuclear, Rolls-Royce SMR, Sellafield, UKAEA',
    description:
      'Nuclear electrical work is the highest-regulated sector in the UK. All workers undergo detailed security vetting (CTC or higher). Nuclear Quality Assurance requirements (NQA-1, ISO 19443) add significant documentation and process discipline to every task. Nuclear decommissioning (Sellafield in particular) provides long-term, well-funded programmes. New build (Hinkley Point C, Sizewell C) will create substantial demand through the 2030s.',
  },
  {
    id: 'rail',
    icon: Zap,
    colour: 'blue',
    title: 'Rail',
    salary: '30–60% above general electrical',
    typicalEarnings: '£55,000–£80,000 employed; shift/weekend supplements add £10,000–£20,000',
    entry: 'PTS (Personal Track Safety) + Network Rail or TfL approved contractor',
    sectors: 'Network Rail, TfL (London Underground), HS2, tram networks',
    description:
      'Rail electrical work encompasses infrastructure (power supply, signal cable, platform electrical) and rolling stock. Work is typically carried out at night and weekends (engineering hours) to avoid disruption to services, which drives the shift supplements. The large HS2 programme and ongoing TfL capital investment provide long-term demand. A Safety Management System (SMS) and Sentinel card are required for rail work in addition to PTS.',
  },
  {
    id: 'offshore',
    icon: Globe,
    colour: 'blue',
    title: 'Offshore Oil and Gas / Wind',
    salary: '60–80%+ above onshore general electrical',
    typicalEarnings: '£70,000–£110,000+ equivalent (28/28 or 21/21 rotation)',
    entry: 'BOSIET (offshore survival), CompEx, MIST safety awareness + operator approval',
    sectors: 'North Sea oil and gas, offshore wind (installation and O&M)',
    description:
      'Offshore electrical work requires BOSIET (Basic Offshore Safety Induction and Emergency Training — the offshore survival certificate), CompEx certification for most oil and gas installations, and operator or employer approval. The rotation model (28 days on, 28 days off is common) means the effective annual time worked is roughly half the year, making the annual salary figure misleading — the effective day rate is very high. Offshore wind O&M is a growing sector with more manageable rotations than oil and gas.',
  },
  {
    id: 'data-centre',
    icon: Zap,
    colour: 'purple',
    title: 'Data Centre',
    salary: '30–60% above general electrical',
    typicalEarnings: '£55,000–£80,000 employed; significant shift and on-call supplements',
    entry: 'Strong LV/MV experience + critical systems training (UPS, generators, switchgear)',
    sectors: 'Co-location facilities, cloud provider (AWS, Azure, Google), enterprise',
    description:
      'Data centre electrical work demands exceptional process discipline — every task in a live data centre requires a detailed permit-to-work, impact assessment, and often a Change Advisory Board (CAB) approval. UPS, generator, and switchgear knowledge are the core technical requirements. The UK data centre market is one of the largest in Europe and growing rapidly with cloud infrastructure investment.',
  },
  {
    id: 'bms',
    icon: Zap,
    colour: 'green',
    title: 'Building Management Systems (BMS) and Controls',
    salary: '30–50% above general electrical',
    typicalEarnings: '£55,000–£80,000 employed',
    entry: 'Electrical background + BMS manufacturer training (Trend, Siemens, Honeywell, JCI)',
    sectors: 'Commercial buildings, hospitals, universities, data centres',
    description:
      'BMS engineers programme and commission control systems that manage HVAC, lighting, access control, and energy management in large buildings. The role combines electrical knowledge with IT, networking, and software skills. Manufacturer-specific training is the primary entry route. BMS engineers with commissioning experience on major commercial buildings are in consistently short supply.',
  },
  {
    id: 'fire-security',
    icon: Shield,
    colour: 'orange',
    title: 'Fire Detection and Security Systems',
    salary: '20–40% above general electrical',
    typicalEarnings: '£40,000–£65,000 employed; self-employed with maintenance contracts can earn significantly more',
    entry: 'FIA Level 3 Award or EAL Level 3 Fire Alarm qualification + BAFE/NSI/SSAIB registration',
    sectors: 'Commercial, residential, healthcare, public sector',
    description:
      'Fire alarm installation and commissioning to BS 5839, access control, CCTV, and intruder alarm installation. BAFE SP203 certification (for companies) and NSI or SSAIB membership (for security systems) are required for most commercial and insurance-grade installations. The recurring maintenance revenue model makes fire and security businesses highly attractive — clients are contractually obligated to service their systems annually, providing stable income.',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'Specialist Electrician Routes: Higher Earnings, Smaller Talent Pool',
    content: (
      <>
        <p>
          The majority of UK electricians work in general LV electrical installation and
          maintenance — domestic, commercial, or industrial. This is a large and well-served
          market. But there is a parallel set of specialist routes that pay significantly more,
          employ a much smaller pool of qualified workers, and offer greater job security because
          the combination of qualifications required is harder to replicate.
        </p>
        <p>
          Specialist routes typically deliver a 30 to 80% salary premium above general electrical
          rates. The trade-off is the investment in specialist qualifications, the often demanding
          working environments (offshore rotations, shift work on nuclear sites, night-shift rail
          work), and the time required to build the experience base that specialist employers and
          clients demand.
        </p>
        <p>
          This guide covers the eight main specialist routes for UK electricians — what each
          involves, what it pays, and how to enter each route.
        </p>
      </>
    ),
  },
  ...specialist.map(s => ({
    id: s.id,
    heading: s.title,
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid sm:grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-white font-semibold mb-1">Salary uplift</p>
              <p className="text-white">{s.salary}</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Typical earnings</p>
              <p className="text-white">{s.typicalEarnings}</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Entry route</p>
              <p className="text-white">{s.entry}</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Key sectors</p>
              <p className="text-white">{s.sectors}</p>
            </div>
          </div>
          <p className="text-white text-sm leading-relaxed">{s.description}</p>
        </div>
      </>
    ),
  })),
  {
    id: 'choosing',
    heading: 'Choosing the Right Specialist Route',
    content: (
      <>
        <p>
          The right specialist route depends on your existing experience, lifestyle preferences,
          and financial goals. Consider:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work-life balance</strong> — offshore (28/28 rotation) and nuclear (shift
                work) offer high earnings but significant time away or unsocial hours. Fire and
                security and BMS typically offer standard working hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Geographic flexibility</strong> — nuclear (Sellafield, Hinkley), offshore
                (Aberdeen, East Anglia), and rail (predominantly London and major cities) require
                geographic mobility or relocation. BMS, data centre, and fire/security are more
                geographically distributed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employment potential</strong> — CompEx, fire/security, and data centre
                maintenance are all well-suited to self-employment or building a specialist
                contracting business. HV, nuclear, and offshore are more exclusively employed-route
                specialisms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Time to entry</strong> — fire/security (12–18 months from general
                electrical) and BMS (12–24 months) are the fastest entry points. Nuclear and
                offshore require more investment in both experience and qualification time.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Document your specialist work professionally"
          description="Elec-Mate helps specialist electricians produce professional certificates and maintain a verifiable portfolio of complex installations. Start your 7-day free trial."
          icon={Star}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SpecialistElectricianRoutesPage() {
  return (
    <GuideTemplate
      title="Specialist Electrician Routes UK | ATEX, HV, Rail, Offshore & More"
      description="Overview of 8 specialist electrician routes in the UK — ATEX/CompEx, HV, nuclear, rail, offshore, data centre, BMS, and fire/security. Salary uplift, entry routes, and how each route compares."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Star}
      heroTitle={
        <>
          Specialist Electrician Routes UK:{' '}
          <span className="text-yellow-400">Higher Pay, Smaller Talent Pool</span>
        </>
      }
      heroSubtitle="Specialist electricians earn 30 to 80% more than general electrical operatives. This guide covers the eight main specialist routes — ATEX/CompEx, HV, nuclear, rail, offshore, data centre, BMS, and fire/security — with salary figures and entry routes for each."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Specialist Electrician Routes"
      relatedPages={relatedPages}
      ctaHeading="Build Your Specialist Career with the Right Tools"
      ctaSubheading="Elec-Mate supports specialist electricians with professional documentation, certification, and business management tools — whatever your specialist area."
    />
  );
}
