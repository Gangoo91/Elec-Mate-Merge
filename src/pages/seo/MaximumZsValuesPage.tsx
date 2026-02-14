import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  Mic,
  Gauge,
  Activity,
  Cable,
  BookOpen,
  Table2,
  ThermometerSun,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Maximum Zs Values BS 7671 | Complete Table Guide';
const PAGE_DESCRIPTION =
  'Complete guide to maximum Zs values per BS 7671 for UK electricians. Tables 41.2, 41.3, 41.4 with values for Type B MCBs (B6=7.67, B10=4.60, B16=2.87, B20=2.30, B32=1.44, B40=1.15, B50=0.92), Type C MCBs, BS 3036 fuses, 0.8 correction factor for temperature, how to use the tables, what to do when Zs exceeds maximum. Zs lookup calculator in Elec-Mate.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Maximum Zs Values BS 7671', href: '/guides/maximum-zs-values-bs-7671' },
];

const tocItems = [
  { id: 'what-are-max-zs', label: 'What Are Maximum Zs Values?' },
  { id: 'type-b-mcb', label: 'Type B MCB Values (Table 41.3)' },
  { id: 'type-c-mcb', label: 'Type C MCB Values (Table 41.4)' },
  { id: 'bs3036-fuse', label: 'BS 3036 Fuse Values (Table 41.2)' },
  { id: 'correction-factor', label: '0.8 Temperature Correction Factor' },
  { id: 'how-to-use', label: 'How to Use the Tables' },
  { id: 'zs-exceeds', label: 'What to Do When Zs Exceeds Maximum' },
  { id: 'five-second', label: '5-Second Disconnection Values' },
  { id: 'elec-mate', label: 'Zs Lookup with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Maximum Zs values are the highest earth fault loop impedance that ensures the protective device will disconnect within the required time (0.4 s for final circuits, 5 s for distribution circuits) in the event of an earth fault.',
  'BS 7671 Tables 41.2 (BS 3036 fuses), 41.3 (Type B MCBs), and 41.4 (Type C and D MCBs) provide the maximum values at maximum conductor operating temperature. Apply the 0.8 correction factor when testing at ambient.',
  'Key Type B MCB values for 0.4 s disconnection: B6=7.67 ohms, B10=4.60 ohms, B16=2.87 ohms, B20=2.30 ohms, B32=1.44 ohms, B40=1.15 ohms, B50=0.92 ohms.',
  'Type C MCBs have lower maximum Zs values than Type B (same rating) because they require higher fault current to trip magnetically — Type C trips at 10x rated current vs 5x for Type B.',
  'Elec-Mate provides an instant Zs lookup calculator — select the protective device type and rating, and the app shows the maximum permitted Zs with the 0.8 correction already applied.',
];

const faqs = [
  {
    question: 'What does "maximum Zs" actually mean?',
    answer:
      "The maximum Zs value for a given protective device is the highest earth fault loop impedance at which the device will still disconnect the supply within the required time (0.4 seconds for final circuits or 5 seconds for distribution circuits). The value is calculated from the time-current characteristic of the protective device. For an MCB, the magnetic trip mechanism operates instantaneously when the current exceeds a certain multiple of the rated current. For a Type B MCB, this is 5 times the rated current. So for a B32 MCB, the magnetic trip current is 5 x 32 = 160 A. Using Ohm's law with a 230 V supply: maximum Zs = 230/160 = 1.4375 ohms, rounded to 1.44 ohms. This is the value in BS 7671 Table 41.3. If the actual Zs exceeds this value, the fault current will be less than 160 A and the MCB may not trip within the required time.",
  },
  {
    question: 'Why are Type C MCB Zs values lower than Type B?',
    answer:
      'Type C MCBs have a higher magnetic trip point than Type B MCBs. A Type B MCB trips magnetically at 3 to 5 times its rated current, while a Type C MCB trips at 5 to 10 times its rated current. Because the maximum Zs calculation assumes the worst case (the highest multiple at which the device is guaranteed to trip), Type B uses 5x and Type C uses 10x. For a 32 A MCB: Type B maximum Zs = 230/(5x32) = 1.44 ohms; Type C maximum Zs = 230/(10x32) = 0.72 ohms. The higher trip current required by Type C means more fault current is needed, which requires a lower loop impedance. This is why Type C MCBs should only be used where the additional inrush current protection is genuinely needed (motors, discharge lighting) — using Type C unnecessarily reduces the available Zs margin.',
  },
  {
    question: 'What is the 0.8 correction factor and when do I apply it?',
    answer:
      'The 0.8 correction factor accounts for the increase in conductor resistance when cables heat up during normal operation. The maximum Zs values in BS 7671 tables are given at the maximum conductor operating temperature (70 degrees Celsius for PVC cables). When you measure Zs on site, the conductors are typically at ambient temperature (around 20 degrees Celsius), giving a lower reading than what the Zs will be when the cables are carrying their design current and have heated up. Copper resistance increases by approximately 20% between 20 and 70 degrees Celsius. The 0.8 factor compensates: if your measured Zs at ambient does not exceed 80% of the tabulated maximum, the actual Zs at operating temperature should still be within the tabulated limit. You apply the 0.8 factor by multiplying the tabulated maximum Zs by 0.8 to get the corrected value that your ambient measurement should not exceed. For example: B32 tabulated maximum = 1.44 ohms; corrected ambient maximum = 1.44 x 0.8 = 1.15 ohms.',
  },
  {
    question: 'Do I use the 0.4-second or 5-second disconnection values?',
    answer:
      'Use the 0.4-second values for all final circuits — circuits that directly supply current-using equipment or socket outlets. This covers socket circuits, lighting circuits, cooker circuits, shower circuits, and all other circuits that supply fixed or portable equipment in a domestic or commercial installation. Use the 5-second values only for distribution circuits — circuits that supply other distribution boards but do not directly supply current-using equipment. In a typical domestic installation, only the circuit feeding a sub-distribution board (if one exists) would use the 5-second values. The 5-second values are higher (more lenient) because the risk of electric shock is lower on distribution circuits where there is no direct user contact with exposed metalwork. If in doubt, use the 0.4-second values — they are more conservative and always acceptable.',
  },
  {
    question: 'What maximum Zs values apply to BS 3036 rewirable fuses?',
    answer:
      'BS 3036 rewirable fuses (the older cartridge-style fuses with replaceable fuse wire) have different maximum Zs values from MCBs because their operating characteristics are different. BS 7671 Table 41.2 gives the values for 0.4-second disconnection: 5 A = 10.90 ohms, 15 A = 3.43 ohms, 20 A = 2.64 ohms, 30 A = 1.78 ohms, 45 A = 1.20 ohms. Note that these values already include a correction factor of 0.725 applied to the basic calculation because rewirable fuses have less predictable operating characteristics than MCBs — the fuse wire can deteriorate, oxidise, or be replaced with the wrong rating. The actual maximum Zs before correction is higher, but BS 7671 has already applied the correction. When testing at ambient temperature, you should still apply the 0.8 factor to these values. Many older domestic installations in the UK still have BS 3036 rewirable fuses, so these values are frequently needed during EICRs.',
  },
  {
    question: 'Can I use the BS 7671 tables for RCBOs?',
    answer:
      'Yes. RCBOs (Residual Current Breaker with Overcurrent protection) combine RCD and MCB functions in a single device. The overcurrent (short circuit and overload) protection element of an RCBO operates identically to a standalone MCB of the same type. Therefore, the maximum Zs values for Type B, Type C, or Type D MCBs in BS 7671 Tables 41.3 and 41.4 apply equally to RCBOs of the same type and rating. For example, a Type B 32 A RCBO has the same maximum Zs of 1.44 ohms as a Type B 32 A MCB. The RCD element of the RCBO provides additional protection against earth leakage but does not change the Zs requirements for overcurrent disconnection. However, note that on TT systems where Zs values are very high, the RCD element provides the primary fault disconnection — the Zs requirement for the MCB element may not be met, but the RCD provides adequate protection.',
  },
  {
    question: 'What happens if my measured Zs is between the corrected and uncorrected maximum?',
    answer:
      'If your measured Zs at ambient temperature falls between the corrected value (tabulated x 0.8) and the uncorrected tabulated maximum, the situation requires professional judgement. Strictly, the circuit passes the tabulated maximum. However, the IET guidance is that you should apply the 0.8 factor because when the cables heat up under load, the actual Zs will increase and could exceed the tabulated maximum. In practice, you should consider the specific circumstances: if the circuit carries a light load and the cables will never reach their maximum operating temperature, the 0.8 factor may be overly conservative. If the circuit is heavily loaded and cables routinely run warm, the 0.8 factor is essential. On an EICR, a measured Zs that passes the tabulated maximum but fails the 0.8-corrected value might be classified as C3 (improvement recommended) with a note explaining the temperature consideration. If it fails the tabulated maximum outright, it is a C2 (potentially dangerous).',
  },
];

const howToSteps = [
  {
    name: 'Identify the protective device type and rating',
    text: 'Check the type (B, C, or D for MCBs; or the fuse type for BS 3036 or BS 88) and the current rating (6 A, 10 A, 16 A, 20 A, 32 A, 40 A, 50 A, etc.) of the protective device for the circuit under test. This information is printed on the front of the device.',
  },
  {
    name: 'Look up the maximum Zs from the correct table',
    text: 'Find the maximum permitted Zs from the appropriate BS 7671 table: Table 41.2 for BS 3036 fuses, Table 41.3 for Type B MCBs (0.4 s disconnection), Table 41.4 for Type C and Type D MCBs. Use the 0.4-second values for final circuits or the 5-second values for distribution circuits.',
  },
  {
    name: 'Apply the 0.8 temperature correction factor',
    text: 'Multiply the tabulated maximum Zs by 0.8 to obtain the corrected maximum for ambient temperature testing. For example, B32 tabulated maximum = 1.44 ohms; corrected maximum = 1.44 x 0.8 = 1.15 ohms. Your measured Zs at ambient temperature should not exceed this corrected value.',
  },
  {
    name: 'Measure Zs at the furthest point of the circuit',
    text: 'Using the loop impedance function on your multifunction tester, measure Zs at the furthest point of the circuit (the point with the longest cable run). This gives the highest Zs value on the circuit. If this passes, all other points on the circuit will also pass.',
  },
  {
    name: 'Compare the measured value against the corrected maximum',
    text: 'Compare your measured Zs against the corrected maximum (tabulated x 0.8). If the measured value is below the corrected maximum, the circuit passes. If it exceeds the corrected maximum, investigate and consider remedial options. Elec-Mate performs this lookup and comparison automatically for every circuit.',
  },
  {
    name: 'Record the result on the schedule of test results',
    text: 'Enter the measured Zs value on the schedule of test results. Note the protective device type and rating. If Zs exceeds the maximum, record the appropriate observation code on the EICR (C2 or C3 depending on the circumstances and presence of RCD protection).',
  },
];

const sections = [
  {
    id: 'what-are-max-zs',
    heading: 'What Are Maximum Zs Values?',
    content: (
      <>
        <p>
          Maximum Zs values are the highest earth fault loop impedance values at which a protective
          device (MCB, fuse, or RCBO) will still disconnect the supply within the required time in
          the event of an earth fault. BS 7671 specifies maximum disconnection times of 0.4 seconds
          for final circuits and 5 seconds for distribution circuits. The maximum Zs values in the
          BS 7671 tables are calculated to ensure these disconnection times are achieved.
        </p>
        <p>
          The calculation is straightforward: the protective device has a time-current
          characteristic that defines the minimum current at which it will trip within the required
          time. Using Ohm's law, the maximum Zs equals the supply voltage (230 V) divided by this
          minimum trip current. For example, a Type B 32 A MCB trips magnetically at 5 times its
          rated current (160 A), giving a maximum Zs of 230/160 = 1.44 ohms.
        </p>
        <p>
          If the actual{' '}
          <SEOInternalLink href="/guides/earth-fault-loop-impedance-explained">
            earth fault loop impedance
          </SEOInternalLink>{' '}
          (Zs) exceeds the maximum permitted value, the fault current will be insufficient to trip
          the protective device within the required time. This means that in the event of an earth
          fault, metalwork could remain live at a dangerous voltage for longer than the permitted
          duration, creating a risk of lethal electric shock.
        </p>
      </>
    ),
  },
  {
    id: 'type-b-mcb',
    heading: 'Type B MCB Maximum Zs Values — BS 7671 Table 41.3',
    content: (
      <>
        <p>
          Type B MCBs are the most commonly used protective devices in domestic and light commercial
          installations. They trip magnetically at 3 to 5 times their rated current. The BS 7671
          maximum Zs values are calculated using the worst case (5 times rated current) to ensure
          compliance even at the upper end of the device tolerance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Type B MCBs — Maximum Zs for 0.4-Second Disconnection
          </h3>
          <div className="space-y-2 text-white leading-relaxed">
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10 font-bold text-yellow-400 text-sm">
              <span>Rating</span>
              <span>Max Zs (Table)</span>
              <span>Max Zs (x 0.8)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B6</span>
              <span>7.67 Ω</span>
              <span>6.13 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B10</span>
              <span>4.60 Ω</span>
              <span>3.68 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B16</span>
              <span>2.87 Ω</span>
              <span>2.30 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B20</span>
              <span>2.30 Ω</span>
              <span>1.84 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B25</span>
              <span>1.84 Ω</span>
              <span>1.47 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B32</span>
              <span>1.44 Ω</span>
              <span>1.15 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B40</span>
              <span>1.15 Ω</span>
              <span>0.92 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 text-sm">
              <span>B50</span>
              <span>0.92 Ω</span>
              <span>0.74 Ω</span>
            </div>
          </div>
        </div>
        <p>
          The rightmost column shows the corrected values (tabulated x 0.8) that your measured Zs at
          ambient temperature should not exceed. These are the values you compare your MFT readings
          against on site.
        </p>
        <SEOAppBridge
          title="Instant Zs lookup by protective device"
          description="Select the MCB type (B, C, or D) and rating in Elec-Mate, and the app instantly shows both the tabulated and corrected (x 0.8) maximum Zs values. No need to carry the BS 7671 tables. Works for MCBs, RCBOs, BS 3036 fuses, and BS 88 fuses."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'type-c-mcb',
    heading: 'Type C MCB Maximum Zs Values — BS 7671 Table 41.4',
    content: (
      <>
        <p>
          Type C MCBs have a higher magnetic trip point than Type B — they trip at 5 to 10 times
          their rated current (compared to 3 to 5 times for Type B). This higher trip threshold
          makes them suitable for circuits with high inrush currents (motors, discharge lighting,
          transformers) but results in lower maximum Zs values because more fault current is needed
          to achieve rapid disconnection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Type C MCBs — Maximum Zs for 0.4-Second Disconnection
          </h3>
          <div className="space-y-2 text-white leading-relaxed">
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10 font-bold text-yellow-400 text-sm">
              <span>Rating</span>
              <span>Max Zs (Table)</span>
              <span>Max Zs (x 0.8)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>C6</span>
              <span>3.83 Ω</span>
              <span>3.07 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>C10</span>
              <span>2.30 Ω</span>
              <span>1.84 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>C16</span>
              <span>1.44 Ω</span>
              <span>1.15 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>C20</span>
              <span>1.15 Ω</span>
              <span>0.92 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>C25</span>
              <span>0.92 Ω</span>
              <span>0.74 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>C32</span>
              <span>0.72 Ω</span>
              <span>0.58 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>C40</span>
              <span>0.57 Ω</span>
              <span>0.46 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 text-sm">
              <span>C50</span>
              <span>0.46 Ω</span>
              <span>0.37 Ω</span>
            </div>
          </div>
        </div>
        <p>
          Notice how much lower the Type C values are compared to Type B at the same rating. A C32
          has a corrected maximum of only 0.58 ohms, compared to 1.15 ohms for a B32. This is why
          Type C MCBs should only be used where the inrush current characteristics of the load
          genuinely require them — using Type C unnecessarily on a lighting or socket circuit
          significantly reduces the available Zs margin and may cause the circuit to fail.
        </p>
      </>
    ),
  },
  {
    id: 'bs3036-fuse',
    heading: 'BS 3036 Rewirable Fuse Maximum Zs Values — BS 7671 Table 41.2',
    content: (
      <>
        <p>
          BS 3036 rewirable fuses (also known as semi-enclosed fuses) are the older type of fuse
          that uses replaceable fuse wire. They are still found in many existing installations in
          the UK, particularly in properties that have not been rewired. The maximum Zs values for
          BS 3036 fuses are specified in BS 7671 Table 41.2.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            BS 3036 Fuses — Maximum Zs for 0.4-Second Disconnection
          </h3>
          <div className="space-y-2 text-white leading-relaxed">
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10 font-bold text-yellow-400 text-sm">
              <span>Rating</span>
              <span>Max Zs (Table)</span>
              <span>Max Zs (x 0.8)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>5 A</span>
              <span>10.90 Ω</span>
              <span>8.72 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>15 A</span>
              <span>3.43 Ω</span>
              <span>2.74 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>20 A</span>
              <span>2.64 Ω</span>
              <span>2.11 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>30 A</span>
              <span>1.78 Ω</span>
              <span>1.42 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 text-sm">
              <span>45 A</span>
              <span>1.20 Ω</span>
              <span>0.96 Ω</span>
            </div>
          </div>
        </div>
        <p>
          BS 3036 fuses have less predictable operating characteristics than MCBs because the fuse
          wire can deteriorate over time, oxidise, or even be replaced with the wrong rating by
          someone who is not qualified. The values in Table 41.2 already include a built-in
          correction factor of 0.725 to account for this variability. The 0.8 temperature correction
          should still be applied on top of these values when testing at ambient temperature.
        </p>
      </>
    ),
  },
  {
    id: 'correction-factor',
    heading: 'The 0.8 Temperature Correction Factor',
    content: (
      <>
        <p>
          The maximum Zs values in BS 7671 tables are specified at the maximum conductor operating
          temperature — 70 degrees Celsius for PVC-insulated cables (which covers the vast majority
          of domestic installations). When you measure Zs on site with your multifunction tester,
          the conductors are at ambient temperature — typically between 10 and 25 degrees Celsius.
        </p>
        <p>
          As cables carry current during normal operation, they heat up. Copper conductor resistance
          increases by approximately 0.4% per degree Celsius. Between ambient temperature (20
          degrees Celsius) and maximum operating temperature (70 degrees Celsius), this is an
          increase of approximately 20%. The impedance of the earth fault loop therefore increases
          by the same proportion when the cables are at their operating temperature.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Applying the 0.8 Factor</h3>
          <p className="text-white leading-relaxed mb-3">
            Multiply the tabulated maximum Zs by 0.8 to get the corrected ambient maximum. Your
            measured Zs should not exceed this corrected value.
          </p>
          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-yellow-400">Example — B32 MCB:</strong>
            </p>
            <p className="text-white text-sm leading-relaxed mt-1">
              Tabulated maximum Zs = 1.44 Ω (at 70 degrees Celsius)
            </p>
            <p className="text-white text-sm leading-relaxed">
              Corrected ambient maximum = 1.44 x 0.8 = 1.15 Ω
            </p>
            <p className="text-white text-sm leading-relaxed mt-1">
              If you measure Zs = 1.20 Ω at ambient, this exceeds the corrected maximum (1.15 Ω)
              even though it is below the tabulated maximum (1.44 Ω). When the cables heat up under
              load, the actual Zs could reach 1.50 Ω — exceeding the tabulated maximum and
              preventing disconnection within the required time.
            </p>
          </div>
        </div>
        <p>
          The 0.8 factor is a design guideline recommended by the IET rather than a regulation
          within BS 7671 itself. However, it is widely adopted, expected by verifying bodies, and
          considered best practice. Elec-Mate applies the 0.8 correction automatically when
          validating Zs measurements.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-use',
    heading: 'How to Use the Maximum Zs Tables',
    content: (
      <>
        <p>
          Using the maximum Zs tables is straightforward once you understand the process. For each
          circuit in the installation, follow these steps:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <ul className="space-y-4 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Search className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 1 — Identify the device:</strong> Determine
                the type (B, C, D, or fuse) and rating of the protective device for the circuit.
                Check the front of the MCB or RCBO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Table2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 2 — Find the table:</strong> Use Table 41.2
                for BS 3036 fuses, Table 41.3 for Type B MCBs, Table 41.4 for Type C or D MCBs. Use
                the 0.4 s column for final circuits or the 5 s column for distribution circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 3 — Apply the 0.8 factor:</strong> Multiply
                the tabulated value by 0.8. This gives the maximum Zs your measured value should not
                exceed when testing at ambient temperature.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 4 — Compare:</strong> Compare your measured
                Zs against the corrected maximum. If the measured value is below the corrected
                maximum, the circuit passes. If it exceeds the corrected maximum, investigate
                further.
              </span>
            </li>
          </ul>
        </div>
        <p>
          You should also verify that the measured Zs is consistent with the calculated value of Ze
          + (<SEOInternalLink href="/guides/continuity-testing-r1-r2">R1+R2</SEOInternalLink>). If
          the measured Zs is significantly higher than the calculated value, there may be a
          high-resistance connection in the earth path that requires investigation.
        </p>
        <SEOAppBridge
          title="70+ calculators including Zs lookup"
          description="Elec-Mate has 70+ electrical calculators built in, including the Zs lookup by protective device. Select the MCB type and rating, and the app shows both the tabulated and corrected maximum Zs values instantly. Also includes R1+R2, earth electrode, PFC, cable sizing, and voltage drop calculators."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'zs-exceeds',
    heading: 'What to Do When Zs Exceeds the Maximum',
    content: (
      <>
        <p>
          If the measured Zs exceeds the corrected maximum (tabulated x 0.8), the circuit does not
          comply and action must be taken. The specific action depends on the circumstances and the
          extent to which the maximum is exceeded.
        </p>
        <div className="space-y-4 mt-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Verify the measurement</h3>
                <p className="text-white text-sm leading-relaxed">
                  Retest to confirm the reading. Check that your instrument is calibrated. Compare
                  the measured Zs against Ze + (R1+R2) — if there is a large discrepancy,
                  investigate for high-resistance connections. A loose terminal, corroded earthing
                  clamp, or damaged conductor can add significant impedance.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Reduce R1+R2</h3>
                <p className="text-white text-sm leading-relaxed">
                  Increase the cable size (lower resistance per metre), install a larger CPC, or
                  shorten the cable run. This directly reduces R1+R2 and therefore Zs. For example,
                  upgrading from 2.5/1.5 mm² to 4.0/2.5 mm² cable significantly reduces R1+R2.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Change the protective device type</h3>
                <p className="text-white text-sm leading-relaxed">
                  Type B MCBs have higher maximum Zs values than Type C. If the load does not
                  require the higher inrush current tolerance of a Type C device, changing from Type
                  C to Type B may bring Zs within limits. For example, a C32 has a corrected maximum
                  of 0.58 Ω while a B32 has 1.15 Ω — double the headroom.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Add RCD protection</h3>
                <p className="text-white text-sm leading-relaxed">
                  An <SEOInternalLink href="/guides/rcd-testing-procedure">RCD</SEOInternalLink>{' '}
                  provides earth fault disconnection that does not depend on Zs. A 30 mA RCD will
                  trip at 30 mA of earth leakage regardless of the loop impedance. This is the
                  standard approach for TT systems where Zs is inherently high.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4">
          On an <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>, a Zs value
          exceeding the maximum permitted value is recorded as an observation. The classification
          depends on the severity: C2 (potentially dangerous) if no RCD protection is present, or C3
          (improvement recommended) if RCD protection is providing adequate disconnection despite
          the high Zs.
        </p>
      </>
    ),
  },
  {
    id: 'five-second',
    heading: '5-Second Disconnection Values',
    content: (
      <>
        <p>
          BS 7671 also provides maximum Zs values for 5-second disconnection times. These apply to
          distribution circuits — circuits that supply other distribution boards but do not directly
          supply current-using equipment or socket outlets. The 5-second values are higher (more
          lenient) because the risk of electric shock is lower on distribution circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Type B MCBs — 5-Second vs 0.4-Second Maximum Zs (Selected Ratings)
          </h3>
          <div className="space-y-2 text-white leading-relaxed">
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10 font-bold text-yellow-400 text-sm">
              <span>Rating</span>
              <span>0.4 s Max Zs</span>
              <span>5 s Max Zs</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B16</span>
              <span>2.87 Ω</span>
              <span>4.79 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B32</span>
              <span>1.44 Ω</span>
              <span>2.40 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B40</span>
              <span>1.15 Ω</span>
              <span>1.92 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 text-sm">
              <span>B50</span>
              <span>0.92 Ω</span>
              <span>1.53 Ω</span>
            </div>
          </div>
        </div>
        <p>
          In a typical domestic installation, only the circuit feeding a sub-distribution board (if
          present) would use the 5-second values. All circuits supplying socket outlets, lighting,
          cookers, showers, and other current-using equipment must use the 0.4-second values. If in
          doubt, use the 0.4-second values — they are more conservative and always compliant.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate',
    heading: 'Zs Lookup and Validation with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate removes the need to carry BS 7671 tables on site. The app provides an instant Zs
          lookup calculator — select the protective device type (B, C, D MCB, BS 3036 fuse, BS 88
          fuse) and rating, and the app shows both the tabulated maximum Zs and the corrected value
          (tabulated x 0.8) immediately.
        </p>
        <SEOAppBridge
          title="Schedule of tests with auto-Zs-validation"
          description="Enter your measured Zs values into the schedule of test results and Elec-Mate validates every reading against the BS 7671 maximum for the specific protective device on each circuit. The 0.8 correction factor is applied automatically. Failures are flagged instantly."
          icon={ClipboardCheck}
        />
        <p>
          The auto-validation works across all test values — not just Zs. Insulation resistance is
          checked against the 1 MΩ minimum,{' '}
          <SEOInternalLink href="/guides/rcd-testing-procedure">RCD trip times</SEOInternalLink> are
          checked against the 40 ms and 300 ms limits, and{' '}
          <SEOInternalLink href="/guides/continuity-testing-r1-r2">R1+R2 values</SEOInternalLink>{' '}
          are cross-referenced with Zs. Voice-to-test-results lets you speak values while testing —
          no clipboards, no double-handling of data.
        </p>
        <SEOAppBridge
          title="Voice to test results — speak Zs values hands-free"
          description="On site with your MFT in hand? Just speak: 'Ring 1, Zs 0.89 ohms.' Elec-Mate fills in the schedule and validates automatically. 70+ calculators, board scanner, EICR and EIC forms — all in one app."
          icon={Mic}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/earth-fault-loop-impedance-explained',
    title: 'Earth Fault Loop Impedance',
    description: 'What Ze and Zs are, how to measure them, TN-C-S vs TN-S vs TT typical values.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/continuity-testing-r1-r2',
    title: 'Continuity Testing R1+R2',
    description:
      'How R1+R2 is measured and how it feeds into the Zs calculation (Zs = Ze + R1+R2).',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description:
      'Test voltages, minimum values, conductor combinations — the dead test that must pass before Zs testing.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-testing-procedure',
    title: 'RCD Testing Procedure',
    description:
      'Full RCD test procedure — essential when Zs exceeds maximum and RCD protection is relied upon.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Create professional EICRs with auto-validated Zs, Ze, R1+R2, and RCD trip times.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence BS 7671',
    description: 'The correct dead and live testing order per GN3. Zs is test number 5.',
    icon: BookOpen,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MaximumZsValuesPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2024-11-20"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Reference Guide"
      badgeIcon={Table2}
      heroTitle={
        <>
          Maximum Zs Values BS 7671: <span className="text-yellow-400">Complete Table Guide</span>
        </>
      }
      heroSubtitle="The complete reference to maximum Zs values per BS 7671 for UK electricians. Tables 41.2, 41.3, and 41.4 with values for Type B MCBs, Type C MCBs, and BS 3036 fuses. The 0.8 temperature correction factor, how to use the tables, and what to do when Zs exceeds the maximum permitted value."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Look Up and Apply Maximum Zs Values"
      howToDescription="Step-by-step guide to looking up maximum Zs values from BS 7671 tables, applying the 0.8 temperature correction factor, and comparing measured Zs values."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Look up maximum Zs values instantly on site"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. Instant Zs lookup, auto-validation, voice test entry, 70+ calculators. 7-day free trial, cancel anytime."
    />
  );
}
