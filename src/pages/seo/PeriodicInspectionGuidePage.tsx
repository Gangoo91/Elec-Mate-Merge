import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ClipboardCheck,
  CheckCircle,
  AlertTriangle,
  Activity,
  Gauge,
  ShieldCheck,
  GraduationCap,
  Mic,
  ListOrdered,
  Search,
  Camera,
  Receipt,
  Brain,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing', href: '/guides/testing-sequence-guide' },
  { label: 'Periodic Inspection', href: '/guides/periodic-inspection' },
];

const tocItems = [
  { id: 'what-is-periodic', label: 'What Is a Periodic Inspection?' },
  { id: 'when-required', label: 'When Is It Required?' },
  { id: 'inspection-intervals', label: 'Recommended Inspection Intervals' },
  { id: 'test-differences', label: 'How Testing Differs from Initial Verification' },
  { id: 'sampling', label: 'Sampling: How Much to Test' },
  { id: 'limitations', label: 'Limitations on the Inspection' },
  { id: 'eicr-reporting', label: 'EICR Reporting and Observation Codes' },
  { id: 'workflow', label: 'The Efficient Periodic Inspection Workflow' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Periodic inspection assesses the condition of an existing electrical installation and results in an Electrical Installation Condition Report (EICR).',
  'Unlike initial verification, periodic inspection allows sampling of similar circuits — but if any sample fails, testing must be extended to all circuits of that type.',
  'The inspector must note all limitations (areas that could not be inspected or tested) on the EICR and explain why.',
  'Observation codes C1 (Danger Present), C2 (Potentially Dangerous), C3 (Improvement Recommended), and FI (Further Investigation) classify every defect.',
  'Elec-Mate streamlines the EICR workflow: AI board scanner, voice test entry, automatic defect code suggestion, remedial quoting, and instant PDF delivery.',
];

const faqs = [
  {
    question: 'How often should a periodic inspection be carried out?',
    answer:
      'BS 7671 does not mandate a specific interval — the recommended interval depends on the type of installation. IET Guidance Note 3 (GN3) provides the following general recommendations: domestic properties every 10 years (or at change of occupancy), commercial properties every 5 years, industrial installations every 3 years, special installations (such as swimming pools, agricultural, or caravan parks) every 1 to 3 years, and landlord-rented properties every 5 years (as mandated by the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020). The inspector may recommend a shorter interval based on the condition of the installation — for example, 3 years for a domestic property with ageing wiring that is showing signs of deterioration. The recommended next inspection date is recorded on the EICR itself.',
  },
  {
    question: 'What is the difference between an EICR and an EIC?',
    answer:
      'An Electrical Installation Condition Report (EICR) is issued following a periodic inspection of an existing installation. It assesses the condition of the installation and reports on any defects, using observation codes (C1, C2, C3, FI). An Electrical Installation Certificate (EIC) is issued following initial verification of a new or altered installation. It certifies that the work has been designed, constructed, and tested in compliance with BS 7671. The EICR is a condition assessment of what exists; the EIC is a certification that new work complies. You cannot issue an EIC for a periodic inspection, and you cannot issue an EICR for new work. Each has its own model form in Appendix 6 of BS 7671.',
  },
  {
    question: 'Can I sample circuits during a periodic inspection?',
    answer:
      'Yes. BS 7671 Regulation 650.3 allows representative sampling during periodic inspection. GN3 recommends a minimum sample size of 10% of each type of similar circuit (for example, 10% of ring circuits, 10% of lighting circuits). If any sample fails, the scope must be extended — GN3 suggests increasing to 100% of circuits of that type to determine the extent of the defect. Certain tests must be carried out on every circuit regardless of sampling: earth fault loop impedance (Zs), RCD operation (where fitted), and polarity verification. The decision to sample and the extent of sampling should be recorded on the EICR along with a justification. Sampling is not appropriate if the installation is in poor condition or if significant defects are already apparent — in those cases, 100% testing should be carried out.',
  },
  {
    question: 'What do the EICR observation codes mean?',
    answer:
      'The EICR uses four observation codes to classify defects. C1 (Danger Present) means an immediate risk of injury exists — the inspector should make the installation safe before leaving (for example, isolating a dangerous circuit). C2 (Potentially Dangerous) means a defect that could become dangerous and requires remedial action. C3 (Improvement Recommended) means the installation does not meet the current edition of BS 7671 but is not dangerous — these are advisory. FI (Further Investigation) means the inspector could not fully assess a part of the installation and further investigation is needed to determine if a defect exists. An EICR is classified as Unsatisfactory if any C1 or C2 codes are recorded. C3 and FI codes alone do not make the report Unsatisfactory. See the observation codes guide for detailed examples of each code.',
  },
  {
    question: 'Do I need to isolate the supply during a periodic inspection?',
    answer:
      'Yes, for dead tests. Dead tests (continuity and insulation resistance) require the circuit to be isolated. In practice, the electrician isolates each circuit in turn at the distribution board, performs the dead tests, then re-energises the circuit for live tests. For occupied properties, this means the power to individual circuits is off for short periods (typically 10 to 20 minutes per circuit). The inspector should advise the occupier in advance that the power will be interrupted. For properties with essential loads (medical equipment, servers, security systems), the inspector must plan the testing to minimise disruption and may need to arrange the inspection for a time when the load can be safely interrupted. The whole installation does not need to be switched off at once — circuits can be tested individually.',
  },
  {
    question: 'Who should receive a copy of the EICR?',
    answer:
      'The person ordering the inspection (the client) should receive the original EICR. The inspector should retain a copy. For privately rented properties, the landlord must provide a copy to tenants before they move in (for new tenancies) or within 28 days of the inspection (for existing tenancies), and to the local authority within 7 days of a written request. For commercial properties, the EICR should be available for inspection by the Health and Safety Executive (HSE), the local fire authority, or the building insurers. Many insurance policies require a current EICR as a condition of cover. In practice, providing the EICR as a digital PDF — emailed or shared via WhatsApp — is now standard and is accepted by all regulatory bodies.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanning, voice entry, and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'In-depth guide to C1, C2, C3, and FI classification codes with real examples.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/initial-verification',
    title: 'Initial Verification Guide',
    description:
      'How initial verification differs from periodic inspection — 100% testing, EIC certification.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Full Testing Sequence',
    description: 'The complete dead and live test sequence in the order required by BS 7671.',
    icon: ListOrdered,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Legal requirements, penalties, and deadlines for landlord EICRs under the 2020 Regulations.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with 50+ structured courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-periodic',
    heading: 'What Is a Periodic Inspection?',
    content: (
      <>
        <p>
          A periodic inspection is a systematic examination and testing of an existing electrical
          installation to assess its condition and safety. Unlike{' '}
          <SEOInternalLink href="/guides/initial-verification">
            initial verification
          </SEOInternalLink>{' '}
          (which certifies new work), a periodic inspection evaluates an installation that is
          already in service — often one that has been in use for years or decades.
        </p>
        <p>
          The purpose is to identify any defects, deterioration, or non-compliance that could pose a
          risk of electric shock, fire, or injury. Electrical installations age, components degrade,
          connections loosen, and insulation breaks down over time. A periodic inspection catches
          these issues before they become dangerous.
        </p>
        <p>
          The outcome of a periodic inspection is an Electrical Installation Condition Report (EICR)
          — a standardised document that records the condition of the installation, lists all
          observations and defects with classification codes, and gives an overall assessment of
          Satisfactory or Unsatisfactory. The EICR model form is specified in Appendix 6 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>.
        </p>
        <p>
          Periodic inspection and testing is covered by Chapter 65 of BS 7671 (which replaced the
          former Chapter 62 in the 18th Edition) and is supported by GN3 (Guidance Note 3:
          Inspection and Testing, 9th Edition).
        </p>
      </>
    ),
  },
  {
    id: 'when-required',
    heading: 'When Is a Periodic Inspection Required?',
    content: (
      <>
        <p>A periodic inspection should be carried out:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At regular intervals.</strong> The recommended interval depends on the type
                of installation (see below). The interval is recorded on the previous EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At change of occupancy.</strong> When a property changes hands (sale) or
                changes tenant, a new EICR confirms the installation is safe for the incoming
                occupier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  For{' '}
                  <SEOInternalLink href="/guides/eicr-for-landlords">
                    landlord compliance
                  </SEOInternalLink>
                  .
                </strong>{' '}
                The Electrical Safety Standards in the Private Rented Sector (England) Regulations
                2020 mandate an EICR for all privately rented properties at least every 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>For insurance requirements.</strong> Many property insurers require a
                current EICR as a condition of cover. An out-of-date or missing EICR may void the
                insurance policy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After damage or suspected fault.</strong> Following a flood, fire, lightning
                strike, or any event that may have damaged the electrical installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>For employer obligations.</strong> Under the Electricity at Work Regulations
                1989, employers must maintain electrical systems at work in a safe condition.
                Regular periodic inspection is the primary method of demonstrating compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'inspection-intervals',
    heading: 'Recommended Inspection Intervals',
    content: (
      <>
        <p>
          IET Guidance Note 3 provides the following general recommendations for maximum intervals
          between periodic inspections:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic dwellings:</strong> 10 years (or at change of occupancy).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented (landlord) properties:</strong> 5 years (mandatory under the
                2020 Regulations in England).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial premises:</strong> 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial installations:</strong> 3 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hospitals, medical locations:</strong> 1 year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Swimming pools:</strong> 1 year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Caravan parks, marinas:</strong> 1 to 3 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction sites:</strong> 3 months.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These are maximum recommended intervals. The inspector may specify a shorter interval
          based on the condition of the installation, the environment, and the type of use. If the
          installation is in poor condition, a 3-year or even 1-year interval may be appropriate
          regardless of the installation type.
        </p>
      </>
    ),
  },
  {
    id: 'test-differences',
    heading: 'How Testing Differs from Initial Verification',
    content: (
      <>
        <p>
          The core test sequence is the same for periodic inspection as for initial verification:
          dead tests first, live tests second. However, there are important practical differences:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The installation is already in service.</strong> You are testing an
                energised, occupied installation — not a new installation waiting for first
                energisation. This means you must plan around occupants, essential loads, and the
                need to minimise supply disruption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sampling is permitted.</strong> Unlike initial verification (which requires
                100% testing), periodic inspection allows sampling of similar circuits. See the
                sampling section below.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limitations are expected.</strong> There will often be parts of the
                installation that cannot be inspected or tested — for example, cables concealed in
                walls, inaccessible junction boxes, or circuits that cannot be isolated. These must
                be recorded as limitations on the EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You assess against the current edition.</strong> The installation may have
                been installed under a previous edition of BS 7671. You assess its condition against
                the current edition, but non-compliance with current regulations is not
                automatically a defect — it may be a C3 (Improvement Recommended) unless the
                non-compliance creates a safety risk.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/dead-vs-live-testing">
            dead-before-live sequence
          </SEOInternalLink>{' '}
          still applies: isolate each circuit, perform dead tests, re-energise, perform live tests.
          In practice, many inspectors batch the work — isolate a group of circuits, perform all
          dead tests on that group, then re-energise and do all live tests.
        </p>
      </>
    ),
  },
  {
    id: 'sampling',
    heading: 'Sampling: How Much Do You Need to Test?',
    content: (
      <>
        <p>
          Sampling is one of the key differences between periodic inspection and initial
          verification. BS 7671 Regulation 650.3 allows representative sampling during periodic
          inspection. GN3 provides the detailed guidance:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum sample size:</strong> 10% of each type of similar circuit. For a
                property with 10 ring circuits, test at least 1 in full. For 5 lighting circuits,
                test at least 1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If the sample fails:</strong> Extend the sample. GN3 recommends increasing
                to 100% if defects are found in the sample. In practice, many inspectors double the
                sample size first, and go to 100% if defects persist.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tests that cannot be sampled:</strong> Earth fault loop impedance (Zs), RCD
                operation, and polarity must be tested on every circuit regardless of sampling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record the sampling approach:</strong> Note on the EICR which circuits were
                sampled and the justification for the sample size.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-white">
              <strong>Practical tip:</strong> For a typical domestic property with 6 to 10 circuits,
              100% testing is usually faster than deciding which circuits to sample. Sampling is
              most useful on larger commercial or industrial installations with dozens of similar
              circuits (for example, 50 identical lighting circuits in an office building).
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'limitations',
    heading: 'Recording Limitations on the EICR',
    content: (
      <>
        <p>
          Every periodic inspection has limitations — areas that could not be fully inspected or
          tested. This is normal and expected. The key is to record every limitation clearly on the
          EICR so the client understands what was and was not covered.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Common Limitations</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Concealed wiring could not be inspected without damaging decorative finishes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Loft space not accessible due to no fixed ladder or flooring.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Certain circuits could not be isolated due to essential equipment (medical, IT).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Consumer unit cover could not be removed safely (live parts exposed on removal).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                External wiring or outbuilding supply could not be accessed (locked, obstructed).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Limitations should be agreed with the client before the inspection begins, where possible.
          If additional limitations become apparent during the inspection (for example, a junction
          box is discovered inside a ceiling void that cannot be reached), add them to the EICR and
          explain to the client.
        </p>
        <p>
          The EICR includes a dedicated limitations section. Each limitation should describe what
          could not be inspected or tested, where it is located, and why it was not possible. An FI
          (Further Investigation) code may be used where the limitation means a potential defect
          could not be confirmed or ruled out.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-reporting',
    heading: 'EICR Reporting and Observation Codes',
    content: (
      <>
        <p>
          The EICR records every defect and observation using the standard classification codes from
          BS 7671:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">C1 — Danger Present</h4>
                <p className="text-white text-sm leading-relaxed">
                  An immediate risk of injury. The inspector must make the installation safe before
                  leaving — for example, by isolating a dangerous circuit. Examples: exposed live
                  conductors, missing enclosure covers, arcing connections.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-orange-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">C2 — Potentially Dangerous</h4>
                <p className="text-white text-sm leading-relaxed">
                  A defect that could become dangerous and requires remedial action. Examples: no
                  RCD protection on socket circuits, Zs values exceeding maximum permitted, missing
                  bonding conductors.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">C3 — Improvement Recommended</h4>
                <p className="text-white text-sm leading-relaxed">
                  The installation does not meet the current edition of BS 7671 but is not
                  dangerous. Advisory only — no mandatory remedial action. Examples: no
                  supplementary bonding in a bathroom (where main bonding and RCD protection are
                  adequate), lack of SPD protection (now recommended by Amendment 2).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">FI — Further Investigation</h4>
                <p className="text-white text-sm leading-relaxed">
                  The inspector could not fully assess this item. Further investigation is needed.
                  Examples: insulation resistance marginally low but reason unclear, suspected
                  damage to concealed cable, unusual test result requiring specialist investigation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          An EICR is classified as <strong>Unsatisfactory</strong> if any C1 or C2 codes are
          recorded. C3 and FI codes alone do not make the report Unsatisfactory. See the{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation codes guide
          </SEOInternalLink>{' '}
          for detailed examples and guidance on choosing between C2 and C3.
        </p>
        <SEOAppBridge
          title="AI suggests the right observation code"
          description="Describe a defect in plain English — 'no RCD on socket circuit in bathroom' — and Elec-Mate's AI returns the correct observation code with the matching BS 7671 regulation number. No second-guessing between C2 and C3."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'workflow',
    heading: 'The Efficient Periodic Inspection Workflow',
    content: (
      <>
        <p>
          A periodic inspection can be time-consuming if the workflow is not organised. Here is how
          Elec-Mate helps you complete EICRs faster without cutting corners:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the consumer unit. Elec-Mate reads MCB/RCBO ratings, circuit
                  references, and board details from the image. The schedule of test results
                  pre-fills with circuit descriptions and protective device ratings.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Mic className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Voice Test Entry</h4>
                <p className="text-white text-sm leading-relaxed">
                  Speak your readings as you take them. "Ring 1, R1+R2 0.32, IR 200 megohms, Zs
                  0.89, RCD 18 milliseconds." The schedule fills in while your hands stay on the
                  test leads. No putting instruments down to type.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. AI Defect Code Suggestion</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe any defect in plain English. The AI returns the correct observation code
                  (C1, C2, C3, or FI) with the matching BS 7671 regulation number. Automatically
                  compares test results against maximum values and flags failures.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. Remedial Estimator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every C1, C2, and FI observation feeds into the remedial works estimator. It
                  prices each fix — materials, labour, margin — and generates a professional quote.
                  Hand the client the EICR and the remedial quote in the same visit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The completed <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>{' '}
          exports as a professional PDF. Send it to the client by email or WhatsApp before you leave
          site. No going home to type up the report. No desk time. No chasing.
        </p>
        <SEOAppBridge
          title="Complete EICRs in half the time"
          description="AI board scanner, voice test entry, automatic defect coding, and remedial quoting — all in one app. Join 430+ UK electricians using Elec-Mate for periodic inspection. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PeriodicInspectionGuidePage() {
  return (
    <GuideTemplate
      title="Periodic Inspection Guide | EICR Testing Procedure"
      description="Complete guide to periodic inspection and EICR testing procedure. When required, inspection intervals, test sequence differences from initial verification, sampling guidance, limitations, observation codes, and reporting."
      datePublished="2025-09-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Periodic Inspection:{' '}
          <span className="text-yellow-400">The EICR Testing Procedure Explained</span>
        </>
      }
      heroSubtitle="Periodic inspection assesses whether an existing electrical installation is safe for continued use. The result is an EICR — the most common certificate UK electricians produce. This guide covers the full procedure: when to inspect, how much to test, how to record limitations, and how to classify defects."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Periodic Inspection"
      relatedPages={relatedPages}
      ctaHeading="Produce Professional EICRs on Your Phone"
      ctaSubheading="Elec-Mate streamlines periodic inspection — AI board scanner, voice test entry, automatic defect coding, remedial quoting, and instant PDF delivery. 7-day free trial, cancel anytime."
    />
  );
}
