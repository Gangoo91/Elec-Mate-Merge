import { Helmet } from 'react-helmet';
import { CARD, CARD_PADDED, LABEL, BTN_PRIMARY, BTN_NEUTRAL } from '@/components/seo/seoSurface';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  ChevronDown,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  BookOpen,
  Brain,
  Search,
  AlertCircle,
  HelpCircle,
  Info,
} from 'lucide-react';

const PAGE_TITLE = 'BS 7671 Observation Codes | C1, C2, C3, FI Explained';
const PAGE_DESCRIPTION =
  'Complete guide to EICR observation codes C1, C2, C3 and FI. Real examples, classification criteria, and which codes actually make a report Unsatisfactory. For UK electricians.';

const faqs = [
  {
    question: 'Which observation codes make an EICR Unsatisfactory?',
    answer:
      'C1 and C2 only. The notes for the person producing the report in BS 7671:2018+A4:2026 Appendix 6 state that the overall assessment is to be reported as unsatisfactory where any observation is given a code C1 or C2 classification. Section K of the model Condition Report splits observations into two blocks for exactly this reason: the C1 and C2 block is headed "These items affect the overall assessment of the report", and the C3 and FI block is headed "These items do not affect the overall assessment of the report". Section E repeats it: any observation classified as Improvement recommended (C3) or Further investigation (FI) is advisory and does not affect the overall assessment, but should be given due consideration. Note that some scheme providers and older industry guidance have treated FI as making a report Unsatisfactory. Where your scheme rules differ from the model form, follow your scheme.',
  },
  {
    question: 'What is the difference between C2 and C3?',
    answer:
      'The key difference is the level of risk. A C2 (Potentially dangerous) observation indicates that there is a risk of injury that requires urgent remedial action — something that may not be immediately dangerous but could become so under foreseeable conditions. A C3 (Improvement recommended) observation indicates that the installation does not fully comply with the current edition of BS 7671 but is not dangerous. C3 items are typically legacy features that were compliant when installed but do not meet the current standard. The judgement between C2 and C3 requires professional experience and an understanding of the risk in context. It also carries real weight: a C2 makes the report Unsatisfactory, a C3 does not. Code the risk you actually found, not the outcome you want.',
  },
  {
    question: 'When should I use an FI code instead of a classification code?',
    answer:
      'FI is used where the inspection has identified a potential issue for which you cannot determine a classification code until further investigation has taken place. Appendix 6 puts it that way deliberately — FI is recorded where an issue has been identified but the extent and limitations of the inspection prevent you verifying it. Common situations include: parts of the installation that are concealed or inaccessible, components that require specialist testing beyond the scope of the current inspection, unexpected or inconsistent test results that need deeper investigation, or areas in use that could not be safely isolated during the inspection. FI is not a way to avoid making a judgement — you must explain specifically why further investigation is needed and what additional work is required. Once the investigation is done, the issue gets its proper code, and that code may well be a C1 or C2 that flips the assessment.',
  },
  {
    question: 'How long does a landlord have to fix C1, C2 and FI observations?',
    answer:
      'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, where a report indicates that further investigative or remedial work is necessary, the landlord must ensure that work is carried out within 28 days. That duty is triggered by the work being necessary, so it catches FI observations as well as C1 and C2 — even though FI does not affect the BS 7671 overall assessment. If the inspector specifies a shorter period on the report (for example, for a C1 Danger present observation), the landlord must comply with that shorter period. The landlord must then obtain written confirmation from a qualified person that the remedial work has been completed to a satisfactory standard. Failure to comply can result in civil penalties of up to £30,000 per breach.',
  },
  {
    question: 'How do I code a missing AFDD or a lighting circuit with no RCD under A4:2026?',
    answer:
      'These are two different requirements with two different strengths, and the difference matters when you code them. Regulation 421.1.7 was redrafted at A4:2026. It is now a requirement to protect final circuits supplying socket-outlets with a rated current not exceeding 32 A using arc fault detection devices (AFDDs) in Higher Risk Residential Buildings, Houses in Multiple Occupation, purpose-built student accommodation and care homes. For all other premises, the regulation recommends AFDDs for single-phase AC final circuits supplying socket-outlets not exceeding 32 A. So the absence of an AFDD is not automatically a C3 — in one of the four named premises types it is the absence of something the standard requires, and you should judge the risk accordingly. Regulation 411.3.4 is introduced by Amendment 2:2022 and is unqualified: within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires. On a new installation or rewire that is a hard requirement. On an existing domestic installation where lighting circuits are not RCD protected, the absence is a departure from the current edition; in a low-risk context this is typically coded C3, but aggravating factors (damaged wiring, cables at risk, vulnerable occupants) may justify C2. In every case, describe what you found and cite the regulation.',
  },
  {
    question: 'Can I change an observation code after the EICR has been issued?',
    answer:
      'Once an EICR has been signed and issued to the client, it is a formal document and should not be altered retrospectively. If you realise an observation has been incorrectly coded, the correct procedure is to issue an amended report with a clear explanation of the correction, or to issue a new EICR if the error is significant. Some competent person scheme providers have specific procedures for amending issued certificates. In practice, the best approach is to take your time coding observations correctly before signing the report. Elec-Mate helps by providing classification guidance and examples for each code, so you can make an informed decision before finalising.',
  },
  {
    question: 'What is the most common C2 observation found on domestic EICRs?',
    answer:
      'The absence of RCD protection on final socket-outlet circuits in dwellings. Regulation 411.3.3 was revised at A4:2026 and now applies to socket-outlets with a rated current not exceeding 32 A: additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided. There is a documented risk assessment exception, but it is not available for a dwelling, and it never applies to socket-outlets liable to be used by persons of capability BA1 or by children (BA2), or to mobile equipment up to 32 A used outdoors. Many older consumer units contain MCBs with no RCD protection on socket circuits, which is a potentially dangerous condition given the risk of shock to occupants using portable appliances. Other commonly encountered C2 observations include earthing and bonding deficiencies where main protective bonding conductors are missing or undersized, damaged or deteriorated cable insulation particularly in older rubber-insulated wiring, and absence of supplementary bonding in bathrooms where it is required.',
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: 'Smart Observation Coding',
    description:
      'The app guides you through observation classification with clear criteria and real examples for each code.',
  },
  {
    icon: Brain,
    title: 'AI Observation Descriptions',
    description:
      'Get suggestions for clear, specific observation descriptions that reference the relevant BS 7671 regulation.',
  },
  {
    icon: FileCheck2,
    title: 'Automatic Overall Assessment',
    description:
      'As you add observations and assign codes, the app applies the Appendix 6 rule and sets the overall assessment to Satisfactory or Unsatisfactory for you.',
  },
  {
    icon: Search,
    title: 'Regulation Lookup',
    description:
      'Tap any observation to look up the relevant BS 7671 regulation, with the regulation text alongside so you can quote it in the description.',
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
      'The app flags potential inconsistencies — like similar defects coded differently on the same report — so you can review before you sign.',
  },
];

