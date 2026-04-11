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
  Calculator,
  ClipboardCheck,
  Home,
  Factory,
  TreePine,
  Store,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-sheffield' },
  { label: 'Sheffield', href: '/guides/electrician-sheffield' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Sheffield' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Sheffield' },
  { id: 'dno-regulations', label: 'Northern Powergrid DNO' },
  { id: 'industrial-conversions', label: 'Steel City Industrial Conversions' },
  { id: 'property-types', label: 'Sheffield Property Challenges' },
  { id: 'hmos', label: 'Student HMO Requirements' },
  { id: 'conservation', label: 'Peak District Conservation Areas' },
  { id: 'meadowhall', label: 'Meadowhall Commercial Area' },
  { id: 'for-electricians', label: 'For Electricians Working in Sheffield' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins. Verify registration numbers online on the scheme provider websites.',
  'Northern Powergrid is the DNO for Sheffield and the wider South Yorkshire region. All new connections, supply upgrades, and G98/G99 notifications go through Northern Powergrid, not National Grid.',
  'Sheffield has a large stock of former steel manufacturing and cutlery factory buildings being converted to residential and commercial use in areas like Kelham Island and Neepsend. These conversions require complete electrical installations with long cable runs, three-phase supply reconfiguration, and fire compartmentation.',
  'Sheffield Hallam University and the University of Sheffield drive high demand for HMO electrical work in Broomhill, Crookesmoor, Ecclesall Road, and Sharrow. HMOs require enhanced fire detection, emergency lighting, and periodic EICR testing.',
  "Properties on Sheffield's western edge border the Peak District National Park, where conservation area restrictions affect external electrical work including EV charger installations, solar PV, and external cable routing.",
];

