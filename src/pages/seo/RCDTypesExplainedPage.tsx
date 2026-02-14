import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calculator,
  BookOpen,
  Cable,
  Activity,
  Car,
  Camera,
  Timer,
} from 'lucide-react';

export default function RCDTypesExplainedPage() {
  return (
    <GuideTemplate
      title="RCD Types Explained | Type AC, A, B, F | Which Do You Need?"
      description="Complete guide to RCD types for UK electricians. Type AC (sinusoidal AC only), Type A (AC + pulsating DC), Type B (AC + smooth DC for EV chargers), Type F (frequency faults for VFDs). BS EN 62423, BS 7671 requirements, 30mA vs 100mA vs 300mA, RCBO vs RCD+MCB, time-delayed RCDs."
      datePublished="2025-06-01"
      dateModified="2026-02-14"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'RCD Types Explained', href: '/guides/rcd-types-explained' },
      ]}
      tocItems={[
        { id: 'why-rcd-type-matters', label: 'Why RCD Type Matters' },
        { id: 'type-ac', label: 'Type AC' },
        { id: 'type-a', label: 'Type A' },
        { id: 'type-b', label: 'Type B' },
        { id: 'type-f', label: 'Type F' },
        { id: 'rcbo-vs-rcd-mcb', label: 'RCBO vs RCD+MCB' },
        { id: 'rcd-ratings', label: '30mA vs 100mA vs 300mA' },
        { id: 'time-delayed', label: 'Time-Delayed RCDs' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Essential Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          RCD Types Explained
          <br />
          <span className="text-yellow-400">Type AC, A, B, F — Which Do You Need?</span>
        </>
      }
      heroSubtitle="Choosing the wrong RCD type leaves circuits unprotected. This guide explains every RCD type in detail — what each detects, where each is required by BS 7671, and how to select the right type for every circuit. From standard domestic installations to EV chargers and heat pumps."
      readingTime={17}
      keyTakeaways={[
        'Type AC detects only sinusoidal AC faults and is no longer suitable for most modern circuits. Type A (AC + pulsating DC) is now the standard for domestic and commercial installations under BS 7671 Regulation 531.3.3.',
        'Type B RCDs detect smooth DC faults and are required for EV chargers without built-in DC detection, three-phase VFDs, and some solar PV inverters. Significantly more expensive (£150-£300) than Type A (£25-£50).',
        'Type F RCDs protect against mixed-frequency faults from single-phase VFDs — used in heat pumps, inverter-driven air conditioning, and washing machines with variable-speed motors.',
        '30mA RCDs provide personal protection against electric shock. 100mA and 300mA RCDs provide fire protection only and must not be used where personal protection is required.',
        'Elec-Mate EICR and EIC forms capture RCD type for every circuit. The board scanner reads RCD/RCBO labels from photos. Schedule of tests validates trip times against BS 7671 limits.',
      ]}
      sections={[
        {
          id: 'why-rcd-type-matters',
          heading: 'Why RCD Type Matters',
          content: (
            <>
              <p>
                An RCD (Residual Current Device) detects an imbalance between the current flowing
                into a circuit through the line conductor and the current returning through the
                neutral conductor. If some current is leaking to earth — through a person, through
                damaged insulation, or through a fault — the RCD detects this imbalance and trips,
                disconnecting the circuit.
              </p>
              <p>
                However, not all earth leakage currents are the same. Traditional electrical loads
                (heaters, incandescent lights, kettles) produce pure sinusoidal AC fault currents.
                But modern electronic equipment — EV chargers, variable-frequency drives, heat
                pumps, solar PV inverters, washing machines with inverter motors — can produce fault
                currents with DC components, pulsating waveforms, and mixed frequencies. An RCD
                designed to detect only sinusoidal AC will not trip on these non-standard fault
                waveforms, leaving the circuit unprotected.
              </p>
              <p>
                BS 7671 Regulation 531.3.3 requires that the RCD type is selected with consideration
                of the waveform of the residual current likely to occur under fault conditions. This
                means the electrician must consider what equipment will be connected to each circuit
                and select an RCD type capable of detecting the fault currents that equipment could
                produce. Getting this wrong is not just a compliance issue — it is a safety issue
                that could result in a fatal electric shock or an undetected fire.
              </p>
              <p>
                The four main RCD types are defined in BS EN 62423, and each has a specific symbol
                that is printed on the device front plate. Understanding these symbols and their
                meaning is fundamental to specifying and inspecting RCD protection.
              </p>
            </>
          ),
        },
        {
          id: 'type-ac',
          heading: 'Type AC — Sinusoidal AC Faults Only',
          content: (
            <>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-white text-lg">AC</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">Type AC RCD</h3>
                    <p className="text-white text-sm leading-relaxed mb-2">
                      <strong className="text-yellow-400">Detects:</strong> Sinusoidal AC residual
                      currents only (pure 50Hz waveform).
                    </p>
                    <p className="text-white text-sm leading-relaxed">
                      <strong className="text-yellow-400">Symbol:</strong> A sine wave (~) printed
                      on the device front plate.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                Type AC is the most basic type of RCD. It detects and responds to sinusoidal AC
                residual currents — the type of fault current produced by simple resistive loads
                such as heaters, incandescent lights, and immersion heaters. It was the standard RCD
                type for decades and is still found in many existing installations.
              </p>
              <p>
                However, Type AC cannot detect DC components in the fault current. Modern electronic
                equipment with rectifiers (diodes) can produce pulsating DC fault currents or smooth
                DC fault currents. If these DC components flow through the toroidal core of a Type
                AC RCD, they can saturate the core, reducing its sensitivity to AC faults as well.
                This means a Type AC RCD on a circuit supplying electronic equipment could fail to
                trip on any type of fault — AC or DC.
              </p>
              <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">
                      Type AC Is No Longer Suitable for Most Circuits
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      BS 7671 Regulation 531.3.3 effectively makes Type AC unsuitable for most
                      circuits in modern installations because virtually every circuit now supplies
                      equipment that could produce non-sinusoidal fault currents — LED lighting,
                      electronic thermostats, USB charging outlets, modern appliances. Type A is the
                      minimum standard for new installations.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                If you find Type AC RCDs during an EICR inspection, they are not automatically a
                defect — they were compliant when installed. However, if the circuits they protect
                now supply electronic equipment (which is almost always the case), consider
                recommending an upgrade to Type A as a C3 (Improvement Recommended) observation.
              </p>
            </>
          ),
        },
        {
          id: 'type-a',
          heading: 'Type A — AC + Pulsating DC (The Standard)',
          content: (
            <>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-yellow-500/10 border border-yellow-500/25 flex items-center justify-center shrink-0">
                    <span className="font-bold text-yellow-400 text-lg">A</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">Type A RCD</h3>
                    <p className="text-white text-sm leading-relaxed mb-2">
                      <strong className="text-yellow-400">Detects:</strong> Sinusoidal AC residual
                      currents AND pulsating DC residual currents.
                    </p>
                    <p className="text-white text-sm leading-relaxed">
                      <strong className="text-yellow-400">Symbol:</strong> A sine wave with a
                      pulsating DC waveform below it, printed on the device front plate.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                Type A is now the standard RCD type for the vast majority of domestic and commercial
                circuits. It detects all the fault waveforms that Type AC can detect (pure
                sinusoidal AC) plus pulsating DC residual currents — the type of fault current
                produced by equipment with single-phase rectifier circuits.
              </p>
              <p>
                Pulsating DC fault currents are produced by any equipment that converts AC to DC
                using a half-wave or full-wave rectifier — which includes virtually every piece of
                modern electronic equipment: computers, laptop chargers, phone chargers, LED
                drivers, washing machine and dishwasher controllers, modern boiler controls, EV
                chargers in Mode 2, and many more. When a fault develops in this equipment, the
                fault current has a DC component that Type AC cannot detect.
              </p>
              <p>
                BS 7671 Regulation 531.3.3 states that the type of RCD shall be selected based on
                the waveform of residual current likely to occur. Since almost every modern circuit
                supplies equipment with rectifiers, Type A is the minimum appropriate type for
                virtually all circuits. In practice, if you are installing a new{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  consumer unit
                </SEOInternalLink>{' '}
                or specifying RCBOs for a new installation, Type A should be the default choice.
              </p>
              <p>
                Type A RCBOs are readily available from all major manufacturers (Hager, Schneider,
                Siemens, MK, Wylex) at prices ranging from £25 to £50 per device. The cost premium
                over Type AC is minimal and well worth the additional protection.
              </p>
            </>
          ),
        },
        {
          id: 'type-b',
          heading: 'Type B — AC + Smooth DC (For EV Chargers & VFDs)',
          content: (
            <>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-white text-lg">B</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">Type B RCD</h3>
                    <p className="text-white text-sm leading-relaxed mb-2">
                      <strong className="text-yellow-400">Detects:</strong> Sinusoidal AC, pulsating
                      DC, AND smooth (pure) DC residual currents.
                    </p>
                    <p className="text-white text-sm leading-relaxed">
                      <strong className="text-yellow-400">Symbol:</strong> A sine wave, a pulsating
                      DC waveform, and a smooth DC line, printed on the device front plate.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                Type B RCDs can detect all the fault waveforms that Type A detects, plus smooth
                (pure) DC residual currents. Smooth DC fault currents are produced by equipment with
                three-phase rectifiers or specific power electronic circuits — most notably some EV
                chargers, three-phase variable-frequency drives (VFDs), and certain solar PV
                inverter topologies.
              </p>
              <p>
                The most common domestic application for Type B RCDs is{' '}
                <SEOInternalLink href="/guides/ev-charger-installation">
                  EV charger installations
                </SEOInternalLink>{' '}
                where the charger does not have built-in 6mA DC residual current monitoring. BS 7671
                Regulation 722.531.3.101 requires that the RCD protecting an EV charging circuit
                must be either:
              </p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-yellow-400">Type A + 6mA DC detection</strong> — A Type
                    A RCD/RCBO where the charger itself monitors for DC residual currents above 6mA
                    and disconnects. Most modern domestic smart chargers (Zappi, Ohme, Pod Point,
                    Easee) include this built-in DC detection, allowing a standard Type A RCBO to be
                    used.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-yellow-400">Type B RCD</strong> — Required if the
                    charger does not have built-in DC detection. The Type B RCD detects the smooth
                    DC fault currents directly, without relying on the charger electronics.
                  </span>
                </li>
              </ul>
              <p>
                Type B RCDs are significantly more expensive than Type A devices — typically £150 to
                £300 compared to £25 to £50 for a Type A RCBO. This cost difference is why most EV
                charger manufacturers now build 6mA DC detection into their chargers, allowing the
                cheaper Type A option.
              </p>
              <p>
                In commercial and industrial installations, Type B RCDs are required for circuits
                supplying three-phase VFDs, some welding equipment, and certain medical devices
                where smooth DC fault currents are possible.
              </p>
              <SEOAppBridge
                title="EV Charger Certificate Specifies RCD Type"
                description="Elec-Mate's EV charger certificate form includes a dedicated field for RCD type selection — Type A with 6mA DC detection or Type B. The form captures the charger manufacturer's specification and cross-references it with BS 7671 Regulation 722.531.3.101 to ensure the correct device is specified."
                icon={Car}
              />
            </>
          ),
        },
        {
          id: 'type-f',
          heading: 'Type F — For VFDs and Heat Pumps',
          content: (
            <>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-white text-lg">F</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">Type F RCD</h3>
                    <p className="text-white text-sm leading-relaxed mb-2">
                      <strong className="text-yellow-400">Detects:</strong> All Type A faults PLUS
                      composite residual currents containing mixed frequencies from single-phase
                      VFDs.
                    </p>
                    <p className="text-white text-sm leading-relaxed">
                      <strong className="text-yellow-400">Symbol:</strong> The Type A symbol with an
                      additional frequency symbol, printed on the device front plate.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                Type F is a relatively new RCD type, defined in BS EN 62423, that fills a specific
                gap between Type A and Type B. It is designed for circuits supplying equipment with
                single-phase variable-frequency drives (VFDs) — also called inverters or
                variable-speed drives.
              </p>
              <p>
                Single-phase VFDs are increasingly common in domestic and light commercial
                equipment:
              </p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-yellow-400">Heat pumps</strong> — Air source and ground
                    source heat pumps use VFDs to control compressor speed for optimal efficiency. A
                    fault in the VFD can produce mixed-frequency residual currents that Type A
                    cannot detect reliably.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-yellow-400">Air conditioning units</strong> — Modern
                    inverter-driven air conditioning uses the same VFD technology as heat pumps and
                    produces the same types of fault current.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-yellow-400">
                      Washing machines with inverter motors
                    </strong>{' '}
                    — Premium washing machines from manufacturers such as Samsung, LG, and Bosch use
                    direct-drive inverter motors instead of traditional induction motors.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-yellow-400">Pool and spa pumps</strong> — Variable-speed
                    pool pumps use VFDs for energy-efficient operation at different flow rates.
                  </span>
                </li>
              </ul>
              <p>
                The residual currents produced by single-phase VFDs are complex — they contain DC
                components, pulsating components, and high-frequency components mixed together. A
                Type A RCD may not reliably detect these composite fault currents because the
                complex waveform can partially saturate the toroidal core in unpredictable ways. A
                Type B RCD would work but is unnecessarily expensive. Type F provides the specific
                detection capability needed for these fault waveforms at a cost between Type A and
                Type B (typically £60 to £100).
              </p>
              <p>
                When specifying circuits for heat pump installations, always check the heat pump
                manufacturer's requirements — many now specify Type F or Type B RCD protection as a
                condition of their warranty.
              </p>
            </>
          ),
        },
        {
          id: 'rcbo-vs-rcd-mcb',
          heading: 'RCBO vs RCD + MCB',
          content: (
            <>
              <p>
                There are two ways to provide RCD and overcurrent protection for a circuit: an
                individual RCBO (Residual Current Breaker with Overcurrent protection) for each
                circuit, or a shared RCD protecting a group of circuits with individual MCBs (the
                split-load arrangement).
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">RCBO (Per Circuit)</h3>
                  <ul className="space-y-3 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Excellent discrimination</strong> — A fault
                        on one circuit trips only that circuit. Every other circuit remains
                        energised and unaffected.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">No cumulative leakage issues</strong> — Each
                        RCBO monitors only its own circuit, eliminating nuisance tripping from
                        combined standing leakage currents.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Easy fault diagnosis</strong> — When an RCBO
                        trips, you know immediately which circuit has the fault.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Higher cost</strong> — Individual RCBOs cost
                        more than MCBs. A full RCBO board costs approximately £60 to £150 more than
                        a split-load equivalent.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">RCD + MCBs (Split-Load)</h3>
                  <ul className="space-y-3 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Lower initial cost</strong> — Two RCDs and
                        individual MCBs cost less than individual RCBOs for every circuit.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Poor discrimination</strong> — A fault on any
                        circuit trips the shared RCD, disconnecting every circuit on that side of
                        the board.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Cumulative leakage risk</strong> — The
                        combined standing leakage from all circuits sharing one RCD can cause
                        nuisance tripping, especially on larger installations.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Harder fault diagnosis</strong> — When the
                        shared RCD trips, you must isolate circuits one by one to identify the
                        faulty circuit.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <p>
                For new domestic installations and consumer unit replacements, full RCBO boards are
                now the preferred choice among professional electricians. The additional cost is
                easily justified by the improved discrimination, reduced nuisance tripping, and
                better fault diagnosis. The time saved in call-backs alone often pays for the cost
                difference.
              </p>
              <SEOAppBridge
                title="Board Scanner Reads RCD/RCBO Labels from Photos"
                description="Take a photo of any consumer unit and Elec-Mate's AI board scanner reads the RCD and RCBO labels — identifying the manufacturer, type (AC, A, B, or F), rating, and whether the device is an RCD, RCBO, or MCB. Saves time during inspections and catches incorrect device types."
                icon={Camera}
              />
            </>
          ),
        },
        {
          id: 'rcd-ratings',
          heading: '30mA vs 100mA vs 300mA — Which Rating?',
          content: (
            <>
              <p>
                RCDs are manufactured with different rated residual operating currents (I{'\u0394'}
                n) for different protection purposes. The three most common ratings serve
                fundamentally different functions and are not interchangeable.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">30mA</h3>
                  <h4 className="font-bold text-white mb-3">Personal Protection</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Provides additional protection against electric shock (BS 7671 Regulation
                    411.3.3). The 30mA threshold is below the level that causes ventricular
                    fibrillation in most adults (approximately 50mA for prolonged exposure).
                    Required for socket outlets up to 32A, mobile equipment outdoors, cables in
                    walls at less than 50mm depth, and EV charger circuits.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-2xl mb-1">100mA</h3>
                  <h4 className="font-bold text-white mb-3">Fire Protection</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Provides fire protection by detecting earth leakage currents that are too small
                    to trip an MCB but large enough to generate heat. Often used as the main switch
                    RCD in a split-load board or as a time-delayed upstream device for
                    discrimination. Not suitable for personal protection against electric shock.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-2xl mb-1">300mA</h3>
                  <h4 className="font-bold text-white mb-3">Fire Protection (High Leakage)</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Fire protection for larger installations where cumulative earth leakage from
                    multiple equipment items would cause nuisance tripping of a 100mA device.
                    Required by Regulation 422.3.9 for installations in locations with a risk of
                    fire. Not suitable for personal protection.
                  </p>
                </div>
              </div>
              <p>
                The golden rule: where BS 7671 requires 30mA additional protection, you cannot
                substitute a higher-rated device. A 100mA RCD does not provide personal protection —
                a person receiving a 100mA shock for the 300ms trip time of the RCD is at serious
                risk of ventricular fibrillation.
              </p>
            </>
          ),
        },
        {
          id: 'time-delayed',
          heading: 'Time-Delayed RCDs (Type S / Selective)',
          content: (
            <>
              <p>
                A time-delayed RCD, marked as Type S (for selective), has a built-in delay before it
                trips. The purpose is to achieve discrimination (selectivity) between RCDs installed
                in series, ensuring that only the device closest to the fault trips.
              </p>
              <p>
                Consider a consumer unit with a 100mA Type S RCD as the main switch and individual
                30mA RCBOs on each circuit. If an earth fault occurs, the 30mA RCBO on the faulty
                circuit should trip first. The 100mA Type S main switch should not trip because: (a)
                it is less sensitive (100mA vs 30mA), and (b) its deliberate time delay means the
                downstream device has time to trip first.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  Trip Times for Time-Delayed (Type S) RCDs
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-white font-bold">At 1x I{'\u0394'}n</span>
                    <span className="text-yellow-400 font-bold">
                      130ms to 500ms (must trip within this range)
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-white font-bold">At 5x I{'\u0394'}n</span>
                    <span className="text-yellow-400 font-bold">
                      50ms to 200ms (must trip within this range)
                    </span>
                  </div>
                </div>
              </div>
              <p>
                Compare these with non-delayed RCDs: 300ms maximum at 1x I{'\u0394'}n and 40ms
                maximum at 5x I{'\u0394'}n. The Type S device has a wider time band that
                accommodates the intentional delay.
              </p>
              <p>
                When testing Type S RCDs during an{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink>, make sure
                your test instrument is set to the correct mode (Type S or selective). Testing a
                Type S device in non-delayed mode will give trip times that appear to exceed the
                standard limits, potentially leading you to fail a device that is actually
                performing correctly.
              </p>
              <SEOAppBridge
                title="Schedule of Tests Validates RCD Trip Times"
                description="Elec-Mate's schedule of test results validates every RCD trip time you enter against the correct BS 7671 limits — automatically distinguishing between general (non-delayed) and Type S (time-delayed) devices. Failed tests are highlighted immediately, with the relevant regulation reference."
                icon={Timer}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Can I use a Type AC RCD in a new installation?',
          answer:
            'In most cases, no. BS 7671 Regulation 531.3.3 requires the RCD type to be selected based on the waveform of residual current likely to occur under fault conditions. Since virtually every modern circuit supplies equipment with electronic rectifiers — LED lights, USB chargers, modern appliances, computers — the fault currents will include pulsating DC components that a Type AC device cannot detect. Type A is the minimum standard for new domestic installations. Using a Type AC device on a circuit supplying modern electronic equipment means the RCD may fail to trip under a fault condition, leaving the circuit unprotected. The only situation where Type AC remains acceptable is on circuits that exclusively supply purely resistive loads with no electronic components — which is extremely rare in a modern installation.',
        },
        {
          question: 'Do I need a Type B RCD for every EV charger installation?',
          answer:
            'Not necessarily. BS 7671 Regulation 722.531.3.101 requires either a Type B RCD or a Type A RCD with additional 6mA DC residual current detection. Most modern domestic EV chargers (Zappi, Ohme, Pod Point, Easee, Wallbox, Tesla) include built-in DC residual current monitoring that disconnects the charger if the DC component exceeds 6mA. When the charger has this built-in protection, a standard Type A 30mA RCBO is sufficient — and at £25 to £50, it is dramatically cheaper than a Type B RCD at £150 to £300. Always check the charger manufacturer installation manual to confirm whether the charger includes DC detection. If it does, document this on the EIC and use a Type A RCBO. If it does not, a Type B RCD is mandatory.',
        },
        {
          question: 'What RCD type does a heat pump circuit need?',
          answer:
            'Heat pumps with variable-frequency drives (VFDs) — which includes most modern inverter-driven heat pumps — require either a Type F or Type B RCD. Type F is specifically designed for the mixed-frequency fault currents produced by single-phase VFDs and is the most appropriate and cost-effective choice for domestic heat pump circuits. Type B would also work but is unnecessarily expensive for this application. Type A may not reliably detect the composite fault waveforms from a VFD. Always check the heat pump manufacturer installation manual — many manufacturers specify the minimum RCD type as a condition of their warranty. Some older or basic heat pumps without VFDs (fixed-speed compressors) may be adequately protected by Type A, but this is increasingly uncommon.',
        },
        {
          question: 'What is the difference between an RCD and an RCBO?',
          answer:
            'An RCD (Residual Current Device) detects only earth leakage (residual current) and provides no overcurrent protection. It must be used in conjunction with separate MCBs or fuses to provide both earth fault and overcurrent protection. An RCBO (Residual Current Breaker with Overcurrent protection) combines both functions in a single device — it detects earth leakage (like an RCD) AND provides overcurrent protection (like an MCB). In a consumer unit, you can either use shared RCDs protecting groups of circuits with individual MCBs (the split-load arrangement), or use individual RCBOs providing both functions for each circuit. RCBOs provide much better discrimination — a fault on one circuit trips only that circuit — but cost more than the equivalent RCD+MCB arrangement. Both RCDs and RCBOs come in all types (AC, A, B, F).',
        },
        {
          question: 'How do I identify the RCD type from the device label?',
          answer:
            'Every RCD has a symbol on its front plate that identifies its type. Type AC shows a simple sine wave symbol (~). Type A shows a sine wave with a pulsating DC half-wave beneath it. Type B shows a sine wave, a pulsating DC waveform, and a smooth DC line. Type F shows the Type A symbol with an additional frequency symbol. In addition to the symbol, the device label shows the rated residual operating current (e.g., 30mA), the rated current (e.g., 32A), the manufacturer and model number, and whether it is time-delayed (marked with an S in a box). During an EICR, you should record the RCD type, rating, and manufacturer for every RCD in the installation. Elec-Mate board scanner can read these labels from a photo and auto-populate the inspection form.',
        },
        {
          question: 'Can a 100mA RCD replace a 30mA RCD for personal protection?',
          answer:
            'Absolutely not. A 30mA RCD provides additional protection against electric shock because the trip threshold (30mA) is below the level that causes ventricular fibrillation in most adults. A 100mA RCD trips at over three times this level — at 100mA, the current through the body during the trip time is potentially lethal. A 100mA RCD provides fire protection only. Where BS 7671 requires additional protection by a 30mA RCD (socket outlets up to 32A, mobile equipment outdoors, cables in walls at less than 50mm, EV charger circuits), a 100mA device is not an acceptable substitute regardless of any other consideration. The ratings serve fundamentally different purposes and must not be confused.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/consumer-unit-regulations',
          title: 'Consumer Unit Regulations',
          description: 'RCD architecture, RCBO boards, and board design.',
          icon: ShieldCheck,
          category: 'Regulations',
        },
        {
          href: '/guides/ev-charger-installation',
          title: 'EV Charger Installation',
          description: 'RCD selection for EV charging circuits.',
          icon: Car,
          category: 'Guide',
        },
        {
          href: '/guides/spd-surge-protection',
          title: 'SPD Surge Protection',
          description: 'SPD coordination with RCDs explained.',
          icon: Activity,
          category: 'Guide',
        },
        {
          href: '/guides/rcd-testing',
          title: 'RCD Testing Guide',
          description: 'Trip time testing procedures and pass/fail criteria.',
          icon: Timer,
          category: 'Guide',
        },
        {
          href: '/guides/earthing-arrangements',
          title: 'Earthing Arrangements',
          description: 'TN-S, TN-C-S, TT and their impact on RCD selection.',
          icon: Cable,
          category: 'Guide',
        },
        {
          href: '/guides/bs7671-eighteenth-edition',
          title: 'BS 7671 18th Edition',
          description: 'Complete guide to the current Wiring Regulations.',
          icon: BookOpen,
          category: 'Regulations',
        },
      ]}
      ctaHeading="Get RCD Type Right Every Time"
      ctaSubheading="Elec-Mate captures RCD types on every certificate, validates trip times against BS 7671, and scans board labels from photos. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
