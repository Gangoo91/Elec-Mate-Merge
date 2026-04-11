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
  { label: 'Edwardian House Electrical Guide', href: '/edwardian-house-electrical' },
];

const tocItems = [
  { id: 'edwardian-overview', label: 'Edwardian Properties Overview' },
  { id: 'wiring-hazards', label: 'Edwardian Wiring Hazards' },
  { id: 'early-consumer-units', label: 'Early Consumer Units' },
  { id: 'renovation-considerations', label: 'Renovation Considerations' },
  { id: 'larger-rooms', label: 'Larger Rooms and Circuits' },
  { id: 'rewire-costs', label: 'Rewire Costs 2026' },
  { id: 'eicr-findings', label: 'Typical EICR Findings' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Edwardian properties (1901–1910) were built during the early years of domestic electricity supply. Wiring installed in this era used rubber insulation that is now over 115 years old — well beyond any safe service life.',
  'Edwardian houses are typically larger than Victorian terraces, with more generous room sizes and higher ceilings. This means more circuits, more cable runs, and higher rewire costs than a comparably-sized Victorian property.',
  'Early Edwardian consumer units often used rewirable fuses in wooden or Bakelite enclosures. These cannot accept modern RCD protection and present a fire risk if the fuse wire has been incorrectly replaced.',
  'Edwardian properties frequently have elaborate plasterwork — deep cornice, ceiling roses, and decorative dados — which must be carefully preserved during any rewiring work.',
  'A full rewire of an Edwardian semi-detached or detached house typically costs £4,500 to £9,000 depending on size, specification, and location.',
];

const faqs = [
  {
    question: 'What years does the Edwardian period cover for electrical purposes?',
    answer:
      'The Edwardian era spans 1901 to 1910. For electrical purposes, properties built between 1901 and approximately 1920 share very similar characteristics — all predate the widespread adoption of standardised ring final circuits (introduced in 1947) and modern earthing arrangements. Wiring from this entire period uses rubber insulation that is now over a century old.',
  },
  {
    question: 'How is Edwardian wiring different from Victorian wiring?',
    answer:
      'The wiring types are broadly similar — rubber-insulated cables, lead-sheathed cables, and in some cases early knob-and-tube systems. The key difference is that Edwardian houses tend to be larger, with more room to rewire, better ceiling void access between floors, and often a purpose-built cellar or basement that provides cable access. Edwardian properties also more commonly had electricity installed from new rather than converted from gas, so the original installation may be slightly more coherent — though no less hazardous after a century of use.',
  },
  {
    question: 'Is there asbestos in Edwardian house wiring?',
    answer:
      'Asbestos was used as an electrical insulation material in some early 20th century installations, particularly in consumer units, switchgear, and around cables in high-temperature locations such as near boilers. If your Edwardian property has not been surveyed for asbestos, commission a survey before any electrical work begins. Disturbing asbestos-containing materials without proper precautions is illegal and extremely hazardous to health. An asbestos survey typically costs £200 to £500.',
  },
  {
    question: 'Can I add sockets to an Edwardian house without a full rewire?',
    answer:
      'Adding sockets to an Edwardian house without rewiring the existing circuits is possible in principle but problematic in practice. Any new circuit must be properly earthed and RCD-protected under BS 7671. Connecting new circuits to an original consumer unit with rewirable fuses is not acceptable. Typically, the practical solution is to install a new consumer unit and run new circuits for the areas requiring additional sockets, leaving the existing wiring in place temporarily until a full rewire is carried out.',
  },
  {
    question: 'Will an Edwardian house fail an EICR?',
    answer:
      'An unmodernised Edwardian house will almost certainly receive an Unsatisfactory EICR outcome. The most common C1 and C2 observations in Edwardian properties include absence of earth conductors, deteriorated rubber insulation, inadequate overcurrent protection (rewirable fuses), absence of RCD protection on socket circuits, and inadequate earthing and bonding arrangements. The EICR will specify what remedial work is required and within what timescale.',
  },
  {
    question: 'How long does a rewire of an Edwardian house take?',
    answer:
      'An Edwardian semi-detached house typically takes 7 to 12 working days to rewire. Detached Edwardian properties with more rooms and larger floor areas may take 2 to 3 weeks. Solid brick external walls (Edwardian construction is overwhelmingly solid masonry) add time compared to modern properties. The property is usually habitable during the rewire, with power isolated to the area being worked on.',
  },
  {
    question: 'Do I need building regulations approval for rewiring an Edwardian house?',
    answer:
      'Yes. Electrical work in dwellings in England and Wales is notifiable work under Part P of the Building Regulations. A registered electrician (NICEIC, NAPIT, ELECSA, or similar competent person scheme member) can self-certify their work without requiring a separate building control application. If the electrician is not scheme-registered, you must submit a building notice to the local authority before work begins. Always ask your electrician to confirm how Building Regulations notification will be handled.',
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
    href: '/period-property-electrical',
    title: 'Period Property Electrical Guide',
    description:
      'General guide covering all pre-1966 properties — survey checklist and EICR importance.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/listed-building-electrical',
    title: 'Listed Building Electrical Guide',
    description:
      'Rewiring Grade I and II listed Edwardian properties — consent, conservation, and sympathetic installation.',
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
    id: 'edwardian-overview',
    heading: 'Edwardian Properties and Domestic Electricity',
    content: (
      <>
        <p>
          The Edwardian era (1901–1910) coincided with the rapid expansion of domestic electricity
          supply across UK towns and cities. Many Edwardian properties were built with electricity
          from new, making them among the first generation of homes designed around electric
          lighting rather than gas. The wiring systems installed during this period were, however,
          primitive by modern standards — and those that survive unreplaced today are over 115 years
          old.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Property characteristics</strong> — Edwardian houses are typically larger
                than their Victorian counterparts, with more generous room proportions, higher
                ceilings (often 2.7m to 3.0m on ground floor), bay windows, and larger gardens.
                Semi-detached and detached forms are more common than in the Victorian era, though
                terraced Edwardian housing is also widespread in urban areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Original electrical specification</strong> — most Edwardian properties were
                originally wired for lighting only, with power circuits added later. The lighting
                circuits used single-pole switches (no neutral at the switch) and round-pin
                lampholder fittings. Power circuits, if installed at all, used 5A or 15A round pin
                sockets. Many properties had their power circuits added during the 1920s to 1950s.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Renovation activity</strong> — Edwardian properties are popular renovation
                targets due to their size and period character. This means that many have had
                partial electrical work carried out at various points, creating a mixture of old and
                new wiring within a single installation. Mixed-age installations can be more
                difficult to assess than entirely original ones.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wiring-hazards',
    heading: 'Edwardian-Era Wiring Hazards',
    content: (
      <>
        <p>
          The wiring hazards present in Edwardian properties are broadly similar to those in
          Victorian properties, but with some specific characteristics reflecting the slightly later
          construction date and the rapid development of electrical technology during the early 20th
          century.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vulcanised India Rubber (VIR) insulation</strong> — the most common cable
                type in Edwardian properties. VIR insulation becomes brittle and cracks with age,
                particularly where cables pass over hot water pipes, are exposed to direct sunlight
                in roof spaces, or have been subjected to vibration. Cracked insulation allows
                conductors to contact each other or earthed metalwork, creating a risk of shock,
                fire, or both.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absence of earthing</strong> — Edwardian wiring systems often have no
                protective earth conductor, or earthing that is provided via the metal conduit
                rather than a dedicated conductor. Conduit earthing is only reliable if all conduit
                joints are mechanically sound and electrically continuous — after a century of use,
                this cannot be assumed. A missing or inadequate earth is a C1 or C2 observation
                under BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>DIY additions</strong> — decades of DIY electrical work by successive owners
                are a common hazard in Edwardian properties. Additions made without professional
                oversight may include incorrect cable types, inadequate connections, missing earth
                conductors, and circuits connected to an already overloaded installation. These
                additions are sometimes identified during an EICR when fittings are opened and
                inspected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate bonding</strong> — Edwardian properties with original pipework
                (lead or early copper water pipes) frequently lack the main equipotential bonding
                required by BS 7671 Regulation 411.3.1.2. Bonding clamps on gas and water services
                are often absent or corroded. This is a common C2 finding on Edwardian property
                EICRs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'early-consumer-units',
    heading: 'Early Consumer Units in Edwardian Properties',
    content: (
      <>
        <p>
          Edwardian properties that have had some electrical updating typically have a consumer unit
          installed between the 1940s and 1970s. Earlier properties may still have original
          switchboards with rewirable fuses in wooden or Bakelite enclosures. Neither is acceptable
          under modern standards.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wooden switchboards</strong> — the very earliest Edwardian consumer units
                were wooden boards with ceramic fuse holders and knife switches. Wood is combustible
                and offers no protection against arcing. These installations are immediately
                dangerous if still in use and should be replaced without delay.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bakelite consumer units</strong> — Bakelite (an early thermosetting plastic)
                was used for consumer unit enclosures from the 1920s through to the 1960s. Bakelite
                is brittle and combustible under sustained arcing conditions. A modern
                non-combustible metal-clad consumer unit is required under BS 7671 Amendment 3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuses</strong> — fuse boards with rewirable fuse wire provide no
                RCD protection and are prone to incorrect reinstatement after operation. If the fuse
                wire has been replaced with a thicker wire or other conductor, the circuit has
                effectively no overcurrent protection. Consumer units with rewirable fuses are
                recorded as a C2 observation in most EICR inspections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Replacing a consumer unit in an Edwardian property typically costs £450 to £950 including
          materials and labour. This provides modern RCD protection and MCB-based overcurrent
          protection but does not address the condition of the existing wiring. Where the wiring is
          original or of unknown age, the electrician should confirm it is adequate before
          connecting it to a new consumer unit.
        </p>
      </>
    ),
  },
  {
    id: 'renovation-considerations',
    heading: 'Renovation Considerations for Edwardian Properties',
    content: (
      <>
        <p>
          Edwardian properties are frequently purchased for renovation. A full renovation —
          including new kitchen, bathrooms, and redecoration — provides the ideal opportunity to
          rewire the property at minimum additional disruption, since walls and floors will be open
          and decorated surfaces will be replaced regardless.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>First fix before plastering</strong> — in a full renovation, the electrical
                first fix (consumer unit position, cable routes, back boxes) is completed before
                plastering. This is the most cost-effective time to upgrade the electrical
                installation, as no existing decoration or plasterwork needs to be disturbed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plan the socket layout</strong> — Edwardian properties were designed when
                appliances were few. A modern renovation should include sufficient double sockets in
                every room (recommended: 6 to 8 in a kitchen, 4 to 6 in a living room, 4 in each
                bedroom), plus dedicated circuits for the oven, hob, shower, and any EV charger.
                Planning the layout at the first fix stage avoids expensive additions later.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data and AV infrastructure</strong> — Edwardian properties being renovated
                for modern living increasingly include cat6 data cabling, CCTV, and home automation.
                These are most economically installed during a rewire when floors and walls are
                already open. Ensure the electrician's scope includes data infrastructure if
                required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging and renewables</strong> — the consumer unit specified for an
                Edwardian renovation should include capacity for future EV charging circuits, solar
                PV feed, and battery storage connection. A larger consumer unit (24-way rather than
                18-way) costs minimally more but provides significant future flexibility.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'larger-rooms',
    heading: 'Larger Rooms and Circuit Requirements',
    content: (
      <>
        <p>
          Edwardian properties tend to have larger room dimensions than Victorian equivalents of the
          same period. A typical Edwardian reception room may be 4.5m × 5m or larger, compared to
          3.5m × 4m in a Victorian terrace. This has practical implications for the number of
          sockets and lighting points required on each circuit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting circuits</strong> — larger rooms with high ceilings require more
                lighting points. Edwardian properties often have elaborate ceiling roses at the
                centre of each room plus supplementary wall lighting positions. A ground-floor
                reception room may need 4 to 6 independently switched lighting circuits for modern
                living.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ring final circuits</strong> — a standard ring final circuit can serve a
                floor area of up to 100m² under BS 7671. Large Edwardian houses may have individual
                floor areas that approach or exceed this, requiring additional ring circuits or
                spurs to ensure adequate socket provision without overloading any single circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen circuits</strong> — a large Edwardian kitchen requires a dedicated
                circuit for the oven, a dedicated circuit for the hob (if induction), a circuit for
                the dishwasher, a circuit for the washing machine and dryer, and a ring final
                circuit for worktop sockets. Five dedicated kitchen circuits is not unusual in a
                large Edwardian renovation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rewire-costs',
    heading: 'Rewire Costs for Edwardian Houses (2026)',
    content: (
      <>
        <p>
          Edwardian house rewire costs are typically 10 to 20 per cent higher than equivalent
          Victorian properties, reflecting the larger room sizes and greater cable lengths involved.
          The following are typical costs for a full rewire including consumer unit, all circuits,
          sockets, switches, and lighting points.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom Edwardian terrace</strong> — £4,500 to £7,500. Solid masonry
                walls and larger room sizes add time. London properties typically 20 to 30 per cent
                higher.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom Edwardian semi-detached</strong> — £6,000 to £9,500. Common
                configuration. Detached equivalents add 10 to 15 per cent due to additional external
                wall cable routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Five or six-bedroom Edwardian detached</strong> — £8,500 to £14,000+. Large
                detached Edwardian properties with original features, multiple reception rooms, and
                full-height basements at the upper end of this range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Making good (plastering)</strong> — typically £800 to £2,500 in addition to
                the electrical cost, depending on the extent of chasing and whether lime or modern
                plaster finish is used.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always obtain a written, itemised quote specifying the number of circuits, sockets,
          lighting points, and the consumer unit specification. Vague quotes make it difficult to
          compare between electricians and may lead to disputes over scope during the job.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-findings',
    heading: 'Typical EICR Findings in Edwardian Properties',
    content: (
      <>
        <p>
          An <SEOInternalLink href="/guides/eicr-observation-codes-explained">EICR</SEOInternalLink>{' '}
          on an Edwardian property will typically produce a range of observations. The following are
          the most commonly encountered findings in unmodernised or partially modernised Edwardian
          installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Deteriorated insulation</strong> — rubber or VIR cable insulation has
                degraded to the point where it poses a potential risk. The inspector will note
                specific locations where deterioration is observed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Absence of RCD protection</strong> — no RCD protection on socket-outlet
                circuits as required by Regulation 411.3.3. This is almost universal in Edwardian
                properties with original or early-replacement consumer units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — No protective earth</strong> — earth conductors absent from some or all
                circuits. Particularly common in the original lighting circuits which were installed
                before protective earthing was standardised.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Insufficient socket outlets</strong> — where the number of accessible
                socket outlets is so low that the use of extension leads and adaptors is clearly
                necessary. A C3 is a recommendation rather than a requirement, but inadequate
                sockets increase the risk of overloaded extension leads.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Edwardian House Rewire Work',
    content: (
      <>
        <p>
          Edwardian house rewires are high-value, multi-day jobs that require careful planning and
          good client communication. The combination of aged wiring, period features, and often
          partially modernised installations means that thorough pre-work assessment is essential to
          avoid mid-job scope changes.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Document Everything Before You Start</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to carry out a full inspection before the rewire begins. Photographing original
                  switchboards, cable conditions, and earth arrangements protects you and gives the
                  client a clear understanding of the original state of the installation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Professionally, Win More Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  Edwardian house rewires are typically quoted at the survey stage. Present a
                  detailed, professional quote using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  on the day of the survey. A thorough quote that specifies circuit numbers, socket
                  counts, and consumer unit specification demonstrates expertise and wins trust with
                  renovation clients.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage Edwardian house rewires with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for pre-rewire EICRs, professional quoting, and job management. AI board scanning, voice test entry, instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EdwardianHouseElectricalPage() {
  return (
    <GuideTemplate
      title="Edwardian House Electrical Guide | Rewiring 1900–1910 Homes UK"
      description="Complete electrical guide for Edwardian houses built 1901–1910. VIR cable hazards, early consumer units, renovation considerations, larger room circuit requirements, and rewire costs £4,500–£9,500 for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Property Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Edwardian House Electrical Guide:{' '}
          <span className="text-yellow-400">Rewiring 1900–1910 Properties</span>
        </>
      }
      heroSubtitle="Edwardian houses built between 1901 and 1910 contain some of the UK's oldest surviving electrical installations. This guide covers the specific wiring hazards, early consumer units, the challenges of rewiring larger Edwardian rooms through solid masonry, and what to expect at renovation — including rewire costs of £4,500 to £9,500."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Edwardian House Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Complete Edwardian Property EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