const articleSchema = {
  '@type': 'Article',
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  datePublished: '2025-01-15',
  dateModified: '2026-08-07',
  author: {
    '@type': 'Organization',
    name: 'Elec-Mate',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.elec-mate.com/logo.jpg',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.elec-mate.com/guides/bs7671-observation-codes',
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

const TH =
  'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white whitespace-nowrap';

export default function BS7671ObservationCodesPage() {
  useSEO({
    title: 'BS 7671 Observation Codes Explained | C1, C2, C3, FI Guide',
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

      {/* Hero — left-aligned editorial, matching the rest of the public site.
          Was: a centred column with a rounded pill badge and a book icon, and
          "Observation Codes" set in yellow mid-headline. Yellow is reserved for
          section headings and the primary action now, so a part-coloured H1
          fought them; the pill and icon are the decorative tells the house
          rules rule out. */}
      <section className="px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p className={`${LABEL} text-white`}>BS 7671:2018+A4:2026</p>
          <h1 className="mt-3 max-w-[20ch] text-[34px] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-[44px] lg:text-[52px]">
            EICR observation codes explained
          </h1>
          <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-white sm:text-[17.5px]">
            C1, C2, C3 and FI — what each code means, which ones make a report Unsatisfactory, and
            real examples of each. For UK electricians.
          </p>

          {/* Quick-reference table — targets the featured snippet for
              'C1 C2 C3 observation codes'. Scrolls inside its own container so
              four columns never push the page sideways on a phone.
              The "affects assessment" column is the whole reason people land
              here, so it is in the table rather than four sections down. */}
          <div className={`${CARD} mt-9 overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead>
                  <tr className="bg-[hsl(0_0%_13%)]">
                    <th className={TH}>Code</th>
                    <th className={TH}>Meaning</th>
                    <th className={TH}>Action</th>
                    <th className={TH}>Affects overall assessment?</th>
                  </tr>
                </thead>
                {/* The code colours stay: they carry the real severity meaning
                    an inspector already reads, so this is semantic, not decor. */}
                <tbody className="divide-y divide-white/[0.08]">
                  <tr>
                    <td className="px-4 py-3.5 font-bold text-red-400">C1</td>
                    <td className="px-4 py-3.5 text-white">Danger present. Risk of injury</td>
                    <td className="px-4 py-3.5 text-white">Immediate remedial action</td>
                    <td className="px-4 py-3.5 font-medium text-red-400">Yes — Unsatisfactory</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-bold text-orange-400">C2</td>
                    <td className="px-4 py-3.5 text-white">Potentially dangerous</td>
                    <td className="px-4 py-3.5 text-white">Urgent remedial action</td>
                    <td className="px-4 py-3.5 font-medium text-red-400">Yes — Unsatisfactory</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-bold text-sky-400">C3</td>
                    <td className="px-4 py-3.5 text-white">Improvement recommended</td>
                    <td className="px-4 py-3.5 text-white">Advisory</td>
                    <td className="px-4 py-3.5 font-medium text-white">No</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3.5 font-bold text-violet-400">FI</td>
                    <td className="px-4 py-3.5 text-white">Further investigation is advised</td>
                    <td className="px-4 py-3.5 text-white">Investigate, then code it</td>
                    <td className="px-4 py-3.5 font-medium text-white">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed text-white">
            <strong>The short answer:</strong> a C1 or a C2 makes the report Unsatisfactory. C3 and
            FI are advisory and do not change the overall assessment — that is the wording printed
            in the model Condition Report in BS 7671:2018+A4:2026 Appendix 6.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/auth/signup" className={`${BTN_PRIMARY} h-14 w-full sm:w-auto`}>
              Start 7-day free trial
            </a>
            <a href="#observation-codes" className={`${BTN_NEUTRAL} h-14 w-full sm:w-auto`}>
              Jump to the codes
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
              Observation codes are the classification system used on an Electrical Installation
              Condition Report (EICR) to communicate the severity of any defects, departures from
              the standard, or safety issues found during an inspection. Every time an inspector
              identifies something that departs from BS 7671 or represents a defect, they record it
              in Section K of the report and assign one of four codes: C1, C2, C3 or FI.
            </p>
            <p>
              The codes are not scheme-provider inventions. They are printed on the model Condition
              Report in Appendix 6 of BS 7671, together with the notes for the person producing the
              report — and Regulation 653.1 requires those notes to be taken into account when the
              report is produced. That is what gives the industry a common language: an EICR
              produced by any competent person, audited by any scheme, means the same thing by C2.
            </p>
            <p>
              Section K of the model report is split into two blocks. The first lists C1 and C2
              observations under the heading{' '}
              <em>&ldquo;These items affect the overall assessment of the report&rdquo;</em>. The
              second lists C3 and FI observations under{' '}
              <em>&ldquo;These items do not affect the overall assessment of the report&rdquo;</em>.
              If you remember nothing else about coding, remember that split — it is the difference
              between a Satisfactory and an Unsatisfactory report.
            </p>
            <p>
              Observation codes are used during the periodic inspection of existing installations
              (producing an EICR). They are not used on{' '}
              <SEOInternalLink href="/eic-certificate">
                Electrical Installation Certificates (EICs)
              </SEOInternalLink>
              , which cover new installations. On an EIC, any non-compliance should be rectified
              before the certificate is issued, so there is no need for classification codes. The
              EICR, by contrast, reports on the condition of an installation as found, which may
              include defects of varying severity. Preparing for your{' '}
              <SEOInternalLink href="/city-guilds2391">
                C&amp;G 2391-52 inspection and testing qualification
              </SEOInternalLink>{' '}
              gives you the knowledge to code observations consistently and correctly.
            </p>
            <p>
              Getting the code right is one of the most important skills an inspector can develop.
              Incorrect coding undermines the credibility of the report, can cause unnecessary alarm
              to property owners, or — more dangerously — can understate a genuine safety risk. The
              rest of this guide covers each code with real-world examples.
            </p>
          </div>
        </div>
      </section>

      {/* C1 — Danger Present.
          Was: a colour-washed panel (bg-red-500/10 and friends). A 10% colour
          over near-black reads as mud, so the surface is now the standard
          neutral card and the colour goes full-strength on the code itself,
          where it actually carries meaning. */}
      <section id="observation-codes" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className={CARD_PADDED}>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-14 h-14 shrink-0 rounded-xl bg-[hsl(0_0%_13%)] flex items-center justify-center font-bold text-2xl text-red-400">
                C1
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">C1 — Danger present</h2>
                <p className="text-white text-sm">
                  Risk of injury. Immediate remedial action is necessary.
                </p>
              </div>
            </div>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                A C1 code indicates that there is an immediate danger of injury to persons or
                livestock. This is the most serious classification and requires immediate action.
                Appendix 6 is explicit: wherever practicable, items classified as C1 are to be made
                safe on discovery. Where that is not possible, the owner or user is to be given
                written notification as a matter of urgency.
              </p>
              <p>
                C1 observations are relatively rare on well-maintained installations, but when they
                occur, they represent genuine dangers that could cause electric shock, burns or
                fire. Document the danger clearly, notify the responsible person in writing, and
                record on the report that they have been informed.
              </p>
              <h3 className="font-bold text-white text-lg mt-6 mb-3">C1 examples</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Exposed live parts</strong> — live conductors accessible to touch, such
                    as a damaged socket outlet with exposed terminals, or a missing blanking plate
                    on a consumer unit revealing live busbars.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Absent earthing</strong> — the main earthing conductor is disconnected
                    or missing entirely, leaving the entire installation without an earth path. Any
                    earth fault would not be cleared by the protective devices.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Severely damaged distribution board</strong> — a consumer unit with fire
                    damage, melted components, or structural failure that exposes live conductors or
                    compromises the enclosure.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Overloaded circuits with visible damage</strong> — cables showing signs
                    of overheating (discoloured insulation, burnt smell), combined with undersized
                    or missing protection, presenting an immediate fire risk.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Metalwork at a dangerous potential</strong> —
                    extraneous-conductive-parts (such as metal pipework or structural steelwork)
                    found to be live to touch due to a wiring fault or absent bonding.
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
          <div className={CARD_PADDED}>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-14 h-14 shrink-0 rounded-xl bg-[hsl(0_0%_13%)] flex items-center justify-center font-bold text-2xl text-orange-400">
                C2
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  C2 — Potentially dangerous
                </h2>
                <p className="text-white text-sm">Urgent remedial action is necessary.</p>
              </div>
            </div>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                A C2 code indicates that whilst there may not be an immediate danger at the time of
                the inspection, a risk of injury could arise under foreseeable conditions. The
                defect requires urgent remedial action to prevent it becoming dangerous. C2 is the
                most commonly debated code because it turns on a professional judgement about how
                likely the danger is to materialise.
              </p>
              <p>
                The distinction between C2 and C1 is immediacy. A C1 is dangerous right now —
                someone could be injured at this moment. A C2 is not immediately dangerous but could
                become so. Missing RCD protection on a socket circuit is the textbook case: the
                circuit may be working perfectly, but if an earth fault occurs there is no RCD to
                clear it quickly, and injury could result.
              </p>
              <h3 className="font-bold text-white text-lg mt-6 mb-3">C2 examples</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Inadequate main protective bonding</strong> — bonding conductors to
                    water and gas services missing, undersized, or not connected as near as
                    practicable to the point of entry (Reg 544.1.2). Under a fault condition this
                    could result in a dangerous potential difference between services.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Missing RCD protection</strong> — socket-outlets with a rated current
                    not exceeding 32 A without 30 mA RCD protection, where Reg 411.3.3 requires it.
                    The documented risk assessment exception is not available for a dwelling.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Undersized cables</strong> — circuit cables with a current-carrying
                    capacity lower than the rating of the protective device, meaning the cable could
                    overheat before the device operates.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Lack of selectivity</strong> — protective devices coordinated such that
                    a fault on one circuit operates an upstream device, disconnecting circuits that
                    should have stayed live, including potentially safety services. BS 7671 calls
                    this selectivity; discrimination is the older term for the same thing (Section
                    536.4).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Zs exceeding the maximum permitted value</strong> — the measured earth
                    fault loop impedance exceeds the value tabulated for the protective device in
                    Tables 41.2 to 41.5, so the device may not disconnect within the time required
                    by Reg 411.3.2.2 during an earth fault.
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
          <div className={CARD_PADDED}>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-14 h-14 shrink-0 rounded-xl bg-[hsl(0_0%_13%)] flex items-center justify-center font-bold text-2xl text-sky-400">
                C3
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  C3 — Improvement recommended
                </h2>
                <p className="text-white text-sm">
                  Advisory. Does not affect the overall assessment.
                </p>
              </div>
            </div>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                A C3 code indicates that a part of the installation does not comply with the current
                edition of BS 7671 but is not considered dangerous. These are typically features
                that were acceptable under the regulations in force when the installation was
                carried out, but do not meet BS 7671:2018+A4:2026. The inspector recommends
                improvement while acknowledging there is no immediate safety risk.
              </p>
              <p>
                C3 observations do not make the EICR Unsatisfactory. Appendix 6 states plainly that
                a C3 recommendation is advisory only and does not affect the overall assessment of
                the report. A report carrying only C3 observations is Satisfactory: the installation
                is safe for continued use even though improvements would bring it closer to the
                current standard.
              </p>
              <p>
                Property owners often misread &ldquo;improvement recommended&rdquo; as work they are
                obliged to do. It is the inspector&rsquo;s job to explain that C3 items are
                advisory, that the installation remains safe, and that the improvements are still
                worth considering — particularly if other electrical work is planned.
              </p>
              <h3 className="font-bold text-white text-lg mt-6 mb-3">C3 examples</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Domestic lighting circuits with no RCD</strong> — Reg 411.3.4, new at
                    A4:2026, requires 30 mA RCD protection for AC final circuits supplying
                    luminaires within domestic premises. On an existing installation with no
                    aggravating factors this is typically C3, not C2.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Label deficiencies</strong> — circuit labels on the distribution board
                    that are faded, incomplete, or do not match the actual circuit arrangement.
                    Missing &ldquo;Safety Electrical Connection — Do Not Remove&rdquo; notices at
                    bonding connections fall here too (Reg 514.13.1).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Accessibility issues</strong> — the consumer unit is behind stored items
                    or at an awkward height. Reg 132.15.201 requires effective means, suitably
                    placed for ready operation, to cut off all voltage.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Older wiring colours not re-identified</strong> — red/black conductors
                    from the previous standard left unmarked where they meet harmonised
                    brown/blue. Not dangerous in itself, but Reg 514.3.1 requires cores to be
                    identifiable, and sleeving removes the ambiguity for whoever works on it next.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Absent RCD on a circuit where it is only recommended</strong> — for
                    example an AFDD omitted on a socket-outlet circuit in premises where Reg 421.1.7
                    recommends rather than requires one. Where the premises is a Higher Risk
                    Residential Building, HMO, purpose-built student accommodation or care home, the
                    same omission is a departure from a requirement and warrants a harder look.
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
          <div className={CARD_PADDED}>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-14 h-14 shrink-0 rounded-xl bg-[hsl(0_0%_13%)] flex items-center justify-center font-bold text-2xl text-violet-400">
                FI
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  FI — Further investigation is advised
                </h2>
                <p className="text-white text-sm">
                  Advisory. Does not affect the overall assessment.
                </p>
              </div>
            </div>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                FI is recorded where the inspection and testing has identified a potential issue for
                which you cannot determine a classification code until further investigation has
                taken place — usually because of the extent and limitations agreed for the
                inspection. It is not a severity rating like C1, C2 and C3. It is an honest
                statement that something needs looking at before it can be coded.
              </p>
              <p>
                Because FI is not a severity rating, it sits in the advisory block of Section K
                alongside C3 and does not, on its own, make the report Unsatisfactory. That surprises
                a lot of inspectors, and some scheme providers apply a stricter house rule — check
                yours. What FI does do is create an obligation to investigate: once the investigation
                is complete, the issue gets its proper code, and if that turns out to be a C1 or C2
                the assessment changes. In the private rented sector, an FI also triggers the
                landlord&rsquo;s 28-day duty to carry out further investigative work.
              </p>
              <p>
                FI must always be accompanied by a clear explanation of why further investigation is
                needed and what work is required. &ldquo;Further investigation required&rdquo; on
                its own is poor practice and will be challenged by scheme auditors and clients
                alike. Say what you could not access or test, why, and what specific investigation
                you recommend.
              </p>
              <h3 className="font-bold text-white text-lg mt-6 mb-3">FI examples</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Inaccessible wiring</strong> — cables concealed in walls, floors or
                    ceilings that cannot be inspected or tested without invasive work. For example,
                    cables routed through a ceiling void are suspected to be in contact with thermal
                    insulation (Reg 523.9) but the void cannot be accessed to verify.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Buried cables of unknown route</strong> — cables entering or leaving an
                    accessory plate that disappear into a solid wall or floor, whose route and
                    condition cannot be determined without opening up the structure.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Suspected damage behind plasterwork</strong> — signs of previous water
                    ingress or discolouration around an accessory suggesting possible damage to
                    concealed wiring, where the extent cannot be established without removing
                    plaster.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Inconsistent test results</strong> — readings that do not match expected
                    values with no cause identifiable on the day. For example, an unusually high
                    R1+R2 on a circuit that may indicate a loose connection at a point that could
                    not be accessed during the visit.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Locked or occupied areas</strong> — parts of the installation in rooms
                    that were locked or in use during the inspection. State which areas, and what
                    testing is required when access is available.
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
              The quality of your observation descriptions directly affects the usefulness of the
              EICR. A good observation is specific, actionable, and references the relevant
              regulation. A poor one is vague and leaves the reader unsure of what was found or what
              needs doing.
            </p>
            <p>
              Every observation should answer three questions: what was found, where was it found,
              and which regulation does it relate to? Instead of &ldquo;bonding inadequate&rdquo;,
              write &ldquo;Main protective bonding conductor to incoming water service is absent.
              Regulation 544.1.2 requires the connection to any extraneous-conductive-part to be
              made as near as practicable to the point of entry of that part into the
              premises.&rdquo; The second version tells the reader exactly what the problem is,
              where it is, and which regulation requires it to be addressed.
            </p>
            <p>
              For FI observations, also explain why further investigation is needed and what
              specific work you recommend. Instead of &ldquo;further investigation required to
              ceiling void&rdquo;, write &ldquo;Cables entering ceiling void above first-floor
              landing could not be inspected as no access hatch is present. Recommend an access
              hatch be installed to permit inspection of cable routing and condition, particularly
              in relation to thermal insulation contact (Regulation 523.9).&rdquo;
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className={CARD_PADDED}>
              <h3 className="font-bold text-white mb-3">Poor observations</h3>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li>&ldquo;Bonding inadequate&rdquo;</li>
                <li>&ldquo;RCD not working properly&rdquo;</li>
                <li>&ldquo;Some circuits need attention&rdquo;</li>
                <li>&ldquo;Old wiring&rdquo;</li>
                <li>&ldquo;Further investigation required&rdquo;</li>
              </ul>
            </div>
            <div className={CARD_PADDED}>
              <h3 className="font-bold text-white mb-3">Good observations</h3>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li>
                  &ldquo;Main protective bonding to incoming water service absent. Reg
                  544.1.2.&rdquo;
                </li>
                <li>
                  &ldquo;RCD serving kitchen sockets did not disconnect within 300 ms on an AC test
                  at its rated residual operating current of 30 mA. Reg 643.8 — device to be
                  replaced.&rdquo;
                </li>
                <li>
                  &ldquo;Circuit 7 (first-floor ring) — Zs measured 2.15 &Omega;, maximum permitted
                  1.37 &Omega; for a 32 A Type B circuit-breaker (Table 41.3). Reg 411.3.2.2.&rdquo;
                </li>
                <li>
                  &ldquo;Red/black conductor colours present throughout, not re-identified with
                  sleeving or markers. C3 — Reg 514.3.1.&rdquo;
                </li>
                <li>
                  &ldquo;Cables in loft void laid directly on thermal insulation. Access limited —
                  FI to determine extent. Reg 523.9.&rdquo;
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
              The overall assessment recorded in Section E of the EICR is a binary judgement:
              Satisfactory or Unsatisfactory. There is no weighting and no averaging. The notes for
              the person producing the report in Appendix 6 give the rule in one sentence — the
              overall assessment is to be reported as unsatisfactory where any observation is given
              a code C1 or C2 classification.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className={CARD_PADDED}>
              <h3 className="font-bold text-white text-lg mb-3">Satisfactory</h3>
              <p className="text-white text-sm leading-relaxed">
                No C1 and no C2 observations. The installation is safe for continued use. There may
                be C3 observations, and there may be FI observations still to be investigated —
                neither changes the assessment. The person responsible can continue to use the
                installation, and should act on the advisory items in their own time.
              </p>
            </div>
            <div className={CARD_PADDED}>
              <h3 className="font-bold text-white text-lg mb-3">Unsatisfactory</h3>
              <p className="text-white text-sm leading-relaxed">
                One or more C1 or C2 observations. The installation is either currently dangerous
                (C1) or potentially dangerous (C2). Remedial work is required — immediately for a
                C1, urgently for a C2 — by a skilled person competent in electrical installation
                work, and confirmation of completion should be obtained.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-white leading-relaxed">
            <p>
              The point most often got wrong is FI. Because an FI means the inspector could not
              reach a conclusion, it is tempting to assume it must make the report Unsatisfactory.
              The model report says otherwise: C3 and FI sit together in the advisory block of
              Section K and do not affect the overall assessment. What an FI does create is an
              obligation to investigate. Once that investigation is complete the item receives its
              proper code — and if the answer turns out to be a C1 or C2, the report has to be
              revisited.
            </p>
            <p>
              Two practical caveats. First, some competent person scheme providers operate a
              stricter internal rule and treat FI as Unsatisfactory on audit; where your scheme says
              so, follow your scheme. Second, in the private rented sector the landlord&rsquo;s duty
              is triggered by further investigative <em>or</em> remedial work being necessary, so an
              FI carries the same 28-day clock as a C1 or C2 regardless of the assessment recorded.
            </p>
          </div>
        </div>
      </section>

      {/* Landlord's Duty */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The Landlord&rsquo;s Duty When Observations Are Raised
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Under the Electrical Safety Standards in the Private Rented Sector (England)
              Regulations 2020, landlords have specific legal obligations when an EICR raises
              observations. These sit alongside BS 7671, not inside it — the duty is set by the
              regulations, not by the observation code.
            </p>
            <p>
              Where the report indicates that further investigative or remedial work is necessary —
              which covers C1, C2 and FI observations — the landlord must ensure that work is
              carried out within 28 days of the inspection, or within any shorter period specified
              by the inspector on the report. For C1 observations inspectors often specify a shorter
              period; in some cases the danger must be removed before the premises can be safely
              occupied at all.
            </p>
            <p>
              After the work is completed, the landlord must obtain written confirmation from a
              qualified person that it has been done to a satisfactory standard, and supply that
              confirmation together with a copy of the report to the tenants and the local housing
              authority. A copy of the report itself must reach existing tenants within 28 days of
              the inspection.
            </p>
            <p>
              Failure to comply can result in local authority enforcement action, including civil
              penalties of up to £30,000 per breach and remedial action notices requiring specific
              work to be carried out. In extreme cases the local authority may arrange the work
              itself and recover the cost from the landlord. Inspectors should make sure landlords
              understand these obligations when handing over an Unsatisfactory EICR — or one
              carrying an FI.
            </p>
          </div>
        </div>
      </section>

      {/* Common Inspector Mistakes.
          Was five cards each stamped with the same yellow Zap icon — the same
          accent repeated five times reads as decoration, not signal, so the
          headings now carry the hierarchy on their own. */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Common Mistakes Inspectors Make When Coding Observations
          </h2>
          <p className="text-white leading-relaxed mb-6">
            Even experienced inspectors make coding errors. Recognising these helps you produce more
            accurate, more defensible reports.
          </p>
          <div className="space-y-4">
            <div className={CARD_PADDED}>
              <h3 className="font-bold text-white mb-1">
                Coding C2 where C3 is the honest answer
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Some inspectors code everything C2 &ldquo;to be safe&rdquo;. That makes every report
                Unsatisfactory and devalues the coding system. If a feature was compliant when
                installed and presents no risk, it is C3. Consider the actual risk, not just the
                departure from the current standard.
              </p>
            </div>
            <div className={CARD_PADDED}>
              <h3 className="font-bold text-white mb-1">Coding C3 where C2 is warranted</h3>
              <p className="text-white text-sm leading-relaxed">
                The opposite mistake: downgrading a genuine safety issue to C3 to avoid an
                Unsatisfactory report. That is dangerous and exposes the inspector to liability. If
                there is a real risk of injury it is C2 or C1, whatever that does to the assessment.
              </p>
            </div>
            <div className={CARD_PADDED}>
              <h3 className="font-bold text-white mb-1">Using FI to dodge a difficult decision</h3>
              <p className="text-white text-sm leading-relaxed">
                FI is for things you genuinely could not verify, not things you are unsure how to
                classify. If you can see the defect and assess its severity, code it. And remember
                FI does not make the report Unsatisfactory — reaching for it to soften a C2 does not
                work, it just leaves a real danger unrecorded.
              </p>
            </div>
            <div className={CARD_PADDED}>
              <h3 className="font-bold text-white mb-1">Vague observation descriptions</h3>
              <p className="text-white text-sm leading-relaxed">
                Writing &ldquo;bonding inadequate&rdquo; or &ldquo;needs attention&rdquo; without
                saying what, where, and under which regulation. Every observation should be specific
                enough that another competent person could read it and know exactly what was found
                and what needs doing.
              </p>
            </div>
            <div className={CARD_PADDED}>
              <h3 className="font-bold text-white mb-1">Inconsistent coding within one report</h3>
              <p className="text-white text-sm leading-relaxed">
                Coding the same defect C2 on one circuit and C3 on another without a stated reason.
                If missing RCD protection on the kitchen circuit is a C2, it is a C2 on the bathroom
                circuit too. Consistency is what makes the judgement look like judgement.
              </p>
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
            Elec-Mate helps you code observations consistently and accurately on every EICR, with
            AI-powered suggestions and regulation references.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* App Bridge */}
      <section className="py-8 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <SEOAppBridge
            title="Produce Professional EICRs with Elec-Mate"
            description="Generate compliant EICR certificates with observation coding guidance, AI-written descriptions and an overall assessment that applies the Appendix 6 rule for you."
            ctaText="Start 7-day free trial"
            ctaHref="/auth/signup"
          />
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
                <summary className="flex items-center justify-between gap-3 p-4 min-h-[44px] touch-manipulation cursor-pointer text-white font-medium">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 shrink-0 text-elec-yellow group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related pages — auto-injected for internal-link health (audit criterion #7).
          Topic-matched via token-Jaccard against the broader SEO corpus. */}
      <section className="px-5 py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Related electrical pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <SEOInternalLink href="/guides/eicr-observation-codes-explained">
              EICR Observation Codes C1 C2 C3 FI Explained
            </SEOInternalLink>
            <SEOInternalLink href="/guides/cable-colour-codes-uk">
              Cable Colour Codes UK
            </SEOInternalLink>
            <SEOInternalLink href="/guides/ev-charger-error-codes">
              EV Charger Error Codes
            </SEOInternalLink>
            <SEOInternalLink href="/polarity-test-guide">
              Polarity Testing Guide BS 7671
            </SEOInternalLink>
            <SEOInternalLink href="/guides/bathroom-electrical-zones-bs7671">
              Bathroom Electrical Zones BS 7671
            </SEOInternalLink>
            <SEOInternalLink href="/guides/insulation-resistance-testing-bs7671">
              Insulation Resistance Testing BS 7671
            </SEOInternalLink>
          </div>
        </div>
      </section>

      <SEOCTASection
        heading="Write better EICR observations"
        subheading="Join 1,000+ UK electricians producing professional, consistent EICRs. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
