import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Flashlight,
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
  Timer,
  Battery,
  CalendarCheck,
  ClipboardList,
} from 'lucide-react';

const PAGE_TITLE = 'Emergency Lighting Certificate App | BS 5266 Compliant | Elec-Mate';
const PAGE_DESCRIPTION =
  'Create BS 5266-1 compliant emergency lighting certificates on your phone. Monthly function tests, annual duration tests, luminaire schedules, and professional PDF export. Start free.';

const faqs = [
  {
    question: 'How often should emergency lighting be tested?',
    answer:
      'BS 5266-1 requires two types of routine testing. A brief function test must be carried out monthly — this involves simulating a mains failure for long enough to confirm that each luminaire illuminates, typically a few seconds. An annual full-duration test must also be performed, where the system is run on battery power for its full rated duration (usually 3 hours for most commercial premises) to verify that all luminaires remain lit for the entire period. Between these formal tests, a daily visual check is also recommended to confirm that any central system indicators show normal operation.',
  },
  {
    question: 'What is the difference between maintained and non-maintained emergency lighting?',
    answer:
      'Maintained emergency luminaires are lit at all times — both during normal mains supply and during a power failure. They serve as normal room lighting as well as emergency lighting. Non-maintained luminaires only illuminate when the normal mains supply fails. They remain off during normal operation and switch on automatically when a power cut is detected. A third type, sustained, has two lamps — one that operates as normal lighting and one that only activates during an emergency. The choice depends on the application: maintained fittings are required in places of entertainment such as cinemas and theatres, while non-maintained fittings are common in offices, schools, and standard commercial premises.',
  },
  {
    question: 'What is the 3-hour duration requirement for emergency lighting?',
    answer:
      'BS 5266-1 specifies that emergency lighting must remain operational for a minimum period after mains failure. For most premises, the standard duration is 3 hours. This covers the time needed for safe evacuation plus a margin for the building to be checked and made safe. Some premises with sleeping risk (such as hotels and hospitals) may also require 3-hour duration. Smaller premises with rapid evacuation times may use 1-hour rated luminaires in some cases, but 3 hours is the default requirement and the most commonly specified duration. During the annual full-duration test, the system must demonstrate it can sustain illumination for the full rated period.',
  },
  {
    question: 'Who is responsible for emergency lighting testing?',
    answer:
      'The Responsible Person under the Regulatory Reform (Fire Safety) Order 2005 is legally responsible for ensuring emergency lighting is properly maintained and tested. In practice, this is typically the building owner, employer, or managing agent. They must appoint a competent person to carry out the testing — this is usually an electrician or fire alarm engineer with the necessary qualifications and experience. The Responsible Person must keep records of all tests and make them available for inspection by the fire authority. Elec-Mate helps electricians produce these records digitally, creating a clear audit trail for compliance.',
  },
  {
    question: 'Can I complete emergency lighting certificates on a mobile device?',
    answer:
      'Yes. Elec-Mate is designed for electricians to complete emergency lighting test certificates on site using a phone or tablet. The app provides the full BS 5266-1 certificate structure including luminaire schedules, test records for both monthly function tests and annual duration tests, battery condition assessments, and photometric compliance notes. You can record results as you move through the building, capture digital signatures on completion, and export a professional PDF immediately. The app works offline, so you can complete certificates in basements, plant rooms, and other areas with poor signal.',
  },
  {
    question: 'What lux levels are required for emergency escape lighting?',
    answer:
      'BS 5266-1 and BS EN 1838 specify minimum illuminance levels for emergency escape routes. Along defined escape routes, the minimum horizontal illuminance at floor level must be at least 1 lux on the centre line of the route. The uniformity ratio (maximum to minimum illuminance) must not exceed 40:1 to avoid excessively bright and dark spots. For anti-panic areas (open areas larger than 60 square metres), the minimum illuminance must be 0.5 lux at floor level. High-risk task areas require a minimum of 10% of the normal maintained illuminance or 15 lux, whichever is greater. These requirements ensure people can safely navigate to exits during a power failure.',
  },
];

