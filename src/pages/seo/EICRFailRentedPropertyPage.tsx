import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Clock,
  Scale,
  FileCheck2,
  ShieldCheck,
  Home,
  Search,
  PoundSterling,
  ClipboardCheck,
  GraduationCap,
  Receipt,
  Send,
  Wrench,
  Building2,
  Users,
  MessageSquare,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EICR Fail Rented', href: '/guides/eicr-fail-rented-property' },
];

const tocItems = [
  { id: 'what-happens-eicr-fail', label: 'What Happens When an EICR Fails' },
  { id: 'c1-vs-c2-defects', label: 'C1 vs C2 Defects: Prioritising Work' },
  { id: 'landlord-obligations', label: "Landlord's Legal Obligations" },
  { id: '28-day-deadline', label: 'The 28-Day Remedial Deadline' },
  { id: 'getting-remedial-quotes', label: 'Getting Quotes for Remedial Work' },
  { id: 'choosing-electrician', label: 'Choosing an Electrician for Remedials' },
  { id: 're-inspection', label: 'Re-Inspection Requirements' },
  { id: 'local-authority-enforcement', label: 'Local Authority Enforcement' },
  { id: 'what-tenants-should-do', label: 'What Tenants Should Do' },
  { id: 'insurance-implications', label: 'Insurance Implications' },
  { id: 'for-electricians', label: 'For Electricians: Turning Fails into Revenue' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An EICR is classified as Unsatisfactory when the inspector records any C1 (Danger Present) or C2 (Potentially Dangerous) observation codes — this triggers mandatory remedial action by the landlord.',
  'Landlords have 28 days from the date of the inspection to complete all remedial work, though C1 defects require immediate action — the inspector should make C1 faults safe before leaving the property.',
  'After remedial work is completed, written confirmation from a qualified electrician must be provided to the tenant within 28 days and to the local authority within 7 days of a written request.',
  'Local authorities can issue civil penalties of up to £30,000 per breach for non-compliance with the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.',
  'Elec-Mate auto-flags unsatisfactory reports and its remedial estimator prices every defect instantly — the electrician can hand the landlord the EICR and a quote for the fix in one visit.',
];

const faqs = [
  {
    question: 'What does it mean when an EICR fails?',
    answer:
      'When an EICR "fails," it means the overall assessment is Unsatisfactory. This happens when the inspector records one or more C1 (Danger Present) or C2 (Potentially Dangerous) observation codes. A C1 defect means there is an immediate risk of injury — for example, exposed live parts, missing earthing connections, or a circuit with no protective device. The inspector should make C1 defects safe before leaving the property, typically by isolating the affected circuit or fitting a temporary protective measure. A C2 defect means there is a potential risk of injury — for example, a lack of RCD protection on socket circuits, undersized cables without appropriate protection, or deteriorated insulation that has not yet failed but is likely to in the foreseeable future. C3 (Improvement Recommended) observations do not cause the report to fail — they are advisory, indicating areas where the installation does not meet the current edition of BS 7671 but is not dangerous. FI (Further Investigation) codes indicate areas where the inspector could not fully assess the installation and further investigation is needed.',
  },
  {
    question: 'Does the landlord have to fix C3 observations?',
    answer:
      'C3 (Improvement Recommended) observations do not make the EICR Unsatisfactory, and there is no legal obligation to address them under the 2020 Regulations. However, there are good reasons to consider doing so. C3 observations indicate areas where the installation does not comply with the current edition of BS 7671 — while not dangerous now, they may deteriorate into C2 (Potentially Dangerous) issues over time as the installation ages. Addressing C3 items during a scheduled visit is often more cost-effective than waiting for them to become mandatory remedial work at the next inspection. Common C3 observations include the absence of RCD protection on circuits installed before RCDs were mandatory, the lack of supplementary bonding where it was previously required but is no longer mandatory under current regulations (provided conditions are met), and the absence of AFDDs (Arc Fault Detection Devices) which are recommended but not yet mandatory for most existing installations. A pragmatic landlord addresses C3 items opportunistically — for example, when the consumer unit is being upgraded for C1 or C2 remedials, adding RCD protection for all circuits at the same time.',
  },
  {
    question: 'Can the landlord choose any electrician for remedial work?',
    answer:
      'Yes, the landlord can choose any qualified and competent electrician for the remedial work — it does not have to be the same electrician who carried out the EICR. However, the person carrying out the remedial work must be competent and should be registered with a competent person scheme (NICEIC, NAPIT, or ELECSA). The remedial work itself must comply with BS 7671 and, if it involves notifiable work under Part P (for example, a consumer unit replacement or new circuit), it must be either self-certified by a registered electrician or notified to Building Control. After completing the remedial work, the electrician should issue the appropriate certificate — an Electrical Installation Certificate (EIC) for new installation work, a Minor Works Certificate for smaller alterations, or a written confirmation that the specific defects identified on the EICR have been satisfactorily addressed. The landlord should keep this documentation as evidence of compliance. In practice, many landlords ask the original EICR inspector to also carry out the remedial work, which simplifies the process — the inspector already knows the installation, has identified the defects, and can verify the repairs directly.',
  },
  {
    question: 'What if the remedial work cannot be completed within 28 days?',
    answer:
      'The 2020 Regulations require remedial work to be completed within 28 days of the date of the inspection (not the date the landlord receives the report). If the work genuinely cannot be completed within 28 days — for example, a full consumer unit replacement that requires specific equipment to be ordered, or a partial rewire that requires coordination with other trades — the landlord should take proactive steps to protect their position. First, document why the 28-day deadline cannot be met and what steps are being taken. Second, ensure C1 defects have been made safe immediately (the inspector should have done this at the time of the inspection). Third, arrange the remedial work as soon as practicable and keep evidence of having done so — quotes, order confirmations, scheduled appointments. Fourth, if the local authority contacts you, provide evidence of the steps you are taking. While the Regulations specify 28 days, local authorities have discretion in how they enforce. A landlord who can demonstrate genuine effort and rapid progress is less likely to face the full penalty than one who has simply ignored the report. That said, the 28-day clock is real, and landlords should treat it with urgency.',
  },
  {
    question: 'Can a tenant refuse access for remedial electrical work?',
    answer:
      'This is a common practical problem. The landlord has a legal obligation to carry out remedial work, but the tenant has a right to quiet enjoyment of the property. In most cases, the tenancy agreement includes a clause allowing the landlord access for repairs and maintenance with reasonable notice (typically 24 to 48 hours). The landlord should give written notice, explain that the work is legally required for electrical safety, and offer reasonable appointment times. If the tenant still refuses access, the landlord should document all attempts to arrange access and keep copies of all communications. In extreme cases, the landlord may need to seek a court order for access. The key point for landlords is that being unable to gain access does not remove the legal obligation — you must be able to demonstrate that you have made every reasonable effort to arrange the work. Keep detailed records of all correspondence, attempted appointments, and any reasons given by the tenant for refusal. If the local authority investigates, this evidence will be crucial in showing that the delay is not due to the landlord ignoring the requirement.',
  },
  {
    question: 'Does a failed EICR affect the landlord insurance?',
    answer:
      'An unsatisfactory EICR can have significant insurance implications for landlords. Most landlord insurance policies include a condition that the property must be maintained in a safe condition and comply with all relevant safety regulations. An unsatisfactory EICR — particularly one with C1 (Danger Present) defects — is evidence that the electrical installation is not safe. If the landlord fails to carry out the remedial work and an incident occurs (fire, electric shock, injury), the insurer may refuse to pay the claim on the grounds that the landlord knew about the defect and failed to act. This applies to both buildings insurance and landlord liability insurance. Even C2 defects that are not remedied could give the insurer grounds to dispute a claim. The practical advice is straightforward: when you receive an unsatisfactory EICR, arrange the remedial work immediately and keep evidence of completion. Notify your insurer if required by your policy. Do not wait for the 28-day deadline to approach — the sooner the defects are fixed, the sooner the insurance risk is resolved.',
  },
  {
    question: 'What evidence does the landlord need to keep after remedial work?',
    answer:
      'After remedial work is completed, the landlord needs to keep a clear paper trail. The essential documents are: (1) the original unsatisfactory EICR identifying the defects, (2) written confirmation from the electrician who carried out the remedial work that the defects have been satisfactorily addressed — this should reference the specific observation numbers from the EICR, (3) any Electrical Installation Certificates (EICs) or Minor Works Certificates issued for the remedial work, (4) invoices and payment records for the remedial work, and (5) copies of any communications with the tenant about the remedial work and access arrangements. Under the 2020 Regulations, the landlord must provide written confirmation of the remedial work to the tenant within 28 days of the work being completed, and to the local authority within 7 days of a written request. Keep all of these documents together in a property file — digital copies are acceptable and often more practical. Elec-Mate stores all certificates digitally, making it easy for electricians to send the EICR, remedial certificates, and confirmation letters to landlords in one package.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements — legal obligations, penalties, timeframes, and compliance.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'In-depth guide to C1, C2, C3, and FI codes with real examples and classification guidance.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/unsatisfactory-eicr',
    title: 'Unsatisfactory EICR Guide',
    description:
      'What makes an EICR unsatisfactory, what the codes mean, and what must happen next.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK 2026',
    description:
      'Average EICR prices by property type, what to charge, and how to price remedial work.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/hmo-electrical-requirements',
    title: 'HMO Electrical Requirements',
    description:
      'Electrical compliance for HMOs — EICR, fire alarm, emergency lighting, and licensing requirements.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-change-guide',
    title: 'Consumer Unit Change Guide',
    description:
      'Step-by-step guide to consumer unit replacement — the most common remedial job from an unsatisfactory EICR.',
    icon: Wrench,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-happens-eicr-fail',
    heading: 'What Happens When an EICR Fails on a Rented Property',
    content: (
      <>
        <p>
          When an electrician completes an{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">
            EICR on a rented property
          </SEOInternalLink>{' '}
          and the overall assessment is <strong>Unsatisfactory</strong>, it triggers a specific
          chain of legal obligations for the landlord under the Electrical Safety Standards in the
          Private Rented Sector (England) Regulations 2020.
        </p>
        <p>
          An EICR is classified as Unsatisfactory when the inspector records one or more{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            C1 (Danger Present) or C2 (Potentially Dangerous) observation codes
          </SEOInternalLink>
          . These codes indicate defects in the electrical installation that pose a risk of injury
          to the occupants. The landlord cannot ignore an unsatisfactory result — the law requires
          specific action within specific timeframes.
        </p>
        <p>
          This guide explains exactly what happens next: the landlord's obligations, the deadlines,
          how to prioritise defects, how to get the remedial work done, what evidence is needed, and
          what enforcement powers the local authority has. If you are a landlord who has received an
          unsatisfactory EICR, or an electrician who regularly carries out landlord EICRs, this
          guide covers everything you need to know.
        </p>
      </>
    ),
  },
  {
    id: 'c1-vs-c2-defects',
    heading: 'C1 vs C2 Defects: Understanding and Prioritising',
    content: (
      <>
        <p>
          Not all defects on an unsatisfactory EICR carry the same urgency. Understanding the
          difference between C1 and C2 codes is essential for prioritising the remedial work:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C1 — Danger Present</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                A C1 code means there is an <strong>immediate risk of injury</strong>. The defect is
                dangerous right now, not at some point in the future. Examples include:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Exposed live conductors accessible to touch</li>
                <li>Missing or damaged earthing connections</li>
                <li>No protective device on a circuit (unfused spur, missing MCB)</li>
                <li>Severely damaged or overheating cables</li>
                <li>Water ingress into live electrical equipment</li>
              </ul>
              <p>
                <strong>Action required:</strong> Immediate. The inspector should make C1 defects
                safe before leaving the property — typically by isolating the affected circuit,
                fitting a temporary protective measure, or disconnecting the dangerous equipment.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                A C2 code means there is a <strong>potential risk of injury</strong>. The defect is
                not immediately dangerous but could become so under fault conditions or over time.
                Examples include:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>No RCD protection on socket circuits</li>
                <li>Undersized cables without appropriate protection</li>
                <li>Deteriorated insulation (low insulation resistance readings)</li>
                <li>Incorrect polarity on some circuits</li>
                <li>
                  Inadequate earthing arrangements (high earth loop impedance but not immediately
                  dangerous)
                </li>
              </ul>
              <p>
                <strong>Action required:</strong> Within 28 days of the inspection date. Remedial
                work must be arranged and completed within this timeframe.
              </p>
            </div>
          </div>
        </div>
        <p>
          The inspector may also record <strong>FI (Further Investigation)</strong> codes, which
          indicate that part of the installation could not be fully assessed and requires further
          investigation. FI codes should be treated with urgency — until the further investigation
          is complete, the true condition of that part of the installation is unknown and could
          potentially be dangerous.
        </p>
        <p>
          C3 (Improvement Recommended) observations do not make the EICR unsatisfactory and do not
          require mandatory action. However, they indicate areas that do not comply with the current
          edition of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> and
          may be worth addressing during the remedial visit to avoid them becoming C2 issues at the
          next inspection.
        </p>
      </>
    ),
  },
  {
    id: 'landlord-obligations',
    heading: "Landlord's Legal Obligations After an Unsatisfactory EICR",
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          place clear obligations on landlords when an EICR returns an unsatisfactory result:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arrange remedial work</strong> — the landlord must instruct a qualified
                electrician to carry out the remedial work identified in the EICR. All C1 and C2
                defects must be addressed. The electrician carrying out the remedials must be
                competent and ideally registered with a competent person scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete work within 28 days</strong> — the remedial work must be finished
                within 28 days of the date of the EICR inspection. For C1 defects, the inspector
                should have already made the installation safe as a temporary measure — the
                permanent fix must follow within 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Obtain written confirmation</strong> — after the remedial work is completed,
                a qualified person must confirm in writing that the identified defects have been
                satisfactorily addressed. This may be the same electrician who did the remedials or
                a different qualified person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide confirmation to the tenant</strong> — the landlord must supply the
                written confirmation of remedial work to the tenant within 28 days of the work being
                completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide confirmation to the local authority</strong> — if the local
                authority requests it in writing, the landlord must provide the written confirmation
                within 7 days.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These obligations are not optional — they are legal requirements with significant
          penalties for non-compliance. A landlord who receives an unsatisfactory EICR should act
          immediately, not wait until the 28-day deadline approaches.
        </p>
      </>
    ),
  },
  {
    id: '28-day-deadline',
    heading: 'The 28-Day Remedial Deadline',
    content: (
      <>
        <p>
          The 28-day deadline is one of the most critical aspects of the 2020 Regulations. It starts
          from the <strong>date of the inspection</strong>, not the date the landlord receives the
          report. This means that if the electrician completes the EICR on 1 March and posts the
          report to the landlord, who receives it on 5 March, the landlord has until 29 March (not 2
          April) to complete the remedial work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4 text-white">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Day 0:</strong> EICR inspection carried out. Inspector records C1 and/or C2
                defects. C1 defects are made safe immediately. Report is prepared.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Days 1 to 7:</strong> Report delivered to landlord. Landlord reviews the
                observations and contacts an electrician for remedial work. This is where immediate
                action matters — waiting a week to read the report uses up 25% of the deadline.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Days 7 to 21:</strong> Electrician visits to carry out remedial work. If
                materials need ordering (specialist consumer units, specific cable sizes, AFDDs),
                factor in delivery time.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Day 28:</strong> Deadline. All remedial work must be completed and written
                confirmation obtained from a qualified person.
              </span>
            </div>
          </div>
        </div>
        <p>
          This is why having the EICR and a remedial quote ready on the same day is so valuable.
          When the electrician who carries out the EICR also provides a priced remedial quote before
          leaving the property, the landlord can approve the work immediately. The electrician can
          often schedule the remedials within days, well inside the 28-day deadline.
        </p>
        <SEOAppBridge
          title="EICR and remedial quote in one visit"
          description="Elec-Mate auto-flags unsatisfactory reports and its remedial estimator prices every C1, C2, and FI defect instantly. Hand the landlord the EICR and a priced quote for the fix before you leave the property. No second trip."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'getting-remedial-quotes',
    heading: 'Getting Quotes for Remedial Work',
    content: (
      <>
        <p>
          When a landlord receives an unsatisfactory EICR, they need to move quickly to get the
          remedial work quoted and scheduled. Here is practical advice for both landlords and
          electricians:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask the original inspector first</strong> — the electrician who carried out
                the EICR already knows the installation, has identified the defects, and can provide
                the most accurate remedial quote. They can often schedule the work soonest because
                they do not need a separate assessment visit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get a written, itemised quote</strong> — the quote should list each defect
                from the EICR, the proposed remedial action, the materials required, and the cost.
                This gives the landlord transparency and makes it easy to compare with other quotes
                if needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consider bundling C3 improvements</strong> — while C3 observations are not
                mandatory, addressing them during the same visit as C1/C2 remedials is more
                cost-effective than a separate visit later. A good electrician will advise on which
                C3 items are worth doing now.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Factor in the 28-day deadline</strong> — the cheapest quote is not helpful
                if the electrician cannot schedule the work within the deadline. Availability and
                speed matter as much as price. A slightly more expensive electrician who can start
                next week is a better choice than a cheaper one who is booked up for 6 weeks.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Common remedial jobs and approximate costs (2026 prices, excluding VAT) include: fitting{' '}
          <SEOInternalLink href="/guides/rcd-types-explained">RCD protection</SEOInternalLink> to
          unprotected circuits (£150 to £400 depending on method),{' '}
          <SEOInternalLink href="/guides/consumer-unit-change-guide">
            consumer unit replacement
          </SEOInternalLink>{' '}
          with RCBOs and SPD (£500 to £1,000), replacing deteriorated cable on a single circuit
          (£200 to £600), replacing damaged accessories (£30 to £100 per point), and improving
          earthing or bonding connections (£100 to £300). See the{' '}
          <SEOInternalLink href="/guides/eicr-cost-uk">EICR cost guide</SEOInternalLink> for more
          detailed pricing by property type.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-electrician',
    heading: 'Choosing an Electrician for Remedial Work',
    content: (
      <>
        <p>
          The electrician carrying out the remedial work must be competent and should be registered
          with a competent person scheme. Here is what to look for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — NICEIC, NAPIT, or ELECSA.
                This is essential if the remedial work involves notifiable work under Part P (for
                example, a{' '}
                <SEOInternalLink href="/guides/consumer-unit-change-guide">
                  consumer unit replacement
                </SEOInternalLink>
                ).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C&G 2391 or equivalent</strong> — the inspection and testing qualification.
                Important because the electrician needs to verify that the remedial work has
                resolved the defects identified in the EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — at least £2 million for domestic
                remedial work. Check the certificate is current and covers the type of work being
                carried out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ability to provide the right certificates</strong> — the remedial work
                should result in the appropriate electrical certificate (EIC for major work, Minor
                Works for smaller alterations) plus written confirmation that the specific EICR
                defects have been addressed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Avoid choosing an electrician solely on price. The cheapest quote may indicate corners
          being cut — and if the remedial work is not done properly, it will fail at the next EICR,
          costing the landlord more in the long run. Look for an electrician who can explain clearly
          what they will do for each defect, provide proper certification, and complete the work
          within the 28-day deadline.
        </p>
      </>
    ),
  },
  {
    id: 're-inspection',
    heading: 'Re-Inspection Requirements After Remedial Work',
    content: (
      <>
        <p>
          After remedial work is completed, the installation (or at least the parts that were
          remediated) must be inspected and tested to confirm the defects have been resolved. This
          involves:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing the remedial work</strong> — the electrician carrying out the
                remedials should test each repaired or replaced element. This includes continuity,
                insulation resistance, earth fault loop impedance, and RCD operation as appropriate.
                The test results should confirm that the installation now meets the requirements of
                BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Issuing the appropriate certificate</strong> — for new installation work
                (e.g., a consumer unit replacement), an Electrical Installation Certificate (EIC) is
                required. For smaller alterations (e.g., replacing a socket, adding RCD protection
                to an existing circuit), a Minor Works Certificate is appropriate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation</strong> — the qualified person must confirm in writing
                that the specific defects identified in the original EICR have been satisfactorily
                addressed. This can be a separate letter or can be noted on the certificate itself.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A full re-EICR is not automatically required after remedial work — the 2020 Regulations
          require written confirmation that the identified defects have been resolved, not a
          complete re-inspection. However, if the original EICR was close to its 5-year renewal
          date, or if the remedial work was extensive (for example, a full consumer unit replacement
          plus multiple circuit repairs), a fresh EICR may be advisable to provide a clean baseline
          for the next 5-year cycle.
        </p>
      </>
    ),
  },
  {
    id: 'local-authority-enforcement',
    heading: 'Local Authority Enforcement Powers',
    content: (
      <>
        <p>
          Local authorities in England have significant enforcement powers under the 2020
          Regulations. If a landlord fails to obtain an EICR, fails to carry out remedial work, or
          fails to provide the required documentation, the local authority can take the following
          actions:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Serve a remedial notice</strong> — requiring the landlord to arrange an
                inspection, carry out remedial work, or provide documentation within a specified
                period (typically 28 days).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carry out the work themselves</strong> — if the landlord fails to comply
                with a remedial notice, the local authority can arrange for a qualified electrician
                to carry out the inspection or remedial work and recover all costs from the
                landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Issue civil penalties of up to £30,000 per breach</strong> — this is per
                breach, not per property. A landlord who fails to obtain an EICR and also fails to
                carry out remedial work faces two separate penalties — potentially £60,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Issue urgent remedial notices</strong> — for C1 (Danger Present) defects,
                the local authority can require immediate action. Failure to comply can result in
                immediate enforcement action.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Local authorities are becoming increasingly proactive in enforcing the 2020 Regulations.
          Some authorities actively request copies of EICRs from landlords, particularly for HMOs
          and properties where other compliance issues have been identified. Tenant complaints about
          electrical safety are also a common trigger for local authority investigations.
        </p>
      </>
    ),
  },
  {
    id: 'what-tenants-should-do',
    heading: 'What Tenants Should Do If the EICR Fails',
    content: (
      <>
        <p>
          If you are a tenant and the EICR on your rented property has come back unsatisfactory,
          here is what you should know and what you can do:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You have a right to a copy of the EICR</strong> — the landlord must provide
                you with a copy within 28 days of the inspection. If they have not, ask for it in
                writing. If they refuse, contact your local authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 defects should have been made safe</strong> — the inspector should have
                made any C1 (Danger Present) defects safe before leaving the property. If you
                believe a dangerous defect has been left unaddressed, contact the landlord
                immediately and, if necessary, the local authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The landlord must arrange remedial work within 28 days</strong> — if the
                landlord does not arrange remedial work promptly, contact them in writing (email is
                fine) reminding them of their obligation. Keep copies of all correspondence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Allow reasonable access for repairs</strong> — the landlord needs access to
                the property to carry out the remedial work. Cooperate with reasonable access
                requests — refusing access delays the safety work and could complicate matters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contact the local authority if needed</strong> — if the landlord fails to
                act on an unsatisfactory EICR, you can report this to your local authority housing
                team. They have the power to serve remedial notices, carry out the work themselves,
                and issue financial penalties against the landlord.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In serious cases, tenants can also contact the HSE (Health and Safety Executive) or seek
          advice from Shelter, Citizens Advice, or a solicitor specialising in housing law. An
          unsatisfactory EICR is evidence of a safety issue, and tenants should not feel they have
          to accept a landlord's inaction.
        </p>
      </>
    ),
  },
  {
    id: 'insurance-implications',
    heading: 'Insurance Implications of a Failed EICR',
    content: (
      <>
        <p>
          An unsatisfactory EICR has real implications for both the landlord's insurance and their
          broader risk exposure. Insurance companies take electrical safety seriously, and a known
          defect that is not remedied can have significant consequences.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Claims may be refused</strong> — if an electrical incident occurs (fire,
                injury, damage) after an unsatisfactory EICR and the landlord has not carried out
                the remedial work, the insurer may refuse to pay the claim. The unsatisfactory EICR
                is evidence that the landlord knew about the defect and failed to act.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Policy conditions may be breached</strong> — most landlord insurance
                policies include conditions about maintaining the property in a safe condition and
                complying with all relevant regulations. An unremedied unsatisfactory EICR breaches
                both of these conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Premiums may increase</strong> — at renewal, if the insurer becomes aware of
                unremedied electrical defects (through a claim investigation, for example), the
                landlord may face higher premiums or difficulty obtaining cover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Personal liability</strong> — beyond insurance, a landlord who knowingly
                allows an unsafe electrical installation to remain in a rented property faces
                personal liability for any injury or damage caused. This liability is not limited to
                the value of the insurance policy.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The message for landlords is simple: fix it fast. The cost of remedial work is always less
          than the cost of an insurance claim refusal, a prosecution, or (worst case) a coroner's
          inquest. Arrange the remedial work immediately upon receiving an unsatisfactory EICR and
          keep evidence of everything.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Turning EICR Fails into Revenue',
    content: (
      <>
        <p>
          Every unsatisfactory EICR is a remedial work opportunity. The most efficient electricians
          convert EICR defects into priced remedial quotes on the same visit — before they leave the
          property. This benefits everyone: the landlord gets the quote immediately and can approve
          the work without delay, the electrician secures the remedial job without a second site
          visit, and the tenant gets the defects fixed faster.
        </p>
        <p>Elec-Mate makes this workflow seamless:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Auto-Flag Unsatisfactory Reports</h4>
                <p className="text-white text-sm leading-relaxed">
                  As you record observation codes during the EICR, Elec-Mate automatically flags the
                  report as Unsatisfactory when any C1 or C2 code is entered. No manual override
                  needed — the overall assessment is set correctly every time.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Remedial Estimator: Instant Pricing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every C1, C2, and FI observation feeds into the remedial works estimator. It
                  prices each fix — materials at trade rates, labour time, and your margin — and
                  generates a professional remedial quote. The landlord sees exactly what needs
                  fixing, why, and how much it costs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR + Quote + Invoice in One Tap</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send the completed EICR, the remedial quote, and the invoice for the inspection to
                  the landlord by email or WhatsApp before you leave the property. The landlord has
                  everything they need to approve the remedial work immediately. No second trip, no
                  desk time, no chasing.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          This workflow transforms every landlord EICR from a single inspection job into an
          inspection-plus-remedial package. You complete the EICR, generate the remedial quote, and
          send everything on site. The landlord approves the work. You schedule the remedials. You
          invoice for both. Efficient, professional, and profitable.
        </p>
        <SEOAppBridge
          title="Convert every EICR fail into a priced remedial job"
          description="Elec-Mate flags unsatisfactory EICRs automatically and prices every defect with the remedial estimator. Send the EICR, quote, and invoice to the landlord from site. 7-day free trial."
          icon={Receipt}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRFailRentedPropertyPage() {
  return (
    <GuideTemplate
      title="EICR Fail on Rented Property | Landlord Guide"
      description="What happens when an EICR fails on a rented property. Landlord obligations under the 2020 Regulations, 28-day remedial deadline, C1 vs C2 defects, getting quotes for remedial work, local authority enforcement, tenant rights, and insurance implications."
      datePublished="2025-07-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          EICR Fail on a Rented Property:{' '}
          <span className="text-yellow-400">What Landlords Must Do Next</span>
        </>
      }
      heroSubtitle="An unsatisfactory EICR means the electrical installation has defects that pose a risk of injury. The landlord has 28 days to complete remedial work. Penalties for non-compliance are up to £30,000. This guide covers obligations, deadlines, and how electricians can convert every fail into a priced remedial job."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICR Fails on Rented Properties"
      relatedPages={relatedPages}
      ctaHeading="Turn Every EICR Fail into Revenue"
      ctaSubheading="Auto-flag unsatisfactory reports. Price every defect instantly with the remedial estimator. Send the EICR, remedial quote, and invoice to the landlord before you leave the property. 7-day free trial."
    />
  );
}
