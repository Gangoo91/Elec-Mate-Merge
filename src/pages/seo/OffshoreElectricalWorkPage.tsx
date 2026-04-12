import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  GraduationCap,
  BadgeCheck,
  Wrench,
  Wind,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Work', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Offshore Electrical Work', href: '/guides/offshore-electrical-work-uk' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'sectors', label: 'Offshore Sectors: Platforms, Wind, Subsea' },
  { id: 'survival-medical', label: 'BOSIET/FOET and OGUK Medical' },
  { id: 'standards', label: 'IEC 61892 Offshore Electrical Standard' },
  { id: 'atex-compex', label: 'ATEX and CompEx Offshore' },
  { id: 'pay-rates', label: 'Pay Rates' },
  { id: 'getting-in', label: 'Getting Into Offshore from a Domestic Background' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Offshore electrical work spans three main sectors: oil and gas platforms (fixed and floating production), offshore wind farms (fixed-bottom and floating), and subsea systems (umbilicals, power cables, subsea distribution). Each sector has different access requirements and working conditions.',
  'OPITO BOSIET (Basic Offshore Safety Induction and Emergency Training) is mandatory for travel to offshore oil and gas installations. FOET (Further Offshore Emergency Training) is the 4-yearly renewal. Offshore wind sites may accept an OPITO-approved wind-specific sea survival certificate instead.',
  'An OGUK (Offshore Energies UK, formerly UKOOA) medical examination is required before offshore work and must be renewed every 2 years. The medical is more thorough than a standard GP examination and tests cardiovascular fitness, vision, and hearing among other factors.',
  'Mobile offshore drilling units and fixed offshore platforms are governed by IEC 61892 (Mobile and fixed offshore units — electrical installations). This standard differs from BS 7671 in several important ways, particularly in its approach to area classification and safety-critical systems.',
  'Pay rates for offshore electricians range from £600 to £1,200 per day, depending on the sector, rotation schedule, and level of authorisation. Offshore wind O&M (operations and maintenance) typically operates day rates of £400–£600, while oil and gas platform work commands £700–£1,200 per day.',
];

