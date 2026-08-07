import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { CalculatorSurface } from '@/components/calculators/shared';
import EarthFaultLoopCalculator from '@/components/apprentice/calculators/EarthFaultLoopCalculator';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Zap,
  ClipboardCheck,
  ShieldCheck,
  CheckCircle2,
  CircleDot,
  Calculator,
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
  { id: 'calculator', label: 'Zs Calculator' },
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
  'Total loop impedance (Zs) is the sum of Ze plus the impedance of the line and CPC conductors within the installation: Zs = Ze + (R1 + R2). The measured or calculated Zs must not exceed the maximum permitted Zs for the protective device on that circuit.',
  'Prospective fault current (PFC) is the maximum current that would flow under fault conditions. At the origin the prospective earth fault current is PEFC = Uo ÷ Ze (230V ÷ Ze); the prospective short-circuit current (PSCC) is taken across line and neutral. Reg 434.1 allows PFC to be determined by calculation, measurement or enquiry, and the greater of the two values must not exceed the rated short-circuit capacity of the protective devices.',
  'Maximum Zs limits for MCBs and RCBOs (Types B, C, D) are in Table 41.3 under Reg 411.4.202; limits for fuses (BS 88-2, BS 88-3, BS 3036, BS 1362) are in Table 41.2 under Reg 411.4.201. The Zs value at the furthest point of every circuit must not exceed the permitted limit for that protective device. BS 7671 Appendix 3 gives the on-site acceptance criterion for readings taken at ambient temperature: measured Zs ≤ 0.80 × tabulated limit, the 0.8 factor allowing for conductor temperature rise under load.',
  "Live Zs testing on an RCD-protected circuit will trip the RCD unless the instrument's no-trip (RCD-compatible) mode is used — the test current flows in the line conductor but not the neutral. Otherwise use the calculated method (Ze + R1 + R2 from continuity tests).",
];

