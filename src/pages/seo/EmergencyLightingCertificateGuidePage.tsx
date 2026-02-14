import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Lightbulb,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  Building2,
  Flame,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  {
    label: 'Emergency Lighting Certificate Guide',
    href: '/guides/emergency-lighting-certificate-guide',
  },
];

const tocItems = [
  { id: 'overview', label: 'Certificate Overview' },
  { id: 'completion-certificate', label: 'Completion Certificate' },
  { id: 'verification-certificate', label: 'Verification Certificate' },
  { id: 'monthly-testing', label: 'Monthly Testing Records' },
  { id: 'annual-testing', label: 'Annual Testing Records' },
  { id: 'logbook-requirements', label: 'Logbook Requirements' },
  { id: 'duration-types', label: 'System Duration Types' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 5266-1 requires a completion certificate for every new emergency lighting installation, confirming the system meets the design specification and the standard.',
  'Monthly functional tests (flick tests) must be carried out and recorded for every emergency luminaire, confirming the lamp illuminates when mains power is removed.',
  'Annual full-duration discharge tests must run the batteries to their rated duration (typically 3 hours) and record the results for every luminaire.',
  'A fire safety logbook must be maintained on site containing all emergency lighting certificates, test records, and maintenance reports.',
  'Elec-Mate provides digital emergency lighting certificate templates with monthly and annual test record sheets, automatic scheduling reminders, and professional PDF export.',
];

const faqs = [
  {
    question: 'What certificates are required for emergency lighting under BS 5266?',
    answer:
      'BS 5266-1 requires several types of documentation for emergency lighting installations. A completion certificate is required for every new installation, confirming the system has been designed, installed, and commissioned in accordance with the standard. A verification certificate may be required for complex installations where independent confirmation of compliance is needed. Ongoing monthly and annual test records must be maintained for the lifetime of the installation. All certificates and records should be kept in the fire safety logbook at the premises.',
  },
  {
    question: 'How often must emergency lighting be tested?',
    answer:
      'BS 5266-1 requires two levels of regular testing. Monthly functional tests (also called flick tests) involve switching off the mains supply to each luminaire for a brief period (long enough to confirm it illuminates on battery power, typically a few seconds) and recording the result. Annual full-duration discharge tests require running the batteries to their rated duration — typically 3 hours for most commercial installations, though 1-hour systems exist in some applications. The annual test confirms the batteries can sustain illumination for the full rated period. Results of both test types must be recorded in the logbook.',
  },
  {
    question: 'Who can issue an emergency lighting completion certificate?',
    answer:
      'The completion certificate should be issued by a competent person — someone with the necessary qualifications, training, and experience to design, install, and commission emergency lighting systems to BS 5266-1. This is typically an electrician or electrical contractor with specific knowledge of emergency lighting requirements. Third-party certification through schemes such as NICEIC, NAPIT, or ELECSA provides external verification of competence. The certificate should be signed by the person who carried out or supervised the work.',
  },
  {
    question: 'What is the difference between maintained and non-maintained emergency lighting?',
    answer:
      'Maintained emergency lighting luminaires are permanently illuminated during normal occupied hours (like standard light fittings) and continue to operate on battery power when the mains supply fails. They serve a dual purpose as both normal lighting and emergency lighting. Non-maintained emergency lighting luminaires are only illuminated when the mains supply fails — they remain off during normal operation. Non-maintained is the most common type in commercial premises. There are also sustained luminaires, which contain two lamps: one for normal lighting and one that only operates in emergency mode. The type of system must be recorded on the completion certificate.',
  },
  {
    question: 'Can emergency lighting test records be kept digitally?',
    answer:
      'Yes. BS 5266-1 does not require records to be kept on paper. Digital records are fully acceptable provided they contain all the required information, are dated, and can be produced for inspection by the fire and rescue service when required. Elec-Mate provides digital emergency lighting test record templates that can be completed on a phone or tablet during testing. Results are stored in the cloud and can be exported as PDF reports for the client or fire safety logbook. Digital records are easier to search, share, and protect from loss than paper logbooks.',
  },
  {
    question: 'What happens if emergency lighting test records are not maintained?',
    answer:
      "Failure to maintain emergency lighting test records is a breach of the Regulatory Reform (Fire Safety) Order 2005. The fire and rescue service can issue an enforcement notice requiring the Responsible Person to demonstrate compliance. If records cannot be produced, the fire authority may require a full inspection and test of the emergency lighting system, including a full-duration discharge test of every luminaire, at the Responsible Person's expense. In serious cases, a prohibition notice can be served, preventing use of the premises until the deficiency is remedied. Missing records can also invalidate fire insurance.",
  },
  {
    question: 'Does emergency lighting need its own certificate or is it covered by the EIC?',
    answer:
      'Emergency lighting should have its own dedicated completion certificate to BS 5266-1, separate from the Electrical Installation Certificate (EIC) issued under BS 7671. While the electrical wiring for the emergency lighting system is covered by the EIC, the emergency lighting-specific requirements — luminaire positions, illumination levels, escape route coverage, duration testing, and battery performance — are not part of the EIC scope. The BS 5266-1 completion certificate specifically addresses these emergency lighting requirements and provides the documented evidence of compliance that the fire authority and insurers require.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate App',
    description:
      'Create digital emergency lighting certificates on your phone with BS 5266 compliance and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-5266-emergency-lighting-standard',
    title: 'BS 5266 Emergency Lighting Standard',
    description:
      'Complete guide to BS 5266 covering system types, luminaire positioning, duration requirements, and testing intervals.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/fire-alarm-certificate-requirements',
    title: 'Fire Alarm Certificate Requirements',
    description:
      'BS 5839 fire alarm certificate requirements including design, commissioning, verification, and annual service records.',
    icon: Flame,
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
    href: '/guides/eicr-for-commercial-premises',
    title: 'EICR for Commercial Premises',
    description:
      'Commercial EICR requirements including emergency lighting inspection as part of the periodic condition report.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/training/emergency-lighting',
    title: 'Emergency Lighting Course',
    description:
      'Structured training covering BS 5266 requirements, luminaire types, testing procedures, and certification.',
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
    heading: 'Emergency Lighting Certificate Requirements: Overview',
    content: (
      <>
        <p>
          Emergency lighting is a critical life-safety system that provides illumination when the
          normal mains lighting fails, enabling occupants to evacuate a building safely. BS 5266-1
          is the UK code of practice for the emergency lighting of premises and sets out the
          requirements for design, installation, testing, and certification.
        </p>
        <p>
          Proper certification and testing records are essential for demonstrating compliance with
          the{' '}
          <SEOInternalLink href="/guides/electricity-at-work-regulations">
            Regulatory Reform (Fire Safety) Order 2005
          </SEOInternalLink>{' '}
          and satisfying the requirements of building insurers. The key documentation requirements
          are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Completion certificate</strong> — issued on completion of a new emergency
                lighting installation, confirming compliance with BS 5266-1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verification certificate</strong> — an independent confirmation of
                compliance for complex or high-risk installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly test records</strong> — documenting the results of functional tests
                carried out every month.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual test records</strong> — documenting the results of full-duration
                discharge tests carried out annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety logbook</strong> — the central record keeping all emergency
                lighting documentation for the premises.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This guide explains each documentation requirement in detail, covering what must be
          recorded, who is responsible, and how Elec-Mate simplifies the entire process.
        </p>
      </>
    ),
  },
  {
    id: 'completion-certificate',
    heading: 'Completion Certificate',
    content: (
      <>
        <p>
          The completion certificate is issued when a new emergency lighting installation is
          completed and commissioned. It confirms that the system has been designed and installed in
          accordance with BS 5266-1 and that it meets the specified requirements for the building.
        </p>
        <p>The completion certificate must include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Premises details — name, address, floor areas, number of storeys, and the normal
                occupancy of the building.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                System type — maintained, non-maintained, or sustained, and whether it is a central
                battery system or self-contained luminaires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Rated duration — the period for which the system is designed to operate on battery
                power (typically 1 hour or 3 hours).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Schedule of luminaires — location, type, wattage, and luminaire reference for every
                emergency luminaire in the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Commissioning test results — confirmation that every luminaire illuminated correctly
                on battery power and that illumination levels on escape routes met the minimum 1 lux
                requirement.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The completion certificate is a formal document that should be signed by the installing
          contractor and handed to the Responsible Person. It forms part of the building's fire
          safety documentation and may be requested by building control, the fire authority, or
          insurers.
        </p>
      </>
    ),
  },
  {
    id: 'verification-certificate',
    heading: 'Verification Certificate',
    content: (
      <>
        <p>
          A verification certificate provides independent confirmation that the emergency lighting
          installation complies with BS 5266-1. It is issued by a competent person who was not
          involved in the design or installation of the system.
        </p>
        <p>Verification is particularly important for:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Large commercial buildings with complex escape routes where incorrect luminaire
                positioning could endanger life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Buildings with sleeping accommodation (hotels, care homes, hospitals) where
                occupants may be unfamiliar with the escape routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                High-risk premises where the{' '}
                <SEOInternalLink href="/guides/fire-alarm-certificate-requirements">
                  fire authority or insurer
                </SEOInternalLink>{' '}
                requires independent verification as a condition of approval.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The verifier checks the luminaire positions against the building layout, confirms
          illumination levels on escape routes, verifies that exit signs are correctly positioned
          and visible, and reviews the commissioning test results. The verification certificate is
          issued alongside the completion certificate and both are retained in the fire safety
          logbook.
        </p>
      </>
    ),
  },
  {
    id: 'monthly-testing',
    heading: 'Monthly Testing Records',
    content: (
      <>
        <p>
          BS 5266-1 requires a monthly functional test of every emergency luminaire. This test
          confirms that each luminaire switches to battery power when the mains supply is
          interrupted and that it produces light.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Monthly Test Procedure</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Simulate a mains supply failure to each emergency luminaire — either by using the
                test button on self-contained luminaires or by switching off the supply circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Confirm each luminaire illuminates on battery power. The test only needs to run long
                enough to verify operation — typically a few seconds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Record the result for each luminaire — pass, fail, or not tested (with reason).
                Record any luminaires with dim output, flickering, or complete failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Restore mains power and confirm all luminaires return to normal standby mode (for
                non-maintained types) or normal illumination (for maintained types).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Monthly test records must include the date of the test, the name of the person carrying
          out the test, the result for each luminaire, and details of any defects found. Failed
          luminaires must be repaired or replaced promptly and the remedial action recorded.
        </p>
        <SEOAppBridge
          title="Monthly emergency lighting test records on your phone"
          description="Elec-Mate's emergency lighting module lets you record monthly test results on site. Tap through each luminaire, record pass or fail, and the app tracks which luminaires need attention. Automatic scheduling reminders ensure you never miss a test."
          icon={Clock}
        />
      </>
    ),
  },
  {
    id: 'annual-testing',
    heading: 'Annual Full-Duration Discharge Testing',
    content: (
      <>
        <p>
          The annual full-duration discharge test is the most comprehensive test of the emergency
          lighting system. BS 5266-1 requires every emergency luminaire to be tested for its full
          rated duration — typically 3 hours for most commercial installations.
        </p>
        <p>
          The purpose of the annual test is to verify that the batteries in each luminaire can
          sustain illumination for the full rated period. Battery capacity degrades over time, and
          the annual test identifies luminaires whose batteries can no longer deliver the required
          duration.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Annual Test Requirements</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full-duration discharge</strong> — the mains supply to all emergency
                luminaires is switched off and the system runs on battery power for the full rated
                duration (1 hour or 3 hours).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Luminaire check at end of duration</strong> — at the end of the rated
                period, every luminaire is checked to confirm it is still illuminated. Any luminaire
                that has gone dark before the rated duration has expired has failed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recharge time</strong> — after the test, mains power is restored and the
                system should be left to recharge for at least 24 hours before the building is
                occupied. This must be planned around building usage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Results recording</strong> — every luminaire must be individually recorded
                as pass or fail, with failed luminaires requiring battery replacement or unit
                replacement.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The annual discharge test must be planned carefully. During the test, the building has no
          functioning emergency lighting, so it should be carried out when the building is
          unoccupied or during minimal occupancy. The 24-hour recharge period must also be factored
          into the schedule — if the test is carried out on a Friday evening, the system will be
          recharged by Monday morning.
        </p>
      </>
    ),
  },
  {
    id: 'logbook-requirements',
    heading: 'Logbook Requirements',
    content: (
      <>
        <p>
          BS 5266-1 requires that a logbook is maintained for every emergency lighting installation.
          The logbook is the central record of the system's history and is the primary evidence of
          compliance with fire safety legislation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Logbook Contents</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Completion certificate and as-installed drawings showing luminaire positions and
                circuit details.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Schedule of luminaires with reference numbers, types, locations, and battery details
                for each unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Monthly test records showing the date, tester, and pass/fail result for each
                luminaire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Annual full-duration discharge test records showing the date, duration, and
                pass/fail result for each luminaire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Defect records and remedial actions — any luminaires that failed testing, the date
                the defect was reported, and the date it was rectified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Modification records — any changes to the installation, including luminaires added,
                relocated, or removed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The logbook must be kept at the premises and available for inspection. Elec-Mate replaces
          the paper logbook with a{' '}
          <SEOInternalLink href="/tools/emergency-lighting-certificate">
            digital emergency lighting record system
          </SEOInternalLink>{' '}
          that stores all records securely in the cloud while remaining accessible from any device.
          Records can be exported as PDF reports for building managers, landlords, or fire safety
          inspectors.
        </p>
      </>
    ),
  },
  {
    id: 'duration-types',
    heading: 'System Duration Types: 1 Hour vs 3 Hours',
    content: (
      <>
        <p>
          BS 5266-1 specifies different rated durations for emergency lighting systems depending on
          the building type and usage. The two most common durations are:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">1-Hour Duration</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                Used in premises where the building can be evacuated immediately and will not be
                reoccupied until the mains supply is restored. Suitable for some smaller commercial
                premises with straightforward evacuation procedures.
              </p>
              <p>
                The 1-hour duration is less common and must be specifically justified in the design.
                Most specifiers default to 3 hours.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">3-Hour Duration</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                The standard duration for most commercial and public buildings. Provides
                illumination for evacuation and for a period afterwards to allow investigation and
                repair of the mains supply failure.
              </p>
              <p>
                3-hour duration is required for sleeping accommodation (hotels, hospitals, care
                homes) and for any premises where a phased evacuation may be needed.
              </p>
            </div>
          </div>
        </div>
        <p>
          The rated duration must be recorded on the completion certificate and is the benchmark for
          the annual full-duration discharge test. Self-contained luminaires have the rated duration
          printed on the unit — typically on a label near the battery compartment.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for Emergency Lighting Certification',
    content: (
      <>
        <p>
          Emergency lighting certification is a legal requirement under several pieces of UK
          legislation. The{' '}
          <SEOInternalLink href="/guides/electricity-at-work-regulations">
            Regulatory Reform (Fire Safety) Order 2005
          </SEOInternalLink>{' '}
          places a duty on the Responsible Person to provide and maintain emergency lighting as part
          of the fire safety measures for the premises.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Legal Framework</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire Safety Order 2005</strong> — requires the Responsible Person to ensure
                emergency escape lighting is provided and maintained. Records of maintenance must be
                kept and available for inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Approved Document B</strong> — requires emergency
                lighting in new buildings and material alterations, referencing BS 5266-1 as the
                standard to be followed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace (Health, Safety and Welfare) Regulations 1992</strong> — requires
                adequate emergency lighting in workplaces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing Act 2004</strong> — for HMOs, emergency lighting is typically a
                condition of the HMO licence, with specific requirements set by the local authority.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Failure to maintain emergency lighting and keep proper records can result in enforcement
          action by the fire and rescue service, including improvement notices, prohibition notices,
          and prosecution. Unlimited fines can be imposed for serious breaches. Building insurers
          also commonly require evidence of regular emergency lighting testing as a condition of the
          fire insurance policy.
        </p>
        <SEOAppBridge
          title="Stay compliant with digital emergency lighting records"
          description="Elec-Mate's emergency lighting module ensures you never miss a test. Automatic monthly and annual test reminders, digital record keeping, and professional PDF reports. Demonstrate compliance to the fire authority with one tap."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EmergencyLightingCertificateGuidePage() {
  return (
    <GuideTemplate
      title="Emergency Lighting Certificate Guide | BS 5266 UK"
      description="Complete guide to emergency lighting certificate requirements under BS 5266. Covers completion certificates, verification, monthly and annual testing records, logbook requirements, and legal obligations for UK premises."
      datePublished="2026-02-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Certificates"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Emergency Lighting Certificate Guide: <span className="text-yellow-400">BS 5266 UK</span>
        </>
      }
      heroSubtitle="BS 5266-1 requires completion certificates, monthly functional test records, and annual full-duration discharge test records for every emergency lighting installation. This guide explains what each document must contain, who is responsible, and how to keep compliant records."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Emergency Lighting Certificates"
      relatedPages={relatedPages}
      ctaHeading="Digital Emergency Lighting Certificates on Your Phone"
      ctaSubheading="Create professional BS 5266-compliant emergency lighting certificates with Elec-Mate. Completion certificates, monthly test records, and annual discharge reports with instant PDF export. 7-day free trial."
    />
  );
}
