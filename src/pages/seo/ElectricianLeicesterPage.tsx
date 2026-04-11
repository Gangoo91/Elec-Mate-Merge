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
  Users,
  Zap,
  GraduationCap,
  Calculator,
  ClipboardCheck,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-leicester' },
  { label: 'Leicester', href: '/guides/electrician-leicester' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Leicester' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Leicester' },
  { id: 'property-types', label: 'Leicester Property Challenges' },
  { id: 'dno-regulations', label: 'NGED and Local Regulations' },
  { id: 'landlord-compliance', label: 'Landlord and HMO Compliance' },
  { id: 'for-electricians', label: 'For Electricians Working in Leicester' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins. You can verify registration numbers online on the scheme provider websites.',
  'Leicester electrician rates are broadly in line with the East Midlands average, typically 10% to 15% below London rates but 5% to 10% above rural Leicestershire due to urban access and parking challenges.',
  'Leicester has a high proportion of Victorian and Edwardian terraced housing, particularly in areas like Clarendon Park, Stoneygate, and Highfields, which often require specialist rewiring approaches for older wiring systems.',
  'National Grid Electricity Distribution (NGED, formerly Western Power Distribution) is the Distribution Network Operator for Leicester. Any work affecting the incoming supply, meter position, or requiring a new connection must be coordinated with NGED.',
  'Leicester has one of the highest concentrations of Houses in Multiple Occupation (HMOs) outside London, driven by two universities. HMO electrical compliance has specific additional requirements beyond standard domestic installations.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Leicester?',
    answer:
      'Leicester electrician day rates typically range from £220 to £320 per day for a qualified electrician, broadly in line with the East Midlands average. Hourly rates are usually £35 to £55 per hour, with emergency call-out rates of £60 to £90 per hour. Evening and weekend rates are typically 30% to 50% higher. Always get a fixed quote for defined work rather than agreeing to day rates where possible.',
  },
  {
    question: 'How do I check if a Leicester electrician is properly qualified?',
    answer:
      'Ask for their competent person scheme registration number and verify it online. NICEIC (niceic.com/find-a-contractor), NAPIT (napit.org.uk/find-an-installer), and ELECSA (elecsa.co.uk/find-a-contractor) all have online search tools. A legitimate electrician will also hold a current ECS (Electrotechnical Certification Scheme) card, carry public liability insurance (minimum £2 million recommended), and be able to provide references from recent local work. For any notifiable work under Part P of the Building Regulations, the electrician must be registered with a competent person scheme or the work must be signed off by Leicester City Council building control.',
  },
  {
    question: 'How long does a full rewire take in a Leicester Victorian terrace?',
    answer:
      'A full rewire of a typical 3-bedroom Victorian terraced house in Leicester takes 5 to 8 working days with a team of two electricians, plus 1 to 2 days for testing and certification. Victorian terraces in areas like Clarendon Park and Stoneygate have solid brick walls and lath-and-plaster ceilings that add complexity. The first fix (running new cables) typically takes 4 to 6 days, and second fix (connecting sockets, switches, and the consumer unit) takes 1 to 2 days. Allow additional time if the property has a cellar conversion or loft room.',
  },
  {
    question: 'Do I need building control approval for electrical work in Leicester?',
    answer:
      'Notifiable electrical work in Leicester (as in the rest of England and Wales) is governed by Part P of the Building Regulations. Notifiable work includes new circuits, consumer unit replacements, work in bathrooms and kitchens involving new circuits, and work in special locations. If your electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or others), they can self-certify the work and notify Leicester City Council on your behalf. If the electrician is not registered, you must apply to Leicester City Council building control before work starts, adding cost (typically £250 to £400) and time.',
  },
  {
    question: 'What is an EICR and do I need one for my Leicester property?',
    answer:
      'An Electrical Installation Condition Report (EICR) is a formal inspection and test of the fixed electrical installation in a property. Since April 2021, landlords in England are legally required to have a valid EICR for rented properties, carried out at least every 5 years or at each change of tenancy. For Leicester properties, an EICR typically costs £150 to £280 for a 2 to 3 bedroom flat, and £220 to £380 for a 3 to 4 bedroom house. Older Leicester properties frequently receive C2 (potentially dangerous) or C3 (improvement recommended) codes due to ageing wiring, lack of RCD protection compliant with Regulation 411.3.3, or outdated consumer units.',
  },
  {
    question: 'What are the HMO electrical requirements in Leicester?',
    answer:
      'Leicester has a large HMO sector due to its two universities (University of Leicester and De Montfort University). HMOs must have a valid EICR, and many require additional licensing from Leicester City Council. Electrical requirements for HMOs go beyond standard domestic installations: fire detection and alarm systems must comply with BS 5839-6 (typically Grade A or Grade D depending on the HMO category), emergency lighting is required on escape routes, and the electrical installation must be maintained in a safe condition. Leicester City Council actively enforces HMO licensing and regularly inspects properties.',
  },
  {
    question: 'Who is the electricity Distribution Network Operator for Leicester?',
    answer:
      "National Grid Electricity Distribution (NGED), formerly Western Power Distribution (WPD), is the DNO for Leicester and the wider East Midlands region. To request a new supply, upgraded supply, or meter relocation, you apply through NGED's website (nationalgrid.co.uk/electricity-distribution). Your electrician can advise on whether your existing supply is adequate and submit the application on your behalf. Lead times for new connections in Leicester are typically 4 to 8 weeks.",
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
    description: 'Create professional quotes for Leicester customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in Leicester',
    content: (
      <>
        <p>
          Leicester is the largest city in the East Midlands, with a population of around 370,000
          and a wider urban area approaching 550,000. The city has a diverse property stock ranging
          from Victorian terraces in the inner suburbs to modern new-build estates on the outskirts,
          and a thriving commercial sector centred on the city centre and the growing Leicester
          Waterside development.
        </p>
        <p>
          The Leicester electrical market is served by a mix of established local firms and sole
          traders. Many Leicester electricians serve both the city and the surrounding
          Leicestershire towns — Loughborough, Hinckley, Market Harborough, and Melton Mowbray are
          all within a 30-minute drive. The university sector (University of Leicester and De
          Montfort University) generates significant demand for HMO electrical work, particularly in
          the Clarendon Park, Aylestone, and West End areas.
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
          Before hiring any electrician in Leicester, verify their credentials. This protects you
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
                Ask to see it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — ensure your electrician carries at
                least £2 million public liability cover. Ask for a copy of the certificate. This is
                particularly important for work in older Leicester properties where unforeseen
                damage to lath-and-plaster or period features can occur.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references and reviews</strong> — ask for contact details of 2 to 3
                recent Leicester customers, or check verified reviews on platforms like Checkatrade,
                Trustpilot, or Google Business. Look for reviews that mention similar work to what
                you need.
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
    heading: 'Typical Electrician Costs in Leicester (2026 Prices)',
    content: (
      <>
        <p>
          Leicester electrical work is priced competitively compared to London and the South East,
          reflecting lower operating costs in the East Midlands. Here are realistic Leicester prices
          for common domestic electrical work in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed Victorian terrace)</strong> — £4,500 to £7,000 including
                new consumer unit, all circuits, sockets, switches, lighting, testing, and Part P
                certification. Properties with lath-and-plaster walls in Clarendon Park or
                Stoneygate are at the upper end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £450 to £750 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and Part P
                notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (Electrical Installation Condition Report)</strong> — £150 to £280 for
                a flat, £220 to £380 for a house. Required every 5 years for rented properties.
                Leicester's large rental market means high demand for EICRs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket (from existing circuit)</strong> — £90 to £160 per single
                socket, depending on cable run length and the ease of access to the existing
                circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £650 to £1,200 for a 7kW home charger
                including supply, installation, earthing, and Part P certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £100 to £180 for the first hour including
                travel, plus £40 to £65 per additional hour. Weekend and bank holiday rates are
                typically 50% higher.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are indicative for 2026 and vary across the city. Always get at least three
          written quotes for any significant work.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Leicester Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Leicester's property stock spans multiple eras and presents a range of challenges for
          electrical work. Understanding these helps you know what to expect when hiring an
          electrician and why some jobs cost more.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Leicester has extensive areas of Victorian terraced housing, particularly in Clarendon
              Park, Stoneygate, Highfields, and the West End. These 1880s to 1910 properties
              typically have solid brick walls, lath-and-plaster ceilings, and high ceilings. Many
              have had multiple partial rewires over the decades, leaving a mix of old
              rubber-sheathed cable and newer PVC alongside each other. A full rewire is often the
              most practical approach for these properties.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Inter-War Semi-Detached</h3>
            <p className="text-white text-sm leading-relaxed">
              The 1930s suburbs of Leicester — Oadby, Wigston, Knighton, and Evington — are
              dominated by semi-detached houses. These properties often have cavity walls (making
              cable routing easier) but may still have original VIR (vulcanised india rubber) wiring
              that is well past its expected life. The consumer unit is typically under the stairs,
              and the original installation was often just two circuits (lighting and power).
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Student HMOs</h3>
            <p className="text-white text-sm leading-relaxed">
              The areas around both universities have a high concentration of Houses in Multiple
              Occupation, many converted from family homes. These properties often have complex
              metering arrangements, additional fire detection systems, emergency lighting, and
              consumer units that have been extended multiple times. Electrical work in HMOs
              requires an electrician familiar with the additional fire safety and licensing
              requirements.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New-Build Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Leicester's expansion areas (Ashton Green, New Lubbesthorpe, Hamilton) feature modern
              new-build estates with 18th Edition compliant installations. While rewiring is rarely
              needed, common electrical work includes EV charger installations, smart home upgrades,
              garden lighting, and garage conversions requiring new circuits. The NHBC warranty may
              cover electrical defects in properties under 10 years old.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'NGED and Leicester Electrical Regulations',
    content: (
      <>
        <p>
          National Grid Electricity Distribution (NGED), formerly Western Power Distribution (WPD),
          is the Distribution Network Operator for Leicester and the wider East Midlands region. Any
          work affecting the electricity supply to your property involves NGED. This includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — if you need a new electricity
                supply or want to upgrade from single-phase to three-phase (for EV chargers, heat
                pumps, or commercial equipment), you apply to NGED. Leicester lead times are
                typically 4 to 8 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — moving the electricity meter requires NGED to
                disconnect and reconnect the supply. Your electrician installs the new meter tails;
                NGED moves the meter and cutout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification for generation and storage</strong> — if you are
                installing solar PV, battery storage, or a generator, the electrician must notify
                NGED under Engineering Recommendation G98 (for systems up to 16A per phase) or G99
                (for larger systems).
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work in Leicester is overseen by Leicester City Council
          building control or by an approved inspector. If your electrician is registered with a
          competent person scheme, they self-certify and notify the council on your behalf.
        </p>
      </>
    ),
  },
  {
    id: 'landlord-compliance',
    heading: 'Landlord and HMO Electrical Compliance in Leicester',
    content: (
      <>
        <p>
          Leicester has one of the largest private rented sectors in the East Midlands, with a
          significant proportion of HMOs serving the university population. Electrical compliance is
          a key concern for landlords:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR requirement</strong> — since April 2021, all rented properties in
                England must have a valid EICR carried out at least every 5 years. The report must
                be provided to new tenants before they move in and to existing tenants within 28
                days of the inspection. Failure to comply can result in fines of up to £30,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — Leicester City Council operates both mandatory and
                additional HMO licensing schemes. Licensed HMOs must meet specific electrical safety
                standards, including adequate socket provision for each letting room, compliant fire
                detection (BS 5839-6), and emergency lighting on escape routes. The council carries
                out inspections and can require remedial electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety in HMOs</strong> — the fire detection system grade depends on
                the HMO category. A Grade D LD2 system (interlinked mains-powered smoke and heat
                detectors) is typical for smaller HMOs. Larger HMOs may require a Grade A system
                with a control panel. Your electrician should be experienced in both the electrical
                installation and the fire detection requirements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Leicester Market',
    content: (
      <>
        <p>
          Leicester offers a steady market for electrical contractors, driven by the rental sector,
          university HMOs, commercial property in the city centre, and the ongoing expansion of
          residential estates on the city's fringes. Operating costs are lower than London and the
          South East, but competition is keen — pricing must reflect the local market while covering
          your overheads.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Leicester Operating Costs</h4>
                <p className="text-white text-sm leading-relaxed">
                  City centre parking can be £8 to £15 per day, and permit parking zones cover much
                  of the inner city. Van insurance and fuel costs are moderate compared to London.
                  Leicester's compact geography means travel times between jobs are manageable —
                  most of the city is within a 20-minute drive. Factor in the cost of materials from
                  local wholesalers (CEF, Edmundson, City Electrical Factors all have Leicester
                  branches).
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
                  Leicester landlords and letting agents expect professional documentation. An{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> completed on
                  a phone app and sent as a PDF before you leave the site sets you apart from
                  competitors still posting handwritten certificates.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Leicester electrical business from your phone"
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

export default function ElectricianLeicesterPage() {
  return (
    <GuideTemplate
      title="Electrician in Leicester | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Leicester. Realistic 2026 pricing, how to verify NICEIC/NAPIT registration, Victorian rewiring costs, NGED connections, Part P compliance, and HMO electrical requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Leicester:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Leicester, what to expect on pricing, and the specific challenges of electrical work in Leicester properties. Covers NGED connections, Part P compliance, Victorian rewiring, HMO compliance, and landlord requirements."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Leicester"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Leicester and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
