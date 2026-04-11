import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  Building2,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  GraduationCap,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrician in Peterborough', href: '/electricians/peterborough' },
];

const tocItems = [
  { id: 'overview', label: 'Peterborough Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'dno', label: 'UK Power Networks DNO' },
  { id: 'property-types', label: 'Peterborough Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'pricing', label: 'Electrician Rates in Peterborough' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Peterborough is in England (Cambridgeshire) — Part P of the Building Regulations applies. Notifiable electrical work must be certified by a competent person scheme member (NICEIC, NAPIT, ELECSA) or notified to Peterborough City Council Building Control.',
  'UK Power Networks (UKPN) is the Distribution Network Operator for Peterborough and the East of England. G98/G99 notifications, new connections, and EV charger notifications go through UKPN.',
  'Peterborough is one of the fastest-growing cities in the UK by population, with significant new-build development and a large immigrant workforce community creating diverse housing demand. New-build installation and modification work is plentiful.',
  'The city has a mix of Victorian terraces in the city centre, interwar semis, and large post-war estates alongside substantial new-build development at Hampton, Orton, and Cardea.',
  'Proximity to London (45 minutes by train) means Peterborough attracts some London commuters, creating demand for higher-specification work including EV chargers, smart home wiring, and premium kitchen and bathroom electrical fit-outs.',
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Peterborough?',
    answer:
      'Yes. Peterborough is in England, so Part P of the Building Regulations applies to all notifiable electrical work in dwellings. Notifiable work includes new circuits, consumer unit replacements, and work in special locations (kitchens, bathrooms, outdoors). NICEIC, NAPIT, or ELECSA-registered electricians can self-certify their work. Unregistered electricians must notify Peterborough City Council Building Control and pay an inspection fee before starting work.',
  },
  {
    question: 'Who is the DNO for Peterborough?',
    answer:
      'UK Power Networks (UKPN) is the Distribution Network Operator for Peterborough and the East of England. All connection applications, G98 notifications for solar PV and battery storage up to 16A per phase, G99 applications for larger systems, and EV charger notifications go through UKPN. Their connections portal handles applications online, and the emergency number for power cuts is 105.',
  },
  {
    question: 'How much does an electrician cost in Peterborough?',
    answer:
      'Peterborough electrician rates in 2026 are mid-range for England. Typical rates: hourly rate £38 to £55 for a qualified, registered electrician; day rate £260 to £380. Common fixed-price jobs: consumer unit replacement £520 to £880, full rewire (3-bed semi) £3,200 to £5,200, EICR (3-bed house) £160 to £260, single socket addition £95 to £145, EV charger installation £700 to £1,100. Rates are higher than the North East but lower than London or the South East.',
  },
  {
    question: 'What are the most common electrical jobs in Peterborough?',
    answer:
      "Consumer unit replacements on older properties, full rewires on Victorian terraces and 1960s–1970s housing, EICRs for rental properties, EV charger installations (strong demand given the commuter population), socket and lighting additions, and new-build snagging and modifications. Commercial electrical work is available from the large warehouse and distribution sector on Peterborough's business parks (Queensgate, Lynch Wood, and the A1 corridor).",
  },
  {
    question: 'Is there a lot of new-build electrical work in Peterborough?',
    answer:
      "Yes. Peterborough is one of the fastest-growing cities in the UK, and significant new-build development has been underway for decades in areas such as Hampton (one of the UK's largest new urban extensions), Orton, Cardea, and the northern growth corridor. Electricians working on new-build sites or doing modifications and additions on recently completed properties should ensure they understand the new-build warranty requirements and NHBC obligations that may apply.",
  },
  {
    question: 'How does the EV charger market look in Peterborough?',
    answer:
      'Peterborough has strong EV charger demand, driven by the commuter population and new-build estates with garage or off-road parking. Most domestic installations are 7.4 kW single-phase units requiring UKPN G98 notification as a generation notification is not required, but supply capacity should always be checked. OZEV-approved installer registration is required to claim the government grant on behalf of customers. Three-phase 22 kW chargers are growing in commercial and workplace settings in the business park areas.',
  },
  {
    question: "What should I know about Peterborough's rental market?",
    answer:
      "Peterborough has a large and diverse private rented sector, partly driven by the city's significant migrant worker community working in agriculture and food processing. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require five-yearly EICRs on all private rented properties. Landlords must provide copies of EICRs to tenants and to Peterborough City Council if requested. The city's rental market generates consistent EICR demand for electricians.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Electrical Installation Condition Reports for Peterborough rental properties — compliant with the 2020 Regulations.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on site for Part P notifiable work in Peterborough.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      "Size cables correctly for new circuits and rewires across Peterborough's varied housing stock.",
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Peterborough — UKPN notifications and OZEV grant requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Send professional PDF quotes for rewires, EICRs, and EV charger installations in Peterborough.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 — the qualification required to carry out and issue EICRs.',
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
    heading: 'Electrician in Peterborough: What You Need to Know',
    content: (
      <>
        <p>
          Peterborough is a cathedral city and unitary authority in Cambridgeshire, with a
          population approaching 220,000. It is one of the fastest-growing cities in the UK —
          population growth driven by internal migration, international migration, and a strong
          employment base in logistics, food processing, and distribution, aided by excellent rail
          and road connections (45 minutes to London King's Cross by train, at the junction of the
          A1 and A47).
        </p>
        <p>
          For electricians, Peterborough offers a highly varied workload. The large new-build sector
          in Hampton and other growth areas provides modification and addition work. The older
          housing stock in the city centre and inner suburbs needs upgrade and rewire work. The
          large private rental sector — one of the city's distinctive features given its population
          growth — creates consistent EICR demand. And the commuter belt population drives demand
          for premium installations including EV chargers, smart home systems, and kitchen and
          bathroom fit-outs.
        </p>
        <p>
          This guide covers Part P, the local DNO (UK Power Networks), pricing, and practical advice
          for electricians working in Peterborough.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Peterborough',
    content: (
      <>
        <p>Peterborough is in England, so Part P of the Building Regulations applies:</p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme</strong> — NICEIC, NAPIT, or ELECSA registration
                enables self-certification. The scheme notifies Peterborough City Council Building
                Control and issues the compliance certificate on the electrician's behalf.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all work must comply with BS
                7671:2018+A3:2024. RCD protection under Regulation 411.3.3 is mandatory for socket
                outlets up to 32A in dwellings and for circuits in locations of increased shock
                risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC on completion</strong> — every new circuit, rewire, or consumer unit
                replacement requires an Electrical Installation Certificate issued to the customer.
                The certificate must be provided within 30 days of completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR for rental properties</strong> — five-yearly EICRs required under the
                2020 Regulations. Section 631 of BS 7671 governs periodic inspection methodology.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'UK Power Networks: Peterborough DNO',
    content: (
      <>
        <p>
          <strong>UK Power Networks (UKPN)</strong> is the DNO for Peterborough and the East of
          England (also covering London and the South East):
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — apply online through UKPN's
                connections portal. New supplies for developments, service upgrades for EV chargers
                and heat pumps, and substation connections for larger commercial premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 for generation</strong> — solar PV and battery storage. G98 for
                systems up to 16A per phase is an online notification, processed promptly. G99 for
                systems above this threshold requires UKPN pre-approval.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing</strong> — Peterborough properties are predominantly supplied on
                TN-C-S (PME) systems. Always confirm the earthing arrangement at the supply intake,
                particularly in older properties near the city centre where TN-S supplies from
                original lead-sheathed cables may still exist.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Peterborough Property Types',
    content: (
      <>
        <p>
          Peterborough has a wide range of property types reflecting both its age and rapid growth:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Inner-city terraces in Millfield, Woodston, and around the city centre. Ageing wiring
              and rewirable fuse boards are common. Rewires and consumer unit replacements are
              frequent. Asbestos surveys recommended for pre-1985 properties.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              1950s–1980s semis and terraces in Bretton, Ravensthorpe, and Orton estates. Cavity
              brick construction, generally more amenable to concealed wiring. Consumer unit
              replacements and EICR work are the primary jobs in this stock.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New-Build Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Hampton (over 13,000 homes planned), Cardea, and northern growth areas. Modern
              construction with current consumer units, cavity wall insulation, and EV charger
              provisions. High demand for EV charger installations, additional circuits, and smart
              home modifications.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Logistics and Commercial</h3>
            <p className="text-white text-sm leading-relaxed">
              Major distribution and logistics warehousing on the A1/A47 corridor, including Amazon,
              DHL, and numerous food processing facilities. Three-phase supplies, large floor areas,
              and industrial-scale electrical installation and maintenance work.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Peterborough',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations</strong> — one of the highest-demand services in
                Peterborough due to the commuter population and new-build estate prevalence. OZEV
                registration essential for grant-assisted installs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements and rewires</strong> — steady demand from the
                large pre-1980s housing stock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rental property EICRs</strong> — Peterborough's large rental sector
                generates consistent five-yearly EICR demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New-build additions</strong> — homeowners in Hampton and Cardea regularly
                commission additional circuits, outdoor power, and smart home installations after
                moving in.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Peterborough (2026)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£38 — £55</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£260 — £380</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£70 — £105/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£520 — £880</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,200 — £5,200</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£160 — £260</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£700 — £1,100</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Peterborough',
    content: (
      <>
        <p>
          Peterborough is a strong market for electricians, particularly those who can serve both
          the growing new-build and commuter sector and the large rental market. The city's growth
          shows no sign of slowing, creating sustained long-term demand.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EICR Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> on
                  site. Get landlords their compliance documents the same day.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Win Peterborough jobs with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Send professional PDF quotes on survey day — essential in a competitive market.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Peterborough electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for electricians working across the East of England. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianPeterboroughPage() {
  return (
    <GuideTemplate
      title="Electrician in Peterborough | Local Electricians 2026"
      description="Find qualified electricians in Peterborough. Part P compliance, UK Power Networks DNO, NICEIC and NAPIT registered electricians, EICR for landlords, EV charger installation, and Peterborough electrician rates for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Peterborough"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Peterborough:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Peterborough's rapid growth, large rental sector, and mix of old and new housing create strong demand for rewires, EICRs, EV charger installations, and new-build electrical work. Find NICEIC and NAPIT registered electricians in Peterborough."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Peterborough"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Peterborough Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for electricians working across Cambridgeshire and the East of England. 7-day free trial."
    />
  );
}
