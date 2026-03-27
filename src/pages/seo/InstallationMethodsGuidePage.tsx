import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Settings,
  Info,
  ClipboardCheck,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Wiring Guides', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Cable Installation Methods BS 7671', href: '/installation-methods-guide' },
];

const tocItems = [
  { id: 'reference-methods-overview', label: 'Reference Installation Methods' },
  { id: 'method-a', label: 'Method A — Enclosed in Conduit in Thermally Insulating Wall' },
  { id: 'method-b', label: 'Method B — Enclosed in Conduit on Wall or in Trunking' },
  { id: 'method-c', label: 'Method C — Clipped Direct' },
  { id: 'method-e-f', label: 'Methods E and F — On Cable Tray' },
  { id: 'method-g', label: 'Method G — Spaced from Surface' },
  { id: 'grouping-factor', label: 'Correction Factor for Grouping' },
  { id: 'ambient-temperature', label: 'Ambient Temperature Correction' },
  { id: 'thermal-insulation', label: 'Thermal Insulation Correction' },
  { id: 'practical-examples', label: 'Practical Examples' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The reference installation method (A, B, C, E, F, or G) determines the tabulated current-carrying capacity of a cable — the same cable in a different installation method can carry significantly different current levels.',
  'Method C (clipped direct to a surface) gives the highest current-carrying capacity for the same conductor size, because the cable can dissipate heat most effectively when in direct contact with air.',
  'Method A (enclosed in a thermally insulating wall) gives the lowest capacity — the insulation traps heat and can require a cable up to two sizes larger than Method C to carry the same current.',
  'Grouping correction factors reduce the allowable current capacity when multiple circuits share the same conduit, trunking, tray, or bundle — the more circuits grouped together, the lower the effective capacity of each.',
  'Ambient temperature correction factors adjust the tabulated ratings, which assume a 30°C reference temperature. In hot environments (roof spaces, boiler rooms), the capacity must be derated; in cool environments it may be uprated.',
  'For compliance with BS 7671, the effective current-carrying capacity (It) must be calculated as: It = tabulated rating × Ca (ambient) × Cg (grouping) × Ci (insulation), and this must be greater than or equal to In (protective device rating).',
];

const faqs = [
  {
    question: 'What is a reference installation method and why does it matter?',
    answer:
      'A reference installation method (also called a reference method) is a standardised description of how a cable is physically installed — for example, clipped direct to a surface, enclosed in conduit, or on a ventilated cable tray. BS 7671 Appendix 4 provides current-carrying capacity tables organised by reference method, because the installation method fundamentally affects how well the cable can dissipate heat. The same 2.5mm² T&E cable clipped direct (Method C) can carry around 27A, but if fully enclosed in thermal insulation (Method A worst case) the same cable can carry only around 13A. Using the wrong reference method when sizing a cable can result in dangerous overloading.',
  },
  {
    question: 'What is the difference between Methods B and C?',
    answer:
      'Method B covers cables enclosed in a conduit on a wall surface (or in trunking on a surface, or in a cable duct in the floor or ceiling). The cable is surrounded by the conduit or trunking material and relies on conduction through the conduit wall to dissipate heat. Method C is cable clipped directly to a surface (or single cables on perforated tray). The cable surface is in direct contact with air, allowing convective and radiative heat dissipation. Method C gives a higher current rating than Method B for the same conductor size because the cable cools more effectively.',
  },
  {
    question: 'How many circuits can I run in one conduit or piece of trunking?',
    answer:
      'There is no absolute limit on the number of circuits in conduit or trunking, but each additional circuit reduces the current-carrying capacity of all circuits in the group due to the grouping correction factor. With six or more circuits fully loaded in a group, the grouping factor can reduce each circuit\'s effective capacity by 40% or more. Practically, electricians should assess whether the reduced current capacity still allows each circuit to operate within the protective device rating. Where grouping factors cause problems, circuits should be split across multiple conduits, trunking systems, or the conductor size increased.',
  },
  {
    question: 'What correction factor applies in a hot roof space?',
    answer:
      'The ambient temperature correction factor (Ca) applies when cables are installed in an environment that differs from the 30°C reference temperature assumed in BS 7671 tables. In a roof space, summer temperatures can reach 50°C to 60°C or higher in a well-insulated building. At 50°C, the correction factor for a PVC-insulated cable is approximately 0.71, reducing the effective current capacity to 71% of the tabulated value. If the roof space cables also pass through or are covered by thermal insulation, the insulation correction factor (Ci) must additionally be applied, potentially reducing the effective capacity to 50% or less of the tabulated rating.',
  },
  {
    question: 'Does running cable on a cable tray improve or reduce the current rating?',
    answer:
      'It depends on the type of tray and how the cables are laid. Cables on an open ventilated cable tray with cables touching (Method E for multicore cables, Method F for single-core cables in trefoil or flat formation) generally give current ratings higher than Method B (in conduit) but lower than Method C (clipped direct with full air gap around each cable). Cables on a perforated tray touching each other use a different reference method. If cables are bunched together on a solid (non-perforated) tray, the effective installation method is closer to Method B. The specific arrangement must be matched to the correct BS 7671 Appendix 4 table.',
  },
  {
    question: 'How does the number of cables in a bundle affect the calculation?',
    answer:
      'When cables are bundled together — either in a bundle clipped directly or in a bundle lying on a surface — each cable reduces the ability of its neighbours to dissipate heat. BS 7671 Appendix 4 provides grouping correction factors (Cg) for different numbers of circuits in a group. For two circuits, Cg is approximately 0.8 (20% reduction). For three circuits, approximately 0.7 (30% reduction). For six or more circuits, approximately 0.57 or lower (more than 40% reduction). These factors apply when all cables in the group are at full design current simultaneously — where diversity is present (not all circuits loaded simultaneously), a diversity factor may be applied, but this requires careful engineering justification.',
  },
  {
    question: 'Can I use a higher ambient temperature correction if I know the room is cold?',
    answer:
      'Yes. If the ambient temperature at the cable installation location is lower than the 30°C reference temperature, the BS 7671 ambient temperature correction factor (Ca) is greater than 1.0, meaning the cable can carry more than the tabulated current. For example, at 20°C ambient, Ca for a PVC cable is approximately 1.12, allowing 12% more current. However, you must be certain that the ambient temperature will remain low throughout the cable\'s life — a cold room that is later heated, or a cable partly routed through a warmer section, may invalidate the uprating. Document the basis for any uprating on the installation certificate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cable-selection-guide',
    title: 'Cable Selection Guide BS 7671',
    description: 'T&E, SWA, MICC, FP200 and flexible cables — selection criteria and applications.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/earthing-systems-guide',
    title: 'Earthing Systems Guide',
    description: 'TN-S, TN-C-S and TT earthing systems explained with practical examples.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR requirements, compliance deadlines, and common defects.',
    icon: Home,
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
    id: 'reference-methods-overview',
    heading: 'Reference Installation Methods in BS 7671',
    content: (
      <>
        <p>
          BS 7671 18th Edition uses reference installation methods to categorise how cables are
          installed physically. Each method has different heat dissipation characteristics, and
          the current-carrying capacity tables in Appendix 4 are organised by these methods.
          Selecting the correct reference method is the first step in any cable sizing calculation.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method A</strong> — insulated conductors or single-core cables in conduit
                in a thermally insulating wall. Lowest current rating because the insulation
                prevents heat dissipation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method B</strong> — insulated conductors or single-core cables in conduit
                on a wall; multicore cables in conduit on a wall; cables in trunking (surface,
                skirting, dado). Moderate current rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method C</strong> — single-core or multicore cables clipped directly to
                a non-metallic or metallic surface. Good current rating because the cable
                surface is exposed to air.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Methods E and F</strong> — single-core or multicore cables on perforated
                horizontal or vertical cable trays; cables in free air. Higher current rating
                than Method C in some configurations due to improved convective cooling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method G</strong> — single-core or multicore cables spaced apart in free
                air (with cables separated by at least one cable diameter). Highest current rating
                of all methods because each cable has maximum exposure to cooling air.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, most domestic installations use Methods A (cables in insulated walls),
          B (cables in conduit on plaster or in trunking), and C (cables clipped direct). Commercial
          and industrial installations also use Methods E, F, and G on cable trays and in open
          cable management systems. See the{' '}
          <SEOInternalLink href="/cable-selection-guide">
            cable selection guide
          </SEOInternalLink>{' '}
          for guidance on choosing cable types for different applications.
        </p>
      </>
    ),
  },
  {
    id: 'method-a',
    heading: 'Method A — Enclosed in Thermally Insulating Wall',
    content: (
      <>
        <p>
          Method A applies to cables installed in conduit or trunking that is embedded in a
          thermally insulating wall, or cables that pass through sections of thermal insulation.
          This is the most thermally restrictive installation method and results in the lowest
          current-carrying capacity for any given conductor size.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical application</strong> — T&E cable buried in cavity wall insulation,
                cables in conduit embedded in insulated blockwork, or cables passing through roof
                insulation where they are in contact with the insulating material. The term
                "Method A" specifically covers the most restrictive case.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correction factor for full enclosure</strong> — where a cable is totally
                surrounded by thermal insulation for runs greater than approximately 500mm, BS 7671
                requires a correction factor of 0.5 (i.e. the current-carrying capacity is halved
                compared to the clipped-direct rating). This means a 2.5mm² T&E rated at 27A
                clipped direct can only carry approximately 13A when totally enclosed in insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shorter lengths</strong> — for cables passing through insulation for
                lengths of 500mm or less, a reduced correction factor applies. BS 7671 provides
                graduated factors for thermal insulation depths between 0mm and 500mm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common EICR finding</strong> — cables buried in loft insulation that
                were installed before the insulation was added are a frequent finding on EICRs.
                The original cable sizing may have been correct when clipped to the joist (Method C)
                but becomes inadequate once covered by insulation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'method-b',
    heading: 'Method B — Conduit on Wall, Trunking, and Cable Duct',
    content: (
      <>
        <p>
          Method B is one of the most widely used installation methods in both domestic and
          commercial electrical installations in the UK. It covers cables installed in conduit
          that is surface-mounted or buried in plaster (but not in thermal insulation), cables
          in surface trunking, cables in skirting board trunking, and cables in floor or
          ceiling ducts.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit on wall (surface)</strong> — PVC or metallic conduit surface-mounted
                on a plaster or masonry wall. The conduit conducts heat to the wall and dissipates
                it. Better than Method A (insulated wall) but not as good as Method C (direct
                clipping) for heat dissipation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface trunking</strong> — plastic or metallic trunking mounted on walls
                or ceilings. Trunking provides a protected cable route and is commonly used in
                commercial installations, schools, and industrial buildings where cables need to
                be accessible. The current rating under Method B for trunking is the same as for
                conduit (given the same conductor size and grouping).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cables in plaster</strong> — a multicore cable buried in plaster on a
                masonry wall (not in thermal insulation) is typically treated as Method B. The
                plaster conducts heat away from the cable, giving similar ratings to conduit
                on a surface.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grouping within conduit and trunking</strong> — when multiple cables share
                the same conduit or trunking, the grouping correction factor must be applied in
                addition to the Method B rating. A single cable in a conduit takes the full
                Method B rating; each additional cable reduces the effective rating of all cables
                in the group.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'method-c',
    heading: 'Method C — Clipped Direct to Surface',
    content: (
      <>
        <p>
          Method C — cables clipped directly to a surface — is one of the most common domestic
          installation methods and gives a higher current-carrying capacity than conduit or trunking
          installations of the same conductor size. The cable's outer surface is in direct contact
          with surrounding air, maximising convective heat dissipation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical applications</strong> — T&E flat twin-and-earth cable clipped
                to the face of ceiling joists in a roof space, SWA cable clipped to a wall in
                a commercial plant room, multicore control cable clipped to cable supports in
                an industrial installation. The cable is fixed but exposed to air on all sides.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current rating advantage</strong> — a 2.5mm² T&E cable has a tabulated
                current rating of 27A when clipped direct (Method C reference). The same cable
                in a conduit on a wall (Method B) is rated at approximately 20A. In a thermally
                insulated wall (Method A, fully enclosed), the rating falls to approximately 13A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grouping still applies</strong> — where multiple cables are clipped
                alongside each other (touching or in a flat bundle), the grouping correction
                factor must be applied. Two cables clipped side by side require a Cg of
                approximately 0.8; six or more cables require 0.57 or less.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical protection</strong> — cables clipped direct may require
                mechanical protection in locations where they are accessible and subject to
                damage risk. BS 7671 requires protection for cables in walls at depths less than
                50mm unless other protective measures (RCD protection, earthed metallic covering)
                are provided.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'method-e-f',
    heading: 'Methods E and F — Cable Tray and Free Air',
    content: (
      <>
        <p>
          Methods E and F apply to cables installed on cable trays or in free air, where improved
          convective cooling allows higher current ratings than surface-clipped cables in some
          configurations. These methods are common in commercial and industrial installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method E — multicore on perforated tray</strong> — multicore cables laid
                on a perforated horizontal cable tray with cables touching. The perforations in
                the tray allow air circulation above and below the cables, improving heat
                dissipation compared to a solid tray.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method F — single-core cables in trefoil or flat formation</strong> —
                single-core cables arranged in trefoil (triangular cross-section formation) or
                flat spaced formation on cable trays. Trefoil formation balances the magnetic
                fields from the three phases and gives better current ratings for large cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solid versus perforated trays</strong> — cables on a solid (non-perforated)
                tray have less ventilation and lower current ratings than on a perforated tray.
                The current rating for a solid tray is closer to Method B. Always check whether
                the tray is perforated or solid when selecting the reference method.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grouping on trays</strong> — the grouping correction factor for cables
                on a cable tray depends on the number of circuits and the spacing between cables.
                Where cables are touching, the grouping factor for the number of circuits applies
                as for bundled cables. Where cables are spaced at least one cable diameter apart,
                a less onerous grouping factor applies.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'method-g',
    heading: 'Method G — Spaced in Free Air',
    content: (
      <>
        <p>
          Method G applies to cables suspended in free air with a spacing of at least one cable
          diameter between adjacent cables. This gives the highest current rating of all reference
          methods for the same conductor size, because each cable is fully surrounded by circulating
          air with no adjacent cable restricting heat dissipation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Application</strong> — Method G is used for large single-core cables
                forming HV and LV distribution circuits suspended between supports in switchrooms,
                substations, and industrial plants. It is rarely applicable to domestic
                installations but may apply to large commercial or industrial sub-main cables
                suspended on cleats between structures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spacing requirement</strong> — the full Method G rating applies only when
                adjacent cables are separated by at least one cable diameter. If the spacing is
                less, a reduction in the current rating applies. The spacing must be maintained
                consistently along the run, not just at supports.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'grouping-factor',
    heading: 'Correction Factor for Grouping (Cg)',
    content: (
      <>
        <p>
          When multiple cables or circuits are installed together — in a bundle, in conduit or
          trunking, or side by side on a surface — each cable reduces the heat dissipation
          available to its neighbours. The grouping correction factor (Cg) accounts for this
          and must be applied to the tabulated current-carrying capacity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single circuit — Cg = 1.0</strong> — no derating required. One circuit
                alone in conduit, trunking, or clipped direct takes the full tabulated rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two circuits — Cg ≈ 0.80</strong> — effective current capacity is 80%
                of the tabulated rating. For example, a 2.5mm² cable with a Method B rating
                of 20A can only carry 16A in a group of two fully loaded circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three circuits — Cg ≈ 0.70</strong> — effective capacity is 70% of
                the tabulated rating. This is the most common grouping scenario in domestic
                and light commercial installations where multiple T&E cables share a conduit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Six circuits — Cg ≈ 0.57</strong> — effective capacity is 57% of the
                tabulated rating. Six or more fully loaded circuits in a group require
                significantly larger conductors than the load current alone would suggest.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Diversity consideration</strong> — the grouping factors above assume all
                circuits are fully loaded simultaneously. Where it is known that circuits will
                not all be at full load simultaneously (e.g. lighting and socket circuits in a
                domestic property), a diversity factor may allow a less onerous Cg to be used.
                This must be documented and justified in the design.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ambient-temperature',
    heading: 'Ambient Temperature Correction Factor (Ca)',
    content: (
      <>
        <p>
          The current-carrying capacity tables in BS 7671 Appendix 4 are based on a reference
          ambient temperature of 30°C. Where the actual installation temperature differs from
          this reference, a correction factor (Ca) must be applied.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher than 30°C — derate</strong> — cables in boiler rooms, kitchen
                ceilings, hot roof spaces, or industrial environments with elevated temperatures
                must be derated. At 40°C ambient, Ca for PVC cables is approximately 0.87. At
                50°C, Ca is approximately 0.71. At 60°C, Ca is approximately 0.50. The effective
                current capacity may need to be significantly increased by upsizing the conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lower than 30°C — uprate</strong> — cables in cold environments (unheated
                plant rooms, outdoor installations in the UK's temperate climate where ambient
                is typically well below 30°C) may be uprated. At 20°C ambient, Ca is approximately
                1.12 for PVC cables. This can allow a smaller conductor to be used in cold
                environments, though the voltage drop must still be checked.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>XLPE cables</strong> — XLPE-insulated cables have a maximum conductor
                temperature of 90°C (versus 70°C for PVC) and different Ca factors. The higher
                temperature rating means XLPE cables can operate in hotter environments than
                equivalent PVC cables, and are often specified for commercial and industrial
                installations for this reason.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'thermal-insulation',
    heading: 'Thermal Insulation Correction Factor (Ci)',
    content: (
      <>
        <p>
          Thermal insulation dramatically reduces the heat dissipation available to cables,
          particularly for T&E cables in domestic loft or wall insulation. BS 7671 provides
          specific correction factors for cables in contact with or enclosed by thermal insulation.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total enclosure in insulation</strong> — when a cable is totally enclosed
                in thermal insulation for a run exceeding approximately 500mm, BS 7671 requires
                the rated current to be reduced to 0.5 times the clipped-direct value. This
                effectively halves the cable's current capacity. A 2.5mm² T&E rated at 27A
                clipped direct can only carry approximately 13.5A when totally enclosed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>One side touching insulation</strong> — where a cable is clipped to the
                underside of a joist and the upper side is in contact with mineral wool loft
                insulation (touching but not enclosed), a less severe correction factor applies
                — approximately 0.75 for the same cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Combined factors</strong> — when both grouping and thermal insulation
                corrections apply, the combined effect is multiplicative. Two circuits fully
                enclosed in thermal insulation: Cg ≈ 0.80, Ci ≈ 0.50; effective capacity ≈ 40%
                of the clipped-direct tabulated rating. This is a very significant reduction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retrofit insulation</strong> — cables originally installed before thermal
                insulation was added to a property may now be enclosed in insulation and operating
                beyond their derated capacity. This is a common finding on EICRs of properties
                with subsequently added cavity or loft insulation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'practical-examples',
    heading: 'Practical Cable Sizing Examples',
    content: (
      <>
        <p>
          The following worked examples illustrate how reference installation methods and correction
          factors interact in common UK domestic and commercial scenarios.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic socket ring final circuit</strong> — design current (Ib) up to
                32A (protected by 32A MCB). Method C (clipped direct in roof void). Single
                circuit (Cg = 1.0). Ambient temperature 30°C (Ca = 1.0). No insulation. Tabulated
                rating of 2.5mm² T&E at Method C = 27A. 27A &lt; 32A — insufficient. However,
                a ring final circuit is treated differently as the ring reduces the effective
                current on each cable to approximately half the total load. Standard 2.5mm² ring
                final circuit is universally accepted practice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three lighting circuits in one conduit</strong> — each circuit has Ib of
                6A, protected by 6A MCB. Method B (conduit on wall). Three circuits (Cg ≈ 0.70).
                1.0mm² T&E at Method B = 13.5A. After grouping: 13.5 × 0.70 = 9.45A. This exceeds
                the 6A MCB rating, so 1.0mm² is adequate. If ambient temperature were 45°C,
                Ca ≈ 0.79: 13.5 × 0.70 × 0.79 ≈ 7.5A — still adequate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loft cable covered by insulation</strong> — a 2.5mm² T&E ring final
                circuit runs through the loft and is covered by 270mm of mineral wool insulation.
                Method A (fully enclosed): Ci ≈ 0.50 (for runs &gt;500mm). Method C reference
                for 2.5mm² = 27A. After insulation factor: 27 × 0.50 = 13.5A. The 32A MCB
                protection significantly exceeds the cable's derated capacity — this is an EICR
                finding requiring the cable to be raised above the insulation level or rerouted.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Recording Installation Methods',
    content: (
      <>
        <p>
          The reference installation method must be recorded on the Electrical Installation
          Certificate (EIC) Schedule of Test Results for each circuit. The installation method
          determines the maximum current the cable can carry and is the basis for the inspector's
          assessment during future EICRs.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Document Reference Methods on EIC</h4>
                <p className="text-white text-sm leading-relaxed">
                  For each circuit on the Schedule of Test Results, record the reference installation
                  method, the conductor csa, and any correction factors applied. Where multiple
                  installation methods apply along a single circuit (e.g. partly in conduit,
                  partly clipped direct), use the most onerous method for the design calculation.
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete all circuit fields on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR — Checking Installation Methods</h4>
                <p className="text-white text-sm leading-relaxed">
                  During an EICR, verify that cables are installed in accordance with the method
                  recorded on the original EIC (or as found where no EIC exists). Cables subsequently
                  covered by thermal insulation, or additional cables added to an existing conduit,
                  may now be operating in a more onerous method than originally designed for.
                  This may require recording as a C2 or C3 observation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICs and EICRs with full installation method documentation"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC and EICR completion with installation method recording, AI board scanning, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function InstallationMethodsGuidePage() {
  return (
    <GuideTemplate
      title="Cable Installation Methods BS 7671 | Reference Methods UK"
      description="Complete guide to cable installation reference methods under BS 7671. Methods A, B, C, E, F and G explained with correction factors for grouping, ambient temperature, and thermal insulation. Practical UK examples included."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wiring Guide"
      badgeIcon={Settings}
      heroTitle={
        <>
          Cable Installation Methods BS 7671:{' '}
          <span className="text-yellow-400">Reference Methods and Correction Factors Explained</span>
        </>
      }
      heroSubtitle="A complete practical guide to cable installation reference methods under BS 7671 — Methods A, B, C, E, F and G explained with correction factors for grouping, ambient temperature, and thermal insulation, plus practical sizing examples for common UK domestic and commercial scenarios."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Cable Installation Methods"
      relatedPages={relatedPages}
      ctaHeading="Complete EICs and EICRs with Correct Method Documentation"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC and EICR completion with installation method recording, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
