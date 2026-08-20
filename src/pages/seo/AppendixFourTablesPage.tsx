import { Fragment } from 'react';
import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { CalculatorSurface } from '@/components/calculators/shared';
import CableCurrentCapacityCalculator from '@/components/apprentice/calculators/CableCurrentCapacityCalculator';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { BookOpen, Cable, Calculator, Layers, Zap, Thermometer, Search } from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Table 4D1A, 4D2A, 4D5: BS 7671 Appendix 4';
const PAGE_DESCRIPTION =
  'Every BS 7671 Appendix 4 table: 4D1A single-core PVC, 4D2A multicore, 4D5 flat twin and earth, 4E thermosetting. Reference methods and volt drop.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Appendix 4 Tables BS 7671', href: '/guides/appendix-4-tables-bs-7671' },
];

const tocItems = [
  { id: 'capacity-lookup', label: 'Cable Current Rating Lookup' },
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
  // grounded: printed BS 7671:2018+A4:2026 Appendix 4, Table 4A3 — 4D = 70°C thermoplastic copper, 4E = 90°C thermosetting copper, 4F = flexible, 4G = mineral insulated, 4H = 70°C thermoplastic aluminium, 4J = 90°C thermoplastic aluminium. Suffix A = current-carrying capacity, B = voltage drop.
  'Tables are numbered systematically, and Table 4A3 of Appendix 4 is the index: the letter group gives conductor material and insulation (4D = 70°C thermoplastic copper, 4E = 90°C thermosetting copper, 4F = flexible, 4G = mineral insulated, 4H and 4J = aluminium), the number gives the construction, the A/B suffix separates current-carrying capacity (A) from voltage drop (B), and the column you read gives the reference method.',
  // grounded: bs7671_facets — Reg 525.202/525.203 (A4:2026) cite "Appendix 4, Section 6.4" for voltage drop; Reg 125.8 gives 3% lighting / 5% other. No "Appendix 12" exists in the A4 source.
  'Voltage drop (mV/A/m values and the 3% lighting / 5% other limits) lives in Appendix 4, Section 6.4 of BS 7671:2018+A4:2026 — the same place as the current-carrying capacity tables. Amendment 4 did not move it.',
  'You must use the correct table for your cable type AND the correct column for your reference method — getting either wrong gives the wrong current-carrying capacity.',
  // grounded: printed BS 7671:2018+A4:2026 Appendix 4 §5.1.1 and the Appendix 4 table index — Ca = Table 4B1/4B2, Cs = Table 4B3, Cd = Table 4B4, Cc = 0.9 for buried/in duct.
  'When sizing cables for underground or buried runs, apply the Cs (soil thermal resistivity) factor from Table 4B3 and the Cd (depth of laying) factor from Table 4B4, in addition to Ca (ambient), Cg (grouping) and Ci (thermal insulation). Appendix 4, Section 5.1.1 also applies Cc = 0.9 where the cable is buried direct or run in a duct in the ground.',
  'Elec-Mate has every Appendix 4 table built into the cable sizing calculator. Select cable type and reference method, and the app looks up the correct value instantly — no more flicking through the brown book.',
];

