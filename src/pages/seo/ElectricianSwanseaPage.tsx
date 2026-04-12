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
  Landmark,
  Users,
  Factory,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-swansea' },
  { label: 'Swansea', href: '/guides/electrician-swansea' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Swansea' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Swansea' },
  { id: 'property-types', label: 'Swansea Property Challenges' },
  { id: 'dno-regulations', label: 'NGED and Welsh Building Regulations' },
  { id: 'conservation-areas', label: 'Conservation Areas and SA1 Regeneration' },
  { id: 'industrial-legacy', label: 'Industrial Legacy Buildings' },
  { id: 'for-electricians', label: 'For Electricians Working in Swansea' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins. You can verify registration numbers online on the scheme provider websites.',
  "NGED (National Grid Electricity Distribution) is Swansea's DNO. Any work affecting the incoming supply, meter position, or requiring a new connection must be coordinated with NGED.",
  'Wales has its own Building Regulations, administered by the Welsh Government. Approved Document P (electrical safety) applies in Wales just as in England, but is issued by the Welsh Government rather than DLUHC. The practical requirements are the same.',
  'The SA1 Swansea Waterfront regeneration is one of the largest urban regeneration projects in Wales, creating significant commercial and residential electrical work opportunities.',
  'Victorian terraces in Sketty, Uplands, and Brynmill — many converted into student HMOs for Swansea University — often have outdated wiring and require specialist rewiring approaches combined with HMO fire safety compliance.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Swansea?',
    answer:
      'Swansea electrician day rates typically range from £200 to £300 per day for a qualified electrician. Hourly rates are usually £30 to £50 per hour, with emergency call-out rates of £60 to £95 per hour. These rates are slightly below the UK average, reflecting lower operating costs in South Wales compared to English cities of similar size. Specialist work (commercial fit-outs, industrial installations) commands higher rates. Always get a fixed quote for defined work rather than agreeing to day rates where possible.',
  },
  {
    question: 'How do I check if a Swansea electrician is properly qualified?',
    answer:
      'Ask for their competent person scheme registration number and verify it online. NICEIC (niceic.com/find-a-contractor), NAPIT (napit.org.uk/find-an-installer), and ELECSA (elecsa.co.uk/find-a-contractor) all have online search tools. A legitimate electrician will also hold a current ECS (Electrotechnical Certification Scheme) card, carry public liability insurance (minimum £2 million recommended), and be able to provide references from recent local work. For any notifiable work under Part P of the Building Regulations (Welsh Government), the electrician must be registered with a competent person scheme or the work must be signed off by Swansea Council building control.',
  },
  {
    question: 'Are Welsh Building Regulations different for electrical work?',
    answer:
      'The practical requirements for electrical work are the same in Wales as in England. Both use Approved Document P (electrical safety in dwellings) and both reference BS 7671 (the IET Wiring Regulations). The difference is administrative — in Wales, Building Regulations are issued by the Welsh Government rather than the Department for Levelling Up, Housing and Communities (DLUHC). Competent person schemes (NICEIC, NAPIT, ELECSA) operate across England and Wales, and an electrician registered in England can self-certify work in Wales. Building control approval, if needed, comes from Swansea Council rather than a borough council.',
  },
  {
    question: 'How long does a full rewire take in a Swansea Victorian terrace?',
    answer:
      'A full rewire of a typical 3-bedroom Victorian terraced house in areas like Sketty, Uplands, or Brynmill takes 6 to 9 working days with a team of two electricians, plus 1 to 2 days for testing and certification. These properties often have solid stone walls and lath-and-plaster ceilings, which are harder to chase and route cables through than modern plasterboard. High ceilings (often 2.8 to 3 metres) require tower access. Many have been partially rewired at different times, leaving a mix of old and newer cables that adds to the complexity. If the property is an HMO, additional fire alarm circuits and emergency lighting extend the job by 1 to 2 days.',
  },
  {
    question: 'What is an EICR and do I need one for my Swansea rental property?',
    answer:
      'An Electrical Installation Condition Report (EICR) is a formal inspection and test of the fixed electrical installation in a property. Since December 2022, landlords in Wales are required to have a valid EICR under the Renting Homes (Wales) Act 2016 (as amended), with inspections at least every 5 years. For Swansea properties, an EICR typically costs £170 to £280 for a 2 to 3 bedroom flat, and £240 to £380 for a 3 to 4 bedroom house. Student HMOs in the Uplands and Brynmill areas often have more circuits and rooms, pushing costs towards the higher end. Older properties frequently receive C2 (potentially dangerous) or C3 (improvement recommended) codes due to aged wiring and lack of RCD protection compliant with Regulation 411.3.3.',
  },
  {
    question: 'Who is the electricity supplier for Swansea and how do I get a new connection?',
    answer:
      "NGED (National Grid Electricity Distribution, formerly Western Power Distribution) is the Distribution Network Operator for Swansea and South Wales. To request a new supply, upgraded supply, or meter relocation, you apply through NGED's website (nationalgrid.co.uk/electricity-distribution). Lead times for new connections in Swansea are typically 4 to 8 weeks. Costs vary — a simple meter relocation might be £400 to £1,200, while a new three-phase supply can cost £2,000 to £6,500 depending on the distance from the existing network. Your electrician can advise on whether your existing supply is adequate and submit the NGED application on your behalf.",
  },
  {
    question: 'Do I need planning permission for an EV charger in Swansea?',
    answer:
      'In most cases, domestic EV charger installations in Swansea are permitted development and do not require planning permission, provided the charger meets size and placement requirements. However, if your property is in a conservation area (such as parts of Mumbles, Sketty, or the city centre), is a listed building, or the charger would face a highway, you may need planning permission from Swansea Council. Welsh permitted development rights are set by the Welsh Government and differ slightly from English rules on some points. Your electrician should advise on whether planning permission is needed before installation.',
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
    description: 'Create professional quotes for Swansea customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in Swansea',
    content: (
      <>
        <p>
          Swansea is the second largest city in Wales with a population of around 245,000, and a
          growing demand for electrical services driven by waterfront regeneration, university
          expansion, and the retrofit of an ageing housing stock. The city sits at the heart of the
          Swansea Bay city region, which includes Neath Port Talbot and Carmarthenshire, giving
          electricians a wide catchment area.
        </p>
        <p>
          The Swansea electrical market is shaped by the university sector (Swansea University and
          the University of Wales Trinity Saint David both generate steady HMO compliance work), the
          SA1 Swansea Waterfront regeneration programme, and a legacy of industrial buildings being
          repurposed across the Lower Swansea Valley. Domestic work dominates — particularly
          rewires, consumer unit upgrades, and EICRs in the Victorian and Edwardian terraces of
          Uplands, Brynmill, Sketty, and Mount Pleasant.
        </p>
        <p>
          Whatever the size of the firm, the qualifications and registration requirements are the
          same. Every electrician carrying out notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          must either be registered with a competent person scheme or have the work inspected and
          signed off by Swansea Council building control. The most recognised competent person
          schemes are <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,
          NAPIT, ELECSA, and STROMA. These schemes operate identically in Wales as in England.
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
          Before hiring any electrician in Swansea, verify their credentials. This protects you
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
                least £2 million public liability cover. Ask for a copy of the certificate. For
                commercial work on the SA1 development or industrial sites, higher cover is often a
                contract requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references and reviews</strong> — ask for contact details of 2 to 3
                recent Swansea customers, or check verified reviews on platforms like Checkatrade,
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
    heading: 'Typical Electrician Costs in Swansea (2026 Prices)',
    content: (
      <>
        <p>
          Swansea electrical work costs are generally lower than the English average, reflecting
          lower operating costs in South Wales. Here are realistic Swansea prices for common
          domestic electrical work in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed Victorian terrace)</strong> — £4,200 to £6,500 including
                new consumer unit, all circuits, sockets, switches, lighting, testing, and Part P
                certification. Solid stone walls in Uplands and Sketty terraces push costs to the
                upper end; post-war estates in Townhill or Penlan are at the lower end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £420 to £700 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and Part P
                notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (Electrical Installation Condition Report)</strong> — £170 to £280 for
                a flat, £240 to £380 for a house. Required for all rental properties in Wales.
                Student HMOs near the university with many rooms and circuits cost more.
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
                including supply, installation, earthing, and Part P certification. Properties in
                the Uplands and Brynmill terraced streets without off-street parking may need longer
                cable runs or alternative mounting solutions.
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
          These prices are indicative for 2026 and vary across the Swansea area. Central Swansea and
          the Mumbles tend to be slightly higher than the outer estates. Always get at least three
          written quotes for any significant work.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Swansea Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Swansea's property stock reflects its history as a Victorian industrial city, its wartime
          damage, and its post-war expansion. Understanding these property types helps you know what
          to expect when hiring an electrician.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Victorian Terraces (Uplands, Sketty, Brynmill)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The residential areas climbing the hillside above the city centre — Uplands, Brynmill,
              Sketty, and parts of Mount Pleasant — are dominated by Victorian and Edwardian
              terraced housing. These properties have solid stone walls, high ceilings, and often
              multiple previous partial rewires. Many have been converted into student HMOs,
              requiring additional fire alarm circuits, emergency lighting, and more complex
              consumer unit arrangements to meet HMO licensing requirements.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Swansea, like Plymouth, suffered significant wartime damage and was rebuilt
              extensively in the 1940s and 1950s. Estates in Townhill, Penlan, Blaenymaes, and Clase
              have properties that often retain original wiring — rubber-insulated cables and
              outdated fuse boxes. Cavity wall construction makes rewiring more straightforward than
              in the Victorian terraces, but many of these properties have never had a proper
              electrical upgrade and are overdue for consumer unit replacement and full rewires.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Student HMOs</h3>
            <p className="text-white text-sm leading-relaxed">
              Swansea University (Singleton and Bay campuses) and UWTSD draw tens of thousands of
              students. The student rental market around Brynmill, St Thomas, Uplands, and Port
              Tennant generates high demand for EICRs, fire alarm installations, and electrical
              upgrades. HMOs must meet specific electrical requirements under Swansea Council's HMO
              licensing conditions, including mains-powered interlinked smoke and heat detection,
              emergency lighting on escape routes, and RCD protection on all circuits.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">SA1 Waterfront New-Builds</h3>
            <p className="text-white text-sm leading-relaxed">
              The SA1 Swansea Waterfront development is transforming the former docklands into a
              modern mixed-use district with apartments, offices, and the new Swansea University Bay
              Campus. While new-build electrical installations are straightforward, the density of
              apartments and the communal systems (landlord lighting, door entry, EV charging
              infrastructure) create ongoing maintenance and upgrade work for electricians.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'NGED and Welsh Building Regulations',
    content: (
      <>
        <p>
          NGED (National Grid Electricity Distribution, formerly Western Power Distribution) is the
          Distribution Network Operator for Swansea and South Wales. Any work affecting the
          electricity supply to your property involves NGED. This includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — if you need a new electricity
                supply or want to upgrade from single-phase to three-phase, you apply to NGED.
                Swansea lead times are typically 4 to 8 weeks. The SA1 development area and Swansea
                Bay campus have dedicated NGED infrastructure, but residential areas may have older
                network capacity that requires upgrading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — moving the electricity meter requires NGED to
                disconnect and reconnect the supply. This is common during kitchen extensions and
                property conversions in Swansea's older housing stock.
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
          Wales has its own Building Regulations framework, administered by the Welsh Government.
          Approved Document P (electrical safety in dwellings) applies in Wales and the practical
          requirements are identical to England — BS 7671 is the referenced standard, competent
          person schemes operate across both countries, and the same self-certification and
          notification processes apply. The key difference is that building control approval, where
          needed, comes from Swansea Council rather than an English local authority. For rental
          properties, Wales has the Renting Homes (Wales) Act 2016, which requires landlords to
          ensure electrical installations are safe and maintained, with EICRs required at least
          every 5 years.
        </p>
      </>
    ),
  },
  {
    id: 'conservation-areas',
    heading: 'Conservation Areas and the SA1 Regeneration',
    content: (
      <>
        <p>
          Swansea has several conservation areas and a major regeneration zone where electrical work
          requires additional consideration:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mumbles conservation area</strong> — the Mumbles village and seafront area
                has strict planning controls. External electrical work including EV charger
                installations, solar panels, external lighting, and signage may require planning
                permission from Swansea Council. Listed buildings in Mumbles require Listed Building
                Consent for any work affecting their character.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wind Street and the city centre</strong> — parts of the city centre are
                within conservation areas. Commercial electrical work for restaurants, bars, and
                retail premises on Wind Street and the surrounding streets must respect heritage
                building requirements. The Swansea Indoor Market building and other civic structures
                have specific heritage constraints.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>SA1 Swansea Waterfront</strong> — while this is a modern development rather
                than a conservation area, the scale of the regeneration means electrical contractors
                working here must coordinate with the overall site infrastructure, connect to
                communal systems, and meet the development's design standards for external fittings.
                The proximity to the coast also means marine-grade specifications for external
                installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'industrial-legacy',
    heading: 'Industrial Legacy Buildings',
    content: (
      <>
        <p>
          Swansea's industrial heritage — copper smelting, tinplate works, and docklands — has left
          a stock of former industrial buildings that are being repurposed across the Lower Swansea
          Valley and the docklands area. Electrical work in these buildings presents specific
          challenges:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contaminated land</strong> — some former industrial sites have contaminated
                ground that affects earthing arrangements. Earth electrode resistance can be
                unpredictable, and specialist earthing solutions (such as concrete-encased
                electrodes or earthing mats) may be required. BS 7430 (Code of Practice for
                Protective Earthing) provides guidance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Asbestos</strong> — industrial buildings from the pre-1990 era frequently
                contain asbestos in insulation, ceiling tiles, and cable duct linings. An asbestos
                survey must be carried out before any electrical work that involves disturbing
                building fabric. Electricians should not proceed with chasing walls or lifting
                ceiling tiles until the asbestos survey is complete.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing industrial installations</strong> — former industrial buildings may
                retain three-phase supplies, heavy switchgear, and industrial distribution boards
                that need decommissioning before domestic or commercial conversion work begins. This
                should only be done by an electrician experienced with industrial installations and
                in coordination with NGED.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Swansea Market',
    content: (
      <>
        <p>
          Swansea offers a diverse electrical market with strong demand from the rental sector,
          regeneration projects, and a growing eco-retrofit movement. The city is the commercial hub
          for the wider Swansea Bay region, drawing work from Neath Port Talbot and the Gower
          Peninsula. Competition is moderate, with fewer electricians per capita than Cardiff or
          Bristol.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Student Rental Market</h4>
                <p className="text-white text-sm leading-relaxed">
                  Swansea University and UWTSD generate consistent demand for student HMO EICRs,
                  fire alarm installations, and electrical upgrades. The annual summer turnover
                  period (June to September) is particularly busy, with landlords and letting agents
                  needing rapid EICR turnaround. Compliance with the Renting Homes (Wales) Act and
                  Swansea Council HMO licensing conditions is non-negotiable for landlords, creating
                  a reliable revenue stream for registered electricians.
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
                  Swansea landlords and letting agents managing student properties expect rapid
                  turnaround on EICRs and certificates. Completing an{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> on a phone
                  app and sending the PDF before leaving site sets you apart from competitors still
                  posting handwritten certificates.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Swansea electrical business from your phone"
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

export default function ElectricianSwanseaPage() {
  return (
    <GuideTemplate
      title="Electrician in Swansea | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Swansea. Realistic 2026 pricing, how to verify NICEIC/NAPIT registration, Victorian terrace rewiring, NGED connections, Welsh Building Regulations, SA1 waterfront regeneration, and student HMO compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Swansea:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Swansea, what to expect on pricing, and the specific challenges of electrical work in Wales's second city. Covers NGED connections, Welsh Building Regulations, Victorian terrace rewiring, SA1 waterfront regeneration, student HMO compliance, and industrial building conversions."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Swansea"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Swansea and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
