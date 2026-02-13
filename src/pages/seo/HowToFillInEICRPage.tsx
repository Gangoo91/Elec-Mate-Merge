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
  BookOpen,
  Zap,
  HelpCircle,
  ChevronRight,
  ArrowDown,
  ClipboardCheck,
  Brain,
  ListOrdered,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_TITLE = 'How to Fill In an EICR Form | Step-by-Step Guide | Elec-Mate';
const PAGE_DESCRIPTION =
  'Complete step-by-step guide to filling in an EICR (Electrical Installation Condition Report) form. Observation codes C1, C2, C3, FI explained. BS 7671:2018+A3:2024 compliant.';

const faqs = [
  {
    question: 'What is the difference between an EICR and a PIR?',
    answer:
      'The EICR (Electrical Installation Condition Report) replaced the PIR (Periodic Inspection Report) when BS 7671:2018 was published. The EICR uses the same model forms from Appendix 6 of BS 7671 and serves the same purpose — recording the condition of a fixed electrical installation following periodic inspection and testing. The key differences are in the form layout and the observation coding system. The EICR uses classification codes C1, C2, C3, and FI, whereas the older PIR used a simpler coding system. In practice, the terms are sometimes used interchangeably, but the correct current terminology is EICR. All reports produced under the 18th Edition must use the EICR format.',
  },
  {
    question: 'How do I determine the overall condition of the installation on an EICR?',
    answer:
      'The overall condition is determined by the observation codes recorded during the inspection. If any C1 (Danger Present) or C2 (Potentially Dangerous) observations are recorded, the overall condition must be marked as Unsatisfactory. If only C3 (Improvement Recommended) observations are present, or no observations are recorded at all, the overall condition is Satisfactory. FI (Further Investigation) observations indicate that certain parts of the installation could not be fully assessed and require further investigation before a final classification can be given for those items. The inspector must make a professional judgement on the overall condition based on the totality of findings.',
  },
  {
    question: 'What should I write in the "Extent and Limitations" section of an EICR?',
    answer:
      'The Extent and Limitations section must clearly describe what was inspected, what was tested, and what was not. You should list every distribution board inspected, every circuit tested, and any areas or circuits that were excluded from the inspection. Common limitations include: concealed wiring not inspected (as this is normal for a periodic inspection — you cannot strip back plasterwork), circuits not tested because equipment could not be disconnected, areas not accessed due to furniture or stored goods, and any circuits or boards excluded at the client request. It is essential to be specific — vague statements like "limited inspection" are not acceptable. The extent and limitations must be detailed enough that another competent person could understand exactly what was and was not covered.',
  },
  {
    question: 'What qualifications do I need to carry out an EICR?',
    answer:
      'To carry out an EICR, you must be a competent person as defined by BS 7671. In practice, this means holding a current edition qualification (the 18th Edition IET Wiring Regulations, C&G 2382), plus an inspection and testing qualification such as C&G 2391 (Inspection and Testing) or C&G 2394/2395 (the older equivalents). You should also hold a relevant NVQ Level 3 or equivalent in Electrical Installation. Most competent person scheme providers (such as NICEIC, NAPIT, or ELECSA) require these qualifications for their registered members who carry out periodic inspection and testing. Experience is also critical — the regulations state that the inspector must have sufficient knowledge, skill, and experience to avoid danger.',
  },
  {
    question: 'How do I record supply characteristics on an EICR?',
    answer:
      'The supply characteristics section of the EICR records the details of the incoming supply. You must record: the earthing arrangement (TN-S, TN-C-S, TT, or IT), the supply type (single-phase or three-phase), the nominal voltage (typically 230V single-phase or 400V three-phase in the UK), the supply conductor type and size, the number and type of live conductors, the origin of the supply (e.g., supplier cutout), the external earth fault loop impedance (Ze) measured at the origin with the main earthing conductor disconnected, and the prospective fault current (Ipf) measured at the origin. These values are critical because they form the basis for verifying that the installation protective devices can operate within the required disconnection times.',
  },
  {
    question: 'Can I issue an EICR digitally using an app?',
    answer:
      'Yes. There is no requirement in BS 7671 for EICR certificates to be on paper. Digital certificates are fully accepted by competent person scheme providers (NICEIC, NAPIT, ELECSA, and others), local authorities, letting agents, and insurance companies. Elec-Mate provides the complete EICR form structure digitally, including all required sections — supply characteristics, particulars of the installation, schedule of items inspected, schedule of test results, observations and recommendations, and the declaration. Digital signatures can be captured on-screen, and the completed certificate exports as a professional PDF ready to send to clients, upload to scheme provider portals, or store in your records. The advantage of digital is that auto-save prevents data loss, auto-validation catches errors as you enter results, and the PDF is ready to send before you leave site.',
  },
  {
    question: 'What happens if a landlord does not have a valid EICR?',
    answer:
      'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, landlords must have a valid EICR for all privately rented properties. Failure to comply can result in civil penalties of up to 30,000 pounds per breach, enforced by the local authority. The local authority can also arrange for the inspection and any remedial work to be carried out at the landlord expense. If an EICR returns an unsatisfactory result (any C1 or C2 observations), the landlord must complete the remedial work within 28 days (or a shorter period if specified by the inspector) and obtain confirmation from a qualified person that the work has been completed satisfactorily. The EICR must be provided to new tenants before they move in and to existing tenants within 28 days of the inspection date.',
  },
];

