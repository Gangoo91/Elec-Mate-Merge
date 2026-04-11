import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Home,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  Lightbulb,
  Shovel,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Shed Electrical Installation', href: '/guides/shed-electrical-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'planning', label: 'Planning and Regulations' },
  { id: 'supply-options', label: 'Supply Options' },
  { id: 'cable-selection', label: 'Cable Selection and Routing' },
  { id: 'sub-panel', label: 'Sub-Panel Installation' },
  { id: 'lighting-sockets', label: 'Lighting and Sockets' },
  { id: 'earthing', label: 'Earthing Arrangements' },
  { id: 'testing', label: 'Testing and Certification' },
  { id: 'tools-materials', label: 'Tools and Materials' },
  { id: 'costs', label: 'Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Shed electrical installations are notifiable under Part P of the Building Regulations because the work involves a new circuit in a special location (outside the main dwelling). You must either be registered with a competent person scheme (NICEIC, NAPIT, etc.) or apply to Building Control before starting work.',
  'SWA (Steel Wire Armoured) cable is the standard choice for the underground run from the house to the shed. It must be buried at a minimum depth of 500mm (or 450mm under a hard surface) with warning tape above.',
  'The shed requires its own sub-panel (consumer unit) with appropriate overcurrent and RCD protection. An RCBO board is the simplest approach for a small outbuilding.',
  'Earthing in the shed depends on the supply type: TN-C-S (PME) supplies require a risk assessment before extending to an outbuilding — an earth rod (TT arrangement) at the shed is often the safer option.',
  'IP ratings matter in sheds — accessories should be IP44 minimum for non-insulated sheds. Weatherproof enclosures (IP65+) are required for consumer units in damp or dusty locations.',
];

