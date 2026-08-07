import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import VoltageDropCalculator from '@/components/apprentice/calculators/VoltageDropCalculator';
import { Calculator, Cable, BarChart3, Shield, BookOpen, Activity, Ruler } from 'lucide-react';

// -------------------------------------------------------------------
// Shared styles
// -------------------------------------------------------------------

/** Cards go edge-to-edge on phones, inset and rounded from sm: up. */
const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x';

const noteCn =
  '-mx-4 my-5 rounded-none border-y border-orange-500/30 bg-orange-500/10 p-5 ' +
  'sm:mx-0 sm:rounded-2xl sm:border-x';

const thCn = 'text-left font-bold text-white p-3 border border-white/10';
const tdCn = 'p-3 border border-white/10 text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Calculators', href: '/electrical-testing-calculators' },
  { label: 'Three Phase Voltage Drop', href: '/tools/cable-volt-drop-three-phase' },
];

const tocItems = [
  { id: 'calculator', label: 'Three-Phase Volt Drop Calculator' },
  { id: 'formula', label: 'The Formula' },
  { id: 'bs7671-limits', label: 'BS 7671 Limits' },
  { id: 'root-three-factor', label: 'The Root 3 Factor' },
  { id: 'three-phase-volt-drop', label: 'What Is Three-Phase Voltage Drop?' },
  { id: 'balanced-vs-unbalanced', label: 'Balanced vs Unbalanced' },
  { id: 'worked-examples', label: 'Worked Examples' },
  { id: 'common-cables', label: 'Common Cable Values' },
  { id: 'how-to', label: 'Step-by-Step Method' },
  { id: 'features', label: 'Calculator Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The formula is VD = mV/A/m x Ib x L / 1000 — the same structure as single-phase, but you must read the three-phase column of the BS 7671 Appendix 4 tables, not the single-phase column.',
  'On a 400 V three-phase supply taken from the public distribution network the limit is 5% = 20 V for power and 3% = 12 V for lighting. The figures are in Appendix 4, Section 6.4 (Table 4Ab); Regulation 525.202 is what makes meeting them deem the requirement satisfied.',
  'The root 3 factor is already inside the tabulated three-phase mV/A/m values — Appendix 4, Section 6 states that for three-phase circuits the tabulated values relate to the line voltage and balanced conditions are assumed. Never multiply by 1.732 again.',
  'For a balanced load one calculation covers the circuit. For an unbalanced load, work phase by phase using the single-phase mV/A/m values, and assess the neutral separately where third harmonic content is significant.',
  "Elec-Mate's three-phase voltage drop calculator has the Appendix 4 tables built in, handles balanced and unbalanced loads, and gives an instant pass/fail against the correct limit.",
];

const faqs = [
  {
    question: 'What is the maximum voltage drop allowed on a three-phase circuit under BS 7671?',
    answer:
      'The figures are in BS 7671 Appendix 4, Section 6.4 (Table 4Ab), and Regulation 525.202 makes meeting them deem the requirement satisfied. For a low voltage installation supplied directly from a public low voltage distribution system the limit is 5% of the nominal voltage for "other uses" (power) and 3% for lighting. On a 400 V three-phase supply that is 20 V and 12 V respectively. For an installation supplied from a private low voltage supply, such as a standby generator or a private transformer, Table 4Ab allows 8% and 6% — but the table carries a footnote that the voltage drop within each final circuit should still not exceed the 3% and 5% values. The drop is measured from the origin of the installation, usually the supply terminals, to the socket-outlet or the terminals of the fixed current-using equipment, so any sub-main in the path counts towards the total.',
  },
  {
    question: 'Why is the root 3 factor used in three-phase voltage drop calculations?',
    answer:
      'The root 3 factor (1.732) comes from the 120-degree displacement between the three phases. In a star-connected system the line voltage is root 3 times the phase voltage, which is why 230 V x 1.732 = 400 V. You do not apply it yourself when using the BS 7671 tables. Appendix 4, Section 6 states that for three-phase circuits the tabulated mV/A/m values relate to the line voltage and that balanced conditions are assumed, so the factor is already inside the number you look up. The three-phase column is lower than the single-phase column because a single-phase circuit drops volts in two conductors (out and return), giving 2 x I x R x L, whereas a balanced three-phase circuit carries no neutral current and the line-to-line drop is root 3 x I x R x L. The three-phase value is therefore about 0.866 of the single-phase value, not one third or one root-three of it.',
  },
  {
    question: 'How do I calculate voltage drop for an unbalanced three-phase circuit?',
    answer:
      'The tabulated three-phase values assume balanced conditions, so when the phases carry different currents you cannot use them directly. Work phase by phase instead: for each phase use the single-phase mV/A/m value and the current in that phase, VD = single-phase mV/A/m x Iphase x L / 1000. Compare each result against the limit as a percentage of the nominal voltage for that circuit, which for a phase-to-neutral final circuit on a 400/230 V system is 230 V — 11.5 V for power and 6.9 V for lighting. Then look at the neutral. In an unbalanced system it carries the vector sum of the three phase currents, and where there is significant third harmonic content the harmonic components add rather than cancel, so the neutral can carry more current than any line conductor. Appendix 4, Sections 5.5 and 5.6 cover the rating factors for this.',
  },
  {
    question: 'What three-phase mV/A/m values should I use for SWA cable?',
    answer:
      'Steel wire armoured cable is covered by the multicore armoured tables in BS 7671 Appendix 4. For 70 degrees C thermoplastic (PVC) insulated multicore armoured cable with copper conductors that is Table 4D4B, and for 90 degrees C thermosetting (XLPE) insulated multicore armoured cable it is Table 4E4B. Take the column headed for three-phase a.c., not the two-core single-phase column. Do not confuse these with Tables 4E2B and 4D2B, which are the multicore NON-armoured tables. For aluminium conductors the equivalents are Tables 4H4B and 4J4B. Above 16 mm2 the tables give an impedance value together with separate resistive and reactive components, so check which figure you have picked up. Always read the value from the printed table for your exact cable construction and conductor material rather than relying on a summary.',
  },
  {
    question: 'Does voltage drop on a sub-main count towards the final circuit limit?',
    answer:
      'Yes. Regulation 525.202 sets the drop between the origin of the installation, usually the supply terminals, and the socket-outlet or the terminals of the fixed current-using equipment. That is the whole path, so the drop across every sub-main in the chain adds to the drop in the final circuit. If a three-phase sub-main drops 8 V and the final circuit drops 10 V, the total of 18 V is what you check against the 20 V limit. On installations with several distribution boards it is worth allocating a budget up front — for example 2% to the sub-main and 3% to the final circuit. Note also that Table 4Ab allows the percentages to be increased by 0.005% per metre of wiring system beyond 100 m, capped at an extra 0.5%, which can help on a long industrial run.',
  },
  {
    question: 'How does cable temperature affect three-phase voltage drop?',
    answer:
      'The tabulated mV/A/m values assume the conductors are at their maximum permitted normal operating temperature. A cable carrying well under its rated current runs cooler, its resistance is lower, and the real voltage drop is less than the tabulated figure. Appendix 4, Section 6.1 gives a factor Ct for this. Two conditions attach to it: the overcurrent protective device must be something other than a BS 3036 semi-enclosed fuse, and the actual ambient temperature must be at or above 30 degrees C. The scope also depends on conductor size. At 16 mm2 or less you multiply the tabulated mV/A/m by Ct directly. Above 16 mm2 only the resistive part of the drop is affected, so Ct is applied to the tabulated resistive component alone and the design impedance is the vector sum of Ct x the resistive component and the unchanged reactive component. For very large conductors where the reactance dominates, x/r greater than 3, Section 6.1 says the factor need not be considered at all. Because three-phase sub-mains are usually well above 16 mm2, the simple "multiply by Ct" version rarely applies to them.',
  },
  {
    question: 'Can I use the Elec-Mate calculator for three-phase motor circuits?',
    answer:
      'Yes. The calculator takes both the running current and the starting current so you can look at the steady-state drop and the transient dip separately. BS 7671 recognises the distinction: Regulation 525.203 allows a greater voltage drop than Appendix 4, Section 6.4 during motor starting periods and for other equipment with high inrush currents, provided it is verified that the voltage variations stay within the limits in the relevant product standard, or the manufacturer\'s recommendations where there is no product standard. Table 4Ab carries the same allowance as a note. That proviso matters — the starting drop is not simply exempt. Excessive drop during starting can stop the motor getting away, drop out contactors, and disturb other equipment on the same supply, so it is worth checking even where the steady-state figure passes comfortably.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Single-phase voltage drop calculator with built-in BS 7671 tables and instant pass/fail indication.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables to BS 7671 with automatic correction factors, voltage drop check, and protective device coordination.',
    icon: Cable,
    category: 'Calculator',
  },
  {
    href: '/tools/three-phase-power-calculator',
    title: 'Three Phase Power Calculator',
    description:
      'Calculate three-phase power, current, and voltage for balanced and unbalanced loads. Star and delta configurations.',
    icon: Activity,
    category: 'Calculator',
  },
  {
    href: '/guides/voltage-drop-limits-bs-7671',
    title: 'Voltage Drop Guide BS 7671',
    description:
      'Complete guide to voltage drop requirements under BS 7671 including tables, formulas, and worked examples.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-size-cables',
    title: 'How to Size Cables',
    description:
      'Step-by-step cable sizing procedure: current-carrying capacity, correction factors, and voltage drop verification.',
    icon: Ruler,
    category: 'Guide',
  },
  {
    href: '/electrical-testing-calculators',
    title: 'All Electrical Calculators',
    description:
      '70+ BS 7671 compliant calculators for UK electricians. Voltage drop, cable sizing, fault current, and more.',
    icon: Calculator,
    category: 'Calculator',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Three-Phase mV/A/m Lookup',
    description:
      'The BS 7671 Appendix 4 voltage drop tables are built in. Select your cable type and the correct three-phase value is applied automatically.',
  },
  {
    icon: Activity,
    title: 'Balanced & Unbalanced Modes',
    description:
      'Switch between balanced three-phase calculations and per-phase unbalanced calculations. Enter a single current or individual phase currents.',
  },
  {
    icon: Cable,
    title: 'All UK Cable Types',
    description:
      'Supports SWA, singles in trunking and conduit, XLPE, multicore, and MI cables. Copper and aluminium conductors. Three-core and four-core configurations.',
  },
  {
    icon: BarChart3,
    title: 'Pass/Fail Indication',
    description:
      'Instant colour-coded pass/fail against the correct limit — 20 V (5%) for power or 12 V (3%) for lighting on a 400 V three-phase public supply.',
  },
  {
    icon: Ruler,
    title: 'Maximum Cable Length',
    description:
      'Works out the longest permissible run for your chosen cable size and load before the voltage drop limit is exceeded.',
  },
  {
    icon: Shield,
    title: 'BS 7671:2018+A4:2026',
    description:
      'Calculations follow the current edition of the wiring regulations, including Amendment 4. Values taken from the published Appendix 4 tables.',
  },
];

const howToSteps = [
  {
    name: 'Identify the circuit parameters',
    text: 'Determine the design current (Ib) per phase in amperes, the run length (L) in metres from the distribution board to the furthest point, whether the load is balanced or unbalanced, and the circuit type (lighting or power).',
  },
  {
    name: 'Select the cable type and confirm it is three-phase',
    text: 'Identify the cable construction (armoured, singles in conduit, multicore), conductor material (copper or aluminium), insulation type (70 degrees C thermoplastic or 90 degrees C thermosetting), and the number of cores — 3-core or 4-core for three-phase.',
  },
  {
    name: 'Look up the three-phase mV/A/m value',
    text: 'Open the correct Appendix 4 voltage drop table. The B-suffix tables from 4D1B to 4J4B carry the voltage drop figures. Find the row for your cross-sectional area and read the three-phase a.c. column, not the single-phase column. Above 16 mm2 the table gives an impedance value plus separate resistive and reactive components.',
  },
  {
    name: 'Apply the voltage drop formula',
    text: 'Calculate VD = mV/A/m (three-phase) x Ib x L / 1000. The result is the line-to-line voltage drop in volts, because the tabulated three-phase values relate to the line voltage. For a balanced load, Ib is the current per phase.',
  },
  {
    name: 'Check against the Table 4Ab limit',
    text: 'On a public low voltage supply, compare against 20 V (5% of 400 V) for power or 12 V (3% of 400 V) for lighting. If a sub-main feeds the board, add its drop to the final circuit drop — Regulation 525.202 covers the whole path from the origin.',
  },
  {
    name: 'Refine the figure only if it is marginal',
    text: 'Appendix 4, Sections 6.1 and 6.2 allow correction for operating temperature and load power factor. The temperature factor Ct applies only where the protective device is not a BS 3036 fuse and the ambient temperature is at least 30 degrees C, and above 16 mm2 it is applied to the resistive component alone.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'formula',
    heading: 'The Three-Phase Voltage Drop Formula',
    content: (
      <>
        <p className="mb-2">
          <a
            href="#calculator"
            className="inline-flex h-11 touch-manipulation items-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90"
          >
            Jump to the free three-phase volt drop calculator
          </a>
        </p>
        <div className={`${cardCn} text-center`}>
          <p className="font-mono text-xl font-bold text-elec-yellow sm:text-2xl">
            VD = (mV/A/m<sub>3ph</sub> &times; I<sub>b</sub> &times; L) / 1000
          </p>
          <div className="mx-auto mt-4 max-w-md space-y-1 text-left text-sm text-white">
            <p>
              <strong>VD</strong> = line-to-line voltage drop in volts
            </p>
            <p>
              <strong>
                mV/A/m<sub>3ph</sub>
              </strong>{' '}
              = three-phase millivolts per ampere per metre, from the BS 7671 Appendix 4 tables
            </p>
            <p>
              <strong>
                I<sub>b</sub>
              </strong>{' '}
              = design current per phase in amperes
            </p>
            <p>
              <strong>L</strong> = run length in metres
            </p>
          </div>
        </div>
        <p>
          Two things separate this from the single-phase calculation. You must read the three-phase
          column of the table rather than the single-phase column, and the answer is compared
          against a percentage of 400 V rather than 230 V.
        </p>
        <p>
          Appendix 4, Section 6 is explicit about what the tabulated number already contains: for
          three-phase circuits the tabulated mV/A/m values relate to the line voltage, and balanced
          conditions have been assumed. The root 3 is inside the figure. Multiply the length by the
          design current, divide by 1000, and you have the line-to-line drop in volts.
        </p>

        <h3 className="mb-2 mt-6 text-base font-semibold text-white">
          Cables above 16 mm&sup2;: resistance and reactance
        </h3>
        <p>
          For conductors of 16 mm&sup2; or less, Appendix 4, Section 6 says the inductance can be
          ignored and only a single mV/A/m value is tabulated. Above 16 mm&sup2; the table gives an
          impedance value (mV/A/m)<sub>z</sub> together with a resistive component (mV/A/m)
          <sub>r</sub> and a reactive component (mV/A/m)<sub>x</sub>. Using the impedance value on
          its own is safe but pessimistic.
        </p>
        <p>
          Where the load power factor is worth taking into account, Section 6.2 gives the design
          value as cos&nbsp;&phi;&nbsp;&times;&nbsp;(mV/A/m)<sub>r</sub> +
          sin&nbsp;&phi;&nbsp;&times;&nbsp;(mV/A/m)<sub>x</sub>. This is the same relationship as the
          first-principles form &radic;3&nbsp;&times;&nbsp;I&nbsp;&times;&nbsp;L&nbsp;&times;&nbsp;(R
          cos&nbsp;&phi; + X sin&nbsp;&phi;), with the &radic;3 and the per-metre resistance folded
          into the tabulated values. It matters most on{' '}
          <SEOInternalLink href="/tools/three-phase-power-calculator">
            three-phase motor circuits
          </SEOInternalLink>
          , where the power factor can be well below unity.
        </p>

        <div className={cardCn}>
          <h4 className="mb-1 font-bold text-white">
            Frequency range (BS 7671 Appendix 4, Section 6)
          </h4>
          <p className="text-sm leading-relaxed text-white">
            The tabulated voltage drop values apply, for a.c. operation, to frequencies in the range
            49 to 61 Hz. Appendix 4 warns that the voltage drop for cables operating at higher
            frequencies may be substantially greater. On the output side of a variable-frequency
            drive, the tabulated values are not the right tool.
          </p>
        </div>
        <SEOAppBridge
          title="Three-Phase Volt Drop Calculator (BS 7671)"
          description="Enter cable size, current and length to check volt drop against the 3% and 5% limits."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'bs7671-limits',
    heading: 'BS 7671 Three-Phase Voltage Drop Limits',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          Regulation 525.202 states that the voltage drop between the origin of the installation
          (usually the supply terminals) and a socket-outlet or the terminals of fixed current-using
          equipment shall not exceed the values in Appendix 4, Section 6.4. Those values are Table
          4Ab, and they are expressed as a percentage of the nominal voltage of the installation.
        </p>
        <div className="-mx-4 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Supply</th>
                <th className={thCn}>Lighting</th>
                <th className={thCn}>Other uses</th>
                <th className={thCn}>On a 400 V three-phase supply</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gradient-to-b from-white/[0.08] to-white/[0.04]">
                <td className={tdCn}>
                  (a) Low voltage installations supplied directly from a public low voltage
                  distribution system
                </td>
                <td className={`${tdCn} font-bold text-elec-yellow`}>3%</td>
                <td className={`${tdCn} font-bold text-elec-yellow`}>5%</td>
                <td className={tdCn}>12 V lighting, 20 V other uses</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className={tdCn}>
                  (b) Low voltage installation supplied from a private LV supply
                </td>
                <td className={`${tdCn} font-bold text-elec-yellow`}>6%</td>
                <td className={`${tdCn} font-bold text-elec-yellow`}>8%</td>
                <td className={tdCn}>24 V lighting, 32 V other uses</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-white">
          Source: BS 7671:2018+A4:2026, Appendix 4, Section 6.4, Table 4Ab. Volt figures are the
          percentages applied to a 400 V nominal line voltage.
        </p>

        <div className={noteCn}>
          <h4 className="mb-1 font-bold text-white">
            The 6% and 8% figures do not release the final circuit
          </h4>
          <p className="text-sm leading-relaxed text-white">
            Table 4Ab attaches a footnote to row (b): the voltage drop within each final circuit
            should not exceed the values given in row (a). A generator-fed or transformer-fed
            installation therefore gets more headroom across the distribution path as a whole, but
            each individual final circuit is still held to 3% and 5%.
          </p>
        </div>

        <h3 className="mb-2 mt-6 text-base font-semibold text-white">
          Three allowances worth knowing
        </h3>
        <p>
          <strong>Long wiring systems.</strong> Table 4Ab permits the percentages above to be
          increased by 0.005% per metre of wiring system beyond 100 m, provided the increase is not
          greater than 0.5%. The cap is reached at 200 m, where the 5% power limit becomes 5.5%.
          Beyond that length the allowance does not grow any further.
        </p>
        <p>
          <strong>Motor starting.</strong> Regulation 525.203 accepts a greater voltage drop during
          motor starting periods and for other equipment with high inrush currents — but only where
          it is verified that the voltage variations stay within the limits in the relevant product
          standard, or the manufacturer&rsquo;s recommendations where no product standard exists.
        </p>
        <p>
          <strong>Harmonics.</strong> Appendix 4, Section 6.4 states that the calculated voltage drop
          should include any effects due to harmonic currents. On a board full of switched-mode
          supplies that is not a formality.
        </p>
        <p>
          The limit applies across the whole path, so where sub-mains sit between the origin and the
          load their voltage drops are added together and the total is what must comply.
        </p>
        <SEOAppBridge
          title="Instant pass/fail against the Table 4Ab limits"
          description="Elec-Mate applies the right limit for the circuit type and supply arrangement automatically."
          icon={Shield}
        />
      </>
    ),
  },
  {
    id: 'root-three-factor',
    heading: 'The Root 3 Factor Explained',
    content: (
      <>
        <p>
          The square root of 3, about 1.732, runs through three-phase calculations. It comes from the
          geometry of three sinusoids displaced by 120 degrees: in a star-connected system the line
          voltage is root 3 times the phase voltage, which is where 230 V &times; 1.732 = 400 V comes
          from.
        </p>
        <p>
          The question that brings most people to this page is whether they need to apply it
          themselves. They do not. Appendix 4, Section 6 states that for three-phase circuits the
          tabulated mV/A/m values relate to the line voltage and balanced conditions are assumed, so
          the factor is baked into the number in the table.
        </p>
        <div className={noteCn}>
          <h4 className="mb-1 font-bold text-white">Common mistake</h4>
          <p className="text-sm leading-relaxed text-white">
            Do not multiply the result by root 3 as well. If you do, your answer comes out 73% high
            and you will oversize the cable for no reason.
          </p>
        </div>

        <h3 className="mb-2 mt-6 text-base font-semibold text-white">
          Why the three-phase column is lower
        </h3>
        <p>
          It helps to see where the difference comes from. A single-phase circuit drops voltage in
          two conductors, the line and the return, so the drop is 2 &times; I &times; R &times; L. A
          balanced three-phase circuit carries no neutral current, and the line-to-line drop works
          out at &radic;3 &times; I &times; R &times; L.
        </p>
        <p>
          The ratio between them is therefore &radic;3 / 2, or about 0.866. A tabulated three-phase
          value is roughly 87% of the single-phase value for the same cable — not a third of it, and
          not the single-phase value divided by root 3. Above 16 mm&sup2;, where reactance is
          tabulated separately, the relationship is no longer a simple ratio.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase-volt-drop',
    heading: 'What Is Three-Phase Voltage Drop?',
    content: (
      <>
        <p>
          Voltage drop in a three-phase circuit is the loss of potential along the conductors as
          current flows from the supply to the load. Every cable has resistance, and at larger sizes
          reactance too. When current passes through that impedance, part of the supply voltage is
          consumed by the cable rather than delivered to the equipment.
        </p>
        <p>
          Three line conductors each carry current displaced by 120 degrees, and the reference
          voltage is the line-to-line value of 400 V rather than the 230 V phase-to-neutral value.
          That is why the same 5% limit gives 20 V on a three-phase power circuit but only 11.5 V on
          a single-phase one.
        </p>
        <p>
          Getting it right matters most on the jobs where the runs are long:{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">cable sizing</SEOInternalLink> for
          sub-mains feeding distribution boards, motor circuits, three-phase EV chargers and large
          power supplies on commercial and industrial installations.
        </p>
      </>
    ),
  },
  {
    id: 'balanced-vs-unbalanced',
    heading: 'Balanced vs Unbalanced Three-Phase Loads',
    content: (
      <>
        <p>
          A balanced load draws equal current on all three phases at the same power factor —
          three-phase motors, three-phase heaters with equal elements, 22 kW EV chargers. Because the
          tabulated three-phase values assume exactly this, one calculation covers the circuit.
        </p>
        <p>
          An unbalanced load draws different currents on each phase. That is the normal state of a
          three-phase board feeding single-phase final circuits; perfect balance is close to
          impossible in practice.
        </p>
        <div className="my-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
            <h4 className="mb-3 text-lg font-bold text-white">Balanced load</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>Equal current on L1, L2, L3</li>
              <li>Zero neutral current</li>
              <li>Use the three-phase mV/A/m column</li>
              <li>Compare against a percentage of 400 V</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">
            <h4 className="mb-3 text-lg font-bold text-white">Unbalanced load</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>Different current on each phase</li>
              <li>Neutral carries the out-of-balance current</li>
              <li>Use the single-phase mV/A/m column, phase by phase</li>
              <li>Compare against a percentage of 230 V</li>
            </ul>
          </div>
        </div>
        <p>
          For a sub-main feeding a three-phase board, design for the worst-case phase. Where the
          circuit loading is known, check the highest individual phase current against the
          single-phase values. Where the loading is genuinely expected to be near balanced, the
          three-phase calculation is the right one.
        </p>
        <div className={noteCn}>
          <h4 className="mb-1 font-bold text-white">
            Third harmonic and neutral current (Appendix 4, Sections 5.5 and 5.6)
          </h4>
          <p className="text-sm leading-relaxed text-white">
            Where a three-phase circuit supplies a high proportion of switched-mode power supplies or
            LED drivers, the third harmonic currents from each phase add in the neutral instead of
            cancelling. Appendix 4, Section 5.6 notes that the rating factors in Section 5.5 take
            account of the heating effect of the third harmonic in the neutral as well as in each
            line conductor. The neutral can end up carrying more current than any line conductor,
            which affects conductor sizing and the drop along the neutral, and the balanced /
            unbalanced framing above does not capture it. Where third harmonic content is high enough
            that the neutral becomes the basis of sizing, Regulation 431.2.3 also requires overcurrent
            detection for the neutral conductor.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'worked-examples',
    heading: 'Worked Examples: Three-Phase Voltage Drop',
    content: (
      <>
        <p>
          Each example uses the three-phase a.c. column and checks the result against the Table 4Ab
          limit for a public low voltage supply. Confirm the mV/A/m figure against the printed table
          for your own cable before relying on it.
        </p>
        <div className="space-y-5">
          <div className={cardCn}>
            <h4 className="mb-3 text-lg font-bold text-white">
              Example 1 &mdash; three-phase sub-main, XLPE SWA
            </h4>
            <div className="space-y-2 text-sm leading-relaxed text-white">
              <p>
                A 4-core 25 mm&sup2; copper XLPE SWA cable runs 55 metres from the main switchboard
                to a sub-distribution board. The balanced design current is 75 A per phase. The
                three-phase value taken from Table 4E4B is 1.50 mV/A/m. At 25 mm&sup2; this is an
                impedance value, so the answer is on the pessimistic side.
              </p>
              <p className="font-mono text-white">
                VD = 1.50 &times; 75 &times; 55 / 1000 ={' '}
                <strong className="text-elec-yellow">6.19 V</strong> (1.55% of 400 V)
              </p>
              <p>
                <strong className="text-green-400">Pass</strong> &mdash; well inside the 20 V limit,
                leaving 13.81 V of budget for the final circuits downstream.
              </p>
            </div>
          </div>

          <div className={cardCn}>
            <h4 className="mb-3 text-lg font-bold text-white">
              Example 2 &mdash; long run to a motor
            </h4>
            <div className="space-y-2 text-sm leading-relaxed text-white">
              <p>
                A three-phase motor draws 42 A at full load, supplied by a 10 mm&sup2; 4-core copper
                PVC SWA cable over 80 metres. Table 4D4B gives a three-phase value of 3.8 mV/A/m.
              </p>
              <p className="font-mono text-white">
                VD = 3.8 &times; 42 &times; 80 / 1000 ={' '}
                <strong className="text-elec-yellow">12.77 V</strong> (3.19% of 400 V)
              </p>
              <p>
                <strong className="text-green-400">Pass</strong> against the 20 V steady-state limit.
                If this motor sits downstream of a sub-main, add that drop too. The starting dip is a
                separate check under Regulation 525.203.
              </p>
            </div>
          </div>

          <div className={cardCn}>
            <h4 className="mb-3 text-lg font-bold text-white">
              Example 3 &mdash; three-phase warehouse lighting
            </h4>
            <div className="space-y-2 text-sm leading-relaxed text-white">
              <p>
                A three-phase lighting circuit serves a warehouse at a balanced 14 A per phase over
                65 metres, wired in 4 mm&sup2; 4-core copper PVC. Table 4D2B gives a three-phase
                value of 9.5 mV/A/m.
              </p>
              <p className="font-mono text-white">
                VD = 9.5 &times; 14 &times; 65 / 1000 ={' '}
                <strong className="text-elec-yellow">8.65 V</strong> (2.16% of 400 V)
              </p>
              <p>
                <strong className="text-green-400">Pass</strong> against the 12 V lighting limit. At
                90 metres the same circuit gives 11.97 V, or 2.99% &mdash; still inside 3%, but with
                nothing left over.
              </p>
            </div>
          </div>

          <div className={cardCn}>
            <h4 className="mb-3 text-lg font-bold text-white">
              Example 4 &mdash; sub-main plus final circuit
            </h4>
            <div className="space-y-2 text-sm leading-relaxed text-white">
              <p>
                A three-phase sub-main of 35 mm&sup2; SWA runs 40 m at 100 A with a three-phase value
                of 1.05 mV/A/m. A final circuit from that board &mdash; 6 mm&sup2; singles in
                trunking, 25 m, 28 A, three-phase value 6.4 mV/A/m &mdash; serves a three-phase
                heater.
              </p>
              <p className="font-mono text-white">Sub-main: 1.05 &times; 100 &times; 40 / 1000 = 4.20 V</p>
              <p className="font-mono text-white">
                Final circuit: 6.4 &times; 28 &times; 25 / 1000 = 4.48 V
              </p>
              <p className="font-mono text-white">
                Total = <strong className="text-elec-yellow">8.68 V</strong> (2.17% of 400 V)
              </p>
              <p>
                <strong className="text-green-400">Pass</strong> &mdash; and the total is what
                Regulation 525.202 asks for, since it measures from the origin of the installation.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-cables',
    heading: 'Common Three-Phase mV/A/m Values',
    content: (
      <>
        <p>
          Indicative three-phase values for copper conductors, for orientation only. Voltage drop
          figures live in the B-suffix Appendix 4 tables, and the right table depends on insulation
          and construction: 4D2B multicore non-armoured 70 &deg;C thermoplastic, 4D4B multicore
          armoured 70 &deg;C thermoplastic, 4E4B multicore armoured 90 &deg;C thermosetting.
        </p>
        <div className="-mx-4 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Size</th>
                <th className={thCn}>mV/A/m (three-phase)</th>
                <th className={thCn}>Cable</th>
                <th className={thCn}>Table</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: '4 mm²', mvam: '9.5', type: '4-core PVC, non-armoured', table: '4D2B' },
                { size: '6 mm²', mvam: '6.4', type: '4-core PVC, non-armoured', table: '4D2B' },
                { size: '10 mm²', mvam: '3.8', type: '4-core PVC, non-armoured', table: '4D2B' },
                { size: '16 mm²', mvam: '2.4', type: '4-core PVC SWA', table: '4D4B' },
                { size: '25 mm²', mvam: '1.50', type: '4-core XLPE SWA', table: '4E4B' },
                { size: '35 mm²', mvam: '1.05', type: '4-core XLPE SWA', table: '4E4B' },
                { size: '50 mm²', mvam: '0.78', type: '4-core XLPE SWA', table: '4E4B' },
                { size: '70 mm²', mvam: '0.55', type: '4-core XLPE SWA', table: '4E4B' },
                { size: '95 mm²', mvam: '0.41', type: '4-core XLPE SWA', table: '4E4B' },
              ].map((row, i) => (
                <tr
                  key={row.size}
                  className={
                    i % 2 === 0 ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.04]' : 'bg-white/[0.02]'
                  }
                >
                  <td className={`${tdCn} font-medium`}>{row.size}</td>
                  <td className={`${tdCn} font-bold text-elec-yellow`}>{row.mvam}</td>
                  <td className={tdCn}>{row.type}</td>
                  <td className={tdCn}>{row.table}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-white">
          Read the figure for your own job from the printed BS 7671:2018+A4:2026 table. The value
          changes with insulation type, conductor material and construction, and from 25 mm&sup2;
          upwards the table gives an impedance value alongside separate resistive and reactive
          components rather than a single number.
        </p>

        <div className={noteCn}>
          <h4 className="mb-1 font-bold text-white">Single-core armoured cable caveat</h4>
          <p className="text-sm leading-relaxed text-white">
            Appendix 4, Section 6 states that for single-core armoured cables the tabulated voltage
            drop values apply where the armour is bonded to earth at both ends. Bond at one end only
            and the tabulated values no longer hold. Multicore SWA, 3-core and 4-core, is not
            affected by this.
          </p>
        </div>
        <SEOInternalLink href="/guides/correction-factors-bs-7671">
          Correction factors guide: derating and grouping
        </SEOInternalLink>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CableVoltDropThreePhasePage() {
  return (
    <ToolTemplate
      title="3-Phase Voltage Drop Formula: mV/A/m×Ib×L/1000"
      description="VD = mV/A/m (3-phase) × Ib × L ÷ 1000. The √3 is already inside the BS 7671 mV/A/m values, so never multiply again. Free calculator, 20 V / 12 V limits."
      datePublished="2025-06-15"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="BS 7671 Compliant"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Three Phase Voltage Drop Calculator{' '}
          <span className="text-elec-yellow">BS 7671 Compliant</span>
        </>
      }
      heroSubtitle="VD = mV/A/m (three-phase) × Ib × L ÷ 1000, using the BS 7671 Appendix 4 tables. The √3 is already inside the tabulated value. Handles balanced and unbalanced loads, SWA and multicore cables, with instant pass/fail against the 20 V and 12 V limits on a 400 V supply."
      heroFeaturePills={[
        { icon: Activity, label: 'Three-Phase' },
        { icon: Cable, label: 'All Cable Types' },
        { icon: Shield, label: 'BS 7671:2018+A4:2026' },
      ]}
      readingTime={10}
      calculator={<VoltageDropCalculator />}
      calculatorLabel="Work out your three-phase volt drop"
      calculatorFooter={
        <p className="mt-4 text-sm leading-relaxed text-white">
          Set the supply to 400 V (three phase) and the result is checked against the Table 4Ab
          limits &mdash; 12 V for lighting, 20 V for other uses. The tool applies the two-core
          mV/A/m value, which over-states the drop by roughly 15%, so a pass here is a genuine
          pass. For a final design, take the three-phase figure from the{' '}
          <a
            href="#common-cables"
            className="touch-manipulation text-yellow-400 underline decoration-yellow-400/40 underline-offset-2 transition-colors hover:text-yellow-300"
          >
            three-phase mV/A/m table below
          </a>
          .
        </p>
      }
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="Why Use Elec-Mate's Three-Phase Voltage Drop Calculator?"
      featuresSubheading="Purpose-built for UK electricians working on three-phase commercial and industrial installations. Faster and more accurate than manual table look-ups."
      howToSteps={howToSteps}
      howToHeading="How to Calculate Three-Phase Voltage Drop — Step by Step"
      howToDescription="Six steps to a compliant three-phase voltage drop figure using the BS 7671 Appendix 4 tables."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Three-Phase Voltage Drop"
      relatedPages={relatedPages}
      ctaHeading="Calculate Three-Phase Voltage Drop in Seconds"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site calculations. All BS 7671 tables built in. 7-day free trial, cancel anytime."
      toolPath="/tools/cable-volt-drop-three-phase"
    />
  );
}