const howToSteps = [
  {
    name: 'Create a new emergency lighting certificate',
    text: 'Open Elec-Mate and tap "New Certificate" then select "Emergency Lighting" from the certificate types. Enter the site details including building name, address, and the Responsible Person information.',
  },
  {
    name: 'Build the luminaire schedule',
    text: 'Add each emergency luminaire to the schedule, recording its location, type (maintained, non-maintained, or sustained), rated duration, lamp type, and unique reference number. The app maintains a running list that carries forward between tests.',
  },
  {
    name: 'Select the test type',
    text: 'Choose whether you are performing a monthly function test or an annual full-duration test. The app adjusts the recording fields accordingly — a brief pass/fail for monthly tests, or detailed duration and battery performance data for annual tests.',
  },
  {
    name: 'Record test results for each luminaire',
    text: 'Work through the building testing each luminaire. For monthly tests, record whether it illuminated correctly when mains was simulated off. For annual tests, record the start time, confirm illumination at intervals, and note the end time to verify full-duration operation.',
  },
  {
    name: 'Note any defects or failures',
    text: 'Record any luminaires that failed to illuminate, showed reduced brightness, had damaged diffusers, or failed before the rated duration expired. The app flags these as requiring remedial action and includes them in the summary.',
  },
  {
    name: 'Capture signatures and export',
    text: 'Add your digital signature as the testing engineer and the client or Responsible Person signature. Export the completed certificate as a professional PDF ready to email to the client or file for the premises logbook.',
  },
];

