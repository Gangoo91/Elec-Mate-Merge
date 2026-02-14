import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Gauge,
  GraduationCap,
  BookOpen,
  Brain,
  ShieldCheck,
  Target,
  Award,
  FolderOpen,
  ClipboardCheck,
  Zap,
  AlertTriangle,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Testing Procedures', href: '/guides/testing-procedures-apprentices' },
];

const tocItems = [
  { id: 'why-testing-matters', label: 'Why Testing Matters' },
  { id: 'continuity-testing', label: 'Continuity Testing' },
  { id: 'insulation-resistance', label: 'Insulation Resistance Testing' },
  { id: 'polarity-testing', label: 'Polarity Testing' },
  { id: 'earth-loop-impedance', label: 'Earth Loop Impedance' },
  { id: 'rcd-testing', label: 'RCD Testing' },
  { id: 'testing-sequence', label: 'The Testing Sequence' },
  { id: 'common-mistakes', label: 'Common Testing Mistakes' },
  { id: 'elecmate-testing-tools', label: 'Practice with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Every electrical installation must be inspected and tested before it can be energised. Testing verifies that the installation is safe, compliant with BS 7671, and that protective devices will operate correctly under fault conditions.',
  'The five core tests every apprentice must master are: continuity of protective conductors (R1+R2), insulation resistance, polarity, earth fault loop impedance (Zs), and RCD operation.',
  'Dead tests (continuity and insulation resistance) must always be carried out before live tests (loop impedance and RCD). The supply must be isolated and proved dead before any dead testing.',
  'Understanding what each test measures and why it matters is more important than memorising pass/fail values. The AI tutor in Elec-Mate can explain the science behind every test.',
  'Elec-Mate provides flashcards, mock exams, and 46+ courses that cover testing procedures step by step, plus an EPA simulator that tests your ability to carry out the full testing sequence.',
];

const faqs = [
  {
    question: 'What is the correct sequence for electrical testing?',
    answer:
      'The testing sequence defined in BS 7671 (and detailed in Guidance Note 3: Inspection & Testing) follows a logical order from dead tests to live tests. The sequence is: 1) Continuity of protective conductors (R1+R2 and R2), 2) Continuity of ring circuit conductors, 3) Insulation resistance, 4) Polarity, 5) Earth electrode resistance (where applicable), 6) Prospective fault current (Ipf), 7) Earth fault loop impedance (Zs and Ze), 8) RCD operation (trip time and operating current), and 9) Functional testing. Dead tests (steps 1 to 4) are carried out with the supply isolated. Live tests (steps 6 to 9) are carried out with the supply energised. This sequence exists because each test builds on the results of the previous one. For example, you must verify continuity and insulation resistance before energising the circuit, because energising a circuit with an insulation fault could cause a dangerous short circuit.',
  },
  {
    question: 'What does a continuity test actually measure?',
    answer:
      'A continuity test measures the resistance of a conductor from one point to another, in ohms. For protective conductor continuity (R1+R2), you are measuring the total resistance of the phase conductor (R1) and the protective conductor (R2) in a circuit loop from the consumer unit, along the phase conductor to the furthest point on the circuit, and back along the protective conductor. This value is used to calculate the maximum earth fault loop impedance (Zs) at the furthest point. A low R1+R2 value means the protective conductor has a good, continuous path with low resistance, which ensures that enough fault current will flow to trip the protective device quickly in the event of an earth fault. High R1+R2 values suggest a poor connection, undersized conductor, or a break in the protective conductor, all of which compromise safety.',
  },
  {
    question: 'What insulation resistance values should I expect?',
    answer:
      'BS 7671 Table 61 specifies the minimum acceptable insulation resistance values based on the circuit voltage. For circuits operating at SELV and PELV (up to 50V AC), the minimum is 0.5 megohms. For circuits up to 500V (which covers most domestic and commercial installations at 230V), the minimum is 1.0 megohms. For circuits above 500V, the minimum is 1.0 megohms. However, the test voltage applied depends on the circuit: 250V DC for SELV/PELV circuits, 500V DC for circuits up to 500V, and 1000V DC for circuits above 500V. In practice, a healthy domestic circuit typically reads well above the minimum — often 200 megohms or higher. A reading close to the minimum (for example, 2 megohms) suggests degraded insulation that may worsen over time. Very low readings indicate a fault that must be investigated before the circuit can be energised.',
  },
  {
    question: 'Why do I need to test RCDs and what values should I get?',
    answer:
      'RCDs (Residual Current Devices) are life-saving protective devices that detect earth leakage current and disconnect the circuit before the current reaches a dangerous level. Testing verifies that the RCD operates within the required time and at the correct current. For a 30mA RCD (the most common type in domestic installations), the RCD must trip within 300ms at the rated residual current (30mA) and within 40ms at 5 times the rated current (150mA). At half the rated current (15mA), the RCD must not trip. These values are set by BS EN 61008 and BS EN 61009. Testing is carried out using the RCD test function on your multifunction tester, which injects a controlled test current through the RCD and measures the trip time. Fast trip times (typically under 20ms at 5x) indicate a healthy RCD. Slow or inconsistent trip times suggest the RCD mechanism is wearing or contaminated and may need replacement.',
  },
  {
    question: 'What happens if I get a failed test result?',
    answer:
      'A failed test result means the circuit does not meet the requirements of BS 7671 and must be investigated before it can be energised or certified as satisfactory. The response depends on which test failed. A failed continuity test (high R1+R2 or open circuit) suggests a loose connection, broken conductor, or missing earth. Check all terminations and connections in the circuit. A failed insulation resistance test (below 1.0 megohms for 230V circuits) suggests damaged cable, moisture ingress, or a faulty accessory. Disconnect accessories one at a time to isolate the fault. A failed earth loop impedance test (Zs exceeds the maximum for the protective device) means the protective device may not trip quickly enough under fault conditions. Check the earth path and consider using a device with a higher breaking capacity or lower rating. A failed RCD test means the RCD is faulty and must be replaced. Never energise a circuit that has failed any test until the fault is identified and corrected.',
  },
  {
    question: 'Do I need to understand the theory behind each test or just know how to do it?',
    answer:
      'You need both, and the EPA professional discussion will test your theoretical understanding as much as your practical ability. Knowing how to connect the test leads and press the button is not enough. The EPAO assessor will ask questions like: "Why do we carry out insulation resistance testing before energising the circuit?" or "What would happen if the R1+R2 value was excessively high?" or "Why is the RCD tested at both 1x and 5x the rated current?" If you understand the electrical principles behind each test (Ohm\'s law, fault current path, prospective fault current, disconnection times), you can answer any question the assessor throws at you. If you have only memorised the procedure, you will struggle. Elec-Mate\'s courses teach the theory and the practice together, so you understand why each test matters, not just how to perform it.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step safe isolation procedure that must be completed before any dead testing.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-test',
    title: 'Insulation Resistance Testing',
    description: 'Detailed guide to insulation resistance testing with worked examples.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/continuity-testing-r1-r2',
    title: 'Continuity Testing R1+R2',
    description: 'How to perform continuity of protective conductors testing correctly.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description: 'Complete guide to RCD testing procedures and acceptable values.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/calculations-for-apprentices',
    title: 'Calculations for Apprentices',
    description: "Ohm's law, power triangle, voltage drop, and other calculations in simple terms.",
    icon: Brain,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-toolbox-guide',
    title: 'Apprentice Toolbox Guide',
    description: 'Essential tools including test equipment for electrical apprentices.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-testing-matters',
    heading: 'Why Testing Matters: The Foundation of Electrical Safety',
    content: (
      <>
        <p>
          Testing is not just something you do at the end of an installation to tick a box. It is
          the process that verifies your installation is safe. Every cable connection, every
          protective device, every earthing arrangement must be tested to confirm it will perform
          correctly under both normal and fault conditions.
        </p>
        <p>
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A2:2022
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations, 18th Edition) requires that every new installation,
          alteration, and addition is inspected and tested before it can be connected to the supply.
          The results are recorded on an Electrical Installation Certificate (EIC) for new work or a
          Minor Works Certificate for small jobs. Periodic inspection and testing of existing
          installations is recorded on an EICR.
        </p>
        <p>
          As an apprentice, you will learn testing progressively throughout your programme. By the
          time you sit your C&G 2391 (Inspection and Testing) qualification and face the{' '}
          <SEOInternalLink href="/guides/apprentice-assessment-guide">EPA</SEOInternalLink>, you
          must be able to carry out the full testing sequence confidently and accurately. This guide
          explains each test in apprentice-friendly language so you understand what you are doing
          and why.
        </p>
      </>
    ),
  },
  {
    id: 'continuity-testing',
    heading: 'Continuity Testing: Is the Path Complete?',
    content: (
      <>
        <p>
          Continuity testing checks that a conductor provides a continuous, low-resistance path from
          one end to the other. If there is a break, loose connection, or high-resistance joint, the
          continuity test will find it.
        </p>
        <p>The two main continuity tests you will carry out are:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>R1+R2 (protective conductor continuity)</strong> — measures the combined
                resistance of the phase conductor (R1) and the circuit protective conductor (R2)
                from the consumer unit to the furthest point on the circuit. You link the phase and
                earth at the consumer unit and measure at the furthest socket or accessory. A low
                reading (typically under 1 ohm for domestic circuits) confirms a good earth path.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ring circuit continuity</strong> — for ring circuits, you must verify that
                the ring is complete (no breaks or interconnections) by measuring the end-to-end
                resistance of each conductor (L-L, N-N, E-E) and then cross-connecting and measuring
                at each socket. The readings at each socket should be approximately the same. Large
                variations indicate a break or a spur wired incorrectly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Continuity testing is a dead test. The circuit must be{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">
            isolated and proved dead
          </SEOInternalLink>{' '}
          before you connect your test instrument. Your multifunction tester applies a small DC
          voltage (typically 4 to 24V) to measure the resistance.
        </p>
        <p>
          Remember to null your test leads before taking readings. Connect the leads together, read
          the lead resistance (typically 0.2 to 0.5 ohms), and subtract this from every reading.
          Most modern MFTs have an auto-null function.
        </p>
      </>
    ),
  },
  {
    id: 'insulation-resistance',
    heading: 'Insulation Resistance Testing: Is the Insulation Intact?',
    content: (
      <>
        <p>
          Insulation resistance testing checks that the insulation on cables and equipment is intact
          and provides adequate separation between live conductors and earth. If insulation is
          damaged, degraded, or contaminated with moisture, current can leak to earth, creating a
          shock hazard and a fire risk.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test voltage</strong> — for 230V circuits (the vast majority of domestic
                work), you apply 500V DC from your MFT. This is higher than the working voltage to
                stress-test the insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum value</strong> — BS 7671 Table 61 requires a minimum of 1.0 megohms
                for circuits up to 500V. In practice, a healthy circuit reads 200 megohms or more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What to test</strong> — test between phase and earth (L-E), neutral and
                earth (N-E), and phase and neutral (L-N). All three readings must exceed the minimum
                value.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong>Important:</strong> Disconnect all electronic equipment, surge protectors, LED
              drivers, and sensitive devices before performing insulation resistance testing. The
              500V DC test voltage can damage electronics. Also disconnect smoke alarm bases, dimmer
              switches, and any device with semiconductor components.
            </p>
          </div>
        </div>
        <p>
          If you get a low reading, systematically disconnect accessories and sections of the
          circuit to isolate the fault. The most common causes of low insulation resistance are
          damaged cable (nicked by a nail or screw), moisture in junction boxes, and faulty
          accessories.
        </p>
      </>
    ),
  },
  {
    id: 'polarity-testing',
    heading: 'Polarity Testing: Are the Connections Correct?',
    content: (
      <>
        <p>
          Polarity testing confirms that the phase (live), neutral, and earth conductors are
          connected to the correct terminals throughout the installation. Incorrect polarity can be
          dangerous: a switch that breaks the neutral instead of the phase leaves the circuit live
          even when switched off.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-pole switches</strong> — must be connected in the phase conductor
                only. If a switch breaks the neutral, the lamp or appliance remains connected to the
                phase even when switched off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlets</strong> — the phase conductor must be connected to the right
                pin (when viewed from the front), neutral to the left pin, and earth to the top pin.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Edison-screw lampholders</strong> — the phase conductor must be connected to
                the centre contact, not the outer screw thread. This prevents a person touching the
                screw thread from contacting the phase.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Polarity can be verified as part of the continuity test (the R1+R2 test inherently checks
          polarity at each point) or by using a socket tester or your MFT. At every accessory,
          verify that the conductors are correctly connected before signing off the installation.
        </p>
      </>
    ),
  },
  {
    id: 'earth-loop-impedance',
    heading: 'Earth Fault Loop Impedance: Will the Protection Work?',
    content: (
      <>
        <p>
          Earth fault loop impedance (Zs) is arguably the most important test you will carry out. It
          answers one critical question: if an earth fault occurs on this circuit, will enough fault
          current flow to trip the protective device quickly enough to prevent electric shock?
        </p>
        <p>
          The earth fault loop is the complete path that fault current follows: from the transformer
          (source), along the phase conductor, through the fault, back along the protective
          conductor and earthing arrangement to the transformer neutral. The total impedance
          (resistance) of this loop determines how much fault current will flow.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zs = Ze + (R1+R2)</strong> — the earth fault loop impedance at a point
                equals the external earth fault loop impedance (Ze, from the supply) plus the
                internal impedance of the circuit conductors (R1+R2). This is why the continuity
                test matters: the R1+R2 value feeds directly into the Zs calculation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum Zs values</strong> — BS 7671 Table 41.3 lists the maximum Zs values
                for different protective devices and ratings. For a 32A Type B MCB (common for ring
                circuits), the maximum Zs is 1.37 ohms. If the measured Zs exceeds this value, the
                circuit fails and the protective arrangement must be improved.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temperature correction</strong> — Zs is measured at ambient temperature, but
                conductor resistance increases when the circuit is carrying load. Apply a correction
                factor (multiply the measured R1+R2 by the appropriate factor from BS 7671 or GN3)
                to calculate the worst-case Zs at operating temperature.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Earth fault loop impedance is a live test. The circuit must be energised, and you must use
          GS38-compliant test leads. Take care when connecting the instrument, and ensure the
          installation has passed all dead tests before energising.
        </p>
        <SEOAppBridge
          title="Understand Zs with the AI tutor"
          description="Struggling with earth fault loop impedance? Ask the Elec-Mate AI tutor. Get step-by-step explanations with worked examples, regulation references, and maximum Zs tables. Available 24/7 on your phone."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'rcd-testing',
    heading: 'RCD Testing: Verifying Life-Saving Protection',
    content: (
      <>
        <p>
          Residual Current Devices (RCDs) are designed to protect against electric shock by
          detecting an imbalance between the phase and neutral currents. If current is leaking to
          earth (through a person or a fault), the RCD detects the imbalance and disconnects the
          circuit within milliseconds.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test at rated current (1x)</strong> — inject 30mA through the RCD. It must
                trip within 300ms. If it does not trip, or trips too slowly, the RCD is faulty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test at 5 times rated current (5x)</strong> — inject 150mA through a 30mA
                RCD. It must trip within 40ms. This faster trip time is required to provide
                protection against electric shock at higher fault currents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test at half rated current (0.5x)</strong> — inject 15mA through a 30mA RCD.
                It must NOT trip. This confirms the RCD is not over-sensitive, which would cause
                nuisance tripping during normal use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test button</strong> — the RCD test button on the device itself should be
                pressed after instrument testing to confirm the mechanical trip mechanism works.
                This is a functional test, not an instrument test.
              </span>
            </li>
          </ul>
        </div>
        <p>
          RCD testing is a live test. The circuit is energised, and the RCD will trip during
          testing, disconnecting the supply to all circuits protected by that RCD. Warn the customer
          before testing, and check that any sensitive equipment (computers, servers, medical
          devices) is protected or disconnected.
        </p>
      </>
    ),
  },
  {
    id: 'testing-sequence',
    heading: 'The Testing Sequence: Getting the Order Right',
    content: (
      <>
        <p>
          The testing sequence defined in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> and
          Guidance Note 3 (GN3) follows a specific order. This is not arbitrary; each test builds on
          the previous one, and carrying them out of sequence can give misleading results or create
          safety hazards.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Safe isolation</strong> — isolate the circuit, lock off, and prove dead using
              a two-pole voltage indicator tested with a proving unit.
            </li>
            <li>
              <strong>Continuity of protective conductors (R1+R2)</strong> — confirm the earth path
              is continuous and low-resistance.
            </li>
            <li>
              <strong>Continuity of ring circuit conductors</strong> — for ring circuits only,
              verify the ring is complete with no breaks or interconnections.
            </li>
            <li>
              <strong>Insulation resistance</strong> — confirm the insulation is intact between all
              conductors and earth.
            </li>
            <li>
              <strong>Polarity</strong> — confirm all connections are correct (phase in the right
              place at every accessory).
            </li>
            <li>
              <strong>Energise the circuit</strong> — only after all dead tests pass.
            </li>
            <li>
              <strong>Earth fault loop impedance (Zs)</strong> — confirm the Zs value is within the
              maximum for the protective device.
            </li>
            <li>
              <strong>Prospective fault current (Ipf)</strong> — measure or calculate the maximum
              fault current to confirm the protective device can safely interrupt it.
            </li>
            <li>
              <strong>RCD operation</strong> — confirm the RCD trips within the required times at
              1x, 5x, and does not trip at 0.5x.
            </li>
            <li>
              <strong>Functional testing</strong> — check all switches, controls, and interlocks
              operate correctly.
            </li>
          </ol>
        </div>
        <p>
          Learning this sequence by heart is essential for the C&G 2391 exam, the AM2, and the EPA.
          Practice it repeatedly until it becomes second nature.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Testing Mistakes Apprentices Make',
    content: (
      <>
        <p>
          These mistakes are common during training and can cost marks in the{' '}
          <SEOInternalLink href="/guides/am2-exam-tips">AM2</SEOInternalLink> or EPA. Learn to avoid
          them now.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Forgetting to null test leads</strong> — if you do not subtract the lead
                resistance, every continuity reading will be higher than the true value. This could
                cause a circuit to appear to fail when it actually passes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not disconnecting electronics before IR testing</strong> — applying 500V DC
                to a circuit with LED drivers, dimmers, or electronic devices still connected can
                damage them and give false low readings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing in the wrong sequence</strong> — carrying out live tests before dead
                tests is dangerous and can produce unreliable results. Follow the sequence every
                time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recording results incorrectly</strong> — writing down the wrong units
                (megohms vs ohms), transposing digits, or recording results at the wrong point in
                the schedule. Double-check every entry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not applying temperature correction to Zs</strong> — measured Zs values at
                ambient temperature will be lower than the value at operating temperature. If you do
                not apply the correction factor, a circuit might appear to pass when it actually
                exceeds the maximum Zs at full load.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'elecmate-testing-tools',
    heading: 'Practice Testing with Elec-Mate',
    content: (
      <>
        <p>
          Understanding testing procedures is one of the most challenging parts of the electrical
          apprenticeship. Elec-Mate provides multiple tools to help you master every test.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">46+ Courses with Testing Modules</h4>
                <p className="text-white text-sm leading-relaxed">
                  Dedicated courses covering each test in detail: what it measures, how to connect
                  the instrument, how to interpret results, and what BS 7671 requires. Theory and
                  practice combined.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Flashcards for Testing Values</h4>
                <p className="text-white text-sm leading-relaxed">
                  Memorise minimum insulation resistance values, maximum Zs values for common MCBs,
                  RCD trip times, and test voltages. Quick-fire revision sessions you can do on the
                  bus or during a break.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EPA Simulator</h4>
                <p className="text-white text-sm leading-relaxed">
                  The EPA simulator includes testing scenarios where you must carry out the correct
                  testing sequence, interpret results, and complete the schedule of test results
                  accurately. AI-powered feedback identifies areas for improvement.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Tutor</h4>
                <p className="text-white text-sm leading-relaxed">
                  Ask any question about testing: "What is the maximum Zs for a 20A Type B MCB?",
                  "Why is insulation resistance tested at 500V?", "How do I test a ring circuit for
                  continuity?" Get instant, accurate answers with BS 7671 references.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Master testing procedures with Elec-Mate"
          description="46+ courses, flashcards, mock exams, EPA simulator, and AI tutor covering every test in the apprenticeship standard. Build confidence before you pick up the test leads. 7-day free trial."
          icon={Gauge}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Year2ElectricalApprenticePage() {
  return (
    <GuideTemplate
      title="Testing Procedures for Apprentices | Beginner Guide"
      description="Beginner-friendly guide to electrical testing procedures for UK apprentices. Continuity, insulation resistance, polarity, earth loop impedance, and RCD testing explained step by step in simple terms."
      datePublished="2025-10-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Testing Procedures for Apprentices:{' '}
          <span className="text-yellow-400">Every Test Explained in Plain English</span>
        </>
      }
      heroSubtitle="Testing is the skill that separates a competent electrician from someone who just wires things up. This guide explains every core test — continuity, insulation resistance, polarity, earth loop impedance, and RCD — in apprentice-friendly language with no jargon left unexplained."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Testing Procedures"
      relatedPages={relatedPages}
      ctaHeading="Learn Testing Step by Step"
      ctaSubheading="Elec-Mate's apprentice hub covers every testing procedure in the apprenticeship standard. 46+ courses, flashcards, mock exams, EPA simulator, and AI tutor. Master the tests before the exams. 7-day free trial."
    />
  );
}
