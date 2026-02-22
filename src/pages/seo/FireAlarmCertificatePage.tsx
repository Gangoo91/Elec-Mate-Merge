import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Bell,
  Smartphone,
  PenTool,
  ShieldCheck,
  Clock,
  Download,
  AlertTriangle,
  CheckCircle2,
  ListChecks,
  BookOpen,
  Zap,
  Users,
  CalendarCheck,
  ClipboardList,
  Flame,
  LayoutGrid,
} from 'lucide-react';

const PAGE_TITLE = 'Fire Alarm Certificate App | BS 5839 Compliant | Elec-Mate';
const PAGE_DESCRIPTION =
  'Create BS 5839-1 compliant fire alarm certificates on your phone. Zone schedules, cause-and-effect matrices, weekly test records, annual servicing, and professional PDF export. Start free.';

const faqs = [
  {
    question: 'What are the fire alarm system categories under BS 5839-1?',
    answer:
      'BS 5839-1 defines several categories of fire detection and alarm systems. Category L (Life protection) systems are designed to protect life and are subdivided: L1 provides detection throughout the building, L2 provides detection in defined areas (typically escape routes and rooms opening onto them, plus high-risk areas), L3 provides detection in escape routes only, L4 provides detection within escape routes that form part of the accommodation (typically flats and HMOs), and L5 provides detection in defined rooms or areas only (a bespoke category). Category P (Property protection) systems are designed to minimise damage to property: P1 provides detection throughout the building and P2 provides detection only in defined high-risk areas. Category M (Manual) systems have manual call points only with no automatic detection. Each category determines the extent of detection coverage and the types of devices required.',
  },
  {
    question: 'How often should a fire alarm system be tested?',
    answer:
      'BS 5839-1 requires a weekly test of the fire alarm system. This involves activating a different manual call point each week (on a rotation so every call point is tested over the course of the year) to verify that the sounders activate and the control panel responds correctly. In addition to weekly tests, the system must receive a full inspection and service by a competent person at least every six months, covering detector sensitivity testing, battery condition, sounder output, visual inspection of all devices, and a check of the log book. The six-monthly service visits alternate with the annual comprehensive inspection, resulting in a visit every six months — one service visit and one full inspection per year.',
  },
  {
    question: 'What is a cause-and-effect matrix for a fire alarm system?',
    answer:
      'A cause-and-effect matrix (also called a cause-and-effect drawing or document) is a table that defines exactly what happens when each detector or zone activates. For each "cause" (a specific zone, device, or group of devices going into alarm), the matrix specifies the "effects" — which sounders activate, which doors release, which dampers close, which lifts return to ground, which ventilation systems shut down, and any other automated responses. It is a critical design and commissioning document because it ensures all interfaces are correctly programmed and tested. Elec-Mate allows you to create and store cause-and-effect matrices digitally, linking them to the certificate for the premises.',
  },
  {
    question: 'What grades of fire alarm systems exist under BS 5839-6 for domestic premises?',
    answer:
      'BS 5839-6 (the domestic standard) defines grades A through F. Grade A is a system installed and maintained by a competent fire alarm company using control equipment, detectors, and sounders to BS EN 54. Grade B is a fire alarm system using control equipment to BS EN 54 but with mains-powered detectors having integral battery backup. Grade C uses mains-powered detectors with integral battery backup connected to a common supply but no control panel — a common arrangement in HMOs. Grade D uses mains-powered detectors with integral battery backup that may be interconnected but are connected to the normal domestic lighting circuit. Grade E uses battery-powered detectors that may be interconnected. Grade F is a simple battery-powered detector with no interconnection — the most basic level. Higher grades provide more reliability and are required for higher-risk domestic situations.',
  },
  {
    question: 'Can I complete fire alarm certificates on a mobile device?',
    answer:
      'Yes. Elec-Mate is specifically designed for electricians and fire alarm engineers to complete fire alarm certificates on site using a phone or tablet. The app provides the full BS 5839-1 certificate structure including system details, zone schedules, device lists, weekly test records, six-monthly service records, and annual inspection records. You can record results as you test each zone and device, capture digital signatures on completion, and export a professional PDF immediately. The app works offline, which is essential for working in large commercial buildings where mobile signal can be unreliable.',
  },
  {
    question: 'What qualifications do I need to work on fire alarm systems?',
    answer:
      'To design, install, commission, and maintain fire alarm systems to BS 5839-1, you should be a competent person with appropriate qualifications and experience. The typical route is to hold a fire alarm qualification such as the FIA (Fire Industry Association) Foundation Certificate in Fire Detection and Alarm, or the C&G 1853 qualification. Many engineers working on fire alarms are electricians who have gained additional fire alarm training and experience. Third-party certification (such as registration with BAFE, the British Approvals for Fire Equipment, under scheme SP203-1) provides external verification of competence and is often required by insurers and specifiers. The Responsible Person should verify the competence of anyone they appoint to work on their fire alarm system.',
  },
];

