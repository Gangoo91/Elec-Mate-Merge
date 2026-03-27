import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ClipboardCheck,
  AlertTriangle,
  Zap,
  FileCheck2,
  Calculator,
  GraduationCap,
  ShieldCheck,
  Gauge,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Earth Fault Loop Impedance Testing', href: '/guides/earth-fault-loop-impedance-testing' },
];

const tocItems = [
  { id: 'overview', label: 'What is Earth Fault Loop Impedance?' },
  { id: 'ze-vs-zs', label: 'Ze vs Zs Explained' },
  { id: 'test-procedure', label: 'Zs Testing Procedure' },
  { id: 'accepted-values', label: 'Accepted Zs Values (Appendix 3)' },
  { id: 'pass-fail', label: 'Pass/Fail Assessment' },
  { id: 'common-problems', label: 'Common Problems and Causes' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Earth fault loop impedance (Zs) is the total impedance of the earth fault current path: the supply transformer winding, the line conductor from transformer to fault, and the protective conductor from fault back to the transformer.',
  'Ze is the external earth fault loop impedance — the part of the loop external to the installation (measured at the origin). Zs is the total loop impedance at any given point in the circuit.',
  'Zs = Ze + (R1 + R2), where R1 is the line conductor resistance and R2 is the CPC resistance from origin to the point of measurement.',
  'Accepted maximum Zs values are given in BS 7671:2018+A3:2024 Appendix 3 Tables. These values ensure that the protective device operates within its required disconnection time under fault conditions.',
  'When measuring Zs with a loop tester, apply a correction factor for conductor temperature — tabulated values assume conductors at 20°C, but a warm installation may read higher than the table maximum even if the installation is compliant.',
];

const faqs = [
  {
    question: 'What is the difference between Ze and Zs?',
    answer:
      'Ze (external earth fault loop impedance) is the impedance of the fault current path that is external to the installation — from the supply transformer, through the line conductor of the incoming supply, and back via the distributor\'s earthing system. It is measured at the origin of the installation with all internal circuits disconnected. Zs (total earth fault loop impedance) is the total impedance from a point in the installation back to the supply transformer, including both the external part (Ze) and the internal part (R1 + R2). Zs must be measured or calculated at each point in the installation where compliance with disconnection time requirements needs to be verified — typically at the furthest point of each circuit.',
  },
  {
    question: 'What Zs values are acceptable under BS 7671?',
    answer:
      'Maximum permissible Zs values are given in BS 7671:2018+A3:2024 Appendix 3 Tables. The values depend on the type and rating of the protective device. For example, for a 32A Type B MCB, the maximum Zs is 1.44Ω (for a 0.4s disconnection time on a final circuit). For a 16A Type B MCB the maximum Zs is 2.87Ω. For a 6A Type B MCB the maximum Zs is 7.67Ω. BS 7671 requires that the measured Zs does not exceed the tabulated maximum at the conductor temperature assumed in the tables (typically 70°C for thermoplastic insulated cables). In practice, test instruments measure at ambient temperature, so a correction factor is applied — divide the tabulated maximum by 1.24 for copper conductors with thermoplastic insulation to get the maximum acceptable measured value at ambient temperature.',
  },
  {
    question: 'How do I measure Zs on a live circuit?',
    answer:
      'Switch on the circuit and connect the loop tester to the line, neutral, and earth terminals at the furthest accessible point on the circuit — typically the last socket outlet or lighting point. The tester injects a test current through the fault loop (line → through the supply transformer → back via the earth path) and measures the resulting voltage drop, calculating Zs = V/I. Always ensure that the supply is live before testing — a loop tester cannot measure Zs on a dead circuit. Use a tester with a high-current or low-current mode as appropriate for the sensitivity required. High-current mode (typically 20A to 25A) is more accurate but may cause nuisance tripping of sensitive RCDs — use a loop tester with a no-trip or low-current mode where an RCD is in circuit.',
  },
  {
    question: 'Why does my Zs reading exceed the table maximum even though the installation seems fine?',
    answer:
      'There are two common causes. First, the conductor temperature effect: BS 7671 Appendix 3 tables assume conductors operating at their maximum permissible temperature (70°C for thermoplastic cables). If you are testing at ambient temperature (say 20°C), the conductor resistance is approximately 80% of its value at 70°C, so the measured Zs will be lower than the operating value. However, the tables give maximum Zs at operating temperature — for compliance, the measured value at ambient temperature must not exceed (tabulated Zs ÷ 1.24). If the measured value exceeds this corrected limit, the installation does not comply. Second, a genuinely high Zs may be caused by a poor earth connection, corroded terminals, undersized CPC, or an excessively long circuit.',
  },
  {
    question: 'Can I calculate Zs instead of measuring it?',
    answer:
      'Yes. BS 7671 permits Zs to be determined by calculation: Zs = Ze + (R1 + R2), where Ze is measured at the origin and R1 + R2 is calculated from conductor cross-section, length, and resistivity, or measured by continuity testing. This method is particularly useful for new installations where circuits are not yet energised and for circuits where live Zs testing would require energising circuits sequentially. The calculated value must not exceed the table maximum (corrected for conductor temperature at operating conditions). Measurement is generally preferred for EICRs because it reflects the actual installed condition of the conductors, including any degradation, joints, or damage.',
  },
  {
    question: 'What should I do if Zs is too high?',
    answer:
      'First, verify the test result is genuine: check for poor connections at terminals, confirm the tester leads are making good contact, and repeat the measurement. If the reading is consistently high: check the main earth connection and main bonding conductors; measure Ze at the origin to determine whether the problem is external or internal; use a Milliohm meter to measure R1 and R2 separately to identify which conductor has excessive resistance; check for corroded or loose joints in the circuit; and confirm the CPC is continuous throughout the circuit. Common causes of high Zs include a corroded or disconnected earth electrode (TT systems), a poor connection at the main earthing terminal, an undersized CPC, or an excessively long circuit run.',
  },
  {
    question: 'Do I need to test Zs at every socket outlet?',
    answer:
      'For an initial inspection (EIC), BS 7671 requires that Zs is verified at the furthest point of each circuit, which for a ring final circuit means at least one test at the furthest point. For an EICR, a representative sample of circuits must be tested. In practice, most inspectors test at the furthest accessible point of each circuit and record the worst-case reading. For ring final circuits, testing at the furthest socket on the ring is the most meaningful check. The EICR schedule of tests requires the Zs value to be recorded for each circuit, along with the maximum permissible value from the applicable table.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/continuity-testing-electricians-guide',
    title: 'Continuity Testing Guide',
    description: 'R1+R2 measurement, ring circuit testing, and CPC continuity procedures.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing-bs7671',
    title: 'Insulation Resistance Testing',
    description: 'Test voltages, minimum values, and how to test new and existing circuits.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates with test results on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables correctly and check that Zs will comply before installation.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/earthing-system-fault-finding',
    title: 'Earthing System Fault Finding',
    description: 'Diagnose open circuit earths, poor electrode connections, and PME issues.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured training covering all test methods.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What is Earth Fault Loop Impedance?',
    content: (
      <>
        <p>
          Earth fault loop impedance (EFLI) is the total impedance of the complete circuit that
          earth fault current must travel through if a line-to-earth fault occurs at any point in an
          electrical installation. Understanding and correctly measuring this impedance is fundamental
          to verifying that protective devices will disconnect within the required time under fault
          conditions — which is the primary mechanism by which BS 7671 protects against electric
          shock from indirect contact.
        </p>
        <p>
          The earth fault current loop consists of: the line conductor from the point of fault back
          to the supply transformer; the transformer winding itself; and the return path from the
          transformer neutral (star point) via the earthing system and the protective conductor (CPC)
          back to the point of fault. The lower the impedance of this loop, the higher the fault
          current and the faster the protective device operates.
        </p>
        <p>
          BS 7671:2018+A3:2024 requires that the earth fault loop impedance Zs
          must not exceed the value corresponding to the required disconnection time for the circuit
          concerned. The required disconnection times are 0.4 seconds for final circuits up to 32A
          supplying socket outlets or equipment accessible to the public, and 5 seconds for
          distribution circuits and final circuits supplying fixed equipment (with some exceptions).
        </p>
      </>
    ),
  },
  {
    id: 'ze-vs-zs',
    heading: 'Ze vs Zs Explained',
    content: (
      <>
        <p>
          The distinction between Ze and Zs is important for both testing and fault finding. Here is
          a clear breakdown:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Ze — External Impedance</h3>
            <p className="text-white text-sm leading-relaxed">
              Ze is the external earth fault loop impedance — the portion of the fault loop that is
              external to the installation. It is measured at the origin of the installation with all
              internal circuits disconnected, and includes the supply transformer winding, the line
              conductor from transformer to the installation origin, and the distributor's earthing
              system (PME, TNS, or TT electrode). Ze is provided by the distributor or measured by
              the electrician at the intake position.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Zs — Total Impedance</h3>
            <p className="text-white text-sm leading-relaxed">
              Zs is the total earth fault loop impedance at a specific point in the installation. It
              equals Ze plus the resistance of the line conductor (R1) and the resistance of the
              protective conductor (R2) from the origin to the point of measurement. The formula is
              Zs = Ze + (R1 + R2). Zs must be verified at the furthest point of each circuit to
              confirm the protective device will operate within the required disconnection time.
            </p>
          </div>
        </div>
        <p>
          For a typical TN-C-S (PME) supply in the UK, Ze is typically 0.35Ω or less. For a TN-S
          supply it is typically 0.8Ω or less. For a TT supply, Ze can be several ohms because the
          return path relies on the earth electrode and the distributor's earth, both of which have
          significant resistance. This is why RCDs are mandatory on TT installations — the Zs is too
          high to achieve disconnection within the required time using overcurrent devices alone.
        </p>
      </>
    ),
  },
  {
    id: 'test-procedure',
    heading: 'Zs Testing Procedure',
    content: (
      <>
        <p>
          Follow this procedure for measuring Zs at the furthest accessible point of a circuit. The
          circuit must be energised for this test.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-none">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">1</span>
              <span>
                <strong>Safe isolation check</strong> — confirm the circuit is energised and that
                it is safe to proceed with live testing. Warn others in the vicinity that a live
                test is in progress.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">2</span>
              <span>
                <strong>Select the correct test mode</strong> — if an RCD is in the circuit, use
                your loop tester's no-trip or low-current mode to avoid tripping the RCD during the
                test. Check the tester manual for the specific mode.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">3</span>
              <span>
                <strong>Connect the test leads</strong> — at the furthest accessible point (last
                socket outlet, last lighting point), connect line to line terminal (L), neutral to
                neutral (N), and earth to earth (E). Ensure good contact.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">4</span>
              <span>
                <strong>Initiate the test</strong> — press the test button and allow the instrument
                to complete its measurement cycle. The display shows the Zs value in ohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">5</span>
              <span>
                <strong>Record the result</strong> — record the measured Zs, the circuit
                designation, and the test point location on the schedule of test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">6</span>
              <span>
                <strong>Compare with the table maximum</strong> — divide the Appendix 3 table
                maximum Zs by 1.24 to get the ambient-temperature limit. Compare your reading
                against this corrected value.
              </span>
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Record Zs test results on your phone"
          description="Elec-Mate's EIC and EICR apps capture Zs test results for each circuit, automatically compare against the Appendix 3 table values, and flag any exceedances. Complete professional test schedules on site."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'accepted-values',
    heading: 'Accepted Zs Values — BS 7671 Appendix 3 Tables',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 Appendix 3 contains tables of maximum earth fault loop impedance
          values for different protective devices and disconnection times. The key tables are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Table 41.3</strong> — maximum Zs for BS 88-2 and BS 88-3 fuses
                (industrial cartridge fuses). Values at 0.4s and 5s disconnection times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Table 41.4</strong> — maximum Zs for Type B MCBs to BS EN 60898 and BS EN
                61009. At 32A, maximum Zs is 1.44Ω (0.4s). At 16A, 2.87Ω. At 6A, 7.67Ω.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Table 41.5</strong> — maximum Zs for Type C MCBs. Values are lower than
                Type B because Type C devices require a higher fault current to operate in the
                instantaneous region. At 32A, maximum Zs is 0.72Ω (0.4s).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Table 41.6</strong> — maximum Zs for Type D MCBs. At 32A, maximum Zs is
                0.36Ω (0.4s). Type D devices are used for high-inrush loads and require very low
                Zs to achieve fast disconnection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ambient temperature correction</strong> — all table values assume conductors
                at maximum operating temperature. For measurements at ambient temperature (~20°C),
                divide the tabulated maximum by 1.24 (copper thermoplastic conductors) to obtain
                the maximum permissible measured value.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These tables are incorporated into the schedule of test results on an{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          or{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            EICR
          </SEOInternalLink>
          . The measured Zs and the design Zs (maximum permitted) must both be recorded for each
          circuit.
        </p>
      </>
    ),
  },
  {
    id: 'pass-fail',
    heading: 'Pass/Fail Assessment',
    content: (
      <>
        <p>
          Assessing whether a measured Zs is acceptable requires comparing the measured value
          against the table maximum corrected for conductor temperature:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>PASS</strong> — measured Zs (at ambient temperature) does not exceed the
                table maximum divided by 1.24. Example: 32A Type B MCB, table maximum 1.44Ω,
                corrected limit = 1.44 ÷ 1.24 = 1.16Ω. A measured value of 0.95Ω passes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>FAIL</strong> — measured Zs exceeds the corrected limit. Record as a C2
                (potentially dangerous) or C3 (improvement recommended) observation on an EICR
                depending on severity and risk assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Borderline</strong> — if the measured value is close to (but below) the
                corrected limit, consider whether measurement uncertainty in the instrument (typically
                ±5% to ±10%) could put the true value above the limit. Document any assumptions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          On an initial inspection (EIC), a circuit that fails the Zs test must be rectified before
          the certificate is issued. On an EICR, a failing Zs is coded as C2 (requires urgent
          attention) if it represents a genuine risk of the device not operating within the required
          disconnection time.
        </p>
      </>
    ),
  },
  {
    id: 'common-problems',
    heading: 'Common Problems and Causes of High Zs',
    content: (
      <>
        <p>
          When Zs readings exceed the permissible maximum, a systematic investigation is needed.
          The most common causes are:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor main earth connection</strong> — corroded or loose connections at the
                main earthing terminal (MET), the earthing conductor, or the connection to the
                PME/TNS earth. Measure Ze and compare against the expected distributor value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corroded or damaged CPC</strong> — the protective conductor (earth wire) is
                corroded, damaged, or has a high-resistance joint. Measure R2 separately to identify
                the CPC resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Undersized CPC</strong> — the CPC cross-section is insufficient for the
                circuit length, resulting in excessive R2. This is particularly common in older
                installations with single-core earth wires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Excessively long circuit run</strong> — very long circuits in large
                commercial or agricultural premises can result in high R1 + R2 even with correctly
                sized conductors. Consider upgrading conductor sizes or installing an additional
                distribution board closer to the load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor TT earth electrode</strong> — on TT systems, a corroded or poorly
                installed earth electrode can result in very high Ze. The electrode resistance
                should be tested separately.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Efficient Zs Testing on Site',
    content: (
      <>
        <p>
          Earth fault loop impedance testing is one of the most time-consuming tests on an
          inspection. Here are practical tips to work efficiently without compromising accuracy:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Measure Ze First</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always measure Ze at the origin before testing individual circuits. This gives you
                  the baseline for calculating expected Zs values and quickly identifies if a
                  high-Zs reading is due to an external supply issue rather than an internal circuit
                  problem.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Use the EICR App to Record Results</h4>
                <p className="text-white text-sm leading-relaxed">
                  Record Zs readings directly into the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  as you go. The app automatically checks each reading against the Appendix 3 table
                  for the device type and rating you have entered, and flags any exceedances. No
                  manual table-lookups required on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Calculate Zs from Continuity Results</h4>
                <p className="text-white text-sm leading-relaxed">
                  For new installations, calculate Zs from the measured R1 + R2 continuity values
                  plus the measured Ze, rather than measuring Zs live on each circuit. This is faster
                  and avoids the risk of nuisance RCD tripping during construction.
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

export default function EarthFaultLoopImpedanceTestingPage() {
  return (
    <GuideTemplate
      title="Earth Fault Loop Impedance Testing | Zs Testing Guide UK"
      description="Complete guide to earth fault loop impedance (Zs) testing for UK electricians. Covers Ze vs Zs, the Zs testing procedure, BS 7671 Appendix 3 table values, pass/fail assessment, and common causes of high Zs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Earth Fault Loop Impedance Testing:{' '}
          <span className="text-yellow-400">Zs Testing Procedure and Accepted Values</span>
        </>
      }
      heroSubtitle="A complete guide to measuring and assessing earth fault loop impedance (Zs) for UK electricians. Covers Ze vs Zs, the measurement procedure, BS 7671 Appendix 3 table values, temperature correction, and common causes of high Zs readings."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Earth Fault Loop Impedance Testing"
      relatedPages={relatedPages}
      ctaHeading="Record Zs Test Results and Complete EICs on Your Phone"
      ctaSubheading="Elec-Mate automatically checks Zs readings against BS 7671 Appendix 3 tables and generates professional test schedules on site. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
