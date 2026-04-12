import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  FileCheck2,
  PoundSterling,
  Building2,
  AlertTriangle,
  Zap,
  GraduationCap,
  Calculator,
  Home,
  Landmark,
  Droplets,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-norwich' },
  { label: 'Norwich', href: '/guides/electrician-norwich' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Norwich' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Norwich' },
  { id: 'property-types', label: 'Norwich Property Challenges' },
  { id: 'dno-regulations', label: 'UKPN and Local Regulations' },
  { id: 'conservation-areas', label: 'Conservation Areas and Listed Buildings' },
  { id: 'flood-risk', label: 'Flood Risk and Electrical Safety' },
  { id: 'for-electricians', label: 'For Electricians Working in Norwich' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always verify your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme. You can check registration numbers online on the scheme provider websites.',
  'UKPN (UK Power Networks) is the Distribution Network Operator for Norwich and the whole of East Anglia. Any work affecting your incoming supply, meter position, or requiring a new connection must be coordinated with UKPN.',
  'Norwich has one of the highest concentrations of medieval and Tudor buildings in England, with over 1,500 listed buildings. Electrical work in these properties often requires listed building consent and specialist approaches.',
  'Norwich electrician rates are broadly in line with the East Anglian average — typically £40 to £55 per hour — but heritage property work commands a premium due to the additional planning and care required.',
  'Properties in low-lying areas of Norwich near the River Wensum and the Broads are at increased flood risk. Electrical installations in flood-prone properties should position consumer units, sockets, and wiring above likely flood levels in accordance with BS 7671 Regulation 411.3.3 for RCD protection.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Norwich?',
    answer:
      'Norwich electrician day rates in 2026 typically range from £250 to £350 for a qualified, registered electrician. Hourly rates are usually £40 to £55 per hour, with emergency call-out rates of £70 to £100 per hour. Common fixed-price jobs include: consumer unit replacement £500 to £800, additional double socket £100 to £160, full house rewire (3-bed Victorian terrace) £4,000 to £6,500, EICR £180 to £300. Heritage property work is at the upper end due to the additional care and specialist approaches required. Always get at least three written quotes for any significant work.',
  },
  {
    question: 'Who is the DNO for Norwich?',
    answer:
      'UKPN (UK Power Networks) is the Distribution Network Operator for Norwich and the whole of Norfolk, Suffolk, and East Anglia. For new connections, supply upgrades (for example, from single-phase to three-phase for EV chargers or heat pumps), meter relocations, or generation connections (solar PV, battery storage), you apply through UKPN. G98 notification is required for small-scale generation up to 16A per phase, and G99 application for larger systems. UKPN processing times in East Anglia are typically 4 to 10 weeks depending on the complexity of the work.',
  },
  {
    question: 'Do I need planning permission for electrical work in Norwich?',
    answer:
      'Internal electrical work generally does not need planning permission. However, Norwich has extensive conservation areas covering the city centre, the Cathedral Close, and many residential streets. External electrical work in conservation areas — including EV charger installations, external lighting, solar panels, and visible cable routes — may require planning permission from Norwich City Council. If your property is listed (Norwich has over 1,500 listed buildings), listed building consent is required for any work that affects the character of the building, including some internal electrical alterations.',
  },
  {
    question: 'What qualifications should a Norwich electrician have?',
    answer:
      'A qualified electrician should hold City & Guilds 2365 or 2357 (or NVQ Level 3 in Electrical Installation) as their core qualification, plus current BS 7671:2018+A3:2024 (18th Edition Wiring Regulations) certification. For notifiable work under Part P of the Building Regulations, they must be registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. A gold ECS (Electrotechnical Certification Scheme) card confirms their qualification level. Ask for their registration number and verify it online before any work begins.',
  },
  {
    question: 'How long does a full rewire take in a Norwich period property?',
    answer:
      'A full rewire of a typical 3-bedroom Norwich Victorian or Edwardian terrace takes 6 to 9 working days with a team of two electricians, plus 1 to 2 days for testing and certification. Period properties add complexity due to lath-and-plaster walls, higher ceilings, and the need to work around original features. Many Norwich properties also have multiple previous partial rewires from different eras, which can add time for tracing and removing old cabling. Allow additional time if the property has a cellar conversion, loft room, or is listed.',
  },
  {
    question: 'Is my Norwich property at flood risk and how does this affect electrics?',
    answer:
      'Norwich has areas at flood risk, particularly near the River Wensum and in low-lying parts of the city. The Environment Agency flood maps show the risk for specific postcodes. In flood-prone properties, electrical installations should be designed to minimise damage and danger during flooding. BS 7671 recommends positioning consumer units, sockets, and fixed wiring above anticipated flood levels where possible. RCD protection complying with Regulation 411.3.3 is essential. An electrician experienced with flood-risk properties can advise on resilient installation methods, including raising socket outlets and using surface-mounted wiring that can be more easily inspected and dried after flooding.',
  },
  {
    question: 'Can I get an EV charger installed at my Norwich home?',
    answer:
      'Yes. A 7kW home EV charger installation in Norwich typically costs £700 to £1,200 including the charger unit, installation, earthing, and Part P certification. Your electrician will need to assess whether your existing supply has sufficient capacity (most single-phase 100A supplies can support a 7kW charger alongside normal household load). If your property is in a conservation area or is listed, you may need planning permission or listed building consent for the external installation. UKPN notification under G98 is required for chargers with smart functionality that can export to the grid.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete Electrical Installation Condition Reports on your phone with AI-assisted testing.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-guide',
    title: 'Consumer Unit Replacement Guide',
    description: 'Full guide to consumer unit upgrades including Part P notification requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description: 'Understand which electrical work is notifiable and what compliance means.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/niceic-registration',
    title: 'NICEIC Registration Guide',
    description: 'How to become NICEIC registered and what it means for your electrical business.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for domestic and commercial installations with automatic derating.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional quotes for Norwich customers with accurate local pricing.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Finding a Qualified Electrician in Norwich',
    content: (
      <>
        <p>
          Norwich is the largest city in Norfolk and serves as the economic hub for the whole of
          East Anglia. With a population of around 215,000 in the urban area and a wider catchment
          of over 400,000, there is steady demand for domestic and commercial electrical work across
          the city and surrounding villages.
        </p>
        <p>
          The Norwich electrical market is predominantly made up of sole traders and small firms (2
          to 5 electricians) handling domestic work — rewires, consumer unit upgrades, additional
          circuits, EICRs, and EV charger installations. Larger firms serve the commercial sector
          including the growing Norwich Research Park, the University of East Anglia campus, and the
          city centre retail and hospitality businesses.
        </p>
        <p>
          Whatever the size of the firm, the qualifications and registration requirements are the
          same. Every electrician carrying out notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          must either be registered with a competent person scheme or have the work inspected and
          signed off by local authority building control. The most recognised competent person
          schemes are <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,
          NAPIT, ELECSA, and STROMA.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: "How to Verify an Electrician's Qualifications",
    content: (
      <>
        <p>
          Before hiring any electrician in Norwich, verify their credentials. This protects you
          legally, financially, and physically. Here is what to check:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — ask for their NICEIC, NAPIT,
                ELECSA, or other scheme registration number. Search it online on the scheme
                provider's website to confirm it is current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS card</strong> — the Electrotechnical Certification Scheme card confirms
                the holder's qualifications and competence level. A gold ECS card indicates a
                qualified electrician (typically holding C&G 2365/2357 and C&G 2391 or equivalent).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — ensure your electrician carries at
                least £2 million public liability cover. Ask for a copy of the certificate of
                insurance. This protects you if accidental damage occurs during the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references and reviews</strong> — ask for contact details of 2 to 3
                recent Norwich customers, or check verified reviews on Checkatrade, Trustpilot, or
                Google Business. Look for reviews that mention similar work to what you need.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Norwich (2026 Prices)',
    content: (
      <>
        <p>
          Norwich electrical work is priced broadly in line with the East Anglian average, which is
          moderate compared to London and the South East but slightly above the national average.
          Heritage property work commands a premium.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed Victorian terrace)</strong> — £4,000 to £6,500 including
                new consumer unit, all circuits, sockets, switches, lighting, testing, and Part P
                certification. Listed properties or lath-and-plaster walls push to the upper end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £500 to £800 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and Part P
                notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (Electrical Installation Condition Report)</strong> — £180 to £300 for
                a 2 to 3 bedroom house. Required every 5 years for rented properties. Older Norwich
                properties often take longer to inspect due to the complexity of period
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional double socket</strong> — £100 to £160 depending on cable run
                length and wall type. Surface-mounted in a modern property is cheaper; flush-mounted
                through solid brick or flint is more expensive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £700 to £1,200 for a 7kW home charger
                including supply, installation, earthing, and Part P certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £120 to £200 for the first hour including
                travel, plus £50 to £70 per additional hour. Weekend and bank holiday rates are
                typically 50% higher.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are indicative for 2026. Work in Norwich city centre may be slightly higher
          due to parking costs and access constraints. Rural Norfolk properties may attract a travel
          surcharge. Always get at least three written quotes for any significant work.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Norwich Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Norwich has an exceptionally diverse property stock spanning nearly 1,000 years of
          building history. This creates specific challenges that electricians working in the city
          need to understand.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Medieval and Tudor Buildings</h3>
            <p className="text-white text-sm leading-relaxed">
              Norwich has more medieval churches than any other city in Europe and a significant
              number of timber-framed Tudor buildings, particularly in Elm Hill and the Lanes area.
              Electrical work in these buildings requires extreme care — timber frames are often
              structural, walls may be wattle-and-daub, and listed building consent is almost always
              required. Surface-mounted wiring in discreet trunking is typically the only option.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              The Golden Triangle and Unthank Road areas feature dense Victorian and Edwardian
              terraced housing. These properties have the typical challenges of lath-and-plaster
              walls, high ceilings, and often multiple previous partial rewires. Many have been
              converted into HMOs for the university market, which adds complexity around fire
              detection and emergency lighting requirements.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Norfolk Flint Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Properties built with Norfolk flint (common in Norwich and surrounding villages) have
              extremely hard walls that are difficult and slow to chase. Cable routes through flint
              walls often require diamond-core drilling, adding time and cost. Surface-mounted
              wiring or routing through floor and ceiling voids is often the more practical
              approach.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New-Build Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Norwich is expanding rapidly with new housing estates in Bowthorpe, Costessey, and
              Rackheath Eco-Town. These modern properties are typically well-wired from new but
              homeowners often want additional circuits for EV chargers, home offices, garden rooms,
              and smart home systems within a few years of moving in.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'UKPN and Norwich Electrical Regulations',
    content: (
      <>
        <p>
          UKPN (UK Power Networks) is the Distribution Network Operator for Norwich and the whole of
          East Anglia. Any work affecting the electricity supply to your property involves UKPN.
          This includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — if you need a new electricity
                supply or want to upgrade from single-phase to three-phase (for EV chargers, heat
                pumps, or commercial equipment), you apply to UKPN. East Anglia lead times are
                typically 4 to 10 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — moving the electricity meter requires UKPN to
                disconnect and reconnect the supply. Your electrician installs the new meter tails;
                UKPN moves the meter and cutout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification for generation and storage</strong> — if you are
                installing solar PV, battery storage, or a generator, the electrician must notify
                UKPN under Engineering Recommendation G98 (for systems up to 16A per phase) or G99
                (for larger systems). Norfolk is a popular area for solar PV due to the relatively
                high solar irradiance in East Anglia.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work in Norwich is overseen by Norwich City Council
          building control or by an approved inspector. If your electrician is registered with a
          competent person scheme, they self-certify and notify the council on your behalf.
        </p>
      </>
    ),
  },
  {
    id: 'conservation-areas',
    heading: 'Conservation Areas and Listed Buildings in Norwich',
    content: (
      <>
        <p>
          Norwich has 18 conservation areas and over 1,500 listed buildings — one of the highest
          densities of listed buildings of any city in England. Electrical work in these areas
          requires additional planning:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings</strong> — any work that affects the character of a listed
                building requires Listed Building Consent from Norwich City Council. This includes
                surface-mounted conduit on external walls, new external light fittings, EV charger
                mounting brackets, and even internal work if it affects original features such as
                timber beams or decorative plasterwork.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>The Cathedral Close</strong> — the area around Norwich Cathedral is one of
                the most strictly protected heritage areas in the city. Electrical work on any
                property within the Close requires careful liaison with the Dean and Chapter as well
                as the planning authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Elm Hill and the Lanes</strong> — these areas of medieval and Tudor
                buildings are both visually sensitive and structurally fragile. Electricians working
                here need experience with heritage properties and a sympathetic approach to cable
                routing that preserves the character of these unique buildings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'flood-risk',
    heading: 'Flood Risk and Electrical Safety in Norwich',
    content: (
      <>
        <p>
          Parts of Norwich are at risk of flooding from the River Wensum, which runs through the
          city centre, and from surface water flooding during heavy rainfall. The 2020 and 2023
          flooding events affected properties in riverside areas. Electrical installations in
          flood-prone properties need special consideration:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit positioning</strong> — where possible, mount the consumer unit
                above anticipated flood levels. If the property has flooded before, the high-water
                mark is a useful guide. BS 7671 does not mandate a specific height but positioning
                above flood risk is best practice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket and switch positioning</strong> — in flood-risk ground-floor rooms,
                consider positioning sockets at 450mm or higher above floor level (rather than the
                standard 300mm) to reduce the risk of water ingress. Wiring can be run downwards
                from above rather than upwards from below.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — all circuits in flood-risk properties should have
                RCD protection in accordance with Regulation 411.3.3. This provides automatic
                disconnection if water causes an earth fault, reducing the risk of electric shock
                during and after flooding.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Norwich Market',
    content: (
      <>
        <p>
          Norwich provides a stable market for electricians, driven by a mix of heritage property
          maintenance, landlord compliance (Norwich has a large student rental market around UEA),
          new-build housing on the city fringes, and growing demand for EV charger and heat pump
          installations across Norfolk.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Home className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Student Rental Market</h4>
                <p className="text-white text-sm leading-relaxed">
                  The University of East Anglia and Norwich University of the Arts support a large
                  student rental market, particularly in the Golden Triangle area. Landlords are
                  legally required to have a valid EICR every 5 years, and many HMO properties need
                  fire detection and emergency lighting installations. This creates consistent,
                  recurring work for local electricians.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Norwich customers expect professional documentation. An{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> completed on
                  a phone app and sent as a PDF before you leave the site sets you apart from
                  competitors still posting handwritten certificates.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Norwich electrical business from your phone"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, certification, and job management. Professional EICRs, EICs, and Minor Works certificates completed on site. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianNorwichPage() {
  return (
    <GuideTemplate
      title="Electrician in Norwich | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Norwich. Realistic 2026 pricing, UKPN connections, heritage property rewiring, flood-risk electrical safety, Part P compliance, and Norwich-specific electrical information."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Norwich:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Norwich, what to expect on pricing, and the specific challenges of electrical work in Norwich properties. Covers UKPN connections, Part P compliance, heritage property rewiring, flood-risk installations, and conservation area rules."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Norwich"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Norwich and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
