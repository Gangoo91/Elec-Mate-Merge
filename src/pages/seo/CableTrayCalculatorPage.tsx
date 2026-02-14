import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Zap,
  Shield,
  BookOpen,
  BarChart3,
  Ruler,
  Layers,
  FileCheck2,
  Scale,
  Grid3X3,
  Settings,
  Box,
} from 'lucide-react';

export default function CableTrayCalculatorPage() {
  return (
    <ToolTemplate
      title="Cable Tray Sizing Calculator | Fill Capacity Tool"
      description="Calculate cable tray fill percentage and select the correct tray size for any cable combination. Covers BS EN 61537, cable diameters, ladder tray vs perforated tray, and maximum fill capacity. Free UK electrical calculator."
      datePublished="2026-02-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Cable Tray Sizing Calculator', href: '/tools/cable-tray-sizing-calculator' },
      ]}
      tocItems={[
        { id: 'what-is-cable-tray', label: 'What Is Cable Tray?' },
        { id: 'tray-types', label: 'Tray Types — Ladder vs Perforated' },
        { id: 'fill-calculation', label: 'Fill Calculation Method' },
        { id: 'cable-diameters', label: 'Cable Diameters' },
        { id: 'bs-en-61537', label: 'BS EN 61537 Requirements' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="BS EN 61537 Compliant"
      badgeIcon={Layers}
      heroTitle={
        <>
          <span className="text-yellow-400">Cable Tray Sizing Calculator</span> — Get the Right Tray
          for Your Cable Run
        </>
      }
      heroSubtitle="Calculate cable tray fill capacity and select the correct tray width and depth for any combination of cables. Covers ladder tray, perforated tray, wire mesh tray, and solid-bottom tray to BS EN 61537. Part of Elec-Mate's 50+ electrical calculators for UK electricians."
      heroFeaturePills={[
        { icon: Layers, label: 'Tray Sizing' },
        { icon: Scale, label: 'Fill Percentage' },
        { icon: Grid3X3, label: 'All Tray Types' },
        { icon: Shield, label: 'BS EN 61537' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'Cable tray fill is calculated by summing the cross-sectional area of all cables and comparing it to the usable area of the tray — typically limited to one layer for power cables.',
        'Ladder tray and perforated tray are the most common types in UK commercial and industrial installations. Ladder tray offers better ventilation and is preferred for high-current power cables.',
        'BS EN 61537 specifies the mechanical requirements for cable tray systems including load capacity, corrosion resistance, and fire performance.',
        'For power cables, single-layer installation is recommended to avoid derating — stacking cables reduces current-carrying capacity due to mutual heating.',
        'Elec-Mate calculates cable tray fill instantly for any cable combination, with cable diameters built in and tray size recommendations generated automatically.',
      ]}
      sections={[
        {
          id: 'what-is-cable-tray',
          heading: 'What Is Cable Tray and When Is It Used?',
          content: (
            <>
              <p>
                Cable tray is an open cable containment system used in commercial, industrial, and
                large residential installations to support and route cables horizontally and
                vertically. Unlike conduit and trunking, cable tray is open — cables are laid on top
                of the tray rather than enclosed within it. This makes cable tray ideal for large
                cable runs where heat dissipation is important and where cables need to be easily
                accessible for maintenance, modification, or additional circuits.
              </p>
              <p>
                Cable tray is commonly found in ceiling voids, service corridors, plant rooms, data
                centres, factory floors, and external cable routes. It supports power cables,
                control cables, data cables, and fibre optic cables. The tray provides mechanical
                support and protection while allowing air circulation around the cables — a
                significant advantage over enclosed containment for high-current circuits where heat
                dissipation is critical.
              </p>
              <p>
                Sizing cable tray correctly ensures that cables fit without overcrowding, that the
                tray can support the weight of the cables, and that current-carrying capacity is not
                reduced by excessive grouping. The{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                determines the cable sizes, and the tray calculator determines the tray size needed
                to carry them. For enclosed containment, see the{' '}
                <SEOInternalLink href="/tools/trunking-fill-calculator">
                  trunking fill calculator
                </SEOInternalLink>{' '}
                and{' '}
                <SEOInternalLink href="/tools/conduit-fill-calculator">
                  conduit fill calculator
                </SEOInternalLink>
                .
              </p>
            </>
          ),
          appBridge: {
            title: 'Calculate Cable Tray Fill Instantly',
            description:
              'Enter your cable list and Elec-Mate recommends the correct tray width and depth. Supports all standard tray sizes and cable types with diameters built in.',
            icon: Layers,
          },
        },
        {
          id: 'tray-types',
          heading: 'Cable Tray Types — Ladder, Perforated, Mesh, and Solid',
          content: (
            <>
              <p>
                There are four main types of cable tray used in UK installations, each suited to
                different applications:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Ladder tray</span> — consists of two
                  side rails connected by cross rungs (like a ladder). Provides excellent
                  ventilation and is the preferred choice for heavy power cables where heat
                  dissipation is important. Cables are tied to the rungs with cable ties. Most
                  common in industrial and commercial installations.
                </li>
                <li>
                  <span className="font-semibold text-white">Perforated tray</span> — a solid base
                  with regularly spaced holes or slots. Provides moderate ventilation while offering
                  better cable support than ladder tray (smaller cables do not fall between rungs).
                  Common for mixed cable runs with both power and data cables.
                </li>
                <li>
                  <span className="font-semibold text-white">Wire mesh tray</span> — made from
                  welded wire mesh. Lightweight, easy to cut and modify on site, and provides good
                  ventilation. Increasingly popular for data cable installations in office ceiling
                  voids. Lower load capacity than ladder or perforated tray.
                </li>
                <li>
                  <span className="font-semibold text-white">Solid-bottom tray</span> — a continuous
                  metal base with no perforations. Used where additional cable protection is needed
                  or where fire compartmentation requires a solid barrier. Provides the least
                  ventilation and results in the highest cable derating factors.
                </li>
              </ul>
              <p>
                The choice of tray type affects the cable current-carrying capacity. BS 7671 Table
                4C2 provides correction factors for different installation methods, and cables on
                open tray (ladder or perforated) generally have higher ratings than cables in
                enclosed tray or trunking. This connects directly with the{' '}
                <SEOInternalLink href="/tools/voltage-drop-calculator">
                  voltage drop calculations
                </SEOInternalLink>{' '}
                for long cable runs.
              </p>
            </>
          ),
        },
        {
          id: 'fill-calculation',
          heading: 'Cable Tray Fill Calculation Method',
          content: (
            <>
              <p>
                Cable tray fill calculation differs from conduit and trunking fill because cable
                tray is open — cables sit on the tray surface rather than being enclosed. The
                primary concern is not volumetric fill percentage but rather whether the cables fit
                within the tray width, considering the recommended installation arrangement.
              </p>
              <p>
                For power cables, the preferred installation is a{' '}
                <strong className="text-yellow-400">single layer</strong> with cables laid flat side
                by side (for flat cables) or touching in a single row (for round cables).
                Single-layer installation ensures maximum heat dissipation and avoids the derating
                factors that apply when cables are stacked in multiple layers.
              </p>
              <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
                <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                  Tray Width = Sum of cable diameters + spacing allowances
                </p>
                <p className="mt-3 text-sm text-white">
                  For single-layer installation, the tray must be wide enough to accommodate all
                  cables side by side with a small gap between each
                </p>
              </div>
              <p>
                For control cables, data cables, and other low-current cables, multi-layer
                installation is acceptable because these cables do not generate significant heat. In
                this case, the calculation is based on the total cross-sectional area of all cables
                compared to the tray cross-sectional area (width x depth), with a recommended
                maximum fill of 50% to allow for cable management and future additions.
              </p>
              <p>
                When power cables and data cables share the same tray, segregation requirements from
                BS 7671 Regulation 528.1 apply. The tray may need a divider or the cables may need
                to be separated by a minimum distance. Compartmentalised tray or separate trays are
                often the simplest solution. For more on containment sizing, see the{' '}
                <SEOInternalLink href="/tools/trunking-fill-calculator">
                  trunking fill calculator
                </SEOInternalLink>
                .
              </p>
            </>
          ),
        },
        {
          id: 'cable-diameters',
          heading: 'Cable Diameters for Tray Fill Calculations',
          content: (
            <>
              <p>
                To calculate tray fill, you need the overall diameter of each cable. For round
                cables, this is the single overall diameter. For flat cables, you need the width and
                height. The following table shows overall diameters for common UK cable types:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
                <div className="grid grid-cols-3 gap-px bg-white/10">
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Cable Type
                  </div>
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Overall Diameter (mm)
                  </div>
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    CSA (mm²)
                  </div>
                </div>
                {[
                  { cable: '1.5 mm² 3-core SWA', dia: '12.3', csa: '119' },
                  { cable: '2.5 mm² 3-core SWA', dia: '13.5', csa: '143' },
                  { cable: '4 mm² 3-core SWA', dia: '14.8', csa: '172' },
                  { cable: '6 mm² 3-core SWA', dia: '16.1', csa: '204' },
                  { cable: '10 mm² 3-core SWA', dia: '19.0', csa: '284' },
                  { cable: '16 mm² 3-core SWA', dia: '21.4', csa: '360' },
                  { cable: '25 mm² 3-core SWA', dia: '24.6', csa: '475' },
                  { cable: '35 mm² 3-core SWA', dia: '27.0', csa: '573' },
                  { cable: '50 mm² 3-core SWA', dia: '30.2', csa: '717' },
                  { cable: '70 mm² 3-core SWA', dia: '34.2', csa: '919' },
                  { cable: '95 mm² 3-core SWA', dia: '38.5', csa: '1,164' },
                  { cable: 'Cat6 data cable', dia: '6.0', csa: '28' },
                ].map((row) => (
                  <div key={row.cable} className="grid grid-cols-3 gap-px bg-white/5">
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">
                      {row.cable}
                    </div>
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.dia}</div>
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.csa}</div>
                  </div>
                ))}
              </div>
              <p>
                These diameters are approximate and vary slightly between manufacturers. Always
                verify from the manufacturer's data sheet for accurate fill calculations. Elec-Mate
                includes a comprehensive database of cable dimensions for all common UK cable types,
                including SWA, T&E, singles, LSOH, and data cables.
              </p>
            </>
          ),
          appBridge: {
            title: 'Cable Diameters Built Into the Calculator',
            description:
              'Select cable types from the dropdown — SWA, T&E, singles, LSOH, data — and Elec-Mate uses the correct overall diameter automatically. No manual lookup needed.',
            icon: Ruler,
          },
        },
        {
          id: 'bs-en-61537',
          heading: 'BS EN 61537 — Cable Tray System Requirements',
          content: (
            <>
              <p>
                BS EN 61537 (IEC 61537) is the standard that specifies the requirements for cable
                tray and cable ladder systems. It covers mechanical requirements, corrosion
                protection, fire performance, and testing methods. Key requirements include:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Load capacity</span> — the tray must
                  support the weight of the cables plus a safety factor. Load capacity is rated per
                  metre and depends on the span between supports. Typical support spacing is 1.5 m
                  to 3 m depending on tray type and load.
                </li>
                <li>
                  <span className="font-semibold text-white">Corrosion protection</span> — steel
                  tray must be protected against corrosion. Options include hot-dip galvanising
                  (HDG), pre-galvanising, powder coating, and stainless steel. HDG is the standard
                  for general indoor use. Stainless steel is required in corrosive environments.
                </li>
                <li>
                  <span className="font-semibold text-white">Electrical continuity</span> — metal
                  cable tray must provide reliable electrical continuity throughout the system to
                  serve as a supplementary CPC. All joints and fixings must maintain continuity.
                </li>
                <li>
                  <span className="font-semibold text-white">Fire performance</span> — tray systems
                  in fire compartments must be fire-stopped at penetrations. Some projects require
                  tray with specific fire ratings.
                </li>
              </ul>
              <p>
                When selecting cable tray, ensure the manufacturer declares compliance with BS EN
                61537 and provides load capacity data for the support spacing planned. The{' '}
                <SEOInternalLink href="/tools/electrical-load-schedule">
                  load schedule
                </SEOInternalLink>{' '}
                helps determine how many and what size cables each tray run will carry, feeding into
                the tray sizing calculation. For overall project documentation, the{' '}
                <SEOInternalLink href="/tools/eic-certificate">EIC certificate</SEOInternalLink>{' '}
                records the containment system used.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'List all cables for the tray run',
          text: 'Identify every cable that will be installed on the tray run. Record the cable type (SWA, LSOH, data), conductor size, and number of cores for each cable.',
        },
        {
          name: 'Look up cable diameters',
          text: 'Find the overall diameter of each cable from the manufacturer data sheet. Elec-Mate has all common UK cable diameters built in — select the cable type and the diameter is auto-filled.',
        },
        {
          name: 'Determine the installation arrangement',
          text: 'Decide whether cables will be installed in a single layer (recommended for power cables) or multiple layers (acceptable for control and data cables). Single-layer avoids grouping derating.',
        },
        {
          name: 'Calculate the required tray width',
          text: 'For single-layer installation, sum the overall diameters of all cables side by side. Add 10-20% for spacing and cable management. Select the nearest standard tray width.',
        },
        {
          name: 'Check weight capacity',
          text: 'Calculate the total weight of cables per metre and verify that the selected tray supports this load at the planned support spacing. Elec-Mate provides weight estimates for all cable types.',
        },
      ]}
      howToHeading="How to Size a Cable Tray"
      howToDescription="Five steps from cable list to correctly sized tray."
      features={[
        {
          icon: Calculator,
          title: 'Instant Tray Sizing',
          description:
            'Enter your cable list and get an instant tray width recommendation. Supports single-layer and multi-layer installation arrangements.',
        },
        {
          icon: Layers,
          title: 'All Tray Types',
          description:
            'Supports ladder tray, perforated tray, wire mesh tray, and solid-bottom tray. Standard widths from 50 mm to 900 mm.',
        },
        {
          icon: Ruler,
          title: 'Cable Diameter Database',
          description:
            'Built-in database of overall diameters for all common UK cable types — SWA, T&E, singles, LSOH, FP, and data cables.',
        },
        {
          icon: Scale,
          title: 'Weight Calculation',
          description:
            'Calculates total cable weight per metre and checks against tray load capacity at the specified support spacing.',
        },
        {
          icon: Settings,
          title: 'Spacing and Fill Display',
          description:
            'Visual display of cable arrangement on the tray with fill percentage. Shows remaining space for future cables.',
        },
        {
          icon: Shield,
          title: 'BS EN 61537 Compliant',
          description:
            "All tray specifications and load ratings reference BS EN 61537. Part of Elec-Mate's 50+ calculators for UK electricians.",
        },
      ]}
      featuresHeading="Cable Tray Calculator Features"
      featuresSubheading="Everything you need to correctly size cable tray for any installation."
      faqs={[
        {
          question: 'What is the maximum fill for cable tray?',
          answer:
            'Unlike conduit (40%) and trunking (45%), there is no single regulatory fill percentage for cable tray because it is open containment. For power cables, best practice is single-layer installation — all cables laid side by side with small gaps for air circulation. This avoids grouping derating factors and ensures maximum current-carrying capacity. For data and control cables where heating is not a concern, multi-layer installation up to the tray depth is acceptable.',
        },
        {
          question: 'What standard sizes of cable tray are available?',
          answer:
            'Standard cable tray widths in the UK are 50 mm, 75 mm, 100 mm, 150 mm, 225 mm, 300 mm, 450 mm, 600 mm, 750 mm, and 900 mm. Depths are typically 25 mm, 50 mm, 75 mm, or 100 mm depending on the width and type. Standard lengths are 3 metres. Ladder tray, perforated tray, and wire mesh tray are all available in these standard sizes. For unusual requirements, some manufacturers offer custom sizes.',
        },
        {
          question: 'What is the difference between cable tray and cable ladder?',
          answer:
            'Cable tray has a continuous or perforated base that supports cables along their entire length. Cable ladder has cross rungs with open space between them — cables span from rung to rung. Ladder is better suited to heavy power cables because it provides superior ventilation (air circulates freely under the cables) and higher current-carrying capacity. Tray is better for smaller cables that might fall through ladder rungs. In practice, the terms are sometimes used interchangeably, but they are distinct products.',
        },
        {
          question: 'How far apart should cable tray supports be?',
          answer:
            "Support spacing depends on the tray type, width, material, and the weight of cables it carries. Typical support spacing is 1.5 m for light-duty mesh tray, 2.0 m for perforated tray, and 2.5-3.0 m for ladder tray. These spacings assume a uniform cable load — heavier cable loads may require closer spacing. Always check the manufacturer's load capacity tables for the specific tray product at the planned support spacing. Vertical tray runs require more frequent supports — typically every 1.0-1.5 m.",
        },
        {
          question: 'Do I need to earth cable tray?',
          answer:
            'Yes. Metal cable tray must be earthed as an exposed-conductive-part in accordance with BS 7671. The tray should be bonded to the main earthing terminal, and all joints in the tray system must maintain electrical continuity. Many manufacturers supply tray joints with built-in continuity bonding. If the tray is used as a supplementary CPC, all connections must provide a reliable low-resistance path. Earth continuity should be tested during initial verification and periodic inspection.',
        },
        {
          question: 'Can I mix power cables and data cables on the same tray?',
          answer:
            'BS 7671 Regulation 528.1 requires segregation between cables of different voltage bands. Mains voltage power cables (230 V / 400 V) must be separated from data cables (extra-low voltage) unless both are insulated for the highest voltage present. Options include using separate trays, using a tray with a central divider, or maintaining a minimum separation distance (typically 300 mm). Many installations use stacked trays — power on the top tray and data on a lower tray — with the required vertical separation between them.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/conduit-fill-calculator',
          title: 'Conduit Fill Calculator',
          description:
            'Calculate conduit fill using the cable factor method for enclosed cable containment.',
          icon: Ruler,
          category: 'Calculators',
        },
        {
          href: '/tools/trunking-fill-calculator',
          title: 'Trunking Fill Calculator',
          description:
            'Calculate trunking fill to the 45% rule for enclosed rectangular containment.',
          icon: Box,
          category: 'Calculators',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size cables for each circuit using BS 7671 current-carrying capacity tables and correction factors.',
          icon: Calculator,
          category: 'Calculators',
        },
        {
          href: '/tools/voltage-drop-calculator',
          title: 'Voltage Drop Calculator',
          description:
            'Check voltage drop on long cable runs — critical for cables on tray in large commercial installations.',
          icon: Zap,
          category: 'Calculators',
        },
        {
          href: '/tools/electrical-load-schedule',
          title: 'Load Schedule Calculator',
          description:
            'Build the load schedule to determine how many cables each tray run needs to carry.',
          icon: Grid3X3,
          category: 'Calculators',
        },
        {
          href: '/tools/electrical-testing-calculators',
          title: 'All Electrical Calculators',
          description: '50+ BS 7671 calculators and containment tools for UK electricians.',
          icon: Calculator,
          category: 'Tools',
        },
      ]}
      ctaHeading="Size cable tray correctly every time"
      ctaSubheading="Join UK electricians using Elec-Mate's 50+ calculators for on-site and design work. 7-day free trial, cancel anytime."
      toolPath="/tools/cable-tray-sizing-calculator"
    />
  );
}
