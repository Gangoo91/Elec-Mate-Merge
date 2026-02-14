import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Wrench,
  Cable,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  ClipboardCheck,
  Calculator,
  CircuitBoard,
  TestTube2,
  Tag,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/installation' },
  { label: 'Second Fix', href: '/guides/second-fix-electrical' },
];

const tocItems = [
  { id: 'what-is-second-fix', label: 'What Is Second Fix?' },
  { id: 'fitting-accessories', label: 'Fitting Accessories' },
  { id: 'consumer-unit-wiring', label: 'Consumer Unit Wiring' },
  { id: 'labelling', label: 'Labelling and Circuit Charts' },
  { id: 'initial-verification', label: 'Initial Verification Testing' },
  { id: 'eic-certification', label: 'EIC Certification' },
  { id: 'common-snags', label: 'Common Second Fix Snags' },
  { id: 'handover', label: 'Customer Handover' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Second fix electrical covers fitting accessories, wiring the consumer unit, labelling, initial verification testing, and issuing the EIC — it is where the installation becomes a finished, certified product.',
  'Initial verification under BS 7671 Chapter 64 must be completed before the supply is energised — dead tests first (continuity, insulation resistance, polarity), then live tests (Zs, PFC, RCD operation).',
  'The Electrical Installation Certificate (EIC) is a legal requirement for all new installations. It must be issued before the installation is handed over to the customer.',
  'Labelling every circuit at the consumer unit with a circuit chart is required under BS 7671 Regulation 514.9 — unlabelled boards fail inspection.',
  'Elec-Mate lets you complete EIC certificates and the full schedule of test results on your phone, with voice entry for test readings and AI-assisted observation coding.',
];

const faqs = [
  {
    question: 'What is included in second fix electrical?',
    answer:
      'Second fix electrical is everything that happens after plastering and decorating to complete the electrical installation. It includes fitting all accessories — sockets, switches, light fittings, dimmers, cooker switches, fused spurs, shaver sockets, fan isolators, smoke and heat detectors, and any other fixed electrical equipment. It also includes wiring and commissioning the consumer unit (or distribution board), connecting all circuits to the correct protective devices, labelling every circuit, fitting the circuit chart, and carrying out the full initial verification testing sequence under BS 7671 Chapter 64. The final step is issuing the Electrical Installation Certificate (EIC) with the complete schedule of test results and the schedule of items inspected. Second fix typically accounts for 30-40% of the total installation time on a domestic project.',
  },
  {
    question: 'What is the correct testing sequence for initial verification?',
    answer:
      'The initial verification testing sequence under BS 7671 Chapter 64 and GN3 (Guidance Note 3: Inspection and Testing) is: 1) Continuity of protective conductors — test R1+R2 for every circuit to verify the CPC is continuous from the consumer unit to the furthest point. 2) Continuity of ring final circuits — perform the figure-of-eight test on every ring circuit to verify the ring is complete and has no interconnections or spurs from the wrong point. 3) Insulation resistance — test at 500V DC between all live conductors and earth, with a minimum acceptable reading of 1 megohm. 4) Polarity — verify that all switching devices are in the line conductor and that the connections at every accessory are correct. 5) Earth fault loop impedance (Zs) — measure at the furthest point of every circuit and compare against the maximum permitted values for the protective device. 6) Prospective fault current (PSCC/PEFC) — measure at the origin. 7) RCD operation — test every RCD at 1x and 5x rated residual current and verify trip times are within BS 7671 limits.',
  },
  {
    question: 'Who can issue an Electrical Installation Certificate?',
    answer:
      'The EIC has three signatories: the designer, the installer, and the inspector. These can be the same person or different people. The designer is responsible for the design of the installation meeting BS 7671 requirements. The installer confirms the installation has been constructed in accordance with the design. The inspector confirms the installation has been inspected, tested, and verified to comply with BS 7671. The inspector must hold a current inspection and testing qualification (C&G 2391 or equivalent) and the 18th Edition qualification (C&G 2382). For Part P notifiable work in dwellings, the person or company issuing the EIC should ideally be registered with a competent person scheme (NICEIC, NAPIT, ELECSA) to self-certify compliance with Building Regulations.',
  },
  {
    question: 'What happens if a test result fails during initial verification?',
    answer:
      'If any test result fails during initial verification, the circuit or installation must not be energised until the fault is identified and rectified. For example, an insulation resistance reading below 1 megohm indicates a potential fault between live conductors or between a live conductor and earth — this must be investigated before the supply is connected. Common causes of failed tests include damaged cable insulation (from plastering or other trades working around cables), incorrect wiring (crossed connections at accessories), missing or broken CPC connections, and faulty accessories. After rectifying the fault, re-test the affected circuit and record the corrected result on the schedule of test results. The EIC should reflect the final, compliant test results.',
  },
  {
    question: 'How long does second fix take on a typical house?',
    answer:
      'Second fix duration depends on the size of the property, the number of circuits and accessories, and the complexity of the consumer unit. As a rough guide: a 2-bedroom flat with a single consumer unit and 8-10 circuits takes 1 to 1.5 days for second fix (fitting accessories, wiring the board, testing, and certification). A 3-bedroom house with 12-15 circuits takes 1.5 to 2 days. A 4-5 bedroom house with 20+ circuits, a multi-way lighting system, and multiple distribution boards can take 2 to 3 days. These estimates assume the first fix was done correctly and the cables are properly labelled — if cables are not identified, add time for tracing circuits. Using Elec-Mate for testing and certification can save 1 to 2 hours per job by eliminating manual form filling and enabling voice entry of test results.',
  },
  {
    question: 'Do I need to test every circuit even if I only installed some of them?',
    answer:
      'If you are issuing an EIC for the entire installation (for example, a new build or full rewire), you must test every circuit in the installation — not just the ones you installed. The EIC covers the complete installation as described on the certificate. If you are adding circuits to an existing installation and issuing an EIC for the new work only, you test the new circuits and record the results. However, you should also check that the existing installation does not present a danger — if you discover a dangerous condition on the existing installation, you have a duty to inform the customer in writing. For additions and alterations to an existing installation, a Minor Works Certificate may be appropriate if the work involves adding a single circuit or making a simple modification.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on your phone with AI board scanning, voice test entry, and PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/first-fix-electrical',
    title: 'First Fix Electrical',
    description:
      'The companion guide to second fix — covering cable routing, back boxes, containment, and coordination.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description:
      'Step-by-step guide to the BS 7671 initial verification testing sequence with practical tips.',
    icon: TestTube2,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Requirements for consumer unit selection, wiring, and labelling under BS 7671 and Part P.',
    icon: CircuitBoard,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Verify cable sizes at second fix — cross-check the first fix cable selections against actual circuit lengths.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'Understand C1, C2, C3, and FI codes for when you encounter existing defects during second fix on rewires.',
    icon: BookOpen,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-second-fix',
    heading: 'What Is Second Fix Electrical?',
    content: (
      <>
        <p>
          Second fix electrical is the final stage of an electrical installation — the work that
          transforms cables protruding from walls and ceilings into a fully functioning, tested, and
          certified electrical system. It happens after plastering, decorating, and flooring are
          complete (or at least substantially complete).
        </p>
        <p>
          Where <SEOInternalLink href="/guides/first-fix-electrical">first fix</SEOInternalLink> is
          about infrastructure — cables, containment, and back boxes — second fix is about
          completion. It includes fitting every accessory (socket, switch, light fitting, smoke
          detector, and fixed appliance), wiring and commissioning the{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">consumer unit</SEOInternalLink>,
          labelling all circuits, performing the full initial verification testing sequence, and
          issuing the Electrical Installation Certificate (EIC).
        </p>
        <p>
          Second fix is where the electrician demonstrates their workmanship. Neat terminations,
          correct torque on connections, level accessories, and a professionally labelled consumer
          unit all contribute to the customer's impression of the finished job — and to the
          inspector's assessment if the work is subject to a competent person scheme inspection.
        </p>
      </>
    ),
  },
  {
    id: 'fitting-accessories',
    heading: 'Fitting Accessories: Sockets, Switches, and Light Fittings',
    content: (
      <>
        <p>
          Fitting accessories at second fix requires care and attention to detail. Every connection
          must be correct (polarity, tight termination, correct torque), every accessory must be
          level and flush with the wall surface, and every earth connection must be made properly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlets</strong> — strip the cable sheath back to just inside the
                back box. Strip individual cores to the correct length for the terminal. Connect
                brown to L, blue to N, green/yellow to E. Tighten terminals to the manufacturer's
                specified torque. Earth the metal back box with a flying earth lead from the
                accessory earth terminal to the back box earth terminal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switches</strong> — for one-way switching, connect the permanent live
                (brown) to the COM terminal and the switched live to L1. For two-way switching,
                connect COM and the two strappers (L1, L2) correctly at both switch positions.
                Sleeve the blue core brown where it is used as a switched live.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Light fittings</strong> — ensure the fitting is suitable for the location
                (IP rating for bathrooms, fire-rated for fire barriers). Connect using the correct
                terminal block — do not rely on wagos in ceiling voids unless they are accessible
                for inspection. Downlights through fire barriers must use fire-rated housings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooker connection units and fused spurs</strong> — size the cable and fuse
                correctly for the appliance. A 45A cooker switch with a 6.0mm2 cable is standard for
                most domestic cookers. A fused spur with a 3A or 13A fuse protects fixed appliances
                such as boilers, extractor fans, and towel rails.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-unit-wiring',
    heading: 'Consumer Unit Wiring',
    content: (
      <>
        <p>
          Wiring the consumer unit is one of the most important tasks at second fix. The consumer
          unit is the heart of the installation — every circuit originates here, and every
          protective device must be correctly rated and positioned.
        </p>
        <p>
          Under{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">
            BS 7671 and Amendment 3 (A3:2024)
          </SEOInternalLink>
          , consumer units in domestic premises must be constructed of non-combustible material
          (typically steel). The choice between a split-load board with RCDs and a board populated
          entirely with RCBOs depends on the installation design and customer requirements.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Consumer Unit Wiring Best Practice</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Strip cables neatly with consistent sheath lengths. The outer sheath should enter
                the consumer unit enclosure — do not strip it back outside the enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Route cables neatly around the inside of the enclosure. Use cable combs or ties to
                keep cables organised and identifiable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Tighten all busbar connections and device terminals to the manufacturer's specified
                torque. Loose connections cause overheating, arcing, and fires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Install the SPD (Surge Protection Device) if required by the installation design.
                Connect it to the line side of the main switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Ensure the main earthing conductor and main protective bonding conductors are
                correctly terminated at the main earth terminal.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'labelling',
    heading: 'Labelling and Circuit Charts',
    content: (
      <>
        <p>
          BS 7671 Regulation 514.9 requires every circuit to be identified by a label at the
          distribution board. The circuit chart must show the circuit number, the circuit
          description (e.g., "Kitchen sockets", "Upstairs lighting"), the protective device type and
          rating (e.g., "32A Type B MCB"), and the cable size.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit chart</strong> — must be durable, legible, and fixed inside or
                adjacent to the consumer unit. Handwritten charts are acceptable under BS 7671 but
                printed charts look more professional and are easier to update.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning labels</strong> — include labels for dual supply (if applicable),
                mixed earthing (if applicable), RCD test reminder ("This installation, or part of
                it, is protected by a device which automatically switches off the supply if an earth
                fault develops. Test quarterly by pressing the button marked 'T' or 'Test'.").
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection label</strong> — "IMPORTANT — This installation should
                be periodically inspected and tested" with the recommended date of next inspection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate generates a professional circuit chart as part of the{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC certificate</SEOInternalLink> workflow.
          Enter the circuit details once and the chart is included in the certificate PDF — no
          separate chart to print.
        </p>
      </>
    ),
  },
  {
    id: 'initial-verification',
    heading: 'Initial Verification Testing',
    content: (
      <>
        <p>
          Initial verification is the testing that proves the installation is safe before it is
          energised for the first time. Under BS 7671 Chapter 64 and{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">GN3</SEOInternalLink>, the tests
          must be carried out in a specific order — dead tests before live tests.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Dead Tests (Supply Isolated)</h4>
          <ol className="space-y-3 text-white list-decimal list-inside mb-6">
            <li>
              <strong>Continuity of protective conductors (R1+R2)</strong> — verify the CPC is
              continuous from the distribution board to the furthest point of every circuit.
            </li>
            <li>
              <strong>Continuity of ring final circuits</strong> — the figure-of-eight test on every
              ring circuit. Cross-connect L-L, N-N, and E-E at the distribution board end and
              measure at every socket. The readings should be consistent.
            </li>
            <li>
              <strong>Insulation resistance</strong> — test at 500V DC between all live conductors
              and earth. Minimum acceptable reading is 1 megohm. Disconnect surge protection devices
              (SPDs) and any electronic equipment before testing.
            </li>
            <li>
              <strong>Polarity</strong> — confirm all single-pole switching devices are in the line
              conductor. Confirm the connections at every accessory are correct.
            </li>
          </ol>
          <h4 className="font-bold text-white mb-3">Live Tests (Supply Energised)</h4>
          <ol className="space-y-3 text-white list-decimal list-inside" start={5}>
            <li>
              <strong>Earth fault loop impedance (Zs)</strong> — measure at the furthest point of
              every circuit. Compare against the maximum Zs for the protective device (from BS 7671
              Table 41.2, 41.3, or 41.4).
            </li>
            <li>
              <strong>Prospective fault current (PSCC)</strong> — measure at the origin. This value
              determines the required breaking capacity of the protective devices.
            </li>
            <li>
              <strong>RCD operation</strong> — test every RCD at 1x rated residual current (trip
              within 300ms) and 5x rated residual current (trip within 40ms for Type AC/A).
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Enter test results by voice while you test"
          description="Elec-Mate's voice test entry lets you speak your readings directly into the schedule of test results. 'Ring circuit 1, R1+R2 0.32, Zs 0.89, insulation resistance 200 megohms.' No putting down the probes to type."
          icon={TestTube2}
        />
      </>
    ),
  },
  {
    id: 'eic-certification',
    heading: 'Issuing the Electrical Installation Certificate',
    content: (
      <>
        <p>
          The Electrical Installation Certificate (EIC) is the formal document that certifies a new
          electrical installation complies with BS 7671. It is a legal requirement for all new
          installations and must be issued before the installation is handed over to the customer.
        </p>
        <p>The EIC consists of several sections:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part 1: Details of the client and installation</strong> — client name,
                installation address, description of the work, and the extent of the installation
                covered by the certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part 2-4: Designer, installer, and inspector declarations</strong> — each
                signatory confirms their role and that the work complies with BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part 5: Supply characteristics and earthing</strong> — supply type (TN-S,
                TN-C-S, TT), voltage, frequency, prospective fault current, and external earth fault
                loop impedance (Ze).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schedule of items inspected</strong> — a checklist covering every aspect of
                the installation from connections to accessories, cable selection, and protective
                devices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schedule of test results</strong> — the full test results for every circuit
                in the installation. This is the most time-consuming section to complete manually.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC certificate app</SEOInternalLink>{' '}
          guides you through every section, auto-populates fields from previous jobs, and lets you
          enter test results by voice. The finished certificate exports as a professional PDF that
          you can send to the customer by email or WhatsApp before leaving the site.
        </p>
        <SEOAppBridge
          title="Complete EIC certificates on your phone"
          description="Join 430+ UK electricians creating professional EIC certificates with Elec-Mate. AI board scanner, voice test entry, schedule of test results, and instant PDF delivery. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'common-snags',
    heading: 'Common Second Fix Snags to Watch For',
    content: (
      <>
        <p>
          Second fix is where installation quality becomes visible. These are the most common snags
          that inspectors and customers notice:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose connections</strong> — the single most common cause of electrical
                fires. Tighten every terminal to the manufacturer's specified torque. Re-check after
                24 hours if possible (connections can settle after first tightening).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing earth connections</strong> — every metal back box must be earthed.
                Every accessory with an earth terminal must have the CPC connected. A missing earth
                on a metal socket faceplate is a C2 (Potentially Dangerous) defect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Blue cores not sleeved brown</strong> — where a blue (neutral) core is used
                as a switched live (e.g., in switch drops), it must be sleeved with brown sleeving
                to indicate it is a line conductor. Missing sleeving is an inspection failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No circuit chart</strong> — an unlabelled consumer unit fails BS 7671
                Regulation 514.9. Every circuit must be identified on a durable chart fixed at the
                board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessories not level</strong> — use a spirit level on every socket and
                switch. Accessories visibly out of level look unprofessional and customers notice.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'handover',
    heading: 'Customer Handover',
    content: (
      <>
        <p>
          The customer handover is the final step. It is your opportunity to explain the
          installation, hand over the certificates, and demonstrate the safety features. A
          professional handover leaves a lasting impression and generates referrals.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Walk the customer through the consumer unit — explain the main switch, show them how
                to reset a tripped MCB or RCD, and demonstrate the RCD test button.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Hand over the EIC, the schedule of test results, and the schedule of items
                inspected. Explain that these documents should be kept safely — they will be needed
                for future inspections, property sales, and insurance claims.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Explain the recommended date of next periodic inspection (typically 5 years for
                domestic, 3 years for commercial). Write this on the periodic inspection label at
                the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                If the installation includes{' '}
                <SEOInternalLink href="/guides/afdd-guide">AFDDs</SEOInternalLink> or an SPD,
                explain what they do and what the customer should do if they trip.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use Elec-Mate's <SEOInternalLink href="/tools/quoting-app">quoting app</SEOInternalLink>{' '}
          to send the final invoice alongside the certificate. The customer receives the EIC and the
          invoice in one professional package — no chasing for payment later.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SecondFixElectricalPage() {
  return (
    <GuideTemplate
      title="Second Fix Electrical | Completion & Testing Guide"
      description="Complete guide to second fix electrical work in the UK. Fitting accessories, consumer unit wiring, labelling, initial verification testing under BS 7671 Chapter 64, and issuing the EIC certificate."
      datePublished="2025-07-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Second Fix Electrical:{' '}
          <span className="text-yellow-400">Completion, Testing, and Certification</span>
        </>
      }
      heroSubtitle="Second fix is where the installation comes together. Fitting accessories, wiring the consumer unit, labelling circuits, completing initial verification, and issuing the EIC. This guide covers the entire second fix process from start to handover."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Second Fix Electrical"
      relatedPages={relatedPages}
      ctaHeading="Complete Certificates On Site, Not At Your Desk"
      ctaSubheading="Elec-Mate lets you test, certify, and invoice in a single visit. Voice test entry, AI board scanning, professional EIC certificates, and instant delivery. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
