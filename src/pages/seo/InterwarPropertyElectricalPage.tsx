import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Zap,
  ShieldCheck,
  FileCheck2,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Property Guides', href: '/guides/period-property-electrical' },
  { label: 'Interwar Property Electrical Guide', href: '/interwar-property-electrical' },
];

const tocItems = [
  { id: 'interwar-overview', label: 'Interwar Properties Overview' },
  { id: 'rubber-wiring', label: 'Early Rubber Wiring Degradation' },
  { id: 'round-pin-sockets', label: '5-Amp Round Pin Sockets' },
  { id: 'rewiring-challenges', label: 'Rewiring Challenges' },
  { id: 'wwii-properties', label: 'WWII-Era Property Issues' },
  { id: 'rewire-costs', label: 'Rewire Costs 2026' },
  { id: 'eicr-findings', label: 'Typical EICR Findings' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Properties built between 1918 and 1939 (the interwar period) have wiring that is now 85 to 108 years old. Early rubber-insulated cables from this era degrade predictably — the insulation becomes hard, cracks, and ultimately fails.',
  'The 5-amp round pin socket (BS 546) was standard in interwar properties. These sockets cannot accept modern 13A square pin plugs and their presence indicates the wiring has not been modernised.',
  'Interwar housing boom properties (council houses, semi-detached suburbs) often used cheaper wiring specifications. Subsequent decades of DIY additions have frequently left installations in an irregular and potentially hazardous state.',
  'World War Two disrupted electrical maintenance and led to some wartime emergency wiring that does not meet the standards of the period. Properties built or rewired between 1939 and 1945 may have particularly inconsistent installations.',
  'A full rewire of a typical interwar three-bedroom semi-detached house costs £3,500 to £6,500 — generally less than Victorian or Edwardian properties due to less ornate period features and easier cable routing through cavity-wall extensions.',
];

const faqs = [
  {
    question: 'What is the interwar period for UK housing?',
    answer:
      'The interwar period covers 1918 to 1939 — the years between the end of World War One and the start of World War Two. This period saw an enormous expansion of UK housing stock, including the growth of suburban semi-detached housing (the "semi" boom), large council housing programmes, and the first large-scale availability of domestic electricity outside city centres.',
  },
  {
    question: 'How can I tell if my interwar property still has original wiring?',
    answer:
      'Key indicators include 5-amp or 15-amp round pin sockets (BS 546), a cast iron or Bakelite fuse board, light switches of the older Dolly or tumbler type, and cables with cloth-covered or rubber-sheathed insulation visible in the loft or under floorboards. An EICR by a qualified electrician will definitively assess the wiring condition. If in doubt, have an electrician open some socket and switch fittings to inspect the cable insulation.',
  },
  {
    question: 'Is a 1930s semi-detached house safe to live in with original wiring?',
    answer:
      'Original 1930s wiring that has been in continuous use for 85 to 95 years without professional assessment is potentially hazardous. The insulation may have degraded significantly, the overcurrent protection (rewirable fuses) may be incorrectly sized, and there is no RCD protection. A professional EICR will assess the actual condition. Some original 1930s wiring has been well-maintained and remains serviceable; much has not. The only way to know is to have it inspected.',
  },
  {
    question: 'What is the difference between 1920s and 1930s wiring?',
    answer:
      '1920s wiring is older but the fundamental difference is modest. Both periods used rubber-insulated cables with woven braid coverings. 1930s wiring benefited from slightly improved rubber compounds and more standardised installation practices following the establishment of the IEE Wiring Regulations. Properties built after 1930 are also more likely to have had the ring main circuit (introduced 1947) retrofitted at some point, providing a better basis for modernisation.',
  },
  {
    question: 'Did wartime (WWII) properties have worse wiring?',
    answer:
      'Wartime construction between 1939 and 1945 was subject to significant material shortages and reduced labour availability. Some wartime electrical installations used lower-specification materials or simplified installation methods. Properties requisitioned for military or government use during the war and subsequently returned to residential use may have had ad-hoc electrical modifications. Emergency wartime repairs were not always followed up with proper reinstatement.',
  },
  {
    question: 'Can an interwar house be rewired without major disruption?',
    answer:
      'Rewiring any occupied house causes disruption, but interwar properties — particularly semi-detached houses with cavity walls — are generally easier to rewire than solid-wall Victorian or Edwardian properties. Cable routing through cavity walls and ceiling voids is simpler, and the absence of deep ornate plasterwork (in most interwar properties) reduces the complexity of making good. A typical interwar three-bedroom semi takes 5 to 8 working days to rewire. The property is usually habitable throughout.',
  },
  {
    question: 'Do I need an EICR if I am buying an interwar property?',
    answer:
      'A pre-purchase EICR is strongly recommended for any interwar property. The EICR will identify the condition of the existing wiring and give you a clear picture of any remedial work required before exchange or shortly after moving in. It also gives you leverage to negotiate the purchase price if significant electrical work is needed. The cost of an EICR (£150 to £400) is trivial compared to the cost of an unexpected rewire.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/victorian-house-rewire',
    title: 'Victorian House Rewire Guide',
    description:
      'Detailed guide to rewiring Victorian properties — rubber wiring, knob-and-tube, solid walls, and costs.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/post-war-property-electrical',
    title: '1940s/1950s Property Electrical Guide',
    description:
      'Post-war properties with early PVC wiring, rewirable fuse boxes, and earthing issues.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/period-property-electrical',
    title: 'Period Property Electrical Guide',
    description: 'General guide covering all pre-1966 properties — what to look for at survey.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'interwar-overview',
    heading: 'Interwar Properties and Domestic Electricity',
    content: (
      <>
        <p>
          The interwar period (1918–1939) was a transformative era for UK housing and electricity.
          The post-World War One housing shortage triggered one of the largest house-building
          programmes in British history, creating millions of new homes across suburban
          developments, council estates, and private-built semi-detached streets. Simultaneously,
          the National Grid (established 1926–1933) brought mains electricity to millions of
          households for the first time.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing types</strong> — interwar housing is dominated by the semi-detached
                house, particularly in London and the Home Counties, the Midlands, and the
                industrial North. Council-built terraces, detached bungalows, and purpose-built
                flats also proliferated. Most interwar properties have cavity wall construction
                (unlike Victorian solid masonry), making cable routing somewhat easier during
                rewiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Original electrical specification</strong> — interwar properties were
                typically wired with rubber-insulated cables in a radial circuit arrangement. Round
                pin sockets (5A for small appliances, 15A for larger loads) were standard. The ring
                main circuit was not introduced until 1947, so all original socket circuits in
                interwar properties are radial rather than ring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Partial modernisation</strong> — many interwar properties have had some
                electrical work carried out over the decades. Partial upgrades are common: a new
                consumer unit installed in the 1970s, some circuits rewired in the 1990s, and others
                still on original 1930s wiring. Mixed-age installations require careful EICR
                assessment to identify the extent of remaining original wiring.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rubber-wiring',
    heading: 'Early Rubber Insulation Degradation',
    content: (
      <>
        <p>
          Rubber-insulated cables installed in interwar properties between 1918 and 1939 are now
          between 85 and 108 years old. Rubber insulation does not have an indefinite service life —
          it degrades through a combination of oxidation, heat cycling, and the natural breakdown of
          the rubber compound over time.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hardening and cracking</strong> — as rubber ages, it loses its elasticity,
                becomes hard and brittle, and develops surface cracks. These cracks allow moisture
                ingress and provide pathways for tracking currents between conductors or to earth.
                In loft spaces, temperature cycling (extreme heat in summer, cold in winter)
                accelerates this process significantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat damage</strong> — cables routed near hot water pipes, boilers, or
                lighting fixtures accumulate heat damage over decades. Heat-damaged rubber becomes
                carbonised and may conduct rather than insulate. This is a particular risk in airing
                cupboards, boiler rooms, and ceiling voids above original incandescent light
                fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance failure</strong> — an insulation resistance test (part
                of an EICR) measures how well the cable insulation resists current leakage. Degraded
                rubber cables frequently fail insulation resistance testing, generating a C1 or C2
                observation. A reading below 1MΩ between conductors is unacceptable and indicates
                insulation failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire risk from arcing</strong> — degraded insulation allows partial tracking
                currents that generate heat. In extreme cases this leads to arcing — an electrical
                discharge that produces temperatures high enough to ignite surrounding materials.
                Arcing within a wall void or ceiling space may burn for some time before detection.
                Modern arc fault detection devices (AFDDs), required by BS 7671 for certain
                applications, can detect these events.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'round-pin-sockets',
    heading: '5-Amp Round Pin Sockets and the Interwar System',
    content: (
      <>
        <p>
          The 5-amp round pin socket outlet (BS 546) was the standard domestic socket type in UK
          properties from the Edwardian era through to the late 1940s. Its presence in a property is
          a reliable indicator that the socket circuits have not been modernised since before 1947,
          when the ring main circuit and the familiar 13-amp square pin socket (BS 1363) were
          introduced.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incompatibility with modern appliances</strong> — 5A round pin sockets
                cannot accept modern 13A square pin plugs. Properties with round pin sockets rely on
                adaptors to use modern appliances, which are themselves a potential hazard if used
                to overload 5-amp circuits. Extension leads with square pin sockets plugged into
                round pin adaptors are a common hazard in unmodernised interwar properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>15-amp sockets for larger appliances</strong> — some interwar properties
                also have 15-amp round pin sockets on dedicated circuits for larger appliances such
                as electric fires. 15-amp sockets are larger than 5-amp versions and have a
                distinctive layout. These circuits are also radial and typically unprotected by RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Very few sockets</strong> — interwar properties typically have only 1 or 2
                socket outlets per room, reflecting the small number of electrical appliances in use
                at the time of construction. The resulting reliance on multi-way extension leads —
                particularly problematic when the extension leads are used with older adaptors — is
                a significant hazard identified during EICR inspections.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rewiring-challenges',
    heading: 'Rewiring Challenges in Interwar Properties',
    content: (
      <>
        <p>
          Interwar semi-detached and detached properties are generally easier to rewire than
          Victorian or Edwardian solid-wall properties. However, they present their own challenges —
          particularly those that have had extensions added in later decades.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cavity wall routing</strong> — most interwar external walls are cavity
                construction (two skins of brick with an air gap). Cables can often be run through
                ceiling voids and dropped down internal partitions rather than being chased into
                brickwork. This reduces disruption and plastering costs compared to solid-wall
                properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extensions and loft conversions</strong> — many interwar properties have had
                rear kitchen extensions, garage conversions, and loft conversions added at various
                points. Each addition may have its own wiring vintage and condition. Extensions
                sometimes tap off the original circuits without providing adequate overcurrent
                protection for the extended cable runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buried cables and unknown routes</strong> — decades of previous electrical
                work may have left abandoned cables buried in walls, unknown junction boxes behind
                wallpaper, and circuit routes that bear no logical relationship to the property
                layout. Tracing the existing installation before a rewire requires patience and
                experience.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Suspended timber floors</strong> — interwar properties commonly have
                suspended timber ground floors, providing convenient underfloor cable routing for
                socket circuits on the ground floor. This significantly reduces the amount of
                chasing required in kitchen and living room areas.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wwii-properties',
    heading: 'WWII-Era Property Issues (1939–1945)',
    content: (
      <>
        <p>
          Properties built or significantly modified during World War Two (1939–1945) present
          specific challenges. Wartime conditions including material shortages, a reduced skilled
          workforce, and emergency construction programmes led to some electrical installations that
          do not meet even the standards of the period.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Material substitutions</strong> — wartime material shortages led to the use
                of substitute materials in some electrical installations. Cable sheaths, conduit,
                and fittings that would normally have met the applicable standards were sometimes
                replaced with whatever was available. These substitutions are rarely documented.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Requisitioned properties</strong> — many private properties were
                requisitioned for military or government use during the war. Electrical
                modifications made for military purposes were not always reversed or made good after
                the war. Properties returning to residential use in 1945 or later may contain
                remnants of military-era wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bomb damage repairs</strong> — in areas subject to bombing (London,
                Coventry, Plymouth, Bristol, and other cities), electrical repairs were sometimes
                carried out hastily as emergency measures. These repairs may not have been revisited
                since 1945 and could involve non-standard connections, incorrect cable types, and
                absent earth conductors.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are purchasing or working on a property in an area subject to wartime bombing and
          the electrical installation has not been professionally assessed in recent years, an EICR
          is particularly important. The inspector should be asked to note any evidence of
          non-standard installation methods.
        </p>
      </>
    ),
  },
  {
    id: 'rewire-costs',
    heading: 'Rewire Costs for Interwar Properties (2026)',
    content: (
      <>
        <p>
          Interwar properties are generally less expensive to rewire than Victorian or Edwardian
          equivalents because of their more accessible cavity wall construction and less ornate
          period features. The following are typical costs for a full rewire.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom interwar terrace or semi</strong> — £2,800 to £4,500. Cavity
                wall construction and accessible ceiling voids reduce cable routing difficulty.
                London prices typically 20 to 25 per cent higher.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom interwar semi-detached</strong> — £3,500 to £6,500. The most
                common interwar property type. Extensions and loft conversions add to cost. Detached
                equivalents at the higher end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom interwar detached</strong> — £5,500 to £9,000. Larger
                footprint, more circuits, and often more complex layouts with garages and
                outbuildings requiring separate supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Council-built interwar terrace</strong> — £2,500 to £4,000. Standardised
                layouts and less ornate construction make these among the most straightforward
                interwar properties to rewire.
              </span>
            </li>
          </ul>
        </div>
        <p>
          As with all rewiring projects, obtain a minimum of three written quotes from NICEIC- or
          NAPIT-registered electricians. Ensure the quote specifies what is included (consumer unit,
          circuit count, socket and lighting point numbers, making good) to allow meaningful
          comparison.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-findings',
    heading: 'Typical EICR Findings in Interwar Properties',
    content: (
      <>
        <p>
          An <SEOInternalLink href="/guides/eicr-observation-codes-explained">EICR</SEOInternalLink>{' '}
          on an unmodernised interwar property will typically generate several observations. The
          following are the most commonly encountered findings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Deteriorated rubber insulation</strong> — insulation resistance
                measurements below acceptable limits, or visible insulation cracking and
                deterioration at inspection points. The most common C2 in interwar properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — No RCD protection</strong> — absence of 30mA RCD protection on socket
                circuits. A requirement under Regulation 411.3.3 of BS 7671. Without RCD protection,
                the installation is Unsatisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Inadequate earthing</strong> — missing earth conductors on circuits,
                inadequate main earthing terminal, or absent main equipotential bonding to gas and
                water services.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Insufficient socket outlets</strong> — the original number of socket
                outlets (often 1 or 2 per room) is insufficient for modern living. Recorded as a
                recommendation rather than a requirement, but associated with the hazard of
                extension lead overuse.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Interwar Property Rewire Work',
    content: (
      <>
        <p>
          Interwar properties represent a substantial and consistent market for rewiring work. The
          housing stock is well-defined, the wiring hazards are predictable, and the cavity wall
          construction makes rewiring more straightforward than solid-wall properties. Building
          strong relationships with estate agents, conveyancers, and surveyors who deal with 1920s
          and 1930s properties can generate a reliable flow of EICR and rewire enquiries.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pre-Purchase EICRs — a Growing Market</h4>
                <p className="text-white text-sm leading-relaxed">
                  Property buyers are increasingly commissioning pre-purchase EICRs on interwar
                  properties. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to produce a professional report on site. Include clear photographs of original
                  wiring, round pin sockets, and fuse boards to help buyers and their solicitors
                  understand the findings.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Convert EICRs to Rewire Quotes</h4>
                <p className="text-white text-sm leading-relaxed">
                  When an EICR on an interwar property produces C1 or C2 observations, quote the
                  full rewire immediately using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . A clear, professional quote on the day of the inspection converts a £200 EICR
                  into a £4,000 rewire job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your interwar property rewire business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICRs, professional quoting, and job management. AI board scanning, voice test entry, instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function InterwarPropertyElectricalPage() {
  return (
    <GuideTemplate
      title="1920s/1930s House Electrical Guide | Interwar Property Rewiring UK"
      description="Complete electrical guide for interwar properties built 1918–1939. Early rubber wiring degradation, 5-amp round pin sockets, rewiring challenges, WWII-era property issues, and rewire costs £2,800–£9,000 for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Property Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          1920s &amp; 1930s House Electrical Guide:{' '}
          <span className="text-yellow-400">Interwar Property Rewiring</span>
        </>
      }
      heroSubtitle="Properties built between 1918 and 1939 contain rubber-insulated wiring that is now 85 to 108 years old, 5-amp round pin sockets, and fuse boards without RCD protection. This guide covers rubber insulation degradation, the specific hazards of interwar wiring, WWII-era property issues, and rewire costs of £2,800 to £9,000."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Interwar Property Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Complete Interwar Property EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
