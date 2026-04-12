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
  Users,
  Factory,
  Droplets,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-derby' },
  { label: 'Derby', href: '/guides/electrician-derby' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Derby' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Derby' },
  { id: 'property-types', label: 'Derby Property Challenges' },
  { id: 'dno-regulations', label: 'NGED and Local Regulations' },
  { id: 'industrial-commercial', label: 'Rolls-Royce and Industrial Electrical Work' },
  { id: 'flood-risk', label: 'Flood Risk Areas and Electrical Safety' },
  { id: 'for-electricians', label: 'For Electricians Working in Derby' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins. You can verify registration numbers online on the scheme provider websites.',
  "NGED (National Grid Electricity Distribution, formerly Western Power Distribution) is Derby's DNO. Any work affecting the incoming supply, meter position, or requiring a new connection must be coordinated with NGED.",
  "Derby's Rolls-Royce campus and rail industry (Alstom/Hitachi) generate significant commercial and industrial electrical work, often requiring specialist clearances and qualifications beyond standard domestic competence.",
  'Properties in flood risk areas along the River Derwent (Darley Abbey, Little Chester, Alvaston) need careful consideration of consumer unit height, IP ratings for ground-level accessories, and flood-resilient installation practices.',
  'The Cathedral Quarter and Darley Abbey Mills (UNESCO World Heritage buffer zone) are conservation areas requiring Listed Building Consent and planning permission for external electrical alterations.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Derby?',
    answer:
      'Derby electrician day rates typically range from £220 to £310 per day for a qualified electrician. Hourly rates are usually £35 to £50 per hour, with emergency call-out rates of £60 to £95 per hour. These rates are broadly in line with the East Midlands average — lower than London and the South East, but comparable to Nottingham and Leicester. Industrial and commercial rates (particularly for Rolls-Royce subcontract work) are higher. Always get a fixed quote for defined work rather than agreeing to day rates where possible.',
  },
  {
    question: 'How do I check if a Derby electrician is properly qualified?',
    answer:
      'Ask for their competent person scheme registration number and verify it online. NICEIC (niceic.com/find-a-contractor), NAPIT (napit.org.uk/find-an-installer), and ELECSA (elecsa.co.uk/find-a-contractor) all have online search tools. NAPIT is headquartered in Derby, so there is a particularly strong presence of NAPIT-registered electricians in the area. A legitimate electrician will also hold a current ECS card, carry public liability insurance (minimum £2 million recommended), and be able to provide references from recent local work.',
  },
  {
    question: 'How long does a full rewire take in a Derby Victorian terrace?',
    answer:
      "A full rewire of a typical 3-bedroom Victorian terraced house in areas like Normanton, Pear Tree, or Rose Hill takes 6 to 9 working days with a team of two electricians, plus 1 to 2 days for testing and certification. Derby's Victorian properties have solid brick walls, high ceilings (typically 2.7 to 3 metres), and often multiple previous partial rewires. Properties that have been converted into student flats or bedsits may take longer due to additional circuits and fire alarm requirements. The larger Victorian and Edwardian detached houses in Littleover and Mickleover will take proportionally longer.",
  },
  {
    question: 'Do I need building control approval for electrical work in Derby?',
    answer:
      'Notifiable electrical work in Derby (as in the rest of England) is governed by Part P of the Building Regulations. Notifiable work includes new circuits, consumer unit replacements, work in bathrooms and kitchens involving new circuits, and work in special locations. If your electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or others), they can self-certify the work and notify Derby City Council on your behalf. If the electrician is not registered, you must apply to Derby City Council building control for approval before work starts, which adds cost (typically £200 to £350) and time.',
  },
  {
    question: 'What is an EICR and do I need one for my Derby rental property?',
    answer:
      'An Electrical Installation Condition Report (EICR) is a formal inspection and test of the fixed electrical installation in a property. Since April 2021, landlords in England are legally required to have a valid EICR for rented properties, carried out at least every 5 years or at each change of tenancy. For Derby properties, an EICR typically costs £170 to £280 for a 2 to 3 bedroom flat, and £240 to £380 for a 3 to 4 bedroom house. Older properties in Normanton and the inner suburbs frequently receive C2 (potentially dangerous) or C3 (improvement recommended) codes due to aged wiring and lack of RCD protection compliant with Regulation 411.3.3.',
  },
  {
    question: 'Who is the electricity supplier for Derby and how do I get a new connection?',
    answer:
      "NGED (National Grid Electricity Distribution, formerly Western Power Distribution or WPD) is the Distribution Network Operator for Derby and the East Midlands. To request a new supply, upgraded supply, or meter relocation, you apply through NGED's website (nationalgrid.co.uk/electricity-distribution). Lead times for new connections in Derby are typically 4 to 8 weeks. Costs vary — a simple meter relocation might be £400 to £1,200, while a new three-phase supply can cost £2,000 to £6,500 depending on the distance from the existing network. Your electrician can advise on whether your existing supply is adequate and submit the NGED application on your behalf.",
  },
  {
    question:
      'My Derby property is in a flood risk area. What should I consider for electrical work?',
    answer:
      'Properties along the River Derwent (Darley Abbey, Little Chester, parts of Alvaston, Derby city centre) are in flood risk zones. For these properties, consider relocating the consumer unit above the maximum recorded flood level (or at least 1.5 metres above floor level), installing flood-resilient wiring (circuits below flood level should be radial, not ring, so they can be individually isolated), using IP67 or higher rated accessories at ground level, and ensuring the main earthing terminal and bonding connections are accessible and above flood level. BS 7671 Regulation 421.1 covers protection against the effects of water, and the BEAMA guide on flood-resilient electrical installations provides practical guidance.',
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
    description: 'Create professional quotes for Derby customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in Derby',
    content: (
      <>
        <p>
          Derby is a city of around 260,000 people in the East Midlands, with an economy dominated
          by advanced manufacturing — most notably Rolls-Royce (which employs over 12,000 people at
          its Sinfin campus) and the rail industry (Alstom and Hitachi Rail). This industrial base
          creates significant demand for commercial and industrial electricians alongside the usual
          domestic market.
        </p>
        <p>
          The Derby electrical market ranges from sole traders handling domestic rewires, EICRs, and
          consumer unit upgrades in the Victorian terraces of Normanton and the inter-war estates of
          Chaddesden, through to larger firms servicing Rolls-Royce contracts, the Royal Derby
          Hospital, and commercial developments in the Cathedral Quarter. The University of Derby
          also drives demand for student accommodation compliance work.
        </p>
        <p>
          Whatever the size of the firm, the qualifications and registration requirements are the
          same. Every electrician carrying out notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          must either be registered with a competent person scheme or have the work inspected and
          signed off by Derby City Council building control. The most recognised competent person
          schemes are <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,
          NAPIT (headquartered in Derby), ELECSA, and STROMA.
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
          Before hiring any electrician in Derby, verify their credentials. This protects you
          legally, financially, and physically. Here is what to check:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — ask for their NICEIC, NAPIT,
                ELECSA, or other scheme registration number. Search it online on the scheme
                provider's website to confirm it is current. NAPIT is based in Derby (at Pride
                Park), so a large proportion of Derby electricians are NAPIT-registered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS card</strong> — the Electrotechnical Certification Scheme card confirms
                the holder's qualifications and competence level. A gold ECS card indicates a
                qualified electrician (typically holding C&G 2365/2357 and C&G 2391 or equivalent).
                For Rolls-Royce or rail industry work, additional JIB grading may be required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — ensure your electrician carries at
                least £2 million public liability cover. For commercial and industrial work, higher
                cover (£5 million to £10 million) is often required as a contract condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references and reviews</strong> — ask for contact details of 2 to 3
                recent Derby customers, or check verified reviews on platforms like Checkatrade,
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
    heading: 'Typical Electrician Costs in Derby (2026 Prices)',
    content: (
      <>
        <p>
          Derby electrical work costs are broadly in line with the East Midlands average. Here are
          realistic Derby prices for common domestic electrical work in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed Victorian terrace)</strong> — £4,500 to £7,000 including
                new consumer unit, all circuits, sockets, switches, lighting, testing, and Part P
                certification. Victorian terraces in Normanton and Pear Tree with solid walls are at
                the upper end; post-war semis in Chaddesden, Spondon, and Oakwood are at the lower
                end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £430 to £720 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and Part P
                notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (Electrical Installation Condition Report)</strong> — £170 to £280 for
                a flat, £240 to £380 for a house. Required every 5 years for rented properties.
                Larger detached properties in Allestree, Darley Abbey, and Littleover command higher
                EICR costs due to the size of the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket (from existing circuit)</strong> — £90 to £160 per single
                socket, depending on cable run length and wall construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £650 to £1,200 for a 7kW home charger
                including supply, installation, earthing, and Part P certification. Derby's suburban
                layout means most properties have driveways, making EV charger installations more
                straightforward than in inner-city terraced streets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £110 to £190 for the first hour including
                travel, plus £40 to £65 per additional hour. Weekend and bank holiday rates are
                typically 50% higher.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are indicative for 2026 and vary across Derby. Inner-city areas and older
          properties tend to cost more due to complexity; newer suburbs are generally less
          expensive. Always get at least three written quotes for any significant work.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Derby Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Derby's property stock reflects its industrial heritage, with a mix of Victorian workers'
          terraces, inter-war and post-war estates, and modern developments. Understanding these
          property types helps you know what to expect when hiring an electrician.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Normanton, Pear Tree, Rose Hill, and parts of the city centre have large stocks of
              Victorian terraced housing built for factory workers. These properties have solid
              brick walls, high ceilings, and often multiple previous partial rewires. Many have
              been converted into student accommodation or HMOs for the University of Derby, adding
              fire alarm and emergency lighting requirements. The typical 2-up-2-down layout means
              relatively compact rewires, but the solid wall construction adds time and cost.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Inter-War and Post-War Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Chaddesden, Spondon, Mackworth, and Oakwood have extensive 1930s to 1960s housing
              estates. These semi-detached and terraced houses are generally easier to rewire than
              Victorian properties (cavity walls, lower ceilings), but many retain original or
              partially upgraded wiring. Common EICR findings include outdated consumer units,
              absence of RCD protection, and deteriorated rubber-insulated cables. The Mackworth
              estate, one of the largest in Derby, has many properties approaching or past the
              recommended 25-year rewire interval.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cathedral Quarter Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              The Cathedral Quarter in Derby city centre combines listed buildings, heritage
              shopfronts, and newer infill developments. Electrical work in listed buildings
              requires Listed Building Consent for any alterations affecting the building's
              character. The mix of residential, commercial, and hospitality uses in the Quarter
              means electricians need to be comfortable with both domestic and commercial
              installations.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">University Student Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              The University of Derby (Kedleston Road campus and city centre campus) drives demand
              for student HMO compliance work in surrounding areas — Kedleston Road, Stockbrook
              Street, and parts of Normanton. HMOs must meet Derby City Council licensing conditions
              including mains-powered interlinked smoke and heat detection, emergency lighting on
              escape routes, and RCD protection on all circuits. Purpose-built student accommodation
              blocks also require periodic testing and fire alarm maintenance.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'NGED and Derby Electrical Regulations',
    content: (
      <>
        <p>
          NGED (National Grid Electricity Distribution, formerly Western Power Distribution) is the
          Distribution Network Operator for Derby and the East Midlands. Any work affecting the
          electricity supply to your property involves NGED. This includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — if you need a new electricity
                supply or want to upgrade from single-phase to three-phase (for EV chargers, heat
                pumps, or workshop equipment), you apply to NGED. Derby lead times are typically 4
                to 8 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — moving the electricity meter requires NGED to
                disconnect and reconnect the supply. Your electrician installs the new meter tails;
                NGED moves the meter and cutout. This is common during kitchen extensions and
                property conversions in Derby's older housing stock.
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
          compliance, notifiable electrical work in Derby is overseen by Derby City Council building
          control or by an approved inspector. If your electrician is registered with a competent
          person scheme, they self-certify and notify the council on your behalf. Derby City Council
          also has an HMO licensing team that enforces additional electrical requirements for Houses
          in Multiple Occupation.
        </p>
      </>
    ),
  },
  {
    id: 'industrial-commercial',
    heading: 'Rolls-Royce and Industrial Electrical Work in Derby',
    content: (
      <>
        <p>
          Derby's industrial base creates electrical work opportunities that are unusual for a city
          of this size. The engineering and manufacturing sector is the largest employer in the city
          and drives demand for specialist electrical contractors:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rolls-Royce</strong> — the Sinfin campus and associated facilities are
                Derby's single largest employer. Electrical subcontract work at Rolls-Royce requires
                SC (Security Clearance), compliance with Rolls-Royce's own electrical safety
                standards (which exceed BS 7671 in some respects), and often CSCS/ECS cards with
                specific grading. The work ranges from high-voltage distribution and motor control
                to test cell installations and office fit-outs. Babcock and other tier-1 contractors
                manage most of the subcontracting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rail industry</strong> — Alstom (formerly Bombardier) and Hitachi Rail have
                major facilities in Derby, including the Litchurch Lane works where train carriages
                are manufactured. Electrical work in rail manufacturing involves industrial
                three-phase distribution, heavy power systems, and compliance with rail industry
                standards. Network Rail's East Midlands infrastructure also generates maintenance
                and upgrade contracts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pride Park and commercial developments</strong> — Pride Park business area
                and the wider A52 corridor house commercial and industrial units requiring periodic
                testing, fit-outs, and electrical maintenance. The Royal Derby Hospital (one of the
                largest NHS trusts in the country) also generates specialist medical electrical
                work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'flood-risk',
    heading: 'Flood Risk Areas and Electrical Safety',
    content: (
      <>
        <p>
          The River Derwent runs through the centre of Derby, and several residential areas are
          within Flood Zone 2 or 3. After the major floods of 2000 and more recent surface water
          events, flood-resilient electrical installations are increasingly important for Derby
          properties:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit positioning</strong> — in flood risk areas (Darley Abbey,
                Little Chester, parts of Alvaston, city centre riverside), the consumer unit should
                be mounted above the maximum recorded flood level or at least 1.5 metres above
                finished floor level. This allows the main switch to remain accessible and reduces
                the risk of water damage to the distribution board during a flood event.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit design for flood resilience</strong> — circuits serving ground floor
                sockets and appliances in flood risk properties should be designed as radial
                circuits (not ring finals) so they can be individually isolated without affecting
                the entire installation. First floor and above circuits can remain on separate
                MCBs/RCBOs, allowing the property to retain power upstairs during a flood event.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-flood EICR</strong> — after any flood event, the electrical
                installation must be inspected and tested before being re-energised. Water damage to
                cables, accessories, and the consumer unit can create hidden faults. An EICR should
                be carried out by a qualified electrician before the supply is restored. Insurance
                companies typically require this before settling flood damage claims.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The BEAMA guide to flood-resilient electrical installations and BS 7671 Regulation 421.1
          (protection against effects of water) provide guidance. Any electrician working on
          properties in Derby's flood risk areas should be familiar with these requirements.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Derby Market',
    content: (
      <>
        <p>
          Derby offers a diverse electrical market with a unique combination of heavy industry,
          domestic work, and heritage properties. The city's manufacturing base provides a
          consistent flow of commercial and industrial work that many similarly sized cities lack,
          while the domestic market is steady with a large stock of properties needing upgrades.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Factory className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Industrial and Commercial Opportunities
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Derby's Rolls-Royce campus, rail manufacturing, and Pride Park business area offer
                  commercial electrical work that is well above domestic rates. Getting on approved
                  contractor lists for these facilities requires JIB grading, security clearance,
                  and compliance with site-specific safety requirements, but the work is consistent
                  and well-paid. Building relationships with tier-1 contractors like Babcock and ISG
                  is the route into this market.
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
                  Whether you are serving the domestic market or industrial clients, professional
                  documentation sets you apart. An{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> completed on
                  a phone app and sent as a PDF before you leave site demonstrates professionalism
                  that landlords, homeowners, and commercial clients all value.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Derby electrical business from your phone"
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

export default function ElectricianDerbyPage() {
  return (
    <GuideTemplate
      title="Electrician in Derby | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Derby. Realistic 2026 pricing, how to verify NICEIC/NAPIT registration, Victorian terrace rewiring, NGED connections, Rolls-Royce industrial work, flood risk electrical safety, and Cathedral Quarter conservation requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Derby:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Derby, what to expect on pricing, and the specific challenges of electrical work in an industrial city. Covers NGED connections, Part P compliance, Victorian terrace rewiring, Rolls-Royce and rail industry contracts, flood risk electrical safety, and Cathedral Quarter heritage requirements."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Derby"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Derby and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
