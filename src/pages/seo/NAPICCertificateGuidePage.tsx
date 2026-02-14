import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ClipboardCheck,
  FileCheck2,
  Shield,
  Search,
  Camera,
  Brain,
  Mic,
  Receipt,
  Send,
  GraduationCap,
  CheckCircle,
  Users,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'NAPIT Guide', href: '/guides/napit-certificate-guide' },
];

const tocItems = [
  { id: 'what-is-napit', label: 'What Is NAPIT?' },
  { id: 'registration-process', label: 'Registration Process' },
  { id: 'membership-types', label: 'Membership Types and Costs' },
  { id: 'certificate-requirements', label: 'Certificate Requirements' },
  { id: 'assessment-visits', label: 'Assessment Visits' },
  { id: 'documentation-needed', label: 'Documentation You Need' },
  { id: 'napit-vs-niceic', label: 'NAPIT vs NICEIC' },
  { id: 'digital-certificates', label: 'Using Digital Certificates with NAPIT' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "NAPIT is one of the UK's leading competent person schemes, allowing registered members to self-certify electrical work under Part P of the Building Regulations without involving building control.",
  'Registration requires the 18th Edition qualification (C&G 2382), an inspection and testing qualification (C&G 2391 or equivalent), public liability insurance, and evidence of competence through previous work.',
  'NAPIT accepts digital certificates produced by third-party software including Elec-Mate, provided they follow the BS 7671 Appendix 6 model forms and contain all required information.',
  'Annual assessment visits review certificate quality, test instrument calibration, qualifications, and a sample of recent work — consistent quality across all certificates is essential.',
  'Elec-Mate produces NAPIT-compliant certificates with AI board scanning, voice test entry, and automatic validation to catch missing fields before submission.',
];

const faqs = [
  {
    question: 'How much does NAPIT registration cost?',
    answer:
      'NAPIT registration costs vary by membership type. As of 2026, the Domestic Installer scheme costs approximately £350 to £400 per year including VAT. The full Approved Contractor scheme for domestic and commercial work costs approximately £450 to £550 per year. There is also an initial registration fee (typically £150 to £200) payable when you first join. These fees cover the annual assessment visit, access to the NAPIT online portal for work notification, technical helpline support, use of the NAPIT logo, and listing on the NAPIT "Find an Installer" directory. Prices are reviewed annually, so check the NAPIT website for the most current figures. Some electricians find NAPIT slightly more cost-effective than NICEIC, particularly for sole traders and small businesses.',
  },
  {
    question: 'What qualifications do I need to join NAPIT?',
    answer:
      'To register with NAPIT as an electrical installer, you need the 18th Edition IET Wiring Regulations qualification (C&G 2382-18 or equivalent), an inspection and testing qualification (C&G 2391 or Level 3 Award in the Inspection and Testing of Electrical Installations), and a relevant NVQ or SVQ at Level 3 in Electrical Installation or equivalent (such as a City & Guilds 2365 or 2357 with assessed practical experience). You also need current public liability insurance (minimum £2 million), calibrated test instruments with valid calibration certificates, and evidence of recent relevant work. If you do not hold the full NVQ Level 3 but have extensive industry experience, NAPIT may accept alternative evidence of competence — contact them to discuss your individual circumstances.',
  },
  {
    question: 'How does NAPIT building control notification work?',
    answer:
      'When you complete notifiable work under Part P of the Building Regulations (such as a new circuit, a consumer unit change, or work in a special location like a bathroom), you notify it through the NAPIT online portal. You enter the job details, upload or link the certificate, and NAPIT notifies the local authority building control on your behalf. The homeowner receives a Building Regulations Compliance Certificate from NAPIT, which is the legal document confirming the work complies with Part P. This certificate is important for property sales — solicitors will ask for it during conveyancing. You must notify all notifiable work within 30 days of completion. Failure to notify is a breach of your NAPIT membership conditions and can result in sanctions.',
  },
  {
    question: 'Can I use Elec-Mate to produce certificates for NAPIT submission?',
    answer:
      "Yes. NAPIT accepts certificates produced by third-party software provided they contain all required information in the correct BS 7671 format. Elec-Mate produces all 8 major certificate types — EICR, EIC, Minor Works, Fire Alarm, Emergency Lighting, PAT Testing, EV Charger, and Solar PV — as professional PDFs that meet the BS 7671 Appendix 6 model form requirements. The certificates are fully compliant with NAPIT standards. You produce the certificate in Elec-Mate, export the PDF, and then upload it through the NAPIT portal when notifying the work. Many NAPIT members prefer Elec-Mate over the NAPIT portal's own certificate tools because of features like AI board scanning, voice test entry, and automatic Zs validation.",
  },
  {
    question: 'What happens during a NAPIT assessment visit?',
    answer:
      'A NAPIT assessment visit typically lasts 2 to 3 hours. The assessor will review a sample of your recent certificates for accuracy and completeness, check your test instruments and calibration certificates, verify your qualifications and insurance are current, and may arrange to visit a recent job site to inspect the workmanship. The assessor checks that your certificates follow the BS 7671 model forms, that test results are consistent and within acceptable limits, that observation codes on EICRs are correctly classified, and that all notifiable work has been notified through the NAPIT portal. If issues are found, the assessor will discuss them with you and may issue advisory notes or, in more serious cases, formal improvement requirements. The visit is scheduled in advance, so you have time to prepare your documentation.',
  },
  {
    question: 'Can I transfer from NICEIC to NAPIT or vice versa?',
    answer:
      "Yes. You can transfer between competent person schemes. If you are currently registered with NICEIC and want to move to NAPIT (or the other way around), you apply to the new scheme as a new member but your existing qualifications, experience, and work history carry over. The new scheme will still carry out an initial assessment, but the process is typically smoother for experienced electricians with a track record of scheme membership. You should ensure there is no gap in your registration — ideally, your new scheme membership starts before your old one expires, so you are always covered for Part P notification. Some electricians switch schemes for cost reasons, for a change in assessor relationship, or because they feel one scheme's technical support is better suited to their work.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/niceic-certificate-requirements',
    title: 'NICEIC Certificate Requirements',
    description:
      'What NICEIC requires on every certificate, common rejection reasons, and formatting standards.',
    icon: Shield,
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
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description: 'Complete guide to all 8 certificate types every UK electrician needs to know.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'What work is notifiable under Part P and how to comply through a competent person scheme.',
    icon: BookOpen,
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
    id: 'what-is-napit',
    heading: 'What Is NAPIT?',
    content: (
      <>
        <p>
          NAPIT (National Association of Professional Inspectors and Testers) is one of the UK's
          leading competent person schemes for the electrical installation industry. Founded in
          1992, NAPIT is government-authorised to operate self-certification schemes for electrical
          work under Part P of the Building Regulations in England and Wales.
        </p>
        <p>
          Registration with NAPIT (or an equivalent scheme such as{' '}
          <SEOInternalLink href="/guides/niceic-certificate-requirements">NICEIC</SEOInternalLink>{' '}
          or ELECSA) allows electricians to self-certify their own work without needing to involve
          the local authority building control department. This saves time, reduces costs for the
          homeowner, and provides a streamlined compliance pathway. NAPIT notifies building control
          on behalf of its members and issues Building Regulations Compliance Certificates for
          notifiable work.
        </p>
        <p>
          NAPIT covers multiple trades including electrical, heating, plumbing, and ventilation.
          This guide focuses specifically on the electrical installation scheme — registration,
          certification requirements, assessment process, and how to use digital tools to meet
          NAPIT's standards.
        </p>
      </>
    ),
  },
  {
    id: 'registration-process',
    heading: 'How to Register with NAPIT',
    content: (
      <>
        <p>
          Registering with NAPIT involves an application process that verifies your qualifications,
          insurance, equipment, and competence. Here is what to expect:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Submit your application online.</strong> Complete the application form on the
              NAPIT website. You will need to provide your personal details, business details (sole
              trader or limited company), and the type of scheme you are applying for (Domestic
              Installer or Approved Contractor).
            </li>
            <li>
              <strong>Provide your qualifications.</strong> Upload copies of your{' '}
              <SEOInternalLink href="/guides/18th-edition-course">
                18th Edition qualification
              </SEOInternalLink>{' '}
              (C&G 2382), inspection and testing qualification (
              <SEOInternalLink href="/guides/city-guilds-2391">C&G 2391</SEOInternalLink> or
              equivalent), and NVQ Level 3 or equivalent evidence of competence.
            </li>
            <li>
              <strong>Provide insurance and calibration certificates.</strong> Upload your current
              public liability insurance certificate (minimum £2 million) and calibration
              certificates for your test instruments (multifunction tester, insulation resistance
              tester, and any other instruments you use).
            </li>
            <li>
              <strong>Pay the registration fee.</strong> The initial registration fee is typically
              £150 to £200, plus the annual membership fee for your scheme type.
            </li>
            <li>
              <strong>Initial assessment visit.</strong> A NAPIT assessor will visit to verify your
              competence. They will review sample certificates, check your test instruments, verify
              your qualifications, and may inspect a recent installation. This visit is similar to
              the annual assessment but may be more thorough for new applicants.
            </li>
          </ol>
        </div>
        <p>
          The entire process from application to registration typically takes 4 to 8 weeks,
          depending on how quickly you provide the required documentation and the availability of
          assessors in your area.
        </p>
      </>
    ),
  },
  {
    id: 'membership-types',
    heading: 'Membership Types and Costs',
    content: (
      <>
        <p>
          NAPIT offers different membership levels depending on the scope of work you carry out:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Domestic Installer</h3>
            <p className="text-white text-sm leading-relaxed">
              For electricians carrying out domestic electrical work only. Covers all Part P
              notifiable work in dwellings. Annual fee approximately £350 to £400 including VAT.
              This is the most common scheme for sole traders and small domestic electrical
              businesses.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Approved Contractor</h3>
            <p className="text-white text-sm leading-relaxed">
              For electricians carrying out both domestic and commercial electrical work. Covers all
              types of electrical installation, including industrial and commercial premises. Annual
              fee approximately £450 to £550 including VAT. Required if you work on commercial
              properties, shops, offices, or industrial units.
            </p>
          </div>
        </div>
        <p>
          Both membership types include access to the NAPIT online portal for work notification, the
          technical helpline for BS 7671 queries, use of the NAPIT logo on your marketing materials,
          a listing on the NAPIT "Find an Installer" directory, and the annual assessment visit.
          Additional services such as insurance packages and training discounts may be available at
          extra cost.
        </p>
      </>
    ),
  },
  {
    id: 'certificate-requirements',
    heading: 'NAPIT Certificate Requirements',
    content: (
      <>
        <p>
          NAPIT requires every certificate to follow the BS 7671 Appendix 6 model forms. The
          certificate requirements are the same regardless of whether you produce the certificate on
          paper, through the NAPIT portal, or using third-party software like Elec-Mate. Every
          certificate must include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete contractor details</strong> — your name, company name, address,
                NAPIT registration number, and qualifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full installation details</strong> — client name, installation address,
                earthing arrangement, supply type, prospective fault current, and Ze.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete test results</strong> — every circuit must have a full set of test
                results including continuity, insulation resistance, polarity, Zs, and RCD tests.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Properly classified observations</strong> — for EICRs, every defect must be
                coded as C1, C2, C3, or FI with a clear description and location. See the{' '}
                <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                  observation codes guide
                </SEOInternalLink>{' '}
                for details.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Signed declarations</strong> — designer, installer, and/or inspector
                declarations as appropriate for the certificate type.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The most common certificate issues flagged during NAPIT assessments mirror those at
          NICEIC: missing test results, incomplete schedules of inspections, incorrect observation
          codes, and missing declarations. Using Elec-Mate's built-in validation helps catch these
          issues before you submit.
        </p>
      </>
    ),
  },
  {
    id: 'assessment-visits',
    heading: 'What Happens During a NAPIT Assessment Visit',
    content: (
      <>
        <p>
          NAPIT carries out annual assessment visits for all registered members. The visit is
          scheduled in advance and typically lasts 2 to 3 hours. The assessor will cover:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certificate review.</strong> The assessor selects a sample of your recent
                certificates (typically 3 to 5) and reviews them for accuracy, completeness, and
                compliance with BS 7671. They check that test results are realistic, observation
                codes are correct, and all required fields are completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test instrument check.</strong> The assessor verifies that your test
                instruments have valid calibration certificates (typically within the last 12
                months). They may also check that you have the correct instruments for the work you
                are carrying out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualification and insurance verification.</strong> Your 18th Edition,
                inspection and testing, and any other relevant qualifications are checked. Your
                public liability insurance must be current and provide adequate cover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site inspection (optional).</strong> The assessor may arrange to visit a
                recent job site to inspect the quality of your workmanship. This is more common for
                new members or if issues have been raised at previous assessments.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the assessor identifies issues, they will discuss them with you and agree on corrective
          actions. Minor issues result in advisory notes. More significant issues may require you to
          demonstrate improvement by the next visit. Persistent problems can affect your
          registration.
        </p>
      </>
    ),
  },
  {
    id: 'documentation-needed',
    heading: 'Documentation You Need to Maintain',
    content: (
      <>
        <p>
          As a NAPIT member, you need to keep the following documentation current and accessible for
          assessment visits:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualification certificates.</strong> 18th Edition (C&G 2382), Inspection and
                Testing (C&G 2391 or equivalent), NVQ Level 3 or equivalent, and any specialist
                qualifications (EV charging, solar PV, fire alarm).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibration certificates.</strong> All test instruments must have valid
                calibration certificates. Most calibration houses recommend annual calibration. Keep
                the certificates where the assessor can find them.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance.</strong> Minimum £2 million cover. The policy
                must be current at all times during your membership. NAPIT will ask for a copy of
                the renewal certificate each year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certificate archive.</strong> Keep copies of all certificates you have
                issued. Digital storage makes this straightforward — Elec-Mate stores all
                certificates in the cloud with searchable records. For{' '}
                <SEOInternalLink href="/guides/electrical-certificate-retention">
                  certificate retention
                </SEOInternalLink>
                , EICs should be kept for the lifetime of the installation, EICRs until the next
                periodic inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'napit-vs-niceic',
    heading: 'NAPIT vs NICEIC: How They Compare',
    content: (
      <>
        <p>
          Both NAPIT and NICEIC are government-authorised competent person schemes. The choice
          between them comes down to cost, service, and personal preference rather than any
          fundamental difference in what they offer:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification.</strong> Both schemes provide the same Part P
                notification service and issue Building Regulations Compliance Certificates. There
                is no legal or regulatory difference.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost.</strong> NAPIT is generally slightly cheaper than NICEIC, particularly
                for domestic-only electricians. The difference is typically £50 to £150 per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Brand recognition.</strong> NICEIC has stronger brand recognition with the
                general public. Some electricians prefer NICEIC for the marketing advantage of a
                more widely known brand. However, both are equally recognised by building control,
                insurers, and property professionals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certificate standards.</strong> Both schemes require the same BS 7671 model
                form compliance. The assessment criteria are equivalent. A certificate that passes
                NAPIT assessment would pass NICEIC assessment, and vice versa.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Whichever scheme you choose, the certificate quality expectations are the same. Elec-Mate
          produces certificates that are compatible with both NAPIT and NICEIC — the format follows
          BS 7671, which both schemes require.
        </p>
      </>
    ),
  },
  {
    id: 'digital-certificates',
    heading: 'Using Digital Certificates with NAPIT',
    content: (
      <>
        <p>
          NAPIT fully accepts{' '}
          <SEOInternalLink href="/guides/digital-vs-paper-certificates">
            digital certificates
          </SEOInternalLink>{' '}
          produced by third-party software. You can complete your certificates in Elec-Mate, export
          the PDF, and upload it through the NAPIT portal when notifying work. The key advantage of
          using Elec-Mate alongside NAPIT is the AI-powered features that improve certificate
          quality:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the consumer unit and the AI reads the MCB/RCBO ratings, circuit
                  references, and board layout. This eliminates transcription errors that assessors
                  frequently flag.
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
                  Speak your test results while holding the probes. The app fills in the schedule of
                  test results hands-free — no clipboard, no re-writing at your desk.
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
                  BS 7671 regulation reference. Reduces misclassification that assessors check for.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Remedial Estimator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every C1, C2, and FI observation feeds into the remedial works estimator. Price
                  the fixes and hand the client the certificate and quote in the same visit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Produce NAPIT-compliant certificates on your phone"
          description="Elec-Mate produces all 8 certificate types with built-in validation, AI board scanning, and voice test entry. Export professional PDFs and upload to the NAPIT portal. 7-day free trial."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NAPICCertificateGuidePage() {
  return (
    <GuideTemplate
      title="NAPIT Certificate Guide | Registration & Forms"
      description="Complete guide to NAPIT registration, certificate requirements, assessment visits, and costs for UK electricians. How to produce NAPIT-compliant certificates digitally."
      datePublished="2025-05-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Scheme Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          NAPIT Certificate Guide:{' '}
          <span className="text-yellow-400">Registration, Forms, and Compliance</span>
        </>
      }
      heroSubtitle="NAPIT is one of the UK's leading competent person schemes for electrical installers. This guide covers registration, costs, certificate requirements, assessment visits, and how to use digital tools to meet NAPIT's quality standards."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About NAPIT Certification"
      relatedPages={relatedPages}
      ctaHeading="Create NAPIT-Ready Certificates"
      ctaSubheading="Join 430+ UK electricians producing scheme-compliant certificates with AI board scanning, voice test entry, and automatic validation. 7-day free trial, cancel anytime."
    />
  );
}