const faqs = [
  {
    question: 'How much does an electrician cost in Sheffield?',
    answer:
      'Sheffield electrician day rates typically range from £280 to £380 per day for a qualified electrician, with hourly rates of £38 to £52 per hour. Common job prices include: full rewire of a 3-bed stone terrace £4,000 to £6,000, consumer unit replacement £450 to £700, EICR £170 to £270, EV charger installation £750 to £1,100, additional socket from existing circuit £95 to £160, and HMO fire alarm installation £600 to £1,200. Prices are higher for conservation area work in Dore, Totley, and Bradfield due to planning considerations. Always get at least three written quotes for significant work.',
  },
  {
    question: 'How do I check if a Sheffield electrician is properly qualified?',
    answer:
      'Ask for their competent person scheme registration number and verify it online. NICEIC (niceic.com/find-a-contractor), NAPIT (napit.org.uk/find-an-installer), and ELECSA (elecsa.co.uk/find-a-contractor) all have online search tools. A legitimate electrician will hold a current ECS (Electrotechnical Certification Scheme) card, carry public liability insurance (minimum £2 million recommended), and provide references from recent local work. For industrial conversion projects, ask specifically for experience with large-scale conversion work.',
  },
  {
    question: 'Who is the DNO for Sheffield?',
    answer:
      'Sheffield is served by Northern Powergrid. They operate the electricity distribution network across South Yorkshire, West Yorkshire, North East England, and northern Lincolnshire, serving approximately 3.9 million customers. For new connections, apply online at northernpowergrid.com or call 0800 011 3332. New domestic connections typically take 30 to 60 working days. For power cuts, call 105. When completing an EIC or EICR in Sheffield, reference Northern Powergrid as the DNO. Most Sheffield properties have TN-C-S (PME) earthing, though some rural properties towards the Peak District may be TT.',
  },
  {
    question: 'What electrical work is needed for Sheffield industrial conversions?',
    answer:
      'Sheffield has a significant stock of former steelworks, cutlery factories, and industrial buildings in Kelham Island, Neepsend, Attercliffe, and the Wicker being converted to residential apartments, offices, and mixed-use developments. The electrical work typically includes arranging new supplies through Northern Powergrid (existing three-phase industrial supply may need converting), complete new wiring with long cable runs through thick masonry walls (often 450mm to 600mm solid stone or brick), consumer unit installation per dwelling, fire alarm systems to BS 5839-6, emergency lighting to BS 5266, and communal area lighting. Voltage drop calculations are critical for the long cable runs typical of these buildings.',
  },
  {
    question: 'What are the HMO electrical requirements in Sheffield?',
    answer:
      'Sheffield City Council requires all licensable HMOs to have a valid EICR with a satisfactory outcome, no older than 5 years. HMOs must have a Grade A1 LD2 fire detection system (interlinked mains-powered smoke and heat detectors in escape routes, kitchens, and habitable rooms), emergency lighting on escape routes to BS 5266, and 30mA RCD protection on all socket outlet circuits per Regulation 411.3.3. The council actively inspects HMOs in the Broomhill and Crookesmoor areas near the universities. Non-compliance can result in licence revocation and civil penalties up to £30,000.',
  },
  {
    question: 'Do Peak District conservation areas affect electrical installations?',
    answer:
      'Yes. Properties in or near the Peak District National Park conservation areas (including parts of western Sheffield such as Dore, Totley, Bradfield, and the Rivelin Valley) are subject to planning restrictions that affect visible external electrical work. EV charger installations may require planning permission if visible from a public highway. Solar PV panels may need consent on highway-facing elevations or listed buildings. External cable routing may be restricted. The Peak District National Park Authority handles properties within the park boundary; Sheffield City Council handles conservation areas within the city boundary. Always check before starting external work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete Electrical Installation Condition Reports on site for Sheffield HMOs and domestic properties.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for long runs in industrial conversion projects, accounting for voltage drop.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates for new-build flats and conversion projects.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installation guidance including conservation area planning considerations.',
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
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional quotes for Sheffield customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in Sheffield',
    content: (
      <>
        <p>
          Sheffield is the fifth-largest city in England by population, with approximately 560,000
          residents and a diverse mix of Victorian stone terraces, post-war council housing, modern
          city centre apartments, and former industrial buildings being converted for residential
          and commercial use. The city has two major universities, a thriving student rental market,
          and significant ongoing regeneration across areas like Kelham Island, Neepsend, and
          Attercliffe.
        </p>
        <p>
          For electricians, Sheffield offers a strong and varied workload. The combination of
          industrial heritage conversions, a large HMO market driven by the universities, ongoing
          domestic rewiring of the city's older housing stock in Crookes, Walkley, and Hillsborough,
          new-build developments in areas like Waverley and Owlthorpe, and commercial opportunities
          around Meadowhall creates consistent demand for qualified electrical contractors.
        </p>
        <p>
          Every electrician carrying out notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          must either be registered with a competent person scheme or have the work inspected and
          signed off by local authority building control. The most recognised schemes are{' '}
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
        <p>
          Before hiring any electrician in Sheffield, verify their credentials. This protects you
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
                least £2 million public liability cover. For industrial conversion and commercial
                Meadowhall work, £5 million is advisable. Ask for a copy of the insurance
                certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references and reviews</strong> — ask for contact details of 2 to 3
                recent Sheffield customers, or check verified reviews on Checkatrade, Trustpilot, or
                Google Business. Look for reviews mentioning similar work to yours.
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
    heading: 'Typical Electrician Costs in Sheffield (2026 Prices)',
    content: (
      <>
        <p>
          Sheffield electrician rates reflect the city's position as a major Northern city with a
          lower cost base than London and the South East. Rates are competitive and comparable to
          other South Yorkshire towns but slightly higher due to Sheffield's larger commercial and
          university-driven market.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4">
              <h4 className="font-bold text-white mb-2">Day Rates</h4>
              <ul className="space-y-2 text-white text-sm">
                <li>Qualified electrician: £280 to £380/day</li>
                <li>Hourly rate: £38 to £52/hour</li>
                <li>Apprentice (with supervision): £100 to £140/day</li>
                <li>Emergency call-out: £110 to £190 first hour</li>
              </ul>
            </div>
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-bold text-white mb-2">Common Domestic Jobs</h4>
              <ul className="space-y-2 text-white text-sm">
                <li>Consumer unit replacement: £450 to £700</li>
                <li>Full rewire (3-bed stone terrace): £4,000 to £6,000</li>
                <li>EICR: £170 to £270</li>
                <li>EV charger install: £750 to £1,100</li>
              </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h4 className="font-bold text-white mb-2">HMO Work</h4>
              <ul className="space-y-2 text-white text-sm">
                <li>HMO EICR (5-bed): £220 to £320</li>
                <li>Fire alarm install (LD2): £600 to £1,200</li>
                <li>Emergency lighting: £400 to £800</li>
                <li>Annual fire alarm test: £80 to £150</li>
              </ul>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
              <h4 className="font-bold text-white mb-2">Conservation Area Premium</h4>
              <ul className="space-y-2 text-white text-sm">
                <li>Add 15% to 25% for Dore/Totley/Bradfield</li>
                <li>Planning liaison time: £50 to £100</li>
                <li>Listed building work: quote individually</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          These prices are indicative and vary based on property condition, access, and
          specification. Use Elec-Mate's{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink> to
          build accurate, itemised quotes on site and send professional PDFs to customers instantly.
        </p>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: "Northern Powergrid: Sheffield's DNO",
    content: (
      <>
        <p>
          Northern Powergrid is the Distribution Network Operator for Sheffield and the wider South
          Yorkshire, West Yorkshire, North East England, and northern Lincolnshire region, serving
          approximately 3.9 million homes and businesses.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections:</strong> Apply online at northernpowergrid.com or call 0800
                011 3332. New domestic connections in Sheffield typically take 30 to 60 working days
                from application to energisation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Service upgrades:</strong> If a property needs a larger supply (for example,
                upgrading from 60A to 100A for an EV charger and heat pump), request a service
                alteration through Northern Powergrid. The existing cut-out and service cable will
                be assessed and replaced if necessary.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications:</strong> Solar PV and battery storage up to 16A per
                phase require G98 notification. Larger systems require G99 approval. Submit via the
                ENA portal or directly to Northern Powergrid.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power cuts:</strong> Report via 105. Sheffield occasionally experiences
                supply issues in older areas with ageing underground cables, particularly during
                winter peak demand.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When completing an <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> or{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> in Sheffield,
          reference Northern Powergrid as the DNO. The earthing arrangement in most Sheffield
          properties is TN-C-S (PME), though some older properties towards the Peak District may be
          TT earthing requiring an earth electrode.
        </p>
      </>
    ),
  },
  {
    id: 'industrial-conversions',
    heading: 'Steel City Industrial Conversions',
    content: (
      <>
        <p>
          Sheffield's industrial heritage means there is a substantial stock of former steelworks,
          cutlery factories, and workshops being converted for residential and commercial use.
          Kelham Island, Neepsend, Attercliffe, and the Wicker are the primary areas for this type
          of development.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply arrangements:</strong> Former industrial buildings often have a
                three-phase supply that may be oversized for residential use or may need splitting
                into individual single-phase supplies per dwelling. Coordinate with Northern
                Powergrid early to determine the best supply arrangement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long cable runs and thick masonry:</strong> Industrial buildings have cable
                runs of 30 metres or more and walls of 450mm to 600mm solid stone or brick. Voltage
                drop calculations are critical — use the{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                to verify compliance before ordering. Core drilling for penetrations requires
                specialist equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire compartmentation:</strong> When cables pass through fire-rated walls or
                floors in multi-dwelling conversions, fire-stopping must be installed using
                proprietary products (Hilti, Rockwool, Quelfire) appropriate for the cable size and
                wall construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communal systems:</strong> Conversion projects require communal lighting
                with emergency lighting to BS 5266, fire detection in communal areas to BS 5839-1,
                and a separate landlord supply. Each dwelling needs its own consumer unit and EIC.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Industrial conversions are high-value projects. A complete electrical package for a
          10-unit residential conversion in a former Sheffield factory can be worth £40,000 to
          £80,000 depending on specification and complexity.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Sheffield Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Sheffield's property stock includes distinctive stone-built terraces, post-war housing
          estates, and modern apartments, each presenting different challenges for electricians.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Stone Terraces (Crookes/Walkley)</h3>
            <p className="text-white text-sm leading-relaxed">
              The Crookes, Walkley, Netherthorpe, and Hillsborough areas have dense rows of
              Victorian and Edwardian stone-built terraces. Unlike the brick terraces common in
              other cities, Sheffield's stone construction makes chasing for cables significantly
              harder — local sandstone is dense and difficult to cut cleanly. Many electricians
              prefer surface-mounted mini trunking or routing through floor voids rather than
              chasing stone walls. These properties frequently have cellars with original wiring and
              damp issues that complicate electrical work.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Large council-built estates in Manor, Arbourthorne, Gleadless, and Parson Cross from
              the 1950s and 1960s often have original radial circuits, rewirable fuses, and no RCD
              protection. Consumer unit upgrades to 18th Edition standards are common work. Some
              properties have non-standard construction (no-fines concrete, system-built) requiring
              careful investigation before chasing or drilling.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Student HMO Areas</h3>
            <p className="text-white text-sm leading-relaxed">
              Broomhill, Crookesmoor, Ecclesall Road, and Sharrow are dominated by student rentals.
              Victorian terraces converted to HMOs require fire detection, emergency lighting, RCD
              protection per Regulation 411.3.3, and five-yearly EICRs. Many have had multiple
              rounds of partial rewiring over the decades, creating complex and sometimes unsafe
              wiring arrangements that need careful survey before any work.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New Developments</h3>
            <p className="text-white text-sm leading-relaxed">
              New-build estates at Waverley (former steelworks site), Owlthorpe, and city centre
              apartment blocks offer standard domestic installation work. These are typically
              straightforward jobs with good access, standard construction, and clear
              specifications. EV charging infrastructure is increasingly specified at the build
              stage.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'hmos',
    heading: 'Student HMO Electrical Requirements',
    content: (
      <>
        <p>
          Sheffield has approximately 60,000 students across Sheffield Hallam University and the
          University of Sheffield, driving significant demand for HMO properties. Sheffield City
          Council actively enforces HMO licensing conditions, particularly in the Broomhill,
          Crookesmoor, and Ecclesall Road areas.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR requirement:</strong> Sheffield City Council requires a satisfactory
                EICR for all HMO licence applications, no older than 5 years. C1 or C2 observations
                will typically require remedial work before a licence is granted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire detection:</strong> Grade A1 LD2 system to BS 5839-6. Interlinked
                mains-powered detectors with battery backup in all escape routes, kitchens (heat
                detectors), and principal habitable rooms. Larger HMOs (3+ storeys) may require a
                Grade A LD2 system with a fire alarm panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting:</strong> Escape routes must have emergency lighting to
                BS 5266. Monthly function tests and annual full-duration tests required, with
                records maintained.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection:</strong> All socket outlet circuits must have 30mA RCD
                protection as required by Regulation 411.3.3. A dual-RCD or RCBO consumer unit is
                the standard approach.
              </span>
            </li>
          </ul>
        </div>
        <p>
          HMO work is reliable recurring revenue. A landlord with 10 properties needs EICRs every 5
          years, annual emergency lighting tests, and periodic fire alarm servicing. Building
          relationships with HMO landlords and letting agents in Broomhill and Ecclesall Road
          provides consistent year-round work.
        </p>
        <SEOAppBridge
          title="Complete HMO EICRs faster on site"
          description="Elec-Mate's EICR app lets you complete the full report on your phone during the inspection. AI board scanning, voice-to-text observations, and instant PDF export. Send the report before you leave."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'conservation',
    heading: 'Peak District Conservation Areas',
    content: (
      <>
        <p>
          Sheffield is unique among major English cities in that a significant portion of the city
          boundary lies within or adjacent to the Peak District National Park. Areas such as Dore,
          Totley, Bradfield, Rivelin Valley, and Loxley are subject to conservation area
          restrictions that directly affect electrical installation work.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TreePine className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations:</strong> In conservation areas, an EV charger
                visible from a public highway may require planning permission. Permitted development
                rights (Class H of the GPDO) are restricted in conservation areas. Check with
                Sheffield City Council or the Peak District National Park Authority before
                installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TreePine className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV panels:</strong> Panels on highway-facing elevations may need
                planning consent in conservation areas. On listed buildings, Listed Building Consent
                is always required regardless of elevation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TreePine className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing:</strong> Some rural properties near the Peak District use TT
                earthing (earth electrode) rather than TN-C-S (PME). Verify the earthing arrangement
                during survey and ensure RCD protection is appropriate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Conservation area work commands a 15% to 25% premium due to planning complexity and the
          higher-value properties involved. Electricians working in Dore, Totley, and Bradfield
          should be familiar with both Sheffield City Council and Peak District National Park
          Authority planning requirements.
        </p>
      </>
    ),
  },
  {
    id: 'meadowhall',
    heading: 'Meadowhall and Commercial Electrical Work',
    content: (
      <>
        <p>
          Meadowhall is one of the largest shopping centres in the UK, and the surrounding retail
          park, logistics, and commercial area represents a significant concentration of commercial
          electrical work in South Yorkshire.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Store className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retail fit-outs:</strong> Meadowhall's 290 stores undergo regular
                refurbishment cycles. Retail electrical fit-outs include three-phase supplies,
                lighting tracks and control systems, power distribution to point-of-sale positions,
                and emergency lighting. Fit-out work is typically carried out outside trading hours,
                requiring flexibility on working patterns.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Store className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Logistics and warehousing:</strong> The Lower Don Valley around Meadowhall
                contains major logistics facilities, distribution centres, and light industrial
                units. These require commercial three-phase installations, high-bay lighting,
                distribution boards, and periodic inspection and testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Store className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging infrastructure:</strong> Meadowhall and the surrounding retail
                parks are installing EV charging infrastructure in car parks. These are large-scale
                commercial installations requiring three-phase supplies, load management systems,
                and back-office connectivity.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Commercial work around Meadowhall typically requires CSCS cards, commercial insurance
          levels (£5 million to £10 million public liability), and experience with commercial
          electrical systems. The investment in commercial qualifications and insurance is
          worthwhile — commercial rates are typically 30% to 50% above domestic rates.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Sheffield Market',
    content: (
      <>
        <p>
          Sheffield offers one of the most diverse electrical markets in the North of England. The
          combination of industrial conversions, student HMOs, domestic rewiring of stone terraces
          in Crookes and Walkley, conservation area work near the Peak District, and Meadowhall
          commercial opportunities creates year-round demand across every skill level.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote on Site, Win More Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build professional, itemised quotes during the survey. Sheffield landlords with
                  multiple HMOs value electricians who can provide clear pricing quickly. Send the
                  PDF quote before you leave the property.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete EICRs, EICs, and Minor Works Certificates on your phone during the job.
                  An <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> completed and
                  sent as a PDF before you leave demonstrates professionalism and saves hours of
                  admin.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Conversions</h4>
                <p className="text-white text-sm leading-relaxed">
                  Industrial conversion cable runs can exceed 30 metres. The{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  verifies the cable size is correct before you order materials. Avoid costly
                  re-runs on long factory conversion cable routes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Join 1,000+ UK electricians using Elec-Mate"
          description="Cable sizing, professional quoting, and on-site certification. Everything a Sheffield electrician needs for HMOs, conversions, and domestic work. 7-day free trial, cancel anytime."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianSheffieldPage() {
  return (
    <GuideTemplate
      title="Electrician in Sheffield | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Sheffield. Realistic 2026 pricing, Northern Powergrid DNO, steel city industrial conversions, Crookes and Walkley stone terraces, university HMOs, Peak District conservation, and Meadowhall commercial work."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Sheffield:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Sheffield, what to expect on pricing, and the specific challenges of electrical work in Sheffield properties. Covers Northern Powergrid DNO, industrial conversions, stone-built terraces, university HMOs, Peak District conservation, and Meadowhall commercial work."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Sheffield"
      relatedPages={relatedPages}
      ctaHeading="Quote, Certify, and Grow Your Sheffield Electrical Business"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. 7-day free trial, cancel anytime."
    />
  );
}
