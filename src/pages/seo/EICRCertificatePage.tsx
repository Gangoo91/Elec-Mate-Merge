import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { SEOPageShell } from '@/components/seo/SEOPageShell';
import { SEOReadingMeta } from '@/components/seo/SEOReadingMeta';
import { SEOKeyTakeaways } from '@/components/seo/SEOKeyTakeaways';
import { SEOFAQAccordion } from '@/components/seo/SEOFAQAccordion';
import { SEOHowToSteps } from '@/components/seo/SEOHowToSteps';
import { SEORelatedPages, type RelatedPage } from '@/components/seo/SEORelatedPages';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOSocialShare } from '@/components/seo/SEOSocialShare';
import { SEOSocialFollow } from '@/components/seo/SEOSocialFollow';
import {
  FileCheck2,
  Smartphone,
  PenTool,
  ShieldCheck,
  Download,
  AlertTriangle,
  CheckCircle2,
  ListChecks,
  BookOpen,
  Zap,
  FileText,
  Calculator,
  GraduationCap,
  ClipboardCheck,
  Search,
  Camera,
  Brain,
  Send,
  Cloud,
  Receipt,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Mail,
  Mic,
  X,
  Check,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'EICR Certificate Guide 2026 | Digital EICR App UK';
const PAGE_DESCRIPTION =
  'Complete EICR certificate guide for UK electricians. Create professional Electrical Installation Condition Reports on your phone. Digital signatures, observation coding, PDF export, BS 7671 compliant. Start free.';

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EICR Certificate', href: '/tools/eicr-certificate' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'when-required', label: 'When Is It Required?' },
  { id: 'observation-codes', label: 'Observation Codes' },
  { id: 'how-to-create', label: 'How to Create an EICR' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'why-electricians-switch', label: 'Why Electricians Switch' },
  { id: 'how-elecmate-helps', label: 'EICR Features' },
  { id: 'vs-paper', label: 'vs Paper & Desktop' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An EICR is the standard UK report for recording the condition of a fixed electrical installation, replacing the older PIR.',
  'Landlords in England must have a valid EICR before tenants move in and renew it every 5 years — penalties of up to £30,000 per breach.',
  'Any C1 or C2 observation code makes the overall assessment Unsatisfactory — Elec-Mate tracks this automatically.',
  'You can create, sign, and export a professional EICR as a PDF directly from your phone using Elec-Mate.',
  'BS 7671:2018 + Amendment 3:2024 is the current standard. Amendment 4 is expected in 2026.',
];

const faqs = [
  {
    question: 'How often does an EICR need to be carried out?',
    answer:
      'The frequency depends on the type of installation. For domestic properties, an EICR is recommended every 10 years for owner-occupied homes and every 5 years for rented properties (a legal requirement since April 2021 under the Electrical Safety Standards in the Private Rented Sector Regulations 2020). Houses in Multiple Occupation (HMOs) require an EICR every 5 years. Commercial premises typically require an EICR every 5 years, while industrial installations may need one every 3 years. Swimming pools and similar special locations should be inspected annually.',
  },
  {
    question: 'What do the EICR observation codes C1, C2, C3, and FI mean?',
    answer:
      'There are four classification codes used on an EICR. C1 (Danger Present) means there is an immediate risk of injury and the issue requires urgent remedial action — the person responsible for the installation should be advised to take immediate action. C2 (Potentially Dangerous) means there is a risk of injury that requires urgent remedial action. C3 (Improvement Recommended) indicates the installation does not comply with current regulations but is not imminently dangerous — improvement is recommended. FI (Further Investigation) means the inspector could not fully assess a part of the installation and further investigation is needed before a classification can be given.',
  },
  {
    question: 'Can I issue an EICR certificate using a phone or tablet?',
    answer:
      'Yes. Elec-Mate is specifically designed for electricians to complete EICR certificates on mobile devices. The app provides the full EICR form structure including all required sections — supply characteristics, particulars of the installation, observations and recommendations, test results, and the declaration. Digital signatures can be captured on-screen, and the completed certificate exports as a professional PDF ready to send to clients or upload to scheme provider portals.',
  },
  {
    question: 'What qualifications do I need to carry out an EICR?',
    answer:
      'To carry out an EICR, you must be a competent person as defined by BS 7671. In practice, this means holding a current edition qualification (the 18th Edition IET Wiring Regulations, C&G 2382), plus an inspection and testing qualification such as C&G 2391 (Inspection and Testing) or C&G 2394/2395 (the older equivalents). You should also hold a relevant NVQ Level 3 or equivalent in Electrical Installation. Most competent person scheme providers (such as NICEIC, NAPIT, or ELECSA) require these qualifications for their registered members who carry out periodic inspection and testing.',
  },
  {
    question: 'Is an unsatisfactory EICR result legally enforceable for landlords?',
    answer:
      'Yes, since 1 April 2021 in England. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, landlords must obtain an EICR from a qualified person before the start of a new tenancy and at least every 5 years thereafter. If the report is unsatisfactory (meaning any C1 or C2 observations are recorded), the landlord must complete remedial work within 28 days or any shorter period specified by the inspector. Failure to comply can result in local authority enforcement, including civil penalties of up to £30,000 per breach.',
  },
  {
    question: 'What is the difference between an EICR and an EIC?',
    answer:
      'An EICR (Electrical Installation Condition Report) is used for periodic inspection and testing of an existing installation — it reports on the current condition. An EIC (Electrical Installation Certificate) is issued after new installation work or a significant alteration to confirm it complies with BS 7671 at the time of completion. In short: EIC for new work, EICR for existing installations. See our full comparison in the EICR vs EIC guide.',
  },
  {
    question: 'What parts of the installation does an EICR cover?',
    answer:
      'An EICR covers the fixed electrical installation from the origin (usually the meter position or main switch) through the distribution board(s) and all final circuits to the accessories (sockets, switches, light fittings, etc.). It includes dead testing (continuity of protective conductors, insulation resistance, polarity) and live testing (earth fault loop impedance, RCD operation, prospective fault current). The inspector must also carry out a visual inspection of all accessible parts of the installation.',
  },
  {
    question: 'How long does an EICR take to complete?',
    answer:
      'The time varies depending on the size and condition of the installation. A typical domestic EICR for a 2-3 bedroom house with a single consumer unit (8-12 circuits) takes around 2-4 hours for an experienced electrician. Larger properties, older wiring, or installations with multiple distribution boards take longer. Commercial and industrial EICRs can take days depending on the scale. Using Elec-Mate speeds up the paperwork significantly — you enter results directly on your phone instead of writing on paper and re-typing later.',
  },
];

const howToSteps = [
  {
    name: 'Open the EICR form',
    text: 'Launch Elec-Mate and tap "New EICR" from the certificates section. The app creates a fresh Electrical Installation Condition Report with all the required sections pre-loaded.',
  },
  {
    name: 'Enter supply characteristics',
    text: 'Record the supply details including the earthing arrangement (TN-C-S, TN-S, TT, etc.), supply conductor type, nominal voltage, prospective fault current, and external earth fault loop impedance (Ze). The app validates entries against expected ranges.',
  },
  {
    name: 'Fill in installation particulars',
    text: 'Document the installation details including the number of circuits, main protective devices, presence of RCDs, and any limitations on the inspection. Add details about the distribution boards and circuits.',
  },
  {
    name: 'Record test results',
    text: 'Enter your test results for each circuit — continuity of protective conductors (R1+R2), insulation resistance, polarity, earth fault loop impedance (Zs), and RCD operating times. The app auto-checks values against BS 7671 maximum permitted values.',
  },
  {
    name: 'Add observations',
    text: 'For each deficiency found, add an observation and assign the correct classification code: C1, C2, C3, or FI. The app guides you through the coding criteria and keeps a running tally of observations.',
  },
  {
    name: 'Determine the overall assessment',
    text: 'Based on the observation codes, the app helps determine whether the overall condition is Satisfactory or Unsatisfactory. Any C1 or C2 observation automatically makes the report Unsatisfactory.',
  },
  {
    name: 'Capture signatures and export',
    text: 'Add your digital signature and the client signature on-screen. Export the completed EICR as a professional PDF, ready to email to the client, upload to your scheme provider, or store in your records.',
  },
];

// The killer EICR features — what's actually IN the app
const killerFeatures = [
  {
    icon: Camera,
    title: 'AI Board Scanner',
    subtitle: 'Point your camera at the DB. Done.',
    description:
      'Open the board scanner, point your phone at any distribution board, and Elec-Mate reads it. Circuit details, MCB/RCBO ratings, RCD types, cable sizes — all captured from the photo. No more squinting at faded labels and scribbling on the back of your hand.',
    color: 'yellow',
  },
  {
    icon: Brain,
    title: 'Defect Code AI',
    subtitle: 'Describe it. Get the right code.',
    description:
      'Type or dictate a defect in plain English — "no RCD protection on socket circuit in bathroom" — and the AI returns the correct observation code with the matching BS 7671 regulation number. No more flicking through guidance notes trying to decide between C2 and C3.',
    color: 'blue',
  },
  {
    icon: Sparkles,
    title: 'Voice to Test Results',
    subtitle: 'Talk to fill in the schedule of tests.',
    description:
      'You are on site, probes in hand. Just speak: "Ring circuit 1, R1+R2 0.32, Zs 0.89, insulation resistance 200 megohms, RCD 18 milliseconds." Elec-Mate fills in the schedule of test results for you. Hands-free data entry while you work.',
    color: 'purple',
  },
  {
    icon: Receipt,
    title: 'Observations → Remedial Quote',
    subtitle: 'Turn every defect into money.',
    description:
      'Every C1, C2, and FI observation feeds straight into the remedial works estimator. It prices the fix — materials, labour, margin — and generates a quote on the spot. Hand the client the EICR and the quote for the remedial work in the same visit.',
    color: 'green',
  },
];

// Everything else built into the EICR tool
const features = [
  {
    icon: Send,
    title: 'Send to Client from Site',
    description:
      'Finished the EICR? Send the PDF to the client by email, WhatsApp, or any share method on your phone. They have it before you pack up your tools.',
  },
  {
    icon: Receipt,
    title: 'Invoice for the EICR',
    description:
      'Generate and send an invoice for the inspection itself — directly from the EICR. Client gets the certificate and the bill in one go. No chasing.',
  },
  {
    icon: BookOpen,
    title: 'Auto BS 7671 Regs',
    description:
      'Every field in the EICR links to the relevant BS 7671 regulation. Tap any section and the exact clause appears. The brown book lives in your pocket.',
  },
  {
    icon: PenTool,
    title: 'Digital Signatures',
    description:
      'Inspector and client sign on-screen. The signed PDF is final the moment the last signature is captured. No printing, no scanning, no paper.',
  },
  {
    icon: CheckCircle2,
    title: 'Live Test Value Validation',
    description:
      'Enter a Zs value and the app checks it against the maximum permitted value for that protective device instantly. Same for R1+R2, insulation resistance, and RCD times.',
  },
  {
    icon: AlertTriangle,
    title: 'Auto Overall Assessment',
    description:
      'The app watches your observation codes in real time. The moment a C1 or C2 is added, the overall assessment flips to Unsatisfactory automatically. No human error.',
  },
  {
    icon: Cloud,
    title: 'Cloud Sync + Offline',
    description:
      'Saves locally every 10 seconds, syncs to the cloud every 30 seconds. Works fully offline in basements and loft spaces. Your data is always safe.',
  },
  {
    icon: Smartphone,
    title: 'Phone, Tablet, or Laptop',
    description:
      'The full EICR form works on any screen. Designed for a 6-inch phone in a dark cupboard — big touch targets, no tiny buttons, no zooming.',
  },
  {
    icon: ListChecks,
    title: 'Full Schedule of Inspections',
    description:
      'The complete schedule of items inspected is built in, matching BS 7671 Appendix 6 model forms. Tick items off as you walk the installation.',
  },
  {
    icon: Download,
    title: 'Professional PDF Output',
    description:
      'The exported PDF meets NICEIC, NAPIT, and ELECSA scheme provider requirements. Clean, branded, and ready to upload to your portal.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671:2018 + A3:2024',
    description:
      'Form structure, observation codes, test value limits, and regulation references all track the current 18th Edition including Amendment 3.',
  },
  {
    icon: Calculator,
    title: '70 Calculators Built In',
    description:
      'Cable sizing, voltage drop, Zs, Ze, max demand, adiabatic, conduit fill, trunking fill — all accessible without leaving the app. One subscription.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Create Electrical Installation Certificates for new work and alterations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/minor-works-certificate',
    title: 'Minor Works Certificate',
    description: 'BS 7671 compliant Minor Works certificates for smaller jobs.',
    icon: FileText,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'In-depth guide to C1, C2, C3, and FI classification codes.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct order for dead and live testing per BS 7671.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/earth-loop-impedance-calculator',
    title: 'Earth Loop Impedance Calculator',
    description: 'Calculate and verify Zs values against maximum permitted values.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with the Elec-Mate training platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Schema data
// -------------------------------------------------------------------

const softwareAppSchema = SEOSchemas.softwareApplication(
  'Elec-Mate EICR Certificate App',
  PAGE_DESCRIPTION,
  '/tools/eicr-certificate'
);

const faqSchema = SEOSchemas.faqPage(faqs);

const howToSchema = SEOSchemas.howTo(
  'How to Create an EICR Certificate Using Elec-Mate',
  'A step-by-step guide to completing an Electrical Installation Condition Report using the Elec-Mate app on your phone or tablet.',
  howToSteps
);

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRCertificatePage() {
  useSEO({
    title: 'EICR Certificate Guide 2026 | Digital EICR App UK',
    description: PAGE_DESCRIPTION,
    schemas: [softwareAppSchema, faqSchema, howToSchema],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Certificates', url: '/guides/electrical-certificate-types-uk' },
      { name: 'EICR Certificate', url: '/tools/eicr-certificate' },
    ],
    datePublished: '2024-09-15',
    dateModified: '2026-02-13',
    author: 'Elec-Mate Technical Team',
  });

  return (
    <SEOPageShell breadcrumbs={breadcrumbs} tocItems={tocItems}>
      {/* Hero — stronger, feature-led */}
      <section className="pb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-5">
          <FileCheck2 className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-yellow-400">
            BS 7671:2018 + A3:2024 Compliant
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
          Scan the Board. Speak Your Results.{' '}
          <span className="text-yellow-400">Send the EICR Before You Leave.</span>
        </h1>

        <p className="text-lg text-white leading-relaxed mb-4">
          Elec-Mate is the EICR app that actually works the way you work. AI board scanner reads the
          DB from a photo. Voice-to-test-results fills in the schedule while your hands hold the
          probes. Defect code AI picks the right{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation code
          </SEOInternalLink>
          . Remedial works estimator turns every defect into a priced quote. Sign it, send it,
          invoice it — all from your phone, all on site.
        </p>

        {/* Mini feature pills in the hero */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { icon: Camera, label: 'Board Scanner' },
            { icon: Mic, label: 'Voice Test Entry' },
            { icon: Brain, label: 'Defect Code AI' },
            { icon: Receipt, label: 'Defects → Quotes' },
            { icon: Send, label: 'Send & Invoice' },
          ].map((pill) => (
            <span
              key={pill.label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white"
            >
              <pill.icon className="w-3.5 h-3.5 text-yellow-400" />
              {pill.label}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <a
            href="/auth/signup"
            className="inline-flex items-center gap-2 h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
          >
            Start 7-Day Free Trial <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#how-elecmate-helps"
            className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
          >
            See the Features
          </a>
        </div>

        <SEOReadingMeta readingTime={14} dateUpdated="Feb 2026" />

        <div className="mt-4 flex flex-wrap items-center gap-6">
          <SEOSocialShare url="/tools/eicr-certificate" title={PAGE_TITLE} />
          <SEOSocialFollow />
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="pb-10">
        <SEOKeyTakeaways takeaways={keyTakeaways} />
      </section>

      {/* What Is an EICR */}
      <section id="what-is-eicr" className="pb-10 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          What Is an EICR Certificate?
        </h2>
        <div className="space-y-4 text-white leading-relaxed">
          <p>
            An Electrical Installation Condition Report (EICR) is the formal document produced
            following a periodic inspection and testing of an electrical installation. It replaced
            the older Periodic Inspection Report (PIR) and is the standard form used across the UK
            electrical industry to record the condition of a fixed electrical installation in a
            building.
          </p>
          <p>
            The EICR is defined by{' '}
            <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
              BS 7671:2018
            </SEOInternalLink>{' '}
            (the IET Wiring Regulations, 18th Edition) and follows the model forms published in
            Appendix 6 of the standard. It records the extent of the installation inspected, the
            supply characteristics, details of the{' '}
            <SEOInternalLink href="/guides/earthing-arrangements">
              earthing arrangements
            </SEOInternalLink>
            , the test results for every circuit, and any observations about departures from the
            current standard or defects that could pose a danger.
          </p>
          <p>
            The purpose of the EICR is twofold. First, it provides a snapshot of the condition of an
            installation at a point in time, identifying any damage, deterioration, defects, or
            dangerous conditions. Second, it provides recommendations for remedial work needed to
            bring the installation up to an acceptable standard of safety. The overall assessment is
            either Satisfactory (meaning the installation is safe for continued use) or
            Unsatisfactory (meaning remedial work is needed).
          </p>
          <p>
            An EICR is not the same as a simple visual check. It involves dead testing (with the
            supply isolated) and live testing, covering{' '}
            <SEOInternalLink href="/guides/testing-sequence-guide">
              continuity of protective conductors, insulation resistance, polarity verification,
              earth fault loop impedance, prospective fault current, and RCD operation
            </SEOInternalLink>
            . The inspector must access distribution boards, remove covers where necessary, and test
            a representative sample of accessories.
          </p>
        </div>

        <SEOAppBridge
          title="Elec-Mate's AI Board Scanner reads the DB for you"
          description="Point your phone camera at the distribution board. The AI reads MCB/RCBO ratings, circuit details, and board layout from the photo — so you start the EICR with half the data already filled in."
          icon={Camera}
        />
      </section>

      {/* When Is an EICR Required */}
      <section id="when-required" className="pb-10 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          When Is an EICR Required?
        </h2>
        <div className="space-y-4 text-white leading-relaxed">
          <p>
            The recommended intervals for periodic inspection and testing depend on the type of
            installation and its use. These intervals are set out in Table 3.2 of the IET Guidance
            Note 3 (GN3, 9th Edition) and reflect the risk profile of different types of premises.
          </p>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
            <h3 className="font-bold text-white text-lg mb-4">Recommended EICR Intervals</h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span className="flex-1 text-left">
                  <strong>Domestic (owner-occupied):</strong> Every 10 years, or on change of
                  occupancy
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span className="flex-1 text-left">
                  <strong>Domestic (rented / private let):</strong> Every 5 years — legally required
                  under the Electrical Safety Standards in the Private Rented Sector (England)
                  Regulations 2020
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span className="flex-1 text-left">
                  <strong>Houses in Multiple Occupation (HMOs):</strong> Every 5 years
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span className="flex-1 text-left">
                  <strong>Commercial premises:</strong> Every 5 years
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span className="flex-1 text-left">
                  <strong>Industrial installations:</strong> Every 3 years
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span className="flex-1 text-left">
                  <strong>Swimming pools and special locations:</strong> Every 1 year
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span className="flex-1 text-left">
                  <strong>Petrol filling stations:</strong> Every 1 year
                </span>
              </li>
            </ul>
          </div>
          <p>
            For{' '}
            <SEOInternalLink href="/guides/eicr-for-landlords">
              landlords in England
            </SEOInternalLink>
            , the legal requirement is clear: you must have a valid EICR before a tenant moves in
            and renew it at least every 5 years. Failing to comply can result in civil penalties of
            up to £30,000 per breach. The report must be given to new tenants before they occupy the
            property and to existing tenants within 28 days of the inspection. Local authorities can
            also request a copy within 7 days.
          </p>
          <p>
            Beyond the legal requirements, an EICR is also commonly requested during property sales,
            insurance renewals, mortgage applications, and commercial lease negotiations. Many
            insurers now require evidence of a satisfactory EICR as a condition of cover. For{' '}
            <SEOInternalLink href="/guides/eicr-for-commercial-premises">
              commercial premises
            </SEOInternalLink>
            , the Health and Safety at Work Act 1974 provides additional obligations.
          </p>
        </div>

        <SEOAppBridge
          title="Doing landlord EICRs? Turn defects into quotes on site"
          description="Find a C1 or C2? The remedial works estimator prices the fix instantly — materials, labour, margin. Hand the landlord the EICR report and a quote for the remedial work before you leave."
          icon={Receipt}
        />
      </section>

      {/* Observation Codes */}
      <section id="observation-codes" className="pb-10 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Understanding EICR Observation Codes
        </h2>
        <div className="space-y-4 text-white leading-relaxed mb-6">
          <p>
            One of the most important parts of an EICR is the observations table, where the
            inspector records any departures from BS 7671 or any defects found during the
            inspection. Each observation is assigned a classification code that indicates the
            severity of the issue. For a full breakdown, see our{' '}
            <SEOInternalLink href="/guides/eicr-observation-codes-explained">
              observation codes guide
            </SEOInternalLink>
            .
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center font-bold text-red-400">
                C1
              </span>
              <h3 className="font-bold text-white text-lg">Danger Present</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Risk of injury exists. Immediate remedial action is required. The person responsible
              for the installation must be advised to take immediate action. Examples include
              exposed live conductors, absence of earthing, or a dangerously overloaded circuit.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center font-bold text-orange-400">
                C2
              </span>
              <h3 className="font-bold text-white text-lg">Potentially Dangerous</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Risk of injury may arise. Urgent remedial action is required. Examples include missing
              circuit protective conductor (CPC) connections, inadequate fault protection, or the
              absence of RCD protection where required by current regulations.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center font-bold text-blue-400">
                C3
              </span>
              <h3 className="font-bold text-white text-lg">Improvement Recommended</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              The installation does not comply with the current edition of BS 7671 but is not
              immediately dangerous. Improvement is recommended. Examples include lack of
              supplementary bonding where no longer required by current regulations, or older wiring
              colours that have not been re-identified.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center font-bold text-purple-400">
                FI
              </span>
              <h3 className="font-bold text-white text-lg">Further Investigation</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Further investigation is required without delay. The inspector was unable to fully
              assess a part of the installation, and it could not be classified until further
              investigation is carried out. Common where access was restricted or where unexpected
              test results need deeper analysis.
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-4 text-white leading-relaxed">
          <p>
            The overall assessment of the EICR is determined by the observation codes present. If
            any C1 or C2 observations are recorded, the report must be classified as Unsatisfactory.
            A report with only C3 observations (or no observations at all) is classified as
            Satisfactory. FI observations indicate that further work is needed before a final
            assessment can be given for those items.
          </p>
        </div>

        <SEOAppBridge
          title="Not sure if it's C2 or C3? The Defect Code AI decides for you"
          description="Describe the defect in plain English — 'no RCD on socket circuit in bathroom' — and the AI returns the correct classification code with the matching BS 7671 regulation number. No second-guessing."
          icon={Brain}
        />
      </section>

      {/* How to Create an EICR */}
      <section id="how-to-create" className="pb-10 scroll-mt-24">
        <SEOHowToSteps
          steps={howToSteps}
          heading="How to Create an EICR Using Elec-Mate"
          description="Follow these steps to complete an Electrical Installation Condition Report using the Elec-Mate app, from opening the form to exporting the finished PDF."
        />

        <SEOAppBridge
          title="Fill in test results with your voice"
          description="Probes in hand? Just speak: 'Ring circuit 1, R1+R2 0.32, Zs 0.89, insulation resistance 200 megohms, RCD 18 milliseconds.' Elec-Mate fills in the schedule of test results while you work. Hands-free."
          icon={Mic}
        />
      </section>

      {/* Legal Requirements */}
      <section id="legal-requirements" className="pb-10 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Legal Requirements for EICR Certificates
        </h2>
        <div className="space-y-4 text-white leading-relaxed">
          <p>
            The legal landscape around EICR certificates has changed significantly in recent years.
            The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
            made periodic electrical inspections a legal requirement for all privately rented
            properties in England. Similar regulations apply in Scotland under the Housing
            (Scotland) Act 2006 and associated guidance.
          </p>
          <p>
            Under the English regulations, landlords must ensure that electrical installations in
            their properties are inspected and tested by a qualified and competent person at
            intervals of no more than 5 years. The first report must be obtained before a new
            tenancy begins. If the report is unsatisfactory, the landlord must complete all remedial
            work identified with C1 or C2 codes within 28 days (or a shorter period if specified by
            the inspector) and obtain written confirmation from a qualified person that the work has
            been completed to a satisfactory standard.
          </p>
          <p>
            For non-compliance, local authorities have enforcement powers including the ability to
            issue civil penalties of up to £30,000 per breach, arrange remedial work themselves and
            recover costs, and require landlords to provide the report to tenants. The regulations
            also created a duty for landlords to supply a copy of the most recent EICR to new
            tenants before they move in and to existing tenants within 28 days of the inspection
            date.
          </p>
          <p>
            Beyond the private rented sector, the Health and Safety at Work Act 1974 and the
            Electricity at Work Regulations 1989 require employers to maintain electrical systems in
            a safe condition in commercial and industrial premises. While these regulations do not
            specify an EICR by name, periodic inspection and testing to BS 7671 is widely recognised
            as the standard method of demonstrating compliance. See our{' '}
            <SEOInternalLink href="/guides/part-p-building-regulations">
              Part P guide
            </SEOInternalLink>{' '}
            for more on notifiable work and building regulations.
          </p>
        </div>

        <SEOAppBridge
          title="Send the EICR and invoice together"
          description="Finished the inspection? Send the PDF certificate and an invoice for the EICR to the landlord in one go — by email or WhatsApp, directly from the app. No chasing for payment."
          icon={Send}
        />
      </section>

      {/* ===== WHY ELECTRICIANS SWITCH ===== */}
      <section id="why-electricians-switch" className="pb-10 scroll-mt-24">
        <div className="rounded-2xl bg-gradient-to-br from-yellow-500/10 via-yellow-600/5 to-transparent border border-yellow-500/20 p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/25 mb-5">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
              Why Electricians Switch
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            You Are Still Typing EICRs at Home. <span className="text-yellow-400">Why?</span>
          </h2>
          <p className="text-white leading-relaxed mb-6">
            You spend 2-4 hours on site doing the inspection. Then you drive home and spend another
            hour re-typing results into desktop software. Then you email the PDF. Then you send a
            separate quote for the remedial work. Then you send a separate invoice. That is your
            evening gone — every single time.
          </p>
          <p className="text-white leading-relaxed mb-8">
            Electricians switch to Elec-Mate because the EICR is finished before they leave the
            property. The board is scanned. The test results are spoken in. The defect codes are
            AI-suggested. The remedial quote is generated. The certificate and invoice are sent to
            the client by WhatsApp. You are in the van driving to the next job while your old
            workflow would have you sitting at a desk.
          </p>

          {/* The workflow — visual pipeline */}
          <div className="rounded-2xl bg-black/20 border border-white/10 p-5 sm:p-6">
            <h3 className="text-lg font-bold text-white mb-5">Your EICR Workflow With Elec-Mate</h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  step: '1',
                  label: 'Scan the board',
                  desc: 'AI reads the DB from a photo',
                  icon: Camera,
                },
                {
                  step: '2',
                  label: 'Speak test results',
                  desc: 'Voice fills in the schedule',
                  icon: Mic,
                },
                {
                  step: '3',
                  label: 'AI codes defects',
                  desc: 'Right code, right reg',
                  icon: Brain,
                },
                { step: '4', label: 'Sign on-screen', desc: 'Inspector + client', icon: PenTool },
                { step: '5', label: 'Send + invoice', desc: 'Email, WhatsApp, PDF', icon: Send },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="text-xs font-bold text-yellow-400 mb-1">Step {s.step}</div>
                  <div className="font-semibold text-white text-sm">{s.label}</div>
                  <div className="text-sm text-white mt-0.5">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center gap-2 h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Try It Free for 7 Days <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-sm text-white">No card required. Cancel anytime.</span>
          </div>
        </div>
      </section>

      {/* ===== EICR FEATURES — THE SELL ===== */}
      <section id="how-elecmate-helps" className="pb-10 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          What Is Actually Inside the Elec-Mate EICR
        </h2>
        <p className="text-white leading-relaxed mb-8">
          Not marketing fluff. These are the actual features built into the EICR tool that save you
          hours every week.
        </p>

        {/* Killer features — big cards */}
        <div className="space-y-5 mb-10">
          {killerFeatures.map((feat) => {
            const colorMap: Record<
              string,
              { bg: string; border: string; icon: string; glow: string }
            > = {
              yellow: {
                bg: 'bg-yellow-500/10',
                border: 'border-yellow-500/20',
                icon: 'text-yellow-400',
                glow: 'from-yellow-500/10',
              },
              blue: {
                bg: 'bg-blue-500/10',
                border: 'border-blue-500/20',
                icon: 'text-blue-400',
                glow: 'from-blue-500/10',
              },
              green: {
                bg: 'bg-green-500/10',
                border: 'border-green-500/20',
                icon: 'text-green-400',
                glow: 'from-green-500/10',
              },
              purple: {
                bg: 'bg-purple-500/10',
                border: 'border-purple-500/20',
                icon: 'text-purple-400',
                glow: 'from-purple-500/10',
              },
            };
            const c = colorMap[feat.color] || colorMap.yellow;
            return (
              <div
                key={feat.title}
                className={`rounded-2xl ${c.bg} ${c.border} border p-6 sm:p-8 relative overflow-hidden`}
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${c.glow} to-transparent`}
                />
                <div className="flex flex-col sm:flex-row gap-5">
                  <div
                    className={`w-14 h-14 rounded-2xl ${c.bg} ${c.border} border flex items-center justify-center shrink-0`}
                  >
                    <feat.icon className={`w-7 h-7 ${c.icon}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{feat.title}</h3>
                    <p className={`text-sm font-medium ${c.icon} mb-3`}>{feat.subtitle}</p>
                    <p className="text-white leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery methods callout */}
        <div className="rounded-2xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 p-6 mb-10">
          <h3 className="font-bold text-white text-lg mb-4">
            Send the Finished EICR However Your Client Wants It
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Mail, label: 'Email' },
              { icon: MessageSquare, label: 'WhatsApp' },
              { icon: Download, label: 'PDF Download' },
              { icon: Cloud, label: 'Cloud Link' },
            ].map((method) => (
              <div key={method.label} className="flex flex-col items-center gap-2 text-center">
                <div className="w-11 h-11 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                  <method.icon className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-sm font-medium text-white">{method.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Full feature grid — everything else */}
        <h3 className="text-xl font-bold text-white mb-5">Everything Else Built Into the EICR</h3>
        <SEOFeatureGrid features={features} columns={3} />
      </section>

      {/* ===== ELEC-MATE vs PAPER & DESKTOP ===== */}
      <section id="vs-paper" className="pb-10 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Elec-Mate vs Paper & Desktop Software
        </h2>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-sm font-semibold text-white">Feature</th>
                <th className="p-4 text-sm font-semibold text-center text-yellow-400">Elec-Mate</th>
                <th className="p-4 text-sm font-semibold text-center text-white">Paper Forms</th>
                <th className="p-4 text-sm font-semibold text-center text-white">
                  Desktop Software
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'AI Board Scanner', em: true, paper: false, desktop: false },
                { feature: 'Voice to Test Results', em: true, paper: false, desktop: false },
                { feature: 'Defect Code AI', em: true, paper: false, desktop: false },
                { feature: 'Defects → Priced Quote', em: true, paper: false, desktop: false },
                { feature: 'Send Invoice from EICR', em: true, paper: false, desktop: false },
                { feature: 'Send via WhatsApp', em: true, paper: false, desktop: false },
                { feature: 'Complete on Phone On Site', em: true, paper: true, desktop: false },
                { feature: 'Digital Signatures', em: true, paper: false, desktop: true },
                { feature: 'Auto BS 7671 Regs', em: true, paper: false, desktop: false },
                { feature: 'Live Test Value Validation', em: true, paper: false, desktop: true },
                { feature: 'Works Fully Offline', em: true, paper: true, desktop: false },
                { feature: 'Cloud Sync Across Devices', em: true, paper: false, desktop: false },
                { feature: 'Professional PDF Export', em: true, paper: false, desktop: true },
                { feature: 'No Double-Handling', em: true, paper: false, desktop: false },
              ].map((row, index) => (
                <tr key={row.feature} className={index < 13 ? 'border-b border-white/5' : ''}>
                  <td className="p-4 text-sm text-white">{row.feature}</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    {row.paper ? (
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {row.desktop ? (
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="/auth/signup"
            className="inline-flex items-center gap-2 h-11 px-6 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
          >
            Switch to Elec-Mate <ArrowRight className="w-4 h-4" />
          </a>
          <span className="text-sm text-white">7-day free trial. No card required.</span>
        </div>
      </section>

      {/* Social proof / stats */}
      <section className="pb-10">
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white mb-5 text-center">
            Trusted by UK Electricians
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '430+', label: 'Electricians Using Elec-Mate' },
              { value: '8', label: 'Certificate Types' },
              { value: '70', label: 'Built-In Calculators' },
              { value: '36+', label: 'Training Courses' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="pb-10 scroll-mt-24">
        <SEOFAQAccordion faqs={faqs} heading="Frequently Asked Questions About EICR Certificates" />
      </section>

      {/* Related Pages */}
      <section id="related" className="pb-10 scroll-mt-24">
        <SEORelatedPages pages={relatedPages} heading="Related Pages" />
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Stop writing EICR certificates by hand"
        subheading="Join 430+ UK electricians creating professional digital certificates. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </SEOPageShell>
  );
}
