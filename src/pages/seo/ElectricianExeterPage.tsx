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
  Leaf,
  Droplets,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-exeter' },
  { label: 'Exeter', href: '/guides/electrician-exeter' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Exeter' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Exeter' },
  { id: 'property-types', label: 'Exeter Property Challenges' },
  { id: 'dno-regulations', label: 'NGED and Local Regulations' },
  { id: 'conservation-heritage', label: 'Conservation Areas and Heritage Constraints' },
  { id: 'eco-retrofit', label: 'Eco-Retrofit and Renewable Energy Demand' },
  { id: 'for-electricians', label: 'For Electricians Working in Exeter' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins. You can verify registration numbers online on the scheme provider websites.',
  "NGED (National Grid Electricity Distribution, formerly Western Power Distribution) is Exeter's DNO. Any work affecting the incoming supply, meter position, or requiring a new connection must be coordinated with NGED.",
  "Exeter's Roman heritage and medieval city centre create significant conservation and heritage constraints for electrical work. The Cathedral Close and surrounding streets have some of the strictest planning controls in the South West.",
  "The University of Exeter is expanding rapidly, driving strong demand for student HMO compliance work and purpose-built student accommodation installations across Pennsylvania, St David's, and Mount Pleasant.",
  'The South West has one of the highest rates of eco-retrofit activity in England, with air source heat pumps, solar PV, and battery storage installations growing significantly — all requiring qualified electricians.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Exeter?',
    answer:
      "Exeter electrician day rates typically range from £230 to £330 per day for a qualified electrician. Hourly rates are usually £35 to £55 per hour, with emergency call-out rates of £65 to £100 per hour. Exeter rates are slightly above the South West average, reflecting the city's relative affluence, the university-driven demand, and the shortage of electricians in the region. Eco-retrofit work (heat pumps, solar PV, battery storage) commands premium rates due to the specialist knowledge required. Always get a fixed quote for defined work rather than agreeing to day rates where possible.",
  },
  {
    question: 'How do I check if an Exeter electrician is properly qualified?',
    answer:
      'Ask for their competent person scheme registration number and verify it online. NICEIC (niceic.com/find-a-contractor), NAPIT (napit.org.uk/find-an-installer), and ELECSA (elecsa.co.uk/find-a-contractor) all have online search tools. A legitimate electrician will also hold a current ECS (Electrotechnical Certification Scheme) card, carry public liability insurance (minimum £2 million recommended), and be able to provide references from recent local work. For any notifiable work under Part P of the Building Regulations, the electrician must be registered with a competent person scheme or the work must be signed off by Exeter City Council building control.',
  },
  {
    question: 'How long does a full rewire take in an Exeter period property?',
    answer:
      "A full rewire of a typical 3-bedroom Victorian or Edwardian terraced house in areas like Mount Pleasant, St Leonard's, or Newtown takes 6 to 9 working days with a team of two electricians, plus 1 to 2 days for testing and certification. Exeter has a mix of stone and brick construction — the older properties near the city centre often have thick stone walls that are extremely difficult to chase, while later Victorian terraces use brick. Properties near the Quay or in St Thomas may have been built with local red sandstone, which crumbles when drilled. Many period properties have high ceilings, ornate plasterwork, and multiple previous partial rewires that add to the complexity.",
  },
  {
    question: 'Do I need building control approval for electrical work in Exeter?',
    answer:
      'Notifiable electrical work in Exeter (as in the rest of England) is governed by Part P of the Building Regulations. Notifiable work includes new circuits, consumer unit replacements, work in bathrooms and kitchens involving new circuits, and work in special locations. If your electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or others), they can self-certify the work and notify Exeter City Council on your behalf. If the electrician is not registered, you must apply to Exeter City Council building control for approval before work starts, which adds cost (typically £200 to £350) and time.',
  },
  {
    question: 'What is an EICR and do I need one for my Exeter rental property?',
    answer:
      'An Electrical Installation Condition Report (EICR) is a formal inspection and test of the fixed electrical installation in a property. Since April 2021, landlords in England are legally required to have a valid EICR for rented properties, carried out at least every 5 years or at each change of tenancy. For Exeter properties, an EICR typically costs £180 to £300 for a 2 to 3 bedroom flat, and £260 to £400 for a 3 to 4 bedroom house. The large student rental market around the university campuses means EICR demand is high, particularly during the summer turnover. Older properties frequently receive C2 (potentially dangerous) or C3 (improvement recommended) codes due to aged wiring and lack of RCD protection compliant with Regulation 411.3.3.',
  },
  {
    question: 'Who is the electricity supplier for Exeter and how do I get a new connection?',
    answer:
      "NGED (National Grid Electricity Distribution, formerly Western Power Distribution or WPD) is the Distribution Network Operator for Exeter and the wider South West. To request a new supply, upgraded supply, or meter relocation, you apply through NGED's website (nationalgrid.co.uk/electricity-distribution). Lead times for new connections in Exeter are typically 4 to 8 weeks. Costs vary — a simple meter relocation might be £400 to £1,200, while a new three-phase supply can cost £2,000 to £7,000 depending on the distance from the existing network. Your electrician can advise on whether your existing supply is adequate and submit the NGED application on your behalf.",
  },
  {
    question:
      'My Exeter property is near the river. Should I worry about flood risk for electrical work?',
    answer:
      'Properties along the River Exe and in low-lying areas (St Thomas, the Quay, parts of Countess Wear, Topsham) are in flood risk zones. For these properties, consider relocating the consumer unit above the maximum recorded flood level (or at least 1.5 metres above finished floor level), using radial circuits for ground floor areas so they can be individually isolated, and specifying higher IP-rated accessories at ground level. After any flood event, the electrical installation must be inspected and tested by a qualified electrician before being re-energised. Exeter has a flood defence scheme, but it does not protect all riverside properties.',
  },
  {
    question: 'Can an electrician install a heat pump in Exeter?',
    answer:
      'An electrician handles the electrical connection for a heat pump, but the heat pump itself must be installed by an MCS-certified (Microgeneration Certification Scheme) installer to qualify for the Boiler Upgrade Scheme grant (currently £7,500 for air source heat pumps). The electrical work includes running a dedicated circuit from the consumer unit to the heat pump outdoor unit, potentially upgrading the supply (many air source heat pumps need a 32A or 40A circuit), and ensuring the earthing and bonding are adequate. If the property needs a supply upgrade to accommodate the heat pump, this must be coordinated with NGED. Many Exeter electricians are adding MCS certification to their qualifications as demand for heat pumps grows across the South West.',
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
    description: 'Create professional quotes for Exeter customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in Exeter',
    content: (
      <>
        <p>
          Exeter is Devon's county city with a population of around 130,000 (210,000 including the
          wider urban area), and one of the fastest-growing cities in the South West. The University
          of Exeter — consistently ranked in the UK top 15 — drives a large student economy, while
          the city's position as the South West's administrative and commercial centre creates
          steady demand for both domestic and commercial electrical work.
        </p>
        <p>
          The Exeter electrical market is shaped by several distinct factors: a Roman and medieval
          city centre with strict heritage constraints, rapid university expansion creating
          new-build and student HMO demand, a strong eco-retrofit movement driven by the South
          West's environmental focus, and flood risk areas along the River Exe. Domestic work ranges
          from rewires in Victorian terraces around Mount Pleasant to EV charger installations in
          new-build estates at Cranbrook and Pinhoe.
        </p>
        <p>
          Whatever the size of the firm, the qualifications and registration requirements are the
          same. Every electrician carrying out notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          must either be registered with a competent person scheme or have the work inspected and
          signed off by Exeter City Council building control. The most recognised competent person
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
          Before hiring any electrician in Exeter, verify their credentials. This protects you
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
                least £2 million public liability cover. For work in listed buildings or on
                commercial projects, higher cover may be required. Ask for a copy of the
                certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references and reviews</strong> — ask for contact details of 2 to 3
                recent Exeter customers, or check verified reviews on platforms like Checkatrade,
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
    heading: 'Typical Electrician Costs in Exeter (2026 Prices)',
    content: (
      <>
        <p>
          Exeter electrical work costs are slightly above the South West average, reflecting the
          city's relative affluence and high demand. Here are realistic Exeter prices for common
          domestic electrical work in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed Victorian/Edwardian house)</strong> — £4,800 to £7,500
                including new consumer unit, all circuits, sockets, switches, lighting, testing, and
                Part P certification. Stone-built properties near the city centre are at the upper
                end; brick-built properties in Heavitree and Whipton are at the lower end. Listed
                properties require additional care and cost for sympathetic routing.
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
                <strong>EICR (Electrical Installation Condition Report)</strong> — £180 to £300 for
                a flat, £260 to £400 for a house. Required every 5 years for rented properties.
                Student HMOs near the university with many rooms and circuits cost more. Larger
                detached properties in St Leonard's and Pennsylvania are also at the higher end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket (from existing circuit)</strong> — £95 to £165 per single
                socket, depending on cable run length and wall construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £700 to £1,300 for a 7kW home charger
                including supply, installation, earthing, and Part P certification. New-build
                estates at Cranbrook and Pinhoe often have pre-installed cable routes for EV
                chargers, reducing installation costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £120 to £200 for the first hour including
                travel, plus £45 to £70 per additional hour. Weekend and bank holiday rates are
                typically 50% higher.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are indicative for 2026. The city centre and St Leonard's tend to be at the
          higher end; outer areas like Beacon Heath and Burnthouse Lane are more moderate. Always
          get at least three written quotes for any significant work.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Exeter Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Exeter's property stock spans nearly 2,000 years, from Roman foundations in the city
          centre to modern new-build estates on the outskirts. This historical range creates varied
          challenges for electrical work.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Period Properties (City Centre)</h3>
            <p className="text-white text-sm leading-relaxed">
              The areas around the Cathedral, Southernhay, and the Quay contain properties dating
              from the medieval period through to the Georgian era. Many are built with local
              Heavitree stone or red sandstone, which is extremely hard to chase and crumbles
              unpredictably when drilled. Rewiring these properties requires surface-mounted
              solutions (period-appropriate conduit, dado trunking) or routing cables through voids
              and under floors wherever possible to avoid damaging historic fabric. Many are listed,
              requiring Listed Building Consent.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Mount Pleasant, St David's, Newtown, and parts of Heavitree have Victorian and
              Edwardian terraced housing. These properties are built with a mix of brick and stone,
              have high ceilings, and often multiple previous partial rewires. The steep topography
              of some Exeter streets means ground floors can be semi-basement level, adding damp
              considerations for electrical accessories. Many have been converted into student HMOs
              for the university.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">University Area HMOs</h3>
            <p className="text-white text-sm leading-relaxed">
              The University of Exeter (Streatham and St Luke's campuses) drives a large student
              rental market in Pennsylvania, Mount Pleasant, St David's, and Stoke Hill. HMOs must
              meet Exeter City Council licensing conditions including mains-powered interlinked
              smoke and heat detection, emergency lighting on escape routes, and RCD protection on
              all circuits. The university's continued expansion and rising student numbers mean
              demand for compliant student housing is increasing year on year.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New-Build Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Exeter is expanding with major new-build developments at Cranbrook (east of the M5),
              Pinhoe, Alphington, and Newcourt. While new-build electrical installations are to
              current standards, snagging issues are not uncommon. New homeowners should request a
              copy of the EIC and consider an independent EICR within the first year. These estates
              increasingly include pre-wired EV charging points and solar PV-ready roofs, creating
              follow-on installation work.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'NGED and Exeter Electrical Regulations',
    content: (
      <>
        <p>
          NGED (National Grid Electricity Distribution, formerly Western Power Distribution) is the
          Distribution Network Operator for Exeter and the wider South West. Any work affecting the
          electricity supply to your property involves NGED. This includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — if you need a new electricity
                supply or want to upgrade from single-phase to three-phase (increasingly common for
                heat pumps and EV chargers), you apply to NGED. Exeter lead times are typically 4 to
                8 weeks. The rapid growth at Cranbrook and Pinhoe has required significant NGED
                network investment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — moving the electricity meter requires NGED to
                disconnect and reconnect the supply. Your electrician installs the new meter tails;
                NGED moves the meter and cutout. This is common during extensions and conversions in
                Exeter's older properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification for generation and storage</strong> — if you are
                installing solar PV, battery storage, or a generator, the electrician must notify
                NGED under Engineering Recommendation G98 (for systems up to 16A per phase) or G99
                (for larger systems). Exeter sees a high volume of solar PV installations due to the
                South West's favourable solar irradiation levels.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work in Exeter is overseen by Exeter City Council
          building control or by an approved inspector. If your electrician is registered with a
          competent person scheme, they self-certify and notify the council on your behalf.
        </p>
      </>
    ),
  },
  {
    id: 'conservation-heritage',
    heading: 'Conservation Areas and Heritage Constraints',
    content: (
      <>
        <p>
          Exeter has a rich architectural heritage spanning nearly two millennia, and significant
          parts of the city are protected by conservation area designations and listed building
          status. Electrical work in these areas requires additional planning:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>The Cathedral Close</strong> — Exeter Cathedral and the surrounding Close is
                one of the most architecturally significant areas in the South West. Properties here
                are Grade I or Grade II listed, and any electrical work affecting the character of
                the buildings requires Listed Building Consent from Exeter City Council. This
                includes external lighting, surface-mounted conduit, and even internal work if it
                affects original features. Electricians must have experience with heritage buildings
                and use appropriate fixings and routing methods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Southernhay and the city centre</strong> — Southernhay's Georgian terraces
                and the Princesshay area include listed buildings and conservation zone
                restrictions. Commercial electrical work for businesses in these areas must respect
                heritage constraints on external signage, lighting, and cable routing. The restored
                Roman wall sections also constrain cable routing and excavation in certain areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Topsham conservation area</strong> — the historic port village of Topsham
                (now part of Exeter) has a conservation area covering the waterfront and High
                Street. External electrical work including EV chargers, solar panels, and outdoor
                lighting may require planning permission. The proximity to the Exe estuary also
                means marine-grade fixings are advisable for external installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eco-retrofit',
    heading: 'Eco-Retrofit and Renewable Energy Demand',
    content: (
      <>
        <p>
          The South West has one of the highest rates of eco-retrofit activity in England, and
          Exeter is at the forefront of this trend. Exeter City Council has declared a climate
          emergency and set a net-zero carbon target, and the city's environmentally aware
          population is driving strong demand for renewable energy and energy efficiency
          installations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Air source heat pumps</strong> — demand for air source heat pump
                installations is growing rapidly in Exeter, driven by the Boiler Upgrade Scheme
                grant (currently £7,500) and Exeter's relatively mild climate (which improves heat
                pump efficiency). The electrical work includes a dedicated 32A or 40A circuit,
                supply assessment (some properties need an upgrade), and ensuring the earthing
                system can accommodate the additional load. MCS certification is required for grant
                eligibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV and battery storage</strong> — the South West has some of the best
                solar irradiation levels in England, and Exeter rooftops are increasingly fitted
                with solar PV arrays. Electrical work includes AC and DC isolation, G98/G99
                notification to NGED, consumer unit modifications, and battery storage integration.
                The growing availability of time-of-use tariffs (like Octopus Agile) is driving
                battery storage installations alongside solar PV.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging</strong> — Exeter's position on the M5 corridor and the city's
                growing population of electric vehicle owners mean strong demand for domestic EV
                charger installations. New-build estates at Cranbrook and Pinhoe often have
                pre-wired EV charging points; older properties need a new dedicated circuit from the
                consumer unit to the charger location, with earthing and Part P certification.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians in the Exeter area who add MCS certification, solar PV competence, and heat
          pump electrical knowledge to their skillset are well positioned for the growing
          eco-retrofit market across Devon and the wider South West.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Exeter Market',
    content: (
      <>
        <p>
          Exeter is one of the strongest and most diverse electrical markets in the South West. The
          combination of university-driven rental compliance, heritage property maintenance, rapid
          residential expansion, and the eco-retrofit boom means work is varied and consistently
          available. The South West also has a recognised shortage of qualified electricians,
          meaning waiting times for customers are longer than the national average — good news for
          electricians looking to build their business.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Leaf className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Eco-Retrofit Growth</h4>
                <p className="text-white text-sm leading-relaxed">
                  The South West eco-retrofit market is growing faster than almost any other UK
                  region. Heat pumps, solar PV, battery storage, and EV chargers are not niche
                  products in Exeter — they are mainstream. Electricians who invest in MCS
                  certification and renewable energy competence can access higher-margin work with
                  less price competition than traditional domestic electrical services.
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
                  Exeter customers — whether homeowners, landlords, or commercial clients — expect
                  professional documentation. An{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> completed on
                  a phone app and sent as a PDF before you leave site demonstrates professionalism
                  and speeds up the paperwork that can otherwise slow down your working day.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Exeter electrical business from your phone"
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

export default function ElectricianExeterPage() {
  return (
    <GuideTemplate
      title="Electrician in Exeter | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Exeter. Realistic 2026 pricing, how to verify NICEIC/NAPIT registration, period property rewiring, NGED connections, cathedral close conservation, eco-retrofit demand, and university HMO compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Exeter:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Exeter, what to expect on pricing, and the specific challenges of electrical work in a historic university city. Covers NGED connections, Part P compliance, heritage property rewiring, cathedral close conservation, eco-retrofit demand, flood risk areas, and student HMO compliance."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Exeter"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Exeter and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