const faqs = [
  {
    question: 'Do I need an electrician to wire a shed in the UK?',
    answer:
      'If the shed is being supplied from the house via a new circuit, the work is notifiable under Part P of the Building Regulations. This means it must either be carried out by an electrician registered with a competent person scheme (such as NICEIC, NAPIT, or ELECSA) or you must apply to your local Building Control before starting work. A registered electrician can self-certify the work and issue the necessary Electrical Installation Certificate (EIC). If you do the work yourself without notification, you risk a fine, difficulty selling the property, and an uninsured installation that may not meet safety standards.',
  },
  {
    question: 'What cable do I need to run electricity to a shed?',
    answer:
      'SWA (Steel Wire Armoured) cable is the standard choice for an underground run from the house to the shed. The most common size for a domestic shed is 2.5mm² or 4.0mm² SWA, depending on the load and cable length. For runs up to about 20 metres with a 20A circuit, 2.5mm² three-core SWA is usually adequate. For longer runs or higher loads (e.g. a workshop with power tools), 4.0mm² or 6.0mm² may be needed to keep voltage drop within limits. The SWA cable must be buried at a minimum depth of 500mm (or 450mm under a hard surface such as a patio) and protected with underground cable warning tape laid approximately 150mm above it.',
  },
  {
    question: 'Can I extend the PME (TN-C-S) earth to my shed?',
    answer:
      'You can, but it requires a documented risk assessment. BS 7671 Regulation 9.2 warns that extending a PME earth to an outbuilding can present a risk if the PEN conductor is lost — this could put a dangerous voltage on all exposed metalwork in the shed. For sheds with significant metalwork (metal-clad sheds, metal workbenches) or where livestock or people may be in prolonged contact with earthed metalwork, a TT earthing arrangement with a local earth rod at the shed is usually the safer option. The earth rod must be tested (target value below 200 ohms, ideally below 100 ohms) and the circuit must be RCD protected (30mA for socket outlets, 100mA or 300mA for the sub-main depending on design).',
  },
  {
    question: 'What IP rating do I need for accessories in a shed?',
    answer:
      'It depends on the shed construction. A well-insulated, lined shed with a solid door can use standard domestic accessories (IP20). An unlined timber shed, which is more prone to dust and moisture ingress, should have accessories rated IP44 minimum. The consumer unit in any shed should be at least IP44 if the environment is dusty, or IP65 if there is any risk of water ingress (for example, near the door in a shed without guttering). Metal-clad switches and sockets rated IP44 are widely available and a practical choice for most sheds.',
  },
  {
    question: 'How deep should the cable trench be for a shed?',
    answer:
      'The minimum burial depth for SWA cable in a domestic garden is 500mm (approximately 20 inches). If the cable passes under a hard surface such as a patio, driveway, or path, the minimum depth is 450mm. The cable should be laid on a 50mm bed of sand at the bottom of the trench, with another 50mm of sand over the top of the cable before backfilling. Yellow/black underground cable warning tape must be laid approximately 150mm above the cable. If the cable passes through a wall (house or shed), it must enter through a gland and be properly sealed to prevent water ingress.',
  },
  {
    question: 'How much does it cost to get electricity to a shed in the UK?',
    answer:
      'A basic shed electrical installation — SWA cable run up to 15 metres, small consumer unit, two double sockets and two light points — typically costs between £400 and £800 including materials, labour, and certification. A more comprehensive installation for a workshop shed — longer cable run, larger consumer unit, multiple socket circuits, dedicated power tool circuit, external security light — can cost £800 to £1,200. Costs increase significantly if the trench route is long, crosses hard landscaping that needs reinstating, or if the shed requires a TT earth rod installation. These prices include the EIC but exclude any remedial work needed at the house consumer unit (e.g. adding a spare way or upgrading to accommodate the new circuit).',
  },
  {
    question: 'Do I need a separate consumer unit in the shed?',
    answer:
      'Yes. BS 7671 requires that the shed has local isolation and its own overcurrent and RCD protection. A small consumer unit (4 to 6 way) or an enclosed isolator with RCBOs is the standard approach. The consumer unit provides local isolation so the shed circuits can be switched off independently, local RCD protection for personal safety, overcurrent protection for each final circuit in the shed, and a clear point of isolation for anyone working on the shed electrics. The sub-panel in the shed is fed from a dedicated way in the house consumer unit, protected by an MCB or RCBO sized for the SWA cable.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size SWA cable for shed supply runs with automatic voltage drop and derating calculations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on long runs from house to shed — critical for SWA sizing.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for shed installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description:
      'Price shed electrical installations with itemised materials, labour, and certification.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'Often combined with shed or garage wiring — run the EV charger circuit alongside the outbuilding supply.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with modules covering outbuilding installations and TT earthing.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Shed Electrical Installation: What You Need to Know',
    content: (
      <>
        <p>
          Running electricity to a garden shed is one of the most common domestic electrical jobs in
          the UK. Whether the customer wants a few lights and sockets for a hobby workshop, a home
          office, or a fully kitted-out man cave, the electrical principles are the same: get the
          cable from the house to the shed safely, install a local sub-panel with RCD protection,
          wire the final circuits, test, and certify.
        </p>
        <p>
          This guide covers the complete process from planning through to certification, including
          cable selection, trench requirements, earthing options, IP ratings, and the Part P
          notification requirements. It is written for qualified electricians carrying out the work
          and for homeowners researching what is involved before getting quotes.
        </p>
        <p>
          The work is notifiable under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          because it involves a new circuit in a location outside the main dwelling. A registered
          electrician can self-certify and issue an{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'planning',
    heading: 'Planning and Regulations',
    content: (
      <>
        <p>
          Before any physical work begins, the installation must be planned and the regulatory
          requirements understood. The key considerations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — shed electrical installations are notifiable
                work. The electrician must be registered with a competent person scheme (NICEIC,
                NAPIT, ELECSA, etc.) to self-certify, or the homeowner must apply to Building
                Control before work starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site survey</strong> — assess the cable route from house to shed. Identify
                any obstacles (patios, paths, tree roots, drainage runs) and measure the distance.
                Check the house consumer unit for spare ways and capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load assessment</strong> — determine what the customer wants in the shed
                (lights, sockets, heating, power tools, EV charger). This drives the cable size,
                circuit design, and consumer unit specification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing assessment</strong> — check the supply type (TN-C-S, TN-S, TT) and
                decide whether to extend the existing earth or install a local earth rod at the
                shed. This is a critical safety decision covered in detail below.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'supply-options',
    heading: 'Supply Options: Sub-Main from the House',
    content: (
      <>
        <p>
          The shed is supplied from the house via a sub-main cable. This cable is protected at the
          house end by a dedicated MCB or RCBO in the house consumer unit (or a separate switch-fuse
          if there are no spare ways). At the shed end, it terminates in a local consumer unit or
          distribution board.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Small Shed (Lighting + Sockets)</h3>
            <p className="text-white text-sm leading-relaxed">
              For a basic installation — two or three light points and a couple of double socket
              outlets — a 20A or 32A circuit from the house is sufficient. Use 2.5mm² or 4.0mm² SWA
              cable depending on run length. A 4-way consumer unit in the shed with RCBOs is the
              simplest approach.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Workshop Shed (Power Tools)</h3>
            <p className="text-white text-sm leading-relaxed">
              For a workshop with power tools (table saw, welder, compressor), a larger sub-main is
              needed. A 40A or 50A circuit with 6.0mm² or 10.0mm² SWA cable provides headroom for
              high-demand equipment. A 6-way or 8-way consumer unit allows separate circuits for
              lighting, sockets, and dedicated appliances.
            </p>
          </div>
        </div>
        <p>
          The sub-main cable must be sized for the maximum demand at the shed, accounting for
          voltage drop over the cable run. Use the{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          to determine the correct cable size for the run length and load.
        </p>
      </>
    ),
  },
  {
    id: 'cable-selection',
    heading: 'Cable Selection and Routing',
    content: (
      <>
        <p>
          SWA (Steel Wire Armoured) cable is the standard choice for the underground run from house
          to shed. The steel wire armouring provides mechanical protection and, in TN-S or TT
          installations, can serve as the circuit protective conductor (CPC). The key requirements
          are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burial depth</strong> — minimum 500mm in a garden, 450mm under a hard
                surface (patio, path). Lay the cable on a 50mm sand bed with 50mm of sand cover
                above.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning tape</strong> — yellow/black underground cable warning tape must be
                laid approximately 150mm above the cable to warn anyone digging in the future.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wall entries</strong> — the cable must pass through the house wall and shed
                wall using SWA glands. Seal both entries to prevent water ingress. Use ducting
                through walls where possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — size for the load, accounting for voltage drop (max
                5% from origin to furthest point, though 3% is the practical target for sub-mains).
                For a 20A circuit at 25m, 2.5mm² SWA is typically adequate. For 32A at 25m, use
                4.0mm² minimum.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If an underground route is not practical (e.g. across a courtyard with existing hard
          landscaping), the SWA cable can be run overhead on a catenary wire at a minimum height of
          3.5m (or 5.2m if vehicles pass underneath). However, underground is the preferred and more
          common approach for domestic sheds.
        </p>
      </>
    ),
  },
  {
    id: 'sub-panel',
    heading: 'Sub-Panel Installation in the Shed',
    content: (
      <>
        <p>
          The shed must have its own consumer unit or distribution board providing local isolation,
          overcurrent protection, and RCD protection. The consumer unit must comply with current
          regulations regarding enclosure type:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Consumer Unit Enclosure</h4>
              <p className="text-white text-sm leading-relaxed">
                Amendment 3 to BS 7671 requires consumer units to be either non-combustible (metal)
                or mounted on a non-combustible surface. In an outbuilding, a documented risk
                assessment may support the use of a non-ferrous (plastic IP65) enclosure to reduce
                corrosion risk — particularly in damp environments. This risk assessment must be
                appended to the Electrical Installation Certificate. Without a documented risk
                assessment, use a metal consumer unit on a non-combustible backboard.
              </p>
            </div>
          </div>
        </div>
        <p>
          A typical small shed installation uses a 4-way or 6-way RCBO board. This provides
          individual RCD and overcurrent protection for each circuit without the complexity of split
          RCD boards. Wire the incoming SWA through an appropriate gland into the consumer unit, and
          distribute to the final circuits: lighting, sockets, and any dedicated appliance circuits.
        </p>
      </>
    ),
  },
  {
    id: 'lighting-sockets',
    heading: 'Lighting and Socket Layout',
    content: (
      <>
        <p>
          The lighting and socket layout depends on the shed size and intended use. Common
          configurations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting</strong> — LED battens or bulkhead fittings are practical for
                sheds. For a workshop, aim for 300 to 500 lux at bench height. A 6W to 10W LED
                batten per square metre of bench area is a reasonable rule of thumb. Include a
                switch at the door. For larger sheds, add an external PIR-controlled bulkhead for
                security.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlets</strong> — position sockets at bench height (approximately
                1100mm) for workshop use, or at standard height (300mm to 450mm) for general use. A
                minimum of two double socket outlets is recommended even for small sheds. For
                workshops, four to six doubles positioned around the workspace avoids trailing
                extension leads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuits</strong> — if the customer has specific high-power
                equipment (welder, table saw, compressor), provide dedicated radial circuits from
                the sub-panel rather than relying on socket outlets. This prevents nuisance tripping
                and provides correct overcurrent protection for the equipment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All socket outlet circuits in the shed must be 30mA RCD protected. IP ratings for
          accessories should match the environment — IP20 for a dry, lined shed; IP44 minimum for an
          unlined or poorly sealed shed; IP65 for outdoor accessories.
        </p>
      </>
    ),
  },
  {
    id: 'earthing',
    heading: 'Earthing Arrangements: PME vs Earth Rod',
    content: (
      <>
        <p>
          The earthing arrangement for the shed is one of the most important design decisions. The
          options depend on the supply type at the house:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">TN-C-S (PME) Supply</h3>
            <p className="text-white text-sm leading-relaxed">
              Most UK homes have a PME supply. Extending the PME earth to an outbuilding introduces
              a risk: if the PEN conductor is lost, the neutral-to-earth voltage can appear on all
              exposed metalwork in the shed. BS 7671 Regulation 9.2 requires a risk assessment. For
              sheds with significant metalwork (metal-clad sheds, metal workbenches, metal water
              pipes), installing a local earth rod at the shed (creating a TT arrangement for the
              outbuilding) is the safer choice. The earth rod must achieve an acceptable resistance
              (below 200 ohms) and the circuit must be RCD protected.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">TN-S or TT Supply</h3>
            <p className="text-white text-sm leading-relaxed">
              If the house has a TN-S (earth provided by the DNO cable sheath) or TT (earth rod at
              the house) supply, the earth can be extended to the shed via the SWA armouring and a
              separate CPC within the cable. For TT supplies, an additional earth rod at the shed
              may improve the earth fault loop impedance and disconnection times, but is not always
              necessary if the main earth rod value is adequate.
            </p>
          </div>
        </div>
        <p>
          Whatever the arrangement, the earthing must be tested during commissioning. Record the
          earth electrode resistance (if applicable) and the earth fault loop impedance at the
          furthest point of every circuit in the shed on the EIC schedule of test results.
        </p>
      </>
    ),
  },
  {
    id: 'testing',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          The shed installation must be fully tested and an{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          issued before the installation is energised. The scope of testing includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Continuity of protective conductors (ring final circuits and radials)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Continuity of ring final circuit conductors (if ring circuits are used)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Insulation resistance (500V DC, minimum 1 megohm between L-N, L-E, and N-E)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Polarity at all termination points</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Earth electrode resistance (if a TT earth rod is installed at the shed)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Earth fault loop impedance (Zs) on every circuit</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>RCD operation (30mA, trip time within 300ms at rated current, 40ms at 5x)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Prospective fault current (PSCC) at the origin of the shed installation</span>
            </li>
          </ul>
        </div>
        <p>
          The EIC must be issued for the new circuits and the sub-main. If a competent person scheme
          member carries out the work, the certificate is self-certified and notified to Building
          Control through the scheme. The homeowner should receive a copy for their records.
        </p>
      </>
    ),
  },
  {
    id: 'tools-materials',
    heading: 'Tools and Materials Checklist',
    content: (
      <>
        <p>
          Based on practical work intelligence data, the following tools and materials are typically
          required for a shed electrical installation:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Tools Required</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Insulated screwdriver set</li>
              <li>Torque screwdriver (for consumer unit connections)</li>
              <li>SWA cable cutters and strippers</li>
              <li>SWA gland kit and gland wrench</li>
              <li>Drill and masonry bits (wall entries)</li>
              <li>Shovel or mini-digger (for trenching)</li>
              <li>Cable drum cart</li>
              <li>Multimeter and continuity tester</li>
              <li>Insulation resistance tester (500V)</li>
              <li>Earth fault loop impedance tester</li>
              <li>RCD tester</li>
              <li>Crimping tool and ferrule kit</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Materials Required</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>SWA cable (2.5mm² to 10.0mm² depending on load)</li>
              <li>Underground ducting and warning tape</li>
              <li>Sand for cable bed (50mm above and below)</li>
              <li>SWA glands (house end and shed end)</li>
              <li>Consumer unit (IP44/IP65, non-combustible enclosure)</li>
              <li>MCBs or RCBOs for each circuit</li>
              <li>Non-combustible backboard (if metal CU required)</li>
              <li>Twin and earth cable for final circuits (1.0mm², 1.5mm², 2.5mm²)</li>
              <li>Switches, socket outlets (IP rated as needed)</li>
              <li>LED light fittings (battens or bulkheads)</li>
              <li>Earth rod and clamp (if TT arrangement)</li>
              <li>Cable clips, trunking, and conduit as needed</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Costs (2026 UK Pricing)',
    content: (
      <>
        <p>
          Shed electrical installation costs vary depending on the cable run length, shed size, and
          specification. The following are realistic 2026 UK prices including materials, labour, and
          certification:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic shed (up to 15m run)</strong> — 2 light points, 2 double sockets,
                4-way RCBO board: £400 to £700.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard shed (15m to 25m run)</strong> — 3 light points, 4 double sockets,
                external light, 6-way board: £700 to £1,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workshop shed (25m+ run)</strong> — full lighting, 6+ double sockets,
                dedicated power circuit, heating, earth rod: £1,000 to £1,200+.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Add-ons</strong> — earth rod installation: £80 to £150. Trench through patio
                or hard landscaping: £150 to £400 for reinstatement. Consumer unit upgrade at house
                (if no spare ways): £300 to £500.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting and Delivering Shed Installations',
    content: (
      <>
        <p>
          Shed electrical installations are bread-and-butter domestic work with good margins. A
          typical job takes half a day to a full day depending on the trench length and
          specification. The key to profitability is an accurate site survey, correct cable sizing
          on the first visit, and efficient on-site execution.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing on the Survey</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to determine the SWA size while you are on site. Measure the run, estimate the
                  load, and get the cable size confirmed before you quote. No more guessing and
                  over-ordering.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price the job with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . SWA cable, glands, consumer unit, accessories, labour, trench work, testing, and
                  certification — all itemised with your margins. Send a professional PDF quote from
                  the survey.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate on site after testing. AI board
                  scanning, voice test entry, and instant PDF export. Send the certificate to the
                  homeowner before you leave the job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify shed electrics"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. Everything you need for outbuilding installations. 7-day free trial."
          icon={Home}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ShedElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="Shed Electrical Installation | Complete Wiring Guide UK"
      description="Complete guide to shed electrical installation in the UK. SWA cable selection, sub-panel installation, lighting and sockets, IP ratings, Part P notification, earthing options, and step-by-step wiring approach with 2026 pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Shed Electrical Installation:{' '}
          <span className="text-yellow-400">Complete Wiring Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Everything you need to know about running electricity to a garden shed — SWA cable selection, sub-panel design, lighting and socket layout, earthing options (PME vs earth rod), IP ratings, Part P notification, and realistic 2026 pricing."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Shed Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify Shed Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certificates for outbuilding installations. 7-day free trial, cancel anytime."
    />
  );
}
