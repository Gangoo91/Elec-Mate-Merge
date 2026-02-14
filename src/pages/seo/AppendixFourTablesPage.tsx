import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  BookOpen,
  Cable,
  Calculator,
  ShieldCheck,
  Layers,
  Zap,
  ClipboardCheck,
  Thermometer,
  AlertTriangle,
  Search,
  Table2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'BS 7671 Appendix 4 Tables | Current Carrying Capacity';
const PAGE_DESCRIPTION =
  'Complete guide to BS 7671 Appendix 4 tables. How to read current carrying capacity tables (4D1A-4J4A) for PVC and XLPE cables, voltage drop tables (mV/A/m), and how to use them with correction factors and reference methods for cable sizing.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Appendix 4 Tables BS 7671', href: '/guides/appendix-4-tables-bs-7671' },
];

const tocItems = [
  { id: 'what-is-appendix-4', label: 'What Is Appendix 4?' },
  { id: 'table-numbering', label: 'Understanding Table Numbering' },
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
  'Voltage drop values (mV/A/m) are now in Appendix 12 following Amendment 3 (A3:2024) — previously they were in Appendix 4. The values themselves are unchanged.',
  'You must use the correct table for your cable type AND the correct column for your reference method — getting either wrong gives the wrong current-carrying capacity.',
  'Elec-Mate has every Appendix 4 table built into the cable sizing calculator. Select cable type and reference method, and the app looks up the correct value instantly — no more flicking through the brown book.',
];

