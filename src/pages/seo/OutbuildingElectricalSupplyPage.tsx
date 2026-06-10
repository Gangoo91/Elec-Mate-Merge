import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  Calculator,
  ShieldCheck,
  FileText,
  Building2,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Outbuilding Electrical Supply', href: '/guides/outbuilding-electrical-supply-guide' },
];

const tocItems = [
  { id: 'overview', label: 'Outbuilding Supply Options' },
  { id: 'armoured-cable', label: 'Armoured Cable (SWA) Route' },
  { id: 'overhead-cable', label: 'Overhead Cable Route' },
  { id: 'consumer-unit', label: 'Consumer Unit in the Outbuilding' },
  { id: 'earthing', label: 'Earthing — TT System and Earth Electrode' },
  { id: 'rcd-protection', label: 'RCD Protection Requirements' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An outbuilding supply requires a dedicated circuit from the main dwelling consumer unit — either via buried armoured cable (SWA) at 0.5m depth in gardens, or overhead cable at minimum 3.5m clearance (6m over driveways and vehicle movement areas — BS 7671 Reg 709.521.1.8).',
  'Overhead cable spans must account for wind loading and mechanical tension — catenary wire support is required for spans over approximately 3m.',
  'The outbuilding should have its own consumer unit, providing local overcurrent protection, isolation, and RCD protection for all circuits within the outbuilding.',
  'Where the outbuilding supply is a TT system (no metallic earth connection from the main building), an earth electrode is required at the outbuilding and the circuit must be RCD protected.',
  'All outbuilding electrical supplies are notifiable under Part P of the Building Regulations, as they involve a new circuit from the dwelling consumer unit.',
  'BS 7671 Regulation 421.1.7 (A4:2026) recommends arc fault detection devices (AFDDs) for single-phase AC socket-outlet circuits up to 32A — AFDD+RCBO combinations in the outbuilding consumer unit address both the fire risk (arc fault) and earth leakage protection requirements in one device.',
];

const faqs = [
  {
    question: 'What is the minimum overhead cable height for an outbuilding supply?',
    answer:
      'The minimum overhead cable height is 3.5m above ground level for pedestrian-only areas. For driveways and all areas subject to vehicle movement, BS 7671 Regulation 709.521.1.8 requires a minimum height of not less than 6m above ground. These heights ensure that people walking in the area cannot reach the cable and that vehicles (including agricultural vehicles and lorries) can pass underneath safely. If existing supports cannot achieve 6m clearance over vehicle routes, the supports must be relocated or the conductor raised. The cable should be of a type suitable for outdoor use; a catenary wire is required for spans over approximately 3m. Bare concentric or SWA cable is suitable for overhead use; standard twin-and-earth must not be used unsupported in the open air.',
  },
  {
    question: 'Do I need an earth electrode for an outbuilding supply?',
    answer:
      'This depends on the earthing arrangement. If the SWA cable armour provides a continuous metallic earth connection from the main building to the outbuilding, and the main building is on a TN-S or TN-C-S system, then the outbuilding is on a TN system and an earth electrode at the outbuilding may not be required (though it may be recommended as an additional measure). If there is no metallic earth connection from the main building to the outbuilding (for example, if the supply is via overhead cable without an earth conductor, or via SWA where the armour continuity is not relied upon for earth), then the outbuilding is on a TT system and an earth electrode is mandatory. In practice, it is common to treat all outbuilding supplies as TT installations and to install an earth electrode regardless, which provides additional protection.',
  },
  {
    question: 'What size consumer unit do I need in an outbuilding?',
    answer:
      'The consumer unit size depends on the number of circuits required in the outbuilding. For a simple shed or summerhouse with a lighting circuit and one socket circuit, a 4-way or 6-way consumer unit is adequate. For a workshop with power tools, additional heating, or a garage with an EV charger, a larger consumer unit (8 to 12 way) may be needed. The outbuilding consumer unit should have RCD protection for all circuits — a dual RCD consumer unit or individual RCBOs per way are both suitable. The incoming main switch should be a double-pole isolator rated at the supply cable current-carrying capacity.',
  },
  {
    question: 'Can I use ordinary twin-and-earth cable for an outbuilding supply?',
    answer:
      'Twin-and-earth (T&E) cable must not be used for buried underground routes without substantial mechanical protection such as rigid conduit. If T&E cable is used in conduit buried at the required depth (0.5m in gardens), it is acceptable, but SWA cable is generally more practical and reliable for buried garden installations because it does not require separate conduit. For above-ground runs on the exterior of buildings, T&E cable must be in conduit or trunking to provide mechanical protection — it must not be installed on the exterior surface without protection. SWA cable can be installed on external surfaces without additional protection because the steel wire armour provides the required mechanical protection.',
  },
  {
    question: 'Is RCD protection required at both the house and the outbuilding?',
    answer:
      'The standard approach is to have RCD protection at both ends. At the main consumer unit, the outbuilding circuit should be connected to an RCD-protected way (RCBO or RCD section) to provide protection for the supply cable. At the outbuilding consumer unit, all circuits within the outbuilding should be individually RCD protected (30mA) to protect against faults in the outbuilding wiring and equipment. This double protection means that a fault in the outbuilding wiring will trip the outbuilding RCD without affecting the main house supply; a fault in the supply cable will trip the house consumer unit RCD.',
  },
  {
    question: 'How do I size the supply cable for my outbuilding?',
    answer:
      'The supply cable must be sized for the maximum demand of all circuits in the outbuilding simultaneously. For a basic shed with lighting and sockets, a 16A or 20A supply is usually adequate, using 2.5mm SWA cable. For a workshop with 230V power tools, a 32A supply in 6mm SWA cable provides capacity for simultaneous use. For outbuildings with EV chargers or large workshop equipment, a 40A or 63A supply may be required. Always check voltage drop — long cable runs can cause significant voltage drop that reduces the effective voltage at the outbuilding. Use the voltage drop calculator to confirm the cable size is adequate for the run length.',
  },
  {
    question: 'What documents do I issue for an outbuilding supply?',
    answer:
      'An outbuilding supply involves new circuits from the main consumer unit, so an Electrical Installation Certificate (EIC) is required — not a Minor Works Certificate. The EIC should cover the supply circuit from the main consumer unit to the outbuilding consumer unit, and separate EICs (or the same EIC with multiple schedules) should cover the individual circuits within the outbuilding. The EIC must include the test results for continuity, insulation resistance, polarity, earth fault loop impedance, and RCD test results. A Part P self-certification certificate must be issued if the electrician is registered with an approved competent person scheme.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/garden-electrical-wiring-regulations',
    title: 'Garden Electrical Wiring Regulations',
    description: 'SWA cable burial depths, RCD requirements, and outdoor socket standards.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size SWA supply cables for outbuildings correctly.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on long supply runs to remote outbuildings.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/part-p-building-regulations-electrical',
    title: 'Part P Building Regulations Guide',
    description: 'Outbuilding supplies are notifiable — understand the requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates for outbuilding supplies on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/electrical-handover-documentation',
    title: 'Electrical Handover Documentation',
    description: 'What documentation to issue on completion of an outbuilding supply.',
    icon: FileText,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Outbuilding Electrical Supply: Options and Considerations',
    content: (
      <>
        <p>
          Supplying electricity to a detached garage, shed, summerhouse, home office, or workshop is
          one of the most common domestic electrical jobs. The installation must comply with BS 7671
          for the cable routing, earthing, and protection arrangements, and is notifiable under Part
          P of the Building Regulations.
        </p>
        <p>
          The two primary routes for the supply cable from the dwelling to the outbuilding are
          underground (buried armoured cable) and overhead (catenary-supported cable). The choice
          depends on the distance, ground conditions, obstacles, and aesthetic preferences.
          Underground is the preferred option for most domestic installations because it is hidden,
          protected from UV degradation and storm damage, and does not require maintaining clearance
          heights.
        </p>
        <p>
          In addition to the supply cable, the installation requires a consumer unit in the
          outbuilding for local protection and control, appropriate earthing arrangements, and RCD
          protection at both ends of the supply. Getting these right from the outset saves the
          customer problems later — particularly as homeowners increasingly use outbuildings as home
          offices and workshops with significant electrical loading.
        </p>
      </>
    ),
  },
  {
    id: 'armoured-cable',
    heading: 'Armoured Cable (SWA) Underground Route',
    content: (
      <>
        <p>
          Steel Wire Armoured (SWA) cable buried underground is the standard and preferred method
          for supplying outbuildings. The armour provides mechanical protection against accidental
          damage and, when correctly terminated, provides the earth continuity path.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Cable selection</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  2-core SWA (live, neutral, with armour as earth) or 3-core SWA (live, neutral,
                  dedicated CPC plus armour). 3-core is preferred because it provides a dedicated
                  earth conductor — the armour is then bonded at both ends as an additional earth
                  path but the 3rd core provides the primary CPC. Conductor size depends on the
                  maximum demand of the outbuilding and the cable run length.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Burial depth</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Minimum 0.5m in gardens and open ground; 0.45m under paved areas; 0.6m under
                  driveways. Cable tiles (protective tiles placed above the cable) and warning tape
                  at approximately 150mm above the cable are required. Record the cable route with
                  accurate dimensions from fixed reference points on an as-installed drawing.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Entry into outbuilding</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  The cable enters the outbuilding via a suitable weatherproof entry point —
                  typically a conduit sleeve through the wall or floor, sealed against moisture
                  ingress. The cable should rise inside the outbuilding to the consumer unit via
                  conduit or trunking on the wall to protect it from mechanical damage.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'overhead-cable',
    heading: 'Overhead Cable Route',
    content: (
      <>
        <p>
          Where underground cable is not practical — for example, where the garden is paved and
          digging would be very disruptive, or where the outbuilding is in a position that makes
          underground routing difficult — an overhead cable route can be used.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Minimum height: 3.5m above ground level</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  For areas accessible to pedestrians only. The cable must be at a height where a
                  person cannot reach it and where tall garden equipment (ladder, long-handled
                  tools) is unlikely to contact it.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Minimum height: 6m over driveways and vehicle movement areas</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Where vehicles can pass under the cable — including vans, lorries, and delivery
                  vehicles — BS 7671 Regulation 709.521.1.8 requires a minimum height of not less
                  than 6m above ground. If existing support heights cannot achieve this clearance,
                  supports must be relocated or the conductor raised to comply.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <div>
                <strong>Catenary wire support</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  For spans over approximately 3m, the cable must be supported by a catenary wire (a
                  separate steel wire tensioned between the two buildings) to prevent the cable
                  sagging below the minimum height under its own weight and under wind and ice
                  loading. Self-supporting aerial cables (with a built-in supporting messenger wire)
                  are an alternative that simplifies installation.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <p>
          Overhead cables are more susceptible to UV degradation and storm damage than buried
          cables. XLPE-insulated SWA cable or purpose-made aerial bundled cable is suitable for
          overhead use; PVC-insulated cable degrades faster in UV exposure. Overhead cable routes
          should be inspected periodically for sag, damage, and vegetation contact.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Consumer Unit in the Outbuilding',
    content: (
      <>
        <p>
          Every outbuilding with a permanent electrical supply should have its own consumer unit.
          This provides local isolation, overcurrent protection for the outbuilding's circuits, and
          a convenient point for switching off all power to the outbuilding.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main switch:</strong> Double-pole isolating switch rated at the incoming
                supply current. This provides isolation of all circuits in the outbuilding without
                returning to the main dwelling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit protection:</strong> Individual MCBs or RCBOs for each outbuilding
                circuit (lighting, socket ring or radial, EV charger if applicable, workshop
                equipment). RCBOs are preferred for outbuilding installations as they provide
                individual RCD protection without nuisance tripping affecting other circuits. For
                workshop and garage socket-outlet circuits, BS 7671 Regulation 421.1.7 (A4:2026)
                recommends AFDD protection — AFDD+RCBO combination devices are available and address
                both arc-fault fire risk and RCD requirements in a single device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enclosure type:</strong> Metal consumer units are required for consumer
                units in dwellings (post-2016 Amendment 4 to BS 7671). For outbuildings that are not
                classified as dwellings, plastic enclosures are technically permitted, but metal
                enclosures are recommended for fire containment in all cases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location:</strong> The consumer unit should be mounted in a position that is
                dry, accessible for maintenance, and not subject to mechanical damage or flooding.
                It should be within 2m of the incoming cable entry point to minimise unprotected
                cable length inside the outbuilding.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing',
    heading: 'Earthing — TT System and Earth Electrode',
    content: (
      <>
        <p>
          Earthing is one of the most critical aspects of an outbuilding supply. The earthing
          arrangement for the outbuilding depends on whether there is a continuous metallic earth
          connection from the main building.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">TN System (Metallic Earth Path)</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              If the supply cable has a metallic armour (SWA) that is bonded to earth at both ends,
              and the armour resistance is adequate, the outbuilding can be treated as a TN system.
              The armour provides the earth fault return path.
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Earth electrode not mandated (but recommended)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>Earth fault loop impedance (Zs) must be checked and within limits</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>
                  30mA RCD protection required for socket-outlet circuits (Reg 411.3.3) and lighting
                  circuits in domestic premises (Reg 411.3.4)
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              TT System (No Metallic Earth Path)
            </h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              If the outbuilding earth is not connected to the main building earth via a metallic
              path (overhead cable without separate earth, or where armour earth path is not relied
              upon), the outbuilding is a TT installation.
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Earth electrode mandatory at the outbuilding</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>
                  Electrode resistance measured and compliance confirmed by calculation: Ra × I
                  <sub>Δn</sub> ≤ 50V (Reg 411.5.3) — for a 30mA RCD this gives a maximum Ra of
                  1,667Ω
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>RCD protection mandatory for all circuits (not just sockets)</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          In practice, it is good practice to install an earth electrode at every outbuilding
          regardless of the earthing system type. This provides an additional earth reference,
          reduces earth fault loop impedance, and ensures the outbuilding has a reliable earth
          connection even if the main supply cable earth path develops a fault.
        </p>
        <p>
          For TT installations, compliance of the earth electrode is confirmed by calculation under
          BS 7671 Regulation 411.5.3: the electrode resistance Ra (in ohms) multiplied by the RCD
          rated residual operating current I<sub>Δn</sub> must not exceed 50V. For a 30mA RCD this
          gives a maximum permissible Ra of 1,667Ω — confirming that compliance depends on the RCD
          rating selected, not a fixed resistance target. Record the measured Ra on the EIC schedule
          of test results.
        </p>
        <SEOAppBridge
          title="Record earth electrode test results on site"
          description="Elec-Mate's EIC Certificate app includes earth electrode resistance recording in the test results schedule."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection Requirements for Outbuildings',
    content: (
      <>
        <p>RCD protection is required at two levels for outbuilding supplies:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>At the main consumer unit (source protection)</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  The outbuilding supply circuit at the main consumer unit should be connected to an
                  RCD-protected way — either an RCBO in the main consumer unit, or an RCD section
                  with the outbuilding circuit MCB on the protected side. This protects the supply
                  cable from the main building to the outbuilding.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>At the outbuilding consumer unit (local protection)</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  All circuits within the outbuilding must be individually RCD protected at 30mA.
                  For TT system installations, this is a mandatory requirement under BS 7671
                  Regulation 411.5. For TN system installations, 30mA RCD protection is required for
                  all socket-outlet circuits (rated ≤32A) under Regulation 411.3.3 — there is no
                  documented-risk-assessment exception where the outbuilding is ancillary to a
                  dwelling. Regulation 411.3.4 (A4:2026) separately mandates 30mA RCD additional
                  protection for AC lighting circuits in domestic premises, so outbuilding lighting
                  circuits also require 30mA RCD protection where the outbuilding serves a domestic
                  dwelling. Using RCBOs for each outbuilding circuit is best practice — it provides
                  selective protection so that a fault on one circuit does not de-energise the whole
                  outbuilding.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Outbuilding Supplies',
    content: (
      <>
        <p>
          An outbuilding supply is notifiable under Part P of the Building Regulations in England
          because it involves a new circuit from the dwelling consumer unit. This applies to:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>New supply to a detached garage</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>New supply to a garden shed or workshop</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>New supply to a summerhouse or garden office</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Upgrading or extending an existing outbuilding supply circuit</span>
            </li>
          </ul>
        </div>
        <p>
          Register with an approved competent person scheme to self-certify and issue the{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          on site. The certificate should cover the supply circuit from the main consumer unit to
          the outbuilding consumer unit, with a separate schedule for the outbuilding internal
          circuits. Include the earth electrode resistance test result if a TT earth system is used.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Outbuilding Supply in Practice',
    content: (
      <>
        <p>
          Outbuilding supply jobs are excellent revenue opportunities. A properly specified
          outbuilding supply — correct cable sizing, TT earthing, RCBOs per circuit, metal consumer
          unit, and professional certification — demonstrates expertise and commands a professional
          price.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing and Voltage Drop</h4>
                <p className="text-white text-sm leading-relaxed">
                  Long cable runs to remote outbuildings cause voltage drop. Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to confirm the SWA cable size meets both current-carrying capacity and voltage
                  drop requirements for the run length.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue your{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  for the outbuilding supply on site before you leave. Include all test results —
                  continuity, IR, polarity, Zs, RCD operation, and earth electrode resistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OutbuildingElectricalSupplyPage() {
  return (
    <GuideTemplate
      title="Overhead Cable to Outbuilding: 3.5m Min Height"
      description="Overhead cable installation for garages, sheds, workshops. BS 7671:2018+A4:2026 clearance rules, SWA vs overhead, RCD protection, TT earthing setup."
      datePublished="2026-03-27"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Outbuilding Supply Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Outbuilding Electrical Supply:{' '}
          <span className="text-yellow-400">Garage, Shed, and Workshop</span>
        </>
      }
      heroSubtitle="Supplying an outbuilding with electricity requires the right cable route (SWA underground or overhead at minimum 3.5m — 6m where vehicles pass), a consumer unit in the outbuilding, correct TT earthing, and RCD protection at both ends. This guide covers every aspect of outbuilding electrical supply."
      readingTime={12}
      answerBox={{
        question: 'What do I need to supply electricity to an outbuilding?',
        answer:
          'Supplying a detached outbuilding usually means a buried steel-wire-armoured (SWA) cable from the house, its own small consumer unit in the outbuilding, RCD protection, and careful attention to earthing — a TT arrangement with a local earth electrode is often used rather than exporting a PME earth to a building with extraneous-conductive-parts. The circuit is sized for the outbuilding load, and the work is designed, tested and certified to BS 7671.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Outbuilding Electrical Supply"
      relatedPages={relatedPages}
      ctaHeading="Certificate Outbuilding Supplies On Site"
      ctaSubheading="Elec-Mate lets UK electricians complete EICs for outbuilding supply installations on their phone. Cable sizing, voltage drop, and certification — all in one app. 7-day free trial."
    />
  );
}