const howToSteps = [
  {
    name: 'Create a new fire alarm certificate',
    text: 'Open Elec-Mate and tap "New Certificate" then select "Fire Alarm" from the certificate types. Enter the site details including the premises name, address, system category (L1-L5, P1-P2, or M), system manufacturer, and the Responsible Person information.',
  },
  {
    name: 'Build the zone schedule',
    text: 'Add each zone to the schedule, recording the zone number, zone description (the area it covers), the number and type of devices in each zone (detectors, call points, sounders, interfaces), and any cause-and-effect programming associated with that zone.',
  },
  {
    name: 'Select the service type',
    text: 'Choose whether you are performing a weekly test, a six-monthly service visit, or an annual comprehensive inspection. The app adjusts the recording fields and checklists to match the requirements for each type of visit.',
  },
  {
    name: 'Record test and inspection results',
    text: 'Work through the system testing each zone and device. For weekly tests, record which call point was tested and confirm sounder operation. For service visits, record detector sensitivity readings, battery voltages, sounder output levels, and the results of visual inspections for each device.',
  },
  {
    name: 'Document any defects or non-conformities',
    text: 'Record any devices that failed, showed drift in sensitivity, had physical damage, or were obstructed. The app allows you to categorise defects by severity and generates a clear remedial actions list for the client.',
  },
  {
    name: 'Capture signatures and export',
    text: 'Add your digital signature as the testing engineer and the client or Responsible Person signature. Export the completed certificate as a professional PDF ready to email to the client or file in the premises fire safety logbook.',
  },
];

