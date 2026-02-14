import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Camera,
  Cpu,
  FileCheck2,
  Layers,
  WifiOff,
  Zap,
  ScanLine,
  Timer,
  ShieldCheck,
  Brain,
  Smartphone,
  GraduationCap,
  Calculator,
  Building,
} from 'lucide-react';

export default function BoardScannerToolPage() {
  return (
    <ToolTemplate
      title="AI Board Scanner | Consumer Unit Photo Recognition"
      description="Elec-Mate's AI Board Scanner photographs consumer units and automatically identifies MCBs, RCBOs, RCDs, circuit details, and board layout. Auto-fills EICR and EIC certificates in seconds. Works with all major UK manufacturers including Hager, Wylex, Schneider, MK, and Contactum."
      datePublished="2026-01-15"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'AI Board Scanner', href: '/tools/board-scanner' },
      ]}
      tocItems={[
        { id: 'how-it-works', label: 'How It Works' },
        { id: 'photo-recognition', label: 'Photo Recognition Technology' },
        { id: 'device-identification', label: 'Device Identification' },
        { id: 'auto-population', label: 'Auto-Population of Certificates' },
        { id: 'supported-boards', label: 'Supported Board Types' },
        { id: 'offline-scanning', label: 'Offline and On-Site Use' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="AI-Powered Tool"
      badgeIcon={Camera}
      heroTitle={
        <>
          <span className="text-yellow-400">AI Board Scanner</span> — Photograph a Consumer Unit,
          Auto-Fill Your Certificate
        </>
      }
      heroSubtitle="Point your phone camera at any consumer unit. The AI identifies every MCB, RCBO, RCD, and SPD — reading current ratings, mapping the board layout, and populating your EICR or EIC form automatically. What used to take 10 minutes of manual data entry now takes under 30 seconds."
      heroFeaturePills={[
        { icon: Camera, label: 'Photo Recognition' },
        { icon: Cpu, label: 'AI-Powered' },
        { icon: Timer, label: 'Under 30 Seconds' },
        { icon: FileCheck2, label: 'Auto-Fills Certificates' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'The AI Board Scanner photographs a consumer unit and extracts circuit data, device ratings, manufacturer, and board layout in under 30 seconds.',
        'Supports all major UK consumer unit manufacturers including Hager, Wylex, Schneider, MK, Contactum, and Fusebox.',
        'Scanned data flows directly into EICR and EIC certificate forms — circuit numbers, descriptions, cable sizes, and protective device details are all pre-populated.',
        'Works with single-row domestic boards, split-load boards, three-phase distribution boards, and commercial panels.',
        'AI identifies MCBs, RCBOs, RCDs, isolators, SPDs, and AFDDs by their physical appearance, label text, and component shape.',
      ]}
      sections={[
        {
          id: 'how-it-works',
          heading: 'How the AI Board Scanner Works',
          content: (
            <>
              <p>
                The AI Board Scanner transforms the most tedious part of electrical certification —
                manually recording every circuit in a consumer unit — into a single photograph. Open
                the scanner in Elec-Mate, point your phone camera at the board, and tap to capture.
                The AI analyses the image and returns a complete schedule of circuits within
                seconds.
              </p>
              <p>
                The technology uses advanced computer vision trained on thousands of UK consumer
                units. It recognises protective devices by their physical shape, label text, colour
                coding, and spatial position within the board. The result is a structured dataset
                that maps directly onto your{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                <SEOInternalLink href="/tools/eic-certificate">EIC certificate</SEOInternalLink>{' '}
                schedule of circuits.
              </p>
              <p>
                You always review the extracted data before it enters your certificate. The AI is
                highly accurate with modern, well-labelled boards — typically 95% or higher — but
                older, modified, or poorly labelled boards may require more manual correction. Even
                so, reviewing and correcting is far faster than typing everything from scratch.
              </p>
            </>
          ),
          appBridge: {
            title: 'Try the AI Board Scanner',
            description:
              'Photograph any consumer unit. The AI extracts circuit data, device ratings, and board layout in seconds. Review, edit, and it flows straight into your certificate.',
            icon: Camera,
          },
        },
        {
          id: 'photo-recognition',
          heading: 'Photo Recognition Technology',
          content: (
            <>
              <p>
                The scanner uses a multi-stage recognition pipeline. First, it detects the overall
                board layout — identifying the enclosure boundaries, DIN rail positions, and device
                locations. Then it analyses each device individually, reading the text on labels,
                identifying the device type from its physical characteristics, and extracting the
                current rating.
              </p>
              <p>
                Modern consumer units with clear labelling and clean circuit charts produce the best
                results. The AI can read both printed labels and handwritten circuit descriptions,
                though printed text is more reliably recognised. For boards with a circuit chart on
                the door or cover, the scanner can extract circuit descriptions from the chart and
                match them to the corresponding devices.
              </p>
              <p>
                The recognition works in real-world lighting conditions — including the dim lighting
                typical of meter cupboards and basement plant rooms. The camera flash provides
                supplementary illumination when needed. For best results, ensure the board cover is
                removed and all devices are visible.
              </p>
              <p>
                This technology powers the same AI capabilities used across{' '}
                <SEOInternalLink href="/tools/digital-certificates-app">
                  all 8 certificate types
                </SEOInternalLink>{' '}
                in Elec-Mate, giving you a seamless workflow from board scan to completed
                certificate.
              </p>
            </>
          ),
        },
        {
          id: 'device-identification',
          heading: 'MCB, RCBO, RCD, and SPD Identification',
          content: (
            <>
              <p>
                The AI identifies the following device types by their physical appearance and label
                information:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">
                    MCBs (Miniature Circuit Breakers)
                  </span>{' '}
                  — type B, C, and D identified from the trip curve marking. Current ratings from 6A
                  to 125A recognised from the device face.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    RCBOs (Residual Current Breaker with Overcurrent)
                  </span>{' '}
                  — identified by the wider body, test button, and dual function labelling. Both
                  Type A and Type AC variants recognised.
                </li>
                <li>
                  <span className="font-semibold text-white">RCDs (Residual Current Devices)</span>{' '}
                  — main switch RCDs and split-load RCDs identified by size, test button position,
                  and rated residual operating current (typically 30mA or 100mA).
                </li>
                <li>
                  <span className="font-semibold text-white">SPDs (Surge Protection Devices)</span>{' '}
                  — identified by their distinctive form factor, status indicator window, and
                  manufacturer markings. Type 2 SPDs are the most common in domestic boards.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    AFDDs (Arc Fault Detection Devices)
                  </span>{' '}
                  — identified by the AFDD marking and wider module width. Required under BS
                  7671:2018+A2:2022 for certain high-risk locations.
                </li>
                <li>
                  <span className="font-semibold text-white">Main Switch / Isolator</span> — the
                  main incoming isolator identified by position, size, and current rating (typically
                  80A or 100A for domestic installations).
                </li>
              </ul>
              <p>
                Each device identification includes the manufacturer where recognisable. The AI is
                trained on components from Hager, Wylex, Schneider Electric, MK, Contactum, Fusebox,
                Chint, and other common UK brands. For more on how these devices relate to{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  consumer unit regulations
                </SEOInternalLink>
                , see our dedicated guide.
              </p>
            </>
          ),
        },
        {
          id: 'auto-population',
          heading: 'Auto-Population of Certificate Forms',
          content: (
            <>
              <p>
                The real power of the Board Scanner is what happens after recognition. The extracted
                data flows directly into your certificate form, pre-populating fields that would
                otherwise require manual entry:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Circuit numbers assigned in order from left to right across the board</li>
                <li>Circuit descriptions from the circuit chart (where available)</li>
                <li>Protective device type (MCB, RCBO, RCD) for each circuit</li>
                <li>Current rating of each protective device</li>
                <li>Trip curve type (B, C, or D) for MCBs</li>
                <li>RCD rated residual operating current where applicable</li>
                <li>Main switch rating and type</li>
              </ul>
              <p>
                For a typical 12-circuit domestic consumer unit, this eliminates approximately 5-10
                minutes of manual data entry per certificate. Over the course of a week — if you are
                completing 3-5 EICRs daily — this saves 1-3 hours of administrative time. That is
                time you can spend on actual testing or travelling to your next job.
              </p>
              <p>
                The auto-population works with both{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR certificates</SEOInternalLink>{' '}
                and{' '}
                <SEOInternalLink href="/tools/eic-certificate">EIC certificates</SEOInternalLink>.
                For{' '}
                <SEOInternalLink href="/tools/minor-works-certificate">
                  Minor Works certificates
                </SEOInternalLink>
                , the scanner can identify the specific circuit being worked on and pre-fill its
                details.
              </p>
            </>
          ),
          appBridge: {
            title: 'From Photo to Filled Certificate in Seconds',
            description:
              'The AI Board Scanner eliminates manual data entry. Photograph the board, review the extracted data, and your certificate schedule is ready. Included in all Elec-Mate plans.',
            icon: FileCheck2,
          },
        },
        {
          id: 'supported-boards',
          heading: 'Supported Board Types and Manufacturers',
          content: (
            <>
              <p>
                The AI Board Scanner works with virtually every type of consumer unit and
                distribution board found in UK installations:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Single-row domestic boards</span> —
                  standard domestic consumer units with a single DIN rail, typically 6-18 ways. The
                  most common board type and the one the AI handles most accurately.
                </li>
                <li>
                  <span className="font-semibold text-white">Split-load boards</span> — boards with
                  an RCD protecting one bank of circuits. The AI identifies the split-load
                  configuration and maps circuits to the correct RCD protection group.
                </li>
                <li>
                  <span className="font-semibold text-white">Dual RCD boards</span> — boards with
                  two RCDs protecting separate banks. Circuit grouping and RCD assignment are
                  correctly identified.
                </li>
                <li>
                  <span className="font-semibold text-white">RCBO boards</span> — fully populated
                  RCBO boards where every circuit has individual RCD protection. Each RCBO is
                  identified with its dual rating (overcurrent and residual current).
                </li>
                <li>
                  <span className="font-semibold text-white">Three-phase distribution boards</span>{' '}
                  — commercial and industrial boards with three-phase supply. Phase allocation is
                  identified where labelling permits.
                </li>
              </ul>
              <p>
                Older rewireable fuse boards and BS 3036 fusegear are also recognised, though with
                lower confidence due to the lack of standardised labelling. The AI identifies fuse
                carriers and approximate ratings from physical size and colour coding. For these
                boards, you should expect to make more manual corrections after scanning.
              </p>
            </>
          ),
        },
        {
          id: 'offline-scanning',
          heading: 'On-Site Use and Connectivity',
          content: (
            <>
              <p>
                The Board Scanner requires a network connection because the AI image processing runs
                on cloud servers. However, the scan itself takes only a few seconds — even on a slow
                3G connection, the round trip is typically under 10 seconds. On 4G or 5G, results
                return in 2-5 seconds.
              </p>
              <p>
                If you are in a location with no signal at all, you can photograph the board and
                process the scan later when connectivity returns. The photo is saved locally and
                queued for processing. Once you are back in range, the scan completes and the data
                populates your certificate.
              </p>
              <p>
                The rest of the certificate workflow — entering property details, recording test
                results, adding observations, capturing signatures — works fully offline. See our{' '}
                <SEOInternalLink href="/tools/offline-electrical-app">
                  offline electrical app
                </SEOInternalLink>{' '}
                page for full details on offline capabilities. You can also explore our full range
                of{' '}
                <SEOInternalLink href="/tools/electrical-testing-calculators">
                  electrical testing calculators
                </SEOInternalLink>{' '}
                that work without an internet connection.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Open the Board Scanner',
          text: 'Navigate to your EICR or EIC certificate in Elec-Mate and tap the Board Scanner icon in the circuit schedule section.',
        },
        {
          name: 'Remove the board cover',
          text: 'Remove the consumer unit cover to expose all protective devices. Ensure all devices are visible and the board is well-lit.',
        },
        {
          name: 'Photograph the board',
          text: 'Hold your phone steady and capture a clear photo of the entire board. The camera guides you with framing indicators to ensure all devices are included.',
        },
        {
          name: 'Review the extracted data',
          text: 'The AI returns a complete circuit schedule within seconds. Review each circuit — device type, rating, and description — and make any corrections needed.',
        },
        {
          name: 'Confirm and populate',
          text: 'Tap Confirm to populate your certificate schedule. All circuit data flows into the correct fields. Continue with your inspection and testing.',
        },
      ]}
      howToHeading="How to Use the AI Board Scanner"
      howToDescription="Five steps from photograph to populated certificate schedule."
      features={[
        {
          icon: Camera,
          title: 'Photo Recognition',
          description:
            'Point your phone camera at any consumer unit. The AI analyses the image and identifies every device, rating, and circuit layout.',
        },
        {
          icon: ScanLine,
          title: 'MCB and RCBO Identification',
          description:
            'Identifies MCBs, RCBOs, RCDs, SPDs, AFDDs, and isolators by physical appearance, label text, and manufacturer characteristics.',
        },
        {
          icon: FileCheck2,
          title: 'Auto-Population',
          description:
            'Extracted data flows directly into your EICR or EIC form. Circuit numbers, device types, ratings, and descriptions are pre-filled automatically.',
        },
        {
          icon: Layers,
          title: 'Multiple Board Types',
          description:
            'Works with single-row, split-load, dual RCD, full RCBO, and three-phase distribution boards from all major UK manufacturers.',
        },
        {
          icon: Timer,
          title: 'Under 30 Seconds',
          description:
            'A typical 12-circuit domestic board is scanned and processed in under 30 seconds. Manual data entry for the same board takes 5-10 minutes.',
        },
        {
          icon: ShieldCheck,
          title: 'Review and Verify',
          description:
            'You always review extracted data before it enters your certificate. Edit any field, correct any misread, and confirm when satisfied.',
        },
      ]}
      featuresHeading="Board Scanner Features"
      featuresSubheading="Everything the AI Board Scanner delivers when you photograph a consumer unit."
      faqs={[
        {
          question: 'How accurate is the AI Board Scanner?',
          answer:
            'For modern, well-labelled consumer units from major UK manufacturers (Hager, Wylex, Schneider, MK, Contactum, Fusebox), accuracy is typically 95% or higher for device type and current rating identification. Older boards, modified boards, or boards with damaged/missing labels may have lower accuracy. You always review and verify the extracted data before it enters your certificate.',
        },
        {
          question: 'Which consumer unit manufacturers does the scanner support?',
          answer:
            'The AI is trained on consumer units from Hager, Wylex, Schneider Electric, MK, Contactum, Fusebox, Chint, Lewden, and other brands commonly found in UK domestic and commercial installations. It also recognises older boards from manufacturers like Crabtree, Bill, and MEM, though accuracy may be lower for legacy equipment.',
        },
        {
          question: 'Does the Board Scanner work offline?',
          answer:
            'The AI processing requires a network connection because image analysis runs on cloud servers. However, you can photograph the board offline and queue the scan for processing when connectivity returns. The photo is saved locally. On 4G, scan results typically return in 2-5 seconds. On 3G, expect 5-10 seconds.',
        },
        {
          question: 'Can the scanner read handwritten circuit charts?',
          answer:
            'Yes, the AI can read both printed and handwritten circuit descriptions from circuit charts on the board cover or door. Printed text is more reliably recognised than handwriting. Clear, legible handwriting in standard electrical abbreviations produces the best results. Heavily abbreviated or illegible handwriting may require manual correction.',
        },
        {
          question: 'Does the Board Scanner work with three-phase boards?',
          answer:
            'Yes. The scanner recognises three-phase distribution boards used in commercial and industrial installations. It identifies TP and TP&N devices, maps phase allocation where labelling permits, and handles larger boards with 24+ ways. Phase identification depends on clear labelling — unlabelled three-phase boards may require manual phase assignment after scanning.',
        },
        {
          question: 'How does the scanner handle split-load boards?',
          answer:
            'The AI identifies split-load configurations automatically, recognising the RCD that protects one bank of circuits. Circuits are correctly grouped under their respective RCD protection. Dual RCD boards and fully RCBO-populated boards are also handled correctly, with each circuit mapped to its individual or group protection device.',
        },
        {
          question: 'Is the Board Scanner included in all Elec-Mate plans?',
          answer:
            'Yes. The AI Board Scanner is included in all Elec-Mate subscription plans from £4.99 per month. There are no additional charges for scans and no usage limits. You can scan as many boards as you need. The feature is available on both iPhone and Android devices.',
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
            'Native iOS experience with all features — board scanner, certificates, calculators, and training.',
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
            'Manage your team, track apprentices, oversee certificates, and monitor compliance from one dashboard.',
          icon: Building,
          category: 'Platform',
        },
      ]}
      ctaHeading="Scan your first board free"
      ctaSubheading="7-day free trial includes unlimited board scans, all 8 certificate types, 70+ calculators, and every AI tool. No card required to start."
      toolPath="/tools/board-scanner"
    />
  );
}
