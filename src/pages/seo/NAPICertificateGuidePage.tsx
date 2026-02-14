import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ShieldCheck,
  FileCheck2,
  ClipboardCheck,
  GraduationCap,
  Building2,
  FileText,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'NAPIT Certificate Guide | Registration & Forms';
const PAGE_DESCRIPTION =
  'Complete guide to NAPIT registration and certificates for UK electricians. Registration categories, requirements, costs, application process, annual assessment, building control notification, benefits, and NAPIT vs NICEIC comparison.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'NAPIT Certificate Guide', href: '/guides/napit-certificate-guide' },
];

const tocItems = [
  { id: 'what-is-napit', label: 'What Is NAPIT?' },
  { id: 'registration-categories', label: 'Registration Categories' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'costs', label: 'Costs' },
  { id: 'application-process', label: 'Application Process' },
  { id: 'annual-assessment', label: 'Annual Assessment' },
  { id: 'building-control', label: 'Building Control Notification' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'napit-vs-niceic', label: 'NAPIT vs NICEIC' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'NAPIT (National Association of Professional Inspectors and Testers) is the second-largest competent person scheme for electricians in the UK, providing the same self-certification ability under Part P as NICEIC.',
  'NAPIT covers multiple trades — electrical, gas, plumbing, heating, ventilation, and building fabric — making it popular with multi-trade contractors.',
  'Registration requires the same core qualifications as NICEIC: 18th Edition (C&G 2382), Inspection & Testing (C&G 2391), NVQ Level 3, calibrated instruments, and public liability insurance.',
  'NAPIT registration is typically more competitively priced than NICEIC, making it attractive for sole traders and smaller firms without sacrificing self-certification ability.',
  'Elec-Mate certificates work with any scheme provider including NAPIT — professional PDF output meets all scheme requirements, and the digital workflow is faster than paper forms.',
];

const faqs = [
  {
    question: 'Is a NAPIT certificate the same as an NICEIC certificate?',
    answer:
      'Yes, in terms of legal standing. Both NAPIT and NICEIC are Government-authorised competent person schemes approved under Part P of the Building Regulations. A Building Regulations Compliance Certificate issued through NAPIT has exactly the same legal validity as one issued through NICEIC. The underlying electrical certificates — EIC, Minor Works Certificate, and EICR — are BS 7671 documents that follow the same model forms regardless of which scheme you are registered with. The scheme provider does not determine the certificate format; BS 7671:2018+A3:2024 does. The differences between NAPIT and NICEIC are in brand recognition, annual fees, assessment processes, and additional member benefits — not in the legal weight or technical requirements of the certificates themselves.',
  },
  {
    question: 'How much does NAPIT registration cost?',
    answer:
      'NAPIT registration costs are competitive and generally lower than NICEIC. As of 2026, the Electrical Competent Person Scheme typically costs in the region of 280 to 380 pounds per year for the annual registration fee, depending on whether you are a sole trader or a larger firm. The initial assessment fee is typically between 250 and 400 pounds. So the total first-year cost is approximately 530 to 780 pounds. NAPIT often runs promotional offers for new joiners, which can reduce the first-year cost further. Multi-trade registration (for example, electrical plus gas) may offer bundled pricing. These figures are approximate and subject to annual review — confirm the current fees directly with NAPIT before applying.',
  },
  {
    question: 'What qualifications do I need for NAPIT electrical registration?',
    answer:
      'The qualification requirements for NAPIT electrical registration are the same as for other competent person schemes. You need: the 18th Edition of the IET Wiring Regulations (City & Guilds 2382 or equivalent), an Inspection and Testing qualification (City & Guilds 2391 or the older 2394/2395 equivalents), and NVQ Level 3 in Electrical Installation or equivalent (such as City & Guilds 2357 or 2365 with AM2). You must also hold current public liability insurance with a minimum cover typically of 2 million pounds, and your test instruments must be calibrated and within their calibration date. NAPIT may consider applicants with older qualifications on a case-by-case basis, provided you can demonstrate current competence and knowledge of BS 7671:2018+A3:2024.',
  },
  {
    question: 'Can I switch from NICEIC to NAPIT?',
    answer:
      'Yes, you can switch from NICEIC to NAPIT (or from any scheme to any other scheme) at any time. The process involves applying to NAPIT as a new member and going through their assessment process. Your existing NICEIC registration and track record will be taken into account, and the transition is usually straightforward for experienced electricians with a clean compliance history. You should time the switch to coincide with the end of your current NICEIC registration period to avoid paying for two overlapping registrations. NAPIT sometimes offers discounted initial assessment fees for electricians transferring from another scheme. The reverse also applies — you can switch from NAPIT to NICEIC if your business needs change.',
  },
  {
    question: 'Does NAPIT cover commercial and industrial work?',
    answer:
      'Yes. NAPIT offers registration categories that cover domestic, commercial, and industrial electrical work. The Electrical Competent Person Scheme covers domestic work and provides Part P self-certification. For commercial and industrial work, NAPIT registration demonstrates assessed competence to clients, main contractors, and specifiers. While Part P only applies to domestic dwellings (so self-certification is only relevant for domestic work), having NAPIT registration for commercial work provides a recognised credential that many clients require when appointing electrical contractors for non-domestic projects.',
  },
  {
    question: 'How do I notify NAPIT of completed work?',
    answer:
      'After completing notifiable domestic electrical work, you must notify NAPIT within the required timescale (typically within 30 days of completion, but check the current NAPIT guidance). Notification is done through the NAPIT online contractor portal. You log in, enter the job details (installation address, type of work, date of completion, certificate reference number), and upload the completed certificate. NAPIT then issues a Building Regulations Compliance Certificate to the homeowner and registers the notification with the relevant local authority building control department. The entire process is online and typically takes a few minutes per job. Failure to notify completed work within the required timescale can result in compliance issues with NAPIT and may affect your registration status.',
  },
  {
    question: 'What happens at a NAPIT annual assessment?',
    answer:
      'The NAPIT annual assessment is carried out by a NAPIT assessor, typically at your business premises or a job site. The assessor reviews your qualifications, insurance, and test instrument calibration to confirm they are all current. They review a sample of certificates you have issued since the last assessment, checking for correct completion, accurate test results, and compliance with BS 7671:2018+A3:2024. The assessor may ask technical questions about current regulations and testing procedures. They may also request to visit a recent or current job site to inspect the standard of your installation work. If any issues are identified, you are given a corrective action plan with a deadline. Persistent or serious non-compliance can result in suspension or withdrawal of registration. The assessment is thorough but fair — it is designed to maintain standards, not to catch you out.',
  },
];

const sections = [
  {
    id: 'what-is-napit',
    heading: 'What Is NAPIT?',
    content: (
      <>
        <p>
          NAPIT stands for the National Association of Professional Inspectors and Testers. It is
          the second-largest competent person scheme for electricians in the United Kingdom,
          providing the same Government-authorised self-certification ability as{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>. NAPIT was
          established to provide an alternative to NICEIC, with a focus on competitive pricing and
          multi-trade coverage.
        </p>
        <p>
          Unlike NICEIC, which focuses exclusively on the electrical trade, NAPIT covers multiple
          building trades under one umbrella — electrical, gas (as a Gas Safe Operator Scheme),
          plumbing, heating, ventilation, and building fabric. This makes NAPIT particularly popular
          with multi-trade contractors who want a single scheme membership covering all their
          trades, rather than separate registrations with different bodies.
        </p>
        <p>
          For electrical work, NAPIT operates as a Government-authorised competent person scheme
          under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>
          . This means NAPIT-registered electricians can self-certify notifiable domestic electrical
          work, issuing Building Regulations Compliance Certificates directly to homeowners without
          involving building control. The legal standing of a NAPIT certification is identical to
          that of an NICEIC certification — both are authorised by the Government under the same
          Part P framework.
        </p>
      </>
    ),
  },
  {
    id: 'registration-categories',
    heading: 'NAPIT Registration Categories',
    content: (
      <>
        <p>
          NAPIT offers several registration categories for electricians, structured to match the
          scope of work you undertake.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Electrical Competent Person Scheme</h3>
          <p className="text-white text-sm leading-relaxed">
            This is the core registration for electricians. It provides self-certification ability
            for notifiable domestic electrical work under Part P. It is equivalent to the NICEIC
            Domestic Installer or Approved Contractor schemes. Most electricians who register with
            NAPIT for electrical work will join this scheme.
          </p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Multi-Trade Registration</h3>
          <p className="text-white text-sm leading-relaxed">
            NAPIT allows you to add multiple trades to your registration. If you are a qualified
            electrician who also does plumbing, heating, ventilation, or building fabric work, you
            can register for multiple trades under a single NAPIT membership. This is more
            cost-effective than registering with separate bodies for each trade and simplifies your
            compliance obligations.
          </p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Specialist Schemes</h3>
          <p className="text-white text-sm leading-relaxed">
            NAPIT also operates specialist schemes for specific types of work, including fire
            detection and alarm systems (BS 5839), emergency lighting (BS 5266), renewable energy
            installations, and electric vehicle charger installations. These specialist schemes can
            be added to your core electrical registration.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'requirements',
    heading: 'Requirements for NAPIT Registration',
    content: (
      <>
        <p>
          The requirements for NAPIT electrical registration are consistent with industry standards
          and are largely the same as those for NICEIC and other competent person schemes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Qualifications Required</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>18th Edition:</strong> City & Guilds 2382 (or equivalent) — the current
                edition of the IET Wiring Regulations, BS 7671:2018+A3:2024
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection & Testing:</strong> City & Guilds 2391 (or equivalent, such as
                the older 2394/2395) — required for initial verification and periodic inspection
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NVQ Level 3:</strong> NVQ Level 3 in Electrical Installation or equivalent
                vocational qualification (C&G 2357, 2365 with AM2, or equivalent)
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Other Requirements</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance:</strong> Minimum 2 million pounds cover (higher
                cover may be required for some contract types)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test instruments:</strong> Calibrated multifunction tester, GS38-compliant
                voltage indicator, and (if not integrated) RCD tester. All within calibration date.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Business premises:</strong> A fixed address for correspondence and records.
                Home address is acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent work samples:</strong> You must be able to provide samples of recent
                electrical installation certificates for the assessor to review.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'NAPIT Registration Costs',
    content: (
      <>
        <p>
          NAPIT registration is generally more competitively priced than NICEIC, which is one of the
          main reasons electricians choose NAPIT — particularly sole traders and smaller firms where
          cost control is important.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Typical NAPIT Costs (2026)</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li>
              <strong>Initial assessment fee:</strong> approximately 250 to 400 pounds (one-off)
            </li>
            <li>
              <strong>Annual registration fee:</strong> approximately 280 to 380 pounds per year
            </li>
            <li>
              <strong>Total first year:</strong> approximately 530 to 780 pounds
            </li>
            <li>
              <strong>Multi-trade discount:</strong> Bundled pricing may be available for
              electricians registering for multiple trades
            </li>
            <li>
              <strong>New member promotions:</strong> NAPIT frequently offers discounted first-year
              fees for new joiners
            </li>
          </ul>
        </div>
        <p>
          As with all competent person scheme fees, NAPIT registration costs are fully
          tax-deductible as a business expense. Given that building control notification fees cost
          between 250 and 400 pounds per notifiable job, NAPIT registration pays for itself after
          just one or two notifiable domestic jobs per year.
        </p>
        <SEOAppBridge
          title="Digital workflow saves time and money"
          description="Elec-Mate's digital certificate workflow is significantly faster than paper forms. Enter test results on your phone, capture signatures digitally, and export professional PDFs on site. The time you save on each certificate adds up to hours per week."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'application-process',
    heading: 'Application Process',
    content: (
      <>
        <p>
          The NAPIT application process is designed to be straightforward. You can apply online
          through the NAPIT website and the process typically takes 4 to 6 weeks from application to
          registration confirmation.
        </p>
        <p>
          Start by completing the online application form, selecting your registration category
          (Electrical Competent Person Scheme, plus any additional trades or specialist schemes).
          Upload copies of your qualifications, public liability insurance certificate, and test
          instrument calibration certificates. Provide your business details including trading name,
          address, and the names and qualifications of all qualified personnel.
        </p>
        <p>
          Once NAPIT has reviewed your application and verified your documentation, they will
          schedule an assessment visit. The assessment is carried out at your premises by a NAPIT
          assessor and typically takes 2 to 3 hours. The assessor reviews your qualifications,
          instruments, insurance, and samples of recent work. If the assessment is satisfactory,
          your registration is confirmed and you receive your NAPIT membership number and access to
          the NAPIT online contractor portal.
        </p>
      </>
    ),
  },
  {
    id: 'annual-assessment',
    heading: 'Annual Assessment',
    content: (
      <>
        <p>
          Like all competent person schemes, NAPIT requires an annual assessment to maintain your
          registration. The annual assessment is carried out by a NAPIT assessor and focuses on work
          completed since the last assessment.
        </p>
        <p>
          The assessor will review a sample of your certificates for completeness and accuracy,
          check that your qualifications, insurance, and instrument calibrations are current, and
          may visit a recent job site to inspect your installation work. Technical questions about
          current regulations and testing procedures are part of the assessment.
        </p>
        <p>
          If the assessor identifies any non-conformances, you will receive a corrective action
          report with specific issues to address and a deadline for resolution. Minor issues are
          common and are usually resolved quickly. Serious or persistent non-compliance can result
          in enhanced monitoring, additional assessment visits, or ultimately suspension or
          withdrawal of registration.
        </p>
        <SEOAppBridge
          title="Assessment-ready certificates every time"
          description="Every certificate created in Elec-Mate auto-validates test results against BS 7671 maximum permitted values, ensures all mandatory fields are completed, and stores the certificate in the cloud permanently. When the NAPIT assessor asks for your recent work, you can pull up any certificate in seconds."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'building-control',
    heading: 'Building Control Notification',
    content: (
      <>
        <p>
          One of the primary benefits of NAPIT registration is the ability to self-certify
          notifiable domestic electrical work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>
          . When you complete notifiable work, you notify NAPIT through their online portal rather
          than notifying the local authority building control department.
        </p>
        <p>
          The notification process is simple. After completing the work and issuing the appropriate
          electrical certificate (
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            EIC or Minor Works Certificate
          </SEOInternalLink>
          ), you log into the NAPIT portal, enter the job details (installation address, type of
          work, date of completion, certificate reference), and upload the certificate. NAPIT then
          issues a Building Regulations Compliance Certificate to the homeowner and registers the
          notification with the local authority on your behalf.
        </p>
        <p>
          This process eliminates the need for building control inspections, avoids building control
          fees (which typically cost 250 to 400 pounds per job), and gives the homeowner immediate
          confirmation that the work complies with building regulations. The homeowner receives a
          formal Building Regulations Compliance Certificate that they can present when selling the
          property.
        </p>
      </>
    ),
  },
  {
    id: 'benefits',
    heading: 'Benefits of NAPIT Registration',
    content: (
      <>
        <p>
          NAPIT registration provides a range of commercial and professional benefits for
          electricians.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <ul className="space-y-3 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P self-certification:</strong> Certify notifiable domestic work without
                building control involvement. Save 250 to 400 pounds per job in building control
                fees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-trade coverage:</strong> Register for electrical, gas, plumbing,
                heating, and building fabric under one membership. Simplifies compliance for
                multi-trade firms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Find a Tradesperson directory:</strong> Your business appears on the NAPIT
                website directory, helping homeowners find you when searching for a registered
                electrician in their area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical support helpline:</strong> Access to NAPIT's technical team for
                guidance on regulation interpretation, complex installations, and BS 7671 queries.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance-backed warranty:</strong> NAPIT provides an insurance-backed
                warranty on domestic work, giving homeowners protection if the contractor ceases
                trading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competitive pricing:</strong> Lower annual fees than NICEIC with the same
                self-certification ability and legal standing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'napit-vs-niceic',
    heading: 'NAPIT vs NICEIC: Which Should You Choose?',
    content: (
      <>
        <p>
          The choice between NAPIT and{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink> is one of the
          most common questions asked by electricians looking to join a competent person scheme.
          Both schemes provide the same legal self-certification ability under Part P, so the
          decision comes down to other factors.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Choose NAPIT if...</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Cost is a priority — NAPIT is typically cheaper than NICEIC</li>
              <li>You work across multiple trades and want one registration body</li>
              <li>You are a sole trader or small firm focused on value</li>
              <li>You are switching from NICEIC and want to reduce overheads</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Choose NICEIC if...</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Brand recognition with consumers is important to your business</li>
              <li>You tender for commercial contracts where NICEIC is specified</li>
              <li>You work with main contractors or housing associations that require NICEIC</li>
              <li>You want the Platinum Promise warranty as a selling point</li>
            </ul>
          </div>
        </div>
        <p>
          There is no wrong answer. Both schemes are Government-authorised, both provide the same
          self-certification ability, and both issue certificates with identical legal standing. The
          best choice depends on your business priorities, your client base, and your budget.
        </p>
        <SEOAppBridge
          title="Works with NAPIT, NICEIC, ELECSA, and BRE"
          description="Elec-Mate certificates are scheme-agnostic. Built to BS 7671:2018+A3:2024, the professional PDF output meets the requirements of all competent person scheme providers. Switch schemes without changing your certificate workflow."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/niceic-registration',
    title: 'NICEIC Registration Guide',
    description:
      'NICEIC registration types, requirements, costs, and application process for UK electricians.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Notifiable vs non-notifiable work, competent person schemes, and compliance requirements.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description:
      'All 8 UK electrical certificate types explained — EICR, EIC, Minor Works, and more.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-retention',
    title: 'Certificate Retention Periods',
    description:
      'How long to keep electrical certificates, landlord requirements, and digital storage.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to BS 7671:2018+A3:2024 including Amendment 3 changes.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Create professional EICRs on your phone with board scanner and defect code AI.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NAPICertificateGuidePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-06-20"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Registration Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          NAPIT Certificate Guide: <span className="text-yellow-400">Registration & Forms</span>
        </>
      }
      heroSubtitle="The complete guide to NAPIT registration for UK electricians. Registration categories, qualification requirements, costs, application process, building control notification, and a detailed comparison with NICEIC. Everything you need to know before choosing your competent person scheme."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Certificates That Work With Any Scheme"
      ctaSubheading="Join 430+ UK electricians producing professional BS 7671 compliant certificates with Elec-Mate. Works with NAPIT, NICEIC, ELECSA, and BRE. PDF export, digital signatures, cloud storage. 7-day free trial."
    />
  );
}
