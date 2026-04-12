import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  FileCheck2,
  PoundSterling,
  Zap,
  GraduationCap,
  Calculator,
  Home,
  Warehouse,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-nottingham' },
  { label: 'Nottingham', href: '/guides/electrician-nottingham' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Nottingham' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Nottingham' },
  { id: 'property-types', label: 'Nottingham Property Challenges' },
  { id: 'dno-regulations', label: 'NGED and Local Regulations' },
  { id: 'hmos', label: 'Student HMOs and Selective Licensing' },
  { id: 'lace-market', label: 'Lace Market Warehouse Conversions' },
  { id: 'for-electricians', label: 'For Electricians Working in Nottingham' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins. Verify registration numbers online on the scheme provider websites.',
  'National Grid Electricity Distribution (NGED, formerly Western Power Distribution) is the DNO for Nottingham. All new connections, supply upgrades, and G98/G99 notifications go through NGED.',
  'Nottingham City Council operates a selective licensing scheme covering several wards. Landlords in these areas must hold a licence and provide a valid EICR — creating consistent demand for electrical inspection work.',
  'The Lace Market and surrounding areas have a large stock of Victorian and Edwardian warehouse buildings being converted to residential and commercial use. These conversions require complete electrical installations with long cable runs and fire compartmentation.',
  'Nottingham has a large student HMO market concentrated in Lenton, Beeston, Dunkirk, and Radford, driven by the University of Nottingham and Nottingham Trent University. HMOs require enhanced fire detection, emergency lighting, and periodic EICR testing.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Nottingham?',
    answer:
      'Nottingham electrician day rates typically range from £280 to £380 per day for a qualified electrician, with hourly rates of £38 to £52 per hour. Common job prices include: full rewire of a 3-bed Victorian terrace £4,000 to £6,500, consumer unit replacement £450 to £700, EICR £170 to £280, EV charger installation £750 to £1,200, and additional socket from existing circuit £100 to £170. Prices in the Lace Market and city centre are typically 10% to 15% higher due to access and parking challenges. Always get at least three written quotes for significant work.',
  },
  {
    question: 'How do I check if a Nottingham electrician is properly qualified?',
    answer:
      'Ask for their competent person scheme registration number and verify it online. NICEIC (niceic.com/find-a-contractor), NAPIT (napit.org.uk/find-an-installer), and ELECSA (elecsa.co.uk/find-a-contractor) all have online search tools. NAPIT is headquartered in Nottingham, so there is a particularly strong concentration of NAPIT-registered electricians in the area. A legitimate electrician will also hold a current ECS (Electrotechnical Certification Scheme) card, carry public liability insurance (minimum £2 million recommended), and be able to provide references from recent local work.',
  },
  {
    question: 'Who is the DNO for Nottingham?',
    answer:
      'Nottingham is served by National Grid Electricity Distribution (NGED), formerly Western Power Distribution (WPD). NGED operates the electricity distribution network across the East Midlands, West Midlands, South West England, and South Wales. For new connections, supply upgrades, or meter relocations in Nottingham, apply through the NGED website (nationalgrid.co.uk/electricity-distribution). For power cuts, call 105. When completing an EIC or EICR in Nottingham, reference NGED as the DNO. The earthing arrangement in most Nottingham properties is TN-C-S (PME).',
  },
  {
    question: 'What is Nottingham selective licensing and how does it affect electricians?',
    answer:
      'Nottingham City Council operates a selective licensing scheme that requires landlords in designated wards to hold a licence for all privately rented properties — not just HMOs. As part of the licence conditions, landlords must provide a satisfactory EICR no older than 5 years. This creates significant ongoing demand for EICR work in areas like Arboretum, Berridge, Bulwell, Aspley, Bilborough, Hyson Green, and Radford. Non-compliance can result in civil penalties of up to £30,000 per property. For electricians, building relationships with letting agents and landlords in selective licensing areas provides a reliable stream of EICR work.',
  },
  {
    question: 'What electrical work is needed for Lace Market conversions?',
    answer:
      'The Lace Market and Hockley areas have many Victorian warehouse buildings being converted to apartments, offices, and mixed-use developments. Electrical work typically includes arranging new supplies through NGED (the existing supply may be industrial three-phase), complete new wiring with long cable runs through thick masonry, consumer unit installation per dwelling, fire alarm systems to BS 5839-6, emergency lighting to BS 5266, and communal area lighting. These buildings often have 450mm solid brick walls requiring core drilling for cable penetrations. Voltage drop calculations are critical for the long cable runs — use a cable sizing calculator to verify compliance before ordering materials.',
  },
  {
    question: 'Do I need building control approval for electrical work in Nottingham?',
    answer:
      'Notifiable electrical work in Nottingham is governed by Part P of the Building Regulations (England and Wales). Notifiable work includes new circuits, consumer unit replacements, work in bathrooms and kitchens involving new circuits, and work in special locations. If your electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or others), they can self-certify the work and notify Nottingham City Council on your behalf. If not registered, you must apply to Nottingham City Council Building Control before work starts — this adds cost (typically £250 to £350) and time.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete Electrical Installation Condition Reports on your phone for Nottingham selective licensing compliance.',
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
      'Size cables for long runs in Lace Market warehouse conversions with automatic derating.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional quotes for Nottingham customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in Nottingham',
    content: (
      <>
        <p>
          Nottingham is one of the largest cities in the East Midlands, with approximately 330,000
          residents in the city itself and over 770,000 in the wider urban area. The city has a
          diverse property stock ranging from Victorian terraces in Sherwood and Mapperley to
          post-war estates in Clifton and Bestwood, modern city centre apartments, and a growing
          number of warehouse conversions in the Lace Market and Hockley areas.
        </p>
        <p>
          The electrical contracting market in Nottingham benefits from two major universities
          (University of Nottingham and Nottingham Trent University) driving HMO demand, a busy city
          centre with ongoing commercial development, the tram corridor creating new commercial
          opportunities along its route, and a large stock of Victorian terraces requiring rewiring.
          NAPIT — one of the UK's largest competent person schemes — is headquartered in Nottingham,
          which means there is a particularly strong local network of registered electricians.
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
          Before hiring any electrician in Nottingham, verify their credentials. This protects you
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
                least £2 million public liability cover. For commercial work in the city centre or
                Lace Market conversions, £5 million is advisable. Ask for a copy of the certificate
                of insurance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references and reviews</strong> — ask for contact details of 2 to 3
                recent Nottingham customers, or check verified reviews on Checkatrade, Trustpilot,
                or Google Business. Look for reviews mentioning similar work to what you need.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be cautious of electricians who cannot provide a scheme registration number, offer
          significantly below-market rates, refuse to provide a written quote, or pressure you to
          pay cash without an invoice. These are common warning signs in any city's trades market.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Nottingham (2026 Prices)',
    content: (
      <>
        <p>
          Nottingham electrical work is priced competitively for the East Midlands — lower than
          London and the South East but in line with other major Midlands cities like Leicester and
          Derby. Here are realistic Nottingham prices for common domestic electrical work in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed Victorian terrace)</strong> — £4,000 to £6,500 including
                new consumer unit, all circuits, sockets, switches, lighting, testing, and Part P
                certification. Victorian terraces in Sherwood and Mapperley with lath-and-plaster
                walls are at the upper end due to the additional care required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £450 to £700 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and Part P
                notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (Electrical Installation Condition Report)</strong> — £170 to £280 for
                a house, £150 to £230 for a flat. Required every 5 years for all rented properties
                and for selective licensing compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket (from existing circuit)</strong> — £100 to £170 per single
                socket, depending on cable run length and wall construction. Flush-mounted in solid
                brick costs more than surface-mounted in a stud wall.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £750 to £1,200 for a 7kW home charger
                including supply, installation, earthing, and Part P certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £120 to £200 for the first hour including
                travel, plus £45 to £65 per additional hour. Weekend and bank holiday rates are
                typically 50% higher.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are indicative for 2026. City centre and Lace Market work tends to be 10% to
          15% higher due to parking and access challenges. Always get at least three written quotes
          for any significant work.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Nottingham Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Nottingham's property stock presents a range of challenges for electrical work, from
          Victorian terraces with original wiring to modern tram corridor developments.
          Understanding these helps you know what to expect.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Victorian Terraces (Sherwood/Mapperley)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The Sherwood, Mapperley, Carrington, and Forest Fields areas have dense rows of
              late-Victorian and Edwardian bay-fronted terraces. Many still have original or
              1960s-era wiring with a mix of lead-sheathed and rubber-insulated cables. The
              lath-and-plaster walls crumble when chased, and cellars often contain a tangle of old
              wiring, gas pipes, and lead water pipes. A full rewire is typically the most practical
              approach for these properties.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Tram Corridor Commercial</h3>
            <p className="text-white text-sm leading-relaxed">
              The Nottingham Express Transit (NET) tram system has driven commercial development
              along its routes through Beeston, Hyson Green, and Hucknall. New retail units,
              offices, and mixed-use developments along the tram stops require commercial electrical
              installations, three-phase supplies, and separate metering arrangements. This is a
              growing market for electricians with commercial experience.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Student HMO Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Lenton, Dunkirk, Beeston, and Radford are dominated by student HMOs serving the
              University of Nottingham and Nottingham Trent University. These properties require
              enhanced fire detection (LD2 to BS 5839-6), emergency lighting on escape routes, and
              30mA RCD protection on all circuits per Regulation 411.3.3. Landlords must hold a
              valid EICR, creating steady inspection demand.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Large council-built estates in Clifton, Bestwood, and Bulwell from the 1950s and 1960s
              often have original radial circuits, rewirable fuses, and no RCD protection. Consumer
              unit upgrades to 18th Edition standards are the most common electrical job in these
              areas. Many properties in these wards also fall under the selective licensing scheme,
              requiring a valid EICR.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'NGED and Nottingham Electrical Regulations',
    content: (
      <>
        <p>
          National Grid Electricity Distribution (NGED), formerly Western Power Distribution (WPD),
          is the Distribution Network Operator for Nottingham and the wider East Midlands region.
          Any work affecting the electricity supply to your property involves NGED. This includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — if you need a new electricity
                supply or want to upgrade from single-phase to three-phase, apply through NGED's
                website (nationalgrid.co.uk/electricity-distribution). Nottingham lead times are
                typically 4 to 8 weeks for standard domestic connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — moving the electricity meter requires NGED to
                disconnect and reconnect the supply. Your electrician installs the new meter tails;
                NGED moves the meter and cutout. Common in Lace Market conversions where the
                existing meter position does not suit the new layout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification</strong> — solar PV, battery storage, or generator
                installations require notification to NGED under Engineering Recommendation G98 (for
                systems up to 16A per phase) or G99 (for larger systems). Submit via the ENA portal
                or directly to NGED.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work in Nottingham is overseen by Nottingham City
          Council Building Control or an approved inspector. If your electrician is registered with
          a competent person scheme, they self-certify and notify the council on your behalf.
        </p>
      </>
    ),
  },
  {
    id: 'hmos',
    heading: 'Student HMOs and Selective Licensing in Nottingham',
    content: (
      <>
        <p>
          Nottingham has approximately 50,000 students across its two universities, driving one of
          the largest student HMO markets in the Midlands. The City Council also operates a
          selective licensing scheme covering several wards, meaning even non-HMO private rentals
          require licences and valid EICRs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective licensing</strong> — Nottingham City Council's selective licensing
                scheme covers wards including Arboretum, Berridge, Bulwell, Aspley, Bilborough,
                Hyson Green, and Radford. All privately rented properties in these areas require a
                licence, and a satisfactory EICR is a mandatory licence condition. This creates
                thousands of EICR jobs every licensing cycle.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO fire detection</strong> — HMOs in Nottingham require a Grade A1 LD2 fire
                detection system to BS 5839-6. This means interlinked mains-powered detectors with
                battery backup in all escape routes, kitchens (heat detectors), and principal
                habitable rooms. The council inspects actively in Lenton and Radford.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting</strong> — escape routes in HMOs must have emergency
                lighting to BS 5266. Monthly function tests and annual full-duration tests are
                required, with records kept. This is a recurring maintenance contract opportunity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — all socket outlet circuits in HMOs must have 30mA
                RCD protection as required by Regulation 411.3.3 of BS 7671. A dual-RCD or RCBO
                consumer unit is the standard approach for HMO consumer unit upgrades.
              </span>
            </li>
          </ul>
        </div>
        <p>
          HMO and selective licensing work is a reliable revenue stream for Nottingham electricians.
          Building relationships with student letting agents like Unipol, Studentpad, and local
          agencies in Lenton and Beeston provides consistent year-round work.
        </p>
      </>
    ),
  },
  {
    id: 'lace-market',
    heading: 'Lace Market Warehouse Conversions',
    content: (
      <>
        <p>
          The Lace Market is Nottingham's historic textile quarter, centred around High Pavement,
          Stoney Street, and Broadway. The area contains a concentration of Victorian and Edwardian
          warehouse buildings, many Grade II listed, that are being converted to residential
          apartments, offices, restaurants, and creative workspaces.
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Warehouse className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed building constraints</strong> — many Lace Market buildings are Grade
                II listed. Electrical work affecting the character of the building requires Listed
                Building Consent. Surface-mounted conduit, external fittings, and cable routes must
                be agreed with Nottingham City Council conservation officers. Concealed wiring
                routes and sympathetic accessory choices are essential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Warehouse className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thick masonry walls</strong> — warehouse buildings have 450mm to 600mm solid
                brick walls. Core drilling for cable penetrations requires specialist equipment.
                Plan routes to minimise penetrations and use existing openings. The{' '}
                <SEOInternalLink href="/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                helps verify cable sizes for the long runs typical in these buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Warehouse className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply arrangements</strong> — former industrial buildings may have an
                existing three-phase supply that needs reconfiguring for residential use. Coordinate
                with NGED early to determine whether new service heads are required for each
                dwelling unit or whether a landlord supply with sub-metering is appropriate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Warehouse className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire compartmentation</strong> — when cables pass through fire-rated walls
                or floors in multi-dwelling conversions, fire-stopping must be installed to maintain
                compartmentation. Use proprietary fire-stop products appropriate for the cable size
                and wall construction. This is particularly critical in listed buildings where
                original timber floors are retained.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Lace Market conversion projects are high-value work. A complete electrical package for a
          multi-unit residential conversion can be worth £30,000 to £70,000 depending on the number
          of units and specification. Experience with listed buildings and heritage properties is a
          significant advantage when tendering for this work.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Nottingham Market',
    content: (
      <>
        <p>
          Nottingham offers a diverse and consistent workload for electrical contractors. The
          combination of selective licensing compliance, student HMOs, warehouse conversions, tram
          corridor commercial work, and domestic rewiring of the city's Victorian housing stock
          creates year-round demand.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Selective Licensing Opportunity</h4>
                <p className="text-white text-sm leading-relaxed">
                  Nottingham's selective licensing scheme means thousands of rental properties need
                  valid EICRs. Contact letting agents in covered wards (Arboretum, Berridge,
                  Bulwell, Aspley) to offer bulk EICR packages. A portfolio of 20 to 30 properties
                  for one agent provides steady quarterly work.
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
                  Nottingham landlords and managing agents expect prompt, professional certificates.
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
          title="Run your Nottingham electrical business from your phone"
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

export default function ElectricianNottinghamPage() {
  return (
    <GuideTemplate
      title="Electrician in Nottingham | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Nottingham. Realistic 2026 pricing, NGED DNO connections, selective licensing EICR requirements, Lace Market conversions, student HMO compliance, and Part P guidance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Nottingham:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Nottingham, what to expect on pricing, and the specific challenges of electrical work in Nottingham properties. Covers NGED connections, selective licensing, Lace Market conversions, student HMOs, and Part P compliance."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Nottingham"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Nottingham and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
