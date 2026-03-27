import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Activity,
  AlertTriangle,
  Shield,
  Settings,
  FileCheck2,
  Zap,
  PoundSterling,
  TrendingUp,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Industrial Guides', href: '/industrial-electrical-installation' },
  { label: 'Power Factor Correction', href: '/power-factor-correction' },
];

const tocItems = [
  { id: 'what-is-power-factor', label: 'What Is Power Factor?' },
  { id: 'dno-reactive-charges', label: 'DNO Reactive Power Charges' },
  { id: 'automatic-capacitor-banks', label: 'Automatic Capacitor Banks' },
  { id: 'fixed-capacitor-banks', label: 'Fixed Capacitor Banks' },
  { id: 'harmonic-distortion', label: 'Harmonic Distortion and Capacitors' },
  { id: 'detuned-banks', label: 'Harmonic-Rated and Detuned Banks' },
  { id: 'savings-calculation', label: 'Savings Calculation' },
  { id: 'payback-period', label: 'Typical Payback Period' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Power factor is the ratio of real power (kW, which does useful work) to apparent power (kVA, which the supply must provide). A power factor of 0.7 means 30% of the supply capacity is wasted on reactive current.',
  'Most UK DNO commercial and industrial electricity tariffs include a reactive power charge (kVArh charge) or a maximum demand charge based on kVA rather than kW — poor power factor directly increases electricity bills.',
  'Automatic power factor correction (APFC) banks use a controller and multiple capacitor steps to maintain a target power factor (typically 0.95 or better) as the load changes throughout the day.',
  'Fixed capacitor banks are simpler and cheaper than APFC banks but only correct for a constant base load — they can over-correct at light load, which reverses the power factor and can increase charges.',
  'Capacitors in systems with significant harmonic distortion (from VFDs, UPS systems, or non-linear loads) can cause resonance that amplifies harmonics — always assess harmonic content before installing standard capacitor banks.',
  'Detuned capacitor banks (with reactor in series with each capacitor step) are the safe solution for systems with harmonics — the reactor shifts the resonant frequency to below the 5th harmonic, preventing amplification.',
];

const faqs = [
  {
    question: 'What is power factor and why does it matter for businesses?',
    answer:
      'Power factor (PF) is the ratio of real power (kW) to apparent power (kVA). Real power does useful work (drives motors, produces heat, generates light). Reactive power (kVAr) is the component that flows between inductive loads (motors, transformers) and the supply — it does no useful work but must still flow through the cables, switchgear, and transformer. A power factor of 0.8 means for every 100 kVA drawn from the supply, only 80 kW of useful work is done. The remaining 20 kW equivalent is reactive power circulating uselessly. For businesses, this matters because many DNO tariffs charge for apparent power (kVA maximum demand) rather than real power, and all tariffs that include a kVArh (reactive energy) charge penalise poor power factor directly.',
  },
  {
    question: 'How do DNOs charge for poor power factor in the UK?',
    answer:
      'UK DNO charges for poor power factor vary by tariff structure, but the most common mechanisms are: (1) kVA maximum demand charge — the monthly peak kVA demand is charged at a fixed rate per kVA; since kVA = kW ÷ power factor, a lower PF means higher kVA for the same kW demand; (2) kVArh reactive energy charge — a separate charge per kVArh consumed above a threshold (typically the amount of reactive energy equivalent to a PF below 0.95); (3) in some cases, an excess reactive power penalty. Larger industrial customers on half-hourly metering typically face kVArh charges. Medium commercial customers on NHH metering may face kVA maximum demand charges. Check the site\'s electricity supply contract and meter data to understand which mechanism applies.',
  },
  {
    question: 'What power factor should I correct to?',
    answer:
      'The target power factor for most UK commercial and industrial premises is 0.95 lagging. This balances the cost of the correction equipment against the savings from reduced reactive power charges. Correcting to unity (1.0) provides only marginal additional savings but requires significantly more capacitor capacity. Over-correcting beyond unity (leading power factor) can actually increase reactive power charges on some tariffs and cause voltage rise problems on long supply cables. Some tariffs specify a target power factor — check the supply contract. On sites with significant harmonic distortion, power factor may be expressed as total power factor (including the effect of harmonics) which requires harmonic-rated or active PFC equipment rather than passive capacitors.',
  },
  {
    question: 'What is the difference between automatic and fixed capacitor bank PFC?',
    answer:
      'A fixed capacitor bank has a set capacitance (kVAr) that is permanently connected. It is suitable only where the reactive load is constant (constant load motors, transformers). If the load reduces (overnight, weekends), the fixed capacitors over-correct, creating a leading power factor that can be as problematic as a lagging power factor. An automatic power factor correction (APFC) bank uses a power factor controller that monitors the supply power factor and switches capacitor steps in or out as required to maintain the target PF. APFC is more expensive but essential for sites with variable loads (most commercial and industrial premises). Step sizes in an APFC bank are typically equal (e.g., 5 × 20 kVAr for a 100 kVAr bank) or weighted (1:2:4 binary) for finer control.',
  },
  {
    question: 'Why are standard capacitor banks dangerous on sites with VFDs?',
    answer:
      'Variable frequency drives (VFDs), UPS systems, electronic lighting ballasts, and other non-linear loads generate harmonic currents (primarily 5th and 7th harmonics in a three-phase system). When capacitors are connected to a system with significant harmonic content, a parallel resonance can occur between the capacitor bank and the supply system inductance at a frequency that coincides with one of the harmonic frequencies present. At resonance, the harmonic current is amplified, which can cause overheating and failure of the capacitors, overheating of cables and transformers, tripping of protective devices, and interference with electronic equipment. A harmonic survey should be carried out before specifying capacitor banks on any site with significant non-linear loading.',
  },
  {
    question: 'How is the payback period for a PFC installation calculated?',
    answer:
      'The basic payback calculation compares the annual saving (from reduced reactive power charges) against the installation cost. Annual saving = annual kVArh consumed above the penalty threshold × kVArh charge rate, plus any saving from reduced kVA maximum demand charge (kVA reduction × kVA demand rate × 12 months). For example, a 200 kVAr APFC bank on a site currently at 0.80 PF, paying £0.015/kVArh for reactive energy and £3.50/kVA/month maximum demand at 300 kVA peak, corrected to 0.95: reactive energy saving ≈ £3,000/year, demand charge saving ≈ £1,800/year, total ≈ £4,800/year. Installation cost for a 200 kVAr APFC bank including installation ≈ £8,000–12,000. Payback ≈ 1.7–2.5 years.',
  },
  {
    question: 'Does power factor correction reduce electricity consumption (kWh)?',
    answer:
      'No. Power factor correction reduces the reactive component of the current drawn from the supply but does not reduce the real power consumption (kWh). The kWh meter records only real power and is unaffected by power factor correction. The financial savings from PFC come from reduced reactive power charges (kVArh), reduced kVA maximum demand charges, and (in sites with long internal distribution cables) a small reduction in I²R cable losses. PFC should not be promoted as an energy saving measure in the sense of reducing kWh consumption — this is technically incorrect and misleading. Correctly marketed, PFC is a tariff optimisation measure that reduces the reactive energy penalty component of the electricity bill.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/motor-starters-installation',
    title: 'Motor Starter Installation',
    description: 'DOL, star-delta, and VFD starters — wiring, overload protection, and control circuits.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/industrial-earthing-systems',
    title: 'Industrial Earthing Systems',
    description: 'TN-S, TN-C-S, and TT earthing for industrial premises, EMC earthing, and testing.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/transformer-installation-guide',
    title: 'Transformer Installation Guide',
    description: 'Oil-filled vs dry-type transformers, DNO notification, commissioning, and maintenance.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-installation-certificate',
    title: 'Electrical Installation Certificate',
    description: 'Complete EICs on your phone and export PDF instantly for PFC installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-power-factor',
    heading: 'What Is Power Factor? kVA vs kW Explained',
    content: (
      <>
        <p>
          Power factor is one of the most important — and most misunderstood — concepts in
          industrial electrical engineering. Understanding it correctly is essential both for
          diagnosing billing issues and for correctly specifying power factor correction equipment.
          There are three types of power in an AC electrical system, and they are related by the
          power triangle.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Real power (kW)</strong> — the power that does actual useful work:
                driving motors, producing heat, lighting. This is what the kWh meter records.
                Also called active power. Measured in watts (W) or kilowatts (kW).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reactive power (kVAr)</strong> — the power that flows between inductive
                or capacitive loads and the supply. Inductive loads (motors, transformers)
                absorb reactive power (lagging); capacitive loads supply reactive power (leading).
                Reactive power does no useful work but must be supplied by the generator and
                carried by the cables and switchgear. Measured in reactive volt-amperes (VAr)
                or kilovolt-amperes reactive (kVAr).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apparent power (kVA)</strong> — the vector sum of real power and reactive
                power. This is the total power the supply must provide and the transformer,
                switchgear, and cables must be rated for. kVA = √(kW² + kVAr²). Measured in
                volt-amperes (VA) or kilovolt-amperes (kVA).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power factor formula</strong> — PF = kW ÷ kVA = cos(φ), where φ is the
                phase angle between voltage and current. PF ranges from 0 (purely reactive load)
                to 1.0 (purely resistive load). A typical industrial site without PFC has a
                power factor of 0.7–0.85 lagging. The target with PFC is 0.95 or better.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Consider a practical example: a factory with 500 kW of real load at 0.75 power factor
          draws 500 ÷ 0.75 = 667 kVA of apparent power. The cables, switchgear, and transformer
          must all be rated for 667 kVA, even though only 500 kW of useful work is done.
          Improving power factor to 0.95 reduces apparent power to 500 ÷ 0.95 = 526 kVA —
          freeing up 141 kVA of supply capacity for additional real load without any infrastructure
          upgrade.
        </p>
      </>
    ),
  },
  {
    id: 'dno-reactive-charges',
    heading: 'DNO Reactive Power Charges',
    content: (
      <>
        <p>
          Distribution Network Operators charge industrial and commercial customers for reactive
          power consumption through several mechanisms, depending on the tariff type and metering
          arrangements. Understanding which mechanism applies to a specific site is essential for
          calculating the potential savings from power factor correction.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>kVArh reactive energy charge</strong> — applied to half-hourly metered
                customers. The charge applies to reactive energy consumed when the power factor
                falls below a threshold (typically 0.95 lagging). The kVArh charge rate varies
                by DNO and tariff — typically £0.005–0.020 per kVArh. A site consuming 500 kW
                at 0.80 PF for 4,000 hours per year incurs approximately 375,000 kVArh of
                reactive energy — a cost of £1,875–£7,500 per year at typical rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>kVA maximum demand charge</strong> — some tariffs charge for the
                monthly peak kVA demand rather than (or in addition to) kW maximum demand.
                Since kVA = kW ÷ PF, improving PF from 0.80 to 0.95 reduces kVA demand by
                (kW × (1/0.80 − 1/0.95)) = kW × 0.197, reducing the monthly maximum demand
                charge accordingly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Agreed supply capacity</strong> — the connection agreement between the
                customer and DNO specifies an agreed supply capacity in kVA (or kW with a
                stated PF). Where the customer's apparent power demand exceeds the agreed
                capacity, excess capacity charges apply. Improving power factor reduces apparent
                power demand and may allow additional real load to be connected within the
                existing agreed capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Identifying charges on the bill</strong> — reactive power charges appear
                on the electricity invoice under various descriptions: "reactive energy charge",
                "kVArh charge", "excess reactive power", "availability charge (kVA)", or "maximum
                demand charge (kVA)". Request a copy of the supply contract and meter data
                (half-hourly kW and kVArh data) to quantify the current reactive power cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'automatic-capacitor-banks',
    heading: 'Automatic Capacitor Banks (APFC)',
    content: (
      <>
        <p>
          Automatic power factor correction (APFC) banks are the standard solution for industrial
          and commercial premises with variable loads. A microprocessor-based power factor
          controller monitors the supply power factor and switches capacitor steps in or out to
          maintain the target power factor as the load varies throughout the day.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PFC controller</strong> — samples voltage and current from a current
                transformer (CT) on the supply incomer. Calculates power factor in real time
                (typically 100 ms sampling interval) and switches capacitor steps via contactors
                to maintain the target PF. Modern controllers display kW, kVAr, kVA, PF,
                voltage, current, harmonics (THD), temperature, and step status.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Capacitor step sizing</strong> — equal steps (e.g., 5 × 20 kVAr = 100
                kVAr total) provide 5 levels of correction. The step size should not be larger
                than approximately 15% of the transformer rated kVA to avoid voltage steps on
                switching. Smaller steps provide smoother correction; more steps add cost. Most
                APFC banks have 6–12 steps.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contactor switching</strong> — each capacitor step is switched by a
                dedicated AC capacitor duty contactor with peak voltage suppression resistors
                (to limit switching transients). Contactors must be rated for capacitor switching
                duty (utilisation category AC-6b). Step switching is controlled with a minimum
                reconnection delay (typically 60–180 seconds) to allow the capacitor to discharge
                before re-energisation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location</strong> — APFC banks are most effective when connected at the
                main distribution board (correcting the overall site power factor before the
                metering point). Individual motor correction (fixed capacitors connected directly
                at each motor terminal box) is also effective and reduces cable loading, but
                requires more individual components and maintenance access.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fixed-capacitor-banks',
    heading: 'Fixed Capacitor Banks',
    content: (
      <>
        <p>
          Fixed capacitor banks provide a constant kVAr output regardless of the load. They are
          simpler and lower cost than APFC banks but are only appropriate for applications where
          the reactive load is relatively constant. Incorrect application of fixed capacitors can
          lead to over-correction at light load, which is as undesirable as under-correction.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Suitable applications</strong> — fixed capacitor banks are suitable for
                individual large motors running continuously at full load (e.g., large compressors,
                fans), transformer magnetising current correction, and industrial processes with
                constant 24/7 loading. The capacitor is sized to correct the specific reactive
                load of the equipment it is connected to.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Over-correction risk</strong> — if a fixed capacitor bank is sized for
                peak reactive load and the load reduces (night, weekends), the capacitors continue
                to supply reactive power to the system. The system power factor becomes leading
                (capacitive), which can cause voltage rise on the supply, increased kVAr charges
                on some tariffs, and potential instability in generator installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor-specific correction</strong> — connecting a fixed capacitor
                directly at a motor terminal box corrects the reactive current that flows
                between the motor and the distribution board. The capacitor kVAr rating should
                not exceed 90% of the motor no-load reactive current (to prevent self-excitation
                and runaway voltage on loss of supply). The motor nameplate and manufacturer's
                data provide the recommended capacitor kVAr.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'harmonic-distortion',
    heading: 'Harmonic Distortion and Standard Capacitors',
    content: (
      <>
        <p>
          In modern industrial premises, a significant proportion of the load is non-linear —
          variable frequency drives, UPS systems, electronic motor starters, switched-mode power
          supplies, and electronic lighting all generate harmonic currents. These harmonic currents
          interact with capacitor banks in ways that can cause equipment damage and make the
          electrical system worse rather than better. Harmonic assessment is a prerequisite
          for capacitor bank specification on any site with non-linear loading.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Parallel resonance</strong> — the capacitor bank (capacitive impedance)
                and the supply system inductance (inductive impedance) form a parallel resonant
                circuit at a frequency fr = 50 Hz × √(Ssc/Q), where Ssc is the short-circuit
                power of the supply and Q is the capacitor bank kVAr. If fr coincides with a
                harmonic frequency present in the system (250 Hz for 5th harmonic, 350 Hz for
                7th harmonic), the harmonic current is amplified dramatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Effects of resonance</strong> — harmonic resonance causes overheating
                of capacitors (capacitor current increases with frequency — I = V × 2πfC), which
                leads to premature capacitor failure. It also overloads cables, switchgear, and
                transformer windings; causes nuisance tripping of protective devices; interferes
                with electronic equipment and communications; and can cause voltage waveform
                distortion that affects the accuracy of metering equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Harmonic survey before specification</strong> — before specifying any
                capacitor bank, measure the existing harmonic voltage and current distortion using
                a power quality analyser. BS EN 61000-3-6 and ER G5/5 (Engineering Recommendation
                G5/5, Planning Levels for Harmonic Voltage Distortion and the Connection of
                Non-Linear Equipment to Transmission Systems and Public Distribution Networks)
                provide the framework for harmonic assessment. If THDi exceeds approximately
                25%, standard capacitors are not suitable — detuned banks must be specified.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'detuned-banks',
    heading: 'Harmonic-Rated and Detuned Capacitor Banks',
    content: (
      <>
        <p>
          Detuned capacitor banks incorporate a series reactor (inductor) in series with each
          capacitor step. The reactor shifts the parallel resonant frequency of the LC circuit
          below the lowest significant harmonic frequency (the 5th harmonic at 250 Hz), ensuring
          that no resonance occurs at a harmonic that is actually present in the system. Detuned
          banks are the standard solution for sites with significant harmonic distortion.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Detuning factor (p)</strong> — the reactor is specified by its detuning
                factor p = (fr/f1)². Standard detuning factors are p = 0.07 (7%), giving a
                resonant frequency of fr = 50 Hz ÷ √0.07 ≈ 189 Hz (between 3rd and 5th harmonics);
                or p = 0.14 (14%), giving fr ≈ 134 Hz (between fundamental and 3rd harmonic).
                The 7% detuning factor is the most common choice for general industrial use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Capacitor and reactor rating</strong> — because the reactor adds inductive
                voltage, the capacitor must be rated for a higher voltage than the system voltage.
                With 7% detuning on a 400 V system, the capacitor is typically rated at 440 V.
                The reactor must be rated for the fundamental frequency and all harmonic currents
                flowing through the capacitor step — use reactors with a defined harmonic current
                capability (typically up to the 13th harmonic).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Harmonic filtering effect</strong> — unlike passive harmonic filters
                (which are tuned exactly to a harmonic frequency and actively absorb that
                harmonic), detuned banks do not filter harmonics. They only prevent resonance.
                Where harmonics must be reduced (to comply with ER G5/5 planning levels or to
                prevent equipment interference), active harmonic filters (AHF) or passive filters
                tuned to the offending harmonics must be specified in addition to or instead
                of capacitor banks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reactor heat dissipation</strong> — series reactors dissipate heat
                (I²R losses). The panel enclosure must provide adequate ventilation for the
                combined heat dissipation of capacitors and reactors. Reactor operating temperature
                affects the inductance value — use thermally stable, iron-core reactors, not
                air-core reactors, for detuned PFC applications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'savings-calculation',
    heading: 'Savings Calculation for PFC',
    content: (
      <>
        <p>
          The financial justification for power factor correction must be based on actual meter
          data and current tariff rates, not on generic estimates. Request half-hourly kW and
          kVArh data from the electricity supplier (available from the meter operator for all
          half-hourly metered sites) and the supply contract tariff schedule before preparing
          any PFC proposal.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — measure existing power factor</strong> — from the half-hourly
                data, calculate the average and peak reactive demand (kVAr) and the corresponding
                power factor at various times of day. Identify whether the poor power factor
                is constant or occurs at specific times (e.g., only during production hours).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — calculate current reactive energy cost</strong> — identify the
                kVArh charge threshold (typically when PF &lt; 0.95) and the charge rate from
                the tariff schedule. Multiply the chargeable kVArh (from the meter data) by
                the charge rate to get the annual reactive energy cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — calculate kVAr correction required</strong> — using the power
                triangle: kVAr required = kW × (tan(cos⁻¹(existing PF)) − tan(cos⁻¹(target PF))).
                For example, 400 kW at 0.80 PF corrected to 0.95: kVAr = 400 × (tan(36.87°) −
                tan(18.19°)) = 400 × (0.750 − 0.329) = 168 kVAr. Specify a 175 kVAr APFC bank
                (next standard size up).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — calculate annual saving</strong> — estimated saving = annual
                reactive energy charge (before PFC) × (1 − residual reactive energy with PFC ÷
                reactive energy without PFC). Also include any saving from reduced kVA maximum
                demand charge and any capacity release value if additional load is to be connected
                within the existing supply capacity.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'payback-period',
    heading: 'Typical Payback Period (2–4 Years for Large Industrial Users)',
    content: (
      <>
        <p>
          The payback period for power factor correction equipment varies considerably depending
          on the site's existing power factor, annual electricity consumption, tariff structure,
          and equipment specification. For large industrial users with significant reactive power
          charges, payback of 2–4 years is typical. Smaller commercial sites may see longer
          payback periods if their reactive power charges are modest.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large industrial (500+ kW)</strong> — typically 1.5–3 years payback.
                High reactive power charges, large kVA maximum demand saving, capacity release
                for additional load. 100–500 kVAr APFC bank, detuned if VFDs present. Total
                installed cost typically £15,000–£60,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium commercial (100–500 kW)</strong> — typically 2–5 years payback.
                Moderate reactive power charges. 50–150 kVAr APFC bank, detuned if significant
                non-linear load. Total installed cost typically £6,000–£20,000. Payback depends
                heavily on tariff structure — sites on kVArh tariffs see better returns.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small commercial (under 100 kW)</strong> — often marginal or no financial
                case. Small businesses on standard NHH tariffs without kVArh charges or kVA
                maximum demand charges will see no bill reduction from PFC. Check the tariff
                before specifying PFC — not all sites will benefit financially.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-financial benefits</strong> — reduced cable and switchgear loading
                (extending equipment life), reduced transformer loading (allowing additional
                load within existing transformer capacity), reduced I²R cable losses, and
                improved voltage regulation. These benefits apply regardless of whether there
                is a direct reactive power charge on the tariff.
              </span>
            </li>
          </ul>
        </div>
        <p>
          PFC equipment requires minimal maintenance — capacitors should be inspected visually
          annually for bulging or leakage, and the controller should be checked to confirm
          all steps are operational. Capacitor life expectancy is typically 15–20 years; detuned
          reactors are essentially maintenance-free.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: PFC Installation and Certification',
    content: (
      <>
        <p>
          Power factor correction installation is profitable specialist work for commercial and
          industrial electricians. An APFC bank installation at a medium-sized factory or
          distribution warehouse typically takes 2–3 days and commands a significant margin.
          All PFC installations require an Electrical Installation Certificate under BS 7671 and
          should include a{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            commissioning record
          </SEOInternalLink>{' '}
          confirming the PF before and after correction.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete the EIC on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-installation-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete the Electrical Installation Certificate for the PFC installation
                  on your phone. Record CT ratio, panel rating, step sizes, insulation resistance
                  values, and initial/final power factor readings — then export a professional
                  PDF before leaving site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote PFC Upgrades to Industrial Clients</h4>
                <p className="text-white text-sm leading-relaxed">
                  When completing an EICR or motor installation at an industrial site, check
                  the power factor using your power quality analyser and calculate the savings
                  potential. Quote the PFC bank immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . A well-presented 2–3 year payback calculation makes PFC an easy decision
                  for a finance director.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certificate PFC installations and quote industrial work with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, power quality test records, industrial quoting, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PowerFactorCorrectionPage() {
  return (
    <GuideTemplate
      title="Power Factor Correction UK | PFC Installation Guide for Businesses"
      description="Complete guide to power factor correction in the UK. kVA vs kW explained, DNO reactive power charges, automatic and fixed capacitor banks, harmonic distortion risks, detuned banks, savings calculation, and typical 2–4 year payback for industrial users."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Industrial Guide"
      badgeIcon={Activity}
      heroTitle={
        <>
          Power Factor Correction UK:{' '}
          <span className="text-yellow-400">PFC Installation Guide for Businesses</span>
        </>
      }
      heroSubtitle="Complete guide to power factor correction for UK businesses — what power factor is (kVA vs kW), how DNOs charge for reactive power, automatic and fixed capacitor banks, why standard capacitors fail with VFDs, detuned harmonic-rated banks, savings calculation, and typical 2–4 year payback for industrial users."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Power Factor Correction"
      relatedPages={relatedPages}
      ctaHeading="Complete PFC Installation EICs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site electrical installation certification, commissioning test records, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
