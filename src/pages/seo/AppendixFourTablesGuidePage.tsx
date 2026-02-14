import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  Calculator,
  Zap,
  Activity,
  FileText,
  Gauge,
  Thermometer,
  Layers,
  Cable,
  ArrowDownUp,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Calculators', href: '/tools/electrical-testing-calculators' },
  { label: 'Appendix 4 Tables', href: '/guides/appendix-4-tables-bs-7671' },
];

const tocItems = [
  { id: 'what-is-appendix-4', label: 'What Is Appendix 4?' },
  { id: 'table-overview', label: 'Table-by-Table Overview' },
  { id: 'reference-methods', label: 'Choosing the Reference Method' },
  { id: 'correction-factors', label: 'Applying Correction Factors' },
  { id: 'worked-example', label: 'Worked Example' },
  { id: 'common-errors', label: 'Common Errors' },
  { id: 'using-elec-mate', label: 'Using Elec-Mate for Cable Sizing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Appendix 4 of BS 7671:2018+A3:2024 contains the current-carrying capacity tables (Tables 4A1 to 4H5) used to select the correct cable size for every circuit.',
  'The correct table depends on the cable type (thermoplastic or thermosetting), conductor material (copper or aluminium), and installation reference method (A to G).',
  'Correction factors for ambient temperature (Ca), grouping (Cg), thermal insulation (Ci), and conductor operating temperature must be applied to the tabulated values to find the effective current-carrying capacity (Iz).',
  'Selecting the wrong table or omitting a correction factor is one of the most common causes of incorrectly sized cables in UK installations.',
  'Elec-Mate automates this process: select the cable type, reference method, and installation conditions — it applies the correct table and correction factors for you from its library of 50+ calculators.',
];

const faqs = [
  {
    question: 'What tables are in Appendix 4 of BS 7671?',
    answer:
      'Appendix 4 contains Tables 4A1 through to 4H5. The tables are organised by cable type and conductor material. Tables 4D1 to 4D5 cover single-core and multicore thermoplastic (PVC/PVC) cables — the most common type used in domestic installations. Tables 4E1 to 4E4 cover thermosetting (XLPE/SWA) cables used in commercial and industrial work. Tables 4A1 and 4A2 cover correction factors for ambient temperature and grouping. Tables 4B1 and 4B2 cover correction factors for conductors embedded in thermal insulation. Table 4C1 lists the installation reference methods (A1, A2, B, C, D, E, F, G) and describes each one. The key point is that you must select the correct table for your cable type before reading off the current-carrying capacity.',
  },
  {
    question: 'How do I know which table to use?',
    answer:
      'Start by identifying three things: the cable type (PVC/PVC, XLPE/SWA, mineral insulated, etc.), the conductor material (copper or aluminium), and the installation reference method (how the cable is installed — clipped direct, in conduit, in trunking, buried in the ground, etc.). The cable type and conductor material determine which group of tables to use (4D for thermoplastic copper, 4E for thermosetting copper, etc.). The reference method determines which column within that table to read. For example, a 2.5 mm² twin-and-earth PVC/PVC copper cable clipped direct to a surface uses Table 4D5, Reference Method C. The same cable installed in conduit in a wall would use Table 4D5 but with Reference Method A (which gives a lower current-carrying capacity because the conduit restricts heat dissipation).',
  },
  {
    question: 'What is the difference between Tables 4D1 and 4D5?',
    answer:
      'Table 4D1 covers single-core PVC thermoplastic cables (not enclosed in conduit or trunking), while Table 4D5 covers multicore cables such as flat twin-and-earth (T+E) — which is by far the most common cable in domestic installations. If you are using flat T+E cable (6242Y), you use Table 4D5. If you are using single-core cables pulled through conduit, you would use the appropriate column from Tables 4D1 or 4D2 depending on whether the cables are bunched together or spaced. Getting the wrong table is a common mistake — double-check whether you are using single-core or multicore cable before selecting the table.',
  },
  {
    question: 'What correction factors do I need to apply?',
    answer:
      'There are four main correction factors: Ca (ambient temperature correction from Table 4A2), Cg (grouping correction from Table 4A1 or Appendix B4), Ci (thermal insulation correction from Table 4B1 or 4B2), and Cc (correction for conductors not operating at their maximum permitted temperature). Ca adjusts for ambient temperatures above or below 30°C. Cg reduces the capacity when multiple cables are grouped together (for example, several circuits running through the same conduit or bunched on a tray). Ci applies when cables are in contact with or surrounded by thermal insulation. These factors multiply together: Iz = It × Ca × Cg × Ci. If any factor is omitted, the cable may be undersized.',
  },
  {
    question: 'Do I need to apply correction factors for every cable?',
    answer:
      'You need to consider every correction factor for every cable run, but some may not apply (effectively a factor of 1.0, meaning no reduction). For a cable clipped to a joist in a loft with no thermal insulation contact and no other cables grouped nearby, the ambient temperature factor may be 1.0 (if at 30°C), the grouping factor is 1.0 (single cable), and the insulation factor does not apply. In practice, at least one correction factor almost always applies — especially grouping (Cg), because multiple cables often leave the consumer unit together through the same void or conduit, even if they separate later. The section where cables are grouped (even for a short distance) determines the grouping factor for the entire run.',
  },
  {
    question: 'What is the most commonly used Appendix 4 table for domestic work?',
    answer:
      'Table 4D5 — which covers multicore thermoplastic (PVC) cables. This is the table for flat twin-and-earth (T+E) cable (6242Y), which is the standard cable used in most UK domestic installations for ring final circuits, radial circuits, lighting circuits, cooker circuits, and shower circuits. The table gives current-carrying capacities for reference methods A (enclosed in conduit in a thermally insulating wall), B (enclosed in conduit on a wall or in trunking), and C (clipped direct to a surface). For a 2.5 mm² T+E cable at reference method C, the current-carrying capacity is 27 A. At reference method A, it drops to 20 A. This difference is why the reference method matters — the same cable has a different capacity depending on how it is installed.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Automated cable sizing using Appendix 4 tables with correction factors applied.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/reference-methods-cable-installation',
    title: 'Reference Methods Guide',
    description: 'Detailed guide to installation reference methods A to G and when each applies.',
    icon: Layers,
    category: 'Guide',
  },
  {
    href: '/guides/correction-factors-guide',
    title: 'Correction Factors Guide',
    description:
      'How to apply ambient temperature, grouping, and thermal insulation correction factors.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/guides/voltage-drop-guide-bs-7671',
    title: 'Voltage Drop Guide',
    description: 'Calculating voltage drop and ensuring compliance with BS 7671 limits.',
    icon: ArrowDownUp,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-size-cables-bs-7671',
    title: 'How to Size Cables',
    description: 'End-to-end cable sizing process from design current to final cable selection.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/max-demand-calculation-guide',
    title: 'Max Demand Guide',
    description: 'Calculating max demand using diversity factors from BS 7671 Appendix A.',
    icon: Gauge,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-appendix-4',
    heading: 'What Is Appendix 4 of BS 7671?',
    content: (
      <>
        <p>
          Appendix 4 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          contains the current-carrying capacity tables that every UK electrician uses when sizing
          cables. These tables tell you the maximum current a cable can safely carry under specific
          installation conditions — the cable type, conductor material, and how it is installed.
        </p>
        <p>
          Without Appendix 4, you cannot size a cable. It is the reference point for every circuit
          design, whether you are wiring a domestic ring final circuit or specifying armoured cable
          for a commercial submain. The tables are not arbitrary — they are derived from the thermal
          properties of the cable insulation material and the heat dissipation characteristics of
          each installation method.
        </p>
        <p>
          The tables work in conjunction with the correction factors in Appendix 4 (Tables 4A1, 4A2,
          4B1, 4B2) and the{' '}
          <SEOInternalLink href="/guides/reference-methods-cable-installation">
            installation reference methods
          </SEOInternalLink>{' '}
          listed in Table 4C1. The process is: determine your design current (Ib), identify the
          reference method, apply correction factors, and then select a cable whose tabulated
          current-carrying capacity (It) is at least equal to the required capacity (Iz).
        </p>
      </>
    ),
  },
  {
    id: 'table-overview',
    heading: 'Table-by-Table Overview',
    content: (
      <>
        <p>
          Appendix 4 is structured logically. The tables are grouped by cable type and conductor
          material. Here is a summary of the key tables:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 font-semibold">Table</th>
                <th className="text-left py-3 pr-4 font-semibold">Cable Type</th>
                <th className="text-left py-3 pr-4 font-semibold">Common Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 pr-4 font-mono text-yellow-400">4A1/4A2</td>
                <td className="py-3 pr-4">Correction factors</td>
                <td className="py-3 pr-4">Grouping (4A1) and ambient temperature (4A2)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-yellow-400">4B1/4B2</td>
                <td className="py-3 pr-4">Correction factors</td>
                <td className="py-3 pr-4">Thermal insulation corrections</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-yellow-400">4C1</td>
                <td className="py-3 pr-4">Reference methods</td>
                <td className="py-3 pr-4">
                  Describes installation methods A1, A2, B, C, D, E, F, G
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-yellow-400">4D1-4D2</td>
                <td className="py-3 pr-4">Single-core PVC (copper)</td>
                <td className="py-3 pr-4">Cables in conduit or trunking</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-yellow-400">4D3-4D4</td>
                <td className="py-3 pr-4">Single-core PVC (aluminium)</td>
                <td className="py-3 pr-4">Aluminium conductors in conduit/trunking</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-yellow-400">4D5</td>
                <td className="py-3 pr-4">Multicore PVC (copper)</td>
                <td className="py-3 pr-4">Twin-and-earth — most common domestic cable</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-yellow-400">4E1-4E4</td>
                <td className="py-3 pr-4">Thermosetting (XLPE/SWA)</td>
                <td className="py-3 pr-4">Armoured cables for submains and external runs</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-yellow-400">4F1-4F2</td>
                <td className="py-3 pr-4">Mineral insulated (copper sheath)</td>
                <td className="py-3 pr-4">MI cable (MICC) for fire-rated circuits</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-yellow-400">4H1-4H5</td>
                <td className="py-3 pr-4">Flexible cables</td>
                <td className="py-3 pr-4">Flexible cords and cables</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          For most domestic work, you will use <strong>Table 4D5</strong> (multicore PVC copper
          cables — twin-and-earth). For commercial submains using SWA cable, you will typically use
          <strong> Tables 4E1 to 4E4</strong>. The correction factor tables (4A1, 4A2, 4B1, 4B2)
          apply to all cable types.
        </p>
      </>
    ),
  },
  {
    id: 'reference-methods',
    heading: 'Choosing the Correct Reference Method',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/reference-methods-cable-installation">
            installation reference method
          </SEOInternalLink>{' '}
          describes how the cable is physically installed — and it directly affects the
          current-carrying capacity. A cable enclosed in insulation dissipates heat less effectively
          than one clipped to an open surface, so its capacity is lower.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method A (A1/A2)</strong> — cables enclosed in conduit in a thermally
                insulating wall (e.g., PVC conduit chased into masonry). This gives the lowest
                current-carrying capacity for most cable sizes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method B</strong> — cables enclosed in conduit or trunking on a wall or
                ceiling surface. Slightly better heat dissipation than Method A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method C</strong> — cables clipped directly to a surface. Good heat
                dissipation, commonly used for T+E cable clipped to joists or walls.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method D</strong> — cables installed directly in the ground. Used for buried
                armoured cable runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Methods E, F, G</strong> — cables on open trays, ladders, or cleats with
                free air circulation. These give the highest current-carrying capacities.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The same 2.5 mm² T+E cable has a capacity of 20 A under Method A but 27 A under Method C.
          That difference can mean the difference between a 2.5 mm² and a 4 mm² cable being
          required. Always identify the most restrictive section of the cable run — if even a short
          section passes through thermal insulation or is enclosed in conduit, that section
          determines the reference method for the entire run.
        </p>
      </>
    ),
  },
  {
    id: 'correction-factors',
    heading: 'Applying Correction Factors',
    content: (
      <>
        <p>
          The current-carrying capacity values in the Appendix 4 tables assume standard conditions:
          an ambient temperature of 30°C, a single circuit (no grouping), and no thermal insulation
          contact. If any of these conditions are different, you must apply correction factors.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Thermometer className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Ca — Ambient Temperature (Table 4A2)</h4>
                <p className="text-white text-sm leading-relaxed">
                  If the ambient temperature where the cable is installed is above 30°C, the
                  correction factor is less than 1.0, reducing the capacity. For example, at 40°C
                  with PVC insulation, Ca = 0.87. Cables in a hot loft in summer or near heating
                  equipment may need this factor applied. Below 30°C, the factor is greater than
                  1.0, increasing capacity — but this is rarely used in design because you design
                  for worst-case conditions.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Layers className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cg — Grouping (Table 4A1)</h4>
                <p className="text-white text-sm leading-relaxed">
                  When multiple cables are installed together (bunched in conduit, on a tray, or
                  through the same hole in a joist), each cable's heat dissipation is reduced
                  because neighbouring cables also generate heat. The grouping factor reduces the
                  tabulated capacity. For example, 3 circuits bunched together gives Cg = 0.70. Six
                  circuits gives Cg = 0.57. This is one of the most commonly applied (and most
                  commonly forgotten) correction factors.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Ci — Thermal Insulation (Tables 4B1/4B2)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Cables in contact with or surrounded by thermal insulation cannot dissipate heat
                  effectively. If one side of the cable touches insulation, Ci = 0.75 (Table 4B2).
                  If the cable is completely surrounded by insulation for more than a short length,
                  the reduction is even more severe — Table 4B1 gives factors down to 0.5 depending
                  on the length enclosed. This is critical in loft spaces and stud walls with
                  insulation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The effective current-carrying capacity (Iz) is calculated as:{' '}
          <strong>Iz = It × Ca × Cg × Ci</strong>, where It is the tabulated value from the
          appropriate Appendix 4 table. The protective device rating (In) must be less than or equal
          to Iz, and Iz must be greater than or equal to the design current (Ib). The{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            Elec-Mate cable sizing calculator
          </SEOInternalLink>{' '}
          applies all of these factors automatically.
        </p>
      </>
    ),
  },
  {
    id: 'worked-example',
    heading: 'Worked Example: Selecting a Cable',
    content: (
      <>
        <p>
          Here is a practical example of using the Appendix 4 tables to size a cable for a domestic
          ring final circuit.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Given Information</h4>
          <ul className="space-y-2 text-white text-sm">
            <li>Circuit: Ring final circuit protected by 32 A MCB (In = 32 A)</li>
            <li>Cable: Flat twin-and-earth (T+E), PVC/PVC, copper conductors</li>
            <li>Installation: Clipped to joists in loft, one side touching loft insulation</li>
            <li>Ambient temperature: 35°C (hot loft in summer)</li>
            <li>Grouping: 3 circuits run together for 2 metres leaving the consumer unit</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Calculation</h4>
          <ul className="space-y-2 text-white text-sm">
            <li>
              <strong>Table:</strong> 4D5 (multicore PVC copper)
            </li>
            <li>
              <strong>Reference Method:</strong> C (clipped direct)
            </li>
            <li>
              <strong>Ca (35°C, PVC):</strong> 0.94 (from Table 4A2)
            </li>
            <li>
              <strong>Cg (3 circuits grouped):</strong> 0.70 (from Table 4A1)
            </li>
            <li>
              <strong>Ci (one side touching insulation):</strong> 0.75 (from Table 4B2)
            </li>
            <li>
              <strong>Required Iz:</strong> In / (Ca × Cg × Ci) = 32 / (0.94 × 0.70 × 0.75) = 32 /
              0.493 = <strong>64.9 A</strong>
            </li>
            <li>
              <strong>Check Table 4D5, Method C:</strong> 2.5 mm² = 27 A (too low), 4 mm² = 36 A
              (too low), 6 mm² = 46 A (too low), 10 mm² = 63 A (too low), 16 mm² = 85 A (sufficient)
            </li>
          </ul>
          <p className="text-white text-sm mt-3">
            <strong>Result:</strong> A 16 mm² cable would be needed under these conditions. However,
            this is a ring circuit — BS 7671 allows the ring to be treated as two parallel paths,
            effectively halving the required capacity. With the ring correction applied, 2.5 mm² T+E
            may still be adequate, but the designer must verify this properly including the{' '}
            <SEOInternalLink href="/guides/voltage-drop-guide-bs-7671">
              voltage drop
            </SEOInternalLink>{' '}
            calculation.
          </p>
        </div>
        <p>
          This example demonstrates why correction factors matter. Without them, 2.5 mm² T+E at 27 A
          looks adequate for a 32 A ring circuit. With correction factors applied, the effective
          capacity drops significantly. The{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            Elec-Mate cable sizing calculator
          </SEOInternalLink>{' '}
          does this entire process automatically.
        </p>
        <SEOAppBridge
          title="Size cables correctly in seconds"
          description="Select your cable type, reference method, and installation conditions. Elec-Mate applies the correct Appendix 4 table and all correction factors automatically, giving you the right cable size every time."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'common-errors',
    heading: 'Common Errors When Using the Tables',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Using the wrong table.</strong> Confusing Table 4D1 (single-core) with Table
                4D5 (multicore) is common. For flat T+E cable, always use 4D5. For single-core
                cables in conduit, use 4D1 or 4D2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wrong reference method.</strong> If the cable is in conduit chased into a
                wall, it is Method A — not Method C. Method C is for cables clipped directly to a
                surface without conduit. This mistake alone can result in using a cable one size too
                small.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Forgetting the grouping factor.</strong> Cables leaving a consumer unit
                often run together for a short distance before separating. That grouped section
                determines the grouping factor for the entire cable run. Six circuits leaving a CU
                through the same hole gives Cg = 0.57 — a 43% reduction in capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ignoring thermal insulation.</strong> A cable that passes through or touches
                loft insulation needs the Ci factor applied. Many electricians forget this when
                running cables through insulated loft spaces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Not checking{' '}
                  <SEOInternalLink href="/guides/voltage-drop-guide-bs-7671">
                    voltage drop
                  </SEOInternalLink>
                  .
                </strong>{' '}
                The Appendix 4 tables confirm the cable can carry the current safely, but they do
                not confirm the voltage drop is within limits. A cable might have adequate
                current-carrying capacity but still fail on voltage drop if the run is long. Both
                checks are required.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'using-elec-mate',
    heading: 'Using Elec-Mate for Cable Sizing',
    content: (
      <>
        <p>
          Manually looking up Appendix 4 tables and applying correction factors is time-consuming
          and error-prone — especially on site. Elec-Mate automates the entire process with its{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>
          , one of 50+ calculators built into the app.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Automated Table Selection</h4>
                <p className="text-white text-sm leading-relaxed">
                  Select the cable type (T+E, SWA, singles in conduit, etc.) and the reference
                  method. Elec-Mate automatically uses the correct Appendix 4 table — no risk of
                  picking the wrong one.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Thermometer className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Correction Factor Application</h4>
                <p className="text-white text-sm leading-relaxed">
                  Enter the ambient temperature, number of grouped circuits, and insulation
                  conditions. All correction factors (Ca, Cg, Ci) are applied automatically, and the
                  effective current-carrying capacity is shown clearly.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Activity className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete Suite of Calculators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Beyond cable sizing, Elec-Mate includes calculators for{' '}
                  <SEOInternalLink href="/guides/max-demand-calculation-guide">
                    max demand
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/guides/voltage-drop-guide-bs-7671">
                    voltage drop
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/guides/earth-fault-loop-impedance-calculation">
                    earth fault loop impedance (Zs)
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/guides/prospective-fault-current-explained">
                    PFC
                  </SEOInternalLink>
                  , adiabatic equation, conduit fill, trunking fill, power factor, diversity factor,
                  and three-phase power — over 50 calculators in total.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="All Appendix 4 tables in your pocket"
          description="Stop flipping through BS 7671 on site. Elec-Mate's cable sizing calculator applies the correct Appendix 4 table and correction factors automatically. Plus 50+ other calculators for UK electricians. 7-day free trial."
          icon={BookOpen}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AppendixFourTablesGuidePage() {
  return (
    <GuideTemplate
      title="Appendix 4 Tables BS 7671 | How to Use Them"
      description="Complete guide to using the Appendix 4 current-carrying capacity tables in BS 7671. Table-by-table overview, reference methods, correction factors for ambient temperature, grouping, and thermal insulation, with worked examples."
      datePublished="2025-04-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Appendix 4 Tables:{' '}
          <span className="text-yellow-400">How to Use Them for Cable Sizing</span>
        </>
      }
      heroSubtitle="Every cable size in every UK electrical installation is selected using the current-carrying capacity tables in Appendix 4 of BS 7671. This guide explains each table, how to select the right one, how to apply correction factors, and the common mistakes that lead to incorrectly sized cables."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About BS 7671 Appendix 4 Tables"
      relatedPages={relatedPages}
      ctaHeading="Size Cables Correctly Every Time"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's 50+ calculators including cable sizing with automatic Appendix 4 table selection and correction factor application. 7-day free trial, cancel anytime."
    />
  );
}
