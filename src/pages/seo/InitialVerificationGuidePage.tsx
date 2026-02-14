import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ClipboardCheck,
  CheckCircle,
  AlertTriangle,
  Activity,
  Gauge,
  ShieldCheck,
  GraduationCap,
  Mic,
  ListOrdered,
  Camera,
  Brain,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing', href: '/guides/testing-sequence-guide' },
  { label: 'Initial Verification', href: '/guides/initial-verification' },
];

const tocItems = [
  { id: 'what-is-initial-verification', label: 'What Is Initial Verification?' },
  { id: 'when-required', label: 'When Is It Required?' },
  { id: 'inspection-schedule', label: 'The Inspection Schedule' },
  { id: 'test-sequence', label: 'Test Sequence for Initial Verification' },
  { id: 'eic-certification', label: 'Certification: The EIC' },
  { id: 'minor-works', label: 'Minor Works vs Full EIC' },
  { id: 'common-failures', label: 'Common Initial Verification Failures' },
  { id: 'using-elecmate', label: 'Completing Initial Verification with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Initial verification is the process of inspecting and testing a new or altered electrical installation before it is put into service, as required by BS 7671 Chapter 61.',
  'Every circuit must be fully tested — no sampling is permitted on initial verification, unlike periodic inspection.',
  'The test sequence follows BS 7671 strictly: visual inspection first, then dead tests (continuity, IR, polarity), then live tests (Zs, PFC, RCD).',
  'The outcome is an Electrical Installation Certificate (EIC) which must be issued by the person responsible for the design, construction, and verification of the installation.',
  'Elec-Mate lets you complete the EIC on site — AI board scanner pre-fills circuit details, voice entry records test results, and the certificate exports as a professional PDF.',
];

const faqs = [
  {
    question: 'What is the difference between initial verification and periodic inspection?',
    answer:
      'Initial verification is performed on new installations or alterations before they are energised for the first time. It requires 100% testing of every circuit — no sampling is permitted. The outcome is an Electrical Installation Certificate (EIC) or Minor Works Certificate. Periodic inspection is performed on existing installations that are already in service, to assess their ongoing condition. It allows sampling of similar circuits and produces an Electrical Installation Condition Report (EICR). The test sequence is the same in both cases (dead tests then live tests), but the scope differs: initial verification covers every circuit completely, while periodic inspection may sample circuits and focus on areas of concern. Initial verification also includes a thorough check against the design specification, which is not applicable to periodic inspection.',
  },
  {
    question: 'Who can carry out initial verification?',
    answer:
      'BS 7671 Regulation 631.1 requires that initial verification be carried out by a competent person. In practice, this means someone who holds the current edition qualification (C&G 2382 — 18th Edition), an inspection and testing qualification (C&G 2391 or equivalent), and is registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or BRE Certification) if the work is notifiable under Part P of the Building Regulations. The person carrying out the verification must be independent of the installation work — ideally a different individual from the person who installed the circuits, although BS 7671 allows the same person to install and verify if they are competent to do both. For competent person scheme members, the verification may be carried out by the scheme member or their qualified employee.',
  },
  {
    question: 'Do I need an EIC for every new circuit I install?',
    answer:
      'Every new installation, alteration, or addition to an existing installation requires certification. For new complete installations or significant alterations (such as a consumer unit change, new circuits, or a partial rewire), an Electrical Installation Certificate (EIC) is required. For minor additions and alterations to an existing circuit (such as adding a socket to an existing ring circuit or adding a light fitting to an existing lighting circuit), a Minor Electrical Installation Works Certificate (MEIWC) may be issued instead. The decision depends on the scope of the work: if you are creating new circuits or making significant changes to the installation, issue an EIC. If the work is minor and does not involve new circuits, a MEIWC is appropriate. See the guide on when an EIC is required for detailed examples.',
  },
  {
    question: 'What tests are required for initial verification?',
    answer:
      'BS 7671 Sections 643 and 644 specify the full test sequence. Dead tests (with supply isolated): continuity of protective conductors (R1+R2), continuity of ring final circuit conductors, insulation resistance between all conductors (line-neutral, line-earth, neutral-earth at 500 V DC), polarity verification, and earth electrode resistance (for TT systems). Live tests (with supply energised): earth fault loop impedance (Zs) at every circuit end-point, prospective fault current (PSCC and PEFC) at the origin, RCD operation (trip time at x1 and x5 for every RCD), phase sequence (for three-phase supplies), and functional testing of all switchgear and controls. Every circuit must be tested — 100% testing, no sampling. The test results are recorded on the schedule of test results that accompanies the EIC.',
  },
  {
    question: 'What happens if initial verification reveals a fault?',
    answer:
      'If any test fails during initial verification, the circuit must not be energised (or must be immediately de-energised if already live). The fault must be identified, corrected by the installer, and the circuit retested before it can be put into service. The EIC cannot be issued until all tests pass. Common faults found during initial verification include: low insulation resistance (damaged cable, cable clipped through), reversed polarity (line and neutral transposed at a socket or switch), high R1+R2 values (poor termination, loose connection), missing earth connections, and RCDs not tripping within the required time. The inspector should record the fault, communicate it to the installer, and verify the correction before signing off the EIC.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/testing-sequence-guide',
    title: 'Full Testing Sequence',
    description: 'The complete dead and live test sequence in the order required by BS 7671.',
    icon: ListOrdered,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Create Electrical Installation Certificates digitally with AI assistance and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/dead-vs-live-testing',
    title: 'Dead vs Live Testing',
    description: 'Which tests are dead, which are live, and why the sequence matters for safety.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/periodic-inspection',
    title: 'Periodic Inspection Guide',
    description:
      'How periodic inspection differs from initial verification — sampling, limitations, and EICR reporting.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-change',
    title: 'Consumer Unit Change Guide',
    description: 'The certification and testing requirements when replacing a consumer unit.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with 50+ structured courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-initial-verification',
    heading: 'What Is Initial Verification?',
    content: (
      <>
        <p>
          Initial verification is the process of inspecting and testing a new or altered electrical
          installation before it is put into service. It is required by{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 Chapter 61
          </SEOInternalLink>{' '}
          and covers the complete installation from the origin (usually the consumer unit) to every
          final circuit, socket outlet, light fitting, and fixed appliance.
        </p>
        <p>
          The purpose of initial verification is to confirm that the installation has been designed,
          erected, and completed in accordance with BS 7671 and is safe for use. It is the final
          check before the installation is energised and handed over to the client.
        </p>
        <p>
          Initial verification consists of three stages: visual inspection (Chapter 611), dead
          testing (Section 643), and live testing (Section 644). The inspection and all tests must
          be completed satisfactorily before the installation can be certified. The certificate
          issued for initial verification is the Electrical Installation Certificate (EIC).
        </p>
        <p>
          Unlike periodic inspection, initial verification requires 100% testing of every circuit.
          There is no sampling — every circuit must be fully tested for continuity, insulation
          resistance, polarity, earth fault loop impedance, RCD operation, and prospective fault
          current.
        </p>
      </>
    ),
  },
  {
    id: 'when-required',
    heading: 'When Is Initial Verification Required?',
    content: (
      <>
        <p>Initial verification is required in the following situations:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New installations.</strong> Every new electrical installation — whether a
                new build, an extension, or a standalone outbuilding — must undergo initial
                verification before the supply is connected and the installation is used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additions and alterations.</strong> When new circuits are added to an
                existing installation (for example, installing new lighting circuits, adding a
                cooker circuit, or wiring a garden room), the new work must be initial-verified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacements.</strong> A{' '}
                <SEOInternalLink href="/guides/consumer-unit-change">
                  consumer unit change
                </SEOInternalLink>{' '}
                is classified as notifiable work under{' '}
                <SEOInternalLink href="/guides/part-p-building-regulations">
                  Part P of the Building Regulations
                </SEOInternalLink>{' '}
                and requires initial verification of the new unit and all circuits connected to it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewires and partial rewires.</strong> Any rewire — full or partial —
                requires initial verification of all new wiring, protective devices, and
                accessories.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installations.</strong> Installing an{' '}
                <SEOInternalLink href="/guides/ev-charger-installation">
                  EV charging point
                </SEOInternalLink>{' '}
                is notifiable work that requires initial verification and an EIC.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In all cases, the initial verification must be completed before the installation is
          energised and put into service. The installer should not hand the installation over to the
          client until the EIC has been issued.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-schedule',
    heading: 'The Inspection Schedule',
    content: (
      <>
        <p>
          Before testing begins, a thorough visual inspection must be carried out. BS 7671
          Regulation 611.3 provides a detailed list of items to inspect. The inspection schedule
          (sometimes called the inspection checklist) is a systematic record of every item checked.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Key Inspection Items</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Correct cable types and ratings for each circuit (Regulation 521, 522, 523).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Cable routing compliant with prescribed zones or mechanical protection where outside
                zones (Regulation 522.6).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Terminations secure, correct torque, no damage to insulation or conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Protective devices correctly rated for the cable size and circuit load.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Earthing and bonding conductors correctly sized and connected (Regulations 542,
                544).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>RCD protection provided where required (Regulation 411.3.3, 411.3.4).</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Labels, circuit charts, and warning notices in place (Regulation 514).</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>IP ratings of enclosures appropriate for the location (Regulation 416).</span>
            </li>
          </ul>
        </div>
        <p>
          The inspection schedule is completed as part of the EIC. Every item is marked as checked
          and satisfactory, or noted as non-compliant with a reference to the relevant regulation.
          Defects found during inspection must be corrected before testing proceeds.
        </p>
      </>
    ),
  },
  {
    id: 'test-sequence',
    heading: 'Test Sequence for Initial Verification',
    content: (
      <>
        <p>
          The <SEOInternalLink href="/guides/dead-vs-live-testing">test sequence</SEOInternalLink>{' '}
          for initial verification follows BS 7671 Chapter 61 strictly. Dead tests are performed
          first (with the supply isolated), followed by live tests (with the supply energised).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Dead Tests (Supply Isolated)</h3>
          <ol className="space-y-3 text-white list-decimal list-inside">
            <li>
              <strong>Continuity of protective conductors (R1+R2)</strong> — measured on every
              circuit. Confirms the CPC is connected from the board to the furthest point.
            </li>
            <li>
              <strong>Continuity of ring final circuit conductors</strong> — the three-step ring
              circuit test on every ring circuit (end-to-end, cross-connect, measure at each point).
            </li>
            <li>
              <strong>Insulation resistance</strong> — tested between line-earth, neutral-earth, and
              line-neutral on every circuit at 500 V DC. Minimum 1.0 megohm.
            </li>
            <li>
              <strong>Polarity</strong> — confirmed at every switch, socket, and connection point.
              Single-pole devices must be in the line conductor.
            </li>
            <li>
              <strong>Earth electrode resistance</strong> — for TT systems only, using the{' '}
              <SEOInternalLink href="/guides/earth-electrode-testing">
                fall of potential method
              </SEOInternalLink>
              .
            </li>
          </ol>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Live Tests (Supply Energised)</h3>
          <ol className="space-y-3 text-white list-decimal list-inside">
            <li>
              <strong>Earth fault loop impedance (Zs)</strong> — measured at the furthest point of
              every circuit. Compared against the maximum values in BS 7671 Tables 41.2, 41.3, and
              41.4.
            </li>
            <li>
              <strong>Prospective fault current (PSCC and PEFC)</strong> — measured at the origin.
              Must not exceed the breaking capacity of the protective devices.
            </li>
            <li>
              <strong>RCD operation</strong> — trip time measured at x1 and x5 rated current for
              every RCD. Ramp test to confirm actual trip current.
            </li>
            <li>
              <strong>Phase sequence</strong> — for three-phase supplies, confirm correct rotation.
            </li>
            <li>
              <strong>Functional testing</strong> — operate every MCB, RCBO, RCD, isolator, and
              control device to confirm correct function.
            </li>
          </ol>
        </div>
        <p>
          All test results are recorded on the schedule of test results that accompanies the EIC.
          Every circuit has a row on the schedule with a column for each test value. No fields
          should be left blank — every test must be performed and recorded.
        </p>
        <SEOAppBridge
          title="Follow the test sequence automatically"
          description="Elec-Mate guides you through dead tests then live tests in the correct BS 7671 order. Voice-enter your readings, and the schedule populates automatically. AI flags any failed values and suggests the right observation code."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'eic-certification',
    heading: 'Certification: The Electrical Installation Certificate (EIC)',
    content: (
      <>
        <p>
          The outcome of successful initial verification is an Electrical Installation Certificate
          (EIC). This is the formal document that confirms the installation has been designed,
          constructed, inspected, and tested in accordance with BS 7671. The EIC model form is
          specified in Appendix 6 of BS 7671.
        </p>
        <p>The EIC has three signature sections, representing three distinct responsibilities:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Designer.</strong> The person responsible for the design of the installation
                — cable selection, circuit protection, earthing arrangements, and compliance with BS
                7671 design requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Constructor (Installer).</strong> The person responsible for the physical
                installation of the wiring, accessories, and protective devices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspector (Verifier).</strong> The person responsible for carrying out the
                inspection and testing — the initial verification itself.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In domestic work, all three roles are often filled by the same person — the sole trader
          electrician who designs, installs, and tests the work. In larger commercial and industrial
          projects, these may be three different people or even three different companies.
          Regardless, the EIC must carry a signature for each role.
        </p>
        <p>
          The EIC is accompanied by the schedule of inspections (the visual inspection checklist)
          and the schedule of test results (all measured values for every circuit). Together, these
          three documents form the complete certification package.
        </p>
        <p>
          For notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>
          , the EIC must be registered with the local authority building control (or automatically
          notified through a competent person scheme). The client should receive the original EIC,
          and a copy should be retained by the installer.
        </p>
      </>
    ),
  },
  {
    id: 'minor-works',
    heading: 'Minor Works Certificate vs Full EIC',
    content: (
      <>
        <p>
          Not every job requires a full EIC. The Minor Electrical Installation Works Certificate
          (MEIWC) is a simplified certificate for small additions and alterations to an existing
          circuit that do not involve new circuits.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Use an EIC When...</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Installing new circuits</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Replacing a consumer unit</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Full or partial rewire</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Installing an EV charger</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>New installation in an extension or outbuilding</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Use a Minor Works When...</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Adding a socket to an existing ring circuit</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Adding a light fitting to an existing lighting circuit</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Replacing a damaged accessory with a like-for-like unit</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Moving a socket position on the same circuit</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          The key distinction is whether new circuits are created. If yes, use an EIC. If no, a
          Minor Works Certificate may be sufficient. See the{' '}
          <SEOInternalLink href="/guides/minor-works-vs-eic">
            Minor Works vs EIC comparison
          </SEOInternalLink>{' '}
          for more detailed guidance on which certificate to use.
        </p>
      </>
    ),
  },
  {
    id: 'common-failures',
    heading: 'Common Initial Verification Failures',
    content: (
      <>
        <p>
          These are the faults most commonly found during initial verification of new installations:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low insulation resistance.</strong> Often caused by cable damage during
                installation — a nail or screw through a cable, or insulation damaged by clipping.
                Can also be caused by moisture ingress in outdoor or below-ground cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open circuit CPC (no continuity).</strong> The earth wire is not connected
                at a socket, switch, or junction box. A loose terminal or a conductor that was cut
                too short and did not make contact.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reversed polarity.</strong> Line and neutral transposed at a socket outlet,
                light switch, or connection unit. Particularly common on lighting circuits where
                switch wires can be confusing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>High Zs values.</strong> Earth fault loop impedance exceeding the maximum
                permitted value, often caused by long cable runs, undersized conductors, or a high
                external earth fault loop impedance (Ze) at the supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing bonding.</strong> Supplementary or main bonding conductors not
                connected. Common in kitchens and bathrooms where bonding to metallic pipework is
                required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All faults must be rectified and retested before the EIC can be issued. The inspector
          should not sign off the certificate until every test passes.
        </p>
      </>
    ),
  },
  {
    id: 'using-elecmate',
    heading: 'Completing Initial Verification with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate streamlines the entire initial verification workflow — from scanning the board
          to issuing the EIC. Here is how:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the new consumer unit. Elec-Mate reads the MCB/RCBO ratings, circuit
                  references, and board layout from the image. Circuit descriptions and protective
                  device ratings populate the schedule automatically.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Mic className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Voice Test Entry</h4>
                <p className="text-white text-sm leading-relaxed">
                  Speak your test results as you take them. "Circuit 1 ring, R1+R2 0.28, r1 0.31, rn
                  0.32, IR 200 meg, Zs 0.76, RCD 16 milliseconds." The schedule fills in while your
                  hands stay on the test leads.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Automatic Pass/Fail Checking</h4>
                <p className="text-white text-sm leading-relaxed">
                  As results are entered, the AI compares every value against BS 7671 maximum
                  permitted values. Failed readings are flagged instantly, with the relevant
                  regulation referenced. No more looking up tables manually.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The finished <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> exports
          as a professional PDF — ready to email or WhatsApp to the client, upload to your scheme
          provider, and file with building control. All before you leave site.
        </p>
        <SEOAppBridge
          title="Issue the EIC before you leave site"
          description="Complete initial verification on your phone. AI board scanner, voice test entry, automatic pass/fail checking, and instant PDF export. Join 430+ UK electricians using Elec-Mate. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function InitialVerificationGuidePage() {
  return (
    <GuideTemplate
      title="Initial Verification Guide | BS 7671 Chapter 61"
      description="Complete guide to initial verification of electrical installations under BS 7671. When required, the full test sequence, inspection schedule, EIC certification, and common failures to watch for."
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          Initial Verification:{' '}
          <span className="text-yellow-400">The Complete Guide to BS 7671 Chapter 61</span>
        </>
      }
      heroSubtitle="Every new or altered electrical installation must be inspected and tested before it is put into service. Initial verification covers visual inspection, dead testing, and live testing of every circuit — no sampling allowed. The result is an Electrical Installation Certificate (EIC). This guide explains the entire process."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Initial Verification"
      relatedPages={relatedPages}
      ctaHeading="Complete the EIC on Site"
      ctaSubheading="Elec-Mate guides you through initial verification and produces a professional EIC certificate. AI board scanner, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
