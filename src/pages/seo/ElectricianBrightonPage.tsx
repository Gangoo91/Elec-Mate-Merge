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
  Calculator,
  Waves,
  Leaf,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-brighton' },
  { label: 'Brighton', href: '/guides/electrician-brighton' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Brighton' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Brighton' },
  { id: 'property-types', label: 'Brighton Property Challenges' },
  { id: 'dno-regulations', label: 'UKPN and Local Regulations' },
  { id: 'regency-conservation', label: 'Regency Architecture and Conservation' },
  { id: 'seafront-corrosion', label: 'Seafront Corrosion Considerations' },
  { id: 'eco-retrofit', label: 'Eco-Retrofit and Renewable Energy' },
  { id: 'for-electricians', label: 'For Electricians Working in Brighton' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins. Verify registration numbers online on the scheme provider websites.',
  'UKPN (UK Power Networks) is the DNO for Brighton and the wider South East England region. All new connections, supply upgrades, and G98/G99 notifications go through UKPN.',
  'Brighton has a significant stock of Regency and early Victorian architecture (Brunswick, Kemp Town, the seafront) that is Grade I or Grade II listed. Electrical work in these properties requires Listed Building Consent and specialist approaches to cable routing and accessory selection.',
  'Seafront properties are exposed to salt air which accelerates corrosion of standard electrical fixings and enclosures. Marine-grade stainless steel fixings, higher IP ratings, and corrosion-resistant accessories are essential for external installations within 500 metres of the sea.',
  'Brighton has one of the highest eco-retrofit adoption rates in the UK, with strong demand for solar PV, battery storage, heat pump installations, and EV chargers — all creating electrical work opportunities.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Brighton?',
    answer:
      'Brighton electrician day rates typically range from £320 to £420 per day for a qualified electrician, with hourly rates of £45 to £60 per hour. Common job prices include: full rewire of a 3-bed Regency terrace £5,500 to £8,500 (higher due to listed building constraints), consumer unit replacement £500 to £780, EICR £190 to £320, EV charger installation £850 to £1,300, and additional socket from existing circuit £120 to £190. Brighton prices reflect the South East premium and are 10% to 20% above the national average. Listed building and conservation area work commands an additional 15% to 30% premium due to the specialist approaches required.',
  },
  {
    question: 'How do I check if a Brighton electrician is properly qualified?',
    answer:
      'Ask for their competent person scheme registration number and verify it online. NICEIC, NAPIT, and ELECSA all have online search tools. A legitimate electrician will hold a current ECS card, carry public liability insurance (minimum £2 million recommended, £5 million for listed building work), and provide references from recent local work. For Regency and listed building work, ask specifically for experience with heritage properties — not all electricians have the skills to work sympathetically in these buildings.',
  },
  {
    question: 'Who is the DNO for Brighton?',
    answer:
      "Brighton is served by UKPN (UK Power Networks), which operates the electricity distribution network across South East England, the East of England, and London. For new connections, supply upgrades, or meter relocations, apply through UKPN's website (ukpowernetworks.co.uk). For power cuts, call 105. When completing an EIC or EICR in Brighton, reference UKPN as the DNO. The earthing arrangement in most Brighton properties is TN-C-S (PME), though some of the older Regency and Victorian properties may be TN-S.",
  },
  {
    question: 'Can I install solar panels on a listed building in Brighton?',
    answer:
      'Solar PV on a listed building always requires Listed Building Consent from Brighton and Hove City Council, regardless of which elevation the panels face. In conservation areas (which cover much of central Brighton including Brunswick, Kemp Town, North Laine, and the seafront), planning permission is required for panels visible from a highway. Brighton and Hove council is generally supportive of renewable energy but requires proposals on listed buildings to be sympathetic — slate-coloured in-roof systems are more likely to gain consent than standard rack-mounted panels. Your electrician should coordinate with a planning consultant before committing to a design.',
  },
  {
    question: 'What are the challenges of electrical work in Regency properties?',
    answer:
      "Brighton's Regency properties (built 1800 to 1840) present specific challenges: ornate plasterwork, cornicing, and ceiling roses that must not be damaged during rewiring; lath-and-plaster walls on timber studwork that crumble when chased; original timber floorboards that may need careful lifting and relaying; listed building constraints on surface-mounted cable routes and accessory positions; and often complex previous wiring installations accumulated over 200 years. A full rewire of a Regency property takes significantly longer than a standard Victorian terrace and costs 30% to 50% more due to the care required.",
  },
  {
    question: 'Do I need building control approval for electrical work in Brighton?',
    answer:
      "Notifiable electrical work in Brighton is governed by Part P of the Building Regulations (England and Wales). If your electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or others), they can self-certify and notify Brighton and Hove City Council on your behalf. If not registered, you must apply to building control before work starts — typically costing £250 to £400. For listed buildings, you also need Listed Building Consent from the planning department for any work affecting the building's character, which is separate from Part P requirements.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete Electrical Installation Condition Reports on site for Brighton rental and HMO properties.',
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
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installation guidance including conservation area and seafront considerations.',
    icon: Zap,
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
    description: 'Create professional quotes for Brighton customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in Brighton',
    content: (
      <>
        <p>
          Brighton and Hove is a vibrant coastal city with a population of approximately 290,000,
          known for its distinctive Regency architecture, two universities, a thriving independent
          commercial sector, and one of the strongest eco-conscious communities in the UK. The
          city's electrical contracting market reflects this character — there is strong demand for
          heritage-sensitive work in listed buildings, specialist coastal installations, renewable
          energy retrofits, and standard domestic and commercial electrical services.
        </p>
        <p>
          The market is split between firms specialising in heritage and listed building work
          (requiring patience, skill, and planning expertise), those focused on the student HMO
          market around the University of Sussex and University of Brighton, commercial contractors
          serving the North Laine and city centre retail district, and general domestic electricians
          handling rewires, consumer units, and EICRs across the wider city.
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
          Before hiring any electrician in Brighton, verify their credentials. This is particularly
          important for listed building and conservation area work where unqualified work can cause
          irreversible damage. Here is what to check:
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
                the holder's qualifications. A gold ECS card indicates a qualified electrician
                (typically holding C&G 2365/2357 and C&G 2391 or equivalent).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — minimum £2 million, ideally £5 million
                for work in listed and high-value Regency properties. The cost of making good damage
                to ornate plasterwork or original features in a listed building is substantial.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heritage property experience</strong> — for Regency and listed building
                work, ask specifically for examples of previous heritage property projects. Not all
                electricians have the skills to route cables without damaging cornicing, lift and
                relay original floorboards, or work within listed building consent conditions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Brighton (2026 Prices)',
    content: (
      <>
        <p>
          Brighton electrical work carries a South East premium — higher than the Midlands and North
          but lower than central London. Heritage and listed building work adds a further premium.
          Here are realistic Brighton prices for 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed Regency terrace, listed)</strong> — £5,500 to £8,500
                including new consumer unit, all circuits, testing, and Part P certification. The
                premium reflects the care needed for ornate plasterwork, listed building consent
                requirements, and the longer time taken to route cables without damaging original
                features.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed standard Victorian/Edwardian)</strong> — £4,500 to £6,500
                for non-listed properties in Hanover, Elm Grove, or Preston Park.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £500 to £780 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and Part P
                notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR</strong> — £190 to £320 for a house, £170 to £270 for a flat. Required
                every 5 years for rented properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £850 to £1,300 for a 7kW home charger.
                Brighton's terraced housing often means longer cable runs from the consumer unit to
                the parking area, increasing installation costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV electrical connection</strong> — £600 to £1,200 for the electrical
                connection of a domestic solar PV system (panels supplied and fitted separately).
                Includes G98 notification to UKPN, consumer unit modification, and generation meter.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are indicative for 2026. Listed building and seafront conservation area work
          is at the upper end due to specialist material requirements and the additional time
          needed. Always get at least three written quotes.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Brighton Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Brighton's property stock is architecturally diverse, from grand Regency crescents to
          Victorian terraces, Edwardian villas, and modern seafront apartments. Each presents
          distinct challenges.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Regency Properties (Brunswick/Kemp Town)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Brighton's iconic Regency terraces and crescents (built 1800 to 1840) in Brunswick,
              Kemp Town, and along the seafront are predominantly Grade I or Grade II listed. They
              feature ornate cornicing, decorative plasterwork, original shutters, and curved bay
              windows. Electrical work must preserve these features — surface-mounted cable routes
              are unacceptable, chasing must avoid original plasterwork, and Listed Building Consent
              is required for any work affecting the building's character.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Student HMOs</h3>
            <p className="text-white text-sm leading-relaxed">
              The University of Sussex (Falmer) and University of Brighton drive HMO demand in
              Moulsecoomb, Bevendean, Lewes Road, Elm Grove, and Hanover. HMO properties require
              enhanced fire detection (LD2 to BS 5839-6), emergency lighting, 30mA RCD protection on
              all circuits, and a valid EICR. Brighton and Hove City Council actively enforces HMO
              licensing conditions.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Victorian Terraces (Hanover/Preston Park)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Dense Victorian terraces in Hanover, Elm Grove, Preston Park, and Fiveways are typical
              of many UK cities — lath-and-plaster walls, high ceilings, and multiple previous
              partial rewires. Brighton's hilly topography means some Hanover properties have steep
              access issues for cable delivery and skip placement.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">North Laine Commercial</h3>
            <p className="text-white text-sm leading-relaxed">
              The North Laine area is Brighton's independent shopping and hospitality district, with
              hundreds of small retail units, cafes, restaurants, and bars. Many occupy ground
              floors of Victorian or Regency buildings with limited electrical capacity. Commercial
              fit-outs often require supply upgrades, three-phase connections for commercial
              kitchens, and compliance with commercial fire safety requirements.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'UKPN and Brighton Electrical Regulations',
    content: (
      <>
        <p>
          UKPN (UK Power Networks) is the Distribution Network Operator for Brighton and the wider
          South East England region. Any work affecting the electricity supply involves UKPN:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — apply through UKPN's website
                (ukpowernetworks.co.uk). Brighton lead times are typically 4 to 8 weeks for standard
                domestic connections. Three-phase upgrades for heat pumps and EV chargers are
                increasingly common.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification</strong> — Brighton's high rate of solar PV adoption
                means G98 notifications to UKPN are very common. Systems up to 16A per phase require
                G98 notification; larger systems require G99 approval before connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — common in Regency property conversions where
                the existing meter position does not suit the new layout. UKPN moves the meter and
                cutout; your electrician installs the new meter tails.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable work is overseen by Brighton and Hove City Council Building Control
          or an approved inspector. Registered electricians self-certify and notify the council on
          your behalf.
        </p>
      </>
    ),
  },
  {
    id: 'regency-conservation',
    heading: 'Regency Architecture and Conservation Challenges',
    content: (
      <>
        <p>
          Brighton's Regency architecture is the city's most distinctive feature and presents the
          most significant challenges for electrical work. Much of central Brighton — including
          Brunswick, Kemp Town, the seafront, and parts of Hove — is within conservation areas, and
          many individual buildings are Grade I or Grade II listed.
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed Building Consent</strong> — any electrical work affecting the
                character of a listed building requires Listed Building Consent from Brighton and
                Hove City Council. This includes surface-mounted cable routes on original walls, new
                socket and switch positions on original plasterwork, external light fittings, and
                any work that disturbs original features. Apply before work starts — carrying out
                unauthorised work on a listed building is a criminal offence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable routing in Regency properties</strong> — the key skill is routing
                cables without damaging ornate plasterwork, cornicing, and ceiling roses. Use
                existing voids (under floorboards, through ceiling voids above cornicing line),
                route cables through cupboards and behind built-in joinery where possible, and avoid
                chasing original lime plaster. Period-appropriate accessory plates (brass, nickel)
                are preferable to standard white plastic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation area external work</strong> — EV charger installations, solar
                panels, satellite dishes, and external lighting in Brighton's conservation areas may
                require planning permission. The council has Article 4 directions in place for some
                areas that remove certain permitted development rights. Check before starting any
                external work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians who develop expertise in heritage property electrical work can command
          premium rates in Brighton. The demand consistently outstrips the supply of electricians
          willing and able to work carefully in listed buildings.
        </p>
      </>
    ),
  },
  {
    id: 'seafront-corrosion',
    heading: 'Seafront Corrosion Considerations',
    content: (
      <>
        <p>
          Brighton's seafront location means that many properties — particularly in Kemp Town,
          Brunswick, and along Marine Parade — are exposed to salt-laden air. This has direct
          implications for external electrical installations.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Waves className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixings and enclosures</strong> — standard mild steel and galvanised steel
                fixings, enclosures, and accessories will corrode rapidly in the salt air
                environment. Within 500 metres of the seafront, use A2 or A4 grade stainless steel
                fixings, GRP or stainless steel enclosures, and marine-grade accessories for all
                external installations. Standard galvanised conduit can show visible rust within 12
                to 18 months on the seafront.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Waves className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP ratings</strong> — external accessories on seafront properties should be
                rated IP65 or higher. Even sheltered positions (under balconies, in recessed
                doorways) are exposed to salt spray during storms. EV chargers, external sockets,
                and outdoor lighting must be specified accordingly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Waves className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintenance implications</strong> — even with marine-grade materials,
                external installations on the seafront require more frequent inspection and
                maintenance than inland properties. Factor this into your quotes and advise clients
                on a recommended maintenance schedule. Annual visual inspection of external fixings
                and accessories is advisable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Specifying the right materials from the outset avoids costly premature replacements and
          demonstrates professionalism. Include the material specification rationale in your quote
          so the client understands why marine-grade materials cost more.
        </p>
      </>
    ),
  },
  {
    id: 'eco-retrofit',
    heading: 'Eco-Retrofit and Renewable Energy Demand',
    content: (
      <>
        <p>
          Brighton has one of the highest rates of domestic renewable energy adoption in the UK. The
          city's environmentally conscious population drives strong demand for solar PV, battery
          storage, heat pump installations, and EV chargers — all of which create electrical work.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV</strong> — Brighton has excellent solar irradiance for a UK city.
                Domestic solar installations require electrician involvement for the AC connection,
                consumer unit modification, generation meter installation, and G98 notification to
                UKPN. In conservation areas, planning permission may be required for visible panels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery storage</strong> — increasingly paired with solar PV, domestic
                battery storage systems require dedicated circuits, appropriate isolation, and
                careful consideration of the installation location (ventilation, fire rating). The
                electrical connection work is typically £400 to £800 on top of the battery unit
                cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat pump electrical supplies</strong> — air source heat pumps typically
                require a dedicated radial circuit and may necessitate a supply upgrade if the
                existing supply cannot support the additional load. Coordinate with UKPN early if a
                supply upgrade is likely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV chargers</strong> — Brighton has high EV adoption but limited off-street
                parking in the terraced areas. On-street EV charging solutions and shared charging
                points for flats create new installation opportunities.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians who position themselves as renewable energy specialists in Brighton will find
          a receptive market. Consider MCS (Microgeneration Certification Scheme) accreditation if
          you want to offer the full solar PV and battery storage installation service.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Brighton Market',
    content: (
      <>
        <p>
          Brighton offers a distinctive electrical market combining heritage work, eco-retrofit,
          student HMOs, commercial hospitality, and seafront specialist installations. The city
          rewards electricians who develop niche expertise.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Heritage Specialist Premium</h4>
                <p className="text-white text-sm leading-relaxed">
                  Electricians experienced with Regency and listed buildings are in short supply in
                  Brighton. Developing this expertise — understanding Listed Building Consent
                  processes, sympathetic cable routing, and period-appropriate accessories — allows
                  you to command rates 20% to 30% above standard domestic prices.
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
                  Brighton's informed customer base expects professional documentation. An{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> completed on
                  a phone app and sent as a PDF before you leave the site demonstrates the
                  professionalism Brighton customers value.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Brighton electrical business from your phone"
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

export default function ElectricianBrightonPage() {
  return (
    <GuideTemplate
      title="Electrician in Brighton | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Brighton. Realistic 2026 pricing, UKPN DNO connections, Regency listed building electrical work, seafront corrosion considerations, eco-retrofit demand, student HMOs, and Part P guidance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Brighton:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Brighton, what to expect on pricing, and the specific challenges of electrical work in Brighton properties. Covers UKPN connections, Regency conservation areas, seafront corrosion, eco-retrofit, student HMOs, and Part P compliance."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Brighton"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Brighton and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
