import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Building2,
  Zap,
  Search,
  Clock,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrician Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR Contractor Guide', href: '/eicr-contractor-guide' },
];

const tocItems = [
  { id: 'who-can-carry-out', label: 'Who Can Carry Out an EICR' },
  { id: 'qualifications', label: 'Required Qualifications: 2391 and 2394/2395' },
  { id: 'test-equipment', label: 'Correct Test Equipment' },
  { id: 'schedule-of-inspections', label: 'Schedule of Inspections and Tests' },
  { id: 'completing-correctly', label: 'Completing the EICR Correctly' },
  { id: 'common-mistakes', label: 'Common EICR Mistakes' },
  { id: 'elec-mate-eicr', label: 'Using Elec-Mate for EICRs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An EICR must be carried out by a "qualified and competent person" — in practice this means a fully qualified electrician who is registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or equivalent).',
  'The appropriate qualifications for EICR work are City and Guilds 2391 (Inspection and Testing) or the equivalent 2394 (Design and Verification of Electrical Installations) and 2395 (Inspection, Testing and Certification). The 18th Edition (C&G 2382) is also required.',
  'Test instruments must be calibrated and in good working order. Minimum required instruments include an MFT (Multi-Function Tester) capable of continuity, insulation resistance, polarity, earth fault loop impedance, and RCD testing.',
  'The EICR must include a Schedule of Inspections, a Schedule of Test Results, a list of observations with C1/C2/C3/FI classification, an overall assessment (Satisfactory or Unsatisfactory), and a recommended reinspection interval.',
  "Using Elec-Mate's EICR app, electricians can complete the full schedule of inspections and test results on site, classify observations, and export a compliant PDF — eliminating evening paperwork and reducing errors.",
  'Common EICR mistakes include insufficient sampling of test results, failing to test all accessible circuits, incorrect observation classification, and missing or incomplete schedule documentation.',
];

const faqs = [
  {
    question: 'Who is qualified to carry out an EICR in the UK?',
    answer:
      'An EICR must be carried out by a "qualified and competent person" under the Electrical Safety Standards Regulations 2020. In practice this means a fully qualified electrician who holds the appropriate inspection and testing qualification (City and Guilds 2391, or 2394/2395), a current 18th Edition BS 7671 qualification (C&G 2382), and is registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. Registration with a scheme provides independent verification of qualifications, insurance, and ongoing assessment.',
  },
  {
    question: 'What is the difference between City and Guilds 2391, 2394, and 2395?',
    answer:
      'City and Guilds 2391 (Inspection and Testing of Electrical Installations) was the traditional single qualification for EICR work. It has been largely superseded by two qualifications: 2394 (Design and Verification of Electrical Installations) and 2395 (Inspection, Testing and Certification of Electrical Installations). Holding both 2394 and 2395 is the current standard for electricians carrying out EICR work. The 2391 remains valid if held, but new entrants to the field should pursue the 2394/2395 pathway.',
  },
  {
    question: 'What test instruments do I need to carry out an EICR?',
    answer:
      'The minimum test instruments required for a domestic EICR are a Multi-Function Tester (MFT) capable of: earth continuity testing, insulation resistance testing (500V and 250V DC), polarity testing, earth fault loop impedance testing, and RCD trip-time and trip-current testing. The MFT must be calibrated and within its calibration period. A proving unit to verify the MFT is also advisable before each use. For commercial EICRs, additional instruments may be required depending on the installation.',
  },
  {
    question: 'How many circuits do I need to test during an EICR?',
    answer:
      "BS 7671 Section 634 requires periodic inspection and testing to be carried out using appropriate sampling. For a domestic property, a common approach is to test all circuits at the consumer unit and to sample a representative selection of socket outlets, light fittings, and other accessories. The number of samples should be sufficient to give a representative picture of the installation's condition. The inspector records which circuits were tested and which were sampled on the Schedule of Test Results.",
  },
  {
    question: 'What must be included in a compliant EICR?',
    answer:
      "A compliant EICR must include: details of the premises and installation; the extent and limitations of the inspection; a Schedule of Inspections (tick-list checking compliance with BS 7671 requirements); a Schedule of Test Results (recording actual measurements for each circuit tested); a list of observations coded as C1, C2, C3, or FI; the overall assessment of the installation (Satisfactory or Unsatisfactory); the recommended next inspection interval; the inspector's signature, qualifications, and registration number; and the date of the inspection.",
  },
  {
    question: 'Can I carry out an EICR on an installation I previously wired?',
    answer:
      'There is no absolute legal prohibition on an electrician inspecting an installation they previously worked on, but it is considered best practice for EICRs to be carried out by someone independent of the installing contractor. For landlord compliance purposes, the key requirement is that the inspector is "qualified and competent" — not necessarily that they are independent. However, independence adds objectivity and is recommended particularly for commercial or complex installations.',
  },
  {
    question: 'How should I handle limitations on an EICR?',
    answer:
      'Where parts of the installation are inaccessible (concealed cables, locked rooms, fixed furniture) or cannot be tested without dismantling the installation, the inspector must record the limitations on the EICR. The limitations section specifies exactly what was not inspected and why. Where a limitation means an area of the installation cannot be assessed, this may result in an FI (further investigation) observation. Limitations must be agreed with the client before the inspection begins.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/eicr-remediation',
    title: 'EICR Remediation Work',
    description: 'C1, C2, C3 and FI codes explained with typical remediation costs.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/eicr-for-hmo',
    title: 'EICR for HMO Properties',
    description: 'HMO-specific EICR requirements, common findings, and remediation costs.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/eicr-frequency-guide',
    title: 'EICR Frequency Guide',
    description: 'How often EICRs are needed for different property types.',
    icon: Clock,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord obligations, deadlines, penalties, and tenant rights.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'who-can-carry-out',
    heading: 'Who Can Carry Out an EICR?',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          require that an EICR is carried out by a "qualified and competent person." The same
          language appears in the statutory guidance supporting the regulations. This is not a
          highly prescriptive definition — the regulations do not specify a particular qualification
          — but in practice, the expectation is clear.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registered with a competent person scheme</strong> — registration with
                NICEIC, NAPIT, ELECSA, or an equivalent body is the clearest practical evidence of
                qualification and competence. These schemes assess members' qualifications,
                insurance, and workmanship, and provide a public register that landlords and local
                authorities can check.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and testing qualification</strong> — the inspector must hold a
                specific qualification in inspection and testing, not just a general electrical
                qualification. City and Guilds 2391, or the current equivalents 2394 and 2395, are
                the accepted standard. A Level 3 NVQ in Electrotechnical Services alone is not
                sufficient.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current BS 7671 knowledge</strong> — the inspector must have a current
                knowledge of BS 7671 (the IET Wiring Regulations). The current edition is BS
                7671:2018+A3:2024 (18th Edition). The City and Guilds 2382 (18th Edition) or
                equivalent confirms this. Previous editions of BS 7671 are regularly updated, and
                inspectors must be familiar with the current requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional indemnity insurance</strong> — competent person scheme
                membership requires appropriate insurance. This protects both the electrician and
                the client if an error on the EICR leads to a claim. Electricians carrying out EICR
                work should ensure their insurance specifically covers inspection and testing
                activities.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords who commission EICRs from unregistered or unqualified inspectors to save money
          face serious risk: the EICR may not be accepted by the local authority, may fail to
          identify genuine hazards, and will not protect the landlord in the event of an electrical
          incident.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: 'Required Qualifications: 2391, 2394, and 2395',
    content: (
      <>
        <p>
          City and Guilds inspection and testing qualifications are the industry-recognised standard
          for EICR work. Understanding the qualification framework is important for electricians
          planning their CPD and career development.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City and Guilds 2391 (Inspection and Testing)</strong> — the traditional
                single-unit qualification for electricians carrying out inspection and testing work.
                Covers the inspection, testing, and certification of electrical installations. Still
                valid for those who hold it. No longer widely offered as a new qualification — new
                entrants should take 2394/2395 instead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City and Guilds 2394 (Design and Verification)</strong> — covers the design
                and verification of new electrical installations, including producing Electrical
                Installation Certificates (EICs). Typically taken as the first of the two-part
                pathway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City and Guilds 2395 (Inspection, Testing and Certification)</strong> —
                covers the periodic inspection, testing, and certification of existing electrical
                installations. This is the qualification specifically covering EICR work. Requires
                2394 (or equivalent) as a prerequisite. Together, 2394 and 2395 are the current
                standard pathway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City and Guilds 2382 (18th Edition BS 7671)</strong> — confirms knowledge of
                the current edition of the IET Wiring Regulations. Must be kept current — the 18th
                Edition (Amendment 3, 2024) is the version in force. This should be renewed when
                major amendments are published.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians who hold 2391 and a current 2382 are fully qualified for EICR work. Those who
          completed their apprenticeship or training before inspection and testing qualifications
          were well-established should consider whether they hold appropriate evidence of competence
          — client expectations and local authority scrutiny have increased significantly since the
          2020 Regulations.
        </p>
      </>
    ),
  },
  {
    id: 'test-equipment',
    heading: 'Correct Test Equipment for EICR Work',
    content: (
      <>
        <p>
          Carrying out an EICR without correctly calibrated and appropriate test instruments is not
          only non-compliant — it is potentially dangerous. Test instruments must be capable of
          producing the measurements required by BS 7671 and must be in good working order with a
          current calibration certificate.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-Function Tester (MFT)</strong> — the core instrument for EICR work.
                Must be capable of: low-resistance continuity testing (earth continuity and circuit
                resistance), insulation resistance testing at 500V DC (and 250V for equipment with
                electronic components), polarity testing, earth fault loop impedance (Zs) testing,
                and RCD trip-time and trip-current testing. Calibrated annually minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Proving unit</strong> — use a proving unit to verify the MFT is functioning
                correctly before beginning each inspection. Do not rely on the instrument's
                self-test function alone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-wire or three-wire earth loop tester</strong> — for Zs testing in
                high-impedance circuits or where the standard MFT Zs function may not be
                sufficiently accurate. Essential for commercial and industrial EICRs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibration certificates</strong> — keep calibration certificates for all
                instruments and be prepared to produce them if requested. Local authority
                enforcement officers investigating an EICR dispute may ask to see evidence that the
                instruments used were in calibration.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Test instruments should comply with BS EN 61557 (Electrical safety in low voltage
          distribution systems — Equipment for testing, measuring or monitoring of protective
          measures). Reputable manufacturers include Fluke, Megger, Chauvin Arnoux, Seaward, and
          Kewtech. Avoid low-cost instruments from unknown manufacturers for EICR work — the
          consequences of inaccurate readings are serious.
        </p>
      </>
    ),
  },
  {
    id: 'schedule-of-inspections',
    heading: 'Completing the Schedule of Inspections and Tests Correctly',
    content: (
      <>
        <p>
          The Schedule of Inspections and the Schedule of Test Results are the two core technical
          documents within an EICR. Together they form the evidential basis for the overall
          assessment. Incomplete or inaccurate schedules are a common weakness in EICRs that can
          expose electricians to professional liability.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schedule of Inspections</strong> — a tick-list based on Part 6 and Part 7 of
                BS 7671. Each item is marked as compliant (tick), not applicable (N/A), or defective
                (observation noted). For a domestic EICR, items include presence of correct earthing
                and bonding conductors, correct identification of conductors, presence and condition
                of enclosures, correct protection against shock, appropriate selection of wiring
                systems, and condition of all accessories.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schedule of Test Results</strong> — records the actual measurements for each
                circuit: circuit description and reference, type and rating of overcurrent
                protection, measured R1+R2 (circuit resistance), Rn (neutral resistance), R2 (earth
                resistance), insulation resistance, polarity, Zs (earth fault loop impedance), and
                RCD test results where applicable. For sampling, clearly record which circuits were
                tested and which were not.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Observations list</strong> — each defect or departure from BS 7671 must be
                listed with: a description of the observation, its location, the relevant regulation
                from BS 7671, and the classification (C1, C2, C3, or FI). Vague or untraceable
                observations ("general condition poor") are not acceptable. Observations must be
                specific and actionable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'completing-correctly',
    heading: 'Completing the EICR Correctly',
    content: (
      <>
        <p>
          Beyond the technical schedule, the overall EICR document must meet certain requirements to
          be valid for landlord compliance purposes. An EICR that is technically competent but
          administratively deficient can cause problems for landlords when providing it to tenants
          or local authorities.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspector identification</strong> — the EICR must include the inspector's
                full name, signature, qualifications, employer/trading name, and registration number
                (NICEIC/NAPIT/ELECSA number). This allows local authorities to verify the
                inspector's credentials if challenged.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extent and limitations</strong> — clearly record what was and was not
                inspected, and the agreed extent of the inspection. If certain areas were not
                accessible, record this as a limitation. Agree limitations with the client before
                commencing the inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overall assessment</strong> — clearly state whether the installation is
                Satisfactory or Unsatisfactory. A common mistake is leaving this ambiguous. If there
                are C1, C2, or FI observations, the assessment must be Unsatisfactory. C3 alone does
                not make the assessment Unsatisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommended reinspection interval</strong> — record the recommended date for
                the next inspection. For domestic rental properties this is typically five years
                from the inspection date, but may be shorter if the installation's age or condition
                warrants it. The landlord must comply with the interval specified.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common EICR Mistakes to Avoid',
    content: (
      <>
        <p>
          EICR errors can have serious consequences: landlords may be non-compliant, hazards may be
          missed, and the electrician may face professional liability or complaints to their
          registration scheme. The following are the most common mistakes found in domestic EICRs.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insufficient test results</strong> — recording only consumer unit
                measurements without testing any circuits at their extremities. Earth fault loop
                impedance (Zs) must be measured at the furthest point of each circuit (or sampled
                appropriately) — not just at the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incorrect observation classification</strong> — coding a C1 item as C2
                (underestimating the risk) or a C3 as C2 (overestimating). Classification must be
                based on the actual risk. Incorrect C1/C2/C3 coding can mislead landlords about the
                urgency of remediation and expose the electrician to professional liability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing or incomplete schedule of inspections</strong> — ticking all items
                as compliant without actually checking them, or leaving large sections blank. The
                schedule of inspections is the documented evidence of the physical inspection.
                Incomplete schedules undermine the credibility of the entire EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not recording limitations</strong> — failing to record that certain areas
                were not inspected. If a defect later emerges in an area that should have been
                inspected but was not, and there is no limitation recorded, the electrician may have
                difficulty demonstrating they acted appropriately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vague observation descriptions</strong> — "wiring in poor condition" without
                specifying the location, the affected circuit, or the relevant BS 7671 regulation.
                Observations must be specific enough for the remediation electrician to understand
                exactly what needs to be done and where.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'elec-mate-eicr',
    heading: 'Using Elec-Mate for EICR Reports',
    content: (
      <>
        <p>
          Elec-Mate is purpose-built for electricians carrying out EICRs in the field. The app
          handles the schedule of inspections, test results entry, observation classification, and
          PDF export — all on your phone, on site. It eliminates the single biggest administrative
          burden in EICR work: completing the paperwork.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanning</h4>
                <p className="text-white text-sm leading-relaxed">
                  Point your phone at the consumer unit label. Elec-Mate's AI reads the circuit
                  descriptions, ratings, and types — pre-populating the schedule of test results
                  automatically. No manual transcription of circuit labels, no errors from misread
                  handwriting.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Voice Test Entry</h4>
                <p className="text-white text-sm leading-relaxed">
                  Call out your test results while your hands are occupied. Elec-Mate transcribes
                  and records Zs, Ir, R1+R2, and RCD trip times directly into the schedule of test
                  results. Complete test entry is faster and more accurate than writing on
                  clipboards or typing on a separate device.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Instant Quote for Remediation</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 observations are found, use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    integrated quoting tool
                  </SEOInternalLink>{' '}
                  to produce a remediation quote on site. The landlord gets the EICR and the
                  remediation quote in one go. Landlords under 28-day pressure almost always accept
                  a same-day quote from the inspector.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Landlord Portal Upload</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send the completed EICR PDF directly to the landlord from site. The landlord can
                  download it immediately and forward it to the tenant, meeting their 28-day
                  obligation without any paperwork delay. The EICR is also stored in Elec-Mate for
                  your records.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICRs correctly and efficiently with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion. AI board scanning, voice test entry, correct C1/C2/C3/FI classification, instant PDF export, and remediation quoting. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRContractorGuidePage() {
  return (
    <GuideTemplate
      title="EICR for Electrical Contractors UK | How to Carry Out EICR Correctly"
      description="Contractor guide to carrying out EICRs correctly. Who can carry out an EICR, City and Guilds 2391/2394/2395 qualifications, correct test equipment, completing the schedule of inspections and tests, common mistakes, and using Elec-Mate for on-site EICR completion."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Contractor Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Contractor Guide:{' '}
          <span className="text-yellow-400">How to Carry Out EICRs Correctly</span>
        </>
      }
      heroSubtitle="A complete guide for qualified electricians carrying out EICRs. Covers who is legally qualified to inspect, the 2391/2394/2395 qualification framework, test instruments and calibration, completing the schedule of inspections and test results, observation classification, common mistakes, and how to use Elec-Mate to complete EICRs efficiently on site."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: EICR for Electrical Contractors"
      relatedPages={relatedPages}
      ctaHeading="Complete More EICRs Per Day with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion. AI board scanning, voice test entry, instant PDF export, and remediation quoting — all on your phone. 7-day free trial, cancel anytime."
    />
  );
}
