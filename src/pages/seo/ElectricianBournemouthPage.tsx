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
  Zap,
  GraduationCap,
  Calculator,
  Home,
  Waves,
  Sun,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-bournemouth' },
  { label: 'Bournemouth', href: '/guides/electrician-bournemouth' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Bournemouth' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Bournemouth' },
  { id: 'property-types', label: 'Bournemouth Property Challenges' },
  { id: 'dno-regulations', label: 'SSEN and Local Regulations' },
  { id: 'coastal-considerations', label: 'Coastal Electrical Considerations' },
  { id: 'for-electricians', label: 'For Electricians Working in Bournemouth' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always verify your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins.',
  'SSEN (Scottish and Southern Electricity Networks) is the Distribution Network Operator for Bournemouth and the wider Dorset area. New connections, supply upgrades, and generation notifications go through SSEN.',
  'Bournemouth has a high proportion of converted Victorian and Edwardian guest houses and hotels, many now split into flats. These conversions often have complex, layered electrical installations that require careful assessment.',
  'Coastal properties in Bournemouth face accelerated corrosion of electrical fittings and accessories due to salt air. IP-rated accessories and marine-grade fixings are recommended for external installations.',
  'Bournemouth electrician rates are moderate for the South of England, typically £42 to £58 per hour, with seasonal peaks during summer when holiday accommodation needs urgent repairs.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Bournemouth?',
    answer:
      'Bournemouth electrician day rates in 2026 typically range from £260 to £370 for a qualified, registered electrician. Hourly rates are usually £42 to £58 per hour, with emergency call-out rates of £70 to £100 per hour. Common fixed-price jobs include: consumer unit replacement £520 to £800, additional double socket £100 to £160, full house rewire (3-bed Victorian) £4,200 to £6,800, EICR £180 to £300. Seafront and cliff-top properties may attract a premium due to access challenges and corrosion considerations.',
  },
  {
    question: 'Who is the DNO for Bournemouth?',
    answer:
      'SSEN (Scottish and Southern Electricity Networks) is the Distribution Network Operator for Bournemouth and Dorset. For new connections, supply upgrades (single-phase to three-phase for EV chargers or heat pumps), meter relocations, or generation connections (solar PV, battery storage), you apply through SSEN. G98 notification is required for small-scale generation up to 16A per phase, and G99 for larger systems. SSEN processing times are typically 4 to 10 weeks.',
  },
  {
    question: 'Does salt air affect electrical installations in Bournemouth?',
    answer:
      'Yes. Properties within a few hundred metres of the seafront experience accelerated corrosion of metalwork including earth electrodes, external accessories, cable glands, and distribution board enclosures. BS 7671 requires that environmental conditions be considered when selecting equipment. For coastal properties, electricians should use IP-rated accessories for external installations, stainless steel or plastic fixings rather than standard zinc-plated screws, and should inspect earth electrode connections more frequently as corrosion can increase earth fault loop impedance over time.',
  },
  {
    question: 'Do I need special approval for electrical work in a Bournemouth flat conversion?',
    answer:
      "Electrical work in a flat conversion follows the same Part P rules as any domestic property — notifiable work must be done by a competent person scheme registered electrician or signed off by building control. However, flat conversions in Bournemouth often have shared supplies and complex metering arrangements. If the work affects the communal supply or shared areas, you need the freeholder or managing agent's permission. Fire detection and emergency lighting may also need to comply with the relevant Housing Act requirements for HMOs.",
  },
  {
    question: 'Can I get solar panels installed in Bournemouth?',
    answer:
      "Yes. Bournemouth benefits from above-average solar irradiance for the UK due to its southern coastal location. A typical 4kW domestic solar PV system costs £5,000 to £7,000 installed, with battery storage adding £3,000 to £5,000. Your electrician must notify SSEN under G98 (up to 16A per phase) or apply under G99 for larger systems. If your property is in a conservation area or is listed, planning permission may be required for roof-mounted panels. South-facing roofs on Bournemouth's cliff-top properties are particularly well suited to solar generation.",
  },
  {
    question: 'What qualifications should a Bournemouth electrician have?',
    answer:
      'A qualified electrician should hold City & Guilds 2365 or 2357 (or NVQ Level 3 in Electrical Installation) as their core qualification, plus current BS 7671:2018+A3:2024 certification. For notifiable work under Part P, registration with a competent person scheme (NICEIC, NAPIT, ELECSA) is required. A gold ECS card confirms qualification level. Always verify the registration number online before work begins.',
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
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for domestic and commercial installations with automatic derating.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Create professional quotes for Bournemouth customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in Bournemouth',
    content: (
      <>
        <p>
          Bournemouth is one of the largest towns on the south coast, forming part of the
          Bournemouth, Christchurch and Poole (BCP) conurbation with a combined population of over
          400,000. The area has a strong service economy, a significant tourism sector, and a
          growing tech industry — all of which drive demand for electrical services.
        </p>
        <p>
          The local electrical market includes a healthy mix of sole traders, small firms, and
          larger contractors. Domestic work dominates — rewires, consumer unit upgrades, EICRs, EV
          charger installations, and the ongoing conversion and refurbishment of the town's
          extensive stock of Victorian and Edwardian properties. The hospitality sector (hotels,
          guest houses, restaurants) also generates significant commercial electrical work,
          particularly around seasonal refurbishment cycles.
        </p>
        <p>
          Every electrician carrying out notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          must either be registered with a competent person scheme or have the work signed off by
          building control. The most recognised schemes are{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>, NAPIT,
          ELECSA, and STROMA.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: "How to Verify an Electrician's Qualifications",
    content: (
      <>
        <p>Before hiring any electrician in Bournemouth, verify their credentials:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — ask for their NICEIC, NAPIT,
                ELECSA, or other scheme registration number and verify it online.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS card</strong> — a gold ECS card confirms the holder is a qualified
                electrician with relevant City & Guilds or NVQ qualifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — minimum £2 million cover recommended.
                Bournemouth's high-value seafront properties warrant higher cover levels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>References and reviews</strong> — check Checkatrade, Trustpilot, or Google
                Business for verified local reviews. Ask for references from similar work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Bournemouth (2026 Prices)',
    content: (
      <>
        <p>
          Bournemouth electrician rates are moderate for the south of England — lower than London
          and the Home Counties but above the national average. Coastal and heritage property work
          commands a premium.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed Victorian)</strong> — £4,200 to £6,800 including new
                consumer unit, all circuits, testing, and Part P certification. Properties with
                converted loft rooms or basement conversions are at the upper end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £520 to £800 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and Part P
                notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR</strong> — £180 to £300 for a 2 to 3 bedroom house. Required every 5
                years for rented properties. Older Bournemouth properties and flat conversions often
                take longer to inspect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional double socket</strong> — £100 to £160 depending on cable run and
                wall construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £700 to £1,200 for a 7kW home charger.
                Cliff-top properties may require longer cable runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £120 to £200 for the first hour, plus £50 to
                £70 per additional hour. Summer peak season may see higher demand and longer waits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Bournemouth Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Bournemouth's property stock reflects its history as a Victorian seaside resort, with
          large former guest houses and hotels alongside more recent suburban development.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Converted Guest Houses and Hotels</h3>
            <p className="text-white text-sm leading-relaxed">
              Many of Bournemouth's large Victorian and Edwardian guest houses and hotels have been
              converted into flats. These conversions often have complex, layered electrical
              installations — the original building wiring, conversion-era additions, and subsequent
              modifications by individual flat owners. Shared rising mains, multiple consumer units,
              and unclear circuit ownership are common challenges.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cliff-Top Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Bournemouth's sought-after cliff-top properties face specific electrical challenges.
              External installations are exposed to salt-laden winds causing accelerated corrosion.
              Long driveways may mean extended cable runs for EV chargers. Ground conditions on the
              sandy cliffs can affect earth electrode resistance, requiring careful testing.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">1960s and 1970s Flat Blocks</h3>
            <p className="text-white text-sm leading-relaxed">
              Bournemouth has many purpose-built flat blocks from the 1960s and 1970s, particularly
              along the East Cliff and in Boscombe. These often have communal storage heating
              systems on Economy 7 tariffs, with associated dual-rate metering and high-current
              heating circuits. Upgrading these properties to modern standards is a growing market.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New-Build Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              New housing in areas like West Howe, Throop, and the BH postcode fringes is typically
              well wired from new, but homeowners frequently want additional circuits for garden
              rooms, home offices, hot tubs, and EV chargers within a few years of occupation.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'SSEN and Bournemouth Electrical Regulations',
    content: (
      <>
        <p>
          SSEN (Scottish and Southern Electricity Networks) is the Distribution Network Operator for
          Bournemouth and the wider Dorset region. Any work affecting the electricity supply to your
          property involves SSEN:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — apply to SSEN for new
                supplies or upgrades. Dorset lead times are typically 4 to 10 weeks depending on
                complexity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — SSEN handles the meter and cutout. Your
                electrician installs the new meter tails and consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification</strong> — required for solar PV, battery storage, and
                generator installations. Bournemouth's south-facing coastal aspect makes it
                attractive for solar PV.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work in Bournemouth is overseen by BCP Council building
          control or an approved inspector.
        </p>
      </>
    ),
  },
  {
    id: 'coastal-considerations',
    heading: 'Coastal Electrical Considerations in Bournemouth',
    content: (
      <>
        <p>
          Bournemouth's coastal location creates specific considerations for electrical
          installations that electricians and homeowners should be aware of:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Waves className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Salt air corrosion</strong> — properties within a few hundred metres of the
                seafront experience accelerated corrosion of metalwork. External accessories should
                be IP-rated (minimum IP55 for exposed locations), fixings should be stainless steel
                or plastic, and earth electrode connections should be inspected regularly. Consumer
                units in garages or outbuildings near the coast are particularly vulnerable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Waves className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>External lighting</strong> — seafront and garden lighting installations must
                use accessories suitable for the marine environment. Standard galvanised steel
                fittings will corrode within 2 to 3 years in coastal conditions. Marine-grade
                stainless steel or composite materials are recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV installations</strong> — roof-mounted solar panels on seafront
                properties need marine-grade fixings and careful attention to cable UV resistance.
                The salt-air environment is harsher on both the mounting hardware and the electrical
                connections than inland installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Bournemouth Market',
    content: (
      <>
        <p>
          Bournemouth and the BCP conurbation provide a strong market for electricians, with a
          diverse mix of work driven by the tourism sector, the large stock of period properties, a
          growing residential population, and increasing demand for renewable energy installations.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Home className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Seasonal Demand Patterns</h4>
                <p className="text-white text-sm leading-relaxed">
                  Bournemouth's tourism sector creates seasonal demand peaks. Hotels and guest
                  houses typically schedule refurbishment and maintenance work during the autumn and
                  winter off-season, while emergency call-outs from holiday accommodation peak
                  during summer. Planning your workload around these cycles is key to a successful
                  Bournemouth electrical business.
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
                  An <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> completed on
                  a phone app and sent as a PDF before you leave site gives customers confidence and
                  saves you time on paperwork.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Bournemouth electrical business from your phone"
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

export default function ElectricianBournemouthPage() {
  return (
    <GuideTemplate
      title="Electrician in Bournemouth | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Bournemouth. Realistic 2026 pricing, SSEN connections, coastal electrical considerations, flat conversion challenges, Part P compliance, and Bournemouth-specific information."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Bournemouth:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Bournemouth, what to expect on pricing, and the specific challenges of electrical work in Bournemouth properties. Covers SSEN connections, Part P compliance, coastal considerations, and converted guest house challenges."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Bournemouth"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Bournemouth and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