const features = [
  {
    icon: Smartphone,
    title: 'Test On Site, On Your Phone',
    description:
      'Walk through the building testing luminaires and recording results directly into the app. No paper forms, no double-handling.',
  },
  {
    icon: Timer,
    title: 'Monthly & Annual Tests',
    description:
      'Separate workflows for monthly function tests and annual full-duration tests, each with the correct fields and validation.',
  },
  {
    icon: Battery,
    title: 'Battery Duration Tracking',
    description:
      'Record battery start and end times during annual tests. The app calculates duration and flags any luminaire that fails before its rated period.',
  },
  {
    icon: ListChecks,
    title: 'Luminaire Schedule Management',
    description:
      'Build and maintain a complete luminaire schedule for each site. Carries forward between visits so you never re-enter static data.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 5266-1 Compliant',
    description:
      'Certificate structure and test requirements follow BS 5266-1:2016 — the current code of practice for the emergency lighting of premises.',
  },
  {
    icon: CalendarCheck,
    title: 'Test Scheduling Reminders',
    description:
      'Set reminders for the next monthly or annual test. Never miss a testing interval and keep your clients compliant.',
  },
  {
    icon: Download,
    title: 'Professional PDF Export',
    description:
      'Generate a clean certificate PDF with your company branding, luminaire schedule, test results, and signatures. Email it from site.',
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
      'Your work saves locally every 10 seconds and syncs to the cloud every 30 seconds. A dropped phone or flat battery will not lose your data.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Emergency Lighting Certificate App',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/tools/emergency-lighting-certificate',
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
  name: 'How to Create an Emergency Lighting Certificate Using Elec-Mate',
  description:
    'A step-by-step guide to completing a BS 5266-1 emergency lighting test certificate using the Elec-Mate app on your phone or tablet.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function EmergencyLightingCertificatePage() {
  useSEO({
    title: 'Emergency Lighting Certificate App | BS 5266 Compliant',
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
            <Flashlight className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">BS 5266-1:2016 Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Digital <span className="text-yellow-400">Emergency Lighting Certificates</span> on Your
            Phone
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            The complete emergency lighting testing app for UK electricians. Monthly function tests,
            annual duration tests, luminaire schedules, and professional PDF certificates — all from
            your mobile device.
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

      {/* What is Emergency Lighting Testing */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is Emergency Lighting Testing?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Emergency lighting is a critical life-safety system designed to illuminate escape
              routes and open areas when the normal mains supply fails. In the event of a power cut,
              fire, or other emergency, occupants must be able to see clearly enough to navigate
              safely to the nearest exit. Emergency lighting provides this illumination
              automatically, powered by batteries that charge continuously from the mains and
              activate the moment the supply is interrupted.
            </p>
            <p>
              Like any safety-critical system, emergency lighting must be tested regularly to ensure
              it will function when needed. A luminaire that has been sitting dormant for months may
              have a failed lamp, a degraded battery, or a faulty charging circuit — none of which
              would be apparent without testing. The consequences of an untested system failing
              during a real emergency can be catastrophic, particularly in premises with large
              numbers of occupants, complex escape routes, or people with mobility impairments.
            </p>
            <p>
              Emergency lighting testing in the UK is governed by BS 5266-1:2016, the code of
              practice for the emergency lighting of premises. This standard specifies the types of
              tests required, the frequencies at which they must be performed, the records that must
              be kept, and the criteria for acceptable performance. It works alongside BS EN 1838
              (which specifies photometric requirements), BS EN 50172 (which covers application and
              design), and the Regulatory Reform (Fire Safety) Order 2005 (which establishes the
              legal duty to maintain fire safety systems including emergency lighting).
            </p>
            <p>
              An emergency lighting test certificate is the formal document that records the results
              of these tests. It provides evidence that the system has been inspected and tested by
              a competent person and documents any deficiencies found. This certificate is a legal
              record — the Responsible Person for the premises must retain it and make it available
              for inspection by the fire authority.
            </p>
          </div>
        </div>
      </section>

      {/* BS 5266-1 Testing Requirements */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            BS 5266-1 Testing Requirements Explained
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 5266-1:2016 defines a clear testing regime with two primary test types: the monthly
              function test and the annual full-duration test. Each serves a different purpose and
              requires different procedures and recording methods.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 my-8">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
                  <Timer className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-white text-lg">Monthly Function Test</h3>
              </div>
              <div className="space-y-3 text-white text-sm leading-relaxed">
                <p>
                  The monthly function test is a brief operational check. The mains supply to the
                  emergency lighting is interrupted (either by a dedicated test switch, a key-switch
                  on the luminaire, or via an automatic test system) for long enough to confirm that
                  each luminaire switches on and produces light. The test duration should be kept as
                  short as practicable — typically a few seconds — to avoid unnecessarily
                  discharging the batteries.
                </p>
                <p>
                  During the test, the engineer checks that each luminaire illuminates, that the
                  light output appears normal (not dim or flickering), that the luminaire lens or
                  diffuser is undamaged, and that the charging indicator (if visible) shows normal
                  operation. Any luminaire that fails to illuminate or shows abnormal behaviour must
                  be recorded and reported for remedial action.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                  <Battery className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-bold text-white text-lg">Annual Full-Duration Test</h3>
              </div>
              <div className="space-y-3 text-white text-sm leading-relaxed">
                <p>
                  The annual full-duration test is the comprehensive check. The emergency lighting
                  system is operated on battery power for its full rated duration — typically 3
                  hours for most commercial premises. This verifies that the batteries can sustain
                  the luminaires for the entire required period without unacceptable loss of light
                  output.
                </p>
                <p>
                  The engineer records the time the test starts, checks each luminaire at intervals
                  during the test period, and notes the condition at the end of the rated duration.
                  Any luminaire that fails or dims significantly before the end of the test period
                  has a battery that needs replacing. The annual test must be followed by a period
                  of recharging (typically 24 hours) during which the system may have reduced
                  capacity, so the test should be planned to minimise risk.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              In addition to these two primary tests, BS 5266-1 recommends a daily check of any
              central system indicators (such as a central battery system status panel) to confirm
              normal operation. For self-contained luminaires with visible charge indicators, a
              visual check that the indicator shows the unit is charging normally should be included
              in routine building maintenance.
            </p>
            <p>
              The standard also requires that a completion certificate is issued when a new
              emergency lighting system is installed, recording the design standard, the system
              type, and the initial verification test results. Subsequent periodic test certificates
              then build on this baseline, creating a continuous record of the system performance
              throughout its life.
            </p>
          </div>
        </div>
      </section>

      {/* Luminaire Types */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Types of Emergency Luminaires
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              Understanding the different types of emergency luminaires is essential for accurate
              testing and certification. Each type behaves differently during a test and has
              different maintenance considerations.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <h3 className="font-bold text-white text-lg mb-3">Non-Maintained</h3>
              <p className="text-white text-sm leading-relaxed">
                Only illuminates when the mains supply fails. The lamp is off during normal
                operation. Most common type in offices, schools, shops, and standard commercial
                premises. During testing, the luminaire should switch on automatically when the test
                switch is operated.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <h3 className="font-bold text-white text-lg mb-3">Maintained</h3>
              <p className="text-white text-sm leading-relaxed">
                Illuminated at all times — during normal operation and during a power failure.
                Required in places of entertainment such as cinemas, theatres, and concert venues.
                The lamp runs from mains during normal operation and switches to battery power
                during a failure.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <h3 className="font-bold text-white text-lg mb-3">Sustained</h3>
              <p className="text-white text-sm leading-relaxed">
                Contains two lamps — one for normal lighting (mains-powered) and one for emergency
                use (battery-powered). The emergency lamp only activates during a mains failure.
                Used where the fitting serves a dual purpose for both normal and emergency lighting
                functions.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-white leading-relaxed">
            <p>
              Self-contained luminaires have their own battery built into or adjacent to the
              fitting. Central battery systems use a large battery bank (often in a plant room) that
              powers multiple luminaires via a dedicated circuit. Both types are valid under BS
              5266-1, but they have different testing procedures. Self-contained units are tested
              individually, while central systems are tested as a whole by switching the central
              supply.
            </p>
            <p>
              Modern LED emergency luminaires offer significant advantages over older fluorescent
              types — longer battery life, lower power consumption, faster recharge times, and more
              consistent light output over the battery discharge cycle. When surveying and testing
              systems, Elec-Mate allows you to record the lamp type, rated duration, and battery
              technology for each luminaire in the schedule.
            </p>
          </div>
        </div>
      </section>

      {/* The 3-Hour Duration Requirement */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The 3-Hour Duration Requirement
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The rated duration of an emergency lighting system is the minimum time it must remain
              operational after a mains failure. For most commercial, industrial, and public
              premises in the UK, BS 5266-1 specifies a 3-hour minimum duration. This covers the
              time needed for a full evacuation, the time for the fire service or building
              management to carry out a search of the building, and a safety margin.
            </p>
            <p>
              A 1-hour duration is sometimes acceptable for premises where evacuation can be
              completed quickly and the building will not be re-entered until mains power is
              restored. However, 3 hours is the standard default and the most commonly specified
              duration for new installations. Most self-contained emergency luminaires sold in the
              UK are rated for 3-hour operation.
            </p>
            <p>
              During the annual full-duration test, the system must demonstrate it can sustain
              adequate illumination for the entire rated period. If a luminaire dims significantly
              or fails before the 3-hour mark, its battery is at end of life and must be replaced.
              Battery degradation is gradual — a new NiCd or NiMH battery may last 4 to 5 years
              before its capacity drops below the level needed for the full-duration test. Lithium
              iron phosphate (LiFePO4) batteries in modern LED luminaires may last longer. Regular
              annual testing catches battery degradation before it becomes a safety issue.
            </p>
          </div>
        </div>
      </section>

      {/* How Elec-Mate Makes It Faster */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How Elec-Mate Digitalises Emergency Lighting Testing
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              Traditional emergency lighting testing involves walking the building with a clipboard
              and paper form, ticking off luminaires one by one, then returning to the office to
              type the results into a certificate. This double-handling is slow, error-prone, and
              generates paper records that are easily lost. Elec-Mate eliminates every step of this
              process.
            </p>
            <p>
              With Elec-Mate, you build the luminaire schedule once and it carries forward to every
              subsequent test visit. On site, you walk through the building with your phone, tapping
              each luminaire in the schedule as you test it. The app records the time, result, and
              any notes for each unit. For annual tests, you can start the timer and the app tracks
              the elapsed duration automatically.
            </p>
            <p>
              When you finish, the completed certificate is ready to sign and export as a PDF before
              you leave site. No office work, no handwriting to decipher, no risk of losing the
              paperwork. The certificate is stored in the cloud and accessible from any device,
              creating a permanent digital audit trail for the premises.
            </p>
            <p>
              Elec-Mate is part of a complete platform for UK electricians that includes 70
              electrical calculators, 8 Elec-AI agents and 12 AI tools, 36+ training courses, 8
              certificate types, and integration with Xero and QuickBooks for invoicing. It replaces
              the stack of paper forms, the separate calculator app, and the desktop certificate
              software — all in one mobile-first tool.
            </p>
          </div>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* How To Section */}
      <section id="how-it-works" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            How to Create an Emergency Lighting Certificate Using Elec-Mate
          </h2>
          <p className="text-white mb-8 leading-relaxed">
            Follow these steps to complete a BS 5266-1 emergency lighting test certificate using the
            Elec-Mate app, from opening the form to exporting the finished PDF.
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
            Legal Requirements for Emergency Lighting
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The legal framework for emergency lighting in the UK is established primarily by the
              Regulatory Reform (Fire Safety) Order 2005 (the FSO), which applies to all
              non-domestic premises in England and Wales. Similar legislation applies in Scotland
              under the Fire (Scotland) Act 2005 and in Northern Ireland under the Fire and Rescue
              Services (Northern Ireland) Order 2006.
            </p>
            <p>
              The FSO requires the Responsible Person (typically the employer, building owner, or
              managing agent) to carry out a fire risk assessment and implement appropriate fire
              safety measures, which includes the provision and maintenance of emergency lighting.
              Article 14 specifically requires that emergency routes and exits are provided with
              adequate emergency lighting. Article 17 requires that fire safety equipment and
              facilities (including emergency lighting) are maintained in an efficient state, in
              efficient working order, and in good repair.
            </p>
            <p>
              Failure to comply with the FSO can result in enforcement notices, prohibition notices
              (which can close a building), and criminal prosecution. Fines are unlimited and, where
              a failure results in death, responsible persons can face imprisonment. The fire
              authority (usually the local fire and rescue service) has the power to inspect
              premises and request evidence of maintenance, including emergency lighting test
              records.
            </p>
            <p>
              Beyond the FSO, the Health and Safety at Work etc. Act 1974 and the Workplace (Health,
              Safety and Welfare) Regulations 1992 also require adequate emergency lighting in
              workplaces. Building Regulations Approved Document B (Fire Safety) specifies emergency
              lighting requirements for new buildings and major refurbishments, referencing BS
              5266-1 as the applicable standard.
            </p>
          </div>
        </div>
      </section>

      {/* Built for Working Electricians */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Built for Working Electricians
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Elec-Mate is designed by electricians for electricians. Whether you are a sole trader
              providing emergency lighting testing for small commercial clients, a fire alarm and
              emergency lighting specialist, or part of a larger facilities management team, the app
              fits your workflow. The certificate forms follow BS 5266-1 and the test procedures
              reflect how testing is actually carried out on site.
            </p>
            <p>
              The platform includes 70 electrical calculators covering cable sizing, voltage drop,
              maximum demand, diversity, conduit and trunking fill, prospective fault current, and
              more. Combined with 8 certificate types — including EICR, EIC, Minor Works, emergency
              lighting, fire alarm, and EV charger certificates — plus 8 Elec-AI agents and 12 AI
              tools, it replaces multiple separate tools with one integrated system. Xero and
              QuickBooks integration means you can raise invoices directly from completed jobs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About Emergency Lighting Testing
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
        heading="Stop writing emergency lighting certificates by hand"
        subheading="Join 430+ UK electricians creating professional digital certificates. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
