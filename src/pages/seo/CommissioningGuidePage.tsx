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
  Settings,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Mic,
  ListOrdered,
  Camera,
  Send,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing', href: '/guides/testing-sequence-guide' },
  { label: 'Commissioning', href: '/guides/commissioning-electrical-installation' },
];

const tocItems = [
  { id: 'what-is-commissioning', label: 'What Is Commissioning?' },
  { id: 'commissioning-vs-testing', label: 'Commissioning vs Testing' },
  { id: 'functional-checks', label: 'Functional Checks' },
  { id: 'documentation', label: 'Documentation Required' },
  { id: 'handover', label: 'Handover to the Client' },
  { id: 'om-manuals', label: 'O&M Manuals' },
  { id: 'commissioning-checklist', label: 'Commissioning Checklist' },
  { id: 'using-elecmate', label: 'Commissioning with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Commissioning is the final stage before an electrical installation is put into service — it includes initial verification, functional checks, and handover documentation.',
  'Commissioning goes beyond testing: it confirms every system, control, and device operates correctly as a complete installation, not just as individual circuits.',
  'Functional checks cover all switchgear, interlocks, controls, emergency systems, and automation to confirm they operate as designed.',
  'The handover package should include the EIC (or MEIWC), schedule of test results, as-built drawings, O&M manuals, and warranty documents.',
  'Elec-Mate produces the EIC, schedule of test results, and professional PDF documentation needed for the commissioning handover — all from site.',
];

const faqs = [
  {
    question: 'What is the difference between commissioning and initial verification?',
    answer:
      'Initial verification is the process of inspecting and testing every circuit in the installation to confirm it meets BS 7671 requirements. It is a subset of commissioning. Commissioning is the broader process that includes initial verification plus functional checks (operating every device to confirm it works as intended), system integration checks (confirming controls, interlocks, and automation work together), snagging (identifying and rectifying minor defects), and handover (providing the client with all documentation and training). In simple domestic installations, the distinction is small — initial verification effectively is the commissioning. In larger commercial and industrial installations, commissioning is a separate phase of the project that may take days or weeks beyond the initial verification testing.',
  },
  {
    question: 'Is commissioning a legal requirement?',
    answer:
      'BS 7671 Regulation 610.1 requires that every installation is inspected and tested during erection and on completion before being put into service. Regulation 631.1 requires an Electrical Installation Certificate to be issued upon completion of initial verification. While BS 7671 does not use the word "commissioning" as a formal requirement, the practical reality is that initial verification, functional testing, and certification together constitute commissioning. For notifiable work under Part P of the Building Regulations, the installation must be certified before it is put into service. Under the CDM Regulations 2015 (Construction Design and Management), the principal contractor must ensure that all building services — including electrical installations — are commissioned and tested before handover. In practice, commissioning is expected by clients, main contractors, scheme providers, and building control.',
  },
  {
    question: 'What documentation should I provide at commissioning handover?',
    answer:
      'The minimum documentation for handover is: the Electrical Installation Certificate (EIC) with the schedule of inspections and schedule of test results, circuit charts and labels for the distribution board(s), and any specific manufacturer instructions for installed equipment. For larger installations, the handover package should also include: as-built drawings showing the actual installed layout (updated from the design drawings), Operation and Maintenance (O&M) manuals for all installed equipment, test certificates for individual components (fire alarm system, emergency lighting, UPS), commissioning records for controls and automation systems, spare parts lists and warranty documents, and contact details for ongoing maintenance support. The client should sign a handover document confirming they have received all documentation and been shown how to operate the installation.',
  },
  {
    question: 'What functional checks are needed during commissioning?',
    answer:
      'Functional checks confirm that every device operates correctly as part of the complete installation. BS 7671 Regulation 643.10 requires functional testing as part of initial verification. The checks include: operating every MCB, RCBO, and RCD to confirm they trip and reset correctly, testing every isolator switch for correct operation, verifying that emergency switching devices (fireman switches, emergency stop buttons) operate correctly, confirming that interlocked devices operate in the correct sequence, testing automation and control systems (timers, sensors, BMS interfaces), checking that all indicator lights and displays show the correct status, testing that no-volt release contactors and motor starters operate as designed, and verifying that standby generators and UPS systems switch correctly on loss of mains supply.',
  },
  {
    question: 'How long does commissioning take?',
    answer:
      'For a typical domestic installation (consumer unit replacement, new circuits, or a rewire), commissioning — including initial verification testing and functional checks — takes 2 to 4 hours. The testing itself is the main time commitment, and the documentation can be completed on site using Elec-Mate. For a commercial installation with multiple distribution boards, control systems, and specialist equipment, commissioning can take days or weeks. A large office fit-out might require 2 to 5 days for electrical commissioning alone. Industrial installations with motor control centres, PLC-controlled systems, and emergency power supplies can take even longer. The commissioning period should be planned into the project programme from the start — it is not something to be squeezed into the last day before handover.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/initial-verification',
    title: 'Initial Verification Guide',
    description:
      'The full inspection and test sequence for new installations — the core of commissioning.',
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
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The dead and live test sequence required by BS 7671 Chapter 61.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/dead-vs-live-testing',
    title: 'Dead vs Live Testing',
    description: 'Which tests are dead, which are live, and why the order matters for safety.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'When electrical work is notifiable, how to certify it, and the role of competent person schemes.',
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
    id: 'what-is-commissioning',
    heading: 'What Is Commissioning an Electrical Installation?',
    content: (
      <>
        <p>
          Commissioning is the process of bringing an electrical installation from completion of
          physical installation through to handover as a fully tested, documented, and operational
          system. It is the final stage before the installation is put into service and the client
          takes ownership.
        </p>
        <p>
          Commissioning includes{' '}
          <SEOInternalLink href="/guides/initial-verification">
            initial verification
          </SEOInternalLink>{' '}
          (inspection and testing to BS 7671 Chapter 61), functional checks of all equipment and
          controls, snagging and rectification of minor defects, completion of all documentation
          (certificates, drawings, manuals), and formal handover to the client.
        </p>
        <p>
          For a simple domestic job — such as a{' '}
          <SEOInternalLink href="/guides/consumer-unit-change">
            consumer unit replacement
          </SEOInternalLink>{' '}
          or a new circuit installation — commissioning is straightforward: test the installation,
          confirm everything works, issue the EIC, and hand it to the client. For a large commercial
          or industrial project, commissioning is a structured phase of the project with its own
          programme, team, and sign-off procedures.
        </p>
        <p>
          Regardless of the scale, the principle is the same: do not hand over an installation until
          you have confirmed it works correctly, documented the evidence, and given the client
          everything they need to use and maintain it safely.
        </p>
      </>
    ),
  },
  {
    id: 'commissioning-vs-testing',
    heading: 'Commissioning vs Testing: What Is the Difference?',
    content: (
      <>
        <p>
          Testing (initial verification) confirms that individual circuits meet BS 7671 requirements
          — continuity, insulation resistance, earth fault loop impedance, RCD operation, and so on.
          Commissioning confirms that the installation works as a complete system.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Testing Confirms...</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Each circuit has correct continuity</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Insulation resistance meets minimum values</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Zs values are within limits</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>RCDs trip within required times</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Polarity is correct throughout</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Commissioning Also Confirms...</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>All lights, sockets, and fixed appliances work</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Controls and automation operate as designed</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Emergency systems function correctly</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Interlocks and safety devices work</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>All documentation is complete</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          Testing answers the question: "Does each circuit meet BS 7671?" Commissioning answers the
          broader question: "Does the entire installation work as intended and is it ready for the
          client to use?"
        </p>
      </>
    ),
  },
  {
    id: 'functional-checks',
    heading: 'Functional Checks: Testing the Complete System',
    content: (
      <>
        <p>
          Functional checks go beyond the instrument-based testing of initial verification. They
          involve physically operating every device in the installation to confirm it works
          correctly. BS 7671 Regulation 643.10 requires functional testing of assemblies such as
          switchgear, controls, and interlocks.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Functional Checks Checklist</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switchgear.</strong> Operate every MCB, RCBO, RCD, and isolator. Confirm
                they trip and reset cleanly. Check that no-volt release devices operate correctly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency switching.</strong> Test fireman's switches, emergency stop
                buttons, and any emergency disconnection devices. Confirm they de-energise the
                correct circuits and can be reset safely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting controls.</strong> Test dimmer switches, occupancy sensors,
                daylight sensors, time switches, and scene-setting controls. Confirm each operates
                the correct luminaires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interlocks.</strong> Confirm that interlocked devices operate in the correct
                sequence — for example, an extractor fan that starts when a light switch is
                operated, or a contactor that energises only when a safety guard is closed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor control.</strong> Start and stop motors. Check rotation direction.
                Verify overload protection operates. Confirm emergency stop buttons de-energise the
                motor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting.</strong> Simulate a mains failure and confirm emergency
                luminaires illuminate. Check that maintained fittings switch from mains to battery
                supply seamlessly. Confirm exit signs are illuminated and legible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm integration.</strong> If the electrical installation interfaces
                with the fire alarm system (for example, cause-and-effect programming, fire damper
                controls, or stairwell pressurisation), confirm the interfaces work correctly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Record the results of all functional checks. For domestic work, this is typically noted on
          the EIC. For commercial projects, a separate commissioning record sheet is used.
        </p>
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Documentation Required for Commissioning',
    content: (
      <>
        <p>
          Proper documentation is a core part of commissioning. The documentation package serves as
          evidence that the installation has been tested and is fit for purpose. It is also the
          reference that future electricians will use when maintaining or modifying the
          installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC).</strong> The formal certificate
                issued under BS 7671 Regulation 631. Includes design, construction, and inspection
                signatures, plus the schedule of inspections and schedule of test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schedule of test results.</strong> Every test value for every circuit —
                R1+R2, IR, Zs, PFC, RCD trip times. Accompanies the EIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit charts and labels.</strong> Clear identification of every circuit at
                the distribution board. Required by BS 7671 Regulation 514.9.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>As-built drawings.</strong> For larger installations, updated drawings
                showing the actual installed layout, cable routes, distribution board locations, and
                key equipment positions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning notices.</strong> All required warning labels fitted — RCD quarterly
                test notice, dual supply warning, periodic inspection notice (next inspection date),
                and any non-standard arrangements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P notifiable work
          </SEOInternalLink>
          , the EIC must be registered with building control (either directly or through a competent
          person scheme). Failure to certify notifiable work is a building regulation offence.
        </p>
      </>
    ),
  },
  {
    id: 'handover',
    heading: 'Handover to the Client',
    content: (
      <>
        <p>
          Handover is the formal point at which the client takes responsibility for the
          installation. A good handover ensures the client understands what has been installed, how
          to use it safely, and what documentation they should keep.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Walk the client through the installation.</strong> Show them the consumer unit
              location, how to identify circuit breakers, how to reset an RCD, and where the main
              isolation point is.
            </li>
            <li>
              <strong>Explain the RCD test button.</strong> Advise the client to press the RCD test
              button quarterly to confirm the mechanical trip mechanism is working. This is a
              requirement noted on the warning label at the consumer unit.
            </li>
            <li>
              <strong>Provide all documentation.</strong> Hand over the EIC (or MEIWC), schedule of
              test results, circuit chart, and any relevant manufacturer instructions. Explain that
              the EIC should be kept with the property deeds or building records.
            </li>
            <li>
              <strong>Advise on the next periodic inspection date.</strong> Explain when the next{' '}
              <SEOInternalLink href="/guides/periodic-inspection">
                periodic inspection
              </SEOInternalLink>{' '}
              is recommended and why it matters. The date is recorded on the EIC.
            </li>
            <li>
              <strong>Leave your contact details.</strong> Provide contact information for any
              queries or warranty issues. For domestic clients, a simple business card or invoice
              with contact details is sufficient.
            </li>
          </ol>
        </div>
        <p>
          For commercial projects, handover may involve a formal meeting with the client's
          facilities management team, structured training on specialist equipment, and a sign-off
          document confirming the client has received all documentation and is satisfied with the
          installation.
        </p>
        <SEOAppBridge
          title="Send the EIC to the client instantly"
          description="Finished commissioning? Export the EIC as a professional PDF and send it to the client by email or WhatsApp — before you leave site. The client has the certificate, schedule, and your contact details within minutes."
          icon={Send}
        />
      </>
    ),
  },
  {
    id: 'om-manuals',
    heading: 'O&M Manuals: What They Are and When to Provide Them',
    content: (
      <>
        <p>
          Operation and Maintenance (O&M) manuals are detailed documents that describe how to
          operate and maintain the installed equipment. They are standard practice on commercial and
          industrial projects, and increasingly expected on larger domestic installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">O&M Manual Contents</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Installation description — an overview of the electrical system, its design basis,
                and its key components.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Equipment data sheets — manufacturer information, model numbers, ratings, and
                specifications for all major equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Maintenance schedules — recommended maintenance intervals and procedures for each
                piece of equipment (for example, annual thermographic survey of distribution boards,
                quarterly RCD test button operation).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Spare parts lists — critical spare parts and their suppliers, so replacements can be
                sourced quickly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Warranty information — warranty periods, conditions, and contact details for each
                manufacturer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Test certificates — copies of the EIC, schedule of test results, and any specialist
                certificates (fire alarm, emergency lighting).
              </span>
            </li>
          </ul>
        </div>
        <p>
          For domestic work, a formal O&M manual is not usually required — the EIC, circuit chart,
          and manufacturer instructions are sufficient. For commercial projects, the O&M manual is a
          contractual deliverable and must be provided before practical completion is certified
          under the building contract.
        </p>
      </>
    ),
  },
  {
    id: 'commissioning-checklist',
    heading: 'Commissioning Checklist',
    content: (
      <>
        <p>
          Use this checklist to ensure nothing is missed during commissioning. Tick off each item as
          it is completed:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Visual inspection completed per BS 7671 Regulation 611.3</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                All{' '}
                <SEOInternalLink href="/guides/dead-vs-live-testing">dead tests</SEOInternalLink>{' '}
                completed: continuity, IR, polarity, earth electrode (if TT)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                All live tests completed: Zs, PFC, RCD operation, phase sequence (if 3-phase)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>All test results within BS 7671 limits — no failures outstanding</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Functional checks completed on all switchgear, controls, and interlocks</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Emergency systems tested (emergency lighting, fire alarm interfaces)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Circuit charts installed at distribution boards</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>All warning notices and labels fitted</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> completed and
                signed
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Snagging items rectified and signed off</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Documentation package complete and handed to client</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Client walkthrough and demonstration completed</span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-white">
              <strong>Pro tip:</strong> Take photographs of the completed installation — the
              consumer unit (cover on and off), cable routing, earthing and bonding connections, and
              any concealed wiring before it is covered. These photos are invaluable for future
              maintenance and can be attached to the EIC in Elec-Mate.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'using-elecmate',
    heading: 'Commissioning with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate handles the certification and documentation side of commissioning so you can
          focus on the testing and functional checks. Here is how it fits into your commissioning
          workflow:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the new consumer unit. The AI reads MCB/RCBO ratings and circuit labels
                  from the image. The{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> schedule
                  pre-fills with circuit descriptions and protective device details.
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
                  Speak your test results as you work through the{' '}
                  <SEOInternalLink href="/guides/testing-sequence-guide">
                    test sequence
                  </SEOInternalLink>
                  . Dead test results and live test results populate the schedule automatically. AI
                  compares every value against BS 7671 limits.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Instant PDF Handover</h4>
                <p className="text-white text-sm leading-relaxed">
                  The completed EIC exports as a professional PDF. Send it to the client by email or
                  WhatsApp from site. Attach the invoice. The client has the commissioning
                  documentation before you leave the property.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Commission and certify from one app"
          description="AI board scanner, voice test entry, automatic BS 7671 compliance checking, and instant PDF export. Complete the EIC on site and hand it over digitally. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CommissioningGuidePage() {
  return (
    <GuideTemplate
      title="Commissioning an Electrical Installation | Guide UK"
      description="Complete guide to commissioning an electrical installation. What commissioning involves, how it differs from testing, functional checks, documentation requirements, O&M manuals, handover procedure, and commissioning checklist."
      datePublished="2025-10-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={CheckCircle}
      heroTitle={
        <>
          Commissioning an Electrical Installation:{' '}
          <span className="text-yellow-400">From Testing to Handover</span>
        </>
      }
      heroSubtitle="Commissioning is the final stage before an electrical installation is put into service. It covers initial verification testing, functional checks of every device, snagging, documentation, and formal handover to the client. This guide explains the complete process for domestic and commercial installations."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Commissioning"
      relatedPages={relatedPages}
      ctaHeading="Commission and Certify from Your Phone"
      ctaSubheading="Elec-Mate handles the EIC, schedule of test results, and PDF export so you can focus on the testing and functional checks. Join 430+ UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
