import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Zap,
  AlertTriangle,
  ClipboardCheck,
  ShieldCheck,
  Info,
  CheckCircle2,
  CircleDot,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing Guides', href: '/guides/electrical-testing' },
  { label: 'Loop Impedance Testing Guide', href: '/loop-impedance-testing-guide' },
];

const tocItems = [
  { id: 'what-is-loop-impedance', label: 'What Is Loop Impedance?' },
  { id: 'ze-testing', label: 'External Loop Impedance (Ze)' },
  { id: 'zs-testing', label: 'Total Loop Impedance (Zs)' },
  { id: 'pfc-calculation', label: 'Prospective Fault Current (PFC)' },
  { id: 'maximum-zs-values', label: 'Maximum Zs Values' },
  { id: 'live-vs-dead-testing', label: 'Live vs Dead (Calculated) Methods' },
  { id: 'instrument-settings', label: 'Instrument Settings' },
  { id: 'recording-results', label: 'Recording Results' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'External loop impedance (Ze) is the impedance of the earth fault current loop outside the installation — from the supply transformer secondary winding, through the line conductor of the supply, back through the earthing system to the point of measurement. Typical values in the UK: TN-C-S (PME) 0.35Ω or less, TN-S 0.8Ω or less.',
  'Total loop impedance (Zs) is the sum of Ze plus the impedance of the line and CPC conductors within the installation: Zs = Ze + (r1 + r2). The measured or calculated Zs must not exceed the maximum permitted Zs for the protective device on that circuit.',
  'Prospective fault current (PFC) is the maximum current that would flow under fault conditions, calculated as the supply voltage divided by the total loop impedance: PFC = 230V ÷ Ze. This must not exceed the rated short-circuit capacity of the protective devices.',
  'BS 7671 Appendix 3 gives maximum Zs values for MCBs (Type B, C, and D), fuses (BS 88, BS 1361, BS 3036), and RCBOs. The Zs value at the furthest point of every circuit must be within the permitted limit for that device at the declared temperature correction factor.',
  'Live Zs testing must not be performed on circuits protected by RCDs — the test current trips the RCD. Use the calculated method (Ze + r1 + r2 from continuity tests) for RCD-protected circuits.',
];

const faqs = [
  {
    question: 'What is the difference between Ze and Zs?',
    answer:
      'Ze (external earth loop impedance) is the impedance of the earth fault loop external to the installation — it is measured at the origin of the installation with the main switch open and all internal wiring disconnected. Zs (total earth loop impedance) is the total impedance of the fault loop at any point within the installation, including the internal conductors. Zs = Ze + (r1 + r2), where r1 is the line conductor resistance and r2 is the CPC resistance from the consumer unit to the measurement point.',
  },
  {
    question: 'What are typical Ze values for UK installations?',
    answer:
      'Ze values depend on the system earthing arrangement. For TN-C-S (PME or combined protective and neutral) earthing — the most common domestic arrangement in the UK — typical Ze values are 0.35Ω or less, though the distribution network operator (DNO) may declare a different maximum. For TN-S earthing (separate neutral and earth from the supply), typical values are 0.8Ω or less. For TT earthing systems (where the installation has its own earth electrode), Ze is replaced by the electrode resistance Ra, which may be several ohms.',
  },
  {
    question: 'What are the maximum Zs values for Type B and Type C MCBs?',
    answer:
      'BS 7671 Appendix 3 Table 3A gives maximum Zs values at 80°C for common MCB types. For Type B MCBs at 230V: 6A = 7.67Ω, 10A = 4.60Ω, 16A = 2.87Ω, 20A = 2.30Ω, 32A = 1.44Ω, 40A = 1.15Ω, 63A = 0.73Ω. For Type C MCBs at 230V, the values are half those of Type B (e.g., 32A Type C = 0.72Ω). For Type D MCBs, the values are one quarter of Type B values. These are the corrected values at conductor operating temperature — measured Zs at ambient temperature must be corrected using the temperature correction factor.',
  },
  {
    question: 'How do you calculate prospective fault current?',
    answer:
      'Prospective fault current (PFC) at the origin of the installation is calculated using PFC = Uo ÷ Ze, where Uo is the nominal voltage to earth (230V for single-phase) and Ze is the measured external loop impedance. For example, if Ze = 0.30Ω, PFC = 230 ÷ 0.30 = 766A. The PFC must not exceed the rated short-circuit capacity (Ics or Icu) of the consumer unit and protective devices. PFC must be measured (not just calculated) and recorded on the schedule of test results.',
  },
  {
    question: 'Why should you not perform live loop impedance tests on RCD-protected circuits?',
    answer:
      'A loop impedance tester injects a test current of typically 15A to 25A for a brief period to derive the loop impedance. This current flows in the line conductor but not the neutral — creating an imbalance that an RCD will detect as a residual current. A 30mA RCD will trip during the live loop impedance test. Use the calculated method instead: Zs = Ze + (r1 + r2), where r1 and r2 are obtained from the continuity tests. Some modern instruments use a very brief high-current pulse or a special RCD-compatible low-current method — check the instrument manufacturer\'s guidance.',
  },
  {
    question: 'What is the temperature correction factor for Zs?',
    answer:
      'The maximum Zs values in BS 7671 Appendix 3 are given at the maximum permitted conductor operating temperature (typically 70°C for PVC cables, 80°C for EPR/XLPE). Tests are carried out at ambient temperature (typically 10°C to 25°C). A correction factor is applied: the measured Zs is multiplied by a factor to check whether it would remain within limits at operating temperature. The correction factor for 70°C PVC cables is 0.725 (the measured Zs should not exceed 0.725 × Zs max). Alternatively, divide the tabulated Zs max value by the correction factor to get the ambient temperature limit.',
  },
  {
    question: 'Can you use a long-lead method for Ze measurement?',
    answer:
      'Yes. Where the supply cannot be safely isolated to measure Ze directly, Ze can be measured using the long-lead (or three-wire) method with the supply energised. A long test lead (typically 25m or more) is connected from the line terminal at the origin of the installation to an earth point remote from the installation. This allows the instrument to measure Ze without disconnecting the supply. The supply must be isolated to safely connect the test lead — only a brief disconnection is required. Always follow safe isolation procedures.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/insulation-resistance-testing-guide',
    title: 'Insulation Resistance Testing Guide',
    description: 'Test voltages, minimum values, disconnecting components, and interpreting results.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/continuity-testing-guide',
    title: 'Continuity Testing Guide',
    description: 'Ring final circuit, CPC, and bonding conductor continuity test methods.',
    icon: CheckCircle2,
    category: 'Guide',
  },
  {
    href: '/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description: 'Half-rated, rated, and 5× current RCD test procedures.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/earth-electrode-testing',
    title: 'Earth Electrode Testing Guide',
    description: 'Fall of potential method, stakeless clamp method, and TT system requirements.',
    icon: CircleDot,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Overview of the wiring regulations and key changes in Amendment 3.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-loop-impedance',
    heading: 'What Is Earth Fault Loop Impedance?',
    content: (
      <>
        <p>
          Earth fault loop impedance is the total impedance of the path that fault current would
          follow in the event of a line-to-earth fault. Understanding this path is fundamental to
          verifying that protective devices will operate fast enough to prevent electric shock or
          fire — which is the basis of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671
          </SEOInternalLink>{' '}
          automatic disconnection of supply (ADS) protection.
        </p>
        <p>
          When a fault occurs between a line conductor and an exposed-conductive-part, current
          flows from the supply transformer, along the line conductor of the distribution network,
          through the fault path within the installation, and back to the transformer via the
          earthing system. The impedance of this complete loop determines how much fault current
          flows, which in turn determines how quickly the protective device operates.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <span className="text-white">
              <strong>The fault loop path</strong>: Supply transformer secondary winding → line
              conductor of the distribution network → line terminal at the installation origin →
              line conductor of the circuit → fault point → CPC of the circuit → main earthing
              terminal → earthing conductor → earth electrode or PEN conductor → back to the
              transformer neutral point. The impedance of this loop must be low enough to allow
              sufficient fault current to operate the protective device within the required
              disconnection time.
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'ze-testing',
    heading: 'External Loop Impedance (Ze) Testing',
    content: (
      <>
        <p>
          Ze is measured at the origin of the installation — typically at the consumer unit or
          distribution board — before the main switch, using the supply earthing system. It
          represents the impedance of the fault loop external to the installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Method — main switch open</strong>: With the main switch open (to disconnect
                the installation's internal wiring), connect the loop impedance tester between the
                line and earth terminals at the origin. The test is performed live — the supply to
                the consumer unit remains energised. The instrument injects a test current and
                measures Ze directly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TN-C-S (PME) earthing</strong>: Typical Ze ≤ 0.35Ω. The neutral and
                protective conductors are combined in the distribution network. The supply earth is
                provided by the PEN (protective earthed neutral) conductor. Most modern domestic
                properties in the UK have PME earthing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TN-S earthing</strong>: Typical Ze ≤ 0.8Ω. Separate earth conductor in
                the supply cable sheath. The Ze is higher because the earth path impedance is
                greater. Found in older urban properties supplied via older distribution cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircleDot className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing</strong>: No Ze in the traditional sense — the installation
                has its own earth electrode with resistance Ra. Ra plus the electrode resistance
                of the supply transformer gives the total loop impedance. TT systems require RCD
                protection rather than relying on overcurrent protective devices for ADS.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Record Ze on the schedule of test results and on the face of the consumer unit schedule.
          Note the earthing arrangement (TN-C-S, TN-S, or TT) alongside the Ze value.
        </p>
      </>
    ),
  },
  {
    id: 'zs-testing',
    heading: 'Total Loop Impedance (Zs) Testing',
    content: (
      <>
        <p>
          Zs is the total loop impedance at any point in the installation, including the internal
          circuit conductors. It is measured (or calculated) at the furthest point of each circuit
          — this is where the impedance is highest and therefore where the fault current will be
          lowest and the protective device takes longest to operate.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live Zs test</strong>: With the circuit energised, connect the loop
                impedance tester between line and earth at the furthest accessible point of the
                circuit (e.g., the most remote socket outlet). The instrument injects a test
                current and measures Zs directly. This is the preferred method where practical and
                where RCDs do not prevent it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calculated Zs (dead method)</strong>: Zs is calculated as Ze plus the
                r1+r2 value obtained from the continuity tests: Zs = Ze + (r1 + r2). This is used
                for RCD-protected circuits and where live testing is not practicable. The calculated
                value must be corrected to account for conductor temperature as described in
                BS 7671 Appendix 14.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temperature correction</strong>: Conductor resistance (and therefore
                impedance) increases with temperature. The measured or calculated Zs at ambient
                temperature must be multiplied by a correction factor to check compliance at the
                maximum operating temperature of the conductor insulation. For 70°C PVC cables,
                multiply the measured Zs by 1/0.725 (approximately 1.38) to obtain the corrected
                value at operating temperature, then compare with the tabulated limit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pfc-calculation',
    heading: 'Prospective Fault Current (PFC) Calculation',
    content: (
      <>
        <p>
          Prospective fault current (PFC) is the maximum current that would flow in the event of
          a fault — either a line-to-earth fault (PEFC, prospective earth fault current) or a
          line-to-neutral fault (PSCC, prospective short-circuit current). Both must be determined
          and recorded, and both must be within the rated short-circuit breaking capacity of the
          protective devices.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PEFC (prospective earth fault current)</strong>: PEFC = Uo ÷ Ze, where Uo
                = 230V and Ze is the measured external loop impedance. If Ze = 0.30Ω, PEFC =
                230 ÷ 0.30 = 767A. Consumer unit MCBs and fuses must have a rated short-circuit
                capacity (Ics) equal to or greater than this value. Most domestic consumer units
                are rated at 6kA or 10kA breaking capacity, which covers typical UK PME systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PSCC (prospective short-circuit current)</strong>: PSCC = Uo ÷ Zline, where
                Zline is the impedance of the line-to-neutral loop (line conductor and neutral
                conductor). Measured by connecting the instrument between line and neutral at the
                origin with the main switch open. Alternatively calculated from Ze and the line-to-
                neutral resistance. For a PME system with Ze = 0.30Ω, PSCC will be higher than
                PEFC because the line-to-neutral path has lower impedance than the line-to-earth
                path.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record both values</strong>: BS 7671 requires both PEFC and PSCC to be
                recorded on the schedule of test results. The higher of the two determines the
                required breaking capacity of the protective devices.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'maximum-zs-values',
    heading: 'Maximum Zs Values for Protective Devices',
    content: (
      <>
        <p>
          BS 7671 Appendix 3 provides tables of maximum permitted Zs values for the most common
          types of protective devices. These values are at the declared maximum conductor operating
          temperature. The measured Zs (at ambient temperature) must be corrected before comparing
          with these limits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type B MCBs (BS EN 60898)</strong>: Operate at 3–5× rated current. Maximum
                Zs (at 80°C, 230V): 6A = 7.67Ω / 10A = 4.60Ω / 16A = 2.87Ω / 20A = 2.30Ω /
                32A = 1.44Ω / 40A = 1.15Ω / 63A = 0.73Ω.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type C MCBs (BS EN 60898)</strong>: Operate at 5–10× rated current. Maximum
                Zs values are half those of Type B for the same rating: 6A = 3.84Ω / 16A = 1.44Ω /
                32A = 0.72Ω. Type C MCBs are common for motor loads and circuits with high inrush
                currents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type D MCBs (BS EN 60898)</strong>: Operate at 10–20× rated current.
                Maximum Zs values are one quarter those of Type B: 6A = 1.92Ω / 16A = 0.72Ω /
                32A = 0.36Ω. High Zs indicates that Type D devices require very low loop impedance
                and are not suitable for long cable runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 88-2 (gG) fuses</strong>: Zs values depend on the fuse time-current
                characteristic. These are tabulated in Appendix 3. Generally higher Zs is
                permitted than for MCBs of equivalent rating, as the fuse time-current
                characteristic has a steeper slope.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <span className="text-white">
              <strong>Ambient temperature correction</strong>: The measured Zs must be compared with
              the limit at ambient temperature, not at the tabulated operating temperature. The
              ambient temperature limit = tabulated limit × 0.725 (for 70°C PVC) or × 0.800 (for
              90°C thermosetting cables). Alternatively, measure Zs and then multiply by 1/0.725
              before comparing with the tabulated limit.
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'live-vs-dead-testing',
    heading: 'Live Zs Testing vs the Calculated (Dead) Method',
    content: (
      <>
        <p>
          Both live testing and the calculated method are accepted by BS 7671. Each has advantages
          and limitations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live testing (preferred where RCDs permit)</strong>: Measures the actual
                Zs of the complete circuit including all connections and joints. Detects
                deteriorated connections, corroded terminals, and high-resistance joints that would
                not be found by the calculated method. More accurate than calculation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live testing limitations</strong>: Cannot be used on RCD-protected circuits
                without a special RCD-compatible instrument mode. Requires the supply to be
                energised and appropriate live working precautions. Test current (typically 15–25A)
                may be problematic on sensitive circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calculated method (Zs = Ze + r1 + r2)</strong>: Safe for use on all
                circuits. Requires accurate Ze measurement and precise r1+r2 values from continuity
                tests. Good practice where RCDs prevent live testing. Must be corrected for
                temperature.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calculated method limitations</strong>: Does not detect high-resistance
                joints unless r2 is abnormally high. If a connection deteriorates between test day
                and a future fault, the calculated value may no longer reflect reality. Record on
                the schedule whether the result is measured or calculated.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'instrument-settings',
    heading: 'Instrument Settings for Loop Impedance Testing',
    content: (
      <>
        <p>
          Loop impedance instruments (and multifunction testers with a loop impedance function)
          have settings that must be correctly configured before testing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard vs RCD-compatible mode</strong>: Select RCD-compatible (low-current
                or "no-trip") mode when testing circuits with 30mA RCDs. This mode uses a very brief
                pulse or lower test current that does not trip the RCD. The resolution is lower than
                the standard high-current mode — note the limitation on the test record.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2-wire vs 4-wire measurement</strong>: For Ze measurement at the origin,
                use the standard 2-wire (L-PE) connection. For accurate Zs measurement at distant
                points, some instruments support a 3-wire connection using a remote reference lead
                to compensate for test lead resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage sensing</strong>: Confirm the instrument is detecting the correct
                supply voltage before initiating the test. An instrument set to the wrong voltage
                range will give an incorrect result. Always check the supply voltage displayed by
                the instrument before pressing the test button.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording Loop Impedance Results',
    content: (
      <>
        <p>
          Loop impedance results are recorded on the Schedule of Test Results (part of the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            EICR or Electrical Installation Certificate
          </SEOInternalLink>
          ) and on the consumer unit schedule of circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ze</strong>: Record the measured Ze value and the earthing system type
                (TN-C-S, TN-S, or TT) at the installation origin.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zs per circuit</strong>: Record the measured or calculated Zs value at the
                furthest point of each circuit. Indicate whether the result is measured (M) or
                calculated (C). Note if an RCD-compatible instrument mode was used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PFC</strong>: Record the prospective fault current (both PEFC and PSCC) at
                the origin of the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Instrument details</strong>: Record the make, model, serial number, and
                calibration date of the loop impedance tester on the certificate.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Record Ze, Zs, and PFC results on site with Elec-Mate"
          description="Enter loop impedance results directly on your phone. The Elec-Mate testing app auto-populates the schedule of test results and flags Zs values that exceed the maximum for the protective device. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Loop Impedance Testing in Practice',
    content: (
      <>
        <p>
          Accurate loop impedance testing underpins the safety of the entire electrical installation.
          An Zs value above the maximum permitted limit means the protective device will not
          disconnect fast enough under a fault condition — a potentially lethal situation.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Auto-Check Zs Against Device Limits</h4>
                <p className="text-white text-sm leading-relaxed">
                  The{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate testing app
                  </SEOInternalLink>{' '}
                  automatically compares your recorded Zs against the maximum permitted value for
                  the protective device type and rating on each circuit. Red-flags non-compliant
                  circuits before you leave site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Temperature Correction Built In</h4>
                <p className="text-white text-sm leading-relaxed">
                  The app applies the correct temperature correction factor based on the cable
                  insulation type selected for each circuit, so you can check compliance at
                  operating temperature without manual calculation.
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

export default function LoopImpedanceTestingGuidePage() {
  return (
    <GuideTemplate
      title="Loop Impedance Testing Guide | Zs & Ze Testing BS 7671"
      description="Complete guide to earth fault loop impedance testing. External loop impedance (Ze), total loop impedance (Zs), prospective fault current (PFC), maximum Zs values for MCBs and fuses, live vs calculated methods, and instrument settings."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Loop Impedance Testing Guide:{' '}
          <span className="text-yellow-400">Zs & Ze Testing to BS 7671</span>
        </>
      }
      heroSubtitle="The complete UK electrician's guide to earth fault loop impedance testing — measuring Ze and Zs, calculating prospective fault current, maximum Zs values for Type B and Type C MCBs, live vs calculated methods, temperature correction, and recording results."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Loop Impedance Testing"
      relatedPages={relatedPages}
      ctaHeading="Record Zs Results and Auto-Check Against Device Limits"
      ctaSubheading="The Elec-Mate testing app flags non-compliant Zs values instantly, applies temperature correction, and exports a compliant schedule of test results. 7-day free trial."
    />
  );
}
