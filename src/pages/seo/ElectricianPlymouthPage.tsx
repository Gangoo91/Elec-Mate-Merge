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
  Anchor,
  Droplets,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-plymouth' },
  { label: 'Plymouth', href: '/guides/electrician-plymouth' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Plymouth' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Plymouth' },
  { id: 'property-types', label: 'Plymouth Property Challenges' },
  { id: 'dno-regulations', label: 'NGED and Local Regulations' },
  { id: 'conservation-areas', label: 'Conservation Areas and the Barbican' },
  { id: 'marine-corrosion', label: 'Marine Environment and Corrosion' },
  { id: 'for-electricians', label: 'For Electricians Working in Plymouth' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins. You can verify registration numbers online on the scheme provider websites.',
  "NGED (National Grid Electricity Distribution, formerly Western Power Distribution) is Plymouth's DNO. Any work affecting the incoming supply, meter position, or requiring a new connection must be coordinated with NGED.",
  "Plymouth's marine environment causes accelerated corrosion of external electrical fittings, cable glands, and earthing systems. Installations near the waterfront require marine-grade IP-rated components.",
  'The Barbican and Royal William Yard are conservation areas with strict planning requirements for external electrical work including EV charger installations, external lighting, and solar panels.',
  'Post-war housing estates (Efford, Whitleigh, Ernesettle) often have original 1950s wiring that has never been upgraded, making EICRs and rewires a significant part of Plymouth electrical work.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Plymouth?',
    answer:
      'Plymouth electrician day rates typically range from £220 to £320 per day for a qualified electrician. Hourly rates are usually £35 to £55 per hour, with emergency call-out rates of £65 to £100 per hour. These rates are broadly in line with the South West average. Prices are lower than London or Bristol due to lower operating costs, but specialist work (marine installations, dockyard commercial work) commands a premium. Always get a fixed quote for defined work rather than agreeing to day rates where possible.',
  },
  {
    question: 'How do I check if a Plymouth electrician is properly qualified?',
    answer:
      'Ask for their competent person scheme registration number and verify it online. NICEIC (niceic.com/find-a-contractor), NAPIT (napit.org.uk/find-an-installer), and ELECSA (elecsa.co.uk/find-a-contractor) all have online search tools. A legitimate electrician will also hold a current ECS (Electrotechnical Certification Scheme) card, carry public liability insurance (minimum £2 million recommended), and be able to provide references from recent local work. For any notifiable work under Part P of the Building Regulations, the electrician must be registered with a competent person scheme or the work must be signed off by Plymouth City Council building control.',
  },
  {
    question: 'How long does a full rewire take in a Plymouth post-war house?',
    answer:
      'A full rewire of a typical 3-bedroom post-war semi-detached house in Plymouth takes 5 to 8 working days with a team of two electricians, plus 1 to 2 days for testing and certification. Post-war properties are generally easier to rewire than Victorian homes because they have cavity walls and plasterboard ceilings, making cable routing more straightforward. However, some 1940s and 1950s properties in areas like Efford, Ham, and Whitleigh still have original rubber-insulated wiring that can crumble on contact, requiring careful removal. Allow additional time if asbestos-containing materials are discovered in meter cupboards or behind consumer units.',
  },
  {
    question: 'Do I need building control approval for electrical work in Plymouth?',
    answer:
      'Notifiable electrical work in Plymouth (as in the rest of England and Wales) is governed by Part P of the Building Regulations. Notifiable work includes new circuits, consumer unit replacements, work in bathrooms and kitchens involving new circuits, and work in special locations. If your electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or others), they can self-certify the work and notify Plymouth City Council on your behalf. If the electrician is not registered, you must apply to Plymouth City Council building control for approval before work starts, which adds cost (typically £200 to £350) and time.',
  },
  {
    question: 'What is an EICR and do I need one for my Plymouth property?',
    answer:
      "An Electrical Installation Condition Report (EICR) is a formal inspection and test of the fixed electrical installation in a property. Since April 2021, landlords in England are legally required to have a valid EICR for rented properties, carried out at least every 5 years or at each change of tenancy. For Plymouth properties, an EICR typically costs £180 to £300 for a 2 to 3 bedroom flat, and £250 to £400 for a 3 to 4 bedroom house. Plymouth's large student rental market (around the University of Plymouth campus in Drake, Mutley, and Greenbank) means EICR demand is consistently high. Older properties in these areas frequently receive C2 (potentially dangerous) or C3 (improvement recommended) codes due to aged wiring and lack of RCD protection compliant with Regulation 411.3.3.",
  },
  {
    question: 'Who is the electricity supplier for Plymouth and how do I get a new connection?',
    answer:
      "NGED (National Grid Electricity Distribution, formerly Western Power Distribution or WPD) is the Distribution Network Operator for Plymouth and the wider South West. To request a new supply, upgraded supply, or meter relocation, you apply through NGED's website (nationalgrid.co.uk/electricity-distribution). Lead times for new connections in Plymouth are typically 4 to 8 weeks. Costs vary — a simple meter relocation might be £400 to £1,200, while a new three-phase supply can cost £2,000 to £7,000 depending on the distance from the existing network. Your electrician can advise on whether your existing supply is adequate and submit the NGED application on your behalf.",
  },
  {
    question: 'Can I do any electrical work myself in my Plymouth home?',
    answer:
      'You can carry out minor electrical work that is not notifiable under Part P, such as replacing like-for-like sockets, switches, and light fittings (but not the circuits they connect to), and adding extra sockets to an existing ring circuit in rooms that are not bathrooms or kitchens, provided you are competent and the existing circuit can safely support the additional load. However, any work involving new circuits, consumer unit changes, bathroom electrics, outdoor electrics, or work in a special location is notifiable and should be done by a registered electrician. In Plymouth, the marine atmosphere accelerates corrosion of external fittings, so outdoor electrical work particularly benefits from professional installation using marine-grade components.',
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
    description: 'Create professional quotes for Plymouth customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in Plymouth',
    content: (
      <>
        <p>
          Plymouth is the largest city in Devon and one of the largest on the south coast, with a
          population of around 265,000 and a diverse mix of residential, commercial, and military
          properties. The city's electrical trade is shaped by several distinct factors — the naval
          dockyard and associated defence industries, a large university student population,
          extensive post-war housing estates, and an increasingly busy waterfront regeneration
          programme.
        </p>
        <p>
          The Plymouth electrical market ranges from sole traders handling domestic rewires and
          landlord compliance work in the student areas around Mutley and Greenbank, through to
          larger firms servicing Devonport Dockyard contracts, the Derriford Hospital campus, and
          commercial fit-outs in the city centre and at Oceansgate. The University of Plymouth also
          drives steady demand for student accommodation EICRs and electrical upgrades.
        </p>
        <p>
          Whatever the size of the firm, the qualifications and registration requirements are the
          same. Every electrician carrying out notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          must either be registered with a competent person scheme or have the work inspected and
          signed off by Plymouth City Council building control. The most recognised competent person
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
          Before hiring any electrician in Plymouth, verify their credentials. This protects you
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
                least £2 million public liability cover. For commercial or dockyard-related work,
                higher cover is often required as a contract condition. Ask for a copy of the
                certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references and reviews</strong> — ask for contact details of 2 to 3
                recent Plymouth customers, or check verified reviews on platforms like Checkatrade,
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
    heading: 'Typical Electrician Costs in Plymouth (2026 Prices)',
    content: (
      <>
        <p>
          Plymouth electrical work costs are broadly in line with the South West average, which is
          lower than London and the South East but comparable to other regional cities like Exeter
          and Bristol. Here are realistic Plymouth prices for common domestic electrical work in
          2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed semi-detached)</strong> — £4,500 to £7,000 including new
                consumer unit, all circuits, sockets, switches, lighting, testing, and Part P
                certification. Post-war properties with cavity walls are at the lower end; older
                stone-built properties near the Hoe or in Stoke are at the upper end.
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
                a flat, £250 to £400 for a house. Required every 5 years for rented properties.
                Student HMO properties near the university may have higher costs due to the number
                of circuits and rooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket (from existing circuit)</strong> — £100 to £170 per single
                socket, depending on cable run length and wall construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £700 to £1,300 for a 7kW home charger
                including supply, installation, earthing, and Part P certification. Plymouth's
                terraced streets around Stonehouse and Devonport can make off-street charging
                installations more complex due to limited parking and longer cable runs.
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
          These prices are indicative for 2026 and vary across Plymouth. Properties in the PL1 city
          centre and waterfront areas tend to cost slightly more due to parking constraints. Always
          get at least three written quotes for any significant work.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Plymouth Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Plymouth's property stock is unusually varied for a city of its size, shaped by its naval
          history, wartime bombing, and post-war rebuilding. Understanding these property types
          helps you know what to expect when hiring an electrician.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Housing Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Plymouth was heavily bombed during the Blitz and much of the housing stock was rebuilt
              in the 1940s and 1950s. Estates in Efford, Whitleigh, Ernesettle, and Ham have
              properties that often retain original wiring — rubber-insulated cables, old fuse boxes
              with rewirable fuses, and outdated earthing arrangements. These properties are prime
              candidates for full rewires and consumer unit upgrades. The cavity wall construction
              makes cable routing easier than in older stone buildings.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Areas that survived the Blitz — parts of Stoke, Stonehouse, Devonport, and the
              Barbican — retain Victorian and Edwardian terraced housing. These properties present
              challenges similar to those found in any historic city: solid stone or brick walls
              that are difficult to chase, high ceilings, and multiple previous partial rewires.
              Many have been converted into student flats or HMOs, adding complexity with shared
              metering and fire alarm requirements.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Student HMOs</h3>
            <p className="text-white text-sm leading-relaxed">
              The University of Plymouth draws around 20,000 students, and areas like Mutley,
              Greenbank, Lipson, and parts of Drake are dominated by student HMOs (Houses in
              Multiple Occupation). HMOs have additional electrical requirements including fire
              alarm systems, emergency lighting, and more frequent EICR inspections. Landlords must
              ensure compliance with both the Electrical Safety Standards in the Private Rented
              Sector and HMO licensing conditions set by Plymouth City Council.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Waterfront and Marina Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Properties along the waterfront, at Sutton Harbour, and in the Royal William Yard
              development face accelerated corrosion from the marine atmosphere. External electrical
              fittings, garden lighting, EV chargers, and exposed cable routes degrade significantly
              faster than in inland locations. Marine-grade stainless steel fixings, higher IP-rated
              enclosures, and galvanised or plastic conduit are essential for longevity.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'NGED and Plymouth Electrical Regulations',
    content: (
      <>
        <p>
          NGED (National Grid Electricity Distribution, formerly Western Power Distribution or WPD)
          is the Distribution Network Operator for Plymouth and the wider South West. Any work
          affecting the electricity supply to your property involves NGED. This includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — if you need a new electricity
                supply or want to upgrade from single-phase to three-phase (increasingly common for
                EV chargers and heat pumps), you apply to NGED. Plymouth lead times are typically 4
                to 8 weeks, shorter than London but longer during summer construction season.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — moving the electricity meter requires NGED to
                disconnect and reconnect the supply. Your electrician installs the new meter tails;
                NGED moves the meter and cutout. This is common during kitchen extensions and
                conversions in Plymouth's older properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification for generation and storage</strong> — if you are
                installing solar PV (increasingly popular in Plymouth's south-facing properties),
                battery storage, or a generator, the electrician must notify NGED under Engineering
                Recommendation G98 (for systems up to 16A per phase) or G99 (for larger systems).
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work in Plymouth is overseen by Plymouth City Council
          building control or by an approved inspector. If your electrician is registered with a
          competent person scheme, they self-certify and notify the council on your behalf. Plymouth
          also has a dedicated HMO licensing team that sets additional electrical requirements for
          Houses in Multiple Occupation.
        </p>
      </>
    ),
  },
  {
    id: 'conservation-areas',
    heading: 'Conservation Areas and the Barbican',
    content: (
      <>
        <p>
          Plymouth has several conservation areas where external electrical work requires additional
          planning consideration. The most significant are:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>The Barbican</strong> — Plymouth's oldest quarter, with cobbled streets and
                buildings dating back to the Elizabethan era. Many properties are listed and any
                external electrical work (lighting, signage, EV charging, solar panels) requires
                Listed Building Consent and may need planning permission. Internal rewiring must be
                done sympathetically, with cables routed discreetly to avoid damage to historic
                fabric. Surface-mounted conduit and trunking should match the building aesthetic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Royal William Yard</strong> — this Grade I and Grade II listed former naval
                victualling yard has been converted into residential and commercial spaces. The
                listed status means any electrical alterations affecting the character of the
                buildings require consent. Electricians working here need experience with heritage
                buildings and must coordinate with the site's management company.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>The Hoe and Millbay</strong> — the area around Plymouth Hoe includes
                conservation zones with restrictions on external alterations. The ongoing Millbay
                regeneration combines new-build with heritage buildings, requiring electricians who
                can work across both modern and historic structures.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'marine-corrosion',
    heading: 'Marine Environment and Corrosion Protection',
    content: (
      <>
        <p>
          Plymouth's position on the coast means that electrical installations — particularly
          external fittings — are exposed to salt-laden air that accelerates corrosion. This is a
          practical consideration that inland electricians may underestimate.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>External fittings</strong> — standard zinc-plated or mild steel fixings can
                corrode within 2 to 3 years in exposed coastal positions. Specify marine-grade
                stainless steel (A4/316 grade) screws, clips, and brackets for any external
                electrical work. This includes EV charger mounting hardware, external light
                fittings, and cable cleats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP ratings</strong> — for properties within 500 metres of the waterfront
                (Sutton Harbour, Barbican, the Hoe, Mount Batten), external electrical accessories
                should be rated IP66 minimum. Standard IP44 rated garden sockets and lights
                deteriorate rapidly in the salt atmosphere. Cable glands and junction boxes should
                also be rated accordingly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding</strong> — corrosion of earth electrodes and bonding
                connections is a particular risk in the marine environment. Earth electrode
                resistance should be tested more frequently (every 3 years rather than 5) for
                properties close to the sea. Copper earthing conductors are preferable to aluminium
                in coastal installations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These considerations also apply to the growing number of marine and dockyard electrical
          installations in Plymouth. Electricians working at the dockyard, Cattewater wharves, or
          marina pontoons must hold additional qualifications and understand the specific
          requirements of marine electrical installations.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Plymouth Market',
    content: (
      <>
        <p>
          Plymouth offers a steady and diverse electrical market. The combination of naval and
          defence industry contracts, university-driven rental compliance, waterfront regeneration,
          and a large stock of post-war housing needing upgrades means work is varied and
          consistent. Competition is less intense than in Bristol or Exeter, but margins can be
          tighter on domestic work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Anchor className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Dockyard and Defence Contracts</h4>
                <p className="text-white text-sm leading-relaxed">
                  Devonport Dockyard and the wider defence estate at HMNB Devonport is the largest
                  employer in Plymouth and generates significant commercial electrical work.
                  Contracts typically require SC (Security Clearance) or higher, JIB grading, and
                  compliance with defence-specific electrical standards alongside BS 7671. Babcock
                  International and other defence contractors regularly subcontract electrical work.
                  Oceansgate, the marine business park at the former South Yard, is also generating
                  commercial fit-out opportunities.
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
                  Plymouth landlords and letting agents managing student properties expect rapid
                  turnaround on EICRs and certificates. Completing an{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> on a phone
                  app and sending the PDF before leaving site gives you a significant advantage,
                  particularly during the summer turnover period when hundreds of student properties
                  need inspection before the new academic year.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Plymouth electrical business from your phone"
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

export default function ElectricianPlymouthPage() {
  return (
    <GuideTemplate
      title="Electrician in Plymouth | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Plymouth. Realistic 2026 pricing, how to verify NICEIC/NAPIT registration, post-war rewiring, NGED connections, dockyard work, marine corrosion protection, and Barbican conservation requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Plymouth:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Plymouth, what to expect on pricing, and the specific challenges of electrical work in a coastal naval city. Covers NGED connections, Part P compliance, post-war rewiring, marine corrosion protection, dockyard contracts, and conservation area requirements."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Plymouth"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Plymouth and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