const faqs = [
  {
    question: 'What is the difference between Ze and Zs?',
    answer:
      'Ze (external earth loop impedance) is the impedance of the earth fault loop external to the installation. It is measured at the origin between the incoming line conductor and the means of earthing, with the main switch off and locked and the means of earthing disconnected from the main earthing terminal so that no parallel paths through bonded metalwork remain (GN3 2.29). Zs (total earth loop impedance) is the total impedance of the fault loop at any point within the installation, including the internal conductors. Zs = Ze + (R1 + R2), where R1 is the line conductor resistance and R2 is the CPC resistance from the consumer unit to the measurement point.',
  },
  {
    question: 'What are typical Ze values for UK installations?',
    answer:
      'Ze values depend on the system earthing arrangement. For TN-C-S (PME or combined protective and neutral) earthing — the most common domestic arrangement in the UK — typical Ze values are 0.35Ω or less, though the distribution network operator (DNO) may declare a different maximum. For TN-S earthing (separate neutral and earth from the supply), typical values are 0.8Ω or less. For TT earthing systems (where the installation has its own earth electrode), Ze is replaced by the electrode resistance Ra, which may be several ohms.',
  },
  {
    question: 'What are the maximum Zs values for Type B and Type C MCBs?',
    answer:
      'Maximum Zs limits for MCBs and RCBOs are tabulated in Table 41.3 (Reg 411.4.202). Ia = 5 × In for Type B, 10 × In for Type C, 20 × In for Type D (0.4 s). Type B examples (230 V, Cmin = 0.95): 6 A = 7.28 Ω, 10 A = 4.37 Ω, 16 A = 2.73 Ω, 20 A = 2.19 Ω, 32 A = 1.37 Ω, 40 A = 1.09 Ω, 50 A = 0.87 Ω, 63 A = 0.69 Ω. Type C (10 × In): 6 A = 3.64 Ω, 16 A = 1.37 Ω, 32 A = 0.68 Ω. Type D (20 × In, 0.4 s): 6 A = 1.82 Ω, 16 A = 0.68 Ω, 32 A = 0.34 Ω. Tabulated values apply at maximum conductor operating temperature. For readings taken at ambient temperature, BS 7671 Appendix 3 gives the acceptance criterion: measured Zs ≤ 0.80 × tabulated limit. Fuse Zs limits for 0.4 s are in Table 41.2 (Reg 411.4.201): BS 88-2 gG 16 A = 2.43 Ω, 32 A = 0.99 Ω; BS 88-3 16 A = 2.30 Ω, 32 A = 0.91 Ω. Fuse limits for 5 s are in Table 41.4 (Reg 411.4.203).',
  },
  {
    question: 'How do you calculate prospective fault current?',
    answer:
      'Prospective earth fault current at the origin of the installation is calculated using PEFC = Uo ÷ Ze, where Uo is the nominal voltage to earth (230V for single-phase) and Ze is the measured external loop impedance. For example, if Ze = 0.30Ω, PEFC = 230 ÷ 0.30 = 767A. The PFC must not exceed the rated short-circuit capacity (Ics or Icu) of the consumer unit and protective devices. Reg 643.7.3.201 requires the prospective short-circuit current and prospective earth fault current to be measured, calculated or determined by another method at the origin and other relevant points. The model forms carry a single "Prospective fault current, Ipf" box under supply characteristics — Appendix 14 states that in a single-phase system the prospective fault current is the greater of the line-to-neutral and line-to-earth values.',
  },
  {
    question: 'Why should you not perform live loop impedance tests on RCD-protected circuits?',
    answer:
      "A loop impedance tester injects a test current of typically 15A to 25A for a brief period to derive the loop impedance. This current flows in the line conductor but not the neutral — creating an imbalance that an RCD will detect as a residual current. A 30mA RCD will trip during the live loop impedance test. Use the calculated method instead: Zs = Ze + (R1 + R2), where R1 and R2 are obtained from the continuity tests. Some modern instruments use a very brief high-current pulse or a special RCD-compatible low-current method — check the instrument manufacturer's guidance.",
  },
  {
    question: 'What is the temperature correction factor for Zs?',
    answer:
      'The maximum Zs values in Tables 41.2 and 41.3 apply when the line conductors are at their maximum permitted operating temperature (Table 52.2 — typically 70°C for thermoplastic-insulated cables) and the CPCs are at the assumed initial temperature of Tables 54.2 to 54.5. Tests are carried out at ambient temperature. Note 2 to those tables says that if the conductors are at a different temperature when tested the reading should be adjusted accordingly, and refers to Appendix 3. Appendix 3 states that Reg 411.4.4 is considered to be met when the measured Zs ≤ 0.8 × (Uo × Cmin ÷ Ia) — in other words, measured Zs ≤ 0.80 × the tabulated limit, the 0.8 factor allowing for the rise in conductor resistance with load current. If the measured Zs exceeds 0.80 × the limit, work the figures through properly against the actual conductor temperature before deciding whether to raise a defect.',
  },
  {
    question: 'Can you use a long-lead method for Ze measurement?',
    answer:
      'Yes. Where the supply cannot be safely isolated to measure Ze directly, Ze can be measured using the long-lead (or three-wire) method with the supply energised. A long test lead (typically 25m or more) is connected from the line terminal at the origin of the installation to an earth point remote from the installation. This allows the instrument to measure Ze without disconnecting the supply. The supply must be isolated to safely connect the test lead — only a brief disconnection is required. Always follow safe isolation procedures.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/earth-loop-impedance-calculator',
    title: 'Earth Fault Loop Impedance Calculator',
    description: 'Calculate Zs and check it against BS 7671 maximum values in seconds.',
    icon: FileCheck2,
    category: 'Calculator',
  },
  {
    href: '/guides/earth-fault-loop-impedance-calculation',
    title: 'Earth Fault Loop Impedance Calculation',
    description:
      'The Zs = Ze + (R1+R2) formula step by step — temperature correction, maximum values and worked examples.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing-bs7671',
    title: 'Insulation Resistance Testing Guide',
    description:
      'Insulation resistance testing to BS 7671: test voltages, minimum acceptable values and the Reg 643.3 procedure for UK electricians.',
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
    description:
      'RCD verification to Reg 643.7.1 and 643.8 — a single AC test at the rated residual operating current (IΔn).',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/earth-electrode-testing',
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
    description: 'Overview of the wiring regulations and key changes in Amendment 4.',
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
          <a
            href="#calculator"
            className="inline-flex h-11 items-center font-semibold text-yellow-400 underline underline-offset-4 touch-manipulation"
          >
            Jump to the Zs calculator
          </a>{' '}
          — put in your Ze and R1+R2 and it works out Zs, the maximum permitted for your protective
          device and the fault current. Free, no sign-up.
        </p>
        <p>
          Earth fault loop impedance is the total impedance of the path that fault current would
          follow in the event of a line-to-earth fault. Understanding this path is fundamental to
          verifying that protective devices will operate fast enough to prevent electric shock or
          fire — which is the basis of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          automatic disconnection of supply (ADS) protection.
        </p>
        <p>
          When a fault occurs between a line conductor and an exposed-conductive-part, current flows
          from the supply transformer, along the line conductor of the distribution network, through
          the fault path within the installation, and back to the transformer via the earthing
          system. The impedance of this complete loop determines how much fault current flows, which
          in turn determines how quickly the protective device operates.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
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
              <span>
                <strong>Method — main switch off, means of earthing disconnected</strong>: GN3 2.29
                gives the sequence — turn the main switch off and secure it with a safety locking
                device, then disconnect the means of earthing from the main earthing terminal and
                from extraneous-conductive-parts so that no parallel paths remain. Connect the loop
                impedance tester between the incoming line conductor and the isolated means of
                earthing. The supply side remains energised; the instrument injects a test current
                and measures Ze directly. If parallel paths through bonded metalwork are left in
                place the reading will be artificially low and is not a true Ze.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>TN-C-S (PME) earthing</strong>: Typical Ze ≤ 0.35Ω. The neutral and
                protective conductors are combined in the distribution network. The supply earth is
                provided by the PEN (protective earthed neutral) conductor. Most modern domestic
                properties in the UK have PME earthing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>TN-S earthing</strong>: Typical Ze ≤ 0.8Ω. Separate earth conductor in the
                supply cable sheath. The Ze is higher because the earth path impedance is greater.
                Found in older urban properties supplied via older distribution cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>TT earthing</strong>: No Ze in the traditional sense — the installation has
                its own earth electrode with resistance Ra. Ra plus the electrode resistance of the
                supply transformer gives the total loop impedance. Reg 411.5.2 lists both an RCD and
                an overcurrent protective device as permitted devices for a TT system, an RCD being
                preferred — an overcurrent device may only be relied on where a suitably low Zs is
                permanently and reliably assured.
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
          circuit conductors. It is measured (or calculated) at the furthest point of each circuit —
          this is where the impedance is highest and therefore where the fault current will be
          lowest and the protective device takes longest to operate.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>Live Zs test</strong>: With the circuit energised, connect the loop
                impedance tester between line and earth at the furthest accessible point of the
                circuit (e.g., the most remote socket outlet). The instrument injects a test current
                and measures Zs directly. This is the preferred method where practical and where
                RCDs do not prevent it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Calculated Zs (dead method)</strong>: Zs is calculated as Ze plus the R1+R2
                value obtained from the continuity tests: Zs = Ze + (R1 + R2). This is used for
                RCD-protected circuits and where live testing is not practicable. The value must be
                adjusted for conductor temperature — Note 2 to Tables 41.2 and 41.3 refers you to BS
                7671 Appendix 3 for the method. Our{' '}
                <SEOInternalLink href="/guides/earth-fault-loop-impedance-calculation">
                  earth fault loop impedance calculation guide
                </SEOInternalLink>{' '}
                works through the full method with worked examples.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Temperature correction</strong>: Conductor resistance (and therefore
                impedance) increases with temperature. Tables 41.2 and 41.3 give Zs limits at the
                maximum conductor operating temperature. For readings taken at ambient temperature,
                BS 7671 Appendix 3 gives the acceptance criterion: measured Zs ≤ 0.8 × (Uo × Cmin ÷
                Ia), i.e. measured Zs ≤ 0.80 × the tabulated limit. Where the measured Zs exceeds
                0.80 × the tabulated limit, work the Appendix 3 figures through against the actual
                conductor temperature before deciding compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'calculator',
    heading: 'Work Out Zs and Check It Against the Device Limit',
    content: (
      <>
        <p>
          Free to use, no sign-up. Enter the Ze you measured at the origin and the R1+R2 from your
          continuity test — or switch to measured mode and enter the Zs straight off the instrument.
          It returns Zs = Ze + (R1 + R2), the maximum permitted Zs for the protective device you
          select, the Appendix 3 site limit (0.80 × tabulated) and the resulting fault current. TT
          circuits are handled on the R<sub>A</sub> × I&Delta;n ≤ 50 V basis of Reg 411.5.3.
        </p>
        <CalculatorSurface>
          <EarthFaultLoopCalculator />
        </CalculatorSurface>
      </>
    ),
  },
  {
    id: 'pfc-calculation',
    heading: 'Prospective Fault Current (PFC) Calculation',
    content: (
      <>
        <p>
          Prospective fault current (PFC) is the maximum current that would flow in the event of a
          fault — either a line-to-earth fault (PEFC, prospective earth fault current) or a
          line-to-neutral fault (PSCC, prospective short-circuit current). Both must be determined
          and recorded, and both must be within the rated short-circuit breaking capacity of the
          protective devices.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>PEFC (prospective earth fault current)</strong>: PEFC = Uo ÷ Ze, where Uo =
                230V and Ze is the measured external loop impedance. If Ze = 0.30Ω, PEFC = 230 ÷
                0.30 = 767A. Consumer unit MCBs and fuses must have a rated short-circuit capacity
                (Ics) equal to or greater than this value. Most domestic consumer units are rated at
                6kA or 10kA breaking capacity, which covers typical UK PME systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>PSCC (prospective short-circuit current)</strong>: PSCC = Uo ÷ Zline, where
                Zline is the impedance of the line-to-neutral loop (line conductor and neutral
                conductor). Measured by connecting the instrument between line and neutral at the
                origin with the main switch open. Alternatively calculated from Ze and the line-to-
                neutral resistance. For a PME system with Ze = 0.30Ω, PSCC will be higher than PEFC
                because the line-to-neutral path has lower impedance than the line-to-earth path.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Determine both values</strong>: Reg 643.7.3.201 requires both the
                prospective short-circuit current and the prospective earth fault current to be
                measured, calculated or determined by another method. Appendix 14 confirms that in a
                single-phase system the prospective fault current is the greater of the two, and it
                is that value which is entered in the single "Prospective fault current, Ipf" box on
                the certificate and which determines the required breaking capacity of the
                protective devices.
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
          Maximum permitted Zs values for MCBs and RCBOs are in Table 41.3 (Reg 411.4.202); values
          for fuses are in Table 41.2 for 0.4 s (Reg 411.4.201) and Table 41.4 for 5 s (Reg
          411.4.203). These tabulated values are at the maximum conductor operating temperature.
          Table 41.3 covers both final circuits (0.4 s disconnection, Reg 411.3.2.2) and
          distribution circuits (5 s disconnection, Reg 411.3.2.3): Types B and C print a single row
          valid for both times, while Type D — Table 41.3(c) — prints separate 0.4 s and 5 s rows.
          For readings taken at ambient temperature, use the BS 7671 Appendix 3 criterion: measured
          Zs ≤ 0.80 × tabulated limit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>Type B MCBs (BS EN 60898)</strong>: Operate at 3–5× rated current (Ia = 5 ×
                In). Maximum Zs at 230V using Reg 411.4.4 formula (Cmin × Uo / Ia, where Cmin =
                0.95): 6A = 7.28Ω / 10A = 4.37Ω / 16A = 2.73Ω / 20A = 2.19Ω / 32A = 1.37Ω / 40A =
                1.09Ω / 50A = 0.87Ω / 63A = 0.69Ω.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Type C MCBs (BS EN 60898)</strong>: Operate at 5–10× rated current (Ia = 10
                × In). Maximum Zs values are half those of Type B for the same rating: 6A = 3.64Ω /
                16A = 1.37Ω / 32A = 0.68Ω. Type C MCBs are common for motor loads and circuits with
                high inrush currents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Type D MCBs (BS EN 60898)</strong>: Magnetic trip band 10–20 × In; Table
                41.3(c) (Reg 411.4.202) uses Ia = 20 × In for the 0.4 s row and 10 × In for the 5 s
                row. Maximum Zs for 0.4 s: 6 A = 1.82 Ω / 16 A = 0.68 Ω / 32 A = 0.34 Ω (the 5 s
                figures are double these). Appendix 3 site limits (0.80 ×) for 0.4 s: 6 A = 1.46 Ω /
                16 A = 0.54 Ω / 32 A = 0.27 Ω. Very low Zs limits mean Type D devices are unsuitable
                for long cable runs — typically used for motor or welding loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>BS 88-2 (gG/gM) and BS 88-3 fuses — Table 41.2 (Reg 411.4.201)</strong>: BS
                88-2 gG maximum Zs at 0.4 s disconnection: 16 A = 2.43 Ω / 32 A = 0.99 Ω / 63 A =
                0.44 Ω. BS 88-3 (fuse system C): 16 A = 2.30 Ω / 32 A = 0.91 Ω. Note: Table 41.2
                covers 0.4 s disconnection only (Reg 411.3.2.2 final-circuit requirement) — the 5 s
                fuse values are in Table 41.4. Fuse limits sit between the MCB curves rather than
                always above them: at 16 A, BS 88-2 gG allows 2.43 Ω against 2.73 Ω for a Type B and
                1.37 Ω for a Type C.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-6 my-4">
          <div className="flex items-start gap-3">
            <span className="text-white">
              <strong>On-site pass criterion (BS 7671 Appendix 3)</strong>: The measured Zs (at
              ambient temperature) should not exceed 0.80 × the tabulated Table 41.3 or Table 41.2
              limit. The 0.8 factor accounts for the increase in conductor resistance with
              temperature under load current, and Appendix 3 states that Reg 411.4.4 is considered
              met when this is satisfied. If the measured Zs is between 0.80 × and 1.00 × the
              tabulated limit, work the Appendix 3 figures through against the actual conductor
              temperature before deciding compliance. Where thermosetting insulation is sized per
              Reg 512.1.5, use 70°C thermoplastic temperatures for Zs assessment (Note 3 to Tables
              41.2 and 41.3).
            </span>
          </div>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <div className="text-white">
              <strong>TT systems — Reg 411.5.3 Table 41.5</strong>
              <p className="mt-2">
                Where an RCD provides fault protection in a TT system, Reg 411.5.3 requires R
                <sub>A</sub> × I&Delta;n ≤ 50 V, where R<sub>A</sub> is the sum of the resistances
                of the earth electrode and the protective conductor connecting it to the
                exposed-conductive-parts. The requirement is met if the loop impedance meets Table
                41.5, i.e. Zs ≤ 50 V ÷ I&Delta;n. Maximum permitted Zs values from Table 41.5 (Reg
                411.5.3):
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>30 mA RCD: Zs ≤ 1667 &Omega;</li>
                <li>100 mA RCD: Zs ≤ 500 &Omega;</li>
                <li>300 mA RCD: Zs ≤ 167 &Omega;</li>
                <li>500 mA RCD: Zs ≤ 100 &Omega;</li>
              </ul>
              <p className="mt-2">
                Note 2 to Table 41.5 (against the 30 mA and 100 mA rows) says the resistance of the
                installation earth electrode should be as low as practicable, and that a value
                exceeding 200 Ω may not be stable — see Reg 542.2.4. These Zs limits are far higher
                than TN system limits, so a TT circuit relying on an RCD for fault protection is not
                verified against the Table 41.3 MCB Zs limits.
              </p>
            </div>
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
              <span>
                <strong>Live testing (preferred where RCDs permit)</strong>: Measures the actual Zs
                of the complete circuit including all connections and joints. Detects deteriorated
                connections, corroded terminals, and high-resistance joints that would not be found
                by the calculated method. More accurate than calculation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Live testing limitations</strong>: Cannot be used on RCD-protected circuits
                without a special RCD-compatible instrument mode. Requires the supply to be
                energised and appropriate live working precautions. Test current (typically 15–25A)
                may be problematic on sensitive circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Calculated method (Zs = Ze + R1 + R2)</strong>: Safe for use on all
                circuits. Requires accurate Ze measurement and precise R1+R2 values from continuity
                tests. Good practice where RCDs prevent live testing. Must be corrected for
                temperature.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Calculated method limitations</strong>: Does not detect high-resistance
                joints unless R2 is abnormally high. If a connection deteriorates between test day
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
          Loop impedance instruments (and multifunction testers with a loop impedance function) have
          settings that must be correctly configured before testing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>Standard vs RCD-compatible mode</strong>: Select RCD-compatible (low-current
                or "no-trip") mode when testing circuits with 30mA RCDs. This mode uses a very brief
                pulse or lower test current that does not trip the RCD. The resolution is lower than
                the standard high-current mode — note the limitation on the test record.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>2-wire vs 4-wire measurement</strong>: For Ze measurement at the origin, use
                the standard 2-wire (L-PE) connection. For accurate Zs measurement at distant
                points, some instruments support a 3-wire connection using a remote reference lead
                to compensate for test lead resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
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
              <span>
                <strong>Ze</strong>: Record the measured Ze value and the earthing system type
                (TN-C-S, TN-S, or TT) at the installation origin.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Zs per circuit</strong>: Record the measured or calculated Zs value at the
                furthest point of each circuit. Indicate whether the result is measured (M) or
                calculated (C). Note if an RCD-compatible instrument mode was used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>PFC</strong>: Determine both the prospective earth fault current and the
                prospective short-circuit current at the origin, and enter the greater of the two in
                the "Prospective fault current, Ipf" box under supply characteristics.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Instrument details</strong>: Record the make, model, serial number, and
                calibration date of the loop impedance tester on the certificate.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Ze and Zs Explained: Earth Loop Impedance Testing Guide"
          description="Ze vs Zs made simple: what each means, how to test earth fault loop impedance, and the maximum Zs values to compare against, to BS 7671."
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
          Accurate loop impedance testing underpins the safety of the entire electrical
          installation. An Zs value above the maximum permitted limit means the protective device
          will not disconnect fast enough under a fault condition — a potentially lethal situation.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <div className="flex items-start gap-4">
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
      title="Ze vs Zs Explained: Ze 0.35Ω TN-C-S, 0.8Ω TN-S"
      description="Ze is the loop impedance outside the installation: TN-C-S 0.35Ω, TN-S 0.8Ω. Zs = Ze + (R1+R2) at a circuit's far end. How to test both, plus max Zs values."
      datePublished="2026-03-27"
      dateModified="2026-07-02"
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
      answerBox={{
        question: 'What is the difference between Ze and Zs?',
        answer:
          'Ze is the external earth fault loop impedance — the part of the loop outside the installation (the supply transformer, the supply cable and the earth return). Zs is the total loop impedance at a point in a circuit, where Zs = Ze + (R1 + R2). Zs must not exceed the maximum for the protective device in BS 7671 Tables 41.2 to 41.4 so the circuit disconnects within the required time.',
      }}
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
