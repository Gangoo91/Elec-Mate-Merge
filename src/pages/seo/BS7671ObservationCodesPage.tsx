import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  ChevronDown,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  BookOpen,
  Brain,
  Search,
  Zap,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
} from 'lucide-react';

const PAGE_TITLE =
  'BS 7671 Observation Codes Explained | C1, C2, C3, FI Guide | Elec-Mate';
const PAGE_DESCRIPTION =
  'Complete guide to EICR observation codes C1, C2, C3, and FI. Real examples, classification criteria, and how to write clear observations. For UK electricians.';

const faqs = [
  {
    question: 'Does a single C1 or C2 observation make the entire EICR unsatisfactory?',
    answer:
      'Yes. If any observation on the EICR is classified as C1 (Danger Present) or C2 (Potentially Dangerous), the overall assessment of the installation must be recorded as Unsatisfactory. This is a binary rule — there is no weighting or averaging. Even if the rest of the installation is in excellent condition, a single C1 or C2 means the report is Unsatisfactory and remedial action is required. An EICR with only C3 (Improvement Recommended) observations, or with no observations at all, is classified as Satisfactory.',
  },
  {
    question: 'What is the difference between C2 and C3?',
    answer:
      'The key difference is the level of risk. A C2 (Potentially Dangerous) observation indicates that there is a risk of injury that requires urgent remedial action — something that may not be immediately dangerous but could become so under foreseeable conditions. A C3 (Improvement Recommended) observation indicates that the installation does not fully comply with the current edition of BS 7671 but is not dangerous. C3 items are typically legacy features that were compliant when installed but do not meet the current standard. The judgement between C2 and C3 requires professional experience and an understanding of the risk in context. When in doubt, it is better to code conservatively (C2 rather than C3) to ensure safety.',
  },
  {
    question: 'When should I use an FI code instead of a classification code?',
    answer:
      'FI (Further Investigation) should be used when you cannot fully assess a part of the installation and therefore cannot give it a classification. Common situations include: parts of the installation that are concealed or inaccessible (behind plasterwork, in ceiling voids you cannot reach), components that require specialist testing beyond the scope of the current inspection, unexpected or inconsistent test results that need deeper investigation, or areas where the installation is in use and cannot be safely isolated during the inspection. FI is not a way to avoid making a judgement — you must explain specifically why further investigation is needed and what additional work is required.',
  },
  {
    question: 'How long does a landlord have to fix C1 and C2 observations?',
    answer:
      'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, if an EICR identifies any observations that require urgent remedial action (C1 or C2), the landlord must ensure that further investigative or remedial work is carried out within 28 days. If the inspector specifies a shorter period on the report (for example, for a C1 Danger Present observation that requires immediate action), the landlord must comply with that shorter period. The landlord must then obtain written confirmation from a qualified person that the remedial work has been completed to a satisfactory standard. Failure to comply can result in civil penalties of up to 30,000 pounds per breach.',
  },
  {
    question: 'Can I change an observation code after the EICR has been issued?',
    answer:
      'Once an EICR has been signed and issued to the client, it is a formal document and should not be altered retrospectively. If you realise an observation has been incorrectly coded, the correct procedure is to issue an amended report with a clear explanation of the correction, or to issue a new EICR if the error is significant. Some competent person scheme providers have specific procedures for amending issued certificates. In practice, the best approach is to take your time coding observations correctly before signing the report. Elec-Mate helps by providing classification guidance and examples for each code, so you can make an informed decision before finalising.',
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: 'Smart Observation Coding',
    description:
      'The app guides you through observation classification with clear criteria and real examples for each code. Reduces coding errors and ensures consistency across reports.',
  },
  {
    icon: Brain,
    title: 'AI Observation Descriptions',
    description:
      'Get suggestions for clear, specific observation descriptions that reference the relevant BS 7671 regulation. Write professional observations in seconds, not minutes.',
  },
  {
    icon: FileCheck2,
    title: 'Automatic Overall Assessment',
    description:
      'As you add observations and assign codes, the app automatically determines whether the overall assessment is Satisfactory or Unsatisfactory. No more manual tracking.',
  },
  {
    icon: Search,
    title: 'Regulation Lookup',
    description:
      'Tap any observation to look up the relevant BS 7671 regulation. The app provides the regulation text and guidance on whether the observation warrants a C1, C2, C3, or FI code.',
  },
  {
    icon: BookOpen,
    title: 'Real-World Examples Library',
    description:
      'Browse a library of real observation examples with correct classification codes. Learn from common defects and how experienced inspectors document them.',
  },
  {
    icon: AlertTriangle,
    title: 'Coding Consistency Checks',
    description:
      'The app flags potential inconsistencies — like similar defects coded differently on the same report — so you can review and ensure consistent coding throughout.',
  },
];

