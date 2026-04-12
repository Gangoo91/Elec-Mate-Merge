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
  Anchor,
  Ship,
  Waves,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-southampton' },
  { label: 'Southampton', href: '/guides/electrician-southampton' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Southampton' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Southampton' },
  { id: 'property-types', label: 'Southampton Property Challenges' },
  { id: 'dno-regulations', label: 'SSEN and Local Regulations' },
  { id: 'port-marine', label: 'Port and Marine Electrical Work' },
  { id: 'waterfront', label: 'Waterfront New Builds and Ocean Village' },
  { id: 'for-electricians', label: 'For Electricians Working in Southampton' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins. Verify registration numbers online on the scheme provider websites.',
  'SSEN (Scottish and Southern Electricity Networks) is the DNO for Southampton and the wider southern England region. All new connections, supply upgrades, and G98/G99 notifications go through SSEN.',
  'Southampton has a significant stock of WW2-era and immediate post-war housing (1940s to 1950s rebuilds after heavy bombing) with original or early wiring that often needs complete rewiring. Areas like Shirley, Freemantle, and Bitterne are particularly affected.',
  'The Port of Southampton and cruise terminal area create specialist demand for commercial and marine-adjacent electrical work, including shore power connections, portside warehousing, and logistics facilities.',
  'University of Southampton and Solent University drive a busy student HMO market in Portswood, Highfield, and Bevois Valley, with landlords requiring regular EICRs and fire detection compliance.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Southampton?',
    answer:
      'Southampton electrician day rates typically range from £300 to £400 per day for a qualified electrician, with hourly rates of £42 to £58 per hour. Common job prices include: full rewire of a 3-bed post-war semi £4,200 to £6,000, consumer unit replacement £480 to £720, EICR £180 to £300, EV charger installation £800 to £1,200, and additional socket from existing circuit £110 to £180. Waterfront and Ocean Village new-build work is priced at a premium due to marine-grade specification requirements. Always get at least three written quotes for significant work.',
  },
  {
    question: 'How do I check if a Southampton electrician is properly qualified?',
    answer:
      'Ask for their competent person scheme registration number and verify it online. NICEIC (niceic.com/find-a-contractor), NAPIT (napit.org.uk/find-an-installer), and ELECSA (elecsa.co.uk/find-a-contractor) all have online search tools. A legitimate electrician will hold a current ECS card, carry public liability insurance (minimum £2 million recommended), and provide references from recent local work. For port and marine-adjacent work, check for additional qualifications such as CompEx certification for hazardous areas or specific marine electrical experience.',
  },
  {
    question: 'Who is the DNO for Southampton?',
    answer:
      'Southampton is served by SSEN (Scottish and Southern Electricity Networks), which operates the electricity distribution network across central southern England, including Hampshire, Dorset, Wiltshire, Berkshire, Oxfordshire, and parts of surrounding counties. For new connections, supply upgrades, or meter relocations, apply through the SSEN website (ssen.co.uk). For power cuts, call 105. When completing an EIC or EICR in Southampton, reference SSEN as the DNO. The earthing arrangement in most Southampton properties is TN-C-S (PME), though some older properties in outlying areas may be TN-S or TT.',
  },
  {
    question: 'What are the WW2-era housing rewiring challenges in Southampton?',
    answer:
      'Southampton was heavily bombed during the Second World War, and much of the city centre and surrounding residential areas were rebuilt in the late 1940s and 1950s. These properties present specific rewiring challenges: early PVC or rubber-insulated cabling that has degraded over 70+ years, original rewirable fuse boards with no RCD protection, asbestos-containing materials in meter cupboards and behind fuse boards (requiring an asbestos survey before disturbance), and concrete or rendered walls in some system-built properties that are difficult to chase. A full rewire of a typical post-war 3-bed semi in Shirley or Bitterne takes 5 to 8 working days and costs £4,200 to £6,000.',
  },
  {
    question: 'Is there specialist marine electrical work available in Southampton?',
    answer:
      'The Port of Southampton is the UK busiest cruise terminal and a major container port. While shipboard electrical work requires specialist marine qualifications, there is significant land-side electrical work available: shore power connection infrastructure, cruise terminal fit-outs and maintenance, portside warehouse and logistics facility installations, marina and boatyard power supplies, and the growing Ocean Village and Woolston waterfront developments. Electricians working near the port should be familiar with three-phase commercial installations, IP-rated equipment for exposed environments, and potentially CompEx certification for hazardous zones near fuel storage.',
  },
  {
    question: 'Do I need building control approval for electrical work in Southampton?',
    answer:
      'Notifiable electrical work in Southampton is governed by Part P of the Building Regulations (England and Wales). Notifiable work includes new circuits, consumer unit replacements, work in bathrooms and kitchens involving new circuits, and work in special locations. If your electrician is registered with a competent person scheme, they can self-certify and notify Southampton City Council on your behalf. If not registered, you must apply to Southampton City Council Building Control before work starts — this adds cost (typically £250 to £350) and time.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete Electrical Installation Condition Reports on site for Southampton landlord compliance.',
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
    description:
      'Size cables for commercial and domestic installations with automatic derating factors.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Create professional quotes for Southampton customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in Southampton',
    content: (
      <>
        <p>
          Southampton is the largest city in Hampshire, with a population of approximately 260,000
          and a wider urban area of over 850,000 including Eastleigh, Totton, and the Waterside. The
          city's identity is shaped by its port — the UK's busiest cruise terminal and a major
          container port — and by a diverse property stock that ranges from WW2-era rebuilds to
          modern waterfront apartments at Ocean Village.
        </p>
        <p>
          The electrical contracting market in Southampton is driven by several factors: a large
          stock of post-war housing requiring rewiring, two universities creating HMO demand in
          Portswood and Highfield, ongoing waterfront development, port-related commercial work, and
          steady domestic demand for EV chargers, consumer unit upgrades, and EICRs across the
          city's suburban areas.
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
          Before hiring any electrician in Southampton, verify their credentials. This protects you
          legally, financially, and physically. Here is what to check:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — ask for their NICEIC, NAPIT,
                ELECSA, or other scheme registration number. Search it online on the scheme
                provider's website to confirm it is current. Registration means the electrician's
                work is regularly assessed and they can self-certify notifiable work under Part P.
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
                least £2 million public liability cover. For commercial port-area work or high-value
                waterfront properties, £5 million is advisable. Ask for a copy of the insurance
                certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references and reviews</strong> — ask for contact details of 2 to 3
                recent Southampton customers, or check verified reviews on Checkatrade, Trustpilot,
                or Google Business. Look for reviews mentioning similar work to yours.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be cautious of electricians who cannot provide a scheme registration number, offer
          significantly below-market rates, refuse to provide a written quote, or pressure you to
          pay cash without an invoice.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Southampton (2026 Prices)',
    content: (
      <>
        <p>
          Southampton electrical work is priced in line with the broader southern England market —
          higher than the Midlands and North but lower than central London. Here are realistic
          Southampton prices for common domestic electrical work in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed post-war semi)</strong> — £4,200 to £6,000 including new
                consumer unit, all circuits, sockets, switches, lighting, testing, and Part P
                certification. Post-war properties with concrete render or system-built construction
                are at the upper end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £480 to £720 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and Part P
                notification. Check for asbestos in the existing meter cupboard before starting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (Electrical Installation Condition Report)</strong> — £180 to £300 for
                a house, £160 to £250 for a flat. Required every 5 years for all rented properties.
                Post-war Southampton properties frequently receive C2 or C3 codes due to ageing
                wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket (from existing circuit)</strong> — £110 to £180 per single
                socket, depending on cable run and wall construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £800 to £1,200 for a 7kW home charger
                including supply, installation, earthing, and Part P certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £130 to £220 for the first hour including
                travel, plus £50 to £70 per additional hour. Weekend and bank holiday rates are
                typically 50% higher.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are indicative for 2026. Waterfront and Ocean Village new-build work is
          typically priced 15% to 25% higher due to marine-grade specification requirements
          (stainless steel fixings, higher IP-rated accessories). Always get at least three written
          quotes for significant work.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Southampton Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Southampton's property stock has a distinctive character shaped by wartime bombing and
          post-war rebuilding, a working port, and ongoing waterfront regeneration.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">WW2-Era Rebuilds</h3>
            <p className="text-white text-sm leading-relaxed">
              Southampton was one of the most heavily bombed cities in the UK during the Second
              World War. Large areas of Shirley, Freemantle, Bitterne, Woolston, and the city centre
              were rebuilt in the late 1940s and 1950s. These properties have wiring that is now 70
              to 80 years old — degraded PVC or rubber insulation, original rewirable fuse boards,
              and often asbestos-containing materials in meter cupboards. Complete rewiring is
              usually the only safe option.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Student HMOs (Portswood/Highfield)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The University of Southampton and Solent University support a large student rental
              market, concentrated in Portswood, Highfield, Bevois Valley, and parts of Shirley. HMO
              properties require enhanced fire detection (LD2 to BS 5839-6), emergency lighting,
              30mA RCD protection on all circuits per Regulation 411.3.3, and a valid EICR.
              Southampton City Council actively enforces HMO licensing conditions.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Waterfront New Builds</h3>
            <p className="text-white text-sm leading-relaxed">
              Ocean Village, Town Quay, Woolston Riverside, and Chapel Riverside are areas of
              ongoing waterfront development. New-build apartments here require standard domestic
              installations but with enhanced consideration for coastal environment factors — higher
              IP-rated external accessories, marine-grade stainless steel fixings for balcony
              lighting, and careful attention to corrosion prevention in exposed areas.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Surviving Victorian terraces in Northam, St Denys, Newtown, and parts of Shirley
              predate the wartime damage. These have the typical challenges of Victorian properties
              — lath-and-plaster walls, high ceilings, multiple previous partial rewires, and
              concealed gas and water pipes sharing voids with electrical cables. Careful survey
              work is essential before starting any rewire.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'SSEN and Southampton Electrical Regulations',
    content: (
      <>
        <p>
          SSEN (Scottish and Southern Electricity Networks) is the Distribution Network Operator for
          Southampton and the wider central southern England region, covering Hampshire, Berkshire,
          Dorset, Wiltshire, Oxfordshire, and surrounding areas. Any work affecting the electricity
          supply to your property involves SSEN. This includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — if you need a new electricity
                supply or want to upgrade from single-phase to three-phase (for EV chargers, heat
                pumps, or commercial equipment), apply through SSEN's website (ssen.co.uk).
                Southampton lead times are typically 4 to 8 weeks for standard connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — moving the electricity meter requires SSEN to
                disconnect and reconnect the supply. Your electrician installs the new meter tails;
                SSEN moves the meter and cutout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification</strong> — solar PV, battery storage, or generator
                installations require notification to SSEN under Engineering Recommendation G98 (for
                systems up to 16A per phase) or G99 (for larger systems). Southampton's waterfront
                properties are popular for solar PV installations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work in Southampton is overseen by Southampton City
          Council Building Control or an approved inspector. If your electrician is registered with
          a competent person scheme, they self-certify and notify the council on your behalf.
        </p>
      </>
    ),
  },
  {
    id: 'port-marine',
    heading: 'Port and Marine Electrical Work',
    content: (
      <>
        <p>
          The Port of Southampton is the UK's number one cruise terminal, handling approximately 2
          million cruise passengers per year, and a major container and vehicle import/export
          facility. This creates a category of electrical work that is relatively unique to
          Southampton among UK cities.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Ship className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cruise terminal shore power</strong> — the Port of Southampton has invested
                in shore power infrastructure to allow cruise ships to plug in to the local
                electricity grid rather than running diesel generators while docked. This
                high-voltage infrastructure requires specialist electrical contractors, but creates
                downstream demand for associated electrical work in terminal buildings and portside
                facilities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Anchor className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Marina and boatyard installations</strong> — Southampton's marinas (Ocean
                Village, Shamrock Quay, Hythe Marina) require shore power installations for
                recreational vessels. These must comply with BS 7671 Section 709 (marinas and
                similar locations), which has specific requirements for RCD protection, IP ratings,
                and socket outlet types. This is specialist work that commands premium rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Port warehousing and logistics</strong> — the port area contains large
                warehousing and logistics facilities requiring commercial three-phase installations,
                high-bay lighting, distribution boards, and periodic inspection. This is steady
                commercial work for electricians with experience in industrial and commercial
                installations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Port-adjacent work often requires additional safety qualifications including CSCS cards,
          port security clearance, and in some zones CompEx certification for work near fuel storage
          areas. The investment is worthwhile — port and marine electrical work commands rates 20%
          to 40% above standard domestic rates.
        </p>
      </>
    ),
  },
  {
    id: 'waterfront',
    heading: 'Waterfront New Builds and Ocean Village',
    content: (
      <>
        <p>
          Southampton's waterfront is undergoing significant regeneration, with new residential and
          mixed-use developments at Ocean Village, Chapel Riverside, Woolston Riverside, and Royal
          Pier Waterfront. Electrical work in these coastal locations requires specific
          consideration for the marine environment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Waves className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corrosion considerations</strong> — salt air accelerates corrosion of
                standard mild steel fixings, enclosures, and accessories. External installations
                near the waterfront should use stainless steel (A2 or A4 grade) fixings,
                marine-grade enclosures, and IP65 or higher rated accessories for any exposed
                external location. Standard galvanised steel conduit and trunking will corrode
                within 2 to 3 years in the salt air environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Waves className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP ratings for balcony and terrace installations</strong> — balcony
                lighting, power sockets, and EV charging points on waterfront apartments need
                minimum IP44 protection (splashproof from all directions), with IP65 recommended for
                fully exposed locations. Specify marine-grade products at the quoting stage to avoid
                costly replacements later.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Waves className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communal area installations</strong> — new-build waterfront apartment blocks
                require communal area lighting with emergency lighting to BS 5266, fire detection
                systems, entry phone systems, and landlord distribution boards. Car park lighting
                with EV charging infrastructure is increasingly standard in new developments.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Waterfront electrical work is premium work. Specifying the right materials from the outset
          — and being able to explain to the client why marine-grade fixings and higher IP ratings
          are necessary — demonstrates professionalism and avoids warranty callbacks.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Southampton Market',
    content: (
      <>
        <p>
          Southampton offers a diverse electrical market combining steady domestic rewiring demand,
          a strong student HMO sector, premium waterfront new-build work, and specialist port and
          marine opportunities that few other UK cities can match.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Post-War Rewiring Market</h4>
                <p className="text-white text-sm leading-relaxed">
                  Southampton's large stock of WW2-era housing provides a steady stream of rewiring
                  work. Many of these properties have never been rewired since original
                  construction. Target areas like Shirley, Bitterne, and Woolston through local
                  leaflet drops and partnerships with estate agents who flag properties with
                  outdated electrics during surveys.
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
                  Southampton landlords and waterfront developers expect professional certificates.
                  An <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> completed on
                  a phone app and sent as a PDF before you leave the site sets you apart from
                  competitors still posting handwritten certificates.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Southampton electrical business from your phone"
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

export default function ElectricianSouthamptonPage() {
  return (
    <GuideTemplate
      title="Electrician in Southampton | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Southampton. Realistic 2026 pricing, SSEN DNO connections, post-war housing rewiring, port and marine work, student HMO compliance, waterfront installations, and Part P guidance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Southampton:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Southampton, what to expect on pricing, and the specific challenges of electrical work in Southampton properties. Covers SSEN connections, post-war rewiring, port and marine work, waterfront new builds, student HMOs, and Part P compliance."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Southampton"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Southampton and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