const faqs = [
  {
    question: 'What does Appendix 4 of BS 7671 contain?',
    answer:
      'Appendix 4 of BS 7671 contains the current-carrying capacity tables for all standard cable types used in UK electrical installations. These tables give the maximum current (in amperes) that a cable of a given size can carry continuously under specific reference conditions — a defined installation method, an ambient temperature of 30 degrees Celsius, no grouping with other circuits, and no thermal insulation. The tables cover thermoplastic (PVC) insulated cables, thermosetting (XLPE and LSF) insulated cables, mineral insulated (MICC) cables, and flexible cables, in sizes from 1mm squared up to 630mm squared or more. Appendix 4 also contains the correction factor tables (Table 4B1 for ambient air temperature, Table 4B2 for ambient ground temperature, Table 4B3 for soil thermal resistivity, Table 4B4 for depth of laying, and Tables 4C1 to 4C6 for grouping) and, in Section 6, the voltage drop data — both the mV/A/m values and the percentage limits, with the numeric voltage-drop maxima given in Appendix 4, Section 6.4. This remains the case in BS 7671:2018+A4:2026.',
  },
  {
    question: 'How do I read the Appendix 4 current-carrying capacity tables?',
    answer:
      'Each current-carrying capacity table has rows for cable sizes (1mm squared, 1.5mm squared, 2.5mm squared, etc.) and columns for different reference methods and conductor configurations. To read the table correctly: (1) Identify the correct table for your cable type using Table 4A3, which indexes every construction to its table — for example, Table 4D5 for 70 degrees Celsius thermoplastic flat cable with protective conductor (twin and earth), Table 4D1A for single-core 70 degrees Celsius thermoplastic cables, or Table 4E2A for multicore 90 degrees Celsius thermosetting cables. (2) Find the column that matches your reference method — the column headers indicate which installation method each column covers (e.g., Reference Method A, B, C). (3) Find the row for your cable size. (4) Read the current-carrying capacity value at the intersection of the correct column and row. This value is the tabulated current-carrying capacity (Iz) under reference conditions. You then compare this against the minimum tabulated current rating (It) calculated after applying all correction factors (Ca, Cg, Ci, Cf, and Cs for buried cables). The cable is suitable if Iz is greater than or equal to It.',
  },
  {
    question: 'What is the difference between the 4D and 4E tables?',
    answer:
      'The letter group is the insulation and conductor material, and Table 4A3 of Appendix 4 sets it out. The 4D series is 70 degrees Celsius thermoplastic (PVC) insulated cables with copper conductors: Table 4D1 single-core non-armoured, 4D2 multicore non-armoured, 4D3 single-core armoured, 4D4 multicore armoured, and 4D5 flat cable with protective conductor (twin and earth). The 4E series is 90 degrees Celsius thermosetting (XLPE/LSF) insulated cables with copper conductors, in the same four constructions: 4E1 single-core non-armoured, 4E2 multicore non-armoured, 4E3 single-core armoured, 4E4 multicore armoured. Thermosetting cables operate at 90 degrees Celsius versus 70 degrees Celsius for PVC, giving a higher current-carrying capacity for the same conductor size and method. They are used where more capacity is needed without increasing cable size, or where the fire performance of PVC is inadequate (such as escape routes). Note that Regulation 523.1 NOTE 3 permits the 70 degrees Celsius tables (4D1 to 4D5, or 4H1 to 4H4 for aluminium) to be used for 90 degrees Celsius thermosetting cables where the rating is to be based on 70 degrees Celsius. The remaining series are: 4F for flexible cables, 4G for mineral insulated (MICC) cables, 4H for 70 degrees Celsius thermoplastic aluminium, and 4J for 90 degrees Celsius thermoplastic aluminium.',
  },
  {
    question: 'What are mV/A/m voltage drop values and how do I use them?',
    answer:
      'The mV/A/m (millivolts per ampere per metre) values are used to calculate the voltage drop across a cable run. The voltage drop formula is: VD = mV/A/m x Ib x L / 1000, where VD is the voltage drop in volts, Ib is the design current in amperes, and L is the cable length in metres. The mV/A/m values are given in the cable tables of Appendix 4, and the percentage limits sit in Appendix 4, Section 6.4 of BS 7671:2018+A4:2026. Each cable type and size has a specific mV/A/m value that depends on the conductor resistance and, for AC circuits, the conductor reactance. For single-phase circuits, you use the two-core or single-phase mV/A/m values. For three-phase circuits, the tables provide separate three-phase mV/A/m values that account for the different voltage relationship in a balanced three-phase system. BS 7671 limits voltage drop to 3 percent for lighting circuits and 5 percent for all other circuits, measured from the origin of the installation (Regulation 525 and Appendix 4, Section 6.4).',
  },
  {
    question: 'Where can I find the tables for SWA cable?',
    answer:
      'Steel wire armoured (SWA) cable current-carrying capacity tables are the multicore armoured tables in Appendix 4. Which one you use depends on the insulation: Table 4D4A covers multicore armoured 70 degrees Celsius thermoplastic (PVC) cables, and Table 4E4A covers multicore armoured 90 degrees Celsius thermosetting (XLPE) cables — 4E4A is the one for the XLPE/SWA to BS 5467 or BS 6724 normally used in the UK for submains and external runs. The SWA tables include columns for different installation methods: Method C (clipped direct to a surface), Reference Methods D1 and D2 (buried in a duct, and buried in direct contact with soil, respectively), and Methods E/F (in free air, for example on a perforated tray). When sizing SWA for underground use, apply the Cs (soil thermal resistivity) factor from Table 4B3 and the Cd (depth of laying) factor from Table 4B4 in addition to the ambient (Ca) and grouping (Cg) corrections, and note that Appendix 4, Section 5.1.1 also applies Cc = 0.9 to cables buried direct or in a duct in the ground.',
  },
  {
    question: 'Have the Appendix 4 tables changed in Amendment 4 (A4:2026)?',
    answer:
      'Yes, in one specific area. The summary of changes for BS 7671:2018+A4:2026 states that the reference methods for buried cables have been updated: distinct methods and corresponding current-carrying capacities now apply depending on whether the cable is in direct contact with soil or enclosed in a conduit or duct, and Tables 4A2, 4D4A, 4E4A, 4H4A and 4J4A have been revised to reflect that. If you are sizing a buried cable — typically SWA to an outbuilding or a submain — check you are working from an A4:2026 copy of Appendix 4 and that you have picked the right buried reference method for your installation. The voltage drop arrangements are unchanged: the mV/A/m values remain in the cable tables and the numeric voltage-drop limits remain in Appendix 4, Section 6.4 (Table 4Ab), which Regulation 525.202 and 525.203 of BS 7671:2018+A4:2026 still cite directly. If you have seen it claimed that Amendment 4 moved voltage drop to a new "Appendix 12", that is not correct — Reg 525 in the A4:2026 text continues to point to Appendix 4, Section 6.4.',
  },
  {
    question: 'Does Elec-Mate include all the Appendix 4 tables?',
    answer:
      'Yes. Elec-Mate includes every current-carrying capacity table and voltage drop table from BS 7671 Appendix 4. When you use the cable sizing calculator, you select the cable type (twin and earth, singles in conduit, SWA, MICC, flexible, etc.) and the reference method (A through G), and the calculator automatically looks up the correct value from the appropriate table. It also applies all correction factors (Ca, Cg, Ci, Cf) and checks voltage drop against the BS 7671 limits. The entire Appendix 4 dataset is stored locally on your device, so the calculator works offline on site without any mobile signal. This is one of 70 electrical calculators included in Elec-Mate, all built to BS 7671:2018+A4:2026.',
  },
];

