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
  { label: 'Electrician in Lancaster', href: '/electricians/lancaster' },
];

const tocItems = [
  { id: 'overview', label: 'Lancaster Overview' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'property-types', label: 'Lancaster Property Types' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'pricing', label: 'Electrician Rates in Lancaster' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Lancaster is in Lancashire, England. Part P of the Building Regulations applies — notifiable electrical work must be carried out by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Lancaster City Council Building Control.',
  'Electricity North West (ENW) is the Distribution Network Operator for Lancaster. All new connections, supply upgrades, and G98/G99 generation notifications for solar PV and battery storage go through ENW.',
  'Lancaster has a significant student population from Lancaster University and the University of the Arts. This drives demand for EICR work in HMO properties, which must meet specific fire safety and electrical standards.',
  'The city has a Georgian and Victorian heritage housing stock around the city centre, castle, and Quay area. Many properties require careful rewiring to preserve original features.',
  'Labour rates in Lancaster are among the more modest in the North West, typically £38 to £55 per hour for a qualified registered electrician in 2026, reflecting the city\'s position outside the major urban centres.',
];

const faqs = [
  {
    question: 'Do I need Part P certification for electrical work in Lancaster?',
    answer:
      'Yes. Lancaster is in England and Part P of the Building Regulations 2010 applies. Notifiable work — including new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outdoors — must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Lancaster City Council Building Control before starting. An Electrical Installation Certificate (EIC) under BS 7671 must be issued on completion. Minor works that are not notifiable still require a Minor Electrical Installation Works Certificate.',
  },
  {
    question: 'Who is the DNO for Lancaster?',
    answer:
      'Electricity North West (ENW) is the Distribution Network Operator for Lancaster and the wider North West region, including Lancashire. For new connections, supply upgrades (for example, for EV chargers or heat pumps), and G98/G99 generation notifications for solar PV or battery storage, you deal with ENW. G98 notifications for systems up to 16A per phase are straightforward. G99 applications for larger generation systems require prior approval and can take 8 to 12 weeks to process.',
  },
  {
    question: 'What are the HMO electrical requirements in Lancaster?',
    answer:
      'Lancaster has a large HMO (Houses in Multiple Occupation) market driven by Lancaster University and University of the Arts Lancaster students. HMO landlords must hold a valid EICR with a satisfactory outcome. In addition, HMOs require fire alarm systems to BS 5839-6 at the appropriate category for the risk (typically Category D or L2/L3 for smaller HMOs, Category L1 for larger ones), emergency lighting in common areas for larger HMOs, adequate socket outlet provision per room, and appropriate RCD protection under BS 7671 regulation 411.3.3. Lancaster City Council HMO licensing team actively enforces these standards.',
  },
  {
    question: 'How much does an EICR cost in Lancaster?',
    answer:
      'An EICR in Lancaster typically costs £140 to £240 for a standard residential property, depending on size, number of circuits, and the age of the installation. HMO EICRs cost more, reflecting the larger number of circuits and the time required for a thorough inspection. Lancaster rates are broadly in line with the rest of Lancashire but slightly lower than Manchester. Landlords should budget for remedial work costs on top of the EICR fee — old wiring in Lancaster\'s Victorian and Edwardian housing stock often generates C2 (potentially dangerous) observations.',
  },
  {
    question: 'Does Lancaster University area generate specific electrical work?',
    answer:
      'Yes. The large student population in Moorlands, Bowerham, and around the campus creates consistent demand for EICR work in HMO and student rental properties. Landlords in these areas frequently need EICRs, fire alarm installations and maintenance, and consumer unit upgrades. The university itself generates occasional commercial electrical work. Electricians who build relationships with student letting agents in Lancaster can develop a reliable pipeline of repeat EICR and compliance work.',
  },
  {
    question: 'What is the typical cost of a consumer unit replacement in Lancaster?',
    answer:
      'A consumer unit replacement in Lancaster typically costs £500 to £850, including a new dual-RCD or full RCBO consumer unit, all necessary testing, and the EIC and Part P compliance certificate. The exact price depends on the number of circuits, the ease of access, and whether any remedial work is needed at the same time (for example, replacing aluminium wiring or adding earth bonding). Lancaster prices are slightly lower than the national average, reflecting the regional labour market.',
  },
  {
    question: 'What qualifications do I need to work as an electrician in Lancaster?',
    answer:
      'The requirements are the same as elsewhere in England. You need City & Guilds 2365 Level 2 and 3 (or NVQ Level 3 in Electrical Installation) as your core trade qualification, plus the 18th Edition (BS 7671:2018+A3:2024) wiring regulations certificate. To self-certify notifiable work under Part P without notifying Building Control on every job, you must be registered with NICEIC, NAPIT, or ELECSA. Registration requires assessment of your technical competence, documentation systems, and ability to produce compliant EICs and EICRs.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates on site — required for Part P notifiable work in Lancaster.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'EICRs for Lancaster HMO landlords, letting agents, and residential periodic inspections.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for rewires, new circuits, and EV charger installations in Lancaster properties.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Lancaster — ENW notification requirements and supply upgrade guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, HMO electrical upgrades, and consumer unit replacements with Lancaster pricing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with training modules covering inspection and testing for HMO and residential properties.',
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
    heading: 'Electrician in Lancaster: What You Need to Know',
    content: (
      <>
        <p>
          Lancaster is a small city in north Lancashire with a Georgian and Victorian heritage,
          a castle, and a strong university presence. For electricians, Lancaster offers a mix of
          residential work across an older housing stock, significant HMO and student rental
          electrical compliance work, and a growing demand for renewable energy installations and
          EV chargers in the surrounding rural and market town areas.
        </p>
        <p>
          The city centre has a concentration of Georgian and Victorian properties, many of which
          have been converted to student lets or HMOs. The surrounding areas of Morecambe, Carnforth,
          and the Lune Valley provide additional rural and semi-rural residential work. Electricians
          based in Lancaster often cover a wide geographical area, including the Forest of Bowland
          and the southern Lake District fringes, where travel time and access can affect pricing.
        </p>
        <p>
          This guide covers the regulatory requirements, DNO contacts, local property types, typical
          jobs, pricing, and practical advice for electricians working in and around Lancaster.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Lancaster',
    content: (
      <>
        <p>
          Lancaster is in England, so Part P of the Building Regulations 2010 applies. Notifiable
          electrical work must be handled through one of two routes:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person self-certification</strong> — registered members of NICEIC,
                NAPIT, or ELECSA can self-certify notifiable work and issue a compliance certificate
                directly. This is the standard route for qualified registered electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Control notification</strong> — unregistered electricians must
                notify Lancaster City Council Building Control before starting notifiable work. The
                council will arrange an inspection and issue a completion certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all electrical work must comply with BS
                7671:2018+A3:2024. RCD protection is required for socket outlet circuits under
                regulation 411.3.3 and for circuits in kitchens, bathrooms, and outdoors.
                Consumer unit replacements require a full RCBO or dual-RCD board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection (Section 631)</strong> — EICRs must comply with BS
                7671 Section 631 (Periodic Inspection and Testing). Landlords in Lancaster are
                required by The Electrical Safety Standards in the Private Rented Sector
                (England) Regulations 2020 to have a valid EICR every five years.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Lancaster Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Lancaster's housing stock ranges from Georgian city-centre terraces to modern estates
          and rural farmhouses in the surrounding area. Each has distinct electrical characteristics:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Georgian and Victorian City Centre</h3>
            <p className="text-white text-sm leading-relaxed">
              The area around the castle, Dalton Square, and the Quay has Georgian and Victorian
              properties, many converted to flats or HMOs. Solid stone or brick walls, lath-and-plaster
              ceilings, and limited floor void access make rewiring challenging. Old rubber-insulated
              wiring is common. Asbestos surveys are essential before invasive work in pre-1980s
              properties.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Student and HMO Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Moorlands, Bowerham, and Greaves have high concentrations of student lets and HMOs.
              These require regular EICRs, adequate socket provision per room, RCD protection, and
              appropriate fire alarm systems. HMO licensing conditions set by Lancaster City Council
              specify electrical safety requirements that must be evidenced.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Inter-War and Post-War Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Estates in Skerton, Westgate, and Ryelands feature inter-war and post-war housing
              with wiring that ranges from ageing rubber insulation to early PVC. Consumer unit
              upgrades and full rewires are common. Partial rewires following C1/C2 EICR
              observations are a regular job type.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Rural and Village Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              The Lune Valley, Forest of Bowland, and surrounding villages provide rural
              residential work. Rural properties often have TT earthing systems with earth rods,
              requiring appropriate RCD protection. Solar PV installations are popular in rural
              areas, requiring G98/G99 notification to ENW. Travel time from Lancaster adds cost
              to rural jobs.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Lancaster',
    content: (
      <>
        <p>
          The most in-demand electrical services in Lancaster in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICRs for landlords and HMOs</strong> — the student rental and HMO
                market generates consistent demand. Landlords must have a valid EICR every five
                years. HMO licence conditions often specify more frequent testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements</strong> — older Lancaster properties frequently
                need fuse boards upgrading to modern consumer units with RCD or RCBO protection.
                This is one of the most common residential jobs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV and battery storage</strong> — demand is growing in the surrounding
                rural areas where solar irradiance is reasonable and properties often have suitable
                roof space. G98 notification to ENW is required for small systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewires and partial rewires</strong> — Lancaster's older housing stock
                generates regular rewiring work. Partial rewires following EICR observations are
                especially common in the city's Victorian and inter-war properties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Lancaster',
    content: (
      <>
        <p>
          In Lancaster, as elsewhere in England, the key indicators of a qualified and compliant
          electrician are scheme registration and the ability to issue correct documentation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registered</strong> — search the public registers of both
                schemes for Lancaster-based electricians. Registration requires annual competency
                assessment and confirms the electrician can self-certify under Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct documentation</strong> — for notifiable work, you should receive
                both a Part P Building Regulations compliance certificate and a BS 7671 EIC. For
                an EICR, you should receive the full report with observations and a overall
                satisfactory or unsatisfactory result.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written quotation</strong> — always get a detailed written quote before
                work starts. Reputable Lancaster electricians will survey before quoting and will
                be transparent about any additional costs that may arise.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Lancaster (2026)',
    content: (
      <>
        <p>
          Lancaster electrician rates in 2026 are at the lower end of the North West range,
          reflecting the city's size and the regional labour market:
        </p>
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
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£330 — £480</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£65 — £100/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£500 — £850</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£95 — £150</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£3,000 — £5,000</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR</span>
                  <span className="font-semibold">£140 — £240</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£700 — £1,100</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Rural jobs around Lancaster should include a mileage allowance or higher day rate to
          reflect travel time to villages in the Lune Valley, Forest of Bowland, and surrounding
          areas. Rural properties with TT earthing and earth rod systems may also require
          additional testing time.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Lancaster',
    content: (
      <>
        <p>
          Lancaster is a good market for electricians who understand the HMO and student rental
          sector, can work efficiently in older properties, and are willing to cover the surrounding
          rural areas. The consistent demand for EICRs and consumer unit upgrades provides a
          solid base of repeat work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EICR Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICRs
                  </SEOInternalLink>{' '}
                  on site. For Lancaster's busy HMO market, fast and professional documentation
                  keeps landlords compliant and generates repeat business.
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
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to send professional quotes to Lancaster landlords and homeowners. Include
                  travel allowances for rural jobs and breakdowns for compliance certification.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Lancaster electricians"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the HMO, student rental, and rural property markets in Lancaster. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianLancasterPage() {
  return (
    <GuideTemplate
      title="Electrician in Lancaster | Local Electricians 2026"
      description="Find qualified electricians in Lancaster. Part P compliance, NICEIC registered, EICR for HMO landlords, consumer unit replacement, and local electrician rates for Lancaster in 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Lancaster"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Lancaster:{' '}
          <span className="text-yellow-400">Local Electricians 2026</span>
        </>
      }
      heroSubtitle="Lancaster's student HMO market, Victorian and Georgian housing stock, and rural surroundings demand electricians who understand Part P compliance, Electricity North West connections, and the full range of residential and rental electrical work."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Lancaster"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Lancaster Electricians"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for HMO compliance, Part P, and the realities of Lancaster's older housing stock. 7-day free trial."
    />
  );
}
