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
      description="Elec-Mate is the best electrician app for iPhone in 2026. Native iOS experience with Face ID, 8 certificate types, AI board scanner, 70+ BS 7671 calculators, 46+ training courses, full offline mode, and professional business tools. Built for UK electricians and apprentices."
      datePublished="2026-01-12"
      dateModified="2026-02-13"
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
      heroSubtitle="Elec-Mate on iPhone gives you the full toolkit — 8 certificate types with AI board scanner and voice test entry, 70+ BS 7671 calculators, 46+ training courses, offline mode, and professional business tools. Native iOS experience with Face ID, haptic feedback, and smooth animations. Built for UK electricians who work from their phone."
      heroFeaturePills={[
        { icon: Smartphone, label: 'Native iOS' },
        { icon: Fingerprint, label: 'Face ID' },
        { icon: FileCheck2, label: '8 Certificate Types' },
        { icon: WifiOff, label: 'Full Offline Mode' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'Elec-Mate runs natively on iPhone with Face ID authentication, haptic feedback, smooth animations, and the polish expected from a premium iOS app.',
        'All 8 certificate types work on iPhone — EICR, EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, and PAT — with AI board scanner and voice test entry.',
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
                <SEOInternalLink href="/guides/best-electrician-app">
                  best electrician app guide
                </SEOInternalLink>
                .
              </p>
            </>
          ),
          appBridge: {
            title: 'Download Elec-Mate for iPhone',
            description:
              'Native iOS app with Face ID, 8 certificate types, 70+ calculators, 46+ courses, and full offline mode. 7-day free trial, no card required to start.',
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
                All 8 certificate types are fully functional on iPhone. The{' '}
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
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    Cable sizing calculator
                  </SEOInternalLink>{' '}
                  — BS 7671 cable selection with all correction factors
                </li>
                <li>
                  <SEOInternalLink href="/tools/voltage-drop-calculator">
                    Voltage drop calculator
                  </SEOInternalLink>{' '}
                  — verify compliance with Regulation 525
                </li>
                <li>
                  <SEOInternalLink href="/tools/max-demand-calculator">
                    Maximum demand calculator
                  </SEOInternalLink>{' '}
                  — total installation demand with diversity factors
                </li>
                <li>Earth fault loop impedance verification</li>
                <li>Prospective fault current calculation</li>
              </ul>
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
                <SEOInternalLink href="/guides/am2-exam-preparation">AM2</SEOInternalLink> and other
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
              'Video lessons, interactive quizzes, flashcards, and mock exams. Download courses for offline study. Progress syncs automatically. Start your 7-day free trial.',
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
                Data auto-saves to local iPhone storage every 10 seconds. When connectivity returns,
                cloud sync happens automatically every 30 seconds. The beforeunload emergency save
                captures any unsaved data when you close the app.
              </p>
              <p>
                The iPhone's local storage is used efficiently — a typical month of certificates,
                test data, and downloaded courses uses less than 200MB. The app does not consume
                excessive storage even with heavy use.
              </p>
              <p>
                For electricians working in basements, plant rooms, or rural locations, offline mode
                means you never have to worry about losing work. The app detects network state
                changes automatically and transitions between online and offline modes seamlessly,
                with no user action required.
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
          title: '8 Certificate Types',
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
            'All 8 certificate types with AI features, digital signatures, and professional PDF output.',
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
      ]}
      ctaHeading="Download Elec-Mate for iPhone — free for 7 days"
      ctaSubheading="8 certificate types, 70+ calculators, 46+ courses, AI tools, and full offline mode. Native iOS experience with Face ID. No card required to start your trial."
      toolPath="/tools/electrician-app-iphone"
    />
  );
}