const howToSteps = [
  {
    name: 'Complete the details of the contractor and client',
    text: 'Start by filling in Section A of the EICR — the details of the person ordering the report, the installation address, and the contractor details. Include the contractor name, address, registration or scheme membership number (e.g., NICEIC registration number), and the name of the inspector carrying out the inspection. Record the date of the inspection, the date of the previous inspection report (if known), and the recommended date for the next inspection.',
  },
  {
    name: 'Record the purpose of the report and extent of the installation covered',
    text: 'In Section B, state the purpose of the report (e.g., periodic inspection, change of occupancy, insurance requirement). In the Extent and Limitations section, describe in detail which parts of the installation were inspected and tested, and which parts were not. List every distribution board inspected, the number of circuits tested, and any limitations such as areas not accessed, circuits not isolated, or concealed wiring not inspected. Be specific — vague descriptions are not acceptable.',
  },
  {
    name: 'Enter the supply characteristics and earthing arrangements',
    text: 'In Section C, record the supply details. Identify the earthing arrangement (TN-S, TN-C-S, TT), the supply type (single-phase AC, three-phase AC), the nominal voltage (230V or 400V), and the supply conductor size and type. Measure and record the external earth fault loop impedance (Ze) at the origin with the main earthing conductor temporarily disconnected. Record the prospective fault current (Ipf) at the origin. Document the means of earthing — the type and size of the earthing conductor, the main bonding conductors, and the earth electrode (if applicable for TT systems).',
  },
  {
    name: 'Document the particulars of the installation',
    text: 'In Section D, record the details of the consumer unit or distribution boards — the type, number of ways, the rating of the main switch or RCCB, the presence of SPDs (surge protective devices), and the condition of the enclosure. List each circuit with its protective device type and rating, cable type and size, and the circuit designation. Note the presence and type of any RCDs protecting circuits. Record whether the installation has main protective bonding to water, gas, oil, and other services as required by Regulation 411.3.1.2.',
  },
  {
    name: 'Complete the schedule of inspections',
    text: 'Work through the schedule of items inspected — this is the checklist of visual inspection items covering the condition of wiring, accessories, distribution boards, protective devices, earthing, bonding, and labelling. For each item, record whether it is satisfactory (tick), unsatisfactory (cross), not applicable (N/A), or limited (LIM). This section covers items such as: correct identification and labelling of circuits, condition of consumer unit, presence of appropriate circuit protection, condition of accessories, suitability of wiring systems for the environment, and presence of fire barriers and seals where required.',
  },
  {
    name: 'Record all test results in the schedule of test results',
    text: 'Enter the test results for every circuit inspected. For each circuit, record: continuity of protective conductors (R1+R2 or R2 in ohms), insulation resistance (in megohms, tested at 500V DC between L-E and L-N), polarity (confirmed or not), earth fault loop impedance Zs (in ohms), RCD operating time (in milliseconds at 1x and 5x rated current), and the prospective fault current at the furthest point if different from the origin. Use a calibrated multifunction tester and record the instrument make, model, serial number, and calibration date on the form.',
  },
  {
    name: 'Add observations with correct classification codes',
    text: 'For every deficiency, departure from BS 7671, or defect found during the inspection, add an observation to the observations table. Assign the correct classification code: C1 (Danger Present — risk of injury, immediate remedial action required), C2 (Potentially Dangerous — urgent remedial action required), C3 (Improvement Recommended — does not comply with current standard but not dangerous), or FI (Further Investigation — could not be fully assessed). Write a clear description of the observation, the location, and the relevant regulation reference where applicable. Be specific enough that a different electrician could find and rectify the issue from your description.',
  },
  {
    name: 'Determine the overall condition and complete the declaration',
    text: 'Based on the observations, determine the overall condition of the installation. If any C1 or C2 observations are present, the overall condition must be Unsatisfactory. If only C3 observations or no observations are present, the overall condition is Satisfactory. Complete the declaration section with the inspector name, signature, qualifications, and the date. If there is a separate supervisor reviewing the report, they must also sign the declaration. The person responsible for the electrical installation (the client or landlord) should be informed of the results and provided with a copy of the completed report.',
  },
];

