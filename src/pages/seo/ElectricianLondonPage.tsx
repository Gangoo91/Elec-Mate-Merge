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
  { label: 'Find an Electrician', href: '/guides/electrician-london' },
  { label: 'London', href: '/guides/electrician-london' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in London' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in London' },
  { id: 'property-types', label: 'London Property Challenges' },
  { id: 'dno-regulations', label: 'UKPN and Local Regulations' },
  { id: 'conservation-areas', label: 'Conservation Areas and Listed Buildings' },
  { id: 'flat-leaseholders', label: 'Section 20 Notices for Flats' },
  { id: 'for-electricians', label: 'For Electricians Working in London' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins. You can verify registration numbers online on the scheme provider websites.',
  'London electrician rates are 20% to 40% higher than the national average due to congestion charges, parking costs, travel time, and the complexity of older London properties.',
  'Victorian and Edwardian properties (which make up a large proportion of London housing) often have outdated wiring concealed behind lath-and-plaster walls, requiring specialist rewiring approaches.',
  'UKPN (UK Power Networks) is the Distribution Network Operator for all London boroughs. Any work affecting the incoming supply, meter position, or requiring a new connection must be coordinated with UKPN.',
  'If you live in a leasehold flat, electrical work above a certain cost threshold may require a Section 20 consultation notice to be served on all leaseholders by the freeholder or managing agent.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in London?',
    answer:
      'London electrician day rates typically range from £300 to £450 per day for a qualified electrician, compared to a national average of £220 to £320. Hourly rates are usually £50 to £75 per hour, with emergency call-out rates of £80 to £120 per hour. These higher rates reflect London operating costs including the congestion charge (£15 per day for central London), parking (often £15 to £30 per day in inner boroughs), ULEZ compliance, higher insurance premiums, and longer travel times between jobs. Always get a fixed quote for defined work rather than agreeing to day rates where possible.',
  },
  {
    question: 'How do I check if a London electrician is properly qualified?',
    answer:
      'Ask for their competent person scheme registration number and verify it online. NICEIC (niceic.com/find-a-contractor), NAPIT (napit.org.uk/find-an-installer), and ELECSA (elecsa.co.uk/find-a-contractor) all have online search tools. A legitimate electrician will also hold a current ECS (Electrotechnical Certification Scheme) card, carry public liability insurance (minimum £2 million recommended in London due to property values), and be able to provide references from recent local work. For any notifiable work under Part P of the Building Regulations, the electrician must be registered with a competent person scheme or the work must be signed off by local authority building control.',
  },
  {
    question: 'How long does a full rewire take in a London Victorian terrace?',
    answer:
      'A full rewire of a typical 3-bedroom Victorian terraced house in London takes 7 to 10 working days with a team of two electricians, plus 1 to 2 days for testing and certification. Victorian properties add complexity because of lath-and-plaster walls (which crumble when chased), high ceilings (3 metres or more, requiring scaffolding or tower access), ornate cornicing and ceiling roses that must be preserved, and often multiple previous partial rewires that have left a tangle of old and newer cabling. The first fix (running new cables) typically takes 5 to 7 days, and second fix (connecting sockets, switches, and the consumer unit) takes 2 to 3 days. Allow additional time if the property has a basement conversion or loft extension.',
  },
  {
    question: 'Do I need building control approval for electrical work in London?',
    answer:
      'Notifiable electrical work in London (as in the rest of England and Wales) is governed by Part P of the Building Regulations. Notifiable work includes new circuits, consumer unit replacements, work in bathrooms and kitchens involving new circuits, and work in special locations. If your electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or others), they can self-certify the work and notify your local borough council on your behalf. If the electrician is not registered with a competent person scheme, you must apply to your London borough building control department for approval before work starts, and they will inspect the work — this adds cost (typically £250 to £400) and time. In all London boroughs, building control is handled either by the borough council or an approved inspector.',
  },
  {
    question: 'What is an EICR and do I need one for my London property?',
    answer:
      'An Electrical Installation Condition Report (EICR) is a formal inspection and test of the fixed electrical installation in a property. Since April 2021, landlords in England (including all London boroughs) are legally required to have a valid EICR for rented properties, carried out at least every 5 years or at each change of tenancy. The EICR must be carried out by a qualified person — typically an electrician registered with a competent person scheme. For London properties, an EICR typically costs £200 to £350 for a 2 to 3 bedroom flat, and £300 to £500 for a 3 to 4 bedroom house. Older London properties frequently receive C2 (potentially dangerous) or C3 (improvement recommended) codes due to ageing wiring, lack of RCD protection, or outdated consumer units. The EICR is legally required for rentals and strongly recommended for any property purchase.',
  },
  {
    question: 'Can I do any electrical work myself in my London home?',
    answer:
      'You can carry out minor electrical work that is not notifiable under Part P, such as replacing like-for-like sockets, switches, and light fittings (but not the circuits they connect to), and adding extra sockets to an existing ring circuit in rooms that are not bathrooms or kitchens, provided you are competent and the existing circuit can safely support the additional load. However, any work involving new circuits, consumer unit changes, bathroom electrics, outdoor electrics, or work in a special location is notifiable and should be done by a registered electrician. In London specifically, the consequences of DIY electrical work gone wrong are amplified by the density of housing — a fault in a terraced house or flat can affect neighbouring properties. Insurance companies may also refuse claims if electrical work was not carried out by a qualified person.',
  },
  {
    question: 'How do I get a new electricity supply or meter upgrade in London?',
    answer:
      "UKPN (UK Power Networks) is the DNO for all of Greater London. To request a new supply, upgraded supply (for example, from single-phase to three-phase for an EV charger or heat pump), or meter relocation, you apply through UKPN's website (ukpowernetworks.co.uk). In London, lead times for new connections can be 6 to 12 weeks due to the volume of applications and the complexity of the underground cable network. Costs vary significantly — a simple meter relocation might be £500 to £1,500, while a new three-phase supply to a London property can cost £3,000 to £10,000 depending on the distance from the existing network and the amount of streetwork required. Your electrician can advise on whether your existing supply is adequate for the planned work and submit the UKPN application on your behalf.",
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
    description: 'Create professional quotes for London customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in London',
    content: (
      <>
        <p>
          London has one of the highest concentrations of electrical contractors in the UK, with
          thousands of registered electricians serving the capital's 3.5 million households and
          hundreds of thousands of commercial premises. Finding an electrician is not difficult —
          finding the right one, at a fair price, who understands the specific challenges of London
          properties, is the real task.
        </p>
        <p>
          The London electrical market is split broadly into three tiers. Large firms (10+
          electricians) tend to focus on commercial fit-outs, new-build developments, and large
          residential projects. Mid-size firms (3 to 10 electricians) handle a mix of domestic and
          commercial work including rewires, consumer unit upgrades, and landlord compliance. Sole
          traders and two-person teams handle the majority of domestic work — socket additions,
          light fitting installations, fault finding, and EICRs.
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
          Before hiring any electrician in London, verify their credentials. This protects you
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
                <strong>Public liability insurance</strong> — in London, property values and repair
                costs are significantly higher than the national average. Ensure your electrician
                carries at least £2 million public liability cover, ideally £5 million for work in
                high-value properties. Ask for a copy of the certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references and reviews</strong> — ask for contact details of 2 to 3
                recent London customers, or check verified reviews on platforms like Checkatrade,
                Trustpilot, or Google Business. Look for reviews that mention similar work to what
                you need.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be cautious of electricians who cannot provide a scheme registration number, offer
          significantly below-market rates, refuse to provide a written quote, or pressure you to
          pay cash without an invoice. These are common warning signs across London's busy trades
          market.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in London (2026 Prices)',
    content: (
      <>
        <p>
          London electrical work costs more than anywhere else in the UK. The premium reflects
          genuine operating costs — not just margin. Here are realistic London prices for common
          domestic electrical work in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed Victorian terrace)</strong> — £6,500 to £10,000 including
                new consumer unit, all circuits, sockets, switches, lighting, testing, and Part P
                certification. Victorian properties with lath-and-plaster walls are at the upper
                end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £550 to £900 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and Part P
                notification. Higher for properties with complex existing installations or
                asbestos-containing meter cupboards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (Electrical Installation Condition Report)</strong> — £200 to £350 for
                a flat, £300 to £500 for a house. Required every 5 years for rented properties.
                Older London properties typically take longer to inspect due to the age and
                complexity of the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket (from existing circuit)</strong> — £120 to £200 per single
                socket, depending on cable run length and the ease of access to the existing
                circuit. Surface-mounted in a garage is cheaper; flush-mounted in a solid brick wall
                with plaster is more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £800 to £1,500 for a 7kW home charger
                including supply, installation, earthing, and Part P certification. London prices
                are higher due to the complexity of off-street parking arrangements, longer cable
                runs in terraced houses, and potential UKPN network capacity issues.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £150 to £250 for the first hour including
                travel, plus £60 to £90 per additional hour. Weekend and bank holiday rates are
                typically 50% higher.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are indicative for 2026 and vary by London borough. Inner London boroughs
          (Westminster, Camden, Kensington and Chelsea, Islington) tend to be 10% to 20% higher than
          outer boroughs (Bromley, Croydon, Havering) due to higher parking and access costs. Always
          get at least three written quotes for any significant work.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'London Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          London's property stock presents unique challenges for electrical work that electricians
          outside the capital rarely encounter. Understanding these helps you know what to expect
          when hiring an electrician and why some jobs cost more.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian and Edwardian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Built between 1850 and 1910, these make up a large proportion of London housing in
              boroughs like Hackney, Islington, Lambeth, and Wandsworth. Challenges include
              lath-and-plaster walls that crumble when chased, high ceilings requiring tower access,
              gas pipes and old lead water pipes concealed in walls alongside wiring, and multiple
              previous partial rewires leaving a tangle of different cable types and junction boxes.
              A full rewire is often the most cost-effective approach.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Purpose-Built Flats</h3>
            <p className="text-white text-sm leading-relaxed">
              London has a high proportion of purpose-built flats from every era — 1930s mansion
              blocks, 1960s tower blocks, and modern new-builds. Electrical work in flats requires
              coordination with the freeholder or managing agent, especially for work affecting
              communal areas or the incoming supply. In many older blocks, the consumer unit is in a
              shared cupboard on the landing, which complicates access and isolation procedures.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Converted Flats</h3>
            <p className="text-white text-sm leading-relaxed">
              Many London Victorian and Edwardian houses have been converted into flats, often with
              shared rising mains and complex metering arrangements. The electrical installation for
              each flat may have been done at different times, to different standards, and by
              different electricians. Establishing what belongs to each flat, where circuits run,
              and which meter serves which flat is often the first challenge.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Basement Conversions</h3>
            <p className="text-white text-sm leading-relaxed">
              Basement and cellar conversions are increasingly popular in London (especially in
              high-value boroughs where adding a habitable basement is cheaper per square foot than
              moving). Electrical work in basements requires careful attention to moisture
              protection, IP ratings for accessories below ground level, and compliance with Part P
              for the new habitable space. The consumer unit arrangement may need reconfiguring to
              serve the additional floor.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'UKPN and London Electrical Regulations',
    content: (
      <>
        <p>
          UKPN (UK Power Networks) is the Distribution Network Operator for all of Greater London,
          as well as the South East and East of England. Any work affecting the electricity supply
          to your property involves UKPN. This includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — if you need a new electricity
                supply (for a new-build or conversion) or want to upgrade from single-phase to
                three-phase (for EV chargers, heat pumps, or commercial equipment), you apply to
                UKPN. London lead times are typically 6 to 12 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — moving the electricity meter (common in
                basement conversions and kitchen extensions) requires UKPN to disconnect and
                reconnect the supply. Your electrician installs the new meter tails; UKPN moves the
                meter and cutout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification for generation and storage</strong> — if you are
                installing solar PV, battery storage, or a generator, the electrician must notify
                UKPN under Engineering Recommendation G98 (for systems up to 16A per phase) or G99
                (for larger systems).
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work in London is overseen by the building control
          department of your local borough council (there are 33 London boroughs, each with its own
          building control team) or by an approved inspector. If your electrician is registered with
          a competent person scheme, they self-certify and notify the borough on your behalf.
        </p>
      </>
    ),
  },
  {
    id: 'conservation-areas',
    heading: 'Conservation Areas and Listed Buildings',
    content: (
      <>
        <p>
          London has over 1,000 conservation areas and thousands of listed buildings. Electrical
          work in these properties requires additional planning:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings</strong> — any work that affects the character of a listed
                building requires Listed Building Consent from the local planning authority. This
                can include surface-mounted conduit on external walls, new external light fittings,
                satellite dishes, and even internal work if it affects original features. An
                electrician experienced with listed buildings will know how to route cables
                discreetly and use appropriate fixings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation areas</strong> — while internal electrical work is generally
                unaffected, external changes (lighting, EV charger installations, solar panels) in
                conservation areas may require planning permission. Check with your borough planning
                department before starting external work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Article 4 directions</strong> — some London conservation areas have Article
                4 directions that remove permitted development rights. This means even minor
                external alterations (including satellite dishes and some external lighting) need
                planning permission. Boroughs like Westminster, Camden, and Kensington and Chelsea
                make extensive use of Article 4 directions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'flat-leaseholders',
    heading: 'Section 20 Notices for Electrical Work in Flats',
    content: (
      <>
        <p>
          If you live in a leasehold flat in London (as the majority of flat-dwellers do), major
          electrical work to the communal areas or building infrastructure may be subject to Section
          20 of the Landlord and Tenant Act 1985. This applies when:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The cost of the work exceeds £250 per leaseholder (or any amount for a long-term
                agreement). The freeholder or managing agent must serve a Section 20 consultation
                notice on all leaseholders, allowing them to comment on the proposed work, nominate
                alternative contractors, and see the quotes received.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The consultation process typically takes 60 to 90 days minimum. This means communal
                electrical work (rewiring communal areas, upgrading the rising main, replacing
                communal consumer units) cannot be rushed. Emergency repairs are exempt from Section
                20, but the definition of "emergency" is narrow.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                If the freeholder fails to follow the Section 20 process, they cannot recover more
                than £250 per leaseholder through the service charge. This is particularly relevant
                in London where communal electrical upgrades in large mansion blocks can cost tens
                of thousands of pounds.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For work within your own flat (not communal areas), Section 20 does not apply. You arrange
          and pay for this directly, though you may need the freeholder's permission for certain
          alterations depending on your lease terms.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the London Market',
    content: (
      <>
        <p>
          London is the largest and most competitive electrical market in the UK. The demand is
          constant — landlord compliance, property renovations, new-build fit-outs, and
          infrastructure upgrades keep London electricians busy year-round. But the operating costs
          are significant and must be factored into your pricing.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">London Operating Costs to Factor In</h4>
                <p className="text-white text-sm leading-relaxed">
                  Congestion charge (£15/day in central London), ULEZ (£12.50/day if your van is not
                  compliant), parking (£15 to £30/day in inner boroughs, plus the risk of PCNs),
                  higher fuel costs due to traffic, higher insurance premiums, and longer travel
                  times between jobs. A London electrician's overhead is typically 30% to 50% higher
                  than a comparable electrician outside the M25.
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
                  London customers — particularly in affluent boroughs and the commercial sector —
                  expect professional documentation. An{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> completed on
                  a phone app and sent as a PDF before you leave the site sets you apart from
                  competitors still posting handwritten certificates.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your London electrical business from your phone"
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

export default function ElectricianLondonPage() {
  return (
    <GuideTemplate
      title="Electrician in London | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in London. Realistic 2026 pricing, how to verify NICEIC/NAPIT registration, Victorian rewiring costs, UKPN connections, Part P compliance, and London-specific electrical regulations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in London:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in London, what to expect on pricing, and the specific challenges of electrical work in London properties. Covers UKPN connections, Part P compliance, Victorian rewiring, conservation areas, and Section 20 notices for flats."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in London"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in London and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
