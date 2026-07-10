import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Smartphone,
  Fingerprint,
  FileCheck2,
  Calculator,
  GraduationCap,
  Camera,
  WifiOff,
  Shield,
  Zap,
  Star,
  Brain,
  Building,
  Download,
  Bell,
} from 'lucide-react';

export default function ElectricianAppForiPhonePage() {
  return (
    <ToolTemplate
      title="Best Electrician App for iPhone 2026 | Elec-Mate iOS"
      description="Elec-Mate is the best electrician app for iPhone in 2026. Native iOS experience with Face ID, 16 certificate types, AI board scanner…"
      datePublished="2026-01-12"
      dateModified="2026-06-10"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Electrician App for iPhone', href: '/tools/electrician-app-iphone' },
      ]}
      tocItems={[
        { id: 'why-iphone', label: 'Why iPhone Electricians Choose Elec-Mate' },
        { id: 'native-ios', label: 'Native iOS Experience' },
        { id: 'certificates-iphone', label: 'Certificates on iPhone' },
        { id: 'calculators-iphone', label: 'Calculators on iPhone' },
        { id: 'training-iphone', label: 'Training on iPhone' },
        { id: 'offline-iphone', label: 'Offline Mode on iPhone' },
        { id: 'how-to', label: 'Getting Started' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="iPhone App"
      badgeIcon={Smartphone}
      heroTitle={
        <>
          Best <span className="text-yellow-400">Electrician App for iPhone</span> 2026
        </>
      }
      heroSubtitle="Elec-Mate on iPhone gives you the full toolkit — 16 certificate types with AI board scanner and voice test entry, 70+ BS 7671 calculators, 46+ training courses, offline mode, and professional business tools. Native iOS experience with Face ID, haptic feedback, and smooth animations. Built for UK electricians who work from their phone."
      heroFeaturePills={[
        { icon: Smartphone, label: 'Native iOS' },
        { icon: Fingerprint, label: 'Face ID' },
        { icon: FileCheck2, label: '16 Certificate Types' },
        { icon: WifiOff, label: 'Full Offline Mode' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'Elec-Mate runs natively on iPhone with Face ID authentication, haptic feedback, smooth animations, and the polish expected from a premium iOS app.',
        'All 16 certificate types work on iPhone — EICR, EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, and PAT — with AI board scanner and voice test entry.',
        'The full suite of 70+ BS 7671 calculators runs locally on your iPhone with no network dependency — cable sizing, voltage drop, max demand, and more.',
        'Full offline mode with auto-save every 10 seconds and cloud sync when connectivity returns. Complete certificates in basements and plant rooms with no signal.',
        'The Study Centre delivers 46+ training courses on iPhone with downloadable content for offline study, progress tracking, and interactive quizzes.',
      ]}
      sections={[
        {
          id: 'why-iphone',
          heading: 'Why iPhone Electricians Choose Elec-Mate',
          content: (
            <>
              <p>
                Most electricians in the UK use an iPhone as their primary work phone. They need an
                app that feels native, works offline on site, handles certificates without fuss, and
                provides reference tools instantly. Elec-Mate is built specifically for this
                workflow.
              </p>
              <p>
                Unlike web-based tools that run in Safari and feel sluggish, Elec-Mate uses
                Capacitor to deliver a native iOS experience. The app installs from the App Store,
                opens instantly, integrates with Face ID, and provides the smooth performance iPhone
                users expect.
              </p>
              <p>
                Elec-Mate combines tools that would otherwise require 5-6 separate apps: a
                certificate app, a calculator app, a training platform, a quoting tool, an invoicing
                tool, and an AI assistant. Having everything in one app means less switching, less
                storage used, and a single subscription instead of multiple. See how we compare
                against other options in our{' '}
                <SEOInternalLink href="/tools/best-electrician-app-uk">
                  best electrician app guide
                </SEOInternalLink>
                . On Android instead? See the{' '}
                <SEOInternalLink href="/compare/electrician-app-android">
                  best electrician app for Android
                </SEOInternalLink>{' '}
                comparison.
              </p>
            </>
          ),
          appBridge: {
            title: 'Download Elec-Mate for iPhone',
            description:
              'Native iOS app with Face ID, 16 certificate types, 70+ calculators, 46+ courses, and full offline mode. 7-day free trial, no charge until day 8.',
            icon: Download,
          },
        },
        {
          id: 'native-ios',
          heading: 'Native iOS Experience',
          content: (
            <>
              <p>Elec-Mate on iPhone delivers the native experience electricians expect:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Face ID authentication</span> — secure
                  access with Face ID. No typing passwords on site with dirty hands. Your
                  certificates and client data are protected behind biometric authentication.
                </li>
                <li>
                  <span className="font-semibold text-white">Haptic feedback</span> — subtle haptic
                  responses on actions, confirmations, and errors. The tactile feedback you expect
                  from a quality iOS app.
                </li>
                <li>
                  <span className="font-semibold text-white">Smooth animations</span> — fluid
                  transitions, bottom sheets instead of modals, swipeable interfaces, and 60fps
                  performance throughout. No janky scrolling or laggy forms.
                </li>
                <li>
                  <span className="font-semibold text-white">iOS share sheet integration</span> —
                  share certificates via the native iOS share sheet. Send PDFs through AirDrop,
                  Messages, Mail, WhatsApp, or any app on your phone.
                </li>
                <li>
                  <span className="font-semibold text-white">Push notifications</span> — receive
                  alerts for certificate deadlines, apprentice milestones, sync completions, and
                  team activity through native iOS notifications.
                </li>
              </ul>
              <p>
                Every interactive element in the app has a minimum 44px touch target, designed for
                use with work gloves. The touch-manipulation CSS ensures no 300ms tap delay. The UI
                is mobile-first — not a desktop website squeezed onto a phone screen.
              </p>
            </>
          ),
        },
        {
          id: 'certificates-iphone',
          heading: 'Certificates on iPhone',
          content: (
            <>
              <p>
                All 16 certificate types are fully functional on iPhone. The{' '}
                <SEOInternalLink href="/tools/digital-certificates-app">
                  digital certificates app
                </SEOInternalLink>{' '}
                is optimised for the iPhone screen with collapsible sections, swipeable tabs, and
                smart keyboard handling that keeps input fields visible above the keyboard.
              </p>
              <p>
                The <SEOInternalLink href="/tools/board-scanner">AI Board Scanner</SEOInternalLink>{' '}
                uses the iPhone camera directly. Point at any consumer unit, tap to capture, and the
                AI extracts circuit data in seconds. The iPhone's camera quality produces excellent
                scan results even in dim lighting conditions typical of meter cupboards.
              </p>
              <p>
                Voice Test Entry uses the iPhone's microphone for hands-free test result entry.
                Speak your readings while holding test leads — "circuit 1, R1 plus R2, 0.42 ohms" —
                and the AI transcribes them directly into your schedule of test results. The
                iPhone's noise cancellation helps in noisy site environments.
              </p>
              <p>
                Digital signatures are captured using the iPhone touchscreen. The high-resolution
                display and precise touch input produce clean, professional signatures. You can sign
                with your finger or an Apple Pencil (on compatible models).
              </p>
              <p>
                The EICR and EIC workflows include the fields introduced by BS&nbsp;7671:2018+A4:2026,
                keeping your certificates current with the latest edition rather than the superseded A3
                forms still used by older tools:
              </p>
              <div className="grid sm:grid-cols-3 gap-3 not-prose">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-yellow-400">
                    AFDD presence
                  </div>
                  <div className="mt-1 text-sm font-mono text-white/70">Reg 421.1.7</div>
                  <p className="mt-2 text-sm text-white/80">
                    Records whether arc fault detection devices are fitted. A4:2026 recommends AFDDs in
                    AC final circuits of a fixed installation to mitigate the risk of fire.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-yellow-400">
                    RCD on luminaire circuits
                  </div>
                  <div className="mt-1 text-sm font-mono text-white/70">Reg 411.3.4</div>
                  <p className="mt-2 text-sm text-white/80">
                    Within domestic (household) premises, additional protection by a 30&nbsp;mA RCD is
                    required for AC final circuits supplying luminaires.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-yellow-400">
                    SPD labelling
                  </div>
                  <div className="mt-1 text-sm font-mono text-white/70">Reg 514.16.1</div>
                  <p className="mt-2 text-sm text-white/80">
                    A label is required to indicate the presence of surge protective devices, with an
                    exception for domestic (household) premises or similar.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'calculators-iphone',
          heading: '70+ Calculators on iPhone',
          content: (
            <>
              <p>
                The full suite of{' '}
                <SEOInternalLink href="/tools/electrical-testing-calculators">
                  70+ BS 7671 calculators
                </SEOInternalLink>{' '}
                runs natively on your iPhone. All calculations execute locally — no network
                round-trip, no API calls, no dependency on internet connectivity. Results are
                instant.
              </p>
              <p>
                The calculator interface is designed for one-handed use on iPhone. Input fields have
                large touch targets, numeric keypads appear automatically for number inputs, and
                results display clearly with colour-coded pass/fail indicators. Popular calculators
                include:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 not-prose">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    <span className="font-semibold text-white">Cable sizing calculator</span>
                  </SEOInternalLink>
                  <p className="mt-1 text-sm text-white/80">
                    BS 7671 cable selection applying all correction factors before checking
                    current-carrying capacity.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                  <SEOInternalLink href="/tools/voltage-drop-calculator">
                    <span className="font-semibold text-white">Voltage drop calculator</span>
                  </SEOInternalLink>
                  <p className="mt-1 text-sm text-white/80">
                    Checks compliance with Regulation 525.202 against the limits in Appendix 4, Table
                    4Ab.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                  <SEOInternalLink href="/tools/max-demand-calculator">
                    <span className="font-semibold text-white">Maximum demand calculator</span>
                  </SEOInternalLink>
                  <p className="mt-1 text-sm text-white/80">
                    Totals installation demand with diversity factors applied per circuit type.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                  <span className="font-semibold text-white">Earth fault loop impedance</span>
                  <p className="mt-1 text-sm text-white/80">
                    Verifies measured Zs against the maximum permitted value for the protective device
                    and disconnection time.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:col-span-2">
                  <span className="font-semibold text-white">Prospective fault current</span>
                  <p className="mt-1 text-sm text-white/80">
                    Regulation 643.7.3.201 requires the prospective short-circuit current and the
                    prospective earth fault current to be determined. The calculator returns the
                    greater of the two for entry on the EIC or EICR, with the determination methods set
                    out in Appendix 14.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-blue-900/30 border border-blue-700/40 p-4 not-prose">
                <p className="text-sm text-white/85">
                  <span className="font-semibold text-white">Voltage drop limits (Table 4Ab).</span> For
                  a low voltage installation supplied directly from a public LV distribution system, the
                  permitted drop is 3% for lighting and 5% for other uses. Where the installation is fed
                  from a private LV supply, the limits rise to 6% for lighting and 8% for other uses.
                </p>
              </div>
            </>
          ),
        },
        {
          id: 'training-iphone',
          heading: 'Training and Study Centre on iPhone',
          content: (
            <>
              <p>
                The{' '}
                <SEOInternalLink href="/tools/study-centre-online-courses">
                  Study Centre
                </SEOInternalLink>{' '}
                delivers 46+ electrical courses directly to your iPhone. Video lessons play
                natively, interactive quizzes use touch-friendly interfaces, and flashcards swipe
                naturally with iOS gestures.
              </p>
              <p>
                Courses can be downloaded for offline study — ideal for commutes, lunch breaks, or
                quiet periods on site. Progress syncs to the cloud when connectivity returns, so
                your employer dashboard stays up to date. Mock exams for{' '}
                <SEOInternalLink href="/training/am2-exam-preparation">AM2</SEOInternalLink> and other
                qualifications work offline too.
              </p>
              <p>
                Apprentices particularly benefit from iPhone access. They can study during college
                breaks, review content before practical assessments, and track their portfolio
                progress — all from the device they always have with them.
              </p>
            </>
          ),
          appBridge: {
            title: '46+ Courses on Your iPhone',
            description:
              'Video lessons, interactive quizzes, flashcards, and mock exams. Download courses for offline study. Progress syncs automatically.',
            icon: GraduationCap,
          },
        },
        {
          id: 'offline-iphone',
          heading: 'Full Offline Mode on iPhone',
          content: (
            <>
              <p>
                Elec-Mate's{' '}
                <SEOInternalLink href="/tools/offline-electrical-app">offline mode</SEOInternalLink>{' '}
                works identically on iPhone to every other platform. All certificates, calculators,
                and downloaded training content function without any internet connection.
              </p>
              <p>
                Data auto-saves to local iPhone storage continuously. When connectivity returns,
                cloud sync happens automatically, and an emergency save captures any unsaved data when
                you close the app. Storage stays light: a typical month of certificates, test data, and
                downloaded courses uses well under 200MB.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 not-prose">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                  <div className="text-2xl font-bold text-yellow-400">Every 10s</div>
                  <div className="mt-1 text-sm text-white/80">Local auto-save while you work</div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                  <div className="text-2xl font-bold text-yellow-400">Every 30s</div>
                  <div className="mt-1 text-sm text-white/80">Cloud sync once you are back online</div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                  <div className="text-2xl font-bold text-yellow-400">~50MB</div>
                  <div className="mt-1 text-sm text-white/80">Base app download size</div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                  <div className="text-2xl font-bold text-yellow-400">&lt;200MB</div>
                  <div className="mt-1 text-sm text-white/80">Typical month with downloaded courses</div>
                </div>
              </div>
              <p>
                For electricians working in basements, plant rooms, or rural locations, offline mode
                means you never have to worry about losing work. The app detects network state
                changes automatically and transitions between online and offline modes seamlessly,
                with no user action required.
              </p>
              <p>
                On iPhone, that creates a proper mobile workflow rather than just a form filler:
                capture the certificate, run the calculator, price the remedial using the{' '}
                <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink>, then
                finish with the{' '}
                <SEOInternalLink href="/tools/electrician-invoice-app">invoice app</SEOInternalLink> from
                the same device.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Download from the App Store',
          text: 'Search "Elec-Mate" in the App Store or follow the download link from elec-mate.co.uk. The app installs like any native iPhone app.',
        },
        {
          name: 'Create your account',
          text: 'Sign up with your email and set up Face ID authentication. Your 7-day free trial starts immediately with full access to every feature.',
        },
        {
          name: 'Set up your profile',
          text: 'Enter your company details, qualification level, and scheme provider information. These details auto-fill into your certificates.',
        },
        {
          name: 'Start using the tools',
          text: 'Create your first certificate, try the AI Board Scanner, run a cable sizing calculation, or start a training course. Everything is available from day one.',
        },
      ]}
      howToHeading="Getting Started on iPhone"
      howToDescription="Four steps from App Store to first certificate."
      features={[
        {
          icon: Smartphone,
          title: 'Native iOS Experience',
          description:
            'Face ID, haptic feedback, smooth animations, iOS share sheet, and push notifications. The premium iPhone experience.',
        },
        {
          icon: FileCheck2,
          title: '16 Certificate Types',
          description:
            'EICR, EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, and PAT. All optimised for iPhone.',
        },
        {
          icon: Camera,
          title: 'AI Board Scanner',
          description:
            'Use the iPhone camera to photograph consumer units. AI extracts circuit data and auto-fills certificate schedules.',
        },
        {
          icon: Calculator,
          title: '70+ Calculators',
          description:
            'Full BS 7671 calculator suite — cable sizing, voltage drop, max demand, Zs verification. All run locally, all work offline.',
        },
        {
          icon: GraduationCap,
          title: '46+ Training Courses',
          description:
            'Video lessons, quizzes, flashcards, and mock exams. Download for offline study. Progress syncs automatically.',
        },
        {
          icon: WifiOff,
          title: 'Full Offline Mode',
          description:
            'Certificates, calculators, and training all work without signal. Auto-save every 10 seconds. Cloud sync when online.',
        },
      ]}
      featuresHeading="iPhone App Features"
      featuresSubheading="Everything Elec-Mate delivers on your iPhone — one app, one subscription, every tool."
      faqs={[
        {
          question: 'Is Elec-Mate available on the App Store?',
          answer:
            'Yes. Elec-Mate is available as a native iOS app on the Apple App Store. Search "Elec-Mate" or follow the download link from the website. The app is built with Capacitor for native iOS performance — Face ID, haptic feedback, push notifications, and smooth 60fps animations.',
        },
        {
          question: 'Which iPhone models does Elec-Mate support?',
          answer:
            'Elec-Mate supports all iPhones running iOS 16 or later. This includes iPhone SE (2nd generation and later), iPhone 12 and later, and all current iPhone models. The app is optimised for all screen sizes from the iPhone SE to the iPhone 16 Pro Max.',
        },
        {
          question: 'Does the AI Board Scanner work with the iPhone camera?',
          answer:
            'Yes. The AI Board Scanner uses the iPhone camera directly within the app. The iPhone camera quality produces excellent scan results, and the built-in flash provides supplementary lighting for dim meter cupboards and plant rooms. The scanner supports both standard and wide-angle lenses for capturing larger distribution boards.',
        },
        {
          question: 'Can I use Face ID to unlock Elec-Mate?',
          answer:
            'Yes. Elec-Mate supports Face ID authentication on all compatible iPhone models. This is particularly useful on site where you may have dirty hands and typing a password is impractical. Face ID protects your certificates, client data, and business information behind biometric security.',
        },
        {
          question: 'Does offline mode work on iPhone?',
          answer:
            'Yes. Full offline mode works identically on iPhone. All certificates, calculators, and downloaded training content function without any internet connection. Data auto-saves to local iPhone storage every 10 seconds and syncs to the cloud every 30 seconds when connectivity returns.',
        },
        {
          question: 'How much storage does Elec-Mate use on iPhone?',
          answer:
            'The base app is approximately 50MB. With a typical month of certificates, test data, and downloaded training courses, total storage usage is typically under 200MB. The app manages storage efficiently and does not consume excessive space even with heavy use over extended periods.',
        },
        {
          question: 'Does the app support A4:2026 BS 7671 requirements?',
          answer:
            'Yes. Elec-Mate certificates are current with BS 7671:2018+A4:2026. The EICR and EIC forms include fields for AFDD presence (Reg 421.1.7 — recommended in AC final circuits of a fixed installation to mitigate the risk of fire), RCD protection on luminaire circuits (Reg 411.3.4 — within domestic premises, a 30 mA RCD is required for AC final circuits supplying luminaires), and SPD labelling (Reg 514.16.1 — a label is required where surge protective devices are installed, with an exception for domestic premises or similar). This keeps your certificates compliant with the current edition rather than the superseded A3 forms used by older tools.',
        },
        {
          question: 'Can I share certificates from iPhone via AirDrop?',
          answer:
            'Yes. Completed certificate PDFs can be shared via the native iOS share sheet, which includes AirDrop, Messages, Mail, WhatsApp, and any other sharing-capable app installed on your iPhone. This makes delivering certificates to clients fast and flexible.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/digital-certificates-app',
          title: 'Digital Certificates App',
          description:
            'All 16 certificate types with AI features, digital signatures, and professional PDF output.',
          icon: FileCheck2,
          category: 'Certificates',
        },
        {
          href: '/tools/board-scanner',
          title: 'AI Board Scanner',
          description:
            'Photograph consumer units and auto-fill certificate schedules with AI photo recognition.',
          icon: Camera,
          category: 'AI Tools',
        },
        {
          href: '/tools/offline-electrical-app',
          title: 'Offline Electrical App',
          description:
            'Full offline capability — certificates, calculators, and training all work without signal.',
          icon: WifiOff,
          category: 'Tools',
        },
        {
          href: '/tools/electrical-testing-calculators',
          title: 'Electrical Calculators',
          description:
            '70+ BS 7671 calculators for cable sizing, voltage drop, Zs verification, and more.',
          icon: Calculator,
          category: 'Tools',
        },
        {
          href: '/tools/study-centre-online-courses',
          title: 'Study Centre Online Courses',
          description:
            '46+ courses with downloadable content for offline study, quizzes, and mock exams.',
          icon: GraduationCap,
          category: 'Training',
        },
        {
          href: '/tools/employer-electrical-platform',
          title: 'Employer Platform',
          description:
            'Manage your team, track apprentices, oversee certificates, and monitor compliance.',
          icon: Building,
          category: 'Platform',
        },
        {
          href: '/tools/ai-cost-engineer',
          title: 'AI Cost Engineer',
          description:
            'Use your iPhone to turn site notes into priced quotes and remedial estimates quickly.',
          icon: Brain,
          category: 'AI Tools',
        },
      ]}
      ctaHeading="Download Elec-Mate for iPhone — free for 7 days"
      ctaSubheading="16 certificate types, 70+ calculators, 46+ courses, AI tools, and full offline mode. Native iOS experience with Face ID. No charge until day 8 — cancel anytime."
      toolPath="/tools/electrician-app-iphone"
    />
  );
}