const articleSchema = {
  '@type': 'Article',
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  datePublished: '2025-01-15',
  dateModified: '2026-01-10',
  author: {
    '@type': 'Organization',
    name: 'Elec-Mate',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    logo: {
      '@type': 'ImageObject',
      url: 'https://elec-mate.com/logo.jpg',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://elec-mate.com/guides/bs7671-observation-codes',
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

export default function BS7671ObservationCodesPage() {
  useSEO({
    title:
      'BS 7671 Observation Codes Explained | C1, C2, C3, FI Guide',
    description: PAGE_DESCRIPTION,
    schema: articleSchema,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            ...articleSchema,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              BS 7671:2018 + A2:2022
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            EICR <span className="text-yellow-400">Observation Codes</span>{' '}
            Explained
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            A complete guide to C1, C2, C3, and FI observation codes. Real
            examples, classification criteria, and how to write clear
            observations that stand up to scrutiny. For UK electricians.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href="#observation-codes"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Jump to Codes
            </a>
          </div>
        </div>
      </section>

      {/* What Are Observation Codes */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Are EICR Observation Codes?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Observation codes are the classification system used on an
              Electrical Installation Condition Report (EICR) to communicate the
              severity of any defects, departures from the standard, or safety
              issues found during an inspection. Every time an inspector
              identifies something that departs from BS 7671 or represents a
              defect, they record it as an observation and assign one of four
              classification codes: C1, C2, C3, or FI.
            </p>
            <p>
              The coding system was introduced to provide a consistent,
              standardised method for classifying observations across the
              industry. Before the current system, different inspectors and
              different scheme providers used different terminology, making it
              difficult for property owners and other stakeholders to understand
              the severity of identified issues. The current C1, C2, C3, FI
              system — as defined in BS 7671 and the associated IET Guidance
              Notes — provides a common language that is understood across the
              UK electrical industry.
            </p>
            <p>
              The observation codes are used during the periodic inspection of
              existing installations (producing an EICR). They are not used on
              Electrical Installation Certificates (EICs), which cover new
              installations. On an EIC, any non-compliance should be rectified
              before the certificate is issued, so there is no need for
              classification codes. The EICR, by contrast, reports on the
              condition of an installation as found, which may include defects
              of varying severity.
            </p>
            <p>
              Understanding when and how to apply each code is one of the most
              important skills an inspector can develop. Incorrect coding
              undermines the credibility of the report, can cause unnecessary
              alarm to property owners, or — more dangerously — can
              understate a genuine safety risk. This guide covers each code in
              detail with real-world examples.
            </p>
          </div>
        </div>
      </section>

      {/* C1 — Danger Present */}
      <section id="observation-codes" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center font-bold text-2xl text-red-400">
                C1
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  C1 — Danger Present
                </h2>
                <p className="text-white text-sm">
                  Risk of injury. Immediate remedial action required.
                </p>
              </div>
            </div>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                A C1 code indicates that there is an immediate danger of injury
                to persons or livestock. This is the most serious classification
                and requires immediate action. When a C1 observation is
                identified, the inspector must advise the person responsible
                for the installation immediately, and the danger should be
                removed or made safe before the inspector leaves the premises
                if at all possible.
              </p>
              <p>
                C1 observations are relatively rare on well-maintained
                installations, but when they occur, they represent genuine
                dangers that could cause electric shock, burns, or fire. The
                inspector should document the danger clearly, advise the
                responsible person in writing, and record on the report that the
                responsible person has been informed.
              </p>
              <h3 className="font-bold text-white text-lg mt-6 mb-3">
                C1 Examples
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Exposed live parts</strong> — live conductors
                    accessible to touch, such as a damaged socket outlet with
                    exposed terminals, or a missing blanking plate on a consumer
                    unit revealing live busbars.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Absent earthing</strong> — the main earthing
                    conductor is disconnected or missing entirely, leaving the
                    entire installation without an earth path. Any earth fault
                    would not be cleared by the protective devices.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Severely damaged distribution board</strong> — a
                    consumer unit with fire damage, melted components, or
                    structural failure that exposes live conductors or
                    compromises the enclosure rating.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Overloaded circuits with visible damage</strong> —
                    cables showing signs of overheating (discoloured insulation,
                    burnt smell), combined with undersized protection or missing
                    protection, presenting an immediate fire risk.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Metalwork at a dangerous potential</strong> —
                    extraneous-conductive-parts (such as metal pipework or
                    structural steelwork) found to be live to touch due to a
                    wiring fault or absent bonding.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* C2 — Potentially Dangerous */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center font-bold text-2xl text-orange-400">
                C2
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  C2 — Potentially Dangerous
                </h2>
                <p className="text-white text-sm">
                  Risk of injury may arise. Urgent remedial action required.
                </p>
              </div>
            </div>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                A C2 code indicates that whilst there may not be an immediate
                danger at the time of the inspection, a risk of injury could
                arise under certain foreseeable conditions. The defect requires
                urgent remedial action to prevent it from becoming dangerous. C2
                is the most commonly debated classification code because it
                requires the inspector to make a professional judgement about the
                likelihood of danger occurring.
              </p>
              <p>
                The distinction between C2 and C1 is immediacy. A C1 is
                dangerous right now — someone could be injured at this moment.
                A C2 is not immediately dangerous but could become so. For
                example, missing RCD protection on a socket circuit is not
                immediately dangerous (the circuit may be working fine), but if
                an earth fault occurs and there is no RCD to clear it quickly,
                injury could result.
              </p>
              <h3 className="font-bold text-white text-lg mt-6 mb-3">
                C2 Examples
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Inadequate bonding</strong> — main bonding conductors
                    to water and gas services missing, undersized, or not
                    properly connected. Under a fault condition, this could
                    result in a dangerous potential difference between services.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Missing RCD protection</strong> — socket outlet
                    circuits accessible to the public or in locations with
                    increased risk (bathrooms, kitchens, external areas) without
                    30mA RCD protection as required by the current edition of BS
                    7671.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Undersized cables</strong> — circuit cables with a
                    current-carrying capacity lower than the rating of the
                    protective device, meaning the cable could overheat before
                    the device operates.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Lack of discrimination</strong> — protective devices
                    configured such that a fault on one circuit causes a
                    higher-level device to operate, disconnecting multiple
                    circuits unnecessarily and potentially affecting safety
                    services.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Zs exceeding maximum permitted value</strong> — the
                    measured earth fault loop impedance for a circuit exceeds the
                    value tabulated in BS 7671 for the protective device,
                    meaning the device may not disconnect within the required
                    time during an earth fault.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* C3 — Improvement Recommended */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center font-bold text-2xl text-blue-400">
                C3
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  C3 — Improvement Recommended
                </h2>
                <p className="text-white text-sm">
                  Does not comply with current standard. Not dangerous.
                  Improvement recommended.
                </p>
              </div>
            </div>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                A C3 code indicates that a part of the installation does not
                comply with the current edition of BS 7671 but is not
                considered dangerous. These are typically features that were
                acceptable under the regulations in force when the installation
                was originally carried out, but do not meet the requirements of
                the current 18th Edition. The inspector recommends improvement
                but acknowledges that there is no immediate safety risk.
              </p>
              <p>
                C3 observations do not make the EICR Unsatisfactory. A report
                with only C3 codes (and no C1 or C2 codes) is classified as
                Satisfactory. This is an important distinction because it means
                the installation is safe for continued use, even though
                improvements would bring it closer to the current standard.
              </p>
              <p>
                C3 is sometimes misunderstood by property owners, who may see
                "Improvement Recommended" and assume the work must be done. It
                is the inspector's role to explain that C3 items are advisory,
                not mandatory, and that the installation remains safe. However,
                the property owner should be encouraged to consider the
                improvements, particularly if they plan to carry out other
                electrical work in the future.
              </p>
              <h3 className="font-bold text-white text-lg mt-6 mb-3">
                C3 Examples
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>No RCD protection on older installations</strong> —
                    socket circuits installed before the requirement for RCD
                    protection was introduced. Not required at the time of
                    installation and not considered dangerous, but RCD protection
                    would improve safety.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Label deficiencies</strong> — circuit labels on the
                    distribution board that are faded, incomplete, or do not
                    match the actual circuit arrangement. Not dangerous, but
                    clear labelling is important for safe working.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Accessibility issues</strong> — the consumer unit is
                    located in a position that makes it difficult to access in an
                    emergency, such as behind stored items or at an awkward
                    height. The current regulations require the means of
                    switching off to be readily accessible.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Older wiring colours</strong> — the installation uses
                    red/black wiring colours from the previous standard rather
                    than the current brown/blue harmonised colours. Not dangerous
                    in itself, but re-identification with coloured sleeving would
                    aid safe working.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Supplementary bonding no longer required</strong> —
                    supplementary equipotential bonding in a bathroom that is no
                    longer required under the current regulations (where all
                    circuits are RCD protected and disconnection times are met),
                    but is still in place. C3 recommends no action is needed but
                    notes the observation for the record.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FI — Further Investigation */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center font-bold text-2xl text-purple-400">
                FI
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  FI — Further Investigation
                </h2>
                <p className="text-white text-sm">
                  Further investigation required without delay.
                </p>
              </div>
            </div>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                An FI code indicates that the inspector was unable to fully
                assess a part of the installation during the inspection, and
                further investigation is needed before a definitive
                classification can be given. FI is not a classification of
                severity like C1, C2, or C3 — it is an acknowledgement that
                more work is required to determine the condition of a specific
                aspect of the installation.
              </p>
              <p>
                FI must always be accompanied by a clear explanation of why
                further investigation is needed and what additional work is
                required. Simply writing "Further investigation required"
                without context is poor practice and will likely be challenged
                by scheme providers or clients. The description should explain
                what the inspector could not access or test, why they could not
                do so, and what specific investigation or testing is recommended.
              </p>
              <p>
                FI is sometimes perceived as a "cop-out" code — a way for
                inspectors to avoid making a difficult classification decision.
                This perception is wrong. FI serves a genuine and important
                purpose: it prevents inspectors from guessing about things they
                cannot see or verify. Coding something as Satisfactory when you
                have not actually been able to inspect it is far more dangerous
                than honestly recording that further investigation is needed.
              </p>
              <h3 className="font-bold text-white text-lg mt-6 mb-3">
                FI Examples
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Inaccessible wiring</strong> — cables concealed in
                    walls, floors, or ceilings that cannot be inspected or tested
                    without invasive work. For example, the inspector suspects
                    that cables routed through a ceiling void may be in contact
                    with thermal insulation but cannot access the void to verify.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Buried cables of unknown route</strong> — cables
                    identified entering or leaving an accessory plate that
                    disappear into a solid wall or floor and their route and
                    condition cannot be determined without opening up the
                    structure.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Suspected issues behind plasterwork</strong> — signs
                    of previous water ingress or discolouration around an
                    electrical accessory suggesting possible damage to concealed
                    wiring, but the extent cannot be determined without removing
                    the plaster.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Inconsistent test results</strong> — test readings
                    that do not match expected values and the cause cannot be
                    determined during the inspection. For example, an unusually
                    high R1+R2 value on a circuit that may indicate a loose
                    connection at a point that cannot be accessed during the
                    current visit.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Locked or occupied areas</strong> — parts of the
                    installation in rooms or areas that were locked or in use
                    during the inspection and could not be accessed. The FI
                    should specify which areas and what testing is required when
                    access is available.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Write Good Observations */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How to Write Good Observation Descriptions
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The quality of your observation descriptions directly affects the
              usefulness of the EICR. A good observation is specific, actionable,
              and references the relevant regulation. A poor observation is
              vague, ambiguous, and leaves the reader unsure of what was found
              or what needs to be done.
            </p>
            <p>
              Every observation should answer three questions: What was found?
              Where was it found? Which regulation does it relate to? For
              example, instead of writing "Bonding inadequate", write "Main
              protective bonding conductor to incoming water service is absent.
              Regulation 411.3.1.2 requires main protective bonding to all
              extraneous-conductive-parts." The second version tells the reader
              exactly what the problem is, where it is, and which regulation
              requires it to be addressed.
            </p>
            <p>
              For FI observations, also explain why further investigation is
              needed and what specific work is recommended. Instead of "Further
              investigation required to ceiling void", write "Cables entering
              ceiling void above first-floor landing could not be inspected as
              no access hatch is present. Recommend access hatch be installed to
              permit inspection of cable routing and condition, particularly in
              relation to thermal insulation contact (Regulation 523.9)."
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Poor Observations
              </h3>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li>"Bonding inadequate"</li>
                <li>"RCD not working properly"</li>
                <li>"Some circuits need attention"</li>
                <li>"Old wiring"</li>
                <li>"Further investigation required"</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                Good Observations
              </h3>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li>
                  "Main bonding to water service absent. Reg 411.3.1.2."
                </li>
                <li>
                  "RCD serving kitchen sockets tripped at 22mA (below 50% of
                  rated current). Replace RCD. Reg 531.2.2."
                </li>
                <li>
                  "Circuit 7 (first-floor ring) — Zs measured 2.15 ohms, max
                  permitted 1.37 ohms for B32. Reg 411.4.6."
                </li>
                <li>
                  "Red/black wiring colours present throughout. Not
                  re-identified. C3 — Reg 514.14."
                </li>
                <li>
                  "Cables in loft void laid directly on thermal insulation.
                  Access limited — FI to determine extent. Reg 523.9."
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Overall Assessment */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Overall Assessment: Satisfactory vs Unsatisfactory
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The overall assessment on an EICR is a binary judgement:
              Satisfactory or Unsatisfactory. The rule is straightforward.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <h3 className="font-bold text-white text-lg">Satisfactory</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                The installation is safe for continued use. No C1 or C2
                observations are present. There may be C3 observations
                (improvement recommended) and/or FI observations (further
                investigation required), but no items that represent a current
                or potential danger. The person responsible can continue to use
                the installation with confidence.
              </p>
            </div>
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <h3 className="font-bold text-white text-lg">Unsatisfactory</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                One or more C1 or C2 observations are present. The installation
                is either currently dangerous (C1) or potentially dangerous
                (C2). Remedial action is required to make the installation safe.
                The person responsible must arrange for the identified defects
                to be corrected by a competent person, and confirmation of
                completion should be obtained.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-white leading-relaxed">
            <p>
              An important point often overlooked is the treatment of FI
              observations in relation to the overall assessment. An FI does not
              automatically make the report Unsatisfactory. However, if the
              inspector has reason to believe that the area requiring further
              investigation may reveal a dangerous condition, they should
              consider whether the overall assessment should reflect this
              uncertainty. In practice, an FI observation alongside an otherwise
              clean report usually results in a Satisfactory assessment with a
              clear note that further investigation is required.
            </p>
          </div>
        </div>
      </section>

      {/* Landlord's Duty */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The Landlord's Duty When Observations Are Raised
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Under the Electrical Safety Standards in the Private Rented Sector
              (England) Regulations 2020, landlords have specific legal
              obligations when an EICR raises observations. Understanding these
              obligations is important for both inspectors (who need to
              communicate them to landlords) and landlords (who need to act on
              them).
            </p>
            <p>
              When the EICR identifies observations requiring urgent remedial
              action (any C1 or C2 code), the landlord must ensure that
              investigative or remedial work is completed within 28 days of the
              inspection date, or within any shorter period specified by the
              inspector on the report. For C1 (Danger Present) observations,
              inspectors often specify a shorter period — in some cases,
              immediate action is required before the premises can be safely
              occupied.
            </p>
            <p>
              After the remedial work is completed, the landlord must obtain
              written confirmation from a qualified person that the work has
              been done to a satisfactory standard. This confirmation must be
              provided to the local housing authority within 28 days of the
              remedial work being completed if requested. The landlord must also
              supply a copy of the report (and any confirmation of remedial
              work) to the tenants within 28 days.
            </p>
            <p>
              Failure to comply with these requirements can result in local
              authority enforcement action, including civil penalties of up to
              30,000 pounds per breach, remedial action notices requiring
              specific work to be carried out, and in extreme cases, the local
              authority may arrange for the work to be done and recover costs
              from the landlord. These are significant consequences, and
              inspectors should ensure landlords understand their obligations
              when handing over an Unsatisfactory EICR.
            </p>
          </div>
        </div>
      </section>

      {/* Common Inspector Mistakes */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Common Mistakes Inspectors Make When Coding Observations
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              Even experienced inspectors make coding errors. Recognising these
              common mistakes helps you avoid them and produce more accurate,
              defensible reports.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">
                    Over-coding with C2 when C3 is appropriate
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Some inspectors code everything as C2 "to be safe." This
                    makes every report Unsatisfactory and devalues the coding
                    system. If a feature was compliant when installed and does
                    not present a risk, it is C3, not C2. Consider the actual
                    risk, not just the departure from the current standard.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">
                    Under-coding with C3 when C2 is warranted
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    The opposite mistake: coding a genuine safety issue as C3 to
                    avoid making the report Unsatisfactory. This is dangerous and
                    can expose the inspector to liability. If there is a real
                    risk of injury, it must be coded C2 (or C1) regardless of the
                    consequences for the overall assessment.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">
                    Using FI to avoid difficult decisions
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    FI should only be used when you genuinely cannot assess
                    something, not when you are unsure about the correct
                    classification. If you can see a defect and assess its
                    severity, code it. FI is for situations where you cannot
                    physically see or test the item in question.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">
                    Vague observation descriptions
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Writing "bonding inadequate" or "needs attention" without
                    specifying what, where, and which regulation. Every
                    observation should be specific enough that another competent
                    person could read it and understand exactly what was found
                    and what needs to be done.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">
                    Inconsistent coding within the same report
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Coding the same type of defect as C2 on one circuit and C3
                    on another without a clear reason. If missing RCD protection
                    on the kitchen circuit is C2, it should be C2 on the bathroom
                    circuit as well. Consistency demonstrates professional
                    judgement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Elec-Mate Observation Coding Features
          </h2>
          <p className="text-white mb-8 leading-relaxed">
            Elec-Mate helps you code observations consistently and accurately on
            every EICR, with AI-powered suggestions and regulation references.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About Observation Codes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-white/10 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 min-h-[44px] touch-manipulation cursor-pointer text-white font-medium">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-yellow-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Write better EICR observations"
        subheading="Join 430+ UK electricians producing professional, consistent EICRs. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