const features = [
  {
    icon: FileCheck2,
    title: 'Complete EICR Form',
    description:
      'Every section of the EICR pre-loaded and structured exactly as per the BS 7671 Appendix 6 model forms. Nothing to miss.',
  },
  {
    icon: PenTool,
    title: 'Digital Signatures',
    description:
      'Capture inspector and client signatures on-screen. No paper, no scanning, no double-handling.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671:2018+A3:2024',
    description:
      'Built to the current 18th Edition including Amendment 3. Observation coding, Zs limits, and form structure all follow the standard.',
  },
  {
    icon: CheckCircle2,
    title: 'Auto-Validation',
    description:
      'Test results are checked against BS 7671 maximum permitted values as you enter them. Zs, insulation resistance, and RCD times are all validated automatically.',
  },
  {
    icon: Clock,
    title: 'Auto-Save Everywhere',
    description:
      'Your work saves locally every 10 seconds and syncs to the cloud every 30 seconds. A flat battery or lost signal will not lose your data.',
  },
  {
    icon: Download,
    title: 'Professional PDF Export',
    description:
      'Generate a clean, professional PDF that meets scheme provider requirements. Email it directly to clients from the app before you leave site.',
  },
  {
    icon: Brain,
    title: '8 Elec-AI Agents',
    description:
      'Ask the AI about observation codes, regulation references, or testing procedures. Get instant answers on site without reaching for the brown book.',
  },
  {
    icon: Smartphone,
    title: 'Works on Any Device',
    description:
      'Complete the full EICR on your phone, tablet, or laptop. Works offline on site and syncs when you are back in signal.',
  },
  {
    icon: ListOrdered,
    title: 'Smart Observation Coding',
    description:
      'The app guides you through C1, C2, C3, and FI classification with descriptions, and automatically determines the overall assessment.',
  },
];

const howToSchema = {
  '@type': 'HowTo',
  name: 'How to Fill In an EICR Form',
  description:
    'A complete step-by-step guide to filling in an Electrical Installation Condition Report (EICR) form, from recording supply characteristics to completing the declaration.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
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

const breadcrumbSchema = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://elec-mate.com/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://elec-mate.com/guides' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'How to Fill In an EICR',
      item: 'https://elec-mate.com/guides/how-to-fill-in-eicr',
    },
  ],
};

