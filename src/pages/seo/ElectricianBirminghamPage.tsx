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
  Home,
  Train,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-birmingham' },
  { label: 'Birmingham', href: '/guides/electrician-birmingham' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Birmingham' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Birmingham' },
  { id: 'property-types', label: 'Birmingham Property Types' },
  { id: 'dno-regulations', label: 'National Grid and Regulations' },
  { id: 'hmo-student', label: 'HMO and Student Areas' },
  { id: 'hs2-development', label: 'HS2 and New Development' },
  { id: 'for-electricians', label: 'For Electricians in Birmingham' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme. Verify their registration number online before work starts.',
  'Birmingham electrician day rates range from £220 to £340, broadly in line with the national average. Inner-city work and specialist installations (commercial, HMO) tend to command higher rates.',
  'National Grid Electricity Distribution (formerly Western Power Distribution) is the DNO for the Birmingham area. All new connections, supply upgrades, and generation notifications go through NGED.',
  'Birmingham has a distinctive property mix: Victorian back-to-backs in the Jewellery Quarter and Balsall Heath, large Edwardian semis in Moseley and Kings Heath, 1960s tower blocks, and new-build developments across the city.',
  'Selly Oak and Edgbaston have high concentrations of student HMOs near the University of Birmingham, with strict electrical compliance requirements enforced by Birmingham City Council.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Birmingham?',
    answer:
      'Birmingham electrician day rates range from £220 to £340 per day for a qualified electrician. Hourly rates are typically £35 to £55 per hour, with emergency call-outs at £60 to £100 per hour. These rates are in line with the national average. Specific job costs in Birmingham: a full rewire of a 3-bed semi costs £4,500 to £7,000, a consumer unit replacement is £450 to £700, an EICR is £150 to £280, and an EV charger installation is £650 to £1,200. Prices tend to be slightly higher in affluent suburbs like Edgbaston, Moseley, and Harborne, and lower in outer areas like Erdington, Kingstanding, and Castle Vale.',
  },
  {
    question: 'How do I find a registered electrician in Birmingham?',
    answer:
      'Search the NICEIC, NAPIT, or ELECSA websites using your Birmingham postcode to find registered electricians in your area. Birmingham has a strong representation on all three major schemes. You can also check Checkatrade, MyBuilder, and Google Business for verified reviews from local customers. The Birmingham and Solihull branch of the ECA (Electrical Contractors Association) can also recommend member contractors for larger projects. For HMO work specifically, ask for evidence of previous HMO electrical work and familiarity with Birmingham City Council licensing conditions.',
  },
  {
    question: 'Who is the DNO for Birmingham?',
    answer:
      'National Grid Electricity Distribution (NGED), formerly Western Power Distribution (WPD), is the Distribution Network Operator for the Birmingham area and the wider West Midlands. NGED owns and maintains the electricity infrastructure from the high-voltage network down to your meter. Contact NGED for new connections, supply upgrades (single-phase to three-phase), meter relocations, and reporting power cuts. Your electrician handles G98/G99 notifications through NGED when installing solar PV, battery storage, or EV chargers. NGED can be contacted through nationalgrid.co.uk/electricity-distribution or by calling 105 for power cuts.',
  },
  {
    question: 'Do Birmingham landlords need an EICR?',
    answer:
      'Yes. Since April 2021, all landlords in England — including Birmingham — must have a valid Electrical Installation Condition Report (EICR) for rented properties. The EICR must be carried out at least every 5 years or at each change of tenancy, whichever comes first. Birmingham City Council actively enforces these requirements and has issued civil penalties to non-compliant landlords. This is particularly relevant in Birmingham given the large rental sector around the universities and in inner-city areas. An EICR in Birmingham typically costs £150 to £280 for a standard property. Landlords must provide a copy of the EICR to tenants within 28 days and to the local authority on request within 7 days.',
  },
  {
    question: 'How long does a rewire take in a Birmingham Victorian terrace?',
    answer:
      'A full rewire of a typical 3-bedroom Victorian terraced house in Birmingham takes 5 to 8 working days with a team of two electricians. Birmingham Victorian terraces (common in areas like Balsall Heath, Moseley, Kings Heath, and Stirchley) typically have solid brick walls and original plasterwork that requires careful chasing. Many have been partially rewired at various times, which adds complexity. The cellar (if present) can aid cable routing under the ground floor. Bay windows — a common feature of Birmingham Victorian houses — add extra cable runs for lighting and sockets. Allow 1 to 2 additional days for testing, certification, and making good.',
  },
  {
    question: 'What are the electrical requirements for Birmingham HMOs?',
    answer:
      'Houses in Multiple Occupation in Birmingham must comply with both national HMO regulations and Birmingham City Council specific licensing conditions. Electrical requirements include: a valid EICR (maximum 5-year interval), LD2 grade fire detection (mains-wired, interlinked smoke and heat detectors with battery backup), emergency lighting in escape routes for properties of 3 or more storeys, and fire-rated cables (FP200 or equivalent) in communal areas. Birmingham City Council operates mandatory HMO licensing for properties of 5 or more occupants in 2 or more households, plus additional licensing in specific wards. The Selly Oak and Edgbaston wards (near the University of Birmingham) have particularly high concentrations of HMOs with active enforcement.',
  },
  {
    question: 'Is HS2 affecting electrician availability in Birmingham?',
    answer:
      'The HS2 construction programme in Birmingham — centred on the Curzon Street terminus and associated infrastructure — has increased demand for qualified electricians in the city. While the direct HS2 electrical work is handled by specialist tier-1 contractors, the knock-on effect on the local labour market is noticeable. Electricians in Birmingham report higher demand and the ability to command slightly higher rates, particularly for commercial and industrial work. For domestic customers, the practical impact is that you may need to book further ahead (2 to 4 weeks rather than 1 to 2 weeks for non-urgent work) and should expect rates at the higher end of the local range. The construction is also driving regeneration in the Digbeth and Eastside areas, creating additional demand for electrical installations in converted and new-build properties.',
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
    description: 'Create professional quotes with accurate pricing for Birmingham customers.',
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
    heading: 'Finding a Qualified Electrician in Birmingham',
    content: (
      <>
        <p>
          Birmingham is the UK's second-largest city, with over 430,000 households across the city
          and a wider West Midlands metropolitan area of over 1.2 million homes. The electrical
          contracting market in Birmingham is large and diverse, serving everything from Victorian
          terraces in Moseley to new-build apartments in the Jewellery Quarter, and from student
          HMOs in Selly Oak to commercial offices in Colmore Row.
        </p>
        <p>
          The city is experiencing significant investment and regeneration. The HS2 Curzon Street
          terminus, the Commonwealth Games legacy developments, and the ongoing transformation of
          Digbeth and Eastside are all driving demand for electrical work. At the same time, the
          city's large stock of Victorian and inter-war housing generates consistent demand for
          rewires, consumer unit upgrades, and compliance work.
        </p>
        <p>
          For any electrical work in Birmingham, you need a qualified electrician registered with a{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          competent person scheme. The main schemes are{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>, NAPIT,
          and ELECSA. Birmingham has strong representation on all three, and many local electricians
          are also members of the ECA (Electrical Contractors' Association) or the JIB (Joint
          Industry Board).
        </p>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: 'How to Verify an Electrician\'s Qualifications',
    content: (
      <>
        <p>
          Before hiring an electrician in Birmingham, verify their credentials. This is the single
          most important step in protecting yourself, your property, and your family.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — ask for their NICEIC, NAPIT,
                or ELECSA registration number and verify it on the scheme provider's website. This
                confirms they can self-certify notifiable work under Part P and that their work is
                periodically assessed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS card</strong> — the Electrotechnical Certification Scheme card confirms
                the electrician's qualifications. A gold ECS card indicates a fully qualified
                electrician holding C&G 2365/2357 and typically C&G 2391. Ask to see it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — ensure at least £1 million cover,
                ideally £2 million. Ask for a copy of the insurance certificate. This is
                particularly important for work in occupied properties where accidental damage to
                existing fixtures, furnishings, or building fabric could be costly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local reviews and references</strong> — check Google Business, Checkatrade,
                and Trustpilot for reviews. Birmingham has active local community groups on Facebook
                (Moseley Forum, Kings Heath Residents, Harborne Chat) where residents regularly
                recommend electricians.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Birmingham (2026 Prices)',
    content: (
      <>
        <p>
          Birmingham electrical prices are close to the national average. Here are realistic 2026
          prices for common domestic electrical work in the Birmingham area:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed semi-detached)</strong> — £4,500 to £7,000 including new
                consumer unit, all circuits, sockets, switches, lighting, testing, and Part P
                certification. Birmingham's large stock of 1930s semis (common in Perry Barr,
                Erdington, Hall Green, and Acocks Green) are typically straightforward to rewire due
                to cavity walls and loft access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £420 to £700 including supply
                isolation, new 18th Edition compliant unit, testing, and Part P notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR</strong> — £150 to £280 depending on property size. A 2-bed flat or
                house is typically £150 to £200; a larger 4-bed house is £220 to £280.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket</strong> — £80 to £150 per single socket from an existing
                circuit. Properties with cavity walls and loft access are at the lower end;
                solid-walled Victorian properties requiring extensive chasing are at the upper end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £650 to £1,100 for a 7kW home charger
                including supply, installation, earthing, and Part P certification. Birmingham
                suburban properties with driveways and garages are typically straightforward
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £100 to £180 for the first hour including
                travel, plus £40 to £60 per additional hour. Weekend and evening surcharges of
                30% to 50% are standard.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always get at least three written quotes. Prices vary across the city — expect to pay
          more in Edgbaston, Moseley, and Harborne than in Erdington, Kingstanding, or Castle Bromwich.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Birmingham Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Birmingham's property stock is diverse, spanning over 150 years of building styles. Each
          type presents different electrical challenges that affect the scope, cost, and duration
          of work.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Terraces and Back-to-Backs</h3>
            <p className="text-white text-sm leading-relaxed">
              Birmingham has a unique stock of Victorian back-to-back houses — terraces where houses
              share three walls with neighbours, with windows and a door only on the front wall.
              Surviving examples in the Jewellery Quarter and Balsall Heath are often listed or in
              conservation areas. Rewiring requires creative cable routing with minimal wall chasing.
              Standard Victorian terraces in Moseley, Stirchley, and Kings Heath have solid brick
              walls and high ceilings similar to other Victorian cities.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">1930s Semi-Detached</h3>
            <p className="text-white text-sm leading-relaxed">
              Birmingham's suburbs — Perry Barr, Erdington, Hall Green, Acocks Green, Yardley —
              are dominated by 1930s semi-detached houses. These typically have cavity walls
              (easier for cable routing than solid brick), original round-pin socket wiring that
              needs replacing, and a mix of original and later electrical work. They are generally
              the most straightforward property type to rewire in Birmingham.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">1960s Tower Blocks and Maisonettes</h3>
            <p className="text-white text-sm leading-relaxed">
              Birmingham has significant numbers of 1960s and 1970s tower blocks and maisonettes,
              many of which have been refurbished by housing associations but some remain in
              original condition. Electrical work in these properties involves communal risers,
              shared infrastructure, and coordination with the building management. Asbestos is
              common in meter cupboards, ceiling tiles, and around heating systems in this era of
              construction — an asbestos survey should be carried out before electrical work begins.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New-Build Developments</h3>
            <p className="text-white text-sm leading-relaxed">
              New housing developments are appearing across Birmingham — Icknield Port, Longbridge
              (on the former MG Rover site), Smithfield, and Digbeth. These modern properties have
              compliant electrical installations from the outset but generate demand for additions:
              EV charger circuits, home office installations, garden electrics, smart home wiring,
              and upgrades to the standard builder specification.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'National Grid Electricity Distribution and Local Regulations',
    content: (
      <>
        <p>
          National Grid Electricity Distribution (NGED) — formerly Western Power Distribution
          (WPD) — is the Distribution Network Operator for Birmingham and the wider West Midlands.
          NGED manages the electricity network from high-voltage substations down to the service
          cable entering your property.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and upgrades</strong> — apply through NGED's website for new
                electricity supplies, supply upgrades (single-phase to three-phase for heat pumps,
                large EV chargers, or commercial equipment), and increased capacity. Birmingham lead
                times are typically 4 to 8 weeks for standard domestic applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications</strong> — your electrician must notify NGED when
                installing solar PV, battery storage, or any generation equipment. G98 covers
                domestic systems up to 16A per phase. NGED is generally responsive, with G98
                notifications processed within 10 working days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — common in Birmingham kitchen extensions and
                garage conversions. Your electrician installs the new meter tails and consumer unit;
                NGED relocates the meter and cutout. Allow 4 to 6 weeks lead time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work in Birmingham is overseen by Birmingham City
          Council building control or an approved inspector. If your electrician is registered
          with a competent person scheme, they self-certify and notify the council directly.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-student',
    heading: 'HMO and Student Accommodation in Birmingham',
    content: (
      <>
        <p>
          Birmingham is home to five universities — the University of Birmingham, Aston University,
          Birmingham City University, Newman University, and University College Birmingham — with
          a combined student population of over 80,000. The areas surrounding these institutions,
          particularly Selly Oak, Edgbaston, and Aston, have high concentrations of student HMOs.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — Birmingham City Council operates
                mandatory licensing for HMOs with 5 or more occupants forming 2 or more households.
                Electrical conditions include a valid{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>, LD2 fire
                detection, and emergency lighting in larger properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selly Oak Article 4 direction</strong> — Birmingham City Council has an
                Article 4 direction in the Selly Oak area specifically targeting HMO conversions.
                While this primarily affects planning permission for new HMOs, it reflects the
                council's close attention to property standards in the area — including electrical
                safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire detection requirements</strong> — LD2 grade interlinked fire detection
                is required in all licensable HMOs. Heat detectors in kitchens, smoke detectors in
                hallways, landings, and living areas, all mains-wired with battery backup. The
                specification must comply with BS 5839-6.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Summer turnaround period</strong> — June to September is the busiest period
                for HMO electrical work in Birmingham, as landlords carry out compliance work,
                upgrades, and repairs between tenancy periods. Book early if you need electrical
                work during this window.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hs2-development',
    heading: 'HS2 and New Development Driving Electrical Demand',
    content: (
      <>
        <p>
          Birmingham is undergoing one of the largest infrastructure and regeneration programmes in
          the UK. The HS2 high-speed railway terminus at Curzon Street, the Smithfield development
          (on the former wholesale markets site), the Digbeth creative quarter regeneration, and
          ongoing residential development across the city are all driving demand for electrical
          work at every scale.
        </p>
        <p>
          For domestic customers, this means that qualified electricians are in high demand across
          Birmingham. Non-urgent work (rewires, consumer unit upgrades, additional circuits) may
          require booking 2 to 4 weeks in advance, particularly during the spring and summer busy
          season. For urgent work (faults, safety issues, loss of power), most Birmingham
          electricians still offer next-day or same-day service, but at premium call-out rates.
        </p>
        <p>
          For electricians, the Birmingham market offers significant opportunities across domestic,
          commercial, and infrastructure work. The combination of a large existing housing stock
          (much of it requiring upgrades), strict HMO enforcement, and major new development
          means steady work with good margins for competent, registered contractors.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: The Birmingham Market',
    content: (
      <>
        <p>
          Birmingham is a strong market for electricians at all levels. The city offers a mix of
          domestic compliance work, residential refurbishment, commercial fit-outs, and large-scale
          infrastructure projects. Operating costs are lower than London, and rates are competitive.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Growth Areas</h4>
                <p className="text-white text-sm leading-relaxed">
                  EV charger installations are growing rapidly in Birmingham's suburban areas where
                  most properties have driveways. Heat pump installations are increasing as the
                  city's housing stock is retrofitted for energy efficiency. HMO compliance work
                  provides a steady base of EICR and fire detection work, particularly around the
                  university areas. Smart home installations and home office circuits are growing as
                  more Birmingham residents work from home.
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
                  Birmingham letting agents and property managers expect prompt, professional
                  certificates. Complete your{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> on your
                  phone and email the PDF before leaving site. This sets you apart from competitors
                  and speeds up the payment cycle with letting agents.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Birmingham electrical business"
          description="Join 430+ UK electricians using Elec-Mate for quoting, certification, and job management. Complete EICRs and EICs on site, send instant PDFs to letting agents and landlords. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianBirminghamPage() {
  return (
    <GuideTemplate
      title="Electrician in Birmingham | Find Local Electricians 2026"
      description="Find qualified, registered electricians in Birmingham. 2026 pricing guide, NICEIC/NAPIT verification, Victorian and 1930s rewiring, National Grid Electricity Distribution connections, HMO compliance in Selly Oak and Edgbaston, and HS2 development impact."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Birmingham:{' '}
          <span className="text-yellow-400">Find Local Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Birmingham, realistic local pricing, and the specific challenges of Birmingham property types. Covers NGED connections, HMO compliance in student areas, Part P, and the impact of HS2 and regeneration on the local market."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Birmingham"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site and send instant PDFs to Birmingham landlords and letting agents. 7-day free trial."
    />
  );
}
