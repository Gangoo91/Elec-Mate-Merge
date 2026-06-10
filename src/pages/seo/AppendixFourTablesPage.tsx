import { Fragment } from 'react';
import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { BookOpen, Cable, Calculator, Layers, Zap, Thermometer, Search } from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'BS 7671 Appendix 4 Current-Carrying Capacity Table (4D1A, 4D5A)';
const PAGE_DESCRIPTION =
  'BS 7671 Appendix 4 cable tables in full: Table 4D1A & 4D5A current-carrying capacity (Iz), reference methods A–G, volt drop (mV/A/m) and correction factors Ca/Cg/Ci/Cs. Free lookup.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Appendix 4 Tables BS 7671', href: '/guides/appendix-4-tables-bs-7671' },
];

const tocItems = [
  { id: 'what-is-appendix-4', label: 'What Is Appendix 4?' },
  { id: 'table-numbering', label: 'Understanding Table Numbering' },
  { id: 'cc-tables', label: 'Current-Carrying Capacity Table' },
  { id: 'reference-methods', label: 'Which Reference Method?' },
  { id: 'thermoplastic-tables', label: 'Thermoplastic (PVC) Tables' },
  { id: 'thermosetting-tables', label: 'Thermosetting (XLPE/LSF) Tables' },
  { id: 'voltage-drop-tables', label: 'Voltage Drop Tables' },
  { id: 'key-cable-types', label: 'Key Cable Types' },
  { id: 'how-to-use', label: 'How to Use the Tables' },
  { id: 'common-lookups', label: 'Common Lookups' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Appendix 4 contains the current-carrying capacity tables for every cable type and installation method in BS 7671 — it is the core reference for all cable sizing calculations.',
  'Tables are numbered systematically: the letter indicates cable type (D for multicore thermoplastic, E for multicore thermosetting), and the column indicates the reference method (A, B, C, etc.).',
  // grounded: bs7671_facets — Reg 525.202/525.203 (A4:2026) cite "Appendix 4, Section 6.4" for voltage drop; Reg 125.8 gives 3% lighting / 5% other. No "Appendix 12" exists in the A4 source.
  'Voltage drop (mV/A/m values and the 3% lighting / 5% other limits) lives in Appendix 4, Section 6.4 of BS 7671:2018+A4:2026 — the same place as the current-carrying capacity tables. Amendment 4 did not move it.',
  'You must use the correct table for your cable type AND the correct column for your reference method — getting either wrong gives the wrong current-carrying capacity.',
  'When sizing cables for underground or buried runs, apply the Cs (soil thermal resistivity) correction factor in addition to Ca (ambient), Cg (grouping), and Ci (thermal insulation) — Cs is required by Appendix 4 for Method D installations and is listed in the underground tables (e.g. Table 4D4A).',
  'Elec-Mate has every Appendix 4 table built into the cable sizing calculator. Select cable type and reference method, and the app looks up the correct value instantly — no more flicking through the brown book.',
];

const faqs = [
  {
    question: 'What does Appendix 4 of BS 7671 contain?',
    answer:
      'Appendix 4 of BS 7671 contains the current-carrying capacity tables for all standard cable types used in UK electrical installations. These tables give the maximum current (in amperes) that a cable of a given size can carry continuously under specific reference conditions — a defined installation method, an ambient temperature of 30 degrees Celsius, no grouping with other circuits, and no thermal insulation. The tables cover thermoplastic (PVC) insulated cables, thermosetting (XLPE and LSF) insulated cables, mineral insulated (MICC) cables, and flexible cables, in sizes from 1mm squared up to 630mm squared or more. Appendix 4 also contains the correction factor tables (Table 4B1 for ambient temperature, Tables 4C1 to 4C5 for grouping) and, in Section 6, the voltage drop data — both the mV/A/m values and the percentage limits, with the numeric voltage-drop maxima given in Appendix 4, Section 6.4. This remains the case in BS 7671:2018+A4:2026.',
  },
  {
    question: 'How do I read the Appendix 4 current-carrying capacity tables?',
    answer:
      'Each current-carrying capacity table has rows for cable sizes (1mm squared, 1.5mm squared, 2.5mm squared, etc.) and columns for different reference methods and conductor configurations. To read the table correctly: (1) Identify the correct table for your cable type — for example, Table 4D5A for XLPE (90 degrees Celsius) twin and earth cable, or Table 4D1A for PVC (70 degrees Celsius) twin and earth cable clipped direct. (2) Find the column that matches your reference method — the column headers indicate which installation method each column covers (e.g., Reference Method A, B, C). (3) Find the row for your cable size. (4) Read the current-carrying capacity value at the intersection of the correct column and row. This value is the tabulated current-carrying capacity (Iz) under reference conditions. You then compare this against the minimum tabulated current rating (It) calculated after applying all correction factors (Ca, Cg, Ci, Cf, and Cs for buried cables). The cable is suitable if Iz is greater than or equal to It.',
  },
  {
    question: 'What is the difference between the 4D and 4E tables?',
    answer:
      'Within the 4D and 4E series, individual tables cover specific cable constructions — always check the table heading for insulation type and operating temperature rather than assuming the letter alone determines the insulation. For example, Table 4D5A covers XLPE (90 degrees Celsius) twin and earth cable, while Table 4D1A covers PVC (70 degrees Celsius) twin and earth cable clipped direct. Thermosetting (XLPE/LSF) cables operate at 90 degrees Celsius versus 70 degrees Celsius for PVC, giving approximately 25 percent higher current-carrying capacity for the same conductor size and method. Thermosetting cables are used where higher current capacity is needed without increasing cable size, or where the fire performance of PVC is inadequate (such as escape routes). The table series follow the pattern: 4D and 4E for multicore non-armoured cables (various insulation types), 4F for armoured cables, 4H for MICC, and 4J for flexible cables.',
  },
  {
    question: 'What are mV/A/m voltage drop values and how do I use them?',
    answer:
      'The mV/A/m (millivolts per ampere per metre) values are used to calculate the voltage drop across a cable run. The voltage drop formula is: VD = mV/A/m x Ib x L / 1000, where VD is the voltage drop in volts, Ib is the design current in amperes, and L is the cable length in metres. The mV/A/m values are given in the cable tables of Appendix 4, and the percentage limits sit in Appendix 4, Section 6.4 of BS 7671:2018+A4:2026. Each cable type and size has a specific mV/A/m value that depends on the conductor resistance and, for AC circuits, the conductor reactance. For single-phase circuits, you use the two-core or single-phase mV/A/m values. For three-phase circuits, the tables provide separate three-phase mV/A/m values that account for the different voltage relationship in a balanced three-phase system. BS 7671 limits voltage drop to 3 percent for lighting circuits and 5 percent for all other circuits, measured from the origin of the installation (Regulation 525 and Appendix 4, Section 6.4).',
  },
  {
    question: 'Where can I find the tables for SWA cable?',
    answer:
      'Steel wire armoured (SWA) cable current-carrying capacity tables are in the Appendix 4 series covering armoured cables. Table 4D4A covers 3-core XLPE-insulated (90 degrees Celsius) SWA cable — the most common SWA type used in the UK for submains and external runs. The SWA tables include columns for different installation methods: Method C (clipped direct to a surface), Method D (buried underground in a duct or directly buried), and Methods E/F (on a cable tray). SWA cable is the standard choice for underground runs to outbuildings, submain feeds, and external installations. When sizing SWA for underground use (Method D), apply the Cs (soil thermal resistivity) correction factor in addition to the standard Ca (ambient temperature) and Cg (grouping) corrections.',
  },
  {
    question: 'Have the Appendix 4 tables changed in Amendment 4 (A4:2026)?',
    answer:
      'The current-carrying capacity values in the Appendix 4 tables are unchanged by Amendment 4 — a 2.5mm squared PVC twin and earth cable clipped direct is still rated 24A under Table 4D1A, and the XLPE equivalent is still 30A under Table 4D5A. The voltage drop data also remains in Appendix 4: the mV/A/m values are in the cable tables and the numeric voltage-drop limits are in Appendix 4, Section 6.4, which Regulation 525.202 and 525.203 of BS 7671:2018+A4:2026 still cite directly. If you have seen it claimed that Amendment 4 moved voltage drop to a new "Appendix 12", that is not correct — Reg 525 in the A4:2026 text continues to point to Appendix 4, Section 6.4. When you size a cable you use Appendix 4 for both current-carrying capacity and voltage drop.',
  },
  {
    question: 'Does Elec-Mate include all the Appendix 4 tables?',
    answer:
      'Yes. Elec-Mate includes every current-carrying capacity table and voltage drop table from BS 7671 Appendix 4. When you use the cable sizing calculator, you select the cable type (twin and earth, singles in conduit, SWA, MICC, flexible, etc.) and the reference method (A through G), and the calculator automatically looks up the correct value from the appropriate table. It also applies all correction factors (Ca, Cg, Ci, Cf) and checks voltage drop against the BS 7671 limits. The entire Appendix 4 dataset is stored locally on your device, so the calculator works offline on site without any mobile signal. This is one of 70 electrical calculators included in Elec-Mate, all built to BS 7671:2018+A4:2026.',
  },
];

const sections = [
  {
    id: 'what-is-appendix-4',
    heading: 'What Is Appendix 4?',
    content: (
      <>
        <p className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.06] px-4 py-3 text-sm">
          Looking for <strong>Amendment 4</strong> (the A4:2026 update to BS 7671) rather than
          Appendix 4 (the cable tables)? See the{' '}
          <SEOInternalLink href="/guides/bs-7671-amendment-4-2026">
            BS 7671 Amendment 4:2026 guide
          </SEOInternalLink>{' '}
          for every change and what it means for your work.
        </p>
        <p>
          Appendix 4 of BS 7671 is the section that every electrician turns to most frequently. It
          contains the current-carrying capacity tables for all standard cable types used in UK
          electrical installations. When you are{' '}
          <SEOInternalLink href="/guides/how-to-size-cables-bs-7671">
            sizing a cable
          </SEOInternalLink>
          , Appendix 4 is where you look up the maximum current a cable can carry under specific
          installation conditions.
        </p>
        <p>
          The tables cover every combination of cable type (PVC, XLPE, MICC, SWA, flexible),
          conductor material (copper, aluminium), conductor configuration (single-core, multicore),
          and{' '}
          <SEOInternalLink href="/guides/reference-methods-cable-installation">
            installation method
          </SEOInternalLink>{' '}
          (Reference Methods A through G). The values in these tables are based on defined reference
          conditions: an ambient temperature of 30 degrees Celsius, a single circuit (no grouping),
          no thermal insulation in contact with the cable, and the cable operating at its maximum
          conductor temperature (70 degrees Celsius for PVC, 90 degrees Celsius for XLPE/LSF).
        </p>
        <p>
          When the actual installation conditions differ from these references — as they almost
          always do —{' '}
          <SEOInternalLink href="/guides/correction-factors-bs-7671">
            correction factors
          </SEOInternalLink>{' '}
          must be applied. Appendix 4 also contains the correction factor tables: Table 4B1 for
          ambient temperature and Tables 4C1 to 4C5 for grouping.
        </p>
        <SEOAppBridge
          title="BS 7671 Appendix 4 Tables: Cable Current Ratings & Volt Drop"
          description="BS 7671 Appendix 4 explained: current-carrying capacity, volt drop (mV/A/m) and correction factors (Ca, Cg, Ci) for every cable type and method."
          icon={BookOpen}
        />
      </>
    ),
  },
  {
    id: 'table-numbering',
    heading: 'Understanding the Table Numbering System',
    content: (
      <>
        <p>
          The Appendix 4 table numbering follows a systematic pattern that, once understood, makes
          navigation much faster. The pattern is:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 my-4">
          <p className="text-white font-mono text-sm">
            Table 4D5<strong className="text-yellow-400">A</strong> &nbsp;/&nbsp; Table 4D5
            <strong className="text-yellow-400">B</strong>
          </p>
          <p className="text-white text-xs mt-2">
            The suffix is what matters most day to day:{' '}
            <strong className="text-yellow-400">A</strong> = current-carrying capacity (amps),{' '}
            <strong className="text-yellow-400">B</strong> = voltage drop (mV/A/m). The number
            identifies a specific cable construction — so always read the table heading for
            insulation type and operating temperature rather than guessing from the letter.
          </p>
        </div>
        <p>
          The single most important point: the letter alone does not tell you the insulation.{' '}
          <strong className="text-yellow-400">Table 4D1A</strong> is 70&deg;C thermoplastic (PVC)
          twin and earth, while <strong className="text-yellow-400">Table 4D5A</strong> — still in
          the 4D series — is 90&deg;C thermosetting (XLPE) twin and earth. Both are
          &ldquo;4D&rdquo;. Pick the table by what is printed in its heading.
        </p>
        {/* grounded: bs7671_facets context_prefix — Table 4D1A (PVC T+E 70C), 4D5A (XLPE T+E 90C), Reg 521.201 installation method per Table 4A1. */}
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">The tables you will actually use</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li>
              <strong className="text-yellow-400">Table 4D1A</strong> — 70&deg;C thermoplastic (PVC)
              flat twin and earth, current-carrying capacity. The standard domestic cable.
            </li>
            <li>
              <strong className="text-yellow-400">Table 4D2A</strong> — 70&deg;C thermoplastic (PVC)
              single-core cables (singles in conduit/trunking).
            </li>
            <li>
              <strong className="text-yellow-400">Table 4D5A</strong> — 90&deg;C thermosetting
              (XLPE) flat twin and earth, current-carrying capacity. Roughly 25% more capacity than
              4D1A for the same size.
            </li>
            <li>
              <strong className="text-yellow-400">Table 4E / 4F series</strong> — thermosetting
              multicore and armoured (SWA) cables.
            </li>
            <li>
              <strong className="text-yellow-400">Table 4G / 4H</strong> — mineral insulated (MICC)
              cables; <strong className="text-yellow-400">4J</strong> — flexible cables and cords.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cc-tables',
    heading: 'Current-Carrying Capacity Table: 4D1A (PVC) and 4D5A (XLPE)',
    content: (
      <>
        <p>
          This is the table most electricians come to Appendix 4 for: the current-carrying capacity
          (Iz) of twin and earth cable. The values below are for{' '}
          <strong className="text-yellow-400">Reference Method C (clipped direct)</strong>, two
          loaded conductors, at the standard reference conditions — 30&deg;C ambient, single
          circuit, no grouping and no thermal insulation. Apply correction factors for any condition
          that differs.
        </p>
        {/* grounded: bs7671_facets — BS 7671:2018+A4:2026 Appendix 4, Table 4D1A (PVC T+E 70°C, Method C) and Table 4D5A (XLPE T+E 90°C, Method C). Iz in amperes. Every value sourced from a per-cable facet. */}
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-1">
            Iz (A) — Method C, two loaded conductors
          </h3>
          <p className="text-white/70 text-xs mb-4">
            Table 4D1A = 70&deg;C thermoplastic (PVC) T&amp;E · Table 4D5A = 90&deg;C thermosetting
            (XLPE) T&amp;E
          </p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="p-2 rounded bg-white/[0.08] text-center font-bold text-white">
              Conductor
            </div>
            <div className="p-2 rounded bg-white/[0.08] text-center font-bold text-white">
              4D1A · PVC
            </div>
            <div className="p-2 rounded bg-white/[0.08] text-center font-bold text-white">
              4D5A · XLPE
            </div>
            {(
              [
                ['1.0', 13, 16],
                ['1.5', 16, 20],
                ['2.5', 24, 30],
                ['4.0', 32, 40],
                ['6.0', 41, 51],
                ['10', 57, 70],
                ['16', 76, 94],
                ['25', 101, 125],
                ['35', 125, 156],
                ['50', 151, 188],
              ] as Array<[string, number, number]>
            ).map(([size, pvc, xlpe]) => (
              <Fragment key={size}>
                <div className="p-2 rounded bg-white/[0.04] text-center text-white">
                  {size}mm&sup2;
                </div>
                <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
                  {pvc}
                </div>
                <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
                  {xlpe}
                </div>
              </Fragment>
            ))}
          </div>
          <p className="text-white/70 text-xs mt-4">
            Values per BS 7671:2018+A4:2026 Appendix 4, Tables 4D1A and 4D5A, Reference Method C. Iz
            is the tabulated capacity before correction factors — always compare against the
            required It once Ca, Cg, Ci and Cf are applied.
          </p>
        </div>
        <p>
          The XLPE (4D5A) column is consistently around 25% higher than the PVC (4D1A) column for
          the same conductor size, because the 90&deg;C insulation tolerates more heat than 70&deg;C
          PVC. For any installation method other than clipped direct, the capacity changes — read
          the correct column for your{' '}
          <SEOInternalLink href="/guides/reference-methods-cable-installation">
            reference method
          </SEOInternalLink>
          .
        </p>
        <SEOAppBridge
          title="Every Appendix 4 table built in"
          description="Skip the lookup — Elec-Mate's cable sizing calculator reads off the right table and column, applies correction factors and checks volt drop in one go."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'reference-methods',
    heading: 'Which Reference Method (Installation Method)?',
    content: (
      <>
        <p>
          A cable&apos;s current-carrying capacity depends as much on how it is installed as on its
          size — the same 2.5mm&sup2; T&amp;E carries very different currents clipped to a wall
          versus buried in loft insulation. BS 7671 calls the installation arrangement the{' '}
          <strong className="text-yellow-400">reference method</strong>, and it sets which column of
          the Appendix 4 table you read.
        </p>
        {/* grounded: bs7671_facets — Reg 521.201 (install method must accord with Table 4A1 of Appendix 4); Method C/D descriptions from Table 4D1A/4D5A facets. A/B/E/F/G descriptions not held in RAG — linked out rather than stated. */}
        <p>
          Regulation 521.201 of BS 7671:2018+A4:2026 requires the installation method to be in
          accordance with <strong className="text-yellow-400">Table 4A1</strong> of Appendix 4, and
          Table 4A2 illustrates each numbered method. The two methods you will meet most often are:
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white mb-1">Method C — clipped direct</h3>
            <p className="text-white text-sm leading-relaxed">
              Cable clipped direct to a non-metallic surface, or run on a cable tray. This is the
              column used for the capacity values in the table above (e.g. 2.5mm&sup2; PVC T&amp;E =
              24A, XLPE = 30A).
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-1">Method D — buried in the ground</h3>
            <p className="text-white text-sm leading-relaxed">
              Cable in a duct or directly buried underground — the standard method for SWA submains
              and supplies to outbuildings. Method D also requires the Cs (soil thermal resistivity)
              correction factor in addition to Ca and Cg.
            </p>
          </div>
        </div>
        <p>
          Methods A, B, E, F and G cover conduit in a thermally insulating wall, conduit or trunking
          on a surface, and cables in free air. The full A&ndash;G breakdown, with the Table 4A2
          illustrations, is in our{' '}
          <SEOInternalLink href="/guides/reference-methods-cable-installation">
            cable reference methods guide
          </SEOInternalLink>
          . Choosing the wrong method is one of the most common cable-sizing errors — a cable rated
          for clipping direct can be significantly overloaded once it is enclosed in insulation.
        </p>
      </>
    ),
  },
  {
    id: 'thermoplastic-tables',
    heading: 'Thermoplastic (PVC) Cable Tables — The 4D Series',
    content: (
      <>
        <p>
          The 4D series of tables covers thermoplastic insulated cables — by far the most commonly
          used cable type in UK domestic and light commercial installations. PVC-insulated cables
          include twin and earth (flat profile cable with earth), singles for use in conduit and
          trunking, and PVC-insulated flexible cables.
        </p>
        <p>
          PVC cables have a maximum conductor operating temperature of 70 degrees Celsius. All
          current-carrying capacity values in the 4D tables are calculated on the basis that the
          conductor does not exceed this temperature under sustained full-load conditions at an
          ambient temperature of 30 degrees Celsius.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Most commonly used PVC tables</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <span>
                <strong className="text-yellow-400">Table 4D1A</strong> — PVC/copper twin and earth
                (70&deg;C) cable clipped direct (Method C). Values: 1.0mm&sup2;=13A,
                1.5mm&sup2;=16A, 2.5mm&sup2;=24A, 4mm&sup2;=32A, 6mm&sup2;=41A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong className="text-yellow-400">Table 4D2A</strong> — Single-core PVC/copper
                cables, clipped direct or on cable tray. Used for large singles on cable tray
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong className="text-yellow-400">Table 4D5A</strong> — XLPE/copper twin and earth
                (90&deg;C) cable clipped direct (Method C). Higher capacity than 4D1A for the same
                size. Values: 1.0mm&sup2;=16A, 1.5mm&sup2;=20A, 2.5mm&sup2;=30A, 4mm&sup2;=40A,
                6mm&sup2;=51A.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When using Table 4D5A for twin and earth cable, the column you select depends on the{' '}
          <SEOInternalLink href="/guides/reference-methods-cable-installation">
            reference method
          </SEOInternalLink>
          . Column 6 (two loaded conductors) is the standard column for single-phase circuits in
          twin and earth cable under the various reference methods.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <div>
              <h3 className="font-bold text-white mb-1">
                T+E in thermal insulation (stud walls, ceiling voids)
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Where flat twin and earth cable is in contact with, or enclosed within, thermal
                insulation — for example in a stud wall containing insulation or above an insulated
                ceiling — the standard Method C ratings do not apply. In these circumstances, the
                installer must apply the derating factors and reduced current-carrying capacities
                set out in BS 7671 Appendix 4 Table 4D5 for the relevant contact/enclosure condition
                (OSG Reg 13.5). Failure to derate for thermal insulation is one of the most common
                cable sizing errors in domestic work.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'thermosetting-tables',
    heading: 'Thermosetting (XLPE/LSF) Cable Tables — The 4E Series',
    content: (
      <>
        <p>
          The 4E series covers thermosetting insulated cables — cables with XLPE (cross-linked
          polyethylene) or LSF (low smoke and fume) insulation. Thermosetting cables have a higher
          maximum conductor operating temperature of 90 degrees Celsius, compared to 70 degrees
          Celsius for PVC. This 20-degree advantage translates directly into higher current-carrying
          capacity for the same conductor size.
        </p>
        <p>
          Thermosetting cables are used in several common scenarios: where higher current capacity
          is needed without increasing cable size (reducing material cost and conduit fill), in
          locations where the fire performance of PVC is inadequate (escape routes, public
          buildings), and where ambient temperatures are elevated and PVC derating would be
          excessive.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            Capacity comparison: PVC T+E (Table 4D1A) vs XLPE T+E (Table 4D5A), Method C clipped
            direct
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">Size</p>
              <p className="text-white text-xs mt-1">mm&sup2;</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">PVC 70&deg;C</p>
              <p className="text-white text-xs mt-1">Table 4D1A</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">XLPE 90&deg;C</p>
              <p className="text-white text-xs mt-1">Table 4D5A</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-center">
              <p className="text-yellow-400 font-bold">2.5</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">24</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">30</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-center">
              <p className="text-yellow-400 font-bold">4.0</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">32</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">40</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-center">
              <p className="text-yellow-400 font-bold">6.0</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">41</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">51</p>
            </div>
          </div>
        </div>
        <p>
          The capacity advantage of XLPE over PVC is approximately 25% for the same conductor size
          and installation method — for example, 2.5mm&sup2; T+E clipped direct: 30A (XLPE) vs 24A
          (PVC). This means that in situations where PVC cable sizing leads to an impractically
          large cable, switching to XLPE T+E of the same size may provide sufficient capacity
          without increasing the conductor cross-section.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-drop-tables',
    heading: 'Voltage Drop Tables (mV/A/m)',
    content: (
      <>
        <p>
          The voltage drop tables provide mV/A/m (millivolts per ampere per metre) values for each
          cable type and size. These values are used to calculate the voltage drop across a cable
          run using the formula:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 my-4">
          <p className="text-white font-mono text-sm">
            VD = mV/A/m &times; I<sub>b</sub> &times; L &divide; 1000
          </p>
          <p className="text-white text-xs mt-2">
            VD = voltage drop (volts) | I<sub>b</sub> = design current (A) | L = cable length (m)
          </p>
        </div>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <div className="flex items-start gap-3">
            <div>
              {/* grounded: bs7671_facets — Reg 525.202/525.203 (A4:2026) cite "Appendix 4, Section 6.4" for voltage drop. */}
              <h3 className="font-bold text-white mb-1">Where voltage drop sits in the standard</h3>
              <p className="text-white text-sm leading-relaxed">
                Voltage drop stays in Appendix 4. The mV/A/m values are listed in the cable tables,
                and the numeric limits are in Appendix 4, Section 6.4 — which Regulation 525.202 and
                525.203 of BS 7671:2018+A4:2026 point to directly. This is unchanged by Amendment 4.
                There is no separate &ldquo;Appendix 12&rdquo; for voltage drop; if you have seen
                that claimed, it is incorrect.
              </p>
            </div>
          </div>
        </div>
        <p>
          BS 7671 Regulation 525 limits voltage drop to 3% for lighting circuits and 5% for all
          other circuits, measured from the origin of the installation. From a 230V single-phase
          supply, this gives maximum permissible voltage drops of 6.9V for lighting and 11.5V for
          power. From a 400V three-phase supply, the limits are 12V for lighting and 20V for power.
        </p>
        <p>
          The voltage drop tables provide separate values for single-phase (two-core) and
          three-phase circuits. For{' '}
          <SEOInternalLink href="/guides/three-phase-calculations">
            three-phase calculations
          </SEOInternalLink>
          , the three-phase mV/A/m values are used, which account for the different phase
          relationships in a balanced three-phase system. The voltage drop for three-phase is
          calculated as: VD = mV/A/m (3-phase) x Ib x L / 1000.
        </p>
        <SEOAppBridge
          title="Voltage drop calculated automatically"
          description="Elec-Mate's cable sizing calculator checks voltage drop as part of every cable sizing calculation."
          icon={Zap}
        />
      </>
    ),
  },
  {
    id: 'key-cable-types',
    heading: 'Key Cable Types and Their Tables',
    content: (
      <>
        <p>
          Understanding which table to use for each cable type is essential for accurate cable
          sizing. Here are the most commonly encountered cable types and their corresponding
          Appendix 4 tables.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <div>
                <h3 className="font-bold text-white mb-1">Twin and Earth (T&amp;E)</h3>
                <p className="text-white text-sm leading-relaxed">
                  The standard domestic cable. Flat profile with line, neutral, and CPC. Use
                  <strong className="text-yellow-400"> Table 4D5A</strong> for XLPE 90&deg;C T+E
                  (clipped direct, Method C) or{' '}
                  <strong className="text-yellow-400">Table 4D1A</strong> for PVC 70&deg;C T+E.
                  Available in 1.0, 1.5, 2.5, 4.0, 6.0, 10, and 16mm&sup2;. The most commonly used
                  sizes are 1.5mm&sup2; for lighting, 2.5mm&sup2; for ring circuits, and 6mm&sup2;
                  or 10mm&sup2; for cookers and showers.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <div>
                <h3 className="font-bold text-white mb-1">Singles in Conduit</h3>
                <p className="text-white text-sm leading-relaxed">
                  Single-core PVC-insulated cables drawn into conduit or trunking. Standard in
                  commercial and industrial work. Note that{' '}
                  <strong className="text-yellow-400">Table 4D1A</strong> covers PVC twin and earth
                  70&deg;C clipped direct — for singles in conduit, refer to the appropriate conduit
                  installation column within the 4D series tables and check the column header for
                  your reference method. The capacity is lower than T+E clipped direct for the same
                  conductor size because the conduit restricts airflow around the cables.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <div>
                <h3 className="font-bold text-white mb-1">SWA (Steel Wire Armoured)</h3>
                <p className="text-white text-sm leading-relaxed">
                  Multicore armoured cable with mechanical protection from the steel wire armouring.
                  Use <strong className="text-yellow-400">Table 4D4A</strong> for 3-core
                  XLPE-insulated (90&deg;C) SWA cable. Standard for underground burial, external
                  runs, and submain distribution. When buried (Method D), always apply the Cs soil
                  thermal resistivity correction factor as well as Ca and Cg. The armouring also
                  serves as the circuit protective conductor (CPC) in many installations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <div>
                <h3 className="font-bold text-white mb-1">Flexible Cables</h3>
                <p className="text-white text-sm leading-relaxed">
                  Flexible cables for appliance connections and temporary installations. Use the
                  <strong className="text-yellow-400"> 4J series</strong> tables. Flexible cables
                  have different current-carrying capacities from fixed wiring cables because of
                  their construction — finer conductor strands, different insulation thickness, and
                  typically different ambient temperature assumptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-use',
    heading: 'How to Use the Tables Step by Step',
    content: (
      <>
        <p>
          Using the Appendix 4 tables correctly is the core skill of cable sizing. Here is the
          step-by-step process for looking up a current-carrying capacity value.
        </p>
        <div className="space-y-4 my-6">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Identify the cable type</h3>
                <p className="text-white text-sm leading-relaxed">
                  Determine whether you are using PVC (thermoplastic) or XLPE/LSF (thermosetting)
                  cable, whether it is single-core or multicore, and whether it is armoured or
                  non-armoured. This determines the table letter (D, E, F, H, J) and number.
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Identify the reference method</h3>
                <p className="text-white text-sm leading-relaxed">
                  Assess the{' '}
                  <SEOInternalLink href="/guides/reference-methods-cable-installation">
                    installation method
                  </SEOInternalLink>{' '}
                  — how the cable will be physically installed. This determines the column of the
                  table you use. The column headers in each table indicate which reference method
                  each column covers.
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Calculate the required It</h3>
                <p className="text-white text-sm leading-relaxed">
                  Apply all{' '}
                  <SEOInternalLink href="/guides/correction-factors-bs-7671">
                    correction factors
                  </SEOInternalLink>{' '}
                  (Ca, Cg, Ci, Cf, and Cs for buried cables) to calculate the minimum tabulated
                  current rating: It = In / (Ca &times; Cg &times; Ci &times; Cf). For underground
                  installations, include Cs (soil thermal resistivity) in the denominator.
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Select the cable</h3>
                <p className="text-white text-sm leading-relaxed">
                  Find the row in the table where the current-carrying capacity (Iz) is equal to or
                  greater than It. That row gives you the minimum cable size for the installation.
                  Then verify voltage drop and fault current withstand.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Instant Appendix 4 lookup on site"
          description="Skip the manual table lookup. Elec-Mate's cable sizing calculator selects the correct table, applies correction factors…"
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'common-lookups',
    heading: 'Common Lookups Electricians Need',
    content: (
      <>
        <p>
          Here are the most frequently needed values from Appendix 4 for everyday domestic and light
          commercial work. These are for XLPE (90&deg;C) twin and earth cable from Table 4D5A,
          Reference Method C (clipped direct), two loaded conductors. For PVC (70&deg;C) T+E use
          Table 4D1A — values are lower (e.g. 2.5mm&sup2;=24A, 4mm&sup2;=32A, 6mm&sup2;=41A).
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            Table 4D5A — XLPE T+E 90&deg;C, Method C, 2 Loaded Conductors
          </h3>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="p-2 rounded bg-white/[0.06] text-center font-bold text-white">Size</div>
            <div className="p-2 rounded bg-white/[0.06] text-center font-bold text-white">
              Iz (A)
            </div>
            <div className="p-2 rounded bg-white/[0.06] text-center font-bold text-white">
              Typical use
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">1.0mm&sup2;</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              16
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Lighting</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">1.5mm&sup2;</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              20
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Lighting</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">2.5mm&sup2;</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              30
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Ring circuit</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">4.0mm&sup2;</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              40
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Immersion</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">6.0mm&sup2;</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              51
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Cooker/shower</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">10mm&sup2;</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              70
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Large cooker</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">16mm&sup2;</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              94
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Sub-main</div>
          </div>
        </div>
        <p>
          Remember: these are the tabulated values under reference conditions. Once you apply{' '}
          <SEOInternalLink href="/guides/correction-factors-bs-7671">
            correction factors
          </SEOInternalLink>
          , the effective capacity of the cable is reduced. A 2.5mm&sup2; XLPE T+E cable with Iz =
          30A may only be able to carry around 21A after derating for grouping and insulation.
          Always calculate the required It before selecting from the table.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/correction-factors-bs-7671',
    title: 'Correction Factors Guide',
    description:
      'Ca, Cg, Ci, and Cf correction factors explained with worked examples and the derating formula.',
    icon: Thermometer,
    category: 'Guide' as const,
  },
  {
    href: '/guides/reference-methods-cable-installation',
    title: 'Cable Reference Methods',
    description:
      'Reference Methods A to G from Table 4A2 — how installation method affects cable capacity.',
    icon: Layers,
    category: 'Guide' as const,
  },
  {
    href: '/guides/how-to-size-cables-bs-7671',
    title: 'How to Size Cables to BS 7671',
    description:
      'The complete 6-step cable sizing process from design current to fault current verification.',
    icon: Cable,
    category: 'Guide' as const,
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'All Appendix 4 tables built in. Select cable type and method, get the right cable size.',
    icon: Calculator,
    category: 'Tool' as const,
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Calculate voltage drop using the mV/A/m values from Appendix 4 for any cable type and circuit.',
    icon: Zap,
    category: 'Tool' as const,
  },
  {
    href: '/guides/three-phase-calculations',
    title: 'Three Phase Calculations',
    description:
      'Three-phase power, current, voltage drop, and cable sizing using Appendix 4 three-phase tables.',
    icon: Calculator,
    category: 'Guide' as const,
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AppendixFourTablesPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-06-01"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="BS 7671 Appendix 4"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          BS 7671 Appendix 4 Tables{' '}
          <span className="text-yellow-400">Current Carrying Capacity</span>
        </>
      }
      heroSubtitle="The complete guide to BS 7671 Appendix 4, with the full current-carrying capacity tables on the page. Read off Table 4D1A (PVC) and Table 4D5A (XLPE) for every conductor size, choose the right reference method (A–G), apply correction factors, and check voltage drop — all to BS 7671:2018+A4:2026."
      readingTime={13}
      answerBox={{
        question: 'What is BS 7671 Appendix 4?',
        answer:
          'Appendix 4 of BS 7671 contains the current-carrying capacity tables for every cable type and installation method — the core reference for all cable sizing. Tables are named by cable type (e.g. Table 4D1A for 70°C PVC twin and earth, 4D5A for 90°C XLPE) and a reference-method column (A, B, C…). Voltage drop (mV/A/m values and the 3%/5% limits) sits in Appendix 4, Section 6.4, unchanged by Amendment 4 (A4:2026).',
        detail:
          'Use the correct table for your cable type and the correct column for your reference method — getting either wrong gives the wrong current-carrying capacity.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Every Appendix 4 table, always in your pocket"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for instant cable sizing with every BS 7671 table built in. 70+ calculators, 16 certificate types — all BS 7671:2018+A4:2026. 7-day free trial, cancel anytime."
    />
  );
}
