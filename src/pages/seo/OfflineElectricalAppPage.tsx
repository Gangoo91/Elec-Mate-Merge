import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  WifiOff,
  RefreshCw,
  HardDrive,
  Shield,
  FileCheck2,
  Calculator,
  GraduationCap,
  Camera,
  Smartphone,
  Building,
  Clock,
  CloudOff,
  Download,
  Zap,
} from 'lucide-react';

export default function OfflineElectricalAppPage() {
  return (
    <ToolTemplate
      title="Offline Electrical App | Work Without Signal"
      description="Elec-Mate works fully offline. Complete EICR, EIC, and Minor Works certificates, use 70+ BS 7671 calculators, and access training courses without any internet connection. Auto-saves locally every 10 seconds. Syncs to the cloud when you are back online."
      datePublished="2026-01-20"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Offline Electrical App', href: '/tools/offline-electrical-app' },
      ]}
      tocItems={[
        { id: 'why-offline-matters', label: 'Why Offline Matters' },
        { id: 'certificates-offline', label: 'Certificates Offline' },
        { id: 'calculators-offline', label: 'Calculators Offline' },
        { id: 'training-offline', label: 'Training Offline' },
        { id: 'auto-save-sync', label: 'Auto-Save and Sync' },
        { id: 'offline-architecture', label: 'How Offline Works' },
        { id: 'how-to', label: 'Getting Started Offline' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Works Without Signal"
      badgeIcon={WifiOff}
      heroTitle={
        <>
          <span className="text-yellow-400">Offline Electrical App</span> — Work Without Signal,
          Never Lose Data
        </>
      }
      heroSubtitle="Basements, plant rooms, rural sites, underground car parks — electricians regularly work where there is no mobile signal. Elec-Mate works fully offline. Certificates, calculators, and training all function without an internet connection. Data auto-saves locally every 10 seconds and syncs to the cloud when connectivity returns."
      heroFeaturePills={[
        { icon: WifiOff, label: 'Full Offline Mode' },
        { icon: HardDrive, label: 'Local Auto-Save' },
        { icon: RefreshCw, label: 'Auto Cloud Sync' },
        { icon: Shield, label: 'Zero Data Loss' },
      ]}
      readingTime={9}
      keyTakeaways={[
        'Elec-Mate works fully offline — certificates, calculators, and training all function without any internet connection.',
        'Data auto-saves to local storage every 10 seconds, so even if your phone dies you lose at most 10 seconds of work.',
        'Cloud sync happens automatically every 30 seconds when connectivity returns, with a beforeunload emergency save as a final safety net.',
        'All 70+ BS 7671 calculators work offline with no performance difference — all calculations run locally on your device.',
        'AI-powered features (Board Scanner, Voice Test Entry, Defect Code AI) require connectivity, but photos can be queued for processing when you are back online.',
      ]}
      sections={[
        {
          id: 'why-offline-matters',
          heading: 'Why Offline Capability Matters for Electricians',
          content: (
            <>
              <p>
                Electricians do not work in offices with reliable Wi-Fi. They work in meter
                cupboards, basement plant rooms, industrial units, rural farmhouses, underground car
                parks, and new-build sites where the mast has not been erected yet. Any app that
                requires a constant internet connection will fail you in exactly the situations
                where you need it most.
              </p>
              <p>
                This is not a minor inconvenience. If you are halfway through an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> and your app
                loses connection, you risk losing test data, having to re-enter readings, or being
                unable to complete the certificate at all. For electricians working to tight
                schedules — often completing 3-5 EICRs per day — any downtime caused by connectivity
                issues is directly lost income.
              </p>
              <p>
                Elec-Mate was designed from the ground up with offline-first architecture. The app
                does not merely "cope" with poor signal — it works identically whether you have full
                5G coverage or no connection at all. The only features that require connectivity are
                AI-powered tools that process data on cloud servers.
              </p>
            </>
          ),
          appBridge: {
            title: 'Never Lose Work to Poor Signal',
            description:
              'Elec-Mate works fully offline with auto-save every 10 seconds. Complete certificates, use calculators, and access training without any internet connection.',
            icon: WifiOff,
          },
        },
        {
          id: 'certificates-offline',
          heading: 'Certificates Work Fully Offline',
          content: (
            <>
              <p>
                All 8 certificate types in Elec-Mate work fully offline. You can complete the entire
                certificate workflow without any internet connection:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Enter property details, client information, and installation particulars</li>
                <li>Record supply characteristics and earthing arrangements</li>
                <li>Fill in circuit schedules with device types, ratings, and cable sizes</li>
                <li>
                  Enter all test results — continuity, insulation resistance, polarity, Zs, RCD
                </li>
                <li>Record observations with C1/C2/C3/FI classification codes</li>
                <li>Capture digital signatures from inspector and client</li>
                <li>Generate PDF certificates for local storage</li>
              </ul>
              <p>
                Whether you are completing an{' '}
                <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>,{' '}
                <SEOInternalLink href="/tools/minor-works-certificate">Minor Works</SEOInternalLink>
                , or any other certificate type in the{' '}
                <SEOInternalLink href="/tools/digital-certificates-app">
                  digital certificates app
                </SEOInternalLink>
                , the offline experience is identical to the online experience. Test result
                validation against BS 7671 maximum values also works offline — the validation tables
                are stored locally on your device.
              </p>
            </>
          ),
        },
        {
          id: 'calculators-offline',
          heading: 'All 70+ Calculators Work Offline',
          content: (
            <>
              <p>
                Every calculator in Elec-Mate runs entirely on your device. There is no server
                round-trip, no API call, and no dependency on internet connectivity. All 70+{' '}
                <SEOInternalLink href="/tools/electrical-testing-calculators">
                  BS 7671 calculators
                </SEOInternalLink>{' '}
                work offline with identical performance:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    Cable sizing calculator
                  </SEOInternalLink>{' '}
                  — full BS 7671 cable selection with correction factors
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
                  — calculate total installation demand with diversity
                </li>
                <li>Earth fault loop impedance verification</li>
                <li>Prospective fault current calculation</li>
                <li>Adiabatic equation for protective conductor sizing</li>
              </ul>
              <p>
                The BS 7671 reference tables, correction factors, cable data, and protective device
                characteristics are all stored locally within the app. Calculations execute
                instantly with no network latency.
              </p>
            </>
          ),
        },
        {
          id: 'training-offline',
          heading: 'Training and Study Centre Offline',
          content: (
            <>
              <p>
                The{' '}
                <SEOInternalLink href="/tools/study-centre-online-courses">
                  Study Centre
                </SEOInternalLink>{' '}
                downloads course content for offline access. Once a course is downloaded, you can
                study without any internet connection — video lessons, text content, interactive
                quizzes, and flashcards all work offline.
              </p>
              <p>
                This is particularly useful for apprentices who study during commutes, lunch breaks,
                or quiet periods on site. You do not need to find Wi-Fi to continue your learning.
                Progress tracking syncs to the cloud when connectivity returns, so your employer
                dashboard stays up to date.
              </p>
              <p>
                Mock exams and practice tests also work offline, with results stored locally and
                synced later. This means you can run through a full{' '}
                <SEOInternalLink href="/guides/am2-exam-preparation">
                  AM2 practice exam
                </SEOInternalLink>{' '}
                on the train home without worrying about signal.
              </p>
            </>
          ),
          appBridge: {
            title: 'Download Courses for Offline Study',
            description:
              'Access 46+ electrical courses offline. Video lessons, quizzes, flashcards, and mock exams all work without an internet connection. Progress syncs when you are back online.',
            icon: Download,
          },
        },
        {
          id: 'auto-save-sync',
          heading: 'Auto-Save and Cloud Sync Architecture',
          content: (
            <>
              <p>
                Elec-Mate uses a three-tier data persistence strategy to guarantee zero data loss:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Local save every 10 seconds</span> —
                  all data is written to local device storage every 10 seconds. If your phone dies,
                  you lose at most 10 seconds of work. This happens silently in the background with
                  no impact on app performance.
                </li>
                <li>
                  <span className="font-semibold text-white">Cloud sync every 30 seconds</span> —
                  when a network connection is available, data syncs to the Supabase cloud every 30
                  seconds. This means your data is backed up and accessible from any device within
                  30 seconds of entering it.
                </li>
                <li>
                  <span className="font-semibold text-white">Emergency save on exit</span> — if you
                  close the app or navigate away, a beforeunload emergency save captures any unsaved
                  data immediately. This is the final safety net that catches anything between the
                  last auto-save and the moment you close the app.
                </li>
              </ul>
              <p>
                If you complete a certificate entirely offline, the full dataset is held in local
                storage until connectivity returns. Once online, the data syncs to the cloud
                automatically — you do not need to trigger the sync manually. Conflict resolution
                handles the rare case where the same certificate is edited on two devices
                simultaneously.
              </p>
            </>
          ),
        },
        {
          id: 'offline-architecture',
          heading: 'What Works Offline vs What Needs Connectivity',
          content: (
            <>
              <p>
                Here is the full breakdown of what works offline and what requires an internet
                connection:
              </p>
              <p className="font-semibold text-white mt-4 mb-2">Works fully offline:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  All 8 certificate types (EICR, EIC, Minor Works, EV, Solar PV, Fire Alarm,
                  Emergency Lighting, PAT)
                </li>
                <li>All 70+ BS 7671 calculators</li>
                <li>Downloaded training courses, quizzes, and flashcards</li>
                <li>Digital signature capture</li>
                <li>PDF certificate generation</li>
                <li>Test result validation against BS 7671 tables</li>
                <li>Job notes and site photographs (stored locally)</li>
              </ul>
              <p className="font-semibold text-white mt-4 mb-2">Requires internet connection:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>AI Board Scanner (cloud image processing)</li>
                <li>Voice Test Entry (cloud speech recognition)</li>
                <li>Defect Code AI (cloud AI processing)</li>
                <li>AI Remedial Cost Estimator (cloud pricing data)</li>
                <li>Email/WhatsApp certificate delivery</li>
                <li>Cloud sync and cross-device access</li>
                <li>Initial course downloads</li>
              </ul>
              <p>
                For the AI features, you can capture the data offline (photograph the board, save
                voice recordings) and process them when connectivity returns. The core certification
                workflow never depends on an internet connection.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Open Elec-Mate without signal',
          text: 'Simply open the app as normal. Elec-Mate detects the network state automatically and operates in offline mode without any user action required.',
        },
        {
          name: 'Work as normal',
          text: 'Complete certificates, use calculators, or study courses. The experience is identical to being online. A small offline indicator shows in the status area.',
        },
        {
          name: 'Data saves locally',
          text: 'Your work auto-saves to local device storage every 10 seconds. You do not need to save manually. An emergency save triggers if you close the app.',
        },
        {
          name: 'Reconnect and sync',
          text: 'When you are back in signal, the app detects connectivity and syncs all local data to the cloud within 30 seconds. No manual action needed.',
        },
      ]}
      howToHeading="How Offline Mode Works"
      howToDescription="Four steps — open, work, auto-save, auto-sync."
      features={[
        {
          icon: WifiOff,
          title: 'Full Offline Mode',
          description:
            'All certificates, calculators, and downloaded training content work without any internet connection. No degraded experience.',
        },
        {
          icon: HardDrive,
          title: 'Auto-Save Every 10 Seconds',
          description:
            'Data writes to local storage every 10 seconds automatically. Maximum data loss in any scenario is 10 seconds of work.',
        },
        {
          icon: RefreshCw,
          title: 'Auto Cloud Sync',
          description:
            'When connectivity returns, data syncs to the cloud every 30 seconds. No manual action required. Access your data from any device.',
        },
        {
          icon: Shield,
          title: 'Emergency Save on Exit',
          description:
            'A beforeunload emergency save captures any unsaved data when you close the app. The final safety net against data loss.',
        },
        {
          icon: CloudOff,
          title: 'Queue AI for Later',
          description:
            'Photograph boards and capture data offline. AI features process automatically when connectivity returns. Nothing is lost.',
        },
        {
          icon: Download,
          title: 'Download Courses',
          description:
            'Download training courses for offline study. Video lessons, quizzes, and flashcards all work without signal.',
        },
      ]}
      featuresHeading="Offline Features"
      featuresSubheading="Everything that works without an internet connection — and how your data stays safe."
      faqs={[
        {
          question: 'Can I complete an EICR certificate fully offline?',
          answer:
            'Yes. You can complete the entire EICR workflow offline — property details, supply characteristics, circuit schedules, all test results (continuity, insulation resistance, polarity, earth fault loop impedance, RCD operation), observations with C1/C2/C3/FI codes, digital signatures, and PDF generation. The only EICR features that require connectivity are the AI Board Scanner, Voice Test Entry, and Defect Code AI, because these process data on cloud servers.',
        },
        {
          question: 'How does auto-save work offline?',
          answer:
            'Elec-Mate uses a three-tier save strategy. First, all data saves to local device storage every 10 seconds — this happens silently in the background. Second, when internet connectivity is available, data syncs to the Supabase cloud every 30 seconds. Third, a beforeunload emergency save triggers when you close the app, capturing any data entered since the last auto-save. This means the maximum data loss in any scenario is 10 seconds of work.',
        },
        {
          question: 'Do calculators work offline?',
          answer:
            'Yes. All 70+ BS 7671 calculators work fully offline with no performance difference. Cable sizing, voltage drop, maximum demand, earth fault loop impedance, prospective fault current, adiabatic equation, and every other calculator runs entirely on your device. The BS 7671 reference tables, correction factors, and cable data are stored locally within the app.',
        },
        {
          question: 'Can I study courses offline?',
          answer:
            'Yes. Once you download a course from the Study Centre, all content — video lessons, text, interactive quizzes, flashcards, and mock exams — is available offline. Your progress is tracked locally and syncs to the cloud when connectivity returns. This is ideal for studying during commutes, lunch breaks, or quiet periods on site without needing Wi-Fi.',
        },
        {
          question: 'What happens when I reconnect to the internet?',
          answer:
            'When Elec-Mate detects a network connection, it automatically syncs all locally stored data to the cloud within 30 seconds. No manual action is required. Conflict resolution handles the rare case where the same certificate is edited on two devices simultaneously. Once synced, your data is accessible from any device — phone, tablet, or desktop.',
        },
        {
          question: 'Does offline mode work on both iPhone and Android?',
          answer:
            'Yes. Offline capability works identically on iPhone and Android devices. The auto-save, cloud sync, and emergency save features function the same way on both platforms. The app uses the same local storage architecture regardless of operating system. See our electrician app for iPhone page for iOS-specific features.',
        },
        {
          question: 'Is there any data loss risk when working offline?',
          answer:
            'The maximum data loss in any scenario is 10 seconds of work — the interval between auto-saves to local storage. Even if your phone battery dies mid-sentence, you will lose at most the last few fields you entered. The emergency save on app close provides an additional safety net. In practice, data loss from connectivity issues is effectively zero with Elec-Mate.',
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
            'Photograph consumer units and auto-fill certificate schedules with AI recognition.',
          icon: Camera,
          category: 'AI Tools',
        },
        {
          href: '/tools/electrician-app-iphone',
          title: 'Electrician App for iPhone',
          description:
            'Native iOS experience with all features — certificates, calculators, AI tools, and offline support.',
          icon: Smartphone,
          category: 'Tools',
        },
        {
          href: '/tools/electrical-testing-calculators',
          title: 'Electrical Calculators',
          description: '70+ BS 7671 calculators — all work offline with no performance difference.',
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
      ctaHeading="Try offline mode free for 7 days"
      ctaSubheading="Full offline capability, auto-save, cloud sync, all 8 certificate types, 70+ calculators, and 46+ courses. Start your free trial — no card required."
      toolPath="/tools/offline-electrical-app"
    />
  );
}
