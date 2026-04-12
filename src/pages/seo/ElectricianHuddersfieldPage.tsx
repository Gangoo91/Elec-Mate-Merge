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
  { label: 'Electrician in Huddersfield', href: '/electricians/huddersfield' },
];

const tocItems = [
  { id: 'overview', label: 'Huddersfield Overview' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'pricing', label: 'Electrician Rates in Huddersfield' },
  { id: 'common-jobs', label: 'Common Electrical Jobs' },
  { id: 'regulations', label: 'Part P and Compliance' },
  { id: 'property-types', label: 'Huddersfield Property Types' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Huddersfield is in Kirklees, West Yorkshire, England. Part P of the Building Regulations applies — notifiable electrical work must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Kirklees Council Building Control.',
  'Northern Powergrid (NPG) is the Distribution Network Operator for Huddersfield and the wider West Yorkshire region. All new connections, supply upgrades, and G98/G99 generation notifications go through NPG.',
  'Huddersfield has a substantial Victorian and Edwardian stone terrace housing stock across the Colne and Holme Valleys. The ageing wiring in these properties drives consistent demand for EICRs, consumer unit upgrades, and full rewires.',
  'The University of Huddersfield generates significant HMO and student accommodation demand in areas around the university campus, creating recurring EICR and fire alarm compliance work for electricians.',
  'Labour rates in Huddersfield are competitive within West Yorkshire — typically £39 to £56 per hour for a qualified, registered electrician in 2026.',
];

const faqs = [
  {
    question: 'How much does an electrician charge in Huddersfield?',
    answer:
      'Huddersfield electrician hourly rates in 2026 typically range from £39 to £56 per hour for a qualified, NICEIC or NAPIT registered electrician. Day rates range from £265 to £385. Emergency call-out rates are higher — typically £68 to £108 per hour with a minimum call-out charge. Common fixed prices: consumer unit replacement £490 to £840, EICR for a 3-bed house £140 to £235, full rewire of a 3-bed semi £2,900 to £4,700, EV charger installation £700 to £1,050. Victorian stone property rewires command a premium due to the difficulty of cable routing in solid stone walls.',
  },
  {
    question: 'Do I need Part P certification for electrical work in Huddersfield?',
    answer:
      'Yes. Huddersfield is in England (Kirklees Metropolitan Borough Council area) and Part P of the Building Regulations 2010 applies to all domestic electrical work. Notifiable work — including new circuits, consumer unit replacements, and work in kitchens, bathrooms, and outdoors — must be self-certified by a registered competent person (NICEIC, NAPIT, or ELECSA) or notified to Kirklees Council Building Control before work starts. A Part P compliance certificate and a BS 7671 EIC must be issued on completion.',
  },
  {
    question: 'Who is the DNO for Huddersfield?',
    answer:
      'Northern Powergrid (NPG) is the Distribution Network Operator for Huddersfield and the whole of West Yorkshire. For new connections, supply upgrades, and G98/G99 generation notifications for solar PV or battery storage in Huddersfield, you deal directly with NPG. G98 notifications for generation up to 16A per phase are submitted online. G99 applications for larger generation require prior approval. Contact NPG for overhead and underground service cable issues in the Colne and Holme Valley areas.',
  },
  {
    question: 'What electrical work is most common in Huddersfield?',
    answer:
      'The most common electrical jobs in Huddersfield include EICR inspections for landlords (driven by the large rental market including student accommodation near the university), consumer unit replacements in the older Victorian and Edwardian terrace stock, full and partial rewires (particularly following EICR C2 observations in period properties), EV charger installations in residential and commercial settings, and fire alarm testing and maintenance in HMOs and commercial premises. The Colne and Holme Valleys also have a significant number of older rural properties requiring periodic rewiring.',
  },
  {
    question: 'How do I find a qualified electrician in Huddersfield?',
    answer:
      "Use the NICEIC contractor search at niceic.com or the NAPIT register at napit.org.uk, entering your Huddersfield postcode. These registers include only electricians who have been assessed annually for technical competence and who carry appropriate insurance. In Huddersfield's competitive market, personal recommendation from neighbours or local tradespeople is valuable. Always ask for a detailed written quote after a proper survey, and confirm you will receive a Part P compliance certificate and BS 7671 EIC on completion of notifiable work.",
  },
  {
    question: 'Are there any specific challenges with Huddersfield stone terrace properties?',
    answer:
      "Huddersfield's Victorian stone terraces present specific challenges for rewiring. Solid millstone grit walls cannot be chased for concealed cables without significant effort — floor voids, roof spaces, and surface-mounted trunking are the main cable routes. Many back-to-back and through terraces have limited floor void access. Original features including plaster ceilings may be at risk during rewiring. Pre-1980s properties should be assessed for asbestos before any invasive work. Rewires in Huddersfield stone terraces take longer and cost more than equivalent cavity-wall properties.",
  },
  {
    question: 'What are the EICR requirements for Huddersfield HMO landlords?',
    answer:
      'HMO landlords in Huddersfield must comply with both The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 (EICR every five years) and with additional requirements under Kirklees Council HMO licensing conditions. Mandatory and additional HMO licences in Kirklees may impose more frequent inspection cycles. HMO EICRs cover all circuits including communal areas, fire alarm circuits, and emergency lighting — they take significantly longer than standard domestic EICRs and should be priced accordingly.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates on site — required for Part P notifiable work in Huddersfield.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'EICRs for Huddersfield landlords, HMO operators, and residential periodic inspections across Kirklees.',
    icon: ShieldCheck,
    category: 'Certificate',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      "Size cables for rewires and new circuits across Huddersfield's Victorian terrace and valley housing stock.",
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installations in Huddersfield — Northern Powergrid G98 notification and supply guidance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Quote rewires, consumer unit upgrades, and EV charger installations with accurate Huddersfield pricing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 — inspection and testing for domestic and HMO properties in the Huddersfield area.',
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
    heading: 'Electrician in Huddersfield: What You Need to Know',
    content: (
      <>
        <p>
          Huddersfield is the principal town of Kirklees Metropolitan Borough in West Yorkshire,
          with a population of around 160,000 in the urban area and over 430,000 across the wider
          Kirklees district. Situated at the confluence of the Colne and Holme Valleys, the town
          developed as a major centre of the textile industry in the 19th century and retains a
          significant Victorian architectural heritage.
        </p>
        <p>
          For electricians, Huddersfield offers a solid and varied market. The town's dense
          Victorian and Edwardian stone terrace housing stock generates consistent demand for EICRs,
          consumer unit upgrades, and full rewires. The University of Huddersfield and its
          associated student and HMO accommodation creates a strong rental compliance market. The
          wider Kirklees area, including Dewsbury, Batley, Mirfield, and the rural Holme Valley
          villages, extends the territory for electricians based in Huddersfield town.
        </p>
        <p>
          This guide covers finding a reliable electrician in Huddersfield, typical costs for common
          jobs, what qualifications to look for, the regulatory framework, and the specific
          characteristics of the Huddersfield and Kirklees electrical market.
        </p>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Huddersfield',
    content: (
      <>
        <p>To find a qualified and trustworthy electrician in Huddersfield, use these methods:</p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registered</strong> — use the official contractor search at
                niceic.com or napit.org.uk with your Huddersfield postcode. Only registered
                electricians can self-certify notifiable work under Part P and issue valid
                compliance certificates without involving Kirklees Council Building Control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check scheme card</strong> — ask to see the electrician's scheme
                registration card before they start work. The card ID can be verified online against
                the NICEIC or NAPIT register.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Survey before quoting</strong> — reputable Huddersfield electricians will
                visit to survey the existing installation before providing a quote for rewires or
                consumer unit replacements. Any quote given without seeing the property should be
                treated with caution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confirm documentation on completion</strong> — for notifiable work, you must
                receive a Part P compliance certificate and a BS 7671 EIC. For an EICR, you must
                receive the full inspection report with all observations individually classified.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Recommendation from neighbours in the same street is particularly valuable for
          Huddersfield stone terrace properties — an electrician who has worked in your street
          before will already understand the construction and typical challenges.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrician Rates in Huddersfield (2026)',
    content: (
      <>
        <p>
          Huddersfield electrician rates are competitive within West Yorkshire. Typical 2026 rates:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-bold text-white">Hourly and Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Hourly rate (qualified)</span>
                  <span className="font-semibold">£39 — £56</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (sole trader)</span>
                  <span className="font-semibold">£265 — £385</span>
                </li>
                <li className="flex justify-between">
                  <span>Day rate (firm)</span>
                  <span className="font-semibold">£335 — £470</span>
                </li>
                <li className="flex justify-between">
                  <span>Emergency call-out</span>
                  <span className="font-semibold">£68 — £108/hr</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-white">Common Fixed-Price Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex justify-between">
                  <span>Consumer unit replacement</span>
                  <span className="font-semibold">£490 — £840</span>
                </li>
                <li className="flex justify-between">
                  <span>Single socket addition</span>
                  <span className="font-semibold">£90 — £148</span>
                </li>
                <li className="flex justify-between">
                  <span>Full rewire (3-bed semi)</span>
                  <span className="font-semibold">£2,900 — £4,700</span>
                </li>
                <li className="flex justify-between">
                  <span>EICR (3-bed house)</span>
                  <span className="font-semibold">£140 — £235</span>
                </li>
                <li className="flex justify-between">
                  <span>EV charger installation</span>
                  <span className="font-semibold">£700 — £1,050</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Stone terrace rewires and work in the Holme and Colne Valley properties can cost more than
          equivalent work in modern cavity-wall properties, reflecting the additional time required
          for cable routing through solid walls and difficult access. Always get a fixed-price quote
          after a proper survey.
        </p>
      </>
    ),
  },
  {
    id: 'common-jobs',
    heading: 'Common Electrical Jobs in Huddersfield',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">EICRs and Landlord Compliance</h3>
            <p className="text-white text-sm leading-relaxed">
              Huddersfield's large rental market, including significant HMO and student
              accommodation near the university, generates consistent EICR demand. HMO EICRs cover
              more circuits and take longer than standard residential EICRs. Kirklees Council
              actively enforces landlord compliance — electricians who build relationships with
              local letting agents benefit from a reliable pipeline.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Consumer Unit Upgrades</h3>
            <p className="text-white text-sm leading-relaxed">
              Old fuse boards are widespread across Huddersfield's Victorian and post-war housing
              stock. Consumer unit replacements to dual-RCD or RCBO boards are consistently among
              the most requested jobs. Many are triggered by EICR C2 observations or by property
              purchase surveys that reveal outdated protection.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Stone Terrace Rewires</h3>
            <p className="text-white text-sm leading-relaxed">
              Full and partial rewires in Huddersfield's stone terrace stock are a significant
              source of work. Rubber and early PVC-insulated wiring is common in properties built
              before 1970. Rewires require careful planning around solid stone walls and original
              features. Asbestos surveys are essential for pre-1980s properties before invasive work
              begins.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">EV Chargers and Solar PV</h3>
            <p className="text-white text-sm leading-relaxed">
              EV charger installations are growing steadily in Huddersfield's residential areas,
              particularly in the town's more prosperous suburbs and the Holme Valley villages.
              Solar PV is popular in rural and semi-rural properties with south-facing roofs. NPG
              G98 notifications apply for solar PV installations up to 16A per phase.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Part P and Electrical Compliance in Huddersfield',
    content: (
      <>
        <p>
          All domestic electrical work in Huddersfield must comply with Part P of the Building
          Regulations and BS 7671:2018+A3:2024. The local authority is Kirklees Metropolitan Borough
          Council:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person self-certification</strong> — NICEIC, NAPIT, or ELECSA
                registered electricians self-certify notifiable work and issue a Part P compliance
                certificate. This is the standard route in Huddersfield.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kirklees Building Control notification</strong> — unregistered electricians
                must notify Kirklees Council Building Control before starting notifiable work. The
                council inspects and issues a completion certificate, with an associated fee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all work must comply with BS
                7671:2018+A3:2024. RCD protection is required for all socket outlet circuits up to
                32A under Regulation 411.3.3, and for circuits in kitchens, bathrooms, and outdoors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord EICR requirements</strong> — private landlords in Kirklees must
                comply with The Electrical Safety Standards in the Private Rented Sector (England)
                Regulations 2020. Valid EICRs every five years, with C1/C2 defects remedied within
                28 days of an unsatisfactory report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Huddersfield Property Types and Electrical Characteristics',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Stone Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Huddersfield's dominant housing type — rows of solid millstone grit terraces across
              areas including Lockwood, Marsh, Moldgreen, Milnsbridge, and Slaithwaite. Solid stone
              walls make concealed wiring difficult. Floor voids and roof spaces are the primary
              cable routes. Many have ageing wiring and inadequate earthing.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Housing Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Areas including Brackenhall, Birkby, and Crosland Moor have 1950s–1970s housing
              estates with wiring approaching the end of its safe working life. Consumer unit
              upgrades and full rewires are common following EICRs. Cavity walls make cable routing
              easier than in solid stone terraces.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Holme and Colne Valley Villages</h3>
            <p className="text-white text-sm leading-relaxed">
              The villages of Holmfirth, Meltham, Marsden, and Slaithwaite in the Holme and Colne
              Valleys have older stone cottages and farmhouses with complex wiring histories. Some
              rural properties have TT earthing. Solar PV is popular in properties with south-facing
              rural roof space.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">HMOs and University Accommodation</h3>
            <p className="text-white text-sm leading-relaxed">
              Streets surrounding the University of Huddersfield have a high concentration of HMOs
              and student accommodation. These properties require rigorous electrical compliance —
              EICRs, fire alarm testing, and emergency lighting. HMO licensing conditions from
              Kirklees Council may impose additional requirements above the statutory five-year EICR
              cycle.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Huddersfield',
    content: (
      <>
        <p>
          Huddersfield provides a consistent and rewarding market for electricians. The substantial
          Victorian stone terrace housing stock generates reliable EICR, consumer unit, and rewiring
          work throughout the year. The university and its associated rental market creates
          recurring HMO compliance demand. The wider Kirklees area — including Dewsbury, Batley, and
          the Holme and Colne Valleys — extends the territory available to Huddersfield-based
          electricians.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">On-Site Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>{' '}
                  and <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink>{' '}
                  directly on site in Huddersfield. Same-day documentation keeps landlords compliant
                  and builds referrals in the competitive Kirklees rental market.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Huddersfield Rewires</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to accurately size cables for rewires in Huddersfield's stone terrace and valley
                  housing. Long cable runs in terrace properties require careful voltage drop
                  calculations to comply with BS 7671.
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
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to produce professional PDF quotes for Huddersfield homeowners, landlords, and
                  letting agents. Clear, itemised quotes at accurate West Yorkshire rates help win
                  work in a competitive market.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional electrical tools for Huddersfield electricians"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Built for the residential and rental electrical market in Huddersfield and Kirklees. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianHuddersfieldPage() {
  return (
    <GuideTemplate
      title="Electrician Huddersfield | Local Electricians Huddersfield & Kirklees"
      description="Find qualified electricians in Huddersfield. NICEIC and NAPIT registered, Part P compliant. EICRs for landlords and HMOs, consumer unit replacement, Victorian terrace rewires, and EV charger installation in Huddersfield 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Huddersfield"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Huddersfield:{' '}
          <span className="text-yellow-400">Local Electricians & Kirklees 2026</span>
        </>
      }
      heroSubtitle="Huddersfield's extensive Victorian stone terrace housing stock, large student and HMO rental market, and growing EV charger demand create consistent work for qualified electricians across Kirklees. Find NICEIC and NAPIT registered electricians in Huddersfield and the surrounding area."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Huddersfield"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Tools for Huddersfield Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, quoting, and on-site certification. Built for the residential and rental electrical market in Huddersfield and the wider Kirklees area. 7-day free trial."
    />
  );
}