const sections = [
  {
    id: 'capacity-lookup',
    heading: 'Look Up a Cable Current Rating',
    content: (
      <>
        <p>
          The quick answer before the theory: pick the cable type, installation method and size,
          and read the tabulated current-carrying capacity with correction factors applied — the
          values come from the BS 7671 Appendix 4 tables themselves. Free, no sign-up.
        </p>
        <CalculatorSurface>
          <CableCurrentCapacityCalculator />
        </CalculatorSurface>
      </>
    ),
  },
  {
    id: 'what-is-appendix-4',
    heading: 'What Is Appendix 4?',
    content: (
      <>
        <p className="rounded-xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-3 text-sm">
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
          <SEOInternalLink href="/how-to-size-cables">
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
          ambient air temperature, Table 4B2 for ambient ground temperature, Table 4B3 for soil
          thermal resistivity (Cs), Table 4B4 for depth of laying (Cd), Table 4B5 for cables with
          more than four loaded cores, and Tables 4C1 to 4C6 for grouping (Cg).
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
            Table 4D2<strong className="text-yellow-400">A</strong> &nbsp;/&nbsp; Table 4D2
            <strong className="text-yellow-400">B</strong>
          </p>
          <p className="text-white text-xs mt-2">
            The suffix is what matters most day to day:{' '}
            <strong className="text-yellow-400">A</strong> = current-carrying capacity (amps),{' '}
            <strong className="text-yellow-400">B</strong> = voltage drop (mV/A/m). The letter group
            gives the insulation and conductor material, and the number gives the construction — so
            4D2A and 4D2B are the capacity and volt-drop tables for the same cable.
          </p>
        </div>
        <p>
          The single most important point: you do not have to guess. Appendix 4 opens with{' '}
          <strong className="text-yellow-400">Table 4A3</strong>, which lists every cable
          construction against the table that gives its current rating. Read the series letter as
          the insulation and conductor material — <strong className="text-yellow-400">4D</strong> is
          70&deg;C thermoplastic (PVC) with copper conductors,{' '}
          <strong className="text-yellow-400">4E</strong> is 90&deg;C thermosetting (XLPE/LSF) with
          copper conductors — and the number as the construction within that series.
        </p>
        {/* grounded: printed BS 7671:2018+A4:2026 Appendix 4 Table 4A3 and the Appendix 4 table index (pp. 476–516): 4D1 single-core non-armoured / 4D2 multicore non-armoured / 4D3 single-core armoured / 4D4 multicore armoured / 4D5 flat cable with protective conductor, all 70 °C thermoplastic copper; 4E1–4E4 the same constructions at 90 °C thermosetting; 4F flexible; 4G mineral insulated; 4H aluminium 70 °C; 4J aluminium 90 °C. */}
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">The tables you will actually use</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li>
              <strong className="text-yellow-400">Table 4D1A</strong> — single-core 70&deg;C
              thermoplastic (PVC) cables, non-armoured, with or without sheath. This is the table
              for singles in conduit or trunking, not for twin and earth.
            </li>
            <li>
              <strong className="text-yellow-400">Table 4D2A</strong> — multicore 70&deg;C
              thermoplastic insulated and sheathed cables, non-armoured.
            </li>
            <li>
              <strong className="text-yellow-400">Table 4D5</strong> — 70&deg;C thermoplastic
              insulated and sheathed flat cable with protective conductor. This is the twin and
              earth table, and it is the one the On-Site Guide sends you to for T&amp;E in contact
              with thermal insulation.
            </li>
            <li>
              <strong className="text-yellow-400">Table 4D4A / 4E4A</strong> — multicore armoured
              (SWA): 4D4A for 70&deg;C thermoplastic, 4E4A for 90&deg;C thermosetting.
            </li>
            <li>
              <strong className="text-yellow-400">Table 4E series</strong> — 90&deg;C thermosetting
              (XLPE/LSF) copper cables: 4E1A single-core, 4E2A multicore, 4E3A single-core armoured,
              4E4A multicore armoured.
            </li>
            <li>
              <strong className="text-yellow-400">Table 4F</strong> — flexible cables and cords;{' '}
              <strong className="text-yellow-400">4G</strong> — mineral insulated (MICC);{' '}
              <strong className="text-yellow-400">4H / 4J</strong> — aluminium conductors (70&deg;C
              and 90&deg;C thermoplastic respectively).
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cc-tables',
    heading: 'Current-Carrying Capacity: Which Table, and Which Column',
    content: (
      <>
        <p>
          This is what most electricians come to Appendix 4 for: the current-carrying capacity (Iz)
          of a cable. Before you read a number, fix two things — the{' '}
          <strong className="text-yellow-400">table</strong> (from Table 4A3, by construction and
          insulation) and the <strong className="text-yellow-400">column</strong> (your reference
          method). For flat twin and earth the table is{' '}
          <strong className="text-yellow-400">Table 4D5</strong>; for 90&deg;C thermosetting
          multicore it is <strong className="text-yellow-400">Table 4E2A</strong>. The indicative
          figures below are for two loaded conductors clipped direct at the standard reference
          conditions — 30&deg;C ambient, single circuit, no grouping and no thermal insulation.
          Always read the actual value off the printed table for your exact construction and
          reference method, then apply correction factors for any condition that differs.
        </p>
        {/* NOTE: the Iz figures below could not be verified against the printed Appendix 4 capacity
            tables (landscape pages, not machine-readable) and are therefore shown as indicative
            only, with no table number attached. They must be confirmed against the printed
            BS 7671:2018+A4:2026 Appendix 4 before being cited as tabulated values. */}
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-1">
            Indicative Iz (A) — clipped direct, two loaded conductors
          </h3>
          <p className="text-white/70 text-xs mb-4">
            70&deg;C thermoplastic (PVC) vs 90&deg;C thermosetting (XLPE/LSF), same conductor size.
            Confirm against the printed table for your construction.
          </p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="p-2 rounded bg-white/[0.08] text-center font-bold text-white">
              Conductor
            </div>
            <div className="p-2 rounded bg-white/[0.08] text-center font-bold text-white">
              70&deg;C PVC
            </div>
            <div className="p-2 rounded bg-white/[0.08] text-center font-bold text-white">
              90&deg;C XLPE
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
            Indicative only — read the tabulated figure from BS 7671:2018+A4:2026 Appendix 4 for
            your construction (Table 4A3 tells you which table) and your reference method. Iz is the
            tabulated capacity before correction factors — always compare against the required It
            once Ca, Cg, Ci and Cf are applied.
          </p>
        </div>
        <p>
          The 90&deg;C thermosetting column is consistently higher than the 70&deg;C PVC column for
          the same conductor size, because the 90&deg;C insulation tolerates more heat. For any
          installation method other than clipped direct, the capacity changes — read the correct
          column for your{' '}
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
        {/* grounded: printed BS 7671:2018+A4:2026 Chapter 52 — Reg 521.1 (installation method per Table 4A1), Reg 521.2/521.3 (situation per Table 4A2, which gives the reference method). Reg 521.201 is prefabricated wiring systems to BS 8488, NOT installation method. */}
        <p>
          Regulation 521.1 of BS 7671:2018+A4:2026 requires the installation method of a wiring
          system, in relation to the type of conductor or cable used, to be in accordance with{' '}
          <strong className="text-yellow-400">Table 4A1</strong> of Appendix 4, provided external
          influences are taken into account under Section 522. Regulation 521.2 then requires the
          installation method in relation to the situation to be in accordance with{' '}
          <strong className="text-yellow-400">Table 4A2</strong>, which is where each numbered
          installation method is illustrated and mapped to its reference method. The two methods you
          will meet most often are:
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <h3 className="font-bold text-white mb-1">Method C — clipped direct</h3>
            <p className="text-white text-sm leading-relaxed">
              Cable clipped direct to a wooden or masonry wall or ceiling — Installation Method 20
              of Table 4A2 is the worked example given in Appendix 4. This is the column used for
              the clipped-direct figures in the table above.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-1">
              Methods D1 and D2 — buried in the ground
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Amendment 4 split these out: Reference Method D1 is a cable in a conduit or duct in
              the ground, and Reference Method D2 is a cable buried in direct contact with soil.
              Distinct current-carrying capacities now apply to each, and Tables 4A2, 4D4A, 4E4A,
              4H4A and 4J4A were revised for A4:2026 to reflect it — so check you are reading an
              A4:2026 copy. Buried cables also need the Cs (soil thermal resistivity) factor from
              Table 4B3 and the Cd (depth of laying) factor from Table 4B4 in addition to Ca and Cg,
              plus Cc = 0.9 under Appendix 4, Section 5.1.1.
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
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Most commonly used PVC tables</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <span>
                <strong className="text-yellow-400">Table 4D1A</strong> — single-core 70&deg;C
                thermoplastic (PVC) cables, non-armoured, with or without sheath, copper
                conductors. The table for singles drawn into conduit or trunking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong className="text-yellow-400">Table 4D2A</strong> — multicore 70&deg;C
                thermoplastic insulated and thermoplastic sheathed cables, non-armoured, copper
                conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong className="text-yellow-400">Table 4D3A / 4D4A</strong> — armoured 70&deg;C
                thermoplastic cables: 4D3A single-core (non-magnetic armour), 4D4A multicore
                armoured.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong className="text-yellow-400">Table 4D5</strong> — 70&deg;C thermoplastic
                insulated and sheathed flat cable with protective conductor: standard flat twin and
                earth. As well as the ordinary reference-method columns it carries Installation
                Methods 100 to 103 for cable above an insulated ceiling or in an insulated stud
                wall.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Whichever table you are in, the column you select depends on the{' '}
          <SEOInternalLink href="/guides/reference-methods-cable-installation">
            reference method
          </SEOInternalLink>{' '}
          and on the number of loaded conductors — the two-loaded-conductor columns are the ones for
          single-phase circuits, the three- or four-loaded-conductor columns for three-phase. Read
          the column headings; do not count columns across from another table.
        </p>
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5 my-4">
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
                — Installation Methods 100 to 103 of Table 4A2, which the On-Site Guide section 13.5
                also directs you to. Failure to derate for thermal insulation is one of the most common
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
          The 4E series covers thermosetting insulated cables with copper conductors — cables with
          XLPE (cross-linked polyethylene) or LSF (low smoke and fume) insulation. It mirrors the 4D
          series construction for construction: 4E1A single-core non-armoured, 4E2A multicore
          non-armoured, 4E3A single-core armoured, 4E4A multicore armoured (XLPE/SWA). Thermosetting
          cables have a higher
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
            Indicative capacity comparison: 70&deg;C PVC vs 90&deg;C XLPE, clipped direct
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">Size</p>
              <p className="text-white text-xs mt-1">mm&sup2;</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">PVC 70&deg;C</p>
              <p className="text-white text-xs mt-1">4D series</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">XLPE 90&deg;C</p>
              <p className="text-white text-xs mt-1">4E series</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] text-center">
              <p className="text-yellow-400 font-bold">2.5</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">24</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">30</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] text-center">
              <p className="text-yellow-400 font-bold">4.0</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">32</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">40</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] text-center">
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
          The capacity advantage of thermosetting over thermoplastic is meaningful for the same
          conductor size and installation method, so where PVC cable sizing leads to an
          impractically large cable, switching to a 90&deg;C thermosetting cable of the same size
          may provide sufficient capacity without increasing the conductor cross-section. Two
          cautions. First, the gain is only usable if every terminal and accessory in the circuit is
          rated for the higher operating temperature: the introduction to Appendix 4 lists the
          limiting temperatures for the terminals of equipment (Section 526) as one of the
          considerations that affects conductor size. Second, Regulation 523.1 NOTE 3 expressly allows the
          70&deg;C tables (4D1 to 4D5) to be used for 90&deg;C thermosetting cables where the rating
          is to be based on 70&deg;C, which is often what you must do for that reason.
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
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5 my-6">
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
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <div className="flex items-start gap-3">
              <div>
                <h3 className="font-bold text-white mb-1">Twin and Earth (T&amp;E)</h3>
                <p className="text-white text-sm leading-relaxed">
                  The standard domestic cable. Flat profile with line, neutral, and CPC. Use
                  <strong className="text-yellow-400"> Table 4D5</strong> — &ldquo;70&deg;C
                  thermoplastic insulated and sheathed flat cable with protective conductor&rdquo;.
                  That is the only table in Appendix 4 written specifically for flat T&amp;E, and it
                  is the one Table 4A3 and the On-Site Guide both point you to. Available in 1.0,
                  1.5, 2.5, 4.0, 6.0, 10, and 16mm&sup2;. The most commonly used
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
                  commercial and industrial work. This is what{' '}
                  <strong className="text-yellow-400">Table 4D1A</strong> is for — single-core
                  70&deg;C thermoplastic cables, non-armoured, with or without sheath. Pick the
                  column for your reference method (Method A for conduit in a thermally insulating
                  wall, Method B for conduit or trunking on a wall, and so on) and for the number of
                  loaded conductors. The capacity is lower than the clipped-direct columns for the
                  same conductor size because the conduit restricts airflow around the cables.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <div className="flex items-start gap-3">
              <div>
                <h3 className="font-bold text-white mb-1">SWA (Steel Wire Armoured)</h3>
                <p className="text-white text-sm leading-relaxed">
                  Multicore armoured cable with mechanical protection from the steel wire armouring.
                  Pick the table by insulation:{' '}
                  <strong className="text-yellow-400">Table 4D4A</strong> for multicore armoured
                  70&deg;C thermoplastic, and{' '}
                  <strong className="text-yellow-400">Table 4E4A</strong> for multicore armoured
                  90&deg;C thermosetting — 4E4A is the one for the XLPE/SWA normally specified in
                  the UK. Standard for underground burial, external runs, and submain distribution.
                  When buried, apply the Cs soil thermal resistivity factor (Table 4B3) and the Cd
                  depth factor (Table 4B4) as well as Ca and Cg, and use the correct buried
                  reference method — D1 in a duct, D2 in direct contact with soil. The armouring
                  also serves as the circuit protective conductor (CPC) in many installations.
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
                  <strong className="text-yellow-400"> 4F series</strong> tables — 4F1A for
                  60&deg;C thermosetting insulated flexible cables, 4F2A for 90&deg;C and 180&deg;C
                  thermosetting, and 4F3A for flexible cables generally (Regulation 559.5.2 points
                  to 4F3A for flexible cord to luminaires). Flexible cables
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
                  non-armoured. Table 4A3 of Appendix 4 maps that description straight to the table
                  letter (D, E, F, G, H, J) and number.
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
          Here are the sizes most often needed for everyday domestic and light commercial work,
          with indicative capacities for a 90&deg;C thermosetting cable clipped direct with two
          loaded conductors. Read the tabulated value from Appendix 4 for the cable you are actually
          using — Table 4D5 for 70&deg;C flat twin and earth, the 4E series for 90&deg;C
          thermosetting — and remember the protective device rating (In) must sit between the design
          current and the cable capacity: Ib &le; In &le; Iz, per Regulation 433.1.1.
        </p>
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            Indicative Iz — 90&deg;C thermosetting, clipped direct, 2 loaded conductors
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
          Remember: tabulated values apply under reference conditions only. Once you apply{' '}
          <SEOInternalLink href="/guides/correction-factors-bs-7671">
            correction factors
          </SEOInternalLink>
          , the effective capacity of the cable is reduced — a cable grouped with others and in
          contact with insulation can lose a third of its tabulated capacity or more. Always
          calculate the required It before selecting from the table.
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
    href: '/how-to-size-cables',
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
      dateModified="2026-08-06"
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
      heroSubtitle="The complete guide to BS 7671 Appendix 4. Find the right table from Table 4A3 — 4D1A for single-core PVC, 4D2A for multicore PVC, 4D5 for flat twin and earth, the 4E series for 90°C thermosetting — then choose the right reference method column, apply correction factors, and check voltage drop, all to BS 7671:2018+A4:2026."
      readingTime={13}
      answerBox={{
        question: 'What is BS 7671 Appendix 4?',
        answer:
          'Appendix 4 of BS 7671 contains the current-carrying capacity tables for every cable type and installation method — the core reference for all cable sizing. Table 4A3 indexes each construction to its table: 4D1A is single-core 70°C PVC, 4D2A is multicore 70°C PVC, 4D5 is flat twin and earth, and the 4E series covers 90°C thermosetting. You then read the column for your reference method. Voltage drop (mV/A/m values and the 3%/5% limits) sits in Appendix 4, Section 6.4, unchanged by Amendment 4 (A4:2026).',
        detail:
          'Use the correct table for your cable type and the correct column for your reference method — getting either wrong gives the wrong current-carrying capacity.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Every Appendix 4 table, always in your pocket"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for instant cable sizing with every BS 7671 table built in. 70+ calculators, 19 certificate types — all BS 7671:2018+A4:2026. 7-day free trial, cancel anytime."
    />
  );
}
