import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Cable,
  BookOpen,
  Activity,
  Gauge,
  ClipboardCheck,
  Search,
  Eye,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Polarity Testing Guide', href: '/guides/polarity-testing-guide' },
];

const tocItems = [
  { id: 'why-polarity-matters', label: 'Why Polarity Matters' },
  { id: 'what-is-polarity', label: 'What Is Polarity?' },
  { id: 'methods-of-verification', label: 'Methods of Verification' },
  { id: 'visual-inspection', label: 'Visual Inspection' },
  { id: 'continuity-method', label: 'Continuity Method' },
  { id: 'instrument-method', label: 'Instrument Testing' },
  { id: 'when-required', label: 'When Polarity Testing Is Required' },
  { id: 'common-faults', label: 'Common Polarity Faults' },
  { id: 'recording-results', label: 'Recording Results' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Guides' },
];

const keyTakeaways = [
  'Polarity verification confirms that line, neutral, and earth conductors are correctly connected at every point in the installation. Reversed polarity can leave equipment energised when apparently switched off, creating a lethal shock risk.',
  'BS 7671 Regulation 612.6 requires polarity to be verified on every circuit during initial verification — including every single-pole switching device, every socket outlet, every connection to the consumer unit, and every centre-contact lamp holder.',
  'Polarity is verified by continuity testing during dead testing (GN3 sequence). A dedicated polarity test using a continuity instrument confirms that the line conductor is connected to the correct terminal at every accessory.',
  'Common polarity faults include crossed line and neutral at a socket outlet, line connected to the neutral terminal of a single-pole switch, and reversed connections at the consumer unit busbar or RCBO.',
  'Elec-Mate schedule of test results captures polarity verification for every circuit. The app flags any circuit where polarity is not confirmed as a deficiency requiring immediate attention.',
];

const faqs = [
  {
    question: 'What is polarity in electrical installations?',
    answer:
      'Polarity in electrical installations refers to the correct connection of line (brown), neutral (blue), and earth (green/yellow) conductors at every point in the circuit. Correct polarity ensures that single-pole switching devices break the line conductor (not the neutral), that socket outlets have the line conductor connected to the correct terminal, and that centre-contact lamp holders have the line connected to the centre contact rather than the outer screw shell. If polarity is reversed, equipment that appears to be switched off may still have a live conductor connected to accessible parts, creating a serious electric shock risk. BS 7671 Regulation 612.6 requires verification of polarity during initial verification of every new installation and alteration.',
  },
  {
    question: 'How do you test polarity on a socket outlet?',
    answer:
      'Polarity at a socket outlet is verified during dead testing as part of the continuity test. With the supply isolated and proved dead, connect one lead of your continuity instrument to the line busbar or line terminal at the consumer unit. Then test the line terminal of each socket outlet in the circuit — the instrument should show a low-resistance reading confirming continuity between the consumer unit line terminal and the socket line terminal. Repeat for the neutral conductor. If the readings are reversed (line at the consumer unit shows continuity to the neutral terminal at the socket), polarity is reversed. You can also use a plug-in socket tester for a quick live check, but this does not replace the dead test required by GN3 for initial verification.',
  },
  {
    question: 'What are the consequences of reversed polarity?',
    answer:
      'Reversed polarity means the neutral conductor is being switched instead of the line conductor, or the line and neutral are swapped at an accessory. The consequences are severe. A light fitting with reversed polarity will have the lamp holder shell energised even when the switch is off — anyone changing a bulb could receive a fatal electric shock. A socket outlet with reversed polarity may cause equipment to malfunction or present a shock risk. Single-pole switches that break the neutral instead of the line leave the circuit live even when the switch is in the off position. Reversed polarity is classified as a C1 (danger present) or C2 (potentially dangerous) observation on an EICR, requiring immediate remedial action.',
  },
  {
    question: 'Is polarity testing part of the dead tests or live tests?',
    answer:
      'Polarity verification is performed during dead testing, specifically as part of the continuity of protective conductors and ring final circuit tests. According to GN3 (Guidance Note 3: Inspection and Testing), the correct testing sequence places polarity verification within the dead testing phase. By using the continuity instrument connected between the line terminal at the consumer unit and the line terminal at each accessory, you simultaneously verify continuity and polarity. This is more reliable than live testing with a socket tester because it tests every connection point, not just the socket face. Live polarity verification using a voltage indicator or socket tester can be used as an additional confirmation but is not a substitute for the dead test.',
  },
  {
    question: 'Can a plug-in socket tester replace proper polarity testing?',
    answer:
      'No. A plug-in socket tester provides a quick indication of polarity at socket outlets only, and it has significant limitations. It cannot detect all fault conditions — for example, it cannot identify a crossed earth and neutral, and it does not test polarity at lighting points, switches, or junction boxes. BS 7671 and GN3 require polarity to be verified by continuity testing during the dead testing phase of initial verification. A socket tester is useful as a quick supplementary check during periodic inspection but must never replace the full continuity-based polarity verification required for initial verification or for completing the schedule of test results on an EIC or EICR.',
  },
  {
    question: 'How is polarity recorded on the schedule of test results?',
    answer:
      'On the schedule of test results (part of an EIC or EICR), polarity is recorded with a tick or check mark to confirm correct polarity for each circuit. GN3 requires the electrician to confirm that polarity has been verified at every point in the circuit — not just at one accessory. If polarity is incorrect, this is recorded as an observation with an appropriate code: C1 if the reversed polarity creates an immediate danger (such as at a lamp holder), C2 if it is potentially dangerous, or C3 if it is a minor departure that does not create an immediate risk. Elec-Mate auto-populates the polarity column in the schedule of test results and flags any circuit where polarity has not been confirmed.',
  },
];

const relatedPages = [
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence BS 7671',
    description: 'The correct dead and live testing order per GN3.',
    icon: ClipboardCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/continuity-testing-r1-r2',
    title: 'Continuity Testing R1+R2',
    description: 'Long lead method, ring circuit testing, and acceptable values.',
    icon: Gauge,
    category: 'Guide' as const,
  },
  {
    href: '/guides/dead-vs-live-testing',
    title: 'Dead vs Live Testing',
    description: 'When to test dead and when to test live under BS 7671.',
    icon: Zap,
    category: 'Guide' as const,
  },
  {
    href: '/guides/initial-verification-guide',
    title: 'Initial Verification Guide',
    description: 'Complete guide to initial verification for new installations.',
    icon: FileCheck2,
    category: 'Guide' as const,
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Certificate Guide',
    description: 'How to complete an EICR with correct observations and codes.',
    icon: FileCheck2,
    category: 'Certificate' as const,
  },
  {
    href: '/guides/wiring-colours-uk',
    title: 'Wiring Colours UK',
    description: 'Current and old UK wiring colours for identification.',
    icon: Cable,
    category: 'Guide' as const,
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-polarity-matters',
    heading: 'Why Polarity Matters',
    content: (
      <>
        <p>
          Correct polarity is fundamental to electrical safety. Every single-pole switching device
          in an installation must break the line conductor — not the neutral. If the neutral is
          broken instead, the circuit appears to be switched off but the line conductor remains
          energised throughout the circuit. Anyone touching an exposed conductor, changing a lamp,
          or working on an accessory while relying on the switch for isolation could receive a fatal
          electric shock.
        </p>
        <p>
          BS 7671 Regulation 132.14.1 requires that single-pole switching devices shall be connected
          in the line conductor only. Regulation 612.6 requires verification of polarity during
          initial verification. These are not optional checks — they are mandatory requirements that
          exist because reversed polarity has directly caused fatalities in the UK.
        </p>
        <p>
          Polarity faults are more common than many electricians realise. They can occur through
          simple wiring errors during installation, through modifications by unqualified persons, or
          through deterioration of connections over time. During an{' '}
          <SEOInternalLink href="/guides/eicr-certificate">EICR inspection</SEOInternalLink>,
          finding reversed polarity is one of the most serious defects that can be identified. It is
          typically classified as C1 (danger present) or C2 (potentially dangerous) depending on the
          specific circumstances.
        </p>
      </>
    ),
  },
  {
    id: 'what-is-polarity',
    heading: 'What Is Polarity?',
    content: (
      <>
        <p>
          In a single-phase AC supply, polarity refers to the identification and correct connection
          of the line conductor, neutral conductor, and protective earth conductor. Each conductor
          has a specific function and must be connected to the correct terminal at every point in
          the circuit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Conductor Functions</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Line (Brown):</strong> The conductor that
                carries current from the supply to the load. This conductor is at mains potential
                (230V AC) relative to earth. All single-pole switching devices must be connected in
                this conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Neutral (Blue):</strong> The return path for
                current from the load back to the supply transformer. Under normal conditions, the
                neutral is at or near earth potential. It must not be switched by single-pole
                devices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Earth (Green/Yellow):</strong> The protective
                conductor that provides a path for fault current to flow back to the source,
                enabling the protective device to operate and disconnect the supply. It must be
                connected to the earthing terminal of every accessory.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When we verify polarity, we are confirming that the brown conductor from the consumer unit
          line busbar is connected to the line terminal at every accessory, that the blue conductor
          is connected to the neutral terminal, and that the green/yellow conductor is connected to
          the earth terminal. We are also confirming that single-pole switches break the line
          (brown) conductor and that{' '}
          <SEOInternalLink href="/guides/cable-colour-codes-uk">
            correctly coloured conductors
          </SEOInternalLink>{' '}
          are used throughout.
        </p>
      </>
    ),
  },
  {
    id: 'methods-of-verification',
    heading: 'Methods of Polarity Verification',
    content: (
      <>
        <p>
          There are three methods of verifying polarity, and they should be used in combination
          during a thorough inspection and test. The primary method for initial verification is the
          continuity test, supplemented by visual inspection and instrument testing.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <Eye className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white text-lg mb-2">Visual Inspection</h3>
            <p className="text-white text-sm leading-relaxed">
              Check conductor colours at every accessible termination point. Confirm that brown
              connects to line, blue to neutral, and green/yellow to earth. Check for signs of
              modification or incorrect identification sleeves.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Gauge className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white text-lg mb-2">Continuity Method</h3>
            <p className="text-white text-sm leading-relaxed">
              Use a low-resistance ohmmeter to confirm continuity between the line terminal at the
              consumer unit and the line terminal at each accessory. This is the primary method for
              dead testing and initial verification.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Activity className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white text-lg mb-2">Instrument Testing</h3>
            <p className="text-white text-sm leading-relaxed">
              Use a voltage indicator or approved test lamp (GS38 compliant) to confirm live
              polarity at socket outlets and other accessible points. Plug-in socket testers provide
              a quick live indication.
            </p>
          </div>
        </div>
        <p>
          For{' '}
          <SEOInternalLink href="/guides/initial-verification-guide">
            initial verification
          </SEOInternalLink>{' '}
          of a new installation, the continuity method is mandatory. Visual inspection and
          instrument testing supplement but do not replace the continuity test. For periodic
          inspection (EICR), a combination of methods is used depending on the accessibility of
          terminations and the scope of the inspection.
        </p>
      </>
    ),
  },
  {
    id: 'visual-inspection',
    heading: 'Visual Inspection for Polarity',
    content: (
      <>
        <p>
          Visual inspection is the first step in polarity verification. Before any instruments are
          connected, the electrician should visually inspect every accessible termination point to
          confirm that conductor colours match their intended function.
        </p>
        <p>
          At the consumer unit, confirm that brown conductors are connected to the line busbars and
          outgoing line terminals of MCBs or RCBOs. Blue conductors should connect to the neutral
          bar. Green/yellow conductors should connect to the earth bar. Check that no conductors are
          incorrectly identified — for example, a blue conductor used as a switch wire without brown
          sleeving.
        </p>
        <p>
          At each accessory (socket outlet, switch, light fitting, junction box), visually confirm
          that conductor colours are correctly terminated. Pay particular attention to{' '}
          <SEOInternalLink href="/guides/wiring-colours-uk">older installations</SEOInternalLink>{' '}
          where the pre-2004 colour code was used (red for line, black for neutral). In switch
          drops, the black conductor may be used as a switched line and should be sleeved brown — if
          this sleeving is missing, it is a polarity-related defect.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Old Colour Codes and Polarity</h4>
              <p className="text-white text-sm leading-relaxed">
                In installations using the pre-2004 colour code, red is line and black is neutral.
                In two-way switching circuits, the black conductor used as a switch wire should be
                sleeved with brown sleeving to indicate it is being used as a line conductor.
                Missing sleeves are a common finding during EICRs and represent a polarity
                identification issue.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'continuity-method',
    heading: 'Continuity Method for Polarity Verification',
    content: (
      <>
        <p>
          The continuity method is the definitive test for polarity during dead testing. It uses a
          low-resistance ohmmeter (the continuity function on your{' '}
          <SEOInternalLink href="/guides/multifunction-tester-guide">
            multifunction tester
          </SEOInternalLink>
          ) to confirm that the line conductor at the consumer unit is connected to the line
          terminal at every accessory in the circuit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Step-by-Step Procedure</h3>
          <ol className="space-y-3 text-white list-decimal list-inside">
            <li>
              <strong>Isolate the circuit</strong> — switch off the MCB or RCBO for the circuit
              under test and lock off if possible. Prove dead at the point of work using an approved
              voltage indicator.
            </li>
            <li>
              <strong>Connect the long lead</strong> — connect one lead of the continuity instrument
              to the line terminal of the MCB or RCBO at the consumer unit (or to the line busbar if
              more convenient).
            </li>
            <li>
              <strong>Test at each accessory</strong> — at each socket outlet, switch, or light
              fitting on the circuit, touch the other lead to the line terminal. A low-resistance
              reading (typically less than 1 ohm for domestic circuits) confirms that the line
              conductor is correctly connected from the consumer unit to that accessory.
            </li>
            <li>
              <strong>Verify the neutral</strong> — repeat the process from the neutral bar at the
              consumer unit to the neutral terminal at each accessory to confirm the neutral
              conductor is correctly connected.
            </li>
            <li>
              <strong>Check single-pole switches</strong> — with the switch in the off position,
              test continuity from the line busbar to the switch line terminal. The reading should
              be low resistance. With the switch off, there should be no continuity through to the
              load side, confirming the switch breaks the line conductor.
            </li>
          </ol>
        </div>
        <p>
          This method simultaneously verifies continuity and polarity. When performing the{' '}
          <SEOInternalLink href="/guides/continuity-testing-r1-r2">
            R1+R2 continuity test
          </SEOInternalLink>
          , the polarity check is effectively built in — you are confirming that the line conductor
          runs from the consumer unit to the furthest point of the circuit.
        </p>
        <SEOAppBridge
          title="Schedule of Test Results Captures Polarity"
          description="Elec-Mate's schedule of test results includes polarity verification for every circuit. Enter your continuity readings and the app auto-confirms polarity. Any circuit without confirmed polarity is flagged as requiring attention before the certificate can be completed."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'instrument-method',
    heading: 'Instrument Testing (Live Verification)',
    content: (
      <>
        <p>
          Live polarity verification is used as a supplementary check during periodic inspection or
          as a quick confirmation after energising a new installation. It does not replace the
          continuity method for initial verification but provides additional confidence.
        </p>
        <p>The most common methods of live polarity verification are:</p>
        <ul className="space-y-3 my-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Approved voltage indicator</strong> — a{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                GS38-compliant
              </SEOInternalLink>{' '}
              voltage indicator can confirm the presence of voltage between line and neutral,
              between line and earth, and the absence of voltage between neutral and earth. This
              confirms correct polarity at the test point.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Plug-in socket tester</strong> — a quick-check
              device that plugs into a 13A socket outlet and uses indicator LEDs to show whether
              polarity is correct, reversed, or if the earth is missing. Useful for rapid screening
              during periodic inspection but has limitations.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Multifunction tester voltage function</strong> —
              most MFTs include a voltage measurement function that can be used to confirm polarity
              by measuring between conductors at accessible points.
            </span>
          </li>
        </ul>
        <p>
          Remember that live testing must be carried out in accordance with the Electricity at Work
          Regulations 1989, which require that live working is only undertaken when it is
          unreasonable for the work to be done dead. For polarity verification, the dead continuity
          test should always be performed first, with live testing used only as confirmation.
        </p>
      </>
    ),
  },
  {
    id: 'when-required',
    heading: 'When Polarity Testing Is Required',
    content: (
      <>
        <p>
          Polarity verification is required in all of the following circumstances under BS 7671:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Initial verification</strong> — every circuit in
                a new installation must have polarity verified before the{' '}
                <SEOInternalLink href="/guides/eic-certificate">EIC</SEOInternalLink> is issued.
                This includes every socket outlet, every switch, every light fitting, and every
                fixed appliance connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Additions and alterations</strong> — any new
                circuit or modification to an existing circuit must have polarity verified. This
                applies to{' '}
                <SEOInternalLink href="/guides/minor-works-certificate">
                  minor works
                </SEOInternalLink>{' '}
                as well as full EIC work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Periodic inspection (EICR)</strong> — polarity
                is checked as part of the inspection and testing regime. The extent of polarity
                testing on an EICR depends on the agreed scope and extent, but it should cover a
                representative sample of every circuit type.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">After any modification</strong> — if any
                conductors have been disconnected and reconnected (for example, during a consumer
                unit change), polarity must be reverified on every affected circuit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">testing sequence</SEOInternalLink>{' '}
          places polarity verification within the dead testing phase, after continuity of protective
          conductors and before insulation resistance testing. This sequence is critical because
          polarity errors must be corrected before any live testing takes place.
        </p>
      </>
    ),
  },
  {
    id: 'common-faults',
    heading: 'Common Polarity Faults',
    content: (
      <>
        <p>
          Polarity faults can occur anywhere in an installation, but certain locations and
          configurations are more prone to errors. Being aware of these common fault patterns helps
          you identify problems more efficiently during inspection.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-2">Crossed Line and Neutral at Socket</h4>
                <p className="text-white text-sm leading-relaxed">
                  The most common polarity fault. The brown and blue conductors are connected to the
                  wrong terminals at the socket outlet. The socket will still work (appliances do
                  not care about AC polarity) but fused plugs will fuse the neutral instead of the
                  line, and equipment with single-pole switches will switch the neutral. This is
                  classified as C2 on an EICR.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-2">Switch in Neutral Conductor</h4>
                <p className="text-white text-sm leading-relaxed">
                  A single-pole switch connected in the neutral conductor instead of the line. When
                  the switch is off, the light fitting appears dead but the line conductor is still
                  connected to the lamp holder. Anyone changing a lamp is at risk of electric shock.
                  This is classified as C1 (danger present) on an EICR.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-2">Centre Contact Lamp Holder</h4>
                <p className="text-white text-sm leading-relaxed">
                  BS 7671 Regulation 559.4.1 requires that the line conductor connects to the centre
                  contact of a bayonet or Edison screw lamp holder. If the line is connected to the
                  outer shell instead, touching the shell while inserting or removing a lamp could
                  cause an electric shock, even with the switch on.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-2">Consumer Unit Connections</h4>
                <p className="text-white text-sm leading-relaxed">
                  Line and neutral conductors crossed at the{' '}
                  <SEOInternalLink href="/guides/consumer-unit-regulations">
                    consumer unit
                  </SEOInternalLink>
                  . This reverses polarity for the entire circuit. More common after DIY
                  modifications or when multiple circuits are wired simultaneously during a new
                  installation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording Polarity Test Results',
    content: (
      <>
        <p>
          Polarity verification results are recorded on the schedule of test results, which forms
          part of the EIC or EICR documentation. The schedule includes a column for polarity
          confirmation for each circuit tested.
        </p>
        <p>
          For each circuit, record a tick (or the letter C for correct) in the polarity column to
          confirm that polarity has been verified and found correct. If polarity is incorrect,
          record the fault and raise an appropriate observation code. Do not simply leave the
          polarity column blank — a blank entry means the test was not carried out, which is itself
          a deficiency in the inspection.
        </p>
        <p>
          When recording polarity on a{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR</SEOInternalLink>, also note the
          method used (continuity test, visual inspection, or socket tester) in the comments or
          general remarks section. This provides evidence that polarity was verified by an
          appropriate method.
        </p>
        <SEOAppBridge
          title="Auto-Validated Schedule of Test Results"
          description="Elec-Mate captures polarity verification on every circuit in the schedule of test results. The app ensures polarity is confirmed before a certificate can be finalised. Incomplete polarity verification is flagged automatically, preventing certificates from being issued with missing data."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PolarityTestingGuidePage() {
  return (
    <GuideTemplate
      title="Polarity Testing Procedure | Complete Guide for UK Electricians"
      description="Complete guide to polarity testing for UK electricians. Why polarity matters, verification methods (visual, continuity, instrument), when required by BS 7671, common polarity faults, and recording results on EIC/EICR schedules. GN3 procedure explained."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Essential Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Polarity Testing Procedure
          <br />
          <span className="text-yellow-400">Complete Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Polarity verification confirms that line, neutral, and earth conductors are correctly connected at every point in an installation. This guide covers why polarity matters, the three verification methods, common faults, and how to record results correctly on EIC and EICR certificates."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Never Miss a Polarity Check Again"
      ctaSubheading="Elec-Mate captures polarity verification on every circuit, auto-validates test results against BS 7671, and flags incomplete testing. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
