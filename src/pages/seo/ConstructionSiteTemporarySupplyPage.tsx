import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  HardHat,
  ShieldCheck,
  AlertTriangle,
  Zap,
  FileCheck2,
  Calculator,
  GraduationCap,
  ClipboardCheck,
  Brain,
  Search,
  Plug,
  Cable,
  Construction,
  Receipt,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Temporary Supply', href: '/guides/construction-site-temporary-supply' },
];

const tocItems = [
  { id: 'bs-7375-overview', label: 'BS 7375 Overview' },
  { id: '110v-cte-supply', label: '110V CTE Supply Explained' },
  { id: 'distribution-boards', label: 'Site Distribution Boards' },
  { id: 'rcd-protection', label: 'RCD Protection Requirements' },
  { id: 'cable-management', label: 'Cable Management on Site' },
  { id: 'testing-temporary', label: 'Testing Temporary Installations' },
  { id: 'common-defects', label: 'Common Defects on Construction Sites' },
  { id: 'for-electricians', label: 'For Electricians on Construction Sites' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7375 (Code of Practice for Distribution of Electricity on Construction and Building Sites) provides guidance on temporary electrical installations, supplementing BS 7671 Section 704.',
  '110V Centre-Tapped Earth (CTE) supply is the standard for portable power tools on UK construction sites — the 55 V to earth voltage significantly reduces the risk of fatal electric shock.',
  'All site distribution boards must be of robust construction, IP-rated for the outdoor environment (minimum IP44), and equipped with 30 mA RCDs on all socket-outlet circuits.',
  'Cable management on construction sites must prevent mechanical damage, tripping hazards, and contact with water — overhead routes, armoured cable, or protected cable routes are required.',
  'Elec-Mate allows electricians to complete EICR certificates for temporary site installations, generate professional reports for principal contractors, and document compliance with CDM regulations.',
];

const faqs = [
  {
    question: 'What is a 110V CTE supply and why is it used on construction sites?',
    answer:
      'A 110V Centre-Tapped Earth (CTE) supply is a reduced-voltage electrical supply system specifically designed for use on construction sites. It uses a step-down transformer that takes the incoming 230V single-phase mains supply and converts it to 110V. The key safety feature is the "centre-tapped earth" arrangement: the secondary winding of the transformer has its centre point connected to earth. This means the maximum voltage between any live conductor and earth is only 55V (half of 110V), rather than 230V. At 55V, the current flowing through a person in the event of a fault is significantly lower than at 230V, and the risk of a fatal electric shock is greatly reduced — though not eliminated entirely. The 110V CTE system is identified by its yellow colour-coding: yellow plugs, yellow sockets, and yellow cables. The transformer is typically housed in a robust metal or GRP enclosure rated for outdoor use. The standard for construction site electrical distribution is BS 7375, which recommends 110V CTE as the standard supply for portable hand tools and temporary lighting on construction sites. BS 7671 Section 704 also applies. The 110V CTE system does not replace the need for RCD protection — 30 mA RCDs must still be provided on all 110V socket-outlet circuits.',
  },
  {
    question: 'Can I use 230V tools on a construction site?',
    answer:
      'The use of 230V portable tools on construction sites is strongly discouraged and is prohibited on most UK construction sites. The Health and Safety Executive (HSE) Guidance Note GS24 and BS 7375 both recommend the use of 110V CTE supply for all portable hand tools. Most principal contractors mandate 110V as a site rule, and the use of 230V portable tools would be a breach of the site health and safety plan. However, there are some situations where 230V is acceptable or necessary on construction sites: fixed equipment (concrete pumps, tower cranes, hoists, site cabins, welfare facilities) is typically supplied at 230V or 400V three-phase because the equipment is fixed in position and not hand-held. Site offices and welfare cabins use 230V for lighting, heating, and socket-outlets — these are treated as temporary buildings and must have 30 mA RCD protection on all circuits. Specialist equipment that is not available in 110V versions may be used at 230V, but only with a specific risk assessment, 30 mA RCD protection, and appropriate isolation arrangements. In all cases where 230V is used on a construction site, additional protective measures must be in place: 30 mA RCDs on all circuits, regular inspection and testing, and a formal risk assessment documenting why 110V is not practicable for the specific application.',
  },
  {
    question: 'What type of distribution board is required on a construction site?',
    answer:
      "Construction site distribution boards must comply with BS 7375 and BS EN 61439-4 (assemblies for construction sites). The key requirements are: robust construction — the enclosure must withstand the mechanical impacts, vibration, and rough handling typical of a construction site. An impact resistance rating of IK08 or higher is recommended. IP rating — a minimum of IP44 for outdoor use, providing protection against solid objects greater than 1mm and splashing water. In particularly wet or exposed locations, IP55 or higher may be required. Socket-outlets — BS EN 60309-2 industrial sockets are the standard for construction sites. Yellow sockets indicate 110V CTE supply, blue sockets indicate 230V single-phase, and red sockets indicate 400V three-phase. All socket-outlet circuits must be protected by 30 mA RCDs. Isolation — each socket-outlet or group of sockets must have individual isolation capability (typically interlocked socket-outlets that cannot be connected or disconnected under load). The main incoming supply must have a lockable isolator for safe isolation during maintenance. Portability — site distribution boards are often portable (trolley-mounted or carry-handle) to allow repositioning as the construction progresses. They must be stable and secure when in use. Cable entries — all cable entries must be via IP-rated cable glands that maintain the enclosure's ingress protection rating. No open knockouts.",
  },
  {
    question: 'How often should a construction site temporary installation be inspected?',
    answer:
      'The recommended inspection interval for construction site temporary electrical installations is 3 months. This is specified in IET Guidance Note 3 (Inspection and Testing) and reflects the harsh environment, high usage rates, and constantly changing nature of construction site installations. In practice, many principal contractors require monthly visual inspections and quarterly full inspections with testing. The HSE Guidance Note GS24 also recommends regular inspection and testing of temporary installations, and the CDM (Construction Design and Management) Regulations require the principal contractor to ensure that all temporary installations are safe and properly maintained throughout the construction phase. In addition to the periodic EICR, the following regular checks should be carried out: daily visual checks of cables, plugs, and sockets by the user (the tradesperson using the equipment); weekly visual inspections by the site electrician or a competent person, checking for damage, water ingress, and correct RCD operation (using the test button); and quarterly full inspection and testing with an EICR issued for the temporary installation. All inspection and test records must be retained and available for inspection by the HSE, the CDM coordinator, and the principal contractor.',
  },
  {
    question: 'What cable types are suitable for construction site temporary wiring?',
    answer:
      'Cable selection for construction site temporary installations must account for the specific hazards: mechanical damage from construction activity, exposure to weather (rain, UV, temperature extremes), contact with water and cement, and vehicle traffic across cable routes. Suitable cable types include: steel wire armoured (SWA) cable — the preferred choice for semi-permanent distribution cables on construction sites. SWA provides mechanical protection, weather resistance, and can be installed on the surface, on cable trays, or buried underground. It is suitable for both 110V and 230V/400V circuits. Arctic-grade flexible cable (BS 6500 / BS EN 50525) — for temporary connections between distribution boards and portable equipment. Arctic-grade cable has a temperature rating suitable for outdoor use in cold conditions (typically -25°C to +60°C) and is more flexible than standard PVC cable in low temperatures. H07RN-F (harmonised rubber) cable — a heavy-duty rubber-sheathed flexible cable designed for use in harsh environments. It is resistant to oil, chemicals, abrasion, and UV degradation. Widely used on construction sites in continental Europe and increasingly specified on UK sites. Standard PVC twin-and-earth cable (6242Y) is not suitable for exposed construction site use because it has no mechanical protection, is not UV-resistant, and becomes brittle in cold temperatures. Extension leads for 110V tools should use yellow Arctic-grade or H07RN-F cable rated for the current demand.',
  },
  {
    question: 'What are the earthing requirements for construction site temporary installations?',
    answer:
      "The earthing requirements for construction site temporary installations are set out in BS 7671 Section 704 and BS 7375. The incoming mains supply to the site is typically TN-S or TN-C-S (PME), provided by the Distribution Network Operator (DNO) via a temporary builder's supply. For the 110V CTE system, the earthing is provided by the centre-tap of the step-down transformer secondary winding — this creates a direct earth connection at the transformer itself. The earth connection must be verified and tested as part of the installation and periodic inspection. For 230V and 400V circuits on site (welfare cabins, fixed plant, tower cranes), the earthing arrangement follows the standard BS 7671 requirements for the supply type. If the supply is PME, additional consideration must be given to the use of PME earthing for temporary buildings — particularly site cabins with metal frames, which may require a TT earth system with earth rods if the DNO restricts PME use. Supplementary bonding may be required in wet areas (site toilets, showers) and around metallic structures (scaffolding, steel-framed buildings during construction). All earthing and bonding connections must be tested for continuity, and the earth fault loop impedance measured at the most distant point of each circuit to verify disconnection times.",
  },
  {
    question: 'What does CDM require for construction site electrical safety?',
    answer:
      'The Construction (Design and Management) Regulations 2015 (CDM 2015) set out the duties of all parties involved in a construction project, including specific requirements for the management of temporary electrical installations. The principal designer must consider electrical safety in the pre-construction information and ensure that the design of the temporary installation is included in the health and safety file. The principal contractor must ensure that the temporary electrical installation is designed, installed, inspected, and maintained by competent persons, that a safe system of work is in place for electrical work on site (including permit-to-work procedures for work on or near live electrical systems), that all portable appliances and tools are inspected and tested (PAT testing) at appropriate intervals, and that records of all electrical inspections, tests, and maintenance are kept on site and available for inspection. Contractors and workers must report any damage to cables, equipment, or distribution boards, use equipment that has been inspected and is in good condition, not use damaged or defective electrical equipment, and follow the site-specific electrical safety rules (typically documented in the construction phase plan). The CDM coordinator (or principal designer under CDM 2015) should ensure that the electrical safety arrangements are documented in the construction phase plan and reviewed at regular intervals throughout the project.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/how-to-do-safe-isolation',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step guide to safe isolation on construction sites and all electrical installations.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description:
      'Step-by-step guide to RCD testing including trip times, test currents, and recording results.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate correct cable sizes for temporary and permanent installations accounting for all derating factors.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/caravan-park-electrical',
    title: 'Caravan Park Electrical',
    description:
      'Similar outdoor distribution challenges — BS 7671 Section 708, TT earthing, and IP-rated equipment.',
    icon: Plug,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition',
    title: '18th Edition Course',
    description:
      'Study for C&G 2382 with 50+ structured training modules including Section 704 (Construction Sites).',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'bs-7375-overview',
    heading: 'BS 7375: The Standard for Construction Site Electrical Distribution',
    content: (
      <>
        <p>
          BS 7375 (Code of Practice for Distribution of Electricity on Construction and Building
          Sites) is the primary guidance document for temporary electrical installations on
          construction sites in the UK. It works alongside{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A2:2022
          </SEOInternalLink>{' '}
          Section 704 (Construction and Demolition Sites), which provides the regulatory framework
          for these installations.
        </p>
        <p>
          Construction sites are among the most electrically hazardous environments in the UK. The
          combination of wet conditions, metallic structures (scaffolding, steel frames), heavy
          machinery, moving plant, and a workforce that includes many non-electrically trained
          operatives creates a uniquely dangerous environment. The temporary electrical installation
          must provide safe and reliable power in these conditions — often for months or years as
          the construction project progresses.
        </p>
        <p>
          The key principles of BS 7375 and Section 704 are: reduced voltage (110V CTE) for portable
          tools and temporary lighting, robust and weatherproof distribution equipment, 30 mA RCD
          protection on all socket-outlet circuits, regular inspection and testing (quarterly EICR),
          and safe isolation procedures for all electrical work. These principles are non-negotiable
          on any UK construction site, and the principal contractor has a legal duty under CDM 2015
          to ensure they are applied.
        </p>
      </>
    ),
  },
  {
    id: '110v-cte-supply',
    heading: '110V Centre-Tapped Earth (CTE): How It Works and Why',
    content: (
      <>
        <p>
          The 110V Centre-Tapped Earth (CTE) supply system is the UK construction industry's primary
          defence against fatal electric shock from portable tools. Understanding how it works — and
          why it is so effective — is essential for every electrician who works on construction
          sites.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The transformer.</strong> A step-down transformer converts the incoming 230V
                single-phase mains supply to 110V. The transformer is typically a 3.3 kVA, 5 kVA, or
                10 kVA unit, housed in a robust yellow enclosure. Larger site transformers (up to 25
                kVA) are available for multiple-outlet distribution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The centre tap.</strong> The secondary winding of the transformer has its
                midpoint (centre) connected to earth. This divides the 110V output into two equal
                halves: 55V from one live conductor to earth, and 55V from the other live conductor
                to earth. The voltage between the two live conductors is 110V (for the tool to
                operate), but the maximum voltage between any live conductor and earth is only 55V.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The safety benefit.</strong> If a worker touches a live conductor while in
                contact with earth (standing on a wet concrete floor, touching scaffolding), the
                maximum voltage driving the shock current is 55V, not 230V. At 55V, the body
                impedance limits the current to a level that is unlikely to cause ventricular
                fibrillation. This does not mean the shock is harmless — it can still cause pain,
                burns, and involuntary muscle contraction — but the risk of a fatal cardiac event is
                dramatically reduced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Colour coding.</strong> 110V CTE equipment is colour-coded yellow —
                transformers, plugs, sockets, cable connectors, and extension leads are all yellow.
                This provides instant visual identification of the reduced-voltage system and
                prevents accidental connection of 110V tools to 230V supplies.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The 110V CTE system is not a substitute for other protective measures — it works alongside
          RCD protection, safe isolation procedures, and regular inspection and testing. It is one
          layer of protection in the defence-in-depth approach to construction site electrical
          safety.
        </p>
      </>
    ),
  },
  {
    id: 'distribution-boards',
    heading: 'Site Distribution Boards: Specification and Layout',
    content: (
      <>
        <p>
          Construction site distribution boards are the backbone of the temporary electrical system.
          They must be robust enough to withstand the construction environment and flexible enough
          to be repositioned as the work progresses.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Construction className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main site distribution board.</strong> The primary distribution point,
                typically connected to the incoming builder's supply (400V three-phase or 230V
                single-phase from the DNO). Houses the main isolator, metering, and outgoing ways
                for sub-distribution boards, site transformers, and fixed plant. Must have a
                lockable main isolator and 30 mA RCDs on all outgoing circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Construction className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-distribution boards.</strong> Smaller distribution boards positioned at
                work locations around the site. Supplied from the main board via SWA cable. Each
                sub-board provides 110V CTE socket-outlets (via built-in or adjacent transformer)
                and 230V sockets for fixed equipment. Must achieve IP44 minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Construction className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Portable distribution units.</strong> Small, trolley-mounted or carry-
                handle distribution units that combine a step-down transformer with multiple 110V
                socket-outlets and integral RCD protection. Ideal for individual work areas and can
                be moved as work progresses through the building.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Construction className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket-outlet types.</strong> Yellow BS EN 60309-2 sockets for 110V CTE (16
                A and 32 A). Blue BS EN 60309-2 sockets for 230V single-phase. Red BS EN 60309-2
                sockets for 400V three-phase. All sockets must be the interlocked type on
                distribution boards (preventing connection/disconnection under load).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Distribution boards must be mounted on stable, level surfaces and protected from vehicle
          traffic. On multi-storey construction sites, temporary distribution boards on each floor
          are supplied via vertical risers from the main board. Each board location must be
          accessible for operation, testing, and emergency isolation.
        </p>
        <SEOAppBridge
          title="AI board scanner for site distribution"
          description="Photograph the site distribution board and let Elec-Mate read the MCB ratings, circuit details, and board layout. The EICR schedule is populated automatically — even for temporary installations with non-standard configurations."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection on Construction Sites',
    content: (
      <>
        <p>
          RCD protection is mandatory on all construction site socket-outlet circuits — both 110V
          CTE and 230V. BS 7671 Regulation 704.410.3.10 requires that every socket-outlet circuit is
          protected by a 30 mA RCD. This applies regardless of the voltage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30 mA RCD on all socket-outlet circuits.</strong> Every socket-outlet
                circuit on a construction site, regardless of voltage, must be protected by a 30 mA
                RCD. This is the last line of defence against electric shock when all other
                protective measures (reduced voltage, earthing, insulation) have failed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD type.</strong> Type A RCDs (detecting both sinusoidal AC and pulsating
                DC fault currents) are the minimum requirement. Type F RCDs should be considered
                where inverter-driven equipment (variable speed drives, battery chargers) is
                connected. Type B RCDs are required for smooth DC fault currents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing frequency.</strong> All RCDs on construction sites should be tested
                using the integral test button daily (by the user), and electrically tested at the
                rated residual operating current quarterly (as part of the periodic EICR).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuisance tripping.</strong> On construction sites, nuisance tripping of RCDs
                is a common problem caused by moisture ingress, damaged cables, and high earth
                leakage from construction equipment. The solution is not to bypass the RCD — it is
                to identify and fix the source of the leakage. Splitting loads across multiple RCDs
                (rather than one RCD protecting many sockets) reduces the impact of nuisance
                tripping.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The RCD is the final layer of protection, not the only layer. On a properly designed
          construction site, multiple layers work together: reduced voltage (110V CTE), earthing and
          bonding, insulation, mechanical protection of cables, and RCD protection. Each layer
          addresses a different failure mode, and the combined effect is a dramatically reduced risk
          of fatal electric shock.
        </p>
      </>
    ),
  },
  {
    id: 'cable-management',
    heading: 'Cable Management: Preventing Damage and Hazards',
    content: (
      <>
        <p>
          Cable management on construction sites is a constant challenge. Cables are subject to
          mechanical damage from construction activity, vehicular traffic, sharp edges, and weather
          exposure. Poor cable management is also a significant tripping hazard. BS 7375 and BS 7671
          Section 704 set out the requirements for cable installation on construction sites.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cable Route Protection</h3>
            <p className="text-white text-sm leading-relaxed">
              Cables on construction sites must be protected from mechanical damage. The preferred
              options are: overhead installation (minimum 2.5 m clear height in pedestrian areas,
              5.8 m above vehicular routes), burial underground (minimum 500 mm depth with cable
              covers), steel wire armoured (SWA) cable for surface runs, and cable ramps or bridges
              for crossing pedestrian and vehicle routes. Standard PVC flex laid on the ground is
              unacceptable — it is a tripping hazard and is easily damaged by construction activity.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Extension Leads and Trailing Cables
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Extension leads for 110V tools should be the shortest practical length, made from
              yellow Arctic-grade or H07RN-F cable, fitted with BS EN 60309-2 plugs and sockets, and
              inspected daily before use. Cables should be fully unwound when in use to prevent
              overheating. Damaged cables must be removed from service immediately — repairs with
              insulation tape are not acceptable. Extension leads should be routed to avoid
              pedestrian walkways and work areas. Where trailing cables must cross walkways, cable
              ramps or bridges must be used.
            </p>
          </div>
        </div>
        <p>
          Cable routes must be reviewed as the construction progresses. A cable route that was safe
          during the groundworks phase may become hazardous during the structural phase when crane
          operations, scaffolding erection, and heavy plant movement change the site dynamics. The
          site electrician should conduct regular route reviews and reposition cables as necessary.
        </p>
      </>
    ),
  },
  {
    id: 'testing-temporary',
    heading: 'Testing Temporary Installations on Construction Sites',
    content: (
      <>
        <p>
          Testing temporary installations on construction sites follows the standard BS 7671 testing
          sequence, with additional attention to the specific requirements of Section 704 and the
          practical challenges of working in a construction environment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection interval: 3 months.</strong> IET Guidance Note 3 recommends a
                maximum inspection interval of 3 months for construction site temporary
                installations. Many principal contractors require monthly visual inspections with
                quarterly full EICR testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance.</strong> Measure Zs at the most distant
                socket-outlet on each circuit. Verify the disconnection time is within the limits
                specified in BS 7671 for the protective device type and rating. For 110V CTE
                circuits, the maximum Zs values are different from 230V circuits — check the tables
                in BS 7671 Appendix 3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance.</strong> Test each circuit with all loads
                disconnected. Construction site circuits may show lower insulation resistance than
                permanent installations due to moisture exposure and cable condition. Investigate
                any reading below 1 megohm before recording the result.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD testing.</strong> Test every 30 mA RCD at 1x and 5x the rated operating
                current. Record the trip time for each. RCDs on construction sites are subject to
                more wear than those in permanent installations and should be tested more
                frequently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection.</strong> Check every distribution board, transformer,
                socket-outlet, cable route, and earth connection. Look for damage from construction
                activity, water ingress, corrosion, and unauthorised modifications. Construction
                site installations change frequently — new circuits added, boards repositioned,
                cables re-routed — and each change should be verified.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR for a construction site temporary installation is issued to the principal
          contractor, who retains it as part of the project health and safety file. The certificate
          should clearly state that the installation is temporary and identify the scope of the
          inspection.
        </p>
      </>
    ),
  },
  {
    id: 'common-defects',
    heading: 'Common Defects Found on Construction Sites',
    content: (
      <>
        <p>
          Construction site temporary installations are subject to constant abuse, modification, and
          environmental exposure. Common defects found during quarterly inspections include:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged cables.</strong> Cables crushed by vehicles, cut by excavation
                machinery, trapped under scaffolding boards, or damaged by sharp edges. Cable
                "repairs" using insulation tape are common and unacceptable — damaged cables must be
                replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water ingress in distribution boards.</strong> Open cable entries (knockouts
                not blanked), cracked enclosures, missing covers, and boards positioned in flood-
                risk locations. Water inside a live distribution board is a C1 (Danger Present)
                defect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCDs bypassed or not functioning.</strong> RCDs taped in the "on" position
                to prevent tripping, RCDs that fail to trip within the required time, or RCDs
                removed entirely from the distribution board. This is a C1 defect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>230V portable tools in use.</strong> Workers using 230V drills, grinders, or
                saws instead of 110V equivalents. Domestic extension leads (white 13 A) used on the
                construction site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unauthorised modifications.</strong> Additional circuits added without
                testing or certification, cable joints made without proper connectors, and
                distribution boards overloaded beyond their rated capacity.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Each defect must be documented with a photograph, a clear description, the correct{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation code
          </SEOInternalLink>
          , and (for C1 defects) a record of the immediate action taken to make the installation
          safe. The EICR is submitted to the principal contractor, who is responsible for ensuring
          remedial work is carried out.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Construction Site Work with Elec-Mate',
    content: (
      <>
        <p>
          Construction site electrical work demands efficiency, robustness, and thorough
          documentation. Quarterly EICR inspections, monthly visual checks, and CDM compliance
          records must be produced consistently and delivered to the principal contractor promptly.
          The electrician who can complete the inspection, produce the certificate, and hand it to
          the site manager on the day of testing wins the repeat contract.
        </p>
        <p>Elec-Mate is designed for exactly this workflow:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Voice Test Entry</h4>
                <p className="text-white text-sm leading-relaxed">
                  Probes in hand, hard hat on, standing next to a distribution board on the third
                  floor of an unfinished building? Speak your results: "Socket circuit 3, Zs 1.2,
                  insulation resistance 200 megohms, RCD trip time 22 milliseconds." Elec-Mate fills
                  in the schedule while you work. No clipboard in the rain.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Defect to Remedial Quote</h4>
                <p className="text-white text-sm leading-relaxed">
                  Found a C1 defect? Document it, classify it, and generate a remedial works quote —
                  materials, labour, margin — all from the app. Hand the site manager the EICR and
                  the remedial quote in the same site visit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">RAMS and Site Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/rams-generator">RAMS generator</SEOInternalLink> to
                  produce risk assessments and method statements for construction site electrical
                  work. Complete CDM-compliant documentation without the paperwork burden.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Construction site work is steady, well-paid, and often leads to the permanent installation
          contract when the building is complete. The electrician who delivers professional
          documentation — on time, every quarter — builds a reputation that wins contracts.
        </p>
        <SEOAppBridge
          title="Site EICRs completed on site, not at a desk"
          description="Join 430+ UK electricians creating professional certificates with voice entry, AI defect coding, and instant PDF delivery. Built for construction site conditions. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConstructionSiteTemporarySupplyPage() {
  return (
    <GuideTemplate
      title="Construction Site Temporary Supply | 110V Guide UK"
      description="Complete guide to construction site temporary electrical supply in the UK. BS 7375, 110V CTE supply, site distribution boards, RCD protection, cable management, and quarterly inspection requirements for temporary installations."
      datePublished="2025-11-12"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Construction Guide"
      badgeIcon={HardHat}
      heroTitle={
        <>
          Construction Site Temporary Supply:{' '}
          <span className="text-yellow-400">The Complete 110V Guide for UK Sites</span>
        </>
      }
      heroSubtitle="Construction site temporary installations must use 110V CTE for portable tools, IP-rated distribution boards, 30 mA RCD protection on every circuit, and quarterly EICR inspections. This guide covers BS 7375, BS 7671 Section 704, and everything electricians need to know about site electrics."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Construction Site Temporary Supply"
      relatedPages={relatedPages}
      ctaHeading="Complete Site EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians creating professional certificates with voice test entry, AI defect coding, and instant PDF delivery. Built for construction site conditions. 7-day free trial, cancel anytime."
    />
  );
}
