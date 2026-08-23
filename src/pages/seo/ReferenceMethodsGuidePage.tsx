import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { CalculatorSurface } from '@/components/calculators/shared';
import CableDeratingCalculator from '@/components/apprentice/calculators/CableDeratingCalculator';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Layers,
  Calculator,
  Zap,
  Activity,
  BookOpen,
  FileText,
  Gauge,
  Cable,
  ArrowDownUp,
  Thermometer,
  Building2,
  GraduationCap,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Calculators', href: '/electrical-testing-calculators' },
  { label: 'Reference Methods', href: '/guides/reference-methods-cable-installation' },
];

const tocItems = [
  { id: 'what-are-reference-methods', label: 'What Are Reference Methods?' },
  { id: 'method-a', label: 'Method A' },
  { id: 'method-b', label: 'Method B' },
  { id: 'method-c', label: 'Method C' },
  { id: 'method-d', label: 'Methods D1 and D2' },
  { id: 'methods-efg', label: 'Methods E, F, and G' },
  { id: 'methods-100-102', label: 'Methods 100 to 103' },
  { id: 'choosing-method', label: 'How to Choose the Right Method' },
  { id: 'impact-on-capacity', label: 'Impact on Current-Carrying Capacity' },
  { id: 'calculator', label: 'Cable Derating Calculator' },
  { id: 'common-installations', label: 'Common Installation Scenarios' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 uses eight reference methods — A, B, C, D1, D2, E, F and G. Reg 521.2 requires the installation method to be in accordance with Table 4A2 of Appendix 4, and Table 4A2 tells you which reference method to use to look up current-carrying capacity.',
  'The same cable can have vastly different current-carrying capacities depending on the reference method — for example, 2.5 mm² T+E is rated at 20 A under Method A but 27 A under Method C.',
  'The most restrictive section of the cable run determines the reference method for the entire run, even if that restrictive section is only a short distance.',
  'Method C (clipped direct) is the most common for domestic T+E cable. Method A is specifically a conduit in a thermally insulated wall — a timber-framed wall with an insulated cavity. Conduit chased into masonry is Method B (Table 4A2, Installation Methods 59 and 60), and cable direct in masonry with capping is Method C (Installation Method 58).',
  'Reference Methods 100 to 103 in Table 4A2 cover flat twin-and-earth above a plasterboard ceiling or inside a stud wall with thermal insulation. Ratings come from Table 4D5 of BS 7671; Tables 7.1(iii) and 7.1(iv) of the IET On-Site Guide reproduce the same guidance for installers.',
  'Reg 622.85 of BS 7671 requires inspectors to verify that cables are adequate for current-carrying capacity, including the installation reference method and all applicable correction and grouping factors, as part of every EICR inspection.',
  'Elec-Mate handles reference method selection as part of its cable sizing calculator, automatically applying the correct column from the Appendix 4 tables across its suite of 70+ calculators.',
];

const faqs = [
  {
    question: 'What is a reference method in BS 7671?',
    answer:
      'A reference method is a standardised description of how a cable is installed. Table 4A2 of BS 7671 (Appendix 4) lists around 70 numbered installation methods and, against each one, the reference method — A, B, C, D1, D2, E, F or G — to be used to determine current-carrying capacity. Each reference method describes a specific physical arrangement: a cable in conduit in a thermally insulated wall (Method A), a cable clipped directly to a wooden or masonry wall (Method C), a multicore cable in free air, for example on a perforated tray (Method E). Regulation 521.2 requires the installation method to be in accordance with Table 4A2, and Regulation 523.2 requires the design current not to exceed the tabulated capacity read from Appendix 4 with reference to Table 4A2, subject to any necessary rating factors. Different reference methods give different capacities for the same cable because the installation arrangement affects how well the cable can dissipate heat. A cable in free air on a perforated tray dissipates heat much more effectively than one enclosed in conduit in an insulated wall.',
  },
  {
    question: 'Which reference method is most common for domestic work?',
    answer:
      'For domestic installations using flat twin-and-earth (T+E) cable, the most common reference method by far is Method C — cable clipped direct to a wooden or masonry wall, joist or batten (Table 4A2, Installation Method 20). Cable run direct in masonry with added mechanical protection such as capping is also Method C (Installation Method 58). A common mistake is to call conduit chased into masonry "Method A". It is not: conduit in masonry of thermal resistivity not greater than 2 K.m/W is Reference Method B (Installation Methods 59 and 60), and conduit mounted on the surface of a wooden or masonry wall is also Method B (Installation Methods 4 and 5). Method A is reserved for a conduit in a thermally insulated wall — an outer weatherproof skin, thermal insulation, and an inner skin of wood or similar with a thermal conductance of at least 10 W/m²K, where heat can only escape through the inner skin. That is a timber-framed construction, not a solid masonry wall. Where a run passes through more than one arrangement, size the cable for the most restrictive section.',
  },
  {
    question: 'What if the cable changes installation method along its route?',
    answer:
      'If a cable route includes sections installed under different reference methods — for example, clipped to joists (Method C) for most of the run but enclosed in surface conduit for a section (Method B) — the most restrictive method applies to the entire cable run. This is because the cable must be sized for the worst-case conditions it encounters along its route. A cable that is adequately rated for Method C may be underrated for Method B or Method A. The only exception is if the restrictive section is very short and has no significant impact on the cable temperature — BS 7671 and the IET Guidance Notes allow some engineering judgement here, but the default approach is to use the most restrictive method for the full run.',
  },
  {
    question: 'When would I use Method D1 or D2 for buried cables?',
    answer:
      'BS 7671 splits the buried case in two. Reference Method D1 is a cable drawn into a duct or cable ducting in the ground (Table 4A2, Installation Method 70). Reference Method D2 is a sheathed, armoured or multicore cable laid direct in the ground (Installation Methods 72 and 73). Both apply to the usual armoured cable (SWA) run supplying an outbuilding, garage, garden office or external lighting. The tabulated capacities in Appendix 4 assume soil of thermal resistivity 2.5 K.m/W at a depth of 0.7 m, and for D1 a 100 mm diameter duct in direct contact with the soil. Appendix 4 states these are conservative parameters: if the actual ground conditions are known, the cable manufacturer or the ERA 69-30 series may allow a smaller cable. Where the soil resistivity differs from 2.5 K.m/W, apply the rating factors in Table 4B3; where the laying depth differs from 0.7 m, apply Table 4B4. Method D capacities are given in the armoured cable tables — Table 4D4A for 70 °C thermoplastic armoured and Table 4E4A for 90 °C thermosetting (XLPE) armoured.',
  },
  {
    question: 'What is the difference between Methods E, F, and G?',
    answer:
      'This is the most commonly misunderstood part of Appendix 4. E, F and G are not tray, ladder and cleat — Appendix 4 treats perforated tray, wire mesh tray, brackets, ladder, cleats, ties and hangers all as "Reference Method E or F". What separates E, F and G is the cable and its spacing, all of them in free air: Method E is a multicore cable in free air (the rating factor Table 4C4 is expressly for multicore cables in free air, Reference Method E); Method F is single-core cables in free air touching, whether in trefoil or flat formation (Table 4C5 is for circuits of single-core cables, Reference Method F); Method G is single-core cables in free air spaced apart, the Appendix 4 tables using a spacing of one cable diameter, which reduces mutual heating between the cables. Appendix 4 defines a perforated tray as one whose holes occupy at least 30 % of the base area — an unperforated tray, or one with less than 30 % open area, is Reference Method C, not E or F. A ladder system qualifies where the metalwork under the cables occupies less than 10 % of the plan area. Free-air methods give the highest capacities because heat dissipation is maximised; they are rarely used in domestic work but common on commercial and industrial submains and distribution cables.',
  },
  {
    question: 'Does the reference method affect voltage drop calculations?',
    answer:
      'The reference method itself does not directly change the voltage drop per metre — the mV/A/m values in Appendix 4 are the same regardless of installation method. However, the reference method indirectly affects voltage drop because it determines the cable size you select. A more restrictive reference method (like Method A) may require a larger cable to meet current-carrying capacity requirements, and a larger cable has a lower voltage drop per metre. So while the voltage drop formula is independent of the reference method, the cable size — which is determined partly by the reference method — directly affects the result. The Elec-Mate cable sizing calculator checks both current-carrying capacity and voltage drop simultaneously.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/appendix-4-tables-bs-7671',
    title: 'Appendix 4 Tables Guide',
    description: 'How to use the current-carrying capacity tables in BS 7671 for cable selection.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Automated cable sizing with reference method selection and correction factor application.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/correction-factors-bs-7671',
    title: 'Correction Factors Guide',
    description:
      'Ambient temperature, grouping, and thermal insulation correction factors explained.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/guides/voltage-drop-limits-bs-7671',
    title: 'Voltage Drop Guide',
    description:
      'Calculating voltage drop for cable runs and ensuring compliance with BS 7671 limits.',
    icon: ArrowDownUp,
    category: 'Guide',
  },
  {
    href: '/how-to-size-cables',
    title: 'How to Size Cables',
    description:
      'Complete cable sizing process from design current through to final cable selection.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/max-demand-calculation-guide',
    title: 'Max Demand Guide',
    description:
      'Calculating max demand using diversity factors before sizing the incoming supply cable.',
    icon: Gauge,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-are-reference-methods',
    heading: 'What Are Installation Reference Methods?',
    content: (
      <>
        <p className="text-white">
          Already know which method applies and just need the number?{' '}
          <a
            href="#calculator"
            className="inline-flex h-11 items-center rounded-full border border-elec-yellow/40 px-4 text-[13.5px] font-semibold text-elec-yellow touch-manipulation transition-colors hover:bg-elec-yellow/10"
          >
            Use the free cable derating calculator
          </a>{' '}
          further down this page — no sign-up needed.
        </p>
        <p>
          Installation reference methods are standardised descriptions of how a cable is physically
          installed in a building or site. Table 4A2 of Appendix 4 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          lists around 70 numbered installation methods and gives, against each one, the reference
          method to be used to determine current-carrying capacity. Regulation 521.2 requires the
          installation method of a wiring system to be in accordance with Table 4A2, and Regulation
          523.2 requires the current in the cable not to exceed the value read from Appendix 4 with
          reference to Table 4A2, subject to any necessary rating factors. The reference method you
          select determines which column of the{' '}
          <SEOInternalLink href="/guides/appendix-4-tables-bs-7671">
            Appendix 4 current-carrying capacity tables
          </SEOInternalLink>{' '}
          you read, and therefore the maximum current the cable can safely carry.
        </p>
        <p>
          The reason reference methods matter is heat dissipation. A cable generates heat when it
          carries current (I²R losses). How effectively that heat can escape into the surrounding
          environment depends entirely on the physical installation arrangement. A cable in free air
          on an open tray can shed heat freely in all directions. The same cable enclosed in conduit
          inside a masonry wall, surrounded by plaster and possibly thermal insulation, cannot
          dissipate heat nearly as well — so its safe current-carrying capacity is lower.
        </p>
        <p>
          BS 7671 uses eight reference methods: A, B, C, D1, D2, E, F and G. (Cable calculation
          software sometimes shows the IEC subdivisions A1/A2 and B1/B2 for single-core versus
          multicore cables; the Appendix 4 tables in BS 7671 do not use them — the single-core and
          multicore cases are separate tables instead.) Each method represents a different
          installation arrangement, from the most restrictive (enclosed in a thermally insulated
          wall) to the least restrictive (free air). Selecting the correct reference method is not
          optional — it is a required step in every cable sizing calculation. Table 4A2 is not a
          closed list: Regulation 521.2 permits other installation methods provided they meet the
          requirements of Chapter 52, and Appendix 4 notes that the evaluation of current-carrying
          capacity may then need to be based on experimental work.
        </p>
        <SEOAppBridge
          title="BS 7671 Reference Method C: Current Capacity"
          description="BS 7671 Reference Method C for cables clipped direct to surface. Check Appendix 4:2026 current ratings in seconds. Avoid undersizing on site."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'method-a',
    heading: 'Method A: Enclosed in a Thermally Insulated Wall',
    content: (
      <>
        <p>
          Method A covers cables in conduit inside a thermally insulated wall. Appendix 4 describes
          the wall precisely: an outer weatherproof skin, thermal insulation, and an inner skin of
          wood or wood-like material with a thermal conductance of at least 10 W/m²K. The conduit
          sits close to — but not necessarily touching — the inner skin, and heat from the cables is
          assumed to escape through the inner skin only. The conduit may be metal or plastic.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation Method 1:</strong> Non-sheathed cables in conduit in a
                thermally insulated wall. This is the most restrictive of the common reference
                methods and gives the lowest current-carrying capacities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation Method 2:</strong> Multicore cable in conduit in a thermally
                insulated wall. Installation Method 3 covers a multicore cable run direct in the
                same wall construction. All three are read against Reference Method A.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/30 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-300 mt-0.5 shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong>Common mistake:</strong> conduit chased into masonry is <em>not</em> Method A.
              Appendix 4 defines masonry as brickwork, concrete, plaster and the like, explicitly
              excluding thermally insulating materials. Conduit in masonry of thermal resistivity
              not greater than 2 K.m/W is <strong>Reference Method B</strong> (Table 4A2,
              Installation Methods 59 and 60). Cable run direct in masonry with added mechanical
              protection such as capping is <strong>Reference Method C</strong> (Installation Method
              58). Method A belongs to timber-framed and similar insulated wall constructions.
            </p>
          </div>
        </div>
        <p>
          <strong>When it applies:</strong> Conduit run inside a timber-framed or otherwise
          thermally insulated wall, and — per Appendix 4 — a cable installed in a ceiling, which it
          treats as similar to Reference Method A. Appendix 4 also warns that higher ambient
          temperatures can arise in ceiling-mounted junction boxes serving luminaires, in the region
          of 40 °C to 50 °C, in which case a rating factor from Table 4B1 must be applied.
        </p>
        <p>
          <strong>Capacity example:</strong> A 2.5 mm² T+E cable under Method A has a
          current-carrying capacity of just 20 A. Compare this with 27 A under Method C. That 7 A
          difference can determine whether you need to use 4 mm² cable instead of 2.5 mm².
        </p>
      </>
    ),
  },
  {
    id: 'method-b',
    heading: 'Method B: Enclosed in Conduit or Trunking, or in Masonry',
    content: (
      <>
        <p>
          Method B covers cables enclosed in conduit or trunking on a wooden or masonry wall, and
          conduit or ducting buried in masonry. Appendix 4 describes the reference case as conduit
          mounted such that the gap between the conduit and the surface is less than 0.3 times the
          conduit diameter; the conduit may be metal or plastic. It notes that where the conduit is
          fixed to a masonry wall, rather than a wooden one, the actual capacity may be higher than
          tabulated.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-3 text-white text-sm">
            <li>
              Surface-mounted PVC or steel conduit on a wooden or masonry wall (Installation Methods
              4 and 5)
            </li>
            <li>
              Cables in cable trunking on a wooden or masonry wall, run horizontally or vertically
              (Installation Methods 6 to 9)
            </li>
            <li>
              Conduit chased into masonry of thermal resistivity not greater than 2 K.m/W
              (Installation Methods 59 and 60)
            </li>
            <li>
              Cable fixed directly under a wooden or masonry ceiling (Installation Methods 21 to 23)
              — Appendix 4 requires Method B here, not Method C, because natural air convection is
              reduced
            </li>
          </ul>
        </div>
        <p>
          Method B gives higher current-carrying capacities than Method A because the enclosure is
          not surrounded by thermal insulation. It is still lower than Method C (clipped direct)
          because the conduit or trunking restricts airflow around the cable. Note that the
          tabulated Method B values are for a <strong>single circuit</strong>: where more than one
          circuit shares the trunking, the group rating factor from Table 4C1 applies, whether or
          not there is an internal barrier or partition.
        </p>
        <p>
          <strong>Common use:</strong> Commercial and industrial installations where cables are run
          in surface-mounted conduit or trunking for protection and appearance. Also used in
          domestic garages, workshops, and utility rooms where surface wiring is acceptable.
        </p>
      </>
    ),
  },
  {
    id: 'method-c',
    heading: 'Method C: Clipped Direct to a Surface',
    content: (
      <>
        <p>
          Method C is the most common reference method for domestic installations using flat
          twin-and-earth (T+E) cable. Appendix 4 describes it as single-core or multicore cable
          fixed on, or spaced less than 0.3 times the cable diameter from, a wooden or masonry wall
          (Installation Method 20) — no conduit or trunking enclosure. Where the cable is fixed to
          or embedded in a masonry wall rather than a wooden one, Appendix 4 notes the actual
          capacity may be higher than tabulated.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-3 text-white text-sm">
            <li>T+E cable clipped to joists in a loft</li>
            <li>T+E cable clipped to battens on a wall</li>
            <li>
              Cable run direct in masonry with added mechanical protection such as capping
              (Installation Method 58)
            </li>
            <li>SWA cable clipped to a wall with saddle clips</li>
            <li>
              Cables on an <strong>unperforated</strong> tray (Installation Method 30) — with item 2
              of Table 4C1 applied
            </li>
            <li>Cable on a floor — Appendix 4 states Method C applies for current rating purposes</li>
          </ul>
        </div>
        <p>
          Method C provides good heat dissipation because the cable is in contact with the mounting
          surface on one side and exposed to air on the other. The mounting surface (wood, masonry,
          plaster) absorbs and conducts some heat away from the cable, while the exposed side
          radiates and convects heat into the air.
        </p>
        <p>
          <strong>Watch the ceiling case.</strong> A cable clipped to joists is Method C, but a
          cable fixed directly <em>under</em> a wooden or masonry ceiling is Reference Method B in
          Table 4A2, because convection around the cable is reduced. And a T+E cable above a
          plasterboard ceiling or inside a stud wall containing thermal insulation is not Method C
          at all — it falls under Reference Methods 100 to 103, covered below.
        </p>
        <p>
          <strong>Capacity example:</strong> A 2.5 mm² T+E cable under Method C has a
          current-carrying capacity of 27 A — a 35% increase over Method A (20 A) for the same
          cable. This is why the reference method selection has such a significant impact on cable
          sizing decisions.
        </p>
        <p>
          <strong>Important note:</strong> If a cable that is mostly clipped to joists (Method C)
          passes through a section of conduit in a wall (Method B) or through a thermally insulated
          wall (Method A) at any point, the more restrictive method applies to the entire run.
          Design for the worst case.
        </p>
      </>
    ),
  },
  {
    id: 'method-d',
    heading: 'Methods D1 and D2: In the Ground',
    content: (
      <>
        <p>
          BS 7671 splits the buried case into two reference methods, and mixing them up is a common
          source of undersized cable. This is the standard territory for armoured cable (SWA) runs
          supplying outbuildings, garages, garden offices, external lighting, and any other
          installation that requires an underground route.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method D1 — in a duct:</strong> Multicore armoured cable in conduit or cable
                ducting in the ground (Table 4A2, Installation Method 70). The reference case is a
                100 mm diameter plastic, earthenware or metallic duct in direct contact with the
                soil.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method D2 — direct in the ground:</strong> Sheathed, armoured or multicore
                cable laid direct in the ground, with or without added mechanical protection such as
                cable covers (Installation Methods 72 and 73).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reference conditions:</strong> Both D1 and D2 assume soil of thermal
                resistivity 2.5 K.m/W at a depth of 0.7 m. Appendix 4 calls these conservative
                parameters and points to the cable manufacturer or the ERA 69-30 series where the
                actual ground conditions are known. Use Table 4B3 for soil resistivities other than
                2.5 K.m/W, Table 4B4 for laying depths other than 0.7 m, and Table 4B2 for ground
                temperatures other than 20 °C.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable protection:</strong> SWA cable provides its own mechanical protection
                via the steel wire armour. The cable is typically laid on a bed of fine sand or
                sieved fill, covered with more sand, and then protected with cable warning tiles or
                tape before backfilling. BS 7671 does not itself specify a burial depth — depth is
                set by the risk of disturbance at that location and by the relevant utility or site
                guidance, and any departure from 0.7 m is corrected using Table 4B4.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Method D is unique because the thermal environment (soil) is very different from air. The
          D1 and D2 capacities are given in separate columns of the armoured cable tables in{' '}
          <SEOInternalLink href="/guides/appendix-4-tables-bs-7671">Appendix 4</SEOInternalLink> —
          Table 4D4A for 70 °C thermoplastic armoured cable and Table 4E4A for 90 °C thermosetting
          (XLPE) armoured cable. Grouping of buried cables (multiple circuits in the same trench)
          also has a significant impact: use <strong>Table 4C2</strong> for cables buried directly
          in the ground and <strong>Table 4C3</strong> for single cables in ducts buried in the
          ground — not the Table 4C1 factors used for cables in air.
        </p>
      </>
    ),
  },
  {
    id: 'methods-efg',
    heading: 'Methods E, F, and G: Free Air Installation',
    content: (
      <>
        <p>
          Methods E, F and G all cover cables installed in free air — on perforated trays, ladders,
          brackets, cleats, ties or hangers — where air can circulate freely around the cable. These
          methods give the highest current-carrying capacities because heat dissipation is
          maximised. What separates E from F from G is <strong>not</strong> the support system, as
          is often assumed: Table 4A2 gives &ldquo;E or F&rdquo; for perforated tray, wire mesh
          tray, brackets, ladder and support wire alike. The split is by cable type and spacing.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <div className="flex items-start gap-4">
              <Layers className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Method E: Multicore Cable in Free Air</h4>
                <p className="text-white text-sm leading-relaxed">
                  A multicore cable — two-core, three-core or four-core — in free air, for example
                  on a horizontal or vertical perforated tray. Table 4C4, the grouping factor table
                  for more than one multicore cable, is expressly for &ldquo;multicore cables in
                  free air — Reference Method E&rdquo;. Common in commercial and industrial cable
                  management for distribution cables and submains.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Layers className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Method F: Single-Core Cables Touching, in Free Air
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Single-core cables in free air in contact with one another — in trefoil, or laid
                  flat and touching. Table 4C5, the grouping factor table for circuits of
                  single-core cables, is expressly for &ldquo;one circuit of single-core cables in
                  free air — Reference Method F&rdquo;. Typical of large power cables in industrial
                  installations, switchrooms and plant rooms on ladder, tray or cleats.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Layers className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Method G: Single-Core Cables Spaced, in Free Air
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Single-core cables in free air spaced apart rather than touching — the Appendix 4
                  columns are based on a spacing of one cable diameter. Reducing mutual heating
                  between the cables gives the highest capacities of the three free-air methods.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Appendix 4 sets thresholds for whether a support system counts as free air at all. A
          perforated tray must have a regular pattern of holes occupying at least 30 % of the base
          area — a tray with no holes, or with less than 30 % open area, is Reference Method C, not
          E or F. A ladder system qualifies where the metalwork under the cables occupies less than
          10 % of the plan area. And free-air capacities may only be used where the clearance
          between the cable and any adjacent surface is at least 0.3 times the cable diameter for
          multicore cables, or 1.0 times the cable diameter for single-core cables.
        </p>
        <p>
          These methods are rarely used in domestic work but are essential for commercial and
          industrial installations. The higher current-carrying capacities they provide can mean
          smaller (and cheaper) cables for the same circuit, which makes a significant cost
          difference on large installations with many long cable runs.
        </p>
      </>
    ),
  },
  {
    id: 'methods-100-102',
    heading: 'Methods 100 to 103: Flat Twin-and-Earth in Thermal Insulation',
    content: (
      <>
        <p>
          Alongside the lettered reference methods, Table 4A2 of BS 7671 carries a separate section
          headed &ldquo;Installation methods for flat twin and earth cables in thermal
          insulation&rdquo;, giving four numbered methods — <strong>100, 101, 102 and 103</strong>.
          These are the methods that apply to almost every domestic rewire. They are not an On-Site
          Guide invention: they are in BS 7671 itself, and the ratings for all four come from Table
          4D5.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method 100:</strong> Flat twin-and-earth clipped direct to a wooden joist,
                or touching the plasterboard ceiling surface, above a plasterboard ceiling with
                thermal insulation <strong>not exceeding 100 mm</strong> in thickness (minimum U
                value 0.1 W/m²K).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method 101:</strong> The same arrangement, but with the thermal insulation{' '}
                <strong>exceeding 100 mm</strong> in thickness. The extra insulation depth is the
                only difference between 100 and 101 — and it is the difference that most often gets
                missed on a loft that has since been topped up.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method 102:</strong> Flat twin-and-earth in a stud wall containing thermal
                insulation, with the cable <strong>touching the inner wall surface</strong> (or
                touching the plasterboard ceiling surface), the inner skin having a minimum U value
                of 10 W/m²K.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method 103:</strong> The same stud wall, but with the cable{' '}
                <strong>not touching</strong> the inner wall surface. Guides that stop at 102 miss
                this one — it is a distinct column in Table 4D5.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Table 4A2 adds the overriding instruction: wherever practicable, a cable is to be fixed in
          a position such that it will not be covered with thermal insulation, and points to
          Regulation 523.9 and BRE guidance on avoiding overheating. The IET On-Site Guide
          reproduces the same material in Tables 7.1(iii) and 7.1(iv), noting that Methods 100, 101
          and 102 all require the cable to be in contact with the plasterboard or the joists. Where
          a cable is instead <em>surrounded</em> by thermal insulation for more than 0.5 m and no
          more precise information is available, the On-Site Guide requires the capacity to be taken
          as 0.5 times the Method C value.
        </p>
        <p>
          <strong>Practical note:</strong> These scenarios are very common in domestic rewires and
          first-fix work. Any T+E cable that runs through a stud wall or above a plasterboard
          ceiling in a void containing thermal insulation must be assessed against Methods 100 to
          103 rather than simply defaulting to Method C.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-method',
    heading: 'How to Choose the Right Reference Method',
    content: (
      <>
        <p>Selecting the correct reference method is a three-step process:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Survey the entire cable route.</strong> Walk the route from the distribution
              board to the final point. Note every section: through the wall in conduit, clipped to
              joists, through a floor void, passing through insulation, on a tray, etc.
            </li>
            <li>
              <strong>Identify the reference method for each section.</strong> Find the numbered
              installation method that matches the physical arrangement in Table 4A2 of Appendix 4,
              then read across to the reference method column (for domestic final circuits, column 4
              of Table 7.1(ii) of the IET On-Site Guide lists the installation methods the tabulated
              circuit lengths assume). Match the arrangement, not the name you would give it on
              site.
            </li>
            <li>
              <strong>Use the most restrictive method for the whole run.</strong> If the cable
              passes through multiple installation arrangements, the section with the lowest
              current-carrying capacity determines the reference method for the entire cable. Design
              for the worst case.
            </li>
          </ol>
        </div>
        <p>
          In practice, for most domestic work the choice is between Method C (clipped direct),
          Method B (conduit or trunking, including conduit chased into masonry, and cable fixed
          directly under a ceiling) and Methods 100 to 103 (T+E above a plasterboard ceiling or in
          an insulated stud wall). Method A only comes in where the wall is a thermally insulated
          construction. For commercial work with tray and trunking, you may be choosing between
          Method B (trunking) and Method E or F (perforated tray, ladder or cleats, depending on
          whether the cable is multicore or single-core). Always document your reference method
          choice — it forms part of the design records required by BS 7671.
        </p>
        <SEOAppBridge
          title="70+ calculators built for UK electricians"
          description="Cable sizing, voltage drop, max demand, Zs, PFC, adiabatic equation, conduit fill, trunking fill, power factor, diversity factor…"
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'impact-on-capacity',
    heading: 'Impact on Current-Carrying Capacity',
    content: (
      <>
        <p>
          The difference in current-carrying capacity between reference methods is substantial. Here
          is a comparison for common cable sizes using Table 4D5 (multicore PVC copper T+E):
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 font-semibold">Cable Size</th>
                <th className="text-left py-3 pr-4 font-semibold">Method A (A)</th>
                <th className="text-left py-3 pr-4 font-semibold">Method B (A)</th>
                <th className="text-left py-3 pr-4 font-semibold">Method C (A)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 pr-4">1.5 mm²</td>
                <td className="py-3 pr-4">14.5</td>
                <td className="py-3 pr-4">17.5</td>
                <td className="py-3 pr-4">20</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">2.5 mm²</td>
                <td className="py-3 pr-4">20</td>
                <td className="py-3 pr-4">24</td>
                <td className="py-3 pr-4">27</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">4 mm²</td>
                <td className="py-3 pr-4">27</td>
                <td className="py-3 pr-4">32</td>
                <td className="py-3 pr-4">37</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">6 mm²</td>
                <td className="py-3 pr-4">34</td>
                <td className="py-3 pr-4">40</td>
                <td className="py-3 pr-4">47</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">10 mm²</td>
                <td className="py-3 pr-4">46</td>
                <td className="py-3 pr-4">54</td>
                <td className="py-3 pr-4">64</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">16 mm²</td>
                <td className="py-3 pr-4">61</td>
                <td className="py-3 pr-4">73</td>
                <td className="py-3 pr-4">85</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          As you can see, the difference between Method A and Method C is approximately 25 to 40%
          for the same cable. This can easily mean the difference between a 2.5 mm² and a 4 mm²
          cable, or a 6 mm² and a 10 mm² cable. The cost and physical size difference is significant
          — especially for long runs or when conduit sizing is a constraint.
        </p>
        <p>
          These tabulated values are <strong>before</strong>{' '}
          <SEOInternalLink href="/guides/correction-factors-bs-7671">
            correction factors
          </SEOInternalLink>{' '}
          for grouping, ambient temperature, and thermal insulation are applied. After applying
          those factors, the effective capacity is lower still. The{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            Elec-Mate cable sizing calculator
          </SEOInternalLink>{' '}
          handles all of this in one step.
        </p>
      </>
    ),
  },
  {
    id: 'calculator',
    heading: 'Work Out the Derated Capacity for Your Reference Method',
    content: (
      <>
        <p className="text-white">
          Free to use, and no sign-up or account needed.
        </p>
        <p>
          The table above gives the tabulated current for each reference method. That figure is the
          starting point, not the answer. Take the value from the column for your reference method —
          27 A for 2.5 mm² T+E on Method C, 20 A on Method A — enter it as the base current rating,
          then set the conditions the cable actually sees: ambient temperature, how many circuits are
          grouped together, whether it is surrounded by thermal insulation, and for a buried run the
          soil thermal resistivity and cable spacing.
        </p>
        <p>
          The calculator applies the rating factors from Tables 4B1 (Ca), 4C1 and 4C2 (Cg), Appendix
          4 Section 2.6 (Ci) and Table 4B3 (Cs), plus Cf for a BS 3036 semi-enclosed fuse and Cc for
          a buried installation, and returns Iz. Give it a design current and device rating as well
          and it checks Ib ≤ In ≤ Iz for you.
        </p>
        <CalculatorSurface>
          <CableDeratingCalculator />
        </CalculatorSurface>
      </>
    ),
  },
  {
    id: 'common-installations',
    heading: 'Common Installation Scenarios',
    content: (
      <>
        <p>
          Here are the reference methods for the most common cable installation scenarios you will
          encounter:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Domestic Ring Final Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  T+E clipped to joists under the floor and dropping down through conduit chased
                  into a masonry wall to socket outlets. The section clipped to joists is Method C;
                  the conduit in masonry is Method B (Installation Methods 59 and 60), not Method A.{' '}
                  <strong>Use Method B for the whole run.</strong> If the drop is instead in an
                  insulated stud wall, it becomes Method 102 or 103.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Shower Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  Dedicated circuit from the consumer unit to the shower. Cable typically clipped to
                  joists (Method C) then dropping through the bathroom wall in conduit chased into
                  masonry (Method B).{' '}
                  <strong>Use the most restrictive section — here, Method B.</strong> Where the run
                  crosses a loft with insulation over it, Method 100 or 101 will usually govern
                  instead. Given the high design current, the reference method has a significant
                  impact on the cable size required.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">SWA to Outbuilding</h4>
                <p className="text-white text-sm leading-relaxed">
                  Armoured cable from the main distribution board, through the wall, buried in the
                  ground across the garden, and into the outbuilding. The section inside each
                  building clipped to the wall is Method C; the buried section is Method{' '}
                  <strong>D2</strong> if laid direct in the ground, or Method <strong>D1</strong> if
                  drawn into a duct. <strong>Size on the buried section</strong> — and check whether
                  the ground conditions match the tabulated 2.5 K.m/W at 0.7 m before using the
                  figures unadjusted.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Commercial Distribution</h4>
                <p className="text-white text-sm leading-relaxed">
                  Submain cables on perforated cable tray from the main switchboard to a
                  sub-distribution board. <strong>Method E</strong> for a multicore submain on the
                  tray, or <strong>Method F</strong> for single-core cables touching (
                  <strong>G</strong> if they are spaced). Check the tray is genuinely perforated —
                  at least 30 % open base area — or it reverts to Method C. If the cable enters
                  trunking at any point, that section becomes Method B. Use the most restrictive
                  method, or size each section individually if the design allows.
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

export default function ReferenceMethodsGuidePage() {
  return (
    <GuideTemplate
      title="Reference Methods A-G, 100-103: C Clipped Direct"
      description="Method C is clipped direct. Every BS 7671 reference method — A, B, C, D1, D2, E, F, G — plus 100 to 103 for flat T+E above plasterboard or in stud walls."
      datePublished="2025-04-20"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={Layers}
      heroTitle={
        <>
          Reference Methods:{' '}
          <span className="text-yellow-400">How Cable Installation Affects Capacity</span>
        </>
      }
      heroSubtitle="The same cable can carry 20 A or 27 A depending on how it is installed. Reference methods A to G define the installation arrangement and directly determine the current-carrying capacity from the BS 7671 Appendix 4 tables. This guide explains each method, when it applies, and how to choose correctly."
      readingTime={13}
      answerBox={{
        question: 'What is Reference Method C in BS 7671?',
        answer:
          'Reference Method C is "clipped direct" — a single-core or multicore cable fixed on, or spaced less than 0.3 times its diameter from, a wooden or masonry wall (Table 4A2, Installation Method 20). It also covers cable on an unperforated tray, cable on a floor, and cable direct in masonry with capping. Table 4A2 of Appendix 4 tells you which reference method applies to your installation method, and that determines which column of the current-carrying capacity tables you read. Method C gives higher ratings than the enclosed methods A and B because heat dissipates more easily — but a cable fixed directly under a ceiling, or above a plasterboard ceiling with insulation, is not Method C.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Reference Methods"
      relatedPages={relatedPages}
      ctaHeading="Cable Sizing with Automatic Reference Methods"
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate's 70+ calculators. Select the installation method, enter the conditions — cable sizing is done in seconds with the correct Appendix 4 table applied automatically. 7-day free trial, cancel anytime."
    />
  );
}
