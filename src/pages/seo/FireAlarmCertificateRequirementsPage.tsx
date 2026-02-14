import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Flame,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Wrench,
  Building2,
  Bell,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  {
    label: 'Fire Alarm Certificate Requirements',
    href: '/guides/fire-alarm-certificate-requirements',
  },
];

const tocItems = [
  { id: 'overview', label: 'Certificate Overview' },
  { id: 'design-certificate', label: 'Design Certificate' },
  { id: 'installation-certificate', label: 'Installation Certificate' },
  { id: 'commissioning-certificate', label: 'Commissioning Certificate' },
  { id: 'verification-certificate', label: 'Verification Certificate' },
  { id: 'annual-service-records', label: 'Annual Service Records' },
  { id: 'who-can-issue', label: 'Who Can Issue Certificates' },
  { id: 'record-keeping', label: 'Record Keeping Requirements' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Fire alarm systems require five key certificates across their lifecycle: design, installation, commissioning, verification, and annual service records.',
  'BS 5839-1 requires a design certificate confirming the system category, detector layout, sounder coverage, and cable routes before installation begins.',
  'The commissioning certificate must record functional tests of every device, cause-and-effect verification, sounder level measurements, and battery drain tests.',
  'Annual service records are a legal requirement under the Regulatory Reform (Fire Safety) Order 2005 and must be kept in the fire safety logbook.',
  'Elec-Mate provides digital fire alarm certificate templates for all five certificate types, with professional PDF export and cloud storage.',
];

const faqs = [
  {
    question: 'What certificates are required for a fire alarm system under BS 5839?',
    answer:
      'BS 5839-1 requires a series of certificates across the system lifecycle. A design certificate is produced during the design phase, confirming the system category, zone layout, detector types, sounder coverage, and cable specification. An installation certificate confirms the physical installation matches the design. A commissioning certificate records the results of all functional tests. A verification certificate may be issued by an independent third party to confirm compliance. Ongoing annual service records document regular testing and maintenance. Each certificate serves a distinct purpose and all should be retained in the building fire safety logbook.',
  },
  {
    question: 'Who is responsible for keeping fire alarm certificates?',
    answer:
      'The Responsible Person for the premises is legally responsible for keeping fire alarm certificates and service records. Under the Regulatory Reform (Fire Safety) Order 2005, the Responsible Person must ensure fire safety systems are maintained and that records of maintenance are available for inspection by the fire and rescue service. In practice, this means the building owner, landlord, managing agent, or employer must maintain a fire safety logbook containing all certificates, test records, and service reports. Failure to produce these records during a fire safety inspection can result in enforcement action.',
  },
  {
    question: 'How long must fire alarm certificates be kept?',
    answer:
      'There is no specific statutory time limit for retaining fire alarm certificates, but best practice is to keep them for the lifetime of the installation. BS 5839-1 recommends that all certificates and records are kept in the fire alarm logbook at the premises for as long as the system is in operation. Service records from at least the last three years should be readily available, as the fire and rescue service will want to see evidence of regular maintenance. Many building insurers also require evidence of ongoing maintenance as a condition of the fire insurance policy.',
  },
  {
    question:
      'What is the difference between a commissioning certificate and a verification certificate?',
    answer:
      'A commissioning certificate is issued by the installer who commissioned the fire alarm system. It records the results of the commissioning tests — functional tests of every device, sounder level measurements, battery capacity tests, and cause-and-effect verification. A verification certificate is issued by an independent third party (not the installer) who inspects the completed installation and confirms it complies with BS 5839-1 and the design specification. Verification provides an independent check that the system is correctly installed and functional. Not all installations require independent verification, but it is recommended for complex or high-risk systems and is often required by insurers or building control.',
  },
  {
    question: 'Can I create fire alarm certificates digitally instead of on paper?',
    answer:
      'Yes. BS 5839-1 does not require certificates to be on paper. Digital certificates are fully acceptable provided they contain all the required information, are signed (digitally or in wet ink), and can be produced for inspection when required. Elec-Mate provides digital fire alarm certificate templates that cover design, installation, commissioning, and service reports. Completed certificates are stored securely in the cloud and can be exported as professional PDF documents for the client or fire safety logbook. Digital certificates are easier to store, search, and share than paper forms.',
  },
  {
    question: 'What happens if fire alarm certificates are missing or incomplete?',
    answer:
      "Missing or incomplete fire alarm certificates can have serious consequences. The fire and rescue service can issue an enforcement notice requiring the Responsible Person to produce evidence of maintenance. If certificates cannot be produced, the fire authority may require a full inspection and test of the system by a competent person, at the Responsible Person's expense. In the event of a fire, the absence of maintenance records can be used as evidence of non-compliance with the Fire Safety Order, potentially leading to prosecution. Building insurers may also refuse to pay fire damage claims if there is no evidence of regular system maintenance.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/fire-alarm-certificate',
    title: 'Fire Alarm Certificate App',
    description:
      'Create digital fire alarm certificates on your phone with BS 5839 compliance and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-5839-fire-alarm-standard',
    title: 'BS 5839 Fire Alarm Standard',
    description:
      'Complete guide to BS 5839 covering system categories, grades, design, installation, and testing requirements.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/emergency-lighting-certificate-guide',
    title: 'Emergency Lighting Certificate Guide',
    description:
      'BS 5266 emergency lighting certificate requirements including completion, verification, and testing records.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description:
      'Overview of all UK electrical certificates including EIC, EICR, Minor Works, fire alarm, and emergency lighting.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/smoke-alarm-regulations-uk',
    title: 'Smoke Alarm Regulations UK',
    description:
      'Current UK smoke alarm regulations for domestic properties including new build and rented accommodation requirements.',
    icon: Bell,
    category: 'Guide',
  },
  {
    href: '/training/fire-alarm-systems',
    title: 'Fire Alarm Systems Course',
    description:
      'Structured training covering BS 5839 Part 1 and Part 6, system categories, grades, and certification procedures.',
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
    heading: 'Fire Alarm Certificate Requirements: Overview',
    content: (
      <>
        <p>
          A fire alarm system is not simply installed and forgotten. BS 5839-1 defines a
          certification framework that spans the entire lifecycle of the system, from initial design
          through to ongoing annual servicing. Each stage requires specific documentation to
          demonstrate compliance with the standard and with fire safety legislation.
        </p>
        <p>The five key certificate types for fire alarm systems are:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design certificate</strong> — confirms the system has been designed in
                accordance with BS 5839-1 and the fire risk assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation certificate</strong> — confirms the physical installation
                matches the approved design.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commissioning certificate</strong> — records the results of all functional
                tests carried out during commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verification certificate</strong> — an independent third-party confirmation
                of compliance (where required).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual service records</strong> — ongoing documentation of testing,
                maintenance, and any defects found.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Together, these certificates form a complete audit trail demonstrating that the fire alarm
          system was properly designed, correctly installed, fully tested, and is being maintained
          in accordance with the standard. The{' '}
          <SEOInternalLink href="/guides/bs-5839-fire-alarm-standard">
            BS 5839 fire alarm standard
          </SEOInternalLink>{' '}
          provides the detailed requirements for each certificate type. This guide explains what
          each certificate must contain and when it is required.
        </p>
      </>
    ),
  },
  {
    id: 'design-certificate',
    heading: 'Design Certificate',
    content: (
      <>
        <p>
          The design certificate is the first document in the fire alarm certification chain. It is
          produced by the system designer and confirms that the fire alarm system has been designed
          in accordance with BS 5839-1 and the specific requirements identified in the fire risk
          assessment for the building.
        </p>
        <p>The design certificate should include the following information:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The system category (L1, L2, L3, L4, L5, P1, P2, or M) and the justification for the
                chosen category based on the fire risk assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Zone plans showing the detector layout, manual call point positions, sounder
                positions, and the zone boundaries.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Cable routes, cable types (fire-resistant cable specification), and the containment
                system used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Panel specification, power supply details, and battery capacity calculations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Cause-and-effect specification showing what each zone activation triggers (sounders,
                door releases, dampers, lifts, ventilation shutdown).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The design certificate must be signed by the designer and should be reviewed and accepted
          by the client (or their representative) before installation begins. It forms the benchmark
          against which the installation and commissioning are measured.
        </p>
      </>
    ),
  },
  {
    id: 'installation-certificate',
    heading: 'Installation Certificate',
    content: (
      <>
        <p>
          The installation certificate confirms that the fire alarm system has been physically
          installed in accordance with the approved design. It is issued by the installing company
          and should be completed before commissioning takes place.
        </p>
        <p>The installation certificate covers the physical aspects of the work:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Confirmation that detectors, call points, sounders, and interfaces have been
                installed in the positions shown on the design drawings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Cable installation details — cable type, route, containment, segregation from other
                services, and fire stopping at penetrations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Panel installation, power supply connection, battery installation, and earthing
                arrangements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Any deviations from the design and the reasons for them — for example, a detector
                repositioned due to an obstruction not visible on the design drawings.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The installation certificate provides a record that the physical work has been completed
          to the required standard. If the installer is different from the designer, the
          installation certificate should note any design changes agreed during installation. For{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            electrical certificate types
          </SEOInternalLink>
          , the installation certificate for the fire alarm system is separate from the EIC for the
          general electrical installation.
        </p>
      </>
    ),
  },
  {
    id: 'commissioning-certificate',
    heading: 'Commissioning Certificate',
    content: (
      <>
        <p>
          The commissioning certificate is arguably the most important certificate in the fire alarm
          certification chain. It records the results of the comprehensive functional testing
          carried out when the system is first put into service. BS 5839-1 sets out detailed
          commissioning requirements that must all be completed and documented.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">
            Commissioning Tests Required by BS 5839-1
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Device functional test</strong> — every detector, manual call point,
                sounder, beacon, and interface device must be individually tested to confirm it
                operates correctly and is recognised by the control panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cause-and-effect verification</strong> — each zone or device activation must
                be tested to confirm the programmed cause-and-effect responses occur correctly
                (sounder activation, door releases, damper closure, lift recall).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sounder level measurement</strong> — sound pressure levels must be measured
                in all accessible areas to confirm they meet the minimum 65dB(A) requirement
                (75dB(A) at bedhead in sleeping accommodation).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery capacity test</strong> — the standby batteries must be tested under
                load to confirm they can sustain the system for the required standby period
                (typically 24 hours normal operation plus 30 minutes alarm condition).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>False alarm management</strong> — verification that any false alarm
                management features (double-knock, coincidence detection, investigation delay) are
                correctly programmed and functioning.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The commissioning certificate must be signed by the commissioning engineer and should
          include all test results, any defects found during commissioning, and confirmation that
          all defects have been resolved. The certificate is handed to the Responsible Person along
          with the system operating instructions and the fire alarm logbook.
        </p>
        <SEOAppBridge
          title="Digital fire alarm commissioning certificates"
          description="Complete commissioning certificates on your phone with Elec-Mate. Record device tests, sounder levels, battery results, and cause-and-effect verification as you work through the system. Export a professional PDF before you leave site."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'verification-certificate',
    heading: 'Verification Certificate',
    content: (
      <>
        <p>
          A verification certificate is issued by an independent third party — someone who was not
          involved in the design, installation, or commissioning of the fire alarm system. The
          purpose of verification is to provide an independent check that the system complies with
          BS 5839-1 and the design specification.
        </p>
        <p>
          Verification is not always required, but it is recommended by BS 5839-1 for the following
          situations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Complex systems in large commercial or industrial buildings where the consequences
                of system failure are significant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Systems protecting sleeping accommodation — care homes, hospitals, hotels, and large
                HMOs — where occupants may be unable to self-evacuate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Systems where the insurer, building control, or fire authority specifically requires
                independent verification as a condition of approval.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Systems installed by companies that are not third-party certificated (for example,
                not BAFE SP203-1 registered).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The verification process involves reviewing the design documentation, inspecting a
          representative sample of the installation, witnessing a selection of functional tests, and
          confirming the system meets the requirements of BS 5839-1. The verifier issues a
          verification certificate recording their findings. This provides the client and their
          insurer with independent assurance of compliance.
        </p>
      </>
    ),
  },
  {
    id: 'annual-service-records',
    heading: 'Annual Service Records and Maintenance Documentation',
    content: (
      <>
        <p>
          Once the fire alarm system is commissioned and handed over, the ongoing maintenance must
          be documented through service records. BS 5839-1 requires regular servicing at defined
          intervals, and each visit must be recorded in the fire alarm logbook.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Service Record Requirements</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekly test records</strong> — the Responsible Person must record the date,
                time, call point tested, and result of each weekly test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Six-monthly service reports</strong> — the servicing engineer records visual
                inspections, battery checks, detector sensitivity tests (sample), and any faults
                found.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual inspection reports</strong> — comprehensive testing of every device,
                battery capacity test, sounder level verification, and cable inspection results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Defect and remedial records</strong> — any defects found during servicing
                must be recorded with their severity, recommended actions, and confirmation of when
                they were resolved.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The{' '}
          <SEOInternalLink href="/tools/fire-alarm-certificate">
            fire alarm certificate app
          </SEOInternalLink>{' '}
          in Elec-Mate allows you to create and store all service records digitally. Each visit
          builds on the previous one, carrying forward the zone schedule and device list so you do
          not need to re-enter the system data each time. Historical records are always accessible,
          making it easy to track trends in detector sensitivity, battery condition, and recurring
          faults.
        </p>
      </>
    ),
  },
  {
    id: 'who-can-issue',
    heading: 'Who Can Issue Fire Alarm Certificates?',
    content: (
      <>
        <p>
          BS 5839-1 requires that fire alarm certificates are issued by a competent person.
          Competence in this context means a person who has the necessary qualifications, training,
          experience, and knowledge to carry out the work to the required standard.
        </p>
        <p>In practice, this means:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design certificates</strong> should be issued by a qualified fire alarm
                designer with knowledge of BS 5839-1, fire risk assessment principles, and the
                specific building type.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation and commissioning certificates</strong> should be issued by a
                fire alarm engineer with appropriate qualifications such as the FIA Foundation
                Certificate or C&G 1853.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verification certificates</strong> should be issued by a person or
                organisation independent of the installer, with equivalent or greater competence in
                fire alarm systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Service records</strong> should be completed by a competent fire alarm
                servicing engineer. Many clients and insurers require the servicing company to hold
                BAFE SP203-1 certification.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Third-party certification through schemes such as BAFE SP203-1 provides external
          verification of competence. Many insurers, building control bodies, and{' '}
          <SEOInternalLink href="/guides/notifiable-work-guide">notifiable work</SEOInternalLink>{' '}
          authorities require BAFE registration as a condition of accepting fire alarm work.
        </p>
      </>
    ),
  },
  {
    id: 'record-keeping',
    heading: 'Record Keeping and the Fire Safety Logbook',
    content: (
      <>
        <p>
          All fire alarm certificates and service records should be kept in the building's fire
          safety logbook. The logbook is a living document that provides a complete history of the
          fire alarm system from installation to the present day.
        </p>
        <p>The fire safety logbook should contain:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Design certificates and as-installed drawings for the fire alarm system.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Installation and commissioning certificates with all test results.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Weekly test records showing which call point was tested and the result.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Six-monthly service reports and annual inspection reports.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Records of any false alarms, faults, and remedial actions taken.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Records of any modifications or extensions to the system.</span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate stores all{' '}
          <SEOInternalLink href="/guides/electrical-certificate-retention">
            certificate records
          </SEOInternalLink>{' '}
          securely in the cloud, making it easy to retrieve historical records for any site. Clients
          can be given access to view their certificates online, eliminating the risk of paper
          logbooks being lost, damaged, or unavailable during a fire safety inspection.
        </p>
        <SEOAppBridge
          title="Digital fire alarm logbook in Elec-Mate"
          description="Replace paper logbooks with Elec-Mate's digital fire alarm record system. All certificates, service reports, and test records stored securely in the cloud. Retrieve any record instantly, share with clients, and never lose a certificate again."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FireAlarmCertificateRequirementsPage() {
  return (
    <GuideTemplate
      title="Fire Alarm Certificate Requirements | BS 5839 UK"
      description="Complete guide to fire alarm certificate requirements under BS 5839. Covers design, installation, commissioning, and verification certificates plus annual service records. What each certificate must contain and who can issue them."
      datePublished="2026-02-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Certificates"
      badgeIcon={Flame}
      heroTitle={
        <>
          Fire Alarm Certificate Requirements:{' '}
          <span className="text-yellow-400">BS 5839 UK Guide</span>
        </>
      }
      heroSubtitle="BS 5839 requires five types of certificate across the fire alarm system lifecycle: design, installation, commissioning, verification, and annual service records. This guide explains what each certificate must contain, who can issue them, and how long they must be kept."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Fire Alarm Certificates"
      relatedPages={relatedPages}
      ctaHeading="Digital Fire Alarm Certificates on Your Phone"
      ctaSubheading="Create professional BS 5839-compliant fire alarm certificates with Elec-Mate. Design, commissioning, and service report templates with instant PDF export. 7-day free trial."
    />
  );
}