const features = [
  {
    icon: Smartphone,
    title: 'Test On Site, On Your Phone',
    description:
      'Walk through the building testing zones and devices, recording results directly into the app. No paper forms, no office re-keying.',
  },
  {
    icon: LayoutGrid,
    title: 'Zone Schedule Management',
    description:
      'Build and maintain a full zone schedule for each site. Device counts, zone descriptions, and cause-and-effect data all carry forward between visits.',
  },
  {
    icon: CalendarCheck,
    title: 'Weekly, 6-Monthly & Annual',
    description:
      'Separate workflows for weekly tests, six-monthly service visits, and annual comprehensive inspections — each with the correct fields and checklists.',
  },
  {
    icon: Flame,
    title: 'Cause-and-Effect Matrix',
    description:
      'Create and store digital cause-and-effect matrices for each system. Link zone activations to sounder outputs, door releases, dampers, and other interfaces.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 5839-1 Compliant',
    description:
      'Certificate structure and inspection checklists follow BS 5839-1:2025, the current code of practice for fire detection and alarm systems.',
  },
  {
    icon: AlertTriangle,
    title: 'Defect Categorisation',
    description:
      'Categorise defects by severity and generate a clear remedial actions report for the Responsible Person to act on.',
  },
  {
    icon: Download,
    title: 'Professional PDF Export',
    description:
      'Generate a branded certificate PDF with zone schedule, test results, defect list, and signatures. Email it from site.',
  },
  {
    icon: PenTool,
    title: 'Digital Signatures',
    description:
      'Capture engineer and client signatures on screen. The signed certificate is ready to file without printing or scanning.',
  },
  {
    icon: Clock,
    title: 'Auto-Save Protection',
    description:
      'Your work saves locally every 10 seconds and syncs to the cloud every 30 seconds. Never lose a certificate mid-inspection.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Fire Alarm Certificate App',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/tools/fire-alarm-certificate',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '127',
    bestRating: '5',
    worstRating: '1',
  },
};

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const howToSchema = {
  '@type': 'HowTo',
  name: 'How to Create a Fire Alarm Certificate Using Elec-Mate',
  description:
    'A step-by-step guide to completing a BS 5839-1 fire alarm test and inspection certificate using the Elec-Mate app on your phone or tablet.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function FireAlarmCertificatePage() {
  useSEO({
    title: 'Fire Alarm Certificate App | BS 5839 Compliant',
    description: PAGE_DESCRIPTION,
    schema: softwareAppSchema,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...howToSchema })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <Bell className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">BS 5839-1:2025 Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Digital <span className="text-yellow-400">Fire Alarm Certificates</span> on Your Phone
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            The complete fire alarm certification app for UK electricians and fire alarm engineers.
            Zone schedules, cause-and-effect matrices, weekly tests, six-monthly servicing, and
            professional PDF certificates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* What is a Fire Alarm System */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is a Fire Alarm System?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              A fire detection and alarm system is a critical life-safety installation designed to
              detect fire at the earliest possible stage and alert building occupants so they can
              evacuate safely. The system typically consists of a central control panel, automatic
              fire detectors (smoke detectors, heat detectors, or multi-sensor detectors), manual
              call points (break-glass units), audible and visual alarm devices (sounders and
              beacons), and the interconnecting cabling.
            </p>
            <p>
              In the UK, the design, installation, commissioning, and maintenance of fire alarm
              systems in non-domestic premises is governed by BS 5839-1:2025, the code of practice
              for the design, installation, commissioning, and maintenance of systems in
              non-domestic premises. For domestic premises, BS 5839-6 applies. These standards are
              referenced by the fire safety legislation and by insurers as the benchmark for
              competent fire alarm practice.
            </p>
            <p>
              A fire alarm certificate is the formal document that records the details of the
              system, the results of testing and inspection, and any defects or recommendations. It
              provides evidence that the system has been maintained by a competent person and is in
              a satisfactory condition. The Responsible Person for the premises is legally required
              to maintain fire safety systems and keep records of maintenance — the fire alarm
              certificate is the primary evidence of compliance.
            </p>
            <p>
              Fire alarm systems are not install-and-forget. Detectors accumulate dust and drift in
              sensitivity over time. Batteries degrade. Sounders can be obstructed or damaged.
              Wiring connections can loosen. Without regular testing and servicing, a fire alarm
              system that was fully functional when installed can become unreliable within a few
              years. The testing regime defined in BS 5839-1 exists to catch these issues before
              they become dangerous.
            </p>
          </div>
        </div>
      </section>

      {/* Categories and Grades */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            System Categories: L, P, and M
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              BS 5839-1 categorises fire alarm systems according to their primary purpose and the
              extent of detection coverage. Understanding these categories is essential for
              specifying, testing, and certifying systems correctly.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
            <h3 className="font-bold text-white text-lg mb-4">Category L — Life Protection</h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>L1:</strong> Detection throughout the entire building. The highest level
                  of automatic life protection. Used in premises where early detection everywhere is
                  critical — care homes, hospitals, high-rise residential buildings.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>L2:</strong> Detection in defined areas — all escape routes, all rooms
                  opening onto escape routes, and all high-risk rooms (plant rooms, kitchens, store
                  rooms). The most commonly specified category for commercial premises.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>L3:</strong> Detection in escape routes only — corridors, stairways, and
                  the areas immediately adjacent to exits. Provides warning of fire in the escape
                  route itself but does not detect fire in occupied rooms.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>L4:</strong> Detection in escape routes forming part of accommodation —
                  typically corridors and landings in flats and HMOs. The system alerts residents
                  that the shared escape route may be compromised.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>L5:</strong> Detection in specified rooms or areas only, as defined by the
                  fire risk assessment. A bespoke category that provides targeted protection where
                  the risk assessment identifies a need.
                </span>
              </li>
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 my-6">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <h3 className="font-bold text-white text-lg mb-3">
                Category P — Property Protection
              </h3>
              <div className="space-y-3 text-white text-sm leading-relaxed">
                <p>
                  <strong>P1:</strong> Detection throughout the building for the purpose of
                  protecting property. Designed to detect fire at the earliest stage before
                  significant damage occurs. Typically required by insurers for high-value premises.
                </p>
                <p>
                  <strong>P2:</strong> Detection in defined high-risk areas only. Provides targeted
                  property protection for rooms or zones identified as having a higher fire risk,
                  such as server rooms, archives, or chemical stores.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <h3 className="font-bold text-white text-lg mb-3">Category M — Manual</h3>
              <div className="space-y-3 text-white text-sm leading-relaxed">
                <p>
                  Category M systems have manual call points only — no automatic detection.
                  Occupants must discover the fire themselves and operate the nearest call point to
                  raise the alarm. This is the most basic category and is only suitable for premises
                  where occupants are alert, mobile, and familiar with the building layout.
                </p>
                <p>
                  A Category M system is often combined with a higher detection category in specific
                  areas — for example, M throughout the building with L2 detection in high-risk
                  rooms. The fire risk assessment determines the appropriate combination.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The system category must be recorded on the fire alarm certificate. It defines the
              expected extent of detection and forms the baseline for testing — the engineer checks
              that the installed system still matches the designed category and that no areas of
              coverage have been lost through detector removal, building alterations, or device
              failures.
            </p>
          </div>
        </div>
      </section>

      {/* Testing Regime */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The BS 5839-1 Testing Regime
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 5839-1 defines a structured testing and maintenance regime that includes weekly,
              monthly, six-monthly, and annual activities. Each level of testing checks different
              aspects of the system and builds on the previous level.
            </p>
            <p>
              <strong>Weekly testing</strong> is the Responsible Person's duty. Each week, a
              different manual call point is activated to confirm that the control panel responds,
              the sounders operate, and the system resets correctly. The call point used is rotated
              weekly so that every call point in the building is tested at least once per year. The
              result (date, time, call point tested, and result) must be recorded in the fire safety
              logbook.
            </p>
            <p>
              <strong>Six-monthly servicing</strong> is carried out by a competent fire alarm
              engineer. This visit includes a visual inspection of all devices, a check of the
              control panel functions, a check of the standby battery condition and voltage,
              verification that a sample of detectors are responding correctly, and a review of the
              logbook for any reported faults since the last visit.
            </p>
            <p>
              <strong>Annual comprehensive inspection</strong> includes everything in the
              six-monthly service plus a full test of every detector in the system (using
              appropriate test equipment), verification of sounder output levels in all areas, a
              check of all cause-and-effect programming, and confirmation that the system still
              matches the as-installed design (checking for building alterations that may have
              affected coverage). This is the most detailed level of inspection and generates the
              annual fire alarm certificate.
            </p>
          </div>
        </div>
      </section>

      {/* How Elec-Mate Makes It Faster */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How Elec-Mate Handles Fire Alarm Certification
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              Fire alarm certification involves complex data — zone schedules with dozens of
              devices, cause-and-effect programming, detector sensitivity readings, battery test
              results, and defect records. Managing this on paper is cumbersome and error-prone.
              Elec-Mate brings the entire process onto your phone or tablet.
            </p>
            <p>
              You build the zone schedule and device list once, and it carries forward to every
              subsequent visit. On site, you work through the system zone by zone, recording test
              results as you go. The app tracks which devices have been tested and which remain, so
              you never accidentally miss one. Detector sensitivity readings, battery voltages, and
              sounder levels are all recorded in structured fields that can be compared to previous
              visits to identify trends.
            </p>
            <p>
              When you finish, the completed certificate is ready to sign and export as a PDF before
              you leave site. The cause-and-effect matrix, zone schedule, and device list are all
              included in the document. Defects are listed with recommended actions and categorised
              by severity.
            </p>
            <p>
              Elec-Mate is part of a complete platform for UK electricians that includes 70
              electrical calculators, 8 Elec-AI agents and 12 AI tools, 36+ training courses, 8
              certificate types, and integration with Xero and QuickBooks for invoicing. Everything
              you need in one mobile-first tool.
            </p>
          </div>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* How To Section */}
      <section id="how-it-works" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            How to Create a Fire Alarm Certificate Using Elec-Mate
          </h2>
          <p className="text-white mb-8 leading-relaxed">
            Follow these steps to complete a BS 5839-1 fire alarm test and inspection certificate
            using the Elec-Mate app, from opening the form to exporting the finished PDF.
          </p>
          <div className="space-y-4">
            {howToSteps.map((step, index) => (
              <div
                key={step.name}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{step.name}</h3>
                  <p className="text-white text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Requirements */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Legal Requirements for Fire Alarm Maintenance
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Regulatory Reform (Fire Safety) Order 2005 (the FSO) places a legal duty on the
              Responsible Person to ensure that fire safety systems — including fire alarm systems —
              are properly maintained and tested. Article 17 of the FSO specifically requires that
              fire-fighting equipment, fire detectors, and fire alarms are maintained in an
              efficient state, in efficient working order, and in good repair by a competent person.
            </p>
            <p>
              The standard of maintenance expected is defined by BS 5839-1, which the FSO references
              as the appropriate code of practice. Failure to maintain a fire alarm system can
              result in enforcement action by the fire authority, including improvement notices,
              prohibition notices (which can close premises), and criminal prosecution with
              unlimited fines. In cases where failure contributes to a death, responsible persons
              can face imprisonment.
            </p>
            <p>
              Insurance policies also commonly require evidence of regular fire alarm maintenance in
              accordance with BS 5839-1. A failure to maintain can invalidate fire insurance,
              leaving the property owner exposed to uninsured losses. Many commercial leases include
              obligations on the tenant or landlord to maintain fire safety systems and produce
              certificates on request.
            </p>
            <p>
              The fire alarm certificate produced by Elec-Mate provides the documentary evidence
              that the Responsible Person needs to demonstrate compliance. It records the system
              details, the tests carried out, the results obtained, any defects found, and the
              recommended remedial actions — a complete audit trail for fire safety compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Built for Working Engineers */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Built for Working Fire Alarm Engineers
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Elec-Mate is designed by electricians for electricians and fire alarm engineers.
              Whether you are a sole trader providing fire alarm servicing for small commercial
              clients, a specialist fire alarm company servicing hundreds of systems, or an
              electrician who also covers fire alarm work, the app fits your workflow. The
              certificate forms follow BS 5839-1 and the test procedures reflect how servicing is
              actually carried out on site.
            </p>
            <p>
              The platform includes 70 electrical calculators, 8 certificate types (EICR, EIC, Minor
              Works, emergency lighting, fire alarm, EV charger, PAT testing, and solar PV), 8
              Elec-AI agents, 12 AI tools, and 36+ training courses. Xero and QuickBooks integration
              means you can raise invoices directly from completed jobs without re-entering data.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About Fire Alarm Certificates
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 text-white font-semibold text-left touch-manipulation min-h-[44px]">
                  <span>{faq.question}</span>
                  <span className="ml-4 shrink-0 text-yellow-400 text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-white text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Stop writing fire alarm certificates by hand"
        subheading="Join 430+ UK electricians creating professional digital certificates. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