const faqs = [
  {
    question: 'What does Appendix 4 of BS 7671 contain?',
    answer:
      'Appendix 4 of BS 7671 contains the current-carrying capacity tables for all standard cable types used in UK electrical installations. These tables give the maximum current (in amperes) that a cable of a given size can carry continuously under specific reference conditions — a defined installation method, an ambient temperature of 30 degrees Celsius, no grouping with other circuits, and no thermal insulation. The tables cover thermoplastic (PVC) insulated cables, thermosetting (XLPE and LSF) insulated cables, mineral insulated (MICC) cables, and flexible cables, in sizes from 1mm squared up to 630mm squared or more. Appendix 4 also contains the correction factor tables (Table 4B1 for ambient temperature, Tables 4C1 to 4C5 for grouping) and, prior to Amendment 3, the voltage drop tables (mV/A/m values). After Amendment 3 (A3:2024), the voltage drop tables have been moved to Appendix 12, though the values remain the same.',
  },
  {
    question: 'How do I read the Appendix 4 current-carrying capacity tables?',
    answer:
      'Each current-carrying capacity table has rows for cable sizes (1mm squared, 1.5mm squared, 2.5mm squared, etc.) and columns for different reference methods and conductor configurations. To read the table correctly: (1) Identify the correct table for your cable type — for example, Table 4D5A for multicore thermoplastic (PVC) cable such as twin and earth. (2) Find the column that matches your reference method — the column headers indicate which installation method each column covers (e.g., Reference Method A, B, C). (3) Find the row for your cable size. (4) Read the current-carrying capacity value at the intersection of the correct column and row. This value is the tabulated current-carrying capacity (Iz) under reference conditions. You then compare this against the minimum tabulated current rating (It) calculated after applying all correction factors. The cable is suitable if Iz is greater than or equal to It.',
  },
  {
    question: 'What is the difference between the 4D and 4E tables?',
    answer:
      'The 4D series tables cover thermoplastic insulated cables — cables with PVC insulation, which is by far the most common cable type in UK domestic and light commercial installations. Twin and earth cable, singles in conduit, and standard PVC-insulated flexible cables are all thermoplastic. The 4E series tables cover thermosetting insulated cables — cables with XLPE (cross-linked polyethylene) or LSF (low smoke and fume) insulation. Thermosetting cables can operate at a higher conductor temperature (90 degrees Celsius compared to 70 degrees Celsius for PVC), so they have higher current-carrying capacities for the same conductor size and installation method. They are used where higher current capacity is needed without increasing cable size, or in locations where the fire performance of PVC is inadequate (such as escape routes, where LSF cables are required). The table numbers follow the pattern: 4D for PVC, 4E for XLPE/LSF, 4F for armoured cables, 4H for MICC, and 4J for flexible cables.',
  },
  {
    question: 'What are mV/A/m voltage drop values and how do I use them?',
    answer:
      'The mV/A/m (millivolts per ampere per metre) values are used to calculate the voltage drop across a cable run. The voltage drop formula is: VD = mV/A/m x Ib x L / 1000, where VD is the voltage drop in volts, Ib is the design current in amperes, and L is the cable length in metres. The mV/A/m values were previously in Appendix 4 of BS 7671 but have been moved to Appendix 12 following Amendment 3 (A3:2024). The values themselves have not changed. Each cable type and size has a specific mV/A/m value that depends on the conductor resistance and, for AC circuits, the conductor reactance. For single-phase circuits, you use the two-core or single-phase mV/A/m values. For three-phase circuits, the tables provide separate three-phase mV/A/m values that account for the different voltage relationship in a balanced three-phase system. BS 7671 limits voltage drop to 3 percent for lighting circuits and 5 percent for all other circuits, measured from the origin of the installation.',
  },
  {
    question: 'Where can I find the tables for SWA cable?',
    answer:
      'Steel wire armoured (SWA) cable current-carrying capacity tables are in the Appendix 4 series covering armoured cables. For multicore thermoplastic (PVC) armoured cable, use Table 4D4A (and associated columns). For multicore thermosetting (XLPE) armoured cable, use Table 4E4A. The SWA tables include columns for different installation methods, but the most commonly used methods for SWA are Method C (clipped direct to a surface), Method D (buried underground in a duct or directly buried), and Methods E/F (on a cable tray). SWA cable is the standard choice for underground runs to outbuildings, submain feeds, and external installations. When sizing SWA for underground use (Method D), remember to use the specific underground tables and apply the ground temperature and soil thermal resistivity corrections.',
  },
  {
    question: 'Have the Appendix 4 tables changed in Amendment 3 (A3:2024)?',
    answer:
      'The main change in Amendment 3 affecting Appendix 4 is the relocation of the voltage drop tables. The mV/A/m (millivolts per ampere per metre) tables, which were previously located within Appendix 4, have been moved to a new Appendix 12. This is an organisational change — the voltage drop values themselves have not changed. The current-carrying capacity tables remain in Appendix 4 and their values are unchanged by Amendment 3. The reason for the relocation is to improve the structure of the standard and separate the current-carrying capacity data (which is about thermal performance) from the voltage drop data (which is about electrical performance). In practice, this means that when you are sizing cables, you still use Appendix 4 for current-carrying capacity and now use Appendix 12 for voltage drop — but the actual numbers you use are the same as before.',
  },
  {
    question: 'Does Elec-Mate include all the Appendix 4 tables?',
    answer:
      'Yes. Elec-Mate includes every current-carrying capacity table from BS 7671 Appendix 4 and every voltage drop table from Appendix 12 (previously Appendix 4). When you use the cable sizing calculator, you select the cable type (twin and earth, singles in conduit, SWA, MICC, flexible, etc.) and the reference method (A through G), and the calculator automatically looks up the correct value from the appropriate table. It also applies all correction factors (Ca, Cg, Ci, Cf) and checks voltage drop against the BS 7671 limits. The entire Appendix 4 dataset is stored locally on your device, so the calculator works offline on site without any mobile signal. This is one of 70 electrical calculators included in Elec-Mate, all built to BS 7671:2018+A3:2024.',
  },
];

