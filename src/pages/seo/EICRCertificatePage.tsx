import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  FileCheck2,
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
} from 'lucide-react';

const PAGE_TITLE = 'EICR Certificate App | Digital Electrical Condition Reports | Elec-Mate';
const PAGE_DESCRIPTION =
  'Create professional EICR certificates on your phone in minutes. Digital signatures, automatic observations coding, PDF export, and BS 7671 compliance built in. Start free.';

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
      'Yes, since 1 April 2021 in England. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, landlords must obtain an EICR from a qualified person before the start of a new tenancy and at least every 5 years thereafter. If the report is unsatisfactory (meaning any C1 or C2 observations are recorded), the landlord must complete remedial work within 28 days or any shorter period specified by the inspector. Failure to comply can result in local authority enforcement, including civil penalties of up to 30,000 pounds per breach. The regulations also require landlords to supply a copy of the report to tenants within 28 days.',
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

const features = [
  {
    icon: Smartphone,
    title: 'Complete on Any Device',
    description:
      'Fill out the full EICR on your phone, tablet, or laptop. The form adapts to your screen and works offline on site.',
  },
  {
    icon: PenTool,
    title: 'Digital Signatures',
    description:
      'Capture inspector and client signatures directly on-screen. No printing, no scanning, no paper.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671 Compliance',
    description:
      'Built to the current 18th Edition (BS 7671:2018 + Amendment 2:2022). Observation coding, test value validation, and form structure all follow the standard.',
  },
  {
    icon: Clock,
    title: 'Auto-Save Everywhere',
    description:
      'Your work saves locally every 10 seconds and syncs to the cloud every 30 seconds. Never lose a certificate mid-inspection.',
  },
  {
    icon: Download,
    title: 'Professional PDF Export',
    description:
      'Generate a clean, professional PDF that meets scheme provider requirements. Email it directly to clients from the app.',
  },
  {
    icon: AlertTriangle,
    title: 'Smart Observation Coding',
    description:
      'The app guides you through C1, C2, C3, and FI classifications with descriptions and automatically determines the overall assessment.',
  },
  {
    icon: CheckCircle2,
    title: 'Test Value Validation',
    description:
      'Zs, R1+R2, insulation resistance, and RCD times are checked against BS 7671 maximum permitted values as you enter them.',
  },
  {
    icon: ListChecks,
    title: 'Full Schedule of Inspections',
    description:
      'The complete schedule of items inspected is built in, matching the standard EICR form layout used across the industry.',
  },
  {
    icon: BookOpen,
    title: 'Regulation References',
    description:
      'Tap any section heading for a direct reference to the relevant BS 7671 regulation. Keep the brown book in your pocket.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate EICR Certificate App',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/tools/eicr-certificate',
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
  name: 'How to Create an EICR Certificate Using Elec-Mate',
  description:
    'A step-by-step guide to completing an Electrical Installation Condition Report using the Elec-Mate app on your phone or tablet.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function EICRCertificatePage() {
  useSEO({
    title: 'EICR Certificate App | Digital Electrical Condition Reports',
    description: PAGE_DESCRIPTION,
    schema: softwareAppSchema,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...howToSchema })}</script>
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <FileCheck2 className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">BS 7671:2018 + A2:2022 Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Create Professional <span className="text-yellow-400">EICR Certificates</span> on Your Phone
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            The complete EICR app for UK electricians. Digital signatures, automatic observation coding,
            test value validation, and professional PDF export — all from your mobile device.
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

      {/* What is an EICR */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is an EICR Certificate?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              An Electrical Installation Condition Report (EICR) is the formal document produced following a periodic
              inspection and testing of an electrical installation. It replaced the older Periodic Inspection Report (PIR)
              and is the standard form used across the UK electrical industry to record the condition of a fixed
              electrical installation in a building.
            </p>
            <p>
              The EICR is defined by BS 7671:2018 (the IET Wiring Regulations, 18th Edition) and follows the model
              forms published in Appendix 6 of the standard. It records the extent of the installation inspected, the
              supply characteristics, details of the earthing arrangements, the test results for every circuit, and any
              observations about departures from the current standard or defects that could pose a danger.
            </p>
            <p>
              The purpose of the EICR is twofold. First, it provides a snapshot of the condition of an installation at
              a point in time, identifying any damage, deterioration, defects, or dangerous conditions. Second, it
              provides recommendations for remedial work needed to bring the installation up to an acceptable standard
              of safety. The overall assessment is either Satisfactory (meaning the installation is safe for continued
              use) or Unsatisfactory (meaning remedial work is needed).
            </p>
            <p>
              An EICR is not the same as a simple visual check. It involves dead testing (with the supply isolated) and
              live testing, covering continuity of protective conductors, insulation resistance, polarity verification,
              earth fault loop impedance, prospective fault current, and RCD operation. The inspector must access
              distribution boards, remove covers where necessary, and test a representative sample of accessories.
            </p>
          </div>
        </div>
      </section>

      {/* When is an EICR required */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            When Is an EICR Required?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The recommended intervals for periodic inspection and testing depend on the type of installation and its
              use. These intervals are set out in Table 3.2 of the IET Guidance Note 3 (GN3, 9th Edition) and reflect
              the risk profile of different types of premises.
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
              <h3 className="font-bold text-white text-lg mb-4">Recommended EICR Intervals</h3>
              <ul className="space-y-3 text-white">
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Domestic (owner-occupied):</strong> Every 10 years, or on change of occupancy</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Domestic (rented / private let):</strong> Every 5 years — legally required under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Houses in Multiple Occupation (HMOs):</strong> Every 5 years</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Commercial premises:</strong> Every 5 years</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Industrial installations:</strong> Every 3 years</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Swimming pools and special locations:</strong> Every 1 year</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Petrol filling stations:</strong> Every 1 year</span>
                </li>
              </ul>
            </div>
            <p>
              For landlords in England, the legal requirement is clear: you must have a valid EICR before a tenant moves
              in and renew it at least every 5 years. Failing to comply can result in civil penalties of up to 30,000
              pounds per breach. The report must be given to new tenants before they occupy the property and to existing
              tenants within 28 days of the inspection. Local authorities can also request a copy within 7 days.
            </p>
            <p>
              Beyond the legal requirements, an EICR is also commonly requested during property sales, insurance
              renewals, mortgage applications, and commercial lease negotiations. Many insurers now require evidence of a
              satisfactory EICR as a condition of cover.
            </p>
          </div>
        </div>
      </section>

      {/* Observation Codes */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Understanding EICR Observation Codes
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              One of the most important parts of an EICR is the observations table, where the inspector records any
              departures from BS 7671 or any defects found during the inspection. Each observation is assigned a
              classification code that indicates the severity of the issue. Understanding these codes is essential for
              both electricians completing the form and property owners receiving the report.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center font-bold text-red-400">C1</span>
                <h3 className="font-bold text-white text-lg">Danger Present</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Risk of injury exists. Immediate remedial action is required. The person responsible for the installation
                must be advised to take immediate action. Examples include exposed live conductors, absence of earthing,
                or a dangerously overloaded circuit.
              </p>
            </div>
            <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center font-bold text-orange-400">C2</span>
                <h3 className="font-bold text-white text-lg">Potentially Dangerous</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Risk of injury may arise. Urgent remedial action is required. Examples include missing circuit protective
                conductor (CPC) connections, inadequate fault protection, or the absence of RCD protection where required
                by current regulations.
              </p>
            </div>
            <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center font-bold text-blue-400">C3</span>
                <h3 className="font-bold text-white text-lg">Improvement Recommended</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                The installation does not comply with the current edition of BS 7671 but is not immediately dangerous.
                Improvement is recommended. Examples include lack of supplementary bonding where no longer required by
                current regulations, or older wiring colours that have not been re-identified.
              </p>
            </div>
            <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center font-bold text-purple-400">FI</span>
                <h3 className="font-bold text-white text-lg">Further Investigation</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Further investigation is required without delay. The inspector was unable to fully assess a part of the
                installation, and it could not be classified until further investigation is carried out. Common where
                access was restricted or where unexpected test results need deeper analysis.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-white leading-relaxed">
            <p>
              The overall assessment of the EICR is determined by the observation codes present. If any C1 or C2
              observations are recorded, the report must be classified as Unsatisfactory. A report with only C3
              observations (or no observations at all) is classified as Satisfactory. FI observations indicate that
              further work is needed before a final assessment can be given for those items.
            </p>
            <p>
              Elec-Mate automates this logic. As you add observations and assign codes, the app tracks the overall
              assessment in real time, ensuring you never accidentally mark a report as Satisfactory when a C1 or C2
              is present.
            </p>
          </div>
        </div>
      </section>

      {/* How Elec-Mate Makes It Faster */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How Elec-Mate Makes EICR Certificates Faster
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              Traditional EICR workflows involve handwriting results on paper forms on site, then returning to the office
              to type everything into a desktop certificate package. This double-handling costs hours every week and
              introduces transcription errors. Elec-Mate eliminates this entirely by putting the complete EICR form on
              your phone or tablet.
            </p>
            <p>
              You enter test results directly into the app as you work. The form auto-saves constantly, so a flat battery
              or dropped phone will not lose your data. Signatures are captured digitally on the spot. When you are
              finished, the completed PDF is ready to send to the client before you leave the property.
            </p>
            <p>
              The app also validates your entries as you go. If you enter a Zs value that exceeds the maximum permitted
              value for the protective device on that circuit, the app flags it immediately. If you record an RCD
              operating time above the disconnection time requirement, it highlights the issue. This catches mistakes
              before they reach the final report, saving you the embarrassment of issuing a certificate with obvious
              errors.
            </p>
          </div>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* How To Section */}
      <section id="how-it-works" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            How to Create an EICR Using Elec-Mate
          </h2>
          <p className="text-white mb-8 leading-relaxed">
            Follow these steps to complete an Electrical Installation Condition Report using the Elec-Mate app, from
            opening the form to exporting the finished PDF.
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
            Legal Requirements for EICR Certificates
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The legal landscape around EICR certificates has changed significantly in recent years. The Electrical
              Safety Standards in the Private Rented Sector (England) Regulations 2020 made periodic electrical
              inspections a legal requirement for all privately rented properties in England. Similar regulations apply
              in Scotland under the Housing (Scotland) Act 2006 and associated guidance.
            </p>
            <p>
              Under the English regulations, landlords must ensure that electrical installations in their properties are
              inspected and tested by a qualified and competent person at intervals of no more than 5 years. The first
              report must be obtained before a new tenancy begins. If the report is unsatisfactory, the landlord must
              complete all remedial work identified with C1 or C2 codes within 28 days (or a shorter period if specified
              by the inspector) and obtain written confirmation from a qualified person that the work has been completed
              to a satisfactory standard.
            </p>
            <p>
              For non-compliance, local authorities have enforcement powers including the ability to issue civil penalties
              of up to 30,000 pounds per breach, arrange remedial work themselves and recover costs, and require landlords
              to provide the report to tenants. The regulations also created a duty for landlords to supply a copy of the
              most recent EICR to new tenants before they move in and to existing tenants within 28 days of the
              inspection date.
            </p>
            <p>
              Beyond the private rented sector, the Health and Safety at Work Act 1974 and the Electricity at Work
              Regulations 1989 require employers to maintain electrical systems in a safe condition in commercial and
              industrial premises. While these regulations do not specify an EICR by name, periodic inspection and
              testing to BS 7671 is widely recognised as the standard method of demonstrating compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Who can use Elec-Mate */}
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
              Elec-Mate is designed by electricians for electricians. Whether you are a sole trader completing EICRs for
              private landlords, a domestic installer registered with NICEIC or NAPIT, or part of a larger commercial
              contracting firm, the app fits into your workflow. The certificate forms follow the exact structure of the
              model forms in BS 7671 Appendix 6, so there is nothing unfamiliar to learn.
            </p>
            <p>
              The platform also includes 50+ electrical calculators covering cable sizing, voltage drop, maximum demand,
              diversity, conduit and trunking fill, and more. Combined with the EICR, EIC, and Minor Works certificate
              forms, it replaces the stack of paper forms, the separate calculator app, and the desktop certificate
              software — all in one mobile-first tool.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About EICR Certificates
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 text-white font-semibold text-left touch-manipulation min-h-[44px]">
                  <span>{faq.question}</span>
                  <span className="ml-4 shrink-0 text-yellow-400 text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-white text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Stop writing EICR certificates by hand"
        subheading="Join 430+ UK electricians creating professional digital certificates. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
