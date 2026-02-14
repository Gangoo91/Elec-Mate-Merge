import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  PoundSterling,
  Award,
  GraduationCap,
  Briefcase,
  FileText,
  Building,
  Home,
  ClipboardCheck,
  Users,
  CheckCircle,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/how-to-become-electrician' },
  { label: 'ELECSA Registration', href: '/guides/elecsa-registration' },
];

const tocItems = [
  { id: 'what-is-elecsa', label: 'What Is ELECSA?' },
  { id: 'what-elecsa-offers', label: 'What ELECSA Offers' },
  { id: 'registration-process', label: 'Registration Process' },
  { id: 'assessment', label: 'The Assessment' },
  { id: 'costs', label: 'Costs and Fees' },
  { id: 'domestic-vs-commercial', label: 'Domestic vs Commercial Schemes' },
  { id: 'elecsa-vs-others', label: 'ELECSA vs NICEIC vs NAPIT' },
  { id: 'maintaining-registration', label: 'Maintaining Your Registration' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "ELECSA is a government-approved competent person scheme, now part of the ECA (Electrical Contractors' Association) group, with the same legal authority as NICEIC and NAPIT for Part P self-certification.",
  'Registration with ELECSA allows you to self-certify notifiable electrical work under Part P of the Building Regulations in England and Wales, avoiding the need for separate Building Control notification.',
  'ELECSA offers both Domestic Installer and Full Scope (commercial) registration categories, with costs generally competitive with NAPIT and lower than NICEIC.',
  'The registration process involves an application, qualification verification, and an initial assessment visit by an ELECSA-appointed assessor.',
  "Elec-Mate's digital certificates, business tools, and training courses support your ELECSA registration by keeping your documentation professional and your CPD up to date.",
];

const faqs = [
  {
    question: 'Is ELECSA as good as NICEIC?',
    answer:
      'ELECSA has exactly the same legal authority as NICEIC under Part P of the Building Regulations. Both are government-approved competent person schemes, and registration with either allows you to self-certify notifiable electrical work. The practical difference is brand recognition: NICEIC is the most widely known scheme among consumers, while ELECSA has lower consumer awareness but is well-respected within the trade. In terms of what you can legally do — issue certificates, self-certify work, register notifications — there is no difference between ELECSA, NICEIC, and NAPIT. Some electricians choose ELECSA because of its association with the ECA, competitive pricing, or personal preference based on their experience with the assessment process.',
  },
  {
    question: 'How much does ELECSA registration cost?',
    answer:
      'ELECSA registration costs are generally competitive with NAPIT and slightly lower than NICEIC. As of 2026, typical costs are: Domestic Installer — approximately £300 to £480 per year including annual subscription and assessment. Full Scope (domestic and commercial) — approximately £450 to £650 per year. There is an initial registration fee on top of the first year subscription, typically £150 to £350 depending on the category. Exact prices vary by region and may be updated periodically — check the ELECSA website for current pricing. Some ECA member discounts may apply if you are already an ECA member.',
  },
  {
    question: 'How long does ELECSA registration take?',
    answer:
      'From initial application to confirmed registration, the process typically takes 4 to 8 weeks. This includes: submitting your application and supporting documents (1 to 2 days), ELECSA verifying your qualifications and insurance (1 to 2 weeks), scheduling and completing the initial assessment visit (2 to 4 weeks depending on availability), and receiving your registration confirmation (1 to 2 weeks after the assessment, assuming you pass). If issues are identified during the assessment, the timeline may extend while you address corrective actions and undergo a re-assessment. To speed up the process, have all your documents ready before applying: qualification certificates, insurance documents, test equipment calibration certificates, and a selection of recent certificates and test results.',
  },
  {
    question: 'Can I register with ELECSA if I only do domestic work?',
    answer:
      'Yes, ELECSA offers a Domestic Installer category specifically for electricians who only carry out domestic electrical work. This covers all Part P notifiable work in dwellings: new circuits, consumer unit replacements, bathroom and kitchen work within special locations, and work in outbuildings and garden buildings. The Domestic Installer category is cheaper than the Full Scope category and the assessment focuses on domestic installation standards. If your business grows to include commercial work in the future, you can upgrade your registration to the Full Scope category — this will require an additional assessment covering commercial installation standards.',
  },
  {
    question: 'What qualifications do I need for ELECSA registration?',
    answer:
      'To register with ELECSA, you need to demonstrate competence through appropriate qualifications. The minimum requirements are: C&G 2382 or equivalent (18th Edition IET Wiring Regulations, BS 7671), C&G 2391 or 2394/2395 or equivalent (Inspection and Testing), and evidence of practical competence — typically your NVQ Level 3 and/or AM2 assessment. You also need: valid public liability insurance (minimum £2 million for domestic work, higher for commercial), calibrated test equipment (with current calibration certificates), and a suitable business premises or operating base. If you have been registered with another competent person scheme (NICEIC, NAPIT), your track record there can support your application.',
  },
  {
    question: 'Does ELECSA offer a warranty or guarantee for consumers?',
    answer:
      'ELECSA provides consumer protection through the ECA group. Registered contractors are covered by a complaints resolution process — if a consumer is dissatisfied with work carried out by an ELECSA-registered contractor, ELECSA will investigate the complaint and, if the work is found to be substandard, require the contractor to rectify it. The level of consumer guarantee varies by scheme tier and may differ from the guarantees offered by NICEIC (Platinum Promise) or NAPIT. Check the current terms on the ELECSA website for the specific consumer protection provisions that apply to your registration category.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/niceic-vs-napit',
    title: 'NICEIC vs NAPIT',
    description:
      'Detailed comparison of the two largest competent person schemes — costs, assessments, and reputation.',
    icon: ShieldCheck,
    category: 'Career',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'What Part P covers, which work is notifiable, and how competent person scheme registration helps.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-self-employed',
    title: 'Self-Employed Electrician',
    description:
      'Complete guide to setting up as self-employed — scheme registration, insurance, tax, and marketing.',
    icon: Briefcase,
    category: 'Business',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types',
    description:
      'EIC, MEIWC, EICR — the certificates you can self-certify through your ELECSA registration.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-become-electrician',
    title: 'How to Become an Electrician',
    description:
      'The full pathway from training to qualification to scheme registration and starting work.',
    icon: GraduationCap,
    category: 'Career',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK 2026',
    description:
      'How scheme registration affects your earning potential and the rates you can charge.',
    icon: PoundSterling,
    category: 'Career',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-elecsa',
    heading: 'What Is ELECSA?',
    content: (
      <>
        <p>
          ELECSA is a government-approved competent person scheme for electricians in England and
          Wales. It allows registered contractors to self-certify electrical work that is notifiable
          under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>
          , without needing to involve local authority Building Control.
        </p>
        <p>
          ELECSA is now part of the ECA (Electrical Contractors' Association) group, which is the
          UK's largest trade association for electrical and engineering services contractors. This
          gives ELECSA members access to the broader ECA network, including technical support,
          industry representation, and business development resources.
        </p>
        <p>
          While ELECSA is smaller than{' '}
          <SEOInternalLink href="/guides/niceic-vs-napit">NICEIC or NAPIT</SEOInternalLink> in terms
          of registered contractor numbers, it carries exactly the same legal authority. A
          certificate issued by an ELECSA-registered electrician has the same standing as one issued
          by a NICEIC or NAPIT-registered electrician. The choice between schemes comes down to
          cost, service quality, brand preference, and personal experience.
        </p>
      </>
    ),
  },
  {
    id: 'what-elecsa-offers',
    heading: 'What ELECSA Offers Members',
    content: (
      <>
        <p>
          Registration with ELECSA provides a range of benefits beyond the core ability to
          self-certify Part P work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P self-certification:</strong> Carry out and self-certify notifiable
                domestic electrical work without involving Building Control. This saves your clients
                the Building Control notification fee (typically £200 to £350 per notification) and
                speeds up the process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notification portal:</strong> Submit Building Regulations notifications
                electronically through the ELECSA portal. Notifications are sent to the relevant
                local authority and a Building Regulations Compliance Certificate is issued to the
                homeowner.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer confidence:</strong> Display the ELECSA logo on your van, website,
                and marketing materials. Consumers can verify your registration on the ELECSA
                website's contractor search tool.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical support:</strong> Access to technical helpline for BS 7671 and
                Building Regulations queries. The ECA technical team provides guidance on complex
                installation scenarios, regulation interpretation, and best practice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECA network access:</strong> As part of the ECA group, ELECSA members can
                access ECA resources including contract templates, health and safety guidance,
                employment law support, and industry event discounts.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'registration-process',
    heading: 'The ELECSA Registration Process: Step by Step',
    content: (
      <>
        <p>Registering with ELECSA follows a clear process. Here is what to expect:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Check your eligibility.</strong> Ensure you hold the required qualifications:
              C&G 2382 (18th Edition), C&G 2391 or equivalent (Inspection and Testing), and evidence
              of practical competence (NVQ Level 3, AM2, or equivalent experience). You also need
              valid public liability insurance and calibrated test equipment.
            </li>
            <li>
              <strong>Submit your application.</strong> Complete the ELECSA application form online
              or by post. You will need to provide copies of your qualification certificates,
              insurance documents, test equipment calibration certificates, and details of recent
              electrical work you have carried out.
            </li>
            <li>
              <strong>Application review.</strong> ELECSA reviews your application and verifies your
              qualifications and documentation. This typically takes 1 to 2 weeks. If anything is
              missing, they will contact you for additional information.
            </li>
            <li>
              <strong>Initial assessment visit.</strong> An ELECSA-appointed assessor visits you to
              inspect your work, review your certificates and test results, check your test
              equipment, and discuss your understanding of{' '}
              <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
              and current regulations. This is the most important step in the process.
            </li>
            <li>
              <strong>Assessment outcome.</strong> If you pass the assessment, your registration is
              confirmed and you receive your ELECSA membership pack, notification portal access, and
              scheme logo. If issues are identified, you receive a corrective action plan with a
              deadline to address the issues and a re-assessment date.
            </li>
            <li>
              <strong>Start self-certifying.</strong> Once registered, you can begin self-certifying
              notifiable electrical work through the ELECSA notification portal.
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Get assessment-ready with professional certificates"
          description="Elec-Mate creates BS 7671-compliant certificates with complete test schedules and professional formatting. When the ELECSA assessor reviews your documentation, everything is accurate, organised, and instantly accessible."
          icon={FileText}
        />
      </>
    ),
  },
  {
    id: 'assessment',
    heading: 'What to Expect During the ELECSA Assessment',
    content: (
      <>
        <p>
          The initial assessment is the gateway to registration, and ongoing assessments maintain
          your membership. Here is what the assessor will check:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications:</strong> Your 18th Edition certificate (C&G 2382),
                inspection and testing certificate (C&G 2391 or equivalent), and any other relevant
                qualifications. The assessor checks they are current and appropriate for the type of
                work you do.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test equipment:</strong> Your multifunction tester, insulation resistance
                tester, and any other test instruments must have current calibration certificates
                (typically renewed annually). The assessor may also check that you understand how to
                use the equipment correctly and interpret the results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certificates and documentation:</strong> A sample of your recent EICs,
                MEIWCs, and EICRs. The assessor checks for accuracy, completeness, correct test
                values, appropriate observation codes, and compliance with BS 7671 requirements.
                This is where many electricians fail — poor paperwork is the number one reason for
                assessment issues.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Job inspection:</strong> The assessor visits one or more of your recent
                installations to inspect the quality of workmanship. They check cable routing,
                termination quality, labelling, earth bonding, and overall compliance with BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical discussion:</strong> The assessor may ask about your approach to
                specific scenarios — for example, how you would determine the earth fault loop
                impedance for a TT system, or what protection is required for a bathroom circuit.
                This tests your working knowledge of the regulations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The assessment typically takes 3 to 4 hours. The best preparation is doing good work
          consistently — if your installations are well-executed and your certificates are accurate
          and complete, the assessment will go smoothly.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'ELECSA Registration Costs and Fees',
    content: (
      <>
        <p>
          ELECSA's pricing is generally competitive with NAPIT and slightly lower than NICEIC. Here
          are the typical costs for 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic Installer registration:</strong> Approximately £300 to £480 per
                year, including annual subscription and periodic assessment. Initial registration
                fee of £150 to £350 on top of the first year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full Scope registration:</strong> Approximately £450 to £650 per year for
                domestic and commercial work. Higher initial registration fee reflecting the broader
                scope of the assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notification fees:</strong> Each Part P notification submitted through the
                portal incurs a small fee (typically £5 to £15 per notification, depending on your
                membership tier). This is significantly less than the Building Control fee your
                client would pay without scheme registration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Re-assessment fee:</strong> If you fail your periodic assessment and require
                a re-assessment visit, there is an additional charge. The exact amount varies —
                check with ELECSA for current re-assessment pricing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When comparing costs, factor in the total annual expense including notifications. If you
          carry out a high volume of notifiable work, the per-notification fee can add up. Some
          schemes offer unlimited notifications within the annual subscription — check the terms for
          each scheme you are considering.
        </p>
      </>
    ),
  },
  {
    id: 'domestic-vs-commercial',
    heading: 'ELECSA Domestic vs Commercial Schemes',
    content: (
      <>
        <p>
          ELECSA offers two main registration categories, each designed for a different scope of
          work:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-3 mb-3">
              <Home className="w-6 h-6 text-yellow-400 shrink-0" />
              <h3 className="font-bold text-white text-lg">Domestic Installer</h3>
            </div>
            <ul className="space-y-2 text-white text-sm">
              <li>Self-certify Part P notifiable work in dwellings</li>
              <li>Covers: rewires, consumer unit changes, new circuits, bathroom/kitchen work</li>
              <li>Lower annual cost</li>
              <li>Assessment focuses on domestic standards</li>
              <li>
                Ideal for{' '}
                <SEOInternalLink href="/guides/electrician-self-employed">
                  self-employed domestic electricians
                </SEOInternalLink>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-3 mb-3">
              <Building className="w-6 h-6 text-blue-400 shrink-0" />
              <h3 className="font-bold text-white text-lg">Full Scope</h3>
            </div>
            <ul className="space-y-2 text-white text-sm">
              <li>Self-certify work in domestic and commercial premises</li>
              <li>Covers: offices, shops, factories, public buildings, and dwellings</li>
              <li>Higher annual cost</li>
              <li>Assessment covers domestic and commercial standards</li>
              <li>
                Required for electricians doing{' '}
                <SEOInternalLink href="/guides/domestic-vs-commercial-electrician">
                  both domestic and commercial work
                </SEOInternalLink>
              </li>
            </ul>
          </div>
        </div>
        <p>
          If you currently only do domestic work but plan to expand into commercial, you can start
          with the Domestic Installer category and upgrade later. The upgrade requires an additional
          assessment covering your commercial work competence and will increase your annual fees.
        </p>
      </>
    ),
  },
  {
    id: 'elecsa-vs-others',
    heading: 'ELECSA vs NICEIC vs NAPIT: Quick Comparison',
    content: (
      <>
        <p>
          Here is a high-level comparison of the three main competent person schemes for
          electricians in the UK:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC:</strong> Largest scheme, highest consumer recognition, highest cost,
                annual assessments. Best for electricians who value brand recognition and consumer
                lead generation through the NICEIC website. Approximately 40,000 registered
                contractors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT:</strong> Second largest, competitive pricing, strong trade
                reputation, annual assessments. Best for cost-conscious electricians who value good
                customer service and a practical approach. Approximately 8,000 to 10,000 registered
                electrical contractors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELECSA:</strong> Part of the ECA group, competitive pricing, access to ECA
                network resources, periodic assessments. Best for electricians who value the ECA
                connection and want a professional, well-supported scheme at a reasonable cost.
                Smaller registered contractor base but growing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All three schemes have identical legal authority. A Building Regulations Compliance
          Certificate issued through any of these schemes carries the same weight. The choice comes
          down to cost, service, brand preference, and which scheme's approach best fits your
          business. For a detailed head-to-head comparison of the two largest schemes, see our{' '}
          <SEOInternalLink href="/guides/niceic-vs-napit">NICEIC vs NAPIT</SEOInternalLink> guide.
        </p>
      </>
    ),
  },
  {
    id: 'maintaining-registration',
    heading: 'Maintaining Your ELECSA Registration',
    content: (
      <>
        <p>
          Registration is not a one-off event — it requires ongoing commitment to maintain your
          standards and comply with scheme requirements:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep qualifications current.</strong> Ensure your 18th Edition and
                inspection and testing qualifications are up to date. When BS 7671 amendments are
                issued, complete the relevant update course promptly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintain test equipment calibration.</strong> Get your multifunction tester
                and other instruments calibrated annually. Keep the calibration certificates
                accessible for the assessor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Produce accurate certificates.</strong> Every EIC, MEIWC, and EICR you issue
                should be complete, accurate, and compliant with BS 7671. This is the area most
                commonly flagged during assessments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Complete{' '}
                  <SEOInternalLink href="/guides/cpd-for-electricians">CPD</SEOInternalLink>{' '}
                  regularly.
                </strong>{' '}
                Continuing professional development demonstrates your commitment to staying current.
                Log your training courses, technical reading, and professional activities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Renew your insurance.</strong> Public liability insurance must remain in
                force throughout your registration. Notify ELECSA if your insurance provider or
                cover level changes.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Keep your professional profile up to date"
          description="Elec-Mate's ElecID tracks your qualifications, CPD hours, and certification history in one verified digital profile. Share it with assessors, clients, and employers. Always current, always professional."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ELECSARegistrationPage() {
  return (
    <GuideTemplate
      title="ELECSA Registration | How to Join & Costs UK"
      description="Complete guide to ELECSA registration for UK electricians. What ELECSA offers, the registration process, assessment details, costs, domestic vs commercial schemes, and how ELECSA compares to NICEIC and NAPIT."
      datePublished="2025-08-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Scheme Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          ELECSA Registration:{' '}
          <span className="text-yellow-400">How to Join, What It Costs, and What You Get</span>
        </>
      }
      heroSubtitle="ELECSA is a government-approved competent person scheme backed by the ECA. It lets you self-certify Part P work, build consumer trust, and access professional support. This guide covers everything you need to know about registering with ELECSA — process, assessment, costs, and how it compares to NICEIC and NAPIT."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About ELECSA Registration"
      relatedPages={relatedPages}
      ctaHeading="Professional Certification for Scheme-Registered Electricians"
      ctaSubheading="Elec-Mate creates BS 7671-compliant certificates that pass any scheme assessment. Digital EICs, MEIWCs, and EICRs with full test schedules, AI tools, and instant delivery. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
