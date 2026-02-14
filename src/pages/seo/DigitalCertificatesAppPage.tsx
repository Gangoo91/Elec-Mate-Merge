import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  FileCheck2,
  Camera,
  Mic,
  Brain,
  PenTool,
  FileDown,
  MessageCircle,
  WifiOff,
  ShieldCheck,
  Sparkles,
  Calculator,
  GraduationCap,
  Smartphone,
  Building,
  CloudOff,
  Mail,
} from 'lucide-react';

export default function DigitalCertificatesAppPage() {
  return (
    <ToolTemplate
      title="Digital Electrical Certificates App | EICR EIC MW"
      description="Elec-Mate's digital electrical certificates app for UK electricians. 8 certificate types — EICR, EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, and PAT. AI board scanner, voice test entry, defect code AI, digital signatures, professional PDF export, WhatsApp and email delivery, offline support, and BS 7671:2018+A3:2024 compliant."
      datePublished="2026-01-10"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Digital Certificates App', href: '/tools/digital-certificates-app' },
      ]}
      tocItems={[
        { id: 'overview', label: 'Overview' },
        { id: 'eight-certificate-types', label: '8 Certificate Types' },
        { id: 'ai-powered-features', label: 'AI-Powered Features' },
        { id: 'digital-signatures', label: 'Digital Signatures' },
        { id: 'pdf-export-delivery', label: 'PDF Export and Delivery' },
        { id: 'offline-cloud', label: 'Offline and Cloud Storage' },
        { id: 'bs7671-compliance', label: 'BS 7671 Compliance' },
        { id: 'how-to', label: 'How to Create a Certificate' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="8 Certificate Types"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          <span className="text-yellow-400">Digital Electrical Certificates</span> — EICR, EIC,
          Minor Works, and 5 More
        </>
      }
      heroSubtitle="8 certificate types. AI board scanner. Voice test entry. Defect code AI. Digital signatures. Professional PDF output. Email and WhatsApp delivery. Full offline support. Everything you need to complete, sign, and send electrical certificates from your phone — compliant with BS 7671:2018+A3:2024."
      heroFeaturePills={[
        { icon: FileCheck2, label: '8 Certificate Types' },
        { icon: Camera, label: 'AI Board Scanner' },
        { icon: Mic, label: 'Voice Test Entry' },
        { icon: ShieldCheck, label: 'BS 7671 Compliant' },
      ]}
      readingTime={12}
      keyTakeaways={[
        'Elec-Mate supports 8 certificate types: EICR, EIC, Minor Works, EV Charger Installation, Solar PV, Fire Alarm Commissioning, Emergency Lighting, and PAT Testing.',
        'The AI Board Scanner photographs a consumer unit and extracts circuit data, device ratings, and board layout in seconds — eliminating manual data entry on site.',
        'Voice Test Entry lets you speak test readings aloud while holding test leads, with AI transcribing them directly into the schedule of test results.',
        'Completed certificates export as professional PDFs and can be sent via email, WhatsApp, or any other sharing method directly from the app.',
        'All certificate types work fully offline with auto-save every 10 seconds and cloud sync when connectivity returns.',
      ]}
      sections={[
        {
          id: 'overview',
          heading: 'The Complete Digital Certificate Solution',
          content: (
            <>
              <p>
                Elec-Mate's digital certificates are not just digital versions of paper forms. They
                are intelligent, AI-powered documents that speed up the entire certification process
                — from the initial{' '}
                <SEOInternalLink href="/tools/board-scanner">board scan</SEOInternalLink> to the
                final PDF delivery.
              </p>
              <p>
                Every certificate type follows the model forms in BS 7671:2018+A3:2024 Appendix 6.
                Test results are validated against maximum permitted values automatically.
                Observation codes are suggested by AI with the correct BS 7671 regulation reference.
                And the completed certificate is a professional PDF that meets scheme provider
                requirements.
              </p>
              <p>
                All 8 certificate types, all AI features, and unlimited certificate generation are
                included in the standard Elec-Mate subscription from £4.99/month. There are no
                per-certificate charges. You can produce as many certificates as you need, for any
                type of work, without worrying about credit limits or usage caps.
              </p>
            </>
          ),
          appBridge: {
            title: '8 Certificate Types, Unlimited Usage',
            description:
              'EICR, EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, and PAT. AI-powered, digitally signed, professional PDF output. From £4.99/month with 7-day free trial.',
            icon: FileCheck2,
          },
        },
        {
          id: 'eight-certificate-types',
          heading: '8 Certificate Types Included',
          content: (
            <>
              <p>
                Elec-Mate covers every certificate type a UK electrician is likely to need. Each
                certificate follows the relevant model form and includes all required fields,
                observations, and test schedules:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">EICR</span> — full inspection report
                  with supply characteristics, distribution board schedule, circuit details, test
                  results, observations with C1/C2/C3/FI codes, and overall condition assessment.
                  See our{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICR certificate page
                  </SEOInternalLink>
                  .
                </li>
                <li>
                  <span className="font-semibold text-white">EIC</span> — for new installations and
                  alterations. Design, construction, inspection, and testing sections with full
                  schedule of circuits. See the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    EIC certificate page
                  </SEOInternalLink>
                  .
                </li>
                <li>
                  <span className="font-semibold text-white">Minor Works Certificate</span> —
                  quick-fill form for minor electrical works. Circuit details, test results, and
                  declarations. See the{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works page
                  </SEOInternalLink>
                  .
                </li>
                <li>
                  <span className="font-semibold text-white">EV Charger Installation</span> —
                  EV-specific fields for charger model, output rating, cable type, earthing
                  arrangement, and RCD/RCBO protection.
                </li>
                <li>
                  <span className="font-semibold text-white">Solar PV Certificate</span> — array
                  details, inverter specifications, DC and AC circuits, and commissioning test
                  results.
                </li>
                <li>
                  <span className="font-semibold text-white">Fire Alarm Commissioning</span> — to BS
                  5839. Zone plan, detector details, sounder coverage, and cause-and-effect
                  verification.
                </li>
                <li>
                  <span className="font-semibold text-white">Emergency Lighting</span> — to BS 5266.
                  Luminaire locations, duration testing, lux levels, and battery condition.
                </li>
                <li>
                  <span className="font-semibold text-white">PAT Testing</span> — portable appliance
                  testing with visual inspection, earth continuity, insulation resistance, and
                  pass/fail classification.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'ai-powered-features',
          heading: 'AI-Powered Certificate Features',
          content: (
            <>
              <p>
                Four AI tools accelerate the certification process, saving time on the tasks that
                slow electricians down most:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">AI Board Scanner</span> — photograph a
                  consumer unit and extract circuit data in seconds. The{' '}
                  <SEOInternalLink href="/tools/board-scanner">board scanner</SEOInternalLink>{' '}
                  identifies MCBs, RCBOs, RCDs, SPDs, and reads current ratings from the device
                  face. A 12-circuit board that takes 10 minutes to record manually is scanned in
                  under 30 seconds.
                </li>
                <li>
                  <span className="font-semibold text-white">Voice Test Entry</span> — speak test
                  readings aloud while holding test leads. AI transcribes values directly into the
                  schedule of test results. Understands R1+R2, IR, Zs, Ze, PFC, and RCD trip time.
                  Hands-free data entry on site.
                </li>
                <li>
                  <span className="font-semibold text-white">Defect Code AI</span> — describe any
                  defect in plain English and receive the correct C1/C2/C3/FI classification, the
                  specific BS 7671 regulation reference, and a professionally worded observation for
                  your certificate.
                </li>
                <li>
                  <span className="font-semibold text-white">AI Remedial Cost Estimator</span> —
                  converts EICR defects into a priced remedial works quotation with itemised
                  materials and labour at current UK trade prices.
                </li>
              </ul>
            </>
          ),
          appBridge: {
            title: 'AI Tools for Faster Certificates',
            description:
              'Board scanner, voice test entry, defect code AI, and remedial cost estimator. Four AI tools that cut certificate completion time by up to 60%. Included in all plans.',
            icon: Brain,
          },
        },
        {
          id: 'digital-signatures',
          heading: 'Digital Signatures',
          content: (
            <>
              <p>
                Every certificate type supports digital signature capture. The inspector, designer,
                installer, and commissioner can each sign directly on the phone screen. Signatures
                are embedded in the certificate PDF and stored securely in the cloud.
              </p>
              <p>
                The signature capture uses high-resolution touch input that produces clean,
                professional signatures even on smaller phone screens. Touch targets are 44px
                minimum and designed for use with both fingers and styluses.
              </p>
              <p>
                For multi-party certificates (such as EICs where the designer, installer, and
                commissioner may be different people), each party can sign on the same device or
                receive a signing link. The certificate is only finalised when all required
                signatures are in place.
              </p>
            </>
          ),
        },
        {
          id: 'pdf-export-delivery',
          heading: 'Professional PDF Export and Delivery',
          content: (
            <>
              <p>
                Completed certificates export as professional PDF documents formatted to meet scheme
                provider requirements. The PDF layout follows the BS 7671 Appendix 6 model forms
                with clear formatting, proper tables, and all required sections.
              </p>
              <p>Delivery options include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-semibold text-white">Email</span> — send the PDF directly
                  from the app to the client's email address
                </li>
                <li>
                  <span className="font-semibold text-white">WhatsApp</span> — share via WhatsApp
                  for clients who prefer messaging
                </li>
                <li>
                  <span className="font-semibold text-white">Download</span> — save to your device
                  for printing or filing
                </li>
                <li>
                  <span className="font-semibold text-white">Cloud storage</span> — all certificates
                  stored automatically, accessible from any device
                </li>
              </ul>
              <p>
                You can complete and send a certificate before leaving the property. Complete the
                EICR, capture signatures, generate the PDF, and email it to the landlord — all while
                standing in the client's hallway.
              </p>
            </>
          ),
        },
        {
          id: 'offline-cloud',
          heading: 'Offline Support and Cloud Storage',
          content: (
            <>
              <p>
                All certificate types work fully offline. Data saves locally every 10 seconds and
                syncs to the cloud every 30 seconds when connectivity returns. You can complete
                entire certificates without any internet connection.
              </p>
              <p>
                The{' '}
                <SEOInternalLink href="/tools/offline-electrical-app">
                  offline capability
                </SEOInternalLink>{' '}
                extends to the entire certificate workflow: filling in property details, recording
                supply characteristics, entering circuit schedules, inputting test results,
                recording observations, capturing digital signatures, and generating PDF exports.
                Only the AI-powered tools require connectivity.
              </p>
              <p>
                Cloud storage means your certificates are accessible from any device. Start a
                certificate on your phone, continue on a tablet, and review on your desktop. All
                data is encrypted at rest and in transit, with full GDPR compliance.
              </p>
            </>
          ),
        },
        {
          id: 'bs7671-compliance',
          heading: 'BS 7671:2018+A3:2024 Compliance',
          content: (
            <>
              <p>
                Elec-Mate automatically validates test results against BS 7671:2018+A3:2024
                requirements. When you enter an earth fault loop impedance reading, the app checks
                it against the maximum permitted Zs value for the specific protective device type
                and rating on that circuit.
              </p>
              <p>Validation covers:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Earth fault loop impedance (Zs) against maximum values from Tables 41.2, 41.3, and
                  41.4
                </li>
                <li>Insulation resistance minimum acceptable values</li>
                <li>RCD operation times against Table 41.1</li>
                <li>Continuity readings for ring circuit compliance</li>
                <li>Prospective fault current against protective device breaking capacity</li>
              </ul>
              <p>
                Automatic validation catches errors before they appear on the final certificate. It
                is like having a second pair of eyes checking every test result against the
                regulations. For more on testing procedures, see our{' '}
                <SEOInternalLink href="/guides/testing-sequence">
                  testing sequence guide
                </SEOInternalLink>{' '}
                and{' '}
                <SEOInternalLink href="/guides/bs7671-eighteenth-edition">
                  BS 7671 18th Edition guide
                </SEOInternalLink>
                .
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Select your certificate type',
          text: 'Choose from 8 certificate types — EICR, EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, or PAT. Each opens a form following the relevant model template.',
        },
        {
          name: 'Enter property and supply details',
          text: 'Fill in the client details, property address, supply characteristics, and earthing arrangement. Smart defaults and auto-complete speed up data entry.',
        },
        {
          name: 'Scan the board or enter circuits manually',
          text: 'Use the AI Board Scanner to photograph the consumer unit and auto-fill the circuit schedule, or enter circuit details manually.',
        },
        {
          name: 'Record test results',
          text: 'Enter test readings manually or use Voice Test Entry to speak them hands-free. Results are validated against BS 7671 maximum permitted values automatically.',
        },
        {
          name: 'Add observations and sign',
          text: 'Record any observations with C1/C2/C3/FI codes (Defect Code AI can help). Capture digital signatures from all required parties.',
        },
        {
          name: 'Generate PDF and deliver',
          text: 'Generate a professional PDF certificate and send it via email, WhatsApp, or save to cloud storage. Complete before leaving the property.',
        },
      ]}
      howToHeading="How to Create a Digital Certificate"
      howToDescription="Six steps from blank form to delivered PDF."
      features={[
        {
          icon: FileCheck2,
          title: '8 Certificate Types',
          description:
            'EICR, EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, and PAT. All included, unlimited usage.',
        },
        {
          icon: Camera,
          title: 'AI Board Scanner',
          description:
            'Photograph consumer units and auto-fill circuit schedules. Identifies MCBs, RCBOs, RCDs, SPDs, and reads current ratings.',
        },
        {
          icon: Mic,
          title: 'Voice Test Entry',
          description:
            'Speak test readings hands-free while holding test leads. AI transcribes directly into the schedule of test results.',
        },
        {
          icon: Brain,
          title: 'Defect Code AI',
          description:
            'Describe any defect in plain English. Receive the correct C1/C2/C3/FI code and BS 7671 regulation reference instantly.',
        },
        {
          icon: PenTool,
          title: 'Digital Signatures',
          description:
            'Sign on screen with finger or stylus. Multi-party signing for EICs. Signatures embedded in the certificate PDF.',
        },
        {
          icon: WifiOff,
          title: 'Full Offline Support',
          description:
            'Complete certificates without signal. Auto-save every 10 seconds. Cloud sync when online. Zero data loss guarantee.',
        },
      ]}
      featuresHeading="Certificate App Features"
      featuresSubheading="Everything included in the Elec-Mate digital certificates platform."
      faqs={[
        {
          question: 'How many certificate types does Elec-Mate support?',
          answer:
            'Elec-Mate supports 8 certificate types: EICR (Electrical Installation Condition Report), EIC (Electrical Installation Certificate), Minor Works Certificate, EV Charger Installation Certificate, Solar PV Certificate, Fire Alarm Commissioning Certificate, Emergency Lighting Certificate, and PAT Testing. All 8 types are included in the standard subscription with unlimited usage — there are no per-certificate charges.',
        },
        {
          question: 'Are certificates compliant with BS 7671?',
          answer:
            'Yes. All certificate forms follow the model forms in BS 7671:2018+A3:2024 Appendix 6. Test results are automatically validated against maximum permitted values from the relevant BS 7671 tables. Observation codes (C1, C2, C3, FI) follow the standard classification system. The output PDF is formatted to meet scheme provider requirements.',
        },
        {
          question: 'Can I send certificates via WhatsApp?',
          answer:
            'Yes. Completed certificates export as professional PDF documents that can be shared via WhatsApp, email, or any other sharing method available on your phone. WhatsApp delivery is particularly popular for landlords and letting agents. You can send the certificate directly from the app before leaving the property.',
        },
        {
          question: 'Do certificates work offline?',
          answer:
            'Yes. All certificate types work fully offline. Data saves locally every 10 seconds and syncs to the cloud every 30 seconds when connectivity returns. You can complete entire certificates — including property details, circuit schedules, test results, observations, and digital signatures — without any internet connection.',
        },
        {
          question: 'What is Voice Test Entry?',
          answer:
            'Voice Test Entry uses AI speech recognition to transcribe your test readings into the schedule of test results. You speak naturally — for example, "circuit 3, Zs, 0.68 ohms" — and the AI places the value in the correct field automatically. It works while you hold test leads in both hands, eliminating the need to put down instruments to type on your phone.',
        },
        {
          question: 'How does the Defect Code AI work?',
          answer:
            'Describe any defect in plain English — for example, "no RCD protection on socket outlet circuits" — and the AI returns the correct classification (C1/C2/C3/FI), the specific BS 7671 regulation reference, and a professionally worded observation for your certificate. The AI is trained on BS 7671:2018+A3:2024 and thousands of real-world EICR observations.',
        },
        {
          question: 'How much does Elec-Mate cost for certificates?',
          answer:
            'Elec-Mate starts from £4.99 per month with unlimited certificate generation across all 8 types. There are no per-certificate charges, no credit limits, and no usage caps. The subscription also includes 70+ BS 7671 calculators, 5 AI specialist agents, 46+ training courses, and business management features. Every plan includes a 7-day free trial with full access.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/board-scanner',
          title: 'AI Board Scanner',
          description:
            'Photograph consumer units and auto-fill certificate schedules with AI photo recognition.',
          icon: Camera,
          category: 'AI Tools',
        },
        {
          href: '/tools/eicr-certificate',
          title: 'EICR Certificate',
          description:
            'Full EICR with AI board scanner, voice test entry, and automatic BS 7671 validation.',
          icon: FileCheck2,
          category: 'Certificates',
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
          href: '/tools/electrician-app-iphone',
          title: 'Electrician App for iPhone',
          description:
            'Native iOS experience with all 8 certificate types, calculators, AI tools, and offline support.',
          icon: Smartphone,
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
          href: '/tools/employer-electrical-platform',
          title: 'Employer Platform',
          description:
            'Manage your team, track apprentices, oversee certificates, and monitor compliance.',
          icon: Building,
          category: 'Platform',
        },
      ]}
      ctaHeading="Try all 8 certificate types free for 7 days"
      ctaSubheading="AI Board Scanner, Voice Test Entry, Defect Code AI, digital signatures, PDF export, and unlimited certificates. One subscription, all features included."
      toolPath="/tools/digital-certificates-app"
    />
  );
}
