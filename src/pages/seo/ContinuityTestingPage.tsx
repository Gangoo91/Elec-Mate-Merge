import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ClipboardCheck,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  GraduationCap,
  Zap,
  Wrench,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Continuity Testing', href: '/guides/continuity-testing-electricians-guide' },
];

const tocItems = [
  { id: 'overview', label: 'Why Continuity Testing Matters' },
  { id: 'r1-r2', label: 'R1+R2 Measurement' },
  { id: 'ring-circuits', label: 'Ring Circuit Testing (r1+r2/4 Method)' },
  { id: 'cpc-continuity', label: 'CPC Continuity' },
  { id: 'test-lead-resistance', label: 'Test Lead Resistance' },
  { id: 'regulation-643-2', label: 'Regulation 643.2 Explained' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Continuity testing verifies that protective conductors (CPCs) are electrically continuous throughout the installation, and provides the R1+R2 values needed to calculate earth fault loop impedance (Zs).',
  'R1 is the resistance of the line conductor from the origin to the furthest point of the circuit. R2 is the resistance of the protective conductor (CPC) from the origin to the furthest point. R1+R2 is measured at the furthest accessible point of each circuit.',
  'For ring final circuits, the r1+r2/4 method is used: measure the end-to-end resistance of the ring line conductor (r1), the end-to-end resistance of the ring CPC (r2), then divide by 4 to determine the expected maximum Zs contribution from the ring conductors at any socket outlet.',
  'Test lead resistance must be measured and subtracted (nulled) before recording continuity values — most modern instruments have a null function. Lead resistance is typically 0.1Ω to 0.5Ω and is significant relative to the measured circuit values.',
  'BS 7671 Regulation 643.2 requires continuity of ring final circuit conductors to be verified and protective conductors to be tested for continuity throughout the installation.',
];

const faqs = [
  {
    question: 'What is R1+R2 and why do I need to measure it?',
    answer:
      'R1 is the resistance of the line conductor from the protective device (MCB or fuse) at the consumer unit to the furthest point of the circuit. R2 is the resistance of the protective conductor (CPC or earth wire) for the same circuit length. R1+R2 is the combined resistance of these two conductors in series — this value is a key component in calculating the earth fault loop impedance Zs. The formula is Zs = Ze + (R1 + R2), where Ze is the external impedance measured at the origin. By measuring R1+R2 during continuity testing (with the circuit dead and isolated), the total Zs at the furthest point of each circuit can be verified without needing to take a live Zs measurement — which is particularly useful for new installations under construction.',
  },
  {
    question: 'How do I measure R1+R2 at the furthest point of a circuit?',
    answer:
      'Connect a long temporary link between the line and CPC (earth) conductors at the furthest accessible point of the circuit — typically at the last socket outlet, light fitting, or fixed appliance. Return to the consumer unit and connect a low-resistance ohmmeter (continuity tester) between the line terminal and the earth terminal of the circuit. The reading obtained is R1+R2. The test link must be good quality and of negligible resistance — a short piece of appropriately rated cable works well. Alternatively, use a two-wire continuity tester with long test leads and connect between the line terminal and CPC at the furthest point. Always null out the test lead resistance before taking measurements.',
  },
  {
    question: 'How does the r1+r2/4 method work for ring final circuits?',
    answer:
      'A ring final circuit has conductors that form a continuous loop, so the resistance at any socket outlet on the ring depends on its position relative to the two ends of the ring. To determine the maximum expected R1+R2 at any point on the ring, use the r1+r2/4 method. First, at the consumer unit, measure the end-to-end resistance of the complete ring line conductor (connect the two line terminals together and measure resistance from one to the other) — this is r1. Then measure the end-to-end resistance of the complete ring CPC (connect the two earth terminals together and measure resistance from one to the other) — this is r2. The maximum R1+R2 at any outlet is (r1+r2)/4. This works because the worst-case position is the mid-point of the ring, where the combined parallel paths give a resistance of one quarter of the total ring resistance.',
  },
  {
    question: 'What is CPC continuity and why is it tested separately?',
    answer:
      'CPC continuity testing verifies that the protective conductor (earth wire) is electrically connected throughout the circuit and to the main earthing terminal (MET). Without a continuous CPC, exposed metalwork (enclosures, conduit, trunking) is not earthed and creates a shock risk if a live conductor makes contact with the metalwork. CPC continuity is tested using a low-resistance ohmmeter. The test lead is connected between the main earthing terminal and the CPC at the furthest accessible point on the circuit. The reading (R2) must be below the maximum value calculated for the installed CPC cross-section and circuit length. A reading of infinity (open circuit) indicates a broken or disconnected CPC, which must be repaired before the installation is energised.',
  },
  {
    question: 'Why do I need to null out test lead resistance?',
    answer:
      'Continuity test instruments measure resistance by passing a small test current through the circuit and measuring the resulting voltage. The test leads themselves have resistance — typically between 0.1Ω and 0.5Ω for standard test leads. If this lead resistance is not accounted for, it will be added to all measured values, making circuit resistances appear higher than they actually are. For example, if the true R2 of a circuit is 0.4Ω and your test leads add 0.3Ω, you would measure 0.7Ω — 75% higher than the actual value. To null out lead resistance: connect the test leads together, press the null or zero button on the instrument, and the displayed reading will be set to zero. All subsequent measurements will have the lead resistance automatically subtracted. Repeat the null procedure if you change leads.',
  },
  {
    question: 'What does Regulation 643.2 require for continuity testing?',
    answer:
      'BS 7671:2018+A3:2024 Regulation 643.2 requires continuity testing to be carried out on all ring final circuits to verify that the ring is complete and has not been incorrectly wired as a spurious ring (a figure-of-eight configuration that would result in incorrect R1+R2 values and potentially overloaded conductors). The regulation also requires that all protective conductors, including main protective bonding conductors, supplementary bonding conductors, and circuit protective conductors, are tested for continuity. Main protective bonding continuity is tested between the main earthing terminal and the bonded service (gas pipe, water pipe, structural metalwork). The maximum acceptable resistance for main bonding conductors is typically less than 0.05Ω.',
  },
  {
    question: 'How do I detect a spurious ring in a ring final circuit?',
    answer:
      'A spurious ring (or figure-of-eight interconnection) occurs when the two ends of a ring final circuit have been incorrectly connected — for example, the line of one cable end is connected to the neutral terminal of the other. It can also occur when an additional socket has been added mid-ring and the wiring has been incorrectly looped. To detect this, after measuring end-to-end resistance of the ring line (r1) and ring neutral (rn), cross-connect one end of the line to one end of the neutral at the consumer unit, then measure from the other line end to the other neutral end. For a genuine ring with equal cross-section conductors, the reading should be approximately r1/2 = rn/2. If the reading differs significantly from this, the ring may contain a figure-of-eight interconnection. BS 7671 Regulation 643.2 requires this cross-connection test to be performed on all ring final circuits.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/earth-fault-loop-impedance-testing',
    title: 'Earth Fault Loop Impedance Testing',
    description: 'How R1+R2 feeds into Zs calculations and the Appendix 3 table values.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing-bs7671',
    title: 'Insulation Resistance Testing',
    description:
      'Test voltages, minimum values, and live circuit precautions under Regulation 643.3.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates with test schedules on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete periodic inspection reports with continuity test records on site.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/polarity-testing-guide-bs7671',
    title: 'Polarity Testing Guide',
    description: 'Visual inspection first, live polarity checks, and Regulation 643.5.',
    icon: ClipboardCheck,
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
    heading: 'Why Continuity Testing Matters',
    content: (
      <>
        <p>
          Continuity testing is one of the first tests carried out on any electrical installation —
          new or existing — because it forms the foundation for calculating earth fault loop
          impedance (Zs) and verifying that the protective earthing system is intact. A broken or
          high-resistance protective conductor (CPC) means that exposed metalwork is not earthed,
          creating a shock hazard that may not be obvious during visual inspection.
        </p>
        <p>
          BS 7671:2018+A3:2024 Regulation 643.2 requires continuity testing of all ring final
          circuit conductors (to verify the ring is complete and correctly wired) and all protective
          conductors (to verify the CPC is continuous from the main earthing terminal to the
          furthest point of every circuit). The results of continuity testing are recorded on the
          schedule of test results, which forms part of the{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          or <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>.
        </p>
        <p>
          Continuity testing is carried out with the circuit dead and isolated. The test instrument
          injects a small current (typically less than 200mA) through the circuit and measures the
          resulting resistance. This is safe to carry out before the installation is energised,
          making it the first verification test on a new installation.
        </p>
      </>
    ),
  },
  {
    id: 'r1-r2',
    heading: 'R1+R2 Measurement',
    content: (
      <>
        <p>
          R1+R2 is measured at the furthest accessible point of each circuit by creating a temporary
          link between the line conductor and the CPC at that point, then measuring the resistance
          of the combined loop from the consumer unit.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">R1 — Line Conductor Resistance</h3>
            <p className="text-white text-sm leading-relaxed">
              The resistance of the line conductor from the MCB or fuse at the consumer unit to the
              furthest point of the circuit. For a 1.5mm² copper conductor at 20°C, resistance is
              approximately 12.1mΩ per metre. For 2.5mm², approximately 7.41mΩ per metre. The longer
              the circuit run and the smaller the conductor cross-section, the higher R1 will be.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">R2 — CPC Resistance</h3>
            <p className="text-white text-sm leading-relaxed">
              The resistance of the protective conductor (CPC) from the main earthing terminal to
              the furthest point of the circuit. Many domestic cables use a smaller CPC than the
              live conductors — for example, a 2.5mm²/1.5mm² twin-and-earth cable has a 1.5mm² CPC
              with a resistance of approximately 12.1mΩ per metre. Always check the CPC size when
              calculating expected R2 values.
            </p>
          </div>
        </div>
        <p>
          The measured R1+R2 is used to calculate the expected Zs: Zs = Ze + (R1+R2). Where the
          measured R1+R2, when added to the measured Ze, gives a Zs that exceeds the Appendix 3
          table maximum, the CPC or line conductor may need to be upsized, or the circuit length
          reduced by repositioning the distribution board.
        </p>
      </>
    ),
  },
  {
    id: 'ring-circuits',
    heading: 'Ring Circuit Testing — The r1+r2/4 Method',
    content: (
      <>
        <p>
          Ring final circuits require a more detailed continuity test than radial circuits because
          the ring configuration creates parallel paths that must be verified as genuinely forming a
          complete ring rather than a spurious figure-of-eight. The test involves three stages:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-none">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                1
              </span>
              <span>
                <strong>Measure end-to-end resistance</strong> — at the consumer unit, temporarily
                link the two line ends of the ring together. Measure from one end to the other with
                the tester — this gives r1. Repeat for the neutral (rn) and for the CPC (r2).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                2
              </span>
              <span>
                <strong>Cross-connect for spurious ring test</strong> — connect one line end to one
                neutral end at the board (cross-connect). Measure resistance from the remaining line
                end to the remaining neutral end. For a genuine ring with equal conductors, this
                should read approximately r1/2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                3
              </span>
              <span>
                <strong>Calculate maximum R1+R2</strong> — the maximum R1+R2 at any outlet on the
                ring is (r1+r2)/4. This is the value to add to Ze when checking compliance with the
                Appendix 3 table maximum Zs.
              </span>
            </li>
          </ol>
        </div>
        <p>
          The r1+r2/4 formula works because the worst case position is at the mid-point of the ring,
          where the resistance of each half of the ring is r1/2 and r2/2, and these halves are in
          parallel, giving an effective resistance of (r1/2 × r2/2) / (r1/2 + r2/2) which simplifies
          to r1×r2 / (2×(r1+r2)). For simplicity, when r1 equals r2, this approximates to r1/4 =
          r2/4, and the combined value is (r1+r2)/4.
        </p>
        <SEOAppBridge
          title="Record ring circuit test results on your phone"
          description="Elec-Mate's EIC app guides you through the ring circuit test procedure, calculates r1+r2/4, and records all values on the schedule of test results automatically."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'cpc-continuity',
    heading: 'CPC Continuity — Verifying the Earth Path',
    content: (
      <>
        <p>
          CPC continuity testing verifies that the protective conductor is electrically connected
          from the main earthing terminal to the furthest point of every circuit, and to every piece
          of exposed metalwork in the installation. Without a continuous earth path, the
          installation does not provide adequate protection against electric shock from indirect
          contact.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open circuit CPC</strong> — a reading of infinity (OL or overload display)
                indicates a broken or disconnected CPC. This is a C1 (danger present) observation on
                an EICR. The circuit must not be energised until the CPC is repaired.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High resistance CPC</strong> — a CPC resistance significantly higher than
                expected for the conductor cross-section and length indicates a poor connection or
                damaged conductor. Investigate and repair before energising.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main protective bonding</strong> — test from the main earthing terminal to
                each bonded service (gas, water, oil, structural steel). The resistance should
                typically be below 0.05Ω. Higher values may indicate a poor bonding connection or an
                excessively long bonding conductor.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'test-lead-resistance',
    heading: 'Test Lead Resistance — Why It Matters',
    content: (
      <>
        <p>
          Continuity test lead resistance can be a significant source of error, particularly for
          measurements below 1Ω. Standard test leads have a resistance of between 0.1Ω and 0.5Ω. For
          a circuit with an R2 of 0.5Ω, an unnulled lead resistance of 0.3Ω would produce a reading
          of 0.8Ω — 60% higher than the true value.
        </p>
        <p>Always null (zero) the test leads before taking measurements:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-3 text-white list-none">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                1
              </span>
              <span>Connect the test lead clips together firmly.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                2
              </span>
              <span>Press the null or zero button on the instrument.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                3
              </span>
              <span>
                Verify the display reads 0.00Ω (or close to it). If the instrument does not have a
                null function, note the lead resistance and subtract it manually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                4
              </span>
              <span>
                Repeat the null procedure if you change leads or if the leads have been moved
                significantly (temperature affects resistance).
              </span>
            </li>
          </ol>
        </div>
        <p>
          Use good-quality test leads with low resistance. For very low-resistance measurements
          (such as main bonding conductor continuity), Kelvin (four-wire) measurement eliminates
          lead resistance entirely — some professional continuity testers support this mode.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-643-2',
    heading: 'Regulation 643.2 Explained',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 Regulation 643.2 sets out the requirements for continuity testing.
          The regulation requires:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ring final circuit conductors</strong> — the continuity of every ring final
                circuit conductor (line, neutral, and CPC) must be verified, including a check that
                the ring is correctly connected and not forming a spurious ring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All protective conductors</strong> — the continuity of all protective
                conductors must be verified, including circuit protective conductors (CPCs), main
                protective bonding conductors, supplementary bonding conductors, and the earthing
                conductor connecting the main earthing terminal to the earth electrode or PME
                terminal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>R1+R2 recording</strong> — the measured R1+R2 (or r1+r2 and r2 for ring
                circuits) must be recorded on the schedule of test results. These values are used to
                verify Zs compliance by calculation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The schedule of test results on an EIC or EICR includes a dedicated column for R1+R2 (or
          r1+r2/4 for ring circuits), which must be completed for every circuit. The{' '}
          <SEOInternalLink href="/eic-certificate">Elec-Mate EIC app</SEOInternalLink> records
          these values and uses them to calculate Zs automatically.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Efficient Continuity Testing',
    content: (
      <>
        <p>
          Continuity testing on a large installation can be time-consuming. Here are practical tips
          to work efficiently:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Use Long Test Leads</h4>
                <p className="text-white text-sm leading-relaxed">
                  Invest in 25m to 50m test lead extensions. This allows you to measure R1+R2 at the
                  furthest socket outlet on a circuit from the consumer unit without needing a
                  second person or a temporary link at every test point. Null out the leads before
                  use.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Test Sequentially From the Board</h4>
                <p className="text-white text-sm leading-relaxed">
                  Work circuit by circuit from the consumer unit. Complete all continuity tests for
                  one circuit before moving to the next — this minimises walking between the board
                  and the circuit endpoints and keeps the test records organised.
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

export default function ContinuityTestingPage() {
  return (
    <GuideTemplate
      title="Continuity Testing Guide for Electricians | R1+R2 and Ring Circuits"
      description="Complete guide to continuity testing for UK electricians. Covers R1+R2 measurement, the r1+r2/4 method for ring final circuits, CPC continuity, test lead resistance, and BS 7671 Regulation 643.2."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Continuity Testing:{' '}
          <span className="text-yellow-400">R1+R2, Ring Circuits, and CPC Continuity</span>
        </>
      }
      heroSubtitle="A complete guide to continuity testing for UK electricians. Covers R1+R2 measurement, the r1+r2/4 ring circuit method, CPC continuity, test lead resistance, and what Regulation 643.2 requires."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Continuity Testing"
      relatedPages={relatedPages}
      ctaHeading="Record Continuity Test Results and Complete EICs on Your Phone"
      ctaSubheading="Elec-Mate records R1+R2 and r1+r2/4 values, calculates Zs automatically, and generates professional test schedules on site. Join 1,000+ UK electricians. 7-day free trial."
    />
  );
}