const faqs = [
  {
    question: 'What is BOSIET and do I need it for offshore wind as well as oil and gas?',
    answer:
      'BOSIET (Basic Offshore Safety Induction and Emergency Training) is an OPITO-approved training programme that covers helicopter underwater escape training (HUET), sea survival, fire fighting, first aid, and manual handling for the offshore environment. It is mandatory for all personnel travelling to offshore oil and gas installations by helicopter over the UK Continental Shelf. The initial BOSIET certificate is valid for 4 years, after which a FOET (Further Offshore Emergency Training) renewal is required. For offshore wind sites, the requirement depends on the operator and method of access. Helicopter-accessed offshore wind sites (typically larger or more remote sites) require BOSIET or an approved equivalent. Vessel-accessed sites (via crew transfer vessel or CTV) typically require a GWO (Global Wind Organisation) Basic Safety Training course instead, which covers sea survival, fire awareness, first aid, manual handling, and working at heights. If you plan to work across both oil and gas and offshore wind, obtaining BOSIET and GWO BST covers both sectors.',
  },
  {
    question: 'What is the OGUK medical and how do I get one?',
    answer:
      'The OGUK (Offshore Energies UK) medical is a fitness-to-work examination required for all offshore workers on UK Continental Shelf installations. It is conducted by OGUK-approved medical practitioners (there are approved practitioners at clinics around the UK, particularly in Aberdeen, Great Yarmouth, and other offshore hubs). The examination includes: cardiovascular assessment (blood pressure, ECG), respiratory function, vision and hearing tests, blood tests (including blood glucose and cholesterol), and a general physical examination. The medical also assesses whether you are fit to be evacuated by helicopter in an emergency. Initial medicals are valid for 2 years; renewals are valid for 2 years for those under 40 and 1 year for those over 40. Certain medical conditions (severe cardiovascular disease, insulin-dependent diabetes, certain mental health conditions) may be disqualifying. OGUK medical costs typically £200–£350 and is usually paid by the employer.',
  },
  {
    question: 'How does IEC 61892 differ from BS 7671?',
    answer:
      'IEC 61892 (Mobile and fixed offshore units — electrical installations) is the international standard for electrical installations on offshore platforms, including mobile offshore drilling units (MODUs) and fixed production platforms. Key differences from BS 7671 include: IEC 61892 is a multi-part standard covering the entire electrical installation from generation to end use, including hazardous area classification; its approach to area classification for gas zones is based on IEC 60079 (the ATEX equipment standard series) rather than BS 7671 Part 7; IEC 61892 includes specific requirements for essential and emergency power systems (emergency generators, UPS, battery systems) that have no direct equivalent in BS 7671; cable selection requirements differ — IEC 61892 specifies cables that must meet fire performance requirements appropriate for the confined offshore environment; earthing systems offshore often use an insulated (IT) system rather than the TN-S or TN-C-S systems common in UK onshore installations, because a first earth fault in an IT system does not cause immediate disconnection, which is important for safety-critical systems offshore.',
  },
  {
    question: 'Is CompEx required for all offshore electrical work?',
    answer:
      'CompEx is required for any electrical work carried out in ATEX-classified hazardous areas offshore. On oil and gas platforms, most electrical work — including work in accommodation blocks, control rooms, and non-hazardous areas — does not require CompEx. However, any work on electrical systems in ATEX Zone 1 or Zone 2 areas (equipment areas, pump rooms, gas compressor areas, wellheads) requires CompEx certification. In practice, most oil and gas platform electricians hold CompEx EX01–EX04 because the boundaries of hazardous areas can be large and access restrictions based on CompEx status make operations complex. For offshore wind turbine work, there are no gas hazardous areas in turbines (no flammable gas is present), so CompEx is generally not required for wind turbine electrical work. Some wind farm substations may include certain ATEX-classified areas, but this is rare. The bottom line: CompEx is essential for oil and gas offshore work; it is not generally required for offshore wind work.',
  },
  {
    question: 'What rotation schedules do offshore electricians typically work?',
    answer:
      'Rotation schedules vary by platform and operator. The most common rotations in UK offshore oil and gas are: 2 weeks on / 2 weeks off (the most common for North Sea platform work); 3 weeks on / 3 weeks off (some larger installations); 28 days on / 28 days off (some FPSO vessels and international projects). On a 2/2 rotation, you spend 14 days on the platform followed by 14 days at home. Days on the platform are typically 12-hour shifts, 7 days a week. All meals, accommodation, and transport are provided by the operator. For offshore wind O&M, rotations are often more irregular and depend on weather windows for vessel access. Day work (sailing out in the morning, returning to port in the evening) is common on nearshore wind farms. Offshore wind technicians may also do 2/2 rotations on larger or more remote wind farms where accommodation is on a service operation vessel (SOV).',
  },
  {
    question: 'How do I get my first offshore job as an electrician?',
    answer:
      'The most common route is through an offshore recruitment agency specialising in oil and gas or offshore wind. Major agencies include Fircroft, NES Fircroft, Spencer Ogden, Brunel, and Airswift. Before applying, ensure you have: BOSIET (for oil and gas) or GWO BST (for wind); OGUK medical; CompEx EX01–EX04 (essential for oil and gas, not required for wind); a current ECS Gold card (showing your electrical qualification); and at least 5 years of post-qualification LV experience, ideally including industrial work. Many electricians make the transition via onshore industrial contracting (refineries, chemical plants, power stations) which gives them the CompEx certificate and industrial experience that offshore employers want. Your first offshore role may be as a maintenance electrician on a platform under the supervision of the platform lead electrician — once you have offshore experience on your CV, subsequent contracts become much easier to secure.',
  },
  {
    question: 'What are the typical pay rates for offshore electricians in the UK?',
    answer:
      'Offshore pay rates vary significantly by sector, experience, and authorisation level. Oil and gas platform electricians: £700–£1,000 per day on a 2/2 rotation. HV-authorised electricians: £900–£1,200 per day. Senior/Lead electricians with AP authorisation: £1,000–£1,400+ per day. Offshore wind O&M electricians (vessel-based): £400–£600 per day. Offshore wind commissioning electricians: £600–£900 per day. On a 2/2 rotation earning £800/day, the annual earnings (182 working days) are approximately £145,600 before tax. Offshore earnings are taxed in the normal way — there is no offshore tax exemption for UK Continental Shelf workers. However, some offshore contractors work through limited companies to manage tax efficiently.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/atex-hazardous-area-electrical-installations',
    title: 'ATEX Hazardous Area Electrical',
    description:
      'ATEX zones are pervasive on oil and gas platforms. Understand zone classification and Ex equipment selection.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/compex-qualification-guide',
    title: 'CompEx Qualification Guide',
    description:
      'CompEx EX01–EX04 is essential for oil and gas offshore electrical work. Full guide to the units and assessment.',
    icon: BadgeCheck,
    category: 'Guide',
  },
  {
    href: '/guides/high-voltage-electrical-work-uk',
    title: 'High Voltage Electrical Work UK',
    description:
      'Offshore platforms and wind farm substations operate HV systems. Understand AP/CP/SAP roles.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/nuclear-site-electrical-work',
    title: 'Nuclear Site Electrical Work',
    description:
      'If offshore is not for you, nuclear sites offer comparable pay with similar specialist requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for commissioning work on offshore wind installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'C&G 2391 is essential groundwork before pursuing offshore electrical careers.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Offshore Electrical Work in the UK: The Complete Guide',
    content: (
      <>
        <p>
          Offshore electrical work is the highest-paid sector available to UK electricians. Day rates
          of £700 to £1,200 on a 2/2 rotation (2 weeks on, 2 weeks off) mean that experienced
          offshore electricians can earn £140,000 to £200,000+ per year. The trade-off is a demanding
          working environment, the physical and psychological requirements of offshore life, and a
          significant upfront investment in specialist training and medical certification.
        </p>
        <p>
          The UK offshore electrical sector encompasses three distinct markets: oil and gas platforms
          (fixed and floating) on the UK Continental Shelf; offshore wind farms (fixed-bottom and
          floating, with the UK having the world's largest installed capacity); and subsea systems
          (power umbilicals, subsea distribution units, and high-voltage direct current (HVDC)
          export cables for wind farms). Each has different access requirements, technical standards,
          and working patterns.
        </p>
        <p>
          This guide covers the survival training and medical requirements, the applicable electrical
          standard (IEC 61892), the role of{' '}
          <SEOInternalLink href="/guides/atex-hazardous-area-electrical-installations">
            ATEX and CompEx
          </SEOInternalLink>{' '}
          offshore, pay rates, and the practical route from domestic or commercial electrical work
          into the offshore sector.
        </p>
      </>
    ),
  },
  {
    id: 'sectors',
    heading: 'Offshore Sectors: Platforms, Wind Farms, and Subsea',
    content: (
      <>
        <p>
          Understanding the differences between the three offshore electrical sectors helps you
          target your training investment correctly:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Oil and Gas Platforms</h3>
            <p className="text-white text-sm leading-relaxed">
              Fixed and floating production platforms on the UK Continental Shelf (North Sea and
              West of Shetland). Extensive ATEX zones. HV systems (11kV generation and distribution
              common). 2/2 or 3/3 rotations. BOSIET, OGUK medical, and CompEx required. Highest
              day rates (£700–£1,200+).
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Offshore Wind</h3>
            <p className="text-white text-sm leading-relaxed">
              Fixed-bottom (monopile) and floating wind farms. 33kV or 66kV array cables, HV
              offshore substations, turbine LV/MV systems. GWO BST or BOSIET depending on access
              method. No ATEX in turbines. Growing rapidly — UK has world's largest installed
              capacity. Day rates £400–£900.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Subsea</h3>
            <p className="text-white text-sm leading-relaxed">
              Power umbilicals, subsea distribution units, HVDC cables. Highly specialised — most
              subsea electrical work requires additional subsea engineering training. Vessel-based.
              Niche but well-paid. Entry typically from oil and gas electrical background with
              specialist subsea training.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'survival-medical',
    heading: 'OPITO BOSIET/FOET Survival Training and OGUK Medical',
    content: (
      <>
        <p>
          Before you can travel to an offshore oil and gas installation by helicopter, you must hold
          two certifications:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OPITO BOSIET</strong> — Basic Offshore Safety Induction and Emergency
                Training. Covers helicopter underwater escape training (HUET) in a pool, sea
                survival, fire fighting, first aid, and manual handling. 3 to 4 days. Valid for 4
                years. FOET (Further Offshore Emergency Training) is the renewal. Cost: £800–£1,200.
                Available at approved centres including RUK Training (Aberdeen, Great Yarmouth),
                Petrofac Training (Aberdeen), and others.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OGUK Medical</strong> — offshore fitness examination by an OGUK-approved
                practitioner. Cardiovascular, respiratory, vision, hearing, and blood tests. Valid 2
                years (1 year over 40). Cost: £200–£350. Clinics in Aberdeen, Great Yarmouth, Hull,
                Lowestoft, and other offshore hubs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>GWO BST (for offshore wind)</strong> — Global Wind Organisation Basic
                Safety Training. Sea survival, fire awareness, first aid, manual handling, and
                working at heights. Required for vessel-accessed wind sites. 5 units, typically 3
                to 4 days. Valid 2 years. Cost: £700–£1,000.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'standards',
    heading: 'IEC 61892: The Offshore Electrical Standard',
    content: (
      <>
        <p>
          BS 7671 does not apply to offshore installations — these are governed by IEC 61892
          (Mobile and fixed offshore units — electrical installations). This is an international
          standard that applies to all mobile offshore drilling units (MODUs), fixed production
          platforms, and semi-submersibles. Key differences from BS 7671:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>IT earthing systems</strong> — offshore installations commonly use IT (insulated) earth systems, where neither pole of the supply is connected to earth. A first fault does not cause disconnection — it triggers an insulation monitoring alarm. This protects against loss of power to critical safety systems from a single fault.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Essential and emergency power</strong> — IEC 61892 defines rigorous requirements for essential services (maintained during normal operations) and emergency services (maintained following a main power failure). Emergency power must be available within 45 seconds from an emergency generator or instantly from a UPS.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Cable fire performance</strong> — cables must meet enhanced fire performance requirements. Low smoke zero halogen (LSOH/LSZH) cables are standard. Halogen-containing cables are generally prohibited in accommodation and escape routes.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Hazardous area integration</strong> — IEC 61892 references IEC 60079 for hazardous area classification and equipment selection, making CompEx knowledge directly applicable to offshore ATEX zones.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'atex-compex',
    heading: 'ATEX and CompEx Offshore',
    content: (
      <>
        <p>
          On oil and gas platforms, ATEX hazardous areas are extensive. Wellheads, pump rooms, gas
          compressor areas, chemical injection areas, and many equipment modules are classified Zone
          1 or Zone 2. All electrical equipment in these areas must carry the appropriate Ex marking
          and be installed and inspected in accordance with BS EN 60079-14 and BS EN 60079-17.
        </p>
        <p>
          CompEx EX01–EX04 is therefore effectively mandatory for offshore oil and gas electricians.
          Most operators will not permit electricians to work in ATEX zones without a valid CompEx
          certificate. See the full guide to{' '}
          <SEOInternalLink href="/guides/compex-qualification-guide">
            CompEx qualification
          </SEOInternalLink>{' '}
          for units, training centres, costs, and the assessment process.
        </p>
        <p>
          For offshore wind turbines, there are no gas hazardous areas — there is no flammable gas
          present in a wind turbine nacelle. Some offshore wind substations may include minor ATEX
          areas (battery rooms, SF6 switchgear rooms) but these are generally managed with specific
          equipment selection rather than requiring the electrician to be CompEx-certified for
          routine maintenance.
        </p>
        <SEOAppBridge
          title="Document offshore electrical commissioning and inspection"
          description="Elec-Mate's certificate tools support the LV and auxiliary power documentation required during offshore wind turbine commissioning. Works offline on vessels and platforms."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'pay-rates',
    heading: 'Offshore Electrical Pay Rates',
    content: (
      <>
        <p>
          Offshore electrical work commands the highest day rates available to UK electricians:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Oil and gas platform electrician (maintenance):</strong> £700–£900/day on a 2/2 rotation.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Oil and gas HV-authorised electrician / lead electrician:</strong> £900–£1,200+/day.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Offshore wind O&amp;M electrician:</strong> £400–£600/day. Vessel-based or nearshore day work.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Offshore wind commissioning electrician:</strong> £600–£900/day. Turbine energisation, protection testing, loop checks.</span>
            </li>
          </ul>
        </div>
        <p>
          On a 2/2 rotation with 182 working days per year at £800/day, gross annual earnings are
          approximately £145,600. Offshore earnings attract UK income tax in the normal way — there
          is no exemption for UK Continental Shelf workers (unlike some international jurisdictions).
          Many offshore contractors work through limited companies for tax efficiency.
        </p>
      </>
    ),
  },
  {
    id: 'getting-in',
    heading: 'Getting Into Offshore from a Domestic Background',
    content: (
      <>
        <p>
          The direct jump from domestic or light commercial electrical work to offshore is difficult —
          most offshore operators want to see industrial experience. The recommended transition path is:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Step 1:</strong> Complete C&G 2391 (Inspection and Testing) if not already held. Aim for at least 5 years post-qualification LV experience.</span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Step 2:</strong> Move into onshore industrial contracting — refineries, chemical plants, power stations. This builds the industrial experience offshore employers want and earns you CompEx.</span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Step 3:</strong> Obtain BOSIET and OGUK medical. Register with offshore recruitment agencies (Fircroft, Spencer Ogden, Brunel, NES).</span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Step 4:</strong> Accept your first offshore rotation. Offshore wind commissioning can be a good entry point with lower barriers than oil and gas platform maintenance.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OffshoreElectricalWorkPage() {
  return (
    <GuideTemplate
      title="Offshore Electrical Work UK | Platforms, Wind Farms and Pay Rates"
      description="Complete guide to offshore electrical work in the UK. OPITO BOSIET/FOET, OGUK medical, IEC 61892, ATEX/CompEx requirements, pay rates of £600–£1,200/day, and how to get into offshore from a domestic background."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Guide"
      badgeIcon={Wind}
      heroTitle={
        <>
          Offshore Electrical Work in the UK:{' '}
          <span className="text-yellow-400">Platforms, Wind Farms, and Pay Rates</span>
        </>
      }
      heroSubtitle="Offshore electricians earn £600–£1,200/day. This guide covers OPITO BOSIET, OGUK medical, IEC 61892, ATEX/CompEx requirements, rotation patterns, and the practical route from domestic work into the offshore sector."
      readingTime={17}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Offshore Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Offshore Certifications and Electrical Records"
      ctaSubheading="Track BOSIET, OGUK medical, CompEx, and GWO BST expiry dates. Issue electrical certificates for commissioning work. Elec-Mate — 7-day free trial."
    />
  );
}
