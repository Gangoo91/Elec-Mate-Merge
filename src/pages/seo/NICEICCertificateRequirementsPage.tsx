import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  FileCheck2,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle,
  Search,
  Camera,
  Brain,
  Mic,
  Send,
  GraduationCap,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'NICEIC Requirements', href: '/guides/niceic-certificate-requirements' },
];

const tocItems = [
  { id: 'overview', label: 'NICEIC Certificate Standards' },
  { id: 'required-fields', label: 'Required Fields on Every Certificate' },
  { id: 'assessment-criteria', label: 'Assessment Criteria' },
  { id: 'common-rejections', label: 'Common Rejection Reasons' },
  { id: 'formatting-standards', label: 'Formatting and Presentation' },
  { id: 'eicr-specific', label: 'EICR-Specific Requirements' },
  { id: 'eic-minor-works', label: 'EIC and Minor Works Requirements' },
  { id: 'digital-submission', label: 'Digital Submission and Software' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'NICEIC requires every certificate to follow the BS 7671 Appendix 6 model forms with all mandatory fields completed — no blank sections, no missing data.',
  'Common rejection reasons include missing earth fault loop impedance values, incomplete schedules of inspections, wrong observation code classification, and absent designer/installer declarations.',
  'NICEIC assessors review a sample of recent certificates during scheme visits — consistent quality across all certificates is essential, not just the ones you expect them to see.',
  'Digital certificates submitted through the NICEIC portal or produced by approved software like Elec-Mate are fully accepted and often preferred for their legibility and completeness.',
  'Elec-Mate automatically validates required fields and flags missing data before you finalise — reducing the risk of rejection at assessment.',
];

const faqs = [
  {
    question: 'What certificates does NICEIC require me to produce?',
    answer:
      'As a NICEIC-registered contractor, you must produce the appropriate certificate for every job. For new installations and alterations to existing installations, you issue an Electrical Installation Certificate (EIC). For additions to existing circuits that do not require a new circuit, you issue a Minor Works Certificate. For periodic inspections, you issue an Electrical Installation Condition Report (EICR). For specialist work, you may also need to produce Fire Alarm certificates (BS 5839), Emergency Lighting certificates (BS 5266), EV charger certificates, and PAT testing records. All certificates must follow the BS 7671 model forms and contain every required field. NICEIC assesses the quality and accuracy of your certificates during scheme visits.',
  },
  {
    question: 'How does NICEIC assess my certificates during a scheme visit?',
    answer:
      'During a scheme assessment visit, the NICEIC assessor will review a sample of your recent certificates. They check that all mandatory fields are completed, test results are within acceptable limits, observation codes are correctly classified (C1, C2, C3, FI), the schedule of inspections is properly completed (for EICRs), designer and installer declarations are present (for EICs), and the certificate layout follows the BS 7671 model forms. The assessor may also cross-reference your certificates with the jobs notified through the NICEIC portal to ensure all notifiable work has been certificated. Poor certificate quality is one of the most common reasons for concerns raised at assessment visits.',
  },
  {
    question: 'What happens if NICEIC rejects one of my certificates?',
    answer:
      'If the NICEIC assessor identifies issues with a certificate, the outcome depends on the severity. Minor issues (such as a missing signature or an incomplete field) may result in an advisory — the assessor will explain the issue and expect it to be corrected going forward. More significant issues (such as incorrect observation codes, missing test results, or evidence that testing was not carried out properly) can result in a formal concern or, in serious cases, a requirement for additional training or supervision. Repeated certificate quality issues can affect your NICEIC registration status. The assessor will document their findings and may request to see corrected certificates at a follow-up visit.',
  },
  {
    question: 'Can I use third-party software to produce NICEIC certificates?',
    answer:
      'Yes. NICEIC accepts certificates produced by third-party software provided the certificate contains all required information in the correct format. You do not have to use NICEIC-branded forms or NICEIC-specific software. Apps like Elec-Mate produce certificates that comply with the BS 7671 model forms and are accepted by NICEIC. The certificate must be legible, complete, and accurate — the software used to produce it is not a factor in assessment. Many NICEIC contractors prefer third-party apps because they offer features like AI board scanning, voice test entry, and automatic validation that the NICEIC portal does not provide.',
  },
  {
    question: 'Do I need to display my NICEIC registration number on certificates?',
    answer:
      'Yes. Your NICEIC registration number should be displayed on every certificate you issue. This allows the client, building control, and any other party to verify your registration status. The registration number is typically included alongside your company name and address in the contractor details section of the certificate. You should also display your NICEIC membership card number if different from the registration number. For Part P notifiable work, the NICEIC registration number is used to link the certificate to the building control notification.',
  },
  {
    question: 'How often does NICEIC carry out assessment visits?',
    answer:
      'NICEIC typically carries out assessment visits annually for Approved Contractors and Domestic Installers. The frequency may increase if concerns were raised at a previous visit, or decrease for long-standing members with consistently high standards. The assessment includes a review of your certificates, an inspection of a recent job (either on site or through photographs and documentation), a check of your test instruments and calibration records, and verification of your qualifications and insurance. The visit is scheduled in advance, but the assessor expects to see a representative sample of your work — not just the best examples you have prepared.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/napit-certificate-guide',
    title: 'NAPIT Certificate Guide',
    description:
      'NAPIT registration, certification process, required documentation, and scheme requirements.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/digital-vs-paper-certificates',
    title: 'Digital vs Paper Certificates',
    description:
      'Compare digital and paper certificate workflows for speed, accuracy, and scheme compliance.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description: 'Step-by-step guide to completing every section of the EICR form correctly.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'In-depth guide to C1, C2, C3, and FI classification codes with real examples.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description: 'Complete guide to all 8 certificate types every UK electrician needs to know.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/best-eicr-software-uk',
    title: 'Best EICR Software UK',
    description: 'Comparison of the top EICR and electrical certificate apps for UK electricians.',
    icon: Search,
    category: 'Comparison',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'NICEIC Certificate Standards: What You Need to Know',
    content: (
      <>
        <p>
          NICEIC (National Inspection Council for Electrical Installation Contracting) is the UK's
          largest competent person scheme for the electrical industry. As a NICEIC-registered
          Approved Contractor or Domestic Installer, you are expected to produce electrical
          certificates that meet a high standard of accuracy, completeness, and presentation.
        </p>
        <p>
          The certificate standards are based on the model forms in Appendix 6 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations, 18th Edition with Amendment 3). NICEIC does not impose
          additional form layouts beyond what BS 7671 requires — but they do expect every required
          field to be completed fully and accurately. Incomplete or poorly completed certificates
          are one of the most common issues raised during NICEIC assessment visits.
        </p>
        <p>
          This guide covers what NICEIC requires on every certificate, the most common reasons for
          rejection or concern, and how to ensure your certificates pass assessment every time.
        </p>
      </>
    ),
  },
  {
    id: 'required-fields',
    heading: 'Required Fields on Every Certificate',
    content: (
      <>
        <p>
          Every electrical certificate — whether an{' '}
          <SEOInternalLink href="/guides/eic-certificate">EIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink>, or{' '}
          <SEOInternalLink href="/guides/minor-works-certificate">
            Minor Works Certificate
          </SEOInternalLink>{' '}
          — has mandatory fields that must be completed. NICEIC assessors check for the following on
          every certificate:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contractor details.</strong> Company name, address, telephone number, NICEIC
                registration number, and the name and qualifications of the person carrying out the
                work or inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Client and installation details.</strong> Client name, installation address
                (if different), description of the premises, and the extent and limitations of the
                inspection or installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply characteristics.</strong> Earthing arrangement (TN-S, TN-C-S, TT),
                supply type (single-phase or three-phase), nominal voltage, prospective fault
                current at the origin, and external earth fault loop impedance (Ze).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test results.</strong> Complete schedule of test results for every circuit
                tested, including continuity (R1+R2, R2), insulation resistance, polarity, earth
                fault loop impedance (Zs), and RCD operating times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Observations and recommendations.</strong> For EICRs, every observation must
                be classified with the correct code (C1, C2, C3, or FI) and include a clear
                description of the defect and its location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Declarations and signatures.</strong> The appropriate declaration (designer,
                installer, inspector) must be completed and signed. For EICs, both the designer and
                installer declarations are required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A certificate with any of these fields left blank or incomplete is likely to be flagged
          during a NICEIC assessment. The assessor may treat it as a minor advisory or, if the
          omission is significant (such as missing test results), as a formal concern.
        </p>
      </>
    ),
  },
  {
    id: 'assessment-criteria',
    heading: 'What NICEIC Assessors Look For',
    content: (
      <>
        <p>
          During an assessment visit, the NICEIC assessor reviews a sample of your recent
          certificates. They are looking for three things: accuracy, completeness, and consistency.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accuracy.</strong> Do the test results make sense? Are the Zs values
                consistent with the cable sizes and circuit lengths recorded? Are the maximum
                permitted values correct for the protective device type and rating? Has the
                prospective fault current been measured (not estimated)? Are observation codes
                correctly classified — is a C2 genuinely "potentially dangerous" or should it be a
                C3? The assessor is an experienced electrician and will spot results that do not add
                up.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Completeness.</strong> Is every field filled in? Is the{' '}
                <SEOInternalLink href="/guides/eicr-schedule-of-inspections">
                  schedule of inspections
                </SEOInternalLink>{' '}
                fully completed with the correct tick, cross, LIM, or N/A for every item? Are all
                circuits included in the schedule of test results? Is the extent and limitations
                section filled in (not just "as agreed")?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consistency.</strong> Are all your certificates completed to the same
                standard? The assessor reviews multiple certificates — if one is excellent and
                another is rushed and incomplete, that raises questions about your day-to-day
                quality.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The assessment is not adversarial — the assessor wants to help you meet the required
          standard. But they are rigorous, and repeated certificate quality issues can affect your
          registration status. The best approach is to treat every certificate as if the assessor
          will review it, because any certificate could be in the sample.
        </p>
      </>
    ),
  },
  {
    id: 'common-rejections',
    heading: 'Common Reasons Certificates Are Rejected or Flagged',
    content: (
      <>
        <p>
          Based on NICEIC assessment feedback across the industry, the most common certificate
          issues are:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing or incomplete test results.</strong> The most frequent issue. Earth
                fault loop impedance (Zs) values left blank, insulation resistance not recorded for
                every circuit, RCD operating times not tested at both 1x and 5x rated current, or
                continuity values missing. Every circuit must have a complete set of test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incomplete schedule of inspections.</strong> For EICRs, the schedule of
                inspections must be completed for every applicable item. Leaving items blank (rather
                than marking them as N/A) suggests the inspection was not thorough.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incorrect observation code classification.</strong> Classifying a defect as
                C3 (Improvement Recommended) when it should be C2 (Potentially Dangerous) is a
                serious issue — it means a dangerous defect may not be remedied. The assessor will
                check that your code classifications are consistent with the{' '}
                <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                  BS 7671 guidance on observation codes
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing designer/installer declarations.</strong> For EICs, the designer
                declaration and installer declaration are separate sections that both must be
                completed. If the same person is both designer and installer (common in domestic
                work), both declarations still need to be signed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vague extent and limitations.</strong> Writing "as agreed" or "visual only"
                without specifying exactly what was inspected and what was not. The extent and
                limitations section must clearly state which parts of the installation were covered
                and which were excluded, and why.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Never miss a required field again"
          description="Elec-Mate validates every certificate before you finalise it. Missing test results, incomplete schedules, blank declarations — the app catches them all and tells you exactly what needs completing."
          icon={Shield}
        />
      </>
    ),
  },
  {
    id: 'formatting-standards',
    heading: 'Formatting and Presentation Standards',
    content: (
      <>
        <p>
          Beyond content, NICEIC expects certificates to be professionally presented. While the
          assessor is primarily concerned with accuracy and completeness, a poorly formatted
          certificate creates a negative impression and may cause the assessor to scrutinise the
          content more closely.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legibility.</strong> Handwritten certificates must be legible. If your
                handwriting is difficult to read, digital certificates eliminate this issue
                entirely. Scheme assessors have explicitly stated that illegible handwriting is a
                common problem.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct form version.</strong> Use the current version of the model forms.
                Certificates produced on outdated forms (pre-18th Edition) will be flagged. Digital
                apps like Elec-Mate are updated when the forms change, so you always use the current
                version.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Company branding.</strong> While not strictly required, including your
                company logo, NICEIC registration number, and professional contact details on the
                certificate reflects well on your business and makes verification easier.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A clean,{' '}
          <SEOInternalLink href="/guides/digital-vs-paper-certificates">
            professionally produced digital certificate
          </SEOInternalLink>{' '}
          makes a strong impression on both clients and assessors. It signals that you take your
          paperwork as seriously as your electrical work.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-specific',
    heading: 'EICR-Specific NICEIC Requirements',
    content: (
      <>
        <p>
          The EICR is the most scrutinised certificate at NICEIC assessments because it involves the
          most judgement — classifying observations, assessing the overall condition, and
          determining the next inspection date. NICEIC has specific expectations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schedule of inspections must be fully completed.</strong> Every item in the
                schedule must be ticked (satisfactory), crossed (unsatisfactory), marked LIM
                (limitation — not inspected due to an agreed limitation), or marked N/A (not
                applicable). Blank items are not acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every observation must have a description and a code.</strong> The
                observation must describe the defect clearly (not just the code number), state the
                location, and include the relevant BS 7671 regulation number where applicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overall assessment must match the observations.</strong> If any C1 or C2
                observation is recorded, the overall assessment must be Unsatisfactory. An EICR with
                a C2 observation and a Satisfactory overall assessment is a contradiction that will
                be flagged immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Next inspection date must be justified.</strong> The recommended date for
                the next periodic inspection should reflect the age and condition of the
                installation — not just default to 5 years. An installation with multiple C3
                observations and ageing wiring may warrant a 3-year interval.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Getting the EICR right is critical for NICEIC compliance. Elec-Mate's defect code AI helps
          ensure your observation codes are correctly classified, and the app's built-in validation
          catches any mismatches between observations and the overall assessment.
        </p>
      </>
    ),
  },
  {
    id: 'eic-minor-works',
    heading: 'EIC and Minor Works Certificate Requirements',
    content: (
      <>
        <p>
          While the EICR gets the most attention, NICEIC also expects high standards on{' '}
          <SEOInternalLink href="/guides/eic-certificate">EICs</SEOInternalLink> and{' '}
          <SEOInternalLink href="/guides/minor-works-certificate">
            Minor Works Certificates
          </SEOInternalLink>
          . The most common issues are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC: Missing designer declaration.</strong> The EIC has separate sections
                for the designer and the installer. Even when the same person fulfils both roles,
                both declarations must be completed and signed. This is the single most common EIC
                omission flagged by NICEIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC: Incomplete schedule of test results.</strong> Every new or altered
                circuit must have a complete set of test results. If you installed three new
                circuits but only recorded results for two, the certificate is incomplete.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minor Works: Using it for work that requires an EIC.</strong> A Minor Works
                Certificate is only appropriate for additions or alterations to existing circuits
                that do not involve a new circuit. If you install a new circuit, you need an EIC —
                even if the work is small. NICEIC assessors check that the correct certificate type
                has been used. See{' '}
                <SEOInternalLink href="/guides/minor-works-vs-eic">
                  Minor Works vs EIC
                </SEOInternalLink>{' '}
                for guidance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minor Works: Missing Part P notification.</strong> If the Minor Works
                involves notifiable work under Part P (such as work in a bathroom or kitchen, or a
                new circuit in a special location), it must be notified through the NICEIC portal.
                Failing to notify is a compliance issue.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'digital-submission',
    heading: 'Digital Submission and Certificate Software',
    content: (
      <>
        <p>
          NICEIC fully accepts{' '}
          <SEOInternalLink href="/guides/digital-vs-paper-certificates">
            digitally produced certificates
          </SEOInternalLink>
          . Certificates can be submitted through the NICEIC online portal or produced by
          third-party software. The key requirement is that the certificate contains all mandatory
          information in the correct format — the software used to produce it is not a factor in
          assessment.
        </p>
        <p>
          Elec-Mate is designed to produce certificates that meet NICEIC standards. The app includes
          built-in validation that checks for missing fields, inconsistent data, and common errors
          before you finalise the certificate. This significantly reduces the risk of issues being
          raised at your next assessment visit.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the consumer unit and let the AI read the MCB/RCBO ratings, circuit
                  references, and board layout. Reduces manual data entry errors that scheme
                  assessors frequently flag.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Mic className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Voice Test Entry</h4>
                <p className="text-white text-sm leading-relaxed">
                  Speak your test results directly into the app while holding the test probes. The
                  data goes straight into the schedule of test results — no transcription step, no
                  transcription errors.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Defect Code AI</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe a defect in plain English and get the correct observation code with the
                  matching BS 7671 regulation number. Reduces the risk of misclassification that
                  NICEIC assessors check for.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Produce NICEIC-ready certificates every time"
          description="Elec-Mate validates every field, flags missing data, and ensures your certificates are complete and accurate before you send them. 8 certificate types, AI board scanner, voice entry, and defect code AI. 7-day free trial."
          icon={Shield}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NICEICCertificateRequirementsPage() {
  return (
    <GuideTemplate
      title="NICEIC Certificate Requirements 2026 | Guide"
      description="Complete guide to NICEIC certificate requirements for UK electricians. What assessors check, common rejection reasons, formatting standards, and how to pass every assessment visit."
      datePublished="2025-04-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Scheme Compliance"
      badgeIcon={Shield}
      heroTitle={
        <>
          NICEIC Certificate Requirements:{' '}
          <span className="text-yellow-400">Pass Every Assessment</span>
        </>
      }
      heroSubtitle="NICEIC assessors check your certificates for accuracy, completeness, and consistency. Incomplete test results, wrong observation codes, and missing declarations are the most common issues. This guide covers exactly what NICEIC requires and how to get it right every time."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About NICEIC Certificate Requirements"
      relatedPages={relatedPages}
      ctaHeading="Produce Assessment-Ready Certificates"
      ctaSubheading="Join 430+ UK electricians creating NICEIC-compliant certificates with AI board scanning, voice test entry, and automatic validation. 7-day free trial, cancel anytime."
    />
  );
}
