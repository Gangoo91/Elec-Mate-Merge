import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import PdfDownloadCard from '@/components/seo/PdfDownloadCard';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { CalculatorSurface } from '@/components/calculators/shared';
import BS7671ZsLookupCalculator from '@/components/apprentice/calculators/BS7671ZsLookupCalculator';
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

const PAGE_TITLE = 'Max Zs Values: B6 7.28Ω, B16 2.73Ω, B32 1.37Ω';
const PAGE_DESCRIPTION =
  'Max permitted Zs per BS 7671: B6 7.28Ω, B16 2.73Ω, B32 1.37Ω, C16 1.37Ω, C20 1.09Ω. All Type B, C and BS 3036 values, ×0.8 corrected. RCBOs the same.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Maximum Zs Values BS 7671', href: '/guides/maximum-zs-values-bs-7671' },
];

const tocItems = [
  { id: 'what-are-max-zs', label: 'What Are Maximum Zs Values?' },
  { id: 'type-b-mcb', label: 'Type B MCB Values (Table 41.3)' },
  { id: 'type-c-mcb', label: 'Type C MCB Values (Table 41.3)' },
  { id: 'bs3036-fuse', label: 'BS 3036 Fuse Values (Table 41.2)' },
  { id: 'calculator', label: 'Zs Lookup Calculator (Free)' },
  { id: 'correction-factor', label: '0.8 Temperature Correction Factor' },
  { id: 'how-to-use', label: 'How to Use the Tables' },
  { id: 'zs-exceeds', label: 'What to Do When Zs Exceeds Maximum' },
  { id: 'five-second', label: '5-Second Disconnection Values' },
  { id: 'elec-mate', label: 'Zs Lookup with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Maximum Zs values are the highest earth fault loop impedance that ensures the protective device will disconnect within the required time in the event of an earth fault. In a TN system that is 0.4 s for the final circuits covered by Regulation 411.3.2.2, and 5 s for distribution circuits and any circuit outside that scope (Regulation 411.3.2.3).',
  'BS 7671 Table 41.2 covers fuses at 0.4 s, Table 41.3 covers circuit-breakers (Types B, C and D are all in that one table), and Table 41.4 covers fuses at 5 s. NOTE 2 to each table sets the temperature basis: line conductors at the maximum permitted operating temperature of Table 52.2, protective conductors at the assumed initial temperature of Tables 54.2 to 54.5. Apply the 0.8 factor of Appendix 3 when testing at ambient.',
  'Key Type B MCB values for 0.4 s disconnection: B6=7.28 ohms, B10=4.37 ohms, B16=2.73 ohms, B20=2.19 ohms, B32=1.37 ohms, B40=1.09 ohms, B50=0.87 ohms.',
  'Type C MCBs have lower maximum Zs values than Type B (same rating) because they require higher fault current to trip magnetically — Type C trips at 10x rated current vs 5x for Type B.',
  'Elec-Mate provides an instant Zs lookup calculator — select the protective device type and rating, and the app shows the maximum permitted Zs with the 0.8 correction already applied.',
];

const faqs = [
  {
    question: 'What does "maximum Zs" actually mean?',
    answer:
      "The maximum Zs value for a given protective device is the highest earth fault loop impedance at which the device will still disconnect the supply within the required time (0.4 seconds for final circuits or 5 seconds for distribution circuits). The value is calculated from the time-current characteristic of the protective device. For an MCB, the magnetic trip mechanism operates instantaneously when the current exceeds a certain multiple of the rated current. For a Type B MCB, this is 5 times the rated current. So for a B32 MCB, the magnetic trip current is 5 x 32 = 160 A. BS 7671 applies a voltage factor Cmin of 0.95 to the nominal 230 V supply to account for voltage tolerance, so the effective voltage used is 0.95 x 230 = 218.5 V. Using Ohm's law: maximum Zs = 218.5/160 = 1.365 ohms, rounded to 1.37 ohms. This is the value in BS 7671 Table 41.3. If the actual Zs exceeds this value, the fault current will be less than 160 A and the MCB may not trip within the required time.",
  },
  {
    question: 'Why are Type C MCB Zs values lower than Type B?',
    answer:
      'Type C MCBs have a higher magnetic trip point than Type B MCBs. A Type B MCB trips magnetically at 3 to 5 times its rated current, while a Type C MCB trips at 5 to 10 times its rated current. Because the maximum Zs calculation assumes the worst case (the highest multiple at which the device is guaranteed to trip), Type B uses 5x and Type C uses 10x. BS 7671 applies a Cmin voltage factor of 0.95 (effective voltage 218.5 V). For a 32 A MCB: Type B maximum Zs = 218.5/(5x32) = 1.37 ohms; Type C maximum Zs = 218.5/(10x32) = 0.68 ohms. The higher trip current required by Type C means more fault current is needed, which requires a lower loop impedance. This is why Type C MCBs should only be used where the additional inrush current protection is genuinely needed (motors, discharge lighting) — using Type C unnecessarily reduces the available Zs margin.',
  },
  {
    question: 'What is the 0.8 correction factor and when do I apply it?',
    answer:
      'The 0.8 correction factor accounts for the increase in conductor resistance when cables heat up during normal operation. The maximum Zs values in BS 7671 tables are given at the maximum conductor operating temperature (70 degrees Celsius for PVC cables). When you measure Zs on site, the conductors are typically at ambient temperature (around 20 degrees Celsius), giving a lower reading than what the Zs will be when the cables are carrying their design current and have heated up. Copper resistance increases by approximately 20% between 20 and 70 degrees Celsius. The 0.8 factor compensates: if your measured Zs at ambient does not exceed 80% of the tabulated maximum, the actual Zs at operating temperature should still be within the tabulated limit. You apply the 0.8 factor by multiplying the tabulated maximum Zs by 0.8 to get the corrected value that your ambient measurement should not exceed. For example: B32 tabulated maximum = 1.37 ohms; corrected ambient maximum = 1.37 x 0.8 = 1.10 ohms.',
  },
  {
    question: 'Do I use the 0.4-second or 5-second disconnection values?',
    answer:
      'In a TN system, Regulation 411.3.2.2 puts the 0.4-second requirement on final circuits rated up to 63 A with one or more socket-outlets, and up to 32 A supplying only fixed connected current-using equipment. That covers socket circuits, lighting circuits and the great majority of domestic final circuits. Regulation 411.3.2.3 then permits 5 seconds for a distribution circuit and for any circuit not covered by 411.3.2.2 — so a large final circuit outside those ratings, such as a 45 A fixed-connected shower, falls under the 5-second rule rather than the 0.4-second one. In a typical domestic installation the 5-second values matter mainly for the circuit feeding a sub-distribution board. Note that "the 5-second values" only exist as a distinct set for some devices: fuses have a separate table (Table 41.4), and Type D MCBs have a separate row, but Type B and Type C MCBs print one Zs figure valid for both times — because an MCB clears an earth fault on its magnetic trip, the current needed does not change with the permitted time. If in doubt, use the 0.4-second values — they are more conservative and always acceptable.',
  },
  {
    question: 'What maximum Zs values apply to BS 3036 rewirable fuses?',
    answer:
      'BS 3036 rewirable fuses (the older semi-enclosed fuses with replaceable fuse wire) have different maximum Zs values from MCBs because their operating characteristics are different. BS 7671 Table 41.2 gives the values for 0.4-second disconnection: 5 A = 9.10 ohms, 15 A = 2.43 ohms, 20 A = 1.68 ohms, 30 A = 1.04 ohms, 45 A = 0.56 ohms, 60 A = 0.40 ohms. NOTE 1 to the table records that these were determined using a Cmin of 0.95. Beware of older figures such as 10.35 ohms for a 5 A — those are pre-Cmin and will pass a circuit the current edition fails. The fuse wire in a rewirable can also deteriorate, oxidise, or be replaced with the wrong gauge, so treat a result close to the limit with suspicion. When testing at ambient temperature, you should still apply the 0.8 factor to these values. Many older domestic installations in the UK still have BS 3036 rewirable fuses, so these values are frequently needed during EICRs.',
  },
  {
    question: 'Can I use the BS 7671 tables for RCBOs?',
    answer:
      'Yes. RCBOs (Residual Current Breaker with Overcurrent protection) combine RCD and MCB functions in a single device. The overcurrent (short circuit and overload) protection element of an RCBO operates identically to a standalone MCB of the same type. Therefore, the maximum Zs values for Type B, Type C, or Type D MCBs in BS 7671 Tables 41.3 and 41.4 apply equally to RCBOs of the same type and rating. For example, a Type B 32 A RCBO has the same maximum Zs of 1.37 ohms as a Type B 32 A MCB. The RCD element of the RCBO provides additional protection against earth leakage but does not change the Zs requirements for overcurrent disconnection. However, note that on TT systems where Zs values are very high, the RCD element provides the primary fault disconnection — the Zs requirement for the MCB element may not be met, but the RCD provides adequate protection.',
  },
  {
    question: 'What happens if my measured Zs is between the corrected and uncorrected maximum?',
    answer:
      'If your measured Zs at ambient temperature falls between the corrected value (tabulated x 0.8) and the uncorrected tabulated maximum, the situation requires professional judgement. Strictly, the circuit passes the tabulated maximum. However, BS 7671 Appendix 3 is explicit that where the measurement is made at ambient temperature, compliance is considered to be met when the measured Zs does not exceed 0.8 x U0 x Cmin / Ia — that is, 0.8 x the tabulated value — because when the cables heat up under load the actual Zs will increase and could exceed the tabulated maximum. In practice, you should consider the specific circumstances: if the circuit carries a light load and the cables will never reach their maximum operating temperature, the 0.8 factor may be overly conservative. If the circuit is heavily loaded and cables routinely run warm, the 0.8 factor is essential. On an EICR, a measured Zs that passes the tabulated maximum but fails the 0.8-corrected value might be classified as C3 (improvement recommended) with a note explaining the temperature consideration. If it fails the tabulated maximum outright, it is a C2 (potentially dangerous).',
  },
];

const howToSteps = [
  {
    name: 'Identify the protective device type and rating',
    text: 'Check the type (B, C, or D for MCBs; or the fuse type for BS 3036 or BS 88) and the current rating (6 A, 10 A, 16 A, 20 A, 32 A, 40 A, 50 A, etc.) of the protective device for the circuit under test. This information is printed on the front of the device.',
  },
  {
    name: 'Look up the maximum Zs from the correct table',
    text: 'Find the maximum permitted Zs from the appropriate BS 7671 table: Table 41.2 for fuses at 0.4 s, Table 41.3 for circuit-breakers (Types B, C and D are all in that one table), Table 41.4 for fuses at 5 s. Use the 0.4-second values for final circuits or the 5-second values for distribution circuits.',
  },
  {
    name: 'Apply the 0.8 temperature correction factor',
    text: 'Multiply the tabulated maximum Zs by 0.8 to obtain the corrected maximum for ambient temperature testing. For example, B32 tabulated maximum = 1.37 ohms; corrected maximum = 1.37 x 0.8 = 1.10 ohms. Your measured Zs at ambient temperature should not exceed this corrected value.',
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
        <p className="mb-2">
          <a
            href="#calculator"
            className="inline-flex items-center h-11 px-5 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-[13px] touch-manipulation transition-colors"
          >
            Jump to the free Zs lookup calculator
          </a>
        </p>
        <p>
          Maximum Zs values are the highest earth fault loop impedance values at which a protective
          device (MCB, fuse, or RCBO) will still disconnect the supply within the required time in
          the event of an earth fault. In a TN system, Regulation 411.3.2.2 and Table 41.1 require
          0.4 seconds for final circuits rated up to 63 A with socket-outlets or up to 32 A
          supplying only fixed connected equipment, and Regulation 411.3.2.3 permits 5 seconds for
          distribution circuits and for any final circuit outside that scope. Tables 41.2 to 41.4
          are the TN tables and are calculated to ensure those times are achieved. TT systems are
          different — Table 41.1 requires 0.2 seconds and Regulation 411.3.2.4 permits 1 second for
          a distribution circuit — and on TT the disconnecting device is normally an RCD.
        </p>
        <p>
          The calculation is straightforward: the protective device has a time-current
          characteristic that defines the minimum current at which it will trip within the required
          time. BS 7671 applies a voltage factor Cmin of 0.95 to the nominal 230 V supply to account
          for voltage tolerance (per Appendix 3), giving an effective voltage of 218.5 V. Using
          Ohm's law, the maximum Zs equals this effective voltage divided by the minimum trip
          current. For example, a Type B 32 A MCB trips magnetically at 5 times its rated current
          (160 A), giving a maximum Zs of 218.5/160 = 1.37 ohms.
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
        {/* The query behind this page is a lookup ("max zs values", "max zs values 18th
            edition table pdf free") and an AI Overview answers it above the fold. A file
            they can pin in the van is the one thing an overview cannot be. */}
        <div className="my-6">
          <PdfDownloadCard
            href="https://jtwygbeceundfgnkirof.supabase.co/storage/v1/object/public/lead-magnets/elec-mate-zs-ze-reference.pdf"
            title="Every maximum Zs in BS 7671, as a printable PDF"
            description="Tables 41.2–41.5 on three A4 sheets — circuit-breakers, fuses, RCDs, and the withdrawn BS 3871 types still sitting in older boards."
            bullets={[
              'Tables 41.2–41.5 as tabulated',
              'BS 3871 Types 1–4 included',
              'A4 print-ready',
              'Free to share',
            ]}
            meta="364 KB"
            trackAs="zs_ze_reference_pdf"
            captureSource="lead_magnet_zs_ze_reference"
          />
        </div>
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
              <span>7.28 Ω</span>
              <span>5.82 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B10</span>
              <span>4.37 Ω</span>
              <span>3.50 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B16</span>
              <span>2.73 Ω</span>
              <span>2.18 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B20</span>
              <span>2.19 Ω</span>
              <span>1.75 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B25</span>
              <span>1.75 Ω</span>
              <span>1.40 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B32</span>
              <span>1.37 Ω</span>
              <span>1.10 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>B40</span>
              <span>1.09 Ω</span>
              <span>0.87 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 text-sm">
              <span>B50</span>
              <span>0.87 Ω</span>
              <span>0.70 Ω</span>
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
          description="Select the MCB type (B, C, or D) and rating in Elec-Mate, and the app instantly shows both the tabulated and corrected (x 0.8) maximum Zs values."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'type-c-mcb',
    heading: 'Type C MCB Maximum Zs Values — BS 7671 Table 41.3',
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
              <span>3.64 Ω</span>
              <span>2.91 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>C10</span>
              <span>2.19 Ω</span>
              <span>1.75 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>C16</span>
              <span>1.37 Ω</span>
              <span>1.10 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>C20</span>
              <span>1.09 Ω</span>
              <span>0.87 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>C25</span>
              <span>0.87 Ω</span>
              <span>0.70 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>C32</span>
              <span>0.68 Ω</span>
              <span>0.54 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>C40</span>
              <span>0.55 Ω</span>
              <span>0.44 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 text-sm">
              <span>C50</span>
              <span>0.44 Ω</span>
              <span>0.35 Ω</span>
            </div>
          </div>
        </div>
        <p>
          Notice how much lower the Type C values are compared to Type B at the same rating. A C32
          has a corrected maximum of only 0.54 ohms, compared to 1.10 ohms for a B32. This is why
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
              <span>9.10 Ω</span>
              <span>7.28 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>15 A</span>
              <span>2.43 Ω</span>
              <span>1.94 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>20 A</span>
              <span>1.68 Ω</span>
              <span>1.34 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>30 A</span>
              <span>1.04 Ω</span>
              <span>0.83 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-sm">
              <span>45 A</span>
              <span>0.56 Ω</span>
              <span>0.45 Ω</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 text-sm">
              <span>60 A</span>
              <span>0.40 Ω</span>
              <span>0.32 Ω</span>
            </div>
          </div>
        </div>
        <p>
          These are the current Table 41.2 figures. If you are working from older notes you may
          recognise a different set — 10.35 Ω for a 5 A, 3.26 Ω for a 15 A and so on. Those are the
          pre-Cmin values and they are no longer correct: NOTE 1 to Table 41.2 records that the
          tabulated impedances were determined using a Cmin of 0.95, which tightens every figure in
          the table. Working to the old numbers will pass a circuit that the current edition fails.
        </p>
        <p>
          BS 3036 fuses have less predictable operating characteristics than MCBs because the fuse
          wire can deteriorate over time, oxidise, or be replaced with the wrong gauge by someone
          who is not qualified. That is a good reason to treat a measured value close to the limit
          with suspicion, and the 0.8 temperature correction still applies when testing at ambient.
        </p>
      </>
    ),
  },
  {
    id: 'calculator',
    heading: 'Look Up the Maximum Zs for Your Device',
    content: (
      <>
        <p>
          Free to use, no sign-up and no email needed. Choose the device — MCB or RCBO on a B, C or
          D curve, BS 3036 or BS 88 fuse, or an RCD — and the lookup returns the tabulated maximum
          Zs from Tables 41.2 to 41.5 alongside the 0.8-corrected figure you compare your ambient
          reading against. Switch the disconnection time between 0.4 s and 5 s, or type a
          designation such as B32 or C20 straight into the quick device box.
        </p>
        <p>
          Working the other way round, the compliance mode takes a measured Zs and lists every
          protective device that reading would satisfy — useful when you are deciding whether a
          circuit needs a smaller rating or a different curve.
        </p>
        <CalculatorSurface>
          <BS7671ZsLookupCalculator />
        </CalculatorSurface>
      </>
    ),
  },
  {
    id: 'correction-factor',
    heading: 'The 0.8 Temperature Correction Factor',
    content: (
      <>
        <p>
          NOTE 2 to Tables 41.2 to 41.4 sets out the temperature basis, and it is worth reading
          carefully because it is not simply &ldquo;everything at 70 degrees&rdquo;. The tabulated
          values should not be exceeded when the line conductors are at the maximum permitted
          operating temperature given in Table 52.2 — 70 degrees Celsius for 70 °C thermoplastic
          (PVC), which covers the vast majority of domestic installations — and the circuit
          protective conductors are at the assumed initial temperature given in Tables 54.2 to 54.5.
          When you measure Zs on site with your multifunction tester, the conductors are at ambient
          temperature — typically between 10 and 25 degrees Celsius — and NOTE 2 directs you to
          Appendix 3 to adjust the reading.
        </p>
        <p>
          As cables carry current during normal operation, they heat up. Copper conductor resistance
          increases by approximately 0.4% per degree Celsius. Between ambient temperature (20
          degrees Celsius) and maximum operating temperature (70 degrees Celsius), this is an
          increase of approximately 20%. The impedance of the earth fault loop therefore increases
          by the same proportion when the cables are at their operating temperature.
        </p>
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5 my-4">
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
              Tabulated maximum Zs = 1.37 Ω (at 70 degrees Celsius)
            </p>
            <p className="text-white text-sm leading-relaxed">
              Corrected ambient maximum = 1.37 x 0.8 = 1.10 Ω
            </p>
            <p className="text-white text-sm leading-relaxed mt-1">
              If you measure Zs = 1.15 Ω at ambient, this exceeds the corrected maximum (1.10 Ω)
              even though it is below the tabulated maximum (1.37 Ω). Apply the roughly 20 per cent
              rise between ambient and 70 °C and the actual Zs under load reaches about 1.38 Ω —
              over the tabulated maximum, and no longer guaranteed to disconnect within the required
              time.
            </p>
          </div>
        </div>
        <p>
          The 0.8 factor is not something the trade invented — it is published in BS 7671 itself.
          Appendix 3 states that where impedance measurements are made at ambient temperature, the
          requirements of Regulation 411.4.4 or 411.5.4 are considered to be met when Zs(measured) ≤
          0.8 × U0 × Cmin / Ia, and defines 0.8 as &ldquo;a factor to take into account the increase
          of resistance of the conductors with the increase of temperature due to load
          current&rdquo;. Appendix 3 also notes that this is one method of correcting for
          temperature difference and that other methods are not precluded. Elec-Mate applies the 0.8
          correction automatically when validating Zs measurements.
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
                for fuses at 0.4 s, Table 41.3 for circuit-breakers — every curve, B, C and D, is in
                that one table — and Table 41.4 for fuses at 5 s. Use the 0.4 s column for final
                circuits or the 5 s column for distribution circuits.
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
          description="Elec-Mate has 70+ electrical calculators built in, including the Zs lookup by protective device."
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
                  of 0.54 Ω while a B32 has 1.10 Ω — double the headroom.
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
                  disconnects on residual current rather than on fault current, so it needs far less
                  of an earth path than an MCB does. There is still a Zs limit — Regulation 411.5.3
                  and Table 41.5 give 1667 Ω for a 30 mA device and 500 Ω for a 100 mA device — but
                  those are orders of magnitude above anything an MCB will tolerate. This is the
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
          BS 7671 provides maximum Zs values for 5-second disconnection. Under Regulation 411.3.2.3
          that applies in a TN system to distribution circuits and to any circuit not covered by
          Regulation 411.3.2.2 — so it also picks up large final circuits above 63 A with
          socket-outlets or above 32 A supplying only fixed equipment. But there is a catch that
          trips up a lot of people, and it is worth being precise about.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Which devices actually have different 5-second values?
          </h3>
          <div className="space-y-3 text-white leading-relaxed text-sm">
            <p>
              <strong className="text-yellow-400">Type B and Type C MCBs — no difference.</strong>{' '}
              Table 41.3(a) and 41.3(b) each print a <em>single</em> row of Zs values that is valid
              for both 0.4 s and 5 s. This is not an omission. An MCB clears an earth fault on its
              magnetic trip, which is effectively instantaneous — so the fault current needed does
              not change with the permitted disconnection time. A B32 is 1.37 Ω whether the circuit
              is a final circuit or a distribution circuit.
            </p>
            <p>
              <strong className="text-yellow-400">Type D MCBs — the exception.</strong> Table
              41.3(c) is the only circuit-breaker table that prints two rows: a 0.4 s row computed
              at 20 × In, and a 5 s row at 10 × In. The 5 s values are exactly double the 0.4 s
              ones.
            </p>
            <p>
              <strong className="text-yellow-400">Fuses — genuinely different.</strong> Fuses clear
              on a thermal characteristic, so time really does matter. Table 41.2 gives the 0.4 s
              values and <strong>Table 41.4</strong> gives the 5 s values — a separate table, not a
              separate column.
            </p>
          </div>
        </div>
        <p>
          The practical upshot: if you are looking for a more lenient 5-second figure for a Type B
          or Type C MCB, there isn't one, and any table offering you a higher number is wrong. In a
          typical domestic installation it is mainly the circuit feeding a sub-distribution board
          that uses 5-second values, along with any final circuit large enough to fall outside
          Regulation 411.3.2.2. Everything supplying socket outlets and lighting uses 0.4 seconds.
          If in doubt, use the 0.4-second values — they are never wrong, only conservative.
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
          description="Enter your measured Zs values into the schedule of test results and Elec-Mate validates every reading against the BS 7671 maximum for the specific…"
          icon={ClipboardCheck}
        />
        <p>
          The auto-validation works across all test values — not just Zs. Insulation resistance is
          checked against the 1 MΩ minimum of Table 64,{' '}
          <SEOInternalLink href="/guides/rcd-testing-procedure">RCD trip times</SEOInternalLink> are
          checked against the single AC test at IΔn — 300 ms maximum for a general non-delay RCD,
          130 to 500 ms for a Type S — and{' '}
          <SEOInternalLink href="/guides/continuity-testing-r1-r2">R1+R2 values</SEOInternalLink>{' '}
          are cross-referenced with Zs. Voice-to-test-results lets you speak values while testing —
          no clipboards, no double-handling of data.
        </p>
        <SEOAppBridge
          title="Voice to test results — speak Zs values hands-free"
          description="On site with your MFT in hand? Just speak: 'Ring 1, Zs 0.89 ohms.' Elec-Mate fills in the schedule and validates automatically."
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
    href: '/guides/insulation-resistance-testing-bs7671',
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
      dateModified="2026-05-18"
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
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate for on-site testing and certification. Instant Zs lookup, auto-validation, voice test entry, 70+ calculators. 7-day free trial, cancel anytime."
    />
  );
}
