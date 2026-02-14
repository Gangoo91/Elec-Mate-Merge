import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Clock,
  Shield,
  Zap,
  Activity,
  BookOpen,
  AlertTriangle,
  Timer,
  Network,
  Cable,
  FileCheck2,
  Gauge,
} from 'lucide-react';

export default function DisconnectionTimeCalculatorPage() {
  return (
    <ToolTemplate
      title="Disconnection Time Calculator | BS 7671 Free Tool"
      description="Calculate disconnection times for TN and TT earthing systems to BS 7671. Verify 0.4s and 5s rules, check protective device coordination, and confirm earth fault loop impedance compliance. Part of 50+ free electrical calculators."
      datePublished="2026-01-20"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Disconnection Time Calculator', href: '/tools/disconnection-time-calculator' },
      ]}
      tocItems={[
        { id: 'what-is-disconnection-time', label: 'What Is Disconnection Time?' },
        { id: 'bs7671-requirements', label: 'BS 7671 Requirements' },
        { id: 'tn-systems', label: 'TN System Disconnection' },
        { id: 'tt-systems', label: 'TT System Disconnection' },
        { id: 'protective-device-coordination', label: 'Protective Device Coordination' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="BS 7671 Compliant"
      badgeIcon={Shield}
      heroTitle={
        <>
          <span className="text-yellow-400">Disconnection Time Calculator</span> — Verify 0.4s and
          5s Rules to BS 7671
        </>
      }
      heroSubtitle="Check whether your protective devices will disconnect within the required time under earth fault conditions. Enter the earth fault loop impedance (Zs), select the protective device, and instantly verify compliance with BS 7671 Regulation 411 for both TN and TT systems."
      heroFeaturePills={[
        { icon: Clock, label: '0.4s & 5s Rules' },
        { icon: Shield, label: 'BS 7671 Compliant' },
        { icon: Network, label: 'TN & TT Systems' },
        { icon: Activity, label: 'Zs Verification' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'BS 7671 Regulation 411.3.2 requires disconnection within 0.4 seconds for final circuits rated up to 63A in TN systems, and 0.2 seconds for TT systems.',
        'Distribution circuits and circuits exceeding 63A are permitted a maximum disconnection time of 5 seconds in TN systems, provided all exposed-conductive-parts are connected within the same protective equipotential bonding system.',
        'The maximum permitted earth fault loop impedance (Zs) for each protective device and disconnection time is tabulated in BS 7671 Tables 41.2 to 41.6.',
        'TT systems rely on RCDs for disconnection because the earth fault loop impedance through the general mass of earth is too high for overcurrent devices alone.',
        'The Elec-Mate calculator checks Zs against tabulated maximums for your specific protective device type and rating, giving instant pass/fail results on site.',
      ]}
      sections={[
        {
          id: 'what-is-disconnection-time',
          heading: 'What Is Disconnection Time and Why Does It Matter?',
          content: (
            <>
              <p>
                Disconnection time is the maximum duration a protective device is permitted to take
                to disconnect the supply under earth fault conditions. When a live conductor comes
                into contact with exposed conductive parts (such as a metal appliance casing), fault
                current flows through the earth fault loop. The protective device must interrupt
                this current quickly enough to prevent a person receiving a lethal electric shock.
              </p>
              <p>
                BS 7671:2018+A3:2024 sets specific disconnection time limits based on the type of
                circuit and the{' '}
                <SEOInternalLink href="/guides/earthing-arrangements">
                  earthing system
                </SEOInternalLink>{' '}
                in use. The fundamental requirement comes from Regulation 411.3.2, which states that
                protective devices must disconnect the supply within the times specified in Table
                41.1. These times are derived from the IEC body current curves — the relationship
                between current magnitude, duration, and the likelihood of ventricular fibrillation.
              </p>
              <p>
                Getting disconnection time wrong has serious safety consequences. If a device takes
                too long to disconnect, anyone touching exposed metalwork during a fault could
                receive a sustained electric shock. The{' '}
                <SEOInternalLink href="/tools/earth-loop-impedance-calculator">
                  earth fault loop impedance
                </SEOInternalLink>{' '}
                determines the magnitude of fault current, and the protective device characteristics
                determine how quickly it disconnects at that current level. Both must be verified.
              </p>
            </>
          ),
          appBridge: {
            title: 'Verify Disconnection Times Instantly',
            description:
              'Enter your measured Zs value and select the protective device. The calculator checks against BS 7671 tables and gives a clear pass/fail result in seconds.',
            icon: Timer,
          },
        },
        {
          id: 'bs7671-requirements',
          heading: 'BS 7671 Disconnection Time Requirements',
          content: (
            <>
              <p>
                The maximum disconnection times are defined in BS 7671 Table 41.1 and depend on the
                nominal voltage and earthing system. For a 230V single-phase supply — the standard
                UK domestic supply — the requirements are:
              </p>
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">TN Systems — 0.4 seconds</p>
                      <p className="text-white text-sm">
                        For final circuits not exceeding 63A with one or more socket outlets, or for
                        final circuits supplying portable equipment intended to be held in the hand
                        during use.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">TN Systems — 5 seconds</p>
                      <p className="text-white text-sm">
                        For distribution circuits and circuits exceeding 63A. This longer time is
                        permitted because these circuits typically do not supply equipment that
                        people hold or touch directly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">TT Systems — 0.2 seconds</p>
                      <p className="text-white text-sm">
                        For final circuits not exceeding 63A. TT systems require faster
                        disconnection because touch voltages can exceed 50V more readily due to the
                        higher earth electrode resistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                These disconnection times apply to circuits where the protection against electric
                shock is provided by automatic disconnection of supply (ADS), which is the most
                common protective measure in UK installations. The{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                and disconnection time calculator work together to ensure both thermal protection
                and shock protection are satisfied.
              </p>
            </>
          ),
        },
        {
          id: 'tn-systems',
          heading: 'Disconnection in TN Systems (TN-S and TN-C-S)',
          content: (
            <>
              <p>
                In TN systems — which include TN-S (separate neutral and earth) and TN-C-S (PME /
                combined neutral and earth) — the earth fault return path is through the metallic
                sheath or PEN conductor back to the transformer. This provides a low-impedance fault
                loop, meaning relatively high fault currents flow during an earth fault.
              </p>
              <p>
                Because fault currents are high in TN systems, overcurrent protective devices (MCBs
                and fuses) can generally provide disconnection within the required times. The key is
                to verify that the actual earth fault loop impedance (Zs) at the furthest point of
                the circuit does not exceed the maximum value tabulated in BS 7671 for the specific
                protective device type and rating.
              </p>
              <p>
                For example, a 32A Type B MCB in a TN system requires a maximum Zs of 1.37 ohms to
                disconnect within 0.4 seconds (Table 41.3 of BS 7671). If the measured Zs at the
                furthest socket on the ring final circuit exceeds 1.37 ohms, the MCB will not trip
                quickly enough and the circuit fails the disconnection time test. You would need to
                either reduce the circuit impedance (shorter cables, larger CPC) or add
                supplementary protection such as an{' '}
                <SEOInternalLink href="/guides/rcd-testing">RCD</SEOInternalLink>.
              </p>
              <p>
                It is important to note that BS 7671 now requires 30mA RCD protection for all socket
                outlets rated up to 32A in domestic premises (Regulation 411.3.3), regardless of
                whether the overcurrent device meets the disconnection time on its own. The RCD
                provides additional protection against electric shock, particularly in cases where
                the fault current is too low to trip the overcurrent device promptly.
              </p>
            </>
          ),
        },
        {
          id: 'tt-systems',
          heading: 'Disconnection in TT Systems',
          content: (
            <>
              <p>
                TT earthing systems use a local earth electrode (typically an earth rod) for the
                installation's earth connection, with the fault return path running through the
                general mass of earth. The resistance of this earth path is significantly higher
                than in TN systems — typically between 10 and 200 ohms for the earth electrode
                alone.
              </p>
              <p>
                Because the earth fault loop impedance is so much higher in TT systems, the fault
                current is correspondingly lower. In most cases, the fault current in a TT system is
                insufficient to operate an MCB or fuse within the required disconnection time. This
                is why <SEOInternalLink href="/guides/rcd-testing">RCD protection</SEOInternalLink>{' '}
                is essential in TT installations — the RCD detects the imbalance between live and
                neutral caused by the earth fault current, and disconnects even when that current is
                relatively small.
              </p>
              <p>
                For a 30mA RCD to disconnect within 0.2 seconds in a TT system, BS 7671 Table 41.5
                requires the Zs to not exceed 1667 ohms (calculated as 50V / 0.03A). In practice,
                even the worst earth electrodes easily meet this requirement. The challenge in TT
                systems is not usually the Zs value but rather ensuring the RCD is correctly
                installed, functioning properly, and regularly tested.
              </p>
              <p>
                The Elec-Mate{' '}
                <SEOInternalLink href="/tools/electrical-testing-calculators">
                  electrical testing calculators
                </SEOInternalLink>{' '}
                include specific TT system verification, checking the earth electrode resistance
                (Ra), the total Zs, and confirming the RCD will operate within the required time.
              </p>
            </>
          ),
          appBridge: {
            title: 'TN and TT System Calculations Built In',
            description:
              'The disconnection time calculator handles both TN and TT earthing systems. Select your system type, enter Zs, and get instant BS 7671 compliance verification.',
            icon: Network,
          },
        },
        {
          id: 'protective-device-coordination',
          heading: 'Protective Device Coordination',
          content: (
            <>
              <p>
                Protective device coordination ensures that the correct device operates first during
                a fault — the device closest to the fault should disconnect before upstream devices.
                This is known as discrimination or selectivity. While discrimination is a separate
                topic from disconnection time, the two are closely related because both depend on
                the fault current magnitude and the device operating characteristics.
              </p>
              <p>
                The maximum permitted Zs values for common protective devices at 0.4 seconds
                disconnection time in TN systems are tabulated in BS 7671 as follows:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-2 text-white">
                  <li className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Type B MCB 6A:</strong> Zs max = 7.28 ohms
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Type B MCB 16A:</strong> Zs max = 2.73
                      ohms
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Type B MCB 32A:</strong> Zs max = 1.37
                      ohms
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Type C MCB 32A:</strong> Zs max = 0.68
                      ohms
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">BS 88 fuse 32A:</strong> Zs max = 1.09
                      ohms
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                When testing on site, you compare your measured Zs against these maximum values. The
                Elec-Mate calculator has all the tabulated values from Tables 41.2 through 41.6
                built in, so you do not need to carry the regulation book. Simply select the device
                type and rating, enter the measured Zs, and the calculator tells you whether the
                circuit passes or fails.
              </p>
              <p>
                The{' '}
                <SEOInternalLink href="/tools/prospective-fault-current-calculator">
                  prospective fault current calculator
                </SEOInternalLink>{' '}
                complements this tool by verifying that the prospective fault current does not
                exceed the breaking capacity of the protective device — another critical BS 7671
                requirement under Regulation 434.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Identify the earthing system',
          text: 'Determine whether the installation uses a TN-S, TN-C-S (PME), or TT earthing system. This affects the disconnection time requirements and the maximum permitted Zs values.',
        },
        {
          name: 'Determine the circuit type',
          text: 'Identify whether the circuit is a final circuit (up to 63A) or a distribution circuit. Final circuits with socket outlets require 0.4s in TN systems and 0.2s in TT systems. Distribution circuits allow 5 seconds.',
        },
        {
          name: 'Select the protective device',
          text: 'Note the type and rating of the protective device — for example, Type B MCB 32A, Type C MCB 20A, or BS 88 fuse 20A. Each device has a specific maximum Zs value for the required disconnection time.',
        },
        {
          name: 'Measure or calculate Zs',
          text: 'Measure the earth fault loop impedance at the furthest point of the circuit using a calibrated loop impedance tester. Alternatively, calculate Zs from Ze (external earth fault loop impedance) plus R1+R2 (circuit conductor impedances).',
        },
        {
          name: 'Compare against the BS 7671 maximum',
          text: 'Compare your measured Zs against the maximum value from the appropriate BS 7671 table. If Zs is less than or equal to the maximum, the disconnection time requirement is met. If it exceeds the maximum, corrective action is needed.',
        },
      ]}
      howToHeading="How to Verify Disconnection Time"
      howToDescription="Five steps to check whether your protective device meets the BS 7671 disconnection time requirements."
      features={[
        {
          icon: Calculator,
          title: 'Instant Zs Verification',
          description:
            'Enter the measured Zs and the protective device details. The calculator checks against BS 7671 Tables 41.2-41.6 and gives a clear pass/fail result.',
        },
        {
          icon: Shield,
          title: '0.4s and 5s Rule Checks',
          description:
            'Automatically applies the correct disconnection time requirement based on the circuit type — 0.4s for final circuits, 5s for distribution circuits in TN systems.',
        },
        {
          icon: Network,
          title: 'TN and TT System Support',
          description:
            'Handles both TN (TN-S, TN-C-S) and TT earthing systems with the correct disconnection time requirements and Zs limits for each.',
        },
        {
          icon: Activity,
          title: 'All Device Types Covered',
          description:
            'Includes maximum Zs values for Type B, C, and D MCBs, BS 88 fuses, BS 3036 fuses, and RCBOs at all standard current ratings.',
        },
        {
          icon: BookOpen,
          title: 'BS 7671:2018+A3:2024 Data',
          description:
            'All tabulated values are from the current edition of BS 7671 including Amendment 3 (2024). Verified against published regulation tables.',
        },
        {
          icon: Gauge,
          title: 'Works Offline on Site',
          description:
            'The calculator runs entirely on your device with no internet connection required. Verify disconnection times in meter cupboards, basements, and remote locations.',
        },
      ]}
      featuresHeading="Disconnection Time Calculator Features"
      featuresSubheading="Everything you need to verify disconnection times to BS 7671 on any job site."
      faqs={[
        {
          question: 'What is the 0.4 second rule in BS 7671?',
          answer:
            'The 0.4 second rule comes from BS 7671 Regulation 411.3.2 and Table 41.1. It requires that for final circuits in TN systems rated up to 63A — particularly circuits with socket outlets or supplying portable equipment — the protective device must disconnect the supply within 0.4 seconds under earth fault conditions. This time limit ensures that anyone touching exposed metalwork during a fault is not exposed to a dangerous voltage for long enough to cause ventricular fibrillation. The 0.4 second requirement applies at the nominal voltage of 230V.',
        },
        {
          question: 'When does the 5 second disconnection time apply?',
          answer:
            'The 5 second disconnection time applies to distribution circuits in TN systems — that is, circuits that feed sub-distribution boards rather than final equipment. It also applies to final circuits rated above 63A in TN systems. The rationale is that these circuits do not typically supply equipment that people touch or hold directly. However, the 5 second rule requires that all exposed conductive parts of the distribution circuit and the circuits it supplies are connected to the same equipotential bonding system. Regulation 411.3.2.3 permits this longer disconnection time.',
        },
        {
          question: 'How do I find the maximum Zs for my protective device?',
          answer:
            'The maximum Zs values are tabulated in BS 7671 Chapter 41. Table 41.2 covers Type B MCBs to BS EN 60898, Table 41.3 covers Type C MCBs, Table 41.4 covers Type D MCBs, Table 41.5 covers RCDs, and Table 41.6 covers BS 88-2.1 fuses and BS 88-3 fuses. Each table lists the maximum Zs for each current rating at both 0.4 second and 5 second disconnection times. The Elec-Mate disconnection time calculator has all these values built in — simply select the device type and rating to see the maximum Zs instantly.',
        },
        {
          question: 'Why do TT systems need faster disconnection than TN systems?',
          answer:
            'TT systems use a local earth electrode with a relatively high resistance path through the general mass of earth. This means that during an earth fault, the voltage on exposed metalwork (the touch voltage) rises more quickly and to a higher level than in TN systems, where the low-impedance metallic earth path keeps the voltage lower. To compensate for this higher touch voltage, BS 7671 requires faster disconnection — 0.2 seconds for final circuits in TT systems compared to 0.4 seconds in TN systems. In practice, 30mA RCDs are used in TT systems because overcurrent devices alone cannot provide sufficiently fast disconnection at the low fault currents typical of TT earth loops.',
        },
        {
          question: 'Can I use an RCD to achieve disconnection time compliance?',
          answer:
            'Yes. An RCD (residual current device) can provide disconnection within the required time regardless of the earth fault loop impedance, as long as Zs is low enough for the RCD operating current to flow. For a 30mA RCD, the maximum Zs is 1667 ohms (50V / 0.03A), which is virtually always met. This is why RCDs are essential in TT systems and are increasingly required in TN systems for socket outlets. BS 7671 Regulation 411.3.3 requires 30mA RCD protection for socket outlets up to 32A in domestic installations, providing a backup to the overcurrent device disconnection time.',
        },
        {
          question: 'What happens if my measured Zs exceeds the maximum?',
          answer:
            'If the measured earth fault loop impedance exceeds the maximum value for the protective device and required disconnection time, the circuit does not comply with BS 7671 Regulation 411. Corrective actions include: reducing the circuit length (which reduces R1+R2), increasing the cable or CPC size (which reduces conductor resistance), adding an RCD to provide disconnection at lower fault currents, changing the protective device to one with a lower Zs requirement (for example, changing from Type C to Type B MCB), or checking and improving the main earth connection to reduce Ze.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/earth-loop-impedance-calculator',
          title: 'Earth Loop Impedance Calculator',
          description:
            'Calculate Zs from Ze and R1+R2, or verify measured values against BS 7671 maximums.',
          icon: Activity,
          category: 'Calculators',
        },
        {
          href: '/tools/prospective-fault-current-calculator',
          title: 'Prospective Fault Current Calculator',
          description:
            'Verify PSCC does not exceed the breaking capacity of your protective devices.',
          icon: Zap,
          category: 'Calculators',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size cables to BS 7671 with automatic correction factors, voltage drop, and fault withstand checks.',
          icon: Cable,
          category: 'Calculators',
        },
        {
          href: '/guides/rcd-testing',
          title: 'RCD Testing Guide',
          description:
            'How to test RCDs on site including trip times, ramp tests, and BS 7671 pass criteria.',
          icon: Shield,
          category: 'Guides',
        },
        {
          href: '/guides/earthing-arrangements',
          title: 'Earthing Arrangements Explained',
          description:
            'TN-S, TN-C-S, and TT earthing systems explained with diagrams and fault loop paths.',
          icon: Network,
          category: 'Guides',
        },
        {
          href: '/tools/eicr-certificate',
          title: 'EICR Certificate',
          description:
            'Full EICR with AI board scanner, voice test entry, and automatic BS 7671 validation.',
          icon: FileCheck2,
          category: 'Certificates',
        },
      ]}
      ctaHeading="Verify disconnection times in seconds"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for BS 7671 compliance checks. 7-day free trial, cancel anytime."
      toolPath="/tools/disconnection-time-calculator"
    />
  );
}