const sections = [
  {
    id: 'what-is-appendix-4',
    heading: 'What Is Appendix 4?',
    content: (
      <>
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
          <SEOInternalLink href="/guides/reference-methods-bs-7671">
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
          title="Every Appendix 4 table in your pocket"
          description="Elec-Mate has every current-carrying capacity table from Appendix 4 built into the cable sizing calculator. Select cable type and reference method — the app looks up the correct value instantly. No more flicking through the brown book on site."
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
            Table 4<strong className="text-yellow-400">[Letter]</strong>
            <strong className="text-yellow-400">[Number]</strong>A
          </p>
          <p className="text-white text-xs mt-2">
            Letter = cable type | Number = conductor configuration | A = current-carrying capacity
            (B = voltage drop)
          </p>
        </div>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cable Type Letters</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-yellow-400 font-bold">D</p>
                <p className="text-white text-sm">Thermoplastic (PVC)</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-yellow-400 font-bold">E</p>
                <p className="text-white text-sm">Thermosetting (XLPE/LSF)</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-yellow-400 font-bold">F</p>
                <p className="text-white text-sm">Armoured (SWA)</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-yellow-400 font-bold">H</p>
                <p className="text-white text-sm">Mineral insulated (MICC)</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-yellow-400 font-bold">J</p>
                <p className="text-white text-sm">Flexible cables</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Conductor Configuration Numbers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-yellow-400 font-bold">1</p>
                <p className="text-white text-sm">Single-core (singles)</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-yellow-400 font-bold">2</p>
                <p className="text-white text-sm">Single-core (specific arrangements)</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-yellow-400 font-bold">4</p>
                <p className="text-white text-sm">Multicore (armoured types)</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-yellow-400 font-bold">5</p>
                <p className="text-white text-sm">Multicore (non-armoured)</p>
              </div>
            </div>
          </div>
        </div>
        <p>
          So <strong className="text-yellow-400">Table 4D5A</strong> is: Appendix 4, thermoplastic
          (PVC), multicore (non-armoured), current-carrying capacity. This is the table you use for
          standard domestic twin and earth cable.{' '}
          <strong className="text-yellow-400">Table 4D1A</strong> is for PVC single-core cables —
          the type used in conduit and trunking installations.
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
              <Table2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Table 4D1A</strong> — Single-core PVC/copper
                cables in conduit, trunking, or enclosed. Used for singles in conduit installations
                (commercial/industrial).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Table2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Table 4D2A</strong> — Single-core PVC/copper
                cables, clipped direct or on cable tray. Used for large singles on cable tray
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Table2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Table 4D5A</strong> — Multicore PVC/copper
                cables (non-armoured), including twin and earth. The most frequently used table in
                domestic work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When using Table 4D5A for twin and earth cable, the column you select depends on the{' '}
          <SEOInternalLink href="/guides/reference-methods-bs-7671">
            reference method
          </SEOInternalLink>
          . Column 6 (two loaded conductors) is the standard column for single-phase circuits in
          twin and earth cable under the various reference methods.
        </p>
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
            Capacity comparison: PVC vs XLPE (Method C, 2 loaded conductors)
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">Size</p>
              <p className="text-white text-xs mt-1">mm&sup2;</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">PVC (4D)</p>
              <p className="text-white text-xs mt-1">Amperes</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">XLPE (4E)</p>
              <p className="text-white text-xs mt-1">Amperes</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-center">
              <p className="text-yellow-400 font-bold">2.5</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">27</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">36</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-center">
              <p className="text-yellow-400 font-bold">4.0</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">36</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">49</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-center">
              <p className="text-yellow-400 font-bold">6.0</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">47</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white font-bold">63</p>
            </div>
          </div>
        </div>
        <p>
          The capacity advantage of XLPE over PVC is approximately 30-35%. This means that in
          situations where PVC cable sizing leads to an impractically large cable, switching to XLPE
          or LSF cable of the same size may provide sufficient capacity without increasing the
          conductor cross-section.
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
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-white mb-1">Amendment 3 change: Appendix 12</h3>
              <p className="text-white text-sm leading-relaxed">
                Following Amendment 3 (A3:2024), the voltage drop tables have been moved from
                Appendix 4 to a new Appendix 12. The values themselves have not changed — this is an
                organisational restructure to separate current-carrying capacity data from voltage
                drop data. If you are using BS 7671:2018+A2:2022 (the physical brown book), the
                voltage drop tables are still in Appendix 4. If you are using the Amendment 3
                supplement, refer to Appendix 12.
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
          description="Elec-Mate's cable sizing calculator checks voltage drop as part of every cable sizing calculation. Enter the cable length and the app uses the correct mV/A/m value from Appendix 12. Warns if the drop exceeds BS 7671 limits."
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
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Twin and Earth (T&E)</h3>
                <p className="text-white text-sm leading-relaxed">
                  The standard domestic cable. Flat profile with line, neutral, and CPC. Use
                  <strong className="text-yellow-400"> Table 4D5A</strong> (multicore PVC
                  non-armoured). Available in 1.0, 1.5, 2.5, 4.0, 6.0, 10, and 16mm&sup2;. The most
                  commonly used sizes are 1.5mm&sup2; for lighting, 2.5mm&sup2; for ring circuits,
                  and 6mm&sup2; or 10mm&sup2; for cookers and showers.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Singles in Conduit</h3>
                <p className="text-white text-sm leading-relaxed">
                  Single-core PVC-insulated cables drawn into conduit or trunking. Use
                  <strong className="text-yellow-400"> Table 4D1A</strong> (single-core PVC in
                  conduit). Standard in commercial and industrial work. The capacity is lower than
                  T&E for the same conductor size because the conduit restricts airflow around the
                  cables.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">SWA (Steel Wire Armoured)</h3>
                <p className="text-white text-sm leading-relaxed">
                  Multicore armoured cable with mechanical protection from the steel wire armouring.
                  Use <strong className="text-yellow-400">Table 4D4A</strong> (PVC armoured) or
                  <strong className="text-yellow-400"> Table 4E4A</strong> (XLPE armoured). Standard
                  for underground burial, external runs, and submain distribution. The armouring
                  also serves as the circuit protective conductor (CPC) in many installations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
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
                  <SEOInternalLink href="/guides/reference-methods-bs-7671">
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
                  (Ca, Cg, Ci, Cf) to calculate the minimum tabulated current rating: It = In / (Ca
                  x Cg x Ci x Cf).
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
          description="Skip the manual table lookup. Elec-Mate's cable sizing calculator selects the correct table, applies correction factors, and gives you the cable size in seconds. Every Appendix 4 table is built in. Works offline."
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
          commercial work. These are for PVC (thermoplastic) twin and earth cable from Table 4D5A,
          Reference Method C (clipped direct), two loaded conductors.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            Table 4D5A — T&E, Method C, 2 Loaded Conductors
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
              27
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Ring circuit</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">4.0mm&sup2;</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              36
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Immersion</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">6.0mm&sup2;</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              47
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Cooker/shower</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">10mm&sup2;</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              64
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Large cooker</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">16mm&sup2;</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              85
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Sub-main</div>
          </div>
        </div>
        <p>
          Remember: these are the tabulated values under reference conditions. Once you apply{' '}
          <SEOInternalLink href="/guides/correction-factors-bs-7671">
            correction factors
          </SEOInternalLink>
          , the effective capacity of the cable is reduced. A 2.5mm&sup2; cable with Iz = 27A may
          only be able to carry 19A after derating for grouping and insulation. Always calculate the
          required It before selecting from the table.
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
    href: '/guides/reference-methods-bs-7671',
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
      'Calculate voltage drop using mV/A/m values from Appendix 12 for any cable type and circuit.',
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
      dateModified="2026-02-14"
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
      heroSubtitle="The complete guide to BS 7671 Appendix 4. How to read the current-carrying capacity tables (4D1A to 4J4A), understand the table numbering system, use voltage drop tables (now Appendix 12), and look up the right values for PVC, XLPE, SWA, and flexible cables."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Every Appendix 4 table, always in your pocket"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for instant cable sizing with every BS 7671 table built in. 70 calculators, 8 certificate types — all BS 7671:2018+A3:2024. 7-day free trial, cancel anytime."
    />
  );
}