export default function HowToFillInEICRPage() {
  useSEO({
    title: 'How to Fill In an EICR Form | Step-by-Step Guide',
    description: PAGE_DESCRIPTION,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...howToSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...breadcrumbSchema })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            BS 7671:2018+A3:2024 Compliant
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            How to Fill In an
            <span className="block text-yellow-400 mt-1">EICR Form</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            A complete step-by-step guide to filling in an Electrical Installation Condition Report.
            Every section explained — supply characteristics, observations, C1/C2/C3/FI codes, test
            results, and the declaration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Start Your Free Trial
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#step-by-step"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              See the Steps
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* What is an EICR */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Is an EICR and Why Does It Matter?
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              An Electrical Installation Condition Report (EICR) is the formal document produced
              following a periodic inspection and testing of a fixed electrical installation. It is
              defined by BS 7671:2018+A3:2024 (the IET Wiring Regulations, 18th Edition with
              Amendment 3) and follows the model forms published in Appendix 6 of the standard. The
              EICR replaced the older Periodic Inspection Report (PIR) and is the standard report
              format used across the UK electrical industry.
            </p>
            <p>
              The EICR records the condition of the installation at the time of inspection,
              identifies any damage, deterioration, defects, or dangerous conditions, and provides
              recommendations for remedial work. The overall assessment is either Satisfactory (the
              installation is safe for continued use) or Unsatisfactory (remedial work is needed
              before the installation can be considered safe). For landlords in England, a valid
              EICR is a legal requirement under the Electrical Safety Standards in the Private
              Rented Sector (England) Regulations 2020, with penalties of up to 30,000 pounds per
              breach for non-compliance.
            </p>
            <p>
              Filling in an EICR correctly is essential. An incomplete or incorrectly completed
              report can result in rejection by the scheme provider, disputes with clients, or — in
              the worst case — failure to identify a dangerous condition that leads to an incident.
              This guide walks through every section of the EICR form in the order you should
              complete it on site, with practical tips for avoiding the most common mistakes.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section id="step-by-step" className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ListOrdered className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Step-by-Step: How to Fill In an EICR
            </h2>
          </div>
          <p className="text-white mb-8 leading-relaxed">
            Follow these steps to complete every section of the EICR form correctly. Each step
            corresponds to a section of the model form in BS 7671 Appendix 6.
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

      {/* Observation Codes Explained */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              EICR Observation Codes Explained
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              The observation codes are the most important part of the EICR. Each deficiency or
              departure from the standard must be assigned a classification code that indicates the
              severity of the issue. The codes determine the overall condition of the installation.
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
                for the installation must be advised to take immediate action. Examples: exposed
                live conductors, absence of earthing on metalwork, dangerously overloaded circuits,
                or a consumer unit with a missing cover exposing live busbars.
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
                Risk of injury may arise. Urgent remedial action is required. Examples: missing CPC
                connections, inadequate fault protection, absence of RCD protection where required
                by current regulations, or earth fault loop impedance exceeding the maximum
                permitted value for the protective device.
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
                immediately dangerous. Improvement is recommended. Examples: lack of supplementary
                bonding where no longer required, older wiring colours not re-identified, or absence
                of SPD protection that would be required for a new installation.
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
                Further investigation is required without delay. The inspector could not fully
                assess a part of the installation. Common where access was restricted, where
                unexpected test results need deeper analysis, or where concealed wiring shows signs
                of deterioration that cannot be fully assessed without more intrusive investigation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Common Mistakes to Avoid</h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Vague extent and limitations</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Writing "limited inspection" or "standard periodic inspection" is not
                    sufficient. You must describe precisely which boards were inspected, which
                    circuits were tested, which areas were accessed, and what was excluded. Scheme
                    providers regularly reject reports with vague limitations.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Missing or incorrect Ze measurement</h3>
                  <p className="text-white text-sm leading-relaxed">
                    The external earth fault loop impedance (Ze) must be measured at the origin with
                    the main earthing conductor temporarily disconnected from the main earthing
                    terminal. Measuring Ze with the earthing conductor still connected gives an
                    incorrect reading because parallel earth paths through the installation affect
                    the result.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">
                    Not applying the temperature correction to Zs
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    The Zs values tabulated in BS 7671 are maximum values at the design stage. When
                    comparing measured Zs values on site, you must account for conductor temperature
                    rise during normal operation. The rule of thumb is that the measured Zs at
                    ambient temperature should not exceed 80% of the tabulated maximum (i.e.,
                    multiply by 0.8 to get the on-site limit). Alternatively, multiply the measured
                    value by 1.2 and compare against the table.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">
                    Marking the report Satisfactory with a C2 present
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Any C1 or C2 observation makes the overall condition Unsatisfactory — no
                    exceptions. This is a mandatory requirement. Some electricians mark a report
                    Satisfactory despite a C2 observation being present, perhaps because the client
                    pressures them or because the issue seems minor. This is incorrect and could
                    result in disciplinary action from the scheme provider.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">
                    Forgetting to record the test instrument details
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    The EICR requires the make, model, serial number, and calibration due date of
                    every test instrument used. Missing this information can invalidate the report.
                    Ensure your instruments are within their calibration date before starting the
                    inspection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Equipment */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Tools and Equipment Needed
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <h3 className="font-bold text-white text-lg mb-2">Multifunction Tester (MFT)</h3>
              <p className="text-white text-sm leading-relaxed">
                Your primary test instrument for continuity, insulation resistance, loop impedance,
                prospective fault current, and RCD testing. Must be calibrated annually. Major
                brands: Megger, Metrel, Fluke, Kewtech, Seaward.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">GS38 Voltage Indicator</h3>
              <p className="text-white text-sm leading-relaxed">
                A dedicated voltage indicator complying with HSE GS38 for safe isolation. Must have
                fused test leads, finger guards, and clear voltage markings. Always prove-test-prove
                before working dead.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">Safe Isolation Kit</h3>
              <p className="text-white text-sm leading-relaxed">
                Padlocks, lock-off devices, and warning labels for securing isolation points.
                Essential for dead testing — you must lock off before removing consumer unit covers
                and testing circuits.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">Elec-Mate App</h3>
              <p className="text-white text-sm leading-relaxed">
                The digital EICR form on your phone or tablet. Enter test results on site, capture
                signatures digitally, auto-validate readings against BS 7671 limits, and export a
                professional PDF before you leave.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            How Elec-Mate Makes EICR Completion Faster
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Stop double-handling with paper forms. Enter results directly on your phone, get
            auto-validation, and export a professional PDF on site.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-yellow-500/30 transition-colors"
              >
                <summary className="flex items-start gap-3 cursor-pointer touch-manipulation list-none [&::-webkit-details-marker]:hidden">
                  <ChevronRight className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0 transition-transform group-open:rotate-90" />
                  <h3 className="font-bold text-white text-lg">{faq.question}</h3>
                </summary>
                <div className="mt-3 pl-8">
                  <p className="text-white leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Fill In EICR Forms Digitally"
        subheading="Join 430+ UK electricians creating professional EICR certificates on their phones. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
